// Behaviors B1-B16 (מקור: references/library/behaviors.md + engine/motion.md)
export default [
{
  id:"b01", cat:"behavior", name:"מרקי (רצועה נעה)", tech:"CSS keyframes", status:"מאושר",
  desc:"רצועת תוכן שזורמת בלולאה מושלמת: התוכן משוכפל פעמיים בדיוק, מסכת קצה ממיסה את החיתוך, והובר עוצר.",
  when:"נקודות אמון בתחתית הירו, רצועת לוגואים, פסי אווירה.",
  css:`.marq{overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);border-block:1px solid var(--line);background:#fff;padding-block:22px}
.marq-track{display:inline-flex;gap:56px;padding-inline-end:56px;animation:marq 32s linear infinite}
.marq:hover .marq-track{animation-play-state:paused}
.marq-track span{font-weight:800;font-size:22px;color:#c3c5d6}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(50%)}}`,
  html:`<div class="stage tight full"><div class="marq" aria-hidden="true"><div class="marq-track">
<span>אמינות</span><span>·</span><span>מקצועיות</span><span>·</span><span>שירות</span><span>·</span><span>ניסיון</span><span>·</span>
<span>אמינות</span><span>·</span><span>מקצועיות</span><span>·</span><span>שירות</span><span>·</span><span>ניסיון</span><span>·</span>
</div></div></div>`,
  js:``, runway:false
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
  desc:"גלילה אופקית עם snap רך (proximity, לא mandatory) והצצה לקלף הבא, כדי שהגולש ידע שיש עוד.",
  when:"מחירון וכרטיסים במובייל. בדסקטופ פורשים בגריד.",
  css:`.peek{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x proximity;padding:10px var(--gutter) 26px;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent);mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.peek::-webkit-scrollbar{display:none}
.peek .ph{flex:0 0 72%;max-width:340px;height:220px;scroll-snap-align:center;font-size:20px}
.peek .spacer{flex:0 0 8%}`,
  html:`<div class="stage tight"><div class="peek">
<div class="ph ph-a">בסיסי</div><div class="ph ph-b">מומלץ</div><div class="ph ph-c">פרימיום</div><div class="ph ph-d">ארגוני</div>
<div class="spacer"></div>
</div><p class="center" style="color:var(--muted);font-size:13px">גרור הצידה (או צפה במובייל)</p></div>`,
  js:``, runway:false
},
{
  id:"b05", cat:"behavior", name:"מודאל / Bottom-Sheet", tech:"CSS transitions · vanilla JS", status:"מאושר",
  desc:"במובייל גיליון שעולה מלמטה עם ידית; בדסקטופ דיאלוג ממורכז. סגירה ב-Escape ובלחיצה על הרקע.",
  when:"טפסים קופצים, פרטים נוספים, אישורים.",
  css:`.modal-bg{position:fixed;inset:0;background:rgba(22,24,43,.45);opacity:0;pointer-events:none;transition:opacity .28s;z-index:90}
.modal-bg.on{opacity:1;pointer-events:auto}
.sheet{position:fixed;z-index:91;background:#fff;transition:translate .32s cubic-bezier(.2,.6,.2,1),opacity .32s}
@media(max-width:767px){.sheet{inset-inline:0;bottom:0;border-radius:20px 20px 0 0;padding:16px 22px 34px;translate:0 100%}
.sheet.on{translate:0 0}
.sheet .handle{width:40px;height:4px;border-radius:99px;background:#d5d5e2;margin:0 auto 18px}}
@media(min-width:768px){.sheet{top:50%;inset-inline-start:50%;translate:50% calc(-50% + 16px);width:min(440px,90vw);border-radius:18px;padding:28px 32px;opacity:0;pointer-events:none}
.sheet.on{translate:50% -50%;opacity:1;pointer-events:auto}
.sheet .handle{display:none}}`,
  html:`<div class="stage tight center"><button class="gbtn open-m">פתח מודאל</button></div>
<div class="modal-bg"></div>
<div class="sheet"><div class="handle"></div><h3 style="margin:0 0 8px">כותרת המודאל</h3><p style="color:var(--muted);margin:0 0 18px">בדסקטופ אני דיאלוג ממורכז, במובייל גיליון מלמטה. נסה גם Escape.</p><button class="gbtn close-m">סגור</button></div>`,
  js:`const bg=document.querySelector(".modal-bg"),sh=document.querySelector(".sheet");
function setM(on){bg.classList.toggle("on",on);sh.classList.toggle("on",on);document.body.style.overflow=on?"hidden":""}
document.querySelector(".open-m").addEventListener("click",()=>setM(true));
document.querySelector(".close-m").addEventListener("click",()=>setM(false));
bg.addEventListener("click",()=>setM(false));
addEventListener("keydown",e=>{if(e.key==="Escape")setM(false)});`,
  runway:false
},
{
  id:"b06", cat:"behavior", name:"כרטיסי נתון צפים על ויז'ואל", tech:"CSS absolute", status:"מאושר",
  desc:"שני כרטיסי מספר קטנים צפים בפינות מנוגדות של ויז'ואל, חצי בפנים חצי בחוץ. זה מה שמוכר את העומק.",
  when:"הירו עם תמונה, הדגמת מערכת. במובייל מוסתרים או יורדים לשורת צ'יפים.",
  css:`.fv-wrap{position:relative;width:min(620px,82vw);margin-inline:auto}
.fv-img{aspect-ratio:16/10;font-size:22px}
.fstat{position:absolute;background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 20px;box-shadow:0 14px 40px rgba(22,24,43,.13)}
.fstat b{display:block;font-size:26px;color:var(--accent)}
.fstat small{color:var(--muted);font-size:13px}
.fs1{top:-24px;inset-inline-end:-20px}
.fs2{bottom:-24px;inset-inline-start:-20px}
@media(max-width:767px){.fstat{display:none}}`,
  html:`<div class="stage tight"><div class="fv-wrap">
<div class="fv-img ph ph-b">הוויז'ואל המרכזי</div>
<div class="fstat fs1"><b>97%</b><small>שיפור מדיד</small></div>
<div class="fstat fs2"><b>+340</b><small>לקוחות פעילים</small></div>
</div></div>`,
  js:``, runway:false
},
{
  id:"b07", cat:"behavior", name:"כרטיס-גיבור בגריד", tech:"CSS", status:"מאושר",
  desc:"כרטיס כהה אחד בתוך גריד בהיר מושך את העין בדיוק למה שמוכרים.",
  when:"עד 25% מהגריד, לא צמודים זה לזה.",
  css:`.hg{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.hg .gcard h3{margin:0 0 6px;font-size:18px}
.hg .gcard p{margin:0;color:var(--muted);font-size:14px}
.hg .hero-card{background:linear-gradient(150deg,#16182b,#33355c);border-color:transparent;color:#fff}
.hg .hero-card p{color:#b9bbd4}
@media(max-width:767px){.hg{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="hg">
<div class="gcard"><h3>שירות רגיל</h3><p>תיאור קצר של השירות.</p></div>
<div class="gcard hero-card"><h3>השירות המרכזי ⭐</h3><p>העין הגיעה לכאן קודם, נכון?</p></div>
<div class="gcard"><h3>שירות נוסף</h3><p>תיאור קצר של השירות.</p></div>
</div></div>`,
  js:``, runway:false
},
{
  id:"b08", cat:"behavior", name:"אינדקס ממוספר (001)", tech:"CSS", status:"מאושר",
  desc:"מספר סידורי קטן ומעומעם בפינת כל כרטיס. עיטור עריכתי שמוסיף תחושת סדרה.",
  when:"כרטיסי שירותים ותהליכים בעור soft-modern ודומיו.",
  css:`.ix{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.ix .gcard{position:relative;padding-top:44px}
.ix .n{position:absolute;top:16px;inset-inline-start:20px;font-size:12px;font-weight:600;letter-spacing:.12em;color:#b9bbd4}
@media(max-width:767px){.ix{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="ix">
<div class="gcard"><span class="n">001</span><h3 style="margin:0 0 6px">אפיון</h3><p style="margin:0;color:var(--muted)">מבינים את העסק לעומק.</p></div>
<div class="gcard"><span class="n">002</span><h3 style="margin:0 0 6px">עיצוב</h3><p style="margin:0;color:var(--muted)">נותנים למסר פנים.</p></div>
<div class="gcard"><span class="n">003</span><h3 style="margin:0 0 6px">השקה</h3><p style="margin:0;color:var(--muted)">עולים לאוויר ומודדים.</p></div>
</div></div>`,
  js:``, runway:false
},
{
  id:"b09", cat:"behavior", name:"רגע המילה הענקית", tech:"CSS", status:"מאושר",
  desc:"מילה רגשית אחת בגודל ענק כוויז'ואל של סקשן שלם.",
  when:"אחת לעמוד. זה רגע, לא שיטה.",
  css:`.giant{font-size:clamp(80px,14vw,240px);font-weight:800;line-height:1;letter-spacing:-.02em;background:linear-gradient(120deg,#4a3aff,#c2255c);-webkit-background-clip:text;background-clip:text;color:transparent}`,
  html:`<div class="stage center"><div class="giant">נמכר!</div><p style="color:var(--muted)">והלוויינים הקטנים מסביב משלימים את הסיפור.</p></div>`,
  js:``
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
