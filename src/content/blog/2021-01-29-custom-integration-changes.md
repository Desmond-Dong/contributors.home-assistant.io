---
title: 自定义集成的变更
description: 大家新年快乐！2021 年终于来了 🎉
date: 2021-01-29
authors:
  - Joakim Sørensen
areas:
  - core
---

大家新年快乐！2021 年终于来了 🎉

你可能已经知道，最近我们得知多个流行的自定义集成（custom integration）存在安全问题。你可以在这里阅读更多信息：

- https://www.home-assistant.io/blog/2021/01/14/security-bulletin/
- https://www.home-assistant.io/blog/2021/01/22/security-disclosure/
- https://www.home-assistant.io/blog/2021/01/23/security-disclosure2/

鉴于这些事件。从刚刚发布的 Home Assistant 2021.2.0 beta 开始，我们将进行两项会影响自定义集成的变更。

## 已弃用的实用工具

位于 `homeassistant.utils` 包中的 `sanitize_filename` 和 `sanitize_path` 辅助函数已被弃用，即将被移除。这将在今年四月第一周发布的 Home Assistant 2021.4.0 中生效。

我们添加了 `raise_if_invalid_filename` 和 `raise_if_invalid_path` 作为替代。它们位于同一个 `homeassistant.utils` 包中。这些新函数将直接抛出 `ValueError`，而不再依赖开发者比较函数的输出与输入来判断是否有差异。这将防止误用。

## 版本

第二项变更非常酷！版本！

[`manifest.json` 文件][manifest] 现在增加了对 `version` 键的支持。版本应为包含主版本号、次版本号和修订号的字符串。例如，`"1.0.0"`。

这个版本号将帮助用户向你反馈他们遇到问题的版本。而且，如果你的自定义集成发现安全问题，Home Assistant 将能够阻止不安全的版本被使用。

**从 Home Assistant 2021.6 版本开始，`version` 键为必填项**

## Hassfest 已更新

`hassfest` 是我们在 Home Assistant 中用于验证所有集成的内部工具。今年四月，我们将其作为 GitHub Action 提供，以帮助你发现自定义集成中的问题。该 action 可用于任何托管在 GitHub 上的自定义集成。如果你还没有将它添加到你的仓库中，现在是时候了！[点击这里阅读更多信息][hassfest]。

如果你正在使用 `hassfest` GitHub action，当你的 [`manifest.json` 文件][manifest] 中缺少 `version` 键时，运行时将会开始看到警告。当 `version` 键对自定义集成完全成为必需项时，此警告将在之后的某个时候变成错误。

## 提供文件服务

向用户提供资源是自定义集成的常见用例，无论是图片、面板，还是用户可以在 Lovelace 中使用的增强功能。从路径提供静态文件的唯一正确方式是使用 `hass.http.async_register_static_paths`。请使用此方法，避免使用你自己的方法，因为这可能导致严重的错误或安全问题。

```python
from pathlib import Path
from homeassisant.components.http import StaticPathConfig

should_cache = False
files_path = Path(__file__).parent / "static"
files2_path = Path(__file__).parent / "static2"

await hass.http.async_register_static_paths([
    StaticPathConfig("/api/my_integration/static", str(files_path), should_cache),
    StaticPathConfig("/api/my_integration/static2", str(files2_path), should_cache)
])
```

以上就是本次关于自定义集成的更新内容。继续做很棒的东西吧！下次再见 👋

[AwesomeVersion]: https://github.com/ludeeus/awesomeversion
[CalVer]: https://calver.org/
[SemVer]: https://semver.org/
[hassfest]: /blog/2020/04/16/hassfest
[manifest]: /core/integrations/manifest/
