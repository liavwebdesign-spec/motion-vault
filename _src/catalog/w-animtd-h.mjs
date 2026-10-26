// הירו בהשראת אחד מ-31 הסרטונים הציבוריים בדף הבית של animtd.store (26.10.2026). ליאב: "אני רוצה שתעבור על המאגר המלא שלו
// ותטמיע כל דבר חדש שיכול להועיל ושונה ממה שיש לנו כיום. לא רק כמה בודדים".
// נבנה מאפס מהצפייה בלבד: בלי הפרומפטים, הקוד, הסרטונים, הטקסטים או תמונות הסטוק של המקור. השלד (מסגרת, שורה עליונה, כניסה)
// משותף עם r-heroes.mjs, והחוזה של h1 עד h34 נשמר: רגע כניסה אחד, פריסת טלפון, שער הפתיחה והגיבוי של 2.5 שניות.

import { E, OPEN_GATE, REVEAL_JS, FRAME_CSS, TOP, NOTE_TAIL } from "./r-heroes.mjs";

const IO = "cubic-bezier(.76,0,.24,1)";

const PIC = (f, alt, { pri = false, deco = false } = {}) =>
  `<img src="../assets/media/${f}" alt="${deco ? "" : alt}"${pri ? ' fetchpriority="high"' : ""} decoding="async">`;

// עצירה לכל מה שזז לבד יותר מחמש שניות (WCAG 2.2.2, motion.md 2א), כמו ב-r2-heroes
const PP_CSS = `
.hpp{width:44px;height:44px;flex:none;border:0;border-radius:999px;display:grid;place-items:center;cursor:pointer;
  background:color-mix(in srgb,var(--ink) 55%,transparent);color:var(--bg);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:background .18s ${E}}
.hpp[hidden]{display:none}
.hpp svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.hpp .i-play{display:none;fill:currentColor}
.hpp[aria-pressed="true"] .i-pause{display:none}
.hpp[aria-pressed="true"] .i-play{display:block}
.hpp:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.hpp:hover{background:color-mix(in srgb,var(--ink) 75%,transparent)}}`;
const PP = (label) => `<button class="hpp" type="button" aria-pressed="false" aria-label="${label}" hidden><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></button>`;
// חץ ימינה. ב-RTL "הקודם" מצביע ימינה ו"הבא" שמאלה; ב-LTR שניהם מתהפכים
const ARR = (flip) => `<svg viewBox="0 0 24 24" aria-hidden="true"${flip ? ' class="flip"' : ""}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const H35_T = [["אוהל עם נוף לים,", "חמש דקות מהחוף"], ["ערב סביב האש,", "אחרי יום בשקט"], ["בוקר עם קפה", "מול הגלים"]];

export default [
{
  id:"h35", cat:"hero", name:"הירו מצגת עם וילון בכיוון הקריאה וכותרת לכל תמונה", tech:"CSS clip-path · JS", status:"מאושר-עין", runway:false,
  desc:"שלוש תמונות במסך מלא. כל תמונה חדשה נכנסת כמו וילון שנמשך מהצד שבו מתחילים לקרוא, מעל הקודמת, עם זום איטי החוצה. הכותרת מתחלפת יחד איתה: השורות של הישנה יוצאות למעלה, והחדשות עולות מלמטה שורה אחרי שורה. חצים, מונה, פס זמן וכפתור עצירה בפינה.",
  when:"עסק שהמקום שלו הוא המוצר, ולכל צילום יש משפט משלו: גלמפינג, צימר, וילה, מסעדה עם כמה חללים, אולם. מתאים כשרוצים שכל תמונה תספר חלק אחר מהחוויה. כשהמסר אחד והתמונות רק מראות את המקום מכמה זוויות, h15 עדיף: הכותרת שם קבועה ונקראת פעם אחת. לא עם פחות משלוש תמונות טובות.",
  libs:[],
  css:`${FRAME_CSS}
