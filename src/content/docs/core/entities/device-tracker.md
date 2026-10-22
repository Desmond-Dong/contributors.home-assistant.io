---
title: 设备跟踪器实体
description: 报告设备在哪里：或者通过其位置，或者通过它是否连接到网络或信标。
sidebarLabel: Device tracker
sidebarGroup: Sensors and status
---

设备跟踪器（device tracker）报告在场情况：手机、标签或汽车是在家、离家，还是位于某个[地理位置区域（zone）](/glossary/zone/)中。它是只读的。共有三个基类，全部从 `homeassistant.components.device_tracker` 导入，你可以根据设备获知自身位置的方式来选择其中一个：

- `TrackerEntity`：设备报告其位置，形式为 GPS 坐标或其所在的区域。比如手机应用或汽车。
- `ScannerEntity`：设备会被本地 IP 网络发现，并通过其 MAC 地址进行识别。比如会列出已连接客户端的路由器。
- `BaseScannerEntity`：设备仅报告是否已连接，不做 `ScannerEntity` 那样的 MAC 地址假设。比如蓝牙信标。

这三个类默认都会获得 `diagnostic` [实体类别（entity category）](/glossary/entity-category/)，并设置 `tracking_type` 能力属性：`TrackerEntity` 为 `position`，扫描器（scanner）为 `connection`。

## 属性

每个实体（entity）都具有的通用属性（例如 `name` 或 `available`）位于[实体类](/core/entities/entities-class/)中。

### 所有设备跟踪器

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `source_type` | `SourceType` | `BaseScannerEntity` 必需。`TrackerEntity` 为 `SourceType.GPS`，`ScannerEntity` 为 `SourceType.ROUTER` | 设备的跟踪方式：`GPS`、`ROUTER`、`BLUETOOTH` 或 `BLUETOOTH_LE`。 |

`battery_level` 属性已被弃用，并将在 Home Assistant 2027.7 中停止工作。请使用带有 `battery` 设备类别的[传感器（sensor）](/core/entities/sensor/)来报告电池电量。

### `TrackerEntity`

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `latitude` | `float \| None` | `None` | 设备的纬度。 |
| `longitude` | `float \| None` | `None` | 设备的经度。 |
| `location_accuracy` | `float` | `0` | 位置的精度，单位为米。 |
| `in_zones` | `list[str] \| None` | `None` | 设备所在区域的实体 ID 列表，包括被动区域。设置后（即使是设置为空列表），它将优先于坐标。顺序无关紧要：基类会按区域半径对列表进行排序，并丢弃其中不存在的区域。 |

设置 `in_zones`，或者设置 `latitude` 和 `longitude`。在没有 `in_zones` 的情况下，基类会根据坐标和精度推算出所在区域。`location_name` 属性已被弃用，并将在 Home Assistant 2027.7 中停止工作。

`TrackerEntity` 默认不进行轮询，每次更新都会写入状态机（state machine），即使没有任何变化。

### `BaseScannerEntity`

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `is_connected` | `bool \| None` | 必需 | 设备是否已连接。 |

### `ScannerEntity`

`ScannerEntity` 构建在 `BaseScannerEntity` 之上，因此它同样需要 `is_connected`。

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `mac_address` | `str \| None` | `None` | 设备的 MAC 地址。它同时也是该实体的唯一 ID。 |
| `ip_address` | `str \| None` | `None` | 设备的 IP 地址。 |
| `hostname` | `str \| None` | `None` | 设备的主机名。 |

`ScannerEntity` 的行为与大多数实体不同，因为它以 MAC 地址为键：

- 它的唯一 ID 就是 MAC 地址，你无需自行设置。
- 你无需提供设备信息：`device_info` 是 final 属性，且始终为 `None`。相反，一旦另一个集成（integration）在[设备注册表（device registry）](/core/entities/registry/)中注册了具有相同 MAC 地址的设备，Home Assistant 就会为你的配置条目（config entry）创建一个设备，以该 MAC 地址作为连接信息，并以主机名或 MAC 地址命名，然后将实体链接到该设备。
- 当它的 MAC 地址属于某个已知设备，或者它没有 MAC 地址时，它默认处于启用状态。网络上其他所有客户端的跟踪器初始为禁用，这样路由器就不会用大量实体淹没用户。当具有该 MAC 地址的设备之后出现在设备注册表中时，Home Assistant 会启用该跟踪器。这只有在集成（而非用户）禁用了该跟踪器，且用户没有为该配置条目关闭新实体时才会发生。
- 当你设置了 MAC 地址和 IP 地址时，DHCP 发现会使用它们（如果你设置了主机名，则还包括主机名）来为该设备发现集成。这发生在 Home Assistant 在设备处于连接状态时设置该实体的过程中，即使跟踪器处于禁用状态也是如此。DHCP 发现还会查看源类型为 `router` 且状态为 `home` 的跟踪器：在 DHCP 发现开始时查看一次，以及在此类跟踪器获得其第一个状态时查看一次。之后才从 `not_home` 变为 `home` 的跟踪器不会触发此操作。

## 支持的功能

此实体没有支持的功能。

## 方法

没有需要实现的方法。可以通过在 `update` 或 `async_update` 中轮询，或者通过 `async_write_ha_state` 推送，来使属性保持最新。请参见[更新状态](/core/entities/state-updates/)。

## 状态

状态由基类设置。不要自行设置 `state`。

| 状态 | `TrackerEntity` | 扫描器 |
| --- | --- | --- |
| `home` | 第一个活动区域是家庭区域。 | 已连接，且关联的区域是家庭区域。 |
| `not_home` | 没有活动区域。 | 未连接。 |
| 区域名称 | 第一个活动区域是另一个区域。 | 已连接，且关联的区域是另一个区域。 |
| `unknown` | 没有坐标且没有 `in_zones`。 | `is_connected` 为 `None`，或关联的区域不存在。 |

扫描器默认与家庭区域关联。用户可以在实体设置中选择另一个区域，例如为位于办公室的信标选择办公室。当该区域被删除时，Home Assistant 会引发一个[修复（repair）](/glossary/repair/)问题。

The `in_zones` state attribute lists the zones the device is in, smallest first. When the zones are worked out from coordinates, zones of the same size are sorted by the distance to their center, closest first. A scanner lists its associated zone and the zones that contain it. When the scanner is not connected, `in_zones` is an empty list.

## 示例

一个报告其 GPS 位置的汽车跟踪器：

```python
from homeassistant.components.device_tracker import TrackerEntity


class ExampleCarTracker(TrackerEntity):
    """Location of an example car."""

    _attr_has_entity_name = True
    _attr_translation_key = "location"

    def __init__(self, car: ExampleCar) -> None:
        """Initialize the tracker."""
        self._car = car
        self._attr_unique_id = f"{car.vin}_location"

    async def async_added_to_hass(self) -> None:
        """Subscribe to position updates."""
        self.async_on_remove(self._car.subscribe(self._update))

    def _update(self) -> None:
        """Handle a new position from the car."""
        self._attr_latitude = self._car.latitude
        self._attr_longitude = self._car.longitude
        self._attr_location_accuracy = self._car.accuracy
        self.async_write_ha_state()
```
