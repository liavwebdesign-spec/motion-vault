// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה א (משפחה 1): מוצר שמסתובב אחרי העכבר, וסרטון שנעצר והמוצר יוצא מתוך המילה.
// המוצר הוא בקבוק בושם בדיוני (LUMA) שנבנה ורונדר בבלנדר מתסריט: _src/blender/mv_bottle.py.

const E = "cubic-bezier(.2,.6,.2,1)";
const H2 = "margin:0;font-size:clamp(30px,3.4vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.01em;text-wrap:balance";
const M = "../assets/media/luma/";

export default [
{
  id:"h36", cat:"hero", name:"מוצר שמסתובב אחרי העכבר", tech:"Canvas · רצף תמונות מבלנדר · JS", status:"ממתין", runway:false,
  desc:"הירו של בושם. הבקבוק לא תמונה אחת אלא 65 צילומים מזוויות שונות, והוא מסתובב ונוטה לכיוון העכבר כאילו הוא מסתכל עליו. ההשתקפויות על הזכוכית והזהב זזות כמו במציאות, כי התאורה נשארה במקום והמוצר זז מתחתיה. כשהעכבר עוזב, הבקבוק ממשיך לנשום בתנועה קטנה. בטלפון גוררים אותו באצבע.",
  when:"מוצר פיזי אחד שהוא הכוכב: בושם, שעון, אוזניות, בקבוק יין, נעל, קופסת מוצר. מתאים כשיש מודל תלת-ממדי או אפשר לבנות אחד, ורוצים שהמבקר ירגיש שהמוצר אמיתי. מתי לא: שירות בלי מוצר, כמה מוצרים באותו מסך (כל אחד הוא עשרות תמונות), או מוצר שטוח שאין לו מה להראות מהצד.",
  note:"**שחזור.** השראה: Scrolltide (1.11.2026), דמות שעוקבת אחרי הסמן. נבנה מאפס: המוצר מודל בלנדר שלנו, והקוד שלנו. **במה זה שונה ממה שיש:** b62 מטה כרטיס שטוח ב-CSS, g67 מסובב תמונה אחת. כאן יש באמת זוויות אחרות של המוצר. **הרשת:** 13 זוויות סיבוב (מ-36 מעלות שמאלה עד 36 ימינה, כל 6) כפול 5 הטיות (מ-12 למטה עד 12 למעלה), רינדור שקוף עם זכוכית שקופה, webp של 600 על 750. סך הכול כ-3 מגה, ולכן נטען רק כשהרכיב מתקרב למסך. **הציור:** קנבס אחד, `drawImage` של התמונה הקרובה למיקום הנוכחי; המיקום נגרר אחרי היעד בהחלקה (`lerp` של 0.08 בכל פריים), כך שגם רשת של 6 מעלות נראית רציפה. **היעד:** מיקום העכבר ביחס למרכז הבקבוק, מנורמל לחצי מסך, ובטלפון גרירה אופקית. אחרי 2.5 שניות בלי תנועה היעד נודד לאט בתנועת שמונה. **הצל** מתחת לבקבוק הוא אליפסה ב-CSS שזזה הפוך לסיבוב. **הלולאה** רצה רק כשהרכיב במסך ונעצרת כשהבקבוק הגיע ליעד. **בלי JS ובהפחתת תנועה:** צילום החזית בלבד, בלי סיבוב. **איך מייצרים למוצר אחר:** התסריט בתיקיית blender מקבל מצב `turn`, תיקייה, רוחב ומספר דגימות; מחליפים את המודל ומריצים. **אסור:** סרטון במקום רצף (קפיצות בגלילה אחורה), או רשת צפופה יותר מכל 4 מעלות (המשקל מוכפל, והעין לא רואה הבדל).",
  libs:[],
  css:`.lu{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,4vw,64px);min-height:min(88vh,820px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:radial-gradient(120% 90% at 30% 55%,color-mix(in srgb,var(--accent) 10%,var(--bg)),var(--bg) 70%);color:var(--ink);overflow:clip}
.lu-tx{display:grid;gap:18px;max-width:30rem}
.lu-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.08em;color:var(--accent)}
.lu-tx h1{${H2};font-size:clamp(38px,5vw,72px)}
.lu-tx p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.lu-cta{justify-self:start;display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:700;text-decoration:none}
.lu-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.lu-pd{position:relative;justify-self:center;width:min(100%,460px);aspect-ratio:4/5;touch-action:pan-y;cursor:grab}
.lu-pd:active{cursor:grabbing}
.lu-pd img,.lu-pd canvas{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.lu-pd canvas{opacity:0;transition:opacity .4s ${E}}
.lu.is-live .lu-pd canvas{opacity:1}
.lu.is-live .lu-pd img{opacity:0;transition:opacity .4s ${E}}
.lu-sh{position:absolute;inset-inline:22%;inset-block-end:4%;height:7%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--ink) 30%,transparent),transparent);filter:blur(6px);transform:translateX(var(--sx,0px));z-index:-1}
@media(max-width:860px){.lu{grid-template-columns:minmax(0,1fr);text-align:start}.lu-pd{order:-1;width:min(78vw,380px)}}`,
  html:`<div class="stage"><section class="lu" data-lu>
  <div class="lu-tx">
    <p class="lu-k">LUMA · או דה פרפיום</p>
    <h1>ענבר, ורד שחור ועץ ארז, בבקבוק שמחזיק את האור</h1>
    <p>ניחוח חם שנפתח לאט ונשאר על העור עד הערב. 50 מ"ל, זכוכית עבה ופקק פליז מלוטש.</p>
    <a class="lu-cta" href="#">להזמנת בקבוק</a>
  </div>
  <div class="lu-pd" role="img" aria-label="בקבוק הבושם LUMA, זכוכית שקופה עם נוזל ענבר ופקק זהב">
    <span class="lu-sh" aria-hidden="true"></span>
    <img src="${M}t-2-06.webp" width="600" height="750" alt="" decoding="async">
    <canvas width="600" height="750" aria-hidden="true"></canvas>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-lu]");
  if(!root||matchMedia("(prefers-reduced-motion: reduce)").matches)return;   // צילום החזית נשאר
  const pd=root.querySelector(".lu-pd"),cv=pd.querySelector("canvas"),ctx=cv.getContext("2d"),sh=pd.querySelector(".lu-sh");
  const NY=13,NP=5,fr=[];
  let tx=0,ty=0,x=0,y=0,last=performance.now(),raf=0,seen=false,drag=null,shown="";
  function load(){
    const B="${M}";let n=0;
    for(let p=0;p<NP;p++)for(let q=0;q<NY;q++){
      const im=new Image();im.decoding="async";
      im.src=B+"t-"+p+"-"+String(q).padStart(2,"0")+".webp";
      im.onload=()=>{if(++n===NP*NY){root.classList.add("is-live");kick();}};
      fr.push(im);
    }
  }
  function draw(){
    const q=Math.round((x+1)/2*(NY-1)),p=Math.round((y+1)/2*(NP-1)),k=p+"-"+q;
    const im=fr[p*NY+q];
    if(k!==shown&&im&&im.naturalWidth){shown=k;ctx.clearRect(0,0,cv.width,cv.height);ctx.drawImage(im,0,0,cv.width,cv.height);}
    sh.style.setProperty("--sx",(-x*14).toFixed(1)+"px");
  }
  function tick(t){
    raf=0;
    if(!seen)return;
    if(!drag&&t-last>2500){const s=(t-last)/1000;tx=Math.sin(s*.45)*.55;ty=Math.sin(s*.9)*.35;}
    x+=(tx-x)*.08;y+=(ty-y)*.08;
    draw();
    if(Math.abs(tx-x)>.002||Math.abs(ty-y)>.002||t-last>2500)raf=requestAnimationFrame(tick);
  }
  function kick(){if(!raf&&seen&&fr.length)raf=requestAnimationFrame(tick);}
  const cl=v=>Math.max(-1,Math.min(1,v));
  addEventListener("pointermove",e=>{
    if(e.pointerType!=="mouse"||!seen)return;
    const r=pd.getBoundingClientRect();
    tx=cl((e.clientX-(r.left+r.width/2))/(innerWidth/2));
    ty=cl(-(e.clientY-(r.top+r.height/2))/(innerHeight/2));
    last=performance.now();kick();
  },{passive:true});
  pd.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")drag={x:e.clientX,v:tx};});
  pd.addEventListener("pointermove",e=>{if(!drag)return;tx=cl(drag.v+(e.clientX-drag.x)/(pd.clientWidth*.6));ty=0;last=performance.now();kick();});
  const up=()=>{drag=null;last=performance.now();};
  pd.addEventListener("pointerup",up);pd.addEventListener("pointercancel",up);
  new IntersectionObserver(([en])=>{
    seen=en.isIntersecting;
    if(seen&&!fr.length)load();
    if(seen){last=performance.now()-2500;kick();}
  },{rootMargin:"200px 0px"}).observe(root);
})();`,
},
{
  id:"h37", cat:"hero", name:"סרטון שנעצר, והמוצר יוצא מתוך המילה", tech:"Video · מסכה מבלנדר · CSS", status:"ממתין", runway:false,
  desc:"הירו של בושם. סרטון קצר מתנגן פעם אחת: הבקבוק נופל ונוחת על בסיס אבן. ברגע שהוא נעצר, שם המותג עולה בענק מאחוריו, והבקבוק נשאר מלפנים, כאילו הוא חלק מהמילה. זה נראה כמו עריכה של סרטון פרסומת, אבל זה רק סרטון, מילה ותמונה אחת בדיוק במקום.",
  when:"השקת מוצר, קולקציה חדשה או מותג עם שם קצר וחזק (2 עד 6 אותיות), כשיש סרטון מוצר שמסתיים בצילום נקי. מתי לא: סרטון שמסתיים בתנועה או בטקסט משלו, שם מותג ארוך (המילה צריכה להיות ענקית), או עמוד שבו הסרטון צריך לחזור בלולאה.",
  note:"**שחזור.** השראה: Scrolltide (1.11.2026), סרטון שמתנגן פעם אחת, נעצר, ומילה ענקית נכנסת בין הרקע לנושא. נבנה מאפס: הסצנה, הסרטון והמסכה מבלנדר שלנו. **במה זה שונה ממה שיש:** g64 שם כותרת בין שכבות בגלילה, עם שני עותקים של הכותרת. כאן אין גלילה: הזמן של הסרטון מפעיל את הרגע, ויש עותק אחד של המילה. **שלוש שכבות באותה קופסה:** הסרטון, המילה, ותמונת חיתוך של הבקבוק מהפריים האחרון. הסרטון והחיתוך באותה רזולוציה ובאותו `object-fit:cover`, ולכן החיתוך יושב על הסרטון בדיוק בפיקסל. **החיתוך** לא נעשה ביד: בלנדר מרנדר את הפריים האחרון פעם נוספת כמסכה (הבקבוק לבן, כל השאר שחור), ו-ffmpeg מצרף אותה כשקיפות (`alphamerge`). **התזמון:** הסרטון מתחיל כשחצי ממנו במסך; באירוע `ended` הוא נשאר על הפריים האחרון, החיתוך מופיע מיד, והמילה עולה מלמטה ב-0.9 שנייה. כפתור «לצפות שוב» מחזיר להתחלה. **בלי JS ובהפחתת תנועה:** המצב הסופי מוצג מההתחלה (פריים אחרון, מילה וחיתוך), בלי הסרטון. **בטלפון** הקופסה בגובה 4:5 והמילה מוקטנת, והבקבוק עדיין מכסה את אמצעה. **אסור:** לנחש מיקום של חיתוך ידני מעל סרטון, או לשים את המילה כטקסט על הסרטון בלי החיתוך (אז היא מסתירה את המוצר).",
  libs:[],
  css:`.lw{position:relative;display:grid;gap:clamp(20px,3vw,32px);padding:clamp(16px,2vw,24px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)}
.lw-box{position:relative;aspect-ratio:16/9;max-height:84vh;border-radius:clamp(16px,2vw,28px);overflow:hidden;isolation:isolate;background:#d7cbbd}
.lw-box>video,.lw-box>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.lw-v{z-index:0}
.lw-last{z-index:0}
.lw-wm{position:absolute;inset-inline:0;inset-block-start:4%;z-index:1;margin:0;text-align:center;font-size:clamp(90px,24vw,360px);font-weight:900;line-height:.82;letter-spacing:-.02em;color:#2b1d12;direction:ltr;pointer-events:none}
.lw-cut{z-index:2;pointer-events:none}
.lw.is-live .lw-last{display:none}
.lw.is-live .lw-cut{opacity:0}
.lw.is-live .lw-wm{opacity:0;transform:translateY(18%)}
.lw.is-live.is-done .lw-cut{opacity:1}
.lw.is-live.is-done .lw-wm{opacity:1;transform:none;transition:opacity .5s ${E},transform .9s ${E}}
.lw-ft{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:16px 32px;padding-inline:clamp(4px,1vw,12px)}
.lw-ft h1{${H2};max-width:22ch}
.lw-ft p{margin:6px 0 0;color:var(--muted);font-size:var(--fs-body);line-height:1.6;max-width:40ch}
.lw-act{display:flex;gap:12px;align-items:center}
.lw-cta{display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:700;text-decoration:none}
.lw-re{min-height:44px;padding:8px 18px;border:0;border-radius:999px;background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink);font:inherit;font-size:14px;font-weight:600;cursor:pointer}
.lw-re[hidden]{display:none}
.lw-cta:focus-visible,.lw-re:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(max-width:700px){.lw-box{aspect-ratio:4/5}.lw-wm{inset-block-start:16%;font-size:31vw}}`,
  html:`<div class="stage"><section class="lw" data-lw>
  <div class="lw-box">
    <img class="lw-last" src="${M}land-last.webp" width="1280" height="720" alt="" decoding="async">
    <video class="lw-v" muted playsinline preload="none" poster="${M}land-first.webp" aria-hidden="true"></video>
    <p class="lw-wm" aria-hidden="true">LUMA</p>
    <img class="lw-cut" src="${M}land-cut.webp" width="1280" height="720" alt="בקבוק הבושם LUMA עומד על בסיס אבן עגול" decoding="async">
  </div>
  <div class="lw-ft">
    <div><h1>LUMA. הבושם החדש שלנו כבר כאן</h1><p>ענבר, ורד שחור ועץ ארז. נשלח בקופסת מתנה, עם דוגמית של 5 מ"ל לנסות לפני שפותחים.</p></div>
    <div class="lw-act"><a class="lw-cta" href="#">להזמנה מוקדמת</a><button class="lw-re" type="button" hidden>לצפות שוב</button></div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-lw]");
  if(!root||matchMedia("(prefers-reduced-motion: reduce)").matches)return;   // המצב הסופי נשאר
  const v=root.querySelector(".lw-v"),re=root.querySelector(".lw-re");
  root.classList.add("is-live");
  let started=false;
  function play(){
    root.classList.remove("is-done");re.hidden=true;
    v.currentTime=0;
    const p=v.play();
    if(p&&p.catch)p.catch(()=>{root.classList.remove("is-live");});         // דפדפן שחוסם ניגון: המצב הסופי הסטטי
  }
  v.addEventListener("ended",()=>{root.classList.add("is-done");re.hidden=false;});
  re.addEventListener("click",play);
  new IntersectionObserver(([en])=>{
    if(en.isIntersecting&&!started){started=true;v.src="${M}land.mp4";play();}
  },{threshold:.5}).observe(root.querySelector(".lw-box"));
})();`,
},
];
