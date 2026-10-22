---
title: 辅助元素集成关联其他集成设备的最新指南
description: 辅助元素（helper）集成不应将其自身的配置条目（config entry）添加到源实体（entity）的设备（device）上，也不应添加到用户选择的设备上。
date: 2025-07-18
authors:
  - Erik Montnémery
areas:
  - core
---

辅助元素集成不应将其自身的配置条目添加到源实体的设备上，也不应添加到用户选择的设备上。相反，它们应只需将自己的实体（entity）链接到源实体的设备。

将辅助元素的配置条目添加到其他集成的设备上已不再受支持，并将在 Home Assistant Core 2026.8 版本中停止工作。

### 背景

架构提案 [home-assistant/architecture#1226](https://github.com/home-assistant/architecture/discussions/1226) 使设备的连接和标识符按集成（integration）域唯一，而不是全局唯一。这对大多数集成来说不是问题，但带配置流程的辅助元素集成是个例外。

### 建议的更改

#### 将辅助元素实体直接链接到源集成的设备

在辅助元素实体的构造函数中，将 `self.device_entry` 设置为源设备
```py
class HelperEntity(Entity)

    def __init__(hass: HomeAssistant, source_entity_id: str, ...) -> None:
        self.device_entry = async_entity_id_to_device(
            hass,
            source_entity_id,
        )
```

#### 不要直接将辅助元素配置条目添加到源设备

不要直接将配置条目添加到源设备，也就是说，这种模式已不再被允许
```py
device_registry.async_update_device(
    source_device.id,
    add_config_entry_id=helper_config_entry.entry_id,
)
```

#### 不要隐式地将辅助元素配置条目添加到源设备

不要设置 `self._attr_device_info`，也不要重写 `device_info` 来返回来自其他集成的设备的标识符和连接，因为这意味着辅助元素配置条目会被添加到源设备上。相反，请在辅助元素实体中设置 `self.device_entry`，以将辅助元素实体链接到其他集成的设备，如上例所示。

#### 清理设备注册表

有一个辅助函数 `homeassistant.helpers.helper_integration.async_remove_helper_config_entry_from_source_device` 可用于协助清理。核心集成已被修改为在配置条目迁移步骤中调用此辅助函数。

#### 处理已移除的设备

如何处理已移除的设备由辅助元素集成自行决定；大多数核心辅助元素会将 `self.device_entry` 设置为 `None`。请注意，如果传入不存在的 `device_id`，`DeviceRegistry.async_get` 会返回 `None`。

#### 示例实现

derivative 核心集成此前将其配置条目添加到源实体的设备上，现已在核心 [PR #148674](https://github.com/home-assistant/core/pull/148674) 中更新为仅将辅助元素实体链接到源实体的设备。

template 核心集成此前将其配置条目添加到用户选择的设备上，现已在核心 [PR #148756](https://github.com/home-assistant/core/pull/148756) 中更新为仅将辅助元素实体链接到用户选择的设备。
