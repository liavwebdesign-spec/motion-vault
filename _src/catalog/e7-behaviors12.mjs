// מעבר מעמיק על כל תשעת המקורות של ליאב (2.9.2026), כולל 198 הקלונאבלס של Webflow.
// כל רכיב כאן חזר על עצמו בכמה מקורות במקביל.
export default [
{
  id:"b41", cat:"behavior", name:"סקשן מוצמד שהתוכן בו מתחלף בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"רשימת נושאים שנשארת במקום, וכל אחד נפתח מעצמו כשמגיע תורו בגלילה, יחד עם התמונה שמתחלפת לצידו. אקורדיון שהגלילה מפעילה במקום לחיצה.",
  when:"פיצ'רים, שירותים, שלבי עבודה, יתרונות. הדפוס הזה חזר שש פעמים באוסף הקלונאבלס של Webflow ועוד פעם ב-21st.dev, והוא מחליף ארבעה סקשנים בסקשן אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי הספרייה, בהפחתת תנועה או במסך נמוך מדי: פריסה סטטית, כל הפריטים פתוחים והמדיה דביקה לצידם.
   ההצמדה, הקיפול והכותרות האפורות יושבים תחת .mv-on, שהסקריפט מוסיף רק כשהתנועה מותרת */
.ss{position:relative}
.ss-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,70px);align-items:start;
  padding-inline:var(--gutter);max-width:1180px;margin-inline:auto}
.ss-media{position:sticky;top:16vh;aspect-ratio:4/3;border-radius:var(--r);overflow:hidden}
.ss.mv-on .ss-media{position:relative;top:auto}
.ss-media .ph{position:absolute;inset:0;border-radius:0;font-size:38px;opacity:0;transform:scale(1.05);
  transition:opacity .55s ease,transform .9s cubic-bezier(.2,.6,.2,1)}
