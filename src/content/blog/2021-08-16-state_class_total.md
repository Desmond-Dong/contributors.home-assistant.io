---
title: "新的传感器状态类：total_increasing"
description: 新增了一个状态类（state class）total_increasing。此外，last_reset 属性已从 SensorEntity 中移除。
date: 2021-08-16
authors:
  - Erik Montnémery
areas:
  - core
---

新增了一个状态类（state class）`total_increasing`。此外，`last_reset` 属性已从 `SensorEntity` 中移除。进行这些更改的动因是为了更轻松地与公用事业计量表（utility meters）等设备集成。

### 状态类

目前定义了 2 种状态类：

- `measurement`，状态表示当前时刻的测量值，例如温度、电功率、股票投资组合的价值等。对于受支持的传感器，传感器读数的每小时最小值、最大值和平均值的统计数据，或者自传感器首次添加以来其值的累计增长或下降的统计数据，会每小时更新一次。
- `total_increasing`，单调递增的总量，例如消耗的燃气、水或能量的数量。在受支持的情况下，自传感器首次添加以来其值的累计增长会每小时更新一次。

#### `STATE_CLASS_TOTAL_INCREASING`

对于 state_class 为 `STATE_CLASS_TOTAL_INCREASING` 的传感器，数值下降会被解释为新计量周期（meter cycle）的开始或计量表的更换。重要的是，集成（integration）必须确保在从存在测量噪声的传感器计算数值时，数值不会错误地下降。此状态类适用于燃气表、电表、水表等。

传感器首次添加到 Home Assistant 时的状态将用作初始零点。当检测到新的计量周期时，零点将被设置为 0。有关这对统计数据的影响，请参阅下面的表格。

带有新计量周期的 `STATE_CLASS_TOTAL_INCREASING` 示例：

| t                      | 状态   | 总和 |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     0  |  10  |
|   2021-08-01T16:00:00  |     5  |  15  |

新计量周期开始时的初始状态不为 0，但使用 0 作为零点的 `STATE_CLASS_TOTAL_INCREASING` 示例：

| t                      | 状态   | 总和 |
| :--------------------- | -----: | ---: |
|   2021-08-01T13:00:00  |  1000  |   0  |
|   2021-08-01T14:00:00  |  1010  |  10  |
|   2021-08-01T15:00:00  |     5  |  15  |
|   2021-08-01T16:00:00  |    10  |  20  |

此状态类过去通过状态类 `measurement` 结合 `last_reset` 值来表示。这种方法已被弃用，现在将被解释为 `total_increasing` 状态类，并自动进行最后重置（last reset）。
