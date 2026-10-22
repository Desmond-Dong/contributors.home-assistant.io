---
title: 摄像头 API 变更
description: 在 Home Assistant 2024.11 中，我们为大多数摄像头添加了 WebRTC 支持。为了添加对该功能的支持，我们需要重构并改进摄像头实体。
date: 2024-11-26
authors:
  - Robert Resch
areas:
  - core
---

在 Home Assistant `2024.11` 中，我们为大多数摄像头添加了 WebRTC 支持。为了添加对该功能的支持，我们需要重构并改进摄像头实体（camera entity）。
今天我们想宣布，在即将发布的 Home Assistant `2024.12` 版本中，以下方法已被弃用，并将在 Home Assistant `2025.6` 版本中被移除：

- 属性 `frontend_stream_type` 将被移除。从 `2024.11` 开始，Home Assistant 将通过检查摄像头实体是否实现了原生 WebRTC 方法来识别前端流类型（[#130932](https://github.com/home-assistant/core/pull/130932)）。卡片开发者可以使用新的 websocket 命令 `camera/capabilities` 来获取前端流类型。

- 方法 `async_handle_web_rtc_offer` 将被移除。请使用 `async_handle_async_webrtc_offer` 以及异步 WebRTC 信令方式（[#131285](https://github.com/home-assistant/core/pull/131285)）。

- 方法 `async_register_rtsp_to_web_rtc_provider` 已被弃用。请使用 `async_register_webrtc_provider`，它提供了更大的灵活性，并支持异步 WebRTC 信令方式（[#131462](https://github.com/home-assistant/core/pull/131462)）。

有关替代方案的更多信息，请参阅[摄像头实体文档](/core/entities/camera/)。
