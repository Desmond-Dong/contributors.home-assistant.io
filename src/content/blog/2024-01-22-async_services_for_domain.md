---
title: 枚举服务
description: 在 Home Assistant 2024.2 中，我们将引入 hass.services.async_services_for_domain()，这是一种按域枚举服务的新方式，允许集成查看哪些服务可用，而无需获取系统中的所有服务。
date: 2024-01-22
authors:
  - J. Nick Koston
areas:
  - core
---

在 Home Assistant 2024.2 中，我们将引入 `hass.services.async_services_for_domain()`，这是一种按域（domain）枚举服务的新方式，允许集成查看哪些服务可用，而无需获取系统中的所有服务。我们发现，大多数集成只关注它们自己提供的服务，而当集成只关心自己的服务时，枚举系统中的所有服务开销很大。

调用 `hass.services.async_services()[DOMAIN]` 来获取特定域服务的集成，应将该调用替换为 `hass.services.async_services_for_domain(DOMAIN)`。
