// GSAP גל 23 (9.9.2026): עוד 10 מהלכי גלילה מיוחדים. אותו סינון כמו גלים 20 עד 22:
// scrub או pin, רעיון שלא קיים ב-93 מהלכי הגלילה במאגר, רב-שימושי, מובייל מוגדר בכל אחד.
export default [
{
  id:"g119", cat:"gsap", name:"אייקון שמתגלגל לאייקון הבא", tech:"GSAP · ScrollTrigger · MorphSVG", status:"ממתין",
  desc:"אייקון אחד גדול ודביק שמשנה צורה בכל שלב בתהליך: עיגול הופך לחץ, חץ לווי, ווי לכוכב. הצורה מספרת את השלב במקום להחליף תמונה.",
  when:"תהליך עבודה בשלושה עד חמישה שלבים, מסע לקוח, אונבורדינג. אייקונים בקו פשוט עם מספר נקודות דומה.",
  note:"MorphSVG בין path-ים באותו SVG; הצורות שאינן פעילות מוסתרות. הצורה מתחלפת בכניסת שלב (לא בסקראב) כדי שהמעבר ייגמר תמיד. במובייל האייקון קטן ויושב למעלה, הטקסט מתחתיו.",
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
@media(max-width:767px){.mi{grid-template-columns:1fr}.mi-pin{height:40vh;top:0;z-index:2;background:var(--bg)}.mi-ic{width:min(36vw,160px);border-radius:22px}.mi-steps{gap:26vh;padding-block:6vh 30vh}}`,
  html:`<div class="stage tight"><div class="mi">
  <div class="mi-pin"><div class="mi-ic"><svg viewBox="0 0 100 100" aria-hidden="true">
    <path class="mi-shape" d="M50 10 C72 10 90 28 90 50 C90 72 72 90 50 90 C28 90 10 72 10 50 C10 28 28 10 50 10 Z"/>
    <path class="mi-b" style="display:none" d="M15 50 C30 50 45 50 60 50 C68 50 74 50 82 50 C74 42 66 34 58 26 C66 34 74 42 82 50 C74 58 66 66 58 74 C66 66 74 58 82 50 Z"/>
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
  const shape=document.querySelector(".mi-shape"),steps=gsap.utils.toArray(".mi-step"),targets=[".mi-shape",".mi-b",".mi-c",".mi-d"];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const base=shape.getAttribute("d");
  let cur=0;
  function go(k){if(k===cur)return;cur=k;
    const to=k===0?base:targets[k];
    gsap.to(shape,{morphSVG:to,duration:reduce?0:.9,ease:"power3.inOut",overwrite:true});
  }
  steps.forEach((s,i)=>ScrollTrigger.create({trigger:s,start:"top 60%",end:"bottom 40%",onEnter:()=>go(i),onEnterBack:()=>go(i)}));
})();`
},
{
  id:"g120", cat:"gsap", name:"רשימה שהפריט במרכז שלה גדל", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רשימה ארוכה של שירותים או פריטים, והפריט שנמצא במרכז המסך גדל, מתמלא ומקבל תיאור, בזמן שהשכנים קטנים ודהויים. עין דג אנכית שהגלילה מזיזה.",
  when:"תפריט, רשימת שירותים, קטלוג טקסטואלי, שמות של אנשי צוות. שמונה עד עשרים פריטים.",
  note:"ה-scale וה-opacity של כל פריט מחושבים מהמרחק שלו ממרכז המסך בכל עדכון גלילה (quickSetter, בלי טווין לכל פריט). transform-origin בצד ההתחלה כך שהטקסט גדל ימינה ב-RTL. במובייל הטווח קטן (1.0 עד 1.25) כי הרוחב מוגבל.",
  libs:["gsap","ScrollTrigger"],
  css:`.fe{max-width:min(760px,92vw);margin-inline:auto;padding-block:40vh}
