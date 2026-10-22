---
title: 用于长期统计的新传感器属性
description: 传感器实体模型新增了两个属性：state_class 和 last_reset。
date: 2021-05-25
authors:
  - Erik Montnémery
areas:
  - core
---

传感器实体（entity）模型新增了两个属性：`state_class` 和 `last_reset`。引入这两个新属性的动机都是为了支持自动生成长期统计（long-term statistics）。

### state_class

诸如 `DEVICE_CLASS_TEMPERATURE` 之类的传感器设备类（device class）被用于表示截然不同的数据类型，例如：

- 定期更新的温度测量值
- 历史或统计数据，例如日平均温度
- 未来数据，例如明天的天气预报

为了自动合理地筛选要纳入长期统计的传感器，需要区分表示测量值的传感器与不表示测量值的传感器。

[`state_class`](/core/entities/sensor/#properties) 属性对状态的类型进行分类：状态可以是_当前时刻的测量值_（来自温度传感器或电表）_、_历史值_（例如过去 24 小时的平均温度或上个月的用电量），也可以是_预测值_（例如天气预报或下次垃圾清运时间）。如果 `state_class="measurement"`，则状态表示当前值，而非历史聚合值或对未来的预测。否则，`state_class=None`。有一个[架构讨论](https://github.com/home-assistant/architecture/discussions/557)提供了更多相关背景信息。

请注意，上文的_当前时刻的测量值_并不意味着状态必须以一定的频率更新，也不意味着不允许传感器进行间接测量，例如对功率进行积分以计算能量。换一种说法，如果传感器表示时间序列中的最新观测值或最新数据点，那么它就符合 `state_class="measurement"`。

### last_reset

累积式传感器（例如电表、燃气表、水表等）被初始化的时间。如果初始化时间未知，并且该仪表永远不会重置，请将其设置为 UNIX 纪元 0：`homeassistant.util.dt.utc_from_timestamp(0)`。请注意，`last_reset` 属性返回的 `datetime.datetime` 会在实体的状态属性更新时被转换为 ISO 8601 格式的字符串。更改 `last_reset` 时，`state` 必须是有效的数字。
