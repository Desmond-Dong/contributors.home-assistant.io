---
title: 为 MQTT 订阅添加状态回调
description: 使用 MQTT 的集成可能需要等待订阅完成之后才能执行操作。
date: 2025-11-23
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 为 MQTT 订阅添加状态回调

使用 MQTT 的集成可能需要等待订阅完成之后才能执行操作。默认行为是将订阅排队并进行防抖（debounce）处理，因此调用方通常无需等待代理服务器（broker）的确认。某些集成必须确保代理服务器已完成订阅。

新增的 `mqtt.async_on_subscribe_done` 辅助元素（helper）可用于监控 MQTT 订阅，以便执行额外的任务。
请确保使用与 MQTT 订阅相同的 QoS。

示例：

```python
from homeassistant.components import mqtt

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Setup integration MQTT subscription monitoring."""

    def _on_subscribe_status() -> None:
        """Handle subscription ready signal."""
        # Do stuff

    # Handle subscription ready status update
    await mqtt.async_on_subscribe_done(
        hass,
        "myintegration/status",
        qos=1,
        on_subscribe_status=_on_subscribe_status,
    )

    # Do stuff
```
