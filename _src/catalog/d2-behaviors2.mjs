// Behaviors B17-B18: התנהגויות מבניות שנכרו מעמוד הבית של madewithgsap.com (2.9.2026), שוחזרו מאפס
export default [
{
  id:"b17", cat:"behavior", name:"תג HUD: מה על המסך עכשיו", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"תגית קטנה וקבועה בפינת המסך שמראה את מספר הפריט או הסקשן שנמצא כרגע במרכז. כשהמספר מתחלף, התג קופץ קפיצה זעירה כדי שהעין תתפוס את השינוי.",
  when:"עמודים ארוכים עם רשימת פריטים ממוספרים: קטלוג, מהלכים, פרקים, שלבים. גם כאינדיקטור התקדמות אלגנטי במקום פס.",
  libs:["gsap","ScrollTrigger"],
  css:`.hud-sec{min-height:80vh;display:grid;place-items:center;border-top:1px solid var(--line);font-size:clamp(28px,3vw,52px);font-weight:700;color:#c9c9d8}
.hud-sec:nth-child(odd){background:#fff}
.hud{position:fixed;bottom:22px;left:22px;z-index:60;display:flex;align-items:center;gap:12px;background:#111;color:#fff;border-radius:999px;padding:10px 16px;font-size:12px;letter-spacing:.14em;opacity:0;visibility:hidden}
.hud i{width:6px;height:6px;border-radius:50%;background:#c6ff4a}
.hud b{font-variant-numeric:tabular-nums;font-weight:600;display:inline-block;min-width:3ch;text-align:left;direction:ltr}`,
  html:`<div class="hud-wrap">
  <section class="hud-sec" data-n="001">סקשן ראשון</section>
  <section class="hud-sec" data-n="002">סקשן שני</section>
  <section class="hud-sec" data-n="003">סקשן שלישי</section>
  <section class="hud-sec" data-n="004">סקשן רביעי</section>
  <section class="hud-sec" data-n="005">סקשן חמישי</section>
</div>
<div class="hud" aria-live="polite">על המסך <i></i> <b>000</b></div>`,
  js:`(function(){
  const hud=document.querySelector(".hud"),num=hud.querySelector("b");
  let shown=false;
  function show(){if(shown)return;shown=true;gsap.fromTo(hud,{scale:.97,autoAlpha:0},{scale:1,autoAlpha:1,duration:.16,ease:"back.out(20)"});}
  function hide(){if(!shown)return;shown=false;gsap.to(hud,{scale:.97,autoAlpha:0,duration:.16,ease:"expo.in"});}
  function setNum(n){
    if(num.textContent===n)return;
    gsap.timeline().to(num,{yPercent:-60,autoAlpha:0,duration:.14,ease:"power2.in",onComplete:()=>num.textContent=n})
      .fromTo(num,{yPercent:60},{yPercent:0,autoAlpha:1,duration:.22,ease:"back.out(3)"});
    gsap.fromTo(hud,{scale:.96},{scale:1,duration:.3,ease:"back.out(6)"});
  }
  // נראות: טריגר אחד על כל האזור. מספר: טריגר לכל סקשן. כך התג לא נתקע גלוי בקפיצות גלילה.
  ScrollTrigger.create({trigger:".hud-wrap",start:"top center",end:"bottom center",
    onToggle:self=>self.isActive?show():hide()});
  gsap.utils.toArray(".hud-sec").forEach(s=>ScrollTrigger.create({trigger:s,start:"top center",end:"bottom center",
    onToggle:self=>{if(self.isActive)setNum(s.dataset.n);}}));
})();`
},
{
  id:"b18", cat:"behavior", name:"הדר שמחליף ערכת צבע לפי הסקשן", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"הדר דביק שנשאר קריא על כל רקע: כשהוא עובר מעל סקשן כהה הוא הופך לבהיר, ומעל סקשן בהיר חוזר לכהה. הטריגר נמדד בגובה ההדר עצמו, לא באמצע המסך.",
  when:"כל אתר עם הדר שקוף או דביק וסקשנים בצבעים מתחלפים. חוסך את הפשרה של הדר אטום לבן.",
  libs:["gsap","ScrollTrigger"],
  css:`.th-wrap{position:relative}
.th-head{position:sticky;top:0;z-index:40;display:flex;justify-content:space-between;align-items:center;padding:14px var(--gutter);color:var(--ink);transition:color .35s}
.th-head nav{display:flex;gap:6px;padding:6px;border-radius:999px;background:rgba(255,255,255,.85);backdrop-filter:blur(10px);border:1px solid rgba(0,0,0,.08);transition:background .35s,border-color .35s}
.th-head nav span{padding:8px 14px;border-radius:999px;font-size:13px}
.th-head nav span.cta{background:#111;color:#fff;transition:background .35s,color .35s}
.th-head[data-theme="dark"]{color:#fff}
.th-head[data-theme="dark"] nav{background:rgba(20,20,32,.75);border-color:rgba(255,255,255,.12)}
.th-head[data-theme="dark"] nav span.cta{background:#c6ff4a;color:#111}
.th-sec{min-height:90vh;display:grid;place-items:center;font-size:clamp(28px,3vw,52px);font-weight:700}
.th-sec[data-theme="light"]{background:#fff;color:#c9c9d8}
.th-sec[data-theme="dark"]{background:#0f1020;color:#3a3c55}`,
  html:`<div class="th-wrap">
  <header class="th-head" data-theme="light"><strong>לוגו</strong><nav><span>עבודות</span><span>שירותים</span><span>אודות</span><span class="cta">דברו איתנו</span></nav></header>
  <section class="th-sec" data-theme="light">סקשן בהיר</section>
  <section class="th-sec" data-theme="dark">סקשן כהה</section>
  <section class="th-sec" data-theme="light">שוב בהיר</section>
  <section class="th-sec" data-theme="dark">ושוב כהה</section>
</div>`,
  js:`(function(){
  const head=document.querySelector(".th-head");
  const h=()=>head.offsetHeight;
  gsap.utils.toArray(".th-sec").forEach(s=>ScrollTrigger.create({trigger:s,start:()=>"top "+h()*0.6,end:()=>"bottom "+h()*0.6,
    onToggle:self=>{if(self.isActive)head.dataset.theme=s.dataset.theme;}}));
})();`,
  note:"ההדר כאן sticky בתוך הדמו כדי לא להתנגש בסרגל של המאגר. בפרויקט אמיתי הוא fixed, והחישוב זהה."
},
];
