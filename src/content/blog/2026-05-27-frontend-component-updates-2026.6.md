---
title: 2026.6 前端组件更新
description: ha-radio 已从我们的代码库中移除，我们现在使用基于 webawesome 的 ha-radio-group 和 ha-radio-option。
date: 2026-05-27
authors:
  - Wendelin Peleska
areas:
  - frontend
---

## 组件更新

### ha-radio 更新

`ha-radio` 已从我们的代码库中移除，我们现在使用基于 webawesome 的 `ha-radio-group` 和 `ha-radio-option`。不再需要在 `ha-radio` 外包裹 `ha-formfield`，并且你可以使用新的 CSS 属性来自定义单选框组和选项。

新的组件专属令牌：

```css
--ha-radio-group-required-marker
--ha-radio-group-required-marker-offset

--ha-radio-option-active-color
--ha-radio-option-heigh
--ha-radio-option-toggle-size
--ha-radio-option-border-width
--ha-radio-option-border-color
--ha-radio-option-border-color-hover
--ha-radio-option-background-color
--ha-radio-option-background-color-hover
--ha-radio-option-checked-background-color
--ha-radio-option-checked-icon-color
--ha-radio-option-checked-icon-scale
--ha-radio-option-control-margin
```

### ha-drawer 更新

`ha-drawer` 已更新为使用 webawesome 的抽屉组件。API 基本保持不变，只是现在使用 `--ha-sidebar-width` 代替了 `--mdc-drawer-width`。

### 顶部栏
- `ha-top-app-bar` 已被完全移除。
- `ha-top-app-bar-fixed` 已从 MWC 迁移到纯 Lit。
- `ha-two-pane-top-app-bar-fixed` 已重写，以扩展新的实现，而不是 Material 基础代码。
- `ha-header-bar` 已从 Material 顶部应用栏样式的包装器重写为原生 Lit 组件。

`--ha-top-app-bar-width` 令牌替换了 `--mdc-top-app-bar-width`。

## 新装饰器

### @consumeLocalize

继上个版本引入的[上下文条目装饰器](/blog/2026/05/04/frontend-context-groups-decorators)之后，我们为从 `internationalizationContext` 读取最常见单字段的操作添加了一个快捷方式：`localize` 函数。

修改前：

```ts
@state()
@consume({ context: internationalizationContext, subscribe: true })
@transform<HomeAssistantInternationalization, LocalizeFunc>({
  transformer: ({ localize }) => localize,
})
private _localize!: LocalizeFunc;
```

修改后：

```ts
@state()
@consumeLocalize()
private _localize!: LocalizeFunc;
```

当组件只需要 `localize` 函数时，请使用 `@consumeLocalize()`。对于从 `internationalizationContext` 读取其他单字段（例如 `locale`、`language`），请继续使用 `@consume` + `@transform`。