${PP_CSS}
.h35h{--off:inset(0 0 0 100%);position:relative;min-height:min(88vh,800px);display:flex;flex-direction:column;justify-content:flex-end;padding:112px 28px 28px;background:var(--ink);color:var(--bg);overflow:clip;isolation:isolate}
/* הווילון נפתח מהצד שבו מתחילים לקרוא: ב-RTL מימין, ב-LTR משמאל */
[dir="ltr"] .h35h{--off:inset(0 100% 0 0)}
.h35-m{position:absolute;inset:0;z-index:0}
.h35-s{position:absolute;inset:0;margin:0;clip-path:var(--off);transition:none}
.h35-s img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.08);transition:transform 1.8s ${E}}
/* החדשה מעל, נחשפת בכיוון הקריאה; הקודמת נשארת שלמה מתחתיה עד שהווילון נגמר */
.h35-s.is-on{z-index:2;clip-path:inset(0);transition:clip-path 1.1s ${IO}}
.h35-s.is-on img,.h35-s.is-prev img{transform:none}
.h35-s.is-prev{z-index:1;clip-path:inset(0)}
/* הכניסה: גם התמונה הראשונה נכנסת בווילון. בלי JS היא פשוט שם */
.open-anim .h35-s.is-on{clip-path:var(--off);animation:h35w-fs 0s 2.5s forwards}
.open-anim .h35-s.is-on img{transform:scale(1.08)}
.is-in .h35-s.is-on{clip-path:inset(0);transition-delay:var(--t0,0s)}
.is-in .h35-s.is-on img{transform:none}
.rv-on .h35-s{animation:none}
@keyframes h35w-fs{to{clip-path:inset(0)}}
.h35-sh{position:absolute;inset:0;z-index:3;background:linear-gradient(to top,color-mix(in srgb,var(--ink) 82%,transparent) 0%,color-mix(in srgb,var(--ink) 38%,transparent) 45%,transparent 75%)}
.h35-bot{position:relative;z-index:4;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:32px}
.h35-txt{display:flex;flex-direction:column;align-items:flex-start;gap:20px;max-width:660px}
/* שלוש כותרות באותו תא: הגובה הוא של הארוכה, כך שהחלפה לא מזיזה את מה שמתחת */
.h35h h3{display:grid;margin:0;font-size:clamp(36px,min(4.8vw,7.8vh),78px);line-height:1.04;font-weight:700;letter-spacing:-.01em}
.h35-t{grid-area:1/1}
.h35-ln{display:block;overflow:hidden;padding-block:.04em}
.h35-ln>span{display:block;transform:translateY(105%);transition:transform .8s ${E}}
.h35-t.is-on .h35-ln>span{transform:none;transition-delay:calc(.25s + var(--l) * 90ms)}
.h35-t.is-out .h35-ln>span{transform:translateY(-105%);transition-duration:.5s;transition-delay:0s}
/* כותרת שלא מוצגת ולא יוצאת: מוסתרת, וחוזרת למטה בלי מעבר כדי להיות מוכנה לפעם הבאה */
.h35-t:not(.is-on):not(.is-out){visibility:hidden}
.h35-t:not(.is-on):not(.is-out) .h35-ln>span{transition:none}
.open-anim .h35-t.is-on .h35-ln>span{transform:translateY(105%);animation:rv-fs 0s 2.5s forwards}
.is-in .h35-t.is-on .h35-ln>span{transform:none;transition-delay:calc(var(--t0,0s) + .25s + var(--l) * 90ms)}
.rv-on .h35-ln>span{animation:none}
.h35h .hlead{max-width:46ch;opacity:.9}
.h35-ctl{display:flex;align-items:center;gap:12px}
.h35-nav{width:48px;height:48px;flex:none;border:0;border-radius:999px;display:grid;place-items:center;cursor:pointer;
  background:color-mix(in srgb,var(--bg) 16%,transparent);color:var(--bg);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:background .18s ${E}}
