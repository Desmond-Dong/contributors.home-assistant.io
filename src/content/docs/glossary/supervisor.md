---
title: "Supervisor"
description: "Home Assistant OS 中运行 Home Assistant Core 和应用（app）的部分，每个都在各自的容器中运行，并负责它们的更新和备份。"
sidebarGroup: "Installation and system"
term:
  code:
    - "home-assistant/supervisor"
    - "hassio"
  related:
    - "home-assistant-os"
    - "app"
    - "supervisor-api"
    - "supervisor-plugin"
    - "resolution-center"
  autolink:
    - "Supervisor"
---

Supervisor 拥有一个 API，即 [Supervisor API](/glossary/supervisor-api/)，Core、前端和应用（app）使用它来安装更新、创建备份以及管理应用。
