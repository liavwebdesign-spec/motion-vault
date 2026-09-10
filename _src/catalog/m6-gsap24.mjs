// GSAP גל 24 (10.9.2026): 10 מתוך 20 מהלכי גלילה מיוחדים שליאב ביקש. אותו סינון כמו גלים 20 עד 23.
export default [
{
  id:"g129", cat:"gsap", name:"מדרגות כרטיסים שנבנות בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"כרטיסים שעולים מלמטה ומתייצבים כגרם מדרגות בפרספקטיבה: כל כרטיס גבוה יותר ורחוק יותר מהקודם. תהליך שנראה כמו טיפוס.",
  when:"תהליך עבודה, רמות שירות, מסלול לימודים. שלושה עד שישה שלבים שיש להם סדר עולה.",
  note:"מכל בפרספקטיבה, וכל כרטיס מקבל y ו-z לפי האינדקס בסקראב עם סטאגר. הכרטיסים חופפים מעט בכוונה כדי שהמדרגות ייקראו כמבנה אחד. במובייל המדרגה נמוכה יותר והכרטיסים צרים.",
  libs:["gsap","ScrollTrigger"],
  css:`.st{position:relative;height:240vh}
.st-pin{position:sticky;top:0;height:100vh;display:grid;place-items:end center;perspective:1200px;overflow:hidden;padding-bottom:10vh}
.st-stage{position:relative;width:min(760px,90vw);height:60vh;transform-style:preserve-3d}
.st-card{position:absolute;inset-inline:0;bottom:0;height:42%;border-radius:18px;background:var(--card);border:1px solid var(--line);padding:22px 24px;display:grid;align-content:start;gap:6px;box-shadow:0 30px 60px rgba(0,0,0,.14);will-change:transform;transform-origin:50% 100%}
.st-card b{font-size:12px;color:var(--accent);letter-spacing:.14em}
.st-card h3{margin:0;font-size:clamp(18px,2.2vw,28px)}
.st-card p{margin:0;color:var(--muted);font-size:14px}
@media(max-width:767px){.st{height:200vh}.st-stage{height:64vh}}`,
  html:`<div class="st">
  <div class="st-pin"><div class="st-stage">
    <div class="st-card"><b>שלב 01</b><h3>שיחת היכרות</h3><p>עשרים דקות, בלי התחייבות.</p></div>
    <div class="st-card"><b>שלב 02</b><h3>אפיון</h3><p>מסמך של עמוד שקובע הכל.</p></div>
    <div class="st-card"><b>שלב 03</b><h3>עיצוב</h3><p>מסך אחרי מסך, עד שנכון.</p></div>
    <div class="st-card"><b>שלב 04</b><h3>עלייה לאוויר</h3><p>ומדידה מהיום הראשון.</p></div>
  </div></div>
</div>`,
  js:`(function(){
  const cards=gsap.utils.toArray(".st-card"),n=cards.length;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){cards.forEach((c,i)=>gsap.set(c,{y:-i*90,z:-i*80}));return;}
  const mob=matchMedia("(max-width:767px)").matches,dy=mob?78:104,dz=mob?70:110;
  gsap.set(cards,{y:220,opacity:0,zIndex:(i)=>n-i});
  const tl=gsap.timeline({scrollTrigger:{trigger:".st",start:"top top",end:"bottom bottom",scrub:.6}});
  cards.forEach((c,i)=>tl.to(c,{y:-i*dy,z:-i*dz,opacity:1,duration:1,ease:"power3.out"},i*.35));
})();`
},
{
  id:"g130", cat:"gsap", name:"צמצם מצלמה שנפתח בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"תמונת הירו חבויה מאחורי צמצם מתומן שנפתח מהמרכז ככל שגוללים, כמו עדשת מצלמה, עד שהיא ממלאת את המסך. פתיחה לצלמים ולסטודיו.",
  when:"צלמים, סטודיו לווידאו, אופטיקה, כל מותג עם עדשה. פתיחת הירו, פעם אחת.",
  note:"מתומן ב-clip-path polygon שכל שמונת הקודקודים שלו נעים מהמרכז החוצה בסקראב; polygon עם אותו מספר נקודות מתאנפש חלק. במובייל הצמצם נפתח מהר יותר כי המסך צר.",
  libs:["gsap","ScrollTrigger"],
  css:`.ir{position:relative;height:200vh}
.ir-pin{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--ink);display:grid;place-items:center}
.ir-img{position:absolute;inset:0;will-change:clip-path}
.ir-img .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.ir-ring{position:absolute;width:min(60vmin,520px);aspect-ratio:1;border-radius:50%;border:1px solid color-mix(in srgb,var(--bg) 25%,transparent);pointer-events:none}
.ir-txt{position:relative;z-index:1;text-align:center;color:#fff;text-shadow:0 2px 30px rgba(0,0,0,.5)}
.ir-txt h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ir-txt p{margin:0;opacity:.85}`,
  html:`<div class="ir">
  <div class="ir-pin"><div class="ir-img"><div class="ph ph-b"></div></div><div class="ir-ring"></div>
  <div class="ir-txt"><h2>סטודיו לצילום</h2><p>גלול כדי לפתוח את הצמצם</p></div></div>
</div>`,
  js:`(function(){
  const img=document.querySelector(".ir-img");
  const poly=r=>{const pts=[];for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;pts.push((50+Math.cos(a)*r).toFixed(2)+"% "+(50+Math.sin(a)*r).toFixed(2)+"%");}return "polygon("+pts.join(",")+")";};
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){img.style.clipPath=poly(90);return;}
  const o={r:4};
  gsap.set(img,{clipPath:poly(4)});
  gsap.timeline({scrollTrigger:{trigger:".ir",start:"top top",end:"bottom bottom",scrub:.5},onUpdate(){img.style.clipPath=poly(o.r);}})
    .to(o,{r:matchMedia("(max-width:767px)").matches?120:90,ease:"power2.in",duration:1})
    .to(".ir-ring",{scale:2.4,opacity:0,duration:.8},0)
    .to(".ir-txt p",{opacity:0,duration:.2},0);
})();`
},
{
  id:"g131", cat:"gsap", name:"כותרת שמתמלאת בנוזל", tech:"GSAP · ScrollTrigger · background-clip", status:"ממתין",
  desc:"כותרת ענקית שהאותיות שלה הן מכל: נוזל צבעוני עולה בתוכן עם הגלילה, עם קו גל על פני השטח, עד שכל המילה צבועה.",
  when:"כותרת הירו, מספר גדול, שם מותג. פעם אחת בעמוד, על מילה או שתיים.",
  note:"background-clip:text עם גרדיאנט שיש בו קו גל (radial קטן שמשוכפל) ו-background-position בסקראב. אין SVG ואין מסכה, לכן זול. במובייל הפונט קטן והגל דק יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.lt{min-height:140vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.lt h2{margin:0;font-size:clamp(56px,14vw,220px);font-weight:900;line-height:1;text-align:center;
  color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--ink) 40%,transparent);
  background:linear-gradient(0deg,var(--accent) 0 50%,transparent 50% 100%) 0 var(--lvl,0%) / 100% 200% no-repeat;
  -webkit-background-clip:text;background-clip:text}
