// מהלכי רקע וטקסטורה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// קרני שמש, שדה כוכבים, פסי תנועה, טבעות מקטעים, ניאון, ספרה בקו מתאר, מואר, פסי סריקה והדפס כפול.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל טקסטורה יושבת מאחורי סקשן אמיתי עם תוכן אמיתי, בניגודיות נמוכה, ובצבעי הטוקנים בלבד.

// פסי התנועה של g275: מיקום אנכי, זנב שנשאר גלוי בסוף (px), אורך נוסף בתחילת התנועה (vw), עובי
const SL_T = [-34, -26, -18, -9, -2, 6, 13, 21, 29, 36, 44, 52, 60, 68, 76, 85, 94, 104];
const SL_V = [46, 18, 72, 30, 56, 22, 64, 38, 16, 80, 34, 52, 24, 68, 42, 20, 60, 28];
const SL_G = [62, 38, 80, 30, 54, 72, 34, 66, 44, 76, 36, 58, 70, 40, 60, 28, 50, 64];
const SL_H = [2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2];
const slLines = SL_T.map((t0, i) => { const t = Math.round(-8 + (t0 + 34) * 112 / 138); return (
  `<i style="--t:${t}%;--v:${SL_V[i]}px;--h:${SL_H[i]}px${i % 5 === 2 ? ";--c:var(--accent)" : ""}" data-g="${SL_G[i]}"></i>`); }).join("\n          ");

// פסי הרקע של g275 שחולפים על פני כל הבמה: גובה, רוחב (אחוז מהבמה), עובי, התחלה ומשך בטיימליין
const GH_T = [8, 22, 36, 48, 60, 71, 83, 93];
const GH_W = [44, 58, 36, 64, 40, 52, 34, 60];
const GH_H = [2, 3, 2, 2, 3, 2, 3, 2];
const slGhost = GH_T.map((t, i) =>
  `<i style="--t:${t}%;--w:${GH_W[i]}%;--h:${GH_H[i]}px${i === 3 || i === 6 ? ";--c:var(--accent)" : ""}"></i>`).join("\n        ");

// הקווים שפורצים מהמרכז ב-g276: 36 קווים, כל 10 מעלות, מרדיוס 104 עד 294
const rnBurst = Array.from({ length: 36 }, (_, i) => {
  const a = i * 10 * Math.PI / 180, c = 300, r1 = 104, r2 = 294;
  return `<line x1="${(c + r1 * Math.cos(a)).toFixed(1)}" y1="${(c + r1 * Math.sin(a)).toFixed(1)}" x2="${(c + r2 * Math.cos(a)).toFixed(1)}" y2="${(c + r2 * Math.sin(a)).toFixed(1)}"/>`;
}).join("");

