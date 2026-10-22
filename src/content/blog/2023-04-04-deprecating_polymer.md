---
title: 弃用 Polymer
description: Home Assistant 前端曾使用 Polymer 库来构建其 Web 组件。
date: 2023-04-04
authors:
  - Bram Kragten
areas:
  - frontend
---

Home Assistant 前端曾使用 [Polymer 库](https://polymer-library.polymer-project.org/3.0/docs/about_30)来构建其 Web 组件。此后，Polymer 已被弃用，并由 [Lit](https://lit.dev) 取代。

在过去几年中，我们将前端的大部分迁移到了 Lit，目前只有少数地方和依赖项仍在使用 Polymer。

这是个好消息，因为 Lit 比 Polymer 快得多，也更加轻量。

在 Home Assistant 2023.4 中，我们最终从 Home Assistant 的入口点移除了最后一块 Polymer 代码，这意味着应用启动时不再加载它，只有在组件需要时才会加载。

对于自定义卡片和面板，我们曾在 window 对象上提供 Polymer，以便更方便地访问和使用。但如今它已几乎不再被使用，而且由于 Home Assistant 已不再使用它，它主要是一大块未使用的代码，拖慢了 Home Assistant 的加载速度。

这就是我们决定移除它的原因。

从 Home Assistant 2023.5 开始，Home Assistant 将不再提供 Polymer。如果您现在正在使用 Polymer，我们建议您切换到 Lit。如果您想继续使用 Polymer，则需要自行加载 Polymer。

在 Home Assistant 2023.4 中，每次访问 Polymer 时我们都会记录一条警告。如果您收到了这样的日志消息，请找出使用 Polymer 的自定义卡片、面板或更多信息（more info）对话框，并告知作者此弃用事宜。
