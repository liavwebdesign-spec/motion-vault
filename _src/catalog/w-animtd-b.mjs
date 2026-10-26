// מהלכים בהשראת 31 הסרטונים הציבוריים בדף הבית של animtd.store (26.10.2026). ליאב: "אני רוצה שתעבור על המאגר המלא שלו
// ותטמיע כל דבר חדש שיכול להועיל ושונה ממה שיש לנו כיום. לא רק כמה בודדים".
// נבנו מאפס מהצפייה בלבד: בלי הפרומפטים, הקוד, הסרטונים, הטקסטים או תמונות הסטוק של המקור.
// קבוצה ב: מדריכים עם זרקור, טבעת המלצות, גלריה עם רצועה, מספרים ועוגה, קווי מסלול, ואור שמקיף כרטיס מחיר.

const E = "cubic-bezier(.2,.6,.2,1)";
const IO = "cubic-bezier(.76,0,.24,1)";
const SHADOW = "0 1px 2px color-mix(in srgb,var(--ink) 6%,transparent),0 6px 20px color-mix(in srgb,var(--ink) 5%,transparent)";
const IMG = (f, w, h, alt, cls = "") =>
  `<img${cls ? ` class="${cls}"` : ""} src="../assets/media/${f}" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const PAUSE = `<svg class="i-pa" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg><svg class="i-pl" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>`;
const SVG_CSS = (sel) => `${sel}{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}`;
const H2 = "margin:0;font-size:clamp(30px,3.4vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.01em;text-wrap:balance";
const SEC = "padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)";

// b111: ארבעה מדריכים של חברת עמדות טעינה
const AS = [
  ["בית פרטי", "6 דקות קריאה", "איזו עמדת טעינה מתאימה לבית פרטי", "ההבדל בין עמדה של 7 קילוואט לעמדה של 11, מה בודקים בלוח החשמל, ומתי כדאי לחכות.", "real/s10/wallbox.webp", 1000, 1500, "עמדת טעינה לבנה מותקנת על קיר"],
  ["התקנה", "4 דקות קריאה", "מה קורה ביום ההתקנה", "כמה זמן זה לוקח, מה החשמלאי צריך מכם, ואיך בודקים שהעמדה עובדת לפני שהוא הולך.", "real/s10/install.webp", 1200, 1067, "חשמלאי מתקין עמדת טעינה על קיר"],
  ["בניין משותף", "8 דקות קריאה", "עמדת טעינה בבניין משותף", "מה צריך לאשר בוועד הבית, איך מחלקים את חשבון החשמל בין הדיירים, ומה להביא לאסיפה.", "real/s10/resident.webp", 1100, 1650, "אישה עומדת ליד רכב לבן בטעינה"],
  ["עסקים", "5 דקות קריאה", "חניון טעינה לעסק", "כמה עמדות צריך, איך גובים מהעובדים או מהלקוחות, ומה עולה ההקמה.", "real/s10/lot-paint.webp", 1600, 1067, "סימון של חניה לרכב חשמלי על אספלט"],
];

// b112: חמש המלצות של הורים במרפאת ילדים
const RQ = [
  ["real/s09/hero-corridor.webp", 2000, 1666, "רופא נותן כיף לילדה במסדרון המרפאה", "נועה פחדה מרופאים עד שהגענו לכאן. בביקור השני היא כבר רצה במסדרון לתת כיף לד״ר שגיא.", "אורית", "אמא של נועה", "מעקב התפתחות"],
  ["real/s09/step-1-booking.webp", 1500, 1200, "אמא ופעוט על הספה מסתכלים בטלפון", "קבעתי תור מהטלפון בעשר בלילה, וקיבלנו תור לבוקר שאחרי. בלי לחכות על הקו.", "שירן", "אמא של איתי", "תור באותו יום"],
  ["real/s09/step-2-welcome.webp", 1500, 1200, "רופאה מחייכת לילדה בשמלה עם נקודות", "ד״ר מאיה הסבירה לליה כל דבר לפני שעשתה אותו. זו הפעם הראשונה שיצאנו מבדיקה בלי בכי.", "רונית", "אמא של ליה", "בדיקה תקופתית"],
  ["real/s09/step-3-exam.webp", 1500, 1200, "רופא בודק ילדה בסטטוסקופ ליד אמא שלה", "קיבלנו תשובה ברורה ותוכנית לשבוע הקרוב, ולמחרת התקשרו לשאול איך היא מרגישה.", "מיכל", "אמא של תמר", "ביקור דחוף"],
  ["real/s09/step-4-home.webp", 1500, 1200, "אמא מחבקת פעוט בבית", "המרשם הגיע לאפליקציה עוד לפני שיצאנו מהחניה. חצי שעה אחרי הביקור כבר היינו בבית על הספה.", "דנה", "אמא של עומר", "מרשם דיגיטלי"],
];

// b113: ארבע תמונות של בר קוקטיילים
const FS = [
  ["real/s15/hero-glass.webp", 1100, 1375, "קוקטייל אדום על שולחן שיש מול וילון קטיפה", "הקוקטייל של הבית", "ג׳ין, פטל ובזיליקום, על שיש קר."],
  ["real/s15/room.webp", 1100, 1320, "פנים הבר באור נמוך", "הבר", "שלושים מקומות ישיבה, אור נמוך ומוזיקה שאפשר לדבר מעליה."],
  ["real/s15/pour.webp", 1000, 1250, "ברמן מוזג משקה לכוס", "מאחורי הבר", "כל קוקטייל נמזג מול האורח, עם מיצים שנסחטים באותו ערב."],
  ["real/s15/flute.webp", 1000, 1250, "כוס שמפניה עם קוקטייל בהיר", "לסיום", "שמפניה עם סירופ הדרים, על חשבון הבית ביום הולדת."],
];

// b115: מפה מצוירת בגודל 600x400. נקודת המוצא ושלושה יעדים, והקשת של כל מסלול מתעקלת כלפי מעלה.
const ORIGIN = [515, 330];
const RT = [
  { name: "לרנקה", sub: "45 דקות טיסה", price: "סוף שבוע ליד הים, החל מ-1,690 ₪ לזוג", p: [465, 215] },
  { name: "רודוס", sub: "שעה ו-20 דקות טיסה", price: "ארבעה לילות בעיר העתיקה, החל מ-2,390 ₪ לזוג", p: [275, 150] },
  { name: "אתונה", sub: "שעתיים טיסה", price: "חמישה לילות ושייט לאיים, החל מ-3,290 ₪ לזוג", p: [110, 100] },
];
const ARC = ([x0, y0], [x1, y1]) => {
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy);
  let nx = -dy / d, ny = dx / d;
  if (ny > 0) { nx = -nx; ny = -ny; }                      // תמיד הנורמל שפונה למעלה
  return [Math.round(mx + nx * d * .24), Math.round(my + ny * d * .24)];
};

// css47: שלושה מסלולים של חלל עבודה
const PG = [
  { name: "יום בודד", price: "₪120", per: "ליום", lead: "למי שצריך שולחן שקט פעם בכמה זמן.",
    inc: ["עמדה פתוחה מתשע עד שבע", "קפה, תה ופירות", "אינטרנט מהיר", "שעה בחדר ישיבות"] },
  { name: "גמיש", price: "₪890", per: "לחודש", lead: "עשרה ימים בחודש, בכל יום שתבחרו.", hot: true,
    inc: ["עשרה ימים בחודש", "עמדה פתוחה מתשע עד תשע", "ארבע שעות בחדר ישיבות", "כתובת לדואר ולחבילות"] },
  { name: "קבוע", price: "₪1,650", per: "לחודש", lead: "שולחן משלכם, שמחכה לכם כל בוקר.",
    inc: ["שולחן קבוע וכיסא ארגונומי", "ארונית נעולה", "עשר שעות בחדר ישיבות", "כניסה בכל שעה, גם בסוף שבוע"] },
];

export default [
{
  id:"b111", cat:"behavior", name:"מדריכים עם זרקור שעובר ביניהם", tech:"JS · CSS animation · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"רשימה של ארבעה מדריכים, ולידה תמונה גדולה של המדריך הנבחר. השורה הנבחרת מקבלת משטח, נפתחת ומראה משפט על המדריך, ובתחתית שלה סרגל דק מתמלא. כשהוא מתמלא, הזרקור עובר לבד למדריך הבא והתמונה מתחלפת. עכבר על הרכיב עוצר את ההחלפה, ויש כפתור לעצור אותה לגמרי.",
  when:"מרכז ידע, בלוג, מדריכים, מקרי לקוח או מוצרים מובילים, כשיש שלושה עד חמישה פריטים ותמונה טובה לכל אחד. מתאים לעמוד הבית של עסק שמוכר ידע (חשמלאי, רואה חשבון, סוכן ביטוח). לא לרשימה של עשרה מאמרים ומעלה, שם רשת כרטיסים, ולא כשהתמונות חלשות, כי התמונה הגדולה היא חצי מהרכיב.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של רשימת מאמרים שבה השורה הפעילה גדלה ומקבלת פס הדגשה. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** טאבים רגילים מחליפים תוכן רק בלחיצה. כאן יש שעון גלוי: הסרגל בתחתית השורה הפעילה הוא אנימציית CSS של שש שניות, וה-JS עובר לפריט הבא רק באירוע `animationend` שלו. לכן עצירה היא פשוט `animation-play-state:paused`, והסרגל והזמן לא יכולים להתפצל. **עוצר כש:** העכבר על הרכיב, הפוקוס בתוכו (מי שקורא בטאב לא יאבד את המקום), הרכיב מחוץ למסך (IntersectionObserver), או שלחצו «עצירת ההחלפה». **בחירה:** לחיצה על שורה, וריחוף בעכבר; השורה היא כפתור עם `aria-pressed`, ומי שלא רואה את התמונה מקבל את כל המידע מהשורה עצמה. **התמונות** בערימה אחת, והפעילה מתחלפת בעמעום והקטנה קלה; הכרטיסים הלא פעילים מקבלים `inert`, כך שהקישור «לקריאת המדריך» הוא תמיד של המדריך הנבחר. **בלי JS** כל המשפטים פתוחים וכל הכרטיסים זה מתחת לזה. **הפחתת תנועה:** אין החלפה אוטומטית, אין סרגל ואין כפתור עצירה; הבחירה ידנית. **בטלפון** התמונה מעל הרשימה, ברוחב מלא.",
  libs:[],
  css:`.as{display:grid;gap:clamp(28px,4vw,48px);${SEC}}
