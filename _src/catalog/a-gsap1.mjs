// GSAP moves G1-G11 (מקור: references/gsap/moves.md)
export default [
{
  id:"g01", cat:"gsap", name:"גלילה צידית מוצמדת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"הסקשן ננעל למסך והתוכן גולש הצידה במקום למטה. המהלך המבוקש ביותר.",
  when:"תהליך שלבים, גלריית עבודות, קטגוריות.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה הרצועה נגללת לצד ביד. החיתוך, הגובה והמירכוז רק כשהמהלך רץ */
.wrapper{transition:all 0s !important;overflow-x:auto;background:var(--bg)}
.wrapper.gsap-live{overflow:hidden;height:100vh;display:flex;align-items:center}
.scroll{flex:none;display:flex;gap:24px;width:max-content;padding:80px var(--gutter)}
.scroll .ph{flex:0 0 clamp(300px,26vw,460px);height:clamp(240px,20vw,360px);font-size:22px}`,
  html:`<div class="wrapper"><div class="scroll">
<div class="ph ph-a">כרטיס 01</div><div class="ph ph-b">כרטיס 02</div><div class="ph ph-c">כרטיס 03</div>
<div class="ph ph-e">כרטיס 04</div><div class="ph ph-d">כרטיס 05</div><div class="ph ph-f">כרטיס 06</div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הרצועה נשארת גלילה צידית רגילה
  const wrap=document.querySelector(".wrapper"),container=wrap.querySelector(".scroll");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    wrap.classList.add("gsap-live");
    // נמדד מחדש בכל refresh: אחרי שינוי גודל או סיבוב מסך הכרטיס האחרון לא נחתך
    const total=()=>container.scrollWidth-wrap.clientWidth;
    gsap.to(container,{x:()=>total(),ease:"none",   // אתר עברי: x חיובי. אתר אנגלי: -total()
      scrollTrigger:{trigger:wrap,start:"top top",end:()=>"+="+total(),scrub:true,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
    return()=>wrap.classList.remove("gsap-live");
  });
})();`,
  note:"אתר עברי: x חיובי. אתר אנגלי: מוסיפים מינוס. אזהרה חתומה: בלי overscroll-behavior:none על העטיפה (חוסם גלגלת). בהפחתת תנועה, וכש-GSAP לא נטען, אין נעילה: הרצועה נגללת לצד ביד, והמחלקה gsap-live (שהסקריפט מוסיף) היא שמסתירה את מה שמחוץ למסך."
},
{
  id:"g02", cat:"gsap", name:"חשיפת תמונה במסכה בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"התמונה נצבעת מלמטה למעלה בקו חד, בקצב הגלילה, קדימה ואחורה.",
  when:"תמונת שיא, לפני/אחרי, ויז'ואל הירו משני.",
  libs:["gsap","ScrollTrigger"],
  css:`/* קצה חד, בלי דהייה (ליאב, דוח הסקירה 4.10.2026: "פחות אוהב את ה-FADE... שיהיה רגיל") */
.paint{--reveal:100%;--feather:0%;width:min(680px,80vw);height:clamp(300px,36vw,520px);margin-inline:auto;
-webkit-mask-image:linear-gradient(to top,#000 0%,#000 var(--reveal),transparent calc(var(--reveal) + var(--feather)),transparent 100%);
mask-image:linear-gradient(to top,#000 0%,#000 var(--reveal),transparent calc(var(--reveal) + var(--feather)),transparent 100%);
-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;font-size:26px}`,
  html:`<div class="stage"><div class="paint ph ph-e">התמונה נצבעת</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP התמונה גלויה במלואה (--reveal:100% ב-CSS)
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // כל .paint בעמוד מקבל חשיפה משלו, והמשתנה מונפש ישירות בלי לשאול את ה-DOM בכל פריים
    gsap.utils.toArray(".paint").forEach(el=>{
      gsap.fromTo(el,{"--reveal":"0%"},{"--reveal":"100%",ease:"none",
        scrollTrigger:{trigger:el,start:"top 85%",end:"top 25%",scrub:true}});
    });
  });
})();`
},
{
  id:"g03", cat:"gsap", name:"חור מסכה שנפתח על מדיה", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"המדיה מציצה דרך עיגול קטן; בגלילה העיגול מתרחב עד מסך מלא.",
  when:"רגע שיא קולנועי, חשיפת מוצר או וידאו.",
  libs:["gsap","ScrollTrigger"],
  css:`.maskv{--mask-size:16vw;position:relative;height:100vh;transition:all 0s}
