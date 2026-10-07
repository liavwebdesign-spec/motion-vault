// S10 · בנטו גריד, עמוד הייחוס בגרסה 2 (6.10.2026). נבנה מחדש כעמוד אמיתי, לפי המודל של s05, במקום השלד הצבוע.
//
// מה זה: העסק הדמיוני "זרם", חברה שמתקינה ומנהלת עמדות טעינה לרכב חשמלי בבניינים משותפים. אין כאן לקוח אמיתי,
// וכל המספרים, הציטוטים והכתובות הם דוגמה (מסומנים כך בעמוד). הצילומים הם סטוק (ראו ids בשדה note).
// מקורות: רוני סאיג V3 (בנטו עם אריחים שלא חותכים תוכן: שורות minmax(var(--u),auto), טאבלט נפרד, מפת span מוצהרת),
// מומנטום 10/10 וג' של פרופיקס (לוחות עם אריח דיו ואריח מבטא אחד, אריח שנפתח, מספרים וגרפים אמיתיים).
// הפונט: Google Sans בלבד, מקומי, שלושה משקלים (400 גוף, 500 תוויות ופעולות, 600 כותרות ומספרים).
// המבנה: הדר שהוא שלושה אריחים צפים · לוח ההירו (הצהרה, צילום, מספר, מצב חי, ציטוט, גרף, פעולה) · מספרים על הקרקע ·
// רגע החתימה: "החניון החי", לוח שבו כל אריח הוא חניה והוא מתעורר כשמגיעים אליו, עם בורר שעה ואריח פירוט שנפתח ·
// משפט נושם עם צילום · לוח ההצעה · בדיקת בניין שקטה עם צילום שעולה מעל הלוח · פוטר.
// מנוע: ease החתום, reveal ב-keyframes 16px/0.5s, תנועה רציפה בלבד כ-CSS על transform, אין כתיבה ל-DOM במנוחה,
// reduced-motion מכבה הכל, וכל התוכן נראה בלי JS (המצב ההתחלתי של החניון כתוב ב-HTML).

const EASE = "cubic-bezier(.2,.6,.2,1)";
const IMG = "../assets/media/real/s10/";

// ───────── אייקונים: משפחה אחת, stroke 1.7, תיבה 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  plug: svg(" s", `<path d="M9 3v4M15 3v4"/><path d="M7 7h10v3a5 5 0 0 1-10 0V7z"/><path d="M12 15v6"/>`),
  plugL: svg("", `<path d="M9 3v4M15 3v4"/><path d="M7 7h10v3a5 5 0 0 1-10 0V7z"/><path d="M12 15v6"/>`),
  car: svg(" s", `<path d="M5 17H3v-5l2.2-5.2A2 2 0 0 1 7 5.6h10a2 2 0 0 1 1.8 1.2L21 12v5h-2"/><path d="M5 17h14"/><circle cx="7.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>`),
  check: svg(" s", `<path d="M20 6 9 17l-5-5"/>`),
  arrow: svg(" s", `<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  clock: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  phone: svg(" s", `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`),
  pin: svg(" s", `<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>`),
  receipt: svg("", `<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>`),
  bell: svg("", `<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>`),
  wallet: svg("", `<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1"/>`),
  shield: svg("", `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`),
  chat: svg(" s", `<path d="M4 5h16v11H9l-5 4z"/>`),
  chatL: svg(" qm", `<path d="M4 5h16v11H9l-5 4z"/>`),
  mark: `<span class="mark">${svg(" s", `<path d="M9 3v4M15 3v4"/><path d="M7 7h10v3a5 5 0 0 1-10 0V7z"/><path d="M12 15v6"/>`)}</span>`,
};

// ───────── הנתונים של החניון (דוגמה): שש חניות, 22 קילוואט לטעינה, 11 לעמדה, 0.78 ש"ח לקוט"ש ─────────
// כל שעה היא תמונת מצב של יום טיפוסי. המערכת מחלקת את ה-22 בין מי שבטעינה, עד 11 לכל עמדה.
const CAP = 22, MAXKW = 11, RATE = 0.78;
const APT = [3, 5, 8, 11, 14, 17];
const hm = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
const RAW = [
  { t: "08:00", nm: "בוקר", b: [null, { d: "06:50", k: 21.4 }, null, null, { c: "06:20" }, null] },
  { t: "13:00", nm: "צהריים", b: [null, null, { c: "11:10" }, null, { d: "08:30", k: 24 }, { c: "12:05" }] },
  { t: "19:00", nm: "ערב", b: [{ c: "16:50" }, { c: "18:05" }, { c: "15:20" }, { c: "18:40" }, { c: "17:30" }, null] },
  { t: "23:30", nm: "לילה", b: [{ d: "22:30", k: 24.8 }, { d: "21:40", k: 19.6 }, { d: "22:00", k: 31.5 }, { c: "21:30" }, { c: "20:10" }, { c: "22:20" }] },
];
const NW = { 1: "עמדה אחת", 2: "שתי עמדות", 3: "שלוש עמדות", 4: "ארבע עמדות", 5: "חמש עמדות", 6: "שש עמדות" };
const num = n => String(n).replace(/\.0$/, "");
const SLOTS = RAW.map(s => {
  const nC = s.b.filter(x => x && x.c).length;
  const kw = nC ? Math.round(Math.min(MAXKW, CAP / nC) * 10) / 10 : 0;
  const bays = s.b.map((x, i) => {
    const base = { n: i + 1, apt: APT[i] };
    if (!x) return { ...base, st: "f", p: 0, state: "פנויה", label: `חניה ${i + 1}, דירה ${APT[i]}, פנויה`, kw: 0 };
    if (x.d) {
      const kwh = x.k, cost = Math.round(kwh * RATE);
      return { ...base, st: "d", p: 0, state: "הסתיימה", label: `חניה ${i + 1}, דירה ${APT[i]}, הטעינה הסתיימה`, kw: 0, end: x.d, kwh, cost };
    }
    const el = (hm(s.t) - hm(x.c)) / 60, kwh = Math.round(kw * el * 10) / 10, cost = Math.round(kwh * RATE);
    return { ...base, st: "c", p: Math.round(kw / MAXKW * 100) / 100, state: `בטעינה · ${num(kw)} קילוואט`, label: `חניה ${i + 1}, דירה ${APT[i]}, בטעינה, ${num(kw)} קילוואט`, kw, start: x.c, kwh, cost };
  });
  return { t: s.t, nm: s.nm, nC, kw, used: Math.round(nC * kw * 10) / 10, bays };
});
const DEFAULT_SLOT = 2; // 19:00, הערב: כל מה שקורה כשכולם חוזרים הביתה
const DEFAULT_BAY = 2;  // חניה 3, דירה 8

