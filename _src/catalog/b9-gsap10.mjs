// גל awwwards 13-16 (2.9.2026): נכרה מ-era-residence.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g45", cat:"gsap", name:"מפת סביבה: קו שנמתח עם תחנות ומרחקים", tech:"GSAP · DrawSVG · ScrollTrigger", status:"ממתין",
  desc:"קו מפותל נמתח לרוחב הסקשן בקצב הגלילה, ובכל נקודה שהוא מגיע אליה צצה תחנה עם שם ומרחק בדקות נסיעה.",
  when:"נדל\"ן, קליניקות, מלונות ומסעדות: הסקשן שעונה על \"מה יש בסביבה ובכמה זמן מגיעים\". מחליף מפת גוגל סטטית בסיפור שנבנה מול העיניים.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`html,body{overflow-x:clip}
.geo{padding:clamp(60px,8vw,120px) 0 clamp(80px,10vw,150px);background:#faf8f4}
.geo-head{text-align:center;padding-inline:var(--gutter);margin-bottom:clamp(30px,4vw,60px)}
.geo-head h3{font-size:clamp(28px,3.6vw,60px);margin:0 0 10px;font-weight:800}
.geo-head p{margin:0;color:var(--muted)}
.geo-wrap{position:relative;width:min(1100px,94vw);margin-inline:auto}
.geo-wrap svg{width:100%;height:auto;overflow:visible;display:block}
.geo-line{fill:none;stroke:#16182b;stroke-width:2;stroke-linecap:round}
.geo-stop{position:absolute;transform:translate(-50%,-50%);text-align:center;opacity:0}
.geo-dot{width:11px;height:11px;border-radius:50%;background:#16182b;margin-inline:auto;position:relative}
.geo-dot::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:1px solid rgba(22,24,43,.28)}
.geo-name{font-size:clamp(13px,1.1vw,16px);font-weight:700;margin-top:12px;white-space:nowrap}
.geo-min{font-size:12px;color:var(--muted);letter-spacing:.06em;white-space:nowrap}
.geo-home{position:absolute;transform:translate(-50%,-50%);text-align:center}
.geo-home .geo-dot{width:16px;height:16px;background:#c2255c}
.geo-home .geo-name{color:#c2255c}
@media(max-width:767px){.geo-name{font-size:12px}.geo-min{font-size:11px}}`,
  html:`<div class="geo">
  <div class="geo-head"><h3>הכל במרחק נסיעה קצרה</h3><p>גלול, והקו יסמן את מה שיש מסביב</p></div>
  <div class="geo-wrap">
    <svg viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true">
      <path class="geo-line" id="geoPath" d="M970,190 C860,120 800,215 700,175 C610,140 560,205 470,150 C390,100 330,190 240,145 C170,110 110,165 30,120"/>
    </svg>
    <div class="geo-home" style="left:97%;top:73%"><div class="geo-dot"></div><div class="geo-name">הפרויקט</div><div class="geo-min">כאן</div></div>
    <div class="geo-stop" data-p="0.22" style="left:70%;top:67%"><div class="geo-dot"></div><div class="geo-name">מרכז מסחרי</div><div class="geo-min">4 דקות</div></div>
    <div class="geo-stop" data-p="0.42" style="left:47%;top:58%"><div class="geo-dot"></div><div class="geo-name">בית ספר</div><div class="geo-min">7 דקות</div></div>
    <div class="geo-stop" data-p="0.62" style="left:24%;top:56%"><div class="geo-dot"></div><div class="geo-name">הים</div><div class="geo-min">12 דקות</div></div>
    <div class="geo-stop" data-p="0.86" style="left:3%;top:46%"><div class="geo-dot"></div><div class="geo-name">תחנת רכבת</div><div class="geo-min">18 דקות</div></div>
  </div>
</div>`,
  js:`(function(){
  const stops=gsap.utils.toArray(".geo-stop");
  gsap.set(stops,{opacity:0,y:14});
  const tl=gsap.timeline({scrollTrigger:{trigger:".geo-wrap",start:"top 78%",end:"bottom 62%",scrub:.8}});
  // הקו נמתח מהקצה הימני שמאלה, ככיוון הקריאה: ה-path מוגדר כך שנקודת ההתחלה שלו בימין
  tl.fromTo("#geoPath",{drawSVG:"0% 0%"},{drawSVG:"0% 100%",ease:"none",duration:1},0);
  // כל תחנה נדלקת ברגע שהקו עובר לידה
  stops.forEach(s=>{
    tl.to(s,{opacity:1,y:0,duration:.12,ease:"back.out(2)"},+s.dataset.p);
  });
})();`,
  note:"המיקומים של התחנות באחוזים מעל אותו viewBox, ולכן הכל נשאר מיושר בכל רוחב מסך בלי חישוב ב-JS. ה-data-p הוא המקום בטיימליין שבו התחנה נדלקת, והוא מכוון לרגע שבו קצה הקו מגיע אליה. בפרויקט אמיתי מחליפים את ה-path בקו שמצויר לפי המפה של האזור."
},
];
