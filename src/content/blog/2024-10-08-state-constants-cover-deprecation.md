---
title: 弃用窗帘（cover）的状态常量
description: 自 Home Assistant Core 2024.11 起，CoverEntity 中用于返回状态的常量已被弃用，并由 CoverState 枚举取代。
date: 2024-10-08
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.11 起，`CoverEntity` 中用于返回状态的常量已被弃用，并由 `CoverState` 枚举（enum）取代。

弃用期为一年，这些常量将从 2025.11 起停止工作，以确保所有自定义集成（custom integration）的作者都有时间进行调整。

由于 `state` 属性本不应被覆盖，在大多数情况下，此更改只会影响其他 Entity 属性或测试，而不会影响 `state` 属性。

更多详情请参阅[窗帘文档](/core/entities/cover/#states)。
