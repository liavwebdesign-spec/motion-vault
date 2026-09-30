// גל gsap.com (2.9.2026): נכרה מעמוד הבית של GSAP עצמם ושוחזר מאפס.
export default [
{
  id:"g40", cat:"gsap", name:"סצנה אופקית שכל אלמנט בה מתעורר בתורו", tech:"GSAP · ScrollTrigger · RTL", status:"ממתין",
  desc:"סקשן שננעל למסך והתוכן גולש הצידה, אבל הפעם כל פריט בתוך המסלול מקבל טריגר משלו לפי המיקום האופקי שלו: הוא נכנס כשהוא מגיע לאזור הצפייה, ולא כשהסקשן כולו נכנס. אלמנט אחד בפנים גם מסתובב בסקראב משלו.",
  when:"סיפור אופקי עם תחנות: מסע לקוח, ציר זמן, שלבי תהליך. זה מה שהופך גלילה צידית מרצועה שזזה לסצנה שמתרחשת. ההבדל מ-MV:g01 הוא בדיוק זה.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.hz{overflow:hidden;background:#0f1020;color:#fff;transition:all 0s}
/* בלי תנועה (וגם בלי JS) התחנות נשברות לשורות וכולן על המסך. המסלול האופקי קיים רק תחת .is-live */
.hz-track{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:64px clamp(48px,11vw,220px);padding:var(--sec) var(--gutter)}
.hz.is-live .hz-track{flex-wrap:nowrap;justify-content:flex-start;width:max-content;padding-block:0;padding-inline:24vw 10vw;height:100vh}
.hz-item{flex:0 0 auto;text-align:center;will-change:transform}
.hz-num{font-size:13px;letter-spacing:.16em;color:#8d8fb0;margin-bottom:14px}
.hz-item h3{font-size:clamp(26px,2.6vw,46px);margin:0 0 10px;font-weight:800}
.hz-item p{margin:0 auto;max-width:32ch;color:#b9bad0;font-size:15px;line-height:1.6}
.hz-card{width:min(420px,74vw);aspect-ratio:4/3;margin-inline:auto;margin-bottom:22px;font-size:26px}
.hz-scrub{display:none;width:120px;height:120px;flex:0 0 auto;border-radius:26px;background:linear-gradient(140deg,#c6ff4a,var(--accent));place-items:center;font-size:34px;color:#0f1020}
.hz.is-live .hz-scrub{display:grid}
.hz-lead{flex:0 0 min(760px,82vw)}
.hz-lead h2{font-size:clamp(34px,4vw,72px);margin:0 0 12px;font-weight:800;line-height:1.1}
.hz-lead p{color:#b9bad0;margin:0;font-size:16px}`,
  html:`<div class="hz"><div class="hz-track">
  <div class="hz-lead"><h2>ארבע תחנות, גלילה אחת</h2><p>גלול למטה. המסלול זז הצידה, וכל תחנה נכנסת ברגע שהיא מגיעה לאזור הצפייה.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-a">1</div><div class="hz-num">תחנה 01</div><h3>היכרות</h3><p>מבינים את המצב הקיים ואת מה שצריך לקרות.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-b">2</div><div class="hz-num">תחנה 02</div><h3>אפיון</h3><p>מגדירים מבנה, תוכן והיררכיה לפני שנוגעים בעיצוב.</p></div>
  <div class="hz-scrub" aria-hidden="true">✦</div>
  <div class="hz-item"><div class="hz-card ph ph-c">3</div><div class="hz-num">תחנה 03</div><h3>בנייה</h3><p>מרכיבים את העמוד ובודקים אותו בכל רוחב מסך.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-d">4</div><div class="hz-num">תחנה 04</div><h3>עלייה לאוויר</h3><p>מפרסמים, מודדים ומתקנים לפי מה שקורה באמת.</p></div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const hz=document.querySelector(".hz");
  const track=hz.querySelector(".hz-track");
  const items=gsap.utils.toArray(".hz-item");
  const spinner=hz.querySelector(".hz-scrub");
  const clamp=gsap.utils.clamp(0,1);

  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    hz.classList.add("is-live");
    // הרצועה יושבת ב-RTL: הפריט הראשון בימין, והגלישה יוצאת שמאלה.
    // לכן x חיובי, והמצלמה נעה שמאלה בתוך התוכן, ככיוון הקריאה בעברית.
    const setX=gsap.quickSetter(track,"x","px");
    const setY=items.map(it=>gsap.quickSetter(it,"y","px"));
    const setRot=gsap.quickSetter(spinner,"rotation","deg");

    // כל המידות נמדדות פעם אחת בכל רענון ונשמרות. בגלילה עצמה אין שום קריאת layout.
    let dist=1,vw=1,right0=[],w=[],sRight0=0,sW=0,lastX=0;
    function measure(){
      dist=Math.max(1,track.scrollWidth-window.innerWidth);
      vw=window.innerWidth;
      // השפה הימנית של כל פריט על המסך כשהרצועה בנקודת ההתחלה (x=0)
      right0=items.map(it=>it.getBoundingClientRect().right-lastX);
      w=items.map(it=>it.offsetWidth);
      const r=spinner.getBoundingClientRect();
      sW=spinner.offsetWidth;
      sRight0=(r.left+r.right)/2+sW/2-lastX;
    }

    // כל פריט מקבל את המצב שלו מהמיקום שלו על המסך ברגע הנתון.
    // בעברית הפריט נכנס דרך שפת המסך השמאלית, ולכן מודדים את השפה הימנית שלו.
    function paint(progress){
      const x=dist*progress;
      lastX=x;setX(x);
      items.forEach((item,i)=>{
        // כמה מהפריט כבר חצה את שפת המסך השמאלית. אחד = הוא כולו בפנים.
        const f=clamp((right0[i]+x)/w[i]);
        item.style.opacity=f;item.style.visibility=f>0?"":"hidden";
        setY[i](70*(1-f));
      });
      setRot(270*clamp((sRight0+x)/(vw+sW)));
    }

    const st=ScrollTrigger.create({
      // עד 2.4 מסכים: paint עובד לפי progress, ולכן קיצור המסלול לא שובר את החשבון
      trigger:track,pin:hz,start:"top top",end:()=>"+="+Math.min(Math.max(1,track.scrollWidth-window.innerWidth),window.innerHeight*2.4),
      anticipatePin:1,invalidateOnRefresh:true,
      onRefresh:self=>{measure();paint(self.progress);},
      onUpdate:self=>paint(self.progress)
    });
    measure();paint(st.progress);
    return ()=>{hz.classList.remove("is-live");gsap.set([track,spinner].concat(items),{clearProps:"all"});};
  });
})();`,
  note:"<b>כיוון:</b> הרצועה נשארת RTL, התחנה הראשונה בימין, ו-x חיובי. המצלמה נעה שמאלה בתוך התוכן וכל תחנה נכנסת דרך שפת המסך השמאלית, ככיוון הקריאה בעברית. באתר אנגלי הופכים את הסימן ומודדים את השפה השמאלית של הפריט במקום הימנית.<br><b>למה לא containerAnimation:</b> זו הדרך הרשמית לתלות אנימציות במיקום אופקי, אבל היא מודדת נכון רק כשהרצועה מתחילה בקצה השמאלי. בתוך קונטיינר RTL ילד עם width:max-content שרחב מהמסך מתיישר לקצה הימני והגלישה יוצאת שמאלה, כלומר נקודת האפס שלו היא כבר סוף הרצועה, וכל המדידות יוצאות מוזזות באורך מסלול שלם. זו התנהגות פריסה של הדפדפן ולא באג ב-GSAP. לכן כאן כל פריט מקבל את מצבו מהמיקום החי שלו על המסך, שיטה שעובדת בשני הכיוונים ולא תלויה בפרשנות של left ו-right.<br><b>ביצועים:</b> המיקומים נמדדים פעם אחת בכל רענון ונשמרים, ובגלילה עצמה נכתבים רק ערכים (quickSetter), בלי שום קריאת layout. אורך הסצנה מוגבל ל-2.4 מסכים.<br><b>בלי תנועה:</b> בהפחתת תנועה, וגם כש-GSAP לא נטען, אין נעילה: התחנות נשברות לשורות וכולן על המסך, כי המסלול האופקי קיים רק תחת .is-live שהסקריפט מוסיף."
},

];
