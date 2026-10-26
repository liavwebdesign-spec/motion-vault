// מהלכים בהשראת 31 הסרטונים הציבוריים בדף הבית של animtd.store (26.10.2026). ליאב: "אני רוצה שתעבור על המאגר המלא שלו
// ותטמיע כל דבר חדש שיכול להועיל ושונה ממה שיש לנו כיום. לא רק כמה בודדים".
// נבנו מאפס מהצפייה בלבד: בלי הפרומפטים, הקוד, הסרטונים, הטקסטים או תמונות הסטוק של המקור (הרישיון שם אוסר להשתמש בהם
// כמקור למאגר). התמונות מהמאגר שלנו (assets/media/real, team), והתוכן כתוב לעסקים אמיתיים בעברית.
// קבוצה א: רשימת שירותים מתערבלת, חבילות שמתהפכות, כרטיסי צוות, תפריט עם תצוגה מקדימה, שובל תמונות ומניפת יומן.

const E = "cubic-bezier(.2,.6,.2,1)";
const IO = "cubic-bezier(.76,0,.24,1)";
const SHADOW = "0 1px 2px color-mix(in srgb,var(--ink) 6%,transparent),0 6px 20px color-mix(in srgb,var(--ink) 5%,transparent)";
const IMG = (f, w, h, alt, cls = "") =>
  `<img${cls ? ` class="${cls}"` : ""} src="../assets/media/${f}" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const SVG_CSS = (sel) => `${sel}{width:18px;height:18px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}`;

// b105: חמשת השירותים
const CX = [
  ["אסטרטגיה", "מי הלקוח, מה הוא צריך לשמוע ואיפה הוא נמצא. כל פרויקט מתחיל כאן."],
  ["מיתוג", "שם, לוגו, צבעים ושפה, שנראים אותו דבר בכל מקום שהלקוח פוגש אתכם."],
  ["אתרים", "אתר תדמית או דף נחיתה שנטען מהר, נקרא בטלפון ומביא פניות."],
  ["חנויות", "חנות עם סליקה, משלוחים ומלאי, שמנהלים לבד מהיום הראשון."],
  ["קמפיינים", "מודעות בפייסבוק, באינסטגרם ובגוגל, עם מדידה של כל שקל."],
];

// b106: שלוש חבילות צילום
const FP = [
  { id: "a", name: "חצי יום", price: "₪2,400", lead: "עד ארבע שעות צילום. מתאים לחינה, לברית או ליום הולדת.",
    inc: ["צלם אחד", "עד ארבע שעות באירוע", "300 תמונות ערוכות", "גלריה דיגיטלית לשיתוף", "מסירה תוך שבועיים"] },
  { id: "b", name: "אירוע מלא", price: "₪4,900", lead: "מההתארגנות בבוקר ועד הריקוד האחרון.", hot: true,
    inc: ["שני צלמים", "עד עשר שעות באירוע", "700 תמונות ערוכות", "צילומי התארגנות וזוגיות", "אלבום מודפס של 30 עמודים", "מסירה תוך שלושה שבועות"] },
  { id: "c", name: "אירוע וסרט", price: "₪8,200", lead: "צילום מלא, וסרט קצר שאפשר לשלוח לכל המשפחה.",
    inc: ["שני צלמים וצלם וידאו", "עד עשר שעות באירוע", "700 תמונות ערוכות", "סרט של חמש דקות", "מסירה תוך חודש"] },
];

// b107: הצוות של משרד האדריכלים
const PR = [
  ["team/p1.webp", "אורי שחר", "אדריכל ושותף מנהל", "מלווה כל פרויקט מהסקיצה הראשונה ועד מסירת המפתח. עשרים שנה של בתים פרטיים ומבני ציבור.", "גבר מחייך בחולצה ורודה"],
  ["team/p2.webp", "מיכל דגן", "מעצבת פנים", "בוחרת חומרים, תאורה ורהיטים, ובונה לכל לקוח לוח השראה לפני שמזמינים משהו.", "אישה בחולצה כחולה מחייכת למצלמה"],
  ["team/p3.webp", "נטע אלון", "ניהול פרויקטים", "מתאמת בין הקבלנים, הספקים והלקוח, ומעדכנת כל שבוע מה נעשה ומה הבא בתור.", "אישה צוחקת בחולצת פסים"],
  ["team/p4.webp", "רפי גולן", "הנדסאי ושרטוט", "מכין את התוכניות להיתר ולביצוע, ומוודא שכל מידה בשרטוט נכונה גם באתר.", "גבר עם זקן בחולצה לבנה"],
];

// b108: קישורי התפריט, התמונה של כל אחד והכיתוב שלה
const MC = [
  ["פרויקטים", "real/s13/proj-a.webp", 1800, 1200, "סלון כהה עם ספה נמוכה ומנורות תלויות", "דירה בצפון תל אביב"],
  ["שירותים", "real/s13/room.webp", 2200, 1469, "פינת קריאה עם כורסה ומדפים מוארים", "פינת קריאה בבית בהרצליה"],
  ["תהליך", "real/s13/proj-c.webp", 2400, 1026, "מטבח כהה עם אי שיש ומנורות", "מטבח בבית פרטי ברעננה"],
  ["אודות", "real/s13/proj-b.webp", 1200, 1600, "חדר רחצה כהה עם מראה עגולה וכיור שיש", "חדר רחצה בפנטהאוז ביפו"],
  ["צור קשר", "real/s13/hero.webp", 2560, 1435, "אור שמש נכנס דרך חלון לחדר כהה", "הסטודיו שלנו בבוקר"],
];

// b110: חמשת ימי המסלול
const CF = [
  ["יום ראשון", "יוצאים לדרך", "אוספים את הוואן בבוקר, ממלאים מים ויוצאים צפונה עם רשימת שירים אחת.", "real/s12/van-door.webp", 1000, 1200, "אישה יושבת בפתח של ואן עם רדיו"],
  ["יום שני", "קפה בחלון", "בוקר בחניון לילה מעל הים, קפה מהתרמוס, ואף אחד לא ממהר.", "real/s12/thermos.webp", 900, 1200, "שתי חברות מוזגות קפה מתרמוס בתוך ואן"],
  ["יום שלישי", "שלושה בחלון", "עוצרים על צוק מעל החוף ומחכים שהשמש תשקע.", "real/s12/hero-window.webp", 1100, 1100, "שלושה חברים מסתכלים החוצה מחלון הוואן"],
  ["יום רביעי", "מחנה בשדה", "כיסאות, שולחן מתקפל ורדיו. מבשלים ארוחת ערב בחוץ.", "real/s12/dusk-camp.webp", 1000, 1000, "ואן חונה בשדה ולידו כיסאות ושולחן מתקפל"],
  ["יום חמישי", "הים בסוף", "השקיעה האחרונה מהחוף, ומחר מחזירים את הוואן.", "real/s08/sea.webp", 2560, 1706, "שמש שוקעת משתקפת במים כהים"],
];

export default [
{
  id:"b105", cat:"behavior", name:"שירותים שהשם שלהם מתערבל ומתייצב", tech:"JS · requestAnimationFrame · IntersectionObserver", status:"מאושר-עין", runway:false,
  desc:"רשימה של חמישה שירותים בכותרות גדולות. כשהעכבר עובר על שורה, השם שלה מתערבל לאותיות, ספרות וסימנים אקראיים ומתייצב בחזרה אות אחרי אות, מתחילת המילה, כמו קוד שמתפענח. השורה מקבלת משטח, והחץ זז לכיוון הקריאה.",
  when:"רשימת שירותים, תחומים או מוצרים של סטודיו, משרד פרסום, חברת תוכנה או סייבר, שבה המילים קצרות (מילה עד שתיים בשורה). משהו אחד כזה בעמוד. לא לטקסט רץ, לא לכותרת ארוכה, ולא באתר שמוכר שקט ואמון, כמו קליניקה, משרד עורכי דין או בית אבות.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של רשימה שהמילים בה מתערבלות במעבר עכבר. נבנה מאפס מהצפייה. **הטקסט האמיתי לא נוגע:** כל שם נשאר מחרוזת אחת בתוך `.cx-t`, וה-JS מוסיף מעליו שכבה (`.cx-ov`, `aria-hidden`) עם שני חלקים: מה שכבר התייצב, ושאר המילה באותיות אקראיות בצבע ה-accent. בזמן הערבול הטקסט האמיתי שקוף, ולכן הפריסה לא זזה וקורא מסך שומע את המילה הנכונה. **זו לא חלוקה לאותיות:** אין span לכל אות ואין אנימציה לכל אות (התורה אוסרת לפרק עברית לאותיות), אלא החלפה של מחרוזת שלמה בכל פריים. **הקצב:** המשך תלוי באורך המילה (320ms ועוד 70ms לאות, עד 950ms), והאותיות מתייצבות מתחילת המילה, כלומר מימין לשמאל בעברית. המאגר האקראי הוא אותיות עבריות, ספרות וכמה סימנים, כדי שזה ייראה כמו פענוח ולא כמו פונט שבור. **מגע:** אין ריחוף, ולכן כל שורה מתפענחת פעם אחת כשהיא נכנסת למסך (IntersectionObserver). **מקלדת:** פוקוס על השורה מפעיל את אותו ערבול, ויש טבעת פוקוס ברורה. **הפחתת תנועה:** אין ערבול בכלל; נשארים המשטח והחץ. **באתר משמאל לימין** החץ מתהפך והאותיות מתייצבות משמאל, בלי שינוי בקוד. **קווים:** אין קווי הפרדה בין השורות; ההפרדה היא המרווח והמשטח בריחוף.",
  libs:[],
  css:`.cx{display:grid;gap:clamp(24px,3vw,40px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)}
