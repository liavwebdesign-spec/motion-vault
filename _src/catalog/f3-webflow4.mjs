// סבב רביעי על גלריית Webflow (2.9.2026): 2,703 פרויקטים.
// שלושה רכיבי ממשק בסיסיים שחזרו בגלריה ולא היו במאגר.
export default [
{
  id:"b54", cat:"behavior", name:"הובר שנכנס מהכיוון שממנו בא הסמן", tech:"Vanilla JS · GSAP", status:"ממתין",
  desc:"שכבת הובר שלא מופיעה סתם: היא נכנסת מהצד שממנו העכבר נכנס לכרטיס, ויוצאת לצד שממנו הוא יצא. התנועה עוקבת אחרי היד ולא אחרי הקוד.",
  when:"גריד עבודות, כרטיסי שירות, צוות, מוצרים, קטגוריות. אותו הובר שיש לכולם, רק שהוא מרגיש נכון במקום מכני.",
  libs:["gsap"],
  css:`.da{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);max-width:min(1020px,94vw);margin-inline:auto}
.da-card{position:relative;overflow:hidden;border-radius:16px;aspect-ratio:4/3;cursor:pointer;
  border:1px solid var(--line);background:var(--card)}
.da-card:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.da-bg{position:absolute;inset:0;border-radius:0;font-size:0}
.da-name{position:absolute;inset-inline-start:16px;bottom:14px;z-index:2;color:#fff;font-weight:700;font-size:18px;
  text-shadow:0 2px 12px rgba(0,0,0,.45)}
.da-over{position:absolute;inset:0;z-index:1;background:rgba(74,58,255,.92);color:#fff;
  display:grid;place-content:center;text-align:center;padding:18px;gap:8px}
.da-over strong{font-size:20px}
.da-over span{font-size:14px;opacity:.9;max-width:24ch;line-height:1.6}
.da-hint{text-align:center;color:var(--muted);font-size:14px;padding-top:22px}
@media(max-width:860px){.da{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.da{grid-template-columns:1fr}}`,
  html:`<div class="stage tight">
<div class="da">
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-a"></div><span class="da-name">אתרי תדמית</span>
    <div class="da-over"><strong>אתרי תדמית</strong><span>אתר שמסביר מה אתם עושים ומוביל לפנייה אחת ברורה.</span></div></article>
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-c"></div><span class="da-name">דפי נחיתה</span>
    <div class="da-over"><strong>דפי נחיתה</strong><span>עמוד יחיד ממוקד לקמפיין, עם מסר אחד וקריאה אחת.</span></div></article>
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-d"></div><span class="da-name">חנויות</span>
    <div class="da-over"><strong>חנויות</strong><span>חנות שמוכרת גם בלי איש מכירות, עם מסלול קנייה קצר.</span></div></article>
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-e"></div><span class="da-name">מערכות</span>
    <div class="da-over"><strong>מערכות</strong><span>ממשק לניהול לקוחות, משימות ודוחות במקום גיליונות.</span></div></article>
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-b"></div><span class="da-name">מיתוג</span>
    <div class="da-over"><strong>מיתוג</strong><span>שפה חזותית אחת שחוזרת בכל נקודת מגע.</span></div></article>
  <article class="da-card" tabindex="0"><div class="ph da-bg ph-f"></div><span class="da-name">ליווי</span>
    <div class="da-over"><strong>ליווי</strong><span>אחזקה, מדידה ושיפור אחרי העלייה לאוויר.</span></div></article>
</div>
<p class="da-hint">העבר עכבר מלמעלה, מהצד ומלמטה. השכבה נכנסת משם.</p>
</div>`,
  js:`(function(){
  const OFF=101;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // 0=למעלה 1=ימין 2=למטה 3=שמאל, בקואורדינטות פיזיות
  const VEC=[{x:0,y:-OFF},{x:OFF,y:0},{x:0,y:OFF},{x:-OFF,y:0}];
  function edge(el,e){
    const r=el.getBoundingClientRect();
    // מנרמלים לפי היחס בין הצלעות, אחרת בכרטיס רחב כל כניסה נחשבת "מהצד"
    const w=r.width,h=r.height;
    const x=(e.clientX-r.left-w/2)*(w>h?h/w:1);
    const y=(e.clientY-r.top-h/2)*(h>w?w/h:1);
    return (Math.round((Math.atan2(y,x)*(180/Math.PI)+180)/90)+3)%4;
  }
  document.querySelectorAll(".da-card").forEach(card=>{
    const over=card.querySelector(".da-over");
    gsap.set(over,{xPercent:0,yPercent:OFF});
    const show=v=>{gsap.killTweensOf(over);
      gsap.fromTo(over,{xPercent:v.x,yPercent:v.y},{xPercent:0,yPercent:0,duration:reduce?0:.42,ease:"power3.out"});};
    const hide=v=>{gsap.killTweensOf(over);
      gsap.to(over,{xPercent:v.x,yPercent:v.y,duration:reduce?0:.42,ease:"power3.in"});};
    card.addEventListener("mouseenter",e=>show(VEC[edge(card,e)]));
    card.addEventListener("mouseleave",e=>hide(VEC[edge(card,e)]));
    card.addEventListener("focus",()=>show(VEC[0]));      // מקלדת: תמיד מלמעלה
    card.addEventListener("blur",()=>hide(VEC[0]));
  });
})();`,
  runway:false,
  note:"כל הרכיב הוא נוסחה אחת: זווית הסמן ביחס למרכז הכרטיס, מעוגלת לרבע הקרוב. הנרמול לפי יחס הצלעות הוא מה שמונע מכרטיס רחב לדווח \"מימין\" גם כשנכנסים מלמעלה. `xPercent`/`yPercent` נבחרו על פני פיקסלים כדי שזה יעבוד בכל גודל כרטיס בלי מדידה. הכיוונים פיזיים ולא לוגיים: היד של המשתמש לא יודעת מה כיוון הכתיבה של האתר. במקלדת אין כיוון כניסה, ולכן הפוקוס תמיד נכנס מלמעלה."
},
{
  id:"b55", cat:"behavior", name:"מחוון שמחליק בין פריטי תפריט", tech:"GSAP", status:"ממתין",
  desc:"כדור צבע אחד שיושב מאחורי הפריט הפעיל ומחליק אליו כשעוברים עכבר או בוחרים אחר. משתנה גם ברוחב, ולכן זה עובד עם מילים באורך שונה.",
  when:"תפריט ראשי, טאבים, מסנני קטגוריה, מתגי תצוגה. אלמנט אחד שהופך שורת קישורים לממשק.",
  libs:["gsap"],
  css:`.tg{display:inline-flex;position:relative;background:var(--card);border:1px solid var(--line);
  border-radius:999px;padding:5px;gap:2px;max-width:100%;flex-wrap:wrap}
.tg-pill{position:absolute;top:5px;left:0;height:calc(100% - 10px);border-radius:999px;background:var(--ink);z-index:0}
.tg a{position:relative;z-index:1;padding:10px 20px;border-radius:999px;font-size:15px;color:var(--muted);
  text-decoration:none;white-space:nowrap;transition:color .22s}
.tg a.on{color:#fff}
.tg a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.tg-wrap{display:grid;justify-items:center;gap:26px}
.tg-out{color:var(--muted);font-size:15px}
.tg-out b{color:var(--ink)}
@media(max-width:520px){.tg a{padding:10px 13px;font-size:14px}}`,
  html:`<div class="stage tight"><div class="tg-wrap">
  <nav class="tg">
    <i class="tg-pill"></i>
    <a href="#" class="on">הכל</a><a href="#">אתרי תדמית</a><a href="#">דפי נחיתה</a><a href="#">חנויות</a><a href="#">מערכות</a>
  </nav>
  <p class="tg-out">הבחירה הנוכחית: <b class="tg-now">הכל</b></p>
</div></div>`,
  js:`(function(){
  const nav=document.querySelector(".tg"),pill=nav.querySelector(".tg-pill"),out=document.querySelector(".tg-now");
  const links=[...nav.querySelectorAll("a")];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active=links[0];
  // offsetLeft/offsetTop פיזיים, ולכן החישוב זהה בעברית ובאנגלית
  const move=(el,animate)=>{
    const to={x:el.offsetLeft,y:el.offsetTop-5,width:el.offsetWidth,height:el.offsetHeight};
    if(animate&&!reduce)gsap.to(pill,{...to,duration:.4,ease:"back.out(1.4)"});
    else gsap.set(pill,to);
  };
  links.forEach(a=>{
    a.addEventListener("mouseenter",()=>move(a,true));
    a.addEventListener("focus",()=>move(a,true));
    a.addEventListener("click",e=>{
      e.preventDefault();
      active=a;links.forEach(x=>x.classList.toggle("on",x===a));
      out.textContent=a.textContent;move(a,true);
    });
  });
  // יציאה מהתפריט מחזירה את המחוון לפריט שנבחר, ולא משאירה אותו במקום אקראי
  nav.addEventListener("mouseleave",()=>move(active,true));
  nav.addEventListener("focusout",e=>{if(!nav.contains(e.relatedTarget))move(active,true);});
  move(active,false);
  addEventListener("resize",()=>move(active,false));
  document.fonts&&document.fonts.ready.then(()=>move(active,false));  // הפונט משנה רוחב מילים
})();`,
  runway:false,
  note:"שלוש נקודות שמפרידות בין מימוש עובד למימוש שנשבר: המחוון מונפש גם ברוחב ולא רק במיקום, אחרת מילים באורך שונה נחתכות; המדידה חוזרת אחרי `document.fonts.ready`, כי עד שהפונט נטען רוחב המילים שונה והמחוון מתחיל במקום הלא נכון; ויציאה מהתפריט מחזירה אותו לפריט הפעיל במקום להשאיר אותו על האחרון שרוחפים מעליו. `offsetLeft` ו-`offsetTop` הם ערכים פיזיים, ולכן אותו קוד עובד בעברית ובאנגלית בלי תנאים."
},
{
  id:"b56", cat:"behavior", name:"טולטיפ נגיש שמתהפך ליד קצה המסך", tech:"Vanilla JS · GSAP", status:"ממתין",
  desc:"הסבר קצר שנפתח מעל המילה, עובר מתחתיה כשאין מקום למעלה, ונצמד פנימה כשהוא נוגע בקצה המסך. נפתח גם בפוקוס מקלדת ונסגר ב-Escape.",
  when:"טבלת מחירים, שדות בטופס, מונחים מקצועיים, דשבורד, תנאי שימוש. במקום להעמיס את העמוד בהסברים, הם נפתחים למי שביקש.",
  libs:["gsap"],
  css:`.tp-demo{max-width:min(720px,92vw);margin-inline:auto;font-size:17px;line-height:2.1;color:var(--muted)}
.tp-demo p{margin:0 0 18px}
.tp{border-bottom:1.5px dashed var(--accent);cursor:help;color:var(--ink);font-weight:500;background:none;
  border-inline:0;border-top:0;font-family:inherit;font-size:inherit;padding:0}
.tp:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px}
.tp-box{position:fixed;z-index:80;max-width:min(300px,80vw);background:#16182b;color:#fff;font-size:14px;
  line-height:1.6;padding:11px 15px;border-radius:12px;box-shadow:0 14px 40px rgba(20,20,40,.28);
  pointer-events:none;opacity:0;top:0;left:0}
.tp-box::after{content:"";position:absolute;width:11px;height:11px;background:#16182b;transform:rotate(45deg);
  left:var(--ax,50%);margin-left:-5.5px}
.tp-box.top::after{bottom:-5px}
.tp-box.bottom::after{top:-5px}
.tp-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:26px}
.tp-row .tp{border:1px solid var(--line);border-radius:999px;padding:9px 16px;background:var(--card)}`,
  html:`<div class="stage tight"><div class="tp-demo">
  <p>המחיר כולל <button class="tp" data-tip="עד שלושה סבבי תיקונים על העיצוב, לפני המעבר לפיתוח.">שני סבבי תיקונים</button>
  וכן <button class="tp" data-tip="חודש ראשון אחרי העלייה לאוויר: תיקוני באגים ושינויי טקסט קטנים, בלי עלות.">אחריות חודש</button>.
  התשלום מתבצע בשני חלקים, והשני משולם רק אחרי <button class="tp" data-tip="הרגע שבו האתר חי בדומיין שלכם ואפשר להיכנס אליו מגוגל.">העלייה לאוויר</button>.</p>
  <p>שימו לב שהמחיר אינו כולל <button class="tp" data-tip="צילום מקצועי, בנק תמונות בתשלום, או איורים בהזמנה. אפשר לחבר ספק בהמלצתנו.">חומרים ויזואליים</button>.</p>
  <div class="tp-row">
    <button class="tp" data-tip="נבדק בקצה השמאלי: הטולטיפ נצמד פנימה במקום לגלוש החוצה.">בדיקת קצה שמאל</button>
    <button class="tp" data-tip="נבדק בקצה הימני: אותה הצמדה, בכיוון ההפוך.">בדיקת קצה ימין</button>
  </div>
</div></div>`,
  js:`(function(){
  const PAD=10,GAP=10;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const box=document.createElement("div");
  box.className="tp-box";box.setAttribute("role","tooltip");box.id="tp-box";
  document.body.appendChild(box);
  let current=null;
  function place(trigger){
    box.textContent=trigger.dataset.tip;
    box.classList.remove("top","bottom");
    box.style.width="";
    gsap.set(box,{opacity:0,x:0,y:0});
    // נועלים את הרוחב שנמדד. בלי זה הרוחב בפועל יכול לצאת שונה מזה ששימש לחישוב,
    // והקופסה גולשת מהמסך בכמה פיקסלים דווקא במסכים רחבים.
    box.style.width=box.offsetWidth+"px";
    const vw=document.documentElement.clientWidth;   // בלי רוחב הגלילה, אחרת מפספסים כמה פיקסלים
    const t=trigger.getBoundingClientRect(),b=box.getBoundingClientRect();
    // אם אין מקום למעלה, עוברים למטה. זו ההחלטה הראשונה, כי היא משנה את הכל
    const below=t.top-b.height-GAP<PAD;
    const y=below?t.bottom+GAP:t.top-b.height-GAP;
    // ואז מצמידים אופקית פנימה, כדי שהקופסה לא תגלוש מהמסך
    let x=t.left+t.width/2-b.width/2;
    x=Math.min(Math.max(PAD,x),vw-b.width-PAD);
    box.classList.add(below?"bottom":"top");
    gsap.set(box,{x:x,y:y});
    // בדיקה חוזרת בכל זאת, כרשת ביטחון
    let after=box.getBoundingClientRect();
    for(let i=0;i<2;i++){
      const a=box.getBoundingClientRect();
      const dx=a.right>vw-PAD?(vw-PAD)-a.right:(a.left<PAD?PAD-a.left:0);
      if(!dx)break;
      x+=dx;gsap.set(box,{x:x});after=box.getBoundingClientRect();
    }
    // החץ מכוון למילה, אבל נשאר בתוך גבולות הקופסה גם כשהיא נצמדה לקצה
    const ax=Math.min(Math.max(16,t.left+t.width/2-x),after.width-16);
    box.style.setProperty("--ax",ax+"px");
    gsap.to(box,{opacity:1,duration:reduce?0:.2,ease:"power2.out"});
    trigger.setAttribute("aria-describedby","tp-box");
    current=trigger;
  }
  function hide(){
    if(current)current.removeAttribute("aria-describedby");
    current=null;
    gsap.to(box,{opacity:0,duration:reduce?0:.15});
  }
  document.querySelectorAll(".tp").forEach(t=>{
    t.addEventListener("mouseenter",()=>place(t));
    t.addEventListener("mouseleave",hide);
    t.addEventListener("focus",()=>place(t));
    t.addEventListener("blur",hide);
    t.addEventListener("click",e=>{e.preventDefault();current===t?hide():place(t);});  // מגע
  });
  addEventListener("keydown",e=>{if(e.key==="Escape")hide();});
  addEventListener("scroll",()=>{if(current)hide();},{passive:true});
})();`,
  runway:false,
  note:"טולטיפ הוא רכיב שכולם מזלזלים בו ואז הוא גולש מהמסך. שלוש ההכרעות כאן: הקופסה יושבת ב-`position:fixed` על ה-body ולא בתוך המילה, כדי ש-`overflow:hidden` של סקשן כלשהו לא יחתוך אותה; ההיפוך למטה נבדק לפני המיקום האופקי, כי הוא משנה את הגובה; **המדידה נעשית פעמיים**, כי אחרי שמזיזים את הקופסה שבירת השורות בתוכה יכולה להשתנות והרוחב איתה, ובבדיקה במסך צר זה הספיק כדי לגלוש חמישה פיקסלים החוצה; והחץ ממוקם דרך משתנה CSS ולכן הוא ממשיך להצביע על המילה גם אחרי שהקופסה נצמדה פנימה. הפעלה ב-`focus` ולא רק ב-hover היא מה שהופך את זה לנגיש, ו-`aria-describedby` הוא מה שגורם לקורא מסך להקריא את ההסבר."
},
];
