---
title: Device tracker TrackerEntity 位置精度属性类型变更
description: device_tracker 实体组件的 TrackerEntity 类的 location_accuracy 属性（简写 _attr_location_accuracy）的类型已从 int 更改为 float。
date: 2025-04-24
authors:
  - Jan Bouwhuis
areas:
  - core
---

`device_tracker` 实体组件（entity component）的 `TrackerEntity` 类的 `location_accuracy` 属性（简写为 `_attr_location_accuracy`）的类型已从 `int` 更改为 `float`。

如果源值为 `float`，则不再需要进行类型转换。

### 示例

```python
class ExampleTrackerEntity(TrackerEntity):
    """Test tracker entity."""

    _attr_location_accuracy: float = 2.5

    @cached_property
    def location_accuracy(self) -> float:
        """Return the location accuracy of the device.

        Value in meters.
        """
        return self._attr_location_accuracy
```
