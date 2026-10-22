---
title: 已弃用的常量会生成日志条目
description: 近年来，许多常量已被枚举（Enum）或其他值取代，具体做法是添加指向后继者的代码注释。
date: 2023-12-19
authors:
  - Robert Resch
areas:
  - core
---

近年来，许多常量已被枚举（Enum）或其他值取代，具体做法是添加指向后继者的代码注释。
现在，使用已弃用的常量会生成一条警告日志条目，其中包含所使用的集成（integration）、替代值，以及该常量将从 core 中移除的版本。
将有一年的弃用期，以确保所有自定义集成作者都有时间进行调整。

大多数常量应该已经被替换，因为我们过去曾发布过几篇关于其弃用的博客文章。以下列出了其中一些：
- [弃用所有 SUPPORT_* 常量](/blog/2022/04/02/support-constants-deprecation/)
- [2022.5 的常量弃用](/blog/2022/05/03/constants-deprecations/)
- [2022.9 的 AutomationActionType 弃用](/blog/2022/08/15/automation-action-type-deprecation/)
- [2022.9 的设备跟踪器（device tracker）弃用](/blog/2022/07/29/device-tracker_source-type-deprecation/)
- [弃用媒体播放器常量](/blog/2022/09/06/media-player-repeat-mode-deprecation/)
- [新增降水强度单位](/blog/2022/10/25/new-precipitation-intensity-units/)
- [引入新的单位枚举器](/blog/2022/10/26/new-unit-enumerators/)
- [添加更多单位枚举器](/blog/2022/11/28/more-unit-enumerators/)
- [添加更多单位枚举器](/blog/2022/12/05/more-unit-enumerators/)

更多详情请参阅 [core PR #105736](https://github.com/home-assistant/core/pull/105736)，或者查看弃用辅助模块（deprecation helper）中函数 [`check_if_deprecated_constant`](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/deprecation.py#L240) 的用法。
