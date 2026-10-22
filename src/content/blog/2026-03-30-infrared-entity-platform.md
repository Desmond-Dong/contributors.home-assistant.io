---
title: 面向红外设备集成的全新红外实体平台
description: Home Assistant 现在拥有一个红外实体平台，可将红外发射硬件与其控制的设备解耦。
date: 2026-03-30
authors:
  - Abílio Costa
areas:
  - core
---

Home Assistant 现在拥有一个 `infrared` 实体（entity）平台，它将红外（IR）发射硬件与其所控制的设备解耦。每个设备集成不再直接与特定的红外硬件通信，而是由发射器集成（如 `esphome`）暴露 `InfraredEntity` 实例，设备集成（如 `lg_infrared`）通过辅助函数（helper functions）经由这些实例发送命令。

完整的背景信息请参阅[架构讨论](https://github.com/home-assistant/architecture/discussions/1316)。

<!--truncate-->

## 架构

红外域位于两类集成之间：

- **发射器集成**（ESPHome、Broadlink 等）实现 `InfraredEntity` 基类，以提供特定于硬件的红外发送。
- **消费端集成**（LG、Samsung、Daikin 等）使用辅助函数通过可用的发射器发送特定于设备的红外命令。

用户会在消费端集成的配置流程中选择使用哪个发射器。

## 实现发射器集成

发射器集成通过子类化 `InfraredEntity` 并实现 `async_send_command` 来提供 `infrared` 平台。该命令的 `get_raw_timings()` 方法返回硬件可以发送的与协议无关的时序数据：

```python
from homeassistant.components.infrared import InfraredCommand, InfraredEntity

class MyInfraredEntity(InfraredEntity):
    """My IR transmitter."""

    async def async_send_command(self, command: InfraredCommand) -> None:
        """Send an IR command."""
        timings = [
            interval
            for timing in command.get_raw_timings()
            for interval in (timing.high_us, -timing.low_us)
        ]
        await self._device.transmit(
            carrier_frequency=command.modulation,
            timings=timings,
        )
```

原始的与协议无关的时序数据应转换为硬件所需的特定格式。

## 构建消费端集成

消费端集成通过发射器实体发送命令来控制红外设备。它们不直接与红外硬件交互。

**1. 声明依赖**（位于 `manifest.json` 中）：

```json
{
  "dependencies": ["infrared"]
}
```

**2. 让用户选择发射器**（在配置流程中）：

```python
from homeassistant.components import infrared

emitters = infrared.async_get_emitters(hass)
if not emitters:
    return self.async_abort(reason="no_emitters")
```

**3. 发送红外命令**，使用辅助函数和 [`infrared-protocols`](https://github.com/home-assistant-libs/infrared-protocols) 库：

```python
from infrared_protocols.codes.lg.tv import LGTVCode, make_lg_tv_command
from homeassistant.components import infrared

await infrared.async_send_command(
    hass,
    self._infrared_entity_id,
    make_lg_tv_command(LGTVCode.VOLUME_UP),
    context=self._context,
)
```

## 红外协议与代码

红外协议编码器和设备代码集位于 Home Assistant 之外的 [`infrared-protocols`](https://github.com/home-assistant-libs/infrared-protocols) 库中。核心集成所使用的常见协议（NEC、Samsung 等）和知名设备代码应贡献到该库中。对于小众或专有协议，也可以使用单独的第三方库。

完整详情请参阅[红外实体文档](/core/entities/infrared/)。