.h35-nav svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.h35-nav svg.flip,[dir="ltr"] .h35-nav svg{transform:scaleX(-1)}
[dir="ltr"] .h35-nav svg.flip{transform:none}
.h35-nav:focus-visible{outline:2px solid var(--bg);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.h35-nav:hover{background:color-mix(in srgb,var(--bg) 28%,transparent)}}
.h35-cnt{min-width:3.4em;font-size:15px;font-weight:600;text-align:center;font-variant-numeric:tabular-nums}
/* פס הזמן הוא השעון: כשהוא מתמלא מגיעה התמונה הבאה, ועצירה שלו עוצרת הכל */
.h35-bar{position:relative;display:block;width:96px;height:3px;border-radius:3px;background:color-mix(in srgb,var(--bg) 30%,transparent);overflow:hidden}
.h35-bar[hidden]{display:none}
.h35-bar i{position:absolute;inset:0;background:var(--bg);transform:scaleX(0);transform-origin:right}
[dir="ltr"] .h35-bar i{transform-origin:left}
.h35-bar.run i{animation:h35-fill 6s linear forwards}
@keyframes h35-fill{to{transform:scaleX(1)}}
.h35h.is-paused .h35-bar i,.h35h.is-off .h35-bar i,.h35h.is-hold .h35-bar i{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){
  .h35-s.is-on{transition-duration:.01ms}
  .h35-s img{transition:none;transform:none!important}
  .h35-ln>span{transition-duration:.01ms!important;transition-delay:0s!important}
}
@media (max-width:760px){
  .h35h{min-height:min(88vh,720px);padding:96px 20px 24px}
  .h35-bot{grid-template-columns:minmax(0,1fr);gap:24px}
  .h35h h3{font-size:clamp(30px,8.4vw,40px)}
  .h35-bar{width:64px}
}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h35h" id="h35" aria-roledescription="מצגת" aria-label="גלמפינג על החוף">
    <div class="h35-m" aria-hidden="true">
      <figure class="h35-s is-on">${PIC("real/s08/hero.webp", "", { pri: true, deco: true })}</figure>
      <figure class="h35-s">${PIC("real/s12/dusk-camp.webp", "", { deco: true })}</figure>
      <figure class="h35-s">${PIC("real/s08/sea.webp", "", { deco: true })}</figure>
    </div>
    <span class="h35-sh"></span>
    <div class="h35-bot">
      <div class="h35-txt">
        <span class="hkick rv">גלמפינג על החוף, דור</span>
        <h3 aria-live="off">
