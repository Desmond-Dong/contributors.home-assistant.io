---
title: 针对配置流程唯一 ID 的新检查
description: 创建带有注册表中已存在唯一 ID 的配置条目已被弃用，并且现在会记录一条警告。
date: 2025-03-01
authors:
  - epenet
areas:
  - core
---

### 变更摘要

创建带有注册表中已存在唯一 ID（unique ID）的配置条目（config entry）已被弃用，并且现在会记录一条警告。

### 详细信息

当配置流程（config flow）创建的条目带有冲突的唯一 ID 时，目前旧条目会被自动移除并替换为新的配置条目。
这可能导致意外行为，因此应调整集成（integration），使其改为中止该流程。

对于手动流程，集成应实现选项（options）、重新认证（reauth）和重新配置（reconfigure），以允许用户更改设置。
对于用户不可见的流程，集成可以选择在中止前更新现有条目。

更多详细信息可在[配置流程](/core/integrations/config-flow/#unique-ids)文档中找到。
