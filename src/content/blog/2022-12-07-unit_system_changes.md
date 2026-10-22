---
title: 单位制相关变更摘要
description: 过去几个月中，受支持的单位制发生了许多变化，数值传感器也受到了它们的影响。
date: 2022-12-07
authors:
  - Erik Montnémery
areas:
  - core
---

过去几个月中，受支持的单位制（unit system）发生了许多变化，数值传感器也受到了这些变化的影响。这篇博文试图对这些变更进行总结。

- 对于设备类别（device class）为 `distance`、`gas`、`precipitation`、`precipitation_intensity`、`speed`、`volume`、`water`、`weight` 或 `wind_speed` 之一的传感器（sensor），其状态（state）所使用的单位会受到单位制的影响并被自动转换。
  - 集成（integration）可以通过设置实体（entity）属性 `suggested_unit_of_measurement` 来覆盖单位制规则。
  - 为避免破坏性变更，只有*在传感器第一次被添加到 Home Assistant 时*，传感器的单位才会根据单位制规则进行自动转换。这意味着用户系统中已有的传感器不会受到新单位转换规则的影响。
  - 如果用户在偏好设置中更改了单位制，用户系统中已有传感器的单位不会受到单位制变更的影响。
  - 在大多数情况下，集成不再需要进行任何单位转换，因为这一工作现在已被自动处理。
  - 在大多数情况下，现有的实现单位转换的集成特定代码可以被移除，因为在移除自定义代码后，传感器的状态将被自动转换。有关其工作原理的详细信息，请参阅 [core PR #83228](https://github.com/home-assistant/core/pull/83228)。注意：这仅适用于具有 `unique_id` 的传感器。
  - 在大多数情况下，允许用户为集成选择传感器单位的自定义选项流程（option flow）可以被移除。如果不满意根据所选单位制进行的自动转换，用户可以改为通过前端中的实体设置来覆盖传感器的单位。注意：这仅适用于具有 `unique_id` 的传感器。
- 温度传感器的行为基本保持不变；温度传感器状态的单位将始终遵循单位制，除非：
  - 用户已通过前端中的实体设置覆盖了单位。
  - 温度传感器具有非 None 的 `suggested_unit_of_measurement` 属性。
- `IMPERIAL_SYSTEM` 单位制已被弃用，并由 `US_CUSTOMARY_SYSTEM` 取代。此外，单位制的 `is_metric` 和 `name` 属性已被弃用，不应再使用。有关这些变更的更多详细信息，请参阅这篇[博文](/blog/2022/10/14/deprecate-unit-system)。
- 单位转换工具已被重构并移动，单位转换器现在以静态类的形式提供于 `homeassistant/util/unit_conversion` 中。有关这些变更的更多详细信息，请参阅这篇[博文](/blog/2022/09/28/deprecate-conversion-utilities)。
