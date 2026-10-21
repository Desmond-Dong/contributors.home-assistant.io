---
title: "HACS"
description: "Home Assistant 社区商店（Home Assistant Community Store）：在 2026.11 中 Marketplace 取代它之前，用于安装社区制作的集成、卡片和主题的自定义集成。它的目录和工具仍在使用。"
sidebarGroup: "Installation and system"
term:
  aliases:
    - "Home Assistant Community Store"
  code:
    - "hacs.json"
    - "hacs/default"
    - "hacs/action"
  related:
    - "marketplace"
    - "custom-integration"
  autolink:
    - "HACS"
---

多年来，用户将 HACS 作为[自定义集成](/glossary/custom-integration/)（custom integration）安装，以查找和更新社区作品。从 Home Assistant 2026.11 开始，它已作为 [Marketplace](/glossary/marketplace/) 内置，并且 Home Assistant 会阻止旧的自定义集成。

这个名称在发布者使用的工具中得以延续：[hacs/default](https://github.com/hacs/default) 仓库中的目录、每个仓库中的 `hacs.json` 文件，以及用于验证仓库的 [HACS action](https://github.com/hacs/action)。Marketplace 使用了这三者。
