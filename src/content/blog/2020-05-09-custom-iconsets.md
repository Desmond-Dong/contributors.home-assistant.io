---
title: 自定义图标集
description: 如果你是某个自定义图标集（custom icon set）的维护者，可能需要对其进行更新。
date: 2020-05-09
authors:
  - Bram Kragten
areas:
  - frontend
---

如果你是某个自定义图标集（custom icon set）的维护者，可能需要对其进行更新。

在 Home Assistant core 0.110 版本中，我们将改变图标的加载方式。我们不再一次性加载所有 `mdi` 图标，它们也不会再成为 DOM 元素。
这将为我们节省近 5000 个 DOM 元素，并缩短加载时间。

这也意味着我们不再使用或加载 `<ha-iconset-svg>`，如果你的图标集依赖此元素，你将需要修改你的图标集。

我们引入了一个新的 API，你可以通过一个异步（async）函数注册你的自定义图标集，我们会以图标名称作为参数来调用该函数。
我们期望它返回一个 Promise，其中包含所请求图标的对象。你的图标集可以自行决定加载和缓存的策略。

API 的格式为：
```ts
window.customIconsets: {
  [iconset_name: string]: (icon_name: string) => Promise< { path: string; viewBox?: string } > 
};
```
`path` 是 `svg` 的路径。也就是 `<path>` 元素 `d` 属性中的那个字符串。
`viewBox` 是可选的，默认为 `0 0 24 24`。

下面以图标 `custom:icon` 为例，给出一个非常简单的示例：

```js
async function getIcon(name) {
  return {
    path: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z",
  };
}
window.customIconsets = window.customIconsets || {};
window.customIconsets["custom"] = getIcon;
```

当图标 `custom:icon` 被设置时，Home Assistant 将调用 `getIcon("icon")` 函数。
