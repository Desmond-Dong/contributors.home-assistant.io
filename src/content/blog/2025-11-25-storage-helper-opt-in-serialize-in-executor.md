---
title: 在工作线程中序列化 Store 数据现需主动启用
description: homeassistant/helpers/storage.py 中的 Store 类接受一个新的构造函数参数 serialize_in_event_loop
date: 2025-11-25
authors:
  - Erik Montnémery
areas:
  - core
---

`homeassistant/helpers/storage.py` 中的 `Store` 类接受一个新的构造函数参数 `serialize_in_event_loop`

如果 `serialize_in_event_loop` 为 `True`（默认值）：
 - 传递给 `Store.async_delay_save` 的 `data_func` 会在事件循环（event loop）中被调用
 - 传递给 `Store.async_delay_save` 的 `data_func` 所产生的数据会在事件循环中序列化为 JSON
 - 传递给 `Store.async_save` 的数据会在事件循环中序列化为 JSON

如果 `serialize_in_event_loop` 为 `False`：
 - 传递给 `Store.async_delay_save` 的 `data_func` 会在单独的线程中被调用，这意味着它必须是线程安全的，并且不得访问 hass 对象
 - 传递给 `Store.async_delay_save` 的 `data_func` 所产生的数据会在单独的线程中序列化为 JSON，这意味着它必须是线程安全的
 - 传递给 `Store.async_save` 的数据会在单独的线程中序列化为 JSON，这意味着它必须是线程安全的

该行为已发生变化；以前，传递给 `Store.async_delay_save` 的 `data_func` 总是在单独的线程中被调用，而由它产生的数据或传递给 `Store.async_save` 的数据以前也总是在单独的线程中序列化。

做出这一更改的原因在于：文档中并未说明 `data_func` 会由事件循环以外的线程调用，也未说明 JSON 序列化会在事件循环以外的线程中进行，而且 `data_func` 本身以及由它产生的数据或传递给 `Store.async_save` 的数据通常都不是线程安全的。

更多详情，请参阅 [core PR 157158](https://github.com/home-assistant/core/pull/157158) 和 [core PR 157263](https://github.com/home-assistant/core/pull/157263)。
