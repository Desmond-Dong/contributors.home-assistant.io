---
title: Data Update Coordinator 现已支持 Retry After
description: 使用 Data Update Coordinator 的集成可以通过新参数 retry_after 来增强 UpdateFailed 异常，将下一次计划的刷新推迟指定的秒数，并在 API 恢复后恢复正常节奏。
date: 2025-11-17
authors:
  - Erwin Douna
areas:
  - core
---

使用 [Data Update Coordinator](/core/integrations/fetching-data/) 的集成（integration）可以通过新参数 `retry_after` 来增强 `UpdateFailed` 异常，从而将下一次计划的刷新推迟指定的秒数，并在 API 恢复后恢复正常节奏。

当被轮询的 API 返回过载迹象时，例如抛出 HTTP 429 或在响应头中提供 `Retry-After`，集成现在可以遵循这些退避（backoff）信号。
集成和 API 客户端必须检测这些退避信号，并对 API 期望的退避时间进行规范化处理。`UpdateFailed` 异常接受一个 `retry_after` 参数（以秒为单位的浮点数），用于延迟下一次计划的刷新。一旦 API 恢复且不再抛出 `UpdateFailed`，集成就会恢复其正常的 `update_interval`。

使用示例：
```python
try:
    request = await self.client.get_information()
except APIClientRateLimited as err:
    raise UpdateFailed(
        retry_after=60  # This can also be retrieved from the API response itself, or provide a default
    ) from err
```

#### ConfigEntryNotReady
在 Update Coordinator 设置阶段（`async_config_entry_first_refresh`）期间，`retry_after` 参数会被忽略。如果首次刷新失败，Home Assistant 会抛出 `ConfigEntryNotReady` 异常，允许配置项（config entry）的设置使用内置的重试机制自动重试。一旦协调器（coordinator）设置成功，`retry_after` 将应用于后续的刷新。
