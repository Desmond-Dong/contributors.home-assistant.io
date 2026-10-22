---
title: 使用开尔文作为首选色温单位
description: 2022 年 10 月，Home Assistant 将首选色温单位从 mired（微倒度）迁移为开尔文（kelvin）。
date: 2024-12-14
authors:
  - epenet
areas:
  - core
---

### 变更摘要

2022 年 10 月，Home Assistant 将首选色温单位从 mired（微倒度）迁移为开尔文（kelvin）。

现在是时候为相应的属性（attribute）、常量和特性（property）添加弃用警告了：
* 弃用状态（state）和能力（capability）属性 `ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS` 和 `ATTR_MAX_MIREDS`
* 弃用 `light.turn_on` 服务（service）调用中的常量 `ATTR_KELVIN` 和 `ATTR_COLOR_TEMP`
* 弃用特性 `LightEntity.color_temp`、`LightEntity.min_mireds` 和 `LightEntity.max_mireds`
* 弃用对应的属性 `LightEntity._attr_color_temp`、`LightEntity._attr_min_mired` 和 `LightEntity._attr_max_mired`

### 示例

#### 自定义最小/最大色温

```python
class MyLight(LightEntity):
    """Representation of a light."""

    # Old
    # _attr_min_mireds = 200 # 5000K
    # _attr_max_mireds = 400 # 2500K

    # New
    _attr_min_color_temp_kelvin = 2500 # 400 mireds
    _attr_max_color_temp_kelvin = 5000 # 200 mireds
```

#### 默认最小/最大色温

```python
from homeassistant.components.light import DEFAULT_MAX_KELVIN, DEFAULT_MIN_KELVIN

class MyLight(LightEntity):
    """Representation of a light."""

    # Old did not need to have _attr_min_mireds / _attr_max_mireds set
    # New needs to set the default explicitly
    _attr_min_color_temp_kelvin = DEFAULT_MIN_KELVIN
    _attr_max_color_temp_kelvin = DEFAULT_MAX_KELVIN
```

#### 动态最小/最大色温

```python
from homeassistant.util import color as color_util

class MyLight(LightEntity):
    """Representation of a light."""

    # Old
    # def min_mireds(self) -> int:
    #     """Return the coldest color_temp that this light supports."""
    #     return device.coldest_temperature
    #
    # def max_mireds(self) -> int:
    #     """Return the warmest color_temp that this light supports."""
    #     return device.warmest_temperature

    # New
    def min_color_temp_kelvin(self) -> int:
        """Return the warmest color_temp that this light supports."""
        return color_util.color_temperature_mired_to_kelvin(device.warmest_temperature)

    def max_color_temp_kelvin(self) -> int:
        """Return the coldest color_temp that this light supports."""
        return color_util.color_temperature_mired_to_kelvin(device.coldest_temperature)
```

#### 服务调用

```python
from homeassistant.components.light import ATTR_COLOR_TEMP_KELVIN
from homeassistant.util import color as color_util

class MyLight(LightEntity):
    """Representation of a light."""
    def turn_on(self, **kwargs: Any) -> None:
        """Turn on the light."""
        # Old
        # if ATTR_COLOR_TEMP in kwargs:
        #     color_temp_mired = kwargs[ATTR_COLOR_TEMP]
        #     color_temp_kelvin = color_util.color_temperature_mired_to_kelvin(color_temp_mired)

        # Old
        # if ATTR_KELVIN in kwargs:
        #     color_temp_kelvin = kwargs[ATTR_KELVIN]
        #     color_temp_mired = color_util.color_temperature_kelvin_to_mired(color_temp_kelvin)

        # New
        if ATTR_COLOR_TEMP_KELVIN in kwargs:
            color_temp_kelvin = kwargs[ATTR_COLOR_TEMP_KELVIN]
            color_temp_mired = color_util.color_temperature_kelvin_to_mired(color_temp_kelvin)
```

### 背景信息

* [关于开尔文温度的社区讨论](https://community.home-assistant.io/t/wth-is-light-temperature-not-in-kelvin/467449/6)
* [Core PR #79591：迁移至开尔文](https://github.com/home-assistant/core/pull/79591)
* [架构讨论 #564](https://github.com/home-assistant/architecture/discussions/564)
