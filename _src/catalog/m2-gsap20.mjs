// GSAP גל 20 (9.9.2026): 10 מהלכי גלילה "מיוחדים", לפי בקשת ליאב: לא הדברים שרואים כל יום.
// הסינון: מהלך מונע-גלילה (scrub או pin), עם רעיון שלא קיים ב-63 מהלכי הגלילה שכבר במאגר,
// ועדיין רב-שימושי (מוצר, סיפור, עדויות, יתרונות, גלריה). כל אחד מגדיר מה קורה במובייל.
export default [
{
  id:"g89", cat:"gsap", name:"מעבר דרך הכותרת (Zoom Through)", tech:"GSAP · ScrollTrigger · SVG mask", status:"ממתין",
  desc:"כותרת ענקית היא חור במסך אטום. בגלילה החור גדל עד שהצופה עובר דרך האותיות אל הסצנה שמאחור. פתיחה קולנועית לעמוד.",
  when:"הירו של אתר תדמית פרימיום, פתיחת קמפיין, מעבר לסקשן הגיבור. פעם אחת בעמוד, בראש.",
  note:"המסכה היא SVG mask עם טקסט עברי (SVG text תומך בעברית), והטקסט בתוך המסכה מקבל scale מ-1 ל-40 סביב אות מרכזית. הסצנה מאחור נחשפת בלי לזוז. במובייל הכותרת מתחילה גדולה יותר (אחרת האותיות דקות מדי כחור) והמסע קצר יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.zt{position:relative;height:230vh}
.zt-pin{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--ink)}
.zt-scene{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--bg);padding:24px}
.zt-scene .ph{position:absolute;inset:0;border-radius:0;opacity:.55;font-size:0}
.zt-scene div{position:relative;max-width:30ch}
.zt-scene h3{margin:0 0 10px;font-size:var(--fs-h2)}
.zt-scene p{margin:0;opacity:.85}
.zt-front{position:absolute;inset:0;width:100%;height:100%}
.zt-front rect{fill:var(--bg)}
.zt-front text{font-weight:900;font-size:120px;fill:#000;font-family:inherit}
.zt-hint{position:absolute;bottom:26px;inset-inline:0;text-align:center;font-size:13px;color:var(--muted)}
@media(max-width:767px){.zt{height:180vh}.zt-front text{font-size:150px}}`,
  html:`<div class="zt">
  <div class="zt-pin">
    <div class="zt-scene"><div class="ph ph-b"></div><div><h3>ברוכים הבאים פנימה</h3><p>מה שמאחורי השם: שיטה, צוות, ותוצאות שאפשר למדוד.</p></div></div>
    <svg class="zt-front" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><mask id="zt-m"><rect width="1000" height="600" fill="#fff"/><g class="zt-hole"><text x="500" y="345" text-anchor="middle" direction="rtl">סטודיו</text></g></mask></defs>
      <rect width="1000" height="600" mask="url(#zt-m)"/>
    </svg>
    <p class="zt-hint">גלול כדי להיכנס</p>
  </div>
</div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".zt-front",{opacity:0});return;}
  const mob=matchMedia("(max-width:767px)").matches;
  gsap.timeline({scrollTrigger:{trigger:".zt",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(".zt-hole",{scale:mob?26:40,transformOrigin:"50% 50%",ease:"power2.in",duration:1})   // GSAP מתעלם מ-transform-origin של CSS ב-SVG, חייבים לתת לו את המרכז
    .to(".zt-hint",{opacity:0,duration:.1},0)
    .to(".zt-front",{opacity:0,duration:.15},.85);   // בסוף המסע המסכה נעלמת לגמרי, כדי שלא יישאר קצה
})();`
},
{
  id:"g90", cat:"gsap", name:"שכבות מוצר שמתפרקות ומתחברות", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"מוצר שמוצג כערימת שכבות באיזומטריה. בגלילה השכבות מתרחקות זו מזו, כל אחת מקבלת תווית, ובסוף חוזרות ומתחברות. תרשים מפורק (exploded view) חי.",
  when:"מוצר עם שכבות אמיתיות (מזרן, נעל, מכשיר, ארכיטקטורת מערכת, חבילת שירות). שלוש עד חמש שכבות.",
  note:"כל שכבה היא div ב-preserve-3d עם translateZ שגדל בסקראב; ההטיה האיזומטרית (rotateX 58, rotateZ -32) קבועה על המכל. כל השכבות מתחילות בהפרש z קטן כדי שלא יהבהבו זו דרך זו, והתוויות נדלקות בתוך הטיימליין ולא במחלקה עם transition, כי תחת scrub טרנזישן מקפיץ. במובייל ההטיה קטנה והמרווח בין השכבות חצי, כדי שהכל ייכנס ל-390px.",
  libs:["gsap","ScrollTrigger"],
  css:`.ex{position:relative;height:260vh}
.ex-pin{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:var(--gap);padding-inline:var(--gutter);overflow:hidden}
.ex-stage{perspective:1400px;display:grid;place-items:center;height:70vh}
.ex-stack{position:relative;width:min(34vw,380px);aspect-ratio:1;transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-32deg)}
.ex-layer{position:absolute;inset:0;border-radius:22px;transform-style:preserve-3d;backface-visibility:hidden;display:grid;place-items:center;color:#fff;font-weight:800;font-size:22px;box-shadow:0 30px 60px rgba(0,0,0,.18);border:1px solid rgba(255,255,255,.35);will-change:transform}
.ex-copy h2{margin:0 0 12px;font-size:var(--fs-h2)}
.ex-copy p{margin:0 0 22px;color:var(--muted)}
.ex-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.ex-list li{display:flex;gap:12px;align-items:baseline;opacity:.28}
.ex-list li.on{opacity:1}
.ex-list b{font-size:12px;color:var(--accent);letter-spacing:.12em;min-width:2.4em}
@media(max-width:767px){.ex{height:200vh}.ex-pin{grid-template-columns:1fr;align-content:center;gap:10px}.ex-stage{height:44vh}.ex-stack{width:56vw;transform:rotateX(52deg) rotateZ(-28deg)}.ex-copy h2{font-size:clamp(22px,6vw,32px)}}`,
  html:`<div class="ex">
  <div class="ex-pin">
    <div class="ex-stage"><div class="ex-stack">
      <div class="ex-layer ph-a" style="background:linear-gradient(160deg,#3b5bdb,#748ffc)">בסיס</div>
      <div class="ex-layer" style="background:linear-gradient(160deg,#0b7285,#3bc9db)">מנוע</div>
      <div class="ex-layer" style="background:linear-gradient(160deg,#5f3dc4,#9775fa)">ממשק</div>
      <div class="ex-layer" style="background:linear-gradient(160deg,#e8590c,#ffa94d)">מעטפת</div>
    </div></div>
    <div class="ex-copy"><h2>מה יש בפנים</h2><p>ארבע שכבות שעובדות ביחד. גלול כדי לפרק.</p>
      <ul class="ex-list"><li><b>01</b>בסיס נתונים מאובטח, גיבוי יומי</li><li><b>02</b>מנוע אוטומציות שרץ ברקע</li><li><b>03</b>ממשק בעברית, לכל מכשיר</li><li><b>04</b>מעטפת שירות ותמיכה</li></ul></div>
  </div>
</div>`,
  js:`(function(){
  const layers=gsap.utils.toArray(".ex-layer"),items=gsap.utils.toArray(".ex-list li");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(l=>l.classList.add("on"));layers.forEach((l,i)=>gsap.set(l,{z:i*40}));return;}
  const GAP=matchMedia("(max-width:767px)").matches?76:140;
  gsap.set(layers,{z:(i)=>i*9});                              // בלי הפרש פתיחה ארבע השכבות באותו z ומהבהבות זו דרך זו
  const tl=gsap.timeline({scrollTrigger:{trigger:".ex",start:"top top",end:"bottom bottom",scrub:.5}});
  layers.forEach((l,i)=>{
    // אטימות התווית חיה בטיימליין ולא במחלקה עם transition: תחת scrub טרנזישן ומחלקה מקפיצים
    tl.to(l,{z:i*GAP,duration:1,ease:"power2.inOut"},i*.25)
      .to(items[i],{opacity:1,duration:.4,ease:"none"},i*.25+.2);
  });
  tl.to({},{duration:.6});                                    // רגע של שהייה במצב המפורק
  tl.to(layers,{z:(i)=>i*9,duration:1.2,ease:"power2.inOut",stagger:{each:.08,from:"end"}});   // מתחבר חזרה מלמעלה למטה
})();`
},
{
  id:"g91", cat:"gsap", name:"טקסט שנוסע במנהרה לעומק", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"שורות טקסט מונחות זו אחרי זו בעומק. הגלילה מסיעה את הצופה קדימה: כל שורה גדלה, חולפת על פניו ונעלמת, והבאה מגיעה מהרחוק. מניפסט שנקרא כמו מסע.",
  when:"מניפסט, ערכים, \"מה אנחנו מאמינים\", פתיחת סיפור מותג. ארבע עד שבע שורות קצרות.",
  note:"כל שורה מקבלת z התחלתי שלילי לפי המיקום שלה, והטיימליין מוסיף לכולן אותו z בסקראב, כך שהתחושה היא של מצלמה שנוסעת. השורה דוהה לפני שהיא חוצה את המצלמה. במובייל הפרספקטיבה קצרה יותר והמרווח בין שורות קטן.",
  libs:["gsap","ScrollTrigger"],
  css:`.tn{position:relative;height:320vh}
