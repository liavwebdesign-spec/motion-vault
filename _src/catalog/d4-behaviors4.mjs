// גל awwwards (2.9.2026): נכרה מ-grafik.co.nz ומ-odysseeclinic.com.au. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b21", cat:"behavior", name:"שכבת שרבוט למבקר", tech:"Canvas 2D · Pointer Events", status:"ממתין",
  desc:"כפתור עיפרון צף שפותח שכבת ציור מעל העמוד. המבקר משרבט, מנקה, וכשהוא מכבה השכבה חוזרת להיות שקופה לחלוטין ללחיצות.",
  when:"אתרי סטודיו, פורטפוליו ומותגים משחקיים. אלמנט חן אחד שגורם לאנשים להישאר עוד דקה. לא באתרי המרה או מערכות.",
  libs:[],
  css:`.dood-fab{position:fixed;bottom:22px;inset-inline-start:22px;z-index:60;width:52px;height:52px;border-radius:50%;border:0;cursor:pointer;background:var(--accent);color:#fff;font-size:22px;display:grid;place-items:center;box-shadow:0 12px 30px rgba(0,0,0,.22);transition:transform .25s cubic-bezier(.2,.8,.2,1),background .25s}
.dood-fab:hover{transform:scale(1.06)}
.dood-fab.on{background:#16182b}
.dood-tools{position:fixed;bottom:26px;inset-inline-start:86px;z-index:60;display:flex;gap:8px;align-items:center;opacity:0;visibility:hidden;transform:translateX(10px);transition:opacity .25s,transform .25s,visibility .25s}
.dood-tools.on{opacity:1;visibility:visible;transform:none}
.dood-tools button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 16px;font:inherit;font-size:13px;cursor:pointer}
.dood-swatch{width:26px;height:26px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px var(--line);cursor:pointer;padding:0}
.dood-swatch.sel{box-shadow:0 0 0 2px var(--ink)}
.dood-canvas{position:fixed;inset:0;z-index:55;pointer-events:none;touch-action:none}
.dood-canvas.on{pointer-events:auto;cursor:crosshair}
.dood-demo{display:grid;place-items:center;gap:14px;text-align:center}
.dood-demo h3{font-size:clamp(24px,2.6vw,42px);margin:0}
.dood-demo p{color:var(--muted);margin:0;max-width:46ch}`,
  html:`<div class="stage tight"><div class="dood-demo">
  <h3>לחץ על העיפרון ותשרבט על העמוד</h3>
  <p>השכבה יושבת מעל כל התוכן, אבל רק כשהיא פעילה. כשהיא כבויה היא לא חוסמת שום לחיצה ולא מפריעה לגלילה.</p>
</div></div>
<canvas class="dood-canvas"></canvas>
<div class="dood-tools">
  <button class="dood-swatch sel" data-c="#4a3aff" style="background:#4a3aff" aria-label="סגול"></button>
  <button class="dood-swatch" data-c="#e8590c" style="background:#e8590c" aria-label="כתום"></button>
  <button class="dood-swatch" data-c="#2b8a3e" style="background:#2b8a3e" aria-label="ירוק"></button>
  <button class="dood-clear">נקה</button>
</div>
<button class="dood-fab" aria-pressed="false" aria-label="מצב שרבוט">✎</button>`,
  js:`(function(){
  const cv=document.querySelector(".dood-canvas"),fab=document.querySelector(".dood-fab"),tools=document.querySelector(".dood-tools");
  const ctx=cv.getContext("2d");
  let on=false,drawing=false,color="#4a3aff",last=null,dpr=Math.min(devicePixelRatio||1,2);
  function size(){
    const img=cv.width?ctx.getImageData(0,0,cv.width,cv.height):null;
    cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+"px";cv.style.height=innerHeight+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.lineCap="round";ctx.lineJoin="round";
    if(img)try{ctx.putImageData(img,0,0)}catch(e){}
  }
  size();addEventListener("resize",size);
  function pos(e){return {x:e.clientX,y:e.clientY};}
  cv.addEventListener("pointerdown",e=>{
    if(!on)return;
    drawing=true;last=pos(e);cv.setPointerCapture(e.pointerId);
    ctx.beginPath();ctx.arc(last.x,last.y,2.2,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();
  });
  cv.addEventListener("pointermove",e=>{
    if(!on||!drawing)return;
    const p=pos(e);
    ctx.strokeStyle=color;ctx.lineWidth=4.5;
    ctx.beginPath();ctx.moveTo(last.x,last.y);
    // נקודת אמצע מעגלת את הקו ומונעת פינות חדות בין דגימות
    ctx.quadraticCurveTo(last.x,last.y,(last.x+p.x)/2,(last.y+p.y)/2);
    ctx.stroke();
    last=p;
  });
  ["pointerup","pointercancel","pointerleave"].forEach(ev=>cv.addEventListener(ev,()=>drawing=false));
  fab.addEventListener("click",()=>{
    on=!on;
    cv.classList.toggle("on",on);fab.classList.toggle("on",on);tools.classList.toggle("on",on);
    fab.setAttribute("aria-pressed",String(on));
    fab.textContent=on?"✕":"✎";
  });
  tools.querySelectorAll(".dood-swatch").forEach(b=>b.addEventListener("click",()=>{
    color=b.dataset.c;
    tools.querySelectorAll(".dood-swatch").forEach(x=>x.classList.toggle("sel",x===b));
  }));
  tools.querySelector(".dood-clear").addEventListener("click",()=>ctx.clearRect(0,0,cv.width,cv.height));
})();`,
  runway:false,
  note:"שלושה דברים שמונעים מהשכבה להרוס את העמוד: pointer-events:none כשהיא כבויה, touch-action:none כדי שהאצבע תצייר במקום לגלול, ו-setPointerCapture כדי שהקו לא ייקטע כשהסמן יוצא מהאלמנט. הציור לא נשמר בשום מקום ונמחק ברענון, וזו בחירה: זה צעצוע, לא פיצ'ר."
},
{
  id:"b22", cat:"behavior", name:"סקשן וידאו שמתנגן רק כשרואים אותו", tech:"IntersectionObserver · video", status:"ממתין",
  desc:"סרטון ברוחב מלא שמתחיל לנגן כשהסקשן נכנס למסך ונעצר כשהוא יוצא. עד אז מוצג פוסטר בלבד, והדפדפן לא מוריד את הווידאו.",
  when:"סקשני אווירה באתרי תדמית, קליניקות, מסעדות ונדל\"ן. הדרך הנכונה לשים וידאו גדול בעמוד בלי לשלם עליו בזמן טעינה.",
  libs:[],
  css:`.vsec{position:relative;min-height:min(88vh,780px);overflow:hidden;display:grid;place-items:center;background:#0f1020}
.vsec video,.vsec .vposter{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.vsec video{opacity:0;transition:opacity .6s ease}
.vsec.playing video{opacity:1}
.vsec::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.45))}
.vsec-in{position:relative;z-index:2;text-align:center;color:#fff;padding-inline:var(--gutter)}
.vsec-in h3{font-size:clamp(30px,4vw,66px);margin:0 0 12px;font-weight:800}
.vsec-in p{margin:0 auto;max-width:44ch;font-size:17px;opacity:.85}
.vstate{position:absolute;bottom:16px;inset-inline-end:20px;z-index:3;font-size:12px;letter-spacing:.1em;color:#fff;background:rgba(0,0,0,.45);border-radius:999px;padding:6px 14px}`,
  html:`<div class="stage tight center" style="color:var(--muted)">גלול למטה. הסרטון יורד לרשת רק כשהסקשן מתקרב.</div>
<section class="vsec">
  <img class="vposter" src="../assets/media/demo-b.jpg" alt="">
  <video muted loop playsinline preload="none" poster="../assets/media/demo-b.jpg" data-src="../assets/media/demo-b.mp4"></video>
  <div class="vsec-in"><h3>שקט שאפשר להרגיש</h3><p>הווידאו מתנגן רק כשהוא באמת מול העיניים, ונעצר ברגע שהוא יוצא מהמסך.</p></div>
  <span class="vstate">ממתין</span>
</section>
<div class="stage center" style="color:var(--muted);min-height:120vh;display:grid;place-items:center">המשך לגלול, והסרטון ייעצר מאחוריך. גלול חזרה למעלה והוא יחזור לנגן.</div>`,
  js:`(function(){
  const sec=document.querySelector(".vsec"),v=sec.querySelector("video"),state=sec.querySelector(".vstate");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let loaded=false;
  const set=t=>state.textContent=t;
  if(reduce){set("מושהה: העדפת תנועה מופחתת");return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        if(!loaded){v.src=v.dataset.src;loaded=true;set("טוען");}
        const p=v.play();
        if(p&&p.then)p.then(()=>{sec.classList.add("playing");set("מתנגן");}).catch(()=>set("הדפדפן חסם ניגון"));
      }else{
        v.pause();sec.classList.remove("playing");set("מושהה");
      }
    });
  },{threshold:.35});
  io.observe(sec);
})();`,
  runway:true,
  note:"הסף 0.35 אומר שהניגון מתחיל כשיותר משליש מהסקשן במסך, כדי שהוא לא יידלק ויכבה בגלילה מהירה. חובה muted ו-playsinline, אחרת הדפדפן יסרב לנגן בלי לחיצה ואייפון יפתח מסך מלא. הפוסטר הוא תמונה אמיתית מתחת לווידאו, כך שגם אם הרשת איטית הסקשן אף פעם לא ריק."
},
];
