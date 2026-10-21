---
title: Android 插桩测试（instrumentation tests）
description: 在真实的 Android 运行时上测试 Android 应用，覆盖每个受支持 API 级别的模拟器。
sidebarLabel: 插桩测试
sidebarGroup: Test
order: 3
---

单元测试运行在你的 JVM 上。而用户是在 Android 上运行应用的，Android 拥有[自己的运行时](https://source.android.com/docs/core/runtime)，并且在较旧版本上仅支持部分 [Java 语言特性和 API](https://developer.android.com/studio/write/java8-support)。插桩测试（instrumentation tests）弥补了这一差距：它们运行在模拟器上，与用户使用的是相同的运行时。

先编写单元测试。当行为依赖于真实的 Android 系统时，再使用插桩测试。

## 为什么它们很重要

有些 bug 只会在特定 Android 版本的运行时上出现。[Jackson](https://github.com/FasterXML/jackson) 库就是一个真实的例子：从 2.14 版本开始它需要 API 26，但在应用运行在较旧的设备上之前，什么都不会报错。只有插桩测试，或者用户的崩溃报告，才能发现这类问题。请参阅[这个 pull request](https://github.com/home-assistant/android/pull/5108) 了解事情的经过。

## 它们覆盖什么

- **界面（screens）**，使用 [Espresso](https://developer.android.com/training/testing/espresso) 和 Compose UI 测试，检查用户与界面交互时界面的表现。
- **无 UI 的代码**，例如[前台服务（foreground services）](https://developer.android.com/develop/background-work/services/fgs)，你可以检查数据以及与系统的交互。

这些测试中的大多数不应依赖于 Home Assistant 服务器。请用假实现（fakes）或来自 [MockK](https://mockk.io/) 的模拟（mocks）来替代服务器。假实现是更好的选择：它们让你对行为有更多控制。针对真实服务器的测试是[端到端测试（end-to-end tests）](/companion/android/e2e-testing/)的职责。

## 它们在哪里运行

在每个 pull request 中，`:app` 的插桩测试会在 [Emulator.wtf](https://emulator.wtf) 上运行，覆盖从 `androidSdk-min` 到 `androidSdk-target` 的每个 API 级别。整个运行只需几秒钟。请参阅[持续集成](/companion/android/ci/#instrumentation-tests)了解在 fork 中如何运作。

`:wear`、`:automotive`、`:common` 和 `:microwakeword` 的测试在 GitHub Actions 上的常规 Android 模拟器中运行，因为 Emulator.wtf 不提供这些目标。这会更慢，因此它们覆盖的 API 级别更少。

## 不稳定的模拟器

Android 模拟器有时会毫无缘由地失败。解决办法是重新运行该任务（job）。只有维护者才能重新运行任务，所以如果你认为这只是偶然失败，请在 pull request 中说明。
