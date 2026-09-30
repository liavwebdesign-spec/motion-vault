// סבב שמיני (3.9.2026): GSAP בלבד, הכל מונע גלילה.
export default [
{
  id:"g57", cat:"gsap", name:"גלגל תמונות שמסתובב בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"תמונות מסודרות על היקף מעגל ענק שרובו מחוץ למסך. הגלילה מסובבת את הגלגל, כל תמונה עולה לראש הקשת בתורה, וכל אחת נשארת ישרה כלפי הצופה.",
  when:"תיק עבודות, קטלוג שירותים, ציר שנים, גלריית לקוחות. מחליף קרוסלה רגילה ברגע שנשאר בזיכרון, בלי כפתורים ובלי חצים.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי תנועה (וגם בלי JS) הפריטים הם גריד רגיל שכולו על המסך. הגלגל, הבמה הדביקה ו-300vh של גלילה קיימים רק תחת .is-live */
.wh{position:relative}
.wh-stick{padding-block:var(--sec)}
.wh-title{text-align:center;padding-inline:var(--gutter);margin-bottom:32px}
.wh-title h3{margin:0;font-size:clamp(24px,3.4vw,46px)}
.wh-title p{margin:8px 0 0;color:var(--muted);font-size:15px}
.wh-wheel{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px;padding-inline:var(--gutter)}
.wh-item{position:relative;aspect-ratio:3/4}
.wh.is-live{height:300vh}
.wh.is-live .wh-stick{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center;padding-block:0}
.wh.is-live .wh-title{position:absolute;top:12vh;inset-inline:0;margin:0;pointer-events:none;z-index:2}
/* הגלגל גדול מהמסך בכוונה: רואים רק את הקשת העליונה שלו */
.wh.is-live .wh-wheel{display:block;padding:0;position:absolute;top:58vh;left:50%;width:min(190vh,190vw);aspect-ratio:1;
  transform:translate(-50%,0);will-change:transform}
.wh.is-live .wh-item{position:absolute;top:0;left:50%;width:clamp(120px,15vh,220px);
  margin-inline-start:calc(clamp(120px,15vh,220px) / -2);
  transform-origin:50% calc(min(190vh,190vw) / 2)}
/* בטלפון הגלגל רחב מהמסך לפי הגובה: הקשת שטוחה יותר, שלושה כרטיסים על המסך, והתוויות לא נחתכות זו על זו */
@media(max-width:767px){.wh.is-live .wh-wheel{width:190vh}.wh.is-live .wh-item{transform-origin:50% 95vh}}
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
  if(typeof gsap==="undefined")return;
  const sec=document.querySelector(".wh"),wheel=sec.querySelector(".wh-wheel");
  const items=gsap.utils.toArray(".wh-item");
  const SPREAD=13;                                   // מעלות בין פריט לפריט
  const START=(items.length-1)*SPREAD/2;
  // בהפחתת תנועה אין גלגל בכלל: ה-CSS בלי .is-live מציג את הפריטים כגריד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    sec.classList.add("is-live");
    const angles=items.map((el,i)=>{
      const a=-START+i*SPREAD;
      gsap.set(el,{rotation:a});
      return a;
    });
    // ההטיה האמיתית של פריט היא הזווית שלו על הגלגל ועוד סיבוב הגלגל עצמו, וזה משתנה
    // לאורך כל הגלילה. סיבוב-נגד סטטי מיישר אותו רק בנקודה אחת ומטה אותו בכל השאר,
    // ולכן שני הסיבובים יושבים על אותו טיימליין ומתקזזים בכל רגע.
    const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.fromTo(wheel,{rotation:START},{rotation:-START,ease:"none",duration:1},0);
    items.forEach((el,i)=>{
      const a=angles[i];
      tl.fromTo(el.querySelector(".wh-inner"),
        {rotation:-(a+START)},{rotation:-(a-START),ease:"none",duration:1},0);
    });
    return ()=>sec.classList.remove("is-live");
  });
})();`,
  runway:false,
  note:"הכל נשען על `transform-origin` אחד: כל פריט מסובב סביב מרכז הגלגל שנמצא הרבה מתחת למסך, ולכן הוא נע על קשת ולא בקו ישר. הפריט מסובב בזווית שלו, והתוכן שבתוכו מסובב במינוס הזווית **הכוללת**: זווית הפריט ועוד סיבוב הגלגל. **המלכודת**: סיבוב-נגד סטטי מיישר את התמונה רק בנקודת גלילה אחת ומטה אותה בכל השאר, ולכן שני הסיבובים חייבים לשבת על אותו טיימליין. ומלכודת שנייה: מסובבים שכבה פנימית אחת שעוטפת גם את התמונה וגם את התווית, כי סיבוב נפרד לכל אחת מסובב אותן סביב מרכזים שונים והתווית נשברת החוצה. הגלגל עצמו רחב מהמסך בכוונה, כדי שהקשת תיראה כמעט ישרה ולא כמו קרוסלה עגולה; בטלפון הקוטר נגזר מהגובה (190vh), אחרת במרווח של 13 מעלות הכרטיסים חופפים ומכסים זה לזה את התוויות. שני מספרים שולטים בהכל: המרווח בין הפריטים במעלות, וקוטר הגלגל. מרווח גדול מדי והפריטים מתפזרים, קוטר קטן מדי והקשת נעשית תלולה. בהפחתת תנועה, וגם כש-GSAP לא נטען, אין גלגל ואין 300vh של גלילה מול במה קפואה: הפריטים מוצגים כגריד רגיל, כי כל הגלגל יושב תחת .is-live שהסקריפט מוסיף."
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
  if(typeof gsap==="undefined")return;
  const word=document.querySelector(".tm-word");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.timeline({scrollTrigger:{trigger:".tm",start:"top top",end:"bottom bottom",scrub:.5}})
      // הרקע הוא מה שנע, לא הטקסט: האותיות נשארות במקום והחלון שלהן מראה חלק אחר
      .fromTo(word,{backgroundPosition:"0% 50%"},{backgroundPosition:"100% 50%",ease:"none"},0)
      // scale בלבד: ריווח אותיות מונפש היה פורס את הטקסט מחדש בכל פריים של גלילה
      .fromTo(word,{scale:.86},{scale:1,ease:"none"},0);
  });
})();`,
  runway:false,
  note:"שני דברים שאסור לפספס. הראשון: `-webkit-text-fill-color:transparent` נחוץ בנוסף ל-`color:transparent`, אחרת בחלק מהדפדפנים הטקסט פשוט נעלם או נשאר צבוע. השני: חייבים `@supports` שמחזיר צבע מלא כשאין תמיכה, כי טקסט שקוף בלי רקע גלוי הוא טקסט בלתי נראה, וזו תקלת נגישות ולא רק תקלה חזותית. הרקע גדול מהאלמנט (`background-size` מעל מאה אחוז) כי בלי עודף אין מה להזיז. הגרדיאנט של ארבעה צבעים בדמו מדגים רק את המנגנון: באתר אמיתי שמים בתוך האותיות תמונה או וידאו של הלקוח, או שני גוונים סמוכים מהמותג, לא קשת. פעם אחת בעמוד, ובודקים ניגודיות 3:1 מול העצירה הבהירה ביותר. אם שמים תמונה, כדאי תמונה עם ניגודיות גבוהה: פרטים עדינים נעלמים בתוך אותיות."
},
{
  id:"g59", cat:"gsap", name:"כרטיסים שמתקרבים מהעומק בגלילה", tech:"GSAP · ScrollTrigger · perspective", status:"ממתין",
  desc:"כרטיסים שמגיעים מרחוק, מטושטשים וקטנים, וחולפים על פני הצופה אחד אחרי השני בקצב הגלילה. מי שקרוב חד, מי שרחוק מטושטש.",
  when:"שלבי תהליך, יתרונות, ציטוטי לקוחות, מעבר בין פרקים בעמוד ארוך. נותן לרצף פריטים תחושת מסע במקום רשימה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי תנועה (וגם בלי JS) הכרטיסים הם טור רגיל שכולו נקרא. הבמה התלת-ממדית קיימת רק תחת .is-live */
.dp{position:relative}
.dp-stick{display:grid;gap:24px;justify-items:center;padding-block:var(--sec)}
.dp-card{position:relative;width:min(420px,84vw);border-radius:20px;background:var(--card);
  border:1px solid var(--line);padding:clamp(20px,2.6vw,34px);box-shadow:0 24px 60px rgba(20,20,40,.14)}
.dp-card .ph{aspect-ratio:16/9;border-radius:12px;font-size:0;margin-bottom:16px}
.dp-card h4{margin:0 0 8px;font-size:clamp(19px,2vw,26px)}
.dp-card p{margin:0;color:var(--muted);font-size:15.5px;line-height:1.7}
.dp-num{margin:0;text-align:center;color:var(--muted);font-size:14px}
.dp.is-live{height:340vh}
.dp.is-live .dp-stick{position:sticky;top:0;height:100vh;overflow:hidden;place-items:center;gap:0;padding-block:0;
  perspective:900px;perspective-origin:50% 50%}
.dp.is-live .dp-card{position:absolute;will-change:transform,opacity,filter}
/* ההנחיה מתחת לכרטיסים, לא מעליהם */
.dp.is-live .dp-num{position:absolute;top:8vh;inset-inline:0;z-index:0}
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
  if(typeof gsap==="undefined")return;
  const sec=document.querySelector(".dp");
  const cards=gsap.utils.toArray(".dp-card");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    sec.classList.add("is-live");
    const FAR=-1400, NEAR=460, SLOT=.6, DUR=.9;
    // בלי preserve-3d הכרטיסים מצוירים לפי סדר ה-DOM ולא לפי העומק, והרחוק שמגיע היה מצויר מעל הקרוב שחולף.
    // כרטיס מוקדם תמיד קרוב יותר מהבא אחריו, ולכן z-index יורד לפי הסדר
    gsap.set(cards,{zIndex:i=>cards.length-i});
    const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:"top top",end:"bottom bottom",scrub:.6}});
    cards.forEach((c,i)=>{
      const t=i*SLOT,last=i===cards.length-1;
      // שלב 1: מגיע מרחוק ונעשה חד בדיוק כשהוא בגודל הטבעי (z:0).
      // כל ה-fromTo מציירים את מצב ההתחלה מיד, ולכן כולם מחכים רחוק ושקופים.
      // autoAlpha ולא opacity: כרטיס שקוף מקבל visibility:hidden ולא חוסם לחיצה על הכרטיס שמאחוריו
      tl.fromTo(c,{z:FAR,autoAlpha:0,filter:"blur(14px)"},
        {z:0,autoAlpha:1,filter:"blur(0px)",ease:"none",duration:DUR*.4},t);
      // שלב 2: אחרי עצירה בגודל הטבעי, מספיק ארוכה כדי לקרוא, הוא חולף קדימה ודוהה. האחרון נשאר במקום
      if(!last)tl.to(c,{z:NEAR,autoAlpha:0,ease:"none",duration:DUR*.28},t+DUR*.72);
    });
    // רגע של מנוחה בסוף: הכרטיס האחרון חד ושלם לפני שהסקשן משתחרר
    tl.to({},{duration:DUR*.4});
    return ()=>sec.classList.remove("is-live");
  });
})();`,
  runway:false,
  note:"שלוש הכרעות. הראשונה: `perspective` יושב על המעטפת ולא על הכרטיס, אחרת לכל כרטיס יש נקודת מגוז משלו והעומק נשבר. השנייה: הטשטוש הוא מה שקונה את האשליה. תנועה ב-`z` בלבד נקראת כהגדלה, וברגע שהרחוק מטושטש המוח מפרש מרחק. `filter:blur` יקר, ולכן הוא נשאר על ארבעה כרטיסים ולא על עשרים. השלישית: כל כרטיס מגיע מרחוק, מטושטש ושקוף, ונעשה חד בדיוק כשהוא בגודל הטבעי; אחרי עצירה קצרה הוא חולף קדימה ודוהה, והאחרון נשאר במקום. כך יש רגע שבו כל כרטיס נקרא, ואטימות נשלטת בטווין אחד בכל שלב (שני טווינים על אותה אטימות היו מקפיצים אותה ל-1 ומפילים באמצע). כל ה-fromTo מציירים את מצב ההתחלה מיד, ולכן כולם מחכים רחוק ושקופים. בהפחתת תנועה, וגם כש-GSAP לא נטען, הכרטיסים הם טור רגיל, כי הבמה התלת-ממדית יושבת תחת .is-live שהסקריפט מוסיף."
},
];
