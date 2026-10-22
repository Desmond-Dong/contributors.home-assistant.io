---
title: 在不阻塞事件循环的情况下处理时区
description: 如果传入的时区不在缓存中，构造 ZoneInfo 对象可能会执行阻塞 I/O 以从磁盘加载时区信息。
date: 2024-05-19
authors:
  - J. Nick Koston
areas:
  - core
---

如果传入的时区不在缓存中，构造 `ZoneInfo` 对象可能会执行阻塞 I/O 以从磁盘加载时区信息。

`dt_util.async_get_time_zone` 现已可用，用于替代 `dt_util.get_time_zone`，以便在事件循环（event loop）中获取时区。它是异步安全的，并且不会在事件循环中执行阻塞 I/O。

`hass.config.set_time_zone` 已弃用，并由 `hass.config.async_set_time_zone` 取代。`hass.config.set_time_zone` 将在 2025.6 中被移除。设置时区仅影响测试，因为任何集成（integration）都不应在生产环境中调用此函数。

直接检查 `dt_util.DEFAULT_TIME_ZONE` 的做法已弃用，应改用 `dt_util.get_default_time_zone()`。

如果您的集成需要在事件循环中构造 `ZoneInfo` 对象，建议使用 [`aiozoneinfo` 库](https://pypi.org/project/aiozoneinfo/)。
