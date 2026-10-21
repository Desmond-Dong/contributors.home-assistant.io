---
title: 应用指南
description: 按任务逐一介绍如何使用应用。从容器镜像到发布你的仓库。
order: 10
sidebarLabel: 指南
---

每篇指南涵盖一个任务。它们建立在[你的第一个应用](/apps/first-app/)和[构建一个真实应用](/apps/build-a-real-app/)的基础上，如果你还没有做过，请先完成这两部分。

## 构建

- [构建容器镜像](/apps/guides/dockerfile/)：基础镜像、Bashio、构建参数和标签。
- [使用 S6 overlay 运行服务](/apps/guides/s6-overlay/)：oneshot 和 longrun 服务、依赖、finish 脚本以及环境。
- [添加选项](/apps/guides/options/)：让用户配置你的应用。
- [访问硬件和主机](/apps/guides/hardware/)：串口、USB、GPIO、音频和主机命名空间。

## 连接

- [与 Home Assistant 和 Supervisor 通信](/apps/guides/communication/)：内部网络和 API。
- [通过 ingress 添加网页界面](/apps/guides/ingress/)：在 Home Assistant 中展示你的应用。
- [共享服务并发现集成（integration）](/apps/guides/services-discovery/)：MQTT、MySQL 和发现功能。

## 发布

- [测试你的应用](/apps/guides/testing/)：在你的电脑和真实设备上进行测试。
- [保护你的应用](/apps/guides/security/)：AppArmor、API 角色和身份验证。
- [展示你的应用](/apps/guides/presentation/)：用户在应用商店中看到的内容。
- [发布你的应用](/apps/guides/publishing/)：镜像、版本和发布。
- [创建并共享仓库](/apps/guides/repository/)：用户找到你的应用的地方。
