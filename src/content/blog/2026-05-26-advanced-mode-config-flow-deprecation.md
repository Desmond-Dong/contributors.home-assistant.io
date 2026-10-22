---
title: 弃用数据录入流程中的高级模式
description: 用户配置文件中的高级模式即将移除，这意味着集成将无法再在数据录入流程中检查是否启用了高级模式。
date: 2026-05-26
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

用户配置文件中的[高级模式即将移除](https://github.com/OpenHomeFoundation/roadmap/issues/54)，这意味着集成将无法再在数据录入流程中检查是否启用了高级模式。

集成作者需要更新集成，以使用对用户更友好的替代方式在 UI 中展示额外选项，例如将额外选项分组到一个区块中。

### `FlowHandler.show_advanced_options`
`FlowHandler.show_advanced_options` 属性已被弃用，并将在 Home Assistant Core 2027.6 版本中移除。在弃用期间，`FlowHandler.show_advanced_options` 将无条件返回 `True`，以避免用户无法访问受此标志限制的选项。

### `FlowHandler.context['show_advanced_options']`

`FlowHandler.context` 中不再有 `show_advanced_options` 键。

## 背景

用户配置文件中的高级模式切换开关是一个单一的二进制开关，它控制着 Home Assistant 中一系列不相关功能的显示，从应用（附加组件）的可见性（终端和 SSH）到配置选项和 UI 元素。在过去的一年里，我们一直致力于移除它。

如需更详细的说明，请参阅[路线图问题 #54](https://github.com/OpenHomeFoundation/roadmap/issues/54)。
