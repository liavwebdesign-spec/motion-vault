// גל awwwards 5-8 (2.9.2026): נכרה מ-neutomni.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g43", cat:"gsap", name:"רשימת פרויקטים עם תצוגה מקדימה שעוקבת אחרי הסמן", tech:"GSAP · quickTo", status:"ממתין",
  desc:"רשימת שורות נקייה. כשהסמן נכנס לשורה, חלונית תמונה נפתחת וצפה ליד הסמן, ומתחלפת ברכות בכל מעבר לשורה אחרת. יציאה מהרשימה סוגרת אותה.",
  when:"תיק עבודות, רשימת שירותים, מאמרים. הדרך להציג עשרים פרויקטים בלי גריד כבד ובלי לטעון עשרים תמונות בכניסה.",
  libs:["gsap"],
  css:`.pl{padding-inline:var(--gutter);position:relative}
.pl-row{display:flex;align-items:baseline;gap:18px;padding:clamp(18px,2.2vw,32px) 4px;border-top:1px solid var(--line);cursor:pointer;position:relative}
.pl-row:last-child{border-bottom:1px solid var(--line)}
.pl-row .idx{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums;min-width:3ch}
.pl-row h3{margin:0;font-size:clamp(24px,3vw,50px);font-weight:800;transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .3s}
.pl-row .tags{margin-inline-start:auto;font-size:12px;letter-spacing:.1em;color:var(--muted)}
.pl.hovering .pl-row h3{opacity:.35}
.pl-row.on h3{opacity:1;transform:translateX(-16px)}
/* עוגן פיזי ולא לוגי: חשבון המיקום נעשה בקואורדינטות המסך, וב-RTL עוגן לוגי היה מזיז אותו לקצה הימני */
.pl-prev{position:fixed;top:0;left:0;width:min(330px,34vw);aspect-ratio:4/3;border-radius:12px;overflow:hidden;
  pointer-events:none;z-index:20;opacity:0;transform:scale(.94);will-change:transform;box-shadow:0 24px 60px rgba(0,0,0,.22)}
.pl-prev .ph{position:absolute;inset:0;font-size:28px;opacity:0}
.pl-prev .ph.on{opacity:1}
.pl-hint{color:var(--muted);font-size:14px;padding-inline:var(--gutter);margin-bottom:10px}
@media(max-width:767px){.pl-prev{display:none}.pl-row .tags{display:none}.pl.hovering .pl-row h3{opacity:1}}`,
  html:`<div class="stage tight">
<p class="pl-hint">העבר עכבר על השורות. במובייל התצוגה המקדימה מוסתרת והרשימה נשארת רשימה.</p>
<div class="pl">
  <div class="pl-row" data-i="0"><span class="idx">01</span><h3>מותג לחברת נדל"ן</h3><span class="tags">מיתוג · אתר</span></div>
  <div class="pl-row" data-i="1"><span class="idx">02</span><h3>חנות תכשיטים</h3><span class="tags">איקומרס</span></div>
  <div class="pl-row" data-i="2"><span class="idx">03</span><h3>קליניקה פרטית</h3><span class="tags">אתר · קופי</span></div>
  <div class="pl-row" data-i="3"><span class="idx">04</span><h3>אפליקציית כושר</h3><span class="tags">מוצר</span></div>
  <div class="pl-row" data-i="4"><span class="idx">05</span><h3>יקב בוטיק</h3><span class="tags">מיתוג</span></div>
</div>
<div class="pl-prev">
  <div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div><div class="ph ph-e">5</div>
</div></div>`,
  js:`(function(){
  const list=document.querySelector(".pl"),prev=document.querySelector(".pl-prev");
  const rows=[...list.querySelectorAll(".pl-row")],shots=[...prev.querySelectorAll(".ph")];
  if(!matchMedia("(hover:hover)").matches)return;
  // quickTo נותן מעקב רך אחרי הסמן בלי ליצור טווין חדש בכל אירוע
  const xTo=gsap.quickTo(prev,"x",{duration:.55,ease:"power3"});
  const yTo=gsap.quickTo(prev,"y",{duration:.55,ease:"power3"});
  const w=()=>prev.offsetWidth,h=()=>prev.offsetHeight;
  let shown=false,placed=false;
  function place(e){
    // בעברית הסמן קורא ימינה-שמאלה, ולכן החלונית יושבת משמאל לסמן
    let x=e.clientX-w()-26;
    if(x<12)x=e.clientX+26;
    let y=gsap.utils.clamp(12,window.innerHeight-h()-12,e.clientY-h()/2);
    // המיקום הראשון נקבע מיידית, אחרת החלונית נפתחת בפינת המסך וטסה משם
    if(!placed){placed=true;gsap.set(prev,{x:x,y:y});}
    xTo(x);yTo(y);
  }
  list.addEventListener("pointermove",place);
  rows.forEach(r=>{
    r.addEventListener("pointerenter",()=>{
      rows.forEach(x=>x.classList.toggle("on",x===r));
      shots.forEach((s,i)=>s.classList.toggle("on",i===+r.dataset.i));
      if(!shown){
        shown=true;list.classList.add("hovering");
        gsap.to(prev,{opacity:1,scale:1,duration:.35,ease:"power3.out"});
      }
    });
  });
  list.addEventListener("pointerleave",()=>{
    shown=false;list.classList.remove("hovering");
    rows.forEach(x=>x.classList.remove("on"));
    gsap.to(prev,{opacity:0,scale:.94,duration:.25,ease:"power2.in"});
  });
})();`,
  runway:false,
  note:"שני פרטים שעושים את ההבדל: השורות שאינן מרחפות דוהות ל-35 אחוז כך שהעין ננעלת על אחת, והחלונית נעצרת בשולי המסך במקום להיחתך. במובייל המהלך כבוי לגמרי, כי אין שם hover והשורות צריכות להישאר קריאות."
},
];
