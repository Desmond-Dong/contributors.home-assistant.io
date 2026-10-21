---
title: "合并（Merge）"
description: "将拉取请求（pull request）中的更改纳入其提交目标仓库。被合并（merged）意味着你的更改已被接受。"
sidebarGroup: "Contributing"
term:
  aliases:
    - "merged"
    - "merging"
    - "merge conflict"
  related:
    - "pull-request"
    - "maintainer"
    - "branch"
  autolink:
    - "merge conflict"
    - "merge conflicts"
---

只有维护者（maintainer）才能合并拉取请求。一旦合并，GitHub 会将其标记为 **Merged**。接下来会发生什么取决于仓库：对 `current` 分支上文档的修复会在网站重新构建后立即在 home-assistant.io 上生效，而对代码的更改则会在下一个版本发布时到达用户手中。

当你的分支和基础分支修改了同一个文件中相同的行时，就会发生合并冲突（merge conflict），此时 Git 无法自行将它们合并。必须有人来选择保留哪个版本。GitHub 可以在浏览器中解决简单的冲突，即使用拉取请求页面上的 **Resolve conflicts** 功能。
