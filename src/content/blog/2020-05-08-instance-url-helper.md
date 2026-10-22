---
title: 实例 URL 助手
description: 如果你是一名集成（integration）开发者，曾遇到过获取用户 Home Assistant 实例 URL 的问题，那么你可能知道，这一直以来都不是件容易的事。
date: 2020-05-08
authors:
  - Franck Nijhof
areas:
  - core
---

如果你是一名集成（integration）开发者，曾遇到过获取用户 Home Assistant 实例 URL 的问题，那么你可能知道，这一直以来都不是件容易的事。

主要问题在于，Home Assistant 实例通常安装在家中。这意味着内部和外部地址可能不同，甚至这些地址本身也可能有所变化（例如，当用户订阅了 Home Assistant Cloud 时）。

如果集成对 URL 有特殊要求，情况会变得更加糟糕；例如，URL 必须能从外部访问，并且需要 SSL。

自 Home Assistant Core 0.110 起，我们引入了一个新的实例 URL 助手来简化这一工作。为了解决这个问题，我们最初设计了下面这张流程图：

[![获取 Home Assistant 实例 URL 的流程图](/img/en/blog/2020-05-instance-url-helper/flowchart.png)](/img/en/blog/2020-05-instance-url-helper/flowchart.png)

由此，之前使用的 `base_url` 已被两个新的核心配置项取代，供用户设置：内部 URL 和外部 URL。

从开发角度来看，`hass.config.api.base_url` 现已弃用，建议改用新的 `get_url` 辅助方法。

有关使用和实现这一全新 URL 辅助方法的更多信息，请[在此](/core/integrations/instance-url/)查阅我们的文档。
