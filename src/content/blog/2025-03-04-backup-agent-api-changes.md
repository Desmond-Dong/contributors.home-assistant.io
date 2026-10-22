---
title: BackupAgent API 的变更
description: "BackupAgent API 已进行调整，当找不到备份时，以下方法现在应抛出 BackupNotFound："
date: 2025-03-04
authors:
  - Erik Montnémery
areas:
  - core
---

`BackupAgent` API 已进行调整，当找不到备份时，以下方法现在应抛出 `BackupNotFound`：
- `BackupAgent.async_delete_backup`
- `BackupAgent.async_download_backup`
- `BackupAgent.async_get_backup`

如需了解更多背景信息，请查看[备份代理（backup agent）文档](/core/integrations/backup/#add-a-backup-agent)以及 [home assistant core PR #139754](https://github.com/home-assistant/core/pull/139754)。
