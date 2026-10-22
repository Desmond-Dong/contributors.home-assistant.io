---
title: 设备注册表 WebSocket API 变更
description: 本文介绍了设备注册表 WebSocket API 的变更——即前端、自定义卡片和其他 WebSocket 客户端所使用的命令和设备序列化方式。
date: 2026-08-19
authors:
  - Erik Montnémery
areas:
  - core
---

## 摘要

本文介绍了设备注册表 **WebSocket API** 的变更——即前端、自定义卡片和其他 WebSocket 客户端所使用的命令和设备序列化方式。这些变更源于设备注册表的两个改动：

- **将每个设备限制为单个配置条目**（Home Assistant Core 2026.8）。此变更的 Python API 端在配套文章[设备被限制为单个配置条目和最多一个子条目](/blog/2026/07/21/device-registry-single-config-entry)中进行了描述。
- **引入[子设备](#child-devices-in-the-device-list)**（Home Assistant Core 2026.9，[架构提案 #1414](https://github.com/home-assistant/architecture/discussions/1414)）。

大多数客户端仅通过 `config/device_registry/list` 读取设备，并且新的设备字段是增量添加的，因此无需进行任何更改即可继续工作——但是遍历设备列表的客户端应准备好遇到序列化方式不同的子设备。移除设备或检查设备配置条目的客户端应继续阅读。

## 新设备字段：`config_entry_id` 和 `config_subentry_id`

`config/device_registry/list` 返回的每个设备以及 `EVENT_DEVICE_REGISTRY_UPDATED` 负载中的每个设备，现在都包含两个新字段：

- `config_entry_id` — 设备所属的单个配置条目的 ID。
- `config_subentry_id` — 设备所属的单个配置子条目的 ID，或为 `null`。

它们取代了之前的字段，之前的字段对可以跨越多个配置条目和子条目的设备进行了建模：

- `config_entries` — 配置条目 ID 的列表。
- `config_entries_subentries` — 配置条目 ID 到子条目 ID 列表的映射。
- `primary_config_entry` — 设备的主配置条目的 ID。

旧字段**为了向后兼容而保留，但已被弃用**；它们计划在 Home Assistant Core 2027.8 中移除。在弃用期间，它们是从新值派生而来的：设备将 `config_entries` 报告为单元素列表 `[config_entry_id]`，将 `config_entries_subentries` 报告为 `{config_entry_id: [config_subentry_id]}`，并将 `primary_config_entry` 报告为等于 `config_entry_id`。

请更新您的客户端以读取 `config_entry_id` 和 `config_subentry_id`。

## 设备列表中的子设备

Home Assistant Core 2026.9 引入了**子设备**（[架构提案 #1414](https://github.com/home-assistant/architecture/discussions/1414)，核心 [PR #178666](https://github.com/home-assistant/core/pull/178666)）。子设备是父设备的轻量级逻辑部分：它没有自己的硬件或固件元数据，并通过 `parent_device_id` 引用其父设备。父设备必须由同一个配置条目注册，并属于同一个配置子条目。

`config/device_registry/list` 现在会返回子设备以及常规设备，因此其结果是两种条目的混合。子设备使用较少的字段集进行序列化：

```json
{
  "id": "child1234",
  "parent_device_id": "abcd1234",
  "config_entry_id": "wxyz5678",
  "config_subentry_id": null,
  "area_id": null,
  "name": "Left channel",
  "name_by_user": null,
  "labels": [],
  "identifiers": [["demo", "left"]],
  "disabled_by": null,
  "created_at": 1723987200.0,
  "modified_at": 1723987200.0
}
```

与常规设备相比，子设备**没有** `connections`、`via_device_id`、`configuration_url`、`entry_type`、`manufacturer`、`model`、`model_id`、`hw_version`、`sw_version`、`serial_number`、`primary_config_entry`、`config_entries` 或 `config_entries_subentries`。读取设备列表的客户端不得假设每个条目都包含这些字段。

区分两者的可靠方法是 `parent_device_id` 字段：它仅存在于子设备上且不为 null。常规设备则包含 `via_device_id`。

没有自己 `area_id` 的子设备会继承其父设备的区域，因此解析子设备区域的客户端在子设备的 `area_id` 为 `null` 时应回退到父设备。

两个相关命令也支持子设备：

- `config/device_registry/update` 接受子设备 ID——设置 `area_id`、`disabled_by`、`labels` 或 `name_by_user`——并以如上所示的简化序列化方式返回更新后的子设备。
- `config/device_registry/list_linked_devices` 对于子设备始终返回空的 `linked_devices` 列表，因为子设备共享其父设备的每个配置条目标识符命名空间，并且永远不会链接到其他配置条目的设备。

## 新命令：`config/device_registry/remove`

一个新的 WebSocket 命令通过 ID 移除设备：

```json
{
  "type": "config/device_registry/remove",
  "device_id": "abcd1234"
}
```

由于设备现在仅属于一个配置条目，因此将其从该配置条目中移除即会移除该设备。该命令需要管理员权限，并且会拒绝[复合设备 ID](#new-command-configdevice_registrylist_composite_splits)，并报错 `Cannot remove a composite device`。

它取代了 `config/device_registry/remove_config_entry`，后者同时接受 `device_id` 和 `config_entry_id`：

```json
{
  "type": "config/device_registry/remove_config_entry",
  "config_entry_id": "wxyz5678",
  "device_id": "abcd1234"
}
```

该命令仍然有效，但**已被弃用**：它会记录警告并将在 Home Assistant Core 2027.9 中移除。其 `config_entry_id` 参数现在仅用于检查它是否与设备的配置条目匹配——不匹配会失败并报错 `Config entry not in device`——并且无论传递了哪个配置条目，设备都会被移除。请更新客户端以调用 `config/device_registry/remove` 并移除 `config_entry_id`。

在核心 [PR #178319](https://github.com/home-assistant/core/pull/178319) 中实现。

## 新命令：`config/device_registry/list_linked_devices`

由于连接和标识符现在在每个配置条目中都是唯一的，因此由多个集成（integration）支持的物理设备现在由每个配置条目一个设备来表示，而不是单个共享设备。此命令返回与给定设备共享连接或标识符的其他设备——即在不同配置条目下表示相同物理硬件的兄弟设备：

```json
{
  "type": "config/device_registry/list_linked_devices",
  "device_id": "abcd1234"
}
```

结果：

```json
{
  "linked_devices": ["ef567890", "12ab34cd"]
}
```

查询的设备本身不包含在结果中。这允许客户端例如从设备页面链接到表示相同硬件的其他设备。在核心 [PR #177449](https://github.com/home-assistant/core/pull/177449) 中实现。

## 新命令：`config/device_registry/list_composite_splits`

加载设备注册表时，跨越多个配置条目的每个迁移前设备都会被拆分为每个配置条目一个设备，并且原始（“复合”）设备 ID 不再指向已注册的设备。复合设备 ID 仍被自动化（automation）、脚本、仪表盘（dashboard）和目标选择器引用，因此此命令将每个复合设备 ID 映射到其拆分成的设备：

```json
{
  "type": "config/device_registry/list_composite_splits"
}
```

结果：

```json
{
  "old_composite_id": {
    "split_ids": ["ef567890", "12ab34cd"],
    "primary_id": "ef567890"
  }
}
```

对于每个复合设备 ID，`split_ids` 列出替换设备 ID，而 `primary_id` 是继承了该复合设备以前的主配置条目的拆分，或为 `null`。使用它可将存储的复合设备 ID 解析为当前设备——例如，当存储的 ID 是复合 ID 时，保持设备选择器正常工作。在核心 [PR #176693](https://github.com/home-assistant/core/pull/176693) 中实现。

配套文章的[向后兼容性](/blog/2026/07/21/device-registry-single-config-entry#backwards-compatibility)部分描述了弃用期间的其余行为，例如针对复合设备 ID 的操作会向下传递到拆分后的设备。

## 设备注册表事件

订阅 `device_registry_updated` 事件（`EVENT_DEVICE_REGISTRY_UPDATED`）的客户端会看到两个更改，这与 Python API 相呼应：

- `update` 事件的 `changes` 映射使用键 `config_entry_id` 和 `config_subentry_id` 报告设备移动，取代了之前的 `config_entries` 和 `config_entries_subentries`。
- 设备现在仅属于单个配置条目，因此它不能再在保留另一个配置条目的同时失去一个配置条目。设备失去其配置条目现在是一个 `remove` 事件，而不是 `update` 事件。

有关详细信息，请参阅配套文章中的[设备注册表事件](/blog/2026/07/21/device-registry-single-config-entry#device-registry-events)。
