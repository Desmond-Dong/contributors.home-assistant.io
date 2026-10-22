---
title: 使用 DataUpdateCoordinator 避免不必要的回调
description: 当 API 数据可以进行比较时，DataUpdateCoordinator 现在可以减少不必要的更新。
date: 2023-07-27
authors:
  - J. Nick Koston
areas:
  - core
---

当 API 数据可以进行比较时，`DataUpdateCoordinator` 现在可以减少不必要的更新。

在使用 `DataUpdateCoordinator` 时，被轮询的数据通常预期基本保持不变。例如，如果你正在轮询一盏每周只开启一次的灯，那么这些数据几乎在所有时候都是相同的。默认行为是在数据更新时总是回调监听器（listeners），即使数据没有发生变化。如果从 API 返回的数据可以使用 Python 的 `__eq__` 方法进行比较以检测变化，请在创建 `DataUpdateCoordinator` 时设置 `always_update=False`，以避免不必要的回调和对状态机（state machine）的写入。
