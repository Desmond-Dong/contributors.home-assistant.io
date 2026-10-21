---
title: "hass 对象"
description: "集成所获取的 `HomeAssistant` 实例，可访问状态机、事件总线、服务和配置。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "hass"
  code:
    - "HomeAssistant"
    - "hass"
  related:
    - "state-machine"
    - "event"
    - "action"
    - "event-loop"
  autolink:
    - "hass object"
---

在 Home Assistant Core 中，几乎每个函数都将 `hass` 作为其第一个参数。它是代码访问其他一切内容的途径：`hass.states`、`hass.bus`、`hass.services` 和 `hass.config`。

`hass` 是代码中的名称。在文字中，请写作 Home Assistant。
