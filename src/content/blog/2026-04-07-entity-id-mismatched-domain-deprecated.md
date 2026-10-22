---
title: 域不匹配的实体 ID 已弃用
description: 直接在实体上设置 entity_id 的集成现在将进行验证，以确保其域部分与平台的域相匹配。
date: 2026-04-07
authors:
  - Artur Pragacz
areas:
  - core
---

直接在实体（entity）上设置 `entity_id` 的集成（integration）现在将进行验证，
以确保其域部分与平台的域相匹配。例如，
`light` 实体必须使用 `light.my_light`，而不是 `cover.my_light`。

设置域错误的实体 ID 将记录一条弃用警告，
并且**将在 Home Assistant 2027.5 中停止工作**。

在大多数情况下，集成根本不应设置 `entity_id` —— Home Assistant
会自动生成它。
