// מהלכי החתימה (LM): נכרו מהאתרים של ליאב. דמואים עצמאיים לשיפוט מחודש, מהלך-מהלך.
export default [
{
  id:"lm1", cat:"lm", name:"שכבות סחיפה", tech:"vanilla JS · rAF", status:"ממתין",
  desc:"אלמנטים צפים שנסחפים במהירויות שונות בגלילה, עם הטיה קלה. במרכז המסך כל שכבה יושבת במקום שעוצבה, ומשם היא נסחפת לשני הכיוונים. שכבה איטית מרגישה רחוקה, מהירה מרגישה קרובה.",
  when:"הירו וסקשני אווירה. עד 4 שכבות לסקשן. נכרה מכל האתרים של ליאב (מדרג 1/2/4).",
  css:`.driftsec{position:relative;height:90vh;background:#101223;border-radius:var(--r);margin-inline:var(--gutter);overflow:hidden;display:flex;align-items:center;justify-content:center}
.dl{position:absolute;border-radius:50%;filter:blur(46px);will-change:translate}
.dchip{will-change:translate,rotate}
.driftsec h2{color:#fff;position:relative;z-index:2;font-size:var(--fs-h2)}
.dchip{position:absolute;z-index:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);border-radius:14px;padding:12px 18px;color:#cdd0e8;font-size:13px;transform:rotate(-3deg)}`,
  html:`<div class="stage tight"><div class="driftsec">
<div class="dl" data-drift="y:2,r:-0.3" style="width:340px;height:340px;background:rgba(44,247,217,.16);top:-14%;inset-inline-start:-4%"></div>
<div class="dl" data-drift="y:0.5,x:-1,r:0.2" style="width:260px;height:260px;background:rgba(244,158,64,.15);bottom:-12%;inset-inline-end:6%"></div>
<div class="dchip" data-drift="y:1.5" style="top:20%;inset-inline-end:12%">שכבה מהירה (1.5)</div>
<div class="dchip" data-drift="y:0.4,x:-0.4" style="bottom:24%;inset-inline-start:10%;transform:rotate(2deg)">שכבה איטית (0.4)</div>
<h2>שכבות בסחיפה איטית</h2>
</div></div>`,
  js:`const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  const drifts=[...document.querySelectorAll("[data-drift]")].map(el=>{
    const p={};el.dataset.drift.split(",").forEach(s=>{const kv=s.split(":");p[kv[0]]=+kv[1]});
    return{el,y:p.y||0,x:p.x||0,r:p.r||0,sec:el.closest(".driftsec")};
  });
  const AMP=110;                       // המרחק לשכבה במקדם 1, לכל אורך המעבר על המסך
  let tick=false;
  function frame(){tick=false;const vh=innerHeight;
    drifts.forEach(d=>{
      const rc=d.sec.getBoundingClientRect();
      const t=Math.min(1,Math.max(0,(vh-rc.top)/(vh+rc.height)));
      // p נע מ-1 ל--1 סביב אמצע המעבר, ולכן במרכז המסך השכבה יושבת בדיוק במקום שעוצבה
      const p=1-t*2;
      d.el.style.translate=(p*d.x*AMP)+"px "+(p*d.y*AMP)+"px";
      if(d.r)d.el.style.rotate=(p*d.r*20)+"deg";
    });}
  addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
  frame();
}`
},
{
  id:"lm3", cat:"lm", name:"הצטלבות (Converging)", tech:"CSS + IO", status:"ממתין",
  desc:"זוג בלוקים שנכנסים משני צדדים ונפגשים בנקודה במרכז. התוכן צועד אחד לקראת השני, והמפגש עצמו מקבל סימן.",
  when:"לפני/אחרי, בעיה/פתרון, שני צדדים של סיפור. פעם-פעמיים בעמוד.",
  css:`.conv{display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(12px,2vw,26px);align-items:center;
  padding-inline:var(--gutter);max-width:min(1060px,100%);margin-inline:auto}
.cv{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:clamp(22px,2.6vw,36px);
  opacity:0;box-shadow:0 14px 34px rgba(22,24,43,.07);
  transition:opacity .75s cubic-bezier(.22,1,.36,1),translate .75s cubic-bezier(.22,1,.36,1)}
.cv-kick{display:inline-block;font-size:12px;letter-spacing:.14em;color:var(--muted);
  border:1px solid var(--line);border-radius:999px;padding:4px 11px;margin-bottom:14px}
.cv h3{margin:0 0 8px;font-size:clamp(19px,2vw,25px);line-height:1.3}
.cv p{margin:0;color:var(--muted);font-size:15px;line-height:1.7}
.cv-stat{display:block;margin-top:16px;font-size:clamp(26px,3vw,40px);font-weight:800;line-height:1;color:var(--ink)}
.cv-stat small{display:block;font-size:12px;font-weight:400;color:var(--muted);letter-spacing:.06em;margin-top:6px}
.cv.a{border-top:3px solid #f49e40}
.cv.b{border-top:3px solid #4a3aff}

/* translate הוא פיזי ולא לוגי. עם הערכים ההפוכים שני הבלוקים מתחילים קרובים
   ונפרדים החוצה, כלומר בדיוק ההפך מהצטלבות. */
.cv.a{translate:70px 0}.cv.b{translate:-70px 0}
html[dir="ltr"] .cv.a{translate:-70px 0}
html[dir="ltr"] .cv.b{translate:70px 0}

.cv-meet{width:clamp(38px,4vw,52px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;
  background:var(--ink);color:#fff;font-size:clamp(17px,2vw,22px);line-height:1;
  scale:0;opacity:0;transition:scale .5s .28s cubic-bezier(.34,1.56,.64,1),opacity .4s .28s}
.conv.met .cv{opacity:1;translate:0 0}
.conv.met .cv-meet{scale:1;opacity:1}

@media(max-width:767px){
  .conv{grid-template-columns:1fr;gap:14px}
  .cv.a,.cv.b{translate:0 26px}
  html[dir="ltr"] .cv.a,html[dir="ltr"] .cv.b{translate:0 26px}
  .cv-meet{justify-self:center}
}
@media (prefers-reduced-motion: reduce){
  .cv,.cv-meet{transition-duration:.01ms}
  .cv.a,.cv.b{translate:0 0}
}`,
  html:`<div class="stage"><div class="conv">
  <div class="cv a"><span class="cv-kick">מה שרואים</span>
    <h3>הביצועים שהיריב מרגיש</h3>
    <p>מה שקורה על המגרש: מהירות, החלטות ועמידות בדקות האחרונות.</p>
    <span class="cv-stat">92%<small>שיפור נמדד בעונה</small></span></div>
  <div class="cv-meet" aria-hidden="true">+</div>
  <div class="cv b"><span class="cv-kick">מה שמאחורי</span>
    <h3>הנתונים שמייצרים את הביצועים</h3>
    <p>עומסי אימון, שינה והתאוששות. מה שאף אחד לא רואה בשידור.</p>
    <span class="cv-stat">14<small>מדדים שנאספים כל יום</small></span></div>
</div></div>`,
  js:`const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("met");io.unobserve(e.target)}
}),{threshold:.35});
document.querySelectorAll(".conv").forEach(el=>io.observe(el));`,
  note:"**מלכודת RTL**: `translate` היא תכונה פיזית ולא לוגית. אם נותנים לבלוק הראשון ערך שלילי (כמו בעמוד אנגלי), בעברית הוא יושב מימין ומתחיל לזוז שמאלה, כלומר שני הבלוקים מתחילים קרובים ונפרדים החוצה. זה בדיוק ההפך מהמהלך. הערכים כאן הפוכים עם דריסה ל-`html[dir=\"ltr\"]`. הנקודה במרכז היא מה שהופך את זה מ\"שני כרטיסים שנכנסים\" ל\"מפגש\": היא נכנסת באיחור של 0.28 שנייה, אחרי שהבלוקים כבר הגיעו."
},
{
  id:"lm4", cat:"lm", name:"ערימה דביקה מדורגת", tech:"CSS position:sticky", status:"ממתין",
  desc:"כרטיסים שנערמים זה על זה בגלילה עם offset מדורג. כל כרטיס נדבק מעט נמוך מקודמו.",
  when:"למה דווקא אנחנו 01-04, שלבי שירות. עד 5 כרטיסים.",
  css:`/* בלי תקרת רוחב הכרטיס נמתח על כל המסך, הטקסט תחום ב-55ch ונשאר שטח ריק גדול בצד */
.stackw{padding-inline:var(--gutter);display:grid;gap:24px;max-width:min(980px,100%);margin-inline:auto}
.scard{position:sticky;background:#fff;border:1px solid var(--line);border-radius:20px;padding:clamp(24px,3vw,44px);box-shadow:0 -18px 46px rgba(22,24,43,.09)}
.scard:nth-child(1){top:110px}.scard:nth-child(2){top:150px}.scard:nth-child(3){top:190px}.scard:nth-child(4){top:230px}
.snum{font-size:clamp(40px,4vw,80px);font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:1.5px #4a3aff}
.scard h3{margin:10px 0 6px;font-size:22px}.scard p{margin:0;color:var(--muted);max-width:55ch}
.stail{height:30vh}`,
  html:`<div class="stackw">
<div class="scard"><div class="snum">01</div><h3>תוכנית שנבנית ממדידה</h3><p>כל החלטה מגיעה מנתון, לא מתבנית.</p></div>
<div class="scard"><div class="snum">02</div><h3>מלווה אחד, אחריות אחת</h3><p>מי שהתחיל איתך נשאר איתך.</p></div>
<div class="scard"><div class="snum">03</div><h3>שקיפות מלאה</h3><p>דוח מדיד כל חודש, בלי סיפורים.</p></div>
<div class="scard"><div class="snum">04</div><h3>תוצאות שרואים</h3><p>אם המספרים לא זזים, התוכנית משתנה.</p></div>
</div><div class="stail"></div>`,
  js:``
},
{
  id:"lm5", cat:"lm", name:"סולם כניסות הירו (150ms)", tech:"CSS transitions + delay", status:"ממתין",
  desc:"רכיבי ההירו נכנסים בזה אחר זה במדרגות של 150 אלפיות: לוגו, ניווט, כותרת, ליד, כפתורים.",
  when:"רגע הזהות בלבד. בשאר העמוד reveal אחיד בלי סטאגר. החריג המאושר.",
  css:`.ladder{min-height:70vh;display:flex;flex-direction:column;justify-content:center;padding-inline:var(--gutter)}
.lad{opacity:0;translate:0 18px;transition:opacity .6s cubic-bezier(.2,.6,.2,1),translate .6s cubic-bezier(.2,.6,.2,1)}
.go .lad{opacity:1;translate:0 0}
.go .l1{transition-delay:0ms}.go .l2{transition-delay:150ms}.go .l3{transition-delay:300ms}
.go .l4{transition-delay:450ms}.go .l5{transition-delay:600ms}
.ladder .kick{color:var(--accent);font-weight:600;font-size:14px;letter-spacing:.14em}
.ladder h2{font-size:var(--fs-demo);max-width:18ch;margin:12px 0}
.ladder p{color:var(--muted);max-width:52ch;margin:0 0 22px}
.replay{margin-top:30px;align-self:flex-start}`,
  html:`<div class="ladder">
<span class="kick lad l1">רגע הזהות</span>
<h2 class="lad l2">כל שורה נכנסת 150 אלפיות אחרי קודמתה</h2>
<p class="lad l3">הסולם שמור להירו בלבד. ככה נשמרת הטבעיות בשאר העמוד.</p>
<div class="lad l4"><button class="gbtn">כפתור ראשי</button></div>
<span class="lad l5" style="font-size:13px;color:var(--muted);margin-top:12px">שורת מיקרו · אמון · בלי התחייבות</span>
<button class="gbtn replay" style="background:#16182b">הפעל שוב</button>
</div>`,
  js:`const lad=document.querySelector(".ladder");
// go חייב להתווסף אחרי הציור הראשון. אם הוא כבר במארקאפ אין שינוי מצב, ולכן אין טרנזישן בכלל
// והרכיבים פשוט מופיעים גמורים. זאת גם הסיבה ל-void offsetHeight בהפעלה חוזרת.
const play=()=>{lad.classList.remove("go");void lad.offsetHeight;lad.classList.add("go")};
let started=false;const start=()=>{if(started)return;started=true;play()};
requestAnimationFrame(()=>requestAnimationFrame(start));
setTimeout(start,80);   // רשת ביטחון: בטאב מוסתר rAF מושהה והכותרת הייתה נשארת נעלמת
document.querySelector(".replay").addEventListener("click",play);`,
  runway:false
},

{
  id:"lm7", cat:"lm", name:"אוצר ההובר: לחיצה / הרמה / צמיחה", tech:"CSS transitions", status:"ממתין",
  desc:"שלוש משפחות ההובר: כרטיס מדיה נלחץ פנימה (0.97), כרטיס תוכן מתרומם אלכסונית, ו-CTA צומח עם סיבוב קטן. משפחה אחת לאלמנט, לעולם לא שתיים.",
  when:"כל אתר. הבחירה לפי סוג האלמנט.",
  css:`.hv{display:flex;gap:var(--gap);justify-content:center;flex-wrap:wrap;align-items:center}
.hv .ph{width:220px;height:150px;font-size:15px;cursor:pointer}
.press{transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.press:hover{transform:scale(.97)}
.liftd{transition:transform .35s cubic-bezier(.2,.6,.2,1),box-shadow .35s}
.liftd:hover{transform:translate(-6px,-6px);box-shadow:10px 10px 24px rgba(22,24,43,.15)}
.grow{transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.grow:hover{transform:scale(1.06) rotate(2deg)}`,
  html:`<div class="stage tight"><div class="hv">
<div class="ph ph-c press">מדיה: לחיצה פנימה</div>
<div class="ph ph-a liftd">תוכן: הרמה אלכסונית</div>
<button class="gbtn grow">CTA: צמיחה + סיבוב</button>
</div></div>`,
  js:``, runway:false
},
{
  id:"lm8", cat:"lm", name:"מרקי מוטה ונגרר", tech:"CSS keyframes + rAF", status:"ממתין",
  desc:"רצועה שזורמת בלולאה, מוטה 3 מעלות, וגם נגררת עם הגלילה. שתי תנועות מצטברות.",
  when:"פסי אווירה באתרי וואו. פעם אחת בעמוד.",
  css:`.tiltm-wrap{transform:rotate(-3deg);width:104vw;margin-inline-start:-2vw;background:#16182b;padding-block:20px;overflow:hidden}
.tiltm{overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
/* ההזזה היא רוחב קבוצה מדויק בפיקסלים, ומספר העותקים נגזר מרוחב המסך */
.tiltm-track{display:flex;width:max-content;animation:marq linear infinite;animation-duration:var(--marq-dur,26s)}
.tiltm-set{display:flex;gap:48px;padding-inline-end:48px}
.tiltm-track span{font-weight:800;font-size:24px;color:rgba(255,255,255,.55);white-space:nowrap}
.tiltm-track i{font-style:normal;color:#f49e40}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(var(--marq-shift,50%))}}`,
  html:`<div class="stage full"><div class="tiltm-wrap" data-dragmarq><div class="tiltm"><div class="tiltm-track">
<div class="tiltm-set"><span>עיצוב</span><i>·</i><span>פיתוח</span><i>·</i><span>אסטרטגיה</span><i>·</i><span>תנועה</span><i>·</i></div>
</div></div></div></div>`,
  js:`(function(){
  // אותו מנגנון כמו ב-b01: מספר העותקים נגזר מרוחב המסך, וההזזה היא רוחב קבוצה מדויק
  function build(){
    const wrap=document.querySelector(".tiltm"),track=document.querySelector(".tiltm-track");
    const proto=track.firstElementChild;
    [...track.children].slice(1).forEach(c=>c.remove());
    const setW=proto.getBoundingClientRect().width;
    if(!setW)return;
    const need=Math.ceil(wrap.getBoundingClientRect().width/setW)+1;
    for(let i=1;i<need;i++){const c=proto.cloneNode(true);c.setAttribute("aria-hidden","true");track.appendChild(c);}
    track.style.setProperty("--marq-shift",setW+"px");
    track.style.setProperty("--marq-dur",(setW/58).toFixed(2)+"s");
  }
  build();
  if(document.fonts)document.fonts.ready.then(build);
  let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(build,200);});
})();
const dm=document.querySelector("[data-dragmarq]");
let tick=false;
function frame(){tick=false;
  const r=dm.getBoundingClientRect();
  const t=(innerHeight-r.top)/(innerHeight+r.height);
  dm.style.translate=((t-.5)*120)+"px 0";}
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
frame();`
},
{
  id:"lm9", cat:"lm", name:"צל מוזח קשיח + רדיוס חד-צדדי", tech:"CSS (קרפט, לא תנועה)", status:"ממתין",
  desc:"שני מהלכי הקרפט מהעבודה החדשה: צל קשיח בצבע מותג בהיסט 45 מעלות, ורדיוס שמעוגל רק בצד אחד.",
  when:"כרטיסי מפתח בעורות עם אופי. שפת צל אחת לעמוד: או מוזח או רך, לא שניהם.",
  css:`.craft{display:flex;gap:var(--gap);justify-content:center;flex-wrap:wrap}
.hard{background:#fff;border:2px solid #16182b;border-radius:14px;padding:30px;box-shadow:8px 8px 0 #f49e40;max-width:240px;transition:transform .25s,box-shadow .25s}
.hard:hover{transform:translate(-3px,-3px);box-shadow:12px 12px 0 #f49e40}
.oneside{background:#16182b;color:#fff;padding:30px;border-radius:40px 40px 0 0;max-width:240px}
.oneside2{background:#fff;border:1px solid var(--line);padding:30px;border-radius:0 0 60px 0;max-width:240px}
.craft h3{margin:0 0 6px;font-size:17px}.craft p{margin:0;font-size:13.5px;color:var(--muted)}
.oneside p{color:#b9bbd4}`,
  html:`<div class="stage tight"><div class="craft">
<div class="hard"><h3>צל מוזח קשיח</h3><p>תמיד 45 מעלות, תמיד צבע מותג, בלי blur. עבור עליי.</p></div>
<div class="oneside"><h3>רדיוס עליון בלבד</h3><p>40 40 0 0. שובר את המלבניות בלי אפקט.</p></div>
<div class="oneside2"><h3>פינה אחת בלבד</h3><p>0 0 60 0. אסימטריה מכוונת.</p></div>
</div></div>`,
  js:``, runway:false
}
];
