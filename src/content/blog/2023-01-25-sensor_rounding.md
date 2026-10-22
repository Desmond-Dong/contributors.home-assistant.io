---
title: 传感器实体现在可以对数值进行四舍五入
description: "注意：此处描述的更改已被撤销，并替换为用于展示的四舍五入功能，更多详情请参阅这篇博文。"
date: 2023-01-25
authors:
  - Erik Montnémery
areas:
  - core
---

注意：
此处描述的更改已被撤销，并替换为用于展示（presentation）的四舍五入功能，更多详情请参阅[这篇博文](/blog/2023/02/08/sensor_presentation_rounding)。

`SensorEntity` 现在可以在将数值型的 `native_value` 转换为传感器状态（state）时对其进行四舍五入。此功能已作为 [core PR #86074](https://github.com/home-assistant/core/pull/86074) 的一部分实现。该四舍五入功能为可选启用，由集成（integration）设置 `native_precision` 属性来开启。建议集成设置此属性，因为它可以确保即使在单位转换之后，小数位数依然合理。

以下是从 PR 描述中复制的更改摘要：

- 默认情况下，不进行四舍五入
  - 集成可以通过设置新属性 `native_precision` 来影响状态精度
- 状态精度会受到单位转换的影响
  - 从较小单位转换为较大单位会增加显示精度
  - 如果集成已设置 `native_precision`，则从较大单位转换为较小单位会降低显示精度
  - 从较大单位转换为较小单位时的最小精度为 0，即不会四舍五入到十位、百位等
- 用户可以在前端覆盖显示精度
  - 没有最小精度限制，即通过设置负数精度可以四舍五入到十位、百位等
- 鼓励集成放弃用于显示的四舍五入，改为设置 `native_precision` 属性
- 在以下情况下，传感器状态的字符串表示会添加尾随零以匹配精度：
  - 精度由用户设置
  - `native_precision` 属性不为 `None`
  - 已进行单位转换
