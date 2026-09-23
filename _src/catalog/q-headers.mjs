// Headers family (22.9.2026). Liav: "every site you built had the exact same header". Eight headers for eight uses,
// five of them floating. All share one behaviour, the doctrine default from this date: headroom. The header leaves
// on scroll down and comes back on the first scroll up, always visible at the top, while a menu is open, and while
// keyboard focus is inside it. Mobile menus reuse the vault drawer from p-menus.mjs (b66), so there is one drawer.
import { DRAWER_CSS, DRAWER_JS } from "./p-menus.mjs";

// ---- the headroom engine: one function, every header ----
const HR_JS = `
function headroom(el,opt){
  opt=opt||{};
  // in the vault the page is a scrolling frame; on a real site there is no [data-scroller] and it listens to window
  var sc=el.closest("[data-scroller]")||window, tol=opt.tol||6, last=0, raf=0;
  function pos(){return sc===window?window.scrollY:sc.scrollTop;}
  function upd(){
    raf=0;
    var y=pos(), d=y-last, top=opt.top!=null?opt.top:el.offsetHeight+24;
    el.classList.toggle("is-scrolled",y>8);
    if(opt.on)opt.on(y);
    // hold: an open menu, or keyboard focus inside the header, keeps it on screen
    var hold=el.classList.contains("menu-open")||!!el.querySelector(":focus-visible");
    if(y<=top||hold){el.classList.remove("is-hidden");last=y;return;}
    // tolerance: a slow trackpad drift does not flicker it; the distance accumulates until it is a real gesture
    if(Math.abs(d)<tol)return;
    el.classList.toggle("is-hidden",d>0);
    last=y;
  }
  sc.addEventListener("scroll",function(){if(!raf)raf=requestAnimationFrame(upd);},{passive:true});
  el.addEventListener("focusin",upd);
  last=pos(); upd();
  return upd;
}`;

// ---- demo scaffolding: a scrolling mini page, not part of the header you copy ----
const FRAME_CSS = `
/* ---- demo frame (not part of the header): a scrolling mini page ---- */
.hx{position:relative;height:min(80vh,760px);overflow:auto;overscroll-behavior:contain;margin-inline:var(--gutter);border:1px solid var(--line);border-radius:var(--r);background:var(--bg);isolation:isolate;scrollbar-width:thin}
.hx-slot{position:sticky;top:0;height:0;z-index:20}
.hx-hero{min-height:86%;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;padding:112px var(--gutter) 64px;
  background:linear-gradient(160deg,color-mix(in srgb,var(--accent) 34%,var(--ink)),var(--ink) 72%);color:var(--bg)}
.hx-hero.is-light{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 9%,var(--bg)),var(--bg));color:var(--ink)}
.hx-hero small{font-size:14px;font-weight:600;opacity:.8}
.hx-hero h3{margin:0;max-width:16ch;font-size:clamp(34px,4.4vw,72px);line-height:1.02;font-weight:700}
.hx-hero p{margin:0;max-width:44ch;font-size:17px;line-height:1.5;opacity:.82}
.hx-sec{display:grid;grid-template-columns:1fr 1.2fr;gap:var(--gap);align-items:center;padding:96px var(--gutter);border-top:1px solid var(--line);scroll-margin-top:88px}
.hx-sec h4{margin:0 0 12px;font-size:clamp(24px,2.2vw,36px);line-height:1.1}
.hx-sec p{margin:0;max-width:40ch;font-size:16px;line-height:1.6;color:var(--muted)}
.hx-blk{aspect-ratio:4/3;border-radius:var(--r);background:color-mix(in srgb,var(--ink) 7%,var(--bg))}
@media (max-width:700px){.hx{height:78vh}.hx-sec{grid-template-columns:1fr;padding:64px var(--gutter)}.hx-hero{padding:112px var(--gutter) 48px}}

/* ---- shared header atoms ---- */
.hlogo{font-weight:800;font-size:19px;white-space:nowrap;color:inherit}
.hlink{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:999px;font-size:15px;font-weight:500;color:inherit;opacity:.78;
  transition:opacity .15s cubic-bezier(.2,.6,.2,1),background .18s cubic-bezier(.2,.6,.2,1)}
.hbtn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:12px;background:var(--accent);color:var(--accent-ink);
  font-size:14px;font-weight:600;white-space:nowrap;transition:transform .18s cubic-bezier(.2,.6,.2,1),background .3s cubic-bezier(.2,.6,.2,1),color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hlink:hover{opacity:1}.hbtn:hover{transform:translateY(-1px)}}
.hd .burger{display:none}
@media (prefers-reduced-motion:reduce){.hd,.hd *{transition-duration:.01ms!important;transition-delay:0s!important}}`;

const BASE_CSS = FRAME_CSS + DRAWER_CSS;

const SECTIONS = `
  <section class="hx-sec" id="s1"><div><h4>גוללים למטה</h4><p>ההדר יוצא מהמסך ומפנה את כל הגובה לתוכן. אין סיבה שהוא יתפוס שבעים פיקסלים בזמן שקוראים.</p></div><div class="hx-blk"></div></section>
  <section class="hx-sec" id="s2"><div><h4>ומתחילים לעלות</h4><p>ההדר חוזר מיד, בתנועה הראשונה למעלה, בלי לחכות שנגיע לראש העמוד. מי שגולל למעלה מחפש לאן ללכת.</p></div><div class="hx-blk"></div></section>
  <section class="hx-sec" id="s3"><div><h4>ובראש העמוד</h4><p>שם הוא תמיד גלוי. וגם כשהתפריט פתוח, או כשמנווטים במקלדת והפוקוס בתוכו.</p></div><div class="hx-blk"></div></section>`;

