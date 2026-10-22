---
title: EntityDescription 数据类的变更
description: EntityDescription 类已发生变更；派生的 dataclasses 现在应设置 frozen=True 和 kw_only=True。
date: 2023-12-11
authors:
  - Erik Montnémery
areas:
  - core
---

`EntityDescription` 类已发生变更；派生的 `dataclasses` 现在应设置 `frozen=True` 和 `kw_only=True`。

将 `frozen` 设置为 `True` 会使 `EntityDescription` 实例不可变（immutable），这意味着它们在创建后不会被意外更新。
将 `kw_only` 设置为 `True` 可确保基类中的字段顺序可以更改，而不会影响用户。

在弃用期（deprecation period）内（该期限将于 HA Core 2025.1 结束），仍然可以派生未设置 `frozen=True` 或 `kw_only=True` 的 `dataclasses`，但这会被记录到日志中，并且会要求用户向自定义集成（custom integration）提交 issue。

HA Core 2025.1 发布后，将无法再派生未设置 `frozen=True` 或 `kw_only=True` 的 `dataclasses`。

更多详情请参阅 [core PR #105211](https://github.com/home-assistant/core/pull/105211)。
