---
title: 实体状态颜色变更
description: 从 Home Assistant Core 2022.12 版本开始，当实体处于活动状态时，我们为每个域使用不同的颜色。
date: 2022-12-07
authors:
  - Paul Bottein
areas:
  - frontend
---

从 Home Assistant Core 2022.12 版本开始，当实体（entity）处于活动状态时，我们为每个域（domain）使用不同的颜色。以下 CSS 变量不再使用：

- `--paper-item-icon-active-color`
- `--state-icon-active-color`

这意味着之前覆盖过这些 CSS 变量的任何主题都将使用内置的活动状态颜色。所有这些新颜色也可以作为 CSS 变量使用。

> [!WARNING]
> 由于我们仅官方支持主题的 `primary-color` 和 `accent-color` 属性，某些颜色可能会在不同版本之间被添加或移除。

有关主题配置的更多详细信息，请参阅 [Home Assistant 文档](https://www.home-assistant.io/integrations/frontend/#defining-themes)。
