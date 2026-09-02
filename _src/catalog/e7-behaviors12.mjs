// מעבר מעמיק על כל תשעת המקורות של ליאב (2.9.2026), כולל 198 הקלונאבלס של Webflow.
// כל רכיב כאן חזר על עצמו בכמה מקורות במקביל.
export default [
{
  id:"b41", cat:"behavior", name:"סקשן מוצמד שהתוכן בו מתחלף בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רשימת נושאים שנשארת במקום, וכל אחד נפתח מעצמו כשמגיע תורו בגלילה, יחד עם התמונה שמתחלפת לצידו. אקורדיון שהגלילה מפעילה במקום לחיצה.",
  when:"פיצ'רים, שירותים, שלבי עבודה, יתרונות. הדפוס הזה חזר שש פעמים באוסף הקלונאבלס של Webflow ועוד פעם ב-21st.dev, והוא מחליף ארבעה סקשנים בסקשן אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`.ss{position:relative}
.ss-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,70px);align-items:start;
  padding-inline:var(--gutter);max-width:1180px;margin-inline:auto}
.ss-media{position:sticky;top:16vh;aspect-ratio:4/3;border-radius:var(--r);overflow:hidden}
.ss-media .ph{position:absolute;inset:0;border-radius:0;font-size:38px;opacity:0;transform:scale(1.05);
  transition:opacity .55s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
.ss-media .ph.on{opacity:1;transform:none}
.ss-list{display:grid}
.ss-item{border-top:1px solid var(--line);padding-block:clamp(16px,2vw,26px)}
.ss-item:last-child{border-bottom:1px solid var(--line)}
.ss-head{display:flex;align-items:center;gap:14px}
.ss-idx{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.ss-item h3{margin:0;font-size:clamp(19px,2.1vw,30px);color:var(--muted);transition:color .35s}
.ss-item.on h3{color:var(--ink)}
.ss-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.8,.2,1)}
.ss-item.on .ss-body{grid-template-rows:1fr}
.ss-body>div{overflow:hidden}
.ss-body p{margin:12px 0 0;color:var(--muted);font-size:16px;line-height:1.7;max-width:46ch}
.ss-mobile{display:none}
@media(max-width:860px){
  .ss-grid{grid-template-columns:1fr}
  .ss-media{display:none}
  .ss-mobile{display:block;aspect-ratio:16/10;border-radius:var(--r);overflow:hidden;margin-top:14px;position:relative}
  .ss-mobile .ph{position:absolute;inset:0;border-radius:0;font-size:26px}
}
@media (prefers-reduced-motion: reduce){.ss-body,.ss-media .ph{transition-duration:.01ms}}`,
  html:`<div class="stage"><div class="ss"><div class="ss-grid">
  <div class="ss-media">
    <div class="ph ph-a on">1</div><div class="ph ph-c">2</div><div class="ph ph-d">3</div><div class="ph ph-e">4</div>
  </div>
  <div class="ss-list">
    <div class="ss-item on" data-i="0"><div class="ss-head"><span class="ss-idx">01</span><h3>אפיון לפני עיצוב</h3></div>
      <div class="ss-body"><div><p>מתחילים בהבנה של העסק ושל הלקוח, ורק אחר כך פותחים כלי עיצוב. זה השלב שקובע אם האתר יביא פניות.</p>
      <div class="ss-mobile"><div class="ph ph-a">1</div></div></div></div></div>
    <div class="ss-item" data-i="1"><div class="ss-head"><span class="ss-idx">02</span><h3>קופי שמדבר אל הלקוח</h3></div>
      <div class="ss-body"><div><p>כל כותרת עונה על שאלה אמיתית שיש למי שנחת בעמוד, במקום לתאר את העסק מבפנים.</p>
      <div class="ss-mobile"><div class="ph ph-c">2</div></div></div></div></div>
    <div class="ss-item" data-i="2"><div class="ss-head"><span class="ss-idx">03</span><h3>עיצוב בשפה אחת</h3></div>
      <div class="ss-body"><div><p>מערכת אחת של צבעים, טיפוגרפיה וריווח שחוזרת בכל עמוד, כך שהאתר מרגיש שלם ולא אוסף מסכים.</p>
      <div class="ss-mobile"><div class="ph ph-d">3</div></div></div></div></div>
    <div class="ss-item" data-i="3"><div class="ss-head"><span class="ss-idx">04</span><h3>מדידה מהיום הראשון</h3></div>
      <div class="ss-body"><div><p>מחברים מעקב לפני העלייה לאוויר, כדי שנדע מה עובד במקום לנחש חודש אחרי.</p>
      <div class="ss-mobile"><div class="ph ph-e">4</div></div></div></div></div>
  </div>
