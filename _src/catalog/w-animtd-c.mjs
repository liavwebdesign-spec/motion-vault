// מהלכים בהשראת 31 הסרטונים הציבוריים בדף הבית של animtd.store (26.10.2026). ליאב: "אני רוצה שתעבור על המאגר המלא שלו
// ותטמיע כל דבר חדש שיכול להועיל ושונה ממה שיש לנו כיום. לא רק כמה בודדים".
// נבנו מאפס מהצפייה בלבד: בלי הפרומפטים, הקוד, הסרטונים, הטקסטים או תמונות הסטוק של המקור.
// קבוצה ג: שני פסים מצטלבים, זרם תמונות לעומק, טאבלט שמתיישר בגלילה, ותורים מפוזרים שמסתדרים ביומן.

const E = "cubic-bezier(.2,.6,.2,1)";
const SHADOW = "0 1px 2px color-mix(in srgb,var(--ink) 6%,transparent),0 6px 20px color-mix(in srgb,var(--ink) 5%,transparent)";
const IMG = (f, w, h, alt, cls = "") =>
  `<img${cls ? ` class="${cls}"` : ""} src="../assets/media/${f}" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">`;
const PAUSE = `<svg class="i-pa" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg><svg class="i-pl" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>`;
const H2 = "margin:0;font-size:clamp(30px,3.4vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.01em;text-wrap:balance";
const SEC = "padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)";
const SR = (sel) => `${sel}{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`;
// כפתור עצירה לכל מה שזז לבד יותר מחמש שניות (WCAG 2.2.2): מוסתר עד שה-JS רץ, ובהפחתת תנועה לא מופיע
const PP_CSS = (p, pos) => `.${p}-pp{position:absolute;${pos};z-index:3;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:8px 16px;border:0;border-radius:999px;background:var(--card);color:var(--ink);font:inherit;font-size:14px;font-weight:600;cursor:pointer;box-shadow:${SHADOW}}
.${p}-pp[hidden]{display:none}
.${p}-pp svg{width:16px;height:16px;fill:currentColor}
.${p}-pp .i-pl,.${p}.is-paused .${p}-pp .i-pa{display:none}
.${p}.is-paused .${p}-pp .i-pl{display:block}
.${p}-pp:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`;
const PP_JS = (label, again) => `  const pp=root.querySelector("button[data-pp]");
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches)pp.hidden=false;
  pp.addEventListener("click",()=>{
    const on=!root.classList.contains("is-paused");
    root.classList.toggle("is-paused",on);
    pp.querySelector("span").textContent=on?"${again}":"${label}";
  });
  // מחוץ למסך התנועה עומדת
  if("IntersectionObserver" in window)new IntersectionObserver(es=>es.forEach(e=>root.classList.toggle("is-off",!e.isIntersecting))).observe(root);`;

// css48: שני פסים של בית ספר למוזיקה
const WM_A = ["גיטרה", "פסנתר", "תופים", "שירה", "כינור", "בס", "סקסופון"];
const WM_B = ["שיעור ראשון עלינו", "מגיל שש ועד שמונים", "הופעה בסוף כל שנה", "הרכבים ולהקות"];

// css49: עשרה כרטיסים שזורמים לעומק. x ו-y ביחידות של הכרטיס עצמו, כך שהמסדרון גדל עם המסך
const IS_IMG = [
  ["real/s12/van-door.webp", 1000, 1200], ["real/s08/sea.webp", 2560, 1706], ["real/s12/thermos.webp", 900, 1200],
  ["real/s12/dusk-camp.webp", 1000, 1000], ["real/s08/glass.webp", 2560, 1440], ["real/s12/hero-window.webp", 1100, 1100],
  ["real/s08/hero.webp", 2560, 1707],
];
const IS_POS = [[-1.7, -.5], [1.5, .3], [-1.2, .65], [1.9, -.45], [-2.1, .15], [1.2, -.7], [-1.5, .5], [2, -.15], [-1.9, -.3], [1.6, .6]];

// g284: מה שיש על המסך של הטאבלט
const ST_BARS = [["18", 34], ["19", 62], ["20", 100], ["21", 88], ["22", 56], ["23", 22]];
const ST_ROWS = [["19:30", "משפחת לוי, 6 סועדים", "הגיעו"], ["20:00", "דנה ורועי, 2 סועדים", "מקדמה שולמה"], ["20:30", "יום הולדת לנוי, 10 סועדים", "אושר"], ["21:00", "אבי כהן, 4 סועדים", "חדש"]];

