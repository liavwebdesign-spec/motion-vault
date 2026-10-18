// שפות עיצוב S1-S12: אותו עמוד ייחוס בדיוק (הדר, הירו, שלושה יתרונות, שלוש
// חבילות, טופס, פוטר) מרונדר בכל שפה. ההשוואה היא תפוחים לתפוחים: כל מה
// שמשתנה בין עמוד לעמוד הוא העור, ולא התוכן ולא המבנה.
//
// ההכרעה (6.9.2026): הקטלוג כאן הוא מקור האמת של skins/languages.md בסקיל
// design-dna. הטקסט של כל שפה (מהות, מתכון, יישום, חתימה, קריקטורה, QA,
// אילוצי מנוע, המשפט לסוכן) יושב בשדות הרשומה, והסקיל נבנה ממנו.
//
// כל עור מגדיר משתני --s-* על .ref ומוסיף רק את מהלכי החתימה שלו. ה-CSS
// המיוצא לסוכן הוא הבסיס המבני + העור, כלומר נקודת פתיחה אמיתית לפרויקט.

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export const REF_BASE = `.cwrap{container-type:inline-size}
.ref{--pad:clamp(20px,4cqi,64px);--s-bg:#f7f7fa;--s-surface:#fff;--s-ink:#16182b;--s-muted:#5f6278;--s-line:#e4e4ee;--s-accent:#4a3aff;--s-accent-ink:#fff;--s-r:16px;--s-ph:#dfe0ea;--s-ph-ink:#6a6d85;--s-gap:20px;
 background:var(--s-bg);color:var(--s-ink);font-family:var(--s-font,inherit);overflow:hidden;position:relative;isolation:isolate;line-height:1.35}
.ref *{box-sizing:border-box}
.ref h1,.ref h2,.ref h3{margin:0;color:var(--s-head,var(--s-ink))}
.ref h1,.ref h2{font-family:var(--s-font-h,var(--s-font,inherit));font-weight:var(--s-wt-h,700);line-height:1.1}
.ref h3{font-family:var(--s-font,inherit);font-weight:var(--s-wt-h3,700);line-height:1.1}
.ref p{margin:0;color:var(--s-muted)}
.ref a{color:inherit;text-decoration:none}
.hd{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px var(--pad);background:var(--s-hd-bg,transparent);border-bottom:var(--s-hd-line,0);position:sticky;top:0;z-index:2}
.logo{font-weight:800;font-size:18px;display:inline-flex;align-items:center;gap:8px}
.logo::before{content:"";width:22px;height:22px;border-radius:var(--s-logo-r,6px);background:var(--s-accent);flex:none}
.nav{display:flex;gap:22px;font-size:14.5px;font-weight:500;color:var(--s-muted)}
.nav a{padding-block:4px}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,5cqi,64px);align-items:center;padding:clamp(40px,7cqi,96px) var(--pad);position:relative;z-index:1}
.hero-t{position:relative}
.eyebrow{display:inline-block;font-size:13px;font-weight:600;color:var(--s-accent-txt,var(--s-accent));margin-bottom:14px}
.hero h1{font-size:clamp(32px,5.2cqi,64px);max-width:16ch;margin-bottom:16px}
.ref .lead{font-size:clamp(16px,1.6cqi,20px);max-width:44ch;margin-bottom:24px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.ref .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:var(--s-btn-r,var(--s-r));background:var(--s-accent);color:var(--s-accent-ink);font-weight:600;font-size:15.5px;border:var(--s-btn-b,0);box-shadow:var(--s-btn-sh,none);cursor:pointer;font-family:inherit;line-height:1.2;transition:transform .2s,box-shadow .2s,background .2s}
.ref .btn.ghost{background:var(--s-ghost-bg,transparent);color:var(--s-ghost-ink,var(--s-ink));border:var(--s-ghost-b,1px solid var(--s-line));box-shadow:none}
.ref .btn:active{transform:scale(.98)}
.ref .btn:focus-visible,.ref .in:focus-visible{outline:2px solid var(--s-accent-txt,var(--s-accent));outline-offset:3px}
.ref p,.ref li{line-height:1.6}
@media (prefers-reduced-motion:reduce){.ref *,.ref *::before,.ref *::after{transition:none!important;animation:none!important}}
.ref .btn.sm{padding:9px 16px;font-size:14px}
.hero-v{aspect-ratio:4/3;border-radius:var(--s-r);background:var(--s-ph);display:grid;place-items:center;color:var(--s-ph-ink);font-weight:600;position:relative;box-shadow:var(--s-card-sh,none);border:var(--s-card-b,0);overflow:hidden}
.hv-a,.hv-b{display:block}
.hv-l{position:relative;z-index:1}
.bens,.prices,.form{scroll-margin-top:80px}
.sec{padding:clamp(36px,6cqi,88px) var(--pad);position:relative;z-index:1}
.sec h2{font-size:clamp(24px,3.2cqi,40px);margin-bottom:clamp(20px,3cqi,36px)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--s-gap)}
.card{background:var(--s-surface);border:var(--s-card-b,1px solid var(--s-line));border-radius:var(--s-r);padding:clamp(20px,2.6cqi,32px);box-shadow:var(--s-card-sh,none);position:relative;transition:transform .2s,box-shadow .2s}
.num,.bars{display:none}
.ico{display:block;width:44px;height:44px;border-radius:var(--s-ico-r,12px);background:var(--s-ico-bg,var(--s-accent-soft,#eef0ff));margin-bottom:18px;border:var(--s-ico-b,0)}
.card h3{font-size:clamp(17px,1.7cqi,21px);margin-bottom:8px}
.card p{font-size:15px;line-height:1.5}
.price .amt{font-size:clamp(28px,3.4cqi,42px);font-weight:var(--s-wt-h,800);margin:12px 0 16px;color:var(--s-head,var(--s-ink));font-family:var(--s-font-h,inherit);line-height:1}
.price .amt small{font-size:13px;font-weight:500;color:var(--s-muted);margin-inline-start:6px}
.price ul{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:8px;font-size:14.5px;color:var(--s-muted)}
.price li::before{content:"✓";color:var(--s-accent-txt,var(--s-accent));font-weight:700;margin-inline-end:8px}
.price .btn{width:100%}
.price.hi{background:var(--s-hi-bg,var(--s-ink));color:var(--s-hi-ink,#fff);border:var(--s-hi-b,0);transform:var(--s-hi-lift,translateY(-8px))}
.price.hi h3,.price.hi .amt,.price.hi ul,.price.hi p,.price.hi .amt small{color:inherit}
.price.hi .btn{background:var(--s-hi-btn,var(--s-accent));color:var(--s-hi-btn-ink,var(--s-accent-ink))}
.tag{position:absolute;top:-12px;inset-inline-start:20px;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;background:var(--s-accent);color:var(--s-accent-ink);line-height:1.3}
.fbox{max-width:640px;margin-inline:auto;text-align:center;background:var(--s-form-bg,var(--s-surface));border:var(--s-card-b,1px solid var(--s-line));border-radius:var(--s-r);padding:clamp(24px,4cqi,48px);box-shadow:var(--s-card-sh,none)}
.fbox p{margin:10px auto 22px;max-width:40ch}
.frm{display:grid;grid-template-columns:1fr 1fr auto;gap:10px}
.in{padding:13px 16px;border-radius:var(--s-in-r,var(--s-r));border:var(--s-in-b,1px solid var(--s-line));background:var(--s-in-bg,#fff);color:var(--s-ink);font:inherit;font-size:16px;box-shadow:var(--s-in-sh,none);min-width:0}
.ft{display:flex;justify-content:space-between;gap:16px;padding:22px var(--pad);font-size:13px;color:var(--s-muted);border-top:1px solid var(--s-line);position:relative;z-index:1}
@container (max-width:767px){.hero{grid-template-columns:1fr}.hero-v{order:-1;aspect-ratio:16/10}.grid3{grid-template-columns:1fr}.nav{display:none}.frm{grid-template-columns:1fr}.price.hi{transform:none}.hero h1{max-width:none}.ref .btn{min-height:48px}.ref .btn.sm{min-height:44px}}`;

