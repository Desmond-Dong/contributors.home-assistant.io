---
title: 统计 WebSocket API 变更
description: "此变更影响 WebSocket API：recorder/statistic_during_period 和 recorder/statistics_during_period。"
date: 2023-04-30
authors:
  - J. Nick Koston
areas:
  - core
---

此变更影响 WebSocket API：`recorder/statistic_during_period` 和 `recorder/statistics_during_period`。Home Assistant 项目目前并未记录这些 API，因为它们可能会发生更改。

在 Home Assistant Core 2023.6 中，统计（statistics）WebSocket API 将不再返回已知为空的列。调用方应将值的缺失视为与 null 值相同。

为了减少数据库开销，如果统计后端预先知道某一列的所有行都将为空值，则不再返回该列。
