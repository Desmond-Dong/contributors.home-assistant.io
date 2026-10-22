---
title: 将应用构建迁移到 Docker BuildKit
description: 旧版 home-assistant/builder 容器和旧的 home-assistant/builder GitHub Action 已停用。
date: 2026-04-02
authors:
  - Jan Čermák
areas:
  - apps
---

旧版 `home-assistant/builder` 容器和旧的 `home-assistant/builder` GitHub Action 已停用。我们建议按照本文所述，迁移所有应用（apps，原加载项）的 GitHub 工作流和 Dockerfile。

## 变更内容与原因

旧的 builder 在单个特权 Docker-in-Docker 容器内使用 QEMU 模拟运行每个架构的构建。这种方式速度慢、需要提升的权限，而且已经熟悉 Docker 的用户还需要学习如何使用 Home Assistant 自定义的 builder 容器。旧的 builder 还带来了不必要的维护开销。如今，builder 所做的工作完全可以由 Docker BuildKit 取代，它在 GitHub Actions 运行器上受到原生支持，并且在需要时内置了基于 QEMU 模拟的多架构支持。

对于您的 CI 来说，替代方案是一组职责专一的[复合 GitHub Actions](https://github.com/home-assistant/builder)，它们将构建工作委托给运行器上原生支持 Docker BuildKit 的 Docker。在 CI 之外，这次迁移意味着您的 `Dockerfile` 现在是构建应用镜像的唯一事实来源，您可以直接使用 `docker build` 在本地构建和测试您的应用，而无需使用 builder 容器。

## 迁移过程

迁移分为两部分：更新您的 Dockerfile 和更新您的 GitHub Actions 工作流。

### 更新 Dockerfile

新的构建工作流不再使用 `build.yaml`。请按照以下方式将其内容移入您的 `Dockerfile`：

- **`build_from`** - 将 `build.yaml` 中的 `build_from` 键替换为 `Dockerfile` 中的 `FROM` 语句：

  ```dockerfile
  FROM ghcr.io/home-assistant/base:latest
  ```

   由于基础镜像现在以多平台清单（multi-platform manifest）的形式发布，通常不再需要为每个架构定义单独的基础镜像。不过，`build-image` action 仍会提供 `BUILD_ARCH` 作为构建参数，因此如果您需要在基础镜像名称的模板中使用它，就可以在 `Dockerfile` 中使用该参数。

- **`labels`** - 使用 `LABEL` 语句将任何自定义 Docker 标签直接移入您的 `Dockerfile`：

  ```dockerfile
  LABEL \
      org.opencontainers.image.title="Your awesome app" \
      org.opencontainers.image.description="Description of your app." \
      org.opencontainers.image.source="https://github.com/your/repo" \
      org.opencontainers.image.licenses="Apache License 2.0"
    ```

  如果您正在创建自定义工作流，请注意旧版 builder 会自动添加 `io.hass.type`、`io.hass.name`、`io.hass.description` 和 `io.hass.url` 标签。新的 action 不会推断这些值，因此请通过 `build-image`（或类似）action 的 `labels` 输入显式添加它们。

- **`args`** - 将自定义构建参数作为带有默认值的 `ARG` 定义移入您的 `Dockerfile`：

  ```dockerfile
  ARG MY_BUILD_ARG="default-value"
  ```

  `ARG` 中的默认值取代了之前通过 `build.yaml` 的 `args` 字典提供的值。如有需要，它们仍然可以在构建时通过 `--build-arg` 进行覆盖。

将 `build.yaml` 的内容迁移完毕后，您就可以从仓库中删除该文件。

### 更新 GitHub Actions 工作流

删除所有使用 `home-assistant/builder@master` 的工作流步骤，并用新的复合 action 替换它们。完整可用的示例请参见我们示例应用仓库中的[示例工作流](https://github.com/home-assistant/apps-example/blob/main/.github/workflows/builder.yaml)。或者，根据需要在更加自定义的工作流中使用[各个独立的 action](https://github.com/home-assistant/builder?tab=readme-ov-file#example-workflow)。

### 镜像命名

现在，引用已发布应用镜像的首选方式是使用不带架构前缀的**通用（多架构）名称**：

```yaml
# config.yaml
image: "ghcr.io/my-org/my-app"
```

`{arch}` 占位符（例如 `ghcr.io/my-org/{arch}-my-app`）仍作为兼容性后备方案受支持，但建议使用通用名称，让清单来处理平台解析。

### 本地构建

更新 `Dockerfile` 后，您可以直接使用 `docker build` 构建应用镜像 - 更多详情请参阅[本地应用测试](/apps/guides/testing/)。

## 由 Supervisor 在本地构建的应用

为了向后兼容，如果 `build.yaml` 文件存在，Supervisor 仍会读取它，并使用从该文件中读取的值填充镜像构建参数。这会产生警告，并且将来最终会被移除，因此建议按照上述说明迁移到新的基于 Dockerfile 的方法。
