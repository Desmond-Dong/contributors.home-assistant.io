---
title: 前端上下文组、新的上下文装饰器以及弃用的上下文
description: 在上一个版本中，我们引入了惰性上下文（lazy context），并且希望更多地使用 hass 上下文和惰性上下文，以替代直接传递 hass 对象。
date: 2026-05-04
authors:
  - Wendelin Peleska
areas:
  - frontend
---

在上一个版本中，我们引入了惰性上下文（lazy context），并且希望更多地使用 hass 上下文和惰性上下文，以替代直接传递 hass 对象。
我们发现小型任务通常需要订阅多个上下文，因此我们将 Hass 上下文分组为逻辑组。

## 上下文组

已添加以下上下文组：

- registriesContext：包含所有注册表（设备、实体、区域等）
- internationalizationContext：包含所有国际化相关数据（区域设置、本地化等）
- apiContext：包含所有 API 相关方法（callService、callWS 等）
- connectionContext：包含所有连接相关数据（connection、connected、hassUrl 等）
- uiContext：包含所有 UI 相关数据（主题、面板、停靠侧边栏等）
- configContext：包含所有配置相关数据（auth、config、user 等）

## 消费上下文条目的装饰器

在上一[篇博客文章](/blog/2026/03/25/frontend-lazy-context)中，我展示了如何使用 `@transform` 处理上下文。`@transform` 功能强大，但有时你只需要单个上下文条目，而不想定义转换函数。
为了支持这一点，我们添加了直接消费单个上下文条目的装饰器。
你传入一个数组来定义实体 ID 的来源（通常是配置属性），该装饰器会消费正确的上下文，并将实体 ID 映射到正确的注册表条目。
它还会监视定义的路径，并在需要时更新条目。

新的装饰器：

- @consumeEntityState
- @consumeEntityStates
- @consumeEntityRegistryEntry

示例用法：

```ts
@state()
@consumeEntityRegistryEntry({ entityIdPath: ["_config", "entity"] })
_entity?: EntityRegistryDisplayEntry;
```

未来我们可能会添加更多此类装饰器，例如用于区域、设备等。

## 弃用的上下文

这些上下文仍然可用，但可能会在未来的版本中移除。请改用新的上下文组。

- connectionSingleContext
- localizeContext
- localeContext
- configSingleContext
- themesContext
- selectedThemeContext
- userContext
- userDataContext
- panelsContext
- authContext
