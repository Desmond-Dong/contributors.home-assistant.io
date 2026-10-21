---
title: "Assist 卫星"
description: "一种监听语音命令并将其发送到 Home Assistant 的设备，例如 Home Assistant Voice Preview Edition。"
sidebarGroup: "Voice"
term:
  aliases:
    - "voice satellite"
    - "satellite"
    - "satellites"
  code:
    - "assist_satellite"
    - "AssistSatelliteEntity"
  related:
    - "assist"
    - "assist-pipeline"
    - "wake-word"
  autolink:
    - "Assist satellite"
    - "Assist satellites"
    - "voice satellite"
    - "voice satellites"
---

卫星本身不理解命令。它进行监听（通常监听[唤醒词](/glossary/wake-word/)），将音频流式传输到 Home Assistant，并播放回答。每个卫星使用一个 [Assist 管道](/glossary/assist-pipeline/)，并且知道自己所在的区域（area），因此“打开灯”在你所在的房间内就能生效。

在 Core 中，卫星是 `assist_satellite` 类型的实体（entity）。参见 [Assist 卫星实体](/core/entities/assist-satellite/)。
