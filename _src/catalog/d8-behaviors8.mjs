// גל awwwards, סריקה רוחבית של 46 אתרים (2.9.2026).
// נבחרו רק דפוסים שחזרו על עצמם בעשרות אתרים ומתאימים לכל סוג עסק.
export default [
{
  id:"b30", cat:"behavior", name:"אקורדיון שאלות ותשובות", tech:"CSS grid-rows · JS", status:"ממתין",
  desc:"רשימת שאלות שנפתחות בגובה אמיתי, בלי לקפוץ ובלי לחשב פיקסלים. לחיצה פותחת וסוגרת, וכברירת מחדל רק אחת פתוחה בכל רגע.",
  when:"כל עסק, בלי יוצא מן הכלל. סקשן שאלות נפוצות, מפרט מוצר, תנאי שירות, תהליך עבודה. זה הרכיב שחזר על עצמו בכמעט כל אתר שסרקנו.",
  libs:[],
  css:`.faq{max-width:min(760px,92vw);margin-inline:auto;border-top:1px solid var(--line)}
.faq-item{border-bottom:1px solid var(--line)}
.faq-q{width:100%;display:flex;align-items:center;gap:16px;background:none;border:0;font:inherit;font-size:clamp(16px,1.6vw,21px);
  font-weight:600;color:var(--ink);text-align:start;padding:clamp(18px,2vw,26px) 4px;cursor:pointer}
.faq-q:hover{color:var(--accent)}
.faq-ic{margin-inline-start:auto;flex:none;width:22px;height:22px;position:relative}
.faq-ic::before,.faq-ic::after{content:"";position:absolute;background:currentColor;border-radius:2px;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .25s}
.faq-ic::before{inset-inline:0;top:10px;height:2px}
.faq-ic::after{inset-block:0;left:10px;width:2px}
.faq-item.open .faq-ic::after{transform:rotate(90deg);opacity:0}
/* grid-template-rows מ-0fr ל-1fr נותן פתיחה לגובה האמיתי בלי למדוד פיקסלים ב-JS */
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .42s cubic-bezier(.2,.8,.2,1)}
.faq-item.open .faq-a{grid-template-rows:1fr}
.faq-a>div{overflow:hidden}
.faq-a p{margin:0;padding:0 4px clamp(20px,2.2vw,30px);color:var(--muted);font-size:16px;line-height:1.7;max-width:62ch}
@media (prefers-reduced-motion: reduce){.faq-a{transition-duration:.01ms}}`,
  html:`<div class="stage tight"><div class="faq">
  <div class="faq-item"><button class="faq-q" aria-expanded="false">כמה זמן לוקח לבנות אתר?<span class="faq-ic" aria-hidden="true"></span></button>
    <div class="faq-a"><div><p>דף נחיתה בין שבוע לשבועיים, אתר תדמית מלא בין שלושה לחמישה שבועות. הזמן נמדד מרגע שכל החומרים אצלנו, ורוב העיכובים בפרויקטים מגיעים משם.</p></div></div></div>
  <div class="faq-item"><button class="faq-q" aria-expanded="false">מה צריך להכין מראש?<span class="faq-ic" aria-hidden="true"></span></button>
    <div class="faq-a"><div><p>לוגו בקובץ וקטורי, תמונות באיכות גבוהה, וטקסטים ראשוניים. אם אין, אנחנו כותבים ומצלמים, וזה מתומחר בנפרד.</p></div></div></div>
  <div class="faq-item"><button class="faq-q" aria-expanded="false">האתר יתאים למובייל?<span class="faq-ic" aria-hidden="true"></span></button>
    <div class="faq-a"><div><p>כל אתר נבנה קודם למובייל ורק אחר כך לדסקטופ, כי שם נמצאים רוב הגולשים. כל סקשן נבדק בשלושה רוחבי מסך לפני עלייה לאוויר.</p></div></div></div>
  <div class="faq-item"><button class="faq-q" aria-expanded="false">מה קורה אחרי העלייה לאוויר?<span class="faq-ic" aria-hidden="true"></span></button>
    <div class="faq-a"><div><p>חודש ליווי כלול, ואחריו אפשר חבילת תחזוקה חודשית שכוללת גיבויים, עדכוני אבטחה ושינויי תוכן קטנים.</p></div></div></div>
</div></div>`,
  js:`(function(){
  const items=[...document.querySelectorAll(".faq-item")];
  const SINGLE=true; // רק אחת פתוחה בכל רגע. שנה ל-false אם רוצים לאפשר כמה
  items.forEach(item=>{
    const btn=item.querySelector(".faq-q");
    btn.addEventListener("click",()=>{
      const open=item.classList.contains("open");
      if(SINGLE)items.forEach(o=>{o.classList.remove("open");o.querySelector(".faq-q").setAttribute("aria-expanded","false");});
      item.classList.toggle("open",!open);
      btn.setAttribute("aria-expanded",String(!open));
    });
  });
})();`,
  runway:false,
  note:"הסוד הוא grid-template-rows מ-0fr ל-1fr: זו הדרך היחידה לקבל מעבר חלק לגובה אמיתי בלי למדוד scrollHeight ובלי לקבע max-height מומצא. הכפתור נושא aria-expanded והתשובה יושבת בתוך div עם overflow:hidden, אחרת הטקסט מציץ החוצה באמצע האנימציה."
},
{
  id:"b31", cat:"behavior", name:"סליידר המלצות עם גרירה, חצים ונקודות", tech:"CSS scroll-snap · JS", status:"ממתין",
  desc:"רצועת ציטוטים שנגררת באצבע ובעכבר, נצמדת לכל כרטיס, ומסונכרנת עם חצים ונקודות. בנוי על גלילה נטיבית, ולכן חלק במובייל ולא נשבר.",
  when:"המלצות לקוחות, לוגואים, מקרי בוחן, מוצרים נבחרים. אחרי אקורדיון זה הרכיב הכי נפוץ שראינו, וכל עסק צריך אותו.",
  libs:[],
  css:`.tq{position:relative;max-width:min(1100px,94vw);margin-inline:auto}
.tq-track{display:flex;gap:var(--gap);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-block:6px;
  -webkit-overflow-scrolling:touch;cursor:grab}
.tq-track::-webkit-scrollbar{display:none}
.tq-track.drag{cursor:grabbing;scroll-snap-type:none;user-select:none}
.tq-card{flex:0 0 min(420px,82vw);scroll-snap-align:start;background:var(--card);border:1px solid var(--line);border-radius:var(--r);
  padding:clamp(22px,2.4vw,34px);display:flex;flex-direction:column;gap:16px}
.tq-stars{color:#f0a500;font-size:15px;letter-spacing:2px}
.tq-card p{margin:0;font-size:clamp(15px,1.4vw,18px);line-height:1.65;color:var(--ink)}
.tq-who{display:flex;align-items:center;gap:12px;margin-top:auto}
.tq-av{width:40px;height:40px;border-radius:50%;flex:none;font-size:14px}
.tq-who b{display:block;font-size:15px}
.tq-who span{font-size:13px;color:var(--muted)}
.tq-bar{display:flex;align-items:center;gap:14px;justify-content:center;margin-top:26px}
.tq-nav{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);cursor:pointer;font-size:17px;color:var(--ink);
  display:grid;place-items:center;transition:background .25s,opacity .25s}
.tq-nav:hover{background:#eceaff}
.tq-nav[disabled]{opacity:.35;cursor:default}
.tq-dots{display:flex;gap:8px}
.tq-dots button{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:var(--line);cursor:pointer;transition:width .3s,background .3s}
.tq-dots button.on{width:24px;border-radius:999px;background:var(--accent)}`,
  html:`<div class="stage tight"><div class="tq">
  <div class="tq-track">
    <article class="tq-card"><div class="tq-stars">★★★★★</div><p>הגיעו עם שאלות שלא חשבנו עליהן, ובסוף קיבלנו אתר שמביא פניות כל שבוע. התהליך היה מסודר ובלי הפתעות.</p><div class="tq-who"><span class="tq-av ph ph-a">א</span><div><b>אורית לוי</b><span>מנכ"לית, חברת ייעוץ</span></div></div></article>
    <article class="tq-card"><div class="tq-stars">★★★★★</div><p>שלושה ספקים לפניהם לא הצליחו. כאן הבינו את העסק שלי תוך פגישה אחת, וזה הורגש בכל שורה באתר.</p><div class="tq-who"><span class="tq-av ph ph-c">ד</span><div><b>דני כהן</b><span>בעלים, מוסך</span></div></div></article>
    <article class="tq-card"><div class="tq-stars">★★★★★</div><p>הכי אהבתי שלא נעלמו אחרי העלייה לאוויר. כל שאלה נענתה, וגם חודשיים אחרי עדיין מלווים.</p><div class="tq-who"><span class="tq-av ph ph-d">מ</span><div><b>מיכל ברק</b><span>מנהלת שיווק</span></div></div></article>
    <article class="tq-card"><div class="tq-stars">★★★★★</div><p>העלינו את האתר ותוך שבועיים ראינו הבדל בכמות הפניות. ההשקעה החזירה את עצמה מהר.</p><div class="tq-who"><span class="tq-av ph ph-e">י</span><div><b>יוסי אדרי</b><span>בעלים, קליניקה</span></div></div></article>
  </div>
  <div class="tq-bar">
    <button class="tq-nav prev" aria-label="הקודם">→</button>
    <div class="tq-dots" role="tablist" aria-label="מעבר בין המלצות"></div>
    <button class="tq-nav next" aria-label="הבא">←</button>
  </div>
</div></div>`,
  js:`(function(){
  const track=document.querySelector(".tq-track"),cards=[...track.children];
  const dots=document.querySelector(".tq-dots"),prev=document.querySelector(".prev"),next=document.querySelector(".next");
  cards.forEach((c,i)=>{
    const b=document.createElement("button");
    b.setAttribute("role","tab");b.setAttribute("aria-label","המלצה "+(i+1));
    b.addEventListener("click",()=>c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}));
    dots.appendChild(b);
  });
  const buttons=[...dots.children];
  const rtl=getComputedStyle(track).direction==="rtl";
  const startEdge=el=>{const r=el.getBoundingClientRect();return rtl?r.right:r.left;};
  function current(){
    // הכרטיס ששפת ההתחלה שלו הכי קרובה לשפת ההתחלה של המסלול.
    // בעברית שפת ההתחלה היא הימנית, ולכן מודדים אותה ולא את המרכז.
    const s=startEdge(track);
    let best=0,d=1e9;
    cards.forEach((c,i)=>{const dist=Math.abs(startEdge(c)-s);if(dist<d){d=dist;best=i;}});
    return best;
  }
  // scrollLeft שלילי ב-RTL, ולכן כל ההשוואות על הערך המוחלט
  const pos=()=>Math.abs(track.scrollLeft);
  const maxScroll=()=>track.scrollWidth-track.clientWidth;
  const atStart=()=>pos()<4, atEnd=()=>maxScroll()-pos()<4;
  function sync(){
    // בסוף המסלול מסמנים את האחרון גם אם הוא לא הגיע לשפת ההתחלה,
    // כי כשמוצגים כמה כרטיסים במקביל אי אפשר להביא אותו לשם
    const i=atEnd()?cards.length-1:current();
    buttons.forEach((b,n)=>b.classList.toggle("on",n===i));
    prev.disabled=atStart();next.disabled=atEnd();
  }
  track.addEventListener("scroll",sync,{passive:true});
  prev.addEventListener("click",()=>cards[Math.max(0,current()-1)].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}));
  next.addEventListener("click",()=>cards[Math.min(cards.length-1,current()+1)].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}));
  // גרירה בעכבר. במגע הדפדפן כבר עושה את זה לבד ולכן לא נוגעים.
  let down=false,sx=0,sl=0;
  track.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;down=true;sx=e.clientX;sl=track.scrollLeft;track.classList.add("drag");});
  track.addEventListener("pointermove",e=>{if(!down)return;track.scrollLeft=sl-(e.clientX-sx);});
  const up=()=>{if(!down)return;down=false;track.classList.remove("drag");
    cards[current()].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});};
  ["pointerup","pointerleave","pointercancel"].forEach(ev=>track.addEventListener(ev,up));
  sync();
})();`,
  runway:false,
  note:"בנוי על גלילה נטיבית עם scroll-snap ולא על טרנספורמים, ולכן במובייל זה חלק לגמרי, עובד עם אינרציית המערכת, ונשאר נגיש למקלדת. בזמן גרירה בעכבר מכבים את ה-snap ומחזירים אותו בשחרור, אחרת הדפדפן נלחם בגרירה. הכיוון נגזר ממדידת מרכזים ולכן זהה בעברית ובאנגלית."
},
];
