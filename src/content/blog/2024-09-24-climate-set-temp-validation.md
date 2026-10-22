---
title: Climate set temperature 的额外验证
description: 自 Home Assistant Core 2024.10 起，我们对传递给 set_temperature 方法的参数添加了进一步的验证。
date: 2024-09-24
authors:
  - G Johansson
areas:
  - core
---

自 Home Assistant Core 2024.10 起，我们对传递给 `set_temperature` 方法的参数添加了进一步的验证。这意味着集成（integration）无需再在自己的方法中实现该验证。

在 2024.10 之前，当实体（entity）未设置 `ClimateEntityFeature.TARGET_TEMPERATURE` 时，仍可以在动作（action）中设置 `temperature` 参数；同样，当实体未设置 `ClimateEntityFeature.TARGET_TEMPERATURE_RANGE` 时，仍可以设置 `target_temp_low`/`target_temp_high` 参数。现在这将不再被允许，并且会抛出 `ServiceValidationError`，告知用户他们在动作调用中使用了不正确的参数。

此外，在设置温度范围时，之前可以将 `target_temp_low` 设置为高于 `target_temp_high` 的值。
这将抛出 `ServiceValidationError`，告知用户高值必须高于低值。
