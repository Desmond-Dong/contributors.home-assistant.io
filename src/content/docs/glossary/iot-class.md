---
title: "IoT class"
description: "集成（integration）如何获取数据：本地还是云端，轮询还是推送。在 manifest 中设置。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "\"iot_class\" in manifest.json"
  related:
    - "manifest"
    - "polling"
  autolink:
    - "IoT class"
    - "IoT classes"
---

IoT class 告诉用户在设置集成（integration）之前可以对它有什么期望，比如它是否能在没有互联网的情况下继续工作。最常见的几种是 `local_push`、`local_polling`、`cloud_push` 和 `cloud_polling`。
