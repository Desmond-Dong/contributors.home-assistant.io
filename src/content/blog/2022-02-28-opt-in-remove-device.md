---
title: 选择加入手动移除设备的支持
description: 在 Home Assistant Core 2022.3 版本中，Erik Montnemery 添加了支持，使任何集成（integration）都可以选择加入，从而在 Home Assistant 界面的设备（device）页面上显示“删除设备”按钮。
date: 2022-02-28
authors:
  - Martin Hjelmare
areas:
  - core
---

在 Home Assistant Core 2022.3 版本中，[Erik Montnemery](https://github.com/emontnemery) 添加了[支持](https://github.com/home-assistant/core/pull/66188)，使任何集成（integration）都可以选择加入，从而在 Home Assistant 界面的设备（device）页面上显示“删除设备”按钮。

请参阅我们的[开发者文档](/core/integrations/device-registry/#let-users-remove-devices)，了解如何在集成中实现此功能。

到目前为止，已有五个集成选择加入了此功能：

- [Google Cast](https://github.com/home-assistant/core/pull/66808)
- [MQTT](https://github.com/home-assistant/core/pull/66766)
- [MySensors](https://github.com/home-assistant/core/pull/67128)
- [RFXCOM RFXtrx](https://github.com/home-assistant/core/pull/58252)
- [Tasmota](https://github.com/home-assistant/core/pull/66811)

## 为什么需要此功能？

在此功能添加之前，我们建议集成自动从配置条目（config entry）中清理过期的设备。但并非所有集成都能自动判断某个设备是否应该被移除，因此在某些情况下，仍然需要一个让用户自行选择的手动选项。

为了解决这一需求，一些集成实现过特定于集成的 websocket 命令，并配有相应的前端支持，以允许手动移除设备。有了这个新功能，集成不再需要添加任何 websocket 或前端代码，只需实现后端回调函数，即可轻松支持手动移除设备。

太棒了！
