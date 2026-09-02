// גל המקורות של ליאב (2.9.2026): נכרה מ-axionmediacompany.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g46", cat:"gsap", name:"גרף תוצאות שנמתח בגלילה", tech:"GSAP · DrawSVG · MotionPath", status:"ממתין",
  desc:"קו גרף שמצייר את עצמו בקצב הגלילה, נקודה שרצה על הקו, ומספר שמטפס יחד איתה עד לערך הסופי. השטח מתחת לקו מתמלא בהדרגה.",
  when:"סקשן תוצאות בכל עסק: גידול בפניות, החזר על השקעה, מטופלים, מכירות, חיסכון. מחליף מספר סטטי בהוכחה שמתרחשת מול העיניים.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin","MotionPathPlugin"],
  css:`.chart{padding-inline:var(--gutter)}
.chart-in{max-width:min(980px,94vw);margin-inline:auto;position:relative}
.chart-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:clamp(18px,2vw,30px)}
.chart-head h3{font-size:clamp(24px,3vw,46px);margin:0;font-weight:800;max-width:20ch}
.chart-kpi{text-align:end}
.chart-val{font-size:clamp(38px,5vw,84px);font-weight:800;line-height:1;font-variant-numeric:tabular-nums;color:var(--accent);direction:ltr}
.chart-lbl{font-size:14px;color:var(--muted);margin-top:6px}
.chart-wrap{position:relative}
.chart-wrap svg{width:100%;height:auto;overflow:visible;display:block}
.chart-grid line{stroke:var(--line);stroke-width:1}
.chart-area{fill:url(#chartFill);opacity:0}
.chart-line{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.chart-dot{fill:#fff;stroke:var(--accent);stroke-width:3}
/* ציר הזמן ב-ltr כדי שהתוויות יתאימו לכיוון שבו הקו עולה. גרפים ומספרים נקראים משמאל לימין גם בעמוד עברי */
.chart-x{display:flex;justify-content:space-between;margin-top:12px;font-size:12px;color:var(--muted);letter-spacing:.06em;direction:ltr}`,
  html:`<div class="stage chart"><div class="chart-in">
  <div class="chart-head">
    <h3>מה קרה בחצי שנה</h3>
    <div class="chart-kpi"><div class="chart-val" data-to="394">0</div><div class="chart-lbl">פניות בחודש, לעומת 41 בהתחלה</div></div>
  </div>
  <div class="chart-wrap">
    <svg viewBox="0 0 900 320" preserveAspectRatio="none" aria-label="גרף גידול בפניות">
      <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a3aff" stop-opacity=".28"/><stop offset="1" stop-color="#4a3aff" stop-opacity="0"/>
      </linearGradient></defs>
      <g class="chart-grid">
        <line x1="0" y1="40" x2="900" y2="40"/><line x1="0" y1="120" x2="900" y2="120"/>
        <line x1="0" y1="200" x2="900" y2="200"/><line x1="0" y1="280" x2="900" y2="280"/>
      </g>
      <path class="chart-area" d="M20,280 C160,268 250,232 340,214 C440,194 520,196 610,150 C700,104 780,74 880,38 L880,300 L20,300 Z"/>
      <path class="chart-line" id="chartLine" d="M20,280 C160,268 250,232 340,214 C440,194 520,196 610,150 C700,104 780,74 880,38"/>
      <circle class="chart-dot" id="chartDot" r="7" cx="20" cy="280"/>
    </svg>
    <div class="chart-x"><span>ינואר</span><span>פברואר</span><span>מרץ</span><span>אפריל</span><span>מאי</span><span>יוני</span></div>
  </div>
</div></div>`,
  js:`(function(){
  const val=document.querySelector(".chart-val");
  const target=+val.dataset.to;
  const num={n:0};
  const tl=gsap.timeline({scrollTrigger:{trigger:".chart-in",start:"top 72%",end:"bottom 78%",scrub:.7}});
  tl.fromTo("#chartLine",{drawSVG:"0% 0%"},{drawSVG:"0% 100%",ease:"none"},0);
  // הנקודה נוסעת על אותו path בדיוק, ולכן היא תמיד יושבת על קצה הקו
  tl.to("#chartDot",{motionPath:{path:"#chartLine",align:"#chartLine",alignOrigin:[.5,.5]},ease:"none"},0);
  tl.to(".chart-area",{opacity:1,ease:"none"},0);
  tl.to(num,{n:target,ease:"none",onUpdate:()=>{val.textContent=Math.round(num.n).toLocaleString("he-IL");}},0);
})();`,
  note:"<b>מלכודת RTL שנתפסה בבדיקה:</b> ה-SVG לא מושפע מכיוון העמוד, ולכן הקו תמיד עולה משמאל לימין, בעוד שורת התוויות ב-flex התהפכה והציגה את ינואר בימין. התוצאה הייתה גרף שבו ההתחלה מסומנת כחודש האחרון. הפתרון: direction:ltr על שורת התוויות, בדיוק כמו שעושים למספרים. הנקודה נעה על אותו path של הקו דרך MotionPath, ולכן היא לא יכולה להתנתק ממנו בשום רוחב מסך. המספר מונפש על אובייקט עזר ולא על ה-DOM, וה-onUpdate כותב אותו מעוגל. השטח שמתחת לקו הוא path נפרד שנסגר לתחתית, כי אי אפשר למלא path פתוח. בפרויקט אמיתי מייצרים את ה-d מהנתונים במקום לכתוב אותו ידנית."
},
];
