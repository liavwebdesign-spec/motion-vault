// נכרה מ-academy.shiruziel.com (14.9.2026). שחזור התנהגות בלבד, מאפס, בטוקנים שלנו.
// נבחרו רק שלושה מתוך שישה חדשים: השאר נשענים על נכס מעוצב (רצועת בד) או מתאימים לקורס אנימציה ולא לעסק.
export default [
{
  id:"b63", cat:"behavior", name:"שאלות נפוצות כשיחה", tech:"CSS grid-rows · JS", status:"ממתין",
  desc:"כל שאלה נראית כמו הודעה שנשלחה, והתשובה נכנסת כהודעת תגובה עם תמונת פרופיל. הפלוס מסתובב לאיקס, השאלה הפתוחה נצבעת בצבע המותג, ורק אחת פתוחה בכל רגע.",
  when:"סקשן שאלות נפוצות באתר של נותן שירות, קליניקה, יועץ או קורס: כל עסק שבו הלקוח קונה אדם ולא מוצר. התמונה בתגובה היא בעל העסק, וזה הופך רשימה יבשה לשיחה. באתר תאגידי או במפרט טכני עדיף האקורדיון הרגיל (b30).",
  libs:[],
  css:`.cq{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(28px,6vw,110px);align-items:start;max-width:min(1180px,94vw);margin-inline:auto}
.cq-side{position:sticky;top:clamp(80px,12vh,140px)}
.cq-side h3{font-size:clamp(30px,3.6vw,54px);line-height:1.1;margin:0 0 16px;font-weight:400}
.cq-side h3 b{font-weight:800;display:block}
.cq-side p{margin:0;color:var(--muted);font-size:17px;line-height:1.6;max-width:36ch}
.cq-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.cq-item{display:flex;flex-direction:column;align-items:flex-start}
/* השאלה: הודעה שנשלחה. יושבת בצד ההתחלה (ימין בעברית) עם פינה חדה אחת בצד השולח */
.cq-q{display:inline-flex;align-items:center;gap:12px;max-width:100%;background:none;border:0;padding:4px 0;font:inherit;text-align:start;cursor:pointer;color:inherit}
.cq-txt{padding:16px 26px;border-radius:30px 6px 30px 30px;background:var(--ink);color:var(--bg);font-size:clamp(16px,1.4vw,19px);font-weight:600;line-height:1.4;
  box-shadow:0 14px 30px -18px color-mix(in srgb,var(--ink) 60%,transparent);transition:background-color .3s,color .3s,transform .3s cubic-bezier(.2,.6,.2,1)}
.cq-mark{flex:none;width:44px;height:44px;border-radius:50%;background:var(--ink);position:relative;transition:background-color .3s,transform .4s cubic-bezier(.2,.6,.2,1)}
.cq-mark::before,.cq-mark::after{content:"";position:absolute;inset:50% 13px auto;height:2px;margin-top:-1px;border-radius:2px;background:var(--bg)}
.cq-mark::after{transform:rotate(90deg)}
.cq-q:hover .cq-txt{transform:translateY(-2px)}
.cq-q:focus-visible{outline:none}
.cq-q:focus-visible .cq-txt{outline:2px solid var(--accent);outline-offset:3px}
.cq-item.open .cq-txt{background:var(--accent);color:var(--accent-ink)}
.cq-item.open .cq-mark{background:var(--accent);transform:rotate(45deg)}
.cq-item.open .cq-mark::before,.cq-item.open .cq-mark::after{background:var(--accent-ink)}
/* התשובה: גובה אמיתי ב-grid-template-rows, ובתוכו בועה שקופצת פנימה רק אחרי שהשורה נפתחה */
.cq-a{display:grid;grid-template-rows:0fr;width:100%;transition:grid-template-rows .42s cubic-bezier(.2,.6,.2,1)}
.cq-item.open .cq-a{grid-template-rows:1fr}
.cq-a>div{overflow:hidden}
.cq-reply{display:flex;align-items:flex-end;gap:12px;justify-content:flex-end;padding:10px 4px 26px;
  opacity:0;transform:translateY(12px) scale(.97);transform-origin:left bottom;transition:opacity .25s,transform .25s cubic-bezier(.2,.6,.2,1)}
.cq-item.open .cq-reply{opacity:1;transform:none;transition:opacity .35s .12s,transform .45s .12s cubic-bezier(.2,.6,.2,1)}
.cq-bub{max-width:min(560px,100%);background:var(--card);color:var(--ink);border:1px solid var(--line);padding:18px 24px;
  border-radius:26px 26px 26px 6px;font-size:16px;line-height:1.65;box-shadow:0 14px 34px -20px color-mix(in srgb,var(--ink) 40%,transparent)}
.cq-bub p{margin:0}
.cq-av{flex:none;width:42px;height:42px;border-radius:50%;box-shadow:0 0 0 3px var(--card);font-size:15px}
@media (max-width:820px){.cq{grid-template-columns:1fr}.cq-side{position:static}}
@media (prefers-reduced-motion: reduce){.cq-a,.cq-reply,.cq-item.open .cq-reply,.cq-txt,.cq-mark{transition-duration:.01ms;transition-delay:0s}}`,
  html:`<div class="stage tight"><div class="cq">
  <div class="cq-side">
    <h3>שאלו הכל,<b>אנחנו ספר פתוח</b></h3>
    <p>לא מצאתם כאן את השאלה שלכם? כתבו לנו, ותקבלו תשובה אישית תוך יום עבודה.</p>
  </div>
  <ul class="cq-list">
    <li class="cq-item"><button class="cq-q" aria-expanded="false" aria-controls="cq-a1"><span class="cq-txt">כמה זמן לוקח לבנות אתר?</span><span class="cq-mark" aria-hidden="true"></span></button>
      <div class="cq-a" id="cq-a1" role="region"><div><div class="cq-reply"><div class="cq-bub"><p>דף נחיתה בין שבוע לשבועיים, אתר תדמית מלא בין שלושה לחמישה שבועות. הספירה מתחילה מהרגע שכל החומרים אצלנו.</p></div><span class="cq-av ph ph-a" aria-hidden="true"></span></div></div></div></li>
    <li class="cq-item"><button class="cq-q" aria-expanded="false" aria-controls="cq-a2"><span class="cq-txt">מה צריך להכין מראש?</span><span class="cq-mark" aria-hidden="true"></span></button>
      <div class="cq-a" id="cq-a2" role="region"><div><div class="cq-reply"><div class="cq-bub"><p>לוגו, תמונות וטקסטים ראשוניים. אין לכם? אנחנו כותבים ומצלמים, וזה מתומחר בנפרד.</p></div><span class="cq-av ph ph-a" aria-hidden="true"></span></div></div></div></li>
    <li class="cq-item"><button class="cq-q" aria-expanded="false" aria-controls="cq-a3"><span class="cq-txt">האתר יתאים לטלפון?</span><span class="cq-mark" aria-hidden="true"></span></button>
      <div class="cq-a" id="cq-a3" role="region"><div><div class="cq-reply"><div class="cq-bub"><p>כל אתר נבנה קודם לטלפון ורק אחר כך למחשב, כי שם נמצאים רוב הגולשים שלכם.</p></div><span class="cq-av ph ph-a" aria-hidden="true"></span></div></div></div></li>
    <li class="cq-item"><button class="cq-q" aria-expanded="false" aria-controls="cq-a4"><span class="cq-txt">ומה קורה אחרי שהאתר עולה לאוויר?</span><span class="cq-mark" aria-hidden="true"></span></button>
      <div class="cq-a" id="cq-a4" role="region"><div><div class="cq-reply"><div class="cq-bub"><p>חודש ליווי כלול. אחריו אפשר לבחור חבילת תחזוקה עם גיבויים, עדכוני אבטחה ושינויי תוכן קטנים.</p></div><span class="cq-av ph ph-a" aria-hidden="true"></span></div></div></div></li>
  </ul>
</div></div>`,
  js:`(function(){
  const items=[...document.querySelectorAll(".cq-item")];
  const SINGLE=true; // רק שאלה אחת פתוחה, כמו שיחה. false מאפשר כמה במקביל
  function set(item,open){
    item.classList.toggle("open",open);
    item.querySelector(".cq-q").setAttribute("aria-expanded",String(open));
  }
  items.forEach(item=>{
    item.querySelector(".cq-q").addEventListener("click",()=>{
      const open=!item.classList.contains("open");
      if(SINGLE)items.forEach(o=>o!==item&&set(o,false));
      set(item,open);
    });
  });
  set(items[0],true); // השאלה הראשונה פתוחה, כדי שהגולש יבין מיד שזו שיחה ולא רשימה
})();`,
  runway:false,
  note:"שלוש החלטות שעושות את זה שיחה ולא אקורדיון צבוע: (1) שני צדדים. השאלה בצד ההתחלה והתשובה בצד השני, כל אחת עם פינה חדה אחת בצד הדובר. (2) תמונה אמיתית של בעל העסק בתשובה. בלי תמונה זה שוב רשימה. (3) לעטיפה של הבועה ריפוד תחתון של 26 פיקסלים: ה-overflow:hidden שמאפשר את פתיחת הגובה חותך גם את הצל, ובלי הריפוד מופיע קו חד מתחת לכל תשובה. (4) הבועה נכנסת 120 מילישניות אחרי שהשורה מתחילה להיפתח, כך שהגובה נפתח קודם והתוכן נוחת לתוכו. בלי העיכוב הבועה קופצת בתוך קופסה שעוד לא קיימת. הגובה עצמו ב-grid-template-rows מ-0fr ל-1fr, כמו ב-b30. ויתרנו במודע על נקודות הקלדה: הן נחמדות בפעם הראשונה ומעכבות את התשובה בכל פעם אחרי זה.",
},
{
  id:"b64", cat:"behavior", name:"תגיות שמצביעות על המסר המרכזי", tech:"vanilla JS · IntersectionObserver · CSS", status:"ממתין",
  desc:"משפט מרכזי בתוך עיגול, וסביבו תגיות של שירותים או יכולות. לכל תגית חץ קטן כמו סמן של משתמש, שמחושב כך שיכוון תמיד אל מרכז העיגול. בכניסה העיגול גדל והתגיות יוצאות ממנו החוצה, ואחר כך הן מתנדנדות קלות.",
  when:"סקשן שמסכם הצעת ערך אחת ומראה את כל מה שמרכיב אותה: סוכנות ושירותיה, קורס ונושאיו, מוצר ויכולותיו. עובד כשיש משפט אחד חזק וחמש עד שמונה תגיות קצרות. לא לרשימה ארוכה ולא לתגיות של יותר משתי מילים.",
  libs:[],
  css:`.aim{position:relative;height:min(78vh,640px);max-width:min(1240px,96vw);margin-inline:auto}
.aim-disc{position:absolute;left:50%;top:50%;width:min(56vh,460px,70vw);aspect-ratio:1;border-radius:50%;background:var(--ink);color:var(--bg);
  display:grid;place-items:center;text-align:center;padding:9%;box-sizing:border-box;translate:-50% -50%;
  transform:scale(.55);opacity:0;transition:transform .9s cubic-bezier(.2,.6,.2,1),opacity .5s}
.aim-disc p{margin:0;font-size:clamp(22px,2.6vw,38px);line-height:1.2;font-weight:400}
.aim-disc b{display:block;font-weight:800;color:color-mix(in srgb,var(--accent) 55%,var(--bg))}
.aim-chip{position:absolute;left:var(--x);top:var(--y);translate:-50% -50%;transition:transform .8s cubic-bezier(.2,.6,.2,1),opacity .4s;
  transform:translate(var(--fx,0),var(--fy,0)) scale(.4);opacity:0;transition-delay:calc(var(--i) * 70ms + 250ms)}
/* הנדנוד על עטיפה פנימית, כדי שלא יתנגש ב-transform של הכניסה */
.aim-bob{display:block;animation:aim-bob var(--d,5s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -900ms)}
.aim-pill{display:block;white-space:nowrap;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:clamp(15px,1.35vw,19px);
  padding:12px 22px;border-radius:999px;box-shadow:0 12px 26px -14px color-mix(in srgb,var(--accent) 80%,transparent);transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.aim-chip:hover .aim-pill{transform:translateY(-3px)}
.aim-ptr{position:absolute;left:0;top:0;width:20px;height:18px;background:var(--accent);clip-path:polygon(100% 50%,0 0,22% 50%,0 100%);
  transform:translate(var(--px,0),var(--py,0)) translate(-50%,-50%) rotate(var(--a,0deg))}
.aim.in .aim-disc{transform:scale(1);opacity:1}
.aim.in .aim-chip{transform:none;opacity:1}
@keyframes aim-bob{from{transform:translateY(-6px)}to{transform:translateY(6px)}}
@media (max-width:760px){
  .aim{height:auto;min-height:150vw}
  .aim-disc{width:64vw;top:50%}
  .aim-chip{left:var(--mx);top:var(--my)}
}
@media (prefers-reduced-motion: reduce){
  .aim-disc,.aim-chip{transition-duration:.01ms;transition-delay:0s}
  .aim-bob{animation:none}
}`,
  html:`<div class="stage tight"><div class="aim">
  <div class="aim-disc"><p>אתר שלא רק נראה טוב<b>אלא מביא לקוחות</b></p></div>
  <ul class="aim-chips" style="list-style:none;margin:0;padding:0">
    <li class="aim-chip" style="--i:0;--x:24%;--y:22%;--mx:26%;--my:8%;--d:5.2s"><span class="aim-bob"><span class="aim-pill">אסטרטגיה</span></span><i class="aim-ptr"></i></li>
    <li class="aim-chip" style="--i:1;--x:17%;--y:50%;--mx:74%;--my:8%;--d:6.1s"><span class="aim-bob"><span class="aim-pill">קופי שממיר</span></span><i class="aim-ptr"></i></li>
    <li class="aim-chip" style="--i:2;--x:25%;--y:78%;--mx:50%;--my:15%;--d:5.6s"><span class="aim-bob"><span class="aim-pill">עיצוב</span></span><i class="aim-ptr"></i></li>
    <li class="aim-chip" style="--i:3;--x:76%;--y:21%;--mx:26%;--my:92%;--d:6.4s"><span class="aim-bob"><span class="aim-pill">פיתוח</span></span><i class="aim-ptr"></i></li>
    <li class="aim-chip" style="--i:4;--x:83%;--y:52%;--mx:74%;--my:92%;--d:5s"><span class="aim-bob"><span class="aim-pill">אנימציה</span></span><i class="aim-ptr"></i></li>
    <li class="aim-chip" style="--i:5;--x:75%;--y:80%;--mx:50%;--my:85%;--d:5.8s"><span class="aim-bob"><span class="aim-pill">קידום בגוגל</span></span><i class="aim-ptr"></i></li>
  </ul>
</div></div>`,
  js:`(function(){
  const box=document.querySelector(".aim"),disc=box.querySelector(".aim-disc");
  const chips=[...box.querySelectorAll(".aim-chip")];
  // החץ יושב על שפת התגית בכיוון המרכז. שפת גלולה אינה עיגול, ולכן מחשבים חיתוך של הקרן עם המלבן:
  // המרחק לשפה הוא המינימום בין חצי הרוחב חלקי |cos| לחצי הגובה חלקי |sin|.
  function aim(){
    const b=box.getBoundingClientRect(),d=disc.getBoundingClientRect();
    const cx=d.left+d.width/2-b.left,cy=d.top+d.height/2-b.top;
    chips.forEach(ch=>{
      const pill=ch.querySelector(".aim-pill"),ptr=ch.querySelector(".aim-ptr");
      // מודדים את מיקום התגית בלי הטרנספורם של הכניסה, אחרת לפני הכניסה החץ מכוון ממקום שגוי
      const x=ch.offsetLeft,y=ch.offsetTop; // translate:-50% -50% ממרכז את התגית על הנקודה הזאת
      const dx=cx-x,dy=cy-y,ang=Math.atan2(dy,dx);
      const hw=pill.offsetWidth/2,hh=pill.offsetHeight/2;
      const t=Math.min(hw/Math.max(Math.abs(Math.cos(ang)),1e-3),hh/Math.max(Math.abs(Math.sin(ang)),1e-3))+10;
      ptr.style.setProperty("--px",(pill.offsetWidth/2+Math.cos(ang)*t)+"px");
      ptr.style.setProperty("--py",(pill.offsetHeight/2+Math.sin(ang)*t)+"px");
      ptr.style.setProperty("--a",ang+"rad");
      // נקודת המוצא של הכניסה: מרכז העיגול, כך שהתגיות נראות כאילו יצאו ממנו
      ch.style.setProperty("--fx",(cx-x)*.7+"px");
      ch.style.setProperty("--fy",(cy-y)*.7+"px");
    });
  }
  aim();
  addEventListener("resize",aim);
  if(document.fonts)document.fonts.ready.then(aim);
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){box.classList.add("in");io.disconnect();}},{threshold:.35});
  io.observe(box);
})();`,
  runway:true,
  note:"הזווית של כל חץ מחושבת ב-JS ממיקום אמיתי ולא נכתבת ביד, ולכן היא נשארת נכונה במובייל, שבו התגיות עוברות לשורות מעל ומתחת לעיגול. מלכודת: אם מודדים עם getBoundingClientRect לפני הכניסה, מקבלים את התגית המכווצת והמוזזת, והחצים מכוונים לנקודה שגויה. לכן offsetLeft ו-offsetTop, שמתעלמים מטרנספורמים. הנדנוד יושב על עטיפה פנימית, אחרת ה-animation דורס את ה-transform של הכניסה. בעור עם accent בהיר הטקסט בתגית מקבל var(--accent-ink) ונשאר קריא.",
},
{
  id:"lm10", cat:"lm", name:"לוגואים שמקבלים את צבע הרקע", tech:"CSS mask-image (קרפט, לא תנועה)", status:"ממתין",
  desc:"כל לוגו בקובץ שלו, בכל צבע, משמש כמסכה, והצבע שנשפך דרכה הוא צבע הטקסט של הסקשן. אותה רצועת לקוחות יושבת על רקע בהיר, כהה או בצבע המותג, ומתהפכת לבד בלי קובץ נוסף ובלי פילטר.",
  when:"כל רצועת לקוחות, שותפים או \"הופענו ב\". במיוחד כשהלוגואים מגיעים מהלקוח בעשרה צבעים שונים, או כשהרצועה יושבת על רקע כהה, או כשהעמוד מחליף ערכת צבע בגלילה (b29).",
  libs:[],
  css:`.lgm{display:grid;gap:14px;max-width:min(1180px,94vw);margin-inline:auto}
.lgm-bar{display:flex;gap:8px;justify-content:center;margin-bottom:10px}
.lgm-bar button{font:inherit;font-size:14px;padding:8px 16px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer;transition:background-color .25s,color .25s}
.lgm-bar button.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.lgm-strip{border-radius:var(--r);padding:clamp(26px,3.4vw,46px) clamp(18px,3vw,40px);background:var(--bg);color:var(--ink);border:1px solid var(--line);
  transition:background-color .6s cubic-bezier(.2,.6,.2,1),color .6s cubic-bezier(.2,.6,.2,1)}
.lgm-strip[data-tone="ink"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.lgm-strip[data-tone="accent"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.lgm-strip small{display:block;text-align:center;font-size:13px;letter-spacing:.14em;opacity:.7;margin-bottom:22px}
.lgm-row{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(16px,3vw,48px);align-items:center}
/* הלב: הלוגו הוא מסכה, והצבע הוא currentColor. הקובץ המקורי יכול להיות בכל צבע, רק שקיפות קובעת */
.lgm-logo{display:block;height:clamp(26px,3vw,40px);background:currentColor;opacity:.72;
  -webkit-mask:var(--logo) center/contain no-repeat;mask:var(--logo) center/contain no-repeat;transition:opacity .3s}
.lgm-logo:hover{opacity:1}
.lgm-orig{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(16px,3vw,48px);align-items:center;padding:0 clamp(18px,3vw,40px)}
.lgm-orig img{height:clamp(22px,2.6vw,34px);width:100%;object-fit:contain}
.lgm-cap{font-size:13px;color:var(--muted);text-align:center;margin:4px 0 0}
@media (max-width:700px){.lgm-row,.lgm-orig{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:26px}}
@media (prefers-reduced-motion: reduce){.lgm-strip{transition-duration:.01ms}}`,
  html:`<div class="stage tight"><div class="lgm">
  <div class="lgm-bar" role="group" aria-label="רקע הרצועה">
    <button class="on" data-tone="bg">רקע בהיר</button><button data-tone="ink">רקע כהה</button><button data-tone="accent">צבע המותג</button>
  </div>
  <p class="lgm-cap">הקבצים המקוריים, כל אחד בצבע אחר:</p>
  <div class="lgm-orig" aria-hidden="true"></div>
  <section class="lgm-strip" data-tone="bg" aria-label="לקוחות">
    <small>עובדים איתנו</small>
    <ul class="lgm-row"></ul>
  </section>
</div></div>`,
  js:`(function(){
  // שישה לוגואים בדויים כ-SVG, כל אחד בצבע משלו, כדי להוכיח שהצבע המקורי לא משנה. בפרויקט אמיתי: url("logos/x.svg")
  const L=[
    ["נורדה","#e0482f",'<circle cx="16" cy="20" r="12"/><rect x="36" y="14" width="84" height="12" rx="6"/>'],
    ["קלטו","#1f8a5b",'<path d="M4 34 20 6l16 28z"/><rect x="44" y="8" width="12" height="26"/><rect x="62" y="8" width="12" height="26"/><rect x="80" y="8" width="40" height="12"/>'],
    ["ארבו","#2d5bd7",'<rect x="4" y="6" width="28" height="28" rx="8"/><rect x="42" y="6" width="78" height="10" rx="5"/><rect x="42" y="22" width="52" height="10" rx="5"/>'],
    ["פלומה","#9b3fd1",'<path d="M4 20a16 16 0 1 1 32 0v14H20A16 16 0 0 1 4 20z"/><rect x="46" y="12" width="74" height="16" rx="3"/>'],
    ["זפיר","#d99a12",'<path d="M4 8h32L4 32h32" fill="none" stroke="#000" stroke-width="6"/><circle cx="60" cy="20" r="8"/><circle cx="84" cy="20" r="8"/><circle cx="108" cy="20" r="8"/>'],
    ["אולם","#111827",'<path d="M20 4 36 13v14L20 36 4 27V13z"/><rect x="46" y="15" width="74" height="10" rx="5"/>'],
  ];
  const uri=(fill,shapes)=>'url("data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 40" fill="'+fill+'">'+shapes+'</svg>')+'")';
  const row=document.querySelector(".lgm-row"),orig=document.querySelector(".lgm-orig");
  L.forEach(([name,color,shapes])=>{
    const li=document.createElement("li");
    const s=document.createElement("span");s.className="lgm-logo";s.setAttribute("role","img");s.setAttribute("aria-label",name);
    s.style.setProperty("--logo",uri(color,shapes));li.appendChild(s);row.appendChild(li);
    const img=document.createElement("img");img.alt="";img.src=uri(color,shapes).slice(5,-2);orig.appendChild(img);
  });
  const strip=document.querySelector(".lgm-strip"),btns=[...document.querySelectorAll(".lgm-bar button")];
  btns.forEach(b=>b.addEventListener("click",()=>{
    strip.dataset.tone=b.dataset.tone;
    btns.forEach(x=>x.classList.toggle("on",x===b));
  }));
})();`,
  runway:false,
  note:"שלושה תנאים שבלעדיהם זה נשבר: (1) הקובץ חייב שקיפות. SVG או PNG שקוף עובדים. JPG עם רקע לבן הופך למלבן מלא בצבע, ולכן לוגו של לקוח שמגיע ב-JPG עובר הסרת רקע לפני שנכנס. (2) הלוגו חייב גובה מפורש וגם רוחב (כאן תא הגריד), כי למסכה אין גודל טבעי; span בלי מידות הוא אפס על אפס. (3) -webkit-mask לצד mask, אחרת בספארי ישן הרצועה ריקה. שלא כמו filter:brightness(0) invert(1), כאן מקבלים כל צבע ולא רק שחור או לבן, והמעבר בין ערכות הוא transition רגיל על color. לוגו רב-צבעי מאבד את הצבעים שלו, וזו בדיוק הכוונה: רצועה אחת, קול אחד.",
},
];
