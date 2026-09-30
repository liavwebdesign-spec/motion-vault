// אנימציות CSS טהורות: הטכנולוגיה הזולה והמהירה ביותר להטמעה, בכל אתר ובכל פלטפורמה.
export default [
{
  id:"css01", cat:"css", name:"הרמת כרטיס בהובר", tech:"CSS transition", status:"מאושר",
  desc:"הכרטיס עולה 5 פיקסלים, הצל מתעמק, והמסגרת מתכהה מעט בגוון המשטח ולא במבטא. הובר הכרטיס של המנוע.",
  when:"כל כרטיס לחיץ. הטרנספורם תמיד איטי מהצבע (0.4 מול 0.3). ההובר רק במכשיר עם עכבר, כדי שנגיעה בטלפון לא תשאיר את הכרטיס באוויר. בפרויקט הכרטיס הוא קישור (או מכיל קישור), ואותו מצב מופיע גם בפוקוס מקלדת. כרטיס בלי גבול מקבל רק הרמה וצל.",
  css:`.lift-row{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.lift{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:26px;cursor:pointer;
transition:border-color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1),transform .4s cubic-bezier(.2,.6,.2,1)}
.lift:is(:focus-visible,:has(:focus-visible)){transform:translateY(-5px);box-shadow:0 14px 40px rgba(22,24,43,.11);border-color:color-mix(in srgb,var(--line),var(--ink) 16%)}
@media (hover:hover) and (pointer:fine){.lift:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(22,24,43,.11);border-color:color-mix(in srgb,var(--line),var(--ink) 16%)}}
@media (prefers-reduced-motion:reduce){.lift,.lift:hover,.lift:is(:focus-visible,:has(:focus-visible)){transform:none}}
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
  when:"לינקים בניווט ובטקסט רץ. הקו נמתח גם בפוקוס מקלדת, וההובר רק במכשיר עם עכבר (בטלפון נגיעה בקישור עוגן לא משאירה קו תקוע). 0.16 שנייה, כי מרחפים על ניווט עשרות פעמים.",
  css:`.ul-row{display:flex;gap:40px;justify-content:center;font-weight:500;font-size:18px}
.ulink{position:relative;padding-bottom:4px;cursor:pointer;color:inherit;text-decoration:none}
.ulink::before{content:"";position:absolute;inset:-8px -4px} /* שטח לחיצה של 44 פיקסלים בטלפון, בלי לשנות את המראה */
.ulink::after{content:"";position:absolute;bottom:0;inset-inline:0;height:2px;background:var(--accent);
transform:scaleX(0);transform-origin:right;transition:transform .16s cubic-bezier(.2,.6,.2,1)}
html[dir="ltr"] .ulink::after{transform-origin:left}
.ulink:focus-visible::after{transform:scaleX(1)}
@media (hover:hover) and (pointer:fine){.ulink:hover::after{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.ulink::after{transition:none}}`,
  html:`<div class="stage tight"><nav class="ul-row" aria-label="ניווט לדוגמה"><a class="ulink" href="#">אודות</a><a class="ulink" href="#">שירותים</a><a class="ulink" href="#">פרויקטים</a><a class="ulink" href="#">צור קשר</a></nav></div>`,
  js:``, runway:false
},
{
  id:"css03", cat:"css", name:"מילוי כפתור מהצד", tech:"CSS pseudo-element", status:"מאושר",
  desc:"רקע הכפתור מתמלא בצבע מהצד בהובר, והטקסט מתהפך.",
  when:"כפתורים משניים באתרי אופי. לא בעור השקט (שם ההובר הוא הכהיה). צבע הטקסט בהובר הוא צבע הרקע של העור ולא לבן קבוע, כך שגם בעור כהה הכפתור נקרא. המילוי נכנס מצד תחילת הקריאה (מימין בעברית, משמאל באתר LTR), גם בפוקוס מקלדת, וההובר רק במכשיר עם עכבר.",
  css:`.fill-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;
min-height:52px;padding-inline:34px;border-radius:999px;border:2px solid var(--ink);background:transparent;
color:var(--ink);font-weight:600;font-size:16px;cursor:pointer;font-family:inherit;z-index:0;transition:color .35s cubic-bezier(.2,.6,.2,1)}
.fill-btn::before{content:"";position:absolute;inset:0;background:var(--ink);z-index:-1;
transform:translateX(101%);transition:transform .35s cubic-bezier(.2,.6,.2,1)}
:where(html[dir="ltr"]) .fill-btn::before{transform:translateX(-101%)}
.fill-btn:focus-visible{color:var(--bg);outline:2px solid var(--ink);outline-offset:3px}
.fill-btn:focus-visible::before{transform:translateX(0)}
@media (hover:hover) and (pointer:fine){.fill-btn:hover{color:var(--bg)}.fill-btn:hover::before{transform:translateX(0)}}
@media (prefers-reduced-motion:reduce){.fill-btn,.fill-btn::before{transition:none}}`,
  html:`<div class="stage tight center"><button class="fill-btn">עבור עליי עם העכבר</button></div>`,
  js:``, runway:false
},
{
  id:"css05", cat:"css", name:"כניסת Blur-In", tech:"CSS @keyframes + IO", status:"מאושר",
  desc:"האלמנט נכנס מטושטש ומתחדד למקומו. תחושה יוקרתית בלי אף ספרייה.",
  when:"ויז'ואלים וכותרות באתרי פרימיום. ההסתרה יושבת מאחורי המחלקה js שהסקריפט שם על html: אם הסקריפט לא רץ, הוויז'ואל פשוט גלוי.",
  css:`.js .blurin{opacity:0}
.js .blurin.in{opacity:1;animation:blurIn .9s cubic-bezier(.2,.6,.2,1) both}
@keyframes blurIn{from{filter:blur(14px);opacity:0;scale:.97}to{filter:blur(0);opacity:1;scale:1}}
.blurin.ph{width:min(560px,80vw);height:300px;margin-inline:auto;font-size:22px}
@media(prefers-reduced-motion:reduce){.js .blurin,.js .blurin.in{opacity:1;animation:none}}`,
  html:`<div class="stage"><div class="blurin ph ph-c">נכנס מטושטש, מתחדד</div></div>`,
  js:`document.documentElement.classList.add("js"); // שער: בלי הסקריפט הזה שום דבר לא מוסתר
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}
}),{threshold:.3});
document.querySelectorAll(".blurin").forEach(el=>io.observe(el));`
},
{
  id:"css06", cat:"css", name:"אקורדיון חלק", tech:"CSS grid-rows transition", status:"מאושר",
  desc:"פתיחה וסגירה חלקות עם הטריק המודרני: grid-template-rows מ-0fr ל-1fr, בלי JS שמודד גבהים.",
  when:"שאלות ותשובות, מפרטים. הכפתור מדווח aria-expanded, ותשובה סגורה מקבלת visibility:hidden אחרי שהסגירה נגמרת, כך שקורא מסך לא מקריא אותה וטאב לא נוחת על קישור שבתוכה.",
  css:`.acc{max-width:560px;margin-inline:auto}
