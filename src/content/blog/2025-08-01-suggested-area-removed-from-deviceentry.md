---
title: DeviceEntry.suggested_area 属性已弃用并将被移除
description: DeviceEntry.suggested_area 属性已弃用，并将在 HA Core 2026.9 中被移除。
date: 2025-08-01
authors:
  - Erik Montnémery
areas:
  - core
---

`DeviceEntry.suggested_area` 属性已弃用，并将在 HA Core 2026.9 中被移除。此外，当 HA Core 2026.9 发布时，`suggested_area` 将不再出现在 `EVENT_DEVICE_REGISTRY_UPDATED` 事件中。

注意：
在 `DeviceInfo` 中设置 `suggested_area`，以及将 `suggested_area` 传递给 `DeviceRegistry.async_get_or_create` 仍然是受支持的，并且会影响所创建设备的区域（area），尽管这在将来可能会发生变化。

在自定义集成（custom integration）中，请使用 `DeviceEntry.area_id` 来确定设备的区域。不要访问 `DeviceEntry.suggested_area`。

在弃用期间，访问 `DeviceEntry.suggested_area` 将记录一条警告日志。

更多详情，请参阅 [DeviceEntry 文档](/core/integrations/device-registry/#device-properties) 以及弃用了 `DeviceEntry.suggested_area` 的核心 [PR 149730](https://github.com/home-assistant/core/pull/149730)。
