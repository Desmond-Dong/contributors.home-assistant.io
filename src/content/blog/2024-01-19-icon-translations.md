---
title: 图标翻译
description: "在 Home Assistant 2024.2 中，我们将为集成引入一种提供图标的新方式："
date: 2024-01-19
authors:
  - Franck Nijhof
areas:
  - core
---

在 Home Assistant 2024.2 中，我们将为集成（integration）引入一种提供图标的新方式：图标翻译（Icon translations）。

图标翻译的工作方式与我们针对实体（entity）的常规翻译类似，后者可以将实体的状态（state）或实体属性状态翻译成任何语言。图标翻译的工作方式类似，但它不是将状态翻译成最终用户的语言，而是将状态翻译成图标。

现在，每个集成都可以提供一个 `icons.json` 文件，其中包含状态到图标的映射。以下是一个 Moon `sensor` 实体的示例，它为每种状态提供了不同的图标：

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "default": "mdi:moon",
        "state": {
          "new_moon": "mdi:moon-new",
          "first_quarter": "mdi:moon-first-quarter",
          "full_moon": "mdi:moon-full",
          "last_quarter": "mdi:moon-last-quarter"
        }
      }
    }
  }
}
```

图标翻译还支持翻译实体属性状态。

[阅读我们的文档，了解更多关于图标翻译的信息](/core/entities/icons/)。

## 服务图标

此更改向后兼容。实体现有的 `icon` 属性将继续像以前一样工作。不过，我们建议使用图标翻译，而不是 `icon` 属性。

此外，集成提供的服务（service）现在也支持图标，并且可以在同一个图标翻译文件中提供。在自动化（automation）和脚本编辑器等地方显示服务时，这些图标会用于 Home Assistant UI。以下示例展示了如何为 `light.turn_on` 和 `light.turn_off` 服务提供图标：

```json
{
  "services": {
    "turn_on": "mdi:lightbulb-on",
    "turn_off": "mdi:lightbulb-off"
  }
}
```

[阅读我们的文档，了解更多关于服务图标的信息](/core/integrations/actions/#icons)。