.lt p{text-align:center;color:var(--muted);margin:14px 0 0}`,
  html:`<div class="lt"><div><h2>מלא</h2><p>גלול, והכותרת מתמלאת</p></div></div>`,
  js:`(function(){
  const h=document.querySelector(".lt h2");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){h.style.setProperty("--lvl","100%");return;}
  const o={l:0};
  gsap.to(o,{l:100,ease:"none",scrollTrigger:{trigger:".lt",start:"top 70%",end:"bottom 60%",scrub:.5},onUpdate(){h.style.setProperty("--lvl",o.l+"%");}});
})();`
},
{
  id:"g132", cat:"gsap", name:"סרגל מדידה שנע עם הגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"סרגל אופקי עם שנתות ומספרים שנע עם הגלילה תחת מחוון קבוע, כמו סרט מדידה. המספר שמתחת למחוון גדל: שנים, קילומטרים, לקוחות.",
  when:"ציר זמן קומפקטי, \"כמה עשינו\", התקדמות של פרויקט. אחד לעמוד.",
  note:"הסרגל הוא רצועה ארוכה שמוזזת ב-x בסקראב, והמחוון קבוע במרכז. המספר הגדול מחושב מאותו progress. במובייל אותו סרגל, פחות שנתות גלויות.",
  libs:["gsap","ScrollTrigger"],
  css:`.rl{position:relative;height:200vh}
