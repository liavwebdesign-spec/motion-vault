// v2 community (15.10.2026): שני מהלכים מהקהילה. g152 נבנה כפורט של MIT, b71 נכתב מחדש מתיאור בלבד.
export default [
{
  id:"g152", cat:"gsap", name:"תמונה שנפתחת בתוך הכותרת", tech:"GSAP · Flip · ScrollTrigger", status:"ממתין",
  desc:"כותרת עריכתית שבין שתי מילים שלה יושב פער סגור. כשהכותרת נכנסת למסך נפתחת בפער קפסולת תמונה, והמילים משני צידיה מתרחקות בהחלקה, כך שהמשפט ממשיך להיקרא כשורה אחת עם תמונה בתוכה.",
  when:"הירו עריכתי או משפט מניפסט באמצע העמוד: סטודיו, קליניקה, מסעדה, כל עסק שיש לו תמונות טובות והמשפט שלו חשוב לא פחות מהן. תמונה אחת או שתיים בכותרת, פעם אחת בעמוד.",
  note:`**איך זה בנוי.** אין כאן אנימציית רוחב. הכותרת היא שתי שורות flex ממורכזות, ובכל שורה יש \`slot\` בין שתי מילים. במצב הסגור ה-slot ברוחב 0 (קלאס אחד, בלי transition), \`Flip.getState\` מצלם את מיקום המילים, הקלאס \`is-open\` מחזיר ל-slot את הרוחב האמיתי, ו-\`Flip.from\` מנפיש את המילים מהמקום הישן לחדש ב-transform בלבד. הקפסולה עצמה כבר יושבת בגודלה הסופי ונחשפת ב-\`clip-path: inset()\` מהמרכז, עם סקייל קטן של התמונה בפנים (1.35 ל-1). השורה ממורכזת, ולכן שני צידי הפער זזים בדיוק חצי רוחב כל אחד והקפסולה גדלה מנקודה שלא זזה: אין שנייה שבה היא חורגת על מילה. ה-slot השני נפתח 140ms אחרי הראשון.\n\n**מקור, ומה שונה.** פורט של MediaBetweenText מ-Fancy Components: במקור הרוחב מונפש ב-motion, וכאן הוא הוחלף ב-FLIP כדי לא להנפיש layout ולא לגרום ל-reflow בכל פריים. הכניסה נקבעת ב-ScrollTrigger פעם אחת (\`start: "top 75%"\`), ובמצביע עדין ריחוף על הכותרת פותח אותה אם עוד לא נפתחה, ואחר כך מגדיל את התמונות מעט (1.08). הכותרת אינה רכיב אינטראקטיבי ולכן אין לה פוקוס: הפתיחה במקלדת קורית בגלילה, כמו לכל משתמש. התמונות דקורטיביות (\`alt=""\` ו-\`aria-hidden\`), והכותרת נושאת \`aria-label\` עם המשפט המלא, כדי שקורא מסך לא יאחד מילים ממקטעים שונים. לא נמצא בספרייה קובץ וידאו שמתאים לקפסולה ברוחב כזה, ולכן אין ענף וידאו.\n\n**בטלפון (מתחת ל-768).** מילים שנסגרות ונפתחות בשורה שנשברת קופצות בין שורות, ולכן שם הפער שמור מראש, השורות נשברות כרגיל, והקפסולה נחשפת בלבד (clip-path וסקייל, בלי הזזת מילים). גובה הקפסולה .8em, בכל גודל. בהפחתת תנועה, בלי GSAP או כשה-CDN חסום: הקפסולות פתוחות מההתחלה והמשפט שלם, ואין שום דבר שמוסתר ב-CSS בציפייה ל-JS (מצב הסגור נקבע רק בקלאס ש-JS מוסיף).\n\n**מה שונה מ-g64 ומ-g108.** ב-g64 אותה מילה מודפסת פעמיים והתמונה עוברת בין השכבות בסקראב. ב-g108 שתי שורות מתרחקות בסקראב וחושפות תמונה בגודל מלא בין השורות. כאן התמונה קטנה ויושבת בתוך זרימת המשפט כמו מילה, הפתיחה היא אירוע אחד (לא מחוברת לגלילה), הטקסט כולו נשאר גלוי וקריא לפני ואחרי, ויש עד שני פערים באותה כותרת.\n\n**שלוש שאלות הגימור.** (1) הגרסה הבנאלית היא תמונה רחבה מתחת לכותרת, או תמונה שמתנפחת מעל המילים וחוסמת אותן. כאן התמונה נוספת למשפט בלי לקחת ממנו שום אות, והמילים עצמן זזות כדי לפנות לה מקום. (2) המיקרו-אינטראקציה שנושאת מצב: המילים ש"נדחפות" בהחלקה מראות שהקפסולה היא חלק מהשורה, ובריחוף התמונה מתקרבת מעט, כך שהכותרת מגיבה ליד. (3) הפעולה שהיא מקלה: המבקר מבין במבט אחד מה העסק עושה, בלי לחכות לקרוסלה או לגלול לגלריה.\n\nמקור: Fancy Components, Daniel Petho, https://fancycomponents.dev/docs/components/blocks/media-between-text, רישיון MIT`,
  libs:["gsap","ScrollTrigger","Flip"],
  css:`/* מצב ברירת המחדל הוא המצב הפתוח: בלי JS, בלי GSAP ובהפחתת תנועה רואים משפט שלם עם התמונות */
.mbt{container-type:inline-size;max-width:1280px;margin-inline:auto;text-align:center;--mbt-e:cubic-bezier(.2,.6,.2,1)}
.mbt-eyebrow{margin:0 0 24px;font-size:15px;font-weight:600;color:var(--muted)}
.mbt-h{margin:0;font-weight:800;line-height:1.14;letter-spacing:-.02em;color:var(--ink);font-size:clamp(32px,10cqi,56px)}
.mbt-line{display:flex;flex-wrap:wrap;justify-content:center;align-items:center}
.mbt-w{display:block;margin-inline:.14em;white-space:nowrap}
.mbt-slot{display:block;flex:none;position:relative;width:1.8em;height:.8em;margin-inline:.1em}
.mbt-pill{position:absolute;inset:0;display:block;overflow:hidden;border-radius:999px;background:var(--line)}
.mbt-pill img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s var(--mbt-e)}
.mbt-cap{margin:32px auto 0;max-width:46ch;font-size:clamp(16px,.5vw + .8rem,19px);line-height:1.6;color:var(--muted)}
@media(min-width:768px){
  .mbt-h{font-size:clamp(40px,6.4cqi,104px)}
  .mbt-line{flex-wrap:nowrap}
  .mbt-slot{width:2.2em}
}
/* סגור: רק כש-JS החליט שהמהלך רץ (שולחן עבודה). הרוחב 0 הוא מצב ההתחלה ש-Flip מצלם, הוא לא מונפש */
.mbt-flip .mbt-slot:not(.is-open){width:0;margin-inline:0}
@media(hover:hover) and (pointer:fine){.mbt:hover .mbt-pill img{transform:scale(1.08)}}
@media (prefers-reduced-motion: reduce){.mbt-pill img{transition:none}}`,
  html:`<div class="stage"><div class="mbt">
  <p class="mbt-eyebrow">סטודיו לעיצוב פנים</p>
  <h2 class="mbt-h" aria-label="אנחנו מעצבים חללים שנשארים איתכם">
    <span class="mbt-line" aria-hidden="true"><span class="mbt-w">אנחנו מעצבים</span><span class="mbt-slot"><span class="mbt-pill"><img src="../assets/media/real/s13/proj-c.webp" alt="" style="object-position:50% 55%"></span></span><span class="mbt-w">חללים</span></span>
    <span class="mbt-line" aria-hidden="true"><span class="mbt-w">שנשארים</span><span class="mbt-slot"><span class="mbt-pill"><img src="../assets/media/real/s13/proj-a.webp" alt="" style="object-position:50% 45%"></span></span><span class="mbt-w">איתכם</span></span>
  </h2>
  <p class="mbt-cap">מאה ועשרים בתים ומשרדים מאז 2011, מהסקיצה הראשונה ועד שהמנורה האחרונה נדלקת.</p>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".mbt");
  if(!root||typeof gsap==="undefined")return;      // בלי GSAP הקפסולות פתוחות והמשפט שלם
  const slots=[...root.querySelectorAll(".mbt-slot")];
  const pills=slots.map(s=>s.querySelector(".mbt-pill")),imgs=slots.map(s=>s.querySelector("img"));
  const CLOSED="inset(0% 50% 0% 50% round 999px)",OPEN="inset(0% 0% 0% 0% round 999px)";
  const fine=matchMedia("(hover: hover) and (pointer: fine)");
  // בהפחתת תנועה הפונקציה לא רצה בכלל: הכותרת נשארת פתוחה
  gsap.matchMedia().add({
    desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",
    mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"
  },ctx=>{
    // Flip רק בשולחן עבודה: שם כל שורה בנויה ב-nowrap, ולכן מילה אף פעם לא קופצת בין שורות. בטלפון הפער שמור והקפסולה רק נחשפת
    const flip=ctx.conditions.desk&&typeof Flip!=="undefined";
    let opened=false;
    if(flip)root.classList.add("mbt-flip");
    gsap.set(pills,{clipPath:CLOSED});
    gsap.set(imgs,{scale:1.35});
    function openSlot(i){
      const slot=slots[i],delay=i*.14;
      if(flip){
        // 1. מצלמים את המילים בשורה, 2. פותחים את הפער (רוחב אמיתי), 3. Flip מנפיש את ההפרש ב-transform בלבד
        const state=Flip.getState(slot.parentElement.querySelectorAll(".mbt-w"));
        slot.classList.add("is-open");
        Flip.from(state,{duration:.65,delay,ease:"power3.out"});
      }
      gsap.fromTo(pills[i],{clipPath:CLOSED},{clipPath:OPEN,duration:.65,delay,ease:"power3.out"});
      // clearProps מחזיר לתמונה את ה-transition של ה-CSS, כדי שריחוף ימשיך לעבוד אחרי הכניסה
      gsap.to(imgs[i],{scale:1,duration:.9,delay,ease:"power3.out",onComplete(){gsap.set(imgs[i],{clearProps:"transform"});}});
    }
    const open=()=>{if(opened)return;opened=true;slots.forEach((_,i)=>openSlot(i));};
    if(typeof ScrollTrigger!=="undefined")ScrollTrigger.create({trigger:root,start:"top 75%",once:true,onEnter:open});
    else open();
    // מצביע עדין: ריחוף על הכותרת פותח אותה אם עוד לא נפתחה (למשל כשהיא כבר במסך והגלילה לא הגיעה לנקודת הכניסה)
    const hov=()=>{if(fine.matches)open();};
    root.addEventListener("pointerenter",hov);
    return()=>{
      root.removeEventListener("pointerenter",hov);
      root.classList.remove("mbt-flip");
      slots.forEach(s=>s.classList.remove("is-open"));
      gsap.set(imgs,{clearProps:"transform"});
    };
  });
})();`
},
{
  id:"b71", cat:"behavior", name:"רשימה שהשורה בה נפתחת לרצועה זורמת", tech:"Vanilla JS · GSAP · CSS marquee", status:"ממתין",
  desc:"רשימה גדולה של שורות. כשהסמן נכנס לשורה נכנסת אליה מהקצה הקרוב אליו רצועה בצבע המותג, ובתוכה השם של השורה ותמונה קטנה רצים הצידה בלולאה. ביציאה הרצועה יוצאת דרך הקצה הקרוב ליציאה.",
  when:"אינדקס פרויקטים, רשימת שירותים, תפריט טיפולים, תפריט מסעדה, חלוקה לקטגוריות. ארבע עד שבע שורות, כל שורה היא קישור אמיתי. במסך מגע הרשימה סטטית, עם תמונה בכל שורה.",
  note:`**איך זה בנוי.** בכל שורה (קישור) יש מסכה, ובה רצועה (\`.fm-band\`) ובתוכה שכבה פנימית (\`.fm-bandin\`) שמחזיקה את המרקי. הרצועה זזה ב-\`translateY(±101%)\` והשכבה הפנימית זזה בדיוק בהפוך (\`∓101%\`), כך שהתוכן נראה עומד במקום בזמן שהמסכה מחליקה מעליו. הערך הוא ערך אחד שמונף ב-GSAP (0.6 שניות, expo.out), והשניים נכתבים ממנו בכל פריים, ולכן הקיזוז מדויק גם באמצע תנועה. ב-101 ולא ב-100 כדי שלא תישאר שורת פיקסלים בקצה.\n\n**הקצה הקרוב.** מחשבים את מרחק הסמן מהקצה העליון והתחתון של השורה (\`clientY\` מול \`getBoundingClientRect\`) ובוחרים את הקטן. הרצועה נכנסת מהצד הזה ויוצאת דרך הצד הקרוב ליציאה. אם נכנסים שוב באמצע יציאה, ההחלקה ממשיכה מהמקום שבו היא עומדת, בלי קפיצה. במקלדת, \`:focus-visible\` פותח את הרצועה תמיד מלמעלה וסוגר אותה למעלה; פוקוס שבא מלחיצת עכבר לא פותח שוב.\n\n**המרקי.** ב-JS בלבד: מהשם ומהתמונה של השורה בונים יחידות (שם ותמונה) מספיק כדי שחצי מהמסלול יכסה את הרוחב, ומכפילים אותו. הלולאה היא \`translateX(50%)\` על \`transform\` בלבד, 15 שניות לינארי, והיא עוצרת כשהשורה לא פתוחה. הכיוון נקבע לעברית: התוכן נע ימינה, והטקסט החדש נכנס משמאל, מהכיוון שאליו הקריאה מתקדמת; ב-\`html[dir="ltr"]\` הוא הפוך. הרצועה כולה \`aria-hidden\`: קורא מסך שומע רק את הטקסט האמיתי של הקישור. התמונות במרקי דקורטיביות.\n\n**בלי קווים.** השורות מופרדות במרווח ובמשטח עדין (\`var(--card)\`), לא בקו שיער.\n\n**מגע, הפחתת תנועה, בלי JS.** במסך מגע או בלי סמן עדין אין ריחוף, ולכן הרצועה לא נבנית בכלל, וכל שורה מציגה את התמונה שלה בקפסולה בצד: קישור רגיל, ולחיצה מנווטת. בהפחתת תנועה הרצועה מופיעה ונעלמת מיד בלי החלקה, והמרקי לא רץ. בלי GSAP, או כשה-CDN חסום, זו רשימת קישורים רגילה עם התמונות. בטלפון השם קטן יותר, ושורת הפרטים יורדת מתחתיו.\n\n**מה שונה מ-b54 ומ-g43.** ב-b54 שכבת הריחוף נכנסת מהכיוון של הסמן על כרטיס בגריד, והיא אינה זורמת ואין בה תוכן שרץ. ב-g43 חלון תמונה צף עוקב אחרי הסמן מחוץ לשורה ומתחלף בין שורות, והשורה עצמה לא משתנה. כאן אין חלון צף: הרצועה היא חלק מהשורה, נושאת בתוכה את השם והתמונה, ולכל שורה יש כניסה ויציאה משלה לפי הקצה.\n\n**שלוש שאלות הגימור.** (1) הגרסה הבנאלית: שורה שמשנה צבע ברקע בריחוף, או רשימה עם תמונה שקופצת. כאן התנועה נכנסת מהכיוון שממנו הגיעה היד ויוצאת לשם שאליו היא הולכת, והתמונה נמצאת בשורה, לא מעליה. (2) המיקרו-אינטראקציה שנושאת מצב: שאר השורות נחלשות כשאחת פתוחה, והרצועה זורמת, כך שברור איזו שורה נבחרה וגם שהיא ניתנת ללחיצה. (3) הפעולה שהיא מקלה: בחירת פרויקט או שירות מתוך רשימה, עם הצצה לתמונה לפני הלחיצה, בלי לטעון עמוד.\n\nשחזור, השראה: React Bits FlowingMenu (https://www.reactbits.dev/components/flowing-menu); הקוד נכתב מחדש`,
  libs:["gsap"],
  css:`.fm{max-width:1200px;margin-inline:auto;--fm-e:cubic-bezier(.2,.6,.2,1)}
.fm-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.fm-row{position:relative;isolation:isolate;display:grid;align-items:center;column-gap:var(--gap);row-gap:4px;
  grid-template-columns:auto 1fr auto;grid-template-areas:"idx label thumb" ". meta thumb";
  min-height:clamp(96px,10vw,160px);padding:clamp(20px,2.4vw,40px) clamp(20px,3vw,48px);
  background:var(--card);border-radius:var(--r);color:var(--ink);text-decoration:none}
.fm-row:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.fm-idx{grid-area:idx;font-size:14px;font-weight:600;color:var(--muted);font-variant-numeric:tabular-nums;min-width:2ch}
.fm-label{grid-area:label;font-size:clamp(28px,5vw,80px);font-weight:800;line-height:1.1;letter-spacing:-.02em;transition:opacity .35s var(--fm-e)}
.fm-meta{grid-area:meta;font-size:15px;color:var(--muted)}
.fm-thumb{grid-area:thumb;display:block;width:88px;height:48px;border-radius:999px;overflow:hidden;background:var(--line)}
.fm-thumb img,.fm-pill img{display:block;width:100%;height:100%;object-fit:cover}
@media(min-width:768px){
  .fm-row{grid-template-columns:auto 1fr auto auto;grid-template-areas:"idx label meta thumb"}
  .fm-thumb{width:clamp(120px,12vw,176px);height:clamp(52px,5.2vw,76px)}
}
/* הרצועה: קיימת רק כש-JS הפעיל את המצב החי (.is-live: סמן עדין ו-GSAP). הרצועה היא המסכה (overflow:hidden) והשכבה הפנימית מתקזזת מולה */
.fm-clip{display:none;position:absolute;inset:0;z-index:1;overflow:hidden;border-radius:inherit;pointer-events:none}
.fm.is-live .fm-clip{display:block}
.fm.is-live .fm-thumb{display:none}
.fm-band{position:absolute;inset:0;overflow:hidden;background:var(--accent);color:var(--accent-ink);will-change:transform}
.fm-bandin{position:absolute;inset:0;display:flex;align-items:center;overflow:hidden;will-change:transform}
.fm-track{display:flex;flex:none;width:max-content;animation:fm-run 15s linear infinite;animation-play-state:paused}
.fm-row.is-on .fm-track{animation-play-state:running}
.fm-unit{display:flex;align-items:center;gap:.4em;padding-inline-end:.4em;white-space:nowrap;font-size:clamp(28px,5vw,80px);font-weight:800;line-height:1.1;letter-spacing:-.02em}
.fm-pill{display:block;flex:none;width:2.3em;height:.8em;border-radius:999px;overflow:hidden}
/* בעברית התוכן נע ימינה והחדש נכנס משמאל (כיוון הקריאה); ב-LTR הפוך. 50% = חצי מסלול זהה, ולכן הלולאה חלקה */
@keyframes fm-run{to{transform:translateX(50%)}}
@keyframes fm-run-ltr{to{transform:translateX(-50%)}}
html[dir="ltr"] .fm-track{animation-name:fm-run-ltr}
.fm.is-hover .fm-row:not(.is-on) .fm-label{opacity:.4}
@media (prefers-reduced-motion: reduce){.fm-track{animation:none}.fm-label{transition:none}}`,
  html:`<div class="stage tight">
<nav class="fm" aria-label="פרויקטים נבחרים">
<ul class="fm-list">
  <li><a class="fm-row" href="#"><span class="fm-idx">01</span><span class="fm-label">בית פרטי בכפר שמריהו</span><span class="fm-meta">מגורים · 2025</span><span class="fm-thumb"><img src="../assets/media/real/s13/proj-a.webp" alt="" loading="lazy" style="object-position:50% 45%"></span><span class="fm-clip" aria-hidden="true"><span class="fm-band"><span class="fm-bandin"><span class="fm-track"></span></span></span></span></a></li>
  <li><a class="fm-row" href="#"><span class="fm-idx">02</span><span class="fm-label">מטבח בדירת גג</span><span class="fm-meta">מטבחים · 2025</span><span class="fm-thumb"><img src="../assets/media/real/s13/proj-c.webp" alt="" loading="lazy" style="object-position:50% 55%"></span><span class="fm-clip" aria-hidden="true"><span class="fm-band"><span class="fm-bandin"><span class="fm-track"></span></span></span></span></a></li>
  <li><a class="fm-row" href="#"><span class="fm-idx">03</span><span class="fm-label">חדר רחצה בוטיק</span><span class="fm-meta">חדרי רחצה · 2024</span><span class="fm-thumb"><img src="../assets/media/real/s13/proj-b.webp" alt="" loading="lazy" style="object-position:50% 45%"></span><span class="fm-clip" aria-hidden="true"><span class="fm-band"><span class="fm-bandin"><span class="fm-track"></span></span></span></span></a></li>
  <li><a class="fm-row" href="#"><span class="fm-idx">04</span><span class="fm-label">פינת קריאה בסלון</span><span class="fm-meta">ריהוט ותאורה · 2024</span><span class="fm-thumb"><img src="../assets/media/real/s13/room.webp" alt="" loading="lazy" style="object-position:40% 60%"></span><span class="fm-clip" aria-hidden="true"><span class="fm-band"><span class="fm-bandin"><span class="fm-track"></span></span></span></span></a></li>
  <li><a class="fm-row" href="#"><span class="fm-idx">05</span><span class="fm-label">דירה קטנה, הרבה אור</span><span class="fm-meta">ייעוץ · 2023</span><span class="fm-thumb"><img src="../assets/media/real/s13/hero.webp" alt="" loading="lazy" style="object-position:35% 50%"></span><span class="fm-clip" aria-hidden="true"><span class="fm-band"><span class="fm-bandin"><span class="fm-track"></span></span></span></span></a></li>
</ul>
</nav>
</div>`,
  js:`(function(){
  const root=document.querySelector(".fm");
  // דמו: לשורות אין יעד, ולכן הלחיצה לא קופצת לראש העמוד. בפרויקט אלה קישורים אמיתיים
  root.querySelectorAll(".fm-row").forEach(r=>r.addEventListener("click",e=>e.preventDefault()));
  if(typeof gsap==="undefined")return;                                   // בלי GSAP: רשימת קישורים רגילה עם התמונות
  if(!matchMedia("(hover: hover) and (pointer: fine)").matches)return;   // מגע: גרסה סטטית, בלי רצועה
  root.classList.add("is-live");
  const rows=[...root.querySelectorAll(".fm-row")];
  const rm=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;   // נבדק בכל אירוע, ולכן שינוי ההעדפה נתפס
  const OFF=101;

  // המרקי נבנה מהשם והתמונה של השורה, כך שהמארקאפ נשאר רשימה נקייה
  function build(row){
    const label=row.querySelector(".fm-label").textContent.trim();
    const src=row.querySelector(".fm-thumb img").getAttribute("src");
    const pos=row.querySelector(".fm-thumb img").style.objectPosition;
    const track=row.querySelector(".fm-track");
    const unit=()=>{
      const u=document.createElement("span");u.className="fm-unit";
      const t=document.createElement("span");t.textContent=label;
      const p=document.createElement("span");p.className="fm-pill";
      const i=document.createElement("img");i.alt="";i.src=src;if(pos)i.style.objectPosition=pos;
      p.appendChild(i);u.append(t,p);return u;
    };
    track.textContent="";
    track.appendChild(unit());
    const w=track.firstChild.getBoundingClientRect().width||300;
    const n=Math.min(14,Math.max(2,Math.ceil(row.clientWidth*1.15/w)));
    const half=document.createDocumentFragment();
    for(let k=0;k<n;k++)half.appendChild(unit());
    track.textContent="";
    track.appendChild(half.cloneNode(true));track.appendChild(half);
  }
  rows.forEach(build);
  let lastW=root.clientWidth,tm;
  new ResizeObserver(()=>{if(root.clientWidth===lastW)return;lastW=root.clientWidth;clearTimeout(tm);tm=setTimeout(()=>rows.forEach(build),150);}).observe(root);

  rows.forEach(row=>{
    const band=row.querySelector(".fm-band"),inner=row.querySelector(".fm-bandin");
    const st={y:OFF,tw:null,key:false};
    // הרצועה והשכבה הפנימית נכתבות מאותו ערך, בקיזוז מדויק: התוכן עומד והמסכה מחליקה
    const paint=()=>{band.style.transform="translate3d(0,"+st.y+"%,0)";inner.style.transform="translate3d(0,"+(-st.y)+"%,0)";};
    paint();
    const go=(y,done)=>{
      if(st.tw)st.tw.kill();
      if(rm()){st.y=y;paint();if(done)done();return;}
      st.tw=gsap.to(st,{y,duration:.6,ease:"expo.out",onUpdate:paint,onComplete(){if(done)done();}});
    };
    // -1 = הקצה העליון, 1 = התחתון: הקרוב לסמן
    const edge=cy=>{const r=row.getBoundingClientRect();return (cy-r.top)<(r.bottom-cy)?-1:1;};
    const show=side=>{
      row.classList.add("is-on");
      // אם הרצועה בחוץ מתחילים מהקצה שנבחר; אם היא באמצע יציאה, ממשיכים משם בלי קפיצה
      if(Math.abs(st.y)>=OFF-1){st.y=OFF*side;paint();}
      go(0);
    };
    const hide=side=>go(OFF*side,()=>row.classList.remove("is-on"));
    row.addEventListener("pointerenter",e=>{if(e.pointerType==="touch")return;root.classList.add("is-hover");show(edge(e.clientY));});
    row.addEventListener("pointerleave",e=>{if(e.pointerType==="touch")return;hide(edge(e.clientY));});
    // מקלדת: נכנסת תמיד מלמעלה ויוצאת למעלה. פוקוס מלחיצת עכבר אינו focus-visible, ולכן לא פותח פעמיים
    row.addEventListener("focus",()=>{if(!row.matches(":focus-visible"))return;st.key=true;root.classList.add("is-hover");show(-1);});
    row.addEventListener("blur",()=>{if(!st.key)return;st.key=false;if(!row.matches(":hover"))hide(-1);if(!root.matches(":hover"))root.classList.remove("is-hover");});
  });
  root.addEventListener("pointerleave",()=>root.classList.remove("is-hover"));
})();`
}
];
