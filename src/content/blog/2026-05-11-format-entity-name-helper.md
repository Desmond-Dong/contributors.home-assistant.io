---
title: 在自定义卡片中格式化实体名称
description: 自 Home Assistant 2026.4 起，hass 对象提供了一个 formatEntityName 辅助函数。它与内置卡片（磁贴卡片、实体行等）使用的函数相同，用于根据实体的注册表上下文（实体、设备、区域、楼层）计算实体的显示名称。
date: 2026-05-11
authors:
  - Paul Bottein
areas:
  - frontend
---

自 Home Assistant 2026.4 起，`hass` 对象提供了一个 `formatEntityName` 辅助函数。它与内置卡片（磁贴卡片、实体行等）使用的函数相同，用于根据实体的注册表上下文（实体、设备、区域、楼层）计算实体（entity）的显示名称。自定义卡片可以使用它来生成与仪表盘（dashboard）其余部分保持一致的名称。

假设有一个名为 `Thermostat` 的设备（device），其上有一个名为 `Temperature` 的温度传感器：

```js
const stateObj = hass.states["sensor.living_room_thermostat_temperature"];

hass.formatEntityName(
  stateObj,
  [{ type: "device" }, { type: "entity" }],
  { separator: " · " }
); // "Thermostat · Temperature"
```

前端还提供了一个 `entity_name` 选择器。如果你的卡片使用了[内置表单编辑器](/frontend/custom-ui/card/)，你可以向用户提供与内置卡片相同的名称选择器——它接受自由格式的字符串或注册表项的组合。

请查看更新后的[数据文档](/frontend/reference/hass-object/)以获取完整参考和更多示例。
