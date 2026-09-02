// גל awwwards 9-12 (2.9.2026): נכרה מ-brand.squarespace.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g44", cat:"gsap", name:"סמן מותג שנבנה כמו בתוכנת וקטור", tech:"GSAP · DrawSVG", status:"ממתין",
  desc:"הצורה מציירת את עצמה, ואז צצות עליה נקודות העוגן וידיות הבקרה, כאילו פתחו אותה בתוכנת עיצוב. בסוף הכל נעלם והצורה נשארת נקייה.",
  when:"סקשן מותג או אודות אצל מעצבים, סטודיו ומשרדי אדריכלות. פעם אחת בעמוד, כרגע של גאווה מקצועית.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.vg-stage{display:grid;place-items:center;gap:22px}
.vg-svg{width:min(420px,74vw);height:auto;overflow:visible}
.vg-shape{fill:none;stroke:var(--ink);stroke-width:14;stroke-linecap:round;stroke-linejoin:round}
.vg-handle{stroke:#7b7ee8;stroke-width:1.5;opacity:0}
.vg-node{fill:#fff;stroke:#4a3aff;stroke-width:2;opacity:0}
.vg-ctrl{fill:#7b7ee8;opacity:0}
.vg-cap{font-size:14px;color:var(--muted);letter-spacing:.06em}
.vg-btn{margin-top:4px}`,
  html:`<div class="stage"><div class="vg-stage">
<svg class="vg-svg" viewBox="0 0 300 220" aria-label="סמן מותג לדוגמה">
  <path class="vg-shape" id="vgPath" d="M40,180 C40,80 110,30 150,30 C190,30 260,80 260,180"/>
  <path class="vg-shape" id="vgPath2" d="M95,180 C95,120 120,95 150,95 C180,95 205,120 205,180"/>
  <line class="vg-handle" x1="40" y1="180" x2="40" y2="118"/>
  <line class="vg-handle" x1="150" y1="30" x2="96" y2="30"/>
  <line class="vg-handle" x1="150" y1="30" x2="204" y2="30"/>
  <line class="vg-handle" x1="260" y1="180" x2="260" y2="118"/>
  <circle class="vg-ctrl" cx="40" cy="118" r="4"/>
  <circle class="vg-ctrl" cx="96" cy="30" r="4"/>
  <circle class="vg-ctrl" cx="204" cy="30" r="4"/>
  <circle class="vg-ctrl" cx="260" cy="118" r="4"/>
  <rect class="vg-node" x="34" y="174" width="12" height="12"/>
  <rect class="vg-node" x="144" y="24" width="12" height="12"/>
  <rect class="vg-node" x="254" y="174" width="12" height="12"/>
  <rect class="vg-node" x="89" y="174" width="12" height="12"/>
  <rect class="vg-node" x="144" y="89" width="12" height="12"/>
  <rect class="vg-node" x="199" y="174" width="12" height="12"/>
</svg>
<p class="vg-cap">הצורה נבנית, הנקודות מתגלות, והכל נסגר</p>
<button class="gbtn vg-btn">הרץ שוב</button>
</div></div>`,
  js:`(function(){
  const paths=["#vgPath","#vgPath2"];
  const nodes=".vg-node",ctrls=".vg-ctrl",handles=".vg-handle";
  function build(){
    const tl=gsap.timeline();
    tl.fromTo(paths,{drawSVG:"0% 0%"},{drawSVG:"0% 100%",duration:.9,ease:"power2.inOut",stagger:.18});
    tl.to(nodes,{opacity:1,duration:.28,ease:"back.out(3)",stagger:.06},"-=.25");
    tl.to(handles,{opacity:.9,duration:.3},"-=.2");
    tl.to(ctrls,{opacity:1,duration:.3,stagger:.05},"<");
    tl.to([handles,ctrls],{opacity:0,duration:.4},"+=1.4");   // הכלים נעלמים, הצורה נשארת
    tl.to(nodes,{opacity:0,duration:.4},"<");
    return tl;
  }
  let tl=null;
  ScrollTrigger.create({trigger:".vg-stage",start:"top 72%",
    onEnter:()=>{if(!tl)tl=build();},
    onRefresh:self=>{if(!tl&&self.progress>0)tl=build();}});
  document.querySelector(".vg-btn").addEventListener("click",()=>{
    gsap.set([nodes,ctrls,handles],{opacity:0});
    tl=build();
  });
})();`,
  runway:true,
  note:"ה-drawSVG רץ מ-\"0% 0%\" ל-\"0% 100%\" ולכן הקו נמתח מהתחלת ה-path. הנקודות הן ריבועים והידיות עיגולים, בדיוק כמו בתוכנות וקטור, וזה מה שגורם למוח לזהות מיד את הרפרנס. הטריגר נבנה גם ב-onRefresh כשהגולש נוחת באמצע העמוד, אחרת המהלך לא נורה בכלל."
},
];
