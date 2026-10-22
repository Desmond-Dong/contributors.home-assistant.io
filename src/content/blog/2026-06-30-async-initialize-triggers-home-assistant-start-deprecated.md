---
title: 弃用 async_initialize_triggers 的 home_assistant_start 标志
description: async_initialize_triggers 专用的 home_assistant_start 标志已被弃用，并将在 Home Assistant Core 2027.8 中移除。
date: 2026-06-30
authors:
  - Erik Montnémery
areas:
  - core
---

`async_initialize_triggers` 专用的 `home_assistant_start` 标志已被弃用，并将在 Home Assistant Core 2027.8 中移除。在弃用期间，该参数不再产生任何作用。

该标志存在的原因是 `homeassistant` 启动触发器是一个伪触发器：它没有像真正的触发器那样运行，而是依赖于触发器 API 的调用者传递 `home_assistant_start=True`，以便 `async_initialize_triggers` 在启动期间触发该触发器。

启动触发器已被重写为作为真正的触发器运行，因此不再需要该标志。`async_initialize_triggers` 的调用者只需停止传递 `home_assistant_start` 即可。

为了实现新的实现方式，重写增加了 `HomeAssistant.async_add_startup_job`，它注册一个作业，该作业将在所有 `EVENT_HOMEASSISTANT_START` 监听器执行完毕后、但在触发 `EVENT_HOMEASSISTANT_STARTED` 之前被调用。这反映了已用于 homeassistant 关闭触发器的方法，并避免了在核心状态和事件之间已经复杂的关系中再添加一个核心状态和事件。

有关更多详细信息，请参阅 [core PR 175160](https://github.com/home-assistant/core/pull/175160)。
