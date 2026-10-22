---
title: 天气实体预报类型
description: WeatherEntity 现在允许单个天气实体支持不同的预报类型，这意味着不再需要为同一位置创建多个实体，例如，一个实体提供每日预报，另一个实体提供每小时预报。
date: 2023-08-07
authors:
  - G Johansson
areas:
  - core
---

`WeatherEntity` 现在允许单个天气实体（entity）支持不同的预报类型，这意味着不再需要为同一位置创建多个实体，例如，一个实体提供每日预报，另一个实体提供每小时预报。

提供 `weather` 实体的集成（integration）应更新为实现 `async_forecast_daily`、`async_forecast_hourly` 和 `async_forecast_twice_daily` 这些新异步方法中的一种或多种。

在即将发布的 Home Assistant Core 2024.3 版本中，集成应移除已弃用的 `forecast` 属性，并移除之前为提供多种预报而添加的所有重复的天气实体。

有关如何实现新预报方法的详细信息，请参阅 [`weather` 开发者文档](/core/entities/weather/#forecasts)。

"Weather Forecast Card" 已更新，如果集成使用了新方法，它将为用户提供选择要显示的首选预报类型的选项。