.as-hd{display:grid;gap:12px;max-width:44rem}
.as-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.as-hd h2{${H2}}
.as-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.as-body{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);column-gap:clamp(24px,4vw,64px);row-gap:16px;align-items:start}
.as-list{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.as-it{position:relative;display:grid;gap:4px;width:100%;padding:16px 20px 20px;border:0;border-radius:20px;background:transparent;color:inherit;font:inherit;text-align:start;cursor:pointer;overflow:hidden;transition:background-color .35s ${E}}
.as-meta{font-size:13px;font-weight:600;color:var(--muted);transition:color .35s ${E}}
.as-it b{font-size:clamp(18px,1.6vw,22px);font-weight:700;line-height:1.3}
.as-ex{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s ${E}}
.as-ex>span{min-height:0;overflow:hidden;font-size:15px;line-height:1.55;color:var(--muted)}
.as-it[aria-pressed="true"]{background:var(--card)}
.as-it[aria-pressed="true"] .as-meta{color:var(--accent)}
.as:not(.is-live) .as-ex,.as-it[aria-pressed="true"] .as-ex{grid-template-rows:1fr}
.as-it:focus-visible,.as-go:focus-visible,.as-pp:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.as-bar{position:absolute;inset-inline:20px;inset-block-end:8px;display:none;height:3px;border-radius:999px;background:var(--accent);transform:scaleX(0);transform-origin:100% 50%}
.as-bar:dir(ltr){transform-origin:0 50%}
.as.is-live .as-bar{display:block}
.as.is-live .as-it[aria-pressed="true"] .as-bar{animation:as-fill 6s linear forwards}
.as.is-hold .as-bar,.as.is-paused .as-bar,.as.is-off .as-bar{animation-play-state:paused}
@keyframes as-fill{to{transform:scaleX(1)}}
.as-pv{grid-column:2;grid-row:1/span 2;display:grid;gap:16px}
.as-card{position:relative;margin:0;overflow:hidden;aspect-ratio:4/5;max-height:620px;border-radius:24px;background:var(--card)}
.as-card img{display:block;width:100%;height:100%;object-fit:cover}
.as-card figcaption{position:absolute;inset-inline:12px;inset-block-end:12px;display:grid;gap:6px;padding:16px 18px;border-radius:16px;background:var(--card);color:var(--ink);box-shadow:${SHADOW}}
.as-chip{justify-self:start;padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--accent) 12%,transparent);color:var(--accent);font-size:13px;font-weight:700}
.as-card figcaption b{font-size:18px;font-weight:700;line-height:1.3}
.as-go{justify-self:start;display:inline-flex;align-items:center;gap:8px;min-height:44px;color:var(--ink);font-weight:600;text-decoration:none}
${SVG_CSS(".as-go svg")}
.as.is-live .as-card{grid-area:1/1;opacity:0;visibility:hidden;transform:scale(1.03);transition:opacity .5s ${E},visibility 0s .5s,transform .9s ${E}}
.as.is-live .as-card.is-on{opacity:1;visibility:visible;transform:none;transition:opacity .5s ${E},visibility 0s,transform .9s ${E}}
.as-pp{grid-column:1;grid-row:2;justify-self:start;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:8px 16px;border:0;border-radius:999px;background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink);font:inherit;font-size:14px;font-weight:600;cursor:pointer}
.as-pp[hidden]{display:none}
.as-pp svg{width:16px;height:16px;fill:currentColor}
.as-pp .i-pl,.as.is-paused .as-pp .i-pa{display:none}
.as.is-paused .as-pp .i-pl{display:block}
@media(prefers-reduced-motion:reduce){.as.is-live .as-bar{display:none}.as-ex{transition:none}.as.is-live .as-card{transform:none!important;transition-duration:.2s}}
@media(max-width:860px){.as-body{grid-template-columns:minmax(0,1fr)}.as-pv{grid-column:1;grid-row:auto;order:-1}.as-card{aspect-ratio:16/11}.as-pp{grid-row:auto}}`,
  html:`<div class="stage"><section class="as" data-as>
  <div class="as-hd">
    <p class="as-k">מרכז הידע</p>
    <h2>מדריכים לפני שמתקינים עמדת טעינה</h2>
    <p>ארבעה מדריכים קצרים שכתבו החשמלאים שלנו, לפי השאלות שאנחנו שומעים הכי הרבה בטלפון.</p>
  </div>
  <div class="as-body">
    <ul class="as-list">
${AS.map(([c, t, h, x], i) => `      <li><button class="as-it" type="button" aria-pressed="${i === 0}" aria-controls="as-c${i}"><span class="as-meta">${c} · ${t}</span><b>${h}</b><span class="as-ex"><span>${x}</span></span><span class="as-bar" aria-hidden="true"></span></button></li>`).join("\n")}
    </ul>
    <div class="as-pv">
