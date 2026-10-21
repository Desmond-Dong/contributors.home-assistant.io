#!/usr/bin/env node
/**
 * Machine translation of Astro content for the "zh" mirror.
 *
 * Usage (in CI, via scripts/sync-and-translate.yml):
 *   env FILE_LIST="path/to/file.md\nanother.mdx" node scripts/translate-upstream.mjs
 *
 * Env:
 *   TRANSLATION_API_KEY  API key of the OpenAI-compatible provider
 *   TRANSLATION_API_BASE Base URL, e.g. https://api.openai.com/v1 or https://openrouter.ai/api/v1
 *   TRANSLATION_MODEL    Model ID, e.g. gpt-4o-mini or a DeepSeek/GLM model
 *
 * Rules:
 * - Prose is translated to Simplified Chinese; code, links, JSX, frontmatter structure are untouched.
 * - Files whose structure looks broken after translation are retried once, then skipped (kept English).
 */

import { readFile, writeFile } from "node:fs/promises";

const API_BASE = (process.env.TRANSLATION_API_BASE || "https://api.openai.com/v1").replace(/\/$/, "");
const API_KEY = process.env.TRANSLATION_API_KEY || "";
const MODEL = process.env.TRANSLATION_MODEL || "gpt-4o-mini";
const CONCURRENCY = 4;

if (!API_KEY) {
  console.error("TRANSLATION_API_KEY is not set");
  process.exit(1);
}

const files = (process.env.FILE_LIST || "")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

console.log(`${files.length} file(s) to translate`);

const SYSTEM_PROMPT = `You translate documentation pages from English into Simplified Chinese (zh-Hans) for the Home Assistant contributor website. You return ONLY the full translated file, never explanations and never a code fence around the output.

Strict rules:
1. Translate visible prose only: paragraphs, list items, table cells, heading text, blockquotes, and the "title" and "description" values in the frontmatter (between the opening --- and the closing ---).
2. Do NOT translate or alter anything else:
   - Fenced code blocks, including their language tag.
   - Inline code in single backticks.
   - URLs, link targets, anchor fragments [#...].
   - YAML frontmatter keys, and values other than title/description (slug, dates, tags, ids, file paths).
   - JSX/MDX component names and attributes, e.g. keep <AstroSomething prop="..."> exactly; you may translate the text between the opening and closing tags of components if it is prose.
3. Keep Markdown structure identical: same number and order of headings, lists, tables, images, and blank lines. Tables keep their column count.
4. Use the established Chinese translations of Home Assistant terms: "entity" 实体, "service" 服务, "state" 状态, "automation" 自动化, "device" 设备, "integration" 集成, "helper" 辅助元素, "blueprint" 蓝图, "dashboard" 仪表盘, "area" 区域, "zone" 地理位置区域. On first use of a term that may be ambiguous, add the English in parentheses, e.g. 实体（entity）.
5. Keep brands, product names, and file names in English: Home Assistant, ESPHome, Zigbee, YAML, Python, etc.
6. Keep backtick counts identical to the source. Never invent or drop content, never merge or split paragraphs.`;

const RETRY_NOTE = `PREVIOUS ATTEMPT FAILED a structural comparison against the English source. Most likely you changed code blocks, inline code, component code, or Markdown structure. Return the corrected full translation with an EXACTLY preserved structure.`;

function countOf(text, re) {
  return (text.match(re) || []).length;
}

function structuralFingerprint(text) {
  return [
    countOf(text, /^```/gm) + countOf(text, /^~~~/gm),
    countOf(text, /`(?=[^\s`])|(?<=[^\s`])`/g) - countOf(text, /^[`~]{3,}/gm) * 2,
    countOf(text, /^#{1,6} /gm),
    countOf(text, /^[-*+] /gm),
    countOf(text, /^\|.*\|/gm),
    countOf(text, /<\/?[A-Z][A-Za-z0-9.]*[ />]/g),
  ];
}

const fingerprintsMatch = (a, b) =>
  a.every((value, i) => {
    // Small drift in list/bullet/table/inline-code counts is tolerated; the
    // code-fence, heading, and JSX counts must match exactly.
    if (i === 0 || i === 2 || i === 5) return value === b[i];
    return Math.abs(value - b[i]) <= 2;
  });

async function translateOnce(path, userPrompt) {
  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} for ${path}: ${detail.slice(0, 300)}`);
  }
  const data = await response.json();
  let text = data?.choices?.[0]?.message?.content ?? "";
  text = text.trim();
  if (/^```[^\n]*\n/.test(text)) text = text.replace(/^```[^\n]*\n/, "");
  if (/\n```$/.test(text)) text = text.replace(/\n```$/, "");
  return text;
}

async function translateFile(path) {
  let original;
  try {
    original = await readFile(path, "utf8");
  } catch {
    return { path, status: "missing (deleted upstream?)" };
  }

  let previous = null;
  try {
    previous = await readFile(path, "utf8");
  } catch {}

  const fingerprint = structuralFingerprint(original);

  const parts = [
    `Translate this documentation page (${path}) into Simplified Chinese.`,
    previous && previous !== original
      ? `A previous Simplified Chinese translation of an older version follows after SOURCE. It stays consistent with terminology already used on the site: carry over translations of unchanged sentences, and translate the new or changed parts. In case of doubt, translate fresh rather than guessing. --- PREVIOUS TRANSLATION --- ${previous} --- END PREVIOUS TRANSLATION ---`
      : "",
    "--- SOURCE ---",
    original,
  ].filter(Boolean);

  let translated = await translateOnce(path, parts.join("\n"));

  if (!fingerprintsMatch(structuralFingerprint(translated), fingerprint)) {
    translated = await translateOnce(
      path,
      `${parts.join("\n")}\n--- ${RETRY_NOTE}`,
    );
    if (!fingerprintsMatch(structuralFingerprint(translated), fingerprint)) {
      // Keep the English source: a partially wrong translation is worse than none.
      return { path, status: "skipped, structure mismatch" };
    }
  }

  await writeFile(path, `${translated.replace(/\s+$/, "")}\n`, "utf8");
  return { path, status: "translated" };
}

const failures = [];
let index = 0;

async function runner() {
  while (index < files.length) {
    const path = files[index++];
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await translateFile(path);
        console.log(`${result.status}: ${result.path}`);
        break;
      } catch (error) {
        failures.push(`${path}: ${error.message}`);
        console.error(`${error.message} (attempt ${attempt}/3)`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
        if (attempt === 3) console.error(`Giving up on ${path}`);
      }
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length || 1) }, runner));

if (failures.length) {
  console.error(`\n${failures.length} request failure(s):`);
  for (const failure of failures.slice(0, 20)) console.error(`  ${failure}`);
}
console.log("done");