.fe-it{display:flex;align-items:baseline;gap:18px;padding:10px 0;transform-origin:100% 50%;will-change:transform,opacity;border-bottom:1px solid var(--line)}
html[dir="ltr"] .fe-it{transform-origin:0 50%}
.fe-it b{font-size:clamp(22px,3vw,40px);font-weight:800;min-width:0}
.fe-it span{font-size:14px;color:var(--muted);opacity:0;translate:0 4px;transition:opacity .3s,translate .3s}
.fe-it.on span{opacity:1;translate:0 0}
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
  const items=gsap.utils.toArray(".fe-it");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(i=>i.classList.add("on"));return;}
  const MAX=matchMedia("(max-width:767px)").matches?1.25:1.6,R=()=>innerHeight*.35;
  const set=items.map(el=>({el,s:gsap.quickSetter(el,"scale"),o:gsap.quickSetter(el,"opacity")}));
  function paint(){const mid=innerHeight/2,r=R();let best=null,bd=1e9;
    set.forEach(x=>{const b=x.el.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-mid),t=Math.max(0,1-d/r);
      x.s(1+(MAX-1)*t*t);x.o(.3+.7*t);if(d<bd){bd=d;best=x.el;}});
    items.forEach(i=>i.classList.toggle("on",i===best));}
  ScrollTrigger.create({trigger:".fe",start:"top bottom",end:"bottom top",onUpdate:paint,onRefresh:paint});
  paint();
})();`
},
{
  id:"g121", cat:"gsap", name:"יציאה מזום: מתמונה אחת לפסיפס שלם", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"מתחילים צמוד לתמונה אחת שממלאת את המסך, והגלילה מרחיקה את המצלמה עד שמתגלה פסיפס של עשרים תמונות שהיא רק אחת מהן. \"זה חלק ממשהו גדול\".",
  when:"תיק עבודות, צוות גדול, קהילה, לקוחות. שתים עשרה עד עשרים וארבע תמונות.",
  note:"הגריד כולו מקבל scale מ-X ל-1 עם transform-origin על התמונה הפותחת (מחושב מהמיקום שלה), כך שהיא נשארת במקום והשאר נכנסות מסביב. במובייל הזום ההתחלתי קטן יותר (הגריד צר) והפסיפס 3 עמודות.",
  libs:["gsap","ScrollTrigger"],
  css:`.zo{position:relative;height:260vh}
.zo-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center;background:var(--ink)}
.zo-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;width:min(1100px,92vw);will-change:transform}
.zo-grid .ph{aspect-ratio:1;font-size:16px;border-radius:12px}
.zo-grid .ph.hero{outline:3px solid var(--accent);outline-offset:-3px}
.zo-cap{position:absolute;bottom:6vh;inset-inline:0;text-align:center;color:var(--bg);opacity:0}
.zo-cap h2{margin:0 0 6px;font-size:var(--fs-h2)}
.zo-cap p{margin:0;opacity:.75}
@media(max-width:767px){.zo-grid{grid-template-columns:repeat(3,1fr);gap:6px}}`,
  html:`<div class="zo">
  <div class="zo-pin"><div class="zo-grid">
    <div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div><div class="ph ph-e">5</div><div class="ph ph-a">6</div>
    <div class="ph ph-b">7</div><div class="ph ph-c">8</div><div class="ph ph-d hero">9</div><div class="ph ph-e">10</div><div class="ph ph-a">11</div><div class="ph ph-b">12</div>
    <div class="ph ph-c">13</div><div class="ph ph-d">14</div><div class="ph ph-e">15</div><div class="ph ph-a">16</div><div class="ph ph-b">17</div><div class="ph ph-c">18</div>
  </div><div class="zo-cap"><h2>פרויקט אחד מתוך מאה ארבעים</h2><p>וכל אחד מהם התחיל משיחה.</p></div></div>
