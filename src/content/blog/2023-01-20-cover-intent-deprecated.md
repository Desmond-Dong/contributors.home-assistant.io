---
title: Cover 意图已弃用
description: 自 Home Assistant 2023.02 起，意图 HassCoverOpen 和 HassCoverClose 已被弃用。
date: 2023-01-20
authors:
  - Paulus Schoutsen
areas:
  - core
---

自 Home Assistant 2023.02 起，意图（intent）`HassCoverOpen` 和 `HassCoverClose` 已被弃用。请改用意图 `HassTurnOn` 和 `HassTurnOff`。之所以做出这一更改，是因为某些语言不区分 Open/On（打开/开启）和 Close/Off（关闭/关断）。