.cx-hd{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px 40px}
.cx-hd h2{margin:0;font-size:clamp(28px,3vw,40px);font-weight:700;line-height:1.15}
.cx-hd p{margin:0;max-width:38ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.cx-list{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.cx-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;align-items:center;gap:24px;padding:16px 24px;border-radius:20px;color:inherit;text-decoration:none;transition:background-color .3s ${E}}
.cx-w{position:relative;justify-self:start;font-size:clamp(36px,5vw,72px);font-weight:800;line-height:1.1;letter-spacing:-.02em;white-space:nowrap}
.cx-t{transition:color .15s ${E}}
.cx-w.is-mix .cx-t{color:transparent}
.cx-ov{position:absolute;inset-block-start:0;inset-inline-start:0;white-space:nowrap;pointer-events:none}
.cx-ov i{font-style:normal;color:var(--accent)}
.cx-d{margin:0;max-width:36ch;color:var(--muted);font-size:var(--fs-body);line-height:1.55}
.cx-ar{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:var(--card);color:var(--ink);transition:transform .35s ${E},background-color .35s ${E},color .35s ${E}}
${SVG_CSS(".cx-ar svg")}
.cx-row:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cx-row:focus-visible .cx-ar{background:var(--accent);color:var(--accent-ink)}
@media(hover:hover) and (pointer:fine){.cx-row:hover{background:var(--card)}.cx-row:hover .cx-ar{background:var(--accent);color:var(--accent-ink);transform:translateX(-6px)}}
@media(max-width:767px){.cx-row{grid-template-columns:minmax(0,1fr) auto;gap:8px 16px;padding:14px 12px}.cx-d{grid-column:1/-1;grid-row:2}}`,
  html:`<div class="stage"><section class="cx" data-cx>
  <div class="cx-hd">
    <h2>מה אנחנו עושים</h2>
    <p>חמישה תחומים וצוות אחד. אפשר להתחיל מאחד מהם, או לעבור את כולם יחד.</p>
  </div>
  <ul class="cx-list">
${CX.map(([w, d]) => `    <li><a class="cx-row" href="#"><span class="cx-w"><span class="cx-t">${w}</span></span><p class="cx-d">${d}</p><span class="cx-ar">${ARROW}</span></a></li>`).join("\n")}
  </ul>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-cx]");
  if(!root)return;
  const still=matchMedia("(prefers-reduced-motion: reduce)");
  const fine=matchMedia("(hover: hover) and (pointer: fine)");
  // אותיות, ספרות וכמה סימנים: נראה כמו קוד שמתפענח ולא כמו פונט שבור
  const POOL="אבגדהוזחטיכלמנסעפצקרשת0123456789#%&*+=?";
  root.querySelectorAll(".cx-w").forEach(w=>{
    const txt=w.querySelector(".cx-t").textContent;
    const ov=document.createElement("span"),done=document.createElement("span"),rest=document.createElement("i");
    ov.className="cx-ov";ov.setAttribute("aria-hidden","true");ov.append(done,rest);w.append(ov);
    const DUR=Math.min(950,320+txt.length*70);
    let raf=0,t0=0;
    const stop=()=>{cancelAnimationFrame(raf);raf=0;w.classList.remove("is-mix");done.textContent="";rest.textContent="";};
    const tick=now=>{
      if(!t0)t0=now;
      const p=Math.min(1,(now-t0)/DUR),n=Math.floor(p*txt.length);   // n אותיות כבר התייצבו, מתחילת המילה
      let r="";
      for(let i=n;i<txt.length;i++)r+=txt[i]===" "?" ":POOL[Math.floor(Math.random()*POOL.length)];
      done.textContent=txt.slice(0,n);rest.textContent=r;
      if(p<1)raf=requestAnimationFrame(tick);else stop();
    };
    w.mix=()=>{if(still.matches)return;cancelAnimationFrame(raf);t0=0;w.classList.add("is-mix");raf=requestAnimationFrame(tick);};
  });
  const rows=[...root.querySelectorAll(".cx-row")];
  rows.forEach(row=>{
    const w=row.querySelector(".cx-w");
    row.addEventListener("pointerenter",()=>{if(fine.matches)w.mix();});
    row.addEventListener("focus",()=>w.mix());
  });
  // במסך מגע אין ריחוף: כל שורה מתפענחת פעם אחת כשהיא נכנסת למסך
  if(!fine.matches&&"IntersectionObserver" in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(!e.isIntersecting)return;
      io.unobserve(e.target);
      setTimeout(()=>e.target.querySelector(".cx-w").mix(),120);
    }),{threshold:.6});
    rows.forEach(r=>io.observe(r));
  }
})();`
},
{
  id:"b106", cat:"behavior", name:"כרטיס חבילה שמתהפך ומראה מה כלול", tech:"CSS 3D · JS · inert", status:"מאושר-עין", runway:false,
  desc:"שלושה כרטיסי חבילה, ובכל אחד שם, מחיר ומשפט אחד. לחיצה על «מה כלול» הופכת את הכרטיס כמו קלף, ובגב שלו מופיעים כל הפריטים בחבילה וכפתור לבדיקת תאריך. «חזרה» הופך אותו בחזרה. החבילה המומלצת כהה ומסומנת.",
  when:"עמוד מחירים או סקשן חבילות עם שלוש עד ארבע חבילות, שהרשימה של כל אחת ארוכה מדי לכרטיס: צלם, מאמן, ספק אירועים, סטודיו, שירות חודשי. הכרטיס נשאר קצר ונקי, ומי שרוצה פרטים הופך אותו. לא כשהלקוח צריך להשוות שורה מול שורה בין החבילות, כי בכרטיס הפוך רואים חבילה אחת בכל פעם; שם טבלה או C20 עם רשימות פתוחות.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של כרטיס תמחור שמתהפך ומראה את הפירוט מאחור. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** C20 מציג את כל הרשימות פתוחות, ו-c27 (מה כלול ומה לא) נפסל ב-25.10. כאן הרשימה מאחורי הכרטיס, והכרטיס עצמו נשאר מחיר ומשפט. **המבנה:** שני הצדדים (`.fp-front`, `.fp-back`) יושבים באותו תא גריד (`grid-area`), ולכן גובה הכרטיס הוא גובה הצד הגבוה, ושלושת הכרטיסים באותו גובה. **בלי JS** שני הצדדים מוצגים זה מתחת לזה, וכל המידע נגיש. **עם JS** (`is-live`) הם עוברים לאותו תא, `backface-visibility:hidden`, והגב מסובב ב-180 מעלות. ההיפוך הוא `rotateY` של העטיפה ב-0.7 שנייה בעקומת in-out המאושרת, עם `perspective` על הכרטיס. **נגישות:** הצד שלא נראה מקבל `inert`, כך שאי אפשר להגיע אליו בטאב ולא ללחוץ עליו; הפוקוס עובר לכפתור «חזרה» אחרי ההיפוך, וחוזר ל«מה כלול» אחרי החזרה; Escape הופך בחזרה; לכפתור יש `aria-expanded`. **המחיר** בתוך `unicode-bidi:isolate` עם `dir=ltr`, כדי שהסימן והפסיק לא יקפצו בשורה עברית. **הפחתת תנועה:** אין סיבוב; הצדדים מתחלפים בעמעום של רבע שנייה. **בטלפון** הכרטיסים אחד מתחת לשני, וההיפוך זהה.",
  libs:[],
  css:`.fp{display:grid;gap:clamp(28px,4vw,48px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink)}
