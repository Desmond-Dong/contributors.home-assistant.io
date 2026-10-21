---
title: Android
description: 适用于 Android、Wear OS、Android Auto 和 Android Automotive 的 Home Assistant 应用。仓库里有什么，以及从哪里开始。
order: 2
sidebarGroups:
  - Set up
  - Architecture
  - Write code
  - Test
  - Ship
---

Android 应用始于 2019 年，如今已有数百万人使用。它的核心是一个显示 Home Assistant 前端的 web view。围绕它的是各种原生功能：从手机上报的传感器、通知、小组件、磁贴、NFC 标签、Assist、Wear OS 应用，以及用于 Android Auto 和 Android Automotive 的车机屏幕。

该项目完全使用 Kotlin 编写。新的 UI 使用 Jetpack Compose。你仍会找到早于现行规范的老代码，例如 XML 布局和 view binding。这些代码会随时间逐步迁移，这里的页面描述的是新代码应有的样子。

## 仓库

所有内容都在 [home-assistant/android](https://github.com/home-assistant/android) 中。它是一个包含多个模块的 Gradle 项目：

| 模块 | 说明 |
| --- | --- |
| `:app` | 手机和平板应用 |
| `:automotive` | Android Automotive 应用。复用 `:app` 的源代码 |
| `:wear` | Wear OS 应用 |
| `:common` | 所有应用共享的代码：数据层、传感器、WebSocket 和 REST 客户端、设计系统，以及所有字符串 |
| `:testing-unit` | 各模块单元测试共享的辅助工具 |
| `:lint` | 项目的自定义 lint 规则 |
| `:microwakeword` | 设备端唤醒词检测 |
| `:provides-sensor-processor` | 用于传感器注册的代码生成器 |
| `build-logic` | 以相同方式配置每个模块的约定插件 |

最低和目标 SDK 版本位于 `gradle/libs.versions.toml` 中的 `androidSdk-*` 键下。

## 环境搭建

- [入门](/companion/android/get-started/)：安装 Android Studio、构建应用并运行它。
- [推送通知](/companion/android/push-notifications/)：如果你从事通知相关工作，请设置你自己的 Firebase 项目。

## 架构

- [架构](/companion/android/architecture/)：原则、技术栈，以及各模块如何组合在一起。
- [UI 架构](/companion/android/ui-architecture/)：一个屏幕是如何构建的，从视图到仓库层。
- [前端屏幕](/companion/android/frontend-screen/)：承载 web view 的屏幕，也是 UI 架构的参考实现。
- [变体与目标](/companion/android/flavors-and-targets/)：`full` 和 `minimal`，以及手机、车机、手表和电视构建。

## 编写代码

- [Compose 与设计系统](/companion/android/compose/)：使用 `HATheme` 和 `HA*` 组件构建 UI。
- [最佳实践](/companion/android/best-practices/)：强类型、并发、依赖注入，以及快速失败。
- [代码风格与 lint](/companion/android/code-style/)：KTLint、Detekt 和 Android linter。
- [依赖](/companion/android/dependencies/)：版本目录、lockfile 和 Renovate。
- [调试工具](/companion/android/debugging/)：开发者 playground、StrictMode 和 LeakCanary。

## 测试

- [测试](/companion/android/testing/)：如何编写测试，以及使用 JUnit、MockK、Robolectric 和 Turbine 进行单元测试。
- [截图测试](/companion/android/screenshot-testing/)
- [插桩测试](/companion/android/instrumentation-testing/)
- [端到端测试](/companion/android/e2e-testing/)

## 发布

- [提交 pull request](/companion/android/submitting/)：检查清单、模板和审查流程。
- [持续集成](/companion/android/ci/)：你的 pull request 上会运行什么，以及合并之后会发生什么。
- [发布](/companion/android/releases/)：从合并的 pull request 到 Play Store，以及自行构建签名发布版本。

## 联系谁

- [Home Assistant Discord](https://www.home-assistant.io/join-chat) 上的 [Android 项目讨论串](discord:android-project)。请先在 **Channels & Roles** 下选择开发者角色。
- Android 仓库中的 [Issues](https://github.com/home-assistant/android/issues)，用于提交缺陷和功能请求。
- 有关应用在用户端的工作方式，请参阅[伴侣应用文档](https://companion.home-assistant.io/)。
