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
.ref h1,.ref h2,.ref h3{font-family:var(--s-font-h,var(--s-font,inherit));font-weight:var(--s-wt-h,700);margin:0;line-height:1.1;color:var(--s-head,var(--s-ink))}
.ref p{margin:0;color:var(--s-muted)}
.ref a{color:inherit;text-decoration:none}
.hd{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px var(--pad);background:var(--s-hd-bg,transparent);border-bottom:var(--s-hd-line,0);position:relative;z-index:2}
.logo{font-weight:800;font-size:18px;display:inline-flex;align-items:center;gap:8px}
.logo::before{content:"";width:22px;height:22px;border-radius:var(--s-logo-r,6px);background:var(--s-accent);flex:none}
.nav{display:flex;gap:22px;font-size:14.5px;font-weight:500;color:var(--s-muted)}
.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,5cqi,64px);align-items:center;padding:clamp(40px,7cqi,96px) var(--pad);position:relative;z-index:1}
.hero-t{position:relative}
.eyebrow{display:inline-block;font-size:13px;font-weight:600;color:var(--s-accent-txt,var(--s-accent));margin-bottom:14px}
.hero h1{font-size:clamp(32px,5.2cqi,64px);max-width:16ch;margin-bottom:16px}
.lead{font-size:clamp(16px,1.6cqi,20px);max-width:44ch;margin-bottom:26px}
.ctas{display:flex;gap:12px;flex-wrap:wrap}
.ref .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 24px;border-radius:var(--s-btn-r,var(--s-r));background:var(--s-accent);color:var(--s-accent-ink);font-weight:600;font-size:15.5px;border:var(--s-btn-b,0);box-shadow:var(--s-btn-sh,none);cursor:pointer;font-family:inherit;line-height:1.2;transition:transform .2s,box-shadow .2s,background .2s}
.ref .btn.ghost{background:var(--s-ghost-bg,transparent);color:var(--s-ghost-ink,var(--s-ink));border:var(--s-ghost-b,1px solid var(--s-line));box-shadow:none}
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
.price .amt{font-size:clamp(28px,3.4cqi,42px);font-weight:800;margin:12px 0 16px;color:var(--s-head,var(--s-ink));font-family:var(--s-font-h,inherit);line-height:1}
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
@container (max-width:767px){.hero{grid-template-columns:1fr}.hero-v{order:-1;aspect-ratio:16/10}.grid3{grid-template-columns:1fr}.nav{display:none}.frm{grid-template-columns:1fr}.price.hi{transform:none}.hero h1{max-width:none}}`;

const card = (n, t, p, extra = "") => `<article class="card"><b class="num">${n}</b><i class="ico"></i><h3>${t}</h3><p>${p}</p>${extra}</article>`;
const price = (t, amt, items, cls, btn) => `<article class="card price${cls ? " " + cls : ""}">${cls ? '<span class="tag">הכי נבחרת</span>' : ""}<h3>${t}</h3><div class="amt">₪${amt}<small>לא כולל מע"מ</small></div><ul>${items.map(i => `<li>${i}</li>`).join("")}</ul><a class="btn${btn ? "" : " ghost"}">לבחור ${t}</a></article>`;

