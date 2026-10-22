---
title: 弃用数据输入流程常量
description: "自 Home Assistant Core 2022.7 起，所有用于数据输入流程结果类型的 `RESULT_TYPE_*` 常量均已被弃用："
date: 2022-06-07
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.7 起，所有用于数据输入流程结果类型的 `RESULT_TYPE_*` 常量均已被弃用：

  - `RESULT_TYPE_FORM`
  - `RESULT_TYPE_CREATE_ENTRY`
  - `RESULT_TYPE_ABORT`
  - `RESULT_TYPE_EXTERNAL_STEP`
  - `RESULT_TYPE_EXTERNAL_STEP_DONE`
  - `RESULT_TYPE_SHOW_PROGRESS`
  - `RESULT_TYPE_SHOW_PROGRESS_DONE`
  - `RESULT_TYPE_MENU`

  请改用新的 `FlowResultType` 枚举。
