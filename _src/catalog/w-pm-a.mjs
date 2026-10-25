// תשעה מהלכים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// 25.10.2026: g163 נמחק אחרי הסקירה (ליאב: "אם זה נישתי מדי אז נוותר"; ובשאלה על הנשארים: "למחוק 3, לשפר 8").
// האתר הוא גלריה של סרטוני תנועה. בקובץ הזה הקבוצה האווירית: ענני נקודות, שדות נקודות, רשתות קווים, גו וצורות שנבנות מחלקים.
// הכול נבנה מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל פריט בקנבס כולל מצב סטטי שלם בלי JS ובהפחתת תנועה (SVG, גרדיאנט או צורה סופית), ובקנבס הצבעים נקראים מהטוקנים בזמן ריצה.
export default [
{
  id:"g160", cat:"gsap", name:"ענן נקודות שמתכנס לגרף", tech:"GSAP · ScrollTrigger scrub · Canvas 2D", status:"מאושר-עין",
  desc:"ענן של כאלף ותשע מאות נקודות מסתובב לאט מעל הגרף. כשגוללים, כל נקודה נדלקת בצבע המותג, יוצאת בקשת למקום שלה ומתיישבת בגרף נקודות של פניות לפי שבוע, מהשבוע הראשון ועד האחרון. בשבוע אחד העמודה גבוהה בהרבה מכל השאר, התווית נדלקת מעליה והמספר מגיע לערך הסופי. בלי GSAP העמוד מציג את הגרף המוכן.",
  when:"נתון אחד עם סיפור: גרף שבו שבוע, חודש או מוצר אחד בולט מכל השאר. סקשן תוצאות או הוכחה באתר של סוכנות, קליניקה או שירות שיש לו מספרים אמיתיים להראות. פעם אחת בעמוד, ורק כשהנתון אמיתי.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם ענן נקודות מתכנס לצורה, ובאחד מהם לגרף עם עמודה גבוהה אחת. נבנה מאפס מהצפייה. **הצורה היא נתונים:** `SER` הוא מערך של 37 ערכים (שבוע אחרי שבוע), `curve(u)` מחבר ביניהם בעקומה חלקה, והיעדים של הנקודות הם רשת שממלאת את השטח מתחת לעקומה, עמודה אחר עמודה. להחלפת הנתונים מחליפים את `SER` ואת המספר והתווית במארקאפ, וגם את ה-SVG הסטטי (הוא נוצר מאותה עקומה). **ארבעה דברים שומרים את זה קל:** (1) כמות הנקודות נגזרת ממרווח הרשת ומוגבלת ל-1900 בדסקטופ ול-900 בטלפון, והמרווח גדל עד שהכמות מתאימה. (2) הציור מקובץ לשש קבוצות של צבע ושקיפות, ומסלול אחד לכל קבוצה במקום מחרוזת צבע לכל נקודה. (3) DPR עד 2, והלולאה רצה רק כשהסקשן קרוב למסך (IntersectionObserver עם שוליים). (4) הצבעים נקראים מהטוקנים בזמן ריצה, אז כל עור מחליף אותם. **התנועה:** התקדמות הגלילה (`scrub`) היא המספר היחיד שמזיז הכול. לכל נקודה יש רגע התחלה שנקבע לפי העמודה שלה, מצד ההתחלה של הגרף, וקשת צד אקראית (`bend`) כדי שהנקודות יזרמו בקווים עקומים. נקודות עודפות נשארות בענן ודועכות. **RTL:** ציר הזמן מתחיל מימין והעמודה הראשונה מתיישבת ראשונה מימין, כי `direction` נקרא מהעמוד. באתר LTR הקוד מתהפך לבד, וב-SVG הסטטי יש היפוך עם `:dir(ltr)` (ושם התווית עוברת לצד השני). **בלי GSAP ובהפחתת תנועה** מוצג גרף נקודות ב-SVG (דפוס עיגולים) עם התווית והמספר הסופי, וה-canvas נחשף רק כשהמהלך רץ. **בטלפון** הענן גדול מהגרף ונופל אליו מלמעלה, והסקשן נעוץ במסך כמו בדסקטופ.",
  libs:["gsap","ScrollTrigger"],
  css:`.sw{position:relative;max-width:1100px;margin-inline:auto}
.sw-pin{display:grid;gap:clamp(24px,4vw,48px);padding-block:clamp(24px,4vw,64px)}
.sw-top{position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 48px}
.sw-head{display:grid;gap:12px;max-width:44ch}
.sw-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.sw-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sw-count{display:flex;align-items:baseline;gap:12px;margin:0;font-size:clamp(56px,8vw,112px);font-weight:700;line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.sw-count small{font-size:max(.2em,16px);font-weight:500;letter-spacing:0;color:var(--muted)}
.sw .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.sw-fig{position:relative;margin:0;aspect-ratio:5 / 2}
/* הגרף הסטטי: אותו אזור שאליו הנקודות מתיישבות. בטלפון הוא יושב בתחתית ומעליו נשאר מקום לענן */
.sw-plot{position:absolute;inset:0}
.sw-svg{display:block;width:100%;height:100%;overflow:visible;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.sw-svg:dir(ltr){transform:scaleX(-1)}
.sw-pd1 circle{fill:color-mix(in srgb,var(--ink) 48%,transparent)}
.sw-pd2 circle{fill:var(--accent)}
.sw-ln{stroke:var(--ink);stroke-width:2;stroke-linejoin:round;vector-effect:non-scaling-stroke;opacity:.7}
.sw-ax{stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
.sw-tag{position:absolute;left:33.3%;top:17.5%;translate:-50% calc(-100% - 10px);padding:6px 14px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);font-size:14px;font-weight:600;white-space:nowrap}
.sw-tag::after{content:"";position:absolute;left:50%;top:100%;height:10px;border-inline-start:1px solid var(--line)}
.sw-tag:dir(ltr){left:66.7%}
.sw-cv{position:absolute;left:-6%;top:-18%;width:112%;height:136%;pointer-events:none;opacity:0;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.sw-fig.is-on .sw-cv{opacity:1}
.sw-fig.is-on .sw-svg{opacity:0}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, והגלילה מקדמת את הנקודות */
.sw.is-live{height:260vh}
.sw.is-live .sw-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center;overflow:hidden}
@media(prefers-reduced-motion:reduce){.sw-svg,.sw-cv{transition:none}}
@media(max-width:767px){
  .sw-top{gap:16px}
  .sw.is-live .sw-fig{aspect-ratio:1 / 1}
  .sw.is-live .sw-plot{inset:auto 0 0 0;aspect-ratio:5 / 2}
  .sw.is-live .sw-cv{left:0;width:100%}
}`,
  html:`<div class="stage"><section class="sw">
  <div class="sw-pin">
    <div class="sw-top">
      <div class="sw-head">
        <h2>כל הפניות של השנה האחרונה, שבוע אחרי שבוע</h2>
        <p>רוב השבועות עברו בקצב קבוע. בשבוע אחד, אחרי שהקמפיין עלה, הגיעו יותר מפי שניים פניות מהרגיל.</p>
      </div>
      <p class="sw-count"><span class="sr-only">214 פניות בשבוע השיא</span><b aria-hidden="true">214</b><small aria-hidden="true">פניות בשבוע השיא</small></p>
    </div>
    <figure class="sw-fig">
      <canvas class="sw-cv" aria-hidden="true"></canvas>
      <div class="sw-plot">
        <svg class="sw-svg" viewBox="0 0 1000 400" role="img" aria-label="גרף פניות לפי שבוע: עלייה מתונה לאורך השנה ושבוע אחד גבוה בהרבה מכל השאר">
          <defs>
            <pattern id="sw-p1" class="sw-pd1" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.9"/></pattern>
            <pattern id="sw-p2" class="sw-pd2" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2.3"/></pattern>
          </defs>
          <path fill="url(#sw-p1)" d="M1000 400L1000 347.2L991.7 345.8L983.3 342.9L975 340.8L966.7 340.9L958.3 342.3L950 343.6L941.7 343.7L933.3 340.5L925 336L916.7 334L908.3 332.6L900 329.7L891.7 327.6L883.3 327.7L875 329.1L866.7 330.4L858.3 330.5L850 327.3L841.7 322.8L833.3 320.8L825 321.5L816.7 323L808.3 324L800 323.2L791.7 319.2L783.3 315.1L775 314.3L766.7 315.3L758.3 316.8L750 317.5L741.7 315.5L733.3 311L725 307.8L716.7 307L708.3 304.3L700 301.6L691.7 301.1L683.3 302.1L675 303.6L666.7 304.3L658.3 302.9L650 300L641.7 297.9L633.3 298L625 299.4L616.7 300.7L608.3 300.8L600 297.6L591.7 293.1L583.3 291.1L575 291.8L566.7 293.3L558.3 294.3L550 293.5L541.7 289.5L533.3 285.4L525 284.6L516.7 285.6L508.3 287.1L500 287.8L491.7 286.4L483.3 283.5L475 281.4L466.7 281.5L458.3 282.9L450 284.2L441.7 284.3L433.3 281.1L425 276.6L416.7 274.6L408.3 273.2L400 270.3L391.7 268.2L383.3 261.1L375 231.7L366.7 202.3L358.3 192.3L350 152.1L341.7 95.8L333.3 70L325 98.6L316.7 160.7L308.3 205.2L300 213.6L291.7 235L283.3 256.4L275 261.2L266.7 259.1L258.3 256.2L250 254.8L241.7 256.8L233.3 261.3L225 264.5L216.7 264.1L208.3 261.4L200 258.7L191.7 257.9L183.3 255.8L175 252.9L166.7 251.5L158.3 253.5L150 258L141.7 261.2L133.3 260.8L125 258.1L116.7 255.4L108.3 254.6L100 252.5L91.7 249.6L83.3 248.2L75 248.9L66.7 250.4L58.3 251.4L50 250.9L41.7 248.2L33.3 245.5L25 245L16.7 246L8.3 247.5L0 248.2L0 400Z"/>
          <path fill="url(#sw-p2)" d="M400 400L400 270.3L396.5 269.1L393 268.4L389.5 268L386 266.1L382.5 258.9L379 247.6L375.5 233.8L372 219.6L368.5 207.4L365 198.9L361.5 195.4L358 191.6L354.5 178.7L351 158.7L347.5 134.7L344 110.4L340.5 89.5L337 75.3L333.5 70L330 74.9L326.5 89.7L323 112.2L319.5 138.9L316 165.6L312.5 188.3L309 203.4L305.5 208.6L302 210.7L298.5 216.6L295 225.3L291.5 235.5L288 245.6L284.5 254.1L281 259.7L277.5 261.4L274 261.1L270.5 260.3L267 259.2L263.5 258L260 256.7L260 400Z"/>
          <path class="sw-ln" fill="none" d="M1000 347.2L975 340.8L950 343.6L925 336L900 329.7L875 329.1L850 327.3L825 321.5L800 323.2L775 314.3L750 317.5L725 307.8L700 301.6L675 303.6L650 300L625 299.4L600 297.6L575 291.8L550 293.5L525 284.6L500 287.8L475 281.4L450 284.2L425 276.6L400 270.3L383.3 261.1L375 231.7L366.7 202.3L358.3 192.3L350 152.1L341.7 95.8L333.3 70L325 98.6L316.7 160.7L308.3 205.2L300 213.6L291.7 235L283.3 256.4L275 261.2L250 254.8L225 264.5L200 258.7L175 252.9L150 258L125 258.1L100 252.5L75 248.9L50 250.9L25 245L0 248.2"/>
          <path class="sw-ax" d="M0 399.5H1000"/>
        </svg>
        <span class="sw-tag" aria-hidden="true">שבוע הקמפיין</span>
      </div>
    </figure>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הגרף הסטטי עם המספר הסופי
  const root=document.querySelector(".sw"),fig=root.querySelector(".sw-fig"),plot=root.querySelector(".sw-plot"),cv=root.querySelector(".sw-cv"),
    ctx=cv.getContext("2d"),num=root.querySelector(".sw-count b"),tag=root.querySelector(".sw-tag");
  const FINAL=parseInt(num.textContent,10)||0;
  // 37 שבועות. הפסגה באינדקס 24, והעקומה מחברת ביניהם בקוסינוס
  const SER=[.16,.18,.17,.2,.22,.21,.24,.23,.26,.25,.28,.3,.29,.31,.3,.33,.32,.35,.34,.36,.35,.38,.4,.62,1,.58,.42,.44,.41,.43,.45,.42,.44,.46,.45,.47,.46];
  const curve=u=>{const x=Math.min(Math.max(u,0),1)*(SER.length-1),i=Math.min(Math.floor(x),SER.length-2),f=(1-Math.cos(Math.PI*(x-i)))/2;return SER[i]+(SER[i+1]-SER[i])*f;};
  const cl=x=>Math.min(1,Math.max(0,x)),ease=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,sm=(a,b,x)=>{x=cl((x-a)/(b-a));return x*x*(3-2*x);};
  // בהפחתת תנועה הפונקציה לא רצה, והגרף הסטטי נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const rtl=getComputedStyle(root).direction==="rtl",mob=()=>innerWidth<768;
    const probe=document.createElement("canvas").getContext("2d");
    const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
      if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
      return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
    let W=0,H=0,n=0,cnt=0,P=0,vis=false,raf=0,COL=[],tx,ty,kd,S,ang,rad,spd,wob,bend,X,Y,B,RX,RY,PL,PT,PW,PH;
    const A=[.5,.92,1,.85,.55,.55],R=[1.5,1.9,2.3,1.7,1.4,1.4],t0=performance.now();
    const colors=()=>{const cs=getComputedStyle(root),ink=rgb(cs.color),acc=rgb(cs.getPropertyValue("--accent").trim()||cs.color);
      const f=a=>"rgb("+a.join(",")+")";COL=[f(ink),f(ink),f(acc),f(acc),f(ink),f(ink)];};
    function build(){
      const dpr=Math.min(2,devicePixelRatio||1),cr=cv.getBoundingClientRect(),pr=plot.getBoundingClientRect();
      W=cr.width;H=cr.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      PL=pr.left-cr.left;PT=pr.top-cr.top;PW=pr.width;PH=pr.height;
      const hmax=PH*.825,cap=mob()?900:1900;let g=mob()?5:6.5,nc,c,total;
      // מרווח הרשת גדל עד שכמות היעדים נכנסת בתקרה
      for(;;){nc=Math.max(8,Math.floor(PW/g));total=0;for(c=0;c<nc;c++)total+=Math.floor(curve((c+.5)/nc)*hmax/g);if(total<=cap||g>16)break;g+=.5;}
      const gx=PW/nc,tg=[];
      for(c=0;c<nc;c++){const u=(c+.5)/nc,rows=Math.floor(curve(u)*hmax/g),x=rtl?PL+PW-(c+.5)*gx:PL+(c+.5)*gx,spike=u>.58&&u<.76&&curve(u)>.5;
        for(let r=0;r<rows;r++)tg.push([x,PT+PH-(r+.5)*g,spike?2:r>=rows-2?1:0,u]);}
      cnt=tg.length;n=cnt+Math.round(cnt*.2);
      tx=new Float32Array(n);ty=new Float32Array(n);kd=new Uint8Array(n);S=new Float32Array(n);ang=new Float32Array(n);rad=new Float32Array(n);
      spd=new Float32Array(n);wob=new Float32Array(n);bend=new Float32Array(n);X=new Float32Array(n);Y=new Float32Array(n);B=new Uint8Array(n);
      let s=7;const rnd=()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};
      for(let i=0;i<n;i++){
        if(i<cnt){const q=tg[i];tx[i]=q[0];ty[i]=q[1];kd[i]=q[2];S[i]=.04+.5*q[3]+.07*rnd();}
        ang[i]=rnd()*6.2832;rad[i]=Math.sqrt(rnd())*.98+.02;spd[i]=.08+.18*(1-rad[i]);wob[i]=rnd()*6.2832;bend[i]=(rnd()-.5)*.9;
      }
      RX=W*.44;RY=H*.42;colors();frame(performance.now());
    }
    function frame(now){
      const t=(now-t0)/1000,ct=Math.cos(-.18),st=Math.sin(-.18),fade=1-sm(.1,.75,P),DUR=.36;
      for(let i=0;i<n;i++){
        const a=ang[i]+spd[i]*t,rr=rad[i],ox=Math.cos(a)*rr*RX,oy=Math.sin(a)*rr*RY+Math.sin(a*2+wob[i])*6;
        const cx=W/2+ox*ct-oy*st,cy=H/2+ox*st+oy*ct;
        if(i>=cnt){X[i]=cx;Y[i]=cy;B[i]=5;continue;}
        const e=ease(cl((P-S[i])/DUR));
        if(e<=0){X[i]=cx;Y[i]=cy;B[i]=4;}
        else if(e>=1){X[i]=tx[i];Y[i]=ty[i];B[i]=kd[i];}
        else{const dx=tx[i]-cx,dy=ty[i]-cy,len=Math.hypot(dx,dy)||1,bump=Math.sin(Math.PI*e)*bend[i]*len*.35;
          X[i]=cx+dx*e-dy/len*bump;Y[i]=cy+dy*e+dx/len*bump;B[i]=3;}
      }
      ctx.clearRect(0,0,W,H);
      ctx.globalAlpha=.28*sm(.2,.6,P);ctx.strokeStyle=COL[0];ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(PL,PT+PH+3);ctx.lineTo(PL+PW,PT+PH+3);ctx.stroke();
      for(let b=0;b<6;b++){
        ctx.globalAlpha=b===5?A[b]*fade:A[b];ctx.fillStyle=COL[b];ctx.beginPath();const r=R[b];
        for(let i=0;i<n;i++)if(B[i]===b){ctx.moveTo(X[i]+r,Y[i]);ctx.arc(X[i],Y[i],r,0,6.2832);}
        ctx.fill();
      }
      ctx.globalAlpha=1;
      num.textContent=Math.round(FINAL*ease(cl((P-.12)/.8)));
    }
    const loop=now=>{frame(now);raf=vis?requestAnimationFrame(loop):0;};
    const run=()=>{if(vis&&!raf)raf=requestAnimationFrame(loop);};
    const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)fig.classList.add("is-on");run();},{rootMargin:"40% 0px"});
    const ro=new ResizeObserver(build);
    // התקדמות הגלילה היא המספר היחיד שמזיז את כל הנקודות. התווית מתוזמנת על אותו ציר
    const st={p:0},tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.to(st,{p:1,duration:1,ease:"none",onUpdate:()=>{P=st.p;}},0)
      .fromTo(tag,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.08,ease:"power2.out"},.9);
    build();io.observe(root);ro.observe(fig);
    return()=>{cancelAnimationFrame(raf);raf=0;vis=false;io.disconnect();ro.disconnect();root.classList.remove("is-live");fig.classList.remove("is-on");
      num.textContent=FINAL;gsap.set(tag,{clearProps:"all"});};
  });
})();`
},
{
  id:"b77", cat:"behavior", name:"שדה ריבועים שגל עובר עליו ומנפח את המילה", tech:"Canvas 2D · pointer · מסכת טקסט", status:"מאושר-עין", runway:false,
  desc:"רשת של כמה אלפי ריבועים קטנים מכסה את הרקע, וגל עגול עובר עליה בלי הפסקה: כל ריבוע מסתובב, מתכווץ ומתבהר לפי המרחק שלו מנקודת המוצא. בתוך המילה הריבועים גדולים יותר ובצבע המותג, ולכן היא נקראת כמו הדפס רשת שהגל מנפח ומרגיע. הסמן מזיז את נקודת המוצא של הגל, ובלי סמן היא נודדת לאט לאורך הקצה.",
  when:"פתיחה של עמוד עם מילה אחת חזקה: שם המותג, הנושא או המילה שמגדירה את העסק, עד שש אותיות. מתאים לסטודיו, משרד מקצועי או מוצר, ורק פעם אחת בעמוד. לא מתחת לפסקאות ולא בעמוד שכבר יש בו רקע נע.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) עם רשת ריבועים או נקודות שגל אלכסוני או עגול עובר עליה, ובאחד מהם מילה שנפתרת מתוך רעש של הדפס רשת. נבנה מאפס מהצפייה. **ההבדל מ-b68:** שם הנקודות נדלקות סביב הסמן, כאן הגל רץ לבד, והסמן רק מזיז את נקודת המוצא שלו. **המילה היא מסכה:** המילה נשארת טקסט אמיתי ב-h2 (קוראי מסך ומנועי חיפוש), והקוד מצייר אותה פעם אחת על קנבס נסתר באותו פונט ואותו משקל, ומשתמש בו כדי לדעת איזה ריבוע יושב בתוך אות. כשהקנבס נחשף ה-h2 הופך שקוף והריבועים מחליפים אותו. המדידה רצה אחרי `document.fonts.ready`, אחרת המילה נמדדת בפונט החלופי. **הגל:** לכל ריבוע `w = 0.5 + 0.5 * sin(d / 32 - t)` כש-d הוא המרחק מנקודת המוצא. מחוץ למילה w קובע גודל, שקיפות וסיבוב (עד 90 מעלות). בתוך המילה w קובע גודל בין 0.66 ל-1.16 מהתא, כך שבשיא הגל הריבועים מתחברים לאות מלאה. **קל:** עד 6500 תאים (המרווח גדל עד שהכמות נכנסת), 10 קבוצות צבע ושקיפות עם מסלול אחד לכל קבוצה, DPR עד 2, הלולאה רק כשהשדה על המסך. **RTL:** נקודת המוצא ברירת מחדל היא הפינה הימנית העליונה והיא נודדת לכיוון פנים. באתר LTR הקוד קורא את `direction` ועובר לפינה השמאלית. **בלי JS** נשאר רקע של רשת נקודות בגרדיאנט והמילה בטקסט רגיל. **בהפחתת תנועה** מצויר פריים אחד עם הגל באמצע המסלול, בלי לולאה.",
  libs:[],
  css:`.dw{max-width:1100px;margin-inline:auto}
.dw-field{position:relative;isolation:isolate;display:grid;place-items:center;height:clamp(280px,50vh,520px);overflow:hidden;touch-action:pan-y}
/* בלי JS: רשת נקודות רכה והמילה בטקסט. כשהקנבס נחשף, הרשת הזו נעלמת והמילה הופכת שקופה */
.dw-field::before{content:"";position:absolute;inset:0;z-index:-1;background-image:radial-gradient(circle,color-mix(in srgb,var(--ink) 32%,transparent) 1.7px,transparent 2.3px);background-size:12px 12px;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.dw-cv{position:absolute;inset:0;z-index:-1;width:100%;height:100%;opacity:0;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.dw-field.is-on::before{opacity:0}
.dw-field.is-on .dw-cv{opacity:1}
.dw-word{position:relative;margin:0;font-size:clamp(96px,24vw,280px);font-weight:800;line-height:1;letter-spacing:-.02em;transition:color .6s cubic-bezier(.2,.6,.2,1)}
.dw-field.is-on .dw-word{color:transparent}
.dw-foot{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:12px 48px;padding-top:24px}
.dw-kicker{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.dw-lead{margin:0;max-width:48ch;font-size:var(--fs-body);line-height:1.6}
@media(prefers-reduced-motion:reduce){.dw-field::before,.dw-cv,.dw-word{transition:none}}
@media(max-width:767px){.dw-foot{gap:8px}}`,
  html:`<div class="stage"><section class="dw">
  <div class="dw-field">
    <canvas class="dw-cv" aria-hidden="true"></canvas>
    <h2 class="dw-word">דיוק</h2>
  </div>
  <div class="dw-foot">
    <p class="dw-kicker">משרד מדידות והנדסה, תל אביב</p>
    <p class="dw-lead">מודדים בשטח, מחשבים במשרד, ומוסרים תוכנית שאפשר לבנות לפיה בלי לחזור ולשאול.</p>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".dw"),field=root.querySelector(".dw-field"),cv=root.querySelector(".dw-cv"),ctx=cv.getContext("2d"),h2=root.querySelector(".dw-word");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,rtl=getComputedStyle(root).direction==="rtl",word=h2.textContent.trim();
  const A=[.14,.22,.3,.4,.52,.78,.84,.9,.95,1],LAM=32;
  let W=0,H=0,g=10,n=0,cols=0,rows=0,PX,PY,IN,HS,TH,BK,COL=[],running=false,vis=false,raf=0,ro=null;
  const O={x:0,y:0,tx:0,ty:0,on:false},t0=performance.now();
  // הצבעים נקראים מהטוקנים בזמן ריצה, אז הרשת יורשת כל עור
  const probe=document.createElement("canvas").getContext("2d");
  const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
  const colors=()=>{const cs=getComputedStyle(root),ink=rgb(cs.color),acc=rgb(cs.getPropertyValue("--accent").trim()||cs.color);
    COL=["rgb("+ink.join(",")+")","rgb("+acc.join(",")+")"];};
  // המילה מצוירת פעם אחת על קנבס נסתר, באותו פונט, ומשם נקרא איזה תא יושב בתוך אות
  function mask(){
    const cs=getComputedStyle(h2),m=document.createElement("canvas");m.width=W;m.height=H;const c=m.getContext("2d");
    c.font=cs.fontWeight+" 100px "+cs.fontFamily;const w100=c.measureText(word).width||300,fs=Math.min(H*.86,W*.8/w100*100);
    c.font=cs.fontWeight+" "+fs+"px "+cs.fontFamily;c.textAlign="center";c.textBaseline="middle";c.fillStyle="#000";c.fillText(word,W/2,H/2+fs*.04);
    return c.getImageData(0,0,W,H).data;
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=field.getBoundingClientRect();W=Math.round(r.width);H=Math.round(r.height);if(!W||!H)return;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    g=Math.max(7,Math.min(11,W/110));while(Math.floor(W/g)*Math.floor(H/g)>6500)g+=.5;
    cols=Math.floor(W/g);rows=Math.floor(H/g);n=cols*rows;
    PX=new Float32Array(n);PY=new Float32Array(n);IN=new Uint8Array(n);HS=new Float32Array(n);TH=new Float32Array(n);BK=new Uint8Array(n);
    const ox=(W-cols*g)/2,oy=(H-rows*g)/2,md=mask();let i=0;
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++,i++){PX[i]=ox+(x+.5)*g;PY[i]=oy+(y+.5)*g;IN[i]=md[((PY[i]|0)*W+(PX[i]|0))*4+3]>110?1:0;}
    O.x=O.tx=rtl?W:0;O.y=O.ty=0;colors();paint(2.4);
  }
  function paint(t){
    const hm=g*.5;
    for(let i=0;i<n;i++){
      const w=.5+.5*Math.sin(Math.hypot(PX[i]-O.x,PY[i]-O.y)/LAM-t);
      if(IN[i]){HS[i]=(.66+.5*w)*hm;BK[i]=5+Math.min(4,Math.floor(w*4.99));TH[i]=0;}
      else{HS[i]=(.12+.58*w*w+.1*w)*hm;BK[i]=Math.min(4,Math.floor(w*4.99));TH[i]=w*1.5708;}
    }
    ctx.clearRect(0,0,W,H);
    for(let b=0;b<10;b++){
      ctx.globalAlpha=A[b];ctx.fillStyle=b<5?COL[0]:COL[1];ctx.beginPath();
      for(let i=0;i<n;i++){
        if(BK[i]!==b)continue;
        const x=PX[i],y=PY[i],a=HS[i]*Math.cos(TH[i]),s=HS[i]*Math.sin(TH[i]);
        ctx.moveTo(x-a+s,y-s-a);ctx.lineTo(x+a+s,y+s-a);ctx.lineTo(x+a-s,y+s+a);ctx.lineTo(x-a-s,y-s+a);ctx.closePath();
      }
      ctx.fill();
    }
    ctx.globalAlpha=1;
  }
  function loop(now){
    const t=(now-t0)/1000;
    // בלי סמן נקודת המוצא נודדת לאט לאורך הקצה העליון, מהפינה של צד ההתחלה פנימה
    if(!O.on){O.tx=(rtl?W:0)+(rtl?-1:1)*(.5+.5*Math.sin(t*.22))*W*.12;O.ty=H*.02;}
    O.x+=(O.tx-O.x)*.07;O.y+=(O.ty-O.y)*.07;
    paint(t*3);
    raf=running?requestAnimationFrame(loop):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf)raf=requestAnimationFrame(loop);}
  const at=e=>{const r=field.getBoundingClientRect();O.tx=e.clientX-r.left;O.ty=e.clientY-r.top;O.on=true;};
  field.addEventListener("pointermove",e=>{if(e.pointerType!=="touch")at(e);});
  field.addEventListener("pointerdown",e=>{if(!reduced)at(e);});
  field.addEventListener("pointerleave",()=>{O.on=false;});
  field.addEventListener("pointerup",e=>{if(e.pointerType==="touch")O.on=false;});
  document.addEventListener("visibilitychange",sync);
  (document.fonts&&document.fonts.ready||Promise.resolve()).then(()=>{
    build();
    new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){field.classList.add("is-on");colors();}sync();},{rootMargin:"20% 0px"}).observe(field);
    ro=new ResizeObserver(()=>{build();});ro.observe(field);
    if(reduced)field.classList.add("is-on");   // פריים אחד, בלי לולאה
  });
})();`
},
{
  id:"b78", cat:"behavior", name:"רשת קווים גלית מאחורי כותרת", tech:"Canvas 2D · pointer · SVG סטטי", status:"מאושר-עין", runway:false,
  desc:"שישים קווים דקים בדרגת צבע מצבע המותג לצבע הטקסט יוצרים סרט שמתפתל לאורך הסקשן, מתרחב ומצטמצם, ובין הקווים נוצר מוארה. הסרט נע לאט לכיוון הקריאה, הסמן מסיט אותו הצידה, ועל הקו האמצעי רוכבת נקודה קטנה שעוקבת אחרי הסמן. הכותרת יושבת מעליו על שכבת רקע רכה.",
  when:"רקע של הירו או של סקשן ״מה אנחנו עושים״ עם כותרת קצרה ושורה אחת של הסבר: שירותי נתונים, כספים, תוכנה, ייעוץ. מתאים כשהקו הוא רעיון (תזרים, מסלול, תהליך). לא מתחת לטקסט ארוך ולא ליד טופס.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) עם רצועות קווים דקים שמתפתלות ברקע, רשת תיל של גלים וגבעות קווים. נבנה מאפס מהצפייה. **הנוסחה:** לכל קו `v` בין 0 ל-1, ובכל נקודה לאורכו `u`: `y = מרכז(u,t) + (v - .5) * 2 * עובי(u,t) + ריפל(u,v,t)`. המרכז והעובי הם שני גלי סינוס איטיים בכיוונים הפוכים, ולכן הסרט מתפתל ומתהדק, והריפל תלוי ב-v כדי שהקווים לא יזוזו ביחד, וכך נוצר המוארה. **קל:** עד 60 קווים ו-80 דגימות לכל קו (בטלפון 38), הציור מקובץ לשש קבוצות צבע ומסלול אחד לכל קבוצה, DPR עד 2, והלולאה רצה רק כשהסקשן על המסך. הצבעים נקראים מהטוקנים בזמן ריצה. **הסמן:** `px` מסיט את הפאזה של המרכז, והנקודה על הקו האמצעי נעה לפי ה-x של הסמן עם החלקה. בלי סמן הנקודה נודדת לבד. **RTL:** הקו מתחיל מימין (`u = 0` בצד ההתחלה) והגל נע לכיוון הקריאה. באתר LTR הקוד קורא את `direction` ומתהפך. **בלי JS ובהפחתת תנועה:** SVG סטטי עם 26 קווים שנוצרו מאותה נוסחה בזמן קבוע, ובהפחתת תנועה מצויר אותו פריים בקנבס. הקצוות דועכים במסכה, כך שהסרט לא נחתך בקו ישר. ה-SVG והקנבס מתחלפים בהצלבה כשהסקשן נחשף.",
  libs:[],
  css:`.lm{position:relative;isolation:isolate;overflow:hidden;display:grid;align-items:center;min-height:clamp(420px,66vh,640px);padding:clamp(48px,6vw,96px) var(--gutter)}
.lm-art{position:absolute;inset:0;z-index:-1;-webkit-mask-image:linear-gradient(90deg,transparent,var(--ink) 12%,var(--ink) 88%,transparent);mask-image:linear-gradient(90deg,transparent,var(--ink) 12%,var(--ink) 88%,transparent)}
.lm-svg,.lm-cv{position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.lm-svg path{fill:none;stroke-width:1;vector-effect:non-scaling-stroke;opacity:.55}
.lm-l0{stroke:var(--accent)}
.lm-l1{stroke:color-mix(in srgb,var(--accent) 75%,var(--ink))}
.lm-l2{stroke:color-mix(in srgb,var(--accent) 50%,var(--ink))}
.lm-l3{stroke:color-mix(in srgb,var(--accent) 28%,var(--ink))}
.lm-l4{stroke:color-mix(in srgb,var(--accent) 10%,var(--ink))}
.lm-cv{opacity:0}
.lm-art.is-on .lm-cv{opacity:1}
.lm-art.is-on .lm-svg{opacity:0}
.lm-in{position:relative;display:grid;gap:16px;justify-items:start;max-width:38ch}
/* שכבת רקע רכה מאחורי הטקסט: קו אף פעם לא עובר חד מתחת למילה */
.lm-in::before{content:"";position:absolute;inset:-48px -64px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in srgb,var(--bg) 96%,transparent) 55%,transparent)}
.lm-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.lm h2{margin:0;font-size:clamp(34px,4.6vw,64px);line-height:1.08;text-wrap:balance}
.lm-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.lm-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.lm-btn:hover{transform:translateY(-2px)}}
.lm-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.lm-svg,.lm-cv{transition:none}}
@media(max-width:767px){.lm{min-height:480px}.lm-in::before{inset:-32px -24px}}`,
  html:`<div class="stage"><section class="lm">
  <div class="lm-art" aria-hidden="true">
    <svg class="lm-svg" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice"><path class="lm-l0" d="M1200 170.2L1166.7 168.2L1133.3 164.6L1100 159.7L1066.7 153.7L1033.3 146.9L1000 139.7L966.7 132.4L933.3 125.3L900 118.8L866.7 112.8L833.3 107.6L800 103.1L766.7 99.1L733.3 95.6L700 92.4L666.7 89.2L633.3 86L600 82.5L566.7 78.7L533.3 74.6L500 70.5L466.7 66.5L433.3 62.8L400 60L366.7 58.2L333.3 58L300 59.7L266.7 63.5L233.3 69.5L200 77.9L166.7 88.6L133.3 101.3L100 115.6L66.7 131.1L33.3 147.3L0 163.6M1200 178.3L1166.7 176.2L1133.3 172.6L1100 167.8L1066.7 162L1033.3 155.6L1000 148.9L966.7 142.2L933.3 135.8L900 129.9L866.7 124.4L833.3 119.5L800 115.1L766.7 111L733.3 107.1L700 103.2L666.7 99.1L633.3 94.7L600 89.9L566.7 84.9L533.3 79.7L500 74.5L466.7 69.7L433.3 65.5L400 62.5L366.7 61L333.3 61.3L300 63.8L266.7 68.6L233.3 75.8L200 85.4L166.7 97.1L133.3 110.7L100 125.7L66.7 141.5L33.3 157.7L0 173.6M1200 186.4L1166.7 184.2L1133.3 180.6L1100 175.9L1066.7 170.4L1033.3 164.4L1000 158.2L966.7 152.1L933.3 146.2L900 140.8L866.7 135.7L833.3 131L800 126.5L766.7 122.1L733.3 117.6L700 112.9L666.7 107.8L633.3 102.3L600 96.4L566.7 90.3L533.3 84.1L500 78.2L466.7 72.9L433.3 68.7L400 65.9L366.7 64.9L333.3 66L300 69.5L266.7 75.4L233.3 83.8L200 94.5L166.7 107.1L133.3 121.3L100 136.6L66.7 152.4L33.3 168.1L0 183.1M1200 194.4L1166.7 192L1133.3 188.4L1100 183.8L1066.7 178.5L1033.3 172.9L1000 167.2L966.7 161.7L933.3 156.3L900 151.2L866.7 146.4L833.3 141.7L800 137.1L766.7 132.2L733.3 127.1L700 121.6L666.7 115.5L633.3 109L600 102.2L566.7 95.2L533.3 88.4L500 82.1L466.7 76.8L433.3 72.7L400 70.4L366.7 70.2L333.3 72.3L300 76.9L266.7 84L233.3 93.4L200 104.9L166.7 118.1L133.3 132.6L100 147.8L66.7 163.1L33.3 177.9L0 191.7M1200 201.9L1166.7 199.3L1133.3 195.7L1100 191.3L1066.7 186.3L1033.3 181.2L1000 176L966.7 170.9L933.3 166L900 161.2L866.7 156.6L833.3 151.9L800 146.9L766.7 141.6L733.3 135.8L700 129.5L666.7 122.6L633.3 115.3L600 107.7L566.7 100.2L533.3 93.1L500 86.7L466.7 81.5L433.3 78L400 76.4L366.7 77.2L333.3 80.3L300 85.9L266.7 94L233.3 104.2L200 116.3L166.7 129.7L133.3 144.1L100 158.7L66.7 173L33.3 186.6L0 198.9M1200 208.7L1166.7 206L1133.3 202.4L1100 198.3L1066.7 193.7L1033.3 189L1000 184.4L966.7 179.8L933.3 175.3L900 170.8L866.7 166.3L833.3 161.5L800 156.2L766.7 150.4L733.3 144L700 137L666.7 129.4L633.3 121.5L600 113.4L566.7 105.6L533.3 98.3L500 92.2L466.7 87.5L433.3 84.6L400 83.9L366.7 85.6L333.3 89.8L300 96.3L266.7 105.1L233.3 115.9L200 128.1L166.7 141.4L133.3 155.1L100 168.8L66.7 181.8L33.3 193.9L0 204.5"/><path class="lm-l1" d="M1200 214.7L1166.7 212L1133.3 208.6L1100 204.7L1066.7 200.7L1033.3 196.5L1000 192.4L966.7 188.4L933.3 184.3L900 180.1L866.7 175.6L833.3 170.7L800 165.2L766.7 158.9L733.3 152L700 144.4L666.7 136.2L633.3 127.8L600 119.5L566.7 111.6L533.3 104.5L500 98.7L466.7 94.7L433.3 92.6L400 92.8L366.7 95.4L333.3 100.4L300 107.7L266.7 116.9L233.3 127.8L200 139.8L166.7 152.4L133.3 165.2L100 177.6L66.7 189.1L33.3 199.4L0 208.3M1200 219.9L1166.7 217.3L1133.3 214.2L1100 210.8L1066.7 207.3L1033.3 203.8L1000 200.4L966.7 196.9L933.3 193.3L900 189.3L866.7 184.9L833.3 179.8L800 174L766.7 167.4L733.3 160L700 151.9L666.7 143.3L633.3 134.7L600 126.2L566.7 118.4L533.3 111.7L500 106.5L466.7 103.1L433.3 101.8L400 102.9L366.7 106.2L333.3 111.9L300 119.5L266.7 128.8L233.3 139.4L200 150.8L166.7 162.5L133.3 174L100 184.9L66.7 194.7L33.3 203.2L0 210.3M1200 224.3L1166.7 222L1133.3 219.3L1100 216.6L1066.7 213.9L1033.3 211.2L1000 208.4L966.7 205.5L933.3 202.3L900 198.6L866.7 194.2L833.3 189.1L800 183L766.7 176L733.3 168.2L700 159.7L666.7 150.9L633.3 142.1L600 133.7L566.7 126.2L533.3 119.9L500 115.3L466.7 112.6L433.3 112.1L400 113.8L366.7 117.7L333.3 123.6L300 131.3L266.7 140.4L233.3 150.4L200 160.9L166.7 171.3L133.3 181.3L100 190.4L66.7 198.5L33.3 205.3L0 210.8M1200 228.1L1166.7 226.3L1133.3 224.4L1100 222.5L1066.7 220.6L1033.3 218.7L1000 216.8L966.7 214.5L933.3 211.7L900 208.2L866.7 203.9L833.3 198.5L800 192.2L766.7 184.9L733.3 176.7L700 168L666.7 159L633.3 150.2L600 142L566.7 134.8L533.3 129L500 124.9L466.7 122.9L433.3 122.9L400 125.1L366.7 129.3L333.3 135.3L300 142.8L266.7 151.2L233.3 160.3L200 169.6L166.7 178.5L133.3 186.9L100 194.3L66.7 200.7L33.3 206L0 210.1M1200 231.6L1166.7 230.5L1133.3 229.5L1100 228.6L1066.7 227.8L1033.3 226.9L1000 225.7L966.7 224L933.3 221.6L900 218.3L866.7 213.9L833.3 208.4L800 201.8L766.7 194.1L733.3 185.7L700 176.7L666.7 167.7L633.3 158.9L600 150.9L566.7 144.1L533.3 138.7L500 135.2L466.7 133.6L433.3 134.1L400 136.5L366.7 140.8L333.3 146.5L300 153.4L266.7 161L233.3 168.9L200 176.8L166.7 184.2L133.3 190.9L100 196.7L66.7 201.6L33.3 205.6L0 208.8"/><path class="lm-l2" d="M1200 235.1L1166.7 235.1L1133.3 235.3L1100 235.5L1066.7 235.7L1033.3 235.7L1000 235.3L966.7 234.1L933.3 232L900 228.8L866.7 224.4L833.3 218.6L800 211.7L766.7 203.7L733.3 195L700 185.8L666.7 176.7L633.3 168.1L600 160.3L566.7 153.8L533.3 148.9L500 145.8L466.7 144.5L433.3 145.2L400 147.7L366.7 151.7L333.3 156.9L300 163L266.7 169.5L233.3 176.1L200 182.5L166.7 188.4L133.3 193.6L100 198L66.7 201.7L33.3 204.7L0 207.3M1200 239.2L1166.7 240.4L1133.3 241.8L1100 243.3L1066.7 244.6L1033.3 245.5L1000 245.8L966.7 245L933.3 243.1L900 239.9L866.7 235.2L833.3 229.1L800 221.8L766.7 213.5L733.3 204.5L700 195.2L666.7 186L633.3 177.5L600 169.9L566.7 163.7L533.3 159.1L500 156.3L466.7 155.3L433.3 156L400 158.2L366.7 161.8L333.3 166.3L300 171.4L266.7 176.7L233.3 182L200 186.9L166.7 191.4L133.3 195.2L100 198.5L66.7 201.3L33.3 203.8L0 206.3M1200 244.2L1166.7 246.8L1133.3 249.6L1100 252.3L1066.7 254.6L1033.3 256.3L1000 257.1L966.7 256.6L933.3 254.7L900 251.2L866.7 246.2L833.3 239.7L800 232L766.7 223.2L733.3 213.9L700 204.5L666.7 195.3L633.3 186.9L600 179.5L566.7 173.6L533.3 169.2L500 166.6L466.7 165.6L433.3 166.2L400 168.1L366.7 171L333.3 174.6L300 178.7L266.7 182.8L233.3 186.7L200 190.4L166.7 193.6L133.3 196.3L100 198.8L66.7 201.1L33.3 203.4L0 206.1M1200 250.4L1166.7 254.5L1133.3 258.6L1100 262.4L1066.7 265.7L1033.3 268L1000 269.1L966.7 268.7L933.3 266.6L900 262.7L866.7 257.2L833.3 250.2L800 241.9L766.7 232.8L733.3 223.2L700 213.6L666.7 204.4L633.3 196.1L600 188.9L566.7 183.2L533.3 179.1L500 176.5L466.7 175.4L433.3 175.7L400 177.1L366.7 179.3L333.3 182L300 185L266.7 187.9L233.3 190.7L200 193.1L166.7 195.3L133.3 197.3L100 199.3L66.7 201.4L33.3 203.9L0 207.1M1200 258L1166.7 263.6L1133.3 268.9L1100 273.8L1066.7 277.7L1033.3 280.4L1000 281.5L966.7 280.9L933.3 278.4L900 274L866.7 267.9L833.3 260.3L800 251.5L766.7 241.9L733.3 232.1L700 222.3L666.7 213.2L633.3 205L600 198L566.7 192.5L533.3 188.5L500 185.9L466.7 184.7L433.3 184.6L400 185.4L366.7 186.9L333.3 188.6L300 190.6L266.7 192.4L233.3 194.1L200 195.7L166.7 197.1L133.3 198.7L100 200.4L66.7 202.7L33.3 205.7L0 209.5"/><path class="lm-l3" d="M1200 267.2L1166.7 274.1L1133.3 280.5L1100 286.1L1066.7 290.4L1033.3 293.2L1000 294.1L966.7 293L933.3 289.9L900 284.8L866.7 278L833.3 269.7L800 260.4L766.7 250.4L733.3 240.4L700 230.6L666.7 221.5L633.3 213.5L600 206.8L566.7 201.4L533.3 197.5L500 194.9L466.7 193.4L433.3 193L400 193.2L366.7 193.8L333.3 194.7L300 195.7L266.7 196.6L233.3 197.5L200 198.3L166.7 199.3L133.3 200.7L100 202.5L66.7 205.2L33.3 208.8L0 213.4M1200 277.8L1166.7 285.8L1133.3 293L1100 299.1L1066.7 303.5L1033.3 306L1000 306.4L966.7 304.6L933.3 300.7L900 294.8L866.7 287.2L833.3 278.3L800 268.5L766.7 258.2L733.3 248.1L700 238.3L666.7 229.5L633.3 221.7L600 215.2L566.7 210.1L533.3 206.2L500 203.6L466.7 201.9L433.3 201L400 200.6L366.7 200.5L333.3 200.6L300 200.7L266.7 200.8L233.3 201L200 201.4L166.7 202.2L133.3 203.6L100 205.7L66.7 208.9L33.3 213.2L0 218.8M1200 289.7L1166.7 298.5L1133.3 306.2L1100 312.2L1066.7 316.4L1033.3 318.3L1000 318L966.7 315.3L933.3 310.5L900 303.7L866.7 295.4L833.3 285.9L800 275.7L766.7 265.3L733.3 255.2L700 245.7L666.7 237.1L633.3 229.7L600 223.5L566.7 218.6L533.3 214.9L500 212.1L466.7 210.2L433.3 208.8L400 207.9L366.7 207.1L333.3 206.4L300 205.8L266.7 205.3L233.3 205.1L200 205.2L166.7 205.9L133.3 207.5L100 210.1L66.7 213.9L33.3 219L0 225.3M1200 302.5L1166.7 311.7L1133.3 319.4L1100 325.1L1066.7 328.6L1033.3 329.8L1000 328.5L966.7 324.8L933.3 319L900 311.4L866.7 302.4L833.3 292.5L800 282.2L766.7 271.8L733.3 261.9L700 252.8L666.7 244.7L633.3 237.7L600 231.9L566.7 227.3L533.3 223.6L500 220.8L466.7 218.6L433.3 216.8L400 215.3L366.7 213.8L333.3 212.5L300 211.3L266.7 210.3L233.3 209.7L200 209.8L166.7 210.6L133.3 212.5L100 215.6L66.7 220L33.3 225.7L0 232.6M1200 315.6L1166.7 324.8L1133.3 332.1L1100 337.2L1066.7 339.9L1033.3 340L1000 337.6L966.7 332.9L933.3 326.2L900 317.9L866.7 308.5L833.3 298.4L800 288L766.7 278L733.3 268.5L700 259.9L666.7 252.4L633.3 246L600 240.6L566.7 236.3L533.3 232.7L500 229.8L466.7 227.3L433.3 225L400 222.9L366.7 220.9L333.3 219L300 217.2L266.7 215.9L233.3 215.1L200 215.1L166.7 216.1L133.3 218.3L100 221.9L66.7 226.8L33.3 233L0 240.4"/><path class="lm-l4" d="M1200 328.5L1166.7 337.4L1133.3 344L1100 348.2L1066.7 349.7L1033.3 348.7L1000 345.2L966.7 339.6L933.3 332.1L900 323.4L866.7 313.7L833.3 303.6L800 293.7L766.7 284.1L733.3 275.3L700 267.4L666.7 260.6L633.3 254.8L600 249.9L566.7 245.8L533.3 242.3L500 239.2L466.7 236.3L433.3 233.6L400 230.9L366.7 228.3L333.3 225.8L300 223.6L266.7 222L233.3 221L200 221.1L166.7 222.3L133.3 224.8L100 228.8L66.7 234.1L33.3 240.7L0 248.2M1200 340.8L1166.7 348.9L1133.3 354.6L1100 357.6L1066.7 358L1033.3 355.8L1000 351.3L966.7 344.9L933.3 337L900 328L866.7 318.4L833.3 308.7L800 299.4L766.7 290.6L733.3 282.6L700 275.6L666.7 269.5L633.3 264.3L600 259.9L566.7 256L533.3 252.4L500 249.1L466.7 245.8L433.3 242.6L400 239.3L366.7 236L333.3 233L300 230.4L266.7 228.5L233.3 227.4L200 227.5L166.7 228.9L133.3 231.8L100 236L66.7 241.6L33.3 248.2L0 255.7M1200 351.9L1166.7 359L1133.3 363.5L1100 365.3L1066.7 364.5L1033.3 361.3L1000 356.1L966.7 349.1L933.3 341L900 332.2L866.7 323.1L833.3 314.1L800 305.6L766.7 297.8L733.3 290.8L700 284.7L666.7 279.4L633.3 274.8L600 270.7L566.7 266.9L533.3 263.2L500 259.5L466.7 255.7L433.3 251.8L400 247.8L366.7 244L333.3 240.4L300 237.4L266.7 235.2L233.3 234.1L200 234.2L166.7 235.8L133.3 238.8L100 243.2L66.7 248.8L33.3 255.4L0 262.7M1200 361.4L1166.7 367.3L1133.3 370.6L1100 371.3L1066.7 369.5L1033.3 365.5L1000 359.8L966.7 352.7L933.3 344.8L900 336.4L866.7 328.1L833.3 320.1L800 312.7L766.7 306L733.3 300.1L700 294.9L666.7 290.4L633.3 286.2L600 282.3L566.7 278.4L533.3 274.4L500 270.2L466.7 265.8L433.3 261.1L400 256.5L366.7 251.9L333.3 247.8L300 244.4L266.7 242L233.3 240.8L200 240.9L166.7 242.5L133.3 245.6L100 250.1L66.7 255.7L33.3 262.1L0 268.9M1200 369.2L1166.7 373.9L1133.3 376L1100 375.7L1066.7 373.1L1033.3 368.7L1000 362.8L966.7 356L933.3 348.7L900 341.2L866.7 333.9L833.3 327.2L800 321L766.7 315.5L733.3 310.7L700 306.4L666.7 302.4L633.3 298.5L600 294.6L566.7 290.4L533.3 285.9L500 281L466.7 275.8L433.3 270.3L400 264.9L366.7 259.7L333.3 255L300 251.2L266.7 248.6L233.3 247.2L200 247.4L166.7 249.1L133.3 252.2L100 256.6L66.7 262L33.3 268L0 274.3"/></svg>
    <canvas class="lm-cv"></canvas>
  </div>
  <div class="lm-in">
    <p class="lm-k">ניהול תזרים לעסקים קטנים</p>
    <h2>תזרים שאפשר לצפות מראש</h2>
    <p class="lm-lead">מחברים את הבנק, החשבוניות והחיובים החוזרים, ורואים כמה שבועות קדימה מה נכנס ומה יוצא.</p>
    <a class="lm-btn" href="#">לתיאום הדגמה</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".lm"),art=root.querySelector(".lm-art"),cv=art.querySelector(".lm-cv"),ctx=cv.getContext("2d");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,rtl=getComputedStyle(root).direction==="rtl";
  let W=0,H=0,NL=60,S=80,COL=[],running=false,vis=false,raf=0;
  const M={px:0,tx:0,u:.3,tu:.3,on:false},t0=performance.now();
  // הצבעים נקראים מהטוקנים בזמן ריצה: שש דרגות בין צבע המותג לצבע הטקסט
  const probe=document.createElement("canvas").getContext("2d");
  const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
  const colors=()=>{const cs=getComputedStyle(root),ink=rgb(cs.color),acc=rgb(cs.getPropertyValue("--accent").trim()||cs.color);
    COL=[];for(let b=0;b<6;b++){const k=b/5;COL.push("rgb("+acc.map((v,i)=>Math.round(v+(ink[i]-v)*k)).join(",")+")");}};
  // הנוסחה: מרכז וגובה הסרט הם שני גלים איטיים, והריפל תלוי בקו כדי שלא יזוזו ביחד
  const ly=(v,u,t,px)=>H*(.5+.12*Math.sin(u*5.2+t*.7+px*1.2))+(v-.5)*2*H*(.17+.11*Math.sin(u*3.1-t*.5+1.3))+H*.03*Math.sin(u*11+t*1.1+v*6)+H*.02*Math.sin(u*7-t*.6+v*9);
  const X=u=>rtl?W-u*W:u*W;
  function paint(t){
    ctx.clearRect(0,0,W,H);ctx.lineWidth=1;ctx.globalAlpha=.55;
    for(let b=0;b<6;b++){
      ctx.strokeStyle=COL[b];ctx.beginPath();
      for(let i=0;i<NL;i++){
        const v=i/(NL-1);if(Math.min(5,Math.floor(v*5.999))!==b)continue;
        for(let k=0;k<=S;k++){const u=k/S;if(k)ctx.lineTo(X(u),ly(v,u,t,M.px));else ctx.moveTo(X(u),ly(v,u,t,M.px));}
      }
      ctx.stroke();
    }
    // נקודה שרוכבת על הקו האמצעי ועוקבת אחרי הסמן
    const x=X(M.u),y=ly(.5,M.u,t,M.px);
    ctx.strokeStyle=COL[0];ctx.fillStyle=COL[0];ctx.globalAlpha=.3;ctx.beginPath();ctx.moveTo(x,y-H*.18);ctx.lineTo(x,y+H*.18);ctx.stroke();
    ctx.globalAlpha=.55;ctx.beginPath();ctx.arc(x,y,9,0,6.2832);ctx.stroke();
    ctx.globalAlpha=1;ctx.beginPath();ctx.arc(x,y,4,0,6.2832);ctx.fill();
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const small=W<600;NL=small?38:60;S=Math.min(80,Math.ceil(W/10));colors();paint(1.7);
  }
  function loop(now){
    if(!M.on){M.tu=.25+.5*(.5+.5*Math.sin((now-t0)/1000*.3));}
    M.px+=(M.tx-M.px)*.06;M.u+=(M.tu-M.u)*.1;
    paint(1.7-(now-t0)/1000*.9);
    raf=running?requestAnimationFrame(loop):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf)raf=requestAnimationFrame(loop);}
  root.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=art.getBoundingClientRect(),fx=(e.clientX-r.left)/r.width;M.tx=(fx-.5)*2;M.tu=rtl?1-fx:fx;M.on=true;});
  root.addEventListener("pointerleave",()=>{M.on=false;M.tx=0;});
  document.addEventListener("visibilitychange",sync);
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){art.classList.add("is-on");colors();}sync();},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");   // פריים אחד, בלי לולאה
  build();
})();`
},
{
  id:"b79", cat:"behavior", name:"עיגולים שמתמזגים כמו טיפות", tech:"SVG goo filter · pointer · rAF", status:"מאושר-עין", runway:false,
  desc:"עיגולי צבע מקיפים כתם מרכזי, מתמזגים אליו ונפרדים ממנו כמו טיפות נוזל עם גשר דק ביניהם, ועיגול אחד יוצא מהמסלול ועוקב אחרי הסמן. המיזוג נעשה בפילטר SVG אחד (טשטוש ומטריצת צבע שמחדדת את הקצה), לכן אין חישוב צורה: רק מזיזים עיגולים. בתוך הכתם יושב סמל המותג, והוא לא זז.",
  when:"אלמנט עיצובי ליד כותרת הירו של מותג שהמוצר שלו רך או נוזלי: קוסמטיקה, מזון, משקאות, בריאות, מוצרי תינוקות. מתאים גם למצב טעינה או למסך ריק. לא לאתר של בנק או של חברת ביטוח, ולא כרקע מאחורי פסקה (המיזוג מושך את העין מהטקסט).",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם עיגולים מתמזגים ונפרדים כמו טיפות עם גשר נוזלי ביניהם, ואחד מהם עוקב אחרי הסמן. נבנה מאפס מהצפייה. **המנגנון:** קבוצת עיגולים בצבע אחד עם `filter` של `feGaussianBlur` (stdDeviation 14) ואחריו `feColorMatrix` שמכפיל את ערוץ האלפא ב-22 ומחסר 9. כל מה שאחרי הטשטוש מעל סף מסוים הופך לאטום והשאר נעלם, ובין שני עיגולים קרובים נוצר גשר. **התזוזה:** `style.transform = translate(...)` על כל עיגול, והערכים נגזרים מ-`cx` ו-`cy` שבסימון. לכן בלי JS ובהפחתת תנועה רואים את הכתם הממוזג עצמו, ולא מצב ריק. כל עיגול מקיף את המרכז לפי זווית ורדיוס שמתחילים בדיוק במיקום שבסימון, והרדיוס נושם לאט, כך שעיגולים נוגעים בכתם ומתנתקים ממנו לסירוגין. **הסמן:** העיגול האחרון נמשך לנקודת הסמן במערכת הקואורדינטות של ה-viewBox עם החלקה (.12). המשקל שלו עולה בכניסה לסקשן ויורד ביציאה, והוא חוזר למסלול לבד. לא מגיב למגע. **ביצועים:** שמונה עיגולים, פילטר על אזור של 480 על 480, והלולאה רצה רק כשהסקשן על המסך ובלשונית פעילה. הפילטר יקר כשהקבוצה גדולה מאוד, ולכן לא למלא בו מסך שלם. מזהה הפילטר (`goo-b79`) חייב להיות ייחודי בעמוד. **RTL:** הפריסה בגריד לפי כיוון המסמך והאיור בצד הסוף. אין מה להפוך באתר LTR. הטבעות המנוקדות מסתובבות ב-CSS בלבד, ומושהות כשהסקשן מחוץ למסך.",
  libs:[],
  css:`.gm{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);min-height:clamp(420px,70vh,680px);padding:clamp(48px,6vw,96px) var(--gutter)}
.gm-copy{display:grid;gap:16px;justify-items:start;max-width:40ch}
.gm-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.gm h2{margin:0;font-size:clamp(34px,4.4vw,60px);line-height:1.1;text-wrap:balance}
.gm-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.gm-link{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.gm-link:hover{transform:translateY(-2px)}}
.gm-link:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.gm-art{position:relative;justify-self:center;width:100%;max-width:480px;aspect-ratio:1}
.gm-svg{display:block;width:100%;height:100%;overflow:visible}
.gm-c{fill:var(--accent);transform-box:fill-box;transform-origin:center}
.gm-glyph{fill:var(--accent-ink)}
.gm-ring{fill:none;stroke:var(--line);stroke-width:2;stroke-linecap:round;stroke-dasharray:1 11;transform-box:fill-box;transform-origin:center;animation:gm-spin 90s linear infinite;animation-play-state:paused}
.gm-ring.r2{stroke-dasharray:1 15;animation-duration:140s;animation-direction:reverse}
.gm-art.is-on .gm-ring{animation-play-state:running}
@keyframes gm-spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:reduce){.gm-ring{animation:none}.gm-link{transition:none}}
@media(max-width:767px){.gm{grid-template-columns:minmax(0,1fr);gap:24px;min-height:0}.gm-art{order:-1;max-width:280px}}`,
  html:`<div class="stage"><section class="gm">
  <div class="gm-copy">
    <p class="gm-k">מעבדת טל, חיפה</p>
    <h2>קוסמטיקה שמכינים בכמויות קטנות</h2>
    <p class="gm-lead">סבונים, קרמים וסרומים מהמעבדה שלנו. על כל אריזה רשימת מרכיבים קצרה, וכל אצווה נבדקת לפני שהיא יוצאת.</p>
    <a class="gm-link" href="#">לצפייה במוצרים</a>
  </div>
  <div class="gm-art" aria-hidden="true">
    <svg class="gm-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="goo-b79" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur"/>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"/>
        </filter>
      </defs>
      <circle class="gm-ring" cx="200" cy="200" r="178"/>
      <circle class="gm-ring r2" cx="200" cy="200" r="194"/>
      <g filter="url(#goo-b79)">
        <circle class="gm-c" cx="200" cy="200" r="78"/>
        <circle class="gm-c" cx="274" cy="150" r="34"/>
        <circle class="gm-c" cx="118" cy="262" r="28"/>
        <circle class="gm-c" cx="254" cy="300" r="24"/>
        <circle class="gm-c" cx="142" cy="116" r="40"/>
        <circle class="gm-c" cx="324" cy="238" r="20"/>
        <circle class="gm-c" cx="312" cy="92" r="30"/>
        <circle class="gm-c" cx="86" cy="178" r="32"/>
      </g>
      <path class="gm-glyph" d="M200 160C200 160 176 192 176 214a24 24 0 0 0 48 0C224 192 200 160 200 160Z"/>
    </svg>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".gm"),art=root.querySelector(".gm-art"),svg=art.querySelector("svg");
  const cs=[].slice.call(art.querySelectorAll(".gm-c")),N=cs.length,C=200;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // כל עיגול זוכר את המיקום שלו בסימון: זווית ורדיוס סביב המרכז, וההזזה היא ההפרש ממנו
  const P=cs.map((c,i)=>{const x=+c.getAttribute("cx"),y=+c.getAttribute("cy");
    return{c,x,y,a:Math.atan2(y-C,x-C),r:Math.hypot(x-C,y-C),sp:(i%2?1:-1)*(.16+.05*i),ra:10+4*(i%3),rf:.5+.17*i};});
  const M={x:P[N-1].x,y:P[N-1].y,tx:P[N-1].x,ty:P[N-1].y,w:0,on:false},t0=performance.now();
  let running=false,vis=false,raf=0;
  function frame(now){
    const t=(now-t0)/1000;
    for(let i=1;i<N;i++){
      const p=P[i],rad=p.r+p.ra*Math.sin(t*p.rf),ang=p.a+t*p.sp;
      let x=C+rad*Math.cos(ang),y=C+rad*Math.sin(ang);
      if(i===N-1){   // העיגול האחרון נמשך אל הסמן, ובלי סמן חוזר למסלול
        M.x+=(M.tx-M.x)*.12;M.y+=(M.ty-M.y)*.12;M.w+=((M.on?1:0)-M.w)*.08;
        x+=(M.x-x)*M.w;y+=(M.y-y)*M.w;
      }
      p.c.style.transform="translate("+(x-p.x).toFixed(2)+"px,"+(y-p.y).toFixed(2)+"px)";
    }
    P[0].c.style.transform="scale("+(1+.035*Math.sin(t*1.1)).toFixed(3)+")";
    raf=running?requestAnimationFrame(frame):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf)raf=requestAnimationFrame(frame);}
  root.addEventListener("pointermove",e=>{
    if(e.pointerType==="touch")return;
    const r=svg.getBoundingClientRect();if(!r.width)return;
    M.tx=Math.max(40,Math.min(360,(e.clientX-r.left)/r.width*400));
    M.ty=Math.max(40,Math.min(360,(e.clientY-r.top)/r.height*400));
    M.on=true;
  });
  root.addEventListener("pointerleave",()=>{M.on=false;});
  document.addEventListener("visibilitychange",sync);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!reduced)art.classList.add("is-on");sync();},{rootMargin:"10% 0px"}).observe(root);
})();`
},
{
  id:"css36", cat:"css", name:"כתם שמשנה צורה ומהפך את המילה", tech:"CSS keyframes · border-radius · container units", status:"מאושר-עין", runway:false,
  desc:"כתם בצבע המותג משנה את קו המתאר שלו לאט, נע ומסתובב מאחורי מילה גדולה, ובכל מקום שהכתם מכסה את האותיות הן מתהפכות לצבע הטקסט שעל המשטח. שני קווי מתאר דקים מהדהדים את הצורה בפאזה אחרת. הכול CSS, בלי JS ובלי SVG.",
  when:"כותרת הפתיחה של אתר שהמילה היא הנכס שלו: סטודיו, גלריה, מותג בוטיק, אירוע, מרצה. עובד הכי טוב עם מילה אחת קצרה וגדולה. לא לכותרת של משפט שלם ולא לאתר שצריך להרגיש רציני ושקט.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כתם צבעוני מתפתל מאחורי מילה, והאותיות מתהפכות בצבען במקום שהכתם עובר, עם קווי מתאר דקים סביבו. נבנה מאפס מהצפייה. **ההיפוך:** במקום `mix-blend-mode: difference`, שנותן צבעים אקראיים ולא שייכים לערכת הנושא, יש במילה עותק שני בתוך הכתם (`overflow: hidden` ו-`border-radius` חותכים אותו) בצבע `var(--accent-ink)`. העותק עומד בדיוק מעל המילה המקורית, כי הוא מקבל את ההופכי של תזוזת הכתם: מסלול הכתם הוא `translate(x,y) rotate(r)` והעותק רץ באותם keyframes, אותו משך ואותו easing, עם `rotate(-r) translate(-x,-y)`, ולכן בכל פריים הוא יושב במקום. כל שינוי במסלול הכתם חייב להיכנס לשני ה-keyframes יחד. **הצורה:** האנימציה של `border-radius` בשמונה ערכים עם אחוזים מעבירה את הכתם בין ארבע צורות, ו-`alternate` מחזיר אותו לאחור. **יחידות:** `container-type: size` על המסגרת ו-`--s: min(50cqw, 86cqh)` לגודל הכתם, כך שהכתם והעותק גדלים עם המסגרת ולא יוצאים ממנה. בדפדפן בלי יחידות מכולה הכתם נעלם והמילה נשארת קריאה. **הטבעות:** אותו keyframe עם `animation-delay` שלילי וגודל גדול ב-12% וב-24%. **נגישות:** המילה היא כותרת אמיתית, והעותק והכתם `aria-hidden`. **RTL:** המילה במרכז והכתם ממורכז, לכן אין מה להפוך באתר LTR. **בלי תנועה:** `animation: none` והכתם נשאר בצורת הפתיחה, כשהעותק ההפוך עדיין מיושר בדיוק.",
  libs:[],
  css:`.mb{display:grid;gap:24px;justify-items:center;text-align:center;padding:clamp(48px,6vw,96px) var(--gutter)}
.mb-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.mb-field{position:relative;isolation:isolate;container-type:size;display:grid;place-items:center;width:100%;height:clamp(320px,60vh,600px)}
.mb-word{margin:0;font-size:clamp(80px,22cqw,300px);font-weight:800;line-height:1;letter-spacing:-.02em;white-space:nowrap}
.mb-base{position:relative;z-index:1;color:var(--ink)}
.mb-art{--s:min(50cqw,86cqh);position:absolute;inset:0;pointer-events:none}
.mb-blob{position:absolute;z-index:2;left:calc(50% - var(--s)/2);top:calc(50% - var(--s)/2);width:var(--s);height:var(--s);overflow:hidden;background:var(--accent);border-radius:58% 42% 61% 39% / 46% 55% 45% 54%;transform:translate(calc(var(--s)*-.14),calc(var(--s)*-.05)) rotate(0deg);animation:mb-blob 18s cubic-bezier(.4,0,.2,1) infinite alternate}
/* העותק ההפוך: בגודל המסגרת, מוזז כך שמרכזו במרכז המסגרת, ורץ בתנועה ההופכית לכתם */
.mb-in{position:absolute;left:calc(var(--s)/2 - 50cqw);top:calc(var(--s)/2 - 50cqh);width:100cqw;height:100cqh;display:grid;place-items:center;transform:rotate(0deg) translate(calc(var(--s)*.14),calc(var(--s)*.05));animation:mb-inner 18s cubic-bezier(.4,0,.2,1) infinite alternate}
.mb-in .mb-word{color:var(--accent-ink)}
.mb-ring{position:absolute;z-index:0;width:calc(var(--s)*var(--g));height:calc(var(--s)*var(--g));left:calc(50% - var(--s)*var(--g)/2);top:calc(50% - var(--s)*var(--g)/2);border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);border-radius:58% 42% 61% 39% / 46% 55% 45% 54%;transform:translate(calc(var(--s)*-.14),calc(var(--s)*-.05)) rotate(0deg);animation:mb-blob 18s cubic-bezier(.4,0,.2,1) infinite alternate;animation-delay:var(--o)}
.mb-ring.r1{--g:1.12;--o:-4s}
.mb-ring.r2{--g:1.24;--o:-8s}
@keyframes mb-blob{
  0%{border-radius:58% 42% 61% 39% / 46% 55% 45% 54%;transform:translate(calc(var(--s)*-.14),calc(var(--s)*-.05)) rotate(0deg)}
  33%{border-radius:41% 59% 44% 56% / 58% 41% 59% 42%;transform:translate(calc(var(--s)*.16),calc(var(--s)*.07)) rotate(60deg)}
  66%{border-radius:62% 38% 52% 48% / 40% 62% 38% 60%;transform:translate(calc(var(--s)*-.05),calc(var(--s)*.12)) rotate(130deg)}
  100%{border-radius:48% 52% 38% 62% / 55% 45% 57% 43%;transform:translate(calc(var(--s)*.14),calc(var(--s)*-.09)) rotate(200deg)}
}
@keyframes mb-inner{
  0%{transform:rotate(0deg) translate(calc(var(--s)*.14),calc(var(--s)*.05))}
  33%{transform:rotate(-60deg) translate(calc(var(--s)*-.16),calc(var(--s)*-.07))}
  66%{transform:rotate(-130deg) translate(calc(var(--s)*.05),calc(var(--s)*-.12))}
  100%{transform:rotate(-200deg) translate(calc(var(--s)*-.14),calc(var(--s)*.09))}
}
.mb-lead{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
@media(prefers-reduced-motion:reduce){.mb-blob,.mb-in,.mb-ring{animation:none}}
@media(max-width:767px){.mb{gap:16px}.mb-field{height:clamp(280px,48vh,420px)}}`,
  html:`<div class="stage"><section class="mb">
  <p class="mb-k">סטודיו קרמיקה, יפו</p>
  <div class="mb-field">
    <h2 class="mb-word mb-base">קרמיקה</h2>
    <div class="mb-art" aria-hidden="true">
      <div class="mb-ring r2"></div>
      <div class="mb-ring r1"></div>
      <div class="mb-blob"><div class="mb-in"><span class="mb-word">קרמיקה</span></div></div>
    </div>
  </div>
  <p class="mb-lead">סדנאות לקבוצות קטנות, כלים בהזמנה אישית וחנות עם כלי בית שנשרפו בתנור שלנו.</p>
</section></div>`,
  js:``
},
{
  id:"g161", cat:"gsap", name:"קו אות שהופך לדופק וגלים", tech:"GSAP · ScrollTrigger scrub · SVG path", status:"מאושר-עין",
  desc:"קו דק וזוהר מתחיל שטוח ועובר בגלילה דרך חמש צורות: דופק חד אחד, גל סינוס, גל מרובע ובסוף חזרה לקו שקט. נקודה עם תווית ערך רוכבת על הקו, קו סף מקווקו חוצה את הדופק, ומתחת לקו מתחלפת כותרת עם הסבר לכל צורה. בלי GSAP העמוד מציג את הקו השקט ואת חמשת ההסברים ברשימה.",
  when:"שירות שמראה אות לאורך זמן: ניטור אתרים, תחזוקה, אבטחה, בריאות, אנרגיה, תשתיות. הצורה נקבעת לפי הנתון עצמו, ולכל שלב צריכה להיות שורה אמיתית להגיד. לא כאיור כללי של ״טכנולוגיה״ ולא כשאין מה למדוד.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם קו אחד דק מתחיל שטוח ומצמיח דופק, רעש, גל סינוס וגל מרובע, עם תוויות קטנות על הקו. נבנה מאפס מהצפייה. **הקו הוא פונקציה של התקדמות:** `y(u) = בסיס - (w1*s1(u) + w2*s2(u) + w3*s3(u) + w4*s4(u))`, כש-`s1` דופק (גאוסיאנים: פסגה, שתי שקיעות וגל T), `s2` סינוס, `s3` גל מרובע רך (`tanh(5*sin(...))`) ו-`s4` רעד שדועך. המשקלים `w` הם גשר משולש בין חמש עמדות על ציר ההתקדמות (0, .25, .5, .75, 1), עם `smoothstep`, ולכן כל צורה מתמזגת בצורה הבאה ולא קופצת. בכל עדכון נבנה מחדש `d` של מסלול אחד עם 200 נקודות. **SVG:** `preserveAspectRatio=none` ו-`vector-effect: non-scaling-stroke`, כדי שהקו יימתח לרוחב המסגרת בלי להתעבות. הזוהר הוא `drop-shadow` על SVG נפרד שמכיל רק את הקו, כדי שקווי הרשת לא ינצנצו. **נקודה ותווית:** ה-HTML ממוקם ב-50% רוחב ו-`translateY` מחושב מאותה פונקציה, כך שאין שינוי של `top` בגלילה. הערך בתווית מתחלף לפי העמדה הקרובה. **הכותרות:** חמש פריטי רשימה. במצב חי הם נערמים בתא אחד של גריד, והשקיפות והתזוזה של כל אחד נגזרות מההתקדמות (`scrub`), בלי טווינים של זמן. **RTL:** הקו נבנה תמיד מימין (`x = 1 - u`), וב-LTR ה-SVG מתהפך עם `:dir(ltr)`. התוויות נשארות קריאות כי הן HTML. ציר הזמן ושורת השעות לפי כיוון המסמך. **בלי GSAP ובהפחתת תנועה:** הקו השקט (מצב אחרון) מוטבע ב-`d`, הנקודה על קו הבסיס וחמשת ההסברים מוצגים ברשימה אחת מתחת לקו. **בטלפון** הסצנה נעוצה כמו בדסקטופ, הגרף נמוך יותר ושעות הציר מצטמצמות.",
  libs:["gsap","ScrollTrigger"],
  css:`.sg{position:relative;max-width:1100px;margin-inline:auto}
.sg-pin{display:grid;gap:clamp(24px,3vw,40px);padding-block:clamp(24px,4vw,64px)}
.sg-head{display:grid;gap:12px;max-width:52ch}
.sg-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.sg-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sg-fig{margin:0;display:grid;gap:12px}
.sg-plot{position:relative;height:clamp(200px,40svh,360px)}
.sg-svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
.sg-glow{filter:drop-shadow(0 0 8px color-mix(in srgb,var(--accent) 50%,transparent))}
.sg-svg:dir(ltr){transform:scaleX(-1)}
.sg-grid{fill:none;stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
.sg-line{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.sg-thr{position:absolute;inset-inline:0;top:30%;border-top:1px dashed color-mix(in srgb,var(--ink) 30%,transparent);pointer-events:none}
.sg-thr span{position:absolute;inset-inline-start:0;bottom:6px;font-size:13px;color:var(--muted)}
.sg-dot{position:absolute;left:50%;top:60%;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in srgb,var(--accent) 22%,transparent);transform:translate(-50%,-50%)}
.sg.is-live .sg-dot{top:0;transform:translate(-50%,-6px)}
.sg-val{position:absolute;inset-inline-start:calc(100% + 18px);top:-34px;padding:4px 12px;border:1px solid var(--line);border-radius:999px;background:var(--card);color:var(--ink);font-size:13px;font-weight:600;white-space:nowrap}
.sg-ticks{display:flex;justify-content:space-between;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.sg-caps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px}
.sg-caps li{display:grid;gap:6px;align-content:start;padding-top:14px;border-top:1px solid var(--line)}
.sg-caps b{font-size:15px}
.sg-caps span{font-size:14px;line-height:1.55;color:var(--muted)}
.sg-prog{display:none;height:2px;border-radius:999px;background:var(--line);overflow:hidden}
.sg-prog i{display:block;height:100%;background:var(--accent);transform-origin:right center;transform:scaleX(0)}
.sg:dir(ltr) .sg-prog i{transform-origin:left center}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, ההסברים נערמים בתא אחד */
.sg.is-live{height:420vh}
.sg.is-live .sg-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center;overflow:hidden}
.sg.is-live .sg-prog{display:block}
.sg.is-live .sg-caps{grid-template-columns:minmax(0,1fr);gap:0;max-width:56ch}
.sg.is-live .sg-caps li{grid-area:1 / 1;padding-top:0;border-top:0}
@media(max-width:767px){
  .sg-plot{height:clamp(200px,36svh,300px)}
  .sg-ticks span:nth-child(even){visibility:hidden}
}`,
  html:`<div class="stage"><section class="sg">
  <div class="sg-pin">
    <div class="sg-head">
      <h2>האתר שלכם נבדק כל דקה, גם בשבת</h2>
      <p>כך נראה זמן התגובה של אתר במשך יממה: רוב הזמן קו שטוח, ולפעמים אירוע שעליו מגיעה התראה.</p>
    </div>
    <figure class="sg-fig">
      <div class="sg-plot" role="img" aria-label="גרף זמן התגובה של האתר במשך יממה: קו שטוח, חריגה אחת חדה שנשלחה עליה התראה, ואחריה חזרה לקו שקט">
        <svg class="sg-svg" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
          <path class="sg-grid" d="M0 0V300M250 0V300M500 0V300M750 0V300M1000 0V300"/>
        </svg>
        <svg class="sg-svg sg-glow" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
          <path class="sg-line" d="M1000.0 180.0L995.0 175.1L990.0 171.1L985.0 168.5L980.0 167.4L975.0 167.9L970.0 169.8L965.0 172.8L960.0 176.4L955.0 180.1L950.0 183.5L945.0 186.3L940.0 188.1L935.0 188.8L930.0 188.4L925.0 187.1L920.0 185.0L915.0 182.5L910.0 179.9L905.0 177.5L900.0 175.6L895.0 174.3L890.0 173.9L885.0 174.1L880.0 175.1L875.0 176.6L870.0 178.3L865.0 180.1L860.0 181.8L855.0 183.1L850.0 184.0L845.0 184.3L840.0 184.1L835.0 183.4L830.0 182.4L825.0 181.2L820.0 179.9L815.0 178.7L810.0 177.8L805.0 177.2L800.0 177.0L795.0 177.2L790.0 177.6L785.0 178.4L780.0 179.2L775.0 180.1L770.0 180.9L765.0 181.5L760.0 182.0L755.0 182.1L750.0 182.0L745.0 181.6L740.0 181.1L735.0 180.5L730.0 179.9L725.0 179.4L720.0 178.9L715.0 178.6L710.0 178.5L705.0 178.6L700.0 178.9L695.0 179.2L690.0 179.6L685.0 180.1L680.0 180.5L675.0 180.8L670.0 181.0L665.0 181.0L660.0 181.0L655.0 180.8L650.0 180.5L645.0 180.2L640.0 179.9L635.0 179.7L630.0 179.5L625.0 179.3L620.0 179.3L615.0 179.3L610.0 179.5L605.0 179.6L600.0 179.8L595.0 180.0L590.0 180.2L585.0 180.4L580.0 180.5L575.0 180.5L570.0 180.5L565.0 180.4L560.0 180.3L555.0 180.1L550.0 180.0L545.0 179.8L540.0 179.7L535.0 179.7L530.0 179.7L525.0 179.7L520.0 179.7L515.0 179.8L510.0 179.9L505.0 180.0L500.0 180.1L495.0 180.2L490.0 180.2L485.0 180.2L480.0 180.2L475.0 180.2L470.0 180.1L465.0 180.1L460.0 180.0L455.0 179.9L450.0 179.9L445.0 179.8L440.0 179.8L435.0 179.8L430.0 179.9L425.0 179.9L420.0 180.0L415.0 180.0L410.0 180.1L405.0 180.1L400.0 180.1L395.0 180.1L390.0 180.1L385.0 180.1L380.0 180.1L375.0 180.0L370.0 180.0L365.0 180.0L360.0 179.9L355.0 179.9L350.0 179.9L345.0 179.9L340.0 179.9L335.0 180.0L330.0 180.0L325.0 180.0L320.0 180.0L315.0 180.0L310.0 180.1L305.0 180.1L300.0 180.1L295.0 180.0L290.0 180.0L285.0 180.0L280.0 180.0L275.0 180.0L270.0 180.0L265.0 180.0L260.0 180.0L255.0 180.0L250.0 180.0L245.0 180.0L240.0 180.0L235.0 180.0L230.0 180.0L225.0 180.0L220.0 180.0L215.0 180.0L210.0 180.0L205.0 180.0L200.0 180.0L195.0 180.0L190.0 180.0L185.0 180.0L180.0 180.0L175.0 180.0L170.0 180.0L165.0 180.0L160.0 180.0L155.0 180.0L150.0 180.0L145.0 180.0L140.0 180.0L135.0 180.0L130.0 180.0L125.0 180.0L120.0 180.0L115.0 180.0L110.0 180.0L105.0 180.0L100.0 180.0L95.0 180.0L90.0 180.0L85.0 180.0L80.0 180.0L75.0 180.0L70.0 180.0L65.0 180.0L60.0 180.0L55.0 180.0L50.0 180.0L45.0 180.0L40.0 180.0L35.0 180.0L30.0 180.0L25.0 180.0L20.0 180.0L15.0 180.0L10.0 180.0L5.0 180.0L0.0 180.0"/>
        </svg>
        <div class="sg-thr" aria-hidden="true"><span>סף התראה</span></div>
        <span class="sg-dot" aria-hidden="true"><span class="sg-val">96 מ״ש</span></span>
      </div>
      <div class="sg-ticks" aria-hidden="true"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
      <div class="sg-prog" aria-hidden="true"><i></i></div>
    </figure>
    <ul class="sg-caps">
      <li><b>יציב</b><span>זמן תגובה ממוצע של 98 מילישניות. בדיקה כל דקה, בלי חריגות.</span></li>
      <li><b>חריגה</b><span>בשעה 12:41 זמן התגובה עלה ל-2.4 שניות. ההתראה נשלחה אליך בתוך דקה.</span></li>
      <li><b>עומס יומי</b><span>בשעות הערב העומס עולה ויורד בקצב קבוע. זה תקין ואין צורך להגיב.</span></li>
      <li><b>תחזוקה</b><span>חלונות עדכון מתוזמנים נרשמים בנפרד, כדי שלא ייספרו כהשבתה.</span></li>
      <li><b>חזר לשגרה</b><span>זמינות של 99.98% ב-30 הימים האחרונים. הדוח השבועי מגיע אליך במייל.</span></li>
    </ul>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הקו השקט עם חמשת ההסברים
  const root=document.querySelector(".sg"),plot=root.querySelector(".sg-plot"),path=root.querySelector(".sg-line"),dot=root.querySelector(".sg-dot"),
    val=root.querySelector(".sg-val"),fill=root.querySelector(".sg-prog i"),caps=[].slice.call(root.querySelectorAll(".sg-caps li"));
  const STATIC=path.getAttribute("d"),VAL=["98 מ״ש","2.4 שנ׳","420 מ״ש","3 דק׳ כבוי","96 מ״ש"];
  const N=200,BASE=.6,W=1000,H=300;
  const cl=x=>Math.min(1,Math.max(0,x)),sm=(a,b,x)=>{x=cl((x-a)/(b-a));return x*x*(3-2*x);};
  const g=(u,c,w)=>Math.exp(-((u-c)*(u-c))/(w*w));
  // חמש צורות, כל אחת כהיסט מקו הבסיס (חיובי למעלה): דופק, סינוס, גל מרובע רך, רעד שדועך
  const S1=u=>.46*g(u,.5,.009)-.1*g(u,.478,.008)-.13*g(u,.524,.008)+.09*g(u,.58,.03)+.05*g(u,.4,.022)+.15*g(u,.2,.008)-.04*g(u,.18,.007)+.15*g(u,.8,.008)-.04*g(u,.78,.007);
  const S2=u=>.17*Math.sin(6.2832*3.2*u+.4);
  const S3=u=>.15*Math.tanh(5*Math.sin(6.2832*2.5*u+.3));
  const S4=u=>.05*Math.exp(-u*8)*Math.sin(u*70);
  const CEN=[0,.25,.5,.75,1];
  const off=(u,w)=>w[1]*S1(u)+w[2]*S2(u)+w[3]*S3(u)+w[4]*S4(u);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const st={p:0};let h=plot.clientHeight,last=-1;
    function render(){
      const p=st.p,w=CEN.map(c=>sm(0,1,1-Math.abs(p-c)/.25));
      let d="";
      for(let k=0;k<=N;k++){const u=k/N;d+=(k?"L":"M")+((1-u)*W).toFixed(1)+" "+((BASE-off(u,w))*H).toFixed(1);}
      path.setAttribute("d",d);
      dot.style.transform="translate(-50%,"+(((BASE-off(.5,w))*h)-6).toFixed(1)+"px)";
      const idx=Math.round(p*4);if(idx!==last){last=idx;val.textContent=VAL[idx];}
      caps.forEach((li,i)=>{const dist=Math.abs(p-i/4);li.style.opacity=cl(1-(dist-.075)/.05).toFixed(3);li.style.transform="translateY("+(Math.max(-16,Math.min(16,(i/4-p)*80))).toFixed(1)+"px)";});
      fill.style.transform="scaleX("+p.toFixed(3)+")";
    }
    const ro=new ResizeObserver(()=>{h=plot.clientHeight;render();});
    // ההתקדמות היא המספר היחיד שמזיז את הקו, הנקודה וההסברים
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}})
      .to(st,{p:1,duration:1,ease:"none",onUpdate:render},0);
    render();ro.observe(plot);
    return()=>{ro.disconnect();root.classList.remove("is-live");path.setAttribute("d",STATIC);dot.style.transform="";val.textContent=VAL[4];
      caps.forEach(li=>{li.style.opacity="";li.style.transform="";});fill.style.transform="";};
  });
})();`
},
{
  id:"g162", cat:"gsap", name:"פאות שנצמדות לסמל שלד", tech:"GSAP · ScrollTrigger scrub · SVG polygons", status:"מאושר-עין",
  desc:"הסמל מתחיל כשרטוט דק של קווים ונקודות עם גזע קטן אחד. כשגוללים, עשרים וארבע פאות משולשות נכנסות מבחוץ בסיבוב, אחת אחרי השנייה, מהקרובה לגזע ועד הרחוקה, ונצמדות למקום שלהן על השרטוט. השרטוט נמוג, והסמל המלא מקבל נטייה קלה וזוהר. בלי GSAP מוצג הסמל המוכן.",
  when:"חשיפה של סמל או צורה שמורכבת מחלקים: לוגו של בניין, מפעל, גינון, תוכנה, בנייה. עובד כשיש לסמל מבנה משולשים אמיתי ויש משמעות לכך שהוא ״נבנה״. פעם אחת בעמוד, ליד הכותרת הראשית של העסק.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו סמל מתחיל כשרטוט לבן של נקודות וקווים עם גזע קטן, ופאות צבעוניות משולשות נכנסות מבחוץ ונצמדות אחת אחת עד שנוצר גוף מלא. נבנה מאפס מהצפייה. **הנתונים:** 24 משולשי כתר ו-2 משולשי גזע, בטבלת נקודות אחת של 19 קודקודים. השרטוט הוא אותם משולשים כקווים (כל קצה פעם אחת), וצבע כל פאה נגזר מ-`--k` (בהירות בין 0 ל-1) דרך `color-mix(in srgb, var(--accent) calc((.45 + var(--k) * .55) * 100%), var(--bg))` (הטווח מתחיל ב-45% כדי שהפאות הכהות לא יימסו לרקע), כך שכל עור מקבל פאות באותו צבע בהירות שונה. המילוי והקו של כל פאה באותו צבע (`currentColor`), כדי שלא יישארו חריצים שקופים בין פאות סמוכות. **התנועה:** כל פאה נכנסת בטווין `fromTo` על `x`, `y`, `rotation`, `scale` ו-`autoAlpha` סביב מרכז הפאה (`svgOrigin` מה-`data-c`). המרחק מהגזע קובע את הסדר, והיסטים אקראיים מקובעים עם מחולל Lehmer, כך שהסדר נראה אותו דבר בכל טעינה. השרטוט דועך ב-18% האחרונים, ואז נטייה של 3 מעלות וזוהר שהוא משתנה CSS (`--gl`) שה-GSAP מזיז. **RTL:** הסמל עצמו לא תלוי כיוון. הפריסה בגריד לפי כיוון המסמך, והטקסט בצד ההתחלה. התאורה בסמל באה מהצד השמאלי, ובאתר LTR אפשר להפוך אותו עם `scaleX(-1)` על ה-SVG. **בלי GSAP ובהפחתת תנועה:** הסמל המלא עם הזוהר, בלי שרטוט. **בטלפון** הסצנה נעוצה, הטקסט למעלה והסמל מתחת בגובה של עד 44% מהמסך.",
  libs:["gsap","ScrollTrigger"],
  css:`.sh{position:relative;max-width:1100px;margin-inline:auto}
.sh-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);padding-block:clamp(24px,4vw,64px)}
.sh-copy{display:grid;gap:16px;justify-items:start;max-width:40ch}
.sh-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.sh h2{margin:0;font-size:clamp(30px,3.8vw,52px);line-height:1.1;text-wrap:balance}
.sh-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.sh-link{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.sh-link:hover{transform:translateY(-2px)}}
.sh-link:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.sh-fig{margin:0;display:grid;justify-items:center}
.sh-svg{display:block;width:min(100%,440px);height:auto;max-height:76svh;overflow:visible;filter:drop-shadow(0 0 calc(var(--gl,1) * 18px) color-mix(in srgb,var(--accent) calc(var(--gl,1) * 45%),transparent))}
.sh-f{color:color-mix(in srgb,var(--accent) calc((.45 + var(--k) * .55) * 100%),var(--bg));fill:currentColor;stroke:currentColor;stroke-width:.8;stroke-linejoin:round}
.sh-wire{opacity:0}
.sh-wire path{fill:none;stroke:var(--ink);stroke-width:1;vector-effect:non-scaling-stroke}
.sh-wire circle{fill:var(--ink)}
.sh-ground{fill:none;stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, והשרטוט מופיע עד שהפאות נכנסות */
.sh.is-live{height:300vh}
.sh.is-live .sh-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
.sh.is-live .sh-wire{opacity:.65}
@media(prefers-reduced-motion:reduce){.sh-link{transition:none}}
@media(max-width:767px){
  .sh-pin{grid-template-columns:minmax(0,1fr);gap:16px;align-content:center}
  .sh-svg{max-height:44svh}
}`,
  html:`<div class="stage"><section class="sh">
  <div class="sh-pin">
    <div class="sh-copy">
      <p class="sh-k">נטע, גינון ונוף</p>
      <h2>מתכננים את הגינה לפני שנוגעים באדמה</h2>
      <p class="sh-lead">כל פרויקט מתחיל בשרטוט של החצר ומסתיים בגינה גמורה: קרקע, השקיה, צמחים ותאורה. לוח הזמנים מוסכם מראש וכל שלב מתועד.</p>
      <a class="sh-link" href="#">לתיאום ביקור בחצר</a>
    </div>
    <figure class="sh-fig">
      <svg class="sh-svg" viewBox="0 0 400 440" role="img" aria-label="סמל של עץ בצורת פאות: כתר מצולע על גזע קצר">
        <path class="sh-ground" d="M110 414H290"/>
        <g class="sh-wire" aria-hidden="true"><path d="M200 17.5L276.9 44M276.9 44L206 94.8M206 94.8L200 17.5M276.9 44L316.5 106.4M316.5 106.4L281.6 132.1M281.6 132.1L276.9 44M206 94.8L281.6 132.1M281.6 132.1L204 176M204 176L206 94.8M316.5 106.4L350.4 170M350.4 170L281.6 132.1M350.4 170L322.9 237.1M322.9 237.1L262.8 205.5M262.8 205.5L350.4 170M281.6 132.1L262.8 205.5M262.8 205.5L204 176M322.9 237.1L274.3 291.7M274.3 291.7L262.8 205.5M274.3 291.7L200 326.1M200 326.1L206 245.8M206 245.8L274.3 291.7M262.8 205.5L206 245.8M206 245.8L204 176M200 326.1L129.8 285.1M129.8 285.1L206 245.8M129.8 285.1L75.7 237.9M75.7 237.9L127.6 217.5M127.6 217.5L129.8 285.1M206 245.8L127.6 217.5M127.6 217.5L204 176M75.7 237.9L52 170M52 170L127.6 217.5M52 170L80.8 104.9M80.8 104.9L144.4 139.9M144.4 139.9L52 170M127.6 217.5L144.4 139.9M144.4 139.9L204 176M80.8 104.9L119.1 37.5M119.1 37.5L144.4 139.9M119.1 37.5L200 17.5M206 94.8L119.1 37.5M144.4 139.9L206 94.8M186 300L216 300M216 300L222 414M222 414L186 300M222 414L178 414M178 414L186 300"/><circle cx="200" cy="17.5" r="2.6"/><circle cx="276.9" cy="44" r="2.6"/><circle cx="316.5" cy="106.4" r="2.6"/><circle cx="350.4" cy="170" r="2.6"/><circle cx="322.9" cy="237.1" r="2.6"/><circle cx="274.3" cy="291.7" r="2.6"/><circle cx="200" cy="326.1" r="2.6"/><circle cx="129.8" cy="285.1" r="2.6"/><circle cx="75.7" cy="237.9" r="2.6"/><circle cx="52" cy="170" r="2.6"/><circle cx="80.8" cy="104.9" r="2.6"/><circle cx="119.1" cy="37.5" r="2.6"/><circle cx="206" cy="94.8" r="2.6"/><circle cx="281.6" cy="132.1" r="2.6"/><circle cx="262.8" cy="205.5" r="2.6"/><circle cx="206" cy="245.8" r="2.6"/><circle cx="127.6" cy="217.5" r="2.6"/><circle cx="144.4" cy="139.9" r="2.6"/><circle cx="204" cy="176" r="2.6"/></g>
        <g class="sh-solid"><polygon class="sh-f" points="200,17.5 276.9,44 206,94.8" style="--k:0.74" data-c="227.6 52.1"/><polygon class="sh-f" points="276.9,44 316.5,106.4 281.6,132.1" style="--k:0.58" data-c="291.7 94.2"/><polygon class="sh-f" points="276.9,44 206,94.8 281.6,132.1" style="--k:0.58" data-c="254.8 90.3"/><polygon class="sh-f" points="206,94.8 281.6,132.1 204,176" style="--k:0.67" data-c="230.5 134.3"/><polygon class="sh-f" points="316.5,106.4 350.4,170 281.6,132.1" style="--k:0.37" data-c="316.2 136.2"/><polygon class="sh-f" points="350.4,170 322.9,237.1 262.8,205.5" style="--k:0.37" data-c="312 204.2"/><polygon class="sh-f" points="350.4,170 281.6,132.1 262.8,205.5" style="--k:0.34" data-c="298.3 169.2"/><polygon class="sh-f" points="281.6,132.1 262.8,205.5 204,176" style="--k:0.37" data-c="249.5 171.2"/><polygon class="sh-f" points="322.9,237.1 274.3,291.7 262.8,205.5" style="--k:0.31" data-c="286.7 244.8"/><polygon class="sh-f" points="274.3,291.7 200,326.1 206,245.8" style="--k:0.3" data-c="226.8 287.9"/><polygon class="sh-f" points="274.3,291.7 262.8,205.5 206,245.8" style="--k:0.36" data-c="247.7 247.7"/><polygon class="sh-f" points="262.8,205.5 206,245.8 204,176" style="--k:0.3" data-c="224.3 209.1"/><polygon class="sh-f" points="200,326.1 129.8,285.1 206,245.8" style="--k:0.47" data-c="178.6 285.7"/><polygon class="sh-f" points="129.8,285.1 75.7,237.9 127.6,217.5" style="--k:0.57" data-c="111 246.8"/><polygon class="sh-f" points="129.8,285.1 206,245.8 127.6,217.5" style="--k:0.51" data-c="154.4 249.5"/><polygon class="sh-f" points="206,245.8 127.6,217.5 204,176" style="--k:0.5" data-c="179.2 213.1"/><polygon class="sh-f" points="75.7,237.9 52,170 127.6,217.5" style="--k:0.66" data-c="85.1 208.5"/><polygon class="sh-f" points="52,170 80.8,104.9 144.4,139.9" style="--k:0.91" data-c="92.4 138.2"/><polygon class="sh-f" points="52,170 127.6,217.5 144.4,139.9" style="--k:0.71" data-c="108 175.8"/><polygon class="sh-f" points="127.6,217.5 144.4,139.9 204,176" style="--k:0.81" data-c="158.7 177.8"/><polygon class="sh-f" points="80.8,104.9 119.1,37.5 144.4,139.9" style="--k:0.84" data-c="114.8 94.1"/><polygon class="sh-f" points="119.1,37.5 200,17.5 206,94.8" style="--k:0.84" data-c="175 49.9"/><polygon class="sh-f" points="119.1,37.5 144.4,139.9 206,94.8" style="--k:0.89" data-c="156.5 90.7"/><polygon class="sh-f" points="144.4,139.9 206,94.8 204,176" style="--k:0.81" data-c="184.8 136.9"/><polygon class="sh-f sh-stem" points="186,300 216,300 222,414" style="--k:0.9"/><polygon class="sh-f sh-stem" points="186,300 222,414 178,414" style="--k:0.7"/></g>
      </svg>
    </figure>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הסמל המלא
  const root=document.querySelector(".sh"),svg=root.querySelector(".sh-svg"),wire=root.querySelector(".sh-wire"),
    fs=[].slice.call(root.querySelectorAll(".sh-f:not(.sh-stem)"));
  const cl=x=>Math.min(1,Math.max(0,x));
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    // היסטים אקראיים אבל קבועים: אותו מחולל בכל טעינה
    let s=11;const rnd=()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};
    const STEM=[200,300];
    const items=fs.map(el=>{const c=el.getAttribute("data-c").split(" ").map(Number),a=rnd()*6.2832,d=300+rnd()*220;
      return{el,c,dist:Math.hypot(c[0]-STEM[0],c[1]-STEM[1]),x:Math.cos(a)*d,y:Math.sin(a)*d,r:(rnd()<.5?-1:1)*(70+rnd()*110)};
    }).sort((a,b)=>a.dist-b.dist);
    items.forEach(it=>gsap.set(it.el,{svgOrigin:it.c[0]+" "+it.c[1]}));
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    const n=items.length;
    items.forEach((it,i)=>{
      tl.fromTo(it.el,{x:it.x,y:it.y,rotation:it.r,scale:.5,autoAlpha:0},{x:0,y:0,rotation:0,scale:1,autoAlpha:1,duration:.2,ease:"power3.out"},.06+.5*i/(n-1));
    });
    tl.fromTo(wire,{opacity:.65},{opacity:0,duration:.18,ease:"none"},.72)
      .fromTo(svg,{rotation:0,"--gl":0},{rotation:-3,"--gl":1,duration:.28,ease:"power1.inOut"},.72);
    return()=>{gsap.set(fs.concat([wire,svg]),{clearProps:"all"});svg.style.removeProperty("--gl");root.classList.remove("is-live");};
  });
})();`
},
{
  id:"g164", cat:"gsap", name:"שמש שעולה מאחורי קו האופק", tech:"GSAP · ScrollTrigger scrub · overflow clip", status:"מאושר-עין",
  desc:"בגלילה עולה שמש מתחת לקו אופק: דיסק רך שגדל מעט, מקבל הילה, שתי טבעות אור וזוהר שמתפשט לאורך הקו. מעליו המילים של הכותרת עולות מתחת לאותו קו, אחת אחרי השנייה, וכל חלק שעדיין מתחת לאופק נחתך. בסוף השמש יושבת על הקו מאחורי כל הכותרת, האור נשפך גם מתחת לקו, ואז נחשפים הסבר וכפתור. בלי GSAP העמוד מציג את המצב הסופי.",
  when:"הירו של עסק שיש בו משמעות של עלייה, התחלה או אור: אנרגיה סולארית, שירותי בוקר, קפה, יוגה, שחר חדש בעסק, חברת הובלה ללא לילה. כותרת קצרה של שתיים עד ארבע מילים. לא כשהכותרת ארוכה או כשאין קשר בין העסק לרעיון של זריחה.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו מילים של כותרת נחתכות בקו אופק ושמש עולה מאחוריהן, גדלה ומקבלת הילה. נבנה מאפס מהצפייה. **ליטוש (25.10):** הגרסה הראשונה הייתה דיסק שטוח על רקע ריק. עכשיו יש לסצנה אווירה: שטיפת צבע שעולה מהאופק, זוהר רך לאורך הקו, שתי טבעות אור סביב השמש וזוהר שנשפך גם מתחת לקו. השמש יושבת על הקו וחתוכה מעט בתחתיתה, כך שהיא נראית כמו שמש שכבר זרחה ולא כמו כדור שצף. **החיתוך:** קופסת השמיים היא `overflow: hidden` וקו האופק הוא הקצה התחתון שלה (עם קו דק שדוהה בקצוות ב-`::after`). הכותרת צמודה לתחתית הקופסה (`bottom: 0`), לכן כשהמילים מורמות בעשרות אחוזים מתחת לקו, הקצה התחתון חותך אותן בלי מסכה לכל מילה. **השמש:** דיסק עגול בצבע `color-mix` מהמבטא עם מעבר רך, שיושב ב-`bottom` מעט מתחת לקו (`-.04` מהקוטר). ב-GSAP מזיזים רק `yPercent` (112 עד 0) ו-`scale` (.86 עד 1), בלי טרנספורם ב-CSS שיתנגש בו. ההילה והטבעות הן אלמנטים נפרדים שרק השקיפות והגודל שלהם משתנים, כך שאין צל תיבה בגלילה. **קצוות רכים:** שטיפת הצבע מקבלת מסכה אופקית (`mask-image`) כדי שקצוות הקופסה לא ייראו כמלבן, ובטלפון הזוהר, ההשתקפות והטבעות מצטמצמים כדי שלא ייחתכו בקצה. **הצבעים:** הטקסט יושב על דיסק בהיר, ולכן נשאר קריא בכל עור. אם רוצים שמש בצבע חם יותר, מחליפים את אחוז המבטא בדיסק ובזוהר. **הסדר בציר:** השמש 0 עד .78 עם ease, שטיפת הצבע לאורך כל הדרך, הזוהר מ-.1, ההילה והמילים מ-.3 (הסטגר .1), הטבעות והקו הזוהר מ-.46, ההשתקפות ב-.6, והסבר וכפתור ב-.72. **RTL:** המילים בשורה אחת ב-flex, והמילה הראשונה בצד ההתחלה (ימין). השמש במרכז, ולכן אין מה להפוך באתר LTR. **בלי GSAP ובהפחתת תנועה:** השמש על הקו, הכותרת מלאה וההסבר מוצג. **גודל הכותרת נמדד מרוחב השמיים ולא מרוחב החלון** (`container-type:inline-size` על `.sr-sky`, ו-`12.4cqi`): השמיים חותכים את מה שבולט (overflow:hidden) ועוצרים ב-1100px, ולכן כותרת לפי vw נחתכה בצדדים בחלון רחב (ליאב, 25.10: «הטקסט נחתך בצדדים»). כך היא תופסת בערך 84% מהרוחב בכל מסך, נשארת בשורה אחת גם ב-320, והסצנה נעוצה בטלפון כמו בדסקטופ.",
  libs:["gsap","ScrollTrigger"],
  css:`.sr{position:relative;max-width:1100px;margin-inline:auto}
.sr-pin{--g:clamp(16px,2.4vw,32px);--h:clamp(260px,calc(100svh - 360px),560px);--d:min(56vw,calc(var(--h) * .7),520px);display:grid;align-content:center;gap:var(--g);padding-block:clamp(16px,3vw,48px)}
.sr-k{margin:0;text-align:center;font-size:15px;font-weight:600;color:var(--muted)}
.sr-sky{position:relative;overflow:hidden;height:var(--h);container-type:inline-size}
.sr-sky::after{content:"";position:absolute;inset-inline:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--ink) 30%,transparent) 14%,color-mix(in srgb,var(--ink) 30%,transparent) 86%,transparent)}
.sr-wash{position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--accent) 18%,transparent),color-mix(in srgb,var(--accent) 6%,transparent) 48%,transparent 88%);-webkit-mask-image:linear-gradient(90deg,transparent,black 16%,black 84%,transparent);mask-image:linear-gradient(90deg,transparent,black 16%,black 84%,transparent)}
.sr-bloom{position:absolute;left:calc(50% - var(--d) * 1.3);bottom:calc(var(--d) * -.45);width:calc(var(--d) * 2.6);height:calc(var(--d) * .9);border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 40%,transparent),transparent)}
.sr-lit{position:absolute;left:calc(50% - var(--d) * 1.1);bottom:0;width:calc(var(--d) * 2.2);height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent)}
.sr-sun{position:absolute;left:50%;margin-left:calc(var(--d) / -2);bottom:calc(var(--d) * -.04);width:var(--d);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 50% 40%,color-mix(in srgb,var(--accent) 12%,var(--bg)),color-mix(in srgb,var(--accent) 50%,var(--bg)))}
.sr-ring{position:absolute;inset:-15%;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);pointer-events:none}
.sr-ring2{inset:-34%;border-color:color-mix(in srgb,var(--accent) 18%,transparent)}
.sr-halo{position:absolute;inset:-30%;border-radius:50%;pointer-events:none;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 30%,transparent),transparent)}
.sr-h{position:absolute;inset-inline:0;bottom:0;z-index:1;margin:0;display:flex;justify-content:center;gap:.28em;padding-bottom:.1em;font-size:clamp(30px,12.4cqi,160px);font-weight:800;line-height:1.02;letter-spacing:-.02em;white-space:nowrap}
.sr-w{display:inline-block}
.sr-refl{position:relative;height:0;margin-top:calc(var(--g) * -1)}
.sr-refl::before{content:"";position:absolute;left:calc(50% - var(--d) * .9);top:0;width:calc(var(--d) * 1.8);height:calc(var(--d) * .4);background:radial-gradient(farthest-side at 50% 0,color-mix(in srgb,var(--accent) 24%,transparent),transparent)}
.sr-ground{position:relative;display:grid;gap:16px;justify-items:center;text-align:center}
.sr-lead{margin:0;max-width:52ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.sr-link{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.sr-link:hover{transform:translateY(-2px)}}
.sr-link:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, והשמש עולה עם הגלילה */
.sr.is-live{height:280vh}
.sr.is-live .sr-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
@media(prefers-reduced-motion:reduce){.sr-link{transition:none}}
@media(max-width:767px){
  .sr-pin{--h:clamp(260px,calc(100svh - 400px),440px);--d:min(62vw,calc(var(--h) * .7))}
  .sr-halo{inset:-22%}
  .sr-ring{inset:-8%}
  .sr-ring2{inset:-20%}
  .sr-bloom,.sr-lit{left:calc(50% - var(--d) * .7);width:calc(var(--d) * 1.4)}
  .sr-refl::before{left:calc(50% - var(--d) * .7);width:calc(var(--d) * 1.4)}
}`,
  html:`<div class="stage"><section class="sr">
  <div class="sr-pin">
    <p class="sr-k">אלון סולאר, מערכות סולאריות לבתים פרטיים</p>
    <div class="sr-sky">
      <div class="sr-wash" aria-hidden="true"></div>
      <div class="sr-bloom" aria-hidden="true"></div>
      <div class="sr-sun" aria-hidden="true"><div class="sr-halo"></div><i class="sr-ring"></i><i class="sr-ring sr-ring2"></i></div>
      <div class="sr-lit" aria-hidden="true"></div>
      <h2 class="sr-h"><span class="sr-w">חשמל</span><span class="sr-w">מהגג</span><span class="sr-w">שלכם</span></h2>
    </div>
    <div class="sr-refl" aria-hidden="true"></div>
    <div class="sr-ground">
      <p class="sr-lead">מתכננים, מתקינים ומחברים מערכת סולארית לבית פרטי, כולל הטיפול באישורים מול חברת החשמל.</p>
      <a class="sr-link" href="#">לקבלת הצעה לגג שלכם</a>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת השמש מעל הקו והכותרת המלאה
  const root=document.querySelector(".sr"),sun=root.querySelector(".sr-sun"),halo=root.querySelector(".sr-halo"),
    gr=root.querySelector(".sr-ground"),words=[].slice.call(root.querySelectorAll(".sr-w")),
    wash=root.querySelector(".sr-wash"),bloom=root.querySelector(".sr-bloom"),lit=root.querySelector(".sr-lit"),
    refl=root.querySelector(".sr-refl"),rings=[].slice.call(root.querySelectorAll(".sr-ring"));
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    // השמש והמילים מוזזות רק ב-yPercent: הקצה התחתון של קופסת השמיים הוא קו האופק והוא חותך כל מה שמתחתיו
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl
      .fromTo(sun,{yPercent:112,scale:.86},{yPercent:0,scale:1,duration:.78,ease:"power2.out"},0)
      .fromTo(wash,{opacity:0},{opacity:1,duration:.8,ease:"power1.in"},0)
      .fromTo(bloom,{opacity:0,scaleX:.5},{opacity:1,scaleX:1,duration:.7,ease:"power1.out"},.1)
      .fromTo(halo,{opacity:0,scale:.7},{opacity:1,scale:1,duration:.5,ease:"none"},.3)
      .fromTo(rings,{opacity:0,scale:.88},{opacity:1,scale:1,duration:.3,ease:"power1.out",stagger:.08},.46)
      .fromTo(lit,{opacity:0,scaleX:.3},{opacity:1,scaleX:1,duration:.4,ease:"power1.out"},.46)
      .fromTo(refl,{opacity:0},{opacity:1,duration:.3,ease:"none"},.6)
      .fromTo(gr,{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.2,ease:"power2.out"},.72);
    // כל מילה בטווח משלה (ולא stagger): כך שכל המילים מוסתרות מתחת לאופק כבר בטעינה
    words.forEach((w,i)=>tl.fromTo(w,{yPercent:115},{yPercent:0,duration:.3,ease:"power3.out"},.3+i*.1));
    return()=>{gsap.set([sun,halo,gr,wash,bloom,lit,refl].concat(rings,words),{clearProps:"all"});root.classList.remove("is-live");};
  });
})();`
}
];
