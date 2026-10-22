---
title: 2023.2 及更高版本的蓝牙更新
description: 需要使用蓝牙适配器（Bluetooth adapter）的集成（integration）应在其 manifest.json 的 dependencies 中添加 bluetooth_adapters。
date: 2023-01-12
authors:
  - J. Nick Koston
areas:
  - core
---

需要使用蓝牙适配器的集成应在其 [`manifest.json`](/core/integrations/manifest/) 的 [`dependencies`](/core/integrations/manifest/#dependencies) 中添加 `bluetooth_adapters`。[`manifest.json`](/core/integrations/manifest/) 中的这一条目可确保所有受支持的远程适配器在集成尝试使用它们之前均已连接。这取代了在 [`dependencies`](/core/integrations/manifest/#dependencies) 中添加 `bluetooth` 的做法。

提供蓝牙适配器的集成应在其 [`manifest.json`](/core/integrations/manifest/) 的 [`dependencies`](/core/integrations/manifest/#dependencies) 中添加 `bluetooth`，并被添加到 `bluetooth_adapters` 集成的 [`after_dependencies`](/core/integrations/manifest/#after_dependencies) 中。

在构建新的蓝牙集成时，请务必查阅[集成作者的最佳实践](/core/integrations/bluetooth/)。
