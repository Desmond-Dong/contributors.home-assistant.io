---
title: 2026.5 前端组件更新
description: 一个新组件替换了我们代码库中的 mwc-progress-bar，并且完全支持主题化。
date: 2026-05-04
authors:
  - Wendelin Peleska
areas:
  - frontend
---

## 组件更新

### ha-progress-bar

一个新组件替换了我们代码库中的 `mwc-progress-bar`，并且完全支持主题化。请查看此 [PR](https://github.com/home-assistant/frontend/pull/51489) 以了解完全自定义的进度条。

新组件专属令牌：

```css
--ha-progress-bar-indicator-color
--ha-progress-bar-indicator-background
--ha-progress-bar-track-color
--ha-progress-bar-track-height
--ha-progress-bar-border-radius
--ha-progress-bar-animation-duration
--ha-progress-bar-indicator-highlight-image
--ha-progress-bar-indicator-highlight-width
--ha-progress-bar-indicator-highlight-height
```

### ha-switch

`ha-switch` 已迁移至 webawesome。它现在拥有许多 CSS 属性，使自定义变得更加容易。我们还从旧版开关中移除了一些令牌：

已移除的令牌：

```css
--switch-unchecked-button-color
--switch-unchecked-track-color
--switch-unchecked-color
--switch-checked-button-color
--switch-checked-track-color
--switch-checked-color
```

新组件专属令牌：

```css
--ha-switch-size
--ha-switch-thumb-size
--ha-switch-width
--ha-switch-background-color
--ha-switch-thumb-background-color
--ha-switch-background-color-hover
--ha-switch-thumb-background-color-hover
--ha-switch-checked-background-color
--ha-switch-checked-thumb-background-color
--ha-switch-checked-background-color-hover
--ha-switch-checked-thumb-background-color-hover
--ha-switch-border-color
--ha-switch-thumb-border-color
--ha-switch-thumb-border-color-hover
--ha-switch-checked-border-color
--ha-switch-checked-thumb-border-color
--ha-switch-checked-border-color-hover
--ha-switch-checked-thumb-border-color-hover
--ha-switch-thumb-box-shadow
--ha-switch-disabled-opacity
--ha-switch-required-marker
--ha-switch-required-marker-offset
```

### ha-checkbox

`ha-checkbox` 也已迁移至 webawesome 并获得了新的 CSS 属性。你不能再为其使用 MDC 令牌，但我们添加了一组令牌来自定义新的复选框。

新组件专属令牌：

```css
--ha-checkbox-size
--ha-checkbox-border-color
--ha-checkbox-border-color-hover
--ha-checkbox-background-color
--ha-checkbox-background-color-hover
--ha-checkbox-checked-background-color
--ha-checkbox-checked-background-color-hover
--ha-checkbox-checked-icon-color
--ha-checkbox-checked-icon-scale
--ha-checkbox-border-radius
--ha-checkbox-border-width
--ha-checkbox-required-marker
--ha-checkbox-required-marker-offset
```

### ha-textarea

`ha-textarea` 已迁移至 webawesome 并获得了新的 CSS 属性。你不能再为其使用 MDC 令牌，但我们添加了一组令牌来自定义新的文本区域。

API 略有更改。要使文本区域自动调整大小，请将 `resize` 属性设置为 `auto`。

### ha-adaptive-popover

你可能已经了解了（相对较新的）`ha-adaptive-dialog` 组件。它结合了对话框和底部工作表，在桌面端显示对话框，在移动端显示底部工作表。
我们添加了 `ha-adaptive-popover` 作为自适应对话框的弹出框对应组件。它在桌面端显示弹出框，在移动端显示底部工作表。它基于 `ha-adaptive-dialog`，目前用于磁贴卡片的日期选择器功能。

### 移除 ha-fab

`ha-fab` 已被移除，我们现在只使用普通的 `ha-button`，因为位置样式一直是由父组件完成的。

## 样式更新

### 盒阴影令牌

我们添加了新的全局盒阴影令牌：`--ha-box-shadow-s`、`--ha-box-shadow-m`、`--ha-box-shadow-l`

但我们也移除了旧的盒阴影令牌：

```css
--ha-color-shadow-light
--ha-color-shadow-dark
--ha-shadow-offset-x-...
--ha-shadow-blur-...
--ha-shadow-spread-..
```


### 表面颜色

在下一个版本中，我们计划更改处理表面背景颜色的方式。这些令牌现在已引入，但仅用于 ha-tooltip。

新令牌：

```css
--ha-color-surface-default
--ha-color-surface-low
--ha-color-surface-lower
--ha-color-surface-default-inverted
--ha-color-surface-low-inverted
--ha-color-surface-lower-inverted
```
