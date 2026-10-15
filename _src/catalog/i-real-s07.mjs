// s07: הועבר מ-i-style2.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
sk({
  id: "s07", archived: true, name: "ברוטליזם", en: "Brutalism", group: "אמירה וקיצון",
  desc: "גולמי בכוונה: מסגרות שחורות עבות, אפס עיגולים, צל קשיח, גריד חשוף. אנטי-מלוטש, צעיר.",
  when: "מותגים צעירים, סטארטאפים שנמאס להם, אתרי מעצבים, דור Z.",
  no: "קהל מבוגר או שמרני, מוצרים שדורשים רוך וביטחון.",
  recipe: `--bg: #F5F1E8 או #FFF; --ink: #000 (כאן מותר שחור מוחלט. זו האמירה)
borders: 2-3px solid #000 על הכל; radius: 0
צל קשיח: box-shadow: 5px 5px 0 #000 (בלי blur!); hover: translate(-2px,-2px) + צל 7px
טיפוגרפיה: כותרות כבדות מאוד (800-900 מותר כאן), גדלים קופצניים
accent: ניאון אחד (צהוב, ירוק או ורוד) על שחור-לבן; underline עבים; גריד גלוי`,
  apply: "הדר עם border תחתון עבה; הירו טיפוגרפי ענק; טבלאות ורשימות חשופות כאלמנט עיצובי; טפסים גולמיים עם border עבה; תמונות בשחור-לבן או דוטון או במסגרת שחורה.",
  sig: "צל קשיח שזז ב-hover (translate + צל גדל) · מספור מונוספייס חשוף ותגיות בפונט טכני · ניאון אחד על שחור-לבן.",
  avoid: "ברוטליזם מרוכך: פינה מעוגלת פה, צל רך שם. או-או! · שבירת גריד אמיתית. הגולמיות מבוימת, הסדר מתחת · טקסט רץ במשקל כבד.",
  qa: ["radius 0 בכל מקום", "אף צל עם blur", "טקסט רץ במשקל רגיל, הכבדים לכותרות בלבד"],
  engine: "הגולמיות היא בעור. כיול, ריווחים ונגישות מדויקים (זה מה שמפריד ברוטליזם מקצועי מאתר שבור).",
  agent: "עצב ברוטליסטי: מסגרות שחורות עבות, פינות ישרות לחלוטין, צל קשיח מוזח בלי טשטוש, כותרות כבדות מאוד, ניאון אחד על שחור-לבן.",
  note: "בדמו: Karantina דחוס לכותרות הגדולות ולמחיר (כותרות הכרטיסים בפונט הגוף), Miriam Libre לתגיות, לניווט ולפוטר (הוא לא מונוספייס), והמספור במונוספייס אמיתי עם ספרות טבלאיות. צל 5px שגדל ל-7px ב-hover על כרטיסים וכפתורים. הניאון מופיע רק ב-eyebrow, בתג ובכפתור החבילה הנבחרת.",
  fonts: ["Karantina:wght@700", "Miriam Libre:wght@700"],
  css: `.sk-s07 .ref{--s-bg:#F5F1E8;--s-surface:#fff;--s-ink:#000;--s-muted:#000;--s-line:#000;--s-accent:#D9FF00;--s-accent-ink:#000;--s-accent-txt:#000;--s-r:0;--s-btn-r:0;--s-in-r:0;--s-ph:#fff;--s-ph-ink:#000;--s-font-h:"Karantina","Heebo",system-ui,sans-serif;--s-wt-h:700;--s-fz-h:1;--s-lh-h:1;
 --s-card-b:3px solid #000;--s-card-sh:5px 5px 0 #000;--s-btn-b:3px solid #000;--s-btn-sh:5px 5px 0 #000;--s-ghost-b:3px solid #000;--s-ghost-bg:#fff;--s-in-b:3px solid #000;--s-hi-bg:#000;--s-hi-ink:#fff;--s-hi-lift:none;--s-ico-bg:#000;--s-ico-r:0;--s-hd-line:3px solid #000;--s-form-bg:#fff;--s-gap:24px}
.sk-s07 .hero h1{font-size:clamp(56px,9.5cqi,124px);line-height:.9;max-width:none}
.sk-s07 .sec h2{font-size:clamp(44px,7cqi,100px);line-height:.9}
.sk-s07 .card h3,.sk-s07 .price h3{font-size:clamp(26px,3cqi,42px);line-height:1}
.sk-s07 .price .amt{font-size:clamp(44px,5.5cqi,80px)}
.sk-s07 .price .amt small{display:block;margin:6px 0 0;font-family:${TAG}}
.sk-s07 .eyebrow{background:#D9FF00;padding:3px 8px;font-family:${TAG};font-weight:700}
.sk-s07 .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 #000}
.sk-s07 .btn.ghost{box-shadow:5px 5px 0 #000}
.sk-s07 .card:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 #000}
.sk-s07 .price.hi:hover{transform:translate(-2px,-2px)}
.sk-s07 .nav a{padding:6px 12px;border:2px solid #000;font-family:${TAG};font-weight:700}
.sk-s07 .hero-v{border:3px solid #000;box-shadow:8px 8px 0 #000;background:#fff repeating-linear-gradient(45deg,#000 0 2px,transparent 2px 14px)}
.sk-s07 .hv-a,.sk-s07 .hv-b{display:none}
.sk-s07 .hv-l{background:#fff;border:3px solid #000;padding:8px 18px;font-family:${TAG}}
.sk-s07 .num{display:block;font-family:${MONO};font-variant-numeric:tabular-nums;font-size:13px;font-weight:700;margin-bottom:10px}
.sk-s07 .ico{display:none}
.sk-s07 .price.hi .amt,.sk-s07 .price.hi li::before{color:#D9FF00}
.sk-s07 .price.hi .btn{background:#D9FF00;border-color:#fff;box-shadow:5px 5px 0 #fff}
.sk-s07 .in{font-family:${TAG}}
.sk-s07 .ft{border-top:3px solid #000;font-family:${TAG};font-weight:700}
.sk-s07 .tag{border-radius:0;border:2px solid #000}
.sk-s07 .logo::before{border-radius:0;background:#000}`,
}),
];
