import { withBase } from "../lib/base";
// Every area of the site, in the order they appear on the homepage.
//
// An area is a documentation space of its own: its own folder under
// src/content/docs/<id>/, its own sidebar, and its own search filter.
// Adding an area here and creating its folder is all it takes.

export type AreaGroup = "start" | "build" | "shape" | "run" | "understand";

export interface Area {
  id: string;
  title: string;
  // Shown on the homepage tile, written from the visitor's point of view.
  action: string;
  description: string;
  group: AreaGroup;
  icon: string;
}

// The groups of the homepage and the area switcher, in this order.
export const AREA_GROUPS: Record<AreaGroup, string> = {
  start: "Start here",
  build: "Build the software",
  shape: "Design, write, translate",
  run: "Run the project",
  understand: "Understand how it works",
};

export const AREAS: Area[] = [
  {
    id: "start",
    title: "快速上手",
    action: "快速上手",
    description: "了解项目如何运作，以及如何完成你的第一次贡献。",
    group: "start",
    icon: "flag",
  },
  {
    id: "core",
    title: "核心与集成",
    action: "开发集成",
    description: "Python、核心与集成平台。",
    group: "build",
    icon: "code",
  },
  {
    id: "frontend",
    title: "Frontend",
    action: "开发前端",
    description: "仪表盘、面板与对话框。",
    group: "build",
    icon: "layout",
  },
  {
    id: "apps",
    title: "Apps",
    action: "构建应用",
    description: "打包与 Home Assistant 协同运行的软件。",
    group: "build",
    icon: "package",
  },
  {
    id: "marketplace",
    title: "应用市场",
    action: "分享你构建的东西",
    description: "发布集成、卡片、主题和蓝图，供他人安装。",
    group: "build",
    icon: "shopping-bag",
  },
  {
    id: "companion",
    title: "伴侣应用",
    action: "开发伴侣应用",
    description: "Android、iOS 与 macOS。",
    group: "build",
    icon: "smartphone",
  },
  {
    id: "os",
    title: "操作系统与 Supervisor",
    action: "开发操作系统和 Supervisor",
    description: "操作系统、硬件板与更新。",
    group: "build",
    icon: "cpu",
  },
  {
    id: "design",
    title: "设计",
    action: "设计体验",
    description: "基础、组件、模式与界面文案。",
    group: "shape",
    icon: "pen",
  },
  {
    id: "brand",
    title: "品牌",
    action: "以 Home Assistant 的身份发声",
    description: "Home Assistant 是谁、说话是什么腔调，以及如何使用它的名称和标志。",
    group: "shape",
    icon: "message",
  },
  {
    id: "writing",
    title: "撰写文档",
    action: "编写文档",
    description: "home-assistant.io 上的用户文档。",
    group: "shape",
    icon: "file",
  },
  {
    id: "translate",
    title: "Translations",
    action: "做翻译",
    description: "把 Home Assistant 带到你的语言。",
    group: "shape",
    icon: "globe",
  },
  {
    id: "community",
    title: "社区",
    action: "发展社区",
    description: "内容审核、社交媒体与活动。",
    group: "run",
    icon: "users",
  },
  {
    id: "releases",
    title: "版本发布",
    action: "测试 beta 和正式版",
    description: "试用 beta、报告问题，了解一个版本是如何发布的。",
    group: "run",
    icon: "tag",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    action: "看看我们去向何方",
    description: "想法如何变成计划中的工作，以及你在哪里能参与塑造接下来的一切。",
    group: "run",
    icon: "map",
  },
  {
    id: "architecture",
    title: "架构",
    action: "理解架构",
    description: "各部分如何衔接，以及背后的决策。",
    group: "understand",
    icon: "layers",
  },
  {
    id: "security",
    title: "Security",
    action: "守护家庭安全",
    description: "报告漏洞，并构建保护其所在家庭的软件。",
    group: "understand",
    icon: "shield",
  },
  {
    id: "data",
    title: "数据",
    action: "做数据工作",
    description: "统计分析和开放数据集。",
    group: "understand",
    icon: "chart",
  },
  {
    id: "glossary",
    title: "Glossary",
    action: "查阅术语",
    description: "一个术语只有一个含义。代码、界面文案与文档共用。",
    group: "understand",
    icon: "book",
  },
];

// Pages that are not an area, but that people look for next to the areas of
// a group, like the events calendar. They show on the homepage and in the
// area switcher, after the areas of their group.
export interface Shortcut {
  title: string;
  action: string;
  description: string;
  group: AreaGroup;
  icon: string;
  href: string;
}

export const SHORTCUTS: Shortcut[] = [
  {
    title: "活动与日历",
    action: "参加活动",
    description: "社区同步会与发布日，以及如何把它们加进你的日历。",
    group: "run",
    icon: "calendar",
    href: withBase("/community/reference/events/"),
  },
];

// Everything a group links to: its areas first, then its shortcuts.
export function groupLinks(group: AreaGroup): (Shortcut & { id?: string })[] {
  const areas = AREAS.filter((area) => area.group === group).map((area) => ({
    ...area,
    href: withBase(`/${area.id}/`),
  }));
  return [...areas, ...SHORTCUTS.filter((shortcut) => shortcut.group === group)];
}

export function getArea(id: string): Area | undefined {
  return AREAS.find((area) => area.id === id);
}
