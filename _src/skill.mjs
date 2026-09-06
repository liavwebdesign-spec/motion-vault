// מייצר את library/compositions.md של הסקיל design-dna מתוך הקטלוג.
//
// ההכרעה (6.9.2026): המאגר הוא מקור האמת של התורה, והסקיל נבנה ממנו.
// עד אז הקומפוזיציות חיו כטקסט בסקיל וכדמואים במאגר, בנפרד, וזה בדיוק
// המתכון לסחיפה: הגדרה אחת בסקיל, אחרת במאגר, ושנינו מסתמכים על
// גרסאות שונות בלי לדעת. עכשיו יש קובץ אחד שמקבל דמו ותדריך, והטקסט
// בסקיל הוא תוצר בנייה.
//
// הקובץ נכתב לשני מקומות: לסקיל (כדי שאני אקרא אותו) ול-export/doctrine
// (כדי שיהיה נייד עם המאגר).
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const LIVE = "https://liavwebdesign-spec.github.io/motion-vault";
const DOT = "·"; // נקודה מוגבהת, המפריד של המותג. אין מקף ארוך בשום מקום.
// התו האסור נבנה מקוד ולא נכתב, כי ה-hook חוסם אותו גם בתוך קוד.
const EM_DASH = String.fromCharCode(8212);

function item(e) {
  const num = e.id.replace(/^[cp]0?/, "").toUpperCase();
  const prefix = e.cat === "comp" ? "C" : "P";
  const L = [];
  L.push(`### ${prefix}${num} ${DOT} ${e.name}`);
  L.push(e.desc);
  const bits = [`**מתאים ל**: ${e.when}`];
  if (e.mobile) bits.push(`**מובייל**: ${e.mobile}`);
  if (e.note) bits.push(`**הערה**: ${e.note}`);
  L.push(bits.join(" "));
  L.push(`**דמו חי**: ${LIVE}/${e.cat}/${e.id}.html ${DOT} \`MV:${e.id}\``);
  return L.join("\n");
}

export function compositionsMarkdown(entries) {
  const comps = entries.filter(e => e.cat === "comp");
  const rhythms = entries.filter(e => e.cat === "rhythm");
  const out = [];
  out.push(`# ספריית קומפוזיציות תוכן ${DOT} פריסות ומקצבים`);
  out.push("");
  out.push(`<!-- נוצר אוטומטית מ-Motion Vault (_src/catalog/h-comp*.mjs, h-rhythm.mjs) על ידי node _src/build.mjs. לא לערוך כאן: עורכים בקטלוג ובונים. -->`);
  out.push("");
  out.push(`**הציר השלישי של ההרכבה: תפקיד התוכן (sections) × קומפוזיציה (כאן) × עור.** אותו תוכן בדיוק, "3 יתרונות", יכול להיות גריד כרטיסים, ציר מדורג, שכבות חופפות או פס רץ. הבחירה כאן היא מה שמפריד עמוד מעניין מעמוד שבלוני.`);
  out.push("");
  out.push("**חוקי השימוש:**");
  out.push(`1. **התוכן קובע, לא הקומפוזיציה.** קודם שואלים "מה טבע התוכן הזה?" (רשימה שקולה? תהליך עוקב? פריט גיבור ולוויינים? הצהרה בודדת?) ורק אז בוחרים פריסה שמכבדת אותו. לדחוף תוכן לקומפוזיציה "מגניבה" שלא מתאימה לו הוא כישלון.`);
  out.push(`2. **חוק הגיוון**: אותה קומפוזיציה לא פעמיים ברצף, ולא יותר מפעמיים בעמוד (חריג: C4 גריד, עד שלוש אם התוכן באמת שקול).`);
  out.push(`3. כל קומפוזיציה כפופה למנוע (גריד, צירים, קריסת מובייל) ומתלבשת בכל עור. הדמו במאגר ניטרלי בכוונה ומגדיר מבנה בלבד.`);
  out.push(`4. ליאב מזין: רפרנס עם פריסה מעניינת נכרה לקטלוג המאגר בפורמט האחיד (דרך \`_intake.md\`), והקובץ הזה נבנה מחדש.`);
  out.push(`5. **כל דמו נפתח עם מתג רוחב** (דסקטופ, טאבלט, מובייל). הקריסה כתובה ב-@container, ולכן בפרויקט אמיתי העטיפה צריכה \`container-type:inline-size\`, או ממירים ל-@media.`);
  out.push("");
  out.push(`בכל פריט: מבנה ${DOT} למה זה מתאים (טבע התוכן) ${DOT} קריסת מובייל ${DOT} הערות ${DOT} דמו חי ומזהה MV.`);
  out.push("");
  out.push("---");
  out.push("");
  out.push(`## רמת סקשן ${DOT} קומפוזיציות (C)`);
  out.push("");
  out.push(comps.map(item).join("\n\n"));
  out.push("");
  out.push("---");
  out.push("");
  out.push(`## רמת עמוד ${DOT} מקצבים (P)`);
  out.push("");
  out.push("מקצב הוא איך הקומפוזיציות מתחלפות לאורך הגלילה. בוחרים אחד לעמוד בשלב האפיון.");
  out.push("");
  out.push(rhythms.map(item).join("\n\n"));
  out.push("");
  out.push("---");
  out.push("");
  out.push("## שילוב בהצעה (שלב 2 ב-SKILL)");
  out.push(`ההצעה לפרויקט כוללת מקצב עמוד (P) וקומפוזיציה לכל סקשן מרכזי (C), עם נימוק מטבע התוכן ("היתרונות שלכם לא שקולים, אחד חזק ושניים תומכים, לכן C15 ולא גריד"). זה המקום להציע את הלא מובן מאליו: אם ההצעה כולה C1 ו-C4, לחזור ולחשוב. **כל הצעה מצרפת את קישור הדמו**, כדי שליאב יראה את הפריסה ולא רק את שמה.`);
  out.push("");
  const md = out.join("\n");
  if (md.includes(EM_DASH)) throw new Error("em dash in generated skill markdown");
  return md;
}

