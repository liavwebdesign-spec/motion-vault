// GSAP גל 24 (10.9.2026): 10 מתוך 20 מהלכי גלילה מיוחדים שליאב ביקש. אותו סינון כמו גלים 20 עד 23.
export default [
{
  id:"g129", cat:"gsap", name:"מדרגות כרטיסים שנבנות בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"כרטיסים שעולים מלמטה ומתייצבים כגרם מדרגות בפרספקטיבה: כל כרטיס גבוה יותר ורחוק יותר מהקודם. תהליך שנראה כמו טיפוס.",
  when:"תהליך עבודה, רמות שירות, מסלול לימודים. שלושה או ארבעה שלבים שיש להם סדר עולה, ולכל אחד משפט קצר אחד.",
  note:"מכל בפרספקטיבה, וכל כרטיס מקבל y ו-z לפי האינדקס בסקראב עם סטאגר. הכרטיסים חופפים מעט בכוונה כדי שהמדרגות ייקראו כמבנה אחד, אבל גובה המדרגה גדול מהתוכן של כרטיס אחרי הקטנת הפרספקטיבה, כך שהתיאור של כל שלב נשאר גלוי. חמישה שלבים כבר לא נכנסים במסך אחד. במובייל המדרגה נמוכה יותר והכרטיסים צרים. בלי GSAP ובהפחתת תנועה אין במה דביקה: הכרטיסים הם רשימה רגילה בגובה התוכן.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: רשימת כרטיסים רגילה. הבמה הדביקה והמדרגות רק כשהמהלך רץ (.gsap-live) */
.st{position:relative}
.st-pin{padding-block:48px}
.st-stage{display:grid;gap:12px;width:min(760px,90vw);margin-inline:auto}
.st-card{border-radius:18px;background:var(--card);border:1px solid var(--line);padding:22px 24px;display:grid;align-content:start;gap:6px;box-shadow:0 12px 30px rgba(0,0,0,.08)}
.st-card b{font-size:12px;color:var(--accent)}
.st-card h3{margin:0;font-size:clamp(18px,2.2vw,28px)}
.st-card p{margin:0;color:var(--muted);font-size:14px}
.st.gsap-live{height:240vh}
.st.gsap-live .st-pin{position:sticky;top:0;height:100vh;display:grid;place-items:end center;perspective:1200px;overflow:hidden;padding-block:0 10vh}
.st.gsap-live .st-stage{display:block;position:relative;height:60vh;transform-style:preserve-3d;margin:0}
.st.gsap-live .st-card{position:absolute;inset-inline:0;bottom:0;height:42%;box-shadow:0 30px 60px rgba(0,0,0,.14);will-change:transform;transform-origin:50% 100%}
@media(max-width:767px){.st.gsap-live{height:200vh}.st.gsap-live .st-stage{height:64vh}}`,
  html:`<div class="st">
  <div class="st-pin"><div class="st-stage">
    <div class="st-card"><b>שלב 01</b><h3>שיחת היכרות</h3><p>עשרים דקות, בלי התחייבות.</p></div>
    <div class="st-card"><b>שלב 02</b><h3>אפיון</h3><p>מסמך של עמוד שקובע הכל.</p></div>
    <div class="st-card"><b>שלב 03</b><h3>עיצוב</h3><p>מסך אחרי מסך, עד שנכון.</p></div>
    <div class="st-card"><b>שלב 04</b><h3>עלייה לאוויר</h3><p>ומדידה מהיום הראשון.</p></div>
  </div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכרטיסים הם רשימה רגילה
  const root=document.querySelector(".st"),cards=gsap.utils.toArray(".st-card"),n=cards.length;
  // בהפחתת תנועה אף תנאי לא מתקיים, הפונקציה לא רצה, ונשארת הרשימה הסטטית
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    root.classList.add("gsap-live");
    // המדרגה גבוהה מהתוכן של כרטיס אחרי הקטנת הפרספקטיבה, אחרת הכרטיס שלפניו מסתיר את התיאור
    const mob=ctx.conditions.mob,dy=mob?118:136,dz=mob?70:110;
    gsap.set(cards,{y:220,opacity:0,zIndex:i=>n-i});
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    cards.forEach((c,i)=>tl.to(c,{y:-i*dy,z:-i*dz,opacity:1,duration:1,ease:"power3.out"},i*.35));
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g130", cat:"gsap", name:"צמצם מצלמה שנפתח בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"תמונת הירו חבויה מאחורי צמצם מתומן שנפתח מהמרכז ככל שגוללים, כמו עדשת מצלמה, עד שהיא ממלאת את המסך. פתיחה לצלמים ולסטודיו.",
  when:"צלמים, סטודיו לווידאו, אופטיקה, כל מותג עם עדשה. פתיחת הירו, פעם אחת.",
  note:"מתומן ב-clip-path polygon שכל שמונת הקודקודים שלו נעים מהמרכז החוצה בסקראב; polygon עם אותו מספר נקודות מתאנפש חלק. הקודקודים מחושבים בפיקסלים ממידות המסך ולא באחוזים של הקופסה, אחרת המתומן נמתח לפי יחס המסך (שטוח בדסקטופ, גלולה בטלפון). ברדיוס הסופי המעגל החסום שלו עובר את פינות המסך, ולכן בסוף התמונה מלאה בכל רוחב. בלי GSAP ובהפחתת תנועה אין נעילה ואין צמצם: הירו רגיל עם התמונה המלאה, בלי שורת ההנחיה לגלול.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: הירו רגיל, התמונה מלאה. הנעילה, הטבעת וההנחיה רק כשהמהלך רץ (.gsap-live) */
.ir{position:relative}
.ir-pin{position:relative;height:100vh;overflow:hidden;background:var(--ink);display:grid;place-items:center}
.ir.gsap-live{height:200vh}
.ir.gsap-live .ir-pin{position:sticky;top:0}
.ir-img{position:absolute;inset:0}
.ir.gsap-live .ir-img{will-change:clip-path}
.ir-img .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.ir-ring{display:none;position:absolute;width:min(60vmin,520px);aspect-ratio:1;border-radius:50%;border:1px solid color-mix(in srgb,var(--bg) 25%,transparent);pointer-events:none}
.ir.gsap-live .ir-ring{display:block}
.ir-txt{position:relative;z-index:1;text-align:center;color:#fff;text-shadow:0 2px 30px rgba(0,0,0,.5)}
.ir-txt h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ir-txt p{display:none;margin:0;opacity:.85}
.ir.gsap-live .ir-txt p{display:block}`,
  html:`<div class="ir">
  <div class="ir-pin"><div class="ir-img"><div class="ph ph-b"></div></div><div class="ir-ring"></div>
  <div class="ir-txt"><h2>סטודיו לצילום</h2><p>גלול כדי לפתוח את הצמצם</p></div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP התמונה מלאה, כמו הירו רגיל
  const root=document.querySelector(".ir"),img=root.querySelector(".ir-img");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    // מתומן סדיר בפיקסלים. r הוא אחוז מחצי האלכסון: ב-100 המעגל החסום שלו עובר את פינות המסך.
    // היעד 125, כך שהתמונה מלאה כבר בכ-90% מהגלילה ונשארת רגע מלאה לפני שהנעילה משתחררת
    let W=1,H=1;const o={r:4};
    const draw=()=>{const R=o.r/100*Math.hypot(W,H)/2/Math.cos(Math.PI/8),pts=[];
      for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;pts.push((W/2+Math.cos(a)*R).toFixed(1)+"px "+(H/2+Math.sin(a)*R).toFixed(1)+"px");}
      img.style.clipPath="polygon("+pts.join(",")+")";};
    const measure=()=>{W=img.offsetWidth;H=img.offsetHeight;draw();};   // נמדד ב-refresh, לא בכל פריים
    measure();ScrollTrigger.addEventListener("refreshInit",measure);
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5},onUpdate:draw})
      .to(o,{r:125,ease:"power2.in",duration:1})
      .to(".ir-ring",{scale:2.4,opacity:0,duration:.8},0)
      .to(".ir-txt p",{opacity:0,duration:.2},0);
    return()=>{ScrollTrigger.removeEventListener("refreshInit",measure);img.style.clipPath="";root.classList.remove("gsap-live");};
  });
})();`
},
{
  id:"g131", cat:"gsap", name:"כותרת שמתמלאת בנוזל", tech:"GSAP · ScrollTrigger · background-clip", status:"ממתין",
  desc:"כותרת ענקית שהאותיות שלה הן מכל: צבע עולה בתוכן מלמטה עם הגלילה, בקו ישר, עד שכל המילה צבועה.",
  when:"כותרת הירו, מספר גדול, שם מותג. פעם אחת בעמוד, על מילה או שתיים.",
  note:"background-clip:text עם גרדיאנט בשני חצאים (צבע ושקוף, עם קו חד ביניהם) ו-background-position שמונע ממשתנה CSS בסקראב. אין SVG ואין מסכה, לכן זול. הטווח קשור לכותרת עצמה: היא מתחילה להתמלא כשהיא נכנסת למסך, ומלאה כשהיא באמצע שלו. במובייל הפונט קטן יותר. בלי GSAP ובהפחתת תנועה הכותרת מלאה מההתחלה.",
  libs:["gsap","ScrollTrigger"],
  css:`.lt{min-height:140vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.lt h2{margin:0;font-size:clamp(56px,14vw,220px);font-weight:900;line-height:1;text-align:center;
  color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--ink) 40%,transparent);
  background:linear-gradient(0deg,var(--accent) 0 50%,transparent 50% 100%) 0 var(--lvl,100%) / 100% 200% no-repeat;
  -webkit-background-clip:text;background-clip:text}
