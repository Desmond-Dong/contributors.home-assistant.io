---
title: 新的缩放工具函数与导入变更
description: 多个集成（integration）已经实现了各自的缩放算法来缩放亮度。
date: 2023-12-05
authors:
  - Jan Bouwhuis
areas:
  - core
---

## 用于缩放亮度的新工具函数

多个集成已经实现了各自的缩放算法来缩放亮度。现在引入了新的工具函数（utils），以简化在 `homeassistant.util.color` 中实现亮度缩放的过程：

```python
def brightness_to_value(low_high_range: tuple[float, float], brightness: int) -> float:
    """Given a brightness_scale convert a brightness to a single value.

    Do not include 0 if the light is off for value 0.

    Given a brightness low_high_range of (1,100) this function
    will return:

    255: 100.0
    127: ~49.8039
    10: ~3.9216
    """
    ...
```

如果您更希望将亮度缩放为整数范围，也可以使用 `scale_ranged_value_to_int_range`，具体说明见[此处](#background)。

```python
def value_to_brightness(low_high_range: tuple[float, float], value: float) -> int:
    """Given a brightness_scale convert a single value to a brightness.

    Do not include 0 if the light is off for value 0.

    Given a brightness low_high_range of (1,100) this function
    will return:

    100: 255
    50: 127
    4: 10

    The value will be clamped between 1..255 to ensure valid value.
    """
    ...
```

这也确保了返回的亮度值是有效的。

### 背景

为了缩放风扇速度百分比，我们已经有了一些工具函数 `homeassistant.utils.percentage`：

```python
def ranged_value_to_percentage(
    low_high_range: tuple[float, float], value: float
) -> int:
    ...
```

以及

```python
def percentage_to_ranged_value(
    low_high_range: tuple[float, float], percentage: int
) -> float:
    ...
```

这些百分比工具函数现在将使用 `homeassistant.utils.scaling` 中新的通用缩放工具函数：

`scale_ranged_value_to_int_range` 和 `scale_to_ranged_value`

```python
def scale_ranged_value_to_int_range(
    source_low_high_range: tuple[float, float],
    target_low_high_range: tuple[float, float],
    value: float,
) -> int:
    """Given a range of low and high values convert a single value to another range.

    Given a source low value of 1 and a high value of 255 and
    a target range from 1 to 100 this function
    will return:

    (1,255), 255: 100
    (1,255), 127: 50
    (1,255), 10: 4
    """
    ...
```

以及

```python
def scale_to_ranged_value(
    source_low_high_range: tuple[float, float],
    target_low_high_range: tuple[float, float],
    value: int,
) -> float:
    """Given a range of low and high values convert a single value to another range.

    Do not include 0 in a range if 0 means off,
    e.g. for brightness or fan speed.

    Given a source low value of 1 and a high value of 255 and
    a target range from 1 to 100 this function
    will return:

    (1,255), 255: 100
    (1,255), 127: ~49.8039
    (1,255), 10: ~3.9216
    """
    ...
```

## 工具函数 `int_states_in_range` 和 `states_in_range` 已被移动

这些工具函数现在位于 `homeassistant.util.scaling` 中。如果您的自定义集成中使用了它们，请确保将导入更新为新的模块。
