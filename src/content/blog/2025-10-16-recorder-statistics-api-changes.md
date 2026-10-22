---
title: recorder 统计 API 的变更
description: 用于注入和修改统计数据的 Python 和 WS API 已发生变更。
date: 2025-10-16
authors:
  - Erik Montnémery
areas:
  - core
---

用于注入和修改统计数据的 Python 和 WS API 已发生变更。

WS API 进行了以下变更：
- WS 命令 `recorder/update_statistics_metadata` 接受一个 `unit_class`，该参数指向用于单位换算的单位转换器（unit converter）。如果没有兼容的单位转换器，`unit_class` 应设置为 `null`。不指定 `unit_class` 的做法已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/import_statistics` 中包含的 `metadata` 对象接受一个 `unit_class`，该参数指向用于单位换算的单位转换器。如果没有兼容的单位转换器，`unit_class` 应设置为 `null`。不指定 `unit_class` 的做法已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/import_statistics` 中包含的 `metadata` 对象接受一个 `mean_type`，用于指定均值的类型（`0` 表示无均值，`1` 表示算术平均值，`2` 表示循环平均值）。`mean_type` 取代了布尔标志 `has_mean`。不指定 `mean_type` 的做法已被弃用，并将在 Home Assistant Core 2026.11 中停止工作。
- WS 命令 `recorder/list_statistic_ids` 和 `recorder/get_statistics_metadata` 的响应中的条目包含 `mean_type` 和 `unit_class`。
- WS 命令 `recorder/list_statistic_ids` 和 `recorder/get_statistics_metadata` 的响应条目中的 `has_mean` 已被弃用，并将在 Home Assistant Core 2026.11 中被移除。

The following changes have been made to the Python API:
- The function `async_update_statistics_metadata` accepts a `new_unit_class` that points to the unit converter used for unit conversions. If there is no compatible unit converter, `new_unit_class` should be set to `None`. Not specifying the `new_unit_class` is deprecated and will stop working in Home Assistant Core 2026.11.
- The metadata object passed to the functions `async_import_statistics` and `async_add_external_statistics` accepts a `unit_class` that points to the unit converter used for unit conversions. If there is no compatible unit converter, `unit_class` should be set to `None`. Not specifying the `unit_class` is deprecated and will stop working in Home Assistant Core 2026.11.
- The metadata object passed to the functions `async_import_statistics` and `async_add_external_statistics` accepts a `mean_type` of type `StatisticMeanType` that specifies the type of mean (`NONE`, `ARITHMETIC`, or `CIRCULAR`). The `mean_type` replaces the bool flag `has_mean`. Not specifying the `mean_type` is deprecated and will stop working in Home Assistant Core 2026.11.
- The items in the return value of the function `async_list_statistic_ids` have `mean_type` and `unit_class`.
- The `has_mean` in the items in the return value of the function `async_list_statistic_ids` is deprecated and will be removed in Home Assistant Core 2026.11.
