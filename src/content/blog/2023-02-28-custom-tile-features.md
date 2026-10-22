---
title: 自定义磁贴功能
description: 在 Home Assistant Core 2022.3 版本中，我们为磁贴卡片添加了自定义功能。
date: 2023-02-28
authors:
  - Paul Bottein
areas:
  - core
---

在 Home Assistant Core 2022.3 版本中，我们为[磁贴卡片](https://www.home-assistant.io/dashboards/tile/)（tile card）添加了自定义功能。如果您是自定义卡片的开发者，现在可以为磁贴卡片构建自己的功能，而无需构建整个卡片。

![显示自定义磁贴功能示例的截图](/img/en/blog/2023-02-28-custom-tile-features/example.png)

```yaml
type: tile
entity: button.push
features:
  - type: custom:button-press-tile-feature
```

自定义磁贴功能甚至可以像其他内置磁贴功能一样添加到磁贴卡片编辑器中，其使用的语法与自定义卡片类似。

```js
window.customTileFeatures = window.customTileFeatures || [];
window.customTileFeatures.push({
  type: "button-press-tile-feature",
  name: "Button press",
});
```

更多详情，请参阅[自定义磁贴功能](/frontend/custom-ui/card-feature/)文档。
