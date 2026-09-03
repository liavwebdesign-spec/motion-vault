// סבב שביעי (3.9.2026): רק GSAP, ורק אנימציות שהגלילה או העכבר מניעים.
export default [
{
  id:"g54", cat:"gsap", name:"גריד מפוזר שמתכנס בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"תמונות שמפוזרות בחלל, מסובבות וקטנות, ומתכנסות לגריד מסודר בקצב הגלילה. גוללים אחורה והן מתפזרות בחזרה.",
  when:"פתיחת סקשן עבודות, קיר לקוחות, גלריית מוצרים, מעבר בין פרק לפרק. רגע אחד שאומר \"יש כאן מישהו ששולט בפרטים\", ואחריו התוכן מתנהג רגיל.",
  libs:["gsap","ScrollTrigger"],
  css:`.cv-head{text-align:center;max-width:44ch;margin:0 auto clamp(30px,5vw,60px)}
.cv-head h3{font-size:clamp(26px,3.6vw,48px);margin:0 0 10px}
.cv-head p{color:var(--muted);font-size:17px;line-height:1.8;margin:0}
.cv{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(10px,1.4vw,22px);
  max-width:min(1080px,94vw);margin-inline:auto;perspective:1200px}
/* align-self:start קריטי. בלעדיו פריט הגריד נמתח בשני הצירים, aspect-ratio גוזר את
   הרוחב מגובה השורה במקום להפך, והעמודות יוצאות ברוחבים שונים. אז הפיזור שמחושב
   באחוזים מרוחב הפריט יוצא לא סימטרי והענן נסחף הצידה מול הכותרת. */
.cv-item{aspect-ratio:1;align-self:start;border-radius:16px;font-size:0;will-change:transform,opacity}
.cv-item:nth-child(4n+1){aspect-ratio:3/4}
.cv-item:nth-child(4n+4){aspect-ratio:4/5}
@media(max-width:820px){.cv{grid-template-columns:repeat(3,1fr)}}
@media(max-width:540px){.cv{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage"><div class="cv-head"><h3>קיר העבודות</h3>
  <p>גלול לאט. הכרטיסים מגיעים מהחלל ומתיישבים לגריד, ובגלילה אחורה חוזרים להתפזר.</p></div>
<div class="cv">
  <div class="ph cv-item ph-a"></div><div class="ph cv-item ph-c"></div><div class="ph cv-item ph-d"></div><div class="ph cv-item ph-e"></div>
  <div class="ph cv-item ph-b"></div><div class="ph cv-item ph-f"></div><div class="ph cv-item ph-a"></div><div class="ph cv-item ph-c"></div>
  <div class="ph cv-item ph-d"></div><div class="ph cv-item ph-e"></div><div class="ph cv-item ph-b"></div><div class="ph cv-item ph-f"></div>
</div></div>`,
  js:`(function(){
  const grid=document.querySelector(".cv");
  const items=gsap.utils.toArray(".cv-item");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(items,{opacity:1});return;}
  let tl;
  function build(){
    if(tl){tl.scrollTrigger&&tl.scrollTrigger.kill();tl.kill();gsap.set(items,{clearProps:"all"});}
    const g=grid.getBoundingClientRect();
    const cx=g.left+g.width/2, cy=g.top+g.height/2;
    tl=gsap.timeline({scrollTrigger:{trigger:grid,start:"top 92%",end:"top 22%",scrub:.8,invalidateOnRefresh:true}});
    items.forEach(el=>{
      const r=el.getBoundingClientRect();
      // הכיוון נגזר מהמיקום בגריד: כל כרטיס בא מהצד שאליו הוא ממילא שייך
      const dx=(r.left+r.width/2-cx)/g.width;      // בין מינוס חצי לחצי
      const dy=(r.top+r.height/2-cy)/g.height;
      // duration מפורש. בלעדיו הטווין מקבל חצי שנייה, וכל ההתכנסות נגמרת בשליש הראשון של הגלילה.
      tl.fromTo(el,{
        xPercent:dx*190, yPercent:dy*150,
        scale:.42, rotate:dx*22, rotateY:dx*-26, opacity:0
      },{
        xPercent:0,yPercent:0,scale:1,rotate:0,rotateY:0,opacity:1,duration:1,ease:"power2.out"
      },0);
    });
  }
  build();
  // הפיזור מחושב ממידות אמיתיות, ולכן חייבים לחשב מחדש כשהגריד משנה מספר עמודות
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{build();ScrollTrigger.refresh();},220);});
})();`,
  runway:true,
  note:"ההבדל בין פיזור שנראה מכוון לפיזור שנראה כמו תקלה הוא שהמרחק לא אקראי: כל כרטיס מגיע מהכיוון שאליו הוא ממילא שייך בגריד, וזה מחושב מהמיקום שלו ביחס למרכז. לכן העין קוראת את זה כהתכנסות ולא כבלגן. הערכים ביחידות אחוז (`xPercent`) ולא בפיקסלים, כך שהאפקט מתכווץ מעצמו במסכים קטנים. `rotateY` קטן עם `perspective` על הגריד מוסיף עומק בלי להפוך את זה לאטרקציה. חובה לחשב מחדש בשינוי רוחב, כי מספר העמודות משתנה וכל הכיוונים איתו."
},

{
  id:"g56", cat:"gsap", name:"מדיה שנפתחת לרוחב מלא בגלילה", tech:"GSAP · ScrollTrigger pin · clip-path", status:"ממתין",
  desc:"תמונה שמתחילה ככרטיס קטן ומעוגל במרכז המסך, ונפתחת בגלילה עד שהיא ממלאת את המסך כולו. הכותרת שמעליה נמוגה בדיוק כשהמסגרת נעלמת.",
  when:"פתיחת עמוד בית, מעבר לסקשן מוצר, סוף סיפור מותג. הרגע שבו התמונה מפסיקה להיות איור ומתחילה להיות סצנה.",
  libs:["gsap","ScrollTrigger"],
  css:`.ex{height:260vh;position:relative}
.ex-stick{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--bg)}
.ex-media{position:absolute;inset:0;font-size:0;border-radius:0;
  clip-path:inset(22% 26% 22% 26% round 26px)}
.ex-cap{position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none;padding-inline:var(--gutter)}
.ex-cap h3{margin:0;color:#fff;font-size:clamp(28px,5.5vw,74px);line-height:1.1;max-width:16ch;
  text-shadow:0 4px 30px rgba(0,0,0,.35)}
.ex-cap p{margin:14px 0 0;color:#fff;opacity:0;font-size:clamp(15px,1.6vw,20px);max-width:40ch}
.ex-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;
  color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="ex"><div class="ex-stick">
  <div class="ph ex-media ph-b"></div>
  <div class="ex-cap"><div><h3>מהכרטיס אל הסצנה</h3><p>אותה תמונה, רק שהיא כבר לא מוצגת בתוך מסגרת אלא מקיפה את המבקר.</p></div></div>
</div></div>
<p class="ex-after">אותו מהלך עובד גם הפוך: מתחילים ממסך מלא ומתכווצים לכרטיס, כשרוצים לסגור סקשן במקום לפתוח אותו.</p>`,
  js:`(function(){
  const media=document.querySelector(".ex-media"),h=document.querySelector(".ex-cap h3"),p=document.querySelector(".ex-cap p");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(media,{clipPath:"inset(0% 0% 0% 0% round 0px)"});gsap.set(p,{opacity:1});return;}
  gsap.timeline({scrollTrigger:{trigger:".ex",start:"top top",end:"bottom bottom",scrub:.6}})
    // clip-path ולא scale: התוכן לא נמתח ולא מטשטש, רק החלון שדרכו רואים אותו גדל
    // משכים מפורשים: בלי זה הפתיחה מסתיימת בשליש הראשון של הגלילה והשאר ריק
    .fromTo(media,{clipPath:"inset(22% 26% 22% 26% round 26px)"},
                  {clipPath:"inset(0% 0% 0% 0% round 0px)",duration:1,ease:"none"},0)
    .to(h,{scale:1.08,opacity:0,duration:.45,ease:"none"},0)
    .to(p,{opacity:1,duration:.3,ease:"none"},.68);
})();`,
  runway:false,
  note:"הפיתוי הוא לעשות את זה עם `scale`, וזו טעות: הגדלה מותחת את התמונה ומטשטשת אותה, ומזיזה גם את הטקסט שמעליה. `clip-path: inset(...)` פותח את החלון שדרכו רואים את המדיה בלי לגעת בה בכלל, והרדיוס נכנס לאותו ערך עצמו דרך `round`, כך ששני הדברים מונפשים בטוויין אחד. GSAP מסוגל לעשות אינטרפולציה בין שני `inset` רק כשהם כתובים באותו מבנה בדיוק, כולל אותה יחידה ואותו `round` בשני הצדדים; ערבוב של אחוזים ופיקסלים שובר את המעבר. הסקשן מוצמד ב-`position:sticky` ולא ב-pin של ScrollTrigger, ולכן אין spacer ואין קפיצה בסוף."
},
];
