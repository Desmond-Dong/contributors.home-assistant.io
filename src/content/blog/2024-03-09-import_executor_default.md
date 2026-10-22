---
title: 在执行器中导入集成以避免阻塞事件循环
description: 从 Home Assistant 2024.4 开始，所有集成都将在执行器中导入，以避免在导入和执行代码时阻塞事件循环。
date: 2024-03-09
authors:
  - J. Nick Koston
areas:
  - core
---

从 Home Assistant 2024.4 开始，所有集成（integration）都将在执行器（executor）中导入，以避免在导入和执行代码时阻塞事件循环（event loop）。

在极少数情况下，如果某个集成在导入时创建了与循环绑定的对象，则此过程可能会失败，因为执行器中没有正在运行的循环。

需要更多时间来调整代码以避免创建此类对象的自定义集成，可以选择退出，继续让代码在事件循环中导入，但需理解系统稳定性将因此受到影响。

若要选择退出在执行器中导入，集成可以在其 [`manifest.json`](/core/integrations/manifest/) 中添加：

`"import_executor": false`
