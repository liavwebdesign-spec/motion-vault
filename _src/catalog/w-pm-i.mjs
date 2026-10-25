// שבעה מהלכים של צורות ושכבות אווירה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// צורות צפות בעומק, רצפת רשת בפרספקטיבה, שבבים שנערמים, גצים בקנבס, דמות שמציצה מהקצה, סליל עם קו סריקה וכוכבי שביט בין פסים.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.

// גיאומטריית הסליל (g272): פונקציה אחת משרתת גם את המארקאפ הסטטי (בזמן בנייה) וגם את הריצה (היא מוטמעת בסקריפט כמו שהיא).
// מקבלת רוחב, גובה, פאזה ומספר שלבים, ומחזירה מסלולים: שני הגדילים, השלבים, והנקודות שבחזית ובעומק.
function helix(W,H,ph,N){
  const pad=W*.03,w=W-pad*2,A=H*.34,cy=H/2,turns=W<600?2.4:3.6,f=n=>Math.round(n*10)/10;
  const y=(x,o)=>cy+A*Math.sin((x-pad)/w*turns*6.2832+ph+o);
  const z=(x,o)=>Math.cos((x-pad)/w*turns*6.2832+ph+o);
  let a="",b="",r="",nf="",nb="";
  const S=Math.max(40,Math.round(W/8));
  for(let i=0;i<=S;i++){const x=pad+w*i/S;a+=(i?"L":"M")+f(x)+" "+f(y(x,0));b+=(i?"L":"M")+f(x)+" "+f(y(x,3.1416));}
  for(let i=0;i<=N;i++){
    const x=pad+w*i/N,ya=y(x,0),yb=y(x,3.1416),front=z(x,0)>=0?ya:yb,back=z(x,0)>=0?yb:ya;
    r+="M"+f(x)+" "+f(ya)+"L"+f(x)+" "+f(yb);
    nf+="M"+f(x)+" "+f(front)+"h0";nb+="M"+f(x)+" "+f(back)+"h0";
  }
  return{a:a,b:b,r:r,nf:nf,nb:nb};
}
const HX0=helix(1000,320,.6,38);