const hero = (light, kicker, title, text) => `
  <section class="hx-hero${light ? " is-light" : ""}" id="top"><small>${kicker}</small><h3>${title}</h3><p>${text}</p></section>`;

const frame = (header, heroHtml, after = "") => `<div class="hx" data-scroller tabindex="0" aria-label="דמו: עמוד שנגלל">
  <div class="hx-slot">${header}</div>${heroHtml}${SECTIONS}
</div>${after}`;

const X_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const PHONE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`;
const BURGER = id => `<button class="burger" type="button" aria-label="פתיחת תפריט" aria-expanded="false" aria-controls="${id}"><i></i><i></i><i></i></button>`;
const NAV = `<a class="hlink" href="#s1">שירותים</a><a class="hlink" href="#s2">פרויקטים</a><a class="hlink" href="#s3">אודות</a><a class="hlink" href="#s3">צור קשר</a>`;
const DRAWER = id => `
<div class="md" id="${id}"><div class="md-scrim"></div>
  <nav class="md-panel" aria-label="תפריט">
    <div class="md-top"><strong>לוגו</strong><button class="md-close" type="button" aria-label="סגירת תפריט">${X_SVG}</button></div>
    <ul class="md-list">
      <li class="md-item"><a class="md-link" href="#top">ראשי</a></li>
      <li class="md-item"><a class="md-link" href="#s1">שירותים</a></li>
      <li class="md-item"><a class="md-link" href="#s2">פרויקטים</a></li>
      <li class="md-item"><a class="md-link" href="#s3">אודות</a></li>
      <li class="md-item"><a class="md-link" href="#s3">צור קשר</a></li>
    </ul>
    <div class="md-cta"><a href="#s3">לתיאום שיחה</a></div>
  </nav>
</div>`;
const withDrawer = (sel, id) => `${DRAWER_JS}
${HR_JS}
headroom(document.querySelector("${sel}"));
drawer(document.getElementById("${id}"), document.querySelector("${sel} .burger"));`;

// the glass layer: blur and fill sit on ::before, never on the header itself (grid.md trap 1: a filtered parent jails fixed children)
const GLASS = (sel, fill = 80) => `${sel}::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:color-mix(in srgb,var(--card) ${fill}%,transparent);
  backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);border:1px solid color-mix(in srgb,var(--ink) 10%,transparent);
  box-shadow:0 8px 24px color-mix(in srgb,var(--ink) 8%,transparent);transition:box-shadow .3s cubic-bezier(.2,.6,.2,1),background .3s cubic-bezier(.2,.6,.2,1)}`;

export default [
{
  id:"hd1", cat:"header", name:"הדר קלאסי: שקוף על ההירו, אטום בגלילה", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"לוגו, ניווט וכפתור. על ההירו הוא שקוף ובצבע בהיר, ובגלילה הראשונה מקבל משטח וקו תחתון ומתהפך לכהה. גוללים למטה והוא יוצא, עולים והוא חוזר.",
  when:"ברירת המחדל לאתרי תדמית ושירותים עם הירו כהה או צילומי. הוא ההדר שהיה בכל האתרים עד עכשיו, ולכן הוא נבחר רק כשאין סיבה לאחר: עסק מוכר, קהל שמרני, תוכן שהוא העיקר.",
  libs:[],
  css:`${BASE_CSS}
.h1x{position:absolute;inset-inline:0;top:0;display:flex;align-items:center;gap:32px;padding:16px var(--gutter);color:var(--bg);isolation:isolate;
  transition:transform .4s cubic-bezier(.2,.6,.2,1),color .3s cubic-bezier(.2,.6,.2,1)}
.h1x::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--card);border-bottom:1px solid var(--line);opacity:0;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.h1x.is-scrolled{color:var(--ink)}
.h1x.is-scrolled::before{opacity:1}
.h1x.is-hidden{transform:translateY(-100%)}
.h1x nav{display:flex;gap:4px;margin-inline-start:auto}
.h1x .hbtn{background:var(--bg);color:var(--ink)}
.h1x.is-scrolled .hbtn{background:var(--accent);color:var(--accent-ink)}
.h1x .burger{border-color:currentColor}
.h1x .burger i{background:currentColor}
@media (max-width:900px){.h1x nav,.h1x .hbtn{display:none}.h1x .burger{display:grid;margin-inline-start:auto}}`,
  html:frame(`<header class="h1x hd"><a class="hlogo" href="#top">לוגו</a><nav aria-label="ראשי">${NAV}</nav><a class="hbtn" href="#s3">לתיאום שיחה</a>${BURGER("md-h1")}</header>`,
    hero(false, "משרד לייעוץ עסקי", "מסדרים לכם את המספרים, ואת השקט", "גללו בתוך המסגרת: ההדר מקבל משטח בגלילה הראשונה, יוצא כשממשיכים למטה, וחוזר בתנועה הראשונה למעלה."), DRAWER("md-h1")),
  js:withDrawer(".h1x", "md-h1"),
  note:"שני מצבים ושתי התנהגויות, והם בלתי תלויים: is-scrolled (משטח, מעל 8 פיקסלים) ו-is-hidden (headroom). המשטח יושב על ::before ומופיע בשקיפות, כך שהטקסט מתהפך מבהיר לכהה בלי קפיצה. ההסתרה היא translateY בלבד, בלי שינוי גובה, ולכן אין תזוזת עמוד. סף של 6 פיקסלים מצטבר מונע ריצוד בגלילת טראקפד איטית, ובראש העמוד (עד גובה ההדר ועוד 24) הוא תמיד גלוי."
},
{
  id:"hd2", cat:"header", name:"הדר מפוצל: הלוגו במרכז, הניווט בצדדים", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הלוגו יושב באמצע כמו כותרת של מגזין, הניווט בצד אחד והפעולה בצד השני. כפתור הפעולה בקו מתאר ולא במילוי, כדי שהלוגו יישאר הדבר הראשון שרואים.",
  when:"עסקים של טעם ששמם הוא המותג: סטודיו לעיצוב פנים, אדריכלות, מסעדה, בוטיק, צלם, מעצבת תכשיטים. לא לאתר עם יותר מחמישה פריטי ניווט, כי הצד מתמלא לפני המרכז.",
  libs:[],
  css:`${BASE_CSS}
