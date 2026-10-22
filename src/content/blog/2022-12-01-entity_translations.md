---
title: 翻译实体的状态
description: 集成为其在其他集成下的实体状态提供翻译的方法（例如翻译某个集成的传感器）已经发生改变。
date: 2022-12-01
authors:
  - Erik Montnémery
areas:
  - core
---

集成为其他集成下的实体（entity）状态提供翻译的方法（例如翻译某个集成的传感器）已经发生改变。

集成不应再使用自定义设备类（device class）配合 `strings.<platform name>.json` 文件。相反，实体应设置 `translation_key` 属性，并将该 `translation_key` 包含在集成的 `strings.json` 中。

> [!WARNING]
> 通过 `translation_key` 属性指向翻译目前仅支持带有 `unique_id` 的实体。

以下 `strings.json` 示例适用于一个 `translation_key` 属性设置为 `phase` 的 Moon 域 `sensor` 实体：

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

更多详情，请参阅 [`translation`](/core/integrations/translations/#entities) 和 [`entity`](/core/entities/entity-class/) 文档。
