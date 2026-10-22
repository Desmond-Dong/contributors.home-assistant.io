---
title: 备份代理现在可以报告上传进度
description: BackupAgent.async_upload_backup 方法现在接收一个新的 on_progress 回调参数。
date: 2026-03-11
authors:
  - Josef Zweck
areas:
  - core
---

`BackupAgent.async_upload_backup` 方法现在接收一个新的 `on_progress` 回调参数。备份代理（backup agent）可以在上传过程中定期调用此回调，以报告目前已上传的字节数：

```python
class ExampleBackupAgent(BackupAgent):

    async def async_upload_backup(
        self,
        *,
        open_stream: Callable[[], Coroutine[Any, Any, AsyncIterator[bytes]]],
        backup: AgentBackup,
        on_progress: OnProgressCallback,
        **kwargs: Any,
    ) -> None:
        """Upload a backup."""
        ...
        bytes_uploaded = 0
        async for chunk in await open_stream():
            await do_upload(chunk)
            bytes_uploaded += len(chunk)
            on_progress(bytes_uploaded=bytes_uploaded)
        ...
```

备份管理器（backup manager）会使用这些进度报告来触发 `UploadBackupEvent` 事件，使前端能够向用户显示实时的上传进度。

详情请查看[备份代理文档](/core/integrations/backup/#add-a-backup-agent)。
