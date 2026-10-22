---
title: 新的测量单位选择器
description: 新的 UnitOfMeasurementSelector 允许用户在配置、选项或子条目流程以及蓝图中选择测量单位。
date: 2026-10-09
authors:
  - Jan Bouwhuis
areas:
  - core
---

新的 `UnitOfMeasurementSelector` 允许用户在配置、选项或子条目流程以及蓝图（blueprint）中选择测量单位。在此之前，流程必须使用手工制作的单位列表来构建 `SelectSelector`，通常需要根据上一步的输入重新构建。新的选择器从传感器单位表中获取其单位，因此选项始终与传感器实体（entity）所接受的内容相匹配。

## 限制单位

选择器配置有两个可选键：`device_classes` 和 `state_classes`。两者都接受单个传感器设备类或状态类，或者它们的列表。

```python
import probatio

from homeassistant.components.sensor import SensorDeviceClass, SensorStateClass
from homeassistant.const import CONF_UNIT_OF_MEASUREMENT
from homeassistant.helpers.selector import (
    UnitOfMeasurementSelector,
    UnitOfMeasurementSelectorConfig,
)

DATA_SCHEMA = probatio.Schema(
    {
        probatio.Required(CONF_UNIT_OF_MEASUREMENT): UnitOfMeasurementSelector(
            UnitOfMeasurementSelectorConfig(
                device_classes=[SensorDeviceClass.ENERGY],
                state_classes=[SensorStateClass.TOTAL_INCREASING],
            )
        ),
    }
)
```

允许的单位遵循传感器实体的规则：

- **设备类（device classes）：** 选择器允许所有列出的设备类的单位，这些单位取自 `DEVICE_CLASS_UNITS`。非数值设备类（如 `date`、`enum` 或 `timestamp`）仅允许无单位。没有单位表的设备类（如 `monetary`）不会限制单位。
- **状态类（state classes）：** 选择器允许所有列出的状态类的单位，这些单位取自 `STATE_CLASS_UNITS`，但仅限于设备类也允许的那些单位。没有单位表的状态类（如 `measurement` 或 `total`）不会限制单位。
- **无限制：** 如果没有设备类或状态类限制，选择器接受任何字符串，因此用户可以输入自定义单位。

选择器将单位作为字符串返回，如果用户未选择单位则返回 `None`。

## 根据其他字段过滤单位

通常，用户使用[设备类和状态类选择器](/blog/2026/09/04/device-and-state-class-selectors)在与单位相同的表单中选择设备类和状态类。使用选择器配置中的 `context` 键来告诉前端哪些字段包含这些值。然后，一旦用户更改这些字段之一，前端就会缩小单位列表。

测量单位选择器支持以下上下文键：

| 上下文键              | 字段选择器类型      |
| --------------------- | ------------------- |
| `filter_device_class` | `device_class`      |
| `filter_state_class`  | `state_class`       |

每个键的值是同一架构中字段的名称。

```python
import probatio

from homeassistant.const import (
    CONF_DEVICE_CLASS,
    CONF_STATE_CLASS,
    CONF_UNIT_OF_MEASUREMENT,
)
from homeassistant.helpers.selector import (
    DeviceClassSelector,
    DeviceClassSelectorConfig,
    StateClassSelector,
    UnitOfMeasurementSelector,
    UnitOfMeasurementSelectorConfig,
)

DATA_SCHEMA = probatio.Schema(
    {
        probatio.Optional(CONF_DEVICE_CLASS): DeviceClassSelector(
            DeviceClassSelectorConfig(domain="sensor")
        ),
        probatio.Optional(CONF_STATE_CLASS): StateClassSelector(),
        probatio.Optional(CONF_UNIT_OF_MEASUREMENT): UnitOfMeasurementSelector(
            UnitOfMeasurementSelectorConfig(
                context={
                    "filter_device_class": CONF_DEVICE_CLASS,
                    "filter_state_class": CONF_STATE_CLASS,
                }
            )
        ),
    }
)
```

上下文与选择器配置的其余部分一起进行验证。它仅接受上面列出的上下文键，且值为字符串。上下文键不能与匹配的固定限制结合使用：不能将 `filter_device_class` 与 `device_classes` 一起使用，也不能将 `filter_state_class` 与 `state_classes` 一起使用。

上下文仅影响前端。选择器根据其 `device_classes` 和 `state_classes` 配置验证提交的单位，而不是根据其他字段的值。您的流程仍然需要检查该单位对用户选择的设备类和状态类是否有效，如果无效则返回错误。

## 在蓝图中使用选择器

该选择器在蓝图和服务描述中也可作为 `unit_of_measurement` 选择器使用。它采用与 Python 中相同的配置：`device_classes`、`state_classes` 和 `context`。

由于上下文是选择器配置的一部分，因此它在蓝图中也有效。每个上下文键的值是蓝图中另一个输入的名称。在此示例中，为 `unit` 输入提供的单位遵循用户在 `device_class` 和 `state_class` 输入中选择的设备类和状态类：

```yaml
blueprint:
  name: Sensor with a unit
  domain: template
  input:
    device_class:
      name: Device class
      selector:
        device_class:
          domain: sensor
    state_class:
      name: State class
      selector:
        state_class:
    unit:
      name: Unit of measurement
      selector:
        unit_of_measurement:
          context:
            filter_device_class: device_class
            filter_state_class: state_class
```

一旦 [home-assistant.io PR #48587](https://github.com/home-assistant/home-assistant.io/pull/48587) 合并，[选择器](https://www.home-assistant.io/docs/blueprint/selectors/)文档将描述该选择器。

## 迁移现有的测量单位选择器

允许用户使用从 `DEVICE_CLASS_UNITS` 或 `STATE_CLASS_UNITS` 构建的 `SelectSelector` 选择单位的流程，应迁移为使用 `UnitOfMeasurementSelector`。您不再需要根据之前的提交构建单位列表。相反，添加一个上下文，让前端为您过滤单位。

有关更多信息，请参阅 [core PR #183337](https://github.com/home-assistant/core/pull/183337) 和[数据录入流程文档](/core/integrations/flow-steps/#options-that-depend-on-another-field)。
