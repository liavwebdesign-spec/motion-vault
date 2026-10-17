// S02 · נאומורפיזם, עמוד הייחוס בגרסה 2 (15.10.2026). נבנה מחדש כעמוד אמיתי, לפי המודל של s14 ו-s05.
//
// מה זה: העסק הדמיוני "נימה", חוגת קיר אחת למזגנים ולחימום הרצפה בבית ישראלי. אין כאן לקוח אמיתי; הצילומים הם סטוק (ראו ids בשדה note).
// הפונט: Google Sans בלבד, מקומי. האופי בא מצבע, ממשטח, מצל כפול, מצילום ומתנועה, לא מפונט תצוגה.
// הגרסה הבוגרת של השפה: עומק נאומורפי רק על בקרים ועל כמה עצמים מרכזיים (החוגה, בוחרי המצב, המתגים, השדות, כפתור הלחיצה).
// טקסט, מספרים וכפתור הפעולה נשארים בניגודיות מלאה; מצב פעיל נקרא בצבע ובאייקון ובטקסט, לא רק בצל.
// המבנה: הדר שטוח על הקרקע · הירו עם צילום שטוח ובאר שקוע · מדדים בטבעות שקועות וביקורות על רצועה בהירה · "לוח הבקרה" (רגע החתימה: חוגה עובדת
// עם מקלדת ו-ARIA, בוחרי חדר ומצב, מתגים, ומצב "לא זמין" שטוח עם מנעול) · ההערכות בטאבים · בלוק הזמנה שקט עם שדות שקועים · פוטר על הקרקע.
// מנוע: ease החתום, reveal ב-keyframes 16px/0.5s, reduced-motion מכבה הכל, הכל נראה בלי JS.

const EASE = "cubic-bezier(.2,.6,.2,1)";

// ───────── אייקונים: משפחה אחת, stroke 1.7, 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  mark: svg("", `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V8.5"/>`),
  arrow: svg(" s", `<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  pin: svg(" s", `<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`),
  clock: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  phone: svg(" s", `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`),
  flame: svg(" s", `<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>`),
  flameL: svg("", `<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>`),
  snow: svg("", `<path d="M12 3v18"/><path d="M4.2 7.5l15.6 9"/><path d="M19.8 7.5l-15.6 9"/>`),
  auto: svg("", `<path d="M20 12a8 8 0 0 1-14 5.3"/><path d="M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/>`),
  power: svg("", `<path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>`),
  moon: svg(" s", `<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>`),
  floor: svg(" s", `<path d="M3 8c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/><path d="M3 13c2-2 4 2 6 0s4 2 6 0 4 2 6 0"/><path d="M3 18h18"/>`),
  home: svg(" s", `<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>`),
  minus: svg("", `<path d="M6 12h12"/>`),
  plus: svg("", `<path d="M12 6v12"/><path d="M6 12h12"/>`),
  lock: svg(" s", `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`),
  lockL: svg("", `<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`),
  check: svg(" s", `<path d="M20 6 9 17l-5-5"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>`),
  sofa: svg(" s", `<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M5 18v2M19 18v2"/>`),
  bed: svg(" s", `<path d="M3 18V7"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>`),
  kids: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>`),
  dial: svg("", `<circle cx="12" cy="12" r="8"/><path d="m12 12 3-4.2"/>`),
  sensor: svg("", `<path d="M12 4a4 4 0 0 0-4 4v6a4 4 0 1 0 8 0V8a4 4 0 0 0-4-4z"/><path d="M12 9v6"/>`),
  module: svg("", `<rect x="4" y="6" width="16" height="12" rx="3"/><path d="M8 10v4M12 10v4M16 10v4"/>`),
};

// ───────── ביקורות לדוגמה ─────────
const REVIEWS = [
  ["גלית סגל", "רמת גן", "נרדמים בחדר קריר ומתעוררים בחדר נעים. אני לא נוגעת בשלט כבר חודש, והילדה כבר אומרת שהחוגה היא של המשפחה."],
  ["אורן בן דוד", "מודיעין", "ארבעה מזגנים וארבעה שלטים, ועכשיו חוגה אחת ליד הכניסה. אשתי ואני מכוונים לפי הסלון והשאר מסתדר לבד."],
  ["רותם וקנין", "חיפה", "הרצפה בחדר הרחצה מתחממת חצי שעה לפני שאנחנו קמים. החשבון של החשמל ירד כבר בחודש הראשון."],
];
const rv = r => `<figure class="rv reveal"><blockquote>${r[2]}</blockquote><figcaption><b>${r[0]}</b><span>${r[1]}</span></figcaption></figure>`;

// ───────── המדדים: שלוש טבעות שקועות (נתונים לדוגמה) ─────────
const GAUGES = [
  [18, "%", "פחות חשמל בחודש חם", "ממוצע בבתי הדגמה", 18],
  [94, "%", "מהלילות בלי לגעת בשלט", "אחרי שבוע של לימוד הרגלים", 94],
  [1, "", "חוגה אחת במקום ארבעה שלטים", "בדירה עם ארבעה מזגנים", 25],
];
const gaugeHtml = (g, i) => `<figure class="gauge reveal" style="--i:${i}"><div class="g-ring" role="img" aria-label="${g[0]}${g[1] ? " אחוז" : ""}: ${g[2]}"><svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle class="g-trk" cx="60" cy="60" r="46"/><circle class="g-arc" cx="60" cy="60" r="46" pathLength="100" transform="rotate(-90 60 60)" style="--v:${g[4]}"/></svg><span class="g-num" aria-hidden="true"><span dir="ltr" data-count="${g[0]}">${g[0]}</span>${g[1] ? `<small>${g[1]}</small>` : ""}</span></div><figcaption><b>${g[2]}</b><span>${g[3]}</span></figcaption></figure>`;

// ───────── ההערכות ─────────
const KITS = [
  ["דירה קטנה", "עד שני חדרים, מזגן אחד או שניים", "890", [["dial", "נימה דיסק", "החוגה על הקיר, עם מסך מגע וגלגל פיזי, בלי שלטים נוספים", 1], ["sensor", "חיישן חדר", "מודד טמפרטורה ותנועה ומדווח לדיסק, כדי שהמזגן לא יכוון לפי הקיר שליד הדלת", 1], ["module", "מודול רצפה", "מתחבר לצנרת חימום הרצפה ומחמם חצי שעה לפני שקמים", 0]]],
  ["דירה", "שלושה עד ארבעה חדרים, שניים עד ארבעה מזגנים", "1,490", [["dial", "נימה דיסק", "החוגה על הקיר, עם מסך מגע וגלגל פיזי, בלי שלטים נוספים", 1], ["sensor", "חיישן חדר", "מודד טמפרטורה ותנועה ומדווח לדיסק, כדי שהמזגן לא יכוון לפי הקיר שליד הדלת", 3], ["module", "מודול רצפה", "מתחבר לצנרת חימום הרצפה ומחמם חצי שעה לפני שקמים", 1]]],
  ["בית פרטי", "שתי קומות, חמישה מזגנים ומעלה", "2,790", [["dial", "נימה דיסק", "חוגה בכל קומה, והשתיים מדברות זו עם זו", 2], ["sensor", "חיישן חדר", "חיישן לכל חדר, כדי שכל חדר ינוהל לפי החדר עצמו", 6], ["module", "מודול רצפה", "מודול לכל מעגל חימום, בקומה ובחדרי הרחצה", 3]]],
];
const kitItem = k => k[3]
  ? `<li class="reveal">${I[k[0]]}<div><h4>${k[1]}</h4><p>${k[2]}</p></div><span class="k-q" dir="ltr">× ${k[3]}</span></li>`
  : `<li class="off">${I.lock}<div><h4>${k[1]}</h4><p>לא כלול בערכה הזאת. אפשר להוסיף בהזמנה.</p></div><span class="k-q">לא כלול</span></li>`;
const kitPanel = (k, i) => `<div class="panel" role="tabpanel" id="s02-kp${i}" aria-labelledby="s02-kt${i}"><h3 class="pn-h">${k[0]}</h3><p class="pn-sub">${k[1]}</p><ul class="kit">${k[3].map(kitItem).join("")}</ul><div class="kit-price"><small>מחיר לדוגמה, כולל התקנה</small><b dir="ltr">${k[2]} ₪</b></div></div>`;
const kitTab = (k, i) => `<button class="ch tab" type="button" role="tab" id="s02-kt${i}" aria-controls="s02-kp${i}" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}"><span class="t" data-t="${k[0]}">${k[0]}</span>${I.check.replace('class="ico s"', 'class="ico s tick"')}</button>`;

