---
title: 迁移至 Pydantic v2
description: Pydantic 是 Python 中广泛使用的数据验证库。2023 年 6 月 30 日，Pydantic v2 正式发布，带来了许多重大变化，这些变化与 Pydantic v1 不向后兼容。
date: 2024-12-21
authors:
  - Joost Lekkerkerker
areas:
  - core
---

Pydantic 是 Python 中广泛使用的数据验证库。2023 年 6 月 30 日，Pydantic v2 正式发布，带来了许多重大变化，这些变化与 Pydantic v1 不向后兼容。

从 Home Assistant Core 2025.1 开始，Pydantic v2 将取代 v1。如果您的自定义集成（custom integration）使用了 Pydantic，则必须进行更新以支持 Pydantic v2，才能在即将发布的版本中继续正常工作。

在过去的一年里，我们的社区付出了大量努力，确保 Home Assistant Core 所使用的库能够同时兼容 Pydantic v1 和 v2。这种双重兼容性帮助我们的 Pydantic v2 迁移过程尽可能顺利。

如需快速迁移，您可以使用 Pydantic v2 中内置的 Pydantic v1 shim（兼容垫片）。有关在 v1/v2 环境中使用这些 shim 的详细信息，请参阅 [Pydantic 迁移指南](https://docs.pydantic.dev/latest/migration/#using-pydantic-v1-features-in-a-v1v2-environment)。
