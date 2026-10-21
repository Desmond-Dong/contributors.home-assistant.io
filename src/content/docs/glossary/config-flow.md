---
title: "配置流程（config flow）"
description: "在用户界面中设置集成并创建配置条目的步骤。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "config flows"
  code:
    - "ConfigFlow"
    - "config_flow.py"
    - "async_step_user"
  related:
    - "config-entry"
    - "options-flow"
    - "reauthentication"
    - "reconfigure-flow"
    - "discovery"
  autolink:
    - "config flow"
    - "config flows"
---

配置流程（config flow）会向用户询问所需的信息，例如主机地址和密码，然后进行检查并创建[配置条目](/glossary/config-entry/)。它会设置一个[唯一 ID](/glossary/unique-id/)，因此同一台设备不会被添加两次。

当设备被[发现](/glossary/discovery/)时，配置流程也可以自行启动。此时用户只需确认即可。

连接到设备或服务的新集成应通过配置流程进行设置，而不是通过 YAML。
