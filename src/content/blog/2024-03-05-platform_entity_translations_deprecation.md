---
title: 将移除对单独文件中平台翻译的支持
description: 集成（integration）为其位于其他集成下的实体（entity）状态（state）提供翻译的方法（例如翻译某个集成的传感器）已于 2022 年 11 月变更，对旧方法的支持将在 Home Assistant Core 2024.5.0 中移除。
date: 2024-03-05
authors:
  - Erik Montnémery
areas:
  - core
---

集成（integration）为其位于其他集成下的实体（entity）状态（state）提供翻译的方法（例如翻译某个集成的传感器）已于 2022 年 11 月变更，对旧方法的支持将在 Home Assistant Core 2024.5.0 中移除。

Home Assistant Core 2024.5.0 发布后，集成将无法再使用自定义设备类（device class）并同时提供 `strings.<platform name>.json` 文件。取而代之的是，实体必须在其上设置 `translation_key` 属性，并将该 `translation_key` 包含在集成的 `strings.json` 中。

以下 `strings.json` 示例适用于一个 Moon 域的 `sensor` 实体，其 `translation_key` 属性被设置为 `phase`：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "state": {
          "new_moon": "New moon",
          "first_quarter": "First quarter",
          "full_moon": "Full moon",
          "last_quarter": "Last quarter"
        }
      }
    }
  }
}
```

更多详细信息，请参阅 [`translation`](/core/integrations/translations/#entities) 和 [`entity`](/core/entities/entity-class/) 文档。
