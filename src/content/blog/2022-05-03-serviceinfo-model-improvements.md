---
title: ServiceInfo 模型改进与弃用
description: 自 Home Assistant Core 2022.6 起，通过先前已弃用的字典方法访问发现信息的方式已被移除。
date: 2022-05-03
authors:
  - epenet
areas:
  - core
---

自 Home Assistant Core 2022.6 起，通过先前已弃用的字典方法访问发现信息的方式已被移除。


这适用于 `DhcpServiceInfo`、`MqttServiceInfo`、`SsdpServiceInfo`、`UsbServiceInfo` 和 `ZeroconfServiceInfo` 实例。

自定义集成（integration）需要迁移以使用新的 dataclass 属性。
