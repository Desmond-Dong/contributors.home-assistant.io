// The base the site is served from ("/contributors", or "" at the root).
// import.meta.env.BASE_URL is inlined at build time, so this works in node
// and in browser bundles alike.

export const BASE_URL: string = import.meta.env.BASE_URL.replace(/\/$/, "");

// Prefixes a root-relative href ("/blog/") with the base ("/contributors/blog/").
export function withBase(href: string): string {
  return BASE_URL + href;
}