.h2x{position:absolute;inset-inline:0;top:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;padding:16px var(--gutter);color:var(--ink);isolation:isolate;
  transition:transform .4s cubic-bezier(.2,.6,.2,1)}
.h2x::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--card);border-bottom:1px solid var(--line);opacity:0;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.h2x.is-scrolled::before{opacity:1}
.h2x.is-hidden{transform:translateY(-100%)}
.h2x nav{display:flex;gap:4px}
.h2x .hlogo{font-size:26px;font-weight:700;text-align:center}
.h2-end{display:flex;align-items:center;justify-content:flex-end;gap:8px}
.h2x .hbtn{background:none;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink)}
.h2-call{display:none;width:44px;height:44px;border-radius:12px;place-items:center;box-shadow:inset 0 0 0 1px var(--line)}
.h2-call svg{width:18px;height:18px}
@media (hover:hover) and (pointer:fine){.h2x .hbtn:hover{background:var(--ink);color:var(--bg)}}
/* mobile: the burger lives inside nav, so hide the links, never the nav itself */
@media (max-width:900px){.h2x{grid-template-columns:44px 1fr 44px}.h2x .hlink,.h2x .hbtn{display:none}.h2x .burger{display:grid}.h2-call{display:grid}}`,
  html:frame(`<header class="h2x hd"><nav aria-label="ראשי">${BURGER("md-h2")}<a class="hlink" href="#s1">פרויקטים</a><a class="hlink" href="#s2">הסטודיו</a><a class="hlink" href="#s3">תהליך</a></nav><a class="hlogo" href="#top">נוף</a><div class="h2-end"><a class="hlink" href="#s3">יומן</a><a class="hbtn" href="#s3">לפגישת היכרות</a><a class="h2-call" href="#s3" aria-label="התקשרו">${PHONE_SVG}</a></div></header>`,
    hero(true, "סטודיו לעיצוב פנים", "בית שמרגיש נכון בשמונה בבוקר", "הלוגו במרכז נותן לשם את הבמה. גללו ובדקו שההדר יוצא וחוזר, ושבמובייל הלוגו נשאר ממורכז בין ההמבורגר לכפתור השיחה."), DRAWER("md-h2")),
  js:withDrawer(".h2x", "md-h2"),
  note:"הגריד 1fr auto 1fr הוא מה שמחזיק את הלוגו במרכז האמיתי של המסך גם כשהצדדים לא שווים באורכם; flex עם space-between היה מזיז אותו לצד הקצר. במובייל העמודות הופכות ל-44px 1fr 44px: המבורגר, לוגו, כפתור שיחה, והלוגו עדיין באמצע. ההמבורגר יושב בתוך ה-nav כדי שיירש את המיקום בצד הנכון ב-RTL וב-LTR בלי חוק נוסף."
},
{
  id:"hd3", cat:"header", name:"הדר גלולה צפה", tech:"CSS · JS · backdrop-filter", status:"ממתין", runway:false,
  desc:"קפסולה מעוגלת שמרחפת מעל התוכן במרחק מהקצה, עם זכוכית עמומה. בגלילה היא מתכווצת מעט ומקבלת צל, יוצאת למעלה בגלילה מטה וחוזרת מעלה.",
  when:"טכנולוגיה, סטארטאפ, סטודיו, מוצר, ייעוץ מודרני. כל אתר שרוצה להיראות עכשווי ולא תבניתי. עד חמישה פריטי ניווט, כי הקפסולה צרה מרוחב המסך.",
  libs:[],
  css:`${BASE_CSS}
.h3x{position:absolute;top:16px;inset-inline:0;margin-inline:auto;width:min(880px,calc(100% - 32px));display:flex;align-items:center;gap:16px;padding:8px;padding-inline-start:24px;
  border-radius:999px;isolation:isolate;color:var(--ink);--hy:0px;--hs:1;transform:translateY(var(--hy)) scale(var(--hs));transition:transform .45s cubic-bezier(.2,.6,.2,1)}
