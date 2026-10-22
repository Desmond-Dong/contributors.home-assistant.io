---
title: 气候（climate）实体现已支持独立的水平摆动
description: 自 Home Assistant Core 2024.12 起，我们在 ClimateEntity 中实现了一个用于控制水平摆动的独立属性和方法。
date: 2024-12-03
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.12 起，我们在 `ClimateEntity` 中实现了一个用于控制水平摆动的独立属性和方法。

对于垂直摆动和水平摆动支持完全独立控制与状态的集成，现在可以仅将原来的 `swing_mode` 用于垂直摆动，并使用新的 `swing_horizontal_mode` 来提供水平摆动的状态和控制。

不具备独立控制的集成仍应继续使用现有的 `swing_mode` 来同时支持垂直和水平摆动。


### 示例

在你的气候实体中实现 `swing` 和 `swing_horizontal` 的示例要求。

```python

class MyClimateEntity(ClimateEntity):
    """Implementation of my climate entity."""

    @property
    def supported_features(self) -> ClimateEntityFeature:
        """Return the list of supported features."""
        return ClimateEntityFeature.SWING_MODE | ClimateEntityFeature.SWING_HORIZONTAL_MODE

    @property
    def swing_mode(self) -> str | None:
        """Return the swing setting.

        Requires ClimateEntityFeature.SWING_MODE.
        """
        return self._attr_swing_mode

    @property
    def swing_modes(self) -> list[str] | None:
        """Return the list of available swing modes.

        Requires ClimateEntityFeature.SWING_MODE.
        """
        return self._attr_swing_modes

    @property
    def swing_horizontal_mode(self) -> str | None:
        """Return the swing setting.

        Requires ClimateEntityFeature.SWING_HORIZONTAL_MODE.
        """
        return self._attr_swing_horizontal_mode

    @property
    def swing_horizontal_modes(self) -> list[str] | None:
        """Return the list of available swing modes.

        Requires ClimateEntityFeature.SWING_HORIZONTAL_MODE.
        """
        return self._attr_swing_horizontal_modes

    async def async_set_swing_mode(self, swing_mode: str) -> None:
        """Set new target swing operation."""
        await self.api.set_swing_mode(swing_mode)

    async def async_set_swing_horizontal_mode(self, swing_horizontal_mode: str) -> None:
        """Set new target horizontal swing operation."""
        await self.api.set_swing_horizontal_mode(swing_horizontal_mode)

```

更多详细信息请参阅[气候（climate）文档](/core/entities/climate/)。
