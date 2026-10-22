---
title: 2022.9 中蓝牙被动传感器 API 的变更
description: 在 Home Assistant Core 2022.9 中，我们更改了 PassiveBluetoothProcessorCoordinator 和 PassiveBluetoothDataProcessor 蓝牙 API，让 PassiveBluetoothProcessorCoordinator 负责解析。
date: 2022-08-08
authors:
  - John Carr
areas:
  - core
---

在 Home Assistant Core 2022.9 中，我们更改了 `PassiveBluetoothProcessorCoordinator` 和 `PassiveBluetoothDataProcessor` 蓝牙 API，让 `PassiveBluetoothProcessorCoordinator` 负责解析。然后，该协调器（coordinator）会将解析后的数据推送给 `PassiveBluetoothDataProcessor` 实例。

PassiveBluetoothProcessorCoordinator 现在接受一个必需的 update_method 回调函数，该回调接收蓝牙广播（以 BluetoothServiceInfoBleak 的形式），并返回应传递给任何已订阅的 PassiveBluetoothDataProcessor 的数据：

```python
def my_parser(service_info: BluetoothServiceInfoBleak) -> MyDataClass:
    ...

    return MyDataClass(
        a=some_parsed_data,
        b=some_other_parsed_data,
    )


coordinator = PassiveBluetoothProcessorCoordinator(
    hass,
    _LOGGER,
    address=address,
    mode=BluetoothScanningMode.PASSIVE,
    update_method=my_parser,
)
```

PassiveBluetoothDataProcessor 仍然接受 update_method，但它现在接收的是 PassiveBluetoothProcessorCoordinator 的 update_method 返回的数据，而不是 BluetoothServiceInfoBleak。它仍应像以前一样返回 `PassiveBluetoothDataUpdate`：

```python
def sensor_update_to_bluetooth_data_update(
    sensor_update: MyDataClass,
) -> PassiveBluetoothDataUpdate:
    """Convert a sensor update to a bluetooth data update."""
    ...
    return PassiveBluetoothDataUpdate( ... )

processor = PassiveBluetoothDataProcessor(sensor_update_to_bluetooth_data_update)
```

所有内置集成（integration）都已完成转换，您可以查看它们以了解更多示例。

此变更将帮助那些需要在加载平台（platform）之前就开始解析数据的集成（例如，要加载的平台列表取决于广播中的数据），以及单个广播驱动多个平台的场景（您无需再对广播进行两次解析）。
