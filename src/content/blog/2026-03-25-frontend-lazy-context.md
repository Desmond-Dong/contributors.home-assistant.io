---
title: 前端懒加载上下文
description: 在 Home Assistant 前端中，上下文（Context）是一种在组件树中共享数据的方式，无需将其作为属性显式地逐层传递。
date: 2026-03-25
authors:
  - Wendelin Peleska
areas:
  - frontend
---

## 什么是上下文？

在 Home Assistant 前端中，[上下文（Context）](https://lit.dev/docs/data/context/) 是一种在组件树中共享数据的方式，无需将其作为属性显式地逐层传递。你无需将 `hass` 对象逐层传递给多层组件，而是可以通过上下文提供特定的数据片段，并只在需要的地方消费它们。

与传递整个 `hass` 对象相比，使用上下文的主要优势在于：

- **使用更简便**：组件可以直接消费所需的数据，而无需父组件逐层传递。这减少了属性层层下传（prop drilling）的问题，使组件更加自包含、更易于复用。
- **减少不必要的组件重新渲染**：当组件通过属性接收 `hass` 时，`hass` 的任何变更都会触发该组件及其所有子组件重新渲染——即使该组件只关心其中一小部分数据。通过上下文仅提供组件所需的特定数据，可以确保组件只在实际依赖发生变化时才重新渲染，从而带来更好的性能和更灵敏的 UI。

## LazyContext 简介

我们引入了一种新的 `LazyContext` 模式，用于取代传统的基于订阅的方式以及 `SubscribeMixin` 的用法。在此之前，组件需要自行订阅数据源并手动管理订阅的生命周期，这往往会产生大量样板代码，而且如果订阅没有被妥善清理，还可能导致内存泄漏。

`LazyContext` 通过以下方式简化了这些工作：

- **懒加载**：只有当组件真正消费上下文时才会获取数据
- **自动清理**：订阅会被自动管理
- **共享状态**：多个消费同一上下文的组件共享同一个订阅
- **优化的重新渲染**：数据变化时，只有消费该上下文的组件才会重新渲染

这种方式将数据获取逻辑集中在一处，使你更容易理解数据在何时、以何种方式流经你的应用。

## 示例

### 定义 LazyContext

要定义一个懒加载上下文，请使用 `LazyContextProvider` 并提供一个获取数据的函数：

```ts
new LazyContextProvider(this, {
  context: labelsContext,
  subscribeFn: (connection, setValue) => subscribeLabelRegistry(connection, setValue),
})
```

### 使用 lit 消费上下文

要在组件中消费上下文，请使用 `@consume` 装饰器：

```ts
@state()
@consume({ context: labelsContext, subscribe: true })
private _labels?: LabelRegistryEntry[];
```

查看更新后的自定义卡片示例，以便在原生 JS 中使用它：[自定义卡片示例](/frontend/custom-ui/card/)。

### 使用 @transform 派生数据

_仅在 home-assistant 前端代码库中可用_

`@transform` 装饰器允许你从上下文的值中派生数据，确保组件只在转换后的值真正发生变化时才重新渲染。


```ts
@state()
@consume({ context: statesContext, subscribe: true })
@transform({
  transformer: function (this: HuiButtonCard, entityStates: HassEntities) {
    return this._config?.entity ? entityStates?.[this._config?.entity] : undefined;
  },
  watch: ["_config"],
})
private _stateObj?: HassEntity;
```

使用 `@transform` 时，即使完整的 states 对象发生更新，组件也只会在转换结果（`_stateObj`）真正发生变化时才重新渲染。`watch` 选项允许你指定额外的属性，当这些属性发生变化时将触发转换器函数重新求值——在本例中，当 `_config` 发生变化时，转换器会再次运行，以提取正确的实体（entity）状态。