.lt p{text-align:center;color:var(--muted);margin:14px 0 0}`,
  html:`<div class="lt"><div><h2>מלא</h2><p>גלול, והכותרת מתמלאת</p></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכותרת מלאה (--lvl ברירת מחדל 100%)
  const h=document.querySelector(".lt h2");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // הטווח על הכותרת עצמה, לא על העוטף בגובה 140vh: מלאה כשהיא באמצע המסך ולא רק כשהיא יוצאת למעלה
    gsap.fromTo(h,{"--lvl":"0%"},{"--lvl":"100%",ease:"none",scrollTrigger:{trigger:h,start:"top 90%",end:"center 45%",scrub:.5}});
  });
})();`
},
{
  id:"g132", cat:"gsap", name:"סרגל מדידה שנע עם הגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"סרגל אופקי עם שנתות ומספרים שנע עם הגלילה תחת מחוון קבוע, כמו סרט מדידה. המספר שמתחת למחוון גדל: שנים, קילומטרים, לקוחות.",
  when:"ציר זמן קומפקטי, \"כמה עשינו\", התקדמות של פרויקט. אחד לעמוד.",
  note:"הסרגל הוא רצועה ארוכה שמוזזת ב-x בסקראב, והמחוון קבוע במרכז. המספר הגדול מחושב מאותו progress. במובייל אותו סרגל, פחות שנתות גלויות. הסרגל נשאר משמאל לימין גם בעמוד עברי, בכוונה: סרגל מדידה הוא חפץ פיזי, והמספרים עליו נקראים משמאל לימין כמו על ציר. בלי GSAP ובהפחתת תנועה אין נעילה: הסרגל עומד על הערך הסופי.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: בלוק רגיל על הערך הסופי. הנעילה רק כשהמהלך רץ (.gsap-live) */
.rl{position:relative}
.rl-pin{display:grid;align-content:center;gap:24px;overflow:hidden;padding-block:48px}
.rl.gsap-live{height:200vh}
.rl.gsap-live .rl-pin{position:sticky;top:0;height:100vh;padding-block:0}
.rl-big{text-align:center;font-size:clamp(64px,12vw,180px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums}
.rl-big small{display:block;font-size:clamp(14px,1.4vw,18px);font-weight:500;color:var(--muted);margin-top:8px}
.rl-tape{position:relative;height:90px;mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 15%,#000 85%,transparent)}
.rl-strip{position:absolute;top:0;left:50%;display:flex;direction:ltr;will-change:transform}
.rl-t{width:60px;flex:none;position:relative;height:90px}
.rl-t::before{content:"";position:absolute;bottom:0;left:0;width:1px;height:18px;background:var(--line)}
.rl-t.big::before{height:40px;background:var(--ink)}
.rl-t.big::after{content:attr(data-v);position:absolute;bottom:70px;left:0;translate:-50% 0;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.rl-ptr{position:absolute;left:50%;bottom:0;width:2px;height:60px;background:var(--accent);translate:-50% 0}
.rl-ptr::after{content:"";position:absolute;top:-6px;left:50%;translate:-50% 0;border:7px solid transparent;border-top-color:var(--accent)}`,
  html:`<div class="rl">
  <div class="rl-pin"><div class="rl-big"><span class="rl-val">2016</span><small>מאז שהתחלנו</small></div>
  <div class="rl-tape"><div class="rl-strip"></div><div class="rl-ptr"></div></div></div>
</div>`,
  js:`(function(){
  const root=document.querySelector(".rl"),strip=root.querySelector(".rl-strip"),val=root.querySelector(".rl-val"),FROM=2016,TO=2026,PER=5,W=60;
  const total=(TO-FROM)*PER;
  for(let i=0;i<=total;i++){const t=document.createElement("div");t.className="rl-t"+(i%PER===0?" big":"");if(i%PER===0)t.dataset.v=FROM+i/PER;strip.appendChild(t);}
  // p בין 0 ל-1. הרצועה זזה ב-transform ישיר, בלי לשאול את ה-DOM בכל פריים
  const at=p=>{strip.style.transform="translateX("+(-p*total*W)+"px)";val.textContent=Math.round(FROM+(TO-FROM)*p);};
  at(1);                                    // מצב סטטי: הערך הסופי מתחת למחוון
  if(typeof gsap==="undefined")return;
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    const o={p:0};at(0);
    gsap.to(o,{p:1,ease:"none",scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5},onUpdate:()=>at(o.p)});
    return()=>{root.classList.remove("gsap-live");at(1);};
  });
})();`
},
{
  id:"g134", cat:"gsap", name:"מעבר דרך הסקשן אל הבא", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"הסקשן הנוכחי גדל לעבר הצופה ונעלם מעבר למצלמה, והסקשן הבא מתגלה מאחוריו קטן וגדל למקומו. תחושה של לעבור דרך דלת.",
  when:"מעבר בין שני פרקים באתר חוויה, מהירו לפרק הראשון. פעם אחת בעמוד.",
  note:"שתי שכבות מוצמדות: היוצאת scale 1 ל-2.4 עם opacity ל-0, הנכנסת scale .6 ל-1 עם opacity מ-0. שתיהן transform בלבד. הטקסט של כל שכבה דוהה בנפרד ומהר יותר מהשכבה: הטקסט היוצא נעלם לפני שהנכנס מופיע, כך שבאמצע יש רגע קצר בלי טקסט ולא כותרת על כותרת. במובייל הזום היוצא מתון (1.8) כדי שלא יסתחרר. בלי GSAP ובהפחתת תנועה אין נעילה: שני הסקשנים זה אחרי זה, כל אחד בגובה מסך.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שני סקשנים רגילים זה אחרי זה. ההצמדה והשכבות רק כשהמהלך רץ (.gsap-live) */
.zt2{position:relative}
.zt2-a,.zt2-b{display:grid;place-items:center;text-align:center;padding:24px;min-height:100vh}
.zt2-a{background:var(--card)}
.zt2-b{background:var(--ink);color:var(--bg)}
.zt2-a h2,.zt2-b h2{margin:0 0 10px;font-size:var(--fs-h2);max-width:20ch}
.zt2-a p,.zt2-b p{margin:0;opacity:.75;max-width:40ch;line-height:1.7}
.zt2.gsap-live{height:200vh}
.zt2.gsap-live .zt2-pin{position:sticky;top:0;height:100vh;overflow:hidden;perspective:1000px}
.zt2.gsap-live .zt2-a,.zt2.gsap-live .zt2-b{position:absolute;inset:0;min-height:0;will-change:transform,opacity}
.zt2.gsap-live .zt2-a{z-index:2}`,
  html:`<div class="zt2">
  <div class="zt2-pin">
    <section class="zt2-a"><div><h2>הדלת הראשונה</h2><p>גלול, ותעבור דרכה.</p></div></section>
    <section class="zt2-b"><div><h2>ומה שמאחוריה</h2><p>הפרק שבו מספרים מה באמת קורה.</p></div></section>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP שני הסקשנים זה אחרי זה
  const root=document.querySelector(".zt2"),a=root.querySelector(".zt2-a"),b=root.querySelector(".zt2-b");
  // בהפחתת תנועה אף תנאי לא מתקיים, והסקשנים נשארים זה אחרי זה
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    root.classList.add("gsap-live");
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to(a,{scale:ctx.conditions.mob?1.8:2.4,opacity:0,duration:1,ease:"power2.in"},0)
      .fromTo(b,{scale:.6,opacity:0},{scale:1,opacity:1,duration:1,ease:"power2.out"},.15)
      // הטקסט היוצא נעלם לפני שהנכנס מופיע: באמצע רגע בלי טקסט, כמו מעבר בדלת, ולא טקסט על טקסט
      .to(a.firstElementChild,{opacity:0,duration:.3,ease:"none"},.1)
      .fromTo(b.firstElementChild,{opacity:0},{opacity:1,duration:.3,ease:"none"},.55);
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g135", cat:"gsap", name:"קו מפריד שמתכופף עם הגלילה", tech:"GSAP · ScrollTrigger velocity · SVG", status:"ממתין",
  desc:"קו דק בין סקשנים שמתכופף כלפי מטה כשגוללים מהר ומתיישר חזרה כמו מיתר כשעוצרים. מפריד שמרגיש חי.",
  when:"בין כל שני סקשנים באתר סטודיו או מותג. כל המפרידים בעמוד, אותו קו.",
  note:"הקו נמתח (stroke-dashoffset בסקראב) מתחילת השורה כשהוא נכנס למסך: מימין בעמוד עברי, משמאל באנגלי. SVG מצויר תמיד משמאל לימין בלי קשר ל-dir, ולכן הכיוון נקבע ב-JS מה-direction של הדף. אחר כך path עם נקודת בקרה אחת באמצע: getVelocity של ScrollTrigger מזיז אותה, ו-quickTo עם power3.out עוקב אחרי הגלילה בלי רטט. כשעוצרים, הקו חוצה את הקו הישר פעם אחת קטנה (12% מהכיפוף) וחוזר, הכל תוך 0.6 שניות. זו חריגה מכוונת מהכלל שאין overshoot: זה מיתר שפורטים עליו, לא רכיב ממשק שקופץ, והחריגה בנויה משני צעדים עם העקומות הרגילות ולא מ-elastic. במובייל הכיפוף חצי. בלי GSAP ובהפחתת תנועה הקו ישר ומלא.",
  libs:["gsap","ScrollTrigger"],
  css:`.bd-sec{min-height:60vh;display:grid;place-items:center;text-align:center;padding:var(--sec) var(--gutter)}
.bd-sec h2{margin:0 0 8px;font-size:var(--fs-h2)}
.bd-sec p{margin:0;color:var(--muted)}
.bd{display:block;width:100%;height:80px;overflow:visible}
.bd path{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round}`,
  html:`<section class="bd-sec"><div><h2>סקשן ראשון</h2><p>גלול מהר ותראה את הקו מתכופף.</p></div></section>
<svg class="bd" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M1000 40 Q 500 40 0 40"/></svg>
<section class="bd-sec"><div><h2>סקשן שני</h2><p>הקו חוזר להיות ישר כשעוצרים.</p></div></section>
<svg class="bd" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M1000 40 Q 500 40 0 40"/></svg>
<section class="bd-sec"><div><h2>סקשן שלישי</h2><p>אותו קו, בכל מפריד בעמוד.</p></div></section>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הקו ישר ומלא
  const paths=gsap.utils.toArray(".bd path");
  // הקו מתחיל בתחילת השורה: בעמוד עברי מימין (x=1000), באנגלי משמאל
  const A=getComputedStyle(paths[0].ownerSVGElement).direction==="rtl"?1000:0,B=1000-A;
  const o={y:40},draw=()=>paths.forEach(p=>p.setAttribute("d","M"+A+" 40 Q 500 "+o.y+" "+B+" 40"));
  draw();
  // בהפחתת תנועה אף תנאי לא מתקיים: הקו נשאר ישר ומלא
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const K=ctx.conditions.mob?.05:.1,LIM=60;
    paths.forEach(p=>gsap.fromTo(p,{strokeDasharray:1010,strokeDashoffset:1010},{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:p,start:"top 95%",end:"top 55%",scrub:.4}}));   // הקו נמתח כשנכנס
    const bend=gsap.quickTo(o,"y",{duration:.3,ease:"power3.out",onUpdate:draw});
    // כשעוצרים: חצייה אחת קטנה של הקו הישר, ואז מנוחה. שני צעדים, לא elastic
    let t,back=null;
    const settle=()=>{const d=o.y-40;bend(40-d*.12);back=gsap.delayedCall(.25,()=>bend(40));};
    ScrollTrigger.create({onUpdate:s=>{if(back){back.kill();back=null;}bend(40+gsap.utils.clamp(-LIM,LIM,s.getVelocity()*K));}});
    const onScroll=()=>{clearTimeout(t);t=setTimeout(settle,100);};
    addEventListener("scroll",onScroll,{passive:true});
    return()=>{removeEventListener("scroll",onScroll);clearTimeout(t);o.y=40;draw();};
  });
})();`
},
{
  id:"g136", cat:"gsap", name:"שתי תמונות שמתמזגות לאחת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"תמונה של \"לפני\" שמתפוגגת לתוך תמונה של \"אחרי\" תוך כדי זום עדין, בקצב הגלילה. בלי קו מחלק, בלי גרירה: דיסולב שהגלילה שולטת בו.",
  when:"שיפוץ, טיפול, שדרוג מוצר, אתר ישן מול חדש. כשהשתיים צולמו מאותה זווית.",
  note:"שתי שכבות זו על זו: העליונה מאבדת opacity, שתיהן מקבלות scale הפוך (העליונה גדלה, התחתונה מתכווצת ל-1) כך שיש תחושת מעבר בעומק. התוויות מתחלפות באמצע. במובייל אותו דבר. בלי GSAP ובהפחתת תנועה ההשוואה נשארת: שתי התמונות זו לצד זו (בטלפון זו מעל זו), 'לפני' ראשונה, וכל אחת עם תווית משלה מ-data-label.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: לפני ואחרי זו לצד זו, כל אחת עם תווית. השכבות והנעילה רק כשהמהלך רץ (.gsap-live) */
.dv{position:relative}
.dv-pin{padding-block:48px}
.dv-fig{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:12px;width:min(900px,92vw);margin-inline:auto}
.dv-fig .ph{position:relative;aspect-ratio:16/9;font-size:24px}
.dv-before{order:-1}
.dv-fig .ph::after,.dv-lbl{position:absolute;top:16px;inset-inline-start:16px;background:color-mix(in srgb,var(--bg) 92%,transparent);color:var(--ink);padding:8px 14px;border-radius:999px;font-size:14px;font-weight:600;z-index:2}
.dv-fig .ph::after{content:attr(data-label)}
.dv-lbl{display:none}
.dv.gsap-live{height:200vh}
.dv.gsap-live .dv-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;padding-block:0}
.dv.gsap-live .dv-fig{display:block;position:relative;aspect-ratio:16/9;border-radius:var(--r);overflow:hidden}
.dv.gsap-live .dv-fig .ph{position:absolute;inset:0;border-radius:0;will-change:transform,opacity}
.dv.gsap-live .dv-fig .ph::after{content:none}
.dv.gsap-live .dv-lbl{display:block}`,
  html:`<div class="dv">
  <div class="dv-pin"><div class="dv-fig">
    <div class="ph ph-d dv-after" data-label="אחרי">אחרי</div>
    <div class="ph ph-e dv-before" data-label="לפני">לפני</div>
    <span class="dv-lbl">לפני</span>
  </div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP שתי התמונות זו לצד זו
  const root=document.querySelector(".dv"),before=root.querySelector(".dv-before"),after=root.querySelector(".dv-after"),lbl=root.querySelector(".dv-lbl");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    // באמצע מתחלפת התווית, והשכבה העליונה (שכבר כמעט שקופה) מפסיקה לתפוס לחיצות שמיועדות ל"אחרי"
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,onUpdate(s){const late=s.progress>.5;lbl.textContent=late?"אחרי":"לפני";before.style.pointerEvents=late?"none":"";}}})
      .to(before,{opacity:0,scale:1.12,ease:"power2.inOut",duration:1},0)
      .fromTo(after,{scale:1.08},{scale:1,ease:"power2.inOut",duration:1},0);
    return()=>{root.classList.remove("gsap-live");lbl.textContent="לפני";before.style.pointerEvents="";};
  });
})();`
},
{
  id:"g137", cat:"gsap", name:"מרכאות שנפתחות סביב הציטוט", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שני סימני מרכאות ענקיים יושבים צמודים במרכז, וכשהעדות נכנסת הם נפרדים לפינות ומפנים מקום לטקסט שמופיע ביניהם. הציטוט נפתח, לא נוחת.",
  when:"עדות מרכזית אחת, ציטוט מייסד, משפט מפתח מלקוח. פעם אחת בעמוד.",
  note:"המרכאות הן שני span עם x ו-y בסקראב, הטקסט עולה מ-opacity 0 עם y. בעברית סימן הפתיחה יושב מימין למעלה והסגירה משמאל למטה, והכיוון נקבע מה-direction של הקופסה. נקודת ההתחלה נמדדת מגודל הקופסה (המרכאות צמודות במרכז שלה), והטווח מתחיל כשמרכז הציטוט ב-85% מהמסך, כך שרואים את הפרידה ולא רק את סופה. במובייל המרכאות קטנות והתזוזה קצרה מעצמה. בלי GSAP ובהפחתת תנועה הציטוט גלוי והמרכאות בפינות.",
  libs:["gsap","ScrollTrigger"],
  css:`.qq{min-height:120vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.qq-box{position:relative;max-width:min(760px,92vw);text-align:center;padding:clamp(40px,8vw,90px) clamp(20px,5vw,60px)}
.qq-m{position:absolute;font-size:clamp(90px,16vw,220px);line-height:.6;font-weight:900;color:var(--accent);opacity:.9;will-change:transform;font-family:Georgia,serif}
.qq-m.o{top:0;inset-inline-start:0}
.qq-m.c{bottom:0;inset-inline-end:0}
.qq-box blockquote{margin:0;font-size:clamp(20px,2.6vw,34px);font-weight:600;line-height:1.5}
.qq-box cite{display:block;margin-top:18px;font-style:normal;color:var(--muted);font-size:15px}`,
  html:`<div class="qq"><div class="qq-box">
  <span class="qq-m o" aria-hidden="true">״</span>
  <blockquote>הפעם הראשונה שמישהו שאל אותנו מה הלקוח צריך לפני שדיבר על צבעים. האתר עלה תוך שבועיים, והפניות התחילו ביום הראשון.</blockquote>
  <cite>רועי ברק, משרד עורכי דין</cite>
  <span class="qq-m c" aria-hidden="true">״</span>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הציטוט גלוי והמרכאות בפינות
  const box=document.querySelector(".qq-box"),o=box.querySelector(".qq-m.o"),c=box.querySelector(".qq-m.c");
  const bq=box.querySelector("blockquote"),cite=box.querySelector("cite");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // מתחילים צמודים במרכז הקופסה: כל סימן זז מהפינה שלו אל האמצע, ובסקראב חוזר לפינה.
    // בעברית הפתיחה בימין ולכן נכנסת ב-x שלילי; s הופך את זה לאתר אנגלי
    const s=getComputedStyle(box).direction==="rtl"?-1:1;
    const dx=()=>box.offsetWidth/2-o.offsetWidth,dy=()=>box.offsetHeight/2-o.offsetHeight/2;
    gsap.timeline({scrollTrigger:{trigger:box,start:"center 85%",end:"center 40%",scrub:.6,invalidateOnRefresh:true}})
      .fromTo(o,{x:()=>s*dx(),y:dy},{x:0,y:0,duration:1,ease:"power3.out"},0)
      .fromTo(c,{x:()=>-s*dx(),y:()=>-dy()},{x:0,y:0,duration:1,ease:"power3.out"},0)
      .fromTo(bq,{opacity:0,y:14},{opacity:1,y:0,duration:.6},.3)
      .fromTo(cite,{opacity:0},{opacity:1,duration:.4},.7);
  });
})();`
},
{
  id:"g138", cat:"gsap", name:"זרקור שנוסע על גריד בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"גריד של לוגואים או פנים שכולו מעומעם, וזרקור עגול נוסע עליו בזיגזג עם הגלילה ומאיר כל פעם קבוצה אחרת. העין הולכת עם האור.",
  when:"קיר לקוחות, צוות, גלריית פרויקטים בעמוד ארוך. שמונה עד שנים עשר פריטים (שלוש שורות בדסקטופ). ליותר צריך שש עמודות ופריטים קטנים יותר.",
  note:"שכבת עמעום עם mask radial-gradient שהמרכז שלה נע לאורך נקודות בסקראב (משתני CSS), הפריטים מתחת נשארים סטטיים. הגריד כולו צריך להיכנס בבמה של מסך אחד: בדסקטופ זה שלוש שורות של ארבעה. במובייל הזרקור גדול יחסית (55vw). בלי GSAP ובהפחתת תנועה אין נעילה ואין עמעום: הגריד כולו גלוי.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: גריד רגיל בלי עמעום. הנעילה והזרקור רק כשהמהלך רץ (.gsap-live) */
.sl2{position:relative}
.sl2-pin{display:grid;place-items:center;padding-block:48px;--sx:80%;--sy:20%;--sr:24vw}
.sl2.gsap-live{height:240vh}
.sl2.gsap-live .sl2-pin{position:sticky;top:0;height:100vh;padding-block:0;overflow-x:clip} /* העמעום חורג 20px מהגריד, ובטלפון זה יוצא מהמסך */
.sl2-grid{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;width:min(900px,92vw)}
.sl2-grid .ph{aspect-ratio:1;font-size:18px}
.sl2-dim{display:none;position:absolute;inset:-20px;background:color-mix(in srgb,var(--bg) 86%,transparent);pointer-events:none;
  mask-image:radial-gradient(circle var(--sr) at var(--sx) var(--sy),transparent 60%,#000 100%);-webkit-mask-image:radial-gradient(circle var(--sr) at var(--sx) var(--sy),transparent 60%,#000 100%)}
.sl2.gsap-live .sl2-dim{display:block}
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
  if(typeof gsap==="undefined")return;      // בלי GSAP הגריד כולו גלוי, בלי עמעום
  const root=document.querySelector(".sl2"),pin=root.querySelector(".sl2-pin");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    const pts=[{x:80,y:20},{x:20,y:35},{x:75,y:60},{x:25,y:85},{x:50,y:50}],o={x:80,y:20};
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6},onUpdate(){pin.style.setProperty("--sx",o.x+"%");pin.style.setProperty("--sy",o.y+"%");}});
    pts.slice(1).forEach(p=>tl.to(o,{x:p.x,y:p.y,duration:1,ease:"power1.inOut"}));
    return()=>{root.classList.remove("gsap-live");pin.style.removeProperty("--sx");pin.style.removeProperty("--sy");};
  });
})();`
},
];
