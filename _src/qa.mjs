import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.argv[2];
const CAT_DIRS = ["gsap", "react", "behavior", "css", "lm", "misc"];
const problems = [];
let pages = 0;

const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import(pathToFileURL(join(ROOT, "_src", "catalog", f)).href);
  mod.default.forEach(e => entries.push({ ...e, file: f }));
}

const ids = entries.map(e => e.id);
const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
if (dupes.length) problems.push("duplicate ids: " + dupes.join(","));

for (const e of entries) {
  ["id", "cat", "name", "desc", "when", "tech"].forEach(k => {
    if (!e[k]) problems.push(`${e.id}: missing ${k}`);
  });
  if (e.js) {
    try { new Function(e.js); }
    catch (err) { problems.push(`${e.id}: JS syntax -> ${err.message.slice(0, 70)}`); }
  }
  if (e.css) {
    const open = (e.css.match(/\{/g) || []).length;
    const close = (e.css.match(/\}/g) || []).length;
    if (open !== close) problems.push(`${e.id}: unbalanced CSS braces ${open}/${close}`);
    const badClamp = e.css.match(/clamp\([^)]*[0-9a-z%](?:\+|-)[0-9a-z]/gi);
    if (badClamp) problems.push(`${e.id}: clamp without spaces -> ${badClamp[0].slice(0, 32)}`);
  }
  if (e.html) {
    const o = (e.html.match(/<div/g) || []).length;
    const c = (e.html.match(/<\/div>/g) || []).length;
    if (o !== c) problems.push(`${e.id}: div open/close mismatch ${o}/${c}`);
  }
}

for (const d of CAT_DIRS) {
  const dir = join(ROOT, d);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    pages++;
    const id = f.replace(".html", "");
    const html = readFileSync(join(dir, f), "utf8");
    if (!entries.find(e => e.id === id)) problems.push(`${d}/${f}: STALE page, no catalog entry`);
    if (!html.includes('dir="rtl"')) problems.push(`${id}: page not RTL`);
    if (!html.includes("assets/status.js")) problems.push(`${id}: approval layer missing`);
    if (!html.includes("assets/vault.css")) problems.push(`${id}: stylesheet missing`);
    if (!html.includes("data-mvid")) problems.push(`${id}: MV-ID button missing`);
    for (const m of html.matchAll(/(?:src|href)="(\.\.\/[^"]+)"/g)) {
      if (!existsSync(join(ROOT, d, m[1]))) problems.push(`${id}: missing asset ${m[1]}`);
    }
  }
}

const missingPages = entries.filter(e => {
  const dirMap = { gsap: "gsap", react: "react", behavior: "behavior", css: "css", lm: "lm", misc: "misc" };
  return !existsSync(join(ROOT, dirMap[e.cat], e.id + ".html"));
}).map(e => e.id);
if (missingPages.length) problems.push("entries without a page: " + missingPages.join(","));

console.log(JSON.stringify({ entries: entries.length, pages, problemCount: problems.length, problems }, null, 1));
