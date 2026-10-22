---
title: Labs 中的 async_listen 已弃用
description: labs 集成中的 async_listen 辅助元素已被弃用，取而代之的是 async_subscribe_preview_feature。
date: 2026-02-16
authors:
  - Artur Pragacz
areas:
  - core
---

`labs` 集成中的 `async_listen` 辅助元素已被弃用，取而代之的是 `async_subscribe_preview_feature`。

新的 `async_subscribe_preview_feature` 函数提供了更一致的 API，监听器回调会接收一个包含更新后功能状态的 `EventLabsUpdatedData` 参数。这样就无需再在监听器内单独调用 `async_is_preview_feature_enabled` 来检查当前值。

### 旧用法

```python
from homeassistant.components.labs import async_is_preview_feature_enabled, async_listen

def my_listener() -> None:
    if async_is_preview_feature_enabled(hass, DOMAIN, "my_feature"):
        # feature enabled
        ...

async_listen(
    hass,
    domain=DOMAIN,
    preview_feature="my_feature",
    listener=my_listener,
)
```

### 新用法

```python
from homeassistant.components.labs import EventLabsUpdatedData, async_subscribe_preview_feature

async def my_listener(event_data: EventLabsUpdatedData) -> None:
    if event_data["enabled"]:
        # feature enabled
        ...

async_subscribe_preview_feature(
    hass,
    domain=DOMAIN,
    preview_feature="my_feature",
    listener=my_listener,
)
```

请注意，新的监听器是一个协程函数（coroutine function），并接收 `EventLabsUpdatedData` 作为参数。

`async_listen` 将在 Home Assistant 2027.3 中被移除。

更多详情，请参阅 [core PR #162648](https://github.com/home-assistant/core/pull/162648)。
