// שבעה מהלכים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה"), משפחת כפתורים ומשוב קטן:
// חותמות שנדבקות בטריקה, כרטיס סיום, מנעול שנסגר, פיצוץ הצלחה, מספרים שקופצים, כפתור שהופך לפס התקדמות וטבעת פינג בלחיצה.
// כולם נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל כפתור כאן הוא <button> אמיתי: עובד במקלדת, יש לו focus-visible, ושינוי המצב מוכרז ב-aria-live.
export default [
{
  id:"g202", cat:"gsap", name:"חותמות ומדבקות שנדבקות בטריקה", tech:"GSAP · ScrollTrigger once", status:"מאושר-עין",
  desc:"שלוש חותמות ומדבקות נוחתות על תמונת מוצר אחת אחרי השנייה. כל אחת מגיעה גדולה ומסובבת, נופלת מהר ונעצרת בבת אחת, והתמונה כולה רועדת קצת מהמכה. כל חותמת נושאת מילה אחת על המוצר: חדש, אפוי הבוקר, נשארו 6.",
  when:"כרטיס מוצר, מבצע או עבודה מוצגת שצריך לסמן במילה אחת: חדש, אושר, נמסר, אזל המלאי. סקשן הצעה, הוכחה או תיק עבודות. עד שלוש חותמות על תמונה, פעם אחת בכניסה, ורק עם מילים שנכונות בפועל.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם חותמת או מדבקה מסובבת נופלת גדולה על כרטיס, באנר או מילה ומסמנת אותה כחדשה או מאושרת. נבנה מאפס מהצפייה. **הנחיתה:** כל חותמת מגיעה ב-`scale` 1.9 ומסובבת 16 מעלות יותר מהזווית הסופית, ונופלת ב-`power4.in`, כלומר מתחילה לאט ופוגעת במהירות כמו יד שמורידה חותמת. בפגיעה הצורה נמעכת לרגע (`scaleY` .88) ומתיישרת, והתמונה כולה יורדת 5px וחוזרת. הקפיצה של הפגיעה בנויה משני טווינים קצרים ולא מ-ease של קפיצה, כי אלה אסורים במאגר. **הזווית הסופית** של כל חותמת היא `--r` על המחלקה שלה ב-CSS ולא ב-style מוטבע. לכן בלי GSAP ובהפחתת תנועה החותמות יושבות בזווית שלהן, וזה המצב הסופי, והניקוי של הטווין מחזיר אותן אליו. **מתי נורה:** `ScrollTrigger` פעם אחת כשהתמונה ב-70% מהמסך, וחותמות בהפרש של .6 שנייה. **הצל הקשיח** הוא `box-shadow` בלי טשטוש בצבע `--ink` או `--accent`. שלושה סוגים: חותם עגול (מילוי מותג וטבעת פנימית), חותמת מלבנית עם מסגרת, ומדבקה עם שוליים בצבע הרקע. **נגישות:** החותמות הן טקסט אמיתי ולא תמונה, ולכן קורא מסך שומע אותן אחרי התמונה. **באתר משמאל לימין:** החותמות ממוקמות לפי התמונה (`left` ו-`right`), ולכן אין מה להפוך. **בפרויקט:** מחליפים את התמונה, את המילים ואת המיקום לפי מה שיושב על התמונה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sk{max-width:920px;margin-inline:auto;display:grid;gap:20px}
.sk-photo{position:relative}
.sk-photo img{display:block;width:100%;height:auto;aspect-ratio:16 / 10;object-fit:cover;object-position:50% 62%;border-radius:20px}
/* כל חותמת נושאת את הזווית שלה ב---r. GSAP מטווין סביבה, והניקוי מחזיר אותה לכאן */
.sk-st{position:absolute;display:grid;place-items:center;text-align:center;font-weight:800;line-height:1;transform:rotate(var(--r,0deg))}
.sk-seal{--r:-12deg;left:5%;top:7%;width:clamp(96px,14vw,148px);aspect-ratio:1;border-radius:50%;align-content:center;gap:4px;background:var(--accent);color:var(--accent-ink);
  box-shadow:inset 0 0 0 4px var(--accent),inset 0 0 0 6px var(--accent-ink),-5px 6px 0 var(--ink)}
.sk-seal small{font-size:clamp(12px,1.3vw,16px);font-weight:600}
.sk-seal b{font-size:clamp(28px,3.8vw,48px);font-weight:800}
.sk-stamp{--r:5deg;right:5%;bottom:9%;padding:10px 24px;border:3px solid var(--ink);border-radius:8px;background:var(--bg);color:var(--ink);font-size:clamp(20px,2.8vw,34px);box-shadow:-5px 6px 0 var(--accent)}
.sk-tag{--r:-4deg;right:6%;top:50%;padding:8px 20px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:clamp(16px,1.8vw,22px);white-space:nowrap;box-shadow:0 0 0 4px var(--bg),-5px 6px 0 4px var(--ink)}
.sk-cap{display:grid;gap:4px}
.sk-cap b{font-size:clamp(22px,2.2vw,30px);font-weight:700}
.sk-cap span{color:var(--muted);font-size:var(--fs-body);line-height:1.5}`,
  html:`<div class="stage"><figure class="sk" style="margin-block:0">
  <div class="sk-photo">
    <img src="../assets/media/real/s14/croissants.webp" alt="שני קרואסונים על מפית יוטה ולידם כוס קפה" width="1250" height="1000" loading="lazy" decoding="async">
    <span class="sk-st sk-seal"><small>בתפריט</small><b>חדש</b></span>
    <span class="sk-st sk-stamp">אפוי הבוקר</span>
    <span class="sk-st sk-tag">נשארו 6</span>
  </div>
  <figcaption class="sk-cap"><b>קרואסון חמאה</b><span>אפוי כל בוקר מחמאה צרפתית, עד שהכמות נגמרת.</span></figcaption>
</figure></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP החותמות כבר בזווית הסופית (CSS)
  const root=document.querySelector(".sk"),photo=root.querySelector(".sk-photo"),stamps=[...root.querySelectorAll(".sk-st")];
  // בהפחתת תנועה הפונקציה לא רצה, והחותמות נשארות במקומן
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const rot=stamps.map(s=>parseFloat(getComputedStyle(s).getPropertyValue("--r"))||0);
    gsap.set(stamps,{autoAlpha:0});
    const tl=gsap.timeline({paused:true});
    stamps.forEach((s,i)=>{
      const t=.15+i*.6,r=rot[i];
      tl.set(s,{autoAlpha:1},t+.04)
        // נפילה: מתחילה לאט ופוגעת במהירות. הפגיעה נבנית משני טווינים קצרים של power, בלי ease של קפיצה
        .fromTo(s,{scale:1.9,rotation:r+16},{scale:1,rotation:r,duration:.22,ease:"power4.in"},t)
        .fromTo(s,{scaleY:.88,scaleX:1.06},{scaleY:1,scaleX:1,duration:.26,ease:"power2.out",immediateRender:false},t+.22)
        .to(photo,{y:5,duration:.05,ease:"power2.out"},t+.22)
        .to(photo,{y:0,duration:.2,ease:"power2.out"},t+.27);
    });
    const st=ScrollTrigger.create({trigger:root,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([photo,...stamps],{clearProps:"all"});};
  });
})();`
},
{
  id:"g203", cat:"gsap", name:"כרטיס סיום: לוגו, כותרת וכפתור בזה אחר זה", tech:"GSAP · ScrollTrigger once", status:"מאושר-עין",
  desc:"כרטיס הסגירה של העמוד נבנה בסדר קבוע: המשטח נרגע במקומו, הסמל והשם מתיישבים במרכז, הכותרת עולה מילה אחרי מילה והקו מתחת לביטוי המרכזי נמתח, ואז הכפתור נכנס עם נחיתה קטנה ושורת הפרטים הקטנים מופיעה אחרון. בסוף רואים הכול ביחד, ואין ספק איפה ללחוץ.",
  when:"סקשן הסגירה של דף נחיתה, וואן-פייג'ר או אתר תדמית, במקום פוטר עם כפתור. מתאים לכל עסק שיש לו שם, משפט אחד וקריאה אחת לפעולה. פעם אחת בעמוד, בסוף. עובד גם באתר שקט, כי כל מה שזז הוא כניסה אחת בסדר קריאה.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר ב-prompt-motion.com (21.10.2026) שנגמרים בכרטיס סיום: הסצנה הקודמת מתפנה, הלוגו מתיישב במרכז, כותרת של שורה אחת נבנית מתחתיו, וכפתור בצורת גלולה נכנס אחרון. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** סמל, שם, כותרת, כפתור ושורת פרטים, הכול גלוי. בלי GSAP ובהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** טיימליין אחד (`paused`) נורה פעם אחת מ-`ScrollTrigger` כשהכרטיס ב-72% מהמסך: המשטח עולה 24px, הסמל גדל מ-.6, השם יוצא מאחורי הסמל, מילות הכותרת עולות בהפרש של .07 שנייה, הקו מתחת לביטוי המרכזי נמתח, הכפתור מגיע ב-.9 ונוחת ב-1.04 וחוזר ל-1 (שני שלבים של `power`, בלי ease של קפיצה), ושורת הפרטים נוספת אחרון. **הביטוי המרכזי** מסומן בקו עבה בצבע `--accent` ולא בטקסט צבעוני, כדי שהקריאות לא תיפול בעור עם accent בהיר. הקו הוא `i` נפרד כדי שאפשר יהיה לטוון אותו. **הכיוון:** הקו נמתח מימין לשמאל (`transform-origin` ימין), והשם יוצא מהסמל שמאלה. **באתר משמאל לימין** הופכים את `transform-origin` של הקו ל-`0 50%` ואת `x` של השם לשלילי. **נגישות:** הכותרת היא `h2` אחד עם רווחים אמיתיים בין המילים, והקו מוסתר מקורא מסך. הכפתור הוא קישור אמיתי עם `focus-visible`.",
  libs:["gsap","ScrollTrigger"],
  css:`.ec{max-width:1040px;margin-inline:auto;min-height:clamp(420px,58vh,560px);display:grid;place-content:center;justify-items:center;gap:28px;padding:clamp(40px,6vw,88px) clamp(24px,5vw,72px);border-radius:32px;background:var(--card);text-align:center}
