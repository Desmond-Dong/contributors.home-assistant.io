---
title: 弃用 `async_add_hass_job`
description: 作为提升性能和简化核心任务 API 的一部分，async_add_hass_job 已被弃用，并将于 2025.5 从 Home Assistant 中移除。
date: 2024-04-07
authors:
  - J. Nick Koston
areas:
  - core
---

作为提升性能和简化核心任务 API 的一部分，`async_add_hass_job` 已被弃用，并将于 2025.5 从 Home Assistant 中移除。

调用应改用 `async_run_hass_job`。
