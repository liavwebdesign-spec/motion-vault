// GSAP moves G23-G30: מבוסס על הפלאגינים הרשמיים (סקילי GreenSock מותקנים אצלנו כרפרנס)
export default [
{
  id:"g23", cat:"gsap", name:"Flip: פריט קופץ לגריד וחזרה", tech:"GSAP · Flip", status:"ממתין",
  desc:"לחיצה על כרטיס מעבירה אותו מהגריד לתצוגה מורחבת, וה-Flip מנפיש את המסע בין שני המצבים אוטומטית.",
  when:"גלריה שנפתחת לפריט מורחב, מיון וסינון עם תזוזה חלקה, שינוי לייאאוט חי.",
  libs:["gsap","Flip"],
  css:`.flip-zone{padding-inline:var(--gutter)}
.flip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;overflow:hidden}
.flip-item{height:120px;cursor:pointer;border:0;padding:0;font-family:inherit;font-size:15px}
.flip-item:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.flip-item.big{grid-column:1/-1;height:320px;font-size:26px}
@media(max-width:767px){.flip-grid{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage tight flip-zone"><p class="center" style="color:var(--muted);font-size:14px;margin-top:0">לחץ על כרטיס כדי להגדיל אותו, ולחץ שוב כדי להחזיר</p>
<div class="flip-grid">
<button type="button" class="flip-item ph ph-a" aria-expanded="false"><span class="ph-l"><span>1</span></span></button><button type="button" class="flip-item ph ph-b" aria-expanded="false"><span class="ph-l"><span>2</span></span></button>
<button type="button" class="flip-item ph ph-c" aria-expanded="false"><span class="ph-l"><span>3</span></span></button><button type="button" class="flip-item ph ph-d" aria-expanded="false"><span class="ph-l"><span>4</span></span></button>
</div></div>`,
  js:`(function(){
const grid=document.querySelector(".flip-grid");
const items=[...grid.querySelectorAll(".flip-item")];
const rm=matchMedia("(prefers-reduced-motion: reduce)");
const D=.55,E="power2.inOut";
let busy=false;

// החלפת המצב עצמה: רצה תמיד, גם בהפחתת תנועה וגם כש-GSAP לא נטען (CDN חסום). רק המעבר מותנה.
function swap(item){
  items.forEach(b=>{if(b!==item)b.classList.remove("big")});
  item.classList.toggle("big");
  items.forEach(b=>b.setAttribute("aria-expanded",b.classList.contains("big")));
}

items.forEach(item=>{
  item.addEventListener("click",()=>{
    if(busy)return;
    if(typeof Flip==="undefined"||rm.matches){swap(item);return;}
    busy=true;

    const state=Flip.getState(items);
    const h0=grid.getBoundingClientRect().height;
    const fs0=items.map(el=>getComputedStyle(el).fontSize);

    swap(item);

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
});
})();`,
  runway:false,
  note:"Flip לא מנפיש גודל פונט, ו-absolute:true מוציא את הפריטים מהזרימה כך שהגריד מתכווץ; לכן שניהם מונפשים ידנית ומנוקים ב-clearProps בסוף. הכרטיסים הם button עם aria-expanded, כך שהם נפתחים גם ב-Enter וברווח וקורא מסך יודע שהם נפתחים. בהפחתת תנועה, או כש-GSAP לא נטען, הפריסה מתחלפת מיד בלי מעבר. בעמוד עם כמה גרידים מעבירים ל-Flip.getState רק את הפריטים של הגריד הזה."
},

{
  id:"g25", cat:"gsap", name:"MotionPath: אלמנט נוסע על מסלול", tech:"GSAP · MotionPath", status:"ממתין",
  desc:"אייקון שנוסע לאורך מסלול SVG מפותל בקצב הגלילה, ומסתובב לכיוון הנסיעה.",
  when:"המחשת מסע לקוח, לוגו שמטייל בין תחנות, אינפוגרפיקה חיה.",
  libs:["gsap","ScrollTrigger","MotionPathPlugin"],
  css:`.mp-wrap{width:min(720px,86vw);margin-inline:auto;position:relative}
.mp-wrap svg{width:100%;height:auto;overflow:visible}
.mp-path{fill:none;stroke:#d5d5e2;stroke-width:2;stroke-dasharray:6 8}
.mp-ship{position:absolute;top:0;left:0;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#c2255c);display:flex;align-items:center;justify-content:center;color:var(--accent-ink)}
.mp-ship svg{width:20px;height:20px;display:block}`,
  html:`<div class="stage"><div class="mp-wrap">
<svg viewBox="0 0 700 260"><path class="mp-path" id="mpp" d="M670,180 C620,60 520,-20 400,110 C280,240 150,40 30,200"/></svg>
<div class="mp-ship" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5l16 7-16 7 4-7z" fill="currentColor"/></svg></div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  // האייקון הוא SVG שהחרטום שלו מצביע ימינה ב-0 מעלות, ולכן autoRotate מכוון אותו בדיוק לכיוון הנסיעה
  const path={path:"#mpp",align:"#mpp",alignOrigin:[.5,.5],autoRotate:true};
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.to(".mp-ship",{motionPath:path,ease:"none",
      // invalidateOnRefresh: אחרי שינוי רוחב המסלול מחושב מחדש, אחרת האייקון עוזב את הקו
      scrollTrigger:{trigger:".mp-wrap",start:"top 80%",end:"top 20%",scrub:.6,invalidateOnRefresh:true}});
  });
  mm.add("(prefers-reduced-motion: reduce)",()=>{
    // בלי תנועה האייקון יושב בסוף המסלול, כמו אחרי הנסיעה
    const put=()=>gsap.set(".mp-ship",{motionPath:Object.assign({start:1,end:1},path)});
    put();addEventListener("resize",put);
    return ()=>removeEventListener("resize",put);
  });
})();`,
  note:"בעמוד עברי המסלול מתחיל מימין ונגמר משמאל, ככיוון הקריאה. באתר אנגלי הופכים את סדר הנקודות ב-d. האייקון הוא SVG ולא תו כמו ✈, כי תו מצויר אחרת בכל מערכת (באייפון הוא אמוג'י שמצביע באלכסון), ואז אחרי autoRotate החרטום פונה לכיוון לא צפוי. בהפחתת תנועה האייקון מוצב בסוף המסלול בלי נסיעה."
},




{
  id:"g30", cat:"gsap", name:"סקשנים ננעלים עם Snap", tech:"GSAP · ScrollTrigger snap", status:"ממתין",
  desc:"שלושה מסכים אופקיים שהגלילה נצמדת אליהם: עוזבים את הגלגלת והמסך מתיישר לסקשן הקרוב.",
  when:"מצגות מוצר, סיפור בפרקים. גרסה ממושמעת של גלילה צידית.",
  libs:["gsap","ScrollTrigger"],
  css:`.snapw{overflow:hidden;transition:all 0s !important}
/* בלי GSAP ובהפחתת תנועה הפרקים נערמים זה מתחת לזה ונקראים בגלילה רגילה.
   הרצועה האופקית נבנית רק כשהסקריפט רץ ומוסיף .is-live */
.snapc{display:flex;flex-direction:column}
.snapp{width:100%;min-height:70vh;display:flex;align-items:center;justify-content:center;font-size:var(--fs-h2);font-weight:700;color:#fff}
.snapw.is-live .snapc{flex-direction:row;width:300vw}
.snapw.is-live .snapp{width:100vw;height:100vh;min-height:0;flex:none}`,
  html:`<div class="snapw"><div class="snapc">
<div class="snapp ph-a ph">פרק ראשון</div>
<div class="snapp ph-b ph">פרק שני</div>
<div class="snapp ph-c ph">פרק שלישי</div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const wrap=document.querySelector(".snapw"),track=wrap.querySelector(".snapc");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    wrap.classList.add("is-live");
    // עמוד עברי: הרצועה מתחילה מהקצה הימני והגלישה יוצאת שמאלה, ולכן x חיובי.
    // המצלמה נעה שמאלה בתוך התוכן, בדיוק ככיוון הקריאה. באתר אנגלי מוסיפים מינוס.
    gsap.to(track,{x:()=>track.scrollWidth-innerWidth,ease:"none",
      // שני מסכים של גלילה לשני מעברים, בכל גודל מסך (התקציב: עד 2.5 מסכים לסצנה מוצמדת)
      scrollTrigger:{trigger:wrap,start:"top top",end:()=>"+="+Math.round(innerHeight*2),scrub:.6,pin:true,anticipatePin:1,
        invalidateOnRefresh:true,snap:{snapTo:1/2,duration:.4,ease:"power2.inOut"}}});
    return ()=>wrap.classList.remove("is-live");
  });
})();`,
  note:"הפאנל הראשון הוא הימני, והגלילה חושפת את הבאים מצד שמאל. זה הכיוון הנכון לעברית. אורך הסצנה שני מסכים, מחושב מגובה המסך ולא בפיקסלים קבועים. אזהרה חתומה: לא לשים overscroll-behavior:none על העטיפה, זה חוסם את הגלגלת. בהפחתת תנועה, וגם כש-GSAP לא נטען, אין נעילה: שלושת הפרקים נערמים זה מתחת לזה, כי הפריסה האופקית קיימת רק תחת .is-live שהסקריפט מוסיף."
}
];
