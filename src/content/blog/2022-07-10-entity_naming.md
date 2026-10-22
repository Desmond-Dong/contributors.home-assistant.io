---
title: 采用新的实体命名方式
description: 我们正在改进并规范实体（entity）的命名方式。这将使我们将来能够在 UI 中于正确的上下文中展示实体，同时从代码库中移除一些容易出错的实体名称魔法式处理。
date: 2022-07-10
authors:
  - Erik Montnémery
areas:
  - core
---

我们正在改进并规范实体（entity）的命名方式。这将使我们将来能够在 UI 中于正确的上下文中展示实体，同时从代码库中移除一些容易出错的实体名称魔法式处理。

简单来说：

- 设备（device）的名称与现在一样，例如“Dishwasher”。
- 实体将拥有自己的名称（不包含设备、区域）。或者，它们也可以选择将名称设置为 `None`（在这种情况下将继承设备名称）。
- 设备、区域和实体的名称都以大写字母开头，其余单词为小写（当然，代表品牌/名称/缩写的单词除外）。
- 每个已迁移并遵循这些规则的实体都应将 [`has_entity_name`](/core/entities/naming/) 属性设置为 `True`。

在迁移期间，我们使用 `has_entity_name` 属性来创建“向后兼容”的友好名称。将来，我们可以对未设置此属性的实体显示弃用警告，之后再将其完全移除。

前端将为此进行调整。它将能够以各种方式显示实体/设备，采用最适合当前上下文的方式。

### 示例

这说明了根据新的建议，设备和实体应如何命名（类型：实体名称 / 状态对象的 `friendly_name` / `entity_id`）。
开发者只需设置设备名称和实体名称，`friendly_name` 和 `entity_id` 会自动生成。

- 设备：Dishwasher
  - 开关：`None` / Dishwasher / `switch.dishwasher`
  - 传感器：Power usage / Dishwasher Power usage / `sensor.dishwasher_power_usage`
- 设备：Laundry machine
  - 开关：`None` / Laundry machine / `switch.laundry_machine`
  - 传感器：Power usage / Laundry machine Power usage / `sensor.laundry_machine_power_usage`

## 背景

Home Assistant 将用户的家建模为三个层级：

- 区域（area，例如：客厅）
- 设备（device，例如：开关）
- 实体（entity，例如：用电量）

Home Assistant 中的实体是由设备提供的数据点，可以表示特定的控制（设备的开关、设备的灯）。

由于 Home Assistant 在诞生后的最初许多年里只有实体，因此 Home Assistant 的大量功能都围绕实体构建，其中最主要的就是 UI。

假设你有 2 个会报告用电量、名为 Dishwasher 和 Laundry Machine 的 Shelly 开关。这两个设备都有一个开关实体和一个用电量传感器。在此之前的设备和实体会是这样的（类型：实体名称 / 状态对象的 `friendly_name` / `entity_id`）：

- 设备：Dishwasher
  - 开关：Dishwasher Switch / Dishwasher Switch / `switch.dishwasher_switch`
  - 传感器：Dishwasher Power usage / Dishwasher Power usage / `sensor.dishwasher_power_usage`
- 设备：Laundry machine
  - 开关：Laundry machine Switch / Laundry machine Switch / `switch.laundry_machine_switch`
  - 传感器：Laundry machine Power usage / Laundry machine Power usage / `sensor.laundry_machine_power_usage`

### 为什么这是一个问题？

设备名称没有单一的可信来源，因为实体将设备名称包含在了自己的名称中。

因为我们通过将设备名称包含在实体名称中，“解决”了 UI 和 `entity_id` 的一个问题，如今这一解决方案已被应用到所有使用实体的地方，而我们不得不围绕这一解决方案进行变通。

这种命名方案让把 UI 迁移到“区域->设备->实体”的层级视图（而非冗长的实体列表）变得不必要地困难。
