---
title: 实体动作架构（schema）的验证
description: "注册实体服务动作时，集成作者可以传入："
date: 2024-08-27
authors:
  - Erik Montnémery
areas:
  - core
---

注册实体服务动作（entity service action）时，集成作者可以传入：
- 不使用架构（`None`）
- 一个字典（dictionary），将其传入 `cv.make_entity_service_schema` 后会被转换为 voluptuous 架构
- 自定义的 voluptuous 架构

对于第三种情况，现在如果注册实体动作时使用的自定义架构不满足以下至少一项标准，将会记录一条警告：
- 由 `cv.make_entity_service_schema` 返回的验证器
- 由 `cv.make_entity_service_schema` 返回、并包裹在 `vol.Schema` 中的验证器
- 由 `cv.make_entity_service_schema` 返回、并包裹在 `vol.All` 中的验证器

从 Home Assistant Core 2025.10 开始，将无法再注册使用不满足此要求的自定义架构的实体动作。

做出这一更改的原因是，如果不使用 `cv.make_entity_service_schema`，该服务将不会自动支持所有可能的目标实体指定方式。

更多详情请参阅[开发者文档](/core/integrations/actions/#entity-actions)以及 core PR [#124102](https://github.com/home-assistant/core/pull/124102) 和 [#125057](https://github.com/home-assistant/core/pull/125057)。
