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
}
];
