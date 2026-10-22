---
title: "媒体播放器更新：enqueue 变更，新增 announce"
description: 从 Home Assistant 2022.6 开始，媒体播放器集成（media player integration）的 media_player.play_media 服务迎来了两项更新。
date: 2022-05-31
authors:
  - Paulus Schoutsen
areas:
  - core
---

从 Home Assistant 2022.6 开始，媒体播放器集成（media player integration）的 `media_player.play_media` 服务迎来了两项更新。在 [PR #72406](https://github.com/home-assistant/core/pull/72406) 中，`enqueue` 属性已更改为字符串，并且在 [PR #72566](https://github.com/home-assistant/core/pull/72566) 中新增了 `announce` 布尔属性。

更多信息请参阅更新后的 [媒体播放器 play_media 文档](/core/entities/media-player/#playing-media)。