${AS.map(([c, , h, , f, w, ht, alt], i) => `      <figure class="as-card${i === 0 ? " is-on" : ""}" id="as-c${i}">${IMG(f, w, ht, alt)}<figcaption><span class="as-chip">${c}</span><b>${h}</b><a class="as-go" href="#">לקריאת המדריך ${ARROW}</a></figcaption></figure>`).join("\n")}
    </div>
    <button class="as-pp" type="button" hidden>${PAUSE}<span>עצירת ההחלפה</span></button>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-as]");
  if(!root)return;
  const its=[...root.querySelectorAll(".as-it")],cards=[...root.querySelectorAll(".as-card")],pp=root.querySelector(".as-pp");
  const fine=matchMedia("(hover: hover) and (pointer: fine)"),still=matchMedia("(prefers-reduced-motion: reduce)");
  let cur=0;
  root.classList.add("is-live");          // בלי JS כל המשפטים פתוחים וכל הכרטיסים גלויים
  cards.forEach((c,i)=>{c.inert=i!==0;});
  if(!still.matches)pp.hidden=false;
  const go=j=>{
    if(j===cur)return;cur=j;
    its.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===j)));
    cards.forEach((c,i)=>{c.classList.toggle("is-on",i===j);c.inert=i!==j;});
  };
  its.forEach((b,i)=>{
    b.addEventListener("click",()=>go(i));
    b.addEventListener("pointerenter",()=>{if(fine.matches)go(i);});
    // הסרגל של השורה הפעילה הוא השעון: כשהוא מתמלא עוברים למדריך הבא, וכשהוא עוצר גם ההחלפה עוצרת
    b.querySelector(".as-bar").addEventListener("animationend",()=>{if(i===cur)go((cur+1)%its.length);});
  });
  const hold=on=>root.classList.toggle("is-hold",on);
  root.addEventListener("pointerenter",()=>hold(true));
  root.addEventListener("pointerleave",()=>hold(false));
  root.addEventListener("focusin",()=>hold(true));
  root.addEventListener("focusout",e=>{if(!root.contains(e.relatedTarget))hold(false);});
  pp.addEventListener("click",()=>{
    const on=!root.classList.contains("is-paused");
    root.classList.toggle("is-paused",on);
    pp.querySelector("span").textContent=on?"המשך ההחלפה":"עצירת ההחלפה";
  });
  // מחוץ למסך השעון עומד, כדי שמי שגולל חזרה ימצא את אותו מדריך
  if("IntersectionObserver" in window){
    root.classList.add("is-off");
    new IntersectionObserver(es=>es.forEach(e=>root.classList.toggle("is-off",!e.isIntersecting)),{threshold:.35}).observe(root);
  }
})();`
},
{
  id:"b112", cat:"behavior", name:"טבעת תמונות שמסתובבת עם ההמלצות", tech:"CSS 3D · JS", status:"מאושר-עין", runway:false,
  desc:"חמש תמונות מסודרות בטבעת תלת ממדית, אחת מלפנים ושתיים בצדדים, מוטות לאחור. לצדן המלצה של הורה. לחיצה על החץ או על הטבעת מסובבת אותה לתמונה הבאה, וההמלצה מתחלפת: הישנה מיטשטשת ונעלמת, והחדשה מתחדדת למקום. ליד שם הממליץ תווית של סוג הביקור.",
  when:"המלצות של לקוחות כשלכל המלצה יש תמונה אמיתית (מהמקום, מהפרויקט, מהלקוח): מרפאה, גן, סטודיו, קבלן, צלם. ארבע עד שש המלצות. לא כשאין תמונות, שם רשימה או קיר המלצות, ולא באתר שמוכר רצינות שקטה (משפט, פיננסים), כי הסיבוב בולט.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של טבעת כרטיסים תלת ממדית שמסתובבת עם המלצות. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** b62 הוא קאברפלואו שטוח (כרטיסים בשורה שמוטים), ו-g201 הוא טבעת תמונות שנפתחת לשדה בגלילה. כאן הטבעת היא גליל אמיתי שמסתובב כגוף אחד בלחיצה, ומסונכרן עם ההמלצה. **הגיאומטריה:** כל תמונה מסובבת ב-`rotateY` של 360 חלקי מספר התמונות ונדחפת החוצה ב-`translateZ` של הרדיוס; הטבעת כולה נסוגה באותו רדיוס, כך שהתמונה הקדמית בגודל הטבעי שלה. הרדיוס מחושב מרוחב התמונה ב-CSS (`calc`), ולכן הטבעת מתכווצת עם המסך. `backface-visibility:hidden` מסתיר את התמונות שמאחור. **הסיבוב:** ה-JS סופר צעדים ולא אינדקס, כך שהמעבר מהאחרונה לראשונה ממשיך באותו כיוון ולא חוזר אחורה סיבוב שלם. משך 1.1 שניות בעקומת in-out המאושרת. **ההמלצה:** כל ההמלצות באותו תא גריד; היוצאת מקבלת טשטוש ושקיפות, והנכנסת מתחדדת אחרי רבע שנייה, כשהטבעת כבר בתנועה. אזור ההמלצות הוא `aria-live`, כי ההחלפה תמיד ביוזמת המשתמש. **מקלדת:** כפתורי חץ עם תווית, וחצי המקלדת כשהפוקוס עליהם; הטבעת עצמה `aria-hidden`, כי היא חוזרת על התמונה. **בלי JS** כל ההמלצות מוצגות זו מתחת לזו והטבעת עומדת. **הפחתת תנועה:** בלי סיבוב ובלי טשטוש, רק החלפה. **בטלפון** הטבעת מעל ההמלצה.",
  libs:[],
  css:`.rq{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,5vw,72px);${SEC};overflow:clip}
.rq-txt{display:grid;gap:20px;align-content:center}
.rq-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.rq-txt h2{${H2}}
.rq-qs{display:grid;gap:32px}
.rq-q{margin:0;display:grid;gap:16px}
.rq-q p{margin:0;font-size:clamp(20px,1.9vw,26px);font-weight:500;line-height:1.5;text-wrap:pretty}
.rq-q footer{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;font-size:15px}
.rq-q footer span{color:var(--muted)}
.rq-q footer .rq-chip{padding:4px 12px;border-radius:999px;background:var(--card);color:var(--ink);font-size:13px;font-weight:600}
.rq-nav{display:flex;align-items:center;gap:12px}
.rq-nav[hidden]{display:none}
.rq-nav button{display:grid;place-items:center;width:48px;height:48px;border:0;border-radius:50%;background:var(--ink);color:var(--bg);cursor:pointer;transition:transform .3s ${E}}
${SVG_CSS(".rq-nav svg")}
.rq-prev svg{transform:scaleX(-1)}
.rq-nav button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(hover:hover) and (pointer:fine){.rq-nav button:hover{transform:scale(1.06)}}
.rq-count{margin:0;min-width:48px;text-align:center;font-size:15px;font-weight:600;color:var(--muted);font-variant-numeric:tabular-nums}
.rq-scene{--w:clamp(150px,16vw,230px);--r:calc(var(--w) * .69 + 24px);display:grid;place-items:center;height:calc(var(--w) * 1.25 + 64px);perspective:1100px;cursor:pointer}
.rq-ring{position:relative;width:var(--w);aspect-ratio:4/5;transform-style:preserve-3d;transform:translateZ(calc(var(--r) * -1)) rotateY(var(--rot,0deg));transition:transform 1.1s ${IO}}
.rq-p{position:absolute;inset:0;margin:0;overflow:hidden;border-radius:20px;background:var(--card);box-shadow:${SHADOW};-webkit-backface-visibility:hidden;backface-visibility:hidden;transform:rotateY(calc(var(--i) * var(--a))) translateZ(var(--r));transition:filter .8s ${E}}
.rq-p img{display:block;width:100%;height:100%;object-fit:cover}
.rq.is-live .rq-p:not(.is-on){filter:brightness(.7) saturate(.85)}
.rq.is-live .rq-q{grid-area:1/1;opacity:0;visibility:hidden;filter:blur(10px);transform:translateY(12px);transition:opacity .4s ${E},filter .4s ${E},transform .4s ${E},visibility 0s .4s}
.rq.is-live .rq-q.is-on{opacity:1;visibility:visible;filter:none;transform:none;transition:opacity .7s ${E} .25s,filter .7s ${E} .25s,transform .7s ${E} .25s,visibility 0s}
@media(prefers-reduced-motion:reduce){.rq-ring{transition:none}.rq.is-live .rq-q,.rq.is-live .rq-q.is-on{filter:none;transform:none;transition:opacity .2s ${E},visibility 0s}}
@media(max-width:860px){.rq{grid-template-columns:minmax(0,1fr)}.rq-scene{order:-1}}`,
  html:`<div class="stage"><section class="rq" data-rq>
  <div class="rq-txt">
    <p class="rq-k">מה ההורים מספרים</p>
    <h2>מרפאה שילדים לא מפחדים לחזור אליה</h2>
    <div class="rq-qs" aria-live="polite">
${RQ.map(([, , , , q, n, r, c], i) => `      <blockquote class="rq-q${i === 0 ? " is-on" : ""}"><p>${q}</p><footer><b>${n}</b><span>${r}</span><span class="rq-chip">${c}</span></footer></blockquote>`).join("\n")}
    </div>
    <div class="rq-nav" hidden>
      <button class="rq-prev" type="button" aria-label="ההמלצה הקודמת">${ARROW}</button>
      <p class="rq-count" aria-hidden="true"><b>1</b> / ${RQ.length}</p>
      <button class="rq-next" type="button" aria-label="ההמלצה הבאה">${ARROW}</button>
    </div>
  </div>
  <div class="rq-scene" aria-hidden="true">
    <div class="rq-ring" style="--a:${360 / RQ.length}deg">
