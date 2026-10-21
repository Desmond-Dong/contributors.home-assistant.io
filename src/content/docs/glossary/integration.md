---
title: "集成（Integration）"
description: "一段代码包，用于将 Home Assistant 连接到设备、服务或协议，或添加自动化等功能。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "integrations"
  code:
    - "homeassistant/components/<domain>/"
  formerly:
    - "component"
  related:
    - "domain"
    - "manifest"
    - "config-entry"
    - "platform"
    - "custom-integration"
  autolink:
    - "integration"
    - "integrations"
---

Home Assistant Core 几乎全部由集成（integration）组成。有些集成连接 Home Assistant 之外的东西，例如 Philips Hue 或 Z-Wave。另一些则是其他集成使用的构建模块，例如 `light`、`sensor` 或 `automation`。

每个集成都位于以它的[域（domain）](/glossary/domain/)命名的独立文件夹中，并在[清单（manifest）](/glossary/manifest/)中描述自身。用户大多在 UI 中通过[配置流程（config flow）](/glossary/config-flow/)添加集成。

代码中有些地方仍在使用旧名称：集成存放在 `homeassistant/components/` 中，一些函数名中包含 component。在文字中，请始终使用 integration（集成）一词。
