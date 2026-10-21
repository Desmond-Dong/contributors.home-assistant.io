---
title: "Supervisor API"
description: "Supervisor 的 REST API，Home Assistant Core、命令行和应用使用它来管理系统、应用、备份和更新。"
sidebarGroup: "Installation and system"
term:
  code:
    - "http://supervisor/"
    - "SUPERVISOR_TOKEN"
    - "hassio_api"
  related:
    - "supervisor"
    - "app"
    - "bashio"
  autolink:
    - "Supervisor API"
---

在应用（app）内部，该 API 位于 `http://supervisor/`，Supervisor 会在 `SUPERVISOR_TOKEN` 环境变量中为每个应用分配自己的令牌。应用可以调用哪些内容取决于它在配置中请求的权限，例如 `hassio_api: true`。

许多路径仍然使用应用的旧名称，例如 `/addons`。请参阅 [Supervisor API 参考](/apps/supervisor-api/)。
