---
title: 翻译 2.0
description: 我们已将 Home Assistant Core 仓库中的翻译脚本迁移到了同一个命名空间下。
date: 2020-04-10
authors:
  - Paulus Schoutsen
areas:
  - core
---

我们已将 Home Assistant Core 仓库中的翻译脚本迁移到了同一个命名空间（namespace）下。现在，所有脚本都可以通过 `python3 -m script.translations` 来调用。

| 旧命令                         | 新命令                                    |
| ------------------------------ | ----------------------------------------- |
| `script/translations_develop`  | `python3 -m script.translations develop`  |
| `script/translations_upload`   | `python3 -m script.translations upload`   |
| `script/translations_download` | `python3 -m script.translations download` |
| `script/translations_clean`    | `python3 -m script.translations clean`    |

这将帮助我们为[翻译 2.0 计划](https://github.com/home-assistant/architecture/blob/master/adr/0009-translations-2.0.md)做好准备，该计划将清理翻译并使其更好地扩展。
