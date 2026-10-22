import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

function countOf(t, re) { return (t.match(re) || []).length; }
function fp(t) {
  return [
    countOf(t, /^```/gm) + countOf(t, /^~~~/gm),
    countOf(t, /`/g) - countOf(t, /^[ `~]{3,}/gm) * 2,
    countOf(t, /^#{1,6} /gm),
    countOf(t, /^[-*+] /gm),
    countOf(t, /^\|.*\|/gm),
    countOf(t, /<\/?[A-Z][A-Za-z0-9.]*/g),
  ];
}
const path = process.argv[2];
const orig = execSync(`git show HEAD:${path}`, { encoding: "utf8", maxBuffer: 10485760, shell: "bash" });
console.log("[fences, inlineCode, headings, bullets, tables, jsx]");
console.log("HEAD original:", JSON.stringify(fp(orig)));
