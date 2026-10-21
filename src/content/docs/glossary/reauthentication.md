---
title: "重新认证（Reauthentication）"
description: "当配置项（config entry）无法再登录时，要求用户提供新凭据的流程，无需重新设置。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "reauth"
  code:
    - "async_step_reauth"
    - "ConfigEntryAuthFailed"
  related:
    - "config-flow"
    - "config-entry"
  autolink:
    - "reauthentication"
    - "reauth"
---

当密码更改或令牌过期时，集成（integration）会抛出 `ConfigEntryAuthFailed`。随后 Home Assistant 会要求用户重新登录，并保持配置项（config entry）的其他所有内容不变。
