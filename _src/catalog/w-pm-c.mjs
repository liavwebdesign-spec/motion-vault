// שבעה מהלכים של מוצר ותהליך מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// סרגל עם ראש הפעלה שמחליף כרטיס, פאנל סליידרים שמשנה תמונה, עורך עם תצוגה חיה, תמונה שעוברת בין מכשירים,
// עמוד שלם בפרספקטיבה, עונות שמתחלפות עם חלקיקים, וחלקים שמתכנסים למוצר אחד.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
export default [
{
  id:"g165", cat:"gsap", name:"ראש הפעלה על סרגל שמחליף כרטיס", tech:"GSAP · ScrollTrigger scrub · sticky · 3D", status:"מאושר-עין",
  desc:"כרטיס תצוגה אחד נעוץ במסך, ומתחתיו סרגל עם שנתות וראש הפעלה. כשגוללים הראש נע לאורך הסרגל, ובכל סימן הכרטיס מסתובב עד שהוא נעלם על הקצה, וחוזר עם התוכן הבא. הכיתוב והתווית שעל הסרגל מתחלפים יחד איתו. התוכן אחד, אבל רואים אותו נע בציר זמן.",
  when:"סקשן שמציג שלושה עד ארבעה סוגי עבודה, חבילות או שלבים מאותו סוג: סוגי פרויקטים של סטודיו, חבילות שירות, שימושים של מוצר. מתאים כשיש משהו להראות בכל אחד (לא רק כותרת), ורוצים שהקורא ירגיש שהוא עובר ביניהם בעצמו. פעם אחת בעמוד, ולא כשיש יותר מחמישה פריטים.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר ב-prompt-motion.com (21.10.2026), שבהם כרטיס תצוגה אחד מתחלף מעל סרגל זמן עם ראש הפעלה. נבנה מאפס מהצפייה. **המארקאפ הוא רשימה:** כל סוג עבודה הוא `li` עם התצוגה והכיתוב שלו. בלי GSAP ובהפחתת תנועה זה מה שרואים, כרטיסים זה לצד זה (ובטלפון זה מתחת לזה), והסרגל מוסתר. **כשהמהלך רץ** הסקריפט מוסיף `is-live`: הרשימה הופכת למקבץ כרטיסים באותו מקום, והסקשן נעשה גבוה עם שכבה דביקה (`sticky`) שנעוצה במסך. **הציר:** ראש ההפעלה זז לאורך הסרגל לפי ההתקדמות, והסימנים (`.pr-mk`) יושבים בדיוק במקומות שבהם הכרטיס מתחלף. הסרגל, הסימנים והתוויות הם `span` ו-`i` ולא כפתורים, כי זה איור ולא פקד. **המעבר:** הכרטיס היוצא מסתובב סביב הציר האנכי (`rotationY` עד 90 מעלות) עד שהוא על הקצה ולא נראה, והנכנס ממשיך מאותה נקודה מהצד השני ומסתובב חזרה עד שהוא שטוח. התוכן מוחלף ברגע שאין מה לראות, ולכן המעבר לא נראה כמו חיתוך. כל הכרטיסים נשארים ב-DOM בשקיפות 0 ולא ב-`display:none`, כדי שקורא מסך יקרא את כולם. **כיוון:** הראש זז מימין לשמאל, כי זה כיוון ההתקדמות בעמוד בעברית. הכיוון נקבע מ-`direction` של הסקשן, ולכן באתר משמאל לימין הוא מתהפך לבד. את התוויות מיישרים לשוליים עם `:dir(ltr)`. **מדידה:** הרוחב נמדד מהסרגל בכל refresh (`invalidateOnRefresh`), ולכן זה נכון בכל רוחב מסך. כדי להחליף את התצוגות בתמונות או בסרטונים מחליפים את ה-`.pr-shot` בתוך כל כרטיס, והשאר נשאר.",
  libs:["gsap","ScrollTrigger"],
  css:`.pr{--pr-a:color-mix(in srgb,var(--ink) 9%,transparent);--sh:100%;max-width:1040px;margin-inline:auto}
.pr:dir(ltr){--sh:-100%}
.pr-pin{display:grid;gap:40px}
.pr-copy{display:grid;gap:10px;max-width:46ch}
.pr-copy h2{margin:0;font-size:clamp(28px,3.4vw,48px);font-weight:700;line-height:1.1;text-wrap:balance}
.pr-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pr-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,224px),1fr));gap:20px}
.pr-card{display:grid;gap:16px;align-content:start;padding:16px;border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 20px 44px color-mix(in srgb,var(--ink) 7%,transparent)}
.pr-cap b{display:block;font-size:19px;font-weight:700}
.pr-cap span{display:block;margin-top:4px;color:var(--muted);font-size:15px;line-height:1.5}
/* התצוגות: ארבעה שרטוטים מקווים וריבועים, כדי שהדמו לא יישען על תמונה */
.pr-shot{aspect-ratio:4/3;display:grid;gap:10px;padding:14px;overflow:hidden;border-radius:14px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line)}
.pr-shot i{display:block;border-radius:6px;background:var(--pr-a)}
.pr-shot .k{background:var(--accent)}
.pr-shot .t{height:8px}
.pr-shot .h{height:14px}
.pr-shot .col{display:grid;gap:8px;align-content:center}
.pr-shot .pill{width:46%;height:18px;border-radius:99px}
.pr-shot .img{border-radius:10px;background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 38%,transparent),color-mix(in srgb,var(--accent) 8%,transparent))}
.pr-shot.a{grid-template:auto 1fr/1.15fr 1fr}
.pr-shot.a .nav{grid-column:1/-1;width:55%}
.pr-shot.b{grid-template:auto 1fr/1fr .85fr}
.pr-shot.b .nav{grid-column:1/-1;width:55%}
.pr-shot .form{display:grid;gap:8px;align-content:center;padding:12px;border-radius:10px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.pr-shot .form i{height:14px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line)}
.pr-shot .form .k{height:16px;box-shadow:none}
.pr-shot.c{grid-template:1fr 1fr/1fr 1fr;gap:10px}
.pr-shot .tile{display:grid;grid-template-rows:1fr auto;gap:6px}
.pr-shot.d{grid-template:1fr/.4fr 1fr}
.pr-shot .row{display:grid;grid-template-columns:1.4fr 1fr .6fr;gap:6px}
.pr-shot .row i{height:10px}
/* הסרגל: מוסתר בלי תנועה. הסימנים והתוויות יושבים לפי --k (0 עד 1) מצד ההתחלה */
.pr-ruler{display:none}
.pr-track{position:absolute;inset-inline:0;top:24px;height:20px;background:repeating-linear-gradient(to right,color-mix(in srgb,var(--muted) 55%,transparent) 0 1px,transparent 1px 10px) bottom/100% 8px no-repeat;border-bottom:1px solid var(--line)}
.pr-mk{position:absolute;top:-4px;height:26px;inset-inline-start:calc(var(--k) * 100% - 1px);width:2px;border-radius:2px;background:var(--ink)}
.pr-lb{position:absolute;top:52px;inset-inline-start:calc(var(--k) * 100%);translate:calc(var(--k) * var(--sh));font-size:14px;font-weight:600;white-space:nowrap;color:var(--muted)}
.pr-lb.on{color:var(--ink)}
.pr-ph{position:absolute;top:0;inset-inline-start:-1px;width:2px;height:56px;border-radius:2px;background:var(--accent);pointer-events:none}
.pr-ph::before{content:"";position:absolute;top:-2px;left:50%;translate:-50% 0;width:14px;height:12px;background:var(--accent);clip-path:polygon(0 0,100% 0,50% 100%)}
/* המהלך רץ: הסקשן גבוה, השכבה הדביקה נעוצה, והכרטיסים נערמים */
.pr.is-live{height:380vh}
.pr.is-live .pr-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center;gap:clamp(20px,4vh,40px)}
.pr.is-live .pr-list{position:relative;display:block;width:min(400px,84vw);aspect-ratio:4/3.5;margin-inline:auto;perspective:1100px}
.pr.is-live .pr-card{position:absolute;inset:0;grid-template-rows:1fr auto;backface-visibility:hidden}
.pr.is-live .pr-shot{aspect-ratio:auto}
.pr.is-live .pr-ruler{display:block;position:relative;width:min(720px,100%);height:76px;margin-inline:auto}
@media(max-height:760px){.pr.is-live .pr-list{width:min(320px,84vw)}}`,
  html:`<div class="stage tight"><section class="pr" aria-labelledby="pr-h">
  <div class="pr-pin">
    <div class="pr-copy"><h2 id="pr-h">ארבעה דברים שאנחנו בונים לעסקים</h2><p>כל פרויקט מתחיל בצורך אחר, ולכן לכל סוג יש מבנה, זמן עבודה ומחיר משלו.</p></div>
    <ul class="pr-list">
      <li class="pr-card">
        <div class="pr-shot a" aria-hidden="true"><i class="t nav"></i><div class="col"><i class="h"></i><i class="h" style="width:70%"></i><i class="t"></i><i class="t" style="width:80%"></i><i class="k pill"></i></div><i class="img"></i></div>
        <div class="pr-cap"><b>אתר תדמית</b><span>מציג את העסק ומוביל מבקרים לפנייה.</span></div>
      </li>
      <li class="pr-card">
        <div class="pr-shot b" aria-hidden="true"><i class="t nav"></i><div class="col"><i class="h"></i><i class="h" style="width:60%"></i><i class="t"></i><i class="t" style="width:75%"></i></div><div class="form"><i></i><i></i><i></i><i class="k"></i></div></div>
        <div class="pr-cap"><b>דף נחיתה</b><span>עמוד אחד לקמפיין, עם טופס אחד ברור.</span></div>
      </li>
      <li class="pr-card">
        <div class="pr-shot c" aria-hidden="true"><div class="tile"><i class="img"></i><i class="t" style="width:60%"></i></div><div class="tile"><i class="img"></i><i class="t" style="width:45%"></i></div><div class="tile"><i class="img"></i><i class="t" style="width:70%"></i></div><div class="tile"><i class="img"></i><i class="t" style="width:55%"></i></div></div>
        <div class="pr-cap"><b>חנות אונליין</b><span>קטלוג, עגלה ותשלום מאובטח.</span></div>
      </li>
      <li class="pr-card">
        <div class="pr-shot d" aria-hidden="true"><div class="col" style="align-content:start"><i class="t"></i><i class="t k"></i><i class="t"></i><i class="t"></i></div><div class="col" style="align-content:start"><i class="h" style="width:50%"></i><div class="row"><i></i><i></i><i class="k"></i></div><div class="row"><i></i><i></i><i></i></div><div class="row"><i></i><i></i><i class="k"></i></div><div class="row"><i></i><i></i><i></i></div></div></div>
        <div class="pr-cap"><b>מערכת ניהול</b><span>פניות, לקוחות ותשלומים במקום אחד.</span></div>
      </li>
    </ul>
    <div class="pr-ruler" aria-hidden="true">
      <div class="pr-track"><i class="pr-mk" style="--k:0"></i><i class="pr-mk" style="--k:.3333"></i><i class="pr-mk" style="--k:.6667"></i><i class="pr-mk" style="--k:1"></i></div>
      <span class="pr-lb on" style="--k:0">אתר תדמית</span><span class="pr-lb" style="--k:.3333">דף נחיתה</span><span class="pr-lb" style="--k:.6667">חנות אונליין</span><span class="pr-lb" style="--k:1">מערכת ניהול</span>
      <i class="pr-ph"></i>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת הרשימה: כרטיסים זה לצד זה, בלי סרגל
  const root=document.querySelector(".pr"),cards=[...root.querySelectorAll(".pr-card")],track=root.querySelector(".pr-track"),
    ph=root.querySelector(".pr-ph"),lbs=[...root.querySelectorAll(".pr-lb")],n=cards.length;
  // בהפחתת תנועה הפונקציה לא רצה, והרשימה נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const dir=getComputedStyle(root).direction==="rtl"?-1:1;           // הראש מתקדם בכיוון הקריאה
    const lead=.4,seg=1.2,flip=.34,tail=.4,at=k=>lead+k*seg;           // at(k): הרגע שבו הראש על הסימן k
    gsap.set(cards.slice(1),{opacity:0,rotationY:-90});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    tl.fromTo(ph,{x:0},{x:()=>dir*track.clientWidth,duration:(n-1)*seg},lead);
    for(let k=1;k<n;k++){
      // הכרטיס היוצא מסתובב עד הקצה, והנכנס ממשיך משם: ההחלפה קורית כשאין מה לראות
      tl.to(cards[k-1],{rotationY:90,opacity:0,duration:flip/2,ease:"power2.in"},at(k)-flip/2)
        .fromTo(cards[k],{rotationY:-90,opacity:0},{rotationY:0,opacity:1,duration:flip/2,ease:"power2.out",immediateRender:false},at(k));
    }
    tl.to({},{duration:tail});
    let cur=0;
    tl.eventCallback("onUpdate",()=>{
      const i=Math.max(0,Math.min(n-1,Math.floor((tl.time()-lead)/seg+.001)));   // התווית מתחלפת על הסימן, באותו רגע שהכרטיס מסתובב
      if(i!==cur){cur=i;lbs.forEach((l,j)=>l.classList.toggle("on",j===i));}
    });
    return()=>{root.classList.remove("is-live");gsap.set([...cards,ph],{clearProps:"all"});lbs.forEach((l,j)=>l.classList.toggle("on",j===0));};
  });
})();`
},
{
  id:"b80", cat:"behavior", name:"פאנל סליידרים שמשנה את התמונה", tech:"input range · CSS filter · GSAP quickTo", status:"מאושר-עין",
  desc:"פאנל זכוכית עם שלושה מחוונים אמיתיים ליד תמונה גדולה. המחוון הראשון בוחר בין ארבעה גוונים של אותו חדר ומערבב ביניהם בהדרגה, השני מכוון את העוצמה, והשלישי מסיט את גוון הזוהר שמאחורי התמונה. הפאנל הוא הסיבה והתמונה התוצאה, ובכניסה למסך המחוונים זזים פעם אחת מעצמם כדי להראות את הקשר, עד שהמבקר נוגע בהם.",
  when:"אזור שבו המבקר מכוון תוצאה לפני שהוא פונה: גוון תאורה בחדר, גימור של חומר, רמת חבילה, תצוגה מקדימה של עיצוב. מתאים כשיש שניים או שלושה פרמטרים שבאמת משנים את התמונה, ושלוש עד חמש גרסאות מוכנות שלה. לא כשיש רק אפשרות אחת, ולא בעמוד שהכפתור הראשי שלו צריך להישאר במרכז.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר ב-prompt-motion.com (21.10.2026), שבהם פאנל זכוכית עם מחוונים משנה תמונה שלידו. נבנה מאפס מהצפייה. **הפקדים אמיתיים:** שלושה `input type=range` עם `label` ו-`output`, ולכן מקלדת, מגע וקורא מסך עובדים בלי קוד נוסף (חצים, Home, End, PageUp). `aria-valuetext` נותן למחוון הראשון את שם הגוון במקום מספר, ויש טבעת פוקוס גם על המחוון וגם על הידית (`:focus-visible`). **התמונה:** ארבעה עותקים של אותה תמונה בשכבות, כל אחד עם גוון משלו ב-`filter`. המחוון הראשון הוא מיקום בין הגרסאות: השכבה k נראית לפי `clamp(pos - k, 0, 1)`, ולכן בין שתי גרסאות יש מיזוג רציף ולא קפיצה. כדי לעבוד עם צילומים אמיתיים מחליפים את ה-`src` של כל שכבה ומוחקים את ה-`filter` שלה. **העוצמה והזוהר:** העוצמה היא `brightness` על כל המקבץ, והזוהר הוא הילה מטושטשת בצבע המותג שמסתובבת ב-`hue-rotate`. שניהם נקבעים ממשתני CSS (`--br`, `--hue`) על הסקשן, ולכן אין חישוב צבע ב-JS. **ההחלקה:** `gsap.quickTo` מוביל את המצב המוצג אחרי הערך האמיתי של הפקד, בלי השהיה בתוויות. בלי GSAP או בהפחתת תנועה כל שינוי מתבצע מיד, והפקדים ממשיכים לעבוד. **הדגמה עצמית:** בכניסה למסך המחוונים זזים פעם אחת וחוזרים לברירת המחדל, ומפסיקים ברגע שנוגעים בפאנל. **ברירת המחדל במארקאפ:** הגוון הטבעי, עוצמה 100 אחוז. **מילוי המסלול:** גרדיאנט שמתחיל מהצד שבו הערך הנמוך, ולכן הוא מתהפך לבד באתר משמאל לימין (`:dir(ltr)`). את הפאנל מיישרים לצד ההתחלה עם `inset-inline-start`. בטלפון הפאנל יורד מתחת לתמונה.",
  libs:["gsap"],
  css:`.sp{--to:to left;--br:1;--hue:0deg;position:relative;max-width:1040px;margin-inline:auto;isolation:isolate}
.sp:dir(ltr){--to:to right}
.sp-glow{position:absolute;inset:-12% -6%;z-index:-1;border-radius:50%;pointer-events:none;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 62%,transparent) 55%,transparent 100%);filter:hue-rotate(var(--hue)) blur(32px)}
.sp-view{margin:0;position:relative;aspect-ratio:16/10;overflow:hidden;border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 28px 64px color-mix(in srgb,var(--ink) 14%,transparent)}
.sp-stack{position:absolute;inset:0;filter:brightness(var(--br))}
.sp-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sp-img.k0{filter:sepia(.3) hue-rotate(168deg) saturate(1.05) brightness(1.04)}
.sp-img.k2{filter:sepia(.5) saturate(1.35) hue-rotate(-10deg)}
.sp-img.k3{filter:sepia(.7) saturate(1.6) hue-rotate(-24deg) brightness(.66) contrast(1.1)}
.sp-panel{position:absolute;inset-block-end:24px;inset-inline-start:24px;width:min(352px,44%);display:grid;gap:14px;padding:20px;border-radius:20px;color:var(--ink);background:color-mix(in srgb,var(--card) 72%,transparent);-webkit-backdrop-filter:blur(18px) saturate(1.5);backdrop-filter:blur(18px) saturate(1.5);box-shadow:0 0 0 1px color-mix(in srgb,var(--card) 80%,transparent),0 20px 48px color-mix(in srgb,var(--ink) 18%,transparent)}
.sp-panel h2{margin:0;font-size:20px;font-weight:700;line-height:1.2}
.sp-panel p{margin:0;color:var(--muted);font-size:15px;line-height:1.5}
.sp-row{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:0 12px}
.sp-row label{font-size:15px;font-weight:600}
.sp-row output{display:inline-flex;align-items:center;gap:8px;min-width:48px;justify-content:flex-end;font-size:15px;color:var(--muted);font-variant-numeric:tabular-nums}
.sp-row input{grid-column:1/-1}
.sp-dot{display:block;width:14px;height:14px;border-radius:50%;background:var(--accent);filter:hue-rotate(var(--hue))}
.sp input[type=range]{--p:50%;-webkit-appearance:none;appearance:none;width:100%;height:36px;margin:0;background:transparent;cursor:pointer;border-radius:99px}
.sp input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:99px;background:linear-gradient(var(--to),var(--accent) var(--p),color-mix(in srgb,var(--ink) 18%,transparent) var(--p))}
.sp input[type=range]::-moz-range-track{height:8px;border-radius:99px;background:linear-gradient(var(--to),var(--accent) var(--p),color-mix(in srgb,var(--ink) 18%,transparent) var(--p))}
.sp input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:24px;height:24px;margin-top:-8px;border:0;border-radius:50%;background:var(--card);box-shadow:0 0 0 1px var(--line),0 2px 8px color-mix(in srgb,var(--ink) 28%,transparent)}
.sp input[type=range]::-moz-range-thumb{width:24px;height:24px;border:0;border-radius:50%;background:var(--card);box-shadow:0 0 0 1px var(--line),0 2px 8px color-mix(in srgb,var(--ink) 28%,transparent)}
.sp input[type=range]:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sp input[type=range]:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 3px var(--card),0 0 0 6px var(--accent)}
.sp input[type=range]:focus-visible::-moz-range-thumb{box-shadow:0 0 0 3px var(--card),0 0 0 6px var(--accent)}
.sp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.sp-view{aspect-ratio:4/3;border-radius:20px 20px 0 0}.sp-panel{position:relative;inset:auto;width:auto;margin-top:0;border-radius:0 0 20px 20px;background:var(--card);-webkit-backdrop-filter:none;backdrop-filter:none}.sp-glow{inset:-6% -4%}}`,
  html:`<div class="stage"><section class="sp" aria-labelledby="sp-h">
  <div class="sp-glow" aria-hidden="true"></div>
  <figure class="sp-view">
    <div class="sp-stack">
      <img class="sp-img k0" src="../assets/media/real/s02/night-room.webp" alt="חדר שינה לבן עם מיטה מוצעת ושתי מנורות קש תלויות" width="2000" height="1333" loading="lazy" decoding="async" style="opacity:1">
      <img class="sp-img k1" src="../assets/media/real/s02/night-room.webp" alt="" aria-hidden="true" width="2000" height="1333" loading="lazy" decoding="async" style="opacity:1">
      <img class="sp-img k2" src="../assets/media/real/s02/night-room.webp" alt="" aria-hidden="true" width="2000" height="1333" loading="lazy" decoding="async" style="opacity:0">
      <img class="sp-img k3" src="../assets/media/real/s02/night-room.webp" alt="" aria-hidden="true" width="2000" height="1333" loading="lazy" decoding="async" style="opacity:0">
    </div>
  </figure>
  <div class="sp-panel" role="group" aria-labelledby="sp-h">
    <div><h2 id="sp-h">איך החדר ייראה בערב</h2><p>מזיזים את המחוונים ורואים את התאורה משתנה, עוד לפני שמזמינים.</p></div>
    <div class="sp-row"><label for="sp-v">גוון האור</label><output id="sp-vo" for="sp-v">טבעי</output><input id="sp-v" type="range" min="0" max="300" step="1" value="100" aria-valuetext="טבעי" style="--p:33.33%"></div>
    <div class="sp-row"><label for="sp-b">עוצמה</label><output id="sp-bo" for="sp-b">100%</output><input id="sp-b" type="range" min="0" max="100" step="1" value="50" style="--p:50%"></div>
    <div class="sp-row"><label for="sp-g">גוון הזוהר</label><output id="sp-go" for="sp-g"><i class="sp-dot" aria-hidden="true"></i></output><input id="sp-g" type="range" min="0" max="100" step="1" value="50" style="--p:50%"></div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".sp");
  if(!root)return;
  const L=[...root.querySelectorAll(".sp-img")].slice(1);                 // השכבות שמתמזגות מעל הבסיס
  const inV=root.querySelector("#sp-v"),inB=root.querySelector("#sp-b"),inG=root.querySelector("#sp-g");
  const outV=root.querySelector("#sp-vo"),outB=root.querySelector("#sp-bo");
  const NAMES=["קריר","טבעי","חם","ערב"];
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const smooth=typeof gsap!=="undefined"&&!reduce.matches;               // בלי GSAP או בהפחתת תנועה: שינוי מיידי
  const cur={v:+inV.value,b:+inB.value,g:+inG.value};                     // המצב המוצג (מוחלק), לא הערך של הפקד
  function paint(){
    L.forEach((im,k)=>{im.style.opacity=Math.max(0,Math.min(1,cur.v/100-k)).toFixed(3);});
    root.style.setProperty("--br",(.6+cur.b/100*.8).toFixed(3));
    root.style.setProperty("--hue",((cur.g-50)*2.4).toFixed(1)+"deg");
  }
  function labels(){                                                      // תוויות ומילוי מסלול: תמיד מהערך האמיתי, בלי השהיה
    const i=Math.max(0,Math.min(NAMES.length-1,Math.round(inV.value/100)));
    outV.textContent=NAMES[i];inV.setAttribute("aria-valuetext",NAMES[i]);
    outB.textContent=Math.round((.6+inB.value/100*.8)*100)+"%";
    [inV,inB,inG].forEach(el=>el.style.setProperty("--p",((el.value-el.min)/(el.max-el.min)*100).toFixed(2)+"%"));
  }
  const q=smooth?{
    "sp-v":gsap.quickTo(cur,"v",{duration:.55,ease:"power3.out",onUpdate:paint}),
    "sp-b":gsap.quickTo(cur,"b",{duration:.55,ease:"power3.out",onUpdate:paint}),
    "sp-g":gsap.quickTo(cur,"g",{duration:.55,ease:"power3.out",onUpdate:paint})}:null;
  const key={"sp-v":"v","sp-b":"b","sp-g":"g"};
  let intro=null;
  const stopIntro=()=>{if(intro){intro.kill();intro=null;}};
  root.addEventListener("input",e=>{
    stopIntro();labels();
    const k=key[e.target.id];if(!k)return;
    if(q)q[e.target.id](+e.target.value);else{cur[k]=+e.target.value;paint();}
  });
  ["pointerdown","keydown"].forEach(t=>root.addEventListener(t,stopIntro));
  // הדגמה עצמית אחת בכניסה למסך: המחוונים זזים וחוזרים לברירת המחדל, ונעצרים בנגיעה הראשונה
  if(smooth&&"IntersectionObserver" in window){
    const sync=()=>{inV.value=cur.v;inB.value=cur.b;inG.value=cur.g;labels();paint();};
    const io=new IntersectionObserver(es=>{
      if(!es.some(e=>e.isIntersecting))return;
      io.disconnect();
      intro=gsap.timeline({delay:.5,onUpdate:sync,onComplete:()=>{intro=null;}})
        .to(cur,{v:250,duration:1.4,ease:"power2.inOut"})
        .to(cur,{b:78,g:82,duration:1,ease:"power2.inOut"},"-=.4")
        .to(cur,{v:100,b:50,g:50,duration:1.3,ease:"power2.inOut"},"+=.3");
    },{threshold:.45});
    io.observe(root);
  }
  labels();paint();
})();`,
  runway:false
},
{
  id:"g166", cat:"gsap", name:"עורך עם תצוגה חיה בצד", tech:"GSAP · ScrollTrigger scrub · 3D tilt", status:"מאושר-עין",
  desc:"חלון של כלי כתיבה בפרספקטיבה, ובו שני צדדים: בימין הטקסט הגולמי עם סימני העיצוב, ובשמאל איך הוא ייראה. בגלילה השורות נכתבות אות אחר אות, וכל אחת מופיעה בצד השני בצורתה הסופית באותו רגע: כותרת, פסקה, רשימה, תיבת סימון ומשפט מודגש. פס סריקה וצבע רקע קל עוברים בין שני הצדדים ומראים איזו שורה כותבים עכשיו, והחלון מתיישר ככל שהמסמך מתמלא.",
  when:"סקשן של מוצר או כלי שבו הערך הוא ההתאמה בין מה שכותבים למה שמקבלים: עורך הצעות, בונה טפסים, מערכת תבניות, כלי תיעוד. מתאים למסמך קצר אחד (עד שמונה שורות) שיש לו צורה כתובה וצורה מוצגת. לא כשהקהל לא מכיר כלי כתיבה, ולא כשהטקסט ארוך.",
  note:"**שחזור.** השראה: שני סרטוני מוצר ב-prompt-motion.com (21.10.2026), שבהם חלון עורך בפרספקטיבה מציג טקסט שנכתב בצד אחד ותצוגה מעוצבת שלו בצד השני. נבנה מאפס מהצפייה. **המארקאפ הוא המסמך השלם:** כל שורה היא `.lp-row` עם תא כתיבה (`.lp-src`, הסימן ב-`.mk` והטקסט ב-`.tx`) ותא תצוגה (`.lp-out`). השורות הן `display:contents` בתוך גריד אחד, ולכן שני התאים בכל שורה תמיד באותו גובה והפס יכול לחצות את שני הצדדים. בלי GSAP ובהפחתת תנועה רואים את המסמך המלא והחלון שטוח, והחלון כולו `aria-hidden` עם פסקה ל-`sr-only` שמקריאה את המסמך. **ההקלדה:** פונקציה אחת, `draw(t)`, שמקבלת התקדמות בין 0 ל-1 וממפה אותה למספר תווים כולל. כל שורה מציגה את החלק שהוקלד, וכל מה שעוד לא הוקלד נשאר במקומו בתוך `span` נסתר (`visibility:hidden`), כך שגלישת השורות והגובה לא משתנים בזמן הכתיבה. טווין אחד על אובייקט עזר מזין את הפונקציה, ולכן גלילה אחורה מוחקת בדיוק כמו שכתבה. התצוגה של שורה מופיעה עם התו הראשון של הטקסט, אחרי הסימן. **הפס:** שני אלמנטים (רקע וקו) עוברים לשורה הפעילה רק כשהשורה מתחלפת, ב-`y` ו-`scaleY`, ולא בכל פריים. הגבהים נמדדים מהשורה עצמה. **הנטייה:** `rotationY` ו-`rotationX` של החלון יורדים לאפס בשני השלישים הראשונים של הגלילה, בתוך קונטיינר עם `perspective`. כיוון הנטייה נקבע מ-`direction`. **סמן:** פס מהבהב (`steps(1)`) בשורה הפעילה, רק במצב חי. **כיוון:** הכתיבה בימין והתצוגה בשמאל כי זה סדר הקריאה בעברית. באתר משמאל לימין העמודות מתהפכות לבד. סימני העיצוב מבודדים ב-`unicode-bidi:isolate` כדי שלא יתהפכו בתוך שורה בעברית. אין גלילה נעוצה, ולכן אין מה להתאים בטלפון חוץ מרווחים וגודל כתב.",
  libs:["gsap","ScrollTrigger"],
  css:`.lp{max-width:1000px;margin-inline:auto;display:grid;gap:40px;justify-items:center}
.lp-copy{display:grid;gap:10px;max-width:52ch;text-align:center}
.lp-copy h2{margin:0;font-size:clamp(28px,3.4vw,44px);font-weight:700;line-height:1.1;text-wrap:balance}
.lp-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.lp-stage{width:100%;perspective:1500px}
.lp-win{overflow:hidden;border-radius:20px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 32px 72px color-mix(in srgb,var(--ink) 14%,transparent)}
.lp-bar{display:flex;align-items:center;gap:12px;padding:12px 16px;background:color-mix(in srgb,var(--ink) 4%,var(--card))}
.lp-dots{display:flex;gap:6px}
.lp-dots i{display:block;width:10px;height:10px;border-radius:50%;background:color-mix(in srgb,var(--ink) 18%,transparent)}
.lp-file{margin-inline-start:auto;font-size:13px;color:var(--muted)}
.lp-heads,.lp-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.lp-heads span{padding:10px 20px;font-size:13px;font-weight:600;color:var(--muted)}
.lp-heads span:first-child{background:color-mix(in srgb,var(--ink) 4%,var(--card))}
.lp-body{position:relative}
.lp-row{display:contents}
.lp-src,.lp-out{padding:10px 20px;font-size:15px;line-height:1.7}
.lp-src{background:color-mix(in srgb,var(--ink) 4%,var(--card));font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;white-space:pre-wrap}
.lp-src .mk{display:inline;direction:ltr;unicode-bidi:isolate;white-space:pre;color:var(--accent);font-weight:700}
.lp-rest{visibility:hidden}
.lp-caret{display:none;position:relative;width:0;height:1.15em;vertical-align:text-bottom}
.lp-caret::after{content:"";position:absolute;inset-block:0;inset-inline-start:0;width:2px;background:var(--accent)}
.lp-out.h1 .ot{font-size:clamp(20px,2.4vw,26px);font-weight:700;line-height:1.2}
.lp-out.h2 .ot{font-size:18px;font-weight:700}
.lp-out.p{color:var(--muted)}
.lp-out.li,.lp-out.todo{display:flex;gap:10px;align-items:baseline}
.lp-out.li::before{content:"";flex:none;width:6px;height:6px;border-radius:50%;background:var(--accent);translate:0 -2px}
.lp-chk{flex:none;position:relative;width:16px;height:16px;border-radius:5px;background:var(--accent);translate:0 2px}
.lp-chk::after{content:"";position:absolute;inset-inline-start:5px;top:2px;width:4px;height:8px;border:solid var(--accent-ink);border-width:0 2px 2px 0;rotate:45deg}
.lp-out.quote{align-self:center}
.lp-out.quote .ot{display:block;padding:12px 16px;border-radius:12px;font-weight:600;background:color-mix(in srgb,var(--accent) 12%,transparent)}
.lp-band,.lp-line{position:absolute;inset-inline:0;top:0;opacity:0;pointer-events:none}
.lp-band{height:1px;transform-origin:0 0;background:color-mix(in srgb,var(--accent) 9%,transparent)}
.lp-line{height:2px;background:linear-gradient(to left,transparent,var(--accent) 24%,var(--accent) 76%,transparent)}
.lp.is-live .lp-src.cur .lp-caret{display:inline-block;animation:lp-blink 1.1s steps(1) infinite}
@keyframes lp-blink{50%{opacity:0}}
.lp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.lp{gap:32px}.lp-src,.lp-out{padding:8px 12px;font-size:13px}.lp-heads span{padding:8px 12px}.lp-bar{padding:10px 12px}}`,
  html:`<div class="stage"><section class="lp" aria-labelledby="lp-h">
  <div class="lp-copy"><h2 id="lp-h">ההצעה נכתבת ונראית בו זמנית</h2><p>בכלי שלנו כל שורה שנכתבת מופיעה מיד בצורתה הסופית, וכך הלקוח רואה איך המסמך ייראה עוד לפני שהוא נשלח.</p></div>
  <p class="sr-only">הצעה לאתר החדש. אתר תדמית קצר לקליניקה, שמוביל כל מבקר לפנייה בפחות מדקה. מה כלול: אפיון ומבנה העמודים, עיצוב ופיתוח למובייל ולמחשב, חיבור טופס הפנייה למייל. המחיר: 8,500 ש"ח, כולל שני סבבי תיקונים.</p>
  <div class="lp-stage" aria-hidden="true">
    <div class="lp-win">
      <div class="lp-bar"><span class="lp-dots"><i></i><i></i><i></i></span><span class="lp-file"><bdi dir="ltr">proposal.md</bdi></span></div>
      <div class="lp-heads"><span>עריכה</span><span>תצוגה</span></div>
      <div class="lp-body">
        <i class="lp-band"></i><i class="lp-line"></i>
        <div class="lp-row"><div class="lp-src"><span class="mk"># </span><span class="tx">הצעה לאתר החדש</span></div><div class="lp-out h1"><span class="ot">הצעה לאתר החדש</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="tx">אתר תדמית קצר לקליניקה, שמוביל כל מבקר לפנייה בפחות מדקה.</span></div><div class="lp-out p"><span class="ot">אתר תדמית קצר לקליניקה, שמוביל כל מבקר לפנייה בפחות מדקה.</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">## </span><span class="tx">מה כלול</span></div><div class="lp-out h2"><span class="ot">מה כלול</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">- </span><span class="tx">אפיון ומבנה העמודים</span></div><div class="lp-out li"><span class="ot">אפיון ומבנה העמודים</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">- </span><span class="tx">עיצוב ופיתוח למובייל ולמחשב</span></div><div class="lp-out li"><span class="ot">עיצוב ופיתוח למובייל ולמחשב</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">- [x] </span><span class="tx">חיבור טופס הפנייה למייל</span></div><div class="lp-out todo"><span class="lp-chk"></span><span class="ot">חיבור טופס הפנייה למייל</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">## </span><span class="tx">המחיר</span></div><div class="lp-out h2"><span class="ot">המחיר</span></div></div>
        <div class="lp-row"><div class="lp-src"><span class="mk">&gt; </span><span class="tx">8,500 ש"ח, כולל שני סבבי תיקונים</span></div><div class="lp-out quote"><span class="ot">8,500 ש"ח, כולל שני סבבי תיקונים</span></div></div>
      </div>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר המסמך המלא והחלון שטוח
  const root=document.querySelector(".lp"),stage=root.querySelector(".lp-stage"),win=root.querySelector(".lp-win"),
    band=root.querySelector(".lp-band"),line=root.querySelector(".lp-line");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const dir=getComputedStyle(root).direction==="rtl"?-1:1;
    // כל מקטע טקסט הופך לשלושה חלקים: מה שהוקלד, סמן, וההמשך הנסתר ששומר על גלישת השורות
    const split=(el,caret)=>{
      const full=el.textContent;el.textContent="";
      const a=document.createTextNode(full),b=document.createElement("span");b.className="lp-rest";
      const c=caret?Object.assign(document.createElement("i"),{className:"lp-caret"}):null;
      if(c)c.setAttribute("aria-hidden","true");
      el.append(...[a,c,b].filter(Boolean));
      return {el,full,a,b};
    };
    const put=(p,k)=>{p.a.nodeValue=p.full.slice(0,k);p.b.textContent=p.full.slice(k);};
    let N=0;
    const R=[...root.querySelectorAll(".lp-row")].map(r=>{
      const src=r.querySelector(".lp-src"),out=r.querySelector(".lp-out"),mk=src.querySelector(".mk"),tx=src.querySelector(".tx");
      const row={src,out,mk:mk&&split(mk),tx:split(tx,true),ot:split(out.querySelector(".ot")),off:N};
      row.m=mk?row.mk.full.length:0;row.len=row.m+row.tx.full.length;N+=row.len;
      return row;
    });
    let cur=-2;
    const focusRow=i=>{
      if(i===cur)return;
      const first=cur<0;cur=i;
      R.forEach((r,j)=>{r.src.classList.toggle("cur",j===i);});
      if(i<0){gsap.to([band,line],{opacity:0,duration:.3,overwrite:"auto"});return;}
      const top=R[i].src.offsetTop,h=R[i].src.offsetHeight;
      if(first)gsap.set([band,line],{y:top});                           // בכניסה הראשונה הפס כבר על השורה, בלי לטוס מלמעלה
      gsap.to(band,{y:top,scaleY:h,opacity:1,duration:.3,ease:"power2.out",overwrite:"auto"});
      gsap.to(line,{y:top+h-1,opacity:1,duration:.3,ease:"power2.out",overwrite:"auto"});
    };
    const draw=t=>{
      const n=t*N;let last=-1;
      R.forEach((r,i)=>{
        const k=Math.max(0,Math.min(r.len,Math.round(n-r.off))),km=Math.min(k,r.m),kt=Math.max(0,k-r.m);
        if(r.mk)put(r.mk,km);
        put(r.tx,kt);put(r.ot,kt);
        r.out.style.opacity=kt>0?1:0;
        if(k>0)last=i;
      });
      focusRow(t>=.999?-1:last);
    };
    const st={t:0};
    gsap.set(win,{rotationY:12*dir,rotationX:6});
    draw(0);
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:stage,start:"top 75%",end:"bottom 66%",scrub:.4,invalidateOnRefresh:true}});
    tl.to(win,{rotationY:0,rotationX:0,duration:.66},0)
      .to(st,{t:1,duration:1,onUpdate:()=>draw(st.t)},0);
    const refit=()=>{if(cur>=0){const i=cur;cur=-2;focusRow(i);}};
    ScrollTrigger.addEventListener("refresh",refit);
    return()=>{
      ScrollTrigger.removeEventListener("refresh",refit);
      root.classList.remove("is-live");
      R.forEach(r=>{[r.mk,r.tx,r.ot].forEach(p=>{if(p)p.el.textContent=p.full;});r.out.style.opacity="";r.src.classList.remove("cur");});
      gsap.set([win,band,line],{clearProps:"all"});
    };
  });
})();`
},
{
  id:"g167", cat:"gsap", name:"תמונה שעוברת מטלפון למחשב", tech:"GSAP · ScrollTrigger scrub · measured flight", status:"מאושר-עין",
  desc:"שני מכשירים זה לצד זה: טלפון עם התראה על מסך הנעילה, ומחשב נייד שפתוח בו עמוד הגלריה של האתר, עם מקום ריק לתמונה חדשה. בגלילה התראה נכנסת, התמונה הקטנה שבה מתרוממת מהמסך, עפה בקשת מעל הרווח שבין המכשירים ונוחתת בדיוק בחריץ הריק, ושם היא הופכת לחלק מהעמוד. אחרי הנחיתה הסטטוס בהתראה מתחלף ל\"נשלחה\" ותווית מופיעה בעמוד.",
  when:"סקשן של איך זה עובד או של חיבור בין שני מקומות: צילום בשטח שעולה לאתר, חומר שנשלח מהלקוח למערכת, הזמנה שעוברת מהטלפון למשרד. מתאים כשיש שני מסכים אמיתיים ותמונה אחת שעוברת ביניהם, והמעבר הוא חלק מהשירות. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון מוצר ב-prompt-motion.com (21.10.2026), שבו תמונה ממוזערת מרימה את עצמה ממסך נעילה של טלפון ונוחתת בחלון דפדפן של מחשב. נבנה מאפס מהצפייה. **העיקרון:** לא מזיזים את התמונה שבהתראה ולא את זו שבעמוד. יש עותק שלישי (`.dh-fly`) שמונח מעל הסצנה, והוא זה שעף. כך התמונה לא נתקעת בגבולות המכשירים וגם לא נחתכת על ידם. **המדידה:** נקודת ההתחלה (התמונה הקטנה בהתראה) ונקודת הנחיתה (החריץ במחשב) נמדדות ב-`offsetLeft` ו-`offsetTop` יחסית לסצנה, ולכן הן לא מושפעות מהתנועות של ההתראה עצמה. המדידה חוזרת בכל `refresh` של ScrollTrigger, ולכן זה נכון בכל רוחב מסך, וגם כשהמכשירים נערמים זה מעל זה בטלפון. אסור לשים `transform` על אב של התמונה הקטנה או של החריץ, אחרת המדידה תיסחף. **גודל:** העותק העף נבנה בגודל החריץ והוקטן להתחלה, ולכן הוא חד בנחיתה ולא מטושטש. החריץ חייב להיות ריבוע, כדי שההקטנה תהיה אחידה. **ההתקדמות:** פונקציה אחת, `draw(t)`, בחמישה שלבים: כניסת ההתראה, הרמה (הגדלה קלה, הטיה וצל), טיסה בקשת (`sin` מעל קו ישר), נחיתה, ותווית. טווין אחד על אובייקט עזר מזין אותה, ולכן גלילה אחורה מחזירה את התמונה לטלפון בדיוק. **הנחיתה:** התמונה שבחריץ נחשפת כשהעותק העף כבר בדיוק עליה, ואז העותק נעלם, בלי קפיצה. **ללא JS:** החריץ כבר מלא, ההתראה אומרת \"נשלחה\", ובמקום התמונה הקטנה יש סימן וי. הכל במארקאפ ובסגנון הבסיס, ובמצב חי `is-live` מחליף אותו במצב ההתחלה. **כיוון:** הטלפון בצד ההתחלה והמחשב בצד הסוף, ולכן התמונה עפה מימין לשמאל. באתר משמאל לימין זה מתהפך לבד, וכך גם כיוון מילוי הסרגל בהתראה (`:dir(ltr)`). החלף את `.dh-sq img` ואת `.dh-thumb img` בתמונות האמיתיות.",
  libs:["gsap","ScrollTrigger"],
  css:`.dh{--o:100% 50%;max-width:1040px;margin-inline:auto;display:grid;gap:56px}
.dh:dir(ltr){--o:0 50%}
.dh-copy{display:grid;gap:10px;max-width:46ch}
.dh-copy h2{margin:0;font-size:clamp(28px,3.4vw,48px);font-weight:700;line-height:1.1;text-wrap:balance}
.dh-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.dh-scene{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,.44fr) minmax(0,1fr);gap:clamp(40px,8vw,112px);align-items:center}
.dh-phone{justify-self:center;width:min(100%,232px);aspect-ratio:9/17;padding:8px;border-radius:36px;background:var(--ink);box-shadow:0 24px 56px color-mix(in srgb,var(--ink) 22%,transparent)}
.dh-lock{height:100%;display:grid;align-content:start;gap:4px;padding:32px 12px 12px;overflow:hidden;border-radius:28px;background:var(--card)}
.dh-time{text-align:center;font-size:48px;font-weight:600;line-height:1.1;font-variant-numeric:tabular-nums}
.dh-date{margin-bottom:20px;text-align:center;font-size:13px;color:var(--muted)}
.dh-note{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 12px;align-items:center;padding:12px;border-radius:18px;background:color-mix(in srgb,var(--ink) 6%,var(--bg));box-shadow:0 0 0 1px var(--line)}
.dh-thumb{position:relative;width:44px;height:44px;overflow:hidden;border-radius:8px;background:color-mix(in srgb,var(--accent) 14%,transparent)}
.dh-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0}
.dh-ok{position:absolute;inset:0}
.dh-ok::after{content:"";position:absolute;inset-inline-start:17px;top:10px;width:8px;height:15px;border:solid var(--accent);border-width:0 3px 3px 0;rotate:45deg}
.dh-nt{display:grid;gap:4px;min-width:0}
.dh-nt small{font-size:11px;color:var(--muted)}
.dh-nt b{font-size:14px;line-height:1.3}
.dh-st{display:grid}
.dh-st span{grid-area:1/1;font-size:12px;color:var(--muted)}
.dh-st .a{opacity:0}
.dh-bar{grid-column:1/-1;height:4px;overflow:hidden;border-radius:99px;background:color-mix(in srgb,var(--ink) 10%,transparent)}
.dh-bar i{display:block;height:100%;border-radius:99px;background:var(--accent);transform-origin:var(--o)}
.dh-laptop{display:grid;justify-items:center}
.dh-screen{width:100%;padding:8px 8px 10px;border-radius:18px 18px 8px 8px;background:var(--ink)}
.dh-page{overflow:hidden;border-radius:10px;background:var(--card)}
.dh-url{display:flex;align-items:center;gap:12px;padding:10px 14px;background:color-mix(in srgb,var(--ink) 5%,var(--card))}
.dh-dots{display:flex;gap:6px}
.dh-dots i{display:block;width:8px;height:8px;border-radius:50%;background:color-mix(in srgb,var(--ink) 20%,transparent)}
.dh-addr{flex:1;padding:4px 12px;border-radius:99px;background:var(--card);font-size:12px;color:var(--muted);text-align:center}
.dh-body{display:grid;gap:16px;padding:20px 24px 24px}
.dh-body h3{margin:0;font-size:clamp(16px,1.6vw,20px);font-weight:700}
.dh-gal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.dh-sq{position:relative;aspect-ratio:1;overflow:hidden;border-radius:14px;background:color-mix(in srgb,var(--accent) 10%,transparent)}
.dh-sq img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dh-ring{position:absolute;inset:0;border-radius:14px;box-shadow:0 0 0 3px var(--accent);opacity:0;pointer-events:none}
.dh-chip{justify-self:start;padding:6px 14px;border-radius:99px;background:color-mix(in srgb,var(--accent) 14%,transparent);font-size:13px;font-weight:600}
.dh-base{width:calc(100% + 32px);height:12px;margin-inline:-16px;border-radius:0 0 16px 16px;background:color-mix(in srgb,var(--ink) 30%,var(--card))}
.dh-fly{display:none;position:absolute;left:0;top:0;z-index:3;--sh:1;object-fit:cover;pointer-events:none;box-shadow:0 18px 40px color-mix(in srgb,var(--ink) calc(var(--sh) * 30%),transparent)}
.dh.is-live .dh-fly{display:block;opacity:0}
.dh.is-live .dh-thumb img{opacity:1}
.dh.is-live .dh-sq.slot img{opacity:0}
.dh .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.dh{gap:40px}.dh-scene{grid-template-columns:minmax(0,1fr);gap:56px}.dh-phone{width:min(100%,208px);aspect-ratio:9/15}.dh-body{padding:16px;gap:12px}.dh-gal{gap:8px}}`,
  html:`<div class="stage"><section class="dh" aria-labelledby="dh-h">
  <div class="dh-copy"><h2 id="dh-h">תמונות מהשטח עולות לאתר ישר מהטלפון</h2><p>מצלמים בטלפון והתמונה מגיעה לגלריית הפרויקטים באתר, מוכנה לפרסום.</p></div>
  <p class="sr-only">תמונה שצולמה בטלפון נשלחת למחשב ומופיעה בגלריית הפרויקטים של האתר.</p>
  <div class="dh-scene" aria-hidden="true">
    <div class="dh-phone"><div class="dh-lock">
      <div class="dh-time"><bdi dir="ltr">9:41</bdi></div><div class="dh-date">יום חמישי</div>
      <div class="dh-note">
        <div class="dh-thumb"><img src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" decoding="async"><i class="dh-ok"></i></div>
        <div class="dh-nt"><small>העלאה לאתר</small><b>תמונה חדשה מהשטח</b><span class="dh-st"><span class="a">שולח למחשב</span><span class="b">נשלחה</span></span></div>
        <div class="dh-bar"><i></i></div>
      </div>
    </div></div>
    <div class="dh-laptop">
      <div class="dh-screen"><div class="dh-page">
        <div class="dh-url"><span class="dh-dots"><i></i><i></i><i></i></span><span class="dh-addr"><bdi dir="ltr">studio.co.il/projects</bdi></span></div>
        <div class="dh-body">
          <h3>פרויקטים אחרונים</h3>
          <div class="dh-gal">
            <div class="dh-sq slot"><img src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" loading="lazy" decoding="async"><i class="dh-ring"></i></div>
            <div class="dh-sq"><img src="../assets/media/real/s13/room.webp" alt="" width="2200" height="1469" loading="lazy" decoding="async"></div>
            <div class="dh-sq"><img src="../assets/media/real/s13/proj-b.webp" alt="" width="1200" height="1600" loading="lazy" decoding="async"></div>
          </div>
          <span class="dh-chip">נוספה לגלריה</span>
        </div>
      </div></div>
      <div class="dh-base"></div>
    </div>
    <img class="dh-fly" src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" decoding="async">
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP החריץ כבר מלא וההתראה אומרת "נשלחה"
  const root=document.querySelector(".dh"),scene=root.querySelector(".dh-scene"),note=root.querySelector(".dh-note"),
    thumb=root.querySelector(".dh-thumb"),thumbImg=thumb.querySelector("img"),ok=thumb.querySelector(".dh-ok"),
    bar=root.querySelector(".dh-bar i"),stA=root.querySelector(".dh-st .a"),stB=root.querySelector(".dh-st .b"),
    slot=root.querySelector(".dh-sq.slot"),slotImg=slot.querySelector("img"),ring=slot.querySelector(".dh-ring"),
    chip=root.querySelector(".dh-chip"),fly=root.querySelector(".dh-fly");
  const all=[note,thumbImg,ok,bar,stA,stB,slotImg,ring,chip,fly];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const dir=getComputedStyle(root).direction==="rtl"?-1:1,tilt=7*dir;
    const eIO=gsap.parseEase("power2.inOut"),eO=gsap.parseEase("power3.out");
    const cl=v=>Math.max(0,Math.min(1,v)),lerp=(a,b,t)=>a+(b-a)*t;
    // מיקום יחסית לסצנה לפי offset*, שלא מושפע מטרנספורמים של ההתראה
    const at=el=>{let x=0,y=0;while(el&&el!==scene){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent;}return{x,y};};
    let g={x0:0,y0:0,x2:0,y2:0,W:1,s0:.3};
    const measure=()=>{
      const a=at(thumb),b=at(slot),W=slot.offsetWidth;
      g={x0:a.x+thumb.offsetWidth/2,y0:a.y+thumb.offsetHeight/2,x2:b.x+W/2,y2:b.y+W/2,W,s0:thumb.offsetWidth/W};
      gsap.set(fly,{width:W,height:W,xPercent:-50,yPercent:-50});
    };
    const draw=t=>{
      const pA=cl(t/.16),pB=cl((t-.16)/.16),pC=cl((t-.32)/.44),pD=cl((t-.76)/.12),pE=cl((t-.88)/.12);
      const eA=eO(pA),eB=eIO(pB),eC=eIO(pC),y1=g.y0-18;
      gsap.set(note,{opacity:eA,y:(1-eA)*-24});
      stA.style.opacity=1-pD;stB.style.opacity=pD;
      gsap.set(bar,{scaleX:pC});
      const lifted=pB>0;
      thumbImg.style.opacity=lifted?0:1;ok.style.opacity=pD;
      let x,y,s,r;
      if(pC>0){                                                         // טיסה: קשת של sin מעל הקו הישר
        x=lerp(g.x0,g.x2,eC);
        y=lerp(y1,g.y2,eC)-Math.sin(Math.PI*eC)*Math.min(120,Math.abs(g.x2-g.x0)*.22+40);
        s=lerp(g.s0*1.3,1,eC);r=lerp(tilt,0,eC);
      }else{                                                            // הרמה: עולה קצת, גדלה ונוטה
        x=g.x0;y=lerp(g.y0,y1,eB);s=lerp(g.s0,g.s0*1.3,eB);r=lerp(0,tilt,eB);
      }
      gsap.set(fly,{x,y,scale:s,rotation:r,opacity:lifted&&pD<1?1:0,borderRadius:Math.max(14,8/s)});
      fly.style.setProperty("--sh",String(1-pD));
      slotImg.style.opacity=pD;                                         // נחשפת כשהעותק העף כבר בדיוק עליה
      gsap.set(ring,{opacity:Math.sin(Math.PI*pD)*.9,scale:1+.08*pD});
      gsap.set(chip,{opacity:pE,y:(1-pE)*8});
    };
    const st={t:0};
    measure();draw(0);
    const tl=gsap.timeline({scrollTrigger:{trigger:scene,start:"top 90%",end:"bottom 80%",scrub:.5,invalidateOnRefresh:true}});
    tl.to(st,{t:1,ease:"none",onUpdate:()=>draw(st.t)});
    const re=()=>{measure();draw(st.t);};
    ScrollTrigger.addEventListener("refresh",re);
    return()=>{
      ScrollTrigger.removeEventListener("refresh",re);
      root.classList.remove("is-live");
      gsap.set(all,{clearProps:"all"});
      [thumbImg,ok,stA,stB,slotImg].forEach(e=>{e.style.opacity="";});fly.style.removeProperty("--sh");
    };
  });
})();`
},
{
  id:"g168", cat:"gsap", name:"מצלמה שעפה לאורך עמוד בפרספקטיבה", tech:"GSAP · ScrollTrigger scrub · sticky · 3D", status:"מאושר-עין",
  desc:"עמוד אתר שלם מונח לאחור בפרספקטיבה כמו רצפה, והמצלמה גולשת לאורכו: הקצה הקרוב מיטשטש, הקצה הרחוק נמוג, וארבעה סמלי אפליקציה צפים בפינות. בסוף העמוד כולו מתכווץ לפס צר שרואים בו את כל המבנה, ואז חוזר להיות עמוד בית ישר, בדיוק איפה שהתחיל.",
  when:"סקשן שמציג עמוד אחד שלם, כמו תיק עבודות, אתר שנבנה ללקוח או מוצר: עמוד עם כמה מקטעים ברורים, שמלמד לראות את כל המבנה לפני שנכנסים לפרטים. מתאים לסטודיו, סוכנות או מוצר שהעמוד שלו הוא ההוכחה. לא באתר שמרני, ולא כשהקהל צריך לקרוא מהר. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון מוצר ב-prompt-motion.com (21.10.2026), שבו עמוד נחיתה שלם נראה בפרספקטיבה והמצלמה גולשת עליו עד שהוא מתכווץ לפס. נבנה מאפס מהצפייה. **המבנה:** שכבה דביקה (`sticky`) בגובה המסך בתוך סקשן גבוה, ובתוכה `.fp-cam` עם `perspective`, מעליה `.fp-tilt` שמסתובב ב-`rotationX` מהקצה העליון, ובתוכו `.fp-plane` שהוא העמוד עצמו. ההזזה לאורך העמוד היא `y` של `.fp-plane` בלבד, כלומר בתוך המישור המוטה, ולכן התנועה מתקצרת בפרספקטיבה כמו על רצפה אמיתית. אם מזיזים את `.fp-tilt` במקום, זה פשוט גלילה. **העמוד:** נבנה ביחידות `em` שנגזרות מרוחבו (`--pw`), ולכן הוא מתכווץ ומתרחב כמו תמונה, והטקסטים בו הם צילום מסך ולא נועדו לקריאה. בטלפון הוא נבנה מחדש בעמודה אחת עם `@container`. כדי להציג עמוד אמיתי מחליפים את `.fp-plane` בתמונה גבוהה, או בקופסה עם `iframe`, והשאר נשאר. **הזמנים:** נטייה (22 אחוז), גלישה (48), התכווצות לפס (15) וחזרה (15). את גובה העמוד נמדדים מהאלמנט ב-`refresh` (`invalidateOnRefresh`), והפס הצר מחושב כך שכל העמוד נכנס ב-84 אחוז מגובה המסך. **עומק שדה:** שכבה בתחתית עם `backdrop-filter` ומסכה שמחלישה את הטשטוש כלפי מעלה. הטשטוש קבוע, ולכן אין עבודה בגלילה. הדהייה בקצה העליון נחשפת עם הנטייה. **הסמלים:** צפים ב-CSS בלבד (`translate`, `cubic-bezier(.4,0,.2,1)`), וגם נכנסים ויוצאים עם ה-scrub. הציפה כבויה בהפחתת תנועה. **מצב סטטי:** בלי GSAP ובהפחתת תנועה רואים את תחילת העמוד, ישר ובגובה מסך, עם דהייה בתחתית. **כיוון:** העמוד עצמו בעברית מימין לשמאל. הנטייה אנכית ולכן אין מה להפוך לאתר משמאל לימין חוץ מהעמוד שבתוכה.",
  libs:["gsap","ScrollTrigger"],
  css:`.fp{position:relative;max-width:none}
.fp-pin{--pw:min(84cqw,1040px);container-type:inline-size;position:relative;height:min(100vh,760px);height:min(100svh,760px);overflow:hidden}
.fp-cam{position:absolute;inset:0;perspective:1200px;perspective-origin:50% 36%}
.fp-tilt{position:absolute;top:0;inset-inline:0;margin-inline:auto;width:var(--pw);transform-origin:50% 0}
.fp-plane{container:fp / inline-size;overflow:hidden;border-radius:1.2em;background:var(--card);color:var(--ink);font-size:calc(var(--pw) / 62);line-height:1.5;box-shadow:0 0 0 1px var(--line),0 3em 7em color-mix(in srgb,var(--ink) 16%,transparent)}
.fp-hd{display:flex;align-items:center;gap:2em;padding:1.5em 3em}
.fp-hd b{font-size:1.5em}
.fp-hd nav{display:flex;gap:1.8em;margin-inline-start:auto;color:var(--muted)}
.fp-btn{display:inline-block;padding:.7em 1.6em;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-weight:600}
.fp-btn.o{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 .1em var(--line)}
.fp-hero{display:grid;grid-template-columns:1.1fr 1fr;gap:3em;align-items:center;padding:3em 3em 5em}
.fp-hero h3{margin:0 0 .5em;font-size:3.4em;line-height:1.08;font-weight:700;text-wrap:balance}
.fp-hero p{margin:0 0 1.6em;font-size:1.3em;color:var(--muted)}
.fp-hero .acts{display:flex;gap:1em;flex-wrap:wrap}
.fp-hero img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:1.4em}
.fp-logos{display:flex;gap:3em;justify-content:center;align-items:center;padding:2.4em 3em;background:color-mix(in srgb,var(--ink) 4%,var(--card))}
.fp-logos i{display:block;width:8em;height:1.8em;border-radius:.5em;background:color-mix(in srgb,var(--ink) 14%,transparent)}
.fp-sec{padding:5em 3em}
.fp-sec h4{margin:0 0 1.2em;font-size:2.2em;font-weight:700}
.fp-svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.6em}
.fp-svc div{padding:2em;border-radius:1.2em;background:color-mix(in srgb,var(--ink) 4%,var(--card))}
.fp-svc i{display:block;width:3em;height:3em;margin-bottom:1.2em;border-radius:.9em;background:color-mix(in srgb,var(--accent) 18%,transparent)}
.fp-svc b{display:block;margin-bottom:.4em;font-size:1.4em}
.fp-svc span{color:var(--muted)}
.fp-gal{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:1.4em}
.fp-gal img{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:1.2em}
.fp-quote{padding:5em 8em;text-align:center;background:color-mix(in srgb,var(--accent) 8%,var(--card))}
.fp-quote p{margin:0 0 1em;font-size:2.1em;font-weight:600;line-height:1.35;text-wrap:balance}
.fp-quote span{color:var(--muted)}
.fp-faq{display:grid;gap:1em}
.fp-faq div{display:flex;justify-content:space-between;padding:1.4em 1.8em;border-radius:1em;background:color-mix(in srgb,var(--ink) 4%,var(--card));font-size:1.2em;font-weight:600}
.fp-faq i{width:.7em;height:.7em;margin-top:.5em;border:solid var(--muted);border-width:0 .15em .15em 0;rotate:45deg}
.fp-cta{margin:1em 3em 4em;padding:5em 3em;border-radius:1.6em;background:var(--accent);color:var(--accent-ink);text-align:center}
.fp-cta h4{margin:0 0 1em;font-size:2.4em;font-weight:700}
.fp-cta .fp-btn{background:var(--accent-ink);color:var(--accent)}
.fp-ft{display:flex;gap:3em;padding:3em;background:color-mix(in srgb,var(--ink) 5%,var(--card));color:var(--muted)}
.fp-ft b{margin-inline-end:auto;color:var(--ink);font-size:1.4em}
.fp-dof{position:absolute;inset-inline:0;bottom:0;height:34%;pointer-events:none;background:linear-gradient(to top,var(--bg),transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);-webkit-mask-image:linear-gradient(to top,black 15%,transparent);mask-image:linear-gradient(to top,black 15%,transparent)}
.fp-fade{position:absolute;inset-inline:0;top:0;height:30%;pointer-events:none;opacity:0;background:linear-gradient(to bottom,var(--bg) 12%,transparent)}
.fp-ico{position:absolute;display:grid;place-items:center;width:64px;height:64px;border-radius:20px;opacity:0;pointer-events:none;background:var(--card);color:var(--accent);box-shadow:0 0 0 1px var(--line),0 18px 40px color-mix(in srgb,var(--ink) 16%,transparent)}
.fp-ico svg{width:28px;height:28px}
.fp-ico.i1{inset-inline-start:8%;top:22%}
.fp-ico.i2{inset-inline-end:8%;top:16%}
.fp-ico.i3{inset-inline-start:14%;bottom:20%}
.fp-ico.i4{inset-inline-end:12%;bottom:26%}
.fp.is-live .fp-ico{animation:fp-float 6s cubic-bezier(.4,0,.2,1) infinite alternate}
.fp.is-live .fp-ico.i2{animation-delay:-1.5s}
.fp.is-live .fp-ico.i3{animation-delay:-3s}
.fp.is-live .fp-ico.i4{animation-delay:-4.5s}
@keyframes fp-float{to{translate:0 -12px}}
.fp.is-live{height:420vh}
.fp.is-live .fp-pin{position:sticky;top:0;height:100vh;height:100svh}
.fp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@container fp (max-width:640px){
  .fp-hd{padding:1.2em 1.6em}.fp-hd nav{display:none}.fp-hd .fp-btn{margin-inline-start:auto}
  .fp-hero{grid-template-columns:minmax(0,1fr);gap:2em;padding:2em 1.6em 3em}.fp-hero h3{font-size:2.8em}
  .fp-logos{gap:1.4em;padding:1.6em}.fp-logos i{width:5em}.fp-logos i:nth-child(n+4){display:none}
  .fp-sec{padding:3em 1.6em}.fp-svc{grid-template-columns:minmax(0,1fr)}.fp-gal{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.fp-gal img:first-child{grid-column:1/-1;aspect-ratio:3/2}
  .fp-quote{padding:3em 2em}.fp-cta{margin:1em 1.6em 2em;padding:3em 1.6em}.fp-ft{flex-wrap:wrap;gap:1.6em;padding:2em 1.6em}
}
@media(max-width:767px){.fp-pin{--pw:92cqw}.fp-plane{font-size:calc(var(--pw) / 38)}.fp-ico{width:48px;height:48px;border-radius:16px}.fp-ico svg{width:22px;height:22px}}`,
  html:`<div class="stage tight"><section class="fp" aria-labelledby="fp-h">
  <h2 id="fp-h" class="sr-only">עמוד הבית של סטודיו לעיצוב פנים, בתצוגה מלאה מלמעלה</h2>
  <div class="fp-pin" aria-hidden="true">
    <div class="fp-cam">
      <div class="fp-tilt">
        <div class="fp-plane">
          <header class="fp-hd"><b>סטודיו מורן</b><nav><span>פרויקטים</span><span>שירותים</span><span>אודות</span><span>צור קשר</span></nav><span class="fp-btn">תיאום פגישה</span></header>
          <div class="fp-hero">
            <div><h3>בית שמתאים לאיך שאתם חיים</h3><p>תכנון ועיצוב פנים לדירות ולבתים, מהשרטוט הראשון ועד המפתח.</p><div class="acts"><span class="fp-btn">תיאום פגישה</span><span class="fp-btn o">לפרויקטים</span></div></div>
            <img src="../assets/media/real/s13/hero.webp" alt="" width="2560" height="1435" decoding="async">
          </div>
          <div class="fp-logos"><i></i><i></i><i></i><i></i><i></i></div>
          <section class="fp-sec"><h4>מה אנחנו עושים</h4>
            <div class="fp-svc">
              <div><i></i><b>ליווי מלא</b><span>מהתכנון ועד ההתקנה, עם איש קשר אחד.</span></div>
              <div><i></i><b>עיצוב חדר</b><span>חדר אחד, בלי להתחיל מחדש את כל הבית.</span></div>
              <div><i></i><b>תכנון תאורה</b><span>שכבות אור שמתאימות לשעות היום.</span></div>
            </div>
          </section>
          <section class="fp-sec"><h4>פרויקטים אחרונים</h4>
            <div class="fp-gal"><img src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" loading="lazy" decoding="async"><img src="../assets/media/real/s13/proj-b.webp" alt="" width="1200" height="1600" loading="lazy" decoding="async"><img src="../assets/media/real/s13/room.webp" alt="" width="2200" height="1469" loading="lazy" decoding="async"></div>
          </section>
          <div class="fp-quote"><p>הגענו עם תמונות מפינטרסט ויצאנו עם בית שנראה כמו שלנו.</p><span>משפחת לוי, רעננה</span></div>
          <section class="fp-sec"><h4>שאלות נפוצות</h4>
            <div class="fp-faq"><div><span>כמה זמן לוקח פרויקט?</span><i></i></div><div><span>אפשר להתחיל בחדר אחד?</span><i></i></div><div><span>איך נקבע המחיר?</span><i></i></div></div>
          </section>
          <div class="fp-cta"><h4>נתאם פגישה ונראה את הבית שלכם</h4><span class="fp-btn">לתיאום פגישה</span></div>
          <footer class="fp-ft"><b>סטודיו מורן</b><span>פרויקטים</span><span>שירותים</span><span>צור קשר</span></footer>
        </div>
      </div>
    </div>
    <div class="fp-fade"></div>
    <div class="fp-dof"></div>
    <span class="fp-ico i1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg></span>
    <span class="fp-ico i2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/></svg></span>
    <span class="fp-ico i3"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg></span>
    <span class="fp-ico i4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></span>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת תחילת העמוד, ישרה ובגובה מסך
  const root=document.querySelector(".fp"),pin=root.querySelector(".fp-pin"),tilt=root.querySelector(".fp-tilt"),
    plane=root.querySelector(".fp-plane"),fade=root.querySelector(".fp-fade"),icos=[...root.querySelectorAll(".fp-ico")];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const H=()=>pin.clientHeight,PH=()=>plane.offsetHeight;
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    const mob=()=>innerWidth<768;
    tl.to(tilt,{rotationX:()=>mob()?54:60,scale:()=>mob()?.64:.74,y:()=>H()*.1,duration:.22,ease:"power2.inOut"},0)   // העמוד נשכב
      .to(fade,{opacity:1,duration:.22},0)
      .fromTo(icos,{opacity:0,scale:.6},{opacity:1,scale:1,duration:.14,stagger:.03,ease:"power2.out"},.1)
      .to(plane,{y:()=>-(PH()-H()*.7),duration:.48,ease:"power1.inOut"},.22)                       // המצלמה גולשת לאורך העמוד
      .to(tilt,{rotationX:0,scale:()=>.84*H()/PH(),y:()=>.08*H(),duration:.15,ease:"power2.inOut"},.7) // כל העמוד כפס צר
      .to(plane,{y:0,duration:.15,ease:"power2.inOut"},.7)
      .to([fade,...icos],{opacity:0,duration:.12},.7)
      .to(tilt,{scale:1,y:0,duration:.15,ease:"power2.inOut"},.85);                                // וחוזר לעמוד הבית
    return()=>{root.classList.remove("is-live");gsap.set([tilt,plane,fade,...icos],{clearProps:"all"});};
  });
})();`
},
{
  id:"g169", cat:"gsap", name:"אותו איור עובר בין עונות עם חלקיקים", tech:"GSAP · ScrollTrigger scrub · שכבות SVG · canvas", status:"מאושר-עין",
  desc:"איור נוף אחד של בית עם חצר, בארבע שכבות מוערמות שמתחלפות בגלילה: אביב בפריחה, קיץ ירוק, סתיו כתום והעצים מתפשטים, חורף עם שדה לבן. מעל האיור חלקיקים שמתחלפים עם העונה, עלי כותרת, אבקה, עלים ושלג, והאור בחלון ואדי הארובה מתחזקים ככל שהיום קצר יותר.",
  when:"סקשן שמספר סיפור שנמשך לאורך השנה, כמו גינון ותחזוקה, אירוח, אירועים או כל שירות שהעבודה בו חוזרת בכל עונה. מתאים כשצריך להסביר ללקוח שהקשר לא נגמר אחרי הביקור הראשון, וכשיש איור או צילום אחד שאפשר לצבוע מחדש בשלושה או ארבעה מצבים. לא כשהסיפור לא משתנה בין המצבים, ולא באתר שמרני. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: איור שטוח אחד של כפר שעובר בין עונות, עם עלווה שמכתימה בכתום, עצים שמשילים עלים, שדות שמלבינים וחלקיקים שמתחלפים מעלי כותרת לעלים ולשלג (21.10.2026). נבנה מאפס מהצפייה. **המבנה:** `.se-art` מחזיק ארבע שכבות `.se-l` זו על זו, וכל אחת היא עותק מלא של אותו איור עם מחלקת עונה (`sp`, `su`, `au`, `wi`). הצבעים, השמש, הזוהר בחלון, האדים והשלג הם משתני CSS על מחלקת העונה, ולכן הוספת עונה היא עוד בלוק צבעים ולא עוד איור. ב-HTML נמצאת רק העונה הראשונה, ו-JS משכפל אותה בעת ההרצה. **ההחלפה:** שכבה חדשה מתגלה ב-opacity מעל הקודמת, בין `s = k + .3` ל-`s = k + .7`, כך שהשכבות שמתחת נשארות מלאות ואין שום רגע של שקיפות כפולה. השמיים הם `linear-gradient` ב-HTML ולא מעבר צבע בתוך ה-SVG, כי מעבר צבע בתוך ה-SVG משתכפל עם אותו מזהה ויקבל את הצבעים של העותק הראשון. **החלקיקים:** `canvas` אחד מעל האיור עם ארבעה מאגרים (כ-34, 26, 32 ו-80 חלקיקים, ופחות במסך קטן). משקל כל מאגר נגזר מאותה אטימות של השכבות, ומאגר שמשקלו נמוך מ-2 אחוזים לא מצויר ולא מתקדם. הציור דל: סיבוב ב-`setTransform`, בלי מסננים. הוא מתחשב ב-`devicePixelRatio` עד 2, מוסר מה-ticker של GSAP כשהאיור מחוץ למסך (`IntersectionObserver`) ומשנה גודל עם `ResizeObserver`. **הכיתוב:** ארבע שורות מוערמות באותה תא רשת, שנעלמות ונכנסות בזו אחר זו עם הפסקה קצרה ביניהן כדי שלא ייראו שתי שורות על גבי שתיים. הרשימה המלאה גם נמצאת ב-`sr-only`. **הצבעים:** צבעי האיור עצמו (שמיים, עלווה, שלג) כתובים ישירות, כי הם חלק מהנוף ולא מהערכה של האתר, וכל השאר (כותרת, לשוניות, מסגרת) נשאר בטוקנים. כשמחליפים את האיור באיור אחר, מחליפים רק את גוף ה-SVG ואת בלוקי הצבעים. **מצב סטטי:** בלי GSAP ובהפחתת תנועה רואים את האביב בלבד, בלי חלקיקים. **כיוון:** האיור אינו תלוי בכיוון, והלשוניות והכיתוב מתהפכים לבד עם `dir`.",
  libs:["gsap","ScrollTrigger"],
  css:`.se{position:relative;max-width:none}
.se-pin{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:16px;padding:20px var(--gutter);box-sizing:border-box}
.se-hd{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 24px}
.se-hd h2{margin:0;font-size:clamp(20px,2.2vw,28px);font-weight:700;line-height:1.3;color:var(--ink)}
.se-tabs{display:flex;gap:8px}
.se-tab{padding:6px 16px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);color:var(--muted);font-size:14px;font-weight:600;line-height:1.5}
.se-tab.on{background:var(--accent);color:var(--accent-ink);box-shadow:none}
.se-art{position:relative;isolation:isolate;overflow:hidden;border-radius:24px;aspect-ratio:16/9;max-height:72vh;max-height:72svh;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.se-l{position:absolute;inset:0;--sk1:#bfe3f7;--sk2:#f1faff;--sun:#ffe58f;--suno:.95;--cloud:#fff;--h1:#b9dfbd;--h2:#9bd3a3;--fd:#86c98d;--wall:#f8f0e4;--wall2:#e6d9c5;--roof:#bd5a42;--door:#5f4f78;--win:#fff3cf;--glowo:.12;--steamo:0;--snowo:0;--trunk:#7c5b3d;--fol:#f5bccb;--folo:1;--baro:0;--pine:#3f8060;--flo:#fff;--floo:1;--fence:#fffaf2}
.se-l.su{--sk1:#6fbcf0;--sk2:#d6efff;--sun:#ffd43b;--suno:1;--h1:#86c98a;--h2:#5fb36a;--fd:#49a65a;--wall:#fbf3e7;--wall2:#e8dcc8;--roof:#b3513a;--door:#3f6b8a;--win:#fff0c0;--glowo:0;--fol:#3e9a4e;--pine:#2f7650;--flo:#ffd84a;--fence:#fff}
.se-l.au{--sk1:#f2b98a;--sk2:#fde9d0;--sun:#ff9f52;--cloud:#fff3e6;--h1:#dfae72;--h2:#c78d4f;--fd:#c9a35a;--wall:#f6ebdc;--wall2:#e1d0b8;--roof:#9e4631;--door:#6a3f2c;--win:#ffdf8f;--glowo:.5;--steamo:.55;--trunk:#6e4b30;--fol:#e5792b;--baro:.3;--pine:#4a6f4c;--floo:0;--fence:#f3e3cc}
.se-l.wi{--sk1:#7d93b3;--sk2:#c9d6e6;--sun:#eef3f9;--suno:.5;--cloud:#e9eff7;--h1:#d3deec;--h2:#bccbe0;--fd:#eef4fb;--wall:#f2ebe0;--wall2:#ddd2bf;--roof:#8c3f2d;--door:#4e3a30;--win:#ffd573;--glowo:1;--steamo:.9;--snowo:1;--trunk:#5f4630;--folo:0;--baro:1;--pine:#2f5a4a;--floo:0;--fence:#fff}
.se-sky{position:absolute;inset:0;background:linear-gradient(to bottom,var(--sk1),var(--sk2))}
.se-l svg{position:absolute;inset:0;display:block;width:100%;height:100%}
.se-l .sun{fill:var(--sun);opacity:var(--suno)}
.se-l .halo{fill:var(--sun);opacity:calc(var(--suno) * .25)}

.se-l .cloud{fill:var(--cloud);opacity:.85}
.se-l .h1{fill:var(--h1)}
.se-l .h2{fill:var(--h2)}
.se-l .fd{fill:var(--fd)}
.se-l .flo{fill:var(--flo);opacity:var(--floo)}
.se-l .fence{fill:var(--fence)}
.se-l .tk{fill:var(--trunk)}
.se-l .br{fill:none;stroke:var(--trunk);stroke-width:5;stroke-linecap:round;opacity:var(--baro)}
.se-l .fol{fill:var(--fol);opacity:var(--folo)}
.se-l .pine path{fill:var(--pine)}
.se-l .wall{fill:var(--wall)}
.se-l .wall2{fill:var(--wall2)}
.se-l .roof{fill:var(--roof)}
.se-l .snow{fill:#fff;opacity:var(--snowo)}
.se-l .door{fill:var(--door)}
.se-l .win{fill:var(--win)}
.se-l .glow{opacity:var(--glowo)}
.se-l .glow circle{fill:var(--win)}
.se-l .steam{opacity:var(--steamo)}
.se-l .steam circle{fill:#fff;opacity:0;transform-box:fill-box;transform-origin:center}
.se.is-live .se-l .steam circle{animation:se-steam 3.6s linear infinite}
@keyframes se-steam{0%{opacity:0;transform:translate(0,0) scale(.6)}25%{opacity:.8}100%{opacity:0;transform:translate(10px,-46px) scale(1.7)}}
.se-cv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.se-foot{display:grid}
.se-cap{grid-area:1/1;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 16px}
.se-cap:not(:first-child){opacity:0}
.se-cap b{font-size:clamp(24px,3vw,36px);font-weight:700;line-height:1.2;color:var(--ink)}
.se-cap span{font-size:var(--fs-body);line-height:1.5;color:var(--muted)}
.se.is-live{height:340vh}
.se.is-live .se-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
.se.is-live .se-art{aspect-ratio:auto;max-height:none;height:100%}
.se .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px),(max-aspect-ratio:1/1){
  .se-pin{grid-template-rows:auto auto auto;align-content:center;gap:12px}
  .se-art,.se.is-live .se-art{aspect-ratio:1/1;max-height:none;height:auto}
  .se-l .ta{translate:90px 0}.se-l .tb{translate:-76px 0}.se-l .pine{translate:-40px 0}.se-l .sun,.se-l .halo{translate:-96px 0}
}
@media(max-width:767px){.se-tab{padding:4px 12px;font-size:13px}.se-tabs{gap:6px}}`,
  html:`<div class="stage tight"><section class="se" aria-labelledby="se-h">
  <div class="se-pin">
    <header class="se-hd">
      <h2 id="se-h">גינה שמתוחזקת כל השנה</h2>
      <div class="se-tabs" aria-hidden="true"><span class="se-tab on">אביב</span><span class="se-tab">קיץ</span><span class="se-tab">סתיו</span><span class="se-tab">חורף</span></div>
    </header>
    <div class="se-art" aria-hidden="true">
      <div class="se-l sp">
        <div class="se-sky"></div>
        <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMax slice" focusable="false">
          <circle class="halo" cx="790" cy="118" r="78"/>
          <circle class="sun" cx="790" cy="118" r="46"/>
          <g class="cloud"><ellipse cx="220" cy="110" rx="70" ry="20"/><ellipse cx="262" cy="96" rx="44" ry="20"/><ellipse cx="640" cy="70" rx="56" ry="15"/><ellipse cx="672" cy="60" rx="34" ry="14"/></g>
          <path class="h1" d="M0 360C140 300 260 310 380 345S620 330 760 300S920 320 1000 340V560H0Z"/>
          <path class="h2" d="M0 400C120 360 260 372 400 395S700 380 840 360S960 372 1000 380V560H0Z"/>
          <g class="tc" transform="translate(66 178) scale(.6)"><rect class="tk" x="-8" y="320" width="16" height="124" rx="6"/><path class="br" d="M0 352L-34 308M0 364L38 316M0 332L0 286M-34 308L-48 288M38 316L52 296"/><g class="fol"><circle cx="0" cy="282" r="54"/><circle cx="-42" cy="316" r="40"/><circle cx="44" cy="314" r="42"/><circle cx="0" cy="318" r="44"/></g></g>
          <g class="td" transform="translate(930 151) scale(.66)"><rect class="tk" x="-8" y="320" width="16" height="124" rx="6"/><path class="br" d="M0 352L-34 308M0 364L38 316M0 332L0 286M-34 308L-48 288M38 316L52 296"/><g class="fol"><circle cx="0" cy="282" r="54"/><circle cx="-42" cy="316" r="40"/><circle cx="44" cy="314" r="42"/><circle cx="0" cy="318" r="44"/></g></g>
          <path class="fd" d="M0 452C200 430 380 438 520 448S820 442 1000 432V560H0Z"/>
          <g class="flo"><circle cx="140" cy="486" r="4"/><circle cx="232" cy="504" r="4"/><circle cx="320" cy="478" r="4"/><circle cx="610" cy="492" r="4"/><circle cx="690" cy="480" r="4"/><circle cx="770" cy="500" r="4"/><circle cx="880" cy="484" r="4"/><circle cx="110" cy="516" r="4"/><circle cx="410" cy="520" r="4"/><circle cx="560" cy="510" r="4"/><circle cx="840" cy="520" r="4"/><circle cx="480" cy="530" r="4"/></g>
          <g class="ta" transform="translate(190 0)"><rect class="tk" x="-8" y="320" width="16" height="124" rx="6"/><path class="br" d="M0 352L-34 308M0 364L38 316M0 332L0 286M-34 308L-48 288M38 316L52 296"/><g class="fol"><circle cx="0" cy="282" r="54"/><circle cx="-42" cy="316" r="40"/><circle cx="44" cy="314" r="42"/><circle cx="0" cy="318" r="44"/></g></g>
          <g class="pine" transform="translate(690 0)"><rect class="tk" x="-5" y="410" width="10" height="34"/><path d="M0 292L-34 352H34ZM0 322L-42 390H42ZM0 354L-52 428H52Z"/></g>
          <g class="tb" transform="translate(810 62) scale(.86)"><rect class="tk" x="-8" y="320" width="16" height="124" rx="6"/><path class="br" d="M0 352L-34 308M0 364L38 316M0 332L0 286M-34 308L-48 288M38 316L52 296"/><g class="fol"><circle cx="0" cy="282" r="54"/><circle cx="-42" cy="316" r="40"/><circle cx="44" cy="314" r="42"/><circle cx="0" cy="318" r="44"/></g></g>
          <g class="fence"><rect x="232" y="434" width="122" height="4"/><rect x="236" y="424" width="6" height="28"/><rect x="272" y="424" width="6" height="28"/><rect x="308" y="424" width="6" height="28"/><rect x="344" y="424" width="6" height="28"/></g>
          <g class="lamp"><rect class="tk" x="378" y="378" width="5" height="64"/><circle class="win" cx="380.5" cy="372" r="9"/><g class="glow"><circle cx="380" cy="372" r="46" fill-opacity=".14"/><circle cx="380" cy="372" r="30" fill-opacity=".2"/><circle cx="380" cy="372" r="18" fill-opacity=".3"/></g></g>
          <rect class="wall2" x="548" y="262" width="22" height="46" rx="2"/>
          <rect class="wall" x="410" y="330" width="180" height="112" rx="4"/>
          <path class="roof" d="M394 334L500 260L606 334Z"/>
          <path class="snow" d="M402 330L500 262L598 330L586 330L500 274L414 330Z"/>
          <rect class="wall2" x="545" y="258" width="28" height="8" rx="2"/>
          <rect class="door" x="482" y="380" width="36" height="62" rx="5"/>
          <rect class="win" x="428" y="360" width="36" height="36" rx="4"/>
          <rect class="win" x="536" y="360" width="36" height="36" rx="4"/>
          <path class="wall2" d="M446 360V396M428 378H464M554 360V396M536 378H572"/>
          <g class="glow"><circle cx="554" cy="378" r="58" fill-opacity=".12"/><circle cx="554" cy="378" r="40" fill-opacity=".18"/><circle cx="554" cy="378" r="24" fill-opacity=".28"/></g>
          <g class="steam"><circle cx="559" cy="246" r="7"/><circle cx="562" cy="246" r="6" style="animation-delay:-1.2s"/><circle cx="557" cy="246" r="7" style="animation-delay:-2.4s"/></g>
        </svg>
      </div>
    </div>
    <div class="se-foot" aria-hidden="true">
      <div class="se-cap"><b>אביב</b><span>שתילה ובדיקה של מערכת ההשקיה.</span></div>
      <div class="se-cap"><b>קיץ</b><span>גיזום קל והשקיה שמותאמת לימים החמים.</span></div>
      <div class="se-cap"><b>סתיו</b><span>איסוף עלים וניקוז לפני הגשמים הראשונים.</span></div>
      <div class="se-cap"><b>חורף</b><span>הגנה על צמחים רגישים ותאורה שנדלקת מוקדם.</span></div>
    </div>
    <ul class="sr-only"><li>אביב: שתילה ובדיקה של מערכת ההשקיה.</li><li>קיץ: גיזום קל והשקיה שמותאמת לימים החמים.</li><li>סתיו: איסוף עלים וניקוז לפני הגשמים הראשונים.</li><li>חורף: הגנה על צמחים רגישים ותאורה שנדלקת מוקדם.</li></ul>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת העונה הראשונה בלבד
  const root=document.querySelector(".se"),art=root.querySelector(".se-art"),first=art.querySelector(".se-l"),
    tabs=[...root.querySelectorAll(".se-tab")],caps=[...root.querySelectorAll(".se-cap")];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const names=["sp","su","au","wi"],layers=[first],W=[1,0,0,0],R=(a,b)=>a+Math.random()*(b-a),sm=x=>x*x*(3-2*x);
    for(let k=1;k<4;k++){const c=first.cloneNode(true);c.className="se-l "+names[k];art.appendChild(c);layers.push(c);}
    const cv=document.createElement("canvas");cv.className="se-cv";cv.setAttribute("aria-hidden","true");art.appendChild(cv);
    const ctx=cv.getContext("2d"),LEAF=["#d9702a","#c2501f","#e8a03a","#b5651d"];
    let w=0,h=0,dpr=1,time=0,pools=[],on=false;
    // ארבעה סוגי חלקיקים: עלי כותרת, אבקה, עלים, שלג
    const mk=[
      ()=>({x0:R(0,w),y:R(0,h),r:R(3.5,6),v:R(24,44),sw:R(10,26),ph:R(0,6.28),sp:R(.6,1.4),rot:R(0,6.28),rs:R(-2,2),c:Math.random()<.5?"#f7c4d2":"#fde3ea"}),
      ()=>({x0:R(0,w),y:R(0,h),r:R(1.2,2.6),v:-R(8,18),sw:R(8,22),ph:R(0,6.28),sp:R(.4,1),rot:0,rs:0,c:"#ffe08a"}),
      ()=>({x0:R(0,w),y:R(0,h),r:R(4,7),v:R(36,66),sw:R(14,34),ph:R(0,6.28),sp:R(.8,1.8),rot:R(0,6.28),rs:R(-3,3),c:LEAF[Math.floor(Math.random()*4)]}),
      ()=>({x0:R(0,w),y:R(0,h),r:R(1.4,3.4),v:R(26,58),sw:R(6,18),ph:R(0,6.28),sp:R(.5,1.2),rot:0,rs:0,c:"#fff"})
    ];
    function fit(){
      const r=art.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);
      cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      const f=Math.max(.45,Math.min(1,w*h/450000));
      pools=[34,26,32,80].map((n,k)=>Array.from({length:Math.round(n*f)},()=>mk[k]()));
    }
    function tick(t,dt){
      const d=Math.min(dt,50)/1000;time+=d;ctx.clearRect(0,0,w,h);
      for(let k=0;k<4;k++){
        if(W[k]<.02)continue;
        ctx.globalAlpha=W[k];
        for(const p of pools[k]){
          p.y+=p.v*d;
          if(p.v>0&&p.y>h+12){p.y=-12;p.x0=R(0,w);}else if(p.v<0&&p.y<-12){p.y=h+12;p.x0=R(0,w);}
          p.rot+=p.rs*d;
          const x=p.x0+Math.sin(time*p.sp+p.ph)*p.sw;
          ctx.fillStyle=p.c;ctx.beginPath();
          if(k===1){ctx.globalAlpha=W[k]*(.5+.5*Math.sin(time*1.6+p.ph));ctx.arc(x,p.y,p.r,0,6.283);}
          else if(k===3){ctx.arc(x,p.y,p.r,0,6.283);}
          else{const c=Math.cos(p.rot)*dpr,s=Math.sin(p.rot)*dpr;ctx.setTransform(c,s,-s,c,x*dpr,p.y*dpr);ctx.ellipse(0,0,p.r*(k===2?1.5:1),p.r*(k===2?.75:.55),0,0,6.283);}
          ctx.fill();ctx.setTransform(dpr,0,0,dpr,0,0);
        }
      }
      ctx.globalAlpha=1;
    }
    fit();
    const ro=new ResizeObserver(fit);ro.observe(art);
    const io=new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!on){gsap.ticker.add(tick);on=true;}else if(!v&&on){gsap.ticker.remove(tick);on=false;}});io.observe(art);
    // s עובר מ-0 עד 3: אביב, קיץ, סתיו, חורף. כל שכבה מתגלה בין k+.3 ל-k+.7
    function draw(s){
      const o=[1,0,0,0];
      for(let k=1;k<4;k++)o[k]=sm(Math.max(0,Math.min(1,(s-(k-1)-.3)/.4)));
      const idx=Math.round(s);
      for(let k=0;k<4;k++){
        layers[k].style.opacity=o[k];W[k]=o[k]*(k<3?1-o[k+1]:1);
        tabs[k].classList.toggle("on",k===idx);
        const a=Math.max(0,Math.min(1,(.5-Math.abs(s-k))/.2));
        caps[k].style.opacity=a;caps[k].style.transform="translateY("+((1-a)*10).toFixed(1)+"px)";
      }
    }
    const st={s:0};
    gsap.to(st,{s:3,ease:"none",onUpdate:()=>draw(st.s),scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    draw(0);
    return()=>{
      if(on){gsap.ticker.remove(tick);on=false;}
      io.disconnect();ro.disconnect();
      layers.slice(1).forEach(l=>l.remove());cv.remove();first.style.opacity="";
      tabs.forEach((t,k)=>t.classList.toggle("on",k===0));
      caps.forEach(c=>{c.style.opacity="";c.style.transform="";});
      root.classList.remove("is-live");
    };
  });
})();`
},
{
  id:"g170", cat:"gsap", name:"חלקים שמתכנסים ונעולים למוצר אחד", tech:"GSAP · ScrollTrigger scrub · SVG · sticky", status:"מאושר-עין",
  desc:"ארבעה חלקים של מנורת שולחן תלויים בנפרד על רקע כהה עם קווי מהירות חלשים. בגלילה הם מתקרבים זה לזה תוך כדי סיבוב ונעילים בנקודות החיבור, עם הבזק קטן ומילת חותמת. אחרי הנעילה המנורה נדלקת והתצוגה נכנסת אל המוצר המורכב.",
  when:"קטע שמציג הצעה שמורכבת מחלקים שאפשר לראות ולהצביע עליהם, כמו ערכה, מארז, מערכת מודולרית או חבילת בית. מתאים כשהמסר הוא שהחלקים משתלבים בלי מאמץ, ויש שלושה עד שישה חלקים עם שמות. לא כשיש יותר משמונה חלקים, ולא באתר שקט שהאפקט הזה יהיה חזק מדי בו. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: מוצר שמורכב מחלקים נפרדים על רקע כהה עם קווי מהירות חלשים, שבו החלקים מתקרבים, מסתובבים אל נקודות החיבור ונעילים בהבזק קטן ובמילת חותמת, והמצלמה נכנסת אל המוצר המורכב (21.10.2026). נבנה מאפס מהצפייה. **המבנה:** קטע דביק (`sticky`) בגובה מסך בתוך סקשן גבוה, עם עמודת טקסט ועמודה לאיור. האיור הוא SVG אחד שבו כל חלק הוא קבוצה `<g>` שמצוירת במיקום הסופי שלה, ולכן המצב הסטטי הוא המוצר המורכב בדיוק. את המיקום ההתחלתי מוסיפה רק ציר הזמן. כדי שהסיבוב ישב על נקודת החיבור, כל חלק עטוף בקבוצות מקוננות: קבוצת החלק נעה ב-`x` וב-`y`, בתוכה קבוצה עם `transform` קבוע מסוג `translate(px py)` שמניח את הראשית על נקודת החיבור, בתוכה `.pa-r` שמסתובבת סביב (0,0) (`transformOrigin:` של `0 0`), ובתוכה קבוצה עם `translate(-px -py)` שמחזירה את הציור למקומו. כך אין `svgOrigin` ואין סחף ברענון. **הזמנים:** ארבעת החלקים יוצאים בהפרש של 4 נקודות אחוז זה מזה, ותנועת ההתקרבות של כל אחד לוקחת כ-44 אחוז מהגלילה (`power2.inOut`), כך שהם לא נוחתים ביחד. הסיבוב נפרד מהתנועה (`power4.out` על `.pa-r`, כ-28 אחוז, ומתחיל מעט אחרי התנועה), כדי שהחלק ישב על הציר רק ברגע האחרון, כמו נעילה. אין `back` ואין `elastic` (נאסר בספרייה), והתחושה של נעילה באה מהסיבוב המהיר ומהרעד הקצר של הקבוצה כולה. **הנעילה:** שלוש טבעות הבזק (`.pa-ring`, מתרחבות ונמוגות), מילת חותמת ב-HTML (`.pa-stamp`) שנכנסת מגדולה לקטנה, ורעד של 6 יחידות. אחריה נדלק האור: חרוט אור והשתקפות על הרצפה, שנחשפים ב-opacity. **הקווים:** `repeating-conic-gradient` עם מסכה רדיאלית שמרוקנת את המרכז, ובגלילה הם גדלים ונמוגים עד הנעילה. **הסיום:** הקבוצה `.pa-zoom` מתקרבת עד 1.32 (1.4 בטלפון), כך שהמצב האחרון הוא תקריב. הקבוצה `.pa-world` נשארת לרעד של הנעילה. **צבעים:** רק בטוקנים. הרקע הוא `var(--ink)` והחלקים `var(--card)`, והמפרקים והאהיל `var(--accent)`, ולכן גם העור ההפוך נראה נכון. כדי להציג מוצר אחר מחליפים את הצורות בתוך הקבוצות ואת הפיבוטים, ושומרים על ארבעה חלקים לכל היותר. **מצב סטטי:** בלי GSAP ובהפחתת תנועה רואים את המוצר המורכב והדלוק, בלי קווים ובלי חותמת. **כיוון:** האיור עצמו אינו מכוון. עמודת הטקסט יושבת בצד ההתחלה, והחותמת ממוקמת במאפיין `left` ולא לוגי, כי האיור עצמו לא מתהפך, ולכן בעמוד משמאל לימין רק עמודת הטקסט מתחלפת.",
  libs:["gsap","ScrollTrigger"],
  css:`.pa{position:relative;max-width:none}
.pa-pin{position:relative;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:center;gap:32px;min-height:min(100vh,720px);min-height:min(100svh,720px);padding:48px var(--gutter);box-sizing:border-box;overflow:hidden;background:var(--ink);color:var(--bg)}
.pa-copy{position:relative;z-index:1}
.pa-copy h2{margin:0 0 16px;font-size:clamp(28px,3.4vw,48px);font-weight:700;line-height:1.15;text-wrap:balance}
.pa-copy p{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;opacity:.78}
.pa-fig{position:relative;align-self:stretch;min-height:320px}
.pa-lines{position:absolute;inset:-10%;opacity:0;pointer-events:none;background:repeating-conic-gradient(from 0deg at 50% 52%,color-mix(in srgb,var(--bg) 16%,transparent) 0 .5deg,transparent .5deg 5deg);-webkit-mask-image:radial-gradient(circle farthest-side at 50% 52%,transparent 14%,black 40%,transparent 96%);mask-image:radial-gradient(circle farthest-side at 50% 52%,transparent 14%,black 40%,transparent 96%)}
.pa-svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
.pa-b1{fill:var(--card)}
.pa-b2{fill:color-mix(in srgb,var(--card) 68%,var(--ink))}
.pa-tube{fill:color-mix(in srgb,var(--card) 84%,var(--ink))}
.pa-jt,.pa-sh1{fill:var(--accent)}
.pa-jd{fill:var(--accent-ink)}
.pa-sh2{fill:color-mix(in srgb,var(--accent) 34%,var(--bg))}
.pa-cone{opacity:1}
.pa-pool{fill:var(--accent);opacity:.22}
.pa-ring{fill:none;stroke:var(--accent);stroke-width:4;opacity:0}
.pa-lb{fill:var(--bg);opacity:.78;font-size:15px;font-weight:600;text-anchor:middle}
.pa-stamp{position:absolute;top:8%;left:58%;z-index:1;font-size:clamp(40px,6vw,80px);font-weight:800;line-height:1;color:var(--accent);rotate:-8deg;opacity:0;pointer-events:none}
.pa.is-live{height:340vh}
.pa.is-live .pa-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .pa-pin{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);align-items:start;gap:16px;padding:48px var(--gutter) 24px}
  .pa-copy h2{font-size:26px}
  .pa-stamp{top:4%;left:52%;font-size:48px}
}`,
  html:`<div class="stage tight"><section class="pa" aria-labelledby="pa-h">
  <div class="pa-pin">
    <div class="pa-copy">
      <h2 id="pa-h">מנורת שולחן שמגיעה בארבעה חלקים</h2>
      <p>הבסיס, המוט, הזרוע והאהיל נכנסים זה בזה ונעילים במקום. אין ברגים ואין כלים, והמנורה דולקת כבר בהרכבה הראשונה.</p>
    </div>
    <div class="pa-fig" aria-hidden="true">
      <div class="pa-lines"></div>
      <svg class="pa-svg" viewBox="100 70 520 480" preserveAspectRatio="xMidYMid meet" focusable="false">
        <defs><linearGradient id="pa-cone-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.46"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></linearGradient></defs>
        <g class="pa-world"><g transform="translate(330 330)"><g class="pa-zoom"><g transform="translate(-330 -330)">
          <path class="pa-cone" d="M334 262H474L554 500H254Z" fill="url(#pa-cone-g)"/>
          <ellipse class="pa-pool" cx="404" cy="500" rx="150" ry="14"/>
          <g class="pa-base"><g transform="translate(260 486)"><g class="pa-r"><g transform="translate(-260 -486)"><rect class="pa-b1" x="170" y="472" width="180" height="28" rx="14"/><rect class="pa-b2" x="200" y="462" width="120" height="14" rx="7"/><text class="pa-lb" x="260" y="530">בסיס</text></g></g></g></g>
          <g class="pa-arm"><g transform="translate(332 223)"><g class="pa-r"><g transform="translate(-332 -223)"><g transform="translate(260 268) rotate(-32)"><rect class="pa-tube" x="0" y="-7" width="170" height="14" rx="7"/></g><text class="pa-lb" x="318" y="196">זרוע</text></g></g></g></g>
          <g class="pa-stem"><g transform="translate(260 370)"><g class="pa-r"><g transform="translate(-260 -370)"><rect class="pa-tube" x="252" y="268" width="16" height="204" rx="8"/><circle class="pa-jt" cx="260" cy="268" r="14"/><circle class="pa-jd" cx="260" cy="268" r="5"/><text class="pa-lb" x="214" y="376">מוט</text></g></g></g></g>
          <g class="pa-shade"><g transform="translate(404 220)"><g class="pa-r"><g transform="translate(-404 -220)"><path class="pa-sh1" d="M388 178H420L480 262H328Z"/><ellipse class="pa-sh2" cx="404" cy="262" rx="76" ry="9"/><circle class="pa-jt" cx="404" cy="178" r="12"/><circle class="pa-jd" cx="404" cy="178" r="4"/><text class="pa-lb" x="520" y="236">אהיל</text></g></g></g></g>
          <g transform="translate(260 468)"><circle class="pa-ring" r="26"/></g>
          <g transform="translate(260 268)"><circle class="pa-ring" r="26"/></g>
          <g transform="translate(404 178)"><circle class="pa-ring" r="26"/></g>
        </g></g></g></g>
      </svg>
      <span class="pa-stamp">קליק</span>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר המוצר המורכב והדלוק
  const root=document.querySelector(".pa"),q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
  const world=q(".pa-world"),zoom=q(".pa-zoom"),base=q(".pa-base"),stem=q(".pa-stem"),arm=q(".pa-arm"),shade=q(".pa-shade"),
    rings=qa(".pa-ring"),cone=q(".pa-cone"),pool=q(".pa-pool"),lines=q(".pa-lines"),stamp=q(".pa-stamp"),labels=qa(".pa-lb"),
    R=el=>el.querySelector(".pa-r");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const mob=()=>innerWidth<768;
    // הציר של כל סיבוב ושל ההתקרבות הוא (0,0) של הקבוצה הפנימית, וקבוצת העטיפה במאפיין transform קובעת היכן הוא יושב באיור
    gsap.set([R(base),R(stem),R(arm),R(shade),zoom,...rings],{transformOrigin:"0 0"});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // הקווים והתנועה: ארבעה חלקים מתקרבים בהפרש, וההסתובבות נפרדת מהתנועה
    tl.fromTo(lines,{opacity:.6,scale:.8},{opacity:0,scale:1.5,duration:.52,ease:"power1.in"},0)
      .fromTo(base,{x:-14,y:46},{x:0,y:0,duration:.44,ease:"power2.inOut"},0)
      .fromTo(R(base),{rotation:-9},{rotation:0,duration:.3,ease:"power4.out"},.14)
      .fromTo(stem,{x:-130,y:-60},{x:0,y:0,duration:.44,ease:"power2.inOut"},.04)
      .fromTo(R(stem),{rotation:-38},{rotation:0,duration:.28,ease:"power4.out"},.2)
      .fromTo(arm,{x:60,y:-120},{x:0,y:0,duration:.44,ease:"power2.inOut"},.08)
      .fromTo(R(arm),{rotation:40},{rotation:0,duration:.28,ease:"power4.out"},.24)
      .fromTo(shade,{x:170,y:-30},{x:0,y:0,duration:.42,ease:"power2.inOut"},.12)
      .fromTo(R(shade),{rotation:55},{rotation:0,duration:.26,ease:"power4.out"},.28)
      .to(labels,{opacity:0,duration:.1},.4)
      // הנעילה: הבזק, חותמת, רעד קצר
      .fromTo(rings,{scale:.3,opacity:.9},{scale:1.9,opacity:0,duration:.12,ease:"power2.out",stagger:.012},.56)
      .fromTo(stamp,{scale:2,opacity:0},{scale:1,opacity:1,duration:.05,ease:"power4.out"},.56)
      .to(stamp,{opacity:0,duration:.1},.72)
      .to(world,{y:6,duration:.03,ease:"power2.out"},.56)
      .to(world,{y:0,duration:.06,ease:"power2.inOut"},.59)
      // אחרי הנעילה המנורה נדלקת והתצוגה נכנסת פנימה
      .fromTo(cone,{opacity:0},{opacity:1,duration:.12,ease:"power1.out"},.62)
      .fromTo(pool,{opacity:0},{opacity:.22,duration:.12,ease:"power1.out"},.62)
      .to(zoom,{scale:()=>mob()?1.4:1.32,duration:.26,ease:"power2.inOut"},.74);
    return()=>{
      root.classList.remove("is-live");
      gsap.set([world,zoom,base,stem,arm,shade,R(base),R(stem),R(arm),R(shade),...rings,cone,pool,lines,stamp,...labels],{clearProps:"all"});
    };
  });
})();`
}
];
