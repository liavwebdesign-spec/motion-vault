// מסגרת ותשתית: חמש מסגרות העמוד של המנוע, כל אחת עם עמוד הדגמה ושכבת "הצג מסגרת".
// התורה של כל מסגרת יושבת בסקיל design-dna תחת references/engine/*.md, וההכרעה ביניהן ב-SKILL שלב 1א.
const HUD = `.mvhud{position:fixed;bottom:16px;inset-inline-start:16px;z-index:99;display:flex;gap:10px;align-items:center;background:var(--ink);color:var(--bg);font-size:13px;padding:8px 10px 8px 14px;border-radius:8px;opacity:.94}
.mvhud button{background:var(--accent);color:var(--accent-ink);border:0;border-radius:6px;padding:6px 10px;font:inherit;font-size:13px;cursor:pointer}`;

export default [
{
  id:"editorial", cat:"misc", name:"המסגרת העריכתית (ברירת המחדל)", tech:"CSS · קונטיינר 1200 + סולם רוחבים", status:"ממתין",
  desc:"קונטיינר אחד של 1200, סולם רוחבים צרים שכל בלוק מתכנס אליו לפי תפקידו (1000, 760, 640, 460), וגרידים ייעודיים ברשימה סגורה. אין 12 עמודות, וזו הדוקטרינה. לחץ \"הצג מסגרת\" כדי לראות את הסולם על העמוד.",
  when:"ברירת המחדל: המרה, דפי נחיתה, שירותים, חנויות, מערכות. כל מה שהקורא בא אליו כדי לפעול. התורה: engine/grid.md.",
  note:"הסולם הוא הגריד האנכי האמיתי של העמוד: יורדים בו ככל שהתוכן מילולי יותר. מפת הקריסה קבועה: כרטיסים 3 ← 2 ← 1, split נערם עם הטקסט ראשון, מחירון הופך לקרוסלה. ה-HUD מציג את רוחב הקונטיינר בפועל ומספר עמודות הכרטיסים.",
  css:`${HUD}
.ed-wrap{max-width:1200px;margin-inline:auto;padding-inline:24px}
.ed [data-w]{position:relative;margin-inline:auto}
.ed.frame [data-w]{outline:1px dashed var(--accent);outline-offset:4px}
.ed.frame [data-w]::before{content:attr(data-w);position:absolute;top:-22px;inset-inline-start:0;font-size:11px;color:var(--accent);letter-spacing:.08em;background:var(--bg);padding:0 6px;white-space:nowrap}
.ed-hero{text-align:center;padding-block:clamp(48px,6vw,96px) 40px}
.ed-hero h2{font-size:var(--fs-h2);margin:0 auto 16px;max-width:760px;line-height:1.15}
.ed-hero p{color:var(--muted);max-width:640px;margin:0 auto 32px;line-height:1.7}
.ed-visual{max-width:1000px;aspect-ratio:16/7;margin-inline:auto;font-size:20px}
.ed-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding-block:64px 0}
.ed-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:28px}
.ed-card h3{margin:0 0 8px;font-size:20px}
.ed-card p{margin:0;color:var(--muted);font-size:15px;line-height:1.6}
.ed-split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding-block:64px}
.ed-split .txt{max-width:460px}
.ed-split h3{font-size:var(--fs-h2);margin:0 0 12px;line-height:1.2}
.ed-split p{color:var(--muted);margin:0;line-height:1.7}
.ed-split .ph{aspect-ratio:4/3;font-size:18px}
@media(max-width:1023px){.ed-cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.ed-cards{grid-template-columns:1fr;gap:20px}.ed-split{grid-template-columns:1fr;gap:20px}.ed-split .ph{order:2}.ed.frame [data-w]::before{font-size:10px}}`,
  html:`<div class="mvhud"><span id="edhud"></span><button id="edtg" type="button">הסתר מסגרת</button></div>
<div class="ed frame"><div class="ed-wrap">
  <div class="ed-hero">
    <h2 data-w="760 · ראש סקשן">כל בלוק מתכנס לרוחב מהסולם, אף פעם לא לרוחב שהומצא</h2>
    <p data-w="640 · measure, טקסט רץ">הכותרת רחבה מהליד שלה, הליד רחב מהמיקרו. זה המשפך שיוצר את התחושה העריכתית, בלי גריד של 12 עמודות.</p>
    <div class="ed-visual ph ph-a" data-w="1000 · ויז'ואל הירו">1000</div>
  </div>
  <div class="ed-cards" data-w="1200 · Cards-3 · gap 24 · קורס 3 ← 2 ← 1">
    <article class="ed-card"><h3>שכבה 1</h3><p>קונטיינר אחד של 1200 עם ריפוד 24. ההדר, הפוטר וכל סקשן חיים בתוכו.</p></article>
    <article class="ed-card"><h3>שכבה 2</h3><p>סולם רוחבים צרים: 1000, 980, 820, 760, 720, 640, 560, 460. בוחרים, לא ממציאים.</p></article>
    <article class="ed-card"><h3>שכבה 3</h3><p>שבעה גרידים ייעודיים ברשימה סגורה, כל אחד עם gap ו-align קבועים ומפת קריסה משלו.</p></article>
  </div>
  <div class="ed-split" data-w="1200 · Split · gap 56 · במובייל טקסט ראשון">
    <div class="txt" data-w="460 · טקסט בתא"><h3>תוכן צר מהתא שלו</h3><p>הגריד נותן את המבנה, הסולם נותן את הנשימה. בתוך תא של split הטקסט מוגבל ל-460, לא ממלאים תא עד הקצה.</p></div>
    <div class="ph ph-c">ויז'ואל</div>
  </div>
</div></div>`,
  js:`const ed=document.querySelector(".ed"),hud=document.getElementById("edhud"),tg=document.getElementById("edtg"),cards=document.querySelector(".ed-cards");
tg.addEventListener("click",()=>{ed.classList.toggle("frame");tg.textContent=ed.classList.contains("frame")?"הסתר מסגרת":"הצג מסגרת";});
function upd(){const cols=getComputedStyle(cards).gridTemplateColumns.split(" ").length;
  hud.textContent="רוחב: "+innerWidth+"px · קונטיינר: "+Math.min(1200,innerWidth-48)+"px · כרטיסים: "+cols+(cols===1?" עמודה":" עמודות");}
addEventListener("resize",upd);upd();`,
  runway:false
},
{
  id:"fluid", cat:"misc", name:"המסגרת הנוזלית (Fluid Frame)", tech:"CSS clamp + vw", status:"מאושר",
  desc:"העמוד נושם עם רוחב המסך: כותרות, מרזבים וריווחים גדלים וקטנים יחד, תחומים ב-clamp. גרור את חלון הדפדפן וצפה ב-HUD.",
  when:"אתרי חוויה, תדמית-וואו וויז'ואל-גדול. עמוד ההדגמה המלא של מצב המסגרת מהמנוע.",
  css:`.fl-hero{min-height:70vh;display:flex;flex-direction:column;justify-content:center}
.fl-hero h2{font-size:clamp(44px,5vw + .5rem,118px);line-height:1.05;max-width:14ch;margin:0}
.fl-hero p{font-size:clamp(19px,1vw + .55rem,30px);color:var(--muted);max-width:640px}
.fl-split{display:grid;grid-template-columns:65% 35%;gap:clamp(20px,2vw,48px);align-items:center;background:var(--card);padding:clamp(64px,7vw,150px) var(--gutter)}
.fl-split .txt{padding-inline-end:20%}
.fl-split h3{font-size:clamp(26px,2vw + .4rem,52px);margin:0 0 14px}
.fl-split p{color:var(--muted);max-width:640px}
.fl-visual{aspect-ratio:4/5;border-radius:clamp(12px,1vw,24px);font-size:clamp(18px,1.4vw,30px)}
.fl-breath{padding-block:clamp(120px,18vw,320px);text-align:center;background:var(--ink);color:var(--bg)}
.fl-breath h3{font-size:clamp(26px,2.2vw,54px);font-weight:100;max-width:26ch;margin-inline:auto}
.fl-breath b{font-weight:800}
.hud{position:fixed;bottom:16px;inset-inline-start:16px;z-index:99;background:var(--ink);color:var(--bg);font-size:13px;padding:8px 14px;border-radius:8px;opacity:.92}
@media(max-width:767px){.fl-split{grid-template-columns:1fr}.fl-split .txt{padding-inline-end:0}}`,
  html:`<div class="hud" id="hud"></div>
<div class="fl-hero" style="padding-inline:var(--gutter)">
  <h2>העמוד הזה נושם עם המסך שלך</h2>
  <p>גרור את חלון הדפדפן. הכל משתנה יחד, בלי אף מדרגה, והטקסט הרץ נשאר תחום וקריא.</p>
</div>
<div class="fl-split">
  <div class="txt"><h3>עמודה באחוזים, טקסט תחום</h3><p>העמודה תופסת 65% מהמסך אבל שומרת 20% אוויר בצד הסגירה. אסימטריה שגדלה עם המסך בלי ששורות מתארכות לאינסוף.</p></div>
  <div class="fl-visual ph ph-b">35%</div>
</div>
<div class="fl-breath"><h3>סקשן נשימה של 18vw: <b>הלוקסוס של המסך הגדול</b>, בלי לאבד את הלפטופ</h3></div>`,
  js:`const hud=document.getElementById("hud");
function upd(){
  const h=getComputedStyle(document.querySelector(".fl-hero h2")).fontSize;
  hud.textContent="רוחב: "+innerWidth+"px · כותרת: "+parseFloat(h).toFixed(0)+"px";
}
addEventListener("resize",upd);upd();`,
  runway:false
},
{
  id:"breakout", cat:"misc", name:"מסגרת הפריצה (Breakout Frame)", tech:"CSS Grid · קווים נקובים", status:"ממתין",
  desc:"גריד אחד לכל עמוד הקריאה עם ארבע דרגות רוחב בשמות: content (640), popout (760), feature (1000), full. כל ילד רק אומר לאיזו דרגה הוא שייך, בלי דיבים עוטפים. במובייל הפריצות נסגרות מעצמן.",
  when:"תוכן ארוך: מאמרים, מדריכים, בלוג, שיעורי קורס, עמודי מדיניות, עמוד שירות שמסביר. התורה: engine/breakout-frame.md.",
  note:"ארבע הדרגות ממופות לסולם הרוחבים של המסגרת העריכתית ולא לערכים חדשים. רצועה מלאה שמכילה טקסט מפעילה את הגריד מחדש בתוכה (מחלקת frame גם עליה), ולכן הטקסט שלה חוזר לעמודת ה-content של העמוד: הרקע פורץ, הטקסט לא. קווי הגריד לוגיים ולכן RTL עובד בלי לגעת. ה-HUD מודד את רוחב עמודת הקריאה בפועל ומראה מתי הפריצות נסגרו.",
  css:`${HUD}
.bo{--g:clamp(24px,4vw,64px);--content:640px;--popout:60px;--feature:180px;display:grid;
  grid-template-columns:[full-start] minmax(var(--g),1fr) [feature-start] minmax(0,var(--feature)) [popout-start] minmax(0,var(--popout)) [content-start] min(var(--content),100% - var(--g) * 2) [content-end] minmax(0,var(--popout)) [popout-end] minmax(0,var(--feature)) [feature-end] minmax(var(--g),1fr) [full-end];
  row-gap:24px;padding-block:clamp(40px,6vw,96px)}
.bo>*{grid-column:content;margin:0;position:relative}
.bo>.popout{grid-column:popout}
.bo>.feature{grid-column:feature}
.bo>.full{grid-column:full}
.bo.frame>*{outline:1px dashed color-mix(in srgb,var(--accent) 60%,transparent);outline-offset:4px}
.bo.frame>[data-col]::after{content:attr(data-col);position:absolute;top:-16px;inset-inline-end:0;font-size:11px;color:var(--accent);background:var(--bg);padding:0 6px;letter-spacing:.08em;white-space:nowrap}
.bo h2{font-size:var(--fs-h2);line-height:1.15;margin-top:40px}
.bo h3{font-size:20px;line-height:1.35;margin-top:16px}
.bo p{line-height:1.75}
.bo .lead{color:var(--muted);font-size:19px}
.bo blockquote{border-inline-start:3px solid var(--accent);padding:14px 22px;font-size:22px;font-weight:600;line-height:1.4;background:var(--card);border-radius:var(--r);margin-block:16px}
.bo figure{margin-block:24px}
.bo figure .ph{aspect-ratio:16/8;font-size:18px}
.bo figcaption{font-size:13px;color:var(--muted);margin-top:8px}
.bo .band{background:var(--ink);color:var(--bg);padding-block:clamp(40px,6vw,80px);margin-block:24px;row-gap:12px}
.bo .band h3{margin:0;font-size:26px;line-height:1.25}
.bo .band p{color:color-mix(in srgb,var(--bg) 78%,transparent);margin:0}
.bo .band .gbtn{justify-self:start;margin-top:8px}
@media(max-width:767px){.bo{--popout:0px;--feature:0px}.bo blockquote{font-size:19px}}`,
  html:`<div class="mvhud"><span id="bohud"></span><button id="botg" type="button">הסתר מסגרת</button></div>
<article class="bo frame">
  <h2 class="popout" data-col="popout · 760" style="margin-top:0">למה עמוד שמסביר צריך מסגרת אחרת מעמוד שמוכר</h2>
  <p class="lead" data-col="content · 640">דף נחיתה הוא משפך. מאמר הוא שיחה. כשמנסים לבנות את השני עם הכלים של הראשון, מקבלים פסקאות שצפות בין סקשנים ריקים.</p>
  <p data-col="content · 640">בעמוד קריאה יש עמודה אחת, וכל מה שהקורא צריך נמצא בה. הפריצה החוצה היא אירוע: תמונה שצריכה מקום, ציטוט שצריך משקל, רצועה שמסמנת פרק חדש. השאר נשאר בעמודה, ברוחב שנוח לעין.</p>
  <blockquote class="popout" data-col="popout · 760">הקורא לא מרגיש את הגריד. הוא מרגיש שהעמוד יודע איפה הוא.</blockquote>
  <p>שלוש דרגות הפריצה ממופות לסולם הרוחבים שכבר קיים במנוע. content הוא ה-measure, popout הוא ראש סקשן, feature הוא ויז'ואל הירו. אין דרגה חמישית, ואם משהו צריך 880 הוא feature.</p>
  <figure class="feature" data-col="feature · 1000"><div class="ph ph-c">תמונה, טבלה או וידאו: תמיד feature</div><figcaption>מדיה ברוחב 640 בתוך עמוד קריאה נראית כמו תמונה במייל. לכן היא תמיד פורצת.</figcaption></figure>
  <h3>הרצועה המלאה מפעילה את הגריד מחדש</h3>
  <p>הרקע שלה פורץ עד הקצה, אבל הכותרת והפסקה בתוכה חוזרות להתיישר לעמודת הקריאה של העמוד. ככה יש לעמוד קו אנכי אחד לאורך כל הדרך, גם כשהצבע מתחלף.</p>
  <div class="full band bo frame" data-col="full">
    <h3>רוצים שהמדריכים שלכם ייקראו עד הסוף?</h3>
    <p>אותה מסגרת, אותו קו, רק הרקע השתנה. הטקסט הזה יושב בדיוק מתחת לפסקה שמעל הרצועה.</p>
    <a class="gbtn" href="#">לשיחה קצרה</a>
  </div>
  <p data-col="content · 640">במובייל שתי דרגות הפריצה מתאפסות ל-0 בלי שכותבים כלום: הכותרות, הציטוטים והתמונות מתיישרים לקצה הטקסט, והרצועה נשארת מלאה. אין גלילה אופקית, אין מדרגת טאבלט.</p>
</article>`,
  js:`const hud=document.getElementById("bohud"),tg=document.getElementById("botg");
tg.addEventListener("click",()=>{const on=!document.querySelector(".bo").classList.contains("frame");document.querySelectorAll(".bo").forEach(b=>b.classList.toggle("frame",on));tg.textContent=on?"הסתר מסגרת":"הצג מסגרת";});
function upd(){const c=document.querySelector(".bo > p.lead").getBoundingClientRect().width,p=document.querySelector(".bo > blockquote").getBoundingClientRect().width;
  hud.textContent="רוחב: "+innerWidth+"px · content: "+Math.round(c)+"px · popout: "+Math.round(p)+"px"+(Math.round(p-c)<2?" (הפריצות סגורות)":"");}
addEventListener("resize",upd);upd();`,
  runway:false
},
{
  id:"bento", cat:"misc", name:"מסגרת הבנטו (Bento Frame)", tech:"CSS Grid · לוחות של אריחים", status:"ממתין",
  desc:"העמוד בנוי מלוחות של אריחים בארבעה גדלים סגורים (1×1, 2×1, 1×2, 2×2), בתוך הקונטיינר העריכתי, עם יחידת תא אחת ומרזב אחד. גיבור אחד לכל לוח, הלוח תמיד נסגר, וכל אריח עושה דבר אחד. במובייל שתי עמודות ומפת span שנכתבת מחדש.",
  when:"עמודי מוצר ו-SaaS, סקירת יכולות, \"למה אנחנו\", תיק עבודות מסכם, עמוד אפליקציה. כשהקורא סורק ולא קורא. התורה: engine/bento-frame.md.",
  note:"ההבדל מקומפוזיציה C5: שם זה סקשן אחד בעמוד עריכתי, כאן זו שפת העמוד כולו, וכל הלוחות חולקים יחידה, מרזב ורדיוס. שכנים לעולם לא מאותו סוג, ink אחד ו-accent אחד לכל היותר בלוח, ואריח תמונה הוא התמונה עצמה עם תווית על שכבת דיו. הלוח הראשון סוגר 12 תאים, השני 4.",
  css:`${HUD}
.bn{max-width:1200px;margin-inline:auto;padding:clamp(40px,6vw,96px) 24px;display:grid;gap:clamp(48px,7vw,96px)}
.bn-board{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:clamp(150px,17vw,220px);gap:20px}
.bn-t{position:relative;border-radius:var(--r);background:var(--card);border:1px solid var(--line);padding:24px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;min-width:0}
.bn-t.w2{grid-column:span 2}
.bn-t.h2{grid-row:span 2}
.bn-t.img{padding:0;border:0;justify-content:flex-end}
.bn-t.img .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.bn-t.img span{position:relative;align-self:flex-start;margin:18px;color:var(--bg);background:color-mix(in srgb,var(--ink) 70%,transparent);padding:6px 12px;border-radius:999px;font-size:13px}
.bn-t.ink{background:var(--ink);color:var(--bg);border:0}
.bn-t.acc{background:var(--accent);color:var(--accent-ink);border:0}
.bn-k{font-size:12px;letter-spacing:.12em;opacity:.7}
.bn-t h3{margin:0;font-size:clamp(18px,1.6vw,24px);line-height:1.25}
.bn-t.acc h3{font-size:clamp(24px,2.4vw,36px)}
.bn-t p{margin:6px 0 0;font-size:14px;line-height:1.55;opacity:.82}
.bn-num{font-size:clamp(40px,5vw,72px);font-weight:600;letter-spacing:-.02em;line-height:1}
.bn-t .gbtn{align-self:flex-start;margin-top:14px}
.bn-t.acc .gbtn{background:var(--accent-ink);color:var(--accent)}
.bn-t ul{margin:0;padding:0;list-style:none;display:grid;gap:8px;font-size:14px}
.bn-t li::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent);margin-inline-end:8px;vertical-align:middle}
.bn-breath{text-align:center;max-width:640px;margin-inline:auto;font-size:var(--fs-h2);line-height:1.25;font-weight:300}
.bn.frame .bn-board{outline:1px dashed var(--accent);outline-offset:8px}
.bn.frame .bn-t::after{content:attr(data-s);position:absolute;top:8px;inset-inline-end:10px;font-size:11px;color:var(--accent);background:var(--bg);padding:1px 6px;border-radius:4px;letter-spacing:.08em}
@media(max-width:767px){.bn-board{grid-template-columns:repeat(2,1fr);grid-auto-rows:auto;grid-auto-flow:dense}.bn-t{min-height:150px}.bn-t.h2{grid-row:auto}.bn-t.w2.h2{grid-column:span 2;min-height:230px}.bn-t.img{min-height:180px}}`,
  html:`<div class="mvhud"><span id="bnhud"></span><button id="bntg" type="button">הסתר מסגרת</button></div>
<div class="bn frame">
  <div class="bn-board">
    <div class="bn-t acc w2 h2" data-s="2×2 · גיבור"><span class="bn-k">המערכת שלנו</span><div><h3>כל הלקוחות, כל ההצעות, כל הגבייה. מסך אחד.</h3><p>נבנה לעסקים ישראליים, בעברית, מהיום הראשון.</p><a class="gbtn" href="#">להתחיל בחינם</a></div></div>
    <div class="bn-t img h2" data-s="1×2 · תמונה"><div class="ph ph-c"></div><span>הממשק בפועל</span></div>
    <div class="bn-t" data-s="1×1 · מספר"><span class="bn-k">לקוחות פעילים</span><div><div class="bn-num">1,240</div><p>מאז 2023</p></div></div>
    <div class="bn-t ink" data-s="1×1 · הצהרה"><span class="bn-k">הבטחה</span><h3>אפס גיליונות אקסל</h3></div>
    <div class="bn-t w2" data-s="2×1 · רשימה"><span class="bn-k">מה כלול</span><ul><li>לידים מכל המקורות במקום אחד</li><li>הצעות מחיר שנחתמות בקליק</li><li>גבייה עם תזכורות אוטומטיות</li></ul></div>
    <div class="bn-t" data-s="1×1 · מספר"><span class="bn-k">זמן הקמה</span><div><div class="bn-num">14</div><p>ימים, כולל הדרכה</p></div></div>
    <div class="bn-t" data-s="1×1 · CTA סוגר"><span class="bn-k">רוצים לראות?</span><div><h3>הדגמה של 20 דקות</h3><a class="gbtn" href="#">לתאם</a></div></div>
  </div>
  <p class="bn-breath">בין שני לוחות תמיד סקשן נשימה. בנטו מתמיד מעייף בדיוק כמו מרקי מתמיד.</p>
  <div class="bn-board">
    <div class="bn-t w2" data-s="2×1 · ציטוט"><span class="bn-k">לקוחה</span><div><h3>"הפעם הראשונה שאני יודעת בכל רגע מי חייב לי כסף."</h3><p>מיכל אדר, סטודיו לעיצוב פנים</p></div></div>
    <div class="bn-t" data-s="1×1 · מספר"><span class="bn-k">שביעות רצון</span><div><div class="bn-num">96%</div><p>ממליצים לחברים</p></div></div>
    <div class="bn-t img" data-s="1×1 · תמונה"><div class="ph ph-e"></div><span>הצוות</span></div>
  </div>
</div>`,
  js:`const bn=document.querySelector(".bn"),hud=document.getElementById("bnhud"),tg=document.getElementById("bntg"),board=document.querySelector(".bn-board");
tg.addEventListener("click",()=>{bn.classList.toggle("frame");tg.textContent=bn.classList.contains("frame")?"הסתר מסגרת":"הצג מסגרת";});
function upd(){const cols=getComputedStyle(board).gridTemplateColumns.split(" ").length,u=board.querySelector(".bn-t:not(.w2):not(.h2)").getBoundingClientRect().height;
  hud.textContent="רוחב: "+innerWidth+"px · לוח: "+cols+" עמודות · יחידת תא: "+Math.round(u)+"px";}
addEventListener("resize",upd);upd();`,
  runway:false
},
{
  id:"modular", cat:"misc", name:"המסגרת המודולרית השוויצרית (Modular Frame)", tech:"CSS Grid · 12 עמודות · baseline 8", status:"ממתין",
  desc:"12 עמודות ו-baseline של 8 פיקסלים, שש הנחות קנוניות ברשימה סגורה, הכל מיושר לצד ההתחלה, קווי שיער כשלד, ושטח ריק שהוא חלק מהקומפוזיציה. הטיפוגרפיה היא הוויז'ואל. לחץ \"הצג מסגרת\" כדי לראות את העמודות ואת שכבת ה-baseline.",
  when:"סטודיו, אדריכלים, צלמים, מוסדות תרבות, מותגי עיצוב ואופנה, B2B פרימיום טיפוגרפי. כשהעמוד צריך להיראות כמו דוח שנתי, לא כמו דף נחיתה. התורה: engine/modular-frame.md.",
  note:"זה החריג היחיד שבו 12 עמודות הן הדוקטרינה, כי ההנחה אסימטרית וכל בלוק מתחיל ונגמר בקו עמודה מוצהר. כל גובה שורה כפולה של 4 וכל ריווח כפולה של 8, ולכן הטקסט נוחת על שכבת ה-baseline. במובייל ארבע עמודות והאסימטריה נשמרת בפסקה המוסטת ובאינדקס.",
  css:`${HUD}
.md{--base:8px;max-width:1200px;margin-inline:auto;padding:96px 24px;display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px;row-gap:calc(var(--base) * 6);position:relative}
.md>*{grid-column:1/-1;min-width:0}
.md .c1-7{grid-column:1/8}.md .c8-12{grid-column:8/13;align-self:end}.md .c1-4{grid-column:1/5}.md .c6-12{grid-column:6/13}.md .c1-8{grid-column:1/9}.md .c9-12{grid-column:9/13}.md .c5-11{grid-column:5/12}.md .c1-2{grid-column:1/3}.md .c3-12{grid-column:3/13}
.md hr{border:0;border-top:1px solid var(--line);margin:0;height:0}
.md h2,.md h3,.md p{margin:0}
.md .t1{font-size:72px;line-height:80px;letter-spacing:-.02em;font-weight:600}
.md .t2{font-size:34px;line-height:40px;font-weight:600}
.md .t3{font-size:20px;line-height:28px;font-weight:600}
.md .lead{font-size:18px;line-height:28px;color:var(--muted)}
.md p.b{font-size:16px;line-height:28px}
.md .meta{font-size:13px;line-height:20px;color:var(--muted)}
.md .num{font-size:13px;line-height:20px;color:var(--accent);font-variant-numeric:tabular-nums}
.md .ph{border-radius:0;font-size:16px}
.md .r32{aspect-ratio:3/2}.md .r43{aspect-ratio:4/3}
.md .idx{display:grid;grid-template-columns:subgrid;grid-column:1/-1;row-gap:0}
.md .stat{display:grid;grid-template-columns:repeat(4,1fr);column-gap:24px;border-top:1px solid var(--line);padding-top:calc(var(--base) * 2)}
.md .stat b{display:block;font-size:40px;line-height:48px;font-weight:600;letter-spacing:-.02em}
.md .stat span{font-size:13px;line-height:20px;color:var(--muted)}
.md .block{background:var(--accent);color:var(--accent-ink);padding:calc(var(--base) * 3);font-size:20px;line-height:28px;font-weight:600;align-self:start}
.md.frame{background-image:repeating-linear-gradient(to bottom,transparent 0 calc(var(--base) - 1px),color-mix(in srgb,var(--accent) 22%,transparent) calc(var(--base) - 1px) var(--base))}
.md.frame>*,.md.frame .idx>*{outline:1px dashed color-mix(in srgb,var(--accent) 55%,transparent);outline-offset:-1px}
.md.frame hr{outline:0}
@media(max-width:1023px){.md{grid-template-columns:repeat(8,1fr);padding-block:64px}.md .c1-7{grid-column:1/6}.md .c8-12{grid-column:6/9}.md .c1-4{grid-column:1/4}.md .c6-12{grid-column:4/9}.md .c1-8{grid-column:1/6}.md .c9-12{grid-column:6/9}.md .c5-11{grid-column:3/8}.md .c1-2{grid-column:1/2}.md .c3-12{grid-column:2/9}.md .t1{font-size:56px;line-height:64px}}
@media(max-width:767px){.md{grid-template-columns:repeat(4,1fr);column-gap:16px;padding:48px 20px;row-gap:calc(var(--base) * 4)}.md .t1{font-size:40px;line-height:48px}.md .c1-7,.md .c8-12,.md .c1-4,.md .c6-12,.md .c1-8,.md .c9-12{grid-column:1/-1}.md .c5-11{grid-column:2/5}.md .c1-2{grid-column:1/2}.md .c3-12{grid-column:2/5}.md .stat{grid-template-columns:repeat(2,1fr);row-gap:24px}.md .stat b{font-size:32px;line-height:40px}.md .t2{font-size:26px;line-height:32px}}`,
  html:`<div class="mvhud"><span id="mdhud"></span><button id="mdtg" type="button">הסתר מסגרת</button></div>
<div class="md frame">
  <h2 class="t1 c1-7">סטודיו לאדריכלות. עבודה שקטה, פרטים חדים.</h2>
  <p class="lead c8-12">הליד לא באותה שורה ולא באותו רוחב כמו הכותרת. זה המתח השוויצרי: כותרת מוסטת.</p>
  <hr>
  <div class="idx"><span class="num c1-2">01</span><div class="c3-12"><h3 class="t3">אינדקס: הספרה בעמודה אחת, התוכן מעמודה שלוש</h3><p class="b">קו השיער מעל הוא המבנה, המספור הוא הוויז'ואל. שלוש שורות כאלה זו רשימת שירותים שלא נראית כמו רשימה.</p></div></div>
  <hr>
  <div class="c1-4"><h3 class="t2">טקסט מול תמונה</h3><p class="b" style="margin-top:16px">הטקסט על ארבע עמודות, התמונה משש עד שתים עשרה, ועמודה חמש נשארת ריקה. הריק הוא מה שמפריד, לא gap גדול.</p></div>
  <div class="ph ph-c r32 c6-12">6 עד 12</div>
  <div class="ph ph-a r43 c1-8">1 עד 8</div>
  <p class="meta c9-12">תמונה עם כיתוב: הכיתוב לצד, מיושר לראש התמונה, לא מתחת. ככה העמוד לא מרגיש כמו פיד.</p>
  <hr>
  <div class="stat"><div><b>2011</b><span>שנת ייסוד</span></div><div><b>84</b><span>פרויקטים שנבנו</span></div><div><b>12</b><span>אנשי צוות</span></div><div><b>3</b><span>פרסים בינלאומיים</span></div></div>
  <p class="b c5-11">פסקה מוסטת: מעמודה חמש עד אחת עשרה, אחרי בלוק רחב. off-center מכוון, והעין נחה. במובייל ההסטה נשמרת (2 עד 4) כדי שהעמוד לא יהפוך לרשימה.</p>
  <div class="block c1-4">בלוק צבע אחד לעמוד. במקום האדום השוויצרי, ה-accent של העור.</div>
</div>`,
  js:`const md=document.querySelector(".md"),hud=document.getElementById("mdhud"),tg=document.getElementById("mdtg");
tg.addEventListener("click",()=>{md.classList.toggle("frame");tg.textContent=md.classList.contains("frame")?"הסתר מסגרת":"הצג מסגרת";});
function upd(){const cols=getComputedStyle(md).gridTemplateColumns.split(" ").length,lh=parseFloat(getComputedStyle(document.querySelector(".md p.b")).lineHeight);
  hud.textContent="רוחב: "+innerWidth+"px · "+cols+" עמודות · baseline 8 · גוף 16/"+Math.round(lh);}
addEventListener("resize",upd);upd();`,
  runway:false
}
];