/* המסכה רק כשהמהלך רץ. בלי GSAP ובהפחתת תנועה המדיה גלויה במלואה ולא נשאר ממנה עיגול קטן */
.maskv.gsap-live{
-webkit-mask-image:radial-gradient(circle var(--mask-size) at 50% 50%,#000 0 50%,transparent 50% 100%);
mask-image:radial-gradient(circle var(--mask-size) at 50% 50%,#000 0 50%,transparent 50% 100%);
-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;
-webkit-mask-size:100% 100%;mask-size:100% 100%}
.maskv .inner{position:absolute;inset:0;background:linear-gradient(135deg,#3b2667,#bc78ec);display:flex;align-items:center;justify-content:center;color:#fff;font-size:clamp(26px,3vw,46px);font-weight:700}
@media(max-width:767px){.maskv{--mask-size:140px}}`,
  html:`<div class="maskv"><div class="inner">המדיה שלך כאן</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המדיה גלויה במלואה
  const m=document.querySelector(".maskv");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    m.classList.add("gsap-live");
    gsap.timeline({scrollTrigger:{trigger:m,start:"top top",end:"+=800",scrub:1,pin:true,anticipatePin:1}})
      .to(m,{"--mask-size":"250vw",ease:"none"},0);
    return()=>m.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g04", cat:"gsap", name:"טקסט נחשף בגלילה: שלוש רמות", tech:"GSAP · SplitText", status:"ממתין",
  desc:"שלוש עוצמות חשיפה לכותרת: מילים עולות מ-clip, מילים מתבהרות, והכותרת נמחקת מהצד.",
  when:"כותרות סקשן באתרי סטוריטלינג. בעברית מפצלים למילים בלבד, לא לאותיות.",
  libs:["gsap","ScrollTrigger","SplitText"],
  css:`.tstage h2{font-size:var(--fs-demo);line-height:1.2;max-width:22ch;margin:0 auto clamp(120px,14vw,260px)}`,
  html:`<div class="stage tight tstage center">
<h2 class="t-clip">רמה א: המילים עולות מתוך מסכה, מילה אחרי מילה, בקצב הגלילה</h2>
<h2 class="t-fade">רמה ב: המילים מתבהרות בעדינות משקיפות חלקית אל מלאה</h2>
<h2 class="t-wipe">רמה ג: הכותרת כולה נמחקת ונחשפת מהצד בתנועה אחת</h2>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכותרות פשוט גלויות
  const st=(h,a,b)=>({trigger:h,start:a,end:b,scrub:1});
  const mm=gsap.matchMedia();
  mm.add({desk:"(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mob:"(max-width: 767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const {desk,mob}=ctx.conditions;
    if(!desk&&!mob)return;
    const splits=[];
    // עברית: מפצלים למילים בלבד. בלי lines: ב-RTL הפיצול לשורות מזהה כל כותרת כשורה אחת
    const words=h=>{const s=new SplitText(h,{type:"words"});splits.push(s);return s.words;};
    // רמה ב: המילים מתבהרות. stagger 0.5 בטווין scrub הוא חלק ממרחק הגלילה, לא מילישניות
    const fade=h=>gsap.from(words(h),{opacity:.15,stagger:.5,scrollTrigger:st(h,"top 80%","top 30%")});
    // רמה א: המילים עולות מ-clip. בטלפון clip על מילים קטנות מרצד, ולכן שם היא מקבלת את רמה ב
    document.querySelectorAll(".t-clip").forEach(h=>{
      if(mob)return fade(h);
      gsap.from(words(h),{clipPath:"inset(100% 0% 0% 0%)",opacity:0,stagger:.5,scrollTrigger:st(h,"top 80%","top 30%")});
    });
    document.querySelectorAll(".t-fade").forEach(fade);
    // רמה ג: הכותרת כולה נמחקת מהצד, בלי פיצול. scrub: הגלילה היא העקומה, ולכן ease:"none"
    document.querySelectorAll(".t-wipe").forEach(h=>{
      gsap.from(h,{clipPath:"inset(0% 0% 0% 100%)",ease:"none",scrollTrigger:st(h,"top 70%","top 40%")});
    });
    return()=>splits.forEach(s=>s.revert());
  });
})();`,
  note:"בטלפון רמה א מתנהגת כמו רמה ב (clip על מילים קטנות מרצד), ורמה ג נשארת. בהפחתת תנועה, וכש-GSAP לא נטען, הכותרות גלויות מההתחלה."
},
{
  id:"g05", cat:"gsap", name:"מסך מפוצל: תמונות מתחלפות לפי טקסט", tech:"GSAP · ScrollTrigger · sticky", status:"ממתין",
  desc:"צד תמונה דביק וצד טקסט גולל; כל בלוק טקסט שמגיע מחליף את התמונה ב-crossfade.",
  when:"הצגת שירותים או פרקים עם ויז'ואל לכל אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`.sync{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);padding-inline:var(--gutter)}
.sync-media{position:sticky;top:15vh;height:70vh}
.sync-media .ph{position:absolute;inset:0;font-size:24px}
.sync-texts .block{min-height:80vh;display:flex;flex-direction:column;justify-content:center}
.sync-texts h2{font-size:var(--fs-h2)}
.sync-texts p{color:var(--muted);max-width:40ch}
/* בטלפון המדיה דביקה בראש המסך והטקסט עובר מתחתיה. static כאן הוציא את התמונות (absolute) אל ה-body */
@media(max-width:767px){.sync{grid-template-columns:1fr}.sync-media{position:sticky;top:0;height:38vh;order:-1;z-index:1}.sync-texts .block{min-height:60vh}}`,
  html:`<div class="sync">
<div class="sync-texts">
  <div class="block sync-t"><h2>פרק ראשון</h2><p>כשהבלוק הזה במרכז המסך רואים את הכחול.</p></div>
  <div class="block sync-t"><h2>פרק שני</h2><p>הגעת לכאן? הסגול נכנס בהדרגה מעל הכחול.</p></div>
  <div class="block sync-t"><h2>פרק שלישי</h2><p>והירוק סוגר את הסיפור.</p></div>
</div>
<div class="sync-media">
  <div class="ph ph-a si-1">תמונה 1</div>
  <div class="ph ph-b si-2" style="opacity:1">תמונה 2</div>
  <div class="ph ph-d si-3" style="opacity:1">תמונה 3</div>
</div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת התמונה העליונה והטקסט כולו קריא
  const texts=gsap.utils.toArray(".sync-t");
  gsap.matchMedia().add({desk:"(min-width: 768px)",mob:"(max-width: 767px)",rm:"(prefers-reduced-motion: reduce)"},ctx=>{
    const {mob,rm}=ctx.conditions;
    // בטלפון הטקסט עובר מתחת למדיה הדביקה, ולכן ההחלפה מתחילה ונגמרת נמוך יותר במסך
    const start=mob?"top 85%":"top 60%",end=mob?"top 55%":"top 30%",mid=mob?"top 70%":"top 45%";
    texts.forEach((txt,i)=>{
      if(!i)return;
      const img=".si-"+(i+1);
      if(rm){                               // הפחתת תנועה: התמונה מתחלפת מיד, בלי דהייה
        gsap.set(img,{autoAlpha:0});
        ScrollTrigger.create({trigger:txt,start:mid,end:"max",onToggle:s=>gsap.set(img,{autoAlpha:s.isActive?1:0})});
        return;
      }
      // autoAlpha: תמונה שקופה מקבלת גם visibility:hidden, ולא מכסה את זו שמתחתיה
      gsap.from(img,{autoAlpha:0,ease:"none",scrollTrigger:{trigger:txt,start,end,scrub:1}});
    });
  });
})();`
},
{
  id:"g06", cat:"gsap", name:"גלריה נגררת עם אינרציה", tech:"GSAP · Draggable · Inertia", status:"ממתין",
  desc:"גריד שגוררים ביד והוא ממשיך בתנופה ונבלם ברכות בגבולות.",
  when:"פורטפוליו, גלריה חופשית. במגע זה הבית הטבעי שלו.",
  libs:["gsap","Draggable","InertiaPlugin"],
  css:`/* בלי GSAP המסגרת נגללת רגיל, כך שכל הגריד נגיש גם בלי גרירה */
.dragw{height:60vh;border:2px dashed #ccc;border-radius:var(--r);overflow:auto;margin-inline:var(--gutter)}
.dragw.gsap-live{overflow:hidden}
.drag{display:grid;grid-template-columns:repeat(4,240px);gap:16px;padding:24px;width:max-content}
.gsap-live .drag{cursor:grab}
.gsap-live .drag:active{cursor:grabbing}
.drag .ph{height:170px}
/* במגע הגרירה אופקית בלבד כדי שהחלקה אנכית תגלול את העמוד, ולכן המסגרת בגובה הגריד וכל השורות גלויות */
@media (pointer:coarse){.dragw{height:auto}}`,
  html:`<div class="stage tight"><div class="dragw"><div class="drag">
<div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div>
<div class="ph ph-e">5</div><div class="ph ph-f">6</div><div class="ph ph-b">7</div><div class="ph ph-a">8</div>
<div class="ph ph-c">9</div><div class="ph ph-d">10</div><div class="ph ph-e">11</div><div class="ph ph-f">12</div>
</div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המסגרת פשוט נגללת
  const w=document.querySelector(".dragw");
  // במגע רק ציר x: עם x,y ה-Draggable שם touch-action:none, וכל החלקה על הגלריה גוררת אותה
  // במקום לגלול את העמוד. עם x הוא משאיר pan-y והעמוד נגלל כרגיל
  gsap.matchMedia().add({coarse:"(pointer: coarse)",fine:"(pointer: fine)",reduce:"(prefers-reduced-motion: reduce)"},ctx=>{
    const {coarse,reduce}=ctx.conditions;
    w.classList.add("gsap-live");
    const d=Draggable.create(".drag",{type:coarse?"x":"x,y",edgeResistance:.65,bounds:w,inertia:!reduce})[0];
    return()=>{d.kill();w.classList.remove("gsap-live");};
  });
})();`,
  runway:false,
  note:"שלוש שורות, כך שהגריד גבוה מהמסגרת ויש מה לחשוף גם בגרירה אנכית. במגע הגרירה אופקית בלבד (החלקה אנכית גוללת את העמוד) והמסגרת גדלה לגובה הגריד. בהפחתת תנועה הגרירה נשארת, בלי התנופה."
},
{
  id:"g07", cat:"gsap", name:"תמונות רודפות עכבר (Image Trail)", tech:"GSAP · ticker", status:"ממתין",
  desc:"מניפת תמונות שרודפת אחרי הסמן במהירויות שונות: הראשונה צמודה, האחרונות משתרכות.",
  when:"הירו של פורטפוליו או סטודיו, סקשן playful. במובייל כבוי.",
  libs:["gsap"],
  css:`.tzone{height:60vh;border:2px dashed #ccc;border-radius:var(--r);display:flex;align-items:center;justify-content:center;margin-inline:var(--gutter);color:var(--muted)}
.timg{width:130px;height:95px;border-radius:10px;position:fixed;left:0;top:0;pointer-events:none;z-index:99;opacity:0;font-size:18px}`,
  html:`<div class="stage tight"><div class="tzone"><p>הזז את העכבר כאן</p>
<div class="timg ph ph-a">1</div><div class="timg ph ph-b">2</div><div class="timg ph ph-c">3</div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const zone=document.querySelector(".tzone"),imgs=[...document.querySelectorAll(".timg")];
  // רק עם עכבר ובלי הפחתת תנועה. במגע הקשה יורה mouseenter והתמונות נתקעות בנקודת ההקשה
  gsap.matchMedia().add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",()=>{
    let mx=0,my=0,inside=false;
    const st=imgs.map(()=>({x:0,y:0}));
    const place=()=>imgs.forEach((img,i)=>gsap.set(img,{x:st[i].x-65,y:st[i].y-48}));
    const move=e=>{mx=e.clientX;my=e.clientY};
    // בכניסה כל התמונות מתחילות בנקודת הכניסה, לא בפינת המסך ולא בנקודת היציאה הקודמת
    const enter=e=>{inside=true;move(e);st.forEach(s=>{s.x=mx;s.y=my});place();imgs.forEach(i=>i.style.opacity=1)};
    const leave=()=>{inside=false;imgs.forEach(i=>i.style.opacity=0)};
    const tick=()=>{if(!inside)return;
      st.forEach((s,i)=>{const k=.15-i*.04;s.x+=(mx-s.x)*k;s.y+=(my-s.y)*k});   // הראשונה צמודה, האחרונות משתרכות
      place();};
    zone.addEventListener("mouseenter",enter);zone.addEventListener("mouseleave",leave);
    document.addEventListener("mousemove",move);gsap.ticker.add(tick);
    return()=>{leave();gsap.ticker.remove(tick);document.removeEventListener("mousemove",move);
      zone.removeEventListener("mouseenter",enter);zone.removeEventListener("mouseleave",leave);};
  });
})();`,
  runway:false,
  note:"התמונות הן position:fixed עם עוגן פיזי left:0. בפרויקט מציבים אותן כילדים ישירים של body, לא בתוך סקשן עם reveal, filter או הצמדה, אחרת הן נמדדות מהאב ולא מהמסך. במגע ובהפחתת תנועה המהלך כבוי והתמונות לא מופיעות."
},
{
  id:"g08", cat:"gsap", name:"סמן מותאם + פנס", tech:"GSAP · ticker · vanilla", status:"ממתין",
  desc:"עיגול סמן שרודף את העכבר וגדל מעל לחיצים, וכתם אור מטושטש שמאיר רקע כהה סביב הסמן.",
  when:"אתרי וואו כהים, פורטפוליו. במובייל כבוי.",
  libs:["gsap"],
  css:`.fzone{position:relative;height:70vh;background:#101223;border-radius:var(--r);margin-inline:var(--gutter);overflow:hidden;display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center;color:#fff}
.flash{position:absolute;left:0;top:0;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,#f4c66044,transparent 65%);filter:blur(40px);pointer-events:none;opacity:0;transition:opacity .3s}
.follow{width:22px;height:22px;border-radius:50%;background:#fff /* qa-allow: white, ידית/סמן ולא משטח טקסט */;mix-blend-mode:difference;position:fixed;left:0;top:0;pointer-events:none;z-index:99;opacity:0}
.fzone button{min-height:48px;padding-inline:26px;border-radius:999px;border:1px solid #fff5;background:transparent;color:#fff;font-family:inherit;font-size:15px;cursor:pointer}`,
  html:`<div class="stage tight"><div class="fzone">
<div class="flash"></div>
<p>הזז את העכבר. שים לב לפנס ולעיגול הסמן</p>
<button>כפתור לבדיקת הסמן</button>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const fz=document.querySelector(".fzone"),fl=fz.querySelector(".flash");
  // רק עם עכבר ובלי הפחתת תנועה. במגע הקשה משאירה את העיגול תקוע בנקודה
  gsap.matchMedia().add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",()=>{
    const fo=document.createElement("div");fo.className="follow";document.body.appendChild(fo);
    // הפנס זז ב-transform ולא ב-left/top, והמדידה רק בתוך האזור
    gsap.set(fl,{xPercent:-50,yPercent:-50});
    const fx=gsap.quickSetter(fl,"x","px"),fy=gsap.quickSetter(fl,"y","px");
    let mx=0,my=0,px=0,py=0,inside=false;
    const move=e=>{mx=e.clientX;my=e.clientY;const r=fz.getBoundingClientRect();fx(mx-r.left);fy(my-r.top)};
    // סמן של האזור, כמו הפנס: מופיע בכניסה, במקום הכניסה, ונעלם ביציאה
    const enter=e=>{inside=true;move(e);px=mx;py=my;gsap.set(fo,{x:px-11,y:py-11});fl.style.opacity=1;fo.style.opacity=1};
    const leave=()=>{inside=false;fl.style.opacity=0;fo.style.opacity=0};
    const tick=()=>{if(!inside)return;px+=(mx-px)*.2;py+=(my-py)*.2;gsap.set(fo,{x:px-11,y:py-11})};
    const grow=()=>gsap.to(fo,{scale:2.4,duration:.3,ease:"power2.out"}),shrink=()=>gsap.to(fo,{scale:1,duration:.3,ease:"power2.out"});
    const hot=fz.querySelectorAll("button,a");
    fz.addEventListener("mousemove",move);fz.addEventListener("mouseenter",enter);fz.addEventListener("mouseleave",leave);
    hot.forEach(t=>{t.addEventListener("mouseenter",grow);t.addEventListener("mouseleave",shrink)});
    gsap.ticker.add(tick);
    return()=>{leave();gsap.ticker.remove(tick);fo.remove();
      fz.removeEventListener("mousemove",move);fz.removeEventListener("mouseenter",enter);fz.removeEventListener("mouseleave",leave);
      hot.forEach(t=>{t.removeEventListener("mouseenter",grow);t.removeEventListener("mouseleave",shrink)});};
  });
})();`,
  runway:false,
  note:"זה סמן של אזור, לא של כל האתר: העיגול והפנס מופיעים בכניסה לאזור ונעלמים ביציאה, והסמן הרגיל נשאר. לסמן של כל האתר מציגים את העיגול ב-mousemove הראשון על document ומסתירים ב-mouseleave של document.documentElement. במגע ובהפחתת תנועה המהלך כבוי."
},
{
  id:"g09", cat:"gsap", name:"זריקה אינרציאלית בהובר", tech:"GSAP · InertiaPlugin", status:"ממתין",
  desc:"מרחפים על פריט והוא נזרק בכיוון תנועת העכבר וחוזר למקומו ברכות.",
  when:"גריד לוגואים, תגיות או צ'יפים באתר playful. במובייל כבוי.",
  libs:["gsap","InertiaPlugin"],
  css:`.throw-grid{display:flex;gap:20px;flex-wrap:wrap;justify-content:center;padding-inline:var(--gutter)}
.throw-item{width:110px;height:110px;border-radius:16px;font-size:17px}`,
  html:`<div class="stage tight"><div class="throw-grid">
<div class="throw-item ph ph-a">לוגו</div><div class="throw-item ph ph-b">לוגו</div><div class="throw-item ph ph-c">לוגו</div>
<div class="throw-item ph ph-d">לוגו</div><div class="throw-item ph ph-e">לוגו</div><div class="throw-item ph ph-f">לוגו</div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  // רק עם עכבר ובלי הפחתת תנועה. במגע הקשה ואחריה הקשה במקום אחר יורה mouseleave עם מהירות ישנה
  gsap.matchMedia().add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",()=>{
    const clamp=gsap.utils.clamp(-2000,2000);  // תקרת מהירות: החלקה מהירה לא זורקת פריט אל מחוץ למסך
    const off=[];
    document.querySelectorAll(".throw-item").forEach(el=>{
      let vx=0,vy=0,lx=0,ly=0;
      // המהירות נמדדת מנקודת הכניסה, לא מהנקודה האחרונה של הביקור הקודם (או מ-0,0 בביקור הראשון)
      const enter=e=>{lx=e.clientX;ly=e.clientY;vx=vy=0};
      const move=e=>{vx=e.clientX-lx;vy=e.clientY-ly;lx=e.clientX;ly=e.clientY};
      // נקודת היציאה היא הצעד האחרון: כך גם החלקה שנתנה רק אירוע אחד בתוך הפריט זורקת אותו בכיוון היציאה
      const leave=e=>{if(e.clientX!==lx||e.clientY!==ly)move(e);
        gsap.to(el,{inertia:{x:{velocity:clamp(vx*40),end:0},y:{velocity:clamp(vy*40),end:0}},duration:1.2});};
      el.addEventListener("mouseenter",enter);el.addEventListener("mousemove",move);el.addEventListener("mouseleave",leave);
      off.push(()=>{el.removeEventListener("mouseenter",enter);el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave);});
    });
    return()=>off.forEach(f=>f());
  });
})();`,
  runway:false
},
{
  id:"g11", cat:"gsap", name:"זכוכית מגדלת על תמונה", tech:"vanilla JS", status:"ממתין",
  desc:"עיגול הגדלה עוקב עכבר על תמונה, זום 1.5.",
  when:"מוצר עתיר פרטים, תיק עבודות, תכשיטים. במובייל כבוי (pinch-zoom טבעי עדיף).",
  libs:[],
  css:`.mag-wrap{position:relative;width:min(640px,86vw);margin-inline:auto}
.mag-img{width:100%;aspect-ratio:16/10;border-radius:var(--r);background:
  radial-gradient(circle at 25% 30%,#ffd43b 0 8%,transparent 8%),
  radial-gradient(circle at 70% 60%,#ff8787 0 12%,transparent 12%),
  radial-gradient(circle at 45% 75%,#66d9e8 0 6%,transparent 6%),
  linear-gradient(160deg,#1b2653,#3b5bdb)}
.magnifier{position:absolute;pointer-events:none;width:190px;height:190px;border-radius:50%;
  border:2px solid #fff;background-repeat:no-repeat;transform:translate(-50%,-50%) scale(0);
  transition:transform .25s ease;z-index:5;box-shadow:0 10px 30px rgba(0,0,0,.3)}
@media (prefers-reduced-motion: reduce){.magnifier{transition:none}}`,
  html:`<div class="stage tight"><div class="mag-wrap"><div class="mag-img"></div></div></div>`,
  js:`(function(){
  const zoom=1.5,wrap=document.querySelector(".mag-wrap"),img=document.querySelector(".mag-img");
  const mag=document.createElement("div");mag.className="magnifier";wrap.appendChild(mag);
  // רק עם עכבר: במגע הקשה פותחת את העדשה והיא נשארת עד הקשה מחוץ לתמונה, ו-pinch-zoom טבעי עדיף.
  // נבדק בכל אירוע ולא פעם אחת, כך שמחשב עם מסך מגע ועכבר עובר בין המצבים לבד
  const fine=matchMedia("(hover: hover) and (pointer: fine)");
  function paint(){
    const w=img.offsetWidth,h=img.offsetHeight;
    // תמונת מוצר אמיתית היא <img>: העדשה לוקחת את הקובץ שהדפדפן בחר. בדמו זה div עם רקע
    mag.style.backgroundImage=img.tagName==="IMG"?'url("'+(img.currentSrc||img.src)+'")':getComputedStyle(img).backgroundImage;
    mag.style.backgroundSize=(w*zoom)+"px "+(h*zoom)+"px";
  }
  paint();addEventListener("resize",paint);
  if(img.decode)img.decode().then(paint,()=>{});   // <img> שעוד לא נטען: מציירים שוב כשהוא מוכן
  const lens=on=>mag.style.transform="translate(-50%,-50%) scale("+(on?1:0)+")";
  wrap.addEventListener("mouseenter",()=>{if(fine.matches)lens(true)});
  wrap.addEventListener("mousemove",e=>{
    if(!fine.matches)return;
    const r=img.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    mag.style.left=x+"px";mag.style.top=y+"px";
    mag.style.backgroundPosition=(-x*zoom+mag.offsetWidth/2)+"px "+(-y*zoom+mag.offsetHeight/2)+"px";
  });
  wrap.addEventListener("mouseleave",()=>lens(false));
})();`,
  runway:false,
  note:"בפרויקט התמונה היא בדרך כלל <img>, והעדשה לוקחת ממנה את currentSrc. אם התמונה ב-object-fit:cover, גודל הרקע של העדשה וההסטה שלה מחושבים לפי היחס הטבעי של הקובץ (naturalWidth, naturalHeight) ולא לפי הקופסה, אחרת העדשה מראה חלק אחר של התמונה. במגע העדשה כבויה."
}
];
