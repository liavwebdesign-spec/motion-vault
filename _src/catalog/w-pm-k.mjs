// שבעה מהלכים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. בקובץ הזה צורות, דוגמאות והרכבים: ריצוף קשתות, מנהרת ריבועים, לוגו מתווים,
// נוף שעובר משקיעה ללילה, הרכב צורות, מישורי נקודות ופסי אזהרה.
// הכול נבנה מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.

// מחולל פסאודו-אקראי עם זרע קבוע: המארקאפ הסטטי (ריצוף, כוכבים) זהה בכל בנייה
const mk = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

// b99: ריצוף של 24 על 12 אריחים, בכל אחד שתי קשתות של רבע עיגול. כיוון 0: פינות עליונה-ימנית ותחתונה-שמאלית של האריח בציור (TL ו-BR), כיוון 1: שתי הפינות האחרות
const TC_C = 24, TC_R = 12, tcR = mk(2610);
const tcSeg = (c, r, o) => o
  ? `M${c + .5} ${r}a.5 .5 0 0 0 .5 .5M${c} ${r + .5}a.5 .5 0 0 1 .5 .5`
  : `M${c + .5} ${r}a.5 .5 0 0 1 -.5 .5M${c + .5} ${r + 1}a.5 .5 0 0 1 .5 -.5`;
let tcBits = "", tcBase = "", tcAcc = "";
for (let r = 0; r < TC_R; r++) for (let c = 0; c < TC_C; c++) { const o = tcR() < .5 ? 0 : 1; tcBits += o; tcBase += tcSeg(c, r, o); }
const tcIdx = [];
while (tcIdx.length < 16) { const k = Math.floor(tcR() * TC_C * TC_R); if (!tcIdx.includes(k)) tcIdx.push(k); }
tcIdx.sort((a, b) => a - b).forEach(k => { tcAcc += tcSeg(k % TC_C, Math.floor(k / TC_C), +tcBits[k]); });

// g261: שמונה ריבועים מקוננים, גודל 150% כפול 0.78 בחזקת המקום, זווית סופית של שבע מעלות פחות בכל שכבה פנימה
let ntLayers = "";
for (let i = 0; i < 8; i++) ntLayers += `<i class="nt-l" style="--k:${Math.pow(.78, i).toFixed(3)};--r:${(7 - i) * 7}deg">${i === 7 ? `<span class="nt-word">לעומק</span>` : ""}</i>`;

// g262: כוכבים בחלק העליון של הנוף
const lsR = mk(1822);
let lsStars = "";
for (let i = 0; i < 46; i++) {
  const x = (lsR() * 96 + 2).toFixed(1), y = (lsR() * 58 + 2).toFixed(1), z = lsR() < .2 ? 3 : 2, o = (.45 + lsR() * .55).toFixed(2), d = (lsR() * 4).toFixed(1);
  lsStars += `<i class="ls-star${i % 4 === 0 ? " tw" : ""}" style="left:${x}%;top:${y}%;width:${z}px;height:${z}px;opacity:${o};--d:-${d}s"></i>`;
}

// g263: רשת 4 על 4 של אריחים קטנים בפינה העליונה של הלוח
let bhTiles = "";
for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) bhTiles += `<rect class="bh-t ${(i * 3 + j) % 5 === 0 ? "a" : "b"}" x="${(66 + i * 6.7).toFixed(1)}" y="${(8 + j * 6.7).toFixed(1)}" width="5.5" height="5.5" rx=".8"/>`;

