---
title: "事件（Event）"
description: "事件总线（event bus）上的一条消息，表示发生了某件事情，例如状态变化或按钮按下。任何代码都可以监听事件。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "events"
    - "event bus"
  code:
    - "hass.bus"
    - "EVENT_STATE_CHANGED"
    - "EventEntity"
  related:
    - "state-machine"
    - "trigger"
    - "hass"
  autolink:
    - "event bus"
---

Home Assistant 会为许多事情触发事件：状态变化、执行某个动作、Home Assistant 启动等。自动化（automation）可以在这些事件上触发。

不要与事件实体（event entity）混淆：事件实体是 `event` 类型的实体，用于显示设备上最近发生的事情，例如按钮按下。
