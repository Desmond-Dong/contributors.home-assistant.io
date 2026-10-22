---
title: 已从 WebSocket get_services 和 REST /api/services 中移除服务翻译
description: strings.json 中定义的动作（action）翻译不再包含在 WebSocket get_services 命令和 REST /api/services 端点的响应中，因为这些翻译并不完整，且 Home Assistant 前端也未使用它们。
date: 2025-10-24
authors:
  - Erik Montnémery
areas:
  - core
---

定义在 `strings.json` 中的动作（action）翻译不再包含在 WebSocket `get_services` 命令和 REST `/api/services` 端点的响应中，因为这些翻译并不完整，且 Home Assistant 前端也没有使用它们。

来自 `services.yaml` 的旧版未翻译动作名称和描述仍会保留在 WebSocket 和 REST 的响应中。

可通过 WebSocket 命令 `frontend/get_translations` 获取完整的动作翻译。

详情请参阅 [core PR 147120](https://github.com/home-assistant/core/pull/147120)。
