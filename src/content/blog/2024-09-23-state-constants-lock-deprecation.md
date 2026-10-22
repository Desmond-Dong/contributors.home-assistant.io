---
title: 弃用锁的状态常量
description: 自 Home Assistant Core 2024.10 起，LockEntity 中用于返回状态的常量已被弃用，并由 LockState 枚举取代。
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.10 起，`LockEntity` 中用于返回状态（state）的常量已被弃用，并由 `LockState` 枚举（enum）取代。

弃用期为一年，这些常量将从 2025.10 起停止工作，以确保所有自定义集成（custom integration）作者都有时间进行调整。

由于 `state` 属性本不应被重写，因此在大多数情况下，此更改只会影响其他 Entity 属性或测试，而不会影响 `state` 属性。