.rl-pin{position:sticky;top:0;height:100vh;display:grid;align-content:center;gap:24px;overflow:hidden}
.rl-big{text-align:center;font-size:clamp(64px,12vw,180px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums}
.rl-big small{display:block;font-size:clamp(14px,1.4vw,18px);font-weight:500;color:var(--muted);margin-top:8px;letter-spacing:.1em}
.rl-tape{position:relative;height:90px;mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}
.rl-strip{position:absolute;top:0;left:50%;display:flex;direction:ltr;will-change:transform}
.rl-t{width:60px;flex:none;position:relative;height:90px}
.rl-t::before{content:"";position:absolute;bottom:0;left:0;width:1px;height:18px;background:var(--line)}
.rl-t.big::before{height:40px;background:var(--ink)}
.rl-t.big::after{content:attr(data-v);position:absolute;bottom:48px;left:0;translate:-50% 0;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.rl-ptr{position:absolute;left:50%;bottom:0;width:2px;height:60px;background:var(--accent);translate:-50% 0}
.rl-ptr::after{content:"";position:absolute;top:-6px;left:50%;translate:-50% 0;border:7px solid transparent;border-top-color:var(--accent)}`,
  html:`<div class="rl">
  <div class="rl-pin"><div class="rl-big"><span class="rl-val">2016</span><small>מאז שהתחלנו</small></div>
  <div class="rl-tape"><div class="rl-strip"></div><div class="rl-ptr"></div></div></div>
</div>`,
  js:`(function(){
  const strip=document.querySelector(".rl-strip"),val=document.querySelector(".rl-val"),FROM=2016,TO=2026,PER=5,W=60;
  const total=(TO-FROM)*PER;
  for(let i=0;i<=total;i++){const t=document.createElement("div");t.className="rl-t"+(i%PER===0?" big":"");if(i%PER===0)t.dataset.v=FROM+i/PER;strip.appendChild(t);}
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,o={p:0};
  if(reduce){gsap.set(strip,{x:-total*W});val.textContent=TO;return;}
  gsap.to(o,{p:1,ease:"none",scrollTrigger:{trigger:".rl",start:"top top",end:"bottom bottom",scrub:.5},
    onUpdate(){gsap.set(strip,{x:-o.p*total*W});val.textContent=Math.round(FROM+(TO-FROM)*o.p);}});
})();`
},
{
  id:"g134", cat:"gsap", name:"מעבר דרך הסקשן אל הבא", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"הסקשן הנוכחי גדל לעבר הצופה ונעלם מעבר למצלמה, והסקשן הבא מתגלה מאחוריו קטן וגדל למקומו. תחושה של לעבור דרך דלת.",
  when:"מעבר בין שני פרקים באתר חוויה, מהירו לפרק הראשון. פעם אחת בעמוד.",
  note:"שתי שכבות מוצמדות: היוצאת scale 1 ל-2.4 עם opacity ל-0, הנכנסת scale .6 ל-1 עם opacity מ-0. שתיהן transform בלבד. במובייל הזום היוצא מתון (1.8) כדי שלא יסתחרר.",
  libs:["gsap","ScrollTrigger"],
  css:`.zt2{position:relative;height:200vh}
.zt2-pin{position:sticky;top:0;height:100vh;overflow:hidden;perspective:1000px}
.zt2-a,.zt2-b{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;will-change:transform,opacity}
.zt2-a{background:var(--card);z-index:2}
.zt2-b{background:var(--ink);color:var(--bg);opacity:0}
.zt2-a h2,.zt2-b h2{margin:0 0 10px;font-size:var(--fs-h2);max-width:20ch}
.zt2-a p,.zt2-b p{margin:0;opacity:.75;max-width:40ch;line-height:1.7}`,
  html:`<div class="zt2">
  <div class="zt2-pin">
    <section class="zt2-a"><div><h2>הדלת הראשונה</h2><p>גלול, ותעבור דרכה.</p></div></section>
    <section class="zt2-b"><div><h2>ומה שמאחוריה</h2><p>הפרק שבו מספרים מה באמת קורה.</p></div></section>
  </div>
</div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".zt2-a",{opacity:0});gsap.set(".zt2-b",{opacity:1});return;}
  const mob=matchMedia("(max-width:767px)").matches;
  gsap.timeline({scrollTrigger:{trigger:".zt2",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(".zt2-a",{scale:mob?1.8:2.4,opacity:0,duration:1,ease:"power2.in"},0)
    .fromTo(".zt2-b",{scale:.6,opacity:0},{scale:1,opacity:1,duration:1,ease:"power2.out"},.15);
})();`
},
{
  id:"g135", cat:"gsap", name:"קו מפריד שמתכופף עם הגלילה", tech:"GSAP · ScrollTrigger velocity · SVG", status:"ממתין",
  desc:"קו דק בין סקשנים שמתכופף כלפי מטה כשגוללים מהר ומתיישר חזרה כמו מיתר כשעוצרים. מפריד שמרגיש חי.",
  when:"בין כל שני סקשנים באתר סטודיו או מותג. כל המפרידים בעמוד, אותו קו.",
  note:"הקו נמתח (stroke-dashoffset בסקראב) כשהוא נכנס למסך, ואז path עם נקודת בקרה אחת באמצע: getVelocity של ScrollTrigger מזיז אותה, ו-quickTo עם ease אלסטי מחזיר אותה לאפס. במובייל הכיפוף חצי.",
  libs:["gsap","ScrollTrigger"],
  css:`.bd-sec{min-height:60vh;display:grid;place-items:center;text-align:center;padding:var(--sec) var(--gutter)}
.bd-sec h2{margin:0 0 8px;font-size:var(--fs-h2)}
.bd-sec p{margin:0;color:var(--muted)}
.bd{display:block;width:100%;height:80px;overflow:visible}
.bd path{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-dasharray:1010;stroke-dashoffset:1010}`,
  html:`<section class="bd-sec"><div><h2>סקשן ראשון</h2><p>גלול מהר ותראה את הקו מתכופף.</p></div></section>
<svg class="bd" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q 500 40 1000 40"/></svg>
<section class="bd-sec"><div><h2>סקשן שני</h2><p>הקו חוזר להיות ישר כשעוצרים.</p></div></section>
<svg class="bd" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q 500 40 1000 40"/></svg>
<section class="bd-sec"><div><h2>סקשן שלישי</h2><p>אותו קו, בכל מפריד בעמוד.</p></div></section>`,
  js:`(function(){
  const paths=gsap.utils.toArray(".bd path");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(paths,{strokeDashoffset:0});return;}
  paths.forEach(p=>gsap.to(p,{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:p,start:"top 95%",end:"top 55%",scrub:.4}}));   // הקו נמתח כשנכנס
  const K=matchMedia("(max-width:767px)").matches?.05:.1,LIM=60;
  const o={y:40},set=()=>paths.forEach(p=>p.setAttribute("d","M0 40 Q 500 "+o.y+" 1000 40"));
  const bend=gsap.quickTo(o,"y",{duration:.9,ease:"elastic.out(1,.35)",onUpdate:set});
  ScrollTrigger.create({onUpdate:s=>{bend(40+gsap.utils.clamp(-LIM,LIM,s.getVelocity()*K));}});
  let t;addEventListener("scroll",()=>{clearTimeout(t);t=setTimeout(()=>bend(40),100);},{passive:true});
})();`
},
{
  id:"g136", cat:"gsap", name:"שתי תמונות שמתמזגות לאחת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"תמונה של \"לפני\" שמתפוגגת לתוך תמונה של \"אחרי\" תוך כדי זום עדין, בקצב הגלילה. בלי קו מחלק, בלי גרירה: דיסולב שהגלילה שולטת בו.",
  when:"שיפוץ, טיפול, שדרוג מוצר, אתר ישן מול חדש. כשהשתיים צולמו מאותה זווית.",
  note:"שתי שכבות זו על זו: העליונה מאבדת opacity, שתיהן מקבלות scale הפוך (העליונה גדלה, התחתונה מתכווצת ל-1) כך שיש תחושת מעבר בעומק. התוויות מתחלפות באמצע. במובייל אותו דבר.",
  libs:["gsap","ScrollTrigger"],
  css:`.dv{position:relative;height:200vh}
