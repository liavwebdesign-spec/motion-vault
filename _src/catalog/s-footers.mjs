// Footers family (23.9.2026). The doctrine's footer rules were spread over five files (site-planning, behaviors B3,
// sections S14b, concept "closing signature", studio-bar 29), so every project forgot a different one. Ten footers,
// and one mandatory list every one of them meets, checked by qa.mjs for the footer category:
// real links to the privacy and accessibility pages, Liav's credit line, a year that updates itself, tel: links shown LTR,
// no separator lines, and hover transitions on footer links (the one motion.md says everyone forgets).

const E = "cubic-bezier(.2,.6,.2,1)";
const CREDIT = `<p class="ft-credit"><a href="https://liavmatzri.co.il" rel="noopener" target="_blank">עוצב ופותח על ידי ליאב מצרי</a></p>`;
const LEGAL = (name = "שם העסק", extra = "") => `<div class="ft-legal"><p>© <span data-year>2026</span> ${name}. כל הזכויות שמורות.</p><nav aria-label="מסמכים"><a href="#privacy">מדיניות פרטיות</a><a href="#accessibility">הצהרת נגישות</a>${extra}</nav>${CREDIT}</div>`;
const TEL = (n = "050-000-0000", intl = "+972500000000") => `<a class="ft-tel" href="tel:${intl}" dir="ltr">${n}</a>`;
const WA_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-1 .8a3.6 3.6 0 0 1-1.7-1.7l.8-1-1-2z"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg>`;

// ---- shared: year, and an in-view trigger that does not depend on IntersectionObserver alone (see r-heroes) ----
const BASE_JS = `
document.querySelectorAll("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear();});
function inView(el,f){
  var done=false,io=null;
  function go(){if(done)return;done=true;off();f();}
  function chk(){var r=el.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0)go();}
  function off(){removeEventListener("scroll",chk);removeEventListener("resize",chk);if(io)io.disconnect();}
  // the observer also catches a layout change that brings the footer on screen with no scroll event (content above
  // it collapsing, a short page); the scroll check stays for where the observer is late or missing
  if("IntersectionObserver" in window){io=new IntersectionObserver(function(es){if(es.some(function(x){return x.isIntersecting;}))go();},{rootMargin:"0px 0px -10% 0px"});io.observe(el);}
  addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);requestAnimationFrame(chk);setTimeout(chk,300);
}`;

// ---- demo scaffolding: a frame and the tail of a page, so the footer is judged where it lives ----
const BASE_CSS = `
/* ---- demo frame and page tail (scaffolding, not part of the footer) ---- */
.fx{margin-inline:var(--gutter);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--bg);isolation:isolate}
.fx-end{display:grid;gap:12px;padding:72px 32px}
.fx-end small{font-size:13px;font-weight:600;color:var(--muted)}
.fx-end p{margin:0;max-width:52ch;font-size:16px;line-height:1.6;color:var(--muted)}

/* ---- the mandatory atoms every footer carries ---- */
.ftw{font-size:15px;line-height:1.6}
.ftw a{color:inherit;text-decoration:none;transition:color .15s ${E},opacity .15s ${E}}
.ftw h3{margin:0 0 12px;font-size:14px;font-weight:600;opacity:.62}
/* a big closing line never leaves one word alone on its last row */
.ftw :is(h2,h3){text-wrap:balance}
.ftw ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
/* the number hugs the start of its column (RTL: right) and never breaks between rows; stretched, dir=ltr pushed it left */
.ft-tel{unicode-bidi:isolate;font-weight:600;justify-self:start;white-space:nowrap}
.ft-legal{display:flex;flex-wrap:wrap;align-items:center;gap:8px 24px;font-size:13px}
.ft-legal p{margin:0}
/* the credit fades once, on its link: fading the paragraph too gave 0.49 and failed contrast on the light footers */
.ft-legal>p:not(.ft-credit){opacity:.7}
.ft-legal nav{display:flex;flex-wrap:wrap;gap:8px 20px}
.ft-legal nav a{opacity:.7}
.ft-credit{margin-inline-start:auto!important}
.ft-credit a{opacity:.7}
@media (hover:hover) and (pointer:fine){.ftw a:hover,.ft-legal nav a:hover,.ft-credit a:hover{opacity:1;color:var(--accent)}}
.ft-dark{background:var(--ink);color:var(--bg)}
@media (hover:hover) and (pointer:fine){.ft-dark a:hover,.ft-dark .ft-legal nav a:hover,.ft-dark .ft-credit a:hover{color:color-mix(in srgb,var(--accent) 45%,var(--bg))}}
.ft-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:52px;padding:0 28px;border-radius:12px;border:0;background:var(--accent);color:var(--accent-ink)!important;
  font:inherit;font-size:16px;font-weight:600;cursor:pointer;transition:transform .18s ${E},background .2s ${E}}
.ft-btn svg{width:18px;height:18px}
@media (hover:hover) and (pointer:fine){.ft-btn:hover{transform:translateY(-2px)}}
.ft-rv{opacity:0;transform:translateY(16px);transition:opacity .6s ${E},transform .6s ${E};transition-delay:calc(var(--i,0) * 80ms)}
.is-in .ft-rv{opacity:1;transform:none}
@media (max-width:760px){.ft-credit{margin-inline-start:0!important;flex-basis:100%}}
/* phone: every footer link is a 44px row. The list gap moves inside the link, and a plain text row (an address) gets the
   same height, so neighbouring columns stay level. Desktop does not move. */
@media (pointer:coarse),(max-width:760px){
  .ftw a:not(.ft-btn):not(.ft7-ok a){display:inline-flex;align-items:center;min-height:44px}
  .ftw ul:not(.ft2-hours) li{display:flex;align-items:center;min-height:44px}
  .ftw ul:not(.ft2-hours),.ft4-row>div,.ft8-row div{gap:0}
  .ft4-row>div,.ft8-row div{align-content:start}
  .ft4-row>div>span,.ft8-row div>span{display:flex;align-items:center;min-height:44px}
  .ft7-row,.ft10-row{align-items:center}
  .ft-legal,.ft-legal nav{row-gap:0}
}
@media (prefers-reduced-motion:reduce){.ftw *,.ft-rv{transition-duration:.01ms!important;transition-delay:0s!important}.ft-rv{opacity:1;transform:none}}`;

const tail = (title, text) => `<div class="fx-end"><small>הסקשן האחרון בעמוד</small><p>${text || title}</p></div>`;

