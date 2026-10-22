---
title: 灯具显示效果时灯光颜色模式的更改
description: 引入灯光颜色模式的主要原因在于，灯具的状态不应存在歧义。
date: 2024-01-23
authors:
  - Erik Montnémery
areas:
  - core
---

## 背景

引入灯光颜色模式（color mode）的主要原因在于，灯具的状态不应存在歧义。例如，一个支持彩色以及色温可调的白光的灯具，必须处于颜色模式 `hs`（举例而言）或 `color_temp` 之一。

然而，效果（effect）让情况变得复杂，因为当同一个灯具正在呈现某个效果时，状态属性 `hs_color`、`color_temp` 或 `brightness` 中的任何一个都可能没有意义。

## 变更

### 灯具呈现效果时对 `color_mode` 的要求更为宽松

当效果处于激活状态时，允许灯具使用比其原本支持的颜色模式限制更强的颜色模式：
- 支持彩色的灯具在被效果控制时，可以指示颜色模式 `on_off` 和 `brightness`
- 支持亮度调节的灯具在被效果控制时，可以指示颜色模式 `on_off`。

例如，一个 supported_color_modes 设置为 `{"hs", "color_temp"}` 的灯具，在呈现无法调节的效果时，可以将其 `color_mode` 设置为 `on_off`；在呈现允许控制亮度的效果时，则可以设置为 `brightness`。

### 新增了一种特殊效果 `EFFECT_OFF`，表示无效果 / 关闭效果

以前，支持效果的灯具没有标准的方式来表明当前没有激活任何效果。
这一问题已通过添加预定义效果 `EFFECT_OFF`（用于指示当前未激活任何效果）得到解决。

更多详情请参阅[文档](/core/entities/light/#color-modes)以及[架构讨论 #960](https://github.com/home-assistant/architecture/discussions/960)。
