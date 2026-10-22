---
title: ConfigSubentryFlow 的变更
description: ConfigSubentryFlow._reconfigure_entry_id 已重命名为 ConfigSubentryFlow._entry_id，ConfigSubentryFlow._get_reconfigure_entry 已重命名为 ConfigSubentryFlow._get_entry。
date: 2025-03-24
authors:
  - Erik Montnémery
areas:
  - core
---

`ConfigSubentryFlow._reconfigure_entry_id` 已重命名为 `ConfigSubentryFlow._entry_id`，`ConfigSubentryFlow._get_reconfigure_entry` 已重命名为 `ConfigSubentryFlow._get_entry`。

进行此更改的原因是，子项（subentry）用户流程和子项重新配置流程都需要访问父级配置项（config entry），例如获取选项、数据等。

调用了上述任一被重命名方法的自定义集成（custom integration）需要更新其实现。

此更改已在 [home assistant core PR #141017](https://github.com/home-assistant/core/pull/141017) 中引入。
