---
title: "轮询（Polling）"
description: "按固定时间间隔向设备或服务请求新数据。与之相反的是推送（push），即设备在发生变化时主动发送更新。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "poll"
    - "push"
  code:
    - "should_poll"
    - "SCAN_INTERVAL"
    - "update_interval"
  related:
    - "coordinator"
    - "iot-class"
  autolink:
    - "polling"
---

推送（push）速度更快，并且对设备和网络的负载更小，因此在设备支持时集成会优先使用它。否则，将由[协调器（coordinator）](/glossary/coordinator/)按固定间隔进行轮询。
