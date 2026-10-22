---
title: result 属性已从 FlowResult typed dict 中移除
description: result 属性已从 homeassistant.data_entry_flow.FlowResult typed dict 中移除，现在仅在需要时才存在，即 homeassistant.auth.models.AuthFlowResult 和 homeassistant.config_entries.ConfigFlowResult。
date: 2025-07-31
authors:
  - Erik Montnémery
areas:
  - core
---

result 属性已从 `homeassistant.data_entry_flow.FlowResult` typed dict 中移除，现在仅在需要时才存在，即 `homeassistant.auth.models.AuthFlowResult` 和 `homeassistant.config_entries.ConfigFlowResult`。

此更改预计不会影响自定义集成的运行时行为，但自定义集成开发者可能需要更新测试，以及更新任何派生自 `homeassistant.data_entry_flow.FlowResult` 且使用了 `result` 属性的类，以消除类型检查器的警告。
