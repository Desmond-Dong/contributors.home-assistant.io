---
title: 试用新的身份验证系统
description: 在 Home Assistant 0.69 中，我们引入了全新身份验证 API 的基础。
date: 2018-07-02
authors:
  - Paulus Schoutsen
areas:
  - core
---

在 Home Assistant 0.69 中，我们引入了全新[身份验证 API](/core/internals/auth/) 的基础。我们正在从单一的硬编码 API 密码切换到基于刷新/访问令牌（refresh/access token）的身份验证系统（由 OAuth2 驱动）。

在 Home Assistant 0.73 中，我与 [@awarecan] 一起冲刺，确保身份验证系统达到了最小可行产品（MVP）：

- 用户可以通过内置的命令行脚本进行管理。
- 前端将要求输入用户名和密码进行登录
- 如果您选择使用新系统，API 密码将不再可用。
- 为了避免对 Home Assistant 周边的生态系统造成硬性中断，我们添加了一个临时的旧版模式（legacy mode）来重新启用 API 密码支持。该功能将在未来被移除。

**该系统尚未准备好供大众使用**，我们仍需要添加 Hass.io 支持，以及一个用户界面来引导用户创建他们的第一个用户账户并管理用户。您可以在[这里](https://github.com/home-assistant/core/issues?q=is%3Aissue+is%3Aopen+label%3Aauth)关注（并参与！）待完成的工作。

如果您有兴趣试用，请继续阅读。

<!--truncate-->

## 试用方法

这要求您运行 Home Assistant 0.73 beta 或更高版本。

第一步是配置身份验证提供程序（auth provider）。我们将配置内置的 `homeassistant` 身份验证提供程序。该提供程序将成为默认提供程序，并将用户安全地存储在配置目录中。

```yaml
# Example configuration.yaml entry
homeassistant:
  auth_providers:
   - type: homeassistant
   # Uncomment next line if you want to enable legacy API password support
   # - type: legacy_api_password

# Enable the auth component
auth:
```

> [!NOTE]
> 在 Home Assistant 0.74 或更高版本中，以下其余说明已不再必要。

下一步是创建用户。打开终端并导航到您的 Home Assistant 安装目录。管理用户的脚本内置于 Home Assistant 中，