${RQ.map(([f, w, h, alt], i) => `      <figure class="rq-p${i === 0 ? " is-on" : ""}" style="--i:${i}">${IMG(f, w, h, alt)}</figure>`).join("\n")}
    </div>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-rq]");
  if(!root)return;
  const ring=root.querySelector(".rq-ring"),ps=[...root.querySelectorAll(".rq-p")],qs=[...root.querySelectorAll(".rq-q")];
  const count=root.querySelector(".rq-count b"),n=qs.length,A=360/n;
  let step=0;
  root.classList.add("is-live");          // בלי JS כל ההמלצות זו מתחת לזו
  root.querySelector(".rq-nav").hidden=false;
  const show=()=>{
    const i=((step%n)+n)%n;
    // סופרים צעדים ולא אינדקס: מהאחרונה לראשונה הטבעת ממשיכה באותו כיוון
    ring.style.setProperty("--rot",(-step*A)+"deg");
    ps.forEach((p,k)=>p.classList.toggle("is-on",k===i));
    qs.forEach((q,k)=>q.classList.toggle("is-on",k===i));
    count.textContent=i+1;
  };
  const move=d=>{step+=d;show();};
  root.querySelector(".rq-prev").addEventListener("click",()=>move(-1));
  root.querySelector(".rq-next").addEventListener("click",()=>move(1));
  root.querySelector(".rq-scene").addEventListener("click",()=>move(1));
  root.querySelector(".rq-nav").addEventListener("keydown",e=>{
    if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;
    e.preventDefault();
    const rtl=getComputedStyle(root).direction==="rtl";
    move((e.key==="ArrowLeft")===rtl?1:-1);   // החץ שמצביע לכיוון הקריאה הוא «הבא»
  });
})();`
},
{
  id:"b113", cat:"behavior", name:"גלריה עם רצועת תמונות שמתקדמת לבד", tech:"JS · CSS animation · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"תמונה גדולה עם כיתוב, ומתחתיה רצועה של ארבע תמונות קטנות. הקטנה הפעילה בולטת ועולה מעט לכיוון התמונה הגדולה, ובתחתיתה סרגל מתמלא; כשהוא מתמלא, התמונה הגדולה מתחלפת לבאה בעמעום והתרחקות קלה, והכיתוב מתחלף איתה. לחיצה על תמונה קטנה עוברת אליה. מונה קטן בפינה, וכפתור לעצירה.",
  when:"מקום או חוויה שרוצים להראות בכמה רגעים: בר, מסעדה, צימר, אולם, סטודיו, נכס להשכרה. שלוש עד שש תמונות באותו יחס, ולכל אחת משפט. לא לקטלוג מוצרים, שם c25 בלי החלפה אוטומטית, ולא לתמונות שצריך לבחון בעיון (תוכנית, מפרט), כי ההחלפה לא מחכה.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של גלריה עם רצועת ממוזערות שמתקדמת לבד. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** c25 הוא תמונה ראשית ופס ממוזערות שמתחלף רק בלחיצה. כאן הגלריה מתקדמת לבד עם שעון גלוי בתוך הממוזערת הפעילה, והתמונה הגדולה נכנסת בהתרחקות (מ-1.06 ל-1). **השעון:** כמו ב-b111, הסרגל הוא אנימציית CSS של חמש שניות, וה-JS עובר לתמונה הבאה רק ב-`animationend`. **עוצר כש:** העכבר על הגלריה, הפוקוס בתוכה, הגלריה מחוץ למסך, או בכפתור העצירה (WCAG 2.2.2). **הממוזערת הפעילה** עולה ב-`transform` (הזזה למעלה בלבד, בלי הגדלה), לא ברוחב, כך שאין קפיצות בפריסה; האחרות בשקיפות .55. **הריווח (תוקן 26.10 לפי ליאב):** הרווח בין התמונה הגדולה לרצועה הוא הרווח בין הממוזערות ועוד גובה ההרמה (`--fs-gap` ו-`--fs-lift`), כך שהפעילה נעצרת במרחק מהתמונה הגדולה ששווה בדיוק לרווח בינה לשכנות. בגרסה הקודמת היא עלתה עם הגדלה ל-1.06, כמעט נגעה בתמונה הגדולה וחרגה מהקו שלה בקצה. כל ממוזערת היא כפתור עם `aria-pressed` ותווית. **הכיתוב, המונה והעצירה** יושבים על משטח בצבע הכרטיס עם טשטוש, ולא על שכבה כהה שקופה: שכבה מ-ink מתבהרת באתר כהה, והטקסט נעלם מעל תמונה כהה (נמצא בבדיקת העורות). **בלי JS** מוצגות התמונה והכיתוב הראשונים, והממוזערות לא עושות כלום. **הפחתת תנועה:** בלי החלפה אוטומטית ובלי כפתור עצירה; הבחירה בלחיצה. **בטלפון** אותו מבנה, והרצועה נשארת בשורה אחת.",
  libs:[],
  css:`.fs{--fs-gap:12px;--fs-lift:8px;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);align-items:center;gap:clamp(32px,5vw,72px);${SEC}}
