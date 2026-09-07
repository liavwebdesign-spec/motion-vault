// ארכיטיפים של עמוד מלא R1-R12: שלד ניטרלי לכל סוג עמוד נפוץ, סקשן אחרי
// סקשן, כשכל סקשן מתויג בתפקיד שלו ובקומפוזיציה המומלצת (C), ולעמוד כולו
// מקצב (P). זה החיבור בין "מה בונים" ל"איך זה מסודר": הארכיטיפ הוא סדר
// הסקשנים, הקומפוזיציה היא הפריסה בתוך כל סקשן, והעור מלביש את הכל.
//
// ההכרעה (6.9.2026): library/archetypes.md בסקיל נבנה מכאן.
// שדות: rhythm (P), sections [{role, comp, why}], mobile, note.

export const AR_BASE = `.cwrap{container-type:inline-size}
.arch{background:#fff;border:1px solid var(--line,#e4e4ee);border-radius:16px;overflow:hidden;margin:clamp(20px,4cqi,56px) clamp(20px,4cqi,64px)}
.as{position:relative;padding:clamp(30px,4cqi,56px) clamp(18px,3.5cqi,56px);border-top:1px dashed #d5d6e3}
.as .tagc{position:absolute;top:8px;inset-inline-start:10px;font-size:11px;font-weight:700;color:#4a3aff;background:#eef0ff;padding:3px 9px;border-radius:999px;line-height:1.3}
.as.dark{background:#16182b;color:#fff}.as.dark .tx{background:#3a3d5c}.as.dark .tagc{background:#2b2e4d;color:#b9b6ff}.as.dark .card{background:#22254a;border-color:#3a3d5c}
.as.tint{background:#f7f7fa}
.tx{height:10px;border-radius:6px;background:#dfe0ea;margin:8px 0}
.tx.s{width:38%}.tx.m{width:62%}.tx.l{width:86%}
.ttl{font-weight:700;font-size:clamp(19px,2.4cqi,30px);line-height:1.1;margin:0 0 6px}
.ttl.h1{font-size:clamp(28px,4.5cqi,54px)}
.ttl.big{font-size:clamp(40px,9cqi,110px);line-height:.95}
.eyebrow{font-size:12px;font-weight:700;color:#4a3aff;margin-bottom:8px;display:block}
.ph{background:#dfe0ea;border-radius:12px;display:grid;place-items:center;color:#6a6d85;font-size:13px;font-weight:600;min-height:110px}
.ph.tall{min-height:220px}
.btn{display:inline-block;padding:11px 20px;border-radius:10px;background:#16182b;color:#fff;font-weight:600;font-size:14px;width:max-content;line-height:1.2}
.btn.ghost{background:transparent;color:inherit;border:1px solid currentColor}
.as.dark .btn{background:#fff;color:#16182b}
.btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.c{text-align:center;display:flex;flex-direction:column;align-items:center}.c .tx{margin-inline:auto}.c .btns{justify-content:center}
.split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,4cqi,48px);align-items:center}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.card{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;background:#fff}
.card .ico{width:34px;height:34px;border-radius:9px;background:#eef0ff;margin-bottom:10px}
.card .tx:first-child{margin-top:0}
.bento{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px}.bento .card:first-child{grid-row:span 2;min-height:200px;background:#16182b;border:0}.bento .card:first-child .tx{background:#3a3d5c}
.logos{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}.logos i{display:block;width:80px;height:26px;border-radius:6px;background:#e4e4ee}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#16182b;color:#fff;font-size:13px;margin-bottom:8px}
.zz{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:center}.zz+.zz{margin-top:18px}.zz.flip .ph{order:-1}
.quote{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;font-size:14px;line-height:1.5}.quote i{display:block;width:30px;height:30px;border-radius:50%;background:#dfe0ea;margin-top:10px}
.price{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;text-align:center;display:flex;flex-direction:column;align-items:center}.price.hi{background:#16182b;color:#fff}.price.hi .tx{background:#3a3d5c}.price .amt{font-weight:800;font-size:26px;margin:8px 0}.price.hi .btn{background:#fff;color:#16182b}
.faq{max-width:640px;margin-inline:auto}.faq .q{border-bottom:1px solid var(--line,#e4e4ee);padding:12px 0;display:flex;justify-content:space-between;font-size:14px;font-weight:600}
.frm{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;max-width:560px;margin-inline:auto;margin-top:14px}.frm i{display:block;height:42px;border:1px solid var(--line,#e4e4ee);border-radius:9px;background:#fff}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;text-align:center}.stats b{display:block;font-size:28px;font-weight:800}
.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gal .ph{min-height:120px}.gal.masonry .ph:nth-child(3n+1){min-height:180px}
.hd{display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,3.5cqi,56px);border-bottom:1px solid var(--line,#e4e4ee)}.hd b{font-size:15px}.hd .nav{display:flex;gap:16px}.hd .nav i{display:block;width:44px;height:8px;border-radius:4px;background:#dfe0ea}.hd .btn{padding:8px 14px;font-size:13px}
.ft{display:flex;justify-content:space-between;padding:16px clamp(18px,3.5cqi,56px);font-size:12px;background:#0f1020;color:#9a9db8}
.spine{position:relative;padding-inline-start:30px}.spine::before{content:"";position:absolute;inset-block:0;inset-inline-start:10px;width:2px;background:#4a3aff;opacity:.5}.spine .chap{position:relative;padding:12px 0}.spine .chap::before{content:"";position:absolute;inset-inline-start:-25px;top:18px;width:10px;height:10px;border-radius:50%;background:#4a3aff}
.art{max-width:62ch;margin-inline:auto}.art .tx{margin:9px 0}.pull{border-inline-start:4px solid #4a3aff;padding-inline-start:16px;font-size:18px;font-weight:600;margin:20px 0}
.buy{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:6px}.buy .amt{font-size:26px;font-weight:800}
.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.chips i{display:block;width:70px;height:28px;border-radius:999px;border:1px solid var(--line,#e4e4ee)}
/* ירוק וואטסאפ הבהיר (#25d366) עם טקסט לבן נותן 1.98:1 ונכשל ב-AA. #0f7a6d הוא הטיל הכהה של
   המותג (5.22:1 עם לבן). את הבהיר שומרים לאייקון, לא לכפתור עם טקסט. */
.wa{display:inline-flex;align-items:center;gap:8px;background:#0f7a6d;color:#fff;padding:12px 20px;border-radius:999px;font-weight:700;font-size:14px}
@container (max-width:767px){.split,.g2,.g3,.g4,.steps,.zz,.stats,.gal,.bento{grid-template-columns:1fr}.zz .ph,.zz.flip .ph{order:-1}.bento .card:first-child{grid-row:auto}.frm{grid-template-columns:1fr}.hd .nav{display:none}.ttl.big{font-size:clamp(34px,12cqi,60px)}}`;

