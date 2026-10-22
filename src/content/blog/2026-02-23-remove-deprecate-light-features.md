---
title: 移除已弃用的灯功能
description: 2022年10月，Home Assistant 将首选的色温单位从 mired（微倒度）迁移为开尔文（kelvin）。
date: 2026-02-23
authors:
  - epenet
areas:
  - core
---

### 变更摘要

2022年10月，Home Assistant 将首选的色温单位从 mired（微倒度）迁移为开尔文（kelvin）。

在[2024年2月](/blog/2024/02/12/light-color-mode-mandatory)，Home Assistant 要求显式提供 `supported_color_modes` 和 `color_mode` 特性（从而弃用了旧版回退颜色模式支持）。

在[2024年12月](/blog/2024/12/14/kelvin-preferred-color-temperature-unit)，Home Assistant 要求显式支持开尔文（Kelvin）（从而弃用了 mired 支持）。

现在是时候清理这些旧代码，并移除相应的属性、常量和特性了：
* 移除已弃用的 `ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS`、`ATTR_MAX_MIREDS`、`ATTR_KELVIN`、`COLOR_MODE_***` 和 `SUPPORT_***` 常量
* 移除已弃用的状态属性 `ATTR_COLOR_TEMP`、`ATTR_MIN_MIREDS` 和 `ATTR_MAX_MIREDS`
* 从 `light.turn_on` 服务调用中移除对已弃用的 `ATTR_KELVIN` 和 `ATTR_COLOR_TEMP` 参数的支持
* 从实体（entity）中移除对已弃用的 `LightEntity.color_temp`、`LightEntity.min_mireds` 和 `LightEntity.max_mireds` 特性的支持
* 从实体中移除对已弃用的 `LightEntity._attr_color_temp`、`LightEntity._attr_min_mireds` 和 `LightEntity._attr_max_mireds` 简写属性的支持

此外，未能提供有效的 `supported_color_modes` 和 `color_mode` 特性将不再可行，并会引发错误。

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

#### 在服务调用中检查色温

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
* [核心 PR #79591：迁移至开尔文](https://github.com/home-assistant/core/pull/79591)
* [架构讨论 #564](https://github.com/home-assistant/architecture/discussions/564)
* [颜色模式文档](/core/entities/light/#color-modes)
