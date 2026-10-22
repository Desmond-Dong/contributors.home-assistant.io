// Prefixes root-relative hrefs and srcs ("/docs/...") with the Astro base,
// so the site also works when it is served from a sub path, like
// hasscn.top/contributors. Markdown links in .md and .mdx reach the page as
// plain HTML links, and Astro does not rewrite those on its own, so this
// plugin does it while the page is compiled.
//
// Only links that start with a single slash are prefixed: protocol-relative
// ("//"), scheme relative paths, fragments ("#"), and absolute URLs are left
// alone. It must run after the last plugin that writes links, so their links
// get the prefix as well.

import { BASE_PATH } from "../config-base.mjs";

const ATTRIBUTES = ["href", "src", "poster"];

export function basePath() {
  return {
    name: "base-path",

    element: [
      {
        filter: [],
        visit(node, ctx) {
          if (!BASE_PATH || BASE_PATH === "/") {
            return;
          }
          for (const attribute of ATTRIBUTES) {
            const value = node.properties?.[attribute];
            if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.startsWith(`${BASE_PATH}/`)) {
              ctx.setProperty(node, attribute, BASE_PATH + value);
            }
          }
        },
      },
    ],
  };
}
