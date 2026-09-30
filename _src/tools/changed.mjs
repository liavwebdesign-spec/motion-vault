#!/usr/bin/env node
// changed.mjs: מסמן פריטים שהמראה שלהם השתנה בתיקון יזום, כדי שיחזרו אצל ליאב ל"ממתין" עם לפני ואחרי.
// מדיניות (ליאב, 30.9.2026): תיקון יזום מאפס אישור רק כשמה שרואים השתנה; תיקון פנימי שומר על האישור.
//
// קלט: קובץ JSON { "<id>": "מה השתנה, במשפט אחד בעברית", ... }
// מה הכלי עושה לכל פריט:
//   1. assets/before/<id>-d.jpg ו-<id>-m.jpg: צילום "לפני" (מצב גלילה 0.5, 1280 ו-500) מתוך _src/tools/out/before/,
//      מוקטן ל-JPEG. התיקייה out/before נוצרת פעם אחת לפני סבב תיקונים (העתק של out/shots מהסריקה המלאה).
//   2. assets/baseline.js: s:null ו-t:עכשיו, כך שהאישור הישן בדפדפן של ליאב מתאפס לממתין.
//   3. assets/changes.js: window.MV_CHANGES[id] = { text, when }, שסבב הסקירה מציג עם כפתור "לפני".
// שימוש: node _src/tools/changed.mjs <changes.json>
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const input = JSON.parse(readFileSync(process.argv[2], "utf8"));
const BEFORE = join(ROOT, "_src", "tools", "out", "before");
const OUTDIR = join(ROOT, "assets", "before");
mkdirSync(OUTDIR, { recursive: true });

// 1. images, through Python/Pillow (Node has no image codec)
const jobs = [];
for (const id of Object.keys(input)) {
  for (const [w, suf, width] of [[1280, "d", 640], [500, "m", 250]]) {
    const src = join(BEFORE, `${id}-0.5-${w}.png`);
    if (existsSync(src)) jobs.push([src, join(OUTDIR, `${id}-${suf}.jpg`), width]);
    else console.log(`אין צילום לפני: ${id} ${w}`);
  }
}
if (jobs.length) {
  const py = `import json,sys\nfrom PIL import Image\nfor s,d,w in json.loads(sys.argv[1]):\n  im=Image.open(s).convert("RGB");h=round(im.height*w/im.width)\n  im.resize((w,h),Image.LANCZOS).save(d,"JPEG",quality=72,optimize=True)`;
  execFileSync("python", ["-c", py, JSON.stringify(jobs)], { stdio: "inherit" });
}

// 2. baseline: reset to pending
// parsed and written back whole (line surgery on this CRLF file joined lines, first try 30.9.2026);
// the comment block above the object is kept as it is
const now = Date.now();
const bpath = join(ROOT, "assets", "baseline.js");
const raw = readFileSync(bpath, "utf8");
const head = raw.slice(0, raw.indexOf("window.MV_BASELINE"));
const ctx = { window: {} };
new Function("window", raw)(ctx.window);
const B = ctx.window.MV_BASELINE;
for (const id of Object.keys(input)) B[id] = { s: null, note: "", t: now };
const q = s => s === null ? "null" : JSON.stringify(s);
const body = Object.entries(B).map(([id, r]) => `  ${JSON.stringify(id)}: { s: ${q(r.s)}, note: ${JSON.stringify(r.note || "")}, t: ${r.t || 0} },`).join("\r\n");
writeFileSync(bpath, `${head}window.MV_BASELINE = {\r\n${body}\r\n};\r\n`);

// 3. changes.js
const cpath = join(ROOT, "assets", "changes.js");
let changes = {};
if (existsSync(cpath)) { const m = /window\.MV_CHANGES = (\{[\s\S]*\});/.exec(readFileSync(cpath, "utf8")); if (m) changes = JSON.parse(m[1]); }
const day = new Date().toISOString().slice(0, 10);
for (const [id, text] of Object.entries(input)) changes[id] = { text, when: day };
writeFileSync(cpath, `/* מה השתנה בפריטים שחזרו לממתין אחרי תיקון יזום. נכתב על ידי _src/tools/changed.mjs, מוצג בסבב הסקירה עם צילום "לפני". */\nwindow.MV_CHANGES = ${JSON.stringify(changes, null, 1)};\n`);
console.log(`changed: ${Object.keys(input).length} פריטים חזרו לממתין, ${jobs.length} צילומי לפני`);