// ───────── שפות עיצוב: skins/languages.md ─────────
// הפורמט זהה לקובץ הידני שהיה שם עד 6.9.2026 (מהות, כן/לא, מתכון, יישום, חתימה,
// קריקטורה, QA, אילוצי מנוע, לסוכן), בתוספת קישור לדמו החי ומזהה MV.
function styleItem(e, n) {
  const L = [];
  L.push(`### ${n}. ${e.name} (${e.en})`);
  L.push(`**מהות**: ${e.desc}`);
  L.push(`**כן**: ${e.when} **לא**: ${e.no}`);
  if (e.recipe.includes("\n")) { L.push("**מתכון**:"); L.push("```css"); L.push(e.recipe); L.push("```"); }
  else L.push(`**מתכון**: ${e.recipe}`);
  L.push(`**יישום**: ${e.apply}`);
  L.push(`**חתימה**: ${e.sig}`);
  L.push(`**קריקטורה**: ${e.avoid}`);
  L.push(`**QA**: ${(e.qa || []).map(q => "☐ " + q).join(" ")}.`);
  if (e.engine) L.push(`**אילוצי מנוע**: ${e.engine}`);
  if (e.extra) { L.push("**ערכים שנלטשו**:"); L.push("```css"); L.push(e.extra); L.push("```"); }
  L.push(`**לסוכן**: "${e.agent}"`);
  L.push(`**דמו חי** (עמוד הייחוס בשפה הזאת): ${LIVE}/${e.cat}/${e.id}.html ${DOT} \`MV:${e.id}\``);
  return L.join("\n");
}

