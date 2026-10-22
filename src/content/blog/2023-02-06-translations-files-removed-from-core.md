---
title: 翻译文件已从 Core 仓库中移除
description: 我们已从 Home Assistant Core 仓库中移除了所有翻译文件，并提供了一个辅助脚本，用于从翻译字符串文件（`strings.json`）编译英文翻译，以供开发之用。
date: 2023-02-06
authors:
  - Franck Nijhof
areas:
  - core
---

我们已从 Home Assistant Core 仓库中移除了所有翻译文件，
并提供了一个辅助脚本（helper script），用于从翻译字符串文件
（`strings.json`）编译英文翻译，以供开发之用。

此前，所有翻译文件（包括所有语言）都是
Home Assistant Core 仓库的一部分。每天晚上，我们都会
通过从 Lokalise 下载翻译并将其提交到 Core 仓库来更新翻译。

现在，我们将这一流程移到了构建（build）时。
如今，我们在发布新版本（包括 beta 版和 nightly 版本）时
会从 Lokalise 下载最新的翻译。

这种方法带来了一些好处：

- 我们不再需要将翻译文件提交到 Core 仓库。
  这意味着对于开发人员而言，这也不再是一个令人困惑的负担。
- 人们将不再（错误地）尝试通过 GitHub
  贡献语言翻译。
- 现在，每个版本（包括补丁、beta 和 nightly 版本）
  也将包含最新的翻译。

## 本地开发

对于本地开发，我们提供了翻译开发辅助脚本。这一直以来就已存在，
只是现在，它可以一次性编译所有集成（integration）的英文翻译。

```bash
python3 -m script.translations develop --all
```

该脚本会在设置开发环境时自动运行，并且每次您在 VSCode 中
运行 Home Assistant 时（作为预启动任务）也会自动运行。
