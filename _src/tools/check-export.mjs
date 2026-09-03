// בדיקה סטטית לקבצי הייצוא: מחפשת תלות נסתרת שתישבר אחרי הדבקה בפרויקט אחר.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIR = join(ROOT, "export");

const problems = [];
const inert = [];
const files = readdirSync(DIR).filter(f => f.endsWith(".html"));
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const f of files) {
  const id = f.replace(".html", "");
  const src = readFileSync(join(DIR, f), "utf8");

  // כל מקום שבו משתנה מוגדר: CSS רגיל, style אינליין, ו-JS דרך setProperty או אובייקט של gsap
  const defined = new Set();
  for (const m of src.matchAll(/(--[a-z0-9-]+)\s*:/gi)) defined.add(m[1]);
  for (const m of src.matchAll(/setProperty\(\s*["'](--[a-z0-9-]+)/gi)) defined.add(m[1]);
  for (const m of src.matchAll(/["'](--[a-z0-9-]+)["']\s*:/gi)) defined.add(m[1]);

  // הפניה בלי ברירת מחדל: var(--x) ולא var(--x, ...)
  const bare = new Set();
  for (const m of src.matchAll(/var\(\s*(--[a-z0-9-]+)\s*\)/gi))
    if (!defined.has(m[1])) bare.add(m[1]);
  if (bare.size) problems.push({ id, kind: "משתנה בלי הגדרה ובלי ברירת מחדל", detail: [...bare].join(", ") });

  // מחלקות שה-HTML משתמש בהן ואין להן שום כלל CSS בקובץ
  const cssBlock = (src.match(/<style>([\s\S]*?)<\/style>/) || [, ""])[1];
  const htmlBlock = src.slice(src.indexOf("<body>"), src.indexOf("</body>"));
  const used = new Set();
  for (const m of htmlBlock.matchAll(/class="([^"]*)"/g))
    m[1].split(/\s+/).filter(Boolean).forEach(c => used.add(c));
  // מחלקה שאין לה כלל CSS ואף ה-JS לא נוגע בה היא באמת מיותרת. מחלקה שה-JS
  // בוחר או מוסיף היא וו לוגי לגיטימי, ואין סיבה שיהיה לה כלל עיצוב.
  const jsAll = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join("\n");
  const orphan = [...used].filter(c => {
    const inCss = new RegExp("\\." + esc(c) + "(?![a-zA-Z0-9_-])").test(cssBlock);
    const inJs = new RegExp("[\"'.\\s]" + esc(c) + "(?![a-zA-Z0-9_-])").test(jsAll);
    return !inCss && !inJs;
  });
  // מחלקה ממוספרת כמו s1 או c3 היא וו אינדקס שנשאר מגרסה קודמת. היא לא עושה כלום
  // ולא שוברת כלום, ולכן היא מדווחת בנפרד ולא נספרת כתקלה.
  // וו אינדקס (s1, c3), או מחלקת סימון שחולקת תחילית עם מחלקה מעוצבת באותו קובץ
  // (ba-after ליד ba-layer). שתיהן לא עושות כלום ולא שוברות כלום.
  const marker = c => {
    if (/^[a-z]{1,3}-?\d+$/i.test(c)) return true;
    const stem = c.split("-")[0];
    return stem.length > 1 && new RegExp("\\." + esc(stem) + "-[a-z]").test(cssBlock);
  };
  const dead = orphan.filter(marker);
  const real = orphan.filter(c => !dead.includes(c));
  if (real.length) problems.push({ id, kind: "מחלקה בלי כלל CSS ובלי שימוש ב-JS", detail: real.join(", ") });
  if (dead.length) inert.push({ id, detail: dead.join(", ") });

  // שימוש בגלובל של GSAP בלי תג סקריפט מתאים. הערות מוסרות, אחרת אזכור בהערה נספר כשימוש.
  const jsTail = src.slice(src.lastIndexOf("<script>"))
    .replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const GLOBALS = ["gsap", "ScrollTrigger", "Flip", "Draggable", "Observer", "SplitText", "Lenis",
                   "MotionPathPlugin", "DrawSVGPlugin", "MorphSVGPlugin", "InertiaPlugin", "ScrollToPlugin"];
  for (const g of GLOBALS) {
    const usedG = new RegExp("\\b" + g + "\\b").test(jsTail);
    const loaded = new RegExp("/" + g + "\\.min\\.js", "i").test(src) || (g === "Lenis" && /lenis/i.test(src));
    if (usedG && !loaded) problems.push({ id, kind: "גלובל בלי סקריפט", detail: g });
  }

  // שאריות של תשתית המאגר שאסור שיגיעו לפרויקט
  for (const bad of ["vault.css", "MV.panel", "data-mvpanel", "assets/status.js", "assets/baseline.js", 'class="runway"'])
    if (src.includes(bad)) problems.push({ id, kind: "שארית של המאגר", detail: bad });

  // נכס מקומי שלא יעבור עם הקוד
  for (const m of src.matchAll(/(?:src|href)="(\.\.?\/[^"]+)"/g))
    problems.push({ id, kind: "נתיב יחסי לנכס מקומי", detail: m[1] });
}

const byKind = {};
for (const p of problems) byKind[p.kind] = (byKind[p.kind] || 0) + 1;
console.log(JSON.stringify({ files: files.length, problemCount: problems.length, byKind, problems, inertMarkup: inert }, null, 1));