.tn-pin{position:sticky;top:0;height:100vh;overflow:hidden;perspective:900px;background:var(--ink);color:var(--bg);display:grid;place-items:center}
.tn-space{position:absolute;inset:0;transform-style:preserve-3d;display:grid;place-items:center}
.tn-line{position:absolute;font-size:clamp(28px,5vw,72px);font-weight:800;white-space:nowrap;will-change:transform,opacity;text-align:center;padding-inline:20px}
.tn-line small{display:block;font-size:.4em;font-weight:500;opacity:.7;margin-top:.3em}
.tn-glow{position:absolute;inset:30%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 45%,transparent),transparent);filter:blur(40px)}
@media(max-width:767px){.tn{height:260vh}.tn-pin{perspective:600px}}`,
  html:`<div class="tn">
  <div class="tn-pin"><div class="tn-glow"></div><div class="tn-space">
    <div class="tn-line">אנחנו לא בונים אתרים.<small>שורה ראשונה</small></div>
    <div class="tn-line">אנחנו בונים דרך להגיע אליכם.</div>
    <div class="tn-line">בלי רעש. בלי קישוטים.</div>
    <div class="tn-line">רק מה שמזיז לקוח לפעולה.</div>
    <div class="tn-line">וזה נמדד. כל יום.</div>
  </div></div>
