---
title: 媒体源现在支持搜索
description: 媒体源现在可以实现搜索功能。通过在您的 MediaSource 中添加 async_search_media 方法，用户可以直接从媒体浏览器搜索您的媒体。
date: 2026-07-03
authors:
  - Josef Zweck
areas:
  - core
---

媒体源现在可以实现搜索功能。通过在您的 `MediaSource` 中添加 `async_search_media` 方法，用户可以直接从媒体浏览器搜索您的媒体。

```python
from homeassistant.components.media_player import SearchMedia, SearchMediaQuery

async def async_search_media(
    self, item: MediaSourceItem, query: SearchMediaQuery
) -> SearchMedia:
    """Search media."""
    results = [...]  # list of BrowseMediaSource items
    return SearchMedia(result=results)
```

要告知媒体浏览器哪些项目可以被搜索，请在浏览时返回的 `BrowseMediaSource` 项目（通常是目录）上将 `can_search` 标志设置为 `True`。其他集成可以通过新的 `media_source.async_search_media` 辅助元素触发搜索。

更多信息，请参阅[更新后的文档。](/core/integrations/media-source/)
