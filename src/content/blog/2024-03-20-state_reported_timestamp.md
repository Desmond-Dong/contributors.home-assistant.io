---
title: 新的状态时间戳 State.last_reported
description: 现在，当集成（integration）设置实体（entity）的状态时，State 对象总是会被更新，并且总是会触发一个事件，无论状态或状态属性是否发生任何变化。
date: 2024-03-20
authors:
  - Erik Montnémery
areas:
  - core
---

现在，当集成设置实体的状态时，`State` 对象总是会被更新，并且总是会触发一个事件，无论状态或状态属性是否发生任何变化。这是通过添加一个新的时间戳 `State.last_reported` 和一个新事件 `state_reported` 来实现的。

`state_reported` 事件会大量触发，必须谨慎使用，以避免对系统负载造成不利影响：
 - 订阅所有事件的事件监听器在 `state_reported` 触发时不会被调用。
 - 不允许监听所有实体的 `state_reported` 事件。
 - 监听 `state_reported` 时，必须使用 `event_filter` 来筛选掉其他实体的事件。
 - 监听 `state_reported` 时，必须设置 `run_immediately` 标志。
 
### 背景

Home Assistant 之前会丢弃状态和状态属性均未发生变化的状态写入，除非集成设置了 `force_update` 标志。这种行为使得集成很难正确地对数值传感器状态进行时间序列分析。这也意味着用户无法知道集成是否在更新传感器。

新的时间戳和相关事件已在架构讨论 [#1062](https://github.com/home-assistant/architecture/discussions/1062) 中进行过讨论。

### 对自定义集成的影响

以下 API 存在破坏性变更：
- `hass.bus.async_fire` 的 `time_fired` 参数现在接受 `float` 时间戳，而不是 `datetime` 对象。
- 可传递给 `hass.bus.async_listen` 的事件过滤器的签名已发生变更。
- `Event()` 的 `time_fired: datetime | None` 参数已被替换为 `time_fired_timestamp: float | None`。
- `State()` 的参数列表中间新增了一个参数 `last_reported: datetime`。

更多详情，请参阅 [`core PR #113511`](https://github.com/home-assistant/core/pull/113511) 和 [`core PR #113798`](https://github.com/home-assistant/core/pull/113798)。
