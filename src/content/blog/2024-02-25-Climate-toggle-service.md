---
title: 新增 Climate 实体 toggle 方法
description: 自 Home Assistant Core 2024.3 起，我们为 ClimateEntity 新增了一个 toggle 方法，用户现在可以在其服务调用中调用 climate.toggle。
date: 2024-02-25
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.3 起，我们为 `ClimateEntity` 新增了一个新的 `toggle` 方法，用户现在可以在其服务调用中调用 `climate.toggle`。

支持 `turn_on` 和 `turn_off` 的集成（integration）都隐式支持 `toggle` 方法。

[在我们的文档中阅读更多关于 toggle 方法的信息](/core/entities/climate/)

示例（默认实现）：

```python
async def async_toggle(self) -> None:
    """Toggle the entity."""
    if self.hvac_mode == HVACMode.OFF:
        await self.async_turn_on()
    else:
        await self.async_turn_off()

```
