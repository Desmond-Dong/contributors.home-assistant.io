---
title: 气候清理
description: 本文介绍 Home Assistant 气候（climate）集成即将推出的变更。
date: 2019-07-03
authors:
  - Paulus Schoutsen
areas:
  - core
---

_本文介绍 Home Assistant 气候（climate）集成即将推出的变更。这些变更目前正在实施中，已不再接受讨论。如果您希望看到某些变更，请考虑提交[架构议题](https://github.com/home-assistant/architecture/issues)。_

从 Home Assistant 0.96 开始，我们将对气候（climate）集成进行一次大规模的架构清理。这项工作由 Pascal Vizeli 领导。

多年来，气候集成已经从温控器（thermostat）的简单栖身之所，发展为承载空调、热泵和通风系统的平台。在这一发展过程中，我们犯了一些错误，导致设计混乱且难以使用。目前清理工作正在进行中，我们将在 Home Assistant 0.96 中发布这些变更。

我们犯的最大错误是将运行（operating）与运行模式（operation mode）混为一谈。运行模式（operation mode）是您希望温控器执行的操作，例如将房屋加热到 19 °C。而运行状态（operating mode）则是温控器_当前_正在执行的操作。它是因为房屋太冷而在制热吗？还是已经达到目标温度，目前处于空闲状态？

除此之外，我们还注意到许多集成在运行模式上堆砌了各种五花八门的选项，例如"eco"（节能）、"comfort"（舒适）、"boost"（强力）或"sleep"（睡眠）。在仔细分析了市面上各种不同的气候系统之后，我们得出结论：这些替代运行模式其实是现有运行模式（制热、制冷、制热-制冷）的变体，只是目标温度范围可能不同，或者会以较慢的速度进行加热/制冷以节省能源。

为了支持尽可能多的不同温控器，我们决定允许气候设备指定一个新的"预设（preset）"模式，以表明它们当前所处的运行状态。它涵盖了保持模式（hold mode）、外出模式（away mode），或温控器所包含的任何自定义运行模式。

您可能会问，为什么要采用预设，而不是允许在运行模式上继续堆砌选项？乍一看，集成列出可能的选项以及当前选中的选项似乎没什么问题，也便于制作 UI。然而，这并不是 Home Assistant 的唯一使用方式。对于 Google Assistant 或 Amazon Alexa 等外部系统而言，我们还是控制任意温控器的统一入口。它们所期望的运行模式只有有限的几种。

变更要点如下：

- `operation_mode` 已更名为 `hvac_mode`，以强调该模式的用途。
- 我们将 HVAC 模式 `auto` 拆分为 `auto` 和 `heat_cool`。如果是 `heat_cool`，则表示用户设置了一个温度范围，设备需要通过制热和制冷将温度维持在该范围内。自动模式现在仅限于按计划或由 AI 驱动运行的设备。
- 气候实体（entity）的状态现在始终等于 HVAC 模式。
- 为知道当前动作（制热、制冷、空闲）的集成引入了 `hvac_action`。
- `set_away_mode` 和 `set_hold_mode` 已合并为 `set_preset_mode`。因此，我们现在将调用 `set_preset_mode("away")`，而不是 `turn_away_mode_on()`。
- `is_on` 属性已被移除。如果设备能够关闭，它应包含 HVAC 模式 `HVAC_MODE_OFF`。
- 属性名称已统一，任何以"\_list"结尾的属性现在都命名为"\_modes"。

如果您是带有气候平台的集成的维护者，或者维护着带有气候平台的自定义组件，请务必[关注该拉取请求](https://github.com/home-assistant/core/pull/23899)，并在 beta 测试期间测试您的集成，以确保其按预期工作。

<!--truncate-->
