---
title: 2026.8 前端组件更新
description: 我们新增了 ha-split-panel，这是 Web Awesome 分屏组件的 Home Assistant 封装。
date: 2026-07-31
authors:
  - Jan-Philipp Benecke
areas:
  - frontend
---

## 组件更新

### ha-split-panel

我们新增了 `ha-split-panel`，这是 Web Awesome 分屏组件的 Home Assistant 封装。

当 Home Assistant 页面、对话框或工具需要可调整大小的双窗格布局时，可以使用它。自定义卡片作者可以使用 Home Assistant 前端组件，但 Home Assistant 内部 UI API 可能会发生变化。

```html
<ha-split-panel position="40" snap="50%">
  <div slot="start">Editor</div>
  <div slot="end">Preview</div>
</ha-split-panel>
```

新的组件专属令牌：

```css
--ha-split-panel-divider-width
--ha-split-panel-divider-hit-area
--ha-split-panel-min
--ha-split-panel-max
--ha-split-panel-grip-display
```

### ha-tile-info 更新

`ha-tile-info` 为自定义卡片和类磁贴界面增加了更多布局控制。

新的组件专属令牌：

```css
--ha-tile-info-gap
--ha-tile-info-min-height
--ha-tile-info-primary-min-height
--ha-tile-info-primary-line-clamp
```

当主文本需要换行到多行时，请使用 `--ha-tile-info-primary-line-clamp`；当部分磁贴有副文本而其他磁贴没有时，请使用最小高度令牌以保持行对齐。

## 表单和选择器更新

### 条件性 ha-form 字段

`ha-form` 模式现在支持通过 `visible` 控制字段的条件可见性。

```ts
[
  {
    name: "advanced",
    selector: { boolean: {} },
  },
  {
    name: "advanced_name",
    visible: { field: "advanced", value: true },
    selector: { text: {} },
  },
]
```

支持的操作符包括：

```ts
"eq"
"not_eq"
"in"
"not_in"
"exists"
"not_exists"
```

你还可以使用 `and`、`or` 和 `not` 组合条件。

隐藏字段不会被渲染，并且在验证时会被跳过，因此当表单字段依赖于另一个值时，请使用 `visible` 而不是自定义的仅前端隐藏逻辑。

### 选择器新增

文本选择器现在支持 HTML pattern 验证：

```ts
{
  text: {
    pattern: "[a-z0-9_]+",
    validation_message: "Use lowercase letters, numbers, and underscores",
  },
}
```

这适用于单值和多值文本选择器。

实体（entity）选择器现在可以根据实体所属设备的属性进行过滤：

```ts
{
  entity: {
    filter: {
      domain: "sensor",
      device: {
        manufacturer: "Home Assistant",
        model: "Connect ZBT-1",
      },
    },
  },
}
```

还为时钟卡片日期格式编辑器新增了一个 `ui_clock_date_format` 选择器。

## Lovelace 更新

### state_color 迁移至 color

`entities` 和 `glance` 卡片现在支持使用 `color` 来替代 `state_color`。

修改前：

```yaml
type: entities
state_color: true
entities:
  - light.kitchen
```

修改后：

```yaml
type: entities
color: state
entities:
  - light.kitchen
```

使用 `color: state` 实现旧的 `state_color: true` 行为，使用 `color: none` 实现 `state_color: false` 行为。

## 自定义面板和应用

### 安全区域处理

自定义面板和附加组件应用 iframe 现在默认获得安全区域内边距，因此内容会避开刘海、状态栏和主屏幕指示条。

已经自行处理安全区域的自定义面板可以选择退出：

```yaml
panel_custom:
  - name: my-panel
    module_url: /local/my-panel.js
    handle_safe_area: true
```

对于基于 iframe 的自定义面板，Home Assistant 会将解析后的安全区域值作为 CSS 变量转发到 iframe 文档中：

```css
--safe-area-inset-top
--safe-area-inset-right
--safe-area-inset-bottom
--safe-area-inset-left
```

附加组件应用 iframe 在订阅 Home Assistant 属性时，也可以选择自行管理安全区域：

```js
window.parent.postMessage(
  {
    type: "home-assistant/subscribe-properties",
    handleSafeArea: true,
  },
  "*"
);
```

此时属性消息将包含 `safeAreaInsets`。

## 上下文和编辑器基础设施

### 全局脏状态

`DirtyStateProviderMixin` 现在还会发布全局脏状态。

当任何已连接的脏状态提供者存在未保存的更改时，将设置 `window.isDirtyState` 并且 Home Assistant 会触发 `dirty-state-changed` 事件。

```ts
window.addEventListener("dirty-state-changed", (ev) => {
  console.log(ev.detail.isDirty);
});
```

这对于需要避免中断带有未保存更改的活动编辑器或对话框的共享基础设施非常有用。