export function stylesMarkdown(entries) {
  const styles = entries.filter(e => e.cat === "style");
  const out = [];
  out.push(`# אינדקס שפות העיצוב ${DOT} הספרייה לבחירה והמלצה`);
  out.push("");
  out.push(`<!-- נוצר אוטומטית מ-Motion Vault (_src/catalog/i-style*.mjs) על ידי node _src/build.mjs. לא לערוך כאן: עורכים בקטלוג ובונים. -->`);
  out.push("");
  out.push("**שתי רמות בתיקיית skins/:**");
  out.push(`1. **עורות מלאים**, נכרו מ-ground truth, מוכנים לפרודקשן: \`storeos-quiet\` (מינימליזם עריכתי), \`soft-modern\` (Soft UI מודרני). כשיש עור מלא שמתאים, הוא עדיף תמיד.`);
  out.push(`2. **שפות (blueprints)**, הקובץ הזה: מתכון התחלה קונקרטי לכל שפה. בפרויקט אמיתי ראשון בשפה, מלטשים אותה לעור מלא דרך \`_skin-crafting.md\` (רצוי עם רפרנס).`);
  out.push("");
  out.push(`בכל שפה: המהות ${DOT} מתי כן/לא ${DOT} **מתכון טוקנים** (ערכי פתיחה אמיתיים) ${DOT} **מפת יישום** (איך השפה מתנהגת בכל אלמנט) ${DOT} **חתימה** (המהלכים שגורמים לה להרגיש אותנטית) ${DOT} **קריקטורה** (הטעויות שהופכות אותה לפלסטיק) ${DOT} **QA** ייעודי ${DOT} אילוצי מנוע ${DOT} המשפט לסוכן (לפרומפטי Lovable) ${DOT} **דמו חי**.`);
  out.push(`**כלל הדיוק: שפה מדברים, לא לובשים.** מתכון הטוקנים לבד = תחפושת; מפת היישום + מהלכי החתימה = השפה עצמה.`);
  out.push(`**הדמו החי**: כל שפה מרונדרת במאגר על אותו עמוד ייחוס בדיוק (הדר, הירו, שלושה יתרונות, שלוש חבילות, טופס, פוטר), עם מתג רוחב. ההשוואה בין שפות היא תפוחים לתפוחים, וכל הצעה לליאב מצרפת את הקישור. הכפתור "העתק הנחיה מלאה" בעמוד נותן לסוכן את המתכון, החתימה, הקריקטורה, ה-QA וה-CSS של עמוד הייחוס כנקודת פתיחה לעור.`);
  out.push(`מקור הטקסונומיה: המדריך לשפות עיצוב (design-guide-site.vercel.app) + trends שנכרו קודם. המתכונים והדיוקים שלנו.`);
  out.push("");
  let n = 0, group = null;
  for (const e of styles) {
    if (e.group !== group) {
      group = e.group;
      out.push("---"); out.push(""); out.push(`## ${group}`); out.push("");
    }
    out.push(styleItem(e, ++n)); out.push("");
  }
  out.push("---");
  out.push("");
  out.push("## איך זה עובד בשלב ההצעה (חיבור ל-SKILL)");
  out.push(`בכל פרויקט חדש, ההצעה בשלב 2 שולפת מכאן: סוג העסק + קהל + מסר, ומהם 1-2 שפות מומלצות עם נימוק **וקישור לדמו החי**. אם נבחרה שפה בלי עור מלא, המתכון + מפת היישום הם הבסיס, וטובעים עור דרך \`_skin-crafting.md\` (רצוי עם רפרנס). אחרי פרויקט מוצלח ראשון, השפה מקודמת לעור מלא עם הערכים שנלטשו, והדיוקים שנלמדו מהפידבק של ליאב נכתבים חזרה לקטלוג המאגר (לא לכאן) ובונים מחדש.`);
  out.push("");
  const md = out.join("\n");
  if (md.includes(EM_DASH)) throw new Error("em dash in generated languages markdown");
  return md;
}

export function writeStylesSkill(entries, ROOT) {
  const md = stylesMarkdown(entries);
  const targets = [];
  const skillDir = join(homedir(), ".claude", "skills", "design-dna", "references", "skins");
  if (existsSync(skillDir)) targets.push(join(skillDir, "languages.md"));
  const exp = join(ROOT, "export", "doctrine");
  mkdirSync(exp, { recursive: true });
  targets.push(join(exp, "languages.md"));
  for (const t of targets) writeFileSync(t, md);
  return targets;
}

// ───────── אנטי-פטרנים: library/anti-patterns.md ─────────
function writeDoc(ROOT, sub, name, md) {
  if (md.includes(EM_DASH)) throw new Error("em dash in generated " + name);
  const targets = [];
  const skillDir = join(homedir(), ".claude", "skills", "design-dna", "references", sub);
  if (existsSync(skillDir)) targets.push(join(skillDir, name));
  const exp = join(ROOT, "export", "doctrine");
  mkdirSync(exp, { recursive: true });
  targets.push(join(exp, name));
  for (const t of targets) writeFileSync(t, md);
  return targets;
}

export function antiMarkdown(entries) {
  const items = entries.filter(e => e.cat === "anti");
  const out = [];
  out.push(`# גלריית אנטי-פטרנים ${DOT} ככה לא, ככה כן`);
  out.push("");
  out.push(`<!-- נוצר אוטומטית מ-Motion Vault (_src/catalog/j-anti.mjs) על ידי node _src/build.mjs. לא לערוך כאן: עורכים בקטלוג ובונים. -->`);
  out.push("");
  out.push(`כל פריט כאן הוא לקח שכבר רשום בתורה (צ'קליסט ה-QA, קריקטורות השפות, כללי המנוע), עם דמו חי שמראה את הטעות ואת התיקון על אותו בלוק ניטרלי. **לפני כל מסירה עוברים על הרשימה הזאת** ומחפשים כל תבנית בעמוד. "איך מזהים" הוא המבחן המהיר: איפה להסתכל כדי לתפוס את זה בעין.`);
  out.push("");
  out.push(`כשליאב מדביק \`MV:a05\`, זו הפניה לאנטי-פטרן: לתקן לפי סעיף "התיקון" של אותו פריט.`);
  out.push("");
  out.push("---");
  out.push("");
  items.forEach((e, i) => {
    out.push(`### A${i + 1} ${DOT} ${e.name}`);
    out.push(e.desc);
    out.push(`**איפה**: ${e.when}`);
    out.push(`**החוק**: ${e.rule}`);
    out.push(`**למה זה רע**: ${e.why}`);
    out.push(`**התיקון**: ${e.fix}`);
    out.push(`**איך מזהים**: ${e.spot}`);
    out.push(`**דמו חי**: ${LIVE}/${e.cat}/${e.id}.html ${DOT} \`MV:${e.id}\``);
    out.push("");
  });
  out.push("---");
  out.push("");
  out.push("## הזנה");
  out.push(`לקח חדש מפידבק של ליאב (למשל "זה נראה על הפנים" עם סיבה) נכנס קודם לצ'קליסט ב-SKILL.md כסעיף ממוספר, ואז מקבל דמו כאן: רשומה ב-\`_src/catalog/j-anti.mjs\` עם שני החלונות על בלוק ניטרלי, ובונים. הקובץ הזה נוצר מהבנייה.`);
  out.push("");
  return out.join("\n");
}
export function writeAntiSkill(entries, ROOT) { return writeDoc(ROOT, "library", "anti-patterns.md", antiMarkdown(entries)); }

