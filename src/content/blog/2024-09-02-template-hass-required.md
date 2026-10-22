---
title: 渲染模板时不再自动设置 Template.hass
description: "随着 core PR #89242 的合并，该更改已随 Home Assistant Core 2023.4 发布，在模式验证（schema validation）期间创建的 Template 对象将会设置 Template.hass。"
date: 2024-09-02
authors:
  - Erik Montnémery
areas:
  - core
---

随着 [core PR #89242](https://github.com/home-assistant/core/pull/89242) 的合并，该更改已随 Home Assistant Core 2023.4 发布，在模式验证期间创建的 `Template` 对象将设置 `Template.hass`。

在此更改之前，在渲染模板前需要检查并设置 `Template.hass`，而且这种操作在代码库中的许多地方都有发生。
这些代码已从 Home Assistant Core 中移除，这会影响自定义集成的作者：
- 手动创建 `Template` 对象的自定义集成必须向构造函数传递一个有效的 `hass` 对象。在为配置项（config entry）创建模板时尤其如此。如果不传递 `hass` 对象，将会触发弃用警告，并将在 Home Assistant Core 2025.10 中导致失败。
- 辅助函数 `template.attach` 已不再有用，核心（core）也不再使用它。它已被标记为弃用，并计划在 Home Assistant Core 2025.10 中移除。