export const REF_HTML = `<div class="ref">
<header class="hd"><span class="logo">שם העסק</span><nav class="nav"><a>שירותים</a><a>מחירים</a><a>אודות</a></nav><a class="btn sm">לשיחה קצרה</a></header>
<section class="hero">
<div class="hero-t"><span class="eyebrow">מה העסק עושה, בשבע מילים</span><h1>כותרת שאומרת מה מקבלים</h1><p class="lead">משפט תמיכה קצר שמסביר במה זה שונה ולמי זה מתאים, בלי להבטיח יותר מדי.</p><div class="ctas"><a class="btn">הפעולה הראשית</a><a class="btn ghost">לראות דוגמאות</a></div></div>
<div class="hero-v"><i class="hv-a"></i><i class="hv-b"></i><span class="hv-l">ויז'ואל</span></div>
</section>
<section class="sec bens"><h2>שלושה יתרונות</h2><div class="grid3">
${card("01", "יתרון ראשון", "שורה אחת שמסבירה במה זה עוזר ללקוח.")}
${card("02", "יתרון שני", "עוד שורה אחת, קונקרטית, בלי סופרלטיבים.")}
${card("03", "יתרון שלישי", "השורה השלישית סוגרת את הסט.", '<i class="bars"><s></s><s></s><s></s><s></s></i>')}
</div></section>
<section class="sec prices"><h2>שלוש חבילות</h2><div class="grid3">
${price("בסיסית", "2,500", ["עמוד אחד", "טופס פנייה", "חיבור לדומיין"], "", false)}
${price("מקצועית", "4,000", ["שלושה עמודים", "טופס וואטסאפ", "חיבור לדומיין", "חודש ליווי"], "hi", true)}
${price("מורחבת", "6,000", ["חמישה עמודים", "בלוג", "חיבור לדומיין", "שלושה חודשי ליווי"], "", false)}
</div></section>
<section class="sec form"><div class="fbox"><h2>נשארים בקשר</h2><p>שם וטלפון, וחוזרים אליכם תוך יום עבודה.</p><div class="frm"><input class="in" placeholder="שם מלא"><input class="in" placeholder="טלפון"><a class="btn">לשלוח</a></div></div></section>
<footer class="ft"><span>© שם העסק</span><span>תנאים · פרטיות · נגישות</span></footer>
</div>`;

export const sk = (o) => ({
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · CSS",
  mobile: "אותה קריסה בכל השפות: הירו לעמודה אחת עם הוויז'ואל מעל, גרידים לעמודה, התפריט נעלם. השפה עצמה לא משתנה במובייל, רק הפריסה.",
  ...o,
  css: REF_BASE + "\n" + o.css,
  html: `<div class="cwrap sk-${o.id}">${REF_HTML}</div>`,
});

