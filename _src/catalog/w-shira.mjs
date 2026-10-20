// שלושה מהלכים מ-shira-bengaiev.co.il (20.10.2026, ליאב: "תתחיל לשחזר את שלושת המהלכים ותוסיף אותם במאגר שלנו").
// שחזור התנהגות בלבד, מאפס, מהצפייה באתר. בלי הקוד, התמונות, הסרטונים או הטקסטים שלה.
// מדיה: פורטרט ווידאו רחפן מ-Freepik (פריטים חינמיים בקרדיטים, assets/media/dive/credits.json), תמונת הסטודיו מ-real/s13.
export default [
{
  id:"g154", cat:"gsap", name:"צלילה לתוך עדשת המשקפיים", tech:"GSAP · ScrollTrigger scrub · וידאו מסונכרן", status:"מאושר-עין",
  desc:"פורטרט במשקפי שמש, ובעדשה מתנגן סרטון כמו השתקפות. בגלילה המצלמה צוללת לתוך העדשה עד שהיא ממלאת את המסך, ואז הסרטון יוצא ממנה ומתיישב במסגרת מעוגלת באמצע העמוד, וממשיך מאותה שנייה.",
  when:"הירו של סטודיו, צלם, מעצב, או מותג אופנה ואופטיקה, כשיש פורטרט אמיתי וסרטון שמראה את העבודה. הצלילה היא הדרך מהפנים אל העבודה: קודם מי אנחנו, ואז מה אנחנו עושים. פעם אחת בעמוד, בראש.",
  note:"**שחזור.** השראה: shira-bengaiev.co.il (20.10.2026). נבנה מאפס מהצפייה, בלי הקוד, התמונות או הסרטונים שלה. **הבמה היא התמונה עצמה** ביחס 3:2, בגודל שמכסה את המסך (כמו cover, ביחידות cqw/cqh של המסך הנעוץ), ולכן העדשה יושבת באחוזים קבועים של הבמה: `--cx`, `--cy`, `--w`, `--h`, שנמדדים פעם אחת על התמונה. `--fx` ו-`--fy` קובעים איזו נקודה בתמונה נשארת במרכז כשהמסך צר או רחב. **הצלילה:** ה-`transform-origin` הוא מרכז העדשה, כך שההגדלה לא מזיזה אותה, וההזזה לבדה מביאה אותה למרכז המסך. ההגדלה היא `S^z` ולא ליניארית, כי גודל נתפס ביחס: כל קטע גלילה מכפיל את הגודל באותו שיעור. `S = hypot(W/lw, H/lh)` הוא בדיוק הגודל שבו אליפסת העדשה מכסה את המסך. **שני סרטונים:** קל בעדשה (480p, ב-screen מעל הזכוכית הכהה, וכך הוא נראה כמו השתקפות) וכבד במסגרת (720p, `preload=none`, נטען רק כשמתחילים לצלול; המקור טוען 17MB מראש). במעבר הכבד מקבל את ה-`currentTime` של הקל, כך שהסרט ממשיך ולא מתחיל מחדש, והקל נעצר כדי לא לפענח שני סרטונים. גודל ההתחלה של המסגרת מחושב מהמרכז שלה בפועל (הכיתוב מתחתיה מרים אותה), אחרת נשאר פס ריק בתחתית. **בטלפון** המסגרת ריבועית, ברוחב המסך פחות 12px מכל צד, והטקסט יורד לתחתית על מעבר מצבע הרקע. **נגישות:** כפתור השהיה תמיד (סרטון שמתנגן לבד יותר מחמש שניות, WCAG 2.2.2). בהפחתת תנועה או בלי הספרייה אין צלילה ואין ניגון אוטומטי: רואים את הפורטרט, ומתחתיו את הסרטון במסגרת עם כפתור נגן. **בפרויקט:** תמונה עם עדשה גדולה וכהה (עגולה הכי פשוטה), ומודדים את העדשה כשברים מרוחב וגובה התמונה.",
  libs:["gsap","ScrollTrigger"],
  css:`.ld{position:relative;background:var(--bg);color:var(--ink)}
.ld-hero{position:relative;height:100vh;height:100svh;overflow:hidden;container-type:size}
/* הבמה היא התמונה עצמה ביחס 3:2, בגודל שמכסה את המסך (כמו cover). כך העדשה יושבת באחוזים של הבמה ולא זזה כשהמסך משתנה.
   --fx/--fy: הנקודה בתמונה שנשארת במרכז; --z: כמה קרוב מתחילים */
.ld-stage{--z:1.18;--fx:.52;--fy:.3;--sw:calc(max(100cqw, 150cqh) * var(--z));--sh:calc(var(--sw) / 1.5);
  position:absolute;width:var(--sw);height:var(--sh);
  left:clamp(calc(100cqw - var(--sw)), calc(50cqw - var(--sw) * var(--fx)), 0px);
  top:clamp(calc(100cqh - var(--sh)), calc(50cqh - var(--sh) * var(--fy)), 0px)}
.ld-photo{display:block;width:100%;height:100%}
/* העדשה: מיקום וגודל כשבר מהתמונה. הסרטון ב-screen מעל הזכוכית הכהה, ולכן הוא נראה כמו השתקפות ולא כמו מדבקה */
.ld-lens{--cx:.5356;--cy:.1478;--w:.0861;--h:.1154;--lv:.62;--blk:0;position:absolute;
  left:calc((var(--cx) - var(--w) / 2) * 100%);top:calc((var(--cy) - var(--h) / 2) * 100%);
  width:calc(var(--w) * 100%);height:calc(var(--h) * 100%);border-radius:50%;overflow:hidden}
/* מתחת לסרטון: שחור שנדלק בזמן הצלילה. screen על שחור הוא הסרטון עצמו, וכך במסך המלא אין גוון של הזכוכית */
.ld-lens::before{content:"";position:absolute;inset:0;background:#000;opacity:var(--blk)}
.ld-lv{position:relative;display:block;width:100%;height:100%;object-fit:cover;opacity:var(--lv);mix-blend-mode:screen}
.ld-tint{position:absolute;inset:0;border-radius:50%;background:radial-gradient(closest-side, transparent 62%, rgba(0,0,0,.5));pointer-events:none}
.ld-glint{position:absolute;inset:-10%;background:linear-gradient(115deg, transparent 42%, rgba(255,255,255,.45) 50%, transparent 58%);transform:translateX(-80%);pointer-events:none}
.ld-copy{position:absolute;top:0;bottom:0;inset-inline-start:var(--gutter);width:min(30cqw, 460px);display:flex;flex-direction:column;justify-content:center;gap:16px}
/* הילה רכה בצבע הרקע מאחורי הטקסט: בעור הבהיר היא נבלעת בקיר, בעור כהה היא מחשיכה את התמונה מאחורי טקסט בהיר */
.ld-copy::before{content:"";position:absolute;inset:-20% -30%;z-index:-1;background:radial-gradient(closest-side, color-mix(in srgb, var(--bg) 78%, transparent), transparent);pointer-events:none}
.ld-eyebrow{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.ld-title{margin:0;font-size:clamp(40px, 5.2cqw, 84px);font-weight:700;line-height:1.05;text-wrap:balance}
.ld-title span{display:block}
.ld-sub{margin:0;font-size:var(--fs-body);line-height:1.5;max-width:28ch}
.ld-reel{margin:0;padding:var(--sec) var(--gutter);display:grid;justify-items:center;gap:16px}
.ld-frame{position:relative;width:min(100%, 1100px);aspect-ratio:16/9;border-radius:24px;overflow:hidden;background:color-mix(in srgb, var(--ink) 10%, var(--bg))}
.ld-fv{display:block;width:100%;height:100%;object-fit:cover}
.ld-cap{display:flex;align-items:center;justify-content:space-between;gap:16px;width:min(100%, 1100px);font-size:15px;color:var(--muted)}
.ld-play{font:inherit;font-size:14px;padding:8px 16px;border-radius:999px;border:1px solid currentColor;background:transparent;color:var(--ink);cursor:pointer;transition:background-color .2s cubic-bezier(.2,.6,.2,1)}
.ld-play:hover{background:color-mix(in srgb, var(--ink) 8%, transparent)}
.ld-play:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
/* הצלילה קיימת רק תחת .mv-on, שהסקריפט מוסיף כשהתנועה מותרת. בלעדיו: פורטרט, ומתחתיו הסרטון במסגרת */
.ld.mv-on{height:340vh}
.ld.mv-on .ld-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;container-type:size}
.ld.mv-on .ld-hero{position:absolute;inset:0;height:auto}
.ld.mv-on .ld-reel{position:absolute;inset:0;padding:0;align-content:center;opacity:0;visibility:hidden}
.ld.mv-on .ld-frame,.ld.mv-on .ld-cap{width:min(1100px, 80cqw, calc(72cqh * 16 / 9))}
.ld.mv-on .ld-glint{animation:ldGlint 6s cubic-bezier(.76,0,.24,1) infinite}
@keyframes ldGlint{0%,72%{transform:translateX(-80%)}100%{transform:translateX(80%)}}
@media(max-width:767px){
  .ld-stage{--z:1}
  .ld-copy{inset-inline:0;top:auto;width:auto;padding:96px var(--gutter) 32px;background:linear-gradient(to top, var(--bg) 52%, transparent)}
  .ld-copy::before{display:none}
  .ld-title{font-size:clamp(36px, 11cqw, 56px)}
  .ld.mv-on .ld-frame,.ld.mv-on .ld-cap{width:calc(100cqw - 24px)}
  .ld.mv-on .ld-frame{aspect-ratio:1}
}`,
  html:`<section class="ld" aria-label="פתיחה">
  <div class="ld-pin">
    <div class="ld-hero">
      <div class="ld-stage">
        <img class="ld-photo" src="../assets/media/dive/portrait.webp" width="2400" height="1600" alt="אישה במשקפי שמש עגולים מביטה ישר למצלמה">
        <div class="ld-lens" aria-hidden="true">
          <video class="ld-lv" src="../assets/media/dive/reel-480.mp4" poster="../assets/media/dive/reel.webp" muted loop playsinline preload="metadata"></video>
          <i class="ld-tint"></i><i class="ld-glint"></i>
        </div>
      </div>
      <div class="ld-copy">
        <p class="ld-eyebrow">סטודיו לעיצוב אתרים</p>
        <h2 class="ld-title">תסתכלו לי <span>בעיניים.</span></h2>
        <p class="ld-sub">הסיפור שלכם כבר משתקף שם. גללו פנימה.</p>
      </div>
    </div>
    <figure class="ld-reel">
      <div class="ld-frame"><video class="ld-fv" src="../assets/media/dive/reel-720.mp4" poster="../assets/media/dive/reel.webp" muted loop playsinline preload="none" aria-label="סרט הסטודיו: חוף מלמעלה, גלים ואדם שהולך על החול"></video></div>
      <figcaption class="ld-cap"><span>סרט הסטודיו, 2026</span><button type="button" class="ld-play">נגן</button></figcaption>
    </figure>
  </div>
</section>`,
  js:`(function(){
  const root=document.querySelector(".ld"); if(!root)return;
  const lv=root.querySelector(".ld-lv"), fv=root.querySelector(".ld-fv"), btn=root.querySelector(".ld-play");
  let userPaused=false, inView=false, synced=false;
  // הסרטון הכבד לא נטען עם העמוד (preload=none). נטען פעם אחת, כשמתחילים לצלול או כשלוחצים נגן
  function warm(){ if(fv.dataset.warm)return; fv.dataset.warm="1"; fv.preload="auto"; fv.load(); }
  function label(){ btn.textContent=(fv.paused&&lv.paused)?"נגן":"השהה"; }
  // הכפתור עובד תמיד, גם בלי GSAP ובהפחתת תנועה: סרטון שמתנגן לבד יותר מחמש שניות חייב עצירה (WCAG 2.2.2)
  btn.addEventListener("click",function(){
    if(fv.paused&&lv.paused){ userPaused=false; warm(); fv.play().catch(function(){}); }
    else { userPaused=true; fv.pause(); lv.pause(); }
    label();
  });
  [fv,lv].forEach(function(v){ v.addEventListener("play",label); v.addEventListener("pause",label); });
  if(typeof gsap==="undefined")return;   // בלי הספרייה: פורטרט, ומתחתיו הסרטון עם כפתור נגן
  const pin=root.querySelector(".ld-pin"), stage=root.querySelector(".ld-stage"), lens=root.querySelector(".ld-lens");
  const reel=root.querySelector(".ld-reel"), frame=root.querySelector(".ld-frame"), cap=root.querySelector(".ld-cap"), copy=root.querySelector(".ld-copy");
  // מיקום ביחס למסך הנעוץ דרך offsetLeft/Top: הם מתעלמים מ-transform, ולכן אפשר למדוד באמצע הצלילה
  function offsetTo(el,anc){ let x=0,y=0; while(el&&el!==anc){ x+=el.offsetLeft; y+=el.offsetTop; el=el.offsetParent; } return {x:x,y:y}; }
  gsap.matchMedia().add({mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)",desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)"},function(){
    root.classList.add("mv-on");
    const cs=getComputedStyle(lens), L={cx:+cs.getPropertyValue("--cx"),cy:+cs.getPropertyValue("--cy"),w:+cs.getPropertyValue("--w"),h:+cs.getPropertyValue("--h")};
    const G={};
    function measure(){
      G.W=pin.clientWidth; G.H=pin.clientHeight;
      const sw=stage.offsetWidth, sh=stage.offsetHeight, o=offsetTo(stage,pin);
      G.sw=sw; G.sh=sh; G.ox=L.cx*sw; G.oy=L.cy*sh;   // מרכז העדשה בתוך הבמה: נקודת ההגדלה
      G.lx=o.x+G.ox; G.ly=o.y+G.oy;          // ועל המסך, לפני שהבמה זזה
      // אליפסה ממורכזת מכסה מסך W×H כש-(W/(lw·s))²+(H/(lh·s))² ≤ 1. ה-1.06 מעביר גם את שפת המסגרת הכסופה אל מחוץ למסך
      G.S=Math.hypot(G.W/(L.w*sw),G.H/(L.h*sh))*1.06;
      // גודל ההתחלה של המסגרת מהמרכז שלה בפועל: הכיתוב מתחתיה מרים אותה, ובלי זה נשאר פס ריק בתחתית
      const f=offsetTo(frame,pin), fw=frame.offsetWidth, fh=frame.offsetHeight, fcx=f.x+fw/2, fcy=f.y+fh/2;
      G.F=Math.max(2*Math.max(fcx,G.W-fcx)/fw,2*Math.max(fcy,G.H-fcy)/fh)*1.01;
      gsap.set(stage,{transformOrigin:G.ox+"px "+G.oy+"px"});
    }
    // quickSetter לא מכיר את הקיצור "scale" (ב-3.13 הוא פשוט לא כותב כלום), לכן scaleX ו-scaleY בנפרד
    const st={t:0,z:0}, sx=gsap.quickSetter(stage,"x","px"), sy=gsap.quickSetter(stage,"y","px"), ssx=gsap.quickSetter(stage,"scaleX"), ssy=gsap.quickSetter(stage,"scaleY");
    // כמה מהדרך למרכז מותר כשהבמה מוגדלת פי s, בלי ששפת התמונה תיכנס למסך. בלי זה, עדשה שקרובה לראש התמונה
    // נגררת למרכז לפני שהתמונה גדלה מספיק, ונפתח פס ריק מעליה. L: העדשה על המסך, C: המרכז, o: נקודת ההגדלה בבמה
    function lim(L,C,o,size,V,s){ if(Math.abs(C-L)<.5)return 1; return C>L?(o*s-L)/(C-L):(L-V+(size-o)*s)/(L-C); }
    function reach(s){ return Math.max(0,Math.min(1,lim(G.lx,G.W/2,G.ox,G.sw,G.W,s),lim(G.ly,G.H/2,G.oy,G.sh,G.H,s))); }
    // t מביא את העדשה למרכז; z מגדיל. ההגדלה S^z ולא ליניארית: גודל נתפס ביחס, וכך כל קטע גלילה מכפיל באותו שיעור
    function apply(){ const s=Math.pow(G.S,st.z), t=Math.min(st.t,reach(s)); sx((G.W/2-G.lx)*t); sy((G.H/2-G.ly)*t); ssx(s); ssy(s); }
    measure();
    const tl=gsap.timeline({defaults:{ease:"none"},onUpdate:watch,
      scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.to(copy,{autoAlpha:0,y:-24,filter:"blur(8px)",duration:.12},0)
      .to(st,{t:1,duration:.26,ease:"power2.inOut",onUpdate:apply},0)
      .to(st,{z:1,duration:.4,ease:"power1.in",onUpdate:apply},.05)   // נגמר ב-.45: העדשה מכסה את המסך לפני שהמסגרת נכנסת
      .to(root.querySelectorAll(".ld-tint,.ld-glint"),{opacity:0,duration:.1},.3)
      .to(lens,{"--lv":1,"--blk":1,duration:.12},.32)                   // מהשתקפות לסרטון נקי
      .fromTo(reel,{autoAlpha:0},{autoAlpha:1,duration:.03},.46)         // הסרטון הכבד נכנס כשהעדשה כבר מכסה את המסך
      .to(stage,{autoAlpha:0,duration:.01},.5)                           // הבמה מוסתרת מתחת למסגרת, כדי שלא תצויר לשווא
      .fromTo(frame,{scale:function(){return G.F;},borderRadius:0},{scale:1,borderRadius:24,duration:.3,ease:"power3.inOut"},.49)
      .fromTo(cap,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.1},.8)
      .to({},{duration:.1},.9);
    // נגינה לפי מיקום הצלילה: הקל מתנגן בעדשה, הכבד ממשיך ממנו באותה שנייה, ואף פעם לא שניהם יחד
    function watch(){
      const p=tl.progress();
      if(p>.1)warm();
      if(p>.45&&!synced){ synced=true; lv.pause(); if(!userPaused&&inView){ try{ fv.currentTime=lv.currentTime||0; }catch(e){} fv.play().catch(function(){}); } }
      else if(p<.42&&synced){ synced=false; fv.pause(); try{ lv.currentTime=fv.currentTime||0; }catch(e){} if(!userPaused&&inView)lv.play().catch(function(){}); }
    }
    ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:function(s){
      inView=s.isActive;
      if(!inView){ lv.pause(); fv.pause(); } else if(!userPaused){ (synced?fv:lv).play().catch(function(){}); }
    }});
    const onInit=function(){ measure(); }, onRef=function(){ apply(); };
    ScrollTrigger.addEventListener("refreshInit",onInit); ScrollTrigger.addEventListener("refresh",onRef);
    apply();
    return function(){
      ScrollTrigger.removeEventListener("refreshInit",onInit); ScrollTrigger.removeEventListener("refresh",onRef);
      lv.pause(); fv.pause(); synced=false;
      gsap.set(stage,{clearProps:"transform,transformOrigin"});
      root.classList.remove("mv-on");
    };
  });
})();`
},
{
  id:"g155", cat:"gsap", name:"יציאה מתוך אות (מעבר לסקשן בצבע הפוך)", tech:"GSAP · ScrollTrigger scrub · Canvas distance transform", status:"מאושר-עין",
  desc:"המסך בצבע העמוד הוא בעצם החלק הפנימי של אות ענקית. בגלילה המצלמה מתרחקת, האות מתכווצת למקומה בתוך משפט, והמשפט נגלה על רקע בצבע ההפוך. מעבר בין סקשן בהיר לכהה (או להפך, בעור כהה) בלי חיתוך.",
  when:"מעבר בין שני סקשנים בצבעים הפוכים, לפני הצהרה, ערכים או משפט מפתח. משפט קצר, עד שתי שורות, בגופן עבה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: shira-bengaiev.co.il (20.10.2026), מאפס. **הלב: איפה האות הכי עבה.** האות מצוירת על canvas בגופן האמיתי שהדפדפן טען (אחרי `document.fonts.ready`), ועל המסכה רץ distance transform בשני מעברים (chamfer 3-4): לכל פיקסל בתוך האות, המרחק שלו מהשפה. הפיקסל הרחוק ביותר הוא מרכז העיגול הגדול ביותר שנכנס באות. ממנו יוצאת ההגדלה (`transform-origin`), ובגודל ההתחלתי העיגול הזה מכסה את כל המסך, כך שהמסך כולו בצבע האות. `S` מחושב מהמרחק לפינה הרחוקה של המסך ולא מחצי האלכסון, כי האות לא חייבת לשבת במרכז. **ההגדלה מעריכית:** `scale = S^(1-q)`, כך שהקצב נראה אחיד מפי 150 ועד 1. **מדידה בלי getBoundingClientRect:** דרך offsetLeft/offsetTop, שמתעלמים מה-transform, ולכן מודדים מחדש בכל refresh גם באמצע המעבר. הקו התחתון של האות על המסך הוא ראש התיבה של ה-span ועוד `fontBoundingBoxAscent` של ה-canvas: אותם מדדי גופן בשני המקומות. בעברית מותר לעטוף אות אחת ב-span, כי האותיות לא מתחברות; בערבית אסור. בלי letter-spacing על הכותרת, אחרת התיבה של האות זזה מהציור. **הצבעים:** האות בצבע הרקע של העמוד והסקשן ב-ink, ולכן הכניסה רציפה מהסקשן שמעל. ההיפוך מכוון: בעור כהה המעבר הוא מכהה לבהיר, ובדיקת העורות מסמנת את הסקשן כמשטח הפוך, וזה בדיוק המהלך. **בטלפון** הגופן קטן יותר וה-`S` גדל לבד. **בהפחתת תנועה** רואים שני סקשנים רגילים: המשפט הפותח על הבהיר, והמשפט עם הקו מתחת על הכהה.",
  libs:["gsap","ScrollTrigger"],
  css:`.lz{position:relative;background:var(--ink);color:var(--bg)}
.lz-lead{margin:0;padding:var(--sec) var(--gutter);background:var(--bg);color:var(--ink);font-size:clamp(32px, 4.4vw, 64px);font-weight:700;line-height:1.1;text-align:center;text-wrap:balance}
.lz-body{padding:var(--sec) var(--gutter);display:grid;justify-items:center;gap:40px;text-align:center}
.lz-type{position:relative}
/* בלי letter-spacing: הוא מזיז את התיבה של האות ביחס לציור שלה על ה-canvas */
.lz-h{margin:0;font-size:clamp(40px, 9vw, 140px);font-weight:700;line-height:1.08;letter-spacing:0}
.lz-ln{display:block}
.lz-u{position:relative;display:inline-block}
.lz-swirl{position:absolute;inset-inline:-2%;bottom:-.14em;width:104%;height:.3em;overflow:visible}
.lz-swirl path{fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round}
.lz-more{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6}
/* המעבר קיים רק תחת .mv-on. בלעדיו: שני סקשנים רגילים, הבהיר עם המשפט הפותח והכהה עם הקו מתחת */
.lz.mv-on{height:300vh}
.lz.mv-on .lz-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
.lz.mv-on .lz-body{position:absolute;inset:0;padding:0 var(--gutter);align-content:center}
.lz.mv-on .lz-lead{position:absolute;inset:0;z-index:2;display:grid;place-items:center;padding:0 var(--gutter);background:none;pointer-events:none}
/* מקף 1 ורווח 2: בהיסט 1.02 אין קצה מקף על הנתיב, ולכן linecap עגול לא משאיר נקודה לפני שהקו מתחיל. הנתיב מימין לשמאל, כמו הקריאה */
.lz.mv-on .lz-swirl path{stroke-dasharray:1 2;stroke-dashoffset:1.02}
.lz.mv-on .lz-more{opacity:0;visibility:hidden}`,
  html:`<section class="lz" aria-label="איך אנחנו עובדים">
  <div class="lz-pin">
    <p class="lz-lead">מתחילים מקרוב.</p>
    <div class="lz-body">
      <div class="lz-type">
        <h2 class="lz-h"><span class="lz-ln">ורק אז מתרחקים</span><span class="lz-ln">ורואים <span class="lz-g">א</span>ת <span class="lz-u">התמונה<svg class="lz-swirl" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M294 15C250 7 208 7 156 16C104 25 58 9 6 19"/></svg></span></span></h2>
      </div>
      <p class="lz-more">ככה אנחנו עובדים: קודם הפרט הקטן שמבדל אתכם, ואז האתר כולו נבנה סביבו.</p>
    </div>
  </div>
</section>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה: שני סקשנים רגילים
  const root=document.querySelector(".lz"); if(!root)return;
  const pin=root.querySelector(".lz-pin"), type=root.querySelector(".lz-type"), g=root.querySelector(".lz-g");
  const lead=root.querySelector(".lz-lead"), more=root.querySelector(".lz-more"), swirl=root.querySelector(".lz-swirl path");
  // המקום העבה ביותר בצורה: לכל פיקסל פנימי, המרחק שלו מהשפה (chamfer 3-4, מעבר קדימה ומעבר אחורה).
  // המקסימום הוא מרכז העיגול הגדול ביותר שנכנס באות, ו-r הוא הרדיוס שלו בפיקסלים של ה-canvas
  function thickest(cv){
    const w=cv.width, h=cv.height, a=cv.getContext("2d").getImageData(0,0,w,h).data, d=new Float32Array(w*h);
    for(let i=0;i<w*h;i++)d[i]=a[i*4+3]>128?1e6:0;
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){ const i=y*w+x; if(d[i])d[i]=Math.min(d[i],d[i-1]+3,d[i-w]+3,d[i-w-1]+4,d[i-w+1]+4); }
    let bi=0, bv=0;
    for(let y=h-2;y>0;y--)for(let x=w-2;x>0;x--){ const i=y*w+x; if(!d[i])continue; d[i]=Math.min(d[i],d[i+1]+3,d[i+w]+3,d[i+w+1]+4,d[i+w-1]+4); if(d[i]>bv){ bv=d[i]; bi=i; } }
    return {x:bi%w, y:(bi/w)|0, r:bv/3};
  }
  function offsetTo(el,anc){ let x=0,y=0; while(el&&el!==anc){ x+=el.offsetLeft; y+=el.offsetTop; el=el.offsetParent; } return {x:x,y:y}; }
  gsap.matchMedia().add({mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)",desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)"},function(){
    root.classList.add("mv-on");
    const G={S:1};
    function measure(){
      // האות מצוירת על canvas בגופן שהדפדפן באמת טען, פי 3 לדיוק, עם שוליים שקופים כדי שהשפה תהיה אפס
      const cs=getComputedStyle(g), k=3, pad=4, font=cs.fontStyle+" "+cs.fontWeight+" "+cs.fontSize+" "+cs.fontFamily;
      const cv=document.createElement("canvas"), ctx=cv.getContext("2d",{willReadFrequently:true});
      ctx.font=font; const asc=ctx.measureText(g.textContent).fontBoundingBoxAscent;
      cv.width=Math.ceil((g.offsetWidth+pad*2)*k); cv.height=Math.ceil((g.offsetHeight+pad*2)*k);
      ctx.scale(k,k); ctx.font=font; ctx.direction="ltr"; ctx.textAlign="left"; ctx.textBaseline="alphabetic";
      ctx.fillText(g.textContent,pad,pad+asc);   // ראש התיבה של ה-span ועוד ה-ascent: אותו קו בסיס כמו בעמוד
      const t=thickest(cv), og=offsetTo(g,pin), ot=offsetTo(type,pin);
      const gx=og.x-ot.x+t.x/k-pad, gy=og.y-ot.y+t.y/k-pad, r=Math.max(t.r/k,.5);   // ביחס ל-.lz-type
      const px=ot.x+gx, py=ot.y+gy, W=pin.clientWidth, H=pin.clientHeight;           // ועל המסך הנעוץ
      // העיגול צריך לכסות עד הפינה הרחוקה, לא רק חצי אלכסון: האות לא חייבת לשבת במרכז
      const R=Math.max(Math.hypot(px,py),Math.hypot(W-px,py),Math.hypot(px,H-py),Math.hypot(W-px,H-py));
      G.S=R/r*1.08;
      gsap.set(type,{transformOrigin:gx+"px "+gy+"px"});
    }
    // quickSetter לא מכיר את הקיצור "scale" (ב-3.13 הוא פשוט לא כותב כלום), לכן scaleX ו-scaleY בנפרד
    const q={v:0}, ssx=gsap.quickSetter(type,"scaleX"), ssy=gsap.quickSetter(type,"scaleY");
    // מעריכי: S^(1-q). כך הקצב נראה אחיד מפי 150 ועד 1, ולא נגמר בבת אחת בסוף
    function apply(){ const v=Math.pow(G.S,1-q.v); ssx(v); ssy(v); }
    measure(); apply();
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.to(lead,{autoAlpha:0,y:-16,filter:"blur(6px)",duration:.12},.04)
      .to(q,{v:1,duration:.6,ease:"power1.inOut",onUpdate:apply},.14)
      .fromTo(swirl,{strokeDashoffset:1.02},{strokeDashoffset:0,autoRound:false,duration:.16,ease:"power2.out"},.7)   // autoRound:false: אחרת GSAP מעגל px לשלם, ובנתיב באורך 1 הקו קופץ מריק למלא
      .fromTo(more,{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.14},.76)
      .to({},{duration:.1},.9);
    // המדידה תלויה בגופן: עד שהוא נטען האות מצוירת בגופן החלופי, ולכן מודדים שוב כשהוא מוכן
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){ measure(); apply(); ScrollTrigger.refresh(); });
    const onInit=function(){ measure(); }, onRef=function(){ apply(); };
    ScrollTrigger.addEventListener("refreshInit",onInit); ScrollTrigger.addEventListener("refresh",onRef);
    return function(){
      ScrollTrigger.removeEventListener("refreshInit",onInit); ScrollTrigger.removeEventListener("refresh",onRef);
      gsap.set(type,{clearProps:"transform,transformOrigin"});
      root.classList.remove("mv-on");
    };
  });
})();`
},
{
  id:"g156", cat:"gsap", name:"אות הלוגו שנפתחת לתמונה", tech:"GSAP · ScrollTrigger scrub · clip-path: path()", status:"מאושר-עין",
  desc:"אות הלוגו מצוירת כקו, מתמלאת, ואז דרכה רואים תמונה. בגלילה האות גדלה מהמקום הכי עבה שלה עד שהתמונה ממלאת את כל המסך, והכיתוב עולה עליה.",
  when:"פתיחה של אודות או של הסטודיו, אחרי ההירו, כשללוגו יש אות בולטת ועבה ויש תמונה אחת שמחזיקה מסך מלא: המקום, האנשים, העבודה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: shira-bengaiev.co.il (20.10.2026), מאפס. במקור זו מסכת CSS עם תמונת SVG שגדלה פי עשרות. כאן זה `clip-path: path()` שנבנה מחדש בכל פריים מאותו נתיב: מסכה ברוחב של אלפי פיקסלים עלולה להצטייר כתמונה ענקית בזיכרון (בעיקר בספארי), ו-path נשאר וקטור בכל גודל. **הנתיב** מפורק פעם אחת לפקודות ומספרים, וכל פריים רק מכפיל ומזיז. פקודות מוחלטות בלבד (אותיות גדולות), כמו שיוצא מ-fontTools ומרוב התוכנות. **המקום העבה** נמצא כמו ב-g155: Path2D על canvas ו-distance transform. העוגן נודד ממקומו באות שבמנוחה אל מרכז המסך בזמן שהאות גדלה, וגודל הסיום הוא זה שבו העיגול הפנימי מכסה חצי אלכסון. ההגדלה מעריכית (`w0·(w1/w0)^z`). כשהאות פתוחה לגמרי ה-clip יורד, כדי שהתמונה לא תצויר מחדש בכל גלילה. ה-clip יושב על עטיפה ולא על התמונה, כי התמונה עצמה זזה קצת (scale), ו-clip על אלמנט עם transform זז איתו. **הקו** בעובי 2px אמיתיים: העובי מחושב ביחידות של הגופן לפי רוחב האות במנוחה. **האות** היא ש מ-Google Sans בעובי 700 (OFL), מחולצת ב-fontTools. בפרויקט מחליפים לנתיב הלוגו של הלקוח ואת ה-viewBox. **בהפחתת תנועה** רואים את התמונה עם הכיתוב, בלי האות.",
  libs:["gsap","ScrollTrigger"],
  css:`.lr{position:relative;background:var(--bg);color:var(--ink)}
.lr-pin{position:relative;min-height:100vh;min-height:100svh;overflow:hidden;display:grid;align-content:end}
.lr-win{position:absolute;inset:0;overflow:hidden}
.lr-ph{display:block;width:100%;height:100%;object-fit:cover}
.lr-mark{display:none;position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.lr-glyph{fill:var(--ink);fill-opacity:0;stroke:var(--ink);stroke-linejoin:round}
/* הכיתוב יושב על תמונה, לכן לבן על מעבר כהה קבוע ולא טוקנים: בעור כהה var(--bg) כהה ולא היה נקרא על התמונה */
.lr-cap{position:relative;padding:96px var(--gutter) 48px;color:#fff;background:linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,0))}
.lr-eyebrow{margin:0 0 12px;font-size:15px;font-weight:600}
.lr-title{margin:0 0 16px;font-size:var(--fs-h2);font-weight:700;line-height:1.1;max-width:18ch;text-wrap:balance}
.lr-text{margin:0;max-width:46ch;font-size:var(--fs-body);line-height:1.6}
/* האות קיימת רק תחת .mv-on. בלעדיו: התמונה עם הכיתוב */
.lr.mv-on{height:340vh}
.lr.mv-on .lr-pin{position:sticky;top:0;height:100vh;height:100svh;min-height:0}
.lr.mv-on .lr-win{opacity:0;visibility:hidden}
.lr.mv-on .lr-mark{display:block}
.lr.mv-on .lr-glyph{stroke-dasharray:1;stroke-dashoffset:1}
.lr.mv-on .lr-cap{opacity:0;visibility:hidden}`,
  html:`<section class="lr" aria-label="הסטודיו">
  <div class="lr-pin">
    <div class="lr-win"><img class="lr-ph" src="../assets/media/real/s13/room.webp" width="2200" height="1469" alt="פינת עבודה חשוכה: מנורת קריאה, כורסה ומדפים מוארים"></div>
    <svg class="lr-mark" viewBox="0 0 731 628" aria-hidden="true"><path class="lr-glyph" pathLength="1" d="M366 628Q296 628 230 606Q164 584 112.5 539.5Q61 495 30.5 427Q0 359 0 267V0H142V267Q142 333 162 378Q182 423 214.5 450Q247 477 287 489Q327 501 366 501Q407 501 446.5 489Q486 477 518 450Q550 423 569.5 378Q589 333 589 267V0H731V267Q731 359 701 427Q671 495 619.5 539.5Q568 584 502.5 606Q437 628 366 628ZM214 353Q175 353 141 340.5Q107 328 76 297V199Q108 227 139.5 239.5Q171 252 204 252Q255 252 276 225.5Q297 199 297 135V0H439V135Q439 200 415.5 249.5Q392 299 342.5 326Q293 353 214 353Z"/></svg>
    <div class="lr-cap">
      <p class="lr-eyebrow">הסטודיו</p>
      <h2 class="lr-title">כל מותג מתחיל באות אחת.</h2>
      <p class="lr-text">ומשם הוא נפתח לעולם שלם: אור, חומר, צבע, והאנשים שעובדים בו.</p>
    </div>
  </div>
</section>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה: התמונה עם הכיתוב
  const root=document.querySelector(".lr"); if(!root)return;
  const pin=root.querySelector(".lr-pin"), win=root.querySelector(".lr-win"), ph=root.querySelector(".lr-ph");
  const mark=root.querySelector(".lr-mark"), glyph=root.querySelector(".lr-glyph"), cap=root.querySelector(".lr-cap");
  const D=glyph.getAttribute("d"), VB=mark.viewBox.baseVal, GW=VB.width, GH=VB.height;
  // הנתיב מפורק פעם אחת לפקודות ומספרים, וכל פריים רק מכפיל ומזיז. פקודות מוחלטות בלבד (כמו שיוצא מ-fontTools):
  // ב-H יש רק x, ב-V רק y, ובכל השאר זוגות x,y
  const SEG=[]; D.replace(/([MLHVQCSTZ])([^MLHVQCSTZ]*)/g,function(m,c,a){ SEG.push([c,(a.match(/-?\\d*\\.?\\d+(?:e-?\\d+)?/g)||[]).map(Number)]); return m; });
  function pathAt(s,tx,ty){ return SEG.map(function(sg){ const c=sg[0]; return c+sg[1].map(function(v,i){ return (c==="V"||(c!=="H"&&i%2))?(v*s+ty).toFixed(1):(v*s+tx).toFixed(1); }).join(" "); }).join(""); }
  // המקום העבה ביותר באות (כמו ב-g155): distance transform על הנתיב מצויר ב-canvas, ביחידות של הגופן
  function thickest(cv){
    const w=cv.width, h=cv.height, a=cv.getContext("2d").getImageData(0,0,w,h).data, d=new Float32Array(w*h);
    for(let i=0;i<w*h;i++)d[i]=a[i*4+3]>128?1e6:0;
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){ const i=y*w+x; if(d[i])d[i]=Math.min(d[i],d[i-1]+3,d[i-w]+3,d[i-w-1]+4,d[i-w+1]+4); }
    let bi=0, bv=0;
    for(let y=h-2;y>0;y--)for(let x=w-2;x>0;x--){ const i=y*w+x; if(!d[i])continue; d[i]=Math.min(d[i],d[i+1]+3,d[i+w]+3,d[i+w+1]+4,d[i+w-1]+4); if(d[i]>bv){ bv=d[i]; bi=i; } }
    return {x:bi%w, y:(bi/w)|0, r:bv/3};
  }
  const T=(function(){ const k=.5, pad=4, cv=document.createElement("canvas");
    cv.width=Math.ceil(GW*k)+pad*2; cv.height=Math.ceil(GH*k)+pad*2;
    const c=cv.getContext("2d",{willReadFrequently:true}); c.translate(pad,pad); c.scale(k,k); c.fill(new Path2D(D));
    const t=thickest(cv); return {x:(t.x-pad)/k, y:(t.y-pad)/k, r:t.r/k}; })();
  const inOut=gsap.parseEase("power2.inOut");
  gsap.matchMedia().add({mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)",desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)"},function(){
    root.classList.add("mv-on");
    const G={}, st={z:0};
    function measure(){
      G.W=pin.clientWidth; G.H=pin.clientHeight;
      G.w0=Math.min(G.W*.72,G.H*.62*GW/GH);                    // האות במנוחה: עד 72% מהרוחב ו-62% מהגובה
      G.x0=(G.W-G.w0)/2; G.y0=(G.H-G.w0*GH/GW)/2;
      G.w1=Math.hypot(G.W,G.H)/2/T.r*GW*1.06;                  // הרוחב שבו העיגול הפנימי, במרכז המסך, מכסה חצי אלכסון
      gsap.set(mark,{x:G.x0,y:G.y0,width:G.w0,height:G.w0*GH/GW});
      glyph.style.strokeWidth=(2*GW/G.w0).toFixed(2);          // קו של 2px אמיתיים, למרות שהוא מצויר ביחידות של הגופן
    }
    function apply(){
      if(st.z>=1){ win.style.clipPath="none"; return; }         // פתוח לגמרי: בלי clip, ובלי צביעה מחדש בכל גלילה
      const s0=G.w0/GW, s=G.w0*Math.pow(G.w1/G.w0,st.z)/GW;    // הגדלה מעריכית: כל קטע גלילה מכפיל באותו שיעור
      const e=inOut(Math.min(1,st.z*1.8));                     // העוגן מגיע למרכז המסך כבר בחצי הראשון של ההגדלה
      const px0=G.x0+T.x*s0, py0=G.y0+T.y*s0, px=px0+(G.W/2-px0)*e, py=py0+(G.H/2-py0)*e;
      win.style.clipPath='path("'+pathAt(s,px-T.x*s,py-T.y*s)+'")';
    }
    measure(); apply();
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.to(glyph,{strokeDashoffset:0,autoRound:false,duration:.24,ease:"power1.inOut"},0)     // הקו מצייר את האות. autoRound:false: אחרת GSAP מעגל px לשלם, ובנתיב באורך 1 הקו קופץ מריק למלא
      .to(glyph,{fillOpacity:1,duration:.08},.2)                                             // האות מתמלאת, כמו לוגו
      .fromTo(win,{autoAlpha:0},{autoAlpha:1,duration:.06},.3)                               // התמונה כבר שם, חתוכה לאות, מתחת למילוי
      .fromTo(ph,{scale:1.12},{scale:1,duration:.6},.3)
      .to(glyph,{fillOpacity:0,strokeOpacity:0,duration:.1},.32)                             // המילוי נעלם ודרך האות רואים את התמונה
      .to(st,{z:1,duration:.44,ease:"power1.inOut",onUpdate:apply},.4)
      .fromTo(cap,{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.1},.84)
      .to({},{duration:.06},.94);
    const onInit=function(){ measure(); }, onRef=function(){ apply(); };
    ScrollTrigger.addEventListener("refreshInit",onInit); ScrollTrigger.addEventListener("refresh",onRef);
    return function(){
      ScrollTrigger.removeEventListener("refreshInit",onInit); ScrollTrigger.removeEventListener("refresh",onRef);
      win.style.clipPath=""; glyph.style.strokeWidth="";
      gsap.set(mark,{clearProps:"all"});
      root.classList.remove("mv-on");
    };
  });
})();`
}
];
