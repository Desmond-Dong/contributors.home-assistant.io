---
title: 弃用媒体播放器的常量
description: 自 Home Assistant Core 2022.5 起，MediaPlayerEntity 中使用的功能标志常量已被弃用，并由 MediaPlayerEntityFeature 枚举取代。
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2022.5 起，`MediaPlayerEntity` 中使用的功能标志常量已被弃用，并由 `MediaPlayerEntityFeature` 枚举取代。随后在 2022.10 中，重复模式、媒体类型和媒体类别的常量也已被弃用，分别由 `RepeatMode`、`MediaType` 和 `MediaClass` 取代。

然而，此前并未进行正式的弃用流程，因此我们现在从 2024.10 开始为期一年的弃用期，这些常量将从 2025.10 起停止工作，以确保所有自定义集成（custom integration）的作者都有时间进行调整。
