---
title: 能量/距离单位
description: 新的 ENERGY_DISTANCE 设备类（device class）用于表示单位距离的能量，现已可用于数字（number）和传感器（sensor）实体（entity），并支持基于单位系统的自动单位转换。
date: 2025-01-31
authors:
  - Jakob Schlyter
areas:
  - core
---

### 变更摘要

新的 `ENERGY_DISTANCE` 设备类（device class）用于表示单位距离的能量，现已可用于数字（number）和传感器（sensor）实体（entity），并支持基于单位系统的自动单位转换。
例如，该新设备类可用于显示电动汽车耗电量的实体。为支持该新设备类，我们还添加了相应的 `UnitOfEnergyDistance` 单位枚举器和 `EnergyDistanceConverter` 转换器类。

可使用以下单位：

- kWh/100km
- mi/kWh
- km/kWh

更多详情请参阅[数字（Number）文档](/core/entities/number/#device-classes)和[传感器（Sensor）文档](/core/entities/sensor/#device-classes)


### 反向单位

在实现 `EnergyDistanceConverter` 的过程中，`BaseUnitConverter` 也因此增加了对反向单位（inverse units）的支持。这简化了互为倒数的新单位的添加，例如 kWh/100km 和 km/kWh。
