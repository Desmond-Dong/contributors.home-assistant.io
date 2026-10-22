---
title: 报警控制面板实体代码验证
description: AlarmControlPanelEntity 现在会对将 code_arm_required 设置为 True（默认行为）的报警控制面板实体强制执行代码验证。当需要代码时，如果未提供代码，服务调用将失败。
date: 2024-05-22
authors:
  - G Johansson
areas:
  - core
---

`AlarmControlPanelEntity` 现在会对报警控制面板（alarm control panel）实体强制执行代码验证，这些实体将 `code_arm_required` 设置为 `True`（默认行为）。当需要代码时，如果未提供代码，服务调用（service call）将失败。

以前这完全是可选的，用户可以跳过代码输入，而不管集成（integration）是否需要代码（因此每个集成都需要自行实现检查）。

由于默认行为是需要代码，不需要代码输入的自定义集成需要将 `code_arm_required` 设置为 `False`，否则无论服务调用是否需要，用户都将始终需要输入代码。
