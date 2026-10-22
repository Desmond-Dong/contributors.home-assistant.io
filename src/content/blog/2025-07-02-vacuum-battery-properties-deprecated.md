---
title: 吸尘器电池属性已弃用
description: 自 Home Assistant Core 2025.8 起，StateVacuumEntity 中与电池相关的两个属性 battery_level 和 battery_icon 已被弃用。
date: 2025-07-02
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2025.8 起，`StateVacuumEntity` 中与电池相关的两个属性 `battery_level` 和 `battery_icon` 已被弃用。

`battery_level` 和 `battery_icon` 属性应替换为一个使用 `battery` 传感器设备类别（device class）的独立传感器，如果不想要电池传感器设备类别的默认图标，还可以选择自定义图标。
此外，还可以考虑提供一个使用 `charging` 设备类别的二进制传感器（binary sensor），用于指示当前是否正在充电。

弃用期为一年，这两个电池属性将从 2026.8 起停止工作，以确保所有自定义集成（custom integration）作者都有时间进行调整。

更多详情请参阅[架构决策](https://github.com/home-assistant/architecture/discussions/938)。
