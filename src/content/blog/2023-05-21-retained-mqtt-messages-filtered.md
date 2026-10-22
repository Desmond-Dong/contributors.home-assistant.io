---
title: 近期 MQTT 改动以提升整体性能
description: Home Assistant 的 MQTT 集成处理 MQTT 消息的方式以及执行订阅（subscribe）和取消订阅（unsubscribe）的方式已经发生了变化。
date: 2023-05-21
authors:
  - Jan Bouwhuis
areas:
  - core
---

Home Assistant 的 MQTT 集成处理 MQTT 消息的方式以及执行订阅（subscribe）和取消订阅（unsubscribe）的方式已经发生了变化。

### MQTT 订阅和取消订阅的执行方式已更新

订阅和取消订阅不再立即发送到 broker。新增了防抖（debouncer）代码，它将延迟向 broker 发送订阅请求，并在防抖时间内有更多订阅加入时将它们捆绑在一起。在实际执行（取消）订阅时，（取消）订阅会被捆绑为对 broker 的一次调用。这些更改将加快 MQTT 集成以及注册了大量 MQTT 实体（entity）的集成的启动速度，尤其是在订阅了共享主题（topic）时（例如用于发布可用性）。在 MQTT 调试日志中，`mid` 编号显示了哪些（取消）订阅调用被捆绑为对 MQTT broker 的一次调用。

### 保留消息（retained messages）的处理方式已发生变化

带有 `retain` 标志的 MQTT 消息的处理方式已经改变：当新的订阅者订阅同一主题时，broker 重新发送的保留消息不再传递给现有订阅者，而是仅传递给新的订阅者。

新行为避免了向订阅者一遍又一遍地重复发送相同的保留消息，并且与 MQTT 规范更加一致，请参阅 OASIS MQTT Version 3.1.1 规范（[关于 RETAIN 标志的使用方式](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc385349265)）以及规范性声明编号 [MQTT-3.3.1-9](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html#_Toc398718134)。