${GLASS(".h3x", 78)}
.h3x.is-scrolled{--hs:.97}
.h3x.is-scrolled::before{background:color-mix(in srgb,var(--card) 92%,transparent);box-shadow:0 16px 40px color-mix(in srgb,var(--ink) 14%,transparent)}
.h3x.is-hidden{--hy:calc(-100% - 32px)}
.h3x nav{display:flex;gap:2px;margin-inline:auto}
.h3x .hbtn{border-radius:999px}
.h3x .burger{border-radius:999px}
@media (hover:hover) and (pointer:fine){.h3x .hlink:hover{background:color-mix(in srgb,var(--ink) 6%,transparent)}}
@media (max-width:900px){.h3x{padding-inline-start:20px}.h3x nav,.h3x .hbtn{display:none}.h3x .burger{display:grid;margin-inline-start:auto}}`,
  html:frame(`<header class="h3x hd"><a class="hlogo" href="#top">לוגו</a><nav aria-label="ראשי">${NAV}</nav><a class="hbtn" href="#s3">להתחיל</a>${BURGER("md-h3")}</header>`,
    hero(false, "פלטפורמה לניהול משמרות", "כל המשמרות במקום אחד, בלי אקסל", "הקפסולה לא נוגעת בקצוות, ולכן היא לא מרגישה כמו פס של תבנית. גללו: היא מתכווצת ב-3 אחוזים ומקבלת צל, ואז יוצאת."), DRAWER("md-h3")),
  js:withDrawer(".h3x", "md-h3"),
  note:"שתי תנועות על אותו transform, דרך שני משתנים: --hs לכיווץ (is-scrolled) ו---hy להסתרה (is-hidden). כך הן לא דורסות זו את זו ועוברות באותה עקומה. הכיווץ הוא scale ולא שינוי רוחב או ריפוד, כי רוחב וריפוד הם layout. הזכוכית על ::before: backdrop-filter על ההדר עצמו היה כולא בתוכו כל אלמנט fixed. ההסתרה היא 100% ועוד 32 פיקסלים, כי הקפסולה מתחילה 16 פיקסלים מתחת לקצה וצריכה לצאת עם הצל שלה."
},
{
  id:"hd4", cat:"header", name:"הדר מינימלי צף עם תפריט מסך מלא", tech:"CSS · JS · clip-path", status:"ממתין", runway:false,
  desc:"אין פס בכלל: שבב לוגו בצד אחד וכפתור תפריט עגול בצד השני, צפים מעל התוכן. הכפתור פותח תפריט מסך מלא שנפרש במעגל מהכפתור עצמו, עם קישורים גדולים שנכנסים בזה אחר זה.",
  when:"תיק עבודות, אדריכלות, צילום, יוקרה, מותג עם מעט עמודים. כשהתוכן הוויזואלי צריך את כל המסך וההדר צריך להיעלם גם כשהוא גלוי. לא לאתר שירות עם עשרה עמודים, כי כל ניווט עולה לחיצה נוספת.",
  libs:[],
  css:`${FRAME_CSS}
.h4x{position:absolute;top:16px;inset-inline:16px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;transition:transform .45s cubic-bezier(.2,.6,.2,1)}
.h4x>*{pointer-events:auto}
.h4x.is-hidden{transform:translateY(calc(-100% - 32px))}
.h4-chip{display:inline-flex;align-items:center;min-height:52px;padding:0 24px;border-radius:999px;background:var(--card);color:var(--ink);font-weight:800;font-size:19px;
  box-shadow:0 8px 24px color-mix(in srgb,var(--ink) 12%,transparent)}
.h4-menu{display:inline-flex;align-items:center;gap:12px;min-height:52px;padding:8px;padding-inline-start:20px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);
  font:inherit;font-size:15px;font-weight:600;cursor:pointer;box-shadow:0 8px 24px color-mix(in srgb,var(--ink) 16%,transparent)}
