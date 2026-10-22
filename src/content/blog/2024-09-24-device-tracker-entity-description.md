---
title: 在 device_tracker 中强制使用 SourceType 并添加简写属性和 EntityDescription
description: device_tracker 实体（entity）的 source_type 属性现在始终应为 SourceType 枚举值。
date: 2024-09-24
authors:
  - epenet
areas:
  - core
---

device_tracker 实体（entity）的 `source_type` 属性现在始终应为 `SourceType` 枚举值。标准字符串不再有效。

`TrackerEntity` 和 `ScannerEntity` 现在拥有专用的 `ScannerEntityDescription` 和 `TrackerEntityDescription`，在将 `EntityDescription` 关联到 `Entity` 时，需要将它们用作基类。

这些实体的 `source_type` 现在也默认为 `SourceType.GPS` 和 `SourceType.ROUTER`，因此有可能可以省略重写的属性。

同时还添加了以下简写属性：
- `BaseTrackerEntity._attr_source_type`
- `TrackerEntity._attr_latitude`
- `TrackerEntity._attr_location_accuracy`
- `TrackerEntity._attr_location_name`
- `TrackerEntity._attr_longitude`
- `TrackerEntity._attr_source_type`（默认为 `SourceType.GPS`）
- `ScannerEntity._attr_hostname`
- `ScannerEntity._attr_ip_address`
- `ScannerEntity._attr_mac_address`
- `ScannerEntity._attr_source_type`（默认为 `SourceType.ROUTER`）

更多详情请参阅 [device-tracker 文档](/core/entities/device-tracker/)。
