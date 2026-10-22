---
title: 弃用所有 SUPPORT_* 常量
description: 自 Home Assistant Core 2022.5 起，所有 SUPPORT_* 常量均已被弃用，每个实体（entity）平台都会提供 EntityFeature 枚举（enum）来替代它们。
date: 2022-04-02
authors:
  - Franck Nijhof
areas:
  - core
---

自 Home Assistant Core 2022.5 起，所有 `SUPPORT_*` 常量均已被弃用，
每个实体平台都会提供一个 `EntityFeature` 枚举来替代它们。

这适用于以下平台：

- **警报控制面板（Alarm Control Panel）**

  已弃用的受支持功能常量：

  - `SUPPORT_ALARM_ARM_AWAY`
  - `SUPPORT_ALARM_ARM_CUSTOM_BYPASS`
  - `SUPPORT_ALARM_ARM_HOME`
  - `SUPPORT_ALARM_ARM_NIGHT`
  - `SUPPORT_ALARM_ARM_VACATION`
  - `SUPPORT_ALARM_TRIGGER`

  请改用新的 [`AlarmControlPanelEntityFeature`](/core/entities/alarm-control-panel/#supported-features) 枚举。

- **摄像头（Camera）**

  已弃用的受支持功能常量：

  - `SUPPORT_ON_OFF`
  - `SUPPORT_STREAM`

  请改用新的 [`CameraEntityFeature`](/core/entities/camera/#supported-features) 枚举。

- **卷帘（Cover）**

  已弃用的受支持功能常量：

  - `SUPPORT_OPEN`
  - `SUPPORT_CLOSE`
  - `SUPPORT_SET_POSITION`
  - `SUPPORT_STOP`
  - `SUPPORT_OPEN_TILT`
  - `SUPPORT_CLOSE_TILT`
  - `SUPPORT_STOP_TILT`
  - `SUPPORT_SET_TILT_POSITION`

  请改用新的 [`CoverEntityFeature`](/core/entities/cover/#supported-features) 枚举。

- **温控（Climate）**

  已弃用的受支持功能常量：

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_TARGET_TEMPERATURE_RANGE`
  - `SUPPORT_TARGET_HUMIDITY`
  - `SUPPORT_FAN_MODE`
  - `SUPPORT_PRESET_MODE`
  - `SUPPORT_SWING_MODE`
  - `SUPPORT_AUX_HEAT`

  请改用新的 [`ClimateEntityFeature`](/core/entities/climate/#supported-features) 枚举。

- **加湿器（Humidifier）**

  已弃用的受支持功能常量：

  - `SUPPORT_MODES`

  请改用新的 [`HumidifierEntityFeature`](/core/entities/humidifier/#supported-features) 枚举。

- **风扇（Fan）**

  已弃用的受支持功能常量：

  - `SUPPORT_SET_SPEED`
  - `SUPPORT_OSCILLATE`
  - `SUPPORT_DIRECTION`
  - `SUPPORT_PRESET_MODE`

  请改用新的 [`FanEntityFeature`](/core/entities/fan/#supported-features) 枚举。

- **灯（Light）**

  已弃用的受支持功能常量：

  - `SUPPORT_EFFECT`
  - `SUPPORT_FLASH`
  - `SUPPORT_TRANSITION`

  请改用新的 [`LightEntityFeature`](/core/entities/light/#supported-features) 枚举。

  请注意，以下灯相关常量此前已被弃用，
  因此 `LightEntityFeature` 并未为它们提供替代。

  - `SUPPORT_BRIGHTNESS`
  - `SUPPORT_COLOR_TEMP`
  - `SUPPORT_COLOR`
  - `SUPPORT_WHITE_VALUE`

  这些情况应改为迁移到[新的颜色模式](/core/entities/light/#color-modes)。

- **锁（Lock）**

  已弃用的受支持功能常量：

  - `SUPPORT_OPEN`

  请改用新的 [`LockEntityFeature`](/core/entities/lock/#supported-features) 枚举。

- **媒体播放器（Media Player）**

  已弃用的受支持功能常量：

  - `SUPPORT_PAUSE`
  - `SUPPORT_SEEK`
  - `SUPPORT_VOLUME_SET`
  - `SUPPORT_VOLUME_MUTE`
  - `SUPPORT_PREVIOUS_TRACK`
  - `SUPPORT_NEXT_TRACK`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PLAY_MEDIA`
  - `SUPPORT_VOLUME_STEP`
  - `SUPPORT_SELECT_SOURCE`
  - `SUPPORT_STOP`
  - `SUPPORT_CLEAR_PLAYLIST`
  - `SUPPORT_PLAY`
  - `SUPPORT_SHUFFLE_SET`
  - `SUPPORT_SELECT_SOUND_MODE`
  - `SUPPORT_BROWSE_MEDIA`
  - `SUPPORT_REPEAT_SET`
  - `SUPPORT_GROUPING`

  请改用新的 [`MediaPlayerEntityFeature`](/core/entities/media-player/#supported-features) 枚举。

- **遥控器（Remote）**

  已弃用的受支持功能常量：

  - `SUPPORT_LEARN_COMMAND`
  - `SUPPORT_DELETE_COMMAND`
  - `SUPPORT_ACTIVITY`

  请改用新的 [`RemoteEntityFeature`](/core/entities/remote/#supported-features) 枚举。

- **警报器（Siren）**

  已弃用的受支持功能常量：

  - `SUPPORT_DURATION`
  - `SUPPORT_TONES`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_TURN_ON`
  - `SUPPORT_VOLUME_SET`

  请改用新的 [`SirenEntityFeature`](/core/entities/siren/#supported-features) 枚举。

- **吸尘器（Vacuum）**

  已弃用的受支持功能常量：

  - `SUPPORT_TURN_ON`
  - `SUPPORT_TURN_OFF`
  - `SUPPORT_PAUSE`
  - `SUPPORT_STOP`
  - `SUPPORT_RETURN_HOME`
  - `SUPPORT_FAN_SPEED`
  - `SUPPORT_BATTERY`
  - `SUPPORT_STATUS`
  - `SUPPORT_SEND_COMMAND`
  - `SUPPORT_LOCATE`
  - `SUPPORT_CLEAN_SPOT`
  - `SUPPORT_MAP`
  - `SUPPORT_STATE`
  - `SUPPORT_START`

  请改用新的 [`VacuumEntityFeature`](/core/entities/vacuum/#supported-features) 枚举。

- **热水器（Water Heater）**

  已弃用的受支持功能常量：

  - `SUPPORT_TARGET_TEMPERATURE`
  - `SUPPORT_OPERATION_MODE`
  - `SUPPORT_AWAY_MODE`

  请改用新的 [`WaterHeaterEntityFeature`](/core/entities/water-heater/#supported-features) 枚举。
