// סבב חמישי על גלריית Webflow (3.9.2026): שלוש טכניקות GSAP שחזרו בגלריה ולא היו במאגר.
export default [
{
  id:"g49", cat:"gsap", name:"וידאו שמתקדם עם הגלילה", tech:"GSAP · ScrollTrigger · currentTime", status:"ממתין",
  desc:"סרטון שלא מתנגן לבד: הגלילה היא שמזיזה אותו קדימה ואחורה, פריים אחרי פריים. עוצרים והוא עוצר, גוללים אחורה והוא חוזר.",
  when:"הדגמת מוצר מכל הזוויות, תהליך ייצור, לפני ואחרי, אנימציית מותג. הרגע שבו המבקר מבין שהוא שולט במה שקורה על המסך.",
  libs:["gsap","ScrollTrigger"],
  css:`.vs{position:relative;height:320vh}
.vs-stick{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden;background:#0e0f16}
.vs-video{width:min(92vw,960px);border-radius:var(--r);display:block}
.vs-cap{position:absolute;inset-inline:0;bottom:8vh;text-align:center;color:#fff;pointer-events:none}
.vs-cap b{display:block;font-size:clamp(22px,3.4vw,42px);margin-bottom:6px}
.vs-cap span{font-size:15px;opacity:.75}
.vs-bar{position:absolute;inset-inline:0;bottom:0;height:4px;background:rgba(255,255,255,.15)}
.vs-bar i{display:block;height:100%;width:0;background:var(--accent)}
.vs-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="vs">
  <div class="vs-stick">
    <video class="vs-video" src="../assets/media/scrub.mp4" poster="../assets/media/scrub.jpg"
           muted playsinline preload="auto" aria-label="הדגמה: וידאו שמתקדם עם הגלילה"></video>
    <div class="vs-cap"><b>הגלילה היא הנגן</b><span>גלול למטה ולמעלה. הסרטון עוקב.</span></div>
    <div class="vs-bar"><i></i></div>
  </div>
</div>
<p class="vs-after">בסרטון אמיתי זה יהיה מוצר שמסתובב, מכונה שעובדת או בית שנבנה. הקובץ חייב להיות מקודד לחיפוש מהיר, אחרת התנועה מקרטעת.</p>`,
  js:`(function(){
  const v=document.querySelector(".vs-video"),bar=document.querySelector(".vs-bar i");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let target=0,current=0,dur=0,ready=false;
  function start(){
    dur=v.duration||0; if(!dur)return;
    ready=true;
    ScrollTrigger.create({
      trigger:".vs",start:"top top",end:"bottom bottom",scrub:true,
      onUpdate:self=>{target=self.progress*dur;bar.style.width=(self.progress*100).toFixed(1)+"%";}
    });
    ScrollTrigger.refresh();
  }
  v.addEventListener("loadedmetadata",start);
  if(v.readyState>=1)start();
  // iOS לא מרשה קפיצה בזמן לפני שהווידאו התנגן פעם אחת, ולכן דוחפים play ומיד pause
  const kick=()=>{const p=v.play();if(p&&p.then)p.then(()=>v.pause()).catch(()=>{});};
  addEventListener("touchstart",kick,{once:true,passive:true});
  addEventListener("click",kick,{once:true});
  // החלקה: מתקרבים אל היעד בהדרגה במקום להציב currentTime בכל אירוע גלילה
  gsap.ticker.add(()=>{
    if(!ready)return;
    if(reduce){v.currentTime=target;return;}
    current+=(target-current)*.18;
    if(Math.abs(target-current)<.004)current=target;
    if(v.seeking)return;
    v.currentTime=current;
  });
})();`,
  runway:false,
  note:"הטכניקה עצמה קצרה, וכל ההצלחה תלויה בקובץ. **הכלל**: מקודדים את הסרטון עם כל פריים כ-keyframe (`-g 1 -keyint_min 1 -sc_threshold 0`), אחרת כל קפיצה בזמן מחייבת את הדפדפן לפענח מהמפתח הקודם והתנועה נתקעת. הסרטון כאן נוצר בדיוק כך, ולכן הוא כבד יחסית לאורכו. שני דברים נוספים: לא מציבים `currentTime` ישירות מה-onUpdate אלא מתקרבים אליו ב-ticker, אחרת רואים קפיצות; ובאייפון אין הרשאה לקפוץ בזמן עד שהווידאו התנגן פעם אחת, ומכאן ה-play שמיד עוצר. `muted` ו-`playsinline` הם תנאי סף. **ומלכודת שנתפסה כאן באימות**: השרת חייב לתמוך ב-Range requests (תשובה 206). בלעדיה הדפדפן לא יכול לדלג בזמן, `seeking` נתקע על true והסרטון קפוא על הפריים הראשון בלי שום הודעת שגיאה. GitHub Pages ורוב האחסונים תומכים, אבל שווה לבדוק אחרי העלאה לשרת של לקוח."
},
{
  id:"g50", cat:"gsap", name:"וילון מעבר בין עמודים", tech:"GSAP · timeline", status:"ממתין",
  desc:"לחיצה על קישור לא מכבה את המסך: וילון עולה, מכסה, ורק אז העמוד מתחלף. בטעינה הוא יורד חזרה, כך שהמעבר מרגיש רציף ולא כמו ניתוק.",
  when:"אתר תדמית רב-עמודי, תיק עבודות, בלוג, חנות. הדפוס הכי נפוץ בגלריה, והוא מה שמפריד בין אתר שמרגיש כמו אפליקציה לאתר שמרגיש כמו אוסף קבצים.",
  libs:["gsap"],
  css:`.pt-page{min-height:64vh;display:grid;place-items:center;text-align:center;padding:8vh var(--gutter)}
.pt-page h3{font-size:clamp(28px,5vw,62px);margin:0 0 12px}
.pt-page p{color:var(--muted);font-size:17px;line-height:1.8;max-width:44ch;margin:0 auto 24px}
.pt-nav{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.pt-nav a{padding:11px 20px;border-radius:999px;border:1px solid var(--line);background:var(--card);
  color:var(--ink);text-decoration:none;font-size:15px}
.pt-nav a.on{background:var(--ink);border-color:var(--ink);color:#fff}
/* הוילון: ארבע רצועות שעולות בהפרש קטן, כך שהכיסוי מרגיש כמו תנועה ולא כמו מסך שנדלק */
.pt-curtain{position:fixed;inset:0;z-index:90;pointer-events:none;display:grid;grid-template-columns:repeat(4,1fr)}
.pt-curtain i{background:var(--ink);transform:translateY(101%)}
.pt-label{position:fixed;inset:0;z-index:91;display:grid;place-items:center;color:#fff;font-size:clamp(22px,4vw,44px);
  font-weight:800;opacity:0;pointer-events:none}`,
  html:`<div class="stage tight"><div class="pt-page" id="pt-view">
  <div>
    <h3>אתרי תדמית</h3>
    <p>לחץ על אחד הקישורים. הוילון עולה, התוכן מתחלף מאחוריו, והוילון יורד.</p>
    <nav class="pt-nav">
      <a href="#" data-t="אתרי תדמית" class="on">אתרי תדמית</a>
      <a href="#" data-t="דפי נחיתה">דפי נחיתה</a>
      <a href="#" data-t="חנויות">חנויות</a>
      <a href="#" data-t="צור קשר">צור קשר</a>
    </nav>
  </div>
</div></div>
<div class="pt-curtain"><i></i><i></i><i></i><i></i></div>
<div class="pt-label"></div>`,
  js:`(function(){
  const bars=gsap.utils.toArray(".pt-curtain i"),label=document.querySelector(".pt-label");
  const view=document.querySelector("#pt-view");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D=reduce?0:.5;
  function cover(text){
    label.textContent=text;                      // קודם הטקסט, אחר כך החשיפה. אחרת רואים לרגע את השם הקודם
    return gsap.timeline()
      .to(bars,{yPercent:-101,duration:D,ease:"power3.inOut",stagger:.05})
      .to(label,{opacity:1,duration:D*.5},"-="+D*.5);
  }
  function reveal(){
    return gsap.timeline()
      .to(label,{opacity:0,duration:D*.4})
      .to(bars,{yPercent:-202,duration:D,ease:"power3.inOut",stagger:.05},"-="+D*.2)
      .set(bars,{yPercent:101});     // מחזירים למטה בלי אנימציה, מוכנים למעבר הבא
  }
  document.querySelectorAll(".pt-nav a").forEach(a=>{
    a.addEventListener("click",e=>{
      e.preventDefault();
      if(a.classList.contains("on"))return;
      document.querySelectorAll(".pt-nav a").forEach(x=>x.classList.toggle("on",x===a));
      gsap.timeline()
        .add(cover(a.dataset.t))
        // כאן, מתחת לוילון, מחליפים תוכן. באתר אמיתי: location.href=a.href
        .add(()=>{view.querySelector("h3").textContent=a.dataset.t;scrollTo(0,0);})
        .add(reveal());
    });
  });
  gsap.set(bars,{yPercent:101});
})();`,
  runway:false,
  note:"באתר רב-עמודי אמיתי מחליפים את שורת החלפת התוכן ב-`location.href=a.href`, ובטעינת העמוד החדש מריצים רק את `reveal()` כשהוילון מתחיל במצב מכסה. שתי מלכודות: צריך לדלג על קישורים חיצוניים, על עוגנים ועל לחיצה עם Ctrl או עם גלגל, אחרת שוברים פתיחה בלשונית חדשה; ובחזרה עם כפתור אחורה הדפדפן מחזיר את העמוד מהמטמון בלי טעינה, ולכן חייבים להאזין ל-`pageshow` ולהריץ שם `reveal()` גם כן, אחרת הוילון נשאר תקוע על המסך. ההשהיה בין הרצועות היא מה שמייצר את התחושה; וילון אחד שעולה במלואו נראה כמו מסך שנדלק."
},
{
  id:"g51", cat:"gsap", name:"שתי עמודות שנעות בכיוונים הפוכים", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"קיר תמונות שבו עמודה אחת עולה עם הגלילה והשנייה יורדת. תנועה קטנה שהופכת גריד סטטי לרקע חי, בלי לגזול תשומת לב מהטקסט.",
  when:"קיר עבודות, גלריית מוצרים, לוגואים של לקוחות, תמונות צוות, רקע לסקשן המלצות. עובד גם כשיש רק שש תמונות.",
  libs:["gsap","ScrollTrigger"],
  css:`.oc{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,1.4vw,20px);
  max-width:min(1080px,94vw);margin-inline:auto;align-items:start}
.oc-col{display:grid;gap:clamp(10px,1.4vw,20px);will-change:transform}
.oc-col .ph{aspect-ratio:3/4;font-size:0;border-radius:14px}
.oc-col:nth-child(2) .ph{aspect-ratio:4/5}
.oc-head{text-align:center;max-width:44ch;margin:0 auto clamp(24px,4vw,46px)}
.oc-head h3{font-size:clamp(24px,3.4vw,44px);margin:0 0 10px}
.oc-head p{color:var(--muted);font-size:17px;line-height:1.8;margin:0}
@media(max-width:700px){.oc{grid-template-columns:1fr 1fr}.oc-col:nth-child(3){display:none}}`,
  html:`<div class="stage"><div class="oc-head"><h3>קיר העבודות</h3>
  <p>גלול. העמודות נעות בכיוונים הפוכים, והקיר מקבל עומק בלי אנימציה שצועקת.</p></div>
<div class="oc">
  <div class="oc-col"><div class="ph ph-a"></div><div class="ph ph-c"></div><div class="ph ph-d"></div><div class="ph ph-e"></div></div>
  <div class="oc-col"><div class="ph ph-b"></div><div class="ph ph-f"></div><div class="ph ph-a"></div><div class="ph ph-c"></div></div>
  <div class="oc-col"><div class="ph ph-d"></div><div class="ph ph-e"></div><div class="ph ph-b"></div><div class="ph ph-f"></div></div>
</div></div>`,
  js:`(function(){
  // רק במסכים שיש בהם מקום לתנועה. במובייל זה מייצר חורים בפריסה
  gsap.matchMedia().add("(min-width: 700px) and (prefers-reduced-motion: no-preference)",()=>{
    const cols=gsap.utils.toArray(".oc-col");
    const tw=cols.map((col,i)=>{
      const dir=i%2?1:-1;                       // אי-זוגית יורדת, זוגית עולה
      return gsap.fromTo(col,{yPercent:6*dir},{yPercent:-6*dir,ease:"none",
        scrollTrigger:{trigger:".oc",start:"top bottom",end:"bottom top",scrub:1.2}});
    });
    return ()=>tw.forEach(t=>{t.scrollTrigger&&t.scrollTrigger.kill();t.kill();});
  });
})();`,
  runway:true,
  note:"שלוש הכרעות שמונעות מהמהלך להיראות זול: התנועה ביחידות אחוז ולא בפיקסלים, ולכן היא מתכווצת מעצמה במסכים קטנים; הטווח קטן בכוונה, שישה אחוזים לכל כיוון, כי מעבר לזה נוצרים חורים בקצוות הקיר; וה-scrub מושהה מעט כדי שהעמודות ימשיכו רגע אחרי שעוצרים לגלול. `gsap.matchMedia` מכבה את הכל במובייל ובמצב חיסכון בתנועה, ומנקה אחריו כשחוזרים לרוחב אחר."
},
];