// ───────── CSS ─────────
const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
.cwrap{container-type:inline-size;overflow-x:clip}
.q{--g:#DCE3E6;--g-h:#D3DBDF;--g2:#E8EDEF;--g3:#CBD4D9;--ink:#1F2A33;--mut:#4A5963;--ember:#C2410C;--ember-d:#A8370A;--ember-t:#A8370A;--on-ember:#FFFFFF;--err:#B3261E;--ph:#4F5E68;
 --lt:rgba(255,255,255,.92);--dk:rgba(104,128,142,.46);--z:0 0 0 0 transparent;
 --sh-l:-12px -12px 28px var(--lt),12px 12px 28px var(--dk),inset 0 0 0 0 transparent,inset 0 0 0 0 transparent;
 --sh-m:-6px -6px 14px var(--lt),6px 6px 14px var(--dk),inset 0 0 0 0 transparent,inset 0 0 0 0 transparent;
 --sh-s:-3px -3px 8px var(--lt),3px 3px 8px var(--dk),inset 0 0 0 0 transparent,inset 0 0 0 0 transparent;
 --in-l:var(--z),var(--z),inset 9px 9px 20px var(--dk),inset -9px -9px 20px var(--lt);
 --in-m:var(--z),var(--z),inset 5px 5px 12px var(--dk),inset -5px -5px 12px var(--lt);
 --in-s:var(--z),var(--z),inset 3px 3px 7px var(--dk),inset -3px -3px 7px var(--lt);
 --flat:var(--z),var(--z),inset 0 0 0 0 transparent,inset 0 0 0 0 transparent;
 --r-photo:28px;--ease:${EASE};--sec:112px;--gut:clamp(20px,5cqi,72px);
 background:var(--g);color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.65;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q h4,.q p,.q ul,.q ol,.q figure,.q blockquote,.q address,.q fieldset,.q legend{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q fieldset{border:0;padding:0;min-width:0}
.q a{color:inherit;text-decoration:none}
.q address{font-style:normal}
.q img{display:block;max-width:100%}
.q button{font:inherit;color:inherit}
.q h1{font-size:clamp(34px,4.2cqi,52px);line-height:1.1;font-weight:500;letter-spacing:-.01em;text-wrap:balance}
.q h2{font-size:clamp(28px,3cqi,38px);line-height:1.18;font-weight:500;text-wrap:balance}
.q h3{font-size:20px;line-height:1.35;font-weight:500}
.q h4{font-size:17px;line-height:1.35;font-weight:500}
.q p{text-wrap:pretty}
.q .lead{font-size:17px;line-height:1.58;color:var(--mut);max-width:500px}
.q .micro{font-size:13px;line-height:1.45;color:var(--mut)}
.q .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;line-height:1;color:var(--ember-t)}
.q .num{font-variant-numeric:tabular-nums;unicode-bidi:isolate;white-space:nowrap}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block}
.q .ico.s{width:20px;height:20px}
.q .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;background:var(--g);color:var(--ink);padding:12px 20px;border-radius:999px;font-weight:500;box-shadow:var(--sh-m)}
.q .skip:focus{top:8px}
.q :is(a,button,summary,input,[tabindex]):focus-visible{outline:3px solid var(--ember-t);outline-offset:3px}
.q .btn:focus-visible,.q .ch:focus-visible,.q .rbtn:focus-visible,.q .sw:focus-visible{outline:3px solid var(--ember-t);outline-offset:3px}
/* כפתורים: ראשי מלא · משני בולט · שלישי טקסט וחץ */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:14px 28px;border:0;border-radius:999px;background:var(--ember);color:var(--on-ember);font-size:16px;font-weight:600;line-height:1;cursor:pointer;transition:background .18s var(--ease),transform .18s var(--ease),box-shadow .25s var(--ease);-webkit-tap-highlight-color:transparent;white-space:nowrap}
.q .btn:active{transform:scale(.98);transition-duration:.12s}
.q .btn.sm{min-height:44px;padding:10px 24px;font-size:15px}
.q .btn.n{background:var(--g);color:var(--ink);font-weight:500;box-shadow:var(--sh-m)}
.q .btn.n .ico{color:var(--ember-t)}
.q .btn.n:active{transform:none;box-shadow:var(--in-m)}
.q .lnk{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:12px 0;background:none;border:0;font-size:15px;font-weight:500;line-height:1;color:var(--ink);cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:6px;transition:color .15s var(--ease),text-decoration-color .15s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
@media (hover:hover) and (pointer:fine){
.q .btn:hover{background:var(--ember-d);transform:translateY(-2px)}
.q .btn.n:hover{background:var(--g-h);transform:none}
.q .lnk:hover{color:var(--ember-t);text-decoration-color:var(--ember-t)}
.q .lnk:hover .ico{transform:translateX(-4px)}
}
/* בוררים: בולט = אפשר ללחוץ · שקוע + צבע + וי = פעיל */
.q .ch{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:10px 20px;border:0;border-radius:999px;background:var(--g);color:var(--ink);font-size:15px;font-weight:500;line-height:1.1;cursor:pointer;box-shadow:var(--sh-m);transition:background .2s var(--ease),box-shadow .3s var(--ease),color .2s var(--ease);-webkit-tap-highlight-color:transparent}
.q .ch .ico:not(.tick){color:var(--ink);transition:color .2s var(--ease)}
.q .ch .t{display:inline-flex;flex-direction:column;align-items:center}
.q .ch .t::after{content:attr(data-t);height:0;visibility:hidden;overflow:hidden;font-weight:600}
.q .ch .tick{color:var(--ember-t);opacity:0;transition:opacity .2s var(--ease)}
.q .ch[aria-checked="true"],.q .ch[aria-selected="true"]{box-shadow:var(--in-m);color:var(--ember-t);font-weight:600}
.q .ch[aria-checked="true"] .ico:not(.tick),.q .ch[aria-selected="true"] .ico:not(.tick){color:var(--ember)}
.q .ch[aria-checked="true"] .tick,.q .ch[aria-selected="true"] .tick{opacity:1}
@media (hover:hover) and (pointer:fine){.q .ch[aria-checked="false"]:hover,.q .ch[aria-selected="false"]:hover{background:var(--g-h)}}
.q .ch:active{box-shadow:var(--in-m)}
/* שדות: שקועים. רגיל, focus, מלא, שגיאה (צבע + אייקון + טקסט), מושבת */
.q .fld{display:flex;flex-direction:column;gap:10px}
.q .fld label,.q .legend{font-size:14px;font-weight:500;line-height:1.2;color:var(--ink)}
.q .in{font:inherit;font-size:16px;line-height:1.2;min-height:52px;padding:14px 24px;border:0;border-radius:999px;background:var(--g);color:var(--ink);appearance:none;width:100%;box-shadow:var(--in-m);transition:box-shadow .25s var(--ease)}
.q .in::placeholder{color:var(--ph)}
.q .in:focus,.q .in:focus-visible{outline:3px solid var(--ember-t);outline-offset:3px}
.q .fld.err .in{outline:3px solid var(--err);outline-offset:0}
.q .fld .msg{display:none;align-items:center;gap:6px;font-size:13px;line-height:1.3;color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{box-shadow:var(--flat);background:var(--g-h);color:var(--mut)}
/* reveal: keyframes ולא transition. התוכן גלוי בלי JS; רק .js מסתיר */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:norev .5s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes norev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* פתיחת עמוד: ההדר יורד, הטקסט עולה, הצילום מופיע אחרון */
.q .hd{animation:nohd .7s ${EASE} both}
.q .oi{animation:noup .6s ${EASE} both}
.q .oi:nth-child(1){animation-delay:.1s}.q .oi:nth-child(2){animation-delay:.18s}.q .oi:nth-child(3){animation-delay:.26s}.q .oi:nth-child(4){animation-delay:.34s}.q .oi:nth-child(5){animation-delay:.42s}
.q .hero-vis{animation:novis .9s ${EASE} .2s both}
@keyframes nohd{from{opacity:0;translate:0 -14px}to{opacity:1;translate:0 0}}
@keyframes noup{from{opacity:0;translate:0 18px}to{opacity:1;translate:0 0}}
@keyframes novis{from{opacity:0;translate:0 36px}to{opacity:1;translate:0 0}}
/* תמונות: טיפול אחד. רדיוס 28, שטוחות על הקרקע בלי צל, אותו גריידינג קר שנאפה בקובץ */
.q .pic{overflow:hidden;border-radius:var(--r-photo);background:var(--g3)}
.q .pic img{width:100%;height:100%;object-fit:cover;border-radius:inherit;transition:transform .5s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .pic:hover img{transform:scale(1.03)}}
/* מבנה */
.q .wrap{max-width:1320px;margin-inline:auto}
.q .sec{padding:var(--sec) var(--gut)}
.q .head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:660px;margin-bottom:56px}
.q .head.c{align-items:center;text-align:center;margin-inline:auto}
.q .head.c .lead{margin-inline:auto}
.q section[id]{scroll-margin-top:88px}
/* הדר: שטוח על הקרקע, צל רק אחרי גלילה */
.q .hd{position:sticky;top:0;z-index:30;background:var(--g);transition:transform .4s var(--ease),box-shadow .3s var(--ease)}
.q .hd.is-scrolled{box-shadow:0 14px 24px -16px var(--dk)}
.q .hd.is-hidden{transform:translateY(-100%);box-shadow:none}
.q .hd-in{display:flex;align-items:center;gap:24px;max-width:1320px;height:80px;margin-inline:auto;padding-inline:var(--gut)}
.q .logo{display:inline-flex;align-items:center;gap:10px;min-height:44px;white-space:nowrap;font-size:22px;font-weight:600;line-height:1;color:var(--ink)}
.q .logo .ico{color:var(--ember)}
.q .hd nav{display:flex;gap:4px;margin-inline:auto}
.q .hd nav a{display:inline-flex;align-items:center;min-height:44px;font-size:15px;font-weight:500;line-height:1;color:var(--mut);padding:10px 16px;border-radius:999px;transition:background .15s var(--ease),color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .hd nav a:hover{background:var(--g-h);color:var(--ink)}}
/* הירו */
.q .hero{min-height:calc(100svh - 80px);display:flex;align-items:center;padding:24px var(--gut) 48px}
.q .hero-in{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:72px;align-items:center;width:100%;max-width:1320px;margin-inline:auto}
.q .hero-txt{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.q .hero h1{max-width:560px}
.q .ctas{display:flex;align-items:center;flex-wrap:wrap;gap:12px 28px;margin-top:8px}
.q .hero-vis{display:flex;flex-direction:column;gap:24px}
.q .hero-img{aspect-ratio:3/2;max-height:min(520px,calc(100svh - 280px));width:100%}
.q .hero-img img{object-position:40% 40%}
.q .well{display:flex;align-items:center;gap:14px;min-height:56px;padding:12px 28px;border-radius:999px;background:var(--g);box-shadow:var(--in-m);font-size:15px;line-height:1.3;color:var(--mut)}
.q .well .ico{color:var(--ember)}
.q .well b{font-weight:600;color:var(--ink)}
/* מדדים: טבעות שקועות */
.q .gauges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:48px;max-width:1040px;margin-inline:auto}
.q .gauge{display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center}
.q .g-ring{position:relative;width:clamp(136px,13cqi,168px);aspect-ratio:1;border-radius:50%;background:var(--g);box-shadow:var(--in-s);display:grid;place-items:center}
.q .g-ring svg{position:absolute;inset:11%;width:78%;height:78%}
.q .g-trk{fill:none;stroke:var(--g3);stroke-width:9}
.q .g-arc{fill:none;stroke:var(--ember);stroke-width:9;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:calc(100 - var(--v));transition:stroke-dashoffset 1s var(--ease)}
.q.js .gauge:not(.is-in) .g-arc{stroke-dashoffset:100}
.q .g-num{direction:ltr;position:relative;display:flex;align-items:baseline;gap:4px;font-size:40px;line-height:1;font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}
.q .g-num small{font-size:18px;font-weight:500;color:var(--mut)}
.q .gauge figcaption{display:flex;flex-direction:column;gap:4px;max-width:240px}
.q .gauge figcaption b{font-size:17px;font-weight:500;line-height:1.35}
.q .gauge figcaption span{font-size:14px;line-height:1.4;color:var(--mut)}
.q .proof-note{text-align:center;margin-top:40px}
/* ביקורות: רצועה בהירה, טקסט שטוח בלי כרטיסים */
.q .proof{padding-bottom:0}
.q .band{margin-top:72px;padding:88px var(--gut);border-radius:56px;background:var(--g2)}
.q .rvs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:56px;max-width:1240px;margin-inline:auto}
.q .rv{display:flex;flex-direction:column;gap:20px}
.q .rv blockquote{font-size:19px;line-height:1.6;color:var(--ink)}
.q .rv figcaption{display:flex;flex-direction:column;gap:4px}
.q .rv figcaption b{font-size:15px;font-weight:600;line-height:1.3}
.q .rv figcaption span{font-size:14px;line-height:1.3;color:var(--mut)}
.q .band .micro{max-width:1240px;margin:48px auto 0}
/* לוח הבקרה: רגע החתימה */
.q .ctrl-grid{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:96px;align-items:start;max-width:1200px;margin-inline:auto}
.q .dial-col{display:flex;flex-direction:column;align-items:center;gap:40px;position:sticky;top:112px}
.q .dial{position:relative;width:clamp(272px,34cqi,400px);aspect-ratio:1;border-radius:50%;background:var(--g);box-shadow:var(--sh-l);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;transition:box-shadow .5s var(--ease);-webkit-tap-highlight-color:transparent}
/* in a phone the dial is most of the screen width: vertical swipes scroll the page, a sideways drag turns the dial, + and - stay for exact steps (17.10.2026) */
@media (pointer:coarse){.q .dial{touch-action:pan-y}}
.q .dial.drag{cursor:grabbing}
.q .dial.is-off{box-shadow:var(--flat);cursor:default}
.q .dial:focus-visible{outline-offset:6px}
.q .d-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.q .d-gd{fill:none;stroke:var(--g3);stroke-width:12;stroke-linecap:round}
.q .d-arc{fill:none;stroke:var(--ember);stroke-width:8;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:calc(100 - var(--p,0) * 100);transition:stroke-dashoffset .9s var(--ease),opacity .4s var(--ease)}
.q .dial.drag .d-arc,.q .dial.drag .d-thumb{transition:none}
.q .dial.is-off .d-arc{opacity:0}
.q .d-thumb{position:absolute;inset:0;rotate:calc(-135deg + var(--p,0) * 270deg);transition:rotate .9s var(--ease);pointer-events:none}
.q .d-thumb::after{content:"";position:absolute;left:50%;top:8%;width:11.5%;aspect-ratio:1;margin:-5.75% 0 0 -5.75%;border-radius:50%;background:radial-gradient(circle,var(--ember) 0 15%,var(--g) 16%);box-shadow:var(--sh-s);transition:box-shadow .5s var(--ease),background .5s var(--ease)}
.q .dial.is-off .d-thumb::after{background:var(--g-h);box-shadow:var(--flat)}
.q .d-face{position:absolute;inset:22%;border-radius:50%;box-shadow:var(--in-l);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;pointer-events:none;transition:box-shadow .5s var(--ease)}
.q .d-room{font-size:14px;font-weight:500;line-height:1.2;color:var(--mut)}
.q .d-val{display:flex;align-items:baseline;font-size:clamp(46px,6cqi,68px);line-height:1;font-weight:500;font-variant-numeric:tabular-nums;color:var(--ink)}
.q .d-val small{font-size:.42em;font-weight:500;color:var(--mut)}
.q .d-off{display:none;flex-direction:column;align-items:center;gap:8px;font-size:22px;font-weight:500;line-height:1;color:var(--mut)}
.q .dial.is-off .d-val{display:none}
.q .dial.is-off .d-off{display:flex}
.q .d-mode{display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:600;line-height:1.2;color:var(--ember-t)}
.q .dial.is-off .d-mode{display:none}
.q .d-end{position:absolute;top:91%;font-size:13px;font-weight:500;line-height:1;color:var(--mut);font-variant-numeric:tabular-nums;pointer-events:none}
.q .d-end.e1{left:15%}.q .d-end.e2{right:15%}
.q .steppers{display:flex;align-items:center;gap:20px;width:100%;max-width:420px}
.q .rbtn{display:grid;place-items:center;width:56px;height:56px;flex:none;border:0;border-radius:50%;background:var(--g);color:var(--ink);cursor:pointer;box-shadow:var(--sh-m);transition:background .2s var(--ease),box-shadow .25s var(--ease),color .2s var(--ease);-webkit-tap-highlight-color:transparent}
.q .rbtn:active{box-shadow:var(--in-m);color:var(--ember-t)}
.q .rbtn[aria-disabled=true]{background:var(--g-h);box-shadow:var(--flat);color:var(--mut);cursor:not-allowed}
.q .rbtn[aria-disabled=true]:active{box-shadow:var(--flat);color:var(--mut)}
@media (hover:hover) and (pointer:fine){.q .rbtn:hover{background:var(--g-h)}}
.q .steppers .well{flex:1;min-width:0;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:10px 16px;border-radius:28px;text-align:center}
.q .w-v{font-size:22px;line-height:1.1;font-variant-numeric:tabular-nums}
.q .w-k,.q .w-eta{font-size:13px;line-height:1.3}
.q .panel-col{display:flex;flex-direction:column;gap:48px}
.q .grp{display:flex;flex-direction:column;gap:16px}
.q .g-lbl{font-size:14px;font-weight:600;line-height:1.2;color:var(--ink)}
.q .pick{display:flex;flex-wrap:wrap;gap:16px}
.q .pick.modes{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
.q .pick.modes .ch{flex-direction:column;gap:8px;min-height:88px;border-radius:28px;padding:14px 8px}
.q .pick.modes .ch .tick{position:absolute;top:8px;inset-inline-end:8px;width:20px;height:20px;margin:0}
.q .pick:not(.modes) .ch .tick{margin-inline-start:-4px}
.q .pick.rooms .ch .tick,.q .tabs .ch .tick{margin-inline-start:-4px}
.q .sw-row{display:flex;align-items:center;gap:24px}
.q .sw-t{display:flex;flex-direction:column;gap:4px;min-width:0}
.q .sw-t span{font-size:16px;font-weight:500;line-height:1.35}
.q .sw-t small{font-size:14px;line-height:1.4;color:var(--mut)}
.q .sw{display:inline-flex;align-items:center;gap:14px;min-height:44px;min-width:132px;justify-content:flex-start;padding:0;background:none;border:0;cursor:pointer;-webkit-tap-highlight-color:transparent;flex:none}
.q .sw-trk{position:relative;width:70px;height:38px;flex:none;border-radius:999px;background:var(--g);box-shadow:var(--in-s);transition:background .3s var(--ease),box-shadow .3s var(--ease)}
.q .sw-knob{position:absolute;top:4px;inset-inline-start:4px;width:30px;height:30px;border-radius:50%;background:var(--g);box-shadow:var(--sh-s);display:grid;place-items:center;transition:translate .3s var(--ease),box-shadow .3s var(--ease),background .3s var(--ease)}
.q .sw-knob .ico{position:absolute;opacity:0;transition:opacity .2s var(--ease)}
.q .sw-knob .i-ck{color:var(--ember-t)}
.q .sw-knob .i-lk{color:var(--mut)}
.q .sw[aria-checked="true"] .sw-trk{background:var(--ember);box-shadow:var(--z),var(--z),inset 3px 3px 7px rgba(70,20,0,.45),inset -3px -3px 7px rgba(255,200,170,.3)}
.q .sw[aria-checked="true"] .sw-knob{translate:-32px 0}
.q .sw[aria-checked="true"] .i-ck{opacity:1}
.q .sw-st{font-size:15px;font-weight:600;line-height:1.1;color:var(--ink)}
.q .sw[aria-checked="true"] .sw-st{color:var(--ember-t)}
.q .sw.is-dis{cursor:not-allowed}
.q .sw.is-dis .sw-trk{background:var(--g-h);box-shadow:var(--flat)}
.q .sw.is-dis .sw-knob{background:var(--g-h);box-shadow:var(--flat)}
.q .sw.is-dis .i-lk{opacity:1}
.q .sw.is-dis .i-ck{opacity:0}
.q .sw.is-dis .sw-st{color:var(--mut);font-weight:500}
.q .legend-l{display:flex;flex-direction:column;gap:12px;font-size:14px;line-height:1.3;color:var(--mut)}
.q .legend-l li{display:inline-flex;align-items:center;gap:10px}
.q .sw-demo{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--g);flex:none}
.q .sw-demo.up{box-shadow:var(--sh-s)}
.q .sw-demo.dn{box-shadow:var(--in-s);color:var(--ember)}
.q .sw-demo.fl{background:var(--g-h);color:var(--mut)}