.dv-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
.dv-fig{position:relative;width:min(900px,92vw);aspect-ratio:16/9;border-radius:var(--r);overflow:hidden}
.dv-fig .ph{position:absolute;inset:0;border-radius:0;font-size:24px;will-change:transform,opacity}
.dv-lbl{position:absolute;top:16px;inset-inline-start:16px;background:color-mix(in srgb,var(--bg) 92%,transparent);color:var(--ink);padding:8px 14px;border-radius:999px;font-size:14px;font-weight:600;z-index:2}`,
  html:`<div class="dv">
  <div class="dv-pin"><div class="dv-fig">
    <div class="ph ph-d dv-after">אחרי</div>
    <div class="ph ph-e dv-before">לפני</div>
    <span class="dv-lbl">לפני</span>
  </div></div>
</div>`,
  js:`(function(){
  const before=document.querySelector(".dv-before"),after=document.querySelector(".dv-after"),lbl=document.querySelector(".dv-lbl");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(before,{opacity:0});lbl.textContent="אחרי";return;}
  gsap.timeline({scrollTrigger:{trigger:".dv",start:"top top",end:"bottom bottom",scrub:.6,onUpdate(s){lbl.textContent=s.progress>.5?"אחרי":"לפני";}}})
    .to(before,{opacity:0,scale:1.12,ease:"power2.inOut",duration:1},0)
    .fromTo(after,{scale:1.08},{scale:1,ease:"power2.inOut",duration:1},0);
})();`
},
{
  id:"g137", cat:"gsap", name:"מרכאות שנפתחות סביב הציטוט", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שני סימני מרכאות ענקיים יושבים צמודים במרכז, וכשהעדות נכנסת הם נפרדים לפינות ומפנים מקום לטקסט שמופיע ביניהם. הציטוט נפתח, לא נוחת.",
  when:"עדות מרכזית אחת, ציטוט מייסד, משפט מפתח מלקוח. פעם אחת בעמוד.",
  note:"המרכאות הן שני span עם x ו-y בסקראב, הטקסט עולה מ-opacity 0 עם y. בעברית סימן הפתיחה יושב מימין למעלה והסגירה משמאל למטה. במובייל המרכאות קטנות והתזוזה קצרה.",
  libs:["gsap","ScrollTrigger"],
  css:`.qq{min-height:120vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.qq-box{position:relative;max-width:min(760px,92vw);text-align:center;padding:clamp(40px,8vw,90px) clamp(20px,5vw,60px)}
.qq-m{position:absolute;font-size:clamp(90px,16vw,220px);line-height:.6;font-weight:900;color:var(--accent);opacity:.9;will-change:transform;font-family:Georgia,serif}
.qq-m.o{top:0;inset-inline-start:0}
.qq-m.c{bottom:0;inset-inline-end:0}
.qq-box blockquote{margin:0;font-size:clamp(20px,2.6vw,34px);font-weight:600;line-height:1.5;opacity:0;translate:0 14px}
.qq-box cite{display:block;margin-top:18px;font-style:normal;color:var(--muted);font-size:15px;opacity:0}`,
  html:`<div class="qq"><div class="qq-box">
  <span class="qq-m o" aria-hidden="true">״</span>
  <blockquote>הפעם הראשונה שמישהו שאל אותנו מה הלקוח צריך לפני שדיבר על צבעים. האתר עלה תוך שבועיים, והפניות התחילו ביום הראשון.</blockquote>
  <cite>רועי ברק, משרד עורכי דין</cite>
  <span class="qq-m c" aria-hidden="true">״</span>
</div></div>`,
  js:`(function(){
  const box=document.querySelector(".qq-box"),o=box.querySelector(".qq-m.o"),c=box.querySelector(".qq-m.c");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(".qq-box blockquote, .qq-box cite",{opacity:1,translate:"0 0"});return;}
  const mob=matchMedia("(max-width:767px)").matches,k=mob?.5:1;
  // מתחילים צמודים במרכז: מזיזים כל סימן מהפינה שלו אל האמצע, ובסקראב חוזרים ל-0
  gsap.set(o,{xPercent:-140*k,yPercent:120*k});gsap.set(c,{xPercent:140*k,yPercent:-120*k});
  gsap.timeline({scrollTrigger:{trigger:".qq",start:"top 70%",end:"center center",scrub:.6}})
    .to([o,c],{xPercent:0,yPercent:0,duration:1,ease:"power3.out"},0)
    .to(".qq-box blockquote",{opacity:1,translate:"0 0",duration:.6},.3)
    .to(".qq-box cite",{opacity:1,duration:.4},.7);
})();`
},
{
  id:"g138", cat:"gsap", name:"זרקור שנוסע על גריד בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"גריד של לוגואים או פנים שכולו מעומעם, וזרקור עגול נוסע עליו בזיגזג עם הגלילה ומאיר כל פעם קבוצה אחרת. העין הולכת עם האור.",
  when:"קיר לקוחות, צוות גדול, גלריית פרויקטים בעמוד ארוך. שנים עשר עד עשרים וארבעה פריטים.",
  note:"שכבת עמעום עם mask radial-gradient שהמרכז שלה נע לאורך נקודות בסקראב (משתני CSS), הפריטים מתחת נשארים סטטיים. במובייל הזרקור גדול יחסית (55vw).",
  libs:["gsap","ScrollTrigger"],
  css:`.sl2{position:relative;height:240vh}
