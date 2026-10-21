---
title: "注册表"
description: "Home Assistant 存储其对实体、设备、区域、楼层和标签所知信息的地方，以及用户对这些内容所做的更改。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "registries"
    - "entity registry"
    - "device registry"
  code:
    - "er.async_get"
    - "dr.async_get"
    - "entity_registry"
    - "device_registry"
  related:
    - "unique-id"
    - "device"
    - "area"
    - "label"
  autolink:
    - "entity registry"
    - "device registry"
    - "area registry"
---

每种内容都有一个对应的注册表（registry）：实体注册表（entity registry）、设备注册表（device registry）、区域注册表（area registry）等等。它们存储在 `.storage` 中，并在重启后依然保留。

用户的更改保存在注册表中，而不是集成（integration）中。当用户重命名一个实体（entity）时，集成无需知晓。
