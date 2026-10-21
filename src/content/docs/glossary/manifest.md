---
title: "清单文件（Manifest）"
description: "集成的 `manifest.json` 文件：其域名、名称、集成负责人、依赖要求，以及如何被发现。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "manifest.json"
  related:
    - "integration"
    - "requirement"
    - "integration-owner"
    - "discovery"
    - "iot-class"
  autolink:
    - "manifest.json"
---

Home Assistant 在加载集成的任何代码之前会先读取清单文件（manifest）。它指明了需要先设置哪些其他集成、需要安装哪些 Python 包、该集成是否具有配置流程（config flow），以及它可以在哪些网络或总线上被发现。

清单文件也是设置集成的 [IoT 类别](/glossary/iot-class/)和[质量等级](/glossary/quality-scale/)的地方。
