// GSAP גל 19 (9.9.2026): 16 מהלכים שנבחרו מתוך המחקר של אתרי הסוכנויות ב-refs.gallery/category/gsap
// (Lusion, Metalab, Wonderland, Ashley & Co., The Branding People, Amour Liquide, 19h47, ATMOS),
// אחרי סינון מול 134 המהלכים שכבר במאגר. הקריטריון: דפוס שחוזר בכמה אתרים, לא קיים אצלנו,
// ומתאים להרבה עסקים. כל מהלך: מובייל מוגדר במפורש (מה קורה במגע), reduced-motion, טוקנים.
export default [
{
  id:"g73", cat:"gsap", name:"טקסט מתפענח (Scramble)", tech:"GSAP · ScrambleText", status:"ממתין", runway:false,
  desc:"כותרת או תווית שנכנסת כרעש של תווים ומתייצבת לטקסט הסופי, תו אחרי תו. בהובר על תפריט המילה מתערבבת ומתייצבת שוב.",
  when:"תוויות ומספרים באתרי טכנולוגיה, ניווט של סטודיו, כותרת הירו אחת. לא לפסקאות.",
  note:"ScrambleText עובד עם תווים עבריים כשמעבירים לו chars בעברית; בלי זה הרעש לטיני והמעבר צורם. במובייל אין הובר, לכן הפענוח רץ פעם אחת בכניסה למסך בלבד. reduced-motion: הטקסט מופיע גמור.",
  libs:["gsap","ScrollTrigger","ScrambleTextPlugin"],
  css:`.scr{text-align:center;max-width:26ch;margin-inline:auto}
.scr-kick{display:block;font-size:13px;letter-spacing:.18em;color:var(--muted);margin-bottom:14px;font-variant-numeric:tabular-nums}
.scr h2{font-size:var(--fs-demo);line-height:1.1;margin:0 0 30px;font-weight:800;min-height:1.1em}
.scr-nav{display:flex;justify-content:center;gap:clamp(14px,3vw,36px);flex-wrap:wrap}
.scr-nav a{font-weight:600;font-size:17px;color:var(--ink);padding:8px 4px;border-bottom:2px solid transparent;font-variant-ligatures:none;min-width:5ch;text-align:center}
.scr-nav a:hover{border-color:var(--accent)}`,
  html:`<div class="stage"><div class="scr">
  <span class="scr-kick" data-scr="מאז 2016 · 40+ פרויקטים">·········</span>
  <h2 data-scr="אתרים שמביאים לקוחות">····· ······· ······</h2>
  <nav class="scr-nav"><a href="#" data-scr="עבודות">עבודות</a><a href="#" data-scr="שירותים">שירותים</a><a href="#" data-scr="אודות">אודות</a><a href="#" data-scr="צור קשר">צור קשר</a></nav>
</div></div>`,
  js:`(function(){
  const HEB="אבגדהוזחטיכלמנסעפצקרשת0123456789";   // רעש בעברית, אחרת המעבר לטיני וצורם
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items=[...document.querySelectorAll("[data-scr]")];
  if(reduce){items.forEach(el=>el.textContent=el.dataset.scr);return;}
  ScrollTrigger.create({trigger:".scr",start:"top 80%",once:true,onEnter(){
    items.forEach((el,i)=>gsap.to(el,{duration:1.1,delay:i*.12,scrambleText:{text:el.dataset.scr,chars:HEB,speed:.6,revealDelay:.25}}));
  }});
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    document.querySelectorAll(".scr-nav a").forEach(a=>a.addEventListener("mouseenter",()=>{
      gsap.to(a,{duration:.55,overwrite:true,scrambleText:{text:a.dataset.scr,chars:HEB,speed:1}});
    }));
  }
})();`
},
{
  id:"g74", cat:"gsap", name:"משקל הפונט זורם בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כותרת גדולה שהמילים בה מתעבות מדק לשמן בגל שעובר משמאל לימין עם הגלילה, וחוזר. פונט משתנה עושה את זה בלי שום שכבה נוספת.",
  when:"כותרת מניפסט, משפט ערך מרכזי, פתיח לסקשן. פעם אחת בעמוד, על פונט משתנה (Heebo, Ploni Variable).",
  note:"דורש פונט משתנה עם ציר משקל רציף. הדמו רץ על Heebo (100 עד 900). font-weight היא תכונת layout שגורמת reflow, לכן מנפישים מילה-מילה בסקראב ולא באנימציה רצה, ובמובייל הטווח קטן (300 עד 700) כדי שהשורות לא יישברו מחדש.",
  libs:["gsap","ScrollTrigger"],
  css:`.wv{max-width:min(900px,92vw);margin-inline:auto;padding-block:20vh}
.wv h2{font-family:"Heebo",system-ui,sans-serif;font-size:clamp(34px,6vw,96px);line-height:1.15;margin:0;font-weight:200;text-align:center}
.wv .w{display:inline-block;margin-inline:.14em;font-weight:200;font-variation-settings:"wght" 200}
.wv-hint{text-align:center;color:var(--muted);font-size:14px;margin-top:20px}`,
  html:`<div class="stage"><div class="wv">
  <h2><span class="w">אתר</span><span class="w">טוב</span><span class="w">לא</span><span class="w">צועק.</span><br><span class="w">הוא</span><span class="w">מסביר,</span><span class="w">ואז</span><span class="w">מוכר.</span></h2>
  <p class="wv-hint">גלול לאט</p>
</div></div>`,
  js:`(function(){
  const words=gsap.utils.toArray(".wv .w");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(words,{fontWeight:600});return;}
  const mm=gsap.matchMedia();
  mm.add({desk:"(min-width:768px)",mob:"(max-width:767px)"},ctx=>{
    const [lo,hi]=ctx.conditions.desk?[200,900]:[300,700];
    const tl=gsap.timeline({scrollTrigger:{trigger:".wv",start:"top 70%",end:"bottom 30%",scrub:.6}});
    words.forEach((w,i)=>{
      // כל מילה עולה ויורדת בתורה: גל שעובר על המשפט
      tl.fromTo(w,{fontWeight:lo},{fontWeight:hi,duration:1,ease:"none"},i*.35)
        .to(w,{fontWeight:lo,duration:1,ease:"none"},i*.35+1.2);
    });
  });
})();`
},
{
  id:"g75", cat:"gsap", name:"בלוב רקע שמשנה צורה בגלילה", tech:"GSAP · MorphSVG", status:"ממתין",
  desc:"צורה אורגנית אחת מאחורי ההירו שנוזלת בין שלוש צורות בזמן הגלילה, ומסתובבת לאט. רקע חי בלי וידאו ובלי WebGL.",
  when:"רקע הירו או סקשן ערכים באתרי בריאות, טיפול, מזון, קהילה. אחד לעמוד, תמיד מאחורי טקסט עם ניגודיות מספקת.",
  note:"MorphSVG ממפה נקודות בין שלושה path עם אותו מספר קודקודים, לכן המעבר חלק. במובייל הבלוב קטן ל-70% ומוצב בפינה כדי לא להסתיר טקסט. reduced-motion: צורה אחת קבועה.",
  libs:["gsap","ScrollTrigger","MorphSVGPlugin"],
  css:`.blb{position:relative;min-height:120vh;display:grid;place-items:center;overflow:hidden}
.blb svg{position:absolute;width:min(70vw,720px);height:auto;inset-inline-start:50%;top:50%;translate:-50% -50%;z-index:0;opacity:.9;will-change:transform}
html[dir="rtl"] .blb svg{translate:50% -50%}
.blb path{fill:var(--accent)}
.blb-copy{position:relative;z-index:1;text-align:center;max-width:30ch;padding:clamp(26px,4vw,48px);background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(14px);border-radius:24px}
.blb-copy h2{margin:0 0 12px;font-size:var(--fs-h2)}
.blb-copy p{margin:0;color:var(--muted)}
@media(max-width:767px){.blb svg{width:90vw;top:30%}}`,
  html:`<div class="blb">
  <svg viewBox="0 0 600 600" aria-hidden="true">
    <path class="blb-shape" d="M300 80C400 60 520 130 540 240C560 350 500 470 400 510C300 550 170 520 110 430C50 340 80 210 160 140C210 95 250 90 300 80Z"/>
    <path class="blb-b" style="display:none" d="M320 60C440 80 540 200 520 320C500 440 400 540 280 540C160 540 60 460 60 340C60 220 130 130 220 90C260 72 290 55 320 60Z"/>
    <path class="blb-c" style="display:none" d="M260 70C380 40 500 90 550 190C600 290 540 400 460 470C380 540 240 560 150 490C60 420 40 300 90 200C130 120 200 85 260 70Z"/>
  </svg>
  <div class="blb-copy"><h2>טיפול שמתאים לקצב שלך</h2><p>בלי תור של חודשיים, בלי טפסים. פגישה ראשונה תוך שבוע.</p></div>
</div>`,
  js:`(function(){
  const shape=document.querySelector(".blb-shape");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  gsap.timeline({scrollTrigger:{trigger:".blb",start:"top bottom",end:"bottom top",scrub:1}})
    .to(shape,{morphSVG:".blb-b",ease:"none"})
    .to(shape,{morphSVG:".blb-c",ease:"none"});
  gsap.to(".blb svg",{rotate:40,ease:"none",scrollTrigger:{trigger:".blb",start:"top bottom",end:"bottom top",scrub:1}});
})();`
},
{
  id:"g76", cat:"gsap", name:"סמן-תווית שמשתנה לפי האלמנט", tech:"GSAP · quickTo", status:"ממתין", runway:false,
  desc:"עיגול קטן שעוקב אחרי הסמן, ומעל תמונות וקישורים הוא גדל ומקבל מילה: \"צפייה\", \"פתיחה\", \"גרירה\". הסמן הופך להנחיה.",
  when:"גלריות עבודות, רשימות פרויקטים, קרוסלות. דסקטופ בלבד: במגע הסמן לא קיים והתווית עוברת לכיתוב קבוע על הפריט.",
  note:"התווית נקראת מ-data-cursor על האלמנט, לכן מוסיפים אלמנטים בלי לגעת ב-JS. quickTo מחליק את התנועה בלי ליצור טווין חדש בכל אירוע. במגע: הכיתוב מוצג כתג סטטי בפינת התמונה.",
  libs:["gsap"],
  css:`.lc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.lc-item{position:relative;aspect-ratio:4/3;border-radius:var(--r);overflow:hidden;cursor:none}
.lc-item .ph{position:absolute;inset:0;border-radius:0;font-size:22px}
.lc-tag{position:absolute;bottom:12px;inset-inline-start:12px;background:var(--ink);color:var(--bg);font-size:12px;padding:6px 12px;border-radius:999px;display:none}
.lc-cur{position:fixed;top:0;left:0;width:14px;height:14px;border-radius:50%;background:var(--accent);color:var(--accent-ink);pointer-events:none;z-index:99;
  display:grid;place-items:center;font-size:13px;font-weight:600;translate:-50% -50%;opacity:0;white-space:nowrap}
@media (hover:none){.lc-item{cursor:default}.lc-tag{display:inline-block}.lc-cur{display:none}}
@media (max-width:767px){.lc-grid{grid-template-columns:1fr 1fr}}`,
  html:`<div class="stage tight"><div class="lc-grid">
  <a class="lc-item" href="#" data-cursor="צפייה"><div class="ph ph-a">1</div><span class="lc-tag">צפייה</span></a>
  <a class="lc-item" href="#" data-cursor="פתיחה"><div class="ph ph-b">2</div><span class="lc-tag">פתיחה</span></a>
  <a class="lc-item" href="#" data-cursor="צפייה"><div class="ph ph-c">3</div><span class="lc-tag">צפייה</span></a>
  <a class="lc-item" href="#" data-cursor="גרירה"><div class="ph ph-d">4</div><span class="lc-tag">גרירה</span></a>
  <a class="lc-item" href="#" data-cursor="צפייה"><div class="ph ph-e">5</div><span class="lc-tag">צפייה</span></a>
  <a class="lc-item" href="#" data-cursor="פתיחה"><div class="ph ph-a">6</div><span class="lc-tag">פתיחה</span></a>
</div></div>`,
  js:`(function(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  const cur=document.createElement("div");cur.className="lc-cur";document.body.appendChild(cur);
  const x=gsap.quickTo(cur,"x",{duration:.25,ease:"power3.out"}),y=gsap.quickTo(cur,"y",{duration:.25,ease:"power3.out"});
  let shown=false;
  document.addEventListener("mousemove",e=>{x(e.clientX);y(e.clientY);if(!shown){shown=true;gsap.to(cur,{opacity:1,duration:.3});}});
  document.querySelectorAll("[data-cursor]").forEach(el=>{
    el.addEventListener("mouseenter",()=>{cur.textContent=el.dataset.cursor;gsap.to(cur,{width:84,height:84,duration:.35,ease:"power3.out"});});
    el.addEventListener("mouseleave",()=>{cur.textContent="";gsap.to(cur,{width:14,height:14,duration:.35,ease:"power3.out"});});
  });
})();`
},
{
  id:"g77", cat:"gsap", name:"כותרת מקו מתאר למילוי בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כותרת ענקית שמתחילה כקו מתאר בלבד, והמילים מתמלאות בצבע אחת אחרי השנייה ככל שגוללים. הקריאה נעשית פיזית.",
  when:"מניפסט, משפט ערך, כותרת סקשן דרמטית באתרי סטודיו וסוכנויות. אחת לעמוד.",
  note:"-webkit-text-stroke עובד בעברית בכל הדפדפנים המודרניים. המילוי הוא צבע הטקסט שעובר משקוף ל-ink, לא מסכה, לכן זול. במובייל הקו דק יותר (1px) כי אותיות קטנות עם קו עבה נסתמות.",
  libs:["gsap","ScrollTrigger"],
  css:`.ol{max-width:min(1000px,94vw);margin-inline:auto;padding-block:16vh}
.ol h2{font-size:clamp(38px,7.5vw,120px);line-height:1.05;margin:0;font-weight:800;text-align:center}
.ol .w{display:inline-block;margin-inline:.12em;color:transparent;-webkit-text-stroke:1.6px var(--ink);paint-order:stroke fill}
@media(max-width:767px){.ol .w{-webkit-text-stroke-width:1px}}`,
  html:`<div class="stage"><div class="ol"><h2><span class="w">לא</span><span class="w">עוד</span><span class="w">אתר.</span><br><span class="w">מכונה</span><span class="w">שמייצרת</span><span class="w">פניות.</span></h2></div></div>`,
  js:`(function(){
  const words=gsap.utils.toArray(".ol .w");
  const ink=getComputedStyle(document.documentElement).getPropertyValue("--ink").trim()||"#16182b";
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(words,{color:ink});return;}
  gsap.to(words,{color:ink,stagger:.35,ease:"none",scrollTrigger:{trigger:".ol",start:"top 75%",end:"bottom 45%",scrub:.5}});
})();`
},
{
  id:"g78", cat:"gsap", name:"חזרה למעלה עם טבעת התקדמות", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כפתור עגול בפינה שמופיע אחרי מסך אחד, וטבעת סביבו מתמלאת לפי כמה מהעמוד כבר נקרא. לחיצה גוללת חלק למעלה.",
  when:"כל עמוד ארוך: בלוג, מחירון, עמוד שירות. הטבעת נותנת תחושת מקום בלי פס התקדמות בראש העמוד.",
  note:"הטבעת היא SVG עם stroke-dashoffset שנקשר לגלילה; ScrollTrigger עושה את הסקראב. במובייל הכפתור יושב מעל אזור האגודל (bottom:20px + safe-area) וקטן ל-44px, המינימום למגע.",
  libs:["gsap","ScrollTrigger","ScrollToPlugin"],
  css:`.tt-body{max-width:min(720px,92vw);margin-inline:auto;padding-block:40px 30vh}
.tt-body p{font-size:17px;line-height:1.9;color:var(--muted);margin:0 0 1.4em}
.tt-body h3{margin:1.6em 0 .4em}
.ttop{position:fixed;bottom:calc(24px + env(safe-area-inset-bottom));inset-inline-end:24px;width:56px;height:56px;border-radius:50%;border:0;background:var(--card);color:var(--ink);
  box-shadow:0 10px 30px rgba(0,0,0,.14);cursor:pointer;display:grid;place-items:center;z-index:60;opacity:0;translate:0 16px;pointer-events:none;font-size:18px}
.ttop.on{opacity:1;translate:0 0;pointer-events:auto}
.ttop svg{position:absolute;inset:-2px;width:calc(100% + 4px);height:calc(100% + 4px);transform:rotate(-90deg)}
.ttop circle{fill:none;stroke-width:3}
.ttop .trk{stroke:var(--line)}
.ttop .bar{stroke:var(--accent);stroke-linecap:round}
.ttop:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(max-width:767px){.ttop{width:46px;height:46px;bottom:calc(18px + env(safe-area-inset-bottom));inset-inline-end:16px}}`,
  html:`<div class="tt-body">
  <h3>למה רוב האתרים לא מביאים פניות</h3>
  <p>כי הם נבנו כדי להיראות טוב מול הבעלים, לא כדי לענות לגולש על השאלה היחידה שיש לו: האם אתם פותרים את הבעיה שלי, וכמה זה עולה.</p>
  <p>הגולש מגיע עם כוונה. הוא מחפש סימן שהוא במקום הנכון, ואז דרך קלה לפנות. כל מה שבדרך הוא רעש.</p>
  <h3>מה עושים אחרת</h3>
  <p>מתחילים מהשאלה, לא מהעיצוב. כותבים את המשפט הראשון כאילו הוא היחיד שייקרא. ואז בונים את העמוד סביבו.</p>
  <p>מודדים כל פנייה מהיום הראשון, ומשנים רק לפי מספרים. ככה עמוד משתפר במקום להתחלף כל שנתיים.</p>
  <h3>ומה זה דורש מכם</h3>
  <p>שיחה אחת של אפיון, תשובות כנות לשאלות לא נעימות, ושבועיים של סבלנות. זה הכל.</p>
  <p>בסוף יש עמוד שיודע להסביר את העסק בלעדיכם. וזה בדיוק העניין.</p>
</div>
<button class="ttop" aria-label="חזרה לראש העמוד"><svg viewBox="0 0 60 60" aria-hidden="true"><circle class="trk" cx="30" cy="30" r="27"/><circle class="bar" cx="30" cy="30" r="27" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>↑</button>`,
  js:`(function(){
  const btn=document.querySelector(".ttop"),bar=btn.querySelector(".bar");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // הטבעת מתמלאת לפי המסמך כולו, לא לפי הסקשן
  gsap.to(bar,{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:document.documentElement,start:"top top",end:"bottom bottom",scrub:reduce?false:.3}});
  ScrollTrigger.create({start:"top -80%",onToggle:s=>btn.classList.toggle("on",s.isActive)});   // מופיע אחרי מסך שלם
  btn.addEventListener("click",()=>gsap.to(window,{scrollTo:0,duration:reduce?0:.9,ease:"power3.inOut"}));
})();`
},
{
  id:"g79", cat:"gsap", name:"מוצר מוצמד עם קריאות שנדלקות בגלילה", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"תמונת מוצר או מסך נשארת במקום, ובזמן הגלילה נדלקות סביבה קריאות (callouts) אחת אחרי השנייה: נקודה, קו קצר ותיאור. סיור מודרך במוצר בלי לחיצות.",
  when:"עמוד מוצר, מערכת, אפליקציה, מכשיר. שלוש עד חמש קריאות, לא יותר.",
  note:"הקריאות ממוקמות באחוזים מהתמונה, לכן הן נצמדות לאותה נקודה בכל רוחב. במובייל אין מקום מסביב: התמונה נשארת מוצמדת למעלה, והקריאות הופכות לרשימה שנדלקת מתחתיה.",
  libs:["gsap","ScrollTrigger"],
  css:`.co{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:start;max-width:1100px;margin-inline:auto}
.co-pin{position:sticky;top:12vh;height:76vh;display:grid;place-items:center}
.co-fig{position:relative;width:min(100%,460px);aspect-ratio:4/5}
.co-fig .ph{position:absolute;inset:0;font-size:22px}
.co-dot{position:absolute;width:18px;height:18px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in srgb,var(--accent) 25%,transparent);translate:-50% -50%;opacity:0;scale:.6}
.co-steps{display:flex;flex-direction:column;gap:38vh;padding-block:30vh}
.co-step{opacity:.25;transition:opacity .4s}
.co-step.on{opacity:1}
.co-step b{display:block;font-size:13px;color:var(--accent);letter-spacing:.14em;margin-bottom:8px}
.co-step h3{margin:0 0 8px;font-size:clamp(20px,2.4vw,32px)}
.co-step p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
@media(max-width:767px){
  .co{grid-template-columns:1fr}
  .co-pin{top:0;height:46vh;background:var(--bg);z-index:2}
  .co-fig{width:min(70vw,300px)}
  .co-steps{gap:22vh;padding-block:6vh 20vh}
}`,
  html:`<div class="stage tight"><div class="co">
  <div class="co-pin"><div class="co-fig"><div class="ph ph-b">המוצר</div>
    <span class="co-dot" style="left:28%;top:22%"></span><span class="co-dot" style="left:70%;top:48%"></span><span class="co-dot" style="left:40%;top:78%"></span></div></div>
  <div class="co-steps">
    <div class="co-step"><b>01</b><h3>לוח בקרה אחד</h3><p>כל הלידים, ההצעות והתשלומים במסך אחד. בלי לעבור בין חמש מערכות.</p></div>
    <div class="co-step"><b>02</b><h3>התראות בזמן אמת</h3><p>פנייה חדשה מגיעה לוואטסאפ תוך שניות, עם כל הפרטים.</p></div>
    <div class="co-step"><b>03</b><h3>דוח שבועי אוטומטי</h3><p>כמה נכנס, כמה נסגר, ומה עדיין פתוח. כל יום ראשון בבוקר.</p></div>
  </div>
</div></div>`,
  js:`(function(){
  const steps=gsap.utils.toArray(".co-step"),dots=gsap.utils.toArray(".co-dot");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){steps.forEach(s=>s.classList.add("on"));gsap.set(dots,{opacity:1,scale:1});return;}
  steps.forEach((step,i)=>{
    ScrollTrigger.create({trigger:step,start:"top 60%",end:"bottom 40%",
      onToggle:s=>{step.classList.toggle("on",s.isActive);
        gsap.to(dots[i],{opacity:s.isActive?1:0,scale:s.isActive?1:.6,duration:.45,ease:"power3.out"});}});
  });
})();`
},
{
  id:"g80", cat:"gsap", name:"מכונת כתיבה עם סמן", tech:"GSAP · vanilla", status:"ממתין", runway:false,
  desc:"משפט שנכתב אות אחרי אות עם סמן מהבהב, מוחק את הסוף ומחליף אותו במילה אחרת. שלוש חלופות בלולאה.",
  when:"תת-כותרת בהירו שמציגה כמה קהלים או שירותים (\"אתרים ל: קליניקות / עורכי דין / חנויות\"). אחת לעמוד.",
  note:"בלי TextPlugin: טווין על מונה שלם וחיתוך מחרוזת, כך שאין תלות נוספת. הרוחב שמור מראש (המילה הארוכה ביותר שקופה מתחת) כדי שהשורה לא תקפוץ. reduced-motion: כל החלופות מוצגות בשורה עם פסיקים.",
  libs:["gsap"],
  css:`.tw{text-align:center;max-width:30ch;margin-inline:auto}
.tw h2{font-size:var(--fs-h2);line-height:1.2;margin:0}
.tw-slot{position:relative;display:inline-block;color:var(--accent);text-align:start}
.tw-ghost{visibility:hidden;white-space:nowrap}
.tw-live{position:absolute;inset-inline-start:0;top:0;white-space:nowrap}
.tw-car{display:inline-block;width:.08em;height:1em;background:currentColor;vertical-align:-.12em;margin-inline-start:.06em;animation:tw-blink 1s steps(1) infinite}
@keyframes tw-blink{50%{opacity:0}}
.tw-static{display:none}
@media (prefers-reduced-motion: reduce){.tw-slot,.tw-car{display:none}.tw-static{display:inline}}`,
  html:`<div class="stage"><div class="tw"><h2>אתרים שמביאים לקוחות ל<span class="tw-slot"><span class="tw-ghost">משרדי עורכי דין</span><span class="tw-live"></span></span><span class="tw-car"></span><span class="tw-static">קליניקות, משרדי עורכי דין, חנויות</span></h2></div></div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const live=document.querySelector(".tw-live"),words=["קליניקות","משרדי עורכי דין","חנויות","סטודיו"];
  const tl=gsap.timeline({repeat:-1});
  words.forEach(w=>{
    const o={n:0};
    tl.to(o,{n:w.length,duration:w.length*.07,ease:"none",onUpdate(){live.textContent=w.slice(0,Math.round(o.n));}})
      .to({},{duration:1.4})
      .to(o,{n:0,duration:w.length*.035,ease:"none",onUpdate(){live.textContent=w.slice(0,Math.round(o.n));}})
      .to({},{duration:.3});
  });
})();`
},
{
  id:"g81", cat:"gsap", name:"פרלקס עכבר בהירו", tech:"GSAP · quickTo", status:"ממתין", runway:false,
  desc:"שכבות ההירו (רקע, תמונה, כותרת, תג צף) זזות בעדינות בכיוון הסמן, כל אחת בעומק אחר. תחושת תלת-ממד בלי שום ספרייה תלת-ממדית.",
  when:"הירו עם ויז'ואל מרכזי: מוצר, אפליקציה, דמות. דסקטופ בלבד. במובייל השכבות עומדות, או זזות מעט עם הגלילה.",
  note:"quickTo לכל שכבה עם עומק ב-data-depth, כך שהוספת שכבה היא אטריביוט. התזוזה מוגבלת ל-24px כדי שהטקסט לא יזוז מספיק כדי להפריע לקריאה. במגע: אין mousemove, ולכן במקום זה תזוזה קטנה לפי גלילה.",
  libs:["gsap","ScrollTrigger"],
  css:`.mp{position:relative;min-height:min(80vh,720px);display:grid;place-items:center;overflow:hidden;border-radius:var(--r);background:var(--ink);color:var(--bg)}
.mp-l{position:absolute;will-change:transform}
.mp-bg{inset:-8%;background:radial-gradient(circle at 60% 40%,color-mix(in srgb,var(--accent) 45%,transparent),transparent 60%)}
.mp-card{width:min(46vw,420px);aspect-ratio:4/3;inset-inline-start:12%;top:22%}
.mp-card .ph{width:100%;height:100%;font-size:22px;box-shadow:0 40px 80px rgba(0,0,0,.35)}
.mp-tag{inset-inline-end:16%;top:20%;background:var(--card);color:var(--ink);padding:10px 16px;border-radius:12px;font-size:14px;font-weight:600;box-shadow:0 14px 40px rgba(0,0,0,.3)}
.mp-tag.b{top:auto;bottom:20%;inset-inline-end:10%}
.mp-copy{position:relative;z-index:2;text-align:center;max-width:26ch;padding-inline:24px}
.mp-copy h2{margin:0 0 10px;font-size:var(--fs-h2)}
.mp-copy p{margin:0;opacity:.8}
@media(max-width:767px){.mp-card{width:64vw;top:8%}.mp-tag{font-size:12px}}`,
  html:`<div class="stage tight"><div class="mp">
  <div class="mp-l mp-bg" data-depth=".3"></div>
  <div class="mp-l mp-card" data-depth="1"><div class="ph ph-b">ויז'ואל</div></div>
  <div class="mp-l mp-tag" data-depth="1.8">+38% פניות</div>
  <div class="mp-l mp-tag b" data-depth="1.4">זמן טעינה 0.9s</div>
  <div class="mp-copy"><h2>המערכת שעובדת בשבילכם</h2><p>הזז את הסמן</p></div>
</div></div>`,
  js:`(function(){
  const layers=gsap.utils.toArray(".mp-l"),zone=document.querySelector(".mp"),MAX=24;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    const movers=layers.map(l=>({d:+l.dataset.depth||1,x:gsap.quickTo(l,"x",{duration:.6,ease:"power3.out"}),y:gsap.quickTo(l,"y",{duration:.6,ease:"power3.out"})}));
    zone.addEventListener("mousemove",e=>{const r=zone.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
      movers.forEach(m=>{m.x(-nx*MAX*m.d);m.y(-ny*MAX*m.d);});});
    zone.addEventListener("mouseleave",()=>movers.forEach(m=>{m.x(0);m.y(0);}));
  }else{
    // מגע: אותו עומק, מונע מגלילה במקום מסמן
    layers.forEach(l=>gsap.fromTo(l,{y:20*(+l.dataset.depth||1)},{y:-20*(+l.dataset.depth||1),ease:"none",scrollTrigger:{trigger:zone,start:"top bottom",end:"bottom top",scrub:.5}}));
  }
})();`
},
{
  id:"g82", cat:"gsap", name:"הטיה לפי מהירות הגלילה", tech:"GSAP · ScrollTrigger velocity", status:"ממתין",
  desc:"כרטיסים או תמונות שנוטים קלות בכיוון הגלילה ככל שגוללים מהר, ומתיישרים ברגע שעוצרים. העמוד מרגיש שיש לו משקל.",
  when:"גריד עבודות, רשימת מוצרים, פיד תמונות. כל מה שגוללים דרכו מהר. לא על טקסט רץ.",
  note:"getVelocity של ScrollTrigger נדגם בכל אירוע גלילה וממופה ל-skewY של עד 6 מעלות, עם quickTo שמחזיר לאפס. במובייל הגלילה מהירה יותר ולכן המקסימום יורד ל-3 מעלות.",
  libs:["gsap","ScrollTrigger"],
  css:`.sk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-block:10vh 30vh}
.sk-it{aspect-ratio:3/4;border-radius:var(--r);overflow:hidden;will-change:transform}
.sk-it .ph{width:100%;height:100%;font-size:22px}
@media(max-width:767px){.sk-grid{grid-template-columns:1fr 1fr}}`,
  html:`<div class="stage tight"><div class="sk-grid">
  <div class="sk-it"><div class="ph ph-a">1</div></div><div class="sk-it"><div class="ph ph-b">2</div></div><div class="sk-it"><div class="ph ph-c">3</div></div>
  <div class="sk-it"><div class="ph ph-d">4</div></div><div class="sk-it"><div class="ph ph-e">5</div></div><div class="sk-it"><div class="ph ph-a">6</div></div>
  <div class="sk-it"><div class="ph ph-b">7</div></div><div class="sk-it"><div class="ph ph-c">8</div></div><div class="sk-it"><div class="ph ph-d">9</div></div>
</div></div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const items=gsap.utils.toArray(".sk-it"),MAX=matchMedia("(max-width:767px)").matches?3:6;
  const skew=gsap.quickTo(items,"skewY",{duration:.5,ease:"power3.out"});
  const clamp=gsap.utils.clamp(-MAX,MAX);
  ScrollTrigger.create({onUpdate:s=>{ skew(clamp(s.getVelocity()/-300)); }});
  // כשהגלילה נעצרת אין onUpdate, ולכן מחזירים לאפס דרך טיימר קצר
  let t; addEventListener("scroll",()=>{clearTimeout(t);t=setTimeout(()=>skew(0),120);},{passive:true});
})();`
},
{
  id:"g83", cat:"gsap", name:"תג טקסט מעגלי שמסתובב", tech:"GSAP · timeline", status:"ממתין", runway:false,
  desc:"טקסט שרץ על מעגל סביב חץ או לוגו, מסתובב לאט כל הזמן ומאיץ עם הגלילה. תג של סטודיו, \"גלול למטה\", \"פתוח להצעות\".",
  when:"פינת הירו, ליד CTA, תג \"זמין לפרויקטים\". אחד לעמוד, 90 עד 140 פיקסלים.",
  note:"בלי SVG textPath: כרום לא מסדר טקסט RTL על מסלול (נמדד: הטקסט לא צויר כלל), ולכן כל תו מוצב בנפרד סביב המרכז, נגד כיוון השעון כדי שייקרא נכון. הסיבוב הבסיסי הוא טיימליין אינסופי, והגלילה מוסיפה עליו timeScale זמני. במובייל: אותו דבר, קטן יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.rb-wrap{display:flex;justify-content:center;align-items:center;gap:clamp(30px,6vw,80px);flex-wrap:wrap;padding-block:40px}
.rb{position:relative;width:clamp(96px,14vw,140px);aspect-ratio:1}
.rb-ring{position:absolute;inset:0;will-change:transform}
.rb-ring span{position:absolute;left:50%;top:0;height:50%;translate:-50% 0;transform-origin:50% 100%;font-size:clamp(11px,1.3vw,14px);font-weight:700;color:var(--ink);line-height:1}
.rb-core{position:absolute;inset:50%;translate:-50% -50%;width:38%;aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font-size:20px}
.rb-copy{max-width:30ch}
.rb-copy h2{margin:0 0 8px;font-size:var(--fs-h2)}
.rb-copy p{margin:0;color:var(--muted)}`,
  html:`<div class="stage tight"><div class="rb-wrap">
  <div class="rb" aria-label="גלול למטה"><div class="rb-ring" data-text="גלול למטה · גלול למטה · גלול למטה · " aria-hidden="true"></div><span class="rb-core">↓</span></div>
  <div class="rb-copy"><h2>פתוחים לפרויקטים חדשים</h2><p>שני מקומות פנויים לרבעון הקרוב.</p></div>
</div></div>`,
  js:`(function(){
  // בלי SVG textPath: כרום לא מסדר טקסט RTL על מסלול, ולכן כל תו מוצב בנפרד סביב המרכז.
  // עברית נקראת מימין לשמאל, ולכן התווים מתקדמים נגד כיוון השעון (זווית יורדת) כדי שיקראו נכון בראש העיגול.
  const ring=document.querySelector(".rb-ring"),chars=[...ring.dataset.text],step=360/chars.length;
  chars.forEach((ch,i)=>{const s=document.createElement("span");s.textContent=ch===" "?" ":ch;s.style.transform="rotate("+(-i*step)+"deg)";ring.appendChild(s);});
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const spin=gsap.to(ring,{rotate:-360,duration:14,ease:"none",repeat:-1});
  // גלילה מאיצה זמנית: מהירות הגלילה ממופה ל-timeScale וחוזרת ל-1
  ScrollTrigger.create({onUpdate:s=>{gsap.to(spin,{timeScale:1+Math.min(4,Math.abs(s.getVelocity())/400),duration:.2,overwrite:true,onComplete(){gsap.to(spin,{timeScale:1,duration:1.2});}});}});
})();`
},
{
  id:"g84", cat:"gsap", name:"סקשן יוצא מפוקוס כשהבא נכנס", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"בזמן שהסקשן הבא עולה מלמטה, הקודם מתכווץ מעט, מתטשטש ומתכהה, כאילו הוא נשאר מאחור. מעבר עמוק בין פרקים בלי מסכות.",
  when:"בין פרקי סיפור באתר תדמית פרימיום: הירו לערכים, ערכים לעבודות. שניים עד ארבעה מעברים בעמוד.",
  note:"הסקשן היוצא sticky וה-scale/blur/brightness שלו סקראב מול כניסת הבא. blur יקר בטלפון, ולכן במובייל יש רק scale ו-brightness. פינות מתעגלות בזמן ההתכווצות, זה מה שנותן את תחושת הכרטיס.",
  libs:["gsap","ScrollTrigger"],
  css:`.df{position:relative}
.df-sec{position:sticky;top:0;min-height:100vh;display:grid;place-items:center;padding:var(--sec) var(--gutter);text-align:center;transform-origin:50% 40%;overflow:hidden}
.df-sec:nth-child(1){background:var(--card);z-index:1}
.df-sec:nth-child(2){background:var(--accent);color:var(--accent-ink);z-index:2}
.df-sec:nth-child(3){background:var(--ink);color:var(--bg);z-index:3}
.df-sec h2{margin:0 0 12px;font-size:var(--fs-h2);max-width:20ch}
.df-sec p{margin:0;max-width:44ch;opacity:.8;line-height:1.7}`,
  html:`<div class="df">
  <section class="df-sec"><div><h2>מתחילים מהשאלה של הלקוח</h2><p>לא מהצבעים ולא מהלוגו. מה הוא מחפש, ומה עוצר אותו מלפנות.</p></div></section>
  <section class="df-sec"><div><h2>כותבים משפט אחד שמוכר</h2><p>ואז בונים סביבו את כל העמוד, מלמעלה למטה.</p></div></section>
  <section class="df-sec"><div><h2>מודדים, ורק אז משנים</h2><p>כל פנייה נספרת. כל שינוי נבחן מול מספר.</p></div></section>
</div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const secs=gsap.utils.toArray(".df-sec"),mob=matchMedia("(max-width:767px)").matches;
  secs.slice(0,-1).forEach((sec,i)=>{
    gsap.to(sec,{scale:.92,borderRadius:28,filter:mob?"brightness(.55)":"blur(6px) brightness(.55)",ease:"none",
      scrollTrigger:{trigger:secs[i+1],start:"top bottom",end:"top top",scrub:.4}});
  });
})();`
},
{
  id:"g85", cat:"gsap", name:"זרקור על כרטיסים אחרי הסמן", tech:"GSAP · quickSetter", status:"ממתין", runway:false,
  desc:"גריד כרטיסים כהה שמסגרת של כל כרטיס נדלקת בעדינות היכן שהסמן קרוב, וזרקור רך זז בתוך הכרטיס. אפקט של פאנל טכנולוגי.",
  when:"גריד פיצ'רים או יתרונות באתרי SaaS ומערכות, על רקע כהה. דסקטופ: זרקור. מגע: מסגרת קבועה עדינה.",
  note:"מיקום הסמן נכתב למשתני CSS על כל כרטיס (quickSetter, בלי טווין) והגרדיאנט מחושב ב-CSS. מסכת המסגרת עשויה משני רקעים עם mask, טריק שחוסך אלמנט נוסף. במגע: gradient קבוע במרכז.",
  libs:["gsap"],
  css:`.sp{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:clamp(20px,3vw,40px);border-radius:var(--r);background:var(--ink);color:var(--bg)}
