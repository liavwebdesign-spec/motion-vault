// שפה s09: עמוד הייחוס בבנייה מחדש (6.10.2026, ליאב: "שיפוץ רציני לעורות", כיוון ב). עד שהעמוד האמיתי מוכן, זה הדמו הישן.
import { sk } from "./i-style1.mjs";

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// Miriam Libre הוא פונט התגיות של s07. הוא לא מונוספייס (נמדד 30.9.2026: iiii ברוחב 61px מול MMMM ב-148px), ולכן המספור עובר למונוספייס אמיתי.
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
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
  css: `.sk-s09 .ref{--s-bg:#F3F1FB;--s-surface:#fff;--s-ink:#1E1B3A;--s-muted:#5E5A7A;--s-line:#E4E1F2;--s-accent:#6C5CE7;--s-accent-txt:#5A4AD1;--s-accent-ink:#fff;--s-r:22px;--s-btn-r:999px;--s-ph:#E7E3F7;--s-ph-ink:#5E5A7A;--s-accent-soft:#EDE9FF;
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
.sk-s09 .bens .card:first-child .num,.sk-s09 .price.hi li::before{color:#B8AEFF}
.sk-s09 .hero-v{box-shadow:0 20px 50px rgba(80,70,140,.12)}
.sk-s09 .hv-a{position:absolute;inset-inline-start:10%;top:12%;width:50%;height:38%;border-radius:18px;background:#fff;box-shadow:0 10px 30px rgba(80,70,140,.1)}
.sk-s09 .hv-b{position:absolute;inset-inline-end:10%;bottom:12%;width:44%;height:34%;border-radius:18px;background:#1E1B3A}
.sk-s09 .hv-l{position:absolute;inset-inline-start:10%;top:12%;width:50%;height:38%;display:grid;place-items:center;margin:0}
.sk-s09 .ft{border-top:0}
.sk-s09 .in::placeholder{color:#6A6589}`,
}),
];
