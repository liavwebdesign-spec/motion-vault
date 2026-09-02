// סבב שלישי על גלריית Webflow (2.9.2026): 1,818 פרויקטים, ניתוח תדירות של מונחים
// חשף ארבעה רכיבים שחזרו על עצמם ולא היו במאגר.
export default [
{
  id:"b51", cat:"behavior", name:"באנר עוגיות עם הגדרות וזיכרון", tech:"localStorage · GSAP", status:"ממתין",
  desc:"באנר שעולה מלמטה עם שלוש אפשרויות: אישור הכל, רק ההכרחיות, או פאנל הגדרות עם מתגים לכל קטגוריה. הבחירה נשמרת, ויש כפתור קטן לשנות אותה אחר כך.",
  when:"כל אתר לקוח בלי יוצא מן הכלל. הרכיב מטפל בממשק ובשמירת הבחירה; אילו קטגוריות קיימות ומה הניסוח המשפטי זו החלטה של הלקוח ושל עורך הדין שלו.",
  libs:["gsap"],
  css:`.ck{position:fixed;inset-inline:16px;bottom:16px;z-index:70;max-width:560px;margin-inline:auto;
  background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px 22px;
  box-shadow:0 18px 50px rgba(20,20,40,.16)}
.ck[hidden]{display:none}
.ck h4{margin:0 0 8px;font-size:17px}
.ck p{margin:0 0 16px;font-size:14.5px;line-height:1.65;color:var(--muted)}
.ck p a{color:var(--accent)}
.ck-row{display:flex;gap:8px;flex-wrap:wrap}
.ck-btn{font-family:inherit;font-size:14px;padding:11px 18px;border-radius:999px;cursor:pointer;border:1px solid var(--line);
  background:var(--bg);color:var(--ink)}
.ck-btn.main{background:var(--ink);border-color:var(--ink);color:#fff}
.ck-btn.link{border-color:transparent;background:none;color:var(--muted);text-decoration:underline;padding-inline:8px}
.ck-prefs{margin:4px 0 16px;display:grid;gap:2px}
.ck-pref{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-top:1px solid var(--line)}
.ck-pref strong{display:block;font-size:14.5px;font-weight:600}
.ck-pref span{display:block;font-size:13px;color:var(--muted);line-height:1.55;margin-top:2px}
.ck-sw{flex:none;width:44px;height:26px;border-radius:999px;background:#d5d5e0;border:0;cursor:pointer;padding:0;
  position:relative;transition:background .2s}
.ck-sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;
  transition:transform .22s cubic-bezier(.2,.8,.2,1)}
.ck-sw[aria-checked="true"]{background:var(--accent)}
.ck-sw[aria-checked="true"]::after{transform:translateX(18px)}
.ck-sw[disabled]{opacity:.55;cursor:not-allowed}
.ck-reopen{position:fixed;inset-inline-start:16px;bottom:16px;z-index:69;font-family:inherit;font-size:13px;
  padding:9px 15px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--muted);cursor:pointer}
.ck-reopen[hidden]{display:none}
.ck-state{max-width:min(620px,94vw);margin-inline:auto;text-align:center;color:var(--muted);font-size:15px;line-height:1.8}
.ck-state code{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:3px 8px;font-size:13px}
@media (prefers-reduced-motion: reduce){.ck-sw::after{transition:none}}`,
  html:`<div class="stage tight"><p class="ck-state">הבאנר נפתח למטה. הבחירה נשמרת ב-localStorage תחת <code>mv-consent</code>,
  והכפתור הקטן בפינה מחזיר את ההגדרות. לבדיקה חוזרת: נקה אחסון או לחץ על הכפתור הקטן.</p></div>

<button class="ck-reopen" hidden>הגדרות עוגיות</button>
<div class="ck" role="dialog" aria-modal="false" aria-labelledby="ck-ttl" hidden>
  <h4 id="ck-ttl">אנחנו משתמשים בעוגיות</h4>
  <p>חלק מהעוגיות נחוצות לתפעול האתר, ואחרות עוזרות לנו להבין איך משתמשים בו. אפשר לאשר הכל, להסתפק בהכרחיות, או לבחור לפי קטגוריה.</p>
  <div class="ck-prefs" hidden>
    <div class="ck-pref"><button class="ck-sw" role="switch" aria-checked="true" disabled aria-label="עוגיות הכרחיות"></button>
      <div><strong>הכרחיות</strong><span>נדרשות לתפעול בסיסי: טעינת עמודים, טפסים ואבטחה. לא ניתן לכבות.</span></div></div>
    <div class="ck-pref"><button class="ck-sw" role="switch" aria-checked="false" data-cat="analytics" aria-label="עוגיות מדידה"></button>
      <div><strong>מדידה</strong><span>עוזרות לנו לראות אילו עמודים עובדים ואיפה אנשים נתקעים.</span></div></div>
    <div class="ck-pref"><button class="ck-sw" role="switch" aria-checked="false" data-cat="marketing" aria-label="עוגיות שיווק"></button>
      <div><strong>שיווק</strong><span>מאפשרות להתאים מודעות ולמדוד קמפיינים.</span></div></div>
  </div>
  <div class="ck-row">
    <button class="ck-btn main" data-act="all">מאשר הכל</button>
    <button class="ck-btn" data-act="necessary">רק ההכרחיות</button>
    <button class="ck-btn link" data-act="prefs">הגדרות</button>
    <button class="ck-btn main" data-act="save" hidden>שמור בחירה</button>
  </div>
</div>`,
  js:`(function(){
  const KEY="mv-consent",VER=1;
  const bar=document.querySelector(".ck"),prefs=bar.querySelector(".ck-prefs"),reopen=document.querySelector(".ck-reopen");
  const btn=a=>bar.querySelector('[data-act="'+a+'"]');
  const switches=[...bar.querySelectorAll(".ck-sw[data-cat]")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return v&&v.v===VER?v:null;}catch(e){return null;}};
  const write=cats=>{try{localStorage.setItem(KEY,JSON.stringify({v:VER,ts:Date.now(),cats:cats}));}catch(e){}};
  function open(){
    bar.hidden=false;reopen.hidden=true;
    if(reduce){gsap.set(bar,{y:0,opacity:1});return;}
    gsap.fromTo(bar,{y:40,opacity:0},{y:0,opacity:1,duration:.45,ease:"power3.out"});
  }
  function close(cats){
    write(cats);
    // כאן מפעילים בפועל את מה שאושר: טעינת סקריפט מדידה, פיקסל וכו'
    document.dispatchEvent(new CustomEvent("consent",{detail:cats}));
    const done=()=>{bar.hidden=true;prefs.hidden=true;btn("save").hidden=true;reopen.hidden=false;};
    if(reduce)return done();
    gsap.to(bar,{y:30,opacity:0,duration:.3,ease:"power2.in",onComplete:done});
  }
  const chosen=()=>({necessary:true,
    analytics:switches[0].getAttribute("aria-checked")==="true",
    marketing:switches[1].getAttribute("aria-checked")==="true"});
  switches.forEach(sw=>sw.addEventListener("click",()=>{
    sw.setAttribute("aria-checked",sw.getAttribute("aria-checked")==="true"?"false":"true");
  }));
  btn("all").addEventListener("click",()=>close({necessary:true,analytics:true,marketing:true}));
  btn("necessary").addEventListener("click",()=>close({necessary:true,analytics:false,marketing:false}));
  btn("save").addEventListener("click",()=>close(chosen()));
  btn("prefs").addEventListener("click",()=>{
    prefs.hidden=false;btn("save").hidden=false;btn("prefs").hidden=true;
    if(!reduce)gsap.from(prefs,{height:0,opacity:0,duration:.35,ease:"power2.out"});
    switches[0].focus();
  });
  reopen.addEventListener("click",()=>{
    const cur=read();
    if(cur)switches.forEach((sw,i)=>sw.setAttribute("aria-checked",String(!!cur.cats[i?"marketing":"analytics"])));
    prefs.hidden=false;btn("save").hidden=false;btn("prefs").hidden=true;open();
  });
  addEventListener("keydown",e=>{if(e.key==="Escape"&&!bar.hidden&&read())close(read().cats);});
  const saved=read();
  if(saved){reopen.hidden=false;document.dispatchEvent(new CustomEvent("consent",{detail:saved.cats}));}
  else setTimeout(open,600);   // רגע קצר לפני שקופצים, כדי שהעמוד ייטען קודם
})();`,
  runway:false,
  note:"שלושה דברים שהופכים באנר עוגיות מקישוט לרכיב אמיתי: \"רק ההכרחיות\" חייב להיות באותה בולטות כמו \"מאשר הכל\" ולא קישור קטן בצד, הבחירה חייבת להיות ניתנת לשינוי אחרי שסגרו (ומכאן הכפתור הקטן שנשאר בפינה), והמתגים בנויים כ-`role=\"switch\"` עם `aria-checked` ולא כ-div, כדי שקורא מסך יידע מה מסומן. השמירה כוללת מספר גרסה, כך שאם משנים קטגוריות אפשר לבקש הסכמה מחדש בלי למחוק ידנית. הרכיב משדר אירוע `consent` במקום להפעיל סקריפטים בעצמו, וזו נקודת החיבור לגוגל טאג מנג'ר."
},
{
  id:"g48", cat:"gsap", name:"פסקה שנצבעת מילה-מילה בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"פסקת מניפסט שמתחילה אפורה ונצבעת מילה אחרי מילה בקצב הגלילה, כשמילות המפתח מקבלות הדגשה צבעונית שנפתחת מאחוריהן.",
  when:"סקשן \"מי אנחנו\", אמירה עסקית, ערכים, פתיח למאמר. הדפוס הזה חזר בשלושה קלונאבלס נפרדים, והוא הופך פסקה שאף אחד לא קורא לרגע שעוצרים בשבילו.",
  libs:["gsap","ScrollTrigger"],
  css:`.hl{max-width:min(880px,92vw);margin-inline:auto;padding-block:34vh}
.hl p{margin:0;font-size:clamp(24px,3.4vw,46px);line-height:1.5;font-weight:600}
.hl .w{color:var(--muted);transition:none;position:relative;display:inline-block}
/* ההדגשה נפתחת מאחורי המילה. בעברית היא נפתחת מימין, מתחילת המילה */
.hl .mk{position:relative;z-index:0;display:inline-block;padding-inline:.14em;border-radius:.16em}
.hl .mk::before{content:"";position:absolute;inset:0;border-radius:.16em;background:var(--accent);
  transform:scaleX(var(--fill,0));transform-origin:right center;z-index:-1}
.hl-foot{text-align:center;color:var(--muted);font-size:14px;padding-bottom:12vh}`,
  html:`<div class="hl"><p id="hl-src">אנחנו לא בונים אתרים יפים. אנחנו בונים אתרים שמביאים פניות. ההבדל הוא לא בעיצוב אלא בסדר: קודם מבינים את הלקוח, אחר כך כותבים, ורק בסוף פותחים כלי עיצוב.</p></div>
<p class="hl-foot">גלול לאט. כל מילה נצבעת בתורה.</p>`,
  js:`(function(){
  const p=document.getElementById("hl-src");
  const MARK=["פניות","בסדר","הלקוח"];          // מילות המפתח שיקבלו הדגשה
  const bare=w=>w.replace(/[.,:;!?"'׳״]/g,"");   // סימני פיסוק נדבקים למילה ושוברים השוואה
  // פיצול למילים בלבד. בעברית לא מפצלים לאותיות: זה שובר ניקוד וקוראי מסך
  const words=p.textContent.trim().split(/\\s+/);
  p.textContent="";
  const marks=[];
  const spans=words.map((w,i)=>{
    const s=document.createElement("span");
    s.className="w";
    const core=bare(w);
    if(MARK.includes(core)){
      // ההדגשה עוטפת את המילה בלבד. סימן הפיסוק נשאר מחוץ לצבע
      const mk=document.createElement("span");
      mk.className="mk";mk.textContent=core;
      s.appendChild(mk);
      s.appendChild(document.createTextNode(w.slice(core.length)));
      marks.push({mk:mk,i:i});
    } else s.textContent=w;
    p.appendChild(s);
    if(i<words.length-1)p.appendChild(document.createTextNode(" "));
    return s;
  });
  const STEP=.35;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){
    gsap.set(spans,{color:"var(--ink)"});
    gsap.set(marks.map(m=>m.mk),{color:"#fff","--fill":1});
    return;
  }
  const tl=gsap.timeline({scrollTrigger:{trigger:".hl",start:"top 78%",end:"bottom 62%",scrub:.4}});
  tl.to(spans,{color:"var(--ink)",duration:.4,stagger:STEP,ease:"none"},0);
  // ההדגשה של כל מילת מפתח נפתחת בדיוק בזמן שהמילה שלה נצבעת
  marks.forEach(m=>{
    const at=m.i*STEP;
    tl.fromTo(m.mk,{"--fill":0},{"--fill":1,duration:.4,ease:"power2.out"},at)
      .to(m.mk,{color:"#fff",duration:.25},at+.1);
  });
})();`,
  runway:true,
  note:"ההדגשה חייבת להיות פסאודו-אלמנט מאחורי המילה ולא רקע על אותו אלמנט, אחרת אי אפשר להנפיש אותה בנפרד מצבע הטקסט. בעברית ה-transform-origin הוא right, כך שהצבע נפתח מהתחלת המילה. הפיצול הוא למילים בלבד: פיצול לאותיות בעברית שובר ניקוד ומייצר ג'יבריש בקורא מסך. ה-stagger הוא שמייצר את תחושת הקריאה, וה-scrub הקצר מונע תחושה שהטקסט רודף אחרי הגלילה."
},
{
  id:"b52", cat:"behavior", name:"הירו שמתקפל לתפריט דביק", tech:"GSAP · ScrollTrigger · sticky", status:"ממתין",
  desc:"הירו במסך מלא שמתכווץ בגלילה עד שהוא הופך לרצועת תפריט, ואז נשאר דבוק למעלה לשארית העמוד. אותו אלמנט לכל אורך הדרך, בלי החלפה בין שני מצבים.",
  when:"עמוד בית, עמוד שירות, תיק עבודות. פותר את המעבר המגושם בין הירו לתפריט הדביק, ונותן לגלילה הראשונה תחושת כוונה.",
  libs:["gsap","ScrollTrigger"],
  css:`.fu-scope{--fu-h:100vh}
.fu-mask{position:sticky;top:0;z-index:60;height:var(--fu-h);overflow:hidden;background:var(--ink);
  border-radius:0 0 var(--fu-r,0px) var(--fu-r,0px)}
.fu-media{position:absolute;inset:0;border-radius:0;font-size:0}
.fu-inner{position:absolute;inset:0;display:grid;grid-template-rows:auto 1fr;padding:18px clamp(16px,3vw,34px)}
.fu-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;color:#fff;height:56px}
.fu-logo{font-weight:800;font-size:19px}
.fu-links{display:flex;gap:20px;font-size:14px;opacity:.9}
.fu-links a{color:#fff;text-decoration:none}
.fu-title{align-self:center;color:#fff;margin:0;font-size:clamp(32px,7vw,90px);line-height:1.05;max-width:14ch}
/* המרווח המשלים: מה שהמסכה מאבדת בגובה הוא מקבל, ולכן העמוד לא קופץ תוך כדי הקיפול */
.fu-gap{height:calc(100vh - var(--fu-h))}
.fu-body{padding:clamp(30px,6vw,80px) var(--gutter) 20vh;max-width:min(760px,92vw);margin-inline:auto}
.fu-body h3{font-size:clamp(22px,3vw,36px);margin:0 0 12px}
.fu-body p{color:var(--muted);font-size:17px;line-height:1.8;margin:0 0 22px}
@media(max-width:700px){.fu-links{display:none}}`,
  html:`<div class="fu-scope">
  <div class="fu-mask">
    <div class="ph fu-media ph-b"></div>
    <div class="fu-inner">
      <div class="fu-nav"><span class="fu-logo">סטודיו</span>
        <nav class="fu-links"><a href="#">עבודות</a><a href="#">שירותים</a><a href="#">אודות</a><a href="#">צור קשר</a></nav>
      </div>
      <h1 class="fu-title">אתרים שמביאים פניות</h1>
    </div>
  </div>
  <div class="fu-gap"></div>
  <div class="fu-body">
    <h3>מה קורה כאן</h3>
    <p>הירו לא נעלם ולא מוחלף בתפריט אחר. אותו אלמנט מתכווץ עד לגובה רצועה, והכותרת יוצאת ממנו תוך כדי. זה מה שגורם למעבר להרגיש כמו תנועה אחת ולא כמו שני מצבים.</p>
    <p>הגובה הסופי נמדד מהתפריט עצמו ולא מוזן כמספר קבוע, ולכן זה מחזיק גם כשמשנים לוגו, פונט או ריפוד.</p>
    <p>גלול חזרה למעלה כדי לראות את זה נפתח בחזרה.</p>
  </div>
</div>`,
  js:`(function(){
  const scope=document.querySelector(".fu-scope"),nav=scope.querySelector(".fu-nav"),title=scope.querySelector(".fu-title");
  let tl;
  function build(){
    if(tl){tl.scrollTrigger&&tl.scrollTrigger.kill();tl.kill();gsap.set([scope,title],{clearProps:"all"});}
    // הגובה הסופי נמדד מהתפריט האמיתי, כדי שלא יהיה מספר קסם בקוד
    const navH=nav.offsetHeight+36;
    gsap.set(scope,{"--fu-h":"100vh","--fu-r":"0px"});
    tl=gsap.timeline({scrollTrigger:{trigger:scope,start:"top top",end:"+=100%",scrub:.8}});
    tl.to(scope,{"--fu-h":navH+"px","--fu-r":"22px",ease:"none"},0)
      .to(title,{opacity:0,y:-30,ease:"none"},0);
  }
  build();
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{build();ScrollTrigger.refresh();},200);});
})();`,
  runway:true,
  note:"הטריק הוא שאין שני אלמנטים: התפריט חי בתוך הירו מהרגע הראשון, והירו הוא זה שמתכווץ סביבו. `overflow:hidden` על המסכה הוא מה שגורם לתמונה להיחתך במקום להתכווץ, וזה מה שמייצר את תחושת הקיפול. **שתי הכרעות מבנה**: הדביקות היא `position:sticky` על מעטפת שעוטפת את כל תוכן העמוד, ולכן הרצועה נשארת למעלה עד הסוף בלי `position:fixed`; וכל מה שהמסכה מאבדת בגובה עובר למרווח משלים, אחרת העמוד היה מתקצר תוך כדי הגלילה והתנועה הייתה מקרטעת. ניסיון לעשות את זה עם `pin` נשבר: ScrollTrigger מניח טרנספורם על האלמנט המוצמד, וטרנספורם על אב שובר `position:fixed` של צאצא."
},
{
  id:"b53", cat:"behavior", name:"מילים שמתעבות לפי קרבת הסמן", tech:"Variable font · GSAP ticker", status:"ממתין",
  desc:"כותרת או תפריט שבהם כל מילה מתעבה ככל שהעכבר מתקרב אליה ונרגעת כשהוא מתרחק. תנועה רציפה, בלי מצבי הובר בינאריים.",
  when:"תפריט ראשי, כותרת הירו, רשימת שירותים, פוטר. מיקרו-אינטראקציה אחת שנותנת לעמוד שלם תחושת חיים, בלי אנימציה שגוזלת תשומת לב.",
  libs:["gsap"],
  css:`.vf{max-width:min(900px,92vw);margin-inline:auto;text-align:center}
.vf-title{font-size:clamp(30px,6.5vw,84px);line-height:1.18;margin:0 0 clamp(26px,4vw,50px);
  font-variation-settings:"wght" 400}
.vf-menu{display:flex;gap:clamp(16px,3vw,42px);justify-content:center;flex-wrap:wrap;
  border-top:1px solid var(--line);padding-top:clamp(20px,3vw,34px)}
.vf-menu .vw{font-size:clamp(17px,2vw,26px)}
/* הרכיב מכריז על הפונט המשתנה בעצמו: בסטאק של האתר יכול לשבת פונט סטטי, ואז לציר אין משמעות */
.vf-title,.vf-menu,.vw{font-family:Heebo,system-ui,sans-serif}
.vw{display:inline-block;font-variation-settings:"wght" 400;will-change:font-variation-settings}
.vf-hint{text-align:center;color:var(--muted);font-size:14px;padding-top:26px}
@media(hover:none){.vf-hint::after{content:" (במגע האפקט כבוי, והטקסט נשאר במשקל הרגיל)"}}`,
  html:`<div class="stage tight"><div class="vf">
  <h2 class="vf-title" data-vf>אנחנו בונים אתרים שאנשים זוכרים</h2>
  <nav class="vf-menu"><span data-vf>עבודות</span><span data-vf>שירותים</span><span data-vf>תהליך</span><span data-vf>אודות</span><span data-vf>צור קשר</span></nav>
  <p class="vf-hint">הזז את העכבר מעל הטקסט.</p>
</div></div>`,
  js:`(function(){
  const MIN=300,MAX=800,RADIUS=260;
  if(matchMedia("(hover:none)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const items=[];
  document.querySelectorAll("[data-vf]").forEach(el=>{
    // פיצול למילים בלבד: בעברית פיצול לאותיות שובר ניקוד ומייצר ג'יבריש בקורא מסך
    const parts=el.textContent.trim().split(/\\s+/);
    el.textContent="";
    parts.forEach((w,i)=>{
      const s=document.createElement("span");s.className="vw";s.textContent=w;
      el.appendChild(s);
      if(i<parts.length-1)el.appendChild(document.createTextNode(" "));
      items.push({el:s,cur:400,target:400});
    });
  });
  let mx=-9999,my=-9999,boxes=[];
  const measure=()=>{boxes=items.map(it=>{const r=it.el.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2};});};
  measure();
  addEventListener("scroll",measure,{passive:true});
  addEventListener("resize",measure);
  addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;});
  addEventListener("mouseleave",()=>{mx=my=-9999;});
  // ticker אחד לכל המילים: זול בהרבה מטוויין נפרד לכל אחת, ומייצר תנועה רציפה
  gsap.ticker.add(()=>{
    for(let i=0;i<items.length;i++){
      const b=boxes[i];if(!b)continue;
      const d=Math.hypot(mx-b.x,my-b.y);
      const f=Math.max(0,1-d/RADIUS);
      items[i].target=MIN+(MAX-MIN)*(f*f);        // ריבוע: הדעיכה מהירה יותר, וזה מרגיש מגנטי
      items[i].cur+=(items[i].target-items[i].cur)*.14;
      const v=items[i].cur.toFixed(0);
      items[i].el.style.fontVariationSettings='"wght" '+v;
      items[i].el.style.fontWeight=v;      // נפילה רכה: בפונט סטטי לפחות מקבלים מדרגות
    }
  });
})();`,
  runway:false,
  note:"זה עובד רק עם פונט משתנה שיש לו ציר wght רציף, ורק אם הוא באמת זה שמצויר. **המלכודת שנתפסה כאן**: בסטאק של האתר ישב פונט סטטי לפני Heebo, ולכן `font-variation-settings` נכתב כסגנון אבל לא שינה כלום. לכן הרכיב מצהיר על משפחת הפונט בעצמו, ו-Heebo נטען בטווח `wght@100..900` ולא בערכים בדידים. שני דברים חשובים לביצועים: מודדים את מיקומי המילים פעם אחת ולא בכל פריים, ומשתמשים ב-ticker אחד במקום בטוויין לכל מילה. הדעיכה בריבוע היא מה שנותן את התחושה המגנטית; דעיכה לינארית מרגישה כמו זרקור. במגע האפקט כבוי לגמרי, כי אין שם סמן."
},
];
