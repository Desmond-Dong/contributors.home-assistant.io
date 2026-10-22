---
title: 延长 @bind_hass 和 hass.components 的弃用期
description: 2024 年 2 月 27 日，我们宣布在 Home Assistant 2024.9 版本中弃用 @bind_hass 装饰器和 hass.components 属性。
date: 2024-09-11
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

2024 年 2 月 27 日，我们[宣布弃用](/blog/2024/02/27/deprecate-bind-hass-and-hass-components/) `@bind_hass` 装饰器和 `hass.components` 属性，原定于 Home Assistant 2024.9 版本中移除。
由于仍有大量自定义集成（custom integration）在使用它们，加上最近 HACS v2 的更新，我们决定将弃用期再延长六个月。

这意味着从 Home Assistant 2025.3 开始，`@bind_hass` 装饰器和 `hass.components` 将被移除。

我们鼓励所有自定义集成的开发者更新他们的代码，以避免在 Home Assistant 2025.3 版本发布之前出现任何问题。
