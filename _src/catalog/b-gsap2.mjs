// GSAP moves G12-G22
export default [
{
  id:"g12", cat:"gsap", name:"פרלקס עומק רב-שכבתי", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שכבות באותו סקשן נעות במהירויות שונות בגלילה. עומק בלי אף תמונה.",
  when:"הירו עשיר, סקשני אווירה. במובייל מקדם מוקטן או כבוי.",
  libs:["gsap","ScrollTrigger"],
  css:`.para{position:relative;height:80vh;background:#101223;border-radius:var(--r);overflow:hidden;display:flex;align-items:center;justify-content:center;margin-inline:var(--gutter)}
.para .layer{position:absolute;border-radius:50%}
.para h2{color:#fff;position:relative;z-index:2;font-size:var(--fs-h2)}`,
  html:`<div class="stage tight"><div class="para">
<div class="layer" data-speed="0.7" style="width:240px;height:240px;background:rgba(94,124,255,.35);top:8%;right:12%"></div>
<div class="layer" data-speed="1" style="width:130px;height:130px;background:rgba(255,169,77,.4);bottom:16%;right:32%"></div>
<div class="layer" data-speed="1.35" style="width:180px;height:180px;background:rgba(56,217,169,.35);top:22%;left:14%"></div>
<h2>שכבות בעומק שונה</h2>
</div></div>`,
  js:`gsap.utils.toArray(".para .layer").forEach(el=>{
  gsap.to(el,{y:()=>(1-parseFloat(el.dataset.speed))*240,ease:"none",
    scrollTrigger:{trigger:".para",start:"top bottom",end:"bottom top",scrub:true}});
});`
},
{
  id:"g13", cat:"gsap", name:"Batch Reveal לגרידים", tech:"GSAP · ScrollTrigger.batch", status:"ממתין",
  desc:"כרטיסי גריד נכנסים בקבוצות חכמות: מה שנגלה יחד במסך עולה יחד, עם סטאגר זעיר של 0.08 שניות.",
  when:"גרידים של 6 פריטים ומעלה. החריג המאושר היחיד לחוק האנטי-סטאגר.",
  libs:["gsap","ScrollTrigger"],
  css:`.bgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.bcard{height:130px;background:#fff;border:1px solid var(--line);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-weight:500}
@media(max-width:767px){.bgrid{grid-template-columns:1fr 1fr}}`,
  html:`<div class="stage tight"><div class="bgrid">
<div class="bcard">01</div><div class="bcard">02</div><div class="bcard">03</div>
<div class="bcard">04</div><div class="bcard">05</div><div class="bcard">06</div>
<div class="bcard">07</div><div class="bcard">08</div><div class="bcard">09</div>
</div></div>`,
  js:`gsap.set(".bcard",{y:24,opacity:0});
ScrollTrigger.batch(".bcard",{start:"top 88%",once:true,
  onEnter:b=>gsap.to(b,{y:0,opacity:1,stagger:.08,duration:.5,ease:"power2.out"})});`
},
{
  id:"g14", cat:"gsap", name:"מונים בקצב הגלילה", tech:"GSAP · ScrollTrigger · snap", status:"ממתין",
  desc:"מספרים גדולים שנספרים עם הגלילה, קדימה ואחורה, לא פעם אחת.",
  when:"סקשן מספרים באתר סטוריטלינג. בעמוד שקט עדיף count-up חד-פעמי (B2).",
  libs:["gsap","ScrollTrigger"],
  css:`.nums{display:flex;gap:clamp(40px,5vw,110px);flex-wrap:wrap;justify-content:center}
.snum{font-size:clamp(48px,4vw,96px);font-weight:700}
.nums small{display:block;color:var(--muted);font-size:15px;text-align:center}`,
  html:`<div class="stage tight center"><div class="nums">
<div><span class="snum" data-count="340">0</span><small>לקוחות מרוצים</small></div>
<div><span class="snum" data-count="97">0</span><small>אחוזי שביעות רצון</small></div>
<div><span class="snum" data-count="12">0</span><small>שנות ניסיון</small></div>
</div></div>`,
  js:`gsap.utils.toArray(".snum").forEach(el=>{
  gsap.fromTo(el,{textContent:0},{textContent:+el.dataset.count,snap:{textContent:1},ease:"none",
    scrollTrigger:{trigger:el,start:"top 85%",end:"top 40%",scrub:true}});
});`
},
{
  id:"g15", cat:"gsap", name:"פרילודר פרימיום (עלייה)", tech:"GSAP · load event", status:"ממתין",
  desc:"מסך פתיחה שמתרומם ונעלם כשהעמוד באמת נטען. בלי המתנה מלאכותית.",
  when:"אתרי פרימיום כבדי מדיה בלבד. פרילודר על אתר מהיר הוא עיכוב מיותר.",
  libs:["gsap"],
  css:`#pre{position:fixed;inset:0;background:#16182b;z-index:999;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:700}
.replay{margin-inline:var(--gutter)}`,
  html:`<div id="pre">כאן יושב הלוגו או לוטי של המותג</div>
<div class="stage tight center"><button class="gbtn replay">הפעל שוב את הפרילודר</button></div>`,
  js:`function runPre(){
  const p=document.getElementById("pre");
  p.style.display="flex";gsap.set(p,{yPercent:0});
  gsap.to(p,{yPercent:-100,duration:.6,ease:"power3.inOut",delay:.9,
    onComplete:()=>p.style.display="none"});
}
let done=false;
function hide(){if(done)return;done=true;runPre();}
if(document.readyState==="complete")hide();
else{addEventListener("load",hide);setTimeout(hide,3000);}
document.querySelector(".replay").addEventListener("click",runPre);`,
  runway:false,
  note:"בדמו יש השהיה קטנה כדי שתספיק לראות; באתר אמיתי הוא נפתח ברגע ה-load."
},
{
  id:"g15b", cat:"gsap", name:"פרילודר דלתות", tech:"CSS transitions · load event", status:"ממתין",
  desc:"שני חצאי מסך שנפתחים לצדדים כמו דלתות וחושפים את האתר.",
  when:"וריאנט דרמטי של הפרילודר. לוטי קצר במרכז ואז פתיחה.",
  libs:[],
  css:`#pre{position:fixed;inset:0;z-index:999}
.door{position:absolute;inset-block:0;width:50.5%;background:#16182b;transition:transform .8s cubic-bezier(.76,0,.24,1)}
.door.l{inset-inline-start:0}.door.r{inset-inline-end:0}
.plabel{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:700;transition:opacity .4s}
.replay{margin-inline:var(--gutter)}`,
  html:`<div id="pre"><div class="door l"></div><div class="door r"></div><div class="plabel">הדלתות נפתחות כשהעמוד נטען</div></div>
<div class="stage tight center"><button class="gbtn replay">הפעל שוב</button></div>`,
  js:`const p=document.getElementById("pre");
function open(){
  p.querySelector(".plabel").style.opacity=0;
  setTimeout(()=>{
    p.querySelector(".door.l").style.transform="translateX(-100%)";
    p.querySelector(".door.r").style.transform="translateX(100%)";
  },200);
  setTimeout(()=>p.style.display="none",1200);
}
function reset(){
  p.style.display="block";p.querySelector(".plabel").style.opacity=1;
  p.querySelectorAll(".door").forEach(d=>d.style.transform="none");
  setTimeout(open,900);
}
let done=false;
function first(){if(done)return;done=true;setTimeout(open,900);}
if(document.readyState==="complete")first();
else{addEventListener("load",first);setTimeout(first,3000);}
document.querySelector(".replay").addEventListener("click",reset);`,
  runway:false
},
{
  id:"g16", cat:"gsap", name:"מילים מתרוקנות בהובר", tech:"GSAP · SplitText · text-stroke", status:"ממתין",
  desc:"מרחפים על מילה בכותרת והיא הופכת למתאר חלול; עוזבים והיא מתמלאת חזרה.",
  when:"כותרת הירו אינטראקטיבית. עובד מצוין בעברית. במובייל כבוי.",
  libs:["gsap","SplitText"],
  css:`.hovt{font-size:var(--fs-demo);line-height:1.25;font-weight:800;max-width:22ch;margin-inline:auto;cursor:default}`,
  html:`<div class="stage tight center"><h2 class="hovt">כל מילה בכותרת הזאת מגיבה למגע העכבר שלך בנפרד ובזמן אמת</h2></div>`,
  js:`const split=new SplitText(".hovt",{type:"words"});
gsap.set(split.words,{display:"inline-block"});
split.words.forEach(w=>{
  w.addEventListener("mouseenter",()=>gsap.to(w,{color:"transparent","-webkit-text-stroke":"1.5px #16182b",duration:.15}));
  w.addEventListener("mouseleave",()=>gsap.to(w,{color:"#16182b","-webkit-text-stroke":"0px transparent",duration:.15}));
});`,
  runway:false
},
{
  id:"g17", cat:"gsap", name:"כרטיסים מתעופפים פנימה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שלושה כרטיסים טסים למקומם משני הצדדים עם סיבוב, בקצב הגלילה.",
  when:"הצגת שלושה שירותים או מוצרים בכניסה דרמטית.",
  libs:["gsap","ScrollTrigger"],
  css:`.fan{display:flex;justify-content:center;gap:var(--gap);padding-inline:var(--gutter)}
.fan .ph{width:min(260px,28vw);height:340px;font-size:20px}
@media(max-width:767px){.fan{flex-direction:column;align-items:center}.fan .ph{width:80vw;height:180px}}`,
  html:`<div class="stage tight"><div class="fan">
<div class="ph ph-a fc-l">שירות א</div>
<div class="ph ph-b fc-c">שירות ב</div>
<div class="ph ph-c fc-r">שירות ג</div>
</div></div>`,
  js:`const st=()=>({trigger:".fan",start:"top 78%",end:"top 45%",scrub:1});
gsap.from(".fc-l",{x:"30vw",rotate:10,scrollTrigger:st()});
gsap.from(".fc-c",{y:"4vw",rotate:-5,scrollTrigger:st()});
gsap.from(".fc-r",{x:"-30vw",rotate:-10,scrollTrigger:st()});`
},
{
  id:"g18", cat:"gsap", name:"סצנת סיפור מוצמדת (Master Timeline)", tech:"GSAP · pin + timeline", status:"ממתין",
  desc:"הסקשן ננעל והופך לבמה: כותרת נכנסת ונמוגה, שנייה מחליפה אותה, והמדיה נפתחת מגלולה זעירה למסך כמעט מלא. גלול לאט, גם אחורה.",
  when:"סקשן שיא אחד באתר סטוריטלינג. אחד לאתר: זה מהלך חתימה, לא תבנית.",
  libs:["gsap","ScrollTrigger","SplitText"],
  css:`.scene{height:100vh;background:#101223;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center}
.scene .bgA,.scene .bgB{position:absolute;inset-inline:0;height:34%;border-radius:50% 50% 0 0/100% 100% 0 0;background:#2a2f55}
.scene .bgA{top:-12%;transform:rotate(180deg)}.scene .bgB{bottom:-12%}
.stitles{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center}
.st1,.st2{position:absolute;color:#fff;font-size:var(--fs-demo);font-weight:700;max-width:20ch;padding-inline:var(--gutter)}
.smedia{position:relative;z-index:2;width:60vw;background:linear-gradient(135deg,#7048e8,#22b8cf);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:700}`,
  html:`<div class="scene">
<div class="bgA"></div><div class="bgB"></div>
<div class="stitles">
  <h2 class="st1">יש סיפורים שאי אפשר לספר בסקשן רגיל</h2>
  <h2 class="st2">בשביל זה בדיוק יש את הבמה הזאת</h2>
</div>
<div class="smedia">הווידאו שלך כאן</div>
</div>`,
  js:`const t1=new SplitText(".st1",{type:"words"}),t2=new SplitText(".st2",{type:"words"});
const tl=gsap.timeline({scrollTrigger:{trigger:".scene",start:"top 90%",end:"+=2600",scrub:1}});
ScrollTrigger.create({trigger:".scene",start:"top top",end:"+=2200",pin:true,scrub:1,anticipatePin:1});
tl.from(".bgA",{y:"-10vw",duration:1},0)
  .from(".bgB",{y:"10vw",duration:1},0)
  .from(t1.words,{y:50,opacity:0,stagger:.05,duration:.5},"-=0.5")
  .to(".st1",{opacity:0,duration:.5},"+=0.3")
  .from(t2.words,{y:50,opacity:0,stagger:.05,duration:.5})
  .to(".st2",{opacity:0,duration:.4},"+=0.3")
  .from(".smedia",{opacity:0,duration:.3})
  .fromTo(".smedia",{scale:.2,borderRadius:"500vw",height:"22vw"},{scale:1,borderRadius:"24px",height:"82vh",duration:.8});`,
  note:"הטריק המבני: הטיימליין מתחיל לפני הנעיצה ומסתיים אחריה, שני ScrollTrigger נפרדים."
},
{
  id:"g19", cat:"gsap", name:"פיזור חפצים נופלים", tech:"GSAP · timeline", status:"ממתין",
  desc:"שמונה אלמנטים נופלים למקומם יחד, כל אחד עם סיבוב וציר סיבוב משלו.",
  when:"סקשן מספרים או הטבות, אווירה playful, המחשת שפע.",
  libs:["gsap","ScrollTrigger"],
  css:`.coins{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;padding-inline:var(--gutter)}
.coin{width:84px;height:84px;border-radius:50%;font-size:26px}`,
  html:`<div class="stage tight"><div class="coins">
<div class="coin ph ph-e c1">₪</div><div class="coin ph ph-a c2">₪</div><div class="coin ph ph-b c3">₪</div>
<div class="coin ph ph-d c4">₪</div><div class="coin ph ph-c c5">₪</div><div class="coin ph ph-f c6">₪</div>
<div class="coin ph ph-b c7">₪</div><div class="coin ph ph-a c8">₪</div>
</div></div>`,
  js:`const tl=gsap.timeline({scrollTrigger:{trigger:".coins",start:"top 75%",end:"top 30%",scrub:1}});
[["-2em",50,"left bottom"],["-2em",30,"top right"],["-2em",-50,"top center"],["-2em",50,"left bottom"],
 ["-4em",-30,"top center"],["-4em",30,"center bottom"],["-6em",-50,"top right"],["-8em",-30,"center center"]]
.forEach((cfg,i)=>{
  tl.from(".c"+(i+1),{y:cfg[0],rotate:cfg[1],transformOrigin:cfg[2],opacity:0,duration:1},0);
});`
},
{
  id:"g20", cat:"gsap", name:"טיימליין אופקי עם קו התקדמות", tech:"GSAP · pin + scrub", status:"ממתין",
  desc:"גלילה צידית שקו נמתח לאורכה וכל תחנה נדלקת כשהוא מגיע אליה.",
  when:"תהליך עבודה, מסע לקוח, אבני דרך. הוא או G1, לא שניהם באותו עמוד.",
  libs:["gsap","ScrollTrigger"],
  css:`.hwrap{overflow:hidden;background:#fff}
.hcont{display:flex;position:relative;padding-block:130px}
.step{flex:0 0 36vw;display:flex;flex-direction:column;align-items:center;text-align:center;padding-inline:20px}
.step .dot{width:18px;height:18px;border-radius:50%;background:#3b5bdb;margin-bottom:14px}
.step h3{margin:0 0 6px;font-size:20px}
.step p{margin:0;color:var(--muted)}
.tline{position:absolute;top:calc(130px + 8px);inset-inline-start:0;height:2px;width:200%;background:linear-gradient(90deg,#3b5bdb,#22b8cf)}`,
  html:`<div class="hwrap"><div class="hcont">
<div class="tline"></div>
<div class="step s1"><div class="dot"></div><h3>אפיון</h3><p>מבינים את העסק</p></div>
<div class="step s2"><div class="dot"></div><h3>קופי</h3><p>כותבים את הסיפור</p></div>
<div class="step s3"><div class="dot"></div><h3>עיצוב</h3><p>נותנים לו פנים</p></div>
<div class="step s4"><div class="dot"></div><h3>פיתוח</h3><p>מפיחים חיים</p></div>
<div class="step s5"><div class="dot"></div><h3>השקה</h3><p>עולים לאוויר</p></div>
</div></div>`,
  js:`const panels=gsap.utils.toArray(".step");
const hc=document.querySelector(".hcont");
const totalW=hc.scrollWidth-window.innerWidth;
const dist=()=> "+="+totalW*1.6;
gsap.to(panels,{x:totalW,ease:"none",
  scrollTrigger:{trigger:".hwrap",pin:true,scrub:true,start:"top top",end:dist(),anticipatePin:1}});
gsap.from(".tline",{x:"45vw",ease:"none",
  scrollTrigger:{trigger:".hwrap",scrub:true,start:"top top",end:dist()}});
panels.forEach((s,i)=>{
  if(i===0)return;
  gsap.from(s,{opacity:.2,ease:"none",
    scrollTrigger:{trigger:".hwrap",scrub:true,
      start:()=>"top+="+(totalW*1.6*(i/panels.length))+" top",
      end:()=>"top+="+(totalW*1.6*((i+.4)/panels.length))+" top"}});
});`
},
{
  id:"g22", cat:"gsap", name:"עיגול תהליך נצבע בגלילה", tech:"GSAP · DrawSVG · pin", status:"ממתין",
  desc:"קשת צבעונית נצבעת סביב עיגול גדול בקצב הגלילה, כל תחנה נדלקת בתורה והתוכן במרכז מתחלף.",
  when:"תהליך של 3-5 שלבים. האלטרנטיבה המעגלית לטיימליין האופקי.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.pw{height:100vh;display:flex;align-items:center;justify-content:center;position:relative}
.pstage{position:relative;width:min(540px,72vw);aspect-ratio:1}
.pcirc{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
.pcirc .track{fill:none;stroke:#e2e2e2;stroke-width:2}
.pcirc .draw{fill:none;stroke:url(#pg);stroke-width:4;stroke-linecap:round}
.pdot{position:absolute;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#e8590c,#c2255c);filter:grayscale(1) brightness(1.7);transform:translate(-50%,-50%)}
.pstep{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0;padding:12%}
.pstep h3{font-size:clamp(22px,1.8vw,36px);margin:8px 0}
.pstep p{color:var(--muted);max-width:34ch;margin:0}
.pstep .num{font-size:clamp(40px,3.5vw,80px);font-weight:700;color:transparent;-webkit-text-stroke:1.5px #c2255c;line-height:1}
.pstep.p1{opacity:1}`,
  html:`<div class="pw"><div class="pstage">
<svg class="pcirc" viewBox="0 0 600 600">
<defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8590c"/><stop offset="1" stop-color="#c2255c"/></linearGradient></defs>
<circle class="track" cx="300" cy="300" r="290"/><circle class="draw" cx="300" cy="300" r="290"/>
</svg>
<div class="pdot d1" style="top:1.5%;left:50%;filter:none"></div>
<div class="pdot d2" style="top:50%;left:98.5%"></div>
<div class="pdot d3" style="top:98.5%;left:50%"></div>
<div class="pdot d4" style="top:50%;left:1.5%"></div>
<div class="pstep p1"><span class="num">01</span><h3>איפיון האתגרים</h3><p>בשיחה ראשונית נכיר אתכם ונבין את הצרכים.</p></div>
<div class="pstep p2"><span class="num">02</span><h3>תכנון הפתרון</h3><p>בונים תהליך שמתאים לארגון ולפעילות.</p></div>
<div class="pstep p3"><span class="num">03</span><h3>הטמעה מלאה</h3><p>מלווים את הצוות עד שהמערכת עובדת לבד.</p></div>
<div class="pstep p4"><span class="num">04</span><h3>צמיחה</h3><p>מודדים, מדייקים וממשיכים קדימה.</p></div>
</div></div>`,
  js:`gsap.set(".pcirc .draw",{drawSVG:"0% 0%"});
const ptl=gsap.timeline({scrollTrigger:{trigger:".pw",start:"top top",end:"+=2000",scrub:true,pin:true,anticipatePin:1}});
const STEPS=4;
for(let i=1;i<STEPS;i++){
  ptl.to(".pcirc .draw",{drawSVG:"0% "+(i*100/STEPS)+"%",duration:2})
     .to(".d"+(i+1),{filter:"grayscale(0) brightness(1)",duration:.1})
     .to(".p"+(i+1),{opacity:1,duration:.1},"<")
     .to(".p"+i,{opacity:0,duration:.1},"<");
}
ptl.to(".pcirc .draw",{drawSVG:"0% 100%",duration:2});`
}
];
