---
title: 问题注册表（issue registry）已移动到 homeassistant.helpers
description: 问题注册表（issue registry）已从 homeassistant.components.repairs 移动到 homeassistant.helpers，现在与其他注册表一起在引导（bootstrap）过程的极早期加载，早于任何集成（integration）被设置。
date: 2022-08-25
authors:
  - Erik Montnémery
areas:
  - core
---

问题注册表（issue registry）已从 `homeassistant.components.repairs` 移动到 `homeassistant.helpers`，现在与其他注册表一起在引导（bootstrap）过程的极早期加载，早于任何集成（integration）被设置。

这允许在验证配置期间创建问题（issues）。
