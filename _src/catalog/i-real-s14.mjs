// שפה s14: עמוד הייחוס בבנייה מחדש (6.10.2026, ליאב: "שיפוץ רציני לעורות", כיוון ב). עד שהעמוד האמיתי מוכן, זה הדמו הישן.
// S13 כהה-יוקרתי נכרה משלושה פרויקטים שכבר עברו את השיפוט של ליאב (סברדלוב, מגן מצדה, /start),
// והעור המלא שלו יושב ב-skins/dark-luxury.md. S14 חם-אורגני הוא blueprint: אין לו עדיין
// פרויקט אמיתי, והוא נבנה מהמנוע ומהמגמה של 2026 (חימר, טרקוטה, ירוקים עמומים, סריף).
import { sk } from "./i-style1.mjs";

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`;

export default [
sk({
  id: "s14", name: "חם אורגני", en: "Warm Organic", group: "שפות מהשטח", fonts: ["Frank Ruhl Libre:wght@500"],
  desc: "פשתן, טרקוטה וירוק מרווה. סריף רך לכותרות, צורות עגולות, מרקם נייר עדין ותמונות חמות. מרגיש כמו חדר טיפולים עם אור טבעי, לא כמו אפליקציה.",
  when: "קליניקות ומטפלים, יוגה ופילאטיס, תזונה ומזון טבעי, קוסמטיקה, דולות ולידה, סטודיו לקרמיקה, בתי קפה ואירוח. כל עסק שמוכר רוגע, מגע וטבע.",
  no: "משפט, פיננסים, ביטחון, טכנולוגיה, מערכות. שם החום נקרא כחוסר רצינות. וגם לא לחנויות עם מאות מוצרים: הסריף והרדיוסים מאטים סריקה.",
  recipe: `bg #F5EFE6 (פשתן, אף פעם לא לבן) · surface #FBF8F3 · ink #2F2A25 (חום כהה, לא שחור) · muted #6B6157 · line #E3D9CC
accent טרקוטה #A9502F (שמנת עליה 5.15; #B85C38 הבהיר נותן 4.3 ונופל) · accent-text #9A4A2B (לטקסט קטן, AA על פשתן) · accent-ink #FFF8F2
מרווה #6F7F63 רק לאייקונים ואיורים, לעולם לא לכפתור; שורת הפתיחה במרווה כהה #56644B (5.5 על פשתן; #6F7F63 נותן 3.8)
רדיוסים גדולים: control 999 (pill), card 24 · אין צללים, ההפרדה בגוון (bg מול surface) ובקו שיער חם
גרעין נייר ב-3% על הרקע · תמונות חמות עם פינה אחת עגולה מאוד (radius 40% בפינה אחת בלבד)
טיפוגרפיה: סריף רך לכותרות (Frank Ruhl Libre 500, לא 700, בדמו בלבד; בפרויקט אמיתי W2 או H1 מ-library/fonts.md, כי אין בערכה סריף עברי) + סאנס הומניסטי לגוף; H1 בגודל בינוני, לא ענק: הרוגע בא מהאוויר ולא מהגודל`,
  apply: "הדר על bg בלי קו, הלוגו כטקסט סריף; הירו עם תמונה בפינה עגולה אחת ושורת פתיחה במרווה; כרטיסים על surface עם קו שיער חם, אייקון בעיגול פשתן; החבילה הנבחרת על טרקוטה בהירה מאוד (tint 10%) עם גבול טרקוטה, לא כהה; טופס בפינות עגולות מאוד עם שדות על surface; פוטר על גוון פשתן כהה יותר (#EDE4D6). מפרידי סקשן מותר גל עדין אחד, לא בכל מעבר.",
  sig: "פינה עגולה אחת בתמונת ההירו (לא בלוב, 23.9.2026) · ירוק מרווה שמופיע רק באייקונים ובשורת הפתיחה · כפתור pill בטרקוטה עם טקסט שמנת · גרעין נייר עדין שרואים רק כשמתקרבים · כותרת סריף במשקל 500 על גוף סאנס.",
  avoid: "פסטל חיוור וחסר רוויה (זה קליימורפיזם עייף, לא אורגני) · בלובים (נפסלו כנישתיים, 23.9.2026) · טרקוטה גם כרקע וגם ככפתור, ואז אין CTA · סריף לגוף הטקסט (קריאות בעברית נופלת) · תמונות סטוק קרות עם פילטר חם · צל רך על הכל \"כדי שירגיש רך\": הרכות באה מהגוון, לא מהצל.",
  qa: ["רקע פשתן ולא לבן, ink חום ולא שחור", "טרקוטה רק על CTA, מספרים ומצב פעיל; מרווה רק על אייקונים ואיורים", "accent-text (הכהה) על כל טקסט קטן צבעוני, AA על פשתן", "אפס צללים, פינה עגולה בתמונה אחת בעמוד לכל היותר", "סריף בכותרות בלבד, גוף סאנס 16 ומעלה", "גרעין נייר ב-3% ולא מאחורי טקסט על תמונה"],
  engine: "ניגודיות (נמדד 30.9.2026): accent-text #9A4A2B על #F5EFE6 = 5.4 · muted #6B6157 על #F5EFE6 = 5.3, על surface 5.7, על הפוטר #EDE4D6 4.8 (ה-muted הקודם #7A6F64 נתן 4.29 ונפל) · שמנת על טרקוטה #A9502F = 5.15. שדות 16px. הסריף מכויל לפי font-calibration.md (בדמו Frank Ruhl Libre לא מכויל, נמדד ב-canvas 0.96 ו-λ 1.04; בפרויקט הכיול של W2 או H1 מ-library/fonts.md). reduced-motion: אין תנועה מיוחדת לכבות, זו שפה סטטית מטבעה.",
  agent: "עצב בסגנון חם-אורגני: רקע פשתן חם ולא לבן, טקסט חום כהה, מבטא טרקוטה אחד לכפתורי pill ולמספרים, ירוק מרווה רק לאייקונים, כותרות בסריף רך במשקל בינוני על גוף סאנס, תמונה אחת עם פינה עגולה מאוד, אפס צללים והפרדה בגוון, גרעין נייר עדין ברקע.",
  note: "בדמו: פשתן, טרקוטה ומרווה. הוויז'ואל בהירו עם פינה אחת עגולה מאוד ולא ארבע, ובלי בלוב (הוסר 30.9.2026), H1 בגודל בינוני (עד 52px ולא 64),אייקוני הכרטיסים עיגולי פשתן עם נקודת מרווה, החבילה הנבחרת על טרקוטה 10% ולא כהה, הטופס בפינות עגולות. הרוגע בא מהגוון ומהאוויר. השווה ל-s04 קליימורפיזם: שם משחקי ומנופח, כאן שקט ובוגר.",
  css: `.sk-s14 .ref{--s-bg:#F5EFE6;--s-surface:#FBF8F3;--s-ink:#2F2A25;--s-muted:#6B6157;--s-line:#E3D9CC;--s-accent:#A9502F;--s-accent-ink:#FFF8F2;--s-accent-txt:#9A4A2B;--s-r:24px;--s-btn-r:999px;--s-in-r:999px;--s-ph:#E8DCCB;--s-ph-ink:#6B6157;--s-accent-soft:#EFE3D3;
 --s-card-b:1px solid #E3D9CC;--s-card-sh:none;--s-ghost-bg:transparent;--s-ghost-ink:#2F2A25;--s-ghost-b:1px solid #C9B9A4;
 --s-in-b:1px solid #D9CDBB;--s-in-bg:#FBF8F3;--s-hd-bg:transparent;--s-hd-line:0;
 --s-hi-bg:#F3E3D6;--s-hi-ink:#2F2A25;--s-hi-b:1px solid #A9502F;--s-hi-lift:translateY(-6px);--s-hi-btn:#A9502F;--s-hi-btn-ink:#FFF8F2;--s-ico-bg:#EFE3D3;--s-ico-r:50%;--s-form-bg:#FBF8F3;--s-logo-r:50%;
 --s-font-h:"Frank Ruhl Libre","David Libre",Georgia,serif;--s-wt-h:500;--s-fz-h:1;--s-lh-h:1;--s-wt-h3:600}
