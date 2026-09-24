// שישה מהלכים שחסרו במאגר, לפי מאגר הטמפלייטים של academy.shiruziel.com (24.9.2026, ליאב: "תבנה את כל השישה").
// שחזור התנהגות בלבד, מאפס, בטוקנים שלנו: נצפה בתצוגה המקדימה הפתוחה, הקוד שלה לא נפתח (gsap/_intake.md, כללי רישוי).
// מתוך 71 טמפלייטים, כ-57 כבר היו אצלנו בשם אחר. אלה השישה שחסרו ושמתאימים להרבה עסקים.
export default [
{
  id:"b67", cat:"behavior", name:"גלולה תחתונה שנפתחת לתפריט", tech:"CSS clip-path · JS", status:"ממתין",
  desc:"בתחתית המסך גלולה קטנה עם שם הסקשן שבו הגולש נמצא ועם כפתור תפריט. לחיצה מותחת את הגלולה למעלה לכרטיס ניווט, והקישורים עולים לתוכו בזה אחר זה. שם הסקשן מתגלגל כשעוברים סקשן, והגלולה יורדת מהדרך בגלילה למטה וחוזרת בגלילה למעלה.",
  when:"אתר שרוב הגולשים שלו בטלפון: קליניקה, מסעדה, סטודיו, נותן שירות. התפריט נמצא באזור האגודל במקום בפינה העליונה, והגולש תמיד יודע איפה הוא בעמוד. לא לאתר עם יותר משבעה קישורים ראשיים, ולא כשכבר יש פס פעולה תחתון (cv1): שניהם יתחרו על אותו מקום.",
  libs:[],
  css:`.bn{display:grid;place-items:center}
.bn-phone{position:relative;width:min(390px,100%);height:min(78vh,760px);border-radius:40px;overflow:hidden;background:var(--bg);isolation:isolate;
  box-shadow:0 0 0 10px var(--ink),0 32px 64px color-mix(in srgb,var(--ink) 24%,transparent)}
.bn-scr{height:100%;overflow:auto;overscroll-behavior:contain;scrollbar-width:none}
.bn-scr::-webkit-scrollbar{display:none}
.bn-sec{padding:32px 24px 40px}
.bn-sec:first-child{padding-top:56px}
.bn-sec:last-child{padding-bottom:112px}
.bn-sec h3{margin:0 0 8px;font-size:26px;line-height:1.15}
.bn-sec p{margin:0 0 16px;color:var(--muted);font-size:16px;line-height:1.6}
.bn-img{height:180px;margin-bottom:20px;border-radius:18px}
/* כהות מתחת לכרטיס הפתוח: לחיצה עליה סוגרת */
.bn-scrim{position:absolute;inset:0;z-index:4;background:color-mix(in srgb,var(--ink) 38%,transparent);opacity:0;pointer-events:none;transition:opacity .35s cubic-bezier(.2,.6,.2,1)}
.bn.open .bn-scrim{opacity:1;pointer-events:auto}
/* משטח אחד: clip-path חותך ממנו את הגלולה בתחתית. הצל על ההורה, כי clip-path חותך גם צל */
.bn-nav{--pw:204px;--ph:56px;position:absolute;inset-inline:16px;bottom:16px;z-index:5;
  filter:drop-shadow(0 14px 22px color-mix(in srgb,var(--ink) 30%,transparent));transition:transform .45s cubic-bezier(.2,.6,.2,1)}
.bn.hide .bn-nav{transform:translateY(calc(var(--ph) + 24px))}
.bn-sheet{background:var(--ink);color:var(--bg);border-radius:28px;
  clip-path:inset(calc(100% - var(--ph)) calc(50% - var(--pw) / 2) 0 round 28px);transition:clip-path .5s cubic-bezier(.76,0,.24,1)}
.bn.open .bn-sheet{clip-path:inset(0 0 0 round 28px)}
.bn-links{list-style:none;margin:0;padding:24px 16px 8px;display:grid;gap:4px}
.bn-links a,.bn-cta{opacity:0;transform:translateY(16px);transition:opacity .15s,transform .15s,background-color .2s}
.bn.open .bn-links a,.bn.open .bn-cta{opacity:1;transform:none;
  transition:opacity .35s calc(var(--i) * 60ms + 180ms),transform .45s calc(var(--i) * 60ms + 180ms) cubic-bezier(.2,.6,.2,1),background-color .2s}
.bn-links a{display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:14px;font-size:22px;font-weight:600;color:inherit}
@media (hover:hover) and (pointer:fine){.bn-links a:hover{background:color-mix(in srgb,var(--bg) 10%,transparent)}}
.bn-links a:focus-visible,.bn-cta:focus-visible,.bn-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.bn-links a[aria-current]::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}
.bn-cta{display:flex;justify-content:center;margin:8px 16px 12px;padding:14px 20px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700}
.bn-bar{height:var(--ph);display:flex;justify-content:center}
.bn-bar-in{width:var(--pw);display:flex;align-items:center;justify-content:space-between;padding-inline:20px 6px}
.bn-where{display:flex;align-items:center;gap:8px;min-width:0;height:24px;overflow:hidden;font-size:15px;font-weight:600}
.bn-dot{flex:none;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.bn-label{display:block;white-space:nowrap}
.bn-label.roll{animation:bn-roll .4s cubic-bezier(.2,.6,.2,1)}
@keyframes bn-roll{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}
.bn-btn{position:relative;flex:none;width:44px;height:44px;border:0;border-radius:50%;background:color-mix(in srgb,var(--bg) 14%,transparent);display:grid;place-items:center;cursor:pointer;transition:background-color .2s}
.bn-btn i{position:absolute;width:18px;height:2px;border-radius:2px;background:var(--bg);transition:transform .35s cubic-bezier(.76,0,.24,1)}
.bn-btn i:first-child{transform:translateY(-4px)}
.bn-btn i:last-child{transform:translateY(4px)}
.bn.open .bn-btn i:first-child{transform:rotate(45deg)}
.bn.open .bn-btn i:last-child{transform:rotate(-45deg)}
@media (prefers-reduced-motion: reduce){.bn-sheet,.bn-nav,.bn-scrim,.bn-links a,.bn-cta,.bn-btn i{transition-duration:.01ms;transition-delay:0s}.bn-label.roll{animation:none}}`,
  html:`<div class="stage tight"><div class="bn">
  <div class="bn-phone">
    <div class="bn-scr" tabindex="0" aria-label="תצוגת טלפון">
      <section class="bn-sec" id="bn-s1" data-label="ראשי"><div class="bn-img ph ph-a"></div><h3>סטודיו לעיצוב פנים</h3><p>בתים שנבנים סביב מי שגר בהם: אור, אחסון, ומקום לשבת ביחד. מהסקיצה הראשונה ועד שהמפתח אצלכם.</p><p>גללו למטה, ושימו לב לשם הסקשן בגלולה.</p></section>
      <section class="bn-sec" id="bn-s2" data-label="שירותים"><h3>מה אנחנו עושים</h3><p>תכנון דירה מלא, שיפוץ מטבח ואמבטיה, ובחירת חומרים וריהוט.</p><div class="bn-img ph ph-b"></div><p>כל פרויקט מתחיל בביקור אצלכם ובשיחה על איך אתם חיים ביום רגיל.</p></section>
      <section class="bn-sec" id="bn-s3" data-label="פרויקטים"><h3>עבודות אחרונות</h3><div class="bn-img ph ph-c"></div><p>דירת גן ברמת גן, פנטהאוז בחיפה, ובית משפחה בגבעתיים.</p><div class="bn-img ph ph-d"></div></section>
      <section class="bn-sec" id="bn-s4" data-label="אודות"><h3>מי אנחנו</h3><p>שתי מעצבות, תשע שנים ביחד, ויותר ממאה בתים שגרים בהם היום.</p><div class="bn-img ph ph-e"></div></section>
      <section class="bn-sec" id="bn-s5" data-label="צור קשר"><h3>בואו נדבר</h3><p>ספרו לנו על הבית, ונחזור אליכם עם הצעה לפגישת היכרות.</p></section>
    </div>
    <div class="bn-scrim"></div>
    <nav class="bn-nav" aria-label="ניווט ראשי">
      <div class="bn-sheet">
        <div class="bn-card" id="bn-card">
          <ul class="bn-links">
            <li><a href="#bn-s1" style="--i:0">ראשי</a></li>
            <li><a href="#bn-s2" style="--i:1">שירותים</a></li>
            <li><a href="#bn-s3" style="--i:2">פרויקטים</a></li>
            <li><a href="#bn-s4" style="--i:3">אודות</a></li>
          </ul>
          <a class="bn-cta" href="#bn-s5" style="--i:4">לתיאום פגישת היכרות</a>
        </div>
        <div class="bn-bar"><div class="bn-bar-in">
          <span class="bn-where"><span class="bn-dot" aria-hidden="true"></span><span class="bn-label">ראשי</span></span>
          <button class="bn-btn" type="button" aria-expanded="false" aria-controls="bn-card" aria-label="פתיחת התפריט"><i></i><i></i></button>
        </div></div>
      </div>
    </nav>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".bn"),scr=root.querySelector(".bn-scr"),card=root.querySelector(".bn-card");
  const btn=root.querySelector(".bn-btn"),scrim=root.querySelector(".bn-scrim"),label=root.querySelector(".bn-label");
  const links=[...root.querySelectorAll(".bn-links a")],cta=root.querySelector(".bn-cta"),secs=[...root.querySelectorAll(".bn-sec")];
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isOpen=()=>root.classList.contains("open");
  card.inert=true;
  function set(open){
    root.classList.toggle("open",open);root.classList.remove("hide");
    btn.setAttribute("aria-expanded",String(open));
    btn.setAttribute("aria-label",open?"סגירת התפריט":"פתיחת התפריט");
    card.inert=!open;scr.inert=open; // בזמן שהתפריט פתוח, הדף מתחת לא נגיש ולא לחיץ
    if(open)(links.find(a=>a.hasAttribute("aria-current"))||links[0]).focus({preventScroll:true});
  }
  btn.addEventListener("click",()=>set(!isOpen()));
  scrim.addEventListener("click",()=>set(false));
  root.addEventListener("keydown",e=>{if(e.key==="Escape"&&isOpen()){set(false);btn.focus();}});
  links.concat(cta).forEach(a=>a.addEventListener("click",e=>{
    const t=root.querySelector(a.getAttribute("href"));if(!t)return;
    e.preventDefault();set(false);
    scr.scrollTo({top:t.offsetTop,behavior:reduced?"auto":"smooth"});
  }));
  // שם הסקשן הנוכחי בגלולה, וסימון הקישור שלו בכרטיס
  let cur=-1;
  function mark(i){
    if(i<0||i===cur)return;cur=i;
    label.textContent=secs[i].dataset.label;
    if(!reduced){label.classList.remove("roll");void label.offsetWidth;label.classList.add("roll");}
    links.forEach((a,k)=>{if(k===i)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current");});
  }
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)mark(secs.indexOf(e.target));}),{root:scr,rootMargin:"-40% 0px -55% 0px"});
  secs.forEach(s=>io.observe(s));
  mark(0);
  // יורדת מהדרך בגלילה למטה, חוזרת בגלילה למעלה ובסוף העמוד (שם נמצא הצעד הבא)
  let last=0;
  scr.addEventListener("scroll",()=>{
    const y=scr.scrollTop,d=y-last;last=y;
    if(isOpen())return;
    const end=scr.scrollHeight-y-scr.clientHeight<40;
    if(d>6&&y>80&&!end)root.classList.add("hide");
    else if(d<-6||end)root.classList.remove("hide");
  },{passive:true});
})();`,
  runway:false,
  note:"החלטות שעושות את זה שימושי ולא רק יפה: (1) משטח אחד שנחתך ב-clip-path, ולא שתי קופסאות שמתחלפות. לכן הגלולה ממש נמתחת לכרטיס, ושום דבר לא קופץ. inset עם round נותן פינות עגולות לכל אורך המעבר. (2) הצל יושב על ההורה כ-drop-shadow, כי clip-path חותך box-shadow. (3) הקישורים בכרטיס סגור מקבלים inert: הם קיימים ב-DOM אבל לא בסדר ה-Tab. כשהכרטיס פתוח, הדף שמתחת מקבל inert והכהות סוגרת בלחיצה, ו-Escape מחזיר את הפוקוס לכפתור. (4) שם הסקשן מתחלף ב-IntersectionObserver עם שוליים של 40/55 אחוז, כך שהוא משתנה כשהסקשן באמת במרכז ולא כשנוגעים בו. (5) הגלולה יורדת רק אחרי 80 פיקסלים של גלילה ובקפיצה של יותר משישה, כדי שלא תרעד. בסוף העמוד היא חוזרת תמיד, כי שם הגולש מחפש מה לעשות הלאה. באתר אמיתי: הגלולה position:fixed ביחס לחלון, והגלילה על window במקום על .bn-scr.",
},
{
  id:"g150", cat:"gsap", name:"אקורדיון שנפתח בגלילה", tech:"GSAP · ScrollTrigger pin", status:"ממתין",
  desc:"רשימת שלבים או שירותים לצד תמונה. בגלילה הסקשן ננעל, והשלב הפעיל נפתח: הכותרת שלו מתכהה, התיאור נפתח מתחתיו, פס דק מתמלא לפי ההתקדמות, והתמונה מתחלפת בחשיפה מלמטה. לחיצה על שלב גוללת אליו. בטלפון זה אקורדיון רגיל בלחיצה, עם תמונה בתוך כל שלב.",
  when:"תהליך עבודה של ארבעה עד חמישה שלבים, או ארבעה שירותים שלכל אחד תמונה משלו: משרד אדריכלים, קבלן שיפוצים, קליניקה, יועץ. עובד כשיש לכל שלב משפט אחד או שניים. לא לשמונה שלבים (הנעילה מתארכת מעבר לתקציב של קצב העמוד), ולא לשאלות נפוצות.",
  libs:["gsap","ScrollTrigger"],
  css:`.sa{padding:var(--sec) var(--gutter)}
.sa-head{max-width:52ch;margin:0 0 clamp(32px,4vw,64px)}
.sa-head h2{margin:0 0 12px;font-size:var(--fs-h2)}
.sa-head p{margin:0;color:var(--muted)}
.sa-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(32px,5vw,96px);align-items:center;min-height:min(80vh,700px)}
.sa-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.sa-item{padding-block:16px}
.sa-q{display:flex;align-items:baseline;gap:16px;width:100%;padding:0;border:0;background:none;font:inherit;color:inherit;text-align:start;cursor:pointer}
.sa-q:focus-visible{outline:2px solid var(--accent);outline-offset:6px;border-radius:6px}
.sa-n{flex:none;width:24px;font-size:15px;font-weight:600;color:var(--muted);font-variant-numeric:tabular-nums;transition:color .35s}
.sa-t{font-size:clamp(22px,2vw,34px);font-weight:600;line-height:1.15;color:color-mix(in srgb,var(--ink) 40%,var(--bg));transition:color .4s cubic-bezier(.2,.6,.2,1)}
.sa-item.on .sa-t{color:var(--ink)}
.sa-item.on .sa-n{color:var(--ink)}
/* הפס הוא המידע (כמה נשאר מהשלב), לא קישוט: הוא קיים רק מתחת לשלב הפתוח. מתחת לכל שלב הוא היה ארבעה קווים ברצף */
.sa-bar{display:block;height:2px;margin-top:12px;margin-inline-start:40px;border-radius:2px;overflow:hidden;background:transparent;transition:background-color .4s}
.sa-item.on .sa-bar{background:color-mix(in srgb,var(--ink) 10%,transparent)}
.sa-bar i{display:block;height:100%;background:var(--accent);transform:scaleX(0);transform-origin:right;transition:transform .6s cubic-bezier(.2,.6,.2,1),opacity .3s}
.sa-item.on .sa-bar i{transform:scaleX(1)}
.sa-item:not(.on) .sa-bar i{opacity:0}
.sa-p{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.6,.2,1)}
.sa-item.on .sa-p{grid-template-rows:1fr}
.sa-p>div{overflow:hidden}
.sa-p p{margin:0;padding-top:12px;padding-inline-start:40px;max-width:46ch;color:var(--muted);font-size:17px;line-height:1.6;opacity:0;transform:translateY(8px);transition:opacity .2s,transform .2s}
.sa-item.on .sa-p p{opacity:1;transform:none;transition:opacity .4s .15s,transform .5s .15s cubic-bezier(.2,.6,.2,1)}
.sa-thumb{display:none}
.sa-media{position:relative;width:100%;aspect-ratio:4/5;max-height:min(72vh,640px);border-radius:24px;overflow:hidden;justify-self:center}
.sa-img{position:absolute;inset:0;border-radius:0;clip-path:inset(100% 0 0 0);transform:scale(1.08);transition:clip-path .7s cubic-bezier(.76,0,.24,1),transform 1s cubic-bezier(.2,.6,.2,1)}
.sa-img.was{clip-path:inset(0);transform:none;z-index:1}
.sa-img.on{clip-path:inset(0);transform:none;z-index:2}
@media (max-width:1023px){
  .sa-pin{grid-template-columns:1fr;min-height:0}
  .sa-media{display:none}
  .sa-thumb{display:block;height:200px;margin:16px 0 8px;margin-inline-start:40px;border-radius:16px}
}
@media (prefers-reduced-motion: reduce){.sa-p,.sa-p p,.sa-img,.sa-t,.sa-n,.sa-bar i{transition-duration:.01ms;transition-delay:0s}}`,
  html:`<section class="sa">
  <header class="sa-head"><h2>מהשיחה הראשונה ועד המפתח</h2><p>ארבעה שלבים, וכל אחד נפתח כשמגיעים אליו.</p></header>
  <div class="sa-pin">
    <ol class="sa-list">
      <li class="sa-item"><button class="sa-q" type="button" aria-expanded="false" aria-controls="sa-p1"><span class="sa-n">01</span><span class="sa-t">פגישת היכרות</span></button><span class="sa-bar" aria-hidden="true"><i></i></span>
        <div class="sa-p" id="sa-p1"><div><p>באים אליכם הביתה, מקשיבים איך אתם חיים ביום רגיל, ומודדים. יוצאים עם רשימת צרכים ותקציב שמוסכם על כולם.</p><div class="sa-thumb ph ph-a"></div></div></div></li>
      <li class="sa-item"><button class="sa-q" type="button" aria-expanded="false" aria-controls="sa-p2"><span class="sa-n">02</span><span class="sa-t">תכנון והדמיה</span></button><span class="sa-bar" aria-hidden="true"><i></i></span>
        <div class="sa-p" id="sa-p2"><div><p>תוכנית עבודה, חומרים ותאורה, והדמיה של כל חדר. משנים כמה שצריך, עד שאתם רואים את עצמכם גרים שם.</p><div class="sa-thumb ph ph-b"></div></div></div></li>
      <li class="sa-item"><button class="sa-q" type="button" aria-expanded="false" aria-controls="sa-p3"><span class="sa-n">03</span><span class="sa-t">ביצוע בשטח</span></button><span class="sa-bar" aria-hidden="true"><i></i></span>
        <div class="sa-p" id="sa-p3"><div><p>מנהלת פרויקט אחת מולכם ומול כל בעלי המקצוע. עדכון בכל שבוע, עם תמונות ולוח זמנים.</p><div class="sa-thumb ph ph-c"></div></div></div></li>
      <li class="sa-item"><button class="sa-q" type="button" aria-expanded="false" aria-controls="sa-p4"><span class="sa-n">04</span><span class="sa-t">מסירה ואחריות</span></button><span class="sa-bar" aria-hidden="true"><i></i></span>
        <div class="sa-p" id="sa-p4"><div><p>עוברים יחד על כל פרט לפני שנכנסים. שנה של אחריות, ומספר טלפון אחד לכל שאלה.</p><div class="sa-thumb ph ph-d"></div></div></div></li>
    </ol>
    <div class="sa-media" aria-hidden="true"><div class="sa-img ph ph-a"></div><div class="sa-img ph ph-b"></div><div class="sa-img ph ph-c"></div><div class="sa-img ph ph-d"></div></div>
  </div>
</section>`,
  js:`(function(){
  gsap.registerPlugin(ScrollTrigger);
  const root=document.querySelector(".sa"),items=[...root.querySelectorAll(".sa-item")],imgs=[...root.querySelectorAll(".sa-img")];
  const bars=items.map(it=>it.querySelector(".sa-bar i")),n=items.length;
  let cur=-1,st=null;
  function show(i){
    if(i===cur)return;const prev=cur;cur=i;
    items.forEach((it,k)=>{it.classList.toggle("on",k===i);it.querySelector(".sa-q").setAttribute("aria-expanded",String(k===i));});
    // התמונה הקודמת נשארת מתחת, כדי שהחדשה נחשפת מעליה ולא מעל חור
    imgs.forEach((im,k)=>{im.classList.toggle("on",k===i);im.classList.toggle("was",k===prev);});
  }
  items.forEach((it,i)=>it.querySelector(".sa-q").addEventListener("click",()=>{
    if(!st){show(i);return;}
    // במצב נעול, לחיצה גוללת לאמצע הקטע של השלב, והגלילה עצמה פותחת אותו
    const y=st.start+(st.end-st.start)*(i+.5)/n;
    window.scrollTo({top:y,behavior:"smooth"});
  }));
  const mm=gsap.matchMedia();
  mm.add("(min-width:1024px) and (prefers-reduced-motion: no-preference)",()=>{
    st=ScrollTrigger.create({trigger:root.querySelector(".sa-pin"),start:"center center",end:"+="+(n*55)+"%",pin:true,anticipatePin:1,
      onUpdate:self=>{
        const p=self.progress*n;
        show(Math.min(n-1,Math.floor(p)));
        bars.forEach((b,k)=>gsap.set(b,{scaleX:gsap.utils.clamp(0,1,p-k),transition:"none"}));
      }});
    return()=>{st=null;gsap.set(bars,{clearProps:"transform,transition"});};
  });
  show(0);
})();`,
  runway:true,
  note:"הנעילה מתוקצבת: 55 אחוז מגובה המסך לכל שלב, כלומר 2.2 מסכים לארבעה שלבים, מתחת לתקרה של 2.5 בקצב העמוד (engine/spacing-and-axes.md). השלב הפעיל נקבע מהתקדמות הנעילה, והפתיחה עצמה היא transition של CSS (grid-template-rows מ-0fr ל-1fr) ולא scrub, כדי שטקסט לא ייקרא כשהוא חצי פתוח. רק הפס קשור ישירות לגלילה, ולכן הוא מקבל transition:none בזמן הנעילה. במובייל ובתנועה מופחתת אין נעילה: זה אקורדיון רגיל, והתמונה עוברת לתוך כל שלב (sa-thumb), כי אין עמודה שנייה לשים אותה בה. הכפתורים נשארים כפתורים עם aria-expanded בשני המצבים, כך שגם במצב הנעול אפשר להגיע לכל שלב במקלדת.",
},
{
  id:"b68", cat:"behavior", name:"רשת נקודות שנדלקת סביב הסמן", tech:"Canvas · pointer", status:"ממתין",
  desc:"רקע של רשת נקודות קטנות בהירו. סביב הסמן הנקודות נדלקות, גדלות, נצבעות בצבע המותג ונדחפות מעט הצידה, ומשאירות אחריהן שובל שדועך. לחיצה או נגיעה שולחת גל שעובר על כל הרשת. בטלפון, ובלי סמן, נקודת אור איטית משוטטת לבד.",
  when:"הירו של חברת טכנולוגיה, סוכנות, יועץ או מוצר דיגיטלי, שרוצה חיים ברקע בלי וידאו ובלי תמונה. עובד על רקע כהה ועם טקסט קצר. לא לעסק חם וביתי (מרגיש קר), ולא מתחת לפסקה ארוכה: הנקודות הבהירות מתחת למילים פוגעות בקריאה, ולכן יש שכבת כהות מאחורי עמודת הטקסט.",
  libs:[],
  css:`.dg{position:relative;isolation:isolate;overflow:hidden;min-height:min(86vh,760px);display:grid;align-items:center;padding:clamp(48px,6vw,112px) var(--gutter);background:var(--ink);color:var(--bg)}
.dg-cv{position:absolute;inset:0;z-index:-1;width:100%;height:100%;touch-action:pan-y}
.dg-in{position:relative;max-width:40ch}
/* שכבת כהות רכה מאחורי הטקסט: נקודה בהירה אף פעם לא יושבת מתחת למילה */
.dg-in::before{content:"";position:absolute;inset:-48px -64px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in srgb,var(--ink) 90%,transparent),transparent)}
.dg-k{margin:0 0 16px;font-size:15px;font-weight:600;color:color-mix(in srgb,var(--bg) 70%,transparent)}
.dg h2{margin:0 0 16px;font-size:var(--fs-demo);line-height:1.05}
.dg-lead{margin:0 0 32px;font-size:18px;line-height:1.6;color:color-mix(in srgb,var(--bg) 78%,transparent)}
.dg-btn{display:inline-flex;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.dg-btn:hover{transform:translateY(-2px)}}
.dg-btn:focus-visible{outline:2px solid var(--bg);outline-offset:3px}`,
  html:`<section class="dg">
  <canvas class="dg-cv" aria-hidden="true"></canvas>
  <div class="dg-in">
    <p class="dg-k">סטודיו לפיתוח מוצרים</p>
    <h2>תשתית שקטה, מוצר שמרגישים</h2>
    <p class="dg-lead">אנחנו בונים מערכות שעובדות בלי שתשימו לב אליהן. הזיזו את העכבר על הרקע, או לחצו עליו.</p>
    <a class="dg-btn" href="#">לשיחת היכרות</a>
  </div>
</section>`,
  js:`(function(){
  const sec=document.querySelector(".dg"),cv=sec.querySelector(".dg-cv"),ctx=cv.getContext("2d");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GAP=24,R=170,BASE=1.2,LEVELS=12;
  let W=0,H=0,dots=[],shades=[],base="#fff",running=false,visible=false,raf=0,frames=0;
  const P={x:0,y:0,tx:0,ty:0,in:false,init:false},ripples=[];
  // הצבעים נקראים מהעור בזמן ריצה, כך שהרשת יורשת כל ערכת צבע ולא נכתבת בקוד
  const probe=document.createElement("canvas").getContext("2d");
  function hex(c){probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;if(h[0]!=="#")return [255,255,255];return [1,3,5].map(k=>parseInt(h.slice(k,k+2),16));}
  function colors(){
    const cs=getComputedStyle(sec),a=hex(cs.color),b=hex(cs.getPropertyValue("--accent").trim()||cs.color);
    base="rgb("+a.join(",")+")";
    shades=[];for(let l=0;l<=LEVELS;l++){const t=l/LEVELS;shades.push("rgb("+a.map((v,k)=>Math.round(v+(b[k]-v)*t)).join(",")+")");}
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1);W=sec.clientWidth;H=sec.clientHeight;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const cols=Math.ceil(W/GAP)+1,rows=Math.ceil(H/GAP)+1,ox=(W-(cols-1)*GAP)/2,oy=(H-(rows-1)*GAP)/2;
    dots=[];for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)dots.push({x:ox+x*GAP,y:oy+y*GAP,e:0});
    colors();
    if(reduced){staticFrame();}else{draw(performance.now());}
  }
  function paint(){
    ctx.clearRect(0,0,W,H);
    for(const d of dots){
      const e=d.e,dx=d.x-P.x,dy=d.y-P.y,dist=Math.hypot(dx,dy)||1,push=e*7;
      ctx.globalAlpha=.16+e*.8;ctx.fillStyle=e>.03?shades[Math.round(e*LEVELS)]:base;
      ctx.beginPath();ctx.arc(d.x+dx/dist*push,d.y+dy/dist*push,BASE+e*2.4,0,6.2832);ctx.fill();
    }
    ctx.globalAlpha=1;
  }
  function staticFrame(){P.x=W*.66;P.y=H*.45;dots.forEach(d=>{let k=Math.max(0,1-Math.hypot(d.x-P.x,d.y-P.y)/(R*1.6));d.e=k*k*.5;});paint();}
  function draw(t){
    let tx,ty,amp=1;
    if(P.in){tx=P.tx;ty=P.ty;}
    else{const s=t/1000;tx=W*(.64+.2*Math.sin(s*.37));ty=H*(.5+.3*Math.sin(s*.53+1));amp=.55;} // משוטטת לבד כשאין סמן
    if(!P.init){P.x=tx;P.y=ty;P.init=true;}
    P.x+=(tx-P.x)*.16;P.y+=(ty-P.y)*.16;
    for(let r=ripples.length-1;r>=0;r--)if(t-ripples[r].t0>1400)ripples.splice(r,1);
    const reach=Math.max(W,H)*.9;
    for(const d of dots){
      const dist=Math.hypot(d.x-P.x,d.y-P.y);
      let k=Math.max(0,1-dist/R);k=k*k*(3-2*k)*amp;
      for(const rp of ripples){const age=(t-rp.t0)/1400,off=Math.abs(Math.hypot(d.x-rp.x,d.y-rp.y)-age*reach);if(off<28)k=Math.max(k,(1-off/28)*(1-age));}
      d.e=Math.max(k,d.e*.9); // השובל: כל נקודה דועכת לאט במקום לכבות
    }
    paint();
    if(++frames%90===0)colors();
  }
  function loop(t){draw(t);raf=running?requestAnimationFrame(loop):0;}
  function run(on){running=on&&!reduced&&visible&&!document.hidden;if(running&&!raf)raf=requestAnimationFrame(loop);}
  const local=e=>{const b=sec.getBoundingClientRect();return [e.clientX-b.left,e.clientY-b.top];};
  sec.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const p=local(e);P.tx=p[0];P.ty=p[1];P.in=true;});
  sec.addEventListener("pointerleave",()=>{P.in=false;});
  sec.addEventListener("pointerdown",e=>{if(reduced)return;const p=local(e);ripples.push({x:p[0],y:p[1],t0:performance.now()});});
  new ResizeObserver(build).observe(sec);
  new IntersectionObserver(es=>{visible=es[0].isIntersecting;run(true);}).observe(sec);
  document.addEventListener("visibilitychange",()=>run(true));
  build();
})();`,
  runway:false,
  note:"שלושה דברים ששומרים את זה קל: (1) הלולאה רצה רק כשהסקשן על המסך והלשונית גלויה (IntersectionObserver ו-visibilitychange), ובתנועה מופחתת אין לולאה בכלל, רק פריים סטטי עם הילה רכה. (2) הצבע של כל נקודה נבחר מתוך 13 גוונים מחושבים מראש בין צבע הטקסט לצבע המותג, במקום מחרוזת חדשה לכל נקודה בכל פריים. (3) canvas ברזולוציית devicePixelRatio עד 2, ו-ResizeObserver בונה את הרשת מחדש. הצבעים נקראים מ-getComputedStyle, ולכן הרשת יורשת את העור של הפרויקט, ומתעדכנת כל 90 פריימים אם העור מתחלף. touch-action:pan-y על הקנבס: בטלפון גלילה אנכית עוברת כרגיל, ונגיעה שולחת גל.",
},
{
  id:"b69", cat:"behavior", name:"ערימת כרטיסים להחלקה", tech:"GSAP · pointer events", status:"ממתין",
  desc:"המלצות כערימה של כרטיסים, זה מאחורי זה בעומק. את העליון גוררים הצידה והוא מסתובב עם היד. מעבר לסף הוא עף מהמסך וחוזר לתחתית הערימה, והשאר עולים מקום. חצים, מקלדת ומונה עובדים גם בלי גרירה, והחץ הקודם מחזיר את הכרטיס מאותו צד שאליו עף.",
  when:"המלצות, כרטיסי צוות, מוצרים דגל או טיפים: חמישה עד שמונה פריטים שכל אחד שווה רגע של תשומת לב. טבעי במיוחד בטלפון, כי זו התנועה שהאגודל כבר מכיר. לא כשצריך להשוות בין פריטים (רואים רק אחד בכל פעם), ולא ליותר משמונה.",
  libs:["gsap"],
  css:`.sk{max-width:min(1100px,94vw);margin-inline:auto;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:clamp(32px,5vw,96px);align-items:center}
.sk-head{grid-row:span 2}
.sk-head h2{margin:0 0 12px;font-size:var(--fs-h2)}
.sk-head p{margin:0;color:var(--muted)}
.sk-deck{position:relative;height:clamp(280px,26vw,330px);outline:none}
.sk-deck:focus-visible{outline:2px solid var(--accent);outline-offset:12px;border-radius:24px}
.sk-card{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(24px,2.6vw,40px);border-radius:24px;background:var(--card);color:var(--ink);
  box-shadow:0 24px 48px -28px color-mix(in srgb,var(--ink) 45%,transparent);cursor:grab;touch-action:pan-y;user-select:none;will-change:transform}
.sk-card:active{cursor:grabbing}
/* עומק בגוון ולא בשקיפות: כרטיס שקוף הראה את האווטאר של הכרטיס שמתחתיו */
.sk-card::after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--bg);opacity:var(--dim,0);pointer-events:none}
.sk-q{margin:0;font-size:clamp(19px,1.6vw,24px);line-height:1.5;font-weight:500}
.sk-who{display:flex;align-items:center;gap:14px}
.sk-av{flex:none;width:48px;height:48px;border-radius:50%}
.sk-who b{display:block;font-size:17px}
.sk-who small{color:var(--muted);font-size:14px}
.sk-ctrl{display:flex;align-items:center;justify-content:center;gap:24px}
.sk-ctrl button{width:48px;height:48px;border:0;border-radius:50%;background:var(--card);color:var(--ink);display:grid;place-items:center;cursor:pointer;
  box-shadow:0 10px 24px -14px color-mix(in srgb,var(--ink) 50%,transparent);transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.sk-ctrl button:hover{transform:translateY(-2px)}}
.sk-ctrl button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.sk-ctrl svg{width:20px;height:20px}
.sk-count{min-width:72px;text-align:center;font-size:15px;color:var(--muted);font-variant-numeric:tabular-nums}
.sk-count b{display:inline-block;color:var(--ink)}
.sk-count b.roll{animation:sk-roll .35s cubic-bezier(.2,.6,.2,1)}
@keyframes sk-roll{from{transform:translateY(60%);opacity:0}to{transform:none;opacity:1}}
@media (max-width:767px){.sk{grid-template-columns:1fr}.sk-head{grid-row:auto}.sk-deck{height:340px}}
@media (prefers-reduced-motion: reduce){.sk-count b.roll{animation:none}}`,
  html:`<div class="stage tight"><section class="sk" aria-label="המלצות">
  <header class="sk-head"><h2>מה אומרים עלינו</h2><p>גררו את הכרטיס הצידה, או השתמשו בחצים.</p></header>
  <div class="sk-deck" tabindex="0" role="group" aria-roledescription="ערימת כרטיסים" aria-label="המלצות, חמש בסך הכל">
    <article class="sk-card" data-i="0"><p class="sk-q">"חזרו אלינו באותו יום, הגיעו בזמן, והשאירו את הבית נקי יותר ממה שהיה. זה נדיר."</p><footer class="sk-who"><span class="sk-av ph ph-a" aria-hidden="true"></span><span><b>מיכל ברק</b><small>דירת גן, רמת גן</small></span></footer></article>
    <article class="sk-card" data-i="1"><p class="sk-q">"הסבירו כל שלב בשפה שאפשר להבין, ולא הייתה אף הפתעה בחשבון בסוף."</p><footer class="sk-who"><span class="sk-av ph ph-b" aria-hidden="true"></span><span><b>יוסי אלון</b><small>משרד, תל אביב</small></span></footer></article>
    <article class="sk-card" data-i="2"><p class="sk-q">"הם ראו בתוכנית דברים שהאדריכל פספס, וחסכו לנו תיקון יקר אחרי הכניסה."</p><footer class="sk-who"><span class="sk-av ph ph-c" aria-hidden="true"></span><span><b>נועה פרץ</b><small>בית פרטי, מודיעין</small></span></footer></article>
    <article class="sk-card" data-i="3"><p class="sk-q">"שלוש הצעות מחיר, וזו הייתה היחידה שפירטה מה בדיוק כלול. בחרנו בהם בגלל זה."</p><footer class="sk-who"><span class="sk-av ph ph-d" aria-hidden="true"></span><span><b>אבי שמש</b><small>פנטהאוז, חיפה</small></span></footer></article>
    <article class="sk-card" data-i="4"><p class="sk-q">"חצי שנה אחרי, התקשרנו עם שאלה קטנה. ענו תוך שעה, ובאו לתקן בלי לשאול אם זה באחריות."</p><footer class="sk-who"><span class="sk-av ph ph-e" aria-hidden="true"></span><span><b>רותם כהן</b><small>דירה, גבעתיים</small></span></footer></article>
  </div>
  <div class="sk-ctrl">
    <button class="sk-prev" type="button" aria-label="להמלצה הקודמת"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
    <span class="sk-count" dir="ltr" aria-live="polite"><b>01</b> / 05</span>
    <button class="sk-next" type="button" aria-label="להמלצה הבאה"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
  </div>
</section></div>`,
  js:`(function(){
  const deck=document.querySelector(".sk-deck"),num=document.querySelector(".sk-count b");
  const cards=[...deck.querySelectorAll(".sk-card")],n=cards.length;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let order=cards.slice(),busy=false; // order[0] הוא הכרטיס העליון
  const pad=v=>String(v).padStart(2,"0");
  function layout(animate){
    order.forEach((c,k)=>{
      const d=Math.min(k,3);
      gsap.set(c,{zIndex:n-k});
      c.inert=k!==0; // רק העליון נגיש: השאר הם עומק, לא תוכן
      const v={x:0,y:d*16,scale:1-d*.05,rotation:k===0?0:(k%2?-1:1)*d*1.4,opacity:k>3?0:1,"--dim":d*.26};
      if(animate&&!reduced)gsap.to(c,Object.assign({duration:.5,ease:"power3.out",overwrite:true},v));
      else gsap.set(c,v);
    });
    const t=pad(Number(order[0].dataset.i)+1);
    if(num.textContent!==t){num.textContent=t;num.classList.remove("roll");void num.offsetWidth;num.classList.add("roll");}
  }
  // dir: -1 שמאלה, 1 ימינה. העליון עף, נכנס לסוף, והשאר עולים
  function next(dir){
    if(busy)return;const c=order[0];
    if(reduced){order.push(order.shift());layout(false);return;}
    busy=true;
    gsap.to(c,{x:dir*deck.offsetWidth*1.15,y:"+=24",rotation:dir*14,opacity:0,duration:.36,ease:"power2.in",overwrite:true,onComplete:()=>{
      order.push(order.shift());gsap.set(c,{x:0,rotation:0,opacity:0});layout(true);busy=false;}});
  }
  // הקודם חוזר מאותו צד שאליו העליון עף, כך שהכיוון נשאר עקבי
  function prev(dir){
    if(busy)return;const c=order.pop();order.unshift(c);
    if(!reduced)gsap.set(c,{x:dir*deck.offsetWidth*1.15,rotation:dir*14,opacity:0});
    layout(true);
  }
  document.querySelector(".sk-next").addEventListener("click",()=>next(-1));
  document.querySelector(".sk-prev").addEventListener("click",()=>prev(-1));
  deck.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"){e.preventDefault();next(-1);} // בעברית, קדימה הוא שמאלה
    if(e.key==="ArrowRight"){e.preventDefault();prev(-1);}
  });
  let drag=null;
  deck.addEventListener("pointerdown",e=>{
    const c=order[0];if(busy||e.button!==0||!c.contains(e.target))return;
    drag={c,x0:e.clientX,y0:e.clientY,t0:performance.now(),dx:0,moved:false};
    try{c.setPointerCapture(e.pointerId);}catch(err){}
  });
  deck.addEventListener("pointermove",e=>{
    if(!drag)return;const dx=e.clientX-drag.x0,dy=e.clientY-drag.y0;
    if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;return;} // גלילה אנכית מנצחת
    drag.moved=true;drag.dx=dx;
    gsap.set(drag.c,{x:dx,rotation:gsap.utils.clamp(-12,12,dx*.05)});
  });
  function release(){
    if(!drag)return;const d=drag;drag=null;
    const v=d.dx/Math.max(1,performance.now()-d.t0);
    if(Math.abs(d.dx)>110||Math.abs(v)>.7)next(d.dx<0?-1:1);
    else gsap.to(d.c,{x:0,rotation:0,duration:.45,ease:"power3.out"});
  }
  deck.addEventListener("pointerup",release);
  deck.addEventListener("pointercancel",release);
  layout(false);
})();`,
  runway:false,
  note:"(1) רק הכרטיס העליון נגיש (inert על השאר), וה-live region הוא המונה, כך שקורא מסך שומע \"02\" ולא חמש המלצות בבת אחת. (2) touch-action:pan-y על הכרטיס, וההחלטה אם זו גרירה או גלילה נופלת בשמונת הפיקסלים הראשונים: אם התנועה אנכית, הגרירה משתחררת והדף נגלל. בלי זה, ערימה בטלפון לוכדת את הגלילה. (3) הסף הוא מרחק (110 פיקסלים) או מהירות (0.7 פיקסל למילישנייה), כך שגם הטלה קצרה ומהירה עובדת. (4) היציאה ב-power2.in, כי זו יציאה (motion.md: ease-in רק ליציאות), והעלייה של השאר ב-power3.out. (5) החץ הקודם מחזיר כרטיס מהצד שאליו החץ הבא זורק, כך שהערימה מרגישה כמו חפיסה אחת ולא שני כיוונים.",
},
{
  id:"g151", cat:"gsap", name:"קרוסלה על קשת", tech:"GSAP · ticker · pointer", status:"ממתין",
  desc:"כרטיסי עבודות או מוצרים יושבים על קשת של גלגל גדול, כל אחד מוטה לאורך הקשת. הכרטיס במרכז מורם מעט, והכותרת שלו מתחלפת מתחת לקשת. הגלגל מתקדם לבד בעצירות, נעצר כשמרחפים, נוגעים או מגיעים אליו במקלדת, ונגרר עם תנופה שנוחתת תמיד על כרטיס. לחיצה על כרטיס צדדי מביאה אותו למרכז.",
  when:"תיק עבודות, קולקציה, תפריט של מסעדה או מוצרים דגל: שבעה עד שנים עשר פריטים שכל אחד מהם בעיקר תמונה. מחליף שורת קרוסלה שטוחה כשהעסק רוצה רגע של תנועה בלי לנעול את הגלילה. לא לפריטים שדורשים השוואה או מחיר ליד כל אחד, ולא לפחות משבעה פריטים (הקשת נראית ריקה).",
  libs:["gsap"],
  css:`.ac{padding-block:var(--sec);overflow-x:clip;text-align:center}
.ac-head{max-width:52ch;margin:0 auto clamp(24px,3vw,48px);padding-inline:var(--gutter)}
.ac-head h2{margin:0 0 12px;font-size:var(--fs-h2)}
.ac-head p{margin:0;color:var(--muted)}
.ac-stage{position:relative;height:clamp(300px,31vw,420px);cursor:grab;touch-action:pan-y;outline:none;user-select:none}
.ac-stage:active{cursor:grabbing}
.ac-stage:focus-visible{outline:2px solid var(--accent);outline-offset:-8px}
.ac-card{--w:clamp(150px,15vw,236px);position:absolute;left:50%;top:0;width:var(--w);aspect-ratio:4/5;margin:0;translate:-50% 0;will-change:transform,opacity}
.ac-card .ph{position:absolute;inset:0;border-radius:18px;box-shadow:0 22px 40px -24px color-mix(in srgb,var(--ink) 55%,transparent);transition:box-shadow .4s cubic-bezier(.2,.6,.2,1)}
.ac-card.on .ph{box-shadow:0 34px 60px -26px color-mix(in srgb,var(--ink) 70%,transparent)}
.ac-cap{min-height:64px;margin-top:clamp(12px,2vw,24px);display:grid;gap:4px;justify-items:center}
.ac-cap.swap{animation:ac-in .45s cubic-bezier(.2,.6,.2,1)}
@keyframes ac-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ac-t{font-size:clamp(20px,1.8vw,28px);font-weight:700}
.ac-m{font-size:15px;color:var(--muted)}
.ac-ctrl{display:flex;justify-content:center;gap:12px;margin-top:24px}
.ac-ctrl button{width:48px;height:48px;border:0;border-radius:50%;background:var(--card);color:var(--ink);display:grid;place-items:center;cursor:pointer;
  box-shadow:0 10px 24px -14px color-mix(in srgb,var(--ink) 50%,transparent);transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.ac-ctrl button:hover{transform:translateY(-2px)}}
.ac-ctrl button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.ac-ctrl svg{width:20px;height:20px}
.ac-play .i-play,.ac-play[aria-pressed="false"] .i-pause{display:none}
.ac-play[aria-pressed="false"] .i-play{display:block}
@media (prefers-reduced-motion: reduce){.ac-cap.swap{animation:none}.ac-card .ph{transition:none}}`,
  html:`<section class="ac" aria-roledescription="קרוסלה" aria-label="פרויקטים נבחרים">
  <header class="ac-head"><h2>פרויקטים נבחרים</h2><p>גררו את הקשת, לחצו על כרטיס, או השתמשו בחצים.</p></header>
  <div class="ac-stage" tabindex="0" aria-label="קשת הפרויקטים. חצים ימינה ושמאלה מעבירים פרויקט">
    <figure class="ac-card" data-t="מטבח משפחתי" data-m="רמת גן · 2025"><div class="ph ph-a"></div></figure>
    <figure class="ac-card" data-t="פנטהאוז מול הים" data-m="חיפה · 2025"><div class="ph ph-b"></div></figure>
    <figure class="ac-card" data-t="בית בגליל" data-m="עמק יזרעאל · 2024"><div class="ph ph-c"></div></figure>
    <figure class="ac-card" data-t="משרדי הייטק" data-m="הרצליה · 2024"><div class="ph ph-d"></div></figure>
    <figure class="ac-card" data-t="דירת גן" data-m="גבעתיים · 2024"><div class="ph ph-e"></div></figure>
    <figure class="ac-card" data-t="קליניקה שקטה" data-m="תל אביב · 2023"><div class="ph ph-f"></div></figure>
    <figure class="ac-card" data-t="לופט בעיר" data-m="יפו · 2023"><div class="ph ph-a"></div></figure>
    <figure class="ac-card" data-t="בית כפרי" data-m="מושב נהלל · 2023"><div class="ph ph-b"></div></figure>
    <figure class="ac-card" data-t="דירת סטודיו" data-m="ירושלים · 2022"><div class="ph ph-c"></div></figure>
  </div>
  <div class="ac-cap" aria-live="polite"><b class="ac-t"></b><span class="ac-m"></span></div>
  <div class="ac-ctrl">
    <button class="ac-prev" type="button" aria-label="לפרויקט הקודם"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
    <button class="ac-play" type="button" aria-pressed="true" aria-label="עצירת ההתקדמות האוטומטית"><svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="13.5" y="5" width="3.5" height="14" rx="1"/></svg><svg class="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></button>
    <button class="ac-next" type="button" aria-label="לפרויקט הבא"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
  </div>
</section>`,
  js:`(function(){
  const root=document.querySelector(".ac"),stage=root.querySelector(".ac-stage"),cards=[...root.querySelectorAll(".ac-card")],n=cards.length;
  const cap=root.querySelector(".ac-cap"),capT=root.querySelector(".ac-t"),capM=root.querySelector(".ac-m"),play=root.querySelector(".ac-play");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const S={pos:0};let R=900,step=.2,vis=2.6,active=-1,tween=null,auto=null,userPaused=reduced,hover=false,inView=false;
  const wrap=v=>{v=((v%n)+n)%n;return v>n/2?v-n:v;};
  function measure(){
    const W=stage.offsetWidth,cw=cards[0].offsetWidth;
    R=Math.max(W*.95,cw*4.2);step=(cw+Math.max(16,cw*.16))/R;vis=W<768?1.7:2.6;render();
  }
  function render(){
    cards.forEach((c,i)=>{
      const rel=wrap(i-S.pos),a=rel*step,far=Math.abs(rel);
      // בעברית הכרטיס הבא יושב משמאל, ולכן x הפוך
      gsap.set(c,{x:-Math.sin(a)*R,y:R*(1-Math.cos(a)),rotation:-a*57.2958,scale:1+.07*Math.max(0,1-far),
        opacity:far>vis?0:Math.min(1,vis-far+.35),zIndex:100-Math.round(far*10)});
    });
    const i=((Math.round(S.pos)%n)+n)%n;
    if(i!==active){
      active=i;cards.forEach((c,k)=>{c.classList.toggle("on",k===i);c.setAttribute("aria-hidden",k===i?"false":"true");});
      capT.textContent=cards[i].dataset.t;capM.textContent=cards[i].dataset.m;
      if(!reduced){cap.classList.remove("swap");void cap.offsetWidth;cap.classList.add("swap");}
    }
  }
  function go(target,dur){
    if(tween)tween.kill();
    tween=gsap.to(S,{pos:target,duration:reduced?.01:(dur||.9),ease:dur?"power3.out":"power3.inOut",onUpdate:render,onComplete:schedule});
  }
  const step1=d=>go(Math.round(S.pos)+d);
  // עצירות אוטומטיות: רק כשהקשת על המסך, בלי ריחוף, בלי פוקוס, ורק אם הגולש לא עצר
  function schedule(){
    if(auto)auto.kill();auto=null;
    if(userPaused||hover||!inView||document.hidden||root.contains(document.activeElement))return;
    auto=gsap.delayedCall(3.4,()=>step1(1));
  }
  function stop(){if(auto)auto.kill();auto=null;}
  root.querySelector(".ac-next").addEventListener("click",()=>{stop();step1(1);});
  root.querySelector(".ac-prev").addEventListener("click",()=>{stop();step1(-1);});
  play.addEventListener("click",()=>{
    userPaused=!userPaused;play.setAttribute("aria-pressed",String(!userPaused));
    play.setAttribute("aria-label",userPaused?"הפעלת ההתקדמות האוטומטית":"עצירת ההתקדמות האוטומטית");
    if(userPaused)stop();else schedule();
  });
  stage.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"){e.preventDefault();stop();step1(1);}
    if(e.key==="ArrowRight"){e.preventDefault();stop();step1(-1);}
  });
  root.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse"){hover=true;stop();}});
  root.addEventListener("pointerleave",()=>{hover=false;schedule();});
  root.addEventListener("focusin",stop);
  root.addEventListener("focusout",()=>setTimeout(schedule,0));
  // גרירה עם תנופה שנוחתת תמיד על כרטיס שלם
  let drag=null;
  stage.addEventListener("pointerdown",e=>{
    if(e.button!==0)return;stop();if(tween)tween.kill();
    drag={x0:e.clientX,y0:e.clientY,p0:S.pos,lx:e.clientX,lt:performance.now(),v:0,moved:false,card:e.target.closest(".ac-card")};
    try{stage.setPointerCapture(e.pointerId);}catch(err){}
  });
  stage.addEventListener("pointermove",e=>{
    if(!drag)return;const dx=e.clientX-drag.x0,dy=e.clientY-drag.y0;
    if(!drag.moved&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){drag=null;schedule();return;}
    if(Math.abs(dx)>4)drag.moved=true;
    const now=performance.now();drag.v=(e.clientX-drag.lx)/Math.max(1,now-drag.lt);drag.lx=e.clientX;drag.lt=now;
    S.pos=drag.p0+dx/(step*R);render();
  });
  function release(){
    if(!drag)return;const d=drag;drag=null;
    if(!d.moved){ // לחיצה בלי גרירה: הכרטיס שנלחץ עובר למרכז
      if(d.card){const i=cards.indexOf(d.card);go(Math.round(S.pos+wrap(i-S.pos)));}else schedule();
      return;
    }
    const proj=S.pos+d.v*260/(step*R);
    go(Math.round(proj),.7);
  }
  stage.addEventListener("pointerup",release);
  stage.addEventListener("pointercancel",release);
  new ResizeObserver(measure).observe(stage);
  new IntersectionObserver(es=>{inView=es[0].isIntersecting;if(inView)schedule();else stop();},{threshold:.4}).observe(stage);
  document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();else schedule();});
  if(reduced){play.setAttribute("aria-pressed","false");play.setAttribute("aria-label","הפעלת ההתקדמות האוטומטית");}
  measure();
})();`,
  runway:false,
  note:"(1) המצב כולו הוא מספר אחד, pos, וכל כרטיס מחושב ממנו: זווית על הקשת, מיקום, הטיה ושקיפות. לכן גרירה, חצים, מקלדת והתקדמות אוטומטית לא מתנגשים: כולם רק מזיזים את pos. (2) התנופה מחושבת מהמהירות בסוף הגרירה ומעוגלת לכרטיס שלם, כך שהקשת לעולם לא נעצרת בין שני כרטיסים. (3) התקדמות אוטומטית היא עצירות כל 3.4 שניות ולא סחיפה רציפה, כדי שאפשר יהיה לקרוא את הכותרת. היא נעצרת בריחוף, בפוקוס, בגרירה, מחוץ למסך ובלשונית נסתרת, ויש כפתור עצירה (WCAG 2.2.2: תנועה אוטומטית של יותר מחמש שניות). בתנועה מופחתת היא כבויה מההתחלה. (4) רק הכרטיס שבמרכז חשוף לקורא מסך, והכותרת שמתחת היא ה-live region.",
},
{
  id:"b70", cat:"behavior", name:"כפתור שיתוף שנפרש", tech:"CSS · JS · Web Share API", status:"ממתין",
  desc:"כפתור \"שתפו\" שבלחיצה נפרש לשורת עיגולים של וואטסאפ, פייסבוק, לינקדאין, X, מייל והעתקת קישור. העיגולים יוצאים מהכפתור בזה אחר זה, והאייקון בכפתור מסתובב לאיקס. בריחוף כל עיגול מתמלא בצבע הרשת שלו ומראה את שמה. העתקת קישור מחליפה את האייקון לוי ומודיעה \"הקישור הועתק\". בטלפון הכפתור פותח את חלון השיתוף של המכשיר.",
  when:"סוף מאמר, מדריך, מתכון, דף מוצר, אירוע או הצעת עבודה: כל תוכן שהגולש עשוי לשלוח לחבר או לבן זוג. בישראל וואטסאפ ראשון תמיד. לא בדף נחיתה ממומן (מוציא את הגולש מהדף), ולא בכל כרטיס ברשימה (רעש).",
  libs:[],
  css:`.sh{max-width:min(760px,94vw);margin-inline:auto;display:grid;gap:clamp(24px,3vw,40px)}
.sh-post{padding:clamp(24px,3vw,48px);border-radius:24px;background:var(--card);box-shadow:0 24px 48px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.sh-k{margin:0 0 12px;font-size:14px;font-weight:600;color:var(--muted)}
.sh-post h3{margin:0 0 12px;font-size:clamp(24px,2.2vw,34px);line-height:1.2}
.sh-post p{margin:0;color:var(--muted);line-height:1.6}
.sh-row{display:flex;flex-wrap:wrap;align-items:center;gap:16px;margin-top:32px}
.shr{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.shr-btn{position:relative;display:inline-flex;align-items:center;gap:10px;height:48px;padding:0 20px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-weight:700;cursor:pointer;
  transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.shr-btn:hover{transform:translateY(-2px)}}
.shr-btn:focus-visible,.shr-it:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.shr-btn svg{flex:none;width:20px;height:20px;transition:transform .35s cubic-bezier(.76,0,.24,1),opacity .2s}
.shr-x{position:absolute;inset-inline-start:14px;opacity:0;transform:rotate(-90deg) scale(.6)}
.shr.open .shr-ic{opacity:0;transform:rotate(90deg) scale(.6)}
.shr.open .shr-x{opacity:1;transform:none}
.shr-list{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.shr-list li{position:relative;opacity:0;transform:translateX(24px) scale(.6);transition:opacity .15s,transform .15s}
.shr.open .shr-list li{opacity:1;transform:none;transition:opacity .3s calc(var(--i) * 50ms),transform .45s calc(var(--i) * 50ms) cubic-bezier(.2,.6,.2,1)}
.shr-it{display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink);cursor:pointer;
  transition:background-color .25s,color .25s,transform .25s cubic-bezier(.2,.6,.2,1)}
.shr-it svg{width:20px;height:20px}
/* צבע הרשת בריחוף. וואטסאפ בגוון הכהה שלו: הירוק הבהיר עם אייקון לבן לא עובר ניגודיות */
@media (hover:hover) and (pointer:fine){.shr-it:hover{background:var(--c);color:#fff;transform:translateY(-3px)} /* qa-allow: white, אייקון לבן על צבע רשת קבוע */}
.shr-it:focus-visible{background:var(--c);color:#fff}
.shr-it.me:hover,.shr-it.me:focus-visible,.shr-it.me.done{background:var(--ink);color:var(--bg)}
.shr-it.done{background:var(--c);color:#fff}
.shr-tip{position:absolute;left:50%;bottom:calc(100% + 10px);translate:-50% 0;white-space:nowrap;padding:6px 10px;border-radius:8px;background:var(--ink);color:var(--bg);font-size:13px;
  opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .2s,transform .2s}
.shr-it:hover+.shr-tip,.shr-it:focus-visible+.shr-tip{opacity:1;transform:none}
.shr-c .shr-btn{width:48px;padding:0;justify-content:center}
.shr-c .shr-lbl{display:none}
.shr-c .shr-x{inset-inline-start:auto}
.sh-note{margin:0;font-size:14px;color:var(--muted);min-height:20px}
.sh-alt{display:flex;align-items:center;gap:16px;color:var(--muted);font-size:15px}
@media (prefers-reduced-motion: reduce){.shr-list li,.shr.open .shr-list li,.shr-btn svg,.shr-it,.shr-tip{transition-duration:.01ms;transition-delay:0s}}`,
  html:`<div class="stage tight"><div class="sh">
  <article class="sh-post">
    <p class="sh-k">מדריך · שש דקות קריאה</p>
    <h3>איך בוחרים צבעים לאתר עסקי בלי להסתבך</h3>
    <p>שלושה צבעים, תפקיד אחד לכל צבע, ובדיקה אחת לפני שמאשרים. המדריך המלא עם דוגמאות מאתרים אמיתיים.</p>
    <div class="sh-row"><div class="shr" data-title="איך בוחרים צבעים לאתר עסקי"></div></div>
  </article>
  <div class="sh-alt"><div class="shr shr-c" data-title="איך בוחרים צבעים לאתר עסקי"></div><span>גרסה קומפקטית, לסרגל כלים או לכרטיס מוצר</span></div>
  <p class="sh-note" role="status" aria-live="polite"></p>
</div></div>`,
  js:`(function(){
  const I={
    share:'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.2 10.9l7.6-4.2M8.2 13.1l7.6 4.2"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    wa:'<path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.3L3.3 20.8l4.4-1.1A8.8 8.8 0 1 0 12 3.2z"/><path d="M9.1 8.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.4.9 1.2 1.7 2.1 2.2l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4-.2.7-.5.9-.6.4-1.5.5-2.6.1-1.9-.7-3.6-2.4-4.3-4.3-.4-1.1-.3-2 .2-2.6z" fill="currentColor" stroke="none"/>',
    fb:'<path d="M14 8.2h2V5h-2.6C11 5 10 6.6 10 9v2H8v3h2v7h3v-7h2.4l.6-3h-3V9.4c0-.8.3-1.2 1-1.2z" fill="currentColor" stroke="none"/>',
    li:'<path d="M6.5 9H4v11h2.5zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 13.7c0-3-1.6-4.9-4.1-4.9-1.3 0-2.2.6-2.7 1.3V9h-2.4v11h2.5v-5.8c0-1.4.6-2.4 1.8-2.4s1.6.9 1.6 2.4V20H20z" fill="currentColor" stroke="none"/>',
    tw:'<path d="M4 4l7 9.2L4.3 20H6l5.9-6 4.5 6H20l-7.3-9.7L19 4h-1.7l-5.4 5.5L7.7 4z" fill="currentColor" stroke="none"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    ok:'<path d="M5 12.5l4.2 4L19 7"/>'
  };
  const svg=(p,cls)=>'<svg'+(cls?' class="'+cls+'"':'')+' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
  const E=encodeURIComponent;
  const NETS=[
    {k:"wa",l:"וואטסאפ",c:"#128C7E",u:(t,u)=>"https://wa.me/?text="+E(t+" "+u)},
    {k:"fb",l:"פייסבוק",c:"#1877F2",u:(t,u)=>"https://www.facebook.com/sharer/sharer.php?u="+E(u)},
    {k:"li",l:"לינקדאין",c:"#0A66C2",u:(t,u)=>"https://www.linkedin.com/sharing/share-offsite/?url="+E(u)},
    {k:"tw",l:"X",c:"#000",u:(t,u)=>"https://x.com/intent/post?text="+E(t)+"&url="+E(u)},
    {k:"mail",l:"מייל",me:true,u:(t,u)=>"mailto:?subject="+E(t)+"&body="+E(u)},
    {k:"link",l:"העתקת קישור",me:true}
  ];
  const note=document.querySelector(".sh-note");
  const coarse=matchMedia("(pointer: coarse)").matches;
  let seq=0;
  document.querySelectorAll(".shr").forEach(box=>{
    const title=box.dataset.title||document.title,url=location.href.split("#")[0],id="shr-l"+(++seq);
    box.innerHTML='<button class="shr-btn" type="button" aria-expanded="false" aria-controls="'+id+'">'+svg(I.share,"shr-ic")+svg(I.x,"shr-x")+'<span class="shr-lbl">שתפו</span></button><ul class="shr-list" id="'+id+'"></ul>';
    if(box.classList.contains("shr-c"))box.querySelector(".shr-btn").setAttribute("aria-label","שיתוף");
    const btn=box.querySelector(".shr-btn"),list=box.querySelector(".shr-list");
    NETS.forEach((n,i)=>{
      const li=document.createElement("li");li.style.setProperty("--i",i);
      const el=document.createElement(n.u?"a":"button");
      el.className="shr-it"+(n.me?" me":"");el.style.setProperty("--c",n.c||"var(--ink)");el.setAttribute("aria-label",n.l);
      if(n.u){el.href=n.u(title,url);if(n.k!=="mail"){el.target="_blank";el.rel="noopener noreferrer";}}else el.type="button";
      el.innerHTML=svg(I[n.k]);
      li.appendChild(el);li.insertAdjacentHTML("beforeend",'<span class="shr-tip" aria-hidden="true">'+n.l+'</span>');list.appendChild(li);
      el.addEventListener("click",e=>{
        if(n.k==="link"){copy(url,el);return;}
        if(n.k==="mail")return; // mailto נפתח בתוכנת המייל, בלי חלון
        e.preventDefault();window.open(el.href,"_blank","noopener,noreferrer,width=640,height=580");setTimeout(()=>set(false),250);
      });
    });
    list.inert=true;
    function set(open){
      box.classList.toggle("open",open);btn.setAttribute("aria-expanded",String(open));list.inert=!open;
      if(open)list.querySelector(".shr-it").focus({preventScroll:true});
    }
    btn.addEventListener("click",()=>{
      // בטלפון: חלון השיתוף של המכשיר, שם כבר נמצאות האפליקציות שהגולש באמת משתמש בהן
      if(coarse&&navigator.share){navigator.share({title:title,url:url}).catch(()=>{});return;}
      set(!box.classList.contains("open"));
    });
    box.addEventListener("keydown",e=>{if(e.key==="Escape"&&box.classList.contains("open")){set(false);btn.focus();}});
    document.addEventListener("pointerdown",e=>{if(box.classList.contains("open")&&!box.contains(e.target))set(false);});
  });
  function copy(text,el){
    const done=()=>{
      el.classList.add("done");el.innerHTML=svg(I.ok);note.textContent="הקישור הועתק";
      setTimeout(()=>{el.classList.remove("done");el.innerHTML=svg(I.link);note.textContent="";},1800);
    };
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(text).then(done,fallback);else fallback();
    function fallback(){const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done();}catch(err){}ta.remove();}
  }
})();`,
  runway:false,
  note:"(1) לחיצה ולא ריחוף: בטלפון אין ריחוף, ובמחשב שורה שנפתחת כשעוברים ליד הכפתור מבהילה. (2) בטלפון (pointer:coarse) עם navigator.share, הכפתור פותח את חלון השיתוף של המכשיר, כי שם כבר נמצאות האפליקציות שהגולש משתמש בהן, כולל וואטסאפ. השורה היא הגיבוי במחשב. (3) כל רשת נפתחת בחלון קטן (window.open עם noopener), והקישור עצמו אמיתי, כך שגם בלי JS הוא עובד. מייל פותח את תוכנת המייל. (4) העיגולים בשורה סגורה מקבלים inert, Escape סוגר ומחזיר פוקוס לכפתור, ולחיצה מחוץ לשורה סוגרת. (5) צבעי הרשתות קבועים ואינם מהעור, כי זה הצבע שהעין מזהה. וואטסאפ בגוון הכהה #128C7E, כי אייקון לבן על הירוק המוכר #25D366 הוא 2:1 בלבד. מייל והעתקה בצבע הדיו של העור. (6) העתקה עם navigator.clipboard, ובלי הקשר מאובטח גיבוי ב-execCommand. ההודעה \"הקישור הועתק\" ב-live region, והאייקון הופך לוי לשתי שניות.",
},
];
