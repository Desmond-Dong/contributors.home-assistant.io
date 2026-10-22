---
title: 使用 MATCH_ALL 将所有状态属性排除在记录之外
description: 2023 年 9 月曾对将状态属性排除在记录之外的方式进行过更改。
date: 2024-06-22
authors:
  - G Johansson
areas:
  - core
---

将状态属性（state attributes）排除在记录之外的方式此前已于 2023 年 9 月进行了更改。

之前的实现存在局限性，因为无法处理动态属性，也没有一种简单的方法可以直接排除所有属性，而无需逐个列出。

现在，集成（integration）内部可以使用 `MATCH_ALL` 常量告诉记录器（recorder）不记录任何属性，这将自动从记录中移除除 `device_class`、`state_class`、`unit_of_measurement` 和 `friendly_name.` 之外的所有属性。

```python
from homeassistant.const import MATCH_ALL

class ExampleEntity(Entity):
    """Implementation of an entity."""

    _unrecorded_attributes = frozenset({MATCH_ALL})

```

更多详情请参阅[实体文档](/core/entities/state-attributes/#keep-attributes-out-of-the-history)。

最初更改的背景信息见[架构讨论 #964](https://github.com/home-assistant/architecture/discussions/964)。
