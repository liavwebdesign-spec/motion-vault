// גל awwwards 9-12 (2.9.2026): נכרה מ-melius.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b27", cat:"behavior", name:"טאבים צפים שמחליפים מדיה מלאה", tech:"JS · crossfade", status:"ממתין",
  desc:"שורת כפתורים צפה מעל תמונה במסך מלא. לחיצה מחליפה את המדיה שמאחור בהצלבה רכה, והמחוון מחליק אל הכפתור הפעיל.",
  when:"עמוד שירותים שמציג תחומים שונים, קטלוג לפי קטגוריה, או תיק עבודות לפי סוג. מחליף שלושה סקשנים נפרדים בסקשן אחד.",
  libs:[],
  css:`.tsw{position:relative;min-height:min(84vh,720px);overflow:hidden;display:grid;place-items:end center;padding-bottom:clamp(28px,5vh,60px)}
.tsw-media{position:absolute;inset:0}
.tsw-media .ph{position:absolute;inset:0;border-radius:0;opacity:0;transform:scale(1.06);transition:opacity .7s ease,transform 1.1s cubic-bezier(.2,.8,.2,1);font-size:0}
.tsw-media .ph.on{opacity:1;transform:none}
.tsw::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.5))}
.tsw-in{position:relative;z-index:2;text-align:center;color:#fff;padding-inline:var(--gutter)}
.tsw-cap{min-height:3.4em;margin:0 auto 20px;max-width:34ch}
.tsw-cap h3{font-size:clamp(24px,3vw,44px);margin:0 0 6px;font-weight:800}
.tsw-cap p{margin:0;opacity:.85;font-size:16px}
.tsw-tabs{position:relative;display:inline-flex;gap:4px;padding:5px;border-radius:999px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px)}
.tsw-ind{position:absolute;top:5px;bottom:5px;left:0;border-radius:999px;background:#fff;transition:transform .45s cubic-bezier(.2,.8,.2,1),width .45s cubic-bezier(.2,.8,.2,1);z-index:0}
.tsw-tab{position:relative;z-index:1;border:0;background:none;font:inherit;font-size:15px;font-weight:600;color:#fff;padding:11px 22px;border-radius:999px;cursor:pointer;transition:color .3s;white-space:nowrap}
.tsw-tab[aria-selected="true"]{color:#16182b}
@media (prefers-reduced-motion: reduce){.tsw-ind,.tsw-media .ph{transition-duration:.01ms}}`,
  html:`<div class="stage full" style="padding-block:0"><div class="tsw">
  <div class="tsw-media">
    <div class="ph ph-a on"></div><div class="ph ph-c"></div><div class="ph ph-e"></div>
  </div>
  <div class="tsw-in">
    <div class="tsw-cap"><h3>נדל"ן</h3><p>אתרי תדמית לחברות תיווך ויזמות, עם דגש על אמון ועל נכסים.</p></div>
    <div class="tsw-tabs" role="tablist" aria-label="תחומים">
      <span class="tsw-ind" aria-hidden="true"></span>
      <button class="tsw-tab" role="tab" aria-selected="true" data-i="0" data-t="נדל&quot;ן" data-d="אתרי תדמית לחברות תיווך ויזמות, עם דגש על אמון ועל נכסים.">נדל"ן</button>
      <button class="tsw-tab" role="tab" aria-selected="false" data-i="1" data-t="קליניקות" data-d="עמודים שקטים ומדויקים שמייצרים פניות בלי להיראות מסחריים.">קליניקות</button>
      <button class="tsw-tab" role="tab" aria-selected="false" data-i="2" data-t="חנויות" data-d="חנויות שמוכרות: מסלול קנייה קצר, ודף מוצר שעונה על התנגדויות.">חנויות</button>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  const wrap=document.querySelector(".tsw"),tabs=[...wrap.querySelectorAll(".tsw-tab")];
  const shots=[...wrap.querySelectorAll(".tsw-media .ph")],ind=wrap.querySelector(".tsw-ind");
  const cap=wrap.querySelector(".tsw-cap");
  function moveInd(btn){
    // מודדים מיקום חי ולא מחשבים לפי אינדקס, כך שזה נכון גם ב-RTL וגם אחרי שינוי גודל
    const a=btn.getBoundingClientRect(),b=btn.parentElement.getBoundingClientRect();
    ind.style.width=a.width+"px";
    ind.style.transform="translateX("+(a.left-b.left)+"px)";
  }
  function select(btn){
    tabs.forEach(t=>t.setAttribute("aria-selected",String(t===btn)));
    shots.forEach((s,i)=>s.classList.toggle("on",i===+btn.dataset.i));
    cap.querySelector("h3").textContent=btn.dataset.t;
    cap.querySelector("p").textContent=btn.dataset.d;
    moveInd(btn);
  }
  tabs.forEach(t=>t.addEventListener("click",()=>select(t)));
  wrap.addEventListener("keydown",e=>{
    if(!e.target.classList.contains("tsw-tab"))return;
    const i=tabs.indexOf(e.target);
    let n=null;
    if(e.key==="ArrowLeft")n=tabs[(i+1)%tabs.length];      // בעברית חץ שמאלה מתקדם
    if(e.key==="ArrowRight")n=tabs[(i-1+tabs.length)%tabs.length];
    if(n){e.preventDefault();n.focus();select(n);}
  });
  const start=()=>select(tabs[0]);
  start();
  addEventListener("resize",()=>moveInd(tabs.find(t=>t.getAttribute("aria-selected")==="true")));
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(start);
})();`,
  runway:false,
  note:"המחוון ממוקם לפי מדידה חיה של הכפתור הפעיל, ולכן הוא נוחת נכון גם בעברית וגם אחרי שינוי רוחב או טעינת פונט. חצי המקלדת הפוכים בכוונה: בעברית חץ שמאלה הוא הבא בתור. התמונה הנכנסת מתחילה בהגדלה קלה וחוזרת ל-1, וזה מה שנותן את תחושת ההחלפה במקום הבהוב."
}
];
