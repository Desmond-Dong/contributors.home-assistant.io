---
title: 在审查流程中引入 PR 草稿机制
description: Home Assistant 收到了大量的贡献，这绝对令人欣喜！但当 PR 数量众多时，就更难追踪它们的状态了。
date: 2023-02-07
authors:
  - Franck Nijhof
areas:
  - core
---

Home Assistant 收到了大量的贡献，这绝对令人欣喜！但当 PR 数量众多时，就更难追踪它们的状态了。

为了解决这个问题，我们在审查流程中引入了一个新流程：当 PR 需要进一步完善才能再次接受审查（或合并）时，会自动将其置为草稿状态。

我们已调整了机器人，当审查提出需要更改时，会自动将 PR 置为草稿状态。一旦完成这些更改，PR 的作者就可以点击“Ready for review”（准备审查）按钮，取消 PR 的草稿状态，使其再次准备好接受审查。

![草稿模式下 PR 底部的“Ready for review”按钮](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/ready-for-review.png)

在点击“Ready for review”按钮之前，请确保你已经处理了所有要求的更改，并且我们所有的 CI 任务和检查都已成功通过。

## 什么是草稿 PR？

草稿 PR 是指尚未准备好接受审查的 PR。它是一种让他人知道你正在进行某项工作的方式，但它还没有准备好接受审查和合并。

草稿 PR 可以通过 PR 右上角的“Draft”（草稿）标签来识别，并且在 GitHub 界面的各处都会显示灰色的合并图标。

![这就是处于草稿状态的 PR 的样子](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/pr-in-draft.png)

这并不意味着你应该先创建 PR 再开始着手工作；请只在你认为 PR 已经准备好接受审查和合并时才创建它。不过，在创建 PR 之后，也可能有理由将其重新置为草稿状态。

例如，创建 PR 会自动触发我们的 CI 任务和检查。这些检查可能会发现你的代码中需要调整的问题，当然，也可能是实际的审查提出了更改要求。

你可以随时通过点击 PR 右上角的“Convert to draft”（转换为草稿）链接，将你的任何 PR 重新置为草稿状态。

![将 PR 置为草稿也是你自己可以做到的操作](/img/en/blog/2023-02-07-introducing-PR-drafting-in-reviews/convert-to-draft.png)

## 我们为什么要这样做？

作为审查者，你会面对大量的 PR。其中一些已准备好接受审查，而另一些则没有。通常，了解这一点的唯一方法就是打开 PR 进行查看，结果却发现它仍在进行中。

这不仅浪费时间，也浪费精力。尤其是考虑到同一个 PR 每天会让多位审查者多次遇到这种情况。

PR 的草稿状态在 GitHub 的所有地方都可见。在通知、搜索以及 PR 概览中都可以看到。最重要的是，它可以轻松地进行筛选。

这让审查者能够更好地专注于当前真正需要他们关注的内容。

更多背景信息可以在这份 [Google 文档](https://docs.google.com/document/d/11_x2YUmAD07JN7JMM4YIIAWVGTJsOB0UptN8hlmWFWg/edit?usp=sharing)中找到。

或者，[在此页面上阅读关于我们审查流程的全部内容](/start/pull-requests/)。
