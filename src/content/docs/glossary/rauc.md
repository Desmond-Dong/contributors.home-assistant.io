---
title: "RAUC"
description: "Home Assistant OS 的更新系统。它将整个系统的新版本安装到正在运行的系统旁边，因此当更新失败时，设备可以回退。"
sidebarGroup: "Installation and system"
term:
  aliases:
    - "update bundle"
  code:
    - ".raucb"
    - "buildroot-external/ota/"
  related:
    - "home-assistant-os"
    - "buildroot"
    - "supervisor"
  autolink:
    - "RAUC"
---

Home Assistant OS 有两个系统插槽。[RAUC](https://rauc.io/) 将更新包（update bundle）写入未在运行的插槽，然后设备启动进入该插槽。如果无法正常工作，设备会回退到原来的插槽。Supervisor 会启动这些更新。参见[更新系统](/os/operating-system/update-system/)。
