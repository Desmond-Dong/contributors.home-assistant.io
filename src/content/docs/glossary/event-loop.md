---
title: "事件循环（event loop）"
description: "运行 Home Assistant Core 的 asyncio 循环。阻塞它的代码，比如在没有 `await` 的情况下等待网络，会让其他所有任务都停止。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "asyncio"
    - "executor"
  code:
    - "async_"
    - "hass.async_add_executor_job"
  related:
    - "core"
    - "hass"
  autolink:
    - "event loop"
---

以 `async_` 开头的函数在事件循环（event loop）中运行，绝不能阻塞。只能阻塞运行的代码，比如不支持异步的库，则通过 `hass.async_add_executor_job` 在执行器（executor）线程中运行。
