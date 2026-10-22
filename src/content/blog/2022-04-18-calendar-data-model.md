---
title: 日历数据模型的改进与弃用
description: 自 Home Assistant Core 2022.5 起，CalendarDeviceEntity 已被弃用，并由 CalendarEntity 取代。
date: 2022-04-18
authors:
  - Allen Porter
areas:
  - core
---

自 Home Assistant Core 2022.5 起，`CalendarDeviceEntity` 已被弃用，并由 `CalendarEntity` 取代。新实体（entity）具有更完善定义的数据模型，以及更精简的 websocket API。`CalendarDeviceEntity` 将在未来的 Home Assistant 版本中被移除，自定义组件需要迁移到新的 API。详情请参阅新的[日历实体](/core/entities/calendar/)开发者文档。
