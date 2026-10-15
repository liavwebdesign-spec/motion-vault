// s02: הועבר מ-i-style1.mjs ב-15.10.2026 לקראת בנייה מחדש כעמוד אמיתי ברף הסטודיו (כמו s08, s09, s10, s13, s14). זמני עד שהבונה כותב את הקובץ מחדש.
import { sk } from "./i-style1.mjs";
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default [
sk({
  id: "s02", archived: true, name: "נאומורפיזם", en: "Neumorphism", group: "עומק ומרקם",
  desc: "אלמנטים בולטים או שקועים מרקע אחיד, צל כפול רך (בהיר וכהה). שקט, מגע עדין.",
  when: "בית חכם, נגנים, מחשבונים, הגדרות. מעט אלמנטים, הרבה אווירה.",
  no: "דרישות נגישות גבוהות. הקונטרסט הנמוך מסוכן.",
  recipe: `--bg: #E0E5EC (או כל גוון אחיד. הרקע והאלמנט אותו צבע!)
בולט: box-shadow: -6px -6px 14px rgba(255,255,255,.8), 6px 6px 14px rgba(163,177,198,.6)
שקוע: box-shadow: inset -4px -4px 10px rgba(255,255,255,.7), inset 4px 4px 10px rgba(163,177,198,.5)
radius 16-24; בלי borders בכלל; accent אחד רווי לאלמנטים אקטיביים`,
  apply: "העמוד כולו רקע אחד; כרטיסים בולטים, אינפוטים שקועים; אייקוני line דקים; בלי תמונות פוטו גדולות (שוברות את אשליית החומר), אילוסטרציות ואייקונים עדיפים.",
  sig: "מתג או סליידר עם שקע ובליטה · כפתור אקטיבי ב-accent הרווי היחיד · עומק דו-כיווני (בולט לצד שקוע באותו סקשן).",
  avoid: "הבלטה על רקעים משתנים (האפקט עובד רק על רקע אחיד!) · צל חד או כהה מדי · פריסה על אתר תוכן שלם. זו שפת ווידג'טים ומסכים, לא עמודים ארוכים.",
  qa: ["רקע אחיד בכל אזור נאומורפי", "AA לכל טקסט", "אינטראקטיבי מסומן גם בצבע, לא רק בשקע"],
  engine: "קשיחים: טקסט לעולם לא מסתמך על ההבלטה; focus-visible בולט במיוחד.",
  agent: "עצב בסגנון נאומורפי: רקע בגוון אחיד, כרטיסים עם צל כפול רך (בהיר מלמעלה-שמאל, כהה מלמטה-ימין), פינות עגולות, בלי קווי מתאר.",
  note: "בדמו: אפס גבולות, החבילה הנבחרת מסומנת בטבעת accent ולא ברקע כהה (רקע כהה שובר את החומר). המתג בהירו הוא השקע והבליטה זה לצד זה.",
  css: `.sk-s02 .ref{--s-bg:#E0E5EC;--s-surface:#E0E5EC;--s-ink:#2F3641;--s-muted:#5B6575;--s-line:rgba(163,177,198,.35);--s-accent:#4B5CF0;--s-accent-txt:#3A49D8;--s-accent-ink:#fff;--s-r:22px;--s-ph:#E0E5EC;--s-ph-ink:#5B6575;
 --s-card-b:0;--s-card-sh:-6px -6px 14px rgba(255,255,255,.8),6px 6px 14px rgba(163,177,198,.6);
 --s-btn-sh:-4px -4px 10px rgba(255,255,255,.8),4px 4px 10px rgba(163,177,198,.6);
 --s-in-b:0;--s-in-bg:#E0E5EC;--s-in-sh:inset -4px -4px 10px rgba(255,255,255,.7),inset 4px 4px 10px rgba(163,177,198,.5);
 --s-hi-bg:#E0E5EC;--s-hi-ink:#2F3641;--s-ico-bg:#E0E5EC;--s-ico-r:50%;--s-ghost-b:0;--s-ghost-bg:#E0E5EC;--s-form-bg:#E0E5EC}
.sk-s02 .btn.ghost{box-shadow:var(--s-btn-sh)}
.sk-s02 .btn:active,.sk-s02 .btn.ghost:active{box-shadow:var(--s-in-sh)}
.sk-s02 .ico{box-shadow:var(--s-in-sh)}
.sk-s02 .hero-v{box-shadow:var(--s-card-sh)}
.sk-s02 .hv-a{position:absolute;inset:auto 14% 16%;height:34px;border-radius:17px;background:#E0E5EC;box-shadow:var(--s-in-sh)}
.sk-s02 .hv-b{position:absolute;bottom:calc(16% + 3px);inset-inline-start:calc(14% + 3px);width:28px;height:28px;border-radius:50%;background:#4B5CF0;box-shadow:2px 2px 6px rgba(163,177,198,.7)}
.sk-s02 .hv-l{margin-bottom:40px}
.sk-s02 .price.hi{box-shadow:var(--s-card-sh),inset 0 0 0 2px #4B5CF0}
.sk-s02 .price.hi .amt,.sk-s02 .price.hi h3{color:#3A49D8}
.sk-s02 .tag{box-shadow:2px 2px 6px rgba(163,177,198,.7)}
.sk-s02 .ft{border-top:0}
.sk-s02 .in::placeholder{color:#535C6B}`,
}),
];