.fs-txt{display:grid;gap:16px;justify-items:start}
.fs-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.fs-txt h2{${H2}}
.fs-txt>p:not(.fs-k){margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fs-acts{display:flex;flex-wrap:wrap;gap:12px;margin-top:8px}
.fs-cta,.fs-alt{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;font-weight:600;text-decoration:none}
.fs-cta{background:var(--accent);color:var(--accent-ink)}
.fs-alt{background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink)}
/* הרווח מעל הרצועה = הרווח בין הממוזערות + ההרמה של הפעילה: כשהיא עולה, המרחק שלה מהתמונה הגדולה שווה בדיוק לרווח בינה לשכנות (ליאב, 26.10: היא נצמדה כמעט לתמונה) */
.fs-view{position:relative;display:grid;gap:calc(var(--fs-gap) + var(--fs-lift))}
/* width:100% ולא אוטומטי: עם aspect-ratio ו-max-height לבד התמונה מתכווצת לרוחב 512 ונצמדת לצד אחד, והמונה והעצירה (שממוקמים לפי .fs-view) נשארים בחוץ על הקצה */
.fs-main{position:relative;display:grid;width:100%;margin:0;overflow:hidden;aspect-ratio:4/5;max-height:640px;border-radius:24px;background:var(--card)}
.fs-main img{grid-area:1/1;display:block;width:100%;height:100%;object-fit:cover}
/* הכיתוב, המונה והעצירה יושבים על משטח בצבע הכרטיס ולא על שכבה כהה שקופה: שכבה מ-ink מתבהרת באתר כהה, ומעל תמונה כהה הטקסט נעלם */
.fs-cap{position:absolute;inset-inline:16px;inset-block-end:16px;display:grid;padding:14px 18px;border-radius:16px;background:color-mix(in srgb,var(--card) 90%,transparent);color:var(--ink);box-shadow:${SHADOW};-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.fs-cap>div{grid-area:1/1;display:grid;gap:2px}
.fs-cap b{font-size:18px;font-weight:700}
.fs-cap span{font-size:15px;line-height:1.5;color:var(--muted)}
.fs-count,.fs-pp{position:absolute;inset-block-start:16px;z-index:1;color:var(--ink);background:color-mix(in srgb,var(--card) 90%,transparent);box-shadow:${SHADOW};-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.fs-count{inset-inline-start:16px;margin:0;padding:6px 12px;border-radius:999px;font-size:14px;font-weight:600;font-variant-numeric:tabular-nums}
.fs-pp{inset-inline-end:16px;display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;cursor:pointer}
.fs-pp[hidden]{display:none}
.fs-pp svg{width:18px;height:18px;fill:currentColor}
.fs-pp .i-pl,.fs.is-paused .fs-pp .i-pa{display:none}
.fs.is-paused .fs-pp .i-pl{display:block}
.fs-strip{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--fs-gap)}
.fs-th{position:relative;display:block;width:100%;padding:0;border:0;border-radius:14px;overflow:hidden;aspect-ratio:1;background:var(--card);cursor:pointer;opacity:.55;transition:opacity .4s ${E},transform .5s ${E}}
.fs-th img{display:block;width:100%;height:100%;object-fit:cover}
/* הרמה בלבד, בלי הגדלה: הגדלה דחפה את הממוזערת שבקצה מעבר לקו של התמונה הגדולה */
.fs-th[aria-pressed="true"]{opacity:1;transform:translateY(calc(var(--fs-lift) * -1))}
.fs-th:focus-visible,.fs-pp:focus-visible,.fs-cta:focus-visible,.fs-alt:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(hover:hover) and (pointer:fine){.fs-th:hover{opacity:1}}
.fs-bar{position:absolute;inset-inline:8px;inset-block-end:8px;display:none;height:3px;border-radius:999px;background:var(--bg);transform:scaleX(0);transform-origin:100% 50%}
.fs-bar:dir(ltr){transform-origin:0 50%}
.fs.is-live .fs-bar{display:block}
.fs.is-live .fs-th[aria-pressed="true"] .fs-bar{animation:fs-fill 5s linear forwards}
.fs.is-hold .fs-bar,.fs.is-paused .fs-bar,.fs.is-off .fs-bar{animation-play-state:paused}
@keyframes fs-fill{to{transform:scaleX(1)}}
.fs:not(.is-live) .fs-main img:not(.is-on),.fs:not(.is-live) .fs-cap>div:not(.is-on){display:none}
.fs.is-live .fs-main img{opacity:0;transform:scale(1.06);transition:opacity .8s ${E},transform 1.4s ${E}}
.fs.is-live .fs-main img.is-on{opacity:1;transform:none}
.fs.is-live .fs-cap>div{opacity:0;transform:translateY(8px);transition:opacity .4s ${E},transform .4s ${E}}
.fs.is-live .fs-cap>div.is-on{opacity:1;transform:none;transition-delay:.2s}
@media(prefers-reduced-motion:reduce){.fs.is-live .fs-bar{display:none}.fs.is-live .fs-main img,.fs.is-live .fs-cap>div{transform:none!important;transition-duration:.2s}.fs-th{transition-duration:.2s}}
@media(max-width:860px){.fs{--fs-gap:8px;--fs-lift:6px;grid-template-columns:minmax(0,1fr)}.fs-main{aspect-ratio:4/4.4}}`,
  html:`<div class="stage"><section class="fs" data-fs>
  <div class="fs-txt">
    <p class="fs-k">בר הקטיפה, נחלת בנימין</p>
    <h2>ערב אצלנו, בארבע תמונות</h2>
    <p>פתוחים מרביעי עד שבת משמונה בערב. אפשר להזמין שולחן, ותמיד נשאר מקום ליד הבר למי שמגיע בלי הזמנה.</p>
    <div class="fs-acts"><a class="fs-cta" href="#">להזמנת שולחן</a><a class="fs-alt" href="#">לתפריט</a></div>
  </div>
  <div class="fs-view">
    <figure class="fs-main">
${FS.map(([f, w, h, alt], i) => `      ${IMG(f, w, h, alt, i === 0 ? "is-on" : "")}`).join("\n")}
      <figcaption class="fs-cap">${FS.map(([, , , , t, s], i) => `<div${i === 0 ? ' class="is-on"' : ""}><b>${t}</b><span>${s}</span></div>`).join("")}</figcaption>
    </figure>
    <p class="fs-count" aria-hidden="true"><b>1</b> / ${FS.length}</p>
    <ul class="fs-strip">
${FS.map(([f, w, h, , t], i) => `      <li><button class="fs-th" type="button" aria-pressed="${i === 0}" aria-label="${t}">${IMG(f, w, h, "")}<span class="fs-bar" aria-hidden="true"></span></button></li>`).join("\n")}
    </ul>
    <button class="fs-pp" type="button" aria-label="עצירת ההחלפה" hidden>${PAUSE}</button>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-fs]");
  if(!root)return;
  const ths=[...root.querySelectorAll(".fs-th")],imgs=[...root.querySelectorAll(".fs-main img")],caps=[...root.querySelectorAll(".fs-cap>div")];
  const num=root.querySelector(".fs-count b"),pp=root.querySelector(".fs-pp"),view=root.querySelector(".fs-view");
  let cur=0;
  root.classList.add("is-live");
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches)pp.hidden=false;
  const go=j=>{
    if(j===cur)return;cur=j;
    ths.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===j)));
    [imgs,caps].forEach(g=>g.forEach((el,i)=>el.classList.toggle("is-on",i===j)));
    num.textContent=j+1;
  };
  ths.forEach((b,i)=>{
    b.addEventListener("click",()=>go(i));
    // הסרגל בממוזערת הפעילה הוא השעון: מתמלא, ועוברים לתמונה הבאה
    b.querySelector(".fs-bar").addEventListener("animationend",()=>{if(i===cur)go((cur+1)%ths.length);});
  });
  const hold=on=>root.classList.toggle("is-hold",on);
  view.addEventListener("pointerenter",()=>hold(true));
  view.addEventListener("pointerleave",()=>hold(false));
  view.addEventListener("focusin",()=>hold(true));
  view.addEventListener("focusout",e=>{if(!view.contains(e.relatedTarget))hold(false);});
  pp.addEventListener("click",()=>{
    const on=!root.classList.contains("is-paused");
    root.classList.toggle("is-paused",on);
    pp.setAttribute("aria-label",on?"המשך ההחלפה":"עצירת ההחלפה");
  });
  if("IntersectionObserver" in window){
    root.classList.add("is-off");
    new IntersectionObserver(es=>es.forEach(e=>root.classList.toggle("is-off",!e.isIntersecting)),{threshold:.35}).observe(root);
  }
})();`
},
{
  id:"b114", cat:"behavior", name:"מספר ענק שסופר ועוגה שמתמלאת", tech:"SVG · JS · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"מספר ענק אחד שסופר מאפס כשהסקשן נכנס למסך, ומתחתיו מה הוא אומר. לצדו עוגה בשלושה צבעים שהפלחים שלה נמתחים בזה אחר זה, עם מקרא. בשורה שמתחת שלושה נתונים נוספים שסופרים יחד איתו. הכל קורה פעם אחת.",
  when:"עסק שהמספרים שלו הם הטיעון: מתקין סולארי, קבלן, משרד רואי חשבון, חברת הובלות, עמותה. מספר אחד שהוא הגאווה (כמה פרויקטים, כמה לקוחות), ופילוח אחד שמסביר אותו. לא כשהמספרים קטנים או עגולים מדי (\"מעל 50 לקוחות\"), כי הספירה מבליטה אותם, ולא יותר מפעם אחת בעמוד.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של לוח נתונים שהמספרים בו סופרים ודיאגרמה מתמלאת. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** b02 הוא מספר שסופר, לבד. כאן יש היררכיה (מספר אחד ענק ושלושה קטנים) ועוגה שמסבירה את המספר. **הספירה:** ה-JS מאפס את המספרים רק אחרי שהוא נטען (בלי JS רואים את הערך הסופי), וסופר 1.6 שניות עם האטה בסוף (ease-out בחזקה שלישית), בעיצוב מספרים עברי (`Intl.NumberFormat`). `tabular-nums` שומר על רוחב קבוע, כך שהשורה לא רוקדת בזמן הספירה. **קורא מסך** מקבל את הערך הסופי מטקסט נסתר, והמספר הסופר `aria-hidden`. **העוגה:** שלושה עיגולי SVG עם `pathLength=100`, כך ש-`stroke-dasharray` הוא אחוזים פשוטים; כל פלח מתחיל בסוף הקודם (`stroke-dashoffset`), עם רווח קטן ביניהם. המצב ההתחלתי `0 100` חל רק עם `is-live`, והמתיחה היא transition עם השהיה של רבע שנייה בין הפלחים. **הצבעים** מהטוקנים (accent, ערבוב שלו עם הכרטיס, ink), כך שהעוגה מתחלפת עם העור. **הפחתת תנועה:** העוגה מוצגת מלאה מההתחלה, והמספרים עדיין סופרים, כי מספר שמשתנה הוא טקסט ולא תנועה (כמו ב-b02). **בטלפון** הכל בטור, והנתונים הקטנים אחד מתחת לשני.",
  libs:[],
  css:`.sc{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(24px,3vw,40px);${SEC}}