.fp-hd{display:grid;gap:12px;max-width:40rem}
.fp-hd h2{margin:0;font-size:clamp(30px,3.4vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.fp-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fp-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2vw,24px)}
.fp-card{perspective:1400px}
.fp-in{display:grid;gap:12px;height:100%}
.fp-face{display:flex;flex-direction:column;gap:16px;padding:clamp(24px,2.6vw,32px);border-radius:24px;background:var(--card);color:var(--ink);box-shadow:${SHADOW}}
.fp-hot .fp-front{background:var(--ink);color:var(--bg)}
.fp-tag{align-self:flex-start;padding:6px 12px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:700}
.fp-face h3{margin:0;font-size:clamp(22px,2vw,28px);font-weight:700;line-height:1.2}
.fp-pr{margin:0;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}
.fp-num{font-size:clamp(40px,4.4vw,60px);font-weight:800;line-height:1;letter-spacing:-.02em;unicode-bidi:isolate;font-variant-numeric:tabular-nums}
.fp-pr small{font-size:14px;opacity:.7}
.fp-lead{margin:0;font-size:var(--fs-body);line-height:1.6;opacity:.85}
.fp-open,.fp-close{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:12px 24px;border:0;border-radius:999px;background:color-mix(in srgb,currentColor 10%,transparent);color:inherit;font:inherit;font-weight:600;cursor:pointer;transition:background-color .25s ${E}}
.fp-open{margin-top:auto;align-self:flex-start}
${SVG_CSS(".fp-open svg,.fp-close svg")}
.fp-close svg{transform:scaleX(-1)}
.fp-open:focus-visible,.fp-close:focus-visible,.fp-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
@media(hover:hover) and (pointer:fine){.fp-open:hover,.fp-close:hover{background:color-mix(in srgb,currentColor 18%,transparent)}}
.fp-back h4{margin:0;font-size:18px;font-weight:700}
.fp-back ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.fp-back li{display:flex;align-items:flex-start;gap:10px;font-size:16px;line-height:1.5}
.fp-back li svg{width:18px;height:18px;flex:none;margin-top:4px;fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.fp-acts{margin-top:auto;display:flex;flex-wrap:wrap;gap:10px}
.fp-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
/* חי: שני הצדדים באותו תא, והעטיפה מסתובבת */
.fp.is-live .fp-in{grid-template-areas:"x";gap:0;transform-style:preserve-3d;transition:transform .7s ${IO}}
.fp.is-live .fp-face{grid-area:x;-webkit-backface-visibility:hidden;backface-visibility:hidden}
.fp.is-live .fp-back{transform:rotateY(180deg)}
.fp.is-live .fp-card.is-flip .fp-in{transform:rotateY(180deg)}
@media(prefers-reduced-motion:reduce){
  .fp.is-live .fp-in{transition:none;transform:none!important}
  .fp.is-live .fp-face{transition:opacity .25s ${E},visibility .25s}
  .fp.is-live .fp-back{transform:none;opacity:0;visibility:hidden}
  .fp.is-live .fp-card.is-flip .fp-front{opacity:0;visibility:hidden}
  .fp.is-live .fp-card.is-flip .fp-back{opacity:1;visibility:visible}}
@media(max-width:860px){.fp-grid{grid-template-columns:minmax(0,1fr)}}`,
  html:`<div class="stage"><section class="fp" data-fp>
  <div class="fp-hd">
    <h2>חבילות צילום לאירוע</h2>
    <p>המחיר כולל נסיעות בכל אזור המרכז. לחצו על «מה כלול» כדי לראות מה בדיוק מקבלים בכל חבילה.</p>
  </div>
  <ul class="fp-grid">
${FP.map(p => `    <li class="fp-card${p.hot ? " fp-hot" : ""}">
      <div class="fp-in">
        <div class="fp-face fp-front">
          ${p.hot ? '<span class="fp-tag">הכי נבחרת</span>\n          ' : ""}<h3>${p.name}</h3>
          <p class="fp-pr"><span class="fp-num" dir="ltr">${p.price}</span><small>לאירוע</small></p>
          <p class="fp-lead">${p.lead}</p>
          <button class="fp-open" type="button" aria-expanded="false" aria-controls="fp-${p.id}">מה כלול ${ARROW}</button>
        </div>
        <div class="fp-face fp-back" id="fp-${p.id}">
          <h4>מה כלול ב${p.name === "אירוע מלא" ? "אירוע המלא" : p.name}</h4>
          <ul>
${p.inc.map(i => `            <li>${CHECK}<span>${i}</span></li>`).join("\n")}
          </ul>
          <div class="fp-acts"><a class="fp-cta" href="#">לבדוק תאריך</a><button class="fp-close" type="button">${ARROW} חזרה</button></div>
        </div>
      </div>
    </li>`).join("\n")}
  </ul>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-fp]");
  if(!root)return;
  root.classList.add("is-live");          // בלי JS שני הצדדים גלויים זה מתחת לזה
  root.querySelectorAll(".fp-card").forEach(card=>{
    const front=card.querySelector(".fp-front"),back=card.querySelector(".fp-back");
    const open=card.querySelector(".fp-open"),close=card.querySelector(".fp-close");
    back.inert=true;
    const set=on=>{
      card.classList.toggle("is-flip",on);
      front.inert=on;back.inert=!on;
      open.setAttribute("aria-expanded",String(on));
      // הפוקוס עובר לצד שנראה, אחרת הוא נשאר על כפתור שהסתובב לגב
      (on?close:open).focus({preventScroll:true});
    };
    open.addEventListener("click",()=>set(true));
    close.addEventListener("click",()=>set(false));
    card.addEventListener("keydown",e=>{if(e.key==="Escape"&&card.classList.contains("is-flip"))set(false);});
  });
})();`
},
{
  id:"b107", cat:"behavior", name:"כרטיסי צוות שנצבעים ונפתחים", tech:"CSS grid-template-rows · filter · JS", status:"מאושר-עין", runway:false,
  desc:"ארבעה כרטיסי צוות בשחור לבן, ועל כל אחד לוחית עם שם ותפקיד. כשהעכבר עובר על כרטיס, הצילום נצבע ומתקרב מעט, והלוחית נפתחת כלפי מעלה ומראה שני משפטים על האדם. בטלפון הלוחית נפתחת בכפתור הפלוס.",
  when:"סקשן צוות של משרד, סטודיו, קליניקה או חברה קטנה, עם שלושה עד שישה אנשים ותמונות באותו סגנון. שחור לבן במנוחה מאחד צילומים שצולמו בתנאים שונים. לא כשהצילומים לא אחידים בחיתוך (פנים במרכז, אותו גובה), ולא לצוות של עשרים, שם רשת פשוטה עם שם ותפקיד.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של כרטיסי פרופיל שנצבעים ונפתחים במעבר עכבר. נבנה מאפס מהצפייה. **הלוחית:** `.pr-info` יושבת בתחתית הכרטיס מעל הצילום, על `var(--card)`, והביו בתוכה נפתח ב-`grid-template-rows` מ-0fr ל-1fr. בגלל שהלוחית מעוגנת לתחתית, היא גדלה כלפי מעלה ולא דוחפת את הכרטיסים שמתחת. **הצילום:** `filter:grayscale(1)` במנוחה, צבע מלא ו-`scale(1.04)` בפתיחה, בתוך מסגרת עם `overflow:hidden`. **בלי JS** הכל פתוח וצבעוני, כלומר הערך הסופי נמצא במארקאפ; ה-JS מוסיף `is-live` שסוגר ומאפיר, ומציג את כפתור הפלוס (`hidden` עד אז, כי בלי JS הוא לא עושה כלום). **מגע ומקלדת:** הכפתור מחליף `is-open` עם `aria-expanded`, והפלוס מסתובב ל-X. בעכבר הפתיחה היא בריחוף, והכפתור נשאר בשביל המקלדת. **בטלפון** הכרטיסים בשורה נגללת עם הצמדה (`scroll-snap`), כרטיס וקצת בכל מסך, במקום ארבעה כרטיסים גבוהים זה מתחת לזה. **התמונות** מ-Freepik ברישיון המנוי (`assets/media/team/credits.json`). **הפחתת תנועה:** בלי הגדלה, והמעברים קצרים.",
  libs:[],
  css:`.pr{display:grid;gap:clamp(28px,4vw,48px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink);overflow:clip}
