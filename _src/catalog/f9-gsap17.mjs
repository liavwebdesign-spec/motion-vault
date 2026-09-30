// סבב עשירי, חלק א (3.9.2026): GSAP בלבד, הכל מונע גלילה.
export default [
{
  id:"g63", cat:"gsap", name:"סקשן שמתקפל כמו דף בגלילה", tech:"GSAP · ScrollTrigger · rotateX", status:"ממתין",
  desc:"הסקשן לא נגלל החוצה אלא מתקפל אחורה על ציר עליון, כמו דף שמתהפך, והסקשן הבא נחשף מתחתיו.",
  when:"מעבר בין פרקים בעמוד ארוך, סוף סקשן הירו, מעבר בין שירות לשירות. הופך את הרווח בין שני סקשנים לרגע במקום לחתך.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP או בהפחתת תנועה: שני הדפים זה אחר זה, הקדמי ראשון (ב-DOM האחורי קודם, ולכן column-reverse).
   הבמה והקיפול יושבים תחת .mv-on, שהסקריפט מוסיף רק כשהתנועה מותרת */
.fo-stage{display:flex;flex-direction:column-reverse}
.fo-page{position:relative;display:grid;place-items:center;text-align:center;padding:var(--sec) var(--gutter)}
.fo-page.front{background:var(--ink);color:var(--bg)}
.fo-page.back{background:var(--bg);color:var(--ink)}
.fo-page h3{margin:0;font-size:clamp(28px,5vw,66px);max-width:16ch;line-height:1.12}
.fo-page p{margin:14px 0 0;max-width:44ch;font-size:17px;line-height:1.8;opacity:.82;text-wrap:pretty}
.fo-shade{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:3}
/* הבמה */
.fo.mv-on{height:230vh;position:relative}
.fo.mv-on .fo-stage{display:block;position:sticky;top:0;height:100vh;overflow:hidden;perspective:1400px;perspective-origin:50% 0%}
.fo.mv-on .fo-page{position:absolute;inset:0;padding-block:0;transform-origin:50% 0%;backface-visibility:hidden;will-change:transform}
.fo.mv-on .fo-page.front{z-index:2}
.fo.mv-on .fo-page.back{z-index:1}`,
  html:`<div class="fo"><div class="fo-stage">
  <section class="fo-page back"><div><h3>ומתחתיו מחכה הבא</h3>
    <p>הסקשן השני היה שם כל הזמן. הקיפול רק הסיר את מה שכיסה אותו.</p></div></section>
  <section class="fo-page front"><div><h3>הסקשן הזה מתקפל</h3>
    <p>גלול. הוא לא נגלל החוצה, הוא מסתובב אחורה על הציר העליון שלו.</p></div>
    <div class="fo-shade"></div></section>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה שני הדפים עומדים זה אחר זה
  const root=document.querySelector(".fo"),front=root.querySelector(".fo-page.front"),shade=root.querySelector(".fo-shade");
  // הבמה נדלקת רק כשהתנועה מותרת. בהפחתת תנועה הדף הקדמי והדף שמתחתיו פשוט עומדים זה אחר זה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("mv-on");
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      // הציר למעלה, ולכן הדף נופל אחורה ולא מסתובב סביב המרכז
      .fromTo(front,{rotateX:0},{rotateX:-82,ease:"none"},0)
      // ההצללה גדלה עם הזווית, וזה מה שמוכר את התלת-ממד
      .fromTo(shade,{opacity:0},{opacity:.55,ease:"none"},0);
    return ()=>root.classList.remove("mv-on");
  });
})();`,
  runway:false,
  note:"שלושה פרטים הופכים את זה מסיבוב לקיפול. `transform-origin` בראש האלמנט ו-`perspective-origin` בראש הבמה: יחד הם מציבים את הצופה מול הציר, וזה מה שגורם לדף ליפול אחורה ולא להסתובב סביב עצמו. עצירה בשמונים ומשהו מעלות ולא בתשעים, כי בזווית ישרה הדף נעלם לגמרי ורואים קו. וההצללה שגדלה עם הזווית: בלעדיה המוח קורא את זה כשינוי גודל. `backface-visibility:hidden` מונע הצצה לצד האחורי ברגע שעוברים את הזווית. **בהפחתת תנועה או כשהספרייה לא נטענה** הבמה לא נדלקת (היא יושבת תחת `.mv-on`), והדפים עומדים זה אחר זה, הקדמי ראשון, כך שגם הסקשן שמתחתיו נקרא."
},
{
  id:"g64", cat:"gsap", name:"מדיה שעוברת בין שתי שכבות של הכותרת", tech:"GSAP · ScrollTrigger · z-index", status:"ממתין",
  desc:"אותה כותרת מודפסת פעמיים, אחת מאחורי התמונה ואחת לפניה. התמונה עולה בגלילה ונכנסת בין השתיים, כך שהיא נראית מונחת בתוך הטקסט.",
  when:"הירו של עמוד הבית, פתיחת סקשן מוצר, שם המותג. אחד מהרגעים הבודדים שגורמים למבקר לעצור ולהסתכל שוב.",
  libs:["gsap","ScrollTrigger"],
  css:`.sw{height:260vh;position:relative}