.acc-item{border-bottom:1px solid var(--line)}
.acc-q{width:100%;display:flex;justify-content:space-between;align-items:center;background:none;border:0;color:inherit;
font-family:inherit;font-size:17px;font-weight:600;padding-block:20px;cursor:pointer;text-align:start}
.acc-q .chev{transition:rotate .2s cubic-bezier(.2,.6,.2,1)}
.acc-item.open .chev{rotate:180deg}
.acc-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .24s cubic-bezier(.2,.6,.2,1)}
.acc-item.open .acc-a{grid-template-rows:1fr}
.acc-a>div{overflow:hidden;color:var(--muted);max-width:60ch;visibility:hidden;transition:visibility 0s .24s}
.acc-item.open .acc-a>div{visibility:visible;transition:visibility 0s}
.acc-a p{margin:0 0 20px}
@media (prefers-reduced-motion:reduce){.acc-a,.acc-a>div,.acc-q .chev{transition:none}}`,
  html:`<div class="stage tight"><div class="acc">
<div class="acc-item open"><button class="acc-q" aria-expanded="true">איך זה עובד בלי JS למדידת גובה?<span class="chev" aria-hidden="true">▾</span></button>
<div class="acc-a"><div><p>grid-template-rows עובר מ-0fr ל-1fr, והדפדפן עושה את כל העבודה.</p></div></div></div>
<div class="acc-item"><button class="acc-q" aria-expanded="false">וזה עובד בכל הדפדפנים?<span class="chev" aria-hidden="true">▾</span></button>
<div class="acc-a"><div><p>כן, כל הדפדפנים המודרניים תומכים במעבר על fr.</p></div></div></div>
<div class="acc-item"><button class="acc-q" aria-expanded="false">מה עם נגישות?<span class="chev" aria-hidden="true">▾</span></button>
<div class="acc-a"><div><p>הכפתור אמיתי ומדווח אם הוא פתוח, מקלדת עובדת, ותשובה סגורה מוסתרת גם מקורא מסך.</p></div></div></div>
</div></div>`,
  js:`document.querySelectorAll(".acc-q").forEach(q=>{
  const it=q.closest(".acc-item");
  q.setAttribute("aria-expanded",it.classList.contains("open"));
  q.addEventListener("click",()=>q.setAttribute("aria-expanded",it.classList.toggle("open")));
});`, runway:false
},
{
  id:"css07", cat:"css", name:"ספינר + שלוש נקודות", tech:"CSS keyframes", status:"מאושר",
  desc:"שני מצייני הטעינה הקלאסיים: טבעת מסתובבת ושלוש נקודות מדלגות.",
  when:"טעינות קצרות. לטעינת תוכן ארוכה עדיף שלד (B15). כל מחוון נושא role=\"status\" ושם (\"טוען\"), כדי שקורא מסך יודע שמשהו נטען. בהפחתת תנועה הטבעת ממשיכה להסתובב לאט והנקודות עומדות מעומעמות, כדי שהמחוון לא ייראה תקוע.",
  css:`.loaders{display:flex;gap:60px;justify-content:center;align-items:center}
