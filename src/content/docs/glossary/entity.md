---
title: "实体（Entity）"
description: "Home Assistant 可以显示、测量或控制的一个事物，例如灯、温度传感器或开关。每个实体都有一个状态。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "entities"
  code:
    - "Entity"
    - "entity_id"
  related:
    - "entity-id"
    - "state"
    - "device"
    - "platform"
    - "unique-id"
  autolink:
    - "entity"
    - "entities"
---

实体（entity）是用户看到并使用的东西：在仪表盘上、在自动化中，以及通过语音使用。集成（integration）会创建它们，通常每个[设备](/glossary/device/)会有多个实体。

每个实体都有一个类型，例如 `light` 或 `sensor`，类型决定了它能做什么以及外观如何。它的[状态](/glossary/state/)是它当前的值，例如 `on` 或 `21.5`。
