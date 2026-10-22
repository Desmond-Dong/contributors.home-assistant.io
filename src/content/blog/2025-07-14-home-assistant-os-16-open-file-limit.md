---
title: 自 OS 16 起加载项中打开文件限制的处理
description: 随着 Home Assistant OS 16 的发布，Docker 容器中打开文件描述符的默认限制（相应地，也影响到所有加载项（add-on）及其内部的进程）发生了变化。
date: 2025-07-14
authors:
  - Jan Čermák
areas:
  - apps
  - os
---

随着 Home Assistant OS 16 的发布，Docker 容器中打开文件描述符（file descriptor）的默认限制发生了变化（推而广之，所有加载项及其内部的进程也受到影响）。Home Assistant OS 现在使用 Systemd 提供的默认值：软限制（soft limit）为 **1024**，硬限制（hard limit）为 **524288** 个打开文件。

这与之前的 OS 版本有所不同：自 [Home Assistant OS 10](/blog/2023/04/13/new_limits_for_add_ons) 起（该更改同样源自上游变更），此限制曾被设置为“infinity”（实际上是一个超过 10 亿的值）。新的限制与现代 Linux 系统上的常见做法保持一致，并遵循了其他 Linux 发行版正在逐步采用的变更。

有关这些限制和最佳实践的更多详细信息，请参阅 Lennart Poettering 对[文件描述符限制](https://0pointer.net/blog/file-descriptor-limits.html)的说明。简而言之，需要超过默认软限制 1024 个文件描述符的应用程序，应在启动时显式提高自身的限制，最高可至系统施加的硬限制（在本例中为 524288）。这种方式可确保每个应用程序只请求它所需的资源，并避免系统级别的高限制可能导致的意外资源耗尽。

### 这对加载项开发者意味着什么？

- 如果作为加载项运行的应用程序需要打开超过 1024 个文件（套接字、管道等），你应该自行调整限制，例如使用 `ulimit -Sn <value>`，只要 `<value>` 不超过硬限制即可（可通过 `ulimit -Hn` 查看）。
- 大多数加载项可能不会受到此更改的影响，但某些加载项——例如处理大量网络连接或访问众多文件的应用程序（如数据库或文件共享应用程序）——可能需要调整其启动例程。

### 如果限制过低会发生什么？

如果加载项或其应用程序所需的文件描述符超过了默认软限制（1024），且未自行提高限制，那么一旦达到限制，它可能无法再打开更多的文件、套接字或网络连接。这通常会导致诸如“Too many open files”或“No file descriptors available”（`EMFILE`）之类的错误、网络连接失败或服务故障。

如果你有任何疑问或遇到问题，请参阅[这个 GitHub 讨论](https://github.com/home-assistant/operating-system/discussions/4166)，其中还包含有关此主题的更多详细信息及背景资料。
