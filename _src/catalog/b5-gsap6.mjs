// גל gsap.com (2.9.2026): נכרה מעמוד הבית של GSAP עצמם ושוחזר מאפס.
export default [
{
  id:"g40", cat:"gsap", name:"סצנה אופקית שכל אלמנט בה מתעורר בתורו", tech:"GSAP · containerAnimation", status:"ממתין",
  desc:"סקשן שננעל למסך והתוכן גולש הצידה, אבל הפעם כל פריט בתוך המסלול מקבל טריגר משלו לפי המיקום האופקי שלו: הוא נכנס כשהוא מגיע לאזור הצפייה, ולא כשהסקשן כולו נכנס. אלמנט אחד בפנים גם מסתובב בסקראב משלו.",
  when:"סיפור אופקי עם תחנות: מסע לקוח, ציר זמן, שלבי תהליך. זה מה שהופך גלילה צידית מרצועה שזזה לסצנה שמתרחשת. ההבדל מ-MV:g01 הוא בדיוק זה.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.hz{overflow:hidden;background:#0f1020;color:#fff;direction:ltr}
.hz-track{display:flex;align-items:center;gap:clamp(48px,11vw,220px);width:max-content;padding-inline:10vw 24vw;height:100vh;direction:ltr}
.hz-item,.hz-lead{direction:rtl}
.hz-item{flex:0 0 auto;text-align:center;will-change:transform}
.hz-num{font-size:13px;letter-spacing:.16em;color:#8d8fb0;margin-bottom:14px}
.hz-item h3{font-size:clamp(26px,2.6vw,46px);margin:0 0 10px;font-weight:800}
.hz-item p{margin:0 auto;max-width:32ch;color:#b9bad0;font-size:15px;line-height:1.6}
.hz-card{width:min(420px,74vw);aspect-ratio:4/3;margin-inline:auto;margin-bottom:22px;font-size:26px}
.hz-scrub{width:120px;height:120px;flex:0 0 auto;border-radius:26px;background:linear-gradient(140deg,#c6ff4a,#4a3aff);display:grid;place-items:center;font-size:34px;color:#0f1020}
.hz-lead{flex:0 0 min(760px,82vw)}
.hz-lead h2{font-size:clamp(34px,4vw,72px);margin:0 0 12px;font-weight:800;line-height:1.1}
.hz-lead p{color:#b9bad0;margin:0;font-size:16px}`,
  html:`<div class="hz"><div class="hz-track">
  <div class="hz-lead"><h2>ארבע תחנות, גלילה אחת</h2><p>גלול למטה. המסלול זז הצידה, וכל תחנה נכנסת ברגע שהיא מגיעה לאזור הצפייה.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-a">1</div><div class="hz-num">תחנה 01</div><h3>הכירות</h3><p>מבינים את המצב הקיים ואת מה שצריך לקרות.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-b">2</div><div class="hz-num">תחנה 02</div><h3>אפיון</h3><p>מגדירים מבנה, תוכן והיררכיה לפני שנוגעים בעיצוב.</p></div>
  <div class="hz-scrub" aria-hidden="true">✦</div>
  <div class="hz-item"><div class="hz-card ph ph-c">3</div><div class="hz-num">תחנה 03</div><h3>בנייה</h3><p>מרכיבים את העמוד ובודקים אותו בכל רוחב מסך.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-d">4</div><div class="hz-num">תחנה 04</div><h3>עלייה לאוויר</h3><p>מפרסמים, מודדים ומתקנים לפי מה שקורה באמת.</p></div>
</div></div>`,
  js:`(function(){
  const track=document.querySelector(".hz-track");
  const spinner=document.querySelector(".hz-scrub");
  const dist=()=>Math.max(1,track.scrollWidth-window.innerWidth);

  // המסלול: הטריגר הוא הרצועה עצמה, וההצמדה על ההורה שלה
  const runner=gsap.to(track,{x:()=>-dist(),ease:"none",
    scrollTrigger:{trigger:track,pin:track.parentNode,start:"top top",end:()=>"+="+dist(),
      scrub:1,anticipatePin:1,invalidateOnRefresh:true}});

  // כל פריט מקבל ScrollTrigger משלו שנמדד לפי המיקום האופקי בתוך המסלול
  gsap.utils.toArray(".hz-item").forEach(item=>{
    gsap.from(item,{y:70,autoAlpha:0,ease:"none",
      scrollTrigger:{trigger:item,containerAnimation:runner,scrub:true,
        start:"left 96%",end:"left 62%"}});
  });
  // סקראב מקונן: אלמנט שמסתובב לאורך כל המעבר שלו על המסך
  gsap.fromTo(spinner,{rotation:0},{rotation:270,ease:"none",
    scrollTrigger:{trigger:spinner,containerAnimation:runner,scrub:true,
      start:"left 98%",end:"right 4%"}});
})();`,
  note:"כללי הבסיס: הטריגר של המסלול הוא הרצועה עצמה וה-pin הוא ההורה שלה, לטווין האופקי חובה ease:\"none\", הטריגרים של הילדים מקבלים containerAnimation עם אותו טווין ונמדדים ב-left ו-right במקום top ו-bottom, ואסור pin או snap על טריגר שמשתמש ב-containerAnimation. <b>המלכודת שעלתה כאן, וחשובה לכל אתר עברי:</b> בתוך קונטיינר RTL, ילד עם width:max-content שרחב מהמסך מתיישר לקצה הימני והגלישה יוצאת שמאלה, כלומר נקודת האפס שלו היא כבר סוף הרצועה. בגלל זה כל המדידות של ScrollTrigger יצאו מוזזות באורך מסלול שלם וכל הפריטים נחשבו כאילו כבר עברו. זה לא באג ב-GSAP אלא התנהגות פריסה. הפתרון: direction:ltr על מעטפת הסקשן, ו-direction:rtl על הפריטים עצמם כדי שהעברית תיקרא נכון. אחרי התיקון הטכניקה הרשמית עובדת בדיוק לפי התיעוד."
},
{
  id:"g41", cat:"gsap", name:"סמן מותג שמתחלף בין צורות", tech:"GSAP · MorphSVG", status:"ממתין",
  desc:"צורה אחת שממשיכה להשתנות בלולאה שקטה: ריבוע מעוגל שהופך לעיגול, לטיפה ולכוכב ובחזרה. אותו path, מורף אמיתי ולא החלפת תמונות.",
  when:"סמן מותג חי בהירו, אייקון ליד כותרת סקשן, מסך טעינה. איטי ושקט: הצורה מתחלפת בערך פעם בשתי שניות, לא יותר.",
  libs:["gsap","MorphSVGPlugin"],
  css:`.morph-stage{display:grid;place-items:center;gap:26px}
.morph-stage svg{width:min(260px,52vw);height:auto;overflow:visible}
.morph-shape{fill:url(#mg)}
.morph-cap{font-size:14px;color:var(--muted);letter-spacing:.06em}
.morph-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.morph-btns .gbtn{min-height:40px;padding-inline:18px;font-size:14px;background:#eceaff;color:var(--ink)}
.morph-btns .gbtn.on{background:var(--accent);color:#fff}`,
  html:`<div class="stage tight"><div class="morph-stage">
<svg viewBox="0 0 200 200" role="img" aria-label="סמן מותג שמתחלף בין צורות">
  <defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4a3aff"/><stop offset="1" stop-color="#c2255c"/></linearGradient></defs>
  <path class="morph-shape" id="mShape" d="M40,20 H160 A20,20 0 0 1 180,40 V160 A20,20 0 0 1 160,180 H40 A20,20 0 0 1 20,160 V40 A20,20 0 0 1 40,20 Z"/>
  <g style="display:none">
    <path id="mSquare" d="M40,20 H160 A20,20 0 0 1 180,40 V160 A20,20 0 0 1 160,180 H40 A20,20 0 0 1 20,160 V40 A20,20 0 0 1 40,20 Z"/>
    <path id="mCircle" d="M100,15 A85,85 0 0 1 100,185 A85,85 0 0 1 100,15 Z"/>
    <path id="mDrop" d="M100,12 C150,70 178,104 178,132 A78,78 0 0 1 22,132 C22,104 50,70 100,12 Z"/>
    <path id="mStar" d="M100,10 L124,72 L190,76 L139,118 L156,182 L100,146 L44,182 L61,118 L10,76 L76,72 Z"/>
  </g>
</svg>
<p class="morph-cap">הצורה מתחלפת לבד. אפשר גם לקפוץ ישירות:</p>
<div class="morph-btns">
  <button class="gbtn on" data-t="mSquare">ריבוע</button>
  <button class="gbtn" data-t="mCircle">עיגול</button>
  <button class="gbtn" data-t="mDrop">טיפה</button>
  <button class="gbtn" data-t="mStar">כוכב</button>
</div>
</div></div>`,
  js:`(function(){
  const SHAPES=["mSquare","mCircle","mDrop","mStar"];
  const btns=[...document.querySelectorAll(".morph-btns .gbtn")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i=0,loop=null;
  function mark(id){btns.forEach(b=>b.classList.toggle("on",b.dataset.t===id));}
  function go(id,dur){
    mark(id);
    return gsap.to("#mShape",{morphSVG:"#"+id,duration:dur===undefined?1.1:dur,ease:"power2.inOut"});
  }
  function tick(){
    i=(i+1)%SHAPES.length;
    go(SHAPES[i]);
    loop=gsap.delayedCall(2.1,tick);
  }
  if(!reduce)loop=gsap.delayedCall(1.6,tick);
  btns.forEach(b=>b.addEventListener("click",()=>{
    if(loop)loop.kill();
    i=SHAPES.indexOf(b.dataset.t);
    go(b.dataset.t,.6);
    if(!reduce)loop=gsap.delayedCall(3.2,tick);
  }));
})();`,
  runway:false,
  note:"למורף חלק כל ה-paths צריכים להיות סגורים ובכיוון ציור זהה. כשצורה קופצת או מתפתלת מוסיפים shapeIndex, למשל morphSVG:{shape:'#mStar',shapeIndex:2}. ה-SVG נושא role ו-aria-label כי הוא נושא משמעות ויזואלית."
},
];
