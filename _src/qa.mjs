import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.argv[2];
const CAT_DIRS = ["comp", "rhythm", "style", "anti", "arch", "gsap", "react", "behavior", "css", "lm", "misc"];
const problems = [];
let pages = 0;

const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import(pathToFileURL(join(ROOT, "_src", "catalog", f)).href);
  mod.default.forEach(e => entries.push({ ...e, file: f }));
}

// ---- אכיפת התורה של motion.md על המאגר (7.9.2026) ----
// לפני זה ה-QA בדק תחביר בלבד, והמאגר סטה מהתורה שלו: ה-easing הנפוץ ביותר לא היה החתום,
// 26 מהלכים החזיקו ערכי טוקנים כליטרלים (ולכן לא ירשו את עור הפרויקט), ושלושה הנפישו layout.
const EASE_ALLOW = new Set([
  ".2,.6,.2,1",        // ה-easing החתום (ease-out), לכל דבר
  ".76,0,.24,1",       // in-out מאושר: מעבר על פני המסך (דלתות, ניווט מסך מלא)
  ".05,.7,.1,1",       // MD3 Emphasized, שכבה אקספרסיבית בלבד (motion.md §10)
  ".25,.1,.25,1",      // Apple HIG, שכבה אקספרסיבית בלבד
  ".4,0,.2,1",         // ריחוף אמביינטי / פרימיום, שכבה אקספרסיבית בלבד
]);
const normBezier = s => s.replace(/\s+/g, "").replace(/(^|,)0\./g, "$1.").replace(/(^|,)0(?=,|$)/g, "$10");
const TOKEN_LITERALS = { "#4a3aff": "--accent", "#16182b": "--ink", "#6a6d85": "--muted", "#e4e4ee": "--line", "#f7f7fa": "--bg" };
const LAYOUT_PROPS = /^(width|height|max-height|min-height|max-width|padding|padding-[a-z-]+|margin|margin-[a-z-]+|top|left|right|bottom|inset[a-z-]*|flex-basis|font-size|line-height)$/;

for (const e of entries) {
  const css = e.css || "", js = e.js || "";
  // 1) easing: רק מהרשימה. GSAP named eases (power2.out וכו') הם מחרוזות ולא נבדקים כאן.
  for (const m of (css + "\n" + js).matchAll(/cubic-bezier\(([^)]*)\)/g)) {
    const k = normBezier(m[1]);
    if (!EASE_ALLOW.has(k)) problems.push(`${e.id}: easing outside doctrine -> cubic-bezier(${m[1]}) (allowed: signed .2,.6,.2,1 or in-out .76,0,.24,1)`);
  }
  // 2) ערכי טוקנים כליטרלים ב-CSS: שוברים ירושת עור בפרויקט היעד.
  //    חל רק על מהלכים לשימוש חוזר. עורות (style) מגדירים צבעים בהגדרה, ועמודי הדוקטרינה
  //    (anti/arch/comp/rhythm) מדגימים ולא מיובאים, ולכן ליטרלים שם לגיטימיים.
  const REUSABLE = new Set(["gsap", "behavior", "css", "lm", "misc"]);
  if (REUSABLE.has(e.cat)) {
    for (const [hex, tok] of Object.entries(TOKEN_LITERALS)) {
      if (new RegExp(hex, "i").test(css)) problems.push(`${e.id}: token literal ${hex} in CSS, use var(${tok})`);
    }
  }
  // 3) transition על תכונות layout. grid-template-rows מותר (האקורדיון הדוקטרינרי). מנוס: /* qa-allow: layout */ באותו ערך.
  for (const m of css.matchAll(/transition\s*:\s*([^;}`]*)/g)) {
    const val = m[1];
    if (/qa-allow:\s*layout/.test(val)) continue;
    for (const part of val.split(",")) {
      const prop = part.trim().split(/\s+/)[0];
      if (prop && LAYOUT_PROPS.test(prop)) problems.push(`${e.id}: transition on layout property "${prop}" (use transform/opacity, or grid-template-rows for height)`);
    }
  }
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
  const dirMap = { comp: "comp", rhythm: "rhythm", style: "style", anti: "anti", arch: "arch", gsap: "gsap", react: "react", behavior: "behavior", css: "css", lm: "lm", misc: "misc" };
  return !existsSync(join(ROOT, dirMap[e.cat], e.id + ".html"));
}).map(e => e.id);
if (missingPages.length) problems.push("entries without a page: " + missingPages.join(","));

console.log(JSON.stringify({ entries: entries.length, pages, problemCount: problems.length, problems }, null, 1));
