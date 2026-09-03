// Motion Vault builder: generates one page per animation + a filterable index.
// Run: node _src/build.mjs   (from the project root)
import { writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { portable, standalone } from "./portable.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATS = { gsap: "GSAP", react: "React", behavior: "התנהגויות", css: "CSS טהור", lm: "חתימה (LM)", misc: "מסגרת" };
const CDN = {
  gsap: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  ScrollTrigger: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
  SplitText: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js",
  Draggable: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  InertiaPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
  DrawSVGPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js",
  Flip: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
  ScrambleTextPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js",
  MotionPathPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js",
  ScrollToPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollToPlugin.min.js",
  CustomEase: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js",
  CustomWiggle: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomWiggle.min.js",
  Observer: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js",
  MorphSVGPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js",
  Lenis: "https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js",
};
// ספריות שאינן פלאגינים של GSAP: נטענות אבל לא נרשמות ב-registerPlugin
const NON_GSAP = new Set(["Lenis"]);

// שימושים אפשריים: הסינון השני של האינדקס. כל מהלך יכול להשתייך לכמה.
const USES_LABELS = {
  text: "טקסט וכותרות", media: "תמונות וגלריות", cards: "כרטיסים",
  process: "תהליך ושלבים", hero: "הירו ופתיחה", hover: "hover ומיקרו",
  feedback: "טעינה ופידבק", ambient: "רקע ואווירה", numbers: "מספרים ונתונים",
  nav: "ניווט ומבנה",
};
const USES = {
  g01: ["process", "media"], g02: ["media", "hero"], g03: ["hero", "media"],
  g04: ["text"], g05: ["media", "process"], g06: ["media"], g07: ["hover", "media", "hero"],
  g08: ["hover", "ambient"], g09: ["hover"], g11: ["media", "hover"],
  g12: ["ambient", "hero"], g13: ["cards"], g14: ["numbers"], g15: ["hero", "feedback"],
  g15b: ["hero", "feedback"], g16: ["text", "hover"], g17: ["cards", "hero"],
  g18: ["hero", "media"], g19: ["numbers", "ambient"], g20: ["process"], g22: ["process", "numbers"],
  r01: ["text", "ambient"], r02: ["ambient", "media"], r03: ["cards", "hover"],
  r04: ["media", "hero"], r05: ["media", "cards"], r06: ["media", "cards", "hover"],
  r07: ["media", "hero"], r08: ["ambient", "media"], r09: ["cards", "process"],
  r10: ["media"], r11: ["media", "cards"],
  b01: ["ambient", "nav"], b02: ["numbers"], b02b: ["media", "hover"], b03: ["nav"],
  b04: ["cards", "nav"], b10: ["nav", "ambient"],
  b11: ["feedback", "ambient"], b12: ["media", "hero"], b13: ["ambient"],
  b14: ["ambient"], b15: ["feedback"], b16: ["feedback"],
  css01: ["cards", "hover"], css02: ["nav", "hover", "text"], css03: ["hover"],
  css04: ["text"], css05: ["media", "text"], css06: ["nav"], css07: ["feedback"],
  css08: ["text", "hero"], css09: ["feedback"], css10: ["cards", "hover"], css12: ["cards", "ambient"],
  lm1: ["ambient", "hero"], lm3: ["cards", "process"], lm4: ["cards", "process"],
  lm5: ["hero"], lm7: ["hover"], lm8: ["ambient"], lm9: ["cards", "hover"],
  fluid: ["hero", "nav"],
  g23: ["cards", "media", "hover"], g25: ["process", "ambient"], g30: ["process", "hero"],
  css13: ["text", "hero"], css15: ["cards", "hover"],
  css16: ["media", "hover"], css17: ["nav", "feedback"],
  css19: ["ambient", "text"], css20: ["hover", "feedback"], css21: ["feedback", "hover"],
  r12: ["process", "ambient"], r13: ["cards", "ambient"], r14: ["numbers"], r17: ["media", "cards"],
  r18: ["ambient", "hero"], r19: ["ambient", "hero"], r20: ["ambient"],
  r21: ["nav", "hover"], r22: ["feedback", "cards"], r23: ["hero", "media"],
  r24: ["text", "hero"], r25: ["text"], r26: ["ambient", "hero"], r27: ["hover"],
  g31: ["hero", "media"],
  g35: ["text", "hero"], g36: ["ambient", "nav"], g37: ["media", "hero", "ambient"], g38: ["nav", "ambient"],
  b17: ["nav", "numbers"], b18: ["nav"],
  g39: ["text", "ambient"], b19: ["media", "cards", "hover"], b20: ["numbers", "feedback"],
  css23: ["media", "cards", "nav"],
  g40: ["process", "cards", "nav"], css24: ["text"],
  g42: ["text", "hero"], b22: ["media", "hero"],
  g43: ["media", "hover", "cards"], b23: ["nav"], b24: ["hover", "feedback"], b27: ["media", "nav", "cards"],
  g45: ["process", "numbers", "media"], b29: ["ambient", "nav"],
  b30: ["nav", "text"], b31: ["cards", "media", "nav"], b32: ["feedback", "text"], b33: ["media", "cards"],
  b34: ["cards", "media", "nav"], b35: ["process", "nav"], b36: ["feedback", "process", "text"],
  b37: ["cards", "process"], b38: ["nav"], b39: ["nav"], b40: ["nav", "ambient"],
  g46: ["numbers", "process"],
  b41: ["process", "media", "cards"], b42: ["ambient", "nav"], b43: ["numbers", "feedback"], b44: ["numbers", "cards"],
  b45: ["cards", "media", "nav"], b46: ["cards", "hover", "media"], g47: ["process", "media", "hero"],
  b47: ["media", "feedback"], b48: ["nav", "process"], b49: ["cards", "process", "media"], b50: ["nav", "ambient", "feedback"],
  b51: ["feedback", "nav"], g48: ["text", "hero"], b52: ["hero", "nav", "media"], b53: ["text", "hover", "nav"],
  b54: ["cards", "hover", "media"], b55: ["nav", "hover"], b56: ["feedback", "text", "nav"],
  g49: ["media", "process", "hero"], g50: ["nav", "feedback", "ambient"], g51: ["media", "ambient", "cards"],
  g54: ["media", "cards", "hero"], g56: ["media", "hero"],
  g57: ["media", "cards", "process"], g58: ["text", "hero", "ambient"], g59: ["cards", "process", "hero"],
  g60: ["text", "hero", "process"], g61: ["media", "hero", "ambient"], g62: ["media", "feedback"],
  g63: ["process", "hero", "ambient"], g64: ["hero", "text", "media"], g65: ["media", "cards", "process"],
  g66: ["ambient", "process", "media"], g67: ["cards", "process", "hero"], g68: ["process", "hero", "ambient"],
  g69: ["media", "feedback", "hero"], g70: ["text", "nav", "process"], g71: ["media", "cards", "numbers"],
  g72: ["cards", "process", "text"],
};

// רכיבי UI: הסינון השלישי של האינדקס. לכל מהלך אפשר לסמן כמה, והסימון מצטבר.
const ELEMS_LABELS = {
  btn: "כפתורים ו-CTA", card: "כרטיסים וקופסאות", img: "תמונות ומדיה",
  head: "כותרות וטקסט", list: "רשימות וגרידים", sect: "סקשנים ופריסה",
  nav: "תפריטים וניווט", form: "טפסים ושדות", over: "שכבות ומודאלים",
  cursor: "סמן ועכבר", page: "עמוד שלם",
};
const ELEMS = {
  g01: ["sect","list","img"],
  g02: ["img","over"],
  g03: ["img","over"],
  g04: ["head","sect"],
  g05: ["img","head","sect"],
  g06: ["img","list"],
  g07: ["cursor","img"],
  g08: ["cursor","sect"],
  g09: ["cursor","list"],
  g11: ["img","cursor"],
  g12: ["img","sect"],
  g13: ["list","card"],
  g14: ["sect"],
  g15: ["over","page"],
  g15b: ["over","page"],
  g16: ["head","cursor"],
  g17: ["card","list"],
  g18: ["sect","img","head"],
  g19: ["sect","img"],
  g20: ["sect","list"],
  g22: ["sect"],
  g46: ["sect","list"],
  g23: ["card","list","img"],
  g25: ["sect","img"],
  g30: ["sect","page"],
  g31: ["img","list"],
  g35: ["head","sect"],
  g36: ["sect","head"],
  g37: ["img","sect"],
  g38: ["page","sect"],
  g39: ["head","sect"],
  g40: ["sect","list"],
  g42: ["head"],
  g43: ["list","img","cursor"],
  g45: ["sect","list"],
  r01: ["head","sect"],
  r02: ["cursor"],
  r03: ["btn","card","head"],
  r04: ["img","head"],
  r05: ["card"],
  r06: ["img","cursor"],
  r07: ["img","form"],
  r08: ["sect","nav","cursor"],
  r09: ["card","over"],
  r10: ["img"],
  r11: ["img","list","cursor"],
  r12: ["sect"],
  r13: ["card"],
  r14: ["sect"],
  r17: ["img","list"],
  r18: ["nav"],
  r19: ["btn","sect","nav"],
  r20: ["sect"],
  r21: ["nav","cursor"],
  r22: ["list"],
  r23: ["btn","img","sect"],
  r24: ["head","sect"],
  r25: ["head"],
  r26: ["sect"],
  r27: ["btn","cursor"],
  b01: ["list","sect"],
  b02: ["sect"],
  b02b: ["img","list"],
  b03: ["btn","nav"],
  b04: ["list","card"],
  b10: ["sect"],
  b11: ["sect"],
  b12: ["img","sect"],
  b13: ["sect"],
  b14: ["sect","img"],
  b15: ["over","card"],
  b16: ["over","page"],
  b17: ["over","nav"],
  b18: ["nav","sect"],
  b19: ["card","img","cursor"],
  b20: ["btn","card"],
  b22: ["img","sect"],
  b23: ["nav","over"],
  b24: ["btn","cursor"],
  b27: ["nav","img"],
  b29: ["sect","page"],
  b30: ["list","head"],
  b31: ["card","list","form"],
  b32: ["form"],
  b33: ["img","over","list"],
  css01: ["card","cursor"],
  css02: ["nav","head"],
  css03: ["btn"],
  css04: ["head","over"],
  css05: ["sect","head"],
  css06: ["list"],
  css07: ["over","sect"],
  css08: ["head"],
  css09: ["form","head"],
  css10: ["card","cursor"],
  css12: ["card","sect"],
  css13: ["head"],
  css15: ["card","cursor"],
  css16: ["img","card","cursor"],
  css17: ["page","nav"],
  css19: ["card","list"],
  css20: ["btn"],
  css21: ["btn","form"],
  css23: ["list","page"],
  css24: ["head"],
  b34: ["list","card"],
  b35: ["sect","list"],
  b36: ["form"],
  b37: ["card","list"],
  b38: ["nav","page"],
  b39: ["nav","over"],
  b40: ["nav","sect"],
  b41: ["sect","list","img"],
  b42: ["list","sect"],
  b43: ["form","list"],
  b44: ["card","list","btn"],
  b45: ["list","card","img"],
  b46: ["list","card","img"],
  g47: ["sect","img"],
  lm1: ["sect","over"],
  lm3: ["sect"],
  lm4: ["card"],
  lm5: ["head","sect"],
  lm7: ["btn","card","cursor"],
  lm8: ["list","sect"],
  lm9: ["card"],
  b47: ["img","form"],
  b48: ["nav","sect"],
  b49: ["nav","card","img"],
  b50: ["btn","page"],
  b51: ["over","btn","page"],
  g48: ["head","sect"],
  b52: ["sect","nav"],
  b53: ["head","cursor","nav"],
  b54: ["card","list","cursor"],
  b55: ["nav","btn"],
  b56: ["over","head","form"],
  g49: ["img","sect"],
  g50: ["over","page","nav"],
  g51: ["img","list"],
  g54: ["list","img","sect"],
  g56: ["img","sect"],
  g57: ["img","list","sect"],
  g58: ["head","sect"],
  g59: ["card","list","sect"],
  g60: ["head","sect"],
  g61: ["img","sect"],
  g62: ["img","sect"],
  g63: ["sect","page"],
  g64: ["head","img","sect"],
  g65: ["list","card","img"],
  g66: ["sect","img","page"],
  g67: ["card","list","sect"],
  g68: ["sect","page"],
  g69: ["img","over","sect"],
  g70: ["head","nav","sect"],
  g71: ["img","card"],
  g72: ["card","sect"],
  fluid: ["sect","page"],
};

// סוג פרויקט: שכבת סינון שלישית, עצמאית מהשתיים האחרות. לא חובה לתייג את שתיהן.
const FIT_LABELS = { L: "דף נחיתה", S: "וואן-פייג'ר ותדמית" };
const FIT = {
  g01: ["S"],
  g02: ["S"],
  g03: ["S"],
  g04: ["L","S"],
  g05: ["S"],
  g06: ["S"],
  g07: ["S"],
  g08: ["S"],
  g09: ["S"],
  g11: ["L","S"],
  g12: ["S"],
  g13: ["L","S"],
  g14: ["L","S"],
  g15: ["S"],
  g15b: ["S"],
  g16: ["S"],
  g17: ["L","S"],
  g18: ["S"],
  g19: ["S"],
  g20: ["L","S"],
  g22: ["L","S"],
  g46: ["L","S"],
  g23: ["L","S"],
  g25: ["S"],
  g30: ["S"],
  g31: ["S"],
  g35: ["S"],
  g36: ["S"],
  g37: ["S"],
  g38: ["L","S"],
  g39: ["S"],
  g40: ["S"],
  g42: ["L","S"],
  g43: ["S"],
  g45: ["L","S"],
  g47: ["S"],
  g48: ["S"],
  g49: ["L","S"],
  g50: ["S"],
  g51: ["S"],
  g54: ["S"],
  g56: ["S"],
  g57: ["S"],
  g58: ["S"],
  g59: ["L","S"],
  g60: ["L","S"],
  g61: ["S"],
  g62: ["L"],
  g63: ["S"],
  g64: ["S"],
  g65: ["S"],
  g66: ["S"],
  g67: ["L","S"],
  g68: ["S"],
  g69: ["S"],
  g70: ["L","S"],
  g71: ["L","S"],
  g72: ["L","S"],
  r01: ["S"],
  r02: ["L","S"],
  r03: ["L","S"],
  r04: ["S"],
  r05: ["S"],
  r06: ["L","S"],
  r07: ["S"],
  r08: ["S"],
  r09: ["L","S"],
  r10: ["S"],
  r11: ["L","S"],
  r12: ["L","S"],
  r13: ["L","S"],
  r14: ["L","S"],
  r17: ["L","S"],
  r18: ["S"],
  r19: ["S"],
  r20: ["S"],
  r21: ["S"],
  r22: ["L","S"],
  r23: ["L","S"],
  r24: ["L","S"],
  r25: ["L","S"],
  r26: ["S"],
  r27: ["L","S"],
  b01: ["L","S"],
  b02: ["L"],
  b02b: ["L","S"],
  b03: ["L"],
  b04: ["L"],
  b10: ["S"],
  b11: ["L","S"],
  b12: ["S"],
  b13: ["S"],
  b14: ["L","S"],
  b15: ["L"],
  b16: ["L"],
  b17: ["S"],
  b18: ["L","S"],
  b19: ["L","S"],
  b20: ["L"],
  b22: ["L","S"],
  b23: ["L"],
  b24: ["L"],
  b27: ["L","S"],
  b29: ["S"],
  b30: ["L"],
  b31: ["L"],
  b32: ["L"],
  b33: ["L","S"],
  b34: ["L"],
  b35: ["L"],
  b36: ["L"],
  b37: ["L","S"],
  b38: ["L"],
  b39: ["L"],
  b40: ["L","S"],
  b41: ["L","S"],
  b42: ["S"],
  b43: ["L"],
  b44: ["L"],
  b45: ["L"],
  b46: ["L"],
  b47: ["L"],
  b48: ["L"],
  b49: ["L"],
  b50: ["L","S"],
  b51: ["L"],
  b52: ["L"],
  b53: ["S"],
  b54: ["L","S"],
  b55: ["L"],
  b56: ["L"],
  css01: ["L"],
  css02: ["L"],
  css03: ["L"],
  css04: ["L","S"],
  css05: ["L","S"],
  css06: ["L"],
  css07: ["L"],
  css08: ["L","S"],
  css09: ["L"],
  css10: ["L","S"],
  css12: ["S"],
  css13: ["S"],
  css15: ["S"],
  css16: ["L","S"],
  css17: ["L","S"],
  css19: ["L"],
  css20: ["L"],
  css21: ["L"],
  css23: ["L","S"],
  css24: ["L","S"],
  lm1: ["S"],
  lm3: ["S"],
  lm4: ["S"],
  lm5: ["S"],
  lm7: ["S"],
  lm8: ["S"],
  lm9: ["S"],
  fluid: ["S"],
};

// load all catalog modules
const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import("./catalog/" + f);
  entries.push(...mod.default);
}
const missing = entries.filter(e => !USES[e.id]).map(e => e.id);
if (missing.length) throw new Error("entries missing USES tags: " + missing.join(", "));
const missingE = entries.filter(e => !ELEMS[e.id]).map(e => e.id);
if (missingE.length) throw new Error("entries missing ELEMS tags: " + missingE.join(", "));
const missingF = entries.filter(e => !FIT[e.id]).map(e => e.id);
if (missingF.length) throw new Error("entries missing FIT tags: " + missingF.join(", "));

