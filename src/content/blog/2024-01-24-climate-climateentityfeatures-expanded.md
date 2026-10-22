---
title: Climate 实体中的新实体功能
description: "从 Home Assistant Core 2024.2 开始，我们在 ClimateEntityFeature 中新增了两个标志："
date: 2024-01-24
authors:
  - G Johansson
areas:
  - core
---

从 Home Assistant Core 2024.2 开始，我们在 `ClimateEntityFeature` 中新增了两个标志：`TURN_ON`、`TURN_OFF`。

实现了 `turn_on` 服务（service）调用的集成（integration）需要设置 `TURN_ON` 功能标志。
实现了 `turn_off` 服务调用的集成需要设置 `TURN_OFF` 功能标志。

将有一个为期 10 个月的弃用期（2025.1），在此期间 `ClimateEntity` 会代替实现了相应方法的集成设置这些标志；而从 2025.1 开始，如果实体功能（entity features）没有相应地设置，集成将无法使用相应的方法。

在没有设置相应功能标志的情况下实现这些方法，将产生一条警告日志，引导用户为该集成创建 issue。

一旦集成已迁移为使用或不使用新的功能标志，就应在 `ClimateEntity` 子类实例中将属性 `_enable_turn_on_off_backwards_compatibility` 设置为 `False`。
这将在弃用期内停止自动设置新的功能标志，并且可以在弃用结束后将其移除。
