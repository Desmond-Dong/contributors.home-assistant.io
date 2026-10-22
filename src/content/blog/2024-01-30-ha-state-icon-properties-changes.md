---
title: ha-state-icon 的属性变更
description: 在 Home Assistant 2024.2 中，集成（integration）有了一种提供图标的新方式。为支持这一新功能，ha-state-icon 组件的属性发生了变化。
date: 2024-01-30
authors:
  - Paul Bottein
areas:
  - frontend
---

在 Home Assistant 2024.2 中，集成（integration）有了一种提供图标的新方式。为支持这一新功能，`ha-state-icon` 组件的属性发生了变化。

[在我们的文档中阅读有关图标翻译的更多信息](/core/entities/icons/)。

如果您是使用该组件的自定义卡片开发者，则必须调整传递给该组件的属性，以避免在您的自定义卡片中显示错误的图标。

### 2024.2 之前

```html
<ha-state-icon .state=${stateObj}></ha-state-icon>
```

### 2024.2 之后

```html
<ha-state-icon .hass=${hass} .stateObj=${stateObj}></ha-state-icon>
```

### 向后兼容

如果您想同时支持 Home Assistant 的新旧版本，可以传递所有属性。

```html
<ha-state-icon
  .hass=${hass}
  .stateObj=${stateObj}
  .state=${stateObj}
></ha-state-icon>
```
