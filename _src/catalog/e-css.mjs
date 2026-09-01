// אנימציות CSS טהורות: הטכנולוגיה הזולה והמהירה ביותר להטמעה, בכל אתר ובכל פלטפורמה.
export default [
{
  id:"css01", cat:"css", name:"הרמת כרטיס בהובר", tech:"CSS transition", status:"מאושר",
  desc:"הכרטיס עולה 5 פיקסלים, הצל מתעמק והמסגרת נצבעת. השילוש הקלאסי של המנוע.",
  when:"כל כרטיס לחיץ. הטרנספורם תמיד איטי מהצבע (0.4 מול 0.3).",
  css:`.lift-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.lift{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:26px;cursor:pointer;
transition:border-color .3s,box-shadow .3s,transform .4s cubic-bezier(.2,.6,.2,1)}
.lift:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(22,24,43,.11);border-color:#b3a8ff}
@media(max-width:767px){.lift-row{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="lift-row">
<div class="lift"><h3 style="margin:0 0 6px">כרטיס א</h3><p style="margin:0;color:var(--muted)">עבור עליי עם העכבר.</p></div>
<div class="lift"><h3 style="margin:0 0 6px">כרטיס ב</h3><p style="margin:0;color:var(--muted)">גם עליי.</p></div>
<div class="lift"><h3 style="margin:0 0 6px">כרטיס ג</h3><p style="margin:0;color:var(--muted)">ועליי.</p></div>
</div></div>`, js:``, runway:false
},
{
  id:"css02", cat:"css", name:"קו תחתון שנמתח (RTL-נכון)", tech:"CSS scaleX + transform-origin", status:"מאושר",
  desc:"קו שנמתח מתחת ללינק מכיוון הקריאה. הסוד: transform-origin לוגי שמתהפך נכון בעברית.",
  when:"לינקים בניווט ובטקסט רץ.",
  css:`.ul-row{display:flex;gap:40px;justify-content:center;font-weight:500;font-size:18px}
.ulink{position:relative;padding-bottom:4px;cursor:pointer}
.ulink::after{content:"";position:absolute;bottom:0;inset-inline:0;height:2px;background:var(--accent);
transform:scaleX(0);transform-origin:right;transition:transform .3s cubic-bezier(.2,.6,.2,1)}
html[dir="ltr"] .ulink::after{transform-origin:left}
.ulink:hover::after{transform:scaleX(1)}`,
  html:`<div class="stage tight"><div class="ul-row"><span class="ulink">אודות</span><span class="ulink">שירותים</span><span class="ulink">פרויקטים</span><span class="ulink">צור קשר</span></div></div>`,
  js:``, runway:false
},
{
  id:"css03", cat:"css", name:"מילוי כפתור מהצד", tech:"CSS pseudo-element", status:"מאושר",
  desc:"רקע הכפתור מתמלא בצבע מהצד בהובר, והטקסט מתהפך.",
  when:"כפתורים משניים באתרי אופי. לא בעור השקט (שם ההובר הוא הכהיה).",
  css:`.fill-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;
min-height:52px;padding-inline:34px;border-radius:999px;border:2px solid var(--ink);background:transparent;
color:var(--ink);font-weight:600;font-size:16px;cursor:pointer;font-family:inherit;z-index:0;transition:color .35s}
.fill-btn::before{content:"";position:absolute;inset:0;background:var(--ink);z-index:-1;
transform:translateX(101%);transition:transform .35s cubic-bezier(.2,.6,.2,1)}
.fill-btn:hover{color:#fff}
.fill-btn:hover::before{transform:translateX(0)}`,
  html:`<div class="stage tight center"><button class="fill-btn">עבור עליי עם העכבר</button></div>`,
  js:``, runway:false
},
{
  id:"css04", cat:"css", name:"חשיפת clip בכניסה", tech:"CSS @keyframes + IO", status:"מאושר",
  desc:"הכותרת נחשפת מתוך מסכה מלמטה כשהיא נכנסת למסך. גרסת ה-CSS הזולה של חשיפות הטקסט.",
  when:"כותרות סקשן כשלא רוצים לטעון GSAP.",
  css:`.clipr{font-size:var(--fs-demo);max-width:20ch;margin-inline:auto;opacity:0}
.clipr.in{opacity:1;animation:clipIn .8s cubic-bezier(.2,.6,.2,1) both}
@keyframes clipIn{from{clip-path:inset(100% 0 0 0);translate:0 30px}to{clip-path:inset(0 0 0 0);translate:0 0}}
@media(prefers-reduced-motion:reduce){.clipr{opacity:1;animation:none}}`,
  html:`<div class="stage center"><h2 class="clipr">הכותרת הזאת נחשפת מתוך מסכה</h2></div>`,
  js:`const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}
}),{threshold:.3});
document.querySelectorAll(".clipr").forEach(el=>io.observe(el));`
},
{
  id:"css05", cat:"css", name:"כניסת Blur-In", tech:"CSS @keyframes + IO", status:"מאושר",
  desc:"האלמנט נכנס מטושטש ומתחדד למקומו. תחושה יוקרתית בלי אף ספרייה.",
  when:"ויז'ואלים וכותרות באתרי פרימיום.",
  css:`.blurin{opacity:0}
.blurin.in{opacity:1;animation:blurIn .9s cubic-bezier(.2,.6,.2,1) both}
@keyframes blurIn{from{filter:blur(14px);opacity:0;scale:.97}to{filter:blur(0);opacity:1;scale:1}}
.blurin.ph{width:min(560px,80vw);height:300px;margin-inline:auto;font-size:22px}
@media(prefers-reduced-motion:reduce){.blurin{opacity:1;animation:none}}`,
  html:`<div class="stage"><div class="blurin ph ph-c">נכנס מטושטש, מתחדד</div></div>`,
  js:`const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}
}),{threshold:.3});
document.querySelectorAll(".blurin").forEach(el=>io.observe(el));`
},
{
  id:"css06", cat:"css", name:"אקורדיון חלק", tech:"CSS grid-rows transition", status:"מאושר",
  desc:"פתיחה וסגירה חלקות עם הטריק המודרני: grid-template-rows מ-0fr ל-1fr, בלי JS שמודד גבהים.",
  when:"שאלות ותשובות, מפרטים.",
  css:`.acc{max-width:560px;margin-inline:auto}
.acc-item{border-bottom:1px solid var(--line)}
.acc-q{width:100%;display:flex;justify-content:space-between;align-items:center;background:none;border:0;
font-family:inherit;font-size:17px;font-weight:600;padding-block:20px;cursor:pointer;text-align:start}
.acc-q .chev{transition:rotate .2s}
.acc-item.open .chev{rotate:180deg}
.acc-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.2,.6,.2,1)}
.acc-item.open .acc-a{grid-template-rows:1fr}
.acc-a>div{overflow:hidden;color:var(--muted);max-width:60ch}
.acc-a p{margin:0 0 20px}`,
  html:`<div class="stage tight"><div class="acc">
<div class="acc-item open"><button class="acc-q">איך זה עובד בלי JS למדידת גובה?<span class="chev">▾</span></button>
<div class="acc-a"><div><p>grid-template-rows עובר מ-0fr ל-1fr, והדפדפן עושה את כל העבודה.</p></div></div></div>
<div class="acc-item"><button class="acc-q">וזה עובד בכל הדפדפנים?<span class="chev">▾</span></button>
<div class="acc-a"><div><p>כן, כל הדפדפנים המודרניים תומכים במעבר על fr.</p></div></div></div>
<div class="acc-item"><button class="acc-q">מה עם נגישות?<span class="chev">▾</span></button>
<div class="acc-a"><div><p>הכפתור אמיתי, מקלדת עובדת, והתוכן נשאר ב-DOM.</p></div></div></div>
</div></div>`,
  js:`document.querySelectorAll(".acc-q").forEach(q=>q.addEventListener("click",()=>{
  q.closest(".acc-item").classList.toggle("open");
}));`, runway:false
},
{
  id:"css07", cat:"css", name:"ספינר + שלוש נקודות", tech:"CSS keyframes", status:"מאושר",
  desc:"שני מצייני הטעינה הקלאסיים: טבעת מסתובבת ושלוש נקודות מדלגות.",
  when:"טעינות קצרות. לטעינת תוכן ארוכה עדיף שלד (B15).",
  css:`.loaders{display:flex;gap:60px;justify-content:center;align-items:center}
.spin{width:42px;height:42px;border-radius:50%;border:4px solid #ececf4;border-top-color:var(--accent);animation:spin 1s linear infinite}
@keyframes spin{to{rotate:360deg}}
.dots{display:flex;gap:8px}
.dots span{width:11px;height:11px;border-radius:50%;background:var(--accent);animation:hop 1.2s ease-in-out infinite}
.dots span:nth-child(2){animation-delay:.15s}
.dots span:nth-child(3){animation-delay:.3s}
@keyframes hop{0%,60%,100%{translate:0 0}30%{translate:0 -10px}}
@media(prefers-reduced-motion:reduce){.spin,.dots span{animation:none}}`,
  html:`<div class="stage tight"><div class="loaders"><div class="spin"></div><div class="dots"><span></span><span></span><span></span></div></div></div>`,
  js:``, runway:false
},
{
  id:"css08", cat:"css", name:"ברק חולף על טקסט", tech:"CSS background-clip", status:"מאושר",
  desc:"פס אור שחולף על הכותרת בלולאה. עדין ויוקרתי.",
  when:"כותרת הירו או לוגו טקסטואלי. אחד לעמוד.",
  css:`.shine{font-size:var(--fs-demo);font-weight:800;
background:linear-gradient(110deg,#16182b 40%,#8f97ff 50%,#16182b 60%);
background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
animation:shine 3.2s linear infinite}
@keyframes shine{from{background-position:130% 0}to{background-position:-130% 0}}
@media(prefers-reduced-motion:reduce){.shine{animation:none;color:var(--ink);background:none}}`,
  html:`<div class="stage tight center"><h2 class="shine">ברק שחולף על הכותרת</h2></div>`,
  js:``, runway:false
},
{
  id:"css09", cat:"css", name:"רעידת שגיאה", tech:"CSS keyframes", status:"מאושר",
  desc:"שדה שנרעד אופקית כששולחים ערך לא תקין. פידבק שמרגישים בלי לקרוא.",
  when:"ולידציית טפסים. תמיד יחד עם הודעת טקסט, לא במקומה.",
  css:`.err-demo{display:flex;flex-direction:column;gap:10px;align-items:center}
.err-input{font-family:inherit;font-size:16px;padding:13px 18px;border:1px solid var(--line);border-radius:12px;width:min(320px,80vw)}
.err-input.shake{animation:shake .35s;border-color:#d92d20}
@keyframes shake{0%,100%{translate:0}20%{translate:8px 0}40%{translate:-8px 0}60%{translate:5px 0}80%{translate:-5px 0}}
.err-msg{font-size:13px;color:#d92d20;opacity:0;transition:opacity .2s}
.err-msg.on{opacity:1}`,
  html:`<div class="stage tight"><div class="err-demo">
<input class="err-input" placeholder="הקלד משהו ולחץ שלח">
<span class="err-msg">המספר לא נראה תקין, אפשר לבדוק?</span>
<button class="gbtn err-send">שלח</button>
</div></div>`,
  js:`document.querySelector(".err-send").addEventListener("click",()=>{
  const i=document.querySelector(".err-input");
  i.classList.remove("shake");void i.offsetWidth;i.classList.add("shake");
  document.querySelector(".err-msg").classList.add("on");
});`, runway:false
},
{
  id:"css10", cat:"css", name:"כרטיס מתהפך (Flip)", tech:"CSS 3D transform", status:"מאושר",
  desc:"כרטיס עם שני צדדים שמתהפך בהובר או בלחיצה.",
  when:"צוות (תמונה/פרטים), פיצ'רים עם עומק, כרטיסי משחק.",
  css:`.flipw{width:260px;height:330px;perspective:1100px;margin-inline:auto;cursor:pointer}
.flip{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.2,.6,.2,1)}
.flipw:hover .flip,.flipw.tap .flip{transform:rotateY(180deg)}
.face{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--r);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.face.back{transform:rotateY(180deg);background:#16182b;color:#fff}
.face.back p{color:#b9bbd4;font-size:14px;margin:0;padding-inline:24px;text-align:center}`,
  html:`<div class="stage tight"><div class="flipw"><div class="flip">
<div class="face ph ph-b">הצד הקדמי</div>
<div class="face back"><h3 style="margin:0">הצד האחורי</h3><p>הובר בדסקטופ, לחיצה במובייל.</p></div>
</div></div></div>`,
  js:`document.querySelector(".flipw").addEventListener("click",function(){this.classList.toggle("tap")});`,
  runway:false
},
{
  id:"css11", cat:"css", name:"הקלדה חיה (Typewriter)", tech:"CSS steps() + keyframes", status:"מאושר",
  desc:"טקסט שנכתב אות-אות עם סמן מהבהב. ב-CSS טהור דרך steps.",
  when:"הירו של מוצרי טק ו-AI. שורה אחת קצרה.",
  css:`.typew{display:flex;justify-content:center;direction:ltr}
.type{font-size:clamp(22px,2.2vw,40px);font-weight:700;white-space:nowrap;overflow:hidden;
border-inline-end:3px solid var(--accent);width:0;animation:typing 2.6s steps(22) .5s forwards,caret .8s step-end infinite}
@keyframes typing{to{width:22ch}}
@keyframes caret{50%{border-color:transparent}}
@media(prefers-reduced-motion:reduce){.type{width:22ch;animation:caret .8s step-end infinite}}`,
  html:`<div class="stage tight"><div class="typew"><div class="type">Building something new.</div></div>
<p class="center" style="color:var(--muted);font-size:13px">הערה: steps של CSS עובד חלק באנגלית; לעברית עדיף מימוש JS מילה-מילה.</p></div>`,
  js:``, runway:false
},
{
  id:"css12", cat:"css", name:"גבול גרדיאנט מסתובב", tech:"CSS @property + conic-gradient", status:"מאושר",
  desc:"מסגרת גרדיאנט שמסתובבת סביב הכרטיס בלולאה. אפקט פרימיום מודרני.",
  when:"כרטיס מודגש אחד: ההצעה המרכזית, באדג' AI.",
  css:`@property --ang{syntax:"<angle>";initial-value:0deg;inherits:false}
.gb{position:relative;width:min(340px,80vw);margin-inline:auto;border-radius:18px;padding:2px;
background:conic-gradient(from var(--ang),#4a3aff,#c2255c,#e8590c,#4a3aff);
animation:rot 3.5s linear infinite}
@keyframes rot{to{--ang:360deg}}
.gb-in{background:#fff;border-radius:16px;padding:30px;text-align:center}
.gb-in h3{margin:0 0 6px}
.gb-in p{margin:0;color:var(--muted);font-size:14px}
@media(prefers-reduced-motion:reduce){.gb{animation:none}}`,
  html:`<div class="stage tight"><div class="gb"><div class="gb-in"><h3>הכרטיס המודגש</h3><p>הגבול מסתובב סביבי בלי סוף.</p></div></div></div>`,
  js:``, runway:false
}
];
