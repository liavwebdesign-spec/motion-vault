// גל awwwards 9-12 (2.9.2026): נכרה מ-melius.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b26", cat:"behavior", name:"פס פרומפט שמקליד את עצמו", tech:"JS · typing loop", status:"ממתין",
  desc:"שורת קלט בסגנון צ'אט שמקלידה בעצמה בקשות לדוגמה, מוחקת ומתחילה מחדש, עם סמן מהבהב וכפתור שליחה שמאיר כשהמשפט מלא.",
  when:"הירו של מוצר AI, עמוד שירות שמבוסס שיחה, או הדגמה של מה אפשר לבקש מהמערכת. מראה מה המוצר עושה בלי סרטון ובלי צילום מסך.",
  libs:[],
  css:`.pmt{max-width:min(680px,92vw);margin-inline:auto}
.pmt-bar{display:flex;align-items:center;gap:12px;background:#16182b;color:#fff;border-radius:999px;padding:14px 16px 14px 8px;box-shadow:0 18px 46px rgba(22,24,43,.22)}
.pmt-ico{flex:none;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.1);display:grid;place-items:center;font-size:15px}
.pmt-txt{flex:1;min-width:0;font-size:clamp(14px,1.3vw,17px);line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:clip}
.pmt-caret{display:inline-block;width:2px;height:1.05em;background:#c6ff4a;vertical-align:-.16em;margin-inline-start:2px;animation:pmtblink 1s steps(1,end) infinite}
@keyframes pmtblink{0%,50%{opacity:1}50.01%,100%{opacity:0}}
.pmt-send{flex:none;width:40px;height:40px;border-radius:50%;border:0;cursor:pointer;background:rgba(255,255,255,.14);color:#fff;font-size:17px;
  display:grid;place-items:center;transition:background .3s,transform .3s,color .3s}
.pmt-send.ready{background:#c6ff4a;color:#16182b;transform:scale(1.06)}
.pmt-chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:18px}
.pmt-chips span{font-size:13px;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:7px 14px;background:var(--card)}
.pmt-lead{text-align:center;font-size:clamp(26px,3vw,46px);font-weight:800;margin:0 0 22px}
@media (prefers-reduced-motion: reduce){.pmt-caret{animation:none}}`,
  html:`<div class="stage tight"><div class="pmt">
  <h3 class="pmt-lead">פשוט תבקשו, המערכת עושה</h3>
  <div class="pmt-bar">
    <span class="pmt-ico" aria-hidden="true">✦</span>
    <div class="pmt-txt" aria-live="off"><span class="pmt-out"></span><span class="pmt-caret" aria-hidden="true"></span></div>
    <button class="pmt-send" aria-label="שליחה">←</button>
  </div>
  <div class="pmt-chips"><span>סיכום שיחה</span><span>הצעת מחיר</span><span>תזכורת ללקוח</span><span>דוח חודשי</span></div>
</div></div>`,
  js:`(function(){
  const out=document.querySelector(".pmt-out"),send=document.querySelector(".pmt-send");
  const LINES=["תכתוב לי הצעת מחיר לאתר תדמית לקליניקה","תסכם לי את השיחה עם הלקוח ותוציא משימות","תשלח תזכורת גבייה למי שלא שילם החודש","תבנה לי דוח ביצועים של הקמפיין האחרון"];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){out.textContent=LINES[0];send.classList.add("ready");return;}
  let li=0,ci=0,dir=1;
  function tick(){
    const line=LINES[li];
    ci+=dir;
    out.textContent=line.slice(0,ci);
    send.classList.toggle("ready",ci===line.length);
    let wait=dir>0?38:18;
    if(ci===line.length){dir=-1;wait=1700;}          // עצירה לקריאה לפני המחיקה
    else if(ci===0&&dir<0){dir=1;li=(li+1)%LINES.length;wait=420;}
    setTimeout(tick,wait);
  }
  setTimeout(tick,600);
})();`,
  runway:false,
  note:"בעברית אפשר להקליד תו-תו כי האותיות אינן מחוברות. שלושה זמנים שקובעים אם זה נראה אנושי: 38 מילישניות לתו בהקלדה, 18 במחיקה שהיא תמיד מהירה יותר, ועצירה של 1.7 שניות בסוף המשפט. השורה היא aria-live=\"off\" כדי שקורא מסך לא יקריא כל תו, ובפרודקשן שמים לידה קלט אמיתי."
},
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
},
];