.pr-hd{display:grid;gap:12px;max-width:40rem}
.pr-hd h2{margin:0;font-size:clamp(30px,3.4vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.pr-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pr-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.pr-card{position:relative;isolation:isolate;overflow:hidden;aspect-ratio:3/4;border-radius:24px;background:var(--card)}
.pr-ph{position:absolute;inset:0;margin:0}
.pr-ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 20%;transition:filter .6s ${E},transform .8s ${E}}
.pr-info{position:absolute;inset-inline:12px;inset-block-end:12px;z-index:1;display:grid;padding:14px 16px;border-radius:16px;background:var(--card);color:var(--ink);box-shadow:${SHADOW}}
.pr-top{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:2px 12px}
.pr-top h3{margin:0;font-size:18px;font-weight:700;line-height:1.25}
.pr-role{grid-column:1;margin:0;font-size:14px;color:var(--muted)}
.pr-more{grid-column:2;grid-row:1/span 2;display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:color-mix(in srgb,var(--ink) 8%,transparent);color:var(--ink);cursor:pointer;transition:transform .4s ${E},background-color .25s ${E}}
.pr-more[hidden]{display:none}
${SVG_CSS(".pr-more svg")}
.pr-more:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pr-bio{display:grid;grid-template-rows:1fr;transition:grid-template-rows .5s ${E}}
.pr-bio>div{min-height:0;overflow:hidden}
.pr-bio p{margin:0;padding-top:10px;font-size:15px;line-height:1.55}
/* חי: סגור ואפור עד שפותחים */
.pr.is-live .pr-bio{grid-template-rows:0fr}
.pr.is-live .pr-ph img{filter:grayscale(1)}
.pr.is-live .pr-card.is-open .pr-bio{grid-template-rows:1fr}
.pr.is-live .pr-card.is-open .pr-ph img{filter:none;transform:scale(1.04)}
.pr.is-live .pr-card.is-open .pr-more{transform:rotate(45deg)}
@media(hover:hover) and (pointer:fine){
  .pr.is-live .pr-card:hover .pr-bio{grid-template-rows:1fr}
  .pr.is-live .pr-card:hover .pr-ph img{filter:none;transform:scale(1.04)}
  .pr.is-live .pr-card:hover .pr-more{transform:rotate(45deg)}}
@media(prefers-reduced-motion:reduce){.pr-ph img{transition-duration:.2s}.pr.is-live .pr-card .pr-ph img{transform:none!important}.pr-bio{transition-duration:.2s}}
@media(max-width:1000px){.pr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.pr-grid{grid-auto-flow:column;grid-template-columns:none;grid-auto-columns:78%;overflow-x:auto;scroll-snap-type:x mandatory;margin-inline:-20px;padding:0 20px 8px;scroll-padding-inline:20px;scrollbar-width:none}.pr-card{scroll-snap-align:start}}`,
  html:`<div class="stage"><section class="pr" data-pr>
  <div class="pr-hd">
    <h2>הצוות שילווה את הבית שלכם</h2>
    <p>ארבעה אנשים ומשרד אחד בתל אביב. בכל פרויקט אתם מכירים את כולם, ומדברים ישירות עם מי שעושה את העבודה.</p>
  </div>
  <ul class="pr-grid">
${PR.map(([f, n, r, b, alt], i) => `    <li class="pr-card">
      <figure class="pr-ph">${IMG(f, 720, 960, alt)}</figure>
      <div class="pr-info">
        <div class="pr-top"><h3>${n}</h3><p class="pr-role">${r}</p><button class="pr-more" type="button" hidden aria-expanded="false" aria-controls="pr-b${i}" aria-label="עוד על ${n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>
        <div class="pr-bio" id="pr-b${i}"><div><p>${b}</p></div></div>
      </div>
    </li>`).join("\n")}
  </ul>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-pr]");
  if(!root)return;
  root.classList.add("is-live");          // בלי JS הכל פתוח וצבעוני
  root.querySelectorAll(".pr-more").forEach(b=>{
    const card=b.closest(".pr-card");
    b.hidden=false;
    b.addEventListener("click",()=>{
      const on=!card.classList.contains("is-open");
      card.classList.toggle("is-open",on);
      b.setAttribute("aria-expanded",String(on));
    });
  });
})();`
},
{
  id:"b108", cat:"behavior", name:"תפריט וילון עם תמונה לכל קישור", tech:"CSS clip-path · JS · inert", status:"מאושר-עין", runway:false,
  desc:"לחיצה על «תפריט» מורידה מלמעלה וילון כהה על כל המסך. הקישורים נכנסים בזה אחר זה בכתב גדול, ולידם תמונה. כשהעכבר עובר על קישור, השאר מתעמעמים, ליד הקישור מופיע חץ, והתמונה מתחלפת לפרויקט שמייצג אותו, עם כיתוב קצר.",
  when:"אתר תדמית שהעבודות הן המוצר: אדריכלות, עיצוב פנים, צילום, סטודיו, מלון בוטיק. תפריט של ארבעה עד שישה קישורים. לא לאתר עם תפריט עמוק או חנות עם קטגוריות, שם מגה תפריט, ולא כשאין תמונה טובה לכל קישור. בטלפון התמונה יורדת ונשאר התפריט הגדול.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של תפריט מסך מלא שבו כל קישור מחליף תמונה בצד. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** b23 הוא תפריט מסך מלא בלי תמונות, ו-g43 הוא תמונה שעוקבת אחרי הסמן ברשימה. כאן התמונה קבועה במקום, ומתחלפת לפי הקישור. **הווילון:** `clip-path:inset(0 0 100% 0)` שנפתח ל-`inset(0)` ב-0.8 שנייה בעקומת in-out המאושרת (מעבר על פני המסך), ואחריו הקישורים עולים בדירוג של 60ms. **התמונה:** כל התמונות בערימה אחת, והפעילה מקבלת `is-on` (שקיפות והקטנה קלה מ-1.06). **המיקוד:** כשהתפריט פתוח, העמוד וההדר מקבלים `inert` (מלכודת פוקוס בלי ספרייה), הפוקוס עובר לקישור הראשון, Escape וכפתור הסגירה מחזירים אותו לכפתור «תפריט». פוקוס מהמקלדת על קישור עושה את מה שעושה הריחוף. **בדמו** הווילון מכסה את הבמה (`position:absolute`); בפרויקט הוא `position:fixed`, וה-`inert` עובר לכל מה שמחוץ לתפריט, כולל `main` והפוטר. **בלי JS** התפריט מוצג כרשימה רגילה מתחת להדר. **הפחתת תנועה:** בלי וילון ובלי עלייה, התפריט מופיע בעמעום קצר. **באתר משמאל לימין** החץ מתהפך.",
  libs:[],
  css:`.mc{position:relative;isolation:isolate;overflow:clip;min-height:clamp(560px,52vw,680px);border-radius:clamp(20px,2.4vw,32px);background:var(--card);color:var(--ink)}
