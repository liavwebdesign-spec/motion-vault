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