export default [
sk({
  id: "s01", name: "סקיאומורפיזם", en: "Skeuomorphism", group: "עומק ומרקם",
  desc: "מחקה את העולם האמיתי: חומרים, צללים ריאליסטיים, כפתורים שנלחצים פיזית.",
  when: "אודיו ומוזיקה, שלטים, ארנקים דיגיטליים, כל מה שרוצה תחושת מכשיר.",
  no: "דשבורדים ו-SaaS עסקי. הטקסטורה גונבת פוקוס מהדאטה.",
  recipe: `--bg: #E8E4DC (נייר או פשתן, אף פעם לא לבן) · טקסטורת רעש עדינה (noise 2-3% opacity)
כפתור: gradient אנכי בהיר לכהה 8% + border כהה 1px + צל: 0 1px 0 rgba(255,255,255,.6) inset (הברקה עליונה), 0 3px 6px rgba(0,0,0,.25)
lifted: צל כפול כבד 0 8px 20px rgba(0,0,0,.3); pressed: inset 0 2px 6px rgba(0,0,0,.35)
רדיוסים בינוניים 8-12; חומרים: עור, עץ, מתכת כרקעי אזור, במשורה`,
  apply: "הדר = משטח חומר עדין; הירו = החפץ או המכשיר במרכז כגיבור; טקסטורה רק ברקעי אזור וכפתורים, לעולם לא מאחורי טקסט רץ; טפסים = שקעים פיזיים עדינים; אייקונים תלת-ממדיים בסגנון אחד עקבי.",
  sig: "כפתור שמרגיש לחיץ (הברקה עליונה + צל) · מעברי חומר בין סקשנים · חפץ אמיתי אחד בהירו.",
  avoid: "טקסטורה שונה בכל סקשן · ריאליזם על הכל כולל אזורי טקסט · צללים בלי מקור אור אחיד. חייב כיוון אור אחד לכל העמוד.",
  qa: ["מקור אור אחיד", "אין טקסטורה מאחורי טקסט רץ", "לכל היותר שני חומרים לעמוד"],
  engine: "קונטרסט AA מעל כל טקסטורה; טקסטורות כתמונות דחוסות.",
  agent: "עצב בסגנון סקיאומורפי: אלמנטים שמחקים חומרים אמיתיים, צללים ריאליסטיים ממקור אור אחיד, תחושת עומק פיזית של כפתורים.",
  note: "בדמו: אור מלמעלה בכל אלמנט (הברקה עליונה, צל תחתון), שני חומרים בלבד (נייר ועור כהה), רעש ב-5% על הרקע בלבד. הכפתור שוקע בלחיצה.",
  css: `.sk-s01 .ref{--s-bg:#E8E4DC;--s-surface:#F3EFE7;--s-ink:#2B2620;--s-muted:#6B6259;--s-line:#CFC7B9;--s-accent:#8B5A2B;--s-accent-txt:#7A4A1E;--s-accent-ink:#FFF7EA;--s-r:10px;--s-ph:#D9D2C4;--s-ph-ink:#D8CFC0;--s-accent-soft:#E2DCCF;
 --s-card-b:1px solid #C9C0AF;--s-card-sh:inset 0 1px 0 rgba(255,255,255,.7),0 3px 6px rgba(0,0,0,.18);
 --s-btn-b:1px solid #5E3C1A;--s-btn-sh:inset 0 1px 0 rgba(255,255,255,.45),0 3px 6px rgba(0,0,0,.25);
 --s-in-b:1px solid #B9AF9C;--s-in-bg:#E2DCCF;--s-in-sh:inset 0 2px 5px rgba(0,0,0,.2);
 --s-hd-bg:linear-gradient(#3F332A,#2C231C);--s-hi-bg:linear-gradient(#4A3B2F,#33271E);--s-ico-bg:linear-gradient(#F8F4EC,#D8D0C0);--s-ico-b:1px solid #B9AF9C}
.sk-s01 .ref::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;background:${NOISE};z-index:0}
.sk-s01 .hd{color:#F3EFE7;box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 4px 10px rgba(0,0,0,.25)}
.sk-s01 .hd .nav{color:#D8CFC0}
.sk-s01 .btn{background:linear-gradient(#A56D38,#8B5A2B)}
.sk-s01 .btn:active{box-shadow:inset 0 2px 6px rgba(0,0,0,.35);transform:translateY(1px)}
.sk-s01 .btn.ghost{background:linear-gradient(#F8F4EC,#E2DCCF);color:#2B2620;border:1px solid #B9AF9C;box-shadow:inset 0 1px 0 #fff,0 2px 4px rgba(0,0,0,.15)}
.sk-s01 .hero-v{background:linear-gradient(#3F332A,#221B16);border:1px solid #17120F;box-shadow:inset 0 1px 0 rgba(255,255,255,.15),0 8px 20px rgba(0,0,0,.3)}
.sk-s01 .hv-a{position:absolute;inset:14% 12% 34%;border-radius:8px;background:linear-gradient(#5A4A3C,#3B2F26);box-shadow:inset 0 2px 8px rgba(0,0,0,.6),0 1px 0 rgba(255,255,255,.1)}
.sk-s01 .hv-b{position:absolute;bottom:9%;inset-inline-start:50%;translate:50% 0;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#C9A46A,#8B5A2B 60%,#5E3C1A);box-shadow:0 4px 10px rgba(0,0,0,.5),inset 0 1px 2px rgba(255,255,255,.6)}
.sk-s01 .hv-l{margin-bottom:22%}
.sk-s01 .price.hi{box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 8px 20px rgba(0,0,0,.3);border:1px solid #17120F}
.sk-s01 .price.hi .amt{color:#E8C58A}
.sk-s01 .in::placeholder{color:#8A8072}`,
}),

sk({
  id: "s02", name: "נאומורפיזם", en: "Neumorphism", group: "עומק ומרקם",
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
  css: `.sk-s02 .ref{--s-bg:#E0E5EC;--s-surface:#E0E5EC;--s-ink:#2F3641;--s-muted:#5B6575;--s-line:rgba(163,177,198,.35);--s-accent:#5B6CFF;--s-accent-ink:#fff;--s-r:22px;--s-ph:#E0E5EC;--s-ph-ink:#5B6575;
 --s-card-b:0;--s-card-sh:-6px -6px 14px rgba(255,255,255,.8),6px 6px 14px rgba(163,177,198,.6);
 --s-btn-sh:-4px -4px 10px rgba(255,255,255,.8),4px 4px 10px rgba(163,177,198,.6);
 --s-in-b:0;--s-in-bg:#E0E5EC;--s-in-sh:inset -4px -4px 10px rgba(255,255,255,.7),inset 4px 4px 10px rgba(163,177,198,.5);
 --s-hi-bg:#E0E5EC;--s-hi-ink:#2F3641;--s-ico-bg:#E0E5EC;--s-ico-r:50%;--s-ghost-b:0;--s-ghost-bg:#E0E5EC;--s-form-bg:#E0E5EC}
.sk-s02 .btn.ghost{box-shadow:var(--s-btn-sh)}
.sk-s02 .btn:active,.sk-s02 .btn.ghost:active{box-shadow:var(--s-in-sh)}
.sk-s02 .ico{box-shadow:var(--s-in-sh)}
.sk-s02 .hero-v{box-shadow:var(--s-card-sh)}
.sk-s02 .hv-a{position:absolute;inset:auto 14% 16%;height:34px;border-radius:17px;background:#E0E5EC;box-shadow:var(--s-in-sh)}
.sk-s02 .hv-b{position:absolute;bottom:calc(16% + 3px);inset-inline-start:calc(14% + 3px);width:28px;height:28px;border-radius:50%;background:#5B6CFF;box-shadow:2px 2px 6px rgba(163,177,198,.7)}
.sk-s02 .hv-l{margin-bottom:40px}
.sk-s02 .price.hi{box-shadow:var(--s-card-sh),inset 0 0 0 2px #5B6CFF}
.sk-s02 .price.hi .amt,.sk-s02 .price.hi h3{color:#5B6CFF}
.sk-s02 .tag{box-shadow:2px 2px 6px rgba(163,177,198,.7)}
.sk-s02 .ft{border-top:0}
.sk-s02 .in::placeholder{color:#7B8497}`,
}),

sk({
  id: "s03", name: "גלסמורפיזם", en: "Glassmorphism", group: "עומק ומרקם",
  desc: "משטחי זכוכית חצי-שקופים מטושטשים מעל רקע צבעוני עשיר. פרימיום, שכבות, Apple.",
  when: "דפי נחיתה, פינטק, קריפטו, דשבורדים מודרניים, פרימיום.",
  no: "מעל רקע לבן או חלש. הזכוכית נעלמת. חייבים רקע עשיר.",
  recipe: `רקע: gradient עשיר (2-3 עצירות) או תמונה או blobs צבעוניים
זכוכית: background: rgba(255,255,255,.12-.18); backdrop-filter: blur(18-28px);
        border: 1px solid rgba(255,255,255,.2); box-shadow: 0 8px 32px rgba(0,0,0,.12); radius 16-24
שכבתיות: 2-3 עומקי זכוכית שונים (blur ושקיפות שונים). זה מה שיוצר את העומק`,
  apply: "הדר-זכוכית דביק (החתימה הקלאסית); זכוכית לשכבות צפות בלבד, כרטיסים שמרחפים מעל הרקע; תוכן ארוך על משטחים רגילים; טפסים על זכוכית אטומה יותר (.25-.35); תמונות מתחת לזכוכית, לא עליה.",
  sig: "הדר-זכוכית דביק שהרקע זורם מתחתיו · כרטיס צף שחוצה גבול בין סקשנים · עומק כפול (שתי שכבות זכוכית בעומקים שונים).",
  avoid: "זכוכית על רקע לבן או חלש (נעלמת) · הכל זכוכית, אין היררכיית עומק · שכחת fallback.",
  qa: ["רקע עשיר מאחורי כל משטח זכוכית", "@supports not (backdrop-filter) fallback", "לכל היותר 6-8 משטחי blur במסך"],
  engine: "קונטרסט נבדק על הנקודה הבהירה ביותר מאחורי הזכוכית.",
  agent: "עצב בסגנון גלסמורפיזם: הדר וכרטיסים צפים חצי-שקופים עם blur חזק ומסגרת לבנה דקה, מעל רקע גרדיאנט עשיר; תוכן ארוך על משטחים רגילים.",
  note: "בדמו: שני עומקי זכוכית (כרטיסים .12 עם blur 20, החבילה הנבחרת .28 עם blur 28), הכתמים הצבעוניים מרוחקים מאחורי אזורי טקסט בכוונה. בפרויקט ההדר נעשה sticky; כאן הוא לא, כי סרגל המאגר כבר דביק.",
  css: `.sk-s03 .ref{--s-bg:#1A1040;--s-surface:rgba(255,255,255,.12);--s-ink:#fff;--s-muted:rgba(255,255,255,.78);--s-line:rgba(255,255,255,.22);--s-accent:#fff;--s-accent-ink:#1A1040;--s-accent-txt:#FFD3E3;--s-r:20px;--s-ph:rgba(255,255,255,.1);--s-ph-ink:rgba(255,255,255,.85);
 --s-card-b:1px solid rgba(255,255,255,.22);--s-card-sh:0 8px 32px rgba(0,0,0,.18);--s-ghost-b:1px solid rgba(255,255,255,.35);--s-ghost-bg:rgba(255,255,255,.1);--s-ghost-ink:#fff;
 --s-in-b:1px solid rgba(255,255,255,.3);--s-in-bg:rgba(255,255,255,.14);--s-form-bg:rgba(255,255,255,.22);--s-hi-bg:rgba(255,255,255,.28);--s-hi-b:1px solid rgba(255,255,255,.45);--s-ico-bg:rgba(255,255,255,.2);--s-hd-bg:rgba(255,255,255,.1);--s-hd-line:1px solid rgba(255,255,255,.18);
 background:radial-gradient(60% 50% at 12% 6%,#6A3CFF 0,transparent 60%),radial-gradient(50% 40% at 92% 30%,#FF5C8A 0,transparent 60%),radial-gradient(45% 40% at 55% 95%,#1EC8FF 0,transparent 60%),#1A1040}
.sk-s03 .hd,.sk-s03 .card,.sk-s03 .fbox,.sk-s03 .hero-v,.sk-s03 .btn.ghost,.sk-s03 .in{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.sk-s03 .price.hi{backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px)}
.sk-s03 .in::placeholder{color:rgba(255,255,255,.6)}
.sk-s03 .in{color:#fff}
.sk-s03 .hv-a{position:absolute;width:55%;height:55%;inset-inline-start:-10%;top:-10%;border-radius:50%;background:radial-gradient(circle,#FF5C8A,transparent 70%);filter:blur(10px)}
.sk-s03 .hv-b{position:absolute;width:50%;height:50%;inset-inline-end:-8%;bottom:-8%;border-radius:50%;background:radial-gradient(circle,#1EC8FF,transparent 70%);filter:blur(10px)}
.sk-s03 .hv-l{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);padding:8px 18px;border-radius:999px;backdrop-filter:blur(12px)}
.sk-s03 .ft{border-top-color:rgba(255,255,255,.18)}
@supports not (backdrop-filter:blur(1px)){.sk-s03 .card,.sk-s03 .fbox,.sk-s03 .hd,.sk-s03 .price.hi{background:rgba(26,16,64,.72)}}`,
}),

sk({
  id: "s04", name: "קליימורפיזם", en: "Claymorphism", group: "עומק ומרקם",
  desc: "תלת-ממד מנופח כמו פלסטלינה: פינות סופר-עגולות, צל פנימי כפול, צבעים חיים. ידידותי ומשחקי.",
  when: "ילדים, חינוך, אונבורדינג, מוצרים כיפיים.",
  no: "בנקאות, משפט, רפואה. מוריד אמינות.",
  recipe: `כרטיס: radius 24-36 (סופר-עגול); רקע פסטל רווי
צל החימר: box-shadow: 0 12px 24px rgba(של-צבע-הרקע,.35),
          inset 0 -8px 12px rgba(0,0,0,.12), inset 0 6px 10px rgba(255,255,255,.5)
פלטה: 3-4 פסטלים חיים (אפרסק, מנטה, לילך, שמיים) על רקע שמנת`,
  apply: "כפתורים וכרטיסים מנופחים; הירו עם בלוב או צורה אורגנית; אייקונים עבים מעוגלים filled; טפסים שקועים-רכים; תמונות בתוך מסגרות חימר מעוגלות מאוד.",
  sig: "CTA מנופח שמתכווץ בלחיצה (scale .97) · בלובים אורגניים ברקע · כרטיס עם בטן (הצל הפנימי התחתון הכהה).",
  avoid: "פסטלים חיוורים או עכורים. החימר חייב רוויה וחיים · עיגול-יתר של בלוקי טקסט ארוכים · שימוש בעסק שדורש רצינות.",
  qa: ["radius 24 ומעלה על האלמנטים הבולטים", "scale-on-press עם transition", "טקסט כהה AA על כל פסטל"],
  engine: "ריווח נדיב, הצורות רעבות לאוויר; היררכיית משקלים נשמרת.",
  agent: "עצב בסגנון קליימורפיזם: כרטיסים מנופחים עם פינות עגולות מאוד, צל פנימי עליון בהיר ותחתון כהה, פלטה פסטלית רוויה וחיה.",
  note: "בדמו: ארבעה פסטלים (אפרסק, מנטה, שמיים, לילך) על שמנת, כל צל בצבע הרקע של אותו כרטיס, הוויז'ואל בהירו הוא בלוב. Varela Round לכותרות כי החימר דורש פונט מעוגל.",
  fonts: ["Varela Round"],
  css: `.sk-s04 .ref{--s-bg:#FFF6EC;--s-surface:#FFD9C2;--s-ink:#2D2438;--s-muted:#5A4E6B;--s-line:transparent;--s-accent:#FF7A59;--s-accent-ink:#fff;--s-accent-txt:#D2532F;--s-r:30px;--s-btn-r:999px;--s-ph:#C9F0DF;--s-ph-ink:#2D2438;--s-font-h:"Varela Round",inherit;--s-wt-h:700;
 --s-card-b:0;--s-card-sh:0 12px 24px rgba(255,150,110,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5);
 --s-btn-sh:0 10px 20px rgba(255,122,89,.35),inset 0 -6px 10px rgba(0,0,0,.15),inset 0 5px 8px rgba(255,255,255,.35);
 --s-ghost-bg:#FFE9DB;--s-ghost-b:0;--s-in-b:0;--s-in-bg:#FFEFE3;--s-in-r:999px;--s-in-sh:inset 0 4px 8px rgba(0,0,0,.08),inset 0 -2px 4px rgba(255,255,255,.7);
 --s-hi-bg:#8C6BFF;--s-hi-ink:#fff;--s-ico-r:50%;--s-ico-bg:#fff;--s-form-bg:#E3D5FF}
.sk-s04 .btn.ghost{box-shadow:var(--s-card-sh)}
.sk-s04 .btn:active{transform:scale(.97)}
.sk-s04 .bens .card:nth-child(2){background:#C9F0DF;--s-card-sh:0 12px 24px rgba(90,200,150,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .bens .card:nth-child(3){background:#CFE6FF;--s-card-sh:0 12px 24px rgba(100,160,255,.35),inset 0 -8px 12px rgba(0,0,0,.12),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .price:not(.hi){background:#FFEFE3}
.sk-s04 .price.hi{--s-card-sh:0 14px 28px rgba(140,107,255,.4),inset 0 -8px 12px rgba(0,0,0,.15),inset 0 6px 10px rgba(255,255,255,.4)}
.sk-s04 .fbox{--s-card-sh:0 12px 24px rgba(160,130,255,.3),inset 0 -8px 12px rgba(0,0,0,.1),inset 0 6px 10px rgba(255,255,255,.5)}
.sk-s04 .hero-v{border-radius:62% 38% 46% 54%/48% 60% 40% 52%;box-shadow:var(--s-card-sh);overflow:visible}
.sk-s04 .hv-a{position:absolute;width:38%;height:38%;inset-inline-end:8%;top:10%;border-radius:50%;background:#FFD93D;box-shadow:inset 0 -6px 10px rgba(0,0,0,.12),inset 0 5px 8px rgba(255,255,255,.6)}
.sk-s04 .hv-b{position:absolute;width:30%;height:30%;inset-inline-start:12%;bottom:12%;border-radius:45% 55% 60% 40%/55% 45% 55% 45%;background:#8C6BFF;box-shadow:inset 0 -6px 10px rgba(0,0,0,.15),inset 0 5px 8px rgba(255,255,255,.4)}
.sk-s04 .ft{border-top:0}
.sk-s04 .tag{background:#FFD93D;color:#2D2438}
.sk-s04 .in::placeholder{color:#8A7A9B}`,
}),

sk({
  id: "s06", name: "מקסימליזם", en: "Maximalism", group: "אמירה וקיצון",
  desc: "צבעים מתנגשים, שכבות, טיפוגרפיה ענקית, תנועה בכל פינה. מקסימום זיכרון.",
  when: "אופנה, מוזיקה, אירועים, קמפיינים. לבלוט בכל מחיר.",
  no: "כלי עבודה יומיומיים. מעייף.",
  recipe: `פלטה: 4-5 צבעים רוויים בניגודים משלימים, אחד דומיננטי תמיד
טיפוגרפיה: כותרות 8-14vw, מותר mix של display+serif; חפיפות טקסט-ויז'ואל
שכבות: אלמנטים חורגים מסקשנים, רוטציות עדינות ±2-4°
תנועה: marquees, hover נדיב. עדיין easing אחיד ו-reduced-motion מלא`,
  apply: "הירו = הפיצוץ הכי חזק בעמוד; סקשנים מתחלפים עוצמה-הפוגה; טפסים דווקא נקיים (שם קורית ההמרה); תמונות בטיפול (דוטון או מסגרות צבע), לא סטוק חלק.",
  sig: "כותרת שחורגת מהקונטיינר · התנגשות צבעים מכוונת אחת לסקשן · אלמנט חוצה-גבולות בין סקשנים.",
  avoid: "הכל צועק אז כלום לא נשמע. חייב הפוגות · כל הצבעים באותו משקל (אין דומיננטי) · CTA שנבלע ברעש.",
  qa: ["סקשן הפוגה אחרי כל שיא", "CTA בולט מכל סביבתו (צבע בלעדי)", "קריאות AA על כל שכבה"],
  engine: "הכאוס מבוקר: הגריד מתחת נשאר; טקסט רץ על משטח שקט.",
  agent: "עצב מקסימליסטי: טיפוגרפיה ענקית, פלטה רוויה עם ניגודים חזקים ושכבות חופפות, אבל עם סקשני הפוגה, טופס נקי ו-CTA בצבע בלעדי.",
  note: "בדמו: כחול דומיננטי, ורוד וצהוב כמתנגשים, הירוק החומצי שמור ל-CTA בלבד. הירו הוא השיא, היתרונות על ורוד, המחירים על לבן כהפוגה, והטופס נקי לגמרי. הוויז'ואל חוצה את הגבול לסקשן הבא.",
  fonts: ["Secular One"],
  css: `.sk-s06 .ref{--s-bg:#1F1BFF;--s-surface:#fff;--s-ink:#000;--s-muted:#222;--s-line:#000;--s-accent:#C8FF00;--s-accent-ink:#000;--s-accent-txt:#000;--s-r:0;--s-btn-r:0;--s-ph:#FF2E9A;--s-ph-ink:#000;--s-font-h:"Secular One",inherit;--s-wt-h:400;
 --s-card-b:3px solid #000;--s-card-sh:8px 8px 0 #000;--s-ghost-b:3px solid #fff;--s-ghost-ink:#fff;--s-in-b:2px solid #000;--s-in-r:0;--s-hi-bg:#000;--s-hi-ink:#fff;--s-ico-bg:#1F1BFF;--s-ico-r:50%;--s-hd-bg:#000;--s-form-bg:#fff;--s-gap:28px}
.sk-s06 .hd{color:#fff}.sk-s06 .hd .nav{color:#fff}
.sk-s06 .hero{grid-template-columns:1fr;color:#fff;padding-bottom:0;gap:0}
.sk-s06 .hero h1{font-size:clamp(48px,10cqi,132px);line-height:.95;color:#fff;max-width:none;text-shadow:6px 6px 0 #FF2E9A;margin-bottom:20px}
.sk-s06 .lead{color:#fff;font-weight:600;max-width:52ch}
.sk-s06 .eyebrow{background:#FFE500;color:#000;padding:4px 10px;transform:rotate(-2deg)}
.sk-s06 .hero-v{order:0;aspect-ratio:16/7;background:#FFE500;border:3px solid #000;border-radius:0;transform:rotate(-2deg);box-shadow:12px 12px 0 #000;color:#000;margin:44px 6% -70px;overflow:visible;z-index:3}
.sk-s06 .hv-a{position:absolute;width:26%;aspect-ratio:1;inset-inline-end:-6%;top:-30%;border-radius:50%;background:#FF6B00;border:3px solid #000}
.sk-s06 .hv-b{position:absolute;width:50%;height:26%;inset-inline-start:-8%;bottom:-16%;background:repeating-linear-gradient(90deg,#000 0 12px,#1F1BFF 12px 24px);border:3px solid #000}
.sk-s06 .hv-l{font-family:"Secular One",inherit;font-size:clamp(28px,5cqi,64px)}
.sk-s06 .bens{background:#FF2E9A;padding-top:clamp(110px,14cqi,170px)}
.sk-s06 .bens h2{font-size:clamp(36px,6cqi,80px);color:#000}
.sk-s06 .bens .card:nth-child(1){transform:rotate(-1.5deg)}.sk-s06 .bens .card:nth-child(3){transform:rotate(1.5deg)}
.sk-s06 .prices{background:#fff}
.sk-s06 .prices h2{font-size:clamp(36px,6cqi,80px)}
.sk-s06 .price{box-shadow:none}
.sk-s06 .price.hi .amt{color:#C8FF00}
.sk-s06 .form{background:#fff;border-top:3px solid #000}
.sk-s06 .fbox{box-shadow:none;border:0}
.sk-s06 .ft{background:#000;color:#fff;border-top:0;font-weight:700}
@container (max-width:767px){.sk-s06 .hero-v{order:0;margin:30px 4% -50px}.sk-s06 .bens{padding-top:90px}}`,
}),
];
