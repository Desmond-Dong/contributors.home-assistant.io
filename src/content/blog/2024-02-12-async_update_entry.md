---
title: 修改配置条目
description: 从 Home Assistant 2024.3 开始，对 ConfigEntry 的修改应使用 hass.config_entries.async_update_entry。
date: 2024-02-12
authors:
  - J. Nick Koston
areas:
  - core
---

从 Home Assistant 2024.3 开始，对 `ConfigEntry` 的修改应使用 `hass.config_entries.async_update_entry`。
直接在 `ConfigEntry` 对象上设置属性的方式已被弃用，并将在 2024.9 及更高版本中开始报错。
直接在 `ConfigEntry` 上设置 `unique_id` 没有弃用过渡期，因为这样做会破坏内部状态，此类操作将立即开始报错。

以下属性现在必须通过 `hass.config_entries.async_update_entry` 设置：

- data
- minor_version
- options
- pref_disable_new_entities
- pref_disable_polling
- title
- unique_id
- version

测试必须确保在调用 `hass.config_entries.async_update_entry` 之前，已通过 `entry.add_to_hass(hass)` 将 `MockConfigEntry` 对象添加到 Home Assistant。