/* ההערכות */
.q .offer-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:88px;align-items:start;max-width:1320px;margin-inline:auto}
.q .of-body .head{margin-bottom:40px}
.q .tabs{display:none;flex-wrap:wrap;gap:16px;margin-bottom:40px}
.q.js .tabs{display:flex}
.q .panel[hidden]{display:none}
.q.js .pn-h{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.q .pn-h{margin-bottom:4px}
.q .pn-sub{font-size:16px;line-height:1.5;color:var(--mut);margin-bottom:28px}
.q .panel+.panel{margin-top:56px}
.q .kit{display:flex;flex-direction:column;gap:28px}
.q .kit li{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:16px;align-items:start}
.q .kit li .ico{margin-top:2px;color:var(--ember-t)}
.q .kit li div{display:flex;flex-direction:column;gap:4px}
.q .kit li p{font-size:15px;line-height:1.55;color:var(--mut);max-width:440px}
.q .k-q{font-size:15px;font-weight:600;line-height:1.5;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}
.q .kit li.off .ico,.q .kit li.off h4,.q .kit li.off .k-q{color:var(--mut)}
.q .kit li.off h4,.q .kit li.off .k-q{font-weight:500}
.q .kit-price{display:flex;flex-direction:column;gap:4px;margin-top:40px}
.q .kit-price small{font-size:14px;line-height:1.3;color:var(--mut)}
.q .kit-price b{font-size:44px;line-height:1.05;font-weight:600;color:var(--ember-t);font-variant-numeric:tabular-nums;align-self:flex-start}
.q .of-foot{display:flex;align-items:center;flex-wrap:wrap;gap:12px 28px;margin-top:32px}
.q .of-vis{display:flex;flex-direction:column;gap:16px;position:sticky;top:112px}
.q .of-vis .pic{aspect-ratio:1/1}
.q .of-vis .pic img{object-position:30% 50%}
/* הזמנה: שקט */
.q .visit{padding-bottom:var(--sec)}
.q .visit-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:88px;align-items:center;max-width:1240px;margin-inline:auto}
.q .v-body .head{margin-bottom:40px}
.q .form{display:flex;flex-direction:column;gap:28px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:16px 24px}
.q .ok{display:none;flex-direction:column;align-items:flex-start;gap:16px;padding:16px 0}
.q .ok .tick{width:64px;height:64px;border-radius:50%;background:var(--g);box-shadow:var(--sh-m);display:grid;place-items:center;color:var(--ember)}
.q .visit-grid.is-sent .form{display:none}
.q .visit-grid.is-sent .ok{display:flex}
.q .v-vis{align-self:end;margin-bottom:calc(-1 * (var(--sec) + 48px))}
.q .v-vis .pic{aspect-ratio:4/5}
/* פוטר: על הקרקע, בלי קווים */
.q .ft{padding:112px var(--gut) 40px;position:relative;overflow:hidden}
.q .ft-top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;max-width:1320px;margin-inline:auto;position:relative}
.q .ft-brand{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.q .ft-brand p{font-size:15px;line-height:1.6;color:var(--mut);max-width:300px}
.q .ft-col{display:flex;flex-direction:column;font-size:15px;line-height:1.6;color:var(--mut)}
.q .ft-col span:not(.ft-h),.q .ft-col address{padding-block:6px}
.q .ft-h{font-size:14px;font-weight:600;line-height:1.3;color:var(--ink);margin-bottom:8px}
.q .ft-col a,.q .ft-bot a{display:inline-block;padding-block:6px;color:var(--mut);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate;align-self:flex-start}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:var(--ember-d)}}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1320px;margin:48px auto 0;font-size:14px;color:var(--mut);position:relative}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
.q .ft-word{max-width:1320px;margin:48px auto 0;font-size:clamp(88px,20cqi,260px);font-weight:600;line-height:.95;color:var(--g);text-shadow:-5px -5px 12px var(--lt),5px 5px 12px var(--dk);text-align:center;user-select:none}
/* טאבלט ומובייל */
@container (max-width:1023px){
.q{--sec:88px}
.q .hd-in{gap:12px}
.q .hd nav a{padding:10px 12px}
.q .hero-in{gap:40px}
.q .ctrl-grid{grid-template-columns:1fr;gap:72px}
.q .dial-col{position:relative;top:auto}
.q .offer-grid{grid-template-columns:1fr;gap:64px}
.q .of-vis{position:relative;top:auto}
.q .of-vis .pic{aspect-ratio:16/10}
.q .visit-grid{grid-template-columns:1fr;gap:56px}
.q .v-vis{order:-1;margin-bottom:0}
.q .ft-top{grid-template-columns:1fr 1fr}
.q .ft-col a,.q .ft-bot a{padding-block:12px}
.q .rvs{gap:32px}
.q .band{padding-block:72px}
}
@container (max-width:767px){
.q{--sec:64px}
.q .hd nav{display:none}
.q .hd .btn.sm{margin-inline-start:auto}
.q .hd-in{height:72px}
.q .logo{font-size:21px}
.q .hero{min-height:calc(100svh - 72px);padding-block:16px 32px}
.q .hero-in{grid-template-columns:1fr;gap:24px}
.q .hero-txt{gap:16px}
.q .ctas{width:100%;flex-direction:column;align-items:stretch;gap:12px;margin-top:4px}
.q .ctas .btn{width:100%}
.q .ctas .lnk{justify-content:center}
.q .hero-vis{gap:16px}
.q .hero-img{aspect-ratio:16/9;max-height:22svh}
.q .well{padding:10px 20px;font-size:14px;min-height:48px}
.q .head{margin-bottom:40px}
.q .gauges{grid-template-columns:1fr;gap:56px}
.q .band{margin-top:56px;padding:56px var(--gut);border-radius:36px}
.q .rvs{grid-template-columns:1fr;gap:40px}
.q .rv blockquote{font-size:17px}
.q .pick.modes{grid-template-columns:repeat(2,minmax(0,1fr))}
.q .pick{gap:12px}
.q .sw-row{gap:16px}
.q .sw{min-width:112px}
.q .dial{width:min(76cqi,300px)}
.q .steppers{gap:12px}
.q .kit li{gap:12px}
.q .kit-price b{font-size:38px}
.q .form .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:56px}
.q .ft-top{grid-template-columns:1fr;gap:32px}
.q .ft-bot{margin-top:32px}
.q .ft-bot nav{gap:16px}
}
@media (prefers-reduced-motion:reduce){
.q.js .reveal{opacity:1}
.q .reveal.is-in,.q .hd,.q .oi,.q .hero-vis{animation:none}
.q .btn,.q .lnk,.q .lnk .ico,.q .ch,.q .ch .tick,.q .rbtn,.q .sw-trk,.q .sw-knob,.q .dial,.q .d-arc,.q .d-thumb,.q .d-thumb::after,.q .d-face,.q .g-arc,.q .pic img,.q .hd,.q .in{transition:none}
.q .btn:hover,.q .btn:active{transform:none}
.q .pic:hover img,.q .lnk:hover .ico{transform:none}
.q.js .gauge:not(.is-in) .g-arc{stroke-dashoffset:calc(100 - var(--v))}
}`;

// ───────── HTML ─────────
const IMG = "../assets/media/real/s02/";
const DIAL_PATH = "M40.6 159.4 A84 84 0 1 1 159.4 159.4";
const modeTile = (v, label, icon, checked) => `<button class="ch" type="button" role="radio" aria-checked="${checked}" tabindex="${checked ? 0 : -1}" data-v="${v}">${I[icon]}<span class="t" data-t="${label}">${label}</span>${I.check.replace('class="ico s"', 'class="ico s tick"')}</button>`;
const roomPill = (v, label, icon, checked) => `<button class="ch" type="button" role="radio" aria-checked="${checked}" tabindex="${checked ? 0 : -1}" data-v="${v}">${I[icon]}<span class="t" data-t="${label}">${label}</span>${I.check.replace('class="ico s"', 'class="ico s tick"')}</button>`;
const swRow = (k, id, name, hint, on, st) => `<div class="sw-row"><button class="sw" type="button" role="switch" aria-checked="${on}" aria-labelledby="s02-sw-${id}" data-k="${k}"><span class="sw-trk"><span class="sw-knob">${I.check.replace('class="ico s"', 'class="ico i-ck"')}${I.lock.replace('class="ico s"', 'class="ico i-lk"')}</span></span><span class="sw-st">${st}</span></button><div class="sw-t"><span id="s02-sw-${id}">${name}</span><small>${hint}</small></div></div>`;

const HTML = `<div class="cwrap sk-s02"><div class="q" id="s02-top">
<a class="skip" href="#s02-main">דילוג לתוכן</a>
<header class="hd"><div class="hd-in">
<a class="logo" href="#s02-top" aria-label="נימה, לראש הדף">${I.mark}<span>נימה</span></a>
<nav aria-label="ראשי"><a href="#s02-control">לוח הבקרה</a><a href="#s02-kits">ההערכות</a><a href="#s02-proof">ביקורות</a><a href="#s02-order">הזמנה</a></nav>
<a class="btn sm" href="#s02-order">להזמין נימה</a>
</div></header>
<main id="s02-main">
<section class="hero" aria-labelledby="s02-h1"><div class="hero-in">
<div class="hero-txt">
<span class="eyebrow oi">${I.mark.replace('class="ico"', 'class="ico s"')}חוגה אחת לקיר, למזגנים ולחימום הרצפה</span>
<h1 class="oi" id="s02-h1">לא צריך לקום בלילה בשביל המזגן</h1>
<p class="lead oi">נימה היא חוגה עגולה אחת על הקיר ששולטת בכל המזגנים ובחימום הרצפה בבית, ולומדת מתי המשפחה ישנה, מתעוררת וחוזרת הביתה.</p>
<div class="ctas oi"><a class="btn" href="#s02-order">להזמין נימה</a><a class="btn n" href="#s02-control">${I.dial.replace('class="ico"', 'class="ico s"')}לנסות את החוגה</a><a class="lnk" href="#s02-kits">מה יש בקופסה${I.arrow}</a></div>
</div>
<div class="hero-vis">
<figure class="pic hero-img"><img src="${IMG}hero-panel.webp" width="2200" height="1468" alt="אישה מחייכת בסוודר בז' נוגעת בלוח בקרה לבן שמורכב על קיר בהיר" fetchpriority="high" decoding="async"></figure>
<p class="well">${I.flame}<span>בסלון עכשיו <b class="num" dir="ltr">23.4°</b>, יעד <b class="num" dir="ltr">24°</b>. ערכים לדוגמה</span></p>
</div>
</div></section>