.ec-logo{display:flex;align-items:center;gap:14px}
.ec-mark{width:48px;height:48px;overflow:visible}
.ec-mark .a{fill:var(--accent)}
.ec-mark .d{fill:var(--card)}
.ec-word{font-size:clamp(24px,2.4vw,32px);font-weight:700;letter-spacing:-.01em}
.ec-h{margin:0;max-width:20ch;font-size:clamp(32px,5vw,68px);font-weight:700;line-height:1.12;letter-spacing:-.015em;text-wrap:balance}
.ec-w{display:inline-block}
.ec-key{position:relative;display:inline-block;white-space:nowrap}
.ec-ul{position:absolute;inset-inline:0;bottom:-.04em;height:.12em;border-radius:99px;background:var(--accent);transform-origin:100% 50%}
.ec-btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:60px;padding:16px 40px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:20px;font-weight:600;text-decoration:none}
.ec-btn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.ec-btn:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.ec-fine{margin:0;color:var(--muted);font-size:15px}`,
  html:`<div class="stage"><section class="ec" aria-labelledby="ec-h">
  <div class="ec-logo">
    <svg class="ec-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="a" d="M7 44V22a17 17 0 0 1 34 0v22z"/><path class="d" d="M18 44V27a6 6 0 0 1 12 0v17z"/></svg>
    <span class="ec-word">סטודיו ארז</span>
  </div>
  <h2 class="ec-h" id="ec-h"><span class="ec-w">נתחיל</span> <span class="ec-w">בשיחה</span> <span class="ec-w">של</span> <span class="ec-key"><span class="ec-w">עשרים</span> <span class="ec-w">דקות</span><i class="ec-ul" aria-hidden="true"></i></span> <span class="ec-w">בלי</span> <span class="ec-w">עלות</span></h2>
  <a class="ec-btn" href="#"><span>לקביעת שיחה</span><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></a>
  <p class="ec-fine">חוזרים אליכם בתוך יום עסקים</p>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הכרטיס כבר שלם (במארקאפ)
  const root=document.querySelector(".ec"),q=s=>root.querySelector(s);
  const mark=q(".ec-mark"),word=q(".ec-word"),words=root.querySelectorAll(".ec-w"),ul=q(".ec-ul"),btn=q(".ec-btn"),fine=q(".ec-fine");
  const all=[root,mark,word,...words,ul,btn,fine];
  // בהפחתת תנועה הפונקציה לא רצה, והכרטיס נשאר שלם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true,defaults:{ease:"power3.out"}});
    tl.from(root,{autoAlpha:0,y:24,duration:.6})
      .from(mark,{autoAlpha:0,scale:.6,transformOrigin:"50% 50%",duration:.5},.25)
      .from(word,{autoAlpha:0,x:16,duration:.5},.4)
      .from(words,{autoAlpha:0,y:22,duration:.55,stagger:.07},.65)
      .fromTo(ul,{scaleX:0},{scaleX:1,duration:.5,ease:"power2.inOut"},1.15)
      // הכפתור נוחת בשני שלבים: קצת מעל הגודל המלא וחזרה. בלי ease של קפיצה
      .fromTo(btn,{autoAlpha:0,scale:.9},{autoAlpha:1,scale:1.04,duration:.3},1.3)
      .to(btn,{scale:1,duration:.18,ease:"power2.inOut"})
      .from(fine,{autoAlpha:0,y:8,duration:.5},">-.05");
    const st=ScrollTrigger.create({trigger:root,start:"top 72%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set(all,{clearProps:"all"});};
  });
})();`
},
{
  id:"g204", cat:"gsap", name:"מנעול שנסגר עם קשת שיורדת", tech:"GSAP · ScrollTrigger once · SVG", status:"מאושר-עין",
  desc:"מנעול גדול עם הקשת מורמת. כשהסקשן נכנס למסך הקשת יורדת ונעצרת בגוף המנעול, יש לו רעד קטן, טבעת אור אחת מתפשטת ממנו ודועכת, ואז כרטיס הפרטים נפתח לידו ושורות הכרטיס נכנסות אחת אחרי השנייה. ההבטחה נחתמת לפני שקוראים אותה.",
  when:"סקשן אבטחה, גיבוי או פרטיות: מערכת עם מידע של לקוחות, משרד שמחזיק מסמכים, שירות עם שחזור. רק כשיש מאחורי המנעול הבטחה אמיתית אחת שאפשר לפרט בשלוש שורות. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אפליקציה ב-prompt-motion.com (21.10.2026) שבו מנעול נסגר והקשת יורדת אל גופו, ואחר כך מופיע כרטיס פרטים לידו. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** מנעול סגור והכרטיס גלוי. הקשת היא נתיב SVG נפרד שמצויר מאחורי הגוף, ולכן הרגליים שלה נעלמות בתוכו כשהיא יורדת, ואין צורך במסכה. **כשהמהלך רץ** הקשת מורמת ב-34 יחידות והכרטיס מוסתר, ורצה פעם אחת מ-`ScrollTrigger` כשהסקשן ב-70% מהמסך: הקשת יורדת ב-`power4.in` (מהירה בסוף), בפגיעה הגוף נלחץ ב-5% וחוזר, והקשת עולה 4 יחידות וחוזרת (שני טווינים של `power2`, בלי ease של קפיצה). בפגיעה גם יוצאת טבעת אחת מ-.7 ל-1.55 ודועכת, ההילה מאחור נדלקת, והכרטיס יוצא מכיוון המנעול ומתיישב. שורת אור אחת, בלי הבהוב. **כיוון:** המנעול הוא הראשון בקריאה (ימין) והכרטיס מגיע ממנו שמאלה. **באתר משמאל לימין** הופכים את סדר העמודות ואת `x` של הכרטיס לשלילי. **נגישות:** המנעול הוא איור (`aria-hidden`), וההבטחה כתובה בכותרת, בפסקה ובשורות הכרטיס, כטקסט אמיתי.",
  libs:["gsap","ScrollTrigger"],
  css:`.pl{max-width:1040px;margin-inline:auto;display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px)}
