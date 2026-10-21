---
title: 架构
description: 各部分如何协同工作，以及背后的决策。
---

Home Assistant 运行在数百万个家庭中，硬件从小型 Raspberry Pi 到壁橱里的服务器都有。在底层，它是一组协同工作的组件，由数千人在十多年间共同构建。本区域将解释它是如何做到的。

你不需要理解全部内容才能参与贡献。先从整体概览开始，当你的工作需要时再深入了解。每个页面都以简短版本开头，之后才展开细节，供有需要的人阅读。

## 从这里开始

- [整体概览](/architecture/big-picture/)：一页展示所有组件，以及它们如何连接。
- [原则](/architecture/principles/)：Home Assistant 构建方式背后的理念。
- [架构决策是如何做出的](/architecture/decisions/)：架构在哪里讨论，以及如何参与。
- [代码仓库](/architecture/repositories/)：代码存放的位置。

## 深入了解

- [Home Assistant Core 内部](/architecture/core/)：从启动到实体（entity），位于核心的 Python 应用程序。
- [各组件如何通信](/architecture/connections/)：API 以及登录机制。
- [前端](/architecture/frontend/)：网页界面，以及仪表盘（dashboard）的工作原理。
- [Core 周边组件](/architecture/platform/)：Supervisor、Home Assistant OS、应用（apps）、伴侣应用（companion apps）、云服务以及语音。
- [Home Assistant 如何处理信任](/security/how-it-works/)，位于安全（Security）区域：Home Assistant 信任谁，以及哪里可能受到攻击。

## 准备好贡献了吗？

本区域解释事物的工作原理。实际的工作则在本网站的其他区域进行。每个区域都从一个小型的首次贡献开始：

| 你想参与的工作 | 前往 | 第一步 |
| --- | --- | --- |
| Home Assistant Core 和集成（integration） | [Core 和集成](/core/) | [你对 Core 的首次贡献](/core/first-contribution/) |
| 网页界面和仪表盘 | [前端](/frontend/) | [你的首次前端贡献](/frontend/first-contribution/) |
| 界面的外观、交互和文案 | [设计](/design/) | [你的首次设计贡献](/design/first-contribution/) |
| Android 和 Apple 应用 | [伴侣应用](/companion/) | [你的首次伴侣应用贡献](/companion/first-contribution/) |
| Supervisor 和 Home Assistant OS | [OS 和 Supervisor](/os/) | [你对 Supervisor 的首次贡献](/os/first-contribution/) |
| 与 Home Assistant 一起运行的软件 | [应用](/apps/) | [你的第一个应用](/apps/first-app/) |
| Assist 能理解的语句 | [语音翻译](/translate/voice/) | [贡献语句和回复](/translate/voice/contributing/) |
| 母语版本的 Home Assistant | [翻译](/translate/) | [你的首次翻译](/translate/first-contribution/) |
| 用户文档 | [撰写文档](/writing/) | [你的首次文档修复](/writing/first-contribution/) |
| 保障家庭安全 | [安全](/security/) | [你的首次安全贡献](/security/first-contribution/) |
| 测试和发布版本 | [发布](/releases/) | [你的首次 Beta 测试](/releases/first-contribution/) |

还不确定？[入门](/start/first-contribution/)中的[你的首次贡献](/start/first-contribution/)可以帮你做出选择。

## 本内容适合谁

所有想了解 Home Assistant 底层工作原理的人。这些页面假设你已经作为用户了解 Home Assistant。涉及代码的地方，Core 使用 Python，前端使用 TypeScript，但围绕代码的解释并不要求你读懂代码本身。

代码是唯一的事实来源。页面会指出所描述代码的存放位置，方便你查阅并继续深入阅读。每个页面都以 _参与本页工作_ 结尾：当你想修改页面所描述的内容时，该去哪里。

## 与谁交流

- **架构讨论**在[架构代码仓库](https://github.com/home-assistant/architecture/discussions)中进行。
- **工作中的问题**请前往 [Discord](https://www.home-assistant.io/join-chat) 上的 **#developers** 频道。看不到它？在 **Channels & Roles** 下，选择 **I want to contribute dev skills to Home Assistant**。
- 发现这些页面中有错误或过时的内容？请使用页面底部的编辑链接。
