// גל gsap.com (2.9.2026): נכרה מעמוד הבית של GSAP עצמם ושוחזר מאפס.
export default [
{
  id:"g40", cat:"gsap", name:"סצנה אופקית שכל אלמנט בה מתעורר בתורו", tech:"GSAP · ScrollTrigger · RTL", status:"ממתין",
  desc:"סקשן שננעל למסך והתוכן גולש הצידה, אבל הפעם כל פריט בתוך המסלול מקבל טריגר משלו לפי המיקום האופקי שלו: הוא נכנס כשהוא מגיע לאזור הצפייה, ולא כשהסקשן כולו נכנס. אלמנט אחד בפנים גם מסתובב בסקראב משלו.",
  when:"סיפור אופקי עם תחנות: מסע לקוח, ציר זמן, שלבי תהליך. זה מה שהופך גלילה צידית מרצועה שזזה לסצנה שמתרחשת. ההבדל מ-MV:g01 הוא בדיוק זה.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.hz{overflow:hidden;background:#0f1020;color:#fff}
.hz-track{display:flex;align-items:center;gap:clamp(48px,11vw,220px);width:max-content;padding-inline:24vw 10vw;height:100vh}
.hz-item{flex:0 0 auto;text-align:center;will-change:transform}
.hz-num{font-size:13px;letter-spacing:.16em;color:#8d8fb0;margin-bottom:14px}
.hz-item h3{font-size:clamp(26px,2.6vw,46px);margin:0 0 10px;font-weight:800}
.hz-item p{margin:0 auto;max-width:32ch;color:#b9bad0;font-size:15px;line-height:1.6}
.hz-card{width:min(420px,74vw);aspect-ratio:4/3;margin-inline:auto;margin-bottom:22px;font-size:26px}
.hz-scrub{width:120px;height:120px;flex:0 0 auto;border-radius:26px;background:linear-gradient(140deg,#c6ff4a,#4a3aff);display:grid;place-items:center;font-size:34px;color:#0f1020}
.hz-lead{flex:0 0 min(760px,82vw)}
.hz-lead h2{font-size:clamp(34px,4vw,72px);margin:0 0 12px;font-weight:800;line-height:1.1}
.hz-lead p{color:#b9bad0;margin:0;font-size:16px}`,
  html:`<div class="hz"><div class="hz-track">
  <div class="hz-lead"><h2>ארבע תחנות, גלילה אחת</h2><p>גלול למטה. המסלול זז הצידה, וכל תחנה נכנסת ברגע שהיא מגיעה לאזור הצפייה.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-a">1</div><div class="hz-num">תחנה 01</div><h3>הכירות</h3><p>מבינים את המצב הקיים ואת מה שצריך לקרות.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-b">2</div><div class="hz-num">תחנה 02</div><h3>אפיון</h3><p>מגדירים מבנה, תוכן והיררכיה לפני שנוגעים בעיצוב.</p></div>
  <div class="hz-scrub" aria-hidden="true">✦</div>
  <div class="hz-item"><div class="hz-card ph ph-c">3</div><div class="hz-num">תחנה 03</div><h3>בנייה</h3><p>מרכיבים את העמוד ובודקים אותו בכל רוחב מסך.</p></div>
  <div class="hz-item"><div class="hz-card ph ph-d">4</div><div class="hz-num">תחנה 04</div><h3>עלייה לאוויר</h3><p>מפרסמים, מודדים ומתקנים לפי מה שקורה באמת.</p></div>
</div></div>`,
  js:`(function(){
  const track=document.querySelector(".hz-track");
  const items=gsap.utils.toArray(".hz-item");
  const spinner=document.querySelector(".hz-scrub");
  const dist=()=>Math.max(1,track.scrollWidth-window.innerWidth);
  const clamp=gsap.utils.clamp(0,1);

  // הרצועה יושבת ב-RTL: הפריט הראשון בימין, והגלישה יוצאת שמאלה.
  // לכן x חיובי, והמצלמה נעה שמאלה בתוך התוכן, ככיוון הקריאה בעברית.
  let origin=0; // המיקום של שפת הרצועה על המסך כשהיא בנקודת ההתחלה

  function measure(){
    origin=track.getBoundingClientRect().left-(gsap.getProperty(track,"x")||0);
  }

  // כל פריט מקבל את המצב שלו מהמיקום שלו על המסך ברגע הנתון.
  // בעברית הפריט נכנס דרך שפת המסך השמאלית, ולכן מודדים את השפה הימנית שלו.
  function paint(progress){
    const x=dist()*progress;
    gsap.set(track,{x:x});
    const vw=window.innerWidth;
    items.forEach(item=>{
      // כמה מהפריט כבר חצה את שפת המסך השמאלית. אחד = הוא כולו בפנים.
      const right=origin+item.offsetLeft+item.offsetWidth+x;
      const f=clamp(right/item.offsetWidth);
      gsap.set(item,{autoAlpha:f,y:70*(1-f)});
    });
    const sRight=origin+spinner.offsetLeft+spinner.offsetWidth+x;
    gsap.set(spinner,{rotation:270*clamp(sRight/(vw+spinner.offsetWidth))});
  }

  ScrollTrigger.create({
    trigger:track,pin:track.parentNode,start:"top top",end:()=>"+="+dist(),
    anticipatePin:1,invalidateOnRefresh:true,
    onRefresh:self=>{measure();paint(self.progress);},
    onUpdate:self=>paint(self.progress)
  });
  measure();paint(0);
})();`,
  note:"<b>כיוון:</b> הרצועה נשארת RTL, התחנה הראשונה בימין, ו-x חיובי. המצלמה נעה שמאלה בתוך התוכן וכל תחנה נכנסת דרך שפת המסך השמאלית, ככיוון הקריאה בעברית. באתר אנגלי הופכים את הסימן ומודדים את השפה השמאלית של הפריט במקום הימנית.<br><b>למה לא containerAnimation:</b> זו הדרך הרשמית לתלות אנימציות במיקום אופקי, אבל היא מודדת נכון רק כשהרצועה מתחילה בקצה השמאלי. בתוך קונטיינר RTL ילד עם width:max-content שרחב מהמסך מתיישר לקצה הימני והגלישה יוצאת שמאלה, כלומר נקודת האפס שלו היא כבר סוף הרצועה, וכל המדידות יוצאות מוזזות באורך מסלול שלם. זו התנהגות פריסה של הדפדפן ולא באג ב-GSAP. לכן כאן כל פריט מקבל את מצבו מהמיקום החי שלו על המסך, שיטה שעובדת בשני הכיוונים ולא תלויה בפרשנות של left ו-right."
},

];
