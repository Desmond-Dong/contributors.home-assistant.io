---
title: 新的设备类别和状态类别选择器
description: 新增了用于选择设备类别或传感器状态类别的选择器。
date: 2026-09-04
authors:
  - Jan Bouwhuis
areas:
  - core
---

新增了[选择器](https://www.home-assistant.io/docs/blueprint/selectors/)，可用于选择设备类别或传感器状态类别。

在向用户请求设备类别或状态类别时，这些选择器可用于配置流程和蓝图中。

## 设备类别选择器

新的 `DeviceClassSelector` 可用于在配置流程和蓝图中选择设备类别。它支持以下平台的设备类别：

```python
Platform.BINARY_SENSOR: BinarySensorDeviceClass
Platform.BUTTON: ButtonDeviceClass
Platform.COVER: CoverDeviceClass
Platform.EVENT: EventDeviceClass
Platform.HUMIDIFIER: HumidifierDeviceClass
Platform.INFRARED: InfraredDeviceClass
Platform.MEDIA_PLAYER: MediaPlayerDeviceClass
Platform.NUMBER: NumberDeviceClass
Platform.SENSOR: SensorDeviceClass
Platform.SWITCH: SwitchDeviceClass
Platform.UPDATE: UpdateDeviceClass
Platform.VALVE: ValveDeviceClass
```

### 设备类别选择器示例

返回单个设备类别的设备类别选择器示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_DEVICE_CLASS): DeviceClassSelector(
            DeviceClassSelectorConfig(domain=Platform.SENSOR)
        ),
    }
)
```

以列表形式返回多个设备类别的设备类别选择器示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_DEVICE_CLASS): DeviceClassSelector(
            DeviceClassSelectorConfig(
                domain=Platform.BINARY_SENSOR,
                multiple=True,
            )
        ),
    }
)
```

## 传感器状态类别选择器

新的 `StateClassSelector` 可用于在配置流程和蓝图中选择传感器状态类别。

### 传感器状态类别选择器示例

返回单个状态类别的传感器状态类别选择器示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_STATE_CLASS): StateClassSelector(),
    }
)
```

返回单个状态类别且仅包含可用状态类别过滤子集的传感器状态类别选择器示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_STATE_CLASS): StateClassSelector(
            StateClassSelectorConfig(
                state_classes=[
                    SensorStateClass.MEASUREMENT,
                    SensorStateClass.TOTAL_INCREASING,
                ],
            )
        ),
    }
)
```

以列表形式返回多个状态类别的状态类别选择器示例：

```python
vol.Schema(
    {
        vol.Optional(CONF_STATE_CLASS): StateClassSelector(
            StateClassSelectorConfig(multiple=True),
        ),
    }
)
```

## 迁移现有的设备类别和状态类别选择器

与使用通用的 `SelectSelector` 不同，`DeviceClassSelector` 允许前端自动将设备类别翻译为用户友好的名称。

使用 `SelectSelector` 选择设备类别或状态类别的现有实现应迁移为使用 `DeviceClassSelector` 或 `StateClassSelector`。迁移后，应删除与旧选择器值相关的任何过时翻译。

[选择器](https://www.home-assistant.io/docs/blueprint/selectors/)文档已更新，包含了这些新的选择器。
