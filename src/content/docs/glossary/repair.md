---
title: "修复（Repair）"
description: "Home Assistant 在“修复”（Repairs）中向用户显示的问题，以及相应的处理方法，例如即将失效的配置。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "repairs"
    - "repair issue"
    - "issue registry"
  code:
    - "ir.async_create_issue"
    - "repairs.py"
  ui: "Repairs"
  related:
    - "deprecation"
    - "translation-key"
    - "diagnostics"
  autolink:
    - "repair issue"
    - "repair issues"
---

集成会在问题注册表（issue registry）中创建修复问题（repair issue），并附带翻译后的说明。有些修复问题还带有为用户自动解决问题的流程。

请勿与 GitHub 上的 issue 混淆。
