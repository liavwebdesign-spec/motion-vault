// GSAP moves G31-G38: התנהגויות שנכרו מעמוד הבית של madewithgsap.com (2.9.2026)
// שחזור התנהגות בלבד, מאפס, עם פלייסהולדרים גנריים. אין העתקת קוד או עיצוב.
export default [
{
  id:"g31", cat:"gsap", name:"גלריה אנכית נגררת עם מונה", tech:"GSAP · Observer", status:"ממתין",
  desc:"ערימת מדיה אנכית: הפריט המרכזי גדול, השכנים מציצים מעליו ומתחתיו. גרירה, החלקה או גלגלת מעבירים פריט, המונה מתעדכן, והכותרת מפוצלת לשני צידי הערימה.",
  when:"הירו של אתרי פורטפוליו ואולפנים, תצוגת פרויקטים נבחרים. הגלגלת עוברת פריטים רק בתוך הגלריה, ובקצוות היא משחררת את הדף (אין מלכודת גלילה).",
  libs:["gsap","Observer"],
  css:`html,body{overflow-x:clip}
.vg{position:relative;height:min(82vh,720px);background:#0f1020;color:#fff;overflow:hidden;user-select:none}
/* הגרירה נתפסת על כל הגלריה, כולל הכותרות שבצדדים */
.vg.is-live{touch-action:pan-x;cursor:grab}
.vg.is-live:active{cursor:grabbing}
.vg:focus-visible{outline:2px solid var(--accent);outline-offset:-4px}
.vg-side{position:absolute;top:50%;transform:translateY(-50%);font-size:clamp(22px,2.4vw,40px);font-weight:700;white-space:nowrap;z-index:1}
.vg-side.r{right:var(--gutter)}.vg-side.l{left:var(--gutter)}
/* בלי GSAP (CDN חסום) הפריטים לא נערמים זה על זה: הם רשימה נגללת בתוך הגלריה */
.vg-stack{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:24px;overflow-y:auto;padding-block:48px}
.vg.is-live .vg-stack{display:grid;place-items:center;overflow:visible;padding-block:0}
/* הפריט המרכזי מקבל את הגודל הגדול ב-CSS והשכנים מוקטנים ב-JS. הגדלה מעל הרסטר מטשטשת תמונה אמיתית */
.vg-item{position:relative;flex:none;width:min(460px,51vw);aspect-ratio:4/3;font-size:36px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
.vg.is-live .vg-item{position:absolute;will-change:transform}
.vg-count{position:absolute;bottom:22px;right:var(--gutter);z-index:30;direction:ltr;unicode-bidi:isolate;font-variant-numeric:tabular-nums;font-size:14px;letter-spacing:.08em;color:#c9c9dd}
.vg-hint{position:absolute;bottom:22px;left:var(--gutter);z-index:30;font-size:13px;color:#8d8fa8}
@media(max-width:767px){.vg-side{display:none}.vg-item{width:82vw}.vg-hint{top:22px;bottom:auto}}`,
  html:`<div class="stage full" style="padding-block:0"><div class="vg" tabindex="0" role="region" aria-roledescription="גלריה" aria-label="עבודות נבחרות">
  <div class="vg-side r">עבודות נבחרות</div>
  <div class="vg-side l">מהשנה האחרונה</div>
  <div class="vg-stack">
    <div class="vg-item ph ph-a">1</div><div class="vg-item ph ph-b">2</div><div class="vg-item ph ph-c">3</div>
    <div class="vg-item ph ph-d">4</div><div class="vg-item ph ph-e">5</div><div class="vg-item ph ph-f">6</div><div class="vg-item ph ph-a">7</div>
  </div>
  <div class="vg-count" aria-live="polite">01 / 07</div>
  <div class="vg-hint">גרור למעלה ולמטה, או גלגל</div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof Observer==="undefined")return;
  const vg=document.querySelector(".vg"),stack=vg.querySelector(".vg-stack"),items=[...vg.querySelectorAll(".vg-item")],count=vg.querySelector(".vg-count");
  vg.classList.add("is-live");
  const rm=matchMedia("(prefers-reduced-motion: reduce)");
  const n=items.length;let cur=0,dragY=0,busy=false;
  const GAP=()=>items[0].offsetHeight*0.61;
  const pad=v=>String(v).padStart(2,"0");
  function layout(extra,instant){
    const g=GAP();
    items.forEach((it,i)=>{
      const off=i-cur;
      const y=off*g+(extra||0);
      const near=Math.abs(off+ (extra||0)/g);
      const props={y:y,scale:1-Math.min(near,1)*0.22,autoAlpha:Math.abs(off)>2?0:1,zIndex:20-Math.abs(off)};
      // בהפחתת תנועה המעבר בין פריטים מיידי
      if(instant||rm.matches)gsap.set(it,props);else gsap.to(it,Object.assign(props,{duration:.8,ease:"power3.out",overwrite:true}));
    });
  }
  function go(step){
    const next=Math.max(0,Math.min(n-1,cur+step));
    if(next===cur){layout(0);return false;}
    cur=next;layout(0);
    count.textContent=pad(cur+1)+" / "+pad(n);
    if(!rm.matches)gsap.fromTo(count,{y:6,autoAlpha:0},{y:0,autoAlpha:1,duration:.35,ease:"power2.out"});
    return true;
  }
  layout(0,true);
  const isTouch=e=>!!e&&(String(e.type).indexOf("touch")===0||e.pointerType==="touch");
  Observer.create({target:vg,type:"touch,pointer",preventDefault:true,dragMinimum:3,
    onDragStart:()=>{dragY=0;},
    onDrag:self=>{
      // במגע, בפריט הראשון או האחרון, החלקה החוצה מגלגלת את הדף: הגלריה לא הופכת למלכודת גלילה
      const out=(cur===0&&self.deltaY>0)||(cur===n-1&&self.deltaY<0);
      if(out&&dragY===0&&isTouch(self.event)){window.scrollBy(0,-self.deltaY);return;}
      dragY+=self.deltaY;layout(dragY,true);
    },
    onDragEnd:()=>{const steps=Math.round(-dragY/GAP());dragY=0;go(steps)||layout(0);}
  });
  vg.addEventListener("wheel",e=>{
    const dir=e.deltaY>0?1:-1;
    const canMove=(dir>0&&cur<n-1)||(dir<0&&cur>0);
    if(!canMove)return;
    e.preventDefault();
    if(busy)return;busy=true;go(dir);setTimeout(()=>busy=false,520);
  },{passive:false});
  // מקלדת: חצים ו-Page Up/Down בתוך הגלריה. בקצוות המקש עובר לדף
  vg.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"||e.key==="PageDown"){if(go(1))e.preventDefault();}
    else if(e.key==="ArrowUp"||e.key==="PageUp"){if(go(-1))e.preventDefault();}
  });
  addEventListener("resize",()=>layout(0,true));
})();`,
  runway:false,
  note:"בטלפון החלקה אנכית בתוך הגלריה מחליפה פריט, ובקצוות (פריט ראשון או אחרון) היא מגלגלת את הדף, כך שאין מלכודת. במקלדת: פוקוס על הגלריה, ואז חצים למעלה ולמטה; המונה מוכרז לקורא מסך. המונה מקבל direction:ltr, אחרת בעמוד עברי הוא מוצג הפוך (\"07 / 01\"). הפריט המרכזי מקבל את הגודל הגדול ב-CSS והשכנים מוקטנים, כי הגדלה מעל הרסטר מטשטשת תמונה אמיתית. בהפחתת תנועה המעבר בין פריטים מיידי, ובלי GSAP הפריטים הם רשימה נגללת בתוך הגלריה."
},

{
  id:"g35", cat:"gsap", name:"טקסט ענק זורם על גל בגלילה", tech:"GSAP · ScrollTrigger · SplitText", status:"ממתין",
  desc:"משפט ענק, רחב מהמסך, מוצמד למסך ונוסע לרוחבו בקצב הגלילה. כל מילה מתנדנדת על גל משלה, כך שהשורה נראית כמו סרט שמתגלגל ולא כמו טקסט שזז.",
  when:"סיום העמוד לפני ה-CTA, הצהרת מותג, מעבר בין פרקים. משפט אחד קצר, מילים גדולות. בעברית הגל על מילים, לא על אותיות.",
  libs:["gsap","ScrollTrigger","SplitText"],
  css:`html,body{overflow-x:clip}
/* בלי תנועה (וגם בלי JS) המשפט נשבר לשורות וכולו נקרא. השורה הרחבה והנעילה קיימות רק תחת .is-live */
.wave{display:flex;align-items:center;overflow:hidden;background:var(--bg);border-block:1px solid var(--line);padding-block:var(--sec)}
.wave-track{font-size:clamp(44px,9vw,140px);font-weight:800;line-height:1.1;padding-inline:var(--gutter)}
.wave.is-live{height:100vh;padding-block:0}
.wave.is-live .wave-track{white-space:nowrap;font-size:clamp(72px,14vw,240px);line-height:1;will-change:transform}
.wave-track .word{display:inline-block;will-change:transform}`,
  html:`<div class="wave"><div class="wave-track">אז, מוכנים להתחיל לזוז?</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof SplitText==="undefined")return;
  const track=document.querySelector(".wave-track"),sec=document.querySelector(".wave");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    sec.classList.add("is-live");
    const split=SplitText.create(track,{type:"words",wordsClass:"word"});
    const words=split.words;
    const dist=()=>Math.max(0,track.scrollWidth-sec.clientWidth);
    const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"+=220%",pin:true,scrub:.6,invalidateOnRefresh:true}});
    tl.fromTo(track,{x:0},{x:()=>dist(),ease:"none"},0);
    tl.fromTo(words,{y:i=>Math.sin(i*1.1)*70,rotation:i=>Math.sin(i*1.1)*9},{y:i=>Math.sin(i*1.1+Math.PI)*70,rotation:i=>Math.sin(i*1.1+Math.PI)*9,ease:"none"},0);
    return ()=>{split.revert();sec.classList.remove("is-live");};
  });
})();`,
  note:"בכיוון RTL הטקסט מתחיל מימין והעודף נמצא משמאל, לכן המסלול מזיז את הרצועה ימינה (x חיובי). באתר LTR הופכים את הסימן. בהפחתת תנועה, וגם כש-GSAP לא נטען, אין נעילה ואין שורה רחבה: המשפט נשבר לשורות בגודל שנכנס למסך, כי ה-nowrap והגובה המלא יושבים רק תחת .is-live שהסקריפט מוסיף."
},
{
  id:"g36", cat:"gsap", name:"מעבר סקשן בקשת שמתיישרת", tech:"GSAP · ScrollTrigger · MorphSVG", status:"ממתין",
  desc:"הגבול בין סקשן בהיר לכהה הוא קשת עגולה. ככל שגוללים אליו, הקשת מתיישרת לקו ישר. מעבר רך במקום חיתוך, בלי תמונה ובלי clip-path קופצני.",
  when:"מעבר מהירו לסקשן הבא, כניסה לציטוט או לסקשן אודות. פעם או פעמיים בעמוד. עובד על כל שני צבעי רקע.",
  libs:["gsap","ScrollTrigger","MorphSVGPlugin"],
  css:`.arc-light{background:var(--card);padding:var(--sec) var(--gutter);text-align:center}
.arc-dark{background:#0f1020;color:#fff;position:relative;padding:0 var(--gutter) var(--sec)}
.arc-svg{display:block;width:100%;height:clamp(60px,14vw,220px)}
/* הקשת היא המשך של הסקשן הבהיר, ולכן היא באותו טוקן בדיוק */
.arc-svg path{fill:var(--card)}
.arc-inner{max-width:720px;margin-inline:auto;padding-top:clamp(40px,5vw,80px);text-align:center}
.arc-card{background:var(--card);color:var(--ink);border-radius:20px;padding:36px 28px;margin-top:32px;display:inline-block;min-width:min(360px,80vw)}
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
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.to("#arcA",{morphSVG:"#arcB",ease:"none",
      scrollTrigger:{trigger:".arc-svg",start:"top 95%",end:"top 25%",scrub:.6}});
  });
  // בלי תנועה הגבול כבר ישר
  mm.add("(prefers-reduced-motion: reduce)",()=>{gsap.set("#arcA",{morphSVG:"#arcB"});});
})();`,
  note:"הקשת צבועה בטוקן של הסקשן הבהיר (var(--card)) ולא בלבן קבוע, אחרת בכל עור שבו הכרטיס לא לבן נוצרת עדשה לבנה עם תפר. בהפחתת תנועה הגבול מוצג ישר מההתחלה."
},
{
  id:"g37", cat:"gsap", name:"ענן תמונות מרחפות בעומק", tech:"GSAP · ScrollTrigger · quickTo", status:"ממתין",
  desc:"סקשן מוצמד שבו תמונות מפוזרות במרחב בגדלים שונים. בגלילה כל תמונה עולה במהירות משלה לפי העומק שלה, והעכבר מזיז את כולן בעדינות בפרלקסה.",
  when:"הצגת אוסף: לקוחות, פרויקטים, קהילה, מוצרים. במקום גריד מסודר, תחושת מרחב. 7 עד 12 תמונות, לא יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.cloud{height:100vh;position:relative;overflow:hidden;background:#0f1020}
/* המיקום והגודל ב-CSS (משתנים על כל תמונה), כך שהענן מסודר גם בלי JS ומתעדכן בסיבוב מסך */
.cloud-img{position:absolute;left:calc(var(--x)*1%);top:calc(var(--y)*1%);width:calc(var(--w)*1vw);height:calc(var(--w)*.75vw);
  border-radius:10px;font-size:16px;will-change:transform;box-shadow:0 18px 40px rgba(0,0,0,.4)}
.cloud-title{position:absolute;inset:auto var(--gutter) 10%;color:#fff;font-size:clamp(24px,2.6vw,42px);font-weight:700;max-width:520px;pointer-events:none}
.cloud-cta{display:inline-block;margin-top:14px;padding:12px 22px;border-radius:999px;background:var(--card);color:var(--ink);font-size:15px;font-weight:500;
  pointer-events:auto;text-decoration:none;transition:background .18s,color .18s}
@media(hover:hover) and (pointer:fine){.cloud-cta:hover{background:var(--accent);color:var(--accent-ink)}}
.cloud-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
/* בטלפון התמונות גדולות יותר כדי להיקרא, ולא יוצאות מהקצה */
@media(max-width:767px){.cloud-img{width:calc(var(--w)*1.9vw);height:calc(var(--w)*1.425vw);left:min(calc(var(--x)*1%),calc(100% - var(--w)*1.9vw - 8px))}}`,
  html:`<div class="cloud">
  <div class="cloud-img ph ph-a" style="--x:8;--y:12;--w:16" data-d="1.4">1</div>
  <div class="cloud-img ph ph-b" style="--x:30;--y:6;--w:22" data-d="0.9">2</div>
  <div class="cloud-img ph ph-c" style="--x:58;--y:14;--w:10" data-d="1.8">3</div>
  <div class="cloud-img ph ph-d" style="--x:74;--y:4;--w:18" data-d="1.1">4</div>
  <div class="cloud-img ph ph-e" style="--x:14;--y:48;--w:12" data-d="1.6">5</div>
  <div class="cloud-img ph ph-f" style="--x:40;--y:42;--w:26" data-d="0.7">6</div>
  <div class="cloud-img ph ph-a" style="--x:70;--y:40;--w:14" data-d="1.3">7</div>
  <div class="cloud-img ph ph-b" style="--x:86;--y:58;--w:9" data-d="2">8</div>
  <div class="cloud-img ph ph-c" style="--x:4;--y:76;--w:20" data-d="1">9</div>
  <div class="cloud-title">קהילה שבונה דברים יפים<br><a class="cloud-cta" href="#">לכל הפרויקטים ←</a></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const sec=document.querySelector(".cloud"),imgs=[...sec.querySelectorAll(".cloud-img")];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(imgs,{autoAlpha:0,scale:.9});
    gsap.to(imgs,{autoAlpha:1,scale:1,duration:.9,ease:"power3.out",stagger:{each:.06,from:"random"},scrollTrigger:{trigger:sec,start:"top 70%",toggleActions:"play none none none"}});
    const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"+=160%",pin:true,scrub:.6,invalidateOnRefresh:true}});
    imgs.forEach(el=>tl.to(el,{y:()=>-innerHeight*0.55*(+el.dataset.d),ease:"none"},0));
    if(matchMedia("(hover:hover)").matches){
      const setters=imgs.map(el=>({x:gsap.quickTo(el,"x",{duration:.9,ease:"power3"}),d:+el.dataset.d}));
      const move=e=>{const r=sec.getBoundingClientRect();const nx=(e.clientX-r.left)/r.width-.5;setters.forEach(s=>s.x(-nx*60*s.d));};
      sec.addEventListener("mousemove",move);
      return ()=>sec.removeEventListener("mousemove",move);
    }
  });
})();`,
  note:"המיקום והגודל של כל תמונה יושבים ב-CSS דרך משתנים (--x, --y, --w), ולא ב-JS: הענן מסודר גם בלי סקריפט, ובטלפון התמונות גדלות ונעצרות לפני הקצה בלי קריאת innerWidth. הקישור \"לכל הפרויקטים\" הוא a אמיתי עם pointer-events משלו, כי הכותרת שסביבו לא לוכדת את העכבר. בהפחתת תנועה אין נעילה, פרלקסה או מעקב עכבר: התמונות פשוט במקומן."
},
{
  id:"g38", cat:"gsap", name:"Lenis + ScrollTrigger: גלילה חלקה", tech:"Lenis · GSAP ticker", status:"ממתין",
  desc:"תשתית ולא אפקט: Lenis מחליק את הגלילה של כל העמוד, ומחובר לטיקר של GSAP כך שכל ה-ScrollTriggers נשארים מסונכרנים. כפתור צף מכבה ומדליק כדי להרגיש את ההבדל.",
  when:"אתרי חוויה ותדמית-וואו שבהם רוב המהלכים מבוססי גלילה. לא באתרי המרה, טפסים ומערכות: שם הגלילה הטבעית מנצחת. תמיד בתוך prefers-reduced-motion.",
  libs:["gsap","ScrollTrigger","Lenis"],
  css:`html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}
