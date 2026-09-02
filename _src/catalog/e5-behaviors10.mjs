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
.fg-chip{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:10px 18px;font:inherit;font-size:14px;
  color:var(--ink);cursor:pointer;transition:background .25s,border-color .25s,color .25s}
.fg-chip:hover{border-color:var(--accent)}
.fg-chip.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.fg-count{margin-inline-start:auto;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.fg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
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
    <button class="fg-chip on" data-f="all">הכל</button>
    <button class="fg-chip" data-f="web">אתרי תדמית</button>
    <button class="fg-chip" data-f="shop">חנויות</button>
    <button class="fg-chip" data-f="lp">דפי נחיתה</button>
    <span class="fg-count"></span>
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
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function apply(f){
    // Flip: מצלמים את המצב לפני, משנים את ה-DOM, והספרייה מנפישה את ההפרש
    const state=Flip.getState(items,{props:"opacity"});
    let shown=0;
    items.forEach(it=>{
      const vis=f==="all"||it.dataset.c===f;
      it.classList.toggle("hide",!vis);
      if(vis)shown++;
    });
    count.textContent=shown+" מתוך "+items.length;
    empty.classList.toggle("on",shown===0);
    if(reduce)return;
    Flip.from(state,{duration:.55,ease:"power2.inOut",scale:true,absolute:true,
      onEnter:els=>gsap.fromTo(els,{opacity:0,scale:.9},{opacity:1,scale:1,duration:.4}),
      onLeave:els=>gsap.to(els,{opacity:0,scale:.9,duration:.25})});
  }
  chips.forEach(c=>c.addEventListener("click",()=>{
    chips.forEach(x=>x.classList.toggle("on",x===c));
    apply(c.dataset.f);
  }));
  apply("all");
})();`,
  runway:false,
  note:"Flip פותר את הבעיה האמיתית בגריד מסונן: בלעדיו הפריטים קופצים למקום החדש בפריים אחד. absolute:true מונע קפיצה כשמספר השורות משתנה, ו-onEnter ו-onLeave מטפלים בפריטים שנכנסים ויוצאים לגמרי. תחת prefers-reduced-motion הסינון עדיין עובד, פשוט בלי תנועה."
},
{
  id:"b35", cat:"behavior", name:"ציר תהליך אנכי עם קו שמתמלא", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שלבים אחד מתחת לשני, וקו אנכי שמתמלא בקצב הגלילה. כל שלב נדלק כשהקו מגיע אליו, והמספר שלו מתמלא בצבע.",
  when:"איך עובדים איתנו, מסלול טיפול, שלבי פרויקט, מה קורה אחרי שמשאירים פרטים. הגרסה האנכית עובדת מצוין במובייל, בניגוד לציר אופקי.",
  libs:["gsap","ScrollTrigger"],
  css:`.vt{position:relative;max-width:min(780px,92vw);margin-inline:auto;padding-inline-start:clamp(46px,6vw,72px)}
.vt-rail{position:absolute;inset-block:14px 10px;inset-inline-start:clamp(15px,2vw,24px);width:2px;background:var(--line);border-radius:2px}
.vt-fill{position:absolute;inset-block-start:0;inset-inline:0;height:0;background:var(--accent);border-radius:2px}
.vt-step{position:relative;padding-block:clamp(18px,2.4vw,34px)}
.vt-dot{position:absolute;inset-inline-start:calc(clamp(46px,6vw,72px) * -1 + clamp(4px,1vw,12px));top:calc(clamp(18px,2.4vw,34px) + 2px);
  width:clamp(24px,3vw,34px);height:clamp(24px,3vw,34px);border-radius:50%;background:var(--card);border:2px solid var(--line);
  display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--muted);transition:background .35s,border-color .35s,color .35s}
