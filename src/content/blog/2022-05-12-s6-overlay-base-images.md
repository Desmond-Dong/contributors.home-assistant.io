---
title: 我们 Docker 基础镜像的 S6-Overlay 3.x 更新
description: 我们已开始更新我们的基础镜像，以使用新的 s6-Overlay v3。一篇迁移文章也解释了此次变化带来的新可能性。
date: 2022-05-12
authors:
  - Pascal Vizeli
areas:
  - apps
---

我们已开始更新我们的基础镜像，以使用新的 s6-Overlay v3。一篇[迁移文章](https://github.com/just-containers/s6-overlay/blob/master/MOVING-TO-V3.md)也解释了此次变化带来的新可能性。这篇博文介绍了要能够使用我们的新基础镜像所需的最小改动。

我们已更新了我们的[示例加载项（add-on）](https://github.com/home-assistant/addons-example)，以包含新的行为。

## 最低要求

如果尚未添加，请在你的加载项的 `config.yaml` 中添加 `init: false`。在 V3 中，S6 强制要求正确使用其 init。如果使用了 Docker 默认的系统 init，启动加载项时你会看到以下错误：

```
s6-overlay-suexec: fatal: can only run as pid 1
```

确保你的 git 仓库 rootfs 文件夹中的所有可执行文件/脚本文件都已设置执行权限。你可以使用以下命令更新权限：

```sh
$ git update-index --chmod=+x rootfs/etc/service.d/my-service/run
```

如果你在 S6-overlay 服务中使用 `finish` 脚本，例如用于在出错时停止容器，那么你必须将 `s6-svscanctl -t /var/run/s6/services` 这一行替换为 `/run/s6/basedir/bin/halt`。

## AppArmor

你必须调整你的 [AppArmor 配置文件](/apps/guides/presentation/)，才能使其与新的 s6-Overlay 协同工作。我们已在文档中更新了默认配置文件。需要进行以下更改：

```txt
# S6-Overlay
  /init ix,
  /bin/** ix,
  /usr/bin/** ix,
  /run/{s6,s6-rc*,service}/** ix,
  /package/** ix,
  /command/** ix,
  /etc/services.d/** rwix,
  /etc/cont-init.d/** rwix,
  /etc/cont-finish.d/** rwix,
  /run/{,**} rwk,
  /dev/tty rw,
```

## `host_pid` 选项

在未启用保护模式的情况下运行的加载项可以在其配置中设置 `host_pid: true`。如[文档](/apps/reference/configuration/)中所述：

> 允许在宿主机 PID 命名空间中运行容器。仅对未受保护的加载项有效。

这是一个问题，因为 S6 期望自己是 PID 1（这字面上就写在它的[标语](https://github.com/just-containers/s6-overlay#s6-overlay-)中），而在使用宿主机 PID 命名空间时这是不可能的。

在 V2 中，S6 实际上并没有检查自己是否以 PID 1 运行。这就是为什么过去在这种模式下它“能正常工作”（尽管需要一些[变通方法](https://github.com/hassio-addons/addon-glances/blob/8575d7903ef4c0a7c49e9ab32e0536bd2eb12dd6/glances/rootfs/bin/s6-nuke)来防止 s6 在以这种方式运行时破坏系统）。在 V3 中，S6 会检查自己是否真的是 PID 1，否则将拒绝启动。

要解决这个问题，请不要在你的加载项中使用 s6 overlay，因为它并不是为这种用例设计的。你可以通过用一个空操作（no-op）脚本覆盖 `/init` 来继续使用加载项基础镜像，然后使用普通的 Docker init 系统。或者，你也可以切换到其他基础镜像，例如原生的 alpine 或 debian，并添加你所需要的内容。
