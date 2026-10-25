// מהלכי מוצר ותהליך מ-prompt-motion.com, אצווה N (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם").
// האתר הוא גלריית סרטוני תנועה. כאן תשעה מהלכים של ממשק ותהליך: שכבת מדדים על תמונה, כיתוב בצורת גלולה,
// מכשירים שנפתחים מאחורי מכשיר מרכזי, כרטיס עם שלושה מצבים, הערה צפה על מסמך, מסגרת שמחליפה יחס,
// זכוכית מגדלת על גרף, מפה מוטה עם סמנים ולוח משימות עם גרף ירידה.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
export default [
{
  id:"g237", cat:"gsap", name:"שכבת מדדים על המסך שמתעדכנת עם הסצנות", tech:"GSAP · ScrollTrigger scrub · sticky · HUD", status:"מאושר-עין",
  desc:"צילום גדול של פרויקט, ומעליו שכבת מדידה כמו במצלמה: ארבעה סימני פינה, סרגל עם שנתות, תוויות קטנות בכתב מונוספייס ומספר גדול בפינה. כשגוללים, הצילומים מתחלפים והמספרים מתעדכנים יחד איתם: השבוע, אחוז ההתקדמות, ימי העבודה והתקציב שנוצל, והסמן נע על הסרגל. הקורא רואה את הפרויקט מתקדם ולא רק קורא עליו.",
  when:"סיפור שיש לו ציר אמיתי של התקדמות: שיפוץ או עיצוב דירה לפי חדרים ושבועות, הקמת אתר לפי שלבים, מסע של לקוח, פרויקט עם תקציב ולוח זמנים. הערכים חייבים להיות אמיתיים, כי המספרים הם ההוכחה. מתאים לסקשן מקרה בוחן או \"איך אנחנו עובדים\", פעם אחת בעמוד. לא לעמוד שאין בו מה למדוד.",
  note:"**שחזור.** השראה: כמה סרטוני הדגמה בגלריה של prompt-motion.com (21.10.2026) שבהם שכבת מדידה יושבת מעל התמונה: סימני פינה, תוויות קטנות ומונים שמתעדכנים עם הסצנות. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** הצילום האחרון (פינת הקריאה), שבוע 12 מתוך 12, 100% והסמן בקצה הסרגל. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור גלילה של 320vh, רק כשה-JS חי), וערך אחד, `p` מ-0 עד 1, מזין פונקציה אחת `paint(p)` שמציירת הכל: האטימות של כל צילום (צילום חדש נכנס מעל הקודם ומתבהר), שם החדר, ארבעת המספרים והסמן על הסרגל. כל מספר הוא פונקציה של `p`, ולכן אותו קוד נכון גם בגלילה לאחור. שם החדר מתחלף רק כשהחדר משתנה, ובכל החלפה סימני הפינה מתהדקים קצת. **המספרים:** `SC` בקוד הוא רשימת השלבים (שם החדר ומספר בעלי המקצוע שעבדו בו), והשאר מוכפלים ב-`p` (11 שבועות, 58 ימי עבודה, 96% מהתקציב). משנים רק שם את הערכים. **נגישות:** שכבת המדידה כולה `aria-hidden`, והמסגרת נושאת `aria-label` עם הערכים הסופיים, כך שקורא מסך לא שומע מספרי ביניים. **תמונות:** מהמאגר, עם מידות מפורשות ו-`lazy`. **RTL:** הסמן והמילוי נעים מימין לשמאל. ב-LTR משנים את `--sx` ל-1 ואת `transform-origin` של `.vf-fill` ל-`left center`. **בנייד** התוויות קצרות והמסגרת נמוכה יותר, וכל השכבה נשארת בתוך הצילום.",
  libs:["gsap","ScrollTrigger"],
  css:`.vf{--sx:-1;max-width:1120px;margin-inline:auto}
.vf-pin{display:grid;align-content:center;gap:24px}
.vf-head{display:grid;gap:12px;max-width:54ch}
.vf-head h2{margin:0;font-size:clamp(28px,3.4vw,52px);line-height:1.1;text-wrap:balance}
.vf-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.vf-frame{position:relative;overflow:hidden;isolation:isolate;height:clamp(440px,64svh,660px);border-radius:20px;background:var(--card);color:var(--bg)}
.vf-imgs{position:absolute;inset:0}
.vf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0}
.vf-img:last-child{opacity:1}
.vf-shade{position:absolute;inset:0;background:linear-gradient(color-mix(in srgb,var(--ink) 52%,transparent),transparent 30%,transparent 50%,color-mix(in srgb,var(--ink) 72%,transparent))}
/* שכבת המדידה: רשת של שורה עליונה, אמצע, שורה תחתונה וסרגל */
.vf-hud{position:absolute;inset:40px;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto 1fr auto auto;gap:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.03em}
.vf-chip{display:inline-flex;align-items:baseline;gap:8px;padding:6px 12px;border-radius:8px;background:color-mix(in srgb,var(--ink) 74%,transparent);backdrop-filter:blur(6px);font-size:14px;line-height:1.3;font-weight:500;white-space:nowrap}
.vf-chip b{display:inline-block;font-weight:700;font-variant-numeric:tabular-nums}
.vf-meta{grid-area:1/1;justify-self:start}
.vf-weekc{grid-area:1/2;justify-self:end}
.vf-tele{grid-area:2/1;align-self:start;justify-self:start;display:grid;grid-template-columns:auto auto;gap:6px 20px;padding:12px 16px;border-radius:10px;background:color-mix(in srgb,var(--ink) 74%,transparent);backdrop-filter:blur(6px);font-size:14px;line-height:1.3}
.vf-tele b{font-variant-numeric:tabular-nums;text-align:end}
.vf-ttl{grid-area:3/1;align-self:end;justify-self:start}
.vf-big{grid-area:3/2;align-self:end;margin:0;direction:ltr;font-size:clamp(56px,7.4vw,112px);font-weight:600;line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums;text-shadow:0 2px 24px color-mix(in srgb,var(--ink) 55%,transparent)}
.vf-big small{margin-inline-start:4px;font-size:.38em;font-weight:500}
.vf-rule{grid-area:4/1/5/3;position:relative;height:20px;background:
  repeating-linear-gradient(90deg,color-mix(in srgb,var(--bg) 85%,transparent) 0 2px,transparent 2px 72px) bottom / 100% 20px no-repeat,
  repeating-linear-gradient(90deg,color-mix(in srgb,var(--bg) 55%,transparent) 0 1px,transparent 1px 12px) bottom / 100% 9px no-repeat}
.vf-fill{position:absolute;inset-inline:0;bottom:0;height:3px;background:var(--accent);transform-origin:right center}
.vf-mk{position:absolute;top:-4px;bottom:0;inset-inline-start:calc(100% - 2px);width:2px;background:var(--bg)}
.vf-mk::before{content:"";position:absolute;top:-6px;left:50%;translate:-50% 0;border:5px solid transparent;border-top-color:var(--bg);border-bottom:0}
/* סימני הפינה: ארבע זוויות דקות כמו במסך צילום */
.vf-br{position:absolute;width:28px;height:28px;border:0 solid color-mix(in srgb,var(--bg) 92%,transparent);pointer-events:none}
.vf-br.a{top:14px;right:14px;border-top-width:2px;border-right-width:2px;transform-origin:100% 0}
.vf-br.b{top:14px;left:14px;border-top-width:2px;border-left-width:2px;transform-origin:0 0}
.vf-br.c{bottom:14px;right:14px;border-bottom-width:2px;border-right-width:2px;transform-origin:100% 100%}
.vf-br.d{bottom:14px;left:14px;border-bottom-width:2px;border-left-width:2px;transform-origin:0 100%}
.vf.is-live .vf-run{height:320vh}
.vf.is-live .vf-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .vf-pin{gap:16px}
  .vf-head p{display:none}
  .vf-frame{height:clamp(420px,62svh,560px);border-radius:16px}
  .vf-hud{inset:32px 28px}
  .vf-chip,.vf-tele{font-size:13px}
  .vf-br{width:22px;height:22px}
  .vf-br.a,.vf-br.b{top:12px}.vf-br.c,.vf-br.d{bottom:12px}
  .vf-br.a,.vf-br.c{right:12px}.vf-br.b,.vf-br.d{left:12px}
}`,
  html:`<div class="stage"><div class="vf"><div class="vf-run"><div class="vf-pin">
  <div class="vf-head"><h2>מעקב אחרי פרויקט עיצוב, חדר אחרי חדר</h2><p>בכל רגע רואים באיזה חדר העבודה נמצאת, כמה ימי עבודה עברו וכמה מהתקציב כבר נוצל.</p></div>
  <div class="vf-frame" role="img" aria-label="ארבעה חדרים מפרויקט עיצוב של דירה ברמת גן, מהכניסה ועד פינת הקריאה. בסיום: שבוע 12 מתוך 12, הושלם 100%, 58 ימי עבודה ו-96% מהתקציב נוצל.">
    <div class="vf-imgs" aria-hidden="true">
      <img class="vf-img" src="../assets/media/real/s13/hero.webp" alt="" width="2560" height="1435" loading="lazy" decoding="async">
      <img class="vf-img" src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" loading="lazy" decoding="async">
      <img class="vf-img" src="../assets/media/real/s13/proj-c.webp" alt="" width="2400" height="1026" loading="lazy" decoding="async">
      <img class="vf-img" src="../assets/media/real/s13/room.webp" alt="" width="2200" height="1469" loading="lazy" decoding="async">
    </div>
    <span class="vf-shade" aria-hidden="true"></span>
    <div class="vf-hud" aria-hidden="true">
      <span class="vf-chip vf-meta">פרויקט: דירה ברמת גן</span>
      <span class="vf-chip vf-weekc">שבוע <b class="vf-wk">12</b> מתוך 12</span>
      <div class="vf-tele">
        <span>ימי עבודה</span><b class="vf-days">58</b>
        <span>בעלי מקצוע באתר</span><b class="vf-wrk">4</b>
        <span>תקציב שנוצל</span><b class="vf-bud">96%</b>
      </div>
      <span class="vf-chip vf-ttl">חדר: <b>פינת הקריאה</b></span>
      <p class="vf-big"><bdi class="vf-pct">100</bdi><small>%</small></p>
      <div class="vf-rule"><i class="vf-fill"></i><i class="vf-mk"></i></div>
    </div>
    <i class="vf-br a" aria-hidden="true"></i><i class="vf-br b" aria-hidden="true"></i><i class="vf-br c" aria-hidden="true"></i><i class="vf-br d" aria-hidden="true"></i>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר מצב הסיום: צילום אחרון ומספרים סופיים (במארקאפ)
  const root=document.querySelector(".vf"),run=root.querySelector(".vf-run"),imgs=[...root.querySelectorAll(".vf-img")],brs=[...root.querySelectorAll(".vf-br")],
    ttl=root.querySelector(".vf-ttl b"),wk=root.querySelector(".vf-wk"),pct=root.querySelector(".vf-pct"),days=root.querySelector(".vf-days"),
    bud=root.querySelector(".vf-bud"),wrk=root.querySelector(".vf-wrk"),fill=root.querySelector(".vf-fill"),mk=root.querySelector(".vf-mk"),rule=root.querySelector(".vf-rule");
  const SC=[["הכניסה",2],["הסלון",5],["המטבח",6],["פינת הקריאה",4]];     // שם החדר ומספר בעלי המקצוע שעבדו בו
  const FIN={ttl:ttl.textContent,wk:wk.textContent,pct:pct.textContent,days:days.textContent,bud:bud.textContent,wrk:wrk.textContent};
  const sx=parseFloat(getComputedStyle(root).getPropertyValue("--sx"))||-1;
  // בהפחתת תנועה הפונקציה לא רצה, ומצב הסיום נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    let W=0,k=-1;const last={};
    const meas=()=>{W=rule.offsetWidth;};
    const put=(el,key,v)=>{if(last[key]!==v){last[key]=v;el.textContent=v;}};
    // כל מה שעל המסך נגזר מ-p בלבד, לכן אותו קוד נכון בגלילה קדימה ואחורה
    const paint=p=>{
      const f=p*(imgs.length-1);
      imgs.forEach((im,i)=>{
        const o=i===0?1:Math.min(1,Math.max(0,f-(i-1)));      // צילום חדש נכנס מעל הקודם
        im.style.opacity=o;im.style.transform="scale("+(i?1.06-.06*o:1)+")";
      });
      const s=Math.round(f);
      if(s!==k){
        k=s;ttl.textContent=SC[s][0];put(wrk,"wrk",SC[s][1]);
        gsap.fromTo(ttl,{yPercent:50,opacity:0},{yPercent:0,opacity:1,duration:.35,ease:"power2.out",overwrite:true});
        gsap.fromTo(brs,{scale:1.25},{scale:1,duration:.45,ease:"power2.out",overwrite:true});
      }
      put(wk,"wk",1+Math.round(p*11));put(pct,"pct",Math.round(p*100));put(days,"days",Math.round(p*58));put(bud,"bud",Math.round(p*96)+"%");
      gsap.set(fill,{scaleX:p});gsap.set(mk,{x:-sx*(1-p)*W});
    };
    ScrollTrigger.addEventListener("refresh",meas);meas();paint(0);
    const o={p:0};
    gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4}});
    return()=>{
      ScrollTrigger.removeEventListener("refresh",meas);root.classList.remove("is-live");
      imgs.forEach(im=>{im.style.removeProperty("opacity");im.style.removeProperty("transform");});
      gsap.set([fill,mk,ttl,brs],{clearProps:"all"});
      ttl.textContent=FIN.ttl;wk.textContent=FIN.wk;pct.textContent=FIN.pct;days.textContent=FIN.days;bud.textContent=FIN.bud;wrk.textContent=FIN.wrk;
    };
  });
})();`
},
{
  id:"g238", cat:"gsap", name:"כיתוב בצורת גלולה שמתחלף ומשנה רוחב בכל צעד", tech:"GSAP · ScrollTrigger · sticky · clip-path", status:"מאושר-עין",
  desc:"תמונה גדולה שנחשפת מלמטה למעלה בכל צעד של תהליך, ובתחתית שלה גלולת כיתוב אחת. כשהצעד מתחלף, הטקסט הישן עולה החוצה והחדש נכנס מלמטה, והגלולה מתרחבת או מצטמצמת בדיוק לרוחב המשפט החדש. שורת נקודות בתוכה מראה באיזה צעד אנחנו. הגולש קורא את התהליך כמו כתוביות, בלי להסיט את העיניים מהתמונה.",
  when:"תהליך של שלושה עד חמישה צעדים שכל אחד מהם יש לו תמונה: ביקור במרפאה, יום עבודה בסטודיו, הרכבה, מסירה, מסע של לקוח. מתאים כשהמשפט הקצר חשוב יותר מפסקה והתמונה היא העיקר. לא לתהליך שדורש הסבר מפורט בכל צעד, ולא לפני שיש תמונה אמיתית לכל צעד.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם כיתוב קטן בצורת גלולה בתחתית המסך מתחלף עם כל סצנה ומשנה רוחב. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום ומכיל את כל הצעדים:** רשימה `<ol>` של ארבע תמונות, ולכל אחת גלולת כיתוב משלה, כך שבלי GSAP ובהפחתת תנועה רואים את כל התהליך כרצף של כרטיסים. **כשהמהלך רץ** הרשימה נערמת למסגרת אחת נעוצה (`sticky` בתוך אזור גלילה של 280vh), הגלולות של הכרטיסים הופכות ל-`sr-only` כדי שקורא מסך עדיין ימצא את כל הצעדים, וגלולה אחת חיה (`aria-hidden`) מתחילה לעבוד. **החשיפה** של כל תמונה היא `clip-path` שנגזר מ-`p` בפונקציה אחת, ולכן היא נכונה גם בגלילה לאחור. **ההחלפה** היא אירוע ולא רצף: כשהצעד הקרוב ביותר משתנה, שני `span` מתחלפים (הנכנס מלמטה בגלילה קדימה ומלמעלה בגלילה אחורה) ורוחב החלון שלהם עובר אל רוחב המשפט החדש. הרוחבים נמדדים מ-`.cpl-m` הנסתר באותו פונט, ונמדדים מחדש בכל `refresh`. הטקסטים נקראים מהרשימה, ולכן משנים אותם רק במארקאפ. **הנקודות:** הפעילה מתארכת ל-24 והאחרות חוזרות ל-8. **RTL:** הכל לוגי (`inset-inline`, `text-align` ברירת מחדל), ולכן ב-LTR אין מה להפוך, והעמודות מתחלפות לבד. **בנייד** הכותרת מצטמצמת והמסגרת גבוהה יותר. שתי תמונות לפחות נדרשות, ושלוש עד ארבע הן הטווח הנוח.",
  libs:["gsap","ScrollTrigger"],
  css:`.cpl{max-width:1120px;margin-inline:auto}
.cpl-pin{display:grid;gap:32px}
.cpl-head{display:grid;gap:12px;max-width:44ch}
.cpl-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);line-height:1.12;text-wrap:balance}
.cpl-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.cpl-frame{position:relative}
.cpl-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.cpl-step{position:relative;overflow:hidden;aspect-ratio:1/1;border-radius:20px;background:var(--card)}
.cpl-step img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cpl-cap{position:absolute;inset-inline:12px;bottom:12px;display:block;padding:10px 16px;border-radius:24px;background:var(--ink);color:var(--bg);font-size:15px;font-weight:600;line-height:1.35;text-align:center;text-wrap:balance}
/* מצב חי: הרשימה נערמת למסגרת אחת, והגלולה החיה לוקחת את מקום הכיתובים */
.cpl-live{display:none}
.cpl.is-live .cpl-run{height:280vh}
.cpl.is-live .cpl-pin{position:sticky;top:0;height:100vh;height:100svh;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,6vw,88px)}
.cpl.is-live .cpl-frame{position:relative;overflow:hidden;isolation:isolate;aspect-ratio:5/4;max-height:72svh;width:100%;border-radius:24px;background:var(--card);box-shadow:0 32px 64px -36px color-mix(in srgb,var(--ink) 55%,transparent)}
.cpl.is-live .cpl-steps{display:block;position:absolute;inset:0}
.cpl.is-live .cpl-step{position:absolute;inset:0;aspect-ratio:auto;border-radius:0}
.cpl.is-live .cpl-step img{will-change:transform}
.cpl.is-live .cpl-cap{position:absolute;inset:auto;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;backdrop-filter:none}
.cpl.is-live .cpl-live{position:absolute;inset-inline:0;bottom:24px;z-index:2;margin-inline:auto;display:flex;align-items:center;gap:14px;width:max-content;max-width:calc(100% - 32px);padding:12px 20px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:17px;font-weight:600;line-height:1.4}
.cpl-dots{display:flex;align-items:center;gap:6px}
.cpl-dot{display:block;width:8px;height:8px;border-radius:4px;background:color-mix(in srgb,var(--bg) 38%,transparent);transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.cpl-dot.on{background:var(--bg)}
.cpl-win{position:relative;display:block;height:1.4em;overflow:hidden;white-space:nowrap}
.cpl-t{position:absolute;inset-inline-start:0;top:0;white-space:nowrap}
.cpl-m{position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none}
@media(max-width:767px){
  .cpl-pin{gap:24px}
  .cpl-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .cpl-step{border-radius:16px}
  .cpl-cap{inset-inline:8px;bottom:8px;padding:8px 12px;font-size:14px}
  .cpl.is-live .cpl-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:24px}
  .cpl.is-live .cpl-head p{display:none}
  .cpl.is-live .cpl-frame{aspect-ratio:auto;height:clamp(380px,62svh,560px);max-height:none;border-radius:20px}
  .cpl.is-live .cpl-live{bottom:16px;padding:10px 16px;font-size:15px;gap:12px}
}`,
  html:`<div class="stage"><div class="cpl"><div class="cpl-run"><div class="cpl-pin">
  <div class="cpl-head"><h2>ככה נראה ביקור אצלנו, מהתור ועד הבית</h2><p>ארבעה צעדים, ובכל אחד מהם אתם יודעים מה קורה עכשיו ומה יהיה אחריו.</p></div>
  <div class="cpl-frame">
    <ol class="cpl-steps">
      <li class="cpl-step"><img src="../assets/media/real/s09/step-1-booking.webp" alt="אמא וילד על הספה בבית מביטים בטלפון" width="1500" height="1200" loading="lazy" decoding="async"><span class="cpl-cap">קובעים תור מהספה בבית</span></li>
      <li class="cpl-step"><img src="../assets/media/real/s09/step-2-welcome.webp" alt="רופאה מחייכת אל ילדה בחלוק רפואי" width="1500" height="1200" loading="lazy" decoding="async"><span class="cpl-cap">הרופאה מכירה את הילד בחיוך</span></li>
      <li class="cpl-step"><img src="../assets/media/real/s09/step-3-exam.webp" alt="רופא בודק ילדה בנוכחות אמה" width="1500" height="1200" loading="lazy" decoding="async"><span class="cpl-cap">בדיקה רגועה, בלי לחץ</span></li>
      <li class="cpl-step"><img src="../assets/media/real/s09/step-4-home.webp" alt="אמא מחזיקה תינוק בבית" width="1500" height="1200" loading="lazy" decoding="async"><span class="cpl-cap">חוזרים הביתה עם סיכום</span></li>
    </ol>
    <div class="cpl-live" aria-hidden="true">
      <span class="cpl-dots"><i class="cpl-dot"></i><i class="cpl-dot"></i><i class="cpl-dot"></i><i class="cpl-dot on"></i></span>
      <span class="cpl-win"><span class="cpl-t">חוזרים הביתה עם סיכום</span><span class="cpl-t"></span></span>
      <span class="cpl-m"></span>
    </div>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת רשימת ארבעת הכרטיסים עם הכיתובים שלהם (במארקאפ)
  const root=document.querySelector(".cpl"),run=root.querySelector(".cpl-run"),steps=[...root.querySelectorAll(".cpl-step")],
    imgs=steps.map(s=>s.querySelector("img")),caps=steps.map(s=>s.querySelector(".cpl-cap").textContent.trim()),
    pill=root.querySelector(".cpl-live"),win=pill.querySelector(".cpl-win"),tx=[...pill.querySelectorAll(".cpl-t")],
    dots=[...pill.querySelectorAll(".cpl-dot")],ms=pill.querySelector(".cpl-m");
  const n=steps.length,clamp=v=>Math.min(1,Math.max(0,v));
  // בהפחתת תנועה הפונקציה לא רצה, והכרטיסים נשארים במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    let W=[],k=-1,flip=0;
    const meas=()=>{                          // רוחב כל משפט, באותו פונט של הגלולה
      W=caps.map(c=>{ms.textContent=c;return Math.ceil(ms.getBoundingClientRect().width)+2;});
      if(k>=0)gsap.set(win,{width:W[k]});
    };
    const dotsTo=i=>dots.forEach((d,j)=>{d.classList.toggle("on",j===i);gsap.to(d,{width:j===i?24:8,duration:.4,ease:"power3.out",overwrite:true});});
    const swap=(i,dir)=>{
      const inn=tx[flip],out=tx[1-flip];flip=1-flip;
      inn.textContent=caps[i];
      gsap.killTweensOf([inn,out,win]);
      gsap.fromTo(inn,{yPercent:100*dir,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.45,ease:"power3.out"});
      gsap.to(out,{yPercent:-100*dir,autoAlpha:0,duration:.35,ease:"power2.in"});
      gsap.to(win,{width:W[i],duration:.5,ease:"power3.out"});
      dotsTo(i);
    };
    // החשיפה נגזרת מ-p בלבד, ההחלפה מופעלת רק כשהצעד הקרוב ביותר משתנה
    const paint=p=>{
      const f=p*(n-1);
      steps.forEach((s,i)=>{
        const o=i===0?1:clamp(f-(i-1));
        s.style.clipPath="inset("+((1-o)*100)+"% 0 0 0)";
        imgs[i].style.transform="scale("+(1.12-.12*o)+")";
      });
      const s=Math.round(f);
      if(s!==k){const dir=s>k?1:-1,first=k<0;k=s;if(first){tx[0].textContent=caps[s];tx[1].textContent="";gsap.set(tx[0],{yPercent:0,autoAlpha:1});gsap.set(tx[1],{autoAlpha:0});gsap.set(win,{width:W[s]});flip=0;dotsTo(s);}else swap(s,dir);}
    };
    ScrollTrigger.addEventListener("refresh",meas);
    meas();paint(0);
    const st=ScrollTrigger.create({trigger:run,start:"top top",end:"bottom bottom",invalidateOnRefresh:true,onUpdate:s=>paint(s.progress)});
    return()=>{
      st.kill();ScrollTrigger.removeEventListener("refresh",meas);root.classList.remove("is-live");
      steps.forEach((s,i)=>{s.style.removeProperty("clip-path");imgs[i].style.removeProperty("transform");});
      gsap.killTweensOf([win,...tx,...dots]);gsap.set([win,...tx,...dots],{clearProps:"all"});
      tx[0].textContent=caps[n-1];tx[1].textContent="";dots.forEach((d,j)=>d.classList.toggle("on",j===n-1));
    };
  });
})();`
},
{
  id:"g239", cat:"gsap", name:"שלושה מכשירים יוצאים מאחורי המכשיר המרכזי אל המסגרת", tech:"GSAP · ScrollTrigger scrub · sticky · mockup", status:"מאושר-עין",
  desc:"בתחילת הגלילה רואים טלפון אחד במרכז. כשגוללים, שני טלפונים נוספים מחליקים החוצה מאחוריו לשני הצדדים, גדלים מעט ונעמדים לידו, והכיתוב שמתחת לכל אחד מהם נכנס אחריו. כל טלפון מראה מסך אחר של אותו מוצר. הגולש מבין בגלילה אחת שזו מערכת שלמה ולא מסך בודד.",
  when:"מוצר או שירות שיש לו שלושה צדדים שכדאי להראות יחד: אפליקציה של עסק מקומי (הזמנה, מעקב, מועדון), פורטל לקוחות, מערכת תורים. מתאים לסקשן ״מה מקבלים״ בעמוד נחיתה או בעמוד מוצר, פעם אחת בעמוד. לא למוצר שיש בו מסך אחד בלבד, ולא כשאין מסכי דוגמה אמיתיים להציג.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם מכשירי דוגמה נכנסים אל המסגרת אחד אחרי השני. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** שלושה טלפונים זה לצד זה, והכיתובים מתחתם ברשימה אחת. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור גלילה של 260vh), ו-`p` מ-0 עד 1 מזין פונקציה אחת `paint(p)`: בין 12% ל-72% הטלפונים הצדדיים עוברים מהמרכז אל מקומם (`x` מ-`dx` ל-0), גדלים מ-84% ל-100% ומתבהרים, והטלפון המרכזי מתכווץ קצת מ-106% ל-100%. **ההיסט `dx`** נמדד ב-`offsetLeft` של כל מכשיר ביחס לשורה (לא מושפע מ-transform) ונמדד מחדש בכל `refresh`, ולכן אותו קוד נכון בכל רוחב ובכל כיוון. **הכיתובים** של הצדדיים מתבהרים אחרי שהטלפון כבר ממוקם, והאמצעי מוצג מההתחלה. **RTL:** הכל סימטרי סביב המרכז, אין מה להפוך ב-LTR. **בנייד** הטלפונים חופפים כמו מניפה והכיתובים הופכים לרשימה אחת. **המסכים** בנויים ב-`container-type:inline-size` וכל מידה בהם ב-`cqw`, לכן הם מתכווצים עם הטלפון בלי לשבור. כל השורה `aria-hidden` (מסכי דוגמה), והכיתובים ברשימה הם התוכן שקורא מסך שומע. **תמונות:** מהמאגר.",
  libs:["gsap","ScrollTrigger"],
  css:`.dvm{--pw:min(21vw,31svh);--gp:clamp(24px,4vw,56px);max-width:1120px;margin-inline:auto}
.dvm-pin{display:grid;align-content:center;justify-items:center;gap:32px;text-align:center}
.dvm-head{display:grid;gap:12px;max-width:50ch}
.dvm-head h2{margin:0;font-size:clamp(26px,2.6vw,38px);line-height:1.12;text-wrap:balance}
.dvm-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6;text-wrap:balance}
.dvm-row{position:relative;display:flex;justify-content:center;align-items:flex-start;gap:var(--gp)}
.dvm-dev{position:relative;flex:none}
.dvm-mid{z-index:3}
.dvm-side{z-index:1;margin-top:32px}
.dvm-ph{box-sizing:border-box;width:var(--pw);aspect-ratio:9/19;padding:calc(var(--pw) * .03);border-radius:calc(var(--pw) * .16);background:var(--ink);box-shadow:0 36px 64px -32px color-mix(in srgb,var(--ink) 60%,transparent);container-type:inline-size}
.dvm-scr{position:relative;display:flex;flex-direction:column;gap:3.4cqw;height:100%;box-sizing:border-box;padding:5cqw 5cqw 6cqw;border-radius:13cqw;overflow:hidden;background:var(--bg);color:var(--ink);text-align:start;font-size:6.2cqw;line-height:1.35}
.dvm-notch{align-self:center;flex:none;width:26cqw;height:4.6cqw;border-radius:3cqw;background:var(--ink)}
.dvm-bar{display:flex;align-items:center;justify-content:space-between;gap:3cqw;font-size:7.6cqw;font-weight:700}
.dvm-av{flex:none;width:8cqw;height:8cqw;border-radius:50%;background:var(--accent)}
.dvm-chip{align-self:flex-start;padding:1.6cqw 4cqw;border-radius:6cqw;background:color-mix(in srgb,var(--accent) 14%,var(--bg));box-shadow:inset 0 0 0 .4cqw var(--accent);font-size:5.6cqw;font-weight:600}
.dvm-tl{list-style:none;margin:0;padding:0;display:grid;gap:3cqw}
.dvm-tl li{display:flex;align-items:center;gap:3cqw;color:var(--muted);font-weight:500}
.dvm-tl li::before{content:"";flex:none;width:4.4cqw;height:4.4cqw;border-radius:50%;box-shadow:inset 0 0 0 .5cqw var(--line)}
.dvm-tl .done{color:var(--ink)}
.dvm-tl .done::before{background:var(--accent);box-shadow:none}
.dvm-tl .now{color:var(--ink);font-weight:700}
.dvm-tl .now::before{box-shadow:inset 0 0 0 1cqw var(--accent)}
.dvm-img{flex:1;min-height:0;width:100%;border-radius:7cqw;object-fit:cover}
.dvm-img.is-top{flex:none;aspect-ratio:5/4;height:auto}
.dvm-ttl{display:flex;justify-content:space-between;align-items:baseline;gap:3cqw;font-size:7.2cqw;font-weight:700}
.dvm-ttl span{font-weight:600;color:var(--muted);font-size:6cqw}
.dvm-tabs{display:flex;gap:2cqw}
.dvm-tabs span{padding:1.4cqw 3.4cqw;border-radius:5cqw;background:var(--card);box-shadow:inset 0 0 0 .3cqw var(--line);font-size:5.4cqw;font-weight:600}
.dvm-tabs .on{background:var(--ink);color:var(--bg);box-shadow:none}
.dvm-stamps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2.4cqw}
.dvm-stamps i{aspect-ratio:1;border-radius:50%;box-shadow:inset 0 0 0 .5cqw var(--line)}
.dvm-stamps .f{background:var(--accent);box-shadow:none}
.dvm-note{margin:0;color:var(--muted);font-size:5.8cqw}
.dvm-cta{margin-top:auto;padding:3cqw;border-radius:6cqw;background:var(--accent);color:var(--accent-ink);font-size:6.2cqw;font-weight:700;text-align:center}
.dvm-caps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,var(--pw));justify-content:center;gap:var(--gp);font-size:var(--fs-body);font-weight:600;line-height:1.4}
.dvm-caps li{text-wrap:balance}
.dvm.is-live .dvm-run{height:260vh}
.dvm.is-live .dvm-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .dvm{--pw:min(50vw,28svh)}
  .dvm-pin{gap:24px}
  .dvm-row{gap:0}
  .dvm-dev+.dvm-dev{margin-inline-start:calc(var(--pw) * -.62)}
  .dvm-caps{grid-template-columns:minmax(0,1fr);gap:4px;font-size:15px}
}`,
  html:`<div class="stage"><div class="dvm"><div class="dvm-run"><div class="dvm-pin">
  <div class="dvm-head"><h2>האפליקציה של המאפייה: מזמינים, עוקבים ואוספים</h2><p>הלקוח מזמין מהבית, רואה מתי הלחם יוצא מהתנור, ומקבל קפה חינם אחרי עשר ביקורים.</p></div>
  <div class="dvm-row" aria-hidden="true">
    <div class="dvm-dev dvm-side"><div class="dvm-ph"><div class="dvm-scr">
      <i class="dvm-notch"></i>
      <div class="dvm-bar"><b>מאפיית שחר</b><span class="dvm-av"></span></div>
      <div class="dvm-tabs"><span class="on">מאפים</span><span>לחמים</span><span>קפה</span></div>
      <img class="dvm-img is-top" src="../assets/media/real/s14/croissants.webp" alt="" width="1250" height="1000" loading="lazy" decoding="async">
      <div class="dvm-ttl">קרואסון חמאה<span>14 ₪</span></div>
      <p class="dvm-note">יוצא מהתנור כל בוקר בשש</p>
      <span class="dvm-cta">הוספה להזמנה</span>
    </div></div></div>
    <div class="dvm-dev dvm-mid"><div class="dvm-ph"><div class="dvm-scr">
      <i class="dvm-notch"></i>
      <div class="dvm-bar"><b>ההזמנה שלך</b><span class="dvm-av"></span></div>
      <span class="dvm-chip">יוצאת מהתנור בעוד 8 דקות</span>
      <ul class="dvm-tl"><li class="done">ההזמנה התקבלה</li><li class="now">בתנור עכשיו</li><li>מוכנה לאיסוף</li></ul>
      <img class="dvm-img" src="../assets/media/real/s14/baker-hands.webp" alt="" width="1100" height="1320" loading="lazy" decoding="async">
    </div></div></div>
    <div class="dvm-dev dvm-side"><div class="dvm-ph"><div class="dvm-scr">
      <i class="dvm-notch"></i>
      <div class="dvm-bar"><b>המועדון</b><span class="dvm-av"></span></div>
      <img class="dvm-img is-top" src="../assets/media/real/s14/cafe-window.webp" alt="" width="1400" height="1050" loading="lazy" decoding="async">
      <div class="dvm-ttl">כרטיס הקפה שלך<span>7 מתוך 10</span></div>
      <div class="dvm-stamps"><i class="f"></i><i class="f"></i><i class="f"></i><i class="f"></i><i class="f"></i><i class="f"></i><i class="f"></i><i></i><i></i><i></i></div>
      <p class="dvm-note">עוד שלושה קפה והבא עלינו</p>
      <span class="dvm-cta">לצפייה בהטבות</span>
    </div></div></div>
  </div>
  <ul class="dvm-caps"><li>מזמינים מהבית בשתי לחיצות</li><li>רואים מתי הלחם יוצא מהתנור</li><li>צוברים קפה חינם בכל ביקור</li></ul>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארים שלושה טלפונים זה לצד זה עם הכיתובים (במארקאפ)
  const root=document.querySelector(".dvm"),run=root.querySelector(".dvm-run"),mid=root.querySelector(".dvm-mid"),
    sides=[...root.querySelectorAll(".dvm-side")],caps=[...root.querySelectorAll(".dvm-caps li")];
  const ease=gsap.parseEase("power3.inOut"),clamp=v=>Math.min(1,Math.max(0,v));
  // בהפחתת תנועה הפונקציה לא רצה, והשורה נשארת במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    let dx=[],last=0;
    // כל מה שעל המסך נגזר מ-p בלבד, לכן אותו קוד נכון בגלילה קדימה ואחורה
    const paint=p=>{
      last=p;
      const a=clamp((p-.12)/.6),e=ease(a),c=clamp((a-.55)/.45);
      sides.forEach((s,i)=>gsap.set(s,{x:(dx[i]||0)*(1-e),scale:.84+.16*e,autoAlpha:Math.min(1,a*3)}));
      gsap.set(mid,{scale:1.06-.06*e});
      caps.forEach((el,i)=>{if(i!==1)gsap.set(el,{autoAlpha:c});});     // הכיתוב האמצעי מוצג מההתחלה
    };
    // המרחק מכל טלפון צדדי למרכז, נמדד ב-offsetLeft ולכן לא מושפע מה-transform
    const meas=()=>{const m=mid.offsetLeft+mid.offsetWidth/2;dx=sides.map(s=>m-(s.offsetLeft+s.offsetWidth/2));paint(last);};
    ScrollTrigger.addEventListener("refresh",meas);
    meas();
    const o={p:0};
    gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    return()=>{
      ScrollTrigger.removeEventListener("refresh",meas);root.classList.remove("is-live");
      gsap.set([mid,...sides,...caps],{clearProps:"all"});
    };
  });
})();`
},
{
  id:"b94", cat:"behavior", name:"כרטיס מוצר שעובר בין טעינה, מצב ריק ומצב מלא", tech:"Tabs · CSS transitions · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"כרטיס של פורטל לקוחות עם רשימת מסמכים, ולידו שלוש לשוניות: בטעינה, ריק, מלא. בכניסה לעמוד הכרטיס עובר לבד פעם אחת: שורות אפורות עם ברק שעובר עליהן, אחר כך מסך ריק עם הסבר, ואז רשימה שנכנסת שורה אחרי שורה. אחרי זה הגולש בוחר לבד איזה מצב לראות. הוא מבין שהמערכת חשבה גם על הרגע שבו אין עדיין כלום.",
  when:"שירות שיש לו ממשק ללקוח: פורטל, אפליקציה, מערכת הזמנות, לוח מעקב. מתאים לסקשן ״מה הלקוח רואה״ כשהאמון תלוי בכך שגם המצבים הלא יפים מטופלים. שלוש לשוניות, פעם אחת בעמוד. לא למוצר שאין לו ממשק, ולא כשיש רק מצב אחד אמיתי להראות.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם אותו מסך עובר בין שלד טעינה, מצב ריק ומצב מלא. נבנה מאפס מהצפייה. **זה מהלך עם בקרה אמיתית:** שלוש לשוניות `button` בתוך `role=\"tablist\"`, `aria-selected` ו-`tabindex` מתגלגל, חיצים ו-Home/End (החצים ימינה ושמאלה מתהפכים לפי `direction` של העמוד), ו-`:focus-visible` ברור. אזור המגע הוא 44px לפחות. **המארקאפ הוא מצב הסיום:** הרשימה המלאה בלבד, והלשוניות מוסתרות עד שה-JS עולה, כדי שלא יוצגו כפתורים שלא עושים כלום. **כשה-JS חי** שלושת הלוחות נערמים באותו תא של grid (לכן הגובה הוא של הגבוה ביותר, בלי קפיצה בין מצבים), והלוח הפעיל מקבל `.on`. הלוחות הלא פעילים הם `inert`, כך שקורא מסך ו-Tab מדלגים עליהם. המעבר הוא `opacity` ו-`transform` בלבד, ושורות הרשימה נכנסות עם `transition-delay` לפי `--i`. **הברק** של השלד הוא `translateX` על אלמנט מדומה, ולא תנועה של מאפיין פריסה; הוא רץ מימין לשמאל (ב-LTR הכיוון מתהפך לבד דרך `:dir(ltr)`). **ההפעלה האוטומטית** רצה פעם אחת בלבד, כשהכרטיס נכנס לחצי מהמסך (שלד, מצב ריק, מלא) ונעצרת מיד אם הגולש נגע בלשונית, כדי לא להזיז תוכן מתחת לידיים שלו. בהפחתת תנועה אין הפעלה אוטומטית, אין מעברים ואין ברק, והכרטיס נפתח על המצב המלא. הכפתור במצב הריק הוא `span` לא אינטראקטיבי (מסך דוגמה).",
  libs:[],
  css:`.ust{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,6vw,88px);max-width:1100px;margin-inline:auto}
.ust-side{display:grid;gap:24px;justify-items:start}
.ust-side h2{margin:0;font-size:clamp(28px,3.2vw,44px);line-height:1.12;text-wrap:balance}
.ust-side p{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ust-tabs{display:none;gap:4px;padding:4px;border-radius:999px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.ust.is-live .ust-tabs{display:inline-flex}
.ust-tab{min-height:44px;padding:0 20px;border:0;border-radius:999px;background:transparent;color:var(--muted);font:inherit;font-weight:600;cursor:pointer;transition:background-color .3s cubic-bezier(.2,.6,.2,1),color .3s linear}
.ust-tab[aria-selected="true"]{background:var(--ink);color:var(--bg)}
.ust-tab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media(hover:hover){.ust-tab[aria-selected="false"]:hover{color:var(--ink)}}
.ust-card{display:grid;gap:20px;padding:24px;border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -36px color-mix(in srgb,var(--ink) 40%,transparent)}
.ust-top{display:flex;align-items:center;justify-content:space-between;gap:16px}
.ust-name{font-size:18px;font-weight:700}
.ust-cnt{display:grid;font-size:14px;color:var(--muted);font-variant-numeric:tabular-nums}
.ust-cnt span{grid-area:1/1;justify-self:end;display:none;white-space:nowrap}
.ust-cnt .on{display:block}
.ust-body{display:grid}
.ust-pane{grid-area:1/1;display:grid;align-content:start}
.ust-sk,.ust-em{display:none}
.ust-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;min-height:64px;padding:12px 0;border-top:1px solid var(--line)}
.ust-row:first-child{border-top:0}
.ust-ic{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:color-mix(in srgb,var(--accent) 12%,var(--card))}
.ust-ic svg{width:20px;height:20px;fill:none;stroke:var(--accent);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.ust-tx{display:grid;gap:2px;min-width:0}
.ust-tx b{font-size:16px;font-weight:600;line-height:1.35}
.ust-tx span{font-size:14px;color:var(--muted)}
.ust-st{padding:4px 12px;border-radius:999px;background:color-mix(in srgb,var(--accent) 14%,var(--card));color:var(--ink);font-size:13px;font-weight:600;white-space:nowrap}
.ust-st.w{background:transparent;box-shadow:inset 0 0 0 1px var(--line);color:var(--muted)}
/* שלד הטעינה: אותה שורה בדיוק, כדי שהמעבר לא יזיז כלום */
.ust-b{position:relative;display:block;overflow:hidden;border-radius:8px;background:var(--line)}
.ust-b::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--bg) 65%,transparent),transparent);transform:translateX(100%);animation:ust-sh 1.5s linear infinite}
.ust:dir(ltr) .ust-b::after{animation-direction:reverse}
@keyframes ust-sh{to{transform:translateX(-100%)}}
.ust-b.i{width:40px;height:40px;border-radius:12px}
.ust-b.l1{width:62%;height:14px}
.ust-b.l2{width:38%;height:12px;margin-top:8px}
.ust-b.c{width:72px;height:26px;border-radius:999px}
.ust-tx .ust-b{background:var(--line)}
.ust-em{place-items:center;align-content:center;gap:12px;padding:24px 0;text-align:center}
.ust-em svg{width:96px;height:96px;fill:none;stroke:var(--muted);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.ust-em svg .a{stroke:var(--accent)}
.ust-em h3{margin:0;font-size:18px;font-weight:700}
.ust-em p{margin:0;max-width:32ch;font-size:15px;line-height:1.55;color:var(--muted)}
.ust-cta{margin-top:8px;padding:12px 24px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:15px;font-weight:700}
/* מצב חי: שלושת הלוחות באותו תא, והפעיל מוצג */
.ust.is-live .ust-sk,.ust.is-live .ust-em{display:grid}
.ust.is-live .ust-cnt span{display:block;opacity:0;transition:opacity .3s linear}
.ust.is-live .ust-cnt .on{opacity:1}
.ust.is-live .ust-pane{opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .35s cubic-bezier(.2,.6,.2,1),transform .35s cubic-bezier(.2,.6,.2,1),visibility 0s linear .35s}
.ust.is-live .ust-pane.on{opacity:1;visibility:visible;transform:none;transition-delay:0s}
.ust.is-live .ust-fl .ust-row{opacity:0;transform:translateY(10px);transition:opacity .4s cubic-bezier(.2,.6,.2,1),transform .4s cubic-bezier(.2,.6,.2,1)}
.ust.is-live .ust-fl.on .ust-row{opacity:1;transform:none;transition-delay:calc(var(--i) * 70ms + 120ms)}
@media(prefers-reduced-motion:reduce){.ust *,.ust *::after{transition:none!important;animation:none!important}}
@media(max-width:767px){
  .ust{grid-template-columns:minmax(0,1fr);gap:32px}
  .ust-tabs{display:none;width:100%}
  .ust.is-live .ust-tabs{display:flex}
  .ust-tab{flex:1;padding:0 12px}
  .ust-card{padding:20px}
  .ust-row{gap:12px}
}`,
  html:`<div class="stage"><section class="ust">
  <div class="ust-side">
    <h2>גם כשאין עדיין כלום, הלקוח רואה מסך ברור</h2>
    <p>הפורטל מראה מה קורה בזמן טעינה, מה כתוב כשעוד לא הועלה אף מסמך, ואיך נראית הרשימה כשהיא מלאה.</p>
    <div class="ust-tabs" role="tablist" aria-label="מצב המסך">
      <button class="ust-tab" role="tab" type="button" id="ust-t0" aria-controls="ust-p0" aria-selected="false" tabindex="-1">בטעינה</button>
      <button class="ust-tab" role="tab" type="button" id="ust-t1" aria-controls="ust-p1" aria-selected="false" tabindex="-1">ריק</button>
      <button class="ust-tab" role="tab" type="button" id="ust-t2" aria-controls="ust-p2" aria-selected="true" tabindex="0">מלא</button>
    </div>
  </div>
  <div class="ust-card">
    <div class="ust-top"><span class="ust-name">המסמכים שלי</span>
      <span class="ust-cnt"><span>בטעינה</span><span>אין מסמכים</span><span class="on">4 מסמכים</span></span></div>
    <div class="ust-body">
      <div class="ust-pane ust-sk" id="ust-p0" role="tabpanel" aria-labelledby="ust-t0" tabindex="0" aria-busy="true">
        <div class="ust-row"><i class="ust-b i"></i><div class="ust-tx"><i class="ust-b l1"></i><i class="ust-b l2"></i></div><i class="ust-b c"></i></div>
        <div class="ust-row"><i class="ust-b i"></i><div class="ust-tx"><i class="ust-b l1"></i><i class="ust-b l2"></i></div><i class="ust-b c"></i></div>
        <div class="ust-row"><i class="ust-b i"></i><div class="ust-tx"><i class="ust-b l1"></i><i class="ust-b l2"></i></div><i class="ust-b c"></i></div>
        <div class="ust-row"><i class="ust-b i"></i><div class="ust-tx"><i class="ust-b l1"></i><i class="ust-b l2"></i></div><i class="ust-b c"></i></div>
      </div>
      <div class="ust-pane ust-em" id="ust-p1" role="tabpanel" aria-labelledby="ust-t1" tabindex="0">
        <svg viewBox="0 0 96 96" aria-hidden="true"><path d="M14 30h24l8 10h36v38a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"/><path class="a" d="M48 52v18M40 60l8-8 8 8"/></svg>
        <h3>עוד לא הועלו מסמכים</h3>
        <p>כשתעלו את המסמך הראשון הוא יופיע כאן, ואנחנו נעדכן אתכם ברגע שעברנו עליו.</p>
        <span class="ust-cta" aria-hidden="true">העלאת מסמך</span>
      </div>
      <div class="ust-pane ust-fl on" id="ust-p2" role="tabpanel" aria-labelledby="ust-t2" tabindex="0">
        <div class="ust-row" style="--i:0"><span class="ust-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></span><div class="ust-tx"><b>דוח רווח והפסד, ספטמבר</b><span>הועלה אתמול</span></div><span class="ust-st">אושר</span></div>
        <div class="ust-row" style="--i:1"><span class="ust-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></span><div class="ust-tx"><b>אישור ניהול ספרים 2026</b><span>הועלה לפני שלושה ימים</span></div><span class="ust-st">אושר</span></div>
        <div class="ust-row" style="--i:2"><span class="ust-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></span><div class="ust-tx"><b>חשבונית מס 4471</b><span>הועלה לפני שבוע</span></div><span class="ust-st w">ממתין לחתימה</span></div>
        <div class="ust-row" style="--i:3"><span class="ust-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg></span><div class="ust-tx"><b>הסכם שכירות למשרד</b><span>הועלה לפני שבועיים</span></div><span class="ust-st">אושר</span></div>
      </div>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".ust"),tabs=[...root.querySelectorAll(".ust-tab")],panes=[...root.querySelectorAll(".ust-pane")],
    cnt=[...root.querySelectorAll(".ust-cnt span")],sk=root.querySelector(".ust-sk");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rtl=getComputedStyle(root).direction==="rtl"?-1:1;       // החצים ימינה ושמאלה מתהפכים עם כיוון העמוד
  let touched=false,t1=0,t2=0;
  const show=i=>{
    tabs.forEach((t,j)=>{t.setAttribute("aria-selected",j===i?"true":"false");t.tabIndex=j===i?0:-1;});
    panes.forEach((p,j)=>{p.classList.toggle("on",j===i);p.inert=j!==i;});
    cnt.forEach((c,j)=>c.classList.toggle("on",j===i));
    sk.setAttribute("aria-busy",i===0?"true":"false");
  };
  const stop=()=>{touched=true;clearTimeout(t1);clearTimeout(t2);};
  root.classList.add("is-live");
  tabs.forEach((t,i)=>{
    t.addEventListener("click",()=>{stop();show(i);});
    t.addEventListener("keydown",e=>{
      const k=e.key;let j=-1;
      if(k==="ArrowRight")j=i+rtl;else if(k==="ArrowLeft")j=i-rtl;else if(k==="ArrowDown")j=i+1;else if(k==="ArrowUp")j=i-1;
      else if(k==="Home")j=0;else if(k==="End")j=tabs.length-1;
      if(j<0)return;
      e.preventDefault();stop();j=(j+tabs.length)%tabs.length;show(j);tabs[j].focus();
    });
  });
  show(2);
  if(reduced||!("IntersectionObserver" in window))return;      // בהפחתת תנועה אין הפעלה אוטומטית
  // מעבר אחד בלבד כשהכרטיס נכנס למסך, ונעצר ברגע שהגולש נוגע בלשונית
  show(0);
  const io=new IntersectionObserver(es=>{
    if(!es[0].isIntersecting)return;
    io.disconnect();
    t1=setTimeout(()=>{if(touched)return;show(1);t2=setTimeout(()=>{if(!touched)show(2);},2400);},1800);
  },{threshold:.5});
  io.observe(root.querySelector(".ust-card"));
})();`
},
{
  id:"g240", cat:"gsap", name:"מסמך שמסמנים בו משפטים והערה צפה עוברת ביניהם", tech:"GSAP · ScrollTrigger · sticky · getClientRects", status:"מאושר-עין",
  desc:"מסמך של הצעת מחיר, ובו שלושה משפטים שמסומנים בגלילה אחד אחרי השני: צבע עובר על המשפט מההתחלה ועד הסוף, ותחתיו קו דק. ליד כל סימון מופיעה הערה קטנה של מנהלת הפרויקטים שמסבירה אותו במילים פשוטות, וההערה גם מחליקה אל המשפט הבא כשעוברים אליו. הגולש קורא את המסמך בעצמו, אבל מישהו מראה לו איפה כדאי לעצור.",
  when:"מסמך שיש בו כמה משפטים שחשוב להסביר: הצעת מחיר, הסכם, תקנון, הנחיות לפני טיפול או לפני מסירה. מתאים לסקשן ״איך אנחנו עוברים איתכם על ההצעה״, כשההסבר בנוי כהערות על הטקסט ולא כפסקה נפרדת. שלושה סימונים, פעם אחת בעמוד. לא למסמך ארוך מאוד, ולא כשההערות הן שיווק ולא הסבר.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם משפטים במסמך מסומנים ונפתחות עליהם הערות צפות. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום ומכיל את כל ההערות:** המשפטים מסומנים במלואם ומתחת למסמך רשימת `<ol>` של שלוש ההערות, כל אחת עם המשפט המסומן שהיא מסבירה. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור גלילה של 300vh), הרשימה הופכת ל-`sr-only` (קורא מסך עדיין מוצא את כל ההערות), וההערה הצפה (`aria-hidden`) נטענת מהרשימה, כך שמשנים טקסטים רק במארקאפ. **הסימון** הוא שתי שכבות `background-image` שרוחבן `calc(var(--k) * 100%)`, ו-`--k` מ-0 עד 1 נגזר מ-`p` בלבד, לכן הוא נכון גם בגלילה לאחור. `box-decoration-break:clone` נותן לכל שורה של משפט שנשבר סימון משלה. **ההערה** מופיעה כשהסימון חצי גמור, ומחליקה אל המשפט הבא עם החלפת טקסט. **המיקום** נמדד מ-`getClientRects()` של המשפט ביחס לכרטיס המסמך (אותו חישוב נכון בכל רוחב), מתחת לשורה האחרונה של המשפט, ומעליו אם אין מקום. החישוב מתבצע מחדש בכל `refresh`, כולל גובה ההערה של כל משפט. **RTL:** הסימון נפתח מימין (`background-position:100%`), וב-LTR משנים ל-`0%`. **בנייד** הכותרת מתקצרת וההערה נשארת בתוך המסמך.",
  libs:["gsap","ScrollTrigger"],
  css:`.dan{max-width:1100px;margin-inline:auto}
.dan-pin{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,6vw,88px)}
.dan-head{display:grid;gap:12px;max-width:36ch}
.dan-head h2{margin:0;font-size:clamp(28px,3vw,44px);line-height:1.15;text-wrap:balance}
.dan-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.dan-col{display:grid;gap:24px;min-width:0}
.dan-doc{position:relative;display:grid;gap:16px;padding:32px;border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -36px color-mix(in srgb,var(--ink) 40%,transparent)}
.dan-dh{display:flex;justify-content:space-between;gap:16px;font-size:14px;color:var(--muted)}
.dan-dtl{margin:0;font-size:22px;line-height:1.25}
.dan-p{margin:0;font-size:17px;line-height:1.85}
.dan-df{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding-top:16px;border-top:1px solid var(--line);font-size:15px;color:var(--muted)}
.dan-df b{font-size:20px;color:var(--ink)}
.dan-hl{--k:1;padding:0 2px;border-radius:4px;background-image:linear-gradient(color-mix(in srgb,var(--accent) 24%,transparent),color-mix(in srgb,var(--accent) 24%,transparent)),linear-gradient(var(--accent),var(--accent));background-repeat:no-repeat;background-position:100% 100%,100% 100%;background-size:calc(var(--k) * 100%) 100%,calc(var(--k) * 100%) 2px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.dan-notes{list-style:none;margin:0;padding:0;display:grid;gap:16px}
.dan-note{display:grid;gap:4px;padding-inline-start:16px;border-inline-start:2px solid var(--accent)}
.dan-q{font-size:16px}
.dan-note p{margin:0;font-size:15px;line-height:1.6;color:var(--muted)}
.dan-pop{display:none}
/* מצב חי: ההערות הופכות לקריאות לקורא מסך בלבד, וההערה הצפה לוקחת את מקומן */
.dan.is-live .dan-run{height:300vh}
.dan.is-live .dan-pin{position:sticky;top:0;height:100vh;height:100svh}
.dan.is-live .dan-notes{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.dan.is-live .dan-pop{position:absolute;left:0;top:0;z-index:3;display:grid;gap:8px;box-sizing:border-box;width:min(300px,calc(100% - 16px));padding:16px;border-radius:16px;background:var(--ink);color:var(--bg);box-shadow:0 20px 40px -20px color-mix(in srgb,var(--ink) 60%,transparent);opacity:0;visibility:hidden;pointer-events:none}
.dan-ar{position:absolute;left:0;top:-6px;width:12px;height:12px;border-radius:2px;background:var(--ink);transform:translateX(-50%) rotate(45deg)}
.dan-pop.is-above .dan-ar{top:auto;bottom:-6px}
.dan-who{display:flex;align-items:center;gap:10px;font-size:14px;color:color-mix(in srgb,var(--bg) 72%,transparent)}
.dan-who b{color:var(--bg)}
.dan-av{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent);color:var(--accent-ink);font-size:14px;font-weight:700}
.dan-txt{margin:0;font-size:15px;line-height:1.55}
@media(max-width:767px){
  .dan-pin{grid-template-columns:minmax(0,1fr);gap:24px}
  .dan.is-live .dan-pin{align-content:center}
  .dan.is-live .dan-head p{display:none}
  .dan-doc{padding:20px;gap:12px}
  .dan-dtl{font-size:19px}
  .dan-p{font-size:16px;line-height:1.75}
}`,
  html:`<div class="stage"><div class="dan"><div class="dan-run"><div class="dan-pin">
  <div class="dan-head"><h2>ככה אנחנו עוברים איתכם על ההצעה לפני שחותמים</h2><p>דנה, מנהלת הפרויקטים, מסמנת בהצעה את שלושת הסעיפים ששואלים עליהם הכי הרבה, ומסבירה כל אחד במילים פשוטות.</p></div>
  <div class="dan-col">
    <article class="dan-doc">
      <header class="dan-dh"><span>הצעת מחיר 1042</span><span>12 באוקטובר 2026</span></header>
      <h3 class="dan-dtl">שיפוץ מטבח בדירה ברמת גן</h3>
      <p class="dan-p">העבודה כוללת פירוק המטבח הקיים, החלפת הצנרת והתקנת מטבח חדש לפי התוכנית שאושרה. משך העבודה הוא <span class="dan-hl">שלושה שבועות מיום תחילתה</span>, והמחיר כולל חומרים ופינוי פסולת.</p>
      <p class="dan-p">התשלום מתחלק לשלוש פעימות, והאחרונה <span class="dan-hl">משולמת רק לאחר מסירה וביקורת משותפת</span>. שינויים בתוכנית שיבקש הלקוח במהלך העבודה <span class="dan-hl">יתומחרו בנפרד</span> לפני שמתחילים בהם.</p>
      <footer class="dan-df"><span>סה״כ כולל מע״מ</span><b>48,500 ₪</b></footer>
      <div class="dan-pop" aria-hidden="true"><i class="dan-ar"></i><div class="dan-who"><span class="dan-av">ד</span><span><b>דנה</b> מנהלת פרויקטים</span></div><p class="dan-txt"></p></div>
    </article>
    <ol class="dan-notes">
      <li class="dan-note"><b class="dan-q">שלושה שבועות מיום תחילתה</b><p>הלו״ז מתחיל ביום שהחומרים הגיעו לאתר ולא ביום החתימה. כתבנו את זה כדי שלא יהיה ויכוח על התאריך.</p></li>
      <li class="dan-note"><b class="dan-q">משולמת רק לאחר מסירה וביקורת משותפת</b><p>את הסכום האחרון משלמים רק אחרי שעברתם על העבודה יחד עם מנהל הפרויקט. ככה אתם יודעים שהכל נבדק לפני שהכסף עובר.</p></li>
      <li class="dan-note"><b class="dan-q">יתומחרו בנפרד</b><p>כל שינוי מקבל הצעה קצרה, והעבודה עליו מתחילה רק אחרי שאישרתם אותה. החשבון הסופי לא מפתיע אף אחד.</p></li>
    </ol>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר מסמך מסומן במלואו ומתחתיו רשימת ההערות (במארקאפ)
  const root=document.querySelector(".dan"),run=root.querySelector(".dan-run"),doc=root.querySelector(".dan-doc"),
    hl=[...root.querySelectorAll(".dan-hl")],body=[...root.querySelectorAll(".dan-note p")].map(p=>p.textContent.trim()),
    pop=root.querySelector(".dan-pop"),txt=pop.querySelector(".dan-txt"),ar=pop.querySelector(".dan-ar");
  const n=hl.length,S=hl.map((_,i)=>.1+i*.3),clamp=v=>Math.min(1,Math.max(0,v));
  // בהפחתת תנועה הפונקציה לא רצה, והמסמך נשאר מסומן עם הרשימה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    let pos=[],k=-1;
    // מיקום ההערה לכל משפט: מתחת לשורה האחרונה שלו, ומעליו אם אין מקום. כולל גובה ההערה של אותו משפט
    const meas=()=>{
      const d=doc.getBoundingClientRect(),pw=pop.offsetWidth;
      pos=hl.map((h,i)=>{
        txt.textContent=body[i];const ph=pop.offsetHeight;
        const rs=[...h.getClientRects()].filter(r=>r.width>2),f=rs[0],l=rs[rs.length-1];
        const below=d.bottom-l.bottom>ph+24,r=below?l:f,cx=r.left+r.width/2-d.left;
        const x=Math.min(d.width-pw-8,Math.max(8,cx-pw/2));
        return{x,y:below?r.bottom-d.top+12:r.top-d.top-ph-12,ax:Math.min(pw-24,Math.max(24,cx-x)),above:!below};
      });
      if(k>=0)txt.textContent=body[k];
    };
    const show=(i,from)=>{
      if(i<0){gsap.to(pop,{autoAlpha:0,duration:.25,overwrite:"auto"});return;}
      const q=pos[i];
      pop.classList.toggle("is-above",q.above);ar.style.left=q.ax+"px";txt.textContent=body[i];
      if(from<0){gsap.set(pop,{x:q.x});gsap.fromTo(pop,{y:q.y+8,autoAlpha:0},{y:q.y,autoAlpha:1,duration:.35,ease:"power3.out",overwrite:"auto"});}
      else{gsap.to(pop,{x:q.x,y:q.y,autoAlpha:1,duration:.5,ease:"power3.out",overwrite:"auto"});gsap.fromTo(txt,{autoAlpha:0,y:6},{autoAlpha:1,y:0,duration:.35,delay:.1,ease:"power2.out",overwrite:"auto"});}
    };
    // הסימון נגזר מ-p בלבד, ההערה מתחלפת רק כשהמשפט הפעיל משתנה
    const paint=p=>{
      hl.forEach((h,i)=>h.style.setProperty("--k",clamp((p-S[i])/.07)));
      let a=-1;hl.forEach((_,i)=>{if(p>=S[i]+.035)a=i;});
      if(a!==k){const from=k;k=a;if(pos.length)show(a,from);}
    };
    ScrollTrigger.addEventListener("refresh",meas);
    meas();paint(0);
    const st=ScrollTrigger.create({trigger:run,start:"top top",end:"bottom bottom",invalidateOnRefresh:true,onUpdate:s=>paint(s.progress)});
    return()=>{
      st.kill();ScrollTrigger.removeEventListener("refresh",meas);root.classList.remove("is-live");
      hl.forEach(h=>h.style.removeProperty("--k"));gsap.killTweensOf([pop,txt]);gsap.set([pop,txt],{clearProps:"all"});
      pop.classList.remove("is-above");txt.textContent="";
    };
  });
})();`
},
{
  id:"b95", cat:"behavior", name:"מסגרת שמחליפה יחס בלחיצה והתמונה נחתכת מחדש תוך כדי תנועה", tech:"GSAP Flip · radiogroup · container query units", status:"מאושר-עין", runway:false,
  desc:"תמונה בתוך מסגרת, ולידה ארבע אפשרויות עם סמל קטן של היחס: רחב, ריבוע, אינסטגרם וסטורי. בלחיצה המסגרת עוברת בהחלקה ליחס החדש, והתמונה שבתוכה נחתכת מחדש בזמן אמת במקום להימתח או לקפוץ. כיתוב בפינה מתחלף ואומר איפה משתמשים בפורמט הזה. הגולש רואה את אותו צילום בכל הפורמטים בלי לדמיין.",
  when:"עסק שמוסר אותו תוצר בכמה פורמטים: סרטוני תדמית, צילום מוצר, באנרים, תמונות לרשתות חברתיות. מתאים לסקשן ״מה מקבלים״ או לדף שירות. ארבע אפשרויות לכל היותר, פעם אחת בעמוד. לא לתוצר שיש לו פורמט אחד, ולא כשאין צילום אחד שנראה טוב בכל החיתוכים.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם מסגרת מחליפה יחס מסך והתוכן שבתוכה מסתדר מחדש. נבנה מאפס מהצפייה. **זה מהלך עם בקרה אמיתית:** `role=\"radiogroup\"` של ארבעה `button` עם `aria-checked`, `tabindex` מתגלגל, חיצים (החצים ימינה ושמאלה מתהפכים לפי `direction`), ו-`:focus-visible` ברור. אזור המגע הוא 64px. **גודל המסגרת** מחושב ב-CSS בלבד: הבמה היא `container-type:size`, והמסגרת היא `min(100cqw, 100cqh * var(--r))` על `min(100cqh, 100cqw / var(--r))`, כש-`--r` הוא היחס כמספר. לכן המסגרת תמיד המלבן הגדול ביותר מהיחס הזה שנכנס לבמה, בכל רוחב. **המעבר** הוא `Flip.from(state, {scale:false})`: Flip מנפיש `width` ו-`height` אמיתיים ולא `scale`, והתמונה (`object-fit:cover`) נחתכת מחדש בכל פריים, בלי עיוות. קליקים מהירים מבטלים את המעבר הקודם (`Flip.killFlipsOf`) ומתחילים ממה שמוצג. **בלי Flip או בהפחתת תנועה** היחס מתחלף מיד, בלי מעבר, והבקרה עובדת כרגיל. **בלי JS** מוצגת המסגרת ביחס הרחב, והבקרה מוחלפת ברשימה פשוטה של ארבעת הפורמטים (במארקאפ), כדי שלא יוצגו כפתורים שלא עושים כלום. **RTL:** ה-`<bdi dir=\"ltr\">` שומר שיחס כמו 9:16 לא יתהפך. **תמונה:** מהמאגר, מרובעת, כדי שכל החיתוכים יראו פנים.",
  libs:["gsap","Flip"],
  css:`.arf{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,6vw,88px);max-width:1100px;margin-inline:auto}
.arf-side{display:grid;gap:24px}
.arf-side h2{margin:0;font-size:clamp(28px,3.2vw,44px);line-height:1.12;text-wrap:balance}
.arf-side p{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.arf-fb{margin:0;padding:0;list-style:none;display:grid;gap:8px;color:var(--ink);font-size:16px}
.arf-fb bdi{font-weight:700}
.arf-ctl{display:none;gap:12px}
.arf.is-live .arf-fb{display:none}
.arf.is-live .arf-ctl{display:grid}
.arf-opt{display:flex;align-items:center;gap:16px;width:100%;min-height:64px;padding:12px 16px;border:0;border-radius:16px;background:transparent;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink);font:inherit;text-align:start;cursor:pointer;transition:box-shadow .3s cubic-bezier(.2,.6,.2,1),background-color .3s cubic-bezier(.2,.6,.2,1)}
.arf-opt[aria-checked="true"]{background:var(--card);box-shadow:inset 0 0 0 2px var(--accent)}
.arf-opt:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(hover:hover){.arf-opt[aria-checked="false"]:hover{background:var(--card)}}
.arf-gw{display:grid;place-items:center;flex:none;width:40px;height:40px}
.arf-gl{display:block;height:24px;width:calc(24px * var(--r));border-radius:4px;box-shadow:inset 0 0 0 2px currentColor}
.arf-ot{display:grid;gap:2px;min-width:0}
.arf-ot b{font-size:18px;line-height:1.2}
.arf-ot span{font-size:14px;color:var(--muted)}
.arf-stage{container-type:size;display:grid;place-items:center;height:clamp(320px,56svh,520px)}
.arf-frame{--r:1.7778;position:relative;overflow:hidden;isolation:isolate;width:min(100cqw,100cqh * var(--r));height:min(100cqh,100cqw / var(--r));border-radius:20px;background:var(--card);box-shadow:0 32px 64px -36px color-mix(in srgb,var(--ink) 55%,transparent)}
.arf-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.arf-shade{position:absolute;inset:0;background:linear-gradient(transparent 55%,color-mix(in srgb,var(--ink) 70%,transparent))}
.arf-tag{position:absolute;top:16px;inset-inline-start:16px;padding:6px 12px;border-radius:8px;background:color-mix(in srgb,var(--ink) 74%,transparent);color:var(--bg);backdrop-filter:blur(6px);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;font-weight:600;letter-spacing:.03em}
.arf-use{position:absolute;inset-inline:16px;bottom:16px;color:var(--bg);font-size:16px;font-weight:600;line-height:1.35}
@media(max-width:767px){
  .arf{grid-template-columns:minmax(0,1fr);gap:32px}
  .arf-side{display:contents}
  .arf-side h2{order:1}.arf-side p{order:2}
  .arf-stage{order:3;height:clamp(280px,40svh,360px)}
  .arf-ctl,.arf-fb{order:4}
  .arf-ctl{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .arf-opt{padding:12px;gap:12px}
  .arf-ot b{font-size:16px}
}`,
  html:`<div class="stage"><section class="arf">
  <div class="arf-side">
    <h2>אותו סרטון, בכל פורמט שהפלטפורמה צריכה</h2>
    <p>הסרטון נמסר חתוך מראש לאתר, לפיד, לאינסטגרם ולסטורי, כך שאתם לא צריכים לחתוך שום דבר בעצמכם.</p>
    <ul class="arf-fb">
      <li><bdi dir="ltr">16:9</bdi> לאתר וליוטיוב</li>
      <li><bdi dir="ltr">1:1</bdi> לפיד בפייסבוק ובלינקדאין</li>
      <li><bdi dir="ltr">4:5</bdi> לפוסט באינסטגרם</li>
      <li><bdi dir="ltr">9:16</bdi> לרילס ולסטורי</li>
    </ul>
    <div class="arf-ctl" role="radiogroup" aria-label="פורמט הסרטון">
      <button class="arf-opt" type="button" role="radio" aria-checked="true" tabindex="0" data-r="1.7778" data-l="16:9" data-u="אתר ויוטיוב"><span class="arf-gw" aria-hidden="true"><i class="arf-gl" style="--r:1.7778"></i></span><span class="arf-ot"><b><bdi dir="ltr">16:9</bdi></b><span>אתר ויוטיוב</span></span></button>
      <button class="arf-opt" type="button" role="radio" aria-checked="false" tabindex="-1" data-r="1" data-l="1:1" data-u="פיד בפייסבוק ובלינקדאין"><span class="arf-gw" aria-hidden="true"><i class="arf-gl" style="--r:1"></i></span><span class="arf-ot"><b><bdi dir="ltr">1:1</bdi></b><span>פיד בפייסבוק ובלינקדאין</span></span></button>
      <button class="arf-opt" type="button" role="radio" aria-checked="false" tabindex="-1" data-r="0.8" data-l="4:5" data-u="פוסט באינסטגרם"><span class="arf-gw" aria-hidden="true"><i class="arf-gl" style="--r:.8"></i></span><span class="arf-ot"><b><bdi dir="ltr">4:5</bdi></b><span>פוסט באינסטגרם</span></span></button>
      <button class="arf-opt" type="button" role="radio" aria-checked="false" tabindex="-1" data-r="0.5625" data-l="9:16" data-u="רילס וסטורי"><span class="arf-gw" aria-hidden="true"><i class="arf-gl" style="--r:.5625"></i></span><span class="arf-ot"><b><bdi dir="ltr">9:16</bdi></b><span>רילס וסטורי</span></span></button>
    </div>
  </div>
  <div class="arf-stage">
    <div class="arf-frame">
      <img class="arf-img" src="../assets/media/real/s12/hero-window.webp" alt="שלושה חברים צוחקים מחלון של קרוואן" width="1100" height="1100" loading="lazy" decoding="async">
      <span class="arf-shade" aria-hidden="true"></span>
      <span class="arf-tag" aria-hidden="true"><bdi dir="ltr">16:9</bdi></span>
      <span class="arf-use" aria-hidden="true">אתר ויוטיוב</span>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".arf"),frame=root.querySelector(".arf-frame"),opts=[...root.querySelectorAll(".arf-opt")],
    tag=root.querySelector(".arf-tag bdi"),use=root.querySelector(".arf-use");
  const rm=matchMedia("(prefers-reduced-motion: reduce)");
  const rtl=getComputedStyle(root).direction==="rtl"?-1:1;       // החצים ימינה ושמאלה מתהפכים עם כיוון העמוד
  let cur=0;
  root.classList.add("is-live");
  function pick(i,focus){
    if(i===cur)return;
    // החלפת היחס עצמה רצה תמיד, גם בלי Flip וגם בהפחתת תנועה. רק המעבר מותנה
    const animate=typeof Flip!=="undefined"&&typeof gsap!=="undefined"&&!rm.matches;
    if(animate)Flip.killFlipsOf(frame);
    const state=animate?Flip.getState(frame):null;
    cur=i;
    opts.forEach((o,j)=>{o.setAttribute("aria-checked",j===i?"true":"false");o.tabIndex=j===i?0:-1;});
    const o=opts[i];
    frame.style.setProperty("--r",o.dataset.r);
    tag.textContent=o.dataset.l;use.textContent=o.dataset.u;
    if(focus)o.focus();
    if(!state)return;
    // scale:false מנפיש width ו-height אמיתיים, והתמונה נחתכת מחדש בכל פריים
    Flip.from(state,{duration:.6,ease:"power3.inOut",scale:false});
    gsap.fromTo([tag,use],{y:8,autoAlpha:0},{y:0,autoAlpha:1,duration:.4,delay:.2,ease:"power2.out",stagger:.06,overwrite:true});
  }
  opts.forEach((o,i)=>{
    o.addEventListener("click",()=>pick(i,false));
    o.addEventListener("keydown",e=>{
      const k=e.key;let j=-1;
      if(k==="ArrowDown")j=i+1;else if(k==="ArrowUp")j=i-1;
      else if(k==="ArrowRight")j=i+rtl;else if(k==="ArrowLeft")j=i-rtl;
      else if(k==="Home")j=0;else if(k==="End")j=opts.length-1;
      if(j<0)return;
      e.preventDefault();pick((j+opts.length)%opts.length,true);
    });
  });
})();`
},
{
  id:"g241", cat:"gsap", name:"זכוכית מגדלת שעוברת על גרף ומגדילה עד שהמספר נעצר", tech:"GSAP · ScrollTrigger scrub · sticky · CSS variables", status:"מאושר-עין",
  desc:"גרף עמודות של שנים עשר שבועות, ועליו זכוכית מגדלת עגולה עם ידית וכיתוב קטן של מספר ההגדלה. בגלילה היא יוצאת מהשבוע הראשון, זזה לאורך הגרף ומגדילה יותר ויותר, והכיתוב סופר מ-1.0 עד 2.4. היא נעצרת על העמודה האחרונה ומראה אותה גדולה, עם המספר שלה. הגולש רואה בדיוק איפה הסיפור קורה בנתונים.",
  when:"נתון אחד שיש לו רגע אחד חשוב: קפיצה במספר הפניות אחרי עליית אתר, ירידה בזמן המתנה, שיפור בציון. מתאים לסקשן תוצאות או מקרה בוחן, כשהמספר הסופי הוא ההוכחה. פעם אחת בעמוד. לא לגרף שאין בו אזור אחד שמעניין יותר מהשאר, ולא לנתונים שלא ניתן להראות.",
  note:"**שחזור.** השראה: כמה סרטוני הדגמה בגלריה של prompt-motion.com (21.10.2026) שבהם זכוכית מגדלת עוברת על ממשק ומגדילה אזור. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** הגרף המלא, העמודה האחרונה צבועה ועליה המספר, ובלי זכוכית. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **איך ההגדלה עובדת:** בזמן ריצה הקוד משכפל את הגרף לתוך הזכוכית (`aria-hidden`), והעתק זה עובר `translate` ו-`scale` שנקבעים ב-CSS בלבד מתוך שלושה משתנים על הזכוכית: `--cx` ו-`--cy` (מרכז הזכוכית בקואורדינטות הגרף) ו-`--z` (ההגדלה). הנוסחה היא `translate(R - cx*z, R - cy*z) scale(z)` עם מקור בפינה, כך שהנקודה שמתחת למרכז הזכוכית תמיד זו שמוגדלת. ה-JS רק כותב את שלושת המספרים. **המסלול** מ-`p` בלבד: הזכוכית עוברת מראש העמודה הראשונה אל ראש האחרונה, מעל ראשי כל העמודות שבדרך (אינטרפולציה לפי האינדקס, כך שיש תמיד עמודה מתחתיה), ו-`p` בין 10% ל-82%. בנייד הזכוכית עצמה נעצרת לפני קצה המסך (`lim`), וההגדלה נשארת ממוקדת בעמודה. מעבר לזה הזכוכית עומדת במקום. **המדידה** מ-`getBoundingClientRect` של העמודות ביחס לאזור הגרף ונעשית מחדש בכל `refresh`, לכן המסלול נכון בכל רוחב ובכל כיוון, והזמן זורם מימין לשמאל ב-RTL. **גודל הזכוכית** הוא `--lr` (80 בדסקטופ, 56 בנייד). **נגישות:** האזור כולו `role=\"img\"` עם תיאור שמכיל את הערכים, והזכוכית `aria-hidden`. **הערכים** נקבעים ב-`--h` של כל עמודה (חלק מהמקסימום).",
  libs:["gsap","ScrollTrigger"],
  css:`.lns{--lr:80;max-width:1100px;margin-inline:auto}
.lns-pin{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,6vw,88px)}
.lns-txt{display:grid;gap:12px;max-width:36ch}
.lns-txt h2{margin:0;font-size:clamp(28px,3vw,44px);line-height:1.15;text-wrap:balance}
.lns-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.lns-card{display:grid;gap:20px;padding:24px;border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -36px color-mix(in srgb,var(--ink) 40%,transparent)}
.lns-top{display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.lns-ttl{font-size:18px;font-weight:700}
.lns-rng{font-size:14px;color:var(--muted)}
.lns-plot{position:relative;height:clamp(260px,38svh,340px)}
.lns-chart{position:absolute;inset:48px 0 0;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:12px}
.lns-bars{position:relative;display:flex;align-items:flex-end;gap:12px;background:repeating-linear-gradient(to top,var(--line) 0 1px,transparent 1px 25%)}
.lns-b{position:relative;flex:1;min-width:0;height:calc(var(--h) * 100%);border-radius:8px 8px 4px 4px}
.lns-b::before{content:"";position:absolute;inset:0;border-radius:inherit;background:color-mix(in srgb,var(--ink) 18%,transparent)}
.lns-b.hi::before{background:var(--accent)}
.lns-b em{position:absolute;bottom:100%;inset-inline:0;margin-bottom:6px;text-align:center;font-style:normal;font-size:16px;font-weight:700;font-variant-numeric:tabular-nums}
.lns-xs{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:12px;font-size:13px;color:var(--muted)}
.lns-xs span{white-space:nowrap}
.lns-xs .a{grid-column:1;justify-self:start}
.lns-xs .m{grid-column:7;justify-self:center}
.lns-xs .z{grid-column:12;justify-self:end}
.lns-foot{margin:0;font-size:15px;line-height:1.55;color:var(--muted)}
/* הזכוכית: קיימת רק כשהמהלך חי. ההגדלה נקבעת כאן מתוך --cx --cy --z שה-JS כותב */
.lns-lens{display:none}
.lns.is-live .lns-lens{display:block;position:absolute;left:0;top:0;z-index:2;width:calc(var(--lr) * 2px);height:calc(var(--lr) * 2px);pointer-events:none}
.lns-glass{position:absolute;inset:0;overflow:hidden;border-radius:50%;background:var(--card)}
.lns-zoom{position:absolute;left:0;top:0;transform-origin:0 0;transform:translate(calc(var(--lr) * 1px - var(--cx) * var(--z) * 1px),calc(var(--lr) * 1px - var(--cy) * var(--z) * 1px)) scale(var(--z))}
.lns-rim{position:absolute;inset:0;border-radius:50%;box-shadow:inset 0 0 0 3px var(--ink),0 16px 32px -12px color-mix(in srgb,var(--ink) 45%,transparent)}
.lns-hd{position:absolute;left:calc(100% - 22px);top:calc(100% - 22px);width:12px;height:64px;border-radius:6px;background:var(--ink);transform-origin:50% 0;transform:rotate(-45deg)}
.lns-zc{position:absolute;left:50%;top:100%;margin-top:12px;translate:-50% 0;padding:6px 12px;border-radius:999px;background:var(--ink);color:var(--bg);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:14px;font-weight:700;white-space:nowrap}
.lns.is-live .lns-run{height:280vh}
.lns.is-live .lns-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .lns{--lr:56}
  .lns-pin{grid-template-columns:minmax(0,1fr);gap:24px}
  .lns.is-live .lns-pin{align-content:center}
  .lns.is-live .lns-txt p{display:none}
  .lns-card{padding:20px;gap:16px}
  .lns-plot{height:clamp(240px,34svh,300px)}
  .lns-chart{inset:40px 0 0}
  .lns-bars,.lns-xs{gap:8px}
  .lns-hd{height:48px;width:10px}
}`,
  html:`<div class="stage"><div class="lns"><div class="lns-run"><div class="lns-pin">
  <div class="lns-txt"><h2>מאז שהאתר החדש עלה, מגיעים יותר מטופלים כל שבוע</h2><p>בגרף רואים שנים עשר שבועות. ההגדלה על השבועות האחרונים מראה בדיוק איפה זה התחיל לקפוץ.</p></div>
  <div class="lns-card">
    <div class="lns-top"><span class="lns-ttl">מטופלים חדשים בשבוע</span><span class="lns-rng">12 השבועות האחרונים</span></div>
    <div class="lns-plot" role="img" aria-label="גרף עמודות של מטופלים חדשים בשבוע במרפאה, בשנים עשר השבועות האחרונים. מ-20 בשבוע הראשון, דרך 24 בשבוע השישי, ועד 57 בשבוע השנים עשר, אחרי עליית האתר החדש בשבוע השביעי.">
      <div class="lns-chart">
        <div class="lns-bars">
          <i class="lns-b" style="--h:.33"></i><i class="lns-b" style="--h:.37"></i><i class="lns-b" style="--h:.32"></i><i class="lns-b" style="--h:.38"></i><i class="lns-b" style="--h:.35"></i><i class="lns-b" style="--h:.4"></i><i class="lns-b" style="--h:.52"></i><i class="lns-b" style="--h:.63"></i><i class="lns-b" style="--h:.73"></i><i class="lns-b" style="--h:.82"></i><i class="lns-b" style="--h:.87"></i><i class="lns-b hi" style="--h:.95"><em>57</em></i>
        </div>
        <div class="lns-xs"><span class="a">שבוע 1</span><span class="m">עליית האתר</span><span class="z">שבוע 12</span></div>
      </div>
      <div class="lns-lens" aria-hidden="true"><span class="lns-hd"></span><div class="lns-glass"><div class="lns-zoom"></div></div><span class="lns-rim"></span><span class="lns-zc">x<bdi>2.4</bdi></span></div>
    </div>
    <p class="lns-foot">בשבוע האחרון הגיעו 57 מטופלים חדשים, פי שניים וחצי מהשבוע הראשון.</p>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הגרף המלא עם העמודה האחרונה מסומנת, בלי זכוכית (במארקאפ)
  const root=document.querySelector(".lns"),run=root.querySelector(".lns-run"),plot=root.querySelector(".lns-plot"),
    chart=plot.querySelector(".lns-chart"),bars=[...plot.querySelectorAll(".lns-b")],lens=plot.querySelector(".lns-lens"),
    zoom=lens.querySelector(".lns-zoom"),zc=lens.querySelector(".lns-zc bdi");
  const clamp=v=>Math.min(1,Math.max(0,v)),eP=gsap.parseEase("power3.inOut"),eZ=gsap.parseEase("power2.inOut");
  // בהפחתת תנועה הפונקציה לא רצה, והגרף נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const copy=chart.cloneNode(true);copy.setAttribute("aria-hidden","true");zoom.appendChild(copy);   // ההעתק שמוגדל בתוך הזכוכית
    let R=80,P=[],lim=[-1e4,1e4],last=0;
    // כל מה שעל המסך נגזר מ-p בלבד, לכן אותו קוד נכון בגלילה קדימה ואחורה
    const paint=p=>{
      last=p;
      const u=clamp((p-.1)/.72),m=eP(u),z=1+1.4*eZ(u);        // ההגדלה עולה מ-1 עד 2.4
      // הזכוכית עוברת מעל ראשי העמודות לפי האינדקס, ולכן תמיד יש עמודה מתחתיה
      const f=m*(P.length-1),i=Math.min(P.length-2,Math.floor(f)),k=f-i;
      const cx=P[i].x+(P[i+1].x-P[i].x)*k,cy=P[i].y+(P[i+1].y-P[i].y)*k;
      lens.style.setProperty("--cx",cx.toFixed(1));lens.style.setProperty("--cy",cy.toFixed(1));lens.style.setProperty("--z",z.toFixed(3));
      gsap.set(lens,{x:Math.min(lim[1],Math.max(lim[0],cx))-R,y:cy-R,autoAlpha:clamp(p/.08)});   // ההגדלה ממוקדת בעמודה, והזכוכית עצמה לא יוצאת מהמסך
      const s=z.toFixed(1);if(zc.textContent!==s)zc.textContent=s;
    };
    // ראש כל עמודה, נמדד ביחס לאזור הגרף. הגבולות שומרים שהזכוכית (עם הידית) תישאר בתוך המסך
    const meas=()=>{
      R=parseFloat(getComputedStyle(root).getPropertyValue("--lr"))||80;
      const pr=plot.getBoundingClientRect();
      zoom.style.width=pr.width+"px";zoom.style.height=pr.height+"px";
      P=bars.map(b=>{const r=b.getBoundingClientRect();return{x:r.left+r.width/2-pr.left,y:r.top-pr.top-8};});
      const vw=document.documentElement.clientWidth;lim=[R+8-pr.left,vw-8-pr.left-R-Math.round(R*.55)];
      paint(last);
    };
    ScrollTrigger.addEventListener("refresh",meas);
    meas();
    const o={p:0};
    gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    return()=>{
      ScrollTrigger.removeEventListener("refresh",meas);root.classList.remove("is-live");
      zoom.textContent="";zoom.removeAttribute("style");["--cx","--cy","--z"].forEach(v=>lens.style.removeProperty(v));
      gsap.set(lens,{clearProps:"all"});
    };
  });
})();`
},
{
  id:"g242", cat:"gsap", name:"מפה מוטה שנעמדים עליה סמנים אחד אחרי השני", tech:"GSAP · ScrollTrigger scrub · sticky · CSS 3D", status:"מאושר-עין",
  desc:"מפה שטוחה של אזור שירות, שבתחילת הגלילה מוצגת כמעט מלמעלה ואז מתכופפת אחורה לזווית של מבט אלכסוני. אחרי שהיא נוטה, חמישה סמנים נופלים עליה מלמעלה בזה אחר זה, כל אחד עם תווית של עיר, וטבעת נפתחת מתחתיו במקום שבו נחת. ברשימה שמתחת לכל עיר נדלקת כשהסמן שלה מגיע. הגולש רואה את תחום השירות נבנה ולא רק קורא עליו.",
  when:"עסק שהכיסוי הגיאוגרפי שלו הוא חלק מהמכירה: טכנאים, שליחויות, מכון בדיקות, מקום שיש לו סניפים, מי שמגיע ללקוח. מתאים לסקשן ״איפה אנחנו פועלים״ בעמוד שירות או בדף הבית. עד שבעה סמנים, פעם אחת בעמוד. לא לעסק שפועל ברחבי הארץ בלי הבדל, ולא כשאין מה להגיד על כל אזור.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם משטח מוטה בתלת ממד מקבל עליו סימונים אחד אחרי השני. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** מפה מוטה (56 מעלות), כל חמשת הסמנים עומדים עליה, וכל פריטי הרשימה דלוקים. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור גלילה של 300vh), ו-`p` מ-0 עד 1 כותב רק משתני CSS: `--rx` ו-`--rz` על השורש (הזווית של המפה, מ-16 מעלות כמעט שטוח ועד 56 במחצית הראשונה של הגלילה) ו-`--dz` ו-`--rs` על כל סמן (הגובה שממנו הוא נופל והגודל של הטבעת). כל הגיאומטריה ב-CSS: המפה היא `rotateX(var(--rx)) rotateZ(var(--rz))`, ו**כל סמן מקבל את ההיפוך המדויק** `translateZ(var(--dz)) rotateZ(-rz) rotateX(-rx)`, כך שהוא עומד זקוף מול הקורא בכל זווית, כשהבסיס שלו נשאר על הנקודה במפה. ה-`translateZ` נעשה לפני ההיפוך, לכן הסמן נופל לאורך הנורמל של המפה. **שני כללי תלת ממד:** (1) לא נותנים `opacity` לאלמנט שיש לו `preserve-3d` כי זה משטח אותו; השקיפות של התווית היא על עלה שטוח (`.tbd-fl`). (2) הטבעת יושבת על `translateZ(1px)` כדי לא להתחכך עם המפה. **המפה** היא SVG סכמטי בצבעי הערכה בלבד (חוף, כבישים, פארקים, רשת רחובות), `aria-hidden`, והמידע האמיתי נמצא ברשימה שמתחתיה, שנשארת קריאה בכל מצב. **המיקום** של סמן הוא `--x` ו-`--y` באחוזים מהמפה. **RTL:** המפה גיאוגרפית (החוף משמאל), לכן אין מה להפוך. **בנייד** התוויות קטנות יותר והמפה נמוכה.",
  libs:["gsap","ScrollTrigger"],
  css:`.tbd{--rx:56deg;--rz:-22deg;max-width:1100px;margin-inline:auto}
.tbd-sk{display:grid;align-content:center;justify-items:center;gap:24px;text-align:center}
.tbd-head{display:grid;gap:12px;max-width:48ch}
.tbd-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);line-height:1.12;text-wrap:balance}
.tbd-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.tbd-scene{perspective:1100px;perspective-origin:50% 28%;display:grid;place-items:center;width:100%;height:clamp(300px,52svh,480px)}
.tbd-plane{position:relative;width:min(86%,640px);aspect-ratio:3/2;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateZ(var(--rz))}
.tbd-base{position:absolute;inset:0;overflow:hidden;border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 48px 64px -32px color-mix(in srgb,var(--ink) 45%,transparent)}
.tbd-map{display:block;width:100%;height:100%}
.tbd-grid{fill:none;stroke:var(--line);stroke-width:1.2}
.tbd-sea{fill:color-mix(in srgb,var(--accent) 14%,var(--card))}
.tbd-coast{fill:none;stroke:var(--accent);stroke-opacity:.5;stroke-width:3}
.tbd-hw{fill:none;stroke:var(--ink);stroke-opacity:.26;stroke-width:7;stroke-linecap:round}
.tbd-park{fill:color-mix(in srgb,var(--accent) 16%,transparent)}
.tbd-m{position:absolute;left:var(--x);top:var(--y);width:0;height:0;transform-style:preserve-3d}
.tbd-ring{position:absolute;left:-16px;top:-16px;width:32px;height:32px;border-radius:50%;background:color-mix(in srgb,var(--accent) 24%,transparent);box-shadow:0 0 0 2px var(--accent);transform:translateZ(1px) scale(var(--rs,1))}
.tbd-bb{position:absolute;left:-80px;top:-120px;width:160px;height:120px;transform-origin:80px 120px;transform:translateZ(var(--dz,0px)) rotateZ(calc(var(--rz) * -1)) rotateX(calc(var(--rx) * -1))}
.tbd-fl{position:absolute;inset:auto 0 0;display:grid;justify-items:center}
.tbd-lb{display:grid;justify-items:center;gap:2px;padding:6px 12px;border-radius:12px;background:var(--ink);color:var(--bg);line-height:1.25;white-space:nowrap;box-shadow:0 12px 24px -12px color-mix(in srgb,var(--ink) 60%,transparent)}
.tbd-lb b{font-size:14px;font-weight:700}
.tbd-lb small{font-size:12px;color:color-mix(in srgb,var(--bg) 75%,transparent)}
.tbd-st{position:relative;width:2px;height:20px;background:var(--ink)}
.tbd-st::after{content:"";position:absolute;bottom:-4px;left:50%;width:8px;height:8px;border-radius:50%;background:var(--accent);translate:-50% 0}
.tbd-list{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 12px}
.tbd-list li{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);color:var(--muted);font-size:15px;line-height:1.3;transition:color .3s linear,box-shadow .3s linear}
.tbd-list li::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--line);transition:background-color .3s linear}
.tbd-list li b{font-weight:700}
.tbd-list li.is-on{color:var(--ink);box-shadow:inset 0 0 0 1px var(--accent)}
.tbd-list li.is-on::before{background:var(--accent)}
.tbd.is-live .tbd-run{height:300vh}
.tbd.is-live .tbd-sk{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .tbd-sk{gap:20px}
  .tbd-scene{height:clamp(260px,38svh,340px)}
  .tbd-plane{width:min(92%,480px)}
  .tbd-lb{padding:4px 8px;border-radius:10px}
  .tbd-lb b{font-size:12px}
  .tbd-lb small{font-size:11px}
  .tbd-list li{padding:6px 12px;font-size:14px}
  .tbd.is-live .tbd-head p{display:none}
}`,
  html:`<div class="stage"><div class="tbd"><div class="tbd-run"><div class="tbd-sk">
  <div class="tbd-head"><h2>אנחנו מגיעים אליכם בכל גוש דן</h2><p>טכנאי יוצא תוך שעתיים, ובערים המסומנות גם באותו יום.</p></div>
  <div class="tbd-scene" aria-hidden="true"><div class="tbd-plane">
    <div class="tbd-base"><svg class="tbd-map" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs><pattern id="tbd-g" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(14)"><path class="tbd-grid" d="M34 0H0V34"/></pattern></defs>
      <rect width="600" height="400" fill="url(#tbd-g)"/>
      <path class="tbd-park" d="M300 240q34-34 76-8t6 66q-44 24-86-6z"/>
      <path class="tbd-park" d="M440 120q24-22 54-4t-4 46q-34 14-56-12z"/>
      <path class="tbd-hw" d="M236 0C246 120 232 260 252 400"/>
      <path class="tbd-hw" d="M116 400L564 48"/>
      <path class="tbd-sea" d="M0 0H74C96 58 62 112 88 172C110 224 82 282 104 342C112 370 102 388 108 400H0Z"/>
      <path class="tbd-coast" d="M74 0C96 58 62 112 88 172C110 224 82 282 104 342C112 370 102 388 108 400"/>
    </svg></div>
    <div class="tbd-m" style="--x:17%;--y:56%"><i class="tbd-ring"></i><div class="tbd-bb"><div class="tbd-fl"><span class="tbd-lb"><b>תל אביב</b><small>עד 45 דקות</small></span><i class="tbd-st"></i></div></div></div>
    <div class="tbd-m" style="--x:44%;--y:36%"><i class="tbd-ring"></i><div class="tbd-bb"><div class="tbd-fl"><span class="tbd-lb"><b>רמת גן</b><small>עד 45 דקות</small></span><i class="tbd-st"></i></div></div></div>
    <div class="tbd-m" style="--x:75%;--y:20%"><i class="tbd-ring"></i><div class="tbd-bb"><div class="tbd-fl"><span class="tbd-lb"><b>פתח תקווה</b><small>עד שעה</small></span><i class="tbd-st"></i></div></div></div>
    <div class="tbd-m" style="--x:34%;--y:80%"><i class="tbd-ring"></i><div class="tbd-bb"><div class="tbd-fl"><span class="tbd-lb"><b>חולון</b><small>עד שעה</small></span><i class="tbd-st"></i></div></div></div>
    <div class="tbd-m" style="--x:66%;--y:84%"><i class="tbd-ring"></i><div class="tbd-bb"><div class="tbd-fl"><span class="tbd-lb"><b>ראשון לציון</b><small>עד שעה וחצי</small></span><i class="tbd-st"></i></div></div></div>
  </div></div>
  <ul class="tbd-list">
    <li class="is-on"><b>תל אביב</b> עד 45 דקות</li>
    <li class="is-on"><b>רמת גן</b> עד 45 דקות</li>
    <li class="is-on"><b>פתח תקווה</b> עד שעה</li>
    <li class="is-on"><b>חולון</b> עד שעה</li>
    <li class="is-on"><b>ראשון לציון</b> עד שעה וחצי</li>
  </ul>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת המפה המוטה עם כל הסמנים והרשימה הדלוקה (במארקאפ)
  const root=document.querySelector(".tbd"),run=root.querySelector(".tbd-run"),ms=[...root.querySelectorAll(".tbd-m")],
    fls=ms.map(m=>m.querySelector(".tbd-fl")),chips=[...root.querySelectorAll(".tbd-list li")];
  const clamp=v=>Math.min(1,Math.max(0,v)),eT=gsap.parseEase("power2.inOut"),eD=gsap.parseEase("power3.out");
  // בהפחתת תנועה הפונקציה לא רצה, והמפה נשארת במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    // הכל נגזר מ-p בלבד ונכתב כמשתני CSS, והזווית והזקיפות של הסמנים מחושבות שם
    const paint=p=>{
      const a=eT(clamp(p/.24));
      root.style.setProperty("--rx",(16+40*a).toFixed(2)+"deg");
      root.style.setProperty("--rz",(-4-18*a).toFixed(2)+"deg");
      ms.forEach((m,i)=>{
        const t=clamp((p-(.26+i*.13))/.11),e=eD(t);
        m.style.setProperty("--dz",((1-e)*240).toFixed(1)+"px");
        m.style.setProperty("--rs",e.toFixed(3));
        fls[i].style.opacity=clamp(t*4);
        chips[i].classList.toggle("is-on",t>=1);
      });
    };
    paint(0);
    const o={p:0};
    gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    return()=>{
      root.classList.remove("is-live");["--rx","--rz"].forEach(v=>root.style.removeProperty(v));
      ms.forEach((m,i)=>{["--dz","--rs"].forEach(v=>m.style.removeProperty(v));fls[i].style.removeProperty("opacity");chips[i].classList.add("is-on");});
    };
  });
})();`
},
{
  id:"g243", cat:"gsap", name:"כרטיסי משימה שעוברים בין עמודות בלוח וגרף שיורד יחד איתם", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"מאושר-עין",
  desc:"לוח משימות עם שלוש עמודות: לביצוע, בעבודה והושלם. בגלילה חמש משימות עוברות מעמודה לעמודה אחת אחרי השנייה, ובכל מעבר הכרטיס מתרומם קצת ומתיישר במקומו החדש בעמודה, כשהכרטיסים שנשארו מתכנסים למעלה. לצד הלוח גרף שמתחיל גבוה ויורד, ומונה של משימות פתוחות יורד איתו עד שהוא מגיע לאפס. הגולש רואה פרויקט שמתקדם ולא רק קורא על תהליך.",
  when:"עסק שהמכירה שלו היא תהליך עבודה שקוף: סוכנות, אולפן, חברת שיפוצים, מי שמוסר פרויקט בשלבים ורוצה להראות שיש סדר. מתאים לסקשן ״איך אנחנו עובדים״ או ״מה קורה אחרי שסוגרים״. חמש עד שש משימות, פעם אחת בעמוד. לא כשהתהליך אצלכם לא באמת מתנהל בלוח, ולא עם משימות שהשם שלהן לא אומר כלום ללקוח.",
  note:"**שחזור.** השראה: סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם כרטיסים עוברים בין עמודות של לוח וגרף ירידה מתעדכן לידם. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** כל חמשת הכרטיסים בעמודת ״הושלם״ (בזרימה רגילה, בתוך `<ul>`), שתי העמודות האחרות ריקות, הגרף מצויר עד אפס והמונה מראה 0. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור גלילה של 300vh), הכרטיסים הופכים ל-`position:absolute` והמיקום של כל אחד נכתב כ-`transform` מ-`paint(p)` אחת. **המיקום נמדד ולא מקודד:** ב-`refresh` של ScrollTrigger נמדדות שלוש הרשימות (`getBoundingClientRect` מול הלוח), ולכן הכיוון (RTL), הרוחב והמובייל לא דורשים שום היפוך. **הגיאומטריה:** לכל כרטיס `s` הוא סכום שני קטעים מוחלקים (לביצוע אל בעבודה, בעבודה אל הושלם), ומשקלי השיוך לעמודות הם `w0=1-s`, `w1=1-|s-1|`, `w2=s-1` (חסומים ב-0). ה-x הוא ממוצע משוקלל של שמאל העמודות, וה-y הוא ממוצע משוקלל של ״שורה ראשונה בעמודה + (סכום משקלי הכרטיסים שלפניו באותה עמודה) כפול גובה שורה״. לכן כרטיסים שנשארים מתכנסים למעלה בהחלקה רציפה, בלי קפיצה, והכל נכון גם בגלילה לאחור. **הגרף:** `remAt(q)` הוא סכום (1 פחות השלמת כל כרטיס), והקו מצויר מחדש ב-61 נקודות מ-0 עד `p`. הנקודה בקצה ממוקמת באותה נוסחה. ב-RTL כל ה-SVG מתהפך אופקית ב-CSS (`:dir(rtl)`), כך שהזמן זורם בכיוון הקריאה, ובו אין טקסט. **הכרטיס המורם:** `--lift` (סינוס של ההתקדמות במעבר) מוסיף צל וסיבוב של עד 2 מעלות, ו-`--d` צובע את הכרטיס ואת הסימון לפי מידת ההשלמה. **להחליף למקרה אחר:** מערכי A ו-B הם זמני ההתחלה של שני המעברים לכל כרטיס (`D` הוא האורך), והמשימות נקראות מהמארקאפ. **בנייד** העמודות נשארות שלוש, הכרטיסים מציגים רק כותרת, והגרף עובר לצד המונה.",
  libs:["gsap","ScrollTrigger"],
  css:`.kbn{--ch:64px;--cg:12px;max-width:1100px;margin-inline:auto}
.kbn-pin{display:grid;align-content:center;gap:32px}
.kbn-head{display:grid;gap:12px;max-width:52ch}
.kbn-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);line-height:1.12;text-wrap:balance}
.kbn-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.kbn-wrap{display:grid;grid-template-columns:minmax(0,1fr) clamp(240px,26vw,320px);gap:clamp(24px,3vw,40px);align-items:center}
.kbn-board{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.4vw,16px)}
.kbn-colw{display:grid;gap:12px;align-content:start;padding:12px;border-radius:20px;background:color-mix(in srgb,var(--ink) 5%,transparent)}
.kbn-ch{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0;padding-inline:4px;font-size:15px;font-weight:700;line-height:1.3}
.kbn-cnt{display:grid;place-items:center;min-width:28px;height:28px;padding-inline:8px;border-radius:999px;background:var(--bg);color:var(--muted);font-size:14px;font-weight:700;font-variant-numeric:tabular-nums}
.kbn-list{list-style:none;margin:0;padding:0;display:grid;gap:var(--cg);align-content:start;min-height:calc(5 * var(--ch) + 4 * var(--cg))}
.kbn-card{--d:1;--lift:0;display:flex;align-items:center;gap:12px;height:var(--ch);padding:0 16px;border-radius:14px;background:color-mix(in srgb,var(--accent) calc(var(--d) * 12%),var(--bg));box-shadow:inset 0 0 0 1px var(--line),0 calc(var(--lift) * 14px) calc(var(--lift) * 24px) -12px color-mix(in srgb,var(--ink) 55%,transparent)}
.kbn-ck{display:grid;place-items:center;flex:none;width:24px;height:24px;border-radius:50%;background:color-mix(in srgb,var(--accent) calc(var(--d) * 100%),var(--line))}
.kbn-ck svg{display:block;width:14px;height:14px;stroke:var(--accent-ink);stroke-width:2.6;fill:none;stroke-linecap:round;stroke-linejoin:round;opacity:var(--d)}
.kbn-tx{display:grid;gap:2px;min-width:0}
.kbn-tx b{font-size:16px;font-weight:700;line-height:1.25}
.kbn-tx small{font-size:13px;color:var(--muted);line-height:1.25}
.kbn-bd{display:grid;gap:20px;padding:24px;border-radius:20px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.kbn-rm{display:grid;gap:4px}
.kbn-rm span{font-size:15px;color:var(--muted)}
.kbn-rem{font-size:clamp(48px,5vw,72px);font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.kbn-svg{display:block;width:100%;height:auto;overflow:visible}
:dir(rtl) .kbn-svg{transform:scaleX(-1)}
.kbn-gr{fill:none;stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
.kbn-ideal{fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:6 6;vector-effect:non-scaling-stroke}
.kbn-act{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.kbn-dot{fill:var(--accent);stroke:var(--bg);stroke-width:3}
.kbn-lg{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 20px;font-size:14px;color:var(--muted)}
.kbn-lg li{display:inline-flex;align-items:center;gap:8px}
.kbn-lg i{display:block;width:20px;height:0;border-top:3px solid var(--accent)}
.kbn-lg li:first-child i{border-top:2px dashed var(--muted)}
.kbn.is-live .kbn-run{height:300vh}
.kbn.is-live .kbn-pin{position:sticky;top:0;height:100vh;height:100svh}
.kbn.is-live .kbn-card{position:absolute;left:0;top:0;margin:0;will-change:transform}
@media(max-width:767px){
  .kbn{--ch:56px;--cg:8px}
  .kbn-pin{gap:20px}
  .kbn-wrap{grid-template-columns:minmax(0,1fr);gap:16px}
  .kbn-colw{padding:8px;gap:8px;border-radius:14px}
  .kbn-ch{font-size:13px;padding-inline:0}
  .kbn-cnt{min-width:24px;height:24px;padding-inline:4px;font-size:13px}
  .kbn-card{gap:0;padding:0 8px;border-radius:10px}
  .kbn-ck,.kbn-tx small{display:none}
  .kbn-tx b{font-size:13px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
  .kbn-bd{grid-template-columns:auto minmax(0,1fr);align-items:center;gap:16px;padding:16px}
  .kbn-lg{display:none}
  .kbn-rem{font-size:48px}
  .kbn-rm span{font-size:14px}
  .kbn.is-live .kbn-head p{display:none}
}`,
  html:`<div class="stage"><div class="kbn"><div class="kbn-run"><div class="kbn-pin">
  <div class="kbn-head"><h2>אתם רואים בדיוק איפה עומד הפרויקט</h2><p>כל משימה בלוח עוברת מלביצוע לעבודה ועד שהיא הושלמה, והגרף מראה כמה נשאר עד העלייה לאוויר.</p></div>
  <div class="kbn-wrap">
    <div class="kbn-board">
      <section class="kbn-colw"><h3 class="kbn-ch"><span>לביצוע</span><span class="kbn-cnt">0</span></h3><ul class="kbn-list"></ul></section>
      <section class="kbn-colw"><h3 class="kbn-ch"><span>בעבודה</span><span class="kbn-cnt">0</span></h3><ul class="kbn-list"></ul></section>
      <section class="kbn-colw"><h3 class="kbn-ch"><span>הושלם</span><span class="kbn-cnt">5</span></h3><ul class="kbn-list">
        <li class="kbn-card"><span class="kbn-ck" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></span><span class="kbn-tx"><b>עיצוב דף הבית</b><small>דנה</small></span></li>
        <li class="kbn-card"><span class="kbn-ck" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></span><span class="kbn-tx"><b>כתיבת הטקסטים</b><small>יובל</small></span></li>
        <li class="kbn-card"><span class="kbn-ck" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></span><span class="kbn-tx"><b>טופס יצירת קשר</b><small>רוני</small></span></li>
        <li class="kbn-card"><span class="kbn-ck" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></span><span class="kbn-tx"><b>בדיקת נגישות</b><small>דנה</small></span></li>
        <li class="kbn-card"><span class="kbn-ck" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg></span><span class="kbn-tx"><b>העלאה לאוויר</b><small>רוני</small></span></li>
      </ul></section>
    </div>
    <aside class="kbn-bd">
      <div class="kbn-rm"><span>משימות פתוחות</span><b class="kbn-rem">0</b></div>
      <div>
        <svg class="kbn-svg" viewBox="0 0 300 160" aria-hidden="true" focusable="false">
          <path class="kbn-gr" d="M10 10H290M10 38H290M10 66H290M10 94H290M10 122H290M10 150H290"/>
          <path class="kbn-ideal" d="M10 10L290 150"/>
          <path class="kbn-act" d="M10.0 10.0 L14.7 10.0 L19.3 10.0 L24.0 10.0 L28.7 10.0 L33.3 10.0 L38.0 10.0 L42.7 10.0 L47.3 10.0 L52.0 10.0 L56.7 10.0 L61.3 10.0 L66.0 10.0 L70.7 11.6 L75.3 16.2 L80.0 24.0 L84.7 31.8 L89.3 36.4 L94.0 38.0 L98.7 38.0 L103.3 39.0 L108.0 43.0 L112.7 50.2 L117.3 58.5 L122.0 63.8 L126.7 65.9 L131.3 66.0 L136.0 66.0 L140.7 66.2 L145.3 69.0 L150.0 75.0 L154.7 83.5 L159.3 90.0 L164.0 93.4 L168.7 94.0 L173.3 94.0 L178.0 94.0 L182.7 95.6 L187.3 100.2 L192.0 108.0 L196.7 115.8 L201.3 120.4 L206.0 122.0 L210.7 122.0 L215.3 122.0 L220.0 122.0 L224.7 122.0 L229.3 122.1 L234.0 124.2 L238.7 129.5 L243.3 137.8 L248.0 145.0 L252.7 149.0 L257.3 150.0 L262.0 150.0 L266.7 150.0 L271.3 150.0 L276.0 150.0 L280.7 150.0 L285.3 150.0 L290.0 150.0"/>
          <circle class="kbn-dot" cx="290" cy="150" r="6"/>
        </svg>
        <ul class="kbn-lg"><li><i></i>תכנון</li><li><i></i>בפועל</li></ul>
      </div>
    </aside>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר מצב הסיום: כל הכרטיסים בעמודת הושלם והגרף מצויר עד אפס (במארקאפ)
  const root=document.querySelector(".kbn"),run=root.querySelector(".kbn-run"),board=root.querySelector(".kbn-board"),
    lists=[...root.querySelectorAll(".kbn-list")],cards=[...root.querySelectorAll(".kbn-card")],
    cnt=[...root.querySelectorAll(".kbn-cnt")],rem=root.querySelector(".kbn-rem"),
    act=root.querySelector(".kbn-act"),dot=root.querySelector(".kbn-dot");
  const N=cards.length,clamp=v=>Math.min(1,Math.max(0,v)),ease=gsap.parseEase("power2.inOut");
  // זמני ההתחלה של שני המעברים לכל כרטיס (A: לביצוע אל בעבודה, B: בעבודה אל הושלם), D הוא אורך מעבר
  const A=[.04,.14,.30,.44,.58],B=[.20,.32,.46,.60,.78],D=.1;
  const X=q=>10+280*q,Y=r=>10+(1-r/N)*140;
  const staticPath=act.getAttribute("d"),staticCnt=cnt.map(c=>c.textContent),staticRem=rem.textContent,
    dotX=dot.getAttribute("cx"),dotY=dot.getAttribute("cy");
  let geo=null,last=[-1,-1,-1];
  function measure(){
    // מדידה מול הלוח: ככה RTL, רוחב ומובייל לא דורשים היפוך
    const bb=board.getBoundingClientRect();
    geo={cols:lists.map(l=>{const r=l.getBoundingClientRect();return{x:r.left-bb.left,y:r.top-bb.top,w:r.width};}),
      h:cards[0].offsetHeight,gap:parseFloat(getComputedStyle(root).getPropertyValue("--cg"))||12};
    cards.forEach(c=>{c.style.width=geo.cols[0].w+"px";});
  }
  const remAt=q=>{let r=0;for(let i=0;i<N;i++)r+=1-ease(clamp((q-B[i])/D));return r;};
  function trace(p){
    const n=Math.max(1,Math.ceil(p*60));let d="M"+X(0).toFixed(1)+" "+Y(N).toFixed(1);
    for(let k=1;k<=n;k++){const q=Math.min(p,k/60);d+=" L"+X(q).toFixed(1)+" "+Y(remAt(q)).toFixed(1);}
    return d;
  }
  function paint(p){
    if(!geo)return;
    const st=geo.h+geo.gap;
    // משקלי שיוך רציפים של כל כרטיס לכל עמודה
    const W=cards.map((_,i)=>{
      const m1=clamp((p-A[i])/D),m2=clamp((p-B[i])/D),e1=ease(m1),e2=ease(m2),s=e1+e2;
      const lift=Math.max((m1>0&&m1<1)?Math.sin(Math.PI*m1):0,(m2>0&&m2<1)?Math.sin(Math.PI*m2):0);
      return{s,e2,lift,w:[Math.max(0,1-s),Math.max(0,1-Math.abs(s-1)),Math.max(0,s-1)]};
    });
    const counts=[0,0,0];
    cards.forEach((c,i)=>{
      const w=W[i].w;let x=0,y=0;
      for(let k=0;k<3;k++){
        let ahead=0;for(let j=0;j<i;j++)ahead+=W[j].w[k];   // כמה כרטיסים לפניו באותה עמודה
        x+=w[k]*geo.cols[k].x;y+=w[k]*(geo.cols[k].y+ahead*st);
      }
      c.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) rotate("+(-2*W[i].lift).toFixed(2)+"deg) scale("+(1+.03*W[i].lift).toFixed(3)+")";
      c.style.setProperty("--d",W[i].e2.toFixed(3));
      c.style.setProperty("--lift",W[i].lift.toFixed(3));
      c.style.zIndex=W[i].lift>0?2:1;
      counts[Math.round(W[i].s)]++;
    });
    counts.forEach((n,k)=>{if(last[k]!==n){last[k]=n;cnt[k].textContent=n;}});
    rem.textContent=counts[0]+counts[1];
    act.setAttribute("d",trace(p));
    dot.setAttribute("cx",X(p).toFixed(1));dot.setAttribute("cy",Y(remAt(p)).toFixed(1));
  }
  // בהפחתת תנועה הפונקציה לא רצה, ונשאר מצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");last=[-1,-1,-1];
    measure();paint(0);
    const o={p:0};
    gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    const onRefresh=()=>{measure();paint(o.p);};
    ScrollTrigger.addEventListener("refresh",onRefresh);
    return()=>{
      ScrollTrigger.removeEventListener("refresh",onRefresh);
      root.classList.remove("is-live");
      cards.forEach(c=>{["transform","width","z-index"].forEach(v=>c.style.removeProperty(v));["--d","--lift"].forEach(v=>c.style.removeProperty(v));});
      cnt.forEach((c,k)=>{c.textContent=staticCnt[k];});rem.textContent=staticRem;
      act.setAttribute("d",staticPath);dot.setAttribute("cx",dotX);dot.setAttribute("cy",dotY);
    };
  });
})();`
},
];
