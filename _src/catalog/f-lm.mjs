// מהלכי החתימה (LM): נכרו מהאתרים של ליאב. דמואים עצמאיים לשיפוט מחודש, מהלך-מהלך.
export default [
{
  id:"lm1", cat:"lm", name:"שכבות סחיפה", tech:"vanilla JS · rAF", status:"ממתין",
  desc:"אלמנטים צפים שנסחפים במהירויות שונות בגלילה, עם הטיה קלה. במרכז המסך כל שכבה יושבת במקום שעוצבה, ומשם היא נסחפת לשני הכיוונים. שכבה איטית מרגישה רחוקה, מהירה מרגישה קרובה.",
  when:"הירו וסקשני אווירה. עד 4 שכבות לסקשן. נכרה מכל האתרים של ליאב (מדרג 1/2/4).",
  css:`.driftsec{position:relative;height:90vh;background:#101223;border-radius:var(--r);margin-inline:var(--gutter);overflow:hidden;display:flex;align-items:center;justify-content:center}
.dl{position:absolute;border-radius:50%;filter:blur(46px);will-change:translate}
.dchip{will-change:translate,rotate}
.driftsec h2{color:#fff;position:relative;z-index:2;font-size:var(--fs-h2)}
.dchip{position:absolute;z-index:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px);border-radius:14px;padding:12px 18px;color:#cdd0e8;font-size:13px;transform:rotate(-3deg)}`,
  html:`<div class="stage tight"><div class="driftsec">
<div class="dl" data-drift="y:2,r:-0.3" style="width:340px;height:340px;background:rgba(44,247,217,.16);top:-14%;inset-inline-start:-4%"></div>
<div class="dl" data-drift="y:0.5,x:-1,r:0.2" style="width:260px;height:260px;background:rgba(244,158,64,.15);bottom:-12%;inset-inline-end:6%"></div>
<div class="dchip" data-drift="y:1.5" style="top:20%;inset-inline-end:12%">שכבה מהירה (1.5)</div>
<div class="dchip" data-drift="y:0.4,x:-0.4" style="bottom:24%;inset-inline-start:10%;transform:rotate(2deg)">שכבה איטית (0.4)</div>
<h2>שכבות בסחיפה איטית</h2>
</div></div>`,
  js:`const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduced){
  const drifts=[...document.querySelectorAll("[data-drift]")].map(el=>{
    const p={};el.dataset.drift.split(",").forEach(s=>{const kv=s.split(":");p[kv[0]]=+kv[1]});
    return{el,y:p.y||0,x:p.x||0,r:p.r||0,sec:el.closest(".driftsec")};
  });
  const AMP=110;                       // המרחק לשכבה במקדם 1, לכל אורך המעבר על המסך
  let tick=false;
  function frame(){tick=false;const vh=innerHeight;
    drifts.forEach(d=>{
      const rc=d.sec.getBoundingClientRect();
      const t=Math.min(1,Math.max(0,(vh-rc.top)/(vh+rc.height)));
      // p נע מ-1 ל--1 סביב אמצע המעבר, ולכן במרכז המסך השכבה יושבת בדיוק במקום שעוצבה
      const p=1-t*2;
      d.el.style.translate=(p*d.x*AMP)+"px "+(p*d.y*AMP)+"px";
      if(d.r)d.el.style.rotate=(p*d.r*20)+"deg";
    });}
  addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
  frame();
}`
},
{
  id:"lm3", cat:"lm", name:"הצטלבות (Converging)", tech:"CSS + משתנה גלילה", status:"ממתין",
  desc:"זוג בלוקים שמתקרבים משני צדדים בקצב הגלילה ונפגשים במרכז. המרחק ביניהם הוא ההתקדמות, והסימן במפגש מסתובב ונדלק כשהם נוגעים. קדימה ואחורה.",
  when:"לפני/אחרי, בעיה/פתרון, שני צדדים של סיפור. פעם-פעמיים בעמוד.",
  css:`.conv{display:grid;grid-template-columns:1fr auto 1fr;gap:clamp(12px,2vw,26px);align-items:center;
  padding-inline:var(--gutter);max-width:min(1060px,100%);margin-inline:auto}
/* בלי מסגרת ובלי פס צבע עליון: המשטח והצל מפרידים (feedback_no_lines_and_frames) */
.cv{background:var(--card);border-radius:18px;padding:clamp(22px,2.6vw,36px);
  box-shadow:0 14px 34px rgba(22,24,43,.07)}
.cv-kick{display:block;font-size:13px;color:var(--muted);margin-bottom:12px}
.cv h3{margin:0 0 8px;font-size:clamp(19px,2vw,25px);line-height:1.3}
.cv p{margin:0;color:var(--muted);font-size:15px;line-height:1.7}
.cv-stat{display:block;margin-top:16px;font-size:clamp(26px,3vw,40px);font-weight:800;line-height:1;color:var(--ink)}
.cv-stat small{display:block;font-size:12px;font-weight:400;color:var(--muted);margin-top:6px}

/* ההתקדמות היא --p (0 עד 1), נכתבת מהגלילה. בלי JS ובהפחתת תנועה אין html.js ושני הבלוקים במקומם.
   translate פיזי ולא לוגי: בעברית הבלוק הראשון יושב מימין ולכן מתחיל ב-160 חיובי. הכיוון במשתנה ולא בדריסה
   של html[dir=ltr], כי דריסה כזאת חזקה מכלל המצב והבלוקים נשארו תקועים בצד.
   הצטלבות שנכנסת פעם אחת ונעצרת "קצת סטטי ומשעמם" (ליאב, דוח הסקירה 4.10.2026), ולכן היא קשורה לגלילה */
.conv{--cv-dir:1;--p:1}
html[dir="ltr"] .conv{--cv-dir:-1}
.js .conv{--p:0}
.js .cv{opacity:calc(.3 + var(--p) * .7)}
.js .cv.a{translate:calc(var(--cv-dir) * (1 - var(--p)) * 160px) 0}
.js .cv.b{translate:calc(var(--cv-dir) * (var(--p) - 1) * 160px) 0}

.cv-meet{width:clamp(38px,4vw,52px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;
  background:var(--ink);color:var(--bg);font-size:clamp(17px,2vw,22px);line-height:1}
/* הסימן נדלק ברבע האחרון ומסתובב חצי סיבוב עם המפגש. לא מאפס: כניסה מ-scale 0 נראית כמו בלון שמתנפח */
.js .cv-meet{scale:calc(.6 + var(--p) * .4);rotate:calc(var(--p) * 180deg);opacity:clamp(0, (var(--p) - .7) * 3.4, 1)}

@media(max-width:767px){
  .conv{grid-template-columns:1fr;gap:14px}
  .js .cv.a{translate:0 calc((1 - var(--p)) * 40px)}
  .js .cv.b{translate:0 calc((var(--p) - 1) * 40px)}
  .cv-meet{justify-self:center}
}`,
  html:`<div class="stage"><div class="conv">
  <div class="cv a"><span class="cv-kick">מה שרואים</span>
    <h3>הביצועים שהיריב מרגיש</h3>
    <p>מה שקורה על המגרש: מהירות, החלטות ועמידות בדקות האחרונות.</p>
    <span class="cv-stat">92%<small>שיפור נמדד בעונה</small></span></div>
  <div class="cv-meet" aria-hidden="true">+</div>
  <div class="cv b"><span class="cv-kick">מה שמאחורי</span>
    <h3>הנתונים שמייצרים את הביצועים</h3>
    <p>עומסי אימון, שינה והתאוששות. מה שאף אחד לא רואה בשידור.</p>
    <span class="cv-stat">14<small>מדדים שנאספים כל יום</small></span></div>
</div></div>`,
  js:`// השער: בהפחתת תנועה אין html.js, ושני הבלוקים יושבים במקומם (--p:1 ב-CSS)
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  document.documentElement.classList.add("js");
  const els=[...document.querySelectorAll(".conv")], last=new Map();
  let ticking=false;
  // המפגש קורה כשהבלוק עובר את 35% העליונים של המסך. כותבים ל-DOM רק כשהערך השתנה (engine/motion.md 9.6א)
  const run=()=>{ticking=false;const vh=innerHeight;
    for(const el of els){const r=el.getBoundingClientRect();
      const p=Math.round(Math.min(1,Math.max(0,(vh*.95-r.top)/(vh*.6)))*1000)/1000;
      if(last.get(el)!==p){last.set(el,p);el.style.setProperty("--p",p);}}};
  addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(run);}},{passive:true});
  addEventListener("resize",run);run();
}`,
  note:"**מלכודת RTL**: `translate` היא תכונה פיזית ולא לוגית. אם נותנים לבלוק הראשון ערך שלילי (כמו בעמוד אנגלי), בעברית הוא יושב מימין ומתחיל לזוז שמאלה, כלומר שני הבלוקים מתחילים קרובים ונפרדים החוצה. זה בדיוק ההפך מהמהלך. כאן הכיוון יושב במשתנה `--cv-dir` שמתהפך ב-`html[dir=\"ltr\"]`. לא בדריסה של הסלקטור עצמו: דריסה כזאת חזקה מכלל המפגש, ובעמוד אנגלי הבלוקים נשארו תקועים בצד. הנקודה במרכז היא מה שהופך את זה מ\"שני כרטיסים שנכנסים\" ל\"מפגש\": היא נדלקת ברבע האחרון של ההתקדמות, אחרי שהבלוקים כמעט נפגשו, מ-0.6 ולא מאפס, ומסתובבת חצי סיבוב עם המפגש. **מ-6.10.2026 ההתקדמות קשורה לגלילה** (`--p`, נכתב רק כשהשתנה), כי כניסה חד-פעמית הייתה \"קצת סטטי ומשעמם\" (ליאב, דוח הסקירה). מצב ההתחלה חי רק תחת `html.js`, שהסקריפט מוסיף, כך שבלי JS הכל גלוי. בהפחתת תנועה שני הבלוקים והנקודה פשוט עומדים במקומם."
},
{
  id:"lm4", cat:"lm", name:"ערימה דביקה מדורגת", tech:"CSS position:sticky", status:"ממתין",
  desc:"כרטיסים שנערמים זה על זה בגלילה עם offset מדורג. כל כרטיס נדבק מעט נמוך מקודמו.",
  when:"למה דווקא אנחנו 01-04, שלבי שירות. עד 5 כרטיסים.",
  css:`/* בלי תקרת רוחב הכרטיס נמתח על כל המסך, הטקסט תחום ב-55ch ונשאר שטח ריק גדול בצד */
.stackw{padding-inline:var(--gutter);display:grid;gap:24px;max-width:min(980px,100%);margin-inline:auto}
.scard{position:sticky;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:clamp(24px,3vw,44px);box-shadow:0 -18px 46px rgba(22,24,43,.09)}
/* מדרגה של 40 פיקסלים לכל כרטיס, עד חמישה (ה-when). כרטיס בלי top לא נדבק בכלל */
.scard:nth-child(1){top:110px}.scard:nth-child(2){top:150px}.scard:nth-child(3){top:190px}.scard:nth-child(4){top:230px}.scard:nth-child(5){top:270px}
.snum{font-size:clamp(40px,4vw,80px);font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:1.5px var(--accent)}
.scard h3{margin:10px 0 6px;font-size:22px}.scard p{margin:0;color:var(--muted);max-width:55ch}
.stail{height:30vh}`,
  html:`<div class="stackw">
<div class="scard"><div class="snum">01</div><h3>תוכנית שנבנית ממדידה</h3><p>כל החלטה מגיעה מנתון, לא מתבנית.</p></div>
<div class="scard"><div class="snum">02</div><h3>מלווה אחד, אחריות אחת</h3><p>מי שהתחיל איתך נשאר איתך.</p></div>
<div class="scard"><div class="snum">03</div><h3>שקיפות מלאה</h3><p>דוח מדיד כל חודש, בלי סיפורים.</p></div>
<div class="scard"><div class="snum">04</div><h3>תוצאות שרואים</h3><p>אם המספרים לא זזים, התוכנית משתנה.</p></div>
</div><div class="stail"></div>`,
  js:``
},
{
  id:"lm5", cat:"lm", name:"סולם כניסות הירו (150ms)", tech:"CSS transitions + delay", status:"ממתין",
  desc:"רכיבי ההירו נכנסים בזה אחר זה במדרגות של 150 אלפיות: לוגו, ניווט, כותרת, ליד, כפתורים.",
  when:"רגע הזהות בלבד. בשאר העמוד reveal אחיד בלי סטאגר. החריג המאושר.",
  note:"הסולם נורה כשהסקשן נכנס למסך, לא בטעינת העמוד, ורץ שוב בכל כניסה מחדש. בהירו אמיתי זה אותו רגע, אבל בדמו הוא יושב אחרי מסלול גלילה בכוונה: כשהוא היה גלוי כבר בטעינה הוא רץ ונגמר בשנייה הראשונה, בזמן שהעין עוד על כותרת העמוד, ונראה סטטי (נמדד: 84% מהסקשן בתוך המסך בטעינה). מחלקת ה-go חייבת להתווסף אחרי הציור הראשון, אחרת אין שינוי מצב ואין טרנזישן בכלל. המחלקה מוסרת רק כשהסקשן יצא לגמרי (threshold 0), כך ששורה שעוד על המסך לא דוהה בזמן שגוללים הלאה. כפתור ההפעלה החוזרת מבטל רגע את המעבר (.snap), כדי שהסולם באמת יתחיל מאפס ולא יתהפך באמצע. שורת המיקרו נכנסת יחד עם הכפתור שהיא שייכת לו, ולכן הקסקדה כולה 450 אלפיות, בתוך תקציב הסטאגר. המצב המוסתר חי רק תחת `html.js`; בהירו אמיתי השער הוא `html.open-anim` מראש העמוד עם failsafe של 2.5 שניות ב-CSS (engine/motion.md 2), כדי שסקריפט שנכשל לא ישאיר מסך ראשון ריק. בהפחתת תנועה כל השורות גלויות מההתחלה.",
  css:`.ladder{min-height:70vh;display:flex;flex-direction:column;justify-content:center;padding-inline:var(--gutter)}
.lad{transition:opacity .6s cubic-bezier(.2,.6,.2,1),translate .6s cubic-bezier(.2,.6,.2,1)}
/* מוסתר רק כשהסקריפט רץ: בלי JS ההירו גלוי ולא ריק */
.js .lad{opacity:0;translate:0 18px}
.go .lad{opacity:1;translate:0 0}
/* הפעלה חוזרת: רגע בלי מעבר, כדי שהחזרה לאפס תהיה מיידית ולא תבטל את הכניסה */
.snap .lad{transition:none}
.go .l1{transition-delay:0ms}.go .l2{transition-delay:150ms}.go .l3{transition-delay:300ms}
.go .l4,.go .l5{transition-delay:450ms}
.ladder .kick{color:var(--accent);font-weight:600;font-size:14px}
.ladder h2{font-size:var(--fs-demo);max-width:18ch;margin:12px 0}
.ladder p{color:var(--muted);max-width:52ch;margin:0 0 22px}
.replay{margin-top:30px;align-self:flex-start}
@media (prefers-reduced-motion: reduce){
  .js .lad{opacity:1;translate:none;transition:none}
  .replay{display:none}
}`,
  html:`<div class="ladder">
<span class="kick lad l1">רגע הזהות</span>
<h2 class="lad l2">כל שורה נכנסת 150 אלפיות אחרי קודמתה</h2>
<p class="lad l3">הסולם שמור להירו בלבד. ככה נשמרת הטבעיות בשאר העמוד.</p>
<div class="lad l4"><button class="gbtn">כפתור ראשי</button></div>
<span class="lad l5" style="font-size:13px;color:var(--muted);margin-top:12px">שורת מיקרו · אמון · בלי התחייבות</span>
<button class="gbtn replay" style="background:var(--ink);color:var(--bg)">הפעל שוב</button>
</div>`,
  js:`(function(){
  const lad=document.querySelector(".ladder");
  // בלי IntersectionObserver לא מסתירים בכלל (השער html.js), והשורות פשוט גלויות
  if(!("IntersectionObserver" in window))return;
  document.documentElement.classList.add("js");
  // go חייב להתווסף אחרי הציור הראשון. אם הוא כבר במארקאפ אין שינוי מצב, ולכן אין טרנזישן בכלל
  // והרכיבים פשוט מופיעים גמורים. בהפעלה חוזרת snap מבטל רגע את המעבר: בלי זה הסרת go מתחילה
  // דהייה מ-1 ל-0, וההוספה המיידית מבטלת אותה לפני שמשהו זז, והכפתור לא עושה כלום.
  const play=()=>{lad.classList.remove("go");lad.classList.add("snap");void lad.offsetHeight;lad.classList.remove("snap");lad.classList.add("go")};
  // והפעלה על כניסה למסך ולא על טעינה: בהירו אמיתי זה אותו רגע בדיוק, אבל כשהסקשן יושב
  // באמצע עמוד ארוך הסולם רץ ונגמר לפני שמגיעים אליו, ונראה שכלום לא קרה.
  // רץ כש-45% מהסקשן גלוי, ו-go מוסר רק כשהסקשן יצא לגמרי: אחרת השורות התחתונות, כולל הכפתור,
  // דהו כשהן עוד על המסך. כשחוזרים אליו הסולם רץ שוב.
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.intersectionRatio>=.45){if(!lad.classList.contains("go"))play();}
    else if(!e.isIntersecting)lad.classList.remove("go");
  }),{threshold:[0,.45]}).observe(lad);
  document.querySelector(".replay").addEventListener("click",play);
})();`
},

{
  id:"lm7", cat:"lm", name:"אוצר ההובר: לחיצה / הרמה / צמיחה", tech:"CSS transitions", status:"ממתין",
  desc:"שלוש משפחות ההובר של שכבת הבסיס: מדיה נלחצת פנימה (0.97), כרטיס תוכן מתרומם 5 פיקסלים למעלה עם צל עמוק יותר, ו-CTA צומח. משפחה אחת לאלמנט, לעולם לא שתיים.",
  when:"כל אתר, גם שקט: זו משפחת ההובר של שכבת הבסיס (engine/motion.md 2 ו-3). הבחירה לפי סוג האלמנט, ורק על מה שבאמת לחיץ.",
  note:"זהה לטבלת התזמונים ב-engine/motion.md 3. (1) כל תזוזה בתוך `@media (hover:hover) and (pointer:fine)`: במסך מגע הנגיעה נתקעת במצב hover, והכרטיס נשאר באוויר עד הנגיעה הבאה. (2) פוקוס מקלדת (`:focus-visible`) מקבל אותה תגובה, כי מי שמגיע בטאב לא רואה הובר. (3) בהפחתת תנועה אין תזוזה בכלל; הצל והגבול עדיין משתנים. (4) בלי `transition` מקוצר: הוא דורס את המעבר שכבר יש לאלמנט, למשל הכהיית הרקע של הכפתור, והמאוחר בקובץ מנצח. לכן המתכון כתוב בלונגהנדס, והרשימה כוללת את מה שהטבלה נותנת לכל סוג (כפתור: רקע, גבול, צל וצבע ב-0.18; כרטיס: טרנספורם 0.4, צל וגבול 0.3). מעבר נוסף שיש למארח נכנס לאותה רשימה. (5) הגבול משתנה רק בכרטיס שיש לו גבול, כי בכרטיס בלי גבול אין מה לצבוע, ומתכהה בגוון המשטח, לעולם לא במבטא. (6) ההרמה ב-transform ולא ב-translate: ה-reveal של שכבת הבסיס מנפיש את translate עם fill, והוא היה דורס את ההרמה בכל כרטיס שנחשף בגלילה. עד 30.9.2026 הכרטיס התרומם באלכסון (6 על 6) וה-CTA גם הסתובב; ההרמה האנכית היא ברירת המחדל של התורה בכל עור.",
  css:`.hv{display:flex;gap:var(--gap);justify-content:center;flex-wrap:wrap;align-items:center}
.hv .ph{width:220px;height:150px;font-size:15px;text-decoration:none}
/* משפחת ההובר של שכבת הבסיס (engine/motion.md 3). משפחה אחת לאלמנט.
   לונגהנדס ולא transition מקוצר, כדי לא לדרוס את המעבר של האלמנט עצמו. מעבר נוסף של המארח נכנס לאותה רשימה */
.press{transition-property:transform;transition-duration:.3s;transition-timing-function:cubic-bezier(.2,.6,.2,1)}
.liftd{transition-property:transform,box-shadow,border-color;transition-duration:.4s,.3s,.3s;transition-timing-function:cubic-bezier(.2,.6,.2,1)}
.grow{transition-property:transform,background-color,border-color,box-shadow,color;transition-duration:.3s,.18s,.18s,.18s,.18s;transition-timing-function:cubic-bezier(.2,.6,.2,1)}
/* צל וגבול: גם בהפחתת תנועה. הגבול נצבע רק בכרטיס שיש לו גבול, ומתכהה בגוון המשטח, לא במבטא */
@media (hover:hover) and (pointer:fine){
  .liftd:hover{box-shadow:0 14px 32px rgba(22,24,43,.14);border-color:color-mix(in srgb,var(--line),var(--ink) 22%)}
}
.liftd:focus-visible{box-shadow:0 14px 32px rgba(22,24,43,.14);border-color:color-mix(in srgb,var(--line),var(--ink) 22%)}
/* תזוזה: רק עם עכבר אמיתי (במגע ההובר נתקע) ורק כשתנועה מותרת */
@media (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){
  .press:hover{transform:scale(.97)}
  .liftd:hover{transform:translateY(-5px)}
  .grow:hover{transform:scale(1.06)}
}
/* המקבילה למקלדת, ולחיצת הכפתור (0.12 שנייה) */
@media (prefers-reduced-motion:no-preference){
  .press:focus-visible{transform:scale(.97)}
  .liftd:focus-visible{transform:translateY(-5px)}
  .grow:focus-visible{transform:scale(1.06)}
  .grow:active{transform:scale(.98);transition-duration:.12s,.18s,.18s,.18s,.18s}
}`,
  html:`<div class="stage tight"><div class="hv">
<a class="ph ph-c press" href="#"><span class="ph-l">מדיה: נלחצת פנימה</span></a>
<a class="ph ph-a liftd" href="#"><span class="ph-l">כרטיס תוכן: מתרומם</span></a>
<button class="gbtn grow">CTA: צומח</button>
</div></div>`,
  // דמו בלבד: הקישורים לא מקפיצים את העמוד לראש
  js:`document.querySelectorAll('.hv a[href="#"]').forEach(a=>a.addEventListener("click",e=>e.preventDefault()));`, runway:false
},
{
  id:"lm8", cat:"lm", name:"מרקי מוטה ונגרר", tech:"CSS keyframes + rAF", status:"ממתין",
  desc:"רצועה שזורמת בלולאה, מוטה 3 מעלות, וגם נגררת עם הגלילה. שתי תנועות מצטברות.",
  when:"פסי אווירה באתרי וואו. פעם אחת בעמוד.",
  note:"הרצועה רחבה מהמסך ב-96 פיקסלים לכל צד, יותר מהגרירה (עד 60 לכל צד), ולכן הקצה שלה לא נחשף אף פעם, גם לא בכניסה מימין וביציאה לשמאל. עם גלישה של 2vw בלבד הקצה נראה בתוך המסך בכל רוחב. החיתוך יושב על הסקשן (`overflow-x:clip`): בלי זה העמוד שמייבא את הרצועה נגלל הצידה, כי רק במאגר ה-body חותך. clip ולא hidden, כדי שהפינות המוטות לא ייחתכו למעלה ולמטה. הדהייה בקצוות מתחילה 96 פיקסלים פנימה, כלומר בדיוק על שפת המסך, ולא מחוצה לו. בהפחתת תנועה הרצועה עומדת: בלי לולאה ובלי גרירה.",
  css:`/* החיתוך על הסקשן: בלי זה העמוד שמייבא נגלל הצידה. clip ולא hidden, כדי שהפינות המוטות לא ייחתכו למעלה ולמטה */
.tiltm-sec{overflow-x:clip}
/* 96 פיקסלים מעבר לכל קצה, יותר מהגרירה (60 לכל צד), כך שהקצה של הרצועה לא נחשף אף פעם */
.tiltm-wrap{transform:rotate(-3deg);width:calc(100vw + 192px);margin-inline-start:-96px;background:var(--ink);padding-block:20px;overflow:hidden}
/* הדהייה מתחילה על שפת המסך ולא מחוצה לו */
.tiltm{overflow:hidden;white-space:nowrap;
  -webkit-mask-image:linear-gradient(90deg,transparent 96px,#000 calc(96px + 6vw),#000 calc(100% - 96px - 6vw),transparent calc(100% - 96px));
  mask-image:linear-gradient(90deg,transparent 96px,#000 calc(96px + 6vw),#000 calc(100% - 96px - 6vw),transparent calc(100% - 96px))}
/* ההזזה היא רוחב קבוצה מדויק בפיקסלים, ומספר העותקים נגזר מרוחב המסך */
.tiltm-track{display:flex;width:max-content;animation:marq linear infinite;animation-duration:var(--marq-dur,26s)}
.tiltm-set{display:flex;gap:48px;padding-inline-end:48px}
.tiltm-track span{font-weight:800;font-size:24px;color:color-mix(in srgb,var(--bg) 55%,transparent);white-space:nowrap}
.tiltm-track i{font-style:normal;color:#f49e40}
@keyframes marq{from{transform:translateX(0)}to{transform:translateX(var(--marq-shift,50%))}}
@media (prefers-reduced-motion: reduce){.tiltm-track{animation:none}}`,
  html:`<div class="stage full tiltm-sec"><div class="tiltm-wrap" data-dragmarq><div class="tiltm"><div class="tiltm-track">
<div class="tiltm-set"><span>עיצוב</span><i>·</i><span>פיתוח</span><i>·</i><span>אסטרטגיה</span><i>·</i><span>תנועה</span><i>·</i></div>
</div></div></div></div>`,
  js:`(function(){
  // אותו מנגנון כמו ב-b01: מספר העותקים נגזר מרוחב המסך, וההזזה היא רוחב קבוצה מדויק
  function build(){
    const wrap=document.querySelector(".tiltm"),track=document.querySelector(".tiltm-track");
    const proto=track.firstElementChild;
    [...track.children].slice(1).forEach(c=>c.remove());
    const setW=proto.getBoundingClientRect().width;
    if(!setW)return;
    const need=Math.ceil(wrap.getBoundingClientRect().width/setW)+1;
    for(let i=1;i<need;i++){const c=proto.cloneNode(true);c.setAttribute("aria-hidden","true");track.appendChild(c);}
    track.style.setProperty("--marq-shift",setW+"px");
    track.style.setProperty("--marq-dur",(setW/58).toFixed(2)+"s");
  }
  build();
  if(document.fonts)document.fonts.ready.then(build);
  let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(build,200);});
})();
const dm=document.querySelector("[data-dragmarq]");
const still=matchMedia("(prefers-reduced-motion: reduce)");
let tick=false;
function frame(){tick=false;
  if(still.matches){dm.style.translate="";return;}   // הפחתת תנועה: הרצועה עומדת
  const r=dm.getBoundingClientRect();
  // t מוגבל ל-0 עד 1, כך שהגרירה לא עוברת 60 פיקסלים לכל צד גם כשהרצועה מחוץ למסך
  const t=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight+r.height)));
  dm.style.translate=((t-.5)*120)+"px 0";}
addEventListener("scroll",()=>{if(!tick&&!still.matches){tick=true;requestAnimationFrame(frame)}},{passive:true});
still.addEventListener("change",frame);
frame();`
},
{
  id:"lm9", cat:"lm", name:"צל מוזח קשיח + רדיוס חד-צדדי", tech:"CSS (קרפט, לא תנועה)", status:"ממתין",
  desc:"שני מהלכי הקרפט מהעבודה החדשה: צל קשיח בצבע מותג בהיסט 45 מעלות, ורדיוס שמעוגל רק בצד אחד.",
  when:"כרטיסי מפתח בעורות עם אופי. שפת צל אחת לעמוד: או מוזח או רך, לא שניהם.",
  css:`.craft{display:flex;gap:var(--gap);justify-content:center;flex-wrap:wrap}
/* --hard-c: צבע המותג של הפרויקט. הכתום הוא רק ברירת המחדל של הדמו */
.hard{background:var(--card);border:2px solid var(--ink);border-radius:14px;padding:30px;box-shadow:8px 8px 0 var(--hard-c,#f49e40);max-width:240px;
  transition:transform .25s cubic-bezier(.2,.6,.2,1),box-shadow .25s cubic-bezier(.2,.6,.2,1)}
/* רק עם עכבר אמיתי, אחרת במגע הכרטיס נשאר קפוץ. בהפחתת תנועה רק הצל גדל */
@media (hover:hover) and (pointer:fine){.hard:hover{box-shadow:12px 12px 0 var(--hard-c,#f49e40)}}
@media (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){.hard:hover{transform:translate(-3px,-3px)}}
.oneside{background:var(--ink);color:var(--bg);padding:30px;border-radius:40px 40px 0 0;max-width:240px}
/* פינה לוגית: בעברית התחתונה הימנית, ובאתר LTR היא מתהפכת לבד לשמאלית */
.oneside2{background:var(--card);border:1px solid var(--line);padding:30px;border-radius:0;border-end-start-radius:60px;max-width:240px}
.craft h3{margin:0 0 6px;font-size:17px}.craft p{margin:0;font-size:13.5px;color:var(--muted)}
.oneside p{color:color-mix(in srgb,var(--bg) 70%,transparent)}`,
  html:`<div class="stage tight"><div class="craft">
<div class="hard"><h3>צל מוזח קשיח</h3><p>תמיד 45 מעלות, תמיד צבע מותג, בלי blur. עבור עליי.</p></div>
<div class="oneside"><h3>רדיוס עליון בלבד</h3><p>40 40 0 0. שובר את המלבניות בלי אפקט.</p></div>
<div class="oneside2"><h3>פינה אחת בלבד</h3><p>רק התחתונה בצד ההתחלה. אסימטריה מכוונת.</p></div>
</div></div>`,
  js:``, runway:false
}
];
