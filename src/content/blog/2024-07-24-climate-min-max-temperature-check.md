---
title: 气候实体（climate entity）现在会校验动作调用中提供的温度
description: 自 Home Assistant Core 2024.8 起，我们为 ClimateEntity 所提供的温度动作调用实现了校验功能。
date: 2024-07-24
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.8 起，我们为 `ClimateEntity` 所提供的温度动作调用实现了校验功能。

集成（integration）不再需要在它们自己的设置温度方法（`async_set_temperature`/`set_temperature`）中进行此项检查。

不过，集成正确指定 `min_temp` 和 `max_temp` 属性非常重要，否则一旦校验失败，用户可能无法设置正确的温度。
同样，对于所处理设备可同时使用 `Celsius`（摄氏度）和 `Fahrenheit`（华氏度）的集成，需要相应地转换其各自的 `min_temp` 和 `max_temp` 值。

### 示例

将设备的原生最小值/最大值转换为该集成所指定的 temperature_unit。

```python

class MyClimateEntity(ClimateEntity):
    """Implementation of my climate entity."""

    @property
    def min_temp(self) -> float:
        """Return the minimum temperature."""
        return TemperatureConverter.convert(
                self.device.min_temp, UnitOfTemperature.CELSIUS, self.temperature_unit
            )

    @property
    def max_temp(self) -> float:
        """Return the maximum temperature."""
        return TemperatureConverter.convert(
                self.device.max_temp, UnitOfTemperature.CELSIUS, self.temperature_unit
            )

```
