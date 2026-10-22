// תשעה מהלכים מ-prompt-motion.com, אצווה f: כרטיסים וגלריה (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה, לא אתר גלילה. כל מהלך כאן נבנה מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים
// או הטקסטים של המקור, והדמו נכתב כאתר עסקי עברי רגיל. הדימויים הם תמונות אמיתיות מהמאגר (assets/media/real ו-dive, בלי הדרגות
// הצבע של .ph), ושאר העיצוב הוא CSS ו-SVG מצבעי הערכה בלבד.
// מהלכי תלת מימד (קיר הגליל, הספר) נופלים לגריד או לעמוד שטוח במסך צר ובהפחתת תנועה.

/* ---------- g195: נתוני המחיר לפי פריט מול מסלול קבוע ---------- */
const PV_ROWS = ["פוסט השקה לשירות החדש", "קרוסלה על שלבי העבודה", "סטורי למבצע סוף חודש", "פוסט עם המלצת לקוח", "באנר לקמפיין בפייסבוק",
  "תמונת שער לניוזלטר", "פוסט לקראת החג", "גרפיקה להרצאה ביום עיון", "פוסט היכרות עם הצוות"];
const PV_UNIT = 220, PV_PLAN = 1200;
const PV_TOTAL = PV_ROWS.length * PV_UNIT;
const nf = n => n.toLocaleString("en-US");
const IMG = "../assets/media/";

/* ---------- g196: ההתפלגות של ההיסטוגרמה (מחושבת פעם אחת, בלי רנדום) ---------- */
const HS = (() => {
  const N = 28, G = 16, D = 12.4, MAXH = 14, PADX = 8, TOP = 44, SPAN = 21;
  const f = x => x * x * Math.exp(-x / 2.6);
  const xs = Array.from({ length: N }, (_, i) => (i + .5) * SPAN / N);
  const fm = Math.max(...xs.map(f));
  const cols = xs.map(x => Math.round(MAXH * f(x) / fm));
  const T = cols.reduce((a, b) => a + b, 0);
  let acc = 0, bin = 0;
  for (let i = 0; i < N; i++) { if (acc + cols[i] >= T / 2) { bin = i + (T / 2 - acc) / cols[i]; break; } acc += cols[i]; }
  const W = PADX * 2 + N * G, base = TOP + MAXH * G, H = base + 40, xr = W - PADX, mx = +(xr - bin * G).toFixed(1);
  const med = Math.round(bin * SPAN / N);
  let dots = "";
  for (let i = 0; i < N; i++) for (let j = 0; j < cols[i]; j++) {
    const cx = +(xr - (i + .5) * G).toFixed(1), cy = +(base - (j + .5) * G).toFixed(1);
    dots += `<circle class="${cx > mx ? "f" : "s"}" cx="${cx}" cy="${cy}" r="${D / 2}"/>`;
  }
  let ticks = "";
  for (const m of [0, 5, 10, 15, 20]) { const x = +(xr - m / SPAN * N * G).toFixed(1); ticks += `<text class="hdh-tick" x="${x}" y="${base + 28}" text-anchor="middle">${m}</text>`; }
  return { W, H, base, TOP, xr, mx, T, med, dots, ticks };
})();

/* ---------- g197: צביר הכרטיסים (מיקום מפוזר, ומיקום בערימה ההדוקה) ---------- */
const CC = (() => {
  const people = [["מיכל אברהם", "אתר תדמית", "לפני 3 דקות", "מא"], ["יונתן שלום", "דף נחיתה", "לפני 11 דקות", "יש"], ["נועה ביטון", "חנות אונליין", "לפני 20 דקות", "נב"],
    ["אורי לוי", "קידום אורגני", "לפני 32 דקות", "אל"], ["שירה מזרחי", "מיתוג לעסק", "לפני שעה", "שמ"], ["אלון פרידמן", "אתר תדמית", "לפני שעה", "אפ"],
    ["הדס כץ", "פאנל ניהול", "לפני שעתיים", "הכ"], ["רונן אשכנזי", "דף נחיתה", "לפני שלוש שעות", "רא"], ["תמר דוד", "חנות אונליין", "אתמול", "תד"], ["גיא אזולאי", "קידום אורגני", "אתמול", "גא"]];
  const N = people.length;
  // ברשימה הכרטיס החדש ביותר ראשון. j הוא הגיל של הכרטיס: 0 הוותיק ביותר, 9 החדש שנכנס אחרון ויושב למעלה
  const loose = [[100, -70, -7], [-95, -15, 6], [110, 60, 4], [-105, -115, -5], [10, -135, 7], [-40, 110, -6], [60, -10, 3], [-110, 70, 5], [112, 128, -4], [-20, -60, -3]];
  const fan = j => [Math.round((4.5 - j) * 12), Math.round((j - 4.5) * 30), +((j - 4.5) * -1).toFixed(1)];
  const cards = people.map((p, k) => {
    const j = N - 1 - k, f = fan(j);
    return `
    <li class="ccl-card" style="--fx:${f[0]}px;--fy:${f[1]}px;--fr:${f[2]}deg;--i:${k};z-index:${j + 1}">
      <div class="ccl-in"><span class="ccl-ava" aria-hidden="true">${p[3]}</span><span class="ccl-who"><b>${p[0]}</b><small>${p[1]}, ${p[2]}</small></span></div>
      <span class="ccl-tag" aria-hidden="true">חדש</span>
    </li>`;
  }).join("");
  return { loose, cards, n: N };
})();

/* ---------- g198: קיר הכרטיסים (32 כרטיסי וידאו, שורה עליונה של 16 ושורה תחתונה של 16) ---------- */
const CY = (() => {
  const names = ["דנה", "אורי", "מיכל", "יונתן", "נועה", "אלון", "שירה", "עידו", "מאיה", "תומר", "רוני", "גיא", "ליאת", "עומר", "הדס", "איתי",
    "טל", "נדב", "יעל", "אסף", "רותם", "אביב", "מורן", "ניר", "קרן", "דור", "ענבל", "שחר", "לירון", "רועי", "אילת", "בן"];
  // 19 תמונות של אנשים מהמאגר: [נתיב, רוחב, גובה, מיקום הפנים בחיתוך האנכי]
  const P = [["real/s02/hero-panel", 2200, 1468, "26% 30%"], ["real/s06/dancers", 1500, 1212, "42% 35%"], ["real/s06/food", 1300, 1000, "40% 35%"],
    ["real/s06/hug", 1500, 1100, "48% 30%"], ["real/s06/singer", 1800, 1012, "78% 35%"], ["real/s09/hero-corridor", 2000, 1666, "30% 35%"],
    ["real/s09/step-1-booking", 1500, 1200, "40% 35%"], ["real/s09/step-2-welcome", 1500, 1200, "72% 35%"], ["real/s09/step-3-exam", 1500, 1200, "55% 40%"],
    ["real/s09/step-4-home", 1500, 1200, "45% 40%"], ["real/s10/install", 1200, 1067, "55% 30%"], ["real/s10/resident", 1100, 1650, "50% 30%"],
    ["real/s12/hero-window", 1100, 1100, "50% 40%"], ["real/s12/thermos", 900, 1200, "50% 40%"], ["real/s12/van-door", 1000, 1200, "50% 35%"],
    ["real/s14/baker-hands", 1100, 1320, "50% 35%"], ["dive/portrait", 2400, 1600, "47% 18%"], ["real/s12/dusk-camp", 1000, 1000, "50% 55%"],
    ["real/s01/bench-hands", 1500, 1000, "30% 30%"]];
  // התמונה לפי 7i מודולו 19: מחזור של 19 ארוך מכל מרחק בין שכנים בגריד (1, 4, 5, 8, 9, וגם 15, 16, 17 בקיר של 16 בשורה), ולכן שני שכנים לא מציגים אותה תמונה
  const cards = names.map((n, i) => {
    const p = P[(7 * i) % P.length];
    return `<li class="cyl-c"><img src="${IMG}${p[0]}.webp" alt="" width="${p[1]}" height="${p[2]}" loading="lazy" decoding="async" style="object-position:${p[3]}"><span class="cyl-p" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5z"/></svg></span><span class="ph-l">${n}</span></li>`;
  }).join("");
  return { cards, cols: 16 };
})();

