---
title: Probatio 是我们的验证引擎
description: 自 Home Assistant Core 2026.9 起，模式验证在 Probatio 上运行，而不再使用 voluptuous。
date: 2026-09-30
authors:
  - Franck Nijhof
areas:
  - core
---

自 Home Assistant Core 2026.9 起，模式验证在 [Probatio](https://probatio.frenck.dev) 上运行，而不再使用 voluptuous。这一变更悄然进行，因为它本意是不改变任何东西，对大多数集成（integration）来说也确实没有改变任何东西。但这依然值得大声宣布，同时说明它改变了什么，以及你现在可以使用哪些新功能。

## 你现有的代码依然可以正常工作

Probatio 是 voluptuous 的净室重新实现，具有相同的公共 API。`import voluptuous as vol` 依然有效：Home Assistant 在启动时会在 `sys.modules` 中为该名称创建别名，因此导入会解析为 Probatio。自定义集成无需任何更改，且 voluptuous 已完全不再安装。

Core 本身已转向直接导入 Probatio，并且通过 lint 规则禁止在其中使用 `import voluptuous`。该禁令仅适用于我们自己的源代码。你的集成可以随心所欲地保留旧的导入方式。

## 我们为何切换

voluptuous 实际上已经长期无人维护，而它却支撑着 Home Assistant 中的每一个集成。Probatio 有人维护，采用 MIT 许可证，纯 Python 编写，并将与 voluptuous 的行为兼容性作为其首要的正确性目标。

它的速度也更快。根据[其自身的基准测试](https://probatio.frenck.dev/reference/performance/)，该项目测得解释引擎的速度大约是 voluptuous 的 2.3 到 3.4 倍，可选的编译路径大约是 6.7 到 7.4 倍。这些是单机数据，项目方也声明不要将其视为保证，因此请将其视为一个方向而非承诺。Home Assistant 会构建大量的模式，并在每次运行时验证其中的一小部分，因此我们制定了延迟构建策略：模式在首次被验证时进行编译，而不是在构建时。

## 对你有什么改变

有两件事值得了解，因为它们在 2026.9 之后都引发了实际问题。

**错误信息的措辞有所不同。** 如果你的测试对验证错误文本进行了断言，则可能需要进行更新。Probatio 还会为未知键建议一个相近的匹配项，而 2026.9.1 提高了提供建议的门槛，因此不再出现牵强的猜测。

**在少数地方验证更加严格，这暴露了以前悄然出错的数据。** 最明显的例子是 KNX 配置存储，它在写入前会进行验证，但在加载时不会。多年来，手动或通过第三方工具写入的条目一直未经检查地通过，直到在设置时才开始失败。这些数据一直都是无效的。直到有东西进行检查时，才有人被告知。

如果你的集成存储结构化数据并且仅在数据进入时进行验证，这值得看一看。

## 你现在可以使用什么

兼容层仅暴露了 voluptuous 的表面，因此要使用以下任何功能都意味着需要直接导入 `probatio`。

**调用后保留类型。** 将输入原样返回的验证器会保留调用者的类型，因此对 `list[str]` 使用 `probatio.EnsureList()(names)` 会返回 `list[str]` 而不是 `list[Any]`。

**Dataclass 和 TypedDict 模式。** 从注解构建模式。`DataclassSchema` 返回一个类型化的 dataclass 实例，而 `TypedDictSchema` 返回一个验证过的、类型化为 `TypedDict` 的字典：

```python
from dataclasses import dataclass

import probatio


@dataclass
class Server:
    host: str
    port: int = 80


schema = probatio.DataclassSchema(Server)
schema({"host": "nas", "port": 8080})  # Server(host="nas", port=8080)
```

**voluptuous 从未有过的标记。** `Secret` 会从错误输出中删减键的值，当模式包含密码时这很重要。`Forbidden` 要求键不存在，`Alias` 接受旧名称下的值并以规范名称输出，而 `TaggedUnion` 根据一个键的值进行路由，而不是尝试每个分支并报告所有分支。

```python
probatio.Schema(
    {
        probatio.Required(probatio.Secret(CONF_PASSWORD)): str,
    }
)
```

**结构化错误，包括翻译键。** 每个 `Invalid` 都包含一个稳定的 `code`、一个 `translation_key`、用于插值的 `placeholders`、指向违规值的 `path` 以及一个 `secret` 标志。`as_dict()` 会将它们全部序列化。这意味着验证失败可以在程序中进行分支处理，并以用户的语言进行渲染，而不是从英语句子中解析出来。

```python
{
    "code": "length",
    "message": "length of value must be at least 12",
    "path": ["password"],
    "secret": True,
    "context": {},
    "translation_key": "length_min",
    "placeholders": {"min": 12},
}
```

**跨字段规则**，如 `AtLeastOne`、`ExactlyOne`、`AllOrNone`、`RequiredWith` 和 `RequiredIf`，这些以前必须在每个集成中手动编写。

**编解码器。** `to_json_schema`、`to_openapi` 和 `from_openapi` 在模式和文档之间进行转换，这也是我们描述 LLM 工具的方式。

## 文档，以及给 AI 工具的说明

完整文档位于 [probatio.frenck.dev](https://probatio.frenck.dev)，其中包括一个[兼容性矩阵](https://probatio.frenck.dev/reference/compatibility-matrix/)，列出了 Probatio 在 voluptuous 基础上增加的所有内容。

该网站还发布了 [llms.txt](https://probatio.frenck.dev/llms.txt)，这是文档的机器可读索引。如果你在开发集成时使用 AI 助手，让它指向该文件是值得做的。Probatio 比大多数模型的训练数据更新，因此如果让助手自行其是，它会编写 voluptuous 代码、猜测 API，或者发明一个不存在的验证器。除了该文件，还有简略版和完整版变体，以及指南、配方和 API 参考的独立索引。
