---
title: "BrowseMediaSource：domain 现为必填项"
description: media_source 集成中的 BrowseMediaSource 类已进行严格化调整。
date: 2026-05-20
authors:
  - Paulus Schoutsen
areas:
  - core
---

`media_source` 集成中的 `BrowseMediaSource` 类已进行严格化调整。`domain` 参数现在是必填的 `str` 类型，而不再是 `str | None`，并且特殊的“列出所有媒体源”根节点已移至其专属类 `RootBrowseMediaSource` 中。

以前，`domain` 是可选的，仅仅是为了表示一种边缘情况：在未选择特定源的情况下浏览 `media-source://` 时返回的顶级节点。这使得类型提示在 99% 的情况下具有误导性——每个实际的媒体源都有一个 domain——并增加了一个 `None` 分支，使用者必须对此进行处理。将根节点拆分为独立的类可以消除该分支。

## 变更内容

- `BrowseMediaSource.__init__` 现在需要 `domain: str`。
- 新增的 `RootBrowseMediaSource` 类表示列出所有可用媒体源的根浏览节点。它硬编码了 `domain=None` 和 `identifier=None`，并使用 `media-source://` 作为其内容 ID。
- `media_source.async_browse_media()` 和 `MediaSourceItem.async_browse()` 现在返回 `BrowseMediaSource | RootBrowseMediaSource`。

## 对自定义集成的影响

大多数集成不需要进行任何更改。如果您实现了 `media_source.py` 平台，您之前就已经将自己的 `domain` 传递给 `BrowseMediaSource` —— 这仍然有效。

您仅在以下情况下需要采取行动：

- **您将 `domain=None` 传递给 `BrowseMediaSource`。** 现在不再允许这样做。请改为设置您的集成 domain。
- **您调用 `media_source.async_browse_media()` 并对结果进行类型注解。** 请将类型提示更新为 `BrowseMediaSource | RootBrowseMediaSource`，或者在使用特定于 domain 的属性之前使用 `isinstance()` 进行类型收窄：

  ```python
  from homeassistant.components.media_source import (
      BrowseMediaSource,
      async_browse_media,
  )

  result = await async_browse_media(hass, media_content_id)
  if isinstance(result, BrowseMediaSource):
      # result.domain is guaranteed to be a str here
      ...
  ```

请参阅更新后的[媒体源平台文档](/core/integrations/media-source/)以获取完整参考。
