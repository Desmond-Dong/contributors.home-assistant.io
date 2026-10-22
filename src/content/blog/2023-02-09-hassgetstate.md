---
title: HassGetState 意图
description: "我们新增了一个内置意图：HassGetState"
date: 2023-02-09
authors:
  - Michael Hansen
areas:
  - core
---

我们新增了一个[内置意图（built-in intent）](/core/internals/built-in-intents/)：`HassGetState`

这个意图将让用户能够向 [Assist](https://www.home-assistant.io/docs/assist) 提问，前提是我们在[意图仓库](https://github.com/home-assistant/intents/)中添加了相应的翻译。
你现在就可以通过添加[自定义句子](https://www.home-assistant.io/docs/assist/custom_sentences)来试用它：

```yaml
# Example <config>/custom_sentences/en/get_state.yaml

language: en
intents:
  HassGetState:
    data:
      - sentences:
          - what is <name> [in <area>]
          - is <name> {state} [in <area>]

responses:
  intents:
    HassGetState:
      default: "{{ slots.name }} is {{ state.state_with_unit }}"

lists:
  state:
    values:
      - "on"
      - "off"
      - open
      - closed
      - locked
      - unlocked
      - wet
      - dry
```

有了这些句子，你现在可以向 Assist 提问诸如“室外温度是多少？”“前门锁上了吗？”或“地下室的地面湿了吗？”之类的问题。
当然，这需要实体（entity）名称（或别名）设置得恰到好处。例如，一个名为“室外温度”的传感器，以及“地下室”区域中一个名为“地板”的二进制水分传感器。

随着我们添加更多翻译，将可以提出更多类型的问题，例如“客厅里有哪些灯？”和“是否有门没锁？”
