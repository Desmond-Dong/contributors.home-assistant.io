---
title: 新增面积设备类别
description: 更多详情请参阅 Number 文档和 Sensor 文档
date: 2024-12-26
authors:
  - Michael Arthur
areas:
  - core
---

### 变更摘要
数字（number）和传感器（sensor）实体现在可以使用新的 `AREA` 设备类别（device class），并支持基于单位系统的自动单位转换。
为支持新的设备类别，还添加了相应的 `UnitOfArea` 单位枚举器和 `AreaConverter` 转换器类。

### 向后兼容性
`AREA_SQUARE_METERS` 常量已被弃用，并将在 Home Assistant `2025.12` 中移除。
自定义集成应调整为使用 `UnitOfArea.SQUARE_METERS`。

更多详情请参阅 [Number 文档](/core/entities/number/#device-classes)和 [Sensor 文档](/core/entities/sensor/#device-classes)