.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-stopped{overflow:hidden}.lenis.lenis-smooth iframe{pointer-events:none}
.ln-block{margin:clamp(60px,8vw,140px) var(--gutter);display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:center}
/* היפוך סדר העמודות בלבד. direction:ltr על הבלוק היה הופך גם את הטקסט העברי עצמו.
   הבלוקים עטופים ב-.ln-list, כדי ש-nth-child ייספר בתוך הרשימה ולא לפי מה שיושב לפניה בעמוד */
.ln-block:nth-child(even)>:first-child{order:2}
.ln-block .ph{height:min(340px,46vw);font-size:26px}
.ln-block h3{font-size:clamp(24px,2.4vw,40px);margin:0 0 10px}.ln-block p{color:var(--muted);margin:0}
.ln-toggle{position:fixed;bottom:22px;inset-inline-start:22px;z-index:50;box-shadow:0 10px 30px rgba(0,0,0,.18)}
/* בטור אחד אין היפוך: כל טקסט מעל התמונה שלו */
@media(max-width:767px){.ln-block{grid-template-columns:1fr}.ln-block:nth-child(even)>:first-child{order:0}}`,
  html:`<div class="ln-list"><div class="ln-block"><div><h3>הגלילה ממשיכה קצת אחרי שעזבת</h3><p>Lenis מוסיף אינרציה עדינה, כמו טראקפד טוב.</p></div><div class="ph ph-a">1</div></div>
