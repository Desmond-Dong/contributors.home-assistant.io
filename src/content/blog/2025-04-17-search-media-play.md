---
title: 在媒体播放器中搜索
description: 媒体播放器现在可以通过添加 MediaEntityFeature.SEARCH_MEDIA 并实现 async_search_media，允许用户搜索媒体内容。
date: 2025-04-17
authors:
  - Josef Zweck
areas:
  - core
---

媒体播放器现在可以通过添加 `MediaEntityFeature.SEARCH_MEDIA` 并实现 `async_search_media`，允许用户搜索媒体内容。用户可以通过搜索查询以及返回结果应具备的 `MediaClasses` 列表来筛选搜索结果。更多信息请参阅[更新后的文档](/core/entities/media-player/#searching-media)。
