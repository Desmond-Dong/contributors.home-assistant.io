---
title: 气候实体（climate entity）的辅助加热器已弃用
description: 自 Home Assistant Core 2024.4 起，我们已弃用 ClimateEntity 中的辅助加热器功能。
date: 2024-03-10
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.4 起，我们已弃用 `ClimateEntity` 中的辅助加热器（auxiliary heater）功能。

目前正在实现 `is_aux_heat` 属性以及 `turn_aux_heat_on`/`turn_aux_heat_off` 方法的集成（integration），需要移除这些内容，并改为实现其他实体来提供所需的功能，例如 `SwitchEntity`；如果是只读属性的情况，则可以使用 `BinarySensorEntity`。

你可以在[这里](https://github.com/home-assistant/architecture/discussions/932)阅读有关此决定的更多内容。
