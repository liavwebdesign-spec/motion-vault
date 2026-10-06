// GSAP גל 23 (9.9.2026): עוד 10 מהלכי גלילה מיוחדים. אותו סינון כמו גלים 20 עד 22:
// scrub או pin, רעיון שלא קיים ב-93 מהלכי הגלילה במאגר, רב-שימושי, מובייל מוגדר בכל אחד.
export default [
{
  id:"g119", cat:"gsap", name:"אייקון שמתגלגל לאייקון הבא", tech:"GSAP · ScrollTrigger · MorphSVG", status:"ממתין",
  desc:"אייקון אחד גדול ודביק שמשנה צורה בכל שלב בתהליך: עיגול הופך לחץ, חץ לווי, ווי לכוכב. הצורה מספרת את השלב במקום להחליף תמונה.",
  when:"תהליך עבודה בשלושה עד חמישה שלבים, מסע לקוח, אונבורדינג. אייקונים בקו פשוט עם מספר נקודות דומה.",
  note:"MorphSVG בין path-ים באותו SVG; הצורות שאינן פעילות מוסתרות. הצורה מתחלפת בכניסת שלב (לא בסקראב) כדי שהמעבר ייגמר תמיד. SVG מצויר משמאל לימין בלי קשר ל-dir, ולכן החץ מצויר מצביע שמאלה (קדימה בעמוד עברי), והגרסה שמצביעה ימינה יושבת ב-data-ltr ונבחרת לבד בעמוד LTR. במובייל האייקון קטן ויושב למעלה, הטקסט מתחתיו, והצל קצר כדי שלא ייפול על הטקסט. בהפחתת תנועה הצורה מתחלפת מיד, בלי מורף; כש-GSAP לא נטען נשאר העיגול וכל השלבים קריאים.",
  libs:["gsap","ScrollTrigger","MorphSVGPlugin"],
  css:`.mi{display:grid;grid-template-columns:1fr 1fr;gap:var(--gap);align-items:start;max-width:1000px;margin-inline:auto}
.mi-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
.mi-ic{width:min(260px,50vw);aspect-ratio:1;border-radius:32px;background:var(--card);border:1px solid var(--line);display:grid;place-items:center;box-shadow:0 30px 70px rgba(0,0,0,.1)}
.mi-ic svg{width:56%;height:56%;overflow:visible}
.mi-ic path{fill:none;stroke:var(--accent);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.mi-steps{display:flex;flex-direction:column;gap:42vh;padding-block:36vh}
.mi-step b{display:block;font-size:12px;color:var(--accent);letter-spacing:.14em;margin-bottom:8px}
.mi-step h3{margin:0 0 8px;font-size:clamp(22px,2.6vw,36px)}
.mi-step p{margin:0;color:var(--muted);line-height:1.7;max-width:36ch}
@media(max-width:767px){.mi{grid-template-columns:1fr}.mi-pin{height:40vh;top:0;z-index:2;background:var(--bg)}.mi-ic{width:min(36vw,160px);border-radius:22px;box-shadow:0 12px 26px rgba(0,0,0,.08)}.mi-steps{gap:26vh;padding-block:6vh 30vh}}`,
  html:`<div class="stage tight"><div class="mi">
  <div class="mi-pin"><div class="mi-ic"><svg viewBox="0 0 100 100" aria-hidden="true">
    <path class="mi-shape" d="M50 10 C72 10 90 28 90 50 C90 72 72 90 50 90 C28 90 10 72 10 50 C10 28 28 10 50 10 Z"/>
    <path class="mi-b" style="display:none" d="M85 50 C70 50 55 50 40 50 C32 50 26 50 18 50 C26 42 34 34 42 26 C34 34 26 42 18 50 C26 58 34 66 42 74 C34 66 26 58 18 50 Z" data-ltr="M15 50 C30 50 45 50 60 50 C68 50 74 50 82 50 C74 42 66 34 58 26 C66 34 74 42 82 50 C74 58 66 66 58 74 C66 66 74 58 82 50 Z"/>
    <path class="mi-c" style="display:none" d="M14 52 C20 58 26 64 32 70 C38 76 42 78 46 74 C56 62 66 50 76 38 C82 31 86 27 86 27 C86 27 82 31 76 38 C66 50 56 62 46 74 C42 78 38 76 32 70 C26 64 20 58 14 52 Z"/>
    <path class="mi-d" style="display:none" d="M50 8 C55 24 60 34 62 36 C68 37 80 38 90 40 C82 47 74 54 68 60 C70 70 72 80 74 90 C64 84 56 80 50 76 C44 80 36 84 26 90 C28 80 30 70 32 60 C26 54 18 47 10 40 C20 38 32 37 38 36 C40 34 45 24 50 8 Z"/>
  </svg></div></div>
  <div class="mi-steps">
    <div class="mi-step"><b>01</b><h3>פנייה</h3><p>טופס קצר או שיחה. אנחנו חוזרים תוך יום עסקים.</p></div>
    <div class="mi-step"><b>02</b><h3>כיוון</h3><p>שיחת אפיון שמסמנת לאן הולכים ומה לא עושים.</p></div>
    <div class="mi-step"><b>03</b><h3>ביצוע</h3><p>עיצוב, בנייה, ובדיקות. שבועיים בממוצע.</p></div>
    <div class="mi-step"><b>04</b><h3>תוצאה</h3><p>אתר באוויר, ומדידה מהיום הראשון.</p></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר העיגול, וכל השלבים קריאים
  const shape=document.querySelector(".mi-shape"),steps=gsap.utils.toArray(".mi-step"),targets=[".mi-shape",".mi-b",".mi-c",".mi-d"];
  const base=shape.getAttribute("d"),arrow=document.querySelector(".mi-b");
  // SVG מצויר משמאל לימין בכל כיוון: בעמוד LTR החץ מתהפך כדי להצביע קדימה
  if(getComputedStyle(shape.closest(".mi")).direction==="ltr")arrow.setAttribute("d",arrow.dataset.ltr);
  gsap.matchMedia().add({go:"(prefers-reduced-motion: no-preference)",rm:"(prefers-reduced-motion: reduce)"},ctx=>{
    const rm=ctx.conditions.rm;let cur=0;
    function go(k){if(k===cur)return;cur=k;
      // הפחתת תנועה: הצורה מתחלפת מיד, בלי מורף
      gsap.to(shape,{morphSVG:k===0?base:targets[k],duration:rm?0:.9,ease:"power3.inOut",overwrite:true});}
    steps.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 60%",end:"bottom 40%",onEnter:()=>go(i),onEnterBack:()=>go(i)}));
    return()=>{gsap.killTweensOf(shape);shape.setAttribute("d",base);};
  });
})();`
},
{
  id:"g120", cat:"gsap", name:"רשימה שהפריט במרכז שלה גדל", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רשימה ארוכה של שירותים או פריטים, והפריט שנמצא במרכז המסך גדל, מתמלא ומקבל תיאור, בזמן שהשכנים קטנים ודהויים. עין דג אנכית שהגלילה מזיזה.",
  when:"תפריט, רשימת שירותים, קטלוג טקסטואלי, שמות של אנשי צוות. שמונה עד עשרים פריטים.",
  note:"הגודל של הכותרת וה-opacity של הפריט מחושבים מהמרחק שלו ממרכז המסך בכל עדכון גלילה (quickSetter, בלי טווין לכל פריט). המיקומים נמדדים ב-refresh ולא בכל פריים. רק הכותרת גדלה, מהצד שבו היא מתחילה (ימין ב-RTL), והתיאור שאחריה זז בדיוק ברוחב שנוסף לה, כך שהקו התחתון והמספר לא נמתחים ושום דבר לא עולה על השכן. quickSetter עם scale לא כותב transform ב-GSAP 3.13, ולכן scaleX ו-scaleY בנפרד. עד פי 1.35 בדסקטופ ופי 1.15 במובייל, כי הרוחב מוגבל. בהפחתת תנועה, וכש-GSAP לא נטען, כל הפריטים מלאים וכל התיאורים גלויים.",
  libs:["gsap","ScrollTrigger"],
  css:`.fe{max-width:min(760px,92vw);margin-inline:auto;padding-block:40vh}
.fe-it{display:flex;align-items:baseline;gap:18px;padding:10px 0;will-change:opacity;border-bottom:1px solid var(--line)}
.fe-it b{display:inline-block;font-size:clamp(22px,3vw,40px);font-weight:800;min-width:0;transform-origin:100% 50%}
html[dir="ltr"] .fe-it b{transform-origin:0 50%}
.fe-it span{font-size:14px;color:var(--muted);transition:opacity .3s,translate .3s}
.fe-live .fe-it span{opacity:0;translate:0 4px}
.fe-live .fe-it.on span{opacity:1;translate:0 0}
.fe-it i{font-style:normal;font-size:12px;color:var(--accent);letter-spacing:.12em;min-width:2.4em}`,
  html:`<div class="fe">
  <div class="fe-it"><i>01</i><b>אפיון ואסטרטגיה</b><span>שיחה, מסמך, החלטות</span></div>
  <div class="fe-it"><i>02</i><b>קופי בעברית</b><span>כל משפט עונה על שאלה</span></div>
  <div class="fe-it"><i>03</i><b>עיצוב ממשק</b><span>מובייל קודם, תמיד</span></div>
  <div class="fe-it"><i>04</i><b>בניית אתר</b><span>מהיר, נגיש, מדיד</span></div>
  <div class="fe-it"><i>05</i><b>חנות אונליין</b><span>סליקה, מלאי, משלוחים</span></div>
  <div class="fe-it"><i>06</i><b>מערכות ניהול</b><span>CRM, פורטלים, דוחות</span></div>
  <div class="fe-it"><i>07</i><b>אוטומציות</b><span>מה שחוזר על עצמו, רץ לבד</span></div>
  <div class="fe-it"><i>08</i><b>ליווי שוטף</b><span>חודש בחודשו, בלי התחייבות</span></div>
  <div class="fe-it"><i>09</i><b>קמפיינים</b><span>מטא וגוגל, עם מדידה</span></div>
  <div class="fe-it"><i>10</i><b>תחזוקה ואבטחה</b><span>עדכונים, גיבויים, שקט</span></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל הפריטים מלאים וכל התיאורים גלויים
  const fe=document.querySelector(".fe"),items=gsap.utils.toArray(".fe-it");
  gsap.matchMedia().add({desk:"(min-width: 768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width: 767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const MAX=ctx.conditions.mob?1.15:1.35,dir=getComputedStyle(fe).direction==="rtl"?-1:1;
    fe.classList.add("fe-live");
    // רק הכותרת גדלה (scaleX ו-scaleY: quickSetter עם scale לא כותב transform ב-GSAP 3.13).
    // התיאור שאחריה זז ברוחב שנוסף לה, ולכן לא עולה עליה
    const set=items.map(el=>{const b=el.querySelector("b"),s=el.querySelector("span");
      return {el,b,sx:gsap.quickSetter(b,"scaleX"),sy:gsap.quickSetter(b,"scaleY"),tx:gsap.quickSetter(s,"x","px"),o:gsap.quickSetter(el,"opacity"),y:0,w:0};});
    // המיקומים נמדדים ב-refresh ולא בכל פריים (ה-transform על הכותרת לא משנה את הפריסה)
    function measure(){set.forEach(x=>{const r=x.el.getBoundingClientRect();x.y=r.top+scrollY+r.height/2;x.w=x.b.offsetWidth;});}
    function paint(){const mid=scrollY+innerHeight/2,r=innerHeight*.35;let best=null,bd=1e9;
      set.forEach(x=>{const d=Math.abs(x.y-mid),t=Math.max(0,1-d/r),s=1+(MAX-1)*t*t;
        x.sx(s);x.sy(s);x.tx(dir*(s-1)*x.w);x.o(.3+.7*t);if(d<bd){bd=d;best=x.el;}});
      items.forEach(i=>i.classList.toggle("on",i===best));}
    ScrollTrigger.create({trigger:fe,start:"top bottom",end:"bottom top",onUpdate:paint,onRefresh:()=>{measure();paint();}});
    measure();paint();
    return()=>{fe.classList.remove("fe-live");items.forEach(i=>i.classList.remove("on"));
      gsap.set(items,{clearProps:"opacity"});gsap.set(fe.querySelectorAll(".fe-it b,.fe-it span"),{clearProps:"transform"});};
  });
})();`
},
{
  id:"g121", cat:"gsap", name:"יציאה מזום: מתמונה אחת לפסיפס שלם", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"מתחילים צמוד לתמונה אחת שממלאת את המסך, והגלילה מרחיקה את המצלמה עד שמתגלה פסיפס של עשרים תמונות שהיא רק אחת מהן. \"זה חלק ממשהו גדול\".",
  when:"תיק עבודות, צוות גדול, קהילה, לקוחות. שתים עשרה עד עשרים וארבע תמונות.",
  note:"הגריד כולו מקבל scale מ-X ל-1 עם transform-origin על התמונה הפותחת (מחושב מהמיקום שלה), כך שהיא נשארת במקום והשאר נכנסות מסביב. X מחושב מהמרחק של מרכז התמונה מהקצה הרחוק של המסך, כך שהיא ממלאת אותו גם כשהיא לא באמצע. התמונה הפותחת נשארת על כל המסך ב-12% הראשונים של הגלילה, ומשם הזום ליניארי בלוגריתם של הקנה (ease none על ln(scale)): כל קטע גלילה מרחיק את המצלמה באותו יחס. הכיתוב נכנס רק בסוף, כשהפסיפס כמעט בגודלו. הכיתוב יושב בשורה משלו מתחת לפסיפס, והגריד מוגבל בגובה כך ששניהם נכנסים במסך. במובייל הפסיפס 3 עמודות ו-12 תמונות, לרוחב 56vh לכל היותר. בהפחתת תנועה, וכש-GSAP לא נטען, רואים את הפסיפס והכיתוב (בהפחתת תנועה גם בלי הצמדה). בפרויקט: לטעון את התמונה הפותחת ב-sizes=\"100vw\", כי היא מוגדלת למסך מלא.",
  libs:["gsap","ScrollTrigger"],
  css:`.zo{position:relative;height:260vh}
.zo-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;grid-template-rows:1fr auto;place-items:center;padding-block:4vh;background:var(--ink)}
.zo-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;width:min(1100px,92vw,calc((100vh - 220px) * 1.9))}
.zo-grid .ph{aspect-ratio:1;font-size:16px;border-radius:12px}
.zo-grid .ph.hero{outline:3px solid var(--accent);outline-offset:-3px}
.zo-cap{position:relative;z-index:1;padding-top:2vh;text-align:center;color:var(--bg)}
.zo-cap h2{margin:0 0 6px;font-size:var(--fs-h2)}
.zo-cap p{margin:0;opacity:.75}
@media(max-width:767px){.zo-grid{grid-template-columns:repeat(3,1fr);gap:6px;width:min(92vw,56vh)}.zo-grid .ph:nth-child(n+13){display:none}}
@media (prefers-reduced-motion: reduce){.zo{height:auto}.zo-pin{position:static;height:auto;min-height:100vh}}`,
  html:`<div class="zo">
  <div class="zo-pin"><div class="zo-grid">
    <div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div><div class="ph ph-e">5</div><div class="ph ph-a">6</div>
    <div class="ph ph-b">7</div><div class="ph ph-c">8</div><div class="ph ph-d hero">9</div><div class="ph ph-e">10</div><div class="ph ph-a">11</div><div class="ph ph-b">12</div>
    <div class="ph ph-c">13</div><div class="ph ph-d">14</div><div class="ph ph-e">15</div><div class="ph ph-a">16</div><div class="ph ph-b">17</div><div class="ph ph-c">18</div>
  </div><div class="zo-cap"><h2>פרויקט אחד מתוך מאה ארבעים</h2><p>וכל אחד מהם התחיל משיחה.</p></div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP רואים את הפסיפס והכיתוב
  const grid=document.querySelector(".zo-grid"),hero=grid.querySelector(".hero"),pin=document.querySelector(".zo-pin"),cap=pin.querySelector(".zo-cap");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // המדידה נעשית ב-onRefreshInit, כשהגריד נקי מטרנספורם. לא בתוך פונקציית ערך של הטווין:
    // gsap.set על אותו אלמנט באמצע בניית הטווין שיבש את מטמון הטרנספורם (scale רק לרוחב, נמדד).
    let start=8;
    function measure(){gsap.set(grid,{clearProps:"transform"});const g=grid.getBoundingClientRect(),h=hero.getBoundingClientRect(),p=pin.getBoundingClientRect();
      grid.style.transformOrigin=(h.left-g.left+h.width/2)+"px "+(h.top-g.top+h.height/2)+"px";
      // התמונה לא במרכז המסך: הקנה נמדד מהמרחק של המרכז שלה לקצה הרחוק, בשני הצירים
      const cx=h.left+h.width/2-p.left,cy=h.top+h.height/2-p.top;
      start=Math.max(Math.max(cx,p.width-cx)/(h.width/2),Math.max(cy,p.height-cy)/(h.height/2))*1.12;}
    measure();
    gsap.set(cap,{opacity:0});
    // סקראב ליניארי על הלוגריתם של הקנה (scale = start^(1-t)): כל קטע גלילה מרחיק את המצלמה באותו יחס.
    // זה ה-ease none של זום. דרך ease ולא דרך onUpdate על אובייקט עזר, כי refresh משחזר את ההתקדמות בלי קולבקים
    const logZoom=t=>start>1?(start-Math.pow(start,1-t))/(start-1):t;
    gsap.timeline({scrollTrigger:{trigger:".zo",start:"top top",end:"bottom bottom",scrub:.7,invalidateOnRefresh:true,onRefreshInit:measure}})
      // 12% ראשונים של הגלילה: התמונה הפותחת נשארת על כל המסך, ורק אז המצלמה מתרחקת
      .fromTo(grid,{scale:()=>start},{scale:1,duration:.88,ease:logZoom},.12)
      .to(cap,{opacity:1,duration:.12,ease:"none"},.86);
  });
})();`
},
{
  id:"g123", cat:"gsap", name:"מסוע אופקי שנע עם הגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שתי שורות של תמונות או לוגואים שנעות אופקית בכיוונים מנוגדים, לא בלולאה אלא בקשר ישיר לגלילה: גוללים למטה, השורה העליונה נוסעת ימינה והתחתונה שמאלה. עוצרים, הכל עוצר.",
  when:"קיר לוגואים, גלריית פרויקטים, פס תמונות בין סקשנים. ששה עד עשרה פריטים בשורה.",
  note:"בלי pin: x של כל שורה הוא פונקציה של progress הסקשן במסך (מהכניסה ליציאה), ולכן המסוע תמיד בתנועה כשהוא נראה ולא דורש גלילה נוספת. כל שורה נעה בין 0 (צמודה לקצה שבו היא מתחילה) לבין פעמיים המרחק, כך שהקצה הזה אף פעם לא נחשף, ובכל refresh נוספים לשורה עותקים (aria-hidden) עד שהיא ארוכה מהמסך ועוד המסלול. במובייל המרחק 40vw מהרוחב (בפיקסלים קצר יותר מבדסקטופ), כדי שלא יעברו יותר מדי פריטים. בהפחתת תנועה, וכש-GSAP לא נטען, השורות עומדות.",
  libs:["gsap","ScrollTrigger"],
  css:`.cv-belt{overflow:hidden;padding-block:40px;display:grid;gap:14px}
.cv-row{display:flex;gap:14px;width:max-content;will-change:transform}
.cv-row .ph{width:clamp(140px,18vw,260px);aspect-ratio:4/3;font-size:18px;flex:none}
.cv-row.r2{margin-inline-start:-12vw}`,
  html:`<div class="cv-belt">
  <div class="cv-row r1"><div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div><div class="ph ph-e">5</div><div class="ph ph-a">6</div><div class="ph ph-b">7</div><div class="ph ph-c">8</div></div>
  <div class="cv-row r2"><div class="ph ph-d">9</div><div class="ph ph-e">10</div><div class="ph ph-a">11</div><div class="ph ph-b">12</div><div class="ph ph-c">13</div><div class="ph ph-d">14</div><div class="ph ph-e">15</div><div class="ph ph-a">16</div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP השורות עומדות
  const belt=document.querySelector(".cv-belt"),rows=gsap.utils.toArray(".cv-row");
  gsap.matchMedia().add({desk:"(min-width: 768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width: 767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const D=()=>innerWidth*(ctx.conditions.mob?.4:.3);
    // השורות צמודות לקצה שבו הן מתחילות (ימין ב-RTL). כל שורה נעה בין 0 לבין 2D בכיוון שמרחיק מהקצה הזה,
    // כך שהקצה לא נחשף; העותקים ממלאים את הצד השני עד שהשורה ארוכה מהמסך ועוד המסלול
    const s=getComputedStyle(belt).direction==="rtl"?1:-1;
    function fill(){rows.forEach(r=>{r.querySelectorAll("[data-clone]").forEach(c=>c.remove());
      const base=[...r.children],need=innerWidth*1.14+2*D()+(r.classList.contains("r2")?innerWidth*.12:0);let i=0;
      while(r.scrollWidth<need&&i<base.length*4){const c=base[i++%base.length].cloneNode(true);c.setAttribute("data-clone","");c.setAttribute("aria-hidden","true");r.appendChild(c);}});}
    fill();ScrollTrigger.addEventListener("refreshInit",fill);
    const st={trigger:belt,start:"top bottom",end:"bottom top",scrub:.4,invalidateOnRefresh:true};
    // RTL: השורה הראשונה נוסעת ימינה והשנייה שמאלה, כמו קודם
    gsap.fromTo(".cv-row.r1",{x:0},{x:()=>s*2*D(),ease:"none",scrollTrigger:st});
    gsap.fromTo(".cv-row.r2",{x:()=>s*2*D()},{x:0,ease:"none",scrollTrigger:{...st}});
    return()=>{ScrollTrigger.removeEventListener("refreshInit",fill);belt.querySelectorAll("[data-clone]").forEach(c=>c.remove());};
  });
})();`
},
{
  id:"g124", cat:"gsap", name:"טבלת השוואה שמתמלאת בגלילה", tech:"GSAP · ScrollTrigger · DrawSVG", status:"ממתין",
  desc:"טבלת \"אנחנו מול הדרך הישנה\" שהשורות שלה נדלקות אחת אחרי השנייה בכניסה, וסימני הווי מציירים את עצמם בעמודה שלנו בזמן שהאיקסים בעמודה השנייה נמחקים. השוואה שקוראים בקצב.",
  when:"עמוד מכירה, השוואת חבילות, \"למה אנחנו\". ארבע עד שבע שורות, שתי עמודות.",
  note:"כל שורה היא טריגר משלה (batch), הווי הוא path עם DrawSVG והאיקס דוהה. עמודת \"אנחנו\" מודגשת ברקע עדין קבוע, לא במעבר. הטבלה בנויה מ-div עם role של table, row, columnheader, rowheader ו-cell, והסימנים הם role=\"img\" עם aria-label כן או לא, כך שקורא מסך יודע מי מקבל מה. המצב המעומעם נקבע ב-JS, ולכן בלי JS, בהפחתת תנועה וכש-GSAP לא נטען הטבלה מלאה. במובייל הטבלה נשארת טבלה (שתי עמודות צרות), הפונט יורד ל-14px.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`/* בלי מסגרת ובלי קווי שורה: המשטח, הריווח ועמודת "אצלנו" הרציפה מחזיקים את הטבלה (feedback_no_lines_and_frames).
   התאים נמתחים לגובה השורה, כך שהרקע של "אצלנו" הוא עמודה אחת ולא טלאים (6.10.2026) */
.cmp{max-width:min(860px,94vw);margin-inline:auto;border-radius:var(--r);overflow:hidden;background:var(--card);
  box-shadow:0 12px 32px rgba(22,24,43,.06)}
.cmp-row{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:stretch}
.cmp-row.head{background:var(--bg);font-size:13px;color:var(--muted);letter-spacing:.06em}
.cmp-row>div{padding:clamp(12px,1.6vw,20px);display:flex;align-items:center}
.cmp-row .us{background:color-mix(in srgb,var(--accent) 7%,transparent);justify-content:center;text-align:center}
.cmp-row .them{justify-content:center;text-align:center;color:var(--muted)}
.cmp-row b{font-size:clamp(15px,1.5vw,18px)}
.cmp svg{width:24px;height:24px;overflow:visible;vertical-align:middle}
.cmp .ok path{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.cmp .no path{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round}
/* טלפון: עמודות הסימנים צרות וקבועות, והשורה נותנת את רוב הרוחב לטקסט, כדי שהשם לא יישבר לשלוש שורות
   (ליאב, דוח הסקירה 2.10.2026: "צריך התאמה למובייל") */
@media(max-width:767px){
  .cmp{max-width:calc(100vw - 2 * var(--gutter))}
  .cmp-row{grid-template-columns:1fr 68px 68px}
  .cmp-row>div{padding:14px 12px}
  .cmp-row.head{font-size:11px;letter-spacing:0;line-height:1.3}
  .cmp-row.head>div{padding-block:12px}
  .cmp-row b{font-size:15px;font-weight:600;line-height:1.35}
  .cmp svg{width:20px;height:20px}
}`,
  html:`<div class="stage"><div class="cmp" role="table" aria-label="אצלנו מול הדרך הישנה">
  <div class="cmp-row head" role="row"><div role="columnheader">מה מקבלים</div><div class="us" role="columnheader">אצלנו</div><div class="them" role="columnheader">בדרך הישנה</div></div>
  <div class="cmp-row" role="row"><div role="rowheader"><b>אפיון לפני עיצוב</b></div><div class="us" role="cell"><svg class="ok" viewBox="0 0 24 24" role="img" aria-label="כן"><path d="M4 13l5 5 11-12"/></svg></div><div class="them" role="cell"><svg class="no" viewBox="0 0 24 24" role="img" aria-label="לא"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row" role="row"><div role="rowheader"><b>קופי שנכתב לגולש</b></div><div class="us" role="cell"><svg class="ok" viewBox="0 0 24 24" role="img" aria-label="כן"><path d="M4 13l5 5 11-12"/></svg></div><div class="them" role="cell"><svg class="no" viewBox="0 0 24 24" role="img" aria-label="לא"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row" role="row"><div role="rowheader"><b>מובייל קודם</b></div><div class="us" role="cell"><svg class="ok" viewBox="0 0 24 24" role="img" aria-label="כן"><path d="M4 13l5 5 11-12"/></svg></div><div class="them" role="cell"><svg class="no" viewBox="0 0 24 24" role="img" aria-label="לא"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row" role="row"><div role="rowheader"><b>מדידה מהיום הראשון</b></div><div class="us" role="cell"><svg class="ok" viewBox="0 0 24 24" role="img" aria-label="כן"><path d="M4 13l5 5 11-12"/></svg></div><div class="them" role="cell"><svg class="no" viewBox="0 0 24 24" role="img" aria-label="לא"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row" role="row"><div role="rowheader"><b>עלייה תוך שבועיים</b></div><div class="us" role="cell"><svg class="ok" viewBox="0 0 24 24" role="img" aria-label="כן"><path d="M4 13l5 5 11-12"/></svg></div><div class="them" role="cell"><svg class="no" viewBox="0 0 24 24" role="img" aria-label="לא"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הטבלה מלאה: כל השורות והסימנים גלויים
  const rows=gsap.utils.toArray(".cmp-row:not(.head)");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // המצב המעומעם רק כשהמהלך רץ; בהפחתת תנועה הטבלה נשארת מלאה
    gsap.set(rows,{opacity:.35,translate:"0 10px"});
    gsap.set(".cmp .ok path",{drawSVG:"0%"});
    ScrollTrigger.batch(rows,{start:"top 85%",once:true,onEnter:batch=>{
      batch.forEach((row,i)=>{
        gsap.timeline({delay:i*.12})
          .to(row,{opacity:1,translate:"0 0",duration:.45,ease:"power3.out"})
          .to(row.querySelector(".ok path"),{drawSVG:"100%",duration:.4,ease:"power2.inOut"},"-=.2")
          .to(row.querySelector(".no"),{opacity:.35,scale:.85,duration:.3},"-=.3");
      });
    }});
  });
})();`
},
{
  id:"g125", cat:"gsap", name:"כרטיס זכוכית שמטה ומבריק בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"כרטיס (חברות, אשראי, כרטיס מוצר) שמטה בתלת-ממד ככל שגוללים, ופס אור עובר עליו באלכסון בדיוק ברגע ההטיה. כמו להחזיק אותו ביד מול החלון.",
  when:"כרטיס חברות, מנוי, כרטיס מתנה, הצגת מוצר שטוח. פעם אחת בעמוד.",
  note:"rotateX ו-rotateY בסקראב על טווח קצר של המסך (הכרטיס לא מוצמד), והברק הוא גרדיאנט שה-background-position שלו קשור למשתנה --shine, שמונפש מאותו progress (הכלל יושב ב-CSS, לא מוזרק מ-JS). במובייל ההטיה חצי. בהפחתת תנועה, וכש-GSAP לא נטען, הכרטיס עומד ישר.",
  libs:["gsap","ScrollTrigger"],
  css:`.gc-wrap{min-height:120vh;display:grid;place-items:center;perspective:1200px;padding-inline:var(--gutter)}
