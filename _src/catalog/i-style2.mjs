// שפות עיצוב S7-S12. ראה i-style1.mjs לעמוד הייחוס ולהסבר.
import { sk } from "./i-style1.mjs";

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const MONO = `"Miriam Libre",monospace`;

export default [
sk({
  id: "s07", name: "ברוטליזם", en: "Brutalism", group: "אמירה וקיצון",
  desc: "גולמי בכוונה: מסגרות שחורות עבות, אפס עיגולים, צל קשיח, גריד חשוף. אנטי-מלוטש, צעיר.",
  when: "מותגים צעירים, סטארטאפים שנמאס להם, אתרי מעצבים, דור Z.",
  no: "קהל מבוגר או שמרני, מוצרים שדורשים רוך וביטחון.",
  recipe: `--bg: #F5F1E8 או #FFF; --ink: #000 (כאן מותר שחור מוחלט. זו האמירה)
borders: 2-3px solid #000 על הכל; radius: 0
צל קשיח: box-shadow: 5px 5px 0 #000 (בלי blur!); hover: translate(-2px,-2px) + צל 7px
טיפוגרפיה: כותרות כבדות מאוד (800-900 מותר כאן), גדלים קופצניים
accent: ניאון אחד (צהוב, ירוק או ורוד) על שחור-לבן; underline עבים; גריד גלוי`,
  apply: "הדר עם border תחתון עבה; הירו טיפוגרפי ענק; טבלאות ורשימות חשופות כאלמנט עיצובי; טפסים גולמיים עם border עבה; תמונות בשחור-לבן או דוטון או במסגרת שחורה.",
  sig: "צל קשיח שזז ב-hover (translate + צל גדל) · underline עבה כ-accent · מספור ותגיות מונוספייס חשופות.",
  avoid: "ברוטליזם מרוכך: פינה מעוגלת פה, צל רך שם. או-או! · שבירת גריד אמיתית. הגולמיות מבוימת, הסדר מתחת · טקסט רץ במשקל כבד.",
  qa: ["radius 0 בכל מקום", "אף צל עם blur", "טקסט רץ במשקל רגיל, הכבדים לכותרות בלבד"],
  engine: "הגולמיות היא בעור. כיול, ריווחים ונגישות מדויקים (זה מה שמפריד ברוטליזם מקצועי מאתר שבור).",
  agent: "עצב ברוטליסטי: מסגרות שחורות עבות, פינות ישרות לחלוטין, צל קשיח מוזח בלי טשטוש, כותרות כבדות מאוד, ניאון אחד על שחור-לבן.",
  note: "בדמו: Karantina דחוס לכותרות, Miriam Libre כמונוספייס לתגיות ולמספור, צל 5px שגדל ל-7px ב-hover על כרטיסים וכפתורים. הניאון מופיע רק ב-eyebrow, בתג ובכפתור החבילה הנבחרת.",
  fonts: ["Karantina:wght@700", "Miriam Libre:wght@700"],
  css: `.sk-s07 .ref{--s-bg:#F5F1E8;--s-surface:#fff;--s-ink:#000;--s-muted:#000;--s-line:#000;--s-accent:#D9FF00;--s-accent-ink:#000;--s-accent-txt:#000;--s-r:0;--s-btn-r:0;--s-in-r:0;--s-ph:#fff;--s-ph-ink:#000;--s-font-h:"Karantina",inherit;--s-wt-h:700;
 --s-card-b:3px solid #000;--s-card-sh:5px 5px 0 #000;--s-btn-b:3px solid #000;--s-btn-sh:5px 5px 0 #000;--s-ghost-b:3px solid #000;--s-ghost-bg:#fff;--s-in-b:3px solid #000;--s-hi-bg:#000;--s-hi-ink:#fff;--s-hi-lift:none;--s-ico-bg:#000;--s-ico-r:0;--s-hd-line:3px solid #000;--s-form-bg:#fff;--s-gap:24px}
.sk-s07 .hero h1{font-size:clamp(56px,9.5cqi,124px);line-height:.9;max-width:none}
.sk-s07 .sec h2{font-size:clamp(44px,7cqi,100px);line-height:.9}
.sk-s07 .card h3,.sk-s07 .price h3{font-size:clamp(26px,3cqi,42px);line-height:1}
.sk-s07 .price .amt{font-size:clamp(44px,5.5cqi,80px)}
.sk-s07 .price .amt small{display:block;margin:6px 0 0;font-family:"Miriam Libre",monospace}
.sk-s07 .eyebrow{background:#D9FF00;padding:3px 8px;font-family:${MONO};font-weight:700}
.sk-s07 .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 #000}
.sk-s07 .btn.ghost{box-shadow:5px 5px 0 #000}
.sk-s07 .card:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 #000}
.sk-s07 .price.hi:hover{transform:translate(-2px,-2px)}
.sk-s07 .nav a{padding:6px 12px;border:2px solid #000;font-family:${MONO};font-weight:700}
.sk-s07 .hero-v{border:3px solid #000;box-shadow:8px 8px 0 #000;background:#fff repeating-linear-gradient(45deg,#000 0 2px,transparent 2px 14px)}
.sk-s07 .hv-a,.sk-s07 .hv-b{display:none}
.sk-s07 .hv-l{background:#fff;border:3px solid #000;padding:8px 18px;font-family:${MONO}}
.sk-s07 .num{display:block;font-family:${MONO};font-size:13px;font-weight:700;margin-bottom:10px}
.sk-s07 .ico{display:none}
.sk-s07 .price.hi .amt{color:#D9FF00}
.sk-s07 .price.hi .btn{background:#D9FF00;border-color:#fff;box-shadow:5px 5px 0 #fff}
.sk-s07 .in{font-family:${MONO}}
.sk-s07 .ft{border-top:3px solid #000;font-family:${MONO};font-weight:700}
.sk-s07 .tag{border-radius:0;border:2px solid #000}
.sk-s07 .logo::before{border-radius:0;background:#000}`,
}),

sk({
  id: "s08", name: "ליקוויד גלאס", en: "Liquid Glass", group: "אמירה וקיצון",
  desc: "הזכוכית הנוזלית של Apple: עיוות עדשה, הבזקי אור, שקיפות דינמית. עתידני, 2026.",
  when: "אפליקציות iOS מודרניות, מוצרי AI, מי שרוצה להרגיש חוד.",
  no: "אתרי תוכן כבדים. מסיח ומכביד.",
  recipe: `בסיס גלסמורפיזם (שפה 3) + תוספות:
highlight נודד: pseudo-element עם gradient אלכסוני בהיר שזז ב-hover (translate, .6s)
קצה עדשה: border עם gradient (לבן-חזק לשקוף) + inset 0 0 20px rgba(255,255,255,.15)
תנועה נוזלית: transitions .5-.7s עם easing רך מאוד; רקע: gradient כהה עשיר עם נקודות אור`,
  apply: "לרכיבי ניווט ופעולה בלבד (כמו Apple): הדר, טאב-בר, כפתורים צפים; התוכן עצמו על משטחים רגילים. הזכוכית החיה היא השכבה שמעל התוכן, לא התוכן.",
  sig: "highlight שנודד לאט ב-hover · קצה עדשה בגרדיאנט · תנועה איטית-נוזלית שמרגישה כבדה-יוקרתית.",
  avoid: "ליקוויד על הכל (יקר, מסיח, זול-למראה) · זכוכית בלי רקע דינמי מאחוריה · אנימציות מהירות ששוברות את הנוזליות.",
  qa: ["לכל היותר 3-4 אלמנטים חיים במסך", "מובייל מקבל גרסה סטטית", "reduced-motion מקפיא הכל"],
  engine: "",
  extra: `ערכים שנלטשו בפרויקט אמיתי (דף קורס Lovable, 8.2026), נקודת פתיחה לעור כהה:
--bg:#08070C · surface:#12101B · ink:#F6F4FB · muted:rgba(246,244,251,.70)
זכוכית: rgba(255,255,255,.06-.07) + blur 18-22 + border rgba(255,255,255,.14-.18)
      + inset 0 0 16-20px rgba(255,255,255,.04-.06) + fallback @supports not backdrop-filter
קצה עדשה: ::before עם gradient 150deg לבן .28 לשקוף ללבן .10 במסכת border (padding:1px, mask-composite:exclude)
הבזק נודד: ::after אלכסוני שזז ב-hover, transition .7s
פלטת Lovable: כתום #FF7A2F · ורוד #FF3D8A · סגול #8A5CFF · כחול #2E6BFF
CTA בלעדי: gradient #E8468C ל-#F0561C, טקסט לבן 18px/700 ומעלה (מתחת לזה נופל AA על הקצה הכתום)
רקע: אורורה רציפה ברמת העמוד, B17 ב-behaviors.md (לא פר-סקשן!)
מלכודת: קלאס זכוכית עם overflow:hidden (בשביל ההבזק הנודד) חותך ילדים שחורגים מהקופסה (עיגולי מספור, באדג'ים צפים). לאלמנטים כאלה בונים זכוכית ידנית בלי overflow ובלי ::after, או מוציאים את הילד החורג מחוץ לקופסה.
מהלכים שעבדו: מילת ענק שקופה מאחורי ההירו (background-clip:text על gradient אנכי לבן .09 ל-.012; במובייל לשבור לשתי שורות, nowrap גולש מעבר למסך) · אייקוני גרדיאנט 52px בכרטיסים (כל כרטיס גרדיאנט אחר מהפלטה) · לוגו או אלמנט מותג צף חופשי עם drop-shadow צבעוני כפול במקום בתוך מסגרת · טיימליין מתמלא B18.`,
  agent: "עצב בסגנון Liquid Glass של Apple: הדר וכפתורים כזכוכית חיה עם עיוות עדשה והבזק אור נודד, תנועה איטית ונוזלית; התוכן על משטחים רגילים.",
  note: "בדמו: זכוכית חיה רק על ההדר, הכפתורים והחבילה הנבחרת (קצה עדשה + הבזק ב-hover, .7s). הכרטיסים הרגילים על משטח רגיל. המילה הענקית מאחורי ההירו היא הערך שנלטש בדף הקורס.",
  css: `.sk-s08 .ref{--s-bg:#08070C;--s-surface:#12101B;--s-ink:#F6F4FB;--s-muted:rgba(246,244,251,.72);--s-line:rgba(255,255,255,.1);--s-accent:linear-gradient(135deg,#E8468C,#F0561C);--s-accent-ink:#fff;--s-accent-txt:#FF8FB8;--s-r:18px;--s-btn-r:999px;--s-ph:#12101B;--s-ph-ink:rgba(246,244,251,.6);
 --s-card-b:1px solid rgba(255,255,255,.08);--s-card-sh:none;--s-ghost-bg:rgba(255,255,255,.07);--s-ghost-b:1px solid rgba(255,255,255,.16);--s-ghost-ink:#F6F4FB;--s-in-b:1px solid rgba(255,255,255,.14);--s-in-bg:rgba(255,255,255,.06);--s-in-r:999px;--s-hi-bg:rgba(255,255,255,.07);--s-hi-b:1px solid rgba(255,255,255,.18);--s-ico-bg:linear-gradient(135deg,#8A5CFF,#2E6BFF);--s-form-bg:#12101B;--s-hd-bg:rgba(255,255,255,.06);--s-hd-line:1px solid rgba(255,255,255,.12);
 background:radial-gradient(50% 40% at 20% 0%,rgba(138,92,255,.35),transparent 70%),radial-gradient(40% 35% at 85% 30%,rgba(255,61,138,.25),transparent 70%),radial-gradient(45% 40% at 50% 100%,rgba(46,107,255,.28),transparent 70%),#08070C}
.sk-s08 .btn{font-size:18px;font-weight:700;position:relative;overflow:hidden;transition:transform .6s cubic-bezier(.2,.6,.2,1),box-shadow .6s}
.sk-s08 .btn.sm{font-size:15px}
.sk-s08 .btn.ghost,.sk-s08 .hd,.sk-s08 .price.hi,.sk-s08 .in{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:inset 0 0 18px rgba(255,255,255,.05)}
.sk-s08 .btn.ghost::before,.sk-s08 .price.hi::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(150deg,rgba(255,255,255,.28),rgba(255,255,255,0) 45%,rgba(255,255,255,.1));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.sk-s08 .btn::after{content:"";position:absolute;inset:-40% -60%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);transform:translateX(-60%);transition:transform .7s cubic-bezier(.2,.6,.2,1);pointer-events:none}
.sk-s08 .btn:hover::after{transform:translateX(60%)}
.sk-s08 .hero::before{content:"אור";position:absolute;inset-inline-end:var(--pad);top:0;font-size:clamp(120px,28cqi,360px);font-weight:800;line-height:1;background:linear-gradient(#fff,rgba(255,255,255,.1));-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.09;pointer-events:none;z-index:0}
.sk-s08 .hero-t,.sk-s08 .hero-v{position:relative;z-index:1}
.sk-s08 .hero-v{border:1px solid rgba(255,255,255,.1)}
.sk-s08 .hv-a{position:absolute;width:60%;height:60%;inset-inline-start:-15%;top:-15%;border-radius:50%;background:radial-gradient(circle,rgba(138,92,255,.7),transparent 70%);filter:blur(14px)}
.sk-s08 .hv-b{position:absolute;width:55%;height:55%;inset-inline-end:-12%;bottom:-12%;border-radius:50%;background:radial-gradient(circle,rgba(255,61,138,.6),transparent 70%);filter:blur(14px)}
.sk-s08 .hv-l{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);padding:8px 18px;border-radius:999px;backdrop-filter:blur(12px)}
.sk-s08 .bens .card:nth-child(2) .ico{background:linear-gradient(135deg,#FF3D8A,#FF7A2F)}
.sk-s08 .bens .card:nth-child(3) .ico{background:linear-gradient(135deg,#2E6BFF,#8A5CFF)}
.sk-s08 .in{color:#F6F4FB}
.sk-s08 .in::placeholder{color:rgba(246,244,251,.5)}
@supports not (backdrop-filter:blur(1px)){.sk-s08 .btn.ghost,.sk-s08 .hd,.sk-s08 .price.hi{background:rgba(18,16,27,.92)}}
@media (prefers-reduced-motion:reduce){.sk-s08 .btn::after{transition:none}}`,
}),

sk({
  id: "s09", name: "Soft Modern", en: "Soft Modern", group: "שפות נוספות",
  desc: "לבנדר ולבן בשכבות, רדיוסים גדולים, צללים רכים, כרטיסים ממוספרים. ייעוץ, בריאות, טק.",
  when: "ייעוץ, בריאות, טק, כל עסק שרוצה להיראות מודרני ורך בלי להיות ילדותי.",
  no: "מותגים שצריכים חדות, יוקרה קרה או אמירה חזקה.",
  recipe: "זה העור המלא soft-modern.md. להשתמש בו.",
  apply: "שלושה עומקים תמיד: רקע לבנדר, כרטיסים לבנים, ואלמנט אחד מוגבה וכהה; כפתורי pill עם באדג' חץ; מספור 001 בכרטיסים; ריווח נדיב ורדיוסים 20 ומעלה.",
  sig: "כרטיס-גיבור כהה בתוך גריד בהיר · מספור 001 · כפתור pill עם באדג'-חץ.",
  avoid: "הכל באותה שכבת משטח (חייב 3 עומקים) · צללים כבדים.",
  qa: ["שלושה עומקי משטח נראים בכל מסך", "צל אחד רך, אף פעם לא כהה"],
  engine: "",
  agent: "עצב בסגנון Soft Modern: רקע לבנדר בהיר, כרטיסים לבנים עם רדיוסים גדולים וצל רך, כרטיס-גיבור כהה אחד, כפתורי pill עם באדג' חץ עגול, מספור 001.",
  note: "בדמו: כרטיס היתרון הראשון והחבילה הנבחרת הם השכבה הכהה, כל השאר לבן על לבנדר. החץ בכפתור פונה שמאלה כי זה כיוון ההתקדמות ב-RTL.",
  css: `.sk-s09 .ref{--s-bg:#F3F1FB;--s-surface:#fff;--s-ink:#1E1B3A;--s-muted:#5E5A7A;--s-line:#E4E1F2;--s-accent:#6C5CE7;--s-accent-ink:#fff;--s-r:22px;--s-btn-r:999px;--s-ph:#E7E3F7;--s-ph-ink:#5E5A7A;--s-accent-soft:#EDE9FF;
 --s-card-b:0;--s-card-sh:0 10px 30px rgba(80,70,140,.08);--s-ghost-bg:#fff;--s-ghost-b:0;--s-in-b:0;--s-in-bg:#F3F1FB;--s-in-r:999px;--s-hi-bg:#1E1B3A;--s-hi-ink:#fff;--s-ico-bg:#EDE9FF;--s-ico-r:50%;--s-form-bg:#fff}
.sk-s09 .btn::after{content:"←";width:26px;height:26px;border-radius:50%;background:#fff;color:#6C5CE7;display:inline-grid;place-items:center;font-size:14px;font-weight:700;margin-inline-start:4px;flex:none}
.sk-s09 .btn.ghost::after{background:#EDE9FF}
.sk-s09 .btn.sm::after{width:22px;height:22px;font-size:12px}
.sk-s09 .btn.ghost{box-shadow:0 10px 30px rgba(80,70,140,.08)}
.sk-s09 .num{display:block;font-size:12px;font-weight:600;color:#6C5CE7;margin-bottom:14px}
.sk-s09 .num::before{content:"0"}
.sk-s09 .bens .card:first-child{background:#1E1B3A;color:#fff}
.sk-s09 .bens .card:first-child h3,.sk-s09 .bens .card:first-child p{color:inherit}
.sk-s09 .bens .card:first-child .ico{background:#6C5CE7}
.sk-s09 .bens .card:first-child .num{color:#B8AEFF}
.sk-s09 .hero-v{box-shadow:0 20px 50px rgba(80,70,140,.12)}
.sk-s09 .hv-a{position:absolute;inset-inline-start:10%;top:12%;width:50%;height:38%;border-radius:18px;background:#fff;box-shadow:0 10px 30px rgba(80,70,140,.1)}
.sk-s09 .hv-b{position:absolute;inset-inline-end:10%;bottom:12%;width:44%;height:34%;border-radius:18px;background:#1E1B3A}
.sk-s09 .ft{border-top:0}
.sk-s09 .in::placeholder{color:#8B86A8}`,
}),

sk({
  id: "s10", name: "בנטו גריד", en: "Bento", group: "שפות נוספות",
  desc: "תאים בהשראה יפנית על גריד קשיח. כל תא עולם תוכן משלו, ותא-גיבור אחד בולט.",
  when: "דשבורדים, webapp, הצגת פיצ'רים. משתלב כסקשן גם בשפות אחרות (C5).",
  no: "תוכן נרטיבי ארוך, עמודים שצריכים זרימה ולא מפה.",
  recipe: `gap אחיד 12-16; radius אחיד; תא-גיבור 2×2 (או 1×2)
כל התאים על רקע אפור-בהיר אחיד, הגריד גלוי דרך ה-gap
כל תא עולם משלו: מספר גדול, גרף קטן, תמונה, טקסט`,
  apply: "העמוד כולו הופך למפת תאים: ההדר, ההירו, היתרונות, המחירים, הטופס והפוטר הם תאים באותו גריד; תא-הגיבור עם מספר ענק; תא עם ויז'ואל צבעוני מלא; אין גבולות, רק gap.",
  sig: "תא-גיבור בולט · כל תא עולם תוכן משלו (גרף, מספר, תמונה, טקסט) · הגריד גלוי דרך ה-gap האחיד.",
  avoid: "כל התאים באותו גודל (זה סתם גריד כרטיסים) · דחיסת-יתר בתא.",
  qa: ["gap אחד לכל הגריד", "radius אחד לכל התאים", "תא-גיבור אחד לפחות בכל מפה"],
  engine: "",
  agent: "עצב בסגנון Bento: כל העמוד כמפת תאים על גריד אחיד עם gap קבוע ורדיוס קבוע, תא-גיבור גדול אחד, וכל תא מציג סוג תוכן אחר (מספר, גרף, תמונה, טקסט).",
  note: "בדמו: gap 14 ורדיוס 18 בכל התאים כולל ההדר והפוטר. תא היתרון הראשון הוא הגיבור (שתי שורות) עם מספר ענק, השלישי מכיל גרף עמודות זעיר.",
  css: `.sk-s10 .ref{--s-bg:#F2F2F5;--s-surface:#fff;--s-ink:#1D1D1F;--s-muted:#6E6E73;--s-line:transparent;--s-accent:#0A84FF;--s-accent-ink:#fff;--s-r:18px;--s-btn-r:12px;--s-ph:#fff;--s-ph-ink:#fff;--s-gap:14px;--s-card-b:0;--s-card-sh:0 1px 2px rgba(0,0,0,.05);--s-ghost-bg:#F2F2F5;--s-ghost-b:0;--s-in-b:0;--s-in-bg:#F2F2F5;--s-hi-bg:#1D1D1F;--s-hi-ink:#fff;--s-hi-lift:none;--s-ico-bg:#EAF3FF;--s-form-bg:#fff;--s-hd-bg:#fff;padding:14px}
.sk-s10 .hd{border-radius:18px;margin-bottom:14px;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.sk-s10 .hero{gap:14px;padding:0;margin-bottom:14px;align-items:stretch}
.sk-s10 .hero-t{background:#fff;border-radius:18px;padding:clamp(24px,4cqi,56px);box-shadow:0 1px 2px rgba(0,0,0,.05);display:flex;flex-direction:column;justify-content:center}
.sk-s10 .hero-v{aspect-ratio:auto;min-height:280px;background:linear-gradient(135deg,#0A84FF,#5AC8FA);color:#fff;box-shadow:none}
.sk-s10 .hv-a{position:absolute;inset-inline-start:8%;bottom:10%;width:40%;height:22%;border-radius:14px;background:rgba(255,255,255,.22)}
.sk-s10 .hv-b{position:absolute;inset-inline-end:8%;top:10%;width:30%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.25)}
.sk-s10 .sec{padding:0;margin-bottom:14px}
.sk-s10 .sec h2{font-size:14px;color:#6E6E73;font-weight:600;margin:0 6px 10px}
.sk-s10 .bens .grid3{grid-template-columns:2fr 1fr 1fr}
.sk-s10 .bens .card:first-child{grid-row:span 2;display:flex;flex-direction:column;justify-content:flex-end;min-height:300px}
.sk-s10 .bens .card:first-child .num{display:block;font-size:clamp(64px,8cqi,110px);font-weight:800;line-height:1;margin-bottom:auto;color:#0A84FF}
.sk-s10 .bens .card:nth-child(2),.sk-s10 .bens .card:nth-child(3){grid-column:2/4}
.sk-s10 .bars{display:flex;align-items:flex-end;gap:6px;height:56px;margin-top:14px}
.sk-s10 .bars s{display:block;flex:1;background:#0A84FF;border-radius:4px 4px 0 0;text-decoration:none;opacity:.55}
.sk-s10 .bars s:nth-child(1){height:40%}.sk-s10 .bars s:nth-child(2){height:65%}.sk-s10 .bars s:nth-child(3){height:50%}.sk-s10 .bars s:nth-child(4){height:100%;opacity:1}
.sk-s10 .bens .card:first-child .ico{display:none}
.sk-s10 .fbox{max-width:none;text-align:start}
.sk-s10 .fbox p{margin-inline:0}
.sk-s10 .ft{background:#fff;border-radius:18px;border-top:0;box-shadow:0 1px 2px rgba(0,0,0,.05)}
.sk-s10 .in::placeholder{color:#8E8E93}
@container (max-width:767px){.sk-s10 .bens .grid3{grid-template-columns:1fr}.sk-s10 .bens .card:first-child{grid-row:auto;min-height:220px}.sk-s10 .bens .card:nth-child(2),.sk-s10 .bens .card:nth-child(3){grid-column:auto}.sk-s10 .hero-v{min-height:200px}}`,
}),

sk({
  id: "s11", name: "ממפיס", en: "Memphis", group: "שפות נוספות",
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
  css: `.sk-s11 .ref{--s-bg:#FFFDF5;--s-surface:#fff;--s-ink:#111;--s-muted:#333;--s-line:#111;--s-accent:#111;--s-accent-ink:#FFD93D;--s-accent-txt:#D1382E;--s-r:14px;--s-ph:#4DA3FF;--s-ph-ink:#111;--s-font-h:"Rubik",inherit;--s-wt-h:800;
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
.sk-s11 .tag{background:#FFD93D;color:#111;border:2px solid #111}
.sk-s11 .fbox{box-shadow:6px 6px 0 #111}
.sk-s11 .fbox p{color:#111}
.sk-s11 .in{background:#fff}
.sk-s11 .ft{border-top:2px solid #111}
.sk-s11 .logo::before{border-radius:50%;background:#FF5C5C;border:2px solid #111}`,
}),

sk({
  id: "s12", name: "רטרו שנות ה-70", en: "Retro 70s", group: "שפות נוספות",
  desc: "פלטה תקופתית (חרדל, חלודה, זית, שמנת), טיפוגרפיה תקופתית, גרעיניות. נוסטלגיה, אופי.",
  when: "מותגי אוכל, קפה, אופנה, תרבות, כל מי שהאופי הוא המוצר.",
  no: "טק, פיננסים, רפואה. הנוסטלגיה נקראת כחוסר עדכניות.",
  recipe: `לבחור עשור אחד ולהתחייב. כאן: שנות ה-70
פלטה: חרדל #D9A32B · חלודה #B5502A · זית #6B7A3A · שמנת #F3E9D2 · חום #3A2A1E
גרעיניות 3-4%; פסי שקיעה (שלוש רצועות); קשתות קונצנטריות; כפתורי pill
טיפוגרפיה: serif display כבד (Suez One) לכותרות, סאנס נקי לגוף`,
  apply: "רצועת פסים תקופתית מתחת להדר; ויז'ואל הירו = קשתות שקיעה; כרטיסים בשמנת עם מתאר כפול; כפתורי pill בחלודה; החבילה הנבחרת בחום עם מחיר בחרדל; הגרעין על העמוד כולו ב-4%.",
  sig: "פסי שקיעה · קשתות קונצנטריות · מתאר כפול (קו, רווח, קו).",
  avoid: "ערבוב עשורים · רטרו רק בצבעים בלי טיפוגרפיה תואמת (חצי-תחפושת).",
  qa: ["עשור אחד בלבד בכל הסימנים", "פונט הכותרות תקופתי", "גרעין לא מעל 4%"],
  engine: "",
  agent: "עצב בסגנון רטרו שנות ה-70: פלטת חרדל, חלודה, זית ושמנת, כותרות ב-serif display כבד, פסי שקיעה וקשתות קונצנטריות, כפתורי pill, גרעיניות עדינה.",
  note: "בדמו: Suez One לכותרות, פסי שקיעה בראש ההירו, קשתות בוויז'ואל, מתאר כפול על הכרטיסים דרך box-shadow בשתי טבעות.",
  fonts: ["Suez One"],
  css: `.sk-s12 .ref{--s-bg:#F3E9D2;--s-surface:#FBF4E4;--s-ink:#3A2A1E;--s-muted:#6B5744;--s-line:#3A2A1E;--s-accent:#B5502A;--s-accent-ink:#F3E9D2;--s-accent-txt:#B5502A;--s-r:12px;--s-btn-r:999px;--s-ph:#D9A32B;--s-ph-ink:#3A2A1E;--s-font-h:"Suez One",serif;--s-wt-h:400;
 --s-card-b:2px solid #3A2A1E;--s-card-sh:0 0 0 4px #F3E9D2,0 0 0 6px #3A2A1E;--s-ghost-b:2px solid #3A2A1E;--s-ghost-bg:#FBF4E4;--s-in-b:2px solid #3A2A1E;--s-in-bg:#FBF4E4;--s-in-r:999px;--s-hi-bg:#3A2A1E;--s-hi-ink:#F3E9D2;--s-ico-bg:#D9A32B;--s-ico-r:50%;--s-hd-line:2px solid #3A2A1E;--s-form-bg:#FBF4E4;--s-gap:28px}
.sk-s12 .ref::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.04;z-index:0;background:${NOISE}}
.sk-s12 .hero{padding-top:calc(clamp(40px,7cqi,96px) + 24px)}
.sk-s12 .hero::before{content:"";position:absolute;top:0;left:0;right:0;height:24px;background:linear-gradient(#D9A32B 0 8px,#B5502A 8px 16px,#6B7A3A 16px 24px)}
.sk-s12 .hero h1{font-size:clamp(36px,6cqi,76px);line-height:1.05}
.sk-s12 .hero-v{border-radius:50% 50% 12px 12px/40% 40% 12px 12px;background:repeating-radial-gradient(circle at 50% 100%,#B5502A 0 12%,#D9A32B 12% 24%,#6B7A3A 24% 36%,#F3E9D2 36% 48%);border:2px solid #3A2A1E;box-shadow:none}
.sk-s12 .hv-a,.sk-s12 .hv-b{display:none}
.sk-s12 .hv-l{background:#FBF4E4;border:2px solid #3A2A1E;padding:6px 16px;border-radius:999px}
.sk-s12 .bens .card:nth-child(2) .ico{background:#B5502A}.sk-s12 .bens .card:nth-child(3) .ico{background:#6B7A3A}
.sk-s12 .price.hi .amt{color:#D9A32B}
.sk-s12 .price.hi .btn{background:#D9A32B;color:#3A2A1E}
.sk-s12 .tag{background:#D9A32B;color:#3A2A1E;border:2px solid #3A2A1E}
.sk-s12 .eyebrow{font-family:"Suez One",serif;font-weight:400;color:#B5502A;font-size:15px}
.sk-s12 .ft{border-top:2px solid #3A2A1E}
.sk-s12 .logo::before{border-radius:50%;background:radial-gradient(circle,#D9A32B 30%,#B5502A 31% 60%,#6B7A3A 61%)}
.sk-s12 .in::placeholder{color:#8C7A66}`,
}),
];
