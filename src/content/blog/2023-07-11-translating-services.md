---
title: 服务翻译
description: 我们现已支持在 Home Assistant 中翻译服务。此前，服务及其服务字段的名称和描述被硬编码在每个集成的 services.yaml 文件中。
date: 2023-07-11
authors:
  - Franck Nijhof
areas:
  - core
---

我们现已支持在 Home Assistant 中翻译服务（service）。此前，服务及其服务字段的名称和描述都被硬编码在每个集成（integration）的 `services.yaml` 文件中。

我们现在已经添加了使用翻译系统翻译这些名称和描述的支持。这意味着服务及其服务字段的名称和描述现在可以被翻译成任何语言。

为实现这一点，每个服务和字段中的 `name` 和 `description` 键已从硬编码的 `services.yaml` 文件移至每个集成的翻译文件中。

更新后的 `services.yaml` 服务描述示例可[在我们的文档中找到](/core/integrations/actions/#names-and-descriptions)。[后端本地化](/core/integrations/translations/#actions)文档也已扩展，添加了一个翻译后的服务示例，与服务描述中的示例相匹配。

服务翻译功能自 Home Assistant 2023.8 起可用。我们希望这能让非英语用户更方便地使用 Home Assistant。
