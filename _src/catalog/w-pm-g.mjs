// מהלכי צורות ורקעים אמביינטיים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל שכבה דקורטיבית נושאת תוכן אמיתי (כותרת, נתון, לוגו או הקלטה), כדי שהמהלך יעבוד כסקשן ולא כטפט.
// אנימציית הלוגו פוצלה לשלושה מהלכים (g227 עד g229) כי המכניקה שונה: מניפת עלים, טשטוש כיווני עם טבעת, אריח עם הקלדה.

// עלי הסמל של g227: אותה צורה, מסובבת סביב מרכז הסמל
const PETAL_O = "M60 60C71 48 72 24 60 6C48 24 49 48 60 60Z";
const PETAL_I = "M60 60C67 52 67 39 60 27C53 39 53 52 60 60Z";
const petals = (d, cls, n, off) => Array.from({ length: n }, (_, i) => `<path class="${cls}" d="${d}" transform="rotate(${off + i * (360 / n)} 60 60)"/>`).join("");

// גל הקול של b88: אמפליטודה דטרמיניסטית, כך שהמצב הסטטי והמצב החי זהים
const AW_N = 56;
const AW_AMP = (() => {
  let s = 11; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: AW_N }, (_, i) => {
    const env = .5 + .5 * Math.sin(i * .19 + .6) * Math.sin(i * .067 + 1.1);
    return Math.max(.14, Math.min(1, .16 + env * .6 * (.35 + .65 * rnd()) + .2 * Math.abs(Math.sin(i * .9))));
  });
})();
const AW_BARS = AW_AMP.map((h, i) => `<i style="--h:${h.toFixed(2)}"${i < 21 ? ' class="on"' : ""}></i>`).join("");

// עקומות ליסז'ו של b91, כפריים סטטי בלי JS: אותה נוסחה כמו בקנבס, בזמן קבוע
const LJ_SET = [[3, 2, .2], [5, 4, 1.1], [4, 3, 2.0], [5, 3, 2.7], [3, 4, 2.3], [7, 4, 1.6]];
const ljPath = (a, b, d) => {
  let p = "";
  for (let k = 0; k <= 360; k++) {
    const s = k / 360 * Math.PI * 2;
    p += (k ? "L" : "M") + (600 + 540 * Math.sin(a * s + d)).toFixed(1) + " " + (300 + 250 * Math.sin(b * s)).toFixed(1);
  }
  return p;
};
const LJ_DEFS = LJ_SET.map(([a, b, d], i) => `<path id="lj-c${i}" vector-effect="non-scaling-stroke" d="${ljPath(a, b, d)}"/>`).join("");
const LJ_USE = LJ_SET.map((_, i) => `<g class="lj-c${i % 2}"><use href="#lj-c${i}" class="lj-g"/><use href="#lj-c${i}" class="lj-m"/><use href="#lj-c${i}" class="lj-k"/></g>`).join("");

