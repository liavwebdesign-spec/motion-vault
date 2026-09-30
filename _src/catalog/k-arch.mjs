// ארכיטיפים של עמוד מלא R1-R12: שלד ניטרלי לכל סוג עמוד נפוץ, סקשן אחרי
// סקשן, כשכל סקשן מתויג בתפקיד שלו ובקומפוזיציה המומלצת (C), ולעמוד כולו
// מקצב (P). זה החיבור בין "מה בונים" ל"איך זה מסודר": הארכיטיפ הוא סדר
// הסקשנים, הקומפוזיציה היא הפריסה בתוך כל סקשן, והעור מלביש את הכל.
//
// ההכרעה (6.9.2026): library/archetypes.md בסקיל נבנה מכאן.
// שדות: rhythm (P), sections [{role, comp, why}], mobile, note, hd (הדר חלופי, לא חובה).
// כל סקשן מקבל data-comp עם קוד הקומפוזיציה (כמו בפרויקט, qa-checklist 13כו), וציר הראש נגזר ממנו
// לפי טבלת הצירים ב-compositions.md 6 (30.9.2026: השלד לימד ראש מיושר לימין מעל גריד, והשער היה מפיל אותו).

export const AR_BASE = `.cwrap{container-type:inline-size}
.arch{background:#fff;border:1px solid var(--line,#e4e4ee);border-radius:16px;overflow:hidden;margin:clamp(20px,4cqi,56px) clamp(20px,4cqi,64px)}
.as{position:relative;padding:clamp(30px,4cqi,56px) clamp(18px,3.5cqi,56px);padding-top:clamp(40px,4cqi,56px);border-top:1px dashed #d5d6e3}
.as .tagc{position:absolute;top:8px;inset-inline-start:10px;font-size:12px;font-weight:700;color:#4a3aff;background:#eef0ff;padding:3px 9px;border-radius:999px;line-height:1.3}
.as.dark{background:#16182b;color:#fff}.as.dark .tx{background:#3a3d5c}.as.dark .tagc{background:#2b2e4d;color:#b9b6ff}.as.dark .card{background:#22254a;border-color:#3a3d5c}
/* הסוגר נמס לפוטר (A6, צ'קליסט 0ד): בלי קו ישר בין #16182b ל-#0f1020 */
.as.dark:last-of-type{background:linear-gradient(to bottom,#16182b 55%,#0f1020)}
.as.tint{background:#f7f7fa}
/* כרטיס על רקע tint הוא כבר משטח, ולכן בלי מסגרת (A15, צ'קליסט 2א) */
.as.tint .card,.price.hi{border-color:transparent}
/* ציר הראש לפי הקומפוזיציה (compositions.md 6). C3 ממורכז בדסקטופ ובהתחלה בטלפון (ב-@container למטה) */
.as[data-comp=C3]>.ttl,.as[data-comp=C4]>.ttl,.as[data-comp=C5]>.ttl,.as[data-comp=C6]>.ttl,.as[data-comp=C7]>.ttl,.as[data-comp=C10]>.ttl,.as[data-comp=C13]>.ttl,.as[data-comp=C14]>.ttl,.as[data-comp=C16]>.ttl{text-align:center}
.as[data-comp=C6] .spine{max-width:640px;margin-inline:auto}
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
.hs{grid-template-columns:1.4fr 1fr}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.g4.thumbs{grid-template-columns:repeat(4,1fr)}
.mos{align-items:start}
.card{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;background:#fff}
.card .ico{display:block;width:34px;height:34px;border-radius:9px;background:#eef0ff;margin-bottom:10px}
.card .tx:first-child{margin-top:0}
.bento{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px}.bento .card:first-child{grid-row:span 2;min-height:200px;background:#16182b;border:0}.bento .card:first-child .tx{background:#3a3d5c}
.cats3{display:grid;grid-template-columns:2fr 1fr;gap:14px}.cats3 .ph:first-child{grid-row:span 2}
.logos{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}.logos i{display:block;width:80px;height:26px;border-radius:6px;background:#e4e4ee}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.step b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#16182b;color:#fff;font-size:13px;margin-bottom:8px}
.n3{grid-template-columns:repeat(3,1fr)}
.zz{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:center}.zz+.zz{margin-top:18px}.zz.flip .ph{order:-1}
.quote{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;font-size:14px;line-height:1.5}.quote i{display:block;width:30px;height:30px;border-radius:50%;background:#dfe0ea;margin-top:10px}
.price{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:16px;text-align:center;display:flex;flex-direction:column;align-items:center}.price.hi{background:#16182b;color:#fff}.price.hi .tx{background:#3a3d5c}.price .amt{font-weight:800;font-size:26px;margin:8px 0}.price.hi .btn{background:#fff;color:#16182b}.price .btn{margin-top:auto}
.faqs{grid-template-columns:1fr 2fr;align-items:start}.faqs>div:first-child{position:sticky;top:16px}
.faq .q{border-bottom:1px solid var(--line,#e4e4ee);padding:12px 0;display:flex;justify-content:space-between;font-size:14px;font-weight:600}
.frm{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;width:100%;max-width:560px;margin-inline:auto;margin-top:14px}.frm.one{grid-template-columns:1fr auto;max-width:420px}.frm i{display:block;height:42px;border:1px solid var(--line,#e4e4ee);border-radius:9px;background:#fff}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;text-align:center}.stats b{display:block;font-size:28px;font-weight:800}.stats .tx{margin-inline:auto}
.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.gal .ph{min-height:120px}
.gal.masonry{display:block;columns:3;column-gap:10px}.gal.masonry .ph{break-inside:avoid;margin:0 0 10px}.gal.masonry .ph:nth-child(3n+1){min-height:180px}.gal.masonry .ph:nth-child(3n+2){min-height:150px}
.hd{display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,3.5cqi,56px);border-bottom:1px solid var(--line,#e4e4ee)}.hd b{font-size:15px}.hd .nav{display:flex;gap:16px}.hd .nav i{display:block;width:44px;height:8px;border-radius:4px;background:#dfe0ea}.hd .btn{padding:8px 14px;font-size:13px}
.hd .icons{display:flex;gap:10px}.hd .icons i{display:block;width:22px;height:22px;border-radius:6px;background:#dfe0ea}
.ft{display:flex;justify-content:space-between;padding:16px clamp(18px,3.5cqi,56px);font-size:12px;background:#0f1020;color:#9a9db8}
.spine{position:relative;padding-inline-start:30px}.spine::before{content:"";position:absolute;inset-block:0;inset-inline-start:10px;width:2px;background:#4a3aff;opacity:.5}.spine .chap{position:relative;padding:12px 0}.spine .chap::before{content:"";position:absolute;inset-inline-start:-25px;top:18px;width:10px;height:10px;border-radius:50%;background:#4a3aff}
.art{max-width:62ch;margin-inline:auto}.art .tx{margin:9px 0}.art.c .tx{margin-inline:auto}.pull{border-inline-start:4px solid #4a3aff;padding-inline-start:16px;font-size:18px;font-weight:600;margin:20px 0}
.buy{border:1px solid var(--line,#e4e4ee);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:6px}.buy .amt{font-size:26px;font-weight:800}
.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.chips i{display:block;width:70px;height:28px;border-radius:999px;border:1px solid #c3c5d6}
.as>.chips i:first-child{background:#16182b;border-color:#16182b}
/* C2: כרטיס הטקסט רוכב על שולי התמונה, לא על התווית שבמרכזה (compositions.md C2, צ'קליסט 13כא) */
.ovl{column-gap:0}.ovl>div:last-child{position:relative;background:#fff;border-radius:12px;padding:24px;margin-inline-start:-56px}
/* ירוק וואטסאפ הבהיר (#25d366) עם טקסט לבן נותן 1.98:1 ונכשל ב-AA. #0f7a6d הוא הטיל הכהה של
   המותג (5.22:1 עם לבן). את הבהיר שומרים לאייקון, לא לכפתור עם טקסט. */
.wa{display:inline-flex;align-items:center;gap:8px;background:#0f7a6d;color:#fff;padding:12px 20px;border-radius:999px;font-weight:700;font-size:14px}
@container (max-width:767px){.split,.hs,.g2,.g3,.steps,.n3,.zz,.gal{grid-template-columns:1fr}.g4,.stats,.bento{grid-template-columns:1fr 1fr}.bento .card:first-child{grid-column:1/-1;grid-row:auto}.zz .ph,.zz.flip .ph{order:-1}.split>.ph:first-child{order:1}.frm{grid-template-columns:1fr}.hd .nav{display:none}.ttl.big{font-size:clamp(34px,12cqi,60px)}.as[data-comp=C3]>.ttl{text-align:start}.faqs>div:first-child{position:static}.gal.masonry{columns:1}.cats3{display:flex;overflow-x:auto;scroll-snap-type:x mandatory}.cats3 .ph{flex:0 0 78%;scroll-snap-align:start}.as>.chips{flex-wrap:nowrap;overflow-x:auto;justify-content:flex-start}.as>.chips i{flex:none}.ovl{row-gap:0}.ovl>div:last-child{margin:0 12px -24px}}`;

