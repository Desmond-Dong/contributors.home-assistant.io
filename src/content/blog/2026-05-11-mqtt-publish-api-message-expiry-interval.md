---
title: MQTT 发布 API 支持消息过期间隔
description: MQTT 发布 API 现在支持设置消息过期间隔。此前，保留消息由消息代理存储，直到被替换或显式清除。
date: 2026-05-11
authors:
  - Jan Bouwhuis
areas:
  - core
---

MQTT 发布 API 现在支持设置消息过期间隔。
此前，保留消息由消息代理存储，直到被替换或显式清除。设置 `message_expiry_interval`（以秒为单位）后，发布的消息（包括保留消息）将在指定间隔后自动过期。
此选项仅在使用 MQTT 协议版本 5 时受支持；在使用早期协议版本时将被忽略。

新的 API 签名为：

```python
def publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
    *,
    message_expiry_interval: int | None = None,
) -> None:
    """Publish message to a MQTT topic."""
```

和

```python
async def async_publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
    *,
    message_expiry_interval: int | None = None,
) -> None:
    """Publish message to a MQTT topic."""
```
