---
title: 按钮事件实体的标准事件类型
description: 按钮事件实体现在拥有一组标准事件类型，由新的 ButtonEventType 枚举提供。
date: 2026-07-22
authors:
  - Abílio Costa
areas:
  - core
---

按钮事件实体（entity）现在拥有一组标准事件类型，由新的 `ButtonEventType` 枚举提供。使用 `EventDeviceClass.BUTTON` 的集成（integration）在交互映射到这些标准类型之一时，应使用这些类型而不是自定义字符串。

有关完整背景信息，请参阅[架构讨论](https://github.com/home-assistant/architecture/discussions/1377)。

<!--truncate-->

## 原因

以前，每个集成（integration）都会为按钮交互选择自己的字符串——例如 `single`、`click`、`hold`、`double_press` 等等。这种不一致性导致无法构建跨集成通用的按钮自动化（automation），也阻止了前端提供有意义的触发器建议。

新的 `ButtonEventType` 标准事件类型通过为每个按钮集成提供通用交互的共享词汇表来解决这一问题。

## 事件类型

`ButtonEventType` 定义了六种标准事件类型：

- `ButtonEventType.PRESS_START`：按钮被按下。
- `ButtonEventType.PRESS_END`：按钮在短暂按下后被释放（标准的“点击”）。
- `ButtonEventType.LONG_PRESS_START`：按钮被按住并超过了持续时间阈值。
- `ButtonEventType.LONG_PRESS_END`：按钮在长时间按住后被释放。
- `ButtonEventType.MULTI_PRESS_ONGOING`：检测到多次按压序列中的中间按压。
- `ButtonEventType.MULTI_PRESS_END`：多次按压序列完成。

`MULTI_PRESS_ONGOING` 和 `MULTI_PRESS_END` 事件在其事件数据中包含一个 `multi_press_count` 属性（即 `ATTR_MULTI_PRESS_COUNT` 常量），表示按压次数。

**这些都不是强制性的。** 与门铃的 `ring` 事件不同，这里没有必需的类型。每个集成仅映射其硬件实际能够产生的交互，并且只在 `event_types` 中列出这些交互。

## 具体操作

从 `homeassistant.components.event` 导入 `ButtonEventType`，并将设备（device）支持的类型包含在实体的 `event_types` 中。在交互发生时触发它们：

```python
from homeassistant.components.event import (
    ATTR_MULTI_PRESS_COUNT,
    ButtonEventType,
    EventDeviceClass,
    EventEntity,
)


class MyButtonEvent(EventEntity):

    _attr_device_class = EventDeviceClass.BUTTON
    _attr_event_types = [
        ButtonEventType.PRESS_END,
        ButtonEventType.LONG_PRESS_END,
        ButtonEventType.MULTI_PRESS_END,
    ]

    @callback
    def _async_handle_multi_press(self, count: int) -> None:
        """Handle a completed multi-press sequence."""
        self._trigger_event(
            ButtonEventType.MULTI_PRESS_END,
            {ATTR_MULTI_PRESS_COUNT: count},
        )
        self.async_write_ha_state()
```

### 单事件设备

如果设备在每次交互时仅发出单个事件，没有单独的按下和释放，请将其映射到相应的 `_end` 类型（短按对应 `PRESS_END`，长按对应 `LONG_PRESS_END`，依此类推）。这可以使“按钮被按下”的触发器在不同设备间保持一致，而无需合成硬件从未发送过的事件。

## 无需迁移

此更改仅添加了共享常量；没有弃用任何内容，也不强制任何集成进行迁移。自定义事件类型仍然可以与标准类型一起使用。在适合您的设备时采用 `ButtonEventType`。

有关完整详细信息，请参阅[事件实体文档](/core/entities/event/)。