.h4-menu i{position:relative;width:36px;height:36px;border-radius:50%;background:var(--bg)}
.h4-menu i::before,.h4-menu i::after{content:"";position:absolute;inset-inline:11px;height:2px;border-radius:2px;background:var(--ink);transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.h4-menu i::before{top:14px}
.h4-menu i::after{top:20px}
@media (hover:hover) and (pointer:fine){.h4-menu:hover i::before{transform:translateY(-1px)}.h4-menu:hover i::after{transform:translateY(1px)}}
.fs{position:fixed;inset:0;z-index:80;display:grid;grid-template-columns:1.4fr 1fr;align-items:end;gap:var(--gap);padding:112px var(--gutter) 64px;background:var(--ink);color:var(--bg);
  clip-path:circle(0px at var(--cx,90%) var(--cy,48px));visibility:hidden;transition:clip-path .7s cubic-bezier(.76,0,.24,1),visibility 0s linear .7s}
.fs.open{clip-path:circle(150vmax at var(--cx,90%) var(--cy,48px));visibility:visible;transition-delay:0s}
.fs-links{list-style:none;margin:0;padding:0}
.fs-links a{display:block;padding:4px 0;font-size:clamp(40px,6vw,96px);font-weight:700;line-height:1.05;color:var(--bg);opacity:0;transform:translateY(32px);
  transition:opacity .2s cubic-bezier(.2,.6,.2,1),transform .2s cubic-bezier(.2,.6,.2,1),color .2s cubic-bezier(.2,.6,.2,1)}
.fs.open .fs-links a{opacity:1;transform:none;transition-duration:.6s,.6s,.2s;transition-delay:calc(.25s + var(--i) * 60ms),calc(.25s + var(--i) * 60ms),0s}
.fs-side{display:grid;gap:8px;font-size:16px;line-height:1.6;color:color-mix(in srgb,var(--bg) 72%,transparent);opacity:0;transition:opacity .2s cubic-bezier(.2,.6,.2,1)}
.fs-side a{color:var(--bg)}
.fs.open .fs-side{opacity:1;transition:opacity .5s cubic-bezier(.2,.6,.2,1) .55s}
.fs-close{position:absolute;top:16px;inset-inline-end:16px;display:inline-flex;align-items:center;gap:12px;min-height:52px;padding:8px;padding-inline-start:20px;border:0;border-radius:999px;
  background:var(--bg);color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
.fs-close svg{width:36px;height:36px;padding:8px;border-radius:50%;background:var(--ink);color:var(--bg)}
@media (hover:hover) and (pointer:fine){.fs-links a:hover{color:color-mix(in srgb,var(--accent) 45%,var(--bg))}}
@media (max-width:700px){.fs{grid-template-columns:1fr;align-content:end;padding:112px var(--gutter) 48px}}
@media (prefers-reduced-motion:reduce){.fs,.fs *{transition-duration:.01ms!important;transition-delay:0s!important}}`,
  html:frame(`<header class="h4x hd"><a class="h4-chip" href="#top">לוגו</a><button class="h4-menu" type="button" aria-expanded="false" aria-controls="fs4">תפריט <i aria-hidden="true"></i></button></header>`,
    hero(false, "סטודיו לאדריכלות", "חללים שנבנים מהאור", "אין פס הדר שחוצה את הצילום. פתחו את התפריט: הוא נפרש במעגל מהכפתור, והקישורים עולים אחד אחרי השני."),
    `
<div class="fs" id="fs4" role="dialog" aria-modal="true" aria-label="תפריט">
  <button class="fs-close" type="button">סגירה ${X_SVG}</button>
  <ul class="fs-links"><li><a href="#top">ראשי</a></li><li><a href="#s1">פרויקטים</a></li><li><a href="#s2">הסטודיו</a></li><li><a href="#s3">צור קשר</a></li></ul>
  <div class="fs-side"><span>רחוב הנביאים 12, חיפה</span><a href="#s3">04-000-0000</a><a href="#s3">hello@studio.co.il</a></div>
</div>`),
  js:`${HR_JS}
(function(){
  var hd=document.querySelector(".h4x"), btn=hd.querySelector(".h4-menu"), fs=document.getElementById("fs4"), close=fs.querySelector(".fs-close");
  var links=[].slice.call(fs.querySelectorAll(".fs-links a"));
  links.forEach(function(a,i){a.style.setProperty("--i",i);});
  headroom(hd);
  fs.inert=true;
  function set(open){
    // the circle grows from the button that opened it, wherever it is on screen
    var r=btn.getBoundingClientRect();
    fs.style.setProperty("--cx",(r.left+r.width/2)+"px"); fs.style.setProperty("--cy",(r.top+r.height/2)+"px");
    fs.classList.toggle("open",open); fs.inert=!open; hd.classList.toggle("menu-open",open);
    btn.setAttribute("aria-expanded",String(open));
    var de=document.documentElement; de.style.scrollbarGutter=open?"stable":""; de.style.overflow=open?"hidden":"";
    if(open)setTimeout(function(){links[0].focus();},300); else btn.focus({preventScroll:true});
  }
  btn.addEventListener("click",function(){set(true);});
  close.addEventListener("click",function(){set(false);});
  links.forEach(function(a){a.addEventListener("click",function(){set(false);});});
  addEventListener("keydown",function(e){
    if(!fs.classList.contains("open"))return;
    if(e.key==="Escape"){set(false);return;}
    if(e.key!=="Tab")return;
    var f=[].slice.call(fs.querySelectorAll("a,button")), i=f.indexOf(document.activeElement);
    var n=e.shiftKey?(i<=0?f.length-1:i-1):(i===f.length-1?0:i+1);
    e.preventDefault(); f[n].focus();
  });
})();`,
  note:"שני האלמנטים צפים בתוך הדר שקוף שעליו pointer-events:none, כך שהשטח ביניהם לא חוסם לחיצות על התוכן. המעגל נפרש ב-clip-path מנקודת המרכז של הכפתור שנמדדת בכל פתיחה, ולכן הוא יוצא מהמקום הנכון גם אחרי גלילה. ה-easing הוא in-out כי זו תנועה על פני כל המסך. היציאה קצרה והקישורים בלי דירוג. נגישות: role=dialog עם aria-modal, inert כשסגור, מלכודת פוקוס, Escape, והחזרת הפוקוס לכפתור."
},
{
  id:"hd5", cat:"header", name:"הדר בשתי קומות: פס פרטים ופס ניווט", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"פס עליון דק עם טלפון, שעות פעילות ובחירת שפה, ומתחתיו הניווט הראשי. בגלילה הראשונה הפס העליון מתקפל ונשאר רק הניווט, ובהמשך הכל יוצא וחוזר כרגיל.",
  when:"עסקים שהטלפון והשעות הם חלק מהמכירה: עורכי דין, מרפאות, שירות מקומי, מוסכים, קבלנים, ואתרים דו-לשוניים או תלת-לשוניים. לא לאתר של מותג או חוויה, שם הפס העליון נראה כמו אתר של שנות האלפיים.",
  libs:[],
  css:`${BASE_CSS}
.h5x{position:absolute;inset-inline:0;top:0;isolation:isolate;--ub:40px;transition:transform .4s cubic-bezier(.2,.6,.2,1)}
.h5x.is-scrolled{transform:translateY(calc(var(--ub) * -1))}
.h5x.is-hidden{transform:translateY(-100%)}
.h5-util{display:flex;align-items:center;gap:24px;min-height:40px;padding:0 var(--gutter);background:var(--ink);color:var(--bg);font-size:13px}
.h5-util a,.h5-util span{color:inherit;opacity:.85}
.h5-util a{display:inline-flex;align-items:center;gap:8px}
.h5-util svg{width:14px;height:14px}
.h5-lang{margin-inline-start:auto;display:flex;gap:4px}
.h5-lang a{padding:4px 8px;border-radius:6px}
.h5-lang a[aria-current]{background:color-mix(in srgb,var(--bg) 16%,transparent);opacity:1}
.h5-main{display:flex;align-items:center;gap:32px;padding:12px var(--gutter);background:var(--card);border-bottom:1px solid var(--line);color:var(--ink);transition:box-shadow .3s cubic-bezier(.2,.6,.2,1)}
.h5x.is-scrolled .h5-main{box-shadow:0 8px 24px color-mix(in srgb,var(--ink) 8%,transparent)}
.h5-main nav{display:flex;gap:4px;margin-inline-start:auto}
@media (max-width:900px){.h5-util .h5-hide{display:none}.h5-main nav,.h5-main .hbtn{display:none}.h5-main .burger{display:grid;margin-inline-start:auto}}`,
  html:frame(`<header class="h5x hd"><div class="h5-util"><a href="#s3">${PHONE_SVG}03-000-0000</a><span class="h5-hide">א׳ עד ה׳, 8:30 עד 18:00</span><span class="h5-hide">דרך מנחם בגין 132, תל אביב</span><nav class="h5-lang" aria-label="שפה"><a href="#top" aria-current="true">עב</a><a href="#top" lang="en">EN</a><a href="#top" lang="ru">РУ</a></nav></div><div class="h5-main"><a class="hlogo" href="#top">לוגו</a><nav aria-label="ראשי">${NAV}</nav><a class="hbtn" href="#s3">לייעוץ ראשוני</a>${BURGER("md-h5")}</div></header>`,
    hero(true, "משרד עורכי דין לדיני משפחה", "שקט מול מה שנראה כמו סוף העולם", "הטלפון והשעות גלויים למי שנכנס. גללו: הפס העליון מתקפל קודם, הניווט נשאר, ורק בהמשך הכל יוצא."), DRAWER("md-h5")),
  js:`${DRAWER_JS}
${HR_JS}
(function(){
  var hd=document.querySelector(".h5x"), util=hd.querySelector(".h5-util");
  // the fold distance is measured, not hard coded: the utility bar wraps differently per language and width
  function measure(){hd.style.setProperty("--ub",util.offsetHeight+"px");}
  measure(); addEventListener("resize",measure);
  headroom(hd);
  drawer(document.getElementById("md-h5"), hd.querySelector(".burger"));
})();`,
  note:"שלושה מצבים על transform אחד: בראש העמוד הכל גלוי, is-scrolled מזיז את ההדר למעלה בדיוק בגובה הפס העליון (נמדד ב-JS ונשמר ב---ub), ו-is-hidden מוציא את כולו. כך הפס העליון לא מקבל אנימציית גובה משלו ואין תזוזת עמוד. בחירת השפה מסומנת ב-aria-current ובכל קישור lang, כדי שקורא מסך יבטא את EN ואת РУ נכון."
},
{
  id:"hd6", cat:"header", name:"הדר איים צפים", tech:"CSS · JS · backdrop-filter", status:"ממתין", runway:false,
  desc:"שלושה איים נפרדים במקום פס: הלוגו בצד אחד, הניווט באמצע, הפעולה בצד השני, כל אחד בזכוכית משלו. כשגוללים למטה הם יוצאים אחד אחרי השני, וכשעולים הם חוזרים באותו סדר.",
  when:"סוכנות, סטודיו דיגיטלי, מוצר, מותג צעיר, אירועים. אתר שרוצה אישיות בלי לצעוק. מתאים גם על הירו צילומי מלא, כי הצילום נראה בין האיים.",
  libs:[],
  css:`${BASE_CSS}
.h6x{position:absolute;top:16px;inset-inline:16px;display:grid;grid-template-columns:1fr auto 1fr;align-items:start;gap:12px;pointer-events:none}
.h6x .isl{pointer-events:auto;position:relative;isolation:isolate;display:flex;align-items:center;min-height:52px;padding:4px;border-radius:16px;color:var(--ink);
  transition:transform .45s cubic-bezier(.2,.6,.2,1) calc(var(--k) * 45ms)}
${GLASS(".h6x .isl", 82)}
.h6x.is-scrolled .isl::before{background:color-mix(in srgb,var(--card) 94%,transparent)}
.h6x.is-hidden .isl{transform:translateY(calc(-100% - 32px))}
/* .h6x .isl sets padding:4px at higher specificity, so the logo island needs the same weight */
.h6x .h6-logo{justify-self:start;padding:0 20px}
.h6-nav{gap:2px}
.h6-end{justify-self:end;gap:4px}
.h6x .hbtn{border-radius:12px}
@media (hover:hover) and (pointer:fine){.h6x .hlink:hover{background:color-mix(in srgb,var(--ink) 6%,transparent)}}
@media (max-width:900px){.h6x{grid-template-columns:1fr auto}.h6x .h6-nav,.h6-end .hbtn{display:none}.h6x .burger{display:grid;border:0}}`,
  html:frame(`<header class="h6x hd"><a class="isl h6-logo hlogo" href="#top" style="--k:0">לוגו</a><nav class="isl h6-nav" aria-label="ראשי" style="--k:1">${NAV}</nav><div class="isl h6-end" style="--k:2"><a class="hbtn" href="#s3">בואו נדבר</a>${BURGER("md-h6")}</div></header>`,
    hero(false, "סוכנות לחוויות דיגיטליות", "מותגים שאנשים זוכרים", "שלושה איים ולא פס אחד, והצילום נושם ביניהם. גללו למטה והם יוצאים בדירוג קטן, עלו והם חוזרים."), DRAWER("md-h6")),
  js:withDrawer(".h6x", "md-h6"),
  note:"ההדר עצמו שקוף ועם pointer-events:none, והאיים מחזירים לעצמם את הלחיצה. הגריד 1fr auto 1fr מחזיק את אי הניווט במרכז האמיתי. הדירוג הוא transition-delay לפי --k, 45 מילישניות בין אי לאי, באותו סדר ביציאה ובחזרה, קצר מספיק כדי שלא ירגיש כמו המתנה. במובייל נשארים שני איים: לוגו, והמבורגר בתוך אי הפעולה."
},
{
  id:"hd7", cat:"header", name:"הדר נחיתה צף: לוגו, טלפון וכפתור אחד", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"בלי ניווט בכלל, כדי שלא יהיו יציאות מהמשפך: לוגו, טלפון וכפתור אחד. הכפתור בקו מתאר כל עוד ההירו על המסך (שם יש כפתור גדול משלו), ומתמלא בצבע ברגע שההירו נגמר.",
  when:"דפי נחיתה של קמפיין, הרשמה לסדנה, שיעור ניסיון, הורדת מדריך. כל עמוד שמטרתו פעולה אחת. לא לאתר תדמית, שם המבקר צריך לנווט.",
  libs:[],
  css:`${FRAME_CSS}
.h7x{position:absolute;top:16px;inset-inline:0;margin-inline:auto;width:min(1120px,calc(100% - 32px));display:flex;align-items:center;gap:12px;padding:8px;padding-inline-start:24px;
  border-radius:18px;isolation:isolate;color:var(--ink);transition:transform .45s cubic-bezier(.2,.6,.2,1)}
${GLASS(".h7x", 88)}
.h7x.is-hidden{transform:translateY(calc(-100% - 32px))}
.h7-tel{margin-inline-start:auto;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 12px;border-radius:12px;font-weight:600;font-size:15px;direction:ltr}
.h7-tel svg{width:18px;height:18px}
.h7x .hbtn{background:none;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink)}
.h7x.is-past .hbtn{background:var(--accent);color:var(--accent-ink);box-shadow:inset 0 0 0 1.5px var(--accent)}
@media (max-width:700px){.h7-tel span{display:none}.h7-tel{width:44px;padding:0;justify-content:center}.h7x{padding-inline-start:20px}}`,
  html:frame(`<header class="h7x hd"><a class="hlogo" href="#top">לוגו</a><a class="h7-tel" href="#s3" aria-label="התקשרו 050-000-0000">${PHONE_SVG}<span>050-000-0000</span></a><a class="hbtn" href="#s3">לשיעור ניסיון</a></header>`,
    hero(true, "סטודיו פילאטיס מכשירים", "שיעור ניסיון ראשון עלינו", "אין כאן לאן לברוח: לוגו, טלפון וכפתור. גללו אל מתחת להירו וראו את הכפתור מתמלא, כי מעכשיו הוא הפעולה היחידה על המסך."), ""),
  js:`${HR_JS}
(function(){
  var hd=document.querySelector(".h7x"), heroEl=document.getElementById("top");
  // the button fills only once the hero (with its own big CTA) has left the screen: two filled buttons compete
  headroom(hd,{on:function(y){hd.classList.toggle("is-past",y>heroEl.offsetHeight-hd.offsetHeight);}});
})();`,
  note:"המצב is-past נגזר מגובה ההירו פחות גובה ההדר, באותו מאזין גלילה של ה-headroom (הפרמטר on), בלי מאזין נוסף. הטלפון כתוב ב-direction:ltr כדי שהמספר לא יתהפך, ובמובייל נשאר ממנו רק האייקון עם aria-label שמכיל את המספר. במובייל כדאי לזווג אותו עם CTA דביק בתחתית (motion.md), כי כשההדר יוצא הכפתור שלו יוצא איתו."
},
{
  id:"hd8", cat:"header", name:"הדר קפסולה שנפתחת לתפריט", tech:"CSS · JS · grid-template-rows", status:"ממתין", runway:false,
  desc:"קפסולה צפה עם לוגו, כפתור תפריט וכפתור פעולה. לחיצה על התפריט לא פותחת מגירה או מסך: הקפסולה עצמה גדלה למטה והופכת לכרטיס עם הקישורים ופרטי הקשר, ובלחיצה נוספת מתקפלת חזרה.",
  when:"אתרים מודרניים עם חמישה עד שמונה עמודים: סטודיו, מוצר, מסעדה, קליניקה בוטיק. אותו תפריט בדסקטופ ובמובייל, ולכן אין שני תפריטים לתחזק. לא למגה תפריט עם עשרות קישורים (b65).",
  libs:[],
  css:`${FRAME_CSS}
.h8x{position:absolute;top:16px;inset-inline:0;margin-inline:auto;width:min(680px,calc(100% - 32px));color:var(--ink);transition:transform .45s cubic-bezier(.2,.6,.2,1)}
.h8x.is-hidden{transform:translateY(calc(-100% - 32px))}
.h8-card{position:relative;isolation:isolate;border-radius:30px;overflow:hidden;transition:border-radius .4s cubic-bezier(.2,.6,.2,1)}
${GLASS(".h8-card", 88)}
.h8x.menu-open .h8-card{border-radius:24px}
.h8x.menu-open .h8-card::before{background:color-mix(in srgb,var(--card) 97%,transparent);box-shadow:0 24px 64px color-mix(in srgb,var(--ink) 18%,transparent)}
.h8-bar{display:flex;align-items:center;gap:8px;min-height:60px;padding:8px;padding-inline-start:24px}
.h8-toggle{margin-inline-start:auto;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border:0;border-radius:999px;
  background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
.h8-toggle i{position:relative;width:12px;height:12px;transition:transform .35s cubic-bezier(.2,.6,.2,1)}
.h8-toggle i::before,.h8-toggle i::after{content:"";position:absolute;inset-inline:0;top:5px;height:2px;border-radius:2px;background:currentColor}
.h8-toggle i::after{transform:rotate(90deg)}
.h8x.menu-open .h8-toggle i{transform:rotate(45deg)}
.h8x .hbtn{border-radius:999px}
.h8-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.6,.2,1)}
.h8x.menu-open .h8-panel{grid-template-rows:1fr}
.h8-panel>div{overflow:hidden}
.h8-in{display:grid;grid-template-columns:1.3fr 1fr;gap:24px;padding:8px 24px 24px}
.h8-links a{display:block;padding:6px 0;font-size:clamp(24px,2.6vw,32px);font-weight:700;line-height:1.15;opacity:0;transform:translateY(12px);
  transition:opacity .15s cubic-bezier(.2,.6,.2,1),transform .15s cubic-bezier(.2,.6,.2,1),color .15s cubic-bezier(.2,.6,.2,1)}
