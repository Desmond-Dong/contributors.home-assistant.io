---
title: 设备注册表更多弃用变更、新辅助方法和更严格的校验
description: 本文是《设备限制为单个配置条目及至多一个子条目》的后续，涵盖设备注册表的额外弃用、几个新辅助方法，以及在那篇文章之后落地的更严格校验。
date: 2026-08-24
authors:
  - Erik Montnémery
areas:
  - core
---

## 概要

本文是[《设备限制为单个配置条目及至多一个子条目》](/blog/2026/07/21/device-registry-single-config-entry)的后续，涵盖设备注册表的额外弃用、几个新辅助方法，以及在那篇文章之后落地的更严格校验。

**大多数自定义集成不会受到这批变更的影响。** 如果你的集成在 `DeviceInfo` 中设置了 `via_device` 或 `default_manufacturer` / `default_model` / `default_name`、在注册表中查找设备、读取注册表的 `devices`、`deleted_devices` 或 `child_devices` 容器、直接调用 `async_update_device`，或将设备附加到没有配置条目或唯一 ID 的实体上，请继续阅读。

除非另有说明，已弃用的功能会在运行时记录警告，并持续受支持直到 Home Assistant Core 2027.8。与之前一样，仅与 core 及 core 集成相关的弃用在那里执行得更严格：这些调用方会立即抛出异常，而自定义集成在移除版本之前仍会收到警告。

<!--truncate-->

## `via_device` 后续

上一篇文章弃用了 `DeviceInfo["via_device"]` 和 `DeviceRegistry.async_get_or_create(via_device=...)`，转而使用 `via_device_id`，因为标识符（identifier）在每个配置条目内才是唯一的，不再指向单个设备。一些相关的变更在此基础上进一步扩展。

### 查找 via 设备 ID：`async_get_device_id_by_identifier()`

要设置 `via_device_id`，你需要 via 设备的设备 ID。新的辅助方法 `homeassistant.helpers.device_registry.async_get_device_id_by_identifier()` 可以查找它，作用域限定在拥有该 via 设备的配置条目内：

```py
@callback
def async_get_device_id_by_identifier(
    hass: HomeAssistant, identifier: tuple[str, str], *, config_entry_id: str
) -> str:
```

```py
via_device_id=dr.async_get_device_id_by_identifier(
    hass, (DOMAIN, hub_serial_number), config_entry_id=entry.entry_id
)
```

该查找是明确的，因为标识符在配置条目内是唯一的。如果没有匹配的设备，它会抛出 `ValueError`，因此请仅在 via 设备已创建后调用它。当你的集成自行创建 via 设备时，跳过查找，直接从 `async_get_or_create` 返回的 `DeviceEntry` 中读取 `.id`。

