---
title: 移除已弃用的单位转换实用工具
description: "以下实用工具已在 Home Assistant 2022.10) 中弃用，并已于 2023.11 起移除："
date: 2023-10-03
authors:
  - davet2001
areas:
  - core
---

以下实用工具已[在 Home Assistant 2022.10 中弃用](/blog/2022/09/28/deprecate-conversion-utilities))，并已于 2023.11 起移除：

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

这些已弃用的函数在 Home Assistant 内置集成（integration）中早已不再使用，而在过去 12 个月里，使用它们的社区集成应该已经看到了警告。现在，尝试导入原有的实用工具将会导致错误。
