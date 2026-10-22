---
title: 自定义卡片的动作事件
description: 在 Home Assistant Core 2023.7 版本中，我们为自定义卡片引入了 hass-action。
date: 2023-07-07
authors:
  - Paul Bottein
areas:
  - frontend
---

在 Home Assistant Core 2023.7 版本中，我们为自定义卡片引入了 `hass-action`。

如果您是自定义卡片的开发者，现在可以通过使用新的 `hass-action`，在您的自定义卡片中使用任何[卡片动作（card action）](https://www.home-assistant.io/dashboards/actions/)。

示例：

```js
// Define the action config
const actionConfig = {
  entity: "sensor.temperature",
  tap_action: {
    action: "more-info",
  },
  hold_action: {
    action: "assist",
    start_listening: true,
  },
};

// Open more info on tap action
const event = new Event("hass-action", {
  bubbles: true,
  composed: true,
});
event.detail = {
  config: actionConfig,
  action: "tap",
};
this.dispatchEvent(event);

// Open assist dialog on hold action
const event = new Event("hass-action", {
  bubbles: true,
  composed: true,
});
event.detail = {
  config: actionConfig,
  action: "hold",
};
this.dispatchEvent(event);
```