<section class="sec proof" id="s02-proof" aria-labelledby="s02-pf-h"><div class="wrap">
<div class="head c reveal"><span class="eyebrow">${I.mark.replace('class="ico"', 'class="ico s"')}מה משתנה בבית</span><h2 id="s02-pf-h">שבוע אחרי ההתקנה, השלט נשאר במגירה</h2><p class="lead">נימה מכוונת לפי החדר ולפי השעה, ואתם מתערבים רק כשבא לכם.</p></div>
<div class="gauges">${GAUGES.map(gaugeHtml).join("")}</div>
<p class="micro proof-note reveal">הנתונים לדוגמה, להמחשת השפה בלבד.</p>
</div>
<div class="band"><div class="rvs">${REVIEWS.map(rv).join("")}</div><p class="micro reveal">ביקורות לדוגמה: טקסטים להדגמה בלבד, לא של לקוחות אמיתיים.</p></div>
</section>

<section class="sec ctrl" id="s02-control" aria-labelledby="s02-ct-h"><div class="wrap">
<div class="head c reveal"><span class="eyebrow">${I.mark.replace('class="ico"', 'class="ico s"')}לוח הבקרה</span><h2 id="s02-ct-h">סובבו את החוגה ותראו מה קורה בבית</h2><p class="lead">זו חוגה שעובדת: גוררים אותה, לוחצים על הפלוס והמינוס או על החצים במקלדת. לכל חדר יש מצב משלו.</p></div>
<div class="ctrl-grid">
<div class="dial-col reveal">
<div class="dial" id="s02-dial" role="slider" tabindex="0" aria-label="טמפרטורת יעד בסלון" aria-valuemin="16" aria-valuemax="30" aria-valuenow="24" aria-valuetext="24 מעלות" aria-describedby="s02-dial-help" style="--p:.5714">
<svg class="d-svg" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><path class="d-gd" d="${DIAL_PATH}"/><path class="d-arc" pathLength="100" d="${DIAL_PATH}"/></svg>
<span class="d-thumb" aria-hidden="true"></span>
<div class="d-face" aria-hidden="true"><span class="d-room">יעד בסלון</span><div class="d-val" dir="ltr"><span class="d-int">24</span><small class="d-dec">.0°</small></div><div class="d-off">${I.lockL}<span>כבוי</span></div><span class="d-mode">${I.auto.replace('class="ico"', 'class="ico s"')}<span class="d-mode-t">אוטומטי</span></span></div>
<span class="d-end e1" aria-hidden="true">16</span><span class="d-end e2" aria-hidden="true">30</span>
</div>
<div class="sr" id="s02-dial-help">חצים למעלה וימינה מחממים בחצי מעלה, חצים למטה ושמאלה מקררים. PageUp ו-PageDown משנים במעלתיים, Home ו-End קופצים לקצוות.</div>
<div class="steppers"><button class="rbtn" type="button" data-step="-1" aria-label="לקרר בחצי מעלה">${I.minus}</button><p class="well"><span class="w-k">עכשיו בחדר</span><b class="w-v num" dir="ltr">23.4°</b><span class="w-eta">ליעד בעוד כ-4 דקות</span></p><button class="rbtn" type="button" data-step="1" aria-label="לחמם בחצי מעלה">${I.plus}</button></div>
<p class="micro">הקריאה בחדר היא הדגמה מדומה.</p>
<div class="sr" id="s02-live" role="status" aria-live="polite"></div>
</div>
<div class="panel-col">
<div class="grp reveal"><span class="g-lbl" id="s02-room-l">חדר</span><div class="pick rooms" role="radiogroup" aria-labelledby="s02-room-l">${roomPill("living", "סלון", "sofa", true)}${roomPill("bed", "חדר שינה", "bed", false)}${roomPill("kids", "חדרי ילדים", "kids", false)}</div></div>
<div class="grp reveal"><span class="g-lbl" id="s02-mode-l">מצב</span><div class="pick modes" role="radiogroup" aria-labelledby="s02-mode-l">${modeTile("heat", "חימום", "flameL", false)}${modeTile("cool", "קירור", "snow", false)}${modeTile("auto", "אוטומטי", "auto", true)}${modeTile("off", "כבוי", "power", false)}</div></div>
<div class="grp reveal"><span class="g-lbl">התאמות</span>
${swRow("night", "night", "מצב לילה", "מוריד חצי מעלה בכל שעה אחרי 23:00", true, "פועל")}
${swRow("floor", "floor", "חימום רצפה", "זמין בחימום ובמצב אוטומטי", false, "כבוי")}
${swRow("away", "away", "הגעה חכמה", "מכין את הבית כשאתם בדרך חזרה", true, "פועל")}
</div>
<ul class="legend-l reveal" aria-label="מקרא"><li><span class="sw-demo up" aria-hidden="true"></span>בולט: אפשר ללחוץ</li><li><span class="sw-demo dn" aria-hidden="true">${I.check}</span>שקוע עם צבע ווי: פעיל</li><li><span class="sw-demo fl" aria-hidden="true">${I.lock}</span>שטוח עם מנעול: לא זמין</li></ul>
</div>
</div>
</div></section>

