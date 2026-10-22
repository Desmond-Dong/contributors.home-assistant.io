---
title: Supervisor 加载项的新限制
description: 随着 Home Assistant OS 10 的发布，我们更新到了最新的 Docker 23.0 版本。在新的 Docker 版本中，加载项（add-ons）可打开的文件描述符最大数量变为了无限（某种意义上）。
date: 2023-04-13
authors:
  - Stefan Agner
areas:
  - apps
---

随着 Home Assistant OS 10 的发布，我们更新到了最新的 Docker 23.0 版本。在新的 Docker 版本中，加载项可打开的文件描述符最大数量变为了无限（某种意义上）。

如果您是一名加载项开发者，并且在 Home Assistant OS 10 上遇到了内存不足（out-of-memory）问题，可以在启动您的服务之前使用 `ulimit -n 1048576` 来应用旧的限制。

背景：在 Home Assistant OS 候选发布（release candidate）阶段，更高的限制被证明对多个加载项存在问题（Node-RED、Network UPS Tools 以及 EMQX MQTT 代理，参见 [Home Assistant OS issue #2438](https://github.com/home-assistant/operating-system/issues/2438)）。在所有这些案例中，问题都表现为内存不足错误，而在相同的硬件上，之前的 Home Assistant OS 版本却运行正常。同样在这三个案例中，内存都会根据允许打开的文件描述符数量进行动态分配（可以通过 `prlimit64` 系统调用确定，其返回的限制值为 1073741816）。

我们曾考虑恢复到旧的限制；然而，根据 Docker（moby）仓库中的变更说明，使用无限作为限制的开销更小。因此我们决定保留新的默认设置。
