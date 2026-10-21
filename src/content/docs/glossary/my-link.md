---
title: "My 链接"
description: "指向 my.home-assistant.io 的链接，可在读者自己的 Home Assistant 中打开相应页面，例如其集成页面或新建自动化。"
sidebarGroup: "Frontend"
term:
  aliases:
    - "My Home Assistant"
    - "My links"
  code:
    - "my.home-assistant.io"
  related:
    - "integration"
    - "config-flow"
    - "blueprint"
    - "app"
    - "marketplace"
  autolink:
    - "My link"
    - "My links"
---

文档和集成使用 My 链接（My link）将读者直接带到正确的位置，无论其 Home Assistant 运行在哪里。

My 链接的形式为 `https://my.home-assistant.io/redirect/<name>/`。有些链接带有参数，例如 `https://my.home-assistant.io/redirect/config_flow_start/?domain=hue`，它会开始设置 Hue 集成（integration）。每个链接还有一个徽章图片，位于 `https://my.home-assistant.io/badges/<name>.svg`，可用于 README 或论坛帖子中的按钮。有些名称仍使用旧名称，例如 `supervisor_add_addon_repository`，它会打开添加应用仓库的对话框。

[My 链接生成器](https://my.home-assistant.io/create-link/)列出了所有链接，并为你生成链接和徽章。贡献者在以下地方使用它们：

- [home-assistant.io 上的 `{% my %}` 标签](/writing/reference/liquid/#my-links)
- [用于添加应用仓库的徽章](/apps/guides/repository/#make-it-one-step)
- [指向 Marketplace 中仓库的链接](/marketplace/guides/catalog/#the-link-to-your-repository)
- [用于设置自定义集成的徽章](/marketplace/guides/integrations/#link-to-the-setup)
- [蓝图（blueprint）导入徽章](/marketplace/guides/blueprints/#share-it)
