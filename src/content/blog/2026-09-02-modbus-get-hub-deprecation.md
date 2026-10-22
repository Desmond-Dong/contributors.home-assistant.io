---
title: 弃用 modbus.get_hub 并改用 async_get_unit
description: 自 Home Assistant Core 2026.10 起，modbus.get_hub 已被弃用。它将在 Home Assistant Core 2027.10 中被移除。
date: 2026-09-02
authors:
  - Paulus Schoutsen
areas:
  - core
---

自 Home Assistant Core 2026.10 起，`modbus.get_hub` 已被弃用。它将在 Home Assistant Core 2027.10 中被移除。在此之前，调用它的自定义集成（integration）会在日志中收到警告，之后将停止工作。

## 背景

`get_hub` 将集成附加到用户在 YAML 中配置的 Modbus 集线器上，且必须告知集成该集线器的名称。在集成能够工作之前，用户必须手动设置集线器，并且需要同一总线的两个集成无法共享它。

7 月，我们宣布了[在 Home Assistant 中实现 Modbus 现代化](/blog/2026/07/05/modernizing-modbus)的计划。Home Assistant Core 2026.9 交付了第一部分成果：`async_get_unit`。集成在其自身的配置流程中收集连接详细信息，与其他任何集成一样，并向 Modbus 集成请求基于这些信息的单元。使用相同详细信息进行请求的集成将共享一个连接。无需在 YAML 中进行任何配置，也不会持久化任何额外内容。

## 应对措施

将对 `get_hub` 的调用替换为对 `async_get_unit` 的调用：

```python
from homeassistant.components.modbus import async_get_unit
from modbus_connection import ModbusTcpParams


async def async_setup_entry(hass: HomeAssistant, entry: MyConfigEntry) -> bool:
    """Set up my device from a config entry."""
    unit = async_get_unit(
        hass,
        entry,
        ModbusTcpParams(host=entry.data[CONF_HOST], port=entry.data[CONF_PORT]),
        entry.data[CONF_UNIT_ID],
    )
    device = MyDevice(unit)
    ...
```

这并非一对一的直接替换。您的配置流程必须收集传输所需的连接详细信息，例如主机和端口，以及用户过去在 YAML 集线器中编写的单元 ID，并且特定于设备的通信应移至基于 [`modbus-connection`](https://home-assistant-libs.github.io/modbus-connection/) 构建的库中。[Modbus 开发者文档](/core/internals/modbus/) 对这两者进行了描述，并提供了示例代码和参考设备库。

更多详细信息可在 [core PR](https://github.com/home-assistant/core/pull/179933) 中找到。
