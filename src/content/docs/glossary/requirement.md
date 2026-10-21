---
title: "依赖要求（Requirement）"
description: "集成所需的来自 PyPI 的 Python 包，在其清单（manifest）中以固定版本列出。"
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "requirements"
    - "dependency"
  code:
    - "\"requirements\" in manifest.json"
  related:
    - "manifest"
    - "integration"
---

与特定设备或服务通信的代码应放在 PyPI 上的库中，而不是放在集成（integration）里。集成将该库列为依赖要求（requirement），Home Assistant 会在需要时安装它。

依赖要求被固定到确切的版本，因此每次安装运行的代码都是相同的。