// טווח משקלים רציף ולא ערכים בדידים: קובץ אחד במקום חמישה, ומשקל שאפשר להנפיש בלי קפיצות
const FONT = `<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap" rel="stylesheet">`;

const LIVE = "https://liavwebdesign-spec.github.io/motion-vault";

// ההנחיה שנדבקת לסוכן קוד. היא נושאת את כל מה שהמהלך צריך כדי לעבוד ביעד,
// כולל הדברים שנשארים מאחור בהעתקה ידנית: כיוון המסמך, סדר הסקריפטים והרישום.
function briefFor(e, p) {
  const L = [];
  L.push(`מהלך מתוך Motion Vault: MV:${e.id} · ${e.name}`);
  L.push(`עמוד הדמו: ${LIVE}/${e.cat}/${e.id}.html`);
  L.push(`קובץ עצמאי לבדיקה: ${LIVE}/export/${e.id}.html`);
  L.push("");
  L.push(`מה זה עושה: ${e.desc}`);
  L.push(`מתי משתמשים: ${e.when}`);
  L.push("");
  L.push("כללי הטמעה:");
  L.push("1. הקוד למטה עומד בפני עצמו. כל משתנה CSS נושא ברירת מחדל, ולכן אם הפרויקט מגדיר --accent, --line, --ink או --gutter משלו, הרכיב יורש אותם אוטומטית. אם לא, הוא עדיין נראה נכון.");
  if (p.needsRtl) L.push('2. הרכיב מסתמך על dir="rtl" בשורש המסמך. בלי זה כל המיקומים הלוגיים מתהפכים.');
  if (p.scripts.length) L.push(`${p.needsRtl ? 3 : 2}. טען את הסקריפטים האלה לפי הסדר, לפני ה-JS:\n${p.scripts.join("\n")}`);
  L.push(`${(p.needsRtl ? 3 : 2) + (p.scripts.length ? 1 : 0)}. ה-JS חייב לרוץ אחרי שה-HTML כבר קיים ב-DOM.`);
  L.push("");
  L.push("=== CSS ===");
  L.push(p.css);
  L.push("");
  L.push("=== HTML ===");
  L.push(p.html);
  if (p.js) { L.push(""); L.push("=== JS ==="); L.push(p.js); }
  if (e.note) { L.push(""); L.push("הערת מימוש מהמאגר:"); L.push(e.note.replace(/\*\*/g, "")); }
  L.push("");
  L.push("=== המרה ל-React או ל-Lovable ===");
  L.push("הכללים כאן נבדקו בפועל בפרויקט Vite + React עם StrictMode דלוק, ולא נכתבו מהזיכרון.");
  L.push("");
  L.push("המרת המארקאפ:");
  L.push('- class ל-className, for ל-htmlFor, style="a:b" לאובייקט, ותגים ריקים נסגרים בעצמם.');
  L.push('- input עם checked חייב להפוך ל-defaultChecked. ב-JSX תכונת checked בלי onChange הופכת את השדה לקריאה בלבד והוא פשוט לא נלחץ.');
  L.push('- תכונות מקף הופכות ל-camelCase: playsinline ל-playsInline, autoplay ל-autoPlay.');
  L.push("- אם ה-HTML מכיל יותר מאלמנט אחד ברמה העליונה, עטוף ב-Fragment.");
  L.push("");
  L.push("ה-CSS:");
  L.push("- אל תמיר למחלקות Tailwind. חלק גדול מהכללים נשען על nth-child, על פסאודו-אלמנטים ועל משתני CSS שמונפשים, וזה נשבר בהמרה. שים את הקובץ כמו שהוא וייבא אותו בקומפוננטה.");
  if (p.libs.includes("gsap")) {
    L.push("");
    L.push("GSAP:");
    L.push("- אל תטען מ-CDN. התקן: npm i gsap");
    L.push(`- ייבא ורשום:\n  import gsap from "gsap";`
      + p.plugins.map(pl => `\n  import { ${pl} } from "gsap/${pl}";`).join("")
      + (p.plugins.length ? `\n  gsap.registerPlugin(${p.plugins.join(", ")});` : ""));
    L.push("- כל ה-JS נכנס ל-useEffect עם מערך תלויות ריק, בתוך gsap.context שמקבל ref לשורש הקומפוננטה, והניקוי קורא ל-ctx.revert().");
    L.push("");
    L.push("ארבע מלכודות שנתפסו בבדיקה אמיתית. ctx.revert לבדו לא מטפל באף אחת מהן:");
    L.push('1. סלקטורים גלובליים. החלף כל document.querySelector ב-querySelector על ה-ref. אחרת שני מופעים של אותו רכיב נלחמים על אותם אלמנטים.');
    L.push('2. addEventListener נשאר מחובר אחרי revert. ב-StrictMode ההרצה הראשונה מבוטלת אבל המאזינים שלה נשארים, וכל לחיצה מריצה את הלוגיקה פעמיים. נמדד: שני טווינים מתחרים על אותו אלמנט, וסגנון אינליין שנשאר תקוע. הפתרון: const ac = new AbortController(), להוסיף { signal: ac.signal } לכל מאזין, ולקרוא ל-ac.abort() בניקוי.');
    L.push('3. gsap.ticker.add אינו נרשם בקונטקסט. שמור את הפונקציה וקרא ל-gsap.ticker.remove(fn) בניקוי. נמדד: טיקר נוסף בכל כניסה לרכיב, בלי שאף אחד משתחרר.');
    L.push('4. כל אובייקט GSAP שנוצר בתוך קולבק אסינכרוני (מאזין אירוע, loadedmetadata, fonts.ready, setTimeout) נוצר אחרי ש-gsap.context כבר סיים לרוץ, ולכן הוא נשאר מחוץ לקונטקסט. שמור אליו הפניה וקרא ל-kill בניקוי.');
    L.push("");
    L.push("שלד הניקוי המלא:");
    L.push("  const root = useRef(null);");
    L.push("  useEffect(() => {");
    L.push("    const el = root.current;");
    L.push("    const ac = new AbortController();");
    L.push("    let tickFn = null, lateST = null;");
    L.push("    const ctx = gsap.context(() => { /* קוד המאגר, עם el.querySelector */ }, el);");
    L.push("    return () => {");
    L.push("      ac.abort();");
    L.push("      if (tickFn) gsap.ticker.remove(tickFn);");
    L.push("      if (lateST) lateST.kill();");
    L.push("      ctx.revert();");
    L.push("    };");
    L.push("  }, []);");
  } else {
    L.push("");
    L.push("JS:");
    L.push("- אין GSAP כאן. ה-JS נכנס ל-useEffect עם ref לשורש, והניקוי חייב לשחרר מה שנפתח: observer.disconnect() ל-IntersectionObserver, ו-AbortController לכל addEventListener. בלי זה StrictMode משאיר מופע תלוי באוויר.");
  }
  return L.join("\n");
}

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// הקוד עצמו נשלח כ-JSON ולא כטקסט בתוך HTML, כדי שלא יעבור שום שכבת בריחה נוספת
// בדרך אל הלוח. כפתור הקופי מקבל בדיוק את מה שהמניפסט מכיל.
function codePanel(e) {
  const p = portable(e, CDN, NON_GSAP);
  const payload = { brief: briefFor(e, p), css: p.css, html: p.html, js: p.js,
                    scripts: p.scripts.join("\n"), rtl: p.needsRtl };
  const json = JSON.stringify(payload).replace(/<\//g, "<\\/");
  return `<section class="mvcode">
  <h2>קוד להדבקה</h2>
  <p class="mvcode-lead">הקוד כאן עומד בפני עצמו. כל טוקן עיצוב נושא ברירת מחדל, מחלקות העזר של המאגר מוטמעות בו, ותגי הסקריפט מסודרים לפי הסדר הנכון. פרויקט שמגדיר <code>--accent</code> או <code>--line</code> משלו יורש אותם אוטומטית.${p.needsRtl ? ' הרכיב הזה מסתמך על <code>dir="rtl"</code>.' : ""}</p>
  <div class="mvcode-bar">
    <button class="cp cp-main" data-cp="brief">📋 העתק הנחיה מלאה לסוכן</button>
    <button class="cp" data-cp="css">CSS</button>
    <button class="cp" data-cp="html">HTML</button>
    ${p.js ? '<button class="cp" data-cp="js">JS</button>' : ""}
    ${p.scripts.length ? '<button class="cp" data-cp="scripts">תגי סקריפט</button>' : ""}
    <a class="cp cp-link" href="../export/${e.id}.html" target="_blank" rel="noopener">פתח קובץ עצמאי ↗</a>
  </div>
  <details class="mvcode-see"><summary>הצג את הקוד כאן</summary>
    <h3>CSS</h3><pre><code>${esc(p.css)}</code></pre>
    <h3>HTML</h3><pre><code>${esc(p.html)}</code></pre>
    ${p.js ? `<h3>JS</h3><pre><code>${esc(p.js)}</code></pre>` : ""}
  </details>
  <script type="application/json" id="mvcode-data">${json}</script>
</section>`;
}

function page(e) {
  const libs = (e.libs || []).map(l => `<script src="${CDN[l]}"></script>`).join("\n");
  const register = (e.libs || []).filter(l => l !== "gsap" && !NON_GSAP.has(l)).join(", ");
  const runway = e.runway === false ? "" : `<div class="runway">גלול למטה, הדמו מגיע ↓</div>`;
  const runwayEnd = e.runway === false ? "" : `<div class="runway">עוד מסלול גלילה. נסה גם חזרה למעלה ↑</div>`;
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${e.id.toUpperCase()} · ${e.name} | Motion Vault</title>
${FONT}
<link rel="stylesheet" href="../assets/vault.css">
<style>
${e.css || ""}
</style>
</head>
<body>
<div class="vtop"><div class="vtop-in">
  <a class="vback" href="../index.html">→ לכל המאגר</a>
  <h1><span class="vid">${e.id.toUpperCase()}</span> · ${e.name}</h1>
  <span class="chip cat-${e.cat}">${CATS[e.cat]}</span>
  <span class="chip">${e.tech}</span>
  ${(USES[e.id] || []).map(u => `<span class="chip use">${USES_LABELS[u]}</span>`).join("")}
  <span class="chip st-pending" data-mvchip>ממתין</span>
  <button class="mvid" data-mvid="MV:${e.id}"><code>MV:${e.id}</code> העתק מזהה</button>
</div></div>
<div class="vintro">
  <p>${e.desc}</p>
  <p class="when"><b>מתי משתמשים:</b> ${e.when}</p>
  <div class="mvpanel" data-mvpanel="${e.id}"></div>
  <p class="inherit-note">הדמו כאן עיצובי-ניטרלי בכוונה. כשהמהלך נכנס לפרויקט, מיובאת רק ההתנהגות: הצבעים, הרדיוסים, הפונטים והצללים יורשים את העיצוב של אותו פרויקט.</p>
</div>
${runway}
${e.html}
${runwayEnd}
${e.note ? `<div class="demo-note">${e.note}</div>` : ""}
${codePanel(e)}
${libs}
<script src="../assets/baseline.js"></script>
<script src="../assets/status.js"></script>
<script>
if(window.MV)MV.panel(document.querySelector("[data-mvpanel]"));
document.querySelector(".mvid").addEventListener("click",function(){
  navigator.clipboard.writeText(this.dataset.mvid+" · ${e.name}").then(()=>{
    this.classList.add("copied");const c=this.querySelector("code").textContent;
    this.innerHTML="<code>"+c+"</code> הועתק ✓";
    setTimeout(()=>{this.classList.remove("copied");this.innerHTML="<code>"+c+"</code> העתק מזהה";},1800);
  });
});
(function(){
  var data=JSON.parse(document.getElementById("mvcode-data").textContent);
  document.querySelectorAll(".mvcode .cp[data-cp]").forEach(function(b){
    b.addEventListener("click",function(){
      var txt=data[b.dataset.cp]; if(!txt)return;
      navigator.clipboard.writeText(txt).then(function(){
        var was=b.textContent; b.classList.add("copied"); b.textContent="הועתק ✓";
        setTimeout(function(){b.classList.remove("copied");b.textContent=was;},1600);
      });
    });
  });
})();
${register ? `gsap.registerPlugin(${register});` : ""}
${e.js || ""}
</script>
</body>
</html>`;
}

function indexPage() {
  const cards = entries.map(e => `<a class="vcard" data-id="${e.id}" data-cat="${e.cat}" data-uses="${(USES[e.id] || []).join(" ")}" data-elems="${(ELEMS[e.id] || []).join(" ")}" data-fit="${(FIT[e.id] || []).join(" ")}" data-txt="${("MV:" + e.id + " " + e.name + " " + e.desc + " " + e.tech + " " + (USES[e.id] || []).map(u => USES_LABELS[u]).join(" ") + " " + (ELEMS[e.id] || []).map(u => ELEMS_LABELS[u]).join(" ") + " " + (FIT[e.id] || []).map(u => FIT_LABELS[u]).join(" ")).replace(/"/g, "")}" href="${e.cat}/${e.id}.html">
  <div class="row"><span class="vid">MV:${e.id}</span><span class="chip cat-${e.cat}">${CATS[e.cat]}</span><span class="chip stchip st-pending">ממתין</span></div>
  <h3>${e.name}</h3><p>${e.desc}</p>
  <div class="row"><span class="chip">${e.tech}</span>${(USES[e.id] || []).map(u => `<span class="chip use">${USES_LABELS[u]}</span>`).join("")}${(ELEMS[e.id] || []).map(u => `<span class="chip elem">${ELEMS_LABELS[u]}</span>`).join("")}</div>
