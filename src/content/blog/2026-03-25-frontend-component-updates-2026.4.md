---
title: 前端组件更新 2026.4
description: 我们持续将基于 Material Design 的组件迁移到基于 Web Awesome 的组件。这次我们迁移了输入组件，这带来了 API 变更，但外观和体验暂时保持不变。
date: 2026-03-25
authors:
  - Wendelin Peleska
areas:
  - frontend
---

> [!NOTE]
> 我们不官方支持也不鼓励自定义卡片开发者使用我们内置的组件。这些组件的 API 可能随时变更，您应该将卡片构建为独立的组件。

## ha-input

我们持续将基于 Material Design 的组件迁移到基于 Web Awesome 的组件。这次我们迁移了输入组件，这带来了 API 变更，但外观和体验暂时保持不变。

- `ha-input` 是 `ha-textfield` 的后继者
  - `ha-textfield` 的 API 保持不变，但该组件已迁移为在内部使用 `ha-input`，并将在 2026.5 中被移除
  - 同时也替代了 `ha-outlined-text-field`
- `ha-input-search` 替代了 `search-input` 和 `search-input-outlined`
- `ha-input-multi` 替代了 `ha-multi-textfield`
- `ha-input-copy` 替代了 `copy-textfield`

该组件还为表单背景引入了新的语义化主题变量：  

```css
--ha-color-form-background: var(--ha-color-neutral-95);
--ha-color-form-background-hover: var(--ha-color-neutral-90);
--ha-color-form-background-disabled: var(--ha-color-neutral-80);
```

## 日期选择器

我们通过用 [Cally](https://wicky.nillia.ms/cally/) 替代日期和日期范围选择器，最终移除了 Vue 2 依赖。
