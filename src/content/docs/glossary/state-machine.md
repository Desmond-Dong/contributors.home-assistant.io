---
title: "状态机（state machine）"
description: "Home Assistant Core 中保存每个实体（entity）当前状态的部分。"
sidebarGroup: "Entities and devices"
term:
  code:
    - "hass.states"
    - "StateMachine"
  related:
    - "state"
    - "hass"
    - "event"
  autolink:
    - "state machine"
---

集成将状态写入其中，而其他一切都从其中读取：自动化、模板、仪表盘。写入通过实体进行，而不是直接写入状态机。
