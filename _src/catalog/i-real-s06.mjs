// s06: הועבר מ-i-style1.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default [
sk({
  id: "s06", archived: true, name: "מקסימליזם", en: "Maximalism", group: "אמירה וקיצון",
  desc: "צבעים מתנגשים, שכבות, טיפוגרפיה ענקית, תנועה בכל פינה. מקסימום זיכרון.",
  when: "אופנה, מוזיקה, אירועים, קמפיינים. לבלוט בכל מחיר.",
  no: "כלי עבודה יומיומיים. מעייף.",
  recipe: `פלטה: 4-5 צבעים רוויים בניגודים משלימים, אחד דומיננטי תמיד
טיפוגרפיה: כותרות 8-14vw, מותר mix של display+serif; חפיפות טקסט-ויז'ואל
שכבות: אלמנטים חורגים מסקשנים, רוטציות עדינות ±2-4°
תנועה: marquees, hover נדיב. עדיין easing אחיד ו-reduced-motion מלא`,
  apply: "הירו = הפיצוץ הכי חזק בעמוד; סקשנים מתחלפים עוצמה-הפוגה; טפסים דווקא נקיים (שם קורית ההמרה); תמונות בטיפול (דוטון או מסגרות צבע), לא סטוק חלק.",
  sig: "כותרת ענק בקנה מידה של פוסטר (10cqi) · התנגשות צבעים מכוונת אחת לסקשן · אלמנט חוצה-גבולות בין סקשנים.",
  avoid: "הכל צועק אז כלום לא נשמע. חייב הפוגות · כל הצבעים באותו משקל (אין דומיננטי) · CTA שנבלע ברעש.",
  qa: ["סקשן הפוגה אחרי כל שיא", "CTA בולט מכל סביבתו (צבע בלעדי)", "קריאות AA על כל שכבה"],
  engine: "הכאוס מבוקר: הגריד מתחת נשאר; טקסט רץ על משטח שקט.",
  agent: "עצב מקסימליסטי: טיפוגרפיה ענקית, פלטה רוויה עם ניגודים חזקים ושכבות חופפות, אבל עם סקשני הפוגה, טופס נקי ו-CTA בצבע בלעדי.",
  note: "בדמו: כחול דומיננטי, ורוד וצהוב כמתנגשים, הירוק החומצי שמור ל-CTA בלבד. הירו הוא השיא, היתרונות על ורוד, המחירים על לבן כהפוגה, והטופס נקי לגמרי. הוויז'ואל חוצה את הגבול לסקשן הבא.",
  fonts: ["Secular One"],
  css: `.sk-s06 .ref{--s-bg:#1F1BFF;--s-surface:#fff;--s-ink:#000;--s-muted:#222;--s-line:#000;--s-accent:#C8FF00;--s-accent-ink:#000;--s-accent-txt:#000;--s-r:0;--s-btn-r:0;--s-ph:#FF2E9A;--s-ph-ink:#000;--s-font-h:"Secular One","Heebo",system-ui,sans-serif;--s-wt-h:400;--s-fz-h:1;--s-lh-h:1;
 --s-card-b:3px solid #000;--s-card-sh:8px 8px 0 #000;--s-ghost-b:3px solid #fff;--s-ghost-ink:#fff;--s-in-b:2px solid #000;--s-in-r:0;--s-hi-bg:#000;--s-hi-ink:#fff;--s-ico-bg:#1F1BFF;--s-ico-r:50%;--s-hd-bg:#000;--s-form-bg:#fff;--s-gap:28px}
.sk-s06 .hd{color:#fff}.sk-s06 .hd .nav{color:#fff}
.sk-s06 .hero{grid-template-columns:1fr;color:#fff;padding-bottom:0;gap:0}
.sk-s06 .hero h1{font-size:clamp(48px,10cqi,132px);line-height:.95;color:#fff;max-width:none;text-shadow:6px 6px 0 #FF2E9A;margin-bottom:20px}
.sk-s06 .lead{color:#fff;font-weight:600;max-width:52ch}
.sk-s06 .eyebrow{background:#FFE500;color:#000;padding:4px 10px;transform:rotate(-2deg)}
.sk-s06 .hero-v{order:0;aspect-ratio:16/7;background:#FFE500;border:3px solid #000;border-radius:0;transform:rotate(-2deg);box-shadow:12px 12px 0 #000;color:#000;margin:44px 6% -70px;overflow:visible;z-index:3}
.sk-s06 .hv-a{position:absolute;width:26%;aspect-ratio:1;inset-inline-end:-6%;top:-30%;border-radius:50%;background:#FF6B00;border:3px solid #000}
.sk-s06 .hv-b{position:absolute;width:50%;height:26%;inset-inline-start:-8%;bottom:-16%;background:repeating-linear-gradient(90deg,#000 0 12px,#1F1BFF 12px 24px);border:3px solid #000}
.sk-s06 .hv-l{font-family:"Secular One","Heebo",sans-serif;font-weight:400;font-size:clamp(28px,5cqi,64px)}
.sk-s06 .bens{background:#FF2E9A;padding-top:clamp(110px,14cqi,170px)}
.sk-s06 .bens h2{font-size:clamp(36px,6cqi,80px);color:#000}
.sk-s06 .bens .card:nth-child(1){transform:rotate(-1.5deg)}.sk-s06 .bens .card:nth-child(3){transform:rotate(1.5deg)}
.sk-s06 .prices{background:#fff;--s-ghost-ink:#000;--s-ghost-b:3px solid #000}
.sk-s06 .prices h2{font-size:clamp(36px,6cqi,80px)}
.sk-s06 .price{box-shadow:none}
.sk-s06 .price.hi .amt,.sk-s06 .price.hi li::before{color:#C8FF00}
.sk-s06 .form{background:#fff;border-top:3px solid #000}
.sk-s06 .fbox{box-shadow:none;border:0}
.sk-s06 .ft{background:#000;color:#fff;border-top:0;font-weight:700}
@container (max-width:767px){.sk-s06 .hero-v{order:0;margin:30px 4% -50px}.sk-s06 .bens{padding-top:90px}}`,
}),
];
