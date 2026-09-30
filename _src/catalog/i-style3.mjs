// שפות עיצוב S13 ו-S14 (10.9.2026): שתי השפות שהיו חסרות לפי הפרויקטים האמיתיים.
// S13 כהה-יוקרתי נכרה משלושה פרויקטים שכבר עברו את השיפוט של ליאב (סברדלוב, מגן מצדה, /start),
// והעור המלא שלו יושב ב-skins/dark-luxury.md. S14 חם-אורגני הוא blueprint: אין לו עדיין
// פרויקט אמיתי, והוא נבנה מהמנוע ומהמגמה של 2026 (חימר, טרקוטה, ירוקים עמומים, סריף).
import { sk } from "./i-style1.mjs";

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`;

export default [
sk({
  id: "s13", name: "כהה יוקרתי", en: "Dark Luxury", group: "שפות מהשטח", fonts: ["Frank Ruhl Libre:wght@500"],
  desc: "רקע כהה עמוק שאינו שחור, טקסט שמנת, ומבטא בהיר אחד שעושה את כל ההכוונה. השקט של המינימליזם העריכתי, בלילה. זו השפה שרוב הלקוחות שלנו ביקשו בפועל.",
  when: "עורכי דין, פיננסים, ביטחון ומיגון, אדריכלות, נדל\"ן יוקרתי, טכנולוגיה פרימיום, ואתרי סטודיו. כל מי שמוכר סמכות ושקט ולא חום.",
  no: "קליניקות, ילדים, מזון, חנויות יומיומיות, כל עסק שצריך להרגיש נגיש וחם. ואתרי תוכן ארוכים: קריאה ארוכה על כהה מעייפת.",
  recipe: `זה העור המלא skins/dark-luxury.md (נכרה מסברדלוב, מגן מצדה ו-/start). הדמו כאן על הפלטה של סברדלוב:
bg #16233A (נייבי, לא שחור) · surface #1C2A44 · surface-2 #0F1729 (עמוק יותר, לסקשן נשימה) · ink #F4F1EC (שמנת) · ink-soft rgba(244,241,236,.82) · muted #8C97AC
line rgba(244,241,236,.12) · line-strong .24 · CTA = שמנת מלאה עם טקסט נייבי (המבטא הבהיר היחיד) · focus 0 0 0 3px rgba(244,241,236,.15)
רדיוסים קטנים: control 4, card 6 (משפט, ביטחון); בטכנולוגיה 12/16 · צל אחד בלבד: lift 0 18px 50px rgba(6,12,24,.45), על הירו ועל החבילה הנבחרת
ווטרמרק או טקסטורה ב-5 עד 13% לשבירת רצפים כהים · תמונות בציון כהה אחיד (תמיד אותו grade)
וריאנטים שכבר עבדו: מגן מצדה, רקע #0a0a0a + בורדו #8B0000 במינון נמוך + טקסטורת בטון · /start, נייבי #040525 + ליים #D8FC73 + שתי הילות בלבד`,
  apply: "הדר שקוף שהופך אטום בגלילה עם קו שיער תחתון; הירו על bg עם ווטרמרק של סימן המותג ב-13%; כרטיסים על surface בלי גבול ובלי צל (המשטח על ה-bg כבר מפריד), וב-hover עוברים ל-surface-2; סקשן נשימה אחד על surface-2; החבילה הנבחרת מוארת (גבול שמנת + lift), לא צבועה; טופס על surface עם שדות שקופים וגבול line-strong; פוטר על surface-2 עם קו שיער עליון. הצבע השני היחיד הוא המבטא הבהיר (שמנת או ליים), ורק על פעולות ומספרים.",
  sig: "CTA בהיר על כהה, לא צבעוני על כהה · ווטרמרק ענק של סימן המותג מאחורי ההירו · הפרדה בגוון המשטח ובקווי שיער, לא בצללים · ספרות אינדקס (01, 02) ב-muted עם ריווח .14em · מעבר לסקשן עמוק יותר (surface-2) כנשימה.",
  avoid: "שחור טהור #000 (זה חור, לא רקע) · צבע מבטא רווי על כהה (כחול ניאון, סגול): נהיה \"גיימינג\" · גלואו וגרדיאנטים בכל מקום · כרטיס בתוך כרטיס · אפור בהיר לטקסט משני שנופל מ-AA · יותר ממבטא אחד · טקסט רץ ארוך על bg בלי הבהרה ל-ink-soft.",
  qa: ["רקע bg ולא #000, שלושה משטחים מובחנים (bg, surface, surface-2)", "מבטא בהיר אחד, רק על פעולות ומספרים, אפס בכותרות", "muted עובר AA על surface (לא רק על bg)", "צל אחד בלבד בעמוד; ההפרדות בגוון המשטח, וקו שיער רק בהדר, בטופס ובפוטר", "כרטיסים בלי גבול", "טקסטורה או ווטרמרק ב-5 עד 13%, לא מאחורי טקסט רץ", "תמונות באותו grade כהה"],
  engine: "ניגודיות: ink על bg ≥ 12:1, muted על surface ≥ 4.5:1 (נמדד: #8C97AC על #1C2A44 = 5.3). שדות 16px עם רקע שקוף וגבול line-strong. reduced-motion מכבה את הפרילודר והווטרמרק הנע.",
  extra: `מה נלמד בשלושת הפרויקטים (10.9.2026):
סברדלוב (משפט): פלטה מהמיתוג, שמנת כ-CTA, רדיוסים 4 ו-6, גולן ומגידו לעברית ו-Inter ללועזית (היסטוריה: Inter כבר לא מותר, היום Clash Grotesk מ-library/fonts.md), סימן LS כווטרמרק ב-.13 וכפרילודר DrawSVG. הגרסה הראשונה נפסלה כ"חיוור וריק מדי": התיקון היה תמונות אווירה כהות ופרילודר, לא צבע נוסף.
מגן מצדה (ביטחון): רקע #0a0a0a, בורדו במינון נמוך בלבד, טקסטורת בטון לשבירת רצפים שחורים. פונט Talent בפועל.
/start (הסטודיו): נייבי כמעט שחור, ליים אחד, שתי הילות רדיאליות בלבד. היו חמש והורדו: רקע כהה עם הרבה זוהר עמוס ומוריד קריאות.
מלכודת: filter blur בזמן ריצה על שטח כהה גדול מקפיא את הרנדרר, טשטוש נאפה לקובץ.`,
  agent: "עצב בסגנון כהה-יוקרתי: רקע כהה עמוק שאינו שחור (נייבי או פחם), טקסט שמנת, מבטא בהיר אחד בלבד לכפתורים ולמספרים, שלושה משטחים כהים שמופרדים בקווי שיער ולא בצללים, ווטרמרק של סימן המותג מאחורי ההירו, תמונות בציון כהה אחיד, רדיוסים קטנים ותנועה איטית ועדינה.",
  note: "בדמו: פלטת סברדלוב (נייבי ושמנת). ההדר שקוף על הירו עם ווטרמרק, הכרטיסים על surface בלי מסגרת (hover: surface-2), החבילה הנבחרת מוארת בגבול שמנת ומתרוממת, סקשן הטופס על surface-2. אין צבע שלישי בשום מקום. השווה ל-s08: שם הכהה טכנולוגי עם זכוכית וגרדיאנט, כאן הוא שקט ומשפטי.",
  css: `.sk-s13 .ref{--s-bg:#16233A;--s-surface:#1C2A44;--s-ink:#F4F1EC;--s-muted:#8C97AC;--s-line:rgba(244,241,236,.12);--s-accent:#F4F1EC;--s-accent-ink:#16233A;--s-accent-txt:#F4F1EC;--s-r:6px;--s-btn-r:4px;--s-in-r:4px;--s-ph:#1C2A44;--s-ph-ink:rgba(244,241,236,.55);--s-accent-soft:rgba(244,241,236,.08);
 --s-card-b:0;--s-card-sh:none;--s-ghost-bg:transparent;--s-ghost-ink:#F4F1EC;--s-ghost-b:1px solid rgba(244,241,236,.24);
 --s-in-b:1px solid rgba(244,241,236,.24);--s-in-bg:transparent;--s-hd-bg:transparent;--s-hd-line:1px solid rgba(244,241,236,.12);
 --s-hi-bg:#1C2A44;--s-hi-ink:#F4F1EC;--s-hi-b:1px solid #F4F1EC;--s-hi-lift:translateY(-8px);--s-hi-btn:#F4F1EC;--s-hi-btn-ink:#16233A;--s-ico-bg:transparent;--s-ico-b:1px solid rgba(244,241,236,.24);--s-ico-r:4px;--s-form-bg:#0F1729;--s-logo-r:2px;
 --s-font-h:"Frank Ruhl Libre","David Libre",Georgia,serif;--s-wt-h:500;--s-fz-h:1;--s-lh-h:1;--s-wt-h3:600}
.sk-s13 .hero{overflow:hidden}
.sk-s13 .hero::before{content:"LS";position:absolute;inset-inline-end:-2%;top:-12%;font-family:var(--s-font-h);font-size:clamp(220px,42cqi,560px);line-height:1;font-weight:500;color:#F4F1EC;opacity:.06;pointer-events:none;z-index:0;letter-spacing:-.04em}
.sk-s13 .hero-t,.sk-s13 .hero-v{position:relative;z-index:1}
.sk-s13 .eyebrow{color:#8C97AC;font-weight:500}
.sk-s13 .hero h1{letter-spacing:-.01em}
.sk-s13 .hero-v{box-shadow:0 18px 50px rgba(6,12,24,.45);border:1px solid rgba(244,241,236,.12);background:linear-gradient(160deg,#1C2A44,#0F1729)}
.sk-s13 .hv-a{position:absolute;inset:0;background:${GRAIN};opacity:.07;mix-blend-mode:screen}
.sk-s13 .hv-l{border:1px solid rgba(244,241,236,.24);padding:8px 18px;border-radius:4px;font-weight:500}
.sk-s13 .btn{font-weight:500}
.sk-s13 .btn:hover{background:#E6E2DA}
.sk-s13 .btn.ghost:hover{border-color:rgba(244,241,236,.6);background:rgba(244,241,236,.06)}
.sk-s13 .sec h2{font-weight:500}
.sk-s13 .num{display:block;font-family:inherit;font-size:13px;letter-spacing:.14em;color:#8C97AC;margin-bottom:14px;font-variant-numeric:tabular-nums}
.sk-s13 .ico{display:none}
.sk-s13 .card{transition:background-color .2s cubic-bezier(.2,.6,.2,1),transform .2s cubic-bezier(.2,.6,.2,1),box-shadow .2s cubic-bezier(.2,.6,.2,1)}
.sk-s13 .card:hover{background:#0F1729}
.sk-s13 .price.hi{box-shadow:0 18px 50px rgba(6,12,24,.45)}
.sk-s13 .tag{background:#F4F1EC;color:#16233A;border-radius:2px}
.sk-s13 .form{background:#0F1729;border-top:1px solid rgba(244,241,236,.12)}
.sk-s13 .fbox{background:transparent;border:0;padding-inline:0}
.sk-s13 .in{color:#F4F1EC}
.sk-s13 .in::placeholder{color:rgba(244,241,236,.55)}
.sk-s13 .in:focus{outline:0;border-color:#F4F1EC;box-shadow:0 0 0 3px rgba(244,241,236,.15)}
.sk-s13 .ft{background:#0F1729;border-top-color:rgba(244,241,236,.12)}`,
}),

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
