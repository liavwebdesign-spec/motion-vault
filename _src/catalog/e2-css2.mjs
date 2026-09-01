// אנימציות CSS: גל שני (css13-css22), כולל scroll-driven מודרני בלי JS
export default [
{
  id:"css13", cat:"css", name:"טקסט גרדיאנט נושם", tech:"CSS background-position", status:"ממתין",
  desc:"כותרת בגרדיאנט שזז לאט הלוך ושוב. חיים בלי הסחת דעת.",
  when:"כותרת הירו או מילת מפתח באתרי טק ופרימיום.",
  css:`.gtext{font-size:var(--fs-demo);font-weight:800;
background:linear-gradient(90deg,#4a3aff,#c2255c,#e8590c,#4a3aff);background-size:300% 100%;
-webkit-background-clip:text;background-clip:text;color:transparent;animation:gflow 6s ease-in-out infinite alternate}
@keyframes gflow{from{background-position:0% 0}to{background-position:100% 0}}
@media(prefers-reduced-motion:reduce){.gtext{animation:none}}`,
  html:`<div class="stage tight center"><h2 class="gtext">גרדיאנט שנושם לאט</h2></div>`,
  js:``, runway:false
},
{
  id:"css14", cat:"css", name:"וילון נפתח על תמונה", tech:"CSS clip-path hover", status:"ממתין",
  desc:"שכבת צבע מכסה את התמונה ונפתחת כמו וילון בהובר, וכיתוב נחשף.",
  when:"כרטיסי פורטפוליו וגלריות עבודות.",
  css:`.curtain{position:relative;width:min(420px,80vw);aspect-ratio:4/3;margin-inline:auto;border-radius:var(--r);overflow:hidden;cursor:pointer;font-size:20px}
.curtain .cover{position:absolute;inset:0;background:#16182b;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;clip-path:inset(0 0 0 0);transition:clip-path .5s cubic-bezier(.2,.6,.2,1)}
.curtain:hover .cover{clip-path:inset(0 0 0 100%)}
html[dir="rtl"] .curtain:hover .cover{clip-path:inset(0 100% 0 0)}`,
  html:`<div class="stage tight"><div class="curtain ph ph-d">התמונה מתחת
<div class="cover">שם הפרויקט: עבור עליי</div>
</div></div>`,
  js:``, runway:false
},
{
  id:"css15", cat:"css", name:"כרטיס תלת-ממד עוקב עכבר", tech:"CSS 3D + JS זעיר", status:"ממתין",
  desc:"הכרטיס מוטה בעדינות לכיוון הסמן, עם הבזק אור שנע על הפנים.",
  when:"כרטיס מוצר או הצעה מרכזית. אחד-שניים לעמוד, דסקטופ בלבד.",
  css:`.tilt{width:min(320px,80vw);margin-inline:auto;perspective:900px}
.tilt-in{position:relative;background:#fff;border:1px solid var(--line);border-radius:18px;padding:34px;transition:transform .18s ease-out;transform-style:preserve-3d;overflow:hidden}
.tilt-in::after{content:"";position:absolute;inset:-40%;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(74,58,255,.14),transparent 55%)}
.tilt h3{margin:0 0 8px}.tilt p{margin:0;color:var(--muted);font-size:14px}`,
  html:`<div class="stage tight"><div class="tilt"><div class="tilt-in">
<h3>כרטיס חי</h3><p>הזז את העכבר עליי ותרגיש את העומק.</p>
</div></div></div>`,
  js:`const t=document.querySelector(".tilt"),ti=document.querySelector(".tilt-in");
t.addEventListener("mousemove",e=>{
  const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  ti.style.transform="rotateY("+((x-.5)*14)+"deg) rotateX("+((.5-y)*10)+"deg)";
  ti.style.setProperty("--gx",(x*100)+"%");ti.style.setProperty("--gy",(y*100)+"%");
});
t.addEventListener("mouseleave",()=>ti.style.transform="none");`,
  runway:false
},
{
  id:"css16", cat:"css", name:"זום פנימי בהובר", tech:"CSS transform scale", status:"ממתין",
  desc:"התמונה גדלה בתוך המסגרת החתוכה. הקלאסיקה שכל גלריה צריכה.",
  when:"כרטיסי בלוג, גלריות, קטגוריות חנות.",
  css:`.zoomc{width:min(380px,80vw);margin-inline:auto;border-radius:var(--r);overflow:hidden;cursor:pointer}
.zoomc .ph{aspect-ratio:16/10;font-size:19px;transition:transform .6s cubic-bezier(.2,.6,.2,1)}
.zoomc:hover .ph{transform:scale(1.07)}`,
  html:`<div class="stage tight"><div class="zoomc"><div class="ph ph-c">התמונה גדלה בפנים</div></div></div>`,
  js:``, runway:false
},
{
  id:"css17", cat:"css", name:"פס התקדמות קריאה", tech:"CSS scroll-driven (בלי JS!)", status:"ממתין",
  desc:"פס בראש המסך שמתמלא עם התקדמות הגלילה. מומש כולו ב-CSS עם animation-timeline: scroll().",
  when:"מאמרים ועמודים ארוכים. תמיכת דפדפן: כרום ואדג' (פיירפוקס וספארי בדרך; יש fallback JS בפרויקטים).",
  css:`.rprog{position:fixed;top:0;inset-inline:0;height:4px;background:linear-gradient(90deg,#4a3aff,#c2255c);transform-origin:right;transform:scaleX(0);animation:grow linear;animation-timeline:scroll();z-index:99}
html[dir="ltr"] .rprog{transform-origin:left}
@keyframes grow{to{transform:scaleX(1)}}
.longtext{max-width:640px;margin-inline:auto;color:var(--muted);padding-inline:var(--gutter)}
.longtext p{margin:0 0 60vh}`,
  html:`<div class="rprog"></div>
<div class="stage tight longtext">
<p>גלול וצפה בפס למעלה מתמלא. אפס JavaScript.</p>
<p>הקסם: animation-timeline: scroll() קושר את האנימציה לגלילת העמוד.</p>
<p>וזה כל הסיפור.</p>
</div>`,
  js:``
},
{
  id:"css18", cat:"css", name:"חשיפה ב-view-timeline (בלי JS!)", tech:"CSS scroll-driven", status:"ממתין",
  desc:"כרטיסים שנחשפים כשהם נכנסים למסך, בלי IntersectionObserver בכלל: animation-timeline: view().",
  when:"העתיד של ה-reveal. כרום ואדג' היום, עם fallback רגיל לשאר.",
  css:`.vt-list{display:grid;gap:26px;max-width:560px;margin-inline:auto;padding-inline:var(--gutter)}
.vt{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:26px;
animation:vtIn linear both;animation-timeline:view();animation-range:entry 0% entry 60%}
@keyframes vtIn{from{opacity:0;translate:0 30px;scale:.97}to{opacity:1;translate:0 0;scale:1}}
@media(prefers-reduced-motion:reduce){.vt{animation:none}}`,
  html:`<div class="stage tight vt-list">
<div class="vt"><b>כרטיס ראשון:</b> נחשפתי בזכות CSS בלבד.</div>
<div class="vt"><b>כרטיס שני:</b> animation-timeline: view() עוקב אחרי הכניסה שלי למסך.</div>
<div class="vt"><b>כרטיס שלישי:</b> וגם ההיעלמות בגלילה חזרה חלקה.</div>
<div class="vt"><b>כרטיס רביעי:</b> אפס שורות JavaScript.</div>
</div>`,
  js:``
},
{
  id:"css19", cat:"css", name:"מרקי אנכי (עדויות)", tech:"CSS keyframes", status:"ממתין",
  desc:"טור עדויות שזורם כלפי מעלה בלולאה, עם מסכת קצוות ועצירה בהובר.",
  when:"הוכחה חברתית כשיש הרבה עדויות קצרות.",
  css:`.vmq{height:380px;overflow:hidden;max-width:420px;margin-inline:auto;
-webkit-mask-image:linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(180deg,transparent,#000 12%,#000 88%,transparent)}
.vmq-track{display:flex;flex-direction:column;gap:14px;animation:vup 18s linear infinite}
.vmq:hover .vmq-track{animation-play-state:paused}
.vq{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 20px;font-size:14.5px}
.vq b{display:block;font-size:13px;color:var(--muted);margin-top:6px;font-weight:500}
@keyframes vup{from{transform:translateY(0)}to{transform:translateY(-50%)}}
@media(prefers-reduced-motion:reduce){.vmq-track{animation:none}}`,
  html:`<div class="stage tight"><div class="vmq"><div class="vmq-track">
<div class="vq">"שירות מדהים, תוצאה מעל המצופה"<b>דנה, תל אביב</b></div>
<div class="vq">"האתר החדש הכפיל לנו את הפניות"<b>יוסי, חיפה</b></div>
<div class="vq">"מקצוען אמיתי, מומלץ בחום"<b>מיכל, ירושלים</b></div>
<div class="vq">"תהליך מהיר ומדויק"<b>אבי, באר שבע</b></div>
<div class="vq">"שירות מדהים, תוצאה מעל המצופה"<b>דנה, תל אביב</b></div>
<div class="vq">"האתר החדש הכפיל לנו את הפניות"<b>יוסי, חיפה</b></div>
<div class="vq">"מקצוען אמיתי, מומלץ בחום"<b>מיכל, ירושלים</b></div>
<div class="vq">"תהליך מהיר ומדויק"<b>אבי, באר שבע</b></div>
</div></div></div>`,
  js:``, runway:false
},
{
  id:"css20", cat:"css", name:"הבזק אור על כפתור", tech:"CSS pseudo + keyframes", status:"ממתין",
  desc:"פס אור אלכסוני שחולף על הכפתור כל כמה שניות ומזכיר את קיומו.",
  when:"ה-CTA הראשי בעמוד. אחד בלבד.",
  css:`.shine-btn{position:relative;overflow:hidden}
.shine-btn::after{content:"";position:absolute;top:0;height:100%;width:40%;left:-60%;
background:linear-gradient(105deg,transparent,rgba(255,255,255,.45),transparent);
transform:skewX(-20deg);animation:sweep 3.4s ease-in-out infinite}
@keyframes sweep{0%,60%{left:-60%}100%{left:130%}}
@media(prefers-reduced-motion:reduce){.shine-btn::after{animation:none;display:none}}`,
  html:`<div class="stage tight center"><button class="gbtn shine-btn">קבעו שיחת ייעוץ</button></div>`,
  js:``, runway:false
},
{
  id:"css21", cat:"css", name:"טוגל ומתג מונפשים", tech:"CSS :checked", status:"ממתין",
  desc:"מתג הפעלה וצ'קבוקס עם וי שמצויר: המיקרו-אינטראקציות שגורמות לטופס להרגיש חי.",
  when:"טפסים, הגדרות, בחירת מסלול חודשי/שנתי.",
  css:`.toggles{display:flex;gap:50px;justify-content:center;align-items:center}
.sw{position:relative;width:58px;height:32px;display:inline-block;cursor:pointer}
.sw input{opacity:0;width:0;height:0}
.sw .tr{position:absolute;inset:0;background:#d5d5e2;border-radius:999px;transition:background .25s}
.sw .tr::before{content:"";position:absolute;top:4px;inset-inline-start:4px;width:24px;height:24px;border-radius:50%;background:#fff;transition:translate .25s cubic-bezier(.2,.6,.2,1)}
.sw input:checked+.tr{background:#12b76a}
.sw input:checked+.tr::before{translate:-26px 0}
html[dir="ltr"] .sw input:checked+.tr::before{translate:26px 0}
.cb{display:inline-flex;gap:10px;align-items:center;cursor:pointer;font-size:15px}
.cb input{opacity:0;position:absolute}
.cb .box{width:24px;height:24px;border:2px solid #d5d5e2;border-radius:7px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.cb .box svg{width:14px;height:14px;stroke:#fff;stroke-width:3;fill:none;stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .25s .05s}
.cb input:checked~.box{background:var(--accent);border-color:var(--accent)}
.cb input:checked~.box svg{stroke-dashoffset:0}`,
  html:`<div class="stage tight"><div class="toggles">
<label class="sw"><input type="checkbox" checked><span class="tr"></span></label>
<label class="cb"><input type="checkbox"><span class="box"><svg viewBox="0 0 16 16"><path d="M2.5 8.5l3.5 3.5 7-8"/></svg></span>אני מאשר את התנאים</label>
</div></div>`,
  js:``, runway:false
},
{
  id:"css22", cat:"css", name:"בלוב נושם", tech:"CSS border-radius keyframes", status:"ממתין",
  desc:"צורה אורגנית שמשנה את קימוריה לאט. רקע חי לאזורי הירו רכים.",
  when:"מאחורי תמונות ואייקונים בעורות רכים. אחד-שניים לעמוד.",
  css:`.blob2{width:min(300px,64vw);aspect-ratio:1;margin-inline:auto;background:linear-gradient(140deg,#d0bfff,#91d5ff);
border-radius:58% 42% 55% 45%/45% 58% 42% 55%;animation:blobm 9s ease-in-out infinite alternate;display:flex;align-items:center;justify-content:center;font-weight:700;color:#4a3f8f}
@keyframes blobm{
0%{border-radius:58% 42% 55% 45%/45% 58% 42% 55%}
50%{border-radius:45% 55% 40% 60%/60% 42% 58% 40%}
100%{border-radius:52% 48% 60% 40%/42% 55% 45% 58%}}
@media(prefers-reduced-motion:reduce){.blob2{animation:none}}`,
  html:`<div class="stage tight"><div class="blob2">נושם לאט</div></div>`,
  js:``, runway:false
}
];
