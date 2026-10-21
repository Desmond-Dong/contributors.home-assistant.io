---
title: "状态"
description: "实体（entity）的当前值，例如 `on`、`21.5` 或 `playing`，连同其属性一起。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "states"
    - "state object"
  code:
    - "State"
    - "hass.states"
    - "native_value"
  related:
    - "entity"
    - "attribute"
    - "state-machine"
    - "unavailable"
---

状态存储在[状态机（state machine）](/glossary/state-machine/)中。状态始终以字符串形式存储，即使它是一个数字。当状态发生变化时，Home Assistant 会触发 `state_changed` [事件（event）](/glossary/event/)，并且记录器（recorder）会将其写入历史记录。

有两种状态比较特殊：[不可用（unavailable）和未知（unknown）](/glossary/unavailable/)。
