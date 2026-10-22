---
title: 将 `async_track_state_change` 替换为 `async_track_state_change_event`
description: async_track_state_change 已被弃用，并将在 Home Assistant 2025.5 中移除。应改用 async_track_state_change_event。
date: 2024-04-13
authors:
  - J. Nick Koston
areas:
  - core
---

`async_track_state_change` 已被弃用，并将在 Home Assistant 2025.5 中移除。应改用 `async_track_state_change_event`。

`async_track_state_change` 总是为 `EVENT_STATE_CHANGED` 创建一个顶层监听器，该监听器必须拒绝所有与目标实体（entity）不匹配的状态（state）变更。当有许多集成（integration）使用 `async_track_state_change` 时，这种设计带来了性能问题。自 `async_track_state_change_event` 推出以来，`async_track_state_change` 已在 `core` 中逐步淘汰，最后一个实例已在 2024.5 中移除。

使用 `async_track_state_change` 的示例：

```python
from homeassistant.core import State, callback
from homeassistant.helpers.event import async_track_state_change

@callback
def _async_on_change(entity_id: str, old_state: State | None, new_state: State | None) -> None:
    ...

unsub = async_track_state_change(hass, "sensor.one", _async_on_change)
unsub()
```

使用 `async_track_state_change_event` 的替换示例：

```python
from homeassistant.core import Event, EventStateChangedData, callback
from homeassistant.helpers.event import async_track_state_change_event

@callback
def _async_on_change(event: Event[EventStateChangedData]) -> None:
    entity_id = event.data["entity_id"]
    old_state = event.data["old_state"]
    new_state = event.data["new_state"]
    ...

unsub = async_track_state_change_event(hass, "sensor.one", _async_on_change)
unsub()
```