.ss-media .ph.on{opacity:1;transform:none}
.ss-list{display:grid}
.ss-item{border-top:1px solid var(--line);padding-block:clamp(16px,2vw,26px)}
.ss-item:last-child{border-bottom:1px solid var(--line)}
.ss-head{display:flex;align-items:center;gap:14px}
.ss-idx{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.ss-item h3{margin:0;font-size:clamp(19px,2.1vw,30px);color:var(--ink);transition:color .35s}
.ss.mv-on .ss-item:not(.on) h3{color:var(--muted)}
.ss-body{display:grid;grid-template-rows:1fr;transition:grid-template-rows .5s cubic-bezier(.2,.6,.2,1)}
.ss.mv-on .ss-item:not(.on) .ss-body{grid-template-rows:0fr}
.ss-body>div{overflow:hidden}
.ss-body p{margin:12px 0 0;color:var(--muted);font-size:16px;line-height:1.7;max-width:46ch}
/* בטלפון התמונה עוברת מעל הרשימה, ונשארת מחוץ לפריט: כך מעבר בין פריטים מזיז רק שורת טקסט ולא תמונה שלמה */
@media(max-width:860px){
  .ss-grid{grid-template-columns:1fr}
  .ss-media{position:relative;top:auto;aspect-ratio:16/10}
  .ss-media .ph{font-size:26px}
}
@media (prefers-reduced-motion: reduce){.ss-body,.ss-media .ph{transition-duration:.01ms}}`,
  html:`<div class="stage"><div class="ss"><div class="ss-grid">
  <div class="ss-media" aria-hidden="true">
    <div class="ph ph-a on">1</div><div class="ph ph-c">2</div><div class="ph ph-d">3</div><div class="ph ph-e">4</div>
  </div>
  <div class="ss-list">
    <div class="ss-item" data-i="0"><div class="ss-head"><span class="ss-idx">01</span><h3>אפיון לפני עיצוב</h3></div>
      <div class="ss-body"><div><p>מתחילים בהבנה של העסק ושל הלקוח, ורק אחר כך פותחים כלי עיצוב. זה השלב שקובע אם האתר יביא פניות.</p></div></div></div>
    <div class="ss-item" data-i="1"><div class="ss-head"><span class="ss-idx">02</span><h3>קופי שמדבר אל הלקוח</h3></div>
      <div class="ss-body"><div><p>כל כותרת עונה על שאלה אמיתית שיש למי שנחת בעמוד, במקום לתאר את העסק מבפנים.</p></div></div></div>
    <div class="ss-item" data-i="2"><div class="ss-head"><span class="ss-idx">03</span><h3>עיצוב בשפה אחת</h3></div>
      <div class="ss-body"><div><p>מערכת אחת של צבעים, טיפוגרפיה וריווח שחוזרת בכל עמוד, כך שהאתר מרגיש שלם ולא אוסף מסכים.</p></div></div></div>
    <div class="ss-item" data-i="3"><div class="ss-head"><span class="ss-idx">04</span><h3>מדידה מהיום הראשון</h3></div>
      <div class="ss-body"><div><p>מחברים מעקב לפני העלייה לאוויר, כדי שנדע מה עובד במקום לנחש חודש אחרי.</p></div></div></div>
  </div>
</div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;   // בלי הספרייה נשארת הפריסה הסטטית: כל הפריטים פתוחים
  const root=document.querySelector(".ss");
  const items=gsap.utils.toArray(".ss-item");
  const shots=gsap.utils.toArray(".ss-media .ph");
  const n=items.length;
  let cur=-1;
  function activate(i){
    if(i===cur)return;cur=i;
    items.forEach((it,k)=>it.classList.toggle("on",k===i));
    shots.forEach((s,k)=>s.classList.toggle("on",k===i));
  }
  // כל פריט מקבל חלק שווה מהגלילה המוצמדת (חצי מסך לפריט), כך שיש זמן לקרוא לפני המעבר
  const at=self=>activate(Math.min(n-1,Math.floor(self.progress*n)));
  // ההצמדה רק כשהתנועה מותרת ורק כשהסקשן נכנס במסך: בדסקטופ מ-520 גובה, בטלפון (שם התמונה
  // מעל הרשימה) מ-680. מתחת לזה, למשל טלפון לרוחב, נשארת הפריסה הסטטית
  const Q="(prefers-reduced-motion: no-preference) and (min-width: 861px) and (min-height: 520px),"+
          "(prefers-reduced-motion: no-preference) and (max-width: 860px) and (min-height: 680px)";
  gsap.matchMedia().add(Q,()=>{
    root.classList.add("mv-on");
    activate(0);
    // center center: התוכן יושב באמצע המסך לאורך כל ההצמדה, בלי תלות בריפוד של הסקשן
    ScrollTrigger.create({trigger:root,start:"center center",end:"+="+(n*50)+"%",
      pin:true,anticipatePin:1,onUpdate:at,onRefresh:at});
    return ()=>{root.classList.remove("mv-on");cur=-1;activate(0);};
  });
})();`,
  note:"הסקשן מוצמד וכל פריט מקבל חלק שווה מהגלילה, כך שהרשימה והתמונה באמת עומדות במקום בזמן שהתוכן מתחלף. הפריט הפעיל נגזר מההתקדמות של טריגר אחד (`Math.floor(progress*n)`), ולא מטריגר לכל פריט, ולכן אין מצב ששני פריטים פתוחים או שאף אחד לא. הפאנל נפתח ב-grid-template-rows מ-0fr ל-1fr כדי לקבל גובה אמיתי בלי למדוד. **בטלפון** התמונה עוברת מעל הרשימה ולא לתוך הפריט הפתוח, כך שמעבר מזיז רק שורת טקסט ולא תמונה שלמה, ובודקים שהתמונה, הכותרות והפריט הפתוח נכנסים יחד במסך. **בהפחתת תנועה, כשהספרייה לא נטענה, או במסך נמוך מדי** (טלפון לרוחב) אין הצמדה: כל הפריטים פתוחים זה מתחת לזה והתמונה דביקה לצידם, כי הקיפול וההצמדה יושבים תחת `.mv-on`."
},
{
  id:"b42", cat:"behavior", name:"מרקי שמגיב למהירות הגלילה", tech:"GSAP · ScrollTrigger velocity", status:"ממתין",
  desc:"רצועה שזורמת לבד, מאיצה כשגוללים מהר, מתהפכת בכיוון כשגוללים אחורה, ומתעוותת קלות לפי המהירות. כשעוצרים היא חוזרת לקצב הבסיס, בכיוון של הגלילה האחרונה.",
  when:"רצועת לוגואים, פס אמון, כותרות ענק, שמות שירותים. שדרוג ישיר של מרקי רגיל: הוא מרגיש חי במקום לולאה מכנית.",
  libs:["gsap","ScrollTrigger"],
  css:`/* direction:ltr על המכולה: בעמוד עברי רצועה ברוחב max-content מתיישרת לימין, והלופ פותח חור ריק בצד.
   row-reverse מחזיר את סדר הקריאה: הפריט הראשון ב-HTML יושב בימין, וקורא מסך שומע את הסדר הרגיל */