// ───── ערכת הסקשנים הניטרליים ─────
// סמנטיקה (30.9.2026): כותרת ההירו h1, ראשי הסקשנים h2, הדר ופוטר באלמנטים שלהם. .ttl גובר על h1/h2 של הגיליון.
const tx = (...k) => k.map(x => `<div class="tx ${x}"></div>`).join("");
const card = `<div class="card"><i class="ico"></i>${tx("m", "l")}</div>`;
const K = {
  hd: `<header class="hd"><b>שם העסק</b><span class="nav"><i></i><i></i><i></i></span><span class="btn">לשיחה</span></header>`,
  // דף נחיתה: לוגו ופעולה אחת, בלי ניווט
  hdMin: `<header class="hd"><b>שם העסק</b><span class="btn">לשיחה</span></header>`,
  // חנות: ניווט קטגוריות ואייקוני גישה מהירה (חיפוש, עגלה), site-planning חנות
  hdShop: `<header class="hd"><b>שם החנות</b><span class="nav"><i></i><i></i><i></i><i></i></span><span class="icons"><i></i><i></i></span></header>`,
  ft: `<footer class="ft"><span>© שם העסק</span><span>תנאים · פרטיות · נגישות</span></footer>`,
  heroSplit: `<div class="split"><div><span class="eyebrow">מה העסק עושה</span><h1 class="ttl h1">כותרת שאומרת מה מקבלים</h1>${tx("l", "m")}<div class="btns"><span class="btn">הפעולה הראשית</span><span class="btn ghost">משנית</span></div></div><div class="ph tall">ויז'ואל</div></div>`,
  heroCenter: `<div class="c"><span class="eyebrow">מה העסק עושה</span><h1 class="ttl h1">כותרת שאומרת מה מקבלים</h1>${tx("m", "s")}<div class="btns"><span class="btn">הפעולה הראשית</span></div></div>`,
  heroWord: `<div class="c"><h1 class="ttl big">מילה</h1>${tx("m")}</div>`,
  // C1 בקטן: טקסט מול ויז'ואל קטן, והוויז'ואל אחרי הכותרת בטלפון
  heroSmall: (e = "שירות", t = "שם השירות", b = "לתיאום", v = "תמונת השירות") => `<div class="split hs"><div><span class="eyebrow">${e}</span><h1 class="ttl h1">${t}</h1>${tx("l", "s")}<div class="btns"><span class="btn">${b}</span></div></div><div class="ph">${v}</div></div>`,
  heroPromo: `<div class="split"><div><span class="eyebrow">הקולקציה החדשה</span><h1 class="ttl h1">כותרת מבצע</h1>${tx("m")}<div class="btns"><span class="btn">לקנייה</span></div></div><div class="ph tall">תמונת מוצר גיבור</div></div>`,
  heroVideo: `<div class="c"><span class="eyebrow">קורס · 6 מפגשים</span><h1 class="ttl h1">מה תדעו לעשות בסוף</h1>${tx("m")}<div class="ph tall" style="width:min(100%,640px);margin-top:14px">וידאו פתיחה</div><div class="btns"><span class="btn">להרשמה</span></div></div>`,
  heroThanks: `<div class="c"><h1 class="ttl h1">הפרטים התקבלו</h1>${tx("m", "s")}<div class="btns"><span class="wa">וואטסאפ עכשיו</span></div></div>`,
  logos: `<div class="logos"><i></i><i></i><i></i><i></i><i></i></div>`,
  stats: `<div class="stats"><div><b>120+</b>${tx("s")}</div><div><b>7</b>${tx("s")}</div><div><b>98%</b>${tx("s")}</div><div><b>24h</b>${tx("s")}</div></div>`,
  g3: (t = "שלושה פריטים") => `<h2 class="ttl">${t}</h2><div class="g3">${card.repeat(3)}</div>`,
  g4: (t) => `<h2 class="ttl">${t}</h2><div class="g4">${card.repeat(4)}</div>`,
  bento: (t) => `<h2 class="ttl">${t}</h2><div class="bento"><div class="card">${tx("m", "l", "s")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div><div class="card">${tx("m", "l")}</div></div>`,
  zz: (t) => `<h2 class="ttl">${t}</h2><div class="zz"><div>${tx("m", "l", "s")}</div><div class="ph">תמונה</div></div><div class="zz flip"><div>${tx("m", "l", "s")}</div><div class="ph">תמונה</div></div>`,
  steps: (t) => `<h2 class="ttl">${t}</h2><div class="steps">${[1, 2, 3, 4].map(n => `<div class="step"><b>${n}</b>${tx("m", "l")}</div>`).join("")}</div>`,
  // C13: עדויות באורכים שונים, כל אחת בגובה שלה (פסיפס, לא גריד שטוח)
  quotes: (t = "מה אומרים") => `<h2 class="ttl">${t}</h2><div class="g3 mos">${[["l", "l", "m"], ["l", "l", "l", "l", "s"], ["l", "m"]].map(k => `<div class="quote">${tx(...k)}<i></i></div>`).join("")}</div>`,
  // C14 או C10: ציטוט אחד עם הרבה אוויר
  quote1: (t, ch = 24) => `<div class="c"><p class="ttl" style="max-width:${ch}ch;text-wrap:balance">״${t}״</p>${tx("s")}</div>`,
  pricing: (t = "חבילות") => `<h2 class="ttl">${t}</h2><div class="g3"><div class="price">${tx("s")}<b class="amt">₪2,500</b>${tx("m", "m")}<span class="btn ghost">לבחור</span></div><div class="price hi">${tx("s")}<b class="amt">₪4,000</b>${tx("m", "m", "m")}<span class="btn">לבחור</span></div><div class="price">${tx("s")}<b class="amt">₪6,000</b>${tx("m", "m")}<span class="btn ghost">לבחור</span></div></div>`,
  // C11: הכותרת בצד (דביקה בדסקטופ), השאלות לצדה. בטלפון כותרת ואז השאלות, בלי דביקות
  faq: `<div class="split faqs"><div><h2 class="ttl">שאלות</h2>${tx("m")}</div><div class="faq">${`<div class="q"><span>שאלה שחוזרת בשיחות</span><span>+</span></div>`.repeat(4)}</div></div>`,
  cta: (t = "מוכנים להתחיל?") => `<div class="c"><h2 class="ttl">${t}</h2>${tx("m")}<div class="btns"><span class="btn">הפעולה הראשית</span></div></div>`,
  // P2: הסגירה היא הסקשן הצפוף בעמוד (כותרת, תקציר, מחיר, מה כלול, פעולה)
  ctaDense: `<div class="c"><h2 class="ttl">שומרים מקום?</h2>${tx("m", "s")}<b style="font-size:26px;font-weight:800;margin:6px 0">₪297</b><div class="chips" style="margin:8px 0"><i></i><i></i><i></i></div><div class="btns"><span class="btn">להרשמה</span></div></div>`,
  form: (n = 2) => `<div class="c"><h2 class="ttl">נשארים בקשר</h2>${tx("m")}<div class="frm${n === 1 ? " one" : ""}">${"<i></i>".repeat(n)}<span class="btn">לשלוח</span></div></div>`,
  statement: (t = "משפט אחד שאומר מי אנחנו") => `<div class="c"><h2 class="ttl">${t}</h2>${tx("m")}</div>`,
  about: `<div class="split"><div class="ph tall">תמונה</div><div><span class="eyebrow">אודות</span><h2 class="ttl">מי מאחורי העסק</h2>${tx("l", "l", "m")}</div></div>`,
  editorial: `<div class="split" style="align-items:start"><div><h2 class="ttl">כותרת עריכתית ארוכה יותר</h2></div><div>${tx("l", "l", "l", "m", "l", "s")}</div></div>`,
  gal: (t, m) => `<h2 class="ttl">${t}</h2><div class="gal${m ? " masonry" : ""}">${`<div class="ph">עבודה</div>`.repeat(6)}</div>`,
  // C15 דו-קומה: גיבור רחב למעלה, שורה של שלושה מתחת (בטלפון נערמים מתחת לגיבור)
  satellites: (t) => `<h2 class="ttl">${t}</h2><div class="card" style="min-height:150px">${tx("m", "l", "l", "s")}</div><div class="g3" style="margin-top:14px">${`<div class="card">${tx("m", "l")}</div>`.repeat(3)}</div>`,
  filters: `<div class="chips"><i></i><i></i><i></i><i></i><i></i></div>`,
  products: (t) => `<h2 class="ttl">${t}</h2><div class="g4">${`<div class="card"><div class="ph" style="min-height:120px">מוצר</div>${tx("m", "s")}</div>`.repeat(4)}</div>`,
  // C5: קטגוריה מובילה גדולה ושתיים לצדה; בטלפון גלילה אופקית עם peek
  cats: `<h2 class="ttl">קטגוריות</h2><div class="cats3"><div class="ph tall">קטגוריה מובילה</div><div class="ph">קטגוריה</div><div class="ph">קטגוריה</div></div>`,
  banner: `<div class="split ovl"><div class="ph tall">קולקציה</div><div><h2 class="ttl">כותרת קולקציה</h2>${tx("l", "m")}<div class="btns"><span class="btn">לצפייה</span></div></div></div>`,
  product: `<div class="split" style="align-items:start"><div><div class="ph tall">תמונה ראשית</div><div class="g4 thumbs" style="margin-top:10px">${`<div class="ph" style="min-height:60px"></div>`.repeat(4)}</div></div><div class="buy"><span class="eyebrow">קטגוריה</span><h1 class="ttl">שם המוצר</h1><b class="amt">₪249</b>${tx("l", "m")}<div class="chips" style="justify-content:flex-start;margin:8px 0"><i></i><i></i><i></i></div><span class="btn">הוספה לסל</span></div></div>`,
  specs: `<h2 class="ttl">פרטים ומפרט</h2><div class="g2"><div>${tx("l", "l", "m", "l")}</div><div class="card">${tx("m", "m", "m", "m")}</div></div>`,
  spine: `<div class="spine">${[1, 2, 3].map(n => `<div class="chap"><h2 class="ttl">פרק ${n}</h2>${tx("l", "l", "m")}</div>`).join("")}</div>`,
  team: `<h2 class="ttl">הצוות</h2><div class="g4">${`<div class="c"><div class="ph" style="width:100%;min-height:120px">תמונה</div>${tx("m", "s")}</div>`.repeat(4)}</div>`,
  next: `<h2 class="ttl">מה קורה עכשיו</h2><div class="steps n3">${[1, 2, 3].map(n => `<div class="step"><b>${n}</b>${tx("m", "l")}</div>`).join("")}</div>`,
  syllabus: `<h2 class="ttl">הסילבוס</h2><div class="spine">${[1, 2, 3, 4].map(n => `<div class="chap"><b style="font-size:14px">מפגש ${n}</b>${tx("l", "m")}</div>`).join("")}</div>`,
  instructor: `<div class="split"><div class="ph tall">המרצה</div><div><span class="eyebrow">מי מלמד</span><h2 class="ttl">שם המרצה</h2>${tx("l", "l", "m")}</div></div>`,
  plate: `<div class="c"><div class="price hi" style="width:min(100%,420px)"><span class="eyebrow" style="color:#b9b6ff">מחיר ההשקה</span><b class="amt">₪297</b>${tx("m", "m", "m")}<span class="btn">להרשמה</span></div></div>`,
  // C14: ראש המאמר ממורכז, והגוף שמתחתיו מיושר
  artHead: `<div class="art c"><span class="eyebrow">קטגוריה · 6 דקות קריאה</span><h1 class="ttl h1">כותרת המאמר</h1>${tx("m")}</div>`,
  artBody: `<div class="art"><div class="ph tall" style="margin-bottom:18px">תמונה ראשית</div>${tx("l", "l", "l", "m")}<h2 class="ttl">כותרת ביניים</h2>${tx("l", "l", "m")}<div class="pull">ציטוט מושך מתוך הטקסט</div>${tx("l", "l", "l", "s")}</div>`,
  related: `<h2 class="ttl">עוד מאמרים</h2><div class="g3">${`<div class="card"><div class="ph" style="min-height:90px"></div>${tx("m", "s")}</div>`.repeat(3)}</div>`,
  problem: `<div class="c"><h2 class="ttl">הבעיה שכולם מכירים</h2>${tx("l", "m")}</div>`,
  who: (t) => `<h2 class="ttl">${t}</h2><div class="g3">${`<div class="card">${tx("m", "l")}</div>`.repeat(3)}</div>`,
  compare: `<div class="c"><h2 class="ttl">מה ההבדל בין החבילות</h2>${tx("l", "m")}</div>`,
};