.sc-main{display:grid;gap:12px;align-content:center}
.sc-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.sc-big{margin:0;font-size:clamp(88px,13vw,192px);font-weight:800;line-height:.95;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.sc-main h2{margin:0;max-width:24ch;font-size:clamp(24px,2.4vw,32px);font-weight:700;line-height:1.25;text-wrap:balance}
.sc-lead{margin:0;max-width:46ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sc-pie{display:grid;justify-items:center;gap:24px;margin:0;padding:clamp(24px,3vw,40px);border-radius:24px;background:var(--card)}
.sc-ring{position:relative;width:min(100%,240px);aspect-ratio:1}
.sc-ring svg{display:block;width:100%;height:100%;transform:rotate(-90deg)}
.sc-track,.sc-seg{fill:none;stroke-width:14}
.sc-track{stroke:color-mix(in srgb,var(--ink) 7%,transparent)}
.sc-seg{transition:stroke-dasharray 1.2s ${E}}
.sc-seg.s1{stroke:var(--accent);stroke-dasharray:50.5 49.5;stroke-dashoffset:0}
.sc-seg.s2{stroke:color-mix(in srgb,var(--accent) 45%,var(--card));stroke-dasharray:26.5 73.5;stroke-dashoffset:-52;transition-delay:.25s}
.sc-seg.s3{stroke:var(--ink);stroke-dasharray:18.5 81.5;stroke-dashoffset:-80;transition-delay:.5s}
.sc.is-live:not(.is-in) .sc-seg{stroke-dasharray:0 100}
.sc-mid{position:absolute;inset:0;display:grid;place-content:center;gap:2px;text-align:center}
.sc-mid b{font-size:clamp(32px,3.4vw,44px);font-weight:800;line-height:1}
.sc-mid span{font-size:14px;color:var(--muted)}
.sc-pie figcaption{display:grid;gap:12px;width:100%}
.sc-pie figcaption>b{font-size:16px;font-weight:700}
.sc-leg{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.sc-leg li{display:flex;align-items:center;gap:10px;font-size:15px}
.sc-leg li b{margin-inline-start:auto;font-variant-numeric:tabular-nums}
.sc-leg i{width:12px;height:12px;flex:none;border-radius:50%;background:var(--c)}
.sc-side{grid-column:1/-1;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.sc-side li{display:grid;gap:6px;align-content:start;padding:clamp(20px,2.4vw,28px);border-radius:20px;background:var(--card)}
.sc-v{margin:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:8px}
.sc-v .sc-n{font-size:clamp(40px,4.4vw,60px);font-weight:800;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.sc-u{font-size:16px;font-weight:700}
.sc-side li>p:last-child{margin:0;font-size:15px;line-height:1.5;color:var(--muted)}
.sc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(prefers-reduced-motion:reduce){.sc-seg{transition:none}}
@media(max-width:860px){.sc{grid-template-columns:minmax(0,1fr)}.sc-side{grid-template-columns:minmax(0,1fr)}}`,
  html:`<div class="stage"><section class="sc" data-sc>
  <div class="sc-main">
    <p class="sc-k">סולאר הגליל, מאז 2019</p>
    <p class="sc-big"><span class="sc-sr">1,240</span><b class="sc-n" data-to="1240" aria-hidden="true">1,240</b></p>
    <h2>מערכות סולאריות שהתקנו על גגות בצפון</h2>
    <p class="sc-lead">בתים פרטיים, משקים ומפעלים, מהגולן ועד חדרה. כל מערכת מנוטרת מרחוק, ואנחנו מתקשרים לפני שאתם שמים לב לתקלה.</p>
  </div>
  <figure class="sc-pie">
    <div class="sc-ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle class="sc-track" cx="60" cy="60" r="46" pathLength="100"/>
        <circle class="sc-seg s1" cx="60" cy="60" r="46" pathLength="100"/>
        <circle class="sc-seg s2" cx="60" cy="60" r="46" pathLength="100"/>
        <circle class="sc-seg s3" cx="60" cy="60" r="46" pathLength="100"/>
      </svg>
      <p class="sc-mid" aria-hidden="true"><b>52%</b><span>בתים פרטיים</span></p>
    </div>
    <figcaption>
      <b>על אילו גגות התקנו</b>
      <ul class="sc-leg">
        <li><i style="--c:var(--accent)"></i>בתים פרטיים<b>52%</b></li>
        <li><i style="--c:color-mix(in srgb,var(--accent) 45%,var(--card))"></i>משקים ולולים<b>28%</b></li>
        <li><i style="--c:var(--ink)"></i>עסקים ומפעלים<b>20%</b></li>
      </ul>
    </figcaption>
  </figure>
  <ul class="sc-side">
    <li><p class="sc-v"><span class="sc-sr">18</span><b class="sc-n" data-to="18" aria-hidden="true">18</b><span class="sc-u">מגה-וואט</span></p><p>הספק מותקן בכל המערכות שהקמנו</p></li>
    <li><p class="sc-v"><span class="sc-sr">97%</span><b class="sc-n" data-to="97" data-suf="%" aria-hidden="true">97%</b><span class="sc-u">ממליצים</span></p><p>מהלקוחות ימליצו עלינו לחבר, לפי הסקר שאחרי ההתקנה</p></li>
    <li><p class="sc-v"><span class="sc-sr">25</span><b class="sc-n" data-to="25" aria-hidden="true">25</b><span class="sc-u">שנות אחריות</span></p><p>על הפאנלים, ועשר שנים על הממיר</p></li>
  </ul>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-sc]");
  if(!root)return;
  root.classList.add("is-live");
  // בהפחתת תנועה העוגה מלאה מההתחלה, והמספרים עדיין סופרים: מספר שמשתנה הוא טקסט ולא תנועה (motion.md 4, כמו ב-b02)
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)root.classList.add("is-in");
  const nums=[...root.querySelectorAll(".sc-n")],fmt=new Intl.NumberFormat("he-IL");
  const put=k=>nums.forEach(b=>{b.textContent=fmt.format(Math.round(+b.dataset.to*k))+(b.dataset.suf||"");});
  put(0);                                  // מאפסים רק עכשיו: בלי JS רואים את הערך הסופי
  const run=()=>{
    root.classList.add("is-in");           // הפלחים של העוגה נמתחים ב-CSS
    const t0=performance.now(),D=1600;
    const tick=now=>{
      const p=Math.min(1,(now-t0)/D);
      put(1-Math.pow(1-p,3));              // מאט לקראת הסוף, כמו מונה שמגיע למקום
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if(!("IntersectionObserver" in window))return run();
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();run();}},{threshold:.4});
  io.observe(root);
})();`
},
{
  id:"b115", cat:"behavior", name:"קווי מסלול שנמתחים על תמונה", tech:"SVG · JS · requestAnimationFrame", status:"מאושר-עין", runway:false,
  desc:"תמונה גדולה של שקיעה מעל הים, ועליה שלוש קשתות שנמתחות מתל אביב לשלושה יעדים כשהכרטיס נכנס למסך. בקצה כל קשת נקודה ותווית עם שם היעד וזמן הטיסה. לצד התמונה רשימת היעדים: בחירה ביעד מבליטה את הקשת שלו, מעמעמת את האחרות, ונקודה טסה לאורכה מהמוצא ליעד.",
  when:"סוכנות נסיעות, חברת שילוח או הובלות, רשת סניפים, שירות שמגיע לכמה אזורים, או כל עסק שהסיפור שלו הוא \"מכאן לשם\". שלושה עד חמישה יעדים. לא כמפה אמיתית לניווט (הקשתות הן איור, לא גאוגרפיה), ולא כשיש עשרות יעדים, שם רשימה עם חיפוש.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של כרטיס תמונה שעליו נמתחים קווי מסלול עם תוויות יעד. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** g172 הוא גלובוס נקודות בקנבס עם קשתות. כאן הקשתות יושבות על תמונה אמיתית, והרשימה לידן היא הממשק: בחירה ביעד מבליטה את הקשת ושולחת עליה נקודה. **המפה** היא SVG בגודל 600 על 400, והכרטיס נעול על יחס 3:2 בכל רוחב, כך שהתוויות (HTML במיקום באחוזים) יושבות בדיוק על קצות הקשתות. הקשת של כל מסלול היא עקומה ריבועית שנקודת הבקרה שלה מחושבת מהאמצע, בניצב כלפי מעלה, ב-24% מאורך המסלול. **המתיחה:** `pathLength=1` ו-`stroke-dashoffset` מ-1 ל-0, בדירוג של 0.2 שנייה בין הקשתות; התוויות נכנסות אחריהן. **הנקודה** היא אלמנט HTML שה-JS מזיז ב-`transform` לפי נוסחת העקומה (בלי `getPointAtLength`, שמתנהג שונה בין דפדפנים כש-`pathLength` מוגדר), ב-1.5 שניות עם האצה והאטה, כמו המראה ונחיתה. **הבחירה:** כפתורים עם `aria-pressed`; בעכבר גם ריחוף. אחרי שהקשתות נמתחו, היעד הראשון נבחר לבד פעם אחת. **ניגודיות:** הקשתות בצבע הרקע עם צל רך, והתוויות על כרטיס אטום, כך שהן קריאות על כל תמונה. **בלי JS** הקשתות והתוויות מוצגות, בלי בחירה. **הפחתת תנועה:** בלי מתיחה ובלי טיסה; הנקודה קופצת ליעד. **בטלפון** התמונה מעל הרשימה, וזמני הטיסה יורדים מהתוויות (הם נשארים ברשימה).",
  libs:[],
  css:`.rl{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center;gap:clamp(32px,5vw,72px);${SEC}}