.mc-bar,.mc-top{display:flex;align-items:center;justify-content:space-between;gap:16px}
.mc-bar{padding:20px clamp(20px,3vw,40px)}
.mc-logo{font-size:18px;font-weight:800}
.mc-tg{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:8px 18px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-size:15px;font-weight:600;cursor:pointer}
${SVG_CSS(".mc-tg svg,.mc-x svg")}
.mc-tg:focus-visible,.mc-x:focus-visible,.mc-links a:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.mc-page{display:grid;gap:16px;justify-items:start;max-width:40rem;padding:clamp(48px,7vw,96px) clamp(20px,3vw,40px)}
.mc-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.mc-page h2{margin:0;font-size:clamp(36px,5vw,68px);font-weight:800;line-height:1.05;letter-spacing:-.02em;text-wrap:balance}
.mc-page p{margin:0;max-width:40ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.mc-p{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);grid-template-rows:auto 1fr auto;column-gap:clamp(24px,4vw,64px);row-gap:16px;padding:20px clamp(20px,3vw,40px) clamp(24px,3vw,40px);background:var(--ink);color:var(--bg)}
.mc-top{grid-column:1/-1}
.mc-x{display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:color-mix(in srgb,var(--bg) 12%,transparent);color:var(--bg);cursor:pointer}
.mc-links{list-style:none;margin:0;padding:0;display:grid;align-content:center;gap:4px}
.mc-links a{display:inline-flex;align-items:center;gap:16px;padding:4px 0;color:inherit;text-decoration:none;font-size:clamp(36px,4.6vw,64px);font-weight:800;line-height:1.1;letter-spacing:-.02em;transition:opacity .35s ${E}}
.mc-links a svg{width:.6em;height:.6em;flex:none;fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:translateX(16px);transition:opacity .35s ${E},transform .35s ${E}}
.mc-links.is-dim a{opacity:.35}
.mc-links.is-dim a.is-on{opacity:1}
.mc-links a.is-on svg{opacity:1;transform:none}
.mc-pv{position:relative;align-self:center;margin:0;aspect-ratio:4/5;max-height:min(100%,520px);width:100%;border-radius:20px;overflow:hidden;background:color-mix(in srgb,var(--bg) 8%,transparent)}
.mc-pv img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.06);transition:opacity .6s ${E},transform .9s ${E}}
.mc-pv img.is-on{opacity:1;transform:none}
.mc-pv figcaption{position:absolute;inset-inline-start:16px;inset-block-end:16px;padding:8px 14px;border-radius:999px;background:color-mix(in srgb,var(--ink) 62%,transparent);color:var(--bg);font-size:14px;font-weight:600;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.mc-pv figcaption span{display:none}
.mc-pv figcaption span.is-on{display:inline}
.mc-foot{grid-column:1/-1;margin:0;font-size:14px;opacity:.7}
.mc-foot a{color:inherit}
/* חי: התפריט הוא שכבה מעל העמוד, שיורדת כמו וילון */
.mc.is-live .mc-p{position:absolute;inset:0;z-index:2;clip-path:inset(0 0 100% 0);visibility:hidden;transition:clip-path .8s ${IO},visibility 0s .8s}
.mc.is-live.is-open .mc-p{clip-path:inset(0);visibility:visible;transition:clip-path .8s ${IO},visibility 0s}
.mc.is-live .mc-links li,.mc.is-live .mc-pv{opacity:0;transform:translateY(24px);transition:opacity .4s ${E},transform .5s ${E}}
.mc.is-live.is-open .mc-links li{opacity:1;transform:none;transition-duration:.6s;transition-delay:calc(.4s + var(--i) * 60ms)}
.mc.is-live.is-open .mc-pv{opacity:1;transform:none;transition-duration:.7s;transition-delay:.55s}
@media(prefers-reduced-motion:reduce){
  .mc.is-live .mc-p{clip-path:none;opacity:0;transition:opacity .2s ${E},visibility 0s .2s}
  .mc.is-live.is-open .mc-p{clip-path:none;opacity:1;transition:opacity .2s ${E},visibility 0s}
  .mc.is-live .mc-links li,.mc.is-live .mc-pv,.mc.is-live.is-open .mc-links li,.mc.is-live.is-open .mc-pv{opacity:1;transform:none;transition:none}
  .mc-pv img{transition-duration:.2s;transform:none}}
@media(max-width:767px){.mc-p{grid-template-columns:minmax(0,1fr)}.mc-pv{display:none}.mc-links a{font-size:clamp(34px,10vw,48px)}}`,
  html:`<div class="stage"><section class="mc" data-mc>
  <div class="mc-bar">
    <b class="mc-logo">סטודיו אורן</b>
    <button class="mc-tg" type="button" aria-expanded="false" aria-controls="mc-p">תפריט <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button>
  </div>
  <div class="mc-page">
    <p class="mc-k">עיצוב פנים ואדריכלות</p>
    <h2>בתים שקטים, שנבנו סביב האור</h2>
    <p>אנחנו מתכננים דירות ובתים פרטיים מהקירות ועד המנורה האחרונה, עם חומרים טבעיים ומעט מאוד רעש.</p>
  </div>
  <nav class="mc-p" id="mc-p" aria-label="תפריט ראשי">
    <div class="mc-top"><b class="mc-logo">סטודיו אורן</b><button class="mc-x" type="button" aria-label="סגירת התפריט"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <ul class="mc-links">
${MC.map(([t], i) => `      <li style="--i:${i}"><a href="#">${t} ${ARROW}</a></li>`).join("\n")}
    </ul>
    <figure class="mc-pv" aria-hidden="true">
${MC.map(([, f, w, h, alt], i) => `      ${IMG(f, w, h, alt, i === 0 ? "is-on" : "")}`).join("\n")}
      <figcaption>${MC.map(([, , , , , c], i) => `<span${i === 0 ? ' class="is-on"' : ""}>${c}</span>`).join("")}</figcaption>
    </figure>
    <p class="mc-foot">הסטודיו ברחוב הנביאים בתל אביב · <a href="#">לשלוח לנו הודעה</a></p>
  </nav>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-mc]");
  if(!root)return;
  const tg=root.querySelector(".mc-tg"),x=root.querySelector(".mc-x"),panel=root.querySelector(".mc-p");
  const page=root.querySelector(".mc-page"),bar=root.querySelector(".mc-bar"),list=panel.querySelector(".mc-links");
  const links=[...list.querySelectorAll("a")],imgs=[...panel.querySelectorAll(".mc-pv img")],caps=[...panel.querySelectorAll(".mc-pv figcaption span")];
  root.classList.add("is-live");panel.inert=true;     // בלי JS התפריט הוא רשימה רגילה מתחת להדר
  const show=i=>[links,imgs,caps].forEach(g=>g.forEach((el,k)=>el.classList.toggle("is-on",k===i)));
  const set=on=>{
    root.classList.toggle("is-open",on);
    panel.inert=!on;page.inert=on;bar.inert=on;       // מלכודת פוקוס: מה שמאחורי הווילון לא נגיש
    tg.setAttribute("aria-expanded",String(on));
    if(on){show(0);list.classList.remove("is-dim");setTimeout(()=>links[0].focus({preventScroll:true}),80);}
    else tg.focus({preventScroll:true});
  };
  tg.addEventListener("click",()=>set(true));
  x.addEventListener("click",()=>set(false));
  root.addEventListener("keydown",e=>{if(e.key==="Escape"&&root.classList.contains("is-open"))set(false);});
  links.forEach((a,i)=>{
    a.addEventListener("pointerenter",()=>{show(i);list.classList.add("is-dim");});
    a.addEventListener("focus",()=>{if(a.matches(":focus-visible")){show(i);list.classList.add("is-dim");}});
    a.addEventListener("click",e=>{e.preventDefault();set(false);});   // בדמו; בפרויקט הקישור מנווט
  });
  list.addEventListener("pointerleave",()=>list.classList.remove("is-dim"));
})();`
},
{
  id:"b109", cat:"behavior", name:"שובל תמונות אחרי העכבר", tech:"JS · Web Animations API · pointer", status:"מאושר-עין", runway:false,
  desc:"כותרת גדולה באמצע הסקשן, ומסביבה קולאז' שקט של חמש תמונות מהאירוע. כשמזיזים את העכבר, הקולאז' מתפנה והעכבר משאיר אחריו שובל של תמונות: כל אחת קופצת במקום, מוטה מעט, ונעלמת אחרי רגע. בטלפון כל הקשה משאירה תמונה אחת.",
  when:"אירוע, פסטיבל, מסעדה, סטודיו לצילום או מותג אופנה, שיש לו הרבה תמונות טובות ומעט מה להסביר. סקשן אחד בעמוד, בדרך כלל הפתיח או ההזמנה לאירוע. לא לעסק שמוכר שקט ומקצועיות (רפואה, משפט, פיננסים), ולא כשהתמונות לא באותה איכות, כי השובל מראה את כולן מהר.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של שובל תמונות שנשאר אחרי הסמן. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** g43 הוא תמונה אחת שעוקבת אחרי הסמן ברשימה. כאן הסמן משאיר עקבות של הרבה תמונות, בכל השטח. **המנגנון:** מאגר של עשר תמונות שנוצרות פעם אחת וממוחזרות בסבב. `pointermove` נקרא פעם אחת לפריים, ותמונה חדשה נולדת רק כשהסמן זז יותר מ-90px מהקודמת, כדי שהשובל יהיה קצב ולא מריחה. כל תמונה מונפשת ב-Web Animations API: קופצת מ-0.6 ל-1, מוטה עד 8 מעלות לכל צד, נשארת רגע ונעלמת תוך 1.3 שניות בעקומה החתומה. **הקריאות:** השובל מתחת לטקסט (z-index), והטקסט על הרקע עצמו. **במנוחה** רואים קולאז' סטטי של חמש תמונות בפינות, כך שהסקשן לא ריק לפני שמזיזים את העכבר; בתזוזה הוא מתעמעם, ושנייה אחרי שהעכבר יוצא הוא חוזר. **מגע:** הקשה על שטח פנוי משאירה תמונה אחת במקום ההקשה, וגלילה רגילה לא נפגעת. **הפחתת תנועה:** אין שובל; נשאר הקולאז'. **התמונות** `aria-hidden` עם alt ריק, כי הן אווירה והתוכן הוא הכותרת והטקסט.",
  libs:[],
  css:`.it{position:relative;isolation:isolate;overflow:clip;display:grid;place-items:center;min-height:clamp(560px,56vw,720px);padding:clamp(56px,8vw,128px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink);text-align:center}
