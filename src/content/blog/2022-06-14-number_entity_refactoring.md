---
title: 数字实体重构以支持单位转换
description: NumberEntity 现在支持温度单位转换，其实现模式与 SensorEntity 支持的单位转换类似。
date: 2022-06-14
authors:
  - Erik Montnémery
areas:
  - core
---

`NumberEntity` 现在支持温度单位转换，其实现模式与 `SensorEntity` 支持的单位转换类似。

对于设备类（device class）设置为 `temperature` 的数字实体（number entity），系统将自动进行温度转换，转换为用户配置的温度单位。

为实现这一功能，自定义组件集成应更新为重写属性 `native_max_value`、`native_min_value`、`native_step`、`native_unit_of_measurement`、`native_value`，而不是 `max_value`、`min_value`、`step`、`unit_of_measurement`、`value`，并更新为重写方法 `async_set_native_value` 和 `set_native_value`，而不是 `async_set_value` 和 `set_value`。

同样的重命名也应用于 `_attr_*` 属性以及 `NumberEntityDescription` 的成员。

在 Home Assistant Core 2023.1 中，重写 `async_set_value`、`max_value`、`min_value`、`set_value`、`step`、`unit_of_measurement`、`value`，设置 `_attr_max_value`、`_attr_min_value`、`_attr_unit_of_measurement`、`_attr_step`、`_attr_value`，以及在 `NumberEntityDescription` 实例上设置 `max_value`、`min_value`、`unit_of_measurement`、`step`，均不再受支持。
