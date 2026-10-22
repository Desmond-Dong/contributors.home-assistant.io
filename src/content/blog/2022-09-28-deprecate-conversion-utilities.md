---
title: 弃用单位换算工具
description: "自 Home Assistant Core 2022.10 起，以下工具已被弃用："
date: 2022-09-28
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.10 起，以下工具已被弃用：

  - `homeassistant/util/distance`
  - `homeassistant/util/pressure`
  - `homeassistant/util/speed`
  - `homeassistant/util/temperature`
  - `homeassistant/util/volume`

请使用 `homeassistant/util/unit_conversion` 中对应的静态类：

  - `DistanceConverter`
  - `PressureConverter`
  - `SpeedConverter`
  - `TemperatureConverter`
  - `VolumeConverter`