.sl2-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;--sx:80%;--sy:20%;--sr:24vw}
.sl2-grid{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;width:min(900px,92vw)}
.sl2-grid .ph{aspect-ratio:1;font-size:18px}
.sl2-dim{position:absolute;inset:-20px;background:color-mix(in srgb,var(--bg) 86%,transparent);pointer-events:none;
  mask-image:radial-gradient(circle var(--sr) at var(--sx) var(--sy),transparent 60%,#000 100%);-webkit-mask-image:radial-gradient(circle var(--sr) at var(--sx) var(--sy),transparent 60%,#000 100%)}
@media(max-width:767px){.sl2-grid{grid-template-columns:repeat(3,1fr)}.sl2-pin{--sr:55vw}}`,
  html:`<div class="sl2">
  <div class="sl2-pin"><div class="sl2-grid">
    <div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div>
    <div class="ph ph-e">5</div><div class="ph ph-a">6</div><div class="ph ph-b">7</div><div class="ph ph-c">8</div>
    <div class="ph ph-d">9</div><div class="ph ph-e">10</div><div class="ph ph-a">11</div><div class="ph ph-b">12</div>
    <div class="sl2-dim"></div>
  </div></div>
</div>`,
  js:`(function(){
  const pin=document.querySelector(".sl2-pin");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){pin.style.setProperty("--sr","200vw");return;}
  const pts=[{x:80,y:20},{x:20,y:35},{x:75,y:60},{x:25,y:85},{x:50,y:50}],o={x:80,y:20};
  const tl=gsap.timeline({scrollTrigger:{trigger:".sl2",start:"top top",end:"bottom bottom",scrub:.7},onUpdate(){pin.style.setProperty("--sx",o.x+"%");pin.style.setProperty("--sy",o.y+"%");}});
  pts.slice(1).forEach(p=>tl.to(o,{x:p.x,y:p.y,duration:1,ease:"power1.inOut"}));
})();`
},
];
