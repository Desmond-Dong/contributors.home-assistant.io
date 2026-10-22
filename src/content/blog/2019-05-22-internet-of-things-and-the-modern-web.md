---
title: 物联网与现代 Web
description: "Home Assistant 是世界上最大的开源家庭自动化平台。它支持超过 1000 种设备和服务，并且被广泛应用于各种场景：家庭、船只和博物馆。"
date: 2019-05-22
author:
  - Paulus Schoutsen
taxonomy:
  - core
---

[Home Assistant](https://www.home-assistant.io) 是世界上最大的开源家庭自动化平台。它[支持](https://www.home-assistant.io/components/)超过 1000 种设备和服务，并且被广泛应用于各种场景：家庭、[船只](https://hasspodcast.io/ha048/)和[博物馆](https://twitter.com/sjvanterpool/status/1124035433212649475)。

今天我想谈谈我们的 UI，我们要解决什么问题，以及我们是如何解决的。<span class='hide-small'>在深入探讨为什么、是什么以及怎么做之前，让我们先来看看我们的用户界面。这是<a href='https://demo.home-assistant.io' target='_blank'>我们的演示</a>的嵌入式版本，它完全可以交互。</span>

<iframe id='demo' class='hide-small' src="https://demo.home-assistant.io"></iframe>

<p class='show-small'><i>由于屏幕太小，嵌入式演示已被隐藏。<a href='https://demo.home-assistant.io' target='_blank'>在新窗口中打开演示。</a></i></p>

# 用例

在构建物联网平台时，有许多用例需要用户界面。请注意，在本文中，我们关注的是屏幕尺寸为手机或更大设备上的图形用户界面。

**安全。**用户希望在外出时快速查看家中的情况。他们想快速确认车库门是否已关闭，或者他们可能收到了后院有异常移动或水槽下方漏水的通知，需要查看一下。这些用户希望看到一个包含近期安全相关事件的日志簿（logbook）、当前的摄像头画面，以及门窗、水和移动传感器的当前状态。

**控制所有设备。**用户希望有一个统一的地方来控制他们所有的设备。他们对用户界面的目标是能够一目了然地快速查看房屋的各个部分，并控制灯光、开关、温控器和音乐。

**控制单个房间。**用户为每个房间中的设备构建界面。这些设备需要展示单个房间的所有控制项，并可选地提供关于整个房屋的额外信息以及控制房屋其他部分的选项。

**监控。**用户希望构建自己的仪表盘（dashboard），以可视化 Home Assistant 和其他数据库（如 InfluxDB）中的所有当前和历史数据。他们希望跟踪自己的能源使用情况、网络速度或当前通勤时间。

**管理与自动化。**用户希望拥有包含管理 Home Assistant 所需控制项的仪表盘。其中包含他们的自动化（automation）、脚本以及各种输入控件，用于配置自动化和脚本的参数。

如果您现在正在使用 Home Assistant，那么您的 UI 很可能是上述几个用例的混合体。今天的博文将讨论我们使用了哪些技术来构建一个 UI，让用户能够构建适合所有这些用例的 UI。

<!--truncate-->

# 需求

去年，当我们开始重新设计界面的一部分时，我们根据用例、构建之前界面的经验以及遇到的问题，列出了一份需求清单。

* **它需要零运行时魔法。**每个用户的需求都不同，因此如果我们在运行时做出决策，人们就会要求提供配置选项来影响这一决策。我们的 UI 需要基于配置做出所有决策，只有在没有配置的情况下才进行智能干预。我们仍然可以向用户建议配置，但一旦用户进行了编辑，该配置就归用户所有，并且只有用户自己才能更新它。
* **它需要可定制。**用户希望能够改变一切。重要的是，我们要允许用户通过配置选项来更改样式、名称或图标等内容。
* **它需要移动优先。**Home Assistant 不附带独立的移动应用程序。我们的 UI 将在移动设备、笔记本电脑以及介于两者之间的各种设备上使用。必须能够仅用一部手机就完成 Home Assistant 的安装、使用和配置。
* **它需要为新兴市场做好准备。**Home Assistant 希望让每个人都能使用智能家居。由于我们是免费开源的，全球各地形形色色的人都可以使用我们。其中大多数人使用的是运行缓慢的手机，网络也不稳定。我们的用户界面仍然需要保持可用，并能够在许多不同的手机上运行。
* **它需要可扩展。**由于需要覆盖众多用例，UI 的可扩展性非常重要。可扩展性让开发者可以进行实验，也让我们能够支持一切，而不必在 Home Assistant 核心中满足所有边缘情况/独特功能——否则这些功能将不得不被永久维护。
* **它需要易于开发。**人们很容易在工具链中迷失方向。尤其是在努力保持对所有不同设备支持的同时，还要提供简单的主题和配置。任何人都应该能够轻松地从用户转变为开发者，而无需花费 2 天时间准备开发环境。

# 现代 Web 是我们的首选平台

这份需求清单可不简单。Home Assistant 是一个开源项目，多亏了用户的慷慨支持，我们有 2 名全职开发者，以及全球各地庞大的志愿者开发者队伍共同为其工作。在这样的架构下，我们必须决定如何实现目标。只有一个平台完全符合要求，这个平台让我们能够提供主题和默认配置选项，也让用户能够导入外部组件来渲染页面的部分内容，并让我们能够以简单的方式组织代码，使用户能够从任何设备轻松访问它：现代 Web。

请注意，我说的是现代。近年来，浏览器、Web 框架和工具在提供轻松应对我们挑战的方式方面已经取得了长足的进步。我们见证了 CSS 属性、自定义元素（custom elements）的引入，而且所有主流 Web 工具都开箱即用地支持代码分割。

所有这些现代 Web 的优点都已广泛可用：桌面浏览器已成为“常青”浏览器，这意味着它们无需用户干预即可自行更新。Android 用户可以通过 Play 商店获取浏览器更新，而 Apple 通常会为其手机提供 5 年的更新，每次更新都包含更新的浏览器。

# 具体实现

我们所做的很多事情都基于他人或受他人启发。虽然我无法确切列出所有启发我们选择和方法的人，但 [Alex Russel](https://twitter.com/slightlylate)、[Rich Harris](https://twitter.com/Rich_Harris)、[Justin Fagnani](https://twitter.com/justinfagnani)、[Malte Ubl](https://twitter.com/cramforce) 的推文和演讲，以及 Polymer 团队的座右铭“少做事，保持懒惰”无疑给了我们启发。这些人帮助我们塑造了构建出色 UI 的思维方式。

如果您想知道一个开源项目是如何做出这么多酷炫的东西的，其实恰恰_因为_我们是开源项目。对于参与其中的志愿者来说，这很有趣。我们乐于追随最新的前端发展动态并加以实现，而不必担心有人抱怨我们的时间应该花在其他事情上。

* **[TypeScript](https://www.typescriptlang.org/) 是我们的首选语言。**Home Assistant 支持许多不同类型的设备，包含大量 API，并在前端支持许多不同的组件。指望人们记住所有这些是不可能的，而借助 TypeScript，谁都不必记住。TypeScript 是 JavaScript 的类型化版本，提供编译时类型检查和出色的自动补全。当我们发布版本时，TypeScript 会被转换为 JavaScript，因此浏览器中不需要特殊的运行时。
* **[Lit Element](https://lit-element.polymer-project.org/) 是我们的首选 Web 框架，为我们的用户界面提供支持。**Lit Element 是一个支持声明式模板的 Web 框架，gzip 压缩后仅 6kb，速度极快，并且对 TypeScript 有出色的支持。Lit Element 不需要任何构建工具，因此它也成为了我们开发者创建 UI 扩展时的首选框架。
* **[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)（自定义元素）是我们实现可扩展性的首选技术。**Web 在不断变化，我们希望吸引各种各样的开发者。因此我们不想选定某个框架并强迫用户使用它。相反，我们选择了浏览器内置的兼容层：自定义元素。自定义元素是一项浏览器规范，允许开发者定义自己的 HTML 标签，这些标签一旦添加到 DOM 中，就会与您的 JavaScript 代码交互，从而让您能够更新页面。

  自定义元素非常灵活。可以在实际 JavaScript 加载之前将标签添加到页面中。一旦加载完成，它就会接管并渲染正确的 UI。这使得我们能够快速构建页面，而无需提前加载所有内容，这一点非常完美。浏览器还允许我们监听自定义元素何时被定义，使我们能够在内容加载时重建 UI 的部分内容。
* **使用 Shadow DOM 隔离我们的组件。**虽然我们希望开发者能在我们的页面上运行代码，但我们不希望他们意外弄乱我们的内置组件，或者更糟糕的是，破坏整个页面。为了保护我们的组件，我们使用了 Shadow DOM。这使我们能够封装组件的 DOM 和样式。
* **允许使用 CSS 属性进行主题定制。**用户希望自定义内置组件，也希望自定义他们导入的第三方组件。无论开发者使用什么 Web 框架来构建他们的组件，这都必须有效。我们使用 CSS 属性解决了这个问题。CSS 属性是用户可以在整个 UI、每个标签页上、有时甚至每张卡片上设置的 CSS 值，用于自定义外观和体验。
* **依赖静态 DOM。**页面首次加载时，我们会根据用户的配置构建页面。之后，我们不会再改动它。相反，当状态（state）发生变化时，我们会将状态传递给所有相关组件，由 lit-html 高效地更新需要改变的部分。
* **发布现代 JavaScript。**我们为前端生成两个构建版本。其中一个版本面向现代浏览器，以模块方式导入，可以利用 lambda、类和 async/await 等现代特性。现代版本生成的代码要少得多，而且浏览器中的 JavaScript 引擎能够更好地理解代码的意图，从而带来更快的执行速度。

  我们过去使用浏览器 user agent 检测来决定发布哪个版本，但最近改为利用 `type=module`、`nomodule` 以及一个专门检查（以确保 Safari 10.1 不会同时加载两者）的前端特性检测。
* **使用 Service Worker 激进地预缓存。**Home Assistant 自带一个 service worker。Service worker 是一个在网站后台运行的独立 JavaScript 脚本，我们将其设置为提前下载显示 UI 所需的所有代码。这意味着一旦 service worker 启动并运行起来，对服务器的请求就只有数据了！在您登录时我们就已经注册了 service worker，这样当您完成登录时，前端就已经下载完毕。我们使用 [Workbox](https://developers.google.com/web/tools/workbox/) 在构建时生成 service worker。
* **将获取数据的代码与渲染 UI 的代码解耦。**我们在页面上加载的第一个东西是一个 5KB 的 JS 文件，它会发起与服务器的连接并开始请求必要的数据。与此同时，浏览器正在解析渲染初始页面所需的其余 JavaScript。我们使用 `link rel=preload` 来确保这个 JavaScript 文件是页面加载后第一个被下载的内容。
* **简单的状态管理。**为了能够与任何组件（无论是内部还是外部）共享我们的状态，我们决定自己实现状态管理。它是一个简单的对象，包含房屋的当前状态，并沿着我们的组件树向下传递。每当状态发生变化时，我们会复制一份并更新变化的部分，然后再次向下传递给所有组件。组件随后会重新渲染并显示最新状态。所有状态更新都由 Home Assistant JS Websocket 管理，并且都是在服务器上生成的。它们通过 WebSocket 推送到前端，使所有打开的 UI 保持同步，因为它们都会尽快收到最新的变更。

  [Home Assistant JS Websocket](https://github.com/home-assistant/home-assistant-js-websocket/) 是我们的 4KB WebSocket + 认证库，可以添加到任何网站，使其与 Home Assistant 实例集成。有关使用 50 行 JavaScript 构建的独立 Home Assistant UI，请参阅[这个 glitch 示例](https://hass-auth-demo.glitch.me/)。
* **使用模块和 unpkg 轻松开发扩展。**开发者无需运行任何工具即可开发自己的卡片（card）。您只需要创建一个 JavaScript 文件，在配置的 resource 部分引用它，就可以开始使用了（[文档中的示例](/frontend/custom-ui/card/)）。我们默认以 type=module 的方式导入资源，这样开发者在开发过程中可以直接从 http://unpkg.com 导入他们的依赖。
* **让查找包中的冗余变得容易。**如果我们能让查找不必要发布的内容变得更容易，开发者就更有可能发现它们并花时间清除冗余。因此，我们在代码库中包含了脚本，任何人都可以使用 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 快速运行包分析，查看哪些包增加了我们的包体积。这些分析结果[看起来像这样](https://s3.amazonaws.com/home-assistant-demos/bundle-analysis/report-20190522.html)。
* **对翻译进行代码分割。**我们使用 [lokalise.com](https://lokalise.com/) 来管理翻译。代码库中的所有翻译字符串都会自动上传到 lokalise.co，由志愿者翻译可用的字符串。我们有构建工具可以根据 UI 中不同的面板来分割翻译。这使我们能够按需动态加载所需的翻译。
* **去中心化路由。**应用程序的顶层只知道如何路由 URL 的第一部分。它知道要加载哪些代码以及要实例化哪个 web 组件。它会把 URL 的其余部分传递给面板，后续的路由可以在那里完成。这样可以避免随着更多部分被拆分出去而导致初始包不断增长。我们还为 web 组件创建了一个简单易用的路由器，支持代码分割和加载画面，让我们的开发者能够轻松地做正确的事。
* **避免在源码解析或类初始化时执行操作。**这一条属于“少做事，保持懒惰”的范畴。尽快完成初始渲染非常重要。因此，避免任何不必要的事情非常重要。Lit Element 通过提供在更新完成后运行的生命周期钩子来帮助实现这一点。不存在“在组件更新之前运行”的生命周期。

  Polymer 中体现这一理念的一个很好的例子是 debounce。他们的 debounce 不会生成一个防抖函数，相反，您只在想要调用函数时才调用它。它随后可能会调用该函数，并返回一段状态，您需要在下一次调用时将其传回。这样您就不需要在需要之前生成一个防抖函数。

# 挑战 / 未来的改进

我们做了很多很酷的事情，但工作永远没有尽头。以下是我们面临的一些挑战以及我们可能会探索的未来改进。在编写这份清单时，我有一个有趣的观察：我们遇到的一些问题并不是由于糟糕的设计，而是由于规模超出了设计的承受范围。当 UI 还比较小的时候，这些设计是正确的设计，但如今我们已经发展壮大，需要做出调整。

* **处理重复的自定义元素名称。**一个自定义元素只能被定义一次。这意味着如果某个组件导入了不同版本，就会出乱子。Home Assistant 拥有自己的专用操作系统 [Hass.io](https://www.home-assistant.io/hassio/)，它自带一个按照自己发布周期更新的控制面板。我们无法对版本兼容性做出任何保证，在多次破坏用户 UI 之后，我们坐下来解决了这个问题：我们在 iframe 中运行 Hass.io 控制面板，使自定义元素与父页面隔离。

  我们还将此功能作为开发者的扩展点提供。通过[自定义面板集成（custom panel integration）](https://www.home-assistant.io/components/panel_custom/)，他们可以构建自己的面板，并可选择 iframe 隔离。我们发现 iframe 隔离的另一个用例是 React。这个 Web 框架很流行，但在 ShadowDOM 中无法工作。通过将其隔离在 iframe 中，我们也解决了这个问题（[示例代码](https://github.com/home-assistant/custom-panel-starter-kit-react)）。
* **不再试图把所有事情都交给 Webpack。**当项目从 HTML imports 迁移到 JS imports 时，我们改用 WebPack 作为首选的打包工具。我们有点过于兴奋，把所有事情都放在 WebPack 中完成，包括生成 HTML。由于我们的前端有两个构建版本，我们实际上有两个 WebPack 构建。把所有事情都放在 WebPack 中，使我们无法创建能够同时引用现代版本和 ES5 版本构建的哈希文件名的文件。我们的目标是把 WebPack 的职责最小化为转译 TypeScript、打包文件和压缩。通过减少职责，我们将更容易尝试其他打包工具。我期待着试验 [Rollup](https://rollupjs.org/) + [Closure Compiler 插件](https://github.com/ampproject/rollup-plugin-closure-compiler)。
* **在现代 JavaScript 构建中使用[动态导入（dynamic imports）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_imports)。**WebPack 对于打包构建只有一种输出模式，它在运行时使用自己的依赖注入系统。如果我们能切换到 Rollup，我们应该能够利用浏览器内置的动态导入。
* **从主包中移除 Polymer。**UI 的第一个版本是使用 Polymer Web 框架和 [Paper elements](https://www.webcomponents.org/collection/polymerelements/paper-elements)（一组使用 Polymer 构建的 material design 组件）构建的。我们仍有一些依赖 Polymer 的核心 UI 代码，这意味着它仍然是初始 UI 包的一部分。这意味着目前 Polymer 和 Lit Element 都是我们初始包的一部分，不必要地使这个包变得臃肿。
* **翻译所有字符串。**我们仍然发布着尚未翻译的文本。Home Assistant 被各种人群在家庭中使用。用户能够以他们理解的语言使用 UI 非常重要。除此之外，我们最近在 RTL（从右到左）支持方面取得了长足进步，大部分已覆盖，但仍有一些地方可以改进。
* **一切去中心化。**我从 Malte Ubl 关于[设计大型 JavaScript 应用程序](https://medium.com/@cramforce/designing-very-large-javascript-applications-6e013a3291a3)的文章中得到的一个重要启示是避免中央配置。中央配置会随着应用程序的增长而不断增长，如果它是主包的一部分，您就会发布不必要的内容。这目前体现在我们代码中的两个地方：
    * 我们发布一个图标集，它作为发布的一部分构建，包含整个 UI 中引用的所有图标。随着 UI 的增长，这个图标集也在增长。它现在包含许多初始加载不再需要但仍然会被加载的图标。一个可以探索的方案是用支持包含 SVG 图标的 lit-html 模板的组件替换我们当前的图标渲染组件。这样我们就可以通过正常的 JS 导入来加载图标。这将使我们的 JS 打包工具只在包中包含代码所引用的图标。我们应该确保可以将这些文件标记为允许重复，否则 JS 打包工具会生成大量只包含单个图标的微小包。
    * 我们目前按语言和 UI 的每个面板拆分翻译文件，然后对每个文件单独进行指纹处理。这个清单文件包含在我们的初始构建中，随着我们的应用程序面板增多以及支持的语言增多，我们的清单文件现在已成为初始 UI 包的很大一部分。我们的第一步应该是为每种语言生成一个哈希值，这样每种语言只需包含一行。
* **分析当前的代码分割算法。**现在 WebPack 会确保每个 JavaScript 文件只被加载一次（按照规范）。然而，这意味着某些文件最终完全不再被打包，因为有太多代码分割后的代码引用该文件，它最终会进入自己独立的 chunk。目前我们的前端构建包含 126 个代码分割的 chunk，其中 85 个小于 5KB！我们需要运行追踪来确认这是否是一个问题，或者 service worker 是否掩盖了大部分影响。
* **停止使用 local storage。**我们使用 local storage 来存储认证令牌、语言偏好以及侧边栏是否显示。由于 local storage 是同步访问的，浏览器在等待从磁盘读取 local storage 时会停止执行页面上的任何操作。浏览器厂商正在开发像 [kv-storage](https://github.com/WICG/kv-storage) 这样的异步替代方案，它们可能成为可行的替代选择。
* **用 [Material Web Components](https://github.com/material-components/material-components-web-components) 替换 Paper elements。**Paper elements 已不再维护，Material Web Components 将成为其继任者，但它们仍在开发中。MWC 组件在底层使用 Lit Element，并依赖 material.io 的 Material design VanillaJS 实现。这意味着它们将比当前的 Paper elements 轻量得多，并且会得到真正的维护。
