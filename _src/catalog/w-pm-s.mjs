// שישה מהלכים של גלריות וכרטיסים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// כולם נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל אריח וכל כרטיס בדמו הוא צילום אמיתי מהמאגר (assets/media), והטקסטים הם עברית של עסק אמיתי: סטודיו, מאפייה, גלידריה, קבלן.

// מידות הצילומים (רוחב, גובה): כל img נושא אותן במפורש, כדי שהדף לא יקפוץ בזמן הטעינה
const DIM = {
  "real/s01/bench-hands": [1500, 1000], "real/s01/street-light": [1700, 1138],
  "real/s02/hero-panel": [2200, 1468], "real/s02/night-room": [2000, 1333],
  "real/s04/hero-monster": [1200, 1500], "real/s04/trio": [1200, 1500], "real/s04/tusk": [900, 1125],
  "real/s06/dancers": [1500, 1212], "real/s06/food": [1300, 1000], "real/s06/hug": [1500, 1100], "real/s06/singer": [1800, 1012],
  "real/s07/ink-hands": [1000, 1000],
  "real/s08/hero": [2560, 1707],
  "real/s09/step-1-booking": [1500, 1200], "real/s09/step-2-welcome": [1500, 1200],
  "real/s10/install": [1200, 1067], "real/s10/wallbox": [1000, 1500],
  "real/s11/bowls": [1100, 1650], "real/s11/cones-yellow": [1400, 1050], "real/s11/hero-scoops": [1400, 1750], "real/s11/magenta-cone": [1000, 1000],
  "real/s12/dusk-camp": [1000, 1000], "real/s12/hero-window": [1100, 1100], "real/s12/thermos": [900, 1200], "real/s12/van-door": [1000, 1200],
  "real/s13/hero": [2560, 1435], "real/s13/proj-a": [1800, 1200], "real/s13/proj-b": [1200, 1600], "real/s13/proj-c": [2400, 1026], "real/s13/room": [2200, 1469],
  "real/s14/baker-hands": [1100, 1320], "real/s14/cafe-window": [1400, 1050], "real/s14/croissants": [1250, 1000], "real/s14/hero-bread": [1600, 1333],
  "real/s15/flute": [1000, 1250], "real/s15/hero-glass": [1100, 1375], "real/s15/marble": [1600, 1000], "real/s15/pour": [1000, 1250], "real/s15/room": [1100, 1320],
  "dive/portrait": [2400, 1600],
};
const img = (n, alt, extra) => {
  const d = DIM[n];
  if (!d) throw new Error("w-pm-s: unknown photo " + n);
  return `<img src="../assets/media/${n}.webp" width="${d[0]}" height="${d[1]}" alt="${alt || ""}" loading="lazy" decoding="async"${extra || ""}>`;
};

// ---------- g264: קיר שמתעמעם ושלושה כרטיסים צפים קדימה ----------
// 32 אריחים בקיר. שלושה מהם (מסומנים ב-data-pick) הם הצילום של אחד הכרטיסים: הכרטיס יוצא מהאריח שלו
const FW_WALL = [
  "real/s11/cones-yellow", "real/s06/dancers", "real/s13/proj-c", "real/s04/trio", "real/s09/step-2-welcome", "real/s15/pour", "real/s12/van-door", "real/s01/bench-hands",
  "real/s11/magenta-cone", "real/s14/cafe-window", "real/s14/hero-bread", "real/s06/singer", "real/s02/night-room", "real/s04/tusk", "real/s13/proj-a", "real/s10/install",
  "real/s11/bowls", "real/s08/hero", "real/s12/thermos", "real/s01/street-light", "real/s15/hero-glass", "real/s07/ink-hands", "real/s14/croissants", "real/s09/step-1-booking",
  "real/s04/hero-monster", "real/s06/hug", "real/s13/room", "real/s02/hero-panel", "real/s10/wallbox", "real/s15/flute", "real/s12/dusk-camp", "real/s14/baker-hands",
];
const FW_PICKS = [10, 14, 20];
const FW = {
  wall: FW_WALL.map((n, i) => { const p = FW_PICKS.indexOf(i); return `<span class="fw-t"${p >= 0 ? ` data-pick="${p}"` : ""}>${img(n, "")}</span>`; }).join("\n      "),
};

// ---------- g265: אותו צילום בפסים ובתשע פלטות ----------
const PP_STRIPES = ["pp-c1", "pp-c4", "pp-o", "pp-c2", "pp-c6"];
const PP_TILES = ["pp-c1", "pp-c2", "pp-c3", "pp-c4", "pp-o", "pp-c5", "pp-c6", "pp-c7", "pp-c8"];
const PP = {
  stripes: PP_STRIPES.map(c => `<figure class="pp-p ${c}">${img("dive/portrait", "")}</figure>`).join("\n        "),
  tiles: PP_TILES.map(c => `<figure class="pp-p ${c}">${img("dive/portrait", "")}</figure>`).join("\n        "),
};

// ---------- g266: אריחים שנופלים ללוח שנה ----------
// נובמבר 2026 מתחיל ביום ראשון. תשעה ימי צילום, כל אחד אצל עסק אחר
const FC_SHOOTS = [
  [3, "real/s14/croissants", "שני קרואסונים על מפית יוטה לצד כוס קפה", "מאפיית הקרן", "קרואסונים וקפה של הבוקר"],
  [5, "real/s14/cafe-window", "בית קפה עם חלונות גדולים ואור בוקר", "קפה נחמה", "צילום החלל והשולחנות"],
  [9, "real/s06/food", "לקוח בכובע לוקח צ'יפס מדוכן אוכל, ליד ויטרינה", "דוכן בשוק", "צילום אנשים בעבודה"],
  [11, "real/s15/flute", "כוס שמפניה עם משקה בצבע ענבר ונצנצי זהב", "בר ביאליק", "משקאות לתפריט החדש"],
  [16, "real/s14/baker-hands", "אופה בכובע צמר שמגבש בצק בידיים", "מאפיית שאור", "סרטון תדמית עם האופה"],
  [18, "real/s13/proj-a", "סלון כהה עם ספה רחבה ותאורה חמה", "דירה ברמת גן", "צילום פנים לסטודיו עיצוב"],
  [23, "real/s15/hero-glass", "כוס קוקטייל על שולחן שיש מול ספה אדומה", "מלון בוטיק", "צילום בר הלובי"],
  [25, "real/s10/install", "חשמלאי בכובע צמר ובמשקפי מגן מחבר כבלים", "קבלן חשמל", "צילום עבודה באתר"],
  [30, "real/s11/hero-scoops", "שלושה כדורי גלידה עם סוכריות על רקע ורוד", "גלידריה", "קמפיין הקיץ"],
];
const FC = {
  cells: (() => {
    const by = new Map(FC_SHOOTS.map(s => [s[0], s]));
    let out = "";
    for (let d = 1; d <= 30; d++) {
      const s = by.get(d);
      out += s
        ? `<span class="fc-c"><span class="fc-tile">${img(s[1], "")}<b>${d}</b></span></span>`
        : `<span class="fc-c"><i>${d}</i></span>`;
    }
    for (let k = 0; k < 5; k++) out += `<span class="fc-c fc-x"></span>`;
    return out;
  })(),
  list: FC_SHOOTS.map(s => `<li><time>${s[0]} בנובמבר</time><span>${s[3]}, ${s[4]}</span></li>`).join("\n      "),
};

