---
title: 面向射频设备集成的全新射频实体平台
description: Home Assistant 现新增 `radio_frequency` 实体平台，将射频收发器硬件与其控制的设备解耦。
date: 2026-04-24
authors:
  - Paulus Schoutsen
areas:
  - core
---

Home Assistant 现新增 `radio_frequency` 实体（entity）平台，将射频收发器硬件与其控制的设备解耦。现在，每个设备集成不再直接与特定的射频硬件通信，而是由发射器集成（如 `esphome`）暴露 `RadioFrequencyTransmitterEntity` 实例，设备集成则通过辅助函数经由这些实例发送命令。

这与 [`infrared` 实体平台](/blog/2026/03/30/infrared-entity-platform)类似，并已在[架构讨论 #1365](https://github.com/home-assistant/architecture/discussions/1365) 中获得批准。

<!--truncate-->

## 架构

`radio_frequency` 域位于两类集成之间：

- **发射器集成**（ESPHome、Broadlink 等）实现 `RadioFrequencyTransmitterEntity` 基类，以提供特定于硬件的射频传输。
- **消费者集成**（车库门开启器、射频遥控器、无线开关等）使用辅助函数通过可用的发射器发送特定于设备的射频命令。

用户在消费者集成的配置流程中选择要使用的发射器，并根据设备的工作频率进行过滤。

## 实现发射器集成

发射器集成通过继承 `RadioFrequencyTransmitterEntity` 子类、声明其 `supported_frequency_ranges` 并实现 `async_send_command` 来提供 `radio_frequency` 平台：

```python
from rf_protocols import RadioFrequencyCommand
from homeassistant.components.radio_frequency import RadioFrequencyTransmitterEntity

class MyRadioFrequencyTransmitterEntity(RadioFrequencyTransmitterEntity):
    """My RF transmitter."""

    @property
    def supported_frequency_ranges(self) -> list[tuple[int, int]]:
        """Return the list of (min_hz, max_hz) ranges this hardware can transmit on."""
        return [(300_000_000, 348_000_000), (433_050_000, 434_790_000)]

    async def async_send_command(self, command: RadioFrequencyCommand) -> None:
        """Send an RF command."""
        await self._device.transmit(
            frequency=command.frequency,
            modulation=command.modulation,
            timings=command.get_raw_timings(),
        )
```

基类将最后发送命令的时间戳作为实体状态进行跟踪，因此发射器集成只需处理实际的传输工作。

## 构建消费者集成

消费者集成通过发射器实体发送命令来控制射频设备。它们不直接与射频硬件交互。以下代码片段改编自 [`honeywell_string_lights`](https://github.com/home-assistant/core/pull/168450) 集成，该集成使用此平台来驱动 Honeywell String Lights 灯串套装。

**1. 在 `manifest.json` 中声明依赖项**：

```json
{
  "dependencies": ["radio_frequency"]
}
```

**2. 从 [`rf-protocols`](https://github.com/home-assistant-libs/rf-protocols) 库加载设备命令**：

```python
from rf_protocols import get_codes

COMMANDS = get_codes("honeywell/string_lights")
```

每个加载的命令都会暴露设备使用的频率和调制方式，配置流程需要借此来过滤发射器。

**3. 在配置流程中让用户选择发射器**，使用示例命令根据设备所需的频率和调制方式进行过滤：

```python
from rf_protocols import RadioFrequencyCommand
from homeassistant.components.radio_frequency import async_get_transmitters
from homeassistant.exceptions import HomeAssistantError

sample_command: RadioFrequencyCommand = await self.hass.async_add_executor_job(
    COMMANDS.load_command, "turn_on"
)
try:
    transmitters = async_get_transmitters(
        self.hass, sample_command.frequency, sample_command.modulation
    )
except HomeAssistantError:
    return self.async_abort(reason="no_transmitters")

if not transmitters:
    return self.async_abort(reason="no_compatible_transmitters")
```

目前仅支持 `ModulationType.OOK`（开关键控）；后续版本可以添加其他调制类型。

**4. 使用辅助函数和存储的发射器实体 ID 发送射频命令**：

```python
from homeassistant.components.radio_frequency import async_send_command

async def async_turn_on(self, **kwargs: Any) -> None:
    """Turn on the light."""
    command = await self.hass.async_add_executor_job(
        COMMANDS.load_command, "turn_on"
    )
    await async_send_command(self.hass, self._transmitter, command)
    self._attr_is_on = True
    self.async_write_ha_state()
```

## 射频协议与代码

射频协议编码器和设备代码集位于 Home Assistant 外部的 [`rf-protocols`](https://github.com/home-assistant-libs/rf-protocols) 库中。常用协议和知名设备代码应贡献到该库中。对于小众或专有协议，也可以使用单独的第三方库。

有关完整详细信息，请参阅[射频实体文档](/core/entities/radio-frequency/)。
