---
title: "Buildroot"
description: "Home Assistant OS 的构建工具。它从源码构建一个完整的小型 Linux 系统，而不是基于 Ubuntu 之类的发行版。"
sidebarGroup: "Installation and system"
term:
  code:
    - "buildroot/"
    - "buildroot-external/"
  related:
    - "home-assistant-os"
    - "rauc"
  autolink:
    - "Buildroot"
---

home-assistant/operating-system 仓库将 [Buildroot](https://buildroot.org/) 作为 Git 子模块（submodule），并把所有与 Home Assistant OS 相关的内容（如板卡配置和软件包）保存在 `buildroot-external/` 中。参见 [Build Home Assistant OS](/os/operating-system/build/)。
