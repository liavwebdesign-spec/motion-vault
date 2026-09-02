// CSS23: מעבר מצבים עם View Transitions API. השראה: מנגנון מעבר העמודים ב-madewithgsap, בגרסה מודרנית ונטיבית.
export default [
{
  id:"css23", cat:"css", name:"מעבר מצבים חלק (View Transitions)", tech:"View Transitions API", status:"ממתין",
  desc:"החלפת תוכן בלי קפיצה: הדפדפן מצלם את המצב הישן והחדש ומנפיש ביניהם לבד. פריט שנבחר גדל למקומו החדש כי שני הצדדים חולקים אותו view-transition-name.",
  when:"מעבר מגריד לתצוגת פריט, החלפת טאבים, מיון רשימה. חלופה נטיבית ל-Flip כשלא רוצים ספרייה. בדפדפן שלא תומך התוכן פשוט מתחלף מיד, בלי שבירה.",
  libs:[],
  css:`@view-transition{navigation:auto}
.vt-wrap{padding-inline:var(--gutter)}
.vt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap)}
.vt-item{aspect-ratio:4/3;border-radius:var(--r);cursor:pointer;font-size:22px}
.vt-detail{display:grid;grid-template-columns:1.1fr 1fr;gap:var(--gap);align-items:center}
.vt-detail .vt-item{aspect-ratio:16/10;font-size:34px;cursor:default}
.vt-back{margin-bottom:18px}
.vt-note{color:var(--muted);font-size:14px;margin-top:18px}
.vt-detail h3{font-size:clamp(24px,2.4vw,38px);margin:0 0 10px}
.vt-detail p{color:var(--muted);margin:0}
::view-transition-old(root),::view-transition-new(root){animation-duration:.42s;animation-timing-function:cubic-bezier(.2,.8,.2,1)}
@media(prefers-reduced-motion:reduce){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}}
@media(max-width:767px){.vt-grid{grid-template-columns:repeat(2,1fr)}.vt-detail{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="vt-wrap">
  <div class="vt-stage"></div>
  <p class="vt-note">לחץ על פריט ואז על חזרה. אם הדפדפן לא תומך ב-View Transitions, ההחלפה פשוט מיידית.</p>
</div></div>`,
  js:`(function(){
  const stage=document.querySelector(".vt-stage");
  const ITEMS=[{n:"1",c:"ph-a",t:"מהלך ראשון"},{n:"2",c:"ph-b",t:"מהלך שני"},{n:"3",c:"ph-c",t:"מהלך שלישי"},
               {n:"4",c:"ph-d",t:"מהלך רביעי"},{n:"5",c:"ph-e",t:"מהלך חמישי"},{n:"6",c:"ph-f",t:"מהלך שישי"}];
  const grid=()=>'<div class="vt-grid">'+ITEMS.map(i=>
    '<div class="vt-item ph '+i.c+'" data-n="'+i.n+'" style="view-transition-name:card-'+i.n+'">'+i.n+'</div>').join("")+'</div>';
  const detail=i=>'<button class="gbtn vt-back">→ חזרה לכל הפריטים</button>'+
    '<div class="vt-detail"><div class="vt-item ph '+i.c+'" style="view-transition-name:card-'+i.n+'">'+i.n+'</div>'+
    '<div><h3>'+i.t+'</h3><p>אותו אלמנט בדיוק, בגודל ובמיקום חדשים. הדפדפן מנפיש את המעבר בעצמו, בלי ספריית אנימציה.</p></div></div>';
  function swap(html){
    const paint=()=>{stage.innerHTML=html;bind();};
    if(document.startViewTransition)document.startViewTransition(paint);else paint();
  }
  function bind(){
    stage.querySelectorAll(".vt-grid .vt-item").forEach(el=>
      el.addEventListener("click",()=>swap(detail(ITEMS.find(i=>i.n===el.dataset.n)))));
    const back=stage.querySelector(".vt-back");
    if(back)back.addEventListener("click",()=>swap(grid()));
  }
  stage.innerHTML=grid();bind();
})();`,
  runway:false,
  note:"התמיכה: כרום ואדג' מלאה, ספארי 18 ומעלה, פיירפוקס עדיין לא. הקוד כתוב כך שהיעדר תמיכה מחליף תוכן מיד במקום להישבר, ותחת prefers-reduced-motion המעבר מבוטל."
},
];
