---
title: 加载项即将迎来的变更
description: "你现在可以将我们的 [builder][marketplace] 用作 [GitHub action][github_action] 了！:tada:"
date: 2020-10-29
authors:
  - Joakim Sørensen
areas:
  - apps
---

> [!NOTE]
> 本文所述的 builder action（`home-assistant/builder@master`）是一种旧版工作流。它此后已被专用的复合 action（composite actions）所取代。有关当前推荐的方法，请参阅 [builder 迁移文章](/blog/2026/04/02/builder-migration)。

## GitHub Action

你现在可以将我们的 [builder][marketplace] 用作 [GitHub action][github_action] 了！:tada:

这已经在我们的 [hassio-addons 仓库][addons]中投入使用，你可以[在这里][builder-action]看到我们如何实现它的示例。

它可以用来确保加载项（add-on）在你对仓库进行更改后仍能构建，并作为发布工作流的一部分发布镜像。如何使用该 action 已在 [builder 仓库][builder-action]中进行了说明。

下面是一个如何使用它的示例：

```yaml
jobs:
  build:
    name: Test build
    runs-on: ubuntu-latest
    steps:
    - name: Checkout the repository
      uses: actions/checkout@v2
    - name: Test build
      uses: home-assistant/builder@master
      with:
        args: |
          --test \
          --all \
          --target /data
```

此示例将对加载项的所有受支持架构运行一次测试构建。

> [!TIP]
> 你的仓库在 action 中被映射到 `/data`，因此如果你的加载项文件位于子目录中，你需要提供 `--target /data/{directoryname}` 作为 builder action 的参数。

## 文档

我们的 [API 文档][api_docs]已迁移至开发者文档网站。在此次迁移过程中，它还进行了样式更新，使其更易于浏览。一些端点（endpoint）仍缺少部分内容。如果你还没有用完 [Hacktoberfest] 的配额，也许你想为我们的 API 描述贡献更多细节？

## API 变更

- 使用 `/homeassistant/*` 端点已被弃用，并将在今年晚些时候移除。你需要改用 `/core/*`。
- 使用 `http://hassio/` 已被弃用，并将在今年晚些时候移除。你需要改用 `http://supervisor/`。
- 使用 `HASSIO_TOKEN` 已被弃用，并将在今年晚些时候移除。你需要改用 `SUPERVISOR_TOKEN`。
- 通过 `POST` 调用 `/supervisor/snapshots/<slug>/remove` 来删除快照（snapshot）的方式已被弃用，并将在今年晚些时候移除。你需要改为在调用 `/supervisor/snapshots/<slug>` 时使用 `DELETE` 方法。
- 使用 `X-Hassio-Key` 请求头作为身份验证方式已被弃用，并将在今年晚些时候移除。你需要改为使用带有 `Bearer` 令牌的授权请求头。

[API 文档][api_docs]已更新以反映这些变更。

## 加载项选项

`/data/options.json` 文件的权限已从 `644` 更改为 `600`。如果你的加载项以非 root 用户身份运行并读取此文件，现在将会遇到权限问题。

你可以在加载项中采取以下几个步骤来继续使用这些信息：

- 如果你在加载项中使用了 [S6-overlay]，你可以使用 [`/etc/fix-attrs.d`][S6-overlay-permissions] 来确保运行加载项的用户有权访问该文件。
- 你可以将加载项改为以 `root` 用户身份运行（默认）。

## 发布

到目前为止，Supervisor、我们的插件（plugin）和加载项一直使用构建编号与[语义化版本（Semantic Versioning，SemVer）][semver]混合的版本系统。我们已决定在这些仓库中替换该方式，转而采用[日历化版本（Calendar Versioning，CalVer）][calver]作为我们的版本系统。

我们正在将 Supervisor 从基于发布的开发迁移到持续开发。这与我们现有的基于渠道的更新策略（stable、beta 和 dev）完美契合。我们现在正在利用自动化流水线来构建新的 Supervisor 版本并将其推送到正确的渠道。迁移到这种结构后，不再需要双分支设置，因此我们的 `dev` 和 `master` 分支现在都已被新的 `main` 分支取代。我们为 Supervisor 提供的插件（DNS、Multicast、Observer、CLI）也将遵循这一持续开发原则。

我们做出这一转变是为了通过自动测试系统提供更高的软件质量。现在，每次提交都会触发一个新的 dev 版本发布，该版本会由我们的测试实例进行测试。问题会立即上报给 sentry。这让我们有机会在创建发布之前测试所有变更。当发布创建后，这些变更将在 beta 渠道中可用。一旦宣布稳定，我们就可以将该发布提升到 stable 渠道。

我们正在使用我们的 [builder action][marketplace] 和 [GitHub actions][github_action] 来构建和发布 Supervisor、我们的插件以及 Docker 容器的基础镜像。如果你对我们是如何做到这一点感兴趣，可以查看[Supervisor 的 builder action][builder_action]，以及[action 辅助工具][action_helpers]。

[action_helpers]: https://github.com/home-assistant/actions/tree/master/helpers
[addons]: https://github.com/home-assistant/hassio-addons
[api_docs]: /apps/supervisor-api/
[builder_action]: https://github.com/home-assistant/supervisor/blob/main/.github/workflows/builder.yml
[builder-action]: https://github.com/home-assistant/builder#github-action
[calver]: https://calver.org/
[github_action]: https://github.com/features/actions
[Hacktoberfest]: https://hacktoberfest.digitalocean.com/
[marketplace]: https://github.com/marketplace/actions/home-assistant-builder
[S6-overlay-permissions]: https://github.com/just-containers/s6-overlay#fixing-ownership--permissions
[S6-overlay]: https://github.com/just-containers/s6-overlay
[semver]: https://semver.org/
