---
title: Configurator 集成现已弃用
description: Configurator 集成已被弃用，并将在 Home Assistant 2027.10 中移除。
date: 2026-08-31
authors:
  - Martin Hjelmare
areas:
  - core
---

Configurator 集成已被弃用，并将在 Home Assistant 2027.10 中移除。该集成最初是为了给 Home Assistant 提供一个基于 Web 的配置界面而创建的，但现已不再推荐使用。目前没有任何核心集成再使用 Configurator 集成，也不建议自定义集成使用它。

在 Home Assistant 中配置集成的现代方法是通过配置流和配置条目。[配置流](/core/integrations/config-flow/)提供了用于设置和配置集成的用户友好界面，而配置条目则允许轻松管理集成设置。
