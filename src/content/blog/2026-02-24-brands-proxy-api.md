---
title: 自定义集成现在可以自带品牌图片了
description: 从 Home Assistant 2026.3 开始，自定义集成可以直接在集成目录中包含自己的品牌图片（图标和标志）。
date: 2026-02-24
authors:
  - Franck Nijhof
areas:
  - core
---

从 Home Assistant 2026.3 开始，自定义集成可以直接在集成目录中包含自己的品牌图片（图标和标志）。无需再提交到单独的仓库——只需将图片放入 `brand/` 文件夹，它们就会显示在 UI 中。

## 自定义集成的本地品牌图片

在你的自定义集成中添加一个 `brand/` 目录，并放入你的图标和标志文件：

```text
custom_components/my_integration/
├── __init__.py
├── manifest.json
└── brand/
    ├── icon.png
    └── logo.png
```

支持以下图片文件名：

- `icon.png` / `dark_icon.png`
- `logo.png` / `dark_logo.png`
- `icon@2x.png` / `dark_icon@2x.png`
- `logo@2x.png` / `dark_logo@2x.png`

本地品牌图片会自动优先于来自品牌 CDN 的图片。就这么简单——无需任何额外配置。

更多详情，请参阅[集成文件结构文档](/core/integrations/file-structure/#brand-images-in-custom-integrations)。

## 品牌图片现在通过本地 API 提供

为了实现本地品牌图片，所有品牌图片现在都通过 Home Assistant 本地 API 提供，而不是由浏览器直接从 CDN 获取。

一个新的 `brands` 系统集成通过两个端点代理品牌图片：

- `/api/brands/integration/{domain}/{image}` — 集成图标和标志
- `/api/brands/hardware/{category}/{image}` — 硬件图片

图片会缓存在本地磁盘上，并采用 stale-while-revalidate 策略提供服务，因此在断网期间仍然可用。

### 对前端的影响

`src/util/brands-url.ts` 中的 `brandsUrl()` 和 `hardwareBrandsUrl()` 辅助函数现在返回本地 API 路径而不是 CDN URL。如果你的自定义卡片或面板使用了这些辅助函数，则无需进行任何更改。

如果你在手动构建品牌图片 URL，请更新它们：

```typescript
// Old
const url = `https://brands.home-assistant.io/_/${domain}/icon.png`;

// New
import { brandsUrl } from "../util/brands-url";
const url = brandsUrl({ domain, type: "icon" });
```

这些端点需要身份验证。`brandsUrl()` 辅助函数会自动通过附加访问令牌来处理这一点。如果你手动构建 URL，请通过 `brands/access_token` WebSocket 命令获取令牌，并将其作为 `token` 查询参数附加。