.rl-txt{display:grid;gap:16px;justify-items:start}
.rl-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.rl-txt h2{${H2}}
.rl-txt>p:not(.rl-k){margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.rl-list{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:4px;width:100%}
.rl-it{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:2px 16px;width:100%;padding:14px 18px;border:0;border-radius:16px;background:transparent;color:inherit;font:inherit;text-align:start;cursor:pointer;transition:background-color .3s ${E}}
.rl-it b{font-size:18px;font-weight:700}
.rl-time{font-size:14px;font-weight:600;color:var(--muted);transition:color .3s ${E}}
.rl-price{grid-column:1/-1;font-size:15px;color:var(--muted)}
.rl-it[aria-pressed="true"]{background:var(--card)}
.rl-it[aria-pressed="true"] .rl-time{color:var(--accent)}
.rl-it:focus-visible,.rl-cta:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.rl-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:600;text-decoration:none}
.rl-map{position:relative;isolation:isolate;overflow:hidden;aspect-ratio:3/2;border-radius:24px;background:var(--card)}
.rl-map>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.rl-map::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,color-mix(in srgb,var(--ink) 40%,transparent),transparent 65%);pointer-events:none}
.rl-map svg{position:absolute;inset:0;z-index:1;width:100%;height:100%;overflow:visible}
.rl-path{fill:none;stroke:var(--bg);stroke-width:2.6;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;filter:drop-shadow(0 1px 2px color-mix(in srgb,var(--ink) 45%,transparent));transition:stroke-dashoffset 1.3s ${E} var(--d,0s),opacity .4s ${E},stroke-width .4s ${E}}
.rl.is-live:not(.is-in) .rl-path{stroke-dashoffset:1}
.rl.has-sel .rl-path:not(.is-on){opacity:.35}
.rl-path.is-on{stroke-width:3.6}
.rl-pin{position:absolute;z-index:2;width:0;height:0;transition:opacity .5s ${E} var(--d,0s)}
.rl-pin::before{content:"";position:absolute;left:-6px;top:-6px;width:12px;height:12px;border-radius:50%;background:var(--bg);box-shadow:0 0 0 6px color-mix(in srgb,var(--bg) 30%,transparent)}
.rl.is-live:not(.is-in) .rl-pin{opacity:0}
.rl-tag{position:absolute;left:0;bottom:16px;display:grid;justify-items:center;padding:6px 12px;border-radius:12px;background:var(--card);color:var(--ink);white-space:nowrap;box-shadow:${SHADOW};transform:translateX(-50%);transition:background-color .35s ${E},color .35s ${E}}
.rl-pin.is-o .rl-tag{bottom:auto;top:16px}
.rl-tag b{font-size:14px;font-weight:700}
.rl-tag span{font-size:12px;color:var(--muted)}
.rl-pin.is-on .rl-tag{background:var(--ink);color:var(--bg)}
.rl-pin.is-on .rl-tag span{color:inherit;opacity:.75}
.rl-dot{position:absolute;left:0;top:0;z-index:3;width:16px;height:16px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--bg) 70%,transparent);opacity:0;pointer-events:none;transition:opacity .3s ${E}}
.rl.has-sel .rl-dot{opacity:1}
@media(prefers-reduced-motion:reduce){.rl-path,.rl-pin{transition:none}}
@media(max-width:860px){.rl{grid-template-columns:minmax(0,1fr)}.rl-map{order:-1}}
@media(max-width:520px){.rl-tag span{display:none}.rl-tag{padding:4px 10px}}`,
  html:`<div class="stage"><section class="rl" data-rl>
  <div class="rl-txt">
    <p class="rl-k">מסעות כחול, סוכנות נסיעות</p>
    <h2>שלושה יעדים, עד שעתיים טיסה</h2>
    <p>בחרו יעד ותראו כמה זמן לוקחת הטיסה ומה כולל המחיר. את כל השאר, מהמלון ועד ההסעה משדה התעופה, אנחנו מסדרים.</p>
    <ul class="rl-list">
${RT.map((r, i) => `      <li><button class="rl-it" type="button" aria-pressed="${i === 0}"><b>${r.name}</b><span class="rl-time">${r.sub}</span><span class="rl-price">${r.price}</span></button></li>`).join("\n")}
    </ul>
    <a class="rl-cta" href="#">לתכנן חופשה</a>
  </div>
  <div class="rl-map">
    ${IMG("real/s08/hero.webp", 2560, 1707, "שמש שוקעת מעל הים")}
    <svg viewBox="0 0 600 400" aria-hidden="true">
${RT.map((r, i) => { const c = ARC(ORIGIN, r.p); return `      <path class="rl-path" style="--d:${(i * .2).toFixed(1)}s" pathLength="1" data-q="${ORIGIN.join(" ")} ${c.join(" ")} ${r.p.join(" ")}" d="M${ORIGIN.join(" ")} Q${c.join(" ")} ${r.p.join(" ")}"/>`; }).join("\n")}
    </svg>
    <span class="rl-pin is-o" style="left:${(ORIGIN[0] / 6).toFixed(2)}%;top:${(ORIGIN[1] / 4).toFixed(2)}%" aria-hidden="true"><span class="rl-tag"><b>תל אביב</b></span></span>
