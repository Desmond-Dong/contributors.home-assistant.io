---
title: 分区视图中自定义卡片的尺寸支持
description: 在 Home Assistant 2024.11 中，构建仪表盘时“分区”视图现已成为默认视图。
date: 2024-11-06
authors:
  - Paul Bottein
areas:
  - frontend
---

在 Home Assistant `2024.11` 中，构建仪表盘时“分区”视图（sections view）现已成为默认视图。此视图类型的新特性之一是可以调整卡片大小。

虽然每张卡片默认都支持调整大小功能，但自定义卡片可以实现一个新方法，以提供最佳的默认尺寸以及最小和最大尺寸，从而确保卡片在各种情况下都显示良好。

分区视图使用 12 列网格。在此示例中，卡片默认将占据 6 列 2 行，最小尺寸为 2×2。

```js
public getGridOptions() {
  return {
    rows: 2,
    columns: 6,
    min_rows: 2,
    min_columns: 3,
  };
}
```

有关更多详细信息，请参阅[自定义卡片尺寸](/frontend/custom-ui/card/#sizing-in-the-sections-view)文档。