</a>`).join("\n");
  const REPORT_LIST = JSON.stringify(entries.map(e => ({ id: e.id, name: e.name, cat: e.cat })));
  const counts = Object.fromEntries(Object.keys(CATS).map(c => [c, entries.filter(e => e.cat === c).length]));
  const fbtns = Object.entries(CATS).map(([k, v]) => `<button class="fbtn" data-f="${k}">${v} · ${counts[k]}</button>`).join("");
  const ucounts = Object.fromEntries(Object.keys(USES_LABELS).map(u => [u, entries.filter(e => (USES[e.id] || []).includes(u)).length]));
  const ubtns = Object.entries(USES_LABELS).map(([k, v]) => `<button class="ubtn" data-u="${k}">${v} · ${ucounts[k]}</button>`).join("");
  const ecounts = Object.fromEntries(Object.keys(ELEMS_LABELS).map(u => [u, entries.filter(e => (ELEMS[e.id] || []).includes(u)).length]));
  const ebtns = Object.entries(ELEMS_LABELS).map(([k, v]) => `<button class="ebtn" data-e="${k}">${v} · ${ecounts[k]}</button>`).join("");
  const FIT_ICON = { L: "🎯", S: "✨" };
  const fcounts = Object.fromEntries(Object.keys(FIT_LABELS).map(u => [u, entries.filter(e => (FIT[e.id] || []).includes(u)).length]));
  const fitbtns = Object.entries(FIT_LABELS).map(([k, v]) => `<button class="fitbtn" data-fit="${k}">${FIT_ICON[k]} ${v}<b class="fn">${fcounts[k]}</b></button>`).join("");
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Motion Vault | מאגר האנימציות של ליאב</title>
${FONT}
<link rel="stylesheet" href="assets/vault.css">
</head>
<body>
<div class="vhead">
  <h2>Motion Vault</h2>
  <p>מאגר האנימציות החי: ${entries.length} דמואים בכל הטכנולוגיות. כל כרטיס נפתח לעמוד מבודד עם הדמו רץ בלייב. סנן, חפש, פתח, גלול.</p>
  <p class="vhead-code">בתחתית כל עמוד מהלך יש <b>קוד להדבקה</b>: כפתור אחד מעתיק הנחיה מלאה לסוכן קוד, עם ה-CSS, ה-HTML, ה-JS, תגי הסקריפט לפי הסדר ואופן ההמרה ל-React. הקוד עומד בפני עצמו ולא נשען על שום דבר מהמאגר.</p>
</div>
<div class="vtoolbar">
  <div class="vtoolbar-row">
    <div class="seg" role="tablist" aria-label="קטגוריה">
      <button class="fbtn on" data-f="all">הכל · ${entries.length}</button>
      ${fbtns}
    </div>
    <input class="fsearch" type="search" placeholder="חיפוש חופשי או MV:id...">
  </div>
  <div class="vtoolbar-row">
    <span class="fgroup fit-row"><span class="flabel">מתאים ל:</span>${fitbtns}</span>
    <button class="adv-toggle" aria-expanded="false" aria-controls="adv-panel">
      <span>סינון מתקדם</span><b class="adv-badge" hidden></b>
      <svg class="adv-chev" width="11" height="7" viewBox="0 0 11 7" fill="none"><path d="M1 1l4.5 4.5L10 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <span class="fcount"></span>
    <button class="clr-btn" hidden>נקה הכל</button>
  </div>
  <div class="adv-panel" id="adv-panel" hidden>
    <div class="fgroup"><span class="flabel">לפי שימוש:</span>${ubtns}</div>
    <div class="fgroup"><span class="flabel">רכיב UI:</span>${ebtns}</div>
    <div class="fgroup status"><span class="flabel">לפי סטטוס:</span>
      <button class="sbtn" data-s="ok">מאושרים<b class="sn"></b></button>
      <button class="sbtn" data-s="no">לא מאושרים<b class="sn"></b></button>
      <button class="sbtn" data-s="pending">ממתינים<b class="sn"></b></button>
      <button class="report-btn">📋 העתק דוח לקלוד</button>
    </div>
  </div>
</div>
<div class="vgrid">
${cards}
</div>
<script src="assets/baseline.js"></script>
<script src="assets/status.js"></script>
<script>
const LIST=${REPORT_LIST};
const cards=[...document.querySelectorAll('.vcard')],btns=[...document.querySelectorAll('.fbtn')],
ubtns=[...document.querySelectorAll('.ubtn')],ebtns=[...document.querySelectorAll('.ebtn')],
fitbtns=[...document.querySelectorAll('.fitbtn')],
sbtns=[...document.querySelectorAll('.sbtn')],clr=document.querySelector('.clr-btn'),
advToggle=document.querySelector('.adv-toggle'),advPanel=document.querySelector('.adv-panel'),advBadge=document.querySelector('.adv-badge'),
search=document.querySelector('.fsearch'),count=document.querySelector('.fcount');
// שלוש קבוצות רב-בחירה: בתוך כל קבוצה זה "או", ובין הקבוצות זה "וגם"
let cat='all',stf=null;const useSet=new Set(),elemSet=new Set(),fitSet=new Set();
function paintStatus(){
  const tally={ok:0,no:0,pending:0};
  cards.forEach(c=>{
    const s=MV.state(c.dataset.id),chip=c.querySelector('.stchip');
    chip.textContent=MV.label(s);chip.className='chip stchip st-'+s;
    c.dataset.status=s;tally[s]=(tally[s]||0)+1;
  });
  // הספירה חיה: היא נגזרת מהאישורים בפועל ולא מהבנייה
  sbtns.forEach(b=>{b.querySelector('.sn').textContent=tally[b.dataset.s]||0;});
}
function apply(){
  const q=search.value.trim().toLowerCase();let n=0;
  cards.forEach(c=>{
    const ok=(cat==='all'||c.dataset.cat===cat)
      &&(!useSet.size||c.dataset.uses.split(' ').some(u=>useSet.has(u)))
      &&(!elemSet.size||c.dataset.elems.split(' ').some(u=>elemSet.has(u)))
      &&(!fitSet.size||c.dataset.fit.split(' ').some(u=>fitSet.has(u)))
      &&(!stf||c.dataset.status===stf)
      &&(!q||c.dataset.txt.toLowerCase().includes(q));
    c.hidden=!ok; if(ok)n++;
  });
  const advActive=useSet.size+elemSet.size+(stf?1:0);
  const active=advActive+fitSet.size+(cat==='all'?0:1)+(q?1:0);
  count.textContent=n+' מוצגים'+(active?' · '+active+' סינונים פעילים':'');
  clr.hidden=!active;
  advBadge.hidden=!advActive; advBadge.textContent=advActive;
  advToggle.classList.toggle('active',!!advActive);
}
btns.forEach(b=>b.addEventListener('click',()=>{btns.forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.f;apply();}));
function multi(list,set,key){
  list.forEach(b=>b.addEventListener('click',()=>{
    const v=b.dataset[key];
    if(set.has(v)){set.delete(v);b.classList.remove('on');}
    else{set.add(v);b.classList.add('on');}
    apply();
  }));
}
multi(ubtns,useSet,'u');
multi(ebtns,elemSet,'e');
multi(fitbtns,fitSet,'fit');
function setAdv(open){
  advPanel.hidden=!open;
  advToggle.setAttribute('aria-expanded',String(open));
}
advToggle.addEventListener('click',()=>setAdv(advPanel.hidden));
clr.addEventListener('click',()=>{
  useSet.clear();elemSet.clear();fitSet.clear();stf=null;cat='all';search.value='';
  [...ubtns,...ebtns,...fitbtns,...sbtns].forEach(x=>x.classList.remove('on'));
  btns.forEach(x=>x.classList.toggle('on',x.dataset.f==='all'));
  apply();
});
sbtns.forEach(b=>b.addEventListener('click',()=>{
  if(b.classList.contains('on')){b.classList.remove('on');stf=null;}
  else{sbtns.forEach(x=>x.classList.remove('on'));b.classList.add('on');stf=b.dataset.s;}
  apply();
}));
document.querySelector('.report-btn').addEventListener('click',function(){
  navigator.clipboard.writeText(MV.report(LIST)).then(()=>{
    this.classList.add('copied');this.textContent='הדוח הועתק ✓ הדבק לקלוד';
    setTimeout(()=>{this.classList.remove('copied');this.textContent='📋 העתק דוח לקלוד';},2200);
  });
});
search.addEventListener('input',apply);
paintStatus();apply();
addEventListener('pageshow',()=>{paintStatus();apply();});
</script>
</body>
</html>`;
}

