---
title: 天气实体重构以支持单位转换
description: WeatherEntity 现在支持温度单位转换，其模式与 NumberEntity 和 SensorEntity 所支持的单位转换类似。
date: 2022-06-27
authors:
  - Erik Montnémery
areas:
  - core
---

`WeatherEntity` 现在支持温度单位转换，其模式与 `NumberEntity` 和 `SensorEntity` 所支持的单位转换类似。

降水量、气压、温度、能见度和风速会根据用户配置的单位制自动转换。此外，用户可以为特定的天气实体（entity）覆盖单位。

为实现这一点，自定义组件集成应更新为覆盖属性 `native_precipitation_unit`、`native_pressure`、`native_pressure_unit`、`native_temperature`、`native_temperature_unit`、`native_visibility`、`native_visibility_unit`、`native_wind_speed` 和 `native_wind_speed_unit`，而不是 `precipitation_unit`、`pressure`、`pressure_unit`、`temperature`、`temperature_unit`、`visibility`、`visibility_unit`、`wind_speed` 和 `wind_speed_unit`。

相应的 `_attr_*` 属性也进行了同样的重命名，`Forecast` 类型化字典（typed dict）的成员同样如此

从 Home Assistant Core 2023.1 开始，覆盖 `precipitation_unit`、`pressure`、`pressure_unit`、`temperature`、`temperature_unit`、`visibility`、`visibility_unit`、`wind_speed`、`wind_speed_unit`，设置 `_attr_precipitation_unit`、`_attr_pressure`、`_attr_pressure_unit`、`_attr_temperature`、`_attr_temperature_unit`、`_attr_visibility`、`_attr_visibility_unit`、`_attr_wind_speed`、`_attr_wind_speed_unit`，以及在 `Forecast` 实例上设置 `precipitation`、`pressure`、`temperature`、`templow`、`wind_speed` 均不再受支持。
