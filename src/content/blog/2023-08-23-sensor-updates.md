---
title: 数值传感器不再允许将其状态设置为 NaN 或 inf
description: 数值传感器不再允许将其状态设置为非数字（Not a Number）或正无穷大或负无穷大。
date: 2023-08-23
authors:
  - Erik Montnémery
areas:
  - core
---

数值传感器（sensor）不再允许将其状态（state）设置为[非数字（Not a Number）](https://en.wikipedia.org/wiki/NaN)或正无穷大或负无穷大。

该变更已在 [core PR#98110](https://github.com/home-assistant/core/pull/98110) 中引入。

更多详情，请参阅 [`sensor` 文档](/core/entities/sensor/)。
