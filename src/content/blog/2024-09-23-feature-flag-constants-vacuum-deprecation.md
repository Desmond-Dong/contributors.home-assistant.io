---
title: 弃用 Vacuum 的功能标志常量
description: 自 Home Assistant Core 2022.5 起，StateVacuumEntity 中使用的功能标志常量已被弃用，并由 VacuumEntityFeature 枚举取代。
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2022.5 起，`StateVacuumEntity` 中使用的功能标志常量（feature flag constants）已被弃用，并由 `VacuumEntityFeature` 枚举取代。

然而，当时并未进行正式的弃用处理，因此现在在 2024.10 中，我们开启了为期一年的弃用期。这些常量将从 2025.10 起停止工作，以确保所有自定义集成（custom integration）的作者都有时间进行调整。