function detail(slot, bay) {
  const s = SLOTS[slot], b = s.bays[bay];
  const chip = b.st === "c" ? "בטעינה" : b.st === "d" ? "הסתיימה" : "פנויה";
  let big, sub, g, note;
  if (b.st === "c") {
    big = `<b class="stat">${num(b.kw)}</b><span>קילוואט</span>`;
    sub = `ההספק שהעמדה מקבלת עכשיו, מתוך ${MAXKW} שהיא יכולה`;
    g = [["נטען עד עכשיו", `${num(b.kwh)} קוט״ש`], ["התחילה ב-", b.start], ["עלות עד עכשיו", `${b.cost} ₪`]];
    note = s.nC === 1 ? `בשעה הזו ${NW[1]} בטעינה, ולכן היא מקבלת את כל ${MAXKW} הקילוואט.`
      : b.kw >= MAXKW ? `בשעה הזו ${NW[s.nC]} בטעינה, וכל אחת מקבלת את כל ${MAXKW} הקילוואט.`
      : `בשעה הזו ${NW[s.nC]} בטעינה, ולכן כל אחת מקבלת ${num(b.kw)} מתוך ${MAXKW} קילוואט.`;
  } else if (b.st === "d") {
    big = `<b class="stat st-w">הסתיימה</b>`;
    sub = "הרכב מלא, והעמדה לא מושכת יותר חשמל";
    g = [["נטען בסך הכל", `${num(b.kwh)} קוט״ש`], ["הסתיימה ב-", b.end], ["עלות הטעינה", `${b.cost} ₪`]];
    note = "הדייר קיבל הודעה שהטעינה נגמרה, וההספק שהתפנה עובר למי שעדיין טוען.";
  } else {
    big = `<b class="stat st-w">פנויה</b>`;
    sub = "אין רכב מחובר כרגע";
    g = [["הספק זמין", `עד ${MAXKW} קילוואט`], ["החשבון", `על שם דירה ${b.apt}`], ["עלות", "רק אחרי טעינה"]];
    note = "כשרכב יתחבר, העמדה תקבל חלק מההספק של הבניין, לפי מי שכבר בטעינה.";
  }
  return `<div class="d-head"><span class="kick"><i></i>חניה ${b.n} · דירה ${b.apt} · ${s.t}</span><span class="dchip">${chip}</span></div>`
    + `<p class="d-big">${big}</p><p class="d-sub">${sub}</p>`
    + `<dl class="d-grid">${g.map(x => `<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join("")}</dl>`
    + `<p class="d-note">${note}</p>`;
}

const bayHtml = (b, i, sel, dis) => `<button class="tile card bay is-${b.st}${sel ? " is-sel" : ""} reveal" style="--i:${b.n - 1};--p:${b.p}" type="button" data-bay="${b.n - 1}" aria-pressed="${sel}" aria-label="${b.label}"${dis ? " disabled" : ""}>`
  + `<span class="b-top"><span class="b-n">חניה ${b.n}</span><span class="b-ic"><span class="ic-c">${I.plug}</span><span class="ic-d">${I.check}</span><span class="ic-f">${I.car}</span></span></span>`
  + `<span class="b-apt">דירה ${b.apt}</span><span class="b-state">${b.state}</span><span class="fill" aria-hidden="true"><i></i></span></button>`;

const DS = SLOTS[DEFAULT_SLOT];
const pbars = DS.bays.map(b => `<span class="pb" style="--p:${b.p}"><b class="pk">${b.kw ? num(b.kw) : ""}</b><span class="pbar"><i></i></span><em>${b.n}</em></span>`).join("");
const pips = (slot) => SLOTS[slot].bays.map(b => `<i class="pip is-${b.st}"></i>`).join("");

// הנתונים ללקוח: מחרוזות מוכנות, כדי שהמצב ההתחלתי ב-HTML והמצב אחרי בחירה יהיו זהים בדיוק
const CLIENT = {
  slots: SLOTS.map((s, si) => ({
    t: s.t, nC: s.nC, used: num(s.used),
    bays: s.bays.map((b, bi) => ({ c: b.st, p: b.p, s: b.state, l: b.label, k: b.kw ? num(b.kw) : "", d: detail(si, bi) })),
  })),
  cap: CAP,
};

// ───────── עמודי הנתונים: הגרף השבועי (קוט"ש ליום, דוגמה) ─────────
const WEEK = [["א", 118], ["ב", 132], ["ג", 141], ["ד", 127], ["ה", 109], ["ו", 62], ["ש", 71]];
const WMAX = 150;
const bars = WEEK.map((d, i) => `<i class="${d[1] === 141 ? "hi" : ""}" style="--h:${(d[1] / WMAX).toFixed(3)};--k:${i}"></i>`).join("");
const wlabels = WEEK.map(d => `<span>${d[0]}</span>`).join("");

// ───────── CSS ─────────
const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
.cwrap{container-type:inline-size}
.q{--ground:#E6E7E4;--tile:#fff;--soft:#F1F1EE;--soft-d:#E7E7E3;--ink:#15171A;--ink-d:#0D0F11;--muted:#585D64;--on-ink:rgba(255,255,255,.78);
 --acc:#5B3DF5;--acc-d:#4A2DDB;--acc-t:#4B2FD0;--tint:#EAE6FF;--tint-d:#DDD6FF;--acc-on-ink:#A99BFF;--err:#B3261E;
 --r:28px;--r-ctl:16px;--ease:${EASE};--shadow:0 12px 32px rgba(21,23,26,.10);
 --u:clamp(150px,min(17cqi,21svh),220px);--gap:clamp(14px,1.5cqi,24px);--pad:clamp(20px,2cqi,32px);--gut:clamp(16px,3.4cqi,56px);
 --sec:112px;--sec-s:72px;--lift:104px;
 background:var(--ground);color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.6;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q p,.q ul,.q ol,.q figure,.q blockquote,.q dl,.q dd,.q address,.q fieldset,.q legend{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q fieldset{border:0;padding:0;min-width:0}
.q legend{padding:0}
.q a{color:inherit;text-decoration:none}
.q address{font-style:normal}
.q img{display:block;max-width:100%}
.q button{font:inherit;color:inherit}
.q h1{font-size:clamp(32px,min(4cqi,6.4svh),56px);line-height:1.1;font-weight:600;letter-spacing:0;text-wrap:balance}
@container (min-width:1000px){.q h1{letter-spacing:-.015em}}
.q h2{font-size:clamp(28px,3.1cqi,40px);line-height:1.15;font-weight:600;text-wrap:balance}
.q h3{font-size:clamp(19px,1.7cqi,24px);line-height:1.3;font-weight:600;text-wrap:balance}
.q p{text-wrap:pretty}
.q .lead{font-size:18px;line-height:1.5;color:var(--muted);max-width:56ch}
.q .t-p{font-size:16px;line-height:1.55;color:var(--muted);max-width:56ch}
.q .micro{font-size:13px;line-height:1.45;color:var(--muted)}
.q .kick{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;line-height:1.3;color:var(--muted)}
.q .kick i{width:6px;height:6px;border-radius:50%;background:var(--acc);flex:none}
.q .stat{font-size:clamp(56px,6.4cqi,96px);line-height:1;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.q .unit{font-size:clamp(18px,1.6cqi,22px);line-height:1.2;font-weight:600}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block}
.q .ico.s{width:20px;height:20px}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;background:var(--tile);color:var(--ink);padding:12px 20px;border-radius:var(--r-ctl);font-weight:500;box-shadow:var(--shadow)}
.q .skip:focus{top:8px}
.q :is(a,button,summary,[tabindex],input):focus-visible{outline:3px solid var(--acc-t);outline-offset:3px}
.q .lnk:focus-visible,.q .alt a:focus-visible,.q .ft a:focus-visible{border-radius:8px}
.q .ink :is(a,button):focus-visible,.q .acc :is(a,button):focus-visible{outline-color:#fff}
.q .bay:focus-visible{outline-color:var(--ink)}
/* כפתורים: שלוש רמות, ארבעה מצבים */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:14px 24px;border:0;border-radius:var(--r-ctl);background:var(--acc);color:#fff;font-size:16px;font-weight:500;line-height:1;cursor:pointer;-webkit-tap-highlight-color:transparent;white-space:nowrap;transition:background-color .18s var(--ease),transform .18s var(--ease)}
.q .btn:active{transform:scale(.98);transition-duration:.12s}
.q .btn.sm{min-height:44px;padding:12px 20px;font-size:15px}
.q .btn.b2{background:var(--soft);color:var(--ink)}
.q .btn.inv{background:#fff;color:var(--ink)}
.q .btn.on-acc{background:#fff;color:var(--acc-t)}
.q .lnk{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:12px 0;background:none;border:0;font-size:16px;font-weight:500;line-height:1;color:var(--ink);cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:6px;transition:color .15s var(--ease),text-decoration-color .15s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
.q .ink .lnk{color:#fff}
@media (hover:hover) and (pointer:fine){
.q .btn:hover{background:var(--acc-d);transform:translateY(-2px)}
.q .btn.b2:hover{background:var(--soft-d)}
.q .btn.inv:hover{background:#E8E8E8}
.q .btn.on-acc:hover{background:#EDEAFF}
.q .lnk:hover{color:var(--acc-t);text-decoration-color:var(--acc-t)}
.q .ink .lnk:hover{color:#fff;text-decoration-color:#fff}
.q .lnk:hover .ico{transform:translateX(-4px)}
}
/* שדות: חמישה מצבים */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label,.q .legend{font-size:14px;font-weight:500;line-height:1.3;color:var(--ink)}
.q .in{font:inherit;font-size:16px;line-height:1.2;min-height:52px;padding:14px 16px;border:1.5px solid #8A8F96;border-radius:var(--r-ctl);background:var(--tile);color:var(--ink);appearance:none;width:100%;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}
.q .in::placeholder{color:#6A6F76}
.q .in:focus,.q .in:focus-visible{outline:0;border-color:var(--acc-t);box-shadow:0 0 0 3px rgba(91,61,245,.22)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;align-items:center;gap:6px;font-size:13px;line-height:1.3;color:var(--err)}
.q .fld .msg .ico{color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{background:var(--soft);color:var(--muted)}
/* reveal: keyframes ולא transition. התוכן גלוי בלי JS; רק .js מסתיר */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:s10rev .5s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes s10rev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* פתיחת עמוד אחת (CSS בלבד): ההדר יורד, אחריו האריחים נכנסים בדירוג */
.q .hd-in>*{animation:s10drop .6s ${EASE} both}
.q .hd-in>:nth-child(2){animation-delay:.08s}.q .hd-in>:nth-child(3){animation-delay:.16s}
.q .oi{animation:s10in .6s ${EASE} both;animation-delay:calc(.12s + var(--i,0) * 70ms)}
@keyframes s10drop{from{opacity:0;translate:0 -16px}to{opacity:1;translate:0 0}}
@keyframes s10in{from{opacity:0;translate:0 24px}to{opacity:1;translate:0 0}}
@keyframes s10bar{from{transform:scaleY(0)}}
@keyframes s10fade{from{opacity:0}}
@keyframes s10pulse{50%{opacity:.35}}
/* מבנה */
.q .wrap{max-width:1300px;margin-inline:auto}
.q .sec{padding:var(--sec) var(--gut) 0}
.q .head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:640px;margin-bottom:40px}
.q section[id]{scroll-margin-top:96px}
/* הדר: שלושה אריחים צפים, headroom */
.q .hd{position:sticky;top:0;z-index:40;height:88px;margin-bottom:-88px;padding-inline:var(--gut);pointer-events:none}
.q .hd-in{max-width:1300px;margin:16px auto 0;display:flex;align-items:stretch;gap:var(--gap);transition:transform .4s var(--ease)}
.q .hd.is-hidden .hd-in{transform:translateY(calc(-100% - 24px))}
.q .hd-in>*{pointer-events:auto}
.q .hd-logo,.q .hd-nav{display:flex;align-items:center;min-height:56px;background:var(--tile);border-radius:20px;box-shadow:var(--shadow)}
.q .hd-logo{gap:10px;padding:8px 20px;font-size:20px;font-weight:600;line-height:1;color:var(--ink)}
.q .mark{display:grid;place-items:center;width:36px;height:36px;flex:none;border-radius:12px;background:var(--acc);color:#fff}
.q .hd-nav{gap:4px;margin-inline:auto;padding:6px}
.q .hd-nav a{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:14px;font-size:15px;font-weight:500;line-height:1;color:var(--muted);transition:background-color .15s var(--ease),color .15s var(--ease)}
.q .hd-cta{display:flex;align-items:center;min-height:56px;padding:8px 24px;border-radius:20px;background:var(--acc);color:#fff;font-size:16px;font-weight:500;line-height:1;transition:background-color .18s var(--ease),transform .12s var(--ease)}
.q .hd-cta:active{transform:scale(.98)}
@media (hover:hover) and (pointer:fine){.q .hd-nav a:hover{background:var(--soft);color:var(--ink)}.q .hd-cta:hover{background:var(--acc-d)}}
/* הלוח והאריח */
.q .board{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(var(--u),auto);gap:var(--gap);max-width:1300px;margin-inline:auto}
.q .tile{position:relative;isolation:isolate;overflow:hidden;min-width:0;display:flex;flex-direction:column;gap:12px;padding:var(--pad);border-radius:var(--r);background:var(--tile);color:var(--ink);transition:background-color .3s var(--ease),transform .3s var(--ease),box-shadow .3s var(--ease)}
.q .tile.w2{grid-column:span 2}
.q .tile.h2{grid-row:span 2}
.q .tile.ink{background:var(--ink);color:#fff}
.q .tile.ink .kick,.q .tile.ink .micro,.q .tile.ink .t-p{color:var(--on-ink)}
.q .tile.ink .kick i{background:var(--acc-on-ink)}
.q .tile.acc{background:var(--acc);color:#fff}
.q .tile.acc .kick,.q .tile.acc .micro,.q .tile.acc .t-p{color:#fff}
.q .tile.acc .kick i{background:#fff}
.q .tile.soft{background:var(--soft)}
@media (hover:hover) and (pointer:fine){
.q .tile.card:not(.ink):not(.acc):not(.soft):not(.t-photo):not(.bay):hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.q .tile.ink:hover{background:var(--ink-d)}
.q .tile.acc:hover{background:var(--acc-d)}
.q .tile.soft:hover{background:var(--soft-d)}
}
.q .t-photo{padding:0;background:#26282C;justify-content:flex-end}
.q .t-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1;transition:transform .4s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .t-photo:hover img{transform:scale(1.03)}}
.q .cap{position:relative;align-self:flex-start;margin:var(--pad);max-width:calc(100% - 2 * var(--pad));padding:8px 14px;border-radius:12px;background:rgba(21,23,26,.82);color:#fff;font-size:14px;font-weight:500;line-height:1.35}
/* ההירו: לוח ראשון */
.q .hero{padding:96px var(--gut) 0}
.q .t-hero{justify-content:space-between;gap:16px}
.q .t-hero .body{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.q .ctas{display:flex;align-items:center;flex-wrap:wrap;gap:4px 24px;margin-top:8px}
.q .t-num{justify-content:space-between}
.q .t-num .fig{display:flex;align-items:baseline;gap:10px}
.q .t-num .t-p{font-size:15px;line-height:1.45}
.q .t-live{justify-content:space-between}
.q .lv-big{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.q .lv-big b{font-size:clamp(40px,3.6cqi,48px);line-height:1;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .lv-big span{font-size:16px;line-height:1.3;color:var(--muted)}
.q .pips{display:flex;gap:6px}
.q .pip{width:20px;height:20px;border-radius:7px;background:var(--soft-d);display:block}
.q .pip.is-c{background:var(--acc)}
.q .pip.is-d{background:#B6B8BD}
.q .pip.is-c{animation:s10pulse 1.2s ease-in-out 2}
.q .t-quote{justify-content:space-between}
.q .ico.qm{color:var(--acc)}
.q .t-quote blockquote{font-size:clamp(19px,1.9cqi,24px);line-height:1.4;font-weight:500;text-wrap:pretty;max-width:34ch}
.q .t-quote figcaption{display:flex;flex-wrap:wrap;gap:4px 12px;font-size:14px;line-height:1.4;color:var(--muted)}
.q .t-quote figcaption b{font-weight:500;color:var(--ink)}
.q .t-chart{justify-content:space-between}
.q .bars{--bd:.4s;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;align-items:end;height:88px}
.q .bars i{display:block;height:calc(var(--h) * 100%);border-radius:8px;background:#DADBD6;transform-origin:50% 100%}
.q .bars i.hi{background:var(--acc)}
.q .t-chart.is-in .bars i,.q .oi .bars i{animation:s10bar .5s ${EASE} both;animation-delay:calc(var(--bd) + var(--k) * 60ms)}
.q .wk{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;font-size:12px;line-height:1.2;color:var(--muted);text-align:center;margin-top:8px}
.q .t-chart .t-p{font-size:14px;line-height:1.4}
.q .t-chart .t-p b{font-weight:600;color:var(--ink)}
.q .t-cta{justify-content:space-between;align-items:flex-start}
.q .t-cta h3{max-width:12ch}
.q .t-cta .t-p{font-size:15px;line-height:1.45}
.q .t-cta .btn{white-space:normal;text-align:center;line-height:1.2;padding:10px 20px;max-width:100%}
/* מספרים על הקרקע */
.q .proof{padding:var(--sec-s) var(--gut) 0}
.q .nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap);align-items:start;margin-top:32px}
.q .num{display:flex;flex-direction:column;gap:8px}
.q .num b{font-size:clamp(56px,6.4cqi,96px);line-height:1;font-weight:600;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.q .num b small{font-size:.5em;font-weight:600;letter-spacing:0;color:var(--acc-t);margin-inline-start:6px}
.q .num>span{font-size:16px;line-height:1.45;color:var(--muted);max-width:28ch}
.q .proof-foot{margin-top:24px}
/* רגע החתימה: החניון החי */
.q .lot-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px 40px;flex-wrap:wrap;max-width:1300px;margin:0 auto 40px}
.q .lot-head .head{margin-bottom:0}
.q .tctl{display:none;flex-direction:column;gap:8px}
.q.js .tctl{display:flex}
.q .tctl .micro{font-weight:500}
.q .tseg{display:flex;gap:6px;padding:6px;background:var(--tile);border-radius:20px}
.q .tseg button{min-height:44px;padding:8px 16px;border:0;border-radius:14px;background:transparent;color:var(--muted);font-size:15px;font-weight:500;line-height:1.1;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;-webkit-tap-highlight-color:transparent;transition:background-color .18s var(--ease),color .18s var(--ease)}
.q .tseg button small{font-size:12px;font-weight:400;line-height:1.1;color:inherit}
.q .tseg button[aria-pressed="true"]{background:var(--ink);color:#fff}
@media (hover:hover) and (pointer:fine){.q .tseg button[aria-pressed="false"]:hover{background:var(--soft);color:var(--ink)}}
.q .t-detail{justify-content:space-between;gap:16px}
.q .d-wrap{display:flex;flex-direction:column;justify-content:space-between;gap:16px;flex:1}
.q .d-wrap.is-swap{animation:s10fade .24s ${EASE}}
.q .d-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.q .dchip{display:inline-flex;align-items:center;min-height:32px;padding:6px 14px;border-radius:12px;background:rgba(255,255,255,.12);color:#fff;font-size:13px;font-weight:500;line-height:1}
.q .d-big{display:flex;align-items:baseline;gap:12px;margin-top:8px}
.q .d-big .stat{color:#fff}
.q .d-big .st-w{font-size:clamp(44px,4.8cqi,72px)}
.q .d-big span{font-size:clamp(18px,1.6cqi,22px);font-weight:600}
.q .d-sub{font-size:16px;line-height:1.45;color:var(--on-ink);margin-top:-4px}
.q .d-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 20px}
.q .d-grid div{display:flex;flex-direction:column;gap:4px}
.q .d-grid dt{font-size:13px;line-height:1.3;color:var(--on-ink)}
.q .d-grid dd{font-size:clamp(18px,1.7cqi,24px);line-height:1.25;font-weight:600;color:#fff}
.q .d-note{font-size:15px;line-height:1.5;color:var(--on-ink);max-width:46ch}
.q .bay{align-items:stretch;justify-content:space-between;gap:8px;text-align:start;border:0;cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}
.q .bay:disabled{cursor:default;color:inherit}
.q .bay{background:var(--soft)}
.q .bay.is-c{background:var(--tint)}
.q .bay.is-d{background:var(--tile)}
.q .bay.is-sel{background:var(--acc);color:#fff}
.q .b-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.q .b-n{font-size:13px;font-weight:500;line-height:1.3;color:var(--muted)}
.q .b-ic{display:flex;color:var(--acc-t)}
.q .b-ic>span{display:none}
.q .bay.is-c .ic-c,.q .bay.is-d .ic-d,.q .bay.is-f .ic-f{display:flex}
.q .bay.is-f .b-ic{color:var(--muted)}
.q .b-apt{font-size:clamp(22px,2.2cqi,28px);line-height:1.1;font-weight:600}
.q .b-state{font-size:14px;line-height:1.35;font-weight:500;color:var(--muted)}
.q .bay.is-c .b-state{color:var(--acc-t)}
.q .bay.is-sel .b-n,.q .bay.is-sel .b-ic,.q .bay.is-sel .b-state{color:#fff}
.q .fill{display:block;height:6px;border-radius:3px;background:transparent;overflow:hidden}
.q .fill i{display:block;height:100%;border-radius:inherit;background:var(--acc);transform-origin:100% 50%;transform:scaleX(var(--p,0));transition:transform .6s var(--ease)}
.q .bay.is-c .fill{background:rgba(91,61,245,.16)}
.q .bay.is-sel .fill{background:rgba(255,255,255,.28)}
.q .bay.is-sel .fill i{background:#fff}
@media (hover:hover) and (pointer:fine){
.q .bay.is-c:not(:disabled):not(.is-sel):hover{background:var(--tint-d)}
.q .bay.is-f:not(:disabled):not(.is-sel):hover{background:var(--soft-d)}
.q .bay.is-d:not(:disabled):not(.is-sel):hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.q .bay.is-sel:not(:disabled):hover{background:var(--acc-d)}
}
.q .bay:active:not(:disabled){transform:scale(.98);transition-duration:.12s}
/* הגעה: החניות מתעוררות בדירוג כשהלוח נראה (רק עם JS, ובלי reduced-motion) */
.q .lot.is-pre .bay:not(.is-sel){background:var(--soft)}
.q .lot.is-pre .bay .fill i{transform:scaleX(0)}
.q .lot.is-arr .bay,.q .lot.is-arr .bay .fill i{transition-delay:calc(var(--i,0) * 90ms)}
.q .t-power{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:12px 32px;align-items:end}
.q .pw-txt{display:flex;flex-direction:column;gap:12px}
.q .pw-big{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.q .pw-big b{font-size:clamp(40px,4.2cqi,56px);line-height:1;font-weight:600;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .pw-big span{font-size:16px;line-height:1.3;color:var(--muted)}
.q .pw-bars{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;align-items:end;min-height:112px}
.q .pb{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:112px}
.q .pk{font-size:12px;line-height:1.2;font-weight:500;color:var(--acc-t);min-height:14px;font-variant-numeric:tabular-nums}
.q .pbar{display:flex;align-items:flex-end;width:100%;flex:1;border-radius:8px;background:var(--soft)}
.q .pbar i{display:block;width:100%;height:100%;border-radius:8px;background:var(--acc);transform-origin:50% 100%;transform:scaleY(var(--p,0));transition:transform .6s var(--ease)}
.q .pb em{font-style:normal;font-size:12px;line-height:1.2;color:var(--muted)}
.q .lot-foot{max-width:1300px;margin:20px auto 0}
.q .lot-foot p{max-width:64ch}
/* משפט נושם עם צילום */
.q .breath{padding:var(--sec) var(--gut) 0}
.q .br-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center;max-width:1300px;margin-inline:auto}
.q .br-txt{display:flex;flex-direction:column;align-items:flex-start;gap:20px;max-width:520px}
.q .br-pic{overflow:hidden;border-radius:var(--r);background:#26282C;aspect-ratio:3/2}
.q .br-pic img{width:100%;height:100%;object-fit:cover;transition:transform .4s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .br-pic:hover img{transform:scale(1.03)}}
/* לוח ההצעה */
.q .t-price{justify-content:space-between;gap:20px}
.q .price-row{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.q .price-row .stat{color:#fff}
.q .price-row .unit{color:var(--on-ink)}
.q .plus{font-size:18px;line-height:1.4;color:#fff;font-weight:500}
.q .ticks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px}
.q .ticks li{display:flex;align-items:flex-start;gap:10px;font-size:15px;line-height:1.4;color:#fff}
.q .ticks li .ico{margin-top:1px;color:var(--acc-on-ink)}
.q .t-price .foot{display:flex;align-items:center;flex-wrap:wrap;gap:12px 20px}
.q .t-step h3{margin-top:auto}
.q .t-step .t-p{font-size:15px;line-height:1.5}
.q .t-gives{justify-content:space-between}
.q .gives{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 20px}
.q .gives li{display:flex;flex-direction:column;align-items:flex-start;gap:10px;font-size:15px;line-height:1.45;color:var(--ink)}
.q .gives li .ico{color:var(--acc-t)}
.q .t-sup{justify-content:space-between}
.q .sup-big{display:flex;align-items:center;gap:10px;font-size:clamp(18px,1.6cqi,22px);line-height:1.25;font-weight:600}
.q .nw{white-space:nowrap}
.q .dot{width:10px;height:10px;border-radius:50%;background:var(--muted);flex:none}
.q .dot.on{background:var(--acc)}
/* בדיקת בניין: בלוק שקט, והצילום עולה מעל הלוח */
.q .visit{padding:0 var(--gut) var(--sec)}
.q .offer.sec{padding-bottom:calc(var(--sec) * .5 + var(--lift))}
.q .vpanel{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);column-gap:64px;align-items:start;max-width:1300px;margin-inline:auto;padding:64px;border-radius:40px;background:var(--tile)}
.q .v-body{display:flex;flex-direction:column;gap:32px}
.q .v-body .head{margin-bottom:0}
.q .form{display:flex;flex-direction:column;gap:20px;max-width:560px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .opts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.q .opt{position:relative}
.q .opt input{padding:0;position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.q .opt span{display:inline-flex;align-items:center;min-height:44px;padding:10px 20px;border-radius:14px;background:var(--soft);font-size:15px;font-weight:500;line-height:1;transition:background-color .18s var(--ease),color .18s var(--ease)}
.q .opt input:checked+span{background:var(--ink);color:#fff}
.q .opt input:focus-visible+span{outline:3px solid var(--acc-t);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.q .opt input:not(:checked):hover+span{background:var(--soft-d)}}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:12px 24px}
.q .alt{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:15px;color:var(--muted)}
.q .alt a{display:inline-flex;align-items:center;min-height:44px;font-weight:500;color:var(--ink);unicode-bidi:isolate;transition:color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .alt a:hover{color:var(--acc-t)}}
.q .ok{display:none;flex-direction:column;align-items:flex-start;gap:16px;padding:16px 0}
.q .ok .tick{width:56px;height:56px;border-radius:20px;background:var(--tint);display:grid;place-items:center;color:var(--acc-t)}
.q .vpanel.is-sent .form{display:none}
.q .vpanel.is-sent .ok{display:flex}
.q .v-photo{position:relative;margin-top:calc(-1 * (var(--lift) + 64px));aspect-ratio:3/4;border-radius:var(--r);overflow:hidden;background:#D6D8DC}
.q .v-photo img{width:100%;height:100%;object-fit:cover;object-position:60% 40%;transition:transform .4s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .v-photo:hover img{transform:scale(1.03)}}
/* פוטר: יריעה כהה */
.q .ft{padding:72px var(--gut) 0;border-radius:40px 40px 0 0;background:var(--ink);color:#fff;overflow:hidden}
.q .ft-top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;max-width:1300px;margin-inline:auto}
.q .ft-brand{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.q .ft-brand .hd-logo{background:none;box-shadow:none;padding:0;min-height:44px;color:#fff}
.q .ft-brand p{font-size:15px;line-height:1.6;color:var(--on-ink);max-width:34ch}
.q .ft-col{display:flex;flex-direction:column;font-size:15px;line-height:1.6;color:var(--on-ink)}
.q .ft-h{font-size:14px;font-weight:600;line-height:1.3;color:#fff;margin-bottom:8px}
.q .ft-col span,.q .ft-col address{padding-block:6px}
.q .ft-col a,.q .ft-bot a{display:inline-block;padding-block:6px;color:var(--on-ink);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate;align-self:flex-start}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:#fff}}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1300px;margin:48px auto 0;font-size:14px;color:var(--on-ink)}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
.q .ft-word{max-width:1300px;margin:24px auto 0;height:.62em;font-size:clamp(96px,17cqi,220px);font-weight:600;line-height:1;letter-spacing:-.04em;color:#23262B;text-align:center;user-select:none;overflow:hidden}
/* טאבלט וטלפון: שתי עמודות, מפת span מוצהרת (bento-frame 5) */
@container (max-width:1023px){
.q{--sec:88px;--sec-s:56px;--lift:88px}
.q .board{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:auto;grid-auto-flow:dense}
.q .tile{min-height:180px}
.q .tile.w2,.q .tile.h2.w2{grid-column:span 2}
.q .tile.h2{grid-row:auto}
.q .tile.t-photo.h2{grid-row:span 2}
.q .t-detail{min-height:0}
.q .hd-nav a{padding:10px 12px}
.q .nums{gap:24px}
.q .br-in{grid-template-columns:1fr;gap:40px}
.q .br-pic{aspect-ratio:16/10}
.q .vpanel{grid-template-columns:1fr;padding:56px 40px;row-gap:40px}
.q .v-photo{order:-1;aspect-ratio:16/10;margin-top:calc(-1 * (var(--lift) + 56px))}
.q .ft-top{grid-template-columns:1fr 1fr}
.q .ft-col a,.q .ft-bot a{padding-block:12px}
}
@container (max-width:767px){
.q{--sec:64px;--sec-s:40px;--r:24px;--lift:72px}
.q .hd-nav{display:none}
.q .hd-in{justify-content:space-between}
.q .hd-logo{padding:8px 16px}
.q .hero{padding-top:88px}
.q .tile{min-height:150px}
.q .t-photo{min-height:180px}
.q .ctas{width:100%;flex-direction:column;align-items:stretch;gap:0}
.q .ctas .btn{width:100%}
.q .ctas .lnk{justify-content:center}
.q .head{margin-bottom:32px}
.q .nums{grid-template-columns:1fr;gap:32px}
.q .lot-head{margin-bottom:32px}
.q .tseg{width:100%}
.q .tseg button{flex:1;padding-inline:8px}
.q .t-power{grid-template-columns:1fr;gap:20px}
.q .d-grid{grid-template-columns:1fr 1fr 1fr;gap:12px}
.q .ticks{grid-template-columns:1fr}
.q .gives{grid-template-columns:1fr}
.q .vpanel{padding:40px 24px;border-radius:32px}
.q .v-photo{margin-top:calc(-1 * (var(--lift) + 40px))}
.q .form .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:56px}
.q .ft-top{grid-template-columns:1fr;gap:28px}
.q .ft-bot{margin-top:32px}
.q .ft-bot nav{gap:16px}
}
@media (prefers-reduced-motion:reduce){
.q.js .reveal{opacity:1}
.q .reveal.is-in,.q .hd-in>*,.q .oi{animation:none}
.q .t-chart.is-in .bars i,.q .oi .bars i,.q .pip.is-c,.q .d-wrap.is-swap{animation:none}
.q .tile,.q .btn,.q .lnk,.q .lnk .ico,.q .t-photo img,.q .br-pic img,.q .v-photo img,.q .hd-in,.q .hd-nav a,.q .hd-cta,.q .tseg button,.q .fill i,.q .pbar i,.q .opt span{transition:none}
.q .btn:hover,.q .btn:active,.q .tile:hover,.q .bay:hover,.q .bay:active{transform:none}
.q .t-photo:hover img,.q .br-pic:hover img,.q .v-photo:hover img,.q .lnk:hover .ico{transform:none}
}`;