<section class="sec offer" id="s02-kits" aria-labelledby="s02-of-h"><div class="offer-grid">
<div class="of-body">
<div class="head reveal"><span class="eyebrow">${I.mark.replace('class="ico"', 'class="ico s"')}מה יש בקופסה</span><h2 id="s02-of-h">בוחרים גודל בית וזהו</h2><p class="lead">שלוש ערכות, וכל אחת מגיעה מותקנת וכוילה ביום אחד. אפשר להוסיף חיישנים ומודולים גם אחר כך.</p></div>
<div class="tabs reveal" role="tablist" aria-label="גודל הבית">${KITS.map(kitTab).join("")}</div>
<div class="panels">${KITS.map(kitPanel).join("")}</div>
<div class="of-foot reveal"><a class="btn" href="#s02-order">להזמין את הערכה</a><p class="micro">המחירים לדוגמה בלבד ולא כוללים מע"מ.</p></div>
</div>
<div class="of-vis reveal">
<figure class="pic"><img src="${IMG}dial-detail.webp" width="1600" height="1067" alt="תקריב של סקאלת טמפרטורה על חוגה לבנה, עם המספרים 15, 20 ו-25 וסימון משולש" loading="lazy" decoding="async"></figure>
<p class="micro">תקריב של סקאלה על חוגה אמיתית. צילום סטוק להמחשה.</p>
</div>
</div></section>

