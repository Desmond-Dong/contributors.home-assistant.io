---
title: 锁实体
description: 为智能门锁构建锁实体（lock entity），可进行上锁、解锁，并可选择性地打开门。
sidebarLabel: Lock
sidebarGroup: Openings and security
---

锁实体（lock entity）用于控制锁（lock）：它会上锁、解锁，某些锁还可以通过拉开锁舌将门打开。它可以要求输入密码（code）。请继承 `homeassistant.components.lock` 中的 `LockEntity`。

有关前端如何显示锁，请参阅[锁的更多信息视图](/design/more-info/lock/)。

## 属性

除了[通用实体属性](/core/entities/entity-class/)之外，锁实体还具有以下属性。每个属性都可以通过其 `_attr_` 属性设置，例如 `_attr_is_locked`。

| 名称 | 类型 | 默认值 | 描述 |
| ---- | ---- | ------- | ----------- |
| `is_locked` | `bool \| None` | `None` | Whether the lock is locked. |
| `is_locking` | `bool \| None` | `None` | Whether the lock is in the process of being locked. |
| `is_unlocking` | `bool \| None` | `None` | Whether the lock is in the process of being unlocked. |
| `is_open` | `bool \| None` | `None` | Whether the lock is unlocked and has released its latch. |
| `is_opening` | `bool \| None` | `None` | Whether the lock is in the process of releasing its latch. |
| `is_jammed` | `bool \| None` | `None` | Whether the lock tried to move, to lock, unlock, or open, but got stuck before it finished. |
| `code_format` | `str \| None` | `None` | A regular expression the code must match, like `^\d{4}$`. `None` means the lock needs no code. |
| `changed_by` | `str \| None` | `None` | Who or what changed the lock last, like a user name or a keypad. |

## 密码

设置 `code_format` 后，Home Assistant 会在调用你的方法之前，将上锁、解锁或开门操作中提供的密码与该正则表达式进行比对，不匹配时会抛出验证错误。对于未提供密码的操作同样会执行此检查：空密码也必须匹配 `code_format`，因此像 `^\d{4}$` 这样的模式会使每个操作都必须提供密码。你的方法会通过 `kwargs` 中的 `ATTR_CODE` 接收密码，且仅在存在密码时才会传入，因此当密码为可选项时，请使用 `kwargs.get(ATTR_CODE)` 读取它。

用户可以在实体设置中保存默认密码。当操作未提供密码时，Home Assistant 会使用该默认密码。不匹配 `code_format` 的默认密码会被忽略。你无需为此做任何处理：它会从[实体注册表选项](/core/entities/registry/)中读取该设置，并为你添加密码。

## 支持的功能

将 `LockEntityFeature` 标志设置为 `supported_features`。参见[支持的功能](/glossary/supported-features/)。

| 值 | 描述 |
| ----- | ----------- |
| `OPEN` | 锁可以打开门锁舌。实现 `open`。 |

## 方法

实现每个方法的同步或异步版本，不要同时实现两者。

| 方法 | 异步版本 | 描述 |
| ------ | ------------- | ----------- |
| `lock(**kwargs: Any)` | `async_lock` | 上锁。 |
| `unlock(**kwargs: Any)` | `async_unlock` | 解锁。 |
| `open(**kwargs: Any)` | `async_open` | 打开门锁舌。需要 `OPEN`。 |

## 状态

状态是一个 `LockState`，按以下顺序取自第一个为 `True` 的属性：

| Value | From | Description |
| ----- | ---- | ----------- |
| `LockState.JAMMED` | `is_jammed` | The lock tried to move but got stuck before it finished. |
| `LockState.OPENING` | `is_opening` | The lock is releasing its latch. |
| `LockState.LOCKING` | `is_locking` | The lock is being locked. |
| `LockState.OPEN` | `is_open` | The lock is not secured and has released its latch. |
| `LockState.UNLOCKING` | `is_unlocking` | The lock is being unlocked. |
| `LockState.LOCKED` | `is_locked` is `True` | The lock is locked. |
| `LockState.UNLOCKED` | `is_locked` is `False` | The lock is not locked. |

当以上条件都不适用且 `is_locked` 为 `None` 时，状态为 `unknown`。

`OPEN` needs both: the lock is not secured, *and* its latch is released. A released latch while the lock is still secured is not the open state.

## Example

```python
from typing import Any

from homeassistant.components.lock import LockEntity


class MyLock(LockEntity):
    """A smart lock with a four digit code."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_code_format = r"^\d{4}$"

    def __init__(self, device: MyDevice) -> None:
        """Set up the lock."""
        self._device = device
        self._attr_unique_id = device.serial

    @property
    def is_locked(self) -> bool:
        """Return if the lock is locked."""
        return self._device.locked

    @property
    def is_jammed(self) -> bool:
        """Return if the lock is jammed."""
        return self._device.jammed

    async def async_lock(self, **kwargs: Any) -> None:
        """Lock the lock."""
        await self._device.lock()

    async def async_unlock(self, **kwargs: Any) -> None:
        """Unlock the lock."""
        await self._device.unlock(kwargs["code"])
```
