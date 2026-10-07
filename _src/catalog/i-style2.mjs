// שפות עיצוב S7-S12. ראה i-style1.mjs לעמוד הייחוס ולהסבר.
import { sk } from "./i-style1.mjs";

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// Miriam Libre הוא פונט התגיות של s07. הוא לא מונוספייס (נמדד 30.9.2026: iiii ברוחב 61px מול MMMM ב-148px), ולכן המספור עובר למונוספייס אמיתי.
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
