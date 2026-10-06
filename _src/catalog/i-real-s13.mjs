// שפה s13: עמוד הייחוס בבנייה מחדש (6.10.2026, ליאב: "שיפוץ רציני לעורות", כיוון ב). עד שהעמוד האמיתי מוכן, זה הדמו הישן.
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
];
