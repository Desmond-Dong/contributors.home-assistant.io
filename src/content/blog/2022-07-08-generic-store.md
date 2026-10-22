---
title: Store 现在是一个泛型类
description: 自 Home Assistant Core 2022.8 起，Store（来自 homeassistant/helpers/storage.py）被定义为泛型 Store(Generic[_T])。
date: 2022-07-08
authors:
  - epenet
areas:
  - core
---

从 Home Assistant Core 2022.8 开始，Store（来自 `homeassistant/helpers/storage.py`）被定义为泛型 `Store(Generic[_T])`。建议在 Store 的定义中声明所存储数据的类型。该类型应当是可 JSON 序列化的（dict 或 list），例如：
  - 使用 dict 的标准定义：`self._store = Store[dict[str, int]](hass, STORAGE_VERSION, STORAGE_KEY)`
  - 使用 TypedDict：`self._store = Store[EnergyPreferences](hass, STORAGE_VERSION, STORAGE_KEY)`
  - 访问现有的 Store：`store: Store[dict[str, Any]] = hass.data[DOMAIN][DATA_STORE]`
  - 继承的 Store：`class MyCustomStorage(Store[list[int]]):`

有关泛型（generics）的更多信息，请参阅 [PEP 483](https://peps.python.org/pep-0483/#generic-types)