// write everything
for (const cat of Object.keys(CATS)) mkdirSync(join(ROOT, cat), { recursive: true });
mkdirSync(join(ROOT, "export"), { recursive: true });
let n = 0;
for (const e of entries) { writeFileSync(join(ROOT, e.cat, e.id + ".html"), page(e)); n++; }

// ייצוא נייד: קובץ עצמאי לכל מהלך + מניפסט מובנה לסוכן קוד
const manifest = [];
for (const e of entries) {
  writeFileSync(join(ROOT, "export", e.id + ".html"), standalone(e, CDN, NON_GSAP));
  const p = portable(e, CDN, NON_GSAP);
  manifest.push({
    id: e.id, name: e.name, cat: e.cat, tech: e.tech,
    desc: e.desc, when: e.when, note: e.note || null,
    libs: p.libs, plugins: p.plugins, scripts: p.scripts,
    needsRtl: p.needsRtl, usesVaultHelpers: p.helpers,
    demo: `${e.cat}/${e.id}.html`, standalone: `export/${e.id}.html`,
    css: p.css, html: p.html, js: p.js,
  });
}
writeFileSync(join(ROOT, "export", "manifest.json"), JSON.stringify({
  generated: new Date().toISOString(), count: manifest.length,
  readme: "כל כניסה כאן עומדת בפני עצמה. css נושא ברירות מחדל לכל טוקן ומהלות העזר מוטמעות בו. scripts כולל את כל תגי ה-CDN לפי הסדר. js מתחיל ב-registerPlugin. needsRtl אומר אם הרכיב מסתמך על dir=rtl.",
  entries: manifest,
}, null, 1));

writeFileSync(join(ROOT, "index.html"), indexPage());
writeFileSync(join(ROOT, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(ROOT, ".nojekyll"), "");
console.log(`built ${n} pages + index + ${manifest.length} standalone exports`);
