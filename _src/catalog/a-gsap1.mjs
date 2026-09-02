// GSAP moves G1-G11 (מקור: references/gsap/moves.md)
export default [
{
  id:"g01", cat:"gsap", name:"גלילה צידית מוצמדת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"הסקשן ננעל למסך והתוכן גולש הצידה במקום למטה. המהלך המבוקש ביותר.",
  when:"תהליך שלבים, גלריית עבודות, קטגוריות.",
  libs:["gsap","ScrollTrigger"],
  css:`.wrapper{transition:all 0s !important;overflow:hidden;background:#fff}
.scroll{display:flex;gap:24px;width:max-content;padding:80px var(--gutter)}
.scroll .ph{flex:0 0 clamp(300px,26vw,460px);height:clamp(240px,20vw,360px);font-size:22px}`,
  html:`<div class="wrapper"><div class="scroll">
<div class="ph ph-a">כרטיס 01</div><div class="ph ph-b">כרטיס 02</div><div class="ph ph-c">כרטיס 03</div>
<div class="ph ph-e">כרטיס 04</div><div class="ph ph-d">כרטיס 05</div><div class="ph ph-f">כרטיס 06</div>
</div></div>`,
  js:`const container=document.querySelector(".scroll");
const totalWidth=container.scrollWidth-window.innerWidth;
gsap.to(container,{x:()=>totalWidth,ease:"none",
  scrollTrigger:{trigger:".wrapper",start:"top top",end:()=>"+="+totalWidth,scrub:true,pin:true,anticipatePin:1}});`,
  note:"אתר עברי: x חיובי. אתר אנגלי: מוסיפים מינוס. אזהרה חתומה: בלי overscroll-behavior:none על העטיפה (חוסם גלגלת)."
},
{
  id:"g02", cat:"gsap", name:"חשיפת תמונה במסכה בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"התמונה נצבעת מלמטה למעלה עם קצה מעומעם, בקצב הגלילה, קדימה ואחורה.",
  when:"תמונת שיא, לפני/אחרי, ויז'ואל הירו משני.",
  libs:["gsap","ScrollTrigger"],
  css:`.paint{--reveal:0%;--feather:10%;width:min(680px,80vw);height:clamp(300px,36vw,520px);margin-inline:auto;
-webkit-mask-image:linear-gradient(to top,#000 0%,#000 var(--reveal),transparent calc(var(--reveal) + var(--feather)),transparent 100%);
mask-image:linear-gradient(to top,#000 0%,#000 var(--reveal),transparent calc(var(--reveal) + var(--feather)),transparent 100%);
-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;font-size:26px}`,
  html:`<div class="stage"><div class="paint ph ph-e">התמונה נצבעת</div></div>`,
  js:`const state={val:0};
gsap.to(state,{val:100,ease:"none",
  scrollTrigger:{trigger:".paint",start:"top 85%",end:"top 25%",scrub:true},
  onUpdate:()=>document.querySelector(".paint").style.setProperty("--reveal",state.val+"%")});`
},
{
  id:"g03", cat:"gsap", name:"חור מסכה שנפתח על מדיה", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"המדיה מציצה דרך עיגול קטן; בגלילה העיגול מתרחב עד מסך מלא.",
  when:"רגע שיא קולנועי, חשיפת מוצר או וידאו.",
  libs:["gsap","ScrollTrigger"],
  css:`.maskv{--mask-size:16vw;position:relative;height:100vh;
-webkit-mask-image:radial-gradient(circle var(--mask-size) at 50% 50%,#000 0 50%,transparent 50% 100%);
mask-image:radial-gradient(circle var(--mask-size) at 50% 50%,#000 0 50%,transparent 50% 100%);
-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;
-webkit-mask-size:100% 100%;mask-size:100% 100%;transition:all 0s}
.maskv .inner{position:absolute;inset:0;background:linear-gradient(135deg,#3b2667,#bc78ec);display:flex;align-items:center;justify-content:center;color:#fff;font-size:clamp(26px,3vw,46px);font-weight:700}
@media(max-width:767px){.maskv{--mask-size:140px}}`,
  html:`<div class="maskv"><div class="inner">המדיה שלך כאן</div></div>`,
  js:`gsap.timeline({scrollTrigger:{trigger:".maskv",start:"top top",end:"+=800",scrub:1,pin:true,anticipatePin:1}})
.to(".maskv",{"--mask-size":"250vw",ease:"none"},0);`
},
{
  id:"g04", cat:"gsap", name:"טקסט נחשף בגלילה: שלוש רמות", tech:"GSAP · SplitText", status:"ממתין",
  desc:"שלוש עוצמות חשיפה לכותרת: מילים עולות מ-clip, מילים מתבהרות, והכותרת נמחקת מהצד.",
  when:"כותרות סקשן באתרי סטוריטלינג. בעברית מפצלים למילים בלבד, לא לאותיות.",
  libs:["gsap","ScrollTrigger","SplitText"],
  css:`.tstage h2{font-size:var(--fs-demo);line-height:1.2;max-width:22ch;margin:0 auto clamp(120px,14vw,260px)}`,
  html:`<div class="stage tight tstage center">
<h2 class="t-clip">רמה א: המילים עולות מתוך מסכה, מילה אחרי מילה, בקצב הגלילה</h2>
<h2 class="t-fade">רמה ב: המילים מתבהרות בעדינות משקיפות חלקית אל מלאה</h2>
<h2 class="t-wipe">רמה ג: הכותרת כולה נמחקת ונחשפת מהצד בתנועה אחת</h2>
</div>`,
  js:`document.querySelectorAll(".t-clip").forEach(h=>{
  const s=new SplitText(h,{type:"lines, words"});
  gsap.from(s.words,{clipPath:"inset(100% 0% 0% 0%)",opacity:0,stagger:.5,
    scrollTrigger:{trigger:h,start:"top 80%",end:"top 30%",scrub:1}});
});
document.querySelectorAll(".t-fade").forEach(h=>{
  const s=new SplitText(h,{type:"lines, words"});
  gsap.from(s.words,{opacity:.15,stagger:.5,scrollTrigger:{trigger:h,start:"top 80%",end:"top 30%",scrub:1}});
});
document.querySelectorAll(".t-wipe").forEach(h=>{
  gsap.from(h,{clipPath:"inset(0% 0% 0% 100%)",ease:"power4.out",
    scrollTrigger:{trigger:h,start:"top 70%",end:"top 40%",scrub:1}});
});`
},
{
  id:"g05", cat:"gsap", name:"מסך מפוצל: תמונות מתחלפות לפי טקסט", tech:"GSAP · ScrollTrigger · sticky", status:"ממתין",
  desc:"צד תמונה דביק וצד טקסט גולל; כל בלוק טקסט שמגיע מחליף את התמונה ב-crossfade.",
  when:"הצגת שירותים או פרקים עם ויז'ואל לכל אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`.sync{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);padding-inline:var(--gutter)}
.sync-media{position:sticky;top:15vh;height:70vh}
.sync-media .ph{position:absolute;inset:0;font-size:24px}
.sync-texts .block{min-height:80vh;display:flex;flex-direction:column;justify-content:center}
.sync-texts h2{font-size:var(--fs-h2)}
.sync-texts p{color:var(--muted);max-width:40ch}
@media(max-width:767px){.sync{grid-template-columns:1fr}.sync-media{position:static;height:36vh}}`,
  html:`<div class="sync">
<div class="sync-texts">
  <div class="block sync-t"><h2>פרק ראשון</h2><p>כשהבלוק הזה במרכז המסך רואים את הכחול.</p></div>
  <div class="block sync-t"><h2>פרק שני</h2><p>הגעת לכאן? הסגול נכנס בהדרגה מעל הכחול.</p></div>
  <div class="block sync-t"><h2>פרק שלישי</h2><p>והירוק סוגר את הסיפור.</p></div>
</div>
<div class="sync-media">
  <div class="ph ph-a si-1">תמונה 1</div>
  <div class="ph ph-b si-2" style="opacity:1">תמונה 2</div>
  <div class="ph ph-d si-3" style="opacity:1">תמונה 3</div>
</div>
</div>`,
  js:`gsap.utils.toArray(".sync-t").forEach((txt,i)=>{
  if(i===0)return;
  gsap.from(".si-"+(i+1),{opacity:0,ease:"none",
    scrollTrigger:{trigger:txt,start:"top 60%",end:"top 30%",scrub:1}});
});`
},
{
  id:"g06", cat:"gsap", name:"גלריה נגררת עם אינרציה", tech:"GSAP · Draggable · Inertia", status:"ממתין",
  desc:"גריד שגוררים ביד והוא ממשיך בתנופה ונבלם ברכות בגבולות.",
  when:"פורטפוליו, גלריה חופשית. במגע זה הבית הטבעי שלו.",
  libs:["gsap","Draggable","InertiaPlugin"],
  css:`.dragw{height:60vh;border:2px dashed #ccc;border-radius:var(--r);overflow:hidden;margin-inline:var(--gutter)}
.drag{display:grid;grid-template-columns:repeat(4,240px);gap:16px;padding:24px;width:max-content;cursor:grab}
.drag:active{cursor:grabbing}
.drag .ph{height:170px}`,
  html:`<div class="stage tight"><div class="dragw"><div class="drag">
<div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div>
<div class="ph ph-e">5</div><div class="ph ph-f">6</div><div class="ph ph-b">7</div><div class="ph ph-a">8</div>
</div></div></div>`,
  js:`Draggable.create(".drag",{type:"x,y",edgeResistance:.65,bounds:".dragw",inertia:true});`,
  runway:false
},
{
  id:"g07", cat:"gsap", name:"תמונות רודפות עכבר (Image Trail)", tech:"GSAP · ticker", status:"ממתין",
  desc:"מניפת תמונות שרודפת אחרי הסמן במהירויות שונות: הראשונה צמודה, האחרונות משתרכות.",
  when:"הירו של פורטפוליו או סטודיו, סקשן playful. במובייל כבוי.",
  libs:["gsap"],
  css:`.tzone{height:60vh;border:2px dashed #ccc;border-radius:var(--r);display:flex;align-items:center;justify-content:center;margin-inline:var(--gutter);color:#999}
.timg{width:130px;height:95px;border-radius:10px;position:fixed;left:0;top:0;pointer-events:none;z-index:99;opacity:0;font-size:18px}`,
  html:`<div class="stage tight"><div class="tzone"><p>הזז את העכבר כאן</p>
<div class="timg ph ph-a">1</div><div class="timg ph ph-b">2</div><div class="timg ph ph-c">3</div>
</div></div>`,
  js:`const zone=document.querySelector(".tzone"),imgs=document.querySelectorAll(".timg");
let mx=0,my=0,inside=false;
zone.addEventListener("mouseenter",()=>{inside=true;imgs.forEach(i=>i.style.opacity=1)});
zone.addEventListener("mouseleave",()=>{inside=false;imgs.forEach(i=>i.style.opacity=0)});
document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY});
imgs.forEach((img,i)=>{
  let px=0,py=0;const speed=.15-i*.04;
  gsap.ticker.add(()=>{if(!inside)return;px+=(mx-px)*speed;py+=(my-py)*speed;
    gsap.set(img,{x:px-65,y:py-48});});
});`,
  runway:false
},
{
  id:"g08", cat:"gsap", name:"סמן מותאם + פנס", tech:"GSAP · ticker · vanilla", status:"ממתין",
  desc:"עיגול סמן שרודף את העכבר וגדל מעל לחיצים, וכתם אור מטושטש שמאיר רקע כהה סביב הסמן.",
  when:"אתרי וואו כהים, פורטפוליו. במובייל כבוי.",
  libs:["gsap"],
  css:`.fzone{position:relative;height:70vh;background:#101223;border-radius:var(--r);margin-inline:var(--gutter);overflow:hidden;display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center;color:#fff}
.flash{position:absolute;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,#f4c66044,transparent 65%);filter:blur(40px);pointer-events:none;opacity:0;transform:translate(-50%,-50%);transition:opacity .3s}
.follow{width:22px;height:22px;border-radius:50%;background:#fff;mix-blend-mode:difference;position:fixed;left:0;top:0;pointer-events:none;z-index:99;opacity:0}
.fzone button{min-height:48px;padding-inline:26px;border-radius:999px;border:1px solid #fff5;background:transparent;color:#fff;font-family:inherit;font-size:15px;cursor:pointer}`,
  html:`<div class="stage tight"><div class="fzone">
<div class="flash"></div>
<p>הזז את העכבר. שים לב לפנס ולעיגול הסמן</p>
<button>כפתור לבדיקת הסמן</button>
</div></div>`,
  js:`const fz=document.querySelector(".fzone"),fl=document.querySelector(".flash");
const fo=document.createElement("div");fo.className="follow";document.body.appendChild(fo);
let mx=0,my=0,px=0,py=0;
document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;
  const r=fz.getBoundingClientRect();
  fl.style.left=(e.clientX-r.left)+"px";fl.style.top=(e.clientY-r.top)+"px";});
fz.addEventListener("mouseenter",()=>{fl.style.opacity=1;fo.style.opacity=1});
fz.addEventListener("mouseleave",()=>{fl.style.opacity=0});
gsap.ticker.add(()=>{px+=(mx-px)*.2;py+=(my-py)*.2;gsap.set(fo,{x:px-11,y:py-11})});
document.querySelectorAll("button,a").forEach(t=>{
  t.addEventListener("mouseenter",()=>gsap.to(fo,{scale:2.4,duration:.3,ease:"power2.out"}));
  t.addEventListener("mouseleave",()=>gsap.to(fo,{scale:1,duration:.3,ease:"power2.out"}));
});`,
  runway:false
},
{
  id:"g09", cat:"gsap", name:"זריקה אינרציאלית בהובר", tech:"GSAP · InertiaPlugin", status:"ממתין",
  desc:"מרחפים על פריט והוא נזרק בכיוון תנועת העכבר וחוזר למקומו ברכות.",
  when:"גריד לוגואים, תגיות או צ'יפים באתר playful. במובייל כבוי.",
  libs:["gsap","InertiaPlugin"],
  css:`.throw-grid{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;padding-inline:var(--gutter)}
.throw-item{width:110px;height:110px;border-radius:16px;font-size:17px}`,
  html:`<div class="stage tight"><div class="throw-grid">
<div class="throw-item ph ph-a">לוגו</div><div class="throw-item ph ph-b">לוגו</div><div class="throw-item ph ph-c">לוגו</div>
<div class="throw-item ph ph-d">לוגו</div><div class="throw-item ph ph-e">לוגו</div><div class="throw-item ph ph-f">לוגו</div>
</div></div>`,
  js:`document.querySelectorAll(".throw-item").forEach(el=>{
  let vx=0,vy=0,lx=0,ly=0;
  el.addEventListener("mousemove",e=>{vx=e.clientX-lx;vy=e.clientY-ly;lx=e.clientX;ly=e.clientY});
  el.addEventListener("mouseleave",()=>{
    gsap.to(el,{inertia:{x:{velocity:vx*40,end:0},y:{velocity:vy*40,end:0}},duration:1.2});
  });
});`,
  runway:false
},
{
  id:"g11", cat:"gsap", name:"זכוכית מגדלת על תמונה", tech:"vanilla JS", status:"ממתין",
  desc:"עיגול הגדלה עוקב עכבר על תמונה, זום 1.5.",
  when:"מוצר עתיר פרטים, תיק עבודות, תכשיטים. במובייל כבוי (pinch-zoom טבעי עדיף).",
  libs:[],
  css:`.mag-wrap{position:relative;width:min(640px,86vw);margin-inline:auto}
.mag-img{width:100%;aspect-ratio:16/10;border-radius:var(--r);background:
  radial-gradient(circle at 25% 30%,#ffd43b 0 8%,transparent 8%),
  radial-gradient(circle at 70% 60%,#ff8787 0 12%,transparent 12%),
  radial-gradient(circle at 45% 75%,#66d9e8 0 6%,transparent 6%),
  linear-gradient(160deg,#1b2653,#3b5bdb)}
.magnifier{position:absolute;pointer-events:none;width:190px;height:190px;border-radius:50%;
  border:2px solid #fff;background-repeat:no-repeat;transform:translate(-50%,-50%) scale(0);
  transition:transform .25s ease;z-index:5;box-shadow:0 10px 30px rgba(0,0,0,.3)}`,
  html:`<div class="stage tight"><div class="mag-wrap"><div class="mag-img"></div></div></div>`,
  js:`const zoom=1.5,wrap=document.querySelector(".mag-wrap"),img=document.querySelector(".mag-img");
const mag=document.createElement("div");mag.className="magnifier";wrap.appendChild(mag);
function paint(){
  const w=img.offsetWidth,h=img.offsetHeight;
  mag.style.backgroundImage=getComputedStyle(img).backgroundImage;
  mag.style.backgroundSize=(w*zoom)+"px "+(h*zoom)+"px";
}
paint();addEventListener("resize",paint);
wrap.addEventListener("mouseenter",()=>mag.style.transform="translate(-50%,-50%) scale(1)");
wrap.addEventListener("mousemove",e=>{
  const r=img.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  mag.style.left=x+"px";mag.style.top=y+"px";
  mag.style.backgroundPosition=(-x*zoom+mag.offsetWidth/2)+"px "+(-y*zoom+mag.offsetHeight/2)+"px";
});
wrap.addEventListener("mouseleave",()=>mag.style.transform="translate(-50%,-50%) scale(0)");`,
  runway:false
}
];
