// Heroes, second family (24.10.2026). Liav: "כרגע יש לנו רק 8 הירואים וזה משהו שבא לידי ביטוי באופן מובהק ברוב האתרים
// שיצרנו עד כה. צריכים שם לפחות 20-30 הירואים שונים ומיוחדים". Researched on 271 Awwwards winners (13 categories) and a
// Behance pass, rebuilt from the visual only: no code, text or media from the sources. Each one is a different structure,
// not another effect on the same structure, and each keeps the h1-h8 contract: one entrance moment, a phone layout,
// the opening gate and the 2.5s failsafe. The scaffold (frame, top row, entrance) is shared with r-heroes.mjs.
// Media: the free photos already in the vault (assets/media/real/sXX), so nothing new to license.

import { E, OPEN_GATE, REVEAL_JS, FRAME_CSS, TOP, NOTE_TAIL } from "./r-heroes.mjs";

// a photo in a hero: only the largest one is fetched first (pri), the rest load normally; decorative copies leave the tree
const PIC = (f, alt, { pri = false, lazy = false, cls = "", deco = false } = {}) =>
  `<img${cls ? ` class="${cls}"` : ""} src="../assets/media/${f}" alt="${deco ? "" : alt}"${deco ? ' aria-hidden="true"' : ""}${pri ? ' fetchpriority="high"' : lazy ? ' loading="lazy"' : ""} decoding="async">`;

// a display serif for the heroes that sell a mood (OFL, already in the vault). In a project the skin's display font replaces it
const SERIF = `@font-face{font-family:"MV Bellefair";src:url("../assets/fonts/bellefair.woff2") format("woff2");font-weight:400;font-display:swap;size-adjust:112%}`;
const DISP = `"MV Bellefair","Bellefair",Georgia,serif`;

// pause and play for anything that moves on its own for more than five seconds (WCAG 2.2.2, motion.md 2א): a surface, no ring
const PP_CSS = `
.hpp{width:44px;height:44px;flex:none;border:0;border-radius:999px;display:grid;place-items:center;cursor:pointer;
  background:color-mix(in srgb,var(--ink) 55%,transparent);color:var(--bg);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:background .18s ${E}}
.hpp svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.hpp .i-play{display:none;fill:currentColor}
.hpp[aria-pressed="true"] .i-pause{display:none}
.hpp[aria-pressed="true"] .i-play{display:block}
.hpp:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.hpp:hover{background:color-mix(in srgb,var(--ink) 75%,transparent)}}`;
const PP = (label) => `<button class="hpp" type="button" aria-pressed="false" aria-label="${label}"><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></button>`;

export default [
{
  id:"h9", cat:"hero", name:"הירו כותרת עם תמונות בתוך השורה", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת גדולה וממורכזת, ובין המילים שלה שלוש תמונות קטנות בצורת גלולה, בגובה האותיות. המילים עולות בזו אחר זו, וכל תמונה נפתחת מהמרכז לצדדים מיד אחרי המילה שלפניה.",
  when:"עסק שיש לו צילומים קטנים וטובים של העבודה עצמה: מאפייה, בית קפה, סטודיו, קליניקה, חנות מוצר. עובד כשכל תמונה מראה את המילה שלידה. לא כשיש רק צילום אחד, ולא עם צילומי סטוק כלליים.",
  libs:[],
  css:`${FRAME_CSS}
.h9h{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:28px;min-height:min(78vh,720px);padding:112px 28px 64px;
  background:color-mix(in srgb,var(--accent) 5%,var(--bg))}
/* min(vw, vh): the heading stays under 8% of the screen height on a short laptop */
.h9h h3{margin:0;max-width:12.5em;font-size:clamp(36px,min(5.2vw,7.8vh),84px);line-height:1.1;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
/* each clause is one unit: on a wide screen it never breaks in the middle, on a phone it still wraps inside */
.h9-c{display:inline-block}
.h9-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-block:.04em}
.h9-w>span{display:inline-block;transition:transform .7s ${E}}
.open-anim .h9-w>span{transform:translateY(110%);animation:rv-fs 0s 2.5s forwards}
.is-in .h9-w>span{transform:none;transition-delay:calc(var(--t0,0s) + var(--i) * 60ms)}
.rv-on .h9-w>span{animation:none}
/* the pill is sized in em, so it follows the heading at every width; it opens from its centre with clip-path, not width (no layout) */
.h9-pill{display:inline-block;width:1.9em;height:.8em;margin-inline:.1em;vertical-align:-.05em;border-radius:999px;overflow:hidden;
  clip-path:inset(0 0 round 999px);transition:clip-path .7s ${E}}
.h9-pill img{width:100%;height:100%;object-fit:cover;display:block}
.open-anim .h9-pill{clip-path:inset(0 50% round 999px);animation:h9p-fs 0s 2.5s forwards}
.is-in .h9-pill{clip-path:inset(0 0 round 999px);transition-delay:calc(var(--t0,0s) + .2s + var(--i) * 60ms)}
.rv-on .h9-pill{animation:none}
@keyframes h9p-fs{to{clip-path:inset(0 0 round 999px)}}
.h9h .hlead{max-width:44ch}
.h9h .hcta{justify-content:center}
@media (prefers-reduced-motion:reduce){.h9-w>span,.h9-pill{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:760px){.h9h{padding:96px 20px 48px;gap:24px}.h9h h3{font-size:clamp(30px,8.2vw,40px)}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h9h" id="h9">
    <span class="hkick rv" style="--i:0">מאפייה ובית קפה, פלורנטין</span>
    <h3><span class="h9-c"><span class="h9-w" style="--i:0"><span>לחם</span></span> <span class="h9-pill" style="--i:0">${PIC("real/s14/baker-hands.webp", "", { deco: true, pri: true })}</span> <span class="h9-w" style="--i:1"><span>של בוקר,</span></span></span> <span class="h9-c"><span class="h9-w" style="--i:2"><span>קפה</span></span> <span class="h9-pill" style="--i:2">${PIC("real/s14/croissants.webp", "", { deco: true })}</span> <span class="h9-w" style="--i:3"><span>של שכונה,</span></span></span> <span class="h9-c"><span class="h9-w" style="--i:4"><span>ושולחן</span></span> <span class="h9-pill" style="--i:4">${PIC("real/s14/cafe-window.webp", "", { deco: true })}</span> <span class="h9-w" style="--i:5"><span>ליד החלון</span></span></span></h3>
    <p class="hlead rv" style="--i:4">פתוחים כל יום מ-7:00. בשישי עד שהמאפים נגמרים, וזה קורה בערך באחת.</p>
    <div class="hcta rv" style="--i:5"><a class="hbtn" href="#h9">לתפריט הבוקר</a><a class="hbtn ghost" href="#h9">איך מגיעים</a></div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h9"));`,
  note:"שלוש תמונות ולא יותר: אחת לכל חלק במשפט, וכל אחת מראה את המילה שלפניה (ידיים בבצק אחרי \"לחם\"). הגלולה נמדדת ב-em ולא בפיקסלים, ולכן היא תמיד בגובה האותיות, גם כשהכותרת מתכווצת בטלפון, ו-vertical-align של -.05em מושיב אותה על קו הבסיס של העברית. היא נפתחת ב-clip-path מהמרכז החוצה ולא ב-width, כדי שהשורה לא תקפוץ בזמן שהתמונה נפתחת. התמונות דקורטיביות (alt ריק ו-aria-hidden), כי הכותרת שלמה גם בלעדיהן וקורא מסך לא צריך לשמוע \"ידיים לשות בצק\" באמצע משפט. המילים עולות בהפרש של 60 מילישניות, והפתיחה כולה נגמרת ב-1.2 שניות." + NOTE_TAIL
},
{
  id:"h10", cat:"hero", name:"הירו טקסט במרכז ותמונות בכנפיים", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"טור טקסט צר במרכז, וארבע תמונות בגדלים ובגבהים שונים בשני הצדדים, חלקן נחתכות בקצה המסך. התמונות נכנסות מלמעלה ומלמטה, ובגלילה זזות כל אחת במהירות אחרת.",
  when:"עסק שמוכר אווירה ויש לו כמה צילומים באותה תאורה: בר, מסעדת ערב, מלון בוטיק, אולם אירועים, מותג אופנה. לא כשהטקסט ארוך משלוש שורות, כי הטור צר בכוונה.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h10h{--disp:${DISP};position:relative;display:grid;place-items:center;min-height:min(80vh,740px);padding:112px 28px 72px;background:var(--ink);color:var(--bg);overflow:hidden;text-align:center}
.h10-txt{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:24px;max-width:min(560px,48vw)}
.h10h h3{margin:0;font-family:var(--disp);font-weight:400;font-size:clamp(38px,min(4.8vw,7.8vh),80px);line-height:1.02;letter-spacing:-.01em;text-wrap:balance}
.h10h .hlead{max-width:40ch}
.h10h .hcta{justify-content:center}
/* the wings: logical insets, so they swap sides with the reading direction; the outer two are cut by the frame edge */
.h10-wing{position:absolute;z-index:1;border-radius:16px;overflow:hidden;transition:transform 1s ${E},opacity .8s ${E}}
.h10-wing img{width:100%;height:100%;object-fit:cover;display:block;transform:translateY(var(--py,0px)) scale(1.18)}
.h10-a{inset-inline-start:-3%;top:12%;width:clamp(150px,17vw,260px);aspect-ratio:3/4}
.h10-b{inset-inline-start:9%;bottom:-6%;width:clamp(110px,11vw,180px);aspect-ratio:4/5}
.h10-c{inset-inline-end:-2%;bottom:10%;width:clamp(150px,16vw,250px);aspect-ratio:3/4}
.h10-d{inset-inline-end:10%;top:15%;width:clamp(100px,10vw,170px);aspect-ratio:1}
.open-anim .h10-wing{opacity:0;transform:translateY(var(--fy));animation:rv-fs 0s 2.5s forwards}
.is-in .h10-wing{opacity:1;transform:none;transition-delay:calc(var(--t0,0s) + .15s + var(--i) * 80ms)}
.rv-on .h10-wing{animation:none}
@media (prefers-reduced-motion:reduce){.h10-wing{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: two wings only, small, peeking from the bottom corners under a centred text */
@media (max-width:760px){.h10h{padding:96px 20px 112px;min-height:min(86vh,720px)}.h10-txt{max-width:none}.h10-b,.h10-d{display:none}
  .h10-a{width:150px;top:auto;bottom:-4%;inset-inline-start:-6%}.h10-c{width:150px;bottom:-9%;inset-inline-end:-6%}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h10h" id="h10">
    <div class="h10-wing h10-a" style="--i:0;--fy:48px">${PIC("real/s15/hero-glass.webp", "קוקטייל על שולחן שיש בבר", { pri: true })}</div>
    <div class="h10-wing h10-d" style="--i:1;--fy:-48px">${PIC("real/s15/flute.webp", "", { deco: true })}</div>
    <div class="h10-wing h10-c" style="--i:2;--fy:48px">${PIC("real/s15/room.webp", "", { deco: true })}</div>
    <div class="h10-wing h10-b" style="--i:3;--fy:48px">${PIC("real/s15/pour.webp", "", { deco: true })}</div>
    <div class="h10-txt">
      <span class="hkick rv">בר יין, יפו העתיקה</span>
      <h3 class="rv">ערב שמתחיל בכוס אחת ונגמר בשולחן ארוך</h3>
      <p class="hlead rv">יינות מכרמים קטנים, מטבח פתוח עד חצות, ושמונה עשר מקומות ישיבה בלבד.</p>
      <div class="hcta rv"><a class="hbtn" href="#h10">להזמנת מקום</a><a class="hbtn ghost" href="#h10">לתפריט</a></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h10"); enter(root);
  // scroll drift: each wing at its own speed, on the image inside (the wing itself owns the entrance transform)
  if(!matchMedia("(prefers-reduced-motion:no-preference)").matches)return;
  var imgs=[].slice.call(root.querySelectorAll(".h10-wing img")), rates=[-.08,.05,-.05,.1], raf=0;
  function upd(){raf=0; var r=root.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight)return;
    imgs.forEach(function(im,k){im.style.setProperty("--py",(-r.top*rates[k]).toFixed(1)+"px");});}
  addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd);},{passive:true});
})();`,
  note:"הטור במרכז צר בכוונה (עד 48% מהרוחב), כי הכנפיים צריכות אוויר: כותרת של שלוש שורות ומשפט אחד, לא יותר. הכנפיים יושבות על inset לוגי ולכן מתחלפות צד לבד ב-RTL וב-LTR, ושתיים מהן נחתכות בקצה המסגרת, וזה מה שהופך אותן ממסגרת סימטרית לקומפוזיציה. הן נכנסות מלמעלה ומלמטה לסירוגין (--fy) ולא מהצדדים, כי כניסה מהצד תלויה בכיוון הקריאה. הסחיפה בגלילה יושבת על התמונה שבפנים (עם scale של 1.18 כדי שלא ייפתח חור), כי הכנף עצמה מחזיקה את טרנספורם הכניסה, ונעצרת בהפחתת תנועה. בטלפון נשארות שתי כנפיים קטנות שמציצות מהפינות התחתונות. פונט התצוגה (Bellefair) הוא דוגמה: בפרויקט נכנס פונט התצוגה של העור." + NOTE_TAIL
},
{
  id:"h11", cat:"hero", name:"הירו צילום רחב למעלה וטקסט מתחתיו", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"צילום רחב שתופס את החלק העליון של המסך עד הקצוות, ומתחתיו שורת טקסט על משטח נקי: כותרת גדולה בצד אחד, משפט וכפתור בצד השני. הצילום נחשף מלמעלה למטה ונושם, והכותרת עולה אחריו.",
  when:"עסק שהצילום שלו רחב ושקט: מטבחים, נגרות, קבלן, נדל״ן, תיירות, אדריכלות נוף. מתאים כשהטקסט לא צריך לשבת על התמונה. לא לצילום אנכי או לצילום עם הרבה פרטים בתחתית.",
  libs:[],
  css:`${FRAME_CSS}
