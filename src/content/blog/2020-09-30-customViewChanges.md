---
title: "Lovelace：自定义视图布局"
description: Custom Element 开发者现在可以创建自定义视图布局（Custom View Layouts），供用户加载和使用！
date: 2020-09-30
authors:
  - Zack Barett
areas:
  - frontend
---

Custom Element 开发者现在可以创建自定义视图布局（Custom View Layouts），供用户加载和使用！

在 0.116 中，我们将改变在 Lovelace 中创建视图（View）的方式。过去，我们有 2 种视图：默认视图和面板视图。在讨论为 Lovelace 添加拖放（Drag and Drop）功能时，我们决定可以做得更好，开始允许自定义视图类型。

自定义开发者现在将能够创建一个接收以下属性的视图：

```ts
interface LovelaceViewElement {
  hass?: HomeAssistant;
  lovelace?: Lovelace;
  index?: number;
  cards?: Array<LovelaceCard | HuiErrorCard>;
  badges?: LovelaceBadge[];
  setConfig(config: LovelaceViewConfig): void;
}
```

卡片（Card）和徽章（Badge）将由核心代码创建和维护，并交给自定义视图。自定义视图的用途是加载这些卡片和徽章，并以自定义的布局显示它们。

下面是一个示例：（注意：此示例并未包含所有属性，仅包含展示该示例所必需的内容）

```js
class MyNewView extends LitElement {
  setConfig(_config) {}

  static get properties() {
    return { 
      cards: {type: Array, attribute: false}
    };
  }

  render() {
    if(!this.cards) {
      return html``;
    }
    return html`${this.cards.map((card) => html`<div>${card}</div>`)}`;
  }
}
```

您可以像定义自定义卡片（Custom Card）一样，在 Custom Element 注册表（Custom Element Registry）中定义此元素：

```js
customElements.define("my-new-view", MyNewView);
```

您可以在我们的默认视图中找到这样的示例：`Masonry View`，位于此处：[frontend/src/panels/lovelace/views/hui-masonry-view.ts](https://github.com/home-assistant/frontend/blob/master/src/panels/lovelace/views/hui-masonry-view.ts)

下载并安装了您的新自定义视图的用户，随后可以通过将其视图的 YAML 配置编辑为如下内容来使用它：

```yaml
- title: Home View
  type: custom:my-new-view
  badges: [...]
  cards: [...]
```

自定义开发者可以为每个卡片添加一个 `layout` 属性，用于存储键（key）、位置信息、宽度、高度等：

```yaml
- type: weather-card
  layout:
    key: 1234
    width: 54px
  entity: weather.my_weather
```

### 破坏性变更

对于使用类似如下代码的自定义卡片开发者：

```js
const LitElement = Object.getPrototypeOf(customElements.get("hui-view"));
```

您将无法再使用 `hui-view` 元素来获取 LitElement，因为它已被更改为 `updatingElement`。作为替代，您可以使用：

```js
const LitElement = Object.getPrototypeOf(customElements.get("hui-masonry-view"));
```

但请注意！HA 并不支持这种方法。将来，这种导入 LitElement 的方式可能会失效。
