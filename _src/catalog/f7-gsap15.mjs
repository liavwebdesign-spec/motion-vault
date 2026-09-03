// סבב שמיני (3.9.2026): GSAP בלבד, הכל מונע גלילה.
export default [
{
  id:"g57", cat:"gsap", name:"גלגל תמונות שמסתובב בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"תמונות מסודרות על היקף מעגל ענק שרובו מחוץ למסך. הגלילה מסובבת את הגלגל, כל תמונה עולה לראש הקשת בתורה, וכל אחת נשארת ישרה כלפי הצופה.",
  when:"תיק עבודות, קטלוג שירותים, ציר שנים, גלריית לקוחות. מחליף קרוסלה רגילה ברגע שנשאר בזיכרון, בלי כפתורים ובלי חצים.",
  libs:["gsap","ScrollTrigger"],
  css:`.wh{height:300vh;position:relative}
.wh-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center}
.wh-title{position:absolute;top:12vh;inset-inline:0;text-align:center;pointer-events:none;z-index:2}
.wh-title h3{margin:0;font-size:clamp(24px,3.4vw,46px)}
.wh-title p{margin:8px 0 0;color:var(--muted);font-size:15px}
/* הגלגל גדול מהמסך בכוונה: רואים רק את הקשת העליונה שלו */
.wh-wheel{position:absolute;top:58vh;left:50%;width:min(190vh,190vw);aspect-ratio:1;
  transform:translate(-50%,0);will-change:transform}
.wh-item{position:absolute;top:0;left:50%;width:clamp(120px,15vh,220px);aspect-ratio:3/4;
  margin-inline-start:calc(clamp(120px,15vh,220px) / -2);
  transform-origin:50% calc(min(190vh,190vw) / 2)}
/* שכבה פנימית אחת שמסובבת-נגד. סיבוב נפרד של התמונה ושל התווית מסובב כל אחת
   סביב מרכז אחר, והתווית שיושבת בתחתית נשברת החוצה מהמסגרת. */
.wh-inner{position:absolute;inset:0;border-radius:14px;overflow:hidden;will-change:transform}
.wh-inner .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.wh-inner b{position:absolute;inset-inline:0;bottom:0;padding:8px 10px;color:#fff;font-size:13px;
  background:linear-gradient(transparent,rgba(0,0,0,.6))}
.wh-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;
  color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="wh"><div class="wh-stick">
  <div class="wh-title"><h3>העבודות שלנו</h3><p>גלול. הגלגל מסתובב והפריטים עולים בתורם.</p></div>
  <div class="wh-wheel">
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-a"></div><b>משרד עורכי דין</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-c"></div><b>מותג קוסמטיקה</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-d"></div><b>קורס דיגיטלי</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-e"></div><b>פורטל לקוחות</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-b"></div><b>קליניקה פרטית</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-f"></div><b>יבואן ריהוט</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-a"></div><b>סטודיו צילום</b></div></div>
    <div class="wh-item"><div class="wh-inner"><div class="ph ph-c"></div><b>רשת מסעדות</b></div></div>
  </div>
</div></div>
<p class="wh-after">אותו מנגנון עובד גם עם שמות שנים או שלבי תהליך במקום תמונות, וגם בכיוון ההפוך.</p>`,
  js:`(function(){
  const wheel=document.querySelector(".wh-wheel");
  const items=gsap.utils.toArray(".wh-item");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPREAD=13;                                   // מעלות בין פריט לפריט
  const START=(items.length-1)*SPREAD/2;

  const angles=items.map((el,i)=>{
    const a=-START+i*SPREAD;
    gsap.set(el,{rotation:a});
    return a;
  });

  if(reduce){items.forEach((el,i)=>gsap.set(el.querySelector(".wh-inner"),{rotation:-angles[i]}));return;}

  // ההטיה האמיתית של פריט היא הזווית שלו על הגלגל ועוד סיבוב הגלגל עצמו, וזה משתנה
  // לאורך כל הגלילה. סיבוב-נגד סטטי מיישר אותו רק בנקודה אחת ומטה אותו בכל השאר,
  // ולכן שני הסיבובים יושבים על אותו טיימליין ומתקזזים בכל רגע.
  const tl=gsap.timeline({scrollTrigger:{trigger:".wh",start:"top top",end:"bottom bottom",scrub:.7}});
  tl.fromTo(wheel,{rotation:START},{rotation:-START,ease:"none",duration:1},0);
  items.forEach((el,i)=>{
    const a=angles[i];
    tl.fromTo(el.querySelector(".wh-inner"),
      {rotation:-(a+START)},{rotation:-(a-START),ease:"none",duration:1},0);
  });
})();`,
  runway:false,
  note:"הכל נשען על `transform-origin` אחד: כל פריט מסובב סביב מרכז הגלגל שנמצא הרבה מתחת למסך, ולכן הוא נע על קשת ולא בקו ישר. הפריט מסובב בזווית שלו, והתוכן שבתוכו מסובב במינוס הזווית **הכוללת**: זווית הפריט ועוד סיבוב הגלגל. **המלכודת**: סיבוב-נגד סטטי מיישר את התמונה רק בנקודת גלילה אחת ומטה אותה בכל השאר, ולכן שני הסיבובים חייבים לשבת על אותו טיימליין. ומלכודת שנייה: מסובבים שכבה פנימית אחת שעוטפת גם את התמונה וגם את התווית, כי סיבוב נפרד לכל אחת מסובב אותן סביב מרכזים שונים והתווית נשברת החוצה. הגלגל עצמו רחב מהמסך בכוונה, כדי שהקשת תיראה כמעט ישרה ולא כמו קרוסלה עגולה. שני מספרים שולטים בהכל: המרווח בין הפריטים במעלות, וקוטר הגלגל. מרווח גדול מדי והפריטים מתפזרים, קוטר קטן מדי והקשת נעשית תלולה."
},
{
  id:"g58", cat:"gsap", name:"כותרת ענקית שרואים דרכה את המדיה", tech:"GSAP · ScrollTrigger · background-clip", status:"ממתין",
  desc:"מילה אחת בגודל ענק שהאותיות שלה הן חלון: מאחוריהן נעה תמונה בקצב הגלילה. הטקסט הוא המסכה, לא הצבע.",
  when:"פתיחת עמוד, מעבר בין פרקים, שם המותג בסוף העמוד. רגע יחיד בעמוד, ובדיוק בגלל זה הוא נזכר.",
  libs:["gsap","ScrollTrigger"],
  css:`.tm{height:220vh;position:relative}
.tm-stick{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden;background:var(--bg)}
.tm-word{margin:0;font-size:clamp(72px,20vw,280px);line-height:.92;font-weight:800;letter-spacing:-.02em;
  text-align:center;
  background-image:linear-gradient(120deg,#3b5bdb,#0b7285 38%,#e8590c 68%,#5f3dc4);
  background-size:260% 260%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  -webkit-text-fill-color:transparent}
/* אם הדפדפן לא תומך בחיתוך רקע לטקסט, חוזרים לצבע מלא ולא לטקסט שקוף */
@supports not ((-webkit-background-clip:text) or (background-clip:text)){
  .tm-word{color:var(--ink);-webkit-text-fill-color:currentColor}
}
.tm-sub{position:absolute;bottom:11vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}
.tm-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;
  color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="tm"><div class="tm-stick">
  <h2 class="tm-word">אתרים<br>שמביאים</h2>
  <p class="tm-sub">גלול. מה שרואים בתוך האותיות זז.</p>
</div></div>
<p class="tm-after">במקום גרדיאנט אפשר לשים כאן תמונה או וידאו של הלקוח, ואז האותיות הופכות לחלון אל העבודה עצמה.</p>`,
  js:`(function(){
  const word=document.querySelector(".tm-word");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  gsap.timeline({scrollTrigger:{trigger:".tm",start:"top top",end:"bottom bottom",scrub:.5}})
    // הרקע הוא מה שנע, לא הטקסט: האותיות נשארות במקום והחלון שלהן מראה חלק אחר
    .fromTo(word,{backgroundPosition:"0% 50%"},{backgroundPosition:"100% 50%",ease:"none"},0)
    .fromTo(word,{scale:.86,letterSpacing:"0.04em"},{scale:1,letterSpacing:"-0.02em",ease:"none"},0);
})();`,
  runway:false,
  note:"שני דברים שאסור לפספס. הראשון: `-webkit-text-fill-color:transparent` נחוץ בנוסף ל-`color:transparent`, אחרת בחלק מהדפדפנים הטקסט פשוט נעלם או נשאר צבוע. השני: חייבים `@supports` שמחזיר צבע מלא כשאין תמיכה, כי טקסט שקוף בלי רקע גלוי הוא טקסט בלתי נראה, וזו תקלת נגישות ולא רק תקלה חזותית. הרקע גדול מהאלמנט (`background-size` מעל מאה אחוז) כי בלי עודף אין מה להזיז. אם שמים תמונה במקום גרדיאנט, כדאי תמונה עם ניגודיות גבוהה: פרטים עדינים נעלמים בתוך אותיות."
},
{
  id:"g59", cat:"gsap", name:"כרטיסים שמתקרבים מהעומק בגלילה", tech:"GSAP · ScrollTrigger · perspective", status:"ממתין",
  desc:"כרטיסים שמגיעים מרחוק, מטושטשים וקטנים, וחולפים על פני הצופה אחד אחרי השני בקצב הגלילה. מי שקרוב חד, מי שרחוק מטושטש.",
  when:"שלבי תהליך, יתרונות, ציטוטי לקוחות, מעבר בין פרקים בעמוד ארוך. נותן לרצף פריטים תחושת מסע במקום רשימה.",
  libs:["gsap","ScrollTrigger"],
  css:`.dp{height:340vh;position:relative}
.dp-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center;
  perspective:900px;perspective-origin:50% 50%}
.dp-card{position:absolute;width:min(420px,84vw);border-radius:20px;background:var(--card);
  border:1px solid var(--line);padding:clamp(20px,2.6vw,34px);box-shadow:0 24px 60px rgba(20,20,40,.14);
  will-change:transform,opacity,filter}
.dp-card .ph{aspect-ratio:16/9;border-radius:12px;font-size:0;margin-bottom:16px}
.dp-card h4{margin:0 0 8px;font-size:clamp(19px,2vw,26px)}
.dp-card p{margin:0;color:var(--muted);font-size:15.5px;line-height:1.7}
.dp-num{position:absolute;top:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:14px;z-index:3}
.dp-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;
  color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="dp"><div class="dp-stick">
  <p class="dp-num">גלול. הכרטיסים מגיעים מרחוק וחולפים.</p>
  <article class="dp-card"><div class="ph ph-a"></div><h4>שיחת אפיון</h4>
    <p>מבינים את העסק, את הלקוח ואת מה שצריך לקרות באתר, לפני שנוגעים בעיצוב.</p></article>
  <article class="dp-card"><div class="ph ph-c"></div><h4>קופי ומבנה</h4>
    <p>כותבים את המסרים ובונים את סדר הסקשנים, כך שכל גלילה עונה על השאלה הבאה.</p></article>
  <article class="dp-card"><div class="ph ph-d"></div><h4>עיצוב ופיתוח</h4>
    <p>הופכים את המבנה לאתר חי, מהיר, שנראה נכון בכל מסך.</p></article>
  <article class="dp-card"><div class="ph ph-e"></div><h4>עלייה ומדידה</h4>
    <p>מחברים מעקב, עולים לאוויר, ובודקים מה עובד במקום לנחש.</p></article>
</div></div>
<p class="dp-after">הטשטוש הוא מה שהופך את זה לעומק ולא להגדלה. בלעדיו הכרטיס פשוט גדל, ועם קצת ממנו העין מפרשת מרחק.</p>`,
  js:`(function(){
  const cards=gsap.utils.toArray(".dp-card");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(cards,{position:"relative",opacity:1,marginBottom:24});return;}
  const FAR=-1400, NEAR=460, SLOT=.6, DUR=.9;
  const tl=gsap.timeline({scrollTrigger:{trigger:".dp",start:"top top",end:"bottom bottom",scrub:.6}});
  cards.forEach((c,i)=>{
    // כל כרטיס תופס פרק זמן משלו, והפרקים חופפים כדי שתמיד יהיה משהו על המסך.
    // כל ה-fromTo מציירים את מצב ההתחלה מיד, ולכן כולם מתחילים רחוק ושקופים.
    tl.fromTo(c,{z:FAR,opacity:0,filter:"blur(14px)"},
      {z:NEAR,opacity:1,filter:"blur(0px)",ease:"none",duration:DUR},i*SLOT)
      // האטימות עולה מהר יותר מהמרחק, אחרת יש רגע שבו הכרטיס הבא עוד שקוף והקודם כבר יצא
      .to(c,{opacity:1,duration:DUR*.4,ease:"none"},i*SLOT);
    // האחרון נשאר, כדי שסוף הסקשן לא יהיה מסך ריק
    if(i<cards.length-1)tl.to(c,{opacity:0,ease:"none",duration:.25},i*SLOT+DUR*.86);
  });
})();`,
  runway:false,
  note:"שלוש הכרעות. הראשונה: `perspective` יושב על המעטפת ולא על הכרטיס, אחרת לכל כרטיס יש נקודת מגוז משלו והעומק נשבר. השנייה: הטשטוש הוא מה שקונה את האשליה. תנועה ב-`z` בלבד נקראת כהגדלה, וברגע שהרחוק מטושטש המוח מפרש מרחק. `filter:blur` יקר, ולכן הוא נשאר על ארבעה כרטיסים ולא על עשרים. השלישית: `immediateRender` פעיל רק לכרטיס הראשון; בלעדיו כל ארבעת ה-fromTo מציירים את מצב ההתחלה שלהם בבנייה, והכרטיס הראשון נדחף אחורה לפני שהגלילה בכלל התחילה. החפיפה בין הפרקים היא מה שמונע רגע ריק בין כרטיס לכרטיס."
},
];
