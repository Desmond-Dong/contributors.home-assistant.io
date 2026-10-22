---
title: 服务调用描述过滤器
description: 服务调用描述已改为支持过滤。可以为服务调用添加过滤器，以不向用户显示不支持该服务调用的实体（entity），也可以为服务调用字段添加过滤器，以不向用户显示所选实体不支持的字段。
date: 2023-06-28
authors:
  - Erik Montnémery
areas:
  - core
---

服务调用描述已改为支持过滤。
可以为服务调用（service call）添加过滤器，以不显示不支持该服务调用的实体（entity），也可以为服务调用字段添加过滤器，以不向用户显示所选实体不支持的字段。

例如：
- `light.turn_on` 的 `brightness` 服务调用参数仅在灯具支持亮度时才会显示。
- `climate.set_aux_heat` 服务调用将只允许选择支持辅助加热的气候（climate）实体。

此功能在 core [PR #86162](https://github.com/home-assistant/core/pull/86162) 中引入，相关文档见[此处](/core/integrations/actions/)。
