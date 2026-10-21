---
title: "Hassfest"
description: "Home Assistant Core 中用于验证每个集成的文件（如清单和翻译）并从中生成文件的工具。"
sidebarGroup: "Core and integrations"
term:
  code:
    - "script/hassfest"
    - "python -m script.hassfest"
  related:
    - "manifest"
    - "translation-key"
    - "quality-scale"
    - "ci"
  autolink:
    - "hassfest"
---

Hassfest 会检查集成代码周围的文件（如 `manifest.json`、`strings.json`、`services.yaml` 和 `quality_scale.yaml`）是否完整且一致。它还会从这些文件生成其他文件，例如 `CODEOWNERS` 以及 `homeassistant/generated/` 中的列表。

它在每次针对 Home Assistant Core 的拉取请求（pull request）的 [CI](/glossary/ci/) 中运行，你也可以使用 `python -m script.hassfest` 自行运行。自定义集成同样可以使用它，即来自 home-assistant/actions 仓库的 hassfest action。参见 [Linters, hassfest, and CI](/core/development/checks/)。
