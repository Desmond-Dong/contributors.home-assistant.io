---
title: model_id 已添加到 DeviceInfo
description: 从 2024.8 开始，您现在可以为 DeviceInfo 类添加模型标识符。
date: 2024-07-16
authors:
  - Joost Lekkerkerker
areas:
  - core
---

从 2024.8 开始，您现在可以为 `DeviceInfo` 类添加模型标识符。该标识符可用于在集成（integration）和前端中识别设备型号。

例如，Philips Hue ambiance spot 之前显示为 "Hue ambiance spot (LTG002)"。现在可以将其拆分，其中 `model` 为 "Hue ambiance spot"，而 `model_id` 为 "LTG002"。
