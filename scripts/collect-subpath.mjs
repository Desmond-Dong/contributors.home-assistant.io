// Moves everything from dist/ into dist/<BASE>/ (dist/contributors/), so the
// build output mirrors the URLs of the site: upload the contributors folder
// to the server directory /contributors and the site serves under
// https://www.hasscn.top/contributors.
//
// Astro builds the pages and assets at the root of dist/ even when a base is
// set (the base only shows up in URLs), so this steps runs after `astro build
// && pagefind`. Skips gracefully when nothing needs moving.
import { readdirSync, mkdirSync, renameSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const base = process.env.SITE_BASE_PATH || "/contributors";
const target = join(dist, base.replace(/^\//, ""));

const entries = readdirSync(dist).filter(
  (name) => name !== base.replace(/^\//, "") && !name.startsWith(".")
);

if (entries.length === 0) {
  console.log("dist already consolidated");
} else {
  mkdirSync(target, { recursive: true });
  for (const name of entries) {
    renameSync(join(dist, name), join(target, name));
  }
  console.log(`moved ${entries.length} entries into ${base}`);
}