.it-txt{position:relative;z-index:2;display:grid;justify-items:center;gap:18px;max-width:36rem}
.it-k{margin:0;font-size:15px;font-weight:700;color:var(--accent)}
.it-txt h2{margin:0;font-size:clamp(36px,5.2vw,76px);font-weight:900;line-height:1.04;letter-spacing:-.02em;text-wrap:balance}
.it-txt p{margin:0;max-width:40ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.it-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 28px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:600;text-decoration:none}
.it-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.it-col img,.it-trail img{position:absolute;display:block;width:clamp(120px,13vw,200px);height:auto;aspect-ratio:4/5;object-fit:cover;border-radius:14px;box-shadow:${SHADOW}}
.it-col img{rotate:var(--r);transition:opacity .6s ${E},scale .6s ${E}}
.it-col .c1{--r:-7deg;inset-block-start:8%;inset-inline-start:6%}
.it-col .c2{--r:6deg;inset-block-start:10%;inset-inline-end:7%}
.it-col .c3{--r:5deg;inset-block-end:9%;inset-inline-start:10%}
.it-col .c4{--r:-6deg;inset-block-end:8%;inset-inline-end:10%}
.it-col .c5{--r:3deg;inset-block-start:40%;inset-inline-end:1%;width:clamp(96px,10vw,150px)}
.it.is-moving .it-col img{opacity:0;scale:.9}
.it-trail{position:absolute;inset:0;z-index:1;pointer-events:none}
.it-trail img{left:0;top:0;opacity:0;will-change:transform,opacity}
@media(max-width:767px){.it{min-height:640px;padding-block:160px}.it-col img{width:clamp(88px,26vw,120px)}.it-col .c5{display:none}
  .it-col .c1{inset-block-start:4%}.it-col .c2{inset-block-start:5%}.it-col .c3{inset-block-end:4%}.it-col .c4{inset-block-end:5%}}`,
  html:`<div class="stage"><section class="it" data-it>
  <div class="it-col" aria-hidden="true">
    ${IMG("real/s06/dancers.webp", 1500, 1212, "", "c1")}
    ${IMG("real/s06/food.webp", 1300, 1000, "", "c2")}
    ${IMG("real/s06/hands.webp", 2560, 1400, "", "c3")}
    ${IMG("real/s06/hug.webp", 1500, 1100, "", "c4")}
    ${IMG("real/s06/singer.webp", 1800, 1012, "", "c5")}
  </div>
  <div class="it-trail" aria-hidden="true"></div>
  <div class="it-txt">
    <p class="it-k">פסטיבל הדרום, באמצע אוגוסט</p>
    <h2>שלושה ימים של מוזיקה, אוכל ואנשים</h2>
    <p>עשרים הופעות על שתי במות, שוק אוכל של שפים מהאזור ומתחם לילדים שפתוח עד השקיעה. הכרטיס לשלושת הימים כולל חניה והסעה.</p>
    <a class="it-cta" href="#">לכרטיסים</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-it]");
  if(!root||matchMedia("(prefers-reduced-motion: reduce)").matches)return;   // נשאר הקולאז' הסטטי
  const trail=root.querySelector(".it-trail");
  const SRC=[...root.querySelectorAll(".it-col img")].map(i=>i.getAttribute("src"));
  const pool=[];
  for(let k=0;k<10;k++){const m=new Image();m.alt="";m.decoding="async";m.src=SRC[k%SRC.length];trail.append(m);pool.push(m);}
  let n=0,lx=null,ly=0,px=0,py=0,raf=0,back=0;
  const spawn=(x,y)=>{
    const m=pool[n++%pool.length],r=(Math.random()*16-8).toFixed(1);
    const at=s=>"translate(-50%,-50%) scale("+s+") rotate("+r+"deg)";
    m.style.left=x+"px";m.style.top=y+"px";
    m.getAnimations().forEach(a=>a.cancel());
    m.animate([{opacity:0,transform:at(.6)},{opacity:1,transform:at(1),offset:.2},{opacity:1,transform:at(1),offset:.55},{opacity:0,transform:at(.82)}],
      {duration:1300,easing:"cubic-bezier(.2,.6,.2,1)",fill:"both"});
  };
  const local=e=>{const b=root.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top];};
  const frame=()=>{raf=0;if(lx===null||Math.hypot(px-lx,py-ly)>90){lx=px;ly=py;spawn(px,py);}};
  root.addEventListener("pointermove",e=>{
    if(e.pointerType&&e.pointerType!=="mouse")return;
    [px,py]=local(e);
    clearTimeout(back);root.classList.add("is-moving");     // הקולאז' מפנה מקום לשובל
    if(!raf)raf=requestAnimationFrame(frame);
  });
  root.addEventListener("pointerleave",()=>{lx=null;clearTimeout(back);back=setTimeout(()=>root.classList.remove("is-moving"),1000);});
  // מגע: כל הקשה על שטח פנוי משאירה תמונה אחת
  root.addEventListener("pointerdown",e=>{
    if(!e.pointerType||e.pointerType==="mouse"||e.target.closest("a,button"))return;
    const [x,y]=local(e);spawn(x,y);
  });
})();`
},
{
  id:"b110", cat:"behavior", name:"מניפת תמונות שמתחלפת עם הרשימה", tech:"CSS transform · JS", status:"מאושר-עין", runway:false,
  desc:"חמש תמונות מונחות כמו מניפה של תמונות מודפסות, אחת מלפנים והשאר מוטות מאחוריה. לידן רשימת ימי המסלול. לחיצה על יום, על «היום הבא» או על התמונה זורקת את התמונה הקדמית הצידה ומחזירה אותה לסוף הערימה, והתמונה של היום הנבחר עולה קדימה. ברשימה היום הנבחר מסומן ונפתח עם משפט עליו.",
  when:"מסלול, תוכנית או סיפור בכמה תחנות שיש לכל אחת תמונה: טיול, סדנה בכמה מפגשים, תפריט טעימות, שלבי בנייה, פרויקט לפני ואחרי. ארבע עד שש תחנות. לא כשהתמונות לא באותו יחס וסגנון, ולא כשחשוב לראות את כל התמונות במלואן בבת אחת, שם גריד.",
  note:"**שחזור.** השראה: animtd.store (26.10.2026), סרטון של ערימת תמונות במניפה שמתחלפת בלחיצה. נבנה מאפס מהצפייה. **במה זה שונה ממה שיש:** g67 מחליף כרטיסים בגלילה, ו-h22 הוא הירו עם ערימה. כאן ההחלפה בלחיצה, והערימה מסונכרנת עם רשימה שהיא הניווט האמיתי. **המניפה:** לכל תמונה `data-k` (0 מלפנים עד 4 מאחור), ולכל ערך יש תנוחה קבועה ב-CSS: הזזה, הטיה והקטנה הולכות וגדלות, ובהירות יורדת מעט. החלפה היא רק החלפת ערכי `data-k`, וה-transition (0.7 שנייה, in-out מאושר) עושה את התנועה. **הזריקה:** התמונה הקדמית מקבלת קודם `is-throw` (עפה הצידה מעל כולם, 0.38 שנייה), ורק אז עוברת לסוף הערימה, כדי שלא תיעלם מאחורי האחרות באמצע הדרך. לחיצות מהירות סוגרות את הזריקה הקודמת לפני החדשה. **הרשימה:** כפתורים עם `aria-pressed`, בתוך `ol` כי הימים הם סדר אמיתי; היום הנבחר נפתח ב-`grid-template-rows`, ושם היום מוכרז ב-`aria-live`. **הפחתת תנועה:** בלי זריקה ובלי מעבר, התמונה פשוט מתחלפת. **בטלפון** הערימה מעל הרשימה, קטנה יותר. **בלי JS** המניפה מוצגת כמו שהיא, והיום הראשון פתוח.",
  libs:[],
  css:`.cf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,5vw,72px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);background:var(--bg);color:var(--ink);overflow:clip}
