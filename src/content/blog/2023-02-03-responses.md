---
title: 意图响应与空白字符
description: 为 Assist 提供支持的意图（intents）仓库迎来了两项重要变更。
date: 2023-02-03
authors:
  - Michael Hansen
areas:
  - core
---

为 [Assist](https://www.home-assistant.io/docs/assist) 提供支持的[意图（intents）仓库](https://github.com/home-assistant/intents/)迎来了两项重要变更。

首先，intents YAML 中的数据块现在可以包含一个 `response` 键。例如：

```yaml
language: en
intents:
  HassTurnOn:
    data:
      - sentences:
          - "open {name}"
        response: cover
```

必须在 `responses/<language>/<intent>.yaml` 中定义一个具有匹配键的响应：

```yaml
language: en
responses:
  intents:
    HassTurnOn:
      cover: "Opened {{ slots.name }}"
```

响应模板采用 [Jinja2 格式](https://www.home-assistant.io/docs/configuration/templating/)，并且可以访问所匹配意图的 `slots` 以及受影响实体（entity）的 `state`。

第二项变更来自 [hassil](https://github.com/home-assistant/hassil)，它是我们的[意图模板语法](/translate/voice/template-syntax/)的解析器。除了解析速度提升 8-10 倍之外，模板内部的空白字符现在会按字面意思处理。

以前，像 `light(s | ing)` 这样的模板会同时匹配 "lights" 和 "lighting"。现在，由于 `|` 周围多了空格，会改为匹配 "light s" 和 "light ing"。正确的模板应该是 `light(s|ing)`。