${H35_T.map((t, i) => `          <span class="h35-t${i === 0 ? " is-on" : ""}"${i ? ' aria-hidden="true"' : ""}>${t.map((l, k) => `<span class="h35-ln"><span style="--l:${k}">${l}</span></span>`).join("")}</span>`).join("\n")}
        </h3>
        <p class="hlead rv">שמונה אוהלי ספארי עם מיטה אמיתית, מקלחת פרטית ומרפסת. ארוחת הבוקר מגיעה לאוהל.</p>
        <div class="hcta rv"><a class="hbtn" href="#h35">לבדיקת תאריכים</a><a class="hbtn ghost" href="#h35">האוהלים</a></div>
      </div>
      <div class="h35-ctl rv">
        <button class="h35-nav" type="button" data-step="-1" aria-label="התמונה הקודמת">${ARR(false)}</button>
        <button class="h35-nav" type="button" data-step="1" aria-label="התמונה הבאה">${ARR(true)}</button>
        <span class="h35-cnt" aria-hidden="true">1 / 3</span>
        <span class="h35-bar" hidden><i></i></span>
        ${PP("עצירת ההחלפה")}
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h35"); enter(root);
  var sl=[].slice.call(root.querySelectorAll(".h35-s")), tt=[].slice.call(root.querySelectorAll(".h35-t")),
      h3=root.querySelector("h3"), cnt=root.querySelector(".h35-cnt"), bar=root.querySelector(".h35-bar"),
      pp=root.querySelector(".hpp"), ctl=root.querySelector(".h35-ctl"), N=sl.length, cur=0, busy=false;
  // בהפחתת תנועה אין החלפה לבד: החצים עובדים, ופס הזמן וכפתור העצירה לא מופיעים כי אין מה לעצור
  var auto=matchMedia("(prefers-reduced-motion:no-preference)").matches;
  function restart(){if(!auto)return; bar.classList.remove("run"); void bar.offsetWidth; bar.classList.add("run");}
  function go(n){
    var nx=(n+N)%N, pv=cur;
    // נעילה עד שהווילון נגמר, כדי שלחיצות מהירות לא יערמו שלוש תמונות באמצע מעבר
    if(busy||nx===cur)return; busy=true; setTimeout(function(){busy=false;},1150);
    cur=nx;
    sl[cur].classList.remove("is-prev"); sl[pv].classList.remove("is-on"); sl[pv].classList.add("is-prev"); sl[cur].classList.add("is-on");
    setTimeout(function(){sl[pv].classList.remove("is-prev");},1150);
    tt[pv].classList.remove("is-on"); tt[pv].classList.add("is-out"); tt[pv].setAttribute("aria-hidden","true");
    tt[cur].classList.remove("is-out"); tt[cur].classList.add("is-on"); tt[cur].removeAttribute("aria-hidden");
    setTimeout(function(){tt[pv].classList.remove("is-out");},600);
    cnt.textContent=(cur+1)+" / "+N;
    restart();
  }
  [].forEach.call(root.querySelectorAll(".h35-nav"),function(b){
    b.addEventListener("click",function(){h3.setAttribute("aria-live","polite"); go(cur+Number(b.dataset.step));});
  });
  bar.querySelector("i").addEventListener("animationend",function(){go(cur+1);});
  if(auto){root.classList.add("is-auto"); bar.hidden=false; pp.hidden=false; restart();}
  pp.addEventListener("click",function(){var on=!root.classList.contains("is-paused"); root.classList.toggle("is-paused",on);
    pp.setAttribute("aria-pressed",String(on)); pp.setAttribute("aria-label",on?"הפעלת ההחלפה":"עצירת ההחלפה");});
  // מקלדת בתוך הפקדים עוצרת את השעון, כדי שהתמונה לא תתחלף מתחת לאצבע
  ctl.addEventListener("focusin",function(e){if(e.target.matches(":focus-visible"))root.classList.add("is-hold");});
  ctl.addEventListener("focusout",function(){root.classList.remove("is-hold");});
  if("IntersectionObserver" in window)new IntersectionObserver(function(es){root.classList.toggle("is-off",!es[0].isIntersecting);}).observe(root);
})();`,
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של מצגת הירו שבה כל תמונה נכנסת בווילון והכותרת מתחלפת איתה. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** ב-h15 התמונות מתחלפות בהתמזגות, והכותרת קבועה, כך שהמסר נקרא פעם אחת. כאן כל תמונה נכנסת בווילון (`clip-path` מ-`inset` מלא ל-0) מהצד שבו מתחילים לקרוא, ולכל תמונה יש כותרת משלה, שהשורות שלה עולות מתוך מסכה אחת אחרי השנייה. כשהמסר אחד, h15; כשכל תמונה מספרת חלק אחר, זה. **הווילון:** החדשה מקבלת `z-index` מעל ומעבר של 1.1 שניות; הקודמת נשארת שלמה מתחתיה עד הסוף ואז יורדת בלי מעבר, כך שבאמצע אף פעם לא רואים רקע. הכיוון הוא משתנה אחד (`--off`), ו-LTR מהפך אותו. בכניסה התמונה הנחשפת מתחילה מוגדלת ב-8% ונרגעת. **הכותרות** יושבות באותו תא של גריד, ולכן הגובה הוא של הארוכה וכלום לא קופץ; היוצאת עולה החוצה, הנכנסת עולה פנימה עם השהיה של רבע שנייה, ומי שלא בתמונה מוסתרת. **השעון** הוא פס הזמן: אנימציית CSS של 6 שניות ש-`animationend` שלה מביא את הבאה, כמו ב-h15, כך שעצירה, יציאה מהמסך ומיקוד מקלדת בפקדים עוצרים אותו בלי טיימר מקביל. נעילה של 1.15 שניות מונעת שלוש תמונות באמצע מעבר. **נגישות:** התמונות דקורטיביות, הכותרת היא הטקסט; הכותרות שלא מוצגות `aria-hidden`, וההכרזה (`aria-live`) נפתחת רק אחרי לחיצה על חץ, כדי שהחלפה אוטומטית לא תדבר כל 6 שניות. **הפחתת תנועה:** בלי החלפה לבד, בלי זום, והחלפה בחצים מיידית." + NOTE_TAIL
}
];