.h11h{display:grid;grid-template-rows:minmax(0,1fr) auto;min-height:min(84vh,760px);background:var(--bg)}
.h11-vis{position:relative;overflow:hidden;min-height:280px;background:var(--ink);clip-path:inset(0 0 0 0);transition:clip-path 1s ${E}}
.h11-vis img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s ${E}}
/* the top row sits on the photo: a short shade from the top keeps it readable */
.h11-vis::after{content:"";position:absolute;inset:0 0 auto;height:128px;background:linear-gradient(to bottom,color-mix(in srgb,var(--ink) 50%,transparent),transparent)}
.open-anim .h11-vis{clip-path:inset(0 0 100% 0);animation:h11v-fs 0s 2.5s forwards}
.open-anim .h11-vis img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in .h11-vis{clip-path:inset(0 0 0 0);transition-delay:var(--t0,0s)}
.is-in .h11-vis img{transform:none;transition-delay:var(--t0,0s)}
.rv-on .h11-vis,.rv-on .h11-vis img{animation:none}
@keyframes h11v-fs{to{clip-path:inset(0 0 0 0)}}
.h11-txt{display:grid;grid-template-columns:1.25fr .75fr;align-items:end;gap:48px;padding:40px 28px 48px}
.h11h h3{margin:0;max-width:14ch;font-size:clamp(34px,min(4.6vw,7.8vh),76px);line-height:1.02;font-weight:700;letter-spacing:-.015em;text-wrap:balance}
.h11-side{display:flex;flex-direction:column;align-items:flex-start;gap:24px;padding-bottom:6px}
@media (prefers-reduced-motion:reduce){.h11-vis,.h11-vis img{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h11h{grid-template-rows:auto auto;min-height:0}.h11-vis{min-height:0;aspect-ratio:4/3}
  .h11-txt{grid-template-columns:1fr;gap:20px;padding:28px 20px 40px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h11h" id="h11">
    <div class="h11-vis">${PIC("real/s13/proj-c.webp", "מטבח כהה עם אי ארוך ושלוש מנורות תלויות", { pri: true })}</div>
    <div class="h11-txt">
      <div><span class="hkick rv" style="--i:2">מטבחים בהתאמה אישית</span>
        <h3 class="rv" style="--i:3">מטבח שמתוכנן סביב הדרך שבה אתם מבשלים</h3></div>
      <div class="h11-side">
        <p class="hlead rv" style="--i:4">מדידה אצלכם בבית, הדמיה תוך שבוע, ייצור בנגרייה שלנו והתקנה ביום אחד. בלי קבלני משנה.</p>
        <div class="hcta rv" style="--i:5"><a class="hbtn" href="#h11">לתיאום מדידה בבית</a></div>
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h11"));`,
  note:"זה המבנה שהתורה רשמה כ\"עוד אין לו דמו\": ויז'ואל מוצמד למעלה וטקסט מתחתיו. היתרון הוא שהטקסט לא יושב על התמונה, ולכן אין צורך בשכבת קריאות על הכותרת ואפשר לבחור צילום בלי \"שמיים ריקים\" בשביל הטקסט. השורה העליונה כן יושבת על הצילום, ולכן יש גרדיאנט קצר מלמעלה (128 פיקסלים) רק בשבילה. השורות בגריד: הצילום מקבל את מה שנשאר (minmax(0,1fr)) אחרי שורת הטקסט, וכך כל המבנה נכנס במסך הראשון בכל גובה. הצילום נחשף ב-clip-path מלמעלה למטה תוך שהוא נושם מ-108% ל-100, ושורת הטקסט עולה אחריו (--i 2 עד 5), כי הוא הדבר הכבד. בטלפון הצילום עובר ליחס 4:3 והטקסט נערם." + NOTE_TAIL
},
{
  id:"h12", cat:"hero", name:"הירו סנדוויץ': שורה, רצועת צילום, שורה", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"הכותרת מתפצלת לשתי שורות ענקיות, ובין השורות רצועת צילום פנורמית ברוחב המסך כולו. השורה הראשונה מיושרת להתחלה והשנייה לסוף, הרצועה נפתחת מהאמצע לגובה, ומתחת יושבים משפט וכפתור.",
  when:"כשיש צילום אחד חזק ורחב, ומשפט פתיחה שמתחלק טוב לשניים: תיירות, שייט, יקב, מותג, סטודיו, קבלן. עובד גם כשהעסק פשוט, כי המבנה עושה את הרושם. לא לכותרת ארוכה משש מילים.",
  libs:[],
  css:`${FRAME_CSS}
/* a diagonal: line one at the start with the kicker across from it, the strip edge to edge, line two at the end with the lead
   across from it. The heading is display:contents so its three parts can sit in the section grid and still read as one h3 */
.h12h{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"l1 kick" "strip strip" "foot l2";align-content:center;row-gap:24px;
  min-height:min(84vh,760px);padding:112px 0 48px;background:var(--bg);overflow:hidden}
.h12h h3{display:contents;font-weight:700;letter-spacing:-.02em}
.h12h .hkick{grid-area:kick;align-self:end;padding-inline:28px;padding-bottom:10px}
.h12-l{display:block;overflow:hidden;padding-inline:28px;font-size:clamp(40px,min(7vw,7.8vh),120px);line-height:1;font-weight:700;letter-spacing:-.02em}
.h12-l1{grid-area:l1;align-self:end}
.h12-l2{grid-area:l2;text-align:end}
.h12-l>span{display:block;padding-block:.06em;transition:transform .8s ${E}}
.open-anim .h12-l>span{transform:translateY(110%);animation:rv-fs 0s 2.5s forwards}
.is-in .h12-l>span{transform:none;transition-delay:var(--t0,0s)}
.is-in .h12-l2>span{transition-delay:calc(var(--t0,0s) + .25s)}
.rv-on .h12-l>span{animation:none}
/* the strip opens from its middle line to full height; the photo inside settles from 1.15 */
.h12-strip{grid-area:strip;display:block;height:clamp(140px,28vh,300px);overflow:hidden;clip-path:inset(0 0 0 0);transition:clip-path .9s ${E}}
.h12-strip img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;display:block;transition:transform 1.2s ${E}}
.open-anim .h12-strip{clip-path:inset(50% 0 50% 0);animation:h12s-fs 0s 2.5s forwards}
.open-anim .h12-strip img{transform:scale(1.15);animation:rv-fs 0s 2.5s forwards}
.is-in .h12-strip{clip-path:inset(0 0 0 0);transition-delay:calc(var(--t0,0s) + .1s)}
.is-in .h12-strip img{transform:none;transition-delay:calc(var(--t0,0s) + .1s)}
.rv-on .h12-strip,.rv-on .h12-strip img{animation:none}
@keyframes h12s-fs{to{clip-path:inset(0 0 0 0)}}
.h12-foot{grid-area:foot;display:flex;align-items:center;gap:32px;padding-inline:28px;padding-top:6px}
.h12-foot .hlead{max-width:40ch;margin:0}
.h12-foot .hcta{flex:none}
@media (prefers-reduced-motion:reduce){.h12-l>span,.h12-strip,.h12-strip img{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h12h{grid-template-columns:minmax(0,1fr);grid-template-areas:"kick" "l1" "strip" "l2" "foot";row-gap:16px;padding:96px 0 40px}
  .h12h .hkick,.h12-l,.h12-foot{padding-inline:20px}.h12h .hkick{padding-bottom:0}
  .h12-l{font-size:clamp(40px,13vw,56px)}.h12-strip{height:24vh}.h12-foot{flex-direction:column;align-items:flex-start;gap:20px;padding-top:8px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h12h" id="h12">
    <span class="hkick rv" style="--i:0">שייט פרטי מהמרינה בהרצליה</span>
    <h3><span class="h12-l h12-l1"><span>ים פתוח,</span></span><span class="h12-strip">${PIC("real/s08/sea.webp", "", { deco: true, pri: true })}</span><span class="h12-l h12-l2"><span>ושום דבר אחר</span></span></h3>
    <div class="h12-foot">
      <p class="hlead rv" style="--i:4">שלוש שעות על סירה לזוגות ולמשפחות, עם סקיפר, ארוחה קלה ושקיעה במים.</p>
      <div class="hcta rv" style="--i:5"><a class="hbtn" href="#h12">לבדיקת תאריך</a></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h12"));`,
  note:"המבנה עובד רק כשהכותרת מתחלקת באמת לשניים, עם פסיק או נשימה באמצע: \"ים פתוח, / ושום דבר אחר\". השורה הראשונה מיושרת להתחלה עם שורת הפתיח מולה, השנייה לסוף עם המשפט והכפתור מולה, והרצועה ביניהן עוברת מקצה לקצה בלי ריפוד: אלכסון שממלא את הרוחב ולא משאיר חצי מסך ריק ליד מילים קצרות. הרצועה היא חלק מהכותרת (span בתוך ה-h3, תמונה דקורטיבית), כי היא באמת יושבת בין שתי המילים, וה-h3 הוא display:contents כדי ששלושת החלקים שלו יישבו בגריד של הסקשן ועדיין ייקראו ככותרת אחת. היא נפתחת ב-clip-path מקו האמצע לגובה מלא, השורות עולות מתוך חיתוך בהפרש של 250 מילישניות, והגודל של כל שורה עדיין לפי min של רוחב וגובה, כך שבמחשב נמוך היא לא עוברת 8% מהגובה. בטלפון הרצועה יורדת ל-24% מהגובה והשורה התחתונה נערמת." + NOTE_TAIL
},
{
  id:"h13", cat:"hero", name:"הירו קשתות שעולות מהתחתית", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת ממורכזת למעלה, ומתחתיה שלוש תמונות בצורת קשת שעולות מקצה המסך התחתון, האמצעית גבוהה מהשתיים שלצידה. הקשת האמצעית עולה ראשונה, והצדדיות אחריה.",
  when:"עסק עם אופי רך ומוקפד: עיצוב פנים, ספא, קליניקת אסתטיקה, מלון בוטיק, חתונות, נדל״ן יוקרה. דורש שלוש תמונות שעובדות יחד בצבע. לא לעסק טכני או תעשייתי, שם הקשת נראית כקישוט.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h13h{--disp:${DISP};position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;min-height:min(84vh,780px);padding:112px 28px 0;
  background:color-mix(in srgb,var(--accent) 6%,var(--bg));overflow:hidden}
.h13-txt{display:flex;flex-direction:column;align-items:center;gap:20px;max-width:680px}
.h13h h3{margin:0;font-family:var(--disp);font-weight:400;font-size:clamp(36px,min(4.6vw,7.8vh),76px);line-height:1.02;text-wrap:balance}
.h13h .hlead{max-width:42ch}
.h13h .hcta{justify-content:center}
.h13-arches{margin-top:auto;display:flex;align-items:flex-end;justify-content:center;gap:clamp(12px,1.6vw,24px);width:min(980px,100%);padding-top:40px}
.h13-arch{flex:1 1 0;border-radius:999px 999px 0 0;overflow:hidden;transition:transform .9s ${E}}
.h13-arch img{width:100%;height:100%;object-fit:cover;display:block}
.h13-arch:nth-child(1),.h13-arch:nth-child(3){height:clamp(170px,30vh,300px)}
.h13-arch:nth-child(2){flex-grow:1.2;height:clamp(210px,38vh,380px)}
.open-anim .h13-arch{transform:translateY(102%);animation:rv-fs 0s 2.5s forwards}
.is-in .h13-arch{transform:none;transition-delay:calc(var(--t0,0s) + .1s + var(--i) * 120ms)}
.rv-on .h13-arch{animation:none}
@media (prefers-reduced-motion:reduce){.h13-arch{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:760px){.h13h{padding:96px 20px 0}.h13-arches{gap:10px;padding-top:28px}
  .h13-arch:nth-child(1),.h13-arch:nth-child(3){height:22vh}.h13-arch:nth-child(2){height:28vh}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h13h" id="h13">
    <div class="h13-txt">
      <span class="hkick rv">סטודיו לעיצוב פנים</span>
      <h3 class="rv">בית שנראה כמו האנשים שגרים בו</h3>
      <p class="hlead rv">תכנון, בחירת חומרים וליווי בשטח עד היום שמכניסים את הספה. ארבעה פרויקטים בשנה.</p>
      <div class="hcta rv"><a class="hbtn" href="#h13">לתיאום פגישת היכרות</a></div>
    </div>
    <div class="h13-arches">
      <div class="h13-arch" style="--i:1">${PIC("real/s13/proj-b.webp", "", { deco: true })}</div>
      <div class="h13-arch" style="--i:0">${PIC("real/s13/room.webp", "סלון עם כורסה ומנורה בתאורת ערב", { pri: true })}</div>
      <div class="h13-arch" style="--i:1">${PIC("real/s13/proj-a.webp", "", { deco: true })}</div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h13"));`,
  note:"הקשת היא border-radius של 999px רק בפינות העליונות, ולכן היא נשארת חצי עיגול נקי בכל רוחב, בלי SVG ובלי מסכה. הקשתות יושבות על הקצה התחתון של ההירו (margin-top:auto בעמודת flex) ולא צפות באמצע, וזה מה שגורם להן להיראות כמו חלונות ולא כמו כרטיסים. האמצעית רחבה וגבוהה יותר ועולה ראשונה, הצדדיות אחריה בהפרש של 120 מילישניות; הן עולות מתוך הקצה (translateY של 102% עם overflow hidden על ההירו), כך שאין רגע שבו קשת מרחפת באוויר. הגובה שלהן לפי גובה המסך (vh), כדי שהטקסט למעלה תמיד יישאר במסך הראשון. פונט התצוגה (Bellefair) הוא דוגמה." + NOTE_TAIL
},
{
  id:"h14", cat:"hero", name:"הירו עם עמודות תמונות שזזות", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"טקסט בצד אחד, ובצד השני שתי עמודות של תמונות שגולשות לאט ובלי סוף, אחת למעלה ואחת למטה. הקצוות נמוגים, ריחוף עוצר את התנועה, ויש כפתור עצירה גלוי.",
  when:"עסק שיש לו הרבה צילומים טובים ולא צילום אחד מוביל: הפקת אירועים, צלם, מסעדה, חנות, סטודיו, קייטרינג. מראה כמות ואיכות בבת אחת. לא כשיש פחות משש תמונות, כי החזרה בולטת.",
  libs:[],
  css:`${FRAME_CSS}
${PP_CSS}
.h14h{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:48px;height:min(84vh,760px);min-height:560px;padding-inline:28px;background:var(--bg);overflow:hidden}
.h14-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:112px 56px}
.h14h h3{margin:0;max-width:13ch;font-size:clamp(34px,min(4.4vw,7.8vh),72px);line-height:1.03;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h14h .hlead{max-width:40ch}
/* the edges fade (mask), so a photo never starts or ends with a hard cut */
.h14-vis{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:16px;overflow:hidden;
  -webkit-mask-image:linear-gradient(to bottom,transparent 64px,#000 168px,#000 86%,transparent);mask-image:linear-gradient(to bottom,transparent 64px,#000 168px,#000 86%,transparent)}
.h14-col{display:flex;flex-direction:column;gap:16px;animation:h14up 44s linear infinite}
.h14-col.dn{animation-name:h14dn;animation-duration:52s}
.h14-col img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px;display:block}
/* the list is written twice: moving by half of it (plus half a gap) lands on the same picture, so the loop has no seam */
@keyframes h14up{to{transform:translateY(calc(-50% - 8px))}}
@keyframes h14dn{from{transform:translateY(calc(-50% - 8px))}to{transform:none}}
.h14h.paused .h14-col{animation-play-state:paused}
@media (hover:hover) and (pointer:fine){.h14-vis:hover .h14-col{animation-play-state:paused}}
.h14h .hpp{position:absolute;inset-block-end:20px;inset-inline-end:20px;z-index:2}
@media (prefers-reduced-motion:reduce){.h14-col{animation:none}.h14h .hpp{display:none}}
/* phone: the text first, the two columns as a band below it */
@media (max-width:860px){.h14h{grid-template-columns:1fr;grid-template-rows:auto minmax(200px,1fr);gap:8px;height:min(94vh,800px);min-height:0;padding-inline:20px}
  .h14-txt{padding-block:88px 8px;gap:18px}
  .h14-vis{gap:10px;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 18%,#000 82%,transparent)}.h14-col{gap:10px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h14h" id="h14">
    <div class="h14-txt">
      <span class="hkick rv">הפקת אירועים ופסטיבלים</span>
      <h3 class="rv">אתם נהנים מהערב. אנחנו דואגים לכל השאר</h3>
      <p class="hlead rv">במה, סאונד, בר ואבטחה מספק אחד. מאה עשרים אירועים בשנה, מחתונה בחצר ועד פסטיבל של שלושה ימים.</p>
      <div class="hcta rv"><a class="hbtn" href="#h14">לקבלת הצעה לאירוע</a><a class="hbtn ghost" href="#h14">אירועים שהפקנו</a></div>
    </div>
    <div class="h14-vis rv" aria-label="צילומים מאירועים שהפקנו" role="img">
      <div class="h14-col">${PIC("real/s06/dancers.webp", "", { deco: true, pri: true })}${PIC("real/s06/food.webp", "", { deco: true })}${PIC("real/s06/singer.webp", "", { deco: true })}${PIC("real/s12/hero-window.webp", "", { deco: true })}${PIC("real/s06/dancers.webp", "", { deco: true })}${PIC("real/s06/food.webp", "", { deco: true })}${PIC("real/s06/singer.webp", "", { deco: true })}${PIC("real/s12/hero-window.webp", "", { deco: true })}</div>
      <div class="h14-col dn">${PIC("real/s06/hug.webp", "", { deco: true })}${PIC("real/s15/pour.webp", "", { deco: true })}${PIC("real/s06/hands.webp", "", { deco: true })}${PIC("real/s12/dusk-camp.webp", "", { deco: true })}${PIC("real/s06/hug.webp", "", { deco: true })}${PIC("real/s15/pour.webp", "", { deco: true })}${PIC("real/s06/hands.webp", "", { deco: true })}${PIC("real/s12/dusk-camp.webp", "", { deco: true })}</div>
    </div>
    ${PP("עצירת התמונות הזזות")}
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h14"), pp=root.querySelector(".hpp"); enter(root);
  pp.addEventListener("click",function(){var on=!root.classList.contains("paused");root.classList.toggle("paused",on);pp.setAttribute("aria-pressed",String(on));
    pp.setAttribute("aria-label",on?"הפעלת התמונות הזזות":"עצירת התמונות הזזות");});
})();`,
  note:"כל עמודה כתובה פעמיים, והאנימציה מזיזה אותה בדיוק בחצי מהגובה ועוד חצי מהרווח (calc(-50% - 8px)), ולכן התמונה שנוחתת למעלה זהה לזו שהתחילה שם ואין קפיצה בלולאה. שתי העמודות בכיוונים הפוכים ובמהירויות שונות (44 ו-52 שניות), כדי שהעין לא תתפוס קצב. הקצוות נמוגים במסכת גרדיאנט ולא בשכבת צבע, אז זה עובד על כל רקע. זו תנועה שנמשכת יותר מחמש שניות, ולכן יש כפתור עצירה גלוי (WCAG 2.2.2), ריחוף עוצר אותה, ובהפחתת תנועה היא לא זזה בכלל והכפתור יורד. העמודות הן תמונה אחת מבחינת קורא מסך (role=img עם תיאור), והתמונות עצמן דקורטיביות. בטלפון הטקסט עולה למעלה והעמודות ממלאות את מה שנשאר מתחתיו." + NOTE_TAIL
},
{
  id:"h15", cat:"hero", name:"הירו מצגת מסך מלא עם פסי התקדמות", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"שלוש תמונות במסך מלא שמתחלפות לבד, כל אחת עם שם קצר, ופס התקדמות לכל אחת כמו בסטורי. הכותרת והכפתור נשארים קבועים, נגיעה בשם עוברת לתמונה שלו, ויש כפתור עצירה.",
  when:"עסק שצריך להראות כמה מקומות או חלקים כבר במסך הראשון: מלון (חוף, חדרים, בר), נדל״ן (בניין, דירה, נוף), אולם, מסעדה עם כמה חללים, אתר תיירות. לא כשיש רק צילום אחד טוב; אז h3.",
  libs:[],
  css:`${FRAME_CSS}
${PP_CSS}
.h15h{position:relative;min-height:min(84vh,760px);display:flex;flex-direction:column;justify-content:flex-end;padding:112px 28px 40px;background:var(--ink);color:var(--bg);overflow:hidden;isolation:isolate}
/* the incoming slide fades in on top while the outgoing one stays whole underneath and drops only when the fade is done,
   so the middle of a change never shows the background through two half-transparent photos */
.h15-sl{position:absolute;inset:0;z-index:-3;opacity:0;transition:opacity 0s 1s}
.h15-sl.on{z-index:-2;opacity:1;transition:opacity 1s ${E}}
.h15-sl img{width:100%;height:100%;object-fit:cover;display:block}
/* the slow push-in runs only on the slide that is showing, and pauses with the rest */
.h15-sl.on img{animation:h15kb 7s linear forwards}
@keyframes h15kb{from{transform:scale(1.08)}to{transform:scale(1)}}
/* diagonal scrim from the corner where the text sits (heroes.md): dark under the words, clear on the far side */
.h15-scrim{position:absolute;inset:0;z-index:-1;background:linear-gradient(to top left,color-mix(in srgb,var(--ink) 82%,transparent) 0%,color-mix(in srgb,var(--ink) 40%,transparent) 45%,transparent 75%)}
[dir="ltr"] .h15-scrim{background:linear-gradient(to top right,color-mix(in srgb,var(--ink) 82%,transparent) 0%,color-mix(in srgb,var(--ink) 40%,transparent) 45%,transparent 75%)}
.h15-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
.h15-txt{display:flex;flex-direction:column;align-items:flex-start;gap:20px;max-width:620px}
.h15h h3{margin:0;font-size:clamp(36px,min(4.8vw,7.8vh),78px);line-height:1.02;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h15h .hlead{opacity:.9}
.h15-nav{display:flex;align-items:flex-end;gap:16px;width:min(380px,40%)}
.h15-tab{flex:1;display:flex;flex-direction:column;gap:10px;min-height:44px;justify-content:flex-end;padding:0;border:0;background:none;color:inherit;font:inherit;font-size:14px;font-weight:600;text-align:start;cursor:pointer;opacity:.7;transition:opacity .2s ${E}}
.h15-tab[aria-current="true"]{opacity:1}
.h15-tab:focus-visible{outline:2px solid var(--bg);outline-offset:4px;border-radius:4px}
.h15-bar{position:relative;display:block;height:3px;border-radius:3px;background:color-mix(in srgb,var(--bg) 30%,transparent);overflow:hidden}
.h15-bar i{position:absolute;inset:0;background:var(--bg);transform:scaleX(0);transform-origin:right}
[dir="ltr"] .h15-bar i{transform-origin:left}
.h15-tab.done .h15-bar i{transform:scaleX(1)}
.h15-tab[aria-current="true"] .h15-bar i{animation:h15fill 6s linear forwards}
.h15h.still .h15-tab[aria-current="true"] .h15-bar i{animation:none;transform:scaleX(1)}
@keyframes h15fill{to{transform:scaleX(1)}}
.h15h.paused .h15-bar i,.h15h.paused .h15-sl img{animation-play-state:paused}
@media (hover:hover) and (pointer:fine){.h15-tab:hover{opacity:1}}
@media (prefers-reduced-motion:reduce){.h15-sl.on img{animation:none}.h15-sl,.h15-sl.on{transition:none}}
@media (max-width:860px){.h15h{padding:96px 20px 32px;min-height:min(88vh,720px)}.h15-foot{flex-direction:column-reverse;align-items:stretch;gap:28px}.h15-nav{width:100%}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h15h" id="h15" aria-roledescription="מצגת">
    <div class="h15-sl on">${PIC("real/s08/sea.webp", "הים מול המלון בשעת שקיעה", { pri: true })}</div>
    <div class="h15-sl" aria-hidden="true">${PIC("real/s02/night-room.webp", "חדר שינה לבן ושקט")}</div>
    <div class="h15-sl" aria-hidden="true">${PIC("real/s13/room.webp", "לאונג' עם כורסה ומנורה")}</div>
    <span class="h15-scrim"></span>
    <div class="h15-foot">
      <div class="h15-txt">
        <span class="hkick rv">מלון בוטיק, נתניה</span>
        <h3 class="rv">לישון מול הים, ולהתעורר בלי שעון</h3>
        <p class="hlead rv">עשרים ושניים חדרים, כולם עם מרפסת לים, וארוחת בוקר עד הצהריים.</p>
        <div class="hcta rv"><a class="hbtn" href="#h15">לבדיקת זמינות</a></div>
      </div>
      <div class="h15-nav rv">
        <button class="h15-tab" type="button" aria-current="true"><span>החוף</span><span class="h15-bar"><i></i></span></button>
        <button class="h15-tab" type="button" aria-current="false"><span>החדרים</span><span class="h15-bar"><i></i></span></button>
        <button class="h15-tab" type="button" aria-current="false"><span>הלאונג'</span><span class="h15-bar"><i></i></span></button>
        ${PP("עצירת המצגת")}
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h15"), pp=root.querySelector(".hpp"); enter(root);
  var sl=[].slice.call(root.querySelectorAll(".h15-sl")), tabs=[].slice.call(root.querySelectorAll(".h15-tab")), cur=0;
  // reduced motion: no autoplay, the names still switch; the button has nothing to stop, so it leaves
  var auto=matchMedia("(prefers-reduced-motion:no-preference)").matches;
  if(!auto){root.classList.add("still"); pp.hidden=true;}
  function go(n){
    cur=(n+sl.length)%sl.length;
    sl.forEach(function(s,k){s.classList.toggle("on",k===cur); s.setAttribute("aria-hidden",String(k!==cur));});
    tabs.forEach(function(t,k){t.setAttribute("aria-current",String(k===cur)); t.classList.toggle("done",k<cur);
      // restart the bar: drop the animation for one frame
      var i=t.querySelector("i"); i.style.animation="none"; void i.offsetWidth; i.style.animation="";});
  }
  // the bar of the current slide is the clock: when it fills, the next slide comes
  tabs.forEach(function(t,k){
    t.addEventListener("click",function(){go(k);});
    t.querySelector("i").addEventListener("animationend",function(){if(auto&&k===cur)go(cur+1);});
  });
  pp.addEventListener("click",function(){var on=!root.classList.contains("paused"); root.classList.toggle("paused",on);
    pp.setAttribute("aria-pressed",String(on)); pp.setAttribute("aria-label",on?"הפעלת המצגת":"עצירת המצגת");});
})();`,
  note:"הכותרת והכפתור לא מתחלפים עם התמונות. רק השם הקטן והתמונה מתחלפים, ולכן המסר נקרא פעם אחת ולא בורח באמצע קריאה. הפס של השקופית הנוכחית הוא השעון: אנימציית CSS של 6 שניות, ו-animationend שלה מביא את הבאה, כך שעצירה (animation-play-state) עוצרת גם את הזמן וגם את הזום האיטי בבת אחת, בלי טיימר מקביל שיברח. נגיעה בשם עוברת אליו. בהפחתת תנועה אין החלפה אוטומטית ואין זום: השמות עדיין מחליפים תמונה, וכפתור העצירה יורד כי אין מה לעצור. שכבת הקריאות אלכסונית מהפינה של הטקסט (התורה), וההיפוך שלה ל-LTR כתוב. רק התמונה הראשונה נשלפת בעדיפות; השתיים שמחכות נטענות רגיל ולא ב-lazy, כי הן כבר בתוך המסך ו-lazy רק מסכן מעבר למסגרת ריקה." + NOTE_TAIL
},
{
  id:"h16", cat:"hero", name:"הירו עם טופס לידים בתוך ההירו", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"טקסט בצד אחד וצילום בכרטיס מעוגל בצד השני. במקום כפתור יש שורת טופס קצרה, שם וטלפון ושליחה, שחוצה את הרווח ונכנסת לתוך הצילום. השליחה מחליפה את השורה בתודה, בלי לעזוב את העמוד.",
  when:"עסק שהפנייה הראשונה אליו היא שיחת טלפון: קליניקה, עורך דין, יועץ משכנתאות, שיפוצים, קורסים. עובד כששני שדות מספיקים. לא כשצריך לבחור שירות, תאריך או כתובת לפני שמדברים; אז h17 או h7.",
  libs:[],
  css:`${FRAME_CSS}
.h16h{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;min-height:min(84vh,760px);padding:88px 28px 28px;background:var(--bg)}
.h16-txt{position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:24px 40px}
.h16h h3{margin:0;max-width:14ch;font-size:clamp(34px,min(4.4vw,7.8vh),70px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h16h .hlead{max-width:42ch}
.h16-box{align-self:stretch;display:flex;flex-direction:column}
/* the bar runs across the gap and 64px into the photo: one object, not a form beside a picture. A surface and a shadow, no border */
.h16-form{display:flex;align-items:stretch;gap:8px;width:calc(100% + 112px);padding:8px;border-radius:18px;background:var(--card);
  box-shadow:0 18px 48px -18px color-mix(in srgb,var(--ink) 35%,transparent)}
.h16-form[hidden]{display:none}
.h16-f{flex:1;display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0;padding:8px 16px;border-radius:12px;cursor:text;transition:background .2s ${E}}
.h16-f span{font-size:12px;font-weight:600;color:var(--muted)}
.h16-f input{width:100%;min-width:0;border:0;padding:0;background:none;color:var(--ink);font:inherit;font-size:16px;font-weight:600;outline:none}
.h16-f input::placeholder{color:var(--muted);font-weight:500;opacity:1}
.h16-f input[type="tel"]{text-align:right}
[dir="ltr"] .h16-f input[type="tel"]{text-align:left}
.h16-f:focus-within{background:color-mix(in srgb,var(--ink) 6%,transparent)}
.h16-f[data-bad]{background:color-mix(in srgb,var(--accent) 16%,transparent)}
.h16-form .hbtn{flex:none;border:0;font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.h16-form .hbtn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.h16-done{margin:0;width:calc(100% + 112px);padding:20px 24px;border-radius:18px;background:var(--card);font-size:17px;font-weight:600;outline:none;
  box-shadow:0 18px 48px -18px color-mix(in srgb,var(--ink) 35%,transparent)}
.h16-err{margin:0;font-size:14px;font-weight:600}
.h16-err:not(:empty){margin-top:12px}
.h16-vis{position:relative;border-radius:20px;overflow:hidden;background:var(--ink);clip-path:inset(0 round 20px);transition:clip-path .9s ${E}}
.h16-vis>img{width:100%;height:100%;object-fit:cover;object-position:40% 45%;display:block;transition:transform 1s ${E}}
.open-anim .h16-vis{clip-path:inset(5% 8% round 20px);animation:h16v-fs 0s 2.5s forwards}
.open-anim .h16-vis>img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in .h16-vis{clip-path:inset(0 round 20px);transition-delay:var(--t0,0s)}
.is-in .h16-vis>img{transform:none;transition-delay:var(--t0,0s)}
.rv-on .h16-vis,.rv-on .h16-vis>img{animation:none}
@keyframes h16v-fs{to{clip-path:inset(0 round 20px)}}
/* a fact on the photo, not a decoration: the next free slot */
.h16-chip{position:absolute;inset-block-end:20px;inset-inline-end:20px;display:flex;flex-direction:column;gap:2px;margin:0;padding:12px 16px;border-radius:14px;background:var(--bg);color:var(--ink);font-size:13px;
  box-shadow:0 12px 32px -12px color-mix(in srgb,var(--ink) 40%,transparent)}
.h16-chip b{font-size:16px}
@media (prefers-reduced-motion:reduce){.h16-vis,.h16-vis>img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the photo becomes a low band on top, the two fields sit side by side over a full-width button */
@media (max-width:860px){.h16h{grid-template-columns:1fr;gap:20px;min-height:0;padding:72px 20px 28px}
  .h16-vis{order:-1;height:clamp(150px,22vh,210px)}
  .h16-txt{padding-block:0;gap:16px}
  .h16h h3{font-size:clamp(28px,7.4vw,38px)}
  .h16-form,.h16-done{width:100%}
  .h16-form{flex-wrap:wrap}
  .h16-f{flex:1 1 40%}
  .h16-form .hbtn{flex:1 1 100%}
  .h16-chip{inset-block-end:12px;inset-inline-end:12px;padding:8px 12px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h16h" id="h16">
    <div class="h16-txt">
      <span class="hkick rv">פיזיותרפיה ושיקום, רמת גן</span>
      <h3 class="rv">חוזרים לזוז בלי כאב, ובלי לחכות חודשיים לתור</h3>
      <p class="hlead rv">טיפול אישי של 45 דקות ותוכנית תרגילים לבית. משאירים שם וטלפון, ואנחנו מתקשרים לקבוע.</p>
      <div class="h16-box rv">
        <form class="h16-form" novalidate aria-label="השארת פרטים לתיאום תור">
          <label class="h16-f"><span>שם</span><input name="name" autocomplete="name" placeholder="השם שלך" enterkeyhint="next" aria-describedby="h16-err"></label>
          <label class="h16-f"><span>טלפון</span><input name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="050-0000000" dir="ltr" enterkeyhint="send" aria-describedby="h16-err"></label>
          <button class="hbtn" type="submit">קבעו לי תור</button>
        </form>
        <div aria-live="polite"><p class="h16-done" tabindex="-1" hidden></p></div>
        <p class="h16-err" id="h16-err" role="alert"></p>
      </div>
      <p class="hmicro rv"><span>מחזירים טלפון באותו יום</span><span>בלי התחייבות</span></p>
    </div>
    <div class="h16-vis">
      ${PIC("real/s09/hero-corridor.webp", "פיזיותרפיסט וילדה עושים כיף במסדרון הקליניקה", { pri: true })}
      <p class="h16-chip rv"><span>תור פנוי השבוע</span><b>שלישי, 08:30</b></p>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h16"); enter(root);
  var form=root.querySelector(".h16-form"), done=root.querySelector(".h16-done"), err=root.querySelector(".h16-err");
  var nm=form.querySelector('[name="name"]'), ph=form.querySelector('[name="tel"]');
  function mark(f,bad){f.parentNode.toggleAttribute("data-bad",bad); f.setAttribute("aria-invalid",String(bad));}
  [nm,ph].forEach(function(f){f.addEventListener("input",function(){if(f.getAttribute("aria-invalid")==="true")mark(f,false);});});
  // checked on send only, never while typing
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var n=nm.value.trim(), t=ph.value.replace(/\\D/g,""), okN=n.length>1, okT=/^0\\d{8,9}$/.test(t);
    mark(nm,!okN); mark(ph,!okT);
    if(!okN||!okT){err.textContent=okN?"מספר הטלפון לא נראה שלם. כדאי לבדוק את הקידומת":"חסר שם, כדי שנדע את מי לבקש בטלפון"; (okN?ph:nm).focus(); return;}
    err.textContent="";
    // in a project: send to the CRM first, and show the thanks only after it answered
    form.hidden=true; done.hidden=false; done.textContent="תודה, "+n+". נחזור אליך היום, עד 18:00."; done.focus();
  });
})();`,
  note:"שורת הטופס היא ההבדל בין הירו שמבקש ללחוץ להירו שכבר מקבל את הפנייה: שני שדות בלבד, כי כל שדה נוסף מוריד השארת פרטים, ואת השאר שואלים בטלפון. היא רחבה מהעמודה שלה ב-112 פיקסלים, חוצה את הרווח ונכנסת לתמונה, וזה מה שמחבר את שני החצאים לאובייקט אחד; משטח וצל, בלי מסגרת. לכל שדה תווית גלויה בתוכו (לא placeholder במקום תווית), והטלפון הוא type=tel עם autocomplete, כך שהמכשיר ממלא אותו בנגיעה, והוא נכתב משמאל לימין. הבדיקה רצה רק בשליחה ולא בזמן ההקלדה: השגיאה נכתבת במילים ב-role=alert, השדה מסומן ב-aria-invalid והפוקוס חוזר אליו. אחרי שליחה השורה מתחלפת בתודה עם השם והפוקוס עובר אליה; בפרויקט התודה מוצגת רק אחרי שה-CRM ענה. הצ׳יפ על התמונה הוא עובדה (התור הפנוי הבא), לא קישוט. בטלפון התמונה הופכת לפס נמוך למעלה, והשדות יושבים זה לצד זה מעל כפתור ברוחב מלא." + NOTE_TAIL
},
{
  id:"h17", cat:"hero", name:"הירו צילום מלא עם שורת הזמנה", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"צילום אווירה במסך מלא, כותרת בפינה התחתונה, ומתחתיה שורת הזמנה על משטח בהיר: תאריך הגעה, מספר לילות, הרכב אורחים וכפתור בדיקת זמינות. התשובה מופיעה מתחת לשורה, בלי לעבור עמוד.",
  when:"עסק שמוכר זמן: צימרים ובקתות, מלון, השכרת רכב, מתחם אירועים, הזמנת שולחן, סדנאות עם תאריכים. השורה מקצרת את הדרך למנוע ההזמנה. לא לעסק בלי תאריכים; אז h3 או h16.",
  libs:[],
  css:`${FRAME_CSS}
.h17h{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:32px;min-height:min(86vh,780px);padding:112px 28px 28px;background:var(--ink);color:var(--bg);overflow:hidden;isolation:isolate}
.h17-bg{position:absolute;inset:0;z-index:-2}
.h17-bg img{width:100%;height:100%;object-fit:cover;object-position:62% 50%;display:block;transition:transform 1.1s ${E}}
.open-anim .h17-bg img{transform:scale(1.06);animation:rv-fs 0s 2.5s forwards}
.is-in .h17-bg img{transform:none;transition-delay:var(--t0,0s)}
.rv-on .h17-bg img{animation:none}
/* diagonal scrim from the corner of the text (heroes.md); the bar carries its own surface, so it needs none */
.h17-scrim{position:absolute;inset:0;z-index:-1;background:linear-gradient(to top left,color-mix(in srgb,var(--ink) 80%,transparent) 0%,color-mix(in srgb,var(--ink) 38%,transparent) 48%,transparent 78%)}
[dir="ltr"] .h17-scrim{background:linear-gradient(to top right,color-mix(in srgb,var(--ink) 80%,transparent) 0%,color-mix(in srgb,var(--ink) 38%,transparent) 48%,transparent 78%)}
.h17-txt{display:flex;flex-direction:column;align-items:flex-start;gap:20px;max-width:640px}
.h17h h3{margin:0;font-size:clamp(36px,min(4.6vw,7.8vh),76px);line-height:1.03;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h17h .hlead{max-width:44ch;opacity:.9}
.h17-book{display:flex;flex-direction:column;gap:12px;max-width:940px}
.h17-bar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) auto;gap:8px;padding:8px;border-radius:18px;background:var(--bg);color:var(--ink);
  box-shadow:0 24px 60px -24px color-mix(in srgb,var(--ink) 70%,transparent)}
.h17-f{display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0;padding:8px 16px;border-radius:12px;cursor:pointer;transition:background .2s ${E}}
.h17-f span{font-size:12px;font-weight:600;color:var(--muted)}
.h17-f input,.h17-f select{width:auto;max-width:100%;min-width:0;height:24px;border:0;padding:0;background:none;color:var(--ink);font:inherit;font-size:16px;font-weight:600;outline:none;cursor:pointer}
@media (hover:hover) and (pointer:fine){.h17-f:hover{background:color-mix(in srgb,var(--ink) 4%,transparent)}}
.h17-f:focus-within{background:color-mix(in srgb,var(--ink) 7%,transparent)}
.h17-bar .hbtn{border:0;font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.h17-bar .hbtn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.h17-res{margin:0;min-height:1.5em;font-size:15px;font-weight:600}
@media (prefers-reduced-motion:reduce){.h17-bg img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the date takes a full row, nights and guests share one, the button closes */
@media (max-width:860px){.h17h{padding:96px 20px 20px;gap:24px;min-height:min(92vh,800px)}
  .h17h h3{font-size:clamp(30px,8vw,40px)}
  .h17-bar{grid-template-columns:1fr 1fr}
  .h17-f{padding:8px 12px}
  .h17-f:first-child,.h17-bar .hbtn{grid-column:1 / -1}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h17h" id="h17">
    <div class="h17-bg">${PIC("real/s13/hero.webp", "קרני שמש נכנסות מחלון אל חדר חשוך", { pri: true })}</div>
    <span class="h17-scrim"></span>
    <div class="h17-txt">
      <span class="hkick rv">בקתות עץ בגליל העליון</span>
      <h3 class="rv">שלושה ימים בלי רעש, עם אח בוערת וחלון אל היער</h3>
      <p class="hlead rv">שש בקתות זוגיות, ג׳קוזי במרפסת, וארוחת בוקר שמגיעה עד הדלת.</p>
    </div>
    <div class="h17-book rv">
      <form class="h17-bar" novalidate aria-label="בדיקת זמינות">
        <label class="h17-f"><span>תאריך הגעה</span><input type="date" name="from"></label>
        <label class="h17-f"><span>לילות</span><select name="nights"><option value="2">שניים</option><option value="3" selected>שלושה</option><option value="4">ארבעה</option><option value="7">שבוע</option></select></label>
        <label class="h17-f"><span>אורחים</span><select name="guests"><option>זוג</option><option>זוג וילד</option><option>משפחה</option></select></label>
        <button class="hbtn" type="submit">בדיקת זמינות</button>
      </form>
      <p class="h17-res" aria-live="polite"></p>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h17"); enter(root);
  var form=root.querySelector(".h17-bar"), res=root.querySelector(".h17-res"), d=form.querySelector('[name="from"]'), n=form.querySelector('[name="nights"]');
  // the field label already says nights, so the options stay one word; the answer spells it out
  var say={2:"שני לילות",3:"שלושה לילות",4:"ארבעה לילות",7:"שבוע"};
  // no arrival in the past: the earliest date is today, in local time
  var now=new Date(); now.setMinutes(now.getMinutes()-now.getTimezoneOffset()); d.min=now.toISOString().slice(0,10);
  form.addEventListener("submit",function(e){
    e.preventDefault();
    if(!d.value){res.textContent="בחרו תאריך הגעה, ונבדוק מה פנוי."; d.focus(); return;}
    var p=d.value.split("-");
    // in a project: open the booking engine with the three values in its address, instead of this line
    res.textContent="יש בקתה פנויה מ-"+(+p[2])+"."+(+p[1])+", ל"+say[n.value]+". ממשיכים להזמנה במסך הבא.";
  });
})();`,
  note:"שורת ההזמנה היא הסיבה להירו הזה: מי שמחפש צימר שואל קודם \"פנוי בתאריך שלי?\", והשורה עונה על זה במסך הראשון במקום שלושה קליקים פנימה. שלושה שדות ולא יותר (מתי, כמה זמן, מי), כולם רכיבים של הדפדפן עצמו (date ו-select), ולכן בטלפון נפתח בורר התאריכים של המכשיר ואין ספריית לוח שנה; התאריך המוקדם ביותר הוא היום. התשובה נכתבת בשורה מתחת ב-aria-live ולא בחלון קופץ, ובפרויקט הכפתור פותח את מנוע ההזמנות עם שלושת הערכים בכתובת. השורה יושבת על משטח בהיר משלה עם צל, כך שהיא קריאה על כל צילום, ושכבת הקריאות האלכסונית משרתת רק את הכותרת. הצילום נכנס בזום איטי מ-1.06. בטלפון השורה נשברת לשתי עמודות: תאריך ברוחב מלא, לילות ואורחים זה לצד זה, והכפתור מתחת." + NOTE_TAIL
},
{
  id:"h18", cat:"hero", name:"הירו אפליקציה: טלפון שעולה מתחת לכותרת", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת וכפתורי הורדה במרכז, ומתחתם טלפון שבנוי כולו ב-CSS עם מסך של האפליקציה, שעולה מתחתית ההירו. שני כרטיסים קטנים צפים לצדו: תזכורת ודירוג.",
  when:"עסק שיש לו אפליקציה או מערכת שהלקוח משתמש בה בטלפון: סטודיו עם הזמנת שיעורים, מרפאה, מועדון לקוחות, משלוחים, מערכת SaaS. המסך בנוי בקוד, ולכן מחליפים בו מילים ולא צילום מסך. לא כשאין מוצר דיגיטלי אמיתי להראות.",
  libs:[],
  css:`${FRAME_CSS}
.h18h{position:relative;display:flex;flex-direction:column;align-items:center;gap:24px;min-height:min(88vh,800px);padding:96px 28px 0;text-align:center;overflow:hidden;
  background:radial-gradient(70% 60% at 50% 100%,color-mix(in srgb,var(--accent) 16%,var(--bg)),var(--bg))}
.h18h h3{margin:0;max-width:16ch;font-size:clamp(34px,min(4.4vw,7.8vh),70px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h18h .hlead{max-width:46ch}
.h18h .hcta{justify-content:center}
.h18-stage{--pw:clamp(240px,21vw,290px);position:relative;flex:1;width:100%;max-width:900px;min-height:clamp(220px,32vh,340px);margin-top:8px}
/* the phone: a body with a screen inside, no outline. It is taller than the stage on purpose, so the frame edge cuts it */
.h18-ph{position:absolute;top:0;inset-inline:0;margin-inline:auto;width:var(--pw);aspect-ratio:9/19;padding:10px;border-radius:44px;background:var(--ink);
  box-shadow:0 40px 80px -30px color-mix(in srgb,var(--ink) 55%,transparent);transition:transform 1s ${E},opacity .6s ${E}}
.h18-isl{position:absolute;top:20px;inset-inline:0;z-index:1;margin-inline:auto;width:84px;height:24px;border-radius:999px;background:var(--ink)}
.h18-scr{height:100%;display:flex;flex-direction:column;gap:12px;padding:48px 16px 16px;border-radius:34px;background:var(--bg);color:var(--ink);text-align:start;overflow:hidden}
.h18-hi{margin:0;font-size:18px;font-weight:700}
.h18-sub{margin:0;margin-top:-8px;font-size:13px;color:var(--muted)}
.h18-next{display:grid;gap:4px;padding:16px;border-radius:20px;background:var(--accent);color:var(--accent-ink);font-size:13px}
.h18-next b{font-size:17px}
.h18-go{justify-self:start;margin-top:8px;padding:8px 16px;border-radius:999px;background:var(--accent-ink);color:var(--accent);font-weight:700}
.h18-lh{margin:0;margin-top:4px;font-size:13px;font-weight:700}
.h18-list{display:grid;gap:8px;margin:0;padding:0;list-style:none;font-size:13px}
.h18-list li{display:flex;justify-content:space-between;gap:8px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--ink) 5%,var(--bg))}
.h18-list span{color:var(--muted)}
/* the floating cards overlap the phone edge by 32px, measured from the phone width, so they follow it at every size */
.h18-card{position:absolute;display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:16px;background:var(--card);color:var(--ink);text-align:start;font-size:14px;line-height:1.35;
  box-shadow:0 20px 50px -20px color-mix(in srgb,var(--ink) 40%,transparent);transition:transform .6s ${E},opacity .6s ${E}}
.h18-card b{display:block;font-size:15px}
.h18-c1{top:14%;inset-inline-end:calc(50% + var(--pw) / 2 - 32px)}
.h18-c2{top:44%;inset-inline-start:calc(50% + var(--pw) / 2 - 32px)}
.h18-ico{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--accent);color:var(--accent-ink)}
.h18-ico svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.h18-big{font-size:28px;font-weight:800;line-height:1}
/* ink, not accent: a yellow accent would make the stars vanish on a light card */
.h18-stars{display:block;color:var(--ink);letter-spacing:2px;font-size:13px}
.open-anim .h18-ph{opacity:0;transform:translateY(24%);animation:rv-fs 0s 2.5s forwards}
.open-anim .h18-card{opacity:0;transform:translateY(16px);animation:rv-fs 0s 2.5s forwards}
.is-in .h18-ph{opacity:1;transform:none;transition-delay:calc(var(--t0,0s) + .15s)}
.is-in .h18-card{opacity:1;transform:none;transition-delay:calc(var(--t0,0s) + .5s + var(--i) * 80ms)}
.rv-on .h18-ph,.rv-on .h18-card{animation:none}
@media (prefers-reduced-motion:reduce){.h18-ph,.h18-card{transition-duration:.01ms!important;transition-delay:0s!important}}
/* tablet keeps one card, a phone none: there is no room beside the phone */
@media (max-width:860px){.h18h{padding:88px 20px 0;gap:20px;min-height:min(92vh,800px)}.h18h h3{font-size:clamp(30px,8vw,40px)}.h18-stage{--pw:230px;min-height:300px}.h18-c2{display:none}}
@media (max-width:600px){.h18-c1{display:none}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h18h" id="h18">
    <span class="hkick rv">סטודיו פילאטיס ויוגה, שלושה סניפים</span>
    <h3 class="rv">כל השיעורים, המנוי והתורים, בכיס</h3>
    <p class="hlead rv">קובעים שיעור בשתי נגיעות, מקבלים תזכורת שעה לפני, ונכנסים לסטודיו עם צ׳ק-אין מהטלפון.</p>
    <div class="hcta rv"><a class="hbtn" href="#h18">הורדה לאייפון</a><a class="hbtn ghost" href="#h18">הורדה לאנדרואיד</a></div>
    <div class="h18-stage">
      <div class="h18-ph" role="img" aria-label="מסך הבית של האפליקציה: השיעור הבא עם כפתור צ׳ק-אין, ורשימת השיעורים של השבוע">
        <span class="h18-isl"></span>
        <div class="h18-scr">
          <p class="h18-hi">בוקר טוב, נועה</p>
          <p class="h18-sub">יש לך שיעור אחד היום</p>
          <div class="h18-next"><span>השיעור הבא</span><b>פילאטיס מכשירים</b><span>היום ב-18:30, עם מאיה</span><span class="h18-go">צ׳ק-אין</span></div>
          <p class="h18-lh">השבוע</p>
          <ul class="h18-list"><li><b>יוגה זורמת</b><span>רביעי 07:00</span></li><li><b>פילאטיס מזרן</b><span>חמישי 19:00</span></li><li><b>מתיחות עמוקות</b><span>שישי 09:30</span></li></ul>
        </div>
      </div>
      <div class="h18-card h18-c1" style="--i:0"><span class="h18-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/></svg></span><span><b>תזכורת</b>הפילאטיס מתחיל בעוד שעה</span></div>
      <div class="h18-card h18-c2" style="--i:1"><span class="h18-big">4.9</span><span><span class="h18-stars" aria-hidden="true">★★★★★</span>מ-1,200 דירוגים בחנות</span></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h18"));`,
  note:"הטלפון בנוי כולו ב-CSS (גוף, אי עליון ומסך) ולא כצילום מסך, ולכן הוא חד בכל רזולוציה, מתלבש על צבעי העור לבד, ובפרויקט מחליפים בו מילים ולא קובץ. הוא גבוה מהבמה בכוונה, וקצה ההירו חותך אותו: רואים את החלק העליון של המסך (ברכה, השיעור הבא), ובזה ההסבר נגמר. הוא עולה מ-24% מתחת למקום שלו, והכרטיסים הצפים נכנסים אחריו; המיקום שלהם מחושב מרוחב הטלפון (--pw), כך שהם חופפים לקצה שלו ב-32 פיקסלים בכל גודל מסך. מבחינת קורא מסך הטלפון הוא תמונה אחת עם תיאור (role=img), והכרטיסים טקסט רגיל. כפתורי ההורדה הם טקסט בלי לוגואים של החנויות; בפרויקט מחליפים אותם בתגיות הרשמיות של אפל וגוגל, לפי ההנחיות שלהן. בטאבלט נשאר כרטיס אחד, ובטלפון אף אחד, כי אין להם מקום לצד הטלפון." + NOTE_TAIL
},
{
  id:"h19", cat:"hero", name:"הירו לפני ואחרי עם ידית גרירה", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"טקסט בצד אחד, ובצד השני אותו חדר פעמיים, לפני ואחרי, עם ידית שגוררים לרוחב. אחרי הכניסה הידית זזה פעם אחת לבד כדי להראות שאפשר, ומשם היא של המבקר: בעכבר, במגע ובמקלדת.",
  when:"עסק שהתוצאה שלו נראית: תאורה, שיפוצים, ניקיון, צביעה, גינון, אסתטיקה, עריכת תמונות. עובד רק עם זוג צילומים מאותה זווית בדיוק. לא כשאין צילום \"לפני\" אמיתי; אז h11.",
  libs:[],
  css:`${FRAME_CSS}
.h19h{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;min-height:min(84vh,760px);padding:88px 28px 28px;background:color-mix(in srgb,var(--ink) 4%,var(--bg))}
.h19-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:24px 40px}
.h19h h3{margin:0;max-width:12ch;font-size:clamp(34px,min(4vw,7.8vh),66px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h19h .hlead{max-width:40ch}
/* the comparison is always left to right, with "before" on the right, the side a Hebrew reader meets first; --p is the handle */
.h19-cmp{--p:50%;position:relative;border-radius:20px;overflow:hidden;background:var(--ink);clip-path:inset(0 round 20px);transition:clip-path .9s ${E};
  cursor:ew-resize;touch-action:pan-y;-webkit-user-select:none;user-select:none}
.h19-cmp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:30% 50%;display:block;pointer-events:none;-webkit-user-drag:none}
.h19-bef{clip-path:inset(0 0 0 var(--p));filter:grayscale(.7) brightness(.45) contrast(.9)}
.h19-lab{position:absolute;top:16px;z-index:1;padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700;background:color-mix(in srgb,var(--ink) 55%,transparent);color:var(--bg);
  -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);pointer-events:none;transition:opacity .3s ${E}}
.h19-lab.b{right:16px}
.h19-lab.a{left:16px}
/* a label leaves when its side closes, so "before" never sits on the after picture */
.h19-cmp.no-b .h19-lab.b,.h19-cmp.no-a .h19-lab.a{opacity:0}
/* the handle layer is as wide as the picture, so translateX(--p) puts the line exactly under the pointer, without moving left */
.h19-hdl{position:absolute;inset:0;z-index:1;transform:translateX(var(--p));pointer-events:none}
.h19-hdl::before{content:"";position:absolute;top:0;bottom:0;left:0;width:3px;background:var(--bg);transform:translateX(-50%)}
.h19-knob{position:absolute;top:50%;left:0;width:52px;height:52px;border-radius:999px;display:grid;place-items:center;background:var(--bg);color:var(--ink);transform:translate(-50%,-50%);
  box-shadow:0 10px 30px -8px color-mix(in srgb,var(--ink) 50%,transparent);transition:scale .2s ${E}}
.h19-cmp.drag .h19-knob{scale:1.08}
.h19-knob svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
/* the range is for the keyboard and the screen reader only; the pointer is read on the picture, so the line follows it to the pixel */
.h19-rng{position:absolute;inset:0;z-index:2;width:100%;height:100%;margin:0;opacity:0;pointer-events:none}
.h19-rng:focus-visible+.h19-hdl .h19-knob{outline:2px solid var(--accent);outline-offset:3px}
.open-anim .h19-cmp{clip-path:inset(5% 8% round 20px);animation:h19-fs 0s 2.5s forwards}
.is-in .h19-cmp{clip-path:inset(0 round 20px);transition-delay:calc(var(--t0,0s) + .1s)}
.rv-on .h19-cmp{animation:none}
@keyframes h19-fs{to{clip-path:inset(0 round 20px)}}
@media (prefers-reduced-motion:reduce){.h19-cmp{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h19h{grid-template-columns:1fr;gap:20px;min-height:0;padding:88px 20px 24px}.h19-txt{padding-block:0;gap:16px}
  .h19h h3{font-size:clamp(28px,7.6vw,38px)}.h19-cmp{height:clamp(240px,38vh,340px)}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h19h" id="h19">
    <div class="h19-txt">
      <span class="hkick rv">תכנון תאורה לבתים</span>
      <h3 class="rv">אותו חדר. רק עם אור שתוכנן נכון</h3>
      <p class="hlead rv">תאורה בשכבות, עמעום לפי שעות היום, וגופים שנבחרו לחדר, במקום עוד ספוט בתקרה.</p>
      <div class="hcta rv"><a class="hbtn" href="#h19">לתיאום פגישת תכנון</a><a class="hbtn ghost" href="#h19">פרויקטים</a></div>
    </div>
    <div class="h19-cmp" dir="ltr">
      ${PIC("real/s13/room.webp", "הסלון אחרי תכנון התאורה: מנורת קריאה ומדפים מוארים", { pri: true })}
      ${PIC("real/s13/room.webp", "הסלון לפני: אור שטוח וחשוך", { cls: "h19-bef" })}
      <span class="h19-lab a" aria-hidden="true">אחרי</span><span class="h19-lab b" aria-hidden="true">לפני</span>
      <input class="h19-rng" type="range" min="0" max="100" value="50" aria-label="השוואה בין לפני לאחרי">
      <span class="h19-hdl"><span class="h19-knob"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></span></span>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h19"); enter(root);
  var cmp=root.querySelector(".h19-cmp"), rng=root.querySelector(".h19-rng"), touched=false;
  var cur=50, anim=0, down=null, moved=false, x0=0, y0=0, calm=!matchMedia("(prefers-reduced-motion:no-preference)").matches;
  function set(v){cur=Math.max(0,Math.min(100,v)); cmp.style.setProperty("--p",cur.toFixed(2)+"%"); cmp.classList.toggle("no-b",cur>86); cmp.classList.toggle("no-a",cur<14);}
  function say(){rng.value=Math.round(cur); rng.setAttribute("aria-valuetext",Math.round(cur)+" אחוז מהתמונה אחרי");}
  function at(e){var b=cmp.getBoundingClientRect(); return (e.clientX-b.left)/b.width*100;}
  // a click far from the line glides there in a fifth of a second instead of jumping
  function glide(to){
    cancelAnimationFrame(anim);
    if(calm){set(to); say(); return;}
    var from=cur, t0=0;
    anim=requestAnimationFrame(function f(now){
      if(!t0)t0=now; var k=Math.min((now-t0)/220,1);
      set(from+(to-from)*(1-Math.pow(1-k,3)));
      if(k<1)anim=requestAnimationFrame(f); else say();
    });
  }
  // a mouse moves the line on press; a finger only when it moves sideways or taps, so scrolling the page never moves it
  cmp.addEventListener("pointerdown",function(e){
    if(e.button>0)return; touched=true; down=e.pointerId; moved=e.pointerType==="mouse"; x0=e.clientX; y0=e.clientY;
    cmp.setPointerCapture(e.pointerId);
    if(moved){e.preventDefault(); cmp.classList.add("drag"); glide(at(e));}
  });
  cmp.addEventListener("pointermove",function(e){
    if(e.pointerId!==down)return;
    if(!moved){var dx=Math.abs(e.clientX-x0); if(dx<8||dx<Math.abs(e.clientY-y0))return; moved=true; cmp.classList.add("drag");}
    cancelAnimationFrame(anim); set(at(e));
  });
  function end(e){
    if(e.pointerId!==down)return; down=null; cmp.classList.remove("drag");
    if(e.type==="pointerup"&&!moved)glide(at(e)); else say();
  }
  cmp.addEventListener("pointerup",end); cmp.addEventListener("pointercancel",end);
  // the keyboard: arrows move five percent, Home and End go to the edges (native)
  rng.addEventListener("keydown",function(e){
    var d={ArrowRight:5,ArrowUp:5,ArrowLeft:-5,ArrowDown:-5}[e.key]; if(!d)return;
    e.preventDefault(); touched=true; cancelAnimationFrame(anim); set(Math.round(cur)+d); say();
  });
  rng.addEventListener("input",function(){touched=true; cancelAnimationFrame(anim); set(+rng.value); say();});
  say();
  // one hint, once: after the entrance the handle swings right and back, only when motion is allowed and nobody touched it
  if(calm)return;
  inView(root,function(){setTimeout(function(){
    var t0=0;
    requestAnimationFrame(function f(now){
      if(touched)return; if(!t0)t0=now;
      var k=Math.min((now-t0)/1200,1);
      set(k<1?50+16*Math.sin(k*Math.PI*2)*(1-k/2):50);
      if(k<1)requestAnimationFrame(f);
    });
  },1000);});
})();`,
  note:"זה ההירו שמראה במקום לספר: אותו חדר בשני מצבים, והמבקר עושה את ההשוואה בעצמו. הגרירה נקראת מהמצביע על התמונה עצמה (pointer events עם setPointerCapture), ולכן הקו נמצא בדיוק מתחת לעכבר או לאצבע, בלי מדרגות של אחוז שלם ובלי ההיסט של אגודל ה-range בקצוות, וגם באייפון, שבו range שקוף זז רק כשפוגעים באגודל הבלתי נראה. עכבר מזיז את הקו כבר בלחיצה; אצבע מזיזה אותו רק כשהיא זזה לרוחב יותר מ-8 פיקסלים או מקישה, כך שגלילה של העמוד לא מזיזה את הקו (touch-action:pan-y). לחיצה רחוקה מהקו גולשת אליו ב-220ms במקום לקפוץ. input מסוג range שקוף נשאר בשביל המקלדת וקורא המסך (חיצים זזים 5%, Home ו-End לקצוות), עם pointer-events:none, והפוקוס שלו מצויר על העיגול. הקו זז ב-transform על שכבה ברוחב התמונה, לא ב-left, והתווית של צד שנסגר נמוגה, כך ש\"לפני\" לא נשארת על תמונת ה\"אחרי\". ההשוואה תמיד משמאל לימין, עם \"לפני\" בצד ימין, הצד שקורא עברית פוגש ראשון, והשכבה העליונה נחתכת ב-clip-path לפי --p, בלי לשנות רוחב. אחרי הכניסה הידית זזה פעם אחת לבד, ימינה וחזרה, וזה במקום הוראה כתובה; היא לא זזה אם המבקר כבר נגע בה, ולא בהפחתת תנועה. הקו של הידית הוא חלק מהפקד, לא קישוט. בדמו ה\"לפני\" הוא אותו צילום, מוחשך ודהוי ב-filter; בפרויקט שמים שני צילומים אמיתיים מאותה זווית, אחרת ההשוואה נראית מזויפת." + NOTE_TAIL
},
{
  id:"h20", cat:"hero", name:"הירו שם ענק על צילום מלא", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"צילום במסך מלא, משפט פתיחה וכפתור בחלק העליון, ובתחתית שם העסק בענק, כמעט מקצה לקצה, כמו שלט. האותיות עולות אחת אחרי השנייה.",
  when:"עסק שהשם שלו הוא המותג: מסעדה, בר, מלון בוטיק, גלריה, מותג אופנה, אמן. עובד עם שם קצר, עד שבע אותיות, ועם צילום שהתחתית שלו כהה. לא לשם ארוך או לשם שלא אומר כלום למי שלא מכיר; אז h3.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h20h{--disp:${DISP};position:relative;display:flex;flex-direction:column;justify-content:space-between;gap:40px;min-height:min(86vh,780px);padding:112px 28px 0;background:var(--ink);color:var(--bg);overflow:hidden;isolation:isolate}
.h20-bg{position:absolute;inset:0;z-index:-2}
.h20-bg img{width:100%;height:100%;object-fit:cover;object-position:50% 45%;display:block;transition:transform 1.2s ${E}}
.open-anim .h20-bg img{transform:scale(1.06);animation:rv-fs 0s 2.5s forwards}
.is-in .h20-bg img{transform:none;transition-delay:var(--t0,0s)}
.rv-on .h20-bg img{animation:none}
/* two readable zones: the sentence (diagonal from its corner) and the name (radial from the bottom centre, it is centred; heroes.md) */
.h20-scrim{position:absolute;inset:0;z-index:-1;background:radial-gradient(120% 70% at 50% 100%,color-mix(in srgb,var(--ink) 70%,transparent) 0%,color-mix(in srgb,var(--ink) 30%,transparent) 50%,transparent 80%),
  linear-gradient(to bottom left,color-mix(in srgb,var(--ink) 60%,transparent) 0%,transparent 45%)}
[dir="ltr"] .h20-scrim{background:radial-gradient(120% 70% at 50% 100%,color-mix(in srgb,var(--ink) 70%,transparent) 0%,color-mix(in srgb,var(--ink) 30%,transparent) 50%,transparent 80%),
  linear-gradient(to bottom right,color-mix(in srgb,var(--ink) 60%,transparent) 0%,transparent 45%)}
.h20-row{display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
.h20-txt{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:560px}
.h20h h3{margin:0;font-size:clamp(28px,min(3.2vw,7.8vh),52px);line-height:1.1;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h20-side{display:flex;flex-direction:column;align-items:flex-end;gap:16px}
.h20-side .hmicro{opacity:.85;justify-content:flex-end}
/* the name is a logotype, not the heading: the h3 above is the sentence, and the 8vh rule is about it */
.h20-name{position:relative;margin:0;margin-bottom:-.14em;font-family:var(--disp);font-weight:400;font-size:min(23vw,40vh);line-height:.9;text-align:center;white-space:nowrap}
.h20-l{display:inline-block;transition:transform .8s ${E},opacity .5s ${E}}
.open-anim .h20-l{opacity:0;transform:translateY(30%);animation:rv-fs 0s 2.5s forwards}
.is-in .h20-l{opacity:1;transform:none;transition-delay:calc(var(--t0,0s) + .15s + var(--i) * 50ms)}
.rv-on .h20-l{animation:none}
.h20-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion:reduce){.h20-bg img,.h20-l{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h20h{padding:96px 20px 0;gap:32px;min-height:min(88vh,760px)}.h20-row{flex-direction:column;align-items:flex-start;gap:24px}
  .h20-side{align-items:flex-start}.h20-side .hmicro{justify-content:flex-start}.h20h h3{font-size:clamp(28px,7.6vw,38px)}.h20-name{font-size:22vw}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h20h" id="h20">
    <div class="h20-bg">${PIC("real/s08/hero.webp", "שמיים כתומים וכחולים מעל הים אחרי השקיעה", { pri: true })}</div>
    <span class="h20-scrim"></span>
    <div class="h20-row">
      <div class="h20-txt">
        <span class="hkick rv">מסעדת דגים על החוף, בת ים</span>
        <h3 class="rv">דגים מהסירה של הבוקר, ושולחן מול השקיעה</h3>
      </div>
      <div class="h20-side">
        <p class="hmicro rv"><span>כל ערב מ-18:00</span><span>טיילת בת ים</span></p>
        <div class="hcta rv"><a class="hbtn" href="#h20">להזמנת שולחן</a><a class="hbtn ghost" href="#h20">לתפריט</a></div>
      </div>
    </div>
    <p class="h20-name"><span class="h20-sr">מול הים</span><span aria-hidden="true"><span class="h20-l" style="--i:0">מ</span><span class="h20-l" style="--i:1">ו</span><span class="h20-l" style="--i:2">ל</span> <span class="h20-l" style="--i:3">ה</span><span class="h20-l" style="--i:4">י</span><span class="h20-l" style="--i:5">ם</span></span></p>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h20"));`,
  note:"השם הוא הלוגו, לא הכותרת: המשפט למעלה הוא ה-h3 (ובפרויקט ה-h1), עליו חל כלל 8% מגובה המסך, והשם הענק הוא p עם טקסט מלא לקורא מסך, ואותיות מפוצלות שמוסתרות ממנו (aria-hidden) כדי שלא ייקרא אות אחרי אות. הגודל שלו לפי הקטן מבין הרוחב והגובה (min של vw ו-vh), כך שבמסך נמוך הוא לא דוחף את המשפט החוצה, והוא יושב על הקצה התחתון עם שוליים שליליים קטנים, כמו שלט. האותיות עולות בהפרש של 50 מילישניות. יש שתי שכבות קריאות: אלכסונית מהפינה של המשפט, ורדיאלית מהמרכז התחתון מתחת לשם, כי הוא ממורכז (התורה). עובד עם שם של עד שבע אותיות; שם ארוך יותר יוצא קטן מדי והרעיון הולך לאיבוד. פונט התצוגה (Bellefair) הוא דוגמה: בפרויקט נכנס הפונט של הלוגו." + NOTE_TAIL
},
{
  id:"h21", cat:"hero", name:"הירו גריד מגזין", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"עמוד פתיחה של מגזין: כותרת גדולה בפונט תצוגה על שבע עמודות, צילום גבוה שתופס את כל הגובה בצד השני, ובתחתית צילום קטן לצד משפט וכפתורים. הצילומים נחשפים מלמטה למעלה, והכותרת עולה ביניהם.",
  when:"עסק עם טעם ויזואלי ויותר מצילום טוב אחד: סטודיו, בית דפוס, הוצאה לאור, גלריה, מעצבת, מותג קרמיקה או אופנה, אדריכלות. לא לעסק שצריך להמיר מהר עם טופס; אז h16.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h21h{--disp:${DISP};display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:auto 1fr auto;column-gap:24px;row-gap:24px;min-height:min(84vh,760px);padding:96px 28px 28px;
  background:color-mix(in srgb,var(--accent) 4%,var(--bg))}
.h21-kick{grid-column:1 / span 7;grid-row:1;display:flex;flex-wrap:wrap;gap:8px 24px;margin:0}
.h21h h3{grid-column:1 / span 7;grid-row:2;align-self:center;margin:0;font-family:var(--disp);font-weight:400;font-size:clamp(40px,min(5vw,7.8vh),84px);line-height:1.02;letter-spacing:-.01em;text-wrap:balance}
.h21-big{grid-column:8 / -1;grid-row:1 / -1}
.h21-small{grid-column:1 / span 3;grid-row:3;aspect-ratio:4/3}
.h21-side{grid-column:4 / span 4;grid-row:3;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:20px}
.h21-side .hlead{font-size:clamp(16px,1.1vw,18px)}
/* nearly square corners: a large radius turns the spread into cards */
.h21-ph{position:relative;margin:0;border-radius:6px;overflow:hidden;background:var(--ink);clip-path:inset(0);transition:clip-path 1s ${E}}
.h21-ph img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s ${E}}
.open-anim .h21-ph{clip-path:inset(100% 0 0 0);animation:h21-fs 0s 2.5s forwards}
.open-anim .h21-ph img{transform:scale(1.12);animation:rv-fs 0s 2.5s forwards}
.is-in .h21-ph{clip-path:inset(0);transition-delay:calc(var(--t0,0s) + var(--d))}
.is-in .h21-ph img{transform:none;transition-delay:calc(var(--t0,0s) + var(--d))}
.rv-on .h21-ph,.rv-on .h21-ph img{animation:none}
@keyframes h21-fs{to{clip-path:inset(0)}}
@media (prefers-reduced-motion:reduce){.h21-ph,.h21-ph img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: one column; the small photo leaves */
@media (max-width:860px){.h21h{grid-template-columns:1fr;grid-template-rows:none;row-gap:18px;min-height:0;padding:88px 20px 28px}
  .h21h>*,.h21h h3{grid-column:1 / -1;grid-row:auto}
  .h21h h3{font-size:clamp(32px,8.6vw,44px)}
  .h21-big{height:clamp(180px,30vh,260px)}
  .h21-small{display:none}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h21h" id="h21">
    <p class="h21-kick hkick rv"><span>סטודיו לדפוס ריזו</span><span>חיפה, הדר</span><span>הזמנות פתוחות לחורף</span></p>
    <h3 class="rv">דפוס ריזו, כריכה ידנית, וכמויות קטנות שנראות כמו ספר אמן</h3>
    <figure class="h21-ph h21-big" style="--d:0s">${PIC("real/s07/hero-posters.webp", "קיר פוסטרים בשחור לבן שהודפסו בסטודיו", { pri: true })}</figure>
    <figure class="h21-ph h21-small" style="--d:.2s">${PIC("real/s07/ink-hands.webp", "ידיים עם דיו ליד מכונת הדפוס")}</figure>
    <div class="h21-side">
      <p class="hlead rv">זינים, פוסטרים והזמנות בשתיים עד ארבע שכבות צבע. אפשר להזמין גם מאה עותקים, בלי מינימום של אלף.</p>
      <div class="hcta rv"><a class="hbtn" href="#h21">לשליחת קובץ להצעה</a><a class="hbtn ghost" href="#h21">דוגמאות נייר</a></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h21"));`,
  note:"זה הגריד של עמוד פתיחה במגזין ולא שתי עמודות: 12 עמודות, הכותרת על שבע, הצילום הגבוה על חמש ולכל הגובה, ובשורה התחתונה צילום קטן על שלוש עם המשפט והכפתורים על ארבע. חוסר הסימטריה בין הגדול לקטן נותן את התחושה העריכתית, יחד עם פונט התצוגה בכותרת. הצילומים נחשפים מלמטה למעלה ב-clip-path עם זום עדין פנימה, הקטן 200 מילישניות אחרי הגדול, והכותרת עולה ביניהם. הפינות כמעט ישרות (6 פיקסלים), כי עיגול גדול הופך את העמוד לכרטיסים. בטלפון הגריד נפתח לטור אחד: כותרת, צילום רחב ונמוך, משפט וכפתורים; הצילום הקטן יורד. פונט התצוגה (Bellefair) הוא דוגמה." + NOTE_TAIL
},
{
  id:"h22", cat:"hero", name:"הירו מניפת כרטיסים", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת וכפתורים במרכז, ומתחתם חמישה כרטיסים שנפתחים כמו מניפה מתוך ערימה אחת ועולים מתחתית ההירו. בכל כרטיס צילום ושם קצר, והאמצעי הוא כרטיס טקסט בצבע המותג. ריחוף מרים כרטיס.",
  when:"עסק שיש לו כמה מוצרים או סוגים שכדאי לראות יחד: גלידרייה, קונדיטוריה, חנות קטנה, סדנאות, תפריט עונתי, מותג קוסמטיקה. לא כשיש רק מוצר אחד או פחות מארבעה צילומים; אז h3.",
  libs:[],
  css:`${FRAME_CSS}
.h22h{position:relative;display:flex;flex-direction:column;align-items:center;gap:24px;min-height:min(86vh,780px);padding:96px 28px 0;text-align:center;overflow:hidden;
  background:color-mix(in srgb,var(--accent) 7%,var(--bg))}
.h22h h3{margin:0;max-width:16ch;font-size:clamp(34px,min(4.4vw,7.8vh),70px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h22h .hlead{max-width:46ch}
.h22h .hcta{justify-content:center}
.h22-fan{--cw:clamp(150px,13vw,200px);--k:1;position:relative;flex:1;width:100%;min-height:clamp(220px,34vh,330px);margin:0;padding:0;list-style:none}
/* every card hangs from one pivot far below it; rotate and translate are separate properties, so the entrance and the hover never fight */
.h22-card{position:absolute;bottom:calc(var(--cw) * -.3);left:50%;z-index:var(--z);width:var(--cw);aspect-ratio:3/4;margin-left:calc(var(--cw) / -2);border-radius:18px;overflow:hidden;background:var(--card);
  transform-origin:50% 230%;rotate:calc((var(--r) + var(--s,0deg)) * var(--k));box-shadow:0 24px 50px -24px color-mix(in srgb,var(--ink) 45%,transparent);transition:rotate .8s ${E},translate .45s ${E},opacity .5s ${E}}
.h22-card img{width:100%;height:100%;object-fit:cover;display:block}
/* each label sits on the edge the next card does not cover: right-hand cards on their right, left-hand cards on their left */
.h22-lab{position:absolute;top:12px;inset-inline-start:10px;padding:6px 10px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:13px;font-weight:700;white-space:nowrap}
.h22-card.lft .h22-lab{inset-inline-start:auto;inset-inline-end:10px}
.h22-card.txt{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:8px;padding:20px;background:var(--accent);color:var(--accent-ink);text-align:start}
.h22-card.txt span{font-size:13px;font-weight:600;opacity:.85}
.h22-card.txt b{font-size:clamp(18px,1.5vw,22px);line-height:1.2;text-wrap:balance}
.open-anim .h22-card{rotate:0deg;translate:0 40%;opacity:0;animation:h22-fs 0s 2.5s forwards}
.is-in .h22-card{rotate:calc((var(--r) + var(--s,0deg)) * var(--k));translate:0 0;opacity:1;transition-delay:calc(var(--t0,0s) + .25s + var(--d) * 60ms)}
.rv-on .h22-card{animation:none}
@keyframes h22-fs{to{rotate:calc(var(--r) * var(--k));translate:0 0;opacity:1}}
/* after the entrance the delays go, so a card that is left drops at once instead of waiting its entrance turn */
.h22h.settled .h22-card{transition:rotate .5s ${E},translate .4s ${E},opacity .5s ${E},z-index 0s linear .2s}
/* the card under the pointer is chosen by its slice of the fan (JS), not by what is on top, so a lifted card never blocks its neighbour */
.h22h.settled .h22-card.up{translate:0 -24px;z-index:9;transition:rotate .5s ${E},translate .4s ${E},opacity .5s ${E},z-index 0s}
@media (prefers-reduced-motion:reduce){.h22-card{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: three cards */
@media (max-width:860px){.h22h{padding:88px 20px 0;gap:20px;min-height:min(90vh,780px)}.h22h h3{font-size:clamp(30px,8vw,40px)}.h22-fan{--cw:132px;--k:1.35;min-height:240px}.h22-card.txt{padding:14px}.h22-card.txt b{font-size:17px}.h22-card.out{display:none}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h22h" id="h22">
    <span class="hkick rv">גלידה איטלקית, נחלת בנימין</span>
    <h3 class="rv">גלידה שמכינים כל בוקר, בטעמים שמתחלפים עם העונה</h3>
    <p class="hlead rv">חלב מקיבוץ בגליל, פירות מהשוק, ושישה עשר טעמים בוויטרינה. לטעום לפני שבוחרים זה חלק מהעניין.</p>
    <div class="hcta rv"><a class="hbtn" href="#h22">לטעמים של היום</a><a class="hbtn ghost" href="#h22">איך מגיעים</a></div>
    <ul class="h22-fan" aria-label="טעמים מהוויטרינה">
      <li class="h22-card out" style="--r:24deg;--z:1;--d:2">${PIC("real/s11/cones-yellow.webp", "", { deco: true })}<span class="h22-lab">מנטה טרייה</span></li>
      <li class="h22-card" style="--r:12deg;--z:2;--d:1">${PIC("real/s11/hero-scoops.webp", "", { deco: true, pri: true })}<span class="h22-lab">תות ושמנת</span></li>
      <li class="h22-card txt" style="--r:0deg;--z:3;--d:0"><span>הטעם של השבוע</span><b>פיסטוק ומלח ים</b></li>
      <li class="h22-card lft" style="--r:-12deg;--z:2;--d:1">${PIC("real/s11/bowls.webp", "", { deco: true })}<span class="h22-lab">קערה לשניים</span></li>
      <li class="h22-card out lft" style="--r:-24deg;--z:1;--d:2">${PIC("real/s11/magenta-cone.webp", "", { deco: true })}<span class="h22-lab">גביע ביתי</span></li>
    </ul>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h22"); enter(root);
  var fan=root.querySelector(".h22-fan"), cards=[].slice.call(fan.children), act=null;
  function settle(){root.classList.add("settled");}
  fan.addEventListener("transitionend",function(e){if(e.propertyName==="rotate")settle();});
  setTimeout(settle,3200);
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  function deg(c){return parseFloat(c.style.getPropertyValue("--r"));}
  function lift(c){
    if(c===act)return; act=c;
    // the lifted card gets room: the cards on each side lean five degrees away from it
    cards.forEach(function(o){
      o.classList.toggle("up",o===c);
      o.style.setProperty("--s",!c||o===c?"0deg":(deg(o)>deg(c)?"5deg":"-5deg"));
    });
  }
  // all cards hang from one pivot far below the fan: the angle from it to the pointer says which slice, and so which card, it is in
  fan.addEventListener("pointermove",function(e){
    if(!e.target.closest(".h22-card")){lift(null);return;}
    var b=fan.getBoundingClientRect(), cw=cards[0].offsetWidth||cards[1].offsetWidth, k=parseFloat(getComputedStyle(fan).getPropertyValue("--k"))||1;
    var px=b.left+b.width/2, py=b.bottom+cw*.3+cw*4/3*1.3;
    var a=Math.atan2(e.clientX-px,py-e.clientY)*180/Math.PI, best=null, gap=1e9;
    cards.forEach(function(c){if(!c.offsetWidth)return; var g=Math.abs(a-deg(c)*k); if(g<gap){gap=g;best=c;}});
    lift(best);
  });
  fan.addEventListener("pointerleave",function(){lift(null);});
})();`,
  note:"כל הכרטיסים יושבים באותה נקודה ותלויים מציר אחד שנמצא הרחק מתחתם (transform-origin של 230%), כך שזווית שונה לכל אחד (--r) פותחת אותם למניפה, בלי לחשב מיקומים. הכניסה מתחילה בערימה סגורה שעולה מלמטה ונפתחת מהאמצע החוצה. הזווית וההזזה הן תכונות נפרדות (rotate ו-translate), ולכן הריחוף מרים כרטיס בלי לשבור את הזווית שלו ובלי להתנגש בכניסה. **הריחוף לא נשען על :hover:** הכרטיסים חופפים, וכרטיס שהורם ועלה לראש הערימה היה מכסה את השכן שלו וחוסם אותו. לכן הכרטיס נבחר לפי הזווית מהציר אל המצביע (הפרוסה שלו במניפה), ולא לפי מה שנמצא למעלה, והבחירה לפי הזווית הבסיסית (--r) יציבה ולא מהבהבת. השכנים נוטים 5 מעלות הצידה (--s) ומפנים לו מקום. אחרי הכניסה (המחלקה settled) מושהיות הכניסה יורדות, אחרת כרטיס שעוזבים נשאר למעלה עד שמגיע תורו, ו-z-index חוזר רק אחרי 0.2 שניות, כדי שכרטיס שיורד לא ייעלם מאחורי השכנים באמצע התנועה. הכרטיס האמצעי הוא טקסט בצבע המותג (הטעם של השבוע), ולכן המניפה אומרת משהו ולא רק מראה תמונות; התמונות דקורטיביות, והשם הקצר על כל כרטיס הוא הטקסט שלו, והוא יושב בקצה שהכרטיס הסמוך לא מכסה. הכרטיסים נחתכים בקצה התחתון של ההירו בכוונה, כמו קלפים ביד. בטלפון נשארים שלושה." + NOTE_TAIL
},
{
  id:"h23", cat:"hero", name:"הירו מספר ענק עם צילום בתוך הספרות", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"טקסט בצד אחד, ובצד השני מספר אחד ענק שהוא כל הוויז'ואל: הספרות ממולאות בצילום של החומר עצמו, והמספר רץ עד הערך שלו בכניסה. מתחתיו שורה שאומרת מה הוא סופר.",
  when:"עסק שיש לו מספר אחד שאומר הכול: שנות ותק, פרויקטים, לקוחות, מטרים, קילומטרים. עובד עם מספר של שתיים עד ארבע ספרות וצילום עם טקסטורה (אבן, עץ, בד, מים, אוכל מקרוב). לא כשהמספר קטן או לא מרשים, ולא עם צילום של אנשים, שהספרות חותכות.",
  libs:[],
  css:`${FRAME_CSS}
.h23h{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:48px;min-height:min(84vh,760px);padding:96px 28px 40px;background:var(--bg)}
.h23-txt{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.h23h h3{margin:0;max-width:14ch;font-size:clamp(34px,min(4.2vw,7.8vh),66px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h23h .hlead{max-width:42ch}
/* the number is the visual: a photo of the material shows through the digits (background-clip:text), and it is still real text */
.h23-stat{display:flex;flex-direction:column;align-items:center;gap:12px;margin:0;text-align:center}
.h23-num{display:block;font-size:min(30vw,54vh);line-height:.8;font-weight:800;letter-spacing:-.05em;font-variant-numeric:tabular-nums;color:var(--ink);
  clip-path:inset(0 0 0 0);transition:clip-path .9s ${E},background-position 1.2s ${E}}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
  .h23-num{background:url("../assets/media/real/s15/marble.webp") 50% 50% / cover;-webkit-background-clip:text;background-clip:text;color:transparent}}
.h23-cap{max-width:24ch;font-size:clamp(16px,1.2vw,19px);font-weight:600;line-height:1.4}
.open-anim .h23-num{clip-path:inset(100% 0 0 0);background-position:50% 20%;animation:h23-fs 0s 2.5s forwards}
.is-in .h23-num{clip-path:inset(0 0 0 0);background-position:50% 50%;transition-delay:calc(var(--t0,0s) + .15s)}
.rv-on .h23-num{animation:none}
@keyframes h23-fs{to{clip-path:inset(0 0 0 0);background-position:50% 50%}}
.h23-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion:reduce){.h23-num{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the number becomes the band on top, the text under it */
@media (max-width:860px){.h23h{grid-template-columns:1fr;gap:20px;min-height:0;padding:88px 20px 32px}
  .h23-stat{order:-1;gap:8px}.h23-num{font-size:42vw}.h23h h3{font-size:clamp(28px,7.6vw,38px)}.h23-txt{gap:16px}
  .h23h .hcta{width:100%;flex-wrap:nowrap}.h23h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h23h" id="h23">
    <div class="h23-txt">
      <span class="hkick rv">שיש ואבן למטבח, מודיעין</span>
      <h3 class="rv">משטח אחד, חתוך במידה, שמותקן אצלכם ביום אחד</h3>
      <p class="hlead rv">מגיעים למדידה עם דוגמאות אבן אמיתיות, חותכים בסדנה שלנו, ומתקינים משטח שלם בלי חיבורים מיותרים.</p>
      <div class="hcta rv"><a class="hbtn" href="#h23">לתיאום מדידה</a><a class="hbtn ghost" href="#h23">דוגמאות אבן</a></div>
      <p class="hmicro rv"><span>מדידה בבית בלי עלות</span><span>אחריות לחמש שנים</span></p>
    </div>
    <p class="h23-stat"><span class="h23-num" data-to="25" aria-hidden="true">25</span><span class="h23-sr">25</span> <span class="h23-cap rv">שנה של חיתוך והתקנה, באותה סדנה</span></p>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h23"), num=root.querySelector(".h23-num"), to=+num.dataset.to;
  enter(root);
  // the count runs with the entrance only: not on reduced motion, and not when the script came late and the hero is already shown
  if(!matchMedia("(prefers-reduced-motion:no-preference)").matches||root.classList.contains("is-in"))return;
  // it starts from the smallest number with the same digits (10 for 25), so the width never jumps while it runs
  var from=Math.pow(10,String(to).length-1);
  num.textContent=String(from);
  inView(root,function(){
    var t0=null, done=false;
    function fin(){done=true;num.textContent=String(to);}
    function step(t){
      if(done)return;
      if(t0===null)t0=t;
      var p=Math.min((t-t0)/1000,1);
      num.textContent=String(Math.round(from+(to-from)*(1-Math.pow(1-p,3))));
      if(p<1)requestAnimationFrame(step); else fin();
    }
    requestAnimationFrame(step);
    // frames stop in a background tab; the real value is never left halfway
    setTimeout(fin,1300);
  });
})();`,
  note:"המספר הוא הוויז'ואל: הספרות ממולאות בצילום של החומר (background-clip:text), כך שהן גם טקסט אמיתי וגם צילום, ובדפדפן שלא תומך הן פשוט כהות. הספרות כבדות (משקל 800) כדי שיהיה בהן מספיק שטח לטקסטורה, והגודל לפי הקטן מבין הרוחב והגובה, כדי שבמסך נמוך הן לא ידחפו את הכותרת. בכניסה המספר נחשף מלמטה למעלה, הצילום שבתוכו זז מעט, והערך רץ במשך שנייה מהמספר הקטן ביותר עם אותה כמות ספרות (10 עבור 25), כדי שהרוחב לא יקפוץ באמצע. קורא מסך שומע את הערך הסופי מטקסט מוסתר, ולא את הספירה. בהפחתת תנועה, או כשהסקריפט מאחר, הערך הסופי מוצג מיד. השורה שמתחת למספר היא חלק ממנו: מספר בלי \"של מה\" הוא קישוט. בטלפון המספר עולה למעלה כמו רצועת צילום." + NOTE_TAIL
},
{
  id:"h24", cat:"hero", name:"הירו דירוג למעלה ורצועת ביקורות", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת ממורכזת שמעליה שורת דירוג: עיגולי ראשי תיבות, כוכבים ומספר הביקורות. מתחת לכפתורים רצועה של כרטיסי ביקורת שגולשת לאט לרוחב, עם קצוות נמוגים, עצירה בריחוף וכפתור עצירה גלוי.",
  when:"עסק שהלקוח בוחר בו לפי ביקורות ויש לו הרבה כאלה: הובלות, שיפוצים, ניקיון, מרפאה, מוסך, בית ספר לנהיגה, קייטרינג. הביקורות הן הטיעון, ולכן הן במסך הראשון ולא בתחתית העמוד. לא לעסק עם פחות מעשרים ביקורות אמיתיות, ולעולם לא עם ביקורות ממוצאות.",
  libs:[],
  css:`${FRAME_CSS}
${PP_CSS}
.h24h{position:relative;display:flex;flex-direction:column;align-items:center;gap:32px;min-height:min(86vh,780px);padding:96px 0 28px;text-align:center;overflow:hidden;
  background:radial-gradient(80% 60% at 50% 0%,color-mix(in srgb,var(--accent) 10%,var(--bg)),var(--bg))}
.h24-top{display:flex;flex-direction:column;align-items:center;gap:24px;padding-inline:28px}
/* the proof comes first: who rated and how much, in one line, before the promise */
.h24-proof{display:inline-flex;align-items:center;gap:12px;margin:0;padding-block:6px;padding-inline:6px 16px;border-radius:999px;background:var(--card);font-size:14px;
  box-shadow:0 10px 30px -14px color-mix(in srgb,var(--ink) 35%,transparent)}
.h24-proof b{font-size:15px;font-weight:800}
.h24-av{display:flex}
.h24-av i{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;font-style:normal;font-size:13px;font-weight:700;color:var(--ink);background:color-mix(in srgb,var(--accent) 16%,var(--card))}
.h24-av i+i{margin-inline-start:-10px}
.h24-av i:nth-child(2){background:color-mix(in srgb,var(--accent) 28%,var(--card))}
.h24-av i:nth-child(3){background:color-mix(in srgb,var(--accent) 40%,var(--card))}
.h24-stars{display:inline-flex;gap:2px;color:var(--ink)}
.h24-stars svg{width:14px;height:14px;fill:currentColor}
.h24h h3{margin:0;max-width:17ch;font-size:clamp(34px,min(4.6vw,7.8vh),72px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h24h .hlead{max-width:46ch}
.h24h .hcta{justify-content:center}
/* the rail: one set of reviews written twice; moving it by half (plus half a gap) lands on the same card, so the loop has no seam */
.h24-rail{position:relative;width:100%;margin-top:auto;overflow:hidden;outline:none;
  -webkit-mask-image:linear-gradient(to right,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(to right,transparent,#000 12%,#000 88%,transparent)}
.h24-track{display:flex;gap:16px;width:max-content;margin:0;padding:8px 0 24px;list-style:none;animation:h24-run 64s linear infinite}
[dir="ltr"] .h24-track{animation-name:h24-run-l}
@keyframes h24-run{to{transform:translateX(calc(50% + 8px))}}
@keyframes h24-run-l{to{transform:translateX(calc(-50% - 8px))}}
.h24h.paused .h24-track{animation-play-state:paused}
@media (hover:hover) and (pointer:fine){.h24-rail:hover .h24-track{animation-play-state:paused}}
.h24-card{flex:none;width:300px;display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:20px;border-radius:16px;background:var(--card);text-align:start;
  box-shadow:0 12px 32px -18px color-mix(in srgb,var(--ink) 40%,transparent)}
.h24-card blockquote{margin:0;font-size:15px;line-height:1.55}
.h24-card p{margin:0;font-size:13px;color:var(--muted)}
.h24-card p b{color:var(--ink);font-weight:700}
.h24h .hpp{position:absolute;inset-block-end:28px;inset-inline-end:20px;z-index:2}
/* reduced motion: nothing slides; one set stays, and the rail scrolls by hand (it is focusable, so the keyboard can too) */
@media (prefers-reduced-motion:reduce){.h24h .h24-track{animation:none}.h24-track>[aria-hidden]{display:none}.h24h .hpp{display:none}
  .h24-rail{overflow-x:auto;-webkit-mask-image:none;mask-image:none}.h24-track{padding-inline:28px}}
.h24-rail:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
@media (max-width:860px){.h24h{gap:24px;padding:88px 0 20px;min-height:min(92vh,800px)}.h24-top{padding-inline:20px;gap:18px}
  .h24h h3{font-size:clamp(28px,7.8vw,40px)}.h24-proof{font-size:13px;padding-inline:16px}.h24-card{width:260px}
  .h24-av{display:none}.h24h .hpp{inset-inline-end:8px}
  .h24h{justify-content:center}.h24-rail{margin-top:0}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h24h" id="h24">
    <div class="h24-top">
      <p class="h24-proof rv"><span class="h24-av" aria-hidden="true"><i>ר</i><i>ד</i><i>מ</i></span><span class="h24-stars" aria-hidden="true">${'<svg viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>'.repeat(5)}</span><span><b>4.9</b> בגוגל, מתוך 640 ביקורות</span></p>
      <h3 class="rv">עוברים דירה בלי לארוז קרטון אחד בעצמכם</h3>
      <p class="hlead rv">אריזה, הובלה ופירוק רהיטים בצוות אחד, במחיר סגור מראש. המרכז והשרון, שבעה ימים בשבוע.</p>
      <div class="hcta rv"><a class="hbtn" href="#h24">להצעת מחיר בטלפון</a><a class="hbtn ghost" href="#h24">איך זה עובד</a></div>
    </div>
    <div class="h24-rail rv" role="region" aria-label="ביקורות לקוחות" tabindex="0">
      <ul class="h24-track">${(() => {
        const set = [
          ["הגיעו בשבע בבוקר כמו שאמרו וארזו את כל המטבח בשעתיים. אף כוס לא נשברה.", "רוני", "פתח תקווה"],
          ["שינו לנו תאריך יום לפני בלי לחייב. בגלל זה חזרתי אליהם גם במעבר הבא.", "דנה", "רמת גן"],
          ["פירקו והרכיבו את הארון טוב יותר ממה שהרכבנו אותו בעצמנו.", "יוסי", "ראשון לציון"],
          ["המחיר שקיבלנו בטלפון הוא המחיר ששילמנו, בלי תוספת על הקומה הרביעית.", "מיכל", "גבעתיים"],
          ["עם שני ילדים קטנים, זה שהם ארזו הכול היה ההבדל בין מעבר דירה לסיוט.", "אורי", "חולון"],
          ["הפסנתר ירד ארבע קומות בלי שריטה. עמדתי למטה ולא האמנתי.", "נטע", "תל אביב"]
        ].map(([q, n, c]) => `<li class="h24-card"><span class="h24-stars" role="img" aria-label="חמישה כוכבים">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>'.repeat(5)}</span><blockquote>${q}</blockquote><p><b>${n}</b>, ${c}</p></li>`).join("");
        // the second copy only closes the loop: hidden from screen readers, so each review is read once
        return set + set.replace(/<li class="h24-card">/g, '<li class="h24-card" aria-hidden="true">');
      })()}</ul>
    </div>
    ${PP("עצירת הביקורות הזזות")}
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h24"), pp=root.querySelector(".hpp"); enter(root);
  pp.addEventListener("click",function(){var on=!root.classList.contains("paused");root.classList.toggle("paused",on);pp.setAttribute("aria-pressed",String(on));
    pp.setAttribute("aria-label",on?"הפעלת הביקורות הזזות":"עצירת הביקורות הזזות");});
})();`,
  note:"הדירוג עולה לפני הכותרת, כי מי שבוחר מוביל, שיפוצניק או מרפאה בודק קודם כמה כוכבים יש לו, ורק אחר כך קורא מה הוא מבטיח. עיגולי ראשי התיבות הם רמז לאנשים אמיתיים בלי צילומי פנים מבנק תמונות, והכוכבים בצבע הטקסט ולא בצהוב, כדי שיחזיקו בכל עור. רצועת הביקורות כתובה פעמיים והאנימציה מזיזה אותה בחצי ועוד חצי רווח, כך שהלולאה בלי קפיצה; הכיוון מתהפך באנגלית. זו תנועה של יותר מחמש שניות, ולכן יש כפתור עצירה גלוי, ריחוף עוצר אותה, ובהפחתת תנועה היא לא זזה בכלל: נשאר עותק אחד והרצועה נגללת ביד, והיא יכולה לקבל פוקוס כדי שגם המקלדת תגלול. העותק השני מוסתר מקורא מסך, כדי שכל ביקורת תיקרא פעם אחת. בפרויקט הביקורות מגיעות מגוגל או מהפאנל, עם שם פרטי ועיר, ולעולם לא נכתבות בשביל הדמו." + NOTE_TAIL
},
{
  id:"h25", cat:"hero", name:"הירו מוצר עם בורר צבעים", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"צילום מוצר גדול בצד אחד, ובצד השני שם, מחיר, בורר צבעים וכפתור הוספה לסל. בחירת צבע מחליפה מיד את הצילום ואת שם הצבע, בלי לעבור עמוד.",
  when:"חנות עם מוצר מוביל אחד שמגיע בכמה צבעים או גרסאות: תיק, נעל, ספל, בקבוק, כרית, צעצוע, תכשיט. דף נחיתה של מוצר יחיד, או מוצר הדגל בעמוד הבית. לא לחנות שמוכרת מאות מוצרים שווים, שם ההירו מוביל לקטגוריות.",
  libs:[],
  css:`${FRAME_CSS}
.h25h{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:56px;min-height:min(86vh,780px);padding:88px 28px 28px;background:var(--bg)}
/* the photo carries the colour; the stage only frames it */
.h25-vis{position:relative;align-self:stretch;min-height:440px;border-radius:24px;overflow:hidden;background:var(--card);clip-path:inset(0 round 24px);transition:clip-path .9s ${E}}
.h25-vis img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 55%;display:block;filter:hue-rotate(var(--hue,0deg));transition:filter .5s ${E},transform 1s ${E}}
.open-anim .h25-vis{clip-path:inset(6% 6% round 24px);animation:h25v-fs 0s 2.5s forwards}
.open-anim .h25-vis img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in .h25-vis{clip-path:inset(0 round 24px);transition-delay:var(--t0,0s)}
.is-in .h25-vis img{transform:none}
.rv-on .h25-vis,.rv-on .h25-vis img{animation:none}
@keyframes h25v-fs{to{clip-path:inset(0 round 24px)}}
.h25-chip{position:absolute;inset-block-start:20px;inset-inline-start:20px;margin:0;padding:8px 14px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:13px;font-weight:700}
.h25-info{display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.h25h h3{margin:0;max-width:13ch;font-size:clamp(32px,min(4vw,7.8vh),60px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h25h .hlead{max-width:40ch}
.h25-price{display:flex;align-items:baseline;gap:12px;margin:0}
.h25-price b{font-size:28px;font-weight:800}
.h25-price span{font-size:14px;color:var(--muted)}
/* native radios in a fieldset: arrow keys move between colours, and a screen reader hears a group with one choice */
.h25-sw{margin:0;padding:0;border:0;min-width:0}
.h25-sw legend{padding:0;margin-bottom:8px;font-size:14px;color:var(--muted)}
.h25-sw legend b{color:var(--ink);font-weight:700}
.h25-dots{display:flex;gap:8px}
.h25-dot{position:relative;display:grid;place-items:center;width:44px;height:44px;cursor:pointer}
.h25-dot input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.h25-dot i{width:30px;height:30px;border-radius:50%;background:var(--c);transition:transform .25s ${E},box-shadow .25s ${E}}
.h25-dot input:checked+i{transform:scale(1.1);box-shadow:0 0 0 3px var(--bg),0 0 0 5px var(--ink)}
.h25-dot input:focus-visible+i{outline:2px solid var(--accent);outline-offset:6px}
@media (hover:hover) and (pointer:fine){.h25-dot:hover i{transform:scale(1.1)}}
.h25-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.h25h button.hbtn{border:0;font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.h25h button.hbtn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.h25-buy{align-self:stretch}
.h25-msg{margin:0;font-size:14px;font-weight:600}
.h25-msg:not(:empty){margin-top:12px}
@media (prefers-reduced-motion:reduce){.h25-vis,.h25-vis img,.h25-dot i{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the product is a band on top; the two buttons share one row */
@media (max-width:860px){.h25h{grid-template-columns:1fr;gap:20px;min-height:0;padding:72px 20px 28px}
  .h25-vis{min-height:0;height:clamp(200px,30vh,260px)}
  .h25-info{gap:14px}.h25h h3{font-size:clamp(28px,7.4vw,36px)}
  .h25h .hcta{width:100%;flex-wrap:nowrap}.h25h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h25h" id="h25">
    <div class="h25-vis">
      ${PIC("real/s04/tusk.webp", "פסלון פימו של מפלצת קטנה עם שתי שיניים, על רקע חלק", { pri: true })}
      <p class="h25-chip rv">בעבודת יד, כל אחד קצת שונה</p>
    </div>
    <div class="h25-info">
      <span class="hkick rv">סטודיו לפימו, יפו</span>
      <h3 class="rv">מפלצון: חבר קטן לשולחן העבודה</h3>
      <p class="hlead rv">פסלון של שמונה סנטימטרים, מפוסל ונאפה אצלנו ביד. מגיע בקופסת מתנה עם כרטיס שאפשר לכתוב עליו.</p>
      <p class="h25-price rv"><b>89 ₪</b><span>כולל מע"מ</span></p>
      <fieldset class="h25-sw rv">
        <legend>צבע: <b class="h25-cname">טורקיז</b></legend>
        <div class="h25-dots">
          <label class="h25-dot"><input type="radio" name="h25c" value="טורקיז" data-h="0" checked><i style="--c:hsl(176 42% 50%)"></i><span class="h25-sr">טורקיז</span></label>
          <label class="h25-dot"><input type="radio" name="h25c" value="לילך" data-h="95"><i style="--c:hsl(262 44% 62%)"></i><span class="h25-sr">לילך</span></label>
          <label class="h25-dot"><input type="radio" name="h25c" value="אלמוג" data-h="175"><i style="--c:hsl(352 58% 64%)"></i><span class="h25-sr">אלמוג</span></label>
          <label class="h25-dot"><input type="radio" name="h25c" value="ליים" data-h="-95"><i style="--c:hsl(78 48% 50%)"></i><span class="h25-sr">ליים</span></label>
        </div>
      </fieldset>
      <div class="h25-buy rv">
        <div class="hcta"><button class="hbtn h25-add" type="button">להוספה לסל</button><a class="hbtn ghost" href="#h25">כל המפלצונים</a></div>
        <p class="h25-msg" role="status"></p>
      </div>
      <p class="hmicro rv"><span>משלוח חינם מעל 150 ₪</span><span>נשלח תוך שלושה ימי עבודה</span></p>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h25"); enter(root);
  var vis=root.querySelector(".h25-vis"), img=vis.querySelector("img"), cname=root.querySelector(".h25-cname"), msg=root.querySelector(".h25-msg");
  root.querySelectorAll('[name="h25c"]').forEach(function(r){
    r.addEventListener("change",function(){
      // in a project every colour has its own photo (data-src on the radio); this demo tints one photo instead (data-h, in degrees)
      if(r.dataset.src)img.src=r.dataset.src; else vis.style.setProperty("--hue",(r.dataset.h||0)+"deg");
      cname.textContent=r.value; msg.textContent="";
    });
  });
  root.querySelector(".h25-add").addEventListener("click",function(){
    msg.textContent="נוסף לסל: מפלצון בצבע "+root.querySelector('[name="h25c"]:checked').value+".";
  });
})();`,
  note:"ההירו של חנות עם מוצר מוביל: הצילום גדול, וכל מה שצריך כדי לקנות (שם, מחיר, צבע, כפתור) נמצא במסך הראשון. הבורר בנוי מכפתורי רדיו אמיתיים בתוך fieldset, ולכן החצים במקלדת עוברים בין הצבעים וקורא מסך שומע קבוצה עם בחירה אחת; העיגול הוא רק הציור, והשם המלא מוסתר לקורא המסך. בחירה מחליפה את הצילום ואת שם הצבע מעל העיגולים מיד, בלי עמוד חדש. בפרויקט לכל צבע יש צילום משלו (data-src על כפתור הרדיו); כאן הדמו צובע צילום אחד (hue-rotate) כדי להראות את ההתנהגות. ההוספה לסל עונה בשורה מתחת לכפתור (role=status) ולא בחלון קופץ. אין מספר בתוך הכפתור: המחיר יושב מעליו בגדול. בטלפון המוצר הופך לרצועה למעלה ושני הכפתורים חולקים שורה." + NOTE_TAIL
},
{
  id:"h26", cat:"hero", name:"הירו חלון צילום בתוך הכותרת", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת ענקית במרכז, ובאמצעה חלון צר וגבוה שמראה את הצילום. החלון נפתח מקו דק, זז קצת לצדדים אחרי העכבר, וכל אות שנכנסת אליו מחליפה צבע בזמן אמת. המשפט והכפתורים יושבים בשני הצדדים, למטה.",
  when:"עסק שמוכר חוויה או מקום ויש לו צילום אחד חזק: סיורים, מסעדה, מלון, צלם, סטודיו, אדריכלות, אירועים. רגע אחד שזוכרים, בלי וידאו ובלי ספרייה. לא לצילום בהיר מאוד, שהאותיות הבהירות לא נקראות עליו, ולא לכותרת של יותר משתי שורות קצרות.",
  libs:[],
  css:`${FRAME_CSS}
/* the window is one pair of numbers on the stage: --c moves its centre, --a is half its width. Both registered,
   so the opening can be a transition and the photo, the cut and the light letters all read the same values */
@property --a{syntax:"<percentage>";inherits:true;initial-value:13%}
@property --c{syntax:"<percentage>";inherits:true;initial-value:0%}
.h26h{display:flex;flex-direction:column;min-height:min(88vh,800px);padding:88px 28px 28px;background:var(--bg);color:var(--ink)}
.h26-stage{--a:13%;--c:0%;--l:calc(50% + var(--c) - var(--a));--r:calc(50% - var(--c) - var(--a));
  position:relative;flex:1;display:grid;grid-template-areas:"a";min-height:560px;transition:--a 1.1s ${E}}
.h26-stage>*{grid-area:a}
.h26-ph{position:relative;overflow:hidden;border-radius:20px;background:var(--ink);clip-path:inset(0 var(--r) 0 var(--l) round 20px)}
.h26-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 55%;display:block;transition:transform 1.2s ${E}}
/* the type is centred, so the shade is centred too (heroes.md: the scrim comes from where the text is) */
.h26-ph::after{content:"";position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 46%,color-mix(in srgb,var(--ink) 64%,transparent),color-mix(in srgb,var(--ink) 26%,transparent))}
.open-anim .h26-stage{--a:.3%;animation:h26a-fs 0s 2.5s forwards}
.open-anim .h26-ph img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in.h26-stage{--a:13%;transition-delay:var(--t0,0s)}
.is-in .h26-ph img{transform:none;transition-delay:var(--t0,0s)}
.rv-on.h26-stage,.rv-on .h26-ph img{animation:none}
@keyframes h26a-fs{to{--a:13%}}
.h26-t{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:20px;padding-bottom:112px;text-align:center}
.h26h h3{margin:0;font-size:clamp(40px,min(7.2vw,11vh),124px);line-height:1;font-weight:800;letter-spacing:-.02em}
.h26h h3 span{display:block;white-space:nowrap}
/* one heading drawn twice in the same box, so the lines break in the same place: the dark copy has the window cut
   out of it, the light copy is cut down to the window. The light one is a picture of the text: hidden, inert */
.h26-t.dk{-webkit-mask-image:linear-gradient(to right,#000 var(--l),transparent 0 calc(100% - var(--r)),#000 0);mask-image:linear-gradient(to right,#000 var(--l),transparent 0 calc(100% - var(--r)),#000 0)}
.h26-t.lt{color:var(--bg);clip-path:inset(0 var(--r) 0 var(--l));pointer-events:none}
/* the rest stays out of the window's whole range (centre 50% plus or minus 8%, half width 13%), so it never needs the trick */
.h26-more{align-self:end;display:flex;justify-content:space-between;align-items:flex-end;gap:24px;pointer-events:none}
.h26-more>*{width:calc(29% - 16px);pointer-events:auto}
.h26-more .hlead{margin:0}
.h26-go{display:flex;flex-direction:column;align-items:flex-end;gap:14px}
.h26-go .hcta{justify-content:flex-end}
.h26-go .hmicro{flex-direction:column;align-items:flex-end;gap:4px}
@media (prefers-reduced-motion:reduce){.h26-stage,.h26-ph img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the window stays (centred, a little wider, no pointer); the sentence and the buttons go under the stage */
@media (max-width:860px){.h26h{padding:72px 20px 24px;min-height:0}
  .h26-stage{grid-template-areas:"a" "b";min-height:0;row-gap:24px}
  .is-in.h26-stage,.h26-stage{--a:19%}@keyframes h26a-fs{to{--a:19%}}
  .h26-t{padding-block:56px;gap:14px}.h26h h3{font-size:clamp(28px,8.4vw,40px);line-height:1.05}.h26h h3 span{white-space:normal}
  .h26-more{grid-area:b;flex-direction:column;align-items:center;gap:20px;text-align:center}.h26-more>*{width:auto}
  .h26-go,.h26-go .hmicro{align-items:center}.h26-go .hmicro{flex-direction:row;justify-content:center;gap:4px 16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h26h" id="h26">
    <div class="h26-stage">
      <div class="h26-ph">${PIC("real/s01/street-light.webp", "רחוב אבן ישן בשקיעה, פנס דולק ואדם הולך לבד", { pri: true })}</div>
${(() => {
        // one heading, written into both layers from the same source; the light layer is a picture of it
        const t = `
        <span class="hkick rv" style="--i:0">סיורים רגליים בעיר העתיקה</span>
        <h3 class="rv" style="--i:1"><span>הסמטאות נראות אחרת</span> <span>כשהשמש יורדת עליהן</span></h3>`;
        return `      <div class="h26-t dk">${t}
      </div>
      <div class="h26-t lt" aria-hidden="true" inert>${t}
      </div>`;
      })()}
      <div class="h26-more">
        <p class="hlead rv" style="--i:2">שעתיים וחצי ברגל, קבוצה קטנה, ומדריך שגדל ברובע ויודע איפה עוצרים לקפה.</p>
        <div class="h26-go">
          <div class="hcta rv" style="--i:3"><a class="hbtn" href="#h26">לבחירת תאריך</a><a class="hbtn ghost" href="#h26">המסלולים</a></div>
          <p class="hmicro rv" style="--i:4"><span>יוצאים כל ערב חוץ משבת</span><span>ביטול בלי עלות עד יום לפני</span></p>
        </div>
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h26"), st=root.querySelector(".h26-stage");
  enter(st);
  // the window follows the pointer loosely: up to 8% from the centre, eased every frame, back to the centre on leave
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var cur=0, to=0, raf=0;
  function tick(){
    cur+=(to-cur)*.12;
    if(Math.abs(to-cur)<.01)cur=to;
    st.style.setProperty("--c",cur.toFixed(2)+"%");
    raf=cur===to?0:requestAnimationFrame(tick);
  }
  function aim(v){to=v; if(!raf)raf=requestAnimationFrame(tick);}
  root.addEventListener("pointermove",function(e){
    if(innerWidth<=860)return;
    var b=st.getBoundingClientRect(), p=(e.clientX-b.left)/b.width;
    aim(Math.max(-8,Math.min(8,(p-.5)*20)));
  });
  root.addEventListener("pointerleave",function(){aim(0);});
})();`,
  note:"הרגע של ההירו הוא החלון: צילום מלא מאחורי הבמה, שרואים ממנו רק עמודה צרה באמצע הכותרת. כל המצב הוא שני משתנים רשומים (@property) על הבמה, --c למרכז החלון ו---a לחצי הרוחב, ומהם נגזרים שלושה דברים: החיתוך של הצילום, החור בכותרת הכהה (mask) והחיתוך של הכותרת הבהירה (clip-path). לכן כשהחלון זז, האותיות מחליפות צבע בדיוק בקצה שלו, בכל פריים. הכניסה היא מעבר של --a מקו דק לרוחב מלא, ובמחשב עם עכבר החלון זז אחרי הסמן עד 8% מהמרכז, בהאטה (lerp) ולא בקפיצה, וחוזר למרכז כשהעכבר יוצא. הכותרת מצוירת פעמיים באותה תיבה בדיוק, ולכן השורות נשברות באותו מקום; הבהירה מוסתרת מקורא מסך ו-inert. המשפט והכפתורים יושבים מחוץ לכל הטווח של החלון, כך שאף פעם לא צריכים את הטריק. בלי JS ובתנועה מופחתת החלון פתוח ועומד באמצע. בטלפון החלון נשאר, קצת רחב יותר ובלי עכבר, והמשפט והכפתורים יורדים מתחת לבמה." + NOTE_TAIL
},
{
  id:"h27", cat:"hero", name:"הירו מותג אישי עם דיוקן", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"דיוקן גבוה של בעלת העסק בצד אחד, ובצד השני היכרות קצרה בשמה, ההבטחה, כפתור לשיחת היכרות ושורה של שלוש עובדות. על הדיוקן תווית קטנה של זמינות.",
  when:"עסק שהוא אדם אחד: יועצת, מאמן, מטפלת, סטייליסטית, עורך דין, צלם, מרצה. הלקוח קונה את האדם, ולכן הפנים במסך הראשון ובגדול. לא בלי צילום מקצועי אמיתי של האדם, ולא לעסק עם צוות, שם h16 או h3.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h27h{--disp:${DISP};display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:56px;min-height:min(86vh,780px);padding:88px 28px 28px;
  background:color-mix(in srgb,var(--accent) 5%,var(--bg))}
.h27-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:24px}
/* the hello is in her voice and in the display face; the heading under it is the promise */
.h27-hi{margin:0;font-family:var(--disp);font-size:clamp(26px,2.4vw,36px);line-height:1.1}
.h27h h3{margin:0;max-width:15ch;font-size:clamp(32px,min(4.2vw,7.8vh),64px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h27h .hlead{max-width:42ch}
.h27-facts{display:flex;flex-wrap:wrap;gap:16px 40px;margin:8px 0 0;padding:0;list-style:none}
.h27-facts li{display:flex;flex-direction:column;gap:2px}
.h27-facts b{font-size:clamp(22px,1.8vw,28px);font-weight:800;line-height:1.1}
.h27-facts span{font-size:14px;color:var(--muted)}
.h27-vis{--rr:200px 200px 24px 24px;position:relative;border-radius:var(--rr);overflow:hidden;background:var(--card);clip-path:inset(0 round var(--rr));transition:clip-path 1s ${E}}
.h27-vis img{width:100%;height:100%;object-fit:cover;object-position:50% 30%;display:block;transition:transform 1.2s ${E}}
.open-anim .h27-vis{clip-path:inset(100% 0 0 0 round var(--rr));animation:h27v-fs 0s 2.5s forwards}
.open-anim .h27-vis img{transform:scale(1.1);animation:rv-fs 0s 2.5s forwards}
.is-in .h27-vis{clip-path:inset(0 round var(--rr));transition-delay:var(--t0,0s)}
.is-in .h27-vis img{transform:none;transition-delay:var(--t0,0s)}
.rv-on .h27-vis,.rv-on .h27-vis img{animation:none}
@keyframes h27v-fs{to{clip-path:inset(0 round var(--rr))}}
/* a fact, not decoration: when the next opening is */
.h27-tag{position:absolute;inset-block-end:20px;inset-inline-start:20px;display:flex;align-items:center;gap:10px;margin:0;padding:10px 16px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:14px;font-weight:600;
  box-shadow:0 12px 32px -12px color-mix(in srgb,var(--ink) 40%,transparent)}
.h27-tag i{width:8px;height:8px;border-radius:50%;background:var(--accent)}
@media (prefers-reduced-motion:reduce){.h27-vis,.h27-vis img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the face first, as a band; the facts sit in one row */
@media (max-width:860px){.h27h{grid-template-columns:1fr;gap:20px;min-height:0;padding:72px 20px 28px}
  .h27-vis{--rr:24px;order:-1;height:clamp(200px,28vh,250px)}
  .h27-vis img{object-position:50% 22%}.h27-tag{inset-block-end:12px;inset-inline-start:12px;padding:8px 12px;font-size:13px}
  .h27-txt{padding-block:0;gap:14px}.h27h h3{font-size:clamp(28px,7.4vw,36px)}.h27-facts{gap:12px 24px;margin-top:4px}.h27-facts b{font-size:20px}
  .h27h .hcta{width:100%;flex-wrap:nowrap}.h27h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h27h" id="h27">
    <div class="h27-txt">
      <p class="h27-hi rv">היי, אני מאיה.</p>
      <h3 class="rv">מלתחה שעובדת בשבילך, בלי לקנות עוד בגדים</h3>
      <p class="hlead rv">סטייליסטית אישית בתל אביב. שלוש שעות אצלך מול הארון: מה נשאר, מה יוצא, ואיך משלבים, ויוצאים עם שלושים לוקים מוכנים.</p>
      <div class="hcta rv"><a class="hbtn" href="#h27">לשיחת היכרות</a><a class="hbtn ghost" href="#h27">איך זה עובד</a></div>
      <ul class="h27-facts rv">
        <li><b>8</b><span>שנים בסטיילינג</span></li>
        <li><b>620</b><span>ארונות שעברתי עליהם</span></li>
        <li><b>3 שעות</b><span>מפגש אחד, אצלך</span></li>
      </ul>
    </div>
    <div class="h27-vis">
      ${PIC("dive/portrait.webp", "מאיה, סטייליסטית, עם משקפי שמש עגולים", { pri: true })}
      <p class="h27-tag rv"><i aria-hidden="true"></i>פנויה לשתי לקוחות חדשות בנובמבר</p>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h27"));`,
  note:"כשהעסק הוא אדם אחד, הפנים הם ההוכחה הראשונה, ולכן הדיוקן גדול ובמסך הראשון. השורה הראשונה היא היכרות בקול שלה ובפונט התצוגה, וה-h3 שמתחתיה הוא ההבטחה, כך שהכותרת עדיין אומרת מה מקבלים ולא רק מי זאת. שלוש העובדות הן מספרים עם מילים (שנים, ארונות, משך המפגש) ולא מספור, ואין בהן כרטיסים או קווים. הדיוקן בצורת קשת למעלה, והוא נחשף מלמטה למעלה עם זום עדין; על הדיוקן תווית זמינות, שהיא עובדה ולא קישוט (הנקודה בצבע המותג, בלי הבהוב). בטלפון הדיוקן הופך לרצועה למעלה, עם הפנים במרכז החיתוך, ושני הכפתורים חולקים שורה." + NOTE_TAIL
},
{
  id:"h29", cat:"hero", name:"הירו המלצה ככותרת", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"ציטוט של לקוחה בגדול, בפונט תצוגה, הוא הדבר הראשון שקוראים. מעליו שורה קטנה שאומרת מה העסק עושה, מתחתיו שם הלקוחה וכפתור, ולצדו צילום מהבית שלה.",
  when:"עסק שהתוצאה שלו נשמעת הכי טוב מפי לקוח: התקנות לבית, שיפוצים, אנרגיה סולארית, טיפול, אימון, ייעוץ. עובד כשיש לקוח אמיתי שהסכים לשם ולצילום, ומשפט אחד קצר עם מספר או שינוי מוחשי. לא כשההמלצה כללית (\"שירות מעולה\"), ולא כשאין לקוח שמסכים להופיע.",
  libs:[],
  css:`${SERIF}
${FRAME_CSS}
.h29h{--disp:${DISP};display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:56px;min-height:min(86vh,780px);padding:88px 28px 28px;background:var(--bg)}
.h29-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:24px}
/* the h3 says what the business does, small; the quote is the loudest thing on the screen, and it is not a heading */
.h29h h3{margin:0;font-size:clamp(17px,1.3vw,20px);line-height:1.4;font-weight:700}
.h29-q{position:relative;margin:0}
.h29-q blockquote{margin:0;font-family:var(--disp);font-size:clamp(32px,min(3.9vw,7.4vh),62px);line-height:1.08;text-wrap:balance}
.h29-mark{display:block;height:.42em;margin-bottom:8px;font-family:var(--disp);font-size:clamp(72px,7vw,112px);line-height:1;color:var(--accent)}
.h29-q figcaption{display:flex;flex-direction:column;gap:2px;margin-top:20px;font-size:15px}
.h29-q figcaption b{font-size:16px}
.h29-q figcaption span{color:var(--muted)}
/* it opens from the edge next to the text: the start of the closed state flips with the direction */
.h29-vis{--from:inset(0 0 0 100% round 24px);position:relative;border-radius:24px;overflow:hidden;background:var(--card);clip-path:inset(0 round 24px);transition:clip-path 1s ${E}}
[dir="ltr"] .h29-vis{--from:inset(0 100% 0 0 round 24px)}
.h29-vis img{width:100%;height:100%;object-fit:cover;object-position:28% 50%;display:block;transition:transform 1.2s ${E}}
.open-anim .h29-vis{clip-path:var(--from);animation:h29v-fs 0s 2.5s forwards}
.open-anim .h29-vis img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in .h29-vis{clip-path:inset(0 round 24px);transition-delay:calc(var(--t0,0s) + .1s)}
.is-in .h29-vis img{transform:none;transition-delay:calc(var(--t0,0s) + .1s)}
.rv-on .h29-vis,.rv-on .h29-vis img{animation:none}
@keyframes h29v-fs{to{clip-path:inset(0 round 24px)}}
.h29-cap{position:absolute;inset-block-end:20px;inset-inline-start:20px;margin:0;padding:8px 14px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:13px;font-weight:600}
@media (prefers-reduced-motion:reduce){.h29-vis,.h29-vis img{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h29h{grid-template-columns:1fr;gap:20px;min-height:0;padding:72px 20px 28px}
  .h29-vis{order:-1;height:clamp(180px,26vh,240px)}.h29-vis img{object-position:24% 35%}
  .h29-txt{padding-block:0;gap:16px}.h29-q blockquote{font-size:clamp(26px,7vw,34px)}.h29-mark{font-size:64px}.h29-q figcaption{margin-top:12px}
  .h29h .hcta{width:100%;flex-wrap:nowrap}.h29h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h29h" id="h29">
    <div class="h29-txt">
      <h3 class="rv">חימום וקירור חכם לבית, מהתכנון ועד ההתקנה</h3>
      <figure class="h29-q rv">
        <span class="h29-mark" aria-hidden="true">”</span>
        <blockquote>החשבון ירד בשליש, והבית כבר חם כשאנחנו חוזרים מהעבודה.</blockquote>
        <figcaption><b>נועה כהן</b><span>רמת השרון, התקינו אצלה בפברואר</span></figcaption>
      </figure>
      <div class="hcta rv"><a class="hbtn" href="#h29">לבדיקת התאמה לבית</a><a class="hbtn ghost" href="#h29">עוד סיפורים</a></div>
      <p class="hmicro rv"><span>4.9 בגוגל, מתוך 212 ביקורות</span><span>ביקור ראשון בלי עלות</span></p>
    </div>
    <div class="h29-vis">
      ${PIC("real/s02/hero-panel.webp", "נועה מחייכת ומכוונת את לוח הבקרה על הקיר בסלון", { pri: true })}
      <p class="h29-cap rv">בתמונה: הבית של נועה</p>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h29"));`,
  note:"ההמלצה היא הכותרת הוויזואלית: משפט אחד של לקוחה אמיתית, עם מספר ושינוי מוחשי, גדול ובפונט התצוגה. מבחינת המבנה היא blockquote בתוך figure עם שם ומקום ב-figcaption, וה-h3 הוא השורה הקטנה שמעליה שאומרת מה העסק עושה (בפרויקט ה-h1), כך שגוגל וקורא מסך מבינים את העמוד גם בלי הציטוט. מרכאות הפתיחה בצבע המותג הן הקישוט היחיד, מוסתרות מקורא מסך. הצילום הוא של אותה לקוחה בבית שלה, ותווית קטנה אומרת את זה, כי צילום כללי ליד ציטוט נראה כמו בנק תמונות. הצילום נפתח מהצד הקרוב לטקסט. משתמשים רק בלקוח שהסכים לשם ולצילום; בלי זה, h24 עם רצועת ביקורות. בטלפון הצילום רצועה למעלה." + NOTE_TAIL
},
{
  id:"h30", cat:"hero", name:"הירו שלושה לוחות שנפתחים", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת ומשפט למעלה, ומתחת שלושה לוחות צילום זה לצד זה, אחד לכל סוג לקוח. הלוח הפתוח רחב ומראה משפט הסבר; ריחוף או לחיצה על לוח אחר פותחים אותו, והאחרים מצטמצמים.",
  when:"עסק שמשרת שלושה קהלים או שלושה סוגי עבודה, וכל אחד רוצה לראות את עצמו כבר במסך הראשון: בית, בניין ועסק; פרטי, עסקי ומוסדי; שיפוץ, בנייה ותחזוקה. לא ליותר מארבעה לוחות, שם הסגורים נהיים צרים מדי לשם, ולא כשיש שירות אחד, שם h4.",
  libs:[],
  css:`${FRAME_CSS}
.h30h{display:flex;flex-direction:column;gap:32px;min-height:min(86vh,780px);padding:88px 28px 28px;background:var(--bg)}
.h30-top{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:end;gap:20px 56px}
.h30-ttl,.h30-side{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.h30-side{gap:20px}
.h30h h3{margin:0;max-width:16ch;font-size:clamp(32px,min(4vw,7.8vh),60px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h30h .hlead{max-width:42ch}
/* minmax(0,…): a closed panel may be narrower than the sentence it hides. The open one takes 2.4 parts */
.h30-row{flex:1;display:grid;grid-template-columns:minmax(0,2.4fr) minmax(0,1fr) minmax(0,1fr);gap:12px;min-height:clamp(280px,40vh,420px);transition:grid-template-columns .7s ${E}}
.h30-row[data-open="1"]{grid-template-columns:minmax(0,1fr) minmax(0,2.4fr) minmax(0,1fr)}
.h30-row[data-open="2"]{grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,2.4fr)}
.h30-p{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;min-width:0;padding:24px;border-radius:20px;overflow:hidden;isolation:isolate;background:var(--ink);color:var(--bg)}
.h30-p img{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s ${E}}
/* the name sits in the bottom start corner, so the shade comes from that corner (heroes.md) */
.h30-p::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(to top left,color-mix(in srgb,var(--ink) 85%,transparent) 0%,color-mix(in srgb,var(--ink) 45%,transparent) 50%,transparent 80%)}
[dir="ltr"] .h30-p::before{background:linear-gradient(to top right,color-mix(in srgb,var(--ink) 85%,transparent) 0%,color-mix(in srgb,var(--ink) 45%,transparent) 50%,transparent 80%)}
.h30-p h4{margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.2;font-weight:700}
.h30-p h4 button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:0;border:0;background:none;color:inherit;font:inherit;text-align:start;cursor:pointer}
/* the whole panel is the button's hit area, and the name stays a heading in the outline */
.h30-p h4 button::after{content:"";position:absolute;inset:0;z-index:1;border-radius:20px}
.h30-p h4 button:focus-visible{outline:none}
.h30-p h4 button:focus-visible::after{outline:2px solid var(--accent);outline-offset:-4px}
.h30-ic{position:relative;flex:none;width:32px;height:32px;border-radius:50%;background:color-mix(in srgb,var(--bg) 22%,transparent);transition:opacity .3s ${E},transform .4s ${E}}
.h30-ic::before,.h30-ic::after{content:"";position:absolute;top:50%;left:50%;width:12px;height:2px;border-radius:2px;background:currentColor;translate:-50% -50%}
.h30-ic::after{rotate:90deg}
.h30-p.on .h30-ic{opacity:0;transform:scale(.6)}
/* the sentence opens by grid rows (0fr to 1fr) and has a fixed width, so it does not rewrap while the panel widens */
.h30-d{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s ${E}}
.h30-d>div{min-height:0;overflow:hidden}
.h30-d p{width:34ch;margin:0;font-size:16px;line-height:1.5;opacity:0;transition:opacity .4s ${E}}
.h30-p.on .h30-d{grid-template-rows:1fr}
.h30-p.on .h30-d p{opacity:.92;transition-delay:.25s}
.open-anim .h30-p img{transform:scale(1.08);animation:rv-fs 0s 2.5s forwards}
.is-in .h30-p img{transform:none;transition-delay:calc(var(--t0,0s) + var(--i,0) * 90ms)}
.rv-on .h30-p img{animation:none}
@media (prefers-reduced-motion:reduce){.h30-row,.h30-d,.h30-d p,.h30-ic,.h30-p img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the panels stack, and the open one takes the height instead of the width */
@media (max-width:860px){.h30h{gap:20px;min-height:0;padding:72px 20px 20px}
  .h30-top{grid-template-columns:1fr;gap:14px}.h30-ttl{gap:12px}.h30-side{gap:16px}
  .h30h h3{font-size:clamp(28px,7.4vw,36px)}
  .h30h .hcta{width:100%;flex-wrap:nowrap}.h30h .hcta .hbtn{flex:1;padding-inline:16px}
  .h30-row,.h30-row[data-open="1"],.h30-row[data-open="2"]{flex:none;height:clamp(300px,42vh,380px);min-height:0;grid-template-columns:1fr;gap:8px;transition:grid-template-rows .7s ${E}}
  .h30-row{grid-template-rows:minmax(0,2.4fr) minmax(0,1fr) minmax(0,1fr)}
  .h30-row[data-open="1"]{grid-template-rows:minmax(0,1fr) minmax(0,2.4fr) minmax(0,1fr)}
  .h30-row[data-open="2"]{grid-template-rows:minmax(0,1fr) minmax(0,1fr) minmax(0,2.4fr)}
  .h30-p{padding:16px 20px;border-radius:16px}.h30-p h4 button::after{border-radius:16px}
  .h30-d p{width:auto;font-size:15px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h30h" id="h30">
    <div class="h30-top">
      <div class="h30-ttl">
        <span class="hkick rv">עמדות טעינה לרכב חשמלי</span>
        <h3 class="rv">טעינה מלאה בבוקר, בלי לחפש עמדה פנויה</h3>
      </div>
      <div class="h30-side">
        <p class="hlead rv">מתכננים, מתקינים ומחברים ללוח החשמל עם אישור של חשמלאי מוסמך, בבית, בבניין או בחניון של העסק.</p>
        <div class="hcta rv"><a class="hbtn" href="#h30">לבדיקת התאמה</a><a class="hbtn ghost" href="#h30">מחירון</a></div>
      </div>
    </div>
    <div class="h30-row" data-open="0">
      <div class="h30-p on rv">
        ${PIC("real/s10/wallbox.webp", "עמדת טעינה על קיר לבן, והתקע של הכבל מחובר אליה", { pri: true })}
        <h4><button type="button" aria-expanded="true" aria-controls="h30-d0"><span>לבית פרטי</span><span class="h30-ic" aria-hidden="true"></span></button></h4>
        <div class="h30-d" id="h30-d0"><div><p>עמדה על הקיר בחניה, מחוברת ללוח של הבית, עם אפליקציה שמטעינה בשעות הזולות.</p></div></div>
      </div>
      <div class="h30-p rv">
        ${PIC("real/s10/resident.webp", "אישה מדברת בטלפון ליד רכב לבן שמחובר לטעינה מול הכניסה לבניין")}
        <h4><button type="button" aria-expanded="false" aria-controls="h30-d1"><span>לבניין משותף</span><span class="h30-ic" aria-hidden="true"></span></button></h4>
        <div class="h30-d" id="h30-d1" inert><div><p>עמדה לכל דייר, עם חלוקת עלויות לפי צריכה ובלי להעמיס על החשמל של הבניין.</p></div></div>
      </div>
      <div class="h30-p rv">
        ${PIC("real/s10/lot-paint.webp", "סימון של עמדת טעינה צבוע בלבן על האספלט בחניון")}
        <h4><button type="button" aria-expanded="false" aria-controls="h30-d2"><span>לחניון של עסק</span><span class="h30-ic" aria-hidden="true"></span></button></h4>
        <div class="h30-d" id="h30-d2" inert><div><p>עמדות לעובדים ולאורחים, עם חיוב בכרטיס ודוח צריכה חודשי.</p></div></div>
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h30"), row=root.querySelector(".h30-row"), ps=[].slice.call(root.querySelectorAll(".h30-p"));
  var fine=matchMedia("(hover:hover) and (pointer:fine)"), t;
  enter(root);
  function open(k){
    row.dataset.open=k;
    ps.forEach(function(p,i){
      var on=i===k, d=p.querySelector(".h30-d");
      p.classList.toggle("on",on); p.querySelector("button").setAttribute("aria-expanded",String(on));
      // a closed sentence leaves the tab order and the screen reader, not only the eye
      if(on)d.removeAttribute("inert"); else d.setAttribute("inert","");
    });
  }
  ps.forEach(function(p,i){
    p.querySelector("button").addEventListener("click",function(){open(i);});
    // a mouse opens by pointing, after a short pause, so a cursor that only crosses a panel does not open it
    p.addEventListener("mouseenter",function(){if(!fine.matches)return; clearTimeout(t); t=setTimeout(function(){open(i);},120);});
    p.addEventListener("mouseleave",function(){clearTimeout(t);});
  });
})();`,
  note:"שלושה קהלים במסך אחד, בלי טאבים ובלי לגלול: כל לוח הוא צילום של הקהל עם השם שלו, והלוח הפתוח רחב ומראה משפט אחד. הפתיחה היא שינוי של grid-template-columns (2.4 חלקים ללוח הפתוח, אחד לכל סגור), כך שהתמונות לא נמתחות אלא נחתכות מחדש. השם הוא h4 עם כפתור בתוכו, aria-expanded ו-aria-controls, ושטח הלחיצה של הכפתור נמתח על כל הלוח; המשפט של לוח סגור הוא inert, כדי שקורא מסך לא יקרא טקסט שלא רואים. בעכבר הלוח נפתח בריחוף אחרי השהיה קצרה, בנגיעה ובמקלדת בלחיצה. המשפט נפתח בשורות גריד (0fr ל-1fr) וברוחב קבוע, כדי שלא יישבר מחדש בזמן שהלוח מתרחב. שכבת הקריאות מגיעה מהפינה התחתונה בצד שבו השם יושב, ומתהפכת באנגלית. בטלפון הלוחות נערמים, והפתוח מקבל גובה במקום רוחב. לשניים או ארבעה לוחות משנים את מספר העמודות; יותר מזה כבר לא נכנס שם בלוח סגור." + NOTE_TAIL
},
{
  id:"h31", cat:"hero", name:"הירו חנות עם עיגולי קטגוריות", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"כותרת ממורכזת עם צילום קטן בצורת גלולה בתוך המשפט, משפט הסבר וזוג כפתורים, ומתחת שורה של עיגולי צילום, אחד לכל קטגוריה, עם שם ומספר פריטים. העיגולים נכנסים בזה אחר זה.",
  when:"חנות עם ארבע עד שש קטגוריות ברורות שכל אחת מצטלמת יפה: רהיטים לפי חדרים, ביגוד, קוסמטיקה, צעצועים, חנות פרחים, מעדנייה. מי שנכנס קופץ ישר לקטגוריה שלו מהמסך הראשון. לא לחנות עם מוצר מוביל אחד, שם h25, ולא לשירות בלי מוצרים.",
  libs:[],
  css:`${FRAME_CSS}
.h31h{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;min-height:min(86vh,780px);padding:88px 28px 40px;text-align:center;
  background:linear-gradient(to bottom,color-mix(in srgb,var(--accent) 12%,var(--bg)),var(--bg) 75%)}
.h31h h3{margin:0;max-width:17ch;font-size:clamp(34px,min(4.6vw,7.8vh),72px);line-height:1.08;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
/* the photo inside the sentence: a pill sized in em, so it grows, shrinks and wraps with the heading */
.h31-pill{display:inline-block;width:2.1em;height:.8em;margin-inline:.06em;vertical-align:-.06em;border-radius:999px;overflow:hidden;background:var(--card);clip-path:inset(0 round 999px);transition:clip-path .9s ${E}}
.h31-pill img{width:100%;height:100%;object-fit:cover;object-position:50% 55%;display:block}
.open-anim .h31-pill{clip-path:inset(0 50% round 999px);animation:h31p-fs 0s 2.5s forwards}
.is-in .h31-pill{clip-path:inset(0 round 999px);transition-delay:calc(var(--t0,0s) + .3s)}
.rv-on .h31-pill{animation:none}
@keyframes h31p-fs{to{clip-path:inset(0 round 999px)}}
.h31h .hlead{max-width:46ch}
.h31h .hcta{justify-content:center}
.h31-cats{max-width:100%;margin-top:16px}
.h31-cats ul{display:flex;justify-content:center;gap:16px 40px;margin:0;padding:0;list-style:none}
.h31-cats a{display:flex;flex-direction:column;align-items:center;gap:4px;color:inherit;text-decoration:none}
.h31-c{display:block;width:clamp(96px,9vw,140px);aspect-ratio:1;margin-bottom:8px;border-radius:50%;overflow:hidden;background:var(--card)}
.h31-c img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ${E}}
.h31-cats li:nth-child(2) img{object-position:72% 70%}
.h31-cats li:nth-child(3) img{object-position:30% 60%}
.h31-cats li:nth-child(4) img{object-position:40% 70%}
.h31-cats b{font-size:16px;font-weight:700}
.h31-n{font-size:13px;color:var(--muted)}
.h31-cats a:focus-visible{outline:none}
.h31-cats a:focus-visible .h31-c{outline:2px solid var(--accent);outline-offset:4px}
@media (hover:hover) and (pointer:fine){.h31-cats a:hover .h31-c img{transform:scale(1.08)}}
/* the circles grow in one after another instead of rising */
.open-anim .h31-cats .rv{transform:scale(.86)}
.is-in .h31-cats .rv{transform:none}
@media (prefers-reduced-motion:reduce){.h31-pill,.h31-c img{transition-duration:.01ms!important;transition-delay:0s!important}}
/* phone: the circles become a row that scrolls sideways, and the next circle peeks in at the edge */
@media (max-width:860px){.h31h{gap:16px;min-height:0;padding:72px 20px 28px}
  .h31h h3{font-size:clamp(30px,8vw,40px)}
  .h31h .hcta{width:100%;flex-wrap:nowrap}.h31h .hcta .hbtn{flex:1;padding-inline:16px}
  .h31-cats{align-self:stretch;margin:8px -20px 0}
  .h31-cats ul{justify-content:flex-start;gap:16px;overflow-x:auto;padding:4px 20px 8px;scroll-padding-inline:20px;scroll-snap-type:x mandatory;scrollbar-width:none}
  .h31-cats li{flex:none;scroll-snap-align:start}
  .h31-c{width:76px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h31h" id="h31">
    <span class="hkick rv">רהיטים ותאורה, מעצבים בישראל</span>
    <h3 class="rv">רהיטים שנכנסים לבית <span class="h31-pill">${PIC("real/s13/proj-c.webp", "", { deco: true })}</span> ונשארים בו שנים</h3>
    <p class="hlead rv">סלון, חדר שינה, אמבטיה ומטבח, מסטודיואים ישראלים ומנגריות קטנות. משלוח והרכבה עד הבית בכל הארץ.</p>
    <div class="hcta rv"><a class="hbtn" href="#h31">לקולקציה החדשה</a><a class="hbtn ghost" href="#h31">לחנות בתל אביב</a></div>
    <nav class="h31-cats" aria-label="קטגוריות">
      <ul>
        <li class="rv" style="--i:3.5"><a href="#h31"><span class="h31-c">${PIC("real/s13/proj-a.webp", "", { deco: true })}</span><b>סלון</b><span class="h31-n">86 פריטים</span></a></li>
        <li class="rv" style="--i:4"><a href="#h31"><span class="h31-c">${PIC("real/s02/night-room.webp", "", { deco: true })}</span><b>חדר שינה</b><span class="h31-n">54 פריטים</span></a></li>
        <li class="rv" style="--i:4.5"><a href="#h31"><span class="h31-c">${PIC("real/s13/proj-b.webp", "", { deco: true })}</span><b>אמבטיה</b><span class="h31-n">31 פריטים</span></a></li>
        <li class="rv" style="--i:5"><a href="#h31"><span class="h31-c">${PIC("real/s13/room.webp", "", { deco: true })}</span><b>פינת קריאה</b><span class="h31-n">22 פריטים</span></a></li>
        <li class="rv" style="--i:5.5"><a href="#h31"><span class="h31-c">${PIC("real/s13/proj-c.webp", "", { deco: true })}</span><b>מטבח</b><span class="h31-n">47 פריטים</span></a></li>
      </ul>
    </nav>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h31"));`,
  note:"ההירו של חנות שהמבקר בה יודע מה הוא מחפש: הקטגוריות עולות למסך הראשון כעיגולי צילום, ולחיצה אחת מובילה לקטגוריה. העיגולים הם nav עם רשימה וקישורים אמיתיים, והשם והמספר הם הטקסט של הקישור, ולכן הצילומים עצמם מוסתרים מקורא מסך. הגלולה בתוך הכותרת היא צילום קטן שגודלו ב-em, כך שהיא גדלה ונשברת עם המשפט, ונפתחת מהאמצע לצדדים. העיגולים נכנסים בזה אחר זה בגדילה קלה, וכל הפתיחה נגמרת עד 1.2 שניות. בטלפון העיגולים הופכים לשורה שנגללת הצידה, והעיגול הבא מציץ בקצה כדי שיהיה ברור שיש עוד. בפרויקט הקטגוריות, הצילומים והמספרים מגיעים מהחנות (Shopify או ווקומרס); צילום אחיד לכל העיגולים, באותו אור ובאותו מרחק, הוא מה שהופך את השורה לשקטה." + NOTE_TAIL
},
{
  id:"h32", cat:"hero", name:"הירו אירוע עם ספירה לאחור", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"צילום מלא וכהה מהאירוע, ובפינה התחתונה כותרת, תאריך, ספירה לאחור של ימים, שעות ודקות עד הפתיחה, וכפתור כרטיסים. הספרה שמשתנה מחליקה פנימה בעדינות.",
  when:"אירוע עם תאריך אחד שכל העמוד מוביל אליו: פסטיבל, כנס, הופעה, השקה, סדנה, פתיחה של מקום חדש, מבצע שנגמר. הספירה נותנת סיבה לקנות עכשיו ולא בפעם הבאה. לא לאירוע שחוזר כל שבוע ולא לתאריך רחוק משנה, שם המספר גדול מדי מכדי לדחוף.",
  libs:[],
  css:`${FRAME_CSS}
.h32h{--fx:-1;position:relative;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;gap:20px;min-height:min(86vh,780px);padding:96px 28px 40px;background:var(--ink);color:var(--bg);overflow:hidden;isolation:isolate}
[dir="ltr"] .h32h{--fx:1}
/* the singer has to stand on the side away from the text: the photo is mirrored in Hebrew and kept as shot in English */
.h32-bg{position:absolute;inset:0;z-index:-2}
.h32-bg img{width:100%;height:100%;object-fit:cover;object-position:70% 40%;display:block;transform:scaleX(var(--fx));transition:transform 1.2s ${E}}
.open-anim .h32-bg img{transform:scaleX(var(--fx)) scale(1.06);animation:h32i-fs 0s 2.5s forwards}
.is-in .h32-bg img{transform:scaleX(var(--fx));transition-delay:var(--t0,0s)}
.rv-on .h32-bg img{animation:none}
@keyframes h32i-fs{to{transform:scaleX(var(--fx))}}
/* the text sits in the bottom start corner, so the shade comes from that corner (heroes.md) */
.h32-scrim{position:absolute;inset:0;z-index:-1;background:linear-gradient(to top left,color-mix(in srgb,var(--ink) 92%,transparent) 0%,color-mix(in srgb,var(--ink) 74%,transparent) 45%,transparent 78%)}
[dir="ltr"] .h32-scrim{background:linear-gradient(to top right,color-mix(in srgb,var(--ink) 92%,transparent) 0%,color-mix(in srgb,var(--ink) 74%,transparent) 45%,transparent 78%)}
.h32h h3{margin:0;max-width:15ch;font-size:clamp(34px,min(4.4vw,7.8vh),66px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h32-date{margin:0;font-size:clamp(16px,1.2vw,19px);font-weight:600}
.h32-cd{display:flex;align-items:flex-end;gap:32px;margin:4px 0}
.h32-cd[hidden],.h32-end[hidden]{display:none}
.h32-lbl{align-self:center;font-size:15px;font-weight:600;opacity:.8}
.h32-u{display:flex;flex-direction:column;gap:4px}
/* tabular digits: a number that changes does not push its neighbours */
.h32-u b{font-size:clamp(40px,min(4.4vw,8vh),68px);line-height:1;font-weight:700;font-variant-numeric:tabular-nums}
.h32-u span{font-size:14px;opacity:.75}
.h32-u b.tk{animation:h32-tk .5s ${E}}
@keyframes h32-tk{from{opacity:0;transform:translateY(-24%)}}
.h32-end{margin:0;font-size:18px;font-weight:700}
@media (prefers-reduced-motion:reduce){.h32-bg img{transition-duration:.01ms!important;transition-delay:0s!important}.h32-u b.tk{animation:none}}
/* phone: the singer above, the text and the count at the bottom across the full width */
@media (max-width:860px){.h32h{gap:14px;min-height:min(94vh,820px);padding:88px 20px 24px}
  .h32-bg img{object-position:80% 40%}
  .h32-scrim{background:linear-gradient(to top,color-mix(in srgb,var(--ink) 92%,transparent) 0%,color-mix(in srgb,var(--ink) 70%,transparent) 50%,transparent 80%)}
  .h32h h3{font-size:clamp(28px,7.6vw,38px)}
  .h32-cd{flex-wrap:wrap;gap:12px 24px}.h32-lbl{flex-basis:100%}.h32-u b{font-size:clamp(34px,10vw,44px)}
  .h32h .hcta{width:100%;flex-wrap:nowrap}.h32h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(false)}
  <section class="h32h" id="h32">
    <div class="h32-bg">${PIC("real/s06/singer.webp", "זמרת שרה לתוך מיקרופון על במה, מאחוריה אורות מטושטשים", { pri: true })}</div>
    <span class="h32-scrim"></span>
    <span class="hkick rv">פסטיבל ערבי קיץ, גני יהושע</span>
    <h3 class="rv">שלושה ערבים של מוזיקה חיה, על הדשא ליד המים</h3>
    <p class="h32-date rv"><time datetime="2027-07-01T20:00+03:00">יום חמישי, 1 ביולי 2027, 20:00</time></p>
    <div class="h32-cd rv" role="timer" aria-label="הזמן שנשאר עד הפתיחה" hidden>
      <span class="h32-lbl">נפתח בעוד</span>
      <span class="h32-u"><b data-u="d">0</b><span>ימים</span></span>
      <span class="h32-u"><b data-u="h">0</b><span>שעות</span></span>
      <span class="h32-u"><b data-u="m">0</b><span>דקות</span></span>
    </div>
    <p class="h32-end" hidden>הערבים כבר התחילו. כרטיסים בכניסה, כל עוד נשארו.</p>
    <div class="hcta rv"><a class="hbtn" href="#h32">לכרטיסים</a><a class="hbtn ghost" href="#h32">התוכנייה</a></div>
    <p class="hmicro rv"><span>ילדים עד גיל 6 בחינם</span><span>חניה ליד הכניסה הצפונית</span></p>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h32"), cd=root.querySelector(".h32-cd"), end=root.querySelector(".h32-end"), time=root.querySelector(".h32-date time");
  var u={d:cd.querySelector('[data-u="d"]'),h:cd.querySelector('[data-u="h"]'),m:cd.querySelector('[data-u="m"]')};
  enter(root);
  // 20:00 in Israel on the opening night (UTC+3 in summer). In a project the date and the hour come from the event details in the panel
  var at=Date.UTC(2027,6,1,17,0);
  // a demo must never show an event that is over, so it moves on by a year; a project sets data-roll="0" and shows the ended line
  if(root.dataset.roll!=="0"&&at<=Date.now()){
    while(at<=Date.now()){var d=new Date(at); d.setUTCFullYear(d.getUTCFullYear()+1); at=d.getTime();}
    time.dateTime=new Date(at).toISOString();
    time.textContent=new Intl.DateTimeFormat("he-IL",{timeZone:"Asia/Jerusalem",weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(at)+", 20:00";
  }
  function set(el,v,first){
    v=String(v); if(el.textContent===v)return; el.textContent=v;
    // only a digit that really changed slides in; the first render is part of the entrance
    if(!first){el.classList.remove("tk"); void el.offsetWidth; el.classList.add("tk");}
  }
  function tick(first){
    var left=at-Date.now();
    if(left<=0){cd.hidden=true; end.hidden=false; clearInterval(iv); return;}
    var m=Math.floor(left/60000);
    set(u.d,Math.floor(m/1440),first); set(u.h,Math.floor(m%1440/60),first); set(u.m,m%60,first);
  }
  // minutes are the smallest unit, so a check every 20 seconds is enough and nothing moves on its own every second
  var iv=setInterval(tick,20000);
  cd.hidden=false; tick(true);
})();`,
  note:"ספירה לאחור שמוכרת כרטיסים ולא מלחיצה: ימים, שעות ודקות, בלי שניות, כך ששום דבר לא מהבהב כל שנייה ואין צורך בכפתור עצירה; הספרה שהשתנתה מחליקה פנימה בחצי שנייה, ובהפחתת תנועה פשוט מתחלפת. הספרות טבלאיות (tabular-nums) כדי שמספר שמשתנה לא יזיז את השכנים, ובלי אפס מוביל. היעד הוא שעה בשעון ישראל (UTC), כך שמבקר מחו\"ל רואה את אותה ספירה. בלי JS הספירה מוסתרת ונשאר התאריך הכתוב ב-time עם datetime, כך שאין מצב של אפסים או מספר שגוי. role=timer בלי הכרזות חיות, כדי שקורא מסך לא יקריא כל דקה. כשהאירוע התחיל, בפרויקט (data-roll=\"0\") הספירה מתחלפת בשורה שאומרת שהוא כבר התחיל; הדמו מגלגל שנה קדימה. הצילום מתהפך בעברית כדי שהזמרת תעמוד בצד הרחוק מהטקסט, ונשאר כפי שצולם באנגלית; לא הופכים צילום עם כיתוב או לוגו. שכבת הקריאות מהפינה התחתונה בצד של הטקסט." + NOTE_TAIL
},
{
  id:"h33", cat:"hero", name:"הירו צילום עם נקודות מוצר", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"שתי עמודות: בצד אחד הכותרת, המשפט והכפתורים, ומתחתם רשימה קצרה של מה שרואים בצילום עם מחירים. בצד השני צילום גבוה של החלל עם נקודה על כל פריט. הרשימה והנקודות מחוברות: מעבר על שורה מדגיש את הנקודה שלה, ולחיצה על שורה או על נקודה פותחת כרטיס ליד הפריט עצמו.",
  when:"עסק שהעבודה שלו היא חלל שלם ובתוכו פריטים שאפשר להזמין: מטבחים, נגרות, עיצוב פנים, ריהוט, תאורה, אופנה בצילום אווירה, חנות כלי בית. הצילום מוכר את התמונה הגדולה, והרשימה עונה על \"מה זה וכמה זה\" גם למי שלא לוחץ על נקודות. לא ליותר מחמישה פריטים, ולא לצילום שבו הפריטים קטנים מכדי לזהות.",
  libs:[],
  css:`${FRAME_CSS}
.h33h{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:56px;padding:88px 28px 28px;background:var(--bg)}
/* the text column is as tall as the photo: the pitch at the top edge, the list at the bottom edge, both lined up with it */
.h33-txt{display:flex;flex-direction:column;justify-content:space-between;gap:32px;min-width:0}
.h33-ttl{display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.h33h h3{margin:0;font-size:clamp(30px,min(3.4vw,6.6vh),56px);line-height:1.05;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h33h .hlead{max-width:42ch}
.h33h .hcta{margin-top:6px}
.h33-in{margin:0}
.h33-lab{display:block;margin-bottom:8px;font-size:14px;color:var(--muted)}
.h33-list{display:flex;flex-direction:column;gap:2px;margin:0 -14px;padding:0;list-style:none}
.h33-it{display:flex;align-items:center;gap:12px;width:100%;min-height:44px;padding:8px 14px;border:0;border-radius:12px;background:none;color:inherit;font:inherit;font-size:16px;text-align:start;cursor:pointer;transition:background-color .25s ${E}}
/* the same small circle as the point on the photo, so the two read as one thing */
.h33-it::before{content:"";flex:none;width:8px;height:8px;border-radius:50%;background:currentColor;opacity:.3;transition:opacity .25s ${E},background-color .25s ${E}}
.h33-it b{flex:1;font-weight:600}
.h33-it span{font-size:15px;color:var(--muted);white-space:nowrap}
.h33-it.hot,.h33-it[aria-expanded="true"]{background:color-mix(in srgb,var(--ink) 6%,transparent)}
.h33-it.hot::before,.h33-it[aria-expanded="true"]::before{background:var(--accent);opacity:1}
.h33-it:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
/* the frame has a fixed shape, so x and y stay plain percent of the photo: --o and --f map them through the crop (object-position 53%).
   Its width also obeys the screen height, so the whole hero fits the first screen */
.h33-fr{--o:25.8%;--f:.513;position:relative;width:min(58vw,calc((100svh - 136px) * 1.2));aspect-ratio:6/5}
.h33-fr>img{width:100%;height:100%;object-fit:cover;object-position:53% 50%;display:block;border-radius:24px}
.h33-spot{display:contents}
/* physical left, not inline-start: a point on a photo does not flip with the language */
.h33-hs{position:absolute;left:calc((var(--x) - var(--o)) / var(--f));top:var(--y);z-index:1;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;translate:-50% -50%;cursor:pointer;
  background:none;color:var(--ink);transition:opacity .4s ${E},scale .5s ${E}}
/* the dot is smaller than the 44px target, so it marks the item without hiding it */
.h33-dot{position:relative;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--bg);box-shadow:0 6px 18px -6px color-mix(in srgb,var(--ink) 75%,transparent);transition:transform .3s ${E},opacity .3s ${E},box-shadow .3s ${E}}
.h33-hs svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;transition:rotate .3s ${E}}
.h33-hs[aria-expanded="true"] svg{rotate:45deg}
.h33-hs:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
/* one item in focus (a hovered row or point, or an open card): its point grows and wears a ring, the others step back */
.h33-fr.has-hot .h33-dot{opacity:.5}
.h33-fr.has-hot .hot .h33-dot{opacity:1;transform:scale(1.15);box-shadow:0 0 0 6px color-mix(in srgb,var(--bg) 40%,transparent),0 6px 18px -6px color-mix(in srgb,var(--ink) 75%,transparent)}
.open-anim .h33-hs{opacity:0;scale:.4;animation:h33s-fs 0s 2.5s forwards}
.is-in .h33-hs{opacity:1;scale:1;transition-delay:calc(var(--t0,0s) + .5s + var(--k,0) * 80ms)}
.rv-on .h33-hs{animation:none}
@keyframes h33s-fs{to{opacity:1;scale:1}}
/* two soft rings after the entrance say "this can be pressed", then stop: under five seconds, so no pause button */
.h33-dot::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:50%;background:var(--bg);opacity:0}
.is-in .h33-dot::before{animation:h33-ring 1.6s ${E} 2;animation-delay:calc(var(--t0,0s) + 1s + var(--k,0) * 150ms)}
@keyframes h33-ring{from{opacity:.55;transform:scale(1)}to{opacity:0;transform:scale(1.9)}}
/* the card stands by its item, but never past the photo's edge */
.h33-card{position:absolute;left:clamp(128px,calc((var(--x) - var(--o)) / var(--f)),calc(100% - 128px));top:calc(var(--y) + 32px);z-index:2;display:flex;flex-direction:column;gap:4px;width:240px;padding:16px;border-radius:16px;translate:-50% 0;
  background:var(--bg);color:var(--ink);box-shadow:0 24px 48px -16px color-mix(in srgb,var(--ink) 60%,transparent);animation:h33-pop .35s ${E}}
.h33-card[hidden]{display:none}
.h33-spot[data-pos="up"] .h33-card{top:auto;bottom:calc(100% - var(--y) + 32px)}
.h33-card b{font-size:16px;font-weight:700}
.h33-card span{font-size:15px;color:var(--muted)}
.h33-card a{align-self:flex-start;margin-top:8px;font-size:15px;font-weight:700;color:inherit;text-underline-offset:4px}
@keyframes h33-pop{from{opacity:0;translate:-50% 8px}}
@keyframes h33-in{from{opacity:0}}
@media (prefers-reduced-motion:reduce){.h33-hs,.h33-dot,.h33-hs svg,.h33-it,.h33-it::before{transition-duration:.01ms!important;transition-delay:0s!important}.h33-dot::before,.h33-card{animation:none!important}}
/* phone: the pitch, then a wider crop around the island (every point moved by the same crop), then the list as two columns;
   the card is a bar across the photo, at the bottom or the top by where its point is */
@media (max-width:860px){.h33h{grid-template-columns:1fr;gap:20px;padding:72px 20px 24px}
  .h33-txt{display:contents}.h33-ttl{gap:12px}.h33-in{order:3}
  .h33h h3{font-size:clamp(28px,7.4vw,36px)}
  .h33h .hcta{width:100%;flex-wrap:nowrap;margin-top:4px}.h33h .hcta .hbtn{flex:1;padding-inline:16px}
  .h33-fr{--o:28%;--f:.534;width:100%;aspect-ratio:5/4}
  .h33-fr>img{object-position:60% 50%;border-radius:20px}
  .h33-lab{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
  .h33-list{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:0 -10px}
  .h33-it{flex-wrap:wrap;gap:2px 8px;padding:8px 10px;font-size:14px}.h33-it span{flex-basis:100%;padding-inline-start:16px;font-size:13px}
  .h33-card,.h33-spot[data-pos="up"] .h33-card{left:12px;right:12px;top:auto;bottom:12px;width:auto;padding:12px 14px;gap:2px;translate:none;animation-name:h33-in}
  .h33-card a{margin-top:4px}
  .h33-spot[data-ph="top"] .h33-card{top:12px;bottom:auto}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h33h" id="h33">
${(() => {
      // one source for both the list and the points; x and y are percent of the whole photo, measured on it
      const IT = [
        { x: 47.8, y: 34, pos: "down", ph: "bottom", name: "מנורת זכוכית מחורצת", price: "1,290 ₪", unit: "ליחידה", more: "ענבר או שקוף, שלושה גבהים" },
        { x: 51.5, y: 53, pos: "up", ph: "bottom", name: "חיפוי קיר משיש", price: "מ-480 ₪", unit: "למ״ר", more: "לוחות שלמים של 120 ס״מ, בלי פוגות" },
        { x: 33.8, y: 59, pos: "up", ph: "top", name: "ברז פליז מוברש", price: "1,650 ₪", unit: "", more: "ראש נשלף, צינור נירוסטה" },
        { x: 69.5, y: 76, pos: "up", ph: "top", name: "כיסא בר מעור ועץ", price: "890 ₪", unit: "לכיסא", more: "גובה ישיבה 65 ס״מ, אגוז או אלון" },
      ];
      const plus = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;
      const rows = IT.map((t, k) => `
            <li><button class="h33-it" type="button" data-k="${k}" aria-expanded="false" aria-controls="h33-c${k}"><b>${t.name}</b><span>${t.price}</span></button></li>`).join("");
      const spots = IT.map((t, k) => `
      <div class="h33-spot" style="--x:${t.x}%;--y:${t.y}%;--k:${k}" data-k="${k}" data-pos="${t.pos}" data-ph="${t.ph}">
        <button class="h33-hs" type="button" data-k="${k}" aria-expanded="false" aria-controls="h33-c${k}" aria-label="${t.name}"><span class="h33-dot">${plus}</span></button>
        <div class="h33-card" id="h33-c${k}" hidden><b>${t.name}</b><span>${t.more}</span><span>${t.price}${t.unit ? " " + t.unit : ""}</span><a href="#h33">לפרטים</a></div>
      </div>`).join("");
      return `    <div class="h33-txt">
      <div class="h33-ttl">
        <span class="hkick rv">מטבחים בהזמנה אישית, נגרייה בשרון</span>
        <h3 class="rv">מטבח שנבנה סביב הדרך שבה אתם מבשלים</h3>
        <p class="hlead rv">תכנון, ייצור בנגרייה שלנו והתקנה, עם החומרים והפרזול שבחרתם. כל מה שרואים בצילום אפשר להזמין.</p>
        <div class="hcta rv"><a class="hbtn" href="#h33">לפגישת תכנון</a><a class="hbtn ghost" href="#h33">עוד מטבחים</a></div>
      </div>
      <div class="h33-in rv">
        <span class="h33-lab" id="h33-lab">בצילום הזה</span>
        <ul class="h33-list" aria-labelledby="h33-lab">${rows}
        </ul>
      </div>
    </div>
    <div class="h33-fr rv">
      ${PIC("real/s13/proj-c.webp", "מטבח בגוון אפור כהה עם אי ארוך, חיפוי שיש מאחור, מנורות זכוכית תלויות ושני כיסאות בר", { pri: true })}${spots}
    </div>`;
    })()}
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h33"), fr=root.querySelector(".h33-fr"), open=-1, opener=null, hov=-1;
  enter(root);
  function all(k){return root.querySelectorAll('[data-k="'+k+'"]');}
  // the item in focus is the hovered one, or else the open one; it lights up in the list and on the photo together
  function paint(){
    var k=hov>=0?hov:open;
    root.querySelectorAll(".hot").forEach(function(e){e.classList.remove("hot");});
    if(k>=0)all(k).forEach(function(e){e.classList.add("hot");});
    fr.classList.toggle("has-hot",k>=0);
  }
  function close(back){
    if(open<0)return;
    document.getElementById("h33-c"+open).hidden=true;
    all(open).forEach(function(e){if(e.hasAttribute("aria-expanded"))e.setAttribute("aria-expanded","false");});
    if(back&&opener)opener.focus();
    open=-1; opener=null; paint();
  }
  // a row and its point open the same card, by its item; one card at a time
  root.querySelectorAll(".h33-it,.h33-hs").forEach(function(b){
    var k=+b.dataset.k;
    b.addEventListener("click",function(){
      var same=open===k; close(false); if(same)return;
      document.getElementById("h33-c"+k).hidden=false;
      all(k).forEach(function(e){if(e.hasAttribute("aria-expanded"))e.setAttribute("aria-expanded","true");});
      open=k; opener=b; paint();
    });
    b.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse"){hov=k;paint();}});
    b.addEventListener("pointerleave",function(){hov=-1;paint();});
    b.addEventListener("focus",function(){if(b.matches(":focus-visible")){hov=k;paint();}});
    b.addEventListener("blur",function(){hov=-1;paint();});
  });
  // Escape or a press anywhere else closes it, and Escape returns the focus to whatever opened it
  document.addEventListener("keydown",function(e){if(e.key==="Escape")close(true);});
  document.addEventListener("click",function(e){if(open>=0&&!e.target.closest(".h33-hs,.h33-it,.h33-card"))close(false);});
})();`,
  note:"צילום אווירה שהוא גם קטלוג, בשתי עמודות שמיושרות זו לזו: העמודה של הטקסט גבוהה בדיוק כמו הצילום, ההצעה צמודה לקצה העליון שלו והרשימה \"בצילום הזה\" לקצה התחתון. הרשימה והנקודות נכתבות מאותו מערך נתונים ומחוברות: מעבר עכבר או פוקוס מקלדת על שורה מגדיל את הנקודה שלה עם טבעת ומחליש את האחרות, וההפך; לחיצה על שורה או על נקודה פותחת את אותו כרטיס ליד הפריט, עם שורת פרטים, מחיר וקישור. כך מי שלא לוחץ על נקודות עדיין רואה מה יש ובכמה, וקורא מסך מקבל רשימה רגילה של כפתורים עם aria-expanded. למסגרת יש צורה קבועה (6/5), ולכן המיקום של כל נקודה הוא אחוזים מהצילום המלא (--x, --y), שעוברים דרך החיתוך עם --o ו---f, במיקום פיזי (left) שלא מתהפך עם השפה; הרוחב שלה תלוי גם בגובה המסך, כך שההירו כולו נכנס במסך הראשון. הכרטיס לא יוצא מקצה הצילום (clamp). כרטיס אחד פתוח בכל פעם, Escape או לחיצה בחוץ סוגרים, ו-Escape מחזיר את הפוקוס למה שפתח אותו. שתי טבעות רכות אחרי הכניסה אומרות שאפשר ללחוץ, ונעצרות לפני חמש שניות. בטלפון: ההצעה, צילום שנחתך סביב האי (כל הנקודות זזות לפי אותו חיתוך), והרשימה בשתי עמודות; הכרטיס הופך לפס ברוחב הצילום, למטה או למעלה לפי מקום הנקודה. בפרויקט מודדים את המיקומים על הצילום הסופי, ובחנות הכרטיס מקשר לעמוד המוצר." + NOTE_TAIL
},
{
  id:"h34", cat:"hero", name:"הירו סרטון רחב כמו בקולנוע", tech:"CSS · JS", status:"מאושר-עין", runway:false,
  desc:"סרטון רחב ונמוך, כמו פתיחה של סרט, שנפתח מקו דק לגובה מלא, ומתחתיו כותרת בצד אחד ומשפט וכפתורים בצד השני. הסרטון מתנגן בלולאה שקטה ויש לו כפתור עצירה.",
  when:"עסק שיש לו סרטון קצר ושקט שמראה את החוויה: נסיעות וחופשות, מלון, צימר, יקב, אירועים, ספורט ים, אדריכלות. הפורמט הרחב משאיר מקום לטקסט במסך הראשון בלי לכתוב על הסרטון. לא בלי סרטון אמיתי של העסק, ולא לסרטון אנכי מהטלפון, שם h3 עם צילום.",
  libs:[],
  css:`${PP_CSS}
${FRAME_CSS}
.h34h{display:flex;flex-direction:column;justify-content:center;gap:28px;min-height:min(86vh,780px);padding:88px 28px 28px;background:var(--bg)}
/* a letterbox, wider than any screen: on a low laptop it gets wider still, never taller */
.h34-fr{position:relative;width:100%;aspect-ratio:2.4/1;max-height:46vh;border-radius:24px;overflow:hidden;background:var(--ink);clip-path:inset(0 round 24px);transition:clip-path .9s ${E}}
.h34-fr img,.h34-fr video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.h34-fr video{opacity:0;transition:opacity .6s ${E}}
.h34-fr video.on{opacity:1}
/* it opens from a thin line across the middle, like a curtain of a film */
.open-anim .h34-fr{clip-path:inset(48% 0 round 24px);animation:h34f-fs 0s 2.5s forwards}
.is-in .h34-fr{clip-path:inset(0 round 24px);transition-delay:var(--t0,0s)}
.rv-on .h34-fr{animation:none}
@keyframes h34f-fs{to{clip-path:inset(0 round 24px)}}
.h34-fr .hpp{position:absolute;inset-block-end:16px;inset-inline-end:16px;z-index:1}
.h34-fr .hpp[hidden]{display:none}
.h34-bot{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:end;gap:20px 56px}
.h34-ttl,.h34-side{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.h34-side{gap:20px}
.h34h h3{margin:0;max-width:14ch;font-size:clamp(34px,min(4.4vw,7.8vh),66px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h34h .hlead{max-width:42ch}
@media (prefers-reduced-motion:reduce){.h34-fr,.h34-fr video{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:860px){.h34h{gap:20px;min-height:0;padding:72px 20px 24px}
  .h34-fr{aspect-ratio:16/9;max-height:none}
  .h34-bot{grid-template-columns:1fr;gap:14px}.h34-ttl{gap:12px}.h34-side{gap:16px}
  .h34h h3{font-size:clamp(30px,8vw,40px)}
  .h34h .hcta{width:100%;flex-wrap:nowrap}.h34h .hcta .hbtn{flex:1;padding-inline:16px}}`,
  html:`${OPEN_GATE}
<div class="hf">${TOP(true)}
  <section class="h34h" id="h34">
    <div class="h34-fr">
      ${PIC("dive/reel.webp", "חוף מלמעלה: גלים לבנים על חול זהוב ומים בצבע טורקיז", { pri: true })}
      <video muted loop playsinline preload="none" aria-hidden="true" poster="../assets/media/dive/reel.webp" data-src="../assets/media/dive/reel-720.mp4"></video>
      ${PP("עצירת הסרטון").replace("<button ", "<button hidden ")}
    </div>
    <div class="h34-bot">
      <div class="h34-ttl">
        <span class="hkick rv" style="--i:2">חופשות בוטיק באיים</span>
        <h3 class="rv" style="--i:3">חופשה באי, בלי לתכנן אותה לבד</h3>
      </div>
      <div class="h34-side">
        <p class="hlead rv" style="--i:4">טיסות, מלון קטן על החוף, העברות וסיורים, בתוכנית אחת שבנינו בשבילכם. נשאר רק לארוז.</p>
        <div class="hcta rv" style="--i:5"><a class="hbtn" href="#h34">לבניית חופשה</a><a class="hbtn ghost" href="#h34">כל היעדים</a></div>
      </div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h34"), v=root.querySelector("video"), pp=root.querySelector(".hpp");
  enter(root);
  // fetched only once the hero is on screen, and it plays for everyone, reduced motion included (motion.md 2א):
  // a video that never starts looks like a stuck site. The button is the way to stop it
  inView(root,function(){
    v.src=v.dataset.src; v.muted=true; v.setAttribute("autoplay","");
    // a blocked autoplay never adds the class: the poster stays and the hero is still whole
    var p=v.play(); if(p&&p.then)p.then(on,function(){}); else on();
  });
  function on(){v.classList.add("on"); pp.hidden=false;}
  pp.addEventListener("click",function(){
    var stop=!v.paused; if(stop)v.pause(); else{var p=v.play(); if(p&&p.catch)p.catch(function(){});}
    pp.setAttribute("aria-pressed",String(stop)); pp.setAttribute("aria-label",stop?"הפעלת הסרטון":"עצירת הסרטון");
  });
})();`,
  note:"הפורמט הרחב (2.4 על 1) הוא מה שמבדיל את ההירו הזה מסרטון רקע: הסרטון לא נמתח על כל המסך ולא צריך שכבת קריאות, והטקסט יושב מתחתיו על רקע נקי, כך שהוא קריא בכל עור. במסך נמוך הגובה נעצר ב-46% מהמסך והסרטון רק נהיה רחב יותר, כדי שהכותרת והכפתורים תמיד יישארו במסך הראשון. הפתיחה היא קו דק באמצע שנפתח לגובה מלא (clip-path), והכותרת עולה כשהסרטון כמעט פתוח. הסרטון נטען רק כשההירו על המסך, מתנגן גם בהפחתת תנועה עם כפתור עצירה והפעלה שמופיע רק כשהוא באמת רץ (motion.md 2א, WCAG 2.2.2); אם הדפדפן חוסם, הפוסטר נשאר, ולכן הפוסטר הוא פריים מתוך הסרטון. הסרטון מוסתר מקורא מסך כי הוא אווירה, והתמונה שמתחתיו נושאת את התיאור. בטלפון היחס 16 על 9. סרטון של שש עד עשר שניות, בלי חיתוכים חדים, עד 2MB." + NOTE_TAIL
}
];
