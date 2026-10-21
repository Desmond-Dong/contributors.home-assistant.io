---
title: "动作（Action）"
description: "Home Assistant 可以执行的操作，例如打开灯或发送通知。自动化、脚本和仪表盘会执行动作。"
sidebarGroup: "Automations and organizing"
term:
  aliases:
    - "actions"
    - "perform an action"
  code:
    - "hass.services"
    - "services.yaml"
    - "ServiceCall"
    - "async_register"
  formerly:
    - "service"
    - "service call"
  related:
    - "automation"
    - "script"
    - "target"
    - "selector"
---

集成（integration）会注册动作，并在 `services.yaml` 中描述其字段。动作可以针对实体（entity）、设备（device）、区域（area）、楼层（floor）或标签（label）。

动作以前被称为服务（service），并在 Home Assistant 2024.8 中更名。代码中仍然使用旧名称：`hass.services`、`services.yaml` 和 `ServiceCall`。在文字中，请始终使用“动作”和“执行动作”，而不是“调用服务”。