.sw-stage{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.sw-word{position:absolute;margin:0;font-size:clamp(52px,13vw,190px);font-weight:800;line-height:1;
  letter-spacing:-.02em;text-align:center;white-space:nowrap;color:var(--ink)}
.sw-word.back{z-index:1}
/* השכבה הקדמית נחתכת בחציה העליון בלבד, ולכן היא מכסה רק את החלק שהתמונה אמורה להיכנס מאחוריו */
.sw-word.front{z-index:3;clip-path:inset(0 0 52% 0)}
.sw-media{position:relative;z-index:2;width:min(420px,62vw);aspect-ratio:3/4;border-radius:18px;
  font-size:0;will-change:transform;box-shadow:0 30px 70px rgba(20,20,40,.28)}
/* הכיתוב בראש הבמה: בתחתית התמונה עוברת עליו בתחילת המהלך, וכאן גם בסוף המהלך היא נעצרת מתחתיו */
.sw-cap{position:absolute;top:2vh;margin:0;inset-inline:0;text-align:center;color:var(--muted);font-size:15px;z-index:4}`,
  html:`<div class="sw"><div class="sw-stage">
  <h2 class="sw-word back">סטודיו</h2>
  <div class="ph sw-media ph-b"></div>
  <div class="sw-word front" aria-hidden="true">סטודיו</div>
  <p class="sw-cap">גלול. התמונה נכנסת בין שתי השכבות של המילה.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const media=document.querySelector(".sw-media");
  // בהפחתת תנועה התמונה עומדת במקומה בין שתי השכבות
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.fromTo(media,{yPercent:62,scale:.82},{yPercent:-8,scale:1,ease:"none",
      scrollTrigger:{trigger:".sw",start:"top top",end:"bottom bottom",scrub:.55}});
  });
})();`,
  runway:false,
  note:"אין כאן שום קסם בקוד: כל העבודה בסידור השכבות. אותה מילה מודפסת פעמיים באותו מקום, התמונה ביניהן, והשכבה הקדמית נחתכת ב-`clip-path` כך שהיא קיימת רק בחלק העליון. התוצאה היא שהתמונה נראית עוברת מאחורי החלק העליון של האותיות ולפני החלק התחתון. **הכלל היחיד שחייבים לשמור**: אחוז החיתוך בשכבה הקדמית חייב להתאים לגובה שאליו התמונה מגיעה. אם משנים את אחד מהם בלי השני, האשליה נשברת. הטקסט מוכפל, ולכן השכבה הקדמית היא `div` עם `aria-hidden`, וקורא מסך מקריא את המילה פעם אחת."
},
{
  id:"g65", cat:"gsap", name:"רצועה אופקית שהפריט במרכזה גדל", tech:"GSAP · ScrollTrigger · containerAnimation", status:"ממתין",
  desc:"רצועת כרטיסים שנעה לרוחב לפי הגלילה האנכית, וכל כרטיס גדל ומתחדד כשהוא מגיע למרכז המסך ומתכווץ כשהוא יוצא ממנו.",
  when:"תיק עבודות, קטלוג מוצרים, ציר שנים, המלצות. מפנה את תשומת הלב לפריט אחד בכל רגע במקום להציג שורה שטוחה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP או בהפחתת תנועה: שורה רגילה שגוללים לרוחב באצבע או בגלגלת, בלי במה ובלי הגדלה.
   הבמה יושבת תחת .mv-on, שהסקריפט מוסיף רק כשהתנועה מותרת */
.ctr-stage{padding-block:var(--sec)}
.ctr-view{overflow-x:auto;overscroll-behavior-x:contain}
.ctr-track{display:flex;gap:clamp(16px,2.4vw,40px);width:max-content;padding-inline:var(--gutter)}
.ctr-item{width:clamp(180px,22vw,320px);flex:none;border-radius:18px;overflow:hidden;background:var(--card);
  border:1px solid var(--line)}
.ctr-item .ph{aspect-ratio:3/4;border-radius:0;font-size:0}
.ctr-item b{display:block;padding:12px 14px 14px;font-size:15px}
.ctr-cap{display:none;position:absolute;bottom:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}
/* הבמה */
.ctr.mv-on{height:340vh;position:relative}
.ctr.mv-on .ctr-stage{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;align-content:center;padding-block:0}
/* בעמוד עברי הרצועה נשארת RTL, אבל המדידה של ScrollTrigger דורשת הקשר LTR על המעטפת */
.ctr.mv-on .ctr-view{direction:ltr;overflow:hidden}
.ctr.mv-on .ctr-track{padding-inline:44vw;direction:rtl}
.ctr.mv-on .ctr-item{will-change:transform,filter}
.ctr.mv-on .ctr-cap{display:block}`,
  html:`<div class="ctr"><div class="ctr-stage">
  <div class="ctr-view"><div class="ctr-track">
    <article class="ctr-item"><div class="ph ph-a"></div><b>משרד עורכי דין</b></article>
    <article class="ctr-item"><div class="ph ph-c"></div><b>מותג קוסמטיקה</b></article>
    <article class="ctr-item"><div class="ph ph-d"></div><b>קורס דיגיטלי</b></article>
    <article class="ctr-item"><div class="ph ph-e"></div><b>פורטל לקוחות</b></article>
    <article class="ctr-item"><div class="ph ph-b"></div><b>קליניקה פרטית</b></article>
    <article class="ctr-item"><div class="ph ph-f"></div><b>יבואן ריהוט</b></article>
  </div></div>
  <p class="ctr-cap">גלול. מי שבמרכז גדל וחד, והשאר נסוגים.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה נשארת שורה רגילה שגוללים לרוחב
  const root=document.querySelector(".ctr"),track=root.querySelector(".ctr-track"),view=root.querySelector(".ctr-view");
  const items=gsap.utils.toArray(".ctr-item");
  // הבמה נדלקת רק כשהתנועה מותרת. בהפחתת תנועה אין הזזה אופקית עם הגלילה האנכית, אלא שורה שגוללים בעצמם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("mv-on");
    const dist=()=>track.scrollWidth-view.clientWidth;

    // הדעיכה נמדדת ביחידות של כרטיס אחד ולא של חצי מסך. עם חצי מסך גם השכן הצמוד
    // מקבל כמעט את אותו גודל, ואז אין באמת פריט אחד שתופס את תשומת הלב.
    const step=()=>{
      const first=items[0].getBoundingClientRect();
      const gap=items.length>1?Math.abs(items[1].getBoundingClientRect().left-first.left):first.width;
      return gap||first.width||1;
    };
    const paint=()=>{
      const mid=innerWidth/2,unit=step();
      items.forEach(el=>{
        const r=el.getBoundingClientRect();
        const d=Math.min(1,Math.abs(r.left+r.width/2-mid)/(unit*1.7)); // 0 במרכז, 1 בערך שני כרטיסים משם
        const f=1-d*d;                                             // דעיכה רכה בקצה, חדה במרכז
        gsap.set(el,{scale:.84+f*.24,opacity:.5+f*.5,
          filter:"blur("+((1-f)*2.4).toFixed(2)+"px)",zIndex:Math.round(f*10)});
      });
    };

    // בעברית הרצועה מתחילה בימין, ולכן היא נעה ל-x חיובי.
    // הצביעה רצה מה-onUpdate של הטווין עצמו, כלומר רק כשהרצועה באמת זזה (כולל ההחלקה של ה-scrub),
    // ולא בלולאה על כל פריים שמודדת וכותבת blur גם כשאף אחד לא גולל.
    gsap.fromTo(track,{x:()=>-dist()},{x:0,ease:"none",onUpdate:paint,
      scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true,onRefresh:paint}});
    paint();
    return ()=>root.classList.remove("mv-on");
  });
})();`,
  runway:false,
  note:"שני דברים. הראשון הוא מלכודת ה-RTL שכבר תפסה אותנו: ילד `width:max-content` בתוך קונטיינר RTL מתחיל מהקצה הימני, ואז כל המדידות של ScrollTrigger יוצאות מוזזות. לכן המעטפת מקבלת `direction:ltr` והרצועה עצמה `rtl`. השני הוא שיטת המדידה: במקום טריגר נפרד לכל כרטיס, יש פונקציית צביעה אחת שמודדת את המרחק מהמרכז ומתרגמת אותו לגודל, לאטימות ולחדות. **שני הידוקים שנדרשו**: המרחק נמדד ביחידות של רוחב כרטיס ולא של חצי מסך, אחרת גם השכן הצמוד כמעט זהה למרכזי ואין פריט אחד שמושך את העין; והצביעה רצה מה-`onUpdate` של הטווין, רק כשהרצועה זזה. לולאת ticker שרצה כל עוד הרצועה על המסך מדדה שבעה דברים וכתבה שש פעמים `blur` בכל פריים, גם כשאף אחד לא גלל. **בהפחתת תנועה או כשהספרייה לא נטענה** הבמה לא נדלקת (היא יושבת תחת `.mv-on`), והכרטיסים הם שורה רגילה שגוללים לרוחב באצבע, בלי הזזה שנגררת אחרי הגלילה האנכית."
},
{
  id:"g66", cat:"gsap", name:"רקע שמתחלף בין סקשנים בחשיפה מסכתית", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רקע אחד קבוע מאחורי כל הסקשנים, שמתחלף בין תמונות בחשיפה מלמטה כשעוברים מסקשן לסקשן. הטקסט נשאר בחזית ורק העולם שמאחוריו משתנה.",
  when:"עמוד סיפור מותג, שלבי תהליך, פרקי שירות, עמוד אודות. נותן לעמוד ארוך תחושת רצף במקום רצף של קופסאות.",
  libs:["gsap","ScrollTrigger"],
  css:`.bgs{position:relative}
.bgs-fixed{position:sticky;top:0;height:100vh;overflow:hidden;z-index:0}
.bgs-layer{position:absolute;inset:0;border-radius:0;font-size:0;clip-path:inset(100% 0 0 0)}
.bgs-layer:first-child{clip-path:inset(0 0 0 0)}
.bgs-veil{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,20,.55),rgba(10,10,20,.72))}
.bgs-content{position:relative;z-index:1;margin-top:-100vh}
.bgs-sec{min-height:100vh;display:grid;place-items:center;text-align:center;padding:0 var(--gutter);color:#fff}
.bgs-sec h3{margin:0;font-size:clamp(28px,4.6vw,60px);max-width:18ch;line-height:1.14}
.bgs-sec p{margin:14px auto 0;max-width:44ch;font-size:17px;line-height:1.8;opacity:.86}
.bgs-num{display:block;font-size:13px;letter-spacing:.1em;opacity:.7;margin-bottom:12px}`,
  html:`<div class="bgs">
  <div class="bgs-fixed">
    <div class="ph bgs-layer ph-a"></div>
    <div class="ph bgs-layer ph-c"></div>
    <div class="ph bgs-layer ph-d"></div>
    <div class="ph bgs-layer ph-e"></div>
    <div class="bgs-veil"></div>
  </div>
  <div class="bgs-content">
    <section class="bgs-sec"><div><span class="bgs-num">שלב 01</span><h3>שיחת אפיון</h3>
      <p>מבינים את העסק ואת הלקוח לפני שנוגעים בעיצוב.</p></div></section>
    <section class="bgs-sec"><div><span class="bgs-num">שלב 02</span><h3>קופי ומבנה</h3>
      <p>המסרים נכתבים קודם, וסדר הסקשנים נגזר מהם.</p></div></section>
    <section class="bgs-sec"><div><span class="bgs-num">שלב 03</span><h3>עיצוב ופיתוח</h3>
      <p>המבנה הופך לאתר חי, מהיר, שנראה נכון בכל מסך.</p></div></section>
    <section class="bgs-sec"><div><span class="bgs-num">שלב 04</span><h3>עלייה ומדידה</h3>
      <p>מחברים מעקב, עולים לאוויר, ומשפרים לפי נתונים.</p></div></section>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה נשאר הרקע הראשון, והטקסט גלוי מעליו
  const layers=gsap.utils.toArray(".bgs-layer");
  const secs=gsap.utils.toArray(".bgs-sec");
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    secs.forEach((sec,i)=>{
      if(i===0)return;
      // כל שכבה נחשפת מלמטה בזמן שהסקשן שלה עולה, ונשארת חשופה אחריו
      gsap.fromTo(layers[i],{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0% 0 0 0)",ease:"none",
        scrollTrigger:{trigger:sec,start:"top 85%",end:"top 25%",scrub:.5}});
    });
  });
  // בהפחתת תנועה אין מסכה שנפתחת: הרקע מתחלף במקום כשהסקשן מגיע לאמצע המסך, וחוזר כשגוללים אחורה
  mm.add("(prefers-reduced-motion: reduce)",()=>{
    secs.forEach((sec,i)=>{
      if(i===0)return;
      ScrollTrigger.create({trigger:sec,start:"top 55%",endTrigger:".bgs",end:"bottom top",
        onEnter:()=>gsap.set(layers[i],{clipPath:"inset(0% 0 0 0)"}),
        onLeaveBack:()=>gsap.set(layers[i],{clipPath:"inset(100% 0 0 0)"})});
    });
    return ()=>gsap.set(layers.slice(1),{clearProps:"clipPath"});
  });
})();`,
  runway:false,
  note:"המבנה הוא מה שעושה את העבודה: רצועת רקע `sticky` בגובה מסך, ואחריה התוכן עם `margin-top:-100vh` שמושך אותו בדיוק מעל הרקע. כך הרקע נשאר במקום בזמן שהתוכן גולל מעליו, בלי `position:fixed` ובלי pin. החשיפה היא `clip-path` מלמטה ולא הצלבת שקיפויות, כי הצלבה מייצרת רגע עכור שבו שתי התמונות נראות יחד. השכבה הראשונה חשופה מראש, וכל אחת אחריה נחשפת בטווח של הסקשן שלה ונשארת. הצעיף הכהה מעל הכל הוא מה שמאפשר לכתוב טקסט לבן על תמונות שלא בחרנו. בהפחתת תנועה אין מסכה שנפתחת: הרקע מתחלף במקום כשהסקשן מגיע לאמצע המסך, וחוזר לקודם כשגוללים אחורה."
},
{
  id:"g67", cat:"gsap", name:"קלפים שנפרשים כמניפה בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"ערימת קלפים אחת במרכז שנפרשת בגלילה למניפה, כל קלף בזווית ובגובה משלו, ונאספת בחזרה בגלילה למעלה.",
  when:"סקשן שירותים, יתרונות, חבילות, צוות. לוקח ארבעה עד שישה פריטים והופך את ההצגה שלהם לרגע אחד במקום לרשימה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP או בהפחתת תנועה: הקלפים בשורה אחת (ובמסך צר בטור), בלי במה ובלי גלילה עודפת.
   הבמה והערימה יושבות תחת .mv-on, שהסקריפט מוסיף רק כשהתנועה מותרת */
.fn-stage{display:grid;place-items:center;padding:var(--sec) var(--gutter)}
.fn-deck{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;width:min(1000px,100%)}
.fn-card{flex:1 1 150px;max-width:240px;
  border-radius:18px;overflow:hidden;background:var(--card);border:1px solid var(--line);
  box-shadow:0 20px 50px rgba(20,20,40,.16)}
.fn-card .ph{aspect-ratio:1;border-radius:0;font-size:0}
.fn-card b{display:block;padding:12px 14px 4px;font-size:15px}
.fn-card span{display:block;padding:0 14px 14px;font-size:13px;color:var(--muted);line-height:1.55}
.fn-cap{display:none;position:absolute;bottom:7vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}
/* הבמה: ערימה אחת במרכז */
.fn.mv-on{height:260vh;position:relative}
.fn.mv-on .fn-stage{position:sticky;top:0;height:100vh;overflow:hidden;padding:0}
.fn.mv-on .fn-deck{display:block;position:relative;width:min(1000px,92vw);height:min(58vh,460px)}
/* מרכוז לוגי בשני הצירים: בעברית inset-inline-start הוא right, ו-margin-inline-start שלילי מחזיר חצי קלף.
   left פיזי יחד עם margin-inline-start הזיז את כל המניפה חצי קלף ימינה */
.fn.mv-on .fn-card{position:absolute;top:0;inset-inline-start:50%;width:clamp(150px,19vw,240px);max-width:none;height:100%;
  margin-inline-start:calc(clamp(150px,19vw,240px) / -2);transform-origin:50% 130%;will-change:transform}
.fn.mv-on .fn-cap{display:block}
/* עד 1023: מניפה של חמישה קלפים לא נכנסת ברוחב. הקלף הופך לשורה (תמונה ולצידה הטקסט), והערימה נפרשת לטור */
@media (max-width:1023px){
  .fn-deck{flex-direction:column;flex-wrap:nowrap;align-items:center}
  .fn-card{flex:none;width:min(340px,100%);max-width:none;height:88px;
    display:grid;grid-template-columns:88px 1fr;grid-template-rows:1fr 1fr}
  .fn-card .ph{grid-row:1/3;aspect-ratio:auto}
  .fn-card b{align-self:end;padding:0 14px 2px}
  .fn-card span{align-self:start;padding:0 14px}
  .fn.mv-on .fn-deck{width:min(340px,86vw);height:88px}
  .fn.mv-on .fn-card{inset-inline:0;width:auto;margin:0;transform-origin:50% 50%}
}`,
  html:`<div class="fn"><div class="fn-stage">
  <div class="fn-deck">
    <article class="fn-card"><div class="ph ph-a"></div><b>אפיון</b><span>מבינים לפני שמעצבים</span></article>
    <article class="fn-card"><div class="ph ph-c"></div><b>קופי</b><span>המסר קובע את המבנה</span></article>
    <article class="fn-card"><div class="ph ph-d"></div><b>עיצוב</b><span>שפה אחת בכל עמוד</span></article>
    <article class="fn-card"><div class="ph ph-e"></div><b>פיתוח</b><span>מהיר ונכון בכל מסך</span></article>
    <article class="fn-card"><div class="ph ph-b"></div><b>מדידה</b><span>יודעים מה עובד</span></article>
  </div>
  <p class="fn-cap">גלול. הערימה נפרשת ונאספת.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה נשארים הקלפים בשורה (ובמסך צר בטור)
  const root=document.querySelector(".fn"),cards=gsap.utils.toArray(".fn-card");
  const n=cards.length, mid=(n-1)/2;
  gsap.matchMedia().add({wide:"(min-width:1024px)",narrow:"(max-width:1023px)",motion:"(prefers-reduced-motion: no-preference)"},ctx=>{
    const {wide,motion}=ctx.conditions;
    if(!motion)return;   // בהפחתת תנועה: השורה או הטור מה-CSS, בלי במה ובלי גלילה עודפת
    root.classList.add("mv-on");
    // במניפה המרחק בין הקלפים הוא עד 62% מרוחב קלף, וקטן לפי הצורך כדי שהקצה המוטה של הקלף החיצוני
    // (הסיבוב סביב נקודה ב-130% מגובה הקלף מזיז את הפינה העליונה החוצה) יישאר 24 פיקסלים בתוך המסך
    const fan=()=>{const w=cards[0].offsetWidth,h=cards[0].offsetHeight,t=(n-1)/2*9*Math.PI/180;
      const edge=w/2*Math.cos(t)+1.3*h*Math.sin(t);
      return Math.min(62,(innerWidth/2-24-edge)/mid/w*100);};
    // בטור הרווח בין הקלפים נגזר מגובה המסך, כדי שגם במסך נמוך כל הקלפים ייכנסו
    const colStep=()=>{const h=cards[0].offsetHeight||88;return Math.min(108,(innerHeight*.78-h)/(n-1)/h*100);};
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    cards.forEach((c,i)=>{
      const off=i-mid;
      // הזווית ומרחק הפריסה נגזרים מהמרחק מהאמצע, ולכן זה נשאר סימטרי בכל מספר קלפים
      const to=wide?{rotation:off*9,xPercent:()=>off*fan(),yPercent:Math.abs(off)*6}
                   :{rotation:off*1.5,xPercent:0,yPercent:()=>off*colStep()};
      tl.fromTo(c,{rotation:0,xPercent:0,yPercent:0,zIndex:n-Math.abs(off)},{...to,ease:"power2.out"},0);
    });
    return ()=>root.classList.remove("mv-on");
  });
})();`,
  runway:false,
  note:"`transform-origin` מתחת לקלף הוא כל הסוד: סיבוב סביב נקודה שנמצאת מתחת לקלף מייצר מניפה, וסיבוב סביב המרכז מייצר ערימה מבולגנת. הזווית והמרחק נגזרים מהמרחק מהקלף האמצעי, ולכן אפשר להוסיף קלף שישי בלי לגעת במספרים. ה-`yPercent` הקטן שגדל עם המרחק מהאמצע הוא מה שמייצר את הקשת: בלעדיו הקלפים נפרשים על קו ישר ונראים כמו כרטיסים שהודבקו. `zIndex` נגזר גם הוא מהמרחק מהאמצע, כך שהקלף המרכזי תמיד מעל. **המרכוז לוגי בשני הצירים**: `inset-inline-start:50%` יחד עם `margin-inline-start` שלילי. `left:50%` פיזי יחד עם שוליים לוגיים הזיז בעברית את כל המניפה חצי קלף ימינה. **המניפה נמדדת כדי להיכנס**: המרחק בין הקלפים הוא עד 62% מרוחב קלף, וקטן במסך צר יותר, כך שגם הפינה העליונה של הקלף החיצוני, שהסיבוב מזיז החוצה, נשארת בתוך המסך. **עד 1023 פיקסלים אין מניפה**: חמישה קלפים לא נכנסים ברוחב, ולכן הקלף הופך לשורה (תמונה ולצידה הטקסט), והערימה נפרשת לטור עם הטיה קלה, כך שכל הקלפים על המסך בסוף המהלך. בהפחתת תנועה או כשהספרייה לא נטענה הבמה לא נדלקת (היא יושבת תחת `.mv-on`), והקלפים עומדים בשורה, ובמסך צר בטור."
},
];
