// Behaviors B1-B16 (מקור: references/library/behaviors.md + engine/motion.md)
export default [
{
  id:"b01", cat:"behavior", name:"מרקי (רצועה נעה)", tech:"CSS keyframes + שכפול מדוד", status:"ממתין",
  desc:"רצועת תוכן שזורמת בלולאה מושלמת: העותקים משוכפלים לפי רוחב המסך, ההזזה היא רוחב קבוצה מדויק, ומסכת קצה ממיסה את החיתוך. הובר עוצר.",
  when:"נקודות אמון בתחתית הירו, רצועת לוגואים, פסי אווירה.",
  css:`.marq{overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);border-block:1px solid var(--line);background:#fff;padding-block:22px}
/* ההזזה היא רוחב קבוצה אחת בפיקסלים (משתנה שנקבע ב-JS), ולא אחוז מהרצועה.
   אחוז נשבר ברגע שמספר העותקים משתנה, ופיקסלים מדויקים תמיד. */
.marq-track{display:flex;width:max-content;animation:marq linear infinite;animation-duration:var(--marq-dur,32s)}
.marq:hover .marq-track{animation-play-state:paused}
/* הריווח בין הקבוצות יושב על כל קבוצה בצד הפנימי, ולכן גם התפר וגם הסגירה זהים */
.marq-set{display:flex;gap:56px;padding-inline-end:56px}
.marq-track span{font-weight:800;font-size:22px;color:#c3c5d6;white-space:nowrap}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(var(--marq-shift,50%))}}`,
  html:`<div class="stage tight full"><div class="marq" aria-hidden="true"><div class="marq-track">
<div class="marq-set"><span>אמינות</span><span>·</span><span>מקצועיות</span><span>·</span><span>שירות</span><span>·</span><span>ניסיון</span><span>·</span></div>
</div></div></div>`,
  js:`(function(){
  // כמה עותקים צריך: אחרי הזזה של קבוצה אחת, מה שנשאר חייב עדיין לכסות את כל הרוחב.
  // שני עותקים בלבד משאירים שטח ריק בקצה ברגע שהקבוצה צרה מהמסך.
  function build(marq){
    const track=marq.querySelector(".marq-track");
    const proto=track.firstElementChild;
    [...track.children].slice(1).forEach(c=>c.remove());
    const setW=proto.getBoundingClientRect().width;
    if(!setW)return;
    const need=Math.ceil(marq.getBoundingClientRect().width/setW)+1;
    for(let i=1;i<need;i++){
      const c=proto.cloneNode(true);c.setAttribute("aria-hidden","true");track.appendChild(c);
    }
    track.style.setProperty("--marq-shift",setW+"px");
    // מהירות אחידה בפיקסלים לשנייה, כדי שתוכן ארוך לא ירוץ מהר יותר
    track.style.setProperty("--marq-dur",(setW/55).toFixed(2)+"s");
  }
  const all=[...document.querySelectorAll(".marq")];
  all.forEach(build);
  // מדידה לפני שהפונט נטען נותנת רוחב קטן יותר, וההזזה יוצאת קצרה מקבוצה שלמה: קפיצה בכל סיבוב
  if(document.fonts)document.fonts.ready.then(()=>all.forEach(build));
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>all.forEach(build),200);});
})();`, runway:false
},
{
  id:"b02", cat:"behavior", name:"Count-Up (מספר שסופר)", tech:"vanilla JS · IntersectionObserver", status:"מאושר",
  desc:"מספר גדול שנספר פעם אחת כשהוא נכנס למסך, עם ease-out טבעי ושמירת סיומת.",
  when:"סקשן מספרים ונתונים. פעם אחת, לא בכל גלילה.",
  css:`.cnums{display:flex;gap:clamp(40px,5vw,110px);flex-wrap:wrap;justify-content:center}
.cnum{font-size:clamp(48px,4vw,96px);font-weight:700}
.cnums small{display:block;color:var(--muted);font-size:15px;text-align:center}`,
  html:`<div class="stage tight center"><div class="cnums">
<div><span class="cnum" data-count="340" data-suffix="+">0</span><small>לקוחות</small></div>
<div><span class="cnum" data-count="97" data-suffix="%">0</span><small>שביעות רצון</small></div>
<div><span class="cnum" data-count="12" data-suffix="">0</span><small>שנות ניסיון</small></div>
</div></div>`,
  js:`const io=new IntersectionObserver(es=>{es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,to=+el.dataset.count,sfx=el.dataset.suffix||"";let t0=null;
  function step(ts){if(!t0)t0=ts;const p=Math.min((ts-t0)/900,1);
    el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+sfx;
    if(p<1)requestAnimationFrame(step);}
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches)requestAnimationFrame(step);
  else el.textContent=to+sfx;
  io.unobserve(el);
})},{threshold:.6});
document.querySelectorAll(".cnum").forEach(el=>io.observe(el));`
},
{
  id:"b02b", cat:"behavior", name:"Hotspots על תמונה עם רשימה מסונכרנת", tech:"CSS + GSAP pop", status:"מאושר",
  desc:"נקודות ממוספרות על תמונה, כל אחת פותחת כרטיס מידע בהובר; הובר על נקודה מדליק את השורה ברשימה ולהפך.",
  when:"תוכן שמצביע על אזורים בתמונה: נכס, מוצר, תרשים. במובייל הנקודות נעלמות והרשימה נושאת הכל.",
  libs:["gsap","ScrollTrigger"],
  css:`.hs-wrap{display:grid;grid-template-columns:1.2fr .8fr;gap:var(--gap);padding-inline:var(--gutter);align-items:start}
.hs-img{position:relative;aspect-ratio:4/3;border-radius:var(--r);font-size:20px}
.hs-dot{position:absolute;width:34px;height:34px;border-radius:50%;background:#f4c660;color:#16182b;font-weight:800;display:flex;align-items:center;justify-content:center;cursor:pointer;border:3px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.25);transition:transform .2s;opacity:0;scale:.3}
.hs-dot:hover{transform:scale(1.15)}
.hs-tip{position:absolute;bottom:130%;inset-inline-start:50%;translate:50% 0;background:#16182b;color:#fff;font-size:13px;padding:8px 14px;border-radius:8px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}
.hs-dot:hover .hs-tip{opacity:1}
.hs-list{display:flex;flex-direction:column;gap:10px}
.hs-row{display:flex;gap:12px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 18px;transition:border-color .2s,background .2s}
.hs-row.on{border-color:#f4c660;background:#fffaf0}
.hs-row b{width:28px;height:28px;border-radius:50%;background:#f4c660;color:#16182b;display:flex;align-items:center;justify-content:center;font-size:14px;flex:none}
@media(max-width:767px){.hs-wrap{grid-template-columns:1fr}.hs-dot{display:none}}`,
  html:`<div class="stage tight"><div class="hs-wrap">
<div class="hs-img ph ph-c">תמונת הנכס
  <div class="hs-dot" data-i="1" style="top:24%;inset-inline-start:30%">1<span class="hs-tip">מטבח מרווח עם אי</span></div>
  <div class="hs-dot" data-i="2" style="top:56%;inset-inline-start:62%">2<span class="hs-tip">סלון עם יציאה למרפסת</span></div>
  <div class="hs-dot" data-i="3" style="top:74%;inset-inline-start:22%">3<span class="hs-tip">חדר שינה ראשי</span></div>
</div>
<div class="hs-list">
  <div class="hs-row" data-i="1"><b>1</b>מטבח מרווח עם אי</div>
  <div class="hs-row" data-i="2"><b>2</b>סלון עם יציאה למרפסת</div>
  <div class="hs-row" data-i="3"><b>3</b>חדר שינה ראשי</div>
</div>
</div></div>`,
  js:`gsap.to(".hs-dot",{opacity:1,scale:1,ease:"back.out(2.4)",duration:.5,stagger:.12,
  scrollTrigger:{trigger:".hs-img",start:"top 70%"}});
function sync(i,on){
  document.querySelectorAll('[data-i="'+i+'"]').forEach(el=>{
    if(el.classList.contains("hs-row"))el.classList.toggle("on",on);
    else el.style.transform=on?"scale(1.15)":"";
  });
}
document.querySelectorAll("[data-i]").forEach(el=>{
  el.addEventListener("mouseenter",()=>sync(el.dataset.i,true));
  el.addEventListener("mouseleave",()=>sync(el.dataset.i,false));
});`
},
{
  id:"b03", cat:"behavior", name:"CTA דביק חכם", tech:"vanilla JS · IntersectionObserver", status:"מאושר",
  desc:"כפתור צף שמופיע רק כשאף CTA ראשי לא נמצא על המסך, ונעלם כשיש.",
  when:"עמודים ארוכים. במובייל בר תחתון מלא עם safe-area.",
  css:`.cta-hero{padding:60px var(--gutter);text-align:center}
.stickycta{position:fixed;bottom:24px;inset-inline-start:24px;z-index:80;opacity:0;translate:0 12px;pointer-events:none;transition:opacity .24s,translate .24s}
.stickycta.show{opacity:1;translate:0 0;pointer-events:auto}
.stickycta .gbtn{box-shadow:0 8px 24px rgba(74,58,255,.35)}
.filler{height:120vh;display:flex;align-items:center;justify-content:center;color:#c3c5d6}`,
  html:`<div class="cta-hero"><button class="gbtn main-cta">הכפתור הראשי (כשאני נראה, הצף נעלם)</button></div>
<div class="filler">גלול. כשהכפתור הראשי ייצא מהמסך, יופיע כפתור צף</div>
<div class="cta-hero"><button class="gbtn main-cta">עוד כפתור ראשי בתחתית</button></div>
<div class="stickycta"><button class="gbtn">בואו נדבר</button></div>`,
  js:`const sticky=document.querySelector(".stickycta");let visible=new Set();
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{e.isIntersecting?visible.add(e.target):visible.delete(e.target)});
  sticky.classList.toggle("show",visible.size===0);
},{rootMargin:"-72px"});
document.querySelectorAll(".main-cta").forEach(el=>io.observe(el));`,
  runway:false
},
{
  id:"b04", cat:"behavior", name:"קרוסלת מובייל עם Peek", tech:"CSS scroll-snap", status:"מאושר",
  desc:"גלילה אופקית עם snap רך (proximity, לא mandatory) והצצה לקלף הבא, כדי שהגולש ידע שיש עוד. בעכבר נוספת גרירה וגלגלת, אחרת בדסקטופ הרצועה נראית תקועה.",
  when:"מחירון וכרטיסים במובייל. בדסקטופ פורשים בגריד.",
  css:`.peek{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x proximity;padding:10px var(--gutter) 26px;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.peek::-webkit-scrollbar{display:none}
.peek .ph{flex:0 0 72%;max-width:340px;height:220px;scroll-snap-align:center;font-size:20px}
.peek .spacer{flex:0 0 8%}`,
  html:`<div class="stage tight"><div class="peek">
<div class="ph ph-a">בסיסי</div><div class="ph ph-b">מומלץ</div><div class="ph ph-c">פרימיום</div><div class="ph ph-d">ארגוני</div>
<div class="spacer"></div>
</div><p class="center" style="color:var(--muted);font-size:13px">גרור עם העכבר, או גלגל למטה מעל הרצועה</p></div>`,
  js:`(function(){
  const el=document.querySelector(".peek");
  // במובייל הגלילה נטיבית ועובדת. בדסקטופ אין מגע, פס הגלילה מוסתר בכוונה,
  // והקרוסלה נראית מתה לגמרי. לכן בעכבר מוסיפים גרירה וגלגלת.
  if(!matchMedia("(pointer:fine)").matches)return;
  const rtl=getComputedStyle(el).direction==="rtl";
  el.style.cursor="grab";
  let down=false,sx=0,sl=0;
  el.addEventListener("pointerdown",e=>{
    down=true;sx=e.clientX;sl=el.scrollLeft;el.style.cursor="grabbing";
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove",e=>{if(down)el.scrollLeft=sl-(e.clientX-sx)});
  const up=e=>{if(!down)return;down=false;el.style.cursor="grab";
    try{el.releasePointerCapture(e.pointerId)}catch(_){}}; 
  el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  el.addEventListener("wheel",e=>{
    if(Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;
    e.preventDefault();el.scrollLeft+=(rtl?-1:1)*e.deltaY;
  },{passive:false});
})();`, runway:false
},





{
  id:"b10", cat:"behavior", name:"קווי שיער (Hairlines)", tech:"CSS gradient", status:"מאושר",
  desc:"מפריד בגובה פיקסל שנמס בקצוות במקום להיחתך.",
  when:"הפרדות עדינות בין בלוקים בלי משקל ויזואלי.",
  css:`.hl{height:1px;background:linear-gradient(90deg,transparent,#b9bbd4,transparent);margin:40px var(--gutter)}
.hl.accent{background:linear-gradient(90deg,transparent,var(--accent),transparent)}`,
  html:`<div class="stage tight center"><p>בלוק תוכן ראשון</p><div class="hl"></div><p>בלוק תוכן שני</p><div class="hl accent"></div><p>וגרסת ה-accent העדינה</p></div>`,
  js:``, runway:false
},
{
  id:"b11", cat:"behavior", name:"נקודת דופק (Pulse)", tech:"CSS keyframes", status:"מאושר",
  desc:"נקודה ירוקה עם גלי דופק. אינדיקטור חי שמושך תשומת לב בעדינות.",
  when:"זמין עכשיו, שידור חי, סטטוס מערכת.",
  css:`.pulse-row{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:10px 22px}
.pdot2{position:relative;width:10px;height:10px;border-radius:50%;background:#12b76a}
.pdot2::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:2px solid #12b76a;animation:pulse 1.6s ease-out infinite}
@keyframes pulse{from{transform:scale(.6);opacity:1}to{transform:scale(1.8);opacity:0}}
@media(prefers-reduced-motion:reduce){.pdot2::after{animation:none;display:none}}`,
  html:`<div class="stage tight center"><span class="pulse-row"><span class="pdot2"></span>זמינים לפרויקט חדש</span></div>`,
  js:``, runway:false
},
{
  id:"b12", cat:"behavior", name:"תמונה על בלוב", tech:"CSS border-radius אורגני", status:"מאושר",
  desc:"ויז'ואל שיושב על צורה אורגנית בגרדיאנט במקום מלבן משעמם.",
  when:"הירו ואודות בעורות רכים.",
  css:`.blobw{position:relative;width:min(440px,76vw);margin-inline:auto}
.blob{position:absolute;inset:-9%;background:linear-gradient(140deg,#d0bfff,#91d5ff);border-radius:58% 42% 55% 45%/45% 58% 42% 55%;z-index:0}
.blobw .ph{position:relative;z-index:1;aspect-ratio:4/5;border-radius:24px;font-size:20px}`,
  html:`<div class="stage tight"><div class="blobw"><div class="blob"></div><div class="ph ph-b">התמונה שלך</div></div></div>`,
  js:``, runway:false
},
{
  id:"b13", cat:"behavior", name:"תכשיטי צורה", tech:"CSS", status:"מאושר",
  desc:"צורות גיאומטריות קטנות שמתבלות סקשן בלי להעמיס. אפס באזורי פעולה.",
  when:"עורות playful וממפיס. אחת-שתיים לסקשן.",
  css:`.jw{position:relative;padding:80px var(--gutter);text-align:center;overflow:hidden}
.jw .j{position:absolute;z-index:0}
.j1{width:46px;height:46px;border-radius:50%;background:#ffd43b;top:18%;inset-inline-start:16%}
.j2{width:34px;height:34px;background:#63e6be;transform:rotate(45deg);bottom:20%;inset-inline-end:18%}
.j3{width:0;height:0;border-inline:20px solid transparent;border-bottom:34px solid #ff8787;top:30%;inset-inline-end:30%}
.jw h2{position:relative;z-index:1;font-size:var(--fs-h2)}`,
  html:`<div class="jw"><span class="j j1"></span><span class="j j2"></span><span class="j j3"></span><h2>הכותרת במרכז, התכשיטים מסביב</h2></div>`,
  js:``, runway:false
},
{
  id:"b14", cat:"behavior", name:"פרלקס עדין (translate3d)", tech:"vanilla JS · rAF", status:"מאושר",
  desc:"רקע שנע לאט מהתוכן. עומק מינימלי, ביצועים מקסימליים.",
  when:"רקעי סקשן. במובייל מקדם חצי או כבוי.",
  css:`.pxs{position:relative;height:70vh;overflow:hidden;border-radius:var(--r);margin-inline:var(--gutter);display:flex;align-items:center;justify-content:center}
.pxbg{position:absolute;inset:-20% 0;background:linear-gradient(150deg,#1b2653,#3b5bdb);z-index:0}
.pxs h2{position:relative;z-index:1;color:#fff;font-size:var(--fs-h2)}`,
  html:`<div class="stage tight"><div class="pxs"><div class="pxbg"></div><h2>הרקע זז לאט ממני</h2></div></div>`,
  js:`const bg=document.querySelector(".pxbg"),wrap=document.querySelector(".pxs");
let tick=false;
function frame(){tick=false;
  const r=wrap.getBoundingClientRect();
  const p=(innerHeight-r.top)/(innerHeight+r.height);
  bg.style.transform="translate3d(0,"+((p-.5)*80)+"px,0)";}
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
frame();`
},
{
  id:"b15", cat:"behavior", name:"שלדים (Skeletons)", tech:"CSS keyframes", status:"מאושר",
  desc:"מצייני טעינה בצורת התוכן עם הבהוב שמאלה-ימינה, במקום ספינר.",
  when:"מערכות ודשבורדים בזמן טעינת דאטה.",
  css:`.sk-card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:22px;max-width:420px;margin-inline:auto;display:flex;flex-direction:column;gap:12px}
.sk{background:linear-gradient(90deg,#ececf4 25%,#f7f7fa 50%,#ececf4 75%);background-size:200% 100%;animation:sk 1.4s infinite;border-radius:8px}
@keyframes sk{from{background-position:200% 0}to{background-position:-200% 0}}
@media(prefers-reduced-motion:reduce){.sk{animation:none}}`,
  html:`<div class="stage tight"><div class="sk-card">
<div class="sk" style="height:120px"></div>
<div class="sk" style="height:18px;width:70%"></div>
<div class="sk" style="height:14px"></div>
<div class="sk" style="height:14px;width:85%"></div>
</div></div>`,
  js:``, runway:false
},
{
  id:"b16", cat:"behavior", name:"Toast (הודעה קופצת)", tech:"CSS transitions · vanilla JS", status:"מאושר",
  desc:"הודעת אישור קטנה שעולה מהפינה, נשארת שלוש שניות ונעלמת.",
  when:"אחרי שליחת טופס, העתקה, שמירה.",
  css:`.toast{position:fixed;bottom:24px;inset-inline-start:50%;translate:-50% 20px;background:#16182b;color:#fff;padding:13px 26px;border-radius:12px;font-size:15px;opacity:0;transition:opacity .24s,translate .24s;z-index:95;display:flex;gap:10px;align-items:center}
html[dir="rtl"] .toast{translate:50% 20px}
.toast.on{opacity:1;translate:-50% 0}
html[dir="rtl"] .toast.on{translate:50% 0}
.toast b{color:#12b76a}`,
  html:`<div class="stage tight center"><button class="gbtn show-t">שלח טופס (דמו)</button></div>
<div class="toast"><b>✓</b>קיבלנו! נחזור אליכם היום</div>`,
  js:`let tmr;
document.querySelector(".show-t").addEventListener("click",()=>{
  const t=document.querySelector(".toast");
  t.classList.add("on");clearTimeout(tmr);
  tmr=setTimeout(()=>t.classList.remove("on"),3000);
});`,
  runway:false
}
];