// g285: תשעה תורים בשבוע של קליניקה. [יום, שעה, שם, סוג, מקור]
const MS_DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
const MS_HRS = ["9:00", "10:00", "11:00", "12:00"];
const MS_SRC = { "מהאתר": "var(--accent)", "וואטסאפ": "color-mix(in srgb,var(--accent) 50%,var(--ink))", "טלפון": "var(--muted)" };
const MS_AP = [
  [0, 0, "נועה כהן", "טיפול ראשון", "מהאתר"], [0, 2, "דני לוי", "מעקב", "טלפון"],
  [1, 1, "מאיה פרץ", "ייעוץ", "וואטסאפ"], [1, 3, "יוסי אברהם", "טיפול", "מהאתר"],
  [2, 0, "רותם בן דוד", "מעקב", "וואטסאפ"], [2, 2, "אורי שגב", "טיפול ראשון", "טלפון"],
  [3, 1, "הילה מזרחי", "טיפול", "מהאתר"],
  [4, 0, "עמית גולן", "ייעוץ", "וואטסאפ"], [4, 3, "שירה כץ", "מעקב", "מהאתר"],
];

export default [
{
  id:"css48", cat:"css", name:"שני פסי מילים שמצטלבים באיקס", tech:"CSS keyframes · שכפול מדוד · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"שני פסים רחבים ומוטים שחוצים את הסקשן באיקס, אחד בצבע המותג ואחד כהה. בכל פס מילים גדולות שזורמות בלולאה, והפסים זזים בכיוונים מנוגדים. הפס הכהה עובר מעל הצבעוני באמצע. ריחוף עוצר, ויש כפתור עצירה.",
  when:"מעבר בין סקשנים באתר עם אנרגיה: בית ספר למוזיקה, סטודיו לריקוד, חדר כושר, פסטיבל, מותג לצעירים. מילים קצרות שאומרות מה יש אצלכם, לא משפטים. פעם אחת בעמוד. לא באתר שקט ורציני (משפט, רפואה, פיננסים), ולא מתחת להירו שכבר זז; שם b01 ישר ועדין.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של שני פסי טקסט שמצטלבים וזזים בכיוונים מנוגדים. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** b01 הוא פס אחד, ישר ושקט, לנקודות אמון. כאן שני פסים מוטים בזוויות מנוגדות (מינוס 6 ופלוס 5 מעלות) שחוצים זה את זה, בצבע מלא, עם מילים גדולות, והם הסקשן עצמו ולא שוליים שלו. **הלולאה:** אותו מנגנון כמו ב-b01. ה-JS משכפל את קבוצת המילים עד שהיא מכסה את רוחב הפס ועוד אחת, ומזיז ברוחב קבוצה אחת בפיקסלים, כך שהתפר לא נראה. המהירות נקבעת בפיקסלים לשנייה, ולכן שני הפסים זזים באותו קצב גם כשאחד ארוך יותר. הפס השני רץ ב-`animation-direction:reverse`. **כיוון:** ב-RTL העותקים נערמים שמאלה וההזזה ימינה; ב-LTR הסימן מתהפך (`--wm-sign`). **הפסים** רחבים ב-30% מהסקשן כדי שהקצוות המוטים לא ייראו, והסקשן חותך אותם רק לרוחב (`overflow-x:clip` עם `overflow-y:visible`): חיתוך בשני הצירים היה קוטע את הצל של הפסים בקצה העליון והתחתון כשהסקשן נמוך. **נגישות:** הפסים `aria-hidden` (עותקים חוזרים), ולצדם רשימה מוסתרת של כל המילים פעם אחת. עוצר בריחוף, בכפתור, ומחוץ למסך. **הפחתת תנועה:** הפסים עומדים והכפתור לא מופיע. **בטלפון** אותו דבר, באותיות קטנות יותר.",
  libs:[],
  css:`.wm{position:relative;display:grid;place-items:center;min-height:clamp(280px,32vw,400px);overflow-x:clip;overflow-y:visible;border-radius:clamp(20px,2.4vw,32px);background:var(--bg)}
.wm-x{width:100%;display:grid;place-items:center}
.wm-band{grid-area:1/1;width:130%;padding-block:clamp(14px,1.6vw,24px);overflow:hidden;box-shadow:0 12px 40px color-mix(in srgb,var(--ink) 14%,transparent)}
.wm-a{background:var(--accent);color:var(--accent-ink);transform:rotate(-6deg)}
.wm-b{background:var(--ink);color:var(--bg);transform:rotate(5deg)}
.wm-track{display:flex;width:max-content;animation:wm-run var(--wm-dur,30s) linear infinite}
.wm-track:dir(ltr){--wm-sign:-1}
.wm-b .wm-track{animation-direction:reverse}
.wm-set{display:flex;align-items:center;gap:clamp(24px,3vw,48px);padding-inline-end:clamp(24px,3vw,48px)}
.wm-set span{font-size:clamp(28px,4.4vw,60px);font-weight:800;line-height:1.1;letter-spacing:-.01em;white-space:nowrap}
.wm-set i{width:clamp(10px,1vw,14px);aspect-ratio:1;flex:none;border-radius:50%;background:currentColor;opacity:.55}
@keyframes wm-run{to{transform:translateX(calc(var(--wm-shift,50%) * var(--wm-sign,1)))}}
.wm.is-paused .wm-track,.wm.is-off .wm-track{animation-play-state:paused}
@media(hover:hover) and (pointer:fine){.wm:hover .wm-track{animation-play-state:paused}}
${SR(".wm-sr")}
${PP_CSS("wm", "inset-block-end:16px;inset-inline-end:16px")}
@media(prefers-reduced-motion:reduce){.wm-track{animation:none}}`,
  html:`<div class="stage"><section class="wm" data-wm>
  <div class="wm-x" aria-hidden="true">
    <div class="wm-band wm-a"><div class="wm-track"><div class="wm-set">${WM_A.map(w => `<span>${w}</span><i></i>`).join("")}</div></div></div>
    <div class="wm-band wm-b"><div class="wm-track"><div class="wm-set">${WM_B.map(w => `<span>${w}</span><i></i>`).join("")}</div></div></div>
  </div>
  <ul class="wm-sr" aria-label="מה לומדים אצלנו">${[...WM_A, ...WM_B].map(w => `<li>${w}</li>`).join("")}</ul>
  <button class="wm-pp" type="button" data-pp hidden>${PAUSE}<span>עצירת התנועה</span></button>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-wm]");
  if(!root)return;
  const bands=[...root.querySelectorAll(".wm-band")];
  // כמה עותקים צריך: אחרי הזזה של קבוצה אחת, מה שנשאר חייב עדיין לכסות את כל הפס
  const build=b=>{
    const track=b.querySelector(".wm-track"),proto=track.firstElementChild;
    [...track.children].slice(1).forEach(c=>c.remove());
    const w=proto.offsetWidth;if(!w)return;
    const need=Math.ceil(b.offsetWidth/w)+1;
    for(let i=1;i<need;i++)track.appendChild(proto.cloneNode(true));
    track.style.setProperty("--wm-shift",w+"px");
    track.style.setProperty("--wm-dur",(w/70).toFixed(2)+"s");   // אותו קצב בפיקסלים בשני הפסים
  };
  const all=()=>bands.forEach(build);
  all();
  // מדידה לפני שהפונט נטען יוצאת קצרה, והלולאה קופצת בכל סיבוב
  if(document.fonts)document.fonts.ready.then(all);
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(all,200);});
${PP_JS("עצירת התנועה", "המשך התנועה")}
})();`
},
{
  id:"css49", cat:"css", name:"זרם תמונות שטס מעומק המסך", tech:"CSS 3D · keyframes · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"רקע כהה, ובמרכזו כרטיס עם כותרת וכפתור. מסביבו תמונות קטנות מופיעות בנקודה רחוקה במרכז המסך, גדלות ומתקרבות לאט, חולפות בצדדים ונעלמות, כאילו נוסעים במסדרון של תמונות. הזרם לא נגמר, ויש כפתור עצירה.",
  when:"עסק של חוויות שיש לו הרבה צילומים טובים: טיולים, סיורים, אירועים, חופשות, סדנאות. הזרם אומר \"יש עוד ועוד\" בלי גלריה. מתאים כסקשן הזמנה לפני הפוטר, או כהירו של עמוד פנימי. לא כשיש פחות משש תמונות, ולא בעור בהיר ושקט, כי הוא צריך רקע כהה כדי שהעומק ייקרא.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של תמונות שזורמות לעבר הצופה מנקודת מגוז. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** g91 הוא טקסט שנוסע לעומק בגלילה, ו-g261 צורות מקוננות. כאן הזרם רץ לבד, בלי גלילה, והוא רקע לתוכן ולא התוכן עצמו. **אפס JS בתנועה:** כל תמונה היא אנימציית CSS אחת של 15 שניות, מ-`translateZ(-2400px)` עד `translateZ(400px)`, עם עמעום בהתחלה ובסוף, ו-`animation-delay` שלילי לפי המיקום שלה (מינוס 1.5 שניות לכל אחת), כך שהזרם מלא מהרגע הראשון. **המסדרון:** ההזזה לצדדים כתובה ביחידות של הכרטיס עצמו (אחוזים בתוך `translate3d`), והפרספקטיבה מכווצת אותה ברחוק, ולכן כל התמונות יוצאות מאותה נקודה ומתפזרות לצדדים בקרוב. העטיפה היא `preserve-3d`, כך שהדפדפן ממיין את התמונות לפי העומק ולא לפי הסדר במארקאפ. התנועה לינארית, וההאצה שהעין רואה באה מהפרספקטיבה. **הכרטיס** מעל הזרם, על זכוכית כהה, כך שהטקסט קריא בכל רגע. **נגישות:** התמונות `aria-hidden` וריקות מתיאור, כי הן אווירה; כפתור עצירה (WCAG 2.2.2), ועצירה גם מחוץ למסך. **הפחתת תנועה:** האנימציה עומדת בנקודה שבה כל תמונה נמצאת, כך שנשארת תמונה סטטית של מסדרון. **בטלפון** הכרטיסים קטנים יותר, והקיצוניים נחתכים בקצה.",
  libs:[],
  css:`.is{position:relative;display:grid;place-items:center;min-height:clamp(560px,72vh,760px);overflow:clip;border-radius:clamp(20px,2.4vw,32px);background:var(--ink);color:var(--bg)}
.is-w{position:absolute;inset:0;perspective:1000px;perspective-origin:50% 44%;transform-style:preserve-3d;pointer-events:none}
.is-f{--w:clamp(130px,15vw,220px);position:absolute;left:50%;top:44%;width:var(--w);aspect-ratio:4/5;margin:0;overflow:hidden;border-radius:16px;background:color-mix(in srgb,var(--bg) 10%,var(--ink));opacity:0;animation:is-fly 15s linear infinite;animation-delay:calc(var(--i) * -1.5s)}
.is-f img{display:block;width:100%;height:100%;object-fit:cover}
@keyframes is-fly{
  0%{opacity:0;transform:translate(-50%,-50%) translate3d(calc(var(--x) * 100%),calc(var(--y) * 100%),-2400px)}
  14%{opacity:1}
  86%{opacity:1}
  100%{opacity:0;transform:translate(-50%,-50%) translate3d(calc(var(--x) * 100%),calc(var(--y) * 100%),400px)}
}
.is.is-paused .is-f,.is.is-off .is-f{animation-play-state:paused}
.is-c{position:relative;z-index:2;display:grid;justify-items:center;gap:16px;max-width:30rem;margin:clamp(20px,4vw,40px);padding:clamp(24px,3vw,40px);border-radius:24px;background:color-mix(in srgb,var(--ink) 70%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);text-align:center}
.is-k{margin:0;font-size:15px;font-weight:700;opacity:.8}
.is-c h2{${H2}}
.is-c>p:not(.is-k){margin:0;font-size:var(--fs-body);line-height:1.6;opacity:.85}
.is-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;margin-top:8px;padding:12px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.is-cta:focus-visible{outline:2px solid var(--bg);outline-offset:3px}
${PP_CSS("is", "inset-block-end:16px;inset-inline-end:16px")}
@media(prefers-reduced-motion:reduce){.is-f{animation-play-state:paused}}
@media(max-width:760px){.is-f{--w:112px}.is-c{margin:16px}}`,
  html:`<div class="stage"><section class="is" data-is>
  <div class="is-w" aria-hidden="true">
${IS_POS.map(([x, y], i) => { const [f, w, h] = IS_IMG[i % IS_IMG.length]; return `    <figure class="is-f" style="--i:${i};--x:${x};--y:${y}">${IMG(f, w, h, "")}</figure>`; }).join("\n")}
  </div>
  <div class="is-c">
    <p class="is-k">ואן ודרך, טיולים מאורגנים</p>
    <h2>יום אחד בצפון, בלי לנהוג</h2>
    <p>יוצאים בשבע בבוקר מתל אביב וחוזרים בתשע בערב. שמונה אנשים בוואן, מדריך שנוהג, וחמש תחנות שלא תמצאו בוויז.</p>
    <a class="is-cta" href="#">לתאריכים הקרובים</a>
  </div>
  <button class="is-pp" type="button" data-pp hidden>${PAUSE}<span>עצירת התמונות</span></button>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-is]");
  if(!root)return;
${PP_JS("עצירת התמונות", "המשך התמונות")}
})();`
},
{
  id:"g284", cat:"gsap", name:"טאבלט שמתיישר בגלילה ומתמלא בנתונים", tech:"GSAP · ScrollTrigger scrub · 3D", status:"מאושר-עין", runway:false,
  desc:"טאבלט עם מסך של מערכת הזמנות למסעדה, מוטה לאחור כאילו מונח על שולחן. ככל שגוללים אליו הוא מתרומם, מתיישר מול העין וגדל מעט. בדרך העמודות בגרף צומחות מלמטה, ושלוש התראות קופצות מסביב לטאבלט: הזמנה חדשה, מקדמה שהתקבלה ותזכורת שנשלחה.",
  when:"מוצר דיגיטלי שרוצים להראות כמו שהוא: מערכת הזמנות, CRM, אפליקציה לעסק, דשבורד. ההתראות מספרות מה המערכת עושה לבד, בלי פסקה. פעם אחת בעמוד. לא כשאין מסך אמיתי להראות, ולא באותו עמוד עם g115 (מחשב שנפתח), כי שניהם אותה הבטחה.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של מסך מוטה לאחור שמתיישר בגלילה. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** ב-g115 מכסה של מחשב סגור נפתח על הציר שלו, עם הצמדה. כאן הטאבלט כולו מונח בזווית של 32 מעלות ומתיישר כגוף אחד (`rotateX` מ-32 ל-0, הגדלה מ-0.88 ל-1 ועלייה של 40 פיקסלים), בלי הצמדה, תוך כדי גלילה רגילה; והמסך עצמו מתמלא: העמודות בגרף צומחות (`scaleY` מהבסיס) והתראות קופצות סביבו. **המארקאפ הוא מצב הסיום:** טאבלט ישר, גרף מלא והתראות גלויות. בלי GSAP ובהפחתת תנועה זה מה שרואים. **הגלילה:** טיימליין אחד עם `scrub` של 0.6 שנייה, מהרגע שהטאבלט נכנס ב-92% מהמסך ועד שהוא ב-22%; היישור לוקח את כל הדרך, העמודות מהאמצע, וההתראות ברבע האחרון. הפרספקטיבה (1400) על העטיפה, וציר הסיבוב בתחתית הטאבלט, כמו מסך שמרימים מהשולחן. **נגישות:** הטאבלט `role=\"img\"` עם תיאור מלא של מה שעל המסך (המספרים וההתראות), כי זה איור של מוצר ולא ממשק אמיתי. **בטלפון** המסך בטור אחד, הרשימה מתקצרת, וההתראות יושבות בתוך שולי הטאבלט במקום לבלוט ממנו.",
  libs:["gsap","ScrollTrigger"],
  css:`.st{display:grid;justify-items:center;gap:clamp(32px,5vw,64px);${SEC};overflow:clip;text-align:center}
.st-hd{display:grid;justify-items:center;gap:12px;max-width:42rem}
.st-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.st-hd h2{${H2}}
.st-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.st-stage{width:min(100%,960px);perspective:1400px}
.st-dev{position:relative;padding:clamp(10px,1.2vw,16px);border-radius:clamp(20px,2.4vw,32px);background:var(--ink);box-shadow:0 24px 64px color-mix(in srgb,var(--ink) 22%,transparent);transform-origin:50% 100%;text-align:start}
.st-scr{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:16px;padding:clamp(16px,2vw,24px);border-radius:clamp(12px,1.4vw,20px);background:var(--bg);color:var(--ink)}
.st-top{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:12px}
.st-top b{font-size:18px;font-weight:700}
.st-top span{font-size:14px;color:var(--muted)}
.st-kpi{grid-column:1/-1;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.st-kpi li{display:grid;gap:4px;padding:16px;border-radius:14px;background:var(--card)}
.st-kpi small{font-size:13px;color:var(--muted)}
.st-kpi b{font-size:clamp(20px,2.4vw,32px);font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums}
.st-chart{display:grid;gap:12px;align-content:start;padding:16px;border-radius:14px;background:var(--card)}
.st-chart>span{font-size:14px;font-weight:600}
.st-bars{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));align-items:end;gap:8px;height:140px}
.st-bars i{display:block;height:var(--h);border-radius:6px 6px 2px 2px;background:color-mix(in srgb,var(--accent) 35%,var(--card));transform-origin:50% 100%}
.st-bars i.is-peak{background:var(--accent)}
.st-hrs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;font-size:12px;color:var(--muted);text-align:center;font-variant-numeric:tabular-nums}
.st-list{list-style:none;margin:0;padding:0;display:grid;gap:8px;align-content:start}
.st-list li{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;background:var(--card);font-size:14px}
.st-list time{font-weight:700;font-variant-numeric:tabular-nums}
.st-list li>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.st-st{padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent);font-size:12px;font-weight:600;white-space:nowrap}
.st-chip{position:absolute;z-index:2;display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:999px;background:var(--card);color:var(--ink);font-size:14px;font-weight:600;white-space:nowrap;box-shadow:0 8px 28px color-mix(in srgb,var(--ink) 18%,transparent)}
.st-chip i{width:10px;height:10px;flex:none;border-radius:50%;background:var(--accent)}
.st-c1{inset-block-start:16%;inset-inline-end:-28px}
.st-c2{inset-block-start:54%;inset-inline-start:-28px}
.st-c3{inset-block-end:-20px;inset-inline-end:14%}
@media(max-width:760px){
  .st-scr{grid-template-columns:minmax(0,1fr);gap:12px}
  .st-kpi{gap:8px}
  .st-kpi li{padding:10px}
  .st-kpi small{font-size:11px}
  .st-bars{height:88px}
  .st-list li:nth-child(n+3){display:none}
  .st-chip{gap:8px;padding:8px 12px;font-size:12px}
  .st-c1{inset-block-start:auto;inset-block-end:42%;inset-inline-end:8px}
  .st-c2{inset-block-start:auto;inset-block-end:24%;inset-inline-start:8px}
  .st-c3{inset-block-end:8px;inset-inline-end:8px}
}`,
  html:`<div class="stage"><section class="st" data-st>
  <div class="st-hd">
    <p class="st-k">מערכת הזמנות למסעדות</p>
    <h2>כל הערב של המסעדה, במסך אחד</h2>
    <p>הזמנות מהאתר ומהטלפון, מקדמות ותזכורות לסועדים, מסודרות לפי שעה. המארחת יודעת מה מחכה לה עוד לפני שהדלת נפתחת.</p>
  </div>
  <div class="st-stage">
    <div class="st-dev" role="img" aria-label="מסך ההזמנות של מסעדת הגפן ביום חמישי: 42 הזמנות הערב, תפוסה של 86%, הכנסה צפויה של 9,860 ₪, ושיא הסועדים בשמונה בערב. שלוש התראות: הזמנה חדשה לארבעה בתשע, מקדמה של 200 ₪ שהתקבלה, ותזכורת שנשלחה ל-12 סועדים.">
      <div class="st-scr">
        <div class="st-top"><b>הגפן, מסעדה ובר</b><span>חמישי, 19:40</span></div>
        <ul class="st-kpi"><li><small>הזמנות הערב</small><b>42</b></li><li><small>תפוסה</small><b>86%</b></li><li><small>הכנסה צפויה</small><b>9,860 ₪</b></li></ul>
        <div class="st-chart"><span>סועדים לפי שעה</span>
          <div class="st-bars">${ST_BARS.map(([, h]) => `<i${h === 100 ? ' class="is-peak"' : ""} style="--h:${h}%"></i>`).join("")}</div>
          <div class="st-hrs">${ST_BARS.map(([t]) => `<span>${t}</span>`).join("")}</div>
        </div>
        <ul class="st-list">
${ST_ROWS.map(([t, n, s]) => `          <li><time>${t}</time><span>${n}</span><b class="st-st">${s}</b></li>`).join("\n")}
        </ul>
      </div>
      <span class="st-chip st-c1"><i></i>הזמנה חדשה: 4 סועדים ב-21:00</span>
      <span class="st-chip st-c2"><i></i>מקדמה של 200 ₪ התקבלה</span>
      <span class="st-chip st-c3"><i></i>תזכורת נשלחה ל-12 סועדים</span>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: הטאבלט ישר, הגרף מלא וההתראות גלויות (במארקאפ)
  const root=document.querySelector("[data-st]");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const stage=root.querySelector(".st-stage"),dev=root.querySelector(".st-dev"),
    bars=[...root.querySelectorAll(".st-bars i")],chips=[...root.querySelectorAll(".st-chip")];
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    // מוטה לאחור כאילו מונח על שולחן, הגרף ריק וההתראות עוד לא הגיעו
    gsap.set(dev,{rotateX:32,scale:.88,y:40});
    gsap.set(bars,{scaleY:0});
    gsap.set(chips,{autoAlpha:0,y:16,scale:.92});
    const tl=gsap.timeline({scrollTrigger:{trigger:stage,start:"top 92%",end:"top 22%",scrub:.6,invalidateOnRefresh:true}});
    tl.to(dev,{rotateX:0,scale:1,y:0,ease:"none",duration:1},0)
      .to(bars,{scaleY:1,ease:"power2.out",duration:.3,stagger:.05},.42)
      .to(chips,{autoAlpha:1,y:0,scale:1,ease:"power2.out",duration:.16,stagger:.08},.72);
  });
})();`
},
{
  id:"g285", cat:"gsap", name:"תורים מפוזרים שמסתדרים ביומן בגלילה", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין", runway:false,
  desc:"יומן של שבוע בקליניקה, עם משבצות ריקות. מעליו ערימה של תשעה כרטיסי תור, מוטים וזרוקים אחד על השני, כל אחד עם תווית מאיפה הגיע (מהאתר, וואטסאפ, טלפון). ככל שגוללים, הכרטיסים מתיישרים ונכנסים כל אחד למשבצת שלו ביומן, ובסוף מופיעה שורה: תשעה תורים השבוע, בלי כפילויות.",
  when:"עסק שמוכר סדר: יומן תורים, מערכת הזמנות, מזכירה וירטואלית, ניהול משמרות, CRM. הערימה היא הבלגן שהלקוח מכיר, והיומן הוא מה שהוא מקבל. פעם אחת בעמוד. לא כשהמוצר לא קשור לזמנים, ולא באותו עמוד עם g266, שגם הוא ממלא לוח.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של כרטיסים מפוזרים שמסתדרים לרשת בגלילה. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** ב-g266 אריחים נופלים מלמעלה אחד אחרי השני, פעם אחת (`once`). כאן כל הכרטיסים מתחילים יחד בערימה מבולגנת, והגלילה עצמה (`scrub`, עם הצמדה ב-sticky) מסדרת אותם; גוללים אחורה והבלגן חוזר. זה סיפור של לפני ואחרי, לא של מילוי. **המארקאפ הוא היומן המסודר:** גריד של 5 ימים על 4 שעות, וכל תור יושב בתא שלו (`grid-column`, `grid-row`). בלי GSAP, בהפחתת תנועה או במסך נמוך מ-600 זה מה שרואים. **הערימה:** לכל כרטיס נקודה בתוך היומן (שבר מהרוחב ומהגובה) וזווית. ההפרש בין הנקודה למקום שלו נמדד מ-`offsetLeft` ו-`offsetTop`, שלא מושפעים מה-transform, ולכן החישוב נכון גם כשהוא מתבצע מחדש אחרי שינוי גודל (`invalidateOnRefresh`). **הגלילה:** הסקשן גבוה פי 2.4 מהמסך והתוכן מוצמד ב-sticky; כל כרטיס נוסע למקום עם `power2.inOut` והשהיה קטנה בין כרטיס לכרטיס, ושורת הסיכום מופיעה בסוף. **tween נפרד לכל כרטיס, לא `stagger`:** ב-`fromTo` אחד עם `stagger` רק הכרטיס הראשון מצויר בערימה מראש, והשאר יושבים ביומן ונזרקים רק כשהתור שלהם מגיע, כך שהגלילה מפרקת את היומן במקום לסדר אותו (נתפס בצילומי הגלילה). **נגישות:** התורים הם רשימה, ולכל אחד טקסט מוסתר עם היום והשעה, כך שקורא מסך שומע \"ראשון, 9:00: נועה כהן, טיפול ראשון\". הימים, השעות והמשבצות `aria-hidden`. בלי קווי מסגרת: המשבצות הן משטח בהיר והכרטיסים כרטיסים. **בטלפון** אותו יומן בעמודות צרות, ובכרטיס נשאר רק השם.",
  libs:["gsap","ScrollTrigger"],
  css:`.ms{border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)}
.ms-pin{display:grid;align-content:center;gap:clamp(24px,3vw,40px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);overflow:clip}
.ms.is-live .ms-run{height:240vh}
.ms.is-live .ms-pin{position:sticky;top:0;min-height:100vh;min-height:100svh}
.ms-hd{display:grid;gap:12px;max-width:44rem}
.ms-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.ms-hd h2{${H2}}
.ms-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ms-cal{position:relative;display:grid;grid-template-columns:auto repeat(5,minmax(0,1fr));grid-template-rows:auto repeat(4,minmax(80px,auto));gap:8px}
.ms-day{grid-row:1;padding-block-end:4px;font-size:14px;font-weight:700;text-align:center}
.ms-hr{grid-column:1;padding-block-start:10px;padding-inline-end:8px;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.ms-slot{border-radius:14px;background:color-mix(in srgb,var(--ink) 4%,transparent)}
.ms-list{display:contents}
.ms-ap{position:relative;z-index:1;display:grid;align-content:start;gap:4px;padding:10px 12px;border-radius:14px;background:var(--card);box-shadow:0 2px 6px color-mix(in srgb,var(--ink) 8%,transparent),0 10px 28px color-mix(in srgb,var(--ink) 8%,transparent)}
.ms-ap b{font-size:15px;font-weight:700;line-height:1.25}
.ms-ap small{font-size:13px;color:var(--muted)}
.ms-src{justify-self:start;margin-top:4px;padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--c) 16%,transparent);font-size:12px;font-weight:600}
.ms-sum{justify-self:start;margin:0;padding:10px 16px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:15px;font-weight:600}
${SR(".ms-sr")}
@media(max-width:760px){
  .ms-cal{grid-template-rows:auto repeat(4,minmax(64px,auto));gap:4px}
  .ms-day{font-size:12px}
  .ms-hr{padding-block-start:6px;padding-inline-end:4px;font-size:11px}
  .ms-ap{padding:6px;border-radius:10px}
  .ms-ap b{font-size:12px}
  .ms-ap small,.ms-src{display:none}
}`,
  html:`<div class="stage"><section class="ms" data-ms><div class="ms-run"><div class="ms-pin">
  <div class="ms-hd">
    <p class="ms-k">יומן תורים לקליניקות</p>
    <h2>כל התורים, במסך אחד</h2>
    <p>תורים מהאתר, מהוואטסאפ ומהטלפון נכנסים לאותו יומן. בלי פתקים, ובלי שני מטופלים באותה שעה.</p>
  </div>
  <div class="ms-cal">
${MS_DAYS.map((d, i) => `    <span class="ms-day" style="grid-column:${i + 2}" aria-hidden="true">${d}</span>`).join("\n")}
${MS_HRS.map((h, i) => `    <span class="ms-hr" style="grid-row:${i + 2}" aria-hidden="true">${h}</span>`).join("\n")}
${MS_HRS.map((_, r) => MS_DAYS.map((_, c) => `<span class="ms-slot" style="grid-area:${r + 2}/${c + 2}" aria-hidden="true"></span>`).join("")).join("\n")}
    <ul class="ms-list" aria-label="התורים השבוע">
${MS_AP.map(([d, h, n, t, s]) => `      <li class="ms-ap" style="grid-area:${h + 2}/${d + 2};--c:${MS_SRC[s]}"><span class="ms-sr">${MS_DAYS[d]}, ${MS_HRS[h]}:</span><b>${n}</b><small>${t}</small><span class="ms-src">${s}</span></li>`).join("\n")}
    </ul>
  </div>
  <p class="ms-sum">${MS_AP.length} תורים השבוע, אף אחד לא כפול</p>
</div></div></section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: כל התורים כבר ביומן (במארקאפ)
  const root=document.querySelector("[data-ms]");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const run=root.querySelector(".ms-run"),cal=root.querySelector(".ms-cal"),aps=[...root.querySelectorAll(".ms-ap")],sum=root.querySelector(".ms-sum");
  // לאן כל כרטיס נזרק בערימה: שבר מרוחב היומן ומגובהו, וזווית
  const PX=[.3,.62,.45,.72,.38,.55,.26,.68,.5],PY=[.35,.3,.55,.62,.72,.45,.58,.42,.25],PR=[-12,9,-6,14,7,-15,11,-8,4];
  // המרחק מהנקודה בערימה למקום ביומן, לפי הפריסה בלי transform, כך שגם חישוב מחדש אחרי שינוי גודל נכון
  const dx=i=>PX[i%PX.length]*cal.offsetWidth-(aps[i].offsetLeft+aps[i].offsetWidth/2);
  const dy=i=>PY[i%PY.length]*cal.offsetHeight-(aps[i].offsetTop+aps[i].offsetHeight/2);
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference) and (min-height: 600px)",()=>{
    root.classList.add("is-live");
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    // tween לכל כרטיס ולא stagger אחד: ב-fromTo עם stagger רק הכרטיס הראשון מצויר בערימה מראש, והשאר יושבים ביומן עד שהתור שלהם מגיע
    aps.forEach((a,i)=>tl.fromTo(a,{x:()=>dx(i),y:()=>dy(i),rotation:PR[i%PR.length],scale:1.04},
        {x:0,y:0,rotation:0,scale:1,ease:"power2.inOut",duration:.6},.05+i*.05));
    tl.fromTo(sum,{autoAlpha:0,y:12},{autoAlpha:1,y:0,ease:"power2.out",duration:.12});
    return()=>root.classList.remove("is-live");
  });
})();`
}
];
