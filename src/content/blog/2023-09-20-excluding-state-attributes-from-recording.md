---
title: 从记录中排除状态属性的新方法
description: 从记录中排除状态属性的方式已发生变化
date: 2023-09-20
authors:
  - Erik Montnémery
areas:
  - core
---

从记录中排除状态属性（state attributes）的方式已发生变化

Recorder 平台已被两个新属性取代，这两个属性可在派生自 `Entity` 的类中进行设置：
- `_entity_component_unrecorded_attributes: frozenset[str]` - 此属性应由基础组件实体类设置，例如 `LightEntity`
- `_unrecorded_attributes: frozenset[str]` - 此属性应由派生的平台类设置，例如 `HueLight`，用于将
额外的、特定于集成的属性排除在记录之外。


更多详情可参阅[实体（entity）文档](/core/entities/state-attributes/#keep-attributes-out-of-the-history)。

此次变更的背景信息见[架构讨论 #964](https://github.com/home-assistant/architecture/discussions/964)。