export default [
{
  id:"g269", cat:"gsap", name:"פריטים צפים בעומק סביב כותרת מרכזית", tech:"GSAP · ScrollTrigger scrub · quickTo", status:"מאושר-עין",
  desc:"שבבי טקסט וגזרי תמונה מרחפים סביב כותרת במרכז, בשלוש שכבות עומק. הרחוקים קטנים ומטושטשים, הקרובים גדולים ומטושטשים אף הם, והאמצעיים חדים. כל פריט מתנדנד לאט במקומו, בגלילה כל שכבה זזה בכמות אחרת, ועם העכבר השכבות הקרובות זזות יותר. בכניסה הפריטים מתקבצים מסביב לכותרת.",
  when:"הירו או סקשן סיום שיש בו כותרת אחת חזקה ועולם של דברים סביבה: מוצרים, שירותים, מנות, כלים, אנשים. עוזר לעסק שהמוצר שלו רב-פנים (מאפייה, חנות, סטודיו) להראות מגוון בלי רשת. לא מתחת לטקסט ארוך ולא ליד טופס.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם אריחים, גזרים וצורות צפים בעומק סביב כותרת או מונה במרכז. נבנה מאפס מהצפייה. **קרוב ל-g37 (ענן תמונות נעוץ), ושונה בכוונה:** כאן אין הצמדה ואין מסלול גלילה, הכותרת היא הנושא והפריטים הם אטמוספרה סביבה, כולל שבבי טקסט ולא רק תמונות. **המארקאפ הוא המצב הסופי:** כל הפריטים במנוחה במקומם, וזה מה שרואים בלי GSAP ובהפחתת תנועה. **מבנה:** שלוש שכבות (`.fl-far`, `.fl-mid`, `.fl-near`), ובכל פריט שתי עטיפות: `.fl-it` נושא מיקום (`--x`, `--y`), סיבוב (`--r`) וטשטוש (`--b`), ו-`.fl-bob` בפנים נושא רק את הנדנוד. כך שום אנימציה לא דורסת אחרת: הסיבוב נעשה במאפיין `rotate` של CSS ולכן לא מתנגש ב-`transform` של GSAP. **ארבע תנועות:** (1) כניסה בקצב הגלילה (`scrub`, שקיפות וגודל, סדר אקראי); (2) הסטה אנכית של כל שכבה בגלילה, בקצב `3%`, `7%` ו-`12%`; (3) הסטה בעכבר עם `quickTo` לכל שכבה, `8`, `20` ו-`38` פיקסלים, רק במכשיר עם עכבר; (4) נדנוד `sine` עם `yoyo` לכל פריט, בטווח שגדל עם העומק, ונעצר כשהסקשן מחוץ למסך. **טשטוש:** `filter:blur()` על `.fl-it` הקבוע, לא על השכבה המונפשת, כדי לא לצייר מחדש שכבה גדולה בכל פריים. **מובייל:** כל פריט נושא מיקום נפרד לטלפון (`--mx`, `--my`) שמציב אותו ברצועה העליונה או התחתונה, מחוץ לטקסט. פריטים עם `fl-m0` מוסתרים בטלפון, והתמונות מוקטנות ל-52% (`--k`). **כיווניות:** מיקום הפריטים פיזי (`left`) והקומפוזיציה סימטרית, אז באתר LTR אין מה להפוך. **תמונות:** מהמאגר (`s14`), עם `width` ו-`height` מפורשים. **נגישות:** כל השכבות `aria-hidden` והכותרת היא הטקסט היחיד שנקרא. בפרויקט מחליפים את התמונות והשבבים בתכנים של העסק, ושומרים על שלושה עד שישה פריטים בכל שכבה.",
  libs:["gsap","ScrollTrigger"],
  css:`.fl{--fl-bg:color-mix(in oklab,var(--accent) 7%,var(--card));--k:1;position:relative;isolation:isolate;overflow:clip;min-height:clamp(560px,86vh,780px);display:grid;place-items:center;
  padding:clamp(88px,10vw,112px) var(--gutter);border-radius:28px;background:var(--fl-bg)}
.fl-layers{position:absolute;inset:0;z-index:0;pointer-events:none}
.fl-layer{position:absolute;inset:0}
.fl-it{position:absolute;left:var(--x);top:var(--y);rotate:var(--r,0deg);filter:blur(var(--b,0px))}
.fl-far .fl-it{--b:2.5px;opacity:.85}
.fl-near .fl-it{--b:3.5px}
.fl-bob{display:block}
.fl-chip{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:16px;font-weight:600;white-space:nowrap;
  box-shadow:0 10px 24px -14px color-mix(in oklab,var(--ink) 50%,transparent)}
.fl-chip i{display:block;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.fl-chip.is-acc{background:var(--accent);color:var(--accent-ink)}
.fl-chip.is-acc i{background:var(--accent-ink)}
.fl-far .fl-chip{padding:6px 12px;font-size:13px}
.fl-near .fl-chip{padding:14px 24px;font-size:19px}
.fl-ph{display:block;width:calc(var(--w) * var(--k));aspect-ratio:var(--ar);border-radius:16px;overflow:hidden;background:var(--card);
  box-shadow:0 18px 40px -22px color-mix(in oklab,var(--ink) 60%,transparent)}
.fl-ph img{display:block;width:100%;height:100%;object-fit:cover}
.fl-in{position:relative;z-index:2;display:grid;gap:16px;justify-items:center;text-align:center;max-width:min(36ch,100%)}
.fl-in::before{content:"";position:absolute;inset:-48px -56px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--fl-bg) 94%,transparent) 55%,transparent)}
.fl-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.fl h2{margin:0;font-size:clamp(34px,4.6vw,64px);line-height:1.08;text-wrap:balance}
.fl-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted);max-width:34ch}
.fl-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.fl-btn:hover{transform:translateY(-2px)}}
.fl-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(max-width:899px){
  .fl{--k:.52;min-height:620px;padding-block:clamp(112px,36vw,192px)}
  .fl-it{left:var(--mx,var(--x));top:var(--my,var(--y))}
  .fl-m0{display:none}
  .fl-chip{padding:8px 14px;font-size:14px}
  .fl-near .fl-chip{padding:10px 18px;font-size:15px}
}`,
  html:`<div class="stage"><section class="fl">
  <div class="fl-layers" aria-hidden="true">
    <div class="fl-layer fl-far">
      <span class="fl-it" style="--x:38%;--y:4%;--mx:38%;--my:3%;--r:-3deg"><span class="fl-bob"><span class="fl-chip"><i></i>עוגיות שוקולד</span></span></span>
      <span class="fl-it fl-m0" style="--x:64%;--y:10%;--r:4deg"><span class="fl-bob"><span class="fl-chip"><i></i>לחמניות</span></span></span>
      <span class="fl-it fl-m0" style="--x:9%;--y:88%;--r:3deg"><span class="fl-bob"><span class="fl-chip"><i></i>פוקאצ׳ה</span></span></span>
      <span class="fl-it fl-m0" style="--x:46%;--y:92%;--r:-3deg"><span class="fl-bob"><span class="fl-chip"><i></i>עוגת גבינה</span></span></span>
    </div>
    <div class="fl-layer fl-mid">
      <span class="fl-it" style="--x:14%;--y:8%;--mx:6%;--my:4%;--r:4deg"><span class="fl-bob"><span class="fl-ph" style="--w:168px;--ar:4/3"><img src="../assets/media/real/s14/cafe-window.webp" alt="" width="1400" height="1050" loading="lazy" decoding="async"></span></span></span>
      <span class="fl-it" style="--x:76%;--y:66%;--mx:62%;--my:80%;--r:-5deg"><span class="fl-bob"><span class="fl-ph" style="--w:176px;--ar:6/5"><img src="../assets/media/real/s14/hero-bread.webp" alt="" width="1600" height="1333" loading="lazy" decoding="async"></span></span></span>
      <span class="fl-it" style="--x:5%;--y:30%;--mx:36%;--my:13%;--r:-5deg"><span class="fl-bob"><span class="fl-chip is-acc"><i></i>לחם מחמצת</span></span></span>
      <span class="fl-it" style="--x:27%;--y:82%;--mx:34%;--my:86%;--r:3deg"><span class="fl-bob"><span class="fl-chip"><i></i>קרואסון חמאה</span></span></span>
      <span class="fl-it fl-m0" style="--x:62%;--y:86%;--r:-4deg"><span class="fl-bob"><span class="fl-chip is-acc"><i></i>חלה בשישי</span></span></span>
      <span class="fl-it fl-m0" style="--x:81%;--y:50%;--r:3deg"><span class="fl-bob"><span class="fl-chip"><i></i>בורקס גבינה</span></span></span>
    </div>
    <div class="fl-layer fl-near">
      <span class="fl-it" style="--x:3%;--y:50%;--mx:4%;--my:77%;--r:-6deg"><span class="fl-bob"><span class="fl-ph" style="--w:240px;--ar:5/4"><img src="../assets/media/real/s14/croissants.webp" alt="" width="1250" height="1000" loading="lazy" decoding="async"></span></span></span>
      <span class="fl-it" style="--x:79%;--y:6%;--mx:70%;--my:2%;--r:5deg"><span class="fl-bob"><span class="fl-ph" style="--w:200px;--ar:5/6"><img src="../assets/media/real/s14/baker-hands.webp" alt="" width="1100" height="1320" loading="lazy" decoding="async"></span></span></span>
      <span class="fl-it fl-m0" style="--x:86%;--y:84%;--r:-3deg"><span class="fl-bob"><span class="fl-chip"><i></i>קפה שחור</span></span></span>
    </div>
  </div>
  <div class="fl-in">
    <p class="fl-k">מאפיית הפינה ברמת גן</p>
    <h2>לחם, בורקס ועוגות שנאפים אצלנו כל בוקר</h2>
    <p class="fl-lead">מזמינים בטלפון עד הערב ואוספים בבוקר, או מקבלים משלוח ברמת גן ובגבעתיים.</p>
    <a class="fl-btn" href="#">להזמנת מאפים</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל הפריטים נשארים במנוחה, כמו במארקאפ
  const root=document.querySelector(".fl"),layers=[...root.querySelectorAll(".fl-layer")];
  const SC=[3,7,12],PT=[8,20,38],AM=[6,10,16];   // לכל שכבה (רחוקה, אמצעית, קרובה): הסטת גלילה באחוזים, הסטת עכבר בפיקסלים, טווח נדנוד
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const items=[...root.querySelectorAll(".fl-it")],bobs=[];
    const rnd=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);};   // אקראי קבוע: אותה קומפוזיציה בכל טעינה
    // כניסה: הפריטים מתקבצים מסביב לכותרת בקצב הגלילה
    gsap.fromTo(items,{autoAlpha:0,scale:.7},{autoAlpha:1,scale:1,ease:"power3.out",stagger:{each:.05,from:"random"},
      scrollTrigger:{trigger:root,start:"top 88%",end:"top 38%",scrub:.6}});
    layers.forEach((L,i)=>{
      // הסטה אנכית לפי עומק: ככל שהשכבה קרובה יותר היא זזה יותר
      gsap.fromTo(L,{yPercent:-SC[i]},{yPercent:SC[i],ease:"none",scrollTrigger:{trigger:root,start:"top bottom",end:"bottom top",scrub:true}});
      L.querySelectorAll(".fl-bob").forEach((b,j)=>{
        const s=i*17+j,t=gsap.to(b,{x:(rnd(s)-.5)*2*AM[i],y:(rnd(s+3)>.5?1:-1)*(AM[i]*.6+rnd(s+5)*AM[i]*.6),rotation:(rnd(s+7)-.5)*5,
          duration:3.2+rnd(s+9)*2.6,ease:"sine.inOut",yoyo:true,repeat:-1});
        t.progress(rnd(s+11));bobs.push(t);
      });
    });
    // נדנוד רק כשהסקשן על המסך
    ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:s=>bobs.forEach(t=>s.isActive?t.resume():t.pause())});
    // עכבר: כל שכבה זזה נגד כיוון הסמן, והקרובה זזה הכי הרבה. במגע אין הסטה
    const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
    const qx=layers.map(L=>gsap.quickTo(L,"x",{duration:.9,ease:"power3.out"})),qy=layers.map(L=>gsap.quickTo(L,"y",{duration:.9,ease:"power3.out"}));
    const move=e=>{const r=root.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;
      layers.forEach((L,i)=>{qx[i](-nx*PT[i]*2);qy[i](-ny*PT[i]*2);});};
    const leave=()=>layers.forEach((L,i)=>{qx[i](0);qy[i](0);});
    if(fine){root.addEventListener("pointermove",move);root.addEventListener("pointerleave",leave);}
    return()=>{root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",leave);
      gsap.set([...layers,...items,...root.querySelectorAll(".fl-bob")],{clearProps:"all"});};
  });
})();`
}
,
{
  id:"css44", cat:"css", name:"רצפת רשת בפרספקטיבה שנעה לעבר הצופה", tech:"CSS 3D · perspective · gradient mask", status:"מאושר-עין",
  desc:"רצפה של קווים דקים נמתחת עד האופק, והרשת שלה נעה כל הזמן לכיוון הצופה, כך שנדמה שנוסעים קדימה. מעל האופק יושבת שמש שטוחה עם פסי חיתוך שנעשים עבים כלפי מטה, והשמיים מתחממים לכיוון הקו. הכול CSS, בלי סקריפט, ועם סימן אחד אפשר להחליף את הקווים במשבצות.",
  when:"רקע של הירו לעסק שהמראה שלו רטרו או טכנולוגי: ארקייד, אולפן מוזיקה, משחקים, אירועי לילה, כלי למפתחים. הכותרת יושבת על השמיים הרגועים ולא על הרצפה. פעם אחת בעמוד. לא לעסק שקט ורציני כמו משרד או קליניקה.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) עם רצפת רשת או משבצות שנסוגה אל האופק, לפעמים עם שמש שטוחה מפוספסת. נבנה מאפס מהצפייה. **הרצפה:** משטח אחד (`.pf-plane`) מוטה ב-`rotateX(70deg)` בתוך אב עם `perspective` ו-`perspective-origin:50% 0`, כך שהאופק הוא הקצה העליון של הרצפה. הרשת היא שני גרדיאנטים שחוזרים כל `--cell`, והתנועה היא `translateY` של תא אחד בדיוק, בקו ישר, ולכן הלולאה חלקה בלי קפיצה. הרצפה דוהה במסכה בשני קצותיה: בצד האופק, ובתחתית כדי שהרשת לא תיחתך בקו אופקי חד אלא תיבלע ברקע העמוד. פינות הסקשן מעוגלות כמו שאר הלוחות. **גרסת משבצות:** מוסיפים `pf--checker` על הסקשן. המשטח הופך ל-`conic-gradient` שחוזר כל שני תאים, וההזזה (`--run`) כבר מוגדרת לשני תאים. **השמש:** עיגול בצבע המותג עם פסי חיתוך (מסכת גרדיאנט) שמתעבים כלפי מטה, בתוך שמיים עם `overflow:hidden` שחותכים אותה בקו האופק. **פרמטרים:** `--cell` (גודל תא), `--tilt` (זווית) ו-`--speed` (משך תא אחד). **הפחתת תנועה:** הרצפה עומדת והרשת נשארת סטטית. **נגישות:** כל השכבות דקורטיביות (`aria-hidden`). **כיווניות:** התנועה אנכית, והשמש והטקסט ממוקמים עם מאפיינים לוגיים, ולכן המהלך מתהפך לבד באתר LTR. **ביצועים:** רק `transform` מונפש, בלי JS. אם הרצפה נחתכת בגובה נמוך מאוד, מגדילים את `--fh`.",
  libs:[],
  css:`.pf{--cell:64px;--tilt:70deg;--speed:1.6s;--run:var(--cell);--fh:clamp(160px,34%,280px);--sun:clamp(220px,32vw,420px);
  --grid:color-mix(in oklab,var(--accent) 85%,transparent);--grid-a:color-mix(in oklab,var(--accent) 38%,transparent);
  position:relative;isolation:isolate;overflow:hidden;border-radius:28px;min-height:clamp(540px,82vh,780px);
  padding:clamp(48px,7vw,96px) var(--gutter) calc(var(--fh) + 24px)}
/* שמיים: מתחממים לכיוון האופק, וחותכים את השמש בקו שלו */
.pf-sky{position:absolute;inset:0 0 var(--fh) 0;z-index:-2;overflow:hidden;
  background:linear-gradient(to bottom,var(--bg) 22%,color-mix(in oklab,var(--accent) 26%,var(--bg)))}
.pf-sky::after{content:"";position:absolute;inset:auto 0 0 0;height:2px;background:var(--accent);box-shadow:0 0 28px 6px color-mix(in oklab,var(--accent) 55%,transparent)}
.pf-sun{position:absolute;inset-inline-end:clamp(24px,9vw,144px);bottom:calc(var(--sun) * -.22);width:var(--sun);aspect-ratio:1;border-radius:50%;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--accent) 66%,var(--bg)),var(--accent) 78%);
  -webkit-mask-image:linear-gradient(#000 0 50%,transparent 50% 52%,#000 52% 58%,transparent 58% 61%,#000 61% 66%,transparent 66% 70%,#000 70% 74%,transparent 74% 79%,#000 79% 82%,transparent 82% 88%,#000 88% 90%,transparent 90%);
  mask-image:linear-gradient(#000 0 50%,transparent 50% 52%,#000 52% 58%,transparent 58% 61%,#000 61% 66%,transparent 66% 70%,#000 70% 74%,transparent 74% 79%,#000 79% 82%,transparent 82% 88%,#000 88% 90%,transparent 90%)}
/* רצפה: אב עם פרספקטיבה, ובתוכו משטח מוטה שהרשת שלו חוזרת כל תא */
.pf-floor{position:absolute;inset:auto 0 0 0;height:var(--fh);z-index:-1;overflow:hidden;perspective:640px;perspective-origin:50% 0;
  background:linear-gradient(to bottom,color-mix(in oklab,var(--accent) 16%,var(--bg)),var(--bg));
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 40%,#000 72%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 40%,#000 72%,transparent)}
.pf-plane{position:absolute;inset-inline:-60%;top:0;height:420px;transform-origin:50% 0;transform:rotateX(var(--tilt)) translateY(0);
  background-image:linear-gradient(to right,var(--grid) 0 2px,transparent 2px),linear-gradient(to bottom,var(--grid) 0 2px,transparent 2px);
  background-size:var(--cell) var(--cell);animation:pf-run var(--speed) linear infinite}
@keyframes pf-run{from{transform:rotateX(var(--tilt)) translateY(0)}to{transform:rotateX(var(--tilt)) translateY(var(--run))}}
/* גרסת משבצות: שני גוונים שחוזרים כל שני תאים, וההזזה היא שני תאים */
.pf--checker{--run:calc(var(--cell) * 2)}
.pf--checker .pf-plane{background-image:conic-gradient(var(--grid-a) 25%,transparent 0 50%,var(--grid-a) 0 75%,transparent 0);background-size:calc(var(--cell) * 2) calc(var(--cell) * 2)}
.pf-in{position:relative;display:grid;gap:16px;justify-items:start;max-width:min(40ch,100%)}
.pf-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.pf h2{margin:0;font-size:clamp(36px,5vw,72px);line-height:1.06;text-wrap:balance}
.pf-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.pf-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.pf-btn:hover{transform:translateY(-2px)}}
.pf-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.pf-plane{animation:none}}
@media(max-width:767px){
  .pf{min-height:640px;--fh:200px;padding-bottom:calc(var(--fh) + var(--sun) * .5 + 24px)}
  .pf-sun{inset-inline:0;margin-inline:auto;bottom:calc(var(--sun) * -.5)}
  .pf-in{max-width:100%}
}`,
  html:`<div class="stage"><section class="pf">
  <div class="pf-sky" aria-hidden="true"><span class="pf-sun"></span></div>
  <div class="pf-floor" aria-hidden="true"><span class="pf-plane"></span></div>
  <div class="pf-in">
    <p class="pf-k">ארקייד ובר בפלורנטין</p>
    <h2>מכונות מקוריות משנות השמונים והתשעים</h2>
    <p class="pf-lead">שלושים משחקים שעובדים בז׳יטונים, בירה מהחבית ושולחנות לקבוצות של עד עשרים איש. פתוח כל ערב מחמש אחר הצהריים.</p>
    <a class="pf-btn" href="#">להזמנת שולחן</a>
  </div>
</section></div>`
}
,
{
  id:"g270", cat:"gsap", name:"שבבים שעולים מלמטה ונערמים לערימה", tech:"GSAP · ScrollTrigger · stagger", status:"מאושר-עין",
  desc:"שבבים קטנים בגוונים שונים עולים מהקצה התחתון של הכרטיס בגלים, ומתיישבים בשורות רופפות שחופפות זו לזו. כל גל מוסיף שורה, הערימה גדלה, והמספר שמעליה עולה יחד איתה עד הסך הכול. בסוף נשארת ערימה אחת שמראה כמה דברים יש בפנים.",
  when:"סקשן יכולות או שירותים עם הרבה פריטים קצרים: עשרים עד שלושים סוגי עבודות, כלים, טכנולוגיות, תחומי התמחות. הערימה מראה את הכמות, והרשימה נשארת טקסט אמיתי שאפשר לקרוא. לא עם שלושה פריטים, ולא כשכל פריט צריך הסבר.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם שבבים או כרטיסים קטנים עולים בגלים מתחתית המסך ומצטברים לערימה. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** ארבע שורות (`.hp-row`) בצורת פירמידה, 9, 7, 5 ו-3 שבבים, ולכל שבב סיבוב והזזה קלים במאפייני `rotate` ו-`translate` של CSS לפי `nth-child`, כך שהערימה נראית רופפת בלי לחשב מיקומים. בלי GSAP ובהפחתת תנועה זה מה שרואים. **זו רשימה אמיתית:** הפריטים הם `li` בתוך `ul`, ולכן קורא מסך שומע את כל התחומים, והמספר הרץ מוסתר ומוחלף בטקסט נסתר. **כשהמהלך רץ** timeline אחד מעלה את השורות מהתחתונה כלפי מעלה: כל שבב עולה מתחת לקצה הכרטיס (`overflow:hidden` חותך אותו), מסתובב ומתיישב ב-`power3.out`, והמספר סופר מאפס ל-24 לאורך כל ה-timeline באותו קצב. ה-timeline מתחיל כשהכרטיס מגיע ל-65% מהמסך ומתאפס כשחוזרים מעליו, כך שאפשר לראות אותו שוב. לקצב גלילה מוסיפים `scrub` ל-`ScrollTrigger` ונעצים את הכרטיס. **ארבע שורות במקום פיזיקה:** מיקום קבוע קורא טוב יותר ועולה פחות ממנוע פיזיקה כמו matter.js. ערימה שנופלת באמת צריכה קנבס. **צבעים:** שלושה גוונים מטוקני העור (`accent`, גוון בהיר שלו ו-`bg`), ובפרויקט מחלקים אותם לפי קטגוריה אמיתית. **גדלים:** כל שבב הוא `padding` ו-`font-size` בלבד, ולכן שורה ארוכה נשברת לשתיים בטלפון והערימה פשוט נעשית גבוהה יותר. **כיווניות:** סדר השבבים בשורה נקבע לפי כיוון הדף, ואין מה להחליף באתר LTR.",
  libs:["gsap","ScrollTrigger"],
  css:`.hp{max-width:980px;margin-inline:auto;position:relative;overflow:hidden;border-radius:28px;background:var(--card);display:grid;gap:clamp(24px,4vw,48px);
  padding:clamp(24px,4vw,56px) clamp(16px,3vw,40px) clamp(24px,3vw,40px)}
.hp-top{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:clamp(24px,5vw,64px)}
.hp h2{margin:0;font-size:clamp(28px,3.2vw,46px);line-height:1.12;text-wrap:balance}
.hp-lead{margin:12px 0 0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hp-count{margin:0;display:flex;align-items:baseline;gap:12px;font-size:16px;font-weight:600;color:var(--muted)}
.hp-count b{min-width:2ch;text-align:end;font-size:clamp(64px,8vw,120px);line-height:.9;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--ink)}
.hp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hp-heap{display:grid;align-content:end;justify-items:center;min-height:clamp(220px,26vw,300px)}
.hp-row{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
.hp-row + .hp-row{margin-top:-6px}
.hp-c{display:inline-flex;align-items:center;padding:10px 18px;border-radius:999px;font-size:16px;font-weight:600;white-space:nowrap;rotate:var(--r,0deg);translate:0 var(--dy,0px);
  box-shadow:0 8px 16px -12px color-mix(in oklab,var(--ink) 55%,transparent)}
.hp-c:nth-child(4n+1){--r:-5deg;--dy:3px}
.hp-c:nth-child(4n+2){--r:4deg;--dy:-3px}
.hp-c:nth-child(4n+3){--r:-2deg;--dy:5px}
.hp-c:nth-child(4n){--r:6deg;--dy:0px}
.hp-c.t1{background:var(--accent);color:var(--accent-ink)}
.hp-c.t2{background:color-mix(in oklab,var(--accent) 16%,var(--bg));color:var(--ink)}
.hp-c.t3{background:var(--bg);color:var(--ink)}
@media(max-width:767px){
  .hp-top{grid-template-columns:minmax(0,1fr);align-items:start}
  .hp-c{padding:8px 14px;font-size:14px}
}`,
  html:`<div class="stage"><section class="hp">
  <div class="hp-top">
    <div>
      <h2>כל עבודות השיפוץ מאותו צוות</h2>
      <p class="hp-lead">אנחנו מבצעים את כולן בעצמנו, בלי קבלני משנה, כך שמי שמתחיל את הפרויקט גם מסיים אותו.</p>
    </div>
    <p class="hp-count"><b aria-hidden="true">24</b><span class="sr-only">24 </span>סוגי עבודות</p>
  </div>
  <div class="hp-heap" role="group" aria-label="סוגי העבודות שאנחנו מבצעים">
    <ul class="hp-row"><li class="hp-c t2">חיבור לגז</li><li class="hp-c t3">אינטרקום</li><li class="hp-c t1">בית חכם</li></ul>
    <ul class="hp-row"><li class="hp-c t3">מעקות</li><li class="hp-c t1">פרגולות</li><li class="hp-c t2">מדרגות</li><li class="hp-c t3">ארונות קיר</li><li class="hp-c t2">נגרות מטבח</li></ul>
    <ul class="hp-row"><li class="hp-c t2">שיפוץ מטבח</li><li class="hp-c t3">שיפוץ אמבטיה</li><li class="hp-c t1">פרקט</li><li class="hp-c t3">דלתות פנים</li><li class="hp-c t2">תריסים</li><li class="hp-c t3">תאורה</li><li class="hp-c t2">פירוק ופינוי</li></ul>
    <ul class="hp-row"><li class="hp-c t1">חשמל</li><li class="hp-c t3">אינסטלציה</li><li class="hp-c t2">ריצוף</li><li class="hp-c t3">צבע</li><li class="hp-c t1">גבס</li><li class="hp-c t2">נגרות</li><li class="hp-c t3">איטום</li><li class="hp-c t2">מיזוג</li><li class="hp-c t3">אלומיניום</li></ul>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הערימה והמספר כבר במצב הסופי (במארקאפ)
  const root=document.querySelector(".hp"),num=root.querySelector(".hp-count b");
  const total=parseInt(num.textContent,10)||0;
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const rows=[...root.querySelectorAll(".hp-row")].reverse();      // התחתונה עולה ראשונה
    const o={n:0},draw=()=>{num.textContent=Math.round(o.n);};
    const tl=gsap.timeline({paused:true});
    rows.forEach((row,wi)=>{
      tl.fromTo(row.children,{y:340,autoAlpha:0,rotation:()=>gsap.utils.random(-28,28)},
        {y:0,autoAlpha:1,rotation:0,duration:.9,ease:"power3.out",stagger:{each:.05,from:"random"}},wi*.5);
    });
    tl.fromTo(o,{n:0},{n:total,duration:tl.duration(),ease:"none",onUpdate:draw,immediateRender:false},0);
    draw();
    // הגלים מתחילים כשהכרטיס מגיע ל-65% מהמסך, ומתאפסים כשחוזרים מעליו. טעינה אחרי הכרטיס (שחזור גלילה) מציגה את הערימה גמורה
    ScrollTrigger.create({trigger:root,start:"top 65%",onEnter:()=>tl.play(),onLeaveBack:()=>{tl.pause(0);draw();},
      onRefresh:s=>{if(s.progress>=1&&tl.progress()<1){tl.progress(1);draw();}}});
    return()=>{num.textContent=total;gsap.set(root.querySelectorAll(".hp-c"),{clearProps:"all"});};
  });
})();`
}
,
{
  id:"b102", cat:"behavior", name:"גצים שעולים מקו זוהר בתחתית הסקשן", tech:"Canvas 2D · IntersectionObserver · glow flicker", status:"מאושר-עין",
  desc:"קו זוהר רך לאורך התחתית ושני מוקדי אש בצדדים. מהם עולים גצים קטנים שמתנדנדים ודועכים בדרך למעלה, ובבסיס כל מוקד לשונות חם קצרות. הזוהר מהבהב לאט ובעדינות. לחיצה על הסקשן מוציאה חבורת גצים נוספת מנקודת הלחיצה ומגבירה את הזוהר לרגע.",
  when:"תחתית של הירו או סקשן סיום לעסק שהחום הוא חלק ממנו: גריל, תנור אבן, מעשנה, חדר כושר, אירוע ערב. הכותרת יושבת למעלה והאש מלמטה. לא מתחת לטקסט ארוך, ולא לעסק רגוע ושקט שבו תנועה חמה תיראה זרה.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו גצים ולהבות עולים מקו אדמה זוהר בשני מוקדי אש, והסצנה מוארת בצבע חם. נבנה מאפס מהצפייה. **ללא JS ובהפחתת תנועה:** בסיס סטטי ב-CSS, זוהר רך בתחתית, שני מוקדים וכמה נקודות גצים. בהפחתת תנועה הקנבס מצייר פריים אחד בלי לולאה. **הבסיס והקנבס מתחלפים בהצלבה** כשהסקשן נחשף (אותו דפוס כמו b78), כך שגם דפדפן בלי קנבס מציג תמונה גמורה. **החלקיקים:** שני סוגים מ-sprite אחד שמצויר מראש (גרדיאנט רדיאלי: ליבה בהירה, הילה בצבע `--accent` שנקרא מהטוקנים בזמן ריצה): גצים קטנים וארוכי חיים שעולים מכל הקו, בצפיפות גבוהה יותר ליד המוקדים, ולשונות גדולות וקצרות שנולדות רק במוקדים. לכל חלקיק מהירות עלייה, נדנוד סינוס ודעיכה. **קל:** עד 90 גצים ו-14 לשונות בדסקטופ ו-40 ו-8 בטלפון, `drawImage` של sprite במקום צל או גרדיאנט בכל חלקיק, DPR עד 2, והלולאה רצה רק כשהסקשן על המסך והלשונית פעילה. **ההבהוב:** הזוהר והמוקדים משנים `opacity` ו-`scaleY` בסכום של שלושה סינוסים איטיים, עד כ-2 הרץ ובמשרעת קטנה, כלומר זוהר רך ולא הבזק. לחיצות נספרות עם הפסקה של 350 מילי-שניות. **הצבע:** כל הגוון מגיע מ-`--accent`, ולכן באתר עם מותג כחול האש כחולה. **משטח כהה:** הסקשן בצבע `--ink` והטקסט ב-`--bg`, כי גצים זוהרים נראים על רקע כהה. בעור כהה `--ink` בהיר והמשטח מתהפך, ואז הגצים נראים חלשים יותר ומקבעים למשטח צבע כהה. ההרכבה רגילה ולא `lighter`, כדי שהגצים יישארו ברורים גם אז. **כיווניות:** התנועה אנכית, ואין מה להחליף באתר LTR. **נגישות:** כל השכבות `aria-hidden` ובלי `pointer-events`, והכותרת היא הטקסט היחיד.",
  libs:[],
  css:`.em{position:relative;isolation:isolate;overflow:hidden;min-height:clamp(520px,80vh,720px);display:grid;align-items:start;border-radius:28px;color:var(--bg);
  padding:clamp(64px,8vw,96px) var(--gutter) clamp(112px,16vw,192px);
  background:linear-gradient(to top,color-mix(in oklab,var(--accent) 34%,var(--ink)),var(--ink) 78%)}
.em-art{position:absolute;inset:0;z-index:0;pointer-events:none}
.em-glow{position:absolute;inset:auto 0 0 0;height:46%;background:radial-gradient(ellipse 76% 100% at 50% 100%,color-mix(in oklab,var(--accent) 62%,transparent),transparent 74%)}
.em-glow::after{content:"";position:absolute;inset:auto 6% 0 6%;height:3px;border-radius:3px;background:linear-gradient(90deg,transparent,var(--accent) 16%,var(--accent) 84%,transparent);box-shadow:0 0 28px 8px color-mix(in oklab,var(--accent) 60%,transparent)}
.em-bz{position:absolute;bottom:0;width:clamp(200px,28vw,380px);aspect-ratio:2.6/1;transform-origin:50% 100%;background:radial-gradient(ellipse 80% 100% at 50% 100%,color-mix(in oklab,var(--accent) 78%,transparent),transparent 72%)}
.em-bz1{inset-inline-start:2%}
.em-bz2{inset-inline-end:2%}
/* נקודות גצים סטטיות: מה שרואים בלי JS ובהפחתת תנועה, עד שהקנבס נחשף */
.em-d{position:absolute;left:var(--x);bottom:var(--y);width:var(--s);aspect-ratio:1;border-radius:50%;background:color-mix(in oklab,var(--accent) 40%,var(--bg));opacity:.85;
  box-shadow:0 0 10px 3px color-mix(in oklab,var(--accent) 70%,transparent);transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.em-cv{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.em-art.is-on .em-cv{opacity:1}
.em-art.is-on .em-d{opacity:0}
.em-in{position:relative;z-index:1;display:grid;gap:16px;justify-items:start;max-width:40ch}
.em-in::before{content:"";position:absolute;inset:-40px -56px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--ink) 82%,transparent) 55%,transparent)}
.em-k{margin:0;font-size:15px;font-weight:600;color:color-mix(in oklab,var(--bg) 70%,var(--ink))}
.em h2{margin:0;font-size:clamp(34px,4.8vw,68px);line-height:1.08;text-wrap:balance;color:var(--bg)}
.em-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:color-mix(in oklab,var(--bg) 78%,var(--ink))}
.em-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.em-btn:hover{transform:translateY(-2px)}}
.em-btn:focus-visible{outline:2px solid var(--bg);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.em-cv,.em-d{transition:none}}
@media(max-width:767px){.em{min-height:560px}.em-in::before{inset:-32px -24px}}`,
  html:`<div class="stage"><section class="em">
  <div class="em-art" aria-hidden="true">
    <div class="em-glow"></div>
    <span class="em-bz em-bz1"></span><span class="em-bz em-bz2"></span>
    <i class="em-d" style="--x:12%;--y:22%;--s:3px"></i><i class="em-d" style="--x:18%;--y:41%;--s:2px"></i><i class="em-d" style="--x:27%;--y:30%;--s:4px"></i><i class="em-d" style="--x:35%;--y:12%;--s:3px"></i>
    <i class="em-d" style="--x:44%;--y:36%;--s:2px"></i><i class="em-d" style="--x:52%;--y:20%;--s:3px"></i><i class="em-d" style="--x:61%;--y:46%;--s:2px"></i><i class="em-d" style="--x:69%;--y:26%;--s:4px"></i>
    <i class="em-d" style="--x:77%;--y:14%;--s:3px"></i><i class="em-d" style="--x:84%;--y:38%;--s:2px"></i><i class="em-d" style="--x:91%;--y:24%;--s:3px"></i><i class="em-d" style="--x:8%;--y:52%;--s:2px"></i>
    <canvas class="em-cv"></canvas>
  </div>
  <div class="em-in">
    <p class="em-k">גריל על אש פתוחה בנמל יפו</p>
    <h2>בשר ודגים על פחמים, כל ערב עד חצות</h2>
    <p class="em-lead">הפחמים נדלקים בארבע אחר הצהריים והמטבח עובד עליהם עד הסוף. בסופי שבוע מומלץ להזמין שולחן מראש.</p>
    <a class="em-btn" href="#">להזמנת שולחן</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".em"),art=root.querySelector(".em-art"),cv=art.querySelector(".em-cv"),ctx=cv.getContext("2d");
  const glow=art.querySelector(".em-glow"),bz=[].slice.call(art.querySelectorAll(".em-bz"));
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W=0,H=0,EM=[],P=[],MAXE=90,MAXF=14,SC=1,spr=null,SPR=64,running=false,vis=false,raf=0,last=0,T=0,boost=0,boostAt=0,ae=0,af=0;
  // הצבע נקרא מהטוקן בזמן ריצה, ו-sprite אחד מצויר מראש: גרדיאנט רדיאלי שמהווה גם גץ וגם לשון אש
  const pcv=document.createElement("canvas");pcv.width=pcv.height=1;const probe=pcv.getContext("2d",{willReadFrequently:true});
  const rgb=c=>{probe.clearRect(0,0,1,1);probe.fillStyle=c;probe.fillRect(0,0,1,1);const d=probe.getImageData(0,0,1,1).data;return[d[0],d[1],d[2]];};
  function sprite(){
    const cs=getComputedStyle(root),a=rgb(cs.getPropertyValue("--accent").trim()||cs.color),c=document.createElement("canvas");
    c.width=c.height=SPR;const g=c.getContext("2d"),gr=g.createRadialGradient(SPR/2,SPR/2,0,SPR/2,SPR/2,SPR/2),col="rgba("+a.join(",")+",",hi="rgba("+a.map(v=>Math.round(v+(255-v)*.72)).join(",")+",";
    gr.addColorStop(0,hi+"1)");gr.addColorStop(.16,hi+".92)");gr.addColorStop(.4,col+".62)");gr.addColorStop(1,col+"0)");g.fillStyle=gr;g.fillRect(0,0,SPR,SPR);spr=c;
  }
  const R=(a,b)=>a+Math.random()*(b-a);
  function ember(x,y,burst){
    const near=EM.length&&Math.random()<.55,ex=near?EM[Math.random()<.5?0:EM.length-1]:null;
    return{k:0,x:x!=null?x:(ex?ex+R(-.06,.06)*W:R(.06,.94)*W),y:y!=null?y:H-R(0,6),
      vx:burst?R(-70,70):R(-12,12),vy:-(burst?R(60,190):R(40,120)),s:R(2.2,4.8)*SC*(burst?1.1:1),age:0,life:R(2.2,5),wob:R(0,6.28),wf:R(1,2.4),wa:R(6,22)};
  }
  function flame(){
    const ex=EM[Math.random()<.5?0:EM.length-1]||W/2;
    return{k:1,x:ex+R(-.02,.02)*W,y:H-R(0,10),vx:R(-10,10),vy:-R(70,150),s:R(26,52)*SC,age:0,life:R(.5,.95),wob:R(0,6.28),wf:R(2,4),wa:R(4,12)};
  }
  function step(dt){
    T+=dt;
    ae+=dt*(MAXE/3.4);af+=dt*(MAXF/.72);
    let ne=0,nf=0;for(let i=0;i<P.length;i++){if(P[i].k)nf++;else ne++;}
    while(ae>=1){ae--;if(ne<MAXE){P.push(ember());ne++;}}
    while(af>=1){af--;if(nf<MAXF){P.push(flame());nf++;}}
    for(let i=P.length-1;i>=0;i--){
      const p=P[i];p.age+=dt;
      if(p.age>=p.life){P.splice(i,1);continue;}
      p.x+=(p.vx+Math.sin(p.wob+p.age*p.wf)*p.wa)*dt;p.y+=p.vy*dt;
    }
    if(boost>0)boost=Math.max(0,boost-dt*2.2);
  }
  function paint(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<P.length;i++){
      const p=P[i],t=p.age/p.life;let a,s;
      if(p.k){a=(1-t)*.5;s=p.s*(1-.35*t);}else{a=Math.min(1,t*8)*Math.pow(1-t,1.2)*.95;s=p.s*6*(1-.4*t);}
      ctx.globalAlpha=a;ctx.drawImage(spr,p.x-s/2,p.y-s/2,s,s);
    }
    ctx.globalAlpha=1;
    // הזוהר והמוקדים: סכום של שלושה סינוסים איטיים, כלומר הבהוב רך עד כ-2 הרץ ולא הבזק
    const g=.8+.1*Math.sin(T*5.3)+.06*Math.sin(T*9.1+1.7)+.04*Math.sin(T*12.6)+boost*.25;
    glow.style.opacity=Math.min(1,g);
    bz.forEach((b,i)=>{const f=.82+.12*Math.sin(T*(6+i)+i*2)+.06*Math.sin(T*(11+i*2)+1);b.style.opacity=Math.min(1,f+boost*.2);b.style.transform="scaleY("+(.9+.1*Math.sin(T*(7+i)+i))+")";});
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const small=W<600;MAXE=small?40:90;MAXF=small?8:14;SC=small?.8:1;
    EM=bz.map(b=>{const q=b.getBoundingClientRect();return q.left-r.left+q.width/2;});
    sprite();P=[];for(let i=0;i<150;i++)step(.02);paint();     // חימום: הפריים הראשון כבר מלא בגצים
  }
  function loop(now){
    const dt=Math.min(.05,(now-last)/1000);last=now;
    step(dt);paint();raf=running?requestAnimationFrame(loop):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf){last=performance.now();raf=requestAnimationFrame(loop);}}
  // לחיצה: חבורת גצים מנקודת הלחיצה והגברת זוהר לרגע, עם הפסקה כדי שלא יהיו הבזקים רצופים
  root.addEventListener("pointerdown",e=>{
    const n=performance.now();if(reduced||n-boostAt<350||!W)return;boostAt=n;boost=1;
    const r=art.getBoundingClientRect(),x=e.clientX-r.left,y=Math.min(H-4,Math.max(0,e.clientY-r.top));
    for(let i=0;i<(W<600?14:26);i++)P.push(ember(x,y,true));
  });
  document.addEventListener("visibilitychange",sync);
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)art.classList.add("is-on");sync();},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");     // פריים אחד, בלי לולאה
  build();
})();`
}
,
{
  id:"g271", cat:"gsap", name:"דמות שמציצה מקצה המסך ומחליפה צד בכל סקשן", tech:"GSAP · ScrollTrigger · sticky overlay · mask", status:"ממתין",
  desc:"דמות עם קו מתאר צבעוני מציצה מתחתית המסך ועומדת בפינה. כשסקשן חדש מגיע לאמצע המסך היא יורדת, עוברת לצד השני ועולה שוב, ומעליה בועת דיבור קצרה בגוף ראשון שמתאימה לסקשן. בין הסקשנים היא נעה מעט, לפני הסקשן הראשון ואחרי האחרון היא מסתתרת. השכבה לא חוסמת לחיצות והטקסט נשאר תוכן רגיל.",
  when:"עמוד תהליך, אודות או שירות עם שלושה עד חמישה סקשנים, כל אחד בגובה של כשבעים אחוז מהמסך עם טקסט בצד אחד ותמונה בצד השני, ודמות אחת שמייצגת את העסק: בעלת הסטודיו, המאמן, הרופאה. הדמות מלווה את הקורא לאורך העמוד ומדברת בגוף ראשון. לא בעמוד קצר, לא עם אנשים שאינם חלק מהמותג, ולא כשהטקסט בסקשן מגיע עד הקצה התחתון שלו.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו דמות מציצה מקצה המסך בכל סקשן ומתחלפת בין הצדדים, לפעמים עם בועת דיבור. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** סקשנים של כותרת ופסקה עם תמונה אמיתית מהמאגר בצד הנגדי לטקסט (`.pk-ph`, גובה קבוע וחיתוך `object-fit`), והשכבה של הדמות מוסתרת (`display:none`). בלי GSAP ובהפחתת תנועה זה מה שרואים, וכל המידע נשאר בטקסט. **כשהמהלך רץ** הסקריפט מוסיף `is-live` על העוטף והשכבה נעשית `position:sticky` בגובה המסך, עם `margin-bottom` שלילי באותו גובה כדי שלא תוסיף גובה לעמוד (העוטף חותך עם `overflow:clip`, כדי שה-sticky ימשיך לעבוד). **ScrollTrigger לכל סקשן:** בדסקטופ מ-`top 75%` עד `bottom 75%`, כדי שהדמות תתחלף לפני שהטקסט של הסקשן הבא מגיע לגובה שלה, ובטלפון מ-50% עד 50%, כך שתמיד סקשן אחד בדיוק פעיל. פונקציה אחת, `show(i)`, הורגת את המעבר הקודם ובונה חדש: הדמות יורדת (`yPercent`), הצד והטקסט מוחלפים בזמן שהיא מוסתרת, והיא עולה ל-`yPercent:38` כדי שרק הראש והכתפיים יבצבצו, ואחריה הבועה נפתחת. על הדמות יש תנועת ציפה איטית (`sine.inOut`) שנעצרת כשהיא מוסתרת. **הצד נקבע לפי הכיווניות:** הסקריפט קורא את `direction` של העוטף ובוחר צד פיזי (`data-pos`), והטקסט בסקשנים מתחלף לפי `justify-self` לוגי, כך שהדמות תמיד בצד שמנגד לטקסט. באתר LTR אין מה להחליף, רק לוודא שהסקשן הראשון משאיר את הצד הנגדי פנוי. **הדמות:** התמונה האמיתית מהמאגר, ולה אין גזרה על רקע שקוף, ולכן נחתכת במסכת SVG שנמדדה על התמונה (אותה מסכה כמו ב-g199). קו המדבקה הוא ארבעה `drop-shadow` בצבע `--accent` על המעטפת ולא על התמונה, כי הדפדפן מריץ `filter` לפני `mask`. בפרויקט אמיתי מחליפים בתמונה חתוכה על רקע שקוף (PNG או WebP) ומוחקים את המסכה. **בחירת תמונה:** חצי גוף ופנים ישר למצלמה, כך שהדמות נראית כמי שמציצה פנימה. **בועה בצבע `--ink`:** כך היא נראית גם על סקשן בגוון `--card`. **התמונה והדמות:** הדמות יושבת בצד התמונה ומציצה מעליה, ולכן הפינה החיצונית התחתונה של התמונה מוסתרת חלקית; לא שמים שם פרט חשוב. **מובייל:** העמודות הופכות לעמודה אחת עם התמונה מתחת לטקסט, הדמות קטנה יותר והבועה נשארת בתחתית המסך, מעל התמונה ורחוק מהטקסט הפעיל. **נגישות:** הדמות והבועה `aria-hidden`, והטקסט של הבועה נשמר בסקשן כ-`data-say` ולא מוסיף מידע שאין בגוף העמוד.",
  libs:["gsap","ScrollTrigger"],
  css:`.pk{position:relative;overflow:clip}
.pk-s{position:relative;min-height:clamp(400px,70vh,640px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,5vw,64px);align-items:center;padding:clamp(40px,6vw,72px) var(--gutter)}
.pk-s:nth-of-type(even){background:var(--card)}
.pk-in{display:grid;gap:16px;max-width:40ch;justify-self:start}
.pk-s:nth-of-type(even) .pk-in{order:2;justify-self:end}
.pk-ph{margin:0;border-radius:24px;overflow:hidden}
.pk-ph img{display:block;width:100%;height:clamp(260px,46vh,480px);object-fit:cover}
.pk-in h2{margin:0;font-size:clamp(28px,3.4vw,52px);line-height:1.12;text-wrap:balance}
.pk-in p{margin:0;font-size:var(--fs-body);line-height:1.65;color:var(--muted)}
.pk-layer{display:none}
.pk.is-live .pk-layer{display:block;position:sticky;top:0;height:100vh;height:100svh;margin-bottom:-100vh;margin-bottom:-100svh;z-index:3;overflow:hidden;pointer-events:none}
.pk-peek{--w:clamp(300px,30vw,460px);position:absolute;bottom:0;width:var(--w);will-change:transform}
.pk-layer[data-pos="l"] .pk-peek{left:calc(var(--w) * -.12)}
.pk-layer[data-pos="r"] .pk-peek{right:calc(var(--w) * -.12)}
.pk-fig{transform-origin:50% 100%;filter:drop-shadow(4px 0 0 var(--accent)) drop-shadow(-4px 0 0 var(--accent)) drop-shadow(0 4px 0 var(--accent)) drop-shadow(0 -4px 0 var(--accent))}
.pk-fig img{display:block;width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;-webkit-mask:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22f%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%2290%22%3E%3Cstop%20offset%3D%220%22%20stop-opacity%3D%220%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-opacity%3D%221%22%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%22b%22%20x%3D%22-5%25%22%20y%3D%22-5%25%22%20width%3D%22110%25%22%20height%3D%22110%25%22%3E%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cpath%20filter%3D%22url(%23b)%22%20fill%3D%22%23000%22%20d%3D%22M413%2060A163%2050%200%200%201%20739%2060L738%20100L734%20120L728%20138L722%20150L716%20164L706%20178L700%20190L696%20205L690%20230L682%20255L672%20272L664%20290L663%20310L666%20330L676%20347L690%20362L702%20376L716%20384L770%20402L794%20408L808%20420L842%20430L872%20440L898%20457L914%20480L922%20505L927%20540L931%20590L934%20640L938%20700L940%20830L199%20830L200%20700L201%20620L203%20580L205%20540L208%20505L215%20484L228%20466L246%20451L268%20438L290%20428L314%20423L338%20420L362%20413L386%20402L408%20391L430%20380L445%20370L463%20350L472%20330L477%20310L477%20290L473%20260L463%20230L455%20200L443%20180L429%20160L422%20150L416%20140L412%20120L412%20100Z%22%2F%3E%3C%2Fsvg%3E") center/100% 100% no-repeat;mask:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201200%20800%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22f%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%2290%22%3E%3Cstop%20offset%3D%220%22%20stop-opacity%3D%220%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-opacity%3D%221%22%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%22b%22%20x%3D%22-5%25%22%20y%3D%22-5%25%22%20width%3D%22110%25%22%20height%3D%22110%25%22%3E%3CfeGaussianBlur%20stdDeviation%3D%222.5%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cpath%20filter%3D%22url(%23b)%22%20fill%3D%22%23000%22%20d%3D%22M413%2060A163%2050%200%200%201%20739%2060L738%20100L734%20120L728%20138L722%20150L716%20164L706%20178L700%20190L696%20205L690%20230L682%20255L672%20272L664%20290L663%20310L666%20330L676%20347L690%20362L702%20376L716%20384L770%20402L794%20408L808%20420L842%20430L872%20440L898%20457L914%20480L922%20505L927%20540L931%20590L934%20640L938%20700L940%20830L199%20830L200%20700L201%20620L203%20580L205%20540L208%20505L215%20484L228%20466L246%20451L268%20438L290%20428L314%20423L338%20420L362%20413L386%20402L408%20391L430%20380L445%20370L463%20350L472%20330L477%20310L477%20290L473%20260L463%20230L455%20200L443%20180L429%20160L422%20150L416%20140L412%20120L412%20100Z%22%2F%3E%3C%2Fsvg%3E") center/100% 100% no-repeat}
.pk-bub{position:absolute;top:calc(var(--w) * .04);margin:0;width:max-content;max-width:min(236px,60vw);padding:14px 18px;border-radius:20px;background:var(--ink);color:var(--bg);font-size:17px;line-height:1.45;font-weight:600;
  box-shadow:0 12px 28px -16px color-mix(in oklab,var(--ink) 60%,transparent)}
.pk-bub::after{content:"";position:absolute;bottom:14px;width:14px;height:14px;background:inherit;transform:rotate(45deg)}
.pk-layer[data-pos="l"] .pk-bub{left:66%;transform-origin:0 100%}
.pk-layer[data-pos="l"] .pk-bub::after{left:-6px}
.pk-layer[data-pos="r"] .pk-bub{right:70%;transform-origin:100% 100%}
.pk-layer[data-pos="r"] .pk-bub::after{right:-6px}
@media(max-width:767px){
  .pk-s{min-height:0;grid-template-columns:minmax(0,1fr);align-content:start;padding-block:48px}
  .pk-in{max-width:none;justify-self:stretch}
  .pk-s:nth-of-type(even) .pk-in{order:0;justify-self:stretch}
  .pk-ph img{height:clamp(200px,56vw,280px)}
  .pk-peek{--w:clamp(280px,76vw,320px)}
  .pk-bub{max-width:176px;padding:10px 14px;font-size:15px;border-radius:16px}
}`,
  html:`<div class="stage full"><div class="pk">
  <div class="pk-layer" aria-hidden="true">
    <div class="pk-peek">
      <div class="pk-fig"><img src="../assets/media/dive/portrait.webp" alt="" width="2400" height="1600" loading="lazy" decoding="async"></div>
      <p class="pk-bub"><span>אני מודדת כל חדר בעצמי, גם את הפינות.</span></p>
    </div>
  </div>
  <section class="pk-s" data-say="אני מודדת כל חדר בעצמי, גם את הפינות.">
    <div class="pk-in"><h2>מודדים את הדירה לפני כל תכנון</h2><p>אנחנו מגיעים עם מד לייזר ומודדים כל חדר, כולל גובה התקרה והפינות, כדי שהתכנון יתאים למה שיש שם באמת.</p></div>
    <figure class="pk-ph"><img src="../assets/media/real/s13/room.webp" alt="פינת ישיבה עם מנורת רצפה, כורסה וכוננית מוארת" width="2200" height="1469" loading="lazy" decoding="async"></figure>
  </section>
  <section class="pk-s" data-say="תקבלו שלוש אפשרויות ותבחרו אחת.">
    <div class="pk-in"><h2>מקבלים שלוש אפשרויות לתכנון</h2><p>לכל חדר אנחנו מכינים שלוש חלופות עם הדמיות. אתם בוחרים אחת, ואפשר לשלב חלקים מכמה חלופות.</p></div>
    <figure class="pk-ph"><img src="../assets/media/real/s13/proj-a.webp" alt="סלון בגוונים כהים עם חלון גדול ושלוש מנורות תלויות" width="1800" height="1200" loading="lazy" decoding="async"></figure>
  </section>
  <section class="pk-s" data-say="אני עוברת באתר פעם בשבוע ומצלמת.">
    <div class="pk-in"><h2>ביקור באתר אחת לשבוע</h2><p>בזמן העבודה אנחנו נמצאים בדירה פעם בשבוע, בודקים מול התוכנית ושולחים לכם תמונות מהשטח.</p></div>
    <figure class="pk-ph"><img src="../assets/media/real/s13/proj-b.webp" alt="פינת חדר רחצה עם מראה עגולה, אגרטל ומשטח שיש שחור" width="1200" height="1600" loading="lazy" decoding="async"></figure>
  </section>
  <section class="pk-s" data-say="ביום המסירה נעבור על הכול יחד.">
    <div class="pk-in"><h2>מסירה שאפשר לגור בה מיד</h2><p>ביום המסירה עוברים יחד על כל חדר, רושמים הערות ומסיימים אותן לפני שאתם נכנסים.</p></div>
    <figure class="pk-ph"><img src="../assets/media/real/s13/proj-c.webp" alt="מטבח גמור עם ארונות אפורים, אי ושלוש מנורות תלויות" width="2400" height="1026" loading="lazy" decoding="async"></figure>
  </section>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP השכבה נשארת מוסתרת והטקסט שלם
  const root=document.querySelector(".pk"),layer=root.querySelector(".pk-layer"),peek=layer.querySelector(".pk-peek"),
    fig=peek.querySelector(".pk-fig"),bub=peek.querySelector(".pk-bub"),say=bub.querySelector("span"),secs=[].slice.call(root.querySelectorAll(".pk-s"));
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const HIDE=112,REST=38,rtl=getComputedStyle(root).direction==="rtl";
    let cur=-2,tl=null;const mob=()=>innerWidth<768;      // בדסקטופ הדמות מתחלפת כשהסקשן הבא עוד בתחתית, לפני שהטקסט שלו הגיע; בטלפון הטקסט רחב ולכן מחכים לאמצע
    layer.dataset.pos=rtl?"l":"r";
    root.classList.add("is-live");
    gsap.set(peek,{yPercent:HIDE});gsap.set(bub,{autoAlpha:0});
    const bob=gsap.to(fig,{y:-5,duration:1.7,ease:"sine.inOut",yoyo:true,repeat:-1,paused:true});
    // הצד תמיד מנגד לטקסט: סקשן זוגי (0, 2) טקסט בהתחלה ודמות בסוף, ובכיוון RTL הסוף הוא שמאל
    function place(i){
      const end=i%2===0,left=end===rtl;
      layer.dataset.pos=left?"l":"r";
      say.textContent=secs[i].getAttribute("data-say")||"";
      gsap.set(fig,{rotation:left?3:-3});
    }
    // פונקציה אחת לכל החילופים: הורגת את המעבר הקודם, יורדת אם צריך, מחליפה צד וטקסט, עולה
    function show(i){
      if(i===cur)return;cur=i;
      if(tl)tl.kill();
      tl=gsap.timeline();
      const y=gsap.getProperty(peek,"yPercent");
      if(y<HIDE-1){
        tl.to(bub,{autoAlpha:0,scale:.85,duration:.18,ease:"power1.in"},0)
          .to(peek,{yPercent:HIDE,duration:.2+.3*(HIDE-y)/(HIDE-REST),ease:"power2.in"},0);
      }
      if(i<0){tl.add(()=>bob.pause());return;}
      tl.add(()=>{place(i);bob.play();})
        .fromTo(peek,{yPercent:HIDE},{yPercent:REST,duration:.75,ease:"power3.out"})
        .fromTo(bub,{autoAlpha:0,scale:.8},{autoAlpha:1,scale:1,duration:.4,ease:"power2.out"},"-=.3");
    }
    secs.forEach((s,i)=>{
      ScrollTrigger.create({trigger:s,start:()=>mob()?"top 50%":"top 75%",end:()=>mob()?"bottom 50%":"bottom 75%",invalidateOnRefresh:true,
        onEnter:()=>show(i),onEnterBack:()=>show(i),
        onLeave:()=>{if(i===secs.length-1)show(-1);},
        onLeaveBack:()=>{if(i===0)show(-1);}});
    });
    return()=>{
      if(tl)tl.kill();
      root.classList.remove("is-live");layer.removeAttribute("data-pos");
      gsap.set([peek,fig,bub],{clearProps:"all"});
    };
  });
})();`
}
,
{
  id:"g272", cat:"gsap", name:"סליל דו-גדילי עם קו סריקה שצובע אותו", tech:"GSAP · SVG · ticker · clipPath", status:"מאושר-עין",
  desc:"סליל דו-גדילי מצויר לרוחב הכרטיס: שני גדילים גליים, שלבים שמחברים ביניהם ונקודות שבחזית ובעומק. הגל נע לאט לצד אחד, וקו סריקה דק עובר על פני הסליל לאט ומשאיר מאחוריו את הצבע של המותג, כך שהמקטע הסרוק נדלק והשאר נשאר אפור. בסוף כל הסליל דולק, מחכה רגע, כבה, והסריקה חוזרת.",
  when:"עסק שהמוצר שלו הוא בדיקה, סריקה או ניתוח של משהו: מעבדה, בדיקות גנטיות, סורק אבטחה, תוכנת אבחון, ביקורת קוד. הסליל הוא האיור של העסק עצמו והסריקה היא ההבטחה. פעם אחת בעמוד, מתחת לכותרת שמסבירה מה נבדק. לא בעסק שאין לו קשר לגנטיקה או למדע, כי הצורה מזוהה מיד.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו סליל דו-גדילי עובר סריקה והגדילים נצבעים בצבע חם בעקבות קו אנכי. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** סליל סטטי שמחצית ממנו כבר דולקת וקו הסריקה במקומו, כולל כל הנתיבים, כך שבלי GSAP ובהפחתת תנועה רואים איור גמור. **הגיאומטריה בפונקציה אחת**, `helix(W,H,ph,N)`, שמחזירה חמישה נתיבים: שני הגדילים, השלבים, והנקודות שבחזית ובעומק (נקודה היא קטע באורך אפס עם `stroke-linecap:round`). אותה פונקציה בונה את המארקאפ הסטטי בזמן הבנייה ורצה בסקריפט, וכך אין שתי גרסאות להחזיק. **עומק בלי תלת מימד:** הנקודה שבחזית גדולה ובצבע מלא, שבעומק קטנה ועמומה, ובכל שלב נבחר מי בחזית לפי קוסינוס הפאזה. **שני עותקים של אותו איור:** הקבוצה `#dx-g` מוגדרת פעם אחת ב-`defs`, ומוצגת פעמיים עם `use`: האפור כמו שהוא, והצבעוני מעליו, חתוך ב-`clipPath` שהמלבן שלו זז עם קו הסריקה. הצבע מגיע מה-`use` (`stroke` עובר בירושה לתוך העותק), ולכן אין שכפול של הנתיבים בצבעים. **ריצה:** `ResizeObserver` קובע את ה-`viewBox` לפי המידות האמיתיות (כך שעובי הקו הוא פיקסלים אמיתיים), מספר השלבים נגזר מהרוחב (`W/26`), ו-`ticker` יחיד מקדם את הפאזה ומצייר מחדש. הסריקה היא `timeline` עם tween של `p` מ-0 ל-1 ב-`power1.inOut`, השהיה, דעיכה ואיפוס. **קל:** כשהסקשן מחוץ למסך ה-`ticker` וה-timeline מושהים (IntersectionObserver), ומוזזים רק `transform` ו-`d`. **כיווניות:** הסריקה מתחילה מקצה ההתחלה, כלומר מימין ל-RTL ומשמאל ל-LTR, והגל נע לאותו כיוון. הסקריפט קורא את `direction`, ובאתר LTR הסליל הסטטי במארקאפ עדיין מציג מצב סביר. **נגישות:** האיור `aria-hidden` ובלי כיתוב, כי הוא קישוט לכותרת. **מובייל:** יחס 390:220 ושני סיבובים בלבד, כך שהסליל לא נראה שטוח.",
  libs:["gsap"],
  css:`.dx{max-width:1040px;margin-inline:auto;display:grid;gap:clamp(32px,5vw,56px)}
.dx-top{display:grid;gap:16px;justify-items:start;max-width:52ch}
.dx h2{margin:0;font-size:clamp(30px,4vw,56px);line-height:1.1;text-wrap:balance}
.dx-top p{margin:0;font-size:var(--fs-body);line-height:1.65;color:var(--muted)}
.dx-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.dx-btn:hover{transform:translateY(-2px)}}
.dx-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.dx-fig{border-radius:28px;background:var(--card);padding:clamp(16px,3vw,32px);overflow:hidden}
.dx-svg{display:block;width:100%;height:auto;aspect-ratio:1000/320}
.dx-cold{stroke:color-mix(in oklab,var(--ink) 34%,var(--card))}
.dx-hot{stroke:var(--accent)}
.dx-r{stroke-width:1.5;opacity:.55}
.dx-a,.dx-b{stroke-width:3.5}
.dx-nb{stroke-width:7;opacity:.5}
.dx-nf{stroke-width:11}
.dx-glow{stroke:var(--accent);stroke-width:16;opacity:.16}
.dx-scan{stroke:var(--accent);stroke-width:2}
@media(max-width:767px){.dx-svg{aspect-ratio:390/220}.dx-a,.dx-b{stroke-width:3}.dx-nf{stroke-width:9}.dx-nb{stroke-width:6}}`,
  html:`<div class="stage"><section class="dx">
  <div class="dx-top">
    <h2>בדיקת סקר גנטי לזוגות שמתכננים הריון</h2>
    <p>הבדיקה נעשית מדגימת רוק בבית. התוצאות מגיעות בתוך שבועיים, ויועצת גנטית עוברת איתכם עליהן בשיחה.</p>
    <a class="dx-btn" href="#">לקביעת שיחה עם יועצת</a>
  </div>
  <div class="dx-fig">
    <svg class="dx-svg" viewBox="0 0 1000 320" aria-hidden="true" focusable="false">
      <defs>
        <g id="dx-g" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path class="dx-r" d="${HX0.r}"/>
          <path class="dx-nb" d="${HX0.nb}"/>
          <path class="dx-a" d="${HX0.a}"/>
          <path class="dx-b" d="${HX0.b}"/>
          <path class="dx-nf" d="${HX0.nf}"/>
        </g>
        <clipPath id="dx-clip"><rect class="dx-cr" x="0" y="0" width="1000" height="320" transform="translate(380 0)"/></clipPath>
      </defs>
      <use class="dx-cold" href="#dx-g"/>
      <use class="dx-hot" href="#dx-g" clip-path="url(#dx-clip)"/>
      <g class="dx-sc" transform="translate(380 0)">
        <line class="dx-glow" x1="0" x2="0" y1="0" y2="320"/>
        <line class="dx-scan" x1="0" x2="0" y1="0" y2="320"/>
      </g>
    </svg>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הסליל הסטטי מהמארקאפ
  ${helix.toString()}
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const root=document.querySelector(".dx"),svg=root.querySelector(".dx-svg"),rtl=getComputedStyle(root).direction==="rtl";
    const snap=svg.innerHTML,vb=svg.getAttribute("viewBox");
    const q=s=>svg.querySelector(s),pa=q(".dx-a"),pb=q(".dx-b"),pr=q(".dx-r"),pf=q(".dx-nf"),pn=q(".dx-nb"),
      cr=q(".dx-cr"),scg=q(".dx-sc"),hot=q(".dx-hot"),ln=svg.querySelectorAll(".dx-scan,.dx-glow");
    let W=0,H=0,N=0,ph=.6,p=0,vis=false;const sc={p:0};
    function draw(){
      const h=helix(W,H,ph,N),tr="translate("+(rtl?W*(1-p):W*p).toFixed(1)+" 0)";
      pa.setAttribute("d",h.a);pb.setAttribute("d",h.b);pr.setAttribute("d",h.r);pf.setAttribute("d",h.nf);pn.setAttribute("d",h.nb);
      cr.setAttribute("transform",tr);scg.setAttribute("transform",tr);     // המלבן החותך וקו הסריקה זזים באותו ערך
    }
    function size(){
      const r=svg.getBoundingClientRect();if(!r.width)return;
      W=Math.round(r.width);H=Math.round(r.height);N=Math.max(12,Math.round(W/26));
      svg.setAttribute("viewBox","0 0 "+W+" "+H);
      cr.setAttribute("x",rtl?0:-W);cr.setAttribute("width",W);cr.setAttribute("height",H);     // ב-RTL הצבע מימין לקו, ב-LTR משמאל
      ln.forEach(l=>l.setAttribute("y2",H));
      draw();
    }
    // הגל נע לכיוון הסריקה, לאט
    const tick=(t,dt)=>{ph+=dt/1000*.7*(rtl?1:-1);draw();};
    const tl=gsap.timeline({paused:true,repeat:-1});
    tl.fromTo(sc,{p:0},{p:1,duration:4.2,ease:"power1.inOut",onUpdate:()=>{p=sc.p;}})
      .to(ln,{opacity:0,duration:.3,ease:"power1.in"})
      .to(hot,{opacity:0,duration:.8,ease:"power1.in"},"+=1")
      .add(()=>{p=0;sc.p=0;})
      .set(hot,{opacity:1})
      .to(ln,{opacity:1,duration:.3},"+=.3");
    const io=new IntersectionObserver(es=>{
      const on=es[0].isIntersecting;if(on===vis)return;vis=on;
      if(on){gsap.ticker.add(tick);tl.play();}else{gsap.ticker.remove(tick);tl.pause();}
    },{rootMargin:"10% 0px"});
    const ro=new ResizeObserver(size);
    ro.observe(svg);io.observe(root);size();
    return()=>{io.disconnect();ro.disconnect();gsap.ticker.remove(tick);tl.kill();svg.innerHTML=snap;svg.setAttribute("viewBox",vb);};
  });
})();`
}
,
{
  id:"b103", cat:"behavior", name:"כוכבי שביט שמקפצים בין שני פסים ומדליקים אותם", tech:"Canvas 2D · IntersectionObserver · DOM bars", status:"מאושר-עין",
  desc:"שלושה כוכבי שביט עם זנב דועך מקפצים לאורך הכרטיס בין שורת פסים למעלה לשורת פסים למטה, וסוטים מעט לצדדים עד שהם פוגעים בקיר. בכל פגיעה הפס שנגעו בו נדלק לרגע בזוהר רך, נפרשת חבורת גצים קטנה, והכוכב חוזר לכיוון השני. הטקסט במרכז יושב על כיסוי רך שמשאיר אותו קריא.",
  when:"סקשן הירו או סיום לעסק שקשור למשחק, מוזיקה, קצב או מדידה: סטודיו למשחקים, בית תקליטים, אפליקציית כושר, לוח בקרה. הפסים הם האיור של העסק והתנועה נותנת תחושה של משחק גם בלי משחק. לא מעל טקסט ארוך, ולא לעסק רציני ושקט כמו משרד עורכי דין.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו כוכבי שביט מקפצים בין שורות של פסים ומדליקים את הפס שפגעו בו. נבנה מאפס מהצפייה. **הבסיס הסטטי והקנבס:** הפסים הם אלמנטים אמיתיים ב-DOM (שתי שורות של `i` בגריד), ולכן הם נמדדים, מתאימים לכל רוחב וקוראים מהטוקנים. בבסיס הסטטי שני פסים דולקים ושלושה כוכבי שביט מצוירים ב-CSS (פס מחודד עם ראש זוהר). כשהסקשן נחשף הקנבס עולה בהצלבה (`.is-on`, כמו ב-b78), הכוכבים הסטטיים נעלמים והפסים הדולקים חוזרים לאפור, וכך גם בדפדפן בלי קנבס או בהפחתת תנועה רואים תמונה גמורה. בהפחתת תנועה הקנבס מצייר פריים אחד בלי לולאה. **הפיזיקה:** לכל כוכב מהירות אנכית של כ-220 פיקסלים בשנייה ומהירות אופקית קטנה, והוא מוחזר מקיר העליון והתחתון (שפות הפסים, נמדדות מה-DOM בכל שינוי גודל) ומקירות הצדדים. **פגיעה:** אם הכוכב נוגע בפס, הפס מקבל `flash` שדועך תוך 0.35 שניות ומצוייר מחדש כמלבן בצבע המותג עם הילה (sprite רדיאלי מתוח), ויוצאות 8 נקודות ניצוץ (ארבע אם פגע בין פסים). **הזנב:** 22 מיקומים אחרונים של הכוכב, כל אחד כ-sprite קטן יותר ועמום יותר. **משטח כהה:** הסקשן בצבע `--ink` והטקסט ב-`--bg`, כי זוהר נראה על רקע כהה. בעור כהה המשטח מתהפך לבהיר, ואז מקבעים לו צבע כהה. הצבעים בליבת ה-sprite בהירים יותר מ-`--accent` כדי שראש הכוכב יקרא כנקודה חמה. **הצבע:** הכול מ-`--accent` שנקרא בזמן ריצה (דרך קנבס של פיקסל אחד, כך שכל פורמט צבע עובד), ו-sprite אחד מצויר מראש. **קל:** שלושה כוכבים (שניים בטלפון, עם שמונה פסים בשורה במקום שניים-עשר), DPR עד 2, הלולאה רצה רק כשהסקשן על המסך והלשונית פעילה. **הבהוב:** כ-1.7 פגיעות בשנייה בסך הכול, כל אחת בזוהר רך על פס אחד, כלומר הרבה מתחת לשלושה הבזקים בשנייה. **וריאציה שלא נבנתה:** בגרסה אחרת של המהלך הפסים מסודרים בקשת סביב המרכז; מחליפים את מדידת הפסים ואת הפגיעה בקיר לפי הקשת. **כיווניות:** התנועה אנכית והסטייה לצדדים אקראית, ולכן אין מה להחליף באתר LTR. **נגישות:** כל השכבות `aria-hidden` והכותרת היא הטקסט היחיד.",
  libs:[],
  css:`.cb{position:relative;isolation:isolate;overflow:hidden;min-height:clamp(480px,70vh,640px);display:grid;place-items:center;border-radius:28px;background:var(--ink);color:var(--bg);padding:clamp(72px,10vw,96px) var(--gutter)}
.cb-art{--bar:color-mix(in oklab,var(--bg) 16%,var(--ink));position:absolute;inset:0;z-index:0;pointer-events:none}
.cb-rail{position:absolute;inset-inline:clamp(16px,3vw,32px);display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:clamp(8px,1.2vw,12px)}
.cb-top{top:clamp(24px,3vw,32px)}
.cb-bot{bottom:clamp(24px,3vw,32px)}
.cb-rail i{display:block;height:10px;border-radius:5px;background:var(--bar);transition:background-color .6s cubic-bezier(.2,.6,.2,1)}
.cb-rail i.on{background:var(--accent)}
.cb-art.is-on .cb-rail i.on{background:var(--bar)}
/* כוכבי שביט סטטיים: מה שרואים בלי JS ובהפחתת תנועה, עד שהקנבס נחשף */
.cb-sc{position:absolute;left:var(--x);top:var(--y);width:6px;height:var(--l);border-radius:3px;rotate:var(--r);background:linear-gradient(to bottom,transparent,var(--accent));
  box-shadow:0 0 16px 3px color-mix(in oklab,var(--accent) 60%,transparent);transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.cb-art.is-on .cb-sc{opacity:0}
.cb-cv{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.cb-art.is-on .cb-cv{opacity:1}
.cb-in{position:relative;z-index:1;display:grid;gap:16px;justify-items:center;text-align:center;max-width:44ch}
.cb-in::before{content:"";position:absolute;inset:-40px -56px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in oklab,var(--ink) 90%,transparent) 55%,transparent)}
.cb-k{margin:0;font-size:15px;font-weight:600;color:color-mix(in oklab,var(--bg) 70%,var(--ink))}
.cb h2{margin:0;font-size:clamp(32px,4.4vw,60px);line-height:1.1;text-wrap:balance;color:var(--bg)}
.cb-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:color-mix(in oklab,var(--bg) 78%,var(--ink))}
.cb-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.cb-btn:hover{transform:translateY(-2px)}}
.cb-btn:focus-visible{outline:2px solid var(--bg);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.cb-cv,.cb-sc,.cb-rail i{transition:none}}
@media(max-width:767px){
  .cb{min-height:560px}
  .cb-rail{grid-template-columns:repeat(8,minmax(0,1fr))}
  .cb-rail i:nth-child(n+9){display:none}
  .cb-in::before{inset:-32px -24px}
}`,
  html:`<div class="stage"><section class="cb">
  <div class="cb-art" aria-hidden="true">
    <div class="cb-rail cb-top"><i></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="cb-rail cb-bot"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
    <span class="cb-sc" style="--x:22%;--y:24%;--l:92px;--r:8deg"></span>
    <span class="cb-sc" style="--x:52%;--y:56%;--l:76px;--r:-6deg"></span>
    <span class="cb-sc" style="--x:78%;--y:30%;--l:84px;--r:5deg"></span>
    <canvas class="cb-cv"></canvas>
  </div>
  <div class="cb-in">
    <p class="cb-k">סטודיו למשחקי מובייל בתל אביב</p>
    <h2>משחקים קצרים שחוזרים אליהם כל יום</h2>
    <p class="cb-lead">אנחנו מפתחים משחקי מובייל של שתיים עד חמש דקות. אין פרסומות באמצע המשחק ואין צורך בהרשמה, וכל משחק מקבל עדכון חדש פעם בחודש.</p>
    <a class="cb-btn" href="#">למשחקים שלנו</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".cb"),art=root.querySelector(".cb-art"),cv=art.querySelector(".cb-cv"),ctx=cv.getContext("2d"),
    bars=[].slice.call(art.querySelectorAll(".cb-rail i"));
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W=0,H=0,B=[],C=[],S=[],spr=null,col="#fff",SPR=64,K=1,NC=3,MAXS=60,yT=0,yB=0,vis=false,running=false,raf=0,last=0;
  const R=(a,b)=>a+Math.random()*(b-a);
  // הצבע נקרא מהטוקן בזמן ריצה (פיקסל אחד בקנבס, כך שכל פורמט צבע עובד), ו-sprite אחד מצויר מראש
  const pcv=document.createElement("canvas");pcv.width=pcv.height=1;const pc=pcv.getContext("2d",{willReadFrequently:true});
  const rgb=c=>{pc.clearRect(0,0,1,1);pc.fillStyle=c;pc.fillRect(0,0,1,1);const d=pc.getImageData(0,0,1,1).data;return[d[0],d[1],d[2]];};
  function sprite(){
    const a=rgb(getComputedStyle(root).getPropertyValue("--accent").trim()||"#888"),c=document.createElement("canvas");
    col="rgb("+a.join(",")+")";c.width=c.height=SPR;
    const g=c.getContext("2d"),gr=g.createRadialGradient(SPR/2,SPR/2,0,SPR/2,SPR/2,SPR/2),k="rgba("+a.join(",")+",",hi="rgba("+a.map(v=>Math.round(v+(255-v)*.72)).join(",")+",";
    gr.addColorStop(0,hi+"1)");gr.addColorStop(.2,hi+".9)");gr.addColorStop(.45,k+".6)");gr.addColorStop(1,k+"0)");g.fillStyle=gr;g.fillRect(0,0,SPR,SPR);spr=c;
  }
  // פגיעה: הפס שמתחת לכוכב נדלק, ויוצאת חבורת ניצוצות מנקודת המגע בכיוון הפוך לשורה
  function hit(c,row){
    let bar=null;
    for(let i=0;i<B.length;i++){const b=B[i];if(b.row===row&&c.x>=b.x0-4&&c.x<=b.x1+4){bar=b;break;}}
    if(bar)bar.f=1;
    for(let k=0;k<(bar?8:4)&&S.length<MAXS;k++){
      const a=R(-1.2,1.2),sp=R(70,170);
      S.push({x:c.x,y:row?yB:yT,vx:Math.sin(a)*sp,vy:(row?-1:1)*Math.cos(a)*sp,s:R(1.4,2.6)*K,age:0,life:R(.45,.8)});
    }
  }
  function step(dt){
    C.forEach(c=>{
      c.x+=c.vx*dt;c.y+=c.vy*dt;
      if(c.x<16){c.x=16;c.vx=Math.abs(c.vx);}else if(c.x>W-16){c.x=W-16;c.vx=-Math.abs(c.vx);}
      const top=yT+c.r+2,bot=yB-c.r-2;
      if(c.y<top){c.y=top;c.vy=Math.abs(c.vy);hit(c,0);}else if(c.y>bot){c.y=bot;c.vy=-Math.abs(c.vy);hit(c,1);}
      c.tr.push(c.x,c.y);if(c.tr.length>44)c.tr.splice(0,2);
    });
    B.forEach(b=>{if(b.f>0)b.f=Math.max(0,b.f-dt/.35);});
    for(let i=S.length-1;i>=0;i--){const s=S[i];s.age+=dt;if(s.age>=s.life){S.splice(i,1);continue;}s.x+=s.vx*dt;s.y+=s.vy*dt;s.vx*=1-dt*1.5;s.vy*=1-dt*1.5;}
  }
  function paint(){
    ctx.clearRect(0,0,W,H);
    B.forEach(b=>{
      if(b.f<=.01)return;const w=b.x1-b.x0,h=b.b-b.t;
      ctx.globalAlpha=b.f*.55;ctx.drawImage(spr,b.x0-w*.5,b.t-h*4.5,w*2,h*10);
      ctx.globalAlpha=b.f;ctx.fillStyle=col;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(b.x0,b.t,w,h,h/2);ctx.fill();}else ctx.fillRect(b.x0,b.t,w,h);
    });
    C.forEach(c=>{
      const n=c.tr.length/2;
      for(let i=0;i<n;i++){const t=(i+1)/n,s=c.r*2.4*t+1.5;ctx.globalAlpha=Math.pow(t,1.5)*.85;ctx.drawImage(spr,c.tr[i*2]-s,c.tr[i*2+1]-s,s*2,s*2);}
      ctx.globalAlpha=1;let g=c.r*3.4;ctx.drawImage(spr,c.x-g,c.y-g,g*2,g*2);g=c.r*1.5;ctx.drawImage(spr,c.x-g,c.y-g,g*2,g*2);
    });
    S.forEach(s=>{const t=s.age/s.life,z=s.s*(1-.5*t)*2;ctx.globalAlpha=(1-t)*.9;ctx.drawImage(spr,s.x-z,s.y-z,z*2,z*2);});
    ctx.globalAlpha=1;
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const small=W<600;K=small?.8:1;NC=small?2:3;MAXS=small?30:60;
    // הפסים נמדדים מה-DOM: אותם מלבנים שהקנבס מדליק ושמהם הכוכבים חוזרים
    B=[];bars.forEach(b=>{const q=b.getBoundingClientRect();if(!q.width)return;B.push({x0:q.left-r.left,x1:q.right-r.left,t:q.top-r.top,b:q.bottom-r.top,row:q.top-r.top<H/2?0:1,f:0});});
    yT=0;yB=H;B.forEach(b=>{if(b.row===0)yT=Math.max(yT,b.b);else yB=Math.min(yB,b.t);});
    sprite();S=[];C=[];
    for(let i=0;i<NC;i++)C.push({x:W*(.2+.3*i),y:yT+(yB-yT)*(.2+.3*i),vx:(i%2?1:-1)*R(50,95)*K,vy:(i%2?-1:1)*R(200,240)*K,tr:[],r:5*K});
    for(let i=0;i<70;i++)step(.016);      // חימום: הפריים הראשון כבר עם זנבות
    if(reduced){B.forEach((b,i)=>{if(i===3||i===B.length/2+3)b.f=.8;});}
    paint();
  }
  function loop(now){
    const dt=Math.min(.05,(now-last)/1000);last=now;
    step(dt);paint();raf=running?requestAnimationFrame(loop):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf){last=performance.now();raf=requestAnimationFrame(loop);}}
  document.addEventListener("visibilitychange",sync);
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)art.classList.add("is-on");sync();},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");     // פריים אחד, בלי לולאה
  build();
})();`
}
];
