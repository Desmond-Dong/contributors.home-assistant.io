---
title: "0.71：改进的自定义面板与自定义 UI 的细微变更"
description: 前端现代化和本地化的工作正在全速推进。这篇博文将介绍 Home Assistant 0.71 即将推出的新功能，该版本应于今日进入 beta 渠道，并计划于一周后正式发布。
date: 2018-06-01
authors:
  - Paulus Schoutsen
areas:
  - frontend
---

前端现代化和本地化的工作正在全速推进。这篇博文将介绍 Home Assistant 0.71 即将推出的新功能，该版本应于今日进入 beta 渠道，并计划于一周后正式发布。

## 改进的自定义面板支持

自定义面板（custom panel）允许开发者构建能够插入 Home Assistant 用户界面的面板，其功能与我们其他的面板（如历史、地图等）相同。Home Assistant 前端将负责管理身份验证以及订阅后端的状态（state），面板只需负责展示数据，并可以为用户提供控制选项（如调用服务（service）等）。

这项支持已经存在了一段时间，但上周我们花了一些时间[打磨](https://github.com/home-assistant/core/pull/14708)这项支持，并新增了三项功能：

第一个新功能是我们现在允许从 JavaScript URL 导入面板。这将成为今后分发面板的首选方式。这也意味着你可以引用托管在外部的面板。在外部面板加载之前，用户需要先进行批准。用户仍然可以在本地托管面板（无需批准），只需将面板复制到 `<config dir>/www/your-panel.js`，并使用 `/local/your-panel.js` 作为 URL 即可。

第二个新功能是我们现在可以将你的面板嵌入到 iFrame 中。这使面板开发者无需担心包含重复的 web components，也使得开发基于 React 的面板成为可能。过去，基于 React 的面板无法正常工作，因为 React 在 Shadow DOM 中表现不佳（[更多信息](https://github.com/facebook/react/pull/12163)）。

第三个新功能是我们现在提供了一个[入门套件](https://github.com/home-assistant/custom-panel-starter-kit-react)，用于开始开发基于 React 的面板！该套件包含了开始开发基于 React 的面板并与社区分享所需的一切。让我们知道你在构建什么吧！

## 自定义 UI：`<state-info>` 和 `<ha-relative-time>`

如果你正在构建自定义 UI，那么你很可能正在使用 `<state-info>` 或 `<ha-relative-time>`。虽然它们并未作为对外 API 得到官方支持，但我们仍想提前告知，之后需要将 `hass` 对象传入。

这是必要的，因为得益于 [#1241](https://github.com/home-assistant/frontend/pull/1241.) 中的 c727，`<ha-relative-time>` 现在可以进行本地化了。
