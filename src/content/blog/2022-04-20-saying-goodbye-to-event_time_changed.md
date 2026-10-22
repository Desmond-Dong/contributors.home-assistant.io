---
title: 告别 time_changed 事件
description: 在 Home Assistant Core 0.113 中，我们开始过渡到使用 asyncio 事件循环来调度事件。
date: 2022-04-20
authors:
  - J. Nick Koston
areas:
  - core
---

在 Home Assistant Core 0.113 中，我们开始过渡到使用 asyncio 事件循环来调度事件。

在 2022.5 中，我们很高兴地宣布这一过程现已完成。旧的 `time_changed` 事件（也称为 `EVENT_TIME_CHANGED`）不再每秒触发一次。监听所有事件的集成（integration）不再需要过滤掉 `EVENT_TIME_CHANGED`。在独立线程中运行的集成可能会获得轻微的性能提升，因为它们不再每秒被唤醒一次。

在之前的实现中，使用者会订阅 `time_changed` 事件，并在它每次触发时检查时间以确定是否匹配。这种模式导致了大量回调，而在大多数情况下，回调会拒绝该事件并继续接收后续回调，直到到达所需的时间。

如果您自定义的集成仍然依赖于监听 `time_changed` 事件，则需要过渡为使用内置的事件辅助方法（helper）之一，在大多数情况下，这只需一行代码即可直接替换。有关更多信息，请查看[关于监听事件的
集成文档](/core/integrations/events/#time)。
