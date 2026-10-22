---
title: 介绍更新实体
description: "Home Assistant 2022.4 将提供一个全新的实体平台：更新实体。"
date: 2022-03-20
authors:
  - Franck Nijhof
areas:
  - core
---

Home Assistant 2022.4 将提供一个全新的实体平台：`update` 实体。

`update` 实体可以由集成提供，用于向 Home Assistant 用户表明某个设备或服务有可用更新。它允许您提供有关该更新的附加信息，例如最新可用版本、发布说明摘要，以及指向在线完整发布公告的链接。

此外，还可以实现 `install` 方法，让用户可以直接在 Home Assistant 中安装更新。

将 `update` 平台添加到您的集成中相对简单，因为它只需要几个属性，以及（如果集成支持的话）一个 `install` 方法。其他大多数细节都由 Home Assistant 自动处理。

在 Home Assistant Core [2021.12](https://www.home-assistant.io/blog/2021/12/11/release-202112/#brand-new-configuration-panel) 中，我们将 Supervisor 提供的更新移到了配置面板；借助这个新平台，我们将来能够利用这些全新实体提供的信息对此进行扩展。

请参阅我们的[开发者文档](/core/entities/update/)，了解如何在集成中实现此功能。

如果您的集成之前提供了带有 `update` 设备类（device class）的 `binary_sensor` 或 `button` 实体，请考虑将其替换为 `update` 实体。
