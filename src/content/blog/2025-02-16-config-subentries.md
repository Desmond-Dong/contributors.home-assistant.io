---
title: 支持配置子条目
description: 配置条目（config entry）现在有了一种名为“配置子条目（config subentry）”的新数据类型。配置子条目由配置条目所拥有，并作为 async_setup_entry 的一部分进行设置。
date: 2025-02-16
authors:
  - Erik Montnémery
areas:
  - core
---

配置条目（config entry）现在有了一种名为“配置子条目（config subentry）”的新数据类型。[配置子条目](/core/integrations/subentries/)由配置条目所拥有，并作为 `async_setup_entry` 的一部分进行设置。配置子条目通过[配置子条目流程](/core/integrations/subentries/)创建，并通过配置子条目重新配置流程进行更新。其工作方式与我们创建/编辑配置条目的方式类似。

这使得集成（integration）作者能够更轻松地允许用户添加、修改和删除共享某些公共资源的配置片段，例如云账户或 MQTT 代理（broker）。

[架构讨论](https://github.com/home-assistant/architecture/discussions/1070)提供了更多背景信息。
