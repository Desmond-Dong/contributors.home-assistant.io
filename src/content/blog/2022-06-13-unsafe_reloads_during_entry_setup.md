---
title: 避免在配置项设置期间重新加载
description: 在 2022.7 之前，当配置项仍在设置过程中时，是可以触发其重新加载的。
date: 2022-06-13
authors:
  - J. Nick Koston
areas:
  - core
---

在 2022.7 之前，当配置项（config entry）仍在设置过程中时，是可以触发其重新加载的。在配置项设置期间进行重新加载常常会导致意外的故障模式，需要重启 Home Assistant 才能使配置项恢复到良好状态。现在，在设置期间尝试重新加载会引发 `OperationNotAllowed` 异常。
