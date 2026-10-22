---
title: LawnMowerActivity 中新增的 returning 类型
description: 自 Home Assistant Core 2024.9 起，实现了 LawnMowerEntity 的集成可以使用新的 LawnMowerActivity.RETURNING 状态来指示其割草机正在返回充电座。
date: 2024-08-23
authors:
  - Michael Arthur
areas:
  - core
---

自 Home Assistant Core 2024.9 起，实现了 `LawnMowerEntity` 的集成（integration）可以通过使用新的 `LawnMowerActivity.RETURNING` 状态（state）来指示其割草机正在返回充电座。

更多详情请参阅[文档](/core/entities/lawn-mower/)。

## 示例

```python
    async def async_dock(self) -> None:
        """Start docking."""
        self._attr_activity = LawnMowerActivity.RETURNING
        self.async_write_ha_state()
```

或者在 `lawn_mower` 实体（entity）的 activity 属性中返回 `LawnMowerActivity.RETURNING`。

```python
    @property
    def activity(self) -> LawnMowerActivity:
        """Return the state of the mower."""
        mower = self.mower
        if mower.state is RETURNING:
            return LawnMowerActivity.RETURNING
        ...
```
