---
title: 弃用所有用于受支持功能的魔法数字（magic numbers）
description: 自 Home Assistant Core 2024.1 起，所有针对受支持功能使用魔法数字的用法均已被弃用，每个实体（entity）平台都提供了一个 EntityFeature 枚举来替代它们。
date: 2023-12-28
authors:
  - J. Nick Koston
areas:
  - core
---

自 Home Assistant Core 2024.1 起，所有针对受支持功能使用魔法数字的用法均已被弃用，
每个实体平台都提供了一个 `EntityFeature` 枚举来替代它们。

将有一年的弃用期，这些魔法数字将在 2025.1 中停止工作，以确保所有自定义集成（custom integration）作者都有时间进行调整。

这适用于以下平台：

- **报警控制面板（Alarm Control Panel）**

  请改用新的 [`AlarmControlPanelEntityFeature`](/core/entities/alarm-control-panel/#supported-features) 枚举。

- **摄像头（Camera）**

  请改用新的 [`CameraEntityFeature`](/core/entities/camera/#supported-features) 枚举。

- **窗帘（Cover）**

  请改用新的 [`CoverEntityFeature`](/core/entities/cover/#supported-features) 枚举。

- **温控（Climate）**

  请改用新的 [`ClimateEntityFeature`](/core/entities/climate/#supported-features) 枚举。

- **加湿器（Humidifier）**

  请改用新的 [`HumidifierEntityFeature`](/core/entities/humidifier/#supported-features) 枚举。

- **风扇（Fan）**

  请改用新的 [`FanEntityFeature`](/core/entities/fan/#supported-features) 枚举。

- **灯（Light）**

  请改用新的 [`LightEntityFeature`](/core/entities/light/#supported-features) 枚举。

- **锁（Lock）**

  请改用新的 [`LockEntityFeature`](/core/entities/lock/#supported-features) 枚举。

- **媒体播放器（Media Player）**

  请改用新的 [`MediaPlayerEntityFeature`](/core/entities/media-player/#supported-features) 枚举。

- **遥控器（Remote）**

  请改用新的 [`RemoteEntityFeature`](/core/entities/remote/#supported-features) 枚举。

- **警笛（Siren）**

  请改用新的 [`SirenEntityFeature`](/core/entities/siren/#supported-features) 枚举。

- **吸尘器（Vacuum）**

  请改用新的 [`VacuumEntityFeature`](/core/entities/vacuum/#supported-features) 枚举。

- **热水器（Water Heater）**

  请改用新的 [`WaterHeaterEntityFeature`](/core/entities/water-heater/#supported-features) 枚举。
