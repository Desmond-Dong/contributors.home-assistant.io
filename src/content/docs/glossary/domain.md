---
title: "域（Domain）"
description: "集成的简短唯一标识符，例如 `hue` 或 `light`。它也是每个实体 ID 的第一部分。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "DOMAIN"
    - "\"domain\" in manifest.json"
  related:
    - "integration"
    - "entity-id"
    - "platform"
  autolink:
    - "domain"
    - "domains"
---

域（domain）是集成所在文件夹的名称，也是其清单文件中 `domain` 键的值。它为小写，单词之间使用下划线，并且一旦集成发布就永远不会更改。

实体（entity）也有域：即实体的类型，例如 `light.kitchen` 中的 `light`。这是定义该实体类型的集成的域，而不是提供该实体的集成的域。一个 Hue 灯泡是 `light.living_room`，而不是 `hue.living_room`。
