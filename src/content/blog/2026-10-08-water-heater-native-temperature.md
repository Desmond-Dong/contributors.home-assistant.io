---
title: "热水器实体现在公开其温度单位"
description: 自 Home Assistant Core 2026.11 起，热水器实体新增了一个 temperature_unit 状态属性，并且集成实现的温度属性已使用 native_ 前缀进行了重命名。
date: 2026-10-08
authors:
  - Erik Montnémery
areas:
  - core
---

自 Home Assistant Core 2026.11 起，热水器实体（entity）新增了一个 `temperature_unit` 状态（state）属性，并且集成（integration）实现的温度属性已使用 `native_` 前缀进行了重命名。

### 背景

热水器实体将其写入状态机（state machine）的所有温度转换为用户配置的单位制。直到现在，单位还不是状态的一部分，因此任何读取状态的人都必须知道热水器温度遵循配置的单位制。这与其他实体（如 `sensor`、`number` 和 `weather`）不一致，后者在数值旁边公开单位。

### `temperature_unit` 状态属性

`temperature_unit` 状态属性保存状态中温度的单位，即用户配置的单位制的温度单位。它由 `WaterHeaterEntity` 基类设置，集成无法覆盖它。

### 重命名的属性

集成使用设备所用的单位来指定温度，并由基类进行转换。为了明确这一点，并与 `sensor`、`number` 和 `weather` 实体命名原生值的方式保持一致，以下属性及其 `_attr_` 简写属性已被重命名：

| 旧名称 | 新名称 |
| --- | --- |
| `current_temperature` | `native_current_temperature` |
| `target_temperature` | `native_target_temperature` |
| `target_temperature_high` | `native_target_temperature_high` |
| `target_temperature_low` | `native_target_temperature_low` |
| `temperature_unit` | `native_temperature_unit` |

旧名称仍然有效，但实现它们、设置 `_attr_` 属性或读取它们会记录一条警告。对旧名称的支持将在 Home Assistant Core 2027.11 中移除。

`min_temp`、`max_temp` 和 `target_temperature_step` 未被重命名，并且仍以原生单位指定。

更多详细信息可以在[热水器实体文档](/core/entities/water-heater/#properties)中找到。

### 示例

旧版：

```python
class MyWaterHeaterEntity(WaterHeaterEntity):
    _attr_temperature_unit = UnitOfTemperature.CELSIUS

    @property
    def current_temperature(self) -> float | None:
        return self.device.temperature

    async def async_update(self) -> None:
        self._attr_target_temperature = await self.device.get_setpoint()
```

新版：

```python
class MyWaterHeaterEntity(WaterHeaterEntity):
    _attr_native_temperature_unit = UnitOfTemperature.CELSIUS

    @property
    def native_current_temperature(self) -> float | None:
        return self.device.temperature

    async def async_update(self) -> None:
        self._attr_native_target_temperature = await self.device.get_setpoint()
```
