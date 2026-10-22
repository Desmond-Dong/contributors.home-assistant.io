---
title: 2022.9 中 AutomationActionType 的弃用
description: 在 Home Assistant Core 2022.9 中，我们弃用了 homeassistant/components/automation/init.py 中的 AutomationActionType、AutomationTriggerInfo 和 AutomationTriggerData。
date: 2022-08-15
authors:
  - Marc Mueller
areas:
  - core
---

在 Home Assistant Core 2022.9 中，我们弃用了 `homeassistant/components/automation/__init__.py` 中的 `AutomationActionType`、`AutomationTriggerInfo`
和 `AutomationTriggerData`。
它们将被 `homeassistant/helpers/trigger.py` 中的 `TriggerActionType`、`TriggerInfo` 和 `TriggerData`
所取代。

| 旧 | 新 |
| --- | --- |
| `AutomationActionType` | `TriggerActionType` |
| `AutomationTriggerInfo` | `TriggerInfo` |
| `AutomationTriggerData` | `TriggerData` |

此外，我们建议将 `async_attach_trigger` 函数的 `automation_info` 参数名更新为 `trigger_info`。
