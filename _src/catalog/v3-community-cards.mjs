// V3 community ports: b72 (card morphs into a detail dialog), b73 (logo wall that swaps in place)

// ---------- b72: the six cards. One source for the rail markup and for the detail templates ----------
const CC = [
  { img: "s13/proj-a.webp", w: 1800, h: 1200, alt: "סלון בגוונים כהים עם ספה נמוכה, נרות ותאורת קיר חמה",
    cat: "דירת מגורים", title: "סלון שקט בגוונים כהים",
    p: "דירה בקומה שמינית עם אור חזק מהמערב. ביקשו סלון שמרגיעים בו אחרי יום ארוך, אז הורדנו את הצבעים, העלינו את התאורה החמה והשארנו מקום ריק סביב הספה.",
    facts: [["שטח", "94 מ״ר"], ["משך העבודה", "11 שבועות"], ["מה נכלל", "תכנון, רכש וליווי"]] },
  { img: "s13/proj-b.webp", w: 1200, h: 1600, alt: "חדר רחצה עם מראה עגולה, ברזי פליז וכיור על שיש שחור",
    cat: "חדר רחצה", title: "שיש שחור ופליז, בלי עומס",
    p: "חדר רחצה קטן שלא היה צריך להיראות קטן. מראה עגולה, ברזי פליז ושיש אחד רציף מהכיור ועד הקיר, כדי שהעין לא תעצור באמצע.",
    facts: [["שטח", "6 מ״ר"], ["משך העבודה", "3 שבועות"], ["מה נכלל", "תכנון והתקנה"]] },
  { img: "s13/proj-c.webp", w: 2400, h: 1026, alt: "מטבח ארוך עם אי, ארונות כהים ושלוש מנורות תלויות",
    cat: "מטבח", title: "מטבח ארוך לבית שמבשלים בו באמת",
    p: "משפחה של חמישה שמבשלת כל ערב. אי אחד ארוך, מאחוריו קיר ארונות עד התקרה, ושלוש מנורות תלויות שמחליפות את האור הישיר מהתקרה.",
    facts: [["שטח", "18 מ״ר"], ["משך העבודה", "6 שבועות"], ["מה נכלל", "תכנון, נגרות ותאורה"]] },
  { img: "s13/room.webp", w: 2200, h: 1469, alt: "כורסה ומנורת רצפה ליד מדפי ספרים עם תאורה פנימית",
    cat: "פינת עבודה", title: "ספרייה מוארת בפינת הסלון",
    p: "פינה לקריאה ולעבודה שקטה בדירה שאין בה חדר נוסף. מדפים עם תאורה פנימית, כורסה אחת טובה ומנורת רצפה, הכול על קיר אחד.",
    facts: [["שטח", "7 מ״ר"], ["משך העבודה", "שבועיים"], ["מה נכלל", "נגרות ותאורה"]] },
  { img: "s14/cafe-window.webp", w: 1400, h: 1050, alt: "בית קפה עם חלונות גבוהים, שולחנות עץ ואור בוקר",
    cat: "חלל מסחרי", title: "בית קפה שאור הבוקר עושה בו את העבודה",
    p: "בית קפה שכונתי עם חלונות גבוהים. לא הוספנו קישוט: הזזנו את השולחנות אל החלון, החלפנו את הכיסאות והשארנו לשמש לעשות את שלה.",
    facts: [["שטח", "64 מ״ר"], ["משך העבודה", "5 שבועות"], ["מה נכלל", "תכנון וליווי"]] },
  { img: "s13/hero.webp", w: 2560, h: 1435, alt: "קרני שמש על קיר חדר, עם צמח ליד החלון",
    cat: "חדר שינה", title: "חדר שהשמש מציירת בו אחר הצהריים",
    p: "חדר שינה שפונה מערבה. במקום וילון כבד בחרנו בד דק שמרכך את האור, והשארנו את הקיר ריק כדי שהצללים יהיו הקישוט.",
    facts: [["שטח", "14 מ״ר"], ["משך העבודה", "10 ימים"], ["מה נכלל", "עיצוב ותאורה"]] },
];
const ccPlus = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`;
const ccCards = CC.map((c, i) => `    <li><a class="cc-card" href="#project-${i + 1}" data-detail="cc-d${i + 1}" data-alt="${c.alt}" aria-haspopup="dialog"><img src="../assets/media/real/${c.img}" width="${c.w}" height="${c.h}" alt="" draggable="false" decoding="async"><span class="cc-ov"><span class="cc-cat">${c.cat}</span><span class="cc-t">${c.title}</span><span class="cc-plus" aria-hidden="true">${ccPlus}</span></span></a></li>`).join("\n");
const ccTpl = CC.map((c, i) => `<template id="cc-d${i + 1}"><p>${c.p}</p><dl class="cc-facts">${c.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join("")}</dl><a class="gbtn cc-cta" href="#contact">לפגישת היכרות</a></template>`).join("\n");

// ---------- b73: 18 invented logo marks (abstract icon + wordmark bars), drawn as SVG so they can be used as CSS masks ----------
const MK = {
  circle: `<circle cx="20" cy="20" r="15"/>`,
  tri: `<path d="M4 35 20 5l16 30z"/>`,
  sq: `<rect x="5" y="5" width="30" height="30" rx="9"/>`,
  hex: `<path d="M20 3 35 11.5v17L20 37 5 28.5v-17z"/>`,
  arch: `<path d="M5 35V20a15 15 0 0 1 30 0v15z"/>`,
  dia: `<path d="M20 3 37 20 20 37 3 20z"/>`,
  ring: `<circle cx="20" cy="20" r="12" fill="none" stroke="#000" stroke-width="6"/>`,
  plus: `<path d="M15 4h10v11h11v10H25v11H15V25H4V15h11z"/>`,
  leaf: `<path d="M5 35C5 18 18 5 35 5c0 17-13 30-30 30z"/>`,
  bars: `<rect x="5" y="5" width="7" height="30" rx="3"/><rect x="16.5" y="5" width="7" height="30" rx="3"/><rect x="28" y="5" width="7" height="30" rx="3"/>`,
  quarter: `<path d="M5 35V5a30 30 0 0 1 30 30z"/>`,
  dots: `<circle cx="12" cy="12" r="7"/><circle cx="28" cy="12" r="7"/><circle cx="12" cy="28" r="7"/><circle cx="28" cy="28" r="7"/>`,
  wave: `<path d="M4 26c6-12 10-12 16 0s10 12 16 0" fill="none" stroke="#000" stroke-width="6" stroke-linecap="round"/>`,
};
const BR = {
  one: `<rect x="46" y="14" width="74" height="12" rx="6"/>`,
  two: `<rect x="46" y="9" width="74" height="9" rx="4.5"/><rect x="46" y="23" width="48" height="9" rx="4.5"/>`,
  block: `<rect x="46" y="8" width="40" height="24" rx="4"/><rect x="92" y="8" width="28" height="24" rx="4"/>`,
  dot: `<rect x="46" y="16" width="52" height="8" rx="4"/><circle cx="108" cy="20" r="6"/>`,
  comb: `<rect x="46" y="8" width="6" height="24" rx="3"/><rect x="58" y="14" width="6" height="18" rx="3"/><rect x="70" y="8" width="6" height="24" rx="3"/><rect x="82" y="14" width="6" height="18" rx="3"/><rect x="94" y="8" width="6" height="24" rx="3"/><rect x="106" y="14" width="6" height="18" rx="3"/>`,
  thin: `<rect x="46" y="11" width="74" height="6" rx="3"/><rect x="46" y="23" width="56" height="6" rx="3"/>`,
};
const LOGOS = [
  ["נורדה", "circle", "one"], ["קלטו", "tri", "block"], ["ארבו", "sq", "two"], ["פלומה", "arch", "one"], ["זפיר", "wave", "dot"], ["אולם", "hex", "one"],
  ["בריזה", "leaf", "thin"], ["לוטם", "plus", "two"], ["ברקת", "dia", "one"], ["אופק", "quarter", "comb"], ["קורל", "ring", "two"], ["ליבנה", "bars", "dot"],
  ["נטע", "dots", "thin"], ["שחר", "sq", "comb"], ["מיטרה", "tri", "one"], ["סנדרו", "ring", "block"], ["דקלה", "circle", "two"], ["אלמוג", "hex", "thin"],
];
const svgUri = (m, b) => "url('data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 40">${MK[m]}${BR[b]}</svg>`) + "')";
const CELLS = 6;
const cwCells = Array.from({ length: CELLS }, (_, c) => {
  const mine = LOGOS.filter((_, i) => i % CELLS === c);   // round-robin: cell c gets logos c, c+6, c+12
  return `    <li class="cw-cell">${mine.map((l, k) => `<span class="cw-logo${k === 0 ? " is-on" : ""}" style="--logo:${svgUri(l[1], l[2])}"></span>`).join("")}</li>`;
}).join("\n");
const cwNames = LOGOS.map(l => `<li>${l[0]}</li>`).join("");

