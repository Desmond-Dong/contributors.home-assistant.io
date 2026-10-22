---
title: 实用工具函数 homeassistant.util.dt.utc_to_timestamp 已被弃用
description: 实用工具函数 homeassistant.util.dt.utc_to_timestamp 已被弃用，并将在 Home Assistant Core 2026.1 中移除，调用它的自定义集成（custom integration）应改为调用标准库方法 datetime.datetime.timestamp()
date: 2024-11-28
authors:
  - Erik Montnémery
areas:
  - core
---

实用工具函数 `homeassistant.util.dt.utc_to_timestamp` 已被弃用，并将在 Home Assistant Core 2026.1 中移除，调用它的自定义集成（custom integration）应改为调用标准库方法 `datetime.datetime.timestamp()`

弃用的原因是标准库方法与该实用工具函数的速度一样快。

更多详情请参阅 [core PR](https://github.com/home-assistant/core/pull/131787)。