// ───── ערכת הסקשנים הניטרליים ─────
const tx = (...k) => k.map(x => `<div class="tx ${x}"></div>`).join("");
const K = {
  hd: `<div class="hd"><b>שם העסק</b><span class="nav"><i></i><i></i><i></i></span><span class="btn">לשיחה</span></div>`,
  ft: `<div class="ft"><span>© שם העסק</span><span>תנאים · פרטיות · נגישות</span></div>`,
  heroSplit: `<div class="split"><div><span class="eyebrow">מה העסק עושה</span><p class="ttl h1">כותרת שאומרת מה מקבלים</p>${tx("l", "m")}<div class="btns"><span class="btn">הפעולה הראשית</span><span class="btn ghost">משנית</span></div></div><div class="ph tall">ויז'ואל</div></div>`,
  heroCenter: `<div class="c"><span class="eyebrow">מה העסק עושה</span><p class="ttl h1">כותרת שאומרת מה מקבלים</p>${tx("m", "s")}<div class="btns"><span class="btn">הפעולה הראשית</span></div></div>`,
  heroWord: `<div class="c"><p class="ttl big">מילה</p>${tx("m")}</div>`,
  heroSmall: `<div><span class="eyebrow">שירות</span><p class="ttl h1">שם השירות</p>${tx("l", "s")}<div class="btns"><span class="btn">לתיאום</span></div></div>`,
  heroPromo: `<div class="split"><div><span class="eyebrow">הקולקציה החדשה</span><p class="ttl h1">כותרת מבצע</p>${tx("m")}<div class="btns"><span class="btn">לקנייה</span></div></div><div class="ph tall">תמונת מוצר גיבור</div></div>`,
  heroVideo: `<div class="c"><span class="eyebrow">קורס · 6 מפגשים</span><p class="ttl h1">מה תדעו לעשות בסוף</p>${tx("m")}<div class="ph tall" style="width:min(100%,640px);margin-top:14px">וידאו פתיחה</div><div class="btns"><span class="btn">להרשמה</span></div></div>`,
  heroThanks: `<div class="c"><p class="ttl h1">הפרטים התקבלו</p>${tx("m", "s")}<div class="btns"><span class="wa">וואטסאפ עכשיו</span></div></div>`,
  logos: `<div class="logos"><i></i><i></i><i></i><i></i><i></i></div>`,
  stats: `<div class="stats"><div><b>120+</b>${tx("s")}</div><div><b>7</b>${tx("s")}</div><div><b>98%</b>${tx("s")}</div><div><b>24h</b>${tx("s")}</div></div>`,
  g3: (t = "שלושה פריטים") => `<p class="ttl">${t}</p><div class="g3">${`<div class="card"><i class="ico"></i>${tx("m", "l")}</div>`.repeat(3)}</div>`,
  g4: (t) => `<p class="ttl">${t}</p><div class="g4">${`<div class="card"><i class="ico"></i>${tx("m", "l")}</div>`.repeat(4)}</div>`,
  bento: (t) => `<p class="ttl">${t}</p><div class="bento"><div class="card">${tx("m", "l", "s")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div></div>`,
  zz: (t) => `<p class="ttl">${t}</p><div class="zz"><div>${tx("m", "l", "s")}</div><div class="ph">תמונה</div></div><div class="zz flip"><div>${tx("m", "l", "s")}</div><div class="ph">תמונה</div></div>`,
  steps: (t) => `<p class="ttl">${t}</p><div class="steps">${[1, 2, 3, 4].map(n => `<div class="step"><b>${n}</b>${tx("m", "l")}</div>`).join("")}</div>`,
  quotes: (t = "מה אומרים") => `<p class="ttl">${t}</p><div class="g3">${`<div class="quote">${tx("l", "l", "m")}<i></i></div>`.repeat(3)}</div>`,
  pricing: (t = "חבילות") => `<p class="ttl" style="text-align:center">${t}</p><div class="g3"><div class="price">${tx("s")}<b class="amt">₪2,500</b>${tx("m", "m")}<span class="btn ghost">לבחור</span></div><div class="price hi">${tx("s")}<b class="amt">₪4,000</b>${tx("m", "m", "m")}<span class="btn">לבחור</span></div><div class="price">${tx("s")}<b class="amt">₪6,000</b>${tx("m", "m")}<span class="btn ghost">לבחור</span></div></div>`,
  faq: `<div class="faq"><p class="ttl" style="text-align:center">שאלות</p>${`<div class="q"><span>שאלה שחוזרת בשיחות</span><span>+</span></div>`.repeat(4)}</div>`,
  cta: (t = "מוכנים להתחיל?") => `<div class="c"><p class="ttl">${t}</p>${tx("m")}<div class="btns"><span class="btn">הפעולה הראשית</span></div></div>`,
  form: `<div class="c"><p class="ttl">נשארים בקשר</p>${tx("m")}<div class="frm"><i></i><i></i><span class="btn">לשלוח</span></div></div>`,
  statement: `<div class="c"><p class="ttl">משפט אחד שאומר מי אנחנו</p>${tx("m")}</div>`,
  about: `<div class="split"><div class="ph tall">תמונה</div><div><span class="eyebrow">אודות</span><p class="ttl">מי מאחורי העסק</p>${tx("l", "l", "m")}</div></div>`,
  editorial: `<div class="split" style="align-items:start"><div><p class="ttl">כותרת עריכתית ארוכה יותר</p></div><div>${tx("l", "l", "l", "m", "l", "s")}</div></div>`,
  gal: (t, m) => `<p class="ttl">${t}</p><div class="gal${m ? " masonry" : ""}">${`<div class="ph">עבודה</div>`.repeat(6)}</div>`,
  satellites: (t) => `<p class="ttl">${t}</p><div class="split" style="grid-template-columns:1.4fr 1fr"><div class="card" style="min-height:200px">${tx("m", "l", "l", "s")}</div><div class="g2" style="grid-template-columns:1fr">${`<div class="card">${tx("m", "l")}</div>`.repeat(3)}</div></div>`,
  filters: `<div class="chips"><i></i><i></i><i></i><i></i><i></i></div>`,
  products: (t) => `<p class="ttl">${t}</p><div class="g4">${`<div class="card"><div class="ph" style="min-height:120px">מוצר</div>${tx("m", "s")}</div>`.repeat(4)}</div>`,
  cats: `<p class="ttl">קטגוריות</p><div class="g3">${`<div class="ph tall">קטגוריה</div>`.repeat(3)}</div>`,
  banner: `<div class="split"><div class="ph tall">קולקציה</div><div><p class="ttl">כותרת קולקציה</p>${tx("l", "m")}<div class="btns"><span class="btn">לצפייה</span></div></div></div>`,
  product: `<div class="split" style="align-items:start"><div><div class="ph tall">תמונה ראשית</div><div class="g4" style="margin-top:10px">${`<div class="ph" style="min-height:60px"></div>`.repeat(4)}</div></div><div class="buy"><span class="eyebrow">קטגוריה</span><p class="ttl">שם המוצר</p><b class="amt">₪249</b>${tx("l", "m")}<div class="chips" style="justify-content:flex-start;margin:8px 0"><i></i><i></i><i></i></div><span class="btn">הוספה לסל</span></div></div>`,
  specs: `<p class="ttl">פרטים ומפרט</p><div class="g2"><div>${tx("l", "l", "m", "l")}</div><div class="card">${tx("m", "m", "m", "m")}</div></div>`,
  spine: `<div class="spine">${[1, 2, 3].map(n => `<div class="chap"><p class="ttl">פרק ${n}</p>${tx("l", "l", "m")}</div>`).join("")}</div>`,
  team: `<p class="ttl">הצוות</p><div class="g4">${`<div class="c"><div class="ph" style="width:100%;min-height:120px">תמונה</div>${tx("m", "s")}</div>`.repeat(4)}</div>`,
  next: `<p class="ttl" style="text-align:center">מה קורה עכשיו</p><div class="steps" style="grid-template-columns:repeat(3,1fr)">${[1, 2, 3].map(n => `<div class="step"><b>${n}</b>${tx("m", "l")}</div>`).join("")}</div>`,
  syllabus: `<p class="ttl">הסילבוס</p><div class="spine">${[1, 2, 3, 4].map(n => `<div class="chap"><b style="font-size:14px">מפגש ${n}</b>${tx("l", "m")}</div>`).join("")}</div>`,
  instructor: `<div class="split"><div class="ph tall">המרצה</div><div><span class="eyebrow">מי מלמד</span><p class="ttl">שם המרצה</p>${tx("l", "l", "m")}</div></div>`,
  plate: `<div class="c"><div class="price hi" style="width:min(100%,420px)"><span class="eyebrow" style="color:#b9b6ff">מחיר ההשקה</span><b class="amt">₪297</b>${tx("m", "m", "m")}<span class="btn">להרשמה</span></div></div>`,
  artHead: `<div class="art"><span class="eyebrow">קטגוריה · 6 דקות קריאה</span><p class="ttl h1">כותרת המאמר</p>${tx("m")}</div>`,
  artBody: `<div class="art"><div class="ph tall" style="margin-bottom:18px">תמונה ראשית</div>${tx("l", "l", "l", "m")}<p class="ttl">כותרת ביניים</p>${tx("l", "l", "m")}<div class="pull">ציטוט מושך מתוך הטקסט</div>${tx("l", "l", "l", "s")}</div>`,
  related: `<p class="ttl">עוד מאמרים</p><div class="g3">${`<div class="card"><div class="ph" style="min-height:90px"></div>${tx("m", "s")}</div>`.repeat(3)}</div>`,
  problem: `<div class="c"><p class="ttl">הבעיה שכולם מכירים</p>${tx("l", "m")}</div>`,
  who: (t) => `<p class="ttl">${t}</p><div class="g3">${`<div class="card">${tx("m", "l")}</div>`.repeat(3)}</div>`,
  compare: `<div class="c"><p class="ttl">מה ההבדל בין החבילות</p>${tx("l", "m")}</div>`,
};

