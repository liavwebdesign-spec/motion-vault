// s11: הועבר מ-i-style2.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
sk({
  id: "s11", archived: true, name: "ממפיס", en: "Memphis", group: "שפות נוספות",
  desc: "צורות גיאומטריות צבעוניות, דפוסים, קווי מתאר שחורים. אנרגיה צעירה.",
  when: "אירועים, חינוך, מותגי צעירים, כל מה שרוצה לצעוק בשמחה.",
  no: "עסקים שצריכים שקט, יוקרה או אמינות שמרנית.",
  recipe: `3-4 צבעים + שחור; קווי מתאר 2px שחורים; צל מוזח בצבע (4px 4px 0)
צורות כתכשיטים (B13): עיגול, משולש, ריבוע מסובב, זיגזג, מעוגנים לפינות הגריד
דפוס נקודות או זיגזג עדין, רק ברקעי ויז'ואל, אף פעם לא מאחורי טקסט`,
  apply: "כל כרטיס בצבע אחר עם מתאר שחור; אייקונים = צורות גיאומטריות פשוטות; זיגזג כמפריד סקשנים; דפוס נקודות בתוך הוויז'ואל בלבד; הטופס על משטח צהוב עם מתאר.",
  sig: "צורה גיאומטרית מעוגנת לפינת גריד · צל מוזח צבעוני · זיגזג כמפריד.",
  avoid: "צורות מפוזרות בלי עוגן לגריד · יותר מ-4 צבעים · דפוס רועש מאחורי טקסט.",
  qa: ["לכל היותר 4 צבעים ושחור", "כל צורה מעוגנת לגריד או לפינת אלמנט", "אין דפוס מאחורי טקסט רץ"],
  engine: "",
  agent: "עצב בסגנון Memphis: צורות גיאומטריות צבעוניות עם קווי מתאר שחורים, 3-4 צבעים חיים ושחור, צל מוזח צבעוני, זיגזג כמפריד, דפוס נקודות רק ברקעי ויז'ואל.",
  note: "בדמו: קורל, צהוב, כחול, ירוק ושחור. הנקודות רק בתוך הוויז'ואל, הזיגזג בתחתית ההירו, וכל אייקון הוא צורה אחרת (עיגול, משולש, מעוין).",
  fonts: ["Rubik:wght@800"],
  css: `.sk-s11 .ref{--s-bg:#FFFDF5;--s-surface:#fff;--s-ink:#111;--s-muted:#333;--s-line:#111;--s-accent:#111;--s-accent-ink:#FFD93D;--s-accent-txt:#D1382E;--s-r:14px;--s-ph:#4DA3FF;--s-ph-ink:#111;--s-font-h:"Rubik","Heebo",system-ui,sans-serif;--s-wt-h:800;--s-fz-h:1;--s-lh-h:1;
 --s-card-b:2px solid #111;--s-card-sh:5px 5px 0 #FFD93D;--s-btn-b:2px solid #111;--s-btn-sh:4px 4px 0 #FF5C5C;--s-ghost-b:2px solid #111;--s-ghost-bg:#fff;--s-in-b:2px solid #111;--s-hi-bg:#FF5C5C;--s-hi-ink:#111;--s-hi-b:2px solid #111;--s-ico-r:0;--s-hd-line:2px solid #111;--s-form-bg:#FFD93D;--s-gap:24px}
.sk-s11 .hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:12px;background:linear-gradient(135deg,#111 25%,transparent 25%) 0 0/24px 12px,linear-gradient(225deg,#111 25%,transparent 25%) 0 0/24px 12px}
.sk-s11 .hero-v{background:#4DA3FF radial-gradient(#111 1.4px,transparent 1.5px);background-size:16px 16px;border:2px solid #111;box-shadow:8px 8px 0 #2ED573}
.sk-s11 .hv-a{position:absolute;width:34%;aspect-ratio:1;inset-inline-end:10%;top:10%;background:#FFD93D;clip-path:polygon(50% 0,100% 100%,0 100%)}
.sk-s11 .hv-b{position:absolute;width:30%;aspect-ratio:1;inset-inline-start:10%;bottom:12%;border-radius:50%;background:#FF5C5C;border:2px solid #111}
.sk-s11 .hv-l{background:#fff;border:2px solid #111;padding:6px 14px;border-radius:999px}
.sk-s11 .bens .card:nth-child(1){background:#FFD93D;--s-card-sh:5px 5px 0 #111}
.sk-s11 .bens .card:nth-child(2){background:#2ED573;--s-card-sh:5px 5px 0 #111}
.sk-s11 .bens .card:nth-child(3){background:#4DA3FF;--s-card-sh:5px 5px 0 #111}
.sk-s11 .bens .card p{color:#111}
.sk-s11 .ico{background:#111}
.sk-s11 .bens .card:nth-child(1) .ico{border-radius:50%}
.sk-s11 .bens .card:nth-child(2) .ico{clip-path:polygon(50% 0,100% 100%,0 100%)}
.sk-s11 .bens .card:nth-child(3) .ico{transform:rotate(45deg) scale(.8)}
.sk-s11 .sec h2{position:relative;display:inline-block;padding-inline-end:44px}
.sk-s11 .sec h2::after{content:"";position:absolute;inset-inline-end:0;top:50%;width:26px;height:26px;border-radius:50%;background:#FF5C5C;border:2px solid #111;translate:0 -50%}
.sk-s11 .prices{background:repeating-linear-gradient(-45deg,transparent 0 12px,rgba(17,17,17,.05) 12px 14px)}
.sk-s11 .price.hi .btn{background:#111;color:#FFD93D;box-shadow:4px 4px 0 #fff}
.sk-s11 .price.hi li::before{color:#111}
.sk-s11 .tag{background:#FFD93D;color:#111;border:2px solid #111}
.sk-s11 .fbox{box-shadow:6px 6px 0 #111}
.sk-s11 .fbox p{color:#111}
.sk-s11 .in{background:#fff}
.sk-s11 .ft{border-top:2px solid #111}
.sk-s11 .logo::before{border-radius:50%;background:#FF5C5C;border:2px solid #111}`,
}),
];