const sec = (s, i) => {
  const code = (s.comp || "").split(" ")[0];
  return `<section class="as${s.cls ? " " + s.cls : ""}"${/^C\d+$/.test(code) ? ` data-comp="${code}"` : ""}><span class="tagc">${i + 1} · ${s.role}${s.comp ? " · " + s.comp : ""}</span>${s.html}</section>`;
};
const doc = ({ hd, ...o }) => ({
  cat: "arch", area: "doctrine", status: "מאושר", runway: false, tech: "ארכיטיפ עמוד · שלד",
  ...o,
  css: AR_BASE + (o.css ? "\n" + o.css : ""),
  html: `<div class="cwrap"><div class="arch">${hd || K.hd}${o.sections.map(sec).join("")}${K.ft}</div></div>`,
});
const S = (role, comp, html, why, cls) => ({ role, comp, html, why, cls });

export default [
doc({
  id: "ar01", name: "דף נחיתה ממומן", rhythm: "P2 קרשנדו", fit: ["L"],
  desc: "עמוד אחד, מטרה אחת: ליד. נבנה כקרשנדו, מהצהרה אוורירית דרך הוכחות אל סגירה צפופה.",
  when: "יעד של מודעות מטא או גוגל. הקורא הגיע מהבטחה ספציפית וצריך לראות אותה מיד.",
  mobile: "ההדר נשאר לוגו וכפתור אחד, בלי המבורגר (בדף נחיתה אין לאן ללכת). CTA דביק בתחתית המסך אחרי ההירו.",
  note: "בלי תפריט ניווט אמיתי, בלי קישורים החוצה, בלי סקשן אודות ארוך. כל מה שלא מקדם את הליד יורד.",
  hd: K.hdMin,
  sections: [
    S("הירו", "C9", K.heroSplit, "ההבטחה מהמודעה, מילה במילה, ופעולה אחת."),
    S("הוכחה מהירה", "C10 פס", K.logos, "לוגואים או מספרים לפני שהקורא מספיק לפקפק.", "tint"),
    S("הבעיה", "C14", K.problem, "משפט אחד שהקורא מהנהן אליו."),
    S("הפתרון", "C3 זיגזג", K.zz("מה מקבלים"), "שני-שלושה יתרונות עם ויז'ואל, לא רשימה."),
    S("איך זה עובד", "C6", K.steps("ארבעה שלבים"), "תהליך קצר שמוריד חשש.", "tint"),
    S("עדויות", "C13", K.quotes(), "הוכחה חברתית ליד המחיר."),
    S("מחירים", "C4", K.pricing(), "שלוש חבילות, האמצעית מודגשת."),
    S("שאלות", "C11", K.faq, "ההתנגדויות האחרונות: כותרת דביקה בצד והשאלות לצדה.", "tint"),
    S("סגירה + טופס", "C9", K.form(), "הסקשן הצפוף ביותר בעמוד, כמו שהקרשנדו דורש.", "dark"),
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
    S("עבודות", "C13", K.gal("עבודות נבחרות", true), "שש דוגמאות, לא יותר.", "tint"),
    S("עדויות", "C10 פס", K.quote1("ציטוט אחד חזק מלקוח", 28), "ציטוט אחד חזק ברצועה צרה, עם שם ותפקיד. זו הנשימה ש-P1 צריך."),
    S("יצירת קשר", "C9", K.form(), "טופס קצר וטלפון גלוי.", "dark"),
  ],
}),
doc({
  id: "ar03", name: "עמוד בית לאתר תדמית", rhythm: "P3 נשימות", fit: ["S"],
  desc: "עמוד הבית של אתר רב-עמודי: מציג את הרוחב, לא את העומק. כל סקשן פותח דלת לעמוד פנימי.",
  when: "פירמה, משרד, חברה עם כמה שירותים ועמודים פנימיים.",
  mobile: "סקשני הנשימה נשארים (הם היוקרה). בבנטו תא הגיבור ברוחב מלא ואז שתי עמודות.",
  note: "האודות כאן עריכתי וקצר, כי יש לו עמוד משלו. הטעות הנפוצה: לדחוס את כל האתר לעמוד הבית.",
  sections: [
    S("הירו", "C9", K.heroSplit, "מי אנחנו בשבע מילים ותמונת מותג."),
    S("נשימה", "C14", K.statement(), "משפט אחד, הרבה אוויר. פרימיום.", "tint"),
    S("שירותים", "C5 בנטו", K.bento("תחומי הפעילות"), "שירות מוביל אחד גדול ולוויינים."),
    S("אודות", "C8 עריכתי", K.editorial, "כותרת מול טקסט, קצר, עם קישור לעמוד המלא."),
    S("עבודות", "C13", K.gal("פרויקטים", true), "מזונרי, כי הפרויקטים לא באותו גודל.", "tint"),
    S("לקוחות", "C10 פס", K.logos, "שורת לוגואים כהוכחה שקטה."),
    S("נשימה", "C14", K.quote1("משפט אחד מלקוח, עם הרבה אוויר"), "עדות אחת, משפט אחד, הרבה אוויר.", "tint"),
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
    S("הירו קטן", "C1", K.heroSmall(), "שם השירות ומשפט. קטן בגובה ולא בעוצמה: כותרת גדולה ופעולה אחת, כדי שקצה הסנדוויץ' יישאר חזק."),
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
  note: "טבלאות בערימה ולא בטאבים, כי במובייל טאבים מסתירים שני שלישים מהמחירים. הטופס יודע איזו חבילה נבחרה. שני לוחות C4 ברצף הם חריג מכוון לחוק הגיוון: כאן הזהות היא המידע, כי הקורא משווה שורה מול שורה.",
  sections: [
    S("הירו", "C14", K.heroCenter, "ההבטחה: המחירים כאן, בלי שיחה."),
    S("מוצר א'", "C4", K.pricing("וואן-פייג'ר"), "שלוש חבילות, האמצעית מודגשת.", "tint"),
    S("מוצר ב'", "C4", K.pricing("אתר תדמית"), "אותו מבנה בדיוק, כדי שההשוואה תהיה קלה."),
    S("מה ההבדל", "C14", K.compare, "משפט שעוזר לבחור, ממורכז.", "tint"),
    S("שאלות", "C11", K.faq, "מע\"מ, תשלומים, מה לא כלול."),
    S("טופס", "C9", K.form(), "שם וטלפון, עם צ'יפ של החבילה שנבחרה.", "dark"),
  ],
}),
doc({
  id: "ar06", name: "אודות כסיפור", rhythm: "P4 סיפור-גלילה", fit: ["S"],
  desc: "עמוד אודות שמספר סיפור בפרקים לאורך עמוד שדרה, במקום פסקה ותמונה.",
  when: "עסק עם סיפור אמיתי: מייסד, מפנה, דרך. בלי סיפור זה C6 ארוך.",
  mobile: "עמוד השדרה עובר לצד הימני, הפרקים נערמים.",
  note: "הפתיחה במילה ענקית (C7) קובעת את הטון. הצוות בא אחרון לפני הסגירה, והסגירה רכה ולא מכירתית: אודות נגמר באנשים ובהזמנה לדבר.",
  sections: [
    S("פתיחה", "C7 מילה ענקית", K.heroWord, "מילה אחת שמסכמת את הסיפור."),
    S("פרקים", "C6 עמוד שדרה", K.spine, "שלושה פרקים על קו אחד.", "tint"),
    S("מפנה", "C14", K.statement("המשפט שבו הכל השתנה"), "המשפט שמסביר למה זה חשוב."),
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
    S("הירו קטן", "C1", K.heroSmall("סטודיו", "משפט אחד על הגישה", "לפרויקטים", "עבודה נבחרת"), "משפט על הגישה, לא רשימת שירותים."),
    S("סינון", "C10", K.filters, "צ'יפים לפי סוג עבודה.", "tint"),
    S("גלריה", "C13 מזונרי", K.gal("עבודות", true), "גבהים שונים, כי העבודות שונות."),
    S("מקרה בוחן", "C15", K.satellites("פרויקט נבחר"), "עבודה אחת עם סיפור ותוצאות.", "tint"),
    S("נשימה", "C14", K.quote1("מה שלקוח אמר אחרי הפרויקט"), "עדות אחת, עם אוויר."),
    S("סגירה", "CTA", K.cta("יש לכם פרויקט?"), "הזמנה לשיחה.", "dark"),
  ],
}),
doc({
  id: "ar08", name: "עמוד בית לחנות", rhythm: "P1 מדורג קלאסי", fit: ["S"],
  desc: "חנות: מבצע גיבור, קטגוריות, מוצרים נבחרים, למה לקנות כאן, קולקציה, ביקורות, ניוזלטר.",
  when: "חנות איקומרס (Lovable + Shopify). עמוד הבית הוא חלון ראווה, לא קטלוג.",
  mobile: "המוצרים לשתי עמודות (לא אחת, מוצרים סורקים). הקטגוריות לגלילה אופקית.",
  note: "ערכי המותג (C10) יושבים אחרי המוצרים ולא לפניהם: בחנות קודם רואים סחורה.",
  hd: K.hdShop,
  sections: [
    S("הירו מבצע", "C9", K.heroPromo, "מוצר גיבור והנעה לקנייה."),
    S("קטגוריות", "C5 בנטו", K.cats, "קטגוריה מובילה גדולה ושתיים לצדה. בטלפון גלילה אופקית עם peek.", "tint"),
    S("מוצרים נבחרים", "C4 גריד", K.products("הנמכרים ביותר"), "ארבעה מוצרים, מחיר גלוי."),
    S("למה כאן", "C10 פס", K.stats, "משלוח, החזרה, אחריות, בשורה אחת.", "tint"),
    S("קולקציה", "C2 חפיפה", K.banner, "באנר עם תמונה גדולה וטקסט."),
    S("ביקורות", "C13", K.quotes("לקוחות מספרים"), "הוכחה חברתית עם כוכבים.", "tint"),
    S("ניוזלטר", "C9", K.form(1), "אימייל אחד, הטבה אחת.", "dark"),
  ],
}),
doc({
  id: "ar09", name: "עמוד מוצר", rhythm: "P5 סנדוויץ'", fit: ["S"],
  desc: "גלריה מול קופסת קנייה, ואז פרטים, מפרט, מוצרים דומים וביקורות. הכל משרת את כפתור ההוספה לסל.",
  when: "כל מוצר בחנות.",
  mobile: "הגלריה מעל, קופסת הקנייה מתחת, וכפתור הוספה לסל דביק בתחתית.",
  note: "קופסת הקנייה נשארת בגובה העין (sticky בדסקטופ). הביקורות בסוף כי הן ארוכות, אבל הדירוג מופיע כבר בקופסה.",
  hd: K.hdShop,
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
  note: "בלי תפריט שמפזר, בלי מוצרים נוספים. שלושה שלבים של \"מה עכשיו\" מורידים חרדה ומקטינים טלפונים מיותרים. אין כאן סוגר CTA בכוונה, וזה החריג היחיד ל-A6: הפעולה היחידה היא הוואטסאפ שבראש העמוד.",
  hd: `<header class="hd"><b>שם העסק</b></header>`,
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
    S("לוח מחיר", "C14", K.plate, "לוח אחד, כהה, ממורכז, בלי שום דבר מתחרה.", "tint"),
    S("שאלות", "C11", K.faq, "הקלטות, החזר, זמן."),
    S("סגירה", "CTA", K.ctaDense, "הכי צפוף בעמוד.", "dark"),
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
