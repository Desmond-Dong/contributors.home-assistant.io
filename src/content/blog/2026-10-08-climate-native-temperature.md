---
title: "气候实体现已公开其温度单位"
description: 自 Home Assistant Core 2026.11 起，气候实体新增了 temperature_unit 状态属性，集成所实现的温度属性也已重命名，加上了 native_ 前缀。
date: 2026-10-08
authors:
  - Erik Montnémery
areas:
  - core
---

自 Home Assistant Core 2026.11 起，气候（climate）实体新增了一个 `temperature_unit` 状态属性（attribute），并且集成所实现的温度属性（property）已重命名，加上了 `native_` 前缀。

### 背景

气候实体在向状态机（state machine）写入所有温度时，会将其转换为用户所配置的单位系统（unit system）。在此之前，单位并不包含在状态中，因此任何读取状态的人都必须知道气候温度遵循所配置的单位系统。这与其他实体不一致，例如 `sensor`、`number` 和 `weather`，它们会在数值旁边公开单位。

### `temperature_unit` 状态属性

`temperature_unit` 状态属性保存状态中温度的单位，即用户所配置单位系统的温度单位。它由 `ClimateEntity` 基类设置，集成无法覆盖。

### 重命名的属性

集成以设备所使用的单位指定温度，再由基类进行转换。为了明确这一点，并与 `sensor`、`number` 和 `weather` 实体对原生值（native value）的命名方式保持一致，以下属性及其 `_attr_` 简写属性已重命名：

| 旧名称 | 新名称 |
| --- | --- |
| `current_temperature` | `native_current_temperature` |
| `target_temperature` | `native_target_temperature` |
| `target_temperature_high` | `native_target_temperature_high` |
| `target_temperature_low` | `native_target_temperature_low` |
| `temperature_unit` | `native_temperature_unit` |

旧名称仍然可用，但实现它们、设置 `_attr_` 属性或读取它们都会记录一条警告。对旧名称的支持将在 Home Assistant Core 2027.11 中移除。

`min_temp`、`max_temp` 和 `target_temperature_step` 未重命名，仍以原生单位指定。

更多详情请参阅[气候实体文档](/core/entities/climate/#temperature-units)。

### 示例

旧：

```python
class MyClimateEntity(ClimateEntity):
    _attr_temperature_unit = UnitOfTemperature.CELSIUS

    @property
    def current_temperature(self) -> float | None:
        return self.device.temperature

    async def async_update(self) -> None:
        self._attr_target_temperature = await self.device.get_setpoint()
```

新：

```python
class MyClimateEntity(ClimateEntity):
    _attr_native_temperature_unit = UnitOfTemperature.CELSIUS

    @property
    def native_current_temperature(self) -> float | None:
        return self.device.temperature

    async def async_update(self) -> None:
        self._attr_native_target_temperature = await self.device.get_setpoint()
```
