// גל המקורות של ליאב (2.9.2026): axionmediacompany, beetobee, navbar.gallery, 21st.dev, minimal-goods.
// נלקחו רק דפוסים רב-שימושיים שחסרו במאגר.
export default [
{
  id:"b37", cat:"behavior", name:"כרטיסים שנערמים בגלילה", tech:"CSS sticky · GSAP", status:"ממתין",
  desc:"כל כרטיס נעצר בראש המסך והבא אחריו מטפס מעליו, בזמן שהקודם מתכווץ מעט ומתעמעם. נוצרת ערימה במקום רשימה ארוכה.",
  when:"שירותים, חבילות, יתרונות, שלבי עבודה. מכווץ ארבעה סקשנים לאורך של אחד, ועובד מצוין גם במובייל.",
  libs:["gsap","ScrollTrigger"],
  css:`.stk{padding-inline:var(--gutter);padding-block:clamp(30px,4vw,60px)}
.stk-card{position:sticky;border-radius:22px;padding:clamp(26px,3.4vw,54px);min-height:clamp(320px,42vh,440px);
  display:flex;flex-direction:column;justify-content:space-between;color:#fff;transform-origin:50% 0%;
  box-shadow:0 -14px 44px rgba(0,0,0,.16);margin-bottom:clamp(18px,2.4vw,40px);
  will-change:transform,filter}
.stk-card:nth-child(1){top:clamp(70px,13vh,120px);background:#16182b}
.stk-card:nth-child(2){top:calc(clamp(70px,13vh,120px) + 18px);background:#4a3aff}
.stk-card:nth-child(3){top:calc(clamp(70px,13vh,120px) + 36px);background:#0b7285}
.stk-card:nth-child(4){top:calc(clamp(70px,13vh,120px) + 54px);background:#c2255c}
.stk-num{font-size:13px;letter-spacing:.16em;opacity:.7}
.stk-card h3{font-size:clamp(26px,3.4vw,52px);margin:14px 0 10px;font-weight:800;max-width:20ch}
.stk-card p{margin:0;max-width:52ch;font-size:clamp(15px,1.4vw,18px);line-height:1.6;opacity:.86}
.stk-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:26px;font-size:14px;opacity:.85}
.stk-tag{border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:6px 14px}
.stk-end{height:30vh}`,
  html:`<div class="stk">
  <article class="stk-card"><div><span class="stk-num">01</span><h3>אפיון ואסטרטגיה</h3><p>מבינים את העסק, את הלקוח ואת מה שצריך לקרות באתר לפני שנוגעים בעיצוב.</p></div>
    <div class="stk-foot"><span class="stk-tag">שבוע</span><span>כלול בכל חבילה</span></div></article>
  <article class="stk-card"><div><span class="stk-num">02</span><h3>עיצוב שמותאם למותג</h3><p>סקיצה של עמוד הבית לאישור, ואחריה שאר העמודים באותה שפה עיצובית.</p></div>
    <div class="stk-foot"><span class="stk-tag">שבוע עד שבועיים</span><span>כולל שני סבבי תיקונים</span></div></article>
  <article class="stk-card"><div><span class="stk-num">03</span><h3>בנייה ובדיקות</h3><p>מרכיבים, בודקים בכל רוחב מסך, מחברים טפסים ומדידה, ומוודאים מהירות טעינה.</p></div>
    <div class="stk-foot"><span class="stk-tag">שבועיים</span><span>כולל התאמה למובייל</span></div></article>
  <article class="stk-card"><div><span class="stk-num">04</span><h3>עלייה לאוויר וליווי</h3><p>מפרסמים, מוודאים שהפניות מגיעות, ומלווים חודש נוסף אחרי ההשקה.</p></div>
    <div class="stk-foot"><span class="stk-tag">יום</span><span>חודש ליווי כלול</span></div></article>
  <div class="stk-end"></div>
</div>`,
  js:`(function(){
  const cards=gsap.utils.toArray(".stk-card");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  cards.forEach((card,i)=>{
    if(i===cards.length-1)return;
    // הכרטיס נסוג לאחור בדיוק בזמן שהבא אחריו מטפס מעליו.
    // ההחשכה היא filter ולא opacity: כרטיס חצי שקוף מראה דרכו את הצבע של הכרטיס
    // שמתחתיו, והערימה יוצאת עכורה במקום להיראות כמו שכבות אטומות.
    gsap.to(card,{scale:.955,filter:"brightness(.62)",ease:"none",
      scrollTrigger:{trigger:cards[i+1],start:"top 82%",end:"top 26%",scrub:true}});
  });
})();`,
  runway:false,
  note:"הערימה עצמה היא CSS טהור: position:sticky עם top שגדל בכמה פיקסלים לכל כרטיס, כך שנשארת מדרגה שמראה שיש עוד מתחת. ה-GSAP רק מוסיף את הכיווץ וההתעמעמות. transform-origin חייב להיות בראש הכרטיס, אחרת הכיווץ מזיז אותו כלפי מטה ונוצר רעד. **והנסיגה היא החשכה ולא שקיפות**: כרטיס חצי שקוף מראה דרכו את הצבע של הכרטיס שמתחתיו, והערימה יוצאת עכורה במקום להיראות כמו שכבות אטומות. תחת prefers-reduced-motion הערימה נשארת בלי הכיווץ."
},
{
  id:"b38", cat:"behavior", name:"הדר שמתחבא בגלילה וחוזר", tech:"JS · CSS transform", status:"ממתין",
  desc:"בגלילה למטה ההדר מחליק החוצה ומפנה מסך, ובגלילה קלה למעלה הוא חוזר מיד. בראש העמוד הוא שקוף ומתמלא ברקע ברגע שיוצאים מהירו. כאן הוא רץ בתוך מסגרת גלילה עצמאית, כדי שאפשר יהיה לשפוט אותו בלי ההדר של המאגר מעליו.",
  when:"כל אתר. זו התנהגות ההדר הנפוצה ביותר, והיא פותרת את הקונפליקט בין ניווט תמיד זמין לבין מסך נקי לתוכן.",
  libs:[],
  css:`.hd-frame{position:relative;height:clamp(420px,76vh,640px);overflow-y:auto;overscroll-behavior:contain;
  border:1px solid var(--line);border-radius:var(--r);margin-inline:var(--gutter);background:var(--bg)}
.hd-frame::-webkit-scrollbar{width:8px}
.hd-frame::-webkit-scrollbar-thumb{background:#c9cbdb;border-radius:99px}
.hd-hint{text-align:center;color:var(--muted);font-size:14px;margin:14px 0 0}
/* sticky ולא fixed, כי כאן ההקשר הוא המסגרת. באתר אמיתי זה position:fixed על החלון. */
.hd-bar{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:16px clamp(16px,3vw,30px);
  transition:transform .42s cubic-bezier(.2,.8,.2,1),background-color .35s,padding .35s,box-shadow .35s;
  background:transparent}
.hd-bar.solid{background:rgba(247,247,250,.9);backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--line);padding-block:11px}
.hd-bar.up{transform:translateY(-105%)}
.hd-bar nav{display:flex;gap:6px;flex-wrap:wrap}
.hd-bar nav a{color:var(--ink);text-decoration:none;font-size:15px;padding:8px 14px;border-radius:999px;transition:background .25s}
.hd-bar nav a:hover{background:#eceaff}
.hd-cta{background:var(--ink);color:#fff!important;font-weight:600}
.hd-hero{min-height:100%;margin-top:-72px;display:grid;place-items:center;text-align:center;padding:90px clamp(16px,3vw,30px) 40px;
  background:linear-gradient(160deg,#eceaff,#f7f7fa)}
.hd-hero h2{font-size:clamp(26px,3.6vw,52px);margin:0 0 10px;font-weight:800}
.hd-hero p{margin:0;color:var(--muted)}
.hd-body{padding:clamp(30px,5vw,70px) clamp(16px,3vw,30px);max-width:62ch;margin-inline:auto;color:var(--muted)}
.hd-body p{margin:0 0 18px;line-height:1.8}
@media (prefers-reduced-motion: reduce){.hd-bar{transition:background-color .3s}.hd-bar.up{transform:none}}`,
  html:`<div class="stage tight">
<div class="hd-frame">
  <header class="hd-bar">
    <strong>לוגו</strong>
    <nav><a href="#">עבודות</a><a href="#">שירותים</a><a class="hd-cta" href="#">דברו איתנו</a></nav>
  </header>
  <section class="hd-hero"><div><h2>גלול למטה וההדר ייעלם</h2><p>גלול קצת חזרה למעלה והוא יחזור מיד</p></div></section>
  <div class="hd-body">
    <p>ההתנהגות הזאת פותרת בעיה אמיתית: הדר קבוע גוזל גובה יקר במובייל, אבל הדר שנעלם לגמרי מכריח את הגולש לחזור עד למעלה. הפשרה היא הדר שמגיב לכוונה: יורדים, הוא מתפנה; רוצים לנווט, מרימים קצת והוא כבר שם.</p>
    <p>שני פרטים שקובעים אם זה מרגיש טוב: סף מרחק שמונע ריצוד בגלילות זעירות, וכניסה מיידית לרקע אטום ברגע שעוזבים את הירו, כדי שהטקסט מאחור לא יתערבב בניווט.</p>
    <p>גלול עוד קצת בתוך המסגרת. אחר כך גלול למעלה בעדינות.</p>
    <p style="height:70vh"></p>
    <p>עוד תוכן, כדי שיהיה מסלול גלילה אמיתי לבדיקה.</p>
    <p style="height:70vh"></p>
    <p>סוף העמוד.</p>
  </div>
</div>
<p class="hd-hint">גלול בתוך המסגרת, לא בעמוד.</p>
</div>`,
  js:`(function(){
  const frame=document.querySelector(".hd-frame");
  const bar=frame.querySelector(".hd-bar");
  const hero=frame.querySelector(".hd-hero");
  let last=frame.scrollTop,acc=0;
  const THRESH=90;   // כמה צריך לגלול ברצף לפני שההדר מגיב. מונע ריצוד.
  function onScroll(){
    const y=frame.scrollTop;
    const d=y-last;last=y;
    bar.classList.toggle("solid",y>hero.offsetHeight*0.6);
    if(y<80){bar.classList.remove("up");acc=0;return;}
    // צוברים מרחק באותו כיוון, ומאפסים כשמתהפכים
    if((d>0&&acc<0)||(d<0&&acc>0))acc=0;
    acc+=d;
    if(acc>THRESH){bar.classList.add("up");acc=0;}
    if(acc<-THRESH){bar.classList.remove("up");acc=0;}
  }
  frame.addEventListener("scroll",onScroll,{passive:true});
  onScroll();
})();`,
  runway:false,
  note:"הסף של 90 פיקסלים הוא הפרט החשוב: בלעדיו ההדר מרצד בכל תזוזה קטנה של הטראקפד. הצבירה מתאפסת בכל שינוי כיוון, ולכן גלילה קצרה למעלה מחזירה אותו מיד. מתחת ל-80 פיקסלים מהראש הוא תמיד גלוי, כדי שלא ייתקע מוסתר בראש העמוד. **הערת דמו**: כאן ההדר הוא `position:sticky` בתוך מסגרת שגוללת בעצמה, כי לעמוד המאגר כבר יש הדר משלו ואי אפשר היה לשפוט את המהלך. בפרויקט אמיתי מחליפים לשורה אחת: `position:fixed` עם `inset-inline:0`, ומאזינים ל-window במקום למסגרת."
},
{
  id:"b39", cat:"behavior", name:"תפריט נפתח עם פאנל מונפש", tech:"JS · CSS grid-rows", status:"ממתין",
  desc:"פריט בתפריט שפותח פאנל רחב עם קישורים מקובצים. נפתח בהובר בדסקטופ ובלחיצה במגע, נסגר ב-Escape או בלחיצה בחוץ, ורק אחד פתוח בכל רגע.",
  when:"אתרים עם יותר מחמישה עמודים: קטלוג, שירותים לפי תחום, אזור לקוחות. מונע תפריט עמוס ומאפשר להסביר כל קטגוריה במילה.",
  libs:[],
  css:`.mm{position:relative;z-index:30;background:var(--card);border-bottom:1px solid var(--line)}
.mm-bar{display:flex;align-items:center;gap:4px;padding:12px var(--gutter);max-width:1200px;margin-inline:auto}
.mm-logo{font-weight:800;margin-inline-end:18px}
.mm-item{position:relative}
.mm-btn{display:inline-flex;align-items:center;gap:7px;background:none;border:0;font:inherit;font-size:15px;color:var(--ink);
  padding:10px 14px;border-radius:999px;cursor:pointer;transition:background .22s}
.mm-btn:hover,.mm-item.open .mm-btn{background:#eceaff}
.mm-btn i{width:5px;height:5px;opacity:.6;border-inline-end:1.5px solid currentColor;border-block-end:1.5px solid currentColor;
  transform:rotate(45deg) translateY(-2px);transition:transform .3s,opacity .22s}
.mm-item.open .mm-btn i{opacity:1}
.mm-item.open .mm-btn i{transform:rotate(225deg) translateY(-2px)}
.mm-panel{position:absolute;inset-inline-start:0;top:calc(100% + 8px);min-width:min(560px,86vw);
  background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 22px 60px rgba(22,24,43,.14);
  display:grid;grid-template-rows:0fr;opacity:0;visibility:hidden;transform:translateY(-6px);
  transition:grid-template-rows .32s cubic-bezier(.2,.8,.2,1),opacity .25s,transform .32s,visibility .32s}
.mm-item.open .mm-panel{grid-template-rows:1fr;opacity:1;visibility:visible;transform:none}
.mm-panel>div{overflow:hidden}
.mm-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:16px}
.mm-link{display:block;padding:13px 14px;border-radius:12px;text-decoration:none;color:var(--ink);transition:background .2s}
.mm-link:hover{background:var(--bg)}
.mm-link b{display:block;font-size:15px;margin-bottom:3px}
.mm-link span{font-size:13px;color:var(--muted)}
.mm-note{padding:0 16px 16px;font-size:13px;color:var(--muted)}
.mm-body{padding:var(--sec) var(--gutter);text-align:center;color:var(--muted)}
@media(max-width:767px){.mm-grid{grid-template-columns:1fr}.mm-panel{min-width:min(420px,88vw)}}
@media (prefers-reduced-motion: reduce){.mm-panel{transition-duration:.01ms}}`,
  html:`<div class="mm"><div class="mm-bar">
  <span class="mm-logo">לוגו</span>
  <div class="mm-item">
    <button class="mm-btn" aria-expanded="false">שירותים <i aria-hidden="true"></i></button>
    <div class="mm-panel"><div>
      <div class="mm-grid">
        <a class="mm-link" href="#"><b>אתרי תדמית</b><span>אתר שמסביר מי אתם ולמה דווקא אתכם</span></a>
        <a class="mm-link" href="#"><b>דפי נחיתה</b><span>עמוד אחד עם מטרה אחת: פנייה</span></a>
        <a class="mm-link" href="#"><b>חנויות אונליין</b><span>מסלול קנייה קצר ודף מוצר שמוכר</span></a>
        <a class="mm-link" href="#"><b>מערכות פנימיות</b><span>ניהול לקוחות, הצעות מחיר ואוטומציות</span></a>
      </div>
      <p class="mm-note">לא בטוחים מה מתאים? נדבר חמש דקות ונגיד לכם בכנות.</p>
    </div></div>
  </div>
  <div class="mm-item">
    <button class="mm-btn" aria-expanded="false">תחומים <i aria-hidden="true"></i></button>
    <div class="mm-panel"><div>
      <div class="mm-grid">
        <a class="mm-link" href="#"><b>נדל"ן</b><span>תיווך, יזמות ופרויקטים</span></a>
        <a class="mm-link" href="#"><b>קליניקות</b><span>רפואה, אסתטיקה וטיפול</span></a>
        <a class="mm-link" href="#"><b>מסחר</b><span>חנויות ומותגי מוצר</span></a>
        <a class="mm-link" href="#"><b>שירותים</b><span>עורכי דין, יועצים ובעלי מקצוע</span></a>
      </div>
    </div></div>
  </div>
  <a class="mm-btn" href="#" style="text-decoration:none">אודות</a>
</div></div>
<p class="mm-body">העבר עכבר על אחד הפריטים, או לחץ עליו במגע. Escape סוגר.</p>`,
  js:`(function(){
  const items=[...document.querySelectorAll(".mm-item")];
  const hoverable=matchMedia("(hover:hover)").matches;
  let timer=null;
  function open(it){
    items.forEach(o=>{o.classList.toggle("open",o===it);o.querySelector(".mm-btn").setAttribute("aria-expanded",String(o===it));});
  }
  function closeAll(){open(null);}
  items.forEach(it=>{
    const btn=it.querySelector(".mm-btn");
    btn.addEventListener("click",e=>{e.preventDefault();it.classList.contains("open")?closeAll():open(it);});
    if(hoverable){
      // השהיה קטנה ביציאה, אחרת המסלול מהכפתור אל הפאנל סוגר אותו באמצע
      it.addEventListener("pointerenter",()=>{clearTimeout(timer);open(it);});
      it.addEventListener("pointerleave",()=>{clearTimeout(timer);timer=setTimeout(closeAll,180);});
    }
  });
  addEventListener("keydown",e=>{if(e.key==="Escape")closeAll();});
  addEventListener("click",e=>{if(!e.target.closest(".mm-item"))closeAll();});
})();`,
  runway:false,
  note:"שלושה פרטים: הפאנל נפתח ב-grid-template-rows כדי לקבל גובה אמיתי בלי לחשב פיקסלים, יש השהיית יציאה של 180 מילישניות כדי שהמעבר מהכפתור אל הפאנל לא יסגור אותו, ובמכשירי מגע ההובר מבוטל לגמרי והפתיחה היא בלחיצה. חובה aria-expanded וסגירה ב-Escape."
},
{
  id:"b40", cat:"behavior", name:"פוטר שנחשף מאחורי העמוד", tech:"CSS position:fixed", status:"ממתין",
  desc:"הפוטר יושב קבוע מאחורי התוכן, והעמוד מחליק מעליו כמו וילון. בסוף הגלילה הוא נחשף במלואו בלי אנימציה ובלי JS.",
  when:"כל אתר תדמית או פורטפוליו. נותן סיום מכובד לעמוד ומרוויח מקום לפרטי קשר גדולים, בלי להאריך את הגלילה.",
  libs:[],
  css:`.rvf-page{position:relative;z-index:2;background:var(--bg)}
.rvf-hero{min-height:60vh;display:grid;place-items:center;text-align:center;padding:10vh var(--gutter)}
.rvf-hero h2{font-size:clamp(30px,4.4vw,66px);margin:0 0 10px;font-weight:800}
.rvf-hero p{margin:0;color:var(--muted)}
.rvf-body{padding:0 var(--gutter) clamp(60px,8vw,120px);max-width:62ch;margin-inline:auto;color:var(--muted);line-height:1.8}
/* הפוטר קבוע מאחור, והעמוד מקבל שוליים בגובהו כדי לפנות לו מקום בסוף */
.rvf-footer{position:fixed;inset-inline:0;bottom:0;z-index:1;min-height:var(--rvf-h,60vh);
  background:#16182b;color:#fff;display:grid;align-content:center;gap:18px;padding:clamp(36px,5vw,70px) var(--gutter)}
.rvf-footer h3{font-size:clamp(28px,4vw,60px);margin:0;font-weight:800}
.rvf-footer a{color:#fff}
.rvf-cols{display:flex;gap:clamp(20px,4vw,60px);flex-wrap:wrap;color:#a7a9c4;font-size:15px}
.rvf-cols div{display:grid;gap:8px}
.rvf-bottom{border-top:1px solid rgba(255,255,255,.14);padding-top:16px;font-size:13px;color:#8d8fa8;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
@media(max-width:767px){.rvf-footer{min-height:70vh}}`,
  html:`<div class="rvf-page">
  <section class="rvf-hero"><div><h2>גלול עד הסוף</h2><p>הפוטר כבר שם, מתחת לעמוד, ומתגלה כשהתוכן מחליק מעליו</p></div></section>
  <div class="rvf-body">
    <p>הטריק פשוט: הפוטר קבוע בתחתית המסך עם z-index נמוך, והעמוד יושב מעליו עם רקע אטום. כשהתוכן נגמר, מה שנשאר לראות זה הפוטר.</p>
    <p>הרווח הוא כפול: אין אנימציה שצריכה לרוץ, אין ScrollTrigger, ואין קפיצה במובייל. וגם, אפשר לתת לפרטי הקשר מסך שלם בלי להאריך את הגלילה.</p>
    <p style="height:60vh"></p>
    <p>עוד קצת תוכן לפני הסוף.</p>
    <p style="height:40vh"></p>
    <p>וזהו, מכאן הפוטר.</p>
  </div>
</div>
<footer class="rvf-footer">
  <h3>נדבר?</h3>
  <div class="rvf-cols">
    <div><span>info@example.com</span><span>03-1234567</span></div>
    <div><span>עבודות</span><span>שירותים</span><span>אודות</span></div>
    <div><span>אינסטגרם</span><span>לינקדאין</span><span>פייסבוק</span></div>
  </div>
  <div class="rvf-bottom"><span>כל הזכויות שמורות</span><span>תנאי שימוש · מדיניות פרטיות</span></div>
</footer>`,
  js:`(function(){
  const page=document.querySelector(".rvf-page"),footer=document.querySelector(".rvf-footer");
  // השוליים בתחתית העמוד שווים לגובה הפוטר. נמדד ומתעדכן בשינוי גודל.
  function fit(){page.style.marginBottom=footer.offsetHeight+"px";}
  fit();
  addEventListener("resize",fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();`,
  runway:false,
  note:"המדידה היחידה ב-JS היא גובה הפוטר, שהופך לשוליים בתחתית העמוד. בלי זה התוכן האחרון מסתתר מאחוריו. חשוב שלעמוד יהיה רקע אטום, אחרת רואים את הפוטר דרכו לאורך כל הגלילה. בעמודים קצרים מגובה המסך כדאי לבטל את המהלך, אחרת הפוטר גלוי כל הזמן."
},
];
