---
title: 自定义策略
description: 用代码生成整个仪表盘、视图或分区，并在新建仪表盘对话框中提供你的仪表盘。
order: 6
---

[策略（strategy）](/glossary/strategy/)是一段用于生成仪表盘配置的代码。仪表盘不再是一列卡片，而是声明“使用这个策略”，策略会在每次仪表盘加载时根据家中的内容生成卡片。Home Assistant 为你构建的**概览**仪表盘、区域仪表盘、地图和能源仪表盘都是策略。

共有三种类型：

- **仪表盘策略（dashboard strategy）**生成整个仪表盘及其所有视图。
- **视图策略（view strategy）**生成一个视图。
- **分区策略（section strategy）**在分区视图中生成一个分区。

它们协同工作。仪表盘策略通常会生成一个视图列表，每个视图都使用一个视图策略，这样每个视图只有在有人打开时才会被构建。

## 仪表盘策略

策略是一个带有静态 `generate()` 方法的自定义元素（custom element）。它接收策略配置和 `hass`，并返回一个仪表盘配置：

```js
class MyDemoDashboardStrategy extends HTMLElement {
  static async generate(config, hass) {
    const name = hass.config.location_name || "Home Assistant";

    return {
      title: config.title || "My demo dashboard",
      views: [
        {
          title: "Home",
          path: "home",
          cards: [
            { type: "markdown", content: `# Welcome to ${name}` },
            { type: "entities", entities: ["sun.sun"] },
          ],
        },
      ],
    };
  }
}

customElements.define(
  "ll-strategy-dashboard-my-demo",
  MyDemoDashboardStrategy
);
```

将其作为[资源（resource）](/frontend/custom-ui/resources/)加载，并将其用作仪表盘的配置：

```yaml
strategy:
  type: custom:my-demo
  title: Generated dashboard
```

标签名决定了策略的类型：`ll-strategy-dashboard-<name>`、`ll-strategy-view-<name>` 或 `ll-strategy-section-<name>`。`<name>` 就是配置中 `custom:` 后面的部分。`strategy` 部分中的所有内容（包括你自己的选项）都会作为 `config` 传递给 `generate()`。

[内置策略](https://github.com/home-assistant/frontend/tree/dev/src/panels/lovelace/strategies)是很好的示例。[地图仪表盘策略](https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/strategies/map/map-dashboard-strategy.ts)是一个比较小的例子。

## 视图策略

视图策略返回一个视图的配置。可以在任何仪表盘的视图中使用它：

```yaml
views:
  - strategy:
      type: custom:my-area
      area: living_room
```

下面的视图策略显示一个区域（area）的实体（entity）。它上面的仪表盘策略为每个区域创建一个使用该视图策略的视图。`hass.areas`、`hass.devices` 和 `hass.entities` 中保存着注册表，因此两者都不需要获取任何数据。

```js
class MyAreaDashboardStrategy extends HTMLElement {
  static async generate(config, hass) {
    return {
      title: config.title || "Areas",
      views: Object.values(hass.areas).map((area) => ({
        title: area.name,
        path: area.area_id,
        strategy: { type: "custom:my-area", area: area.area_id },
      })),
    };
  }
}

class MyAreaViewStrategy extends HTMLElement {
  static async generate(config, hass) {
    const areaId = config.area;
    const areaDevices = new Set(
      Object.values(hass.devices)
        .filter((device) => device.area_id === areaId)
        .map((device) => device.id)
    );

    const cards = Object.values(hass.entities)
      .filter(
        (entity) =>
          entity.area_id === areaId ||
          (!entity.area_id && areaDevices.has(entity.device_id))
      )
      .map((entity) => ({ type: "tile", entity: entity.entity_id }));

    return { cards: [{ type: "grid", cards }] };
  }
}

customElements.define(
  "ll-strategy-dashboard-my-area",
  MyAreaDashboardStrategy
);
customElements.define("ll-strategy-view-my-area", MyAreaViewStrategy);
```

两者都使用名称 `my-area`：一个作为仪表盘策略，一个作为视图策略。这是允许的，因为类型是标签名的一部分。

## 何时重新生成

策略在仪表盘加载时运行。默认情况下，当实体、设备、区域或楼层注册表发生变化时，它会再次运行，因此新设备无需重新加载页面即可显示。状态（state）变化不会触发它。

要改变这一行为，可以添加一个静态的 `registryDependencies`，列出你的策略所依赖的注册表：可以是 `entities`、`devices`、`areas`、`floors`、`labels` 和 `panels` 中的任意组合。对于永远不需要再次运行的策略，使用空列表。若要完全控制，可以添加一个静态的 `shouldRegenerate(config, oldHass, newHass)`，当策略应该再次运行时返回 `true`。

```js
class MyDemoDashboardStrategy extends HTMLElement {
  static registryDependencies = ["areas"];

  static async generate(config, hass) {
    // ...
  }
}
```

## 在新建仪表盘对话框中显示

在 `window.customStrategies` 中注册你的仪表盘策略，它就会出现在添加仪表盘对话框的**社区仪表盘**部分：

```js
window.customStrategies = window.customStrategies || [];
window.customStrategies.push({
  type: "my-demo",
  strategyType: "dashboard",
  name: "My demo dashboard",
  description: "A starter dashboard generated from JavaScript.",
  documentationURL: "https://example.com/my-demo-dashboard",
});
```

| 键 | 是否必需 | 含义 |
| --- | --- | --- |
| `type` | 是 | 策略的名称，不含 `custom:`。 |
| `strategyType` | 是 | `"dashboard"`。 |
| `name` | | 对话框中显示的名称。 |
| `description` | | 名称下方的一段简短描述。 |
| `documentationURL` | | 指向你的文档的链接。前端目前还不会在任何地方显示它。 |

必须先加载资源，对话框才能看到它。添加或更新资源后，请重新加载页面并再次打开对话框。

### 建议标题和图标

仪表盘策略可以通过静态的 `getCreateSuggestions(hass)` 为新仪表盘建议标题和图标。用户在创建之前仍然可以修改这两者。

```js
static getCreateSuggestions(hass) {
  return { title: "My demo dashboard", icon: "mdi:view-dashboard" };
}
```

## 设置

策略可以为其选项提供一个可视化编辑器。从静态的 `getConfigElement()` 返回一个编辑器元素。它的工作方式类似于[卡片编辑器](/frontend/custom-ui/card-editor/#a-visual-editor-of-your-own)：Home Assistant 会使用策略配置调用 `setConfig()` 并设置 `hass`，编辑器则通过 `config-changed` 事件发出新的配置。

还有两个静态选项：

- `configRequired = true`：该策略没有设置就无法工作。Home Assistant 会在创建仪表盘之前显示编辑器。
- `noEditor = true`：该策略没有可编辑的设置。

```js
class MyDemoDashboardStrategy extends HTMLElement {
  static configRequired = true;

  static getConfigElement() {
    return document.createElement("my-demo-strategy-editor");
  }

  static async generate(config, hass) {
    return {
      views: [{ cards: [{ type: "iframe", url: config.url }] }],
    };
  }
}
```

## 提示

- 保持 `generate()` 的速度。它在每次加载时都会运行，仪表盘会等待它完成。
- `hass` 中已经以简短形式包含了区域、设备和实体。对于它没有的数据，例如完整的实体注册表条目，请使用 `hass.callWS()`。在仪表盘策略中只调用一次，并通过配置将结果传递给你的视图策略。
- 策略可以使用任何卡片，包括你自己的自定义卡片。
- 为策略编写测试。它们是从数据到配置的纯函数，因此很容易测试。