<div class="ln-block"><div><h3>ה-ScrollTrigger לא יודע שמשהו השתנה</h3><p>הוא מקבל עדכון מכל פריים של Lenis דרך הטיקר של GSAP.</p></div><div class="ph ph-b">2</div></div>
<div class="ln-block"><div><h3>כבה, גלול, הדלק, גלול</h3><p>ההבדל מורגש בעיקר בגלגלת עכבר. בטראקפד ובמובייל הוא כמעט לא קיים.</p></div><div class="ph ph-c">3</div></div>
<div class="ln-block"><div><h3>לא לכל אתר</h3><p>גלילה מלאכותית באתר טפסים מרגישה כמו בוץ. שומרים את זה לאתרי חוויה.</p></div><div class="ph ph-d">4</div></div>
</div>
<button class="gbtn ln-toggle">Lenis: פועל</button>`,
  js:`(function(){
  const btn=document.querySelector(".ln-toggle");
  if(typeof gsap==="undefined"||typeof Lenis==="undefined"){btn.textContent="Lenis: לא נטען";btn.disabled=true;return;}
  let lenis=null;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function raf(t){lenis&&lenis.raf(t*1000);}
  function on(){lenis=new Lenis({lerp:.12,wheelMultiplier:1});lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(raf);gsap.ticker.lagSmoothing(0);btn.textContent="Lenis: פועל";}
  // בכיבוי מחזירים גם את ה-lagSmoothing לברירת המחדל של GSAP
  function off(){if(lenis){lenis.destroy();lenis=null;}gsap.ticker.remove(raf);gsap.ticker.lagSmoothing(500,33);btn.textContent="Lenis: כבוי";}
  if(!reduce)on();else off();
  btn.addEventListener("click",()=>lenis?off():on());
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.utils.toArray(".ln-block").forEach(b=>{gsap.from(b.children,{y:40,autoAlpha:0,duration:.9,ease:"power3.out",stagger:.12,scrollTrigger:{trigger:b,start:"top 78%",once:true}});});
  });
})();`,
  note:"בפרויקט אמיתי: Lenis נוצר פעם אחת ב-main, לפני כל ScrollTrigger, ומכובה אוטומטית תחת prefers-reduced-motion (וכך גם חשיפת הבלוקים). lerp בטווח של התורה, 0.1 עד 0.14. שלוש שורות ה-CSS של lenis-stopped, data-lenis-prevent ו-iframe חובה בכל עמוד עם Lenis. אם יש בעמוד סקשן מוצמד (pin), עובדים עם pinType: transform או משאירים את ברירת המחדל של Lenis שמגלגלת את החלון (עובד)."
}
];
