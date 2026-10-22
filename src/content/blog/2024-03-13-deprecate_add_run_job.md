---
title: 弃用 `async_run_job` 和 `async_add_job`
description: async_run_job 和 async_add_job 已被弃用，并将在 Home Assistant 2025.4 中移除。
date: 2024-03-13
authors:
  - J. Nick Koston
areas:
  - core
---

`async_run_job` 和 `async_add_job` 已被弃用，并将在 Home Assistant 2025.4 中移除。此弃用不适用于同步 API 的 `add_job` 方法，该方法目前没有移除计划。

相反，使用其他任务方法之一效率更高，因为无需再去推断调用任务的方式：

如果可调用对象是从配置条目（config entry）运行的协程函数：
`entry.async_create_background_task`, `entry.async_create_task`

如果可调用对象是从其他位置运行的协程函数：
`hass.async_create_background_task`, `hass.async_create_task`

如果可调用对象应在执行器（executor）中运行：
`hass.async_add_executor_job`
