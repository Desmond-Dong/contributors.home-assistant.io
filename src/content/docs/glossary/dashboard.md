---
title: "仪表盘"
description: "一个由卡片组成的页面，用于显示和控制家庭。用户可以拥有任意数量的仪表盘。"
sidebarGroup: "Frontend"
term:
  aliases:
    - "dashboards"
  code:
    - "lovelace"
    - "hui-"
  formerly:
    - "Lovelace"
    - "Lovelace UI"
  related:
    - "view"
    - "card"
    - "strategy"
    - "panel"
  autolink:
    - "dashboard"
    - "dashboards"
---

一个仪表盘（dashboard）包含一个或多个[视图（view）](/glossary/view/)，每个视图承载若干[卡片（card）](/glossary/card/)。Home Assistant 可以通过[策略（strategy）](/glossary/strategy/)自动构建仪表盘。

仪表盘曾以其代号 Lovelace 命名，直到 Home Assistant 2022.4 才更改。代码中仍在使用该名称，例如 `lovelace` 面板以及仪表盘元素的 `hui-` 前缀。在文字中，请使用“仪表盘”。