</div>`,
  js:`(function(){
  const grid=document.querySelector(".zo-grid"),hero=grid.querySelector(".hero"),pin=document.querySelector(".zo-pin");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".zo-cap",{opacity:1});return;}
  // המדידה נעשית ב-onRefreshInit, כשהגריד נקי מטרנספורם. לא בתוך פונקציית ערך של הטווין:
  // gsap.set על אותו אלמנט באמצע בניית הטווין שיבש את מטמון הטרנספורם (scale רק לרוחב, נמדד).
  let start=8;
  function measure(){gsap.set(grid,{clearProps:"transform"});const g=grid.getBoundingClientRect(),h=hero.getBoundingClientRect();
    grid.style.transformOrigin=(h.left-g.left+h.width/2)+"px "+(h.top-g.top+h.height/2)+"px";
    start=Math.max(pin.clientWidth/h.width,pin.clientHeight/h.height)*1.05;}
  measure();
  const tl=gsap.timeline({scrollTrigger:{trigger:".zo",start:"top top",end:"bottom bottom",scrub:.7,invalidateOnRefresh:true,onRefreshInit:measure}});
  tl.fromTo(grid,{scale:()=>start},{scale:1,duration:1,ease:"power2.inOut"})
    .to(".zo-cap",{opacity:1,duration:.2},.75);
})();`
},
{
  id:"g122", cat:"gsap", name:"שעות היום מתחלפות בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"סקשן שהרקע שלו עובר מזריחה לצהריים ללילה ככל שגוללים: הגרדיאנט משתנה, שמש נוסעת בקשת והופכת לירח, והטקסט מתאים את עצמו. סיפור של יום שלם במסך אחד.",
  when:"אירוח, בריאות ורווחה, שגרת יום של מוצר, \"יום בחיי\". פעם אחת בעמוד.",
  note:"שלושה גרדיאנטים כשכבות עם opacity בסקראב (גרדיאנט לא מתאנפש ישירות), והשמש היא עיגול על מסלול קשת דרך x ו-y. הטקסט מחליף צבע בשלב הלילה. במובייל הקשת נמוכה יותר כדי שהשמש לא תסתיר טקסט.",
  libs:["gsap","ScrollTrigger"],
  css:`.dy{position:relative;height:300vh}
