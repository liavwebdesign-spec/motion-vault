// שלושה מהלכים מ-prompt-motion.com (21.10.2026, ליאב: "יש פה באתר הזה אנימציות מטורפות שאני ממש ממש רוצה לשלב במאגר שלנו").
// האתר הוא גלריה של סרטוני תנועה, לא אתר גלילה. נבחרו רק דפוסים שחוזרים בכמה סרטונים ושמתורגמים לסקשן באתר עסקי,
// ונבנו מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
export default [
{
  id:"g157", cat:"gsap", name:"רשת ריבועים שמתמלאת עם המספר", tech:"GSAP · ScrollTrigger scrub · CSS mask", status:"ממתין",
  desc:"מספר גדול שרץ מאפס, ולידו רשת של 100 ריבועים שנדלקים אחד אחד באותו קצב, מהפינה הימנית העליונה. כשהמספר נעצר על 96, בדיוק 96 ריבועים דולקים, וארבעה נשארים כבויים. רואים את הנתון ולא רק קוראים אותו.",
  when:"נתון אחד חזק מתוך כמות ברורה: 96 מכל 100 לקוחות, 7 מתוך 10 פניות, 38% מהתקציב. סקשן הוכחה, אודות או \"למה אנחנו\". עובד גם באתר שקט, כי זו תנועה אחת שמסבירה משהו. פעם אחת בעמוד, על הנתון הכי חזק.",
  note:"**שחזור.** השראה: שני סרטונים ב-prompt-motion.com (21.10.2026), בכל אחד רשת נקודות שמתמלאת עם האחוז. נבנה מאפס מהצפייה. **הרשת היא אלמנט אחד, לא 100:** הריבועים הם `mask` של אריח SVG עם ריבוע מעוגל, והמילוי הוא שני גרדיאנטים, אחד לשורות המלאות ואחד לשורה החלקית שמתמלאת מימין. המספר היחיד בקוד הוא `--n` במארקאפ, ו-CSS מחשב ממנו כמה שורות מלאות (`round(down, n / cols)`) וכמה ריבועים בשורה הבאה. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים 96 ריבועים ואת המספר 96 מיד. רק כשהמהלך רץ הוא מאפס את שניהם ומעלה אותם יחד בקצב הגלילה, תמיד במספר שלם, כך שהמספר והרשת לא נפרדים לרגע. **גדלים אחרים:** `--cols` ו-`--rows` (למשל 10 על 1 לשבע מתוך עשר, או 20 על 5 לרצועה רחבה). **באתר משמאל לימין** מחליפים את `right` בשכבה השנייה ל-`left`. **נגישות:** הרשת והמספר הרץ מוסתרים מקורא מסך, והמשפט כולל את הנתון הסופי בטקסט מוסתר, כך שקורא מסך לא שומע מספרי ביניים. דפדפן בלי `round()` (ישנים מ-2024) מקבל רשת כבויה והמספר עדיין מוצג.",
  libs:["gsap","ScrollTrigger"],
  css:`.wf{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:clamp(32px,6vw,96px);max-width:1040px;margin-inline:auto;padding-block:6vh 22vh}
.wf-txt{display:grid;gap:14px;max-width:34ch}
.wf-num{display:flex;align-items:baseline;gap:14px;margin:0;font-size:clamp(76px,11vw,168px);font-weight:700;line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.wf-num small{font-size:max(.2em,16px);font-weight:500;letter-spacing:0;color:var(--muted)}
.wf-lead{margin:0;font-size:clamp(21px,1.7vw,28px);font-weight:600;line-height:1.3;text-wrap:balance}
.wf-more{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
/* רשת אחת: הריבועים הם מסכה (אריח SVG), המילוי הוא שורות מלאות ועוד שורה חלקית מימין. --n במארקאפ הוא המספר היחיד */
.wf-grid{--cols:10;--rows:10;--fill:var(--accent);--track:var(--line);
  --cell:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect x='.6' y='.6' width='8.8' height='8.8' rx='1.7'/%3E%3C/svg%3E");
  --r:round(down, var(--n, 0) / var(--cols), 1);
  --c:calc(var(--n, 0) - var(--r) * var(--cols));
  width:min(440px,84vw);aspect-ratio:var(--cols) / var(--rows);
  background:linear-gradient(var(--fill) 0 0) top / 100% calc(var(--r) * 100% / var(--rows)) no-repeat,
    linear-gradient(transparent calc(var(--r) * 100% / var(--rows)), var(--fill) 0 calc((var(--r) + 1) * 100% / var(--rows)), transparent 0) right / calc(var(--c) * 100% / var(--cols)) 100% no-repeat,
    var(--track);
  -webkit-mask:var(--cell) 0 0 / calc(100% / var(--cols)) calc(100% / var(--rows));
  mask:var(--cell) 0 0 / calc(100% / var(--cols)) calc(100% / var(--rows))}
@supports not (width:round(down, 1px, 1px)){.wf-grid{background:var(--track)}}
.wf .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.wf{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center}.wf-num{justify-content:center}.wf-txt{justify-items:center}}`,
  html:`<div class="stage"><figure class="wf" style="margin-block:0">
  <figcaption class="wf-txt">
    <p class="wf-num" aria-hidden="true"><b>96</b><small>מתוך 100</small></p>
    <p class="wf-lead"><span class="sr-only">96 מתוך 100 </span>לקוחות חוזרים אלינו גם בשנה השנייה</p>
    <p class="wf-more">את רובם לא היינו צריכים לשכנע. הם פשוט התקשרו שוב כשהגיע הפרויקט הבא.</p>
  </figcaption>
  <div class="wf-grid" style="--n:96" aria-hidden="true"></div>
</figure></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הרשת והמספר כבר בערך הסופי (במארקאפ)
  const grid=document.querySelector(".wf-grid"),num=document.querySelector(".wf-num b");
  const to=parseInt(grid.style.getPropertyValue("--n"),10)||parseInt(num.textContent,10)||0;
  // בהפחתת תנועה הפונקציה לא רצה, והערך הסופי מוצג מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const o={v:0},draw=()=>{const v=Math.round(o.v);grid.style.setProperty("--n",v);num.textContent=v;};
    draw();
    gsap.to(o,{v:to,ease:"power1.inOut",onUpdate:draw,
      scrollTrigger:{trigger:".wf",start:"top 72%",end:"center 42%",scrub:.6}});
    return()=>{grid.style.setProperty("--n",to);num.textContent=to;};
  });
})();`
},
{
  id:"g158", cat:"gsap", name:"צורה אחת שעוברת בין מצבי המוצר", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"צורה כהה אחת נעוצה בצד המסך, והשלבים גוללים לידה. בכל שלב היא משנה גודל, פינות וצבע והופכת לחלק אחר במוצר: כפתור \"קביעת פגישה\", יומן עם שעות פנויות, הודעת אישור, ולבסוף עיגול עם וי. זה לא ארבעה כרטיסים, זה אותו דבר שמתפתח.",
  when:"\"איך זה עובד\" של שירות או מוצר עם זרימה אמיתית: הזמנת תור, הזמנה בחנות, הרשמה, תשלום, אפליקציה. שלושה עד חמישה מצבים שבאים אחד מהשני. פעם אחת בעמוד, בסקשן התהליך.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר ב-prompt-motion.com (21.10.2026), שבהם צורה אחת עוברת בין כפתור, כרטיס, הודעה ואישור. נבנה מאפס מהצפייה. **המארקאפ הוא לוח סיפור:** כל שלב הוא `li` עם טקסט ועם המצב שלו (`.sm-st`) לידו. בלי GSAP ובהפחתת תנועה זה מה שרואים, כל מצב ליד השלב שלו, וזה עובד גם בטלפון. **כשהמהלך רץ** הסקריפט משכפל את המצבים לתוך צורה אחת בבמה הנעוצה, ומוסיף `is-live`. הגודל של כל מצב נמדד מהמצב עצמו (`offsetWidth`), ולכן משנים עיצוב רק ב-CSS. הפינות והצבע של כל מצב הם `--r` ו-`--b` על המחלקה שלו, ומהם הצורה עוברת. פינה של 999px נחתכת לחצי הגובה לפני המעבר, אחרת רוב המעבר לא רואים שינוי. **רוחב המצבים בבמה** נקבע ב-`cqw` של הבמה ולא באחוזים, כדי שהתוכן לא יזרום מחדש בזמן שהצורה גדלה. **המעבר:** הצורה משנה מידות ב-`power3.inOut`, התוכן הישן יוצא בשליש הראשון והחדש נכנס מהאמצע, וביניהם עצירה, כך שכל מצב נשאר על המסך בזמן שהטקסט שלו באמצע. **בטלפון** הבמה נעוצה למעלה בחצי המסך, על רקע בצבע העמוד, והטקסט גולל מתחתיה. **נגישות:** המצבים הם איור (`aria-hidden`), עם `span` ולא כפתורים אמיתיים, כדי שלא יהיו פקדים מזויפים במקלדת. המשמעות בטקסט של השלבים.",
  libs:["gsap","ScrollTrigger"],
  css:`.sm{--sm-bg:var(--ink);--sm-fg:var(--bg);max-width:1100px;margin-inline:auto}
.sm-steps{list-style:none;margin:0;padding:0;display:grid;gap:clamp(56px,8vw,112px)}
.sm-step{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px)}
.sm-txt h3{margin:0 0 10px;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.sm-txt p{margin:0;max-width:36ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
/* כל מצב נושא את הפינות (--r) והצבע (--b) שלו: בלוח הסיפור הם מציירים אותו, בבמה הצורה עוברת ביניהם */
.sm-st{justify-self:center;box-sizing:border-box;background:var(--b);border-radius:var(--r);color:var(--sm-fg)}
.sm-pill{--r:999px;--b:var(--sm-bg);display:inline-flex;align-items:center;gap:12px;padding:16px 28px;font-size:18px;font-weight:600;white-space:nowrap}
.sm-pill svg{width:18px;height:18px}
.sm-cal{--r:28px;--b:var(--sm-bg);width:min(380px,100%);padding:24px;display:grid;gap:16px}
.sm-cal b{font-size:17px}
.sm-days{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;text-align:center;font-size:13px}
.sm-days span{padding:8px 0;border-radius:14px;color:color-mix(in srgb,var(--sm-fg) 70%,transparent)}
.sm-days i{display:block;margin-top:2px;font-size:19px;font-style:normal;font-weight:600;color:var(--sm-fg)}
.sm-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:15px;font-variant-numeric:tabular-nums}
.sm-slots span{padding:10px 0;text-align:center;border-radius:12px;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--sm-fg) 22%,transparent)}
.sm-days .on,.sm-slots .on{background:var(--accent);box-shadow:none;color:var(--accent-ink)}
.sm-days .on i{color:inherit}
.sm-toast{--r:22px;--b:var(--sm-bg);display:flex;align-items:center;gap:14px;padding-block:14px;padding-inline:14px 24px;width:max-content;white-space:nowrap}
.sm-ava{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--accent);color:var(--accent-ink);font-size:15px;font-weight:700}
.sm-toast b{display:block;font-size:16px}
.sm-toast small{font-size:14px;color:color-mix(in srgb,var(--sm-fg) 70%,transparent)}
.sm-done{--r:999px;--b:var(--accent);display:grid;place-items:center;width:112px;height:112px;color:var(--accent-ink)}
.sm-done svg{width:56px;height:56px;fill:none;stroke:currentColor;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
/* המהלך רץ: במה נעוצה בעמודה השנייה עם צורה אחת, והמצבים שליד הטקסט מוסתרים */
.sm.is-live{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:clamp(24px,5vw,72px)}
.sm.is-live>.sm-stage{grid-area:1/2;align-self:start;position:sticky;top:0;height:100vh;height:100svh;display:grid;place-items:center;container-type:size}
.sm.is-live>.sm-steps{grid-area:1/1;gap:0}
.sm.is-live .sm-step{display:flex;align-items:center;min-height:85vh}
.sm.is-live .sm-step>.sm-st{display:none}
.sm-shape{position:relative;overflow:hidden}
.sm-shape>.sm-st{position:absolute;top:50%;left:50%;translate:-50% -50%;background:none;border-radius:0}
.sm-shape>.sm-cal{width:min(380px,92cqw)}
.sm-shape>.sm-done svg path{stroke-dasharray:1}
@media(max-width:767px){
  .sm-step{grid-template-columns:minmax(0,1fr)}
  .sm.is-live{grid-template-columns:minmax(0,1fr)}
  .sm.is-live>.sm-stage{grid-area:1/1;z-index:1;height:48svh;background:linear-gradient(var(--bg) 84%,transparent)}
  .sm.is-live>.sm-steps{grid-area:1/1;padding-top:48svh}
  .sm.is-live .sm-step{min-height:70svh}
}`,
  html:`<div class="stage"><div class="sm">
  <div class="sm-stage" aria-hidden="true"></div>
  <ol class="sm-steps">
    <li class="sm-step">
      <div class="sm-txt"><h3>לוחצים פעם אחת</h3><p>כפתור אחד בעמוד, בלי טופס ארוך ובלי לחפש מספר טלפון.</p></div>
      <div class="sm-st sm-pill" aria-hidden="true"><span>קביעת פגישה</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></div>
    </li>
    <li class="sm-step">
      <div class="sm-txt"><h3>בוחרים מועד שנוח לכם</h3><p>היומן מראה רק שעות שבאמת פנויות, אז אין הלוך ושוב בוואטסאפ.</p></div>
      <div class="sm-st sm-cal" aria-hidden="true">
        <b>בחרו מועד</b>
        <div class="sm-days"><span>א׳<i>12</i></span><span class="on">ב׳<i>13</i></span><span>ג׳<i>14</i></span><span>ד׳<i>15</i></span><span>ה׳<i>16</i></span></div>
        <div class="sm-slots"><span>09:00</span><span class="on">10:30</span><span>12:00</span><span>14:30</span><span>16:00</span><span>17:30</span></div>
      </div>
    </li>
    <li class="sm-step">
      <div class="sm-txt"><h3>מקבלים אישור מיד</h3><p>הודעה עם היום והשעה מגיעה לטלפון, ואפשר להוסיף אותה ליומן בלחיצה.</p></div>
      <div class="sm-st sm-toast" aria-hidden="true"><span class="sm-ava">ד״ל</span><span><b>הפגישה נקבעה</b><small>יום שני, 10:30</small></span></div>
    </li>
    <li class="sm-step">
      <div class="sm-txt"><h3>ונתראה</h3><p>יום לפני מגיעה תזכורת, ואם משהו משתנה מזיזים את הפגישה באותו קישור.</p></div>
      <div class="sm-st sm-done" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M13 25l7 7 15-16" pathLength="1"/></svg></div>
    </li>
  </ol>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר לוח הסיפור: כל מצב ליד השלב שלו
  const root=document.querySelector(".sm"),stage=root.querySelector(".sm-stage"),sts=[...root.querySelectorAll(".sm-step>.sm-st")];
  // בהפחתת תנועה הפונקציה לא רצה, ולוח הסיפור נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const shape=document.createElement("div");shape.className="sm-shape";
    const L=sts.map(s=>shape.appendChild(s.cloneNode(true)));
    stage.appendChild(shape);root.classList.add("is-live");
    const cs=L.map(c=>getComputedStyle(c));
    const W=i=>L[i].offsetWidth,H=i=>L[i].offsetHeight,B=i=>cs[i].getPropertyValue("--b").trim();
    const R=i=>Math.min(parseFloat(cs[i].getPropertyValue("--r"))||0,W(i)/2,H(i)/2);   // 999px הופך לחצי הגובה, אחרת המעבר "מת" ברובו
    const box=i=>({width:()=>W(i),height:()=>H(i),borderRadius:()=>R(i),backgroundColor:()=>B(i)});
    gsap.set(shape,box(0));gsap.set(L.slice(1),{autoAlpha:0});
    // ההתקדמות נמדדת ממרכז השלב הראשון ועד מרכז האחרון, על קו הקריאה: מרכז המסך, ובטלפון מרכז השטח שמתחת לבמה.
    // כך כל מצב נמצא באמצע העצירה שלו בדיוק כשהטקסט שלו באמצע
    const steps=root.querySelectorAll(".sm-step"),line=()=>matchMedia("(max-width:767px)").matches?"74%":"center";
    const tl=gsap.timeline({scrollTrigger:{trigger:root.querySelector(".sm-steps"),scrub:.6,invalidateOnRefresh:true,
      start:()=>"top+="+(steps[0].offsetTop-root.querySelector(".sm-steps").offsetTop+steps[0].offsetHeight/2)+" "+line(),
      end:()=>"bottom-="+steps[steps.length-1].offsetHeight/2+" "+line()}});
    tl.to({},{duration:.6});
    for(let i=1;i<L.length;i++){
      // immediateRender:false: אחרת כל קטע מצייר את נקודת ההתחלה שלו מיד, והאחרון שנבנה קובע את הצורה בטעינה
      tl.fromTo(shape,box(i-1),{...box(i),duration:1,ease:"power3.inOut",immediateRender:false})
        .to(L[i-1],{autoAlpha:0,scale:.92,duration:.35,ease:"power1.in"},"<")
        .fromTo(L[i],{autoAlpha:0,scale:1.06},{autoAlpha:1,scale:1,duration:.45,ease:"power1.out"},"<.55");
      const tick=L[i].querySelector(".sm-done path");
      if(tick)tl.fromTo(tick,{strokeDashoffset:1},{strokeDashoffset:0,duration:.4,ease:"power1.inOut"},"<.15");
      tl.to({},{duration:i<L.length-1?1.2:.6});
    }
    const sync=()=>{if(tl.progress()===0)gsap.set(shape,box(0));};   // שינוי גודל מסך כשעוד לא התחילו לגלול
    ScrollTrigger.addEventListener("refresh",sync);
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);root.classList.remove("is-live");shape.remove();};
  });
})();`
},
{
  id:"g159", cat:"gsap", name:"נקודה שקופצת מכותרת לכותרת", tech:"GSAP · ScrollTrigger scrub", status:"מאושר-עין",
  desc:"כל כותרת בעמוד נגמרת בנקודה בצבע המותג, אבל זו אותה נקודה. כשגוללים היא ניתקת מהכותרת, קופצת בקשת, נמתחת בנפילה, נמעכת לרגע כשהיא נוחתת, ומתיישבת כנקודה בסוף הכותרת הבאה. סימן פיסוק שמלווה את הקורא לאורך הסיפור.",
  when:"עמוד תדמית או סטודיו עם כמה כותרות קצרות וחזקות, מרוחקות זו מזו, ומותג שיש לו נקודה או עיגול בלוגו. הנקודה הופכת לחתימה שעוברת בין הסקשנים ונוחתת בסוף על הקריאה לפעולה.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם נקודת המותג עוברת ממילה למילה. נבנה מאפס מהצפייה. **המארקאפ:** בסוף כל כותרת `span.bd-dot` ריק, `inline-block` עגול שיושב על קו הבסיס כמו נקודה. בלי GSAP ובהפחתת תנועה כל כותרת מציגה את הנקודה שלה, וזה המצב הסופי. **כשהמהלך רץ** הנקודות שבכותרות נעשות שקופות (ממשיכות לתפוס מקום, כדי למדוד אותן), ונקודה אחת (`.bd-ball`) עוברת ביניהן. **בלי התנגשות בין קטעים:** כל קטע (כותרת לכותרת) מזיז מספר משלו מ-0 ל-1 בסקראב, ופונקציה אחת מציירת את הנקודה לפי הקטע הפעיל. אם כמה טריגרים היו מזיזים את אותה נקודה, גלילה מהירה למעלה הייתה משאירה אותה בכותרת הלא נכונה. **הקשת נשארת במסך:** קטע מתחיל כשהכותרת הנוכחית ב-30% מהמסך ונגמר כשהבאה ב-65%, ולכן בבסיס הנקודה נעה בתוך המסך מ-30% ל-65%, והקפיצה (פרבולה, עד 18% מהגובה) מעליו. במנוחה היא יושבת בקואורדינטות של העמוד וגוללת איתו בלי קפיצות. מתיחה בנפילה ומעיכה בנחיתה שומרות על שטח קבוע (`scaleX = 1 / scaleY`). **דרישה:** לפחות חצי מסך בין כותרות, אחרת הקטעים חופפים. **בפרויקט:** הצבע הוא `--accent`, והגודל `.2em` מהכותרת, כך שבכותרת גדולה יותר הנקודה גדלה בדרך.",
  libs:["gsap","ScrollTrigger"],
  css:`.bd{position:relative;max-width:980px;margin-inline:auto}
.bd-sec{min-height:72vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:18px}
.bd-sec h2{margin:0;font-size:clamp(38px,5.6vw,84px);font-weight:700;line-height:1.05;letter-spacing:-.015em;text-wrap:balance}
.bd-sec p{margin:0;max-width:44ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
/* הנקודה: עיגול ריק שיושב על קו הבסיס, כמו סימן פיסוק */
.bd-dot{display:inline-block;width:.2em;height:.2em;margin-inline-start:.07em;border-radius:50%;background:var(--accent);vertical-align:baseline}
.bd-cta{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.bd-ball{position:absolute;top:0;left:0;pointer-events:none;z-index:2;visibility:hidden}
.bd-ball i{display:block;width:100%;height:100%;border-radius:50%;background:var(--accent);transform-origin:50% 100%}
.bd.is-live .bd-dot{opacity:0}
.bd.is-live .bd-ball{visibility:visible}`,
  html:`<div class="stage"><div class="bd">
  <div class="bd-sec"><h2>עושים פחות דברים, אבל עד הסוף<span class="bd-dot" aria-hidden="true"></span></h2><p>סטודיו קטן שבוחר פרויקטים בקפידה, כדי שלכל אחד יהיה זמן אמיתי.</p></div>
  <div class="bd-sec"><h2>כל פרויקט מתחיל בשיחה<span class="bd-dot" aria-hidden="true"></span></h2><p>לפני עיצוב ולפני מחיר, מבינים מה העסק צריך ולמי הוא מדבר.</p></div>
  <div class="bd-sec"><h2>ונשארים גם אחרי ההשקה<span class="bd-dot" aria-hidden="true"></span></h2><p>תיקונים, שינויים קטנים ושאלות. אותו אדם, אותו טלפון.</p></div>
  <div class="bd-sec"><h2>בואו נתחיל<span class="bd-dot" aria-hidden="true"></span></h2><a class="bd-cta" href="#">לקביעת שיחה</a></div>
  <span class="bd-ball" aria-hidden="true"><i></i></span>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל כותרת מציגה את הנקודה שלה
  const root=document.querySelector(".bd"),dots=[...root.querySelectorAll(".bd-dot")],ball=root.querySelector(".bd-ball"),body=ball.firstElementChild;
  if(dots.length<2)return;
  // בהפחתת תנועה הפונקציה לא רצה, והנקודות נשארות בכותרות
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const prog=dots.slice(1).map(()=>({p:0}));
    const at=d=>{const r=d.getBoundingClientRect(),o=root.getBoundingClientRect();return{x:r.left-o.left,y:r.top-o.top,s:r.width};};
    const lerp=(a,b,t)=>a+(b-a)*t;
    const draw=()=>{
      let k=-1;prog.forEach((o,i)=>{if(o.p>0)k=i;});      // הקטע האחרון שהתחיל
      const p=k<0?0:prog[k].p,a=at(dots[Math.max(k,0)]),b=k<0?a:at(dots[k+1]);
      let sy=1;
      if(p>.55&&p<.95)sy=1+.28*Math.min((p-.55)/.3,1);   // נמתחת בנפילה
      else if(p>=.95&&p<1){const t=(p-.95)/.05;sy=t<.5?lerp(1.28,.7,t*2):lerp(.7,1,(t-.5)*2);}   // נמעכת בנחיתה
      const s=lerp(a.s,b.s,p),hop=Math.min(innerHeight*.18,240)*4*p*(1-p);
      gsap.set(ball,{x:lerp(a.x,b.x,p),y:lerp(a.y,b.y,p),width:s,height:s});
      gsap.set(body,{y:-hop,scaleY:sy,scaleX:1/sy});
    };
    prog.forEach((o,i)=>gsap.to(o,{p:1,ease:"none",onUpdate:draw,
      scrollTrigger:{trigger:dots[i],start:"top 30%",endTrigger:dots[i+1],end:"top 65%",scrub:.5}}));
    ScrollTrigger.addEventListener("refresh",draw);draw();
    return()=>{ScrollTrigger.removeEventListener("refresh",draw);root.classList.remove("is-live");gsap.set([ball,body],{clearProps:"all"});};
  });
})();`
}
];
