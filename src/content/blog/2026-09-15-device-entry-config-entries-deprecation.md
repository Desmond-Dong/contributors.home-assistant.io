---
title: "`DeviceEntry.config_entries` 弃用现已强制执行"
description: 设备注册表的多配置条目兼容性属性——DeviceEntry.config_entries、DeviceEntry.config_entries_subentries 和 DeviceEntry.primary_config_entry——在《设备被限制为单个配置条目和最多一个子条目》一文中已宣布弃用，但读取它们时仍不会报错。
date: 2026-09-15
authors:
  - Erik Montnémery
areas:
  - core
---

## 总结

设备注册表的多配置条目兼容性属性——`DeviceEntry.config_entries`、`DeviceEntry.config_entries_subentries` 和 `DeviceEntry.primary_config_entry`——在[设备被限制为单个配置条目和最多一个子条目](/blog/2026/07/21/device-registry-single-config-entry)一文中已宣布弃用，但读取它们时仍不会报错。现在它们会在运行时发出提示：核心和核心集成会抛出 `RuntimeError`，自定义集成会记录警告。

请改用 `DeviceEntry.config_entry_id` 和 `DeviceEntry.config_subentry_id`。这些属性对自定义集成保留可用至 Home Assistant Core 2027.10，比前文中提到的 2027.8 晚了两个版本。

在合成的复合设备上读取这些属性并未弃用，也不会发出提示，因为此类设备确实跨越多个配置条目。

**大多数集成不会读取这些属性，也无需进行任何更改。** 如果你的集成需要检查设备的配置条目，或者在已删除的设备或子设备上访问它们，请继续阅读。

此更改在核心 [PR #181949](https://github.com/home-assistant/core/pull/181949) 中实现，并随 Home Assistant Core 2026.10 发布。

<!--truncate-->

## 哪些会发出提示以及替代方案

| 已弃用 | 替代方案 |
| --- | --- |
| `DeviceEntry.config_entries` | `DeviceEntry.config_entry_id` |
| `DeviceEntry.config_entries_subentries` | `DeviceEntry.config_entry_id` 和 `DeviceEntry.config_subentry_id` |
| `DeviceEntry.primary_config_entry` | `DeviceEntry.config_entry_id` |

与其他设备注册表弃用一样，核心内部的执行更为严格：核心或核心集成调用方会立即抛出 `RuntimeError`，而自定义集成在记录警告的同时仍可继续工作，直到 Home Assistant Core 2027.10。

## 迁移

一个设备确切地属于一个配置条目和最多一个配置子条目，因此每个兼容层都会简化为普通的属性读取：

```py
# Before
entry_id = device.primary_config_entry
# After
entry_id = device.config_entry_id
```

```py
# Before
if config_entry.entry_id in device.config_entries:
    ...
# After
if device.config_entry_id == config_entry.entry_id:
    ...
```

```py
# Before
for entry_id, subentry_ids in device.config_entries_subentries.items():
    for subentry_id in subentry_ids:
        ...
# After
entry_id = device.config_entry_id
subentry_id = device.config_subentry_id
```

如果你遍历设备的配置条目以查找属于你集成的那个，请改用[更多设备注册表弃用、新辅助元素和验证](/blog/2026/08/24/device-registry-follow-up-changes)中引入的 `async_get_device_and_config_entry_for_domain()` 辅助元素：

```py
device, config_entry = dr.async_get_device_and_config_entry_for_domain(
    hass, device_id, domain=DOMAIN
)
```

核心自身的测试套件已在核心 [PR #181945](https://github.com/home-assistant/core/pull/181945) 中迁移，不再使用这些属性，这可以作为一组示例。

## 复合设备豁免

对于合成的复合设备，这些属性并未弃用——即 `DeviceRegistry.async_get()` 为迁移前的复合设备 ID 返回的只读设备，如[向后兼容性](/blog/2026/07/21/device-registry-single-config-entry#backwards-compatibility)中所述。此类设备跨越多个配置条目，而 `config_entry_id` 和 `config_subentry_id` 无法表示这种情况，因此这三个属性是其正确的 API，且任何调用方读取它们时都不会发出提示。

豁免基于 `DeviceEntry.is_composite_device`，处理这两种设备的代码可以据此进行分支判断。核心的 `device_automation` 集成是一个真实的例子：传递给 `async_get_device_automations()` 的设备 ID 来自自动化、脚本和前端，因此它们仍可能是迁移前的复合 ID，并且列出设备的自动化需要拥有它的每个配置条目的域：

```py
# homeassistant/components/device_automation/__init__.py
if (device := device_registry.async_get(device_id)) is None:
    raise DeviceNotFound
if device.is_composite_device:
    entry_ids = device.config_entries
else:
    entry_ids = {device.config_entry_id}
for entry_id in entry_ids:
    if config_entry := hass.config_entries.async_get_entry(entry_id):
        domain_devices.setdefault(config_entry.domain, set()).add(device_id)
```

请注意，这仅适用于故意接受可能早于迁移的已存储设备 ID 的代码。仅处理其自身注册的设备的代码应无条件读取 `config_entry_id`。

## 已删除的设备

`DeletedDeviceEntry.config_entries` 和 `DeletedDeviceEntry.config_entries_subentries` 已弃用，并在相同条件下发出提示。已删除的设备永远不是复合设备，因此没有豁免——每次读取都会发出提示。

请使用 `DeletedDeviceEntry.config_entry_id` 和 `DeletedDeviceEntry.config_subentry_id`。对于孤立的已删除设备（即其所属配置条目已被移除的设备），两者均为 `None`；已弃用的属性将这种情况表示为空集合和空字典。

## 子设备

`ChildDeviceEntry` 继承了这三个属性，且子设备也永远不是复合设备，因此在子设备上读取它们总是会发出提示。子设备与其父设备属于相同的配置条目和子条目，两者均可通过 `config_entry_id` 和 `config_subentry_id` 获取。

## WebSocket API 和存储数据不受影响

此更改仅涉及 Python 属性。常规设备的序列化方式与以前相同——`config/device_registry/list`、`EVENT_DEVICE_REGISTRY_UPDATED` 负载以及设备注册表存储仍然包含 `config_entries`、`config_entries_subentries` 和 `primary_config_entry` 字段，这些字段在内部计算且不会发出提示——因此 WebSocket 客户端不受影响，也不会看到新的警告。子设备从一开始就不包含这些字段。

这些字段按照其自己的时间表弃用，详见[设备注册表 WebSocket API 更改](/blog/2026/08/19/device-registry-websocket-api-changes#new-device-fields-config_entry_id-and-config_subentry_id)。
