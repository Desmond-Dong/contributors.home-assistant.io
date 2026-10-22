---
title: FlowManager.async_show_progress 的变更
description: "FlowHandler.async_show_progress 已更新："
date: 2024-01-11
authors:
  - Erik Montnémery
areas:
  - core
---

`FlowHandler.async_show_progress` 已更新：
- 新增了一个参数 `progress_task`，该参数在 Home Assistant Core 2024.8 版本中将成为必填项

如果传入了 `progress_task`，`FlowManager` 将会：
- 在任务完成后向前端（frontend）发送事件
- 如果用户在任务完成前关闭了配置流程（config flow）对话框，则取消 `progress_task`

这意味着派生类不再负责进度任务状态与 UI 之间的交互。

如果在未传入 `progress_task` 的情况下调用 `FlowHandler.async_show_progress`，将会记录一条警告。在 Home Assistant Core 2024.8 版本中，该调用将改为直接失败。

更多详情请参阅[文档](/core/integrations/flow-steps/)以及 [core PR #107668](https://github.com/home-assistant/core/pull/107668) 和 [#107802](https://github.com/home-assistant/core/pull/107802)。
