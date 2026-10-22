---
title: 弃用配置流中结合重载方法的配置条目监听器
description: 自 Home Assistant Core 2026.6 起，弃用在配置流中将配置条目监听器与任何重载方法结合使用的做法，并将从 2026.12 起导致错误。
date: 2026-05-07
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2026.6 起，弃用在配置流中将配置条目监听器与任何重载方法结合使用的做法，并将从 2026.12 起导致错误。

## 背景

在配置流中将配置条目监听器与任何重载方法结合使用，可能会导致集成（integration）重载两次和/或产生竞态条件。

## 可能的解决方案

- 移除配置条目监听器，仅依赖配置流中的重载方法。
- 使用 `async_update_and_abort()` 代替 `async_update_reload_and_abort()`。
- 在调用 `_abort_if_unique_id_configured()` 时设置 `reload_on_update=False`。

更多详细信息可以在 [core PR](https://github.com/home-assistant/core/pull/169198) 中找到。
