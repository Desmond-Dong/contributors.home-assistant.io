---
title: 已移除 MQTT 订阅的已弃用回调签名
description: Home Assistant 的 MQTT 集成不再支持用于 MQTT 订阅的已弃用回调签名。
date: 2023-02-21
authors:
  - Jan Bouwhuis
areas:
  - core
---

Home Assistant 的 MQTT 集成（integration）[不再支持](https://github.com/home-assistant/core/pull/88543)用于 MQTT 订阅的已弃用回调签名。

仍在 MQTT 订阅的回调函数中使用已弃用回调签名的自定义集成（custom integration），如果不进行更新将无法正常工作。如果检测到不受支持的回调类型，将会引发异常。

以下是不再能正常工作的已弃用回调函数示例：

```python
async def async_deprecated_callback1(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 1."""
    ...


@callback
def async_deprecated_callback2(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 2."""
    ...
```

正确回调签名的示例：

```python
@callback
def async_correct_callback(msg: ReceiveMessage) -> None:
    """Callback example 1."""
    ...
```
