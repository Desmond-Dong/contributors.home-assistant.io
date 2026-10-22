---
title: 显示传感器状态时使用的小数位数现在可配置
description: 显示传感器状态时所显示的小数位数现在可由用户配置。
date: 2023-02-08
authors:
  - Erik Montnémery
areas:
  - core
---

显示传感器（sensor）状态时所显示的小数位数现在可由用户配置。集成（integration）可以通过设置属性 `suggested_display_precision` 来建议小数位数。我们鼓励集成移除用于显示的舍入，改为设置属性 `suggested_display_precision`。

用于展示的舍入由前端（frontend）完成，同时也由 [core PR #87619](https://github.com/home-assistant/core/pull/87619) 中引入的新模板函数完成。

显示的小数位数受单位转换的影响：
  - 从较小单位转换为较大单位会增加显示精度
  - 如果集成已设置 `suggested_display_precision`，从较大单位转换为较小单位会降低显示精度
  - 从较大单位转换为较小单位时的最小精度为 0，即不会舍入到十位、百位等

如果用户已自行设置显示精度，则显示的小数位数不受单位转换的影响。

注意：
在[早前的一篇博客文章](/blog/2023/01/25/sensor_rounding)中详述的一个类似概念——对传感器的状态进行舍入——已被回退。
