---
title: 现在要求灯必须设置颜色模式
description: 灯实体（light entity）现在必须设置 supported_color_modes 和 color_mode 属性，若未设置，将记录一条警告，要求用户报告问题。
date: 2024-02-12
authors:
  - Erik Montnémery
areas:
  - core
---

## 变更

灯实体（light entity）现在必须设置 `supported_color_modes` 和 `color_mode` 属性，若未设置，将记录一条警告，要求用户报告问题。

此外，如果灯报告了无效的 `supported_color_modes` 组合，或报告了除 `ColorMode.UNKNOWN` 以外、且未包含在该灯 `supported_color_modes` 中的 `color_mode`，也将记录一条警告。

在 Home Assistant 2025.3 版本中，这些警告将被移除，仍未升级为颜色模式的灯或违反颜色模式规则的灯将无法继续工作。

更多详细信息请参阅[文档](/core/entities/light/#color-modes)。
