---
title: 自定义 UI 和自定义面板的更新
description: 随着 Home Assistant 0.70 的发布，我们将前端的构建流水线从基于 HTML 导入迁移到了 ES 模块导入（稍后会详细介绍）。
date: 2018-05-22
authors:
  - Paulus Schoutsen
areas:
  - frontend
---

随着 Home Assistant 0.70 的发布，我们将前端的构建流水线从基于 HTML 导入迁移到了 ES 模块导入（稍后会详细介绍）。由此带来的一个影响是，我们不再使用 `window` 对象与其他代码共享类、数据和实用工具。

如果您依赖其中的某些内容，这可能会对您产生影响。例如 Polymer（`window.Polymer`），或者是我们那些曾经可以通过 `window.hassUtil`、`window.HAWS` 或 `window.hassMixins` 访问的实用函数。

为了让开发者有时间进行迁移，我们正在添加一个临时的旧版支持层（legacy support layer），它会在 `window` 对象上再次暴露我们的一些内部内容。我们已经添加了 `window.Polymer`、`window.Polymer.Element` 和 `window.Polymer.html`。如果您在使用 window 对象中的其他特定内容，[请告诉我们](https://github.com/home-assistant/frontend/issues/1157)。

该旧版支持层将不再包含在 2018 年 7 月之后发布的版本中。
