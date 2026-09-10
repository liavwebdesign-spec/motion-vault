// GSAP גל 22 (9.9.2026): עוד 10 מהלכי גלילה מיוחדים. אותו סינון כמו גלים 20 ו-21:
// scrub או pin, רעיון שלא קיים ב-83 מהלכי הגלילה במאגר, רב-שימושי, מובייל מוגדר בכל אחד.
export default [
{
  id:"g109", cat:"gsap", name:"כותרת שמתפרקת לעומקים", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"מילות הכותרת נראות שורה רגילה, אבל בגלילה כל מילה נעה בקצב אחר, כאילו היא יושבת בעומק אחר. פרלקס בתוך משפט אחד.",
  when:"כותרת הירו או כותרת סקשן דרמטית באתרי סטודיו ואופנה. אחת לעמוד, ארבע עד שבע מילים.",
  note:"כל מילה מקבלת data-depth, וה-y שלה בסקראב הוא מכפלה של העומק, כך שהמילים נפרדות ומתאחדות סביב אמצע המסך. בלי pin, זול. במובייל העומק מוכפל ב-0.4 כדי שהשורות לא יתנגשו.",
  libs:["gsap","ScrollTrigger"],
  css:`.dp{min-height:120vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.dp h2{font-size:clamp(34px,7vw,110px);line-height:1.1;margin:0;text-align:center;font-weight:900;max-width:14ch}
.dp .w{display:inline-block;margin-inline:.14em;will-change:transform}
.dp .w.ac{color:var(--accent)}`,
  html:`<div class="dp"><h2><span class="w" data-depth="1.4">אתרים</span> <span class="w" data-depth="-.8">שנבנים</span> <span class="w ac" data-depth="2">סביב</span> <span class="w" data-depth="-1.6">פעולה</span> <span class="w" data-depth=".6">אחת</span></h2></div>`,
  js:`(function(){
  const words=gsap.utils.toArray(".dp .w");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const k=matchMedia("(max-width:767px)").matches?24:60;
  words.forEach(w=>{const d=+w.dataset.depth||1;
    // מ-y חיובי ל-y שלילי דרך אפס באמצע הסקשן: המילים נפגשות לשורה אחת בדיוק כשהכותרת במרכז
    gsap.fromTo(w,{y:d*k*1.6},{y:-d*k*1.6,ease:"none",scrollTrigger:{trigger:".dp",start:"top bottom",end:"bottom top",scrub:.5}});
  });
})();`
},
{
  id:"g110", cat:"gsap", name:"טקסט שנכתב עם הגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"פסקה שמופיעה אות אחרי אות בקצב הגלילה, עם סמן שמסמן איפה הכתיבה נמצאת. גוללים לאט, קוראים לאט. חוזרים למעלה, הטקסט נמחק.",
  when:"משפט מפתח או פסקת מניפסט שרוצים שייקראו עד הסוף. עד 220 תווים, פעם אחת בעמוד.",
  note:"האותיות מפוצלות ל-span (בעברית בלי ניקוד זה בטוח: אין ליגטורות), ורק opacity משתנה, לכן אין reflow. הסמן הוא span שקופץ אחרי האות האחרונה הגלויה. במובייל אותו דבר עם פונט קטן יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.tw2{position:relative;height:220vh}
.tw2-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.tw2 p{max-width:30ch;margin:0;font-size:clamp(24px,3.2vw,46px);font-weight:600;line-height:1.5;text-align:center}
.tw2 p span{opacity:.12}
.tw2 p span.on{opacity:1}
.tw2 p i{display:inline-block;width:.08em;height:1em;background:var(--accent);vertical-align:-.15em;margin-inline-start:.04em;animation:tw2-b 1s steps(1) infinite}
@keyframes tw2-b{50%{opacity:0}}
@media (prefers-reduced-motion: reduce){.tw2 p span{opacity:1}.tw2 p i{display:none}}`,
  html:`<div class="tw2"><div class="tw2-pin"><p data-text="אנחנו לא מוכרים אתר. אנחנו מוכרים את הרגע שבו מישהו קורא, מבין, ומרים טלפון."></p></div></div>`,
  js:`(function(){
  const p=document.querySelector(".tw2 p"),text=p.dataset.text;
  const spans=[...text].map(ch=>{const s=document.createElement("span");s.textContent=ch;p.appendChild(s);return s;});
  const car=document.createElement("i");p.appendChild(car);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const o={n:0};
  gsap.to(o,{n:spans.length,ease:"none",scrollTrigger:{trigger:".tw2",start:"top top",end:"bottom bottom",scrub:.4},
    onUpdate(){const k=Math.round(o.n);spans.forEach((s,i)=>s.classList.toggle("on",i<k));
      // הסמן זז אחרי האות האחרונה הגלויה
      const last=spans[Math.max(0,k-1)];if(k>0)last.after(car);else p.prepend(car);}});
})();`
},
{
  id:"g111", cat:"gsap", name:"מסך טלפון מוצמד עם מסכים שמתחלפים", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"מסגרת טלפון נשארת במקום, ובזמן שהטקסט גולל לצידה המסכים בתוכה מתחלפים: כל פיצ'ר מקבל מסך משלו שנכנס מלמטה. עמוד אפליקציה קלאסי.",
  when:"אפליקציה, מערכת, כל מוצר עם מסכים. שלושה עד חמישה פיצ'רים.",
  note:"המסכים ערומים בתוך המסגרת ומוזזים ב-yPercent, כך שאין reflow. במובייל הטלפון מוצמד למעלה בגובה 46vh והטקסט גולל מתחת, כמו בשאר מהלכי הצמדה במאגר.",
  libs:["gsap","ScrollTrigger"],
  css:`.pm{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:start;max-width:1000px;margin-inline:auto}
.pm-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
.pm-phone{position:relative;width:min(280px,64vw);aspect-ratio:9/19;border-radius:38px;background:var(--ink);padding:12px;box-shadow:0 40px 80px rgba(0,0,0,.25)}
.pm-phone::before{content:"";position:absolute;top:22px;left:50%;translate:-50% 0;width:34%;height:22px;border-radius:12px;background:var(--ink);z-index:3}
.pm-screen{position:relative;width:100%;height:100%;border-radius:28px;overflow:hidden;background:var(--card)}
.pm-s{position:absolute;inset:0;padding:54px 18px 18px;display:grid;align-content:start;gap:12px;background:var(--card)}
.pm-s i{display:block;border-radius:10px;background:var(--bg);border:1px solid var(--line);height:16px}
.pm-s i.big{height:120px;background:var(--accent);border:0;opacity:.85}
.pm-s i.mid{height:64px}
.pm-s b{font-size:15px;color:var(--ink)}
.pm-steps{display:flex;flex-direction:column;gap:44vh;padding-block:36vh}
.pm-step{opacity:.3;transition:opacity .4s}
.pm-step.on{opacity:1}
.pm-step b{display:block;font-size:12px;color:var(--accent);letter-spacing:.14em;margin-bottom:8px}
.pm-step h3{margin:0 0 8px;font-size:clamp(22px,2.6vw,36px)}
.pm-step p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
@media(max-width:767px){.pm{grid-template-columns:1fr}.pm-pin{height:46vh;top:0;z-index:2;background:var(--bg)}.pm-phone{width:min(40vw,190px)}.pm-steps{gap:26vh;padding-block:6vh 30vh}}`,
  html:`<div class="stage tight"><div class="pm">
  <div class="pm-pin"><div class="pm-phone"><div class="pm-screen">
    <div class="pm-s"><b>היום</b><i class="big"></i><i></i><i></i><i class="mid"></i></div>
    <div class="pm-s"><b>לידים</b><i class="mid"></i><i class="mid"></i><i class="mid"></i><i></i></div>
    <div class="pm-s"><b>דוחות</b><i></i><i class="big"></i><i></i><i></i><i></i></div>
  </div></div></div>
  <div class="pm-steps">
    <div class="pm-step"><b>01</b><h3>מסך הבית</h3><p>מה קרה היום, במבט אחד. בלי לחפור.</p></div>
    <div class="pm-step"><b>02</b><h3>לידים בזמן אמת</h3><p>כל פנייה נכנסת לרשימה עם מקור, שעה ומי מטפל.</p></div>
    <div class="pm-step"><b>03</b><h3>דוח שבועי</h3><p>כמה נכנס, כמה נסגר, ומה פתוח. נשלח לבד.</p></div>
  </div>
</div></div>`,
  js:`(function(){
  const screens=gsap.utils.toArray(".pm-s"),steps=gsap.utils.toArray(".pm-step"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  screens.forEach((s,i)=>gsap.set(s,{yPercent:i?100:0}));
  let cur=0;
  function go(k){if(k===cur)return;const dir=k>cur?1:-1,prev=cur;cur=k;
    steps.forEach((s,i)=>s.classList.toggle("on",i===k));
    if(reduce){gsap.set(screens[prev],{yPercent:100});gsap.set(screens[k],{yPercent:0});return;}
    gsap.to(screens[prev],{yPercent:-100*dir,duration:.6,ease:"power3.inOut"});
    gsap.fromTo(screens[k],{yPercent:100*dir},{yPercent:0,duration:.6,ease:"power3.inOut"});}
  steps[0].classList.add("on");
  steps.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 60%",end:"bottom 40%",onEnter:()=>go(i),onEnterBack:()=>go(i)}));
})();`
},
{
  id:"g112", cat:"gsap", name:"מפלס שעולה: מילוי גלי בגלילה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"מכל עגול שמתמלא בנוזל ככל שגוללים, עם גל שמתנדנד על פני השטח ומספר שעולה יחד עם המפלס. יעד, אחוז השלמה, שביעות רצון.",
  when:"נתון אחד שהוא אחוז: שביעות רצון, יעד גיוס, אחוז לקוחות חוזרים. אחד לסקשן.",
  note:"הגל הוא path ב-SVG שרוחבו כפול מהמכל ונע אופקית בלולאה (CSS keyframes), והגובה שלו הוא y בסקראב. המספר מתעדכן מאותו progress. במובייל המכל קטן ל-60vw.",
  libs:["gsap","ScrollTrigger"],
  css:`.lq-wrap{display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,5vw,80px);align-items:center;max-width:900px;margin-inline:auto;padding-block:20vh 30vh}
.lq{position:relative;width:min(300px,60vw);aspect-ratio:1;border-radius:50%;background:var(--card);border:1px solid var(--line);overflow:hidden;box-shadow:inset 0 0 0 10px var(--bg)}
.lq svg{position:absolute;left:0;top:0;width:200%;height:100%;will-change:transform;animation:lq-drift 5s linear infinite}
.lq path{fill:var(--accent);opacity:.9}
.lq-num{position:absolute;inset:0;display:flex;direction:ltr;align-items:center;justify-content:center;gap:.04em;font-size:clamp(44px,7vw,84px);font-weight:900;color:var(--ink);font-variant-numeric:tabular-nums;text-shadow:0 1px 0 var(--card)}
.lq-num small{font-size:.5em;font-weight:800}
@keyframes lq-drift{to{transform:translateX(-50%)}}
.lq-txt h2{margin:0 0 10px;font-size:var(--fs-h2)}
.lq-txt p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
@media(max-width:767px){.lq-wrap{grid-template-columns:1fr;justify-items:center;text-align:center}}
@media (prefers-reduced-motion: reduce){.lq svg{animation:none}}`,
  html:`<div class="stage"><div class="lq-wrap">
  <div class="lq" role="img" aria-label="94 אחוז שביעות רצון">
    <svg viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><g class="lq-wave"><path d="M0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40 V 400 H 0 Z"/></g></svg>
    <div class="lq-num"><span class="lq-val">0</span><small>%</small></div>
  </div>
  <div class="lq-txt"><h2>94% מהלקוחות חוזרים</h2><p>לא כי הם חייבים. כי כשמשהו עובד, ממשיכים איתו.</p></div>
</div></div>`,
  js:`(function(){
  const wave=document.querySelector(".lq-wave"),val=document.querySelector(".lq-val"),TARGET=94;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const o={p:0};
  // המפלס: הגל יושב ב-y=40 מתוך 200 בגובה ה-SVG, ולכן 0% = הזזה של 200 למטה ו-100% = 0
  gsap.set(wave,{y:200});
  gsap.to(o,{p:1,ease:"none",scrollTrigger:{trigger:".lq",start:"top 85%",end:"top 25%",scrub:reduce?false:.5},
    onUpdate(){const lvl=o.p*TARGET/100;gsap.set(wave,{y:200-lvl*200});val.textContent=Math.round(o.p*TARGET);}});
})();`
},
{
  id:"g115", cat:"gsap", name:"מחשב נייד שנפתח בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"מחשב נייד סגור שהמכסה שלו נפתח ככל שגוללים, והמסך נדלק ומראה את המוצר. המחשב מתרומם קלות לזווית צפייה.",
  when:"מערכת, SaaS, דשבורד, כל מוצר שחי במסך גדול. הירו או סקשן הדגמה, פעם אחת.",
  note:"המכסה מסתובב סביב הציר התחתון (transform-origin bottom, rotateX מ--88 ל-0) בפרספקטיבה, והמסך שבפנים נדלק (opacity) אחרי 40% מהפתיחה. במובייל המחשב צר יותר ומופיע מלמעלה עם זווית קטנה.",
  libs:["gsap","ScrollTrigger"],
  css:`.lp{position:relative;height:200vh}
.lp-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;perspective:1600px;overflow:hidden}
.lp-dev{position:relative;width:min(760px,88vw);transform-style:preserve-3d;will-change:transform}
.lp-lid{position:relative;aspect-ratio:16/10;border-radius:18px 18px 4px 4px;background:var(--ink);padding:14px;transform-origin:50% 100%;transform-style:preserve-3d;will-change:transform;box-shadow:0 30px 80px rgba(0,0,0,.3)}
.lp-scr{width:100%;height:100%;border-radius:10px;background:#0c0d16;overflow:hidden;position:relative}
.lp-ui{position:absolute;inset:0;padding:6%;display:grid;grid-template-columns:1fr 3fr;gap:3%;opacity:0}
.lp-ui i{display:block;border-radius:6px;background:rgba(255,255,255,.08)}
.lp-ui .side{display:grid;gap:8%;align-content:start}
.lp-ui .side i{height:10%}
.lp-ui .side i:first-child{background:var(--accent);height:16%}
.lp-ui .main{display:grid;grid-template-rows:1fr 2fr;gap:6%}
.lp-ui .main i:last-child{background:linear-gradient(180deg,transparent 60%,color-mix(in srgb,var(--accent) 35%,transparent))}
.lp-base{height:18px;border-radius:0 0 16px 16px;background:linear-gradient(180deg,#2a2d3f,#15172a);position:relative}
.lp-base::after{content:"";position:absolute;top:0;left:50%;translate:-50% 0;width:18%;height:5px;border-radius:0 0 6px 6px;background:#0c0d16}
.lp-cap{position:absolute;bottom:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:14px}
@media(max-width:767px){.lp{height:160vh}.lp-pin{perspective:1000px}}`,
  html:`<div class="lp">
  <div class="lp-pin"><div class="lp-dev">
    <div class="lp-lid"><div class="lp-scr"><div class="lp-ui"><div class="side"><i></i><i></i><i></i><i></i></div><div class="main"><i></i><i></i></div></div></div></div>
    <div class="lp-base"></div>
  </div><p class="lp-cap">גלול כדי לפתוח</p></div>
</div>`,
  js:`(function(){
  const lid=document.querySelector(".lp-lid"),dev=document.querySelector(".lp-dev");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".lp-ui",{opacity:1});return;}
  const mob=matchMedia("(max-width:767px)").matches;
  gsap.set(lid,{rotateX:-88});gsap.set(dev,{rotateX:mob?8:14,y:40});
  gsap.timeline({scrollTrigger:{trigger:".lp",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(lid,{rotateX:0,duration:1,ease:"power2.inOut"},0)
    .to(dev,{rotateX:mob?2:4,y:0,duration:1,ease:"power2.inOut"},0)
    .to(".lp-ui",{opacity:1,duration:.4},.4)
    .to(".lp-cap",{opacity:0,duration:.2},0);
})();`
},
{
  id:"g116", cat:"gsap", name:"יחס שמשתנה בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"שני משטחים צבעוניים שמייצגים יחס: לפני ואחרי, אנחנו מול השוק, שתי אפשרויות. בגלילה הגבול ביניהם זז והמספרים משתנים יחד איתו.",
  when:"נתון השוואתי אחד חזק: מ-20% ל-80%, חצי מהזמן, פי שלושה. אחד לעמוד.",
  note:"שכבה אחת מלאה מאחור ושכבה שנייה עם clip-path inset מצד אחד, בסקראב. המספרים מחושבים מאותו progress. אין שינוי רוחב אמיתי, לכן אין reflow. במובייל שני המשטחים זה מעל זה והגבול אופקי.",
  libs:["gsap","ScrollTrigger"],
  css:`.rt{position:relative;height:200vh}
.rt-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.rt-box{position:relative;width:min(1000px,100%);height:min(56vh,520px);border-radius:var(--r);overflow:hidden;--p:20%}
.rt-a,.rt-b{position:absolute;inset:0;display:grid;align-content:center;padding:clamp(20px,4vw,48px)}
.rt-a{background:var(--card);border:1px solid var(--line);color:var(--ink);justify-items:end}
.rt-b{background:var(--accent);color:var(--accent-ink);clip-path:inset(0 0 0 calc(100% - var(--p)));justify-items:start}
.rt-box b{font-size:clamp(48px,9vw,140px);font-weight:900;line-height:1;font-variant-numeric:tabular-nums}
.rt-box small{font-size:clamp(14px,1.4vw,18px);opacity:.8;margin-top:8px}
@media(max-width:767px){.rt-b{clip-path:inset(calc(100% - var(--p)) 0 0 0)}.rt-a{align-content:start}.rt-b{align-content:end}}`,
  html:`<div class="rt">
  <div class="rt-pin"><div class="rt-box" role="img" aria-label="מ-20 אחוז פניות ל-80 אחוז">
    <div class="rt-a"><b><span class="rt-na">80</span>%</b><small>מהגולשים עזבו בלי לפנות</small></div>
    <div class="rt-b"><b><span class="rt-nb">20</span>%</b><small>פנו אחרי האתר החדש</small></div>
  </div></div>
</div>`,
  js:`(function(){
  const box=document.querySelector(".rt-box"),na=document.querySelector(".rt-na"),nb=document.querySelector(".rt-nb");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const o={p:20};
  gsap.to(o,{p:80,ease:"power2.inOut",scrollTrigger:{trigger:".rt",start:"top top",end:"bottom bottom",scrub:reduce?false:.5},
    onUpdate(){box.style.setProperty("--p",o.p+"%");nb.textContent=Math.round(o.p);na.textContent=Math.round(100-o.p);}});
})();`
},
{
  id:"g117", cat:"gsap", name:"גלגלות סלוט שמתייצבות בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שלושה מספרים או מילים על גלגלות אנכיות שמסתובבות מהר כשהסקשן נכנס, ומתייצבות אחת אחרי השנייה על הערך הנכון. \"במספרים\" עם דרמה.",
  when:"סקשן מספרים: שנות ניסיון, פרויקטים, לקוחות. שלושה עד ארבעה ערכים. פעם אחת בעמוד.",
  note:"כל גלגלת היא רצועה של ערכים שמוזזת ב-yPercent עד לערך הסופי (שיושב אחרון ברצועה), עם ease out ארוך וסטאגר בין הגלגלות. הרצועה נבנית ב-JS מהערך הסופי ומכמה ערכי ביניים. במובייל הגלגלות בעמודה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sl{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);max-width:960px;margin-inline:auto;padding-block:10vh 20vh}
.sl-it{text-align:center}
.sl-reel{height:1.1em;overflow:hidden;font-size:clamp(48px,7vw,110px);font-weight:900;line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums;
  mask-image:linear-gradient(180deg,transparent,#000 25%,#000 75%,transparent);-webkit-mask-image:linear-gradient(180deg,transparent,#000 25%,#000 75%,transparent)}
.sl-strip{display:flex;flex-direction:column;will-change:transform}
.sl-strip span{height:1.1em}
.sl-lbl{color:var(--muted);font-size:15px;margin-top:8px}
@media(max-width:767px){.sl{grid-template-columns:1fr;gap:28px}}`,
  html:`<div class="stage"><div class="sl">
  <div class="sl-it"><div class="sl-reel" data-final="12" data-suffix="+"></div><div class="sl-lbl">שנות ניסיון</div></div>
  <div class="sl-it"><div class="sl-reel" data-final="140" data-suffix=""></div><div class="sl-lbl">פרויקטים שעלו לאוויר</div></div>
  <div class="sl-it"><div class="sl-reel" data-final="98" data-suffix="%"></div><div class="sl-lbl">לקוחות שממליצים</div></div>
</div></div>`,
  js:`(function(){
  const reels=gsap.utils.toArray(".sl-reel"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  reels.forEach((r,i)=>{
    const fin=r.dataset.final,suf=r.dataset.suffix||"",strip=document.createElement("div");strip.className="sl-strip";
    // רצועה של 12 ערכים אקראיים ואז הערך הסופי: הגלגלת נראית כאילו "עברה" על הרבה מספרים
    const vals=[];for(let k=0;k<12;k++)vals.push(Math.floor(Math.random()*(+fin*1.6+9)));vals.push(fin);
    vals.forEach(v=>{const s=document.createElement("span");s.textContent=v+suf;strip.appendChild(s);});
    r.appendChild(strip);
    if(reduce){gsap.set(strip,{yPercent:-100*(vals.length-1)/vals.length});return;}
    gsap.fromTo(strip,{yPercent:0},{yPercent:-100*(vals.length-1)/vals.length,duration:2.2+i*.4,ease:"power4.out",
      scrollTrigger:{trigger:".sl",start:"top 75%",once:true}});
  });
})();`
},
{
  id:"g118", cat:"gsap", name:"אלכסון צבע שמסתובב מאחורי העמוד", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"משטח צבע ענק ואלכסוני שיושב מאחורי כמה סקשנים ומסתובב לאט עם הגלילה, כך שהגבול בין הצבעים חוצה את התוכן בזווית אחרת בכל רגע. רקע שנושם בלי להסיח.",
  when:"אתרי מותג עם צבע חזק, עמודי קמפיין, סקשני ביניים ארוכים. אחד לעמוד, מאחורי שניים עד ארבעה סקשנים.",
  note:"המשטח sticky בגובה המסך, גדול פי 1.6 מהמסך כדי שהסיבוב לא יחשוף פינות, ומסתובב מ--14 ל-14 מעלות בסקראב. הטקסט מעליו שומר ניגודיות כי כל סקשן מגדיר צבע טקסט לפי הצד שלו. במובייל הזווית קטנה (8 מעלות).",
  libs:["gsap","ScrollTrigger"],
  css:`.dg{position:relative}
.dg-bg{position:sticky;top:0;height:100vh;margin-bottom:-100vh;overflow:hidden;z-index:0;pointer-events:none}
.dg-pane{position:absolute;left:50%;top:50%;width:160vmax;height:160vmax;translate:-50% -50%;background:linear-gradient(90deg,var(--ink) 0 50%,var(--accent) 50% 100%);will-change:transform;opacity:.94}
.dg-body{position:relative;z-index:1}
.dg-sec{min-height:100vh;display:grid;align-content:center;padding:var(--sec) var(--gutter);color:var(--bg)}
.dg-sec:nth-child(even){justify-items:end;text-align:end;color:var(--accent-ink)}
.dg-sec h2{margin:0 0 10px;font-size:var(--fs-h2);max-width:20ch}
.dg-sec p{margin:0;max-width:40ch;opacity:.85;line-height:1.7}`,
  html:`<div class="dg">
  <div class="dg-bg" aria-hidden="true"><div class="dg-pane"></div></div>
  <div class="dg-body">
    <section class="dg-sec"><h2>צד אחד של הסיפור</h2><p>מה שהיה: אתר יפה שאף אחד לא פנה דרכו.</p></section>
    <section class="dg-sec"><h2>והצד השני</h2><p>מה שיש: עמוד שמסביר, ומספרים שעולים.</p></section>
    <section class="dg-sec"><h2>הגבול ביניהם זז</h2><p>כל גלילה מטה את הקו קצת. זה כל הרעיון.</p></section>
  </div>
</div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const a=matchMedia("(max-width:767px)").matches?8:14;
  gsap.fromTo(".dg-pane",{rotate:-a},{rotate:a,ease:"none",scrollTrigger:{trigger:".dg",start:"top top",end:"bottom bottom",scrub:.8}});
})();`
},
];
