import { homedir } from "node:os";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.argv[2];
const CAT_DIRS = ["comp", "rhythm", "style", "anti", "arch", "gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc"];
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
// 4) סולם הריווחים (design-dna/engine/spacing-and-axes.md §1). נולד מ-g149 (15.9.2026): הסולם היה כתוב ולא נאכף,
//    וליאב תפס שישה ערכים מחוץ לו. ratchet: מהלך חדש חייב 0 חריגות; מהלך קיים לא רשאי להוסיף. baseline ב-qa-spacing-baseline.json.
//    נבדקים margin/padding/gap בפיקסלים, כולל קצוות clamp. לא נבדקים: calc, vw/vh/em/%, וערכים עד 3px (קווי שיער). מנוס: /* qa-allow: scale */
const TOKENS = JSON.parse(readFileSync(join(homedir(), ".claude", "skills", "design-dna", "references", "engine", "tokens.json"), "utf8")); // one scale for the vault and the projects (23.9.2026)
const SPACING_SCALE = new Set([...TOKENS.spacing.scale, ...TOKENS.spacing.fluidLayer]);
// (?:-[a-z]+)* and not ?: padding-inline-end and margin-block-start have two hyphens, and until 23.9.2026 they were never checked
const SPACING_PROP = /(?:^|[;{\s])(margin(?:-[a-z]+)*|padding(?:-[a-z]+)*|gap|row-gap|column-gap)\s*:\s*([^;}]+)/g;
export function offScale(css) {
  const out = [];
  for (const blk of css.split("}")) {
    if (/qa-allow:\s*scale/.test(blk)) continue;
    for (const m of blk.matchAll(SPACING_PROP)) {
      const val = m[2].replace(/calc\((?:[^()]|\([^()]*\))*\)/g, " ");
      for (const px of val.matchAll(/(-?\d+(?:\.\d+)?)px/g)) {
        const n = Math.abs(parseFloat(px[1]));
        if (n <= 3 || (Number.isInteger(n) && SPACING_SCALE.has(n))) continue;
        out.push(`${m[1]}:${px[1]}px`);
      }
    }
  }
  return out;
}
const SPACING_BASE_PATH = join(ROOT, "_src", "qa-spacing-baseline.json");
const spacingBase = existsSync(SPACING_BASE_PATH) ? JSON.parse(readFileSync(SPACING_BASE_PATH, "utf8")) : {};
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
  const REUSABLE = new Set(["gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc"]);
  //    מנוס: /* qa-allow: literal, סיבה */ באותו כלל. משמש כשהליטרל מזווג בכוונה למשטח ליטרלי (טקסט כהה על מחוון לבן קשיח).
  if (REUSABLE.has(e.cat)) {
    const live = css.split("}").filter(b => !/qa-allow:\s*literal/.test(b)).join("}");
    for (const [hex, tok] of Object.entries(TOKEN_LITERALS)) {
      if (new RegExp(hex, "i").test(live)) problems.push(`${e.id}: token literal ${hex} in CSS, use var(${tok})`);
    }
  }
  // 2א) רשימת החובה של פוטר (23.9.2026): חוקי הפוטר ישבו בחמישה קבצים, ובכל פרויקט נשכח אחר. כל פוטר במאגר עומד בכולם.
  if (e.cat === "footer") {
    const H = e.html || "";
    if (!/href="[^"]*privacy/.test(H)) problems.push(`${e.id}: footer without a link to the privacy policy`);
    if (!/href="[^"]*accessibility/.test(H)) problems.push(`${e.id}: footer without a link to the accessibility statement`);
    if (!/liavmatzri\.co\.il/.test(H)) problems.push(`${e.id}: footer without Liav's credit line (site-planning, 12.8.2026)`);
    if (!/data-year/.test(H)) problems.push(`${e.id}: footer year is hard-coded, use data-year`);
    const blocks = css.split("}").map(k => ({ sel: (k.split("{")[0] || "").trim().split("\n").pop().trim(), body: k.split("{").slice(1).join("{"), raw: k }));
    for (const m of H.matchAll(/<a[^>]*href="tel:[^"]*"[^>]*>/g)) {
      if (!/dir="ltr"/.test(m[0])) problems.push(`${e.id}: tel: link without dir="ltr" (the number flips in RTL)`);
      // dir="ltr" alone still lets the number's neutral characters join the Hebrew run around it: isolate it (23.9.2026, doctrine audit)
      const cls = ((m[0].match(/class="([^"]*)"/) || [])[1] || "").split(/\s+/).filter(Boolean);
      const bidi = /unicode-bidi\s*:\s*(isolate|plaintext)/;
      const isolated = bidi.test(m[0]) || blocks.some(k => bidi.test(k.body) && (/href\^?="tel:/.test(k.sel) || cls.some(c => k.sel.split(/[\s,>+~]+/).some(part => part.split(/(?=[.#:[])/).includes("." + c)))));
      if (!isolated) problems.push(`${e.id}: tel: link without unicode-bidi:isolate`);
    }
    // lines: every border shorthand that draws (not only border-top/bottom), border-block, <hr>, and the inset-shadow hairline.
    // Fields, buttons and the demo frame (.fx) are outlines of a control, not separators. Widened 23.9.2026 after the doctrine
    // audit found the old check saw only border-top/bottom.
    if (/<hr[\s>/]/.test(H)) problems.push(`${e.id}: <hr> in a footer (no lines: separate with space and surface)`);
    for (const k of blocks) {
      if (/qa-allow:\s*line/.test(k.raw) || /\.fx\b|input|button|select|textarea|iframe|\.ft-btn/.test(k.sel)) continue;
      const draws = /(^|[;{\s])border(?:-top|-bottom|-block(?:-start|-end)?)?\s*:\s*[^;]*?(?:\b[1-9]\d*(?:\.\d+)?|\.\d*[1-9])px/.test(k.body)
        || /box-shadow\s*:\s*inset\s+0\s+-?[1-9]\d*px\s+0/.test(k.body);
      if (draws) problems.push(`${e.id}: separator line in a footer on "${k.sel}" (no lines: separate with space and surface)`);
    }
    if (!/footer[^{]*a[^{]*\{[^}]*transition|\.ftw a\{[^}]*transition/.test(css)) problems.push(`${e.id}: footer links without a hover transition (motion.md)`);
  }
  // 2א') הדר: בלי קו תחתון. הגבול בין ההדר לעמוד הוא צל שנדלק בגלילה (storeos-quiet, library/headers.md).
  //      hd1, hd2 ו-hd5 ציירו 1px עד 23.9.2026 ואף בדיקה לא ראתה. תפריטי המגירה (DRAWER) ושדות פטורים: שם קו מפריד בין פריטים.
  if (e.cat === "header") {
    for (const k of css.split("}")) {
      const sel = (k.split("{")[0] || "").trim().split("\n").pop().trim(), body = k.split("{").slice(1).join("{");
      // only the line UNDER the header: a full border is the outline of a floating pill (hd3, hd4...), and the chevron
      // of the drawer accordion (.md-acc i) is drawn with two borders
      if (/qa-allow:\s*line/.test(k) || /drawer|mnav|menu-panel|input|button|\.hbtn|\.md-acc|\si$/i.test(sel)) continue;
      if (/(^|[;{\s])border-(?:bottom|block-end)\s*:\s*[^;]*?\b[1-9]\d*(?:\.\d+)?px/.test(body)) problems.push(`${e.id}: line under a header on "${sel}" (the edge is a shadow on scroll, not a border)`);
    }
  }
  // 2ג) מצבי המרה (23.9.2026): כל פריט נושא את מה שהופך אותו לשימושי ולא רק ליפה.
  if (e.cat === "conv") {
    const H = e.html || "";
    if (/data-mbar/.test(H)) {
      if (!/safe-area-inset-bottom/.test(css)) problems.push(`${e.id}: mobile bar without env(safe-area-inset-bottom) (the iPhone home bar covers it)`);
      if (!/@media\s*\(min-width:\s*768px\)/.test(css)) problems.push(`${e.id}: mobile bar is not limited to phones (@media (min-width:768px) hides it)`);
      if (!/inert/.test(js)) problems.push(`${e.id}: a hidden bar stays in the tab order (set inert while it is off screen)`);
      if (!/focusin/.test(js)) problems.push(`${e.id}: the bar does not step aside while a field has focus (it sits on the keyboard)`);
      if (!/data-cta-end/.test(H)) problems.push(`${e.id}: the bar never leaves (mark the final contact section with data-cta-end)`);
    }
    if (/data-thanks/.test(H) && !/sessionStorage/.test(js)) problems.push(`${e.id}: thank-you page fires the conversion on every reload (guard it with sessionStorage)`);
    if (/data-404/.test(H) && !/href="\/"/.test(H)) problems.push(`${e.id}: 404 without a way to the home page`);
    if (/<form/.test(H) && !/aria-live|role="alert"/.test(H)) problems.push(`${e.id}: form states are not announced (aria-live or role="alert")`);
    if (/data-keep/.test(H) && !/localStorage/.test(js)) problems.push(`${e.id}: a failed send loses what was typed (keep a draft in localStorage)`);
  }
  // 2ב) מטריצת העורות (8.9.2026) הראתה שלושה דפוסים שנשברים אצל לקוח עם עור אחר, גם כשכל הטוקנים במקום:
  //     משטח טקסט עם background:#fff (על עור כהה: כרטיס לבן עם טקסט לבן), טקסט לבן על var(--ink)
  //     (על עור כהה ink בהיר), וטקסט לבן על var(--accent) (accent בהיר). מנוס: /* qa-allow: white */ לידיות וסמנים.
  if (REUSABLE.has(e.cat)) {
    for (const blk of css.split("}")) {
      if (/qa-allow:\s*white/.test(blk)) continue;
      const sel = blk.split("{")[0].trim().split("\n").pop().trim();
      if (/background(?:-color)?\s*:\s*#fff(?:fff)?\b/.test(blk)) problems.push(`${e.id}: background:#fff on "${sel}", use var(--card) or var(--bg) (or /* qa-allow: white */ for knobs)`);
      if (/background(?:-color)?\s*:\s*var\(--ink\b/.test(blk) && /(^|[;{\s])color\s*:\s*#fff\b/.test(blk)) problems.push(`${e.id}: white text on var(--ink) in "${sel}", use color:var(--bg)`);
      if (/background(?:-color|-image)?\s*:[^;]*var\(--accent\)/.test(blk) && /(^|[;{\s])color\s*:\s*#fff\b/.test(blk)) problems.push(`${e.id}: white text on var(--accent) in "${sel}", use color:var(--accent-ink)`);
    }
  }
  // 4) סולם הריווחים, רק במהלכים לשימוש חוזר (עורות ותורה מדגימים ולא מיובאים)
  if (REUSABLE.has(e.cat)) {
    const hits = offScale(css), base = spacingBase[e.id];
    if (base === undefined && hits.length) problems.push(`${e.id}: ${hits.length} spacing values off the scale (new entry must be on scale) -> ${hits.slice(0, 6).join(", ")}`);
    else if (base !== undefined && hits.length > base) problems.push(`${e.id}: spacing debt grew ${base} -> ${hits.length} -> ${hits.slice(0, 6).join(", ")}`);
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
      if (!existsSync(join(ROOT, d, m[1].split(/[?#]/)[0]))) problems.push(`${id}: missing asset ${m[1]}`); // ?v= cache-busting is not part of the file name
    }
  }
}

const missingPages = entries.filter(e => {
  const dirMap = { comp: "comp", rhythm: "rhythm", style: "style", anti: "anti", arch: "arch", gsap: "gsap", behavior: "behavior", header: "header", hero: "hero", footer: "footer", conv: "conv", css: "css", lm: "lm", misc: "misc" };
  return !existsSync(join(ROOT, dirMap[e.cat], e.id + ".html"));
}).map(e => e.id);
if (missingPages.length) problems.push("entries without a page: " + missingPages.join(","));

console.log(JSON.stringify({ entries: entries.length, pages, problemCount: problems.length, problems }, null, 1));
