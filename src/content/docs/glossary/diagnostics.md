---
title: "诊断"
description: "包含配置条目或设备的数据和状态的下载文件，用户将其附加到 issue 中以帮助调试。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "diagnostics.py"
    - "async_redact_data"
  ui: "Download diagnostics"
  related:
    - "platform"
    - "config-entry"
    - "repair"
---

集成通过 `diagnostics.py` 平台提供诊断信息。密码、令牌、位置和其他隐私数据必须使用 `async_redact_data` 从中移除。
