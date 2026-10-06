// שפה s08: עמוד הייחוס בבנייה מחדש (6.10.2026, ליאב: "שיפוץ רציני לעורות", כיוון ב). עד שהעמוד האמיתי מוכן, זה הדמו הישן.
import { sk } from "./i-style1.mjs";

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// Miriam Libre הוא פונט התגיות של s07. הוא לא מונוספייס (נמדד 30.9.2026: iiii ברוחב 61px מול MMMM ב-148px), ולכן המספור עובר למונוספייס אמיתי.
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
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
CTA בלעדי: gradient #CF3A7B ל-#CC4A12, לבן עובר עליו AA בכל גודל (4.6 בשני הקצוות). הגוונים הבהירים (#E8468C ל-#F0561C, 3.5 עד 3.7 עם לבן) רק מאחורי טקסט לבן של 19px בולד ומעלה: טקסט גדול לפי WCAG מתחיל ב-18.66px בולד, ולכן 18px לא עובר
רקע: גרדיאנט כהה עשיר או צילום ברמת העמוד, כי לזכוכית צריך משהו לעוות (לא פר-סקשן!, ולא בלובים: נפסלו כנישתיים, 23.9.2026). הילות רכות לכל היותר שתיים, לפי B17 ב-behaviors.md
מלכודת: קלאס זכוכית עם overflow:hidden (בשביל ההבזק הנודד) חותך ילדים שחורגים מהקופסה (עיגולי מספור, באדג'ים צפים). לאלמנטים כאלה בונים זכוכית ידנית בלי overflow ובלי ::after, או מוציאים את הילד החורג מחוץ לקופסה.
מהלכים שעבדו: מילת ענק שקופה מאחורי ההירו (background-clip:text על gradient אנכי לבן .09 ל-.012; במובייל לשבור לשתי שורות, nowrap גולש מעבר למסך) · אייקוני גרדיאנט 52px בכרטיסים (כל כרטיס גרדיאנט אחר מהפלטה) · לוגו או אלמנט מותג צף חופשי עם drop-shadow צבעוני כפול במקום בתוך מסגרת · טיימליין מתמלא B18.`,
  agent: "עצב בסגנון Liquid Glass של Apple: הדר וכפתורים כזכוכית חיה עם עיוות עדשה והבזק אור נודד, תנועה איטית ונוזלית; התוכן על משטחים רגילים.",
  note: "בדמו: זכוכית חיה רק על ההדר, הכפתורים והחבילה הנבחרת (קצה עדשה + הבזק ב-hover, .7s). הכרטיסים הרגילים על משטח רגיל. שתי הילות בלבד, ברמת העמוד (סגולה למעלה, ורודה בצד), כמו הכלל של השפה; הוויז'ואל עצמו בלי כתמים. המילה הענקית מאחורי עמודת הטקסט בהירו (לא מאחורי הוויז'ואל, שם רואים רק שברי אותיות) היא הערך שנלטש בדף הקורס. ה-CTA בגרדיאנט העמוק של הפלטה, כדי שהלבן עליו יעבור AA.",
  css: `.sk-s08 .ref{--s-bg:#08070C;--s-surface:#12101B;--s-ink:#F6F4FB;--s-muted:rgba(246,244,251,.72);--s-line:rgba(255,255,255,.1);--s-accent:linear-gradient(135deg,#CF3A7B,#CC4A12);--s-accent-ink:#fff;--s-accent-txt:#FF8FB8;--s-r:18px;--s-btn-r:999px;--s-ph:#12101B;--s-ph-ink:rgba(246,244,251,.6);
 --s-card-b:1px solid rgba(255,255,255,.08);--s-card-sh:none;--s-ghost-bg:rgba(255,255,255,.07);--s-ghost-b:1px solid rgba(255,255,255,.16);--s-ghost-ink:#F6F4FB;--s-in-b:1px solid rgba(255,255,255,.14);--s-in-bg:rgba(255,255,255,.06);--s-in-r:999px;--s-hi-bg:rgba(255,255,255,.07);--s-hi-b:1px solid rgba(255,255,255,.18);--s-ico-bg:linear-gradient(135deg,#8A5CFF,#2E6BFF);--s-form-bg:#12101B;--s-hd-bg:rgba(255,255,255,.06);--s-hd-line:1px solid rgba(255,255,255,.12);
 background:radial-gradient(50% 40% at 20% 0%,rgba(138,92,255,.35),transparent 70%),radial-gradient(40% 35% at 85% 30%,rgba(255,61,138,.25),transparent 70%),#08070C}
.sk-s08 .btn{font-size:18px;font-weight:700;position:relative;overflow:hidden;transition:transform .6s cubic-bezier(.2,.6,.2,1),box-shadow .6s}
.sk-s08 .btn.sm{font-size:15px}
.sk-s08 .btn.ghost,.sk-s08 .hd,.sk-s08 .price.hi,.sk-s08 .in{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:inset 0 0 18px rgba(255,255,255,.05)}
.sk-s08 .btn.ghost::before,.sk-s08 .price.hi::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(150deg,rgba(255,255,255,.28),rgba(255,255,255,0) 45%,rgba(255,255,255,.1));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.sk-s08 .btn::after{content:"";position:absolute;inset:-40% -60%;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);transform:translateX(-60%);transition:transform .7s cubic-bezier(.2,.6,.2,1);pointer-events:none}
.sk-s08 .btn:hover::after{transform:translateX(60%)}
.sk-s08 .hero::before{content:"אור";position:absolute;inset-inline-start:0;top:0;font-size:clamp(120px,28cqi,360px);font-weight:800;line-height:1;background:linear-gradient(#fff,rgba(255,255,255,.1));-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.09;pointer-events:none;z-index:0}
.sk-s08 .hero-t,.sk-s08 .hero-v{position:relative;z-index:1}
.sk-s08 .hero-v{border:1px solid rgba(255,255,255,.1)}
.sk-s08 .hv-a,.sk-s08 .hv-b{display:none}
.sk-s08 .hv-l{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);padding:8px 18px;border-radius:999px;backdrop-filter:blur(12px)}
.sk-s08 .bens .card:nth-child(2) .ico{background:linear-gradient(135deg,#FF3D8A,#FF7A2F)}
.sk-s08 .bens .card:nth-child(3) .ico{background:linear-gradient(135deg,#2E6BFF,#8A5CFF)}
.sk-s08 .in{color:#F6F4FB}
.sk-s08 .in::placeholder{color:rgba(246,244,251,.5)}
@supports not (backdrop-filter:blur(1px)){.sk-s08 .btn.ghost,.sk-s08 .hd,.sk-s08 .price.hi{background:rgba(18,16,27,.92)}}
@media (prefers-reduced-motion:reduce){.sk-s08 .btn::after{transition:none}}`,
}),
];
