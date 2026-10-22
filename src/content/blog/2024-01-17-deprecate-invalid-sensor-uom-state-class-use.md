---
title: 弃用传感器测量单位与状态类的无效用法
description: 自 Home Assistant Core 2022.12 起，如果带有设备类（device class）的传感器实体（sensor entity）未结合其设备类正确使用测量单位（unit of measurement）和状态类（state class），日志中将会发出警告。
date: 2024-01-17
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

自 Home Assistant Core 2022.12 起，如果带有设备类（device class）的传感器实体（sensor entity）未结合其设备类正确使用测量单位（unit of measurement）和状态类（state class），日志中将会发出警告。

无效用法的一个例子是：传感器实体的设备类为 `SensorDeviceClass.TEMPERATURE`，但其测量单位使用了 `%` 而非 `°C` 或 `°F`；或者状态类使用了 `SensorStateClass.TOTAL` 而非 `SensorStateClass.MEASUREMENT`。

将设有六个月的弃用期，以确保所有自定义集成（custom integration）的作者都有时间进行调整。
自 Home Assistant Core 2024.8 起，该警告将被替换为异常（exception）。
