---
title: 实体状态格式化
description: "在 Home Assistant Core 2023.9 版本中，我们为 hass 对象引入了 3 个新方法，让自定义卡片可以实现支持本地化的实体状态格式化："
date: 2023-08-29
authors:
  - Paul Bottein
areas:
  - core
---

在 Home Assistant Core 2023.9 版本中，我们为 `hass` 对象引入了 3 个新方法，以便为自定义卡片提供支持本地化的实体（entity）状态格式化：

- `hass.formatEntityState`
- `hass.formatEntityAttributeValue`
- `hass.formatEntityAttributeName`

示例：

```js
hass.formatEntityState(hass.states["cover.living_room_shutter"]); 
// It will return "Open" if the user language is English.
// It will return "Ouvert" if the user language is French.
```

更多详细信息，请参阅[实体状态格式化文档](/frontend/reference/hass-object/)。
