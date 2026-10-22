---
title: 2022.10 中 Bluetooth async_track_unavailable API 的变更
description: 在 Home Assistant Core 2022.10 中，我们更改了 async_track_unavailable 蓝牙 API，使其向回调发送最后一个 BluetoothServiceInfoBleak，而不是地址。
date: 2022-09-16
authors:
  - J. Nick Koston
areas:
  - core
---

在 Home Assistant Core 2022.10 中，我们更改了 `async_track_unavailable` 蓝牙 API，使其向回调发送最后一个 `BluetoothServiceInfoBleak`，而不是 `address`。

下面是一个新的用法示例：

```python
from homeassistant.components import bluetooth

def _unavailable_callback(info: bluetooth.BluetoothServiceInfoBleak) -> None:
    _LOGGER.debug("%s is no longer seen", info.address)
   
cancel = bluetooth.async_track_unavailable(hass, _unavailable_callback, "44:44:33:11:23:42", connectable=True)
```