.dy-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;align-content:end;padding:0 var(--gutter) 12vh}
.dy-sky{position:absolute;inset:0}
.dy-sky i{position:absolute;inset:0;opacity:0}
.dy-sky .s1{background:linear-gradient(180deg,#f7b267 0%,#f79d65 40%,#f4845f 100%);opacity:1}
.dy-sky .s2{background:linear-gradient(180deg,#7fc8f8 0%,#bfe6ff 60%,#fff6e0 100%)}
.dy-sky .s3{background:linear-gradient(180deg,#0b1026 0%,#1b2a4a 60%,#2b3a67 100%)}
.dy-sun{position:absolute;width:clamp(70px,9vw,120px);aspect-ratio:1;border-radius:50%;background:#ffd166;box-shadow:0 0 60px 20px rgba(255,209,102,.45);left:10%;top:60%;will-change:transform}
.dy-txt{position:relative;z-index:1;color:#1b1b2f;max-width:36ch}
.dy-txt b{display:block;font-size:12px;letter-spacing:.16em;margin-bottom:8px;opacity:.75}
.dy-txt h2{margin:0 0 10px;font-size:var(--fs-h2)}
.dy-txt p{margin:0;line-height:1.7;opacity:.85}
.dy-txt .l{display:none}
.dy-pin.night .dy-txt{color:#fff}
.dy-ground{position:absolute;inset-inline:0;bottom:0;height:9vh;background:color-mix(in srgb,#1b1b2f 85%,transparent)}
@media(max-width:767px){.dy{height:240vh}}`,
  html:`<div class="dy">
  <div class="dy-pin">
    <div class="dy-sky"><i class="s1"></i><i class="s2"></i><i class="s3"></i></div>
    <div class="dy-sun"></div>
    <div class="dy-ground"></div>
    <div class="dy-txt"><b data-t="בוקר">בוקר</b><h2 data-t="היום מתחיל בשקט">היום מתחיל בשקט</h2><p data-t="קפה, אור ראשון, ושום דבר לא דחוף.">קפה, אור ראשון, ושום דבר לא דחוף.</p></div>
  </div>
</div>`,
  js:`(function(){
  const pin=document.querySelector(".dy-pin"),sun=document.querySelector(".dy-sun"),txt=document.querySelector(".dy-txt");
  const phases=[{b:"בוקר",h:"היום מתחיל בשקט",p:"קפה, אור ראשון, ושום דבר לא דחוף."},{b:"צהריים",h:"הכל בתנועה",p:"פגישות, החלטות, וארוחה טובה באמצע."},{b:"לילה",h:"ומסיימים לאט",p:"הבריכה מוארת, והמים בדיוק בטמפרטורה."}];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,mob=matchMedia("(max-width:767px)").matches;
  let cur=0;function setText(k){if(k===cur)return;cur=k;const ph=phases[k];txt.querySelector("b").textContent=ph.b;txt.querySelector("h2").textContent=ph.h;txt.querySelector("p").textContent=ph.p;}
  if(reduce)return;
  const W=()=>pin.clientWidth,H=()=>pin.clientHeight,top=mob?.28:.14;
  gsap.timeline({scrollTrigger:{trigger:".dy",start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true,
      onUpdate(s){setText(s.progress<.4?0:s.progress<.75?1:2);pin.classList.toggle("night",s.progress>.7);}}})
    // השמש: קשת מימין לשמאל (RTL: הבוקר מימין), עולה עד האמצע ויורדת
    .fromTo(sun,{x:()=>W()*.72,y:0},{x:()=>W()*.4,y:()=>-H()*(0.6-top),duration:1,ease:"power1.out"},0)
    .to(sun,{x:()=>W()*.06,y:()=>H()*.05,duration:1,ease:"power1.in"},1)
    .to(".dy-sky .s2",{opacity:1,duration:.8},.3)
    .to(".dy-sky .s3",{opacity:1,duration:.8},1.2)
    .to(sun,{backgroundColor:"#e9edf5",boxShadow:"0 0 40px 10px rgba(233,237,245,.35)",scale:.7,duration:.6},1.3);
})();`
},
{
  id:"g123", cat:"gsap", name:"מסוע אופקי שנע עם הגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"שתי שורות של תמונות או לוגואים שנעות אופקית בכיוונים מנוגדים, לא בלולאה אלא בקשר ישיר לגלילה: גוללים למטה, השורה העליונה נוסעת ימינה והתחתונה שמאלה. עוצרים, הכל עוצר.",
  when:"קיר לוגואים, גלריית פרויקטים, פס תמונות בין סקשנים. ששה עד עשרה פריטים בשורה.",
  note:"בלי pin: x של כל שורה הוא פונקציה של progress הסקשן במסך (מהכניסה ליציאה), ולכן המסוע תמיד בתנועה כשהוא נראה ולא דורש גלילה נוספת. במובייל המרחק קטן ל-40vw כדי שלא יעברו יותר מדי פריטים.",
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
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const D=()=>innerWidth*(matchMedia("(max-width:767px)").matches?.4:.3);
  // RTL: שורה ראשונה מתחילה מוזזת שמאלה ונוסעת ימינה; השנייה הפוך
  gsap.fromTo(".cv-row.r1",{x:()=>-D()},{x:()=>D(),ease:"none",scrollTrigger:{trigger:".cv-belt",start:"top bottom",end:"bottom top",scrub:.4,invalidateOnRefresh:true}});
  gsap.fromTo(".cv-row.r2",{x:()=>D()},{x:()=>-D(),ease:"none",scrollTrigger:{trigger:".cv-belt",start:"top bottom",end:"bottom top",scrub:.4,invalidateOnRefresh:true}});
})();`
},
{
  id:"g124", cat:"gsap", name:"טבלת השוואה שמתמלאת בגלילה", tech:"GSAP · ScrollTrigger · DrawSVG", status:"ממתין",
  desc:"טבלת \"אנחנו מול הדרך הישנה\" שהשורות שלה נדלקות אחת אחרי השנייה בכניסה, וסימני הווי מציירים את עצמם בעמודה שלנו בזמן שהאיקסים בעמודה השנייה נמחקים. השוואה שקוראים בקצב.",
  when:"עמוד מכירה, השוואת חבילות, \"למה אנחנו\". ארבע עד שבע שורות, שתי עמודות.",
  note:"כל שורה היא טריגר משלה (batch), הווי הוא path עם DrawSVG והאיקס דוהה. עמודת \"אנחנו\" מודגשת ברקע עדין קבוע, לא במעבר. במובייל הטבלה נשארת טבלה (שתי עמודות צרות), הפונט יורד ל-14px.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.cmp{max-width:min(860px,94vw);margin-inline:auto;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--card)}
.cmp-row{display:grid;grid-template-columns:1.6fr 1fr 1fr;align-items:center;border-bottom:1px solid var(--line);opacity:.35;translate:0 10px}
.cmp-row:last-child{border-bottom:0}
.cmp-row.head{opacity:1;translate:0;background:var(--bg);font-size:13px;color:var(--muted);letter-spacing:.06em}
.cmp-row>div{padding:clamp(12px,1.6vw,20px)}
.cmp-row .us{background:color-mix(in srgb,var(--accent) 7%,transparent);text-align:center}
.cmp-row .them{text-align:center;color:var(--muted)}
.cmp-row b{font-size:clamp(15px,1.5vw,18px)}
.cmp svg{width:26px;height:26px;overflow:visible;vertical-align:middle}
.cmp .ok path{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.cmp .no path{fill:none;stroke:var(--muted);stroke-width:2.5;stroke-linecap:round}
@media(max-width:767px){.cmp-row{grid-template-columns:1.3fr 1fr 1fr}.cmp-row b{font-size:14px}.cmp svg{width:20px;height:20px}}`,
  html:`<div class="stage"><div class="cmp">
  <div class="cmp-row head"><div>מה מקבלים</div><div class="us">אצלנו</div><div class="them">בדרך הישנה</div></div>
  <div class="cmp-row"><div><b>אפיון לפני עיצוב</b></div><div class="us"><svg class="ok" viewBox="0 0 24 24"><path d="M4 13l5 5 11-12"/></svg></div><div class="them"><svg class="no" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row"><div><b>קופי שנכתב לגולש</b></div><div class="us"><svg class="ok" viewBox="0 0 24 24"><path d="M4 13l5 5 11-12"/></svg></div><div class="them"><svg class="no" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row"><div><b>מובייל קודם</b></div><div class="us"><svg class="ok" viewBox="0 0 24 24"><path d="M4 13l5 5 11-12"/></svg></div><div class="them"><svg class="no" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row"><div><b>מדידה מהיום הראשון</b></div><div class="us"><svg class="ok" viewBox="0 0 24 24"><path d="M4 13l5 5 11-12"/></svg></div><div class="them"><svg class="no" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
  <div class="cmp-row"><div><b>עלייה תוך שבועיים</b></div><div class="us"><svg class="ok" viewBox="0 0 24 24"><path d="M4 13l5 5 11-12"/></svg></div><div class="them"><svg class="no" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></div></div>
</div></div>`,
  js:`(function(){
  const rows=gsap.utils.toArray(".cmp-row:not(.head)");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(rows,{opacity:1,translate:"0 0"});return;}
  gsap.set(".cmp .ok path",{drawSVG:"0%"});
  ScrollTrigger.batch(rows,{start:"top 85%",once:true,onEnter:batch=>{
    batch.forEach((row,i)=>{
      gsap.timeline({delay:i*.12})
        .to(row,{opacity:1,translate:"0 0",duration:.45,ease:"power3.out"})
        .to(row.querySelector(".ok path"),{drawSVG:"100%",duration:.4,ease:"power2.inOut"},"-=.2")
        .to(row.querySelector(".no"),{opacity:.35,scale:.85,duration:.3},"-=.3");
    });
  }});
})();`
},
{
  id:"g125", cat:"gsap", name:"כרטיס זכוכית שמטה ומבריק בגלילה", tech:"GSAP · ScrollTrigger · 3D", status:"ממתין",
  desc:"כרטיס (חברות, אשראי, כרטיס מוצר) שמטה בתלת-ממד ככל שגוללים, ופס אור עובר עליו באלכסון בדיוק ברגע ההטיה. כמו להחזיק אותו ביד מול החלון.",
  when:"כרטיס חברות, מנוי, כרטיס מתנה, הצגת מוצר שטוח. פעם אחת בעמוד.",
  note:"rotateX ו-rotateY בסקראב על טווח קצר של המסך (הכרטיס לא מוצמד), והברק הוא גרדיאנט שה-background-position שלו נקשר לאותו progress. במובייל ההטיה חצי.",
  libs:["gsap","ScrollTrigger"],
  css:`.gc-wrap{min-height:120vh;display:grid;place-items:center;perspective:1200px;padding-inline:var(--gutter)}
.gc{position:relative;width:min(520px,90vw);aspect-ratio:1.586;border-radius:24px;background:linear-gradient(135deg,color-mix(in srgb,var(--ink) 92%,var(--accent)),var(--ink));color:var(--bg);padding:clamp(18px,3vw,32px);display:flex;flex-direction:column;justify-content:space-between;
  box-shadow:0 40px 80px rgba(0,0,0,.3);will-change:transform;transform-style:preserve-3d;overflow:hidden}
.gc::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.35) 50%,transparent 60%);background-size:300% 100%;background-position:120% 0;pointer-events:none}
.gc-top{display:flex;justify-content:space-between;align-items:center;font-size:13px;letter-spacing:.14em;opacity:.8}
.gc-chip{width:44px;height:32px;border-radius:8px;background:linear-gradient(135deg,#f1d27a,#b98a2e)}
.gc-num{font-size:clamp(18px,2.6vw,28px);letter-spacing:.14em;font-variant-numeric:tabular-nums;direction:ltr;text-align:left}
.gc-bot{display:flex;justify-content:space-between;font-size:14px}
.gc-bot b{display:block;font-size:11px;opacity:.6;letter-spacing:.12em;margin-bottom:2px;font-weight:500}`,
  html:`<div class="gc-wrap"><div class="gc">
  <div class="gc-top"><span>חבר מועדון</span><span class="gc-chip"></span></div>
  <div class="gc-num">•••• •••• •••• 2026</div>
  <div class="gc-bot"><div><b>שם</b>ליאב מצרי</div><div><b>בתוקף עד</b>12/28</div></div>
</div></div>`,
  js:`(function(){
  const card=document.querySelector(".gc");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const k=matchMedia("(max-width:767px)").matches?.5:1;
  gsap.timeline({scrollTrigger:{trigger:".gc-wrap",start:"top bottom",end:"bottom top",scrub:.6}})
    .fromTo(card,{rotateX:18*k,rotateY:-22*k},{rotateX:-14*k,rotateY:22*k,ease:"none",duration:1},0)
    // הברק: background-position על הפסאודו לא נגיש ל-GSAP, לכן משתנה CSS על הכרטיס
    .fromTo(card,{"--shine":"120%"},{"--shine":"-20%",ease:"none",duration:1},0);
  const st=document.createElement("style");st.textContent=".gc::after{background-position:var(--shine,120%) 0}";document.head.appendChild(st);
})();`
},
{
  id:"g126", cat:"gsap", name:"גרף קו שנמשך עם נקודה בקצה", tech:"GSAP · ScrollTrigger · DrawSVG", status:"ממתין",
  desc:"גרף צמיחה שהקו שלו נמשך משמאל לימין בקצב הגלילה, נקודה זוהרת רוכבת על הקצה, והערך מעליה מתעדכן. סיפור צמיחה בלי טבלה.",
  when:"תוצאות לקוח, צמיחת החברה, \"לפני ואחרי\" במספרים. גרף אחד, נתון אחד.",
  note:"DrawSVG על path הקו, והנקודה ממוקמת בכל עדכון לפי getPointAtLength של אותו path. הערך מחושב מהנקודה. במובייל הגרף נמוך יותר והתווית מעל הנקודה קטנה.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.lg{max-width:min(900px,94vw);margin-inline:auto;padding-block:16vh 30vh}
.lg h2{margin:0 0 6px;font-size:var(--fs-h2)}
.lg p{margin:0 0 26px;color:var(--muted)}
.lg-box{position:relative;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:24px;direction:ltr}
.lg svg{width:100%;height:auto;overflow:visible;display:block}
.lg-grid line{stroke:var(--line);stroke-width:1}
.lg-line{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.lg-fill{fill:url(#lg-g);opacity:0}
.lg-dot{fill:var(--accent);stroke:var(--card);stroke-width:4}
.lg-val{position:absolute;background:var(--ink);color:var(--bg);font-size:14px;font-weight:700;padding:6px 10px;border-radius:8px;translate:-50% -140%;pointer-events:none;font-variant-numeric:tabular-nums;white-space:nowrap}
.lg-ax{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:10px}`,
  html:`<div class="stage"><div class="lg">
  <h2>פניות בחודש, לפני ואחרי</h2><p>אותו עסק, אותו תקציב פרסום. רק האתר השתנה.</p>
  <div class="lg-box">
    <svg viewBox="0 0 800 300" aria-label="גרף פניות">
      <defs><linearGradient id="lg-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".25"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
      <g class="lg-grid"><line x1="0" y1="75" x2="800" y2="75"/><line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="225" x2="800" y2="225"/><line x1="0" y1="300" x2="800" y2="300"/></g>
      <path class="lg-fill" d="M0 250 C 100 245, 160 240, 240 236 C 320 232, 380 228, 420 200 C 470 165, 520 120, 600 90 C 680 60, 740 40, 800 30 V 300 H 0 Z"/>
      <path class="lg-line" d="M0 250 C 100 245, 160 240, 240 236 C 320 232, 380 228, 420 200 C 470 165, 520 120, 600 90 C 680 60, 740 40, 800 30"/>
      <circle class="lg-dot" r="7" cx="0" cy="250"/>
    </svg>
    <div class="lg-val">12</div>
    <div class="lg-ax" dir="rtl"><span>ינואר</span><span>האתר החדש עלה</span><span>דצמבר</span></div>
  </div>
</div></div>`,
  js:`(function(){
  const box=document.querySelector(".lg-box"),svg=box.querySelector("svg"),line=svg.querySelector(".lg-line"),dot=svg.querySelector(".lg-dot"),val=box.querySelector(".lg-val");
  const L=line.getTotalLength(),MIN=12,MAX=118;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const o={p:reduce?1:0};
  function paint(){const pt=line.getPointAtLength(L*o.p);dot.setAttribute("cx",pt.x);dot.setAttribute("cy",pt.y);
    // מיקום התווית: מקואורדינטות SVG לפיקסלים של הקופסה
    const r=svg.getBoundingClientRect(),b=box.getBoundingClientRect();val.style.left=(r.left-b.left+pt.x/800*r.width)+"px";val.style.top=(r.top-b.top+pt.y/300*r.height)+"px";
    val.textContent=Math.round(MIN+(MAX-MIN)*Math.pow(o.p,1.6));}
  gsap.set(line,{drawSVG:reduce?"100%":"0%"});
  if(reduce){gsap.set(".lg-fill",{opacity:1});paint();return;}
  gsap.timeline({onUpdate:paint,scrollTrigger:{trigger:".lg-box",start:"top 80%",end:"top 25%",scrub:.5,onRefresh:paint}})
    .to(line,{drawSVG:"100%",ease:"none",duration:1},0)
    .to(o,{p:1,ease:"none",duration:1},0)
    .to(".lg-fill",{opacity:1,duration:.3},.7);
  paint();
})();`
},
{
  id:"g127", cat:"gsap", name:"מעבר לכהה בגלילה: עיגול שגדל ומחליף ערכה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"אותו סקשן בשתי ערכות, בהירה וכהה, זה על זה. עיגול קטן בפינה גדל עם הגלילה עד שהוא מכסה הכל, והערכה הכהה תופסת את המסך. מעבר יום ולילה בלי חיתוך.",
  when:"מעבר בין חלק \"בעיה\" לחלק \"פתרון\", כניסה לפרק כהה של האתר, פתיחת סקשן פרימיום. פעם אחת בעמוד.",
  note:"השכבה הכהה היא עותק של התוכן עם ערכה הפוכה ו-clip-path circle שהרדיוס שלו בסקראב; המרכז יושב בפינה שממנה מגיע הלילה. שני העותקים באותו DOM, לכן הטקסט זהה בהכרח. במובייל המרכז באמצע למעלה.",
  libs:["gsap","ScrollTrigger"],
  css:`.tn2{position:relative;height:220vh}
.tn2-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.tn2-l{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px}
.tn2-l.light{background:var(--bg);color:var(--ink)}
.tn2-l.dark{background:var(--ink);color:var(--bg);clip-path:circle(0% at 88% 12%);will-change:clip-path}
.tn2-l h2{margin:0 0 12px;font-size:var(--fs-h2);max-width:20ch}
.tn2-l p{margin:0;opacity:.75;max-width:40ch;line-height:1.7}
.tn2-l .gbtn{margin-top:22px}
.tn2-l.dark .gbtn{background:var(--bg);color:var(--ink)}
@media(max-width:767px){.tn2-l.dark{clip-path:circle(0% at 50% 8%)}}`,
  html:`<div class="tn2">
  <div class="tn2-pin">
    <div class="tn2-l light"><div><h2>ביום זה נראה ככה</h2><p>אתר רגיל, מסודר, כמו כולם.</p><button class="gbtn">להתחיל</button></div></div>
    <div class="tn2-l dark"><div><h2>ובלילה זה מקבל אופי</h2><p>אותו תוכן, ערכה אחרת, ותחושה אחרת לגמרי.</p><button class="gbtn">להתחיל</button></div></div>
  </div>
</div>`,
  js:`(function(){
  const dark=document.querySelector(".tn2-l.dark");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(dark,{clipPath:"circle(150% at 50% 50%)"});return;}
  const mob=matchMedia("(max-width:767px)").matches,at=mob?"50% 8%":"88% 12%";
  gsap.fromTo(dark,{clipPath:"circle(0% at "+at+")"},{clipPath:"circle(150% at "+at+")",ease:"power2.in",scrollTrigger:{trigger:".tn2",start:"top top",end:"bottom bottom",scrub:.5}});
})();`
},
{
  id:"g128", cat:"gsap", name:"מגירה שנפתחת מתחת לסקשן", tech:"GSAP · ScrollTrigger · pin", status:"ממתין",
  desc:"הסקשן העליון נשאר במקום, והבא נשלף מתחתיו הצידה כמו מגירה, עד שהוא תופס את המסך והעליון נדחק החוצה. מעבר צדדי במקום עוד גלילה למטה.",
  when:"מעבר לסקשן \"הפתעה\": מבצע, פרויקט נבחר, הצעה מיוחדת. פעם אחת בעמוד.",
  note:"שני סקשנים באותו מכל מוצמד. התחתון מתחיל מוזז ב-xPercent מלא בכיוון ההתחלה (ב-RTL נשלף מימין) עם צל שמדגיש שהוא מתחת, והעליון יוצא לצד השני עם קצת קנה מידה. במובייל אותו דבר, קצר יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.dr{position:relative;height:200vh}
.dr-pin{position:sticky;top:0;height:100vh;overflow:hidden}
.dr-a,.dr-b{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;will-change:transform}
.dr-a{background:var(--card);z-index:2}
.dr-b{background:var(--accent);color:var(--accent-ink);z-index:1;box-shadow:-40px 0 80px rgba(0,0,0,.25)}
.dr-a h2,.dr-b h2{margin:0 0 10px;font-size:var(--fs-h2);max-width:20ch}
.dr-a p,.dr-b p{margin:0;opacity:.8;max-width:40ch;line-height:1.7}
.dr-hint{position:absolute;bottom:22px;inset-inline:0;text-align:center;font-size:13px;color:var(--muted)}`,
  html:`<div class="dr">
  <div class="dr-pin">
    <section class="dr-a"><div><h2>העבודה השוטפת</h2><p>אתרים, מערכות, ליווי. מה שאנחנו עושים כל יום.</p></div><p class="dr-hint">גלול, יש עוד משהו</p></section>
    <section class="dr-b"><div><h2>ומשהו שלא סיפרנו</h2><p>חבילת פתיחה לעסקים חדשים: אתר ראשון במחיר שמאפשר להתחיל.</p></div></section>
  </div>
</div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".dr-a",{opacity:0});return;}
  const rtl=getComputedStyle(document.documentElement).direction==="rtl",s=rtl?1:-1;
  gsap.set(".dr-b",{xPercent:100*s,zIndex:3});   // המגירה מתחילה מחוץ למסך בצד ההתחלה
  gsap.timeline({scrollTrigger:{trigger:".dr",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(".dr-b",{xPercent:0,duration:1,ease:"power2.inOut"},0)
    .to(".dr-a",{xPercent:-30*s,scale:.94,duration:1,ease:"power2.inOut"},0)
    .to(".dr-hint",{opacity:0,duration:.15},0);
})();`
},
];
