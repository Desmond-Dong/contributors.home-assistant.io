---
title: Android 端到端测试
description: 每晚运行的 Maestro 测试，在所有 API 级别上让 Android 应用连接真实的 Home Assistant 运行，以及如何调试失败。
sidebarLabel: End-to-end tests
sidebarGroup: Test
order: 4
source: https://github.com/home-assistant/android/blob/main/.github/workflows/e2e.yml
lastVerified: 2026-10-14
---

其他所有测试都会模拟服务器。端到端（E2E）测试则不会：它像用户一样，让真实的应用连接真实的 Home Assistant 运行。这能捕捉到其他任何测试都无法发现的问题，比如 Core 或前端的变更导致引导流程损坏，或者某个特定 Android 版本上的 web view 问题。

## 运行时机

`e2e.yml` 工作流在以下情况运行：

- 每晚 05:00 UTC 在 `main` 分支上运行，针对 Home Assistant 的 `dev` 镜像（最新的开发构建版本）。
- 在任意分支上通过 **Run workflow** 手动运行。可选的 `home-assistant-version` 输入用于选择要测试的镜像标签。

它不属于拉取请求（pull request）检查的一部分。它需要为每个受支持的 API 级别启动一个模拟器，对每个拉取请求来说开销太大。

## 它做什么

1. 构建 `fullDebug` APK，并关闭 [StrictMode](/companion/android/debugging/#strictmode)。
2. 安装 [Maestro](https://maestro.dev/) CLI，并根据其发布的校验和验证下载内容。
3. 使用 `.github/e2e/homeassistant` 中的配置启动 Home Assistant，并检查 `mobile_app` 是否已加载。
4. 在 Emulator.wtf 上为每个 API 级别（从 API 29 到 `androidSdk-target`）启动一个模拟器，并安装应用。
5. 在所有模拟器上并行运行 Maestro 流程。
6. 无论结果如何，都上传调试所需的文件。

设备列表从 API 29 开始，尽管应用支持更旧的版本。在更旧的镜像上，web view 会渲染前端，但其内容永远不会出现在 Maestro 能看到的内容中，因此其上的所有检查都会失败。拉取请求上的[插桩测试](/companion/android/instrumentation-testing/)仍然覆盖完整范围，直到应用的最低 API 级别。

Home Assistant 容器运行在 GitHub runner 上，而模拟器运行在 Emulator.wtf 上。一条隧道将它们连接起来，在模拟器内部 `homeassistant.internal` 会解析到该实例。

## 流程

流程文件位于仓库根目录的 `.maestro` 文件夹中。目前只有一个：[`.maestro/onboarding.yaml`](https://github.com/home-assistant/android/blob/main/.maestro/onboarding.yaml)，测试的每一步都写在那里。它覆盖了应用最关键的路径：

- **登录**：真实的登录页面，使用真实凭据，走完整个授权流程。
- **注册**：应用向 `mobile_app` 注册自己，其他一切都依赖于此。
- **前端渲染**：能够到达概览仪表盘（dashboard）证明 web view 在该 API 级别上正常工作。
- **外部总线双向工作**：只有在应用通过[外部总线](/frontend/reference/external-bus/)（external bus）宣告自己之后，前端才会在其设置中显示 **Companion app** 条目，而选中它会让前端请求应用打开其原生设置。

该流程从三个参数获取要测试的实例：`HOME_ASSISTANT_URL`、`HOME_ASSISTANT_USERNAME` 和 `HOME_ASSISTANT_PASSWORD`。

当你修改流程时：

- 它驱动的是调试应用 `io.homeassistant.companion.android.debug`。不要更改 `appId`。
- 它在所有 API 级别上运行，因此任何与版本相关的内容都必须是条件性的，比如现有的权限对话框步骤。
- 步骤会匹配屏幕上的文本。如果你重命名了应用中的某个标签，请在同一个拉取请求中更新流程。

[Maestro 文档](https://docs.maestro.dev/api-reference/commands)列出了所有命令。

## 本地运行

安装 [Maestro CLI](https://docs.maestro.dev/getting-started/installing-maestro)，启动一个模拟器或连接一台设备，然后运行：

```bash
./gradlew :app:installFullDebug
maestro test \
  -e HOME_ASSISTANT_URL=http://homeassistant.local:8123 \
  -e HOME_ASSISTANT_USERNAME=<username> \
  -e HOME_ASSISTANT_PASSWORD=<password> \
  .maestro/onboarding.yaml
```

该流程会先清除应用状态，因此总是从全新的引导流程开始。请使用一次性实例：每次运行都会在其上注册一台新设备。

## 调试失败

每次运行都会上传一个 `e2e-artifacts` 工件：

| 文件 | 内容 |
| --- | --- |
| `maestro-results/` | 每个分片的命令跟踪、`maestro.log`，以及失败时的截图 |
| `logcat-*.txt` | 完整的 logcat，每个模拟器一个文件 |
| `homeassistant.log` | Home Assistant 日志 |
| `homeassistant-config.json` | `/api/config` 响应，包含版本和已加载的组件 |
| `homeassistant-container.json` | 容器详情，包括确切的镜像 |

按此顺序阅读它们，并在第一个能解释失败原因的文件处停止。大多数失败会显示在失败的 Maestro 命令及其截图中：这能区分屏幕损坏和 Maestro 只是看不到某个元素这两种情况。从 Home Assistant 日志开始通常是在浪费时间。

只有在排除了应用和流程之后，才去查看上游。`dev` 镜像每晚都会变化，因此请与上一次通过的运行进行比较：两份 `homeassistant-config.json` 文件给出了故障两侧的 Home Assistant 版本。然后查看在此期间 [Core](https://github.com/home-assistant/core) 或[前端](https://github.com/home-assistant/frontend)合入了什么。

## 自动化分诊

夜间运行失败会启动一个 `e2e-triage` 工作流。一个 AI 代理会下载失败运行和上一次成功运行的工件，并遵循 `.agents/skills/ha-android-e2e-debugging` 技能中的流程。它只做诊断：从不更改文件或打开拉取请求。它会在 Android 仓库中报告到一个单独的 `e2e-failure` issue 中，包括供维护者带到 Core 或前端的上游发现。下一次通过的运行会关闭该 issue。
