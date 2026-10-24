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
  id:"h9", cat:"hero", name:"הירו כותרת עם תמונות בתוך השורה", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h10", cat:"hero", name:"הירו טקסט במרכז ותמונות בכנפיים", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h11", cat:"hero", name:"הירו צילום רחב למעלה וטקסט מתחתיו", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h12", cat:"hero", name:"הירו סנדוויץ': שורה, רצועת צילום, שורה", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h13", cat:"hero", name:"הירו קשתות שעולות מהתחתית", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h14", cat:"hero", name:"הירו עם עמודות תמונות שזזות", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h15", cat:"hero", name:"הירו מצגת מסך מלא עם פסי התקדמות", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h16", cat:"hero", name:"הירו עם טופס לידים בתוך ההירו", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h17", cat:"hero", name:"הירו צילום מלא עם שורת הזמנה", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h18", cat:"hero", name:"הירו אפליקציה: טלפון שעולה מתחת לכותרת", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h19", cat:"hero", name:"הירו לפני ואחרי עם ידית גרירה", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"טקסט בצד אחד, ובצד השני אותו חדר פעמיים, לפני ואחרי, עם ידית שגוררים לרוחב. אחרי הכניסה הידית זזה פעם אחת לבד כדי להראות שאפשר, ומשם היא של המבקר: בעכבר, במגע ובמקלדת.",
  when:"עסק שהתוצאה שלו נראית: תאורה, שיפוצים, ניקיון, צביעה, גינון, אסתטיקה, עריכת תמונות. עובד רק עם זוג צילומים מאותה זווית בדיוק. לא כשאין צילום \"לפני\" אמיתי; אז h11.",
  libs:[],
  css:`${FRAME_CSS}
.h19h{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;min-height:min(84vh,760px);padding:88px 28px 28px;background:color-mix(in srgb,var(--ink) 4%,var(--bg))}
.h19-txt{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:24px;padding-block:24px 40px}
.h19h h3{margin:0;max-width:12ch;font-size:clamp(34px,min(4vw,7.8vh),66px);line-height:1.04;font-weight:700;letter-spacing:-.01em;text-wrap:balance}
.h19h .hlead{max-width:40ch}
/* the comparison is always left to right, with "before" on the right, the side a Hebrew reader meets first; --p is the handle */
.h19-cmp{--p:50%;position:relative;border-radius:20px;overflow:hidden;background:var(--ink);clip-path:inset(0 round 20px);transition:clip-path .9s ${E}}
.h19-cmp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:30% 50%;display:block}
.h19-bef{clip-path:inset(0 0 0 var(--p));filter:grayscale(.7) brightness(.45) contrast(.9)}
.h19-lab{position:absolute;top:16px;z-index:1;padding:6px 12px;border-radius:999px;font-size:13px;font-weight:700;background:color-mix(in srgb,var(--ink) 55%,transparent);color:var(--bg);
  -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);pointer-events:none}
.h19-lab.b{right:16px}
.h19-lab.a{left:16px}
.h19-hdl{position:absolute;top:0;bottom:0;left:var(--p);z-index:1;width:3px;background:var(--bg);transform:translateX(-50%);pointer-events:none}
.h19-knob{position:absolute;top:50%;left:50%;width:52px;height:52px;border-radius:999px;display:grid;place-items:center;background:var(--bg);color:var(--ink);transform:translate(-50%,-50%);
  box-shadow:0 10px 30px -8px color-mix(in srgb,var(--ink) 50%,transparent)}
.h19-knob svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
/* a native range over the whole picture: drag, touch and arrow keys for free. It is invisible; the knob shows its focus */
.h19-rng{position:absolute;inset:0;z-index:2;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;touch-action:pan-y}
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
  function set(v){cmp.style.setProperty("--p",v+"%");}
  function say(){rng.setAttribute("aria-valuetext",rng.value+" אחוז מהתמונה אחרי");}
  rng.addEventListener("input",function(){touched=true; set(rng.value); say();});
  say();
  // one hint, once: after the entrance the handle swings right and back, only when motion is allowed and nobody touched it
  if(!matchMedia("(prefers-reduced-motion:no-preference)").matches)return;
  inView(root,function(){setTimeout(function(){
    var t0=0;
    requestAnimationFrame(function f(now){
      if(touched)return; if(!t0)t0=now;
      var k=Math.min((now-t0)/1200,1);
      set(k<1?(50+16*Math.sin(k*Math.PI*2)*(1-k/2)).toFixed(2):50);
      if(k<1)requestAnimationFrame(f);
    });
  },1000);});
})();`,
  note:"זה ההירו שמראה במקום לספר: אותו חדר בשני מצבים, והמבקר עושה את ההשוואה בעצמו. הידית היא input מסוג range אמיתי ושקוף שמכסה את כל התמונה, ולכן גרירה בעכבר, נגיעה בטלפון וחיצים במקלדת עובדים בלי קוד גרירה, והפוקוס שלו מצויר על העיגול. ההשוואה תמיד משמאל לימין, עם \"לפני\" בצד ימין, הצד שקורא עברית פוגש ראשון, והשכבה העליונה נחתכת ב-clip-path לפי --p, בלי לשנות רוחב. אחרי הכניסה הידית זזה פעם אחת לבד, ימינה וחזרה, וזה במקום הוראה כתובה; היא לא זזה אם המבקר כבר נגע בה, ולא בהפחתת תנועה. הקו של הידית הוא חלק מהפקד, לא קישוט. בדמו ה\"לפני\" הוא אותו צילום, מוחשך ודהוי ב-filter; בפרויקט שמים שני צילומים אמיתיים מאותה זווית, אחרת ההשוואה נראית מזויפת." + NOTE_TAIL
},
{
  id:"h20", cat:"hero", name:"הירו שם ענק על צילום מלא", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h21", cat:"hero", name:"הירו גריד מגזין", tech:"CSS · JS", status:"ממתין", runway:false,
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
  id:"h22", cat:"hero", name:"הירו מניפת כרטיסים", tech:"CSS · JS", status:"ממתין", runway:false,
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
  transform-origin:50% 230%;rotate:calc(var(--r) * var(--k));box-shadow:0 24px 50px -24px color-mix(in srgb,var(--ink) 45%,transparent);transition:rotate .8s ${E},translate .45s ${E},opacity .5s ${E}}
