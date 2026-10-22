// מהלכי מספרים וגרפים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. כל מהלך כאן נבנה מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל הנתונים בדמואים הם נתוני דוגמה. כל הגרפים מסודרים מימין לשמאל: התקופה הישנה בימין והחדשה בשמאל (ההערה בכל מהלך אומרת מה להפוך באתר משמאל לימין).
export default [
{
  id:"g213", cat:"gsap", name:"פסים ושורות דירוג שמתמלאים לערכים", tech:"GSAP · ScrollTrigger once · scaleX", status:"ממתין",
  desc:"כרטיס עם חמש שורות דירוג, ובכל אחת שם, פס ואחוז. בכניסה למסך הפסים נמתחים מימין לאורך שלהם בזה אחר זה, והאחוזים סופרים מאפס באותו קצב. המקום הראשון בצבע המותג ושאר השורות באפור, ולכן רואים מיד מי מוביל ובכמה.",
  when:"תוצאות, השוואה או דירוג עם ארבע עד שבע שורות: מאיפה הגיעו הפניות, איזה שירות הכי מבוקש, חלוקת התקציב, תוצאות סקר. סקשן הוכחה או ״במספרים״. פעם אחת בעמוד, על הנתון שהכי חשוב להראות.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם פסים אופקיים גדלים מאפס לערכים, המוביל בצבע המותג, והמספר סופר לידם. נבנה מאפס מהצפייה. מהווריאנטים (עמודות אנכיות, מד חום עם קווי סף, פסים עם טווח ביטחון) נבנה רק הפס האופקי, כי הוא הצורה שמתרגמת ישר לכרטיס באתר עסקי. **כיוון (RTL):** אין ציר זמן. הפס גדל מצד ההתחלה, שבעברית הוא ימין (`transform-origin:100% 50%`), והאחוז יושב בקצה השני. באתר משמאל לימין משנים ל-`0% 50%`. **הערך הסופי במארקאפ:** אורך הפס הוא `--s` על השורה (הערך חלקי הגבוה ביותר, כך שהמוביל מלא), ו-`transform:scaleX(var(--s))` ב-CSS. בלי GSAP ובהפחתת תנועה רואים את הפסים והאחוזים הסופיים. כשהמהלך רץ הוא מאפס את שניהם ומעלה אותם יחד, תמיד במספר שלם, ו-`clearProps` בניקוי מחזיר את ה-CSS. **נגישות:** הפסים והמספר הרץ מוסתרים מקורא מסך, ולכל שורה יש טקסט מוסתר עם הערך הסופי (״34 אחוז, 141 פניות״), כך שקורא מסך לא שומע מספרי ביניים. הרשימה היא `ol` כי הסדר הוא מידע. **ביצועים:** `scaleX` בלבד וטריגר אחד על הכרטיס, פעם אחת (`once`). **בטלפון** השם עולה מעל הפס והאחוז נשאר בקצה.",
  libs:["gsap","ScrollTrigger"],
  css:`.rk{max-width:760px;margin-inline:auto;padding:40px;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.rk-head{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:8px 16px;margin:0 0 40px}
.rk-head h3{margin:0;font-size:clamp(20px,2.1vw,28px);font-weight:700;line-height:1.2;text-wrap:balance}
.rk-head p{margin:0;color:var(--muted);font-size:15px;font-variant-numeric:tabular-nums}
.rk-list{list-style:none;margin:0;padding:0;display:grid;gap:28px}
.rk-row{position:relative;display:grid;grid-template-columns:minmax(0,176px) minmax(0,1fr) 72px;align-items:center;gap:20px}
.rk-n{font-size:var(--fs-body);font-weight:500;line-height:1.3}
.rk-t{display:block;height:18px;border-radius:6px;background:color-mix(in oklab,var(--ink) 7%,var(--card));overflow:hidden}
/* הפס גדל מצד ההתחלה (ימין בעברית). ה-scaleX הסופי כבר ב-CSS, מתוך --s שבמארקאפ */
.rk-b{display:block;height:100%;border-radius:6px;background:color-mix(in oklab,var(--ink) 30%,var(--card));transform-origin:100% 50%;transform:scaleX(var(--s,1))}
.rk-row.lead .rk-b{background:var(--accent)}
.rk-v{font-size:clamp(22px,2.2vw,30px);font-weight:600;line-height:1;text-align:end;font-variant-numeric:tabular-nums;color:var(--muted)}
.rk-row.lead .rk-v{font-weight:700;color:var(--ink)}
.rk .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){
  .rk{padding:24px 20px}.rk-head{margin-bottom:28px}.rk-list{gap:20px}
  .rk-row{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"n v" "t t";gap:10px 16px}
  .rk-n{grid-area:n}.rk-t{grid-area:t}.rk-v{grid-area:v;font-size:24px}
}`,
  html:`<div class="stage"><section class="rk" aria-labelledby="rk-h">
  <div class="rk-head"><h3 id="rk-h">מאיפה הגיעו הפניות ברבעון האחרון</h3><p>412 פניות בסך הכול</p></div>
  <ol class="rk-list">
    <li class="rk-row lead" style="--s:1"><span class="rk-n">חיפוש בגוגל</span><span class="rk-t" aria-hidden="true"><i class="rk-b"></i></span><b class="rk-v" aria-hidden="true">34%</b><span class="sr-only">34 אחוז, 141 פניות</span></li>
    <li class="rk-row" style="--s:.765"><span class="rk-n">המלצות מלקוחות</span><span class="rk-t" aria-hidden="true"><i class="rk-b"></i></span><b class="rk-v" aria-hidden="true">26%</b><span class="sr-only">26 אחוז, 107 פניות</span></li>
    <li class="rk-row" style="--s:.559"><span class="rk-n">פייסבוק ואינסטגרם</span><span class="rk-t" aria-hidden="true"><i class="rk-b"></i></span><b class="rk-v" aria-hidden="true">19%</b><span class="sr-only">19 אחוז, 78 פניות</span></li>
    <li class="rk-row" style="--s:.382"><span class="rk-n">וואטסאפ וקבוצות</span><span class="rk-t" aria-hidden="true"><i class="rk-b"></i></span><b class="rk-v" aria-hidden="true">13%</b><span class="sr-only">13 אחוז, 55 פניות</span></li>
    <li class="rk-row" style="--s:.235"><span class="rk-n">אחר</span><span class="rk-t" aria-hidden="true"><i class="rk-b"></i></span><b class="rk-v" aria-hidden="true">8%</b><span class="sr-only">8 אחוז, 31 פניות</span></li>
  </ol>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הפסים והאחוזים כבר בערך הסופי (במארקאפ)
  const root=document.querySelector(".rk"),rows=[...root.querySelectorAll(".rk-row")];
  const bars=rows.map(r=>r.querySelector(".rk-b")),vals=rows.map(r=>r.querySelector(".rk-v"));
  const to=vals.map(v=>parseInt(v.textContent,10)),sc=rows.map(r=>parseFloat(r.style.getPropertyValue("--s"))||1);
  // בהפחתת תנועה הפונקציה לא רצה, והערך הסופי מוצג מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const o=to.map(()=>({v:0})),paint=()=>vals.forEach((v,i)=>{v.textContent=Math.round(o[i].v)+"%";});
    gsap.set(bars,{scaleX:0});paint();
    const tl=gsap.timeline({paused:true,defaults:{ease:"power3.out",duration:1.1}});
    rows.forEach((r,i)=>{tl.to(bars[i],{scaleX:sc[i]},i*.09).to(o[i],{v:to[i],onUpdate:paint},i*.09);});
    const st=ScrollTrigger.create({trigger:root,start:"top 78%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set(bars,{clearProps:"transform"});vals.forEach((v,i)=>{v.textContent=to[i]+"%";});};
  });
})();`
},
{
  id:"b87", cat:"behavior", name:"טאבים שמחליפים תוכן בלוח אחד", tech:"GSAP · tablist ARIA · SVG path morph", status:"ממתין",
  desc:"כרטיס נתונים עם שלושה טאבים בראשו: 24 שעות, 12 שבועות, 12 חודשים. לחיצה על טאב מזיזה אליו את הסמן, המספר הגדול רץ לערך החדש, הקו בגרף מתעוות לצורה של התקופה החדשה, והנקודה והטולטיפ שבקצה הקו עוברים למקומם. לוח אחד, שלוש תקופות.",
  when:"תוצאות או מקרה בוחן עם נתון אחד בכמה רזולוציות: פניות, מכירות, מבקרים, זמן תגובה. סקשן הוכחה או עמוד תוצאות. מחליף שלושה גרפים נפרדים בלוח אחד שהגולש מפעיל בעצמו, ומתאים כשהתקופות מספרות סיפור שונה.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם בורר תקופות בכרטיס אנליטיקה מחליף את המספר הגדול ואת גרף הקו, ובקצה הקו נקודה וטולטיפ עם הערך. נבנה מאפס מהצפייה. **ציר הזמן מימין לשמאל:** התקופה הישנה בימין והחדשה בשמאל, כך שהקו, הנקודה והטולטיפ מסתיימים בצד השמאלי. הסקריפט קורא את `direction` של הבורר, ובאתר משמאל לימין הוא הופך לבד את כיוון הקו ואת כיוון הסמן (`--sg`), וצריך רק לסדר הפוך את שלוש התוויות שמתחת לציר. **טאבים אמיתיים:** `tablist` עם `tab` ו-`tabpanel` (שמקבל `tabindex` אפס, כי אין בו אלמנט שאפשר להתמקד בו), `aria-selected`, `tabindex` נודד, חצים (בעברית חץ שמאלה מתקדם, כי הטאב הבא משמאל), `Home` ו-`End`, ו-`:focus-visible`. יש לוח אחד ש-`aria-labelledby` שלו מתחלף. הבורר מסומן `hidden` במארקאפ והסקריפט חושף אותו, כדי שבלי JS לא יהיו פקדים שלא עובדים. **הערך הסופי במארקאפ:** בלי JS רואים את הטאב הראשון מצויר במלואו, עם המספר והטולטיפ. **המעבר בין תקופות:** לכל תקופה 12 נקודות, ולכן הקו לא מצויר מחדש אלא מתעוות: כל גובה זז לגובה החדש, והנתיב נבנה מחדש בכל פריים (Catmull-Rom לקימורים) יחד עם השטח, הנקודה והטולטיפ. המספר רץ אחרי הקו, ב-`power3.inOut`. הגבהים ב-`data-y` מנורמלים לכל תקופה בנפרד, ולכן אין ציר Y. **נגישות:** המספר הרץ והטולטיפ מוסתרים מקורא מסך, וטקסט מוסתר מתעדכן מיד עם הערך הסופי (״314 פניות ב-12 השבועות האחרונים״). בהפחתת תנועה, או בלי GSAP, המעבר מיידי. **רספונסיביות:** ה-SVG בנוי ב-`viewBox` ומתכווץ עם הקונטיינר, והוא נמתח למלוא הלוח (`preserveAspectRatio` שווה `none`) כשעובי הקו קבוע (`non-scaling-stroke`), ולכן בטלפון הלוח גבוה יותר והטולטיפ לא מכסה את הקו. הנקודה והטולטיפ הם שכבת HTML שממוקמת ביחידות קונטיינר (`cqw`), ולכן הטקסט לא מתכווץ בטלפון והטולטיפ לא יוצא מהגרף (`clamp`).",
  libs:["gsap"],
  css:`.pt{max-width:760px;margin-inline:auto;padding:32px;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.pt-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;margin:0 0 32px}
.pt-top h3{margin:0;font-size:clamp(20px,2.1vw,28px);font-weight:700;line-height:1.2}
/* שלוש לשוניות ברוחב שווה: הסמן זז ב-transform בלבד, צעד אחד לכל לשונית */
.pt-tabs{position:relative;display:grid;grid-template-columns:repeat(3,1fr);min-width:min(100%,336px);padding:4px;border-radius:999px;background:color-mix(in oklab,var(--ink) 7%,var(--card))}
.pt-tabs[hidden]{display:none}
.pt-ind{position:absolute;inset-block:4px;inset-inline-start:4px;width:calc((100% - 8px) / 3);border-radius:999px;background:var(--bg);box-shadow:0 1px 3px color-mix(in oklab,var(--ink) 22%,transparent),inset 0 0 0 1px var(--line);transform:translateX(calc(var(--i, 0) * var(--sg, -1) * 100%));transition:transform .45s cubic-bezier(.2,.6,.2,1)}
.pt-tab{position:relative;z-index:1;padding:10px 12px;border:0;border-radius:999px;background:none;color:var(--muted);font:inherit;font-size:15px;font-weight:600;white-space:nowrap;cursor:pointer;transition:color .25s cubic-bezier(.4,0,.2,1)}
.pt-tab[aria-selected="true"]{color:var(--ink)}
.pt-tab:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pt-panel{display:grid;gap:24px}
.pt-panel:focus-visible{outline:2px solid var(--accent);outline-offset:8px;border-radius:12px}
.pt-kpi{display:flex;align-items:baseline;flex-wrap:wrap;gap:12px 18px}
.pt-num{font-size:clamp(56px,8vw,96px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.pt-delta{direction:ltr;unicode-bidi:isolate;padding:6px 12px;border-radius:999px;background:color-mix(in oklab,var(--accent) 18%,var(--card));font-size:15px;font-weight:700}
.pt-cmp{color:var(--muted);font-size:15px}
.pt-plot{position:relative;aspect-ratio:600 / 280;container-type:size}
.pt-svg{position:absolute;inset:0;width:100%;height:100%}
.pt-grid line{stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
.pt-g0{stop-color:var(--accent);stop-opacity:.24}.pt-g1{stop-color:var(--accent);stop-opacity:0}
.pt-area{fill:url(#pt-fill)}
.pt-line{fill:none;stroke:var(--accent);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
/* הנקודה, הקו והטולטיפ ממוקמים ביחידות הקונטיינר: --fx ו--fy הם שברים מ-0 עד 1 */
.pt-hair{position:absolute;left:0;top:0;bottom:0;width:1px;background:color-mix(in oklab,var(--ink) 20%,transparent);translate:calc(var(--fx) * 100cqw) 0}
.pt-dot{position:absolute;left:0;top:0;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--card),0 0 0 8px color-mix(in oklab,var(--accent) 26%,transparent);translate:calc(var(--fx) * 100cqw - 50%) calc(var(--fy) * 100cqh - 50%)}
.pt-tip{position:absolute;left:0;top:0;display:grid;gap:2px;padding:8px 14px;border-radius:12px;background:var(--ink);color:var(--bg);white-space:nowrap;line-height:1.2;translate:clamp(0px, calc(var(--fx) * 100cqw - 50%), calc(100cqw - 100%)) 0}
.pt-tip b{font-size:18px;font-weight:700}
.pt-tip span{font-size:13px;opacity:.82}
.pt-ax{display:flex;justify-content:space-between;color:var(--muted);font-size:13px}
.pt .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(prefers-reduced-motion:reduce){.pt-ind,.pt-tab{transition:none}}
@media(max-width:767px){.pt{padding:20px}.pt-top{margin-bottom:24px}.pt-tabs{width:100%}.pt-plot{aspect-ratio:600 / 380}.pt-tip b{font-size:16px}}`,
  html:`<div class="stage"><section class="pt" aria-labelledby="pt-h">
  <header class="pt-top">
    <h3 id="pt-h">פניות מהאתר</h3>
    <div class="pt-tabs" role="tablist" aria-label="תקופת הנתונים" hidden>
      <span class="pt-ind" aria-hidden="true"></span>
      <button class="pt-tab" id="pt-t0" role="tab" type="button" aria-selected="true" aria-controls="pt-p" tabindex="0" data-y="0.54,0.31,0.08,0.08,0.195,0.425,0.77,1,0.655,0.54,0.885,0.655" data-sum="57" data-last="6 פניות" data-lab="בשעתיים האחרונות" data-delta="+6%" data-cmp="לעומת 24 השעות הקודמות" data-x="לפני 24 שעות|לפני 12 שעות|עכשיו" data-sr="57 פניות ב-24 השעות האחרונות">24 שעות</button>
      <button class="pt-tab" id="pt-t1" role="tab" type="button" aria-selected="false" aria-controls="pt-p" tabindex="-1" data-y="0.08,0.233,0.131,0.387,0.284,0.54,0.438,0.744,0.591,0.847,0.693,1" data-sum="314" data-last="36 פניות" data-lab="בשבוע האחרון" data-delta="+23%" data-cmp="לעומת 12 השבועות הקודמים" data-x="לפני 12 שבועות|לפני 6 שבועות|השבוע" data-sr="314 פניות ב-12 השבועות האחרונים">12 שבועות</button>
      <button class="pt-tab" id="pt-t2" role="tab" type="button" aria-selected="false" aria-controls="pt-p" tabindex="-1" data-y="0.126,0.08,0.203,0.295,0.249,0.433,0.54,0.479,0.678,0.785,0.709,1" data-sum="997" data-last="118 פניות" data-lab="בחודש האחרון" data-delta="+31%" data-cmp="לעומת 12 החודשים הקודמים" data-x="לפני שנה|לפני חצי שנה|החודש" data-sr="997 פניות ב-12 החודשים האחרונים">12 חודשים</button>
    </div>
  </header>
  <div class="pt-panel" id="pt-p" role="tabpanel" aria-labelledby="pt-t0" tabindex="0">
    <div class="pt-kpi">
      <b class="pt-num" aria-hidden="true">57</b><span class="sr-only pt-sr">57 פניות ב-24 השעות האחרונות</span>
      <span class="pt-delta">+6%</span><span class="pt-cmp">לעומת 24 השעות הקודמות</span>
    </div>
    <div class="pt-plot" style="--fx:0.0467;--fy:0.5252">
      <svg class="pt-svg" viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs><linearGradient id="pt-fill" x1="0" y1="0" x2="0" y2="1"><stop class="pt-g0" offset="0"/><stop class="pt-g1" offset="1"/></linearGradient></defs>
        <g class="pt-grid"><line x1="0" y1="112" x2="600" y2="112"/><line x1="0" y1="187" x2="600" y2="187"/><line x1="0" y1="262" x2="600" y2="262"/></g>
        <path class="pt-area" d="M572 164.1 C563.8 169.8 539 186.8 522.5 198.1 C506.1 209.5 489.6 226.5 473.1 232.2 C456.6 237.8 440.1 235 423.6 232.2 C407.2 229.3 390.7 223.6 374.2 215.1 C357.7 206.6 341.2 195.3 324.7 181.1 C308.2 166.9 291.8 144.2 275.3 130 C258.8 115.9 242.3 93.2 225.8 96 C209.3 98.8 192.8 135.7 176.4 147.1 C159.9 158.4 143.4 169.8 126.9 164.1 C110.4 158.4 93.9 115.9 77.5 113 C61 110.2 36.2 141.4 28 147.1 L28 262 L572 262 Z"/>
        <path class="pt-line" d="M572 164.1 C563.8 169.8 539 186.8 522.5 198.1 C506.1 209.5 489.6 226.5 473.1 232.2 C456.6 237.8 440.1 235 423.6 232.2 C407.2 229.3 390.7 223.6 374.2 215.1 C357.7 206.6 341.2 195.3 324.7 181.1 C308.2 166.9 291.8 144.2 275.3 130 C258.8 115.9 242.3 93.2 225.8 96 C209.3 98.8 192.8 135.7 176.4 147.1 C159.9 158.4 143.4 169.8 126.9 164.1 C110.4 158.4 93.9 115.9 77.5 113 C61 110.2 36.2 141.4 28 147.1"/>
      </svg>
      <span class="pt-hair" aria-hidden="true"></span><span class="pt-dot" aria-hidden="true"></span>
      <div class="pt-tip" aria-hidden="true"><b>6 פניות</b><span>בשעתיים האחרונות</span></div>
    </div>
    <div class="pt-ax" aria-hidden="true"><span>לפני 24 שעות</span><span>לפני 12 שעות</span><span>עכשיו</span></div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".pt"),list=root.querySelector(".pt-tabs"),tabs=[...list.querySelectorAll(".pt-tab")];
  const panel=root.querySelector(".pt-panel"),plot=root.querySelector(".pt-plot"),line=root.querySelector(".pt-line"),area=root.querySelector(".pt-area");
  const num=root.querySelector(".pt-num"),sr=root.querySelector(".pt-sr"),delta=root.querySelector(".pt-delta"),cmp=root.querySelector(".pt-cmp");
  const tip=root.querySelector(".pt-tip"),tipV=tip.querySelector("b"),tipL=tip.querySelector("span"),ax=[...root.querySelectorAll(".pt-ax span")];
  // ציר הזמן: בעברית הישן בימין והחדש בשמאל. באתר משמאל לימין הכיוון מתהפך לבד
  const rtl=getComputedStyle(list).direction==="rtl",X0=rtl?572:28,X1=rtl?28:572,TOP=96,BOT=244,BASE=262,N=12,fmt=new Intl.NumberFormat("he-IL");
  const f1=n=>Math.round(n*10)/10;
  const smooth=p=>{let d="M"+f1(p[0][0])+" "+f1(p[0][1]);for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;d+=" C"+f1(b[0]+(c[0]-a[0])/6)+" "+f1(b[1]+(c[1]-a[1])/6)+" "+f1(c[0]-(e[0]-b[0])/6)+" "+f1(c[1]-(e[1]-b[1])/6)+" "+f1(c[0])+" "+f1(c[1]);}return d;};
  const ys=t=>t.dataset.y.split(",").map(Number);
  const draw=a=>{
    const p=a.map((v,i)=>[X0+(X1-X0)*i/(N-1),BOT-v*(BOT-TOP)]),d=smooth(p);
    line.setAttribute("d",d);area.setAttribute("d",d+" L"+X1+" "+BASE+" L"+X0+" "+BASE+" Z");
    plot.style.setProperty("--fx",(p[N-1][0]/600).toFixed(4));plot.style.setProperty("--fy",(p[N-1][1]/280).toFixed(4));
  };
  const motion=()=>typeof gsap!=="undefined"&&!matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur=0,curY=ys(tabs[0]),shown=+tabs[0].dataset.sum,anim=null;
  list.hidden=false;list.style.setProperty("--sg",rtl?-1:1);draw(curY);      // הבורר נחשף רק כשיש JS
  function swapText(t){
    sr.textContent=t.dataset.sr;delta.textContent=t.dataset.delta;cmp.textContent=t.dataset.cmp;
    tipV.textContent=t.dataset.last;tipL.textContent=t.dataset.lab;t.dataset.x.split("|").forEach((s,i)=>{ax[i].textContent=s;});
  }
  function select(i,focus){
    const t=tabs[i];
    if(i!==cur){
      const from=curY.slice(),to=ys(t),sum=+t.dataset.sum;
      tabs.forEach((b,k)=>{b.setAttribute("aria-selected",k===i?"true":"false");b.tabIndex=k===i?0:-1;});
      panel.setAttribute("aria-labelledby",t.id);list.style.setProperty("--i",i);
      swapText(t);cur=i;curY=to;
      if(anim)anim.kill();
      if(motion()){
        const o={p:0,n:shown};
        anim=gsap.to(o,{p:1,n:sum,duration:.8,ease:"power3.inOut",onUpdate:()=>{
          draw(from.map((v,k)=>v+(to[k]-v)*o.p));shown=o.n;num.textContent=fmt.format(Math.round(o.n));
        }});
        gsap.fromTo(tip,{opacity:0},{opacity:1,duration:.4,delay:.35,overwrite:true});
      }else{draw(to);shown=sum;num.textContent=fmt.format(sum);}
    }
    if(focus)t.focus();
  }
  tabs.forEach((b,k)=>b.addEventListener("click",()=>select(k,false)));
  list.addEventListener("keydown",e=>{
    let i=cur;const k=e.key;
    if(k==="ArrowRight")i+=rtl?-1:1;else if(k==="ArrowLeft")i+=rtl?1:-1;      // בעברית הטאב הבא נמצא משמאל
    else if(k==="Home")i=0;else if(k==="End")i=tabs.length-1;else return;
    e.preventDefault();select((i+tabs.length)%tabs.length,true);
  });
})();`
},
{
  id:"g214", cat:"gsap", name:"סימונים ותוויות שנוספים אחד אחרי השני", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"ממתין",
  desc:"פס אחד מחולק לארבעה חלקים לפי המחיר של כל אחד. בגלילה מצטיירים סוגריים מסולסלים מתחת לכל חלק, ולידם מופיעה תווית עם השם והסכום, אחד אחרי השני. בסוף נפתח סוגר גדול אחד מעל כל הפס, והסכום הכולל סופר מאפס.",
  when:"הסבר שמורכב מכמה חלקים: מה כלול במחיר, איך מתחלקת תוכנית, שלבי פרויקט, מרכיבי שירות. סקשן מחירים, תהליך או הוכחה. שלושה עד חמישה חלקים, ולכל אחד שם קצר ומספר. הסיכום מופיע רק אחרי שהקורא ראה את החלקים.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם סוגריים מסולסלים וקווי מידה נוספים בזה אחר זה על ציר מספרים, נוסחה או תרשים, ולידם תוויות. נבנה מאפס מהצפייה. מהווריאנטים (הערות בכתב יד, חצים מעוקלים ומילה מחוקה סביב צילום מסך) נבנו רק הסוגריים וקווי המידה, כי הם הצורה שמתרגמת למחיר או לשלבים באתר עסקי. **כיוון (RTL):** הפס מסודר מימין לשמאל, החלק הראשון בימין, והסימון נחשף מימין לשמאל. באתר משמאל לימין מעבירים ב-`clip-path` את ההיסט מצד שמאל (`left`) לצד ימין, והחלק הראשון יהיה משמאל. **לא DrawSVG:** הסוגר נמתח לרוחב החלק שלו (עד פי שישה בין הצר לרחב), ולכן הוא `preserveAspectRatio=\"none\"` עם `vector-effect:non-scaling-stroke` כדי שהקו לא יתעבה, ושילוב כזה שובר את חישוב הקו המקווקו. במקומו הסימון נחשף במסכה (`clip-path` שמונפש דרך המשתנה `--w`), ונראה כמו ציור מימין לשמאל. **כל סימון בתוך העמודה שלו:** העמודות נקבעות ב-`fr` לפי הסכום, והפס, הסוגר והתווית יושבים באותה עמודה, ולכן הכול נשאר מיושר בכל רוחב, בלי שכבת SVG גלובלית. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים הכול מסומן. כשהמהלך רץ הסצנה נעוצה (`position:sticky`, `is-live`) כדי שאפשר יהיה להגיע לסוף, כמו ב-g186, ובאותו כלל ה-CSS המשתנה `--w` מאופס ל-0 (לא ב-`gsap.set`, שלא כותב משתנה שעדיין לא הוגדר). **בטלפון** התוויות הופכות לרשימה מתחת לפס, ולכל שורה ריבוע בצבע החלק שלה, כי תווית לא נכנסת מתחת לחלק של 7%. **נגישות:** הסוגריים והפס מוסתרים מקורא מסך, והתוויות והסכום הכולל הם טקסט אמיתי, כך שקורא מסך שומע את כל הפירוט.",
  libs:["gsap","ScrollTrigger"],
  css:`.an{max-width:1040px;margin-inline:auto}
.an-pin{display:grid;align-content:center;gap:40px}
.an-cap h3{margin:0 0 8px;font-size:clamp(26px,2.8vw,40px);font-weight:700;line-height:1.15;text-wrap:balance}
.an-cap p{margin:0;max-width:52ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
/* העמודות לפי הסכום: הפס, הסוגר והתווית של כל חלק באותה עמודה */
.an-grid{display:grid;grid-template-columns:minmax(0,5.15fr) minmax(0,6.43fr) minmax(0,2.24fr) minmax(0,1.03fr);column-gap:4px;align-items:start}
.c1{grid-column:1;--tone:var(--accent)}
.c2{grid-column:2;--tone:color-mix(in oklab,var(--accent) 66%,var(--card))}
.c3{grid-column:3;--tone:color-mix(in oklab,var(--accent) 40%,var(--card))}
.c4{grid-column:4;--tone:color-mix(in oklab,var(--accent) 22%,var(--card))}
.an-tl{grid-row:1;grid-column:1 / -1;display:flex;align-items:baseline;justify-content:center;flex-wrap:wrap;gap:4px 12px;margin:0;padding-bottom:12px}
.an-tn{font-size:clamp(36px,5vw,64px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.an-ts{color:var(--muted);font-size:15px}
.an-blk{grid-row:3;display:block;height:clamp(72px,9vw,112px);border-radius:12px;background:var(--tone)}
/* הסוגר נחשף במסכה מימין לשמאל: --w מ-0 עד 1 */
.an-br{display:block;width:100%;height:20px;overflow:visible;clip-path:inset(-3px 0 -3px calc((1 - var(--w, 1)) * 100%))}
.an-br path{fill:none;stroke:color-mix(in oklab,var(--ink) 74%,var(--bg));stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.an-tb{grid-row:2;grid-column:1 / -1;margin-bottom:10px;transform:scaleY(-1)}
.an-br.c1,.an-br.c2,.an-br.c3,.an-br.c4{grid-row:4;margin-top:10px}
.an-lab{grid-row:5;margin:0;display:grid;gap:2px;justify-items:center;padding-top:6px;text-align:center;line-height:1.25}
.an-lab b{font-size:17px;font-weight:700}
.an-lab span{color:var(--muted);font-size:16px;font-variant-numeric:tabular-nums}
.an .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* המהלך רץ: הסצנה נעוצה כדי שאפשר יהיה להגיע לסוף */
.an.is-live .an-run{height:340vh}
.an.is-live .an-pin{position:sticky;top:0;min-height:100vh;min-height:100svh}
.an.is-live .an-br{--w:0}
@media(max-width:767px){
  .an-pin{gap:28px}.an-blk{height:72px;border-radius:10px}
  .an-lab{grid-column:1 / -1;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);text-align:start}
  .an-lab::before{content:"";flex:none;width:14px;height:14px;border-radius:4px;background:var(--tone)}
  .an-lab b{margin-inline-end:auto}
  .an-lab.c1{grid-row:5}.an-lab.c2{grid-row:6}.an-lab.c3{grid-row:7}.an-lab.c4{grid-row:8}
}`,
  html:`<div class="stage"><div class="an"><div class="an-run"><div class="an-pin">
<figure class="an-fig" style="margin:0">
  <figcaption class="an-cap" style="margin-bottom:40px"><h3>מה כלול במחיר של אתר תדמית</h3><p>אפיון, עיצוב, פיתוח ותוכן לחמישה עמודים. ההנגשה וחודש הליווי כלולים בסכום.</p></figcaption>
  <div class="an-grid">
    <p class="an-tl"><b class="an-tn" aria-hidden="true">₪14,850</b><span class="sr-only">סך הכול 14,850 שקלים לפני מע״מ</span><span class="an-ts">סך הכול, לפני מע״מ</span></p>
    <svg class="an-br an-tb" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 1C1 6 8 8 24 8H40C47 8 50 10 50 15C50 10 53 8 60 8H76C92 8 99 6 99 1"/></svg>
    <i class="an-blk c1" aria-hidden="true"></i><i class="an-blk c2" aria-hidden="true"></i><i class="an-blk c3" aria-hidden="true"></i><i class="an-blk c4" aria-hidden="true"></i>
    <svg class="an-br c1" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 1C1 6 8 8 24 8H40C47 8 50 10 50 15C50 10 53 8 60 8H76C92 8 99 6 99 1"/></svg>
    <svg class="an-br c2" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 1C1 6 8 8 24 8H40C47 8 50 10 50 15C50 10 53 8 60 8H76C92 8 99 6 99 1"/></svg>
    <svg class="an-br c3" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 1C1 6 8 8 24 8H40C47 8 50 10 50 15C50 10 53 8 60 8H76C92 8 99 6 99 1"/></svg>
    <svg class="an-br c4" viewBox="0 0 100 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M1 1C1 6 8 8 24 8H40C47 8 50 10 50 15C50 10 53 8 60 8H76C92 8 99 6 99 1"/></svg>
    <p class="an-lab c1"><b>אפיון ועיצוב</b><span>₪5,150</span></p>
    <p class="an-lab c2"><b>פיתוח</b><span>₪6,430</span></p>
    <p class="an-lab c3"><b>תוכן והנגשה</b><span>₪2,240</span></p>
    <p class="an-lab c4"><b>ליווי חודש</b><span>₪1,030</span></p>
  </div>
</figure>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכול מסומן ומתויג (במארקאפ)
  const root=document.querySelector(".an"),run=root.querySelector(".an-run");
  const blks=[...root.querySelectorAll(".an-blk")],brs=[...root.querySelectorAll(".an-br:not(.an-tb)")],tb=root.querySelector(".an-tb");
  const labs=[...root.querySelectorAll(".an-lab")],tot=root.querySelector(".an-tl"),tn=root.querySelector(".an-tn");
  const TOTAL=14850,fmt=new Intl.NumberFormat("he-IL"),wipes=[...brs,tb];
  // בהפחתת תנועה הפונקציה לא רצה, וכל הסימונים נשארים במקומם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const o={v:0},paint=()=>{tn.textContent="₪"+fmt.format(Math.round(o.v));};
    gsap.set(blks,{opacity:.25});gsap.set([...labs,tot],{opacity:0,y:12});paint();   // opacity ולא visibility: התוויות נשארות בעץ הנגישות
    const tl=gsap.timeline({defaults:{ease:"power1.inOut"},scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    tl.to({},{duration:.4});
    brs.forEach((b,i)=>{
      const t=.4+i*1.1;
      tl.to(blks[i],{opacity:1,duration:.45},t).to(b,{"--w":1,duration:.6},t).to(labs[i],{opacity:1,y:0,duration:.45,ease:"power1.out"},t+.35);
    });
    const t=.4+brs.length*1.1;
    tl.to(tb,{"--w":1,duration:.8},t).to(tot,{opacity:1,y:0,duration:.5,ease:"power1.out"},t+.4)
      .to(o,{v:TOTAL,duration:.9,ease:"power1.out",onUpdate:paint},t+.4).to({},{duration:.7});
    return()=>{
      tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");
      gsap.set([...blks,...labs,tot],{clearProps:"opacity,transform"});wipes.forEach(w=>w.style.removeProperty("--w"));
      tn.textContent="₪"+fmt.format(TOTAL);
    };
  });
})();`
},
{
  id:"g215", cat:"gsap", name:"טולטיפ עוקב אחרי קו עם כרטיסי אירוע", tech:"GSAP · ScrollTrigger scrub · sticky · getPointAtLength", status:"ממתין",
  desc:"גרף הכנסות מצטברות, ובו קו שיער אנכי ונקודה שנעים לאורך הקו בקצב הגלילה, וטולטיפ שמראה את הסכום והיום. כשהקו עובר ליד יום של פנייה או הזמנה, כרטיס חדש מחליק פנימה לעמודה שלצד הגרף ודוחף את הקודמים צעד למטה.",
  when:"דשבורד או סקשן תוצאות שבו אירועים אמיתיים מסבירים את העלייה: פניות, הזמנות, תשלומים, הרשמות. מראה גם את הסכום וגם מה גרם לו. שלושה כרטיסים לכל היותר, וכרטיס אחד לכל קפיצה בקו.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם טולטיפ ונקודה נעים על קו הכנסות, ולצד הגרף כרטיסי התראה (פנייה חדשה, מכירה עם סכום) נכנסים זה מעל זה. נבנה מאפס מהצפייה. מהווריאנט עם תמונות ממוזערות על עקומת צמיחה נבנה רק הטולטיפ עם הכרטיסים. **ציר הזמן מימין לשמאל:** הימים הראשונים בימין והחודש מסתיים בשמאל, ליד עמודת האירועים, ולכן הטולטיפ מסיים בצד של הכרטיסים. באתר משמאל לימין מסדרים את נקודות הגרף הפוך (ההתחלה בשמאל) ומחליפים בין `X0` ל-`X1` בסקריפט. **הנקודה לא מתנתקת מהקו:** היא נקראת מ-`getPointAtLength` של אותו נתיב, והסכום והיום נגזרים ממיקומה האופקי מתוך מערך הנתונים `V`, כך שבסוף הגלילה מוצג בדיוק הסכום שבמארקאפ. הטולטיפ בנוי ב-HTML ומועבר ביחידות קונטיינר (`cqw`) עם `clamp` שמונע ממנו לצאת מהגרף. **הכרטיסים:** ב-DOM הם בסדר הסופי, החדש למעלה. בזמן הגלילה כל כרטיס נכנס כשהקו עובר ביום שלו, והישנים יורדים צעד בכל כניסה (`y` לפי גובה הכרטיס, נמדד מהמסמך ומחושב מחדש בכל `refresh`). לא צריך Flip, כי המיקומים הסופיים כבר במארקאפ. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים קו שלם, טולטיפ על הסכום הסופי ושלושה כרטיסים. כשהמהלך רץ הסצנה נעוצה (`is-live`) כדי שאפשר יהיה להגיע לסוף. **נגישות:** הטולטיפ, הנקודה והגרף מוסתרים מקורא מסך. הסכום הכולל כתוב בכותרת, והכרטיסים הם רשימה אמיתית. **בטלפון** הכרטיסים יורדים מתחת לגרף והגרף גבוה יותר (ה-SVG נמתח למלוא הלוח עם `non-scaling-stroke`), כדי שהטולטיפ לא יכסה את הקו. התמונה בכרטיס הפנייה היא תמונת הדוגמה של המאגר.",
  libs:["gsap","ScrollTrigger"],
  css:`.tt{max-width:1040px;margin-inline:auto}
.tt-card{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:32px;padding:32px;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.tt-head{margin:0 0 24px}
.tt-head h3{margin:0 0 4px;font-size:clamp(20px,2.1vw,28px);font-weight:700;line-height:1.2}
.tt-sum{margin:0;color:var(--muted);font-size:var(--fs-body);font-variant-numeric:tabular-nums}
.tt-plot{position:relative;aspect-ratio:640 / 300;container-type:size}
.tt-svg{position:absolute;inset:0;width:100%;height:100%}
.tt-grid line{stroke:var(--line);stroke-width:1;vector-effect:non-scaling-stroke}
.tt-g0{stop-color:var(--accent);stop-opacity:.22}.tt-g1{stop-color:var(--accent);stop-opacity:0}
.tt-area{fill:url(#tt-fill)}
.tt-line{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.tt-yl{position:absolute;top:var(--t);inset-inline-start:0;translate:0 -110%;color:var(--muted);font-size:13px;font-variant-numeric:tabular-nums}
/* קו השיער, הנקודה והטולטיפ ממוקמים ביחידות הקונטיינר: --fx ו--fy הם שברים מ-0 עד 1 */
.tt-hair{position:absolute;left:0;top:0;bottom:0;width:1px;background:color-mix(in oklab,var(--ink) 20%,transparent);translate:calc(var(--fx) * 100cqw) 0}
.tt-dot{position:absolute;left:0;top:0;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px var(--card),0 0 0 8px color-mix(in oklab,var(--accent) 26%,transparent);translate:calc(var(--fx) * 100cqw - 50%) calc(var(--fy) * 100cqh - 50%)}
.tt-tip{position:absolute;left:0;top:0;display:grid;gap:2px;padding:8px 14px;border-radius:12px;background:var(--ink);color:var(--bg);white-space:nowrap;line-height:1.2;translate:clamp(0px, calc(var(--fx) * 100cqw - 50%), calc(100cqw - 100%)) 0}
.tt-tip b{font-size:18px;font-weight:700;font-variant-numeric:tabular-nums}
.tt-tip span{font-size:13px;opacity:.82}
.tt-ax{display:flex;justify-content:space-between;margin-top:12px;color:var(--muted);font-size:13px;font-variant-numeric:tabular-nums}
/* עמודת האירועים: הכרטיס החדש למעלה. הגזירה מסתירה את הכרטיס בזמן שהוא נכנס מהקצה */
.tt-ev{overflow:clip;overflow-clip-margin:8px}
.tt-list{list-style:none;margin:0;padding:0;display:grid;gap:12px;align-content:start}
.tt-c{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;padding:14px 16px;border-radius:16px;background:var(--bg);box-shadow:inset 0 0 0 1px var(--line)}
.tt-c b{display:block;font-size:16px}
.tt-c small{display:block;margin-top:2px;color:var(--muted);font-size:14px;line-height:1.35}
.tt-c strong{font-size:17px;font-variant-numeric:tabular-nums}
.tt-av{display:block;width:44px;height:44px;border-radius:50%;object-fit:cover}
.tt-ic{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--accent);color:var(--accent-ink)}
.tt-ic svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.tt .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.tt.is-live .tt-run{height:320vh}
.tt.is-live .tt-pin{position:sticky;top:0;min-height:100vh;min-height:100svh;display:grid;align-content:center}
@media(max-width:767px){.tt-card{grid-template-columns:minmax(0,1fr);gap:24px;padding:20px}.tt-plot{aspect-ratio:640 / 400}.tt-tip b{font-size:16px}}`,
  html:`<div class="stage"><div class="tt"><div class="tt-run"><div class="tt-pin">
<div class="tt-card">
  <section class="tt-main" aria-labelledby="tt-h">
    <header class="tt-head"><h3 id="tt-h">הכנסות מצטברות, ספטמבר</h3><p class="tt-sum">₪78,960 עד היום</p></header>
    <div class="tt-plot" style="--fx:0.0437;--fy:0.3887">
      <svg class="tt-svg" viewBox="0 0 640 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs><linearGradient id="tt-fill" x1="0" y1="0" x2="0" y2="1"><stop class="tt-g0" offset="0"/><stop class="tt-g1" offset="1"/></linearGradient></defs>
        <g class="tt-grid"><line x1="0" y1="264" x2="640" y2="264"/><line x1="0" y1="189.3" x2="640" y2="189.3"/><line x1="0" y1="114.7" x2="640" y2="114.7"/><line x1="0" y1="40.0" x2="640" y2="40.0"/></g>
        <path class="tt-area" d="M612 260 C605 259 584.2 256.1 570.3 254.1 C556.4 252 542.5 249.8 528.6 247.9 C514.7 246.1 500.8 245.6 486.9 243 C473 240.4 459 235.2 445.1 232.3 C431.2 229.4 417.3 228.6 403.4 225.8 C389.5 223 375.6 218.3 361.7 215.7 C347.8 213.1 333.9 212.5 320 210.3 C306.1 208.1 292.2 205.9 278.3 202.4 C264.4 198.8 250.5 192.9 236.6 188.9 C222.7 184.8 208.8 181.8 194.9 177.9 C181 174 167 170.1 153.1 165.4 C139.2 160.6 125.3 155 111.4 149.6 C97.5 144.1 83.6 138.3 69.7 132.8 C55.8 127.3 35 119.3 28 116.6 L28 264 L612 264 Z"/>
        <path class="tt-line" d="M612 260 C605 259 584.2 256.1 570.3 254.1 C556.4 252 542.5 249.8 528.6 247.9 C514.7 246.1 500.8 245.6 486.9 243 C473 240.4 459 235.2 445.1 232.3 C431.2 229.4 417.3 228.6 403.4 225.8 C389.5 223 375.6 218.3 361.7 215.7 C347.8 213.1 333.9 212.5 320 210.3 C306.1 208.1 292.2 205.9 278.3 202.4 C264.4 198.8 250.5 192.9 236.6 188.9 C222.7 184.8 208.8 181.8 194.9 177.9 C181 174 167 170.1 153.1 165.4 C139.2 160.6 125.3 155 111.4 149.6 C97.5 144.1 83.6 138.3 69.7 132.8 C55.8 127.3 35 119.3 28 116.6"/>
      </svg>
      <span class="tt-yl" style="--t:63.11%" aria-hidden="true">40,000</span><span class="tt-yl" style="--t:38.22%" aria-hidden="true">80,000</span>
      <span class="tt-hair" aria-hidden="true"></span><span class="tt-dot" aria-hidden="true"></span>
      <div class="tt-tip" aria-hidden="true"><b>₪78,960</b><span>ה-30 בחודש</span></div>
    </div>
    <div class="tt-ax" aria-hidden="true"><span>1</span><span>10</span><span>20</span><span>30</span></div>
  </section>
  <aside class="tt-ev" aria-label="אירועים אחרונים">
    <ul class="tt-list">
      <li class="tt-c"><span class="tt-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div><b>הזמנה חדשה</b><small>קליניקה בהרצליה, תיקון תקרות</small></div><strong>₪8,900</strong></li>
      <li class="tt-c"><span class="tt-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><div><b>הזמנה חדשה</b><small>משפחת אביטל, ריצוף וצבע</small></div><strong>₪7,150</strong></li>
      <li class="tt-c"><img class="tt-av" src="../assets/media/dive/portrait.webp" alt="" width="44" height="44" loading="lazy" decoding="async"><div><b>פנייה חדשה</b><small>רונית כהן, שיפוץ מקלחת</small></div><span aria-hidden="true"></span></li>
    </ul>
  </aside>
</div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: הקו שלם, הטולטיפ על הסכום הסופי ושלושת הכרטיסים (במארקאפ)
  const root=document.querySelector(".tt"),run=root.querySelector(".tt-run"),plot=root.querySelector(".tt-plot");
  const path=plot.querySelector(".tt-line"),tv=plot.querySelector(".tt-tip b"),td=plot.querySelector(".tt-tip span");
  const lis=[...root.querySelectorAll(".tt-c")];      // מהחדש לישן, כמו בסדר הסופי
  const V=[2140,5330,8610,11250,16980,20470,25890,28760,33020,40250,46110,52840,61310,70280,78960],N=V.length,X0=612,X1=28,fmt=new Intl.NumberFormat("he-IL");   // X0 הוא היום הראשון (ימין), X1 האחרון (שמאל)
  const sgn=getComputedStyle(root).direction==="rtl"?-1:1,pitch=()=>lis[1].offsetTop-lis[0].offsetTop;
  const fx0=plot.style.getPropertyValue("--fx"),fy0=plot.style.getPropertyValue("--fy"),v0=tv.textContent,d0=td.textContent;
  // בהפחתת תנועה הפונקציה לא רצה, והערך הסופי מוצג מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const L=path.getTotalLength(),o={p:0};
    const place=()=>{
      const pt=path.getPointAtLength(L*o.p),u=Math.min(Math.max((X0-pt.x)/(X0-X1)*(N-1),0),N-1),k=Math.min(Math.floor(u),N-2);
      plot.style.setProperty("--fx",(pt.x/640).toFixed(4));plot.style.setProperty("--fy",(pt.y/300).toFixed(4));
      tv.textContent="₪"+fmt.format(Math.round((V[k]+(V[k+1]-V[k])*(u-k))/10)*10);td.textContent="ה-"+Math.round(2+u*2)+" בחודש";   // 15 נקודות, כל יומיים
    };
    const T0=.5,D=5,at=d=>T0+(d-2)/28*D;      // הרגע שבו הקו עובר ביום d
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    place();
    tl.to(o,{p:1,duration:D,ease:"none",onUpdate:place},T0);
    // הכרטיסים נכנסים מהקצה כשהקו עובר ביום שלהם. הכרטיס הישן יורד צעד בכל כניסה של חדש
    tl.set(lis[2],{y:()=>-2*pitch()},0).set(lis[1],{y:()=>-pitch()},0);
    const enter=(li,t)=>tl.fromTo(li,{opacity:0,x:sgn*56},{opacity:1,x:0,duration:.5,ease:"power3.out"},t);
    enter(lis[2],at(10));
    tl.to(lis[2],{y:()=>-pitch(),duration:.5,ease:"power3.inOut"},at(18));enter(lis[1],at(18));
    tl.to([lis[2],lis[1]],{y:0,duration:.5,ease:"power3.inOut"},at(26));enter(lis[0],at(26));
    tl.to({},{duration:.7});
    return()=>{
      tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");gsap.set(lis,{clearProps:"all"});
      plot.style.setProperty("--fx",fx0);plot.style.setProperty("--fy",fy0);tv.textContent=v0;td.textContent=d0;
    };
  });
})();`
},
{
  id:"g216", cat:"gsap", name:"עמודות ושורות שמחליפות מקום לפי הערכים", tech:"GSAP · ScrollTrigger scrub · sticky", status:"ממתין",
  desc:"דירוג של חמישה מקורות פניות שמתעדכן חודש אחרי חודש בגלילה. הפסים מתארכים ומתקצרים לפי הערך, השורות מחליפות מקום כשערך אחד עוקף אחר, המספרים משתנים, והמוביל הנוכחי בצבע המותג. שם החודש הגדול מתחלף בתחתית. בסוף רואים את הדירוג הנוכחי ואת הדרך שבה הגיע אליו.",
  when:"סיפור של שינוי בדירוג לאורך זמן: מקורות פניות, מוצרים רבי מכר, שירותים לפי ביקוש, מתחרים. סקשן הוכחה או תוכן. עד שבע שורות ועד שישה שלבי זמן, ולפחות כמה עקיפות כדי שיהיה מה לראות.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה (21.10.2026). באחד גרף עמודות שמסדר את עצמו מחדש כשהערכים משתנים, כשתאריך ענק מתחלף ברקע, ובשני אריחים שמטפסים בנתיבים אל קו סיום עם כתר, שעון וסטטוס שמשתנה. נבנה מאפס מהצפייה. שני הסרטונים הם אותו מהלך (דירוג שמסתדר מחדש לפי זמן), ולכן נבנה פס אופקי אחד, בלי נתיבים ובלי כתר. **הזמן:** אין ציר, והזמן מסומן בשם החודש הגדול שבפינה, שבעברית היא התחתונה שמאלית. הפסים גדלים מימין (`transform-origin:100% 50%`). באתר משמאל לימין מחליפים ל-`0% 50%` ומעבירים את החודש לימין. **הסדר מחושב בחלקות:** הדירוג של כל שורה הוא סכום של השוואות רכות מול כל שורה אחרת (smoothstep על ההפרש, בטווח של 3), ולכן שורה שעוקפת גולשת למקומה במקום לקפוץ, והמיקום הוא פונקציה טהורה של ההתקדמות, כך שגלילה אחורה עובדת. המיקום הוא `translateY` ביחס למקום הסופי במארקאפ (הפרש הדירוג כפול גובה שורה, נמדד מהמסמך ומחושב מחדש בכל `refresh`). טווח ההשוואה חייב להיות קטן מהפער הקטן ביותר בערכים הסופיים, אחרת השורות לא ינחתו ישר. **הערך הסופי במארקאפ:** השורות ב-DOM בסדר הדירוג הסופי עם האורך והמספר הסופיים ושם החודש האחרון, כך שבלי GSAP ובהפחתת תנועה רואים את הדירוג הנוכחי. **המוביל** מקבל את המחלקה `lead` ברגע שהוא עוקף, וצבעו עובר ב-CSS. **נגישות:** הפסים והמספר הרץ מוסתרים מקורא מסך, ולכל שורה טקסט מוסתר עם הערך הסופי (״71 פניות בספטמבר״). הרשימה היא `ol` בסדר הדירוג הסופי. הסצנה נעוצה (`is-live`) כדי שאפשר יהיה להגיע לסוף.",
  libs:["gsap","ScrollTrigger"],
  css:`.rc{max-width:880px;margin-inline:auto}
.rc-card{padding:40px;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.rc-head{margin:0 0 32px}
.rc-head h3{margin:0 0 8px;font-size:clamp(20px,2.1vw,28px);font-weight:700;line-height:1.2;text-wrap:balance}
.rc-head p{margin:0;color:var(--muted);font-size:15px;line-height:1.5}
.rc-list{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.rc-row{position:relative;display:grid;grid-template-columns:minmax(0,160px) minmax(0,1fr) 56px;align-items:center;gap:20px;min-height:48px}
.rc-n{font-size:var(--fs-body);font-weight:500;line-height:1.3}
.rc-t{display:block;height:36px;border-radius:10px;background:color-mix(in oklab,var(--ink) 6%,var(--card));overflow:hidden}
.rc-b{display:block;height:100%;border-radius:10px;background:color-mix(in oklab,var(--ink) 28%,var(--card));transform-origin:100% 50%;transform:scaleX(var(--s,1));transition:background-color .35s cubic-bezier(.4,0,.2,1)}
.rc-row.lead .rc-b{background:var(--accent)}
.rc-v{font-size:clamp(20px,2vw,26px);font-weight:700;line-height:1;text-align:end;font-variant-numeric:tabular-nums}
.rc-mo{margin:24px 0 0;text-align:end;font-size:clamp(48px,8vw,104px);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--muted)}
.rc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.rc.is-live .rc-run{height:420vh}
.rc.is-live .rc-pin{position:sticky;top:0;min-height:100vh;min-height:100svh;display:grid;align-content:center}
@media(max-width:767px){
  .rc-card{padding:24px 20px}.rc-list{gap:14px}
  .rc-row{grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"n v" "t t";gap:8px 16px;min-height:0}
  .rc-n{grid-area:n}.rc-t{grid-area:t;height:28px}.rc-v{grid-area:v}
}`,
  html:`<div class="stage"><div class="rc"><div class="rc-run"><div class="rc-pin">
<section class="rc-card" aria-labelledby="rc-h">
  <header class="rc-head"><h3 id="rc-h">פניות לפי מקור, מאפריל עד ספטמבר</h3><p>בספטמבר גוגל במקום הראשון, ופייסבוק, שהובילה באפריל, אחרונה.</p></header>
  <ol class="rc-list">
    <li class="rc-row lead" data-v="38,41,47,52,58,71" style="--s:1"><span class="rc-n">חיפוש בגוגל</span><span class="rc-t" aria-hidden="true"><i class="rc-b"></i></span><b class="rc-v" aria-hidden="true">71</b><span class="sr-only">71 פניות בספטמבר</span></li>
    <li class="rc-row" data-v="44,43,46,45,49,52" style="--s:.732"><span class="rc-n">המלצות מלקוחות</span><span class="rc-t" aria-hidden="true"><i class="rc-b"></i></span><b class="rc-v" aria-hidden="true">52</b><span class="sr-only">52 פניות בספטמבר</span></li>
    <li class="rc-row" data-v="21,25,31,37,42,47" style="--s:.662"><span class="rc-n">וואטסאפ וקבוצות</span><span class="rc-t" aria-hidden="true"><i class="rc-b"></i></span><b class="rc-v" aria-hidden="true">47</b><span class="sr-only">47 פניות בספטמבר</span></li>
    <li class="rc-row" data-v="29,31,28,33,35,40" style="--s:.563"><span class="rc-n">אינסטגרם</span><span class="rc-t" aria-hidden="true"><i class="rc-b"></i></span><b class="rc-v" aria-hidden="true">40</b><span class="sr-only">40 פניות בספטמבר</span></li>
    <li class="rc-row" data-v="52,49,44,41,38,36" style="--s:.507"><span class="rc-n">פייסבוק</span><span class="rc-t" aria-hidden="true"><i class="rc-b"></i></span><b class="rc-v" aria-hidden="true">36</b><span class="sr-only">36 פניות בספטמבר</span></li>
  </ol>
  <p class="rc-mo" aria-hidden="true">ספטמבר</p>
</section>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: הדירוג הסופי, השורות בסדרן והחודש האחרון (במארקאפ)
  const root=document.querySelector(".rc"),run=root.querySelector(".rc-run"),mo=root.querySelector(".rc-mo");
  const rows=[...root.querySelectorAll(".rc-row")],bars=rows.map(r=>r.querySelector(".rc-b")),vals=rows.map(r=>r.querySelector(".rc-v"));
  const D=rows.map(r=>r.dataset.v.split(",").map(Number)),K=D[0].length-1,MAX=Math.max(...D.flat());
  const M=["אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר"],pitch=()=>rows[1].offsetTop-rows[0].offsetTop;
  // דירוג רך: כל שורה סופרת כמה שורות מעליה, אבל השוואה בין ערכים קרובים (עד 3) היא חלקה, ולכן עקיפה גולשת ולא קופצת
  const soft=(vs,i)=>{let r=0;for(let j=0;j<vs.length;j++){if(j===i)continue;const u=Math.min(Math.max(((vs[j]-vs[i])/3+1)/2,0),1);r+=u*u*(3-2*u);}return r;};
  const o={p:0};let lead=-1;
  // בהפחתת תנועה הפונקציה לא רצה, והדירוג הסופי נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const render=()=>{
      const k=Math.min(Math.floor(o.p),K-1),f=o.p-k,S=pitch();
      const vs=D.map(a=>a[k]+(a[k+1]-a[k])*f);let top=0;
      vs.forEach((v,i)=>{if(v>vs[top])top=i;});
      rows.forEach((r,i)=>{
        r.style.transform="translateY("+((soft(vs,i)-i)*S).toFixed(1)+"px)";
        bars[i].style.transform="scaleX("+(vs[i]/MAX).toFixed(4)+")";vals[i].textContent=Math.round(vs[i]);
      });
      if(top!==lead){rows.forEach((r,j)=>r.classList.toggle("lead",j===top));lead=top;}
      mo.textContent=M[Math.round(o.p)];
    };
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true,onRefresh:render}});
    tl.to({},{duration:.4});
    for(let k=1;k<=K;k++)tl.to(o,{p:k,duration:1,ease:"power2.inOut",onUpdate:render}).to({},{duration:.45});
    render();
    return()=>{
      tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");o.p=0;lead=-1;
      rows.forEach((r,i)=>{r.style.transform="";bars[i].style.transform="";vals[i].textContent=D[i][K];r.classList.toggle("lead",i===0);});
      mo.textContent=M[K];
    };
  });
})();`
},
{
  id:"g217", cat:"gsap", name:"גרף קו עם פסי תקופות מסומנים", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"ממתין",
  desc:"גרף קו דק שמצויר בגלילה, ובקצהו נקודה זוהרת. כשהקו עובר על תקופה, פס שקוף נדלק מעליה ועליו תווית קצרה: פסח, עונת השיא, החופש הגדול. שני הפסים שמעל הירידות מודגשים בצבע המותג, ולצד הגרף מילה גדולה שמסכמת את הדפוס.",
  when:"סיפור של עונתיות או מגמה: פניות לפי חודש, מכירות לפי עונה, עומס בקליניקה. סקשן הוכחה, תוכן או הסבר. סדרה אחת של עשר עד שתים עשרה נקודות, ושלוש עד ארבע תקופות מסומנות שיש לכל אחת סיבה ידועה.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) שבו קו דק עם נקודה זוהרת מצטייר, ואז פסים שקופים נדלקים מעל תאריכים נבחרים, שניים מהם מעל ירידות, ומילה גדולה ליד הגרף. נבנה מאפס מהצפייה. **ציר הזמן מימין לשמאל:** אוקטובר בימין וספטמבר בשמאל. הקו מצטייר מימין, והנקודה מסיימת בשמאל. באתר משמאל לימין מסדרים את הנקודות הפוך ומחליפים בסקריפט `X0` ו-`X1`. **הציור:** הקו הוא `path` עם `pathLength=\"1\"` ו-`stroke-dasharray:1 2` (המרווח הכפול מונע נקודה בודדת בתחילת הציור), וההתקדמות היא `stroke-dashoffset`. הנקודה היא שכבת HTML שממוקמת מ-`getPointAtLength` ביחידות קונטיינר, ולכן היא מתכווצת עם הגרף ולא מתנתקת מהקו. **הפסים:** שכבת HTML עם `left` ו-`width` באחוזים מרוחב הגרף, מחושבים מאותם `viewBox` ונקודות. כל פס נדלק ברגע שהקו עובר במרכזו, והרגע מחושב בחיפוש בינארי על אורך הנתיב. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים קו שלם, שלושה פסים עם תוויות והנקודה בקצה. **נגישות:** הגרף והנקודה מוסתרים מקורא מסך. התוויות הן טקסט, ופסקה מוסתרת מתארת את הדפוס במספרים. **בטלפון** הגרף מתכווץ והתוויות יורדות לשתי שורות. הסצנה נעוצה (`is-live`) כדי שאפשר יהיה להגיע לסוף.",
  libs:["gsap","ScrollTrigger"],
  css:`.pb{max-width:1040px;margin-inline:auto}
.pb-card{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);align-items:center;gap:clamp(32px,5vw,72px)}
.pb-txt{display:grid;gap:16px}
.pb-big{margin:0;font-size:clamp(48px,7vw,96px);font-weight:700;line-height:1;letter-spacing:-.02em}
.pb-txt p{margin:0;max-width:34ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pb-chart{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:12px}
.pb-y{position:relative;min-width:28px}
.pb-y span{position:absolute;inset-inline-end:0;translate:0 -50%;color:var(--muted);font-size:13px;font-variant-numeric:tabular-nums}
.pb-y span:nth-child(1){top:16.67%}.pb-y span:nth-child(2){top:53.33%}.pb-y span:nth-child(3){top:90%}
.pb-plot{position:relative;aspect-ratio:720 / 300;container-type:size}
.pb-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.pb-grid line{stroke:var(--line);stroke-width:1}
.pb-line{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:0}
/* פסי התקופות: left ו-width באחוזים מרוחב הגרף, באותה מערכת קואורדינטות של ה-viewBox */
.pb-band{position:absolute;top:0;bottom:0;left:var(--l);width:var(--w);display:grid;justify-items:center;align-content:start;padding-top:8px;border-radius:10px;background:var(--tone)}
.pb-band span{font-size:13px;font-weight:600;line-height:1.2;text-align:center}
.is-dip{--tone:color-mix(in oklab,var(--accent) 22%,transparent)}
.is-peak{--tone:color-mix(in oklab,var(--ink) 7%,transparent)}
.pb-dot{position:absolute;left:0;top:0;z-index:2;width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in oklab,var(--accent) 24%,transparent),0 0 24px color-mix(in oklab,var(--accent) 55%,transparent);translate:calc(var(--fx) * 100cqw - 50%) calc(var(--fy) * 100cqh - 50%)}
.pb-ax{position:relative;grid-column:2;height:24px;margin-top:8px;color:var(--muted);font-size:13px}
.pb-ax span{position:absolute;top:0;left:var(--l);translate:-50% 0;white-space:nowrap}
.pb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.pb.is-live .pb-run{height:320vh}
.pb.is-live .pb-pin{position:sticky;top:0;min-height:100vh;min-height:100svh;display:grid;align-content:center}
@media(max-width:767px){.pb-card{grid-template-columns:minmax(0,1fr);gap:28px}.pb-band span{font-size:12px}.pb-line{stroke-width:4.5}}`,
  html:`<div class="stage"><div class="pb"><div class="pb-run"><div class="pb-pin">
<section class="pb-card" aria-labelledby="pb-h">
  <div class="pb-txt">
    <h3 class="pb-big" id="pb-h">עונתיות</h3>
    <p>בכל שנה הפניות יורדות סביב פסח ובחופש הגדול, ועולות שוב כמה שבועות אחר כך. כדאי לתכנן את הקמפיינים לפי זה.</p>
    <p class="sr-only">מספר הפניות בחודש, מאוקטובר עד ספטמבר: ירידה ל-63 באפריל, שיא של 97 ביוני וירידה ל-58 באוגוסט.</p>
  </div>
  <div class="pb-chart">
    <div class="pb-y" aria-hidden="true"><span>100</span><span>75</span><span>50</span></div>
    <div class="pb-plot" style="--fx:0.0278;--fy:0.6507">
      <svg class="pb-svg" viewBox="0 0 720 300" aria-hidden="true" focusable="false">
        <g class="pb-grid"><line x1="0" y1="50" x2="720" y2="50"/><line x1="0" y1="160" x2="720" y2="160"/><line x1="0" y1="270" x2="720" y2="270"/></g>
        <path class="pb-line" pathLength="1" d="M700 164.4 C689.7 166.6 658.8 171.7 638.2 177.6 C617.6 183.5 597 207.7 576.4 199.6 C555.8 191.5 535.2 149.7 514.5 129.2 C493.9 108.7 473.3 80.8 452.7 76.4 C432.1 72 411.5 80.1 390.9 102.8 C370.3 125.5 349.7 215 329.1 212.8 C308.5 210.6 287.9 114.5 267.3 89.6 C246.7 64.7 226.1 50.7 205.5 63.2 C184.8 75.7 164.2 135.8 143.6 164.4 C123 193 102.4 229.7 81.8 234.8 C61.2 239.9 30.3 201.8 20 195.2"/>
      </svg>
      <div class="pb-band is-dip" style="--l:41.41%;--w:8.59%"><span>פסח</span></div>
      <div class="pb-band is-peak" style="--l:24.24%;--w:17.17%"><span>עונת השיא</span></div>
      <div class="pb-band is-dip" style="--l:7.07%;--w:17.17%"><span>החופש הגדול</span></div>
      <span class="pb-dot" aria-hidden="true"></span>
    </div>
    <div class="pb-ax" aria-hidden="true"><span style="--l:97.2%">אוק׳</span><span style="--l:71.5%">ינו׳</span><span style="--l:45.7%">אפר׳</span><span style="--l:19.9%">יול׳</span><span style="--l:2.8%">ספט׳</span></div>
  </div>
</section>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: קו שלם, שלושה פסים עם תוויות והנקודה בקצה (במארקאפ)
  const root=document.querySelector(".pb"),run=root.querySelector(".pb-run"),plot=root.querySelector(".pb-plot");
  const line=plot.querySelector(".pb-line"),bands=[...plot.querySelectorAll(".pb-band")];
  const X0=700,X1=20,fx0=plot.style.getPropertyValue("--fx"),fy0=plot.style.getPropertyValue("--fy");   // X0 אוקטובר (ימין), X1 ספטמבר (שמאל)
  // בהפחתת תנועה הפונקציה לא רצה, והגרף המלא נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const L=line.getTotalLength(),o={p:0};
    const place=()=>{
      const pt=line.getPointAtLength(L*o.p);line.style.strokeDashoffset=1-o.p;
      plot.style.setProperty("--fx",(pt.x/720).toFixed(4));plot.style.setProperty("--fy",(pt.y/300).toFixed(4));
    };
    // ההתקדמות שבה הקו עובר במרכז הפס: חיפוש בינארי על אורך הנתיב (ה-x יורד לאורכו)
    const when=b=>{
      const cx=(parseFloat(b.style.getPropertyValue("--l"))+parseFloat(b.style.getPropertyValue("--w"))/2)/100*720;
      let a=0,z=1;for(let i=0;i<24;i++){const m=(a+z)/2;if(line.getPointAtLength(L*m).x>cx)a=m;else z=m;}return z;
    };
    const D=4,T0=.4,tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    place();
    tl.to(o,{p:1,duration:D,ease:"none",onUpdate:place},T0);
    bands.forEach(b=>tl.fromTo(b,{opacity:0},{opacity:1,duration:.5,ease:"power1.out"},T0+when(b)*D));
    tl.to({},{duration:.8});
    return()=>{
      tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");line.style.strokeDashoffset="";
      plot.style.setProperty("--fx",fx0);plot.style.setProperty("--fy",fy0);gsap.set(bands,{clearProps:"opacity"});
    };
  });
})();`
},
{
  id:"g218", cat:"gsap", name:"טקסט שמוצג כפסים בצבעים", tech:"GSAP · ScrollTrigger once · stagger", status:"ממתין",
  desc:"פסקה שלמה מוצגת כשורות של פסים מעוגלים, פס לכל מילה לפי אורכה. בכניסה למסך כל הפסים אפורים, ואז הם מקבלים את צבעם מילה אחרי מילה: מילים מוכרות בכהה, מילים ארוכות ונדירות באפור בהיר, ומונחים מקצועיים בצבע המותג. ליד הפסקה מספר שסופר את המונחים.",
  when:"ביקורת קריאות, בדיקת טקסט או הסבר איך קוראים אתר: מונחים שהלקוחות לא מכירים, מילים שדורשות הסבר, חלק מהטקסט שנקרא בפועל. סקשן הוכחה או שירות שבודק משהו בטקסט. מתאים כשצריך להראות נתון על טקסט בלי להכריח לקרוא אותו.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה (21.10.2026) שבהם פסקה מוצגת כפסים מעוגלים, מילים מוכרות בכהה ולא מוכרות בבהיר, וכמה קטעים מודגשים בצבע. נבנה מאפס מהצפייה. **הפסים הם מילים:** כל מילה היא `span` שרוחבו `--n` (מספר האותיות) כפול 9 פיקסלים, בתוך `flex` שעוטף שורות. בעברית הקריאה מימין לשמאל, ולכן הצביעה מתחילה בפינה הימנית העליונה ויורדת שורה אחר שורה. את הפסים אפשר לייצר מכל טקסט: מפצלים לפי רווחים, אורך המילה הוא `--n`, והמונחים המקצועיים מסומנים ברשימה. **המחלקות:** `k` מוכרת, `u` ארוכה ונדירה, `h` מונח מקצועי, והצבע הסופי הוא החוק ב-CSS. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה כל הפסים בצבעם הסופי והמספר הסופי. כשהמהלך רץ הסקריפט מוסיף `is-run` ומחזיר את כל הפסים לאפור, ואז מוסיף `on` מילה אחרי מילה (שלוש מאיות שנייה בין מילים). המעבר הוא `transition` של צבע ב-CSS ולא טווין של GSAP, כי GSAP לא קורא צבעים שנבנו ב-`color-mix`. המספר עולה בדיוק כשמונח מקצועי נצבע. **נגישות:** הפסים מוסתרים מקורא מסך, והפסקה המלאה והמספר הסופי כתובים בטקסט מוסתר, כך שהמשמעות לא תלויה בצבע. **בטלפון** הפסים נשברים לשורות צרות יותר והסיכום יורד מתחת ללוח.",
  libs:["gsap","ScrollTrigger"],
  css:`.tb{--tb-pale:color-mix(in oklab,var(--ink) 12%,var(--card));display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1040px;margin-inline:auto}
.tb-doc{padding:40px;border-radius:24px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.tb-doc h3{margin:0 0 28px;font-size:clamp(20px,2vw,26px);font-weight:700;line-height:1.2}
.tb-words{display:flex;flex-wrap:wrap;gap:16px 8px}
/* כל מילה היא פס: הרוחב לפי מספר האותיות, והצבע הסופי לפי המחלקה */
.tb-w{flex:none;display:block;height:14px;width:calc(var(--n) * 9px);border-radius:7px;transition:background-color .5s cubic-bezier(.4,0,.2,1)}
.tb-w.k,.tb-key .k{background:var(--ink)}
.tb-w.u,.tb-key .u{background:var(--tb-pale)}
.tb-w.h,.tb-key .h{background:var(--accent)}
.tb.is-run .tb-w:not(.on){background:var(--tb-pale)}
.tb-stat{display:grid;gap:32px}
.tb-big{margin:0;display:flex;align-items:baseline;flex-wrap:wrap;gap:8px 14px;font-size:clamp(18px,1.6vw,22px);font-weight:600;line-height:1.35}
.tb-cnt{font-size:clamp(72px,9vw,128px);font-weight:700;line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.tb-key{list-style:none;margin:0;padding:0;display:grid;gap:14px}
.tb-key li{display:flex;align-items:center;gap:14px;font-size:var(--fs-body)}
.tb-key i{flex:none;width:36px;height:12px;border-radius:6px}
.tb-key b{margin-inline-start:auto;font-variant-numeric:tabular-nums}
.tb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.tb{grid-template-columns:minmax(0,1fr);gap:32px}.tb-doc{padding:24px 20px}}`,
  html:`<div class="stage"><section class="tb" aria-labelledby="tb-h">
  <div class="tb-doc">
    <h3 id="tb-h">בדיקת קריאות של עמוד שירות</h3>
    <p class="sr-only">אנחנו מציעים פתרון אינטגרטיבי לניהול תהליכי עבודה, שמשלב אוטומציה של משימות חוזרות עם ממשק משתמש נוח. המערכת מתחברת למערכות הקיימות שלכם דרך API, ומאפשרת מעקב אחרי לידים ברמת הקמפיין. כך אפשר לראות כמה פניות הגיעו, מאיפה הן הגיעו ומה קרה איתן אחרי השיחה הראשונה. ההטמעה לוקחת שבועיים, כוללת הדרכה לצוות, ואחריה נשארים זמינים לכל שאלה. בטקסט הזה יש 7 מונחים מקצועיים שכדאי להסביר, מתוך 55 מילים.</p>
    <div class="tb-words" aria-hidden="true"><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w h" style="--n:10"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w h" style="--n:8"></span><span class="tb-w k" style="--n:2"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:2"></span><span class="tb-w h" style="--n:4"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w u" style="--n:7"></span><span class="tb-w u" style="--n:7"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w h" style="--n:3"></span><span class="tb-w u" style="--n:7"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w h" style="--n:5"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w h" style="--n:7"></span><span class="tb-w k" style="--n:2"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:2"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w k" style="--n:4"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w u" style="--n:7"></span><span class="tb-w h" style="--n:6"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w u" style="--n:7"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:5"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:6"></span><span class="tb-w k" style="--n:3"></span><span class="tb-w k" style="--n:4"></span></div>
  </div>
  <div class="tb-stat">
    <p class="tb-big"><b class="tb-cnt" aria-hidden="true">7</b><span class="sr-only">7 </span>מונחים מקצועיים שכדאי להסביר, מתוך 55 מילים</p>
    <ul class="tb-key">
      <li><i class="k"></i>מילים שכולם מכירים<b>43</b></li>
      <li><i class="u"></i>מילים ארוכות ונדירות<b>5</b></li>
      <li><i class="h"></i>מונחים מקצועיים<b>7</b></li>
    </ul>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל הפסים בצבעם הסופי והמספר הסופי (במארקאפ)
  const root=document.querySelector(".tb"),words=[...root.querySelectorAll(".tb-w")],cnt=root.querySelector(".tb-cnt");
  const total=parseInt(cnt.textContent,10);
  // בהפחתת תנועה הפונקציה לא רצה, והצבעים הסופיים נשארים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let n=0;cnt.textContent=0;root.classList.add("is-run");      // כל הפסים אפורים עד שהקטע נכנס למסך
    const tl=gsap.timeline({paused:true});
    words.forEach((w,i)=>tl.call(()=>{w.classList.add("on");if(w.classList.contains("h")){n++;cnt.textContent=n;}},null,i*.03));
    const st=ScrollTrigger.create({trigger:root,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();root.classList.remove("is-run");words.forEach(w=>w.classList.remove("on"));cnt.textContent=total;};
  });
})();`
}
]
