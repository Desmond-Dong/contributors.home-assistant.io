---
title: MQTT 发布 API 变更
description: 未来，MQTT 发布 API 将要求为 qos 和 retain 提供显式值。
date: 2026-05-11
authors:
  - Jan Bouwhuis
areas:
  - core
---

未来，MQTT 发布 API 将要求为 `qos` 和 `retain` 提供显式值。不再支持为这两个参数传递 `None`。
自定义集成应更新其代码以接受默认值，或传递有效的类型化参数。
将 `None` 回退为 `qos` 和 `retain` 有效值的机制将在 HA Core 2027.6 中停止工作。

新的 API 签名如下：

```python
def publish(
    hass: HomeAssistant,
    topic: str,
    payload: PublishPayloadType,
    qos: int = 0,
    retain: bool = False,
    encoding: str | None = DEFAULT_ENCODING,
) -> None:
    """Publish message to a MQTT topic."""
    hass.create_task(async_publish(hass, topic, payload, qos, retain, encoding))
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
) -> None:
    """Publish message to a MQTT topic."""
```
