---
title: 设备被限制为只能属于单个配置条目，且最多属于一个子条目
description: 现在，一个设备仅由单个配置条目拥有，并由单个（或无）配置子条目拥有。
date: 2026-07-21
authors:
  - Erik Montnémery
areas:
  - core
---

## 总结

现在，一个设备仅由单个配置条目（config entry）拥有，并由单个（或无）配置子条目（config subentry）拥有。设备不再跨集成（integration）合并：由多个集成支持的物理设备现在由每个配置条目对应一个设备来表示，而不是单个共享设备。

以前绑定到多个配置条目的设备在加载设备注册表（device registry）时，会被拆分为每个配置条目一个设备。实体（entity）注册表会进行更新，以便实体指向正确的设备。

**大多数集成不直接与设备注册表交互，因此不需要进行任何更改。** 直接与其交互的集成需要处理下面列出的弃用项。

此功能在核心 [PR #175785](https://github.com/home-assistant/core/pull/175785) 中实现，其基本原理在架构提案 [home-assistant/architecture#1226](https://github.com/home-assistant/architecture/discussions/1226) 中进行了描述。这些更改将在 Home Assistant Core 2026.8 中落地。

## 背景

到目前为止，由多个集成支持的物理设备已被合并为单个共享设备。这是通过全局唯一的连接（connections）和标识符（identifiers）来识别设备来实现的，例如，设备跟踪器（device tracker）和引用相同 MAC 地址的原生集成最终会落在同一个设备上。

这会导致一些问题：

- 设备信息（如名称或型号）没有单一的事实来源；冲突的值会被丢弃而不是保留。
- 用户会获得令人困惑的体验，设备页面包含来自多个集成的各种实体的大杂烩。
- 存在一些长期存在的错误，修改设备的连接和标识符会导致多个设备最终具有相同的连接，这违反了设备注册表的原始设计。

新行为是通过使标识符和连接在每个配置条目中唯一，而不是全局唯一来实现的。

## 弃用项

使用以下弃用的功能会在运行时记录警告。除非另有说明，弃用的功能将一直受支持，直到 Home Assistant Core 2027.8。

### `DeviceEntry.config_entries`

已弃用，请改用 `DeviceEntry.config_entry_id`。该属性作为兼容性垫片（compatibility shim）保留，返回包含设备单个配置条目的集合。

### `DeviceEntry.config_entries_subentries`

已弃用，请改用 `DeviceEntry.config_entry_id` 和 `DeviceEntry.config_subentry_id`。该属性作为兼容性垫片保留。

### `DeviceEntry.primary_config_entry`

已弃用，请改用 `DeviceEntry.config_entry_id`。设备现在属于单个配置条目，即其主配置条目。

### 读取复合设备的配置条目

`DeviceEntry.config_entries`、`DeviceEntry.config_entries_subentries` 和 `DeviceEntry.primary_config_entry` 仅对属于单个配置条目的普通设备弃用。在与合成的复合设备（向后兼容性解析为迁移前复合设备 ID 返回的只读设备，请参阅[向后兼容性](#向后兼容性)）交互时，它们不会被弃用。此类设备跨越多个配置条目，而 `config_entry_id` 和 `config_subentry_id` 无法表示这一点，因此这三个报告拆分设备并集的属性仍然是读取该信息的方式。

### `DeviceInfo["via_device"]` 和 `DeviceRegistry.async_get_or_create(via_device=...)`

已弃用，请改用 `via_device_id`。由于标识符仅在每个配置条目中唯一，标识符对不再明确指向单个设备，这就是 `via_device` 被弃用的原因。

同时传递 `via_device` 和 `via_device_id` 会引发 `HomeAssistantError`。

### `DeviceRegistry.async_update_device()` 配置条目参数

`add_config_entry_id`、`add_config_subentry_id`、`remove_config_entry_id` 和 `remove_config_subentry_id` 参数均被弃用。设备属于单个配置条目和子条目，因此添加和删除配置条目不再有意义；设备改为被移动或删除。

要将设备移动到另一个配置条目或子条目，请传递新的 `new_config_entry_id` 和 `new_config_subentry_id` 参数：

```py
device_registry.async_update_device(
    device.id,
    new_config_entry_id=config_entry.entry_id,
    new_config_subentry_id=subentry.subentry_id,
)
```

使用旧参数移动设备需要集成进行多次 `async_update_device` 调用，将设备添加到新的配置条目和子条目，然后从旧条目中删除它，并且对于仅在同一个配置条目内更改子条目的设备还有一个单独的处理情况。上面显示的单个调用取代了所有这些操作。此外，当设备移动到已启用的配置条目时，设备注册表现在会清除 `CONFIG_ENTRY` 禁用状态，因此集成不再需要手动在移动过程中传递 `disabled_by` 标志。

相关地，`async_update_device` 现在会根据所属配置条目的禁用状态验证 `disabled_by` 标志。为禁用配置条目上的设备设置 `disabled_by=None`，或为已启用配置条目上的设备设置 `disabled_by=DeviceEntryDisabler.CONFIG_ENTRY` 是不一致的；此类值现在会被忽略并记录日志，并将从 Home Assistant Core 2027.8 开始引发异常。

核心集成已作为示例进行了更新：[PR #176662](https://github.com/home-assistant/core/pull/176662) 中的 `openai_conversation`、[PR #176663](https://github.com/home-assistant/core/pull/176663) 中的 `scrape`、[PR #176664](https://github.com/home-assistant/core/pull/176664) 中的 `waqi` 以及 [PR #176665](https://github.com/home-assistant/core/pull/176665) 中的 `wolflink`。

要删除设备，请调用 `DeviceRegistry.async_remove_device()`：

```py
device_registry.async_remove_device(device.id)
```

核心集成已更新为通过这种方式在 PR [#176669](https://github.com/home-assistant/core/pull/176669)、[#176671](https://github.com/home-assistant/core/pull/176671)、[#176672](https://github.com/home-assistant/core/pull/176672) 和 [#176673](https://github.com/home-assistant/core/pull/176673) 中删除设备。

### `DeviceRegistry.async_get_device()`

已弃用。标识符和连接仅在每个配置条目中唯一，因此按标识符或连接进行查找在设计上可能会匹配多个设备，因此 `async_get_device` 返回的内容是不明确的。

当已知所属配置条目时，请使用新方法 `DeviceRegistry.async_get_device_by_identifier()` 或 `DeviceRegistry.async_get_device_by_connection()` 在该配置条目范围内查找设备。每个方法接受单个标识符或连接元组以及配置条目 ID，因此查找不再不明确：

```py
# Before
device = device_registry.async_get_device(identifiers={(DOMAIN, serial_number)})
# After
device = device_registry.async_get_device_by_identifier(
    (DOMAIN, serial_number), entry.entry_id
)
```

在实体内部，优先使用 `self.device_entry` 而不是注册表查找。如果您确实需要匹配某个键的每个设备（可能跨配置条目），请使用返回 list 的 `DeviceRegistry.async_get_devices()`。

核心集成已迁移到新方法，核心 [PR #176932](https://github.com/home-assistant/core/pull/176932) 中的 `heos` 就是一个示例。

在弃用期间，`async_get_device` 会按照下面[向后兼容性](#向后兼容性)中所述解析不明确的查找。请注意，这种向后兼容的解析仅通过 `DeviceRegistry` 查找方法（如 `async_get()` 和 `async_get_device()`）发生；直接与 `devices` 容器交互（例如 `DeviceRegistry.devices.get(device_id)`）不会合成复合设备。

### 将辅助元素配置条目添加到其他集成的设备

辅助元素（helper）集成不得将其配置条目添加到源实体的设备或用户选择的设备中，而应将其实体链接到该设备。这是此处描述的更改的直接结果：设备现在属于单个配置条目，因此辅助元素配置条目不能再添加到由另一个集成拥有的设备中。

这在去年的[辅助元素集成链接到其他集成设备的更新指南](/blog/2025/07/18/updated-pattern-for-helpers-linking-to-devices)中已宣布，并将在 Home Assistant Core 2026.8 中停止工作。

### `helpers.device.async_device_info_to_link_from_entity()` 和 `async_device_info_to_link_from_device_id()`

这两个辅助函数现在始终返回 `None`。

它们返回一个携带另一个设备的标识符和连接的 `DeviceInfo`，这会隐式地将调用者的配置条目添加到该设备。具有单个配置条目的设备无法表示这一点，它会默默地分叉出一个重复的设备。

改为在实体的构造函数中设置 `self.device_entry` 来将辅助元素实体链接到设备：

```py
self.device_entry = async_entity_id_to_device(hass, source_entity_id)
```

这些辅助函数将在 Home Assistant Core 2027.8 中移除。

### `helpers.helper_integration.async_handle_source_entity_changes(add_helper_config_entry_to_device=...)`

该参数不再有任何作用，应从调用中移除。

当源实体移动到另一个设备时，`async_handle_source_entity_changes` 现在仅更新辅助元素实体以链接到新设备，它不再从旧设备中移除辅助元素配置条目并将其添加到新设备中。

传递该参数在 Home Assistant Core 2027.8 之前仍被接受，并会记录警告。

### 清理辅助元素设备

用于从配置条目迁移步骤中清理辅助元素集成的设备的辅助函数，已在核心 [PR #176714](https://github.com/home-assistant/core/pull/176714) 中从 `async_remove_helper_config_entry_from_source_device` 重命名为 `homeassistant.helpers.helper_integration.async_remove_helper_devices`。旧名称作为弃用的别名保留，可继续工作直到 Home Assistant Core 2027.8。新的签名是：

```py
def async_remove_helper_devices(
    hass: HomeAssistant,
    *,
    helper_config_entry_id: str,
    source_device_id: str | None,
    remove_all_devices: bool = False,
    keep_device_ids: Collection[str] = (),
) -> None:
```

### `helpers.device.async_remove_stale_devices_links_keep_entity_device()` 和 `async_remove_stale_devices_links_keep_current_device()`

两者现在都是空操作。改为从辅助元素的 `async_setup_entry` 中调用带有 `remove_all_devices=True` 的 `async_remove_helper_devices`：

```py
async_remove_helper_devices(
    hass,
    helper_config_entry_id=entry.entry_id,
    source_device_id=entry.options.get(CONF_DEVICE_ID),
    remove_all_devices=True,
)
```

`template` 辅助元素已作为示例在核心 [PR #176900](https://github.com/home-assistant/core/pull/176900) 中迁移。这些函数将在 Home Assistant Core 2027.8 中移除。

## 设备只能有一个配置子条目

设备不能再绑定到多个配置子条目。这是一个没有向后兼容性垫片的破坏性更改；将多个子条目附加到同一设备的集成必须为每个子条目创建一个设备。

### 示例：`telegram_bot`

`telegram_bot` 集成已在核心 [PR #176606](https://github.com/home-assistant/core/pull/176606) 中为此进行了调整，可用作示例。

以前，它有一个由每个聊天共享的单个机器人设备，每个聊天的子条目都附加到该同一设备。现在，它为每个聊天创建一个单独的设备，并作为 via 设备链接到机器人设备。配置条目迁移将每个聊天的 notify 实体移动到其自己的设备上，并从机器人设备中剥离聊天子条目，使机器人设备没有子条目。

请注意，该 PR 是在添加 `via_device_id` 之前编写的，新代码应使用 `via_device_id` 而不是 `via_device`。

当引入[子设备](https://github.com/home-assistant/architecture/discussions/1414)时，使用 via 设备对此进行建模的集成应改为迁移到子设备。

## 将实体链接到拆分设备

迁移前的复合设备 ID 不再指代真实设备。尝试通过将此类 ID 传递给 `EntityRegistry.async_get_or_create(device_id=...)` 或 `EntityRegistry.async_update_entity(device_id=...)` 来将实体链接到该 ID 将被忽略并记录警告，而不是应用。然后将创建一个没有设备的新实体，现有实体保留其当前设备。传递真正不存在的设备 ID 仍然会像以前一样引发 `ValueError`。

当加载注册表时，其存储设备是没有拆分的复合设备且由实体的配置条目拥有的实体将从设备中分离；所属集成应重新链接它们。

改为将实体链接到拆分设备之一，使用 `async_get_device_by_identifier` 或 `async_get_device_by_connection` 进行查找。

## 设备注册表事件

拆分迁移前的复合设备发生在从存储加载注册表时，在任何侦听器运行之前，因此它不会发出 `EVENT_DEVICE_REGISTRY_UPDATED` 事件；设备在启动时就已经拆分。

对于订阅 `EVENT_DEVICE_REGISTRY_UPDATED` 或使用 `async_track_device_registry_updated_event` 并检查有效载荷的集成，有两件事发生了变化：

- `update` 事件的 `changes` 字典使用键 `config_entry_id` 和 `config_subentry_id` 报告设备移动，取代了之前的 `config_entries` 和 `config_entries_subentries`。
- 更新或删除迁移前的复合设备 ID 会将操作转发到每个拆分设备，因此每个拆分设备会触发一个事件，而不是为复合 ID 触发单个事件。

设备现在属于单个配置条目，因此它不能再在保留另一个配置条目的同时丢失一个配置条目。以前监视 `update` 事件以检测 `config_entries` 或 `config_entries_subentries` 键更改的集成（通常是为了检测其配置条目从与另一个集成共享的设备中移除），现在可能只需要处理 `remove` 事件：设备丢失其配置条目意味着设备被移除。

## 向后兼容性

拆分设备改变了自定义集成可能依赖的假设，并且存储在自动化（automation）和脚本中的设备 ID 不再作为设备存在。为了缓解这一问题，设备注册表会尽最大努力保持未修改的自定义集成正常工作，通过将迁移前的复合设备 ID 解析为其拆分到的设备。

这是尽最大努力，而不是保证。垫片无法涵盖自定义集成与设备注册表交互的每种方式，并且跨拆分设备不明确的操作根本无法应用。对直接与设备注册表交互的 462 个自定义集成进行的 AI 辅助分析表明，预计至少 90% 的集成将不受影响地工作，这也意味着有些将不会。请将您的集成迁移到新 API，而不是依赖这些垫片；它们将在 Home Assistant Core 2027.8 中移除。

在弃用期间：

- 当传递迁移前复合设备的 ID 时，`DeviceRegistry.async_get()` 会合成一个只读的已恢复复合设备。其标识符、连接和配置条目是拆分设备的并集。合成仅发生在 `async_get()` 中；直接与 `devices` 容器交互（例如 `DeviceRegistry.devices.get(device_id)`）不会合成复合设备，并为迁移前的复合设备 ID 返回 `None`。
- `DeviceRegistry.async_get_device()` 在可能的情况下，将按标识符或连接匹配多个配置条目的查找解析为单个设备，优先选择其配置条目域与查找的标识符匹配的设备。如果剩余的匹配项是一个迁移前复合设备的拆分，则返回跨越它们的只读复合设备。对于共享标识符或连接的独立设备，优先选择由调用集成拥有的设备，退而求其次选择第一个匹配项。
- `DeviceRegistry.async_update_device()` 和 `DeviceRegistry.async_remove_device()` 将调用转发到每个拆分设备。重写设备身份或移动设备的参数在拆分设备之间是不明确的；它们将被忽略并报告给违规集成。
- 实体注册表的 `get_entries_for_device_id()` 和 `async_entries_for_device()` 将迁移前的复合设备 ID 扩展为其拆分到的设备的实体。
- 针对迁移前复合设备 ID 的操作会向下传递到拆分设备。
- 拆分设备时，用户自定义（区域（area）、楼层、标签、名称）会被保留。

新方法 `DeviceRegistry.async_get_devices_for_composite_device_id()` 返回迁移前复合设备拆分到的设备。`DeviceRegistry.async_is_composite_device_id()` 返回设备 ID 是否为迁移前的复合设备 ID，即被拆分为每个配置条目一个设备且不再指代已注册设备的 ID。
