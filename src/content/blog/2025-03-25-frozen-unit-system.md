---
title: UnitSystem 数据类现已冻结
description: UnitSystem 类已更改为冻结的数据类（dataclass），从它派生的所有实例现在都是冻结的。
date: 2025-03-25
authors:
  - Shay Levy
areas:
  - core
---

`UnitSystem` 类已更改为冻结的数据类（dataclass），从它派生的所有实例现在都是冻结的。

以下从 `UnitSystem` 类派生的单位系统（unit system）现已冻结：

- `METRIC_SYSTEM`
- `US_CUSTOMARY_SYSTEM`

做出这一更改的原因是，单位系统是常量，不应被修改。集成若修改了这些常量，可能会破坏单位换算，并为 Home Assistant 的其他组件产生不期望的输出。

在使用冻结的数据类后，尝试修改 UnitSystem 常量将会失败：

```python
dataclasses.FrozenInstanceError: cannot assign to field 'temperature_unit'
```

此更改是在 [home assistant core PR #140954](https://github.com/home-assistant/core/pull/140954) 中引入的。