// ───────── ארכיטיפים: library/archetypes.md ─────────
export function archMarkdown(entries) {
  const items = entries.filter(e => e.cat === "arch");
  const out = [];
  out.push(`# ארכיטיפים של עמוד מלא ${DOT} סדר הסקשנים לכל סוג עמוד`);
  out.push("");
  out.push(`<!-- נוצר אוטומטית מ-Motion Vault (_src/catalog/k-arch.mjs) על ידי node _src/build.mjs. לא לערוך כאן: עורכים בקטלוג ובונים. -->`);
  out.push("");
  out.push(`ארכיטיפ הוא הרמה שמעל המקצב: **איזה סקשנים, באיזה סדר, ולמה**, עם קומפוזיציה מומלצת (C) לכל סקשן ומקצב (P) לעמוד. בשלב האפיון (site-planning.md) בוחרים ארכיטיפ לכל עמוד, ואז מתאימים: סקשן שאין לו תוכן אמיתי יורד, סקשן שהתוכן שלו שונה מטבעו מחליף קומפוזיציה. הסדר עצמו משתנה רק עם סיבה שמדווחת.`);
  out.push("");
  out.push(`**כל ארכיטיפ הוא שלד חי במאגר** עם מתג רוחב, וכל סקשן בו מתויג במספר, תפקיד וקומפוזיציה. ההצעה לליאב מצרפת את הקישור. כפתור ההעתקה נותן שלד CSS+HTML ניטרלי כנקודת פתיחה למבנה.`);
  out.push("");
  out.push("---");
  out.push("");
  items.forEach((e, i) => {
    out.push(`### R${i + 1} ${DOT} ${e.name} ${DOT} ${e.rhythm}`);
    out.push(e.desc);
    out.push(`**מתאים ל**: ${e.when}`);
    out.push("");
    out.push("| # | סקשן | קומפוזיציה | למה |");
    out.push("|---|---|---|---|");
    e.sections.forEach((s, j) => out.push(`| ${j + 1} | ${s.role} | ${s.comp || "לפי העור"} | ${s.why} |`));
    out.push("");
    if (e.mobile) out.push(`**מובייל**: ${e.mobile}`);
    if (e.note) out.push(`**הערה**: ${e.note}`);
    out.push(`**דמו חי**: ${LIVE}/${e.cat}/${e.id}.html ${DOT} \`MV:${e.id}\``);
    out.push("");
  });
  out.push("---");
  out.push("");
  out.push("## שילוב בהצעה (שלב 2 ב-SKILL)");
  out.push(`ההצעה לפרויקט פותחת בארכיטיפ לכל עמוד ("עמוד הבית: R3, עמוד שירות: R4"), ומתוכו נגזרים המקצב והקומפוזיציות. סטייה מהארכיטיפ (סקשן שנוסף, סדר שהשתנה) מקבלת משפט נימוק. ארכיטיפ חדש נכנס לקטלוג \`_src/catalog/k-arch.mjs\` ובונים.`);
  out.push("");
  return out.join("\n");
}
export function writeArchSkill(entries, ROOT) { return writeDoc(ROOT, "library", "archetypes.md", archMarkdown(entries)); }

export function writeCompositionsSkill(entries, ROOT) {
  const md = compositionsMarkdown(entries);
  const targets = [];
  const skillDir = join(homedir(), ".claude", "skills", "design-dna", "references", "library");
  if (existsSync(skillDir)) targets.push(join(skillDir, "compositions.md"));
  const exp = join(ROOT, "export", "doctrine");
  mkdirSync(exp, { recursive: true });
  targets.push(join(exp, "compositions.md"));
  for (const t of targets) writeFileSync(t, md);
  return targets;
}