.cf-txt{display:grid;gap:16px;align-content:center}
.cf-txt h2{margin:0;font-size:clamp(30px,3.6vw,52px);font-weight:800;line-height:1.08;letter-spacing:-.01em;text-wrap:balance}
.cf-txt>p{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.cf-list{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:4px}
.cf-it{display:grid;gap:2px;width:100%;padding:12px 18px;border:0;border-radius:16px;background:transparent;color:inherit;font:inherit;text-align:start;cursor:pointer;transition:background-color .3s ${E}}
.cf-day{font-size:13px;font-weight:600;color:var(--muted);transition:color .3s ${E}}
.cf-it b{font-size:18px;font-weight:700}
.cf-d{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s ${E}}
.cf-d>span{min-height:0;overflow:hidden;font-size:15px;line-height:1.5;color:var(--muted)}
.cf-it[aria-pressed="true"]{background:var(--card)}
.cf-it[aria-pressed="true"] .cf-day{color:var(--accent)}
.cf-it[aria-pressed="true"] .cf-d{grid-template-rows:1fr}
.cf-it:focus-visible,.cf-next:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media(hover:hover) and (pointer:fine){.cf-it:hover{background:color-mix(in srgb,var(--card) 70%,transparent)}}
.cf-stage{display:grid;justify-items:center;gap:32px}
.cf-deck{position:relative;width:min(100%,400px);aspect-ratio:4/5;cursor:pointer}
.cf-card{position:absolute;inset:0;margin:0;overflow:hidden;border-radius:24px;background:var(--card);box-shadow:${SHADOW};transform-origin:50% 90%;transition:transform .7s ${IO},filter .7s ${IO}}
.cf-card img{display:block;width:100%;height:100%;object-fit:cover}
.cf-card[data-k="0"]{z-index:5;transform:none}
.cf-card[data-k="1"]{z-index:4;transform:translate(-9%,2%) rotate(-7deg) scale(.95);filter:brightness(.92)}
.cf-card[data-k="2"]{z-index:3;transform:translate(9%,3%) rotate(7deg) scale(.9);filter:brightness(.86)}
.cf-card[data-k="3"]{z-index:2;transform:translate(-15%,5%) rotate(-12deg) scale(.85);filter:brightness(.8)}
.cf-card[data-k="4"]{z-index:1;transform:translate(15%,6%) rotate(12deg) scale(.8);filter:brightness(.75)}
.cf-card.is-throw{z-index:6;transform:translate(-72%,-6%) rotate(-18deg);transition-duration:.38s}
.cf-next{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:12px 24px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-weight:600;cursor:pointer}
${SVG_CSS(".cf-next svg")}
.cf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(prefers-reduced-motion:reduce){.cf-card{transition:none}.cf-d{transition:none}}
@media(max-width:860px){.cf{grid-template-columns:minmax(0,1fr)}.cf-stage{order:-1}.cf-deck{width:min(76%,320px)}}`,
  html:`<div class="stage"><section class="cf" data-cf>
  <div class="cf-txt">
    <h2>חמישה ימים, ואן אחד, כל החוף</h2>
    <p>ככה נראה המסלול הכי מוזמן שלנו. בחרו יום כדי לראות איפה עוצרים.</p>
    <ol class="cf-list">
${CF.map(([d, t, s], i) => `      <li><button class="cf-it" type="button" aria-pressed="${i === 0}"><span class="cf-day">${d}</span><b>${t}</b><span class="cf-d"><span>${s}</span></span></button></li>`).join("\n")}
    </ol>
  </div>
  <div class="cf-stage">
    <div class="cf-deck">
${CF.map(([, , , f, w, h, alt], i) => `      <figure class="cf-card" data-k="${i}">${IMG(f, w, h, alt)}</figure>`).join("\n")}
    </div>
    <button class="cf-next" type="button">היום הבא ${ARROW}</button>
    <p class="cf-sr" aria-live="polite"></p>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector("[data-cf]");
  if(!root)return;
  const cards=[...root.querySelectorAll(".cf-card")],its=[...root.querySelectorAll(".cf-it")],live=root.querySelector(".cf-sr");
  const still=matchMedia("(prefers-reduced-motion: reduce)");
  const n=cards.length;let cur=0,pend=null;
  // זריקה שעוד באוויר נסגרת לפני הבאה: התמונה נוחתת במקום שלה לפי הסדר הנוכחי
  const settle=()=>{if(!pend)return;clearTimeout(pend.t);pend.c.classList.remove("is-throw");pend.c.dataset.k=(cards.indexOf(pend.c)-cur+n)%n;pend=null;};
  const go=j=>{
    j=(j+n)%n;if(j===cur)return;
    settle();
    const out=cards[cur];cur=j;
    cards.forEach((c,i)=>{if(c!==out||still.matches)c.dataset.k=(i-j+n)%n;});
    if(!still.matches){out.classList.add("is-throw");pend={c:out,t:setTimeout(settle,380)};}
    its.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===j)));
    live.textContent=its[j].querySelector(".cf-day").textContent+": "+its[j].querySelector("b").textContent;
  };
  its.forEach((b,i)=>b.addEventListener("click",()=>go(i)));
  root.querySelector(".cf-next").addEventListener("click",()=>go(cur+1));
  root.querySelector(".cf-deck").addEventListener("click",()=>go(cur+1));
})();`
}
];