.sk-s14 .ref::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.035;background:${GRAIN};z-index:0}
.sk-s14 .logo{font-family:var(--s-font-h);font-weight:500;font-size:20px}
.sk-s14 .logo::before{background:#6F7F63}
.sk-s14 .eyebrow{color:#56644B;font-weight:600}
.sk-s14 .hero h1{font-size:clamp(30px,4.2cqi,52px);letter-spacing:0;line-height:1.15}
.sk-s14 .hero-v{border-radius:24px;border-start-start-radius:42%;background:linear-gradient(160deg,#E8DCCB,#D8C4A8);color:#5B4B3C}
.sk-s14 .hv-a,.sk-s14 .hv-b{display:none}
.sk-s14 .hv-l{background:#FBF8F3;padding:8px 18px;border-radius:999px;font-family:var(--s-font-h);font-weight:500}
.sk-s14 .btn{font-weight:600}
.sk-s14 .btn:hover{background:#8F4327}
.sk-s14 .btn.ghost:hover{background:#EFE3D3;border-color:#A9502F}
.sk-s14 .sec h2{font-weight:500}
.sk-s14 .ico{position:relative}
.sk-s14 .ico::after{content:"";position:absolute;inset:0;margin:auto;width:12px;height:12px;border-radius:50%;background:#6F7F63}
.sk-s14 .price li::before{color:#6F7F63}
.sk-s14 .price.hi h3,.sk-s14 .price.hi .amt{color:#2F2A25}
.sk-s14 .price.hi ul,.sk-s14 .price.hi p,.sk-s14 .price.hi .amt small{color:#6B6157}
.sk-s14 .tag{border-radius:999px}
.sk-s14 .fbox{border-radius:32px}
.sk-s14 .in::placeholder{color:#6B6157}
.sk-s14 .in:focus{outline:0;border-color:#A9502F;box-shadow:0 0 0 3px rgba(169,80,47,.18)}
.sk-s14 .ft{background:#EDE4D6;border-top:0}`,
}),
];
