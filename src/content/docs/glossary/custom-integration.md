---
title: "自定义集成（custom integration）"
description: "不属于 Home Assistant Core 的集成，由用户安装到 `custom_components` 文件夹中。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "custom integrations"
    - "custom component"
  code:
    - "custom_components/"
  related:
    - "integration"
    - "backward-incompatible-change"
    - "custom-card"
    - "marketplace"
  autolink:
    - "custom integration"
    - "custom integrations"
---

任何人都可以编写自定义集成（custom integration），它的工作方式与其他集成相同。项目不会对它们进行审核，Home Assistant Core 的变更也可能导致它们失效，因此面向开发者的不向后兼容变更（backward-incompatible changes）会在博客上公告。

自定义集成需要在其清单（manifest）中包含 `version`。用户可以通过 [Marketplace](/glossary/marketplace/) 查找并安装许多自定义集成，该功能从 2026.11 起内置于 Home Assistant。在此之前，Marketplace 是 [HACS](/glossary/hacs/)，它本身也是一个自定义集成。要发布自定义集成，请参阅 Marketplace 区域中的 [custom integrations](/marketplace/guides/integrations/)。这也是开始开发新集成的推荐方式，请参阅 [does it belong in core](/core/integrations/create/#does-it-belong-in-core)。