// אריח גרעין קטן (160px) שמשמש כמסכה: הצבע של הגרעין מגיע מ-CSS, לא מהקובץ
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2.2 0 0 0 -.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default [
{
  id:"g273", cat:"gsap", name:"קרני שמש שנפתחות מאחורי המבצע", tech:"GSAP · ScrollTrigger · conic-gradient mask", status:"מאושר-עין",
  desc:"קרניים דקות יוצאות מהעיגול שבמרכז ונמסות לקצוות הסקשן. כשהסקשן נכנס למסך הן נפתחות בסריקה אחת סביב העיגול, ואחר כך מסתובבות לאט עם הגלילה ופועמות בעדינות. הכותרת, הטקסט והתמונה נשארים הדבר הברור בעמוד, והקרניים רק מכוונות אליהם את העין.",
  when:"מבצע, הטבה או אובייקט אחד שצריך להרגיש כמו אירוע: קונוס שני במתנה, יום פתוח, מוצר החודש. סקשן אחד בעמוד, בעיקר באתר של עסק מקומי או של חנות. פחות מתאים לשירות מקצועי שקט, ולסקשן עם כמה אובייקטים, כי הקרניים מצביעות על אחד.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם קרני שמש דקות יוצאות מאחורי אובייקט או חותמת, פעם בפעימה איטית ופעם כקווי מהירות שמתכנסים לנקודה. נבנה מאפס מהצפייה. **הקרניים הן אלמנט אחד:** `repeating-conic-gradient` של 36 קרניים בצבע ה-accent בשקיפות, בתוך עטיפה עם מסכה רדיאלית שמדללת אותן לקצוות (`.sb-fade`). השכבה יושבת בתוך עטיפת האובייקט ולא בתוך הסקשן, ולכן מרכז הקרניים הוא תמיד מרכז האובייקט, בכל גודל מסך. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים את כל הקרניים, סטטיות. **כשהמהלך רץ** יש שלוש תנועות על שלושה מאפיינים נפרדים, כדי שלא ידרכו זו על זו: פתיחה חד פעמית (`--sw` הוא אחוז הסריקה במסכת `conic-gradient`, מ-0 ל-1), סיבוב עם הגלילה (`rotation` של השכבה, 16 מעלות לכל כיוון על פני הסקשן), ופעימה של השקיפות בעטיפה שנעצרת כשהסקשן מחוץ למסך. **קריאות:** הקרניים לא עוברות 15% accent, והטקסט עליהן בצבע ה-ink, כך שהיחס נשאר מעל AA בכל העורות. טקסט בצבע muted נופל מתחת ל-4.5 על הקרניים, ולכן לא משתמשים בו כאן. **עוצמה:** אחוז ה-accent בקרניים (15%) וזווית הקרן (5 מעלות מתוך 10) הם שני הכפתורים של המהלך. **באתר משמאל לימין** מחליפים את סדר העמודות, ואת כיוון הסיבוב אם רוצים שיעקוב אחרי הקריאה. **נגישות:** כל שכבת הקרניים `aria-hidden`, והתוכן האמיתי הוא הכותרת, הפסקה והכפתור.",
  libs:["gsap","ScrollTrigger"],
  css:`.sb{position:relative;isolation:isolate;overflow:clip;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:clamp(32px,5vw,72px);min-height:clamp(520px,52vw,680px);padding:clamp(40px,6vw,96px);border-radius:clamp(20px,2.4vw,32px);background:var(--card);color:var(--ink)}
.sb-txt{display:grid;gap:18px;justify-items:start;max-width:34rem}
.sb-txt h2{margin:0;font-size:clamp(38px,5vw,70px);font-weight:800;line-height:1.04;letter-spacing:-.02em;text-wrap:balance}
.sb-txt p{margin:0;max-width:34ch;font-size:var(--fs-body);line-height:1.6}
.sb-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.sb-obj{position:relative;justify-self:center;width:clamp(260px,34vw,440px);aspect-ratio:1}
.sb-obj img{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:50% 58%}
.sb-badge{position:absolute;inset-block-start:2%;inset-inline-end:-4%;display:grid;place-items:center;width:clamp(92px,10vw,132px);aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--accent-ink);text-align:center;font-size:clamp(15px,1.5vw,20px);font-weight:700;line-height:1.15;transform:rotate(-10deg)}
/* הקרניים: עטיפה ממורכזת על האובייקט עם מסכה רדיאלית, ובתוכה השכבה שמסתובבת ונפתחת */
.sb-fade{position:absolute;left:50%;top:50%;z-index:-1;width:max(1500px,130vw);aspect-ratio:1;translate:-50% -50%;pointer-events:none;
  -webkit-mask-image:radial-gradient(closest-side,#000 16%,transparent 100%);mask-image:radial-gradient(closest-side,#000 16%,transparent 100%)}
.sb-rays{position:absolute;inset:0;--sw:1;
  background:repeating-conic-gradient(color-mix(in oklab,var(--accent) 15%,transparent) 0 5deg,transparent 5deg 10deg);
  -webkit-mask-image:conic-gradient(#000 calc(var(--sw) * 1turn),transparent 0deg);mask-image:conic-gradient(#000 calc(var(--sw) * 1turn),transparent 0deg)}
@media(max-width:767px){.sb{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center;padding:40px 20px}.sb-txt{justify-items:center}.sb-obj{order:-1;width:min(300px,76vw)}.sb-badge{inset-inline-end:-2%}}`,
  html:`<div class="stage"><section class="sb">
  <div class="sb-txt">
    <h2>קונוס שני במתנה</h2>
    <p>בכל יום חמישי אחרי הצהריים בוחרים שני טעמים מהמקרר, והקונוס השני עלינו. ההטבה חלה על כל הטעמים, כולל הטעמים המשתנים של השבוע.</p>
    <a class="sb-cta" href="#">לכל הטעמים</a>
  </div>
  <div class="sb-obj">
    <div class="sb-fade" aria-hidden="true"><div class="sb-rays"></div></div>
    <img src="../assets/media/real/s11/hero-scoops.webp" width="1400" height="1750" alt="שלושה כדורי גלידה ורודים ולבנים עם סוכריות" loading="lazy" decoding="async">
    <span class="sb-badge">ימי<br>חמישי</span>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הקרניים סטטיות ופתוחות במלואן (במארקאפ)
  const root=document.querySelector(".sb"),rays=root.querySelector(".sb-rays"),fade=root.querySelector(".sb-fade"),badge=root.querySelector(".sb-badge");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // פתיחה חד פעמית כשהסקשן נכנס: הסריקה סובבת את הקרניים ואחריה ההטבה נכנסת
    gsap.timeline({scrollTrigger:{trigger:root,start:"top 75%",once:true}})
      .fromTo(rays,{"--sw":0},{"--sw":1,duration:1.5,ease:"power2.inOut"},0)
      .fromTo(badge,{scale:.7,autoAlpha:0},{scale:1,autoAlpha:1,duration:.7,ease:"power3.out"},.55);
    // סיבוב איטי שנקשר לגלילה, ופעימה של העטיפה שנעצרת כשהסקשן מחוץ למסך
    gsap.fromTo(rays,{rotation:-16},{rotation:16,ease:"none",scrollTrigger:{trigger:root,start:"top bottom",end:"bottom top",scrub:.8}});
    const pulse=gsap.to(fade,{opacity:.7,duration:2.2,ease:"sine.inOut",yoyo:true,repeat:-1,paused:true});
    ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:s=>s.isActive?pulse.play():pulse.pause()});
    return()=>{gsap.set([rays,fade,badge],{clearProps:"all"});};
  });
})();`
},
{
  id:"g274", cat:"gsap", name:"שדה כוכבים שנמתח לפסים עם מהירות הגלילה", tech:"GSAP · ScrollTrigger velocity · Canvas", status:"מאושר-עין",
  desc:"כוכבים זורמים לאט מהמרכז החוצה מאחורי הכותרת. כשגוללים מהר הם נמתחים לפסים ארוכים והשדה כולו מאיץ, וכשעוצרים הוא נרגע בחזרה. מרכז הבמה נשאר נקי, כדי שהטקסט ייקרא בכל רגע.",
  when:"הירו של עסק שהמהירות היא הערך שלו: שליחויות, תקשורת, לוגיסטיקה, מוצר דיגיטלי שמבטיח תוצאה מהירה. פעם אחת בעמוד, בפתיח. לא מתאים לעסק שמוכר שקט ואמון, כמו קליניקה או משרד עורכי דין.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כוכבים נמתחים לפסים מהמרכז כמו במעבר למהירות על אורית, מאחורי לוגו או הודעה. נבנה מאפס מהצפייה. **קנבס קטן אחד:** כל כוכב הוא נקודה בעומק (`z`) שמוקרנת למסך (`x/z`), ובכל פריים הוא מצויר כקו מהמיקום שהיה לו קצת קודם אל המיקום הנוכחי. אורך הפס וקצב הזרימה נגזרים מהמהירות המוחלקת של הגלילה (`getVelocity()` של ScrollTrigger, שדועכת לבד כשעוצרים), ולכן במנוחה רואים נקודות שנעות לאט ובגלילה מהירה פסים של מאות פיקסלים. **הטקסט נשאר קריא:** הכוכבים מתעמעמים עד אפס באליפסה במרכז, והטקסט עצמו מקבל הילה בצבע הרקע. הצבעים נפתרים פעם אחת מהטוקנים (`--bg` לכוכבים, מעט `--accent`), כך שהשדה מתאים לכל עור. **ביצועים:** מספר הכוכבים מחושב מהשטח (150 עד 280), הקנבס מתחשב ב-DPR עד 2, הלולאה נעצרת כשהסקשן מחוץ למסך (IntersectionObserver) ומתחילה מחדש כשחוזר, וגודל הקנבס מתעדכן ב-ResizeObserver. **מה זז ב-DOM:** זוהר מאחורי הטקסט שגדל עם המהירות, והטקסט זז מעט לאט יותר מהגלילה (parallax). **הערך הסופי:** בלי GSAP ובהפחתת תנועה אין קנבס פעיל, ורואים שדה סטטי ב-CSS בלבד: נקודות ופסים דקים שיוצאים מהמרכז. **באתר משמאל לימין** אין מה להפוך, התנועה רדיאלית. **נגישות:** הקנבס והשדה `aria-hidden`.",
  libs:["gsap","ScrollTrigger"],
  css:`.sf{position:relative;isolation:isolate;overflow:clip;display:grid;place-items:center;min-height:clamp(520px,58vw,720px);padding:clamp(48px,7vw,112px) clamp(20px,5vw,96px);border-radius:clamp(20px,2.4vw,32px);background:var(--ink);color:var(--bg);text-align:center}
.sf-front{position:relative;display:grid;justify-items:center;gap:20px;max-width:46rem;text-shadow:0 0 .6em var(--ink),0 0 1.3em var(--ink)}
.sf-front h2{margin:0;font-size:clamp(36px,5.4vw,76px);font-weight:800;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.sf-front p{margin:0;max-width:38ch;font-size:var(--fs-body);line-height:1.6}
.sf-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none;text-shadow:none}
.sf-cv{position:absolute;inset:0;z-index:-1;width:100%;height:100%;display:block}
.sf-glow{position:absolute;inset:0;z-index:-1;margin:auto;width:min(900px,120%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,color-mix(in oklab,var(--accent) 34%,transparent),transparent 62%);opacity:.25;pointer-events:none}
/* המצב הסטטי: נקודות ופסים דקים שיוצאים מהמרכז. כשהקנבס פעיל (is-live) הם מוסתרים */
.sf-dots{position:absolute;inset:0;z-index:-2;pointer-events:none;
  background:
    radial-gradient(1.4px 1.4px at 8% 18%,color-mix(in oklab,var(--bg) 85%,transparent),transparent 100%),
    radial-gradient(1.2px 1.2px at 17% 74%,color-mix(in oklab,var(--bg) 70%,transparent),transparent 100%),
    radial-gradient(1.6px 1.6px at 26% 36%,color-mix(in oklab,var(--bg) 80%,transparent),transparent 100%),
    radial-gradient(1.2px 1.2px at 33% 88%,color-mix(in oklab,var(--bg) 60%,transparent),transparent 100%),
    radial-gradient(1.4px 1.4px at 41% 12%,color-mix(in oklab,var(--bg) 75%,transparent),transparent 100%),
    radial-gradient(1.2px 1.2px at 58% 84%,color-mix(in oklab,var(--bg) 65%,transparent),transparent 100%),
    radial-gradient(1.6px 1.6px at 67% 24%,color-mix(in oklab,var(--bg) 85%,transparent),transparent 100%),
    radial-gradient(1.2px 1.2px at 74% 62%,color-mix(in oklab,var(--bg) 60%,transparent),transparent 100%),
    radial-gradient(1.4px 1.4px at 83% 14%,color-mix(in oklab,var(--bg) 70%,transparent),transparent 100%),
    radial-gradient(1.4px 1.4px at 91% 78%,color-mix(in oklab,var(--bg) 80%,transparent),transparent 100%),
    radial-gradient(1.2px 1.2px at 95% 40%,color-mix(in oklab,var(--bg) 65%,transparent),transparent 100%),
    repeating-conic-gradient(from 3deg at 50% 50%,color-mix(in oklab,var(--bg) 26%,transparent) 0 .25deg,transparent .25deg 7deg);
  -webkit-mask-image:radial-gradient(ellipse at center,transparent 22%,#000 76%);mask-image:radial-gradient(ellipse at center,transparent 22%,#000 76%)}
.sf.is-live .sf-dots{display:none}
@media(max-width:767px){.sf{padding:56px 20px}}`,
  html:`<div class="stage"><section class="sf">
  <div class="sf-dots" aria-hidden="true"></div>
  <canvas class="sf-cv" aria-hidden="true"></canvas>
  <div class="sf-glow" aria-hidden="true"></div>
  <div class="sf-front">
    <h2>משלוח באותו יום, בכל גוש דן והשרון</h2>
    <p>אוספים מהעסק בין שמונה בבוקר לשתיים בצהריים וממסרים עד הערב. הלקוח רואה איפה השליח נמצא בכל רגע, ואתם מקבלים אישור מסירה עם חתימה.</p>
    <a class="sf-cta" href="#">לשליחות ראשונה</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר השדה הסטטי של ה-CSS
  const root=document.querySelector(".sf"),cv=root.querySelector(".sf-cv"),glow=root.querySelector(".sf-glow"),front=root.querySelector(".sf-front");
  const ctx=cv.getContext("2d");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // צבעי הטוקנים נפתרים פעם אחת (פיקסל אחד בקנבס), כך שהשדה מתאים לכל עור
    const px=document.createElement("canvas").getContext("2d",{willReadFrequently:true}),probe=document.createElement("i");
    px.canvas.width=px.canvas.height=1;probe.style.cssText="position:absolute;visibility:hidden;pointer-events:none";root.appendChild(probe);
    const rgb=name=>{probe.style.color="var("+name+")";px.clearRect(0,0,1,1);px.fillStyle=getComputedStyle(probe).color;px.fillRect(0,0,1,1);const d=px.getImageData(0,0,1,1).data;return d[0]+","+d[1]+","+d[2];};
    const COL=[rgb("--bg"),rgb("--accent")];
    const K=.24;                              // פיזור הכוכבים: ככל שגדול יותר הם רחוקים יותר מהמרכז
    let W=0,H=0,stars=[],v=0,target=0,raf=0,last=0,visible=false;
    const rnd=(a,b)=>a+Math.random()*(b-a);
    const spawn=(s,far)=>{s.x=rnd(-1,1);s.y=rnd(-1,1);s.z=far?1:rnd(.12,1);s.c=Math.random()<.16?1:0;return s;};
    const size=()=>{
      const r=root.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
      W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.max(150,Math.min(280,Math.round(W*H/3800)));
      while(stars.length<n)stars.push(spawn({}));
      stars.length=n;
    };
    const frame=now=>{
      raf=0;if(!visible)return;
      const dt=Math.min(50,now-(last||now)),k=dt/16.7;last=now;
      v+=(target-v)*Math.min(1,.09*k);target*=Math.pow(.93,k);       // המהירות מוחלקת ודועכת לבד
      ctx.clearRect(0,0,W,H);ctx.lineCap="round";
      const cx=W/2,cy=H/2,len=.004+v*.17,step=(.0011+v*.045)*k;
      for(const s of stars){
        s.z-=step;
        const f=K/s.z,x=cx+s.x*cx*f,y=cy+s.y*cy*f;
        if(s.z<=.1||Math.abs(x-cx)>cx*1.15||Math.abs(y-cy)>cy*1.15){spawn(s,true);continue;}
        const f2=K/(s.z+len),x2=cx+s.x*cx*f2,y2=cy+s.y*cy*f2;     // זנב הפס: המיקום מעט קודם
        const rx=(x-cx)/cx,ry=(y-cy)/cy,fade=Math.min(1,Math.max(0,(Math.sqrt(rx*rx+ry*ry)-.26)/.5));   // המרכז נשאר נקי
        const a=fade*(.25+.75*(1-s.z))*(.5+.5*Math.min(1,v*2+.4));
        if(a<.02)continue;
        ctx.strokeStyle="rgba("+COL[s.c]+","+a.toFixed(3)+")";ctx.lineWidth=.8+(1-s.z)*1.3;
        ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x,y);ctx.stroke();
      }
      glow.style.opacity=(.25+v*.75).toFixed(3);glow.style.transform="scale("+(1+v*.45).toFixed(3)+")";
      raf=requestAnimationFrame(frame);
    };
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!raf){last=0;raf=requestAnimationFrame(frame);}},{threshold:0});
    const ro=new ResizeObserver(size);
    size();root.classList.add("is-live");visible=true;frame(performance.now());
    io.observe(root);ro.observe(root);
    const st=ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onUpdate:self=>{target=Math.max(target,Math.min(1,Math.abs(self.getVelocity())/2600));}});
    gsap.fromTo(front,{yPercent:9},{yPercent:-9,ease:"none",scrollTrigger:{trigger:root,start:"top bottom",end:"bottom top",scrub:.6}});
    return()=>{io.disconnect();ro.disconnect();cancelAnimationFrame(raf);raf=0;visible=false;st.kill();root.classList.remove("is-live");ctx.clearRect(0,0,cv.width,cv.height);glow.style.opacity="";glow.style.transform="";probe.remove();};
  });
})();`
},
{
  id:"g275", cat:"gsap", name:"פסי תנועה אופקיים שחולפים מאחורי הנושא", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"תמונה גדולה נכנסת מימין ונעצרת במרכז הבמה, ומאחוריה נמתחים אחריה כמה עשרות פסים דקים לרוחב המסך. בתחילה הפסים ארוכים, וככל שהתמונה מאטה הם מתקצרים עד שנשארים מהם קצוות קצרים. מאחורי הכל מילה ענקית בקו מתאר זזה לאט באותו כיוון.",
  when:"פתיח או סקשן אודות של עסק שעוסק בתנועה: השכרת רכבים, שליחויות, ספורט, נסיעות. הסצנה נעוצה ודורשת מסלול גלילה, ולכן היא מתאימה לעמוד נחיתה או לסקשן אחד בולט, פעם אחת. צריך תמונה חזקה אחת שעומדת בפני עצמה.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו קווים אופקיים דקים חולפים במהירות מאחורי דמות שדוהרת, עם מילה ענקית בקו מתאר ברקע. נבנה מאפס מהצפייה. **סצנה נעוצה אחת:** `.sl` גבוה (260svh) וב-`.sl-pin` נעוץ בו (`position:sticky`), וטיימליין אחד מקושר לגלילה (`scrub`) מפעיל הכל. **הקשר בין המהירות לאורך הפס:** התמונה נעה ב-`power1.out`, ומהירות בעקומה כזו יורדת ליניארית, ולכן אורך הפסים יורד ב-`ease:none`. כך הפס תמיד ארוך כפי שהתנועה מהירה, ולכל פס משך משלו (62% עד 90% מהטיימליין), כך שהם מתיישבים בזמנים שונים. **הפסים הם ילדים של התמונה:** הם נעים איתה ויוצאים מהקצה הימני שלה, מאחוריה. הרוחב הסופי הוא זנב קצר (`--v`, בין 16 ל-80 פיקסלים) שמתחיל בצבע מלא ודועך, וזה מה שרואים בלי GSAP ובהפחתת תנועה: תמונה במרכז וקצוות קצרים שיוצאים ממנה. ה-JS מחשב מכל זנב את `scaleX` ההתחלתי לפי `data-g` (אורך נוסף ב-vw) ומחשב מחדש בשינוי גודל (`invalidateOnRefresh`). **פסי רקע:** שמונה פסים נוספים (`.sl-ghost`) חולפים מימין לשמאל על פני כל הבמה, מאחורי התמונה והמילה, במהירות קבועה ובזמנים שונים, ויוצאים מהמסך לפני שהתמונה נעצרת. הם מוצגים רק כשהמהלך חי (המחלקה `is-live`), ולכן בלי GSAP ובהפחתת תנועה הם לא קיימים בכלל. **המילה** (`.sl-word`) זזה 8% לכל כיוון, לאט מהתמונה, כדי שהעומק ייראה. **כיוון:** התנועה מימין לשמאל והפסים נמתחים לימין, כלומר מאחורי הנושא. באתר משמאל לימין מחליפים `left` ב-`right` בפסים, `transform-origin` ל-`100% 50%`, ומהפכים את הסימן של `x` ושל `xPercent` ב-JS. **בטלפון** התמונה צרה יותר (`76vw`), הכותרת קצרה יותר והסצנה נעוצה באותו אופן. **נגישות:** הפסים והמילה `aria-hidden`, והתוכן האמיתי הוא הכותרת, הפסקה והתמונה עם ה-alt שלה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sl{position:relative;height:260vh;height:260svh}
.sl-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:clip;display:grid;grid-template-rows:auto minmax(0,1fr);gap:24px;padding:clamp(24px,4vw,56px);border-radius:clamp(20px,2.4vw,32px);background:color-mix(in oklab,var(--accent) 7%,var(--card));color:var(--ink)}
.sl-head{position:relative;z-index:2;display:grid;gap:10px;justify-items:center;text-align:center}
.sl-head h2{margin:0;font-size:clamp(26px,3.6vw,52px);font-weight:800;line-height:1.08;letter-spacing:-.015em;text-wrap:balance}
.sl-head p{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.55}
.sl-track{position:relative;display:grid;place-items:center;min-height:0}
.sl-word{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(132px,31vw,460px);font-weight:900;line-height:.8;white-space:nowrap;color:transparent;-webkit-text-stroke:2px color-mix(in oklab,var(--ink) 18%,transparent);pointer-events:none}
.sl-subject{position:relative;width:min(540px,76vw,calc((100svh - 280px) * 1.333));aspect-ratio:4 / 3;will-change:transform}
.sl-subject img{position:relative;z-index:1;display:block;width:100%;height:100%;border-radius:clamp(14px,1.6vw,24px);object-fit:cover}
/* הפסים יוצאים מהקצה הימני של התמונה, מאחוריה. הרוחב הסופי הוא זנב קצר (--v) */
/* פסי רקע שחולפים על פני כל הבמה בזמן הכניסה. מוצגים רק כשהמהלך חי (is-live) ונעים מחוץ למסך בסיום */
.sl-ghost{position:absolute;inset:0;visibility:hidden;pointer-events:none}
.sl.is-live .sl-ghost{visibility:visible}
.sl-ghost i{position:absolute;left:0;top:var(--t);width:var(--w);height:var(--h);border-radius:2px;background:linear-gradient(90deg,var(--c,color-mix(in oklab,var(--ink) 40%,transparent)),transparent);will-change:transform}
.sl-lines{position:absolute;inset:0;pointer-events:none}
.sl-lines i{position:absolute;left:calc(100% - 8px);top:var(--t);width:var(--v);height:var(--h);transform-origin:0 50%;border-radius:2px;background:linear-gradient(90deg,var(--c,color-mix(in oklab,var(--ink) 55%,transparent)) 0 40%,transparent);will-change:transform}
@media(max-width:767px){.sl-pin{gap:16px;padding:24px 16px}.sl-subject{width:min(540px,76vw)}}`,
  html:`<div class="stage"><section class="sl">
  <div class="sl-pin">
    <header class="sl-head">
      <h2>ואן מוכן לטיול, מהאיסוף ועד ההחזרה</h2>
      <p>מקבלים רכב נקי עם ציוד קמפינג מלא ומסלולים מוכנים, ומחזירים בכל אחד מהסניפים.</p>
    </header>
    <div class="sl-track">
      <span class="sl-word" aria-hidden="true">בדרך</span>
      <div class="sl-ghost" aria-hidden="true">
        ${slGhost}
      </div>
      <div class="sl-subject">
        <div class="sl-lines" aria-hidden="true">
          ${slLines}
        </div>
        <img src="../assets/media/real/s12/dusk-camp.webp" width="1000" height="1000" alt="ואן לבן בשטח פתוח בשעת שקיעה וחבורת חברים לידו" loading="lazy" decoding="async">
      </div>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP התמונה במרכז וקצוות הפסים קצרים (במארקאפ)
  const root=document.querySelector(".sl"),track=root.querySelector(".sl-track"),subj=root.querySelector(".sl-subject"),word=root.querySelector(".sl-word"),lines=gsap.utils.toArray(".sl-lines i",root),ghosts=gsap.utils.toArray(".sl-ghost i",root);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const half=()=>subj.offsetWidth/2;
    const GS=[.02,.12,0,.2,.07,.16,.04,.1],GD=[.62,.55,.7,.5,.66,.58,.72,.6];     // התחלה ומשך של כל פס רקע, בחלקי הטיימליין
    root.classList.add("is-live");
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // התמונה נכנסת מימין ומאטה. מהירות בעקומה הזו יורדת ליניארית, ולכן אורך הפסים יורד ב-ease:none
    tl.fromTo(subj,{x:()=>track.offsetWidth/2+half()*1.1},{x:0,duration:1,ease:"power1.out"},0);
    tl.fromTo(word,{xPercent:8},{xPercent:-8,duration:1},0);
    // פסי הרקע חולפים מימין לשמאל על פני כל הבמה במהירות קבועה, ויוצאים לפני שהתמונה נעצרת
    ghosts.forEach((el,i)=>{
      tl.fromTo(el,{x:()=>track.offsetWidth},{x:()=>-el.offsetWidth-40,duration:GD[i],ease:"none"},GS[i]);
    });
    lines.forEach((el,i)=>{
      const v=parseFloat(el.style.getPropertyValue("--v")),g=parseFloat(el.dataset.g);
      tl.fromTo(el,{scaleX:()=>(v+g*window.innerWidth/100)/v},{scaleX:1,duration:.62+(i%6)*.056},0);
    });
    return()=>{root.classList.remove("is-live");gsap.set([subj,word,...lines,...ghosts],{clearProps:"transform"});};
  });
})();`
},
{
  id:"g276", cat:"gsap", name:"טבעות מקטעים שמסתובבות בקצבים שונים", tech:"GSAP · ScrollTrigger · SVG dasharray", status:"מאושר-עין",
  desc:"חמש טבעות מקטעים בגדלים שונים מסתובבות סביב עיגול במרכז, כל אחת בקצב ובכיוון משלה, ובכניסה פורצים מהמרכז קווים דקים החוצה. גלילה מהירה מאיצה את כולן לרגע. לצד הגרפיקה רשימה שמסבירה מה כל טבעת מייצגת.",
  when:"מחזורים שחוזרים בקצבים שונים: תחזוקה, גבייה, ביקורות, טיפולים, עדכוני אתר. חמישה פריטים לכל היותר, כל אחד עם שם וקצב. מתאים לסקשן תהליך או שירותים בעסק שמנהל דברים לאורך זמן. לא מתאים כשצריך להשוות כמויות, כי הטבעות מראות קצב ולא גודל.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם טבעות שבורות למקטעים מסתובבות סביב עיגול מרכזי בכיוונים מנוגדים, עם קווים דקים שפורצים החוצה בהתחלה ועם חוגה של שנתות. נבנה מאפס מהצפייה. **כל טבעת היא `circle` אחד:** `pathLength=360` לכל העיגולים, כך שדפוס המקטעים (`stroke-dasharray`) נכתב במעלות, וסכום כל דפוס הוא בדיוק 360 כדי שהמקטעים ייסגרו בלי פער חסר. הטבעת החיצונית היא חוגת שנתות (72 שנתות, דפוס `1 4`). **הסיבוב:** כל טבעת נעה בטווין אינסופי משלה סביב מרכז ה-SVG (`svgOrigin:\"300 300\"` שנקבע פעם אחת לכל הטבעות לפני כל טווין: אם הוא מופיע רק בחלק מהטוויינים, GSAP מתחיל מפינת התיבה ומשאיר הסטה קבועה במרכז), משך ממוצע של 90 שניות לטבעת החיצונית עד 12 לפנימית, בכיוונים מתחלפים, כך שהחיצונית כמעט עומדת והפנימית ברורה. הטווינים עוצרים כשהגרפיקה מחוץ למסך. **תאוצת הגלילה:** מהירות הגלילה (`getVelocity()`) מוחלקת בטיקר ומכפילה את `timeScale` של כל הסיבובים עד פי שש, ודועכת בחזרה. **פריצת הקווים:** 36 קווים דקים נמשכים מהמרכז החוצה ואז נמחקים החוצה (`strokeDashoffset`), פעם אחת בכניסה, והטבעות נכנסות בקנה מידה בהדרגה. **הערך הסופי:** בלי GSAP ובהפחתת תנועה רואים טבעות סטטיות וקווים נסתרים. **הצבעים** הם accent ו-ink בשקיפויות שונות מהטוקנים, והעיגול המרכזי הוא `div` ב-accent עם `--accent-ink`. **נגישות:** הגרפיקה `aria-hidden`, והמשמעות כולה ברשימה שליד. בחרו עד חמישה פריטים, ולכל טבעת פריט.",
  libs:["gsap","ScrollTrigger"],
  css:`.rn{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto;padding:clamp(32px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--card);color:var(--ink)}
.rn-txt{display:grid;gap:20px;max-width:36rem}
.rn-txt h2{margin:0;font-size:clamp(30px,3.6vw,52px);font-weight:800;line-height:1.1;letter-spacing:-.015em;text-wrap:balance}
.rn-txt>p{margin:0;max-width:40ch;font-size:var(--fs-body);line-height:1.6}
.rn-leg{list-style:none;margin:0;padding:0;display:grid;gap:14px}
.rn-leg li{display:grid;grid-template-columns:28px minmax(0,1fr);align-items:center;gap:14px}
.rn-leg i{display:block;height:10px;border-radius:5px;background:var(--k)}
.rn-leg b{display:block;font-size:var(--fs-body);font-weight:600;line-height:1.35}
.rn-leg small{display:block;font-size:14px;line-height:1.4;color:var(--muted)}
.rn-fig{position:relative;margin:0;justify-self:center;width:min(540px,100%)}
.rn-svg{display:block;width:100%;height:auto;overflow:visible}
.rn-ring{fill:none}
.rn-r0{stroke:color-mix(in oklab,var(--ink) 32%,transparent);stroke-width:12;stroke-dasharray:1 4}
.rn-r1{stroke:var(--accent);stroke-width:16;stroke-dasharray:100 14 60 22 110 54}
.rn-r2{stroke:color-mix(in oklab,var(--ink) 70%,transparent);stroke-width:10;stroke-dasharray:150 20 90 20 60 20}
.rn-r3{stroke:color-mix(in oklab,var(--accent) 55%,transparent);stroke-width:22;stroke-dasharray:70 20}
.rn-r4{stroke:color-mix(in oklab,var(--ink) 40%,transparent);stroke-width:8;stroke-dasharray:200 40 80 40}
.rn-r5{stroke:var(--accent);stroke-width:14;stroke-dasharray:30 10}
.rn-burst line{stroke:var(--accent);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:190;opacity:0}
.rn-core{position:absolute;inset:0;margin:auto;display:grid;place-content:center;gap:2px;width:29%;aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--accent-ink);text-align:center}
.rn-core b{font-size:clamp(15px,1.8vw,24px);font-weight:700;line-height:1.15}
.rn-core small{font-size:clamp(12px,1.2vw,15px);line-height:1.2}
@media(max-width:767px){.rn{grid-template-columns:minmax(0,1fr);padding:32px 20px}.rn-fig{width:min(420px,88vw)}}`,
  html:`<div class="stage"><section class="rn">
  <div class="rn-txt">
    <h2>כל מערכת בבניין נבדקת במחזור משלה</h2>
    <p>אנחנו מנהלים את כל המחזורים בלוח אחד ושולחים לוועד תזכורת לפני כל ביקור, כך שאף בדיקה לא נשכחת.</p>
    <ul class="rn-leg">
      <li style="--k:var(--accent)"><i></i><span><b>ניקיון חדרי מדרגות ותאורה</b><small>כל שבוע</small></span></li>
      <li style="--k:color-mix(in oklab,var(--ink) 40%,transparent)"><i></i><span><b>גינון והשקיה</b><small>כל חודש</small></span></li>
      <li style="--k:color-mix(in oklab,var(--accent) 55%,transparent)"><i></i><span><b>בדיקת מעליות ומערכות כיבוי אש</b><small>כל רבעון</small></span></li>
      <li style="--k:color-mix(in oklab,var(--ink) 70%,transparent)"><i></i><span><b>ניקוי מרזבים ובדיקת הגג</b><small>פעמיים בשנה</small></span></li>
      <li style="--k:var(--accent)"><i></i><span><b>בדיקת תקינות החשמל והמים</b><small>פעם בשנה</small></span></li>
    </ul>
  </div>
  <figure class="rn-fig" aria-hidden="true">
    <svg class="rn-svg" viewBox="0 0 600 600" focusable="false">
      <g class="rn-burst">${rnBurst}</g>
      <circle class="rn-ring rn-r0" cx="300" cy="300" r="284" pathLength="360"/>
      <circle class="rn-ring rn-r1" cx="300" cy="300" r="250" pathLength="360"/>
      <circle class="rn-ring rn-r2" cx="300" cy="300" r="212" pathLength="360"/>
      <circle class="rn-ring rn-r3" cx="300" cy="300" r="178" pathLength="360"/>
      <circle class="rn-ring rn-r4" cx="300" cy="300" r="140" pathLength="360"/>
      <circle class="rn-ring rn-r5" cx="300" cy="300" r="108" pathLength="360"/>
    </svg>
    <div class="rn-core"><b>לוח תחזוקה</b><small>לכל הבניין</small></div>
  </figure>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הטבעות סטטיות והקווים נסתרים (במארקאפ)
  const root=document.querySelector(".rn"),fig=root.querySelector(".rn-fig"),rings=gsap.utils.toArray(".rn-ring",root),lines=gsap.utils.toArray(".rn-burst line",root);
  const SPIN=[[90,1],[36,-1],[28,1],[22,-1],[17,1],[12,-1]];     // [שניות לסיבוב, כיוון] לכל טבעת, מהחיצונית לפנימית
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // מרכז הסיבוב נקבע פעם אחת לכל הטבעות, לפני כל טווין. אם svgOrigin מופיע רק בחלק מהטוויינים,
    // GSAP מתחיל מהפינה של התיבה ומשאיר הסטה קבועה במרכז
    gsap.set(rings,{svgOrigin:"300 300"});
    const spins=rings.map((el,i)=>gsap.to(el,{rotation:SPIN[i][1]*360,duration:SPIN[i][0],ease:"none",repeat:-1,paused:true}));
    // כניסה חד פעמית: הטבעות גדלות אחת אחת, והקווים נמשכים מהמרכז החוצה ואז נמחקים החוצה
    gsap.timeline({scrollTrigger:{trigger:fig,start:"top 78%",once:true}})
      .fromTo(rings,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.9,ease:"power3.out",stagger:.09},0)
      .set(lines,{opacity:.7,strokeDashoffset:190},.15)
      .to(lines,{strokeDashoffset:0,duration:.7,ease:"power2.out",stagger:{each:.012,from:"random"}},.15)
      .to(lines,{strokeDashoffset:-190,duration:.7,ease:"power2.in",stagger:{each:.012,from:"random"}},.75)
      .set(lines,{opacity:0});
    // הסיבובים רצים רק כשהגרפיקה על המסך
    ScrollTrigger.create({trigger:fig,start:"top bottom",end:"bottom top",onToggle:s=>spins.forEach(t=>s.isActive?t.play():t.pause())});
    // גלילה מהירה מאיצה את כל הטבעות לרגע, ודועכת בחזרה לקצב הרגיל
    let boost=1,target=1;
    ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onUpdate:s=>{target=Math.max(target,1+Math.min(5,Math.abs(s.getVelocity())/450));}});
    const tick=()=>{boost+=(target-boost)*.12;target=1+(target-1)*.92;spins.forEach(t=>t.timeScale(boost));};
    gsap.ticker.add(tick);
    return()=>{gsap.ticker.remove(tick);spins.forEach(t=>t.kill());gsap.set(rings,{clearProps:"all"});gsap.set(lines,{clearProps:"opacity,strokeDashoffset"});};
  });
})();`
},
{
  id:"g277", cat:"gsap", name:"קו דהוי שנדלק כניאון", tech:"GSAP · ScrollTrigger · SVG stroke · drop-shadow", status:"מאושר-עין",
  desc:"איור קווי של כוס קפה מצויר לאט על רקע כהה בצבע עמום, ואז נדלק כמו שלט ניאון: הבהוב קצר, עוד הבהוב, וזוהר שמתייצב. ליד האיור הטקסט נשאר קבוע וקריא לכל אורך התנועה.",
  when:"אייקון אחד שמסמל את העסק ושמתאים לערב ולחושך: בית קפה פתוח עד מאוחר, בר, מועדון, חנות לילה, מסעדה. פעם אחת בעמוד, בסקשן סיום או בהירו. לא מתאים לעסק שמדבר בשקט, כי הזוהר מושך תשומת לב.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם קו דק עמום, דמות או כותרת, נדלק בצבע זוהר על רקע כהה. נבנה מאפס מהצפייה. **הציור:** כל קו באייקון הוא `path` עם `pathLength=1`, ולכן `stroke-dashoffset` מ-1 ל-0 מצייר אותו בלי למדוד אורכים. **ההדלקה היא משתנה אחד:** `--lit` בין 0 ל-1 על האייקון. הצבע הוא `color-mix` בין צבע ניאון (`--neon`, תערובת של accent עם הרקע) לצבע כבוי (`--dim`) לפי `--lit`, והזוהר הוא שני `drop-shadow` שהרדיוס והשקיפות שלהם נגזרים מאותו משתנה. לכן שינוי ההדלקה הוא טווין אחד, והכל נשאר מחובר לטוקנים של העור. **הבהוב:** שני הבהובים בלבד אחרי שהציור נגמר, והפער בין שתי הדלקות עולה על 0.7 שנייה, כלומר פחות מפעמיים בשנייה, הרבה מתחת לגבול של שלוש. אל תוסיפו הבהובים: מעבר לגבול זה הוא מפריע לאנשים עם רגישות לאור. **הערך הסופי:** המארקאפ הוא האייקון הדלוק (`--lit:1`, הקו מצויר במלואו). בלי GSAP ובהפחתת תנועה זה מה שרואים. **צבע:** משטח הרקע הוא `var(--ink)` והטקסט `var(--bg)`, כך שהוא מתהפך בעור כהה. הניאון הוא תערובת של 60% accent, ובעור שבו ה-accent כהה מאוד הוא עדיין נראה, אבל כדאי לבדוק אותו. **נגישות:** האיור `aria-hidden`, והכל כתוב בטקסט. אין כאן טקסט בצבע ניאון, כי ניאון על כהה לא תמיד מגיע ל-AA.",
  libs:["gsap","ScrollTrigger"],
  css:`.nl{position:relative;isolation:isolate;overflow:clip;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:clamp(32px,6vw,96px);min-height:clamp(440px,44vw,560px);padding:clamp(40px,6vw,96px);border-radius:clamp(20px,2.4vw,32px);background:var(--ink);color:var(--bg)}
.nl-txt{display:grid;gap:18px;max-width:34rem}
.nl-txt h2{margin:0;font-size:clamp(34px,4.6vw,66px);font-weight:800;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.nl-txt p{margin:0;max-width:38ch;font-size:var(--fs-body);line-height:1.6}
.nl-txt .nl-k{font-size:15px;font-weight:600;letter-spacing:.02em}
.nl-txt .nl-h{font-weight:600}
.nl-ic{--neon:color-mix(in oklab,var(--accent) 60%,var(--bg));--dim:color-mix(in oklab,var(--bg) 30%,var(--ink));--lit:1;display:block;width:clamp(200px,26vw,340px);height:auto;fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;
  stroke:color-mix(in oklab,var(--neon) calc(var(--lit) * 100%),var(--dim));
  filter:drop-shadow(0 0 calc(var(--lit) * 7px) color-mix(in oklab,var(--neon) calc(var(--lit) * 90%),transparent)) drop-shadow(0 0 calc(var(--lit) * 22px) color-mix(in oklab,var(--neon) calc(var(--lit) * 55%),transparent))}
.nl-ic path{stroke-dasharray:1 1;stroke-dashoffset:0}
@media(max-width:767px){.nl{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center;padding:40px 20px}.nl-txt{justify-items:center}.nl-ic{order:-1}}`,
  html:`<div class="stage"><section class="nl">
  <div class="nl-txt">
    <p class="nl-k">בית קפה שכונתי</p>
    <h2>פתוחים עד חצות, כל ערב</h2>
    <p>אחרי תשע בערב המטבח עובר לתפריט קל של כריכים ומאפים, והקפה ממשיך לצאת מהמכונה עד הסגירה. אפשר לשבת עם ספר או עם חברים.</p>
    <p class="nl-h">ימים א׳ עד ה׳: 07:00 עד 24:00, ובשישי עד 16:00</p>
  </div>
  <svg class="nl-ic" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
    <path pathLength="1" d="M52 98H164V140C164 166 144 184 118 184H98C72 184 52 166 52 140Z"/>
    <path pathLength="1" d="M164 110H178C192 110 198 120 198 130C198 142 190 152 176 152H160"/>
    <path pathLength="1" d="M36 206H180"/>
    <path pathLength="1" d="M88 76C76 66 100 56 88 42"/>
    <path pathLength="1" d="M114 80C102 70 126 60 114 44"/>
    <path pathLength="1" d="M140 76C128 66 152 56 140 42"/>
  </svg>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP האייקון דלוק ומצויר במלואו (במארקאפ)
  const root=document.querySelector(".nl"),ic=root.querySelector(".nl-ic"),paths=gsap.utils.toArray("path",ic);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(ic,{"--lit":0});gsap.set(paths,{strokeDashoffset:1});
    // ציור בצבע עמום, ואז שני הבהובים בלבד. ההדלקות מרוחקות יותר מ-0.7 שנייה זו מזו: פחות משתי הבהובים בשנייה
    gsap.timeline({scrollTrigger:{trigger:root,start:"top 72%",once:true}})
      .to(paths,{strokeDashoffset:0,duration:1.1,ease:"power2.inOut",stagger:.16})
      .to(ic,{"--lit":.85,duration:.1,ease:"none"},"+=.25")
      .to(ic,{"--lit":.18,duration:.06,ease:"none"},"+=.2")
      .to(ic,{"--lit":1,duration:.1,ease:"none"},"+=.34")
      .to(ic,{"--lit":.35,duration:.06,ease:"none"},"+=.3")
      .to(ic,{"--lit":1,duration:.6,ease:"power2.out"},"+=.4");
    return()=>{gsap.set(ic,{clearProps:"--lit"});gsap.set(paths,{clearProps:"strokeDashoffset"});};
  });
})();`
},
{
  id:"g278", cat:"gsap", name:"ספרה ענקית בקו מתאר שמתמלאת", tech:"GSAP · ScrollTrigger scrub · text-stroke · background-clip", status:"מאושר-עין",
  desc:"ספרה ענקית נראית בהתחלה רק כקו מתאר חלש, ואז הקו מתחזק והצבע עולה בתוכה מלמטה למעלה בקצב הגלילה, עד שהיא מלאה. ליד הספרה הטקסט שמסביר מה היא מונה, ואפשר לקרוא אותו לכל אורך התנועה.",
  when:"נתון אחד גדול שמוכיח משהו: שנות ניסיון, מספר לקוחות, פרויקטים שנמסרו. סקשן הוכחה או אודות, פעם אחת בעמוד. עובד טוב עם מספר של שתיים או שלוש ספרות שמרשים בפני עצמו, ופחות עם מספר שצריך הסבר כדי להתרשם ממנו.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו ספרה ענקית בקו מתאר עומדת ליד תווית ונמלאת בהדרגה. נבנה מאפס מהצפייה. **הספרה היא טקסט אמיתי:** `color:transparent`, קו מתאר מ-`-webkit-text-stroke` בצבע ה-ink, ומילוי מגרדיאנט אנכי בצבע ה-accent שנחתך לצורת האות עם `background-clip:text`. **המילוי הוא מיקום רקע:** הגרדיאנט גבוה פי 2.2 מהספרה, חצאו התחתון צבוע וחצאו העליון שקוף עם קצה רך באמצע, ו-`--p` (בין 0 ל-1) מזיז אותו מלמעלה למטה דרך `background-position`. כך הצבע עולה בתוך האות בלי לחשב אחוזים בתוך הגרדיאנט עצמו. **משתנה שני:** `--so` הוא עוצמת קו המתאר (מ-20% ל-100%). טיימליין אחד מקושר לגלילה (`scrub`) מזיז את שניהם: הקו מתחזק ברבע הראשון, והמילוי עולה לאורך כולו ב-`power1.inOut`. **נעיצה קצרה:** הסקשן נעוץ (`pin:true`) כשהוא מגיע למרכז המסך ונשאר שם 75% מגובה המסך, וכל המילוי קורה בזמן הנעיצה. כך הספרה נכנסת למסך כקו בלבד, באמצע הדרך היא חצי מלאה, ובסוף מלאה לפני שהעמוד ממשיך. בלי הנעיצה המילוי היה נגמר כשהספרה עוד בדרך למרכז. הנעיצה נוצרת רק בתוך `matchMedia` ולכן בלי GSAP ובהפחתת תנועה אין מסלול גלילה מיותר. **הערך הסופי במארקאפ:** `--p:1` ו-`--so:1`, כלומר ספרה מלאה עם קו מלא. זה מה שרואים בלי GSAP ובהפחתת תנועה. **הספרה לא סופרת ממספר למספר:** זה ההבדל מ-g157, שבו המספר והרשת סופרים יחד. כאן המספר הסופי קבוע, והמילוי הוא שמראה התקדמות. **גודל ומשקל:** המשקל הכבד (900) נותן שטח מילוי לאות, ובמשקל דק הקו והמילוי כמעט לא נראים. **נגישות:** הספרה המצוירת `aria-hidden`, והמספר מופיע גם בכותרת, בטקסט מוסתר חזותית, כך שקורא מסך קורא אותו פעם אחת. **באתר משמאל לימין** מחליפים רק את סדר העמודות. הספרות נשארות משמאל לימין בשני הכיוונים (`direction:ltr`).",
  libs:["gsap","ScrollTrigger"],
  css:`.ol{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);max-width:1040px;margin-inline:auto;padding-block:6vh 18vh;color:var(--ink)}
.ol-n{--p:1;--so:1;margin:0;direction:ltr;font-size:clamp(176px,30vw,420px);font-weight:900;line-height:.82;letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:transparent;
  -webkit-text-stroke:clamp(2px,.5vw,5px) color-mix(in oklab,var(--ink) calc(var(--so) * 100%),transparent);
  background:linear-gradient(to top,var(--accent) 0 45.5%,transparent 54.5%) 0 calc(var(--p) * 100%) / 100% 220% no-repeat;-webkit-background-clip:text;background-clip:text}
.ol-txt{display:grid;gap:14px;max-width:30ch}
.ol-txt h2{margin:0;font-size:clamp(26px,3vw,44px);font-weight:700;line-height:1.15;text-wrap:balance}
.ol-txt p{margin:0;font-size:var(--fs-body);line-height:1.6}
.ol .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.ol{grid-template-columns:minmax(0,1fr);justify-items:center;text-align:center}.ol-txt{justify-items:center}}`,
  html:`<div class="stage"><section class="ol">
  <p class="ol-n" aria-hidden="true">15</p>
  <div class="ol-txt">
    <h2><span class="sr-only">15 </span>שנים של שיפוצי דירות בתל אביב</h2>
    <p>ליווינו כמה מאות דירות מהתכנון ועד המפתח, ורובן הגיעו אלינו בהמלצה של שכנים או של לקוחות קודמים.</p>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הספרה מלאה והקו מלא (במארקאפ)
  const num=document.querySelector(".ol-n");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // הסקשן נעוץ קצר במרכז המסך, והמילוי עולה לאורך כל הנעיצה: בכניסה רק קו, באמצע חצי, ביציאה מלא
    gsap.timeline({scrollTrigger:{trigger:".ol",start:"center center",end:"+=75%",pin:true,scrub:.4}})
      .fromTo(num,{"--so":.2},{"--so":1,duration:.25,ease:"none"},0)
      .fromTo(num,{"--p":0},{"--p":1,duration:1,ease:"power1.inOut"},0);
    return()=>{gsap.set(num,{clearProps:"--p,--so"});};
  });
})();`
},
{
  id:"css45", cat:"css", name:"פסי מואר מסתובבים זה מול זה", tech:"CSS · repeating-conic-gradient · rotate", status:"מאושר-עין", runway:false,
  desc:"שתי שכבות של פסים דקים שיוצאים ממרכזים סמוכים מסתובבות לאט בכיוונים הפוכים. החפיפה ביניהן יוצרת דוגמת מואר שמשתנה כל הזמן, בניגודיות נמוכה, כך שהכותרת שמעליה נשארת ברורה.",
  when:"רקע לכותרת גדולה בסקשן פתיחה או הרשמה, בעיקר באתר של סטודיו, קורס או אירוע שמרשה לעצמו להיראות גרפי. עובד מאחורי כותרת ופסקה קצרה אחת. לא מתאים מאחורי טופס או טקסט ארוך, ולא באתר שקט.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו שתי קבוצות פסים רדיאליים בשני צבעים מסתובבות זו מול זו ויוצרות מואר. נבנה מאפס מהצפייה. **CSS בלבד:** שתי שכבות `repeating-conic-gradient`, כל אחת בגודל כפול מהסקשן, ממורכזת עם `translate` ומסתובבת עם התכונה `rotate` (140 שניות לסיבוב בכיוון אחד ו-110 בכיוון ההפוך). **מה יוצר את המואר:** שני דברים ביחד. התקופה של הפסים שונה במעט (6 מעלות מול 5.2), ולכן החפיפה מתעבה ומתדללת לסירוגין, והמרכזים של השכבות מוזזים מעט זה מזה (`left` ו-`top` של השכבה השנייה), ולכן נוצרים קשתות ולא רק קרניים. אם מבטלים אחד מהשניים הדוגמה נראית כקרניים סתם. **קריאות:** שכבת ה-accent ב-12% ושכבת ה-ink ב-6%, ומסכה רדיאלית מדללת אותן במרכז, מאחורי הכותרת, ובקצוות. לכותרת יש הילה בצבע הכרטיס, והטקסט כולו בצבע ה-ink: טקסט muted על הדוגמה נופל מתחת ל-AA. **להגביר או להחליש:** אחוזי הצבע ב-`--ca` ו-`--cb`. מעל 20% הדוגמה מתחילה להתחרות בכותרת. **הפחתת תנועה:** הסיבוב נעצר והדוגמה עומדת. **ביצועים:** שתי שכבות שמסתובבות על ה-GPU (`transform` בלבד), בלי JS. **באתר משמאל לימין** אין מה להפוך. **נגישות:** השכבות `aria-hidden`.",
  libs:[],
  css:`.mo{--ca:color-mix(in oklab,var(--accent) 12%,transparent);--cb:color-mix(in oklab,var(--ink) 6%,transparent);position:relative;isolation:isolate;overflow:clip;display:grid;place-items:center;min-height:clamp(480px,50vw,640px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--card);color:var(--ink);text-align:center}
.mo-a,.mo-b{position:absolute;z-index:-1;width:200%;aspect-ratio:1;translate:-50% -50%;pointer-events:none;will-change:transform;
  -webkit-mask-image:radial-gradient(closest-side,transparent 3%,#000 30%,transparent 100%);mask-image:radial-gradient(closest-side,transparent 3%,#000 30%,transparent 100%)}
.mo-a{left:50%;top:50%;background:repeating-conic-gradient(var(--ca) 0 3deg,transparent 3deg 6deg);animation:mo-cw 140s linear infinite}
.mo-b{left:57%;top:46%;background:repeating-conic-gradient(var(--cb) 0 2.6deg,transparent 2.6deg 5.2deg);animation:mo-ccw 110s linear infinite}
@keyframes mo-cw{to{rotate:360deg}}
@keyframes mo-ccw{to{rotate:-360deg}}
.mo-txt{display:grid;justify-items:center;gap:18px;max-width:44rem;text-shadow:0 0 .5em var(--card),0 0 1.1em var(--card)}
.mo-txt h2{margin:0;font-size:clamp(34px,5vw,72px);font-weight:800;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.mo-txt p{margin:0;max-width:38ch;font-size:var(--fs-body);line-height:1.6}
.mo-txt .mo-k{font-size:15px;font-weight:600}
.mo-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none;text-shadow:none}
@media(prefers-reduced-motion:reduce){.mo-a,.mo-b{animation:none}}
@media(max-width:767px){.mo{padding:48px 20px}}`,
  html:`<div class="stage"><section class="mo">
  <span class="mo-a" aria-hidden="true"></span><span class="mo-b" aria-hidden="true"></span>
  <div class="mo-txt">
    <p class="mo-k">קורס צילום, מחזור נובמבר</p>
    <h2>ללמוד לצלם בארבעה ערבים בתל אביב</h2>
    <p>קבוצה של עד שמונה משתתפים עם מרצה אחד. מביאים מצלמה משלכם, ובערב האחרון יוצאים לצלם ברחוב.</p>
    <a class="mo-cta" href="#">להרשמה לקורס</a>
  </div>
</section></div>`,
  js:``
},
{
  id:"css46", cat:"css", name:"פסי סריקה וגרעין מעל הסקשן", tech:"CSS · repeating-linear-gradient · mask · keyframes", status:"מאושר-עין", runway:false,
  desc:"מעל סקשן רגיל נפרשים פסי סריקה עדינים וגרעין נייר שזז בקפיצות קטנות, ובמרווחים ארוכים חולף פס בהיר לאורך הסקשן. התוכן שמתחת נשאר חד, והסקשן מקבל מראה של מסך ישן או של דפוס.",
  when:"הירו או רצועה בעסק עם אופי רטרו: חנות תקליטים, קומיקס, גיימינג, בית דפוס, אירוע נוסטלגי. שכבה אחת על הסקשן, בלי תוכן משלה. לא מתאים לעסק רפואי, פיננסי או משפטי, ולא על טקסט קטן.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) של שקופית חמה עם פסי סריקה וגרעין נייר, שבה טקסט נחתך בקצה המסגרת. נבנה מאפס מהצפייה. **CSS בלבד, שתי פסאודו-אלמנטים ופס אחד:** `::before` הוא פסי הסריקה (`repeating-linear-gradient` של קו בן פיקסל כל 3 פיקסלים) שמוזזים בדיוק תקופה אחת (3px) בשלושה צעדים, כך שהלולאה חלקה. `::after` הוא הגרעין: אריח SVG קטן של `feTurbulence` שמשמש **כמסכה**, והצבע שלו הוא `var(--ink)` ולכן הוא מתאים לכל עור, כולל כהה. הוא זז בקפיצות של 2.4 שניות לסיבוב, שש קפיצות, כלומר פחות משלוש בשנייה. הפס הבהיר (`.cr-roll`) חולף בתשע שניות. **הכל עם `pointer-events:none`** ומעל התוכן, אבל בניגודיות נמוכה: ה-ink בפסים ב-6%, בגרעין ב-9% ובפס החולף ב-4%, והטקסט עצמו בצבע ה-ink. **המילה הגדולה** בתחתית נחתכת בקצה הסקשן (`overflow:clip`), ומהבהבת פעמיים בשש שניות בשקיפות. **להגביר או להחליש:** שלוש האחוזים האלה. מעל 14% הגרעין מתחיל לפגוע בקריאות. **הפחתת תנועה:** כל האנימציות נעצרות והשכבות נשארות סטטיות. **ביצועים:** הזזות `transform` ו-`translate` בלבד, והאריח בן 160px. **נגישות:** המילה והפס `aria-hidden`, והשכבות הן פסאודו-אלמנטים.",
  libs:[],
  css:`.cr{--grain:${GRAIN};position:relative;isolation:isolate;overflow:clip;display:grid;align-content:center;justify-items:start;min-height:clamp(480px,52vw,660px);padding:clamp(40px,6vw,96px);border-radius:clamp(20px,2.4vw,32px);background:color-mix(in oklab,var(--accent) 9%,var(--card));color:var(--ink)}
.cr-txt{position:relative;z-index:1;display:grid;gap:18px;justify-items:start;max-width:40rem}
.cr-txt h2{margin:0;font-size:clamp(34px,4.8vw,68px);font-weight:800;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.cr-txt p{margin:0;max-width:38ch;font-size:var(--fs-body);line-height:1.6}
.cr-txt .cr-k{font-size:15px;font-weight:600;letter-spacing:.02em}
.cr-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.cr-word{position:absolute;inset-inline:0;bottom:0;z-index:0;translate:0 36%;font-size:clamp(120px,21vw,300px);font-weight:900;line-height:1;white-space:nowrap;text-align:center;color:color-mix(in oklab,var(--ink) 8%,transparent);pointer-events:none;animation:cr-fl 6s steps(1) infinite}
@keyframes cr-fl{0%,100%{opacity:1}30%{opacity:.7}34%{opacity:1}70%{opacity:.8}73%{opacity:1}}
/* פסי סריקה: קו בן פיקסל כל 3 פיקסלים, מוזזים תקופה אחת בשלושה צעדים (לולאה חלקה) */
.cr::before{content:"";position:absolute;inset:-6px 0;z-index:2;pointer-events:none;background:repeating-linear-gradient(to bottom,color-mix(in oklab,var(--ink) 6%,transparent) 0 1px,transparent 1px 3px);animation:cr-scan 1.2s steps(3) infinite}
@keyframes cr-scan{to{transform:translateY(3px)}}
/* גרעין: אריח SVG כמסכה, בצבע ה-ink, שזז בקפיצות */
.cr::after{content:"";position:absolute;inset:-12%;z-index:2;pointer-events:none;background:var(--ink);opacity:.09;-webkit-mask:var(--grain) 0 0 / 160px 160px;mask:var(--grain) 0 0 / 160px 160px;animation:cr-grain 2.4s steps(1) infinite}
@keyframes cr-grain{0%{translate:0 0}17%{translate:-3% 2%}34%{translate:2% -4%}50%{translate:-4% -2%}67%{translate:3% 3%}84%{translate:-1% 4%}}
.cr-roll{position:absolute;inset-inline:0;top:0;z-index:2;height:28%;pointer-events:none;background:linear-gradient(to bottom,transparent,color-mix(in oklab,var(--ink) 4%,transparent) 50%,transparent);animation:cr-roll 9s linear infinite}
@keyframes cr-roll{from{transform:translateY(-110%)}to{transform:translateY(420%)}}
@media(prefers-reduced-motion:reduce){.cr::before,.cr::after,.cr-roll,.cr-word{animation:none}}
@media(max-width:767px){.cr{padding:48px 20px}}`,
  html:`<div class="stage"><section class="cr">
  <span class="cr-word" aria-hidden="true">תקליטים</span>
  <i class="cr-roll" aria-hidden="true"></i>
  <div class="cr-txt">
    <p class="cr-k">חנות תקליטים בשכונה</p>
    <h2>תקליטים משומשים, כל אחד נבדק לפני שהוא עולה למדף</h2>
    <p>מנקים כל תקליט, מקשיבים לו ומסמנים את מצבו על הכיס. אפשר לבוא להקשיב בחנות לפני שמחליטים.</p>
    <a class="cr-cta" href="#">מה הגיע השבוע</a>
  </div>
</section></div>`,
  js:``
},
{
  id:"b104", cat:"behavior", name:"הדפס כפול עם סטייה", tech:"CSS · mix-blend-mode · pointer · custom properties", status:"מאושר-עין", runway:false,
  desc:"כותרת וצורות מודפסות כמו בדפוס בשני צבעים שלא התיישר בדיוק: מאחורי הכותרת השחורה נראית הדפסה שנייה בצבע המותג עם קווי מילוי, והעיגולים מתכהים איפה שהם חופפים. כשהעכבר זז על הסקשן, ההדפסה השנייה זזה איתו ומגדילה את הסטייה.",
  when:"פוסטר, כרטיס פתיחה או אירוע של סטודיו, בית דפוס, חנות עיצוב, גלריה או פסטיבל. כותרת אחת וצורות גדולות בסקשן אחד. עובד על רקע בהיר בלבד: על רקע כהה החפיפה נבלעת. במסך מגע נשארת סטייה קבועה, והמהלך עדיין נראה.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו טקסט וצורות מודפסים בסגנון ריזו, עם הדפסה שנייה מוזזת, קווי מילוי וגרעין, שבה החפיפות כהות יותר. נבנה מאפס מהצפייה. **שתי לוחות הדפסה:** לוח ראשון בצבע ה-ink (הכותרת, והעיגול הראשון ב-accent) ולוח שני בצבע אחר (העיגול המשורטט והעותק של הכותרת, בקווי מילוי באלכסון). **העותק של הכותרת** הוא `span` נוסף עם `aria-hidden`, ממוקם מתחת לטקסט האמיתי, בצבע accent עם קווי מילוי (`repeating-linear-gradient` שנחתך לאות עם `background-clip:text`), ומוזז בכמה פיקסלים. הכותרת עצמה נשארת טקסט אחד ברור. **החפיפה:** `mix-blend-mode:multiply` על העיגולים, ולכן איפה שהם נחתכים הצבע מתכהה כמו בדפוס אמיתי. זה עובד על רקע בהיר, ובעור כהה החפיפה נבלעת ברקע. **הגרעין** הוא אריח SVG קטן (`feTurbulence`) שמשמש כמסכה על שכבה בצבע הכרטיס: הוא בוקע חורים קטנים בצבע, כמו נייר שהדיו לא תפס בו. **העכבר:** `pointermove` בקריאה אחת לפריים כותב את `--dx` ו-`--dy` (בין מינוס אחד לאחד) על הסקשן, והלוח השני נע ב-`translate` לפי שניהם, עם מעבר קצר של 0.5 שנייה בעקומה החתומה, ונחזר למקום ביציאה. **ללא תנועה:** בהפחתת תנועה אין האזנה לעכבר ונשארת הסטייה הקבועה. **בטלפון** העיגולים מעל הטקסט והכל סטטי. **באתר משמאל לימין** מחליפים את הצד של העיגולים. **נגישות:** העיגולים והעותק של הכותרת `aria-hidden`.",
  libs:[],
  css:`.rz{--grain:${GRAIN};--dx:0;--dy:0;position:relative;isolation:isolate;overflow:clip;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,4vw,64px);min-height:clamp(520px,52vw,680px);padding:clamp(40px,6vw,96px);border-radius:clamp(20px,2.4vw,32px);background:var(--card);color:var(--ink)}
.rz-art{position:relative;isolation:isolate;aspect-ratio:1;width:min(100%,520px);justify-self:center}
.rz-c1,.rz-c2{position:absolute;display:block;border-radius:50%;mix-blend-mode:multiply}
.rz-c1{left:0;top:0;width:76%;aspect-ratio:1;background:var(--accent)}
.rz-c2{left:30%;top:28%;width:70%;aspect-ratio:1;background:repeating-linear-gradient(135deg,color-mix(in oklab,var(--ink) 62%,var(--card)) 0 3px,transparent 3px 8px);translate:calc(var(--dx) * 16px) calc(var(--dy) * 12px);transition:translate .5s cubic-bezier(.2,.6,.2,1)}
.rz-art::after{content:"";position:absolute;inset:0;background:var(--card);opacity:.6;-webkit-mask:var(--grain) 0 0 / 160px 160px;mask:var(--grain) 0 0 / 160px 160px}
.rz-txt{display:grid;gap:18px;justify-items:start;max-width:30rem}
.rz-txt .rz-k{margin:0;font-size:15px;font-weight:600;letter-spacing:.02em}
.rz-h{position:relative;margin:0;font-size:clamp(34px,4.4vw,62px);font-weight:900;line-height:1.08;letter-spacing:-.02em;text-wrap:balance}
.rz-t{position:relative;display:block}
.rz-t2{position:absolute;inset:0;display:block;color:transparent;background:repeating-linear-gradient(135deg,var(--accent) 0 2px,transparent 2px 5px);-webkit-background-clip:text;background-clip:text;translate:calc(5px + var(--dx) * 9px) calc(4px + var(--dy) * 7px);transition:translate .5s cubic-bezier(.2,.6,.2,1)}
.rz-txt p{margin:0;max-width:34ch;font-size:var(--fs-body);line-height:1.6}
.rz-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:600;text-decoration:none}
@media(prefers-reduced-motion:reduce){.rz-c2,.rz-t2{transition:none}}
@media(max-width:767px){.rz{grid-template-columns:minmax(0,1fr);padding:40px 20px}.rz-art{order:-1;width:min(300px,76vw)}}`,
  html:`<div class="stage"><section class="rz" data-rz>
  <div class="rz-txt">
    <p class="rz-k">סדנת הדפס בשכונה</p>
    <h2 class="rz-h"><span class="rz-t2" aria-hidden="true">הדפסה על נייר, בשני צבעים בלבד</span><span class="rz-t">הדפסה על נייר, בשני צבעים בלבד</span></h2>
    <p>בסדנה של שלוש שעות מכינים פוסטר בהדפס ריזו: בוחרים שני צבעים, מדפיסים כל שכבה בנפרד ורואים איך הם נחתכים. כל משתתף יוצא עם חמישה עותקים.</p>
    <a class="rz-cta" href="#">לסדנה הקרובה</a>
  </div>
  <div class="rz-art" aria-hidden="true"><span class="rz-c1"></span><span class="rz-c2"></span></div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-rz]");
  const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(!root||mq.matches)return;                  // בהפחתת תנועה נשארת הסטייה הקבועה
  let raf=0,nx=0,ny=0;
  const apply=()=>{raf=0;root.style.setProperty("--dx",nx.toFixed(3));root.style.setProperty("--dy",ny.toFixed(3));};
  const queue=()=>{if(!raf)raf=requestAnimationFrame(apply);};
  const move=e=>{
    const r=root.getBoundingClientRect();
    nx=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));
    ny=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));
    queue();
  };
  const leave=()=>{nx=0;ny=0;queue();};
  root.addEventListener("pointermove",move);
  root.addEventListener("pointerleave",leave);
  mq.addEventListener("change",e=>{if(e.matches){root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",leave);leave();}});
})();`
}
];
