---
title: "平台（Platform）"
description: "集成如何提供一种类型的实体，例如 Hue 集成的 `light` 平台。也用于集成平台，即插入另一个集成的文件。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "platforms"
    - "entity platform"
    - "integration platform"
  code:
    - "Platform.LIGHT"
    - "light.py"
  related:
    - "integration"
    - "entity"
    - "domain"
  autolink:
    - "entity platform"
    - "integration platform"
---

**实体平台（entity platform）**是集成中提供一种类型实体的部分。Hue 集成有一个用于灯的 `light.py` 和一个用于传感器的 `sensor.py`：即它的 `light` 和 `sensor` 平台。

**集成平台（integration platform）**是让一个集成插入另一个集成的文件，例如用于[诊断（diagnostics）](/glossary/diagnostics/)的 `diagnostics.py` 或用于修复（repairs）的 `repairs.py`。
