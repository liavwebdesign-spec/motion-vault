// s01: הועבר מ-i-style1.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default [
sk({
  id: "s01", archived: true, name: "סקיאומורפיזם", en: "Skeuomorphism", group: "עומק ומרקם",
  desc: "מחקה את העולם האמיתי: חומרים, צללים ריאליסטיים, כפתורים שנלחצים פיזית.",
  when: "אודיו ומוזיקה, שלטים, ארנקים דיגיטליים, כל מה שרוצה תחושת מכשיר.",
  no: "דשבורדים ו-SaaS עסקי. הטקסטורה גונבת פוקוס מהדאטה.",
  recipe: `--bg: #E8E4DC (נייר או פשתן, אף פעם לא לבן) · טקסטורת רעש עדינה (noise 2-3% opacity)
כפתור: gradient אנכי בהיר לכהה 8% + border כהה 1px + צל: 0 1px 0 rgba(255,255,255,.6) inset (הברקה עליונה), 0 3px 6px rgba(0,0,0,.25)
lifted: צל כפול כבד 0 8px 20px rgba(0,0,0,.3); pressed: inset 0 2px 6px rgba(0,0,0,.35)
רדיוסים בינוניים 8-12; חומרים: עור, עץ, מתכת כרקעי אזור, במשורה`,
  apply: "הדר = משטח חומר עדין; הירו = החפץ או המכשיר במרכז כגיבור; טקסטורה רק ברקעי אזור וכפתורים, לעולם לא מאחורי טקסט רץ; טפסים = שקעים פיזיים עדינים; אייקונים תלת-ממדיים בסגנון אחד עקבי.",
  sig: "כפתור שמרגיש לחיץ (הברקה עליונה + צל) · מעבר חומר מוגדר: עור כהה בהדר ובחבילה הנבחרת מול נייר בגוף · חפץ אמיתי אחד בהירו.",
  avoid: "טקסטורה שונה בכל סקשן · ריאליזם על הכל כולל אזורי טקסט · צללים בלי מקור אור אחיד. חייב כיוון אור אחד לכל העמוד.",
  qa: ["מקור אור אחיד", "אין טקסטורה מאחורי טקסט רץ", "לכל היותר שני חומרים לעמוד"],
  engine: "קונטרסט AA מעל כל טקסטורה; טקסטורות כתמונות דחוסות.",
  agent: "עצב בסגנון סקיאומורפי: אלמנטים שמחקים חומרים אמיתיים, צללים ריאליסטיים ממקור אור אחיד, תחושת עומק פיזית של כפתורים.",
  note: "בדמו: אור מלמעלה בכל אלמנט (הברקה עליונה, צל תחתון), שני חומרים בלבד (נייר ועור כהה), רעש ב-5% על הרקע בלבד. הכפתור שוקע בלחיצה.",
  css: `.sk-s01 .ref{--s-bg:#E8E4DC;--s-surface:#F3EFE7;--s-ink:#2B2620;--s-muted:#6B6259;--s-line:#CFC7B9;--s-accent:#8B5A2B;--s-accent-txt:#7A4A1E;--s-accent-ink:#FFF7EA;--s-r:10px;--s-ph:#D9D2C4;--s-ph-ink:#D8CFC0;--s-accent-soft:#E2DCCF;
 --s-card-b:1px solid #C9C0AF;--s-card-sh:inset 0 1px 0 rgba(255,255,255,.7),0 3px 6px rgba(0,0,0,.18);
 --s-btn-b:1px solid #5E3C1A;--s-btn-sh:inset 0 1px 0 rgba(255,255,255,.45),0 3px 6px rgba(0,0,0,.25);
 --s-in-b:1px solid #B9AF9C;--s-in-bg:#E2DCCF;--s-in-sh:inset 0 2px 5px rgba(0,0,0,.2);
 --s-hd-bg:linear-gradient(#3F332A,#2C231C);--s-hi-bg:linear-gradient(#4A3B2F,#33271E);--s-ico-bg:linear-gradient(#F8F4EC,#D8D0C0);--s-ico-b:1px solid #B9AF9C}
.sk-s01 .ref::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;background:${NOISE};z-index:0}
.sk-s01 .hd{color:#F3EFE7;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 4px 10px rgba(0,0,0,.25)}
.sk-s01 .hd .nav{color:#D8CFC0}
.sk-s01 .btn{background:linear-gradient(#9C6534,#8B5A2B)}
.sk-s01 .btn:active{box-shadow:inset 0 2px 6px rgba(0,0,0,.35);transform:translateY(1px)}
.sk-s01 .btn.ghost{background:linear-gradient(#F8F4EC,#E2DCCF);color:#2B2620;border:1px solid #B9AF9C;box-shadow:inset 0 1px 0 #fff,0 2px 4px rgba(0,0,0,.15)}
.sk-s01 .hero-v{background:linear-gradient(#3F332A,#221B16);border:1px solid #17120F;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 8px 20px rgba(0,0,0,.3)}
.sk-s01 .hv-a{position:absolute;inset:14% 12% 34%;border-radius:8px;background:linear-gradient(#5A4A3C,#3B2F26);box-shadow:inset 0 2px 8px rgba(0,0,0,.6),0 1px 0 rgba(255,255,255,.1)}
.sk-s01 .hv-b{position:absolute;bottom:9%;inset-inline-start:50%;translate:50% 0;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A46A,#8B5A2B 60%,#5E3C1A);box-shadow:0 4px 10px rgba(0,0,0,.5),inset 0 1px 2px rgba(255,255,255,.6)}
.sk-s01 .hv-l{margin-bottom:22%}
.sk-s01 .price.hi{box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 8px 20px rgba(0,0,0,.3);border:1px solid #17120F}
.sk-s01 .price.hi .amt,.sk-s01 .price.hi li::before{color:#E8C58A}
.sk-s01 .in::placeholder{color:#5F574E}`,
}),
];