// ---------- b101: בדיקת תמונות, פוסלים ושומרים ----------
// הנתונים של שלוש התמונות: קו הקלקות (שבע נקודות) והערך האחרון
const VK_SERIES = [
  { name: "קונוסים על רקע צהוב", v: 1.4, s: [0.9, 1.1, 1.0, 1.3, 1.2, 1.4, 1.4] },
  { name: "גביע ריק על רקע מג'נטה", v: 1.9, s: [1.0, 1.2, 1.5, 1.4, 1.7, 1.8, 1.9] },
  { name: "שלושה כדורי גלידה", v: 4.1, s: [1.1, 1.6, 2.0, 2.6, 3.1, 3.6, 4.1] },
];
const VK_DATA = VK_SERIES.map(o => {
  // ציר הזמן מימין לשמאל, כמו הקריאה בעברית: הנקודה הראשונה בצד ימין והאחרונה בצד שמאל
  const P = o.s.map((v, i) => [316 - i * 52, Math.round((88 - (v / 4.5) * 76) * 10) / 10]);
  return { name: o.name, v: o.v, d: "M" + P.map(p => p.join(" ")).join(" L"), x: P[6][0], y: P[6][1] };
});
const VK_PICS = ["real/s11/cones-yellow", "real/s11/magenta-cone", "real/s11/hero-scoops"];
const VK = {
  opts: VK_SERIES.map((o, i) => {
    const win = i === 2;
    return `<label class="vk-o ${win ? "is-win" : "is-out"}">
        <input class="sr-only" type="radio" name="vk" value="${i}"${win ? " checked" : ""}>
        <span class="vk-ph">${img(VK_PICS[i], "", ' style="object-position:50% 50%"')}<span class="vk-x" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></span><span class="vk-ring" aria-hidden="true"></span><span class="vk-w" aria-hidden="true">נשארת</span></span>
        <span class="vk-nm">${o.name}</span><span class="vk-r">${o.v.toFixed(1)}% קלקות</span>
      </label>`;
  }).join("\n      "),
};

// ---------- g267: כיווני עיצוב שמצטמצמים לרשת בחירה ----------
const FZ_ITEMS = [
  ["real/s13/hero", "אור יום חם"], ["real/s13/proj-a", "סלון כהה"], ["real/s13/proj-b", "אמבט עם פרטי זהב"],
  ["real/s13/proj-c", "מטבח אפור"], ["real/s13/room", "פינת קריאה"], ["real/s15/marble", "שיש כהה"],
  ["real/s15/room", "בר ביתי"], ["real/s02/night-room", "חדר שינה לבן"], ["real/s14/cafe-window", "פינת קפה"],
];
const FZ = {
  cells: FZ_ITEMS.map((it, i) => `<li class="fz-c" style="--i:${i + 1}"><label><input class="sr-only" type="radio" name="fz" value="${i + 1}"><span class="fz-f">${img(it[0], "")}<span class="fz-n" aria-hidden="true">${i + 1}</span><span class="fz-nm"><span class="sr-only">כיוון ${i + 1}: </span>${it[1]}</span></span></label></li>`).join("\n      "),
};

// ---------- g268: פסיפס של 160 אריחים עם מונים ----------
const FM_SRC = [
  "real/s04/tusk", "real/s04/trio", "real/s11/magenta-cone", "real/s11/cones-yellow", "real/s11/bowls", "real/s15/flute", "real/s15/pour", "real/s15/hero-glass",
  "real/s14/baker-hands", "real/s14/croissants", "real/s12/thermos", "real/s12/van-door", "real/s12/dusk-camp", "real/s12/hero-window", "real/s06/food", "real/s07/ink-hands",
];
const FM = {
  tiles: (() => {
    let seed = 11;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
    const pick = [];
    for (let i = 0; i < 160; i++) {
      // לא אותו צילום ליד עצמו, גם כשהרשת רחבה (20) וגם כשהיא צרה (10)
      const bad = new Set([pick[i - 1], pick[i - 10], pick[i - 20]]);
      let k; do { k = Math.floor(rnd() * FM_SRC.length); } while (bad.has(k));
      pick.push(k);
    }
    return pick.map(k => `<span class="fm-t">${img(FM_SRC[k], "")}</span>`).join("");
  })(),
};

