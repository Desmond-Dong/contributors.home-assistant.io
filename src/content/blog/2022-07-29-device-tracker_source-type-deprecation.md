---
title: 2022.9 版本中设备跟踪器（device tracker）的弃用
description: 在 Home Assistant Core 2022.9 中，我们已弃用 device_tracker 的 SOURCE_TYPE_* 常量。
date: 2022-07-29
authors:
  - Marc Mueller
areas:
  - core
---

在 Home Assistant Core 2022.9 中，我们已弃用 `device_tracker` 的
`SOURCE_TYPE_*` 常量。
请改用新的 [`SourceType`](/core/entities/device-tracker/) 枚举（enum）。

已弃用的常量：

- `SOURCE_TYPE_GPS`
- `SOURCE_TYPE_ROUTER`
- `SOURCE_TYPE_BLUETOOTH`
- `SOURCE_TYPE_BLUETOOTH_LE`