</div></div></div>`,
  js:`(function(){
  const items=gsap.utils.toArray(".ss-item");
  const shots=[...document.querySelectorAll(".ss-media .ph")];
  function activate(i){
    items.forEach((it,n)=>it.classList.toggle("on",n===i));
    shots.forEach((s,n)=>s.classList.toggle("on",n===i));
  }
  items.forEach((item,i)=>{
    ScrollTrigger.create({trigger:item,start:"top 62%",end:"bottom 45%",
      onToggle:self=>{if(self.isActive)activate(i);}});
  });
})();`,
  note:"הקסם הוא שילוב של שניים: הפאנל נפתח ב-grid-template-rows מ-0fr ל-1fr כדי לקבל גובה אמיתי, והמדיה נשארת במקום עם position:sticky. בגרסת המובייל אין מקום לעמודה דביקה, ולכן התמונה עוברת לתוך הפריט הפתוח עצמו. אין pin ואין חישובי גובה, ולכן זה לא נשבר כשהטקסט מתארך."
},
{
  id:"b42", cat:"behavior", name:"מרקי שמגיב למהירות הגלילה", tech:"GSAP · ScrollTrigger velocity", status:"ממתין",
  desc:"רצועה שזורמת לבד, מאיצה כשגוללים מהר, מתהפכת בכיוון כשגוללים אחורה, ומתעוותת קלות לפי המהירות. חוזרת לזרימה רגילה כשעוצרים.",
  when:"רצועת לוגואים, פס אמון, כותרות ענק, שמות שירותים. שדרוג ישיר של מרקי רגיל: הוא מרגיש חי במקום לולאה מכנית.",
  libs:["gsap","ScrollTrigger"],
  css:`.vm{overflow:hidden;border-block:1px solid var(--line);background:var(--card);padding-block:clamp(16px,2vw,30px)}
.vm+.vm{border-top:0}
.vm-track{display:flex;gap:clamp(28px,4vw,64px);width:max-content;will-change:transform}
.vm-track span{font-size:clamp(26px,4vw,66px);font-weight:800;white-space:nowrap;color:var(--ink)}
.vm-track span.o{color:transparent;-webkit-text-stroke:1px var(--muted)}
.vm.alt .vm-track span{font-size:clamp(18px,2vw,30px);font-weight:600;color:var(--muted)}
.vm-note{text-align:center;color:var(--muted);font-size:14px;padding:18px var(--gutter) 0}`,
  html:`<div class="vm"><div class="vm-track">
  <span>אתרי תדמית</span><span class="o">דפי נחיתה</span><span>חנויות</span><span class="o">מערכות</span>
  <span>אתרי תדמית</span><span class="o">דפי נחיתה</span><span>חנויות</span><span class="o">מערכות</span>
</div></div>
<div class="vm alt"><div class="vm-track">
  <span>אפיון</span><span>קופי</span><span>עיצוב</span><span>פיתוח</span><span>מדידה</span><span>ליווי</span>
  <span>אפיון</span><span>קופי</span><span>עיצוב</span><span>פיתוח</span><span>מדידה</span><span>ליווי</span>
</div></div>
<p class="vm-note">גלול מהר ולאט, ואז גלול אחורה. הרצועה מגיבה.</p>`,
  js:`(function(){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".vm").forEach((wrap,idx)=>{
    const track=wrap.querySelector(".vm-track");
    const half=track.scrollWidth/2;
    // עמוד עברי: הרצועה זורמת ימינה, ולכן מתחילים במינוס וחוזרים לאפס
    const loop=gsap.fromTo(track,{x:-half},{x:0,duration:14+idx*4,ease:"none",repeat:-1});
    if(reduce){loop.pause();return;}
    const skewTo=gsap.quickTo(track,"skewX",{duration:.4,ease:"power3"});
    let scale=1;
    ScrollTrigger.create({
      onUpdate:self=>{
        const v=self.getVelocity();
        const dir=v>0?1:-1;                                   // כיוון הגלילה קובע את כיוון הזרימה
        const boost=gsap.utils.clamp(1,6,1+Math.abs(v)/900);  // מהירות מוסיפה דחיפה, עם תקרה
        scale=dir*boost;
        loop.timeScale(scale);                                // השמה ישירה, מגיבה מיד
        skewTo(gsap.utils.clamp(-8,8,-v/260));
      }
    });
    // דעיכה חזרה לקצב הבסיס. בלי זה הרצועה נשארת מהירה לנצח אחרי גלילה חדה.
    gsap.ticker.add(()=>{
      const base=Math.sign(scale)||1;
      if(Math.abs(scale-base)<.02)return;
      scale+=(base-scale)*.05;
      loop.timeScale(scale);
    });
  });
})();`,
  runway:true,
  note:"getVelocity מחזיר פיקסלים לשנייה עם סימן שמעיד על הכיוון, ומכאן שני האפקטים: timeScale שלילי מהפך את הלולאה, ו-clamp מונע האצה מטורפת בגלילת מגע. חובה להחזיר את הקצב לבסיס אחרי הדחיפה, אחרת הרצועה נשארת מהירה לנצח. ה-skew מוגבל לשמונה מעלות: מעבר לזה הטקסט נעשה לא קריא."
},
];
