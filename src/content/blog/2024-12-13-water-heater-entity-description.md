---
title: WaterHeaterEntityDescription 名称变更
description: 在热水器（Water Heater）集成中发现了一个实体描述（entity description）的命名错误，我们已在 2025.1 版本中将 WaterHeaterEntityEntityDescription 重命名为 WaterHeaterEntityDescription。
date: 2024-12-13
authors:
  - Ludovic Boué
areas:
  - core
---

在热水器（Water Heater）集成中发现了一个实体描述（entity description）的命名错误，我们已在 2025.1 版本中将 `WaterHeaterEntityEntityDescription` 重命名为 `WaterHeaterEntityDescription`。
旧的 `WaterHeaterEntityEntityDescription` 已被弃用，计划于 2026.1 版本移除，建议开发者改用新的 `WaterHeaterEntityDescription`。

详情请参阅 core PR：[#132888](https://github.com/home-assistant/core/pull/132888)。
