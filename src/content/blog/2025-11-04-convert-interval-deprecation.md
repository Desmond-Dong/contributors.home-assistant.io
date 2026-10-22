---
title: TemperatureConverter.convert_interval 已弃用
description: TemperatureConverter 中的 convert_interval 方法（用于在 °F 和 °C 温度区间之间进行换算）已被弃用，推荐改用 TemperatureDeltaConverter.convert。
date: 2025-11-04
authors:
  - Davide Perteghella
areas:
  - core
---

`TemperatureConverter` 中的 `convert_interval` 方法（用于在 °F 和 °C 温度区间之间进行换算）已被弃用，取而代之的是 `TemperatureDeltaConverter.convert`。
现在，新的转换器和设备类（device class）已成为处理温度区间的首选方式。

详情请参阅 [core PR 155689](https://github.com/home-assistant/core/pull/155689) 和 [core PR 147358](https://github.com/home-assistant/core/pull/147358)。