该辅助方法在 core [PR #177494](https://github.com/home-assistant/core/pull/177494) 中添加，该 PR 还将一些集成从 `via_device` 迁移到 `via_device_id` 作为示例。

### `via_device` 从 `DeviceInfo` 类型中移除，`ATTR_VIA_DEVICE` 已弃用

来自 core [PR #178465](https://github.com/home-assistant/core/pull/178465) 的两个类型层面后续：

- `via_device` 已从 `DeviceInfo` `TypedDict` 中移除。仍然设置 `via_device` 的 `DeviceInfo` 字面量现在是类型错误；请使用 `via_device_id`。
- 常量 `homeassistant.const.ATTR_VIA_DEVICE` 已弃用。导入它会记录警告；请改用字符串 `"via_device_id"`。它将在 Home Assistant Core 2027.8 中移除。

同一 PR 还升级了上一篇文章中宣布的弃用的执行力度——`DeviceRegistry.async_get_device()`、向 `async_get_or_create()` 传递 `via_device`，以及 `async_update_device()` 的 `add_config_entry_id` / `add_config_subentry_id` / `remove_config_entry_id` / `remove_config_subentry_id` 参数。core 和 core 集成现在调用这些时会抛出 `RuntimeError`，而自定义集成在 Home Assistant Core 2027.8 之前仍会收到警告。

### 设备不能是自己的 via 设备

设备不再允许将自己设置为自身的 via 设备（core [PR #178194](https://github.com/home-assistant/core/pull/178194)）：

- 向 `async_get_or_create()` 或 `async_update_device()` 传递等于设备自身 ID 的 `via_device_id` 会抛出 `HomeAssistantError`。
- 传递引用设备自身的已弃用 `via_device` 现在会被忽略并记录日志，并将在 Home Assistant Core 2027.8 中抛出异常。

设备注册表存储已升级到版本 3.3（在 Home Assistant Core 2026.8 中引入），加载时会清除任何现有的 `via_device_id` 自引用。之前通过自行清除自引用来解决此问题的集成可以删除那段代码。

## `async_update_device()`：`merge_connections` 和 `merge_identifiers` 已弃用

在 core [PR #178888](https://github.com/home-assistant/core/pull/178888) 中，向 `DeviceRegistry.async_update_device()` 传递 `merge_connections` 或 `merge_identifiers` 已弃用。这些参数只会添加到设备现有的连接或标识符中；请自行计算完整的目标集合并将其作为 `new_connections` 或 `new_identifiers` 传递。

core 和 core 集成在传递合并参数时会抛出 `RuntimeError`；自定义集成在 Home Assistant Core 2027.9 之前会收到警告（注意此移除版本比其他弃用晚一个版本）。

## 查找设备在某个域的配置条目：`async_get_device_and_config_entry_for_domain()`

一个常见的模式是获取设备并遍历其 `config_entries` 以找到属于给定集成的配置条目。由于 `DeviceEntry.config_entries` 已弃用，core [PR #178991](https://github.com/home-assistant/core/pull/178991) 添加了一个直接执行此操作的辅助方法：

```py
@callback
def async_get_device_and_config_entry_for_domain(
    hass: HomeAssistant, device_id: str, *, domain: str
) -> tuple[DeviceEntry | None, ConfigEntry | None]:
```

```py
device, config_entry = dr.async_get_device_and_config_entry_for_domain(
    hass, device_id, domain=DOMAIN
)
```

对于未知或子设备 ID，它返回 `(None, None)`；当主设备存在但没有 `domain` 的配置条目拥有它时，返回 `(device, None)`。对于迁移前的复合 ID，它返回匹配的拆分设备及其配置条目，或者当没有拆分匹配时返回已恢复的复合设备和 `None`。该辅助方法不检查配置条目是否已加载，因此如果需要，请保留你自己的 `ConfigEntryState.LOADED` 检查。

## `devices`、`deleted_devices` 和 `child_devices` 容器已受保护

`DeviceRegistry.devices`、`DeviceRegistry.deleted_devices` 和 `DeviceRegistry.child_devices` 属性曾经是以设备 ID 为键的字典，集成有时会直接读取它们——`registry.devices.get(device_id)`、`registry.devices.values()` 或 `device_id in registry.devices`。底层容器现在已受保护，公共属性已缩小到集成合法需要的范围。

`devices`（core [PR #179578](https://github.com/home-assistant/core/pull/179578)）现在是已注册设备的只读集合。迭代它会直接产生 `DeviceEntry` 值，`len()` 和值成员检查（`device_entry in registry.devices`）按预期工作。将其用作映射——订阅、`.get()`、`.values()`、`.keys()` 或按设备 ID 的成员检查（`device_id in registry.devices`）——已弃用。映射接口作为向后兼容的垫片继续工作：core 和 core 集成会抛出 `RuntimeError`，而自定义集成只记录警告。它将在 Home Assistant Core 2027.9 中移除。

在实践中，使用 `for device in registry.devices` 迭代而不是 `registry.devices.values()`，使用 `registry.async_get(device_id)` 按 ID 查找设备而不是 `registry.devices.get(device_id)`。

`child_devices`（core [PR #179713](https://github.com/home-assistant/core/pull/179713)）现在是子设备的只读集合。它遵循容器协议——你可以迭代它（产生子设备条目）、取 `len()` 和测试值成员——但不提供任何字典式访问：没有 `.get()` 或 `.values()`，也没有按设备 ID 查找。没有向后兼容垫片。

`deleted_devices`（core [PR #179720](https://github.com/home-assistant/core/pull/179720)）是设备注册表的内部实现细节，整个属性现在已弃用——没有受支持的公共用途。以任何方式访问它都已弃用：core 和 core 集成会抛出 `RuntimeError`，而自定义集成只记录警告。它将在 Home Assistant Core 2027.9 中移除。

### 测试 ID 引用的是哪种设备

随着直接容器访问的移除，`DeviceRegistry.async_get` 新增了一个 `include_composite_devices` 参数来测试 ID 引用的是什么（core [PR #179594](https://github.com/home-assistant/core/pull/179594)）。当 `include_composite_devices=False` 时，迁移前的复合设备 ID 解析为 `None`：

```py
is_composite = (
    registry.async_get(device_id) is not None
    and registry.async_get(device_id, include_composite_devices=False) is None
)
```

这补充了现有的 `include_child_devices` 和 `include_main_devices` 参数，它们同样解析——或排除——子设备和主设备。上一篇文章中引入的 `DeviceRegistry.async_is_composite_device_id` 现在已冗余，并在同一 PR 中弃用；请改用 `include_composite_devices=False` 的 `async_get`。它继续工作——core 和 core 集成会抛出 `RuntimeError`，而自定义集成只记录警告——直到 Home Assistant Core 2027.9。

## 将设备附加到实体需要配置条目和唯一 ID

实体只有在具有唯一 ID 且属于配置条目时才能附加设备。尝试从没有配置条目或没有唯一 ID 的实体附加设备，现在会在 `entity_platform` 中被捕获（core [PR #177459](https://github.com/home-assistant/core/pull/177459)）：设备链接会被丢弃并记录警告。目前这只是警告，并将在 Home Assistant Core 2027.8 中抛出异常。

请注意，设备链接今天就已经被丢弃，即使抛出异常要到 2027.8 才落地——受影响的实体最终将没有设备，直到它被赋予唯一 ID 和配置条目。

## 设备信息类型已移除

设备注册表曾经根据 `DeviceInfo` 包含的键将其分类为固定的"设备信息类型"之一（link、primary、secondary）。这是为了猜测跨多个配置条目共享的设备的主集成，而现在设备由单个配置条目拥有，这已过时。该分类已移除，并在 core [PR #179397](https://github.com/home-assistant/core/pull/179397) 中被更轻量的验证取代，产生以下开发者可见的后果：

- 以前不匹配任何类型的 `DeviceInfo` 形状现在被接受。旧错误*"设备信息需要描述设备、链接到现有设备或提供额外信息"*已消失；`DeviceInfo` 仍需要至少一个 `identifiers` 或 `connections`。
- 同时传递一个字段及其 `default_` 对应字段——例如同时传递 `name` 和 `default_name`，或 `model` 和 `default_model`——现在会抛出 `DeviceInfoError`。
- 当新设备创建时没有名称，现在**所有**设备信息都默认为配置条目标题，而不仅仅是那些以前被分类为 primary 的。这可能会改变以前没有名称的设备上实体的组合名称。

## `default_manufacturer`、`default_model` 和 `default_name` 已弃用

`DeviceInfo` 的 `default_manufacturer`、`default_model` 和 `default_name` 成员在 core [PR #179549](https://github.com/home-assistant/core/pull/179549) 中已弃用。请改用普通的 `manufacturer`、`model` 和 `name` 字段。

这些 `default_` 字段允许不被视为共享设备主集成的集成建议名称、制造商或型号，而不会覆盖主集成设置的值。设备现在属于单个配置条目，因此不再有主集成需要让位，可以直接设置普通字段。

这三个字段已从 `DeviceInfo` 类型中移除，因此设置它们是类型错误，向 `async_get_or_create` 传递其中任何一个都会记录警告。与其他设备注册表弃用一样，core 和 core 集成会抛出 `RuntimeError`，而自定义集成在 Home Assistant Core 2027.9 之前继续工作并带有警告。

设置这些字段的实体——例如设备追踪器设置 `default_name`——应改用非默认变体：

```py
# Before
DeviceInfo(
    connections={(CONNECTION_NETWORK_MAC, mac)},
    default_name=f"Device {mac}",
)
# After
DeviceInfo(
    connections={(CONNECTION_NETWORK_MAC, mac)},
    name=f"Device {mac}",
)
```

## 向 `async_get_or_create` 传递 `created_at` 或 `modified_at` 已弃用

`created_at` 和 `modified_at` 由设备注册表自身管理，将它们传递给 `DeviceRegistry.async_get_or_create` 从来没有效果——值会被忽略。在 core [PR #179998](https://github.com/home-assistant/core/pull/179998) 中，传递其中任何一个现在已弃用：core 和 core 集成会抛出 `RuntimeError`，而自定义集成只记录警告，直到 Home Assistant Core 2027.9。只需删除这些参数。

## 更多示例

上述变更伴随着大量的逐集成适配——迁移到 `via_device_id`、使用新的查找辅助方法、移除设备自引用——这些可以作为进一步的示例。如果你需要具体的迁移参考，请在 core 仓库中搜索引用这些 API 的拉取请求。
