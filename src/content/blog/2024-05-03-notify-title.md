---
title: notify 实体平台实现的第二阶段
description: 最近，我们添加了 notify 实体平台。新的 notify 平台方法实现了 send_message 服务。
date: 2024-05-03
authors:
  - Jan Bouwhuis
areas:
  - core
---

### notify 实体平台 send_message 服务的标题（title）选项

最近，我们添加了 notify [实体平台（entity platform）](/core/entities/notify/)。新的 `notify` 平台方法实现了 `send_message` 服务（service）。该服务现在还接受一个可选的 `title` 作为参数。这使得一些现在可以迁移并使用新实体平台的新集成成为可能：

- cisco_webex_teams
- file
- sendgrid
- syslog
- tibber

[架构讨论](https://github.com/home-assistant/architecture/discussions/1041)仍在进行中。

当集成（integration）迁移后，用户将需要使用新的 `notify.send_message` 服务，因此在弃用期（deprecation period）结束后，迁移所带来的更改会导致自动化（automation）失效。