.vm{overflow:hidden;direction:ltr;border-block:1px solid var(--line);background:var(--card);padding-block:clamp(16px,2vw,30px)}
.vm+.vm{border-top:0}
.vm-track{display:flex;flex-direction:row-reverse;gap:clamp(28px,4vw,64px);width:max-content;will-change:transform}
.vm-track span{font-size:clamp(26px,4vw,66px);font-weight:800;white-space:nowrap;color:var(--ink)}
.vm-track span.o{color:transparent;-webkit-text-stroke:1px var(--muted)}
.vm.alt .vm-track span{font-size:clamp(18px,2vw,30px);font-weight:600;color:var(--muted)}
.vm-note{text-align:center;color:var(--muted);font-size:14px;padding:18px var(--gutter) 0}`,
  html:`<div class="vm"><div class="vm-track">
  <span>אתרי תדמית</span><span class="o">דפי נחיתה</span><span>חנויות</span><span class="o">מערכות</span>
  <span aria-hidden="true">אתרי תדמית</span><span class="o" aria-hidden="true">דפי נחיתה</span><span aria-hidden="true">חנויות</span><span class="o" aria-hidden="true">מערכות</span>
</div></div>
<div class="vm alt"><div class="vm-track">
  <span>אפיון</span><span>קופי</span><span>עיצוב</span><span>פיתוח</span><span>מדידה</span><span>ליווי</span>
  <span aria-hidden="true">אפיון</span><span aria-hidden="true">קופי</span><span aria-hidden="true">עיצוב</span><span aria-hidden="true">פיתוח</span><span aria-hidden="true">מדידה</span><span aria-hidden="true">ליווי</span>
