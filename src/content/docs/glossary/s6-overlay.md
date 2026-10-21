---
title: "S6 overlay"
description: "Home Assistant 基础镜像中的 init 系统。它启动、监视并停止容器内应用的各个程序。"
sidebarGroup: "Installation and system"
term:
  aliases:
    - "s6-overlay"
    - "S6"
  code:
    - "/init"
    - "/etc/s6-overlay/s6-rc.d/"
  related:
    - "app"
    - "bashio"
  autolink:
    - "S6 overlay"
---

Docker 在每个容器中只运行一个命令。[S6 overlay](https://github.com/just-containers/s6-overlay) 让应用（app）可以按正确的顺序运行多个命令：先执行设置步骤，然后运行各个程序，并在程序崩溃时自动重启。基础镜像将其 `/init` 设为入口点，因此应用只需添加自己的服务定义即可。参见[使用 S6 overlay 运行服务](/apps/guides/s6-overlay/)。
