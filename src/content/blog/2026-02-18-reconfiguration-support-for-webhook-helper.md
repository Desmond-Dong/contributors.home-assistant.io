---
title: webhook 辅助元素支持重新配置
description: 使用 webhook 配置流程辅助元素（homeassistant.helpers.config_entry_flow.register_webhook_flow）的集成现在支持重新配置。
date: 2026-02-18
authors:
  - tr4nt0r
areas:
  - core
---

使用 webhook 配置流程辅助元素（`homeassistant.helpers.config_entry_flow.register_webhook_flow`）的集成现在支持重新配置（reconfiguration）。这使集成能够再次获取 webhook，或在 Home Assistant 实例的 URL 发生变化时获取更新后的 webhook。

使用 webhook 配置流程辅助元素的自定义集成必须为重新配置流程添加翻译字符串。

**重新配置流程的翻译字符串示例：**

```json
{
  "config": {
    "abort": {
      "reconfigure_successful": "**Reconfiguration was successful**\n\nIn Sleep as Android go to *Settings → Services → Automation → Webhooks* and update the webhook with the following URL:\n\n`{webhook_url}`"
    },
    "step": {
      "reconfigure": {
        "description": "Are you sure you want to re-configure the Sleep as Android integration?",
        "title": "Reconfigure Sleep as Android"
      }
    }
  }
}
```

更多详细信息，请参阅 [core PR #151729](https://github.com/home-assistant/core/pull/151729)。
