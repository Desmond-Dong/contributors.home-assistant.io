---
title: 更新协调器支持上下文
description: 从 Home Assistant 2022.7 开始，更新协调器（update coordinator）支持为每个监听的实体（entity）记录上下文（context）。
date: 2022-06-02
authors:
  - Joakim Plate
areas:
  - core
---

从 Home Assistant 2022.7 开始，更新协调器（update coordinator）支持为每个监听的实体（entity）记录上下文（context）。这可以用于根据已启用的实体来限制对 API 的请求。

对于依赖更新协调器、会检查内部变量 `self._listeners` 和/或重载 async_remove_listener() 方法来检测何时不再有监听器的自定义组件而言，这可能是一项破坏性变更（breaking change）。请改用 `async_update_listeners()` 来触发对所有监听器的更新，并重载 `_unschedule_refresh()` 来检测何时不再有监听器。

有关当前用法的更多信息，请参阅更新后的[集成数据获取文档](/core/integrations/fetching-data/)。
