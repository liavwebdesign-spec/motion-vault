// סבב שני על גלריית Webflow (2.9.2026): 918 פרויקטים נמשכו מה-API של הגלריה,
// קובצו לפי טכניקה, והפערים האמיתיים מול המאגר נפתחו בלייב לפני הבנייה.
export default [
{
  id:"b47", cat:"behavior", name:"סליידר השוואה לפני ואחרי", tech:"GSAP · Draggable · clip-path", status:"ממתין",
  desc:"שתי תמונות באותה מסגרת וידית שנגררת ביניהן. גרירה ימינה או שמאלה חושפת יותר מכל צד, וגם החצים במקלדת מזיזים אותה.",
  when:"שיפוץ, שיניים, אסתטיקה, כושר, ניקיון, עיצוב מחדש, לפני ואחרי של אתר. ההוכחה החזקה ביותר שיש: הלקוח רואה את ההבדל במקום לקרוא עליו.",
  libs:["gsap","Draggable"],
  css:`.ba{position:relative;max-width:min(900px,94vw);margin-inline:auto;aspect-ratio:16/10;border-radius:var(--r);
  overflow:hidden;border:1px solid var(--line);user-select:none;touch-action:pan-y}
.ba-layer{position:absolute;inset:0;border-radius:0;font-size:0}
/* שכבת "לפני" יושבת מעל ונחתכת. inset(0 0 0 X) משאיר את מה שמימין ל-X */
.ba-before{clip-path:inset(0 0 0 50%)}
.ba-tag{position:absolute;top:14px;background:rgba(0,0,0,.62);color:#fff;font-size:13px;
  padding:6px 14px;border-radius:999px;backdrop-filter:blur(6px);z-index:3;pointer-events:none}
.ba-tag.is-before{right:14px}
.ba-tag.is-after{left:14px}
/* הידית: רוחב אפס שממוקם בפיקסלים פיזיים, והכפתור ממורכז עליה */
.ba-handle{position:absolute;top:0;left:0;width:0;height:100%;z-index:4;cursor:ew-resize}
.ba-line{position:absolute;top:0;left:-1px;width:2px;height:100%;background:#fff /* qa-allow: white, ידית/סמן ולא משטח טקסט */;box-shadow:0 0 0 1px rgba(0,0,0,.18)}
.ba-knob{color:#16182b /* qa-allow: literal, ידית לבנה קשיחה */;position:absolute;top:50%;left:0;transform:translate(-50%,-50%);width:48px;height:48px;border-radius:50%;
  background:#fff /* qa-allow: white, ידית/סמן ולא משטח טקסט */;box-shadow:0 6px 20px rgba(0,0,0,.28);display:grid;place-items:center}
.ba-handle:focus-visible .ba-knob{outline:3px solid var(--accent);outline-offset:3px}
.ba-hint{text-align:center;color:var(--muted);font-size:14px;padding-top:14px}`,
  html:`<div class="stage tight">
  <div class="ba">
    <div class="ph ba-layer ba-after ph-d"></div>
    <div class="ph ba-layer ba-before ph-b"></div>
    <span class="ba-tag is-before">לפני</span>
    <span class="ba-tag is-after">אחרי</span>
    <div class="ba-handle" tabindex="0" role="slider" aria-label="השוואה בין לפני לאחרי"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="אחרי: 50 אחוז"><span class="ba-line"></span><span class="ba-knob"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
  </div>
  <p class="ba-hint">גרור את הידית, או השתמש בחצי המקלדת.</p>
</div>`,
  js:`(function(){
  const wrap=document.querySelector(".ba"),before=wrap.querySelector(".ba-before"),handle=wrap.querySelector(".ba-handle");
  // בלי הספרייה: הידית נשארת באמצע, על קו החיתוך של ה-CSS, ושתי התמונות גלויות חצי-חצי
  if(typeof gsap==="undefined"||typeof Draggable==="undefined"){handle.style.left="50%";return;}
  let drag;
  function paint(){
    const x=gsap.getProperty(handle,"x");
    const pct=Math.round(x/wrap.offsetWidth*100);
    before.style.clipPath="inset(0 0 0 "+x+"px)";
    handle.setAttribute("aria-valuenow",pct);
    // המספר לבד לא אומר לקורא מסך מה חשוף. "אחרי" הוא מה שנחשף משמאל לידית
    handle.setAttribute("aria-valuetext","אחרי: "+pct+" אחוז");
  }
  function build(){
    const w=wrap.offsetWidth;
    const pct=(+handle.getAttribute("aria-valuenow")||50)/100;
    if(drag)drag.kill();
    gsap.set(handle,{x:w*pct});
    drag=Draggable.create(handle,{type:"x",bounds:{minX:0,maxX:w},onDrag:paint,onThrowUpdate:paint})[0];
    paint();
  }
  // החצים פיזיים בכוונה: ידית נגררת נתפסת כאובייקט על המסך, לא כטקסט.
  // למעלה כמו ימינה ולמטה כמו שמאלה (כמו בכל slider), Home לקצה השמאלי ו-End לימני
  handle.addEventListener("keydown",e=>{
    const w=wrap.offsetWidth,step=e.shiftKey?w*.1:w*.02,cur=gsap.getProperty(handle,"x");
    const to={ArrowRight:cur+step,ArrowUp:cur+step,ArrowLeft:cur-step,ArrowDown:cur-step,Home:0,End:w}[e.key];
    if(to===undefined)return;
    e.preventDefault();
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(handle,{x:gsap.utils.clamp(0,w,to),duration:reduce?0:.18,ease:"power2.out",overwrite:true,onUpdate:paint,onComplete:paint});
  });
  build();
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(build,80);});
})();`,
  runway:false,
  note:"הידית עצמה היא אלמנט ברוחב אפס שממוקם ב-x פיזי, והכפתור ממורכז עליה בטרנספורם. זה מה שמאפשר להשתמש בערך אחד גם לחיתוך וגם למיקום, בלי לחשב חצי רוחב בכל פריים. `clip-path:inset(0 0 0 X)` משאיר את מה שמימין ל-X, ולכן בעברית \"לפני\" יושב בימין, וגרירה ימינה דוחקת אותו החוצה וחושפת את \"אחרי\". במקלדת עובדים ארבעת החצים, Home ו-End, ו-`aria-valuetext` אומר לקורא מסך כמה מ\"אחרי\" חשוף, כי המספר לבדו לא אומר כלום. בשינוי גודל חלון חייבים לבנות את ה-Draggable מחדש עם אותו אחוז, אחרת הידית קופצת החוצה מהגבולות."
},
{
  id:"b48", cat:"behavior", name:"ניווט עם התקדמות לפי סקשן", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"תפריט עוגנים צף שבו הפריט של הסקשן הנוכחי מתמלא בהדרגה תוך כדי הגלילה בו, ומתרוקן כשעוברים הלאה. אין הבהוב של \"פעיל\" או \"לא פעיל\".",
  when:"עמוד נחיתה ארוך, עמוד שירות, מסמך תנאים, מדריך. המבקר יודע כל הזמן איפה הוא ברצף וכמה נשאר, וזה מוריד נטישה באמצע.",
  libs:["gsap","ScrollTrigger","ScrollToPlugin"],
  css:`.pn{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:60;
  display:flex;gap:4px;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:5px;
  box-shadow:0 10px 30px rgba(20,20,40,.1)}
.pn a{position:relative;overflow:hidden;border-radius:999px;padding:9px 18px;font-size:14px;color:var(--muted);
  text-decoration:none;white-space:nowrap;transition:color .15s}
/* המילוי בגוון בהיר והטקסט כהה: כך התווית קריאה בכל שלב של המילוי, גם כשהוא מכסה רק חלק מהגלולה.
   מילוי מלא בצבע המבטא עם טקסט לבן השאיר את התווית לבנה על לבן בחצי הראשון של כל סקשן */
.pn a.on{color:var(--ink)}
@media (hover:hover) and (pointer:fine){.pn a:hover{color:var(--ink)}}
.pn a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pn-fill{position:absolute;inset:0;background:color-mix(in srgb,var(--accent) 22%,var(--card));z-index:-1}
.pn a span{position:relative;z-index:1}
.pn-sec{min-height:96vh;display:grid;place-items:center;text-align:center;padding-inline:var(--gutter);scroll-margin-top:90px}
.pn-sec h3{margin:0;font-size:clamp(30px,6vw,78px)}
.pn-sec p{margin:14px auto 0;color:var(--muted);max-width:46ch;font-size:17px;line-height:1.7}
@media(max-width:640px){.pn{width:calc(100% - 24px);justify-content:space-between}
  .pn a{padding:0 10px;font-size:13px;min-height:44px;display:inline-flex;align-items:center}}`,
  html:`<nav class="pn" aria-label="ניווט בעמוד">
  <a href="#pn1"><span>שירותים</span><i class="pn-fill"></i></a>
  <a href="#pn2"><span>תהליך</span><i class="pn-fill"></i></a>
  <a href="#pn3"><span>מחירים</span><i class="pn-fill"></i></a>
  <a href="#pn4"><span>שאלות</span><i class="pn-fill"></i></a>
</nav>
<section class="pn-sec" id="pn1"><div><h3>שירותים</h3><p>מה אנחנו עושים ולמי זה מתאים, בלי רשימת באזזוורדס.</p></div></section>
<section class="pn-sec" id="pn2"><div><h3>תהליך</h3><p>ארבעה שלבים מהשיחה הראשונה ועד העלייה לאוויר.</p></div></section>
<section class="pn-sec" id="pn3"><div><h3>מחירים</h3><p>שלוש חבילות, טווח ברור, בלי הפתעות בסוף.</p></div></section>
<section class="pn-sec" id="pn4"><div><h3>שאלות</h3><p>כל מה שנשאלנו עשר פעמים, מרוכז במקום אחד.</p></div></section>`,
  js:`(function(){
  const nav=document.querySelector(".pn");
  // בעמוד עם הדר דביק או קבוע בראש המסך, התפריט יושב 12 פיקסלים מתחתיו ולא עליו
  const under=()=>{let b=0;[...document.body.children].forEach(e=>{if(e===nav)return;const s=getComputedStyle(e),h=e.offsetHeight;
    if((s.position==="sticky"||s.position==="fixed")&&parseFloat(s.top)===0&&s.visibility!=="hidden"&&h<200)b=Math.max(b,h);});
    nav.style.top=(b?b+12:16)+"px";};
  under();addEventListener("resize",under);
  if(typeof gsap==="undefined")return;   // בלי הספרייה הקישורים הם עוגנים רגילים
  const links=[...nav.querySelectorAll("a")];
  const secs=links.map(l=>document.querySelector(l.getAttribute("href")));
  const mark=(link,on)=>{link.classList.toggle("on",on);on?link.setAttribute("aria-current","true"):link.removeAttribute("aria-current");};
  // conditions: אותו קוד לשני המצבים. בהפחתת תנועה אין מילוי מתקדם ואין החלקות:
  // הפריט של הסקשן הנוכחי מלא, השאר ריקים, והתפריט מופיע ונעלם בלי דהייה
  gsap.matchMedia().add({motion:"(prefers-reduced-motion: no-preference)",reduce:"(prefers-reduced-motion: reduce)"},ctx=>{
    const reduce=ctx.conditions.reduce;
    // התפריט מופיע רק כשהסקשנים על המסך. טריגר אחד על כל האזור, לא הצטברות של טריגרים לכל סקשן,
    // אחרת הוא נתקע גלוי אחרי קפיצת גלילה. בלי זה הוא יושב על ההדר של העמוד מהשנייה הראשונה
    // המצב נגזר מ-progress ולא מ-isActive, שעדיין לא מוגדר בריענון הראשון
    const inside=s=>s.progress>0&&s.progress<1;
    gsap.set(nav,{autoAlpha:0});
    ScrollTrigger.create({trigger:secs[0],start:"top 85%",endTrigger:secs[secs.length-1],end:"bottom 15%",
      onToggle:s=>gsap.to(nav,{autoAlpha:s.isActive?1:0,duration:reduce?0:.25,overwrite:true}),
      onRefresh:s=>gsap.set(nav,{autoAlpha:inside(s)?1:0,overwrite:true})});
    links.forEach((link,k)=>{
      const sec=secs[k],fill=link.querySelector(".pn-fill");
      if(!sec||!fill)return;
      // עמוד עברי: המילוי נכנס מימין ויוצא שמאלה, בכיוון הקריאה
      const paint=(self,refresh)=>{
        const p=self.progress,on=inside(self)&&p>.08;
        mark(link,on);
        // overwrite: בגלילה מהירה הלוך וחזור, טווין היציאה של onLeaveBack המשיך לרוץ מעל ה-set,
        // והקישור נשאר "פעיל" עם מילוי ריק
        if(inside(self))gsap.set(fill,{xPercent:reduce?(on?0:101):101-p*101,overwrite:true});
        // מחוץ לסקשן היציאה שייכת ל-onLeave ול-onLeaveBack; רק בטעינה מציבים ישר את מצב הסוף
        else if(refresh)gsap.set(fill,{xPercent:p>=1?-101:101,overwrite:true});
      };
      gsap.set(fill,{xPercent:101});
      ScrollTrigger.create({
        trigger:sec,start:"top center",end:"bottom center",
        onUpdate:s=>paint(s,false),
        // בטעינה ובריענון באמצע העמוד המצב נגזר מהגלילה בפועל, ולא ממחלקה שכתובה ב-HTML
        onRefresh:s=>paint(s,true),
        onLeave:()=>{gsap.to(fill,{xPercent:-101,duration:reduce?0:.3,ease:"power3.inOut",overwrite:true});mark(link,false);},
        onLeaveBack:()=>{gsap.to(fill,{xPercent:101,duration:reduce?0:.3,ease:"power3.inOut",overwrite:true});mark(link,false);}
      });
    });
  });
  links.forEach((link,k)=>link.addEventListener("click",e=>{
    if(!secs[k]||!window.ScrollToPlugin)return;
    e.preventDefault();
    const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(window,{duration:reduce?0:.8,ease:"power2.inOut",scrollTo:{y:secs[k],offsetY:nav.offsetTop+nav.offsetHeight+16},overwrite:true});
  }));
})();`,
  runway:true,
  note:"ההבדל מ\"קישור פעיל\" רגיל הוא שהמילוי הוא scrub ולא מצב בינארי, ולכן רואים גם כמה נשאר מהסקשן. **המלכודת בעברית**: המימוש המקורי מחליק את המילוי מ-xPercent שלילי, כלומר משמאל, וזה מרגיש הפוך. בעברית מתחילים ב-101, נכנסים לאפס ויוצאים למינוס. `onLeaveBack` חובה, אחרת בגלילה כלפי מעלה המילוי נשאר תקוע מלא, ו-`overwrite:true` בכל טווין ו-set של המילוי, אחרת בגלילה מהירה הלוך וחזור טווין היציאה ממשיך לרוץ והקישור נשאר \"פעיל\" עם מילוי ריק. **המילוי בגוון בהיר והטקסט כהה**, כך שהתווית קריאה בכל שלב; מילוי מלא במבטא עם טקסט לבן השאיר אותה לבנה על לבן בחצי הראשון של כל סקשן. המצב הפעיל נגזר מהגלילה גם בטעינה (`onRefresh`), ולא ממחלקה שכתובה ב-HTML. התפריט מופיע רק כשהסקשנים על המסך, לפי טריגר אחד על כל האזור. בעמוד עם הדר קבוע, התפריט יושב מתחתיו: top בגובה ההדר ועוד 12 פיקסלים. הקוד מודד את זה לבד (כאן זה שורת הכותרת של המאגר), והגלילה בלחיצה עוצרת מתחת לשניהם. הסקשנים מקבלים scroll-margin כדי שהעוגן לא ייעצר מתחת לתפריט הצף. בהפחתת תנועה הפריט של הסקשן הנוכחי מלא והשאר ריקים, בלי מילוי מתקדם ובלי החלקות."
},
{
  id:"b49", cat:"behavior", name:"טאבים שמתקדמים לבד עם פס זמן", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שורת טאבים שמתחלפת מעצמה, כשמתחת לכל כותרת רץ פס שמראה כמה זמן נשאר. מעבר עכבר עוצר, לחיצה קופצת לטאב ועוצרת את ההתקדמות האוטומטית, והכל מתחיל רק כשרואים את הסקשן.",
  when:"הצגת יכולות, שלבי שירות, סוגי לקוחות, פיצ'רים. המבקר רואה את כל התוכן גם אם לא לחץ על כלום, וזה בדיוק מה שקורה ברוב הביקורים.",
  libs:["gsap","ScrollTrigger"],
  css:`.at{max-width:min(1020px,94vw);margin-inline:auto}
.at-links{display:flex;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--line);margin-bottom:clamp(20px,3vw,34px)}
.at-btn{position:relative;border:0;background:none;font:inherit;font-size:16px;color:var(--muted);min-width:44px;
  padding:12px 4px 16px;margin-inline-end:20px;cursor:pointer;transition:color .18s}
.at-btn.on{color:var(--ink);font-weight:600}
@media (hover:hover) and (pointer:fine){.at-btn:hover{color:var(--ink)}}
.at-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
.at-bar{position:absolute;bottom:-1px;right:0;height:2px;width:0;background:var(--accent);border-radius:2px}
.at-panel{display:none;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,50px);align-items:center}
.at-panel.on{display:grid}
.at-panel h4{margin:0 0 10px;font-size:clamp(20px,2.4vw,32px)}
.at-panel p{margin:0;color:var(--muted);font-size:17px;line-height:1.75;max-width:44ch}
.at-panel ul{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:8px;color:var(--muted);font-size:15px}
.at-panel li::before{content:"✓";color:#2b8a3e;font-weight:700;margin-inline-end:8px}
.at-media{aspect-ratio:4/3;font-size:30px}
/* בטלפון ארבעת הטאבים נכנסים בשורה אחת, כולם על המסך. שורה נגללת רק מחמישה טאבים */
@media(max-width:760px){.at-panel.on{grid-template-columns:1fr}.at-btn{margin-inline-end:14px}}`,
  html:`<div class="stage tight"><div class="at">
  <div class="at-links" role="tablist" aria-label="שלבי העבודה">
    <button class="at-btn on" role="tab" id="at-t1" aria-controls="at-p1" aria-selected="true">אפיון<i class="at-bar"></i></button>
    <button class="at-btn" role="tab" id="at-t2" aria-controls="at-p2" aria-selected="false" tabindex="-1">קופי<i class="at-bar"></i></button>
    <button class="at-btn" role="tab" id="at-t3" aria-controls="at-p3" aria-selected="false" tabindex="-1">עיצוב<i class="at-bar"></i></button>
    <button class="at-btn" role="tab" id="at-t4" aria-controls="at-p4" aria-selected="false" tabindex="-1">מדידה<i class="at-bar"></i></button>
  </div>
  <div class="at-panel on" role="tabpanel" id="at-p1" aria-labelledby="at-t1"><div><h4>מתחילים בהבנה</h4><p>שיחה אחת שממפה את העסק, את הלקוח ואת מה שצריך לקרות באתר.</p>
    <ul><li>מיפוי קהל ומסרים</li><li>מבנה עמודים</li></ul></div><div class="ph at-media ph-a">1</div></div>
  <div class="at-panel" role="tabpanel" id="at-p2" aria-labelledby="at-t2"><div><h4>כותבים לפני שמעצבים</h4><p>הטקסט קובע את המבנה, ולא להפך. כל סקשן עונה על השאלה הבאה בתור.</p>
    <ul><li>כותרות שמדברות ללקוח</li><li>קריאה לפעולה אחת</li></ul></div><div class="ph at-media ph-c">2</div></div>
  <div class="at-panel" role="tabpanel" id="at-p3" aria-labelledby="at-t3"><div><h4>שפה אחת בכל עמוד</h4><p>מערכת צבעים, טיפוגרפיה וריווח שחוזרת בכל מקום, כך שהאתר מרגיש שלם.</p>
    <ul><li>מערכת עיצוב</li><li>התאמה לכל מסך</li></ul></div><div class="ph at-media ph-d">3</div></div>
  <div class="at-panel" role="tabpanel" id="at-p4" aria-labelledby="at-t4"><div><h4>יודעים מה עובד</h4><p>מחברים מעקב לפני העלייה לאוויר, ומשפרים לפי נתונים במקום לפי תחושה.</p>
    <ul><li>מעקב המרות</li><li>דוח חודשי</li></ul></div><div class="ph at-media ph-e">4</div></div>
</div></div>`,
  js:`(function(){
  const DUR=5;
  const at=document.querySelector(".at");
  const btns=[...at.querySelectorAll(".at-btn")],panels=[...at.querySelectorAll(".at-panel")];
  const G=typeof gsap!=="undefined";   // בלי הספרייה אלה טאבים רגילים בלחיצה, בלי פס ובלי התקדמות
  let i=0,timer=null,running=false,auto=true,motion=false;
  function show(n,focus){
    i=n;
    btns.forEach((b,k)=>{b.classList.toggle("on",k===n);b.setAttribute("aria-selected",String(k===n));b.tabIndex=k===n?0:-1;});
    panels.forEach((p,k)=>p.classList.toggle("on",k===n));
    if(focus)btns[n].focus();
    if(!G)return;
    if(motion)gsap.fromTo(panels[n],{opacity:0,y:18},{opacity:1,y:0,duration:.5,ease:"power2.out",overwrite:true});
    if(timer){timer.kill();timer=null;}
    gsap.set(at.querySelectorAll(".at-bar"),{width:0});
    // מי שבחר טאב לקח שליטה: מכאן אין התקדמות אוטומטית (WCAG 2.2.2), גם במגע וגם בריחוף
    if(!motion||!running||!auto)return;
    // הפס הוא השעון: כשהוא מגיע לסוף עוברים לטאב הבא
    timer=gsap.to(btns[n].querySelector(".at-bar"),{width:"100%",duration:DUR,ease:"none",
      onComplete:()=>show((n+1)%btns.length)});
    if(at.matches(":hover")||at.contains(document.activeElement))timer.pause();
  }
  btns.forEach((b,k)=>b.addEventListener("click",()=>{auto=false;show(k);}));
  // מקלדת לפי תבנית הטאבים: חצים בין הטאבים (בעברית שמאלה זה הבא), Home ו-End לקצוות
  at.querySelector(".at-links").addEventListener("keydown",e=>{
    const n=btns.length,m={ArrowLeft:i+1,ArrowRight:i-1,Home:0,End:n-1}[e.key];
    if(m===undefined)return;
    e.preventDefault();auto=false;show((m+n)%n,true);
  });
  at.addEventListener("mouseenter",()=>timer&&timer.pause());
  at.addEventListener("mouseleave",()=>{if(timer&&!at.contains(document.activeElement))timer.resume();});
  at.addEventListener("focusin",()=>timer&&timer.pause());
  at.addEventListener("focusout",e=>{if(!at.contains(e.relatedTarget)&&!at.matches(":hover")&&timer)timer.resume();});
  if(!G)return;
  // הפחתת תנועה: טאבים רגילים לחלוטין, בלי כניסה ובלי התקדמות אוטומטית
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    motion=true;
    // מתחילים רק כשהסקשן על המסך, אחרת הטאבים "בוזבזו" לפני שהמבקר הגיע
    ScrollTrigger.create({trigger:at,start:"top 75%",end:"bottom 25%",
      onToggle:self=>{running=self.isActive;if(self.isActive)show(i);else if(timer)timer.pause();}});
    return ()=>{motion=false;running=false;if(timer){timer.kill();timer=null;}gsap.set(at.querySelectorAll(".at-bar"),{width:0});};
  });
})();`,
  runway:false,
  note:"פס הזמן אינו קישוט אלא הטיימר עצמו: ה-onComplete שלו הוא מה שמעביר טאב, ולכן אין שני מנגנוני זמן שיכולים להתפצל. `width` נבחר על פני `scaleX` כדי שהפס יישאר חד בקצוות, והוא מעוגן ל-right כי בעברית הוא צריך לגדול מימין לשמאל. הסקשן מתחיל לרוץ רק כשהוא נראה, נעצר בהובר ובפוקוס, ובמצב חיסכון בתנועה הופך לטאבים רגילים לחלוטין. **מי שבחר טאב לקח שליטה**: לחיצה, נגיעה או חץ במקלדת עוצרים את ההתקדמות האוטומטית לגמרי, אחרת הטאב שנבחר מתחלף מתחת ליד אחרי חמש שניות (WCAG 2.2.2). הסמנטיקה היא של טאבים (`tablist`, `tab` עם `aria-selected`, `tabpanel`), והחצים עוברים בין הטאבים, בעברית שמאלה זה הבא. בטלפון ארבעת הטאבים נכנסים בשורה אחת, כולם על המסך; שורה נגללת רק מחמישה."
},
{
  id:"b50", cat:"behavior", name:"מתג מצב כהה עם מעבר וזיכרון", tech:"CSS vars · GSAP", status:"ממתין",
  desc:"כפתור שמחליף בין בהיר לכהה בגל עגול שנפתח מהכפתור עצמו. הבחירה נשמרת לביקור הבא, וברירת המחדל היא ההגדרה של המכשיר.",
  when:"בלוג, תיק עבודות, מערכת, דוקומנטציה, כל אתר שקוראים בו הרבה. מצב כהה הוא היום ציפייה בסיסית, והמעבר הוא ההזדמנות להראות איכות בשנייה אחת.",
  libs:["gsap"],
  css:`.tt{position:relative;overflow:hidden;border-radius:var(--r);border:1px solid var(--line);
  --tt-bg:#ffffff;--tt-ink:#16182b /* qa-allow: literal, הדמו מגדיר שני ערכות משלו */;--tt-mut:#5b5f77;--tt-card:#f4f4f8;--tt-line:#e3e3ec;
  background:var(--tt-bg);color:var(--tt-ink);padding:clamp(24px,4vw,54px);
  transition:background-color .35s ease,color .35s ease}
.tt[data-theme="dark"]{--tt-bg:#111219;--tt-ink:#f2f2f7;--tt-mut:#a2a5bb;--tt-card:#1b1d27;--tt-line:#2c2f3d}
.tt-top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px}
.tt-top h3{margin:0;font-size:clamp(20px,2.4vw,32px)}
.tt-btn{position:relative;z-index:2;display:inline-flex;align-items:center;gap:9px;border:1px solid var(--tt-line);min-height:44px;
  background:var(--tt-card);color:var(--tt-ink);font:inherit;font-size:14px;padding:10px 16px;border-radius:999px;cursor:pointer;
  transition:border-color .18s}
@media (hover:hover) and (pointer:fine){.tt-btn:hover{border-color:var(--tt-mut)}}
.tt-btn:focus-visible{outline:2px solid var(--tt-ink);outline-offset:2px}
.tt-ico{font-size:15px;line-height:1}
.tt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.tt-card{background:var(--tt-card);border:1px solid var(--tt-line);border-radius:14px;padding:18px;
  transition:background-color .35s ease,border-color .35s ease}
.tt-card h4{margin:0 0 6px;font-size:16px}
.tt-card p{margin:0;font-size:14px;line-height:1.6;color:var(--tt-mut)}
/* הגל: עיגול שנפתח מהכפתור, ומתחתיו מחליפים את הערכה */
.tt-wave{position:absolute;border-radius:50%;pointer-events:none;z-index:5;transform:translate(-50%,-50%) scale(0)}
@media(max-width:700px){.tt-grid{grid-template-columns:1fr}}
@media (prefers-reduced-motion: reduce){.tt,.tt-card{transition:none}}`,
  html:`<div class="stage tight"><div class="tt">
  <div class="tt-top">
    <h3>מצב תצוגה</h3>
    <button class="tt-btn" type="button"><span class="tt-ico" aria-hidden="true">🌙</span><span class="tt-lbl">מצב כהה</span></button>
  </div>
  <div class="tt-grid">
    <div class="tt-card"><h4>קריאה ארוכה</h4><p>מאמרים ומדריכים נוחים יותר לעין בלילה.</p></div>
    <div class="tt-card"><h4>ממשק ניהול</h4><p>מסכים שיושבים מולם שעות דורשים בחירה.</p></div>
    <div class="tt-card"><h4>תיק עבודות</h4><p>רקע כהה מבליט צילומים וויז\`ואל.</p></div>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".tt"),btn=root.querySelector(".tt-btn");
  const ico=btn.querySelector(".tt-ico"),lbl=btn.querySelector(".tt-lbl");
  const KEY="mv-tt-theme";
  let saved=null;try{saved=localStorage.getItem(KEY);}catch(e){}
  // ברירת המחדל היא ההגדרה של המכשיר, והבחירה של המשתמש גוברת עליה
  let dark=saved?saved==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
  // התווית אומרת מה הלחיצה תעשה, ולכן אין aria-pressed: "מצב בהיר, לחוץ" נשמע כאילו הבהיר פעיל
  function paint(){
    root.dataset.theme=dark?"dark":"light";
    ico.textContent=dark?"☀️":"🌙";
    lbl.textContent=dark?"מצב בהיר":"מצב כהה";
  }
  // שומרים רק בחירה של הגולש. שמירה בטעינה הייתה מקפיאה את ברירת המחדל של המכשיר:
  // מי שעובר אחר כך למצב כהה במכשיר היה נשאר בבהיר
  function flip(){dark=!dark;paint();try{localStorage.setItem(KEY,dark?"dark":"light");}catch(e){}}
  paint();
  btn.addEventListener("click",()=>{
    if(typeof gsap==="undefined"||matchMedia("(prefers-reduced-motion: reduce)").matches){flip();return;}
    const b=btn.getBoundingClientRect(),r=root.getBoundingClientRect();
    const cx=b.left+b.width/2-r.left,cy=b.top+b.height/2-r.top;
    // רדיוס שמכסה בוודאות את הפינה הרחוקה ביותר
    const rad=Math.hypot(Math.max(cx,r.width-cx),Math.max(cy,r.height-cy));
    const wave=document.createElement("span");
    wave.className="tt-wave";
    wave.style.cssText="left:"+cx+"px;top:"+cy+"px;width:"+rad*2+"px;height:"+rad*2+"px;background:"+
      (dark?"#ffffff":"#111219");
    root.appendChild(wave);
    gsap.timeline({onComplete:()=>wave.remove()})
      .to(wave,{scale:1,duration:.45,ease:"power2.out"})
      .add(flip)                                   // מחליפים ערכה מתחת לגל, לא לפניו
      .to(wave,{opacity:0,duration:.35,ease:"power1.out"},"+=0.05");
  });
})();`,
  runway:false,
  note:"הערכה כולה יושבת במשתני CSS על מעטפת אחת ולא על :root, כדי שאפשר יהיה להטמיע את הרכיב בעמוד שכבר יש לו ערכה משלו. שלושה דברים שהופכים את זה למקצועי: ברירת המחדל מגיעה מ-prefers-color-scheme ורק אז נדרסת בבחירה שמורה, ההחלפה קורית בזמן שהגל מכסה את המסך (לפני כן רואים הבזק), וכל גישה ל-localStorage עטופה ב-try כי בגלישה פרטית היא זורקת. **שומרים רק אחרי לחיצה**: שמירה כבר בטעינה מקפיאה את ברירת המחדל של המכשיר, ומי שעובר אחר כך למצב כהה במכשיר נשאר בבהיר. לכפתור אין `aria-pressed`, כי התווית שלו מתחלפת ואומרת מה הלחיצה תעשה; שניהם יחד נשמעים בקורא מסך כמו \"מצב בהיר, לחוץ\" כשדווקא הכהה פעיל. במצב חיסכון בתנועה, או כשהספרייה לא נטענה, ההחלפה מיידית בלי גל."
},
];
