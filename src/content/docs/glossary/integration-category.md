---
title: "集成类别"
description: "集成所属的类别，例如照明（Lighting）或能源（Energy），以便人们能根据其功能找到它，例如在网站的集成页面上。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "integration categories"
  code:
    - "categories"
    - "ha_categories"
  related:
    - "integration"
    - "manifest"
    - "custom-integration"
    - "entity-category"
  autolink:
    - "integration category"
    - "integration categories"
---

集成在其[清单文件（manifest）](/core/integrations/manifest/#categories)的 `categories` 键中列出一到三个类别。核心（core）中的每个集成都包含这些类别，但实体（entity）、系统（system）和虚拟（virtual）集成除外。对于自定义集成（custom integration），这些类别是可选的。核心集成的文档页面会在 home-assistant.io 的[前置元数据（front matter）](/writing/reference/front-matter/)中，以 `ha_categories` 列出相同的类别。一个类别可以包含子类别，例如 `energy.ev_charging`。[集成类别](/core/integrations/categories/)页面列出了所有类别，以及如何选择类别。

Home Assistant 中“类别（category）”一词也用于其他用途。它们并不相同：

- 在 Home Assistant 本身中创建的类别，用于组织自动化（automation）、脚本（script）、场景（scene）和辅助元素（helper）。这些类别保存在类别注册表中，对于使用该 Home Assistant 的所有用户都是相同的。
- [实体类别（entity category）](/glossary/entity-category/)用于将实体标记为配置（configuration）或诊断（diagnostic）。
- 在 Marketplace 和 HACS action 中，`category` 指的是仓库的类型：集成、仪表盘插件、主题或模板。
