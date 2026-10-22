---
title: LightEntity 不再支持 white_value
description: LightEntity 不再支持 white_value，它已被颜色模式（color mode）white 取代。
date: 2022-08-18
authors:
  - Erik Montnémery
areas:
  - core
---

`LightEntity` 不再支持 `white_value`，它已被
[颜色模式](/core/entities/light/#color-modes) `white` 取代。

### 背景
灯的 `white_value` 在 Home Assistant Core 2021.4 中通过
[PR #47720](https://github.com/home-assistant/core/pull/47720)
被弃用，并在 Home Assistant Core 2021.7 中通过
[PR #51411](https://github.com/home-assistant/core/pull/51411)
被颜色模式 `white` 取代。
