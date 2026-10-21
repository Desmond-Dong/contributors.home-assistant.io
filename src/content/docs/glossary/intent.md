---
title: "意图"
description: "语音指令的含义，例如打开某个区域的灯，以及执行该操作所需的详细信息。"
sidebarGroup: "Voice"
term:
  aliases:
    - "intents"
  code:
    - "intent"
    - "HassTurnOn"
  related:
    - "assist"
    - "conversation-agent"
---

“打开厨房的灯”和“厨房的灯打开”是不同的句子，但具有相同的意图（intent）：`HassTurnOn`，其区域（area）为厨房，域（domain）为 light。每种语言的句子都存放在 [OHF-Voice/intents](https://github.com/OHF-Voice/intents) 仓库中。
