---
title: "不可用（Unavailable）"
description: "实体（entity）的一种特殊状态，表示 Home Assistant 目前无法访问它。与之相对的 unknown 状态表示可以访问但尚无值。"
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "unknown"
  code:
    - "STATE_UNAVAILABLE"
    - "STATE_UNKNOWN"
    - "available"
  related:
    - "state"
    - "coordinator"
---

当设备离线或 API 调用失败时，集成（integration）会通过将 `available` 设置为 `False` 来将其实体标记为不可用。它绝不会报告一个编造的值来代替。
