---
title: Supervisor 更新
description: 距离我们上一次发布关于 Supervisor 变更的文章已经有一段时间了。以下是过去一年以及未来的一些亮点。
date: 2021-08-24
authors:
  - Joakim Sørensen
areas:
  - apps
---

距离我们上一次发布关于 Supervisor 变更的文章已经有一段时间了。以下是过去一年以及未来的一些亮点。这些信息主要面向加载项（add-on）开发者，但这里面对每个人都会有一点有用的内容。如果你还没有看过，我们已在[主站上发布了一篇博客][main_blog]，值得一读。

## 快照（Snapshot）-> 备份（Backup）

首先，正如在[主站博客][main_blog]中提到的那样，我们已经开始弃用自 Supervisor 诞生之初就一直沿用的名称 "snapshot"，并正在转向更容易辨识的 "backup"。

这些变更现已在 Supervisor 的 `dev` 通道上线，因此你可以开始测试并调整你的工具/加载项，以确保当你的用户获得这些变更时它们仍能正常工作。

### API 变更

随着从 "snapshot" 到 "backup" 的过渡，Supervisor API 中新增了一个基础部分 [`/backups`][supervisor_api_backups]，其运作方式与 [`/snapshots`][supervisor_api_snapshots] 相同，拥有与旧部分相同的所有端点（endpoint），但有两个关键区别：

- 如果你访问 `/backups`，现在返回的数据将是 `{"backups": []}` 而不是 `{"snapshots": []}`
- 要删除快照，你现在必须对 `/backups` 端点使用 `DELETE` HTTP 方法，而之前 `POST` 和 `DELETE` 都受支持。

旧的 [`/snapshots`][supervisor_api_snapshots] 端点现已被弃用，并计划于今年第四季度移除。

### 备份结构变更

为了保持一致性，我们还将备份 tar 包内元数据文件的名称从 `snapshot.json` 改为了 `backup.json`。如果你的工具使用了该文件，你应该同时检查两者，这样你的工具就能同时适用于现有备份和新备份。

## 流式 ingress

一些加载项需要从用户那里接收较大的载荷（payload），例如上传时。此前，运行在 ingress 之后的加载项每个请求有 16 MB 的限制，这仍然是默认值。如果你需要接收更大的载荷，可以在加载项配置中将 `ingress_stream` 设置为 `True` 来启用此功能。这样，请求将从客户端流式传输到你的加载项，请求没有大小限制，而且几乎没有额外开销。

请注意，并非所有 web 服务器默认都能处理这种情况，因此你可能需要进行调整。

## 已弃用的 API 端点

在过去几年中，我们重构了部分 API 端点，但同时也保留了旧端点的可用性。如果你的工具/加载项中使用了任何已弃用的端点，你应该现在就迁移到新端点。所有已弃用的端点都计划于今年第四季度移除。

以下是已弃用端点及其替代方案的列表：

已弃用的端点 | 替换为
-- | --
`/homeassistant/*` | `/core/*`
`/snapshots/*` | `/backups/*`

除此之外，以下内容也已被弃用，同样计划于今年第四季度移除。

- 环境变量 `HASSIO_TOKEN` 已被 `SUPERVISOR_TOKEN` 取代。
- 使用 `X-Hassio-Key` 请求头的方式已被[使用带有 Bearer 令牌的 `Authorization`][api_example]取代。
- 使用 `http://hassio/` 与 Supervisor 通信的方式已被 `http://supervisor/` 取代。

## Supervised 安装方式

维护 [Supervised 安装（supervised installation）][supervised_installation]目前的体验并不是最好的。大多数用户用来安装的[脚本][supervised_script]落后于 Supervisor 对宿主机的要求。由于使用该方式的用户没有真正的升级路径，他们需要手动调整自己的安装。

正如[主站博客][main_blog]中所提到的，我们最近创建了 [OS Agent][os_agent]。这可以使宿主机操作系统与 Supervisor 之间实现更好的通信，并引入更多功能。要利用这些功能，现有 Supervised 安装的用户必须手动安装 OS Agent。

另一种方案是将 Supervised 安装打包并分发为 deb 包，这样就可以在宿主机上使用 `apt` 进行安装和升级。为了使这一方案可行，我们正在寻找愿意创建并维护这种部署方式的人（或一组人），使 Supervised 安装方法达到与我们 OS 同等的水平，更重要的是，让用户更容易完成宿主机上所需的更新。

如果你对这些变更有任何疑问，欢迎随时在[我们的 Discord 服务器][discord]上的 `#devs_supervisor` 频道与我们联系。

下次再见 👋

[discord]: https://discord.gg/c5DvZ4e
[main_blog]: https://www.home-assistant.io/blog/2021/08/24/supervisor-update/
[supervisor_api_backups]: /apps/supervisor-api/
[supervisor_api_snapshots]: /apps/supervisor-api/
[supervised_installation]: https://github.com/home-assistant/architecture/blob/master/adr/0014-home-assistant-supervised.md
[supervised_script]: https://github.com/home-assistant/supervised-installer
[os_agent]: https://github.com/home-assistant/os-agent
[api_example]: /apps/supervisor-api/
