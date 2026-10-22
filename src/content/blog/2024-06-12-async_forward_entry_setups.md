---
title: 将设置转发到配置条目平台
description: 调用 hass.config_entries.async_forward_entry_setup 已被弃用，并将在 Home Assistant 2025.6 中被移除。
date: 2024-06-12
authors:
  - J. Nick Koston
areas:
  - core
---

调用 `hass.config_entries.async_forward_entry_setup` 已被弃用，并将在 Home Assistant 2025.6 中被移除。请改为 await `hass.config_entries.async_forward_entry_setups`，因为它可以同时加载多个平台，并且效率更高，因为它不需要为每个平台单独创建一个导入执行器（import executor）任务。

如果在配置条目（config entry）正在设置期间调用 `hass.config_entries.async_forward_entry_setups`，则必须始终 await 它，以确保它在配置条目设置完成之前完成。更多详情，请参阅[这篇博客文章](/blog/2022/07/08/config_entry_forwards)。
