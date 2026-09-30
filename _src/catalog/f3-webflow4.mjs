// סבב רביעי על גלריית Webflow (2.9.2026): 2,703 פרויקטים.
// שלושה רכיבי ממשק בסיסיים שחזרו בגלריה ולא היו במאגר.
export default [
{
  id:"b54", cat:"behavior", name:"הובר שנכנס מהכיוון שממנו בא הסמן", tech:"Vanilla JS · GSAP", status:"ממתין",
  desc:"שכבת הובר שלא מופיעה סתם: היא נכנסת מהצד שממנו העכבר נכנס לכרטיס, ויוצאת לצד שממנו הוא יצא. התנועה עוקבת אחרי היד ולא אחרי הקוד.",
  when:"גריד עבודות, כרטיסי שירות, צוות, מוצרים, קטגוריות. אותו הובר שיש לכולם, רק שהוא מרגיש נכון במקום מכני.",
  libs:["gsap"],
  css:`.da{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);max-width:min(1020px,94vw);margin-inline:auto}
.da-card{display:block;position:relative;overflow:hidden;border-radius:16px;aspect-ratio:4/3;cursor:pointer;
  border:1px solid var(--line);background:var(--card);color:inherit;text-decoration:none}
.da-card:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.da-bg{position:absolute;inset:0;border-radius:0;font-size:0}
/* השם יושב מתחת לשכבה (z-index 0 מול 1): כשהשכבה פתוחה היא מכסה אותו, ורואים כותרת אחת ולא שתיים */
.da-name{position:absolute;inset-inline-start:16px;bottom:14px;z-index:0;color:#fff;font-weight:700;font-size:18px;
  text-shadow:0 2px 12px rgba(0,0,0,.45)}
/* צבע השכבה מהטוקן, כדי שבפרויקט היא תקבל את צבע המותג ולא את הסגול של המאגר.
   אטום ולא 92%, אחרת השם שמתחתיה מבצבץ דרכה כצל חיוור */
.da-over{position:absolute;inset:0;z-index:1;background:var(--accent);color:var(--accent-ink);
  display:grid;place-content:center;text-align:center;padding:18px;gap:8px}
.da-over strong{font-size:20px}
.da-over span{font-size:14px;opacity:.9;max-width:24ch;line-height:1.6}
.da-hint{text-align:center;color:var(--muted);font-size:14px;padding-top:22px}
@media(max-width:860px){.da{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.da{grid-template-columns:1fr}}`,
  html:`<div class="stage tight">
<div class="da">
  <a class="da-card" href="#"><div class="ph da-bg ph-a"></div><span class="da-name" aria-hidden="true">אתרי תדמית</span>
    <div class="da-over"><strong>אתרי תדמית</strong><span>אתר שמסביר מה אתם עושים ומוביל לפנייה אחת ברורה.</span></div></a>
  <a class="da-card" href="#"><div class="ph da-bg ph-c"></div><span class="da-name" aria-hidden="true">דפי נחיתה</span>
    <div class="da-over"><strong>דפי נחיתה</strong><span>עמוד יחיד ממוקד לקמפיין, עם מסר אחד וקריאה אחת.</span></div></a>
  <a class="da-card" href="#"><div class="ph da-bg ph-d"></div><span class="da-name" aria-hidden="true">חנויות</span>
    <div class="da-over"><strong>חנויות</strong><span>חנות שמוכרת גם בלי איש מכירות, עם מסלול קנייה קצר.</span></div></a>
  <a class="da-card" href="#"><div class="ph da-bg ph-e"></div><span class="da-name" aria-hidden="true">מערכות</span>
    <div class="da-over"><strong>מערכות</strong><span>ממשק לניהול לקוחות, משימות ודוחות במקום גיליונות.</span></div></a>
  <a class="da-card" href="#"><div class="ph da-bg ph-b"></div><span class="da-name" aria-hidden="true">מיתוג</span>
    <div class="da-over"><strong>מיתוג</strong><span>שפה חזותית אחת שחוזרת בכל נקודת מגע.</span></div></a>
  <a class="da-card" href="#"><div class="ph da-bg ph-f"></div><span class="da-name" aria-hidden="true">ליווי</span>
    <div class="da-over"><strong>ליווי</strong><span>אחזקה, מדידה ושיפור אחרי העלייה לאוויר.</span></div></a>
</div>
<p class="da-hint">העבר עכבר מלמעלה, מהצד ומלמטה. השכבה נכנסת משם.</p>
</div>`,
  js:`(function(){
  // דמו: לכרטיסים אין יעד, ולכן הלחיצה לא קופצת לראש העמוד. בפרויקט זה קישור אמיתי
  document.querySelectorAll(".da-card").forEach(c=>c.addEventListener("click",e=>e.preventDefault()));
  if(typeof gsap==="undefined")return;   // בלי הספרייה השכבות פשוט גלויות, עם השם והתיאור של כל כרטיס
  const OFF=101;
  // בהפחתת תנועה השכבה מופיעה ונעלמת מיד, בלי החלקה. נבדק בכל הובר, כך ששינוי ההעדפה נתפס
  const dur=()=>matchMedia("(prefers-reduced-motion: reduce)").matches?0:.42;
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
      gsap.fromTo(over,{xPercent:v.x,yPercent:v.y},{xPercent:0,yPercent:0,duration:dur(),ease:"power3.out"});};
    const hide=v=>{gsap.killTweensOf(over);
      gsap.to(over,{xPercent:v.x,yPercent:v.y,duration:dur(),ease:"power3.in"});};
    card.addEventListener("mouseenter",e=>show(VEC[edge(card,e)]));
    card.addEventListener("mouseleave",e=>hide(VEC[edge(card,e)]));
    card.addEventListener("focus",()=>show(VEC[0]));      // מקלדת: תמיד מלמעלה
    card.addEventListener("blur",()=>hide(VEC[0]));
  });
})();`,
  runway:false,
  note:"כל הרכיב הוא נוסחה אחת: זווית הסמן ביחס למרכז הכרטיס, מעוגלת לרבע הקרוב. הנרמול לפי יחס הצלעות הוא מה שמונע מכרטיס רחב לדווח \"מימין\" גם כשנכנסים מלמעלה. `xPercent`/`yPercent` נבחרו על פני פיקסלים כדי שזה יעבוד בכל גודל כרטיס בלי מדידה. הכיוונים פיזיים ולא לוגיים: היד של המשתמש לא יודעת מה כיוון הכתיבה של האתר. במקלדת אין כיוון כניסה, ולכן הפוקוס תמיד נכנס מלמעלה. הכרטיס הוא קישור (`a`) ולא `article` עם tabindex, כדי שיהיה לו תפקיד ופעולה; השם בפינה מוסתר מקורא מסך, כי אותו שם כבר כתוב בשכבה, ויושב מתחתיה, כך שבהובר רואים כותרת אחת. צבע השכבה הוא טוקן המבטא (`var(--accent)`) ולא ליטרל, כדי שבפרויקט היא תקבל את צבע המותג, והיא אטומה כדי שהשם מתחתיה לא יבצבץ דרכה."
},
{
  id:"b55", cat:"behavior", name:"מחוון שמחליק בין פריטי תפריט", tech:"GSAP", status:"ממתין",
  desc:"כדור צבע אחד שיושב מאחורי הפריט הפעיל ומחליק אליו כשעוברים עכבר או בוחרים אחר. משתנה גם ברוחב, ולכן זה עובד עם מילים באורך שונה.",
  when:"תפריט ראשי, טאבים, מסנני קטגוריה, מתגי תצוגה. אלמנט אחד שהופך שורת קישורים לממשק.",
  libs:["gsap"],
  css:`.tg{display:inline-flex;position:relative;background:var(--card);border:1px solid var(--line);
  border-radius:999px;padding:5px;gap:2px;max-width:100%;flex-wrap:wrap}
/* הגלולה יושבת מעל הקישורים ושקופה ללחיצות, ובתוכה עותק לבן של אותן תוויות שזז הפוך לה ונשאר מיושר
   לקישורים. כך הלבן נמצא בדיוק איפה שהגלולה נמצאת, גם באמצע התנועה, ואין רגע של טקסט לבן על רקע בהיר */
.tg-pill{position:absolute;top:0;left:0;border-radius:999px;background:var(--ink);z-index:2;overflow:hidden;pointer-events:none;font-style:normal}
/* כל תווית בעותק ממוקמת בדיוק על הקישור שלה (אותם offsetLeft ורוחב), ולא בפריסה משלה: פריסה נפרדת
   נשברה לשורה שנייה בגלל חצי פיקסל */
.tg-hi{position:absolute;top:0;left:0;color:var(--bg)}
.tg-hi span{position:absolute}
.tg a,.tg-hi span{padding:10px 20px;border-radius:999px;font-size:15px;white-space:nowrap}
.tg a{position:relative;z-index:1;color:var(--muted);text-decoration:none;transition:color .15s}
@media (hover:hover) and (pointer:fine){.tg a:hover{color:var(--ink)}}
.tg a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
/* בלי הספרייה אין גלולה נעה, והפריט הנבחר מסומן ברקע רגיל */
.tg:not(.mv-on) a[aria-current]{background:var(--ink);color:var(--bg)}
.tg-wrap{display:grid;justify-items:center;gap:26px}
.tg-out{color:var(--muted);font-size:15px}
.tg-out b{color:var(--ink)}
/* בטלפון חמשת הפריטים לא נכנסים בשורה: שורה אחת שנגללת הצידה, עם מסכה בקצה שמראה שיש עוד.
   בלי זה פריט אחד יורד לשורה שנייה והמסגרת המעוגלת הופכת לגוש עם חור */
@media(max-width:520px){
  .tg{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;overscroll-behavior-x:contain;
    -webkit-mask-image:linear-gradient(to right,transparent,#000 28px);mask-image:linear-gradient(to right,transparent,#000 28px)}
  .tg.end{-webkit-mask-image:none;mask-image:none}
  .tg::-webkit-scrollbar{display:none}
  .tg a,.tg-hi span{padding:0 14px;font-size:14px;min-height:44px;display:inline-flex;align-items:center}
}`,
  html:`<div class="stage tight"><div class="tg-wrap">
  <nav class="tg" aria-label="סינון עבודות">
    <i class="tg-pill"><span class="tg-hi" aria-hidden="true"></span></i>
    <a href="#" class="on" aria-current="true">הכל</a><a href="#">אתרי תדמית</a><a href="#">דפי נחיתה</a><a href="#">חנויות</a><a href="#">מערכות</a>
  </nav>
  <p class="tg-out">הבחירה הנוכחית: <b class="tg-now">הכל</b></p>
</div></div>`,
  js:`(function(){
  const nav=document.querySelector(".tg"),pill=nav.querySelector(".tg-pill"),hi=nav.querySelector(".tg-hi"),out=document.querySelector(".tg-now");
  const links=[...nav.querySelectorAll("a")];
  const G=typeof gsap!=="undefined";
  const reduce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active=links[0];
  // העותק הלבן: אותן תוויות, כל אחת במקום ובגודל של הקישור שלה
  links.forEach(a=>{const s=document.createElement("span");s.textContent=a.textContent;hi.appendChild(s);});
  // offsetLeft/offsetTop פיזיים, ולכן החישוב זהה בעברית ובאנגלית
  const sync=()=>gsap.set(hi,{x:-gsap.getProperty(pill,"x"),y:-gsap.getProperty(pill,"y")});
  const move=(el,animate)=>{
    if(!G)return;
    links.forEach((a,i)=>{const c=hi.children[i].style;c.left=a.offsetLeft+"px";c.top=a.offsetTop+"px";c.width=a.offsetWidth+"px";c.height=a.offsetHeight+"px";});
    const to={x:el.offsetLeft,y:el.offsetTop,width:el.offsetWidth,height:el.offsetHeight};
    if(animate&&!reduce())gsap.to(pill,{...to,duration:.4,ease:"power3.out",overwrite:true,onUpdate:sync,onComplete:sync});
    else{gsap.set(pill,{...to,overwrite:true});sync();}
  };
  // שורה נגללת בטלפון: המסכה בקצה יורדת כשמגיעים לסוף, והפריט שנבחר נגלל למסך
  const edge=()=>nav.classList.toggle("end",Math.abs(nav.scrollLeft)>=nav.scrollWidth-nav.clientWidth-2);
  // הפריט שנבחר נגלל אל מחוץ לאזור המסכה (28 פיקסלים בקצה השמאלי), ולא רק "עד שהוא נראה"
  const reveal=a=>{if(nav.scrollWidth<=nav.clientWidth)return;
    const n=nav.getBoundingClientRect(),r=a.getBoundingClientRect(),b=reduce()?"auto":"smooth";
    if(r.left<n.left+28)nav.scrollBy({left:r.left-(n.left+28),behavior:b});
    else if(r.right>n.right-6)nav.scrollBy({left:r.right-(n.right-6),behavior:b});};
  nav.addEventListener("scroll",edge,{passive:true});
  links.forEach(a=>{
    a.addEventListener("mouseenter",()=>move(a,true));
    a.addEventListener("focus",()=>{move(a,true);reveal(a);});
    a.addEventListener("click",e=>{
      e.preventDefault();
      active=a;links.forEach(x=>{x.classList.toggle("on",x===a);
        x===a?x.setAttribute("aria-current","true"):x.removeAttribute("aria-current")});
      out.textContent=a.textContent;move(a,true);
      reveal(a);
    });
  });
  // יציאה מהתפריט מחזירה את המחוון לפריט שנבחר, ולא משאירה אותו במקום אקראי
  nav.addEventListener("mouseleave",()=>move(active,true));
  nav.addEventListener("focusout",e=>{if(!nav.contains(e.relatedTarget))move(active,true);});
  if(G)nav.classList.add("mv-on");
  move(active,false);edge();
  addEventListener("resize",()=>{move(active,false);edge();});
  document.fonts&&document.fonts.ready.then(()=>move(active,false));  // הפונט משנה רוחב מילים
})();`,
  runway:false,
  note:"שלוש נקודות שמפרידות בין מימוש עובד למימוש שנשבר: המחוון מונפש גם ברוחב ולא רק במיקום, אחרת מילים באורך שונה נחתכות; המדידה חוזרת אחרי `document.fonts.ready`, כי עד שהפונט נטען רוחב המילים שונה והמחוון מתחיל במקום הלא נכון; ויציאה מהתפריט מחזירה אותו לפריט הפעיל במקום להשאיר אותו על האחרון שרוחפים מעליו. `offsetLeft` ו-`offsetTop` הם ערכים פיזיים, ולכן אותו קוד עובד בעברית ובאנגלית בלי תנאים. **ומלכודת ניגודיות**: אם הקישור עצמו הופך ללבן, הצבע מתחלף מיד והגלולה מגיעה אחריו, ולרגע יש מילה לבנה על רקע בהיר. לכן הגלולה יושבת מעל הקישורים, ובתוכה עותק לבן של התוויות שזז הפוך לה (`x:-pillX`): הלבן קיים רק בתוך הגלולה, בדיוק איפה שהיא נמצאת. הבחירה עצמה מסומנת ב-aria-current. **בטלפון** חמשת הפריטים לא נכנסים בשורה, ולכן זו שורה אחת שנגללת הצידה עם מסכה בקצה; מארבעה פריטים ומטה כולם על המסך."
},
{
  id:"b56", cat:"behavior", name:"טולטיפ נגיש שמתהפך ליד קצה המסך", tech:"Vanilla JS · GSAP", status:"ממתין",
  desc:"הסבר קצר שנפתח מעל המילה, עובר מתחתיה כשאין מקום למעלה, ונצמד פנימה כשהוא נוגע בקצה המסך. נפתח גם בפוקוס מקלדת ונסגר ב-Escape.",
  when:"טבלת מחירים, שדות בטופס, מונחים מקצועיים, דשבורד, תנאי שימוש. במקום להעמיס את העמוד בהסברים, הם נפתחים למי שביקש.",
  libs:["gsap"],
  css:`.tp-demo{max-width:min(720px,92vw);margin-inline:auto;font-size:17px;line-height:2.1;color:var(--muted)}
.tp-demo p{margin:0 0 18px}
.tp{position:relative;border-bottom:1.5px dashed var(--accent);cursor:help;color:var(--ink);font-weight:500;background:none;
  border-inline:0;border-top:0;font-family:inherit;font-size:inherit;padding:0}
/* מילה בתוך משפט היא יעד נגיעה של 21 פיקסלים. אזור הנגיעה גדל ל-35, בתוך גובה השורה, בלי לשנות את המראה */
.tp-demo p .tp::before{content:"";position:absolute;inset:-7px -3px}
.tp:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:3px}
.tp-box{position:fixed;z-index:80;max-width:min(300px,80vw);background:var(--ink);color:var(--bg);font-size:14px;
  line-height:1.6;padding:11px 15px;border-radius:12px;box-shadow:0 14px 40px rgba(20,20,40,.28);
  pointer-events:none;opacity:0;visibility:hidden;top:0;left:0}
.tp-box::after{content:"";position:absolute;width:11px;height:11px;background:var(--ink);transform:rotate(45deg);
  left:var(--ax,50%);margin-left:-5.5px}
.tp-box.top::after{bottom:-5px}
.tp-box.bottom::after{top:-5px}
.tp-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:26px}
.tp-row .tp{border:1px solid var(--line);border-radius:999px;padding:11px 16px;background:var(--card)}`,
  html:`<div class="stage tight"><div class="tp-demo">
  <p>המחיר כולל <button class="tp" data-tip="שני סבבי תיקונים על העיצוב, לפני המעבר לפיתוח.">שני סבבי תיקונים</button>
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
  const G=typeof gsap!=="undefined";   // בלי הספרייה הטולטיפ עובד אותו דבר, רק בלי דהייה
  const box=document.createElement("div");
  box.className="tp-box";box.setAttribute("role","tooltip");box.id="tp-box";
  document.body.appendChild(box);
  let current=null,openedAt=0;
  const pos=(x,y)=>{box.style.transform="translate("+x+"px,"+y+"px)";};
  // autoAlpha ולא opacity: קופסה סגורה מוסתרת גם מקורא מסך. killTweensOf בכל פתיחה וסגירה,
  // אחרת טווין הפתיחה ממשיך אחרי טווין הסגירה, והקופסה נשארת גלויה כשהקוד חושב שהיא סגורה
  function fade(show){
    const d=matchMedia("(prefers-reduced-motion: reduce)").matches?0:(show?.2:.15);
    if(G){gsap.killTweensOf(box);gsap.to(box,{autoAlpha:show?1:0,duration:d,ease:show?"power2.out":"power1.in"});}
    else{box.style.opacity=show?"1":"0";box.style.visibility=show?"visible":"hidden";}
  }
  function place(trigger){
    if(G){gsap.killTweensOf(box);gsap.set(box,{autoAlpha:0});}else box.style.opacity="0";
    box.textContent=trigger.dataset.tip;
    box.classList.remove("top","bottom");
    box.style.width="";
    pos(0,0);
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
    pos(x,y);
    // בדיקה חוזרת בכל זאת, כרשת ביטחון
    let after=box.getBoundingClientRect();
    for(let i=0;i<2;i++){
      const a=box.getBoundingClientRect();
      const dx=a.right>vw-PAD?(vw-PAD)-a.right:(a.left<PAD?PAD-a.left:0);
      if(!dx)break;
      x+=dx;pos(x,y);after=box.getBoundingClientRect();
    }
    // החץ מכוון למילה, אבל נשאר בתוך גבולות הקופסה גם כשהיא נצמדה לקצה
    const ax=Math.min(Math.max(16,t.left+t.width/2-x),after.width-16);
    box.style.setProperty("--ax",ax+"px");
    fade(true);
    trigger.setAttribute("aria-describedby","tp-box");
    current=trigger;openedAt=performance.now();
  }
  function hide(){
    if(current)current.removeAttribute("aria-describedby");
    current=null;
    fade(false);
  }
  const open=t=>{if(current!==t)place(t);};
  document.querySelectorAll(".tp").forEach(t=>{
    t.addEventListener("mouseenter",()=>open(t));
    t.addEventListener("mouseleave",hide);
    t.addEventListener("focus",()=>open(t));
    t.addEventListener("blur",hide);
    // מגע: נגיעה מפעילה mouseenter, focus ו-click ברצף. לחיצה שמגיעה מיד אחרי הפתיחה
    // לא סוגרת; נגיעה שנייה סוגרת, וגלילה תמיד סוגרת
    t.addEventListener("click",e=>{e.preventDefault();
      if(current!==t)place(t);else if(performance.now()-openedAt>400)hide();});
  });
  addEventListener("keydown",e=>{if(e.key==="Escape")hide();});
  addEventListener("scroll",()=>{if(current)hide();},{passive:true});
})();`,
  runway:false,
  note:"טולטיפ הוא רכיב שכולם מזלזלים בו ואז הוא גולש מהמסך. שלוש ההכרעות כאן: הקופסה יושבת ב-`position:fixed` על ה-body ולא בתוך המילה, כדי ש-`overflow:hidden` של סקשן כלשהו לא יחתוך אותה; ההיפוך למטה נבדק לפני המיקום האופקי, כי הוא משנה את הגובה; **המדידה נעשית פעמיים**, כי אחרי שמזיזים את הקופסה שבירת השורות בתוכה יכולה להשתנות והרוחב איתה, ובבדיקה במסך צר זה הספיק כדי לגלוש חמישה פיקסלים החוצה; והחץ ממוקם דרך משתנה CSS ולכן הוא ממשיך להצביע על המילה גם אחרי שהקופסה נצמדה פנימה. הפעלה ב-`focus` ולא רק ב-hover היא מה שהופך את זה לנגיש, ו-`aria-describedby` הוא מה שגורם לקורא מסך להקריא את ההסבר."
},
];
