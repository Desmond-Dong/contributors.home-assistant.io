---
title: 新增快照测试支持
description: Home Assistant 现已为我们的 Python 代码库提供快照测试支持。
date: 2023-02-20
authors:
  - Franck Nijhof
areas:
  - core
---

Home Assistant [现已支持快照测试](https://github.com/home-assistant/core/pull/88323)
（snapshot testing），适用于我们的 Python 代码库。

快照测试（snapshot testing，也称为审批测试，approval tests）是一种将值与存储的
参考值（即快照，snapshot）进行断言比较的测试；它可确保代码的输出
随时间保持不变。

快照测试不同于常规（功能）测试，也不能替代功能测试，但它们对于测试较大的测试输出
非常有用。在 Home Assistant 中，例如可以用它们来测试实体（entity）状态、设备（device）
或实体注册表条目，或者诊断转储（diagnostic dump）的输出。

以这个诊断测试为例，它使用快照来断言诊断转储的输出：

```python
# tests/components/example/test_diagnostics.py
async def test_diagnostics(
    hass: HomeAssistant,
    hass_client: ClientSessionGenerator,
    init_integration: MockConfigEntry,
    snapshot: SnapshotAssertion,
) -> None:
    """Test diagnostics."""
    assert (
        await get_diagnostics_for_config_entry(hass, hass_client, init_integration)
        == snapshot
    )
```

首次运行此测试时，它会失败，因为尚不存在快照。要创建（或更新）快照，请使用
`--snapshot-update` 标志运行 pytest，它将在此组件的 `snapshots` 目录中
创建一个快照文件。

快照文件以测试文件命名，在本例中为：
`tests/components/example/snapshots/test_diagnostics.ambr`。快照文件
是人类可读的，必须提交到代码仓库中。

此后的任何测试运行都会将结果与快照进行比较。如果结果不同，测试将失败。

快照是确保代码输出随时间保持不变的一种简单方法，可以大大减少所需的
测试代码数量（同时对完整输出提供）完整的断言。

Home Assistant 中的快照测试构建于 [Syrupy](https://github.com/tophat/syrupy)
之上，并对其进行了扩展，以处理 Home Assistant 特有的数据结构。

有关测试集成（integration）的更多信息，
可以在[我们的文档](/core/development/tests/#snapshot-tests)中找到。
