---
title: hacs.json
description: 仓库根目录下 hacs.json 文件中的每个键、HACS 对它的文档说明，以及 Marketplace 如何处理它。
order: 1
---

`hacs.json` 向 Marketplace 和 HACS 描述你的仓库。它位于仓库的根目录，每个仓库都需要一个：Marketplace 在安装每个版本时都会读取它，没有它就无法安装或更新仓库。

```json title="hacs.json"
{
  "name": "My awesome card",
  "filename": "my-awesome-card.js",
  "homeassistant": "2026.11.0"
}
```

## 键

| 键 | 类型 | 作用 |
| --- | --- | --- |
| `name` | string | 用户看到的名称。HACS 和目录（catalog）都要求提供。如果没有它，Marketplace 会显示集成的清单（manifest）中的 `name`，或者根据你的仓库名称生成一个名称。 |
| `content_in_root` | boolean | 你的内容位于仓库根目录，而不是在 `custom_components/<domain>/` 或 `themes/` 中。对于仪表盘（dashboard）插件，此时只会在根目录中查找文件，而不会在发布（release）或 `dist` 中查找。 |
| `filename` | string | 要安装的文件的名称，适用于仪表盘插件或模板（template）。使用 `zip_release` 时，则是 ZIP 资源的名称。模板必须提供此项。 |
| `zip_release` | boolean | 从每个发布（release）附带的 ZIP 文件安装，文件名由 `filename` 指定。HACS 仅对集成（integration）支持此功能，Marketplace 拒绝对模板使用它。 |
| `persistent_directory` | string | 集成内部的一个文件夹，在更新后会被保留，路径相对于集成文件夹。仅适用于集成。 |
| `homeassistant` | string | 此发布所需的最低 Home Assistant 版本，例如 `"2026.11.0"`。添加 `b0`，例如 `"2026.11.0b0"`，以允许该版本的 beta 版本。仅对有发布（release）的仓库进行检查。 |
| `hide_default_branch` | boolean | HACS 不会将默认分支作为可安装的版本提供。 |
| `hacs` | string | 最低 HACS 版本。Marketplace 会读取它，但不会进行比较。 |
| `country` | string or list | 两位字母的国家代码（[ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)），适用于仅在某些国家/地区可用的仓库。在这种情况下，目录（catalog）会要求提供此项。Marketplace 不使用它。 |

Marketplace 会忽略类型错误的键，并记录一条警告。其他键会被忽略。

## 版本

`homeassistant` 和 `hacs` 中的版本号使用 [AwesomeVersion](https://github.com/ludeeus/awesomeversion) 进行比较，这也是 Home Assistant 使用的同一个库。[AwesomeVersion 演示](https://awesomeversion.ludeeus.dev/)展示了两个版本如何比较。

## 来源

- Marketplace 读取的内容：core 中 `marketplace` 集成的 [`utils/validate.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/marketplace/utils/validate.py) 中的 `REPOSITORY_MANIFEST_VALUES`。
- HACS 文档记录的内容：HACS 发布文档中的 [hacs.json 部分](https://hacs.xyz/docs/publish/start#hacsjson)。