</div></div>
<p class="vm-note">גלול מהר ולאט, ואז גלול אחורה. הרצועה מגיבה.</p>`,
  js:`(function(){
  const wraps=[...document.querySelectorAll(".vm")];
  // עותקים עד שהרצועה לפחות פי 2 מהמסך הרחב ביותר של המכשיר, אחרת בצד אחד נפתח חור ריק.
  // בלי ספרייה, כדי שגם רצועה עומדת (הפחתת תנועה, CDN חסום) תהיה מלאה עד הקצה.
  // העותקים מוסתרים מקורא מסך, כדי שהמילים לא יוקראו שוב ושוב
  const units=wraps.map(wrap=>{
    const track=wrap.querySelector(".vm-track"),unit=[...track.children];
    const need=Math.max(innerWidth,screen.width||0)*2+200;
    while(track.scrollWidth<need)unit.forEach(k=>{const c=k.cloneNode(true);c.setAttribute("aria-hidden","true");track.appendChild(c);});
    return unit.length;
  });
  if(typeof gsap==="undefined")return;   // בלי הספרייה הרצועה עומדת, מלאה עד הקצה
  // הפחתת תנועה: אין לולאה. הרצועה עומדת במקום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const offs=[];   // מה שצריך לנתק כשההעדפה משתנה להפחתת תנועה (טווינים וטריגרים מתנקים לבד)
    wraps.forEach((wrap,idx)=>{
      const track=wrap.querySelector(".vm-track");
      const all=track.children;
      // אורך הלופ הוא המרחק המדויק בין הפריט הראשון לראשון של החצי השני, כולל הרווח שבתפר.
      // בפונקציה, כדי שיימדד מחדש אחרי שינוי גודל (הגופן גדל עם רוחב המסך)
      const half=()=>Math.abs(all[0].offsetLeft-all[all.length/2].offsetLeft);
      // המשך נגזר ממספר העותקים, כך שהמהירות בפיקסלים לשנייה נשארת כמו שאושרה
      const dur=(14+idx*4)*all.length/units[idx];
      // עמוד עברי: הרצועה זורמת ימינה, ולכן מתחילים במינוס וחוזרים לאפס
      const loop=gsap.fromTo(track,{x:()=>-half()},{x:0,duration:dur,ease:"none",repeat:-1,
        // גלילה אחורה מריצה את הלופ הפוך. בלי זה, כשהוא מגיע לתחילתו הוא נעצר לתמיד
        onReverseComplete(){loop.totalTime(loop.rawTime()+loop.duration()*100);}});
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
      // רצה רק כשהרצועה על המסך. לפי progress ולא isActive, שעדיין לא מוגדר בריענון הראשון
      const run=s=>(s.progress>0&&s.progress<1)?loop.resume():loop.pause();
      ScrollTrigger.create({trigger:wrap,start:"top bottom",end:"bottom top",onToggle:run,onRefresh:run});
      // דעיכה חזרה לקצב הבסיס. בלי זה הרצועה נשארת מהירה לנצח אחרי גלילה חדה.
      const tick=()=>{
        const base=Math.sign(scale)||1;
        if(Math.abs(scale-base)<.02)return;
        scale+=(base-scale)*.05;
        loop.timeScale(scale);
      };
      gsap.ticker.add(tick);
      // שינוי גודל: הגופן והרווח גדלים עם המסך, ולכן מודדים את אורך הלופ מחדש
      let t;const onResize=()=>{clearTimeout(t);t=setTimeout(()=>loop.invalidate(),150);};
      addEventListener("resize",onResize);
      offs.push(()=>{gsap.ticker.remove(tick);removeEventListener("resize",onResize);clearTimeout(t);});
    });
    return ()=>offs.forEach(f=>f());
  });
})();`,
  runway:true,
  note:"getVelocity מחזיר פיקסלים לשנייה עם סימן שמעיד על הכיוון, ומכאן שני האפקטים: timeScale שלילי מהפך את הלולאה, ו-clamp מונע האצה מטורפת בגלילת מגע. חובה להחזיר את הקצב לבסיס אחרי הדחיפה, אחרת הרצועה נשארת מהירה לנצח. ה-skew מוגבל לשמונה מעלות: מעבר לזה הטקסט נעשה לא קריא. **שלוש מלכודות שנמדדו**: בעמוד עברי המכולה חייבת `direction:ltr`, אחרת הרצועה מתיישרת לימין ונפתח חור ריק בצד (עד 888 פיקסלים ב-1280), ו-`row-reverse` מחזיר את סדר הקריאה; הרצועה משוכפלת עד שהיא לפחות פי 2 מרוחב המסך; ו-`onReverseComplete` מקפיץ את הלופ קדימה, אחרת אחרי גלילה אחורה הוא מגיע לתחילתו ונעצר לתמיד. הלופ רץ רק כשהרצועה על המסך, ובהפחתת תנועה היא עומדת במקום."
},
];
