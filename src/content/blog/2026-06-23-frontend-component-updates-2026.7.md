---
title: 2026.7 版本前端组件更新
description: ha-button、ha-button-toggle-group 和 ha-slider 现使用简短的 Web Awesome 尺寸名称。
date: 2026-06-23
authors:
  - Jan-Philipp Benecke
areas:
  - frontend
---

## 组件更新

### 组件尺寸使用 Web Awesome 名称

`ha-button`、`ha-button-toggle-group` 和 `ha-slider` 现使用简短的 Web Awesome 尺寸名称。

对于 `ha-button`，请使用：

```html
<ha-button size="s">Save</ha-button>
```

支持的值包括 `xs`、`s`、`m`、`l` 和 `xl`。

对于 `ha-button-toggle-group`，请使用 `s` 或 `m`：

```html
<ha-button-toggle-group size="s" .buttons=${buttons}></ha-button-toggle-group>
```

`ha-slider` 使用 `s` 或 `m`。

如果您的自定义卡片或编辑器在这些组件上仍使用 `small`、`medium` 或 `large`，请将其迁移为 `s`、`m` 或 `l` 等简短值。

### 虚拟化列表

我们为大型数据集添加了两个列表组件：

- `ha-list-virtualized`
- `ha-list-selectable-virtualized`

当选择器或对话框渲染的行数足以影响滚动或初始渲染时间时，请使用这些组件。虚拟化列表仅渲染可见行，同时保留来自 `ha-list-base` 的 roving-tabindex 键盘导航。

行通过 `aria-setsize` 和 `aria-posinset` 暴露无障碍元数据，因此即使只有部分列表在 DOM 中，辅助技术仍能获取完整的列表位置。

对于可选择列表，请渲染 `ha-list-item-option` 行。

## 上下文与编辑器基础设施

### 脏状态跟踪

对话框和编辑器现在具有共享的脏状态基础设施：

- `DirtyStateProviderMixin`
- `dirtyStateContext`
- `isDirtyState`
- `isEffectiveDirtyState`

对于需要阻止点击遮罩层关闭、仅在编辑后启用“保存”或与子组件协调脏状态的新对话框或编辑器，请使用 `DirtyStateProviderMixin`。

```ts
class MyDialog extends DirtyStateProviderMixin<MyState>()(LitElement) {
  public openDialog() {
    this._initDirtyTracking({ type: "shallow" }, this._state);
  }

  private _stateChanged(state: MyState) {
    this._updateDirtyState(state);
  }
}
```

`isDirtyState` 是原始比较，通常适用于启用“保存”。`isEffectiveDirtyState` 可以忽略等效的配置输出，例如当编辑器将显式默认值规范化回相同的有效配置时。

### 相关上下文

页面和编辑器现在可以为附近的选择器发布相关上下文：

- `relatedContext`
- `fireRelatedContext`
- `fireEntityRelatedContext`

当卡片编辑器、徽章编辑器、自动化（automation）跟踪页面或类似界面了解当前实体（entity）、设备（device）或区域（area）时，它可以提供该上下文。随后，实体选择器和添加元素搜索可以优先显示相关的实体、设备和区域。

```ts
fireEntityRelatedContext(this, "light.kitchen");
```

当编辑器不再有相关项目时，使用 `undefined` 清除上下文。

### 窄视口上下文

`narrowViewportContext` 暴露主 Home Assistant 视口是否处于窄布局。

仅需窄布局状态的组件可以使用此上下文，而无需通过多层属性接收 `narrow`。

```ts
@consume({ context: narrowViewportContext, subscribe: true })
private _narrow!: boolean;
```

## Lovelace 更新

### 策略重新生成控制

Lovelace 策略现在可以避免不必要的重新生成。

策略可以声明 `registryDependencies`，以便仅对其依赖的注册表使用默认的引用更改检查：

```ts
static registryDependencies = ["entities", "areas"] as const;
```

对于自定义逻辑，请实现 `shouldRegenerate()`：

```ts
static shouldRegenerate(config, oldHomeAssistant, newHomeAssistant) {
  return oldHomeAssistant.entities !== newHomeAssistant.entities;
}
```

如果两者均未提供，策略将保留以前的默认行为，并在实体、设备、区域或楼层发生变化时重新生成。
