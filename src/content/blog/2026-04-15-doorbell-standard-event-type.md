---
title: 门铃事件实体的标准事件类型
description: 门铃事件实体现在有了标准的 ring 事件类型。使用 EventDeviceClass.DOORBELL 的集成必须在其 event_types 列表中包含 DoorbellEventType.RING。
date: 2026-04-15
authors:
  - Abílio Costa
areas:
  - core
---

门铃事件实体（event entity）现在有了标准的 `ring` 事件类型。使用 `EventDeviceClass.DOORBELL` 的集成（integration）必须在其 `event_types` 列表中包含 `DoorbellEventType.RING`。

完整背景请参阅[架构讨论](https://github.com/home-assistant/architecture/discussions/1363)。

<!--truncate-->

## 原因

此前，每个集成都使用自己的字符串来表示“门铃被按下”事件——`ding`、`ring`、`doorbell_chime`、`single_press` 等。这种不一致性导致无法构建适用于所有集成的通用门铃自动化（automation）。

新的 `DoorbellEventType.RING` 标准事件类型解决了这个问题，它确保每个门铃集成在门铃被按下时都会触发一个通用的 `ring` 事件。

## 需要做什么

从 `homeassistant.components.event` 导入 `DoorbellEventType`，并在门铃实体的 `event_types` 中包含 `DoorbellEventType.RING`。每当门铃被按下时触发该事件：

```python
from homeassistant.components.event import DoorbellEventType, EventDeviceClass, EventEntity


class MyDoorbellEvent(EventEntity):

    _attr_device_class = EventDeviceClass.DOORBELL
    _attr_event_types = [DoorbellEventType.RING]

    @callback
    def _async_handle_event(self) -> None:
        """Handle the doorbell press event."""
        self._trigger_event(DoorbellEventType.RING)
        self.async_write_ha_state()
```

除了标准的 `ring` 类型之外，仍然允许添加额外的自定义事件类型（例如 `double_press`、`long_press`）。

未包含 `DoorbellEventType.RING` 的门铃实体将记录弃用警告，并将在 **Home Assistant 2027.4** 中停止工作。

完整详情请参阅[事件实体文档](/core/entities/event/)。