export default [
{
  id:"g227", cat:"gsap", name:"סמל שנפתח כמניפה ונעצר על הלוגו", tech:"GSAP · SVG · ScrollTrigger (replay)", status:"מאושר-עין",
  desc:"שישה עלים גדולים ושישה קטנים מונחים זה על זה כשהם מקופלים, ונפתחים כמניפה תוך כדי סיבוב עד שהם יוצרים סמל. אחרי שהסמל נעצר השם נחשף לידו מימין לשמאל והשורה התחתונה עולה מתחתיו. בסוף נשאר לוגו רגוע ושלם. כשהסקשן חוזר למסך, הכניסה רצה שוב.",
  when:"פתיחה של אתר או עמוד נחיתה, סיום של סרטון, או הלוגו בראש עמוד האודות. מתאים למותג שהסמל שלו בנוי מחזרה על אותה צורה (עלים, קרניים, טבעות). פעם אחת בעמוד. לא כמסך טעינה שמעכב את התוכן.",
  note:"**שחזור.** השראה: כמה סרטוני אנימציית לוגו ב-prompt-motion.com (21.10.2026), שבהם סמל מסתובב ונפתח מתוך צורה מקופלת ואז השם מופיע לידו. נבנה מאפס מהצפייה. **הסמל הוא SVG אחד:** שתי שכבות של שישה עלים (גדולים בזווית 0, 60 ואילך, קטנים בזווית 30, 90 ואילך) סביב נקודה אחת (60,60). GSAP מסובב כל עלה מ-0 לזווית שלו עם `stagger`, בזמן שהקבוצה כולה מסתובבת ממינוס 140 מעלות ל-0 וגדלה. הזווית הסופית של כל עלה נקראת מהמארקאפ (`transform=rotate(…)`), כך שמשנים צורה או מספר עלים במקום אחד. **מקור הסיבוב:** `svgOrigin:'60 60'` ולא `transformOrigin`, כי הוא קבוע במרחב ה-SVG ולא תלוי בגודל התיבה של העלה. **השם** נחשף ב-`clip-path` מהקצה הימני (RTL) עם הזזה קטנה, בלי פיצול לאותיות בעברית. **הערך הסופי במארקאפ:** בלי GSAP ובהפחתת תנועה רואים את הלוגו השלם מיד. **חזרה על המהלך:** ScrollTrigger מפעיל מחדש בכניסה ובחזרה מלמטה, ומאפס כשחוזרים מעל נקודת הכניסה, כך שבכל כניסה רואים אותו מההתחלה. אין איפוס ביציאה כלפי מעלה, כדי שהלוגו לא יקפוץ לאחור כשהוא עוזב את המסך. **באתר משמאל לימין** מחליפים את `inset(0 0 0 100%)` ל-`inset(0 100% 0 0)` ואת ההזזה `x:24` ל-`x:-24`. **נגישות:** הסמל `aria-hidden`, והשם והשורה התחתונה הם טקסט אמיתי.",
  libs:["gsap","ScrollTrigger"],
  css:`.pf{display:grid;place-items:center;min-height:clamp(380px,56vh,560px);padding-block:clamp(48px,6vw,96px)}
.pf-lock{display:flex;align-items:center;gap:clamp(20px,3vw,40px)}
.pf-mark{flex:none;width:clamp(112px,16vw,208px);height:auto;overflow:visible}
.pf-o{fill:var(--accent)}
.pf-i{fill:color-mix(in srgb,var(--accent) 36%,var(--bg))}
.pf-hub{fill:var(--bg)}
.pf-txt{display:grid;gap:8px}
.pf-name{margin:0;font-size:clamp(52px,7.4vw,112px);font-weight:800;line-height:1.05;letter-spacing:-.01em}
.pf-tag{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.5}
@media(max-width:767px){.pf-lock{flex-direction:column;text-align:center}.pf-txt{justify-items:center}}`,
  html:`<div class="stage"><section class="pf" aria-label="פריחה, קליניקה לטיפול משלים">
  <div class="pf-lock">
    <svg class="pf-mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g class="pf-fan">${petals(PETAL_O, "pf-o", 6, 0)}${petals(PETAL_I, "pf-i", 6, 30)}</g>
      <circle class="pf-hub" cx="60" cy="60" r="5"/>
    </svg>
    <div class="pf-txt"><p class="pf-name">פריחה</p><p class="pf-tag">קליניקה לטיפול משלים, הרצליה</p></div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP הלוגו כבר שלם (במארקאפ)
  const root=document.querySelector(".pf"),svg=root.querySelector(".pf-mark"),fan=svg.querySelector(".pf-fan"),hub=svg.querySelector(".pf-hub");
  const outer=[...svg.querySelectorAll(".pf-o")],inner=[...svg.querySelectorAll(".pf-i")];
  const name=root.querySelector(".pf-name"),tag=root.querySelector(".pf-tag");
  // הזווית הסופית של כל עלה נקראת מהמארקאפ
  const ang=els=>els.map(e=>parseFloat((e.getAttribute("transform")||"").replace("rotate(",""))||0);
  const A1=ang(outer),A2=ang(inner),O={svgOrigin:"60 60"};
  // בהפחתת תנועה הפונקציה לא רצה, והלוגו השלם מוצג מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true,defaults:{ease:"power3.out"}});
    tl.fromTo(fan,{rotation:-140,scale:.5,opacity:0,...O},{rotation:0,scale:1,opacity:1,duration:1.5,...O},0)
      .fromTo(outer,{rotation:0,...O},{rotation:i=>A1[i],duration:1.2,stagger:.07,...O},.1)
      .fromTo(inner,{rotation:0,...O},{rotation:i=>A2[i],duration:1.2,stagger:.07,...O},.35)
      .fromTo(hub,{scale:0,...O},{scale:1,duration:.6,...O},.9)
      .fromTo(name,{clipPath:"inset(0 0 0 100%)",x:24},{clipPath:"inset(0 0 0 0%)",x:0,duration:.9,ease:"power3.inOut"},1)
      .fromTo(tag,{y:12,opacity:0},{y:0,opacity:1,duration:.8},1.55)
      .set([name,tag],{clearProps:"clipPath,transform,opacity"});
    const st=ScrollTrigger.create({trigger:root,start:"top 72%",end:"bottom 12%",
      onEnter:()=>tl.restart(),onEnterBack:()=>tl.restart(),onLeaveBack:()=>tl.pause(0)});
    return()=>{st.kill();tl.progress(1).kill();};
  });
})();`
},
{
  id:"g228", cat:"gsap", name:"שם מותג שמתחדד מטשטוש תנועה וטבעת שעוברת עליו", tech:"GSAP · SVG feGaussianBlur · ScrollTrigger (replay)", status:"מאושר-עין",
  desc:"השם נכנס מטושטש לרוחב, כאילו הוא עובר מהר מדי לעין, ומתחדד לאותיות חדות בזמן שטבעת דקה עם זוהר חולפת מעליו מימין לשמאל. אחרי שהטבעת יוצאת, השורה התחתונה עולה, והשם נשאר חד. הטשטוש כיווני: רק אופקי, בלי רפרוף אנכי.",
  when:"פתיחה של עמוד נחיתה למותג עם שם קצר וחזק, מסך תודה, או כותרת של קמפיין. עובד כשהשם הוא הנכס עצמו ואין סמל נפרד. פעם אחת בעמוד, ולא על כותרות רגילות (לשם יש את css05 ו-css30).",
  note:"**שחזור.** השראה: סרטוני לוגו ב-prompt-motion.com (21.10.2026) שבהם אותיות המותג מטושטשות בתנועה ומתחדדות בזמן שטבעת אור סורקת אותן. נבנה מאפס מהצפייה. **הטשטוש הכיווני** הוא פילטר SVG אחד (`feGaussianBlur` עם `stdDeviation` של שני ערכים: אופקי, ואפס אנכי) ש-GSAP מחליק מ-46 ל-0 עם ה-attr plugin. הפילטר מופעל על המילה רק בזמן המהלך (`set` בהתחלה ו-`clearProps` בסוף), כך שהמילה הסופית לא עוברת דרך פילטר בכלל והטקסט חד בכל מסך. אזור הפילטר מורחב (`x=-30%`, `width=160%`) כדי שהטשטוש לא ייחתך בקצוות. **הטבעת** היא אלמנט CSS רגיל (`border` וצל), לא SVG, ונעה ב-`x` על רוחב המילה, שנמדד בזמן ההרצה, בלי ערך קשיח. **הערך הסופי במארקאפ:** המילה חדה, הטבעת בשקיפות 0. בלי GSAP ובהפחתת תנועה רואים את המצב הסופי. **באתר משמאל לימין** הופכים את הכיוון של הטבעת (מ-`x` חיובי ל-`x` שלילי). **לא לשים על טקסט קריאה:** מילה אחת עד שלוש.",
  libs:["gsap","ScrollTrigger"],
  css:`.rs{display:grid;place-items:center;align-content:center;gap:24px;min-height:clamp(380px,56vh,560px);padding-block:clamp(48px,6vw,96px);text-align:center}
.rs-defs{position:absolute;width:0;height:0}
.rs-w{position:relative;font-size:clamp(76px,13vw,200px);line-height:1}
.rs-word{margin:0;font-size:1em;font-weight:800;line-height:1.1;letter-spacing:-.01em}
.rs-ring{position:absolute;top:50%;left:50%;width:1.45em;height:1.45em;translate:-50% -50%;border-radius:50%;border:2px solid var(--accent);box-shadow:0 0 36px color-mix(in srgb,var(--accent) 50%,transparent),inset 0 0 28px color-mix(in srgb,var(--accent) 30%,transparent);opacity:0;pointer-events:none}
.rs-ring::after{content:"";position:absolute;inset:12%;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent)}
.rs-tag{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.5}`,
  html:`<div class="stage"><section class="rs" aria-label="אופק, הנהלת חשבונות לעסקים קטנים">
  <svg class="rs-defs" width="0" height="0" aria-hidden="true" focusable="false"><filter id="rs-blur" x="-30%" y="-20%" width="160%" height="140%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="0 0"/></filter></svg>
  <div class="rs-w"><p class="rs-word">אופק</p><i class="rs-ring" aria-hidden="true"></i></div>
  <p class="rs-tag">הנהלת חשבונות לעסקים קטנים</p>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP המילה חדה והטבעת שקופה (במארקאפ)
  const root=document.querySelector(".rs"),word=root.querySelector(".rs-word"),ring=root.querySelector(".rs-ring"),tag=root.querySelector(".rs-tag");
  const blur=root.querySelector("#rs-blur feGaussianBlur"),W=()=>word.offsetWidth;
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true});
    tl.set(word,{filter:"url(#rs-blur)"},0)
      .fromTo(blur,{attr:{stdDeviation:"46 0"}},{attr:{stdDeviation:"0 0"},duration:1.4,ease:"power3.out"},0)
      .fromTo(word,{opacity:0,scale:1.06},{opacity:1,scale:1,duration:.7,ease:"power2.out"},0)
      .fromTo(ring,{x:()=>W()*.75,scale:.55},{x:()=>-W()*.75,scale:1.15,duration:1.5,ease:"power2.inOut"},.05)
      .fromTo(ring,{opacity:0},{opacity:1,duration:.3,ease:"none"},.05)
      .to(ring,{opacity:0,duration:.45,ease:"none"},1.1)
      .fromTo(tag,{y:10,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out"},1.25)
      .set(word,{clearProps:"filter,transform,opacity"})
      .set(tag,{clearProps:"transform,opacity"});
    const st=ScrollTrigger.create({trigger:root,start:"top 72%",end:"bottom 12%",
      onEnter:()=>tl.invalidate().restart(),onEnterBack:()=>tl.invalidate().restart(),onLeaveBack:()=>tl.pause(0)});
    return()=>{st.kill();tl.progress(1).kill();blur.setAttribute("stdDeviation","0 0");word.style.filter="";};
  });
})();`
},
{
  id:"g229", cat:"gsap", name:"לוגו שמתכווץ לאריח והשם נכתב לידו", tech:"GSAP · steps ease · ScrollTrigger (replay)", status:"מאושר-עין",
  desc:"אות המותג מופיעה גדולה במרכז על אריח צבעוני, מתכווצת ונעה לפינת השורה כמו אייקון של אפליקציה, ואז השם נכתב לידה בצעדים עם סמן מהבהב. בסוף הסמן נעלם והשורה התחתונה עולה. השם עצמו הוא טקסט אחד, לא אותיות נפרדות.",
  when:"מוצר דיגיטלי, אפליקציה, מערכת הזמנות או כל מותג שיש לו אייקון. פתיחה של הירו, מסך תודה או כותרת ברכה. עובד כשהאייקון והשם הם שני חלקים של אותו לוגו. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטוני לוגו ב-prompt-motion.com (21.10.2026) שבהם האות מתכווצת לאריח אפליקציה והשם מוקלד אחריה עם סמן. נבנה מאפס מהצפייה. **ההקלדה בלי פיצול:** המילה נחשפת ב-`clip-path` עם `ease:'steps(5)'` (מספר הצעדים הוא מספר האותיות, ונקרא מהטקסט), והסמן נע באותו ערך ובאותו ease, כך שהוא תמיד בקצה החשוף. בעברית לא מפצלים לאותיות, ולכן אין `SplitText`. **האריח מתכווץ ממרכז השורה:** ה-`x` ההתחלתי נמדד מרוחב השורה פחות רוחב האריח, בזמן ההרצה, בלי ערך קשיח, ו-`invalidate()` לפני כל חזרה מחשב אותו מחדש אחרי שינוי גודל. **הערך הסופי במארקאפ:** האריח במקומו, המילה שלמה, הסמן שקוף. בלי GSAP ובהפחתת תנועה רואים את המצב הסופי. **באתר משמאל לימין** מחליפים את `sgn` ל-1 ואת `inset(0 0 0 100%)` ל-`inset(0 100% 0 0)`. **האות על האריח** אפשר להחליף בסמל SVG.",
  libs:["gsap","ScrollTrigger"],
  css:`.tw{display:grid;place-items:center;min-height:clamp(380px,56vh,560px);padding-block:clamp(48px,6vw,96px)}
.tw-lock{display:flex;align-items:center;gap:clamp(16px,2.4vw,32px)}
.tw-tile{flex:none;display:grid;place-items:center;width:clamp(72px,10vw,128px);aspect-ratio:1;border-radius:24%;background:var(--accent);color:var(--accent-ink)}
.tw-tile b{font-size:clamp(44px,6.4vw,84px);font-weight:800;line-height:1}
.tw-txt{display:grid;gap:8px}
.tw-name{position:relative;width:max-content;margin:0;font-size:clamp(48px,7.5vw,112px);font-weight:800;line-height:1.05}
.tw-caret{position:absolute;inset-block:14% 10%;inset-inline-start:0;width:3px;border-radius:2px;background:var(--accent);opacity:0}
.tw-tag{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.5}`,
  html:`<div class="stage"><section class="tw" aria-label="תורנו, קביעת תורים לעסקים קטנים">
  <div class="tw-lock">
    <span class="tw-tile" aria-hidden="true"><b>ת</b></span>
    <div class="tw-txt">
      <p class="tw-name"><span class="tw-word">תורנו</span><i class="tw-caret" aria-hidden="true"></i></p>
      <p class="tw-tag">קביעת תורים לעסקים קטנים</p>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP הלוגו כבר במצבו הסופי
  const root=document.querySelector(".tw"),lock=root.querySelector(".tw-lock"),tile=root.querySelector(".tw-tile");
  const word=root.querySelector(".tw-word"),caret=root.querySelector(".tw-caret"),tag=root.querySelector(".tw-tag");
  const sgn=getComputedStyle(root).direction==="rtl"?-1:1,W=()=>word.offsetWidth,steps="steps("+(word.textContent.trim().length)+")";
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true});
    tl.fromTo(tile,{scale:2.4,x:()=>sgn*(lock.offsetWidth-tile.offsetWidth)/2,opacity:0},{opacity:1,duration:.5,ease:"power2.out"},0)
      .to(tile,{scale:1,x:0,duration:1,ease:"power3.inOut"},.7)
      .fromTo(word,{clipPath:"inset(0 0 0 100%)"},{clipPath:"inset(0 0 0 0%)",duration:.9,ease:steps},1.75)
      .fromTo(caret,{x:0},{x:()=>sgn*W(),duration:.9,ease:steps},1.75)
      .set(caret,{opacity:1},1.75)
      .fromTo(caret,{opacity:1},{opacity:0,duration:.22,repeat:4,yoyo:true,ease:"none",immediateRender:false},2.7)
      .fromTo(tag,{y:12,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out"},2.9)
      .set(word,{clearProps:"clipPath"}).set(tile,{clearProps:"transform,opacity"}).set(tag,{clearProps:"transform,opacity"});
    const st=ScrollTrigger.create({trigger:root,start:"top 72%",end:"bottom 12%",
      onEnter:()=>tl.invalidate().restart(),onEnterBack:()=>tl.invalidate().restart(),onLeaveBack:()=>tl.pause(0)});
    return()=>{st.kill();tl.progress(1).kill();gsap.set(caret,{clearProps:"all"});};
  });
})();`
},
{
  id:"g230", cat:"gsap", name:"נקודה שנמתחת לקו, למישור ולכרטיס בפרספקטיבה", tech:"GSAP · ScrollTrigger scrub · sticky · CSS 3D", status:"מאושר-עין",
  desc:"נקודה אחת עם טבעת שמתרחבת סביבה נמתחת לקו דק, הקו מתרחב למישור, והמישור נשכב בפרספקטיבה כשהמילה שעליו מחליקה לאורך המשטח המשופע ונשארת נטויה יחד איתו. הכול בקצב הגלילה: גוללים קדימה והצורה מתפתחת, גוללים אחורה והיא חוזרת לנקודה. ליד הצורה יושבים כותרת ופסקה שנשארות במקומן.",
  when:"פתיחה של סקשן שמסביר שיטת עבודה או תהליך: תכנון, אפיון, בנייה. הצורה אומרת שמתחילים מדבר קטן ובונים ממנו. מתאים לסטודיו, משרד הנדסה, ייעוץ או כל שירות שיש לו שיטה. פעם אחת בעמוד, בפתיחת החלק של דרך העבודה.",
  note:"**שחזור.** השראה: שני סרטונים ב-prompt-motion.com (21.10.2026) שבהם נקודה הופכת לקו, למישור ולכרטיס מוטה עם מילה עליו. נבנה מאפס מהצפייה. **שני עטיפות לצורה:** `.dp-tilt` מקבל רק `rotationX` ו-`.dp-obj` רק סיבוב במסך, כי GSAP מרכיב את הסיבוב בסדר קבוע (סיבוב במסך מבחוץ, הטיה פנימה) ולכן סיבוב על אותו אלמנט נראה כמו מישור שמסתובב במסך ולא כמו מישור שמוטה אחרי שסובב. הפרספקטיבה היא `perspective` ב-CSS על הבמה. **המילה על המשטח** היא ילד של המישור, כך שהיא חולקת איתו את כל ההטיה, והיא מחליקה ב-`x` בתוך המשטח, כלומר לאורך הכיוון המשופע. הרקע של המישור (`.dp-bg`) הוא האלמנט שנמתח ב-`scaleX` ואחר כך ב-`scaleY`, כדי שהמילה לא תימעך יחד איתו. **הערך הסופי ב-CSS:** הכרטיס המוטה עם המילה. בלי GSAP ובהפחתת תנועה רואים אותו מיד, בלי גלילה מוארכת. **כשהמהלך רץ** נוספת `is-live`, והמסלול מוארך ל-340vh עם במה נעוצה (`position:sticky`), כך שאפשר להגיע למצב הסופי. **בטלפון** הבמה נעוצה למעלה והטקסט מתחתיה. **באתר משמאל לימין** מחליפים את סימן ה-`x` של המילה ואת זווית הסיבוב. **תמיד מילה אחת או כותרת קצרה על המישור.**",
  libs:["gsap","ScrollTrigger"],
  css:`.dp-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1100px;min-height:clamp(420px,70vh,640px);margin-inline:auto}
.dp.is-live .dp-track{height:340vh}
.dp.is-live .dp-pin{position:sticky;top:0;height:100vh;height:100svh;min-height:0}
.dp-txt h2{margin:0 0 16px;font-size:clamp(30px,3.4vw,52px);line-height:1.12;text-wrap:balance}
.dp-txt p{margin:0;max-width:38ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.dp-scene{display:grid;place-items:center;perspective:1200px;min-height:clamp(260px,40vw,460px)}
.dp-scene>*{grid-area:1/1}
.dp-tilt{transform:rotateX(58deg)}
.dp-obj{position:relative;display:grid;place-items:center;width:min(440px,78vw);aspect-ratio:16 / 10;transform:rotate(-26deg)}
.dp-bg{position:absolute;inset:0;border-radius:24px;background:var(--accent)}
.dp-label{position:relative;padding:8px 24px;border-radius:16px;background:var(--accent);font-size:clamp(40px,6vw,84px);font-weight:800;line-height:1;color:var(--accent-ink)}
.dp-dot,.dp-ring{width:20px;height:20px;border-radius:50%;opacity:0}
.dp-dot{background:var(--accent)}
.dp-ring{border:2px solid var(--accent)}
@media(max-width:767px){
  .dp-pin{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;align-content:center;gap:16px}
  .dp-scene{order:-1;min-height:240px}
  .dp-obj{width:min(300px,70vw)}
}`,
  html:`<div class="stage"><section class="dp">
  <div class="dp-track"><div class="dp-pin">
    <div class="dp-txt"><h2>בונים תוכנית עבודה לפני שמניחים את הקיר הראשון</h2><p>בפגישה הראשונה אנחנו מגדירים מה חשוב לכם, אחר כך מתכננים שלבים ותקציב, ורק אז יוצאים לביצוע. כך אין הפתעות באמצע.</p></div>
    <div class="dp-scene" aria-hidden="true">
      <i class="dp-ring"></i><i class="dp-dot"></i>
      <div class="dp-tilt"><div class="dp-obj"><span class="dp-bg"></span><span class="dp-label">תכנון</span></div></div>
    </div>
  </div></div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP נשאר הכרטיס המוטה (ב-CSS)
  const root=document.querySelector(".dp"),track=root.querySelector(".dp-track");
  const dot=root.querySelector(".dp-dot"),ring=root.querySelector(".dp-ring"),tilt=root.querySelector(".dp-tilt");
  const obj=root.querySelector(".dp-obj"),bg=root.querySelector(".dp-bg"),label=root.querySelector(".dp-label");
  const sgn=getComputedStyle(root).direction==="rtl"?1:-1;   // המילה נכנסת מצד תחילת הקריאה
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    gsap.set(bg,{scaleX:0,scaleY:.012});gsap.set(label,{opacity:0});
    gsap.set(tilt,{rotationX:0});gsap.set(obj,{rotation:0});
    const tl=gsap.timeline({defaults:{ease:"power2.inOut"},
      scrollTrigger:{trigger:track,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.fromTo(dot,{scale:0,opacity:0},{scale:1,opacity:1,duration:1,ease:"power2.out"},0)
      .fromTo(ring,{scale:.8,opacity:.7},{scale:3.4,opacity:0,duration:1.6,ease:"power1.out"},.5)
      .to(dot,{opacity:0,scale:.5,duration:.8},2.4)
      .to(bg,{scaleX:1,duration:2.6},2)
      .to(bg,{scaleY:1,duration:2.4},4.8)
      .to(tilt,{rotationX:58,duration:3},7.2)
      .to(obj,{rotation:-26,duration:3},7.2)
      .fromTo(label,{opacity:0,x:()=>sgn*160},{opacity:1,x:0,duration:2.2,ease:"power2.out"},8)
      .to({},{duration:1});
    return()=>{root.classList.remove("is-live");tl.scrollTrigger&&tl.scrollTrigger.kill();tl.kill();gsap.set([dot,ring,bg,label,tilt,obj],{clearProps:"all"});};
  });
})();`
},
{
  id:"b88", cat:"behavior", name:"גל קול שמתמלא עם הנגן", tech:"DOM · rAF · role=slider · מוכן ל-audio.currentTime", status:"מאושר-עין", runway:false,
  desc:"כרטיס הקלטה עם תמונת הדוברת, שם ושורת פתיחה, ומתחתיה גל קול של חמישים ושישה עמודים דקים. כשלוחצים על ההפעלה, העמודים מתמלאים בצבע המותג בקצב ההקלטה, העמודים סביב נקודת ההשמעה פועמים, מונה הזמן רץ וקו ההתקדמות נמלא. אפשר ללחוץ או לגרור על הגל כדי לקפוץ, ובמקלדת עם החצים. מתחת מופיע תמלול קצר.",
  when:"פודקאסט, דוגמית קול, הקלטה של לקוח מרוצה, הודעה קולית של בעל העסק או ציטוט מוקלט. עובד כשיש הקלטה קצרה אמיתית (עד חצי דקה), כי הגל הוא ההבטחה שיש מה לשמוע. לא כקישוט בלי שמע.",
  note:"**שחזור.** השראה: כמה סרטוני נגן שמע ב-prompt-motion.com (21.10.2026): גל קול שמתמלא עם ראש ההשמעה, פס נגן עם מונה, ועמודים שפועמים בשיא. נבנה מאפס מהצפייה. **הגל הוא שורת `<i>` רגילה** (56 עמודים, גובה מ-`--h` על כל אחד), לא קנבס, ולכן המצב הסטטי והחי זהים, הצבעים באים מהטוקנים, ובלי JS רואים גל מלא למחצה. כל עמוד מקבל `.on` כשראש ההשמעה עבר אותו. **הדגמה:** ההשמעה מדומה בשעון (`performance.now`), כדי שהפריט יעבוד בלי קובץ שמע. **חיבור לשמע אמיתי:** מחליפים את השעון ב-`audio.currentTime` ומפעילים `set(audio.currentTime)` בכל `timeupdate` (ובמקום `play` ו-`stop` קוראים ל-`audio.play()` ול-`audio.pause()`); האורך נקרא מ-`audio.duration`. **הפעימה** היא `scaleY` רק על כשנים עשר העמודים סביב ראש ההשמעה, כך שבכל פריים מתעדכנים לכל היותר שנים עשר אלמנטים. הלולאה רצה רק כשההקלטה מנגנת והכרטיס על המסך, ובהפחתת תנועה אין פעימה (ההשמעה והמילוי נשארים, כי הם פונקציה). **נגישות:** הגל הוא `role=slider` עם `aria-valuenow` ו-`aria-valuetext`, ניתן למיקוד, וחצים, Home, End ורווח עובדים. **RTL:** המילוי מתחיל מימין, והחץ השמאלי מקדם. באתר משמאל לימין הכול מתהפך לבד לפי `direction`, וקו ההתקדמות מתחיל משמאל (מחליפים `transform-origin`).",
  libs:[],
  css:`.aw{display:grid;place-items:center;padding-block:clamp(24px,4vw,64px)}
.aw-card{display:grid;gap:24px;width:min(760px,100%);padding:clamp(20px,3vw,32px);border-radius:24px;background:var(--card);box-shadow:0 16px 48px color-mix(in srgb,var(--ink) 9%,transparent)}
.aw-who{display:flex;align-items:center;gap:16px}
.aw-ava{flex:none;width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 30%}
.aw-title{margin:0;font-size:clamp(20px,2vw,26px);font-weight:700;line-height:1.25}
.aw-by{margin:4px 0 0;color:var(--muted);font-size:15px}
.aw-row{display:flex;align-items:center;gap:20px}
.aw-play{flex:none;display:grid;place-items:center;width:56px;height:56px;border:0;border-radius:50%;background:var(--accent);color:var(--accent-ink);cursor:pointer;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
.aw-play svg{width:22px;height:22px;fill:currentColor}
.aw-play .i-pause,.aw-play[aria-pressed="true"] .i-play{display:none}
.aw-play[aria-pressed="true"] .i-pause{display:block}
@media (hover:hover) and (pointer:fine){.aw-play:hover{transform:scale(1.06)}}
.aw-play:focus-visible,.aw-bars:focus-visible{outline:2px solid var(--ink);outline-offset:4px;border-radius:12px}
.aw-play:focus-visible{border-radius:50%}
.aw-bars{flex:1;min-width:0;display:flex;align-items:center;gap:4px;height:88px;cursor:pointer;touch-action:none}
.aw-bars i{flex:1;min-width:2px;height:calc(var(--h) * 100%);border-radius:99px;background:color-mix(in srgb,var(--muted) 38%,transparent);transition:background-color .2s cubic-bezier(.2,.6,.2,1)}
.aw-bars i.on{background:var(--accent)}
.aw-time{flex:none;min-width:88px;margin:0;color:var(--muted);font-size:15px;font-variant-numeric:tabular-nums;direction:ltr;unicode-bidi:isolate;text-align:end}
.aw-line{display:block;height:4px;border-radius:99px;background:color-mix(in srgb,var(--muted) 24%,transparent);overflow:hidden}
.aw-line i{display:block;height:100%;border-radius:99px;background:var(--accent);transform-origin:right center;transform:scaleX(var(--p,.375))}
.aw-quote{margin:0;max-width:56ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
@media(max-width:767px){
  .aw-row{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"p t" "b b";gap:16px}
  .aw-play{grid-area:p}.aw-time{grid-area:t;text-align:start}.aw-bars{grid-area:b;height:72px}
}`,
  html:`<div class="stage"><section class="aw" aria-label="הקלטה לדוגמה">
  <div class="aw-card">
    <div class="aw-who">
      <img class="aw-ava" src="../assets/media/dive/portrait.webp" alt="" width="56" height="56" loading="lazy" decoding="async">
      <div><p class="aw-title">איך מתחילים שיפוץ בלי להסתבך</p><p class="aw-by">נועה, מעצבת פנים · דוגמית קול</p></div>
    </div>
    <div class="aw-row">
      <button class="aw-play" type="button" aria-label="נגן" aria-pressed="false">
        <svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        <svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>
      </button>
      <div class="aw-bars" role="slider" tabindex="0" aria-label="מיקום בהקלטה" aria-valuemin="0" aria-valuemax="24" aria-valuenow="9" aria-valuetext="9 שניות מתוך 24">${AW_BARS}</div>
      <p class="aw-time" aria-hidden="true"><span class="aw-now">0:09</span> / <span>0:24</span></p>
    </div>
    <span class="aw-line" aria-hidden="true"><i></i></span>
    <p class="aw-quote">“הדבר הראשון שאני שואלת בפגישה הוא איך אתם רוצים להרגיש כשאתם נכנסים הביתה.”</p>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".aw"),btn=root.querySelector(".aw-play"),box=root.querySelector(".aw-bars");
  const bars=[...box.children],now=root.querySelector(".aw-now"),card=root.querySelector(".aw-card");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,rtl=getComputedStyle(root).direction==="rtl";
  const DUR=+box.getAttribute("aria-valuemax")||24,N=bars.length;
  let t=+box.getAttribute("aria-valuenow")||0,playing=false,base=0,t0=0,vis=true,raf=0,sec=-1,drag=false;
  const fmt=s=>Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");
  // כאן מחברים שמע אמיתי: set(audio.currentTime) בכל timeupdate
  function set(s){
    t=Math.max(0,Math.min(DUR,s));
    const k=Math.round(t/DUR*N);
    bars.forEach((b,i)=>b.classList.toggle("on",i<k));
    now.textContent=fmt(t);card.style.setProperty("--p",(t/DUR).toFixed(4));
    const w=Math.floor(t);
    if(w!==sec){sec=w;box.setAttribute("aria-valuenow",w);box.setAttribute("aria-valuetext",w+" שניות מתוך "+DUR);}
  }
  // פעימה: רק העמודים סביב נקודת ההשמעה, ולא בהפחתת תנועה
  let lit=[];
  function pulse(ts){
    lit.forEach(i=>{bars[i].style.transform="";});lit=[];
    if(reduced||!playing)return;
    const k=Math.round(t/DUR*N);
    for(let i=Math.max(0,k-6);i<=Math.min(N-1,k+5);i++){
      const f=1+.38*Math.sin(ts/110-i*.9)*Math.max(0,1-Math.abs(i-k)/6);
      bars[i].style.transform="scaleY("+f.toFixed(3)+")";lit.push(i);
    }
  }
  function frame(ts){
    raf=0;if(!playing)return;
    set(base+(performance.now()-t0)/1000);pulse(ts);
    if(t>=DUR){stop();return;}
    if(vis)raf=requestAnimationFrame(frame);
  }
  function play(){
    if(t>=DUR-.05)set(0);
    base=t;t0=performance.now();playing=true;
    btn.setAttribute("aria-pressed","true");btn.setAttribute("aria-label","השהה");
    if(!raf)raf=requestAnimationFrame(frame);
  }
  function stop(){
    playing=false;if(raf)cancelAnimationFrame(raf);raf=0;pulse(0);
    btn.setAttribute("aria-pressed","false");btn.setAttribute("aria-label","נגן");
  }
  function seek(s){set(s);if(playing){base=t;t0=performance.now();}}
  const at=e=>{const r=box.getBoundingClientRect();let f=(e.clientX-r.left)/r.width;if(rtl)f=1-f;seek(Math.max(0,Math.min(1,f))*DUR);};
  btn.addEventListener("click",()=>playing?stop():play());
  box.addEventListener("pointerdown",e=>{drag=true;box.setPointerCapture(e.pointerId);at(e);});
  box.addEventListener("pointermove",e=>{if(drag)at(e);});
  box.addEventListener("pointerup",()=>{drag=false;});
  box.addEventListener("pointercancel",()=>{drag=false;});
  box.addEventListener("keydown",e=>{
    const fwd=rtl?"ArrowLeft":"ArrowRight",back=rtl?"ArrowRight":"ArrowLeft";
    if(e.key===fwd||e.key==="ArrowUp")seek(t+2);
    else if(e.key===back||e.key==="ArrowDown")seek(t-2);
    else if(e.key==="Home")seek(0);
    else if(e.key==="End")seek(DUR);
    else if(e.key===" "||e.key==="Enter")playing?stop():play();
    else return;
    e.preventDefault();
  });
  // הלולאה נעצרת כשהכרטיס מחוץ למסך, והשעון ממשיך, כך שהמילוי נכון כשחוזרים
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&playing&&!raf)raf=requestAnimationFrame(frame);},{rootMargin:"20% 0px"}).observe(root);
  set(t);
})();`
},
{
  id:"b89", cat:"behavior", name:"פסי דיתר ונקודות הלפטון שנושמות מאחורי נתונים", tech:"Canvas 2D · ordered dither · halftone · CSS fallback", status:"מאושר-עין", runway:false,
  desc:"פס כהה במרכז הסקשן ומעליו ומתחתיו פסי דיתר שמתדללים מכהה לבהיר בריבועים קטנים, כמו הדפס. בתוך הפס נקודות הלפטון בגדלים משתנים מרכיבות כתמים רכים בפינות ומאחורי כל נתון, ונושמות לאט. הכותרת והנתונים נשארים קריאים מעל, והעמוד מקבל גרגר ותחושה של נייר מודפס.",
  when:"סקשן נתונים, ״מי אנחנו״ או מפריד בין חלקי עמוד, באתר שיש בו הרבה משטחים חלקים ורוצים בו גרגר. מתאים למשרדי הנדסה, הוצאות לאור, סטודיו, מותגי מזון ואמנות. לא מתחת לטקסט ארוך, ולא יותר מפעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) עם פסי דיתר וכתמי נקודות הלפטון שנותנים לסצנה שטוחה גרגר של דפוס. נבנה מאפס מהצפייה. **שתי טכניקות בקנבס אחד:** (1) דיתר מסודר: מטריצת Bayer בגודל 4 על 4, וכל ריבוע נדלק כשערך הגרדיאנט (שגדל מקצה הפס אל הפס הכהה) גדול מהסף שלו, ועליו גל איטי שמזיז את הסף ויוצר נשימה. (2) הלפטון: רשת נקודות מוסטת בכל שורה, ורדיוס כל נקודה נקבע משדה רך (סכום גאוסיאנים סביב הפינות וסביב כל נתון, שמיקומם נמדד מה-DOM). **קל:** כל שכבה היא מסלול אחד שנצבע פעם אחת, ללא סינון רדיוס מתחת ל-0.5 פיקסל, DPR עד 2, פריים כל 50 מילישניות, ולולאה רק כשהסקשן על המסך. הצבעים נקראים מהטוקנים (`--ink`, `--bg`) בזמן ריצה. **בלי JS ובהפחתת תנועה:** בלי JS רואים תבנית נקודות ב-CSS (`radial-gradient` עם מסכה), ובהפחתת תנועה מצויר פריים אחד בקנבס. הם מתחלפים בהצלבה עם `is-on`. **RTL:** אין כיוון בתנועה. הכתם הראשון בפינת תחילת הקריאה. **נגישות:** כל הרקע `aria-hidden`, ובתוך הפס רק טקסט אמיתי, בניגודיות של `--bg` על `--ink`.",
  libs:[],
  css:`.ht{--band:clamp(72px,10vw,136px);position:relative;isolation:isolate;padding-block:var(--band)}
.ht-art{position:absolute;inset:0;z-index:-1}
.ht-solid{position:absolute;inset-inline:0;top:var(--band);bottom:var(--band);background:var(--ink)}
.ht-fb,.ht-cv{position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.ht-fb::before,.ht-fb::after{content:"";position:absolute;inset-inline:0;height:var(--band);background:radial-gradient(circle,var(--ink) 1.4px,transparent 1.9px) 0 0 / 6px 6px}
.ht-fb::before{top:0;-webkit-mask-image:linear-gradient(transparent,rgb(0 0 0));mask-image:linear-gradient(transparent,rgb(0 0 0))}
.ht-fb::after{bottom:0;-webkit-mask-image:linear-gradient(rgb(0 0 0),transparent);mask-image:linear-gradient(rgb(0 0 0),transparent)}
.ht-fb i{position:absolute;width:46%;aspect-ratio:1;background:radial-gradient(circle,color-mix(in srgb,var(--bg) 40%,transparent) 1.6px,transparent 2.3px) 0 0 / 9px 9px;-webkit-mask-image:radial-gradient(closest-side,rgb(0 0 0),transparent);mask-image:radial-gradient(closest-side,rgb(0 0 0),transparent)}
.ht-fb i:first-child{top:var(--band);right:-14%;translate:0 -30%}
.ht-fb i:last-child{bottom:var(--band);left:-14%;translate:0 30%}
.ht-cv{opacity:0}
.ht-art.is-on .ht-cv{opacity:1}
.ht-art.is-on .ht-fb{opacity:0}
.ht-in{position:relative;display:grid;gap:clamp(32px,4vw,56px);padding:clamp(48px,6vw,88px) clamp(24px,5vw,72px);color:var(--bg)}
.ht-in h2{margin:0;max-width:20ch;font-size:clamp(30px,4vw,56px);line-height:1.12;text-wrap:balance}
.ht-facts{display:flex;flex-wrap:wrap;gap:clamp(24px,5vw,72px);margin:0}
.ht-facts div{display:flex;flex-direction:column-reverse;gap:6px}
.ht-facts dd{margin:0;font-size:clamp(44px,6vw,88px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.ht-facts dt{color:color-mix(in srgb,var(--bg) 74%,transparent);font-size:15px}
@media(prefers-reduced-motion:reduce){.ht-fb,.ht-cv{transition:none}}`,
  html:`<div class="stage"><section class="ht" aria-labelledby="ht-h">
  <div class="ht-art" aria-hidden="true"><span class="ht-solid"></span><span class="ht-fb"><i></i><i></i></span><canvas class="ht-cv"></canvas></div>
  <div class="ht-in">
    <h2 id="ht-h">משרד הנדסה שמלווה את הפרויקט מההיתר ועד המפתח</h2>
    <dl class="ht-facts">
      <div><dt>פרויקטים שנמסרו</dt><dd>1,240</dd></div>
      <div><dt>שנות פעילות</dt><dd>28</dd></div>
      <div><dt>לקוחות שחוזרים</dt><dd>96%</dd></div>
    </dl>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".ht"),art=root.querySelector(".ht-art"),cv=art.querySelector(".ht-cv"),ctx=cv.getContext("2d");
  const solid=art.querySelector(".ht-solid"),dds=[...root.querySelectorAll(".ht-facts dd")];
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  let W=0,H=0,BH=0,DC=5,GS=10,INK="",BGC="",blobs=[],vis=false,raf=0,last=0;
  const t0=performance.now(),sm=x=>x*x*(3-2*x);
  // הצבעים נקראים מהטוקנים בזמן ריצה
  const probe=document.createElement("canvas").getContext("2d");
  const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
  const col=n=>"rgb("+rgb(getComputedStyle(root).getPropertyValue(n).trim()||"#888").join(",")+")";
  function paint(t){
    ctx.clearRect(0,0,W,H);
    // פסי דיתר: שורה אחת בכל פס, סף Bayer וגל איטי שמזיז אותו
    ctx.fillStyle=INK;ctx.beginPath();
    const cols=Math.ceil(W/DC),rows=Math.ceil(BH/DC);
    for(let j=0;j<rows;j++){
      const y=j*DC,v=sm(Math.min(1,(y+DC/2)/BH));
      for(let i=0;i<cols;i++){
        const x=i*DC,th=(BAYER[(j&3)*4+(i&3)]+.5)/16;
        if(v+.09*Math.sin(x*.011+t*.8+j*.35)>th)ctx.rect(x,y,DC,DC);
        if(v+.09*Math.sin(x*.011-t*.6+j*.3+2)>th)ctx.rect(x,H-DC-y,DC,DC);
      }
    }
    ctx.fill();
    // הלפטון: רדיוס כל נקודה מתוך שדה רך סביב הפינות והנתונים
    ctx.fillStyle=BGC;ctx.globalAlpha=.3;ctx.beginPath();
    for(let y=BH+GS/2,r0=0;y<H-BH;y+=GS,r0++){
      for(let x=(r0&1)*GS/2+GS/2;x<W;x+=GS){
        let f=0;
        for(let k=0;k<blobs.length;k++){
          const b=blobs[k],dx=x-b.x,dy=y-b.y,s=b.s*(1+.1*Math.sin(t*.5+k*1.7));
          if(dx>3.2*s||dx<-3.2*s||dy>3.2*s||dy<-3.2*s)continue;
          f+=Math.exp(-(dx*dx+dy*dy)/(2*s*s));
        }
        const r=GS*.42*Math.pow(Math.min(1,f),.8);   // לא עד חצי רשת, כדי שהנקודות לא יתחברו לכתם אפור
        if(r>.5){ctx.moveTo(x+r,y);ctx.arc(x,y,r,0,6.2832);}
      }
    }
    ctx.fill();ctx.globalAlpha=1;
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    BH=solid.getBoundingClientRect().top-r.top;DC=W<600?4:5;GS=W<600?8:10;INK=col("--ink");BGC=col("--bg");
    const k=Math.min(1,W/1100);
    blobs=[{x:W,y:BH,s:130*k+40},{x:0,y:H-BH,s:120*k+40}];
    dds.forEach(d=>{const q=d.getBoundingClientRect();blobs.push({x:q.left-r.left+q.width/2,y:q.top-r.top+q.height/2,s:56*k+28});});
    paint(2.2);
  }
  function loop(now){raf=0;if(!vis)return;if(now-last>=50){last=now;paint(2.2+(now-t0)/1000);}raf=requestAnimationFrame(loop);}
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){art.classList.add("is-on");INK=col("--ink");BGC=col("--bg");if(!reduced&&!raf)raf=requestAnimationFrame(loop);}},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");   // פריים אחד, בלי לולאה
  build();
})();`
},
{
  id:"b90", cat:"behavior", name:"גשם בלילה וקרן פנס שסורקת אותו", tech:"Canvas 2D · conic-gradient · CSS fallback", status:"מאושר-עין", runway:false,
  desc:"סצנה כהה עם גשם דק שנוטה הצידה, וקרן פנס רחבה שיוצאת מהפינה העליונה וסורקת לאט את הסצנה הלוך וחזור. הטיפות שבתוך הקרן נדלקות ובולטות, והטיפות שמחוצה לה כמעט נעלמות בחושך. הכותרת והכפתור יושבים בתחתית, רחוק מהזוהר, ונשארים קריאים.",
  when:"פתיחה של עסק שקשור לשמירה על דבר יקר: אבטחה, מצלמות, חשמל, ביטוח, שירותי חירום, שעות לילה. הסצנה אומרת שמישהו ער ושומר. מתאים כהירו כהה, או כסקשן ״למה אנחנו״ שמתחיל באווירה. לא לעסק שהמותג שלו קליל וצבעוני.",
  note:"**שחזור.** השראה: כמה סרטוני אווירה ב-prompt-motion.com (21.10.2026) של גשם וקרן אור שסורקת את הסצנה. נבנה מאפס מהצפייה. **שתי שכבות:** הקרן היא אלמנט CSS אחד (שיפוע חרוטי `conic-gradient` שמרכזו בפינה, בגודל פי שניים מהסצנה), ו-JS רק מסובב אותו (`rotate`) סביב אותה פינה, כך שהתנועה נשארת על המעבד הגרפי. הגשם הוא קנבס אחד. **הקסם הוא בקשר בין השכבות:** בכל פריים כל טיפה מקבלת זווית מנקודת המקור של הקרן, ולפי המרחק שלה מציר הקרן היא נכנסת לאחת משלוש קבוצות שקיפות (מעומעמת, בינונית, בהירה). כל קבוצה היא מסלול אחד שמצוייר בקריאה אחת, כך שיש בסך הכול שלוש קריאות צביעה ולא מאה וששים. **קל:** בין שישים למאה ושישים טיפות לפי שטח הסצנה (בערך אחת לכל 5,200 פיקסלים), DPR עד 2, הלולאה עוצרת כשהסצנה מחוץ למסך, וגם `dt` מוגבל כדי שאחרי חזרה ללשונית הטיפות לא יקפצו. **בלי JS ובהפחתת תנועה:** רואים פסי גשם סטטיים ב-CSS ואת הקרן בזווית קבועה; בהפחתת תנועה מצויר פריים אחד בקנבס בלי לולאה. הם מתחלפים בהצלבה עם `is-on`. **הצבע** של הטיפות נקרא מ-`--bg` בזמן ריצה. **באתר משמאל לימין** הופכים את הסצנה (`transform:scaleX(-1)` על `.rb-art`) כדי שהקרן תצא מצד תחילת הקריאה. **נגישות:** כל הסצנה `aria-hidden`; הטקסט בניגודיות של `--bg` על `--ink`, והקרן עצמה מוגבלת ל-20 אחוזי שקיפות כדי שלא תפגע בקריאות.",
  libs:[],
  css:`.rb{position:relative;isolation:isolate;display:grid;align-items:end;min-height:clamp(420px,64vh,620px);padding:clamp(32px,6vw,88px);background:var(--ink);color:var(--bg);overflow:hidden}
.rb-art{position:absolute;inset:0;z-index:-1;overflow:hidden}
.rb-fb,.rb-cv{position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.rb-fb{background:repeating-linear-gradient(104deg,transparent 0 23px,color-mix(in srgb,var(--bg) 13%,transparent) 23px 24px,transparent 24px 47px);-webkit-mask-image:linear-gradient(rgb(0 0 0),transparent 94%);mask-image:linear-gradient(rgb(0 0 0),transparent 94%)}
.rb-cv{opacity:0}
.rb-art.is-on .rb-cv{opacity:1}
.rb-art.is-on .rb-fb{opacity:0}
.rb-beam{position:absolute;top:0;right:0;width:200%;height:200%;transform-origin:100% 0;will-change:transform;background:conic-gradient(from 0deg at 100% 0,transparent 0 204deg,color-mix(in srgb,var(--bg) 20%,transparent) 224deg,color-mix(in srgb,var(--bg) 20%,transparent) 240deg,transparent 260deg 360deg);-webkit-mask-image:radial-gradient(circle farthest-corner at 100% 0,rgb(0 0 0) 20%,transparent 55%);mask-image:radial-gradient(circle farthest-corner at 100% 0,rgb(0 0 0) 20%,transparent 55%)}
.rb-flare{position:absolute;top:0;right:0;width:min(70vw,560px);aspect-ratio:1;translate:50% -50%;background:radial-gradient(circle,color-mix(in srgb,var(--bg) 60%,transparent),color-mix(in srgb,var(--bg) 14%,transparent) 30%,transparent 62%)}
.rb-in{display:grid;gap:20px;justify-items:start;justify-self:end;max-width:560px}
.rb-in h2{margin:0;font-size:clamp(30px,4vw,56px);line-height:1.12;text-wrap:balance}
.rb-in p{margin:0;max-width:44ch;color:color-mix(in srgb,var(--bg) 78%,transparent);font-size:var(--fs-body);line-height:1.6}
.rb-cta{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border-radius:99px;background:var(--bg);color:var(--ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.rb-cta:hover{transform:translateY(-2px)}}
.rb-cta:focus-visible{outline:2px solid var(--bg);outline-offset:4px}
@media(max-width:767px){.rb-in{justify-self:stretch}}
@media(prefers-reduced-motion:reduce){.rb-fb,.rb-cv{transition:none}}`,
  html:`<div class="stage"><section class="rb" aria-labelledby="rb-h">
  <div class="rb-art" aria-hidden="true"><span class="rb-fb"></span><canvas class="rb-cv"></canvas><span class="rb-beam"></span><span class="rb-flare"></span></div>
  <div class="rb-in">
    <h2 id="rb-h">שומרים על העסק שלכם גם כשהכול חשוך</h2>
    <p>סיור לילי, מצלמות עם התראה בזמן אמת וצוות שמגיע תוך דקות. את הדוח אתם מקבלים כל בוקר בטלפון.</p>
    <a class="rb-cta" href="#rb-h">קבלו הצעה לאבטחה</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".rb"),art=root.querySelector(".rb-art"),cv=art.querySelector(".rb-cv"),beam=art.querySelector(".rb-beam");
  const ctx=cv.getContext("2d"),reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LEAN=Math.tan(14*Math.PI/180),BASE=38;   // BASE: זווית מרכז הקרן מתחת לאופק, כשהיא לא מוסטת
  let W=0,H=0,drops=[],vis=false,raf=0,prev=0,rgb="230,230,240";
  // צבע הטיפות נקרא מהטוקן בזמן ריצה
  const probe=document.createElement("canvas").getContext("2d");
  function bgRGB(){
    probe.fillStyle="#000";probe.fillStyle=getComputedStyle(root).getPropertyValue("--bg").trim()||"#ccc";const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16)).join(",");
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(parseFloat).join(",");
  }
  function seed(){
    const n=Math.round(Math.max(60,Math.min(160,W*H/5200)));let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
    drops=Array.from({length:n},()=>({x:r()*(W+H*LEAN),y:r()*H,l:12+r()*24,v:.55+r()*.9}));
  }
  // a: הסטת הקרן במעלות. כל טיפה מקבלת קבוצת שקיפות לפי הקרבה לציר הקרן, וכל קבוצה מצוירת בקריאה אחת
  function draw(dt,a){
    ctx.clearRect(0,0,W,H);
    const c=BASE-a,diag=Math.hypot(W,H),b=[[],[],[]];
    for(let i=0;i<drops.length;i++){
      const d=drops[i],sp=dt*(380+d.v*520);
      d.y+=sp;d.x-=sp*LEAN;
      if(d.y>H+d.l){d.y=-d.l;d.x=Math.random()*(W+H*LEAN);}
      const dx=W-d.x,ang=Math.atan2(d.y,dx)*57.2958,dist=Math.hypot(dx,d.y)/diag;
      const lit=Math.max(0,Math.min(1,1-(Math.abs(ang-c)-8)/20))*Math.max(0,1-dist*.9);
      b[lit>.5?2:lit>.16?1:0].push(d);
    }
    const al=[.13,.34,.7];
    for(let k=0;k<3;k++){
      ctx.strokeStyle="rgba("+rgb+","+al[k]+")";ctx.lineWidth=k===2?1.4:1;ctx.beginPath();
      for(let j=0;j<b[k].length;j++){const d=b[k][j];ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-d.l*LEAN,d.y+d.l);}
      ctx.stroke();
    }
  }
  function loop(now){
    raf=0;if(!vis)return;
    const dt=Math.min(.05,(now-prev)/1000||0);prev=now;
    const a=12*Math.sin(now/3400)+3;
    beam.style.transform="rotate("+a.toFixed(2)+"deg)";draw(dt,a);
    raf=requestAnimationFrame(loop);
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    rgb=bgRGB();seed();draw(0,0);
  }
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{
    vis=es[0].isIntersecting;
    if(vis){art.classList.add("is-on");if(!reduced&&!raf){prev=performance.now();raf=requestAnimationFrame(loop);}}
  },{rootMargin:"10% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");   // פריים אחד, בלי לולאה
  build();
})();`
},
{
  id:"b91", cat:"behavior", name:"סבך עקומות זוהרות שנשרטט ונמוג", tech:"Canvas 2D · lighter · Lissajous · SVG fallback", status:"מאושר-עין", runway:false,
  desc:"לוח כהה עם קופסת טקסט בצד ומולה סבך של שישה חוטי אור בצבע המותג: ליבה בהירה, הילה סגולה סביבה, ועל הרקע הכהה זה זוהר באמת. החוטים נשרטטים אחד אחרי השני, ובראש כל חוט נקודת אור שמובילה אותו. אחרי שהסבך שלם הוא נע לאט והצורה משתנה, ואז הוא נמוג והמחזור מתחיל שוב. בקצוות הסבך מתפוגג לתוך הרקע בלי מסגרת, ובנקודות שהחוטים נחתכים האור מצטבר לצמתים בוהקים. בלי JS רואים את אותו סבך כשרטוט קבוע. כפתור קטן משהה את התנועה.",
  when:"עסק שמחבר דברים: אינטגרציות, תוכנה, תקשורת, רשתות, ייעוץ שמקשר בין גורמים. הסבך אומר שיש הרבה חלקים שמסתדרים. מתאים כסקשן ״איך זה עובד״ או כהירו של חברת טכנולוגיה. לא לעסק שמבקש שקט וניקיון.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם עקומות זוהרות שזורות נשרטטות ונמוגות על רקע כהה. נבנה מאפס מהצפייה. **גרסה 2 (25.10.2026):** הגרסה הקודמת הייתה שמונה קווי שיער דקים ועמומים בתוך מלבן, ללא זוהר אמיתי, והקצוות של הסבך יצרו מסגרת נראית. עכשיו: שישה חוטים (חמישה בטאבלט, ארבעה בטלפון), זוהר אמיתי והקצוות נמסים. **העקומות הן עקומות ליסז'ו:** `x = sin(a·s + d)`, `y = sin(b·s)`, וכל עקומה היא זוג מספרים שלמים קטנים (a, b) וזווית התחלה. מספרים קטנים נותנים לולאות רחבות ונקיות; מספרים גדולים נראים כשיער, ולכן הוסרו. ההיסחפות היא הזזה איטית של הזווית `d` בזמן, ולכן הצורה משתנה בלי קפיצות. **הזוהר הוא שלושה משיכות של אותה עקומה** (רחבה ועמומה, בינונית, ודקה ובהירה) בהבהרה (`globalCompositeOperation:'lighter'`): הליבה בצבע בהיר שנגזר מ-`--accent` ו-`--bg`, ההילה ב-`--accent`. בנקודות שבהן כמה חוטים נחתכים הצבעים מצטברים והנקודה מבהיקה, בלי מסנן טשטוש יקר. **הקצוות** נמסים במסכה אליפטית (`mask-image`) על התיבה כולה, אז אין מלבן גלוי, והמסכה פועלת על הקנבס ועל ה-SVG הסטטי באותה מידה. **ראש החוט:** בזמן השרטוט, בקצה כל עקומה מצוירת נקודת אור, כך שרואים מיד שהקווים נשרטטים. **מחזור של 16 שניות:** שרטוט (כל עקומה מתחילה מעט אחרי הקודמת), החזקה, ודעיכה לשקיפות אפס, הכול בעקומות חלקות ובלי הבהוב. **קל:** שלוש משיכות של שש עקומות, 360 נקודות לכל אחת (240 בטלפון), DPR עד 2, הלולאה עוצרת מחוץ למסך. **כפתור השהיה** (WCAG 2.2.2, כי המחזור רץ בלי סוף): מוסתר במארקאפ, JS מגלה אותו, והוא עוצר את השעון בפריים הנוכחי וממשיך ממנו. **בלי JS ובהפחתת תנועה:** SVG סטטי שנבנה מאותה נוסחה בזמן קבוע (`LJ_DEFS`, עם `use` שלוש פעמים לכל עקומה), ובהפחתת תנועה מצויר פריים אחד בקנבס, עם אותה זווית התחלה, כך שאין קפיצה בין שני המצבים. הם מתחלפים בהצלבה עם `is-on`. בהפחתת תנועה אין כפתור. **הצבע** נקרא מ-`--accent` ומ-`--bg` בזמן ריצה (פיקסל אחד בקנבס, כך שכל פורמט צבע עובד). **באתר משמאל לימין** הופכים את סדר העמודות (`direction:ltr` על `.lj`). **נגישות:** כל הסבך `aria-hidden` וחסר תוכן סמנטי, וכל המידע בטקסט.",
  libs:[],
  css:`.lj{--lj-tint:color-mix(in srgb,var(--accent) 52%,var(--bg));display:grid;place-items:center;padding-block:clamp(24px,4vw,64px)}
.lj-box{display:grid;grid-template-columns:minmax(0,4.4fr) minmax(0,7.6fr);align-items:center;gap:clamp(16px,3vw,40px);width:min(1100px,100%);padding:clamp(32px,5vw,72px);border-radius:32px;background:radial-gradient(ellipse 52% 88% at 28% 50%,color-mix(in srgb,var(--accent) 24%,transparent),transparent 72%),var(--ink);color:var(--bg);overflow:hidden}
.lj-in{display:grid;gap:20px;justify-items:start}
.lj-in h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.14;text-wrap:balance}
.lj-in p{margin:0;max-width:40ch;color:color-mix(in srgb,var(--bg) 78%,transparent);font-size:var(--fs-body);line-height:1.6}
.lj-cta{display:inline-flex;align-items:center;padding:14px 24px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.lj-cta:hover{transform:translateY(-2px)}}
.lj-cta:focus-visible{outline:2px solid var(--bg);outline-offset:4px}
.lj-stage{position:relative;min-width:0;margin-inline-end:calc(-1 * clamp(16px,3vw,40px))}
.lj-art{position:relative;aspect-ratio:1200 / 600;-webkit-mask-image:radial-gradient(ellipse 57% 54% at 50% 50%,rgb(0 0 0) 52%,transparent 100%);mask-image:radial-gradient(ellipse 57% 54% at 50% 50%,rgb(0 0 0) 52%,transparent 100%)}
.lj-svg,.lj-cv{position:absolute;inset:0;width:100%;height:100%;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.lj-svg{overflow:visible;fill:none;stroke-linecap:round;stroke-linejoin:round}
.lj-svg path{vector-effect:non-scaling-stroke}
.lj-svg g{mix-blend-mode:screen}
.lj-c1{opacity:.68}
.lj-g{stroke:var(--accent);stroke-width:9px;opacity:.1}
.lj-m{stroke:var(--accent);stroke-width:3px;opacity:.24}
.lj-k{stroke:var(--lj-tint);stroke-width:1.3px;opacity:.95}
.lj-cv{opacity:0}
.lj-art.is-on .lj-cv{opacity:1}
.lj-art.is-on .lj-svg{opacity:0}
.lj-pause{position:absolute;inset-block-end:0;inset-inline-end:0;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--bg) 14%,transparent);color:var(--bg);cursor:pointer;transition:background .2s cubic-bezier(.2,.6,.2,1)}
.lj-pause[hidden]{display:none}
.lj-pause svg{width:16px;height:16px;fill:currentColor}
.lj-pause .i-play,.lj-pause[aria-pressed="true"] .i-pause{display:none}
.lj-pause[aria-pressed="true"] .i-play{display:block}
@media (hover:hover) and (pointer:fine){.lj-pause:hover{background:color-mix(in srgb,var(--bg) 24%,transparent)}}
.lj-pause:focus-visible{outline:2px solid var(--bg);outline-offset:4px}
@media(max-width:767px){.lj-box{grid-template-columns:minmax(0,1fr)}.lj-stage{order:-1;margin-inline-end:0}}
@media(prefers-reduced-motion:reduce){.lj-svg,.lj-cv{transition:none}.lj-pause{display:none}}`,
  html:`<div class="stage"><section class="lj" aria-labelledby="lj-h">
  <div class="lj-box">
    <div class="lj-in">
      <h2 id="lj-h">כל הכלים של העסק מדברים זה עם זה</h2>
      <p>מחברים את הנהלת החשבונות, ה-CRM והחנות למערכת אחת, כך שנתון שהוזן פעם אחת מופיע בכל מקום שצריך אותו.</p>
      <a class="lj-cta" href="#lj-h">תיאום שיחת היכרות</a>
    </div>
    <div class="lj-stage">
      <div class="lj-art" aria-hidden="true">
        <svg class="lj-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" focusable="false"><defs>${LJ_DEFS}</defs>${LJ_USE}</svg>
        <canvas class="lj-cv"></canvas>
      </div>
      <button class="lj-pause" type="button" hidden aria-pressed="false" aria-label="השהיית התנועה"><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg><svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg></button>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".lj"),art=root.querySelector(".lj-art"),cv=art.querySelector(".lj-cv"),ctx=cv.getContext("2d"),btn=root.querySelector(".lj-pause");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  // אותן עקומות כמו ב-SVG הסטטי: [a, b, זווית התחלה]
  const SET=[[3,2,.2],[5,4,1.1],[4,3,2.0],[5,3,2.7],[3,4,2.3],[7,4,1.6]];
  const CYCLE=16,FADE0=12.5,TAU=Math.PI*2,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),sm=x=>x*x*(3-2*x);
  let W=0,K=SET.length,N=360,px=1,A="74,58,255",T="170,160,255",vis=false,held=false,raf=0,last=0,clock=0;
  // צבע CSS בכל פורמט נהפך ל-RGB דרך פיקסל אחד
  const probe=document.createElement("canvas");probe.width=probe.height=1;const pc=probe.getContext("2d",{willReadFrequently:true});
  function rgbOf(c){pc.clearRect(0,0,1,1);pc.fillStyle="#000";pc.fillStyle=c;pc.fillRect(0,0,1,1);return[].slice.call(pc.getImageData(0,0,1,1).data,0,3).join(",");}
  // t: זמן ההיסחפות. cyc: שנייה בתוך המחזור (שרטוט, החזקה, דעיכה)
  function paint(t,cyc){
    ctx.clearRect(0,0,1200,600);
    ctx.globalCompositeOperation="lighter";ctx.lineJoin="round";ctx.lineCap="round";
    const fade=cyc>FADE0?clamp(1-(cyc-FADE0)/3.2,0,1):1;
    for(let i=0;i<K;i++){
      const a=SET[i][0],b=SET[i][1],d=SET[i][2]+t*.14*(i%2?1:-1)*(.7+i*.08);
      const q=sm(clamp(cyc/4-i*.08,0,1));if(q<=0)continue;   // החוט הזה עוד לא התחיל
      const m=Math.max(2,Math.round(N*q)),p=new Path2D();let x=0,y=0;
      for(let k=0;k<=m;k++){const s=k/N*TAU;x=600+540*Math.sin(a*s+d);y=300+250*Math.sin(b*s);if(k)p.lineTo(x,y);else p.moveTo(x,y);}
      const al=(i%2?.68:1)*fade;
      ctx.strokeStyle="rgb("+A+")";
      ctx.globalAlpha=al*.1;ctx.lineWidth=9*px;ctx.stroke(p);
      ctx.globalAlpha=al*.24;ctx.lineWidth=3*px;ctx.stroke(p);
      ctx.strokeStyle="rgb("+T+")";ctx.globalAlpha=al*.95;ctx.lineWidth=1.3*px;ctx.stroke(p);
      if(q>0&&q<1){   // נקודת אור בראש החוט בזמן השרטוט
        const g=ctx.createRadialGradient(x,y,0,x,y,24*px);g.addColorStop(0,"rgba("+T+",.75)");g.addColorStop(.4,"rgba("+A+",.3)");g.addColorStop(1,"rgba("+A+",0)");
        ctx.globalAlpha=fade;ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,24*px,0,TAU);ctx.fill();
        ctx.fillStyle="rgb("+T+")";ctx.beginPath();ctx.arc(x,y,3.5*px,0,TAU);ctx.fill();
      }
    }
    ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over";
  }
  // הפריים הנוכחי: סופי (זהה ל-SVG הסטטי) לפני שהשעון התחיל, ובהפחתת תנועה תמיד
  const redraw=()=>{const t=clock/1000;if(reduced)paint(0,8);else paint(t,t%CYCLE);};
  function loop(now){
    raf=0;if(!vis||held)return;
    clock+=Math.min(now-last,80);last=now;   // קפיצת זמן (לשונית ברקע) לא מזיזה את הסבך
    redraw();raf=requestAnimationFrame(loop);
  }
  function start(){if(reduced||held||!vis||raf)return;last=performance.now();raf=requestAnimationFrame(loop);}
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;if(!W||!r.height)return;
    K=W<420?4:W<600?5:SET.length;N=W<600?240:360;px=1200/W;
    const cs=getComputedStyle(root);
    A=rgbOf(cs.getPropertyValue("--accent").trim()||"#4a3aff");T=rgbOf(cs.getPropertyValue("--lj-tint").trim()||"#aaa0ff");
    cv.width=Math.round(W*dpr);cv.height=Math.round(r.height*dpr);ctx.setTransform(dpr*W/1200,0,0,dpr*r.height/600,0,0);
    redraw();
  }
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)start();},{rootMargin:"10% 0px"}).observe(root);
  if(!reduced){
    // הקנבס מתחיל ריק ונצבע בכניסה, אז הסבך לא מבזיק שלם לפני שהוא נשרטט
    art.classList.add("is-on");
    btn.hidden=false;
    btn.addEventListener("click",()=>{
      held=!held;btn.setAttribute("aria-pressed",String(held));btn.setAttribute("aria-label",held?"הפעלת התנועה":"השהיית התנועה");
      if(!held)start();
    });
  }else art.classList.add("is-on");   // פריים אחד, בלי לולאה
  build();
})();`
},
]
