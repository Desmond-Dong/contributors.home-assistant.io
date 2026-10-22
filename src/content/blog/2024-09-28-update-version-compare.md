---
title: Update 平台的版本比较现在可以被覆盖
description: "随着 core PR #124797 的合并，该更改将随 Home Assistant Core 2024.10 一同发布，更新平台（update platform）中新增了一个方法：version_is_newer()。"
date: 2024-09-28
authors:
  - Simone Chemelli
areas:
  - core
---

随着 [core PR #124797](https://github.com/home-assistant/core/pull/124797) 的合并（它将包含在 Home Assistant Core 2024.10 中），更新平台（update platform）中新增了一个方法：`version_is_newer()`。

在此更改之前，固件已安装版本、新的可用版本与 beta 版本之间的比较逻辑是硬编码的：

```python
def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
    """Return True if latest_version is newer than installed_version."""
    return AwesomeVersion(latest_version) > installed_version
```

现在，这个新方法允许开发者通过编写自己的方法来自定义此比较。
以下是一个示例（为 Shelly gen1 设备实现）：

```python
def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
    """Return True if available version is newer then installed version."""
    return AwesomeVersion(
        latest_version,
        find_first_match=True,
        ensure_strategy=[AwesomeVersionStrategy.SEMVER],
    ) > AwesomeVersion(
        installed_version,
        find_first_match=True,
        ensure_strategy=[AwesomeVersionStrategy.SEMVER],
    )
```
