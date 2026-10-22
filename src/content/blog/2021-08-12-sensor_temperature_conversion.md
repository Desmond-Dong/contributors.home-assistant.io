---
title: 温度单位转换迁移至 SensorEntity
description: 温度单位转换正从 Entity 基类迁移至 SensorEntity 基类。
date: 2021-08-12
authors:
  - Erik Montnémery
areas:
  - core
---

温度单位转换正从 `Entity` 基类迁移至 `SensorEntity` 基类。只有当传感器的 `device_class` 属性被设置为 `DEVICE_CLASS_TEMPERATURE` 时，才会执行单位转换。如果未设置 `device_class`，或者未将其设置为 `DEVICE_CLASS_TEMPERATURE`，那么在过渡期内仍会进行温度转换，并会记录一条警告日志。

为此，传感器实体（entity）模型新增了两个属性：`native_value` 和 `native_unit_of_measurement`。这样我们以后就可以添加更多的单位转换，而不必依赖各个集成（integration）自行实现。

传感器实现不应再实现 `state()` 属性函数，也不应再设置 `_attr_state` 属性。此外，传感器实现也不应实现 `unit_of_measurement` 属性函数，不应设置 `_attr_unit_of_measurement` 属性，也不应设置 `EntityDescription` 的 `unit_of_measurement` 成员。

### native_value

传感器报告的值。由于进行单位转换，写入状态机（state machine）的实际状态可能会被 `SensorEntity` 修改。

### native_unit_of_measurement

传感器的测量单位（如有）。由于进行单位转换，写入状态机的 `unit_of_measurement` 可能会被 `SensorEntity` 修改。
