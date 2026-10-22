---
title: 构建一切
description: Home Assistant 如何使用 Azure Pipelines 实现一切自动化。
date: 2019-07-19
authors:
  - Paulus Schoutsen
areas:
  - core
---

_Home Assistant 如何使用 Azure Pipelines 来自动化一切。_

在 Home Assistant 团队，我们热爱自动化！不仅是在我们的家中，做开发工作时也是如此。我们每三周发布一个版本，其中包含来自 80 多位不同贡献者的代码。而这一切仅由两名全职人员来管理（感谢 [Nabu Casa](https://www.nabucasa.com)！）。

我们将 Home Assistant 作为一个 Python 软件包发行，同时也作为我们名为 Hass.io 的一体化系统的一部分发行。Hass.io 拥有自己的操作系统、一个 supervisor Docker 容器以及 Home Assistant Docker 容器。除此之外，Hass.io 还支持插件（add-on），我们还维护着一套官方插件。我们为 Hass.io 所做的一切都必须做五次，支持的每种架构各做一次：amd64、i386、armv6、armv7、aarch64。

为了仍然能够保持快速推进，我们花费了大量时间来自动化构建任务。在使用过 [TravisCI](https://travis-ci.org/) 和 [CircleCI](https://circleci.com/) 之后，我们最终选择了 [Azure Pipelines](https://azure.microsoft.com/en-us/services/devops/pipelines/)。

我们最初使用的是 Travis，但后来意识到，利用 CircleCI 的开源计划可以显著加快构建速度，该计划提供 4 个 worker、测试分发以及构建产物缓存。我们曾尝试从 CircleCI 获得更多 worker，但按照他们新的定价方案，增加 worker 的成本过于高昂。

[Pascal Vizeli](https://www.github.com/pvizeli) 在之前的工作中积累过 Azure 的使用经验，他在几天之内就迁移并搭建好了所有基于 YAML 的流水线。他得到了 [Kees Schollaart](https://twitter.com/keesschollaart) 的支持——后者是 Azure 的一名 DevRel，并且因开发了 [VS Code 的 Home Assistant Companion 扩展](https://marketplace.visualstudio.com/items?itemName=keesschollaart.vscode-home-assistant)而在我们的社区中颇有名气。每当我们卡壳时，他都帮了我们大忙。

Azure 的开源计划附带 10 个免费代理（agent）。在我们主动联系 Microsoft 之后，我们又获得了 20 个额外的代理，帮助我们实现一切自动化！

想知道我们如何利用这些 Azure 的强大力量吗？

<!--truncate-->

## 持续集成

对 Home Assistant 的所有更改都要经过我们的 CI 流水线。当 Home Assistant 仓库收到拉取请求（pull request）时，就会触发一条流水线，其配置位于 [`azure-pipelines-ci.yml`](https://github.com/home-assistant/home-assistant/blob/dev/azure-pipelines-ci.yml) 中。

对 Home Assistant 的贡献会对照我们的测试套件、代码风格和类型检查进行测试，以确保这些贡献不会破坏现有功能。我们将测试套件拆分成了 3 个不同的阶段。通过使用阶段（stage），我们可以先运行一个快速验证阶段，如果验证不通过就快速失败。

这一策略让我们不必浪费 worker 的时间：如果我们已经知道基本的代码检查（linting）无法通过，就不需要再运行完整的测试套件。

下面是 Home Assistant CI 流水线的截图。由于所有工作被分配到多个 worker 上，总运行时间等于第一列中耗时最长的任务加上第二列中耗时最长的任务。

<center>

![Home Assistant CI 流水线的截图。](/img/en/blog/2019-07-building-all-the-things/test-stages.png)

</center>

为了缩短 Azure 上 CI 的耗时，我们使用了[流水线产物缓存（pipeline artifact caching）](https://marketplace.visualstudio.com/items?itemName=1ESLighthouseEng.PipelineArtifactCaching)的预览版本。这让我们只需构建一次依赖项，把它作为软件包存放在靠近测试运行器的位置，然后在各个作业和流水线运行之间重复使用。

我们做的另一项优化是为测试运行器使用我们自己的基础镜像。这些镜像已经预装了正确版本的 Python 和其他基础工具。我们把它们添加到 [resources](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-ci.yml#L12-L18) 中，之后再在 [strategy](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-ci.yml#L72-L80) 部分中引用它们。

CircleCI 有一个很好的功能：它可以通过记录每个测试的耗时，把你的测试分配到多个 worker 上。这曾把 PyTest 套件的时长缩短到 10 分钟左右。但这种方式会占用更多代理，我们会很快耗尽代理，造成严重的积压。后续阶段只有在“概览”（Overview）阶段完成后才会进入队列，导致它们排在随后到来的其他贡献之后。

使用 Azure 之后，我们获得了数量更多、性能更强、速度更快的运行器（runner），但没有了并行化。这意味着单个构建的耗时会变长；不过，由于大量构建不断涌入，单个构建的耗时依然大致保持不变，因为我们没有遇到任何积压。

<center>

![Home Assistant CI 流水线的截图。](/img/en/blog/2019-07-building-all-the-things/test-results.png)<br />
[测试结果](https://dev.azure.com/home-assistant/Home%20Assistant/_build/results?buildId=3976&view=ms.vss-test-web.build-test-results-tab)的截图。

</center>

## 构建 HassOS

HassOS 是我们自己的嵌入式 Linux 发行版。它经过量身裁剪，只保留在 Docker 容器中运行 Home Assistant 所需的最精简部分。构建由 BuildRoot 驱动，我们面向五种不同的处理器架构。

Azure Pipelines 代理使用的是 amd64 CPU 架构。可以使用一种称为交叉编译（cross-compiling）的方法为不同架构进行编译。我们尝试了一下，但发现它比使用与目标架构相同的原生 CPU 进行编译要慢得多。

我们使用 Azure Pipelines 中一项名为[自托管代理（self-hosted agents）](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops#install)的功能，在我们自己拥有相应架构的硬件上托管构建代理。流水线定义和编排交由 Azure Pipelines 管理，而实际的执行则在我们自己的硬件上飞快运行。

<center>

![Home Assistant CI 流水线的截图。](/img/en/blog/2019-07-building-all-the-things/build-cabinet.jpg)<br />
我们的构建机柜。

</center>

## 构建 Python Wheels

Home Assistant 以独立的 Python 软件包形式发布，同时也打包在 Docker 容器中。我们的 Docker 容器预装了各种集成所需的全部 Python 软件包。正因如此，创建一个 Docker 容器需要很长时间，因为我们必须为每种架构安装并构建每一个 Python 软件包。Home Assistant 加上所有集成，依赖的 Python 软件包超过 1000 个。

为了加快这一过程，我们利用了 Python Wheels。Wheels 是一种二进制格式，其中包含针对特定操作系统和 CPU 架构预先构建的 Python 软件包。我们有一条 Azure 流水线，用来为所有受支持的 CPU 架构上的所有不同软件包构建 wheel。加起来一共是 5000 个 wheel！

有一种特殊的 wheel 格式，只需一次构建就可以面向多个平台。但我们无法使用它，因为它与 musl libc 不兼容，而 Alpine 使用的正是 musl libc。

当一项贡献被接受并合并进开发分支、且更改了任何依赖项要求（requirements）时，这条流水线会自动触发（[流水线定义](https://github.com/home-assistant/core/blob/de3d28d9d5bd5dd69cf9f84d021d683da2c322d6/azure-pipelines-wheels.yml#L3-L10)）。我们每天也会运行它一次，以确保所有更改都被涵盖。

由于使用 wheel 安装要快得多，我们也向自定义集成开放了[自行注册](https://github.com/home-assistant/custom-components-wheels)。我们每天会扫描每个自定义集成一次，确保我们拥有它们所使用的 Python 软件包对应的 wheel。

通过利用 wheel，我们成功把 Hass.io 所用的 Home Assistant 容器的构建时间从 1 小时缩短到了 10 分钟（数据来自 amd64 构建）。

_（题外话：Python 得名于 Monty Python，而软件包索引则根据他们著名小品中的一出被命名为“奶酪店”。因此 Wheel 格式得名于一整轮奶酪，而不是汽车的车轮。5000 轮奶酪可是好大一堆奶酪。）_

## 构建 Home Assistant 版本发布

Home Assistant 每三周发布一个稳定版。在稳定版发布之前，我们通常会有大约 6 个 beta 版本。稳定版发布之后，我们通常还会有 2 到 3 个补丁版本。

每个版本都需要构建为独立的 Python 软件包，以及五种受支持 CPU 架构各自的 Docker 容器。

每当[打上新版本标签](https://github.com/home-assistant/core/blob/dev/azure-pipelines-release.yml#L3-L7)时，这条流水线就会被触发。我们首先会校验标签名称与代码中的版本号一致，并且该发布是由我们白名单中的发布经理之一创建的。然后我们会自动构建所有发布产物并进行发布。

## 构建 Hass.io 插件

Hass.io 的一个特色功能就是插件。插件让开发者可以复用 Home Assistant 在 Hass.io 内部运行时所用的同一套基础设施，用来运行你想要在网络中运行的任何其他程序。这些插件可以与 Home Assistant 紧密集成。例如，你可以一键从[社区插件](https://github.com/hassio-addons/repository)安装 AdGuard，并让它的数据可以在 Home Assistant 内部访问。

Hass.io 自带几个核心插件。这些插件的每个版本同样需要为全部五种架构进行构建。我们把所有插件都保存在一个仓库中，但每个插件都有各自的流水线定义，只有在该插件发生变化时才会触发（[示例](https://github.com/home-assistant/hassio-addons/blob/master/mosquitto/azure-pipelines.yml)）。

## 结语

构建各种各样的自动化，切实帮助 Home Assistant 在人力资源最少的情况下实现了扩展。我们非常感谢 Azure 及其员工给予我们的所有帮助。干杯！

## 链接

- [Azure Pipelines 上的 Home Assistant](https://dev.azure.com/home-assistant/Home%20Assistant/_build)
- [Azure Pipelines 上的 Hass.io](https://dev.azure.com/home-assistant/Hass.io/_build)