.pl-art{display:grid;place-items:center}
.pl-svg{width:min(100%,280px);height:auto;overflow:visible}
.pl-glow{fill:var(--accent);opacity:.12}
.pl-ring{fill:none;stroke:var(--accent);stroke-width:2;opacity:0}
.pl-sh{fill:none;stroke:var(--ink);stroke-width:14;stroke-linecap:round}
.pl-body{fill:var(--accent)}
.pl-key{fill:var(--accent-ink)}
.pl-slot{stroke:var(--accent-ink);stroke-width:8;stroke-linecap:round}
.pl-txt{display:grid;gap:20px}
.pl-txt h2{margin:0;max-width:20ch;font-size:clamp(30px,3.6vw,52px);line-height:1.12;text-wrap:balance}
.pl-txt>p{margin:0;max-width:46ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pl-card{display:grid;gap:12px;padding:24px;border-radius:24px;background:var(--card)}
.pl-chip{display:inline-flex;align-items:center;gap:8px;justify-self:start;margin:0;padding:6px 14px;border-radius:999px;background:var(--bg);font-size:15px;font-weight:700}
.pl-chip svg{width:16px;height:16px;fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.pl-rows{display:grid;margin:0}
.pl-rows>div{display:flex;justify-content:space-between;gap:16px;padding-block:12px}
.pl-rows dt{color:var(--muted);font-size:16px}
.pl-rows dd{margin:0;font-size:16px;font-weight:600}
@media(max-width:767px){.pl{grid-template-columns:minmax(0,1fr)}.pl-svg{width:min(60vw,200px)}}`,
  html:`<div class="stage"><section class="pl" aria-labelledby="pl-h">
  <div class="pl-art" aria-hidden="true">
    <svg class="pl-svg" viewBox="0 -16 160 216" focusable="false">
      <circle class="pl-glow" cx="80" cy="128" r="76"/>
      <circle class="pl-ring" cx="80" cy="128" r="58"/>
      <path class="pl-sh" d="M46 116V70a34 34 0 0 1 68 0v46"/>
      <rect class="pl-body" x="22" y="92" width="116" height="92" rx="22"/>
      <circle class="pl-key" cx="80" cy="128" r="10"/>
      <path class="pl-slot" d="M80 132v22"/>
    </svg>
  </div>
  <div class="pl-txt">
    <h2 id="pl-h">הקבצים של הלקוחות שלכם מגובים כל לילה</h2>
    <p>כל מה שעולה למערכת מוצפן ונשמר בשני מקומות נפרדים. אם קובץ נמחק בטעות, מחזירים אותו בלחיצה אחת.</p>
    <div class="pl-card">
      <p class="pl-chip"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>מוגן</p>
      <dl class="pl-rows">
        <div><dt>גיבוי אחרון</dt><dd>הלילה, 03:00</dd></div>
        <div><dt>הצפנה</dt><dd>מלאה, מקצה לקצה</dd></div>
        <div><dt>שחזור</dt><dd>עד 30 יום אחורה</dd></div>
      </dl>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP המנעול סגור והכרטיס גלוי (במארקאפ)
  const root=document.querySelector(".pl"),q=s=>root.querySelector(s);
  const sh=q(".pl-sh"),body=q(".pl-body"),ring=q(".pl-ring"),glow=q(".pl-glow"),card=q(".pl-card");
  const rows=[...card.querySelectorAll(".pl-chip,.pl-rows>div")];
  // בהפחתת תנועה הפונקציה לא רצה, והמנעול נשאר סגור
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(sh,{y:-34});gsap.set(glow,{opacity:0});gsap.set(card,{autoAlpha:0,x:40});gsap.set(rows,{autoAlpha:0});
    const tl=gsap.timeline({paused:true});
    tl.to(sh,{y:0,duration:.3,ease:"power4.in"},0)
      // פגיעה: הגוף נלחץ קצת והקשת עולה קצת וחוזרת, בשני טווינים קצרים של power
      .to(body,{scaleY:.95,svgOrigin:"80 184",duration:.07,ease:"power2.out"},.3)
      .to(body,{scaleY:1,svgOrigin:"80 184",duration:.2,ease:"power2.out"},.37)
      .to(sh,{y:-4,duration:.08,ease:"power2.out"},.3)
      .to(sh,{y:0,duration:.16,ease:"power2.in"},.38)
      // טבעת אור אחת, בלי הבהוב
      .fromTo(ring,{scale:.7,opacity:.8,svgOrigin:"80 128"},{scale:1.55,opacity:0,svgOrigin:"80 128",duration:.9,ease:"power2.out"},.34)
      .to(glow,{opacity:.12,duration:.6,ease:"power1.out"},.34)
      .to(card,{autoAlpha:1,x:0,duration:.6,ease:"power3.out"},.5)
      .to(rows,{autoAlpha:1,duration:.4,stagger:.1,ease:"power2.out"},.7);
    const st=ScrollTrigger.create({trigger:root,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([sh,body,ring,glow,card,...rows],{clearProps:"all"});};
  });
})();`
},
{
  id:"b83", cat:"behavior", name:"פיצוץ קונפטי או ניצוצות בהצלחה", tech:"vanilla JS · WAAPI · aria-live", status:"מאושר-עין",
  desc:"טופס קצר עם כפתור אמיתי. אחרי השליחה הטופס מתחלף באישור: עיגול עם וי שמצטייר, ומסביבו קווים קצרים ונקודות מתפזרים החוצה ודועכים תוך פחות משניית אחת, כשהעיגול רועד קצת. תנועה אחת קצרה שאומרת שזה עבד.",
  when:"אחרי פעולה שהמבקר מחכה לה: טופס פנייה, קביעת תור, הרשמה, תשלום ששולם. רק כשמדובר בחדשות טובות ופעם אחת, לא על כל לחיצה. לא אחרי טופס רגיש (רפואי, משפטי, כספי): שם מספיק וי שקט.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם חפץ שהושלם מוקף בקווים קצרים ובנקודות שמתפזרים מסביבו ודועכים. נבנה מאפס מהצפייה. **הפיצוץ:** 12 קווים (אחד ארוך ואחד קצר לסירוגין, בצבעי `--accent` ו-`--ink`) ו-8 נקודות רחוקות יותר, כולם נוצרים ברגע האישור ב-`element.animate` (Web Animations), נעים החוצה מהעיגול בקו ישר ודועכים תוך 640ms ב-`cubic-bezier(.2,.6,.2,1)`, ונמחקים מה-DOM בסיום. אין הבהוב: שקיפות עולה ויורדת בעקומה אחת. הרעד הוא תזוזה של 4px לכל כיוון ב-300ms על העטיפה של העיגול. **הפחתת תנועה:** בלי פיצוץ, בלי רעד ובלי ציור הווי, המצב מתחלף מיד. **כפתור אמיתי:** `<button type=\"submit\">` בתוך טופס, עובד ב-Enter, יש `focus-visible`, בזמן השליחה `aria-busy`, ושדה לא תקין מקבל `aria-invalid` והודעה ב-`aria-live`. **הכרזה:** אזור `role=\"status\"` קבוע מקבל את משפט האישור, והפוקוס עובר לכפתור \"להדגמה חוזרת\", כך שמשתמש מקלדת לא נשאר על כפתור שנעלם. הפאנל הלא פעיל הוא `inert`. **המספר במארקאפ** הוא דוגמה כדי שלחיצה אחת תראה את המהלך. בלי JS נשאר טופס רגיל. **באתר משמאל לימין:** שדה הטלפון מיושר לשמאל (`text-align:left`).",
  libs:[],
  css:`.bs{max-width:960px;margin-inline:auto}
.bs .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.bs-card{display:grid;min-height:clamp(420px,56vh,500px);padding:clamp(32px,5vw,64px);border-radius:32px;background:var(--card)}
.bs-form,.bs-done{grid-area:1/1;display:grid;align-content:center;justify-self:center;width:min(100%,440px);gap:14px}
.bs-form{text-align:start;transition:opacity .2s cubic-bezier(.2,.6,.2,1)}
.bs-form h2{margin:0;font-size:clamp(28px,3.4vw,44px);line-height:1.15;text-wrap:balance}
.bs-p{margin:0 0 6px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.bs-lab{font-size:15px;font-weight:600}
.bs-in{box-sizing:border-box;width:100%;min-height:60px;padding:0 20px;border:0;border-radius:16px;background:var(--bg);color:var(--ink);font:inherit;font-size:20px;text-align:right}
.bs-in:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.bs-in[aria-invalid="true"]{box-shadow:inset 0 0 0 2px var(--ink)}
.bs-err{min-height:1.4em;margin:0;font-size:15px;font-weight:600}
.bs-btn{min-height:60px;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:20px;font-weight:600;cursor:pointer}
.bs-btn:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.bs-btn[aria-busy="true"]{opacity:.75;cursor:progress}
.bs-done{justify-items:center;text-align:center;visibility:hidden;opacity:0;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.bs-done h3{margin:8px 0 0;font-size:clamp(26px,2.8vw,36px);line-height:1.15}
.bs-done p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.bs-card.is-done .bs-form{visibility:hidden;opacity:0}
.bs-card.is-done .bs-done{visibility:visible;opacity:1}
.bs-okw{position:relative;width:112px;height:112px;margin-bottom:16px}
.bs-ok{display:grid;place-items:center;width:100%;height:100%;border-radius:50%;background:var(--accent);color:var(--accent-ink)}
.bs-ok svg{width:52px;height:52px;fill:none;stroke:currentColor;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.bs-ok path{stroke-dasharray:1}
/* מרכז הפיצוץ הוא מרכז העיגול. הפריטים נוצרים ב-JS ונמחקים בסיום */
.bs-fx{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none}
.bs-fx i{position:absolute;left:0;top:0;transform-origin:0 0;opacity:0}
.bs-fx .d{width:4px;height:16px;border-radius:2px;background:var(--accent)}
.bs-fx .d.s{height:10px;background:var(--ink)}
.bs-fx .p{width:6px;height:6px;border-radius:50%;background:var(--accent)}
.bs-fx .p.s{background:var(--muted)}
.bs-again{margin-top:12px;padding:10px 20px;border:0;border-radius:999px;background:var(--bg);color:var(--ink);font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.bs-again:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
@media(prefers-reduced-motion:no-preference){
  .bs-card.is-done .bs-ok{animation:bsPop .45s cubic-bezier(.05,.7,.1,1) both}
  .bs-card.is-done .bs-ok path{animation:bsDraw .45s cubic-bezier(.2,.6,.2,1) .15s both}
}
@keyframes bsPop{from{transform:scale(.6)}to{transform:scale(1)}}
@keyframes bsDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@media(prefers-reduced-motion:reduce){.bs-form,.bs-done{transition:none}}`,
  html:`<div class="stage"><section class="bs" aria-labelledby="bs-h">
  <div class="bs-card">
    <form class="bs-form" novalidate>
      <h2 id="bs-h">נחזור אליכם עוד היום</h2>
      <p class="bs-p">השאירו מספר טלפון ונתקשר בין תשע לחמש, בימים א׳ עד ה׳.</p>
      <span class="bs-lab" id="bs-lab">מספר טלפון</span>
      <input class="bs-in" id="bs-tel" aria-labelledby="bs-lab" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" value="050-1234567" placeholder="050-0000000" aria-describedby="bs-err">
      <p class="bs-err" id="bs-err"></p>
      <button class="bs-btn" type="submit"><span>בקשת שיחה חוזרת</span></button>
    </form>
    <div class="bs-done" inert>
      <div class="bs-okw">
        <div class="bs-fx" aria-hidden="true"></div>
        <div class="bs-ok" aria-hidden="true"><svg viewBox="0 0 48 48" focusable="false"><path d="M13 25l7 7 15-16" pathLength="1"/></svg></div>
      </div>
      <h3>קיבלנו את המספר</h3>
      <p>נתקשר אליכם היום, עד חמש אחר הצהריים.</p>
      <button class="bs-again" type="button">להדגמה חוזרת</button>
    </div>
    <p class="bs-live sr-only" role="status"></p>
  </div>
</section></div>`,
  js:`(function(){
  const card=document.querySelector(".bs-card"),q=s=>card.querySelector(s);
  const form=q(".bs-form"),inp=q(".bs-in"),err=q(".bs-err"),btn=q(".bs-btn"),lab=btn.firstElementChild;
  const done=q(".bs-done"),again=q(".bs-again"),okw=q(".bs-okw"),fx=q(".bs-fx"),live=q(".bs-live");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)"),EASE="cubic-bezier(.2,.6,.2,1)";
  let timer=0;
  // הפיצוץ: 12 קווים ו-8 נקודות. כל אחד זז החוצה בקו ישר ודועך, ונמחק בסיום
  function piece(cls,angle,r0,r1,delay){
    const el=document.createElement("i");el.className=cls;fx.appendChild(el);
    const rot="rotate("+angle+"deg) ",ctr=" translate(-50%,-50%)";
    const a=el.animate([
      {transform:rot+"translateY(-"+r0+"px)"+ctr,opacity:0},
      {transform:rot+"translateY(-"+Math.round((r0+r1)/2)+"px)"+ctr,opacity:1,offset:.3},
      {transform:rot+"translateY(-"+r1+"px)"+ctr,opacity:0}
    ],{duration:640,delay:delay,easing:EASE,fill:"both"});
    a.onfinish=()=>el.remove();
  }
  function burst(){
    fx.textContent="";
    for(let i=0;i<12;i++)piece("d"+(i%2?" s":""),i*30,64,i%2?84:96,0);
    const far=[92,104,88,100,94,106,90,102];
    for(let i=0;i<8;i++)piece("p"+(i%2?" s":""),i*45+22,60,far[i],40);
    okw.animate([{transform:"translateX(0)"},{transform:"translateX(-4px)"},{transform:"translateX(4px)"},{transform:"translateX(-3px)"},{transform:"translateX(2px)"},{transform:"translateX(0)"}],{duration:300,easing:"linear"});
  }
  function finish(){
    btn.removeAttribute("aria-busy");lab.textContent="בקשת שיחה חוזרת";
    card.classList.add("is-done");form.inert=true;done.inert=false;
    live.textContent="קיבלנו את המספר, נתקשר אליכם היום";
    again.focus({preventScroll:true});
    if(!reduce.matches)setTimeout(burst,480);
  }
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(btn.getAttribute("aria-busy")==="true")return;
    if(inp.value.replace(/\\D/g,"").length<9){
      inp.setAttribute("aria-invalid","true");err.textContent="נא להזין מספר טלפון תקין";inp.focus();return;
    }
    inp.removeAttribute("aria-invalid");err.textContent="";
    btn.setAttribute("aria-busy","true");lab.textContent="שולחים";
    timer=setTimeout(finish,reduce.matches?300:900);
  });
  inp.addEventListener("input",()=>{if(inp.getAttribute("aria-invalid")){inp.removeAttribute("aria-invalid");err.textContent="";}});
  again.addEventListener("click",()=>{
    clearTimeout(timer);fx.textContent="";
    card.classList.remove("is-done");form.inert=false;done.inert=true;live.textContent="";
    inp.focus({preventScroll:true});
  });
})();`
},
{
  id:"b84", cat:"behavior", name:"מספרים שקופצים ונערמים בכל לחיצה", tech:"vanilla JS · WAAPI · aria-live", status:"מאושר-עין",
  desc:"בונים הצעה בלחיצות. כל לחיצה על שירות מקפיצה את המחיר שלו כמספר \"+\" מעל השורה, והמספר נוחת בראש ערימה בצד: השורות הישנות יורדות, הישנה ביותר יוצאת, וסך ההצעה שבפינה רץ למעלה אל הערך החדש ונדחף קצת. אפשר לראות מה נוסף ומה זה עשה לסכום, בלי לחפש.",
  when:"מחשבון הצעת מחיר, בחירת תוספות, חבילת שירותים שמרכיבים בעצמם, או כל מקום שבו כל פעולה מוסיפה ערך שהמבקר רוצה לראות נצבר. שלוש עד שש אפשרויות. לא כשיש בחירה אחת או מחיר קבוע.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם מספרים גדולים קופצים מעל יעד ונערמים ברשימה כשהסכום בפינה עולה בכל פגיעה. נבנה מאפס מהצפייה. **שלושה חלקים לכל לחיצה:** (1) המספר הצף (`.pv-float`) נולד בתוך הכפתור, מתחיל קטן, גדל ל-1.15 תוך עלייה של 16px ואז ממשיך לעלות עד 72px ודועך, ב-900ms, ונמחק בסיום. (2) שורה חדשה נכנסת בראש הערימה בגדול (1.5) ומתכווצת למקומה, והשורות הישנות זזות למטה ב-FLIP ידני: מודדים לפני ואחרי, ומריצים `translateY` מההפרש לאפס. הערימה נשמרת על ארבע שורות, והישנה יוצאת. גובה הערימה קבוע (`min-height`), ולכן הפריסה לא קופצת. (3) הסכום רץ מהערך הנוכחי לחדש ב-520ms עם עקומה של יציאה רכה, ונדחף ל-1.06 וחוזר. **מצב התחלתי במארקאפ:** שני שירותים כבר נבחרו, והסכום והערימה מציגים אותם. בלי JS זה מה שרואים, וה-JS ממשיך משם. **מספרים:** `font-variant-numeric:tabular-nums` ולא גופן מונו, כדי לרשת את הגופן של האתר. **נגישות:** הכפתורים אמיתיים עם `aria-label` שמתעדכן (שם, מחיר, כמה נוספו), המספרים הצפים והערימה מוסתרים (`aria-hidden`), והסכום מוכרז ב-`role=\"status\"` אחרי 400ms מהלחיצה האחרונה, כדי שקורא מסך לא יקריא את כל הערכים שבדרך. בהפחתת תנועה אין מספרים צפים, אין תנועה בערימה והסכום מתעדכן מיד. **באתר משמאל לימין:** מחליפים את `transform-origin` של הסכום והשורות מימין לשמאל.",
  libs:[],
  css:`.pv{max-width:1080px;margin-inline:auto;display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:start;gap:clamp(24px,4vw,56px)}
.pv .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.pv-main{display:grid;gap:20px}
.pv-main h2{margin:0;font-size:clamp(28px,3.2vw,44px);line-height:1.15;text-wrap:balance}
.pv-opts{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.pv-opt{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;width:100%;padding:12px;border:0;border-radius:20px;background:var(--card);color:var(--ink);font:inherit;text-align:start;cursor:pointer;transition:transform .16s cubic-bezier(.2,.6,.2,1)}
.pv-opt:active{transform:scale(.985)}
.pv-opt:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.pv-ph{position:relative;width:112px;height:84px}
.pv-ph img{display:block;width:100%;height:100%;object-fit:cover;border-radius:14px}
.pv-cnt{position:absolute;inset-block-start:-6px;inset-inline-start:-6px;display:none;place-items:center;min-width:28px;height:28px;padding:0 6px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:14px;font-weight:700;font-variant-numeric:tabular-nums}
.pv-opt.has .pv-cnt{display:grid}
.pv-name{font-size:clamp(18px,1.6vw,22px);font-weight:600}
.pv-price{padding-inline:8px;font-size:clamp(18px,1.6vw,22px);font-weight:700;font-variant-numeric:tabular-nums}
.pv-float{position:absolute;inset-inline-end:20px;top:8px;padding:4px 12px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;unicode-bidi:plaintext;pointer-events:none;opacity:0}
.pv-panel{display:grid;align-content:start;gap:20px;padding:28px;border-radius:28px;background:var(--card)}
.pv-lab{margin:0;color:var(--muted);font-size:16px}
.pv-total{margin:0;font-size:clamp(48px,6vw,84px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;transform-origin:100% 50%}
.pv-stack{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;min-height:184px}
.pv-stack li{padding:6px 16px;border-radius:999px;background:var(--bg);font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;unicode-bidi:plaintext;align-self:flex-start;transform-origin:100% 50%}
.pv-stack:empty::after{content:"עוד לא נבחר כלום";color:var(--muted);font-size:16px}
.pv-reset{justify-self:start;padding:8px 16px;border:0;border-radius:999px;background:var(--bg);color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
.pv-reset:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
@media(max-width:767px){.pv{grid-template-columns:minmax(0,1fr)}.pv-ph{width:88px;height:68px}}
@media(prefers-reduced-motion:reduce){.pv-opt{transition:none}}`,
  html:`<div class="stage"><section class="pv" aria-labelledby="pv-h">
  <div class="pv-main">
    <h2 id="pv-h">בחרו מה לכלול בתכנון</h2>
    <ul class="pv-opts">
      <li><button class="pv-opt has" type="button" data-v="1800" data-c="1" data-n="תכנון תאורה">
        <span class="pv-ph"><img src="../assets/media/real/s13/proj-b.webp" alt="" width="1200" height="1600" loading="lazy" decoding="async"><span class="pv-cnt" aria-hidden="true">1</span></span>
        <span class="pv-name">תכנון תאורה</span><span class="pv-price">₪1,800</span></button></li>
      <li><button class="pv-opt has" type="button" data-v="2400" data-c="1" data-n="הדמיות תלת ממד">
        <span class="pv-ph"><img src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" loading="lazy" decoding="async"><span class="pv-cnt" aria-hidden="true">1</span></span>
        <span class="pv-name">הדמיות תלת ממד</span><span class="pv-price">₪2,400</span></button></li>
      <li><button class="pv-opt" type="button" data-v="3200" data-c="0" data-n="ליווי בבחירת ריהוט">
        <span class="pv-ph"><img src="../assets/media/real/s13/room.webp" alt="" width="2200" height="1469" loading="lazy" decoding="async"><span class="pv-cnt" aria-hidden="true"></span></span>
        <span class="pv-name">ליווי בבחירת ריהוט</span><span class="pv-price">₪3,200</span></button></li>
    </ul>
  </div>
  <div class="pv-panel">
    <p class="pv-lab">סך ההצעה</p>
    <p class="pv-total" aria-hidden="true" data-v="4200">₪4,200</p>
    <ul class="pv-stack" aria-hidden="true"><li>+2,400</li><li>+1,800</li></ul>
    <button class="pv-reset" type="button">איפוס</button>
    <p class="pv-live sr-only" role="status"></p>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".pv"),opts=[...root.querySelectorAll(".pv-opt")];
  const totalEl=root.querySelector(".pv-total"),stack=root.querySelector(".pv-stack"),live=root.querySelector(".pv-live"),reset=root.querySelector(".pv-reset");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)"),EASE="cubic-bezier(.2,.6,.2,1)",MAX=4;
  const fmt=n=>Math.round(n).toLocaleString("he-IL");
  const count=new Map(opts.map(o=>[o,parseInt(o.dataset.c,10)||0]));
  let total=parseInt(totalEl.dataset.v,10)||0,shown=total,raf=0,saidT=0;
  const paint=n=>{totalEl.textContent="₪"+fmt(n);};
  // התווית של הכפתור נושאת שם, מחיר וכמה נוספו, ומתעדכנת. המספר הצף והערימה מוסתרים מקורא מסך
  function label(b){
    const c=count.get(b),v=parseInt(b.dataset.v,10);
    b.classList.toggle("has",c>0);b.querySelector(".pv-cnt").textContent=c>0?String(c):"";
    b.setAttribute("aria-label",b.dataset.n+", "+fmt(v)+" שקלים"+(c>0?", נוספו "+c:""));
  }
  function tick(to){
    cancelAnimationFrame(raf);
    if(reduce.matches){shown=to;paint(to);return;}
    const from=shown,t0=performance.now(),dur=520;
    const step=t=>{const k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3);shown=from+(to-from)*e;paint(shown);if(k<1)raf=requestAnimationFrame(step);else shown=to;};
    raf=requestAnimationFrame(step);
    totalEl.animate([{transform:"scale(1)"},{transform:"scale(1.06)"},{transform:"scale(1)"}],{duration:320,easing:EASE});
  }
  // שורה חדשה בראש הערימה. הישנות יורדות ב-FLIP ידני: מודדים לפני ואחרי, ומריצים מההפרש לאפס
  function addLine(v){
    const li=document.createElement("li");li.textContent="+"+fmt(v);
    const old=[...stack.children],tops=old.map(e=>e.getBoundingClientRect().top);
    stack.prepend(li);
    while(stack.children.length>MAX)stack.lastElementChild.remove();
    if(reduce.matches)return;
    old.forEach((e,i)=>{if(!e.isConnected)return;const dy=tops[i]-e.getBoundingClientRect().top;if(dy)e.animate([{transform:"translateY("+dy+"px)"},{transform:"none"}],{duration:320,easing:EASE});});
    li.animate([{transform:"translateY(-10px) scale(1.5)",opacity:0},{transform:"none",opacity:1}],{duration:320,easing:EASE});
  }
  function pop(b,v){
    if(reduce.matches)return;
    const f=document.createElement("span");f.className="pv-float";f.setAttribute("aria-hidden","true");f.textContent="+"+fmt(v);b.appendChild(f);
    const a=f.animate([
      {transform:"translateY(8px) scale(.6)",opacity:0},
      {transform:"translateY(-16px) scale(1.15)",opacity:1,offset:.28},
      {transform:"translateY(-72px) scale(1)",opacity:0}
    ],{duration:900,easing:EASE,fill:"both"});
    a.onfinish=()=>f.remove();
  }
  // הסכום מוכרז רק אחרי שהלחיצות נרגעות, כדי שקורא מסך לא יקריא כל ערך בדרך
  function say(){clearTimeout(saidT);saidT=setTimeout(()=>{live.textContent="סך ההצעה "+fmt(total)+" שקלים";},400);}
  opts.forEach(b=>{
    label(b);
    b.addEventListener("click",()=>{
      const v=parseInt(b.dataset.v,10);
      count.set(b,count.get(b)+1);total+=v;
      label(b);pop(b,v);addLine(v);tick(total);say();
    });
  });
  reset.addEventListener("click",()=>{
    opts.forEach(b=>{count.set(b,0);label(b);});
    total=0;stack.textContent="";tick(0);say();
  });
})();`
},
{
  id:"b85", cat:"behavior", name:"כפתור שהופך לפס התקדמות ולאישור", tech:"GSAP width · CSS state roll · aria-live", status:"מאושר-עין",
  desc:"כפתור \"אישור ההצעה\" רחב. בלחיצה הוא מתכווץ לגלולה: התווית מתגלגלת למעלה ומוחלפת באייקון, במילה \"מאשרים\" ובאחוז שעולה, ופס דק בתוכה מתמלא. בסוף הגלולה מתכווצת עוד, הצבע מתהפך, וי מצטייר ועולה המילה \"אושרה\", והכרטיס ננעל.",
  when:"פעולה שיש לה אורך אמיתי: אישור הצעת מחיר או הזמנה, שליחת קבצים, תשלום, חתימה על מסמך. כשהכפתור הוא הרגע שהמבקר מחליט, והוא צריך לראות שמשהו קורה ושזה נגמר. לא כשהפעולה מיידית, ולא כשהאחוזים לא משקפים תהליך אמיתי.",
  note:"**שחזור.** השראה: שני סרטוני מוצר ב-prompt-motion.com (21.10.2026): כפתור הזמנה שהופך לגלולה עם אחוז עולה ופס דק, וכפתור אישור שמשנה צבע, מקבל וי ומילה ננעלת. נבנה מאפס מהצפייה. **שלושה מצבים בכפתור אחד** (`is-busy`, `is-done`, ובלי מחלקה זה המצב הרגיל). שלוש שכבות טקסט יושבות באותו תא בגריד, והמעבר ביניהן הוא גלילה אנכית של `transform` ו-`opacity` בלבד. הרוחב של כל מצב קבוע ב-CSS (רגיל, 260px, 184px), ו-GSAP מטווין את ה-`width` מהערך הנוכחי ליעד ב-`power3.inOut` ומנקה אחר כך, כי מעבר CSS על רוחב אסור במאגר. בלי GSAP הרוחב מתחלף מיד. הכפתור מעוגן לצד ההתחלה (ימין), ולכן הוא מתכווץ לתוך עצמו. **ההתקדמות** רצה 2.6 שניות בעקומה של פתיחה מהירה, אמצע איטי וסיום מהיר, כדי שתרגיש כמו עבודה אמיתית. הפס הוא `scaleX` בלבד. באתר אמיתי מחברים את האחוז להתקדמות אמיתית, או לא מציגים אחוז. **הצבע הסופי** הוא `--ink` עם טקסט `--bg` (אין טוקן ירוק, והמצב הנעול צריך להיראות שונה בכל עור). **נעילה:** הכפתור עובר ל-`aria-disabled` ולא ל-`disabled`, כך שהפוקוס נשאר עליו ושם הכפתור מתעדכן (`aria-label`: מאשרים, אושרה). מעל זה `aria-busy` בזמן ההתקדמות, אזור `role=\"status\"` שמכריז את שני השלבים, וכפתור \"להדגמה חוזרת\" שהוא `inert` עד האישור. בהפחתת תנועה אין גלילת טקסט, אין אחוז ואין פס: אחרי חצי שנייה המצב עובר ל\"אושרה\". **באתר משמאל לימין:** מחליפים את `transform-origin` של הפס ל-`0 50%`.",
  libs:["gsap"],
  css:`.ap{max-width:1040px;margin-inline:auto;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr);border-radius:28px;background:var(--card)}
.ap .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ap-ph{margin:0}
.ap-ph img{display:block;width:100%;height:auto;aspect-ratio:21 / 9;object-fit:cover}
@media(min-width:768px){
  .ap{grid-template-columns:minmax(0,6fr) minmax(0,5fr)}
  .ap-ph{position:relative;order:2}
  .ap-ph img{position:absolute;inset:0;height:100%;aspect-ratio:auto;object-position:58% 50%}
}
.ap-body{display:grid;gap:12px;padding:32px clamp(24px,4vw,48px) 40px}
.ap-eyebrow{margin:0;color:var(--muted);font-size:16px;font-weight:600}
.ap-body h2{margin:0;max-width:24ch;font-size:clamp(26px,3vw,40px);line-height:1.15;text-wrap:balance}
.ap-price{margin:0;font-size:clamp(34px,4vw,52px);font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}
.ap-note{margin:0;max-width:52ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ap-act{display:grid;justify-items:start;gap:16px;padding-top:12px}
.ap-btn{position:relative;overflow:hidden;display:grid;place-items:center;width:100%;max-width:360px;height:64px;padding:0;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:20px;font-weight:600;cursor:pointer;transition:background-color .4s cubic-bezier(.2,.6,.2,1),color .4s cubic-bezier(.2,.6,.2,1)}
.ap-btn:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.ap-btn.is-busy{width:260px;cursor:progress}
.ap-btn.is-done{width:184px;background:var(--ink);color:var(--bg);cursor:default}
.ap-s{grid-area:1/1;display:flex;align-items:center;justify-content:center;gap:12px;white-space:nowrap;transition:transform .35s cubic-bezier(.2,.6,.2,1),opacity .25s cubic-bezier(.2,.6,.2,1)}
.ap-s2,.ap-s3{opacity:0;transform:translateY(60%)}
.ap-btn.is-busy .ap-s1,.ap-btn.is-done .ap-s1,.ap-btn.is-done .ap-s2{opacity:0;transform:translateY(-60%)}
.ap-btn.is-busy .ap-s2,.ap-btn.is-done .ap-s3{opacity:1;transform:none}
.ap-s svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.ap-spin{animation:apSpin .9s linear infinite}
@keyframes apSpin{to{transform:rotate(360deg)}}
.ap-pct{min-width:3.2ch;font-variant-numeric:tabular-nums;text-align:end}
.ap-s3 path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .4s cubic-bezier(.2,.6,.2,1) .25s}
.ap-btn.is-done .ap-s3 path{stroke-dashoffset:0}
.ap-bar{position:absolute;inset-inline:28px;bottom:10px;height:4px;overflow:hidden;border-radius:2px;background:color-mix(in oklab,var(--accent-ink) 28%,transparent);opacity:0;transition:opacity .25s cubic-bezier(.2,.6,.2,1)}
.ap-bar i{display:block;height:100%;background:var(--accent-ink);transform:scaleX(0);transform-origin:100% 50%}
.ap-btn.is-busy .ap-bar{opacity:1}
.ap-ok{margin:0;min-height:1.5em;color:var(--muted);font-size:16px;visibility:hidden}
.ap.is-locked .ap-ok{visibility:visible}
.ap.is-locked .ap-price,.ap.is-locked .ap-note{opacity:.55}
.ap-reset{padding:8px 16px;border:0;border-radius:999px;background:var(--bg);color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
.ap-reset:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
@media(prefers-reduced-motion:reduce){.ap-btn,.ap-s,.ap-bar,.ap-s3 path{transition:none}.ap-spin{animation:none}}`,
  html:`<div class="stage"><section class="ap" aria-labelledby="ap-h">
  <figure class="ap-ph"><img src="../assets/media/real/s13/proj-c.webp" alt="מטבח כהה עם אי ארוך ותאורה תלויה" width="2400" height="1026" loading="lazy" decoding="async"></figure>
  <div class="ap-body">
    <p class="ap-eyebrow">הצעת מחיר 1053</p>
    <h2 id="ap-h">שיפוץ מטבח בארבעה עשר ימי עבודה</h2>
    <p class="ap-price">₪48,600</p>
    <p class="ap-note">כולל תכנון, ארונות, שיש והתקנה. ההצעה תקפה עד סוף החודש.</p>
    <div class="ap-act">
      <button class="ap-btn" type="button">
        <span class="ap-s ap-s1">אישור ההצעה</span>
        <span class="ap-s ap-s2" aria-hidden="true"><svg class="ap-spin" viewBox="0 0 24 24" focusable="false"><path d="M12 3a9 9 0 1 1-9 9"/></svg><span>מאשרים</span><b class="ap-pct">0%</b></span>
        <span class="ap-s ap-s3" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg><span>אושרה</span></span>
        <span class="ap-bar" aria-hidden="true"><i></i></span>
      </button>
      <p class="ap-ok">ההצעה אושרה. הודעת אישור נשלחה אליכם במייל.</p>
      <button class="ap-reset" type="button" inert>להדגמה חוזרת</button>
    </div>
    <p class="ap-live sr-only" role="status"></p>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".ap"),q=s=>root.querySelector(s);
  const btn=q(".ap-btn"),s1=q(".ap-s1"),pct=q(".ap-pct"),bar=q(".ap-bar i"),reset=q(".ap-reset"),live=q(".ap-live");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  let state="idle",raf=0,timer=0;
  const canTween=()=>typeof gsap!=="undefined"&&!reduce.matches;
  // המצב קובע מחלקות. הרוחב של כל מצב ב-CSS, ו-GSAP רק מטווין אליו מהערך הנוכחי (מעבר CSS על רוחב אסור במאגר)
  function go(s){
    const from=btn.offsetWidth;
    state=s;
    btn.classList.toggle("is-busy",s==="busy");btn.classList.toggle("is-done",s==="done");
    root.classList.toggle("is-locked",s==="done");
    btn.setAttribute("aria-disabled",s==="idle"?"false":"true");
    if(s==="busy")btn.setAttribute("aria-busy","true");else btn.removeAttribute("aria-busy");
    // שם הכפתור מתעדכן עם המצב: שכבת הטקסט הרגילה מוסתרת כשהיא לא פעילה
    if(s==="idle")btn.removeAttribute("aria-label");else btn.setAttribute("aria-label",s==="busy"?"מאשרים את ההצעה":"ההצעה אושרה");
    s1.setAttribute("aria-hidden",String(s!=="idle"));
    reset.inert=s!=="done";
    const to=btn.offsetWidth;
    if(canTween()&&from!==to)gsap.fromTo(btn,{width:from},{width:to,duration:.55,ease:"power3.inOut",clearProps:"width"});
  }
  function finish(){go("done");live.textContent="ההצעה אושרה";}
  // עקומה של פתיחה מהירה, אמצע איטי וסיום מהיר, כדי שזה ירגיש כמו עבודה אמיתית
  const curve=k=>k<.45?k/.45*.42:k<.8?.42+(k-.45)/.35*.3:.72+(k-.8)/.2*.28;
  btn.addEventListener("click",()=>{
    if(state!=="idle")return;
    live.textContent="מאשרים את ההצעה";
    go("busy");
    if(reduce.matches){pct.hidden=true;timer=setTimeout(finish,500);return;}
    const t0=performance.now(),dur=2600;
    const step=t=>{
      const k=Math.min((t-t0)/dur,1),p=curve(k);
      pct.textContent=Math.round(p*100)+"%";bar.style.transform="scaleX("+p+")";
      if(k<1)raf=requestAnimationFrame(step);else timer=setTimeout(finish,260);
    };
    raf=requestAnimationFrame(step);
  });
  reset.addEventListener("click",()=>{
    cancelAnimationFrame(raf);clearTimeout(timer);
    go("idle");pct.hidden=false;pct.textContent="0%";bar.style.transform="";live.textContent="";
    btn.focus({preventScroll:true});
  });
})();`
},
{
  id:"b86", cat:"behavior", name:"טבעת פינג בנקודת הלחיצה", tech:"CSS animation · pointer position · vanilla JS", status:"מאושר-עין",
  desc:"בכל לחיצה על כפתור יוצאת טבעת דקה בדיוק מהנקודה שנלחצה, מתרחבת מעבר לכפתור ודועכת, והכפתור נלחץ פנימה קצת. בלחיצה במקלדת הטבעת יוצאת מהמרכז. שלושה כפתורים בגדלים וצבעים שונים, והטבעת נראית על כל אחד מהם.",
  when:"כפתורי הקריאה לפעולה הראשיים: קביעת שיחה, שליחה, הזמנה. נותן לכל לחיצה תחושה של משהו שהגיב, בלי להסתיר את הכפתור. לא על כל כפתור בעמוד, ולא על כפתור שמעביר מיד לעמוד אחר.",
  note:"**שחזור.** השראה: שני סרטוני מוצר ב-prompt-motion.com (21.10.2026) שבהם סמן נוחת על כפתור וטבעת דקה מתרחבת ודועכת מנקודת הלחיצה בזמן שהכפתור נלחץ פנימה. נבנה מאפס מהצפייה. **המנגנון:** ב-`pointerdown` נשמרים מיקום הלחיצה (`--px`, `--py`, בפיקסלים מתוך הכפתור) ומוסיפים `is-ping`, והטבעת היא `::after` שמונפש ב-CSS בלבד (`scale` מ-0 ל-3.2 ו-`opacity` מ-.8 ל-0, 700ms). לפני כל לחיצה מורידים את המחלקה ומכריחים חישוב מחדש כדי שלחיצה מהירה תתחיל טבעת חדשה, ובסוף האנימציה המחלקה יורדת. **הטבעת נראית על כל רקע:** היא טבעת כפולה, חיצונית בצבע `--accent` ופנימית בצבע שמוגדר לכפתור (`--ring-in`), כך שגם על כפתור בצבע המותג וגם על כפתור כהה אחת משתיים נראית. **לחיצת מקלדת** (Enter או רווח) מגיעה כ-`click` בלי מיקום, והטבעת יוצאת מהמרכז. **הלחיצה פנימה** היא `:active` עם `scale` .97. **הפחתת תנועה:** בלי טבעת. הבדיקה היא ברגע הלחיצה, ולכן היא מגיבה גם לשינוי הגדרה באמצע. **גלישה:** המעטפת היא `overflow:clip`, כדי שהטבעת לא תרחיב את העמוד לרוחב בטלפון. **כפתור אמיתי:** `<button>` (או `<a>` שמוסיפים לו `data-ping`), עם `focus-visible`. **בפרויקט:** מוסיפים `data-ping` לכל קריאה לפעולה, וקובעים `--ring-in` לפי הרקע של הכפתור.",
  libs:[],
  css:`.pg{max-width:960px;margin-inline:auto;display:grid;justify-items:center;gap:24px;padding:clamp(48px,7vw,96px) clamp(24px,5vw,64px);overflow:clip;border-radius:32px;background:var(--card);text-align:center}
.pg h2{margin:0;max-width:20ch;font-size:clamp(30px,4vw,56px);line-height:1.12;text-wrap:balance}
.pg-p{margin:0;max-width:44ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pg-row{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;width:100%}
.pg-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:68px;padding:0 40px;border:0;border-radius:999px;font:inherit;font-size:22px;font-weight:600;cursor:pointer;transition:transform .16s cubic-bezier(.2,.6,.2,1)}
.pg-btn:active{transform:scale(.97)}
.pg-btn:focus-visible{outline:3px solid var(--ink);outline-offset:4px}
.pg-main{background:var(--accent);color:var(--accent-ink);--ring-in:var(--accent-ink)}
.pg-alt{background:var(--bg);color:var(--ink);--ring-in:transparent}
.pg-ink{background:var(--ink);color:var(--bg);--ring-in:var(--bg)}
/* טבעת כפולה: חיצונית בצבע המותג, פנימית בצבע שנראה על הכפתור עצמו. מקום הלחיצה מגיע מ---px ו---py */
.pg-btn::after{content:"";position:absolute;left:var(--px,50%);top:var(--py,50%);width:72px;height:72px;box-sizing:border-box;border:3px solid var(--accent);border-radius:50%;box-shadow:inset 0 0 0 2px var(--ring-in,transparent);opacity:0;pointer-events:none;transform:translate(-50%,-50%) scale(0)}
.pg-btn.is-ping::after{animation:pgRing .7s cubic-bezier(.2,.6,.2,1) both}
@keyframes pgRing{from{opacity:.8;transform:translate(-50%,-50%) scale(0)}to{opacity:0;transform:translate(-50%,-50%) scale(3.2)}}
@media(max-width:767px){.pg-btn{width:100%}}
@media(prefers-reduced-motion:reduce){.pg-btn{transition:none}.pg-btn::after{display:none}}`,
  html:`<div class="stage"><section class="pg" aria-labelledby="pg-h">
  <h2 id="pg-h">נקבע שיחה על האתר שלכם</h2>
  <p class="pg-p">שיחה של עשרים דקות, בטלפון או בזום, בלי התחייבות.</p>
  <div class="pg-row">
    <button class="pg-btn pg-main" type="button" data-ping>קביעת שיחה</button>
    <button class="pg-btn pg-alt" type="button" data-ping>הודעה בוואטסאפ</button>
    <button class="pg-btn pg-ink" type="button" data-ping>התקשרו אליי</button>
  </div>
</section></div>`,
  js:`(function(){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-ping]").forEach(b=>{
    // הטבעת מתחילה מנקודת הלחיצה. מורידים ומחזירים את המחלקה, כדי שלחיצה מהירה תתחיל טבעת חדשה
    const ping=(x,y)=>{
      if(reduce.matches)return;
      b.style.setProperty("--px",x+"px");b.style.setProperty("--py",y+"px");
      b.classList.remove("is-ping");void b.offsetWidth;b.classList.add("is-ping");
    };
    b.addEventListener("pointerdown",e=>{
      if(e.pointerType==="mouse"&&e.button!==0)return;
      const r=b.getBoundingClientRect();ping(e.clientX-r.left,e.clientY-r.top);
    });
    // Enter או רווח מגיעים כ-click בלי מיקום: הטבעת יוצאת מהמרכז
    b.addEventListener("click",e=>{if(e.detail===0)ping(b.offsetWidth/2,b.offsetHeight/2);});
    b.addEventListener("animationend",e=>{if(e.animationName==="pgRing")b.classList.remove("is-ping");});
  });
})();`
}
];
