---
title: "配置条目（config entry）"
description: "一个集成（integration）的一次设置实例，例如一个 Hue 网桥，以及 Home Assistant 为其存储的配置。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "config entries"
    - "entry"
  code:
    - "ConfigEntry"
    - "async_setup_entry"
    - "entry.runtime_data"
  ui: "Integration entry"
  related:
    - "config-flow"
    - "config-subentry"
    - "options-flow"
    - "integration"
    - "unique-id"
  autolink:
    - "config entry"
    - "config entries"
---

当用户在 UI 中添加一个集成时，[配置流程（config flow）](/glossary/config-flow/)会创建一个配置条目。添加第二个网桥会创建同一集成的第二个配置条目。

一个配置条目可以单独被禁用、重新加载和移除。负责设置它的代码是 `async_setup_entry`，而集成在运行时所需的任何内容（例如 API 客户端）都存放在 `entry.runtime_data` 中。
