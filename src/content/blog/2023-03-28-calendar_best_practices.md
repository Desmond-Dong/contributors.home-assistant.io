---
title: 日历最佳实践
description: Home Assistant 改进了日历实体（entity）的最佳实践，以确保日历触发器/自动化和用户界面在所有情况下都能正常工作。
date: 2023-03-28
authors:
  - Allen Porter
areas:
  - core
---

Home Assistant 已改进了日历实体（entity）的最佳实践，以确保日历触发器/自动化和用户界面（UI）在所有情况下都能正常工作。

特别是，现在有更多已文档化的预期行为，并对不变量（invariant）进行强制执行，包括：
- `CalendarEvent` 的 `end` 属性是排他的（exclusive）。例如，持续一天的全天事件，其结束日期应为开始日期之后 1 天。
- `CalendarEvent` 可以接受任何时区的 `datetime`。不允许使用没有时区的浮动日期（floating date）。
- `CalendarEvent` 的不变量现在在创建时会被强制执行。
- `async_get_events` 返回的事件应按顺序返回。
- `async_get_events` 返回的全天事件必须在 Home Assistant 的本地时区中进行计算。也就是说，全天事件的排序应视其为在本地时间午夜开始。

[日历实体（Calendar Entity）开发人员文档](/core/entities/calendar/) 已更新，增加了更多详细信息。
