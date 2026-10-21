---
title: "唤醒词"
description: "让语音助手开始聆听的词语或短语，例如“Okay Nabu”。"
sidebarGroup: "Voice"
term:
  aliases:
    - "wake words"
    - "wake word detection"
  code:
    - "wake_word"
  ui: "Wake word"
  related:
    - "assist-pipeline"
    - "assist-satellite"
    - "assist"
  autolink:
    - "wake word"
    - "wake words"
---

检测唤醒词是 [Assist 流水线](/glossary/assist-pipeline/)的第一步。它可以在 Home Assistant 中进行，使用 `wake_word` 集成和诸如 openWakeWord 之类的引擎；也可以在设备本身上进行，例如在 ESP32 或 Android 手机上使用 microWakeWord。只有在检测到唤醒词之后，命令的其余部分才会被处理。
