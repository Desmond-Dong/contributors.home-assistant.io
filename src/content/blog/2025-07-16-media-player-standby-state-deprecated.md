---
title: 媒体播放器的 STANDBY 状态已被弃用
description: 媒体播放器状态 MediaPlayerState.STANDBY 已根据 home-assistant/architecture#799 的决定被弃用，并将在 Home Assistant Core 2026.8 中移除。
date: 2025-07-16
authors:
  - Erik Montnémery
areas:
  - core
---

媒体播放器状态 `MediaPlayerState.STANDBY` 已根据 [home-assistant/architecture#799](https://github.com/home-assistant/architecture/discussions/799) 的决定被弃用，并将在 Home Assistant Core 2026.8 中移除。
集成（integration）应改用 `MediaPlayerState.IDLE` 或 `MediaPlayerState.OFF`。

更多详情，请参阅[媒体播放器开发者文档](/core/entities/media-player/#states)。