.h22-card img{width:100%;height:100%;object-fit:cover;display:block}
/* each label sits on the edge the next card does not cover: right-hand cards on their right, left-hand cards on their left */
.h22-lab{position:absolute;top:12px;inset-inline-start:10px;padding:6px 10px;border-radius:999px;background:var(--bg);color:var(--ink);font-size:13px;font-weight:700;white-space:nowrap}
.h22-card.lft .h22-lab{inset-inline-start:auto;inset-inline-end:10px}
.h22-card.txt{display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;gap:8px;padding:20px;background:var(--accent);color:var(--accent-ink);text-align:start}
.h22-card.txt span{font-size:13px;font-weight:600;opacity:.85}
.h22-card.txt b{font-size:clamp(18px,1.5vw,22px);line-height:1.2;text-wrap:balance}
.open-anim .h22-card{rotate:0deg;translate:0 40%;opacity:0;animation:h22-fs 0s 2.5s forwards}
.is-in .h22-card{rotate:calc(var(--r) * var(--k));translate:0 0;opacity:1;transition-delay:calc(var(--t0,0s) + .25s + var(--d) * 60ms)}
.rv-on .h22-card{animation:none}
@keyframes h22-fs{to{rotate:calc(var(--r) * var(--k));translate:0 0;opacity:1}}
@media (hover:hover) and (pointer:fine){.h22-card:hover{translate:0 -20px;z-index:9;transition-delay:0s}}
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
enter(document.getElementById("h22"));`,
  note:"כל הכרטיסים יושבים באותה נקודה ותלויים מציר אחד שנמצא הרחק מתחתם (transform-origin של 170%), כך שזווית שונה לכל אחד (--r) פותחת אותם למניפה, בלי לחשב מיקומים. הכניסה מתחילה בערימה סגורה שעולה מלמטה ונפתחת מהאמצע החוצה. הזווית וההזזה הן תכונות נפרדות (rotate ו-translate), ולכן הריחוף מרים כרטיס בלי לשבור את הזווית שלו ובלי להתנגש בכניסה. הכרטיס האמצעי הוא טקסט בצבע המותג (הטעם של השבוע), ולכן המניפה אומרת משהו ולא רק מראה תמונות; התמונות דקורטיביות, והשם הקצר על כל כרטיס הוא הטקסט שלו. הכרטיסים נחתכים בקצה התחתון של ההירו בכוונה, כמו קלפים ביד. בטלפון נשארים שלושה." + NOTE_TAIL
}
];