// ───────── HTML ─────────
const li = (ico, t) => `<li>${ico}<span>${t}</span></li>`;
const HTML = `<div class="cwrap sk-s10"><div class="q" id="s10-top">
<a class="skip" href="#s10-main">דילוג לתוכן</a>
<header class="hd"><div class="hd-in">
<a class="hd-logo" href="#s10-top" aria-label="זרם, לראש הדף">${I.mark}<span>זרם</span></a>
<nav class="hd-nav" aria-label="ראשי"><a href="#s10-how">איך זה עובד</a><a href="#s10-lot">החניון החי</a><a href="#s10-offer">מה כלול</a><a href="#s10-visit">בדיקת בניין</a></nav>
<a class="hd-cta" href="#s10-visit">לבדוק את הבניין</a>
</div></header>
<main id="s10-main">

<section class="hero" id="s10-how" aria-labelledby="s10-h1"><div class="board">
<article class="tile card t-hero w2 h2 oi" style="--i:0"><span class="kick"><i></i>עמדות טעינה לבניינים משותפים</span>
<div class="body"><h1 id="s10-h1">עמדת טעינה לכל חניה, וכל דייר משלם על מה שהטעין</h1>
<p class="lead">אנחנו מתכננים את החשמל בבניין, מתקינים עמדה ליד כל חניה ומחייבים כל דייר לפי הצריכה שלו. הוועד לא צריך לנהל כלום.</p>
<div class="ctas"><a class="btn" href="#s10-visit">לבדוק את הבניין שלי</a><a class="lnk" href="#s10-lot">איך זה עובד${I.arrow}</a></div></div></article>
<figure class="tile card t-photo h2 oi" style="--i:1"><img src="${IMG}resident.webp" width="1100" height="1650" alt="דיירת מדברת בטלפון ליד רכב לבן שמחובר לעמדת טעינה, בכניסה לבניין מגורים" fetchpriority="high" decoding="async"><figcaption class="cap">מחברים בערב, והחשבון מחכה בסוף החודש</figcaption></figure>
<article class="tile card ink t-num oi" style="--i:2"><span class="kick"><i></i>מהחתימה לטעינה</span>
<p class="fig"><span class="stat">7</span><span class="unit">ימי עבודה</span></p>
<p class="t-p">מההצעה החתומה ועד הטעינה הראשונה, בבניין עם לוח חשמל תקין</p><p class="micro">נתון לדוגמה</p></article>
<article class="tile card t-live oi" style="--i:3"><span class="kick"><i></i>החניון עכשיו</span>
<div class="lv-big"><b data-live-n>${DS.nC}</b><span data-live-t>מתוך 6 עמדות בטעינה</span></div>
<div class="pips" data-live-pips role="img" aria-label="מצב שש העמדות בבניין לדוגמה">${pips(DEFAULT_SLOT)}</div>
<p class="micro">בניין לדוגמה, נתוני הדגמה</p></article>
<figure class="tile card t-quote w2 oi" style="--i:4">${I.chatL}<blockquote>אחרי שנתיים של דיונים בוועד, העמדה הותקנה בשבוע. בסוף החודש מגיע דף אחד עם כל טעינה, ואף אחד לא צריך לרדוף אחרי כסף.</blockquote>
<figcaption><b>דנה אפשטיין</b><span>דיירת בבניין לדוגמה · ציטוט להדגמה</span></figcaption></figure>
<article class="tile card t-chart oi" style="--i:5"><span class="kick"><i></i>צריכה בבניין, לפי יום</span>
<div><div class="bars" role="img" aria-label="צריכה בקוט״ש לפי יום, ראשון עד שבת: 118, 132, 141, 127, 109, 62, 71">${bars}</div><div class="wk" aria-hidden="true">${wlabels}</div></div>
<p class="t-p">ביום שלישי נטענו הכי הרבה: <b class="nw">141 קוט״ש</b>. נתוני דוגמה, שבוע אחד.</p></article>
<article class="tile card acc t-cta oi" style="--i:6"><h3>כמה חניות יש בבניין שלכם?</h3><p class="t-p">בדיקה ראשונית תוך יום עבודה, בלי התחייבות</p><a class="btn on-acc sm" href="#s10-visit">מתחילים${I.arrow}</a></article>
</div></section>

<section class="proof" aria-label="מספרים"><div class="wrap">
<span class="kick reveal"><i></i>בבניינים שכבר מחוברים</span>
<div class="nums">
<div class="num reveal" style="--i:0"><b><span data-count="112">112</span></b><span>בניינים מחוברים</span></div>
<div class="num reveal" style="--i:1"><b><span data-count="1840">1,840</span></b><span>עמדות פעילות</span></div>
<div class="num reveal" style="--i:2"><b>0<small>₪</small></b><span>עלות לוועד הבית</span></div>
</div>
<p class="micro proof-foot reveal">נתוני דוגמה: העסק דמיוני.</p>
</div></section>

<section class="lot sec" id="s10-lot" aria-labelledby="s10-lot-h">
<div class="lot-head">
<div class="head reveal"><span class="kick"><i></i>החניון החי</span><h2 id="s10-lot-h">החניון של בניין אחד, בארבע שעות ביום</h2><p class="lead">ללוח החשמל של הבניין יש הספק אחד לטעינה. המערכת מחלקת אותו בין מי שמחובר באותו רגע. בחרו שעה, ולחצו על חניה כדי לראות מה קורה בה.</p></div>
<div class="tctl reveal"><span class="micro" id="s10-tctl">שעה ביום</span><div class="tseg" role="group" aria-labelledby="s10-tctl">${SLOTS.map((s, i) => `<button type="button" data-slot="${i}" aria-pressed="${i === DEFAULT_SLOT}">${s.t}<small>${s.nm}</small></button>`).join("")}</div></div>
</div>
<div class="board lot" data-lot>
<section class="tile card ink t-detail w2 h2 reveal" style="--i:0" aria-label="פירוט החניה שנבחרה"><div class="d-wrap" data-detail aria-live="polite">${detail(DEFAULT_SLOT, DEFAULT_BAY)}</div></section>
${[0, 1, 2, 3].map(i => bayHtml(DS.bays[i], i % 2 + 1, i === DEFAULT_BAY, true)).join("")}
<section class="tile card t-power w2 reveal" style="--i:1" aria-label="חלוקת ההספק של הבניין"><div class="pw-txt"><span class="kick"><i></i>הספק הבניין</span><p class="pw-big"><b data-pw-used>${num(DS.used)}</b><span>מתוך ${CAP} קילוואט בשימוש</span></p><p class="t-p">הבניין מקצה ${CAP} קילוואט לטעינה, והמערכת מחלקת אותם בין מי שמחובר. כך הלוח לא מתפרק, ואף אחד לא מתעורר לרכב ריק.</p></div>
<div class="pw-bars" data-pw-bars role="img" aria-label="הספק לכל חניה, בקילוואט">${pbars}</div></section>
${[4, 5].map(i => bayHtml(DS.bays[i], i % 2 + 1, i === DEFAULT_BAY, true)).join("")}
</div>
<div class="lot-foot reveal"><p class="micro">בניין לדוגמה: שש חניות עם עמדה ו-${CAP} קילוואט לטעינה. ארבע שעות מתוך יום טיפוסי, והנתונים להמחשה בלבד.</p></div>
</section>

<section class="breath" aria-labelledby="s10-br-h"><div class="br-in">
<div class="br-txt reveal"><span class="kick"><i></i>אחריות</span><h2 id="s10-br-h">הוועד לא צריך להבין חשמל, מספיק שיהיה מי שאחראי</h2><p class="lead">כל עמדה מותקנת על ידי חשמלאי מוסמך ומחוברת למונה משלה. אם משהו מפסיק לעבוד, מתקשרים אלינו ולא לוועד.</p><a class="lnk" href="#s10-offer">מה כלול בהתקנה${I.arrow}</a></div>
<figure class="br-pic reveal" style="--i:1"><img src="${IMG}lot-paint.webp" width="1600" height="1067" alt="סימון חניה לרכב חשמלי, מצויר בלבן על אספלט שחור" loading="lazy" decoding="async"></figure>
</div></section>

<section class="offer sec" id="s10-offer" aria-labelledby="s10-of-h">
<div class="wrap"><div class="head reveal"><span class="kick"><i></i>מה כלול</span><h2 id="s10-of-h">מחיר אחד לעמדה, בלי הפתעות לוועד</h2><p class="lead">מה משלמים בהתקנה, מה משלמים כל חודש, ומה לא משלמים בכלל.</p></div></div>
<div class="board">
<article class="tile card ink t-price w2 h2 reveal" style="--i:0"><span class="kick"><i></i>לכל עמדה</span>
<div class="price-row"><span class="stat">3,900 ₪</span><span class="unit">התקנה חד פעמית</span></div>
<p class="plus">ועוד 29 ₪ לחודש על ניהול, חיוב לדייר ותמיכה</p>
<ul class="ticks">${li(I.check, "בדיקת לוח ותשתית")}${li(I.check, "עמדה עם מונה מובנה")}${li(I.check, "התקנה על ידי חשמלאי מוסמך")}${li(I.check, "אחריות לשנתיים")}</ul>
<div class="foot"><a class="btn inv" href="#s10-visit">לקבל הצעה לבניין</a><span class="micro">מחירי דוגמה, כולל מע״מ</span></div></article>
<article class="tile card t-step reveal" style="--i:1"><span class="kick"><i></i>שלב 1</span><h3>בדיקת תשתית</h3><p class="t-p">חשמלאי מגיע, בודק את הלוח ואת הקו ומוסר דוח כתוב. בלי עלות ובלי התחייבות.</p></article>
<figure class="tile card t-photo reveal" style="--i:2"><img src="${IMG}install.webp" width="1200" height="1067" alt="חשמלאי עם משקפי מגן מחבר כבלים בקופסת חיבורים על קיר לבן" loading="lazy" decoding="async"><figcaption class="cap">בדיקת הלוח לפני ההצעה</figcaption></figure>
<article class="tile card soft t-num reveal" style="--i:1"><span class="kick"><i></i>עד ההצעה</span><p class="fig"><span class="stat">3</span><span class="unit">ימים</span></p><p class="t-p">עד שההצעה הכתובה מגיעה לוועד</p><p class="micro">נתון לדוגמה</p></article>
<article class="tile card t-step reveal" style="--i:2"><span class="kick"><i></i>שלב 2</span><h3>הצעה כתובה לוועד</h3><p class="t-p">מסמך אחד: מה מותקן, מי משלם, ומה קורה כשדייר עובר דירה.</p></article>
<article class="tile card t-gives w2 reveal" style="--i:0"><span class="kick"><i></i>מה הדייר מקבל</span><ul class="gives">${li(I.receipt, "דף חודשי עם כל טעינה והסכום שלה")}${li(I.bell, "הודעה בטלפון כשהטעינה נגמרת")}${li(I.wallet, "חשבון על שמו, בלי להעביר כסף דרך הוועד")}</ul></article>
<article class="tile card soft t-sup reveal" style="--i:1"><span class="kick"><i></i>תמיכה בוואטסאפ</span><p class="sup-big"><span class="dot on" data-sup-dot></span><span data-sup-t>עונים עכשיו</span></p><p class="t-p">ראשון עד חמישי <span class="nw">08:00 עד 20:00</span>, שישי עד <span class="nw">13:00</span></p></article>
<article class="tile card acc t-cta reveal" style="--i:2"><h3>מתחילים בבדיקת תשתית</h3><p class="t-p">היא בלי עלות</p><a class="btn on-acc sm" href="#s10-visit">לבדיקה${I.arrow}</a></article>
</div></section>

<section class="visit" id="s10-visit" data-cta-end aria-labelledby="s10-vs-h"><div class="vpanel reveal">
<div class="v-body">
<div class="head"><span class="kick"><i></i>בדיקת בניין</span><h2 id="s10-vs-h">בודקים את הבניין שלכם</h2><p class="lead">משאירים שם וטלפון ואומרים כמה חניות יש. חוזרים אליכם תוך יום עבודה עם תשובה על הלוח, על ההספק ועל המחיר.</p></div>
<form class="form" novalidate>
<div class="row">
<div class="fld"><label for="s10-name">שם מלא</label><input class="in" id="s10-name" name="name" autocomplete="name" required aria-describedby="s10-name-m"><span class="msg" id="s10-name-m">${I.alert}איך נקרא לכם?</span></div>
<div class="fld"><label for="s10-tel">טלפון</label><input class="in" id="s10-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s10-tel-m"><span class="msg" id="s10-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<fieldset><legend class="legend">כמה חניות יש בבניין?</legend><div class="opts">
<label class="opt"><input type="radio" name="spots" value="10" checked><span>עד 10</span></label>
<label class="opt"><input type="radio" name="spots" value="40"><span>11 עד 40</span></label>
<label class="opt"><input type="radio" name="spots" value="41"><span>יותר מ-40</span></label>
</div></fieldset>
<div class="form-foot"><button class="btn" type="submit">לקבל בדיקה</button><p class="micro">הטלפון משמש רק לחזרה אליכם.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="tick">${I.check}</span><h3>קיבלנו</h3><p class="lead">חוזרים אליכם תוך יום עבודה.</p></div>
<p class="alt">${I.phone}<span>או להתקשר:</span><a href="tel:+97235550188" dir="ltr">03-555-0188</a></p>
</div>
<figure class="v-photo"><img src="${IMG}wallbox.webp" width="1000" height="1500" alt="עמדת טעינה לבנה על קיר, עם הידית השחורה תלויה במקומה ואור כחול קטן" loading="lazy" decoding="async"></figure>
</div></section>
</main>

<footer class="ft"><div class="ft-top">
<div class="ft-brand"><a class="hd-logo" href="#s10-top" aria-label="זרם, לראש הדף">${I.mark}<span>זרם</span></a><p>מתכננים, מתקינים ומנהלים עמדות טעינה לרכב חשמלי בבניינים משותפים. העסק, המספרים והציטוטים בעמוד הזה הם דוגמה.</p></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s10-how">איך זה עובד</a><a href="#s10-lot">החניון החי</a><a href="#s10-offer">מה כלול</a><a href="#s10-visit">בדיקת בניין</a></div>
<div class="ft-col"><p class="ft-h">ליצירת קשר</p><a href="tel:+97235550188" dir="ltr">03-555-0188</a><a href="mailto:hello@zerem.example">hello@zerem.example</a><address>רחוב הסדנה 9, חולון</address></div>
<div class="ft-col"><p class="ft-h">שעות פעילות</p><span>ראשון עד חמישי, 08:00 עד 20:00</span><span>שישי, 08:00 עד 13:00</span></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> זרם</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
<div class="ft-word" aria-hidden="true">זרם</div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
// reduced-motion: reveal ופתיחה כבויים; הספירה נשארת (טקסט שמשתנה, לא תנועה). במנוחה אין כתיבה ל-DOM כלל.
const JS = `(function(){var root=document.querySelector(".sk-s10");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return(r||q).querySelector(s)}function $$(s,r){return[].slice.call((r||q).querySelectorAll(s))}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
/* הדר: headroom */
var hd=$(".hd"),top=document.querySelector(".vtop"),lastTop=-1,hidden=false,lastY=window.scrollY,acc=0;
function place(){if(!hd||!top)return;var s=getComputedStyle(top),v=s.position==="sticky"&&s.display!=="none"?top.offsetHeight:0;if(v!==lastTop){lastTop=v;hd.style.top=v+"px"}}
function setHidden(v){if(v===hidden)return;hidden=v;hd.classList.toggle("is-hidden",v)}
function onScroll(){place();var y=window.scrollY,d=y-lastY;lastY=y;if(y<=96){acc=0;setHidden(false);return}
acc=(d>0)===(acc>0)?acc+d:d;if(acc>6)setHidden(true);else if(acc<-6)setHidden(false)}
if(hd){window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",place);hd.addEventListener("focusin",function(){setHidden(false)});place()}
/* שעון ישראל: התמיכה, והחניון העכשווי בכרטיס ההירו */
function il(){try{var o={};new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});
return{d:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],m:(+o.hour%24)*60+(+o.minute)}}catch(e){return null}}
var LOT=${JSON.stringify(CLIENT)};
var n=il();
if(n){var HRS={0:[480,1200],1:[480,1200],2:[480,1200],3:[480,1200],4:[480,1200],5:[480,780]},DAY=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
function ft(m){var h=Math.floor(m/60),mm=m%60;return(h<10?"0":"")+h+":"+(mm<10?"0":"")+mm}
var h=HRS[n.d],open=!!h&&n.m>=h[0]&&n.m<h[1],txt;
if(open){txt="עונים עכשיו, עד "+ft(h[1])}else{var k,dd,hh;for(k=0;k<8;k++){dd=(n.d+k)%7;hh=HRS[dd];if(hh&&(k>0||n.m<hh[0]))break}
txt="חוזרים "+(k===0?"היום":k===1?"מחר":"ביום "+DAY[dd])+" ב-"+ft(HRS[dd][0])}
var st=$("[data-sup-t]"),sd=$("[data-sup-dot]");if(st)st.textContent=txt;if(sd)sd.classList.toggle("on",open);
var hour=Math.floor(n.m/60),si=hour>=5&&hour<11?0:hour>=11&&hour<17?1:hour>=17&&hour<22?2:hour===22&&n.m%60<30?2:3;
var S=LOT.slots[si],ln=$("[data-live-n]"),pp=$("[data-live-pips]");
if(ln&&pp&&si!==${DEFAULT_SLOT}){ln.textContent=S.nC;pp.innerHTML=S.bays.map(function(b){return'<i class="pip is-'+b.c+'"></i>'}).join("")}}
/* reveal פעם אחת */
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* מונים */
function count(b){var t=+b.dataset.count,step=Math.max(1,Math.round(t/28)),v=0;b.textContent="0";
var id=setInterval(function(){v+=step;if(v>=t){v=t;clearInterval(id)}b.textContent=v.toLocaleString("he-IL")},24)}
var nums=$$("[data-count]");
if(nums.length&&"IntersectionObserver" in window){var cio=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;count(x.target);cio.unobserve(x.target)})},{threshold:.6});nums.forEach(function(b){cio.observe(b)})}
/* החניון החי: בורר שעה, בחירת חניה, והגעה בדירוג */
var lot=$("[data-lot]"),bays=$$("[data-bay]"),det=$("[data-detail]"),used=$("[data-pw-used]"),pbs=$$(".pb"),slot=${DEFAULT_SLOT},sel=${DEFAULT_BAY};
function swap(){if(rm||!det)return;det.classList.remove("is-swap");void det.offsetWidth;det.classList.add("is-swap")}
function paint(){var S=LOT.slots[slot];
bays.forEach(function(el,i){var b=S.bays[i];el.className="tile card bay is-"+b.c+(i===sel?" is-sel":"")+" reveal is-in";el.style.setProperty("--p",b.p);el.setAttribute("aria-label",b.l);el.setAttribute("aria-pressed",String(i===sel));$(".b-state",el).textContent=b.s});
pbs.forEach(function(el,i){var b=S.bays[i];el.style.setProperty("--p",b.p);$(".pk",el).textContent=b.k});
if(used)used.textContent=S.used;
det.innerHTML=S.bays[sel].d}
if(lot&&det){bays.forEach(function(el){el.disabled=false});
$$("[data-slot]").forEach(function(b){b.addEventListener("click",function(){var i=+b.dataset.slot;if(i===slot)return;slot=i;$$("[data-slot]").forEach(function(x){x.setAttribute("aria-pressed",String(+x.dataset.slot===slot))});paint();swap()})});
bays.forEach(function(el){el.addEventListener("click",function(){var i=+el.dataset.bay;if(i===sel)return;sel=i;paint();swap()})});
if(!rm&&"IntersectionObserver" in window){lot.classList.add("is-pre");
var lo=new IntersectionObserver(function(en){if(!en[0].isIntersecting)return;lo.disconnect();lot.classList.add("is-arr");lot.classList.remove("is-pre");setTimeout(function(){lot.classList.remove("is-arr")},1800)},{threshold:.35});lo.observe(lot)}}
/* טופס הבדיקה */
var form=$(".form"),vp=$(".vpanel");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/\\D/g,"").length>=9);
if(bad){bad.focus();return}vp.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Bento", group: "שפות נוספות",
  when: "מוצר ו-SaaS, חברות שירות מודרניות, סטודיו, עמוד יכולות ו'למה אנחנו': כל מקום שהקורא סורק מפה ולא קורא זרם, ושיש בו כמה סוגי מידע (מסר, מספר, צילום, מצב חי, ציטוט, גרף) שכדאי להניח זה לצד זה. עובד עם צילום אמיתי ועם נתונים אמיתיים.",
  no: "תוכן נרטיבי ארוך שצריך זרימה, מאמרים ובלוג, עסק עם מסר אחד פשוט, ועסק שאין לו שום נתון אמיתי להציג: אריח גרף או מספר בלי נתון אמיתי הוא דשבורד מזויף.",
  recipe: `קרקע: בטון #E6E7E4 · אריח לבן #fff (המשטח היחיד עם צל, ורק בהובר ובהדר) · אריח רך #F1F1EE (הובר #E7E7E3)
דיו: אספלט #15171A (הובר #0D0F11) · muted #585D64 (6.6 על לבן, 5.3 על הקרקע)
מבטא יחיד: סגול חשמלי #5B3DF5 (לבן עליו 6.1) · הובר #4A2DDB · טקסט סגול #4B2FD0 (8.0 על לבן) · גוון #EAE6FF (הובר #DDD6FF) · על דיו #A99BFF (7.5). דיו על סגול נופל (2.9), ולכן תמיד לבן
לוח: 4 עמודות · שורות minmax(var(--u),auto) כש-u = clamp(150px, min(17cqi,21svh), 220px) · gap clamp(14px,1.5cqi,24px) · padding אריח clamp(20px,2cqi,32px) · רדיוס אריח 28 (24 בטלפון) · כפתור 16 · צ'יפ 12 · מעל 1023 עמודות 2, מפת span מוצהרת
Google Sans בלבד: 600 כותרות ומספרים, 500 תוויות ופעולות, 400 גוף · H1 56 (clamp(32px,min(4cqi,6.4svh),56px))/1.1/-.015em · H2 40 · H3 24 · ליד 18 · גוף 16 · תווית 13/500 · סטט 96/-.03em · בלי ריווח חיובי
תנועה: reveal 16px/0.5s, סטאגר 70ms בתוך שורה, פתיחה 0.6s, מילוי עמדה 0.6s, headroom 0.4s · ease cubic-bezier(.2,.6,.2,1)`,
  apply: "כל העמוד מפה: גם ההדר הוא שלושה אריחים צפים (לוגו, ניווט, פעולה). ההירו הוא לוח של שבעה אריחים בגדלים סגורים, עם אריח הצהרה 2×2, צילום 1×2, מספר על דיו, מצב חי, ציטוט, גרף ואריח פעולה בסגול; הלוח נסגר בלי חור. לוח אחד על כל סקשן מרכזי, ובין לוחות נשימה שאינה בנטו (מספרים על הקרקע, משפט עם צילום). כל אריח תפקיד אחד, שני שכנים לא מאותו סוג, ודיו אחד וסגול אחד לכל היותר בלוח. אריח תמונה הוא התמונה, והתווית שלו על שכבת דיו. הפרדה רק ברווח ובמשטח: אפס קווים ומסגרות.",
  sig: "'החניון החי': לוח שבו כל אריח הוא חניה. כשמגיעים אליו החניות מתעוררות בדירוג, בורר שעה משנה את כל המפה, ולחיצה על חניה פותחת אריח פירוט גדול על דיו, כשאריח הספק קטן מראה איך הבניין מחלק 22 קילוואט בין מי שמחובר · הצהרה על אריח 2×2 וצילום גבוה 1×2 שחולקים את שורת הפתיחה · אריח הפעולה בסגול ואריח המספר על דיו, שניהם סגורים בלוח.",
  avoid: "כל התאים באותו גודל וסוג (זה גריד כרטיסים מחופש) · גובה שורה קבוע, כי תוכן נחתך בגדלי הביניים (רוני סאיג V3) · כרטיס בתוך אריח · קו, גבול או border-top צבעוני · צל על אריח צבוע, בו ההובר הוא גוון כהה יותר · יותר משלושה לוחות בעמוד, או לוחות בלי נשימה ביניהם · אריח גרף או מספר בלי נתון אמיתי (כאן הנתונים מסומנים כדוגמה) · שני אריחי דיו או שני אריחי מבטא בלוח אחד.",
  qa: ["רק ארבעה גדלי אריח, והלוח נסגר בלי חור בדסקטופ, בטאבלט ובטלפון", "שורות minmax(var(--u),auto): אף אריח לא חותך טקסט או כפתור ב-1920, 1440, 1366x768, 1280, 1024, 768, 500, 390 ו-360, וגם אחרי בחירת שעה וחניה", "דיו אחד ומבטא אחד לכל היותר בלוח, ושני שכנים לעולם לא מאותו סוג", "אין קו, גבול או צל על אריח צבוע; ההפרדה ברווח ובמשטח", "AA על כל תווית שעל צילום (שכבת דיו) ועל טקסט על סגול (לבן בלבד)", "מפת ה-span בטלפון כתובה במפורש, והצילום הגבוה לא נשאר לבד", "כל נתון מסומן כדוגמה; reveal ב-keyframes, וכל התנועה נעצרת ב-reduced-motion"],
  engine: "ניגודיות (נמדד 6.10.2026): muted על לבן 6.6, על רך 5.9, על הקרקע 5.3, על גוון סגול 5.5 ועל גוון כהה 4.8 · טקסט סגול #4B2FD0 על לבן 8.0 ועל גוון 6.6 · לבן על #5B3DF5 6.1, על #4A2DDB 7.8 · סגול בהיר על דיו 7.5. הבחירה בחניה היא אריח סגול מלא, כדי שלא יהיה בה קו או טבעת. הצילומים בגריידינג אחד (רוויה 90%, צללים סגולים-דיו), כל אחד בגודל לפחות פי 1.5 מגודלו על המסך. הנתונים של החניון כתובים ב-HTML במצבם הראשון, ולכן הכל נראה בלי JS; במנוחה אין כתיבה ל-DOM.",
  agent: "עצב בסגנון בנטו כמפת אריחים: כל סקשן מרכזי הוא לוח של ארבע עמודות עם אריחים בגדלים סגורים (1×1, 2×1, 1×2, 2×2), שורות בגובה מינימלי לפי תוכן ולא גובה קבוע, gap ורדיוס אחידים, אריח גיבור אחד וכל אריח בתפקיד אחד (מסר, מספר, צילום, מצב חי, ציטוט, גרף). קרקע אפורה-בטון, אריחים לבנים, אריח דיו אחד ואריח מבטא אחד לכל לוח. בלי קווים ומסגרות, בלי צל על אריח צבוע, ובין לוחות נשימה שאינה בנטו. רגע חתימה: אריח או לוח שחי ומגיב.",
  mobile: "ההדר: הניווט נעלם ונשארים אריח הלוגו ואריח הפעולה (44px). הלוחות נשברים לשתי עמודות עם span מוצהר: ההצהרה, הציטוט ואריחי הפירוט והמחיר ברוחב מלא, הצילום הגבוה נשאר לצד שני אריחים, ושורות הלוח גדלות לפי התוכן. בורר השעה ברוחב מלא, ארבע החניות הראשונות ואחריהן אריח ההספק. כפתורי ההירו ברוחב מלא. בלוק הבדיקה: הצילום עולה מעל הלוח, והטופס בעמודה אחת עם בחירות של 44px.",
  fonts: [],
};

