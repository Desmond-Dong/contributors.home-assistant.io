---
title: 长期统计 API 的变更
description: 为了减小响应大小和数据库负载，我们对长期统计相关的 API 进行了一些变更。
date: 2022-11-16
authors:
  - Erik Montnémery
areas:
  - core
---

为了减小响应大小和数据库负载，我们对长期统计相关的 API 进行了一些变更。

这些变更已在[此 PR](https://github.com/home-assistant/core/pull/82131) 中实现。

这会影响调用以下 WS API 的代码作者：
 - `recorder/statistics_during_period`
   - 新增了一个可选参数 `types`，允许提供要在响应中包含的统计特征列表。可能的取值为：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
   - 时间戳 `start`、`end` 和 `last_reset` 现在是自 UNIX 纪元以来的整数毫秒数，而不是 ISO 格式的字符串。新格式意味着这些时间戳可以直接传递给 js 的 `Date()` 构造函数。
   - 返回的映射中不再为每个列表项重复 `statistic_id`。由于返回类型是以 `statistic_id` 为键的映射，因此该字段原本就没有被使用。

这会影响调用以下 Python API 的代码作者：
- `homeassistant.recorder.statistics.get_last_short_term_statistics`
  - 新增了一个参数 `types`，允许提供要在响应中包含的统计特征集合。可能的取值为：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式的字符串。
  - 返回的映射中不再为每个列表项重复 `statistic_id`。由于返回类型是以 `statistic_id` 为键的映射，因此该字段原本就没有被使用。
- `homeassistant.recorder.statistics.get_latest_short_term_statistics`
  - 新增了一个参数 `types`，允许提供要在响应中包含的统计特征集合。可能的取值为：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式的字符串。
  - 返回的映射中不再为每个列表项重复 `statistic_id`。由于返回类型是以 `statistic_id` 为键的映射，因此该字段原本就没有被使用。
- `homeassistant.recorder.statistics.statistics_during_period`
  - 新增了一个参数 `types`，允许提供要在响应中包含的统计特征集合。可能的取值为：`"last_reset"`、`"max"`、`"mean"`、`"min"`、`"state"`、`"sum"`
  - 时间戳 `start`、`end` 和 `last_reset` 现在是 `datetime` 对象，而不是 ISO 格式的字符串。
  - 返回的映射中不再为每个列表项重复 `statistic_id`。由于返回类型是以 `statistic_id` 为键的映射，因此该字段原本就没有被使用。
