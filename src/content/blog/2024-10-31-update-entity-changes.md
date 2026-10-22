---
title: 更新实体的变更
description: "更新实体（update entity）已进行调整："
date: 2024-10-31
authors:
  - Erik Montnémery
areas:
  - core
---

### 变更摘要

`update` 实体已进行调整：
- `in_progress` 属性（property）及对应的状态属性（state attribute）现在应仅为一个 `bool` 值，用于指示更新是否正在进行中；如未知，则为 `None`。
- 新增了一个属性及对应的状态属性 `update_percentage`，它可以返回 `int` 或 `float`，以表示 0 到 100% 的进度，或返回 `None`。
- 新增了一个属性及对应的状态属性 `display_precision`，用于在 `update_percentage` 为 `float` 时控制前端显示的小数位数。

### 向后兼容性

在 Home Assistant Core 2025.12 之前，`in_progress` 属性中的数值将被自动复制到 `update_percentage` 状态属性。

### 文档与核心实现

详情请参阅[更新实体开发文档](/core/entities/update/)。

PR：
- 添加 [`update_percentage` 状态属性](https://github.com/home-assistant/core/pull/128877)的 PR
- 添加 [`update_percentage` 属性](https://github.com/home-assistant/core/pull/128908)的 PR
- 添加 [`display_precision` 状态属性和属性](https://github.com/home-assistant/core/pull/128930)的 PR
- [更新集成的更新实体](https://github.com/home-assistant/core/pull/129380)的示例
