---
title: "Lovelace：getCardSize 现在支持异步了"
description: 自从我们在 Lovelace 中引入卡片懒加载（lazy loading）以来，获取懒加载卡片的卡片尺寸一直很困难。
date: 2020-06-01
authors:
  - Bram Kragten
areas:
  - frontend
---

自从我们在 Lovelace 中引入卡片懒加载（lazy loading）以来，获取懒加载卡片的卡片尺寸一直很困难。

过去，在元素加载完成之前，我们会发送一个错误元素，该元素会带有 `getCardSize` 函数。但那会是错误的尺寸。
当元素被定义后，我们会触发并重建事件，以便重新创建正确的卡片。

在 0.110 中，我们停止了这种做法，我们会返回正确的元素，但此时元素的构造函数尚未加载，因此它没有 `getCardSize`。
当构造函数加载完成后，元素会被升级，我们会设置配置。从那一刻起，我们就可以调用 `getCardSize`。

在这个版本中，我们更改了 `getCardSize` 的逻辑，使其会等待这一过程完成。这意味着某些卡片（例如堆叠卡片，stacks）会返回一个 Promise，因为它们必须等待其子元素被定义。

如果你是自定义卡片开发者，并且你的自定义卡片使用 `getCardSize` 来获取其他卡片的尺寸，你必须对其进行调整，以处理这些 Promise。

我们获取卡片尺寸的函数（你可以直接复制使用）现在如下所示：

```ts
export const computeCardSize = (
  card: LovelaceCard | LovelaceHeaderFooter
): number | Promise<number> => {
  if (typeof card.getCardSize === "function") {
    return card.getCardSize();
  }
  if (customElements.get(card.localName)) {
    return 1;
  }
  return customElements
    .whenDefined(card.localName)
    .then(() => computeCardSize(card));
};
```

首先，我们进行与之前相同的检查：如果元素具有 `getCardSize` 函数，我们将返回该值，它应该是一个 `number` 或解析为 `number` 的 `Promise`。

如果该函数不存在，我们将检查元素的构造函数是否已注册；如果已注册，这意味着该元素没有 `getCardSize`，我们将像以前一样返回 `1`。

如果元素尚未注册，我们将等待它注册完成，然后对现已定义的卡片再次调用同一函数以获取尺寸。
