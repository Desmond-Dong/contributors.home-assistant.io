---
title: 服务调用 API 变更
description: "此变更影响服务调用 API：hass.services.async_call 和 hass.services.call。"
date: 2023-06-14
authors:
  - Allen Porter
areas:
  - core
---

此变更影响服务调用 API：`hass.services.async_call` 和 `hass.services.call`。

在 Home Assistant Core 2023.7 中，服务调用（service call）的一些输入参数和返回值已发生变更，以便为更好地支持[服务返回值](https://github.com/home-assistant/architecture/discussions/777#discussioncomment-6127898)做准备。

之前，成功时返回值为 `True`，发生超时时返回 `False`。用于设置超时的 `limit` 参数已被移除，布尔返回值也已被移除。希望使用超时的调用者现在应使用 asyncio 自行设置。