// הכפתורים הם קישורים אמיתיים (href) כדי שיגיעו אליהם במקלדת ושטבעת הפוקוס תופיע; ה-CTA מוביל לטופס.
// השדות עם תווית נגישה, והשליחה היא button בתוך form (30.9.2026).
const card = (n, t, p, extra = "") => `<article class="card"><b class="num">${n}</b><i class="ico"></i><h3>${t}</h3><p>${p}</p>${extra}</article>`;
const price = (t, amt, items, cls, btn) => `<article class="card price${cls ? " " + cls : ""}">${cls ? '<span class="tag">הכי נבחרת</span>' : ""}<h3>${t}</h3><div class="amt">₪${amt}<small>לא כולל מע"מ</small></div><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul><a class="btn${btn ? "" : " ghost"}" href="#ref-form">לבחור ${t}</a></article>`;

export const REF_HTML = `<div class="ref">
<header class="hd"><span class="logo">שם העסק</span><nav class="nav" aria-label="ראשי"><a href="#ref-bens">שירותים</a><a href="#ref-prices">מחירים</a><a href="#">אודות</a></nav><a class="btn sm" href="#ref-form">לשיחה קצרה</a></header>
<section class="hero">
<div class="hero-t"><span class="eyebrow">מה העסק עושה, בשבע מילים</span><h1>כותרת שאומרת מה מקבלים</h1><p class="lead">משפט תמיכה קצר שמסביר במה זה שונה ולמי זה מתאים, בלי להבטיח יותר מדי.</p><div class="ctas"><a class="btn" href="#ref-form">הפעולה הראשית</a><a class="btn ghost" href="#ref-bens">לראות דוגמאות</a></div></div>
<div class="hero-v"><i class="hv-a"></i><i class="hv-b"></i><span class="hv-l">ויז'ואל</span></div>
</section>
<section class="sec bens" id="ref-bens"><h2>שלושה יתרונות</h2><div class="grid3">
${card("01", "יתרון ראשון", "שורה אחת שמסבירה במה זה עוזר ללקוח.")}
${card("02", "יתרון שני", "עוד שורה אחת, קונקרטית, בלי סופרלטיבים.")}
${card("03", "יתרון שלישי", "השורה השלישית סוגרת את הסט.", '<i class="bars"><s></s><s></s><s></s><s></s></i>')}
</div></section>
<section class="sec prices" id="ref-prices"><h2>שלוש חבילות</h2><div class="grid3">
${price("בסיסית", "2,500", ["עמוד אחד", "טופס פנייה", "חיבור לדומיין"], "", false)}
${price("מקצועית", "4,000", ["שלושה עמודים", "טופס וואטסאפ", "חיבור לדומיין", "חודש ליווי"], "hi", true)}
${price("מורחבת", "6,000", ["חמישה עמודים", "בלוג", "חיבור לדומיין", "שלושה חודשי ליווי"], "", false)}
</div></section>
<section class="sec form" id="ref-form"><div class="fbox"><h2>נשארים בקשר</h2><p>שם וטלפון, וחוזרים אליכם תוך יום עבודה.</p><form class="frm" onsubmit="return false"><input class="in" aria-label="שם מלא" autocomplete="name" placeholder="שם מלא"><input class="in" type="tel" inputmode="tel" autocomplete="tel" aria-label="טלפון" placeholder="טלפון"><button class="btn" type="submit">לשלוח</button></form></div></section>
<footer class="ft"><span>© שם העסק</span><span>תנאים · פרטיות · נגישות</span></footer>
</div>`;

