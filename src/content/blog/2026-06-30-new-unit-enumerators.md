---
title: 引入新的单位枚举
description: "自 Home Assistant Core 2026.7 起，以下单位常量已被弃用，并由相应的枚举替代："
date: 2026-06-30
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2026.7 起，以下单位常量已被弃用，并由相应的枚举替代：

  - `UnitOfDensity` 枚举替代了质量除以体积的 `CONCENTRATION_***` 常量
    （`"g/m³"`、`"mg/m³"`、`"μg/m³"`、`"μg/ft³"`）
  - `UnitOfRatio` 枚举替代了无单位比率的 `CONCENTRATION_***` 常量
    （`"ppm"`、`"ppb"`）

`CONCENTRATION_PARTS_PER_CUBIC_METER` 仅被单个集成（integration）使用，现已被弃用且没有替代单位。

请注意，当 `PERCENTAGE` 常量用作测量单位时，其使用也已被弃用，即使该常量本身并未被弃用。
