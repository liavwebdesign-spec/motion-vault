// GSAP גל 21 (9.9.2026): עוד 10 מהלכי גלילה מיוחדים, המשך ישיר לגל 20. אותו סינון: scrub או pin,
// רעיון שלא קיים ב-73 מהלכי הגלילה שכבר במאגר, רב-שימושי, ומובייל מוגדר בכל אחד.
export default [
{
  id:"g99", cat:"gsap", name:"גליל טקסט תלת-ממדי", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"שורות טקסט מודבקות על גליל שמסתובב סביב ציר אופקי עם הגלילה. השורה הקדמית קריאה ומלאה, האחרות מתעקלות למעלה ולמטה ודוהות. רולודקס של שירותים.",
  when:"רשימת שירותים, ערכים, ענפים שעובדים איתם. חמש עד תשע שורות קצרות.",
  note:"כל שורה ב-rotateX(i*30) translateZ(רדיוס), והגליל כולו מקבל rotateX שלילי בסקראב. קשת של 30 מעלות לשורה ולא גליל מלא: גליל מלא של 7 שורות נתן רדיוס של 90px והכל נערם (נמדד). במובייל הרדיוס קטן והפונט 26px.",
  libs:["gsap","ScrollTrigger"],
  css:`.cyl{position:relative;height:260vh}
.cyl-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;perspective:1100px;overflow:hidden}
.cyl-drum{position:relative;width:min(900px,92vw);height:1.2em;font-size:clamp(26px,4.6vw,64px);font-weight:800;transform-style:preserve-3d;will-change:transform}
.cyl-line{position:absolute;inset:0;display:flex;align-items:baseline;justify-content:center;gap:.5em;white-space:nowrap;backface-visibility:hidden;color:var(--ink)}
.cyl-line small{font-size:.38em;font-weight:500;color:var(--accent);margin-inline-start:.6em;letter-spacing:.1em}
.cyl-fade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,var(--bg) 0%,transparent 30%,transparent 70%,var(--bg) 100%)}
@media(max-width:767px){.cyl{height:200vh}.cyl-pin{perspective:700px}}`,
  html:`<div class="cyl">
  <div class="cyl-pin"><div class="cyl-drum">
    <div class="cyl-line">אתרי תדמית<small>01</small></div><div class="cyl-line">דפי נחיתה<small>02</small></div><div class="cyl-line">חנויות אונליין<small>03</small></div>
    <div class="cyl-line">מערכות ניהול<small>04</small></div><div class="cyl-line">אוטומציות<small>05</small></div><div class="cyl-line">קופי ואסטרטגיה<small>06</small></div><div class="cyl-line">ליווי שוטף<small>07</small></div>
  </div><div class="cyl-fade"></div></div>
</div>`,
  js:`(function(){
  const drum=document.querySelector(".cyl-drum"),lines=gsap.utils.toArray(".cyl-line"),n=lines.length;
  // לא גליל מלא של 360: קשת של 30 מעלות לשורה, כך שרואים רק שלוש מעל ושלוש מתחת והן לא נערמות.
  // הרדיוס נגזר מגובה השורה כדי ששורות סמוכות לא יחפפו.
  const step=matchMedia("(max-width:767px)").matches?26:30;
  // לא דרך gsap.set: GSAP מסדר תמיד הזזה לפני סיבוב, ואז השורה רק מסתובבת במקום ב-z קבוע.
  // כאן חייבים rotateX ואז translateZ, כלומר מחרוזת transform ידנית.
  function place(){const h=drum.offsetHeight,r=(h*1.15)/(2*Math.tan(step*Math.PI/360));lines.forEach((l,i)=>{l.style.transform="rotateX("+(i*step)+"deg) translateZ("+r+"px)";});gsap.set(drum,{z:-r});}
  place();addEventListener("resize",place);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  // כל שורה עוצרת רגע בחזית: ease לכל צעד במקום סיבוב ליניארי
  const tl=gsap.timeline({scrollTrigger:{trigger:".cyl",start:"top top",end:"bottom bottom",scrub:.6}});
  for(let i=1;i<n;i++)tl.to(drum,{rotateX:-i*step,duration:1,ease:"power2.inOut"},i-1+.15);
})();`
},
{
  id:"g100", cat:"gsap", name:"לוח שלטים מתהפך (Split-flap)", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"מילה שבנויה מלוחיות כמו לוח הטיסות הישן. בכל סקשן שנכנס הלוחיות מתהפכות אחת אחרי השנייה ומרכיבות מילה חדשה, עם רעש ויזואלי קצר באמצע.",
  when:"כותרת דביקה שמתחלפת בין פרקים, מונה \"עכשיו בונים: ...\", לוח סטטוס. שלוש עד ארבע מילים באורך דומה.",
  note:"כל לוחית מתהפכת rotateX 0 ל--90 (מסתירה), מחליפה תו, וחוזרת מ-90 ל-0, בסטאגר של 40ms. המילים מרופדות לאותו אורך כדי שהלוח לא ישנה רוחב. במובייל הלוחיות קטנות (34px) וסטאגר זהה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sf-wrap{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:start}
.sf-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
.sf{display:flex;gap:6px;direction:rtl;perspective:800px}
.sf-t{width:clamp(34px,4.4vw,58px);height:clamp(48px,6.2vw,82px);border-radius:8px;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-size:clamp(26px,3.4vw,46px);font-weight:800;position:relative;transform-style:preserve-3d;will-change:transform;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.sf-t::after{content:"";position:absolute;inset-inline:0;top:50%;height:1px;background:color-mix(in srgb,var(--bg) 20%,transparent)}
.sf-steps{display:flex;flex-direction:column;gap:44vh;padding-block:36vh}
.sf-step h3{margin:0 0 8px;font-size:clamp(22px,2.6vw,36px)}
.sf-step p{margin:0;color:var(--muted);max-width:36ch;line-height:1.7}
@media(max-width:767px){.sf-wrap{grid-template-columns:1fr}.sf-pin{height:34vh;top:0;z-index:2;background:var(--bg)}.sf-steps{gap:28vh;padding-block:6vh 30vh}}`,
  html:`<div class="stage tight"><div class="sf-wrap">
  <div class="sf-pin"><div class="sf" aria-live="polite" data-words="אפיון,עיצוב,פיתוח,מדידה"></div></div>
  <div class="sf-steps">
    <div class="sf-step"><h3>מבינים לפני שמציירים</h3><p>שיחה אחת שממפה את הלקוח, את הבעיה ואת הפעולה שהאתר צריך להוביל אליה.</p></div>
    <div class="sf-step"><h3>מעצבים סביב משפט אחד</h3><p>כל מסך עונה על שאלה, כל כפתור מוביל למקום אחד.</p></div>
    <div class="sf-step"><h3>בונים ובודקים</h3><p>מהיר, נגיש, ומותאם לטלפון לפני הכל.</p></div>
    <div class="sf-step"><h3>מודדים ומשפרים</h3><p>כל פנייה נספרת. כל שינוי נבחן מול מספר.</p></div>
  </div>
</div></div>`,
  js:`(function(){
  const board=document.querySelector(".sf"),words=board.dataset.words.split(","),steps=gsap.utils.toArray(".sf-step");
  const len=Math.max(...words.map(w=>w.length)),pad=w=>w.padEnd(len,"\\u00a0");
  const tiles=[];for(let i=0;i<len;i++){const t=document.createElement("span");t.className="sf-t";board.appendChild(t);tiles.push(t);}
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur=-1;
  function show(k){
    if(k===cur)return;cur=k;const w=pad(words[k]);
    tiles.forEach((t,i)=>{
      if(reduce){t.textContent=w[i];return;}
      gsap.timeline({delay:i*.04})
        .to(t,{rotateX:-90,duration:.18,ease:"power2.in",onComplete(){t.textContent=w[i];}})
        .set(t,{rotateX:90})
        .to(t,{rotateX:0,duration:.28,ease:"power3.out"});
    });
  }
  show(0);
  steps.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 60%",end:"bottom 40%",onEnter:()=>show(i),onEnterBack:()=>show(i)}));
})();`
},
{
  id:"g101", cat:"gsap", name:"עדשת רנטגן שנוסעת בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"שתי גרסאות של אותה תמונה זו על זו (חוץ ופנים, לפני ואחרי, שרטוט ומוצר), ועדשה עגולה שנוסעת על פניהן עם הגלילה וחושפת את השכבה התחתונה רק בתוכה.",
  when:"אדריכלות ושיפוצים, רפואה, מכונאות, כל \"מה מתחת לפני השטח\". תמונה אחת, מסלול של שלוש עד ארבע נקודות.",
  note:"השכבה העליונה מקבלת clip-path circle עם מרכז שנע לאורך נקודות בסקראב (motion של המרכז דרך משתני CSS). במובייל העדשה גדולה יותר יחסית (34% מהרוחב) כי המסך צר.",
  libs:["gsap","ScrollTrigger"],
  css:`.xr{position:relative;height:280vh}
.xr-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.xr-fig{position:relative;width:min(900px,92vw);aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;--lx:80%;--ly:30%;--lr:16%}
.xr-fig .ph{position:absolute;inset:0;border-radius:0;font-size:22px}
.xr-under{background:repeating-linear-gradient(45deg,#1b2a4a 0 14px,#243766 14px 28px)}
.xr-over{clip-path:circle(var(--lr) at var(--lx) var(--ly))}
.xr-ring{position:absolute;left:var(--lx);top:var(--ly);width:calc(var(--lr) * 2 * 16 / 9 * 1);aspect-ratio:1;translate:-50% -50%;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.2),0 20px 50px rgba(0,0,0,.3);pointer-events:none}
.xr-lbl{position:absolute;bottom:18px;inset-inline-start:18px;background:color-mix(in srgb,var(--bg) 92%,transparent);color:var(--ink);padding:10px 14px;border-radius:10px;font-size:14px;font-weight:600}
@media(max-width:767px){.xr-fig{--lr:24%}}`,
  html:`<div class="xr">
  <div class="xr-pin"><div class="xr-fig">
    <div class="ph xr-under">מה שמתחת</div>
    <div class="ph ph-c xr-over">מה שרואים</div>
    <div class="xr-ring"></div>
    <div class="xr-lbl">גלול כדי להזיז את העדשה</div>
  </div></div>
</div>`,
  js:`(function(){
  const fig=document.querySelector(".xr-fig");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){fig.style.setProperty("--lr","40%");return;}
  // העדשה חושפת את השכבה התחתונה: clip-path על העליונה הוא הפוך, לכן משתמשים ב-mask דרך שתי שכבות:
  // העליונה נחתכת ל"הכל חוץ מהעיגול" באמצעות עיגול ענק פחות עיגול קטן (evenodd ב-polygon לא זמין ל-circle),
  // ולכן במקום זה השכבה התחתונה נחתכת לעיגול ויושבת מעל. הסדר ב-DOM הפוך מהשם, וזה בכוונה.
  const under=fig.querySelector(".xr-under"),over=fig.querySelector(".xr-over");
  over.style.clipPath="none";under.style.zIndex=2;under.style.clipPath="circle(var(--lr) at var(--lx) var(--ly))";
  const stops=[{x:80,y:30},{x:50,y:60},{x:22,y:35},{x:60,y:78}];
  const o={x:80,y:30};
  const tl=gsap.timeline({scrollTrigger:{trigger:".xr",start:"top top",end:"bottom bottom",scrub:.7},onUpdate(){fig.style.setProperty("--lx",o.x+"%");fig.style.setProperty("--ly",o.y+"%");}});
  stops.slice(1).forEach(p=>tl.to(o,{x:p.x,y:p.y,duration:1,ease:"power2.inOut"}));
  tl.to(".xr-lbl",{opacity:0,duration:.2},0);
})();`
},
{
  id:"g102", cat:"gsap", name:"תריסים: פסים שעולים בין סקשנים", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"מעבר בין שני סקשנים דרך שמונה פסים אנכיים שעולים בזה אחר זה ומכסים את הראשון, ואז יורדים וחושפים את השני. וילון בשכבות במקום גלילה רגילה.",
  when:"מעבר בין שני פרקים שרוצים להפריד בחדות: הירו לשירותים, סיפור לתמחור. פעם או פעמיים בעמוד.",
  note:"הפסים הם ילדים של שכבה קבועה מעל שני הסקשנים, עם scaleY מ-0 ל-1 (מלמטה) ואז מ-1 ל-0 (מלמעלה) בסטאגר. הכל transform. במובייל חמישה פסים במקום שמונה.",
  libs:["gsap","ScrollTrigger"],
  css:`.bl{position:relative;height:220vh}
.bl-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.bl-a,.bl-b{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px}
.bl-a{background:var(--card)}
.bl-b{background:var(--ink);color:var(--bg);opacity:0}
.bl-a h2,.bl-b h2{margin:0 0 10px;font-size:var(--fs-h2)}
.bl-a p,.bl-b p{margin:0;opacity:.75;max-width:40ch}
.bl-strips{position:absolute;inset:0;display:flex;pointer-events:none}
.bl-strips i{flex:1;background:var(--accent);transform:scaleY(0);transform-origin:50% 100%;will-change:transform}
@media(max-width:767px){.bl-strips i:nth-child(n+6){display:none}}`,
  html:`<div class="bl">
  <div class="bl-pin">
    <section class="bl-a"><div><h2>מה שהיה עד עכשיו</h2><p>אתר שנראה טוב מול הבעלים ולא עונה לגולש על השאלה היחידה שלו.</p></div></section>
    <section class="bl-b"><div><h2>ומה שיהיה מכאן</h2><p>עמוד שנבנה סביב פעולה אחת, ונמדד כל יום.</p></div></section>
    <div class="bl-strips"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</div>`,
  js:`(function(){
  const strips=gsap.utils.toArray(".bl-strips i");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".bl-b",{opacity:1});return;}
  gsap.timeline({scrollTrigger:{trigger:".bl",start:"top top",end:"bottom bottom",scrub:.5}})
    .to(strips,{scaleY:1,duration:1,ease:"power3.inOut",stagger:.08})           // עולים מלמטה ומכסים
    .set(".bl-b",{opacity:1}).set(".bl-a",{opacity:0})                           // מאחורי הווילון מחליפים
    .set(strips,{transformOrigin:"50% 0%"})
    .to(strips,{scaleY:0,duration:1,ease:"power3.inOut",stagger:.08},"+=.2");    // יורדים מלמעלה וחושפים
})();`
},
{
  id:"g103", cat:"gsap", name:"מספר פרק ענק שמתחלף בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"ספרה ענקית ודהויה יושבת ברקע ומחליפה ערך כשעוברים פרק: הישנה נדחפת למעלה ויוצאת, החדשה נכנסת מלמטה. הגולש תמיד יודע איפה הוא.",
  when:"עמוד שירות ארוך עם שלושה עד שישה פרקים, מדריך, תהליך. אחת לעמוד.",
  note:"הספרות כולן במארקאפ, ערומות זו על זו ומוסתרות, וההחלפה היא yPercent עם overflow:hidden על המכל. למכל חייבים לתת רוחב מפורש (2.4ch): הספרות עצמן absolute ולכן לא תורמות רוחב, המכל יוצא ברוחב אפס, ו-overflow:hidden מוחק את כל הספרה. הספרה ברקע (z-index 0, opacity .08) כך שהטקסט קריא מעליה. במובייל הספרה קטנה ויושבת בפינה במקום במרכז.",
  libs:["gsap","ScrollTrigger"],
  css:`.ch{position:relative}
.ch-num{position:sticky;top:0;height:100vh;display:grid;place-items:center;pointer-events:none;z-index:0;margin-bottom:-100vh}
.ch-clip{width:2.4ch;height:1em;font-size:clamp(160px,34vw,520px);font-weight:900;line-height:1;overflow:hidden;position:relative;color:var(--ink);opacity:.11;font-variant-numeric:tabular-nums}
.ch-clip span{position:absolute;inset:0;display:block;text-align:center}
.ch-body{position:relative;z-index:1;max-width:min(760px,92vw);margin-inline:auto;padding-block:10vh 30vh}
.ch-sec{min-height:90vh;display:grid;align-content:center;gap:12px}
.ch-sec b{font-size:12px;color:var(--accent);letter-spacing:.14em}
.ch-sec h2{margin:0;font-size:var(--fs-h2)}
.ch-sec p{margin:0;color:var(--muted);line-height:1.7;max-width:52ch}
@media(max-width:767px){.ch-num{place-items:start end;padding:16px}.ch-clip{font-size:120px;opacity:.1}}`,
  html:`<div class="ch">
  <div class="ch-num" aria-hidden="true"><div class="ch-clip"><span>01</span><span>02</span><span>03</span><span>04</span></div></div>
  <div class="ch-body">
    <section class="ch-sec"><b>פרק 01</b><h2>אפיון</h2><p>מי הלקוח, מה הוא מחפש, ומה עוצר אותו. שיחה אחת, ומסמך של עמוד.</p></section>
    <section class="ch-sec"><b>פרק 02</b><h2>קופי</h2><p>המשפט הראשון נכתב כאילו הוא היחיד שייקרא. ואז כל השאר.</p></section>
    <section class="ch-sec"><b>פרק 03</b><h2>עיצוב ובנייה</h2><p>מסך אחרי מסך, מובייל קודם, ומדידה מובנית.</p></section>
    <section class="ch-sec"><b>פרק 04</b><h2>עלייה וליווי</h2><p>האתר עולה, המספרים נאספים, והשיפורים נגזרים מהם.</p></section>
  </div>
</div>`,
  js:`(function(){
  const nums=gsap.utils.toArray(".ch-clip span"),secs=gsap.utils.toArray(".ch-sec");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.set(nums,{yPercent:100});gsap.set(nums[0],{yPercent:0});
  let cur=0;
  function go(k){
    if(k===cur)return;const dir=k>cur?1:-1,prev=cur;cur=k;
    if(reduce){gsap.set(nums[prev],{yPercent:100});gsap.set(nums[k],{yPercent:0});return;}
    gsap.to(nums[prev],{yPercent:-100*dir,duration:.6,ease:"power3.inOut"});
    gsap.fromTo(nums[k],{yPercent:100*dir},{yPercent:0,duration:.6,ease:"power3.inOut"});
  }
  secs.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 55%",end:"bottom 45%",onEnter:()=>go(i),onEnterBack:()=>go(i)}));
})();`
},
{
  id:"g104", cat:"gsap", name:"מוצר שמחליף צבע בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"מוצר אחד מוצמד, ובכל סקשן שנכנס הוא מחליף גוון: שכבת הצבע מעליו מתחלפת במעבר חלק, השם והמחיר מתעדכנים. דף מוצר עם ווריאנטים בלי לחיצה אחת.",
  when:"מוצר עם צבעים או גימורים (ריהוט, ביגוד, מכשירים, רכב). שלושה עד חמישה ווריאנטים.",
  note:"הצבע הוא שכבה עם mix-blend-mode:multiply מעל תמונה בגווני אפור, כך שהצללים נשמרים. ההחלפה היא crossfade של שכבות צבע, לא שינוי filter (זול יותר ולא משנה את הרקע). במובייל: מוצר למעלה 42vh, טקסט גולל מתחת.",
  libs:["gsap","ScrollTrigger"],
  css:`.pv{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:start}
.pv-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
.pv-fig{position:relative;width:min(440px,80%);aspect-ratio:4/5;border-radius:var(--r);overflow:hidden;background:#e9e9ee;isolation:isolate}
.pv-shape{position:absolute;inset:14%;border-radius:40% 40% 46% 46% / 50% 50% 40% 40%;background:linear-gradient(160deg,#fafafa,#8f8f98 70%,#5a5a64)}
.pv-tint{position:absolute;inset:14%;border-radius:inherit;border-radius:40% 40% 46% 46% / 50% 50% 40% 40%;mix-blend-mode:multiply;opacity:0}
.pv-steps{display:flex;flex-direction:column;gap:40vh;padding-block:36vh}
.pv-step{display:grid;gap:8px}
.pv-step i{width:22px;height:22px;border-radius:50%;border:2px solid var(--card);box-shadow:0 0 0 1px var(--line)}
.pv-step h3{margin:0;font-size:clamp(22px,2.6vw,36px)}
.pv-step p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
.pv-step b{font-size:20px}
@media(max-width:767px){.pv{grid-template-columns:1fr}.pv-pin{height:42vh;top:0;z-index:2;background:var(--bg)}.pv-fig{width:min(48vw,220px)}.pv-steps{gap:26vh;padding-block:6vh 30vh}}`,
  html:`<div class="stage tight"><div class="pv">
  <div class="pv-pin"><div class="pv-fig"><div class="pv-shape"></div>
    <div class="pv-tint" style="background:#c2255c"></div><div class="pv-tint" style="background:#1c7ed6"></div><div class="pv-tint" style="background:#2b8a3e"></div><div class="pv-tint" style="background:#e8590c"></div></div></div>
  <div class="pv-steps">
    <div class="pv-step"><i style="background:#c2255c"></i><h3>אדום פטל</h3><p>המהדורה הראשונה. נועז, נראה מרחוק.</p><b>1,290 ש"ח</b></div>
    <div class="pv-step"><i style="background:#1c7ed6"></i><h3>כחול אוקיינוס</h3><p>הקלאסי. מתאים לכל חלל.</p><b>1,290 ש"ח</b></div>
    <div class="pv-step"><i style="background:#2b8a3e"></i><h3>ירוק יער</h3><p>עמוק ושקט. הנמכר ביותר השנה.</p><b>1,390 ש"ח</b></div>
    <div class="pv-step"><i style="background:#e8590c"></i><h3>כתום שקיעה</h3><p>מהדורה מוגבלת, עד גמר המלאי.</p><b>1,490 ש"ח</b></div>
  </div>
</div></div>`,
  js:`(function(){
  const tints=gsap.utils.toArray(".pv-tint"),steps=gsap.utils.toArray(".pv-step");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur=-1;
  function show(k){ if(k===cur)return;cur=k;
    tints.forEach((t,i)=>gsap.to(t,{opacity:i===k?.85:0,duration:reduce?0:.7,ease:"power2.inOut",overwrite:true}));
    steps.forEach((s,i)=>gsap.to(s,{opacity:i===k?1:.35,duration:reduce?0:.4,overwrite:true}));
  }
  show(0);
  steps.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 60%",end:"bottom 40%",onEnter:()=>show(i),onEnterBack:()=>show(i)}));
})();`
},
{
  id:"g105", cat:"gsap", name:"מרקי שמתקבע לכותרת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רצועת מילים שרצה בלי סוף, וככל שגוללים היא מאטה, נעצרת, ונגררת עד שמילה אחת נוחתת בדיוק במרכז המסך. תנועה שהופכת לאמירה.",
  when:"פתיחת סקשן ערכים או שירותים: קודם השטף, אחר כך המסר. פעם אחת בעמוד.",
  note:"הרצועה ממוקמת מהקצה ולא ממורכזת, והעותקים שלה נבנים ב-JS עד שהם מכסים מסך שלם ועוד מחזור, אחרת בקצה הלולאה נפתח חלל ריק. הכיוון של הפריסה ltr כדי שהשכפול ייצמד בצד הנכון, וכל מילה עדיין נקראת בעברית. הנעילה נמדדת ב-getBoundingClientRect ולא ב-offsetLeft, כי ב-RTL עם flip ההיסט הזה משקר. במובייל אותו דבר עם פונט קטן.",
  libs:["gsap","ScrollTrigger"],
  css:`.mq{position:relative;height:220vh}
.mq-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.mq-track{position:absolute;top:50%;inset-inline-start:0;translate:0 -50%;display:flex;direction:ltr;white-space:nowrap;font-size:clamp(30px,6vw,84px);font-weight:800;will-change:transform}
.mq-set{display:flex;gap:.5em;padding-inline-end:.5em}
.mq-set span{color:var(--muted);opacity:.38}
.mq-set span::after{content:"·";margin-inline-start:.5em;opacity:.5}
.mq-set span.key{opacity:1;color:var(--ink)}
.mq-set span.key.on{color:var(--accent)}
.mq-sub{position:absolute;bottom:18vh;inset-inline:0;text-align:center;color:var(--muted);opacity:0}`,
  html:`<div class="mq">
  <div class="mq-pin">
    <div class="mq-track"><div class="mq-set"><span>אסטרטגיה</span><span>קופי</span><span>עיצוב</span><span class="key">אתר שמביא לקוחות</span><span>פיתוח</span><span>מדידה</span><span>ליווי</span></div></div>
    <p class="mq-sub">זה כל מה שאנחנו עושים.</p>
  </div>
</div>`,
  js:`(function(){
  const track=document.querySelector(".mq-track"),pin=document.querySelector(".mq-pin"),sub=document.querySelector(".mq-sub");
  const base=track.querySelector(".mq-set");
  const mid=()=>{const r=pin.getBoundingClientRect();return r.left+r.width/2;};
  const nearest=()=>{let d=null;track.querySelectorAll(".key").forEach(k=>{const r=k.getBoundingClientRect(),v=mid()-(r.left+r.width/2);if(d===null||Math.abs(v)<Math.abs(d))d=v;});return d;};
  let W=0,loop=null,lock=null;
  function fill(){
    track.querySelectorAll(".mq-set").forEach((n,i)=>{if(i)n.remove();});
    W=base.getBoundingClientRect().width;
    // כמה עותקים צריך כדי שהחלון תמיד יראה תוכן: מסך שלם ועוד מחזור אחד
    const need=Math.ceil((pin.clientWidth+W)/W)+1;
    for(let i=1;i<need;i++){const c=base.cloneNode(true);c.setAttribute("aria-hidden","true");track.appendChild(c);}
  }
  fill();
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){
    gsap.set(track,{x:nearest()});track.querySelectorAll(".key").forEach(k=>k.classList.add("on"));gsap.set(sub,{opacity:1});return;
  }
  function build(){
    loop&&loop.kill();lock=null;fill();gsap.set(track,{x:0});
    loop=gsap.to(track,{x:"-="+W,duration:W/90,ease:"none",repeat:-1,
      modifiers:{x:gsap.utils.unitize(v=>gsap.utils.wrap(-W,0,parseFloat(v)))}});
  }
  build();
  ScrollTrigger.addEventListener("refresh",build);
  ScrollTrigger.create({trigger:".mq",start:"top top",end:"bottom bottom",scrub:.6,onUpdate(s){
    const p=s.progress;
    if(p<.5){
      if(lock){lock=null;loop.play();}
      loop.timeScale(gsap.utils.clamp(0,1,(.5-p)*10));            // מאט עד עצירה מלאה בדיוק בחצי
      track.querySelectorAll(".key").forEach(k=>k.classList.remove("on"));
      gsap.set(sub,{opacity:0});return;
    }
    if(!lock){loop.pause();lock={from:gsap.getProperty(track,"x"),delta:nearest()};}
    const t=gsap.utils.clamp(0,1,(p-.5)*2.5),e=gsap.parseEase("power3.out")(t);
    gsap.set(track,{x:lock.from+lock.delta*e});
    track.querySelectorAll(".key").forEach(k=>k.classList.toggle("on",t>.8));
    gsap.set(sub,{opacity:gsap.utils.clamp(0,1,(t-.7)*3.4)});
  }});
})();`
},

{
  id:"g106", cat:"gsap", name:"חלונות אל תמונה קבועה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"תמונה אחת גדולה עומדת במקום מאחורי העמוד, והסקשנים שגוללים מעליה חתוכים בחלונות. דרך כל חלון רואים חלק אחר של אותה תמונה, כאילו מציצים דרך קיר.",
  when:"אתרי אדריכלות, אירוח, תיירות, אמנות. תמונה אחת חזקה שרוצים לחזור אליה לאורך העמוד. שלושה עד חמישה חלונות.",
  note:"בלי background-attachment:fixed (שבור באייפון): כל חלון מכיל עותק של התמונה שמוזז בדיוק במינוס מיקום החלון על המסך, בסקראב, כך שהיא נראית קבועה. במובייל החלונות ברוחב מלא וגבוהים פחות.",
  libs:["gsap","ScrollTrigger"],
  css:`.wn{max-width:min(1000px,92vw);margin-inline:auto;padding-block:10vh 30vh;display:grid;gap:40vh}
.wn-row{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:center}
.wn-row:nth-child(even) .wn-win{order:2}
.wn-win{position:relative;height:clamp(240px,50vh,480px);border-radius:var(--r);overflow:hidden}
.wn-img{position:absolute;left:0;top:0;width:100vw;height:100vh;background:linear-gradient(135deg,#1b2a4a 0%,#2f7a6b 40%,#c98a3a 75%,#f2d16b 100%);will-change:transform}
.wn-txt h3{margin:0 0 10px;font-size:clamp(22px,2.6vw,36px)}
.wn-txt p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
@media(max-width:767px){.wn-row{grid-template-columns:1fr}.wn-row:nth-child(even) .wn-win{order:0}.wn-win{height:40vh}}`,
  html:`<div class="wn">
  <div class="wn-row"><div class="wn-win"><div class="wn-img"></div></div><div class="wn-txt"><h3>הכניסה</h3><p>אותה תמונה, החלון הראשון. שימו לב שהיא לא זזה איתכם.</p></div></div>
  <div class="wn-row"><div class="wn-win"><div class="wn-img"></div></div><div class="wn-txt"><h3>הסלון</h3><p>החלון השני מציץ לחלק אחר של אותה תמונה.</p></div></div>
  <div class="wn-row"><div class="wn-win"><div class="wn-img"></div></div><div class="wn-txt"><h3>המרפסת</h3><p>והשלישי סוגר את התמונה. כאילו הלכתם לאורך קיר עם חלונות.</p></div></div>
</div>`,
  js:`(function(){
  const wins=gsap.utils.toArray(".wn-win");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  // התמונה בכל חלון מוזזת במינוס המיקום של החלון על המסך, ולכן נראית קבועה ביחס לחלון הדפדפן
  wins.forEach(w=>{const img=w.querySelector(".wn-img");
    ScrollTrigger.create({trigger:w,start:"top bottom",end:"bottom top",scrub:true,onUpdate(){const r=w.getBoundingClientRect();gsap.set(img,{x:-r.left,y:-r.top});},onRefresh(){const r=w.getBoundingClientRect();gsap.set(img,{x:-r.left,y:-r.top});}});
  });
})();`
},
{
  id:"g107", cat:"gsap", name:"שנה דביקה שמתחלפת בציר זמן", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"ציר זמן שבו השנה יושבת דבוקה בצד, ואירועים גוללים לצידה. כשעוברים לשנה הבאה הספרות מתגלגלות למעלה כמו מונה, והקו מתמלא.",
  when:"היסטוריה של חברה, אבני דרך, סיפור מסע. ארבע עד שמונה שנים.",
  note:"השנה היא ארבע ספרות נפרדות, וכל אחת מתגלגלת רק אם השתנתה (2019 ל-2020 מגלגלת שלוש). הקו האנכי הוא scaleY בסקראב. במובייל השנה יושבת למעלה ולא בצד.",
  libs:["gsap","ScrollTrigger"],
  css:`.yr{display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,5vw,80px);max-width:min(900px,92vw);margin-inline:auto;padding-block:10vh 30vh;position:relative}
.yr-side{position:sticky;top:0;height:100vh;display:grid;align-content:center;gap:18px}
.yr-num{display:flex;direction:ltr;font-size:clamp(48px,7vw,110px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums;color:var(--ink)}
.yr-d{position:relative;height:1em;width:.62em;overflow:hidden}
.yr-d span{position:absolute;inset:0;text-align:center}
.yr-line{position:absolute;inset-block:0;inset-inline-start:calc(clamp(48px,7vw,110px) * 2.6 + clamp(24px,5vw,80px) / 2);width:2px;background:var(--line)}
.yr-fill{position:absolute;inset:0;background:var(--accent);transform-origin:50% 0;transform:scaleY(0)}
.yr-list{display:grid;gap:30vh;padding-block:30vh}
.yr-ev h3{margin:0 0 8px;font-size:clamp(20px,2.4vw,32px)}
.yr-ev p{margin:0;color:var(--muted);line-height:1.7;max-width:40ch}
@media(max-width:767px){.yr{grid-template-columns:1fr}.yr-side{height:auto;top:0;padding:14px 0;background:var(--bg);z-index:2}.yr-line{display:none}.yr-list{gap:20vh;padding-block:6vh 20vh}}`,
  html:`<div class="yr">
  <div class="yr-side"><div class="yr-num" aria-live="polite"></div><p style="margin:0;color:var(--muted)">גלול לאורך השנים</p></div>
  <div class="yr-line" aria-hidden="true"><div class="yr-fill"></div></div>
  <div class="yr-list">
    <div class="yr-ev" data-year="2016"><h3>מתחילים מהבית</h3><p>שולחן אחד, לקוח אחד, ואתר ראשון שעלה לאוויר.</p></div>
    <div class="yr-ev" data-year="2019"><h3>עוברים לסטודיו</h3><p>שלושה אנשים, עשרות פרויקטים בשנה.</p></div>
    <div class="yr-ev" data-year="2022"><h3>מערכות, לא רק אתרים</h3><p>ה-CRM הראשון שבנינו ללקוח עדיין רץ.</p></div>
    <div class="yr-ev" data-year="2026"><h3>היום</h3><p>אתר, מערכת ואוטומציה תחת קורת גג אחת.</p></div>
  </div>
</div>`,
  js:`(function(){
  const num=document.querySelector(".yr-num"),evs=gsap.utils.toArray(".yr-ev"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const digits=[];for(let i=0;i<4;i++){const d=document.createElement("div");d.className="yr-d";const a=document.createElement("span"),b=document.createElement("span");d.append(a,b);num.appendChild(d);digits.push({a,b,cur:""});}
  function set(year){[...year].forEach((ch,i)=>{const d=digits[i];if(d.cur===ch)return;
    if(d.cur===""||reduce){d.a.textContent=ch;gsap.set(d.a,{yPercent:0});gsap.set(d.b,{yPercent:100});d.cur=ch;return;}
    const dir=+ch>+d.cur?1:-1;d.b.textContent=ch;
    gsap.fromTo(d.b,{yPercent:100*dir},{yPercent:0,duration:.5,ease:"power3.inOut"});
    gsap.to(d.a,{yPercent:-100*dir,duration:.5,ease:"power3.inOut",onComplete(){d.a.textContent=ch;gsap.set(d.a,{yPercent:0});gsap.set(d.b,{yPercent:100});}});
    d.cur=ch;});}
  set(evs[0].dataset.year);
  evs.forEach(e=>ScrollTrigger.create({trigger:e,start:"top 60%",end:"bottom 40%",onEnter:()=>set(e.dataset.year),onEnterBack:()=>set(e.dataset.year)}));
  gsap.to(".yr-fill",{scaleY:1,ease:"none",scrollTrigger:{trigger:".yr-list",start:"top 60%",end:"bottom 60%",scrub:reduce?false:.3}});
})();`
},
{
  id:"g108", cat:"gsap", name:"שורות כותרת שנפתחות ומגלות תמונה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כותרת של שתי שורות צמודות. בגלילה השורות מתרחקות זו מזו, ובמרווח שנפתח ביניהן מתגלה תמונה שגדלה עד לרוחב מלא. הטקסט הופך למסגרת.",
  when:"הירו של אתר תדמית, פתיחת פרויקט בתיק עבודות, סקשן \"מי אנחנו\". פעם אחת בעמוד.",
  note:"השורות זזות ב-y (מעלה ומטה) והתמונה ב-scaleY מ-0 ל-1 עם transform-origin במרכז, כך שאין reflow. גובה התמונה מוגבל ל-46vh בכוונה: מעבר לזה שתי השורות והכיתוב התחתון לא נכנסים למסך אחד, והכיתוב נוחת על השורה השנייה. במובייל השורות נפתחות פחות (התמונה 40vh) והפונט נשבר לשתי שורות קצרות.",
  libs:["gsap","ScrollTrigger"],
  css:`.sp2{position:relative;height:220vh}
.sp2-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.sp2-stack{display:grid;justify-items:center;text-align:center;width:100%}
.sp2-l{font-size:clamp(34px,7vw,110px);font-weight:900;line-height:1;margin:0;will-change:transform}
.sp2-img{width:min(1100px,94vw);height:min(46vh,470px);border-radius:var(--r);overflow:hidden;transform:scaleY(0);transform-origin:50% 50%;will-change:transform}
.sp2-img .ph{width:100%;height:100%;border-radius:0;font-size:0}
.sp2-cap{position:absolute;bottom:4vh;inset-inline:0;text-align:center;color:var(--muted);opacity:0}
@media(max-width:767px){.sp2-img{height:34vh}}`,
  html:`<div class="sp2">
  <div class="sp2-pin"><div class="sp2-stack">
    <h2 class="sp2-l">בונים מקומות</h2>
    <div class="sp2-img"><div class="ph ph-c"></div></div>
    <h2 class="sp2-l">שאנשים חוזרים אליהם</h2>
  </div><p class="sp2-cap">סטודיו לאדריכלות, מאז 2011</p></div>
</div>`,
  js:`(function(){
  const img=document.querySelector(".sp2-img"),lines=gsap.utils.toArray(".sp2-l");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(img,{scaleY:1});gsap.set(".sp2-cap",{opacity:1});return;}
  const mob=matchMedia("(max-width:767px)").matches;
  // התמונה תופסת מקום בגריד גם כשהיא scaleY(0), ולכן השורות מתחילות צמודות דרך y ונפתחות ל-0
  gsap.set(lines[0],{y:()=>img.offsetHeight/2});gsap.set(lines[1],{y:()=>-img.offsetHeight/2});
  gsap.timeline({scrollTrigger:{trigger:".sp2",start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}})
    .to(lines,{y:0,duration:1,ease:"power3.inOut"},0)
    .fromTo(img,{scaleY:0},{scaleY:1,duration:1,ease:"power3.inOut"},0)
    .to(lines,{scale:mob?.92:.86,duration:.4,ease:"power2.out"},.7)
    .to(".sp2-cap",{opacity:1,duration:.3},.8);
})();`
},
];
