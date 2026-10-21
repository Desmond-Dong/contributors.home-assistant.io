---
title: "Ingress"
description: "一种让应用在 Home Assistant 内部、Home Assistant 登录之后展示其网页界面的方式，无需开放端口。"
sidebarGroup: "Installation and system"
term:
  code:
    - "ingress"
    - "ingress_port"
    - "ingress_panel"
  related:
    - "app"
    - "supervisor"
    - "panel"
  autolink:
    - "ingress"
---

应用在其配置中通过 `ingress: true` 开启此功能，并在 ingress 端口上提供其网页界面，默认为 8099，除非它设置了其他端口。Supervisor 会将请求转发给应用，且仅限已登录 Home Assistant 的用户。通过 `ingress_panel`，应用还可以在侧边栏中获得自己的[面板（panel）](/glossary/panel/)。参见[使用 ingress 添加网页界面](/apps/guides/ingress/)。
