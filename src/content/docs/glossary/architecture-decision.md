---
title: "架构决策"
description: "关于 Home Assistant 如何构建的决策，在 home-assistant/architecture 仓库中讨论并记录。"
sidebarGroup: "Contributing"
term:
  aliases:
    - "ADR"
    - "architecture decision record"
    - "architecture discussion"
  code:
    - "home-assistant/architecture"
  related:
    - "backward-incompatible-change"
    - "opportunity"
    - "epic"
  autolink:
    - "architecture decision"
    - "architecture decisions"
    - "ADR"
---

重大变更，例如一种新的实体（entity）类型或针对集成（integration）的新规则，都会先在那里作为讨论开始。一旦做出决定，该决定就会以架构决策记录（architecture decision record，ADR）的形式写入仓库的 `adr` 文件夹中，以便每个人都能查到决定了什么以及为什么这样决定。
