// GSAP moves G23-G30: מבוסס על הפלאגינים הרשמיים (סקילי GreenSock מותקנים אצלנו כרפרנס)
export default [
{
  id:"g23", cat:"gsap", name:"Flip: פריט קופץ לגריד וחזרה", tech:"GSAP · Flip", status:"ממתין",
  desc:"לחיצה על כרטיס מעבירה אותו מהגריד לתצוגה מורחבת, וה-Flip מנפיש את המסע בין שני המצבים אוטומטית.",
  when:"גלריה שנפתחת לפריט מורחב, מיון וסינון עם תזוזה חלקה, שינוי לייאאוט חי.",
  libs:["gsap","Flip"],
  css:`.flip-zone{padding-inline:var(--gutter)}
.flip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;overflow:hidden}
.flip-item{height:120px;cursor:pointer;font-size:15px}
.flip-item.big{grid-column:1/-1;height:320px;font-size:26px}
@media(max-width:767px){.flip-grid{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage tight flip-zone"><p class="center" style="color:var(--muted);font-size:14px;margin-top:0">לחץ על כרטיס כדי להגדיל אותו, ולחץ שוב כדי להחזיר</p>
<div class="flip-grid">
<div class="flip-item ph ph-a">1</div><div class="flip-item ph ph-b">2</div>
<div class="flip-item ph ph-c">3</div><div class="flip-item ph ph-d">4</div>
</div></div>`,
  js:`const grid=document.querySelector(".flip-grid");
const items=[...document.querySelectorAll(".flip-item")];
const D=.55,E="power2.inOut";
let busy=false;

items.forEach(item=>{
  item.addEventListener("click",()=>{
    if(busy)return; busy=true;

    const state=Flip.getState(items);
    const h0=grid.getBoundingClientRect().height;
    const fs0=items.map(el=>getComputedStyle(el).fontSize);

    items.forEach(b=>{if(b!==item)b.classList.remove("big")});
    item.classList.toggle("big");

    const h1=grid.getBoundingClientRect().height;
    const fs1=items.map(el=>getComputedStyle(el).fontSize);

    // absolute:true מוציא את כל הפריטים מהזרימה, הגריד מתרוקן ומתכווץ לאפס,
    // וכל מה שמתחת קופץ למעלה ובחזרה. מנפישים את גובה הגריד במקביל.
    gsap.fromTo(grid,{height:h0},{height:h1,duration:D,ease:E,
      onComplete:()=>gsap.set(grid,{clearProps:"height"})});

    // Flip לא מאינטרפל font-size, ולכן הטקסט קופץ למידה החדשה בפריים הראשון.
    items.forEach((el,i)=>{
      if(fs0[i]===fs1[i])return;
      gsap.fromTo(el,{fontSize:fs0[i]},{fontSize:fs1[i],duration:D,ease:E,
        onComplete:()=>gsap.set(el,{clearProps:"fontSize"})});
    });

    Flip.from(state,{duration:D,ease:E,absolute:true,onComplete:()=>{busy=false}});
  });
});`,
  runway:false
},

{
  id:"g25", cat:"gsap", name:"MotionPath: אלמנט נוסע על מסלול", tech:"GSAP · MotionPath", status:"ממתין",
  desc:"אייקון שנוסע לאורך מסלול SVG מפותל, כולל סיבוב אוטומטי לכיוון הנסיעה.",
  when:"המחשת מסע לקוח, לוגו שמטייל בין תחנות, אינפוגרפיקה חיה.",
  libs:["gsap","ScrollTrigger","MotionPathPlugin"],
  css:`.mp-wrap{width:min(720px,86vw);margin-inline:auto;position:relative}
.mp-wrap svg{width:100%;height:auto;overflow:visible}
.mp-path{fill:none;stroke:#d5d5e2;stroke-width:2;stroke-dasharray:6 8}
.mp-ship{position:absolute;top:0;left:0;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#4a3aff,#c2255c);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px}`,
  html:`<div class="stage"><div class="mp-wrap">
<svg viewBox="0 0 700 260"><path class="mp-path" id="mpp" d="M30,200 C150,40 280,240 400,110 S620,60 670,180"/></svg>
<div class="mp-ship">✈</div>
</div></div>`,
  js:`gsap.to(".mp-ship",{
  motionPath:{path:"#mpp",align:"#mpp",alignOrigin:[.5,.5],autoRotate:true},
  ease:"none",
  scrollTrigger:{trigger:".mp-wrap",start:"top 80%",end:"top 20%",scrub:1}});`
},




{
  id:"g30", cat:"gsap", name:"סקשנים ננעלים עם Snap", tech:"GSAP · ScrollTrigger snap", status:"ממתין",
  desc:"שלושה מסכים אופקיים שהגלילה נצמדת אליהם: עוזבים את הגלגלת והמסך מתיישר לסקשן הקרוב.",
  when:"מצגות מוצר, סיפור בפרקים. גרסה ממושמעת של גלילה צידית.",
  libs:["gsap","ScrollTrigger"],
  css:`.snapw{overflow:hidden;transition:all 0s !important}
.snapc{display:flex;width:300vw}
.snapp{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;font-size:var(--fs-h2);font-weight:700;color:#fff}`,
  html:`<div class="snapw"><div class="snapc">
<div class="snapp ph-a ph">פרק ראשון</div>
<div class="snapp ph-b ph">פרק שני</div>
<div class="snapp ph-c ph">פרק שלישי</div>
</div></div>`,
  js:`// עמוד עברי: הרצועה מתחילה מהקצה הימני והגלישה יוצאת שמאלה, ולכן x חיובי.
// המצלמה נעה שמאלה בתוך התוכן, בדיוק ככיוון הקריאה. באתר אנגלי מוסיפים מינוס.
gsap.to(".snapc",{x:()=>document.querySelector(".snapc").scrollWidth-innerWidth,ease:"none",
  scrollTrigger:{trigger:".snapw",start:"top top",end:"+=2400",scrub:.6,pin:true,anticipatePin:1,
    invalidateOnRefresh:true,snap:{snapTo:1/2,duration:.4,ease:"power1.inOut"}}});`,
  note:"הפאנל הראשון הוא הימני, והגלילה חושפת את הבאים מצד שמאל. זה הכיוון הנכון לעברית. אזהרה חתומה: בלי overscroll-behavior:none על העטיפה, זה חוסם את הגלגלת."
}
];
