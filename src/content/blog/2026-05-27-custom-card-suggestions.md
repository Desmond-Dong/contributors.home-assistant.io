---
title: 卡片选择器中的自定义卡片建议
description: 自 Home Assistant 2026.6 起，自定义卡片可以作为建议显示在卡片选择器中。
date: 2026-05-27
authors:
  - Paul Bottein
areas:
  - frontend
---

自 Home Assistant 2026.6 起，自定义卡片可以作为建议显示在卡片选择器中。当用户选择一个实体（entity）时，选择加入的自定义卡片将列在内置建议下方的 **Community** 部分中。

若要选择加入，请在您的 `window.customCards` 条目中添加一个 `getEntitySuggestion` 函数。它接收 `hass` 对象和所选的实体 id，并返回一个建议（如果该实体不受支持则返回 `null`）：

```js
window.customCards.push({
  type: "my-card",
  name: "My Card",
  getEntitySuggestion: (hass, entityId) => {
    if (entityId.split(".")[0] !== "light") {
      return null;
    }
    return {
      config: { type: "custom:my-card", entity: entityId },
    };
  },
});
```

您还可以返回一个建议数组以提供多个变体，每个变体都有其自己的 `label`。

仅在对该实体有意义时才建议您的卡片。请使用 `hass` 对象检查域（domain）、设备类别（device class）或支持的功能，否则返回 `null`。为每个实体都建议您的卡片会使选择器变得杂乱。

请参阅[自定义卡片文档](/frontend/custom-ui/card/)以获取完整参考。
