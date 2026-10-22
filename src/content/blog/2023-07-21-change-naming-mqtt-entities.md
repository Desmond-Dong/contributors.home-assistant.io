---
title: MQTT 实体（entity）的命名变更为符合 HA 准则
description: MQTT 实体的命名方式以及在已发现的实体之间共享设备配置的方式已发生变更
date: 2023-07-21
authors:
  - Jan Bouwhuis
areas:
  - core
---

MQTT 实体的命名方式以及在已发现的实体之间共享设备配置的方式已发生变更

### 共享设备配置

已发现的 MQTT 实体可以共享设备配置，这意味着一个实体可以包含完整的设备配置，而其他实体只需设置必填字段即可关联到该设备。
必填字段以前仅限于 `connection` 和 `identifiers` 中的至少一个，但现在已扩展为 `connection` 和 `identifiers` 中的至少一个，以及 `name`。

### MQTT 实体的命名

MQTT 实体的命名已变更为与[实体命名准则](/core/entities/naming/)保持一致：

- 所有 MQTT 实体的 `has_entity_name` 实体将被设置为 `True`
- 未命名的 `binary_sensor`、`button`、`number` 和 `sensor` 实体现在将根据其设备类别（device class）命名，而不再被命名为 `MQTT binary sensor"` 等
- 现在允许将 MQTT 实体的名称设置为 `None`，以将其标记为设备的主要功能
