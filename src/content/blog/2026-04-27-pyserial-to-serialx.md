---
title: "认真对待串口通信：从 pyserial 迁移到 serialx"
description: 现有的通过串口通信的集成（integration）和库应从 pyserial、pyserial-asyncio 和 pyserial-asyncio-fast 迁移到 serialx。
date: 2026-04-27
authors:
  - Nikita Nikishin
areas:
  - core
---

现有的通过串口通信的集成（integration）和库应从 `pyserial`、`pyserial-asyncio` 和 `pyserial-asyncio-fast` 迁移到 [`serialx`](https://github.com/puddly/serialx)。这个新库在所有平台上都具备原生的 asyncio 支持，将使你的集成和库能够利用 Home Assistant 中的 [ESPHome 串口代理](https://esphome.io/components/serial_proxy/)，并包含针对 asyncio 事件循环稳定性的关键修复。

## 背景

多年来，`pyserial` 一直是 Python 中事实上的串口库，并广泛支持所有主流平台。然而，它的 API 早于 Python 中的 asyncio，且仅支持同步。最终发布了 `pyserial-asyncio` 包以将 `pyserial` 与 asyncio 桥接。遗憾的是，`pyserial-asyncio` 的开发从未达到 1.0 稳定版或跨平台支持，并且 `pyserial` 和 `pyserial-asyncio` 在近五年内都没有在 PyPI 上发布过新版本。我们 fork 了 `pyserial-asyncio` 并发布了 [`pyserial-asyncio-fast`](/blog/2026/01/05/pyserial-asyncio-fast/)，以修复影响核心（Core）事件循环稳定性的遗留问题。

我们从零开始开发了 `serialx`，作为一个具有原生同步和异步 API 的现代 Python 串口库。它与 `serial`、`serial_asyncio` 和 `serial_asyncio_fast` 模块在导入时兼容，允许现有包在极少甚至无需更改的情况下进行迁移。

## 迁移

`serialx` 文档中提供了[详细的迁移指南](https://puddly.github.io/serialx/how-to/pyserial-migration.html)，其中介绍了更多细节。

大多数包只需在其 `setup.py` 或 `pyproject.toml` 文件中将 `pyserial`、`pyserial-asyncio` 和 `pyserial-asyncio-fast` 替换为 `serialx`，并更新异常处理，将宽泛的 `SerialException` 捕获替换为更细粒度的错误处理（例如 `OSError` 和 `TimeoutError`）。

直接构建同步 `serial.Serial()` 对象的包应迁移为使用 `serialx.serial_for_url()` 辅助函数（helper），以确保与所有受支持的协议自动兼容。

### 提供给智能体的提示词

迁移本身是机械性的，请将以下说明粘贴到你选择的智能体中：

> 使用
> https://raw.githubusercontent.com/puddly/serialx/refs/heads/dev/docs/how-to/pyserial-migration.md
> 将我的代码从 pyserial、pyserial-asyncio 和 pyserial-asyncio-fast 迁移到 serialx
