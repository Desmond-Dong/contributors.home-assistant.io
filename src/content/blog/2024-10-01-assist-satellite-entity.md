---
title: 介绍 Assist 卫星实体
description: 用户通常使用远程语音卫星与 Assist 交互，例如运行 ESPHome 的 ESP32-S3-BOX-3、运行 VoIP 的模拟电话等。
date: 2024-10-01
authors:
  - Michael Hansen
areas:
  - core
---

用户通常使用远程语音卫星（voice satellite）与 [Assist](https://www.home-assistant.io/voice_control/) 交互，例如运行 ESPHome 的 [ESP32-S3-BOX-3](https://www.home-assistant.io/voice_control/s3_box_voice_assistant/)、运行 VoIP 的[模拟电话](https://www.home-assistant.io/voice_control/worlds-most-private-voice-assistant/)等等。管理这些卫星的集成（integration）过去使用临时的 `binary_sensor` 和 `select` 实体（entity），让用户能够配置卫星的[流水线](/core/internals/assist-pipelines/)（pipeline）、基于流水线状态进行自动化（automation）等等。

新增的 [`AssistSatelliteEntity`](/core/entities/assist-satellite/) 提供了一个表示语音卫星的实体。其状态跟随底层的 Assist 流水线，便于进行自动化。此外：

* 新增了[播报动作](https://home-assistant.io/integrations/assist_satellite#action-assist_satelliteannounce)（announce action），可用于在支持的设备（device）上进行播报。
* 还提供了若干 [websocket 命令](/core/entities/assist-satellite/)，为获取和设置设备上激活的唤醒词（wake word）提供了统一的方式。

`esphome` 和 `voip` 集成已迁移为使用 `AssistSatelliteEntity`，`wyoming` 集成也将紧随其后。
