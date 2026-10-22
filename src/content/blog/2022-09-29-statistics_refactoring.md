---
title: 长期统计现在跟踪源实体的单位
description: 长期统计现在允许以不同于存储单位的单位显示统计数据。
date: 2022-09-29
authors:
  - Erik Montnémery
areas:
  - core
---

长期统计（long term statistics）现在允许以不同于存储单位的单位显示统计数据。例如，可以将以 `kWh` 存储的统计数据显示为 `Wh`、`kWh` 或 `MWh`。

这些更改是通过一系列 PR 实现的：
- https://github.com/home-assistant/core/pull/78031
- https://github.com/home-assistant/core/pull/78578
- https://github.com/home-assistant/core/pull/79370

背景是，我们允许覆盖多个传感器设备类（sensor device class）的单位，而在查看长期统计时也应反映此覆盖设置。

这会影响调用以下 WS API 的代码作者：
 - `recorder/adjust_sum_statistics` - 新增了一个必填参数 `adjustment_unit_of_measurement`，用于定义 `adjustment` 参数所使用的单位。
 - `recorder/statistics_during_period` - 对于从传感器实体（sensor entity）生成的统计数据，返回统计数据的单位将被转换为传感器的 `unit_of_measurement`。可以通过传递可选参数 `units` 来控制此行为。