<section class="visit sec" id="s02-order" data-cta-end aria-labelledby="s02-vs-h"><div class="visit-grid">
<div class="v-body">
<div class="head reveal"><span class="eyebrow">${I.mark.replace('class="ico"', 'class="ico s"')}הזמנה</span><h2 id="s02-vs-h">רוצים לישון בלי לחשוב על המזגן?</h2><p class="lead">משאירים שם וטלפון, ונחזור עם מועד התקנה בתוך יומיים עסקים.</p></div>
<form class="form reveal" novalidate>
<div class="row">
<div class="fld"><label for="s02-name">שם</label><input class="in" id="s02-name" name="name" autocomplete="name" required aria-describedby="s02-name-m"><span class="msg" id="s02-name-m">${I.alert}איך נקרא לכם?</span></div>
<div class="fld"><label for="s02-tel">טלפון</label><input class="in" id="s02-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s02-tel-m"><span class="msg" id="s02-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<div class="fld"><label for="s02-units">כמה מזגנים יש בבית (לא חובה)</label><input class="in" id="s02-units" name="units" type="number" inputmode="numeric" min="0" max="12" placeholder="לדוגמה 3"></div>
<div class="form-foot"><button class="btn" type="submit">להשאיר פרטים</button><p class="micro">בלי רשימות תפוצה. את הטלפון משתמשים רק לתיאום ההתקנה.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="tick">${I.check.replace('class="ico s"', 'class="ico"')}</span><h3>קיבלנו</h3><p class="lead">נחזור אליכם עם מועד התקנה בתוך יומיים עסקים.</p></div>
</div>
<div class="v-vis reveal">
<figure class="pic"><img src="${IMG}night-room.webp" width="2000" height="1333" alt="חדר שינה לבן ושקט עם מיטה, כריות לבנות ושני אהילי קש תלויים" loading="lazy" decoding="async"></figure>
</div>
</div></section>
</main>

