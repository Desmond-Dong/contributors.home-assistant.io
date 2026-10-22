---
title: Logbook API 移除 `entity_matches_only` 标志
description: 在 2022.6 之前，entity_matches_only 标志可防止日志簿提供上下文数据，以换取查询特定实体时的性能提升。
date: 2022-05-24
authors:
  - J. Nick Koston
areas:
  - core
---

在 2022.6 之前，`entity_matches_only` 标志可防止日志簿（Logbook）提供上下文数据，以换取查询特定实体时的性能提升。在新的日志簿设计中，为特定实体选取上下文数据已不再是高负载的过程。无需立即采取行动，因为该标志将被忽略，您可以随时从任何活跃的代码路径中移除该标志。