const sec = (s, i) => `<section class="as${s.cls ? " " + s.cls : ""}"><span class="tagc">${i + 1} · ${s.role}${s.comp ? " · " + s.comp : ""}</span>${s.html}</section>`;
const doc = (o) => ({
  cat: "arch", area: "doctrine", status: "מאושר", runway: false, tech: "ארכיטיפ עמוד · שלד",
  ...o,
  css: AR_BASE + (o.css ? "\n" + o.css : ""),
  html: `<div class="cwrap"><div class="arch">${K.hd}${o.sections.map(sec).join("")}${K.ft}</div></div>`,
});
const S = (role, comp, html, why, cls) => ({ role, comp, html, why, cls });

export default [
doc({
  id: "ar01", name: "דף נחיתה ממומן", rhythm: "P2 קרשנדו", fit: ["L"],
  desc: "עמוד אחד, מטרה אחת: ליד. נבנה כקרשנדו, מהצהרה אוורירית דרך הוכחות אל סגירה צפופה.",
  when: "יעד של מודעות מטא או גוגל. הקורא הגיע מהבטחה ספציפית וצריך לראות אותה מיד.",
  mobile: "התפריט נעלם כולו (בדף נחיתה אין לאן ללכת). CTA דביק בתחתית המסך אחרי ההירו.",
  note: "בלי תפריט ניווט אמיתי, בלי קישורים החוצה, בלי סקשן אודות ארוך. כל מה שלא מקדם את הליד יורד.",
  sections: [
    S("הירו", "C9", K.heroSplit, "ההבטחה מהמודעה, מילה במילה, ופעולה אחת."),
    S("הוכחה מהירה", "C10 פס", K.logos, "לוגואים או מספרים לפני שהקורא מספיק לפקפק.", "tint"),
    S("הבעיה", "C14", K.problem, "משפט אחד שהקורא מהנהן אליו."),
    S("הפתרון", "C3 זיגזג", K.zz("מה מקבלים"), "שני-שלושה יתרונות עם ויז'ואל, לא רשימה."),
    S("איך זה עובד", "C6", K.steps("ארבעה שלבים"), "תהליך קצר שמוריד חשש.", "tint"),
    S("עדויות", "C13", K.quotes(), "הוכחה חברתית ליד המחיר."),
    S("מחירים", "C4", K.pricing(), "שלוש חבילות, האמצעית מודגשת."),
    S("שאלות", "C11", K.faq, "ההתנגדויות האחרונות, ממורכז.", "tint"),
    S("סגירה + טופס", "C9", K.form, "הסקשן הצפוף ביותר בעמוד, כמו שהקרשנדו דורש.", "dark"),
  ],
}),
doc({
  id: "ar02", name: "וואן-פייג'ר לעסק שירות", rhythm: "P1 מדורג קלאסי", fit: ["S"],
  desc: "עמוד אחד שמחליף אתר: מי, מה, איך, הוכחה, קשר. תפריט עוגנים ולא עמודים.",
  when: "עסק קטן עם שירות ברור: מטפל, יועץ, קבלן, סטודיו.",
  mobile: "תפריט העוגנים הופך לכפתור וואטסאפ צף. הסקשנים נשארים כולם.",
  note: "האודות מוקדם (שני) כי בעסק שירות קונים אדם. באתר מוצר הוא היה יורד למטה.",
  sections: [
    S("הירו", "C9", K.heroSplit, "מה אני עושה ולמי, עם תמונה של האדם."),
    S("אודות", "C1 split", K.about, "מי מאחורי העסק, מוקדם, כי זה מה שקונים."),
    S("שירותים", "C4 גריד", K.g3("השירותים"), "שלושה-ארבעה שירותים שקולים.", "tint"),
    S("תהליך", "C6", K.steps("איך עובדים יחד"), "מוריד את הפחד מהלא-נודע."),
    S("עבודות", "C13", K.gal("עבודות נבחרות", false), "שש דוגמאות, לא יותר.", "tint"),
    S("עדויות", "C13", K.quotes(), "שלוש, עם שם ותפקיד."),
    S("יצירת קשר", "C9", K.form, "טופס קצר וטלפון גלוי.", "dark"),
  ],
}),
doc({
  id: "ar03", name: "עמוד בית לאתר תדמית", rhythm: "P3 נשימות", fit: ["S"],
  desc: "עמוד הבית של אתר רב-עמודי: מציג את הרוחב, לא את העומק. כל סקשן פותח דלת לעמוד פנימי.",
  when: "פירמה, משרד, חברה עם כמה שירותים ועמודים פנימיים.",
  mobile: "סקשני הנשימה נשארים (הם היוקרה). הבנטו קורס לעמודה.",
  note: "האודות כאן עריכתי וקצר, כי יש לו עמוד משלו. הטעות הנפוצה: לדחוס את כל האתר לעמוד הבית.",
  sections: [
    S("הירו", "C9", K.heroSplit, "מי אנחנו בשבע מילים ותמונת מותג."),
    S("נשימה", "C14", K.statement, "משפט אחד, הרבה אוויר. פרימיום.", "tint"),
    S("שירותים", "C5 בנטו", K.bento("תחומי הפעילות"), "שירות מוביל אחד גדול ולוויינים."),
    S("אודות", "C8 עריכתי", K.editorial, "כותרת מול טקסט, קצר, עם קישור לעמוד המלא."),
    S("עבודות", "C12", K.gal("פרויקטים", true), "מזונרי, כי הפרויקטים לא באותו גודל.", "tint"),
    S("לקוחות", "C10 פס", K.logos, "שורת לוגואים כהוכחה שקטה."),
    S("נשימה", "C14", K.quotes("מילה מלקוחות"), "עדות אחת-שלוש עם אוויר.", "tint"),
    S("סגירה", "CTA", K.cta(), "הזמנה לשיחה, לא טופס ארוך.", "dark"),
  ],
}),
doc({
  id: "ar04", name: "עמוד שירות פנימי", rhythm: "P5 סנדוויץ'", fit: ["S"],
  desc: "עמוד של שירות אחד באתר רב-עמודי: למי, מה כלול, איך, שאלות, פעולה. ענייני באמצע, חזק בקצוות.",
  when: "כל שירות שיש לו עמוד משלו. גם עמודי \"תחומי עיסוק\" במשרדים.",
  mobile: "הירו קטן נשאר קטן. הלוויינים של C15 נערמים מתחת לגיבור.",
  note: "הירו קטן בכוונה: הקורא כבר בתוך האתר. ההבטחה הגדולה היא של עמוד הבית.",
  sections: [
    S("הירו קטן", "C1", K.heroSmall, "שם השירות ומשפט, בלי דרמה."),
    S("למי זה", "C4", K.who("למי זה מתאים"), "שלושה פרופילים של לקוח.", "tint"),
    S("מה כלול", "C15 גיבור ולוויינים", K.satellites("מה מקבלים"), "מרכיב עיקרי ושלושה תומכים, לא רשימה שטוחה."),
    S("תהליך", "C6", K.steps("איך זה עובד"), "ארבעה שלבים.", "tint"),
    S("שאלות", "C11", K.faq, "ספציפיות לשירות הזה."),
    S("סגירה", "CTA", K.cta("רוצים להתחיל?"), "פעולה ברורה, בקצה החזק של הסנדוויץ'.", "dark"),
  ],
}),
doc({
  id: "ar05", name: "עמוד מחירים שקוף", rhythm: "P5 סנדוויץ'", fit: ["L", "S"],
  desc: "המחירים הם התוכן: כמה מוצרים, לכל אחד שלוש חבילות, והקורא בוחר ומשאיר פרטים. הדגם של /start.",
  when: "עסק שמוכן להראות מחיר לפני שיחה, ורוצה לידים שכבר יודעים כמה זה עולה.",
  mobile: "המוצרים בערימה ולא בטאבים. CTA דביק עם החבילה שנבחרה.",
  note: "טבלאות בערימה ולא בטאבים, כי במובייל טאבים מסתירים שני שלישים מהמחירים. הטופס יודע איזו חבילה נבחרה.",
  sections: [
    S("הירו", "C14", K.heroCenter, "ההבטחה: המחירים כאן, בלי שיחה."),
    S("מוצר א'", "C4", K.pricing("וואן-פייג'ר"), "שלוש חבילות, האמצעית מודגשת.", "tint"),
    S("מוצר ב'", "C4", K.pricing("אתר תדמית"), "אותו מבנה בדיוק, כדי שההשוואה תהיה קלה."),
    S("מה ההבדל", "C14", K.compare, "משפט שעוזר לבחור, ממורכז.", "tint"),
    S("שאלות", "C11", K.faq, "מע\"מ, תשלומים, מה לא כלול."),
    S("טופס", "C9", K.form, "שם וטלפון, עם צ'יפ של החבילה שנבחרה.", "dark"),
  ],
}),
doc({
  id: "ar06", name: "אודות כסיפור", rhythm: "P4 סיפור-גלילה", fit: ["S"],
  desc: "עמוד אודות שמספר סיפור בפרקים לאורך עמוד שדרה, במקום פסקה ותמונה.",
  when: "עסק עם סיפור אמיתי: מייסד, מפנה, דרך. בלי סיפור זה C6 ארוך.",
  mobile: "עמוד השדרה עובר לצד הימני, הפרקים נערמים.",
  note: "הפתיחה במילה ענקית (C7) קובעת את הטון. הסיום הוא הצוות, לא CTA מכירתי: אודות סוגר באנשים.",
  sections: [
    S("פתיחה", "C7 מילה ענקית", K.heroWord, "מילה אחת שמסכמת את הסיפור."),
    S("פרקים", "C6 עמוד שדרה", K.spine, "שלושה פרקים על קו אחד.", "tint"),
    S("מפנה", "C14", K.statement, "המשפט שמסביר למה זה חשוב."),
    S("הצוות", "C4", K.team, "האנשים, בסוף, כשכבר אכפת.", "tint"),
    S("סגירה", "CTA", K.cta("בואו נדבר"), "רכה, לא מכירתית.", "dark"),
  ],
}),
doc({
  id: "ar07", name: "פורטפוליו ועבודות", rhythm: "P3 נשימות", fit: ["S"],
  desc: "העבודות הן הטקסט. הירו קטן, סינון, גלריית מזונרי, מקרה בוחן אחד מודגש, וסגירה.",
  when: "סטודיו, מעצב, צלם, אדריכל, כל מי שהעבודה מדברת.",
  mobile: "המזונרי לעמודה אחת. הסינון לגלילה אופקית עם peek.",
  note: "מקרה הבוחן (C15) הוא מה שמפריד פורטפוליו מגלריה: עבודה אחת מקבלת סיפור.",
  sections: [
    S("הירו קטן", "C1", K.heroSmall, "משפט על הגישה, לא רשימת שירותים."),
    S("סינון", "C10", K.filters, "צ'יפים לפי סוג עבודה.", "tint"),
    S("גלריה", "C12 מזונרי", K.gal("עבודות", true), "גבהים שונים, כי העבודות שונות."),
    S("מקרה בוחן", "C15", K.satellites("פרויקט נבחר"), "עבודה אחת עם סיפור ותוצאות.", "tint"),
    S("נשימה", "C14", K.quotes("מה הלקוחות אמרו"), "עדות אחת-שלוש."),
    S("סגירה", "CTA", K.cta("יש לכם פרויקט?"), "הזמנה לשיחה.", "dark"),
  ],
}),
doc({
  id: "ar08", name: "עמוד בית לחנות", rhythm: "P1 מדורג קלאסי", fit: ["S"],
  desc: "חנות: מבצע גיבור, קטגוריות, מוצרים נבחרים, למה לקנות כאן, קולקציה, ביקורות, ניוזלטר.",
  when: "חנות איקומרס (Lovable + Shopify). עמוד הבית הוא חלון ראווה, לא קטלוג.",
  mobile: "המוצרים לשתי עמודות (לא אחת, מוצרים סורקים). הקטגוריות לגלילה אופקית.",
  note: "ערכי המותג (C10) יושבים אחרי המוצרים ולא לפניהם: בחנות קודם רואים סחורה.",
  sections: [
    S("הירו מבצע", "C9", K.heroPromo, "מוצר גיבור והנעה לקנייה."),
    S("קטגוריות", "C4", K.cats, "שלוש-ארבע דלתות כניסה.", "tint"),
    S("מוצרים נבחרים", "C4 גריד", K.products("הנמכרים ביותר"), "ארבעה מוצרים, מחיר גלוי."),
    S("למה כאן", "C10 פס", K.stats, "משלוח, החזרה, אחריות, בשורה אחת.", "tint"),
    S("קולקציה", "C2 חפיפה", K.banner, "באנר עם תמונה גדולה וטקסט."),
    S("ביקורות", "C13", K.quotes("לקוחות מספרים"), "הוכחה חברתית עם כוכבים.", "tint"),
    S("ניוזלטר", "C9", K.form, "אימייל אחד, הטבה אחת.", "dark"),
  ],
}),
doc({
  id: "ar09", name: "עמוד מוצר", rhythm: "P5 סנדוויץ'", fit: ["S"],
  desc: "גלריה מול קופסת קנייה, ואז פרטים, מפרט, מוצרים דומים וביקורות. הכל משרת את כפתור ההוספה לסל.",
  when: "כל מוצר בחנות.",
  mobile: "הגלריה מעל, קופסת הקנייה מתחת, וכפתור הוספה לסל דביק בתחתית.",
  note: "קופסת הקנייה נשארת בגובה העין (sticky בדסקטופ). הביקורות בסוף כי הן ארוכות, אבל הדירוג מופיע כבר בקופסה.",
  sections: [
    S("מוצר", "C1 split", K.product, "גלריה מול קופסת קנייה עם מחיר, וריאציות וכפתור."),
    S("פרטים ומפרט", "C8", K.specs, "טקסט מול טבלת מפרט.", "tint"),
    S("מוצרים דומים", "C4", K.products("אולי יעניין אתכם"), "ארבעה, אותו גריד של הבית."),
    S("ביקורות", "C13", K.quotes("ביקורות"), "עם תמונות של לקוחות אם יש.", "tint"),
    S("סגירה", "CTA", K.cta("עדיין מתלבטים?"), "משלוח חינם, החזרה, וואטסאפ.", "dark"),
  ],
}),
doc({
  id: "ar10", name: "דף תודה", rhythm: "P5 סנדוויץ'", fit: ["L", "S"],
  desc: "אחרי הטופס: אישור ברור, מה קורה עכשיו, ופעולה אחת נוספת (וואטסאפ). קצר.",
  when: "כל טופס. וגם היעד של אירוע ההמרה בפיקסל.",
  mobile: "כפתור הוואטסאפ ראשון ובולט.",
  note: "בלי תפריט שמפזר, בלי מוצרים נוספים. שלושה שלבים של \"מה עכשיו\" מורידים חרדה ומקטינים טלפונים מיותרים.",
  sections: [
    S("אישור", "C14", K.heroThanks, "הפרטים התקבלו, מי חוזר ומתי, וואטסאפ."),
    S("מה עכשיו", "C6", K.next, "שלושה שלבים קצרים.", "tint"),
    S("בינתיים", "C4", K.related, "שלושה תכנים לקרוא עד שחוזרים."),
  ],
}),
doc({
  id: "ar11", name: "קורס או וובינר", rhythm: "P2 קרשנדו", fit: ["L"],
  desc: "דף מכירה לקורס: וידאו, מה תדעו, סילבוס, מי מלמד, לוח מחיר אחד, שאלות, הרשמה.",
  when: "קורס דיגיטלי, וובינר, סדנה. הדגם של דף הקורס של ליאב וזיו.",
  mobile: "הווידאו בראש, לוח המחיר דביק כתקציר בתחתית.",
  note: "מחיר אחד ולא שלוש חבילות: בקורס הבחירה היא כן או לא. הסילבוס כטיימליין (C6), לא כאקורדיון.",
  sections: [
    S("הירו + וידאו", "C14", K.heroVideo, "מה תדעו לעשות בסוף, ווידאו."),
    S("מה תלמדו", "C4", K.g3("מה תלמדו"), "שלושה-שישה יתרונות שקולים.", "tint"),
    S("סילבוס", "C6", K.syllabus, "מפגש אחרי מפגש על קו."),
    S("מי מלמד", "C1", K.instructor, "המרצה, ניסיון, למה לו.", "tint"),
    S("עדויות", "C13", K.quotes("בוגרים"), "שלושה, עם תוצאה קונקרטית."),
    S("לוח מחיר", "C16", K.plate, "לוח אחד, כהה, ממורכז.", "tint"),
    S("שאלות", "C11", K.faq, "הקלטות, החזר, זמן."),
    S("סגירה", "CTA", K.cta("שומרים מקום?"), "הכי צפוף בעמוד.", "dark"),
  ],
}),
doc({
  id: "ar12", name: "מאמר בבלוג", rhythm: "P3 נשימות", fit: ["S"],
  desc: "עמוד קריאה: כותרת ומטא, תמונה, גוף במידת measure עם כותרות ביניים וציטוט, ומאמרים קשורים.",
  when: "בלוג, מדריכים, עמודי SEO. תוכן שנקרא ולא נסרק.",
  mobile: "אותו measure, הגופן גדל מעט. הקשורים בעמודה.",
  note: "measure של 62ch ולא רוחב הקונטיינר. הפסקאות מיושרות לימין, לא ממורכזות. ה-CTA רך ובסוף בלבד.",
  sections: [
    S("כותרת", "C14", K.artHead, "קטגוריה, זמן קריאה, כותרת, תקציר."),
    S("גוף", "C8 עריכתי", K.artBody, "measure צר, כותרות ביניים, ציטוט מושך."),
    S("מאמרים קשורים", "C4", K.related, "שלושה, אותו נושא.", "tint"),
    S("סגירה רכה", "CTA", K.cta("רוצים לדבר על זה?"), "הזמנה, לא לחץ.", "dark"),
  ],
}),
];
