---
title: "重新配置流程"
description: "一种在不删除并重新添加配置条目的情况下更改其设置（例如主机地址）的流程。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "reconfigure"
  code:
    - "async_step_reconfigure"
  ui: "Reconfigure"
  related:
    - "config-flow"
    - "options-flow"
    - "config-entry"
  autolink:
    - "reconfigure flow"
    - "reconfigure flows"
---

删除并重新添加配置条目（config entry）会丢失用户为其实体（entity）和设备（device）设置的名称、区域（area）及其他设置。重新配置流程（reconfigure flow）则可以保留这些设置。
