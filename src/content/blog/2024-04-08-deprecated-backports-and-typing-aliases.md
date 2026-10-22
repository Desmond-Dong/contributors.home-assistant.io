---
title: 弃用旧的向后移植和类型别名
description: 过去，我们从上游 CPython 向后移植了一些功能，以便尽早使用它们，并改善用户和开发者的体验。
date: 2024-04-08
authors:
  - Marc Mueller
areas:
  - core
---

过去，我们从上游 CPython 向后移植（backport）了一些功能，以便尽早使用它们，并改善用户和开发者的体验。Home Assistant 仅支持 Python 3.12，因此这些功能可以直接从 Python 中使用。这些向后移植现已弃用，并将在未来被移除。

| 已弃用 | 替代方案 | Python 版本 |
| ---------- | ----------- | -------------- |
| `homeassistant.backports.enum.StrEnum` | `enum.StrEnum` | >= 3.11 |
| `homeassistant.backports.functools.cached_property` | `functools.cached_property` | >= 3.8, >= 3.12（性能提升） |

此外，一些类型别名（typing alias）现在也已被弃用。

| 已弃用 | 替代方案 |
| ---------- | ----------- |
| `homeassistant.helpers.typing.ContextType` | `homeassistant.core.Context` |
| `homeassistant.helpers.typing.EventType` | `homeassistant.core.Event` |
| `homeassistant.helpers.typing.HomeAssistantType` | `homeassistant.core.HomeAssistant` |
| `homeassistant.helpers.typing.ServiceCallType` | `homeassistant.core.ServiceCall` |
