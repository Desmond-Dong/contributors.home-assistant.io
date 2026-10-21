---
title: "唯一 ID（Unique ID）"
description: "集成分配给实体（entity）或配置条目（config entry）的一个 ID，它永远不会改变，因此 Home Assistant 在重启后仍能识别它。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "unique IDs"
  code:
    - "unique_id"
    - "_attr_unique_id"
  related:
    - "entity"
    - "registry"
    - "config-entry"
    - "entity-id"
  autolink:
    - "unique ID"
    - "unique IDs"
---

拥有唯一 ID 的实体会在实体注册表（entity registry）中获得一个条目。只有这样，用户才能在用户界面中更改其名称、区域（area）、图标和实体 ID。

唯一 ID 来自不会改变的东西，例如序列号或 MAC 地址。而不是名称、IP 地址或主机名：这些是可能改变的。
