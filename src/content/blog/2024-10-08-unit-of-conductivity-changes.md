---
title: UnitOfConductivity 枚举的变更
description: "UnitOfConductivity 枚举已从以下内容更改为："
date: 2024-10-08
authors:
  - Erik Montnémery
areas:
  - core
---

`UnitOfConductivity` 枚举已从以下内容更改为：

```py
  class UnitOfConductivity(StrEnum):
    """Conductivity units."""

    SIEMENS = "S/cm"
    MICROSIEMENS = "µS/cm"
    MILLISIEMENS = "mS/cm"
```

更改为：

```py
  class UnitOfConductivity(StrEnum):
    """Conductivity units."""

    SIEMENS_PER_CM = "S/cm"
    MICROSIEMENS_PER_CM = "µS/cm"
    MILLISIEMENS_PER_CM = "mS/cm"
```

旧的枚举成员可以在一年的弃用期（deprecation period）内继续使用，以便为自定义集成（custom integrations）留出时间迁移到新的枚举成员。

实现细节请参见 [core PR #127919](https://github.com/home-assistant/core/pull/127919)。
