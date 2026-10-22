---
title: 弃用 IMPERIAL_SYSTEM 单位制及相关常量和属性
description: 自 Home Assistant Core 2022.11 起，IMPERIAL_SYSTEM 已被弃用，由 US_CUSTOMARY_SYSTEM 取代。
date: 2022-10-14
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.11 起，`IMPERIAL_SYSTEM` 已被弃用，由 `US_CUSTOMARY_SYSTEM` 取代。
单位制（unit system）的 `is_metric` 和 `name` 属性同样已被弃用，不应再使用。

引用此单位制或这些属性的自定义集成（custom integration）需要调整，改为使用实例检查（instance check）。

正确：
```python
if hass.config.units is METRIC_SYSTEM:
    pass

if hass.config.units is US_CUSTOMARY_SYSTEM:
    pass
```

为避免与未来的单位制产生混淆，常量 `CONF_UNIT_SYSTEM_IMPERIAL` 
和 `CONF_UNIT_SYSTEM_METRIC` 也已被弃用，不应再被引用：
  - 如果它们曾用于与单位制的 `name` 进行比较， 
  则不再需要这样做。
  - 如果它们是因其他原因而被使用，则应改为创建本地常量。
