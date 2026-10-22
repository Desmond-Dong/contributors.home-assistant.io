---
title: 介绍虚拟集成以及集线器、设备与服务的区分
description: 在 2022.11 版本中，我们一直在调整集成清单（manifest），以便更好地区分集线器（hub）、设备（device）和服务（service）。
date: 2022-10-24
authors:
  - Franck Nijhof
areas:
  - core
---

在 2022.11 版本中，我们一直在调整集成清单（manifest），以便更好地区分集线器（hub）、设备（device）和服务（service）。此外，我们还推出了一种新的集成类型：虚拟集成（virtual integration）。

## 区分集线器、设备和服务

一个容易混淆的地方是：配置条目（config entry）可以集成单个设备（ESPHome）、通过集线器集成一整系列设备（Hue），或者集成一项服务（AdGuard）。

我们希望不久之后能在 UI 中区分这些类型，但目前还无法做到，因为集成没有暴露这些信息。

我们已经有 [`integration_type`](/core/integrations/manifest/#integration_type) 清单属性，并且对其进行了扩展以支持这些新类型：

- `device`：该集成每次集成一台设备。
- `hub`：该集成用于集成多台设备。
- `service`：该集成用于集成一项服务。

`hub` 与 `service` 或 `device` 之间的区别由集成的性质决定。`hub` 为其他多台设备或服务提供网关。`service` 和 `device` 是指每个配置条目提供一台设备或一项服务的集成。

> [!WARNING]
> 当未设置 [`integration_type`](/core/integrations/manifest/#integration_type) 时，我们会自动将其默认为 `hub`。这只是一个临时的回退（fallback）机制。我们将来会将显式设置 [`integration_type`](/core/integrations/manifest/#integration_type) 设为强制要求。
>
> 请更新你现有的（自定义）集成，在集成清单中设置正确的 `integration_type`。

## 虚拟集成

有些产品由并非以其产品名命名的集成提供支持。例如，Roborock 扫地机器人是通过 Xiaomi Miio 集成接入的。

还有些情况下，某条产品线仅支持诸如 Zigbee 或 Z-Wave 这样的标准 IoT 标准。例如，U-tec Ultraloq 通过 Z-Wave 工作，没有专门针对它的集成。

对于最终用户来说，要弄清楚如何将这些产品与 Home Assistant 集成可能会令人困惑。为了帮助解决上述情况，我们推出了：[虚拟集成](/core/integrations/manifest/#virtual-integrations)。

虚拟集成并不是真正的集成，而是用于帮助用户为其设备找到合适的集成。它们只有一个清单文件，没有任何额外的代码。

虚拟集成有两种类型：一种是由其他集成提供支持的虚拟集成，另一种是使用现有 IoT 标准的虚拟集成。

[在开发者文档中了解更多相关信息。](/core/integrations/manifest/#virtual-integrations)

## 移除受支持品牌功能

虚拟集成取代了之前的“受支持品牌（supported brands）”功能。该功能此前仅被 Home Assistant Core 集成使用，而所有这些集成现已迁移为使用虚拟集成。

由于已无任何地方在使用，因此受支持品牌功能已被直接移除，没有经过弃用（deprecation）过渡期。
