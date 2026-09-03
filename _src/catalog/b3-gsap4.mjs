// GSAP moves G31-G38: התנהגויות שנכרו מעמוד הבית של madewithgsap.com (2.9.2026)
// שחזור התנהגות בלבד, מאפס, עם פלייסהולדרים גנריים. אין העתקת קוד או עיצוב.
export default [
{
  id:"g31", cat:"gsap", name:"גלריה אנכית נגררת עם מונה", tech:"GSAP · Observer", status:"ממתין",
  desc:"ערימת מדיה אנכית: הפריט המרכזי גדול, השכנים מציצים מעליו ומתחתיו. גרירה, החלקה או גלגלת מעבירים פריט, המונה מתעדכן, והכותרת מפוצלת לשני צידי הערימה.",
  when:"הירו של אתרי פורטפוליו ואולפנים, תצוגת פרויקטים נבחרים. הגלגלת עוברת פריטים רק בתוך הגלריה, ובקצוות היא משחררת את הדף (אין מלכודת גלילה).",
  libs:["gsap","Observer"],
  css:`html,body{overflow-x:clip}
.vg{position:relative;height:min(82vh,720px);background:#0f1020;color:#fff;overflow:hidden;user-select:none;touch-action:pan-x}
.vg-side{position:absolute;top:50%;transform:translateY(-50%);font-size:clamp(22px,2.4vw,40px);font-weight:700;white-space:nowrap;pointer-events:none}
.vg-side.r{right:var(--gutter)}.vg-side.l{left:var(--gutter)}
.vg-stack{position:absolute;inset:0;display:grid;place-items:center;cursor:grab}
.vg-stack:active{cursor:grabbing}
.vg-item{position:absolute;width:min(360px,40vw);aspect-ratio:4/3;font-size:28px;will-change:transform;box-shadow:0 20px 50px rgba(0,0,0,.35)}
.vg-count{position:absolute;bottom:22px;right:var(--gutter);font-variant-numeric:tabular-nums;font-size:14px;letter-spacing:.08em;color:#c9c9dd}
.vg-hint{position:absolute;bottom:22px;left:var(--gutter);font-size:13px;color:#8d8fa8}
@media(max-width:767px){.vg-side{display:none}.vg-item{width:64vw}}`,
  html:`<div class="stage full" style="padding-block:0"><div class="vg">
  <div class="vg-side r">עבודות נבחרות</div>
  <div class="vg-side l">מהשנה האחרונה</div>
  <div class="vg-stack">
    <div class="vg-item ph ph-a">1</div><div class="vg-item ph ph-b">2</div><div class="vg-item ph ph-c">3</div>
    <div class="vg-item ph ph-d">4</div><div class="vg-item ph ph-e">5</div><div class="vg-item ph ph-f">6</div><div class="vg-item ph ph-a">7</div>
  </div>
  <div class="vg-count">01 / 07</div>
  <div class="vg-hint">גרור למעלה ולמטה, או גלגל</div>
</div></div>`,
  js:`(function(){
  const vg=document.querySelector(".vg"),stack=vg.querySelector(".vg-stack"),items=[...vg.querySelectorAll(".vg-item")],count=vg.querySelector(".vg-count");
  const n=items.length;let cur=0,dragY=0,busy=false;
  const GAP=()=>items[0].offsetHeight*0.78;
  const pad=v=>String(v).padStart(2,"0");
  function layout(extra,instant){
    const g=GAP();
    items.forEach((it,i)=>{
      const off=i-cur;
      const y=off*g+(extra||0);
      const near=Math.abs(off+ (extra||0)/g);
      const props={y:y,scale:1.28-Math.min(near,1)*0.28,autoAlpha:Math.abs(off)>2?0:1,zIndex:20-Math.abs(off)};
      if(instant)gsap.set(it,props);else gsap.to(it,Object.assign(props,{duration:.8,ease:"expo.out",overwrite:true}));
    });
  }
  function go(step){
    const next=Math.max(0,Math.min(n-1,cur+step));
    if(next===cur){layout(0);return false;}
    cur=next;layout(0);
    count.textContent=pad(cur+1)+" / "+pad(n);
    gsap.fromTo(count,{y:6,autoAlpha:0},{y:0,autoAlpha:1,duration:.35,ease:"power2.out"});
    return true;
  }
  layout(0,true);
  Observer.create({target:stack,type:"touch,pointer",preventDefault:true,dragMinimum:3,
    onDragStart:()=>{dragY=0;},
    onDrag:self=>{dragY+=self.deltaY;layout(dragY,true);},
    onDragEnd:()=>{const steps=Math.round(-dragY/GAP());dragY=0;go(steps)||layout(0);}
  });
  vg.addEventListener("wheel",e=>{
    const dir=e.deltaY>0?1:-1;
    const canMove=(dir>0&&cur<n-1)||(dir<0&&cur>0);
    if(!canMove)return;
    e.preventDefault();
    if(busy)return;busy=true;go(dir);setTimeout(()=>busy=false,520);
  },{passive:false});
  addEventListener("resize",()=>layout(0,true));
})();`,
  runway:false,
  note:"מובייל: החלקה אנכית בתוך הגלריה מחליפה פריט; touch-action מוגדר כך שהחלקה אופקית ממשיכה לגלול את הדף."
},

{
  id:"g35", cat:"gsap", name:"טקסט ענק זורם על גל בגלילה", tech:"GSAP · ScrollTrigger · SplitText", status:"ממתין",
  desc:"משפט ענק, רחב מהמסך, מוצמד למסך ונוסע לרוחבו בקצב הגלילה. כל מילה מתנדנדת על גל משלה, כך שהשורה נראית כמו סרט שמתגלגל ולא כמו טקסט שזז.",
  when:"סיום העמוד לפני ה-CTA, הצהרת מותג, מעבר בין פרקים. משפט אחד קצר, מילים גדולות. בעברית הגל על מילים, לא על אותיות.",
  libs:["gsap","ScrollTrigger","SplitText"],
  css:`html,body{overflow-x:clip}
.wave{height:100vh;display:flex;align-items:center;overflow:hidden;background:#fff;border-block:1px solid var(--line)}
.wave-track{white-space:nowrap;font-size:clamp(72px,14vw,240px);font-weight:800;line-height:1;padding-inline:var(--gutter);will-change:transform}
.wave-track .word{display:inline-block;will-change:transform}`,
  html:`<div class="wave"><div class="wave-track">אז, מוכנים להתחיל לזוז?</div></div>`,
  js:`(function(){
  const track=document.querySelector(".wave-track"),sec=document.querySelector(".wave");
  const split=SplitText.create(track,{type:"words",wordsClass:"word"});
  const words=split.words;
  const dist=()=>Math.max(0,track.scrollWidth-sec.clientWidth);
  const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"+=220%",pin:true,scrub:1,invalidateOnRefresh:true}});
  tl.fromTo(track,{x:0},{x:()=>dist(),ease:"none"},0);
  tl.fromTo(words,{y:i=>Math.sin(i*1.1)*70,rotation:i=>Math.sin(i*1.1)*9},{y:i=>Math.sin(i*1.1+Math.PI)*70,rotation:i=>Math.sin(i*1.1+Math.PI)*9,ease:"none"},0);
})();`,
  note:"בכיוון RTL הטקסט מתחיל מימין והעודף נמצא משמאל, לכן המסלול מזיז את הרצועה ימינה (x חיובי). באתר LTR הופכים את הסימן."
},
{
  id:"g36", cat:"gsap", name:"מעבר סקשן בקשת שמתיישרת", tech:"GSAP · ScrollTrigger · MorphSVG", status:"ממתין",
  desc:"הגבול בין סקשן בהיר לכהה הוא קשת עגולה. ככל שגוללים אליו, הקשת מתיישרת לקו ישר. מעבר רך במקום חיתוך, בלי תמונה ובלי clip-path קופצני.",
  when:"מעבר מהירו לסקשן הבא, כניסה לאזור מחירים או ציטוט. פעם או פעמיים בעמוד. עובד על כל שני צבעי רקע.",
  libs:["gsap","ScrollTrigger","MorphSVGPlugin"],
  css:`.arc-light{background:#fff;padding:var(--sec) var(--gutter);text-align:center}
.arc-dark{background:#0f1020;color:#fff;position:relative;padding:0 var(--gutter) var(--sec)}
.arc-svg{display:block;width:100%;height:clamp(60px,14vw,220px)}
.arc-svg path{fill:#fff}
.arc-inner{max-width:720px;margin-inline:auto;padding-top:clamp(40px,5vw,80px);text-align:center}
.arc-card{background:#fff;color:var(--ink);border-radius:20px;padding:36px 28px;margin-top:32px;display:inline-block;min-width:min(360px,80vw)}
.arc-card b{font-size:clamp(44px,5vw,80px);display:block;line-height:1}`,
  html:`<section class="arc-light"><h2 style="font-size:var(--fs-demo);margin:0">הכל מתחיל בסקשן בהיר</h2><p style="color:var(--muted)">גלול, ותראה את הקשת מתיישרת בכניסה לסקשן הכהה</p></section>
<section class="arc-dark">
  <svg class="arc-svg" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
    <path id="arcA" d="M0,0 H100 V0 C78,40 22,40 0,0 Z"/>
    <path id="arcB" d="M0,0 H100 V0 C78,0 22,0 0,0 Z" style="display:none"/>
  </svg>
  <div class="arc-inner"><p style="letter-spacing:.14em;font-size:12px;color:#9a9cb8">מחיר אחד, פשוט</p>
  <div class="arc-card"><b>250 ₪</b><span style="color:var(--muted)">לחודש, ללא התחייבות</span></div></div>
</section>`,
  js:`gsap.to("#arcA",{morphSVG:"#arcB",ease:"none",
  scrollTrigger:{trigger:".arc-svg",start:"top 95%",end:"top 25%",scrub:1}});`
},
{
  id:"g37", cat:"gsap", name:"ענן תמונות מרחפות בעומק", tech:"GSAP · ScrollTrigger · quickTo", status:"ממתין",
  desc:"סקשן מוצמד שבו תמונות מפוזרות במרחב בגדלים שונים. בגלילה כל תמונה עולה במהירות משלה לפי העומק שלה, והעכבר מזיז את כולן בעדינות בפרלקסה.",
  when:"הצגת אוסף: לקוחות, פרויקטים, קהילה, מוצרים. במקום גריד מסודר, תחושת מרחב. 7 עד 12 תמונות, לא יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.cloud{height:100vh;position:relative;overflow:hidden;background:#0f1020}
.cloud-img{position:absolute;border-radius:10px;font-size:16px;will-change:transform;box-shadow:0 18px 40px rgba(0,0,0,.4)}
.cloud-title{position:absolute;inset:auto var(--gutter) 10%;color:#fff;font-size:clamp(24px,2.6vw,42px);font-weight:700;max-width:520px;pointer-events:none}
.cloud-title span{display:inline-block;margin-top:14px;padding:12px 22px;border-radius:999px;background:#fff;color:var(--ink);font-size:15px;font-weight:500}`,
  html:`<div class="cloud">
  <div class="cloud-img ph ph-a" data-x="8"  data-y="12" data-w="16" data-d="1.4">1</div>
  <div class="cloud-img ph ph-b" data-x="30" data-y="6"  data-w="22" data-d="0.9">2</div>
  <div class="cloud-img ph ph-c" data-x="58" data-y="14" data-w="10" data-d="1.8">3</div>
  <div class="cloud-img ph ph-d" data-x="74" data-y="4"  data-w="18" data-d="1.1">4</div>
  <div class="cloud-img ph ph-e" data-x="14" data-y="48" data-w="12" data-d="1.6">5</div>
  <div class="cloud-img ph ph-f" data-x="40" data-y="42" data-w="26" data-d="0.7">6</div>
  <div class="cloud-img ph ph-a" data-x="70" data-y="40" data-w="14" data-d="1.3">7</div>
  <div class="cloud-img ph ph-b" data-x="86" data-y="58" data-w="9"  data-d="2">8</div>
  <div class="cloud-img ph ph-c" data-x="4"  data-y="76" data-w="20" data-d="1">9</div>
  <div class="cloud-title">קהילה שבונה דברים יפים<br><span>לכל הפרויקטים ←</span></div>
</div>`,
  js:`(function(){
  const sec=document.querySelector(".cloud"),imgs=[...sec.querySelectorAll(".cloud-img")];
  const k=innerWidth<768?1.9:1; // במובייל הענן צריך פריטים גדולים יותר כדי להיקרא
  imgs.forEach(el=>{const w=+el.dataset.w*k;gsap.set(el,{left:el.dataset.x+"%",top:el.dataset.y+"%",width:w+"vw",height:w*0.75+"vw",autoAlpha:0,scale:.9});});
  gsap.to(imgs,{autoAlpha:1,scale:1,duration:.9,ease:"power3.out",stagger:{each:.06,from:"random"},scrollTrigger:{trigger:sec,start:"top 70%",toggleActions:"play none none none"}});
  const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"+=160%",pin:true,scrub:1}});
  imgs.forEach(el=>tl.to(el,{y:()=>-innerHeight*0.55*(+el.dataset.d),ease:"none"},0));
  if(matchMedia("(hover:hover)").matches){
    const setters=imgs.map(el=>({x:gsap.quickTo(el,"x",{duration:.9,ease:"power3"}),d:+el.dataset.d}));
    sec.addEventListener("mousemove",e=>{const r=sec.getBoundingClientRect();const nx=(e.clientX-r.left)/r.width-.5;setters.forEach(s=>s.x(-nx*60*s.d));});
  }
})();`
},
{
  id:"g38", cat:"gsap", name:"Lenis + ScrollTrigger: גלילה חלקה", tech:"Lenis · GSAP ticker", status:"ממתין",
  desc:"תשתית ולא אפקט: Lenis מחליק את הגלילה של כל העמוד, ומחובר לטיקר של GSAP כך שכל ה-ScrollTriggers נשארים מסונכרנים. כפתור צף מכבה ומדליק כדי להרגיש את ההבדל.",
  when:"אתרי חוויה ותדמית-וואו שבהם רוב המהלכים מבוססי גלילה. לא באתרי המרה, טפסים ומערכות: שם הגלילה הטבעית מנצחת. תמיד בתוך prefers-reduced-motion.",
  libs:["gsap","ScrollTrigger","Lenis"],
  css:`html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}
.ln-block{margin:clamp(60px,8vw,140px) var(--gutter);display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:center}
/* היפוך סדר העמודות בלבד. direction:ltr על הבלוק היה הופך גם את הטקסט העברי עצמו. */
.ln-block:nth-child(even)>:first-child{order:2}
.ln-block .ph{height:min(340px,46vw);font-size:26px}
.ln-block h3{font-size:clamp(24px,2.4vw,40px);margin:0 0 10px}.ln-block p{color:var(--muted);margin:0}
.ln-toggle{position:fixed;bottom:22px;inset-inline-start:22px;z-index:50;box-shadow:0 10px 30px rgba(0,0,0,.18)}
@media(max-width:767px){.ln-block{grid-template-columns:1fr}}`,
  html:`<div class="ln-block"><div><h3>הגלילה ממשיכה קצת אחרי שעזבת</h3><p>Lenis מוסיף אינרציה עדינה, כמו טראקפד טוב.</p></div><div class="ph ph-a">1</div></div>
<div class="ln-block"><div><h3>ה-ScrollTrigger לא יודע שמשהו השתנה</h3><p>הוא מקבל עדכון מכל פריים של Lenis דרך הטיקר של GSAP.</p></div><div class="ph ph-b">2</div></div>
<div class="ln-block"><div><h3>כבה, גלול, הדלק, גלול</h3><p>ההבדל מורגש בעיקר בגלגלת עכבר. בטראקפד ובמובייל הוא כמעט לא קיים.</p></div><div class="ph ph-c">3</div></div>
<div class="ln-block"><div><h3>לא לכל אתר</h3><p>גלילה מלאכותית באתר טפסים מרגישה כמו בוץ. שומרים את זה לאתרי חוויה.</p></div><div class="ph ph-d">4</div></div>
<button class="gbtn ln-toggle">Lenis: פועל</button>`,
  js:`(function(){
  let lenis=null;const btn=document.querySelector(".ln-toggle");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function raf(t){lenis&&lenis.raf(t*1000);}
  function on(){lenis=new Lenis({lerp:.09,wheelMultiplier:1});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(raf);gsap.ticker.lagSmoothing(0);btn.textContent="Lenis: פועל";}
  function off(){if(lenis){lenis.destroy();lenis=null;}gsap.ticker.remove(raf);btn.textContent="Lenis: כבוי";}
  if(!reduce)on();else off();
  btn.addEventListener("click",()=>lenis?off():on());
  gsap.utils.toArray(".ln-block").forEach(b=>{gsap.from(b.children,{y:40,autoAlpha:0,duration:.9,ease:"power3.out",stagger:.12,scrollTrigger:{trigger:b,start:"top 78%",once:true}});});
})();`,
  note:"בפרויקט אמיתי: Lenis נוצר פעם אחת ב-main, לפני כל ScrollTrigger, ומכובה אוטומטית תחת prefers-reduced-motion. אם יש בעמוד סקשן מוצמד (pin), עובדים עם pinType: transform או משאירים את ברירת המחדל של Lenis שמגלגלת את החלון (עובד)."
}
];