.h8x.menu-open .h8-links a{opacity:1;transform:none;transition-duration:.4s,.4s,.15s;transition-delay:calc(.12s + var(--i) * 45ms),calc(.12s + var(--i) * 45ms),0s}
.h8-side{display:flex;flex-direction:column;justify-content:flex-end;gap:8px;font-size:15px;line-height:1.5;color:var(--muted);opacity:0;transition:opacity .15s cubic-bezier(.2,.6,.2,1)}
.h8-side a{color:var(--ink)}
/* one CTA on screen: on desktop it lives in the bar, on mobile the bar drops it and the card carries it */
.h8-side .hbtn{display:none;color:var(--accent-ink)}
.h8x.menu-open .h8-side{opacity:1;transition:opacity .4s cubic-bezier(.2,.6,.2,1) .3s}
@media (hover:hover) and (pointer:fine){.h8-links a:hover{color:var(--accent)}}
@media (max-width:700px){.h8-side .hbtn{display:inline-flex}.h8-bar .hbtn{display:none}.h8-bar{padding-inline-start:20px}.h8-in{grid-template-columns:1fr;padding:8px 20px 20px}}`,
  html:frame(`<header class="h8x hd"><div class="h8-card"><div class="h8-bar"><a class="hlogo" href="#top">לוגו</a><button class="h8-toggle" type="button" aria-expanded="false" aria-controls="h8p"><span>תפריט</span><i aria-hidden="true"></i></button><a class="hbtn" href="#s3">להזמנת מקום</a></div>
  <div class="h8-panel" id="h8p"><div><div class="h8-in"><nav class="h8-links" aria-label="ראשי"><a href="#top">ראשי</a><a href="#s1">התפריט</a><a href="#s2">אירועים</a><a href="#s3">הסיפור שלנו</a></nav><div class="h8-side"><span>שדרות רוטשילד 40, תל אביב</span><span>כל יום מ-18:00</span><a href="#s3">03-000-0000</a><a class="hbtn" href="#s3">להזמנת מקום</a></div></div></div></div></div></header>`,
    hero(false, "ביסטרו שכונתי", "ארוחת ערב שנמשכת כל הערב", "לחצו על תפריט: הקפסולה עצמה נפתחת לכרטיס, בלי מגירה ובלי מסך נוסף. אותו תפריט בדיוק במובייל."), ""),
  js:`${HR_JS}
