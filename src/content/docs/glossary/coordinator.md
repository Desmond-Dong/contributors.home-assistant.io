---
title: "协调器（Coordinator）"
description: "一种辅助元素（helper），按计划一次性为多个实体（entity）获取数据，从而只需向设备或 API 请求一次，而不是每个实体各请求一次。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "data update coordinator"
    - "update coordinator"
  code:
    - "DataUpdateCoordinator"
    - "CoordinatorEntity"
  related:
    - "polling"
    - "entity"
    - "unavailable"
  autolink:
    - "data update coordinator"
---

由协调器获取数据的实体会一起更新，即在协调器有新数据时更新。协调器还将错误处理集中在一处：当获取数据失败时，其实体会变为[不可用（unavailable）](/glossary/unavailable/)。
