---
title: 添加新的降水强度单位
description: "自 Home Assistant Core 2022.11 起，以下用于体积通量（volumetric flux，如降水强度）的常量已被弃用，由 UnitOfVolumetricFlux 枚举（enum）取代："
date: 2022-10-25
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.11 起，以下用于体积通量（volumetric flux，如降水强度）的常量已被弃用，由 `UnitOfVolumetricFlux` 枚举（enum）取代：

  - `PRECIPITATION_INCHES_PER_HOUR` 由 `UnitOfVolumetricFlux.INCHES_PER_HOUR` 取代
  - `PRECIPITATION_MILLIMETERS_PER_HOUR` 由 `UnitOfVolumetricFlux.MILLIMETERS_PER_HOUR` 取代
  - `SPEED_INCHES_PER_DAY` 由 `UnitOfVolumetricFlux.INCHES_PER_DAY` 取代
  - `SPEED_INCHES_PER_HOUR` 由 `UnitOfVolumetricFlux.INCHES_PER_HOUR` 取代
  - `SPEED_MILLIMETERS_PER_DAY` 由 `UnitOfVolumetricFlux.MILLIMETERS_PER_DAY` 取代
