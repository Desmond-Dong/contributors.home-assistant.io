---
title: 实体类名
description: 在为我们的实体集成实现实体（entity）时，你是否曾疑惑为什么必须继承 BinarySensorDevice 而不是 BinarySensorEntity？
date: 2020-05-14
authors:
  - Paulus Schoutsen
areas:
  - core
---

在为我们的实体集成实现实体时，你是否曾疑惑为什么必须继承 `BinarySensorDevice` 而不是 `BinarySensorEntity`？现在不必再疑惑了，我们在 Home Assistant 0.110 中通过重命名所有名称中错误包含 Device 的类，解决了这一问题。旧的类仍然存在，但在使用时会记录一条警告。

Home Assistant 中的所有集成（integration）都已完成升级。自定义组件的作者需要自行完成迁移。你可以使用以下代码片段，在保持向后兼容性的同时完成迁移：

```python
try:
    from homeassistant.components.binary_sensor import BinarySensorEntity
except ImportError:
    from homeassistant.components.binary_sensor import BinarySensorDevice as BinarySensorEntity
```

以下类已被重命名：

| 旧类名 | 新类名 |
| -------------------- | -------------------- |
| `BinarySensorDevice` | `BinarySensorEntity` |
| `MediaPlayerDevice`  | `MediaPlayerEntity`  |
| `LockDevice`         | `LockEntity`         |
| `ClimateDevice`      | `ClimateEntity`      |
| `CoverDevice`        | `CoverEntity`        |
| `VacuumDevice`       | `VacuumEntity`       |
| `RemoteDevice`       | `RemoteEntity`       |
| `Light`              | `LightEntity`        |
| `SwitchDevice`       | `SwitchEntity`       |
| `WaterHeaterDevice`  | `WaterHeaterEntity`  |
