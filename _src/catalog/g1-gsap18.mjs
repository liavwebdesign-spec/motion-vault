// סבב עשירי, חלק ב (3.9.2026): GSAP בלבד, הכל מונע גלילה.
export default [
{
  id:"g68", cat:"gsap", name:"סקשנים שדוחפים זה את זה בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"כל סקשן עולה מלמטה ומכסה את הקודם, בזמן שהקודם נסוג לאחור ומתעמעם. לא גלילה של רשימה אלא חפיסה של מסכים שמתחלפים.",
  when:"עמוד עם שלושה עד חמישה פרקים שווי משקל: שירותים, יתרונות, שלבים, ערכים. הופך עמוד ארוך לרצף קצר שמרגיש מכוון.",
  libs:["gsap","ScrollTrigger"],
  css:`.pu-sec{position:sticky;top:0;height:100vh;display:grid;place-items:center;text-align:center;
  padding:0 var(--gutter);color:#fff;will-change:transform;overflow:hidden}
.pu-sec .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.pu-in{position:relative;z-index:1;max-width:44ch}
.pu-sec h3{margin:0;font-size:clamp(28px,4.8vw,64px);line-height:1.12;text-shadow:0 3px 24px rgba(0,0,0,.35)}
.pu-sec p{margin:14px 0 0;font-size:17px;line-height:1.8;opacity:.9;text-shadow:0 2px 16px rgba(0,0,0,.4)}
.pu-veil{position:absolute;inset:0;background:#0b0c14;opacity:0;pointer-events:none;z-index:2}`,
  html:`<div class="pu">
  <section class="pu-sec"><div class="ph ph-a"></div><div class="pu-in"><h3>אפיון לפני עיצוב</h3>
    <p>השלב שקובע אם האתר יביא פניות או רק ייראה טוב.</p></div><div class="pu-veil"></div></section>
  <section class="pu-sec"><div class="ph ph-c"></div><div class="pu-in"><h3>קופי שמדבר אל הלקוח</h3>
    <p>כל כותרת עונה על שאלה אמיתית של מי שנחת בעמוד.</p></div><div class="pu-veil"></div></section>
  <section class="pu-sec"><div class="ph ph-d"></div><div class="pu-in"><h3>עיצוב בשפה אחת</h3>
    <p>מערכת אחת של צבע, טיפוגרפיה וריווח שחוזרת בכל עמוד.</p></div><div class="pu-veil"></div></section>
  <section class="pu-sec"><div class="ph ph-e"></div><div class="pu-in"><h3>מדידה מהיום הראשון</h3>
    <p>מחברים מעקב לפני העלייה לאוויר, ולא חודש אחרי.</p></div><div class="pu-veil"></div></section>
</div>`,
  js:`(function(){
  const secs=gsap.utils.toArray(".pu-sec");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  secs.forEach((sec,i)=>{
    if(i===secs.length-1)return;
    // הסקשן הנוכחי נסוג ומתכהה בזמן שהבא אחריו עולה מעליו
    gsap.timeline({scrollTrigger:{trigger:secs[i+1],start:"top bottom",end:"top top",scrub:.5}})
      .fromTo(sec,{scale:1,y:0},{scale:.9,y:-40,ease:"none"},0)
      .fromTo(sec.querySelector(".pu-veil"),{opacity:0},{opacity:.55,ease:"none"},0);
  });
})();`,
  runway:false,
  note:"אין כאן pin ואין spacer: כל סקשן הוא `position:sticky` בגובה מסך, וזה לבדו מייצר את ההיצמדות והכיסוי. מה ש-GSAP מוסיף הוא רק הנסיגה של הסקשן היוצא, וזה מה שהופך כיסוי שטוח לתחושת עומק. **הטריגר הוא הסקשן הבא ולא הנוכחי**: הטווח מתחיל כשהבא נוגע בתחתית המסך ומסתיים כשהוא מגיע לראשו, כלומר בדיוק משך הכיסוי. הסקשן האחרון לא נסוג, אחרת סוף העמוד נראה שבור."
},
{
  id:"g69", cat:"gsap", name:"חשיפת פיקסלים בגלילה", tech:"GSAP · ScrollTrigger · stagger", status:"ממתין",
  desc:"רשת ריבועים שמכסה את התמונה ונעלמת בגלילה בסדר אקראי, כמו תמונה שנטענת בחיבור איטי. התמונה מתגלה חתיכה אחרי חתיכה.",
  when:"חשיפת מוצר, פתיחת סקשן עבודות, מעבר בין פרקים. אפקט חשיפה שמרגיש דיגיטלי ולא קולנועי, ומתאים למותגי טק ומוצר.",
  libs:["gsap","ScrollTrigger"],
  css:`.px{height:280vh;position:relative}
.px-stage{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.px-frame{position:relative;width:min(880px,92vw);aspect-ratio:16/10;border-radius:18px;overflow:hidden}
.px-img{position:absolute;inset:0;border-radius:0;font-size:0}
.px-grid{position:absolute;inset:0;display:grid}
.px-cell{background:var(--bg);will-change:opacity}
.px-cap{position:absolute;bottom:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}`,
  html:`<div class="px"><div class="px-stage">
  <div class="px-frame">
    <div class="ph px-img ph-c"></div>
    <div class="px-grid"></div>
  </div>
  <p class="px-cap">גלול. הריבועים נעלמים בסדר אקראי.</p>
</div></div>`,
  js:`(function(){
  const COLS=14, ROWS=9;
  const grid=document.querySelector(".px-grid");
  grid.style.gridTemplateColumns="repeat("+COLS+",1fr)";
  grid.style.gridTemplateRows="repeat("+ROWS+",1fr)";
  const cells=[];
  for(let i=0;i<COLS*ROWS;i++){
    const d=document.createElement("div");d.className="px-cell";grid.appendChild(d);cells.push(d);
  }
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(cells,{opacity:0});return;}
  gsap.to(cells,{opacity:0,ease:"none",
    // stagger אקראי עם from:"random" הוא מה שמונע תחושת מחיקה מסודרת
    stagger:{each:.012,from:"random"},
    scrollTrigger:{trigger:".px",start:"top top",end:"bottom bottom",scrub:.4}});
})();`,
  runway:false,
  note:"הרשת נבנית ב-JS ולא ב-HTML, כי מאה עשרים ושישה ריבועים בקוד הם קובץ בלתי קריא, ובגלל שמספר העמודות והשורות הוא מספר אחד שאפשר לכייל. `from:\"random\"` הוא ההבדל בין חשיפה שמרגישה כמו טעינה לבין מחיקה שמרגישה כמו מגב. הריבועים בצבע הרקע ולא שקופים, ולכן זה עובד מעל כל תמונה. שים לב ש-`each` קטן מאוד: עם מאה ועשרים ריבועים גם שתי מאיות שנייה מצטברות לזמן ארוך, וה-scrub פורש את הכל על מסלול הגלילה ממילא."
},
{
  id:"g70", cat:"gsap", name:"כותרת שמתכווצת ומתעגנת לפינה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"כותרת פרק במרכז המסך שמתכווצת בגלילה, נעה לפינה העליונה והופכת לתווית קטנה שמלווה את התוכן. בגלילה אחורה היא חוזרת להיות כותרת.",
  when:"עמוד ארוך עם פרקים, מדריך, תיק עבודות לפי קטגוריות, מסמך תנאים. המבקר תמיד יודע באיזה פרק הוא נמצא בלי תפריט צף נוסף.",
  libs:["gsap","ScrollTrigger"],
  css:`.dk{position:relative}
.dk-stage{position:sticky;top:0;height:100vh;pointer-events:none;z-index:5}
/* העוגן הוא הפינה הימנית העליונה, ונקודת הקנה מידה שם, כך שההתכווצות מושכת אליה */
.dk-title{position:absolute;top:26px;right:24px;margin:0;white-space:nowrap;
  font-size:clamp(30px,6vw,84px);font-weight:800;line-height:1;color:var(--ink);
  transform-origin:100% 0%;will-change:transform}
/* המרווח יושב על התוכן ולא על הפרק: ריפוד של האב אינו חלק מתיבת התוכן שלו,
   ו-sticky נעצר בגבול תיבת התוכן. מרווח על האב היה מקצר את אזור ההיצמדות. */
.dk-body{margin-top:-100vh;padding:100vh var(--gutter) 60vh;max-width:min(760px,92vw);margin-inline:auto}
.dk-body p{font-size:17px;line-height:1.9;color:var(--muted);margin:0 0 22px}
.dk-body h4{font-size:clamp(20px,2.4vw,30px);margin:40px 0 12px}`,
  html:`<div class="dk">
  <div class="dk-stage"><h3 class="dk-title">אפיון</h3></div>
  <div class="dk-body">
    <h4>מה קורה בשלב הזה</h4>
    <p>מתחילים בהבנה של העסק ושל הלקוח, ורק אחר כך פותחים כלי עיצוב. זה השלב שקובע אם האתר יביא פניות או רק ייראה טוב, והוא גם השלב שהכי קל לוותר עליו כשממהרים.</p>
    <p>בפועל זו שיחה אחת ממוקדת: מי הלקוח, מה הוא מחפש, מה עוצר אותו מלפנות, ומה הפעולה היחידה שאנחנו רוצים שיעשה. התשובות האלה קובעות את סדר הסקשנים באתר.</p>
    <h4>מה יוצא מזה</h4>
    <p>מסמך קצר עם מפת עמודים, המסרים המרכזיים והקריאה לפעולה. לא מסמך לארכיון אלא מסמך שכותבים לפיו.</p>
    <p>גלול והכותרת למעלה תתכווץ לתווית. גלול חזרה והיא תחזור להיות כותרת מלאה.</p>
  </div>
</div>`,
  js:`(function(){
  const title=document.querySelector(".dk-title");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  // בלי שום מדידה: שני מצבים מוגדרים במלואם, ו-GSAP עושה אינטרפולציה בין אחוזים לפיקסלים.
  // מצב א: הקצה הימני במרכז המסך ואז דחיפה של חצי רוחב, כלומר מרכוז מדויק.
  // מצב ב: העוגן בפינה, ונקודת הקנה מידה שם, ולכן ההתכווצות מושכת אל הפינה.
  gsap.fromTo(title,
    {top:"50%",right:"50%",xPercent:50,yPercent:-50,scale:1},
    {top:"26px",right:"24px",xPercent:0,yPercent:0,scale:.34,ease:"none",
     scrollTrigger:{trigger:".dk",start:"top top",end:"+=70%",scrub:.5,invalidateOnRefresh:true}});
})();`,
  runway:false,
  note:"אין כאן שום מדידה בזמן ריצה: שני המצבים מוגדרים במלואם, ו-GSAP עושה אינטרפולציה בין אחוזים לפיקסלים. המרכוז מושג בשילוב `right:50%` עם `xPercent:50`, כלומר הקצה הימני במרכז ואז דחיפה של חצי רוחב. **הניסיון הראשון כאן נכשל**: מדדתי בזמן ריצה את המרחק אל המרכז, אבל המדידה נעשית על אלמנט שכבר נושא טרנספורם, ולכן היא מזינה את עצמה והכותרת ברחה מהמסך. העיגון עובד כי `transform-origin` נמצא בקצה שאליו הכותרת נוסעת: בעברית זה `100% 0%`, כלומר הפינה הימנית העליונה, ולכן ההתכווצות מושכת אותה ימינה במקום להשאיר אותה תלויה באוויר. הכותרת יושבת בשכבה `sticky` נפרדת עם `pointer-events:none`, והתוכן נמשך מעליה ב-`margin-top:-100vh`, כך שהיא מרחפת מעל הטקסט בלי לחסום לחיצות. הטווח מוגדר כ-`+=70%` של גובה המסך ולא כאחוז מגובה הפרק. **זו הייתה תקלה אמיתית כאן**: טווח שנגזר מגובה הפרק יצא ארוך יותר ממה שאפשר לגלול בפועל, ולכן שליש מהאנימציה מעולם לא הגיע לסופו והכותרת נתקעה באמצע הדרך. הכלל: אזור ההיצמדות חייב להיות ארוך מטווח האנימציה. **ומלכודת שנייה שנתפסה מיד אחריה**: ריפוד תחתון על אלמנט האב אינו חלק מתיבת התוכן שלו, ו-`position:sticky` נעצר בגבול תיבת התוכן. לכן המרווח שנועד להאריך את ההיצמדות דווקא קיצר אותה, והוא הועבר לתוכן עצמו."
},
{
  id:"g71", cat:"gsap", name:"שתי תמונות שמחליפות מקומות בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"שתי תמונות זו לצד זו שעוברות אחת מעל השנייה ומחליפות צדדים בגלילה, כשזו שעוברת מלפנים גדלה קלות.",
  when:"השוואה בין שתי אפשרויות, לפני ואחרי, שני קהלים, שני שירותים. מספר ויזואלית שיש כאן שתי אפשרויות שמתחלפות ביניהן.",
  libs:["gsap","ScrollTrigger"],
  css:`.sx{height:260vh;position:relative}
.sx-stage{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.sx-pair{position:relative;width:min(860px,92vw);aspect-ratio:16/9}
.sx-img{position:absolute;top:50%;width:52%;aspect-ratio:4/5;border-radius:18px;font-size:0;
  margin-top:-26%;will-change:transform;box-shadow:0 24px 60px rgba(20,20,40,.2)}
.sx-a{right:0;z-index:2}
.sx-b{left:0;z-index:1}
.sx-tag{position:absolute;bottom:-34px;inset-inline:0;text-align:center;font-size:14px;color:var(--muted)}
.sx-cap{position:absolute;bottom:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}`,
  html:`<div class="sx"><div class="sx-stage">
  <div class="sx-pair">
    <div class="ph sx-img sx-a ph-b"><span class="sx-tag">אפשרות א</span></div>
    <div class="ph sx-img sx-b ph-d"><span class="sx-tag">אפשרות ב</span></div>
  </div>
  <p class="sx-cap">גלול. השתיים מחליפות צדדים, וזו שמלפנים גדלה.</p>
</div></div>`,
  js:`(function(){
  const a=document.querySelector(".sx-a"),b=document.querySelector(".sx-b");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  const tl=gsap.timeline({scrollTrigger:{trigger:".sx",start:"top top",end:"bottom bottom",scrub:.6}});
  // התנועה באחוזים של האלמנט עצמו, ולכן היא מדויקת בכל רוחב מסך
  tl.fromTo(a,{xPercent:0,scale:1,zIndex:2},{xPercent:-92,scale:.86,ease:"power1.inOut"},0)
    .fromTo(b,{xPercent:0,scale:.86,zIndex:1},{xPercent:92,scale:1,ease:"power1.inOut"},0)
    // החלפת השכבות קורית באמצע הדרך, בדיוק כשהן חופפות
    .set(a,{zIndex:1},.5)
    .set(b,{zIndex:2},.5);
})();`,
  runway:false,
  note:"הפרט שקובע הוא רגע החלפת ה-`zIndex`: הוא חייב לקרות בדיוק כשהתמונות חופפות, כלומר באמצע ציר הזמן. מוקדם מדי או מאוחר מדי, והעין תופסת קפיצה של שכבה. ההחלפה נעשית ב-`set` על הטיימליין ולא ב-`onUpdate`, כי בטיימליין מסונכרן ב-scrub זה עובד גם בגלילה אחורה בלי קוד נוסף. הגודל משתנה יחד עם המעבר, וזה מה שמסביר לעין מי מלפנים בלי להסתמך רק על חפיפה."
},
{
  id:"g72", cat:"gsap", name:"סקשן שמתהפך בין שתי פאות בגלילה", tech:"GSAP · ScrollTrigger · rotateY", status:"ממתין",
  desc:"סקשן אחד עם שתי פאות, שמסתובב בגלילה על ציר אנכי ומגלה את הצד השני. אותו שטח מסך מספר שני דברים.",
  when:"שאלה ותשובה, בעיה ופתרון, לפני ואחרי, שתי חבילות. במקום שני סקשנים זה אחרי זה, אחד שמתהפך.",
  libs:["gsap","ScrollTrigger"],
  css:`.fl{height:250vh;position:relative}
.fl-stage{position:sticky;top:0;height:100vh;display:grid;place-items:center;perspective:1600px;padding:0 var(--gutter)}
.fl-card{position:relative;width:min(880px,92vw);aspect-ratio:16/10;transform-style:preserve-3d;will-change:transform}
.fl-face{position:absolute;inset:0;border-radius:22px;backface-visibility:hidden;overflow:hidden;
  display:grid;place-items:center;text-align:center;padding:clamp(20px,4vw,50px);color:#fff}
.fl-face h3{margin:0;font-size:clamp(24px,3.6vw,48px);line-height:1.14;max-width:20ch}
.fl-face p{margin:14px 0 0;font-size:17px;line-height:1.8;max-width:40ch;opacity:.9}
.fl-face .ph{position:absolute;inset:0;border-radius:0;font-size:0;z-index:-1}
.fl-back{transform:rotateY(180deg)}
.fl-cap{position:absolute;bottom:7vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}`,
  html:`<div class="fl"><div class="fl-stage">
  <div class="fl-card">
    <div class="fl-face fl-front"><div class="ph ph-f"></div>
      <div><h3>רוב האתרים נראים טוב ולא מביאים כלום</h3>
      <p>כי מישהו התחיל לעצב לפני שהיה ברור מה המסר ומי הקהל.</p></div></div>
    <div class="fl-face fl-back"><div class="ph ph-d"></div>
      <div><h3>אנחנו הופכים את הסדר</h3>
      <p>קודם מבינים את העסק ואת הלקוח, אחר כך כותבים, ורק בסוף מעצבים.</p></div></div>
  </div>
  <p class="fl-cap">גלול. הסקשן מתהפך ומגלה את הצד השני.</p>
</div></div>`,
  js:`(function(){
  const card=document.querySelector(".fl-card");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  gsap.timeline({scrollTrigger:{trigger:".fl",start:"top top",end:"bottom bottom",scrub:.6}})
    // משך מפורש לשניהם, אחרת ההיפוך נגמר בחצי הדרך והשאר ריק
    .fromTo(card,{rotateY:0},{rotateY:180,duration:1,ease:"none"},0)
    // התכווצות קלה באמצע ההיפוך: בלעדיה הקלף נראה שטוח בדיוק ברגע שהוא הכי דק
    .fromTo(card,{scale:1},{scale:.9,ease:"none",yoyo:true,repeat:1,duration:.5},0);
})();`,
  runway:false,
  note:"שלושה תנאים הכרחיים: `transform-style:preserve-3d` על הקלף, `backface-visibility:hidden` על שתי הפאות, והפאה האחורית מסובבת מראש ב-180 מעלות. אם אחד מהם חסר רואים את שתי הפאות יחד או טקסט הפוך. ה-`perspective` יושב על הבמה ולא על הקלף, אחרת הסיבוב נראה שטוח. ההתכווצות באמצע היא מה שמוכר את התלת-ממד: בזווית של תשעים מעלות הקלף דק כמו קו, ובלי שינוי גודל המוח קורא את הרגע הזה כהיעלמות ולא כסיבוב. בעמוד עברי כדאי לסובב לכיוון החיובי, כך שההיפוך מרגיש כמו הפיכת דף בספר עברי."
},
];