${RT.map((r, i) => `    <span class="rl-pin" style="left:${(r.p[0] / 6).toFixed(2)}%;top:${(r.p[1] / 4).toFixed(2)}%;--d:${(1 + i * .2).toFixed(1)}s" aria-hidden="true"><span class="rl-tag"><b>${r.name}</b><span>${r.sub}</span></span></span>`).join("\n")}
    <span class="rl-dot" aria-hidden="true"></span>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-rl]");
  if(!root)return;
  const map=root.querySelector(".rl-map"),dot=root.querySelector(".rl-dot");
  const paths=[...root.querySelectorAll(".rl-path")],pins=[...root.querySelectorAll(".rl-pin:not(.is-o)")],its=[...root.querySelectorAll(".rl-it")];
  const still=matchMedia("(prefers-reduced-motion: reduce)"),fine=matchMedia("(hover: hover) and (pointer: fine)");
  const Q=paths.map(p=>p.dataset.q.split(" ").map(Number));
  let cur=-1,raf=0,last=null;
  root.classList.add("is-live");          // בלי JS הקשתות והתוויות כבר מצוירות
  its.forEach(b=>b.setAttribute("aria-pressed","false"));
  // נקודה על העקומה הריבועית, ביחידות המפה (600x400), מומרת לפיקסלים של הכרטיס
  const at=(q,t)=>{const u=1-t;return[u*u*q[0]+2*u*t*q[2]+t*t*q[4],u*u*q[1]+2*u*t*q[3]+t*t*q[5]];};
  const place=xy=>{last=xy;dot.style.transform="translate("+(xy[0]/600*map.clientWidth)+"px,"+(xy[1]/400*map.clientHeight)+"px) translate(-50%,-50%)";};
  const fly=i=>{
    cancelAnimationFrame(raf);
    if(still.matches)return place(at(Q[i],1));
    const t0=performance.now(),D=1500;
    const tick=now=>{
      const t=Math.min(1,(now-t0)/D),k=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;   // מאיץ בהמראה ומאט בנחיתה
      place(at(Q[i],k));
      if(t<1)raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
  };
  const go=i=>{
    if(i===cur)return;cur=i;
    root.classList.add("has-sel");
    [paths,pins].forEach(g=>g.forEach((el,k)=>el.classList.toggle("is-on",k===i)));
    its.forEach((b,k)=>b.setAttribute("aria-pressed",String(k===i)));
    fly(i);
  };
  its.forEach((b,i)=>{
    b.addEventListener("click",()=>go(i));
    b.addEventListener("pointerenter",()=>{if(fine.matches)go(i);});
  });
  addEventListener("resize",()=>{if(last)place(last);});
  // כשהכרטיס נכנס למסך הקשתות נמתחות, ובסוף היעד הראשון נבחר לבד
  const start=()=>{root.classList.add("is-in");setTimeout(()=>{if(cur<0)go(0);},still.matches?0:1500);};
  if(!("IntersectionObserver" in window))return start();
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();start();}},{threshold:.4});
  io.observe(map);
})();`
},
{
  id:"css47", cat:"css", name:"אור שמקיף את כרטיס המחיר המומלץ", tech:"CSS @property · conic-gradient · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"שלושה כרטיסי מנוי, והמומלץ כהה. כשהסקשן נכנס למסך, אור צבעוני רך מקיף את הקצה של הכרטיס המומלץ פעמיים, כמו כוכב שביט, מאט ונח בפינה העליונה. ריחוף מעל הכרטיס מגביר את האור ומרים אותו מעט.",
  when:"עמוד מחירים או מנויים, כדי להפנות את העין לחבילה אחת בלי תווית צועקת. כרטיס אחד בעמוד, לא יותר. מתאים לחלל עבודה, חדר כושר, תוכנה, קורס. לא בסקשן שכבר יש בו תנועה אחרת, ולא בעור שקט מאוד שבו כל אור צבעוני הוא רעש; שם מספיק הכרטיס הכהה.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של כרטיס תמחור שאור רץ על הקצה שלו. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** css12 היא מסגרת גרדיאנט מלאה שמסתובבת בלי סוף. כאן אין מסגרת: יש ראש אור אחד עם זנב, הוא מקיף את הכרטיס פעמיים כשהסקשן נכנס למסך, מאט ונח. **זה לא קו:** האור הוא שתי שכבות `conic-gradient` מטושטשות (3 ו-22 פיקסלים) שיושבות מאחורי הכרטיס, ורואים רק את מה שבורח מהקצה, כך שהוא נקרא כהילה ולא כמסגרת (התורה אוסרת קווי מסגרת). **המבנה:** האור על ה-`li` עם `isolation:isolate`, והרקע על `.pg-in` שבתוכו. בלי העטיפה, הרמה בריחוף (`transform`) הייתה יוצרת הקשר ערימה חדש, והאור היה צף מעל הרקע ומכסה את הכרטיס. **הסיבוב:** `@property --pg` (זווית) מונפש מ-20 ל-740 מעלות, שני סיבובים, ב-3.6 שניות בעקומה החתומה, שמאטה לקראת הסוף. **בלי JS** האור נח בפינה העליונה; ה-JS רק מוסיף `is-in` כשהסקשן נכנס למסך. **הפחתת תנועה:** בלי סיבוב, האור נח. **בטלפון** הכרטיסים בטור, והאור זהה.",
  libs:[],
  css:`@property --pg{syntax:"<angle>";initial-value:20deg;inherits:false}
.pg{isolation:isolate;display:grid;gap:clamp(28px,4vw,48px);${SEC}}
.pg-hd{display:grid;gap:12px;max-width:40rem}
.pg-hd h2{${H2}}
.pg-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pg-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2vw,24px)}
.pg-card{position:relative;isolation:isolate;border-radius:24px;transition:transform .4s ${E}}
.pg-in{height:100%;display:flex;flex-direction:column;gap:16px;padding:clamp(24px,2.6vw,32px);border-radius:inherit;background:var(--card);color:var(--ink);box-shadow:${SHADOW}}
.pg-hot .pg-in{background:var(--ink);color:var(--bg)}
.pg-hot::before,.pg-hot::after{content:"";position:absolute;inset:-3px;z-index:-1;border-radius:27px;background:conic-gradient(from var(--pg),transparent 0 70%,color-mix(in srgb,var(--accent) 30%,transparent) 84%,var(--accent) 96%,transparent);pointer-events:none;transition:opacity .8s ${E}}
.pg-hot::before{filter:blur(3px)}
.pg-hot::after{inset:-14px;border-radius:38px;filter:blur(22px);opacity:.55}
.pg.is-live .pg-hot::before,.pg.is-live .pg-hot::after{opacity:0}
.pg.is-in .pg-hot::before{opacity:1;animation:pg-run 3.6s ${E} both}
.pg.is-in .pg-hot::after{opacity:.55;animation:pg-run 3.6s ${E} both}
@keyframes pg-run{from{--pg:20deg}to{--pg:740deg}}
@media(hover:hover) and (pointer:fine){.pg-card:hover{transform:translateY(-4px)}.pg.is-in .pg-hot:hover::after{opacity:.85}}
.pg-tag{align-self:flex-start;padding:6px 12px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:700}
.pg-in h3{margin:0;font-size:clamp(22px,2vw,28px);font-weight:700;line-height:1.2}
.pg-pr{margin:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}
.pg-num{font-size:clamp(40px,4.4vw,56px);font-weight:800;line-height:1;letter-spacing:-.02em;unicode-bidi:isolate;font-variant-numeric:tabular-nums}
.pg-pr small{font-size:14px;opacity:.7}
.pg-lead{margin:0;font-size:var(--fs-body);line-height:1.6;opacity:.85}
.pg-in ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.pg-in li{display:flex;align-items:flex-start;gap:10px;font-size:16px;line-height:1.5}
.pg-in li svg{width:18px;height:18px;flex:none;margin-top:4px;fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.pg-cta{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:color-mix(in srgb,currentColor 10%,transparent);color:inherit;font-weight:600;text-decoration:none}
.pg-hot .pg-cta{background:var(--accent);color:var(--accent-ink)}
.pg-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.pg.is-in .pg-hot::before,.pg.is-in .pg-hot::after{animation:none}.pg-card{transition:none}}
@media(max-width:860px){.pg-grid{grid-template-columns:minmax(0,1fr)}}`,
  html:`<div class="stage"><section class="pg" data-pg>
  <div class="pg-hd">
    <h2>מנוי שמתאים לשבוע שלכם</h2>
    <p>בלי התחייבות לשנה. אפשר לעבור בין המסלולים בכל חודש, ולבוא ליום ניסיון לפני שמחליטים.</p>
  </div>
  <ul class="pg-grid">
${PG.map(p => `    <li class="pg-card${p.hot ? " pg-hot" : ""}"><div class="pg-in">
      ${p.hot ? '<span class="pg-tag">הכי משתלם</span>\n      ' : ""}<h3>${p.name}</h3>
      <p class="pg-pr"><span class="pg-num" dir="ltr">${p.price}</span><small>${p.per}</small></p>
      <p class="pg-lead">${p.lead}</p>
      <ul>
${p.inc.map(i => `        <li>${CHECK}<span>${i}</span></li>`).join("\n")}
      </ul>
      <a class="pg-cta" href="#">לתאם סיור</a>
    </div></li>`).join("\n")}
  </ul>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-pg]");
  if(!root)return;
  root.classList.add("is-live");          // בלי JS האור נח בפינה העליונה
  const go=()=>root.classList.add("is-in");
  if(!("IntersectionObserver" in window))return go();
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();go();}},{threshold:.4});
  io.observe(root);
})();`
}
];