// כיול: כל font-size בפיקסלים או ב-clamp וכל line-height חסר-יחידה נעטפים במכפיל, כדי שמתג
// הפונט בעמוד יוכל להחיל את פקטור הפונט (--s-fz) ואת λ (--s-lh) מ-font-calibration.md.
// font-size:0 (ממלאי מקום) ו-font:inherit לא נוגעים.
// המתג מחליף רק את פונט הגוף. כלל שכתוב בפונט התצוגה (h1, h2, המחיר) או בפונט קבוע אחר מקבל
// את --s-fz-h / --s-lh-h, ששפה עם --s-font-h מגדירה ל-1, כדי שהכותרות שלה לא יקפצו כשמחליפים
// את הגוף (30.9.2026: ב-s12 ה-H1 ב-Suez One קפץ מ-76 ל-90px בפלוני). בשפה בלי פונט תצוגה הכותרות
// בפונט הגוף ונופלות חזרה ל---s-fz.
const DISPLAY_SEL = /(^|[\s,>+~])h[12]\b|\.amt\b/;
const FIXED_FONT = /font-family:\s*(?!inherit\b|var\(--s-font[,)])/;
export const calib = (css) => css.replace(/([^{}]+)\{([^{}]*)\}/g, (m, sel, body) => {
  const d = DISPLAY_SEL.test(sel) || FIXED_FONT.test(body);
  const fz = d ? "var(--s-fz-h,var(--s-fz,1))" : "var(--s-fz,1)";
  const lh = d ? "var(--s-lh-h,var(--s-lh,1))" : "var(--s-lh,1)";
  return sel + "{" + body
    .replace(/font-size:(clamp\([^)]*\)|[\d.]+px)(?=[;}!\s]|$)/g, `font-size:calc($1 * ${fz})`)
    .replace(/line-height:([\d.]+)(?=[;}\s]|$)/g, `line-height:calc($1 * ${lh})`) + "}";
});

