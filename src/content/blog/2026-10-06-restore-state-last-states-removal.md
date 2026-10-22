---
title: "移除 RestoreStateData.last_states"
description: 自 Home Assistant Core 2026.11 起，恢复状态辅助元素（restore state helper）存储的状态将按实体的实体注册表 ID 进行索引，而非按实体 ID 索引。
date: 2026-10-06
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

自 Home Assistant Core 2026.11 起，由恢复状态辅助元素（restore state helper）存储的状态将按实体的实体注册表 ID 进行索引，而非按实体 ID 进行索引。现在，当用户更改实体 ID 时，已存储的状态会跟随其对应的实体，并且已存储的状态永远不会恢复到恰好重用该实体 ID 的其他实体。

因此，`RestoreStateData.last_states` 已被移除。直接从 `RestoreStateData` 读取已存储状态的集成（integration）必须改用新的 `RestoreStateData.async_get_stored_state` 方法。

通过扩展 `RestoreEntity` 或其子类（如 `RestoreSensor`）来恢复状态，并调用 `async_get_last_state` 或 `async_get_last_extra_data` 的集成不受影响。

### RestoreStateData.async_get_stored_state

`RestoreStateData.async_get_stored_state` 接收一个实体 ID 并返回该实体的 `StoredState`，如果没有已存储的状态则返回 `None`。如果该实体具有实体注册表条目，则通过实体注册表 ID 查找状态，并且返回的 `StoredState.state` 包含该实体当前的实体 ID。

更改前：

```python
from homeassistant.helpers import restore_state

stored_state = restore_state.async_get(hass).last_states.get(entity_id)
```

更改后：

```python
from homeassistant.helpers import restore_state

stored_state = restore_state.async_get(hass).async_get_stored_state(entity_id)
```

有关更多详细信息，请参阅 [core PR #183906](https://github.com/home-assistant/core/pull/183906)。
