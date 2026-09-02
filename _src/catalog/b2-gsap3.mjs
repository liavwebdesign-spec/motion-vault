// GSAP moves G23-G30: מבוסס על הפלאגינים הרשמיים (סקילי GreenSock מותקנים אצלנו כרפרנס)
export default [
{
  id:"g23", cat:"gsap", name:"Flip: פריט קופץ לגריד וחזרה", tech:"GSAP · Flip", status:"ממתין",
  desc:"לחיצה על כרטיס מעבירה אותו מהגריד לתצוגה מורחבת, וה-Flip מנפיש את המסע בין שני המצבים אוטומטית.",
  when:"גלריה שנפתחת לפריט מורחב, מיון וסינון עם תזוזה חלקה, שינוי לייאאוט חי.",
  libs:["gsap","Flip"],
  css:`.flip-zone{padding-inline:var(--gutter)}
.flip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.flip-item{height:120px;cursor:pointer;font-size:15px}
.flip-item.big{grid-column:1/-1;height:320px;font-size:26px}
@media(max-width:767px){.flip-grid{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage tight flip-zone"><p class="center" style="color:var(--muted);font-size:14px;margin-top:0">לחץ על כרטיס כדי להגדיל אותו, ולחץ שוב כדי להחזיר</p>
<div class="flip-grid">
<div class="flip-item ph ph-a">1</div><div class="flip-item ph ph-b">2</div>
<div class="flip-item ph ph-c">3</div><div class="flip-item ph ph-d">4</div>
</div></div>`,
  js:`document.querySelectorAll(".flip-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const state=Flip.getState(".flip-item");
    document.querySelectorAll(".flip-item.big").forEach(b=>{if(b!==item)b.classList.remove("big")});
    item.classList.toggle("big");
    Flip.from(state,{duration:.55,ease:"power2.inOut",absolute:true});
  });
});`,
  runway:false
},
{
  id:"g24", cat:"gsap", name:"ScrambleText: טקסט מתערבל", tech:"GSAP · ScrambleText", status:"ממתין",
  desc:"הכותרת מתגלה מתוך ערבול תווים אקראי, כמו מסוף ישן או לוח טיסות.",
  when:"אתרי טק, AI וסייבר. כותרת אחת, לא על טקסט רץ. באנגלית חזק יותר; בעברית עובד עם אותיות עבריות.",
  libs:["gsap","ScrollTrigger","ScrambleTextPlugin"],
  css:`.scramble{font-size:var(--fs-demo);font-weight:700;text-align:center;min-height:1.3em}
.scr-btn{margin-top:24px}`,
  html:`<div class="stage tight center">
<h2 class="scramble">הטקסט הזה נולד מתוך רעש</h2>
<button class="gbtn scr-btn">הפעל שוב</button>
</div>`,
  js:`function scramble(){
  gsap.to(".scramble",{duration:1.8,scrambleText:{
    text:"הטקסט הזה נולד מתוך רעש",chars:"אבגדהוזחטיכלמנסעפצקרשת",revealDelay:.3,speed:.4}});
}
gsap.to(".scramble",{scrollTrigger:{trigger:".scramble",start:"top 75%",once:true},onStart:scramble});
document.querySelector(".scr-btn").addEventListener("click",scramble);`
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
  id:"g26", cat:"gsap", name:"DrawSVG: קו חתימה שמצייר את עצמו", tech:"GSAP · DrawSVG", status:"ממתין",
  desc:"קו SVG שמצויר בקצב הגלילה, כמו חתימה או קו עלילה שמלווה את התוכן.",
  when:"קו מחבר בין תחנות תהליך, חתימה אישית בהירו, קישוט עריכתי חי.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.dsw{width:min(640px,84vw);margin-inline:auto}
.dsw svg{width:100%;height:auto;overflow:visible}
.dsw path{fill:none;stroke:#4a3aff;stroke-width:3;stroke-linecap:round}`,
  html:`<div class="stage"><div class="dsw">
<svg viewBox="0 0 600 200">
<path d="M20,120 C80,40 140,180 210,100 C260,45 300,160 360,110 C420,65 470,150 530,90 C555,65 570,80 580,70"/>
</svg>
</div></div>`,
  js:`gsap.set(".dsw path",{drawSVG:"0%"});
gsap.to(".dsw path",{drawSVG:"100%",ease:"none",
  scrollTrigger:{trigger:".dsw",start:"top 80%",end:"top 25%",scrub:1}});`
},
{
  id:"g27", cat:"gsap", name:"CustomWiggle: רעד תשומת לב", tech:"GSAP · CustomWiggle", status:"ממתין",
  desc:"רעידת עדינה ומבוקרת עם דעיכה טבעית: פעמון שמצלצל, כפתור שמושך תשומת לב.",
  when:"נקודת CTA שרוצים להזכיר את קיומה, אייקון התראה. במשורה: פעם בכמה שניות מקסימום.",
  libs:["gsap","CustomEase","CustomWiggle"],
  css:`.wig-row{display:flex;gap:40px;justify-content:center;align-items:center}
.bell{width:74px;height:74px;border-radius:50%;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:30px;cursor:pointer}`,
  html:`<div class="stage tight"><div class="wig-row">
<div class="bell" data-wig="rotation">🔔</div>
<button class="gbtn" data-wig="x">כפתור שרועד</button>
</div>
<p class="center" style="color:var(--muted);font-size:13px">לחץ על הפעמון או על הכפתור</p></div>`,
  js:`CustomWiggle.create("bellWiggle",{wiggles:7,type:"easeOut"});
document.querySelectorAll("[data-wig]").forEach(el=>{
  const prop=el.dataset.wig;
  function go(){const o={duration:.9,ease:"bellWiggle"};o[prop]=prop==="rotation"?14:8;gsap.fromTo(el,{[prop]:0},o);}
  el.addEventListener("click",go);
});`,
  runway:false
},
{
  id:"g28", cat:"gsap", name:"ScrollTo: ניווט עוגנים חלק", tech:"GSAP · ScrollToPlugin", status:"ממתין",
  desc:"לחיצה על פריט ניווט גוללת חלק אל הסקשן, עם פיצוי לגובה ההדר ועדכון הפריט הפעיל.",
  when:"עמודי נחיתה ארוכים עם תפריט עוגנים, one-page.",
  libs:["gsap","ScrollToPlugin","ScrollTrigger"],
  css:`.anav{position:sticky;top:0;z-index:50;display:flex;gap:8px;justify-content:center;background:rgba(247,247,250,.94);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);padding:12px}
.anav button{font-family:inherit;font-size:14px;font-weight:500;padding:8px 20px;border-radius:999px;border:1px solid var(--line);background:#fff;cursor:pointer;transition:all .2s}
.anav button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.asec{min-height:80vh;display:flex;align-items:center;justify-content:center;font-size:var(--fs-h2);font-weight:700;color:#fff;margin:16px var(--gutter);border-radius:var(--r)}`,
  html:`<div class="anav">
<button data-to="#a1" class="on">סקשן א</button><button data-to="#a2">סקשן ב</button><button data-to="#a3">סקשן ג</button>
</div>
<div id="a1" class="asec ph-a ph">סקשן א</div>
<div id="a2" class="asec ph-b ph">סקשן ב</div>
<div id="a3" class="asec ph-c ph">סקשן ג</div>`,
  js:`const navBtns=document.querySelectorAll(".anav button");
navBtns.forEach(b=>b.addEventListener("click",()=>{
  gsap.to(window,{duration:.9,ease:"power2.inOut",scrollTo:{y:b.dataset.to,offsetY:70}});
}));
document.querySelectorAll(".asec").forEach((sec,i)=>{
  ScrollTrigger.create({trigger:sec,start:"top 55%",end:"bottom 55%",
    onToggle:s=>{if(s.isActive){navBtns.forEach(x=>x.classList.remove("on"));navBtns[i].classList.add("on");}}});
});`,
  runway:false
},
{
  id:"g29", cat:"gsap", name:"אדווה בגריד (stagger מהמרכז)", tech:"GSAP · stagger grid", status:"ממתין",
  desc:"לחיצה על תא מפיצה גל שמתפשט ממנו לכל הגריד: הסטאגר מחושב לפי מרחק מנקודת הלחיצה.",
  when:"רגעי דיילייט: אישור פעולה, לוח אינטראקטיבי, משחקיות עדינה.",
  libs:["gsap"],
  css:`.rip-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:8px;max-width:640px;margin-inline:auto}
.rip{aspect-ratio:1;border-radius:8px;background:#dfe0ee;cursor:pointer}
@media(max-width:767px){.rip-grid{grid-template-columns:repeat(6,1fr)}}`,
  html:`<div class="stage tight"><p class="center" style="color:var(--muted);font-size:14px;margin-top:0">לחץ על כל תא</p><div class="rip-grid"></div></div>`,
  js:`const grid=document.querySelector(".rip-grid"),COLS=innerWidth<768?6:10,ROWS=5;
for(let i=0;i<COLS*ROWS;i++){const d=document.createElement("div");d.className="rip";grid.appendChild(d);}
const cells=[...grid.children];
grid.addEventListener("click",e=>{
  const idx=cells.indexOf(e.target);if(idx<0)return;
  gsap.fromTo(cells,{scale:1},{
    scale:.55,backgroundColor:"#4a3aff",duration:.28,yoyo:true,repeat:1,
    stagger:{grid:[ROWS,COLS],from:idx,amount:.5},
    onComplete:()=>gsap.set(cells,{clearProps:"all"})});
});`,
  runway:false
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
