// The share cards: the image a link preview shows in Slack, Discord, the
// forum, or a social network. This file says what is on the card of every
// page. How a card looks is in src/lib/og-render.ts, and
// src/pages/og/[...slug].png.ts makes the PNG files during the build.

import { AREA_GROUPS, type AreaGroup, getArea } from "../data/areas";
import { authorAvatar } from "../data/authors";
import { SITE } from "../data/site";
import { BLOG_DESCRIPTION, BLOG_TITLE, type BlogPost, formatDate, postHref, postPath } from "./blog";
import { areaOf, type DocsEntry, hrefOf, pathOf } from "./docs";
import { withBase } from "./base";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// The image of a page, by the path of the card: "design/foundations/color"
// is /og/design/foundations/color.png.
export function ogImagePath(slug: string): string {
  return withBase(`/og/${slug}.png`);
}

export interface CardLabel {
  text: string;
  icon: string;
  // The colors of the label: an area group, or the blog.
  tone: AreaGroup | "blog";
}

export interface CardAuthor {
  name: string;
  // Path of the avatar in public/, like /images/authors/frenck.png.
  avatar?: string;
}

export type Card =
  | {
      // A page of the docs or the blog.
      kind: "page";
      label: CardLabel;
      title: string;
      description: string;
      // The path of the page, shown at the bottom. Blog posts show their
      // byline there instead.
      path: string;
      byline?: { authors: CardAuthor[]; date: string };
    }
  | {
      // The homepage and the default card: the blue of the homepage hero.
      kind: "brand";
      title: string;
      description: string;
    };

// The same words as the hero of the homepage (src/pages/index.astro).
export const HOME_CARD: Card = {
  kind: "brand",
  title: "Help build the open home",
  description: "Code, design, documentation, translations, or community. Whatever you bring, this is where you start.",
};

// For pages without a card of their own, like the 404 page.
export const DEFAULT_CARD: Card = {
  kind: "brand",
  title: "Contribute to Home Assistant",
  description: SITE.description,
};

export const BLOG_CARD: Card = {
  kind: "page",
  label: { text: "Blog", icon: "rss", tone: "blog" },
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: "/blog/",
};

export function docsCard(entry: DocsEntry): Card {
  const area = getArea(areaOf(entry));
  if (!area) {
    throw new Error(`${entry.filePath} is not in an area, so it has no share card.`);
  }

  // The overview of an area already has the area as its title: the label
  // says which part of the project it belongs to instead.
  const isOverview = pathOf(entry) === area.id;

  return {
    kind: "page",
    label: { text: isOverview ? AREA_GROUPS[area.group] : area.title, icon: area.icon, tone: area.group },
    title: entry.data.title,
    description: entry.data.description,
    path: hrefOf(entry),
  };
}

export function postCard(post: BlogPost): Card {
  return {
    kind: "page",
    label: { text: "Blog", icon: "rss", tone: "blog" },
    title: post.data.title,
    description: post.data.description,
    path: postHref(post),
    byline: {
      authors: post.data.authors.map((name) => ({ name, avatar: authorAvatar(name) })),
      date: formatDate(post.data.date),
    },
  };
}

export function docsCardSlug(entry: DocsEntry): string {
  return pathOf(entry);
}

export function postCardSlug(post: BlogPost): string {
  return `blog/${postPath(post)}`;
}
