---
title: 本地 OAuth2 更新
description: 自 Home Assistant Core 2022.5 起，注册 config_entry_oauth2_flow.LocalOAuth2Implementation 的集成（integration）必须在清单中依赖 auth 组件。
date: 2022-04-16
authors:
  - Allen Porter
areas:
  - core
---

自 Home Assistant Core 2022.5 起，注册 `config_entry_oauth2_flow.LocalOAuth2Implementation` 的集成必须对 `auth` 组件具有[清单依赖](/core/integrations/manifest/#dependencies-and-requirements)。

此举源于一项更广泛的改进工作，即改进 OAuth [应用凭据（Application Credentials）](https://github.com/home-assistant/architecture/discussions/692#discussioncomment-2121633)的处理方式，这需要更改 OAuth 回调所用 HTTP 端点的注册方式。
