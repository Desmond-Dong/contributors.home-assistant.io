---
title: "WebSocket API"
description: "Home Assistant Core 的 API，前端和伴侣应用（companion apps）通过一个保持打开的连接使用它来读取状态、执行操作，并在事件发生时获取更新。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "websocket_api"
    - "/api/websocket"
    - "home-assistant-js-websocket"
  related:
    - "frontend"
    - "companion-app"
    - "core"
  autolink:
    - "WebSocket API"
---

客户端连接到 `/api/websocket`，使用访问令牌（access token）登录，然后以 JSON 消息的形式发送命令。集成（integration）可以通过 `websocket_api` 集成添加自己的命令。前端通过 home-assistant-js-websocket 库与它通信。

有关消息以及如何添加命令，请参阅 [WebSocket API](/core/internals/websocket-api/)。