export default [
{
  id:"ft1", cat:"footer", name:"פוטר סוגר ענק", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הפוטר פותח במשפט סגירה גדול, בטלפון ובכפתור אחד, ורק מתחתיהם שורת פרטים דקה והקישורים המשפטיים. מי שהגיע לתחתית הביע עניין, והפוטר מציע לו את הצעד הבא ולא רק רשימה.",
  when:"ברירת המחדל לאתרי תדמית, סטודיו, שירות מקצועי ומותג. לא לאתר עם עשרים עמודים שצריך מפת אתר מלאה (ft3), ולא לנחיתה (ft6).",
  libs:[],
  css:`${BASE_CSS}
.ft1{display:grid;gap:64px;padding:96px 32px 40px}
.ft1-cta{display:grid;gap:28px}
.ft1-cta h2{margin:0;max-width:14ch;font-size:clamp(44px,6.6vw,112px);line-height:.98;font-weight:700}
.ft1-act{display:flex;flex-wrap:wrap;align-items:center;gap:16px 32px}
.ft1-act .ft-tel{font-size:clamp(22px,2vw,30px)}
.ft1-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}
.ft1-cols ul{gap:6px}
@media (max-width:760px){.ft1{padding:72px 20px 32px;gap:48px}.ft1-cols{grid-template-columns:1fr 1fr}}`,
  html:`<div class="fx">${tail("", "בתחתית העמוד מסיימים עם פעולה, לא עם רשימה.")}
<footer class="ftw ft-dark ft1" id="ft1">
  <div class="ft1-cta">
    <h2 class="ft-rv">נדבר על הפרויקט הבא?</h2>
    <div class="ft1-act ft-rv" style="--i:1"><a class="ft-btn" href="#ft1">לתיאום שיחה ${ARROW}</a>${TEL()}</div>
  </div>
  <div class="ft1-cols ft-rv" style="--i:2">
    <div><h3>ניווט</h3><ul><li><a href="#ft1">שירותים</a></li><li><a href="#ft1">פרויקטים</a></li><li><a href="#ft1">אודות</a></li></ul></div>
    <div><h3>סטודיו</h3><ul><li>הרצל 12, תל אביב</li><li><a href="mailto:hello@example.co.il">hello@example.co.il</a></li></ul></div>
    <div><h3>עקבו</h3><ul><li><a href="#ft1">אינסטגרם</a></li><li><a href="#ft1">לינקדאין</a></li></ul></div>
  </div>
  ${LEGAL("סטודיו לדוגמה")}
</footer></div>`,
  js:`${BASE_JS}
inView(document.getElementById("ft1"),function(){document.getElementById("ft1").classList.add("is-in");});`,
  note:"שלושה דברים שמבדילים אותו מפוטר של תבנית. הכותרת בגודל של הירו (עד 112px), כי מי שגלל עד התחתית כבר הביע עניין, והיא עולה יחד עם הכפתור והטלפון בכניסה אחת. הטלפון הוא קישור tel: עם dir=ltr ו-unicode-bidi:isolate, כך שהמספר לא מתהפך בתוך שורה עברית. ואין אף קו מפריד: ההפרדה בין הסוגר לפרטים היא רווח של 64 פיקסלים. בטלפון כל קישור בפוטר הוא שורה של 44 פיקסלים, כדי שהאגודל יפגע בקישור הנכון. חובה בפרויקט: אם יש CTA דביק במובייל, הפוטר נכנס ל-IntersectionObserver שלו (behaviors B3), והמקום לפס נפתח ב-padding-bottom של הפוטר ולא על body, אחרת הכפתור הדביק מכסה את הקרדיט ואת הטלפון."
},
{
  id:"ft2", cat:"footer", name:"פוטר עסק מקומי: שעות חיות, מפה בלחיצה, Waze", tech:"CSS · JS · JSON-LD", status:"ממתין", runway:false,
  desc:"כתובת, טלפון, וואטסאפ וכפתור Waze, שעות פתיחה עם חיווי חי (פתוח עכשיו עד 18:00, או סגור ומתי נפתח), ומפה שנטענת רק כשלוחצים עליה. כולל נתונים מובנים LocalBusiness לגוגל.",
  when:"כל עסק שמגיעים אליו פיזית או שמתקשרים אליו: מרפאה, מסעדה, מוסך, חנות, סטודיו, קבלן. הנתונים המובנים הם חלק מהפוטר, לא תוספת: הם מה שמזין את התוצאות המקומיות בגוגל.",
  libs:[],
  css:`${BASE_CSS}
.ft2{display:grid;gap:48px;padding:72px 32px 40px;background:color-mix(in srgb,var(--ink) 4%,var(--bg));color:var(--ink)}
.ft2-grid{display:grid;grid-template-columns:1fr 1fr 1.3fr;gap:40px;align-items:start}
.ft2-grid h2{margin:0 0 12px;font-size:clamp(24px,2vw,32px);line-height:1.15}
.ft2-go{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.ft2-go a{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:12px;background:var(--card);font-weight:600;font-size:14px}
.ft2-go svg{width:18px;height:18px}
.ft2-now{display:inline-flex;align-items:center;gap:8px;margin-bottom:12px;font-weight:600}
.ft2-now i{width:9px;height:9px;border-radius:50%;background:var(--muted)}
.ft2-now.open i{background:var(--accent)}
.ft2-hours li{display:flex;justify-content:space-between;gap:16px;padding:4px 8px;border-radius:8px}
.ft2-hours li.today{background:var(--card);font-weight:600}
.ft2-hours span:last-child{direction:ltr;unicode-bidi:isolate}
.ft2-map{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:color-mix(in srgb,var(--accent) 12%,var(--bg))}
.ft2-map .ph-grid{position:absolute;inset:0;background:
  repeating-linear-gradient(0deg,transparent 0 38px,color-mix(in srgb,var(--ink) 7%,transparent) 38px 40px),
  repeating-linear-gradient(90deg,transparent 0 38px,color-mix(in srgb,var(--ink) 7%,transparent) 38px 40px)}
.ft2-map button{position:absolute;inset:0;margin:auto;height:52px;width:max-content;padding:0 24px;border:0;border-radius:12px;background:var(--ink);color:var(--bg);font:inherit;font-weight:600;cursor:pointer}
.ft2-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
@media (max-width:900px){.ft2-grid{grid-template-columns:1fr}.ft2{padding:56px 20px 32px}}`,
  html:`<div class="fx">${tail("", "העסק המקומי: מי שגלל עד כאן רוצה לדעת איך מגיעים, והאם פתוח עכשיו.")}
<footer class="ftw ft2" id="ft2">
  <div class="ft2-grid">
    <div><h2>מרפאת שיניים, רמת גן</h2><ul><li>ביאליק 40, רמת גן</li><li>${TEL("03-000-0000","+97230000000")}</li></ul>
      <div class="ft2-go"><a href="https://waze.com/ul?q=%D7%91%D7%99%D7%90%D7%9C%D7%99%D7%A7%2040%20%D7%A8%D7%9E%D7%AA%20%D7%92%D7%9F" rel="noopener" target="_blank">Waze</a><a href="#ft2">${WA_SVG}וואטסאפ</a></div></div>
    <div><p class="ft2-now" data-now><i></i><span>בודק שעות...</span></p>
      <ul class="ft2-hours" data-hours>
        <li data-d="0"><span>ראשון</span><span>08:00-18:00</span></li><li data-d="1"><span>שני</span><span>08:00-18:00</span></li>
        <li data-d="2"><span>שלישי</span><span>08:00-18:00</span></li><li data-d="3"><span>רביעי</span><span>08:00-18:00</span></li>
        <li data-d="4"><span>חמישי</span><span>08:00-18:00</span></li><li data-d="5"><span>שישי</span><span>08:00-13:00</span></li>
        <li data-d="6"><span>שבת</span><span>סגור</span></li></ul></div>
    <div class="ft2-map" data-map><span class="ph-grid" aria-hidden="true"></span><button type="button">הצגת המפה</button></div>
  </div>
  ${LEGAL("מרפאת שיניים לדוגמה")}
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Dentist","name":"מרפאת שיניים לדוגמה","telephone":"+97230000000",
  "address":{"@type":"PostalAddress","streetAddress":"ביאליק 40","addressLocality":"רמת גן","addressCountry":"IL"},
  "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Sunday","Monday","Tuesday","Wednesday","Thursday"],"opens":"08:00","closes":"18:00"},
  {"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"08:00","closes":"13:00"}]}</script>
</footer></div>`,
  js:`${BASE_JS}
(function(){
  var root=document.getElementById("ft2");
  // hours: [open,close] in minutes per weekday, 0 = Sunday. The same data as the JSON-LD above: one source in a real project
  var H={0:[480,1080],1:[480,1080],2:[480,1080],3:[480,1080],4:[480,1080],5:[480,780],6:null};
  // Israel time, not the visitor's clock: someone abroad still sees whether the clinic is open now
  var p={};new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
  var day=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(p.weekday), mins=(+p.hour)*60+(+p.minute);
  var fmt=function(m){return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");};
  var names=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
  var li=root.querySelector('[data-d="'+day+'"]'); if(li)li.classList.add("today");
  var now=root.querySelector("[data-now]"), t=now.querySelector("span"), h=H[day];
  if(h&&mins>=h[0]&&mins<h[1]){now.classList.add("open");t.textContent="פתוח עכשיו, עד "+fmt(h[1]);}
  else{
    for(var k=0;k<8;k++){var d=(day+k)%7,x=H[d];if(!x)continue;if(k===0&&mins<x[0]){t.textContent="סגור עכשיו, נפתח היום ב-"+fmt(x[0]);break;}
      if(k>0){t.textContent="סגור עכשיו, נפתח "+(k===1?"מחר":"ביום "+names[d])+" ב-"+fmt(x[0]);break;}}
  }
  // the map costs a third-party request and cookies: it loads only when someone asks for it
  var map=root.querySelector("[data-map]");
  map.querySelector("button").addEventListener("click",function(){
    var f=document.createElement("iframe");f.title="מפה: ביאליק 40, רמת גן";f.loading="lazy";f.referrerPolicy="no-referrer-when-downgrade";
    f.src="https://www.google.com/maps?q="+encodeURIComponent("ביאליק 40 רמת גן")+"&output=embed";
    // the button that had focus is gone: focus goes to the map, so a keyboard user is not thrown to the top of the page
    map.innerHTML="";map.appendChild(f);f.focus();
  });
})();`,
  note:"החיווי \"פתוח עכשיו\" מחושב בשעון ישראל (Intl עם Asia/Jerusalem) ולא בשעון של הדפדפן, כך שמי שנמצא בחו\"ל עדיין רואה נכון. כשסגור, הוא אומר מתי נפתח (היום, מחר או ביום מסוים), כי \"סגור\" לבד שולח את המבקר למתחרה. המפה לא נטענת עד שלוחצים: iframe של גוגל הוא בקשת צד שלישי עם עוגיות וכבד בביצועים. אחרי הלחיצה הפוקוס עובר למפה, כי הכפתור שהיה בפוקוס נמחק. JSON-LD מסוג LocalBusiness (כאן Dentist) עם כתובת, טלפון ושעות, מאותם נתונים שמוצגים, ובפרויקט אמיתי ממקור אחד כדי שלא יסתרו. השעות ב-direction:ltr כדי ש-08:00-18:00 לא יתהפך."
},
{
  id:"ft3", cat:"footer", name:"פוטר קלאסי מורחב, אקורדיון במובייל", tech:"CSS · JS · grid-template-rows", status:"ממתין", runway:false,
  desc:"לוגו, משפט וכפתור, ולצידם ארבעה טורים: ניווט, שירותים, יצירת קשר ורשתות. בדסקטופ הכל פתוח. במובייל כל טור הופך לאקורדיון, כדי שהפוטר לא יהיה מסך וחצי של קישורים.",
  when:"אתרים עם הרבה עמודים: שירות מקצועי, עורכי דין, רשת, מוסד. כשמפת האתר היא חלק מהניווט. לאתר של חמישה עמודים זה יותר מדי, ft1 מתאים יותר.",
  libs:[],
  css:`${BASE_CSS}
.ft3{display:grid;gap:56px;padding:72px 32px 40px;background:var(--ink);color:var(--bg)}
.ft3-top{display:grid;grid-template-columns:1.2fr 3fr;gap:56px}
.ft3-brand{display:grid;gap:16px;align-content:start}
.ft3-brand b{font-size:22px}
.ft3-brand p{margin:0;max-width:32ch;opacity:.72}
.ft3-cols{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
/* the heading only carries the outline for screen readers: the button inside keeps the look */
.ftw h3.ft3-h{margin:0;font:inherit;opacity:1}
.ft3-acc{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0;margin:0 0 12px;border:0;background:none;color:inherit;font:inherit;font-size:14px;font-weight:600;opacity:.62;text-align:start;cursor:default}
.ft3-acc i{display:none}
.ft3-body{display:grid;grid-template-rows:1fr}
.ft3-body>div{overflow:hidden}
@media (max-width:760px){
  .ft3{padding:56px 20px 32px;gap:40px}.ft3-top{grid-template-columns:1fr;gap:32px}.ft3-cols{grid-template-columns:1fr;gap:0}
  .ft3-col{padding-block:4px;background:color-mix(in srgb,var(--bg) 5%,transparent);border-radius:12px;margin-bottom:8px}
  .ft3-acc{min-height:52px;padding:0 16px;margin:0;font-size:16px;opacity:1;cursor:pointer}
  .ft3-acc i{/* qa-allow: line, the accordion chevron is drawn with two borders, not a separator */display:block;width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px);transition:transform .3s ${E}}
  .ft3-acc[aria-expanded="true"] i{transform:rotate(225deg) translateY(-2px)}
  .ft3-body{grid-template-rows:0fr;transition:grid-template-rows .3s ${E}}
  .ft3-body.open{grid-template-rows:1fr}
  .ft3-body ul{padding:0 16px 16px}
}`,
  html:`<div class="fx">${tail("", "אתר עם הרבה עמודים: הפוטר הוא גם מפת האתר.")}
<footer class="ftw ft3" id="ft3">
  <div class="ft3-top">
    <div class="ft3-brand"><b>לוגו</b><p>משרד עורכי דין לדיני עבודה ולמשפט מסחרי. 30 שנה בתל אביב.</p><div><a class="ft-btn" href="#ft3">לייעוץ ראשוני</a></div></div>
    <div class="ft3-cols">
      <div class="ft3-col"><h3 class="ft3-h"><button class="ft3-acc" type="button" aria-expanded="true" aria-controls="ft3-b1">ניווט<i aria-hidden="true"></i></button></h3><div class="ft3-body" id="ft3-b1"><div><ul><li><a href="#ft3">ראשי</a></li><li><a href="#ft3">המשרד</a></li><li><a href="#ft3">צוות</a></li><li><a href="#ft3">מאמרים</a></li></ul></div></div></div>
      <div class="ft3-col"><h3 class="ft3-h"><button class="ft3-acc" type="button" aria-expanded="true" aria-controls="ft3-b2">תחומים<i aria-hidden="true"></i></button></h3><div class="ft3-body" id="ft3-b2"><div><ul><li><a href="#ft3">דיני עבודה</a></li><li><a href="#ft3">חוזים</a></li><li><a href="#ft3">ליטיגציה</a></li><li><a href="#ft3">חברות</a></li><li><a href="#ft3">נדל״ן</a></li></ul></div></div></div>
      <div class="ft3-col"><h3 class="ft3-h"><button class="ft3-acc" type="button" aria-expanded="true" aria-controls="ft3-b3">יצירת קשר<i aria-hidden="true"></i></button></h3><div class="ft3-body" id="ft3-b3"><div><ul><li>${TEL("03-000-0000","+97230000000")}</li><li><a href="mailto:office@example.co.il">office@example.co.il</a></li><li>מנחם בגין 132, תל אביב</li></ul></div></div></div>
      <div class="ft3-col"><h3 class="ft3-h"><button class="ft3-acc" type="button" aria-expanded="true" aria-controls="ft3-b4">עקבו<i aria-hidden="true"></i></button></h3><div class="ft3-body" id="ft3-b4"><div><ul><li><a href="#ft3">לינקדאין</a></li><li><a href="#ft3">פייסבוק</a></li></ul></div></div></div>
    </div>
  </div>
  ${LEGAL("משרד עורכי דין לדוגמה", '<a href="#terms">תנאי שימוש</a>')}
</footer></div>`,
  js:`${BASE_JS}
(function(){
  var mq=matchMedia("(max-width:760px)"), btns=[].slice.call(document.querySelectorAll("#ft3 .ft3-acc"));
  // a closed column is inert: Tab skips it, and a screen reader swiping through the page does not reach links nobody sees
  function set(btn,open){var body=document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded",String(open));body.classList.toggle("open",open);body.inert=!open;}
  // desktop: everything open, the headings are not controls and carry no open/closed state; mobile: closed accordions
  function mode(){btns.forEach(function(b){
    if(mq.matches){b.disabled=false;set(b,false);}else{set(b,true);b.disabled=true;b.removeAttribute("aria-expanded");}});}
  btns.forEach(function(b){b.addEventListener("click",function(){if(mq.matches)set(b,b.getAttribute("aria-expanded")!=="true");});});
  mode(); mq.addEventListener("change",mode);
})();`,
  note:"האקורדיון הוא grid-template-rows מ-0fr ל-1fr, בלי max-height ובלי מדידה. כל כפתור יושב בתוך h3 ומחובר לגוף שלו ב-aria-controls, כך שקורא מסך מנווט בפוטר לפי כותרות. בדסקטופ הכפתורים מושבתים ונראים כמו כותרות, כדי שלא יהיו שני סטים של מארקאפ; במובייל הם נפתחים, וטור סגור מקבל inert, כך שגם Tab וגם קורא מסך בהחלקה לא מגיעים לקישורים שלא רואים. ההפרדה בין הטורים במובייל היא משטח עדין (5% בהיר על הכהה) ולא קו."
},
{
  id:"ft4", cat:"footer", name:"פוטר עם סוגר שנמס לתוכו", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הסקשן הסוגר הוא תמונה ברוחב מלא, והתחתית שלה נמסה בדיוק לצבע של הפוטר. אין תפר, אין פאנל מרחף: העין קוראת את הסוגר ואת הפוטר כגוש אחד שסוגר את העמוד.",
  when:"אתרי תדמית עם צילום חזק: אדריכלות, מלון, מסעדה, נדל״ן, תעשייה. בלי צילום טוב, ft1.",
  libs:[],
  css:`${BASE_CSS}
/* the footer colour sits under the photo too: if the image fails (or is slow), the white headline is still on dark */
.ft4-close{position:relative;isolation:isolate;overflow:hidden;min-height:min(70vh,560px);display:flex;flex-direction:column;justify-content:flex-end;gap:24px;padding:96px 32px 56px;color:var(--bg);background-color:var(--ink)}
.ft4-close::before{content:"";position:absolute;inset:0;z-index:-2;background:url(../assets/media/demo-b.jpg) center/cover;transform:scale(1.06);transition:transform 1.6s ${E}}
.ft4-close.is-in::before{transform:none}
/* the seam rule: the gradient's 0% stop is EXACTLY the footer colour, so there is nothing to see where they meet */
.ft4-close::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(to top,var(--ink) 0%,color-mix(in srgb,var(--ink) 72%,transparent) 38%,transparent 78%)}
.ft4-close h2{margin:0;max-width:15ch;font-size:clamp(38px,5vw,80px);line-height:1}
.ft4-close .ft-btn{align-self:flex-start}
.ft4{display:grid;gap:40px;padding:8px 32px 40px;background:var(--ink);color:var(--bg)}
.ft4-row{display:flex;flex-wrap:wrap;gap:24px 56px}
.ft4-row>div{display:grid;gap:4px}
.ft4-row h3{margin:0 0 4px}
@media (max-width:760px){.ft4-close{padding:88px 20px 40px}.ft4{padding:8px 20px 32px}}`,
  html:`<div class="fx">
<section class="ft4-close" id="ft4c"><h2 class="ft-rv">בית שמרגיש נכון בשמונה בבוקר</h2><a class="ft-btn ft-rv" style="--i:1" href="#ft4c">לפגישת היכרות ${ARROW}</a></section>
<footer class="ftw ft4" id="ft4">
  <div class="ft4-row">
    <div><h3>סטודיו</h3><span>הנביאים 12, חיפה</span>${TEL("04-000-0000","+97240000000")}</div>
    <div><h3>ניווט</h3><a href="#ft4">פרויקטים</a><a href="#ft4">הסטודיו</a><a href="#ft4">תהליך</a></div>
    <div><h3>עקבו</h3><a href="#ft4">אינסטגרם</a><a href="#ft4">פינטרסט</a></div>
  </div>
  ${LEGAL("סטודיו לאדריכלות לדוגמה")}
</footer></div>`,
  js:`${BASE_JS}
(function(){var c=document.getElementById("ft4c");inView(c,function(){c.classList.add("is-in");});})();`,
  note:"זה הדפוס S14ב מסיני (17.8.2026). כל הסוד בנקודת ה-0% של הגרדיאנט: היא var(--ink), אותו טוקן בדיוק של הפוטר, ולסוגר אין padding-bottom שיוצר תפר. אם הפוטר משנה צבע בפרויקט, הגרדיאנט משתנה איתו, כי שניהם יושבים על אותו טוקן. התמונה נכנסת בנשימה (scale 1.06 ל-1 בשנייה וחצי) כשהסוגר מגיע למסך. איך מזהים שזה נשבר: רואים קו ישר בין התמונה לפוטר."
},
{
  id:"ft5", cat:"footer", name:"פוטר חנות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"רצועת ניוזלטר עם הטבה ובדיקת מייל, ומתחתיה מה שקונה מחפש בתחתית חנות: קטגוריות, שירות לקוחות (משלוחים, החזרות, מעקב הזמנה), החברה, ואמצעי התשלום.",
  when:"כל חנות אונליין, כולל חנויות Shopify שנבנות ב-Lovable (הכיוון העסקי החדש). לא לאתר תדמית: שם ניוזלטר בפוטר הוא רעש.",
  libs:[],
  css:`${BASE_CSS}
.ft5{display:grid;gap:48px;padding:0 0 40px;background:color-mix(in srgb,var(--ink) 4%,var(--bg));color:var(--ink)}
.ft5-news{display:grid;grid-template-columns:1fr 1.2fr;align-items:center;gap:32px;padding:40px 32px;background:var(--ink);color:var(--bg)}
.ft5-news h2{margin:0 0 4px;font-size:clamp(22px,2vw,30px)}
.ft5-news p{margin:0;opacity:.72}
.ft5-form{display:flex;gap:8px;flex-wrap:wrap}
.ft5-form label{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
.ft5-form input{flex:1 1 220px;min-height:52px;padding:0 16px;border-radius:12px;border:1.5px solid color-mix(in srgb,var(--bg) 24%,transparent);background:color-mix(in srgb,var(--bg) 8%,transparent);color:var(--bg);font:inherit;font-size:16px}
.ft5-form input::placeholder{color:color-mix(in srgb,var(--bg) 60%,transparent)}
.ft5-form input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.ft5-note{flex-basis:100%;margin:0;font-size:13px;opacity:.72}
.ft5-note a{text-decoration:underline;text-underline-offset:3px}
.ft5-msg{flex-basis:100%;margin:0;min-height:22px;font-size:14px}
.ft5-msg.err{color:color-mix(in srgb,var(--accent) 40%,var(--bg))}
.ft5-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) 1.2fr;gap:32px;padding:0 32px}
.ft5-pay{display:flex;flex-wrap:wrap;gap:8px}
.ft5-pay span{padding:6px 12px;border-radius:8px;background:var(--card);font-size:13px;font-weight:600}
.ft5 .ft-legal{padding:0 32px}
@media (max-width:900px){.ft5-news{grid-template-columns:1fr;padding:32px 20px}.ft5-cols{grid-template-columns:1fr 1fr;padding:0 20px}.ft5 .ft-legal{padding:0 20px}}`,
  html:`<div class="fx">${tail("", "בתחתית חנות מחפשים משלוחים, החזרות ואיך משלמים. והזדמנות אחרונה להשאיר מייל.")}
<footer class="ftw ft5" id="ft5">
  <div class="ft5-news"><div><h2>10% הנחה על ההזמנה הראשונה</h2><p>קולקציות חדשות ומבצעים, פעם בשבועיים. בלי הצפה.</p></div>
    <form class="ft5-form" novalidate><label for="ft5e">כתובת מייל</label><input id="ft5e" type="email" inputmode="email" autocomplete="email" placeholder="כתובת המייל שלכם" dir="ltr"><button class="ft-btn" type="submit">להצטרפות</button><p class="ft5-note">אפשר להסיר בכל רגע. <a href="#privacy">מדיניות הפרטיות</a></p><p class="ft5-msg" role="status" aria-live="polite"></p></form></div>
  <div class="ft5-cols">
    <div><h3>קטגוריות</h3><ul><li><a href="#ft5">כלי הגשה</a></li><li><a href="#ft5">ספלים</a></li><li><a href="#ft5">אגרטלים</a></li><li><a href="#ft5">מארזי מתנה</a></li></ul></div>
    <div><h3>שירות לקוחות</h3><ul><li><a href="#ft5">משלוחים</a></li><li><a href="#ft5">החזרות והחלפות</a></li><li><a href="#ft5">מעקב הזמנה</a></li><li><a href="#ft5">שאלות נפוצות</a></li></ul></div>
    <div><h3>החברה</h3><ul><li><a href="#ft5">הסטודיו</a></li><li><a href="#ft5">סדנאות</a></li><li>${TEL()}</li></ul></div>
    <div><h3>משלמים בבטחה</h3><div class="ft5-pay"><span>ויזה</span><span>מאסטרקארד</span><span>אמריקן אקספרס</span><span>ביט</span><span>Apple Pay</span></div><p style="margin:12px 0 0;font-size:14px;opacity:.72">משלוח חינם בהזמנה מעל 300&nbsp;ש״ח</p></div>
  </div>
  ${LEGAL("סטודיו לקרמיקה לדוגמה", '<a href="#terms">תקנון</a><a href="#returns">מדיניות החזרות</a>')}
</footer></div>`,
  js:`${BASE_JS}
(function(){
  var f=document.querySelector("#ft5 form"), i=f.querySelector("input"), m=f.querySelector(".ft5-msg");
  f.addEventListener("submit",function(e){
    e.preventDefault();
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(i.value.trim())){m.className="ft5-msg err";m.textContent="נראה שחסר משהו בכתובת. אפשר לבדוק שוב?";i.setAttribute("aria-invalid","true");i.focus();return;}
    i.removeAttribute("aria-invalid");
    // in the vault there is no endpoint: the project connects it (Shopify customer, Klaviyo, or the site DB)
    m.className="ft5-msg";m.textContent="נרשמתם. קוד ההנחה בדרך למייל.";f.reset();
  });
})();`,
  note:"הטופס novalidate עם בדיקה משלנו, כי הודעת השגיאה המובנית של הדפדפן לא מתורגמת ולא מעוצבת. ההודעה ב-role=status עם aria-live, כך שקורא מסך מודיע עליה בלי להזיז את הפוקוס בהצלחה, ובשגיאה הפוקוס חוזר לשדה עם aria-invalid. שדה המייל ב-dir=ltr. אמצעי התשלום כטקסט ולא כלוגואים: לוגואים של ויזה ומאסטרקארד דורשים את הגרסה הרשמית, ובפרויקט מחליפים לקבצים של הסולק. מתחת לשדה \"אפשר להסיר בכל רגע\" וקישור למדיניות הפרטיות: טופס שאוסף מייל לדיוור בלי הודעת פרטיות לא עובר מסירה. במאגר אין שרת: ההצלחה מדומה, ובפרויקט הטופס מתחבר ל-Shopify, ל-Klaviyo או ל-DB."
},
{
  id:"ft6", cat:"footer", name:"פוטר נחיתה בשורה אחת", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"שורה אחת ודקה: לוגו, טלפון, הקישורים המשפטיים והקרדיט. בלי ניווט ובלי יציאות, כי כל קישור בדף נחיתה הוא דרך לצאת מהמשפך.",
  when:"דפי נחיתה, קמפיינים, הרשמה, שיעור ניסיון. זה החריג היחיד לסעיף 29 ברף הסטודיו (פוטר בגובה ההירו): בנחיתה הפוטר קטן בכוונה, והסוגר שמעליו הוא שעושה את העבודה.",
  libs:[],
  css:`${BASE_CSS}
.ft6{display:flex;flex-wrap:wrap;align-items:center;gap:16px 32px;padding:28px 32px;background:var(--ink);color:var(--bg)}
.ft6 b{font-size:18px}
.ft6 .ft-legal{flex:1 1 480px}
/* in a column the 480px flex-basis becomes a HEIGHT and stretches the footer to a screen: reset it (caught in the 500px shot) */
@media (max-width:760px){.ft6{padding:28px 20px;flex-direction:column;align-items:flex-start}.ft6 .ft-legal{flex:none}}`,
  html:`<div class="fx">${tail("", "בדף נחיתה הסוגר עושה את העבודה, והפוטר רק עומד בחובות.")}
<footer class="ftw ft6" id="ft6"><b>לוגו</b>${TEL()}${LEGAL("סטודיו פילאטיס לדוגמה")}</footer></div>`,
  js:`${BASE_JS}`,
  note:"גם בשורה אחת החובות לא יורדות: שני הקישורים המשפטיים, הקרדיט, השנה שמתעדכנת והטלפון הלחיץ. אלה בדיוק הדברים שנעלמים כשמקצרים פוטר של נחיתה, ובדיקת ה-QA של הקטגוריה נכשלת בלעדיהם."
},
{
  id:"ft7", cat:"footer", name:"פוטר עם טופס ממיר בשני צעדים", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"בראש הפוטר טופס בשני צעדים: קודם בוחרים במה צריך עזרה בלחיצה אחת, ורק אז שם וטלפון, עם תוויות צפות, טלפון שמסתדר לבד, אישור פרטיות וכפתור שעובר לשליחה. אחרי השליחה: מה קורה עכשיו, ווואטסאפ כחלופה.",
  when:"עסקי שירות שהליד הוא הכל: קבלנים, התקנות, ביטוח, ייעוץ, מרפאות. כשבאתר אין טופס בכל עמוד, הפוטר הוא הטופס. לא לחנות ולא לתיק עבודות.",
  libs:[],
  css:`${BASE_CSS}
.ft7{display:grid;gap:48px;padding:56px 32px 40px;background:var(--ink);color:var(--bg)}
/* the lead: the promise on one side, the form on the other, on one soft surface (no frame) */
.ft7-lead{display:grid;grid-template-columns:1fr 1.25fr;gap:48px;align-items:start;padding:40px;border-radius:24px;background:color-mix(in srgb,var(--bg) 7%,transparent)}
.ft7-lead h2{margin:0 0 12px;font-size:clamp(26px,2.4vw,38px);line-height:1.12}
.ft7-lead>div>p{margin:0;opacity:.72;max-width:36ch}
.ft7-trust{list-style:none;margin:24px 0 0;padding:0;display:grid;gap:8px;font-size:15px}
.ft7-trust li::before{content:"✓";color:var(--accent);font-weight:700;margin-inline-end:8px}
.ft7-form{display:grid;gap:16px;align-content:start}
.ft7-step{font-size:13px;opacity:.72;margin:0}
.ft7-q{margin:0;padding:0;border:0;display:grid;gap:12px}
.ft7-q legend{padding:0;margin-bottom:12px;font-size:18px;font-weight:600}
.ft7-chips{display:flex;flex-wrap:wrap;gap:8px}
.ft7-chip{position:relative}
.ft7-chip input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.ft7-chip span{display:inline-flex;align-items:center;min-height:48px;padding:0 20px;border-radius:999px;background:color-mix(in srgb,var(--bg) 10%,transparent);font-size:16px;transition:background .25s,color .25s}
.ft7-chip input:hover+span{background:color-mix(in srgb,var(--bg) 16%,transparent)}
.ft7-chip input:checked+span{background:var(--accent);color:var(--accent-ink)}
.ft7-chip input:focus-visible+span{outline:2px solid var(--accent);outline-offset:3px}
.ft7-s2{display:grid;gap:16px}
/* step 2: floating labels (MV:b32), on the dark surface */
.ft7-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ft7-f{position:relative}
.ft7-f input{width:100%;min-height:58px;padding:24px 16px 8px;border-radius:12px;border:1.5px solid color-mix(in srgb,var(--bg) 20%,transparent);background:color-mix(in srgb,var(--bg) 6%,transparent);color:var(--bg);font:inherit;font-size:16px;transition:border-color .25s}
.ft7-f input:focus{outline:0;border-color:var(--accent)}
.ft7-f input[dir=ltr]{text-align:right}
.ft7-f label{position:absolute;inset-inline-start:17px;top:18px;font-size:16px;opacity:.7;pointer-events:none;transform-origin:100% 0;transition:transform .22s cubic-bezier(.2,.6,.2,1),opacity .22s}
.ft7-f input:focus+label,.ft7-f input:not(:placeholder-shown)+label{transform:translateY(-10px) scale(.78);opacity:.85}
.ft7-f input[aria-invalid="true"]{border-color:color-mix(in srgb,var(--accent) 70%,var(--bg))}
.ft7-err{display:block;font-size:13px;margin-top:6px;color:color-mix(in srgb,var(--accent) 55%,var(--bg))}
.ft7-err:empty{display:none}
.ft7-ok{display:flex;gap:8px;align-items:flex-start;font-size:13px;opacity:.82}
.ft7-ok input{width:18px;height:18px;margin:2px 0 0;accent-color:var(--accent)}
.ft7-ok a{text-decoration:underline!important;text-underline-offset:3px}
.ft7-acts{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px}
.ft7-acts .ft-btn{min-width:180px}
.ft7-back,.ft7-wa{background:none;border:0;padding:8px 0;color:inherit;font:inherit;font-size:14px;opacity:.75;cursor:pointer;text-decoration:underline;text-underline-offset:3px}
.ft7-chosen{font-size:14px;opacity:.85;margin:0}
/* the ring is a masked conic gradient, not a border: a border-top reads as a separator line to the vault qa */
.ft7-spin{width:18px;height:18px;border-radius:50%;display:inline-block;background:conic-gradient(var(--accent-ink) 0 28%,color-mix(in srgb,var(--accent-ink) 30%,transparent) 0);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2px));mask:radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2px));animation:ft7spin .7s linear infinite}
@keyframes ft7spin{to{transform:rotate(360deg)}}
.ft7-msg{margin:0;min-height:22px;font-size:14px;font-weight:600}
.ft7-done{display:grid;gap:12px;align-content:start}
.ft7-done h3{margin:0;font-size:22px}
.ft7-done ol{margin:0;padding-inline-start:20px;display:grid;gap:6px;opacity:.85}
.ft7-done:focus{outline:0}
.ft7-row{display:flex;flex-wrap:wrap;gap:16px 48px}
/* with JS the two steps take turns; without it both are on the page and the form still sends */
.js-ft7 .ft7-form[data-step="1"] .ft7-s2,.js-ft7 .ft7-form[data-step="2"] .ft7-s1{display:none}
.js-ft7 .ft7-s1,.js-ft7 .ft7-s2{animation:ft7in .35s cubic-bezier(.2,.6,.2,1)}
@keyframes ft7in{from{opacity:0;transform:translateY(8px)}}
.ft7 [hidden]{display:none!important}
@media (prefers-reduced-motion:reduce){.js-ft7 .ft7-s1,.js-ft7 .ft7-s2{animation:none}.ft7-spin{animation-duration:2s}}
@media (max-width:900px){.ft7{padding:48px 20px 32px}.ft7-lead{grid-template-columns:1fr;gap:32px;padding:28px 20px}.ft7-fields{grid-template-columns:1fr}}
/* phone: the whole consent line is the target, the box sits inside it */
@media (pointer:coarse),(max-width:760px){.ft7-ok{min-height:44px;align-items:center}.ft7-ok input{width:24px;height:24px;margin:0}
  .ft7-ok a{display:inline-block;padding-block:4px;margin-block:-4px}.ft7-acts .ft-btn{width:100%}}`,
  html:`<div class="fx">${tail("", "כשהליד הוא הכל, הפוטר הוא הטופס האחרון בעמוד.")}
<footer class="ftw ft7" id="ft7">
  <div class="ft7-lead">
    <div><h2>חוזרים אליכם היום, עם מחיר</h2><p>שתי שאלות קצרות, בלי התחייבות. בימי שישי עד 12:00.</p>
      <ul class="ft7-trust"><li>טלפון אחד, לא עשרה</li><li>מחיר לפני שמגיעים</li><li>4.9 בגוגל, 212 ביקורות</li></ul></div>
    <form class="ft7-form" data-step="1" novalidate>
      <p class="ft7-step">שלב <b data-n>1</b> מתוך 2</p>
      <fieldset class="ft7-q ft7-s1"><legend>במה צריך עזרה?</legend>
        <div class="ft7-chips">
          <label class="ft7-chip"><input type="radio" name="need" value="התקנה חדשה"><span>התקנה חדשה</span></label>
          <label class="ft7-chip"><input type="radio" name="need" value="תיקון"><span>תיקון</span></label>
          <label class="ft7-chip"><input type="radio" name="need" value="תחזוקה"><span>תחזוקה</span></label>
          <label class="ft7-chip"><input type="radio" name="need" value="משהו אחר"><span>משהו אחר</span></label>
        </div></fieldset>
      <div class="ft7-s2">
        <p class="ft7-chosen" hidden>בחרתם: <b data-need></b> · <button type="button" class="ft7-back">לשנות</button></p>
        <div class="ft7-fields">
          <div class="ft7-f"><input id="ft7n" placeholder=" " autocomplete="name"><label for="ft7n">שם</label><small class="ft7-err" id="ft7n-e"></small></div>
          <div class="ft7-f"><input id="ft7p" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder=" "><label for="ft7p">טלפון</label><small class="ft7-err" id="ft7p-e"></small></div>
        </div>
        <label class="ft7-ok"><input type="checkbox"> <span>קראתי ואני מסכים/ה ל<a href="#privacy">מדיניות הפרטיות</a></span></label>
        <div class="ft7-acts"><button class="ft-btn" type="submit"><span data-l>שלחו, נחזור היום</span></button><a class="ft7-wa" href="#ft7">מעדיפים וואטסאפ?</a></div>
      </div>
      <p class="ft7-msg" role="status" aria-live="polite"></p>
    </form>
    <div class="ft7-done" hidden tabindex="-1"><h3 data-hi>קיבלנו. מה קורה עכשיו:</h3><ol><li>נציג מתקשר אליכם עוד היום.</li><li>מקבלים מחיר לפני שמישהו מגיע.</li><li>קובעים מועד שנוח לכם.</li></ol><a class="ft7-wa" href="#ft7">משהו דחוף? וואטסאפ</a></div>
  </div>
  <div class="ft7-row"><span>${TEL()}</span><span>התקנות בכל המרכז</span><a href="#ft7">שירותים</a><a href="#ft7">פרויקטים</a><a href="#ft7">אודות</a></div>
  ${LEGAL("קבלן לדוגמה")}
</footer></div>`,
  js:`${BASE_JS}
(function(){
  var root=document.getElementById("ft7"), f=root.querySelector(".ft7-form"), done=root.querySelector(".ft7-done");
  var n=f.querySelector("#ft7n"), p=f.querySelector("#ft7p"), ok=f.querySelector('input[type="checkbox"]'), m=f.querySelector(".ft7-msg"), btn=f.querySelector(".ft-btn");
  document.documentElement.classList.add("js-ft7");
  function step(k,focus){
    f.dataset.step=String(k); f.querySelector("[data-n]").textContent=k; m.textContent="";
    var c=f.querySelector('input[name="need"]:checked');
    if(k===2){ f.querySelector("[data-need]").textContent=c?c.value:""; f.querySelector(".ft7-chosen").hidden=!c; if(focus)n.focus(); }
    else if(focus){ (c||f.querySelector('input[name="need"]')).focus(); }
  }
  // one tap on a need is the first commitment, and it moves on by itself. The arrow keys only move the choice inside the
  // group (a radio group's own keyboard behaviour); Enter or Space moves on
  var byArrow=false;
  f.addEventListener("keydown",function(e){ byArrow=/^Arrow/.test(e.key); });
  f.querySelectorAll('input[name="need"]').forEach(function(r){
    r.addEventListener("change",function(){ if(!byArrow)setTimeout(function(){ step(2,true); },180); });
    r.addEventListener("keydown",function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); r.checked=true; step(2,true); } });
  });
  f.querySelector(".ft7-back").addEventListener("click",function(){ step(1,true); });
  function valid(x){ if(x===n)return n.value.trim().length>=2; var d=p.value.replace(/[\\s-]/g,"").replace(/^\\+972/,"0"); return /^0(5\\d{8}|[23489]\\d{7}|7\\d{8})$/.test(d); }
  function msg(x){ return x===n?"חסר שם, כדי שנדע למי לחזור.":"המספר לא נראה ישראלי. אפשר לבדוק?"; }
  function mark(x,t){ var e=document.getElementById(x.id+"-e"); e.textContent=t;
    if(t){ x.setAttribute("aria-invalid","true"); x.setAttribute("aria-describedby",e.id); } else { x.removeAttribute("aria-invalid"); x.removeAttribute("aria-describedby"); } }
  // the phone formats itself as it is typed (MV:cv9), and an error waits for the field to be left (no shouting while typing),
  // then clears the moment it is fixed
  p.addEventListener("input",function(){ var d=p.value.replace(/\\D/g,"");
    if(/^05\\d/.test(d)&&d.length<=10)p.value=d.replace(/^(\\d{3})(\\d{0,3})(\\d{0,4})$/,function(_,a,b,c){ return a+(b?"-"+b:"")+(c?"-"+c:""); });
    if(p.getAttribute("aria-invalid")==="true"&&valid(p))mark(p,""); });
  n.addEventListener("input",function(){ if(n.getAttribute("aria-invalid")==="true"&&valid(n))mark(n,""); });
  [n,p].forEach(function(x){ x.addEventListener("blur",function(){ if(x.value.trim()&&!valid(x))mark(x,msg(x)); }); });
  f.addEventListener("submit",function(e){
    e.preventDefault(); if(btn.disabled)return;
    if(!f.querySelector('input[name="need"]:checked')){ step(1,true); m.textContent="בחרו במה צריך עזרה."; return; }
    if(!valid(n)){ mark(n,msg(n)); n.focus(); return; }
    if(!valid(p)){ mark(p,msg(p)); p.focus(); return; }
    if(!ok.checked){ m.textContent="צריך לאשר את מדיניות הפרטיות."; ok.focus(); return; }
    // in the vault there is no endpoint: the sending state shows for a moment, then the "what now" panel. In a project this
    // posts to the site DB or WhatsApp, and the panel appears only after a real success, never a fake one
    btn.disabled=true; btn.querySelector("[data-l]").innerHTML='<i class="ft7-spin" aria-hidden="true"></i>'; m.textContent="שולחים...";
    setTimeout(function(){ done.querySelector("[data-hi]").textContent="קיבלנו, "+n.value.trim().split(" ")[0]+". מה קורה עכשיו:"; f.hidden=true; done.hidden=false; done.focus(); },900);
  });
})();`,
  note:"**למה שני צעדים (ליאב, דוח הסקירה 4.10.2026: \"אשמח לטופס יותר ממיר ומתקדם\"):** הצעד הראשון הוא לחיצה אחת בלי הקלדה (במה צריך עזרה), וזו התחייבות קטנה שמושכת את השנייה; רק אז שם וטלפון. מורכב מהטפסים שאושרו במאגר: תוויות צפות ומצב שליחה מ-MV:b32, בדיקה עדינה וטלפון שמסתדר לבד מ-MV:cv9, ובחירה כפתורית כמו בשאלון הניתוב של MV:h7. במקלדת החצים רק מזיזים את הבחירה, Enter או רווח מעבירים לשלב הבא, ו\"לשנות\" מחזיר. בלי JS שני הצעדים על העמוד והטופס עדיין נשלח. בדיקת הטלפון מקבלת נייד ונייח ישראליים, עם מקפים, רווחים או +972. תיבת הפרטיות באה לפני הכפתור (בקוד, ב-Tab ובטלפון), והקישור בה אמיתי. אחרי השליחה לא \"תודה\" יבש אלא מה קורה עכשיו בשלושה צעדים, ווואטסאפ לדחוף. במאגר אין שרת: בפרויקט הטופס כותב ל-DB או לוואטסאפ של העסק, ואף פעם לא מציג הצלחה בלי שליחה אמיתית. שורת האמון (\"4.9 בגוגל\") היא דוגמה: בפרויקט רק נתון אמיתי, אחרת השורה יורדת."
},
{
  id:"ft8", cat:"footer", name:"פוטר עם חתימת מותג", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"סימן המותג, שלם, בשקיפות של כ-6 אחוז, יושב באזור הריק של הפוטר. מעליו משפט קצר, קישורים והפרטים. זו \"חתימת הסגירה\" מתורת הקונספט: הסימן חותם את העמוד בלי לצעוק.",
  when:"מותג שיש לו סימן חזק (מונוגרמה, סמל): סטודיו, בוטיק, מסעדה, מלון, משרד. בדסקטופ בלבד. לא עם לוגו טקסטואלי ארוך, ולא כשהסימן חלש: אז ft1.",
  libs:[],
  css:`${BASE_CSS}
.ft8{position:relative;isolation:isolate;overflow:hidden;display:grid;gap:48px;padding:72px 32px 40px;background:var(--ink);color:var(--bg)}
/* the mark is whole and quiet (concept.md, closing signature): never a giant cropped logo, never behind running text */
.ft8-mark{position:absolute;z-index:-1;inset-inline-end:32px;top:40px;width:clamp(200px,24vw,300px);height:auto;opacity:0;color:var(--bg);transition:opacity 1.2s ${E}}
.ft8.is-in .ft8-mark{opacity:.06}
.ft8-top{display:grid;gap:16px;max-width:560px}
.ft8-top p{margin:0;font-size:clamp(20px,1.6vw,26px);line-height:1.4}
.ft8-row{display:flex;flex-wrap:wrap;gap:16px 48px;max-width:760px}
.ft8-row div{display:grid;gap:4px}
@media (max-width:900px){.ft8-mark{display:none}.ft8{padding:56px 20px 32px}}
@media (prefers-reduced-motion:reduce){.ft8-mark{transition:none}.ft8 .ft8-mark{opacity:.06}}`,
  html:`<div class="fx">${tail("", "הסימן חותם את העמוד בשקט, כמו חתימה בתחתית מכתב.")}
<footer class="ftw ft8" id="ft8">
  <svg class="ft8-mark" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="10"><circle cx="100" cy="100" r="88"/><path d="M70 150V52h42a28 28 0 0 1 0 56H70"/></svg>
  <div class="ft8-top ft-rv"><b style="font-size:20px">פרומה</b><p>מסעדת שף קטנה בנווה צדק. ארבעה ערבים בשבוע, תפריט אחד שמשתנה עם העונה.</p></div>
  <div class="ft8-row ft-rv" style="--i:1">
    <div><h3>שעות</h3><span>ד׳ עד ש׳, מ-19:00</span></div>
    <div><h3>הזמנות</h3>${TEL()}<a href="#ft8">הזמנת מקום אונליין</a></div>
    <div><h3>כתובת</h3><span>שבזי 20, תל אביב</span><a href="#ft8">ניווט ב-Waze</a></div>
  </div>
  ${LEGAL("פרומה")}
</footer></div>`,
  js:`${BASE_JS}
(function(){var f=document.getElementById("ft8");inView(f,function(){f.classList.add("is-in");});})();`,
  note:"הכללים מתורת הקונספט (concept.md, חתימת סגירה): הסימן שלם, 5 עד 8 אחוז, באזור ריק, בדסקטופ בלבד, ולא מאחורי טקסט רץ. לא וורדמרק ענק שנחתך בקצה המסך: זה הטרנד שנראה כמו תבנית, והוא גם נקרא כקישוט ולא כחתימה. הסימן מופיע בדהייה של 1.2 שניות כשהפוטר מגיע למסך, ב-reduced-motion הוא פשוט שם. הוא SVG עם currentColor, כך שהוא יורש את צבע הפוטר בכל עור."
},
{
  id:"ft9", cat:"footer", name:"פוטר סניפים ושפות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"כרטיס לכל סניף: עיר, כתובת, טלפון, שעות בשורה ו-Waze. ולצידם בחירת שפה (עברית, English, Русский) שמסומנת נכון לקוראי מסך.",
  when:"עסק עם יותר מכתובת אחת: רשת מרפאות, מכונים, סניפים, משרד עם שני סניפים. וכל אתר דו-לשוני או תלת-לשוני, כמו סברדלוב. עם סניף אחד, ft2.",
  libs:[],
  css:`${BASE_CSS}
.ft9{display:grid;gap:40px;padding:72px 32px 40px;background:color-mix(in srgb,var(--ink) 4%,var(--bg));color:var(--ink)}
.ft9-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:16px}
.ft9-head h2{margin:0;font-size:clamp(24px,2.2vw,34px)}
.ft9-lang{display:flex;gap:4px;padding:4px;border-radius:12px;background:var(--card)}
.ft9-lang a{min-height:40px;display:inline-flex;align-items:center;padding:0 14px;border-radius:8px;font-weight:600;font-size:14px}
.ft9-lang a[aria-current="page"]{background:var(--ink);color:var(--bg)!important}
.ft9-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.ft9-card{display:grid;gap:8px;padding:24px;border-radius:16px;background:var(--card);transition:transform .3s ${E},box-shadow .3s ${E}}
.ft9-card h3{margin:0;font-size:20px;opacity:1}
.ft9-card span{font-size:14px;color:var(--muted)}
.ft9-card .go{margin-top:8px;display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14px;color:var(--accent)!important}
.ft9-card .go svg{width:16px;height:16px}
@media (hover:hover) and (pointer:fine){.ft9-card:hover{transform:translateY(-3px);box-shadow:0 16px 40px color-mix(in srgb,var(--ink) 10%,transparent)}}
@media (max-width:900px){.ft9{padding:56px 20px 32px}.ft9-grid{grid-template-columns:1fr}}`,
  html:`<div class="fx">${tail("", "כמה כתובות וכמה שפות: הפוטר עונה על איפה, ובאיזו שפה.")}
<footer class="ftw ft9" id="ft9">
  <div class="ft9-head"><h2>שלושה מכונים, אותו צוות</h2><nav class="ft9-lang" aria-label="שפה"><a href="#ft9" aria-current="page" lang="he">עברית</a><a href="#ft9" lang="en">English</a><a href="#ft9" lang="ru">Русский</a></nav></div>
  <div class="ft9-grid">
    <div class="ft9-card"><h3>תל אביב</h3><span>אבן גבירול 90</span>${TEL("03-000-0001","+97230000001")}<span>א׳ עד ה׳, 07:00-21:00</span><a class="go" href="#ft9">ניווט ב-Waze ${ARROW}</a></div>
    <div class="ft9-card"><h3>רמת השרון</h3><span>סוקולוב 38</span>${TEL("03-000-0002","+97230000002")}<span>א׳ עד ה׳, 08:00-20:00</span><a class="go" href="#ft9">ניווט ב-Waze ${ARROW}</a></div>
    <div class="ft9-card"><h3>מודיעין</h3><span>עמק דותן 1</span>${TEL("08-000-0003","+97280000003")}<span>א׳ עד ו׳, 08:00-14:00</span><a class="go" href="#ft9">ניווט ב-Waze ${ARROW}</a></div>
  </div>
  ${LEGAL("מכוני פיזיותרפיה לדוגמה")}
</footer></div>`,
  js:`${BASE_JS}`,
  note:"בחירת השפה היא nav עם aria-current=page על השפה הנוכחית, ו-lang על כל קישור, כדי שקורא מסך יבטא את English ואת Русский נכון. שמות השפות כתובים בשפה שלהן, כי מי שמחפש רוסית לא יחפש את המילה \"רוסית\". בפרויקט כל קישור שפה מוביל לאותו עמוד בשפה השנייה, ומתווספים hreflang בראש העמוד (סקיל seo-geo). בכל כרטיס סניף יש קישור Waze נפרד, ולכל סניף עסק משלו בנתונים המובנים."
},
{
  id:"ft10", cat:"footer", name:"פוטר אמון: דירוג, תקנים ולקוחות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"שורת אמון בראש הפוטר: דירוג בגוגל עם מספר הביקורות וקישור אליהן, תקנים והסמכות, ולוגואים של לקוחות. מתחתיה הפרטים הרגילים. מי שמתלבט בתחתית העמוד מקבל את ההוכחה האחרונה.",
  when:"B2B ושירותים שבהם אמון מוכר: שילוט, קבלנות, תעשייה, IT, ביטוח, מעבדות. רק עם נתונים אמיתיים: דירוג אמיתי, הסמכה בתוקף, לקוחות שהסכימו. בלעדיהם ft1.",
  libs:[],
  css:`${BASE_CSS}
.ft10{display:grid;gap:48px;padding:0 0 40px;background:var(--ink);color:var(--bg)}
.ft10-trust{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:40px;padding:40px 32px;background:color-mix(in srgb,var(--bg) 6%,transparent)}
.ft10-rate{display:grid;gap:4px}
.ft10-rate b{font-size:44px;line-height:1}
.ft10-stars{--p:96%;width:120px;height:20px;background:linear-gradient(90deg,var(--accent) var(--p),color-mix(in srgb,var(--bg) 22%,transparent) var(--p));
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 20'%3E%3Cpath d='M12 1l3 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.2 5.8 19.6l1.4-6.8L2.1 8.1 9 7.3z'/%3E%3C/svg%3E") 0 0/24px 20px repeat-x;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 20'%3E%3Cpath d='M12 1l3 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.2 5.8 19.6l1.4-6.8L2.1 8.1 9 7.3z'/%3E%3C/svg%3E") 0 0/24px 20px repeat-x}
[dir="rtl"] .ft10-stars{transform:scaleX(-1)}
.ft10-rate a{font-size:14px;opacity:.78;text-decoration:underline!important;text-underline-offset:3px}
.ft10-side{display:grid;gap:20px}
.ft10-badges{display:flex;flex-wrap:wrap;gap:8px}
.ft10-badges span{padding:8px 14px;border-radius:10px;background:color-mix(in srgb,var(--bg) 9%,transparent);font-size:14px;font-weight:600}
.ft10-logos{display:flex;flex-wrap:wrap;align-items:center;gap:12px 32px;font-weight:700;font-size:18px;opacity:.55;letter-spacing:.02em}
.ft10-row{display:flex;flex-wrap:wrap;gap:16px 48px;padding:0 32px}
.ft10 .ft-legal{padding:0 32px}
@media (max-width:900px){.ft10-trust{grid-template-columns:1fr;padding:32px 20px}.ft10-row,.ft10 .ft-legal{padding:0 20px}}`,
  html:`<div class="fx">${tail("", "מי שמתלבט בתחתית העמוד מקבל את ההוכחה האחרונה, לא עוד הבטחה.")}
<footer class="ftw ft10" id="ft10">
  <div class="ft10-trust">
    <div class="ft10-rate"><b>4.8</b><span class="ft10-stars" style="--p:96%" role="img" aria-label="דירוג 4.8 מתוך 5"></span><a href="#ft10" rel="noopener">126 ביקורות בגוגל</a></div>
    <div class="ft10-side"><div class="ft10-badges"><span>ISO 9001</span><span>מכון התקנים</span><span>קבלן רשום 2-ג׳</span><span>אחריות 5 שנים</span></div>
      <div class="ft10-logos" role="group" aria-label="לקוחות"><span>חברה לדוגמה</span><span>Client Co</span><span>עירייה לדוגמה</span><span>Expo Demo</span></div></div>
  </div>
  <div class="ft10-row"><span>${TEL()}</span><span>הרצל 12, יהוד</span><a href="#ft10">פרויקטים</a><a href="#ft10">לקוחות</a><a href="#ft10">צור קשר</a></div>
  ${LEGAL("שילוט לדוגמה")}
</footer></div>`,
  js:`${BASE_JS}`,
  note:"הכוכבים הם מסכה של SVG על רצועה בגרדיאנט: --p קובע כמה מהם מלאים (4.8 = 96%), כך שאין אייקוני ספרייה ואין אמוג'י, והצבע יורש את העור. ב-RTL הם מתמלאים מימין (scaleX -1). לקורא מסך יש aria-label אחד, \"דירוג 4.8 מתוך 5\", ולא חמישה כוכבים. חובה בפרויקט: הדירוג ומספר הביקורות אמיתיים ומקושרים לפרופיל בגוגל, ההסמכות בתוקף, והלוגואים של לקוחות שהסכימו. נתון מומצא כאן הוא בדיוק מה שמוריד אמון."
}
];
