// מעבר על גלריית webflow.com/made-in-webflow/gsap (2.9.2026): שלושת השימושים של Flip
// שחזרו בעשרות קלונאבלס ולא היו לנו במאגר.
export default [
{
  id:"b45", cat:"behavior", name:"החלפת תצוגה בין גריד לרשימה", tech:"GSAP · Flip", status:"ממתין",
  desc:"מתג אחד שמחליף בין גריד כרטיסים לרשימה שורות, והפריטים מחליקים בין שתי הפריסות במקום לקפוץ. גם התמונות והטקסט זזים יחד.",
  when:"תיק עבודות, קטלוג מוצרים, בלוג, מקרי לקוח, רשימת נכסים. המבקר בוחר איך נוח לו לסרוק, וזה מגדיל את הסיכוי שיישאר.",
  libs:["gsap","Flip"],
  css:`.gl{max-width:min(1080px,94vw);margin-inline:auto}
.gl-top{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:clamp(18px,2.4vw,30px)}
.gl-top h3{margin:0;font-size:clamp(22px,2.8vw,38px)}
.gl-switch{display:inline-flex;background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:4px}
.gl-switch button{border:0;background:none;font:inherit;font-size:14px;padding:9px 18px;border-radius:999px;cursor:pointer;color:var(--muted)}
.gl-switch button.on{background:var(--ink);color:#fff}
.gl-list{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.gl-item{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.gl-img{aspect-ratio:16/10;font-size:24px}
.gl-txt{padding:16px 18px;display:flex;flex-direction:column;gap:6px}
.gl-txt h4{margin:0;font-size:17px}
.gl-txt p{margin:0;font-size:14px;color:var(--muted);line-height:1.6}
.gl-tag{font-size:12px;color:var(--accent);font-weight:600}
/* מצב רשימה: אותו DOM, פריסה אחרת. Flip מודד את ההפרש ומנפיש אותו */
.gl-list.rows{grid-template-columns:1fr;gap:14px}
.gl-list.rows .gl-item{flex-direction:row;align-items:stretch}
.gl-list.rows .gl-img{aspect-ratio:auto;width:clamp(120px,22%,240px);flex:none}
.gl-list.rows .gl-txt{justify-content:center;flex:1}
@media(max-width:860px){.gl-list{grid-template-columns:1fr 1fr}.gl-list.rows .gl-img{width:34%}}
@media(max-width:560px){.gl-list{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="gl">
  <div class="gl-top">
    <h3>עבודות אחרונות</h3>
    <div class="gl-switch"><button class="on" data-v="grid">גריד</button><button data-v="rows">רשימה</button></div>
  </div>
  <div class="gl-list">
    <article class="gl-item"><div class="ph gl-img ph-a">1</div><div class="gl-txt"><span class="gl-tag">אתר תדמית</span><h4>משרד עורכי דין</h4><p>אתר חדש עם מנוע תוכן ומערכת פניות.</p></div></article>
    <article class="gl-item"><div class="ph gl-img ph-c">2</div><div class="gl-txt"><span class="gl-tag">חנות</span><h4>מותג קוסמטיקה</h4><p>חנות עם מועדון לקוחות וסליקה.</p></div></article>
    <article class="gl-item"><div class="ph gl-img ph-d">3</div><div class="gl-txt"><span class="gl-tag">דף נחיתה</span><h4>קורס דיגיטלי</h4><p>דף מכירה עם וידאו והרשמה מהירה.</p></div></article>
    <article class="gl-item"><div class="ph gl-img ph-e">4</div><div class="gl-txt"><span class="gl-tag">מערכת</span><h4>פורטל לקוחות</h4><p>ממשק ניהול עם דוחות והרשאות.</p></div></article>
    <article class="gl-item"><div class="ph gl-img ph-b">5</div><div class="gl-txt"><span class="gl-tag">אתר תדמית</span><h4>קליניקה פרטית</h4><p>אתר עם יומן תורים ואזור מטופלים.</p></div></article>
    <article class="gl-item"><div class="ph gl-img ph-f">6</div><div class="gl-txt"><span class="gl-tag">חנות</span><h4>יבואן ריהוט</h4><p>קטלוג עם סינון לפי חדר וסגנון.</p></div></article>
  </div>
</div></div>`,
  js:`(function(){
  const list=document.querySelector(".gl-list");
  const btns=[...document.querySelectorAll(".gl-switch button")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  btns.forEach(b=>b.addEventListener("click",()=>{
    if(b.classList.contains("on"))return;
    btns.forEach(x=>x.classList.toggle("on",x===b));
    // 1. מודדים איפה הכל נמצא עכשיו, כולל הילדים שזזים בתוך הכרטיס
    const state=Flip.getState(".gl-item, .gl-img, .gl-txt");
    // 2. משנים פריסה בקלאס אחד
    list.classList.toggle("rows",b.dataset.v==="rows");
    if(reduce)return;
    // 3. Flip משווה מצב חדש למצב ישן ומנפיש את ההפרש
    Flip.from(state,{duration:.55,nested:true,ease:"power2.inOut",absolute:true});
  }));
})();`,
  runway:false,
  note:"זה הכוח האמיתי של Flip: את הפריסה משנים ב-CSS בלבד, ואת האנימציה לא כותבים כלל. `nested:true` חובה כאן, כי גם הכרטיס וגם התמונה והטקסט שבתוכו זזים באותו רגע, ובלעדיו הילדים נגררים פעמיים. `absolute:true` מונע מהפריטים שנשארו במקום לקפוץ בזמן שהגריד משנה עמודות. במצב חיסכון בתנועה הפריסה עדיין מתחלפת, פשוט בלי מעבר."
},
{
  id:"b46", cat:"behavior", name:"עמודות שנפתחות בהובר", tech:"GSAP · Flip", status:"ממתין",
  desc:"שורת עמודות שרק אחת מהן פתוחה. מעבר עכבר פותח את הבאה וסוגר את הקודמת, והרוחב, התמונה והכותרת זזים יחד בתנועה אחת רציפה.",
  when:"קטגוריות שירות, תחומי התמחות, ענפים, צוות. סקשן אחד שמציג שישה נושאים בלי לגלול ובלי לפתוח מודאל.",
  libs:["gsap","Flip"],
  css:`.cx{display:flex;gap:10px;height:clamp(320px,52vh,520px);max-width:min(1120px,94vw);margin-inline:auto}
.cx-col{position:relative;overflow:hidden;border-radius:18px;cursor:pointer;background:var(--card);border:1px solid var(--line);
  flex:0 0 84px;display:flex;flex-direction:column;justify-content:space-between;padding:18px}
.cx-col.open{flex:1 1 auto}
.cx-col .ph{position:absolute;inset:0;border-radius:0;opacity:.9;font-size:0}
.cx-num,.cx-name,.cx-body{position:relative;z-index:1;color:#fff}
.cx-num{font-size:14px;font-variant-numeric:tabular-nums;opacity:.85}
.cx-name{font-size:clamp(18px,2vw,30px);font-weight:800;white-space:nowrap}
.cx-body{max-width:38ch;font-size:15px;line-height:1.65;opacity:0;transition:opacity .3s .15s}
.cx-col.open .cx-body{opacity:.92}
/* עמודה סגורה: הכותרת מסתובבת ונשארת קריאה ברצועה צרה */
.cx-col:not(.open) .cx-name{transform:rotate(180deg);writing-mode:vertical-rl;font-size:16px}
.cx-foot{display:flex;flex-direction:column;gap:10px;align-items:flex-start}
@media(max-width:760px){
  .cx{flex-direction:column;height:auto}
  .cx-col{flex:0 0 74px;min-height:74px}
  .cx-col.open{flex:0 0 260px}
  .cx-col:not(.open) .cx-name{transform:none;writing-mode:horizontal-tb}
}
@media (prefers-reduced-motion: reduce){.cx-body{transition:none}}`,
  html:`<div class="stage tight"><div class="cx">
  <div class="cx-col open"><div class="ph ph-a"></div><span class="cx-num">01</span>
    <div class="cx-foot"><span class="cx-name">אתרי תדמית</span><p class="cx-body">אתר שמסביר מה אתם עושים ולמי, ומוביל את המבקר לפנייה אחת ברורה.</p></div></div>
  <div class="cx-col"><div class="ph ph-c"></div><span class="cx-num">02</span>
    <div class="cx-foot"><span class="cx-name">דפי נחיתה</span><p class="cx-body">עמוד יחיד ממוקד לקמפיין, עם מסר אחד וקריאה לפעולה אחת.</p></div></div>
  <div class="cx-col"><div class="ph ph-d"></div><span class="cx-num">03</span>
    <div class="cx-foot"><span class="cx-name">חנויות</span><p class="cx-body">חנות שמוכרת גם בלי איש מכירות, עם מסלול קנייה קצר.</p></div></div>
  <div class="cx-col"><div class="ph ph-e"></div><span class="cx-num">04</span>
    <div class="cx-foot"><span class="cx-name">מערכות</span><p class="cx-body">ממשק פנימי לניהול לקוחות, משימות ודוחות במקום גיליונות.</p></div></div>
</div></div>`,
  js:`(function(){
  const cols=[...document.querySelectorAll(".cx-col")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TEXT=".cx-name, .cx-body, .cx-num";
  let flip;
  function open(col){
    if(col.classList.contains("open"))return;
    if(flip)flip.kill();                       // הובר מהיר: מבטלים נסיעה שלא הספיקה להסתיים
    gsap.set(TEXT,{clearProps:"fontSize"});
    // מודדים גם את גודל הגופן, אחרת הכותרת קופצת בין שני הגדלים במקום לזרום
    const state=Flip.getState(".cx-col, "+TEXT,{props:"fontSize"});
    cols.forEach(c=>c.classList.toggle("open",c===col));
    if(reduce)return;
    flip=Flip.from(state,{duration:.7,nested:true,absolute:true,ease:"power2.inOut",
      onComplete:()=>gsap.set(TEXT,{clearProps:"fontSize"})});
  }
  cols.forEach(c=>{
    c.addEventListener("mouseenter",()=>open(c));
    c.addEventListener("click",()=>open(c));          // מגע ומקלדת
    c.tabIndex=0;
    c.addEventListener("focus",()=>open(c));
  });
})();`,
  runway:false,
  note:"החלק שנשבר אצל רוב מי שבונה את זה לבד הוא הכותרת: היא עוברת בין אופקי לאנכי ובין שני גדלים, ואם לא מוסיפים `props:\"fontSize\"` ל-getState היא קופצת. הרוחב עצמו לא מונפש ידנית אלא נגזר מ-flex, ולכן זה מחזיק גם כשמוסיפים עמודה חמישית. **מלכודת**: כל prop שמעבירים ל-Flip נשאר כסגנון אינליין בסוף התנועה ודורס את ה-CSS, ולכן העמודה הקודמת נשארת פתוחה למראה. לכן ה-opacity מנוהל ב-CSS בלבד וה-fontSize מנוקה ב-clearProps. הובר לבד אינו נגיש, ולכן אותו פותח רשום גם על click ועל focus, והעמודות מקבלות tabIndex."
},
{
  id:"g47", cat:"gsap", name:"אלמנט שנוסע בין תחנות לאורך הגלילה", tech:"GSAP · Flip.fit · ScrollTrigger", status:"ממתין",
  desc:"פריט אחד שעובר בין מסגרות ריקות שפזורות לאורך העמוד: משנה מקום, גודל וזווית תוך כדי גלילה, כאילו הוא מלווה את הקורא משלב לשלב.",
  when:"תהליך עבודה, מסע לקוח, הצגת מוצר בכמה הקשרים. במקום ארבע תמונות נפרדות יש אובייקט אחד שממשיך, וזה מה שיוצר את תחושת הרצף.",
  libs:["gsap","Flip","ScrollTrigger"],
  css:`.jf-hint{text-align:center;color:var(--muted);font-size:14px;padding-bottom:10px}
.jf-step{min-height:88vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:clamp(20px,4vw,60px);
  max-width:min(1080px,94vw);margin-inline:auto}
.jf-step:nth-child(even){direction:rtl}
.jf-copy h3{margin:0 0 10px;font-size:clamp(22px,2.8vw,40px)}
.jf-copy p{margin:0;color:var(--muted);font-size:17px;line-height:1.7;max-width:42ch}
.jf-num{font-size:13px;color:var(--accent);font-weight:700;letter-spacing:.08em;margin-bottom:8px}
.jf-zone{aspect-ratio:1;justify-self:center;width:min(78%,340px)}
.jf-step:nth-child(2) .jf-zone{width:min(52%,220px)}
.jf-step:nth-child(3) .jf-zone{width:min(88%,380px)}
.jf-step:nth-child(4) .jf-zone{width:min(46%,190px)}
/* הנוסע יושב מחוץ לזרימה אבל בתוך אותו קונטקסט גלילה של התחנות, ו-Flip.fit מציב אותו על התחנה הנוכחית */
.jf-wrap{position:relative}
.jf-trav{position:absolute;top:0;left:0;width:340px;aspect-ratio:1;border-radius:22px;
  z-index:2;pointer-events:none;display:grid;place-items:center;font-size:40px;box-shadow:0 24px 60px rgba(20,20,40,.22)}
@media(max-width:760px){.jf-step{grid-template-columns:1fr;gap:24px;min-height:auto;padding-block:14vh}
  .jf-zone,.jf-step:nth-child(2) .jf-zone,.jf-step:nth-child(3) .jf-zone,.jf-step:nth-child(4) .jf-zone{width:min(62%,240px)}}`,
  html:`<p class="jf-hint">גלול. הפריט עובר בין המסגרות במקום להתחלף.</p>
<div class="jf-wrap">
  <section class="jf-step"><div class="jf-copy"><div class="jf-num">שלב 01</div><h3>שיחת אפיון</h3>
    <p>מבינים את העסק, את הלקוח ואת מה שצריך לקרות באתר, לפני שנוגעים בעיצוב.</p></div>
    <div class="ph jf-zone ph-a" style="opacity:0"></div></section>
  <section class="jf-step"><div class="jf-copy"><div class="jf-num">שלב 02</div><h3>קופי ומבנה</h3>
    <p>כותבים את המסרים ובונים את סדר הסקשנים, כך שכל גלילה עונה על השאלה הבאה.</p></div>
    <div class="ph jf-zone ph-a" style="opacity:0"></div></section>
  <section class="jf-step"><div class="jf-copy"><div class="jf-num">שלב 03</div><h3>עיצוב ופיתוח</h3>
    <p>הופכים את המבנה לאתר חי, מהיר, שנראה נכון בכל מסך.</p></div>
    <div class="ph jf-zone ph-a" style="opacity:0"></div></section>
  <section class="jf-step"><div class="jf-copy"><div class="jf-num">שלב 04</div><h3>עלייה ומדידה</h3>
    <p>מחברים מעקב, עולים לאוויר, ובודקים מה עובד במקום לנחש.</p></div>
    <div class="ph jf-zone ph-a" style="opacity:0"></div></section>
  <div class="ph jf-trav ph-a">◆</div>
</div>`,
  js:`(function(){
  const trav=document.querySelector(".jf-trav");
  const zones=gsap.utils.toArray(".jf-zone");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){zones.forEach(z=>z.style.opacity=1);trav.style.display="none";return;}
  let tl;
  function build(){
    if(tl){tl.scrollTrigger&&tl.scrollTrigger.kill();tl.kill();gsap.set(trav,{clearProps:"all"});}
    Flip.fit(trav,zones[0]);                       // מתחילים מוצמדים לתחנה הראשונה
    tl=gsap.timeline({scrollTrigger:{
      trigger:zones[0],start:"center center",
      endTrigger:zones[zones.length-1],end:"center center",scrub:.6
    }});
    zones.slice(1).forEach((z,i)=>{
      // המשך הנסיעה נמדד במרחק אמיתי בין התחנות, ולכן הקצב אחיד
      const dist=z.getBoundingClientRect().top-zones[i].getBoundingClientRect().top;
      const last=i===zones.length-2;                 // בתחנה האחרונה מתיישרים, כדי שהסיום ייראה מכוון
      tl.add(Flip.fit(trav,z,{duration:Math.abs(dist)||1,ease:"power2.inOut",rotate:last?0:(i%2?8:-8)}));
    });
  }
  build();
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{build();ScrollTrigger.refresh();},250);});
})();`,
  runway:true,
  note:"Flip.fit שונה מ-Flip.from: הוא לא מנפיש הפרש שכבר קרה אלא מצמיד אלמנט אחד לקופסה של אלמנט אחר, כולל גודל וזווית. המסגרות בעמוד נשארות שקופות ומשמשות רק כמדידה, ולכן העמוד רספונסיבי בלי חישובי פיקסלים. שתי מלכודות: ה-duration של כל קטע חייב להיות המרחק האמיתי בין התחנות (אחרת הנסיעה מאיצה ומאטה בלי סיבה), ובשינוי גודל חלון חייבים לבנות מחדש עם clearProps, כי ה-fit הישן שמור בטרנספורם. במצב חיסכון בתנועה מציגים את המסגרות עצמן ומוותרים על הנוסע."
},
];
