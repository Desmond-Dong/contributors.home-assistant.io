---
title: LockEntity 支持 open/opening 状态
description: 最近我们为 LockEntity 添加了 open 和 opening 状态
date: 2024-05-10
authors:
  - G Johansson
areas:
  - core
---

最近我们为 `LockEntity` 添加了 `open` 和 `opening` 状态

如果您拥有的锁能够区分 `unlocked`（未上锁但锁舌已扣上）状态和 `open`（未上锁且锁舌已收回）状态，这将非常有用。

`LockEntity` 已经通过实现功能标志 `LockEntityFeature.OPEN` 来支持 [`open` 方法](/core/entities/lock/)

示例（默认实现）：

```python
class MyLock(LockEntity):

    @property
    def is_opening(self) -> bool:
        """Return true if lock is open."""
        return self._state == STATE_OPENING

    @property
    def is_open(self) -> bool:
        """Return true if lock is open."""
        return self._state == STATE_OPEN

    async def async_open(self, **kwargs: Any) -> None:
        """Open the door latch."""
        self._state = STATE_OPEN
        self.async_write_ha_state()

```
