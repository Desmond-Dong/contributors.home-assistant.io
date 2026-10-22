---
title: 配置条目现在支持次版本
description: 配置条目现在支持次版本。
date: 2023-12-18
authors:
  - Erik Montnémery
areas:
  - core
---

配置条目（config entry）现在支持次版本（minor version）。

如果次版本不同但主版本相同，即使集成未实现 `async_migrate_entry`，集成设置也将被允许继续进行。这意味着提升次版本是向后兼容的，而提升主版本则不然——如果用户在未从备份恢复配置的情况下降级 HA Core，集成将无法完成设置。

### 背景

我们对配置条目数据的版本控制一直非常保守，因为这会导致无法降级到旧版本的 Home Assistant Core。这意味着在大多数情况下，我们不进行版本控制，而是让集成采用一种软升级的方式，例如，对初始版本中不存在的配置条目数据使用 `dict.get`，在设置过程中转换数据等。

通过引入类似于存储辅助元素（storage helper）已提供的次版本机制，这种模式不再被推荐。
相反，只要新增的或其他变更的数据不会破坏旧版本，就应该提升次版本。

更多详细信息请参阅[配置条目迁移文档](/core/integrations/config-entries/#migrate-a-config-entry)以及 [core PR #105749](https://github.com/home-assistant/core/pull/105479)。
