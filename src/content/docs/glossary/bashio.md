---
title: "Bashio"
description: "一个面向应用的 Bash 函数库，提供读取应用选项、日志记录以及与 Supervisor API 通信的辅助功能。"
sidebarGroup: "Installation and system"
term:
  code:
    - "bashio::"
    - "hassio-addons/bashio"
  related:
    - "app"
    - "supervisor-api"
    - "s6-overlay"
  autolink:
    - "Bashio"
---

Bashio 打包了大多数应用所需的功能，避免每个应用都重复编写，例如用 `bashio::config` 读取选项。它是官方 Home Assistant 基础镜像和 Home Assistant Community Apps 基础镜像的一部分，代码位于 [hassio-addons/bashio](https://github.com/hassio-addons/bashio) 仓库中。参见 [Bashio 参考](/apps/bashio/)。