.gc{position:relative;width:min(520px,90vw);aspect-ratio:1.586;border-radius:24px;background:linear-gradient(135deg,color-mix(in srgb,var(--ink) 92%,var(--accent)),var(--ink));color:var(--bg);padding:clamp(18px,3vw,32px);display:flex;flex-direction:column;justify-content:space-between;
  box-shadow:0 40px 80px rgba(0,0,0,.3);will-change:transform;transform-style:preserve-3d;overflow:hidden}
.gc::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.35) 50%,transparent 60%);background-size:300% 100%;background-position:var(--shine,120%) 0;pointer-events:none}
.gc-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;letter-spacing:.14em;opacity:.8}
.gc-chip{width:44px;height:32px;border-radius:8px;background:linear-gradient(135deg,#f1d27a,#b98a2e)}
.gc-num{font-size:clamp(18px,2.6vw,28px);letter-spacing:.14em;font-variant-numeric:tabular-nums;direction:ltr;text-align:left}
.gc-bot{display:flex;justify-content:space-between;font-size:14px}
.gc-bot b{display:block;font-size:12px;opacity:.72;letter-spacing:.12em;margin-bottom:2px;font-weight:500}`,
  html:`<div class="gc-wrap"><div class="gc">
  <div class="gc-top"><span>חבר מועדון</span><span class="gc-chip"></span></div>
  <div class="gc-num">•••• •••• •••• 2026</div>
  <div class="gc-bot"><div><b>שם</b>ליאב מצרי</div><div><b>בתוקף עד</b>12/28</div></div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכרטיס עומד ישר
  const card=document.querySelector(".gc");
  gsap.matchMedia().add({desk:"(min-width: 768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width: 767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const k=ctx.conditions.mob?.5:1;
    gsap.timeline({scrollTrigger:{trigger:".gc-wrap",start:"top bottom",end:"bottom top",scrub:.6}})
      .fromTo(card,{rotateX:18*k,rotateY:-22*k},{rotateX:-14*k,rotateY:22*k,ease:"none",duration:1},0)
      // הברק: background-position על הפסאודו לא נגיש ל-GSAP, לכן משתנה CSS על הכרטיס (הכלל ב-CSS)
      .fromTo(card,{"--shine":"120%"},{"--shine":"-20%",ease:"none",duration:1},0);
  });
})();`
},
{
  id:"g126", cat:"gsap", name:"גרף קו שנמשך עם נקודה בקצה", tech:"GSAP · ScrollTrigger · DrawSVG", status:"ממתין",
  desc:"גרף צמיחה שהקו שלו נמשך משמאל לימין בקצב הגלילה, נקודה רוכבת על הקצה, והערך מעליה מתעדכן. סיפור צמיחה בלי טבלה.",
  when:"תוצאות לקוח, צמיחת החברה, \"לפני ואחרי\" במספרים. גרף אחד, נתון אחד.",
  note:"DrawSVG על path הקו; הנקודה והתווית ממוקמות בכל עדכון לפי getPointAtLength, והערך נגזר מגובה הנקודה. עובי הקו והנקודה מפוצים ביחידות SVG כך שהם קבועים על המסך; לא vector-effect, שמשבש את DrawSVG. השטח מתחת לקו נחשף עם הנקודה (clip-path), לא לפניה. התווית ממוקמת ב-transform, נשארת בתוך הקופסה, ויורדת מתחת לנקודה כשאין מקום מעליה. ציר הזמן dir=\"ltr\" כמו הקו, כי SVG מצויר משמאל לימין גם בעמוד עברי. בהפחתת תנועה, וכש-GSAP לא נטען, הגרף מלא והתווית על הערך האחרון.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.lg{max-width:min(900px,94vw);margin-inline:auto;padding-block:16vh 30vh}
.lg h2{margin:0 0 6px;font-size:var(--fs-h2)}
.lg p{margin:0 0 26px;color:var(--muted)}
.lg-box{position:relative;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:24px;direction:ltr}
.lg svg{width:100%;height:auto;overflow:visible;display:block}
.lg-grid line{stroke:var(--line);stroke-width:1}
.lg-line{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.lg-fill{fill:url(#lg-g)}
.lg-dot{fill:var(--accent);stroke:var(--card);stroke-width:4}
.lg-val{position:absolute;left:0;top:0;background:var(--ink);color:var(--bg);font-size:14px;font-weight:700;padding:6px 10px;border-radius:8px;pointer-events:none;font-variant-numeric:tabular-nums;white-space:nowrap}
.lg-ax{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:10px}`,
  html:`<div class="stage"><div class="lg">
  <h2>פניות בחודש, לפני ואחרי</h2><p>אותו עסק, אותו תקציב פרסום. רק האתר השתנה.</p>
  <div class="lg-box">
    <svg viewBox="0 0 800 300" role="img" aria-label="גרף פניות בחודש: מ-12 בינואר ל-118 בדצמבר, קפיצה אחרי עליית האתר החדש">
      <defs><linearGradient id="lg-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".25"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
      <g class="lg-grid"><line x1="0" y1="75" x2="800" y2="75"/><line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="225" x2="800" y2="225"/><line x1="0" y1="300" x2="800" y2="300"/></g>
      <path class="lg-fill" d="M0 250 C 100 245, 160 240, 240 236 C 320 232, 380 228, 420 200 C 470 165, 520 120, 600 90 C 680 60, 740 40, 800 30 V 300 H 0 Z"/>
      <path class="lg-line" d="M0 250 C 100 245, 160 240, 240 236 C 320 232, 380 228, 420 200 C 470 165, 520 120, 600 90 C 680 60, 740 40, 800 30"/>
      <circle class="lg-dot" r="7" cx="800" cy="30"/>
    </svg>
    <div class="lg-val">118</div>
    <div class="lg-ax" dir="ltr"><span>ינואר</span><span>האתר החדש עלה</span><span>דצמבר</span></div>
  </div>
</div></div>`,
  js:`(function(){
  const box=document.querySelector(".lg-box"),svg=box.querySelector("svg"),line=svg.querySelector(".lg-line"),fill=svg.querySelector(".lg-fill"),dot=svg.querySelector(".lg-dot"),val=box.querySelector(".lg-val");
  const L=line.getTotalLength(),MIN=12,MAX=118,o={p:1};
  let geo=null;
  // נמדד ב-refresh ולא בכל פריים: מיקום ה-SVG בקופסה, ורוחב התווית בערך הרחב ביותר
  function measure(){const r=svg.getBoundingClientRect(),b=box.getBoundingClientRect(),t=val.textContent;val.textContent=MAX;
    geo={ox:r.left-b.left,oy:r.top-b.top,w:r.width,h:r.height,bw:b.width,lw:val.offsetWidth,lh:val.offsetHeight};val.textContent=t;
    // עובי קבוע על המסך: מפצים ביחידות SVG כשה-SVG מתכווץ. לא vector-effect, שמשבש את DrawSVG
    const k=800/r.width;line.style.strokeWidth=3*k+"px";dot.setAttribute("r",7*k);dot.style.strokeWidth=4*k+"px";}
  function paint(){if(!geo)measure();const pt=line.getPointAtLength(L*o.p);
    dot.setAttribute("cx",pt.x);dot.setAttribute("cy",pt.y);
    // השטח מתחת לקו נחשף עד הנקודה, לא לפניה
    fill.style.clipPath="inset(0 "+(100-pt.x/8)+"% 0 0)";
    // הערך נגזר מגובה הנקודה: y=250 הוא 12, y=30 הוא 118
    val.textContent=Math.round(MIN+(250-pt.y)/220*(MAX-MIN));
    // התווית ב-transform, בתוך גבולות הקופסה; מעל הנקודה, או מתחתיה כשאין מקום
    const x=Math.min(Math.max(geo.ox+pt.x/800*geo.w,geo.lw/2+4),geo.bw-geo.lw/2-4),y=geo.oy+pt.y/300*geo.h;
    val.style.transform="translate("+x+"px,"+y+"px) translate(-50%,"+(y-geo.lh*1.4>4?-140:40)+"%)";}
  const redo=()=>{geo=null;paint();};
  // בלי GSAP: הגרף מלא, והתווית על הערך האחרון
  if(typeof gsap==="undefined"){paint();addEventListener("resize",redo);return;}
  gsap.matchMedia().add({go:"(prefers-reduced-motion: no-preference)",rm:"(prefers-reduced-motion: reduce)"},ctx=>{
    if(ctx.conditions.rm){o.p=1;ScrollTrigger.create({trigger:box,onRefresh:redo});redo();return;}
    o.p=0;
    gsap.set(line,{drawSVG:"0%"});
    gsap.timeline({onUpdate:paint,scrollTrigger:{trigger:box,start:"top 80%",end:"top 25%",scrub:.5,onRefresh:redo}})
      .to(line,{drawSVG:"100%",ease:"none",duration:1},0)
      .to(o,{p:1,ease:"none",duration:1},0);
    redo();
    return()=>{o.p=1;};
  });
})();`
},
{
  id:"g127", cat:"gsap", name:"מעבר לכהה בגלילה: עיגול שגדל ומחליף ערכה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"אותו סקשן בשתי ערכות, בהירה וכהה, זה על זה. עיגול קטן בפינה גדל עם הגלילה עד שהוא מכסה הכל, והערכה הכהה תופסת את המסך. מעבר יום ולילה בלי חיתוך.",
  when:"מעבר בין חלק \"בעיה\" לחלק \"פתרון\", כניסה לפרק כהה של האתר, פתיחת סקשן פרימיום. פעם אחת בעמוד.",
  note:"השכבה הכהה היא עותק של התוכן עם ערכה הפוכה ו-clip-path circle שהרדיוס שלו בסקראב ליניארי; המרכז יושב בפינה שממנה מגיע הלילה. שני העותקים באותו DOM: אותו טקסט בשתי ערכות, או טקסט משלים כמו בדמו. הכפתורים בשכבה המוסתרת מקבלים inert, כך שטאב וקורא מסך מגיעים רק לשכבה שרואים. במובייל המרכז באמצע למעלה. ההצמדה והשכבות זו על זו רק תחת המחלקה tn2-live שהסקריפט מוסיף: בהפחתת תנועה, וכש-GSAP לא נטען, שני הסקשנים עומדים זה מתחת לזה.",
  libs:["gsap","ScrollTrigger"],
  css:`.tn2{position:relative}
.tn2-l{display:grid;place-items:center;text-align:center;padding:24px;min-height:70vh}
.tn2-l.light{background:var(--bg);color:var(--ink)}
.tn2-l.dark{background:var(--ink);color:var(--bg)}
.tn2-live{height:220vh}
.tn2-live .tn2-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.tn2-live .tn2-l{position:absolute;inset:0;min-height:0}
.tn2-live .tn2-l.dark{will-change:clip-path}
.tn2-l h2{margin:0 0 12px;font-size:var(--fs-h2);max-width:20ch}
.tn2-l p{margin:0;opacity:.75;max-width:40ch;line-height:1.7}
.tn2-l .gbtn{margin-top:22px}
.tn2-l.dark .gbtn{background:var(--bg);color:var(--ink)}`,
  html:`<div class="tn2">
  <div class="tn2-pin">
    <div class="tn2-l light"><div><h2>ביום זה נראה ככה</h2><p>אתר רגיל, מסודר, כמו כולם.</p><button class="gbtn">להתחיל</button></div></div>
    <div class="tn2-l dark"><div><h2>ובלילה זה מקבל אופי</h2><p>אותו תוכן, ערכה אחרת, ותחושה אחרת לגמרי.</p><button class="gbtn">להתחיל</button></div></div>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP שני הסקשנים זה מתחת לזה
  const tn=document.querySelector(".tn2"),light=tn.querySelector(".tn2-l.light"),dark=tn.querySelector(".tn2-l.dark");
  gsap.matchMedia().add({desk:"(min-width: 768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width: 767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const at=ctx.conditions.mob?"50% 8%":"88% 12%";
    tn.classList.add("tn2-live");
    // רק השכבה שרואים נגישה לטאב ולקורא מסך. העיגול עובר את מרכז המסך ב-40% מהסקראב
    const swap=on=>{dark.inert=!on;light.inert=on;};
    swap(false);
    gsap.fromTo(dark,{clipPath:"circle(0% at "+at+")"},{clipPath:"circle(150% at "+at+")",ease:"none",
      scrollTrigger:{trigger:tn,start:"top top",end:"bottom bottom",scrub:.5},onUpdate(){swap(this.progress()>.4);}});
    return()=>{tn.classList.remove("tn2-live");dark.inert=false;light.inert=false;};
  });
})();`
},
{
  id:"g128", cat:"gsap", name:"מגירה שנפתחת מתחת לסקשן", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"הסקשן העליון נדחק הצידה, והבא נכנס מהצד ומונח מעליו כמו דף, עד שהוא תופס את המסך. מעבר צדדי במקום עוד גלילה למטה.",
  when:"מעבר לסקשן \"הפתעה\": מבצע, פרויקט נבחר, הצעה מיוחדת. פעם אחת בעמוד.",
  note:"שני סקשנים באותו מכל מוצמד. הבא מתחיל מוזז ב-xPercent מלא לכיוון שאליו הקריאה מתקדמת (בעברית משמאל) עם צל בקצה המוביל שנופל על הסקשן העליון, והעליון נדחק לצד הנגדי עם קצת קנה מידה. הסקראב ליניארי (ease none). הכיוון נגזר מ-direction ולא מקובע, והצל מתהפך עם html[dir=ltr]. במובייל אותו דבר. ההצמדה והשכבות זו על זו רק תחת המחלקה dr-live שהסקריפט מוסיף: בהפחתת תנועה, וכש-GSAP לא נטען, שני הסקשנים עומדים זה מתחת לזה.",
  libs:["gsap","ScrollTrigger"],
  css:`.dr{position:relative}
.dr-a,.dr-b{position:relative;display:grid;place-items:center;text-align:center;padding:24px;min-height:70vh}
.dr-a{background:var(--card)}
.dr-b{background:var(--accent);color:var(--accent-ink)}
.dr-live{height:200vh}
.dr-live .dr-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.dr-live .dr-a,.dr-live .dr-b{position:absolute;inset:0;min-height:0;will-change:transform}
.dr-live .dr-a{z-index:2}
.dr-live .dr-b{z-index:3;box-shadow:40px 0 80px rgba(0,0,0,.25)}
html[dir="ltr"] .dr-live .dr-b{box-shadow:-40px 0 80px rgba(0,0,0,.25)}
.dr-a h2,.dr-b h2{margin:0 0 10px;font-size:var(--fs-h2);max-width:20ch}
.dr-a p,.dr-b p{margin:0;opacity:.8;max-width:40ch;line-height:1.7}
.dr-hint{position:absolute;bottom:22px;inset-inline:0;text-align:center;font-size:13px;color:var(--muted)}
.dr:not(.dr-live) .dr-hint{display:none}`,
  html:`<div class="dr">
  <div class="dr-pin">
    <section class="dr-a"><div><h2>העבודה השוטפת</h2><p>אתרים, מערכות, ליווי. מה שאנחנו עושים כל יום.</p></div><p class="dr-hint">גלול, יש עוד משהו</p></section>
    <section class="dr-b"><div><h2>ומשהו שלא סיפרנו</h2><p>חבילת פתיחה לעסקים חדשים: אתר ראשון במחיר שמאפשר להתחיל.</p></div></section>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP שני הסקשנים זה מתחת לזה
  const dr=document.querySelector(".dr");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    dr.classList.add("dr-live");
    // בעברית הפרק הבא מגיע משמאל והנוכחי נדחק ימינה, כמו דף הבא בספר עברי. ב-LTR הכל מתהפך.
    const s=getComputedStyle(dr).direction==="rtl"?-1:1;
    gsap.set(".dr-b",{xPercent:100*s});   // המגירה מתחילה מחוץ למסך בצד שאליו הקריאה מתקדמת
    // סקראב: הגלילה היא העקומה, ולכן ease none
    gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:dr,start:"top top",end:"bottom bottom",scrub:.6}})
      .to(".dr-b",{xPercent:0,duration:1},0)
      .to(".dr-a",{xPercent:-30*s,scale:.94,duration:1},0)
      .to(".dr-hint",{opacity:0,duration:.15},0);
    return()=>dr.classList.remove("dr-live");
  });
})();`
},
];
