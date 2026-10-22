---
title: Vacuum 实体集成的更新
description: "Vacuum 实体最近发生了一些变化："
date: 2023-07-10
authors:
  - Erik Montnémery
areas:
  - core
---

Vacuum 实体（entity）最近发生了一些变化：
- `VacuumEntity` 基类已被 `StateVacuumEntity` 取代，相关变更由 2018 年 8 月合并的 [PR 15573](https://github.com/home-assistant/core/pull/15573) 完成，目前该基类已计划在 Home Assistant Core 2024.2.0 中移除。所有核心集成（integration）均已更新，但自定义组件集成的作者需要更新自己的集成。[PR 95920](https://github.com/home-assistant/core/pull/95920) 是近期一个从 `VacuumEntity` 迁移到 `StateVacuumEntity` 的示例。
- `VacuumEntity` 和 `StateVacuumEntity` 支持的服务（service）有所不同，但之前的文档有些含糊不清，导致一些集成从错误的基类实现了服务。现在 [PR 95833](https://github.com/home-assistant/core/pull/95833) 已经防止了这种情况。所有核心集成均已更新，但自定义组件集成的作者需要更新自己的集成。
- `battery_icon` + `battery_level` 状态属性已被弃用。集成可以改为在与 `vacuum` 实体相同的设备上添加一个设备类别（device class）为 `battery` 的 `sensor` 实体来报告电池状态，详情请参阅架构讨论 [938](https://github.com/home-assistant/architecture/discussions/938)。
- `map` 状态属性已被弃用。集成可以改为在与 `vacuum` 实体相同的设备上添加一个 `image` 实体来提供地图图像，详情请参阅架构讨论 [939](https://github.com/home-assistant/architecture/discussions/939)。

更多详情，请参阅 [`vacuum` 文档](/core/entities/vacuum/)。
