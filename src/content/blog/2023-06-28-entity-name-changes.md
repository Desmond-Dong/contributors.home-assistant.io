---
title: 实体命名的变更
description: "实体命名有以下几项变更："
date: 2023-06-28
authors:
  - Erik Montnémery
areas:
  - core
---

实体命名有以下几项变更：
- 将实体标记为设备的唯一主要功能（single main feature）现在需要通过将实体的 `name` 属性显式设置为 `None` 来完成；通过不设置 `name` 属性来隐式地将实体标记为设备唯一主要功能的方式已不再受支持。
- 来自某些平台的未命名实体现在会根据其设备类别（device class）获得默认名称，这包括 `binary_sensor`、`button`、`number` 和 `sensor` 实体。

更多详细信息请参阅[实体命名文档](/core/entities/naming/)。
