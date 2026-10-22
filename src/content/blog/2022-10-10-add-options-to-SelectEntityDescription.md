---
title: 为 SelectEntityDescription 添加 options
description: 自 Home Assistant Core 2022.11 起，options 已成为 SelectEntityDescription 的标准属性。
date: 2022-10-10
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.11 起，`options` 已成为 `SelectEntityDescription` 的标准属性。
如果之前已在自定义集成（custom integration）中实现了自定义的 `options` 属性，这可能会导致问题。

请通过删除或重命名自定义的 `options` 属性来调整您的自定义集成。
