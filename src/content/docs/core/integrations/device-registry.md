---
title: 设备注册表
description: 注册集成的设备，将它们链接到集线器，把产品拆分为子设备，并允许用户删除设备。
sidebarGroup: Devices and registries
order: 1
---

设备注册表（device registry）是 Home Assistant 跟踪[设备（device）](/glossary/device/)的地方。设备将属于一体的实体（entity）组合在一起：一个带电池的温湿度传感器就是一个包含三个实体的设备。用户可以在设备专属页面上查看设备、把它们放入区域（area），并在自动化（automation）中指定它们。

## 什么是设备

设备可以是拥有自己控制单元的物理设备，也可以是一个服务（service）。控制单元不必是智能的，但必须能够控制所发生的事情。

- 一个带有四个房间传感器的温控器是五个设备：一个对应温控器及其内置传感器，每个房间传感器各一个。
- 连接到另一个设备以读取其数据的传感器，是与该设备分开的独立设备。该传感器之后可以被移去读取另一个设备。
- 具有多个独立部件的产品，例如每个插座都可以独立开关的电源插排，可以拆分为一个父设备和若干[子设备（child device）](#child-devices)。

设备属于注册它们的配置条目（config entry）。由两个集成（integration）设置的物理设备是两个设备，每个配置条目各一个。

## 设备属性

| 属性 | 含义 |
| --- | --- |
| `id` | The ID Home Assistant generated for the device |
| `identifiers` | A set of `(DOMAIN, identifier)` tuples, like a serial number. Each one is unique within the config entry. |
| `connections` | A set of `(connection_type, value)` tuples, like a MAC address. Each one is unique within the config entry. The types are `CONNECTION_NETWORK_MAC`, `CONNECTION_BLUETOOTH`, `CONNECTION_UPNP`, and `CONNECTION_ZIGBEE`. |
| `config_entry_id` | The config entry the device belongs to |
| `config_subentry_id` | The [subentry](/core/integrations/subentries/) the device belongs to, or `None` |
| `name` | The name of the device |
| `name_by_user` | The name the user gave it |
| `manufacturer` | The manufacturer |
| `model` | The model name |
| `model_id` | The model identifier |
| `serial_number` | The serial number. Unlike a serial number in `identifiers`, it does not have to be unique. |
| `sw_version` | The firmware version |
| `hw_version` | The hardware version |
| `configuration_url` | Where the device or service can be configured. Use `homeassistant://<path>` to link to a page inside Home Assistant. |
| `entry_type` | `None`, or `DeviceEntryType.SERVICE` for a service |
| `via_device_id` | The device Home Assistant reaches this device through, like a hub |
| `parent_device_id` | For a child device: its parent. Only child devices (`ChildDeviceEntry`) have this attribute. The WebSocket API reports it as `null` for other devices. |
| `area_id` | The area the device is in |
| `labels` | The labels of the device |
| `disabled_by` | Who disabled the device, as a `DeviceEntryDisabler`, or `None` |
| `created_at`, `modified_at` | When the device was created and last changed. Managed by the registry. |

## 通过实体注册设备

最常见的方式：为你的实体提供 `device_info`。当实体被添加时，Home Assistant 会创建或更新设备。这只适用于从配置条目添加的、具有[唯一 ID](/glossary/unique-id/) 的实体。

```python
from homeassistant.helpers.device_registry import DeviceInfo


class ExampleEntity(CoordinatorEntity[ExampleCoordinator]):
    """Base entity of the Example integration."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: ExampleCoordinator) -> None:
        """Initialize the entity."""
        super().__init__(coordinator)
        device = coordinator.data.device
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.serial_number)},
            manufacturer="Example",
            model=device.model_name,
            model_id=device.model_id,
            name=device.name,
            sw_version=device.firmware_version,
        )
```

`DeviceInfo` 接受 `identifiers`、`connections`、`name`、`manufacturer`、`model`、`model_id`、`serial_number`、`sw_version`、`hw_version`、`configuration_url`、`entry_type`、`suggested_area`、`via_device_id`，以及用于翻译名称的 `translation_key` 和 `translation_placeholders`。

注册表会查找同一配置条目下的现有设备，先按标识符查找，再按连接信息查找。匹配到一个就足够了：你传递的其他标识符和连接信息随后会被添加到该设备。如果它们已经属于同一配置条目的另一个设备，那就是冲突，注册表会抛出错误。

## 自行注册设备

A device without entities, like a hub, is registered directly. Do this in `async_setup_entry`, with the same `DeviceInfo` an entity would use:

```python
from homeassistant.helpers import device_registry as dr

device_registry = dr.async_get(hass)

hub = device_registry.async_get_or_create_device(
    config_entry_id=entry.entry_id,
    device_info=dr.DeviceInfo(
        connections={(dr.CONNECTION_NETWORK_MAC, dr.format_mac(info.mac))},
        identifiers={(DOMAIN, info.bridge_id)},
        manufacturer="Signify",
        model=info.model_name,
        model_id=info.model_id,
        name=info.name,
        sw_version=info.sw_version,
    ),
)
```

It returns the `DeviceEntry`, with its `id`. Besides `config_entry_id` and `device_info`, it takes `config_subentry_id`, and `disabled_by` to create the device disabled.

## 将设备链接到集线器

`via_device_id` 告诉 Home Assistant 它通过哪个设备到达另一个设备，例如网桥后面的灯泡。它展示了网络的拓扑结构。它接受集线器设备的 Home Assistant ID，因此集线器必须先被注册。

如果你自行注册了集线器，你已经拥有它的 ID：将 `hub.id` 传递给你的实体。否则，请从集线器的标识符中查找它：

```python
via_device_id = dr.async_get_device_id_by_identifier(
    hass, (DOMAIN, bridge_id), config_entry_id=entry.entry_id
)
```

当集线器尚不存在时，会抛出 `ValueError`。

## 子设备

> [!WARNING]
> 子设备是新增功能，其设计仍在完善中。API 和行为可能会发生变化。

子设备是用于一个物理产品的逻辑部分的轻量级设备，例如电源插排的一个插座，或墙壁开关的一个按键。父设备保存属于整个产品的内容，例如网络连接和固件更新。每个子设备保存其对应部分的实体，例如每个插座的开关和能耗传感器。用户可以把每个部分放在不同的区域。

不要将此与 `via_device_id` 混淆：那是关于独立产品之间的连接关系。子设备针对的是一个产品的各个部分。

子设备：

- 属于一个父设备，通过父设备的设备 ID（`parent_device_id`）引用。
- 与其父设备属于相同的配置条目和子条目。
- 没有自己的身份标识：没有 `connections`、`via_device_id`、`manufacturer`、`model`、固件版本或序列号。这些都属于父设备。
- 获取其父设备的区域，除非它有自己的区域。
- 不能拥有自己的子设备。

### 注册子设备

通过实体，返回一个带有 `identifiers` 和 `parent_device_id` 的 `ChildDeviceInfo`。父设备必须已经注册：

```python
from homeassistant.helpers.device_registry import ChildDeviceInfo

self._attr_device_info = ChildDeviceInfo(
    identifiers={(DOMAIN, f"{strip_id}_outlet_{number}")},
    name=f"Outlet {number}",
    parent_device_id=parent_device_id,
)
```

或者直接注册：

```python
outlet = device_registry.async_get_or_create_child_device(
    config_entry_id=entry.entry_id,
    device_info=ChildDeviceInfo(
        identifiers={(DOMAIN, f"{strip_id}_outlet_1")},
        name="Outlet 1",
        parent_device_id=parent.id,
    ),
)
```

Besides the required `identifiers` and `parent_device_id`, `ChildDeviceInfo` takes `name`, `suggested_area`, `translation_key`, and `translation_placeholders`. There is deliberately no `via_device_id`, `connections`, `manufacturer`, `model`, or firmware field: a child device doesn't have those. Next to the child device info, `async_get_or_create_child_device` takes `config_entry_id`, `config_subentry_id`, and `disabled_by`.

If the parent belongs to a subentry, pass its `config_subentry_id` as well. It is not inherited. The registry never creates the parent for you: it raises a `DeviceInfoError` when the parent does not exist, is a child device itself, or belongs to another config entry or subentry.

### 将现有设备迁移为子设备

如果子设备的标识符与同一配置条目下的某个现有设备匹配，该设备就会变成子设备，并保留其 ID。使用该设备的自动化将继续正常工作。这使得已经把产品拆分为独立设备的集成可以轻松迁移。

The other way around is not supported directly. `async_update_child_device` can't change the parent, and `async_get_or_create_device` with the identifiers of an existing child device raises an error instead of turning it into a normal device. To turn a child device back into a normal device, remove it with `async_remove_device`, then register it again with `async_get_or_create_device`, with the same identifiers. The order matters: the identifiers are only free once the child device is removed.

### 随父设备联动的行为

- Removing a parent removes its children.
- Disabling a parent disables its children, and enabling the parent enables the children it disabled again. A child of a disabled parent cannot be enabled on its own.
- A child without an area of its own is in the area of its parent. `dr.async_get_effective_area_id(hass, device)` returns the area that applies.
- Labels are not inherited.
- A parent with children cannot move to another config entry or subentry.
- An action that targets a parent device also targets the entities of its children. An action that targets a child only targets the entities of that child. That way, automations that target a device keep working when an integration moves entities of that device to child devices.

## 查找设备

在实体内部，使用 `self.device_entry`。在其他地方，请将查找范围限定在配置条目内：标识符和连接信息只在单个配置条目内是唯一的。

```python
device_registry = dr.async_get(hass)

# By the ID Home Assistant gave it
device = device_registry.async_get(device_id)

# By one of its identifiers or connections
device = device_registry.async_get_device_by_identifier(
    (DOMAIN, serial_number), entry.entry_id
)
device = device_registry.async_get_device_by_connection(
    (dr.CONNECTION_NETWORK_MAC, mac), entry.entry_id
)

# All devices of a config entry
devices = dr.async_entries_for_config_entry(device_registry, entry.entry_id)
```

`async_get` returns normal devices and child devices. Pass `include_child_devices=False` to only get a normal device. To only get a child device, pass both `include_main_devices=False` and `include_composite_devices=False`: by default, `async_get` also returns a read-only stand-in for the ID of a [device that was split into one device per config entry](/blog/2026/07/21/device-registry-single-config-entry/#backwards-compatibility), and that is not a child device. The other lookups return normal devices, not child devices. For child devices, use `async_get_child_device_by_identifier(identifier, config_entry_id)`, or `dr.async_entries_for_parent_device(device_registry, parent_device_id)` for all children of a device. To get every device with an identifier or connection across config entries, use `device_registry.async_get_devices()`.

To get a device together with the config entry of your integration that owns it, for example in an action, use `dr.async_get_device_and_config_entry_for_domain(hass, device_id, domain=DOMAIN)`. It returns `(None, None)` when the device is unknown, and `(device, None)` when no config entry of your domain owns it. It takes the same `include_child_devices` and `include_main_devices` arguments as `async_get`.

## 更新设备

当某些内容发生变化时，例如更新之后的固件版本，请更新该设备：

```python
device_registry.async_update_device(device.id, sw_version=new_version)
```

## 允许用户删除设备

只有当你的集成允许时，用户才能从 UI 中删除设备。请在 `__init__.py` 中实现 `async_remove_config_entry_device`。在完成所需的清理工作后，如果该设备可以被删除，则返回 `True`：

```python
from homeassistant.helpers.device_registry import DeviceEntry


async def async_remove_config_entry_device(
    hass: HomeAssistant, entry: ExampleConfigEntry, device_entry: DeviceEntry
) -> bool:
    """Allow removing a device that is no longer connected."""
    return not any(
        identifier
        for identifier in device_entry.identifiers
        if identifier[0] == DOMAIN
        and identifier[1] in entry.runtime_data.data.devices
    )
```

此示例仅允许删除集线器不再报告的设备。如果更方便的话，集成也可以改为响应 `EVENT_DEVICE_REGISTRY_UPDATED`。

能够察觉到设备消失的集成也应该自行删除过期的设备：这是[质量标准（quality scale）](/core/quality-scale/)黄金等级（Gold tier）的规则之一。