export const sk = (o) => ({
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · CSS",
  mobile: "אותה קריסה בכל השפות: הירו לעמודה אחת עם הוויז'ואל מעל, גרידים לעמודה, התפריט נעלם. השפה עצמה לא משתנה במובייל, רק הפריסה.",
  ...o,
  css: calib(REF_BASE + "\n" + o.css),
  html: `<div class="cwrap sk-${o.id}">${REF_HTML}</div>`,
});

export default [
sk({
  id: "s03", archived: true, redirect: "s08", archiveNote: "מאוחדת לתוך ליקוויד גלאס (MV:s08)", name: "גלסמורפיזם", en: "Glassmorphism", group: "עומק ומרקם",
  desc: "משטחי זכוכית חצי-שקופים מטושטשים מעל רקע צבעוני עשיר. פרימיום, שכבות, Apple.",
  when: "דפי נחיתה, פינטק, קריפטו, דשבורדים מודרניים, פרימיום.",
  no: "מעל רקע לבן או חלש. הזכוכית נעלמת. חייבים רקע עשיר.",
  recipe: `רקע: gradient עשיר (2-3 עצירות) או תמונה (לא blobs: נפסלו כנישתיים, 23.9.2026)
זכוכית: background: rgba(255,255,255,.12-.18); backdrop-filter: blur(18-28px);
        border: 1px solid rgba(255,255,255,.2); box-shadow: 0 8px 32px rgba(0,0,0,.12); radius 16-24
        מעל זוהר בהיר: שכבת בסיס כהה מתחת ללבן (צבע הרקע ב-.5), אחרת טקסט לבן נופל מ-AA
שכבתיות: 2-3 עומקי זכוכית שונים (blur ושקיפות שונים). זה מה שיוצר את העומק`,
  apply: "הדר-זכוכית דביק (החתימה הקלאסית); זכוכית לשכבות צפות בלבד, כרטיסים שמרחפים מעל הרקע; תוכן ארוך על משטחים רגילים; טפסים על זכוכית אטומה יותר (.25-.35); תמונות מתחת לזכוכית, לא עליה. בפרויקט העטיפה מקבלת overflow:clip ולא hidden, אחרת ההדר לא נדבק.",
  sig: "הדר-זכוכית דביק שהרקע זורם מתחתיו · כרטיס צף שחוצה גבול בין סקשנים · עומק כפול (שתי שכבות זכוכית בעומקים שונים).",
  avoid: "זכוכית על רקע לבן או חלש (נעלמת) · הכל זכוכית, אין היררכיית עומק · שכחת fallback.",
  qa: ["רקע עשיר מאחורי כל משטח זכוכית", "@supports not (backdrop-filter) fallback", "לכל היותר 6-8 משטחי blur במסך"],
  engine: "קונטרסט נבדק על הנקודה הבהירה ביותר מאחורי הזכוכית.",
  agent: "עצב בסגנון גלסמורפיזם: הדר וכרטיסים צפים חצי-שקופים עם blur חזק ומסגרת לבנה דקה, מעל רקע גרדיאנט עשיר; תוכן ארוך על משטחים רגילים.",
  note: "בדמו: שני עומקי זכוכית (כרטיסים: לבן .1 על בסיס כהה .5 עם blur 20; החבילה הנבחרת: לבן .2 על אותו בסיס עם blur 28). הבסיס הכהה הוא מה שמשאיר את הטקסט ב-AA גם מעל הזוהר התכלת והוורוד. הכתמים הצבעוניים מרוחקים מאחורי אזורי טקסט בכוונה. בפרויקט ההדר נעשה sticky; כאן הוא לא, כי סרגל המאגר כבר דביק.",
  css: `.sk-s03 .ref{--s-bg:#1A1040;--s-surface:rgba(255,255,255,.12);--s-ink:#fff;--s-muted:rgba(255,255,255,.86);--s-line:rgba(255,255,255,.22);--s-accent:#fff;--s-accent-ink:#1A1040;--s-accent-txt:#FFD3E3;--s-r:20px;--s-ph:rgba(255,255,255,.1);--s-ph-ink:rgba(255,255,255,.85);
 --s-card-b:1px solid rgba(255,255,255,.22);--s-card-sh:0 8px 32px rgba(0,0,0,.18);--s-ghost-b:1px solid rgba(255,255,255,.35);--s-ghost-bg:rgba(255,255,255,.1);--s-ghost-ink:#fff;
 --s-in-b:1px solid rgba(255,255,255,.3);--s-in-bg:rgba(255,255,255,.14);--s-form-bg:rgba(255,255,255,.22);--s-hi-bg:rgba(255,255,255,.28);--s-hi-b:1px solid rgba(255,255,255,.45);--s-ico-bg:rgba(255,255,255,.2);--s-hd-bg:rgba(255,255,255,.1);--s-hd-line:1px solid rgba(255,255,255,.18);
 background:radial-gradient(60% 50% at 12% 6%,#6A3CFF 0,transparent 60%),radial-gradient(50% 40% at 92% 30%,#FF5C8A 0,transparent 60%),radial-gradient(45% 40% at 55% 95%,#1EC8FF 0,transparent 60%),#1A1040}
.sk-s03 .hd,.sk-s03 .card,.sk-s03 .fbox,.sk-s03 .hero-v,.sk-s03 .btn.ghost,.sk-s03 .in{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.sk-s03 .price.hi{backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px)}
.sk-s03 .card,.sk-s03 .fbox{background:linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.1)),rgba(26,16,64,.5)}
.sk-s03 .price.hi{background:linear-gradient(rgba(255,255,255,.2),rgba(255,255,255,.2)),rgba(26,16,64,.5)}
.sk-s03 .in::placeholder{color:rgba(255,255,255,.75)}
.sk-s03 .in{color:#fff;background:rgba(26,16,64,.5)}
.sk-s03 .hv-a{position:absolute;width:55%;height:55%;inset-inline-start:-10%;top:-10%;border-radius:50%;background:radial-gradient(circle,#FF5C8A,transparent 70%);filter:blur(10px)}
.sk-s03 .hv-b{position:absolute;width:50%;height:50%;inset-inline-end:-8%;bottom:-8%;border-radius:50%;background:radial-gradient(circle,#1EC8FF,transparent 70%);filter:blur(10px)}
.sk-s03 .hv-l{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);padding:8px 18px;border-radius:999px;backdrop-filter:blur(12px)}
.sk-s03 .ft{border-top-color:rgba(255,255,255,.18)}
@supports not (backdrop-filter:blur(1px)){.sk-s03 .card,.sk-s03 .fbox,.sk-s03 .hd,.sk-s03 .price.hi{background:rgba(26,16,64,.72)}}`,
}),

];
