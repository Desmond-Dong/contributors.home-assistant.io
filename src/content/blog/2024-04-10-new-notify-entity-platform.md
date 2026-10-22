---
title: 新的 notify 实体平台
description: notify 平台现在已作为实体平台提供。新 notify 平台的 MVP 实现了 send_message 方法和服务。
date: 2024-04-10
authors:
  - Jan Bouwhuis
areas:
  - core
---

### 新的 notify 实体平台

notify 平台现在已作为[实体平台（entity platform）](/core/entities/notify/)提供。新 `notify` 平台的 MVP [实现了](https://github.com/home-assistant/core/pull/110950) `send_message` 方法和服务（service）。它接受 `message` 作为必需的属性。
与旧版的 `notify.notify` 服务不同，我们不再将目标（targets）作为参数；由于它是一个实体（entity），我们在调用 `send_message` 时可以指定多个 `notify` 实体。

[架构讨论](https://github.com/home-assistant/architecture/discussions/1041)仍在进行中，主要涉及要实现的设备类（device class），以及以[通过联系人注册表（contact registry）实现的联系人](https://github.com/home-assistant/architecture/discussions/1041#discussioncomment-8947842)的形式来支持收件人（recipient）。

实现旧版 `notify` 服务的现有集成（integration）将分阶段迁移。第一步是迁移那些仅使用 `message` 作为通知参数的集成。

已确定需要迁移的集成包括：

- circuit
- clickatell
- clicksend
- command_line
- demo
- ecobee
- flock
- free_mobile
- knx
- mastodon

一旦我们提供了 `title` 和/或 `recipient` 支持，就可以迁移更多集成来使用新平台。

当集成迁移完成后，用户将需要使用新的 `notify.send_message` 服务，因此这些迁移更改将导致自动化（automation）在弃用期结束后失效。
