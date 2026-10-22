---
title: 备份代理
description: 在 2025 年 1 月的版本中，我们为备份引入了一项名为备份代理（backup agents）的新功能。
date: 2025-02-17
authors:
  - Martin Hjelmare
areas:
  - core
---

在 2025 年 1 月的版本中，我们为备份引入了一项名为备份代理（backup agents）的新功能。

以前，备份平台（backup platform）仅用于在创建备份之前暂停或准备集成操作，以及执行备份后的操作。随着备份代理的引入，备份平台现在允许集成添加一个或多个备份代理，这些代理可以将备份上传到某个本地或远程位置。

第一个实现备份代理的集成是 Home Assistant Cloud 集成。在 2025 年 2 月的版本中，又有三个集成实现了备份代理：Google Drive、OneDrive 和 Synology DSM。如果您是一名集成作者，并希望为喜爱的备份位置添加支持，可以在[开发者文档](/core/integrations/backup/)中找到有关如何实现备份代理的更多信息。