/* ---------- g199 ו-b82: גזרת הדמות מ-dive/portrait.webp (תמונה בלי רקע שקוף, לכן מסכה בקו המתאר שלה) ---------- */
// קו המתאר נמדד על התמונה (1200x800 ביחידות ה-viewBox): הקודקודים לאורך הצד השמאלי מלמעלה למטה, והימני מלמטה למעלה.
// הראש נחתך בקצה העליון של התמונה, ולכן שם יש דהייה רכה, והזרועות ממשיכות מעבר לתחתית כדי שהקצה התחתון יישאר מלא.
const CUT = (() => {
  const L = "413 60,412 100,412 120,416 140,422 150,429 160,443 180,455 200,463 230,473 260,477 290,477 310,472 330,463 350,445 370,430 380,408 391,386 402,362 413,338 420,314 423,290 428,268 438,246 451,228 466,215 484,208 505,205 540,203 580,201 620,200 700,199 830";
  const R = "940 830,938 700,934 640,931 590,927 540,922 505,914 480,898 457,872 440,842 430,808 420,794 408,770 402,716 384,702 376,690 362,676 347,666 330,663 310,664 290,672 272,682 255,690 230,696 205,700 190,706 178,716 164,722 150,728 138,734 120,738 100,739 60";
  const d = "M413 60A163 62 0 0 1 739 60L" + R.split(",").reverse().slice(1).concat(L.split(",").reverse().slice(0, -1)).join("L").replace(/,/g, " ") + "Z";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="none"><defs><linearGradient id="f" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="90"><stop offset="0" stop-opacity="0"/><stop offset="1" stop-opacity="1"/></linearGradient><filter id="b" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.5"/></filter></defs><path filter="url(#b)" fill="url(#f)" d="${d}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

/* ---------- g199: כוכב ה"פאו" של רקע הקומיקס (14 קודקודים, מחושב פעם אחת) ---------- */
const BURST = (() => {
  const n = 14, pts = [];
  for (let i = 0; i < n * 2; i++) { const r = i % 2 ? 36 : 49, a = i * Math.PI / n; pts.push((50 + r * Math.cos(a)).toFixed(1) + "," + (50 + r * Math.sin(a)).toFixed(1)); }
  return pts.join(" ");
})();

/* ---------- g200: עמודי הספר (תפריט של עשרה פריטים; סדר הקריאה מימין לשמאל) ---------- */
const BK = (() => {
  // [שם, תיאור, מחיר, תמונה, רוחב, גובה, מיקום החיתוך]
  const items = [["לחם שאור בתסיסה ארוכה", "נאפה כל בוקר, עם קרום פריך ופנים רך.", 32, "s14/hero-bread", 1600, 1333, "50% 50%"],
    ["קרואסון חמאה", "מתפרק בשכבות, מגיע עם קפה שחור או לאטה.", 24, "s14/croissants", 1250, 1000, "42% 50%"],
    ["קערת גלידה בשני טעמים", "וניל ושוקולד מריר, עם רוטב לבחירה.", 36, "s11/bowls", 1100, 1650, "50% 38%"],
    ["שלושה גביעי מנטה", "מארז לשיתוף, כל גביע עם כדור טרי.", 42, "s11/cones-yellow", 1400, 1050, "50% 60%"],
    ["כדורי וניל וסוכריות", "מנה קטנה לילדים ולמי שנשאר ילד.", 28, "s11/hero-scoops", 1400, 1750, "50% 40%"],
    ["גביע וופל סגול", "פטל ופרחי סיגליות, בגביע שנאפה במקום.", 22, "s11/magenta-cone", 1000, 1000, "50% 50%"],
    ["סדנת בצק שאור", "שעתיים של לישה, וכיכר אחת הביתה.", 180, "s14/baker-hands", 1100, 1320, "50% 40%"],
    ["בירת חיטה קרה", "בכוס גבוהה, ישר מהחבית.", 34, "s15/flute", 1000, 1250, "50% 45%"],
    ["קוקטייל הבית", "תפוז, ג'ין ועשבי תיבול, על קרח גדול.", 48, "s15/hero-glass", 1100, 1375, "50% 35%"],
    ["וויסקי בכוס קריסטל", "שלושה סוגים לטעימה, כוס קטנה לכל אחד.", 52, "s15/pour", 1000, 1250, "50% 50%"]];
  const pg = (it, side) => `<div class="bkp-pg bkp-${side}"><img class="bkp-img" src="${IMG}real/${it[3]}.webp" alt="" width="${it[4]}" height="${it[5]}" loading="lazy" decoding="async" style="object-position:${it[6]}"><div><h3>${it[0]}</h3><p>${it[1]}</p><b>₪${nf(it[2])}</b></div><span class="bkp-sh" aria-hidden="true"></span></div>`;
  // עמוד ימין בספירלה s: פריט 2s. עמוד שמאל: פריט 2s+1. עלים 0..3 נושאים שמאל s בחזית וימין s+1 מאחור
  const L = 4;
  let leaves = "";
  for (let i = 0; i < L; i++) leaves += `<div class="bkp-leaf" style="--i:${i}"><div class="bkp-f bkp-front">${pg(items[2 * i + 1], "l")}</div><div class="bkp-f bkp-back">${pg(items[2 * (i + 1)], "r")}</div></div>`;
  const baseR = `<div class="bkp-base bkp-base-r">${pg(items[0], "r")}</div>`;
  const baseL = `<div class="bkp-base bkp-base-l">${pg(items[9], "l")}</div>`;
  return { leaves, baseR, baseL, L };
})();

/* ---------- g201: שדה התמונות (68 אריחים, שני מיקומים לכל אחד: טבעת ופיזור) ---------- */
const RG = (() => {
  const N = 68, DMIN = 9.6, HX = 43, HY = 44, VX = 17, VY = 18;
  // 18 תמונות מהמאגר: [נתיב, רוחב, גובה]
  const P = [["s04/trio", 1200, 1500], ["s11/hero-scoops", 1400, 1750], ["s10/resident", 1100, 1650], ["s12/thermos", 900, 1200], ["s14/baker-hands", 1100, 1320],
    ["s15/flute", 1000, 1250], ["s07/hero-posters", 1100, 1375], ["s04/hero-monster", 1200, 1500], ["s10/wallbox", 1000, 1500], ["s12/van-door", 1000, 1200],
    ["s15/pour", 1000, 1250], ["s11/bowls", 1100, 1650], ["s09/step-1-booking", 1500, 1200], ["s06/hug", 1500, 1100], ["s13/proj-b", 1200, 1600],
    ["s14/croissants", 1250, 1000], ["s11/magenta-cone", 1000, 1000], ["s07/ink-hands", 1000, 1000]];
  // נקודות מרצף R2 (פיזור אחיד בלי שורות ועמודות), מחוץ לאזור הפנוי באמצע (אליפסה בשביל הכיתוב)
  const pts = [];
  for (let k = 1; pts.length < N; k++) {
    const x = ((.5 + .7548776662 * k) % 1) * 2 * HX - HX, y = ((.5 + .569840291 * k) % 1) * 2 * HY - HY;
    if ((x / VX) ** 2 + (y / VY) ** 2 > 1) pts.push({ x, y });
  }
  // הדיפה הדדית: זוגות קרובים מדי מתרחקים, ושום נקודה לא יוצאת מהמסגרת או נכנסת לאזור הפנוי
  for (let it = 0; it < 90; it++) {
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = pts[i], b = pts[j];
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
      if (d >= DMIN) continue;
      if (d < 1e-6) { dx = 1; dy = 0; d = 1; }
      const m = (DMIN - d) / 2 / d;
      a.x -= dx * m; a.y -= dy * m; b.x += dx * m; b.y += dy * m;
    }
    for (const p of pts) {
      p.x = Math.max(-HX, Math.min(HX, p.x)); p.y = Math.max(-HY, Math.min(HY, p.y));
      const e = Math.hypot(p.x / VX, p.y / VY);
      if (e < 1) { if (e < 1e-6) { p.x = VX; p.y = 0; } else { p.x /= e; p.y /= e; } }
    }
  }
  let s = 11;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const tiles = pts.map(p => {
    const ss = +(.7 + rnd() * .8).toFixed(2), sr = Math.round((rnd() - .5) * 30), bl = ss > 1.3 ? 2.6 : ss < .8 ? 1.4 : 0;
    return { sx: +p.x.toFixed(1), sy: +p.y.toFixed(1), ss, sr, bl, ang: (Math.atan2(p.y, p.x) + 2 * Math.PI) % (2 * Math.PI) };
  });
  // כל תמונה מופיעה לכל היותר ארבע פעמים, ובכל פעם במקום הרחוק ביותר מהעותקים הקודמים שלה
  const used = P.map(() => []), cap = Math.ceil(N / P.length);
  tiles.forEach(t => {
    let best = 0, bd = -1;
    P.forEach((_, k) => {
      if (used[k].length >= cap) return;
      const d = used[k].length ? Math.min(...used[k].map(u => Math.hypot(u.sx - t.sx, u.sy - t.sy))) : 1e9;
      if (d > bd) { bd = d; best = k; }
    });
    used[best].push(t); t.img = best;
  });
  const slots = [];
  for (let i = 0; i < 28; i++) slots.push({ R: 27, a: i / 28 * 2 * Math.PI });
  for (let i = 0; i < 40; i++) slots.push({ R: 40, a: i / 40 * 2 * Math.PI + .05 });
  slots.sort((p, q) => p.a - q.a);
  tiles.sort((p, q) => p.ang - q.ang);
  const html = tiles.map((t, i) => {
    const sl = slots[i], p = P[t.img];
    let rr = sl.a * 180 / Math.PI + 90;
    rr = rr - 360 * Math.round((rr - t.sr) / 360);
    const d = +(.26 * i / tiles.length + rnd() * .04).toFixed(3);
    return `<img class="rgf-t${t.bl ? " rgf-b" : ""}" src="${IMG}real/${p[0]}.webp" alt="" width="${p[1]}" height="${p[2]}" loading="lazy" decoding="async" style="--rx:${+(sl.R * Math.cos(sl.a)).toFixed(2)};--ry:${+(sl.R * Math.sin(sl.a)).toFixed(2)};--rr:${Math.round(rr)};--sx:${t.sx};--sy:${t.sy};--sr:${t.sr};--ss:${t.ss};--bl:${t.bl};--d:${d};z-index:${Math.round(t.ss * 10)}">`;
  }).join("");
  return { html, n: tiles.length };
})();

export default [
{
  id:"g194", cat:"gsap", name:"אריחי בנטו שכל אחד מנגן הדגמה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"שישה אריחים בגריד בנטו, וכל אחד מנגן הדגמה קטנה משלו כשהגריד נכנס למסך: קו גרף נמשך עד נקודה בקצהו והאחוז שלידו סופר, טבעת מתמלאת, עמודות עולות, מתג מחליק למצב פעיל, וי נרשם ולחצן הפעלה נלחץ. האריחים קופצים פנימה בזה אחר זה, וההדגמות מתחילות מיד אחריהם.",
  when:"סקשן יתרונות או תוצאות שיש בו כמה דברים קטנים להראות, ולא משפט אחד להסביר: מערכת, אפליקציה, סטודיו עם כמה שירותים, כלי ניהול. כל אריח מראה דבר אמיתי אחד במקום לתאר אותו. פעם אחת בעמוד, וכשיש חמישה עד שישה דברים שאפשר להראות בתנועה קצרה.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם גריד בנטו מציג ממשק מיניאטורי בתוך כל אריח. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** כל אריח כבר מצויר גמור (קו מלא, טבעת על 92%, עמודות בגובה מלא, מתג במצב פעיל, וי, פס התקדמות), ובלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** timeline אחד נפתח פעם אחת (`once`) כשהגריד מגיע ל-78% מהמסך: האריחים נכנסים ב-`power3.out` עם סקייל קטן (בלי ספרינג, כי `back` נחסם), וכל הדגמה מתחילה בהיסט קטן אחרי האריח שלה. הקו נמשך ב-`stroke-dasharray:1` על נתיב עם `pathLength=\"1\"`, בלי תוסף. האחוז והטבעת רצים מאותו ערך, ולכן לא נפרדים. **המתג:** הכפתור יושב בקצה הסיומי (`flex-end`) ובתנועה זז ממצב הכבוי, והכיוון נקרא מ-`direction`, כך שבאתר LTR אין מה לשנות במתג. **כיווניות:** הזמן בגרף זורם מימין לשמאל (הנקודה האחרונה בשמאל) והעמודות מסודרות מהחודש הישן בימין. באתר LTR הופכים את הנתיב ב-`scaleX(-1)` ואת סדר העמודות, ואת `transform-origin` של פס ההתקדמות. **נגישות:** המספרים הרצים מוסתרים מקורא מסך, ולכל אריח יש משפט מוסתר עם הערך הסופי. האיורים הם `span` ולא כפתורים. **מובייל:** גריד של שתי עמודות, והגרף והעמודות ברוחב מלא. בלי יציאת האריחים בתלת מימד בסוף, כי היא לא מוסיפה מידע.",
  libs:["gsap","ScrollTrigger"],
  css:`.bmd{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(150px,auto);gap:clamp(12px,1.6vw,18px);max-width:1040px;margin-inline:auto}
.bmd-t{position:relative;display:flex;flex-direction:column;gap:12px;min-width:0;padding:clamp(16px,2vw,24px);border-radius:24px;background:var(--card);color:var(--ink);overflow:hidden;
  box-shadow:0 18px 40px -30px color-mix(in srgb,var(--ink) 45%,transparent)}
.bmd-t h3{margin:0;font-size:clamp(17px,1.5vw,20px);line-height:1.25;font-weight:700}
.bmd-t p{margin:0}
.bmd-k{font-size:14px;font-weight:600;color:var(--muted)}
.bmd-sub{font-size:14px;line-height:1.5;color:var(--muted)}
.bmd-a{grid-column:span 2;grid-row:span 2}
.bmd-c{grid-row:span 2}
.bmd-e,.bmd-f{grid-column:span 2;flex-direction:row;align-items:center;gap:18px}
.bmd-fig{display:grid;gap:4px}
.bmd-fig b{font-size:clamp(44px,5.2vw,72px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.bmd-fig small{font-size:14px;color:var(--muted)}
.bmd-line{display:block;width:100%;height:auto;margin-top:auto;overflow:visible}
.bmd-ln{fill:none;stroke:var(--accent);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1}
.bmd-area{fill:url(#bmd-g)}
.bmd-end{fill:var(--accent);stroke:var(--card);stroke-width:3}
.bmd-ring{position:relative;width:96px;height:96px;margin:auto}
.bmd-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.bmd-ring circle{fill:none;stroke-width:7;stroke-linecap:round}
.bmd-trk{stroke:color-mix(in srgb,var(--ink) 10%,transparent)}
.bmd-arc{stroke:var(--accent);stroke-dasharray:92 100}
.bmd-ring b{position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:700;font-variant-numeric:tabular-nums}
.bmd-bars{display:flex;align-items:flex-end;gap:8px;flex:1;min-height:96px}
.bmd-bars i{flex:1;height:var(--h);border-radius:8px 8px 4px 4px;background:color-mix(in srgb,var(--accent) 24%,var(--card))}
.bmd-bars i:last-child{background:var(--accent)}
.bmd-sw{position:relative;display:flex;justify-content:flex-end;align-items:center;width:64px;height:36px;padding:4px;border-radius:99px;background:color-mix(in srgb,var(--ink) 16%,var(--card))}
.bmd-fill{position:absolute;inset:0;border-radius:inherit;background:var(--accent)}
.bmd-knob{position:relative;width:28px;height:28px;border-radius:50%;background:var(--accent-ink);box-shadow:0 2px 6px color-mix(in srgb,var(--ink) 30%,transparent)}
.bmd-ok{flex:none;display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--accent);color:var(--accent-ink)}
.bmd-ok svg{width:32px;height:32px;fill:none;stroke:currentColor;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.bmd-ok path{stroke-dasharray:1}
.bmd-vid{flex:none;position:relative;display:grid;place-items:center;width:clamp(112px,14vw,152px);aspect-ratio:4/3;border-radius:16px;overflow:hidden;
  background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 80%,var(--ink)),var(--ink))}
.bmd-play{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--bg);color:var(--ink)}
.bmd-play svg{width:18px;height:18px;fill:currentColor}
.bmd-prog{position:absolute;inset-inline:12px;bottom:12px;height:4px;border-radius:99px;background:rgb(255 255 255 / .28)}
.bmd-prog i{display:block;height:100%;border-radius:inherit;background:var(--bg);transform-origin:100% 50%;transform:scaleX(.62)}
.bmd .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){
  .bmd{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(132px,auto)}
  .bmd-a{grid-column:span 2;grid-row:auto}
  .bmd-c{grid-column:span 2;grid-row:auto;order:3}
  .bmd-d{order:2}
  .bmd-e{order:4}
  .bmd-f{order:5}
  .bmd-fig b{font-size:56px}
}`,
  html:`<div class="stage"><div class="bmd">
  <article class="bmd-t bmd-a">
    <p class="bmd-k">פניות מהאתר</p>
    <p class="bmd-fig" aria-hidden="true"><b data-to="38">+38%</b><small>לעומת הרבעון הקודם</small></p>
    <span class="sr-only">פניות מהאתר עלו ב-38% לעומת הרבעון הקודם.</span>
    <svg class="bmd-line" viewBox="0 0 320 130" aria-hidden="true">
      <defs><linearGradient id="bmd-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.26"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></linearGradient></defs>
      <path class="bmd-area" d="M316 104C296 100 286 88 266 90C244 92 236 70 214 72C190 74 184 56 160 54C138 52 128 62 108 46C86 30 70 36 54 26C38 16 28 20 14 14L14 126L316 126Z"/>
      <path class="bmd-ln" pathLength="1" d="M316 104C296 100 286 88 266 90C244 92 236 70 214 72C190 74 184 56 160 54C138 52 128 62 108 46C86 30 70 36 54 26C38 16 28 20 14 14"/>
      <circle class="bmd-end" cx="14" cy="14" r="6"/>
    </svg>
  </article>
  <article class="bmd-t bmd-b">
    <p class="bmd-k">לקוחות שחוזרים</p>
    <div class="bmd-ring" aria-hidden="true"><svg viewBox="0 0 72 72"><circle class="bmd-trk" cx="36" cy="36" r="30" pathLength="100"/><circle class="bmd-arc" cx="36" cy="36" r="30" pathLength="100"/></svg><b data-to="92">92%</b></div>
    <span class="sr-only">92% מהלקוחות מהשנה שעברה חוזרים אלינו.</span>
    <p class="bmd-sub">מהלקוחות של השנה שעברה</p>
  </article>
  <article class="bmd-t bmd-c">
    <p class="bmd-k">הכנסות חודשיות</p>
    <div class="bmd-bars" aria-hidden="true"><i style="--h:34%"></i><i style="--h:46%"></i><i style="--h:41%"></i><i style="--h:68%"></i><i style="--h:84%"></i></div>
    <span class="sr-only">חמישה חודשים ברצף, מינואר עד מאי, עם עלייה כמעט מדי חודש.</span>
    <p class="bmd-sub">ינואר עד מאי</p>
  </article>
  <article class="bmd-t bmd-d">
    <p class="bmd-k">תזכורות ללקוחות</p>
    <div class="bmd-sw" aria-hidden="true"><i class="bmd-fill"></i><span class="bmd-knob"></span></div>
    <p class="bmd-sub">נשלחות אוטומטית יום לפני הפגישה</p>
  </article>
  <article class="bmd-t bmd-e">
    <div class="bmd-ok" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M8 17l6 6 11-12" pathLength="1"/></svg></div>
    <div><h3>הצעת המחיר נשלחה</h3><p class="bmd-sub">יצאה ללקוח היום ב-09:40, והוא כבר פתח אותה.</p></div>
  </article>
  <article class="bmd-t bmd-f">
    <div class="bmd-vid" aria-hidden="true"><span class="bmd-play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span><span class="bmd-prog"><i></i></span></div>
    <div><h3>סרטון היכרות עם הסטודיו</h3><p class="bmd-sub">דקה וחצי על איך העבודה מתנהלת, משיחה ראשונה ועד השקה.</p></div>
  </article>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל אריח כבר מוצג גמור, במארקאפ
  const root=document.querySelector(".bmd"),q=s=>root.querySelector(s),tiles=[...root.querySelectorAll(".bmd-t")];
  const sign=getComputedStyle(root).direction==="rtl"?1:-1;
  // בהפחתת תנועה הפונקציה לא רצה, וכל האריחים נשארים בערך הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const num=q(".bmd-fig b"),pct=q(".bmd-ring b"),A=+num.dataset.to,B=+pct.dataset.to,o={a:0,b:0};
    const sw=q(".bmd-sw"),knob=q(".bmd-knob"),play=q(".bmd-play"),at=i=>.4+i*.1;
    num.textContent="+0%";pct.textContent="0%";
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top 78%",once:true}});
    tl.from(tiles,{autoAlpha:0,scale:.88,y:28,duration:.7,stagger:.1,ease:"power3.out"},0)
      // אריח 1: קו שנמשך, שטח שמתמלא, נקודה בקצה ואחוז שסופר
      .fromTo(q(".bmd-ln"),{strokeDashoffset:1},{strokeDashoffset:0,duration:1.5,ease:"power2.inOut"},at(0))
      .from(q(".bmd-area"),{autoAlpha:0,duration:1,ease:"power1.out"},at(0)+.5)
      .from(q(".bmd-end"),{scale:0,svgOrigin:"14 14",duration:.45,ease:"power3.out"},at(0)+1.35)
      .to(o,{a:A,duration:1.5,ease:"power2.inOut",onUpdate:()=>{num.textContent="+"+Math.round(o.a)+"%";}},at(0))
      // אריח 2: טבעת מתמלאת עם המספר
      .fromTo(q(".bmd-arc"),{strokeDasharray:"0 100"},{strokeDasharray:B+" 100",duration:1.3,ease:"power2.inOut"},at(1))
      .to(o,{b:B,duration:1.3,ease:"power2.inOut",onUpdate:()=>{pct.textContent=Math.round(o.b)+"%";}},at(1))
      // אריח 3: עמודות עולות
      .from(root.querySelectorAll(".bmd-bars i"),{scaleY:0,transformOrigin:"50% 100%",duration:.8,stagger:.09,ease:"power3.out"},at(2))
      // אריח 4: מתג שמחליק למצב פעיל
      .fromTo(knob,{x:()=>sign*(sw.clientWidth-knob.offsetWidth-8)},{x:0,duration:.5,ease:"power3.inOut"},at(3)+.25)
      .from(q(".bmd-fill"),{autoAlpha:0,duration:.35,ease:"power1.out"},at(3)+.25)
      // אריח 5: עיגול קופץ וסימן וי שנרשם
      .from(q(".bmd-ok"),{scale:0,duration:.5,ease:"power3.out"},at(4)+.1)
      .fromTo(q(".bmd-ok path"),{strokeDashoffset:1},{strokeDashoffset:0,duration:.4,ease:"power2.out"},at(4)+.4)
      // אריח 6: לחצן הפעלה נלחץ והפס מתקדם
      .to(play,{scale:.84,duration:.16,ease:"power2.in"},at(5)+.2)
      .to(play,{scale:1,duration:.45,ease:"power3.out"})
      .fromTo(q(".bmd-prog i"),{scaleX:0},{scaleX:.62,duration:1.4,ease:"power1.inOut"},"<.1");
    return()=>{num.textContent="+"+A+"%";pct.textContent=B+"%";};
  });
})();`
},
{
  id:"g195", cat:"gsap", name:"מחיר לפי פריט מול מסלול קבוע", tech:"GSAP · ScrollTrigger scrub · CSS", status:"ממתין",
  desc:`שני לוחות זה לצד זה. בלוח הראשון רשימת פריטים במחיר לכל אחד, והשורות מתווספות בגלילה, ארבע ואז תשע, כשהסכום למטה מטפס וסרגל הסכום מתארך. בלוח השני מסלול חודשי קבוע במחיר שלא זז, עם משפט שסופר את אותם פריטים ושבב חיסכון שמופיע ברגע שהרשימה עוברת את המסלול. רואים את המחיר מתנפח ליד מחיר שנשאר במקום.`,
  when:"עמוד מחירים של שירות שנמכר גם לפי יחידה וגם כחבילה חודשית: עיצוב פוסטים, צילום, תיקונים, הדרכות, משלוחים. מראה במקום להסביר למה כדאי לעבור למסלול, ועובד כשהמחיר ליחידה והמחיר הקבוע אמיתיים ומוצגים באותו מבנה. פעם אחת בעמוד, ליד הכפתור שמזמין לבחור מסלול.",
  note:`**שחזור.** השראה: שני סרטונים בגלריה (21.10.2026) שבהם שורות מחיר מתווספות בצד אחד והסכום מתנפח, בזמן שהצד השני נשאר על מחיר אחד. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** כל תשע השורות, הסכום ₪${nf(PV_TOTAL)}, הסרגל המלא, המחיר הקבוע ושבב החיסכון (₪${nf(PV_TOTAL - PV_PLAN)}). בלי GSAP ובהפחתת תנועה רואים אותו. **המחירים נקראים מהמארקאפ:** \`data-unit\` (מחיר לפריט) ו-\`data-plan\` (המסלול) על שורש הרכיב, והסקריפט מחשב מהם את הסכום לכל מספר שורות. הכול תלוי במספר שלם אחד (\`k\`) שגלילה מזיזה מ-0 ל-9, ולכן השורות, הסכום, הסרגל, משפט הספירה והשבב תמיד מסכימים. **העצירה בארבעה:** ה-timeline עוצר שם רגע, כי עד ארבעה פריטים תשלום לפי פריט זול יותר מהמסלול, ורק אחר כך הוא עובר אותו. **בלי קפיצת פריסה:** כל תשע השורות תופסות מקום מההתחלה, והשורות שעוד לא נוספו שקופות (opacity ו-transform בלבד, עם easing מהרשימה). מעבר ה-CSS מופעל רק אחרי ציור המצב ההתחלתי (\`is-anim\`), כדי שלא יהיה הבהוב בטעינה. **הבמה נעוצה** (\`is-live\`, גובה 320vh), כדי שיהיה מרווח גלילה להגיע עד תשע שורות. **כיווניות:** הסרגל מתמלא מימין לשמאל (\`transform-origin:100%\`), ובאתר LTR הופכים אותו ל-0%, ומחליפים את סדר שני הלוחות אם רוצים את המסלול בצד ימין. **נגישות:** הסכום והמשפט הרצים מוסתרים מקורא מסך, ופסקה מוסתרת מקריאה את שני המחירים הסופיים. **מובייל:** הלוחות נערמים בעמודה אחת.`,
  libs:["gsap","ScrollTrigger"],
  css:`.ppv{max-width:960px;margin-inline:auto}
.ppv-pin{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(16px,2.4vw,28px);align-items:stretch;align-content:center}
.ppv-box{display:flex;flex-direction:column;gap:18px;min-width:0;padding:clamp(20px,2.6vw,40px);border-radius:28px}
.ppv-pay{background:var(--card);color:var(--ink);box-shadow:0 18px 40px -30px color-mix(in srgb,var(--ink) 45%,transparent)}
.ppv-plan{justify-content:space-between;background:var(--accent);color:var(--accent-ink)}
.ppv-k{margin:0;font-size:15px;font-weight:600}
.ppv-pay .ppv-k{color:var(--muted)}
.ppv-rows{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.ppv-row{display:flex;justify-content:space-between;gap:16px;padding:10px 14px;border-radius:12px;font-size:var(--fs-body);background:color-mix(in srgb,var(--ink) 5%,transparent)}
.ppv-row b{font-weight:600;font-variant-numeric:tabular-nums}
.ppv-sum{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-top:auto}
.ppv-sum span{color:var(--muted);font-size:var(--fs-body)}
.ppv-sum i{font-style:normal}
.ppv-total{font-size:clamp(36px,4.4vw,56px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.ppv-price{display:flex;align-items:baseline;gap:10px;margin:0}
.ppv-price b{font-size:clamp(44px,5.4vw,72px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.ppv-price small{font-size:16px}
.ppv-incl{margin:0;font-size:var(--fs-body);line-height:1.5}
.ppv-incl i{font-style:normal;font-weight:700}
.ppv-save{align-self:flex-start;display:inline-flex;gap:6px;padding:6px 14px;border-radius:99px;font-size:14px;font-weight:700;background:color-mix(in srgb,var(--accent-ink) 16%,transparent)}
.ppv-save b{font-variant-numeric:tabular-nums}
.ppv-bar{display:block;height:8px;border-radius:99px;overflow:hidden;background:color-mix(in srgb,currentColor 16%,transparent)}
.ppv-bar i{display:block;height:100%;border-radius:inherit;background:currentColor;transform-origin:100% 50%;transform:scaleX(var(--w,1))}
.ppv-pay .ppv-bar{color:var(--ink)}
.ppv.is-live{height:320vh}
.ppv.is-live .ppv-pin{position:sticky;top:0;height:100vh;height:100svh}
.ppv.is-anim .ppv-row{transition:opacity .35s cubic-bezier(.2,.6,.2,1),transform .35s cubic-bezier(.2,.6,.2,1)}
.ppv.is-anim .ppv-row.is-off{opacity:0;transform:translateY(10px)}
.ppv.is-anim .ppv-bar i{transition:transform .35s cubic-bezier(.2,.6,.2,1)}
.ppv.is-anim .ppv-save{transition:opacity .3s cubic-bezier(.2,.6,.2,1),transform .3s cubic-bezier(.2,.6,.2,1)}
.ppv.is-anim .ppv-save.is-off{opacity:0;transform:translateY(6px)}
.ppv .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){
  .ppv-pin{grid-template-columns:minmax(0,1fr);gap:12px}
  .ppv-box{gap:12px;padding:20px;border-radius:24px}
  .ppv-rows{gap:4px}
  .ppv-row{padding:6px 12px;font-size:15px}
  .ppv-total{font-size:36px}
  .ppv-price b{font-size:44px}
}`,
  html:`<div class="stage"><div class="ppv" data-unit="${PV_UNIT}" data-plan="${PV_PLAN}">
  <div class="ppv-pin">
  <p class="sr-only">בתשלום לפי פוסט, תשעה פוסטים בחודש עולים ${nf(PV_TOTAL)} שקלים. במסלול החודשי הקבוע אותם פוסטים עולים ${nf(PV_PLAN)} שקלים, וההפרש הוא ${nf(PV_TOTAL - PV_PLAN)} שקלים.</p>
  <section class="ppv-box ppv-pay">
    <p class="ppv-k">תשלום לפי פוסט, ₪${PV_UNIT} לכל אחד</p>
    <ul class="ppv-rows">
${PV_ROWS.map(r => `      <li class="ppv-row"><span>${r}</span><b>₪${PV_UNIT}</b></li>`).join("\n")}
    </ul>
    <div class="ppv-sum" aria-hidden="true"><span>סה״כ ל-<i data-count>9 פוסטים</i></span><strong class="ppv-total">₪${nf(PV_TOTAL)}</strong></div>
    <span class="ppv-bar" aria-hidden="true"><i></i></span>
  </section>
  <section class="ppv-box ppv-plan">
    <p class="ppv-k">מסלול חודשי קבוע</p>
    <p class="ppv-price"><b>₪${nf(PV_PLAN)}</b><small>לחודש</small></p>
    <p class="ppv-incl" aria-hidden="true"><i data-count>9 פוסטים</i> בחודש, באותו מחיר ובלי תוספת על כל אחד.</p>
    <span class="ppv-save" aria-hidden="true"><span>חוסכים</span><b>₪${nf(PV_TOTAL - PV_PLAN)}</b></span>
    <span class="ppv-bar" aria-hidden="true"><i style="--w:${(PV_PLAN / PV_TOTAL).toFixed(3)}"></i></span>
  </section>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל השורות והסכום הסופי כבר במארקאפ
  const root=document.querySelector(".ppv"),rows=[...root.querySelectorAll(".ppv-row")],N=rows.length;
  const unit=+root.dataset.unit,plan=+root.dataset.plan;
  const total=root.querySelector(".ppv-total"),bar=root.querySelector(".ppv-pay .ppv-bar i");
  const save=root.querySelector(".ppv-save"),saveN=save.querySelector("b"),counts=[...root.querySelectorAll("[data-count]")];
  const fmt=n=>n.toLocaleString("en-US"),word=k=>k===1?"פוסט אחד":k+" פוסטים";
  // מצב אחד לכל מספר שורות: שורות, סכום, סרגל, משפט הספירה והשבב נגזרים כולם מ-k
  const paint=k=>{
    rows.forEach((r,i)=>r.classList.toggle("is-off",i>=k));
    total.textContent="₪"+fmt(k*unit);
    counts.forEach(c=>{c.textContent=word(k);});
    bar.style.setProperty("--w",(k/N).toFixed(3));
    const d=k*unit-plan;save.classList.toggle("is-off",d<=0);if(d>0)saveN.textContent="₪"+fmt(d);
  };
  // בהפחתת תנועה הפונקציה לא רצה, והמצב הסופי נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const o={n:0},go=()=>paint(Math.round(o.n));
    paint(0);
    root.classList.add("is-live");                              // במה נעוצה: הגובה נקבע לפני שה-ScrollTrigger נוצר
    requestAnimationFrame(()=>root.classList.add("is-anim"));   // הטרנזישן מופעל רק אחרי ציור המצב ההתחלתי
    gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to(o,{n:4,duration:4,onUpdate:go})
      .to({},{duration:1.4})                    // עצירה בארבעה: עד כאן לפי פריט זול יותר
      .to(o,{n:N,duration:5,onUpdate:go});
    return()=>{root.classList.remove("is-live","is-anim");paint(N);};
  });
})();`
},
{
  id:"g196", cat:"gsap", name:"נקודות שנופלות ונערמות להיסטוגרמה", tech:"GSAP · ScrollTrigger scrub · SVG", status:"ממתין",
  desc:`מאות נקודות נופלות מלמעלה ונערמות לעמודות של היסטוגרמה, עמודה אחרי עמודה, והמספר לידן סופר כל נקודה שנוחתת. בסוף מתמלא פס מוצל עד קו אנכי שיורד לאורך הצד, ועליו התווית של החציון. נקודות הצד המהיר בצבע המותג והשאר באפור, וההתפלגות נראית כמו צורה ולא כמו טבלה.`,
  when:"סיפור נתונים בסקשן הוכחה או אודות: זמני מענה ללקוחות, זמני משלוח, גודל הזמנות, מחירים של עבודות קודמות. מתאים כשיש התפלגות אמיתית ויש חציון או נתון אחד שרוצים להדגיש, ולא ממוצע חד-ספרתי שלא מספר כלום. פעם אחת בעמוד.",
  note:`**שחזור.** השראה: שני סרטונים בגלריה (21.10.2026) שבהם נקודות נופלות ונערמות להיסטוגרמה, עם מספר רץ וקו חציון. נבנה מאפס מהצפייה. **ההתפלגות נבנית בקוד פעם אחת** (עקומה אסימטרית עם זנב ארוך, בלי רנדום), ומחשבת ממנה גובה לכל עמודה, את מספר הנקודות (${HS.T}) ואת החציון (${HS.med} דקות). בפרויקט אמיתי מחליפים את המערך \`cols\` בספירה אמיתית מהנתונים, וכל השאר (חציון, תווית, סרגל, משפט) מתחשב מעצמו. **המארקאפ הוא המצב הסופי:** כל ${HS.T} העיגולים במקומם, הפס והקו והתווית. בלי GSAP ובהפחתת תנועה רואים את ההיסטוגרמה גמורה. **כשהמהלך רץ:** הבמה נעוצה (\`is-live\`, גובה 300vh) ו-timeline אחד עם \`scrub\` נמתח לאורכה. כל נקודה נופלת מעל לקצה העליון של ה-SVG (ה-SVG חותך, ולכן הנקודות נכנסות מהקצה) ב-\`power2.in\`, עם \`stagger\` לפי הסדר במסמך, כלומר עמודה אחרי עמודה ובתוכה מלמטה למעלה. המספר לא רץ בנפרד: הוא נגזר מזמן ה-timeline וסופר רק נקודות שכבר נחתו. **החציון:** הפס נמתח מקצה הזמן 0 עד הקו (\`svgOrigin\`), הקו נמשך ב-\`stroke-dasharray:1\` עם \`pathLength=\"1\"\`, והתווית נכנסת אחרונה. הצבע נקבע לפי הצד של הקו, ולא לפי המיקום ברשימה. **כיווניות:** הזמן זורם מימין לשמאל, והעמודה המהירה בימין, כמו הקריאה בעברית. באתר LTR הופכים את הציר (\`cx = x0 + (i + .5) * G\`) ואת \`svgOrigin\`. **נגישות:** ה-SVG והמספר הרץ מוסתרים מקורא מסך, והמשפט כולל את המספרים הסופיים בטקסט מוסתר. **מובייל:** העמודים מתחת לטקסט, וגודל המספרים על הציר נשאר קריא.`,
  libs:["gsap","ScrollTrigger"],
  css:`.hdh{max-width:1040px;margin-inline:auto}
.hdh-pin{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,5vw,72px);align-items:center;align-content:center}
.hdh-txt{display:grid;gap:14px;max-width:34ch}
.hdh-k{margin:0;color:var(--muted);font-size:15px;font-weight:600}
.hdh-num{display:flex;align-items:baseline;gap:14px;margin:0;font-size:clamp(64px,8vw,112px);font-weight:700;line-height:.95;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.hdh-num small{font-size:max(.22em,18px);font-weight:500;letter-spacing:0;color:var(--muted)}
.hdh-lead{margin:0;font-size:clamp(19px,1.6vw,24px);font-weight:600;line-height:1.35;text-wrap:balance}
.hdh-chart{display:grid;gap:10px}
.hdh-svg{display:block;width:100%;height:auto;overflow:hidden}
.hdh-svg circle.f{fill:var(--accent)}
.hdh-svg circle.s{fill:color-mix(in srgb,var(--ink) 34%,var(--bg))}
.hdh-band{fill:color-mix(in srgb,var(--accent) 10%,transparent)}
.hdh-med{fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-dasharray:1}
.hdh-axis{stroke:var(--line);stroke-width:1.5}
.hdh-tick{font-size:14px;fill:var(--muted);font-variant-numeric:tabular-nums}
.hdh-lbl{font-size:15px;font-weight:600;fill:var(--ink)}
.hdh-cap{margin:0;color:var(--muted);font-size:14px;text-align:center}
.hdh .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hdh.is-live{height:300vh}
.hdh.is-live .hdh-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){.hdh-pin{grid-template-columns:minmax(0,1fr);gap:24px;align-content:center}.hdh-txt{max-width:none}}`,
  html:`<div class="stage"><div class="hdh"><div class="hdh-pin">
  <div class="hdh-txt">
    <p class="hdh-k">זמן מענה לפניות מהאתר</p>
    <p class="hdh-num" aria-hidden="true"><b>${HS.T}</b><small>פניות</small></p>
    <p class="hdh-lead"><span class="sr-only">${HS.T} פניות. </span>בחודש האחרון ענינו ל-${HS.T} פניות מהאתר, וחצי מהן קיבלו תשובה בתוך ${HS.med} דקות.</p>
  </div>
  <div class="hdh-chart">
    <svg class="hdh-svg" viewBox="0 0 ${HS.W} ${HS.H}" aria-hidden="true">
      <rect class="hdh-band" x="${HS.mx}" y="${HS.TOP}" width="${+(HS.xr - HS.mx).toFixed(1)}" height="${HS.base - HS.TOP}" rx="8"/>
      <line class="hdh-axis" x1="8" x2="${HS.xr}" y1="${HS.base + 6}" y2="${HS.base + 6}"/>
      ${HS.dots}
      <path class="hdh-med" pathLength="1" d="M${HS.mx} ${HS.TOP - 8}V${HS.base + 6}"/>
      <text class="hdh-lbl" x="${HS.mx}" y="${HS.TOP - 18}" text-anchor="middle">חציון: ${HS.med} דקות</text>
      ${HS.ticks}
    </svg>
    <p class="hdh-cap">דקות עד התשובה הראשונה</p>
  </div>
</div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP ההיסטוגרמה כבר גמורה, במארקאפ
  const root=document.querySelector(".hdh"),svg=root.querySelector(".hdh-svg"),num=root.querySelector(".hdh-num b");
  const dots=[...svg.querySelectorAll("circle")],T=dots.length;
  const band=svg.querySelector(".hdh-band"),med=svg.querySelector(".hdh-med"),lbl=svg.querySelector(".hdh-lbl");
  const xr=+svg.viewBox.baseVal.width-8,top=+band.getAttribute("y"),base=top+ +band.getAttribute("height");
  // בהפחתת תנועה הפונקציה לא רצה, והנקודות נשארות במקומן
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const each=.016,dur=.7,fall=base+12;
    root.classList.add("is-live");
    num.textContent="0";
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.eventCallback("onUpdate",()=>{num.textContent=Math.max(0,Math.min(T,Math.floor((tl.time()-dur)/each)+1));});   // סופר רק נקודות שכבר נחתו
    tl.fromTo(dots,{autoAlpha:0},{autoAlpha:1,duration:.05,stagger:each},0)
      .fromTo(dots,{y:-fall},{y:0,duration:dur,ease:"power2.in",stagger:each},0)
      .fromTo(band,{scaleX:0,svgOrigin:xr+" "+top},{scaleX:1,duration:.7,ease:"power2.out"},T*each+dur-.2)
      .fromTo(med,{strokeDashoffset:1},{strokeDashoffset:0,duration:.6,ease:"power2.inOut"},">-.25")
      .fromTo(lbl,{autoAlpha:0,y:6},{autoAlpha:1,y:0,duration:.35,ease:"power1.out"},">-.15")
      .to({},{duration:.6});
    return()=>{root.classList.remove("is-live");num.textContent=T;};
  });
})();`
},
{
  id:"b82", cat:"behavior", name:"כרטיס הולוגרפי עם פסי נתונים", tech:"CSS 3D · pointer · mix-blend-mode", status:"ממתין",
  desc:"כרטיס חבר צוות במסגרת מוזהבת, והעיצוב מעליו מבריק כמו כרטיס אספנות: שכבת צבעי קשת נעה על פני הכרטיס ומשנה גוון בהתאם לנטייה, והכרטיס עצמו נוטה אחרי העכבר עם הברקה שעוקבת אחריו. כשהכרטיס נכנס למסך שלושה פסי נתונים מתמלאים עד 98, 100 ו-99. במגע הכרטיס מתנדנד לאט מעצמו.",
  when:"כרטיס צוות, כרטיס עדות מרכזי, הגשת נותן שירות מוביל או מוצר אחד שרוצים שירגיש מיוחד. רק כשיש מה להראות בנתונים (שביעות רצון, ותק, פרויקטים), ורק על כרטיס אחד או שניים בעמוד, כי ברק על כל כרטיס מבטל את האפקט. לא בעמוד רשמי של משרד או קליניקה.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) של דמות על כרטיס אספנות עם רדיד קשת ופסי נתונים. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** כרטיס שטוח, הרדיד באמצע ופסי הנתונים מלאים (`--v` על כל פס). בלי JS ובהפחתת תנועה זה מה שרואים. **ההברקה:** שכבת `linear-gradient` של צבעי קשת בגודל 260% עם `mix-blend-mode:color-dodge`, ו-`background-position` מתוך `--fx` ו-`--fy` שזזים עם הנטייה. הבסיס חייב להיות בגוון בינוני (אצלנו תערובת של `--accent`), כי color-dodge על שחור נשאר שחור. שכבה שנייה, `soft-light`, היא נקודת האור שעוקבת אחרי העכבר. **הנטייה:** האזנה אחת (pointermove על המסגרת), ערך יעד ערך נוכחי עם החלקה בכל פריים, והלולאה נעצרת כשהכרטיס נח. עד 14 מעלות, והכיוון הוא שהצד שמצביעים עליו מתרחק. `perspective` יושב על האב ולא על הכרטיס. **מגע:** `touch-action:pan-y` כדי שלא לחסום גלילה, ובמכשיר בלי hover (`(hover: none)`) הכרטיס מתנדנד לבד כשהוא במסך (נעצר מחוץ למסך). **הפסים:** `IntersectionObserver` אחד מוסיף `is-in`, והמילוי הוא `transform:scaleX` עם טרנזישן מהרשימה והשהיה לכל פס. **הפחתת תנועה:** בלי נטייה, בלי הנדנוד ובלי מילוי הפסים. **התמונה:** תמונה אמיתית מהמאגר בחלון הכרטיס (`object-fit:cover`, ו-`object-position` שמכוון לפנים). התמונה עצמה יושבת מעל הרדיד של הכרטיס, כי `color-dodge` על תמונה בהירה שוטף אותה ללבן והיא נראית דהויה. במקומו יש לה שכבת ברק משלה בתוך החלון (`overlay` עם אותו גרדיאנט ואותם `--fx` ו-`--fy`), שמוסיפה צבע בלי לשטוף את הפנים. **כיווניות:** הפסים מתמלאים מימין לשמאל (`transform-origin:100%`), ובאתר LTR הופכים ל-0%. **נגישות:** שכבות הרדיד וההברקה והאיור מוסתרים מקורא מסך, והמספרים והשם והתפקיד הם טקסט רגיל.",
  libs:[],
  css:`.hfc{display:grid;place-items:center;perspective:900px;padding-block:24px}
.hfc-card{--rx:0deg;--ry:0deg;--fx:50%;--fy:50%;--gx:50%;--gy:30%;position:relative;width:min(320px,86vw);padding:8px;border-radius:26px;touch-action:pan-y;
  background:linear-gradient(135deg,hsl(44 78% 72%),hsl(36 66% 48%) 45%,hsl(46 80% 74%) 70%,hsl(34 62% 46%));
  box-shadow:0 30px 60px -28px color-mix(in srgb,var(--ink) 60%,transparent);
  transform:rotateX(var(--rx)) rotateY(var(--ry))}
.hfc-in{position:relative;isolation:isolate;display:grid;gap:12px;padding:12px;border-radius:19px;overflow:hidden;
  background:linear-gradient(165deg,color-mix(in srgb,var(--accent) 52%,var(--bg)),color-mix(in srgb,var(--accent) 24%,var(--ink)))}
.hfc-art{position:relative;z-index:2;isolation:isolate;aspect-ratio:1/.9;border-radius:14px;overflow:hidden;
  background:radial-gradient(circle at 50% 38%,color-mix(in srgb,var(--accent) 30%,var(--card)),color-mix(in srgb,var(--accent) 62%,var(--ink)))}
.hfc-art img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;object-position:47% 18%}
.hfc-sheen{position:absolute;inset:0;pointer-events:none;mix-blend-mode:overlay;opacity:.6;
  background:radial-gradient(circle at var(--gx) var(--gy),rgb(255 255 255 / .6),transparent 46%),linear-gradient(115deg,hsl(350 90% 66%),hsl(45 95% 64%),hsl(135 75% 56%),hsl(190 95% 62%),hsl(265 85% 70%),hsl(330 90% 68%),hsl(350 90% 66%));
  background-size:auto,260% 260%;background-position:0 0,var(--fx) var(--fy)}
.hfc-foil{position:absolute;inset:0;z-index:1;pointer-events:none;mix-blend-mode:color-dodge;opacity:.5;
  background:linear-gradient(115deg,hsl(350 90% 66%),hsl(45 95% 64%),hsl(135 75% 56%),hsl(190 95% 62%),hsl(265 85% 70%),hsl(330 90% 68%),hsl(350 90% 66%));
  background-size:260% 260%;background-position:var(--fx) var(--fy)}
.hfc-glare{position:absolute;inset:0;z-index:1;pointer-events:none;mix-blend-mode:soft-light;opacity:.55;
  background:radial-gradient(circle at var(--gx) var(--gy),rgb(255 255 255 / .9),transparent 46%)}
.hfc-plate{position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px 12px;padding:12px 16px;border-radius:14px;background:var(--card);color:var(--ink)}
.hfc-plate h3{margin:0;font-size:20px;line-height:1.2}
.hfc-plate p{margin:0;flex-basis:100%;order:3;font-size:14px;color:var(--muted)}
.hfc-tag{padding:4px 12px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:700}
.hfc-stats{position:relative;z-index:2;list-style:none;margin:0;padding:12px 16px;display:grid;gap:10px;border-radius:14px;background:var(--card);color:var(--ink)}
.hfc-stats li{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;gap:4px 12px}
.hfc-stats span{font-size:14px}
.hfc-stats b{font-size:16px;font-variant-numeric:tabular-nums}
.hfc-stats i{grid-column:1/-1;display:block;height:6px;border-radius:99px;background:color-mix(in srgb,var(--ink) 10%,transparent);overflow:hidden}
.hfc-stats i::after{content:"";display:block;height:100%;border-radius:inherit;background:var(--accent);transform-origin:100% 50%;transform:scaleX(var(--v,1))}
.hfc.is-prep .hfc-stats i::after{transform:scaleX(0)}
.hfc.is-in .hfc-stats i::after{transform:scaleX(var(--v,1));transition:transform .9s cubic-bezier(.2,.6,.2,1)}
.hfc.is-in .hfc-stats li:nth-child(2) i::after{transition-delay:.12s}
.hfc.is-in .hfc-stats li:nth-child(3) i::after{transition-delay:.24s}`,
  html:`<div class="stage"><div class="hfc">
  <article class="hfc-card" aria-label="כרטיס חבר צוות: דנה לוי, מעצבת בכירה">
    <div class="hfc-in">
      <div class="hfc-art" aria-hidden="true"><img src="../assets/media/dive/portrait.webp" alt="" width="2400" height="1600" loading="lazy" decoding="async"><i class="hfc-sheen"></i></div>
      <div class="hfc-foil" aria-hidden="true"></div>
      <div class="hfc-glare" aria-hidden="true"></div>
      <div class="hfc-plate"><h3>דנה לוי</h3><span class="hfc-tag">בצוות מ-2018</span><p>מעצבת בכירה</p></div>
      <ul class="hfc-stats">
        <li><span>שביעות רצון לקוחות</span><b>98</b><i style="--v:.98" aria-hidden="true"></i></li>
        <li><span>עמידה בלוחות זמנים</span><b>100</b><i style="--v:1" aria-hidden="true"></i></li>
        <li><span>תשומת לב לפרטים</span><b>99</b><i style="--v:.99" aria-hidden="true"></i></li>
      </ul>
    </div>
  </article>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".hfc"),card=root.querySelector(".hfc-card");
  const mq=matchMedia("(prefers-reduced-motion: reduce)"),touch=matchMedia("(hover: none)");
  let off=null;
  function enable(){
    root.classList.add("is-prep");
    const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){root.classList.add("is-in");}},{threshold:.4});
    io.observe(card);
    let tx=0,ty=0,cx=0,cy=0,raf=0,held=false,seen=true;
    const MAX=14;
    const apply=()=>{
      card.style.setProperty("--rx",(-cy*2*MAX).toFixed(2)+"deg");
      card.style.setProperty("--ry",(cx*2*MAX).toFixed(2)+"deg");
      card.style.setProperty("--fx",(50+cx*60).toFixed(1)+"%");
      card.style.setProperty("--fy",(50+cy*60).toFixed(1)+"%");
      card.style.setProperty("--gx",(50+cx*100).toFixed(1)+"%");
      card.style.setProperty("--gy",(35+cy*100).toFixed(1)+"%");
    };
    const tick=t=>{
      raf=0;
      if(touch.matches&&!held&&seen){tx=Math.sin(t/1700)*.34;ty=Math.cos(t/2300)*.28;}   // בלי עכבר: נדנוד איטי
      cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;apply();
      if(Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001||(touch.matches&&seen))raf=requestAnimationFrame(tick);
    };
    const kick=()=>{if(!raf)raf=requestAnimationFrame(tick);};
    const aim=e=>{
      const r=card.getBoundingClientRect();
      tx=Math.max(-.8,Math.min(.8,(e.clientX-r.left)/r.width-.5));
      ty=Math.max(-.8,Math.min(.8,(e.clientY-r.top)/r.height-.5));kick();
    };
    const rest=()=>{held=false;tx=0;ty=0;kick();};
    const down=e=>{held=true;aim(e);};
    const vis=new IntersectionObserver(es=>{seen=es.some(e=>e.isIntersecting);if(seen)kick();});
    vis.observe(card);
    root.addEventListener("pointermove",aim);root.addEventListener("pointerleave",rest);
    root.addEventListener("pointerdown",down);root.addEventListener("pointerup",rest);root.addEventListener("pointercancel",rest);
    kick();
    return()=>{
      io.disconnect();vis.disconnect();cancelAnimationFrame(raf);
      root.removeEventListener("pointermove",aim);root.removeEventListener("pointerleave",rest);
      root.removeEventListener("pointerdown",down);root.removeEventListener("pointerup",rest);root.removeEventListener("pointercancel",rest);
      ["--rx","--ry","--fx","--fy","--gx","--gy"].forEach(p=>card.style.removeProperty(p));
      root.classList.remove("is-prep","is-in");
    };
  }
  const sync=()=>{if(off){off();off=null;}if(!mq.matches)off=enable();};
  mq.addEventListener("change",sync);sync();
})();`
},
{
  id:"g197", cat:"gsap", name:"צביר כרטיסים צף וכרטיס חדש קופץ", tech:"GSAP · ScrollTrigger scrub · sticky", status:"ממתין",
  desc:"בהתחלה שני כרטיסי פנייה מונחים נטויים על הבמה, והמספר שלידם הוא 2. בגלילה כרטיסים חדשים נכנסים אחד אחרי השני, כל אחד עם תג קטן שנדלק ונכבה, והמספר סופר איתם עד 10. אחר כך הערימה המפוזרת מתהדקת למניפה צפופה, כל כרטיס מוזז מעט מקודמו, והחדש ביותר יושב למעלה.",
  when:"סקשן שמראה נפח של עבודה: פניות שנכנסות לאתר, הזמנות, לקוחות חדשים, קריאות שירות או מועמדים למשרה. מתאים כשיש ספירה אמיתית ואותו סוג פריט שחוזר, ורוצים שהמספר ירגיש כמו ערימה ולא כמו ספרה. פעם אחת בעמוד, ליד כותרת שאומרת מה סופרים. לא כשיש פריט אחד בלבד או כשכל הכרטיסים שונים זה מזה.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם כרטיסים קטנים ומוטים נערמים בצביר ומונה סופר אותם. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** עשרה כרטיסים במניפה צפופה והמספר 10. המיקום של כל כרטיס במניפה כתוב עליו ב-`--fx`, `--fy`, `--fr` (והסדר ב-`z-index`), ובלי GSAP או בהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** הסקריפט מוסיף `is-live` (במה נעוצה בגובה 340vh) ובונה timeline אחד עם `scrub`. לכל כרטיס יש מיקום פיזור (טבלת `LOOSE`, לפי גיל הכרטיס) ומיקום מניפה, והמניפה נקראת מה-CSS ולא נכתבת פעמיים. שני הכרטיסים הוותיקים נמצאים מההתחלה, ושמונת האחרים קופצים בזה אחר זה ב-`power3.out` (בלי ספרינג, כי `back` נחסם), ובכל כניסה נדלק תג `חדש` קטן. **המספר לא רץ בנפרד:** הוא נגזר מזמן ה-timeline וסופר רק כרטיסים שכבר נכנסו, ולכן תמיד מסכים עם הערימה. **ההידוק:** רק אחרי שהאחרון נכנס כל הכרטיסים נעים למניפה, עם הפרש קטן בין כרטיס לכרטיס. **ציפה:** כל כרטיס מרחף מעט בעצמו (`animation` על הפנים ולא על המעטפת שמוזזת), ורק כשהמהלך חי. **מובייל:** המרחק האופקי של הפיזור מתכווץ לפי רוחב הבמה (`kx`), כך שהכרטיסים לא יוצאים מהמסך. **כיווניות:** הכרטיס החדש ביותר יושב משמאל ולמעלה, כלומר הזמן זורם מימין לשמאל. באתר LTR הופכים את הסימן של `--fx` ושל `x` בטבלת הפיזור. **נגישות:** האוואטרים והתג מוסתרים מקורא מסך, המספר הרץ מוסתר, ומשפט מוסתר אומר את הסכום הסופי.",
  libs:["gsap","ScrollTrigger"],
  css:`.ccl{max-width:1040px;margin-inline:auto;--cw:min(260px,56vw)}
.ccl-pin{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:clamp(24px,5vw,72px);align-items:center;align-content:center}
.ccl-txt{display:grid;gap:14px;max-width:32ch}
.ccl-h{margin:0;font-size:clamp(24px,2.6vw,38px);line-height:1.15;font-weight:700;text-wrap:balance}
.ccl-p{margin:0;color:var(--muted)}
.ccl-cap{display:flex;align-items:baseline;gap:14px;margin:8px 0 0}
.ccl-cap b{font-size:clamp(64px,8vw,112px);font-weight:700;line-height:.95;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.ccl-cap span{font-size:clamp(17px,1.5vw,22px);color:var(--muted)}
.ccl-field{position:relative;height:clamp(360px,44vw,440px)}
.ccl-list{list-style:none;margin:0;padding:0}
.ccl-card{position:absolute;left:calc(50% - var(--cw) / 2);top:calc(50% - 28px);width:var(--cw);height:56px;transform:translate(var(--fx),var(--fy)) rotate(var(--fr))}
.ccl-in{display:flex;align-items:center;gap:12px;height:100%;padding:0 14px;border-radius:18px;background:var(--card);color:var(--ink);
  box-shadow:0 14px 28px -18px color-mix(in srgb,var(--ink) 55%,transparent)}
.ccl-ava{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:color-mix(in srgb,var(--accent) 18%,var(--card));font-size:13px;font-weight:700}
.ccl-who{display:grid;min-width:0;flex:1}
.ccl-who b{font-size:15px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ccl-who small{font-size:13px;line-height:1.3;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ccl-tag{position:absolute;top:-8px;inset-inline-end:-6px;padding:4px 10px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:700;opacity:0}
.ccl-card:first-child .ccl-tag{opacity:1}
.ccl.is-live{height:340vh}
.ccl.is-live .ccl-pin{position:sticky;top:0;height:100vh;height:100svh}
.ccl.is-live .ccl-in{animation:ccl-bob 6s cubic-bezier(.4,0,.2,1) infinite alternate;animation-delay:calc(var(--i) * -.9s)}
@keyframes ccl-bob{from{transform:translateY(0)}to{transform:translateY(-8px)}}
.ccl .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){
  .ccl-pin{grid-template-columns:minmax(0,1fr);gap:16px}
  .ccl-txt{max-width:none}
  .ccl-field{height:360px}
  .ccl-cap b{font-size:64px}
}`,
  html:`<div class="stage"><div class="ccl">
  <div class="ccl-pin">
    <div class="ccl-txt">
      <h2 class="ccl-h">כל פנייה מהאתר נשמרת במקום אחד</h2>
      <p class="ccl-p">מי שהשאיר פרטים מופיע ברשימה עם השם, התחום והשעה, וחוזרים אליו עוד באותו יום.</p>
      <p class="ccl-cap"><b aria-hidden="true">${CC.n}</b><span aria-hidden="true">פניות חדשות היום</span><span class="sr-only">${CC.n} פניות חדשות היום.</span></p>
    </div>
    <div class="ccl-field"><ul class="ccl-list">${CC.cards}
    </ul></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המניפה הצפופה והמספר הסופי כבר במארקאפ
  const root=document.querySelector(".ccl"),field=root.querySelector(".ccl-field"),cards=[...root.querySelectorAll(".ccl-card")];
  const num=root.querySelector(".ccl-cap b"),N=cards.length;
  const LOOSE=${JSON.stringify(CC.loose)};     // x, y וסיבוב של כל כרטיס בפיזור, לפי גיל (0 הוותיק)
  const fan=c=>{const s=getComputedStyle(c);return[parseFloat(s.getPropertyValue("--fx")),parseFloat(s.getPropertyValue("--fy")),parseFloat(s.getPropertyValue("--fr"))];};
  // בהפחתת תנועה הפונקציה לא רצה, והמניפה נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const kx=()=>Math.max(.25,Math.min(1,(field.clientWidth/2-cards[0].offsetWidth/2-14)/112));   // בטלפון הפיזור האופקי מצטמצם לרוחב הבמה
    const T0=.5,STEP=.8,MOVE=T0+STEP*(N-2)+.5;
    num.textContent="2";
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.eventCallback("onUpdate",()=>{const t=tl.time();num.textContent=t<T0?2:Math.min(N,2+Math.floor((t-T0)/STEP)+1);});   // סופר רק כרטיסים שכבר נכנסו
    cards.forEach((c,i)=>{
      const j=N-1-i,L=LOOSE[j],F=fan(c),tag=c.querySelector(".ccl-tag"),at=T0+(j-2)*STEP;
      tl.fromTo(c,{x:()=>L[0]*kx(),y:L[1],rotation:L[2]},{x:F[0],y:F[1],rotation:F[2],duration:2.6,ease:"power3.inOut"},MOVE+j*.07);
      if(j>=2){
        tl.fromTo(c,{autoAlpha:0,scale:.7},{autoAlpha:1,scale:1,duration:.5,ease:"power3.out"},at);
        tl.fromTo(tag,{autoAlpha:0,scale:.6},{autoAlpha:1,scale:1,duration:.35,ease:"power3.out"},at+.25);
        if(j<N-1)tl.to(tag,{autoAlpha:0,duration:.3,ease:"power1.in"},at+STEP+.15);
      }
    });
    tl.to({},{duration:.5});      // עצירה קצרה בסוף, עם המניפה גמורה
    return()=>{root.classList.remove("is-live");num.textContent=N;};
  });
})();`
},
{
  id:"g198", cat:"gsap", name:"קיר כרטיסים שמתעקל לגליל", tech:"GSAP · ScrollTrigger scrub · CSS 3D", status:"ממתין",
  desc:"קיר שטוח של שלושים ושניים כרטיסי וידאו אנכיים מתעקל בגלילה לגליל חצי עגול שפונה אל הגולש, עם השתקפות רכה מתחתיו. אחר כך הגליל מסתובב סביב עצמו סיבוב שלם, ובאמצע, כשהוא הכי מהיר, הפרצופים נמרחים ללהקה מטושטשת וחוזרים לחדות.",
  when:"סקשן עדויות או סרטוני לקוחות כשיש הרבה סרטונים אנכיים קצרים (בין שתים עשרה לשלושים ושניים) ורוצים שהקיר ירגיש כמו גלריה שמסתובבת סביב הגולש. מתאים גם לגלריית עבודות או לצוות גדול. פעם אחת בעמוד, ורק עם תמונות שמחזיקות גם כשהן קטנות ומוטות. במסך צר זה גריד רגיל.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה (21.10.2026) שבהם קיר של כרטיסים אנכיים מתעקל לגליל ומסתובב. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** גריד שטוח של 32 כרטיסים (שמונה בשורה, ובטלפון ארבעה). זה מה שרואים בלי GSAP, בהפחתת תנועה ובטלפון, ובטלפון הכרטיסים רק מופיעים בגלילה אחד אחרי השני (`scrub` אחד לכל הרשימה). **כשהמהלך רץ (מסך רחב)** הסקריפט מוסיף `is-live`: הכרטיסים עוברים לשתי שורות של 16, הבמה נעוצה בגובה 360vh, ולכל כרטיס נכתב `transform` בכל פריים מחישוב אחד. **הגיאומטריה:** נקודה על הקיר במרחק קשת `s` מהמרכז מקבלת זווית `α = κ·s`, מיקום `x = sin(α)/κ`, `z = (cos(α)-1)/κ` וסיבוב `rotateY(α)`, כאשר `κ = p / R` ו-`R` הוא רדיוס הגליל המלא (היקף של 16 כרטיסים עם רווח). כש-`p=0` הקיר שטוח לגמרי וכש-`p=1` הוא גליל. אותה נוסחה מסובבת את הגליל כשמוסיפים קבוע `a` לזווית. **מה יושב על מה:** `perspective`, `-webkit-box-reflect` ו-`filter` על המעטפת ולא על הרשימה, כי `filter`, `overflow` או `contain` על אלמנט עם `preserve-3d` משטחים אותו. ההשתקפות עובדת בכרום ובספארי, ובפיירפוקס פשוט אין השתקפות והכול עובד. הכרטיסים שבצד האחורי מוסתרים (`backface-visibility`), והקצוות מוצללים לפי הזווית (`--sh`, שכבה בצבע הרקע). **המריחה:** טשטוש של המעטפת עולה ויורד סביב אמצע הסיבוב, כשהמהירות הכי גבוהה בגלל `power2.inOut`. **גודל:** רוחב הכרטיס `--cw` נמדד מהכרטיס עצמו, ולכן משנים רק ב-CSS. **כיווניות:** הכרטיס הראשון ברשימה יושב בימין והסיבוב מזיז את הקיר ימינה, כמו דפדוף בעברית. הסימן נקרא מ-`direction`, כך שבאתר LTR אין מה לשנות. **התמונות:** תשע-עשרה תמונות אמיתיות של אנשים ושל ידיים בעבודה מהמאגר, עם `object-fit:cover` ו-`object-position` שמכוון לפנים בכל תמונה, כי כרטיס אנכי חותך תמונה לרוחב. הסדר `7i` מודולו 19 מבטיח ששני כרטיסים שכנים, בקיר ובגריד, גם באלכסון, אף פעם לא מציגים אותה תמונה (המחזור ארוך מכל מרחק בין שכנים). `width` ו-`height` על כל תמונה (בלי קפיצת פריסה), `loading=lazy` ו-`decoding=async`, ורקע `var(--card)` עד שהתמונה נטענת. **נגישות:** שם הלקוח הוא טקסט, ואייקון ההפעלה והתמונה (`alt` ריק, כי השם כבר כתוב) מוסתרים מקורא מסך. אם מחליפים את הכרטיסים בסרטונים אמיתיים, צריך לעצור אותם מחוץ למסך.",
  libs:["gsap","ScrollTrigger"],
  css:`.cyl{max-width:1280px;margin-inline:auto;--cw:clamp(96px,min(11vw,17svh),168px);--ch:calc(var(--cw) * 1.5)}
.cyl-pin{display:grid;gap:32px}
.cyl-head{display:grid;gap:8px;justify-items:center;text-align:center}
.cyl-head h2{margin:0;font-size:clamp(24px,2.8vw,40px);line-height:1.15;text-wrap:balance}
.cyl-head p{margin:0;color:var(--muted)}
.cyl-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:12px}
.cyl-c{position:relative;aspect-ratio:2/3;border-radius:14px;overflow:hidden;font-size:14px;background:var(--card)}
.cyl-c img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover}
.cyl-c::after{content:"";position:absolute;inset:0;background:var(--bg);opacity:var(--sh,0);pointer-events:none}
.cyl-p{position:absolute;top:8px;inset-inline-end:8px;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:color-mix(in srgb,var(--ink) 55%,transparent)}
.cyl-p svg{width:14px;height:14px;fill:var(--bg)}
.cyl-c .ph-l{position:absolute;inset-inline:8px;bottom:8px;text-align:center}
.cyl.is-live{height:360vh}
.cyl.is-live .cyl-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center;overflow:hidden}
.cyl.is-live .cyl-persp{position:relative;height:calc(var(--ch) * 2 + 32px);perspective:1500px;perspective-origin:50% 42%;
  -webkit-box-reflect:below 4px linear-gradient(transparent 74%,rgb(255 255 255 / .2))}
.cyl.is-live .cyl-list{position:absolute;inset:0;display:block;transform-style:preserve-3d}
.cyl.is-live .cyl-c{position:absolute;left:calc(50% - var(--cw) / 2);top:calc(50% - var(--ch) / 2);width:var(--cw);height:var(--ch);aspect-ratio:auto;backface-visibility:hidden;will-change:transform}
@media(max-width:767px){.cyl-list{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.cyl-c{font-size:12px}}`,
  html:`<div class="stage"><div class="cyl">
  <div class="cyl-pin">
    <header class="cyl-head"><h2>שלושים ושניים לקוחות מספרים על העבודה איתנו</h2><p>סרטונים קצרים, כל אחד על פרויקט אחר.</p></header>
    <div class="cyl-persp"><ul class="cyl-list">${CY.cards}</ul></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הגריד השטוח, וכל הכרטיסים נראים
  const root=document.querySelector(".cyl"),persp=root.querySelector(".cyl-persp"),list=root.querySelector(".cyl-list"),cards=[...list.children];
  const NC=16,GAP=12,TAU=Math.PI*2,rtl=getComputedStyle(root).direction==="rtl"?1:-1;
  const mm=gsap.matchMedia();
  // בהפחתת תנועה שתי הפונקציות לא רצות, והגריד השטוח נשאר
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)",()=>{
    root.classList.add("is-live");
    const o={p:0,a:0};
    // p: כמה הקיר מתעקל (0 שטוח, 1 גליל מלא), a: זווית הסיבוב של הגליל
    const place=()=>{
      const w=cards[0].offsetWidth,h=cards[0].offsetHeight,pitch=w+GAP,R=NC*pitch/TAU,k=o.p/R;
      cards.forEach((c,i)=>{
        const col=i%NC,row=(i/NC)|0,s=-rtl*(col-(NC-1)/2)*pitch,y=(row-.5)*(h+GAP);
        let x=s,z=0,ang=0,sh=0;
        if(k>1e-6){const al=k*s+o.a;x=Math.sin(al)/k;z=(Math.cos(al)-1)/k;ang=al*180/Math.PI;sh=o.p*(1-Math.max(.2,Math.cos(al)))*.75;}
        c.style.transform="translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,"+z.toFixed(1)+"px) rotateY("+ang.toFixed(2)+"deg)";
        c.style.setProperty("--sh",sh.toFixed(3));
      });
    };
    place();
    const ra=3.4;
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.to(o,{p:1,duration:3,ease:"power2.inOut",onUpdate:place})
      .to(o,{a:rtl*TAU,duration:6,ease:"power2.inOut",onUpdate:place},ra)
      .fromTo(persp,{filter:"blur(0px)"},{filter:"blur(7px)",duration:1.6,ease:"power2.in"},ra+1.4)   // המריחה: עולה עד אמצע הסיבוב
      .to(persp,{filter:"blur(0px)",duration:1.6,ease:"power2.out"},ra+3)
      .to({},{duration:.5});
    ScrollTrigger.addEventListener("refresh",place);
    return()=>{ScrollTrigger.removeEventListener("refresh",place);root.classList.remove("is-live");cards.forEach(c=>{c.style.transform="";c.style.removeProperty("--sh");});};
  });
  // בטלפון אין גליל: הגריד נשאר, והכרטיסים מופיעים בגלילה
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)",()=>{
    gsap.from(cards,{autoAlpha:0,y:28,duration:1,stagger:{amount:3},ease:"power2.out",scrollTrigger:{trigger:list,start:"top 88%",end:"bottom 65%",scrub:.5}});
  });
})();`
},
{
  id:"g199", cat:"gsap", name:"דמות חתוכה מול רקעים מתחלפים", tech:"GSAP · ScrollTrigger scrub · clip-path", status:"ממתין",
  desc:"דמות חתוכה עומדת במקום במרכז הבמה, והעולם שמאחוריה מתחלף בגלילה: שמיים עם שמש, פודיום עם קרני אור, נקודות של קומיקס, קווי מהירות ורדיד מבריק. כל חילוף הוא חיתוך נקי שנפתח מימין לשמאל, עם מילה גדולה חדשה שעולה מאחורי הדמות ושכבת עיטור משלה, והרשימה שלצד הבמה מדגישה את התחום הפעיל.",
  when:"סקשן שירותים או אודות שבו אדם אחד (בעל העסק, מרצה, יועץ) מייצג כמה כיוונים. הדמות היא הקבוע והרקע הוא הרעיון, וכך אפשר להראות חמישה תחומים בלי חמש תמונות. פעם אחת בעמוד, עם תמונה חתוכה באיכות טובה. לא כשהדמות אינה חלק מהמותג.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) של דמות חתוכה מסרטון שמדבר למצלמה, כשסביבה הרקע, המילה הגדולה והעיטורים מתחלפים לפי הרעיון. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** הדמות על הרקע הראשון, ורשימת חמשת התחומים בצד (הראשון מודגש). בלי GSAP ובהפחתת תנועה זה מה שרואים. **כשהמהלך רץ** הסקריפט מוסיף `is-live` (במה נעוצה בגובה 380vh) ו-timeline אחד עם `scrub`. הרקעים מוערמים והדמות (`z-index` גבוה) לא זזה בכלל. כל חילוף הוא חיתוך נקי בצורת וייפ: `clip-path:inset(0 0 0 100%)` שנפתח ל-`inset(0)` ב-`power3.inOut`, והמילה הגדולה של הרקע החדש עולה מעט ונכנסת באותו רגע. כל רקע מוסיף שכבת עיטור משלו ב-CSS בלבד (שמש, קרני פודיום, נקודות קומיקס, קווי מהירות, רדיד), והכול מצבעי הערכה (`--accent`, `--ink`, `--card`), ולכן מתלבש על כל עור. **הרשימה בצד:** מחלקה `is-on` על הפריט הפעיל, לפי זמן ה-timeline. **הדמות:** תמונה אמיתית מהמאגר (`dive/portrait.webp`) שאין לה גזרה על רקע שקוף, ולכן היא נחתכת במסכה: `mask-image` של SVG שקו המתאר שלו נמדד על התמונה (קצה מטושטש מעט, ודהייה רכה בחלק העליון, שם התמונה עצמה חתוכה). קו המדבקה הוא ארבעה `drop-shadow` בצבע `--card` על המעטפת ולא על התמונה, כי סדר העיבוד של הדפדפן הוא `filter`, אחר כך `clip`, ואז `mask`, והצל על אלמנט עם מסכה היה נחתך. התמונה בנויה ביחס 3:2 בלי חיתוך, כדי שהמסכה תיפול בדיוק על האישה. עם תמונה חתוכה אמיתית על רקע שקוף מוחקים את המסכה ומשאירים את המעטפת והצל. **מובייל:** הבמה נעוצה בראש המסך והתחומים הופכים לשבבים מתחתיה. **כיווניות:** הוייפ נפתח מימין לשמאל. באתר LTR הופכים ל-`inset(0 100% 0 0)`. **נגישות:** הרקעים, המילים והדמות הם איור (`aria-hidden`), והתחומים נשארים טקסט רגיל ברשימה.",
  libs:["gsap","ScrollTrigger"],
  css:`.bqd{max-width:1120px;margin-inline:auto}
.bqd-pin{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,64px);align-items:center;align-content:center}
.bqd-txt{display:grid;gap:18px}
.bqd-txt h2{margin:0;font-size:clamp(26px,3vw,44px);line-height:1.15;text-wrap:balance}
.bqd-txt>p{margin:0;color:var(--muted)}
.bqd-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.bqd-li{padding:14px 18px;border-radius:18px;color:var(--muted)}
.bqd-li b{display:block;font-size:clamp(19px,1.8vw,24px);font-weight:700;color:inherit}
.bqd-li span{display:block;margin-top:4px;font-size:15px;line-height:1.45}
.bqd-li.is-on{background:var(--card);color:var(--ink);box-shadow:0 14px 32px -24px color-mix(in srgb,var(--ink) 50%,transparent)}
.bqd.is-live .bqd-li{transition:color .3s cubic-bezier(.2,.6,.2,1),background-color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1)}
.bqd-stage{position:relative;aspect-ratio:4/3;border-radius:28px;overflow:hidden;isolation:isolate;container-type:inline-size;background:var(--card)}
.bqd-bg{position:absolute;inset:0;overflow:hidden}
.bqd-bg + .bqd-bg{clip-path:inset(0 0 0 100%)}
.bqd-word{position:absolute;inset-inline:0;top:3%;text-align:center;font-size:clamp(64px,24cqw,220px);font-weight:700;line-height:.95;letter-spacing:-.03em}
.bqd-b1{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 30%,var(--card)),color-mix(in srgb,var(--accent) 8%,var(--card)) 72%)}
.bqd-b1::before{content:"";position:absolute;top:30%;left:28%;width:44%;aspect-ratio:1;border-radius:50%;background:var(--accent);opacity:.9}
.bqd-b1 .bqd-word{color:var(--ink)}
.bqd-b2{background:var(--accent)}
.bqd-b2::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 50% 58%,color-mix(in srgb,var(--accent-ink) 14%,transparent) 0 8deg,transparent 8deg 20deg)}
.bqd-b2 .bqd-word{color:var(--accent-ink)}
.bqd-pod{position:absolute;inset-inline:0;bottom:0;display:flex;align-items:flex-end;justify-content:center}
.bqd-pod i{display:block;flex:0 0 28%;background:color-mix(in srgb,var(--accent-ink) 20%,var(--accent))}
.bqd-pod i:nth-child(1){height:22%}
.bqd-pod i:nth-child(2){height:34%}
.bqd-pod i:nth-child(3){height:16%}
.bqd-b3{background:var(--card)}
.bqd-b3::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,var(--ink) 1.6px,transparent 1.8px) 0 0/12px 12px;opacity:.2;
  -webkit-mask:linear-gradient(135deg,#000,transparent 72%);mask:linear-gradient(135deg,#000,transparent 72%)}
.bqd-burst{position:absolute;top:8%;inset-inline-end:6%;width:34%;fill:var(--accent)}
.bqd-b3 .bqd-word{color:var(--ink)}
.bqd-b4{background:var(--ink)}
.bqd-b4::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 3deg at 50% 52%,var(--bg) 0 1.2deg,transparent 1.2deg 4.8deg);
  -webkit-mask:radial-gradient(circle at 50% 52%,transparent 22%,#000 62%);mask:radial-gradient(circle at 50% 52%,transparent 22%,#000 62%)}
.bqd-b4 .bqd-word{color:var(--bg)}
.bqd-b5{background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 80%,var(--ink)),var(--accent) 45%,color-mix(in srgb,var(--accent) 55%,var(--card)) 75%,color-mix(in srgb,var(--accent) 85%,var(--ink)))}
.bqd-b5::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,color-mix(in srgb,var(--accent-ink) 16%,transparent) 0 14px,transparent 14px 32px)}
.bqd-b5::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 18% 26%,var(--accent-ink) 0 3px,transparent 4px),radial-gradient(circle at 84% 32%,var(--accent-ink) 0 4px,transparent 5px),radial-gradient(circle at 76% 74%,var(--accent-ink) 0 3px,transparent 4px),radial-gradient(circle at 24% 70%,var(--accent-ink) 0 2px,transparent 3px)}
.bqd-b5 .bqd-word{color:var(--accent-ink)}
.bqd-sub{position:absolute;inset-inline:0;bottom:0;z-index:2;width:76%;margin-inline:auto;
  filter:drop-shadow(3px 0 0 var(--card)) drop-shadow(-3px 0 0 var(--card)) drop-shadow(0 3px 0 var(--card)) drop-shadow(0 -3px 0 var(--card))}
.bqd-sub img{display:block;width:100%;height:auto;aspect-ratio:3/2;-webkit-mask:${CUT} center/100% 100% no-repeat;mask:${CUT} center/100% 100% no-repeat}
.bqd.is-live{height:380vh}
.bqd.is-live .bqd-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .bqd-pin{grid-template-columns:minmax(0,1fr);gap:20px}
  .bqd-stage{order:-1}
  .bqd-list{display:flex;flex-wrap:wrap;gap:8px}
  .bqd-li{padding:8px 14px;border-radius:99px}
  .bqd-li span{display:none}
  .bqd-li b{font-size:16px}
}`,
  html:`<div class="stage"><div class="bqd">
  <div class="bqd-pin">
    <div class="bqd-txt">
      <h2>ליווי שיווקי לעסק קטן, בכל התחומים</h2>
      <p>אותו אדם מלווה אתכם מהשם ועד המספרים, ובכל שלב העבודה נראית אחרת.</p>
      <ul class="bqd-list">
        <li class="bqd-li is-on"><b>מותג</b><span>שם, לוגו וצבעים שאפשר לזהות מרחוק.</span></li>
        <li class="bqd-li"><b>אתר</b><span>עמוד ברור אחד שמוביל לפנייה.</span></li>
        <li class="bqd-li"><b>תוכן</b><span>פוסטים וסרטונים שמראים איך העבודה נראית.</span></li>
        <li class="bqd-li"><b>קמפיין</b><span>מודעות שמגיעות לקהל הנכון.</span></li>
        <li class="bqd-li"><b>תוצאות</b><span>מספרים אחת לחודש, בלי מילים גדולות.</span></li>
      </ul>
    </div>
    <div class="bqd-stage" aria-hidden="true">
      <div class="bqd-bg bqd-b1"><span class="bqd-word">מותג</span></div>
      <div class="bqd-bg bqd-b2"><span class="bqd-word">אתר</span><span class="bqd-pod"><i></i><i></i><i></i></span></div>
      <div class="bqd-bg bqd-b3"><svg class="bqd-burst" viewBox="0 0 100 100"><polygon points="${BURST}"/></svg><span class="bqd-word">תוכן</span></div>
      <div class="bqd-bg bqd-b4"><span class="bqd-word">קמפיין</span></div>
      <div class="bqd-bg bqd-b5"><span class="bqd-word">תוצאות</span></div>
      <div class="bqd-sub"><img src="../assets/media/dive/portrait.webp" alt="" width="2400" height="1600" loading="lazy" decoding="async"></div>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארים הרקע הראשון והרשימה
  const root=document.querySelector(".bqd"),bgs=[...root.querySelectorAll(".bqd-bg")],lis=[...root.querySelectorAll(".bqd-li")];
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const HOLD=1.2,SWAP=.5,starts=[0];
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5}});
    tl.to({},{duration:HOLD});
    for(let i=1;i<bgs.length;i++){
      starts.push(tl.duration());
      // וייפ מימין לשמאל: הקצה השמאלי של החיתוך זז מ-100% ל-0. immediateRender:false כי ה-CSS כבר מסתיר את הרקע
      tl.fromTo(bgs[i],{clipPath:"inset(0% 0% 0% 100%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:SWAP,ease:"power3.inOut",immediateRender:false},">")
        .fromTo(bgs[i].querySelector(".bqd-word"),{yPercent:16,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:SWAP,ease:"power3.out",immediateRender:false},"<")
        .to({},{duration:HOLD});
    }
    const pick=t=>{let k=0;starts.forEach((s,i)=>{if(t>=s+SWAP*.5)k=i;});return k;};
    let cur=0;
    tl.eventCallback("onUpdate",()=>{const k=pick(tl.time());if(k!==cur){cur=k;lis.forEach((l,i)=>l.classList.toggle("is-on",i===k));}});
    return()=>{root.classList.remove("is-live");lis.forEach((l,i)=>l.classList.toggle("is-on",i===0));};
  });
})();`
},
{
  id:"g200", cat:"gsap", name:"דף ספר שמתהפך בתלת מימד", tech:"GSAP · ScrollTrigger scrub · CSS 3D", status:"ממתין",
  desc:"ספר פתוח שוכב בזווית קלה לצד כותרת, וכל גלילה מרימה דף מהערימה השמאלית ומהפכת אותו מעבר לשדרה אל הצד הימני, בתנועה מטושטשת קלה עם צל שמתחזק באמצע, ומגלה זוג עמודים חדש. ארבעה דפים מתהפכים ברצף, עד שרואים את עשרת העמודים של התפריט, כל אחד עם תמונה אמיתית, שם ומחיר.",
  when:"תפריט, קטלוג, מדריך, חוברת מחירים או סיפור שלבים שאפשר לספר כעמודים: מסעדה ובית קפה, ריהוט, מתכונים, הדרכות, תיק עבודות מודפס. מתאים כשיש בין ארבעה לעשרה עמודים אמיתיים, כל אחד עם תמונה וכמה שורות. פעם אחת בעמוד, ורק כשהצורה של ספר מסבירה את התוכן. בטלפון זה גריד של עמודים.",
  note:"**שחזור.** השראה: סרטון בגלריה (21.10.2026) של ספר פתוח בתלת מימד שדף ממנו מתהפך מעבר לשדרה ומגלה את הדפים הבאים. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** ספר פתוח על הזוג הראשון, ובו כל עשרת העמודים כבר במארקאפ. בטלפון הם הופכים לגריד של שני טורים (`display:contents` על העלים), כי ספר ברוחב 340 פיקסלים לא נקרא. **המבנה:** חמישה זוגות עמודים. עמוד התחלה בימין ועמוד סיום בשמאל נשארים במקומם, וארבעה עלים (`.bkp-leaf`) נושאים כל אחד עמוד משמאל בחזית ועמוד מימין מאחור. **כיוון הדפדוף:** בעברית קוראים מימין לשמאל, לכן הערימה שעוד לא נקראה בשמאל והעלה מתהפך משמאל לימין. כל עלה יושב בחצי השמאלי עם `transform-origin` בשדרה (קצה ימין), ו-`rotateY` מ-0 ל-180 מעביר אותו לצד השני. הפנים האחורית מסובבת מראש ב-180, ו-`backface-visibility:hidden` על שתי הפנים. **עומק הערימה:** כל עלה מוזז מעט ב-Z, והסדר מתהפך באמצע התנועה (כשהדף אנכי ולא רואים אותו) כדי שהעלים לא יחתכו זה את זה. **התלתל:** משתנה `--tw` על העלה עולה ויורד סביב אמצע התנועה, ומחזק את צל השדרה ואת טשטוש העמוד (`filter` על העמוד עצמו ולא על העלה, כי `filter` על אלמנט עם `preserve-3d` משטח אותו). **מובייל:** גריד של עמודים שמופיעים בגלילה. **כיווניות:** באתר LTR הופכים הכול: הערימה בימין, `transform-origin:0 50%`, `rotateY` ל-180 שלילי, והצללים של העמודים. **תמונות:** בכל עמוד תמונה אמיתית מהמאגר (`object-fit:cover`, `loading=lazy`, עם `width` ו-`height`), ומתחתיה שם, שורת תיאור ומחיר. התמונה יושבת בתוך העמוד, לכן הטשטוש של התלתל והצל חלים עליה יחד עם הטקסט. **נגישות:** כל עמוד הוא טקסט רגיל (התמונה עם `alt` ריק, כי השם כתוב מתחתיה), והצללים הם איור (`aria-hidden`).",
  libs:["gsap","ScrollTrigger"],
  css:`.bkp{max-width:1120px;margin-inline:auto}
.bkp-pin{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,7fr);gap:clamp(24px,4vw,64px);align-items:center;align-content:center}
.bkp-txt{display:grid;gap:14px}
.bkp-txt h2{margin:0;font-size:clamp(26px,3vw,44px);line-height:1.15;text-wrap:balance}
.bkp-txt p{margin:0;color:var(--muted)}
.bkp-persp{perspective:1800px;perspective-origin:50% 40%}
.bkp-book{position:relative;width:100%;aspect-ratio:3/2;transform-style:preserve-3d;transform:rotateX(16deg) rotateY(-5deg)}
.bkp-book::before{content:"";position:absolute;inset:6% 2% -4%;transform:translateZ(-12px);border-radius:24px;background:color-mix(in srgb,var(--ink) 34%,transparent);filter:blur(28px)}
.bkp-leaf{position:absolute;top:0;left:0;width:50%;height:100%;transform-origin:100% 50%;transform-style:preserve-3d;transform:translateZ(calc(var(--i) * -.6px))}
.bkp-f{position:absolute;inset:0;backface-visibility:hidden}
.bkp-back{transform:rotateY(180deg)}
.bkp-base{position:absolute;top:0;width:50%;height:100%;transform:translateZ(-4px)}
.bkp-base-r{left:50%}
.bkp-base-l{left:0}
.bkp-pg{position:relative;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:12px;height:100%;padding:14px;overflow:hidden;background:var(--card);color:var(--ink);filter:blur(calc(var(--tw,0) * 3px))}
.bkp-img{display:block;width:100%;height:100%;min-height:0;object-fit:cover;border-radius:10px;background:color-mix(in srgb,var(--ink) 8%,var(--card))}
.bkp-pg h3{margin:0;font-size:clamp(15px,1.5vw,19px);line-height:1.25}
.bkp-pg p{margin:4px 0 8px;font-size:clamp(13px,1.2vw,15px);line-height:1.4;color:var(--muted)}
.bkp-pg b{font-size:clamp(15px,1.4vw,18px);font-variant-numeric:tabular-nums}
.bkp-sh{position:absolute;inset:0;pointer-events:none;opacity:calc(.5 + var(--tw,0) * .4)}
.bkp-l .bkp-sh{background:linear-gradient(to left,color-mix(in srgb,var(--ink) 26%,transparent),transparent 42%)}
.bkp-r .bkp-sh{background:linear-gradient(to right,color-mix(in srgb,var(--ink) 26%,transparent),transparent 42%)}
.bkp.is-live{height:360vh}
.bkp.is-live .bkp-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
@media(max-width:767px){
  .bkp-pin{grid-template-columns:minmax(0,1fr);gap:24px}
  .bkp-persp{perspective:none}
  .bkp-book{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;aspect-ratio:auto;transform:none}
  .bkp-book::before{display:none}
  .bkp-leaf,.bkp-f,.bkp-base{display:contents}
  .bkp-pg{border-radius:16px;filter:none;height:auto}
  .bkp-img{aspect-ratio:4/3;height:auto}
  .bkp-sh{display:none}
}`,
  html:`<div class="stage"><div class="bkp">
  <div class="bkp-pin">
    <div class="bkp-txt"><h2>התפריט החדש של הבית</h2><p>עשרה פריטים נבחרים, כל אחד עם תמונה, תיאור קצר ומחיר. מדפדפים כמו בספר, מימין לשמאל.</p></div>
    <div class="bkp-persp"><div class="bkp-book">${BK.baseR}${BK.leaves}${BK.baseL}</div></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הספר פתוח על הזוג הראשון, וכל העמודים במארקאפ
  const root=document.querySelector(".bkp"),leaves=[...root.querySelectorAll(".bkp-leaf")],L=leaves.length,DZ=.6;
  const mm=gsap.matchMedia();
  // בהפחתת תנועה שתי הפונקציות לא רצות, והספר נשאר פתוח
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)",()=>{
    root.classList.add("is-live");
    const D=1.6,GAP=.5;
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    leaves.forEach((lf,i)=>{
      const t=i*(D+GAP)+.3;
      tl.fromTo(lf,{rotationY:0},{rotationY:180,duration:D,ease:"power2.inOut"},t)
        .fromTo(lf,{"--tw":0},{"--tw":1,duration:D/2,ease:"power1.in"},t)         // התלתל: צל וטשטוש עולים עד אמצע הדף
        .to(lf,{"--tw":0,duration:D/2,ease:"power1.out"},t+D/2)
        .fromTo(lf,{z:-i*DZ},{z:-(L-1-i)*DZ,duration:.01,ease:"none",immediateRender:false},t+D/2);   // הסדר בערימה מתהפך כשהדף אנכי
    });
    tl.to({},{duration:.5});
    return()=>{root.classList.remove("is-live");};
  });
  // בטלפון הגריד נשאר, והעמודים מופיעים בגלילה
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)",()=>{
    gsap.from(root.querySelectorAll(".bkp-pg"),{autoAlpha:0,y:24,duration:1,stagger:{amount:2},ease:"power2.out",scrollTrigger:{trigger:root.querySelector(".bkp-book"),start:"top 88%",end:"bottom 65%",scrub:.5}});
  });
})();`
},
{
  id:"g201", cat:"gsap", name:"טבעת תמונות שנפתחת לשדה מפוזר", tech:"GSAP · ScrollTrigger scrub · CSS calc", status:"ממתין",
  desc:`כשישים אריחי תמונה יושבים בטבעת צפופה סביב כרטיס מט עם משפט, ובגלילה הטבעת נפתחת: האריחים נודדים החוצה במעגל, כל אחד לפי הסדר שלו, ונוחתים בשדה רחב עם גודל, סיבוב ועומק מטושטש שונים. המשפט שבאמצע נבנה מילה אחר מילה בזמן הפתיחה, ובגלילה לאחור הכול חוזר לטבעת.`,
  when:"סקשן הוכחה חברתית או עבודות: לוגואים של לקוחות, תמונות מתיק העבודות, סרטונים קצרים או צוות קהילה, כשיש ארבעים עד שישים פריטים ומשפט אחד שמסכם אותם. מתאים להעביר מסר של היקף: הרבה עסקים, הרבה פרויקטים. פעם אחת בעמוד, עם תמונות שנראות טוב גם כשהן קטנות ומטושטשות.",
  note:`**שחזור.** השראה: סרטון בגלריה (21.10.2026) שבו כשישים אריחי תמונה יושבים בטבעת צפופה סביב כיתוב, והטבעת נפתחת לשדה רחב ומפוזר. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** השדה המפוזר, והמשפט שבאמצע מלא. **איך זה עובד:** לכל אריח שני מיקומים כתובים עליו כמשתני CSS: טבעת (\`--rx\`, \`--ry\`, \`--rr\`) ופיזור (\`--sx\`, \`--sy\`, \`--sr\`, \`--ss\`, \`--bl\`). משתנה אחד על השורש, \`--p\` (0 עד 1), מזיז את כולם: לכל אריח יש \`--q\` משלו שנגזר מ-\`--p\` ומהשהיה (\`--d\`), וממנו עקומה חלקה. המיקום, הסיבוב, הגודל והטשטוש הם \`calc()\`, ולכן אין לולאה בסקריפט וה-timeline רק מזיז את \`--p\`. **יחידות:** הפיזור ב-\`cqw\` ו-\`cqh\` של השדה (נמתח לפי השדה), והטבעת ב-\`cqmin\` (כדי להישאר עגולה). **הפיזור מחושב מראש** מרצף R2 (נקודות שמתפזרות בשווה בלי שורות ועמודות) ואחריו הדיפה הדדית של זוגות קרובים מדי, מחוץ לאליפסה הפנויה סביב המשפט (גרעין קבוע, לא רנדום בכל טעינה). רשת עם סטייה נראית כשורות במסך צר, ולכן לא משתמשים בה. כל אריח מקבל גודל וסיבוב משלו. **התמונות:** שמונה-עשרה תמונות אמיתיות מהמאגר (\`<img>\` עם \`width\`, \`height\`, \`loading=lazy\`, \`object-fit:cover\` ויחס 3:4), כל אחת לכל היותר ארבע פעמים, וכל עותק ממוקם הכי רחוק שאפשר מהקודמים שלו. אפשר להחליף ברשימה אחת בראש הקובץ. אריחים גדולים (קרובים) וקטנים (רחוקים) מטושטשים, וה-\`z-index\` לפי גודל. האריחים ממוינים לפי זווית, כך שכל אחד נודד למקום קרוב. **הכיתוב:** מילה אחר מילה ב-\`stagger\` בזמן שהטבעת נפתחת, על כרטיס מט (\`backdrop-filter\`). **מובייל:** אותו מהלך, והאריחים רחבים יותר יחסית לגובה, כך שהשדה נראה כערימה צפופה. **כיווניות:** אין כיוון אופקי מובנה, והמשפט נבנה לפי סדר ה-DOM (מימין לשמאל בעברית, ובאתר LTR מעצמו). **נגישות:** האריחים הם איור (\`aria-hidden\`, ו-\`alt\` ריק), והמשפט הוא כותרת רגילה.`,
  libs:["gsap","ScrollTrigger"],
  css:`.rgf{--p:1}
.rgf-field{position:relative;height:min(100svh,780px);border-radius:28px;overflow:hidden;container-type:size;background:color-mix(in srgb,var(--ink) 4%,var(--bg))}
.rgf-tiles{position:absolute;inset:0}
.rgf-t{--q:clamp(0,calc((var(--p) - var(--d)) / .7),1);--e:calc(var(--q) * var(--q) * (3 - 2 * var(--q)));--tw:max(5.6cqw,5.2cqh);
  position:absolute;left:calc(50% - var(--tw) / 2);top:calc(50% - var(--tw) * .667);display:block;width:var(--tw);height:auto;aspect-ratio:3/4;object-fit:cover;border-radius:10px;background:var(--card);
  box-shadow:0 10px 24px -14px color-mix(in srgb,var(--ink) 50%,transparent);
  transform:translate(calc(var(--rx) * 1cqmin * (1 - var(--e)) + var(--sx) * 1cqw * var(--e)),calc(var(--ry) * 1cqmin * (1 - var(--e)) + var(--sy) * 1cqh * var(--e))) rotate(calc((var(--rr) * (1 - var(--e)) + var(--sr) * var(--e)) * 1deg)) scale(calc(.9 * (1 - var(--e)) + var(--ss) * var(--e)))}
.rgf-b{filter:blur(calc(var(--bl) * var(--e) * 1px))}
.rgf-pill{position:absolute;left:50%;top:50%;z-index:40;width:max-content;max-width:max(24cqmin,152px);padding:16px 24px;border-radius:32px;transform:translate(-50%,-50%);text-align:center;
  background:color-mix(in srgb,var(--card) 58%,transparent);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
  box-shadow:0 18px 40px -24px color-mix(in srgb,var(--ink) 55%,transparent)}
.rgf-h{margin:0;font-size:clamp(20px,2.4vw,32px);line-height:1.2;font-weight:700;text-wrap:balance}
.rgf-w{display:inline-block}
.rgf.is-live{height:320vh}
.rgf.is-live .rgf-field{position:sticky;top:0;height:100vh;height:100svh}`,
  html:`<div class="stage"><div class="rgf">
  <div class="rgf-field">
    <div class="rgf-tiles" aria-hidden="true">${RG.html}</div>
    <div class="rgf-pill"><h2 class="rgf-h"><span class="rgf-w">מעל</span> <span class="rgf-w">שישים</span> <span class="rgf-w">עסקים</span> <span class="rgf-w">כבר</span> <span class="rgf-w">עובדים</span> <span class="rgf-w">איתנו</span></h2></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר השדה המפוזר והמשפט מלא
  const root=document.querySelector(".rgf"),words=[...root.querySelectorAll(".rgf-w")];
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    // --p על השורש מזיז את כל האריחים דרך calc(), לכן אין כאן לולאה על האריחים
    tl.fromTo(root,{"--p":0},{"--p":1,duration:4,ease:"power1.inOut"},.7)
      .from(words,{autoAlpha:0,y:14,duration:.5,stagger:.45,ease:"power3.out"},.2)
      .to({},{duration:.6});
    return()=>{root.classList.remove("is-live");};
  });
})();`
}
];
