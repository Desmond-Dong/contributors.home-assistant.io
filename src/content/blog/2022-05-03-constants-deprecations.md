---
title: 2022.5 的常量弃用
description: 在 Home Assistant Core 2022.5 中，我们弃用了许多常量，并将其替换为枚举。
date: 2022-05-03
authors:
  - Franck Nijhof
areas:
  - core
---

在 Home Assistant Core 2022.5 中，我们弃用了许多常量，并将其
替换为枚举（enum）。

所有 `SUPPORT_*` 常量均已被弃用，并在
[此前发布的博客文章](/blog/2022/04/02/support-constants-deprecation)中进行了总结。

此外，以下常量也已被弃用：

- **安防控制面板（Alarm Control Panel）**

  已弃用的常量：

  - `FORMAT_TEXT`
  - `FORMAT_NUMBER`

  请改用新的 [`CodeFormat`](/core/entities/alarm-control-panel/) 枚举。

- **摄像头（Camera）**

  已弃用的常量：

  - `STREAM_TYPE_HLS`
  - `STREAM_TYPE_WEB_RTC`

  请改用新的 [`StreamType`](/core/entities/camera/#properties) 枚举。

- **温控（Climate）**

  已弃用的常量：

  - `CURRENT_HVAC_COOL`
  - `CURRENT_HVAC_DRY`
  - `CURRENT_HVAC_FAN`
  - `CURRENT_HVAC_HEAT`
  - `CURRENT_HVAC_IDLE`
  - `CURRENT_HVAC_OFF`
  - `HVAC_MODE_AUTO`
  - `HVAC_MODE_COOL`
  - `HVAC_MODE_DRY`
  - `HVAC_MODE_FAN_ONLY`
  - `HVAC_MODE_HEAT_COOL`
  - `HVAC_MODE_HEAT`
  - `HVAC_MODE_OFF`

  请改用新的 [`HVACAction`](/core/entities/climate/#hvac-actions) 和 [`HVACMode`](/core/entities/climate/#hvac-modes) 枚举。

- **灯光（Light）**

  已弃用的常量：

  - `COLOR_MODE_UNKNOWN`
  - `COLOR_MODE_ONOFF`
  - `COLOR_MODE_BRIGHTNESS`
  - `COLOR_MODE_COLOR_TEMP`
  - `COLOR_MODE_HS`
  - `COLOR_MODE_XY`
  - `COLOR_MODE_RGB`
  - `COLOR_MODE_RGBW`
  - `COLOR_MODE_RGBWW`
  - `COLOR_MODE_WHITE`

  请改用新的 [`ColorMode`](/core/entities/light/#color-modes) 枚举。
