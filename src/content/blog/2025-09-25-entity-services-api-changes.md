---
title: 改进的用于注册平台实体服务的 API
description: 平台实体服务应通过从集成的 async_setup 调用辅助函数 service.async_register_platform_entity_service 来注册，而不是在平台设置期间调用 platform.async_register_entity_service。
date: 2025-09-25
authors:
  - Erik Montnémery
areas:
  - core
---

平台实体服务（platform entity service）应通过从集成的 `async_setup` 中调用辅助函数 [`service.async_register_platform_entity_service`](/core/integrations/actions/#entity-actions) 来注册，而不是在平台设置期间调用 `platform.async_register_entity_service`。

现有集成应迁移到新 API，以确保服务的加载不依赖于平台设置。

有关迁移的示例，请参阅 [core PR 152172](https://github.com/home-assistant/core/pull/152172) 和 [core PR 152047](https://github.com/home-assistant/core/pull/152047)。