export default [
{
  id:"g264", cat:"gsap", name:"קיר צילומים שמתעמעם ושלושה כרטיסים צפים קדימה", tech:"GSAP · ScrollTrigger scrub · sticky · CSS filter", status:"ממתין",
  desc:"קיר של שלושים ושניים צילומים ממלא את הבמה. בגלילה הקיר מתעמעם ומיטשטש, ושלושה צילומים יוצאים מהמקום שלהם בקיר אל מרכז המסך: הם גדלים, מסתובבים קצת וחופפים זה את זה. הם נשארים חדים ועם כיתוב, והקיר נשאר מאחוריהם כרקע. הקורא מבין מה נבחר בלי שמישהו אמר לו להסתכל.",
  when:"ארכיון גדול ובתוכו מעט פריטים שהם העניין: שלוש העבודות המובילות בתיק עבודות של סטודיו, שלושה פרויקטים בדף של קבלן, שלוש חבילות בחנות. הקיר מראה כמה יש, והכרטיסים מראים מה בחרנו. פעם אחת בעמוד, ליד כותרת שאומרת למה בחרנו דווקא אותם. לא מתאים כשכל הפריטים שווים בחשיבותם.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם קיר צפוף של כרטיסים נעשה עמום ומטושטש וכמה מהם קופצים קדימה. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** קיר עמום (`--wo` ו-`--wb` על השורש הם העמימות והטשטוש הסופיים), שלושה כרטיסים בצביר במרכז וכותרת. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** הסקריפט מוסיף `is-live` (במה נעוצה בגובה 260vh) ובונה timeline אחד עם `scrub`. הקיר עובר מחד ובהיר לעמום ומטושטש (`opacity` ו-`filter`), וכל כרטיס יוצא מהאריח שלו בקיר: אותו צילום ואותו גודל, ומשם הוא עובר למקומו עם גדילה וסיבוב. כך הכרטיס הוא האריח שקפץ קדימה ולא כרטיס חדש שהופיע. **המיקום הסופי נקרא מה-CSS** (`--fx`, `--fy`, `--fr` על `.c0` עד `.c2`, ושונה בטלפון), ונקודת ההתחלה נמדדת מהפריסה (`offsetLeft`) ולא מהמסך, ולכן היא לא תלויה בגלילה ולא בטרנספורם שכבר רץ. **האריח המקורי** נעלם ברגע שהכרטיס יוצא ממנו, כדי שלא יישאר עותק ליד הכרטיס. הכיתובים והכותרת נכנסים אחרי שהכרטיסים הגיעו. **כיוון:** הכרטיס הימני מתחיל מהצד הימני של הקיר. באתר LTR הופכים את הסימן של `--fx`. **בטלפון** הקיר הופך ל-4 על 8 והצביר מצטמצם לרוחב המסך. **נגישות:** הקיר הוא קישוט (`aria-hidden`), והכרטיסים והכותרת נושאים את התוכן בטקסט. **בפרויקט:** מחליפים בצילומי הלקוח, ומוודאים שכל כרטיס מופיע גם כאריח בקיר (`data-pick`), אחרת אין ממה לצאת. 32 תמונות הן עלות טעינה אמיתית, ולכן `loading=lazy` והקיר ברזולוציה קטנה.",
  libs:["gsap","ScrollTrigger"],
  css:`.fw{--wo:.32;--wb:4px;--cw:min(250px,26vw);max-width:1180px;margin-inline:auto}
.fw .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fw-pin{position:relative;height:clamp(540px,82svh,760px);overflow:hidden;border-radius:clamp(16px,2vw,28px);background:var(--bg)}
.fw-wall{position:absolute;inset:-12px;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));grid-template-rows:repeat(4,minmax(0,1fr));gap:6px;opacity:var(--wo);filter:blur(var(--wb)) saturate(.7)}
.fw-t{position:relative;display:block;overflow:hidden;border-radius:10px;background:var(--line)}
.fw-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fw-h{position:absolute;inset-inline:0;inset-block-start:clamp(24px,6svh,56px);z-index:4;width:min(780px,88%);margin:0 auto;font-size:clamp(26px,3.2vw,46px);font-weight:700;line-height:1.15;text-align:center;text-wrap:balance;text-shadow:0 0 .5em var(--bg),0 0 1em var(--bg),0 0 1.6em var(--bg)}
.fw-cards{list-style:none;margin:0;padding:0}
.fw-card{position:absolute;z-index:var(--z,1);left:calc(50% - var(--cw) / 2);top:calc(50% - var(--cw) * .625 + 32px);width:var(--cw);aspect-ratio:4 / 5;border-radius:18px;box-shadow:0 28px 48px -28px color-mix(in oklab,var(--ink) 65%,transparent);transform:translate(var(--fx),var(--fy)) rotate(var(--fr))}
.fw-card.c0{--fx:104%;--fy:-2%;--fr:6deg;--z:2}
.fw-card.c1{--fx:-104%;--fy:3%;--fr:-6deg;--z:1}
.fw-card.c2{--fx:0%;--fy:-6%;--fr:1.5deg;--z:3}
.fw-card figure{position:absolute;inset:0;margin:0;overflow:hidden;border-radius:inherit;background:var(--line)}
.fw-card img{display:block;width:100%;height:100%;object-fit:cover}
.fw-card figcaption{position:absolute;inset-inline:0;bottom:0;display:grid;gap:2px;padding:40px 14px 14px;background:linear-gradient(transparent,color-mix(in oklab,var(--ink) 78%,transparent));color:var(--bg)}
.fw-card figcaption b{font-size:16px;line-height:1.25}
.fw-card figcaption span{font-size:13px;line-height:1.3;opacity:.88}
.fw.is-live{height:260vh}
.fw.is-live .fw-pin{position:sticky;top:0;height:100vh;height:100svh;border-radius:0}
.fw.is-live .fw-wall,.fw.is-live .fw-card{will-change:transform}
@media(max-width:767px){
  .fw{--cw:min(220px,28vw)}
  .fw-wall{grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(8,minmax(0,1fr))}
  .fw-card.c0{--fx:102%;--fy:-4%;--fr:5deg}
  .fw-card.c1{--fx:-102%;--fy:4%;--fr:-5deg}
  .fw-card.c2{--fy:-1%}
  .fw-card figcaption{padding:28px 8px 8px}
  .fw-card figcaption b{font-size:12px}
  .fw-card figcaption span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
}`,
  html:`<div class="stage"><section class="fw" aria-labelledby="fw-h">
  <div class="fw-pin">
    <div class="fw-wall" aria-hidden="true">
      ${FW.wall}
    </div>
    <h2 class="fw-h" id="fw-h">שלוש עבודות מהשנה האחרונה שאנחנו הכי גאים בהן</h2>
    <ul class="fw-cards">
      <li class="fw-card c0"><figure>${img("real/s14/hero-bread", "כיכר לחם שאור פרוסה על שולחן עץ ישן, ולצידה פרוסה וסכין")}<figcaption><b>מאפיית שאור, נווה צדק</b><span>צילום מוצר ושער תפריט</span></figcaption></figure></li>
      <li class="fw-card c1"><figure>${img("real/s13/proj-a", "סלון כהה עם ספה רחבה, פמוטים ותאורה חמה")}<figcaption><b>סלון בדירה ברמת גן</b><span>צילום פנים לסטודיו עיצוב</span></figcaption></figure></li>
      <li class="fw-card c2"><figure>${img("real/s15/hero-glass", "כוס קוקטייל על שולחן שיש, מול ספה אדומה")}<figcaption><b>בר הלובי, מלון בוטיק</b><span>צילום משקאות לתפריט</span></figcaption></figure></li>
    </ul>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הקיר העמום והכרטיסים כבר במקום (במארקאפ)
  const root=document.querySelector(".fw"),pin=root.querySelector(".fw-pin"),wall=root.querySelector(".fw-wall"),head=root.querySelector(".fw-h");
  const cards=[...root.querySelectorAll(".fw-card")],caps=cards.map(c=>c.querySelector("figcaption"));
  const slots=cards.map((_,i)=>root.querySelector('.fw-t[data-pick="'+i+'"]'));
  const v=(c,n)=>parseFloat(getComputedStyle(c).getPropertyValue(n))||0;      // המיקום הסופי של הכרטיס כתוב ב-CSS
  // בהפחתת תנועה הפונקציה לא רצה, והקיר העמום והכרטיסים נשארים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const cs=getComputedStyle(root),wo=parseFloat(cs.getPropertyValue("--wo")),wb=parseFloat(cs.getPropertyValue("--wb"));
    root.classList.add("is-live");
    // מרכז האריח והכרטיס בתוך הבמה, לפי הפריסה: לא תלוי בגלילה ולא בטרנספורם שכבר רץ
    const slotAt=s=>[wall.offsetLeft+s.offsetLeft+s.offsetWidth/2,wall.offsetTop+s.offsetTop+s.offsetHeight/2];
    const cardAt=c=>[c.offsetLeft+c.offsetWidth/2,c.offsetTop+c.offsetHeight/2];
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.fromTo(wall,{opacity:1,filter:"blur(0px) saturate(1)"},{opacity:wo,filter:"blur("+wb+"px) saturate(.7)",duration:1.6,ease:"power2.inOut"},0);
    cards.forEach((c,i)=>{
      const s=slots[i],at=.1+i*.32;
      tl.fromTo(c,
        {x:()=>slotAt(s)[0]-cardAt(c)[0],y:()=>slotAt(s)[1]-cardAt(c)[1],scale:()=>s.offsetWidth/c.offsetWidth,rotation:0},
        {x:()=>v(c,"--fx")/100*c.offsetWidth,y:()=>v(c,"--fy")/100*c.offsetHeight,scale:1,rotation:()=>v(c,"--fr"),duration:1.4,ease:"power3.out"},at);
      tl.set(s,{opacity:0},at);                                  // האריח המקורי נעלם כשהכרטיס יוצא ממנו
      tl.fromTo(caps[i],{autoAlpha:0},{autoAlpha:1,duration:.5,ease:"power1.out"},at+.9);
    });
    tl.fromTo(head,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.7,ease:"power2.out"},1.7);
    tl.to({},{duration:.8});                                     // עצירה קצרה בסוף, עם הצביר גמור
    return()=>{root.classList.remove("is-live");gsap.set([wall,head,...cards,...caps,...slots],{clearProps:"all"});};
  });
})();`
},
{
  id:"g265", cat:"gsap", name:"אותו צילום בפסים ובתשע פלטות צבע", tech:"GSAP · ScrollTrigger scrub · sticky · mix-blend-mode", status:"ממתין",
  desc:"אותו פורטרט חוזר בחמישה פסים אנכיים, וכל פס צבוע בשני גוונים אחרים מהפלטה של האתר, כשהפס האמצעי נשאר בצבע המלא. אחרי עצירה קצרה הפסים נמסים, ובמקומם נפתחת רשת של תשע גרסאות של אותו צילום, כל אחת בפלטה אחרת ועם רשת נקודות דקה. המספר ליד המסגרת עובר מחמש לתשע.",
  when:"מקום שבו צריך להשוות בין מראות של אותו דבר: פלטות צבע של מותג, גרסאות צבע של מוצר, אותו פורטרט בכמה סגנונות הדפסה. מתאים לדף של סטודיו לעיצוב או להדפסה, לחנות עם וריאציות צבע ולתיק עבודות. פעם אחת בעמוד, כשהבחירה בצבע היא הנושא. לא כשיש צילום אחד שאין לו שום אפשרות אחרת.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם אותו צילום חוזר בפסים צבועים בפלטות שונות ואחר כך נפרש לרשת של גרסאות. נבנה מאפס מהצפייה. **הדו-גוון הוא CSS בלבד על הצילום האמיתי:** כל פאנל הוא `figure` עם רקע בגוון הבהיר (`--c2`), הצילום בשחור לבן עם `mix-blend-mode:multiply` מעליו, ושכבה בגוון הכהה (`--c1`) עם `lighten` מעל. הגוונים נבנים מהטוקנים של האתר (`--ink`, `--accent`, `--muted`, `--bg`, `--card`) עם `color-mix`, ולכן הפלטות מתחלפות עם העור של הפרויקט ואין צבע שנקבע ביד. הפאנל `.pp-o` בלי פילטר, בצבע המקורי. **המארקאפ הוא המצב הסופי:** רשת 3 על 3 עם הנקודות והמספר 9, ושכבת הפסים לא מוצגת בכלל. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** נוספת `is-live` (במה נעוצה בגובה 300vh): הפסים נחשפים מלמעלה למטה, מימין לשמאל, נעצרים, ואז נמסים והאריחים צצים מהמרכז החוצה (`stagger` עם `from:'center'`), והמספר מחליף את החמש בתשע. **צילום:** פורטרט של אדם על רקע חלק עובד הכי טוב, כי הדו-גוון צובע גם את הרקע. **בטלפון** המסגרת ריבועית והפסים מראים פרוסה צרה מאותו צילום. **נגישות:** המסגרת היא `role=img` עם תיאור, הפאנלים בתוכה מוסתרים, והמספר הסופי בטקסט מוסתר.",
  libs:["gsap","ScrollTrigger"],
  css:`.pp{max-width:1180px;margin-inline:auto}
.pp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.pp-pin{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);align-items:center;gap:clamp(24px,5vw,72px)}
.pp-txt{display:grid;gap:14px;max-width:34ch}
.pp-txt h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.pp-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pp-cap{display:flex;align-items:baseline;gap:12px;margin:8px 0 0}
.pp-num{display:grid}
.pp-num i{grid-area:1 / 1;font-style:normal;font-size:clamp(56px,7vw,96px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.pp-num i:first-child{display:none}
.pp.is-live .pp-num i:first-child{display:block}
.pp-cap span{color:var(--muted);font-size:clamp(17px,1.4vw,20px)}
.pp-cap .pp-num{color:var(--ink)}
.pp-frame{position:relative;aspect-ratio:5 / 3;overflow:hidden;border-radius:clamp(16px,2vw,28px);background:var(--card)}
.pp-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:4px}
.pp-stripes{position:absolute;inset:0;display:none;grid-template-columns:repeat(5,minmax(0,1fr))}
.pp.is-live .pp-stripes{display:grid}
/* דו-גוון: רקע בבהיר, צילום שחור לבן ב-multiply, ושכבה בכהה ב-lighten. הגוונים מהטוקנים */
.pp-p{position:relative;margin:0;overflow:hidden;isolation:isolate;background:var(--c2)}
.pp-p img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;filter:grayscale(1) contrast(1.05);mix-blend-mode:multiply}
.pp-p::after{content:"";position:absolute;inset:0;background:var(--c1);mix-blend-mode:lighten;pointer-events:none}
.pp-grid .pp-p::before{content:"";position:absolute;inset:0;z-index:1;background-image:radial-gradient(circle,var(--c1) 0 1px,transparent 1.6px);background-size:6px 6px;opacity:.22;mix-blend-mode:multiply;pointer-events:none}
.pp-c1{--c1:var(--ink);--c2:var(--bg)}
.pp-c2{--c1:var(--accent);--c2:var(--card)}
.pp-c3{--c1:var(--ink);--c2:color-mix(in oklab,var(--accent) 36%,var(--card))}
.pp-c4{--c1:color-mix(in oklab,var(--accent) 72%,var(--ink));--c2:color-mix(in oklab,var(--accent) 20%,var(--bg))}
.pp-c5{--c1:var(--ink);--c2:color-mix(in oklab,var(--muted) 34%,var(--card))}
.pp-c6{--c1:var(--accent);--c2:color-mix(in oklab,var(--accent) 12%,var(--card))}
.pp-c7{--c1:color-mix(in oklab,var(--ink) 78%,var(--accent));--c2:var(--card)}
.pp-c8{--c1:color-mix(in oklab,var(--accent) 48%,var(--ink));--c2:var(--bg)}
.pp-o{--c1:var(--ink);--c2:var(--card)}
.pp-o img{filter:none;mix-blend-mode:normal}
.pp-o::after{display:none}
.pp.is-live{height:300vh}
.pp.is-live .pp-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .pp-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:24px}
  .pp-txt{max-width:none}
  .pp-frame{aspect-ratio:1 / 1}
  .pp-grid{gap:3px}
  .pp-num i{font-size:56px}
}`,
  html:`<div class="stage"><section class="pp">
  <div class="pp-pin">
    <div class="pp-txt">
      <h2>אותו צילום בכל הפלטות של המותג</h2>
      <p>מעבירים את אותו פורטרט דרך כל פלטות הצבע, כך שאפשר לראות מה עובד לכרטיס ביקור, לאתר ולשלט לפני שמדפיסים.</p>
      <p class="pp-cap"><span class="pp-num" aria-hidden="true"><i>5</i><i>9</i></span><span aria-hidden="true">גרסאות צבע</span><span class="sr-only">תשע גרסאות צבע של אותו פורטרט.</span></p>
    </div>
    <div class="pp-frame" role="img" aria-label="אותו פורטרט של אישה במשקפי שמש בתשע גרסאות צבע, מדו-גוון עד הצבע המקורי באמצע">
      <div class="pp-grid">
        ${PP.tiles}
      </div>
      <div class="pp-stripes" aria-hidden="true">
        ${PP.stripes}
      </div>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הרשת של תשע הגרסאות כבר במארקאפ
  const root=document.querySelector(".pp"),stripes=[...root.querySelectorAll(".pp-stripes .pp-p")],tiles=[...root.querySelectorAll(".pp-grid .pp-p")];
  const n5=root.querySelector(".pp-num i:first-child"),n9=root.querySelector(".pp-num i:last-child");
  // בהפחתת תנועה הפונקציה לא רצה, והרשת נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top 70%",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // 1. חמשת הפסים נחשפים מלמעלה, אחד אחרי השני מימין לשמאל
    gsap.set(stripes,{clipPath:"inset(0 0 100% 0)"});gsap.set(tiles,{scale:.4,autoAlpha:0});      // מצב פתיחה מפורש (ה-stagger לא תמיד מציג אותו מיד)
    tl.fromTo(stripes,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:.7,ease:"power3.out",stagger:.14},0);
    tl.to({},{duration:1});                                      // עצירה עם חמשת הפסים
    // 2. הפסים נמסים והתשעה צצים מהמרכז החוצה
    const t=tl.duration();
    tl.fromTo(tiles,{scale:.4,autoAlpha:0},{scale:1,autoAlpha:1,duration:.7,ease:"power3.out",stagger:{each:.1,from:"center",grid:[3,3]}},t);
    tl.to(stripes,{autoAlpha:0,duration:.5,ease:"power1.in"},t);
    tl.fromTo(n5,{autoAlpha:1,y:0},{autoAlpha:0,y:-14,duration:.35,ease:"power1.in"},t+.1);
    tl.fromTo(n9,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.45,ease:"power2.out"},t+.3);
    tl.to({},{duration:.8});
    return()=>{root.classList.remove("is-live");gsap.set([...stripes,...tiles,n5,n9],{clearProps:"all"});};
  });
})();`
},
{
  id:"g266", cat:"gsap", name:"אריחי צילום שנופלים לתאי לוח שנה", tech:"GSAP · ScrollTrigger once · timeline", status:"ממתין",
  desc:"לוח של חודש נובמבר מונח על הבמה, ותשעה אריחי צילום נופלים אליו מלמעלה, אחד אחרי השני לפי סדר התאריכים. כל אריח נוחת בתא של היום שלו, נמעך לרגע ומתיישר, והמספר ליד הלוח סופר את הימים שנסגרו. מימין רשימה של אותם תשעה ימים, עם שם העסק ומה מצלמים בו.",
  when:"כל עמוד שיש בו תאריכים אמיתיים: לוח צילומים של סטודיו, מועדי מפגשים, הרצאות, השקות, ימי ביקור של קבלן בשכונות. הנפילה אומרת שהיומן מתמלא, והרשימה אומרת במה. פעם אחת בעמוד, כשהתאריכים הם הסיפור. לא כשיש יותר מתשעה או עשרה אירועים בחודש, וגם לא כשאין תאריכים אמיתיים.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה (21.10.2026), בכל אחד אריחים קטנים נופלים אחד אחרי השני לתאים של רשת, בלוח שנה ובמשחק מילים. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** לוח עם תשעת האריחים בתאים והמספר 9, וליד הלוח רשימה (`ol`) של אותם ימים. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** כל אריח מוסט למעלה אל מחוץ לגריד (`overflow:clip` על הגריד, כך שהאריח נכנס מהקצה העליון), ו-ScrollTrigger עם `once` מפעיל timeline אחד כשהלוח מגיע ל-70% מהמסך. **הנפילה:** `power2.in` עד הנחיתה, מעיכה קצרה (`scaleY` כלפי מטה מהבסיס), ויישור ב-`power2.out`. בלי `back` ו-`bounce`, שנחסמים, והמעיכה היא שתי תנועות רגילות. משך הנפילה גדל עם השורה, כדי שהמהירות תהיה דומה. **הסדר** הוא סדר התאריכים, כמה שרוצים: אפשר גם לפי השורה. **המונה** עולה בכל נחיתה ולא ברצף נפרד, ולכן תמיד מסכים עם מה שנוחת. **הלוח** נבנה מ-35 תאים (נובמבר 2026 מתחיל ביום ראשון, ולכן אין תאים ריקים בהתחלה), והוא מוסתר מקורא מסך כי הרשימה מכילה את אותו מידע. מסומן `data-order` כי הסדר הוא מידע. **כיוון:** יום ראשון בצד ימין, כמו לוח עברי. באתר LTR הלוח כבר מתהפך מעצמו. **בטלפון** התאים קטנים (כ-40px), לכן מספר היום נעלם מהאריחים והרשימה מתחת מוסרת את המידע. **בפרויקט:** התאריכים והצילומים מהיומן האמיתי של הלקוח, ואפשר להחליף את הרשימה בקישורים.",
  libs:["gsap","ScrollTrigger"],
  css:`.fc{max-width:1180px;margin-inline:auto;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:center;gap:clamp(24px,5vw,72px)}
.fc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fc-txt{display:grid;gap:14px;align-content:start}
.fc-txt h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.fc-lead{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fc-count{display:flex;align-items:baseline;gap:12px;margin:8px 0 0}
.fc-count b{font-size:clamp(56px,6.4vw,88px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.fc-count span{color:var(--muted);font-size:clamp(17px,1.4vw,20px)}
.fc-list{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:8px}
.fc-list li{display:grid;grid-template-columns:7.5em minmax(0,1fr);gap:12px;font-size:16px;line-height:1.4}
.fc-list time{font-weight:600;font-variant-numeric:tabular-nums}
.fc-list li span{color:var(--muted)}
.fc-cal{display:grid;gap:12px;padding:clamp(16px,2vw,28px);border-radius:clamp(20px,2.4vw,32px);background:var(--card)}
.fc-top{margin:0;font-size:clamp(20px,1.8vw,26px);font-weight:700}
.fc-wk,.fc-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
.fc-wk{text-align:center;color:var(--muted);font-size:14px}
.fc-grid{position:relative;overflow:clip}
.fc-c{position:relative;aspect-ratio:1;border-radius:12px;background:color-mix(in oklab,var(--ink) 5%,var(--card))}
.fc-x{background:none}
.fc-c i{position:absolute;inset-block-start:6px;inset-inline-start:8px;font-style:normal;font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.fc-tile{position:absolute;inset:0;overflow:hidden;border-radius:inherit}
.fc-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fc-tile b{position:absolute;inset-block-start:4px;inset-inline-start:4px;display:grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:99px;background:var(--bg);color:var(--ink);font-size:12px;font-weight:700;font-variant-numeric:tabular-nums}
@media(max-width:767px){
  .fc{grid-template-columns:minmax(0,1fr)}
  .fc-cal{padding:16px}
  .fc-wk,.fc-grid{gap:4px}
  .fc-c{border-radius:8px}
  .fc-c i{inset-block-start:4px;inset-inline-start:4px;font-size:11px}
  .fc-tile b{display:none}
}`,
  html:`<div class="stage"><section class="fc">
  <div class="fc-txt">
    <h2>יומן הצילומים של נובמבר</h2>
    <p class="fc-lead">כל תאריך ביומן שייך לעסק אחר: מאפייה, בר, דירה לצילום פנים, גלידריה. מי שרוצה לסגור יום נוסף רואה מיד אילו תאריכים עוד פנויים.</p>
    <p class="fc-count"><b aria-hidden="true">9</b><span aria-hidden="true">ימי צילום סגורים</span><span class="sr-only">9 ימי צילום סגורים בנובמבר.</span></p>
    <ol class="fc-list">
      ${FC.list}
    </ol>
  </div>
  <div class="fc-cal" aria-hidden="true">
    <p class="fc-top">נובמבר 2026</p>
    <div class="fc-wk"><span>א׳</span><span>ב׳</span><span>ג׳</span><span>ד׳</span><span>ה׳</span><span>ו׳</span><span>ש׳</span></div>
    <div class="fc-grid" data-order>
      ${FC.cells}
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP כל האריחים כבר בתאים והמונה על 9
  const root=document.querySelector(".fc"),grid=root.querySelector(".fc-grid"),tiles=[...grid.querySelectorAll(".fc-tile")];
  const num=root.querySelector(".fc-count b"),N=tiles.length;
  // בהפחתת תנועה הפונקציה לא רצה, והאריחים נשארים בתאים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    num.textContent="0";
    const tl=gsap.timeline({paused:true});
    tiles.forEach((t,i)=>{
      const cell=t.parentElement,at=i*.36;
      // הנפילה מתחילה מעל הקצה העליון של הגריד (הגריד חותך), והמשך שלה גדל עם השורה
      const row=()=>Math.round(cell.offsetTop/(cell.offsetHeight||1)),fall=.34+.06*(Math.round(cell.offsetTop/(cell.offsetHeight||1)));
      tl.fromTo(t,{y:()=>-(cell.offsetTop+cell.offsetHeight+8)},{y:0,duration:fall,ease:"power2.in",immediateRender:true},at)
        .to(t,{scaleY:.88,scaleX:1.05,transformOrigin:"50% 100%",duration:.09,ease:"power1.out"},at+fall)
        .to(t,{scaleY:1,scaleX:1,duration:.24,ease:"power2.out"},at+fall+.09)
        .call(()=>{num.textContent=String(i+1);},null,at+fall);
    });
    ScrollTrigger.create({trigger:grid,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{gsap.set(tiles,{clearProps:"all"});num.textContent=String(N);};
  });
})();`
},
{
  id:"b101", cat:"behavior", name:"תמונות ממוזערות: פוסלים ושומרים", tech:"vanilla JS · WAAPI · CSS @property · radio", status:"ממתין",
  desc:"כרטיס תוצאות עם מספר גדול וקו עולה, ומתחתיו שלוש תמונות לבדיקה. כשהקטע נכנס למסך שתי התמונות החלשות מקבלות סימן X ונעמעמות, אחת אחרי השנייה, ואז נשרטטת מסגרת סביב התמונה שנשארת, והמספר רץ לערך שלה והקו נשרטט איתו. אפשר ללחוץ על כל תמונה כדי לראות אותה כזוכה, והמספר והקו עוברים אליה.",
  when:"דף תוצאות או בדיקה: בדיקת A/B של מודעות, שלוש גרסאות של עמוד נחיתה, שלוש טיוטות של לוגו, שלושה צילומי מוצר ומה שהמכירות אמרו עליהם. מתאים כשיש מספר אמיתי לכל אפשרות ורוצים להראות למה נבחרה אחת. שלוש אפשרויות, פעם אחת בעמוד. לא כשאין בדיקה אמיתית מאחורי המספרים.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) שבו מתחת לכרטיס מדד עם קו עולה שלוש תמונות ממוזערות, שתיים מקבלות X ומועמעמות והשלישית מסומנת. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** שלוש תוויות (`label`) עם `input type=radio` אמיתי, הזוכה מסומן `checked` ובמחלקה `is-win`, והשתיים האחרות `is-out`. בלי JS זה מה שרואים. **הסימנים הם CSS:** `is-out` מכבה את התמונה (`opacity` ו-`filter`) ומקפיץ את ה-X (`transform` ו-`opacity`), ו-`is-win` מצייר מסגרת. **המסגרת נשרטטת בלי SVG:** טבעת בגבול של 3px עם `mask` של `conic-gradient`, והזווית היא משתנה רשום (`@property --vk-a`) שמשתנה בטרנזיציה מ-0 ל-360 מעלות. בדפדפן בלי `@property` המסגרת מופיעה בבת אחת. **ההרצה בכניסה:** אם אין הפחתת תנועה, ה-JS מאפס את המצב לנייטרלי ומריץ את הרצף כש-IntersectionObserver מזהה שהקטע במסך (שני X, ואז הזוכה, המספר והקו). לחיצה באמצע הרצף מבטלת אותו ומציגה את המצב מיד. **הקו** הוא נתיב אחד עם `pathLength=1` שמשורטט ב-WAAPI דרך `stroke-dashoffset`, והנתונים של שלוש האפשרויות בקוד. ציר הזמן זורם מימין לשמאל, כמו הקריאה: הנקודה הראשונה בצד ימין, והנקודה האחרונה עם העיגול בצד שמאל. באתר LTR הופכים את `316 - i * 52` ל-`4 + i * 52`. **נגישות:** בחירה במקלדת ובחצים היא של ה-radio הרגיל, עם `focus-visible` על התמונה. הסימנים מוסתרים, ושורת `role=status` מכריזה על הבחירה החדשה עם הערך. **בהפחתת תנועה** אין הרצה, ושינוי הבחירה מחליף מצב מיד. **בפרויקט:** מחליפים את הנתונים (`D`) ואת התמונות, ומשאירים שורה של הסבר מתחת לכרטיס.",
  libs:[],
  css:`@property --vk-a{syntax:"<angle>";inherits:false;initial-value:360deg}
.vk{max-width:820px;margin-inline:auto;display:grid;gap:clamp(24px,3vw,32px)}
.vk .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.vk-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:clamp(16px,3vw,32px);padding:clamp(20px,2.4vw,32px);border-radius:clamp(20px,2.4vw,32px);background:var(--card)}
.vk-lab{margin:0 0 8px;color:var(--muted);font-size:clamp(16px,1.3vw,19px)}
.vk-val{margin:0;font-size:clamp(56px,7vw,104px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.vk-chart{display:block;width:100%;height:auto;aspect-ratio:320 / 96;overflow:visible}
.vk-line{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1}
.vk-dot{fill:var(--accent)}
.vk-set{min-width:0;margin:0;padding:0;border:0}
.vk-set legend{margin:0 0 16px;padding:0;font-size:clamp(20px,2vw,28px);font-weight:700;line-height:1.2}
.vk-opts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2vw,24px)}
.vk-o{position:relative;display:grid;gap:4px;align-content:start;cursor:pointer}
.vk-ph{position:relative;display:block;border-radius:18px}
.vk-ph img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:cover;border-radius:inherit;transition:opacity .35s cubic-bezier(.2,.6,.2,1),filter .35s cubic-bezier(.2,.6,.2,1)}
.vk-o.is-out .vk-ph img{opacity:.38;filter:grayscale(1)}
.vk-o input:focus-visible + .vk-ph{outline:3px solid var(--ink);outline-offset:6px}
.vk-x{position:absolute;inset-block-start:50%;inset-inline-start:50%;display:grid;place-items:center;width:clamp(40px,22%,64px);aspect-ratio:1;margin:calc(clamp(40px,22%,64px) / -2) 0 0 0;border-radius:50%;background:var(--ink);color:var(--bg);opacity:0;transform:scale(.4);transition:transform .3s cubic-bezier(.2,.6,.2,1),opacity .2s cubic-bezier(.2,.6,.2,1)}
.vk-x svg{width:52%;height:52%;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round}
.vk-o.is-out .vk-x{opacity:1;transform:scale(1)}
.vk-ring{position:absolute;inset:-6px;border:3px solid var(--accent);border-radius:22px;pointer-events:none;-webkit-mask:conic-gradient(from 0deg,black var(--vk-a),transparent 0);mask:conic-gradient(from 0deg,black var(--vk-a),transparent 0);transition:--vk-a .8s cubic-bezier(.76,0,.24,1)}
.vk-o:not(.is-win) .vk-ring{--vk-a:0deg}
.vk-w{position:absolute;inset-block-start:10px;inset-inline-start:10px;padding:4px 12px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-size:14px;font-weight:700;opacity:0;transform:translateY(6px);transition:transform .35s cubic-bezier(.2,.6,.2,1),opacity .35s cubic-bezier(.2,.6,.2,1)}
.vk-o.is-win .vk-w{opacity:1;transform:translateY(0)}
.vk-nm{margin-top:8px;font-size:clamp(16px,1.4vw,19px);font-weight:600;line-height:1.3}
.vk-r{color:var(--muted);font-size:15px;font-variant-numeric:tabular-nums}
@media(max-width:767px){
  .vk-card{grid-template-columns:minmax(0,1fr)}
  .vk-ph{border-radius:12px}
  .vk-ring{inset:-4px;border-radius:15px}
  .vk-nm{font-size:15px}
  .vk-w{font-size:12px;padding:2px 8px;inset-block-start:6px;inset-inline-start:6px}
}
@media(prefers-reduced-motion:reduce){.vk-ph img,.vk-x,.vk-ring,.vk-w{transition:none}}`,
  html:`<div class="stage"><section class="vk" aria-labelledby="vk-h">
  <div class="vk-card">
    <div>
      <p class="vk-lab">אחוז קלקות על המודעה, שבוע בדיקה</p>
      <p class="vk-val">${VK_DATA[2].v.toFixed(1)}%</p>
    </div>
    <svg class="vk-chart" viewBox="0 0 320 96" aria-hidden="true">
      <path class="vk-line" pathLength="1" d="${VK_DATA[2].d}"/>
      <circle class="vk-dot" cx="${VK_DATA[2].x}" cy="${VK_DATA[2].y}" r="5"/>
    </svg>
  </div>
  <fieldset class="vk-set">
    <legend id="vk-h">איזו תמונה נשארת במודעה?</legend>
    <div class="vk-opts">
      ${VK.opts}
    </div>
  </fieldset>
  <p class="vk-live sr-only" role="status"></p>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".vk"),opts=[...root.querySelectorAll(".vk-o")],inputs=opts.map(o=>o.querySelector("input"));
  const val=root.querySelector(".vk-val"),line=root.querySelector(".vk-line"),dot=root.querySelector(".vk-dot"),live=root.querySelector(".vk-live");
  const D=${JSON.stringify(VK_DATA)};      // לכל תמונה: שם, ערך, נתיב הקו ונקודת הסוף
  const reduce=matchMedia("(prefers-reduced-motion: reduce)"),EASE="cubic-bezier(.2,.6,.2,1)";
  const fmt=n=>n.toFixed(1)+"%";
  let shown=D[2].v,raf=0,timers=[];
  function setVal(to,animate){
    cancelAnimationFrame(raf);
    if(!animate||reduce.matches){shown=to;val.textContent=fmt(to);return;}
    const from=shown,t0=performance.now(),dur=700;
    (function step(t){
      const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);
      shown=from+(to-from)*e;val.textContent=fmt(shown);
      if(k<1)raf=requestAnimationFrame(step);
    })(t0);
  }
  function draw(i,animate){
    line.setAttribute("d",D[i].d);dot.setAttribute("cx",D[i].x);dot.setAttribute("cy",D[i].y);
    if(!animate||reduce.matches)return;
    line.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:700,easing:EASE});
    dot.animate([{opacity:0},{opacity:0,offset:.8},{opacity:1}],{duration:700,easing:EASE});
  }
  function mark(i){opts.forEach((o,k)=>{o.classList.toggle("is-win",k===i);o.classList.toggle("is-out",k!==i);});}
  function stop(){timers.forEach(clearTimeout);timers=[];line.style.visibility="";dot.style.visibility="";}
  // בחירה של מבקר: מבטלת את הרצף אם הוא באמצע, ומציגה מיד את הזוכה החדש
  inputs.forEach((inp,i)=>inp.addEventListener("change",()=>{
    stop();mark(i);draw(i,true);setVal(D[i].v,true);
    live.textContent="נבחרה התמונה: "+D[i].name+", "+fmt(D[i].v)+" קלקות";
  }));
  // הרצף בכניסה למסך: נייטרלי, X ראשון, X שני, ואז הזוכה עם המספר והקו
  if(reduce.matches||!("IntersectionObserver" in window))return;
  opts.forEach(o=>o.classList.remove("is-out","is-win"));
  val.textContent=fmt(0);line.style.visibility="hidden";dot.style.visibility="hidden";
  const at=(ms,fn)=>timers.push(setTimeout(fn,ms));
  const io=new IntersectionObserver(es=>{
    if(!es.some(e=>e.isIntersecting))return;
    io.disconnect();
    at(500,()=>opts[0].classList.add("is-out"));
    at(1100,()=>opts[1].classList.add("is-out"));
    at(1800,()=>{opts[2].classList.add("is-win");line.style.visibility="";dot.style.visibility="";draw(2,true);setVal(D[2].v,true);});
  },{threshold:.6});
  io.observe(root.querySelector(".vk-opts"));
})();`
},
{
  id:"g267", cat:"gsap", name:"ערימת צילומים שמצטמצמת לרשת מספרים לבחירה", tech:"GSAP · ScrollTrigger scrub · sticky · radio", status:"ממתין",
  desc:"תשעה צילומים נערמים במרכז הבמה כמו חבילת קלפים, כל אחד מוטה קצת אחרת. בגלילה הם עוברים מהעליון למטה ומצטמצמים אל רשת של 3 על 3, וכשהם מתיישבים מופיע על כל אחד מספר ושם. ליד הרשת מופיעה שאלה גדולה, ואפשר לבחור צילום ולראות את השם שלו בשורה מתחת.",
  when:"סקשן בחירה בלי טופס: כיוון עיצוב לבית, סגנון לוגו, חבילת צילום, תפריט מראות לחנות. שישה עד תשעה פריטים, וכל אחד צריך שם קצר. הערימה מראה את כל האפשרויות בבת אחת והרשת נותנת לבחור. פעם אחת בעמוד, לפני טופס או כפתור של שיחה. לא כשיש פחות משישה פריטים או כשהמספרים אינם מעבירים מידע.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) שבו סגנונות שהוצגו אחד אחרי השני מצטמצמים לרשת ממוספרת, עם שאלה גדולה לידה. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** רשת 3 על 3 של תשע תוויות עם `radio` אמיתי, מספר ושם על כל תמונה, ושאלה לידה. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** נוספת `is-live` (במה נעוצה בגובה 240vh) והתאים נערמים במרכז הרשת, כל אחד מוטה ומוזז קצת: מחושב לכל תא מרכז הרשת פחות המרכז שלו לפי הפריסה (`offsetLeft`), בלי תלות בטרנספורם שכבר רץ, וקנה מידה שמביא אותו לחצי מרוחב הרשת. הם עוברים לתאים ב-`power3.inOut`, העליון ראשון, ואחריהם צצים המספרים והשמות. השאלה והטקסט שלידה נראים מההתחלה, והערימה היא החלק שזז. הצילום העליון בערימה הוא הצילום האחרון ברשימה, ולכן שמים שם צילום בהיר וקריא ולא כהה. **למה לא Flip:** ה-Flip של GSAP לא מזיז סיבוב, ופה הערימה מוטה. מדידה ישירה לכל תא נותנת אותה תוצאה ושולטת בסיבוב. **הבחירה אמיתית:** `radio` נסתר ויזואלית, מקלדת וחצים כרגיל, `focus-visible` על התמונה, והבחירה צובעת את המספר בצבע הדגש. הבחירה עובדת גם בלי תנועה. **בטלפון** השאלה מעל הרשת והרשת ברוחב המסך. **כיוון:** התא הראשון בפינה הימנית העליונה. באתר LTR הרשת מתהפכת מעצמה. **נגישות:** המספר מוסתר וקורא מסך שומע 'כיוון 3: שם', והשורה מתחת היא `aria-live`. **בפרויקט:** מחליפים בצילומים ובשמות של הלקוח ומחברים את הבחירה לטופס או לכפתור הבא.",
  libs:["gsap","ScrollTrigger"],
  css:`.fz{max-width:1180px;margin-inline:auto}
.fz .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fz-pin{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:center;gap:clamp(24px,5vw,72px)}
.fz-txt{display:grid;gap:16px;max-width:30ch}
.fz-txt h2{margin:0;font-size:clamp(30px,3.8vw,60px);font-weight:700;line-height:1.08;text-wrap:balance}
.fz-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fz-txt .fz-pick{margin-top:8px;color:var(--ink);font-weight:600}
.fz-grid{position:relative;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.4vw,16px);width:min(100%,560px);justify-self:center}
.fz-c{position:relative;z-index:var(--i)}
.fz-c label{display:block;cursor:pointer}
.fz-f{position:relative;display:block;aspect-ratio:1;overflow:hidden;border-radius:clamp(12px,1.6vw,20px);background:var(--card)}
.fz-f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .5s cubic-bezier(.2,.6,.2,1)}
.fz-c label:hover .fz-f img{transform:scale(1.05)}
.fz-n{position:absolute;inset-block-start:8px;inset-inline-start:8px;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--bg);font-size:15px;font-weight:700;font-variant-numeric:tabular-nums}
.fz-nm{position:absolute;inset-inline:0;bottom:0;padding:28px 10px 8px;background:linear-gradient(transparent,color-mix(in oklab,var(--ink) 72%,transparent));color:var(--bg);font-size:13px;font-weight:600;line-height:1.25}
.fz-c input:checked + .fz-f{box-shadow:0 0 0 3px var(--bg),0 0 0 6px var(--accent)}
.fz-c input:checked + .fz-f .fz-n{background:var(--accent);color:var(--accent-ink)}
.fz-c input:focus-visible + .fz-f{outline:3px solid var(--ink);outline-offset:6px}
.fz.is-live{height:240vh}
.fz.is-live .fz-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .fz-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:24px}
  .fz-txt{max-width:none;gap:8px}
  .fz-txt h2{font-size:28px}
  .fz-n{width:24px;height:24px;font-size:13px;inset-block-start:6px;inset-inline-start:6px}
  .fz-nm{padding:20px 6px 6px;font-size:11px}
}
@media(prefers-reduced-motion:reduce){.fz-f img{transition:none}}`,
  html:`<div class="stage"><section class="fz" aria-labelledby="fz-h">
  <div class="fz-pin">
    <div class="fz-txt">
      <h2 id="fz-h">איזה כיוון הכי קרוב לבית שאתם רואים לעצמכם?</h2>
      <p>תשעה כיווני עיצוב מהפרויקטים האחרונים שלנו. בוחרים אחד, ומתחילים ממנו את הצעת העיצוב הראשונה.</p>
      <p class="fz-pick" role="status">עוד לא נבחר כיוון</p>
    </div>
    <fieldset style="margin:0;padding:0;border:0;min-width:0">
      <legend class="sr-only">בחרו כיוון עיצוב</legend>
      <ol class="fz-grid">
      ${FZ.cells}
      </ol>
    </fieldset>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".fz"),grid=root.querySelector(".fz-grid"),cells=[...grid.children];
  const pick=root.querySelector(".fz-pick");
  // הבחירה אמיתית ועובדת גם בלי תנועה: radio רגיל, והשורה מכריזה על השם
  grid.addEventListener("change",e=>{
    const f=e.target.closest(".fz-c");if(!f)return;
    const nm=f.querySelector(".fz-nm").textContent.replace(/^כיוון \\d+: /,"");
    pick.textContent="בחרתם כיוון "+e.target.value+": "+nm;
  });
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הרשת כבר במארקאפ
  const N=cells.length,badges=cells.map(c=>c.querySelector(".fz-n")),names=cells.map(c=>c.querySelector(".fz-nm"));
  const R=[-7,5,-3,8,-5,3,-8,6,0],DX=[-22,16,-10,24,-14,12,-18,14,0],DY=[12,-10,16,-14,8,-16,10,-8,0];      // איך הערימה מוטה
  // בהפחתת תנועה הפונקציה לא רצה, והרשת נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const home=c=>[c.offsetLeft+c.offsetWidth/2,c.offsetTop+c.offsetHeight/2];      // מרכז התא לפי הפריסה, בלי הטרנספורם
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    gsap.set(badges,{autoAlpha:0,scale:.4});gsap.set(names,{autoAlpha:0});      // מצב פתיחה מפורש: stagger לא תמיד מציג את הערך ההתחלתי של כולם מיד
    cells.forEach((c,i)=>{
      tl.fromTo(c,
        {x:()=>grid.offsetWidth/2+DX[i]-home(c)[0],y:()=>grid.offsetHeight/2+DY[i]-home(c)[1],scale:()=>grid.offsetWidth*.52/c.offsetWidth,rotation:R[i]},
        {x:0,y:0,scale:1,rotation:0,duration:1.2,ease:"power3.inOut"},.1+(N-1-i)*.08);      // העליון בערימה יוצא ראשון
    });
    const t=tl.duration();
    tl.fromTo(badges,{autoAlpha:0,scale:.4},{autoAlpha:1,scale:1,duration:.4,ease:"power3.out",stagger:.05},t-.5);
    tl.fromTo(names,{autoAlpha:0},{autoAlpha:1,duration:.4,ease:"power1.out",stagger:.04},t-.4);
    tl.to({},{duration:.7});
    return()=>{root.classList.remove("is-live");gsap.set([...cells,...badges,...names],{clearProps:"all"});};
  });
})();`
},
{
  id:"g268", cat:"gsap", name:"פסיפס צילומים שצץ מהמרכז עם מונים רצים", tech:"GSAP · ScrollTrigger once · stagger from center", status:"ממתין",
  desc:"פסיפס רחב של 160 אריחי צילום ממלא את המסגרת. האריחים צצים בגל מהמרכז החוצה, כל אחד בגודל התחלה ובקצב קצת אחרים, והשוליים מחשיכים בהדרגה. באמצע נכנס כרטיס עם שני מספרים גדולים שרצים למעלה ושורת הסבר מתחתיהם.",
  when:"סקשן שמראה היקף: ארכיון של סטודיו, ספריית תמונות, מאגר מוצרים, מספר הלקוחות והפרויקטים. הפסיפס אומר 'יש הרבה' לפני שמישהו קרא מספר, והמספרים נותנים את הפירוט. פעם אחת בעמוד, ליד הוכחה או 'אודות'. לא כשאין ארכיון אמיתי גדול, ולא כשהמספרים אינם נכונים.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) שבו פסיפס של מאות אריחים קטנים צץ בגל מהמרכז עם שני מונים שרצים למיליונים ושורה מתחתיהם. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** פסיפס מלא של 160 אריחים (20 על 8, ובטלפון 10 על 16), כרטיס באמצע והמספרים הסופיים. בלי GSAP או בהפחתת תנועה זה מה שרואים. **האריחים** הם 16 צילומים אמיתיים שחוזרים עשר פעמים כל אחד, בסדר דטרמיניסטי שלא מחזיר אותו צילום ליד עצמו בשום אחד משני גדלי הרשת. כל אריח `loading=lazy`, והדפדפן טוען כל קובץ פעם אחת. **כשהמהלך רץ** timeline אחד, בהשהיה, מופעל פעם אחת על ידי ScrollTrigger עם `once` כשהפסיפס מגיע ל-72% מהמסך: כל אריח מתחיל בגודל קטן שונה (גזור מהאינדקס, לא ערך אקראי, כדי שאותו מסך ייראה אותו דבר בכל טעינה), וזמן הכניסה שלו הוא המרחק ממרכז הרשת (במידות אריחים, אחרי שמודדים כמה עמודות יש) ועוד סטייה קטנה. כך הגל לא נראה כמו טבעת מושלמת. **המונים** רצים ב-`power2.out` במקביל לגל, ונכתבים עם `toLocaleString('he-IL')`. **הכרטיס** נכנס אחרי תחילת הגל. **ה-vignette** הוא `radial-gradient` על `--ink`, ולכן מתאים לכל עור. **ביצועים:** 160 טווינים של `transform` ו-`opacity` בלבד. אם צריך יותר אריחים, מעבירים לקנבס ולא מוסיפים DOM. **נגישות:** הפסיפס קישוט (`aria-hidden`), המספרים מוסתרים בזמן הריצה ומשפט מוסתר אומר את הערכים הסופיים. **בפרויקט:** מחליפים בצילומי הלקוח ובמספרים אמיתיים.",
  libs:["gsap","ScrollTrigger"],
  css:`.fm{position:relative;isolation:isolate;max-width:1180px;margin-inline:auto;overflow:hidden;border-radius:clamp(16px,2vw,28px);background:var(--card)}
.fm .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fm-grid{display:grid;grid-template-columns:repeat(20,minmax(0,1fr));gap:2px}
.fm-t{position:relative;aspect-ratio:1;overflow:hidden;background:var(--line)}
.fm-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fm::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 28%,color-mix(in oklab,var(--ink) 66%,transparent) 100%)}
.fm-over{position:absolute;inset:0;z-index:2;display:grid;place-items:center;padding:var(--gutter)}
.fm-card{display:grid;gap:16px;width:min(540px,100%);padding:clamp(20px,3vw,40px);border-radius:clamp(18px,2vw,28px);background:var(--card);color:var(--ink);text-align:center;box-shadow:0 32px 60px -32px color-mix(in oklab,var(--ink) 70%,transparent)}
.fm-nums{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.fm-nums p{margin:0;display:grid;gap:4px}
.fm-nums b{font-size:clamp(34px,5vw,64px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.fm-nums span{color:var(--muted);font-size:clamp(14px,1.2vw,17px);line-height:1.3}
.fm-cap{margin:0;color:var(--muted);font-size:clamp(15px,1.3vw,18px);line-height:1.4}
@media(max-width:767px){
  .fm-grid{grid-template-columns:repeat(10,minmax(0,1fr))}
  .fm-over{padding:16px}
  .fm-card{gap:12px;padding:20px 16px}
  .fm-nums{gap:12px}
}`,
  html:`<div class="stage"><section class="fm" aria-label="ארכיון הצילומים של הסטודיו">
  <div class="fm-grid" aria-hidden="true">${FM.tiles}</div>
  <div class="fm-over">
    <div class="fm-card">
      <div class="fm-nums">
        <p><b data-to="48000" aria-hidden="true">48,000</b><span aria-hidden="true">צילומים בארכיון</span></p>
        <p><b data-to="1200" aria-hidden="true">1,200</b><span aria-hidden="true">עסקים שצילמנו</span></p>
      </div>
      <p class="fm-cap">כל צילום נשמר ונמסר ללקוח באותו יום.</p>
      <span class="sr-only">48,000 צילומים בארכיון ו-1,200 עסקים שצילמנו.</span>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הפסיפס המלא והמספרים הסופיים כבר במארקאפ
  const root=document.querySelector(".fm"),grid=root.querySelector(".fm-grid"),tiles=[...grid.children],card=root.querySelector(".fm-card"),nums=[...root.querySelectorAll(".fm-nums b")];
  const to=nums.map(b=>parseInt(b.dataset.to,10)),fmt=n=>Math.round(n).toLocaleString("he-IL");
  const r=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);};      // סטייה קבועה לכל אריח, בלי Math.random
  // בהפחתת תנועה הפונקציה לא רצה, והפסיפס והמספרים נשארים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const cols=getComputedStyle(grid).gridTemplateColumns.split(" ").length,rows=Math.ceil(tiles.length/cols),cx=(cols-1)/2,cy=(rows-1)/2;
    const o=nums.map(()=>({v:0}));
    nums.forEach(b=>{b.textContent="0";});
    const tl=gsap.timeline({paused:true});
    tiles.forEach((t,i)=>{
      const d=Math.hypot(i%cols-cx,Math.floor(i/cols)-cy),at=d*.055+r(i)*.2;      // הגל: המרחק מהמרכז ועוד סטייה קטנה
      tl.fromTo(t,{scale:.15+r(i+99)*.3,autoAlpha:0},{scale:1,autoAlpha:1,duration:.5+r(i+7)*.3,ease:"power3.out"},at);
    });
    nums.forEach((b,k)=>tl.to(o[k],{v:to[k],duration:2.2,ease:"power2.out",onUpdate:()=>{b.textContent=fmt(o[k].v);}},.2+k*.15));
    tl.fromTo(card,{autoAlpha:0,y:18,scale:.96},{autoAlpha:1,y:0,scale:1,duration:.7,ease:"power2.out"},.5);
    ScrollTrigger.create({trigger:root,start:"top 72%",once:true,onEnter:()=>tl.play()});
    return()=>{nums.forEach((b,k)=>{b.textContent=fmt(to[k]);});gsap.set([...tiles,card],{clearProps:"all"});};
  });
})();`
}
];
