// "איפה ומתי": לכל פריט במאגר, איפה נכון להשתמש בו (30.9.2026, ליאב: "לדייק לכל פריט איפה נכון להשתמש בו,
// כדי שבפרויקטים עתידיים כל פריט ייובא במקומות הנכונים"). ליאב בחר באותו יום את כיוון "לפי מה בונים" לממשק.
//
// למה שדה חדש ולא עוד תגיות ב-USES: USES אומר על מה הפריט (טקסט, מדיה, כרטיסים), לא איפה הוא יושב. FIT הבחין רק
// בין דף נחיתה לוואן-פייג'ר. כאן כל פריט עונה על חמש שאלות, והתשובות מזינות את הסינון בספרייה, את עמוד הפריט,
// את ההנחיה לסוכן ואת המניפסט:
//   sites  באיזה סוג אתר            (SITES)
//   secs   באיזה סקשן בעמוד          (SECS, לפי הארכיטיפים ב-library/archetypes.md)
//   tone   q = גם באתר שקט, x = רק באתר חוויתי (התורה: פרויקט שקט לא מקבל מהלכים, רק את שכבת הבסיס)
//   role   sig = רגע חתימה, sup = משרת תוכן, base = שכבת הבסיס (reveal, הובר, מיקרו, מצבי המרה)
//   dose   כמה פעמים בעמוד: 1, 2, 3, או 0 = בלי הגבלה
//   not    מתי לא, במשפט אחד
// הנתונים ב-place.json (שורה לכל פריט), כדי שסבב ה-QA יוכל לעדכן אותם בלי לגעת בקוד.

import { readFileSync, existsSync } from "node:fs";

export const SITES = { L: "דף נחיתה", O: "וואן-פייג'ר", C: "אתר תדמית", E: "חנות", P: "פורטפוליו וסטודיו" };

export const SECS = {
  hero: "הירו", proof: "מספרים ולקוחות", value: "בעיה ויתרונות", services: "שירותים ומוצרים",
  process: "תהליך ושלבים", works: "עבודות וגלריה", testi: "המלצות", about: "אודות וצוות",
  pricing: "מחירים", faq: "שאלות נפוצות", cta: "סגירה, טופס וקשר", content: "מאמר ותוכן ארוך",
  shop: "מוצר וקטלוג", nav: "הדר וניווט", footer: "פוטר", breath: "נשימה ומעבר", page: "כל העמוד",
};

export const TONES = { q: "גם באתר שקט", x: "רק באתר חוויתי" };
export const ROLES = { sig: "רגע חתימה", sup: "משרת תוכן", base: "שכבת בסיס" };
export const doseLabel = d => d === 1 ? "פעם אחת בעמוד" : d === 2 ? "עד פעמיים בעמוד" : d === 3 ? "עד שלוש פעמים בעמוד" : "בלי הגבלה";

export function loadPlace(url) {
  const f = new URL("./place.json", url);
  return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : {};
}

// build.mjs זורק על ערך מחוץ לאוצר המילים, כדי שתיוג שגוי לא יגיע לספרייה ולסקיל
const LONG_DASHES = [String.fromCharCode(0x2013), String.fromCharCode(0x2014)];
export function validatePlace(PLACE, ids) {
  const bad = [];
  for (const [id, p] of Object.entries(PLACE)) {
    if (!ids.has(id)) { bad.push(`${id}: אין פריט כזה`); continue; }
    (p.sites || []).forEach(s => { if (!SITES[s]) bad.push(`${id}: site ${s}`); });
    (p.secs || []).forEach(s => { if (!SECS[s]) bad.push(`${id}: sec ${s}`); });
    if (p.tone && !TONES[p.tone]) bad.push(`${id}: tone ${p.tone}`);
    if (p.role && !ROLES[p.role]) bad.push(`${id}: role ${p.role}`);
    if (p.dose != null && ![0, 1, 2, 3].includes(p.dose)) bad.push(`${id}: dose ${p.dose}`);
    if (p.not && LONG_DASHES.some(d => p.not.includes(d))) bad.push(`${id}: מקף ארוך ב-not`);
  }
  return bad;
}