export default [
  {
    ...base,
    id: "s10", name: "בנטו גריד",
    desc: "מפה של אריחים בגדלים סגורים: אריח אחד לכל תפקיד (מסר, מספר, צילום, מצב חי, ציטוט, גרף), דיו אחד וסגול אחד בכל לוח, ואפס קווים. כאן כעמוד אמיתי של חברת טעינה לבניינים (דמיונית), עם 'חניון חי' שבו כל אריח הוא חניה.",
    score: "30/30",
    note: "רף הסטודיו: 30/30, כל שבעת ה-★ עוברים. הכלי מדד 20 סעיפים וכולם עברו; סעיף 8 (סולם ריווח) נשאר 'לעין' רק בגלל שלושה ערכים נוזליים של clamp (מרווח הלוח, ריפוד האריח, שוליים), ושבעה סעיפי עין (8, 10, 11, 12, 17, 26, 30) נבדקו בצילומים בגודל אמיתי; 7, 15 ו-22 לא חלים כפי שהכלי קורא אותם. מתח H1/גוף 51/15 = 3.4 · שלושה משקלים (600 כותרות ומספרים, 500 תוויות ופעולות, 400 גוף) · תזמונים 120 עד 1200ms ו-reveal אחד של 500ms · טיפול תמונה אחד (רדיוס 28, גריידינג אחד) · אפס קווים ומסגרות, צל רק על אריח לבן, ובהובר אריח צבוע מקבל גוון כהה יותר · הדר של שלושה אריחים עם headroom ופוטר יריעה כהה (483px). נמדד גם: אף אריח לא חותך טקסט או כפתור ב-11 גדלים (1920 עד 360, כולל 1366x768, 1024x768 ושני הכיוונים של 1024) וגם אחרי כל אחד מ-24 המצבים של בורר השעה ובחירת החניה; אפס כתיבות ל-DOM במנוחה; reduced-motion מכבה כל תנועה; כל התוכן נראה בלי JS. רגע החתימה: 'החניון החי', לוח שבו כל אריח הוא חניה. העסק דמיוני: 'זרם', עמדות טעינה לרכב חשמלי בבניינים משותפים. כל המספרים, הציטוטים, הכתובת והטלפון דוגמה, ומסומנים כך בעמוד. הצילומים סטוק של Magnific בגריידינג אחד (רוויה 90%, צללים סגולים-דיו): resident (26147052), install (22148605), lot-paint (29382452), wallbox (13104874); כולם ברישיון חינמי, 160 קרדיטים בסך הכל. בדוק: גלול אל 'החניון החי' וראה את החניות מתעוררות בדירוג, בחר שעה ולחץ על חניה, עבור עם העכבר על אריחים, שנה את רוחב החלון ובדוק שאף אריח לא חותך את התוכן שלו.",
    css: CSS, html: HTML, js: JS,
  },
];
