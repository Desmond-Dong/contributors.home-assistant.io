---
title: 新的吸尘器状态属性
description: 自 Home Assistant Core 2025.1 起，StateVacuumEntity 中用于返回状态的常量已被弃用，并由 VacuumActivity 枚举取代。
date: 2024-12-08
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2025.1 起，`StateVacuumEntity` 中用于返回状态的常量已被弃用，并由 `VacuumActivity` 枚举取代。

同时，随着此变更，集成（integration）应设置 `activity` 属性，而不是直接设置 `state` 属性。

弃用期为一年，这些常量将从 2026.1 起停止工作，以确保所有自定义集成作者都有时间进行调整。

### 示例

```python

from homeassistant.components.vacuum import VacuumActivity

class MyVacuumCleaner(StateVacuumEntity):
    """My vacuum cleaner."""

    @property
    def activity(self) -> VacuumActivity | None:
        """Return the state of the vacuum."""
        if self.device.is_cleaning():
            return VacuumActivity.CLEANING
        return VacuumActivity.DOCKED

```

更多详情请参阅[吸尘器文档](/core/entities/vacuum/#states)。