.sp-card{--mx:50%;--my:50%;position:relative;border-radius:16px;padding:26px 22px;background:color-mix(in srgb,var(--bg) 6%,transparent);overflow:hidden;isolation:isolate}
.sp-card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(220px circle at var(--mx) var(--my),color-mix(in srgb,var(--accent) 90%,#fff),transparent 70%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;opacity:.5;pointer-events:none}
.sp-card::after{content:"";position:absolute;inset:0;background:radial-gradient(300px circle at var(--mx) var(--my),color-mix(in srgb,var(--accent) 18%,transparent),transparent 60%);opacity:0;transition:opacity .4s;pointer-events:none;z-index:-1}
@media (hover:hover) and (pointer:fine){.sp:hover .sp-card::after{opacity:1}}
.sp-card b{display:block;font-size:13px;color:color-mix(in srgb,var(--accent) 45%,var(--bg));letter-spacing:.12em;margin-bottom:10px}
.sp-card h3{margin:0 0 8px;font-size:19px}
.sp-card p{margin:0;font-size:14.5px;line-height:1.65;opacity:.75}
@media(max-width:767px){.sp{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="sp">
  <div class="sp-card"><b>01</b><h3>סנכרון בזמן אמת</h3><p>כל שינוי מופיע אצל כולם בו-זמנית, בלי רענון.</p></div>
  <div class="sp-card"><b>02</b><h3>הרשאות לפי תפקיד</h3><p>כל אחד רואה רק את מה שהוא צריך.</p></div>
  <div class="sp-card"><b>03</b><h3>גיבוי יומי</h3><p>שלושה עותקים, שני אזורים, אפס דאגה.</p></div>
  <div class="sp-card"><b>04</b><h3>ממשק API פתוח</h3><p>מתחבר לכל מה שכבר יש לכם.</p></div>
  <div class="sp-card"><b>05</b><h3>תמיכה בעברית</h3><p>אנשים, לא בוטים. בשעות העבודה שלכם.</p></div>
  <div class="sp-card"><b>06</b><h3>ללא התחייבות</h3><p>חודש בחודשו. עוזבים מתי שרוצים.</p></div>
</div></div>`,
  js:`(function(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  const grid=document.querySelector(".sp"),cards=gsap.utils.toArray(".sp-card");
  const setters=cards.map(c=>({el:c,x:gsap.quickSetter(c,"--mx","px"),y:gsap.quickSetter(c,"--my","px")}));
  grid.addEventListener("mousemove",e=>{
    setters.forEach(s=>{const r=s.el.getBoundingClientRect();s.x(e.clientX-r.left);s.y(e.clientY-r.top);});
  });
})();`
},
{
  id:"g86", cat:"gsap", name:"אייקוני קו שמציירים את עצמם בכניסה", tech:"GSAP · DrawSVG", status:"ממתין",
  desc:"אייקוני קו בסקשן היתרונות נכנסים כשהקו מצייר את עצמו מהתחלה לסוף, בסטאגר, והטקסט עולה מתחתיו. במקום אייקון שקופץ, אייקון שנולד.",
  when:"סקשן יתרונות, שלבים, שירותים, כל מקום עם אייקוני קו. שלושה עד שישה.",
  note:"DrawSVG עובד על stroke בלבד, לכן האייקונים חייבים להיות קו (stroke) ולא מילוי. הסטאגר 0.15 שניות, מספיק כדי לראות סדר ולא מספיק כדי לחכות. במובייל האייקונים נכנסים אחד-אחד כי הם בעמודה.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.ic{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);max-width:1000px;margin-inline:auto}
.ic-it{text-align:center;padding:26px 18px}
.ic-it svg{width:64px;height:64px;fill:none;stroke:var(--accent);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;margin-bottom:16px}
.ic-it h3{margin:0 0 6px;font-size:19px}
.ic-it p{margin:0;color:var(--muted);font-size:15px;line-height:1.6}
@media(max-width:767px){.ic{grid-template-columns:1fr}}`,
  html:`<div class="stage"><div class="ic">
  <div class="ic-it"><svg viewBox="0 0 48 48"><path d="M8 34l10-10 8 8 14-16"/><path d="M30 16h10v10"/></svg><h3>תוצאות שנמדדות</h3><p>כל פנייה נספרת מהיום הראשון.</p></div>
  <div class="ic-it"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/></svg><h3>עולה תוך שבועיים</h3><p>אפיון, עיצוב, בנייה. בלי סחבת.</p></div>
  <div class="ic-it"><svg viewBox="0 0 48 48"><path d="M24 6l14 6v10c0 9-6 16-14 20-8-4-14-11-14-20V12z"/><path d="M17 24l5 5 9-10"/></svg><h3>מאובטח ומגובה</h3><p>SSL, גיבוי יומי, ועדכונים שוטפים.</p></div>
</div></div>`,
  js:`(function(){
  const items=gsap.utils.toArray(".ic-it");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  gsap.set(".ic-it svg path, .ic-it svg circle",{drawSVG:"0%"});
  gsap.set(".ic-it h3, .ic-it p",{opacity:0,y:14});
  ScrollTrigger.batch(items,{start:"top 80%",once:true,onEnter:batch=>{
    const tl=gsap.timeline();
    batch.forEach((it,i)=>{
      tl.to(it.querySelectorAll("svg path, svg circle"),{drawSVG:"100%",duration:.9,ease:"power2.inOut",stagger:.15},i*.15)
        .to(it.querySelectorAll("h3, p"),{opacity:1,y:0,duration:.5,ease:"power3.out",stagger:.08},i*.15+.5);
    });
  }});
})();`
},
{
  id:"g87", cat:"gsap", name:"מחיקת צבע שחושפת טקסט", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"פס צבע עובר על השורה מימין לשמאל, ומאחוריו הטקסט כבר שם. כמו מברשת שמגלה במקום מכסה. שורה אחרי שורה.",
  when:"כותרות סקשן, ציטוטים, שלוש נקודות חשובות. כניסה עם אופי בלי לשבור את הפריסה.",
  note:"הפס הוא פסאודו-אלמנט שנע מ-0 ל-100% ואז יוצא, והטקסט מתחתיו עובר משקוף לגלוי בדיוק כשהפס מכסה אותו. הכל transform ו-opacity. במובייל השורות קצרות יותר ולכן המהירות זהה אבל המרחק קטן, ההרגשה נשמרת.",
  libs:["gsap","ScrollTrigger"],
  css:`.wp{max-width:min(760px,92vw);margin-inline:auto;display:grid;gap:clamp(18px,3vw,34px)}
.wp-line{position:relative;display:inline-block;overflow:hidden;font-size:clamp(24px,3.4vw,50px);font-weight:800;line-height:1.2;padding:.08em .1em;justify-self:start}
.wp-line span{opacity:0;display:inline-block}
.wp-line i{position:absolute;inset:0;background:var(--accent);transform-origin:100% 50%;transform:scaleX(0)}
.wp-line.muted{font-size:clamp(17px,1.6vw,22px);font-weight:500;color:var(--muted)}`,
  html:`<div class="stage"><div class="wp">
  <div class="wp-line"><span>אתר שנבנה סביב פעולה אחת.</span><i></i></div>
  <div class="wp-line"><span>קופי שעונה לפני ששואלים.</span><i></i></div>
  <div class="wp-line"><span>מספרים במקום תחושות.</span><i></i></div>
  <div class="wp-line muted"><span>זה כל מה שאנחנו עושים, ואת זה אנחנו עושים טוב.</span><i></i></div>
</div></div>`,
  js:`(function(){
  const lines=gsap.utils.toArray(".wp-line");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".wp-line span",{opacity:1});return;}
  ScrollTrigger.batch(lines,{start:"top 85%",once:true,onEnter:batch=>{
    batch.forEach((line,i)=>{
      const bar=line.querySelector("i"),txt=line.querySelector("span");
      gsap.timeline({delay:i*.18})
        .to(bar,{scaleX:1,duration:.45,ease:"power3.inOut"})          // הפס נכנס מימין ומכסה
        .set(txt,{opacity:1})                                           // הטקסט מופיע מאחורי הפס
        .set(bar,{transformOrigin:"0% 50%"})
        .to(bar,{scaleX:0,duration:.5,ease:"power3.inOut"});           // הפס יוצא שמאלה וחושף
    });
  }});
})();`
},
{
  id:"g88", cat:"gsap", name:"מילה שמתחלפת בהירו בלולאה", tech:"GSAP · timeline", status:"ממתין", runway:false,
  desc:"משפט הירו קבוע ומילה אחת בו מתחלפת כל שתי שניות: יוצאת למעלה, הבאה נכנסת מלמטה, והרוחב של השורה מתכוונן חלק. ארבע חלופות בלולאה.",
  when:"הירו של עסק שפונה לכמה קהלים או מציע כמה שירותים. אחת לעמוד, ותמיד עם מילה ראשונה שעומדת לבד אם JS לא נטען.",
  note:"כל החלופות במארקאפ (SEO וגיבוי), רק הראשונה גלויה בלי JS. הרוחב מונפש דרך משתנה CSS ולא דרך width ישיר, כדי שהשורה לא תקפוץ. reduced-motion: החלופות מתחלפות בלי תנועה, פעם ב-3 שניות.",
  libs:["gsap"],
  css:`.rw{text-align:center;max-width:36ch;margin-inline:auto}
.rw-keep{white-space:nowrap}
.rw h2{font-size:var(--fs-h2);line-height:1.25;margin:0}
.rw-slot{display:inline-grid;vertical-align:bottom;text-align:start;overflow:hidden;color:var(--accent);height:1.25em;width:var(--w,auto);transition:/* qa-allow: layout, רוחב המילה משתנה בהגדרה, scaleX היה מעוות את האותיות */width .5s cubic-bezier(.2,.6,.2,1)}
.rw-slot span{grid-area:1/1;white-space:nowrap;opacity:0;translate:0 100%}
.rw-slot span:first-child{opacity:1;translate:0 0}
@media (prefers-reduced-motion: reduce){.rw-slot{transition:none}}`,
  html:`<div class="stage"><div class="rw"><h2>אנחנו בונים אתרים <span class="rw-keep">ל<span class="rw-slot"><span>קליניקות</span><span>משרדי עורכי דין</span><span>חנויות אונליין</span><span>סטודיו לעיצוב</span></span></span><br>שמביאים פניות, לא רק מחמאות.</h2></div></div>`,
  js:`(function(){
  const slot=document.querySelector(".rw-slot"),words=gsap.utils.toArray(".rw-slot span");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const widths=words.map(w=>w.getBoundingClientRect().width);
  slot.style.setProperty("--w",widths[0]+"px");
  let i=0;
  function next(){
    const cur=words[i],nx=words[(i+1)%words.length];i=(i+1)%words.length;
    slot.style.setProperty("--w",widths[i]+"px");
    if(reduce){gsap.set(cur,{opacity:0});gsap.set(nx,{opacity:1,translate:"0 0"});return;}
    gsap.timeline()
      .to(cur,{translate:"0 -100%",opacity:0,duration:.5,ease:"power3.in"},0)
      .fromTo(nx,{translate:"0 100%",opacity:0},{translate:"0 0",opacity:1,duration:.55,ease:"power3.out"},.25);
  }
  setTimeout(next,900); setInterval(next,reduce?3000:2200);   // החלפה ראשונה מהר, אחר כך בקצב קריאה
  addEventListener("resize",()=>{words.forEach((w,k)=>widths[k]=w.getBoundingClientRect().width);slot.style.setProperty("--w",widths[i]+"px");});
})();`
},
];
