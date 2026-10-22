---
title: 已从 CalculatedState 中移除 capability_attributes 字段
description: 已从 CalculatedState 中移除 capability_attributes 字段。功能属性（capability attributes）仍包含在全部属性中，这些属性依然可以通过 CalculatedState 获取。
date: 2025-11-10
authors:
  - Artur Pragacz
areas:
  - core
---

`CalculatedState` 中的 `capability_attributes` 字段已被移除。功能属性（capability attributes）仍包含在全部属性（attributes）中，这些属性依然可以在 `CalculatedState` 中获取。

`CalculatedState` 是由 `Entity._async_calculate_state` 返回的、包含状态（state）和属性（attributes）的容器。

详情请参阅 [core PR 151672](https://github.com/home-assistant/core/pull/151672)。