export default [
{
  id:"b72", cat:"behavior", name:"כרטיס שנפתח לחלון פרטים בלי לאבד את המקום", tech:"vanilla JS · dialog · FLIP", status:"ממתין", runway:false,
  desc:"מסילה אופקית של כרטיסי תמונה גבוהים. לחיצה על כרטיס פותחת אותו לחלון פרטים במרכז: התמונה והכותרת עוברות פיזית למקומן בחלון, והטקסט וכפתור הפעולה נכנסים אחריהן. בסגירה החלון חוזר אל הכרטיס שממנו יצא, והמסילה נשארת איפה שהייתה.",
  when:"תיק עבודות, שירותים, טיפולים, צוות, סיפורי לקוח: בכל מקום שיש חמישה עד שמונה פריטים עם תמונה, ויש מה להוסיף עליהם בלי לשלוח את הגולש לעמוד נפרד. פעם אחת בעמוד, בדרך כלל בסקשן ה\"עבודות\" או ה\"שירותים\". לא כשיש עשרות פריטים (שם צריך גריד וסינון) ולא כשהפרטים הם עמוד שלם (שם הקישור הוא העיקר).",
  note:"שחזור, השראה: Aceternity UI apple-cards-carousel ו-expandable-card (https://ui.aceternity.com/components/apple-cards-carousel , https://ui.aceternity.com/components/expandable-card); הקוד נכתב מחדש, כי הרישיון שלהם אוסר הפצה של המקור.\n\nהבדל מהמהלכים הקרובים: g23 (Flip) מרחיב כרטיס בתוך הגריד ומסדר את השכנים מחדש; b33 הוא לייטבוקס של תמונה בלבד, בלי תוכן ובלי מעבר מהמקום; b60 מרים וידאו מתמונת הירו, אלמנט אחד שגדל. כאן זו תצוגה מהירה של תוכן, מתוך מסילה: התמונה והכותרת עוברות למקומן בחלון, והמסילה, מיקום הגלילה והפוקוס חוזרים בדיוק.\n\nשיטה: dialog מקורי עם showModal (מלכודת פוקוס, Escape, שאר הדף inert) ו-FLIP ידני ב-Web Animations, בלי ספרייה. לא View Transitions (לא בכל דפדפן, והוא מצלם את שני החיתוכים של התמונה ומטשטש ביניהם) ולא GSAP Flip (כשהיחס בין הכרטיס לחלון שונה, התמונה מתעוותת, או שמנפישים רוחב וגובה). התמונה בחלון מקבלת סקייל אחיד בגודל הכיסוי של הכרטיס ו-clip-path בצורת הכרטיס, ובתוכה סקייל קטן שמתאים את החיתוך, אז אין עיוות ואין קפיצה בפריים הראשון. הרקע של החלון הוא clip-path שגדל מהכרטיס; הכותרת והקטגוריה נעות עם סקייל לפי יחס הפונטים והצבע מתחלף תוך כדי; מעל הכל יושב צילום של שכבת הטקסט והצל של הכרטיס שנמוג. כך המעבר לא מנפיש שום תכונת פריסה: רק transform, opacity ו-clip-path. הכרטיס במסילה מוסתר כל זמן שהחלון פתוח.\n\nמלכודות: (1) הסגירה מדדה מחדש את הכרטיס, וכרטיס שחתוך בקצה המסילה עובר קודם scrollIntoView עם inline:center; ב-RTL אין להשתמש ב-scrollLeft חיובי, והחצים משתמשים בסימן לפי direction. (2) Escape נתפס באירוע cancel כדי שהסגירה תנופש; ב-Chrome לחיצה כפולה סוגרת בכל זאת, ולכן אירוע close מנקה הכל. (3) ::backdrop לא תמיד יורש משתני CSS, ולכן הצבע שלו ניטרלי. (4) נעילת גלילה על html עם scrollbar-gutter, כמו ב-b33. (5) חלון שנסגר אחרי גלילה פנימית (במובייל) גולל קודם לראש ורק אז חוזר. (6) הכרטיסים הם קישורים אמיתיים לעמוד הפרויקט המלא: בלי JS, או בלחיצה עם Ctrl, הם פועלים כקישורים, והחלון הוא שיפור.\n\nמובייל: מתחת ל-768 החלון הוא גיליון מסך מלא שנגלל, כפתור הסגירה דביק, והמסילה גוללת במומנטום מקורי עם scroll-snap. בתנועה מופחתת, או בדפדפן בלי Web Animations: פתיחה מיידית עם דהייה של 150ms, הכל עובד. חצי המסילה מושבתים בקצוות, ופס ההתקדמות מראה איפה אתה.\n\nשלוש תשובות הגימור. (1) הגרסה הבנאלית: מודאל שקופץ באמצע המסך עם דהייה, והגולש מאבד את הקשר לכרטיס שלחץ עליו; כאן החלון נולד מהכרטיס וחוזר אליו. (2) מה נושא המשכיות: המעבר המשותף של התמונה והכותרת, והחזרה של הפוקוס והמסילה לכרטיס. (3) איזו פעולה זה מקל: להציץ בעוד פרויקט, ועוד אחד, בלי לצאת מהעמוד ובלי לאבד את המקום במסילה.",
  libs:[],
  css:`.cc{--cw:clamp(260px,23vw,440px)}
.cc-head{padding-inline:var(--gutter);margin-block-end:clamp(24px,3vw,48px)}
.cc-eyebrow{margin:0 0 12px;font-size:14px;font-weight:500;color:var(--muted)}
.cc-head h2{line-height:1.1;max-width:18ch;text-wrap:balance}
.cc-rail{display:flex;gap:var(--gap);list-style:none;margin:0;padding:0 var(--gutter);overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:var(--gutter);scrollbar-width:none}
.cc-rail::-webkit-scrollbar{display:none}
.cc-rail>li{flex:0 0 var(--cw);scroll-snap-align:start}
.cc-card{position:relative;display:block;aspect-ratio:3 / 4.2;border-radius:var(--r);overflow:hidden;color:#fff;background:var(--line);isolation:isolate;-webkit-tap-highlight-color:transparent}
.cc-card>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;-webkit-user-drag:none;user-select:none}
.cc-card:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
.cc-card.is-lifted{visibility:hidden}
/* שכבת הטקסט והצל של הכרטיס. אותה שכבה משוכפלת כ"צילום" שנמוג בזמן המעבר, ולכן היא בנויה כך שאפשר לשכפל אותה כמו שהיא */
.cc-ov{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;padding:clamp(18px,1.6vw,24px);background:linear-gradient(to top,rgba(8,8,14,.82) 0%,rgba(8,8,14,.5) 34%,rgba(8,8,14,0) 62%)}
.cc-cat{font-size:14px;line-height:1.3;font-weight:500;opacity:.86}
.cc-t{font-size:clamp(19px,1.1vw + 10px,22px);line-height:1.25;font-weight:600;text-wrap:balance;padding-inline-end:40px}
.cc-plus{position:absolute;inset-block-start:clamp(14px,1.4vw,18px);inset-inline-end:clamp(14px,1.4vw,18px);width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;background:rgba(255,255,255,.18);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:background-color .28s cubic-bezier(.2,.6,.2,1),color .28s cubic-bezier(.2,.6,.2,1),transform .28s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.cc-card:hover .cc-plus{background:rgba(255,255,255,.94);color:#111;transform:rotate(90deg)}}
.cc-card:focus-visible .cc-plus{background:rgba(255,255,255,.94);color:#111}
.cc-nav{display:flex;align-items:center;gap:var(--gap);padding:clamp(20px,2vw,32px) var(--gutter) 0}
.cc-nav[hidden]{display:none}
.cc-prog{position:relative;flex:1;height:4px;border-radius:99px;background:var(--line);overflow:hidden}
.cc-prog i{position:absolute;inset-block:0;inset-inline-start:0;width:40%;border-radius:inherit;background:var(--ink)}
.cc-btns{display:flex;gap:8px}
.cc-b{width:48px;height:48px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:border-color .18s cubic-bezier(.2,.6,.2,1),opacity .18s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.cc-b:not(:disabled):hover{border-color:var(--ink)}}
.cc-b:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cc-b:disabled{opacity:.35;cursor:default}
/* החץ מצויר מצביע ימינה. בעברית "הקודם" מצביע ימינה ו"הבא" שמאלה, ובאנגלית ההפך */
.cc-b svg{width:20px;height:20px}
.cc-next svg{transform:scaleX(-1)}
html[dir="ltr"] .cc-prev svg{transform:scaleX(-1)}
html[dir="ltr"] .cc-next svg{transform:none}
/* החלון */
.cc-dlg{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;color:var(--ink);overflow:hidden}
.cc-dlg[open]{display:grid;place-items:center;padding:clamp(16px,4vw,56px)}
/* רקע ניטרלי ולא משתנה: ::backdrop לא תמיד יורש משתני CSS */
.cc-dlg::backdrop{background:rgba(10,10,16,.58);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.cc-dlg[open]::backdrop{animation:cc-bd-in .4s cubic-bezier(.2,.6,.2,1) both}
.cc-dlg.is-out::backdrop{animation:cc-bd-out .36s cubic-bezier(.2,.6,.2,1) both}
@keyframes cc-bd-in{from{opacity:0}to{opacity:1}}
@keyframes cc-bd-out{from{opacity:1}to{opacity:0}}
.cc-panel{--pr:calc(var(--r) * 1.4);position:relative;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);grid-template-rows:minmax(0,1fr);width:min(1040px,100%);max-height:min(720px,calc(100dvh - clamp(32px,8vw,112px)));background:var(--card);color:var(--ink);border-radius:var(--pr);clip-path:inset(0 round var(--pr));overscroll-behavior:contain}
.cc-panel.is-anim{overflow:hidden}
.cc-pimg{position:relative;min-height:clamp(380px,50dvh,560px);overflow:hidden}
.cc-pimg img{position:absolute;left:0;top:0;max-width:none;display:block}
.cc-pc{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:clamp(28px,3.4vw,56px)}
.cc-pcat{margin:0 0 12px;font-size:14px;line-height:1.3;font-weight:500;color:var(--muted)}
.cc-ptitle{margin:0 0 20px;font-size:clamp(26px,1.6vw + 14px,40px);line-height:1.12;font-weight:600;text-wrap:balance;padding-inline-end:56px}
.cc-body{display:grid;gap:clamp(20px,2vw,28px)}
.cc-body p{margin:0;max-width:56ch;font-size:clamp(16px,.5vw + 12px,18px);line-height:1.6}
.cc-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:0;padding:0}
.cc-facts dt{margin:0 0 4px;font-size:13px;color:var(--muted)}
.cc-facts dd{margin:0;font-size:16px;font-weight:500;line-height:1.35}
.cc-cta{justify-self:start}
.cc-xw{position:absolute;inset-block-start:0;inset-inline:0;height:0;z-index:5}
.cc-x{position:absolute;inset-block-start:clamp(12px,1.4vw,20px);inset-inline-end:clamp(12px,1.4vw,20px);width:44px;height:44px;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer;color:#fff;background:rgba(10,10,16,.54);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:background-color .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.cc-x:hover{background:rgba(10,10,16,.8)}}
.cc-x:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cc-x svg{width:18px;height:18px}
/* צילום שכבת הטקסט שנמוג מעל החלון בזמן המעבר */
.cc-veil{position:fixed;z-index:6;pointer-events:none;border-radius:var(--r);overflow:hidden;color:#fff}
@media (max-width:767px){
  .cc{--cw:min(76vw,320px)}
  .cc-dlg[open]{padding:0}
  .cc-panel{--pr:0px;display:block;width:100%;height:100%;max-height:none;overflow-y:auto}
  .cc-pimg{aspect-ratio:4 / 3;min-height:0}
  .cc-pc{overflow:visible;padding-block-end:calc(clamp(28px,6vw,40px) + env(safe-area-inset-bottom))}
  .cc-ptitle{padding-inline-end:0}
  .cc-facts{grid-template-columns:1fr 1fr 1fr;gap:12px}
  .cc-xw{position:sticky}
}
@media (prefers-reduced-motion: reduce){
  .cc-plus,.cc-b,.cc-x{transition:none}
  .cc-dlg[open]::backdrop,.cc-dlg.is-out::backdrop{animation-duration:.15s}
}`,
  html:`<div class="stage tight full">
<div class="cc">
  <div class="cc-head"><p class="cc-eyebrow">תיק עבודות</p><h2>שישה חללים, שישה סיפורים</h2></div>
  <ul class="cc-rail" role="list" aria-label="פרויקטים נבחרים">
${ccCards}
  </ul>
  <div class="cc-nav" hidden>
    <div class="cc-prog" aria-hidden="true"><i></i></div>
    <div class="cc-btns">
      <button class="cc-b cc-prev" type="button" aria-label="הפרויקטים הקודמים"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
      <button class="cc-b cc-next" type="button" aria-label="הפרויקטים הבאים"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
    </div>
  </div>
</div>
</div>
<dialog class="cc-dlg" aria-labelledby="cc-ptitle">
  <div class="cc-panel">
    <div class="cc-xw"><button class="cc-x" type="button" aria-label="סגירה"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="cc-pimg"><img alt=""></div>
    <div class="cc-pc"><p class="cc-pcat"></p><h3 class="cc-ptitle" id="cc-ptitle"></h3><div class="cc-body"></div></div>
  </div>
</dialog>
${ccTpl}`,
  js:`(function(){
  const root=document.documentElement;
  const rail=document.querySelector(".cc-rail"),cards=[...rail.querySelectorAll(".cc-card")];
  const nav=document.querySelector(".cc-nav"),prev=nav.querySelector(".cc-prev"),next=nav.querySelector(".cc-next"),track=nav.querySelector(".cc-prog"),thumb=track.firstElementChild;
  const dlg=document.querySelector(".cc-dlg"),panel=dlg.querySelector(".cc-panel"),pimg=panel.querySelector(".cc-pimg"),pic=pimg.querySelector("img");
  const pcat=panel.querySelector(".cc-pcat"),ptitle=panel.querySelector(".cc-ptitle"),body=panel.querySelector(".cc-body"),xbtn=panel.querySelector(".cc-x");
  const rq=matchMedia("(prefers-reduced-motion: reduce)");
  const E="cubic-bezier(.2,.6,.2,1)",T_OPEN=520,T_CLOSE=420;
  const hasDialog=typeof dlg.showModal==="function",hasAnim=typeof panel.animate==="function";

  /* ---- המסילה: חצים, פס התקדמות ---- */
  // ב-RTL scrollLeft שלילי (Chrome, Firefox, Safari). הערך המוחלט עובד בשני הכיוונים, והסימן קובע לאן "הבא" גולל
  const sign=()=>getComputedStyle(rail).direction==="rtl"?-1:1;
  const step=()=>cards.length>1?Math.abs(cards[1].parentElement.getBoundingClientRect().left-cards[0].parentElement.getBoundingClientRect().left):rail.clientWidth*.8;
  const go=n=>rail.scrollBy({left:n*sign()*step(),behavior:rq.matches?"auto":"smooth"});
  // כפתור שהופך מושבת בזמן שיש עליו פוקוס לא משאיר את הפוקוס באוויר
  function setDis(b,v){if(b.disabled===v)return;if(v&&document.activeElement===b)(b===next?prev:next).focus();b.disabled=v;}
  let ticking=false;
  function sync(){
    ticking=false;
    const max=rail.scrollWidth-rail.clientWidth;
    nav.hidden=max<=2;                               // במסך רחב שהכל נכנס בו אין מה לנווט
    if(max<=2)return;
    const pos=Math.min(max,Math.abs(rail.scrollLeft));
    setDis(prev,pos<=2);setDis(next,pos>=max-2);
    const ratio=rail.clientWidth/rail.scrollWidth,room=track.clientWidth*(1-ratio);
    thumb.style.width=(ratio*100)+"%";
    thumb.style.transform="translateX("+(sign()*(pos/max)*room)+"px)";
  }
  rail.addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(sync);}},{passive:true});
  if(window.ResizeObserver)new ResizeObserver(sync).observe(rail);else addEventListener("resize",sync);
  prev.addEventListener("click",()=>go(-1));next.addEventListener("click",()=>go(1));
  sync();

  /* ---- החלון ---- */
  let cur=null,busy=false,pend=false,veil=null,runs=[];
  const lock=()=>{root.style.scrollbarGutter="stable";root.style.overflow="hidden";};     // על html ולא על body: כמו b33
  const unlock=()=>{root.style.overflow="";root.style.scrollbarGutter="";};
  const play=(el,frames,o)=>{const a=el.animate(frames,Object.assign({easing:E},o));runs.push(a);return a;};
  const settle=()=>Promise.all(runs.map(a=>a.finished.catch(()=>{})));
  const wipe=()=>{runs.forEach(a=>{try{a.cancel();}catch(e){}});runs=[];if(veil){veil.remove();veil=null;}};
  const fully=c=>{const r=c.getBoundingClientRect(),w=rail.getBoundingClientRect();return r.left>=w.left-1&&r.right<=w.right+1;};
  // כרטיס שחתוך בקצה המסילה מובא פנימה לפני המדידה, אחרת המעבר מתחיל משטח שלא נראה
  function reveal(c){if(!fully(c)){c.scrollIntoView({inline:"center",block:"nearest"});sync();}}

  // התמונה בחלון: מידות כיסוי מפורשות (לא object-fit), כדי שסקייל עליה יקטין את התמונה ולא את התיבה שחותכת אותה
  let ratio=1.5;
  function fit(){
    const W=pimg.clientWidth,H=pimg.clientHeight;if(!W||!H)return;
    const cw=Math.max(W,H*ratio),ch=cw/ratio;
    pic.style.width=cw+"px";pic.style.height=ch+"px";pic.style.left=((W-cw)/2)+"px";pic.style.top=((H-ch)/2)+"px";
  }
  addEventListener("resize",()=>{if(dlg.open&&!busy)fit();});
  function fill(c){
    const im=c.querySelector("img");
    pic.src=im.currentSrc||im.src;pic.alt=c.dataset.alt||"";
    ratio=(parseFloat(im.getAttribute("width"))/parseFloat(im.getAttribute("height")))||1.5;
    pcat.textContent=c.querySelector(".cc-cat").textContent;
    ptitle.textContent=c.querySelector(".cc-t").textContent;
    body.replaceChildren();
    const tpl=document.getElementById(c.dataset.detail);
    if(tpl)body.appendChild(tpl.content.cloneNode(true));
    panel.scrollTop=0;panel.querySelector(".cc-pc").scrollTop=0;
  }

  // טקסט שנודד: אותו אלמנט של החלון, מסקייל ומהמקום של הטקסט בכרטיס אל מקומו. הצבע מתחלף בדרך
  function flipText(el,src,D,closing){
    const a=getComputedStyle(el),b=getComputedStyle(src),rtl=a.direction==="rtl";
    const s=parseFloat(b.fontSize)/parseFloat(a.fontSize),R=el.getBoundingClientRect(),S=src.getBoundingClientRect();
    const dx=rtl?S.right-R.right:S.left-R.left,dy=S.top-R.top;
    el.style.transformOrigin=rtl?"100% 0":"0 0";
    const from={transform:"translate("+dx+"px,"+dy+"px) scale("+s+")",color:b.color},to={transform:"translate(0px,0px) scale(1)",color:a.color};
    play(el,closing?[to,from]:[from,to],{duration:D,fill:"forwards"});
    // החלפה הדרגתית בין הטקסט של הכרטיס (בצילום) לטקסט של החלון, כדי שהבדלי שבירת שורות לא יקפצו
    play(el,closing?[{opacity:1},{opacity:0}]:[{opacity:0},{opacity:1}],{duration:D*.5,delay:closing?D*.5:0,fill:"both"});
  }

  function morph(c,closing){
    const D=closing?T_CLOSE:T_OPEN,im=c.querySelector("img");
    const C=c.getBoundingClientRect(),P=panel.getBoundingClientRect(),Pi=pimg.getBoundingClientRect();
    const rEnd=parseFloat(getComputedStyle(panel).borderTopLeftRadius)||0,rCard=parseFloat(getComputedStyle(c).borderTopLeftRadius)||0;
    const f=(a,b)=>closing?[b,a]:[a,b];
    // 1) משטח החלון: חלון חיתוך שגדל מצורת הכרטיס לצורת החלון
    play(panel,f({clipPath:"inset("+(C.top-P.top)+"px "+(P.right-C.right)+"px "+(P.bottom-C.bottom)+"px "+(C.left-P.left)+"px round "+rCard+"px)"},{clipPath:"inset(0px 0px 0px 0px round "+rEnd+"px)"}),{duration:D,fill:"forwards"});
    // 2) התמונה: סקייל אחיד עד שמכסה את הכרטיס, חיתוך לצורת הכרטיס, וסקייל פנימי שמתאים את החיתוך. בלי עיוות, בלי קפיצה
    const a=ratio;
    const s=Math.max(C.width/Pi.width,C.height/Pi.height);
    const dx=(C.left+C.width/2)-(Pi.left+Pi.width/2),dy=(C.top+C.height/2)-(Pi.top+Pi.height/2);
    const lx=(Pi.width-C.width/s)/2,ly=(Pi.height-C.height/s)/2;
    const k=Math.max(C.height,C.width/a)/(pic.offsetHeight*s);
    play(pimg,f({transform:"translate("+dx+"px,"+dy+"px) scale("+s+")",clipPath:"inset("+ly+"px "+lx+"px "+ly+"px "+lx+"px round "+(rCard/s)+"px)"},{transform:"translate(0px,0px) scale(1)",clipPath:"inset(0px 0px 0px 0px round 0px)"}),{duration:D,fill:"forwards"});
    play(pic,f({transform:"scale("+k+")"},{transform:"scale(1)"}),{duration:D,fill:"forwards"});
    // 3) הכותרת והקטגוריה
    flipText(pcat,c.querySelector(".cc-cat"),D,closing);
    flipText(ptitle,c.querySelector(".cc-t"),D,closing);
    // 4) צילום שכבת הטקסט והצל של הכרטיס, מעל הכל, נמוג בפתיחה ומופיע בסגירה
    veil=document.createElement("div");veil.className="cc-veil";veil.setAttribute("aria-hidden","true");
    veil.style.cssText="left:"+C.left+"px;top:"+C.top+"px;width:"+C.width+"px;height:"+C.height+"px";
    veil.appendChild(c.querySelector(".cc-ov").cloneNode(true));dlg.appendChild(veil);
    play(veil,f({opacity:1},{opacity:0}),{duration:D*.32,delay:closing?D*.68:0,fill:"both"});
    // 5) הגוף וכפתור הסגירה: נכנסים אחרי התמונה, בהדרגה. ביציאה נעלמים מהר
    [...body.children].forEach((el,i)=>play(el,closing?[{opacity:1},{opacity:0}]:[{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"translateY(0px)"}],{duration:closing?D*.3:420,delay:closing?0:D*.5+i*70,fill:"both"}));
    play(xbtn,closing?[{opacity:1},{opacity:0}]:[{opacity:0},{opacity:1}],{duration:closing?160:240,delay:closing?0:D*.4,fill:"both"});
  }

  async function open(c){
    if(busy||cur)return;
    busy=true;cur=c;
    reveal(c);fill(c);lock();
    dlg.showModal();fit();
    const animate=hasAnim&&!rq.matches;
    if(!animate){
      c.classList.add("is-lifted");
      if(hasAnim)panel.animate([{opacity:0},{opacity:1}],{duration:150,easing:E});    // ללא מעבר: דהייה קצרה בלבד
      busy=false;return;
    }
    panel.classList.add("is-anim");
    morph(c,false);
    c.classList.add("is-lifted");
    await settle();
    panel.classList.remove("is-anim");wipe();
    busy=false;
    if(pend){pend=false;close();}
  }

  function done(c){
    wipe();
    c.classList.remove("is-lifted");
    panel.classList.remove("is-anim");dlg.classList.remove("is-out");
    if(dlg.open)dlg.close();
    unlock();
    c.focus({preventScroll:true});
    cur=null;busy=false;pend=false;
  }
  const waitTop=()=>new Promise(res=>{const t0=performance.now();(function tick(){if(panel.scrollTop<=1||performance.now()-t0>360)return res();requestAnimationFrame(tick);})();});
  async function close(){
    if(!cur)return;
    if(busy){pend=true;return;}
    busy=true;
    const c=cur,animate=hasAnim&&!rq.matches;
    if(!animate){
      if(hasAnim){dlg.classList.add("is-out");await panel.animate([{opacity:1},{opacity:0}],{duration:150,easing:E,fill:"forwards"}).finished.catch(()=>{});}
      done(c);return;
    }
    // חלון שנגלל פנימה (במובייל) חוזר קודם לראש, אחרת התמונה כבר מחוץ למסך ואין ממה לחזור
    if(panel.scrollTop>4){panel.scrollTo({top:0,behavior:"smooth"});await waitTop();}
    reveal(c);
    dlg.classList.add("is-out");panel.classList.add("is-anim");
    morph(c,true);
    await settle();
    done(c);
  }

  cards.forEach(c=>c.addEventListener("click",e=>{
    // בלי dialog, או בלחיצה עם מקש עזר, הכרטיס הוא סתם קישור לעמוד הפרויקט
    if(!hasDialog||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();open(c);
  }));
  xbtn.addEventListener("click",close);
  // Escape: נתפס כדי שהסגירה תנופש. לחיצה כפולה ב-Chrome סוגרת בכל זאת, ולכן אירוע close מנקה
  dlg.addEventListener("cancel",e=>{e.preventDefault();close();});
  dlg.addEventListener("close",()=>{if(cur&&!dlg.open){const c=cur;cur=null;wipe();c.classList.remove("is-lifted");panel.classList.remove("is-anim");dlg.classList.remove("is-out");unlock();c.focus({preventScroll:true});busy=false;pend=false;}});
  // לחיצה על הרקע סוגרת, אבל רק אם גם הלחיצה התחילה שם (בחירת טקסט שנגמרת מחוץ לחלון לא תסגור)
  let downOnBackdrop=false;
  dlg.addEventListener("pointerdown",e=>{downOnBackdrop=e.target===dlg;});
  dlg.addEventListener("click",e=>{if(e.target===dlg&&downOnBackdrop)close();});
})();`
},
{
  id:"b73", cat:"behavior", name:"קיר לוגואים שמתחלפים במקום", tech:"vanilla JS · WAAPI · CSS mask", status:"ממתין", runway:false,
  desc:"שורה של שש משבצות לוגו, וכל משבצת מחליפה את הלוגו שלה בעצמה כל כמה שניות: הישן עולה למעלה ונמוג בטשטוש קל, החדש עולה מלמטה ומתחדד. המשבצות לא מתחלפות יחד, ובסך הכל מופיעים 18 לקוחות בשטח של שישה.",
  when:"רצועת לקוחות בעמוד הבית או בדף שירות, כשיש יותר לקוחות ממה שנכנס בשורה אחת (12 עד 18 לוגואים) והשטח מוגבל. מתחת לכותרת הראשית או לפני הצעת המחיר. לא כשיש עד שישה לקוחות: אז מציגים את כולם, בלי תנועה.",
  note:"מקור: Cult UI logo-carousel (nolly-studio, https://github.com/nolly-studio/cult-ui, registry/default/ui/logo-carousel.tsx) ו-Eldora UI logo-cloud-04 (karthikmudunuri, https://github.com/karthikmudunuri/eldoraui, apps/www/registry/blocks/logo-cloud-04), רישיון MIT לשניהם. נכתב מחדש בלי React ובלי Framer Motion: שעון גלובלי אחד, Web Animations, ולוגואים כמסכת CSS.\n\nהבדל מהמהלכים הקרובים: b01 (מרקי) מזיז את כל הרצועה אופקית, ולכן לא ניתן לקרוא לוגו אחד בלי שהוא בורח; lm10 הוא קראפט של צבע, בלי תנועה, ושישה לוגואים בלבד. כאן אין תנועה אופקית, כל לוגו עומד במקום ונקרא בנחת, ושש משבצות מכילות 18 לקוחות: יותר לוגואים בפחות שטח.\n\nאיך זה עובד: 18 הלוגואים מחולקים round-robin בין שש המשבצות (משבצת 1 מקבלת את הלוגו 1, 7 ו-13). שעון אחד על requestAnimationFrame, שמתקדם רק כשהוא באמת צריך: מחוץ למסך (IntersectionObserver), בלשונית מוסתרת, בריחוף עכבר ובפוקוס מקלדת, ועל כפתור ההשהיה הוא עוצר לגמרי. כל משבצת מתחלפת כל 2.4 שניות, בהיסט של 260ms מהשכנה, בסדר שאינו סריקה משמאל לימין, כך שאף פעם שתי משבצות לא מתחלפות יחד. ההחלפה: הישן עולה 40% למעלה ונמוג בטשטוש של 4px תוך 0.3 שנייה, החדש עולה מלמטה ומתחדד תוך 0.4 שנייה. הלוגואים הם מסכה (mask) בצבע currentColor, כמו ב-lm10, ולכן הם לובשים את צבע הטקסט של הסקשן בכל עור, כהה או בהיר, בלי קובץ נוסף. בדמו הם SVG מוטבע; בפרויקט אמיתי url(\"logos/x.svg\"), כל לוגו בכל צבע.\n\nנגישות: כפתור השהיה גלוי (WCAG 2.2.2, תוכן שמתחלף מעבר לחמש שניות), 44 פיקסלים. רשימה מוסתרת-חזותית עם שמות כל הלקוחות לקורא מסך, והמשבצות עצמן aria-hidden, כך שקורא המסך לא שומע החלפות. בתנועה מופחתת אין החלפה: הרשת הסטטית מציגה את כל 18 הלוגואים (שלוש שורות של שישה, ובמובייל שש שורות של שלושה) והכפתור נעלם. בלי JS: הלוגו הראשון של כל משבצת גלוי. חזרה מלשונית מוסתרת לא יוצרת פרץ החלפות, כי הזמן בין פריימים נחתך. בטלפון: שלוש עמודות על שתי שורות.\n\nשלוש תשובות הגימור. (1) הגרסה הבנאלית: רצועת לוגואים נעה בלופ, שבה שום לוגו לא נקרא; כאן כל לוגו עומד במקום ומתחלף בנחת, ואין צורך בחצי רצועה כדי להראות 18 לקוחות. (2) מה נושא המשכיות: היציאה למעלה והכניסה מלמטה באותו כיוון, וההיסט בין המשבצות, שנותנים תחושה של גלגל אחד ולא של שש נורות מהבהבות; והכפתור שמראה מצב. (3) איזו פעולה זה מקל: לקרוא את הלוגו שמעניין אותך בלי לרדוף אחריו, ולעצור את הכל כשצריך.",
  libs:[],
  css:`.cw{position:relative;max-width:min(1180px,94vw);margin-inline:auto;color:var(--ink)}
.cw-bar{display:flex;align-items:center;justify-content:space-between;gap:var(--gap);margin-block-end:clamp(24px,3vw,40px)}
.cw-title{margin:0;font-size:15px;font-weight:500;color:var(--muted)}
.cw-pause{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:border-color .18s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.cw-pause:hover{border-color:var(--ink)}}
.cw-pause:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cw-pause svg{width:16px;height:16px}
.cw-pause .i-play,.cw-pause.is-paused .i-pause{display:none}
.cw-pause.is-paused .i-play{display:block}
.cw-wall{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:clamp(16px,3vw,48px);align-items:center}
.cw-cell{position:relative;height:clamp(40px,4.4vw,60px);opacity:.78}
/* הלב: הלוגו הוא מסכה וצבעו הוא currentColor (כמו ב-lm10). רק הלוגו הנוכחי בכל משבצת (is-on) נראה */
.cw-logo{position:absolute;inset:0;background:linear-gradient(currentColor,currentColor);-webkit-mask:var(--logo) center/contain no-repeat;mask:var(--logo) center/contain no-repeat;opacity:0;visibility:hidden}
.cw-logo.is-on{opacity:1;visibility:visible}
.cw-vh{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (max-width:767px){.cw-wall{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:24px}}
/* בתנועה מופחתת: רשת סטטית עם כל הלוגואים, הכפתור מיותר */
@media (prefers-reduced-motion: reduce){
  .cw-cell{display:contents}
  .cw-logo,.cw-logo.is-on{position:static;display:block;height:clamp(40px,4.4vw,60px);opacity:.78;visibility:visible}
  .cw-pause{display:none}
}`,
  html:`<div class="stage tight">
<section class="cw" aria-labelledby="cw-t">
  <div class="cw-bar">
    <p class="cw-title" id="cw-t">לקוחות שסומכים עלינו</p>
    <button class="cw-pause" type="button" aria-label="השהיית החלפת הלוגואים"><svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.5" height="14" rx="1"/><rect x="13.5" y="5" width="3.5" height="14" rx="1"/></svg><svg class="i-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></button>
  </div>
  <ul class="cw-wall" aria-hidden="true">
${cwCells}
  </ul>
  <div class="cw-vh"><p>הלקוחות שלנו:</p><ul>${cwNames}</ul></div>
</section>
</div>`,
  js:`(function(){
  const wrap=document.querySelector(".cw"),wall=wrap.querySelector(".cw-wall"),cells=[...wall.children],btn=wrap.querySelector(".cw-pause");
  const rq=matchMedia("(prefers-reduced-motion: reduce)"),hasA=typeof Element.prototype.animate==="function";
  const E="cubic-bezier(.2,.6,.2,1)",PERIOD=2400,STEP=260,FIRST=700;   // כל משבצת כל 2.4 שניות, בהיסט של 260ms מהשכנה
  // סדר ההחלפה: לא סריקה מצד לצד. מיון לפי השבר של i*0.618 נותן סדר מפוזר לכל מספר משבצות
  const seq=cells.map((_,i)=>i).sort((a,b)=>((a*.618)%1)-((b*.618)%1));
  const st=cells.map(c=>({logos:[...c.querySelectorAll(".cw-logo")],cur:0,at:0}));
  seq.forEach((ci,k)=>{st[ci].at=FIRST+k*STEP;});
  let elapsed=0,last=0,raf=0,inView=false,userPaused=false,hov=false,foc=false;
  // השעון רץ רק כשכל התנאים מתקיימים. אחרת requestAnimationFrame לא נקרא בכלל, ואין עבודה ברקע
  const live=()=>hasA&&!rq.matches&&inView&&!document.hidden&&!userPaused&&!hov&&!foc;
  function swap(s){
    if(s.logos.length<2)return;
    const old=s.logos[s.cur];s.cur=(s.cur+1)%s.logos.length;const nu=s.logos[s.cur];
    nu.classList.add("is-on");
    // הישן: למעלה, נמוג, מיטשטש. החדש: מלמטה, מתחדד. אחרי שהישן יצא מסירים ממנו את המצב
    const out=old.animate([{transform:"translateY(0%)",opacity:1,filter:"blur(0px)"},{transform:"translateY(-40%)",opacity:0,filter:"blur(4px)"}],{duration:300,easing:E,fill:"forwards"});
    out.finished.then(()=>{old.classList.remove("is-on");out.cancel();}).catch(()=>{});
    nu.animate([{transform:"translateY(40%)",opacity:0,filter:"blur(4px)"},{transform:"translateY(0%)",opacity:1,filter:"blur(0px)"}],{duration:400,delay:60,easing:E,fill:"backwards"});
  }
  function tick(t){
    raf=0;
    if(!live())return;
    // חיתוך של הפרש הזמן: חזרה מלשונית מוסתרת או מהשהיה לא יוצרת פרץ החלפות
    const dt=last?Math.min(t-last,100):16;last=t;elapsed+=dt;
    st.forEach(s=>{if(elapsed>=s.at){swap(s);s.at+=PERIOD;}});
    raf=requestAnimationFrame(tick);
  }
  function update(){
    if(live()){if(!raf){last=0;raf=requestAnimationFrame(tick);}}
    else{if(raf){cancelAnimationFrame(raf);raf=0;}last=0;}
  }
  if("IntersectionObserver" in window)new IntersectionObserver(es=>{inView=es[es.length-1].isIntersecting;update();},{threshold:.2}).observe(wall);
  else{inView=true;update();}
  document.addEventListener("visibilitychange",update);
  rq.addEventListener("change",update);
  // ריחוף עכבר ופוקוס מקלדת עוצרים זמנית (לא מגע: אצבע שנחה על המסך אינה "ריחוף")
  wrap.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse"){hov=true;update();}});
  wrap.addEventListener("pointerleave",()=>{hov=false;update();});
  wrap.addEventListener("focusin",()=>{if(wrap.querySelector(":focus-visible")){foc=true;update();}});
  wrap.addEventListener("focusout",e=>{if(!wrap.contains(e.relatedTarget)){foc=false;update();}});
  btn.addEventListener("click",()=>{
    userPaused=!userPaused;foc=false;                // לחיצה מפורשת גוברת על העצירה האוטומטית של הפוקוס
    btn.classList.toggle("is-paused",userPaused);
    btn.setAttribute("aria-label",userPaused?"הפעלת החלפת הלוגואים":"השהיית החלפת הלוגואים");
    update();
  });
})();`
},
];
