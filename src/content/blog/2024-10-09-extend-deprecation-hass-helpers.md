---
title: 延长 hass.helpers 的弃用期
description: 2024年3月30日，我们宣布将在 Home Assistant 2024.11 版本中弃用 hass.helpers 属性。
date: 2024-10-09
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

2024年3月30日，我们[宣布弃用](/blog/2024/03/30/deprecate-hass-helpers/) Home Assistant 2024.11 版本中的 `hass.helpers` 属性。
由于仍有大量自定义集成（custom integration）在使用它们，加之近期 HACS v2 的更新，我们决定将弃用期再延长六个月。

这意味着从 Home Assistant 2025.5 开始，`hass.helpers` 将被移除。

我们鼓励所有自定义集成的开发者在 Home Assistant 2025.5 发布之前更新其代码，以避免出现任何问题。