<footer class="ft"><div class="ft-top">
<div class="ft-brand"><a class="logo" href="#s02-top" aria-label="נימה, לראש הדף">${I.mark}<span>נימה</span></a><p>חוגת קיר אחת למזגנים ולחימום הרצפה, לבתים בישראל. נימה היא מותג לדוגמה.</p><p class="micro">העסק, המחירים, הביקורות, הכתובת והטלפון דמיוניים. הצילומים סטוק להמחשה.</p></div>
<div class="ft-col"><p class="ft-h">שעות מענה</p><span>ראשון עד חמישי, 9:00 עד 18:00</span><span>שישי, 9:00 עד 13:00</span></div>
<div class="ft-col"><p class="ft-h">ליצור קשר</p><address>הרצל 24, תל אביב</address><a href="tel:+97235550182" dir="ltr" style="unicode-bidi:isolate">03-555-0182</a></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s02-control">לוח הבקרה</a><a href="#s02-kits">ההערכות</a><a href="#s02-proof">ביקורות</a><a href="#s02-order">הזמנה</a></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> נימה</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
<div class="ft-word" aria-hidden="true">נימה</div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
// לוח הבקרה: מצב לכל חדר, החוגה slider אמיתי (גרירה ומקלדת), והקריאה בחדר מדומה וזזה רק כשהסקשן במסך.
const JS = `(function(){var root=document.querySelector(".sk-s02");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return(r||q).querySelector(s)}function $$(s,r){return[].slice.call((r||q).querySelectorAll(s))}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
/* הדר: headroom, וצל רק אחרי גלילה */
var hd=$(".hd"),top=document.querySelector(".vtop"),lastTop=-1,hidden=false,scrolled=false,lastY=window.scrollY,acc=0;
function place(){if(!hd||!top)return;var s=getComputedStyle(top),v=s.position==="sticky"&&s.display!=="none"?top.offsetHeight:0;if(v!==lastTop){lastTop=v;hd.style.top=v+"px"}}
function setHidden(v){if(v===hidden)return;hidden=v;hd.classList.toggle("is-hidden",v)}
function onScroll(){place();var y=window.scrollY,d=y-lastY;lastY=y;var sc=y>8;if(sc!==scrolled){scrolled=sc;hd.classList.toggle("is-scrolled",sc)}
if(y<=96){acc=0;setHidden(false);return}acc=(d>0)===(acc>0)?acc+d:d;if(acc>6)setHidden(true);else if(acc<-6)setHidden(false)}
window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",place);hd.addEventListener("focusin",function(){setHidden(false)});place();onScroll();
/* reveal פעם אחת, ומנייה בטבעות */
function count(el){var to=+el.getAttribute("data-count");if(rm||to<2)return;var t0=null;function f(ts){if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/900),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(f)}el.textContent="0";requestAnimationFrame(f)}
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");$$("[data-count]",x.target).forEach(count);io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* לוח הבקרה */
var MIN=16,MAX=30,MODE={heat:["חימום","flame"],cool:["קירור","snow"],auto:["אוטומטי","auto"],off:["כבוי","power"]};
var ICON={heat:$(".pick.modes [data-v=heat] .ico").outerHTML,cool:$(".pick.modes [data-v=cool] .ico").outerHTML,auto:$(".pick.modes [data-v=auto] .ico").outerHTML,off:$(".pick.modes [data-v=off] .ico").outerHTML};
Object.keys(ICON).forEach(function(k){ICON[k]=ICON[k].replace('class="ico"','class="ico s"')});
var R={living:{n:"בסלון",t:24,m:"auto",night:1,floor:0,away:1,now:23.4},bed:{n:"בחדר השינה",t:22,m:"cool",night:1,floor:0,away:0,now:23.1},kids:{n:"בחדרי הילדים",t:23,m:"heat",night:0,floor:1,away:1,now:21.6}};
var cur="living",awake=false,inView=false;
var dial=$(".dial"),live=$("#s02-live"),dInt=$(".d-int"),dDec=$(".d-dec"),dRoom=$(".d-room"),dMode=$(".d-mode"),wV=$(".w-v"),wE=$(".w-eta"),wK=$(".w-k");
var sws=$$(".sw");
function txt(t){return t%1?t.toFixed(1):String(t)}
function etaTxt(r){var d=Math.abs(r.t-r.now);if(r.m==="off")return"המערכת כבויה";if(d<.05)return"בטמפרטורת היעד";return"ליעד בעוד כ-"+Math.max(1,Math.round(d*7))+" דקות"}
function say(s){live.textContent="";setTimeout(function(){live.textContent=s},30)}
function swState(k,r){var dis=r.m==="off"||(k==="floor"&&r.m==="cool");return{dis:dis,on:!!r[k]&&!dis}}
function render(){var r=R[cur],off=r.m==="off",p=(r.t-MIN)/(MAX-MIN);
dial.style.setProperty("--p",awake?p:0);
dial.setAttribute("aria-valuenow",String(r.t));dial.setAttribute("aria-valuetext",txt(r.t)+" מעלות");dial.setAttribute("aria-label","טמפרטורת יעד "+r.n);dial.setAttribute("aria-disabled",String(off));
dial.classList.toggle("is-off",off);$$(".rbtn").forEach(function(b){b.setAttribute("aria-disabled",String(off))});
var s=r.t.toFixed(1).split(".");dInt.textContent=s[0];dDec.textContent="."+s[1]+"°";dRoom.textContent=(off?"":"יעד ")+r.n;
dMode.innerHTML=ICON[r.m]+'<span class="d-mode-t">'+MODE[r.m][0]+"</span>";
wK.textContent="עכשיו "+r.n;wV.textContent=r.now.toFixed(1)+"°";wE.textContent=etaTxt(r);
sws.forEach(function(b){var k=b.getAttribute("data-k"),st=swState(k,r);b.setAttribute("aria-checked",String(st.on));b.setAttribute("aria-disabled",String(st.dis));b.classList.toggle("is-dis",st.dis);
$(".sw-st",b).textContent=st.dis?"לא זמין":st.on?"פועל":"כבוי"})}
function setT(v,announce){var r=R[cur];if(r.m==="off")return;v=Math.round(Math.max(MIN,Math.min(MAX,v))*2)/2;if(v===r.t)return;r.t=v;render();if(announce)say(r.n+": יעד "+txt(v)+" מעלות")}
/* גרירה: הזווית מהמרכז, 270 מעלות מלמטה-שמאל ועד מלמטה-ימין */
function fromPointer(e){var b=dial.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2),a=Math.atan2(dx,-dy)*180/Math.PI,r=R[cur];
if(Math.abs(a)>135)a=r.t>(MIN+MAX)/2?135:-135;setT(MIN+(a+135)/270*(MAX-MIN),false)}
var dragging=false;
dial.addEventListener("pointerdown",function(e){if(R[cur].m==="off")return;dragging=true;dial.classList.add("drag");try{dial.setPointerCapture(e.pointerId)}catch(x){}fromPointer(e);dial.focus({preventScroll:true})});
dial.addEventListener("pointermove",function(e){if(dragging)fromPointer(e)});
function endDrag(){if(!dragging)return;dragging=false;dial.classList.remove("drag");var r=R[cur];say(r.n+": יעד "+txt(r.t)+" מעלות")}
dial.addEventListener("pointerup",endDrag);dial.addEventListener("pointercancel",endDrag);
dial.addEventListener("keydown",function(e){var d=0,r=R[cur];
if(e.key==="ArrowUp"||e.key==="ArrowRight")d=.5;else if(e.key==="ArrowDown"||e.key==="ArrowLeft")d=-.5;else if(e.key==="PageUp")d=2;else if(e.key==="PageDown")d=-2;
else if(e.key==="Home"){e.preventDefault();setT(MIN,true);return}else if(e.key==="End"){e.preventDefault();setT(MAX,true);return}
if(d){e.preventDefault();setT(r.t+d,true)}});
$$(".rbtn").forEach(function(b){b.addEventListener("click",function(){setT(R[cur].t+(+b.getAttribute("data-step"))*.5,true)})});
/* בוררי רדיו: roving tabindex, חצים לפי כיוון הדף */
var rtl=getComputedStyle(q).direction==="rtl";
function radios(g,onPick){var bs=$$("[role=radio]",g);
function pick(i,f){bs.forEach(function(b,j){b.setAttribute("aria-checked",String(j===i));b.tabIndex=j===i?0:-1});if(f)bs[i].focus();onPick(bs[i].getAttribute("data-v"))}
bs.forEach(function(b,i){b.addEventListener("click",function(){pick(i,false)});
b.addEventListener("keydown",function(e){var d=e.key==="ArrowLeft"?(rtl?1:-1):e.key==="ArrowRight"?(rtl?-1:1):e.key==="ArrowDown"?1:e.key==="ArrowUp"?-1:0;
if(d){e.preventDefault();pick((i+d+bs.length)%bs.length,true)}else if(e.key==="Home"){e.preventDefault();pick(0,true)}else if(e.key==="End"){e.preventDefault();pick(bs.length-1,true)}})});return{set:function(v){bs.forEach(function(b,j){var on=b.getAttribute("data-v")===v;b.setAttribute("aria-checked",String(on));b.tabIndex=on?0:-1})}}}
var modeG=radios($(".pick.modes"),function(m){var r=R[cur],was=r.floor&&(m==="cool"||m==="off");r.m=m;if(m==="cool"||m==="off")r.floor=0;render();say(r.n+": מצב "+MODE[m][0]+(was?". חימום הרצפה כבה"+(m==="cool"?" כי הוא לא זמין בקירור":""):""))});
radios($(".pick.rooms"),function(v){cur=v;modeG.set(R[cur].m);render();say("נבחר "+R[cur].n.replace("ב","")+": יעד "+txt(R[cur].t)+" מעלות, "+MODE[R[cur].m][0])});
sws.forEach(function(b){b.addEventListener("click",function(){var k=b.getAttribute("data-k"),r=R[cur],st=swState(k,r);
if(st.dis){say(r.m==="off"?"המערכת כבויה, ההתאמות לא זמינות":"חימום הרצפה לא זמין בקירור");return}
r[k]=r[k]?0:1;render();say($(".sw-t span",b.parentNode).textContent+": "+(r[k]?"פועל":"כבוי"))})});
/* הקריאה בחדר זזה אל היעד רק כשהסקשן במסך */
setInterval(function(){if(!inView)return;var r=R[cur];if(r.m==="off")return;var d=r.t-r.now;if(Math.abs(d)<.05)return;r.now=Math.round((r.now+(d>0?.1:-.1))*10)/10;wV.textContent=r.now.toFixed(1)+"°";var e=etaTxt(r);if(wE.textContent!==e)wE.textContent=e},1200);
/* פעם אחת, כשהחוגה נכנסת: הקשת נמשכת מהקצה אל הערך */
var ctrl=$(".ctrl");
if("IntersectionObserver" in window&&ctrl){dial.style.setProperty("--p",0);new IntersectionObserver(function(en){inView=en[0].isIntersecting;if(inView&&!awake){awake=true;render()}},{threshold:.25}).observe(ctrl)}else{awake=true;render()}
/* הערכות: טאבים */
var tabs=$$(".tab"),panels=$$(".panel");
function pickTab(i,f){tabs.forEach(function(t,j){t.setAttribute("aria-selected",String(j===i));t.tabIndex=j===i?0:-1});panels.forEach(function(p,j){p.hidden=j!==i});if(f)tabs[i].focus()}
if(tabs.length){pickTab(1,false);
tabs.forEach(function(t,i){t.addEventListener("click",function(){pickTab(i,false)});t.addEventListener("keydown",function(e){var d=e.key==="ArrowLeft"?(rtl?1:-1):e.key==="ArrowRight"?(rtl?-1:1):0;
if(d){e.preventDefault();pickTab((i+d+tabs.length)%tabs.length,true)}else if(e.key==="Home"){e.preventDefault();pickTab(0,true)}else if(e.key==="End"){e.preventDefault();pickTab(tabs.length-1,true)}})})}
/* טופס ההזמנה */
var form=$(".form"),vg=$(".visit-grid");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/[^0-9]/g,"").length>=9);
if(bad){bad.focus();return}vg.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Neumorphism", group: "עומק ומרקם",
  when: "מוצרים פיזיים-דיגיטליים עם בקרים: בית חכם, מדחום וחוגות, נגנים, חיישנים, ציוד אודיו, אפליקציות בקרה ופאנלי הגדרות. כשהאתר מוכר חפץ שמסובבים ולוחצים עליו, ואפשר להראות את הבקר עצמו עובד. מעט אלמנטים, הרבה אווירה, קהל שמעריך שקט.",
  no: "אתרי תוכן, חנויות עם הרבה מוצרים, טפסים ארוכים, פיננסים ומשפט, וכל עסק שהמבקרים שלו צריכים קונטרסט חזק וסריקה מהירה. וגם לא כשאין בקר אמיתי שאפשר להראות: בלי חוגה או מתג שעובדים, השפה נשארת קישוט.",
  recipe: `קרקע: ערפל קר #DCE3E6 (לא האפור הקלאסי #E0E5EC). כל בקר יושב בדיוק בצבע הקרקע, כי האשליה עובדת רק שם · רצועה בהירה #E8EDEF לטקסט בלבד (בלי בקרים) · הובר: גוון כהה יותר של הקרקע #D3DBDF · חריץ #CBD4D9
