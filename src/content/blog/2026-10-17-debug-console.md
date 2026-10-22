---
title: "Home Assistant 内的 Python 控制台"
description: "全新的调试控制台可在运行中的 Home Assistant 内执行 Python，并随时调用 hass。了解如何启用它以及它的功能。"
date: 2026-10-17
authors:
  - Franck Nijhof
areas:
  - core
  - frontend
---

调试 Home Assistant 通常意味着添加一行日志、重启，然后再试一次。或者附加一个调试器来四处查看。从 Home Assistant 2026.11 开始，有一种更快的方法来查看运行中实例的内部情况：调试控制台。

它是工具面板中的一个 Python 控制台，非常类似于 Web 浏览器开发者工具中的控制台。你可以在 Home Assistant 内部直接运行代码，随时使用 `hass`，并查看返回的结果。

![工具面板中的调试控制台，展开了区域注册表和代码补全功能](./images/2026-10-debug-console/debug-console.webp)

## 启用

调试控制台默认处于关闭状态，直到你在 YAML 中启用它，每个版本均如此：

```yaml title="configuration.yaml"
debug_console:
```

重启 Home Assistant 后，管理员可以在 **设置** > **工具** > **调试控制台** 下找到它。在开发容器中，`script/setup` 会为你自动添加这一行。

仅限 YAML 配置是有意为之。管理员浏览器中的代码（如自定义卡片）可以执行用户界面能做的任何操作。如果可以从用户界面启用该控制台，此类代码也能启用它，并在不被察觉的情况下运行 Python。

## 它能做什么

```python
hass.states.get("sun.sun")
```

- `await` 可在顶层使用，因此你可以直接调用异步代码。
- 返回的结果是可以展开的对象，就像在浏览器控制台中一样。属性仅在你选择它们时才会运行，因为读取它们可能会产生副作用。
- `print()` 的工作方式类似于 `console.log`：你打印的对象也可以展开。
- 它会在你输入时补全名称、属性、导入和关键字参数，并显示你正在调用的函数的签名。这些操作都不会运行你的代码：补全功能完全是静态读取的。
- 等待中的代码不会阻塞控制台。运行 `await event.wait()` 后，你仍然可以接着运行 `event.set()`。**停止** 会取消仍在运行的代码。
- 变量会按浏览器标签页保留，即使你重新加载页面也是如此。

## 安全保障

在 Home Assistant 内部运行代码功能强大，但这也是一把双刃剑。“将此粘贴到控制台中”是欺骗他人的常见手段，因此：

- 每位管理员在使用控制台前都必须接受警告提示。
- 粘贴功能会被阻止，直到你输入 `allow pasting`，就像在浏览器控制台中一样。
- 所有运行的内容都会写入 Home Assistant 日志，并记录是谁运行的。

## 注意事项

代码在 Home Assistant 的事件循环中运行。阻塞调用（如 `time.sleep()`）会使 Home Assistant 冻结直到其完成，且 **停止** 无法中断它。请使用 `await`，或使用 `await hass.async_add_executor_job(...)` 运行阻塞任务。

该控制台用于开发和调试，而非用于构建功能。你在其中设置的任何内容在重启后都不会保留。

更多信息请阅读[调试控制台文档](https://www.home-assistant.io/integrations/debug_console/)以及[开发环境](/core/development/environment/)页面。
