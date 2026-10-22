---
title: 解决 pyserial-asyncio 阻塞事件循环的问题
description: 从 2026.7 开始，Home Assistant 将阻止安装 pyserial-asyncio。
date: 2026-01-05
authors:
  - epenet
areas:
  - core
---

### 变更概要

从 `2026.7` 开始，Home Assistant 将阻止安装 `pyserial-asyncio`。

建议库维护者和自定义集成（integration）迁移到 `pyserial-asyncio-fast`。

### 背景

`pyserial-asyncio` 会阻塞事件循环（event loop），因为它执行了阻塞式的 `sleep`。该库也无人维护，因此改进此情况的努力一直未能发布。

`pyserial-asyncio-fast` 是作为直接替代品（drop-in replacement）而创建的（参见[该代码库](https://github.com/home-assistant-libs/pyserial-asyncio-fast)），目前所有核心集成都已完成迁移。

### 迁移

`pyserial-asyncio-fast` 被设计为 `pyserial-asyncio` 的直接替代品，所需的改动非常简单。

#### 依赖要求

```python
# Old
  install_requires=[
    "pyserial-asyncio"
  ]

# New
  install_requires=[
    "pyserial-asyncio-fast"
  ]
```


#### 用法

```python
# Old
import serial_asyncio

async def connect():
    conn = await serial_asyncio.open_serial_connection(**self.serial_settings)

# New
import serial_asyncio_fast

async def connect():
    conn = await serial_asyncio_fast.open_serial_connection(**self.serial_settings)
```

更多示例请参见[跟踪拉取请求（pull request）](https://github.com/home-assistant/core/pull/116635)。
