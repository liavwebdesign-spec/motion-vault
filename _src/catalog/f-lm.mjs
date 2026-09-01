// מהלכי החתימה (LM): נכרו מהאתרים של ליאב. דמואים עצמאיים לשיפוט מחודש, מהלך-מהלך.
export default [
{
  id:"lm1", cat:"lm", name:"שכבות סחיפה", tech:"vanilla JS · rAF", status:"ממתין",
  desc:"אלמנטים צפים שנסחפים במהירויות שונות בגלילה, עם הטיה קלה. שכבה איטית מרגישה רחוקה, מהירה מרגישה קרובה.",
  when:"הירו וסקשני אווירה. עד 4 שכבות לסקשן. נכרה מכל האתרים של ליאב (מדרג 1/2/4).",
  css:`.driftsec{position:relative;height:90vh;background:#101223;border-radius:var(--r);margin-inline:var(--gutter);overflow:hidden;display:flex;align-items:center;justify-content:center}
.dl{position:absolute;border-radius:50%;filter:blur(50px)}
.driftsec h2{color:#fff;position:relative;z-index:2;font-size:var(--fs-h2)}
.dchip{position:absolute;z-index:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);border-radius:14px;padding:12px 18px;color:#cdd0e8;font-size:13px;transform:rotate(-3deg)}`,
  html:`<div class="stage tight"><div class="driftsec">
<div class="dl" data-drift="y:2,r:-0.3" style="width:340px;height:340px;background:rgba(44,247,217,.14);top:-6%;inset-inline-start:-4%"></div>
<div class="dl" data-drift="y:1,x:-1,r:0.2" style="width:260px;height:260px;background:rgba(244,158,64,.13);bottom:-4%;inset-inline-end:6%"></div>
<div class="dchip" data-drift="y:1.5" style="top:20%;inset-inline-end:12%">שכבה מהירה (1.5)</div>
<div class="dchip" data-drift="y:0.6,x:-0.4" style="bottom:24%;inset-inline-start:10%;transform:rotate(2deg)">שכבה איטית (0.6)</div>
<h2>שכבות בסחיפה איטית</h2>
</div></div>`,
  js:`const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  const drifts=[...document.querySelectorAll("[data-drift]")].map(el=>{
    const p={};el.dataset.drift.split(",").forEach(s=>{const kv=s.split(":");p[kv[0]]=+kv[1]});
    return{el,y:p.y||0,x:p.x||0,r:p.r||0,sec:el.closest(".driftsec")};
  });
  let tick=false;
  function frame(){tick=false;const vh=innerHeight;
    drifts.forEach(d=>{
      const rc=d.sec.getBoundingClientRect();
      const t=Math.min(1,Math.max(0,(vh-rc.top)/(vh+rc.height)));
      d.el.style.translate=(t*d.x*24)+"px "+(t*d.y*24)+"px";
      if(d.r)d.el.style.rotate=(t*d.r*14)+"deg";
    });}
  addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
  frame();
}`
},
{
  id:"lm3", cat:"lm", name:"הצטלבות (Converging)", tech:"CSS + IO", status:"ממתין",
  desc:"זוג בלוקים שנכנסים משני צדדים ונפגשים במרכז. התוכן צועד אחד לקראת השני.",
  when:"לפני/אחרי, בעיה/פתרון, שני צדדים של סיפור. פעם-פעמיים בעמוד.",
  css:`.conv{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);padding-inline:var(--gutter);align-items:center}
.cv{background:#fff;border:1px solid var(--line);border-radius:18px;padding:34px;opacity:0;transition:opacity .7s cubic-bezier(.22,1,.36,1),translate .7s cubic-bezier(.22,1,.36,1)}
.cv h3{margin:0 0 8px}.cv p{margin:0;color:var(--muted)}
.cv.a{translate:-64px 0}.cv.b{translate:64px 0}
.conv.met .cv{opacity:1;translate:0 0}
.cv.warm{box-shadow:8px 8px 0 #f49e40;border-radius:16px}
@media(max-width:767px){.conv{grid-template-columns:1fr}.cv.a,.cv.b{translate:0 24px}}`,
  html:`<div class="stage"><div class="conv">
<div class="cv a warm"><h3>מה שרואים במגרש</h3><p>הביצועים שהיריב מרגיש.</p></div>
<div class="cv b"><h3>מה שקורה מאחורי הקלעים</h3><p>הנתונים שמייצרים את הביצועים.</p></div>
</div></div>`,
  js:`const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("met");io.unobserve(e.target)}
}),{threshold:.35});
document.querySelectorAll(".conv").forEach(el=>io.observe(el));`
},
{
  id:"lm4", cat:"lm", name:"ערימה דביקה מדורגת", tech:"CSS position:sticky", status:"ממתין",
  desc:"כרטיסים שנערמים זה על זה בגלילה עם offset מדורג. כל כרטיס נדבק מעט נמוך מקודמו.",
  when:"למה דווקא אנחנו 01-04, שלבי שירות. עד 5 כרטיסים.",
  css:`.stackw{padding-inline:var(--gutter);display:grid;gap:24px}
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
  html:`<div class="ladder go">
<span class="kick lad l1">רגע הזהות</span>
<h2 class="lad l2">כל שורה נכנסת 150 אלפיות אחרי קודמתה</h2>
<p class="lad l3">הסולם שמור להירו בלבד. ככה נשמרת הטבעיות בשאר העמוד.</p>
<div class="lad l4"><button class="gbtn">כפתור ראשי</button></div>
<span class="lad l5" style="font-size:13px;color:var(--muted);margin-top:12px">שורת מיקרו · אמון · בלי התחייבות</span>
<button class="gbtn replay" style="background:#16182b">הפעל שוב</button>
</div>`,
  js:`const lad=document.querySelector(".ladder");
document.querySelector(".replay").addEventListener("click",()=>{
  lad.classList.remove("go");void lad.offsetHeight;lad.classList.add("go");
});`,
  runway:false
},
{
  id:"lm6", cat:"lm", name:"ההדר המתממש", tech:"CSS + scroll listener", status:"ממתין",
  desc:"הדר שקוף בראש העמוד; אחרי גלילה קצרה הרקע, הצל והגבול מתממשים ברכות.",
  when:"כמעט כל אתר. המתכון שחזר בשבעה מהאתרים של ליאב.",
  css:`.mhdr{position:sticky;top:0;z-index:70;display:flex;justify-content:space-between;align-items:center;padding:18px var(--gutter);transition:background .3s,box-shadow .3s,border-color .3s,padding .3s;border-bottom:1px solid transparent}
.mhdr.scrolled{background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-color:var(--line);box-shadow:0 6px 24px rgba(22,24,43,.07);padding-block:12px}
.mhdr b{font-size:19px}
.mhdr nav{display:flex;gap:22px;font-size:14px;color:var(--muted)}
.mhero{height:60vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#eef 0%,#fff 100%);color:var(--muted)}`,
  html:`<div class="mhdr"><b>לוגו<span style="color:var(--accent)">.</span></b><nav><span>בית</span><span>אודות</span><span>שירותים</span><span>צור קשר</span></nav></div>
<div class="mhero">גלול וצפה בהדר למעלה מתממש</div>`,
  js:`const h=document.querySelector(".mhdr");
function onS(){h.classList.toggle("scrolled",scrollY>40)}
onS();addEventListener("scroll",onS,{passive:true});`
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
.tiltm-track{display:inline-flex;gap:48px;padding-inline-end:48px;animation:marq 26s linear infinite}
.tiltm-track span{font-weight:800;font-size:24px;color:rgba(255,255,255,.55)}
.tiltm-track i{font-style:normal;color:#f49e40}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(50%)}}`,
  html:`<div class="stage full"><div class="tiltm-wrap" data-dragmarq><div class="tiltm"><div class="tiltm-track">
<span>עיצוב</span><i>·</i><span>פיתוח</span><i>·</i><span>אסטרטגיה</span><i>·</i><span>תנועה</span><i>·</i>
<span>עיצוב</span><i>·</i><span>פיתוח</span><i>·</i><span>אסטרטגיה</span><i>·</i><span>תנועה</span><i>·</i>
</div></div></div></div>`,
  js:`const dm=document.querySelector("[data-dragmarq]");
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