(function(){
  var hd=document.querySelector(".h8x"), t=hd.querySelector(".h8-toggle"), label=t.querySelector("span"), panel=document.getElementById("h8p");
  var links=[].slice.call(panel.querySelectorAll("a"));
  panel.querySelectorAll(".h8-links a").forEach(function(a,i){a.style.setProperty("--i",i);});
  headroom(hd);
  function set(open,kb){
    hd.classList.toggle("menu-open",open); t.setAttribute("aria-expanded",String(open));
    label.textContent=open?"סגירה":"תפריט"; panel.inert=!open;
    // focus moves into the card only when it was opened from the keyboard; a mouse user keeps their place
    if(open&&kb)setTimeout(function(){links[0].focus({preventScroll:true});},120);
  }
  set(false);
  t.addEventListener("click",function(e){set(!hd.classList.contains("menu-open"),e.detail===0);});
  links.forEach(function(a){a.addEventListener("click",function(){set(false);});});
  document.addEventListener("click",function(e){if(!hd.contains(e.target))set(false);});
  hd.addEventListener("keydown",function(e){if(e.key==="Escape"&&hd.classList.contains("menu-open")){set(false);t.focus();}});
})();`,
  note:"הגדילה היא grid-template-rows מ-0fr ל-1fr, האקורדיון הדוקטרינרי, ולא max-height: הגובה האמיתי של התוכן, בלי מספר קסם. הרדיוס יורד מ-30 (קפסולה) ל-24 (כרטיס) באותו זמן, וזה מה שגורם לזה להיראות כמו אובייקט אחד שמשנה צורה ולא כמו פאנל שנפתח מתחתיו. הקישורים נכנסים אחרי שהכרטיס התחיל לגדול (השהיה של 120 מילישניות), והיציאה מהירה ובלי דירוג. כשהתפריט פתוח ההדר לא יוצא בגלילה (menu-open)."
}
];
