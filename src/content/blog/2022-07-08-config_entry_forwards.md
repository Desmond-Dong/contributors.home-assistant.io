---
title: 等待配置条目平台
description: 在 2022.8 之前，如果配置条目所加载的某个平台尚未加载，则无法在不发生死锁的情况下等待配置条目的平台转发。
date: 2022-07-08
authors:
  - J. Nick Koston
areas:
  - core
---

在 2022.8 之前，如果配置条目（config entry）所加载的某个平台尚未加载，则无法在不发生死锁的情况下 `await` 配置条目的平台转发。

集成（integration）需要进行重构，将对 `hass.config_entries.async_setup_platforms` 的调用替换为等待 `hass.config_entries.async_forward_entry_setups`，以确保在实体（entity）和平台仍在设置的过程中，Home Assistant 不会无意中重新加载集成。

`hass.config_entries.async_setup_platforms` 计划于 2022.12 移除。
