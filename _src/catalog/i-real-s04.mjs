// s04: הועבר מ-i-style1.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default [
sk({
  id: "s04", archived: true, name: "קליימורפיזם", en: "Claymorphism", group: "עומק ומרקם",
  desc: "תלת-ממד מנופח כמו פלסטלינה: פינות סופר-עגולות, צל פנימי כפול, צבעים חיים. ידידותי ומשחקי.",
  when: "ילדים, חינוך, אונבורדינג, מוצרים כיפיים.",
  no: "בנקאות, משפט, רפואה. מוריד אמינות.",
  recipe: `כרטיס: radius 24-36 (סופר-עגול); רקע פסטל רווי
צל החימר: box-shadow: 0 12px 24px rgba(של-צבע-הרקע,.35),
          inset 0 -8px 12px rgba(0,0,0,.12), inset 0 6px 10px rgba(255,255,255,.5)
פלטה: 3-4 פסטלים חיים (אפרסק, מנטה, לילך, שמיים) על רקע שמנת`,
  apply: "כפתורים וכרטיסים מנופחים; הירו עם תמונה במסגרת חימר מעוגלת (לא בלוב, 23.9.2026); אייקונים עבים מעוגלים filled; טפסים שקועים-רכים; תמונות בתוך מסגרות חימר מעוגלות מאוד.",
  sig: "CTA מנופח שמתכווץ בלחיצה (scale .97) · כרטיס עם בטן (הצל הפנימי התחתון הכהה).",
  avoid: "פסטלים חיוורים או עכורים. החימר חייב רוויה וחיים · עיגול-יתר של בלוקי טקסט ארוכים · שימוש בעסק שדורש רצינות.",
  qa: ["radius 24 ומעלה על האלמנטים הבולטים", "scale-on-press עם transition", "טקסט כהה AA על כל פסטל"],
  engine: "ריווח נדיב, הצורות רעבות לאוויר; היררכיית משקלים נשמרת.",
  agent: "עצב בסגנון קליימורפיזם: כרטיסים מנופחים עם פינות עגולות מאוד, צל פנימי עליון בהיר ותחתון כהה, פלטה פסטלית רוויה וחיה.",
  note: "בדמו: ארבעה פסטלים (אפרסק, מנטה, שמיים, לילך) על שמנת, כל צל בצבע הרקע של אותו כרטיס, הוויז'ואל בהירו הוא מסגרת חימר מעוגלת (עד 23.9.2026 היה בלוב, ונפסל כנישתי). Varela Round לכותרות כי החימר דורש פונט מעוגל; יש לו משקל אחד (400), ולכן הכותרות ב-400 ולא בהדגשה מזויפת. הטקסט על הכפתור הקורל כהה, כי לבן עליו נופל מ-AA.",
  fonts: ["Varela Round"],
  css: `.sk-s04 .ref{--s-bg:#FFF6EC;--s-surface:#FFD9C2;--s-ink:#2D2438;--s-muted:#5A4E6B;--s-line:transparent;--s-accent:#FF7A59;--s-accent-ink:#2D2438;--s-accent-txt:#B8431F;--s-r:30px;--s-btn-r:999px;--s-ph:#C9F0DF;--s-ph-ink:#2D2438;--s-font-h:"Varela Round","Heebo",system-ui,sans-serif;--s-wt-h:400;--s-fz-h:1;--s-lh-h:1;
 --s-card-b:0;--s-card-sh:0 12px 24px rgba(255,150,110,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5);
 --s-btn-sh:0 10px 20px rgba(255,122,89,.35),inset 0 -6px 10px rgba(0,0,0,.15),inset 0 5px 8px rgba(255,255,255,.35);
 --s-ghost-bg:#FFE9DB;--s-ghost-b:0;--s-in-b:0;--s-in-bg:#FFEFE3;--s-in-r:999px;--s-in-sh:inset 0 4px 8px rgba(0,0,0,.08),inset 0 -2px 4px rgba(255,255,255,.7);
 --s-hi-bg:#6E4EE8;--s-hi-ink:#fff;--s-ico-r:50%;--s-ico-bg:#fff;--s-form-bg:#E3D5FF}
.sk-s04 .btn.ghost{box-shadow:var(--s-card-sh)}
.sk-s04 .btn:active{transform:scale(.97)}
.sk-s04 .bens .card:nth-child(2){background:#C9F0DF;--s-card-sh:0 12px 24px rgba(90,200,150,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .bens .card:nth-child(3){background:#CFE6FF;--s-card-sh:0 12px 24px rgba(100,160,255,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .price:not(.hi){background:#FFEFE3}
.sk-s04 .price.hi{--s-card-sh:0 14px 28px rgba(140,107,255,.4),inset 0 -8px 12px rgba(0,0,0,.15),inset 0 6px 10px rgba(255,255,255,.4)}
.sk-s04 .fbox{--s-card-sh:0 12px 24px rgba(160,130,255,.3),inset 0 -8px 12px rgba(0,0,0,.1),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .hero-v{border-radius:40px;box-shadow:var(--s-card-sh);overflow:visible}
.sk-s04 .hv-a{position:absolute;width:38%;height:auto;aspect-ratio:1;inset-inline-end:8%;top:10%;border-radius:50%;background:#FFD93D;box-shadow:inset 0 -6px 10px rgba(0,0,0,.12),inset 0 5px 8px rgba(255,255,255,.6)}
.sk-s04 .hv-b{position:absolute;width:30%;height:30%;inset-inline-start:12%;bottom:12%;border-radius:24px;background:#8C6BFF;box-shadow:inset 0 -6px 10px rgba(0,0,0,.15),inset 0 5px 8px rgba(255,255,255,.4)}
.sk-s04 .ft{border-top:0}
.sk-s04 .tag{background:#FFD93D;color:#2D2438}
.sk-s04 .price.hi li::before{color:#FFD93D}
.sk-s04 .in::placeholder{color:#6E6180}`,
}),
];