</div>`,
  js:`(function(){
  const lines=gsap.utils.toArray(".tn-line"),STEP=matchMedia("(max-width:767px)").matches?700:1000;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){lines.forEach((l,i)=>gsap.set(l,{position:"static",marginBottom:20}));return;}
  lines.forEach((l,i)=>gsap.set(l,{z:-i*STEP,opacity:i===0?1:0}));
  const total=(lines.length-1)*STEP+STEP*.6;
  const tl=gsap.timeline({scrollTrigger:{trigger:".tn",start:"top top",end:"bottom bottom",scrub:.7}});
  tl.to(lines,{z:"+="+total,ease:"none",duration:1},0);
  // השקיפות יושבת באותו טיימליין ולא ב-onUpdate נפרד, כך שהיא נכונה גם בסקראב לאחור וגם בקפיצה.
  // לכל שורה: מופיעה כשהיא במרחק 1.2 צעדים, מלאה מ-0.4 צעד, ונעלמת כשהיא חולפת על פני המצלמה.
  const at=(i,z)=>Math.max(0,(z+i*STEP)/total);   // הזמן (0..1) שבו השורה i מגיעה לעומק z
  lines.forEach((l,i)=>{
    if(i>0)tl.fromTo(l,{opacity:0},{opacity:1,duration:Math.max(.001,at(i,-STEP*.4)-at(i,-STEP*1.2)),ease:"none"},at(i,-STEP*1.2));
    tl.to(l,{opacity:0,duration:Math.max(.001,at(i,300)-at(i,100)),ease:"none"},at(i,100));
  });
})();`
},
{
  id:"g92", cat:"gsap", name:"חפיסה שמתהפכת קלף אחר קלף", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"ערימת קלפים מוצמדת למסך. כל גלילה הופכת את הקלף העליון על צירו האופקי, חושפת את הבא, והקלף ההפוך נעלם מאחור. עדויות או יתרונות בקצב של קריאה.",
  when:"עדויות, שאלות ותשובות, ארבעה עד שישה יתרונות. כשרוצים שהקורא יעצור על כל אחד בנפרד.",
  note:"כל קלף מתהפך ב-rotateX מ-0 ל--180 סביב הקצה העליון (transform-origin 50% 0) עם backface-visibility:hidden, כך שבחצי הדרך הוא נעלם והבא כבר מלא מאחוריו. ציר במרכז נראה שבור כי הקלף מסתובב דרך הערימה, ולכן יש גם translateZ שמרים ומחזיר. סדר ה-z מתעדכן באמצע ההיפוך. במובייל הקלף גבוה ומרווח הגלילה לכל קלף קצר יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.fk{position:relative;height:calc(100vh + var(--fk-n,4) * 70vh)}
.fk-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;perspective:1600px;overflow:hidden}
.fk-deck{position:relative;width:min(640px,88vw);aspect-ratio:16/9;transform-style:preserve-3d}
.fk-card{position:absolute;inset:0;border-radius:24px;background:var(--card);border:1px solid var(--line);padding:clamp(22px,4vw,44px);display:flex;flex-direction:column;justify-content:center;gap:12px;
  backface-visibility:hidden;transform-origin:50% 0%;box-shadow:0 30px 70px rgba(0,0,0,.14);will-change:transform}
.fk-card q{font-size:clamp(18px,2.4vw,30px);font-weight:600;line-height:1.35;quotes:none}
.fk-card q::before{content:"״"}.fk-card q::after{content:"״"}
.fk-card cite{font-style:normal;color:var(--muted);font-size:15px}
.fk-card b{font-size:12px;color:var(--accent);letter-spacing:.14em}
.fk-hint{position:absolute;bottom:22px;font-size:13px;color:var(--muted)}
@media(max-width:767px){.fk-deck{aspect-ratio:4/5}.fk{height:calc(100vh + var(--fk-n,4) * 55vh)}}`,
  html:`<div class="fk" style="--fk-n:4">
  <div class="fk-pin"><div class="fk-deck">
    <article class="fk-card"><b>01</b><q>תוך שבועיים מהעלייה לאוויר קיבלנו יותר פניות מאשר בחצי השנה שלפני.</q><cite>ד"ר נועה לוי, קליניקה בתל אביב</cite></article>
    <article class="fk-card"><b>02</b><q>הפעם הראשונה שמישהו שאל אותנו מה הלקוח צריך לפני שדיבר על צבעים.</q><cite>רועי ברק, משרד עורכי דין</cite></article>
    <article class="fk-card"><b>03</b><q>האתר מסביר את העסק טוב יותר ממני. וזה בסדר.</q><cite>מיכל אדר, סטודיו לעיצוב פנים</cite></article>
    <article class="fk-card"><b>04</b><q>המספרים בדשבורד הם מה ששכנע את השותף שלי שזה עובד.</q><cite>אייל כהן, חנות אונליין</cite></article>
  </div><p class="fk-hint">גלול כדי להפוך</p></div>
</div>`,
  js:`(function(){
  const cards=gsap.utils.toArray(".fk-card"),n=cards.length;
  document.querySelector(".fk").style.setProperty("--fk-n",n-1);
  cards.forEach((c,i)=>gsap.set(c,{zIndex:n-i,y:i*6,scale:1-i*.02}));   // ערימה: כל קלף מציץ מעט מתחת לקודם
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(cards,{position:"relative",y:0,scale:1,marginBottom:16});document.querySelector(".fk-pin").style.height="auto";return;}
  const tl=gsap.timeline({scrollTrigger:{trigger:".fk",start:"top top",end:"bottom bottom",scrub:.5}});
  cards.slice(0,-1).forEach((c,i)=>{
    tl.to(c,{rotateX:-180,duration:1,ease:"power2.inOut"},i)
      .to(c,{z:150,duration:.5,ease:"power2.out"},i)                    // מתרומם מהערימה כדי שלא יסתובב דרך הקלפים שמתחתיו
      .to(c,{z:0,duration:.5,ease:"power2.in"},i+.5)
      .set(c,{zIndex:0},i+.5)                                           // באמצע ההיפוך הקלף עובר לתחתית הערימה
      .to(cards.slice(i+1),{y:(k)=>k*6,scale:(k)=>1-k*.02,duration:1,ease:"power2.out"},i)
      .to(".fk-hint",{opacity:0,duration:.2},0);
  });
})();`
},
{
  id:"g94", cat:"gsap", name:"מצלמה שנוסעת על תמונה בגלילה", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"תמונה גדולה אחת (מפה, תוכנית קומה, איור) ומצלמה שנוסעת עליה עם הגלילה: זום לנקודה, כיתוב, נסיעה לנקודה הבאה. סיור מודרך בלי שהצופה זז.",
  when:"מפת פרויקט, תוכנית דירה, איור תהליך, קמפוס, תפריט מסעדה מאויר. שלוש עד חמש תחנות.",
  note:"כל תחנה היא אחוזים על התמונה + זום. הטרנספורם מחושב בזמן refresh לפי גודל המכל (invalidateOnRefresh), לכן זה נכון בכל רוחב. במובייל הזום גדול יותר כי המסך צר, והכיתוב יושב למטה במקום בצד.",
  libs:["gsap","ScrollTrigger"],
  css:`.cam{position:relative;height:320vh}
.cam-pin{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--ink)}
.cam-img{position:absolute;inset:0;transform-origin:0 0;will-change:transform}
.cam-img .ph{position:absolute;inset:0;border-radius:0;font-size:0;background:linear-gradient(135deg,#1b2a4a,#2f7a6b 45%,#c98a3a)}
.cam-spot{position:absolute;width:26px;height:26px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 8px color-mix(in srgb,var(--accent) 30%,transparent);translate:-50% -50%}
.cam-cap{position:absolute;inset-inline-end:clamp(20px,5vw,60px);bottom:clamp(20px,6vh,60px);max-width:34ch;background:color-mix(in srgb,var(--bg) 92%,transparent);color:var(--ink);padding:18px 22px;border-radius:16px;opacity:0;translate:0 12px}
.cam-cap b{display:block;font-size:12px;color:var(--accent);letter-spacing:.14em;margin-bottom:6px}
.cam-cap h3{margin:0 0 6px;font-size:20px}
.cam-cap p{margin:0;color:var(--muted);font-size:15px;line-height:1.6}
@media(max-width:767px){.cam-cap{inset-inline:16px;max-width:none}}`,
  html:`<div class="cam">
  <div class="cam-pin">
    <div class="cam-img"><div class="ph"></div>
      <span class="cam-spot" style="left:22%;top:34%"></span><span class="cam-spot" style="left:64%;top:28%"></span><span class="cam-spot" style="left:48%;top:72%"></span></div>
    <div class="cam-cap" data-i="0"><b>תחנה 01</b><h3>הכניסה הראשית</h3><p>מפה מקבלת פנים, מרחב המתנה, וקפה.</p></div>
    <div class="cam-cap" data-i="1"><b>תחנה 02</b><h3>חדרי הטיפול</h3><p>שישה חדרים, אור טבעי בכולם.</p></div>
    <div class="cam-cap" data-i="2"><b>תחנה 03</b><h3>הגינה האחורית</h3><p>איפה שהמטופלים אוהבים לחכות.</p></div>
  </div>
</div>`,
  js:`(function(){
  const pin=document.querySelector(".cam-pin"),img=document.querySelector(".cam-img"),caps=gsap.utils.toArray(".cam-cap");
  const stops=[{x:.22,y:.34},{x:.64,y:.28},{x:.48,y:.72}];
  const Z=()=>matchMedia("(max-width:767px)").matches?3.2:2.4;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(caps[0],{opacity:1,translate:"0 0"});return;}
  // מביאים נקודה (אחוזים) למרכז המסך בזום נתון: x = W/2 - px*W*z
  const to=(p)=>({x:()=>pin.clientWidth/2-p.x*pin.clientWidth*Z(),y:()=>pin.clientHeight/2-p.y*pin.clientHeight*Z(),scale:Z});
  const tl=gsap.timeline({scrollTrigger:{trigger:".cam",start:"top top",end:"bottom bottom",scrub:.8,invalidateOnRefresh:true}});
  stops.forEach((p,i)=>{
    tl.to(img,{...to(p),duration:1.2,ease:"power2.inOut"},i*2)
      .to(caps[i],{opacity:1,translate:"0 0",duration:.3},i*2+1)
      .to(caps[i],{opacity:0,translate:"0 -12px",duration:.3},i*2+1.7);
  });
  tl.to(img,{x:0,y:0,scale:1,duration:1.2,ease:"power2.inOut"},stops.length*2);   // חזרה למבט מלא בסוף
})();`
},
{
  id:"g95", cat:"gsap", name:"קובייה שמסתובבת פאה-פאה בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"ארבע פאות של קובייה, כל אחת נושאת עדות או יתרון. הגלילה מסובבת את הקובייה 90 מעלות בכל שלב, עם עצירה קצרה על כל פאה.",
  when:"עדויות, ארבעה עקרונות, ארבע חבילות. בדיוק ארבעה פריטים, שקולים זה לזה.",
  note:"הפאות מסודרות ב-rotateY(i*90) translateZ(חצי הרוחב), והרוחב נמדד ב-refresh כדי שהעומק יתאים לכל מסך. הסיבוב בסקראב עם ease לכל רבע, כך שיש שהייה על כל פאה. במובייל הקובייה צרה יותר והגובה של המסלול קצר.",
  libs:["gsap","ScrollTrigger"],
  css:`.cb{position:relative;height:300vh}
.cb-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;perspective:1500px;overflow:hidden}
.cb-cube{position:relative;width:min(560px,80vw);aspect-ratio:16/10;transform-style:preserve-3d;will-change:transform}
.cb-face{position:absolute;inset:0;background:var(--card);border:1px solid var(--line);border-radius:22px;padding:clamp(22px,4vw,44px);display:flex;flex-direction:column;justify-content:center;gap:12px;backface-visibility:hidden;box-shadow:0 30px 70px rgba(0,0,0,.12)}
.cb-face q{font-size:clamp(18px,2.4vw,30px);font-weight:600;line-height:1.35;quotes:none}
.cb-face cite{font-style:normal;color:var(--muted);font-size:15px}
.cb-face b{font-size:12px;color:var(--accent);letter-spacing:.14em}
.cb-dots{position:absolute;bottom:26px;display:flex;gap:8px}
.cb-dots i{width:8px;height:8px;border-radius:50%;background:var(--line)}
.cb-dots i.on{background:var(--accent)}
@media(max-width:767px){.cb{height:240vh}.cb-cube{aspect-ratio:4/5}}`,
  html:`<div class="cb">
  <div class="cb-pin"><div class="cb-cube">
    <div class="cb-face"><b>01</b><q>האתר מסביר את העסק טוב יותר ממני.</q><cite>מיכל אדר, סטודיו לעיצוב פנים</cite></div>
    <div class="cb-face"><b>02</b><q>תוך שבועיים קיבלנו יותר פניות מחצי השנה שלפני.</q><cite>ד"ר נועה לוי, קליניקה</cite></div>
    <div class="cb-face"><b>03</b><q>הפעם הראשונה שמישהו שאל מה הלקוח צריך.</q><cite>רועי ברק, עורך דין</cite></div>
    <div class="cb-face"><b>04</b><q>המספרים שכנעו את השותף שלי.</q><cite>אייל כהן, חנות אונליין</cite></div>
  </div><div class="cb-dots"><i class="on"></i><i></i><i></i><i></i></div></div>
</div>`,
  js:`(function(){
  const cube=document.querySelector(".cb-cube"),faces=gsap.utils.toArray(".cb-face"),dots=gsap.utils.toArray(".cb-dots i");
  function place(){const d=cube.offsetWidth/2;faces.forEach((f,i)=>{f.style.transform="rotateY("+(i*90)+"deg) translateZ("+d+"px)";});gsap.set(cube,{z:-d});}   // סיבוב ואז הזזה: gsap.set היה מסדר הפוך והפאות היו מסתובבות במקום
  place();addEventListener("resize",place);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const tl=gsap.timeline({scrollTrigger:{trigger:".cb",start:"top top",end:"bottom bottom",scrub:.6,onUpdate(s){const k=Math.min(3,Math.round(s.progress*3));dots.forEach((d,i)=>d.classList.toggle("on",i===k));}}});
  // RTL: הפאה הבאה מגיעה משמאל, לכן הקובייה מסתובבת חיובית
  for(let i=1;i<4;i++)tl.to(cube,{rotateY:i*90,duration:1,ease:"power2.inOut"},i-1+.2);
})();`
},
{
  id:"g96", cat:"gsap", name:"סקשן שמתרומם מהשולחן", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"כרטיסים שוכבים שטוחים בפרספקטיבה, כמו על שולחן, ובזמן שהם נכנסים למסך הם מתרוממים לזקוף, אחד אחרי השני. כניסה עם עומק במקום עוד fade-up.",
  when:"גריד יתרונות, חבילות, צוות. כל סקשן כרטיסים שרוצים לתת לו נוכחות. פעם או פעמיים בעמוד.",
  note:"המכל מקבל perspective והכרטיסים rotateX(48) עם transform-origin למטה, וסקראב מחזיר אותם ל-0 עם סטאגר. אין pin, לכן זה זול וזורם. במובייל הזווית ההתחלתית קטנה (28) כי הכרטיסים בעמודה אחת וארוכים.",
  libs:["gsap","ScrollTrigger"],
  css:`.tb{perspective:1200px;perspective-origin:50% 0%;display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);max-width:1100px;margin-inline:auto;padding-block:10vh 20vh}
.tb-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:26px;transform-origin:50% 100%;will-change:transform,opacity;box-shadow:0 20px 50px rgba(0,0,0,.08)}
.tb-card .ph{height:140px;border-radius:12px;margin-bottom:18px;font-size:18px}
.tb-card h3{margin:0 0 6px;font-size:20px}
.tb-card p{margin:0;color:var(--muted);font-size:15px;line-height:1.6}
@media(max-width:767px){.tb{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="tb">
  <article class="tb-card"><div class="ph ph-a">1</div><h3>אפיון</h3><p>שיחה אחת שממפה מי הלקוח ומה מונע ממנו לפנות.</p></article>
  <article class="tb-card"><div class="ph ph-b">2</div><h3>קופי ועיצוב</h3><p>כל משפט עונה על שאלה. כל מסך מוביל לפעולה.</p></article>
  <article class="tb-card"><div class="ph ph-c">3</div><h3>עלייה ומדידה</h3><p>האתר עולה תוך שבועיים, וכל פנייה נספרת.</p></article>
  <article class="tb-card"><div class="ph ph-d">4</div><h3>ליווי</h3><p>חודש של תיקונים ושיפורים לפי הנתונים.</p></article>
  <article class="tb-card"><div class="ph ph-e">5</div><h3>הרחבה</h3><p>דפי נחיתה, מערכות, אוטומציות. כשצריך.</p></article>
  <article class="tb-card"><div class="ph ph-a">6</div><h3>תחזוקה</h3><p>עדכונים, גיבויים ואבטחה, בלי לחשוב על זה.</p></article>
</div></div>`,
  js:`(function(){
  const cards=gsap.utils.toArray(".tb-card");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const ang=matchMedia("(max-width:767px)").matches?28:48;
  gsap.set(cards,{rotateX:ang,y:60,opacity:.35});
  ScrollTrigger.batch(cards,{start:"top 88%",end:"top 45%",scrub:.6,onEnter:b=>{},   // batch כאן רק כדי לקבץ את הכרטיסים לפי שורה
    onEnter:batch=>gsap.to(batch,{rotateX:0,y:0,opacity:1,stagger:.1,duration:.8,ease:"power3.out",overwrite:true}),
    onLeaveBack:batch=>gsap.to(batch,{rotateX:ang,y:60,opacity:.35,stagger:.05,duration:.5,ease:"power3.in",overwrite:true})});
})();`
},
{
  id:"g97", cat:"gsap", name:"קו סריקה שהופך שלד לצבע", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"מסך מוצר מופיע כשלד אפור עם קווי מתאר. קו סריקה יורד עם הגלילה, ומתחתיו הכל מקבל צבע וחיים. \"לפני ואחרי\" שהגלילה עצמה מציירת.",
  when:"מוצר דיגיטלי, מערכת, אפליקציה, \"מה אנחנו בונים\". פעם אחת בעמוד.",
  note:"שתי שכבות זהות: אחת בשלד (grayscale, opacity, גבולות מקווקווים), אחת בצבע עם clip-path inset מלמעלה. הסקראב מזיז את קו החיתוך ואת פס הסריקה יחד. במובייל המסך המדומה צר וגבוה, והסריקה זהה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sc{position:relative;height:220vh}
.sc-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.sc-frame{position:relative;width:min(760px,90vw);aspect-ratio:16/10;border-radius:18px;overflow:hidden;background:var(--card);border:1px solid var(--line);box-shadow:0 30px 70px rgba(0,0,0,.12)}
.sc-ui{position:absolute;inset:0;padding:22px;display:grid;grid-template-columns:1fr 2fr;gap:14px}
.sc-ui i{display:block;border-radius:10px}
.sc-side{display:grid;gap:10px;align-content:start}
.sc-side i{height:14px;background:var(--line)}
.sc-side i:first-child{height:34px;background:var(--accent)}
.sc-main{display:grid;grid-template-rows:auto 1fr;gap:12px}
.sc-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.sc-kpis i{height:56px;background:var(--bg);border:1px solid var(--line)}
.sc-chart{border:1px solid var(--line);border-radius:12px;background:linear-gradient(180deg,transparent 60%,color-mix(in srgb,var(--accent) 20%,transparent));position:relative}
.sc-chart::after{content:"";position:absolute;inset:auto 10% 20% 10%;height:3px;background:var(--accent);border-radius:3px}
.sc-wire{filter:grayscale(1) contrast(.5);opacity:.55}
.sc-wire i,.sc-wire .sc-chart{background:transparent!important;border:1.5px dashed var(--muted)!important}
.sc-wire .sc-chart::after{background:var(--muted)}
.sc-color{clip-path:inset(0 0 100% 0);will-change:clip-path}
.sc-line{position:absolute;inset-inline:0;top:0;height:2px;background:var(--accent);box-shadow:0 0 18px var(--accent);will-change:transform}
.sc-cap{position:absolute;bottom:26px;font-size:13px;color:var(--muted)}
@media(max-width:767px){.sc-frame{aspect-ratio:4/5}.sc-ui{grid-template-columns:1fr;grid-template-rows:auto 1fr}.sc-kpis i{height:40px}}`,
  html:`<div class="sc">
  <div class="sc-pin"><div class="sc-frame">
    <div class="sc-ui sc-wire"><div class="sc-side"><i></i><i></i><i></i><i></i><i></i></div><div class="sc-main"><div class="sc-kpis"><i></i><i></i><i></i></div><div class="sc-chart"></div></div></div>
    <div class="sc-ui sc-color"><div class="sc-side"><i></i><i></i><i></i><i></i><i></i></div><div class="sc-main"><div class="sc-kpis"><i></i><i></i><i></i></div><div class="sc-chart"></div></div></div>
    <div class="sc-line"></div>
  </div><p class="sc-cap">גלול כדי לסרוק</p></div>
</div>`,
  js:`(function(){
  const frame=document.querySelector(".sc-frame"),color=document.querySelector(".sc-color"),line=document.querySelector(".sc-line");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(color,{clipPath:"inset(0 0 0% 0)"});gsap.set(line,{opacity:0});return;}
  gsap.timeline({scrollTrigger:{trigger:".sc",start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}})
    .fromTo(color,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",ease:"none",duration:1},0)
    .fromTo(line,{y:0},{y:()=>frame.clientHeight,ease:"none",duration:1},0)
    .to(line,{opacity:0,duration:.05},.96)
    .to(".sc-cap",{opacity:0,duration:.1},0);
})();`
},
{
  id:"g98", cat:"gsap", name:"אריחים שמתהפכים בגל בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"גריד אריחים שכולם מראים את הצד הכהה. ככל שגוללים, גל של היפוכים עובר עליהם באלכסון וחושף תמונה או צבע בכל אריח. פסיפס שנבנה מול העיניים.",
  when:"קיר לוגואים, גלריית פרויקטים, \"במספרים\" עם אריח לכל נתון. שנים עשר עד עשרים אריחים.",
  note:"כל אריח הוא שתי פאות עם backface-visibility, וההיפוך (rotateY 180 ל-0) בסקראב עם stagger מסוג grid באלכסון מהפינה הימנית העליונה. במובייל הגריד יורד לשתי עמודות והגל נשאר אלכסוני.",
  libs:["gsap","ScrollTrigger"],
  css:`.fw{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1000px;margin-inline:auto;perspective:1000px;padding-block:10vh 30vh}
.fw-tile{position:relative;aspect-ratio:1;transform-style:preserve-3d;will-change:transform}
.fw-face{position:absolute;inset:0;border-radius:14px;backface-visibility:hidden;display:grid;place-items:center;font-weight:800;color:#fff;font-size:20px}
.fw-back{background:var(--ink);color:var(--bg);transform:rotateY(180deg);font-size:14px;opacity:.9}
.fw-front.ph{border-radius:14px}
@media(max-width:767px){.fw{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage tight"><div class="fw">
  <div class="fw-tile"><div class="fw-face fw-front ph ph-a">1</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-b">2</div><div class="fw-face fw-back">·</div></div>
  <div class="fw-tile"><div class="fw-face fw-front ph ph-c">3</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-d">4</div><div class="fw-face fw-back">·</div></div>
  <div class="fw-tile"><div class="fw-face fw-front ph ph-e">5</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-a">6</div><div class="fw-face fw-back">·</div></div>
  <div class="fw-tile"><div class="fw-face fw-front ph ph-b">7</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-c">8</div><div class="fw-face fw-back">·</div></div>
  <div class="fw-tile"><div class="fw-face fw-front ph ph-d">9</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-e">10</div><div class="fw-face fw-back">·</div></div>
  <div class="fw-tile"><div class="fw-face fw-front ph ph-a">11</div><div class="fw-face fw-back">·</div></div><div class="fw-tile"><div class="fw-face fw-front ph ph-b">12</div><div class="fw-face fw-back">·</div></div>
</div></div>`,
  js:`(function(){
  const tiles=gsap.utils.toArray(".fw-tile");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const cols=matchMedia("(max-width:767px)").matches?2:4;
  gsap.set(tiles,{rotateY:180});
  gsap.to(tiles,{rotateY:0,ease:"power2.inOut",duration:1,
    stagger:{grid:[Math.ceil(tiles.length/cols),cols],from:"start",axis:null,amount:1.4},   // גל אלכסוני מהפינה הראשונה (ימין למעלה ב-RTL)
    scrollTrigger:{trigger:".fw",start:"top 75%",end:"bottom 60%",scrub:.6}});
})();`
},
];
