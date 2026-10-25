// מהלכים של מספרים ותרשימים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל תרשים נושא נתונים שנראים אמיתיים של עסק ישראלי, ומציג אותם גם לקורא מסך (טבלה מוסתרת או תיאור כתוב).
// הסימון הסטטי (SVG שנוצר כאן מהנתונים עצמם) הוא המצב הסופי: בלי GSAP ובהפחתת תנועה רואים את התרשים השלם.

// ---------- כלים משותפים לבניית הסימון הסטטי ----------
const rng = seed => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const f1 = n => Math.round(n * 10) / 10;
const f3 = n => Math.round(n * 1000) / 1000;

// ---------- g252: עקומות האטה ----------
// ששת הקצבים. הרביעי הוא העקומה שמצוירת בגרף, והיא נפתרת מ-x ל-y בחיפוש בינארי על בזייה (0.76, 0, 0.24, 1)
const EZ = [
  t => t,
  t => t * t * t,
  t => 1 - Math.pow(1 - t, 3),
  t => { let lo = 0, hi = 1, s = .5; for (let i = 0; i < 28; i++) { s = (lo + hi) / 2; const x = 3 * (1 - s) * (1 - s) * s * .76 + 3 * (1 - s) * s * s * .24 + s * s * s; if (x < t) lo = s; else hi = s; } return 3 * (1 - s) * s * s + s * s * s; },
  t => (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10)),
  t => t >= 1 ? 1 : Math.floor(t * 6) / 6,
];
const EZ_NAMES = ["קצב אחיד", "מתחיל לאט", "נגמר לאט", "מתחיל ונגמר לאט", "זינוק ונחיתה רכה", "בקפיצות"];
const EZ_HALF = EZ.map(f => Math.round(f(.5) * 100));
const egIcon = f => { let d = ""; for (let i = 0; i <= 48; i++) { const t = i / 48; d += (i ? "L" : "M") + f1(3 + 18 * t) + " " + f1(21 - 18 * f(t)); } return d; };
const egGhosts = f => [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<i class="eg-gh" style="--p:${f3(f(k / 10))}" data-t="${k / 10}"></i>`).join("");
const egRows = EZ.map((f, i) => `    <li class="eg-tr${i === 3 ? " is-main" : ""}">
      <span class="eg-lb">${EZ_NAMES[i]}</span>
      <svg class="eg-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${egIcon(f)}"/></svg>
      <span class="eg-rail" aria-hidden="true">${egGhosts(f)}<b class="eg-dot"></b></span>
      <span class="sr-only">עד חצי מהזמן הנקודה כבר ב-${EZ_HALF[i]}% מהדרך.</span>
    </li>`).join("\n");
const eg25 = Math.round(EZ[3](.25) * 100), eg75 = Math.round(EZ[3](.75) * 100);

// ---------- g253: מפת גבהים איזומטרית ----------
// 84 עמודים (12 שעות על 7 ימים). הקרנה אורתוגרפית אחת (בלי perspective), ולכן מיקום התוויות והשיא הוא נוסחה ליניארית שמחושבת כאן פעם אחת
const HM = (() => {
  const nd = 7, nh = 12, R2 = Math.SQRT2, ph = 58 * Math.PI / 180, cph = Math.cos(ph), sph = Math.sin(ph);
  const prof = [.45, .8, 1, .9, .7, .55, .62, .7, .78, .82, .6, .35];     // פניות לפי שעה, 08:00 עד 19:00
  const dayK = [.86, .93, 1, .88, .8, .38, .22];                          // ראשון עד שבת
  const r = rng(4731), PEAK = 38, HMAX = 4.4, CUBE = .8;
  const val = dayK.map((dk, d) => prof.map((pk, h) => {
    const v = Math.round(PEAK * pk * dk * (.92 + r() * .13));
    return d === 2 && h === 2 ? PEAK : Math.max(2, Math.min(35, v));      // שיא יחיד: שלישי ב-10:00
  }));
  const xc = d => (nd - 1 - d) - (nd - 1) / 2, yc = h => h - (nh - 1) / 2;  // ראשון בקצה הקרוב לקורא
  const P = (x, y, z = 0) => ({ X: (x - y) / R2, Y: (x + y) / R2 * cph - z * sph });
  const D = (nd + nh) / R2, G = D * cph, F = D + 2.8;
  const zOf = v => v / PEAK * HMAX;
  let top = -G / 2 - .6;
  val.forEach((row, d) => row.forEach((v, h) => { top = Math.min(top, P(xc(d), yc(h), zOf(v)).Y - .5); }));
  const peakY = P(xc(2), yc(2), HMAX).Y;
  top = Math.min(top, peakY - 1.9);
  const bot = G / 2 + 1.2, Hf = bot - top;
  const px = X => f1((X + F / 2) / F * 100) + "%", py = Y => f1((Y - top) / Hf * 100) + "%";
  const days = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"], dayFull = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const hh = h => String(8 + h).padStart(2, "0") + ":00";
  let bars = "";
  for (let h = 0; h < nh; h++) for (let d = 0; d < nd; d++) {
    const v = val[d][h], peak = d === 2 && h === 2;
    bars += `<i class="hm-b${peak ? " is-peak" : ""}" style="--x:${xc(d)};--y:${yc(h)};--v:${v};--t:${peak ? 1 : f3(Math.min(v / PEAK, 1) * .72)}"><b></b></i>`;
  }
  let labs = "";
  for (let h = 0; h < nh; h += 2) { const p = P(nd / 2 + .95, yc(h)); labs += `<span class="hm-lb" style="left:${px(p.X)};top:${py(p.Y)}">${hh(h)}</span>`; }
  for (let d = 0; d < nd; d++) { const p = P(xc(d), nh / 2 + .95); labs += `<span class="hm-lb" style="left:${px(p.X)};top:${py(p.Y)}">${days[d]}</span>`; }
  const pk = P(xc(2), yc(2), HMAX);
  const table = `<table class="sr-only"><caption>מספר הפניות הממוצע לפי יום ושעה</caption><thead><tr><th></th>${Array.from({ length: nh }, (_, h) => `<th>${hh(h)}</th>`).join("")}</tr></thead><tbody>${val.map((row, d) => `<tr><th>${dayFull[d]}</th>${row.map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const total = val.flat().reduce((a, b) => a + b, 0);
  return { F: f3(F), Hf: f3(Hf), ratio: f3(F / Hf), k: f3(HMAX / PEAK / CUBE), originTop: py(0), bars, labs, table, total: total.toLocaleString("en-US"), tagLeft: px(pk.X), tagTop: py(pk.Y - .35), PEAK, nd, nh };
})();

// ---------- g254: תרשים עוגה מנקודות ----------
// 7 טבעות של נקודות סביב חור מרכזי. הנקודות ממוינות לפי הזווית (ואז לפי הטבעת), וכל קטע הוא טווח רצוף ברשימה, ולכן "מילוי לפי גלילה" הוא רק כמה נקודות הודלקו
const DG = (() => {
  const C = 200, R0 = 100, STEP = 15, RINGS = 7, PITCH = 15, DOT = 5, SWEEP = Math.PI * 2;   // להפוך לחצי עיגול: SWEEP = Math.PI והזווית ההתחלתית ל-π
  const SH = [62, 30, 8];
  const all = [];
  for (let k = 0; k < RINGS; k++) {
    const r = R0 + STEP * k, n = Math.round(SWEEP * r / PITCH);
    for (let j = 0; j < n; j++) { const t = (j + (k % 2 ? .5 : 0)) / n; const a = -Math.PI / 2 + SWEEP * t; all.push({ t, k, x: f1(C + r * Math.cos(a)), y: f1(C + r * Math.sin(a)) }); }
  }
  all.sort((p, q) => p.t - q.t || p.k - q.k);
  const N = all.length;
  const bounds = []; let cum = 0;
  SH.forEach((s, i) => { cum += s; bounds.push(i === SH.length - 1 ? N : Math.round(N * cum / 100)); });
  const segOf = i => bounds.findIndex(b => i < b);
  const circles = all.map((d, i) => `<circle class="dg-d s${segOf(i)}" cx="${d.x}" cy="${d.y}" r="${DOT}"/>`).join("");
  const starts = [0, ...bounds.slice(0, -1)], sizes = bounds.map((b, i) => b - starts[i]);
  return { N, circles, starts, sizes, SH };
})();

// ---------- g255: נרות מחירים חיים ----------
// היסטוריה של 120 נרות מהילוך אקראי עם נטייה לחזור לממוצע. המצב הסטטי (SVG) הוא 44 הנרות האחרונים, והקנבס ממשיך מאותה נקודה
const CA = (() => {
  const r = rng(475), MEAN = 3.64, f4 = n => Math.round(n * 10000) / 10000;
  const hist = []; let p = 3.628;
  for (let i = 0; i < 120; i++) {
    const o = p; let hi = o, lo = o, c = o;
    for (let k = 0; k < 8; k++) { c += (r() - .5) * .012 - (c - MEAN) * .02; hi = Math.max(hi, c); lo = Math.min(lo, c); }
    hist.push([f4(o), f4(hi), f4(lo), f4(c)]); p = c;
  }
  const N = 44, vis = hist.slice(-N), VW = 800, T = 16, B = 304;
  let lo = Math.min(...vis.map(c => c[2])), hi = Math.max(...vis.map(c => c[1]));
  const pad = (hi - lo) * .14; lo -= pad; hi += pad;
  const w = VW / N, y = v => f1(T + (hi - v) / (hi - lo) * (B - T));
  let svg = "";
  const grid = [], raw = (hi - lo) / 4, step = [.005, .01, .02, .05, .1].find(s => s >= raw) || .1;
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) { grid.push(v); svg += `<path class="ca-gl" d="M0 ${y(v)}H${VW}"/>`; }
  vis.forEach((c, j) => {
    const x = f1((j + .5) * w), up = c[3] >= c[0], yo = y(c[0]), yc = y(c[3]);
    svg += `<path class="ca-wk ${up ? "u" : "d"}" d="M${x} ${y(c[1])}V${y(c[2])}"/><rect class="ca-bd ${up ? "u" : "d"}" x="${f1(x - w * .31)}" y="${Math.min(yo, yc)}" width="${f1(w * .62)}" height="${Math.max(1, f1(Math.abs(yo - yc)))}"/>`;
  });
  const last = vis[N - 1][3], pct = (last / hist[0][0] - 1) * 100;
  const pc = Y => f1(Y / 320 * 100) + "%";
  const labels = grid.map(v => `<span class="ca-ax" style="top:${pc(y(v))}">${v.toFixed(step < .01 ? 3 : 2)}</span>`).join("");
  return { hist, MEAN, svg, labels, last: last.toFixed(3), pct: Math.abs(pct).toFixed(2), up: pct >= 0, tagTop: pc(y(last)), dotEnd: f3(100 / (2 * N)) };
})();

// ---------- g256: מניפת תרחישים ----------
// 80 תרחישים של הכנסה חודשית (הילוך אקראי לוגריתמי עם נטייה כלפי מעלה) כקווים דקים, וחמישה אחוזונים של אותו מודל כקווים מודגשים עם תווית קצה
const FN = (() => {
  const r = rng(476), N = 80, M = 12, MU = .026, SG = .074, V0 = 100, VW = 800, VH = 560, T = 28, B = 532, GAP = 12;
  const nrm = () => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
  const sims = [];
  for (let i = 0; i < N; i++) { let v = V0; const p = [v]; for (let m = 1; m <= M; m++) { v *= Math.exp(MU + SG * nrm()); p.push(v); } sims.push(p); }
  // אחוזונים בנוסחה סגורה של ההתפלגות הלוגנורמלית, ולכן הקווים המודגשים חלקים
  const Q = [1.2816, .6745, 0, -.6745, -1.2816].map(z => Array.from({ length: M + 1 }, (_, m) => V0 * Math.exp(MU * m + z * SG * Math.sqrt(m))));
  const ids = sims.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  const shown = ids.map(i => sims[i]);
  let lo = Infinity, hi = -Infinity;
  [...shown, ...Q].forEach(p => p.forEach(v => { lo = Math.min(lo, v); hi = Math.max(hi, v); }));
  const y = v => T + (hi - v) / (hi - lo) * (B - T), x = m => m / M * VW;
  // קטמול-רום להפיכת 13 נקודות חודשיות לעקומה חלקה
  const smooth = p => {
    const P = p.map((v, m) => [x(m), y(v)]);
    let d = `M${f1(P[0][0])} ${f1(P[0][1])}`;
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i - 1] || P[i], b = P[i], c = P[i + 1], e = P[i + 2] || c;
      d += `C${f1(b[0] + (c[0] - a[0]) / 6)} ${f1(b[1] + (c[1] - a[1]) / 6)} ${f1(c[0] - (e[0] - b[0]) / 6)} ${f1(c[1] - (e[1] - b[1]) / 6)} ${f1(c[0])} ${f1(c[1])}`;
    }
    return d;
  };
  const thin = shown.map(p => `<path class="fn-t" pathLength="1" d="${smooth(p)}"/>`).join("");
  const mid = Q.map((q, k) => `<path class="fn-p t${k}" pathLength="1" d="${smooth(q)}"/>`).join("");
  // מיקום התוויות בקצה, בלי חפיפה: דוחפים מטה לפי מרווח מינימלי ואז ממרכזים מחדש סביב המיקום האמיתי
  const names = ["תרחיש אופטימי", "טוב מהצפוי", "התרחיש הסביר", "חלש מהצפוי", "תרחיש זהיר"];
  const ys = Q.map(q => y(q[M]) / VH * 100), pos = ys.slice();
  for (let i = 1; i < pos.length; i++) pos[i] = Math.max(pos[i], pos[i - 1] + GAP);
  const shift = ys.reduce((s, v) => s + v, 0) / ys.length - pos.reduce((s, v) => s + v, 0) / pos.length;
  const ends = Q.map(q => Math.round(q[M]));
  const labels = Q.map((q, k) => `<span class="fn-lb t${k}" style="top:${f1(pos[k] + shift)}%"><b>${ends[k]}<em> אלף ₪</em></b><small>${names[k]}</small></span>`).join("");
  return { N, svg: thin + mid, labels, ends, base: f1(y(V0)), baseTop: f1(y(V0) / VH * 100), VW, VH };
})();

// ---------- g257: היסטוגרמה עם הדגשה שנודדת ----------
// 30 ימים של פניות (ספטמבר 2026, ה-1 הוא יום שלישי): קצב שבועי עם סופי שבוע חלשים, מגמת עלייה קלה וגבעה באמצע החודש אחרי עליית קמפיין
const HS = (() => {
  const r = rng(477), N = 30, wd = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"], base = [1, 1.05, 1.1, 1, .95, .42, .2];
  const v = [], dl = [], W = [];
  for (let d = 1; d <= N; d++) {
    const w = (2 + d - 1) % 7, trend = .85 + .3 * d / N, bump = 1 + .55 * Math.exp(-(((d - 17) / 2.6) ** 2));
    v.push(Math.max(3, Math.round(24 * base[w] * trend * bump * (.82 + .36 * r()))));
    dl.push(`יום ${wd[w]}, ${d} בספטמבר`); W.push(wd[w]);
  }
  const max = Math.max(...v), total = v.reduce((a, b) => a + b, 0);
  const bars = v.map((n, i) => `<li class="hs-b ${i === N - 1 ? "is-on" : "is-past"}" style="--v:${f3(n / (max * 1.06))}"><i></i>${(i + 1) % 5 === 0 || i === 0 ? `<small>${i + 1}</small>` : ""}</li>`).join("");
  const table = v.map((n, i) => `<tr><th scope="row">${dl[i]}</th><td>${n}</td></tr>`).join("");
  return { N, v, dl, bars, table, total, last: v[N - 1], avg: (total / N).toFixed(1), peak: max, peakDay: v.indexOf(max) + 1 };
})();

export default [
{
  id: "g252", cat: "gsap", name: "גרף עקומת האטה עם נקודה נעה", tech: "GSAP · ScrollTrigger scrub · SVG · sticky", status: "מאושר-עין",
  desc: "גרף גדול של עקומת קצב, ונקודה שרצה עליה בקצב הגלילה עם קווי עזר לשני הצירים. לידו שש שורות, ובכל אחת נקודה שעוברת אותו מרחק באותו זמן בקצב אחר: אחיד, מתחיל לאט, נגמר לאט, זינוק, קפיצות. אחרי כל עשירית מהזמן נשארת בשורה נקודה קטנה, והמרווחים ביניהן מראים איפה התנועה מהירה ואיפה איטית. לא קוראים את העקומה, מרגישים אותה.",
  when: "הסבר על קצב, בלי קשר לתחום: איך אנחנו עובדים (שלב איטי ויסודי בהתחלה, מהיר באמצע, גימור רגוע בסוף), סטודיו לאנימציה או עיצוב ממשקים שמסביר למה תנועה אחת מרגישה נכונה, קורס, או כל שירות שמתקדם בקצב לא אחיד. פעם אחת בעמוד, ורק כשהקצב הוא באמת חלק מהסיפור.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), בכל אחד גרף של עקומת האטה לצד שורות של נקודות שמתחרות בקצבים שונים. נבנה מאפס מהצפייה. **מקור אמת אחד:** ששת הקצבים הם מערך `E` של פונקציות בקוד, והוא הדבר היחיד שמזיז הכול. הגרף, הנקודות והמספרים מתעדכנים מאותו ערך התקדמות (`P`, בין 0 ל-1), ולכן הם תמיד מסונכרנים. הקצב הרביעי הוא עקומת בזייה (0.76, 0, 0.24, 1), הקצב החתום של הספרייה, ונפתר מ-x ל-y בחיפוש בינארי. **הערך הסופי בסימון:** כל נקודה יושבת בקצה השורה דרך `--p:1` ברירת מחדל, הנקודות הקטנות (`.eg-gh`) כולן מוצגות, והסמן בפינה העליונה של הגרף. רק כשהמהלך רץ הוא מאפס אותם ומקדם בגלילה. **בלי מדידות ב-JS:** מיקום הנקודה בשורה הוא `translate` ב-CSS מתוך `--p` וממידת השורה (`cqw`), ולכן שינוי רוחב המסך לא דורש חישוב מחדש. **הגרף:** SVG בלי טקסט (הכיתובים הם HTML), כדי שיהפוך בלי לקלקל אותיות. **RTL:** הזמן זורם מימין לשמאל, והגרף הוא SVG שמצויר משמאל לימין ומתהפך ב-`:dir(rtl)`. באתר LTR מוחקים את שורת ההיפוך, והנקודות בשורות ממשיכות מעצמן כי הכיוון נקרא מ-`:dir()`. **נגישות:** הנקודות והעקומות מוסתרות מקורא מסך. מה שנקרא הוא טקסט מוסתר: עד כמה כל קצב התקדם בחצי הזמן, ומשפט שמתאר את העקומה (בנוי מאותה פונקציה, לא כתוב ביד). **בטלפון** הגרף מוגבל בגובה כדי ששתי הכרטיסיות נכנסות יחד במסך נעוץ, והשורות עוברות לשתי שורות: כיתוב ועקומה קטנה מעל, ומסלול ברוחב מלא מתחת.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.eg{--eg-h:56svh;max-width:1200px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.eg-head{display:grid;gap:12px;max-width:54ch}
.eg-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.eg-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.eg .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.eg-pin{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(16px,2.4vw,32px);align-items:stretch}
.eg-card{margin:0;padding:clamp(16px,2.2vw,32px);border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line);display:grid;gap:16px;align-content:start}
/* גרף: SVG בלי טקסט, מצויר משמאל לימין ומתהפך ב-RTL. הכיתובים הם HTML בפינות */
.eg-fig{position:relative;width:min(100%,calc(var(--eg-h) * 400 / 340));margin-inline:auto}
.eg-lanes{align-content:center}
.eg-svg{display:block;width:100%;height:auto}
.eg-svg:dir(rtl){transform:scaleX(-1)}
.eg-ax{position:absolute;font-size:14px;color:var(--muted)}
.eg-ax-y{inset-block-start:0;inset-inline-start:0}
.eg-ax-x{inset-block-end:0;inset-inline-end:0}
.eg-g{stroke:var(--line);stroke-width:1;stroke-dasharray:2 6}
.eg-axl{stroke:var(--muted);stroke-width:1.5;opacity:.5}
.eg-ref{stroke:var(--muted);stroke-width:1.5;stroke-dasharray:5 6;opacity:.6}
.eg-curve{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round}
.eg-hd{stroke:var(--muted);stroke-width:1;opacity:.5}
.eg-hk{fill:var(--card);stroke:var(--accent);stroke-width:2}
.eg-gd{stroke:var(--accent);stroke-width:1.5;stroke-dasharray:3 4;opacity:.7}
.eg-halo{fill:var(--accent);opacity:.18}
.eg-mk{fill:var(--accent);stroke:var(--card);stroke-width:3}
.eg-cap{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:8px 16px}
.eg-cap b{display:block;font-size:clamp(18px,1.5vw,22px);line-height:1.25}
.eg-cap small{display:block;margin-top:4px;color:var(--muted);font-size:14px;line-height:1.5}
.eg-read{display:flex;gap:20px;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums}
.eg-read b{display:block;margin-top:2px;color:var(--ink);font-size:clamp(20px,1.8vw,26px);font-weight:700;line-height:1.1}
/* שורות הקצבים: לכל שורה כיתוב, עקומה קטנה ומסלול. מיקום הנקודה הוא --p בין 0 ל-1 (ברירת מחדל 1, כלומר בסוף) */
.eg-tracks{list-style:none;margin:0;padding:0;display:grid;gap:clamp(16px,3.2vw,40px);align-content:center}
.eg-tr{--c:color-mix(in oklab,var(--ink) 72%,var(--card));display:grid;grid-template-columns:minmax(0,9.5em) 28px minmax(0,1fr);align-items:center;gap:12px;font-size:16px;line-height:1.25}
.eg-tr.is-main{--c:var(--accent);font-weight:700}
.eg-ic{width:28px;height:28px;fill:none;stroke:var(--muted);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.eg-tr.is-main .eg-ic{stroke:var(--accent)}
.eg-rail{--d:28px;position:relative;height:var(--d);container-type:inline-size}
.eg-rail::before{content:"";position:absolute;inset-inline:0;top:50%;height:2px;translate:0 -50%;border-radius:2px;background:var(--line)}
.eg-rail::after{content:"";position:absolute;inset-inline-end:0;top:0;width:2px;height:100%;border-radius:2px;background:var(--line)}
.eg-dot,.eg-gh{--sx:-1;position:absolute;top:50%;inset-inline-start:0;width:var(--d);height:var(--d);translate:calc(var(--p,1) * (100cqw - var(--d)) * var(--sx)) -50%}
.eg-rail:dir(ltr) .eg-dot,.eg-rail:dir(ltr) .eg-gh{--sx:1}
.eg-dot{border-radius:50%;background:var(--c)}
.eg-gh{display:grid;place-items:center;opacity:.4}
.eg-gh::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--c)}
/* המהלך רץ: סצנה נעוצה, והנקודות הקטנות נדלקות כשהנקודה הגדולה עוברת עליהן */
.eg.is-live .eg-run{height:260vh}
.eg.is-live .eg-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center}
.eg.is-live .eg-gh{opacity:0;transition:opacity .25s linear}
.eg.is-live .eg-gh.on{opacity:.4}
@media(max-width:767px){
  .eg{--eg-h:30svh}
  .eg-pin{grid-template-columns:minmax(0,1fr);gap:12px}
  .eg-card{padding:16px;border-radius:20px;gap:12px}
  .eg-tracks{gap:10px}
  .eg-tr{grid-template-columns:28px minmax(0,1fr);row-gap:4px;column-gap:10px}
  .eg-ic{grid-column:1;grid-row:1}
  .eg-lb{grid-column:2;grid-row:1}
  .eg-rail{--d:20px;grid-column:1 / -1;grid-row:2}
  .eg-gh::after{width:6px;height:6px}
  .eg-cap{gap:4px 12px}
}
@media(prefers-reduced-motion:reduce){.eg-gh{transition:none}}`,
  html: `<div class="stage"><section class="eg">
  <header class="eg-head">
    <h2>קצב של תנועה נראה כמו עקומה</h2>
    <p>בכל השורות אותה נקודה עוברת אותו מרחק באותו זמן. רק הקצב שונה, ואת ההבדל מרגישים מיד כשהיא זזה.</p>
  </header>
  <div class="eg-run">
    <div class="eg-pin">
      <figure class="eg-card eg-graph">
        <div class="eg-fig">
          <svg class="eg-svg" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
            <path class="eg-g" d="M118 32V296M208 32V296M298 32V296M28 98H388M28 164H388M28 230H388"/>
            <path class="eg-axl" d="M28 32V296H388" fill="none"/>
            <path class="eg-ref" d="M28 296L388 32" fill="none"/>
            <path class="eg-hd" d="M28 296H301.6M388 32H114.4" fill="none"/>
            <path class="eg-curve" d="M28 296C301.6 296 114.4 32 388 32"/>
            <circle class="eg-hk" cx="301.6" cy="296" r="6"/><circle class="eg-hk" cx="114.4" cy="32" r="6"/>
            <line class="eg-gd eg-gx" x1="388" y1="32" x2="388" y2="296"/><line class="eg-gd eg-gy" x1="28" y1="32" x2="388" y2="32"/>
            <circle class="eg-halo" cx="388" cy="32" r="16"/><circle class="eg-mk" cx="388" cy="32" r="8"/>
          </svg>
          <span class="eg-ax eg-ax-y" aria-hidden="true">מרחק</span><span class="eg-ax eg-ax-x" aria-hidden="true">זמן</span>
        </div>
        <figcaption class="eg-cap">
          <span><b>מתחיל ונגמר לאט</b><small>הקו המקווקו הוא קצב אחיד. באמצע התנועה הנקודה מהירה ביותר.</small></span>
          <span class="eg-read" aria-hidden="true"><span>זמן<b data-t>100%</b></span><span>מרחק<b data-d>100%</b></span></span>
          <span class="sr-only">אחרי רבע מהזמן הנקודה עברה ${eg25}% מהמרחק, אחרי חצי מהזמן 50%, ואחרי שלושה רבעים ${eg75}%.</span>
        </figcaption>
      </figure>
      <div class="eg-card eg-lanes">
        <ul class="eg-tracks" aria-label="שישה קצבים לאותה תנועה">
${egRows}
        </ul>
      </div>
    </div>
  </div>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP כל הנקודות בסוף והגרף שלם (בסימון)
  const root=document.querySelector(".eg"),run=root.querySelector(".eg-run");
  const mk=root.querySelector(".eg-mk"),halo=root.querySelector(".eg-halo"),gx=root.querySelector(".eg-gx"),gy=root.querySelector(".eg-gy");
  const rt=root.querySelector("[data-t]"),rd=root.querySelector("[data-d]");
  const rows=[...root.querySelectorAll(".eg-tr")].map(r=>({dot:r.querySelector(".eg-dot"),gh:[...r.querySelectorAll(".eg-gh")].map(g=>({el:g,t:Number(g.dataset.t)}))}));
  // ששת הקצבים: מקור האמת היחיד. הרביעי הוא העקומה שבגרף
  const E=[${EZ.map(String).join(",")}];
  const L=28,R=388,T=32,B=296;      // אזור הציור בתוך ה-viewBox של ה-SVG
  const draw=P=>{
    const d=E[3](P),x=L+(R-L)*P,y=B-(B-T)*d;
    mk.setAttribute("cx",x);mk.setAttribute("cy",y);halo.setAttribute("cx",x);halo.setAttribute("cy",y);
    gx.setAttribute("x1",x);gx.setAttribute("x2",x);gx.setAttribute("y1",y);
    gy.setAttribute("x2",x);gy.setAttribute("y1",y);gy.setAttribute("y2",y);
    rt.textContent=Math.round(P*100)+"%";rd.textContent=Math.round(d*100)+"%";
    rows.forEach((r,i)=>{r.dot.style.setProperty("--p",E[i](P).toFixed(4));r.gh.forEach(g=>g.el.classList.toggle("on",P>=g.t-.001));});
  };
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את המצב הסופי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const st={p:0};
    draw(0);
    // עצירה קצרה בהתחלה ובסוף, כדי שמרגישים את נקודת היציאה ואת ההגעה
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.to({},{duration:.1}).to(st,{p:1,duration:1,ease:"none",onUpdate:()=>draw(st.p)}).to({},{duration:.1});
    return()=>{
      root.classList.remove("is-live");
      mk.setAttribute("cx",R);mk.setAttribute("cy",T);halo.setAttribute("cx",R);halo.setAttribute("cy",T);
      gx.setAttribute("x1",R);gx.setAttribute("x2",R);gx.setAttribute("y1",T);
      gy.setAttribute("x2",R);gy.setAttribute("y1",T);gy.setAttribute("y2",T);
      rt.textContent="100%";rd.textContent="100%";
      rows.forEach(r=>{r.dot.style.removeProperty("--p");r.gh.forEach(g=>g.el.classList.remove("on"));});
    };
  });
})();`
},
{
  id: "g253", cat: "gsap", name: "רשת אריחים שמתרוממת למפת גבהים", tech: "GSAP · ScrollTrigger scrub · CSS 3D · sticky", status: "מאושר-עין",
  desc: "רשת שטוחה של אריחים, כל אריח שעה ביום מסוים, שמתרוממת בגלילה למפת גבהים בהקרנה אלכסונית. העמודים עולים מהמרכז החוצה, הגובה והצבע מראים כמה פניות נכנסו, ובסוף השיא נדלק בצבע המותג עם תווית, והמספר הגדול סופר עד הערך שלו. רואים בדיוק איפה העומס ואיפה השקט, בלי לקרוא טבלה.",
  when: "פילוח של ביקוש לפי שני ממדים: שעה ויום במוקד שירות, חדר טיפולים, מסעדה או חנות. מתאים גם למחיר לפי עונה ושעה, או לכמות פרויקטים לפי שנה וסוג. כשיש שלושה ערכים בלבד עמודות רגילות עדיפות. פעם אחת בעמוד, וכשהשיא הוא ההחלטה העסקית.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), רשת שטוחה של אריחים שמתרוממת למפת גבהים אלכסונית עם שיא מודגש אחד. נבנה מאפס מהצפייה. **המבנה:** שמונים וארבעה עמודים, כל עמוד קובייה אחת ב-CSS 3D שנמתחת בציר Z (`scale3d(1,1,…)`), ולכן הגובה הוא טרנספורם בלבד וללא חישוב פריסה. שלוש פאות (עליונה, קדמית, צדדית) מצוירות מ-`b` ומשני pseudo-elements, וכל פאה מקבלת גוון מצבע העמוד (`--t`). **הקרנה:** `rotateX(58deg) rotateZ(45deg)` על עולם בלי perspective, כלומר הקרנה אורתוגרפית. לכן מיקום כל תווית ושל תווית השיא הוא נוסחה ליניארית שמחושבת פעם אחת בבנייה ומוצבת באחוזים, והטקסט נשאר ישר. **הנעה:** GSAP מזיז משתנה אחד, `--g` (בין 0 ל-1), עם `stagger` על הרשת מהמרכז החוצה (`grid:[12,7], from:\"center\"`), ב-scrub בתוך סצנה נעוצה בגובה 240vh. **ערך סופי בסימון:** `--g` ברירת המחדל היא 1, ולכן בלי GSAP ובהפחתת תנועה רואים את המפה הגבוהה, את התווית ואת המספר. **נגישות:** המפה כולה `aria-hidden`, והנתונים מגיעים בטבלה מוסתרת (`sr-only`) עם כל 84 הערכים. למספר הגדול, שנספר, יש טקסט מוסתר קבוע. **RTL:** השעות והימים מתקדמים מימין לשמאל בתוך ההקרנה (ראשון ו-08:00 בצד הימני), והטקסטים ב-HTML. באתר LTR הופכים את סדר הימים בנתונים, והלגנדה עוברת מ-`to left` ל-`to right`. **בטלפון** אותה מפה: הטקסט מעליה, המספר לצד הכיתוב, והמפה מוגבלת בגובה כדי שהכול נכנס במסך נעוץ.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.hm{max-width:1200px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.hm .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hm-pin{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(16px,3vw,40px);align-items:center}
.hm-copy{display:grid;gap:20px;align-content:center}
.hm-copy h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.hm-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hm-stat{display:grid;gap:8px}
.hm-big{display:block;font-size:clamp(72px,9vw,128px);font-weight:700;line-height:.95;letter-spacing:-.02em;color:var(--accent);font-variant-numeric:tabular-nums}
.hm-cap b{display:block;font-size:clamp(18px,1.5vw,22px);line-height:1.25}
.hm-cap small{display:block;margin-top:4px;color:var(--muted);font-size:14px;line-height:1.5}
.hm-leg{display:flex;align-items:center;gap:12px;color:var(--muted);font-size:14px;font-variant-numeric:tabular-nums}
.hm-leg i{flex:0 0 clamp(96px,12vw,160px);height:10px;border-radius:10px;background:linear-gradient(to left,var(--card),var(--accent));box-shadow:0 0 0 1px var(--line)}
.hm-leg i:dir(ltr){background:linear-gradient(to right,var(--card),var(--accent))}
.hm-card{margin:0;padding:clamp(8px,1.6vw,24px);border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
/* המסגרת היא ה-container: כל המידות בתוך המפה נגזרות מרוחבה (cqw), ולכן המפה פשוט גדלה וקטנה */
.hm-frame{--k:${HM.k};position:relative;container-type:inline-size;width:min(100%,calc(64svh * ${HM.ratio}));margin-inline:auto;aspect-ratio:${HM.F} / ${HM.Hf}}
.hm-world{--p:calc(100cqw / ${HM.F});--c:calc(var(--p) * .8);position:absolute;left:50%;top:${HM.originTop};width:0;height:0;transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(45deg);pointer-events:none}
.hm-base{position:absolute;left:calc(var(--p) * -3.85);top:calc(var(--p) * -6.35);width:calc(var(--p) * 7.7);height:calc(var(--p) * 12.7);border-radius:calc(var(--p) * .3);background:color-mix(in oklab,var(--line) 40%,var(--card));box-shadow:0 0 0 1px var(--line);transform:translateZ(-2px)}
/* עמוד: קובייה c על c על c שנמתחת ב-Z לפי הערך (--v) ולפי ההתקדמות (--g, ברירת מחדל 1 = גובה מלא) */
.hm-b{--tone:color-mix(in oklab,var(--accent) calc(var(--t) * 100%),var(--card));position:absolute;left:calc(var(--x) * var(--p) - var(--c) / 2);top:calc(var(--y) * var(--p) - var(--c) / 2);width:var(--c);height:var(--c);transform-style:preserve-3d;transform:scale3d(1,1,max(.001,calc(var(--v) * var(--k) * var(--g,1))))}
.hm-b b{position:absolute;inset:0;background:var(--tone);box-shadow:inset 0 0 0 1px color-mix(in oklab,var(--ink) 12%,transparent);transform:translateZ(var(--c))}
.hm-b::before{content:"";position:absolute;left:0;top:100%;width:100%;height:var(--c);background:color-mix(in oklab,var(--tone) 80%,var(--ink));transform-origin:50% 0;transform:rotateX(90deg)}
.hm-b::after{content:"";position:absolute;left:100%;top:0;width:var(--c);height:100%;background:color-mix(in oklab,var(--tone) 62%,var(--ink));transform-origin:0 50%;transform:rotateY(-90deg)}
.hm-lb{position:absolute;translate:-50% -50%;font-size:clamp(12px,1.2vw,14px);color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}
.hm-tag{position:absolute;left:${HM.tagLeft};top:${HM.tagTop};translate:-50% -100%;padding:6px 12px;border-radius:12px;background:var(--accent);color:var(--accent-ink);font-size:clamp(12px,1.2vw,15px);font-weight:700;white-space:nowrap}
.hm-tag::after{content:"";position:absolute;left:50%;top:100%;translate:-50% 0;border:6px solid transparent;border-top-color:var(--accent)}
/* המהלך רץ: סצנה נעוצה עם מסלול גלילה */
.hm.is-live .hm-run{height:240vh}
.hm.is-live .hm-pin{position:sticky;top:0;height:100vh;height:100svh}
/* מצב ההתחלה של המהלך יושב ב-CSS ולא ב-JS, כדי ש-ScrollTrigger יוכל לאפס ולמדוד בלי לאבד אותו */
.hm.is-live .hm-b{--g:0}
.hm.is-live .hm-lb,.hm.is-live .hm-tag{opacity:0}
@media(max-width:767px){
  .hm-pin{grid-template-columns:minmax(0,1fr);gap:12px;align-content:center}
  .hm-copy{gap:12px}
  .hm-copy p{font-size:15px;line-height:1.5}
  .hm-stat{grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4px 16px}
  .hm-big{font-size:64px}
  .hm-card{padding:8px;border-radius:20px}
  .hm-frame{width:min(100%,calc(36svh * ${HM.ratio}))}
}`,
  html: `<div class="stage"><section class="hm">
  <div class="hm-run">
    <div class="hm-pin">
      <div class="hm-copy">
        <h2>מתי הטלפון מצלצל במוקד</h2>
        <p>מספר הפניות שנכנסות למוקד השירות בכל שעה, בממוצע של שמונה שבועות. בשבוע רגיל מגיעות בערך ${HM.total} פניות בין שמונה בבוקר לשמונה בערב.</p>
        <div class="hm-stat">
          <span class="hm-big" aria-hidden="true" data-to="${HM.PEAK}">${HM.PEAK}</span>
          <span class="hm-cap"><b>פניות בשעת השיא</b><small>ימי שלישי, בין 10:00 ל-11:00</small><span class="sr-only">${HM.PEAK} פניות בשעת השיא, בימי שלישי בין עשר לאחת עשרה.</span></span>
        </div>
        <div class="hm-leg" aria-hidden="true"><span>0</span><i></i><span>${HM.PEAK}</span></div>
      </div>
      <figure class="hm-card">
        <div class="hm-frame">
          <div class="hm-world" aria-hidden="true"><div class="hm-base"></div>${HM.bars}</div>
          ${HM.labs.replace(/class="hm-lb"/g, 'class="hm-lb" aria-hidden="true"')}
          <span class="hm-tag" aria-hidden="true">שיא: ${HM.PEAK} פניות</span>
        </div>
        ${HM.table}
      </figure>
    </div>
  </div>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP המפה גבוהה במלואה (בסימון)
  const root=document.querySelector(".hm"),run=root.querySelector(".hm-run");
  const bars=[...root.querySelectorAll(".hm-b")],labs=[...root.querySelectorAll(".hm-lb")],tag=root.querySelector(".hm-tag");
  const nums=[...root.querySelectorAll("[data-to]")].map(el=>({el,to:Number(el.dataset.to),o:{v:0}}));
  const fmt=n=>Math.round(n).toLocaleString("he-IL");
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את המצב הסופי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    nums.forEach(n=>{n.el.textContent="0";});
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // הרשת השטוחה מופיעה, ואז העמודים עולים מהמרכז החוצה (12 שעות על 7 ימים), והמספר סופר לאורך כל העלייה
    tl.to(labs,{opacity:1,duration:.2,stagger:.015},0)
      .to(bars,{"--g":1,duration:.9,ease:"power2.out",stagger:{grid:[12,7],from:"center",amount:.9}},.15);
    nums.forEach(n=>{
      tl.to(n.o,{v:n.to,duration:1.8,ease:"power1.inOut",onUpdate:()=>{n.el.textContent=fmt(n.o.v);}},.15);
    });
    tl.fromTo(tag,{y:10,opacity:0},{y:0,opacity:1,duration:.3,ease:"power2.out"},">-.1")
      .to({},{duration:.35});
    return()=>{
      root.classList.remove("is-live");
      bars.forEach(b=>b.style.removeProperty("--g"));
      gsap.set([...labs,tag],{clearProps:"opacity,transform"});
      nums.forEach(n=>{n.el.textContent=fmt(n.to);});
    };
  });
})();`
},
{
  id: "g254", cat: "gsap", name: "תרשים עוגה מנקודות", tech: "GSAP · ScrollTrigger scrub · SVG · sticky", status: "מאושר-עין",
  desc: "תרשים עוגה שבנוי ממאות נקודות קטנות על שבע טבעות, שמתמלא בגלילה בסיבוב אחד סביב המרכז. כל נקודה היא פנייה אחת, הצבע מתחלף בכל מעבר לקטע הבא, והאחוז שבמרכז ובמקרא סופרים יחד איתו. אפשר פשוט לספור נקודות ולהבין את החלוקה, בלי לקרוא מספר.",
  when: "חלוקה של סך אחד לשניים עד ארבעה חלקים: מאיפה מגיעים לקוחות, פרויקטים לפי סוג, הרכב הצוות, תוצאות סקר. כשיש יותר מארבעה חלקים או הבדלים קטנים ביניהם עמודות קריאות יותר. עם אותו קוד אפשר לעבור לחצי עיגול כשיש הרבה יחידות קטנות, כמו מושבים או מקומות. פעם אחת בעמוד.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), עוגה שבנויה מנקודות לאורך טבעת עם אחוז במרכז ומקרא לצדה, וחצי עיגול של נקודות שמתמלאות בצבעי הקטעים. נבנה מאפס מהצפייה. **המבנה:** כל נקודה היא `circle` ב-SVG אחד, על שבע טבעות סביב חור מרכזי, והמרווח בין הנקודות קבוע (מספר הנקודות בטבעת הוא היקף חלקי מרווח). הנקודות נוצרות פעם אחת בבנייה וממוינות לפי הזווית ואז לפי הטבעת, ולכן כל קטע הוא טווח רצוף ברשימה, והמילוי נראה כמו מגב שמסתובב סביב המרכז. **הנעה:** GSAP מזיז ערך אחד (`p`, בין 0 ל-1) בתוך scrub על סצנה נעוצה בגובה 240vh. בכל עדכון מדליקים את `p × מספר הנקודות` הראשונות (class `on`), וצבע הנקודה עובר בטרנזיציית `fill` קצרה. אין טווין לכל נקודה, ולכן גם ארבע מאות נקודות נשארות חלקות. **ערך סופי בסימון:** בלי JS, וגם בהפחתת תנועה, כל נקודה צבועה בצבע הקטע שלה והאחוזים כתובים; רק כשהמהלך רץ ה-class `is-live` מאפס את הצבעים לאפור ומתחיל למלא. **נגישות:** ה-SVG `aria-hidden`; האחוזים המונפשים `aria-hidden` ולצדם משפט מוסתר קבוע; ויש משפט סיכום אחד מוסתר לכל התרשים. **RTL:** ה-SVG נבנה בכיוון השעון ומתהפך ב-`:dir(rtl)`, כך שבעברית המילוי יוצא מלמעלה כנגד כיוון השעון, ומספרים נשארים מחוץ ל-SVG. באתר LTR מוחקים את שורת ההיפוך. **חצי עיגול (פרלמנט):** משנים את `SWEEP` ל-`Math.PI`, מתחילים מהקצה השמאלי, ומורידים את המספר שבמרכז לתחתית החצי. הלוגיקה של הגלילה לא משתנה. **בטלפון** הטקסט מעל, העוגה במרכז והמקרא מתחתיה, והכול נכנס במסך נעוץ אחד.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.dg{max-width:1200px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.dg .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.dg-pin{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);grid-template-areas:"head ring" "legend ring";gap:clamp(20px,3vw,32px) clamp(24px,5vw,64px);align-items:center}
.dg-head{grid-area:head;align-self:end;display:grid;gap:16px}
.dg-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.dg-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.dg-legend{grid-area:legend;align-self:start;list-style:none;margin:0;padding:0;display:grid;gap:16px}
.dg-row{display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:16px;font-size:clamp(16px,1.4vw,20px);line-height:1.3}
.dg-sw{width:20px;height:20px;border-radius:50%;background:var(--c)}
.dg-pc{min-width:2.4em;text-align:end;font-size:clamp(28px,3vw,44px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.dg-ring{grid-area:ring;position:relative;width:min(100%,70svh);justify-self:center;aspect-ratio:1;container-type:inline-size}
.dg-svg{display:block;width:100%;height:100%}
.dg-svg:dir(rtl){transform:scaleX(-1)}
.s0{--c:var(--accent)}
.s1{--c:color-mix(in oklab,var(--accent) 45%,var(--card))}
.s2{--c:color-mix(in oklab,var(--ink) 55%,var(--card))}
.dg-d{fill:var(--c);transition:fill .3s linear}
.dg-mid{position:absolute;inset:0;display:grid;place-content:center;gap:8px;text-align:center}
.dg-mid b{display:block;font-size:17cqw;line-height:1;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.dg-mid small{display:block;color:var(--muted);font-size:clamp(14px,3.4cqw,18px);line-height:1.3}
/* המהלך רץ: סצנה נעוצה, הנקודות מתחילות אפורות ומתמלאות לפי הגלילה */
.dg.is-live .dg-run{height:240vh}
.dg.is-live .dg-pin{position:sticky;top:0;height:100vh;height:100svh}
.dg.is-live .dg-d{fill:var(--line)}
.dg.is-live .dg-d.on{fill:var(--c)}
.dg.is-live .dg-row{opacity:.4;transition:opacity .3s linear}
.dg.is-live .dg-row.is-on{opacity:1}
@media(max-width:767px){
  .dg-pin{grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "ring" "legend";gap:12px;align-content:center}
  .dg-head{align-self:auto;gap:8px}
  .dg-head p{font-size:15px;line-height:1.5}
  .dg-ring{width:min(100%,42svh)}
  .dg-legend{gap:8px}
  .dg-row{gap:12px;font-size:16px}
  .dg-pc{font-size:28px}
}
@media(prefers-reduced-motion:reduce){.dg-d,.dg-row{transition:none}}`,
  html: `<div class="stage"><section class="dg">
  <div class="dg-run">
    <div class="dg-pin">
      <div class="dg-head">
        <h2>מאיפה מגיעים הלקוחות החדשים</h2>
        <p>כל נקודה היא פנייה אחת מתוך ${DG.N} הפניות של השנה האחרונה, לפי מה שהלקוח סיפר לנו כששאלנו איך הגיע.</p>
      </div>
      <ul class="dg-legend">
        <li class="dg-row s0" data-a="${DG.starts[0]}" data-n="${DG.sizes[0]}"><span class="dg-sw" aria-hidden="true"></span><span>המלצות של לקוחות קודמים</span><b class="dg-pc" aria-hidden="true" data-to="${DG.SH[0]}">${DG.SH[0]}%</b><span class="sr-only">${DG.SH[0]} אחוז</span></li>
        <li class="dg-row s1" data-a="${DG.starts[1]}" data-n="${DG.sizes[1]}"><span class="dg-sw" aria-hidden="true"></span><span>חיפוש בגוגל</span><b class="dg-pc" aria-hidden="true" data-to="${DG.SH[1]}">${DG.SH[1]}%</b><span class="sr-only">${DG.SH[1]} אחוז</span></li>
        <li class="dg-row s2" data-a="${DG.starts[2]}" data-n="${DG.sizes[2]}"><span class="dg-sw" aria-hidden="true"></span><span>מודעות ורשתות חברתיות</span><b class="dg-pc" aria-hidden="true" data-to="${DG.SH[2]}">${DG.SH[2]}%</b><span class="sr-only">${DG.SH[2]} אחוז</span></li>
      </ul>
      <div class="dg-ring">
        <svg class="dg-svg" viewBox="0 0 400 400" aria-hidden="true" focusable="false">${DG.circles}</svg>
        <div class="dg-mid"><b aria-hidden="true" data-to="${DG.SH[0]}">${DG.SH[0]}%</b><small>מגיעים בהמלצה</small></div>
        <p class="sr-only">מתוך ${DG.N} פניות: ${DG.SH[0]} אחוז בהמלצה של לקוחות קודמים, ${DG.SH[1]} אחוז בחיפוש בגוגל ו-${DG.SH[2]} אחוז במודעות וברשתות חברתיות.</p>
      </div>
    </div>
  </div>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP כל הנקודות צבועות והאחוזים כתובים (בסימון)
  const root=document.querySelector(".dg"),run=root.querySelector(".dg-run");
  const dots=[...root.querySelectorAll(".dg-d")],N=dots.length;
  const rows=[...root.querySelectorAll(".dg-row")].map(el=>{const num=el.querySelector("[data-to]");return{el,num,to:Number(num.dataset.to),a:Number(el.dataset.a),n:Number(el.dataset.n)};});
  const mid=root.querySelector(".dg-mid [data-to]"),midTo=Number(mid.dataset.to);
  let shown=N;
  // הנקודות כבר ממוינות לפי הזווית, ולכן "כמה נקודות דולקות" קובע גם את הקטע הפעיל וגם את האחוזים
  const render=P=>{
    const n=Math.round(P*N);
    if(n>shown)for(let i=shown;i<n;i++)dots[i].classList.add("on");
    else for(let i=n;i<shown;i++)dots[i].classList.remove("on");
    shown=n;
    rows.forEach(r=>{
      const f=Math.min(1,Math.max(0,(n-r.a)/r.n));
      r.num.textContent=Math.round(f*r.to)+"%";
      r.el.classList.toggle("is-on",f>0);
    });
    const f0=Math.min(1,n/rows[0].n);
    mid.textContent=Math.round(f0*midTo)+"%";
  };
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את המצב הסופי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    shown=0;
    const st={p:0};
    render(0);
    gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}})
      .to({},{duration:.08})
      .to(st,{p:1,duration:1,ease:"none",onUpdate:()=>render(st.p)})
      .to({},{duration:.15});
    return()=>{
      root.classList.remove("is-live");
      dots.forEach(d=>d.classList.remove("on"));
      rows.forEach(r=>{r.num.textContent=r.to+"%";r.el.classList.remove("is-on");});
      mid.textContent=midTo+"%";
      shown=N;
    };
  });
})();`
},
{
  id: "g255", cat: "gsap", name: "נרות מחירים שזורמים בזמן אמת", tech: "GSAP ticker · Canvas 2D · ScrollTrigger", status: "מאושר-עין",
  desc: "גרף נרות של שער הדולר שנבנה על קנבס וזז בזמן אמת: נר חדש נוסף כל כמה שניות מצד אחד, הנר האחרון מתנדנד עם כל עדכון, ונקודה זוהרת עם תווית מחיר יושבת על השער הנוכחי. כשהגרף נכנס למסך הוא מתקרב מתצוגה רחבה לחלון של כמה עשרות נרות, והמספר הגדול שמעליו מתעדכן יחד איתו. מחוץ למסך הכול עוצר.",
  when: "אתר עם נתון חי שאפשר להראות: שערי מטבע, מחיר חומרי גלם, מלאי שמתרוקן או ביקוש בזמן אמת. מתאים לבית השקעות, למתווך מט\"ח, ליצואן או לכל עסק שהמחיר שלו זז. כשהנתון לא אמיתי חייבים לסמן אותו כנתוני הדגמה. פעם אחת בעמוד.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), גרף נרות שמתקרב ונר חדש שנוסף כל פעם, עם נקודה זוהרת על המחיר האחרון ומספר גדול שמתעדכן. נבנה מאפס מהצפייה. **המבנה:** היסטוריה של 120 נרות נוצרת בבנייה מהילוך אקראי עם נטייה לחזור לממוצע (8 צעדים בנר). המצב הסטטי הוא SVG של 44 הנרות האחרונים, עם תוויות מחיר ותווית על השער, כך שבלי JS וגם בהפחתת תנועה רואים גרף שלם. **החי:** כשהמהלך רץ נוסף קנבס שמצייר את אותה היסטוריה. צעד מחיר כל 110 אלפיות שנייה משנה רק את הנר האחרון (סגירה, גבוה, נמוך), ואחרי 8 צעדים נפתח נר חדש שמחליק פנימה. טווח המחירים בציר Y מתקרב לטווח הנרות הנראים באינטרפולציה (`1 - exp(-dt / 200)`) ולכן אין קפיצות. **כניסה:** בפעם הראשונה שהגרף נכנס למסך GSAP מזיז את מספר הנרות הנראים מ-110 ל-44 (30 בטלפון) ב-`power3.inOut`. **ביצועים:** הקנבס מתאים ל-DPR, הלולאה היא `gsap.ticker` שנוספת ונגרעת לפי `ScrollTrigger` (נראה בחלון) ו-`visibilitychange`, ולכן מחוץ למסך אין ציור בכלל. הצבעים נלקחים מהטוקנים בזמן ריצה דרך אלמנט בדיקה וקנבס של פיקסל אחד, ונקראים מחדש בכל שינוי גודל. **נגישות:** הקנבס `aria-hidden`; המספר הגדול `aria-hidden`; ויש משפט מוסתר עם השער ואחוז השינוי. יש תווית נראית \"נתוני הדגמה\". **RTL:** הנר החדש נכנס מהצד השמאלי (הזמן זורם מימין לשמאל), ציר המחיר בצד הימני והתווית בצד השמאלי. הכיוון נקרא מ-`direction` של העמוד, ובאתר LTR הכול מתהפך מעצמו: הנר החדש מימין, הציר משמאל. **בטלפון** הגרף מציג 30 נרות, התוויות קטנות והגובה יורד.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.ca{--dn:color-mix(in oklab,var(--ink) 55%,var(--card));max-width:1120px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.ca .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ca-head{display:grid;gap:12px;max-width:54ch}
.ca-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.ca-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ca-card{margin:0;padding:clamp(16px,2.4vw,32px);border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line);display:grid;gap:clamp(16px,2.4vw,32px)}
.ca-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px}
.ca-name{display:grid;gap:4px}
.ca-name b{font-size:clamp(18px,1.6vw,22px);line-height:1.25}
.ca-name small{color:var(--muted);font-size:14px;line-height:1.4}
.ca-quote{display:flex;align-items:baseline;gap:12px;font-variant-numeric:tabular-nums}
.ca-big{font-size:clamp(48px,6.4vw,88px);font-weight:700;line-height:1;letter-spacing:-.02em}
.ca-cur{font-size:clamp(20px,2.4vw,32px);color:var(--muted);font-weight:600}
.ca-chg{align-self:center;padding:6px 12px;border-radius:999px;font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;background:color-mix(in oklab,var(--accent) 14%,var(--card));color:var(--accent)}
.ca-chg.is-dn{background:color-mix(in oklab,var(--ink) 10%,var(--card));color:var(--ink)}
/* אזור הגרף: ריפוד פיזי לציר המחיר (בצד ההתחלה) ולתווית (בצד הסוף), והקנבס החי יושב על כל התיבה */
.ca-chart{position:relative;height:clamp(240px,46svh,460px);padding-inline:40px 72px}
.ca-plot{position:relative;height:100%}
.ca-svg{display:block;width:100%;height:100%}
.ca-svg:dir(rtl){transform:scaleX(-1)}
.ca-gl{fill:none;stroke:var(--line);stroke-width:1;stroke-dasharray:2 6;vector-effect:non-scaling-stroke}
.ca-wk{fill:none;stroke-width:1.5;vector-effect:non-scaling-stroke}
.ca-wk.u{stroke:var(--accent)}
.ca-wk.d{stroke:var(--dn)}
.ca-bd.u{fill:var(--accent)}
.ca-bd.d{fill:var(--dn)}
.ca-dot{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 2px var(--card),0 0 0 7px color-mix(in oklab,var(--accent) 22%,transparent)}
.ca-ov{position:absolute;inset:0}
.ca-ax{position:absolute;inset-inline-start:0;translate:0 -50%;font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}
.ca-tag{position:absolute;inset-inline-end:0;translate:0 -50%;padding:6px 8px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:700;font-variant-numeric:tabular-nums}
.ca-cv{position:absolute;inset:0;width:100%;height:100%}
/* המהלך רץ: הקנבס מחליף את ה-SVG הסטטי */
.ca.is-live .ca-plot,.ca.is-live .ca-ov{display:none}
@media(max-width:767px){
  .ca-chart{height:clamp(220px,40svh,320px);padding-inline:32px 64px}
  .ca-tag{font-size:12px}
}`,
  html: `<div class="stage"><section class="ca">
  <header class="ca-head">
    <h2>השער מתעדכן מול העיניים</h2>
    <p>לוח השערים שלנו מתעדכן בכל שנייה בשעות הפעילות, כך שמי שמעביר כסף רואה את השער שיקבל ממש עכשיו. הנתונים בדוגמה הזאת הם נתוני הדגמה בלבד.</p>
  </header>
  <figure class="ca-card">
    <div class="ca-top">
      <div class="ca-name"><b>דולר ארה״ב לשקל</b><small>נתוני הדגמה, כל נר הוא דקה</small></div>
      <div class="ca-quote"><span class="ca-big" aria-hidden="true" data-px>${CA.last}</span><span class="ca-cur" aria-hidden="true">₪</span><span class="ca-chg${CA.up ? "" : " is-dn"}" dir="ltr" aria-hidden="true" data-chg>${CA.up ? "+" : "-"}${CA.pct}%</span></div>
    </div>
    <div class="ca-chart">
      <div class="ca-plot">
        <svg class="ca-svg" viewBox="0 0 800 320" preserveAspectRatio="none" aria-hidden="true" focusable="false">${CA.svg}</svg>
        <i class="ca-dot" aria-hidden="true" style="inset-inline-end:calc(${CA.dotEnd}% - 5px);top:calc(${CA.tagTop} - 5px)"></i>
      </div>
      <div class="ca-ov" aria-hidden="true">${CA.labels}<span class="ca-tag" style="top:${CA.tagTop}" data-tag>${CA.last}</span></div>
    </div>
    <figcaption class="sr-only">נתוני הדגמה: שער הדולר עומד על ${CA.last} שקלים, ${CA.up ? "עלייה" : "ירידה"} של ${CA.pct} אחוז מתחילת התצוגה.</figcaption>
  </figure>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשאר הגרף הסטטי (SVG בסימון)
  const root=document.querySelector(".ca"),stage=root.querySelector(".ca-chart");
  const numEl=root.querySelector("[data-px]"),chgEl=root.querySelector("[data-chg]");
  const HIST=${JSON.stringify(CA.hist)};      // [פתיחה, גבוה, נמוך, סגירה], מהישן לחדש
  const MEAN=${CA.MEAN},SUB=8,STEP_MS=110;
  const staticPx=numEl.textContent,staticChg=chgEl.textContent,staticDn=chgEl.classList.contains("is-dn");
  const rtl=getComputedStyle(root).direction==="rtl",dirS=rtl?1:-1;      // כיוון מקצה החי אל הנרות הישנים
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את הגרף הסטטי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const cv=document.createElement("canvas");cv.className="ca-cv";cv.setAttribute("aria-hidden","true");stage.appendChild(cv);
    const ctx=cv.getContext("2d");
    const probe=document.createElement("i");probe.style.cssText="position:absolute;visibility:hidden;pointer-events:none";root.appendChild(probe);
    const px1=document.createElement("canvas");px1.width=px1.height=1;const pctx=px1.getContext("2d",{willReadFrequently:true});
    const rgb=css=>{probe.style.color=css;pctx.clearRect(0,0,1,1);pctx.fillStyle=getComputedStyle(probe).color;pctx.fillRect(0,0,1,1);const d=pctx.getImageData(0,0,1,1).data;return[d[0],d[1],d[2]];};
    const rgba=(c,a)=>"rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";
    let col={},font="sans-serif",W=0,H=0,dpr=1,padL=0,padR=0;
    const cs=HIST.map(c=>({o:c[0],h:c[1],l:c[2],c:c[3]})).reverse();      // 0 = החדש ביותר
    const base=HIST[0][0];
    const view={n:110},rng={lo:0,hi:0};
    let slide=0,sub=0,acc=0,entered=false,ticking=false,active=false,zoomTw=null,price=cs[0].c;
    const nTarget=()=>W<520?30:44;
    const resolve=()=>{
      col={up:rgb("var(--accent)"),dn:rgb("color-mix(in oklab,var(--ink) 55%,var(--card))"),grid:rgb("var(--line)"),txt:rgb("var(--muted)"),card:rgb("var(--card)"),tagTxt:rgb("var(--accent-ink)")};
      font=getComputedStyle(root).fontFamily||"sans-serif";
    };
    const targetRange=()=>{
      let lo=Infinity,hi=-Infinity;
      const m=Math.min(cs.length,Math.ceil(view.n)+1);
      for(let i=0;i<m;i++){lo=Math.min(lo,cs[i].l);hi=Math.max(hi,cs[i].h);}
      const pad=(hi-lo)*.14||.01;return[lo-pad,hi+pad];
    };
    const size=()=>{
      const r=stage.getBoundingClientRect(),st=getComputedStyle(stage);
      W=Math.round(r.width);H=Math.round(r.height);dpr=Math.min(window.devicePixelRatio||1,2);
      padL=parseFloat(st.paddingLeft)||0;padR=parseFloat(st.paddingRight)||0;
      cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
      if(entered&&!zoomTw)view.n=nTarget();
      const t=targetRange();rng.lo=t[0];rng.hi=t[1];
    };
    const draw=(time,dt)=>{
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      const xL=rtl?padL:W-padR,xO=rtl?W-padR:padL,plotW=Math.abs(xL-xO),w=plotW/view.n;
      const top=12,bot=H-12;
      const t=targetRange(),k=dt?1-Math.exp(-dt/200):1;
      rng.lo+=(t[0]-rng.lo)*k;rng.hi+=(t[1]-rng.hi)*k;
      const y=v=>top+(rng.hi-v)/(rng.hi-rng.lo)*(bot-top),cx=i=>xL+dirS*((i+.5-slide)*w);
      // רשת וציר מחיר בצד הנרות הישנים
      const raw=(rng.hi-rng.lo)/4,step=[.005,.01,.02,.05,.1].find(s=>s>=raw)||.1;
      ctx.font="12px "+font;ctx.textBaseline="middle";ctx.textAlign=rtl?"right":"left";
      for(let v=Math.ceil(rng.lo/step)*step;v<=rng.hi;v+=step){
        const yy=y(v);
        ctx.strokeStyle=rgba(col.grid,.9);ctx.lineWidth=1;ctx.setLineDash([2,6]);
        ctx.beginPath();ctx.moveTo(Math.min(xL,xO),yy);ctx.lineTo(Math.max(xL,xO),yy);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle=rgba(col.txt,1);ctx.fillText(v.toFixed(step<.01?3:2),rtl?W-2:2,yy);
      }
      // נרות, גזורים לאזור הגרף
      ctx.save();ctx.beginPath();ctx.rect(Math.min(xL,xO),0,plotW,H);ctx.clip();
      const bw=Math.max(2,w*.62);
      for(let i=0;i<cs.length;i++){
        const x=cx(i);if(dirS*(x-xL)>plotW+w)break;
        const c=cs[i],up=c.c>=c.o,cc=up?col.up:col.dn;
        ctx.strokeStyle=rgba(cc,1);ctx.fillStyle=rgba(cc,1);ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(x,y(c.h));ctx.lineTo(x,y(c.l));ctx.stroke();
        const yo=y(c.o),yc=y(c.c);ctx.fillRect(x-bw/2,Math.min(yo,yc),bw,Math.max(1,Math.abs(yo-yc)));
      }
      // קו השער הנוכחי
      const yp=y(price);
      ctx.strokeStyle=rgba(col.up,.55);ctx.lineWidth=1;ctx.setLineDash([4,5]);
      ctx.beginPath();ctx.moveTo(xL,yp);ctx.lineTo(xO,yp);ctx.stroke();ctx.setLineDash([]);
      ctx.restore();
      // נקודה זוהרת על השער, בפעימה איטית
      const dx=cx(0),pulse=.5+.5*Math.sin(time*3.2);
      const g=ctx.createRadialGradient(dx,yp,0,dx,yp,10+8*pulse);
      g.addColorStop(0,rgba(col.up,.45));g.addColorStop(1,rgba(col.up,0));
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(dx,yp,10+8*pulse,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=rgba(col.card,1);ctx.beginPath();ctx.arc(dx,yp,6.5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=rgba(col.up,1);ctx.beginPath();ctx.arc(dx,yp,4.5,0,Math.PI*2);ctx.fill();
      // תווית המחיר, מחוץ לגרף בצד החי
      const tw=(rtl?padL:padR)-10,tx=rtl?2:xL+8,th=24;
      ctx.fillStyle=rgba(col.up,1);ctx.beginPath();ctx.roundRect(tx,yp-th/2,tw,th,8);ctx.fill();
      ctx.font="700 13px "+font;ctx.textAlign="center";ctx.fillStyle=rgba(col.tagTxt,1);ctx.fillText(price.toFixed(3),tx+tw/2,yp+1);
    };
    const readout=()=>{
      const pc=(price/base-1)*100;
      numEl.textContent=price.toFixed(3);
      chgEl.textContent=(pc>=0?"+":"-")+Math.abs(pc).toFixed(2)+"%";
      chgEl.classList.toggle("is-dn",pc<0);
    };
    const step=()=>{
      const c=cs[0];
      c.c=Math.round((c.c+(Math.random()-.5)*.012-(c.c-MEAN)*.02)*10000)/10000;
      c.h=Math.max(c.h,c.c);c.l=Math.min(c.l,c.c);price=c.c;
      if(++sub>=SUB){sub=0;cs.unshift({o:price,h:price,l:price,c:price});if(cs.length>200)cs.pop();slide=1;}
      readout();
    };
    const tick=(time,dt)=>{
      dt=Math.min(dt,100);acc+=dt;
      while(acc>=STEP_MS){acc-=STEP_MS;step();}
      slide=Math.max(0,slide-dt/380);
      draw(time,dt);
    };
    const sync=()=>{
      const run=active&&!document.hidden;
      if(run&&!ticking){gsap.ticker.add(tick);ticking=true;}
      else if(!run&&ticking){gsap.ticker.remove(tick);ticking=false;}
    };
    resolve();size();draw(0,0);
    const ro=new ResizeObserver(()=>{size();draw(0,0);});ro.observe(stage);
    const onVis=()=>sync();document.addEventListener("visibilitychange",onVis);
    // נראה בחלון: רק אז הלולאה רצה. בכניסה הראשונה הגרף מתקרב מתצוגה רחבה לחלון הנרות
    ScrollTrigger.create({trigger:root,start:"top 92%",end:"bottom 8%",onToggle:self=>{
      active=self.isActive;
      if(active&&!entered){entered=true;resolve();zoomTw=gsap.to(view,{n:nTarget(),duration:1.6,ease:"power3.inOut",onComplete:()=>{zoomTw=null;}});}
      sync();
    }});
    return()=>{
      if(ticking){gsap.ticker.remove(tick);ticking=false;}
      if(zoomTw)zoomTw.kill();
      ro.disconnect();document.removeEventListener("visibilitychange",onVis);
      cv.remove();probe.remove();
      root.classList.remove("is-live");
      numEl.textContent=staticPx;chgEl.textContent=staticChg;chgEl.classList.toggle("is-dn",staticDn);
    };
  });
})();`
},
{
  id: "g256", cat: "gsap", name: "קווים שמתפצלים מנקודה אחת לתוויות קצה", tech: "GSAP · ScrollTrigger scrub · SVG strokeDashoffset · sticky", status: "מאושר-עין",
  desc: "מניפה של קווים דקים שיוצאים מנקודה אחת וצומחים בגלילה, כל קו תרחיש אחר של אותו עסק, ומעליהם נמשכים חמישה קווים מודגשים עם ערך בקצה. מונה בצד סופר כמה תרחישים נבדקו. הקווים נפתחים קודם, הקווים המודגשים אחריהם, והתוויות נדלקות אחרונות, כך שהעין מבינה קודם את הטווח ורק אחר כך את המספרים.",
  when: "תחזית, טווח או השוואת תרחישים: הכנסה צפויה לשנה, זמן מסירה לפי מורכבות, תוצאה של שלוש חבילות מחיר. מתאים לפיננסים, ייעוץ, נדל\"ן ועסקים שמוכרים הערכה. כשהנתונים לא אמיתיים חובה לסמן אותם כנתוני הדגמה. כשיש שני תרחישים בלבד עדיף גרף קווים פשוט, ופעם אחת בעמוד.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), גרף עם הרבה קווים דקים שיוצאים מנקודה אחת ונפתחים למניפה, וקווים מודגשים שנגמרים בתוויות של אחוזונים. נבנה מאפס מהצפייה. **הנתונים:** הקווים נוצרים בבנייה מ-80 הילוכים אקראיים של הכנסה חודשית (קפיצה לוגריתמית עם נטייה קלה כלפי מעלה), מוחלקים בקטמול-רום ומצוירים כולם. החמישה המודגשים הם האחוזונים 90, 75, 50, 25 ו-10 של אותו מודל, בנוסחה סגורה (`exp(μ·m + z·σ·√m)`), ולכן הם חלקים ולא קופצים עם הרעש של המדגם. הערכים בתוויות נלקחים מהחישוב עצמו ולא נכתבים ביד. **הסימון הוא המצב הסופי:** כל הקווים, התוויות והמספר 200 כבר כתובים, ובלי GSAP או בהפחתת תנועה רואים את המניפה השלמה. **ההנעה:** ל-`.is-live` יש CSS שמסתיר כל קו עם `stroke-dasharray: 1` ו-`stroke-dashoffset: 1` (הקווים עם `pathLength=1` ולכן אין צורך לחשב אורך), וסצנה נעוצה בגובה 260vh עם scrub. ציר זמן אחד: הקווים הדקים נפתחים בסדר מעורבב, כל אחד ב-`power2.out`, המונה סופר איתם, הקווים המודגשים נפתחים ב-stagger, ובסוף התוויות עולות מעט ומתבהרות. **למה לא `non-scaling-stroke`:** כי הוא מתנהג אחרת עם `pathLength` בקווי מקף, ולכן עובי הקו נקבע ביחידות ה-viewBox ומשתנה עם `--tw` ו-`--pw` בטלפון. **תוויות:** מיקום כל תווית הוא אחוז מגובה התרשים, עם מרווח מינימלי כדי שלא יחפפו, וקו קטן בצבע הקו שלה קושר אותה אליו. **נגישות:** ה-SVG `aria-hidden`; התוויות הנראות מופיעות גם בתיאור מוסתר שמקריא את הערכים; המספר הסופר `aria-hidden` ולצדו הערך הקבוע. **RTL:** ה-SVG מתהפך ב-`:dir(rtl)` ולכן המניפה נפתחת מימין לשמאל, מההיום אל העתיד, והתוויות בצד שמאל. באתר LTR מוחקים את שורת ההיפוך והכול מתהפך חזרה. **בטלפון** התוויות צרות יותר, הקווים עבים יותר והכותרת מעל.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.fn{--tw:1.5;--pw:3.5;max-width:1200px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.fn .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fn-pin{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(24px,4vw,48px);align-items:center}
.fn-head{display:grid;gap:16px;align-content:center}
.fn-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.fn-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fn-count{display:grid;gap:4px;justify-items:start;color:var(--muted);font-size:clamp(15px,1.3vw,18px)}
.fn-count b{font-size:clamp(48px,6vw,88px);line-height:1;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.fn-fig{--lw:clamp(88px,10vw,128px);margin:0;display:grid;gap:12px;justify-self:start;width:min(100%,calc(58svh * 1.4286 + var(--lw) + 8px))}
.fn-grid{display:grid;grid-template-columns:minmax(0,1fr) var(--lw);column-gap:8px;row-gap:12px}
.fn-plot{grid-column:1;grid-row:1;position:relative;aspect-ratio:800/560}
.fn-lbs{grid-column:2;grid-row:1}
.fn-sv{display:block;width:100%;height:100%;overflow:visible}
.fn-sv:dir(rtl){transform:scaleX(-1)}
.fn-sv path{fill:none;stroke-linecap:butt;stroke-linejoin:round}
.fn-base{stroke:var(--muted);stroke-width:var(--tw);stroke-dasharray:6 10;opacity:.8}
.fn-t{stroke:var(--accent);stroke-width:var(--tw);opacity:.3}
.fn-p{stroke:var(--c);stroke-width:var(--pw)}
.t0,.t4{--c:color-mix(in oklab,var(--ink) 70%,var(--card))}
.t1,.t3{--c:color-mix(in oklab,var(--accent) 55%,var(--card))}
.t2{--c:var(--accent)}
.fn-dot{position:absolute;inset-inline-start:0;width:12px;height:12px;margin:-6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px var(--card),0 0 0 6px color-mix(in oklab,var(--accent) 28%,transparent)}
.fn-lbs{position:relative}
.fn-lb{position:absolute;inset-inline-start:0;translate:0 -50%;display:grid;gap:2px;padding-inline-start:20px;white-space:nowrap}
.fn-lb::before{content:"";position:absolute;inset-inline-start:0;top:50%;width:14px;height:3px;border-radius:2px;background:var(--c);translate:0 -50%}
.fn-lb b{font-size:clamp(15px,1.3vw,18px);line-height:1.2;font-variant-numeric:tabular-nums}
.fn-lb em{font-style:normal}
.fn-lb small{font-size:clamp(12px,1vw,14px);color:var(--muted);line-height:1.3}
.fn-xa{grid-column:1;grid-row:2;display:flex;justify-content:space-between;color:var(--muted);font-size:14px;line-height:1.3}
.fn-cap{margin:0;color:var(--muted);font-size:14px;line-height:1.5}
/* המהלך רץ: סצנה נעוצה, הקווים מוסתרים בהתחלה ונפתחים לפי הגלילה */
.fn.is-live .fn-run{height:260vh}
.fn.is-live .fn-pin{position:sticky;top:0;height:100vh;height:100svh}
.fn.is-live .fn-t,.fn.is-live .fn-p{stroke-dasharray:1 1;stroke-dashoffset:1}
.fn.is-live .fn-lb{opacity:0;transform:translateY(8px)}
@media(max-width:767px){
  .fn{--tw:3.4;--pw:7}
  .fn-pin{grid-template-columns:minmax(0,1fr);gap:20px;align-content:center}
  .fn-head{gap:10px}
  .fn-head p{font-size:15px;line-height:1.5}
  .fn-count b{font-size:48px}
  .fn-fig{--lw:60px;width:100%}
  .fn-grid{column-gap:4px}
  .fn-lb{padding-inline-start:14px}
  .fn-lb::before{width:10px}
  .fn-lb b{font-size:14px}
  .fn-lb em,.fn-lb small{display:none}
  .fn-xa,.fn-cap{font-size:13px}
}`,
  html: `<div class="stage"><section class="fn">
  <div class="fn-run">
    <div class="fn-pin">
      <header class="fn-head">
        <h2>איפה ההכנסות יהיו בעוד שנה</h2>
        <p>הרצנו תרחישים על חנות מקוונת שמכניסה היום 100 אלף שקל בחודש, עם אותה תנודתיות מחודש לחודש שראינו בשנתיים האחרונות. הקו המודגש באמצע הוא התרחיש הסביר: חצי מהתרחישים מסתיימים מעליו וחצי מתחתיו. אלה נתוני הדגמה.</p>
        <p class="fn-count"><b aria-hidden="true" data-n="${FN.N}">${FN.N}</b><span aria-hidden="true">תרחישים נבדקו</span></p>
      </header>
      <figure class="fn-fig">
        <div class="fn-grid">
          <div class="fn-plot">
            <svg class="fn-sv" viewBox="0 0 ${FN.VW} ${FN.VH}" aria-hidden="true" focusable="false"><path class="fn-base" d="M0 ${FN.base}H${FN.VW}"/>${FN.svg}</svg>
            <i class="fn-dot" aria-hidden="true" style="top:${FN.baseTop}%"></i>
          </div>
          <div class="fn-lbs" aria-hidden="true">${FN.labels}</div>
          <div class="fn-xa" aria-hidden="true"><span>היום</span><span>בעוד חצי שנה</span><span>בעוד שנה</span></div>
        </div>
        <figcaption class="fn-cap">הקו המקווקו הוא ההכנסה החודשית היום, 100 אלף שקל. הערכים בקצה הם אלפי שקלים בחודש.</figcaption>
        <p class="sr-only">נתוני הדגמה, ${FN.N} תרחישים. ההכנסה החודשית בעוד שנה, מנקודת פתיחה של 100 אלף שקל: ${FN.ends[0]} אלף בתרחיש האופטימי, ${FN.ends[1]} אלף בתרחיש טוב מהצפוי, ${FN.ends[2]} אלף בתרחיש הסביר, ${FN.ends[3]} אלף בתרחיש חלש מהצפוי ו-${FN.ends[4]} אלף בתרחיש הזהיר.</p>
      </figure>
    </div>
  </div>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארת המניפה השלמה מהסימון
  const root=document.querySelector(".fn"),run=root.querySelector(".fn-run");
  const thin=[...root.querySelectorAll(".fn-t")],mid=[...root.querySelectorAll(".fn-p")],lbs=[...root.querySelectorAll(".fn-lb")];
  const cn=root.querySelector("[data-n]"),total=Number(cn.dataset.n);
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את המצב הסופי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    cn.textContent="0";
    const c={v:0};
    gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true},defaults:{ease:"none"}})
      .to(c,{v:total,duration:.7,onUpdate:()=>{cn.textContent=String(Math.round(c.v));}},.05)
      .to(thin,{strokeDashoffset:0,duration:.3,ease:"power2.out",stagger:{amount:.4}},.05)
      .to(mid,{strokeDashoffset:0,duration:.3,ease:"power2.inOut",stagger:.05},.62)
      .to(lbs,{opacity:1,y:0,duration:.12,stagger:.04},1)
      .to({},{duration:.15});
    return()=>{root.classList.remove("is-live");cn.textContent=String(total);};
  });
})();`
},
{
  id: "g257", cat: "gsap", name: "היסטוגרמה עם הדגשה שנודדת מעמודה לעמודה", tech: "GSAP · ScrollTrigger scrub · CSS variables · sticky", status: "ממתין",
  desc: "שלושים עמודות של פניות, אחת לכל יום בחודש, ואחת מהן דולקת בצבע המותג. בגלילה ההדגשה עוברת מעמודה לעמודה כמו ראש נגינה: העמודות שכבר עברה מתכהות, אלה שלפניה בהירות, ופס דק עם מספר היום זז איתה מתחת לציר. המספר הגדול שמעל הגרף והנתונים הקטנים לידו, תאריך, סך הכל וממוצע, מתעדכנים בכל עמודה. אין זכוכית מגדלת ואין הגדלה, רק תנועה לאורך הציר.",
  when: "נתון שמתפרש על ציר זמן קצר ויש בו סיפור בתוכו: פניות לפי יום, הזמנות לפי שעה, מבקרים לפי שבוע, מכירות לפי חודש. מתאים לסקשן תוצאות או דוח חודשי, כשרוצים שהקורא יעבור על הימים בסדר ויראה איפה הייתה העלייה. כשיש פחות מעשר עמודות, או כשכל עמודה היא קטגוריה ולא רגע בזמן, עמודות רגילות מספיקות. פעם אחת בעמוד.",
  note: "**שחזור.** השראה: כמה סרטוני תנועה ב-prompt-motion.com (21.10.2026), גרף עמודות אנכי שבו עמודה אחת דולקת בצבע המותג וההדגשה נודדת על פני העמודות, עם מספר ענק וסטטיסטיקות קטנות שמתעדכנים יחד איתה. נבנה מאפס מהצפייה. **הנתונים:** שלושים ערכים שנוצרים בבנייה (קצב שבועי עם סופי שבוע חלשים, מגמה קלה כלפי מעלה וגבעה באמצע החודש), והסימון נבנה מהם, כולל טבלה מוסתרת לקורא מסך. **הסימון הוא המצב הסופי:** כל העמודות מלאות, העמודה האחרונה דולקת, ופס ההדגשה עומד עליה, עם המספר של היום האחרון והסיכום בנתונים הקטנים. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **ההנעה:** `.is-live` מאפס את גובה העמודות (`--g: 0`) ומצבע את כולן בגוון העתיד, וסצנה נעוצה בגובה 280vh עם scrub. ציר זמן אחד: בשבריר הראשון העמודות עולות ב-stagger, ואז ערך אחד (`x`, בין 0 ל-29) נע ללא האצה ובכל עדכון קובע את הפס (`--x`) ואת הצבע של כל עמודה: `--a` (כמה היא דולקת, לפי המרחק מהפס) ו-`--q` (כמה הפס כבר עבר אותה), והצבע הוא `color-mix` מהשניים. אין החלפת מחלקות ואין `transition`, ולכן הצבע לא קופץ בין עמודות והפס והצבע תמיד באותו מקום. המספר והתאריך מתחלפים לפי `Math.round(x)`, כלומר כשהפס עובר את אמצע המרחק בין שתי עמודות. אין שום אנימציית פריסה. **הנתונים הקטנים** יושבים בגריד של שתי עמודות, והתאריך תמיד בשורה משלו וללא שבירת שורה: תאריך ארוך שנשבר לשתי שורות הגביה את הבלוק והזיז את כל הסצנה, כולל הגרף, בכמה פיקסלים באמצע הגלילה. **הפס:** רוחב העמודות שווה כי הגריד הוא `repeat(30, 1fr)` והרווח בין העמודות הוא ריפוד פנימי, ולכן הפס זז בדיוק `x × 100%` ממיקום ההתחלה. **נגישות:** הגרף `aria-hidden`; המספר הגדול והנתונים הקטנים `aria-hidden` ולצדם משפט קבוע שמתאר את הסיכום; הטבלה המוסתרת מציגה כל יום. **RTL:** היום הראשון בצד ימין והפס זז שמאלה, כי הסימן של התזוזה מתהפך ב-`:dir(rtl)`. באתר LTR הסימן חוזר לחיובי. **בטלפון** הנתונים הקטנים עוברים לשורה אחת מתחת למספר, והעמודות צרות יותר.",
  libs: ["gsap", "ScrollTrigger"],
  css: `.hs{--s:1;--n:${HS.N};max-width:1200px;margin-inline:auto;display:grid;gap:clamp(24px,4vw,48px)}
.hs:dir(rtl){--s:-1}
.hs .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hs-pin{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"head read" "chart chart";gap:clamp(24px,3vw,40px) clamp(24px,5vw,64px);align-content:center;align-items:end}
.hs-head{grid-area:head;display:grid;gap:12px;max-width:46ch}
.hs-head h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.hs-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hs-read{grid-area:read;display:grid;gap:16px;justify-items:start;width:clamp(320px,32vw,440px)}
.hs-big{display:grid;gap:4px}
.hs-num{font-size:clamp(88px,13vw,184px);line-height:.9;font-weight:700;letter-spacing:-.03em;color:var(--accent);font-variant-numeric:tabular-nums}
.hs-lab{color:var(--muted);font-size:clamp(15px,1.3vw,18px)}
.hs-st{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px clamp(16px,2.4vw,32px);margin:0;width:100%}
.hs-st div{display:grid;gap:4px}
.hs-st div:first-child{grid-column:1 / -1}
.hs-st dt{color:var(--muted);font-size:13px;line-height:1.3}
.hs-st dd{margin:0;font-size:clamp(15px,1.3vw,18px);font-weight:700;line-height:1.3;font-variant-numeric:tabular-nums;white-space:nowrap}
.hs-chart{grid-area:chart;padding-bottom:40px}
.hs-plot{position:relative;height:clamp(200px,40svh,400px)}
.hs-bars{list-style:none;margin:0;padding:0;height:100%;display:grid;grid-template-columns:repeat(var(--n),minmax(0,1fr))}
.hs-b{position:relative;display:flex;align-items:flex-end;padding-inline:clamp(1px,.3vw,4px)}
.hs-b i{display:block;width:100%;height:calc(var(--v) * 100%);border-radius:4px 4px 0 0;transform-origin:50% 100%;transform:scaleY(var(--g,1));background:color-mix(in oklab,var(--ink) 28%,var(--card))}
.hs-b.is-on i{background:var(--accent)}
.hs-b small{position:absolute;inset-inline:0;top:100%;margin-top:8px;text-align:center;color:var(--muted);font-size:13px;line-height:1;font-variant-numeric:tabular-nums}
.hs-ph{position:absolute;top:0;bottom:0;inset-inline-start:0;width:calc(100% / var(--n));translate:calc(var(--x,${HS.N - 1}) * 100% * var(--s)) 0;pointer-events:none}
.hs-ph::before{content:"";position:absolute;inset:-8px 0 0;border-radius:8px;background:color-mix(in oklab,var(--accent) 9%,transparent)}
.hs-flag{position:absolute;left:50%;top:calc(100% + 8px);translate:-50% 0;min-width:32px;padding:4px 8px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:700;line-height:1.2;text-align:center;font-variant-numeric:tabular-nums}
/* המהלך רץ: סצנה נעוצה, העמודות מתחילות נמוכות ובצבע העתיד, וההדגשה נודדת לפי הגלילה */
.hs.is-live .hs-run{height:280vh}
.hs.is-live .hs-pin{position:sticky;top:0;height:100vh;height:100svh}
.hs.is-live .hs-b{--g:0}
/* הצבע של כל עמודה נגזר ברצף ממיקום ההדגשה: --a הוא כמה היא דולקת (0 עד 1), --q כמה ההדגשה כבר עברה אותה. בלי החלפת מחלקות ובלי transition, ולכן אין קפיצת צבע */
.hs.is-live .hs-b i{background:color-mix(in oklab,var(--accent) calc(var(--a,0) * 100%),color-mix(in oklab,color-mix(in oklab,var(--ink) 28%,var(--card)) calc(var(--q,0) * 100%),color-mix(in oklab,var(--ink) 9%,var(--card))))}
.hs.is-live .hs-ph{--x:0}
@media(max-width:767px){
  .hs-pin{grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "read" "chart";gap:16px;align-content:center}
  .hs-head{gap:8px}
  .hs-head p{font-size:15px;line-height:1.5}
  .hs-read{width:auto;grid-template-columns:auto minmax(0,1fr);align-items:end;gap:16px}
  .hs-num{font-size:88px}
  .hs-st{grid-template-columns:minmax(0,1fr);gap:8px}
  .hs-st div{grid-template-columns:auto auto;justify-content:space-between;align-items:baseline}
  .hs-plot{height:clamp(160px,28svh,260px)}
  .hs-b small{font-size:11px}
}`,
  html: `<div class="stage"><section class="hs">
  <div class="hs-run">
    <div class="hs-pin">
      <div class="hs-head">
        <h2>כמה פניות נכנסו בכל יום בספטמבר</h2>
        <p>כל עמודה היא יום אחד של פניות חדשות מהאתר. שימו לב לסופי השבוע, ולעלייה שבאה אחרי שהקמפיין עלה באמצע החודש. אלה נתוני הדגמה.</p>
      </div>
      <div class="hs-read">
        <div class="hs-big"><b class="hs-num" aria-hidden="true" data-num>${HS.last}</b><span class="hs-lab" aria-hidden="true">פניות ביום הזה</span></div>
        <dl class="hs-st" aria-hidden="true">
          <div><dt>תאריך</dt><dd data-dt>${HS.dl[HS.N - 1]}</dd></div>
          <div><dt>סך הפניות עד כאן</dt><dd data-sum>${HS.total}</dd></div>
          <div><dt>ממוצע ליום</dt><dd data-avg>${HS.avg}</dd></div>
        </dl>
      </div>
      <div class="hs-chart">
        <div class="hs-plot">
          <ol class="hs-bars" aria-hidden="true">${HS.bars}</ol>
          <div class="hs-ph" aria-hidden="true"><span class="hs-flag" data-flag>${HS.N}</span></div>
        </div>
        <p class="sr-only">נתוני הדגמה: ${HS.total} פניות בספטמבר, ממוצע של ${HS.avg} ליום. היום העמוס ביותר היה ה-${HS.peakDay} בחודש עם ${HS.peak} פניות, והיום האחרון הסתיים עם ${HS.last}.</p>
        <table class="sr-only"><caption>פניות חדשות לפי יום בספטמבר</caption><thead><tr><th scope="col">יום</th><th scope="col">פניות</th></tr></thead><tbody>${HS.table}</tbody></table>
      </div>
    </div>
  </div>
</section></div>`,
  js: `(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשאר המצב הסופי מהסימון: העמודה האחרונה דולקת
  const root=document.querySelector(".hs"),run=root.querySelector(".hs-run");
  const bars=[...root.querySelectorAll(".hs-b")],N=bars.length,ph=root.querySelector(".hs-ph");
  const V=${JSON.stringify(HS.v)},D=${JSON.stringify(HS.dl)};
  const num=root.querySelector("[data-num]"),dt=root.querySelector("[data-dt]"),sum=root.querySelector("[data-sum]"),avg=root.querySelector("[data-avg]"),flag=root.querySelector("[data-flag]");
  const fin=[num,dt,sum,avg,flag].map(el=>el.textContent);
  const cum=V.reduce((a,v,i)=>{a.push((a[i-1]||0)+v);return a;},[]);
  let cur=-1;
  // המספרים נגזרים מהאינדקס של העמודה הקרובה להדגשה, ומתחלפים בדיוק כשהפס עובר את אמצע המרחק בין שתי עמודות
  const show=i=>{
    if(i===cur)return;
    cur=i;
    num.textContent=V[i];dt.textContent=D[i];sum.textContent=cum[i];avg.textContent=(cum[i]/(i+1)).toFixed(1);flag.textContent=i+1;
  };
  // הפס והצבעים זזים ברצף עם x, העמודות לא מקבלות מחלקות: דולקת ככל שהפס מעליה (a), ועברה ככל שהפס כבר חלף עליה (q)
  const paint=x=>{
    ph.style.setProperty("--x",x.toFixed(3));
    for(let j=0;j<N;j++){const d=x-j;bars[j].style.setProperty("--a",Math.max(0,1-Math.abs(d)).toFixed(3));bars[j].style.setProperty("--q",Math.min(1,Math.max(0,d)).toFixed(3));}
    show(Math.round(x));
  };
  // בהפחתת תנועה הפונקציה לא רצה, ורואים את המצב הסופי מהסימון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const st={x:0};
    paint(0);
    gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}})
      .to(bars,{"--g":1,duration:.2,ease:"power2.out",stagger:{amount:.16,from:"start"}},0)
      .to(st,{x:N-1,duration:1,ease:"none",onUpdate:()=>paint(st.x)},.14)
      .to({},{duration:.1});
    return()=>{
      root.classList.remove("is-live");
      ph.style.removeProperty("--x");
      bars.forEach(b=>{b.style.removeProperty("--a");b.style.removeProperty("--q");b.style.removeProperty("--g");});
      [num,dt,sum,avg,flag].forEach((el,k)=>{el.textContent=fin[k];});
      cur=-1;
    };
  });
})();`
}
];
