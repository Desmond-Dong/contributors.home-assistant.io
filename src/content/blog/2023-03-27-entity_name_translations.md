---
title: 翻译实体的名称和属性
description: 现在可以翻译实体的名称了，这比在 Python 实现中硬编码自然语言名称更受推荐。
date: 2023-03-27
authors:
  - Erik Montnémery
areas:
  - core
---

现在可以翻译实体（entity）的名称了，这比在 Python 实现中硬编码自然语言名称更受推荐。此外，实体组件（entity component）提供了共享翻译，例如针对二进制传感器设备类（binary sensor device class）的翻译，应当使用这些共享翻译，以避免多次翻译相同的内容。

此外，前端现在已完全支持翻译实体状态属性（state attribute）的名称及其值。


> [!WARNING]
> 目前，仅支持具有 `unique_id` 的实体通过 `translation_key` 属性指向翻译。
>
> 此外，翻译实体名称需要将 `has_entity_name` 属性设置为 `True`。

## 翻译实体名称
以下 `strings.json` 示例适用于一个 `translation_key` 属性设置为 `thermostat_mode` 的 `sensor` 实体：

```json
{
  "entity": {
    "sensor": {
      "thermostat_mode": {
        "name": "Thermostat mode"
      }
    }
  }
}
```

以下 `strings.json` 示例适用于一个 `translation_key` 属性设置为 `temperature_sensor` 的 `sensor` 实体，其中使用了由 `sensor` 集成提供的共享翻译：

```json
{
  "entity": {
    "sensor": {
      "temperature_sensor": {
        "name": "[%key:component::sensor::entity_component::temperature::name%]"
      }
    }
  }
}
```

## 翻译实体属性
以下 `strings.json` 示例适用于 `demo` 域中的一个 `climate` 实体，其 `translation_key` 属性设置为 `ubercool`，该实体具有自定义的 `fan_mode` 和 `swing_mode` 设置：


```json
{
  "entity": {
    "climate": {
      "ubercool": {
        "state_attributes": {
          "fan_mode": {
            "state": {
              "auto_high": "Auto High",
              "auto_low": "Auto Low",
              "on_high": "On High",
              "on_low": "On Low"
            }
          },
          "swing_mode": {
            "state": {
              "1": "1",
              "2": "2",
              "3": "3",
              "auto": "Auto",
              "off": "Off"
            }
          }
        }
      }
    }
  }
}
```

更多详细信息，请参阅 [`entity name translation`](/core/integrations/translations/#entities)、[`entity attribute translation`](/core/integrations/translations/) 和 [`entity`](/core/entities/entity-class/) 文档。