.vt-step.on .vt-dot{background:var(--accent);border-color:var(--accent);color:#fff}
.vt-step h3{margin:0 0 6px;font-size:clamp(19px,2vw,26px);color:var(--muted);transition:color .35s}
.vt-step.on h3{color:var(--ink)}
.vt-step p{margin:0;color:var(--muted);font-size:16px;line-height:1.65;max-width:56ch}
.vt-when{display:inline-block;margin-top:8px;font-size:12px;letter-spacing:.08em;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 11px}`,
  html:`<div class="stage"><div class="vt">
  <div class="vt-rail"><span class="vt-fill"></span></div>
  <div class="vt-step"><span class="vt-dot">1</span><h3>שיחת היכרות</h3><p>מבינים מה העסק עושה, מי הלקוח, ומה צריך לקרות באתר כדי שהטלפון יצלצל.</p><span class="vt-when">20 דקות</span></div>
  <div class="vt-step"><span class="vt-dot">2</span><h3>אפיון ותוכן</h3><p>בונים מבנה, כותבים את הטקסטים ואוספים חומרים. השלב שקובע את איכות התוצאה.</p><span class="vt-when">שבוע</span></div>
  <div class="vt-step"><span class="vt-dot">3</span><h3>עיצוב</h3><p>סקיצה של עמוד הבית לאישור, ואחריה שאר העמודים באותה שפה.</p><span class="vt-when">שבוע עד שבועיים</span></div>
  <div class="vt-step"><span class="vt-dot">4</span><h3>בנייה ובדיקות</h3><p>מרכיבים, בודקים בכל רוחב מסך, מחברים טפסים ומדידה.</p><span class="vt-when">שבועיים</span></div>
  <div class="vt-step"><span class="vt-dot">5</span><h3>עלייה לאוויר</h3><p>מפרסמים, מוודאים שהפניות מגיעות, ומלווים חודש נוסף.</p><span class="vt-when">יום אחד</span></div>
</div></div>`,
  js:`(function(){
  const wrap=document.querySelector(".vt"),fill=document.querySelector(".vt-fill"),steps=gsap.utils.toArray(".vt-step");
  const rail=document.querySelector(".vt-rail");
  gsap.to(fill,{height:"100%",ease:"none",
    scrollTrigger:{trigger:wrap,start:"top 62%",end:"bottom 72%",scrub:.6}});
  steps.forEach(s=>{
    ScrollTrigger.create({trigger:s,start:"top 66%",end:"bottom 40%",
      onToggle:self=>s.classList.toggle("on",self.isActive),
      onEnter:()=>s.classList.add("on")});
  });
})();`,
  note:"הקו ממולא בגובה ולא ב-scaleY, כך שהוא לא מותח את הפינות המעוגלות. השלבים נדלקים בטריגר נפרד לכל אחד, כי טיימליין אחד היה מחייב לחשב מיקומים לפי גובה הטקסט, וזה משתנה בכל פרויקט. במובייל הציר נשאר זהה, וזה בדיוק היתרון על ציר אופקי."
},
{
  id:"b36", cat:"behavior", name:"טופס רב-שלבי עם התקדמות", tech:"JS · CSS transitions", status:"ממתין",
  desc:"שאלה אחת בכל מסך במקום טופס ארוך ומפחיד. פס התקדמות למעלה, מעבר מונפש בין השלבים, ולידציה לפני מעבר, וסיכום לפני שליחה.",
  when:"כל טופס שמבקש יותר משלושה שדות: בקשת הצעת מחיר, קביעת תור, שאלון אפיון, חישוב עלות. מעלה השלמות מול טופס אחד ארוך.",
  libs:[],
  css:`.ms{max-width:min(620px,92vw);margin-inline:auto;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:clamp(22px,3vw,38px);overflow:hidden}
.ms-top{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.ms-bar{flex:1;height:6px;border-radius:999px;background:var(--line);overflow:hidden}
.ms-bar i{display:block;height:100%;width:0;background:var(--accent);border-radius:999px;transition:width .45s cubic-bezier(.2,.8,.2,1)}
.ms-num{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.ms-view{position:relative}
.ms-step{display:none}
.ms-step.on{display:block;animation:msIn .38s cubic-bezier(.2,.8,.2,1)}
.ms-step.back.on{animation:msBack .38s cubic-bezier(.2,.8,.2,1)}
@keyframes msIn{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}
@keyframes msBack{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}
.ms-step h3{margin:0 0 6px;font-size:clamp(20px,2.2vw,28px)}
.ms-step p.sub{margin:0 0 18px;color:var(--muted);font-size:15px}
.ms-opts{display:grid;gap:10px}
.ms-opt{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:14px;padding:15px 16px;cursor:pointer;
  background:var(--bg);transition:border-color .22s,background .22s}
.ms-opt:hover{border-color:var(--accent)}
.ms-opt input{accent-color:var(--accent);width:18px;height:18px;flex:none}
.ms-opt.sel{border-color:var(--accent);background:#eceaff}
.ms-field input{width:100%;font:inherit;font-size:16px;padding:15px 16px;border:1px solid var(--line);border-radius:14px;background:var(--bg);color:var(--ink)}
.ms-field input:focus{outline:0;border-color:var(--accent)}
.ms-err{font-size:13px;color:#c2255c;margin-top:8px;display:none}
.ms-err.on{display:block}
.ms-nav{display:flex;gap:10px;margin-top:24px}
.ms-nav button{flex:1;min-height:50px;border-radius:999px;border:0;font:inherit;font-weight:600;font-size:16px;cursor:pointer}
.ms-back{background:var(--bg);border:1px solid var(--line)!important;color:var(--ink);flex:0 0 auto;padding-inline:22px}
.ms-next{background:var(--accent);color:#fff}
.ms-sum{list-style:none;margin:0 0 4px;padding:0;display:grid;gap:8px}
.ms-sum li{display:flex;justify-content:space-between;gap:16px;font-size:15px;border-bottom:1px dashed var(--line);padding-bottom:8px}
.ms-sum b{font-weight:600}
.ms-done{text-align:center;padding:10px 0}
.ms-done .ok{width:56px;height:56px;border-radius:50%;background:#2b8a3e;color:#fff;display:grid;place-items:center;font-size:26px;margin:0 auto 14px}
@media (prefers-reduced-motion: reduce){.ms-step.on{animation:none}}`,
  html:`<div class="stage tight"><form class="ms" novalidate>
  <div class="ms-top"><div class="ms-bar"><i></i></div><span class="ms-num"></span></div>
  <div class="ms-view">
    <section class="ms-step on" data-key="סוג הפרויקט">
      <h3>מה אתם צריכים?</h3><p class="sub">אפשר לבחור אחד</p>
      <div class="ms-opts">
        <label class="ms-opt"><input type="radio" name="type" value="אתר תדמית"><span>אתר תדמית</span></label>
        <label class="ms-opt"><input type="radio" name="type" value="דף נחיתה"><span>דף נחיתה</span></label>
        <label class="ms-opt"><input type="radio" name="type" value="חנות אונליין"><span>חנות אונליין</span></label>
      </div><p class="ms-err">צריך לבחור אפשרות אחת</p>
    </section>
    <section class="ms-step" data-key="תקציב">
      <h3>מה טווח התקציב?</h3><p class="sub">זה עוזר להתאים הצעה מדויקת</p>
      <div class="ms-opts">
        <label class="ms-opt"><input type="radio" name="budget" value="עד 8,000"><span>עד 8,000 ש"ח</span></label>
        <label class="ms-opt"><input type="radio" name="budget" value="8,000 עד 15,000"><span>8,000 עד 15,000 ש"ח</span></label>
        <label class="ms-opt"><input type="radio" name="budget" value="מעל 15,000"><span>מעל 15,000 ש"ח</span></label>
      </div><p class="ms-err">צריך לבחור טווח</p>
    </section>
    <section class="ms-step" data-key="פרטים">
      <h3>איך חוזרים אליכם?</h3><p class="sub">שם וטלפון, וזהו</p>
      <div class="ms-opts">
        <div class="ms-field"><input type="text" name="name" placeholder="שם מלא" autocomplete="name"></div>
        <div class="ms-field"><input type="tel" name="phone" placeholder="טלפון" autocomplete="tel"></div>
      </div><p class="ms-err">צריך שם וטלפון תקין</p>
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
  const last=steps.length-1;      // מסך התודה
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
      const li=document.createElement("li");
      li.innerHTML='<span>'+s.dataset.key+'</span><b>'+(txt||"")+'</b>';
      sum.appendChild(li);
    });
  }
  function show(n,dir){
    steps.forEach(s=>{s.classList.remove("on","back");});
    const s=steps[n];
    if(dir<0)s.classList.add("back");
    s.classList.add("on");
    i=n;
    bar.style.width=Math.round((Math.min(i,review)/review)*100)+"%";
    num.textContent=i<last?("שלב "+(i+1)+" מתוך "+(review+1)):"";
    back.style.visibility=(i===0||i===last)?"hidden":"visible";
    next.textContent=i===review?"שליחה":"המשך";
    form.querySelector(".ms-nav").style.display=i===last?"none":"flex";
    if(i===review)paintSummary();
  }
  next.addEventListener("click",()=>{
    if(i<review&&!valid(i)){steps[i].querySelector(".ms-err").classList.add("on");return;}
    show(Math.min(i+1,last),1);
  });
  back.addEventListener("click",()=>show(Math.max(0,i-1),-1));
  show(0,1);
})();`,
  runway:false,
  note:"שלושה דברים שמעלים השלמה: שאלה אחת במסך, פס התקדמות שאומר כמה נשאר, ומסך סיכום שמאפשר לחזור ולתקן לפני שליחה. הוולידציה נעשית במעבר בין שלבים ולא בסוף, כדי שלא יגלו בעיה אחרי חמישה מסכים. השדות שומרים על autocomplete כדי שהמילוי במובייל יהיה מהיר."
},
];
