// s12: הועבר מ-i-style2.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
sk({
  id: "s12", archived: true, name: "רטרו שנות ה-70", en: "Retro 70s", group: "שפות נוספות",
  desc: "פלטה תקופתית (חרדל, חלודה, זית, שמנת), טיפוגרפיה תקופתית, גרעיניות. נוסטלגיה, אופי.",
  when: "מותגי אוכל, קפה, אופנה, תרבות, כל מי שהאופי הוא המוצר.",
  no: "טק, פיננסים, רפואה. הנוסטלגיה נקראת כחוסר עדכניות.",
  recipe: `לבחור עשור אחד ולהתחייב. כאן: שנות ה-70
פלטה: חרדל #D9A32B · חלודה #B5502A · זית #6B7A3A · שמנת #F3E9D2 · חום #3A2A1E
כפתור וטקסט צבעוני: חלודה עמוקה #A4461F (שמנת עליה 5.0; החלודה #B5502A נותנת 4.2 ונשארת לפסים, לקשתות ולאייקונים)
גרעיניות 3-4%; פסי שקיעה (שלוש רצועות); קשתות קונצנטריות; כפתורי pill
טיפוגרפיה: serif display כבד לכותרות (בדמו Suez One; בפרויקט צימוד מ-library/fonts.md, אף פעם לא פונט גוגל), סאנס נקי לגוף`,
  apply: "רצועת פסים תקופתית מתחת להדר; ויז'ואל הירו = קשתות שקיעה; כרטיסים בשמנת עם מתאר כפול; כפתורי pill בחלודה; החבילה הנבחרת בחום עם מחיר בחרדל; הגרעין על העמוד כולו ב-4%.",
  sig: "פסי שקיעה · קשתות קונצנטריות · מתאר כפול (קו, רווח, קו).",
  avoid: "ערבוב עשורים · רטרו רק בצבעים בלי טיפוגרפיה תואמת (חצי-תחפושת).",
  qa: ["עשור אחד בלבד בכל הסימנים", "פונט הכותרות תקופתי", "גרעין לא מעל 4%"],
  engine: "",
  agent: "עצב בסגנון רטרו שנות ה-70: פלטת חרדל, חלודה, זית ושמנת, כותרות ב-serif display כבד, פסי שקיעה וקשתות קונצנטריות, כפתורי pill, גרעיניות עדינה.",
  note: "בדמו: Suez One לכותרות, פסי שקיעה בראש ההירו, קשתות בוויז'ואל, מתאר כפול על הכרטיסים דרך box-shadow בשתי טבעות.",
  fonts: ["Suez One"],
  css: `.sk-s12 .ref{--s-bg:#F3E9D2;--s-surface:#FBF4E4;--s-ink:#3A2A1E;--s-muted:#6B5744;--s-line:#3A2A1E;--s-accent:#A4461F;--s-accent-ink:#F3E9D2;--s-accent-txt:#A4461F;--s-r:12px;--s-btn-r:999px;--s-ph:#D9A32B;--s-ph-ink:#3A2A1E;--s-font-h:"Suez One",serif;--s-wt-h:400;--s-fz-h:1;--s-lh-h:1;
 --s-card-b:2px solid #3A2A1E;--s-card-sh:0 0 0 4px #F3E9D2,0 0 0 6px #3A2A1E;--s-ghost-b:2px solid #3A2A1E;--s-ghost-bg:#FBF4E4;--s-in-b:2px solid #3A2A1E;--s-in-bg:#FBF4E4;--s-in-r:999px;--s-hi-bg:#3A2A1E;--s-hi-ink:#F3E9D2;--s-ico-bg:#D9A32B;--s-ico-r:50%;--s-hd-line:2px solid #3A2A1E;--s-form-bg:#FBF4E4;--s-gap:28px}
.sk-s12 .ref::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.04;z-index:0;background:${NOISE}}
.sk-s12 .hero{padding-top:calc(clamp(40px,7cqi,96px) + 24px)}
.sk-s12 .hero::before{content:"";position:absolute;top:0;left:0;right:0;height:24px;background:linear-gradient(#D9A32B 0 8px,#B5502A 8px 16px,#6B7A3A 16px 24px)}
.sk-s12 .hero h1{font-size:clamp(36px,6cqi,76px);line-height:1.05}
.sk-s12 .hero-v{border-radius:50% 50% 12px 12px/40% 40% 12px 12px;background:repeating-radial-gradient(circle at 50% 100%,#B5502A 0 12%,#D9A32B 12% 24%,#6B7A3A 24% 36%,#F3E9D2 36% 48%);border:2px solid #3A2A1E;box-shadow:none}
.sk-s12 .hv-a,.sk-s12 .hv-b{display:none}
.sk-s12 .hv-l{background:#FBF4E4;border:2px solid #3A2A1E;padding:6px 16px;border-radius:999px}
.sk-s12 .bens .card:nth-child(2) .ico{background:#B5502A}.sk-s12 .bens .card:nth-child(3) .ico{background:#6B7A3A}
.sk-s12 .price.hi .amt,.sk-s12 .price.hi li::before{color:#D9A32B}
.sk-s12 .price.hi .btn{background:#D9A32B;color:#3A2A1E}
.sk-s12 .tag{background:#D9A32B;color:#3A2A1E;border:2px solid #3A2A1E}
.sk-s12 .eyebrow{font-family:"Suez One",serif;font-weight:400;color:#A4461F;font-size:15px}
.sk-s12 .ft{border-top:2px solid #3A2A1E}
.sk-s12 .logo::before{border-radius:50%;background:radial-gradient(circle,#D9A32B 30%,#B5502A 31% 60%,#6B7A3A 61%)}
.sk-s12 .in::placeholder{color:#6B5744}`,
}),
];
