---
title: 设备追踪器实体模型的更改
description: "设备追踪器实体模型近期进行了多项更改："
date: 2026-06-15
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

设备追踪器实体模型近期进行了多项更改：

- `battery_level` 属性已被弃用
- `TrackerEntity` 的 `location_name` 属性已被弃用
- 引入了新的实体基类 `BaseScannerEntity`
- 用户可以将扫描器与 home 区域以外的其他地理位置区域（zone）关联
- `TrackerEntity` 新增 `in_zones` 属性
- `BaseScannerEntity` 和 `ScannerEntity` 新增 `in_zones` 状态属性
- 引入了新的能力属性 `tracking_type`
- 在计算 `TrackerEntity` 的状态时，地理位置区域现在按面积大小计算，然后按到中心的距离计算

## 详细信息

### 弃用 `battery_level`

所有设备追踪器基类中的 `battery_level` 属性均已被弃用，并将在 Home Assistant Core 2027.7 中停止工作。集成应改为通过电池传感器来传递电量信息。

更多详细信息可参阅[架构提案 #627](https://github.com/home-assistant/architecture/discussions/627)

### 弃用 `location_name`

`TrackerEntity` 的 `location_name` 属性已被弃用，并将在 Home Assistant Core 2027.7 中停止工作。

对于不知道或不想报告精确坐标，且目前使用 `location_name` 来报告地理位置区域名称的设备追踪器，集成应改为通过 `in_zones` 属性报告地理位置区域实体 ID 列表。
使用 `location_name` 提供额外上下文的设备追踪器，可以改为通过单独的传感器或额外的状态属性来实现。

更多详细信息可参阅[架构提案 #1387](https://github.com/home-assistant/architecture/discussions/1387)

### 引入 `BaseScannerEntity` 基类

对于拥有不追踪 WLAN 或其他本地网络连接，而是例如追踪 BLE 信标连接的扫描器的集成，应使用 [`BaseScannerEntity`](/core/entities/device-tracker/#basescannerentity) 类。

### 用户可以将 `BaseScannerEntity` 和 `ScannerEntity` 与任何地理位置区域关联

`BaseScannerEntity` 和 `ScannerEntity` 将关联的地理位置区域作为实体注册表选项存储。基类会在连接时将实体的状态设置为关联地理位置区域的名称，并将 `in_zones` 状态属性设置为包含该关联地理位置区域的所有地理位置区域。

更多详细信息可参阅[架构提案 #1389](https://github.com/home-assistant/architecture/discussions/1389)

### 引入 `in_zones` 状态属性

设备追踪器实体的状态中新增了 `in_zones` 状态属性。该状态属性由 `BaseScannerEntity` 和 `ScannerEntity` 自动计算。如果 [`in_zones` 属性](/core/entities/device-tracker/#properties)不为 `None`，`TrackerEntity` 将从中派生 `in_zones` 状态属性；如果为 `None`，则将根据报告的位置进行计算。

`in_zones` 状态属性是一个地理位置区域实体 ID 列表，按面积大小排序，最小的地理位置区域排在最前，然后按到中心的距离排序。

### 引入 `tracking_type` 能力属性

设备追踪器实体的状态中新增了一个能力属性 `tracking_type`。该状态属性由 `BaseScannerEntity` 和 `ScannerEntity` 设置为 `connection`，由 `TrackerEntity` 设置为 `position`。集成不应覆盖此行为。
