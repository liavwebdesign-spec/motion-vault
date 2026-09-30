// סריקת תדירות על 366 אתרים באוסף ה-GSAP של awwwards (2.9.2026).
// נבנו רק הפערים שחזרו בשיעור גבוה ולא היו לנו.
export default [
{
  id:"b34", cat:"behavior", name:"גריד מסונן עם מעבר חלק", tech:"GSAP · Flip", status:"ממתין",
  desc:"שורת קטגוריות מעל גריד. לחיצה מסננת, והפריטים שנשארים מחליקים למקומם החדש במקום להיעלם ולקפוץ. הנעלמים דוהים והחדשים נכנסים.",
  when:"תיק עבודות, קטלוג מוצרים, תפריט מסעדה, רשימת שירותים, מאמרים, צוות. הרכיב הזה הופיע ביותר ממחצית האתרים שנסרקו.",
  libs:["gsap","Flip"],
  css:`.fg{padding-inline:var(--gutter)}
.fg-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:clamp(20px,2.4vw,34px)}
.fg-chip{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:10px 18px;min-height:44px;font:inherit;font-size:14px;
  color:var(--ink);cursor:pointer;transition:background .25s,border-color .25s,color .25s}
.fg-chip:hover{border-color:var(--accent)}
.fg-chip.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.fg-count{margin-inline-start:auto;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.fg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);position:relative;background:var(--bg)}
.fg-item{background:var(--card);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.fg-item .ph{height:clamp(150px,15vw,210px);border-radius:0;font-size:22px}
.fg-item h3{margin:0;padding:16px 18px 4px;font-size:17px}
.fg-item p{margin:0;padding:0 18px 18px;font-size:13px;color:var(--muted)}
.fg-item.hide{display:none}
.fg-empty{padding:40px 4px;color:var(--muted);text-align:center;display:none}
.fg-empty.on{display:block}
@media(max-width:900px){.fg-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.fg-grid{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="fg">
  <div class="fg-bar" role="group" aria-label="סינון לפי קטגוריה">
    <button class="fg-chip on" type="button" aria-pressed="true" data-f="all">הכל</button>
    <button class="fg-chip" type="button" aria-pressed="false" data-f="web">אתרי תדמית</button>
    <button class="fg-chip" type="button" aria-pressed="false" data-f="shop">חנויות</button>
    <button class="fg-chip" type="button" aria-pressed="false" data-f="lp">דפי נחיתה</button>
    <span class="fg-count" role="status"></span>
  </div>
  <div class="fg-grid">
    <article class="fg-item" data-c="web"><div class="ph ph-a">1</div><h3>משרד עורכי דין</h3><p>אתר תדמית</p></article>
    <article class="fg-item" data-c="shop"><div class="ph ph-b">2</div><h3>חנות תכשיטים</h3><p>חנות</p></article>
    <article class="fg-item" data-c="lp"><div class="ph ph-c">3</div><h3>קמפיין קיץ</h3><p>דף נחיתה</p></article>
    <article class="fg-item" data-c="web"><div class="ph ph-d">4</div><h3>קליניקת שיניים</h3><p>אתר תדמית</p></article>
    <article class="fg-item" data-c="shop"><div class="ph ph-e">5</div><h3>חנות רהיטים</h3><p>חנות</p></article>
    <article class="fg-item" data-c="lp"><div class="ph ph-f">6</div><h3>וובינר</h3><p>דף נחיתה</p></article>
    <article class="fg-item" data-c="web"><div class="ph ph-c">7</div><h3>חברת בנייה</h3><p>אתר תדמית</p></article>
    <article class="fg-item" data-c="shop"><div class="ph ph-a">8</div><h3>חנות קפה</h3><p>חנות</p></article>
    <article class="fg-item" data-c="lp"><div class="ph ph-b">9</div><h3>קורס דיגיטלי</h3><p>דף נחיתה</p></article>
  </div>
  <p class="fg-empty">אין פריטים בקטגוריה הזאת.</p>
</div></div>`,
  js:`(function(){
  const chips=[...document.querySelectorAll(".fg-chip")],items=[...document.querySelectorAll(".fg-item")];
  const count=document.querySelector(".fg-count"),empty=document.querySelector(".fg-empty");
  const grid=document.querySelector(".fg-grid");
  const still=matchMedia("(prefers-reduced-motion: reduce)");
  // בלי הספרייה (CDN חסום) הסינון עובד בלי תנועה: אף קריאה ל-Flip או ל-gsap לא רצה
  const anim=!!(window.gsap&&window.Flip);
  function apply(f,animate){
    const move=anim&&animate&&!still.matches;
    // Flip: מצלמים את המצב לפני, משנים את ה-DOM, והספרייה מנפישה את ההפרש
    const state=move?Flip.getState(items,{props:"opacity"}):null;
    const h0=grid.getBoundingClientRect().height;
    let shown=0;
    items.forEach(it=>{
      const vis=f==="all"||it.dataset.c===f;
      it.classList.toggle("hide",!vis);
      if(vis)shown++;
    });
    count.textContent=shown+" מתוך "+items.length;
    empty.classList.toggle("on",shown===0);
    if(!move)return;                 // הקריאה הראשונה רק מסמנת מצב, בלי אנימציה על טעינה; וכך גם בתנועה מופחתת ובלי הספרייה
    const h1=grid.getBoundingClientRect().height;
    // absolute:true מוציא את הכרטיסים מהזרימה, הגריד מתכווץ לאפס, וכל מה שמתחתיו
    // עולה למעלה ומציץ מאחורי הכרטיסים המרחפים. מנפישים את גובה הגריד במקביל.
    gsap.fromTo(grid,{height:h0},{height:h1,duration:.55,ease:"power2.inOut",
      onComplete:()=>gsap.set(grid,{clearProps:"height"})});
    Flip.from(state,{duration:.55,ease:"power2.inOut",scale:true,absolute:true,
      onEnter:els=>gsap.fromTo(els,{opacity:0,scale:.9},{opacity:1,scale:1,duration:.4}),
      onLeave:els=>gsap.to(els,{opacity:0,scale:.9,duration:.25})});
  }
  chips.forEach(c=>c.addEventListener("click",()=>{
    chips.forEach(x=>{x.classList.toggle("on",x===c);x.setAttribute("aria-pressed",String(x===c));});
    apply(c.dataset.f,true);
  }));
  apply("all",false);
})();`,
  runway:false,
  note:"Flip פותר את הבעיה האמיתית בגריד מסונן: בלעדיו הפריטים קופצים למקום החדש בפריים אחד. absolute:true מונע קפיצה כשמספר השורות משתנה, אבל הוא גם מרוקן את הגריד ולכן חייבים להנפיש את גובהו במקביל, ו-onEnter ו-onLeave מטפלים בפריטים שנכנסים ויוצאים לגמרי. תחת prefers-reduced-motion, וגם כשהספרייה חסומה, הסינון עדיין עובד, פשוט בלי תנועה. הצ'יפים נושאים aria-pressed, והמונה «3 מתוך 9» יושב ב-role=\"status\" כדי שקורא מסך ישמע שהסינון עבד."
},
{
  id:"b35", cat:"behavior", name:"ציר תהליך אנכי עם קו שמתמלא", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שלבים אחד מתחת לשני, וקו אנכי שמתמלא בקצב הגלילה. כל שלב נדלק כשהקו מגיע אליו, והמספר שלו מתמלא בצבע.",
  when:"איך עובדים איתנו, מסלול טיפול, שלבי פרויקט, מה קורה אחרי שמשאירים פרטים. הגרסה האנכית עובדת מצוין במובייל, בניגוד לציר אופקי.",
  libs:["gsap","ScrollTrigger"],
  css:`/* כל הגאומטריה נגזרת משלושה משתנים. כשהקו והעיגולים מקבלים כל אחד clamp משלו
   הם מתיישרים במקרה ברוחב אחד ומתפצלים בכל השאר, וזה נראה כמו קו עקום. */
.vt{--vt-pad:clamp(46px,6vw,72px);--vt-x:clamp(4px,1vw,12px);--vt-dot:clamp(24px,3vw,34px);
  position:relative;max-width:min(780px,92vw);margin-inline:auto;padding-inline-start:var(--vt-pad)}
.vt-rail{position:absolute;inset-block:14px 10px;width:2px;background:var(--line);border-radius:2px;
  inset-inline-start:calc(var(--vt-x) + var(--vt-dot)/2 - 1px)}
/* מצב הבסיס הוא הציר השלם: קו מלא וכל השלבים דלוקים. כך הוא נראה בתנועה מופחתת וכשהספרייה חסומה.
   המצב הכבוי חי רק תחת .vt-live, שהסקריפט מוסיף כשהוא באמת מנפיש */
.vt-fill{position:absolute;inset-block-start:0;inset-inline:0;height:100%;background:var(--accent);border-radius:2px}
.vt-step{position:relative;padding-block:clamp(18px,2.4vw,34px)}
.vt-dot{position:absolute;inset-inline-start:calc(var(--vt-pad) * -1 + var(--vt-x));top:calc(clamp(18px,2.4vw,34px) + 2px);
  width:var(--vt-dot);height:var(--vt-dot);border-radius:50%;background:var(--accent);border:2px solid var(--accent);
  display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--accent-ink);transition:background .35s,border-color .35s,color .35s}
.vt-live .vt-step:not(.on) .vt-dot{background:var(--card);border-color:var(--line);color:var(--muted)}
.vt-step h3{margin:0 0 6px;font-size:clamp(19px,2vw,26px);color:var(--ink);transition:color .35s}
.vt-live .vt-step:not(.on) h3{color:var(--muted)}
/* רגע ההדלקה של .vt-live: בלי transition, אחרת השלבים שעוד לא הגיע אליהם הקו נכבים בדהייה מול העיניים בטעינה */
.vt-init .vt-dot,.vt-init h3{transition:none}
.vt-step p{margin:0;color:var(--muted);font-size:16px;line-height:1.65;max-width:56ch}
.vt-when{display:inline-block;margin-top:8px;font-size:12px;letter-spacing:0;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 11px}`,
  html:`<div class="stage"><div class="vt">
  <div class="vt-rail"><span class="vt-fill"></span></div>
  <div class="vt-step"><span class="vt-dot">1</span><h3>שיחת היכרות</h3><p>מבינים מה העסק עושה, מי הלקוח, ומה צריך לקרות באתר כדי שהטלפון יצלצל.</p><span class="vt-when">20 דקות</span></div>
  <div class="vt-step"><span class="vt-dot">2</span><h3>אפיון ותוכן</h3><p>בונים מבנה, כותבים את הטקסטים ואוספים חומרים. השלב שקובע את איכות התוצאה.</p><span class="vt-when">שבוע</span></div>
  <div class="vt-step"><span class="vt-dot">3</span><h3>עיצוב</h3><p>סקיצה של עמוד הבית לאישור, ואחריה שאר העמודים באותה שפה.</p><span class="vt-when">שבוע עד שבועיים</span></div>
  <div class="vt-step"><span class="vt-dot">4</span><h3>בנייה ובדיקות</h3><p>מרכיבים, בודקים בכל רוחב מסך, מחברים טפסים ומדידה.</p><span class="vt-when">שבועיים</span></div>
  <div class="vt-step"><span class="vt-dot">5</span><h3>עלייה לאוויר</h3><p>מפרסמים, מוודאים שהפניות מגיעות, ומלווים חודש נוסף.</p><span class="vt-when">יום אחד</span></div>
</div></div>`,
  js:`(function(){
  // בלי הספרייה הציר נשאר במצב הבסיס שלו: שלם ודלוק
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;
  const wrap=document.querySelector(".vt"),fill=document.querySelector(".vt-fill"),steps=gsap.utils.toArray(".vt-step");
  // רק בלי העדפת תנועה מופחתת; שם הציר מוצג שלם וסטטי (מצב הבסיס ב-CSS)
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    wrap.classList.add("vt-live","vt-init");
    requestAnimationFrame(()=>requestAnimationFrame(()=>wrap.classList.remove("vt-init")));
    gsap.fromTo(fill,{height:0},{height:"100%",ease:"none",
      scrollTrigger:{trigger:wrap,start:"top 62%",end:"bottom 72%",scrub:.6}});
    // שלב נדלק כשהקו מגיע אליו ונשאר דלוק כשהקו ממשיך; נכבה רק כשגוללים חזרה מעליו
    steps.forEach(s=>ScrollTrigger.create({trigger:s,start:"top 66%",
      onEnter:()=>s.classList.add("on"),onLeaveBack:()=>s.classList.remove("on")}));
    return ()=>{wrap.classList.remove("vt-live");steps.forEach(s=>s.classList.remove("on"));};
  });
})();`,
  note:"הקו ממולא בגובה ולא ב-scaleY, כך שהוא לא מותח את הפינות המעוגלות. השלבים נדלקים בטריגר נפרד לכל אחד, כי טיימליין אחד היה מחייב לחשב מיקומים לפי גובה הטקסט, וזה משתנה בכל פרויקט. שלב שנדלק נשאר דלוק כל עוד הקו מעליו, ונכבה רק כשגוללים חזרה. מצב הבסיס ב-CSS הוא הציר השלם, והמצב הכבוי חי רק תחת .vt-live שהסקריפט מוסיף, ולכן בתנועה מופחתת וכשהספרייה חסומה הגולש רואה ציר מלא ודלוק ולא ציר אפור. במובייל הציר נשאר זהה, וזה בדיוק היתרון על ציר אופקי."
},
{
  id:"b36", cat:"behavior", name:"טופס רב-שלבי עם התקדמות", tech:"JS · CSS transitions", status:"ממתין",
  desc:"שאלה אחת בכל מסך במקום טופס ארוך ומפחיד. פס התקדמות למעלה, מעבר מונפש בין השלבים, ולידציה לפני מעבר, וסיכום לפני שליחה.",
  when:"כל טופס שמבקש יותר משלושה שדות: בקשת הצעת מחיר, קביעת תור, שאלון אפיון, חישוב עלות. מעלה השלמות מול טופס אחד ארוך.",
  libs:[],
  css:`.ms{max-width:min(620px,92vw);margin-inline:auto;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:clamp(22px,3vw,38px);overflow:hidden}
.ms-top{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.ms-bar{flex:1;height:6px;border-radius:999px;background:var(--line);overflow:hidden}
.ms-bar i{display:block;height:100%;width:100%;transform-origin:0 50%;transform:scaleX(0);background:var(--accent);border-radius:999px;transition:transform .45s cubic-bezier(.2,.6,.2,1)}
html[dir="rtl"] .ms-bar i{transform-origin:100% 50%}
.ms-num{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.ms-view{position:relative}
.ms-step{display:none}
.ms-step.on{display:block;animation:msIn .38s cubic-bezier(.2,.6,.2,1)}
.ms-step.back.on{animation:msBack .38s cubic-bezier(.2,.6,.2,1)}
@keyframes msIn{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}
@keyframes msBack{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
.ms-step h3{margin:0 0 6px;font-size:clamp(20px,2.2vw,28px)}
.ms-step p.sub{margin:0 0 18px;color:var(--muted);font-size:15px}
.ms-opts{display:grid;gap:10px}
.ms-opt{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:14px;padding:15px 16px;cursor:pointer;
  background:var(--bg);transition:border-color .22s,background .22s}
.ms-opt:hover{border-color:var(--accent)}
.ms-opt input{accent-color:var(--accent);width:18px;height:18px;flex:none}
/* בטלפון העיגול עצמו 24px, סף המגע המינימלי; כל השורה ממילא לחיצה דרך ה-label */
@media (max-width:767px){.ms-opt input{width:24px;height:24px}}
/* נגזר מה-accent ומהכרטיס: בעור בהיר כמעט זהה לסגול הקודם, ובעור כהה הטקסט הבהיר נשאר קריא */
.ms-opt.sel{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--card))}
.ms-field input{width:100%;font:inherit;font-size:16px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:var(--bg);color:var(--ink)}
.ms-field input:focus{outline:0;border-color:var(--accent)}
.ms-err{font-size:13px;color:#c2255c;margin-top:8px;display:none}
.ms-err.on{display:block}
.ms-nav{display:flex;gap:10px;margin-top:24px}
.ms-nav button{flex:1;min-height:50px;border-radius:999px;border:0;font:inherit;font-weight:600;font-size:16px;cursor:pointer}
/* .ms-nav .ms-back ולא .ms-back: הכלל .ms-nav button חזק ממנו, ו«חזרה» יצא רחב כמו «המשך» */
.ms-nav .ms-back{flex:0 0 auto;padding-inline:22px;background:var(--bg);border:1px solid var(--line);color:var(--ink)}
.ms-next{background:var(--accent);color:var(--accent-ink)}
.ms-sum{list-style:none;margin:0 0 4px;padding:0;display:grid;gap:8px}
.ms-sum li{display:flex;justify-content:space-between;gap:16px;font-size:15px;border-bottom:1px dashed var(--line);padding-bottom:8px}
.ms-sum b{font-weight:600}
.ms-done{text-align:center;padding:10px 0}
.ms-done .ok{width:56px;height:56px;border-radius:50%;background:#2b8a3e;color:#fff;display:grid;place-items:center;font-size:26px;margin:0 auto 14px}
/* גם .ms-step.back.on: הוא ספציפי יותר מ-.ms-step.on, ובלעדיו ההחלקה אחורה רצה גם בתנועה מופחתת */
@media (prefers-reduced-motion: reduce){.ms-step.on,.ms-step.back.on{animation:none}}`,
  html:`<div class="stage tight"><form class="ms" novalidate>
  <div class="ms-top"><div class="ms-bar"><i></i></div><span class="ms-num"></span></div>
  <div class="ms-view">
    <section class="ms-step on" data-key="סוג הפרויקט">
      <h3 id="ms-h1">מה אתם צריכים?</h3><p class="sub">אפשר לבחור אחד</p>
      <div class="ms-opts" role="radiogroup" aria-labelledby="ms-h1">
        <label class="ms-opt"><input type="radio" name="type" value="אתר תדמית"><span>אתר תדמית</span></label>
        <label class="ms-opt"><input type="radio" name="type" value="דף נחיתה"><span>דף נחיתה</span></label>
        <label class="ms-opt"><input type="radio" name="type" value="חנות אונליין"><span>חנות אונליין</span></label>
      </div><p class="ms-err" role="alert">צריך לבחור אפשרות אחת</p>
    </section>
    <section class="ms-step" data-key="תקציב">
      <h3 id="ms-h2">מה טווח התקציב?</h3><p class="sub">זה עוזר להתאים הצעה מדויקת</p>
      <div class="ms-opts" role="radiogroup" aria-labelledby="ms-h2">
        <label class="ms-opt"><input type="radio" name="budget" value="עד 8,000"><span>עד 8,000 ש"ח</span></label>
        <label class="ms-opt"><input type="radio" name="budget" value="8,000 עד 15,000"><span>8,000 עד 15,000 ש"ח</span></label>
        <label class="ms-opt"><input type="radio" name="budget" value="מעל 15,000"><span>מעל 15,000 ש"ח</span></label>
      </div><p class="ms-err" role="alert">צריך לבחור טווח</p>
    </section>
    <section class="ms-step" data-key="פרטים">
      <h3>איך חוזרים אליכם?</h3><p class="sub">שם וטלפון, וזהו</p>
      <div class="ms-opts">
        <div class="ms-field"><input type="text" name="name" placeholder="שם מלא" aria-label="שם מלא" autocomplete="name"></div>
        <div class="ms-field"><input type="tel" name="phone" placeholder="טלפון" aria-label="טלפון" autocomplete="tel"></div>
      </div><p class="ms-err" role="alert">צריך שם וטלפון תקין</p>
    </section>
    <section class="ms-step" data-key="סיכום">
      <h3>רגע לפני ששולחים</h3><p class="sub">אפשר לחזור ולתקן כל שלב</p>
      <ul class="ms-sum"></ul>
    </section>
    <section class="ms-step ms-done-step">
      <div class="ms-done"><div class="ok">✓</div><h3>נשלח</h3><p class="sub">נחזור אליכם היום. הדגמה בלבד, שום דבר לא נשלח.</p></div>
    </section>
  </div>
  <div class="ms-nav"><button type="button" class="ms-back">חזרה</button><button type="button" class="ms-next">המשך</button></div>
</form></div>`,
  js:`(function(){
  const form=document.querySelector(".ms");
  const steps=[...form.querySelectorAll(".ms-step")];
  const bar=form.querySelector(".ms-bar i"),num=form.querySelector(".ms-num");
  const back=form.querySelector(".ms-back"),next=form.querySelector(".ms-next");
  const sum=form.querySelector(".ms-sum");
  // מסך התודה מזוהה לפי המחלקה ולא לפי מיקום, כך ששלב שיתווסף אחריו לא ישבור את הספירה
  const last=steps.findIndex(s=>s.classList.contains("ms-done-step"));
  const review=last-1;            // מסך הסיכום
  let i=0;
  form.querySelectorAll(".ms-opt input").forEach(inp=>{
    inp.addEventListener("change",()=>{
      inp.closest(".ms-opts").querySelectorAll(".ms-opt").forEach(o=>o.classList.remove("sel"));
      inp.closest(".ms-opt").classList.add("sel");
      inp.closest(".ms-step").querySelector(".ms-err").classList.remove("on");
    });
  });
  function valid(n){
    const s=steps[n];
    const radios=s.querySelectorAll('input[type=radio]');
    if(radios.length)return [...radios].some(r=>r.checked);
    const fields=[...s.querySelectorAll('input[type=text],input[type=tel]')];
    if(fields.length)return fields.every(f=>f.name==="phone"?/^0\\d{1,2}-?\\d{7}$/.test(f.value.replace(/\\s/g,"")):f.value.trim().length>1);
    return true;
  }
  function paintSummary(){
    sum.innerHTML="";
    steps.slice(0,review).forEach(s=>{
      const r=s.querySelector('input[type=radio]:checked');
      const txt=r?r.value:[...s.querySelectorAll('input')].map(f=>f.value).filter(Boolean).join(" · ");
      // textContent ולא innerHTML: מה שהגולש הקליד לא מתפרש כ-HTML (שם עם < לא שובר את הסיכום, ותגית לא רצה)
      const li=document.createElement("li"),k=document.createElement("span"),v=document.createElement("b");
      k.textContent=s.dataset.key;v.textContent=txt||"";
      li.append(k,v);sum.appendChild(li);
    });
  }
  function show(n,dir){
    steps.forEach(s=>{s.classList.remove("on","back");});
    const s=steps[n];
    if(dir<0)s.classList.add("back");
    s.classList.add("on");
    i=n;
    bar.style.transform="scaleX("+(Math.min(i,review)/review).toFixed(3)+")";   // transform ולא width: לא מחולל layout
    num.textContent=i<last?("שלב "+(i+1)+" מתוך "+(review+1)):"";
    // hidden ולא visibility: בשלב הראשון «המשך» מתפרס לכל הרוחב ולא נשאר לידו חור בגודל כפתור
    back.hidden=(i===0||i===last);
    next.textContent=i===review?"שליחה":"המשך";
    form.querySelector(".ms-nav").style.display=i===last?"none":"flex";
    if(i===review)paintSummary();
    // קורא מסך שומע שהשלב התחלף: הפוקוס עובר לכותרת השלב (לא בטעינה, כדי לא לקפוץ לטופס)
    if(dir!==0){const h=s.querySelector("h3");h.tabIndex=-1;h.focus({preventScroll:true});}
  }
  next.addEventListener("click",()=>{
    if(i<review&&!valid(i)){steps[i].querySelector(".ms-err").classList.add("on");return;}
    show(Math.min(i+1,last),1);
  });
  back.addEventListener("click",()=>show(Math.max(0,i-1),-1));
  show(0,0);
})();`,
  runway:false,
  note:"שלושה דברים שמעלים השלמה: שאלה אחת במסך, פס התקדמות שאומר כמה נשאר, ומסך סיכום שמאפשר לחזור ולתקן לפני שליחה. הוולידציה נעשית במעבר בין שלבים ולא בסוף, כדי שלא יגלו בעיה אחרי חמישה מסכים. השדות שומרים על autocomplete כדי שהמילוי במובייל יהיה מהיר. במעבר שלב הפוקוס עובר לכותרת השלב, כדי שקורא מסך ישמע שמשהו התחלף, והשגיאה יושבת ב-role=\"alert\". מסך הסיכום נבנה ב-textContent ולא ב-innerHTML, כי הוא מציג את מה שהגולש הקליד."
},
];