ink #1F2A33 (11.0 על הקרקע) · muted #4A5963 (5.6) · מבטא יחיד: גחלת #C2410C למילוי ולכפתור (לבן עליה 5.2), #A8370A לטקסט ולמצב פעיל (5.0 על הקרקע)
כיוון אור אחד, שמאל-עליון, בשלוש רמות: גדול (חוגה) -12 -12 28 לבן .92 + 12 12 28 rgba(104,128,142,.46) · בינוני (כפתורים, בוררים) 6/14 · קטן (כפתור-משיכה, מתג) 3/8
שקוע: אותם צבעים הפוכים עם inset (9/20, 5/12, 3/7). כל הצללים כרשימה של ארבע שכבות (שתיים חיצוניות, שתיים inset) כדי שהמעבר בין בולט לשקוע ינוע ולא יקפוץ
לחיצה: שקוע + צבע גחלת + וי; hover: גוון כהה של הקרקע; לא זמין: שטוח, בגוון הובר, עם מנעול וטקסט "לא זמין"
רדיוסים: pill 999 לבוררים, כפתורים ושדות · אריחי מצב 28 · צילום 28 · רצועה 56 · עיגול מלא לחוגה, לטבעות ולכפתורי פלוס ומינוס
צילום: שטוח, בלי צל, גריידינג קר ומעט מרוכך שנאפה בקובץ (הלבנים נמשכים אל צבע הקרקע) · Google Sans בלבד, שלושה משקלים 400/500/600 · H1 52/1.1/-.01em (יחס 3.25) · מספרים עם tabular-nums
תנועה: reveal 16px/0.5s, פתיחה 1.2s, החוגה מתעוררת ב-0.9s, מעבר בולט-שקוע 0.3s · ease cubic-bezier(.2,.6,.2,1)`,
  apply: "הדר שטוח על הקרקע, בלי קו, וצל רק אחרי גלילה. הירו בשני טורים: טקסט, ולצידו צילום שטוח וקריאה שקועה מתחתיו. מדדים כטבעות שקועות עם קשת גחלת. ביקורות כטקסט שטוח על רצועה בהירה, בלי כרטיסים סביב פסקאות. 'לוח הבקרה' הוא הלב: חוגה בולטת עם פנים שקועות, בוררי חדר ומצב בולטים שנעשים שקועים וצבעוניים כשבוחרים, מתגים עם מסלול שקוע, ומקרא שמסביר את שלושת המצבים. ההערכות בטאבים באותו שפה. השדות שקועים, כפתור הפעולה מלא בגחלת. הפוטר על הקרקע, עם מילת המותג כאותיות בולטות בחלל הריק.",
  sig: "חוגה שעובדת: גרירה, מקלדת ו-ARIA של slider, קשת גחלת שמתעוררת פעם אחת · שלושה מצבים שנקראים גם בלי הצל: בולט, שקוע עם צבע ווי, שטוח עם מנעול · מתג שמנטרל מתג אחר (חימום רצפה כבוי בקירור) · קריאה שקועה שזזה אל היעד · עומק רק בבקרים, והצילום והטקסט שטוחים.",
  avoid: "הכל בולט, כרטיסים נאומורפיים סביב פסקאות · טקסט אפור על אפור · כפתור רפאים בלי משמעות · יותר מכיוון אור אחד · צל על צילום או על רקע שאינו הקרקע · מצב פעיל שנקרא רק מההבדל בצל · דף ארוך של תוכן · זוהר צבעוני (זה כבר מורפיזם אחר) · כמה צבעי מבטא.",
  qa: ["כל בקר יושב בדיוק בצבע הקרקע, וכל הצללים באותו כיוון אור", "טקסט וכפתור הפעולה ב-AA מלא; הצל לא נושא מידע לבדו", "בולט, שקוע וצבעוני, שטוח עם מנעול: שלושה מצבים שנבדלים גם בצבע ובאייקון", "החוגה עובדת בגרירה ובמקלדת, עם aria-valuetext", "צילום שטוח בלי צל, באותו גריידינג", "שלושה משקלים בלבד, בלי ריווח חיובי", "reveal ב-keyframes; reduced-motion מכבה תנועה והכל נראה בלי JS"],
  engine: "ניגודיות (נמדד 15.10.2026): ink #1F2A33 על הקרקע #DCE3E6 11.0 · muted #4A5963 5.6 (על הרצועה הבהירה 6.4) · טקסט גחלת #A8370A על הקרקע 5.0, על הרצועה 5.6 · לבן על גחלת #C2410C 5.2 · placeholder #4F5E68 על הקרקע 5.2 · הקרקע עצמה לא קרה משתנה בין בקרים, ולכן הצל הבהיר על הקרקע בלבד. אילוצים: צל כפול רק על משטח בצבע הקרקע; אינפוט שקוע בגובה 52px ומעלה; מצב נקרא תמיד גם בצבע, באייקון ובטקסט; חוגה עם role=slider, aria-valuemin/max/now/valuetext ומקלדת מלאה (חצים, PageUp/PageDown, Home/End); כפתורי פלוס ומינוס כחלופה בלי גרירה; הכל נראה בלי JS. ב-RTL החוגה נשארת בכיוון השעון (מינימום משמאל למטה), והחצים מימין ולמעלה מחממים.",
  agent: "עצב בסגנון נאומורפי בוגר: קרקע בגוון אחיד אחד (לא אפור טהור), בקרים באותו צבע בדיוק עם צל כפול רך (בהיר משמאל-למעלה, כהה מימין-למטה) ושקוע להפוך, מבטא יחיד לפעיל וללחיצה. עומק רק על חוגה, בוררים, מתגים ושדות; טקסט, מספרים וכפתור הפעולה נשארים בניגודיות מלאה, וכל מצב נקרא גם בצבע ובאייקון ולא רק בצל. רגע חתימה אחד: בקר שעובד (חוגה עם מקלדת ו-ARIA). צילום שטוח וקר בלי צל. אפס קווים ומסגרות.",
  mobile: "ההדר: הניווט נעלם והכפתור נשאר (44px). ההירו: טקסט, שלושה כפתורים בעמודה, וצילום נמוך עם הבאר השקוע מתחתיו, והכל במסך הראשון וממורכז אנכית. המדדים בעמודה. הביקורות בעמודה על הרצועה. החוגה 300px לכל היותר (הגרירה חוסמת גלילה רק עליה), מתחתיה פלוס ומינוס עם הקריאה ביניהם. בוררי המצב בשתי עמודות, כל אחד 88px גובה. המתגים עם יעד לחיצה של 44px. הטאבים והטופס בעמודה אחת.",
  fonts: [],
};

export default [
  {
    ...base,
    id: "s02", name: "נאומורפיזם",
    desc: "אותו גוון קר לקרקע ולבקר, צל כפול רך, ומבטא גחלת יחיד. כאן הגרסה הבוגרת: העומק רק על חוגה, בוררים, מתגים ושדות, והטקסט והמצבים נשארים קריאים בלי הצל. עמוד אמיתי של מותג חוגות לקיר (דמיוני) עם לוח בקרה שעובד.",
    score: "29/30",
    note: "רף הסטודיו: 29/30, כל שבעת ה-★ עוברים. הכלי מדד 19 סעיפים וכולם עברו; ששת סעיפי העין נבדקו בצילומים בגודל אמיתי (סעיף 11 נשאר עם סטיות מכוונות של עמודות לא שוות), וחמשת הסעיפים שלא חלים נבדקו בעין. מתח H1/גוף 52/15 = 3.47 (Google Sans) · שלושה משקלים: 400, 500, 600 · צל זוגי אחד (בהיר למעלה ושמאלה, כהה למטה וימינה) בשלוש רמות, 4 שכבות בכל מצב כדי שהמעבר בין בולט לשקוע יתעדכן חלק · עומק רק על בקרים ועצמי מפתח, לא על טקסט, נתונים או תמונות · מצבים נבדלים גם בצבע, באייקון ובטקסט, לא רק בצל · רכיב החתימה: חוגה עם role=slider, גרירה ומקלדת (חצים, PageUp ו-PageDown, Home ו-End), בורר חדרים ומצבים כ-radiogroup, מתגים כ-switch, אזור aria-live · גבול עמוד: אין גלילה אופקית ב-360 עד 1280 ואין מטרות מתחת ל-44px. בטלפון החוגה לא חוסמת גלילה: החלקה אנכית גוללת את העמוד, גרירה לצד מסובבת, ו-+ ו-- לצעד מדויק (עד 17.10.2026 נגיעה בחוגה חסמה גלילה). תמונות סטוק (Magnific, רישיון חינם, קרדיטים שנוצלו: 0, יתרה לפני ואחרי 147,723): hero-panel.webp מזהה 15559377 (אישה ליד פאנל קיר), night-room.webp מזהה 32823173 (חדר שינה), dial-detail.webp מזהה 10835723 (תקריב סקאלה). גריידינג קריר אחד לכל התמונות, בלי צל על תמונות. העסק, המחירים, הביקורות והטלפון דמיוניים ומסומנים כדוגמה בעמוד. איך לבדוק: להזיז את החוגה בגרירה ובחצים, לעבור בין חדרים ומצבים (קירור מנעל את חימום הרצפה, כבוי מנעל הכול), ולצמצם את החלון ל-360.",
    css: CSS, html: HTML, js: JS,
  },
];
