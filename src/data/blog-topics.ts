// What a blog post can be about: an area of the site, or a topic of the blog
// itself, for posts about the project as a whole, like an announcement. A
// post lists them under `areas`.

import { AREAS } from "./areas";
import { withBase } from "../lib/base";

export interface BlogTopic {
  id: string;
  title: string;
  // Where the tag of a post links to: the area, or the blog filtered on it.
  href: string;
}

const BLOG_ONLY_TOPICS = [{ id: "announcements", title: "Announcements" }];

// In the order the blog filters show them: the topics of the blog first.
export const BLOG_TOPICS: BlogTopic[] = [
  ...BLOG_ONLY_TOPICS.map((topic) => ({ ...topic, href: withBase(`/blog/?area=${topic.id}`) })),
  ...AREAS.map((area) => ({ id: area.id, title: area.title, href: withBase(`/${area.id}/`) })),
];

export const BLOG_TOPIC_IDS = BLOG_TOPICS.map((topic) => topic.id) as [string, ...string[]];

export function getBlogTopic(id: string): BlogTopic | undefined {
  return BLOG_TOPICS.find((topic) => topic.id === id);
}