export default [
{
  id:"b99", cat:"behavior", name:"רשת אריחי קשתות שמתהפכים בגל", tech:"Canvas 2D · pointer", status:"מאושר-עין", runway:false,
  desc:"רקע של 288 אריחים, ובכל אחד שתי קשתות שמתחברות לקווים רצופים, כמו מבוך. לחיצה או נגיעה בנקודה מפעילה גל: האריחים מסתובבים רבע סיבוב אחד אחרי השני, לפי המרחק מהנקודה, ובכל אריח שהגל נוגע בו הקשתות נצבעות לרגע בצבע המותג ואז דוהות. כשאף אחד לא נוגע, גל חדש יוצא מנקודה אחרת כל כמה שניות והמבוך מסדר את עצמו מחדש.",
  when:"פתיחה או סגירה של עמוד שרוצה רקע עם אופי: סדנה, סטודיו עיצוב, מותג של חומרים, אריחים או טקסטיל. הכותרת יושבת על לוח אטום באמצע והרקע עצמו לא נושא תוכן. פעם אחת בעמוד, ולא בעמוד שיש בו כבר רקע נע.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) עם מסך מלא של אריחים ריבועיים, בכל אחד קשת של רבע עיגול בקווים לבנים על שחור, וגל של סיבובי 90 מעלות שעובר על האריחים ומצבע את אלה שנגע בהם בצבע המבטא. נבנה מאפס מהצפייה. **הריצוף:** רשת קבועה של 24 על 12 אריחים שנוצרה פעם אחת מזרע קבוע, וכל אריח הוא אחד משני כיוונים (קשתות בשתי פינות נגדיות, או בשתי הפינות האחרות). סיבוב של 90 מעלות הופך כיוון לכיוון, ולכן אריח שמסתובב נוחת בדיוק על הצורה האחרת, בלי קפיצה. **בלי JS ובהפחתת תנועה** רואים SVG אחד עם כל הקשתות ו-16 אריחים בצבע המבטא, וזה המצב הסופי. הקנבס מחליף אותו בהצלבה כשהרקע נכנס למסך ומצייר את אותו ריצוף באותו קנה מידה (`slice`, כמו `cover`), כך שאין קפיצה בין השניים. **הגל:** כל אריח בטווח (עד 14 אריחים) מתחיל להסתובב באיחור של 70 מילישניות כפול המרחק מהנקודה, ב-560 מילישניות עם `cubic-in-out`, וצבע המבטא עולה ב-120 מילישניות ודוהה בכשנייה וחצי. אריח שכבר מסתובב לא מקבל גל נוסף. **מה מפעיל גל:** לחיצה או נגיעה מפעילה גל גדול, תנועת עכבר מפעילה גל קטן (רדיוס של שני אריחים) בהפרש של 140 מילישניות לפחות, וכל 3.6 שניות יוצא גל לבד מנקודה שנודדת. הציור רץ רק כשיש אריח שמסתובב או צבע שדועך, ולא בכל פריים. **קל:** קנבס אחד, מסלול אחד לכל הקשתות הרגילות ומסלול נפרד לכל אריח צבוע, DPR עד 2 (עד 1.5 בטלפון), עוצר מחוץ למסך ובטאב מוסתר. הצבעים נקראים בזמן ריצה מ-`--ink`, `--card` ו-`--accent`, ולכן הרקע יורש כל עור. **RTL:** הגל לא תלוי בכיוון, ובאתר LTR אין מה להחליף. **נגישות:** הרקע מוסתר מקורא מסך, והכותרת והכפתור יושבים בלוח אטום עם ניגודיות מלאה. `touch-action: pan-y` משאיר לגלילה בטלפון את הכיוון האנכי.",
  libs:[],
  css:`.tc{max-width:1100px;margin-inline:auto}
.tc-field{position:relative;isolation:isolate;display:grid;place-items:center;min-height:clamp(400px,66vh,660px);padding:24px;overflow:hidden;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);touch-action:pan-y}
/* בלי JS ובהפחתת תנועה: ה-SVG הסטטי. כשהקנבס נחשף הוא מחליף אותו בהצלבה, באותו ריצוף ובאותו קנה מידה */
.tc-svg,.tc-cv{position:absolute;inset:0;z-index:-1;width:100%;height:100%;color:color-mix(in oklab,var(--ink) 24%,var(--card));transition:opacity .5s cubic-bezier(.2,.6,.2,1)}
.tc-svg path{fill:none;stroke-width:.12}
.tc-p0{stroke:currentColor}
.tc-p1{stroke:var(--accent)}
.tc-cv{opacity:0}
.tc-field.is-on .tc-svg{opacity:0}
.tc-field.is-on .tc-cv{opacity:1}
.tc-panel{position:relative;display:grid;justify-items:start;gap:14px;width:min(100%,440px);padding:32px;border-radius:20px;background:var(--bg);color:var(--ink);box-shadow:0 0 0 1px var(--line),0 24px 48px -24px color-mix(in oklab,var(--ink) 35%,transparent)}
.tc-kicker{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.tc-panel h2{margin:0;font-size:clamp(28px,3.2vw,42px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.tc-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.tc-cta{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.tc-cta:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
.tc-hint{margin:0;font-size:13px;color:var(--muted)}
@media(prefers-reduced-motion:reduce){.tc-svg,.tc-cv{transition:none}}
@media(max-width:767px){.tc-field{padding:16px}.tc-panel{padding:24px}}`,
  html:`<div class="stage"><section class="tc">
  <div class="tc-field">
    <svg class="tc-svg" viewBox="0 0 24 12" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" data-o="${tcBits}" data-a="${tcIdx.join(",")}"><path class="tc-p0" d="${tcBase}"/><path class="tc-p1" d="${tcAcc}"/></svg>
    <canvas class="tc-cv" aria-hidden="true"></canvas>
    <div class="tc-panel">
      <p class="tc-kicker">סדנת קרמיקה, ירושלים</p>
      <h2>אריחים בעבודת יד, לפי המידה שלכם</h2>
      <p class="tc-lead">כל אריח נוצק ונשרף אצלנו בסדנה. אפשר להגיע, לבחור דוגמה ולסדר רצפה או קיר על שולחן העבודה לפני שמזמינים.</p>
      <a class="tc-cta" href="#">לקביעת ביקור בסדנה</a>
      <p class="tc-hint" aria-hidden="true">לחצו על הרקע, והאריחים יסתדרו מחדש</p>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".tc"),field=root.querySelector(".tc-field"),cv=root.querySelector(".tc-cv"),svg=root.querySelector(".tc-svg");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;      // בהפחתת תנועה נשאר ה-SVG הסטטי
  const ctx=cv.getContext("2d"),COLS=24,ROWS=12,N=COLS*ROWS,DUR=560,FADE=1500,Q=Math.PI/2;
  const bits=svg.getAttribute("data-o"),O=new Uint8Array(N),BASE=new Float32Array(N);
  for(let i=0;i<N;i++)O[i]=bits.charCodeAt(i)-48;
  svg.getAttribute("data-a").split(",").forEach(k=>{BASE[+k]=.85;});          // אותם אריחים צבועים כמו ב-SVG
  const CNT=new Uint16Array(N),ST=new Float64Array(N).fill(-1),FL=new Float64Array(N).fill(-1e9);
  let W=0,H=0,s=0,ox=0,oy=0,ARC="#888",ACC="#00f",seen=false,raf=0,busy=0,dirty=true,lastIdle=0,hx=-9,hy=-9,ht=0;
  // הצבעים נקראים מהטוקנים בזמן ריצה, אז הרקע יורש כל עור
  const probe=document.createElement("canvas").getContext("2d");
  const norm=c=>{probe.fillStyle="black";probe.fillStyle=c;return probe.fillStyle;};
  const colors=()=>{const cs=getComputedStyle(cv);ARC=norm(cs.color);ACC=norm(cs.getPropertyValue("--accent").trim()||cs.color);dirty=true;};
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const env=(i,now)=>{const u=now-FL[i];let f=0;if(u>=0)f=u<120?u/120:Math.max(0,1-(u-120)/FADE);return Math.max(BASE[i],f);};
  function build(){
    const r=field.getBoundingClientRect();W=Math.round(r.width);H=Math.round(r.height);if(!W||!H)return;
    const dpr=Math.min(matchMedia("(max-width:767px)").matches?1.5:2,devicePixelRatio||1);
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    s=Math.max(W/COLS,H/ROWS);ox=(W-COLS*s)/2;oy=(H-ROWS*s)/2;      // כמו slice ב-SVG: האריחים ממלאים את הרקע ונחתכים בקצוות
    colors();
  }
  // שתי קשתות של אריח שזווית הסיבוב שלו a, במרכז (x,y): אחת סביב הפינה (-h,-h) ואחת סביב (h,h)
  function tile(x,y,a,h){
    const co=Math.cos(a),si=Math.sin(a);
    let cx=x+h*(si-co),cy=y-h*(si+co);
    ctx.moveTo(cx+h*co,cy+h*si);ctx.arc(cx,cy,h,a,a+Q);
    cx=x+h*(co-si);cy=y+h*(si+co);
    ctx.moveTo(cx-h*co,cy-h*si);ctx.arc(cx,cy,h,a+Math.PI,a+Math.PI+Q);
  }
  function draw(now){
    ctx.clearRect(0,0,W,H);
    const h=s/2,lw=s*.12,acc=[];
    ctx.lineWidth=lw;ctx.strokeStyle=ARC;ctx.beginPath();
    for(let i=0;i<N;i++){
      const c=i%COLS,r=(i/COLS)|0,x=ox+(c+.5)*s,y=oy+(r+.5)*s;
      if(x<-s||x>W+s||y<-s||y>H+s)continue;
      let q=O[i]+CNT[i];
      if(ST[i]>=0){const u=(now-ST[i])/DUR;if(u>=1){CNT[i]++;ST[i]=-1;q++;}else if(u>0)q+=ease(u);}
      const a=q*Q;tile(x,y,a,h);
      const e=env(i,now);if(e>.02)acc.push(e,x,y,a);
    }
    ctx.stroke();
    ctx.strokeStyle=ACC;ctx.lineWidth=lw*1.3;
    for(let k=0;k<acc.length;k+=4){ctx.globalAlpha=acc[k];ctx.beginPath();tile(acc[k+1],acc[k+2],acc[k+3],h);ctx.stroke();}
    ctx.globalAlpha=1;
  }
  // גל: כל אריח בטווח מתחיל להסתובב באיחור לפי המרחק (70ms לאריח), ונצבע בצבע המבטא כשהוא מתחיל
  function ripple(cx,cy,R,now){
    const c0=Math.max(0,Math.floor(cx-R)),c1=Math.min(COLS-1,Math.ceil(cx+R)),r0=Math.max(0,Math.floor(cy-R)),r1=Math.min(ROWS-1,Math.ceil(cy+R));
    for(let r=r0;r<=r1;r++)for(let c=c0;c<=c1;c++){
      const d=Math.hypot(c+.5-cx,r+.5-cy);if(d>R)continue;
      const i=r*COLS+c,t=now+d*70;
      if(ST[i]>=0&&t<ST[i]+DUR)continue;      // אריח שכבר מסתובב לא מקבל גל נוסף
      if(ST[i]>=0)CNT[i]++;
      ST[i]=t;FL[i]=t;busy=Math.max(busy,t+FADE+240);
    }
    dirty=true;kick();
  }
  function frame(now){
    raf=0;if(!seen||document.hidden)return;
    if(now-lastIdle>3600){      // בלי נגיעה יוצא גל לבד, מנקודה שנודדת בתוך החלק הנראה
      lastIdle=now;const t=now/1000,c0=-ox/s,c1=(W-ox)/s,r0=-oy/s,r1=(H-oy)/s;
      ripple(c0+(.5+.34*Math.sin(t*.7))*(c1-c0),r0+(.5+.3*Math.cos(t*.43))*(r1-r0),12,now);
    }
    if(dirty||now<busy){draw(now);dirty=false;}
    raf=requestAnimationFrame(frame);
  }
  function kick(){if(!raf&&seen&&!document.hidden)raf=requestAnimationFrame(frame);}
  const at=e=>{const r=field.getBoundingClientRect();return[(e.clientX-r.left-ox)/s,(e.clientY-r.top-oy)/s];};
  field.addEventListener("pointermove",e=>{
    if(e.pointerType==="touch"||!seen)return;
    const now=performance.now(),p=at(e);
    if(now-ht<140||Math.hypot(p[0]-hx,p[1]-hy)<.9)return;
    hx=p[0];hy=p[1];ht=now;ripple(p[0],p[1],2.4,now);
  });
  field.addEventListener("pointerdown",e=>{
    if(!seen||e.target.closest(".tc-panel"))return;
    const p=at(e);ripple(p[0],p[1],14,performance.now());
  });
  document.addEventListener("visibilitychange",kick);
  build();
  new IntersectionObserver(es=>{seen=es[0].isIntersecting;if(seen){field.classList.add("is-on");colors();}kick();},{rootMargin:"20% 0px"}).observe(field);
  new ResizeObserver(()=>{build();kick();}).observe(field);
})();`
},
{
  id:"g261", cat:"gsap", name:"צורות מקוננות שמסתובבות כמנהרה", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"שמונה ריבועים מקוננים, לסירוגין בצבע המותג ובצבע הטקסט, נפתחים מנקודה במרכז כשגוללים. כל אחד גדל למקומו ומסתובב נגד הקודם, מהפנימי החוצה, עד שהם נעצרים במדרגות של שבע מעלות והופכים למנהרה. במרכז, על הריבוע הפנימי, מילה אחת עולה מטשטוש ומתחדדת בסוף.",
  when:"פתיחה או אודות של סטודיו, מוצר או שירות שאפשר לסכם במילה אחת: מחקר, עומק, דיוק, סדר. הצורות הן קישוט שמוביל את העין למילה, ולכן עדיף כשהטקסט לידן קצר. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם ריבועים מקוננים מסתובבים ומתכנסים כמנהרה סביב מילה מטושטשת במרכז. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** שמונה אלמנטים `i`, כל אחד ברוחב של `150%` כפול `0.78` בחזקת המקום מרוחב הבמה (החיצוני גדול מספיק כדי לכסות את הפינות בכל זווית), עם `--k` לגודל ו-`--r` לזווית הסופית: 49 מעלות בחיצוני ו-0 בפנימי. הזוגיים בצבע המבטא והאי-זוגיים בצבע הטקסט, עם טבעת בצבע הרקע כדי שהשכבות יישארו נפרדות גם בעור חד-גוני. המילה יושבת בתוך הריבוע הפנימי, בצבע הרקע על משטח בצבע הטקסט, ולכן הניגודיות מובטחת בכל עור. **כשהמהלך רץ** נוסף `is-live`, והסקשן מקבל גובה של 260svh עם שכבה דביקה אחת בגובה המסך. טיימליין אחד בסקראב: כל שכבה עולה מ-4% מהגודל ומסתובבת ממצב של 170 מעלות מעבר לזווית הסופית, בכיוון מתחלף משכבה לשכבה, מהפנימית החוצה בהפרש של 0.1, ובסוף המילה מתחדדת מטשטוש של 12px. מרכוז השכבות הוא במאפיין `translate`, כדי שהסיבוב והגודל של GSAP לא ידרסו אותו. **מצב ההתחלה** (גודל 4%, שקוף, סיבוב) נקבע ב-`gsap.set` לפני הטיימליין, והטיימליין רק `to`. ב-`fromTo` עם `stagger` רק הפריט הראשון מקבל את מצב ההתחלה לפני שהגלילה מתחילה, והשכבות החיצוניות היו נראות במצב הסופי. **בטלפון** הצורות למעלה והטקסט מתחתיהן, הכול בתוך מסך אחד נעוץ. **RTL:** הטקסט בצד ההתחלה והצורות בצד הסוף. באתר LTR מחליפים את סדר העמודות עם `order` על `.nt-vis`. **נגישות:** הצורות והמילה שבתוכן הן קישוט (`aria-hidden`), והכותרת האמיתית נשארת טקסט רגיל. בהפחתת תנועה רואים את המנהרה הגמורה, בלי הגלילה הארוכה.",
  libs:["gsap","ScrollTrigger"],
  css:`.nt{max-width:1100px;margin-inline:auto}
.nt-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px)}
.nt-copy{display:grid;gap:16px;justify-items:start}
.nt-kicker{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.nt-copy h2{margin:0;font-size:clamp(32px,4vw,56px);font-weight:700;line-height:1.08;letter-spacing:-.01em;text-wrap:balance}
.nt-copy p:not(.nt-kicker){margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.nt-cta{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.nt-cta:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
.nt-vis{display:grid;place-items:center}
.nt-frame{position:relative;isolation:isolate;overflow:hidden;container-type:size;width:min(100%,560px);aspect-ratio:1;border-radius:28px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line)}
/* כל שכבה: גודל (--k) וזווית סופית (--r) מהמארקאפ. המרכוז ב-translate, כדי ש-GSAP יזיז רק סיבוב וגודל */
.nt-l{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:calc(150% * var(--k));aspect-ratio:1;translate:-50% -50%;transform:rotate(var(--r));border-radius:4%;background:var(--c);box-shadow:0 0 0 2px var(--bg)}
.nt-l:nth-child(odd){--c:var(--accent)}
.nt-l:nth-child(even){--c:var(--ink)}
.nt-word{font-size:clamp(18px,6.4cqw,40px);font-weight:800;line-height:1;white-space:nowrap;color:var(--bg)}
.nt.is-live{height:260vh;height:260svh}
.nt.is-live .nt-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .nt-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:24px}
  .nt-vis{order:-1}
  .nt-frame{width:min(100%,56svh)}
  .nt-copy h2{font-size:clamp(28px,8vw,36px)}
}`,
  html:`<div class="stage"><section class="nt">
  <div class="nt-pin">
    <div class="nt-copy">
      <p class="nt-kicker">סטודיו למחקר משתמשים</p>
      <h2>מחקר שיורד עד לשורש הבעיה</h2>
      <p>שבוע של ראיונות ובדיקות שימושיות, ניתוח של מה שהמשתמשים באמת עושים באתר, ובסופו מסמך קצר שאפשר לעבוד איתו.</p>
      <a class="nt-cta" href="#">לשיחת היכרות</a>
    </div>
    <div class="nt-vis" aria-hidden="true"><div class="nt-frame">${ntLayers}</div></div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת המנהרה הגמורה, והמילה חדה
  const root=document.querySelector(".nt"),L=[...root.querySelectorAll(".nt-l")],word=root.querySelector(".nt-word");
  // בהפחתת תנועה הפונקציה לא רצה, והמנהרה נשארת במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const fin=L.map(el=>parseFloat(el.style.getPropertyValue("--r"))||0);
    // מצב ההתחלה נקבע מראש, כי בטווין עם stagger רק הפריט הראשון מקבל את מצב ההתחלה לפני שהגלילה מתחילה
    gsap.set(L,{scale:.04,autoAlpha:0,rotation:i=>fin[i]+(i%2?-170:170)});
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // מהפנימית החוצה, וכל שכבה מסתובבת בכיוון ההפוך לשכנה שלה
    tl.to(L,{scale:1,autoAlpha:1,rotation:i=>fin[i],duration:1.2,ease:"power3.out",stagger:{each:.1,from:"end"}},0)
      .fromTo(word,{autoAlpha:0,scale:.8,filter:"blur(12px)"},{autoAlpha:1,scale:1,filter:"blur(0px)",duration:.7,ease:"power2.out"},">-.5")
      .to({},{duration:.5});      // עצירה בסוף, כדי שהמנהרה הגמורה תישאר רגע על המסך
    return()=>{root.classList.remove("is-live");gsap.set(L.concat([word]),{clearProps:"all"});};
  });
})();`
},
{
  id:"g262", cat:"gsap", name:"נוף שעובר משקיעה ללילה בגלילה", tech:"GSAP · ScrollTrigger scrub · sticky · mix-blend", status:"מאושר-עין",
  desc:"תמונת נוף של שעת שקיעה על המים נעוצה בצד המסך, וכשגוללים בין שלבי הערב היא משתנה: הכחול מעמיק, הירח עולה מהאופק ומשאיר פס אור על המים, מופיעים כוכבים, ובפינה שעון קטן מתקדם מ-18:30 ל-22:00. רואים את האור משתנה, ולא רק קוראים על שעות.",
  when:"מקום שמוכר חוויה לאורך ערב או יום: גן אירועים, מסעדה על המים, מלון, חוף, אתר מורשת. שלושה שלבים של זמן עם נוף אחד שמשתנה לידם. פעם אחת בעמוד, בסקשן התהליך או בסיפור המקום.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם נוף מאויר עובר בגלילה משקיעה ללילה, השמיים מתכהים והירח עולה. נבנה מאפס מהצפייה, עם תמונה אמיתית מהמאגר במקום איור. **המארקאפ הוא הלילה:** בלי GSAP ובהפחתת תנועה רואים את הנוף החשוך, הירח למעלה, הכוכבים והשעה 22:00, והשלבים כרשימה לידו. **כשהמהלך רץ** נוסף `is-live`: הבמה נעוצה בעמודה השנייה (בטלפון נעוצה למעלה בחצי המסך) והשלבים גוללים בעמודה הראשונה. ההתקדמות נמדדת ממרכז השלב הראשון ועד מרכז האחרון, כמו ב-g158. **השכבות:** התמונה (גולשת בין גודל 1.18 ל-1.06 סביב קו האופק, ולכן האופק לא זז), שכבת לילה שהיא גרדיאנט של `--accent` מעורבב בשחור במצב `multiply` (שחור ולא צבע הטקסט, כדי שהלילה יישאר כהה גם בעורות כהים), ירח, פס השתקפות ו-46 כוכבים. הירח הוא גרדיאנט רדיאלי (צד מואר למעלה מצד ההתחלה, שפה מעט כהה וכחלחלה) עם שני הילות, קרובה וצפופה ורחבה וקלושה, כדי שישב בתוך השמיים ולא יראה כמדבקה. **הירח והפס** יושבים בעטיפה ממוקמת באחוזים, ו-GSAP מזיז אותה במרחק שמחושב מגודל הבמה (פונקציה עם `invalidateOnRefresh`), כך שהמסלול נכון בכל גודל. הירח עולה מימין למטה לשמאל למעלה. **צבע האור:** `--ls-light` הוא `--accent` מעורבב בלבן, כדי שהירח והכוכבים יישארו בהירים בכל עור, כולל עור שהמבטא שלו כהה. **השעון** הוא תווית (`aria-hidden`) והשעות עצמן מופיעות בטקסט של השלבים. הוא מחושב בקטעים, 18:30 עד 20:00 בחצי הראשון של הגלילה ו-20:00 עד 22:00 בחצי השני, כדי שכל שלב יתפוס את השעה שלו. כוכב אחד מכל ארבעה מנצנץ ב-CSS על המאפיין `scale`, נפרד מהשקיפות ש-GSAP מזיז. הכוכבים מתחילים כבויים ב-`gsap.set` לפני הטיימליין, מאותה סיבה שמוסברת ב-g261 (בטווין עם `stagger` רק הראשון מקבל את מצב ההתחלה). **מגבלה:** זו תמונה אחת ולא שכבות איור, ולכן הקרוב והרחוק לא נעים במהירויות שונות. לעומק אמיתי מחליפים אותה בשלוש שכבות חתוכות. **RTL:** הירח יוצא מימין, כי בעברית קוראים מימין לשמאל. באתר LTR מחליפים את סימן ה-`x` של הירח והפס.",
  libs:["gsap","ScrollTrigger"],
  css:`/* אור הירח והכוכבים: מבטא מעורבב בלבן ולא טוקן הטקסט, כי בעור כהה הטקסט בהיר והמבטא כהה, ולהפך. כך האור בהיר בכל עור */
.ls{--ls-light:color-mix(in oklab,var(--accent) 14%,white);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:clamp(32px,6vw,96px);max-width:1100px;margin-inline:auto}
.ls-stage{grid-area:1/2;align-self:center;display:grid;place-items:center}
.ls-col{grid-area:1/1;align-self:center}
.ls-kicker{margin:0 0 12px;font-size:15px;font-weight:600;color:var(--muted)}
.ls-head h2{margin:0;font-size:clamp(32px,4vw,56px);font-weight:700;line-height:1.08;letter-spacing:-.01em;text-wrap:balance}
.ls-steps{list-style:none;margin:0;padding:40px 0 0;display:grid;gap:40px}
.ls-t{display:block;margin-bottom:10px;font-size:15px;font-weight:700;color:var(--muted);font-variant-numeric:tabular-nums}
.ls-step h3{margin:0 0 10px;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.ls-step p{margin:0;max-width:36ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ls-scene{--mw:clamp(40px,10cqw,72px);position:relative;overflow:hidden;isolation:isolate;container-type:size;width:min(100%,calc(80svh * 1.25));aspect-ratio:5/4;border-radius:28px;background:var(--ink)}
.ls-far{position:absolute;inset:0;overflow:hidden}
.ls-far img{display:block;width:100%;height:100%;object-fit:cover;transform:scale(1.06);transform-origin:50% 72%}
.ls-night{position:absolute;inset:0;opacity:.9;mix-blend-mode:multiply;background:linear-gradient(180deg,color-mix(in oklab,var(--accent) 16%,black) 0%,color-mix(in oklab,var(--accent) 34%,black) 68%,color-mix(in oklab,var(--accent) 22%,black) 100%)}
.ls-sky{position:absolute;inset:0 0 36% 0}
.ls-star{position:absolute;border-radius:50%;background:var(--ls-light);box-shadow:0 0 6px color-mix(in oklab,var(--ls-light) 70%,transparent)}
.ls-star.tw{animation:ls-tw 4.2s cubic-bezier(.4,0,.2,1) infinite;animation-delay:var(--d)}
@keyframes ls-tw{50%{scale:1.7}}
.ls-moonpos{position:absolute;left:30%;top:20%;width:0;height:0}
.ls-moon{position:absolute;left:calc(var(--mw) / -2);top:calc(var(--mw) / -2);width:var(--mw);height:var(--mw);border-radius:50%;background:radial-gradient(circle at 36% 32%,color-mix(in oklab,var(--ls-light) 70%,white) 0,var(--ls-light) 48%,color-mix(in oklab,var(--ls-light) 72%,var(--accent)) 100%);box-shadow:0 0 32px 4px color-mix(in oklab,var(--ls-light) 30%,transparent),0 0 96px 36px color-mix(in oklab,var(--ls-light) 12%,transparent)}
.ls-reflpos{position:absolute;left:30%;top:71.5%;width:0;height:0}
.ls-refl{position:absolute;top:0;left:calc(var(--mw) * -.28);width:calc(var(--mw) * .56);height:24cqh;background:linear-gradient(to bottom,color-mix(in oklab,var(--ls-light) 70%,transparent),transparent);-webkit-mask-image:linear-gradient(to right,transparent,black 30%,black 70%,transparent);mask-image:linear-gradient(to right,transparent,black 30%,black 70%,transparent)}
.ls-time{position:absolute;inset-block-start:16px;inset-inline-start:16px;padding:6px 14px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:14px;font-weight:700;font-variant-numeric:tabular-nums}
/* המהלך רץ: הבמה נעוצה בעמודה השנייה והשלבים גוללים לידה */
.ls.is-live .ls-stage{align-self:start;position:sticky;top:0;height:100vh;height:100svh}
.ls.is-live .ls-col{align-self:start}
.ls.is-live .ls-head{min-height:60vh;display:flex;flex-direction:column;justify-content:center}
.ls.is-live .ls-steps{gap:0;padding:0}
.ls.is-live .ls-step{min-height:85vh;display:flex;flex-direction:column;justify-content:center}
@media(prefers-reduced-motion:reduce){.ls-star.tw{animation:none}}
@media(max-width:767px){
  .ls{grid-template-columns:minmax(0,1fr)}
  .ls-stage,.ls-col{grid-area:auto}
  .ls-scene{width:100%;aspect-ratio:4/3}
  .ls.is-live .ls-stage{grid-area:1/1;z-index:1;height:48svh;background:linear-gradient(var(--bg) 84%,transparent)}
  .ls.is-live .ls-col{grid-area:1/1;padding-top:48svh}
  .ls.is-live .ls-scene{height:100%;aspect-ratio:auto}
  .ls.is-live .ls-head{min-height:40svh}
  .ls.is-live .ls-step{min-height:70svh}
}`,
  html:`<div class="stage"><div class="ls">
  <div class="ls-stage" aria-hidden="true">
    <div class="ls-scene">
      <div class="ls-far"><img src="../assets/media/real/s08/hero.webp" alt="" width="2560" height="1707" loading="lazy" decoding="async"></div>
      <div class="ls-night"></div>
      <div class="ls-sky">${lsStars}</div>
      <div class="ls-reflpos"><div class="ls-refl"></div></div>
      <div class="ls-moonpos"><div class="ls-moon"></div></div>
      <span class="ls-time"><b>22:00</b></span>
    </div>
  </div>
  <div class="ls-col">
    <div class="ls-head"><p class="ls-kicker">גן אירועים על קו המים</p><h2>כך נראה ערב בגן</h2></div>
    <ol class="ls-steps">
      <li class="ls-step"><span class="ls-t">18:30</span><h3>קבלת פנים על הדשא</h3><p>האורחים מגיעים בשעת השקיעה, עם משקאות קרים ומוזיקה שקטה על קו המים.</p></li>
      <li class="ls-step"><span class="ls-t">20:00</span><h3>חופה וארוחה</h3><p>החופה נערכת בדמדומים, ואחריה שולחנות ארוכים מתחת לאורות שנדלקים על הדשא.</p></li>
      <li class="ls-step"><span class="ls-t">22:00</span><h3>מסיבה עד הלילה</h3><p>כשהשמיים כהים לגמרי, הרחבה נפתחת והמוזיקה עולה, והמים משקפים את הירח.</p></li>
    </ol>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הלילה: ירח, כוכבים ושעה 22:00, והשלבים כרשימה
  const root=document.querySelector(".ls"),scene=root.querySelector(".ls-scene");
  const img=scene.querySelector(".ls-far img"),night=scene.querySelector(".ls-night"),moonP=scene.querySelector(".ls-moonpos"),moon=scene.querySelector(".ls-moon");
  const reflP=scene.querySelector(".ls-reflpos"),refl=scene.querySelector(".ls-refl"),stars=[...scene.querySelectorAll(".ls-star")],chip=scene.querySelector(".ls-time b");
  // בהפחתת תנועה הפונקציה לא רצה, והלילה נשאר במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const fin=stars.map(s=>parseFloat(getComputedStyle(s).opacity)||1),nightEnd=parseFloat(getComputedStyle(night).opacity),endText=chip.textContent;
    const W=()=>scene.offsetWidth,H=()=>scene.offsetHeight,two=n=>String(n).padStart(2,"0");
    // השעה: 18:30 עד 20:00 בחצי הראשון של הגלילה, 20:00 עד 22:00 בחצי השני, בקפיצות של חמש דקות
    const prog={p:0},clock=()=>{const p=prog.p,m=Math.round((p<.5?1110+p*180:1200+(p-.5)*240)/5)*5;chip.textContent=two(Math.floor(m/60))+":"+two(m%60);};
    // ההתקדמות נמדדת ממרכז השלב הראשון ועד מרכז האחרון, על קו הקריאה: מרכז המסך, ובטלפון מרכז השטח שמתחת לבמה
    const list=root.querySelector(".ls-steps"),steps=list.querySelectorAll(".ls-step"),line=()=>matchMedia("(max-width:767px)").matches?"74%":"center";
    gsap.set(stars,{opacity:0});      // הכוכבים מתחילים כבויים (בטווין עם stagger רק הראשון מקבל את מצב ההתחלה מראש)
    const tl=gsap.timeline({scrollTrigger:{trigger:list,scrub:.6,invalidateOnRefresh:true,
      start:()=>"top+="+(steps[0].offsetTop-list.offsetTop+steps[0].offsetHeight/2)+" "+line(),
      end:()=>"bottom-="+steps[steps.length-1].offsetHeight/2+" "+line()}});
    tl.fromTo(img,{scale:1.18},{scale:1.06,ease:"none",duration:1},0)
      .fromTo(night,{opacity:0},{opacity:nightEnd,ease:"power1.inOut",duration:1},0)
      .fromTo(moonP,{x:()=>W()*.42,y:()=>H()*.5},{x:0,y:0,ease:"power1.inOut",duration:1},0)
      .fromTo(moon,{opacity:0},{opacity:1,ease:"power1.out",duration:.35},0)
      .fromTo(reflP,{x:()=>W()*.42},{x:0,ease:"power1.inOut",duration:1},0)
      .fromTo(refl,{opacity:0},{opacity:1,ease:"power1.in",duration:.7},.3)
      .to(stars,{opacity:i=>fin[i],ease:"none",duration:.4,stagger:{each:.6/stars.length,from:"random"}},.4)
      .fromTo(prog,{p:0},{p:1,ease:"none",duration:1,onUpdate:clock},0);
    clock();
    return()=>{root.classList.remove("is-live");chip.textContent=endText;};
  });
})();`
},
{
  id:"g263", cat:"gsap", name:"צורות גיאומטריות שנכנסות להרכב", tech:"GSAP · ScrollTrigger scrub · SVG · sticky", status:"מאושר-עין",
  desc:"לוח ריבועי אחד ובו הרכב בסגנון באוהאוס: עיגול גדול בצבע המותג, משולש כהה, פס מוטה, נקודה, ריבוע קטן וקרן עיגול בפינה. כשגוללים כל צורה נכנסת מקצה אחר של הלוח ונעצרת במקומה, אחת אחרי השנייה, ולבסוף רשת של 16 ריבועים קטנים נבנית בפינה.",
  when:"אודות או סיפור מותג של סטודיו עיצוב, אדריכלות או מיתוג, שהשפה שלו היא צורות וגרפיקה. הצבעים לקוחים מהמותג, ולכן ההרכב משתנה עם הפלטה. לא לעסק שקט שנשען על תמונות ואנשים. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אחד בגלריה של prompt-motion.com (21.10.2026) שבו עיגול, משולש, פס ונקודה בצבעים ראשוניים גולשים מקצוות המסך, ננעלים בהרכב של באוהאוס, ולצידם רשת אריחים כחולה שנבנית. נבנה מאפס מהצפייה, עם טוקנים של המותג במקום אדום, צהוב וכחול. **המארקאפ הוא ההרכב המלא:** SVG אחד (`viewBox` של 100 על 100) שבו כל צורה נושאת `data-from` עם ההיסט שממנו היא נכנסת (x, y ביחידות הלוח). בלי GSAP ובהפחתת תנועה רואים את הלוח השלם. **כשהמהלך רץ** נוסף `is-live`: הסקשן מקבל גובה של 240svh עם שכבה דביקה אחת, וטיימליין אחד בסקראב מכניס כל צורה מההיסט שלה ב-`power3.out` בהפרש של 0.28, ולבסוף 16 האריחים עולים מגודל אפס בסדר אקראי (גודל האפס נקבע ב-`gsap.set` לפני הטיימליין, כי ב-`stagger` רק האריח הראשון מקבל את מצב ההתחלה מראש). הפס המוטה יושב בתוך `g` עם הסיבוב הקבוע שלו, והאנימציה מזיזה את הפס עצמו, כך שניקוי הסגנונות בסוף לא מוחק את הזווית. **צבעים:** העיגול והאריחים הראשיים ב-`--accent`, המשולש, הנקודה והריבוע ב-`--ink`, והפס וקרן העיגול בתערובות עם `--card`, כך שגם בעור חד-גוני הצורות נשארות נפרדות. **בטלפון** הלוח למעלה והטקסט מתחתיו, בתוך מסך אחד נעוץ. **RTL:** הצורות נכנסות משמאל ומלמעלה, והלוח בצד הסוף. באתר LTR מחליפים את סימן ה-x בערכי `data-from`. **נגישות:** הלוח `aria-hidden`, וההסבר בטקסט רגיל.",
  libs:["gsap","ScrollTrigger"],
  css:`.bh{max-width:1100px;margin-inline:auto}
.bh-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px)}
.bh-copy{display:grid;gap:16px;justify-items:start}
.bh-kicker{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.bh-copy h2{margin:0;font-size:clamp(32px,4vw,56px);font-weight:700;line-height:1.08;letter-spacing:-.01em;text-wrap:balance}
.bh-copy p:not(.bh-kicker){margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.bh-cta{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.bh-cta:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
.bh-vis{display:grid;place-items:center}
.bh-board{width:min(100%,560px);aspect-ratio:1;border-radius:28px;overflow:hidden;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.bh-svg{display:block;width:100%;height:100%;overflow:hidden}
.bh-c{fill:var(--accent)}
.bh-tri,.bh-dot,.bh-sq{fill:var(--ink)}
.bh-bar{fill:color-mix(in oklab,var(--accent) 38%,var(--card))}
.bh-q{fill:color-mix(in oklab,var(--ink) 14%,var(--card))}
.bh-t.a{fill:var(--accent)}
.bh-t.b{fill:color-mix(in oklab,var(--accent) 28%,var(--card))}
.bh.is-live{height:240vh;height:240svh}
.bh.is-live .bh-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .bh-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:24px}
  .bh-vis{order:-1}
  .bh-board{width:min(100%,56svh)}
  .bh-copy h2{font-size:clamp(28px,8vw,36px)}
}`,
  html:`<div class="stage"><section class="bh">
  <div class="bh-pin">
    <div class="bh-copy">
      <p class="bh-kicker">סטודיו למיתוג, תל אביב</p>
      <h2>עיצוב שמתחיל מצורות פשוטות</h2>
      <p>כל מותג שאנחנו בונים מתחיל מכמה צורות בסיס. מהן מגיעים לסימן, לצבעים ולאותיות, ואחר כך לכל מה שהעסק מדפיס או מעלה לרשת.</p>
      <a class="bh-cta" href="#">לצפייה בעבודות</a>
    </div>
    <div class="bh-vis" aria-hidden="true"><div class="bh-board">
      <svg class="bh-svg" viewBox="0 0 100 100" focusable="false">
        <path class="bh-q" data-from="-50,50" d="M0 100V70A30 30 0 0 1 30 100Z"/>
        <circle class="bh-c" data-from="-90,-60" cx="38" cy="40" r="26"/>
        <g transform="rotate(-20 37 64.5)"><rect class="bh-bar" data-from="-110,10" x="10" y="60" width="54" height="9" rx="1"/></g>
        <path class="bh-tri" data-from="60,70" d="M94 52V92H62Z"/>
        <circle class="bh-dot" data-from="0,-70" cx="82" cy="42" r="4.5"/>
        <rect class="bh-sq" data-from="-60,-40" x="10" y="8" width="9" height="9" rx="1"/>
        ${bhTiles}
      </svg>
    </div></div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP רואים את הלוח השלם
  const root=document.querySelector(".bh"),shapes=[...root.querySelectorAll("[data-from]")],tiles=[...root.querySelectorAll(".bh-t")];
  // בהפחתת תנועה הפונקציה לא רצה, וההרכב נשאר שלם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    gsap.set(tiles,{scale:0,transformOrigin:"50% 50%"});      // האריחים מתחילים מגודל אפס, והטיימליין רק מגדיל אותם
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    shapes.forEach((el,i)=>{
      const f=el.getAttribute("data-from").split(",").map(Number);
      tl.from(el,{x:f[0],y:f[1],duration:1,ease:"power3.out"},i*.28);      // כל צורה נכנסת מקצה אחר של הלוח
    });
    tl.to(tiles,{scale:1,duration:.5,ease:"power2.out",stagger:{each:.05,from:"random"}},shapes.length*.28)
      .to({},{duration:.4});      // עצירה בסוף, כדי שההרכב השלם יישאר רגע על המסך
    return()=>{root.classList.remove("is-live");gsap.set(shapes.concat(tiles),{clearProps:"all"});};
  });
})();`
},
{
  id:"css42", cat:"css", name:"שני מישורי נקודות מוטים בעומק", tech:"CSS 3D · perspective · keyframes", status:"מאושר-עין", runway:false,
  desc:"שני מישורי נקודות צפים אחד מעל השני בזווית, על שדה כהה ועם אור חם שביניהם. הנקודות של כל מישור נעות לאט בכיוון אחר, והמישורים עצמם מתנדנדים קלות. במעבר עכבר הזווית נפתחת והמרחק בין השכבות גדל.",
  when:"סקשן שמסביר עניין של שכבות: נתונים ודוחות מעליהם, תשתית ואפליקציה, בסיס ושירות. התמונה אומרת שכבה על שכבה בלי לצייר מוצר. מתאים לעסקי טכנולוגיה, דאטה ותשתיות, ליד כותרת קצרה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה של prompt-motion.com (21.10.2026) עם שני מישורי נקודות זוהרים בפרספקטיבה, על רקע כהה ועם אור חם ביניהם. נבנה מאפס מהצפייה, ב-CSS בלבד. **3D:** על הבמה `perspective: 900px`, בתוכה `rig` עם `transform-style: preserve-3d` ו-`rotateX(62deg) rotateZ(-28deg)`, ובו שני מישורים ב-`translateZ` של 90px ומינוס 90px ושכבת זוהר שטוחה ביניהם, כך שהאור באמת מופיע בין המישורים. על ה-rig אין `overflow`, מסכה או `filter`, כי כל אחד מהם משטח את ה-3D. **הנקודות:** גרדיאנט רדיאלי אחד שחוזר כל 18px, בתוך מישור עם פינות מעוגלות, מילוי שקוף קל וקו מתאר דק בצבע הנקודות, שמראה שזה מישור ולא ענן. בלי מסכה על המישור, כי היא מטשטשת את הקצוות והשכבות נראות כמו כתם אחד. התנועה היא אלמנט `::before` שגדול ב-18px מכל צד וזז ב-`transform` בדיוק 18px בלולאה לינארית, ולכן הלולאה חלקה בלי קפיצה. כל מישור זז בכיוון אחר ובזמן אחר, ונדנוד ה-rig הוא על המאפיין `translate`, נפרד מה-`transform`. **בלי אנימציה** (ובהפחתת תנועה, שבה האנימציות כבויות) רואים את המישורים הנייחים. **צבעים:** הבמה ב-`--ink`, הנקודות ב-`--bg` ובתערובת שלו עם `--ink`, הזוהר ב-`--accent`. בעור כהה הבמה בהירה והנקודות כהות, אותו הרכב הפוך. **מעבר עכבר:** הזווית עוברת ל-52 מעלות והמישורים מתרחקים ל-130px, ב-`transform` עם `cubic-bezier(.2,.6,.2,1)`, בלי שינוי בפריסה. **RTL:** הכיוון של הסחיפה לא נושא משמעות. אם צריך, הופכים אותו עם `scaleX(-1)` על ה-rig. **נגישות:** כל הבמה `aria-hidden`; הכותרת והתוויות הן טקסט רגיל מחוץ ל-3D.",
  libs:[],
  css:`.dp{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1100px;margin-inline:auto}
.dp-copy{display:grid;gap:16px;justify-items:start}
.dp-kicker{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.dp-copy h2{margin:0;font-size:clamp(30px,3.6vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.dp-copy p:not(.dp-kicker){margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.dp-legend{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:12px}
.dp-legend li{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--card);font-size:14px;font-weight:600}
.dp-legend i{width:10px;height:10px;border-radius:50%;background:var(--ink)}
.dp-legend li:nth-child(2) i{background:color-mix(in oklab,var(--ink) 40%,var(--bg))}
.dp-scene{position:relative;overflow:hidden;height:clamp(340px,56vh,560px);border-radius:28px;background:var(--ink);perspective:900px;perspective-origin:50% 40%}
.dp-rig{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(62deg) rotateZ(-28deg);transition:transform .9s cubic-bezier(.2,.6,.2,1);animation:dp-bob 8s cubic-bezier(.4,0,.2,1) infinite alternate}
.dp-plane,.dp-glow{position:absolute;left:50%;top:50%;width:62%;aspect-ratio:1.25;translate:-50% -50%}
.dp-plane{overflow:hidden;border-radius:18px;background:color-mix(in oklab,var(--dot) 8%,transparent);box-shadow:inset 0 0 0 1px color-mix(in oklab,var(--dot) 38%,transparent);transition:transform .9s cubic-bezier(.2,.6,.2,1)}
.dp-plane::before{content:"";position:absolute;inset:-18px;background:radial-gradient(circle,var(--dot) 0 2px,transparent 2.8px) 0 0 / 18px 18px}
.dp-top{--dot:var(--bg);transform:translateZ(90px)}
.dp-top::before{animation:dp-a 7s linear infinite}
.dp-bot{--dot:color-mix(in oklab,var(--bg) 62%,var(--ink));transform:translateZ(-90px)}
.dp-bot::before{animation:dp-b 9s linear infinite}
.dp-glow{width:96%;background:radial-gradient(closest-side,color-mix(in oklab,var(--accent) 80%,transparent),transparent)}
.dp-scene:hover .dp-rig{transform:rotateX(52deg) rotateZ(-16deg)}
.dp-scene:hover .dp-top{transform:translateZ(130px)}
.dp-scene:hover .dp-bot{transform:translateZ(-130px)}
/* כל מישור זז בדיוק אורך תא אחד (18px) בלולאה, ולכן אין קפיצה בחזרה להתחלה */
@keyframes dp-a{to{transform:translate(18px,0)}}
@keyframes dp-b{to{transform:translate(0,-18px)}}
@keyframes dp-bob{to{translate:0 -12px}}
@media(prefers-reduced-motion:reduce){.dp-rig,.dp-top::before,.dp-bot::before{animation:none}.dp-rig,.dp-plane{transition:none}}
@media(max-width:767px){.dp{grid-template-columns:minmax(0,1fr)}.dp-scene{height:clamp(300px,48svh,420px)}}`,
  html:`<div class="stage"><section class="dp">
  <div class="dp-copy">
    <p class="dp-kicker">תשתית נתונים לעסקים קטנים</p>
    <h2>הנתונים בשכבה אחת, הדוחות מעליה</h2>
    <p>אנחנו מחברים את מערכת הקופה, ההזמנות והחשבוניות למקום אחד, ובונים מעליו דוחות שבעל העסק יכול לקרוא בלי לבקש עזרה.</p>
    <ul class="dp-legend"><li><i></i>שכבת דוחות</li><li><i></i>שכבת נתונים</li></ul>
  </div>
  <div class="dp-scene" aria-hidden="true">
    <div class="dp-rig">
      <div class="dp-plane dp-top"></div>
      <div class="dp-glow"></div>
      <div class="dp-plane dp-bot"></div>
    </div>
  </div>
</section></div>`,
  js:``
},
{
  id:"css43", cat:"css", name:"פסי אזהרה אלכסוניים עם תיבת מילה", tech:"CSS · repeating-linear-gradient · animation-timeline", status:"מאושר-עין",
  desc:"רצועה רחבה מלאה בפסים אלכסוניים עבים, בצבע המבטא ובצבע הטקסט, כמו סרט אזהרה, שמחליקים לאט לאורך האלכסון בלולאה בלי קפיצה. באמצע יושבת תיבה בהירה עם מילה אחת כבדה, כמו תווית שהודבקה על הסרט, והיא קופצת פנימה (גדלה מ-80% ל-100%) כשהרצועה נכנסת למסך.",
  when:"מקום שצריך להדגיש מילה אחת בקול: פינוי מלאי, סוף עונה, סגור לשיפוצים, מבצע לזמן מוגבל. בחנות או בדף נחיתה של מבצע. לא באתר שקט, כי הפסים צועקים. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אחד בגלריה של prompt-motion.com (21.10.2026) שבו מסך מלא של פסי אזהרה אלכסוניים בצהוב ושחור, ובמרכזו תיבה שחורה עם מילה צהובה כבדה. נבנה מאפס מהצפייה, ב-CSS בלבד. **הפסים:** `repeating-linear-gradient` ב-45 מעלות על `::before` שגדול ב-80px מכל צד. הלולאה חלקה כי התזוזה היא בדיוק תקופה אחת של הדוגמה לאורך האלכסון: הפס רחב 48.08px, התקופה 96.16px, והתזוזה 68px בכל ציר (68 כפול שורש 2 הוא 96.16). אם משנים את רוחב הפס מחשבים מחדש: התזוזה בכל ציר היא התקופה חלקי שורש 2. **התיבה:** משטח בהיר (`--bg`) עם טקסט `--ink`, בלי מסגרת ובלי טבעת: המשטח לבדו מפריד אותה מהפסים, כמו תווית שהודבקה על הסרט. הקפיצה פנימה היא `animation-timeline: view()` עם `cubic-bezier(.05,.7,.1,1)` בתוך `@supports`. בדפדפן בלי תמיכה התיבה פשוט נמצאת בגודלה המלא. **בהפחתת תנועה** הפסים עומדים והתיבה לא מונפשת. **עור חד-גוני:** המבטא והטקסט זהים בו, ולכן הפסים הופכים לרצועה אחידה, וזה צפוי. **RTL:** הפסים נוטים לימין ומחליקים ימינה ולמעלה. באתר שהכיוון בו חשוב הופכים אותם עם `scaleX(-1)` על `::before`. **נגישות:** הפסים הם קישוט בלבד, והמילה היא כותרת אמיתית.",
  libs:[],
  css:`.hz{max-width:1100px;margin-inline:auto}
.hz-band{--p:48.08px;position:relative;isolation:isolate;display:grid;place-items:center;overflow:hidden;min-height:clamp(320px,58vh,540px);padding:24px;border-radius:24px}
/* התזוזה (68px, -68px) היא בדיוק תקופה אחת של הפסים (96.16px) לאורך האלכסון, ולכן הלולאה חלקה */
.hz-band::before{content:"";position:absolute;inset:-80px;z-index:-1;background:repeating-linear-gradient(45deg,var(--accent) 0 var(--p),var(--ink) var(--p) calc(var(--p) * 2));animation:hz-slide 7s linear infinite}
@keyframes hz-slide{to{transform:translate(68px,-68px)}}
.hz-box{display:grid;justify-items:center;gap:8px;padding:28px 56px;background:var(--bg);color:var(--ink);text-align:center;transition:transform .5s cubic-bezier(.2,.6,.2,1)}
.hz-box:hover{transform:scale(1.03)}
.hz-word{margin:0;font-size:clamp(44px,9vw,120px);font-weight:800;line-height:1;letter-spacing:-.01em}
.hz-offer{margin:0;font-size:clamp(18px,2vw,26px);font-weight:600}
@supports (animation-timeline:view()){
  .hz-box{animation:hz-pop linear both;animation-timeline:view();animation-range:entry 0% entry 70%;animation-timing-function:cubic-bezier(.05,.7,.1,1)}
}
@keyframes hz-pop{from{scale:.8;opacity:0}to{scale:1;opacity:1}}
.hz-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 48px;padding-top:24px}
.hz-foot p{margin:0;max-width:52ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hz-cta{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.hz-cta:focus-visible{outline:2px solid var(--ink);outline-offset:4px}
@media(prefers-reduced-motion:reduce){.hz-band::before,.hz-box{animation:none}.hz-box{transition:none}}
@media(max-width:767px){.hz-band{padding:16px}.hz-box{padding:24px 28px}}`,
  html:`<div class="stage"><section class="hz">
  <div class="hz-band">
    <div class="hz-box"><h2 class="hz-word">פינוי מלאי</h2><p class="hz-offer">עד 40% הנחה על כל התצוגה</p></div>
  </div>
  <div class="hz-foot">
    <p>ספות, שולחנות אוכל וכורסאות מדגמי השנה שעברה, בסלון התצוגה ברמת גן עד סוף החודש.</p>
    <a class="hz-cta" href="#">לצפייה בדגמים</a>
  </div>
</section></div>`,
  js:``
}
];