.spin{width:42px;height:42px;border-radius:50%;border:4px solid #ececf4;border-top-color:var(--accent);animation:spin 1s linear infinite}
@keyframes spin{to{rotate:360deg}}
.dots{display:flex;gap:8px}
.dots span{width:11px;height:11px;border-radius:50%;background:var(--accent);animation:hop 1.2s ease-in-out infinite}
.dots span:nth-child(2){animation-delay:.15s}
.dots span:nth-child(3){animation-delay:.3s}
@keyframes hop{0%,60%,100%{translate:0 0}30%{translate:0 -10px}}
@media(prefers-reduced-motion:reduce){.spin{animation-duration:2.4s}.dots span{animation:none;opacity:.55}}`,
  html:`<div class="stage tight"><div class="loaders"><div class="spin" role="status" aria-label="טוען"></div><div class="dots" role="status" aria-label="טוען"><span></span><span></span><span></span></div></div></div>`,
  js:``, runway:false
},
{
  id:"css08", cat:"css", name:"ברק חולף על טקסט", tech:"CSS background-clip", status:"מאושר",
  desc:"פס אור שחולף על הכותרת בלולאה. עדין ויוקרתי.",
  when:"כותרת הירו או לוגו טקסטואלי. אחד לעמוד.",
  css:`.shine{font-size:var(--fs-demo);font-weight:800;
background:linear-gradient(110deg,var(--ink) 40%,#8f97ff 50%,var(--ink) 60%);
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
  when:"ולידציית טפסים. תמיד יחד עם הודעת טקסט, לא במקומה: ההודעה מקושרת לשדה (aria-describedby) ומוכרזת (aria-live), והשדה מסומן aria-invalid. בהפחתת תנועה אין רעידה, והגבול האדום וההודעה עושים את העבודה.",
  css:`.err-demo{display:flex;flex-direction:column;gap:10px;align-items:center}
.err-input{font-family:inherit;font-size:16px;padding:13px 18px;border:1px solid var(--line);border-radius:12px;width:min(320px,80vw);transition:border-color .15s cubic-bezier(.2,.6,.2,1)}
.err-input.shake{animation:shake .35s;border-color:#d92d20}
@keyframes shake{0%,100%{translate:0}20%{translate:8px 0}40%{translate:-8px 0}60%{translate:5px 0}80%{translate:-5px 0}}
.err-msg{font-size:13px;color:#d92d20;min-height:1.4em;opacity:0;transition:opacity .2s cubic-bezier(.2,.6,.2,1)}
.err-msg.on{opacity:1}
@media(prefers-reduced-motion:reduce){.err-input.shake{animation:none}}`,
  html:`<div class="stage tight"><div class="err-demo">
<input class="err-input" aria-label="מספר טלפון" aria-describedby="err-msg" placeholder="הקלד משהו ולחץ שלח">
<span class="err-msg" id="err-msg" aria-live="polite"></span>
<button class="gbtn err-send">שלח</button>
</div></div>`,
  js:`document.querySelector(".err-send").addEventListener("click",()=>{
  const i=document.querySelector(".err-input"),m=document.querySelector(".err-msg");
  i.classList.remove("shake");void i.offsetWidth;i.classList.add("shake");
  i.setAttribute("aria-invalid","true");
  m.textContent="המספר לא נראה תקין, אפשר לבדוק?";m.classList.add("on");
});`, runway:false
},

{
  id:"css12", cat:"css", name:"גבול גרדיאנט מסתובב", tech:"CSS @property + conic-gradient", status:"מאושר",
  desc:"מסגרת גרדיאנט שמסתובבת סביב הכרטיס בלולאה. אפקט פרימיום מודרני.",
  when:"כרטיס מודגש אחד: ההצעה המרכזית, באדג' AI.",
  css:`@property --ang{syntax:"<angle>";initial-value:0deg;inherits:false}
.gb{position:relative;width:min(340px,80vw);margin-inline:auto;border-radius:18px;padding:2px;
background:conic-gradient(from var(--ang),var(--accent),#c2255c,#e8590c,var(--accent));
animation:rot 3.5s linear infinite}
@keyframes rot{to{--ang:360deg}}
.gb-in{background:var(--card);border-radius:16px;padding:30px;text-align:center}
.gb-in h3{margin:0 0 6px}
.gb-in p{margin:0;color:var(--muted);font-size:14px}
@media(prefers-reduced-motion:reduce){.gb{animation:none}}`,
  html:`<div class="stage tight"><div class="gb"><div class="gb-in"><h3>הכרטיס המודגש</h3><p>הגבול מסתובב סביבי בלי סוף.</p></div></div></div>`,
  js:``, runway:false
}
];
