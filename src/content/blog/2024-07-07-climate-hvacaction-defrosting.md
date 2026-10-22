---
title: 新增 HVACAction DEFROSTING
description: ClimateEntity 有一个 hvac_action 属性，用于描述气候实体（climate entity）当前正在执行的操作（这与其模式并不相同）。
date: 2024-07-07
authors:
  - G Johansson
areas:
  - core
---

`ClimateEntity` 有一个 `hvac_action` 属性，用于描述气候实体（climate entity）当前正在执行的操作（这与其模式并不相同）。

我们添加了 `DEFROSTING` 作为 `HVACAction` 的一个可能取值，用于表示实体当前正在进行除霜。

除霜是指系统反向运行一段时间，以融化积聚的冰。这种情况通常发生在较寒冷的环境中，不应与例如汽车通过加热车窗来进行除霜的情况相混淆。

```python
from homeassistant.components.climate.const import HVACAction

class MyClimateEntity(ClimateEntity):
    """Implementation of my climate entity."""

    def hvac_action(self) -> HVACAction | None:
        """Return the current running hvac operation if supported."""
        return HVACAction.DEFROSTING

```

更多详细信息可在[气候实体文档](/core/entities/climate/#hvac-actions)中找到

最初变更的背景信息可在[架构讨论 #1090](https://github.com/home-assistant/architecture/discussions/1090)中找到。
