---
title: 自定义 Lovelace 的翻译
description: 如果您是自定义 Lovelace 卡片的作者并使用了翻译，请注意，状态翻译的键已经发生了变化。
date: 2020-04-23
authors:
  - Paulus Schoutsen
areas:
  - frontend
---

如果您是自定义 Lovelace 卡片的作者并使用了翻译，请注意，状态（state）翻译的键已经发生了变化。

在 0.109 之前，状态翻译位于 `state.<domain>.<state>` 下，对于二进制传感器（binary sensor）则位于 `state.<domain>.<device class>.<state>` 下。从 0.109 版本开始，这些翻译已成为后端的一部分，因此它们采用了后端翻译的键格式。我们已将状态格式标准化为始终包含设备类别（device class）。设备类别 `_` 被保留，用作没有设备类别的实体（entity）的回退值。

| 旧                                      | 新                                                |
| --------------------------------------- | ------------------------------------------------- |
| `state.<domain>.<state>`                | `component.<domain>.state._.<state>`              |
| `state.<domain>.<device class>.<state>` | `component.<domain>.state.<device class>.<state>` |

在未来的版本中，我们计划将状态属性（state attribute）翻译也迁移到后端。届时我们将在本博客上发布相关消息。
