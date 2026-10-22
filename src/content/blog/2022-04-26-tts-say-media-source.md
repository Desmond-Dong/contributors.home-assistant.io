---
title: 文本转语音（TTS）say 服务将使用媒体源 ID
description: 从 Home Assistant 2022.5 开始，TTS say 服务将把媒体内容 ID 设置为媒体源 URI。
date: 2022-04-26
authors:
  - Paulus Schoutsen
areas:
  - core
---

从 Home Assistant 2022.5 开始，TTS say 服务将把媒体内容 ID（media content ID）设置为媒体源 URI（media source URI）。媒体播放器需要使用媒体源集成（media source integration）在内部解析这些 URI。

以前，TTS 集成会将媒体内容 ID 设置为指向 Home Assistant 的 URL，因此媒体播放器无需做任何额外工作。

媒体播放器需要支持媒体源集成，具体请参阅[此处的文档](/core/entities/media-player/#browsing-media)。
