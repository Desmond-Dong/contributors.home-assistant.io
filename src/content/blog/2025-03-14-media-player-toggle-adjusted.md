---
title: 媒体播放器切换操作已变更
description: 媒体播放器基类中切换（toggle）操作服务的实现已进行了调整。
date: 2025-03-14
authors:
  - Erik Montnémery
areas:
  - core
---

媒体播放器（media player）基类中切换（toggle）操作服务的实现已进行了调整。
现在，如果媒体播放器处于 `off` 或 `standby` 状态，则会被打开；在所有其他状态下，则会被关闭。

在此变更之前，如果媒体播放器处于 `idle` 状态，也会被打开。这不符合 `idle` 状态的含义，因为该状态被归类为[设备已经打开的状态之一](/core/entities/media-player/#states)。

重写了 `async_toggle` 的自定义集成（custom integration）可能需要更新其实现。

此变更已在 [home assistant core PR #78192](https://github.com/home-assistant/core/pull/78192) 中引入。
