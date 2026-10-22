---
title: Multi-pan 暂时停用
description: "更新：multi-pan 已修复，从 Home Assistant 2023.2 开始，用户可以再次选择加入实验版本。"
date: 2022-12-08
authors:
  - Paulus Schoutsen
areas:
  - core
---

**更新：** multi-pan 已修复，从 Home Assistant 2023.2 开始，用户可以再次选择加入实验版本。

在 [Home Assistant 2022.12](https://www.home-assistant.io/blog/2022/12/07/release-202212/) 中，我们低调发布了实验性的 multi-pan 功能：允许使用 Home Assistant Yellow 和 Home Assistant SkyConnect 中的单个无线电芯片同时运行 Zigbee 和 Thread。用户需要在硬件菜单中找到它，确认实验性提示并选择加入。

我们刚刚在固件中发现了一个需要修复的严重 bug。因此，我们决定从 Home Assistant 2022.12.1 开始暂时禁止用户选择加入 multi-pan。

这个 bug 的表现是：Zigbee 终端设备（end-device）无法通过协调器（coordinator）重新加入网络：协调器会将其踢出并要求其重新加入，如此反复。正常的 EmberZNet 固件不会出现这种行为。它只影响直接加入协调器的终端设备，而不影响通过中间路由器（router）加入的设备，并且只影响那些尝试重新加入网络的设备。

我们正在与 Silicon Labs 合作，以尽快解决此问题。问题解决后，我们将重新启用 multi-pan。

启用 multi-pan 会在您的无线电芯片上安装一个特殊固件。要禁用 multi-pan，则需要重新安装原始的 Zigbee 固件。目前还无法从 Home Assistant 中自动完成此操作。我们将很快更新这篇文章，提供如何通过浏览器完成此操作的说明。
