// S14 · חם אורגני, עמוד הייחוס בגרסה 2 (6.10.2026). נבנה מחדש כעמוד אמיתי, לפי המודל של s05.
//
// מה זה: העסק הדמיוני "קמח ומלח", מאפייה שכונתית ובית קפה בחיפה. אין כאן לקוח אמיתי; הצילומים הם סטוק (ראו ids בשדה note).
// הפונט: Google Sans בלבד, מקומי. החום בא מצבע, מנייר, מצילום, מצורות ומקצב, לא מפונט סריף (Frank Ruhl Libre יצא).
// המבנה (לא s05 בצבע אחר): הדר גלולה צפה · הירו שני טורים עם פינה עגולה אחת · קיר ביקורות רגוע · "הלילה של הכיכר" (רגע החתימה: שעון
// שמתמלא בין 18:00 ל-6:30) · המדף בטאבים · בלוק הזמנה שקט עם תמונה שעולה מעל הלוח · פוטר שהוא יריעה עגולה.
// מנוע: ease החתום, reveal ב-keyframes 16px/0.5s, תנועה רציפה כ-CSS על transform בלבד, reduced-motion מכבה הכל, הכל נראה בלי JS.

const EASE = "cubic-bezier(.2,.6,.2,1)";

// ───────── אייקונים: משפחה אחת, stroke 1.7, 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  leaf: svg(" s", `<path d="M5 19C5 10 11 5 20 4c0 9-5 15-14 15"/><path d="M5 19 14 10"/>`),
  arrow: svg(" s", `<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  pin: svg(" s", `<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`),
  clock: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  phone: svg(" s", `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`),
  flame: svg("", `<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>`),
  pause: svg(" s", `<path d="M9 5v14"/><path d="M15 5v14"/>`),
  play: svg(" s", `<path d="M8 5l11 7-11 7z"/>`),
  check: svg("", `<path d="M20 6 9 17l-5-5"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>`),
  mark: svg("", `<path d="M3 16c0-4.4 4-8 9-8s9 3.6 9 8c0 1-.8 2-2 2H5c-1.2 0-2-1-2-2z"/><path d="m9 12 2 3.2"/><path d="m12.6 11 2 3.4"/><path d="m16 12 1.5 2.6"/>`),
};

// ───────── קיר הביקורות: תשע ביקורות לדוגמה, שלוש בכל טור ─────────
const REVIEWS = [
  ["יעל ברק", "לפני שבועיים", 5, "הגעתי בשבע וחצי והכיכר עוד הייתה חמה. החמצמצות עדינה והקרום נשבר כמו שצריך. קונה כאן כל יום שישי."],
  ["אורי ששון", "לפני חודש", 5, "המקום היחיד בשכונה שבו הקרואסון באמת מתפורר. אפשר לשבת עם קפה גם בלי למהר."],
  ["נועה מלכה", "לפני חודשיים", 5, "ביקשתי לחם בלי אגוזים בגלל אלרגיה. המוכרת עברה איתי על הרכיבים של כל כיכר, ואפילו שאלה על הקמח. אני חוזרת כבר שלוש שנים."],
  ["דן אלון", "לפני שלושה שבועות", 5, "הזמנתי מראש שלוש כיכרות לשבת. הכל חיכה ארוז עם השם שלי, ובלי תור."],
  ["מיכל רוזן", "לפני שבוע", 5, "הבנות מבקשות שושונית קינמון מהרגע שהן רואות את הדלת. גם אני לוקחת קפה בדרך החוצה."],
  ["תמיר כהן", "לפני חודש", 4, "קפה טוב, שולחנות קטנים ואור יפה בבוקר. אני עובד כאן פעמיים בשבוע ואף אחד לא מעיף אותי אחרי שעה. בשישי קצת צפוף."],
  ["רונית לוי", "לפני חודשיים", 5, "מחמצת אמיתית. הלחם נשאר טרי יומיים, ואחרי זה הוא יוצא נהדר כטוסט."],
  ["אלון פרידמן", "לפני חמישה חודשים", 5, "מכירים אותי בשם ואת הכיכר שלי בלי לשאול. ככה מאפייה שכונתית אמורה להיות."],
  ["שירה גבאי", "לפני שבועיים", 5, "לקחתי כיכר שיפון לארוחת שישי והיא נעלמה בעשר דקות. למחרת הבאתי שתיים."],
];
const stars = n => `<span class="stars" role="img" aria-label="${n} מתוך 5">${"★".repeat(n)}${"☆".repeat(5 - n)}</span>`;
const rv = (r, dup) => `<figure class="rv"${dup ? ' aria-hidden="true"' : ""}>${stars(r[2])}<blockquote>${r[3]}</blockquote><figcaption><b>${r[0]}</b><span>${r[1]} · ביקורת בגוגל</span></figcaption></figure>`;
const col = (i, cls) => {
  const set = REVIEWS.slice(i * 3, i * 3 + 3);
  return `<div class="col ${cls}">${set.map(r => rv(r, false)).join("")}<div class="dup" aria-hidden="true">${set.map(r => rv(r, true)).join("")}</div></div>`;
};

// ───────── שלבי הלילה (שעון הרגע החתימה): דקות מ-18:00, וחלק הקשת שהשעון ממלא ─────────
const STEPS = [
  ["18:00", 0, .04, "מאכילים", "מאכילים את המחמצת", "קמח ומים נכנסים לצנצנת בת תשע שנים. עד הלילה היא עולה, ובדרך נבנה הטעם."],
  ["21:00", 180, .24, "לשים", "לשים ולתת לבצק לנוח", "בצק רטוב, בלי שמרים ובלי תוספות. הלישה קצרה, ואת השאר עושה הזמן."],
  ["00:00", 360, .48, "מעצבים", "מעצבים ומכניסים לקור", "כל כיכר מתעצבת ביד ונחה במקרר עד הבוקר. בקור הבצק מתפתח לאט, וכך נוצר הטעם החמצמץ."],
  ["05:00", 660, .88, "אופים", "מדליקים את התנור", "תנור אבן שמתחמם שעה וחצי. חותכים כל כיכר ביד, והיא נכנסת פנימה."],
  ["06:30", 750, 1, "פתוח", "פותחים את הדלת", "הכיכר הראשונה על המדף והקפה כבר על האש. מי שמגיע בשבע, מקבל אותה חמה."],
];
const stepHtml = (s, i) => `<li class="step reveal" style="--i:${i}" data-min="${s[1]}" data-p="${s[2]}" data-label="${s[3]}"><span class="st-time" dir="ltr">${s[0]}</span><div class="st-txt"><h3>${s[4]}</h3><p>${s[5]}</p></div></li>`;
const ticks = Array.from({ length: 13 }, (_, n) => {
  const a = (n * 28.8 - 90) * Math.PI / 180;
  return `<circle class="d-dot" cx="${(104 + 72 * Math.cos(a)).toFixed(1)}" cy="${(104 + 72 * Math.sin(a)).toFixed(1)}" r="2.2"/>`;
}).join("");

// ───────── המדף ─────────
const MENU = [
  ["לחמים", [
    ["כיכר מחמצת לבנה", "קמח חיטה, מים ומלח. קרום פריך ופנים רך.", 34],
    ["כיכר קמח מלא וגרעינים", "חמוצה יותר, עם חמניות ושומשום.", 38],
    ["לחם שיפון ואגוזים", "צפוף ומתקתק, מתאים לגבינות.", 42],
    ["בגט מחמצת", "נאפה פעמיים ביום.", 18],
  ]],
  ["מאפים", [
    ["קרואסון חמאה", "חמאה בלבד, נאפה כל בוקר.", 16],
    ["שושונית קינמון", "גדולה, עם סוכר חום וקינמון.", 17],
    ["קרואסון שקדים", "קרם שקדים ושקדים פרוסים.", 19],
    ["מאפה גבינות ועשבים", "גבינה לבנה, פטרוזיליה ושמיר.", 18],
  ]],
  ["קפה", [
    ["אספרסו כפול", "פולים קלויים אצל קלאי מקומי.", 11],
    ["קפה הפוך", "חלב טרי, כוס גדולה.", 14],
    ["שוקו חם", "מותך מחתיכות שוקולד מריר.", 16],
    ["לימונדה נענע", "סחוטה במקום.", 15],
  ]],
];
const panelHtml = (g, gi) => `<div class="panel" role="tabpanel" id="s14-p${gi}" aria-labelledby="s14-t${gi}"><h3 class="pn-h">${g[0]}</h3><ul class="items">${g[1].map((m, mi) => `<li class="reveal" style="--i:${mi}"><div class="it-name"><h4>${m[0]}</h4><p>${m[1]}</p></div><span class="price" aria-label="${m[2]} שקלים">${m[2]} ₪</span></li>`).join("")}</ul></div>`;
const tabHtml = (g, gi) => `<button class="tab" type="button" role="tab" id="s14-t${gi}" aria-controls="s14-p${gi}" aria-selected="${gi === 0}" tabindex="${gi === 0 ? 0 : -1}">${g[0]}</button>`;

// ───────── CSS ─────────
const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
.cwrap{container-type:inline-size}
.q{--linen:#F5EFE6;--cream:#FBF8F3;--paper:#FFFCF7;--sand:#EFE6D8;--sand-2:#E6DAC7;--ink:#2F2A25;--muted:#6B6157;--muted-s:#5A5047;
 --terra:#A9502F;--terra-d:#8F4327;--terra-t:#9A4A2B;--on-terra:#FFF8F2;--sage:#6F7F63;--sage-t:#56644B;--field:#857058;--err:#B3261E;
 --r-card:24px;--r-panel:40px;--r-sheet:56px;--big:clamp(96px,18cqi,224px);--ease:${EASE};
 --shadow:0 10px 30px rgba(74,54,36,.10);--shadow-up:0 18px 44px rgba(74,54,36,.16);
 --grain:url("../assets/media/real/s14/grain.png");
 --sec:112px;--gut:clamp(20px,5cqi,72px);
 background-color:var(--linen);background-image:var(--grain);background-size:128px;color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.65;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q h4,.q p,.q ul,.q ol,.q figure,.q blockquote,.q address,.q fieldset,.q legend{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q fieldset{border:0;padding:0;min-width:0}
.q a{color:inherit;text-decoration:none}
.q address{font-style:normal}
.q img{display:block;max-width:100%}
.q button{font:inherit;color:inherit}
.q h1{font-size:clamp(34px,4.1cqi,52px);line-height:1.1;font-weight:500;letter-spacing:-.01em;text-wrap:balance}
.q h2{font-size:clamp(28px,3cqi,38px);line-height:1.18;font-weight:500;text-wrap:balance}
.q h3{font-size:20px;line-height:1.35;font-weight:500}
.q h4{font-size:17px;line-height:1.35;font-weight:500}
.q p{text-wrap:pretty}
.q .lead{font-size:17px;line-height:1.58;color:var(--muted-s);max-width:480px}
.q .micro{font-size:13px;line-height:1.45;color:var(--muted-s)}
.q .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;line-height:1;color:var(--sage-t)}
.q .tm{color:var(--terra-t);font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap;unicode-bidi:isolate}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block;color:var(--sage)}
.q .ico.s{width:20px;height:20px}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;background:var(--paper);color:var(--ink);padding:12px 20px;border-radius:999px;font-weight:500;box-shadow:var(--shadow)}
.q .skip:focus{top:8px}
.q .skip:focus-visible{border-radius:999px}
.q :is(a,button,summary,[tabindex]):focus-visible{outline:3px solid var(--terra-t);outline-offset:3px;border-radius:12px}
/* כפתורים: שלוש רמות, ארבעה מצבים */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:14px 28px;border:0;border-radius:999px;background:var(--terra);color:var(--on-terra);font-size:16px;font-weight:600;line-height:1;cursor:pointer;transition:background .18s var(--ease),transform .18s var(--ease);-webkit-tap-highlight-color:transparent;white-space:nowrap}
.q .btn:active{transform:scale(.98);transition-duration:.12s}
.q .btn:focus-visible{border-radius:999px}
.q .btn.sm{min-height:44px;padding:10px 20px;font-size:15px}
.q .btn.b2{background:var(--sand-2);color:var(--ink)}
.q .lnk{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:12px 0;background:none;border:0;font-size:15px;font-weight:500;line-height:1;color:var(--ink);cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:6px;transition:color .15s var(--ease),text-decoration-color .15s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
@media (hover:hover) and (pointer:fine){
.q .btn:hover{background:var(--terra-d);transform:translateY(-2px)}
.q .btn.b2:hover{background:#DCCDB5}
.q .lnk:hover{color:var(--terra-t);text-decoration-color:var(--terra-t)}
.q .lnk:hover .ico{transform:translateX(-4px)}
}
/* שדות: חמישה מצבים */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label,.q .legend{font-size:14px;font-weight:500;line-height:1.2;color:var(--ink)}
.q .in{font:inherit;font-size:16px;line-height:1.2;min-height:52px;padding:14px 20px;border:1.5px solid var(--field);border-radius:999px;background:var(--paper);color:var(--ink);appearance:none;width:100%;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}
.q .in::placeholder{color:#7A6F64}
.q .in:focus,.q .in:focus-visible{outline:0;border-color:var(--terra-t);box-shadow:0 0 0 3px rgba(169,80,47,.22)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;align-items:center;gap:6px;font-size:13px;line-height:1.3;color:var(--err)}
.q .fld .msg .ico{color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{background:var(--sand);color:var(--muted-s)}
/* reveal: keyframes ולא transition. התוכן גלוי בלי JS; רק .js מסתיר */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:worev .5s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes worev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* פתיחת עמוד אחת (CSS בלבד, 1.2 שניות): ההדר יורד, אחריו הטקסט, אחרון התמונה עולה */
.q .hd-pill{animation:wohd .7s ${EASE} both}
.q .oi{animation:woup .6s ${EASE} both}
.q .oi:nth-child(1){animation-delay:.1s}.q .oi:nth-child(2){animation-delay:.18s}.q .oi:nth-child(3){animation-delay:.26s}.q .oi:nth-child(4){animation-delay:.34s}.q .oi:nth-child(5){animation-delay:.42s}
.q .hero-vis{animation:wovis 1s ${EASE} .2s both}
.q .stamp,.q .now{animation:woappear .5s ${EASE} .9s both}
@keyframes wohd{from{opacity:0;translate:0 -18px}to{opacity:1;translate:0 0}}
@keyframes woup{from{opacity:0;translate:0 18px}to{opacity:1;translate:0 0}}
@keyframes wovis{from{opacity:0;translate:0 48px}to{opacity:1;translate:0 0}}
@keyframes woappear{from{opacity:0}to{opacity:1}}
@keyframes wospin{to{transform:rotate(360deg)}}
@keyframes wodrift{from{transform:translateY(0)}to{transform:translateY(-50%)}}
/* תמונות: טיפול אחד. רדיוס 24, פינה עגולה אחת בהירו, אותו גריידינג חם בכל התמונות */
.q .pic{overflow:hidden;border-radius:var(--r-card);background:var(--sand-2)}
.q .pic img{width:100%;height:100%;object-fit:cover;border-radius:inherit;transition:transform .4s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .pic:hover img{transform:scale(1.03)}}
/* מבנה */
.q .wrap{max-width:1320px;margin-inline:auto}
.q .sec{padding:var(--sec) var(--gut)}
.q .sheet{border-radius:var(--r-sheet);background-color:var(--sand);background-image:var(--grain);background-size:128px}
.q .head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:640px;margin-bottom:48px}
.q .head.c{align-items:center;text-align:center;margin-inline:auto}
.q .head.c .lead{margin-inline:auto}
.q section[id]{scroll-margin-top:96px}
/* הדר: גלולה צפה עם headroom */
.q .hd{position:sticky;top:0;z-index:30;height:88px;margin-bottom:-88px;padding-inline:var(--gut);pointer-events:none}
.q .hd-pill{position:relative;pointer-events:auto;max-width:1120px;height:64px;margin:16px auto 0;padding-inline:20px 12px;display:flex;align-items:center;gap:24px;background:var(--paper);border-radius:999px;box-shadow:var(--shadow);transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
.q .hd.is-hidden .hd-pill{transform:translateY(calc(-100% - 32px));box-shadow:none}
.q .logo{display:inline-flex;align-items:center;gap:10px;min-height:44px;white-space:nowrap;font-size:20px;font-weight:600;line-height:1;letter-spacing:0;color:var(--ink)}
.q .logo .ico{color:var(--sage)}
.q .hd nav{display:flex;gap:4px;margin-inline:auto}
.q .hd .btn.sm{margin-inline-start:auto}
.q .hd nav a{display:inline-flex;align-items:center;min-height:44px;font-size:14px;font-weight:500;line-height:1;color:var(--muted-s);padding:10px 16px;border-radius:999px;transition:background .15s var(--ease),color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .hd nav a:hover{background:var(--sand);color:var(--ink)}}
/* הירו */
.q .hero{padding:88px var(--gut) 56px}
.q .hero-in{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;align-items:center;max-width:1320px;margin-inline:auto}
.q .hero-txt{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.q .hero h1{max-width:540px}
.q .ctas{display:flex;align-items:center;flex-wrap:wrap;gap:8px 28px;margin-top:8px}
.q .meta{display:flex;flex-wrap:wrap;gap:12px 24px;font-size:14px;line-height:1.3;color:var(--muted-s);margin-top:8px}
.q .meta li{display:flex;align-items:center;gap:8px}
.q .hero-vis{position:relative}
.q .hero-img{aspect-ratio:6/5;max-height:min(560px,calc(100svh - 140px));border-start-end-radius:var(--big)}
.q .stamp{position:absolute;inset-inline-end:-32px;bottom:72px;z-index:2;width:120px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center}
.q .stamp svg.sc{position:absolute;inset:0;width:100%;height:100%;animation:wospin var(--spin) linear infinite}
.q .stamp svg.sc path{fill:var(--sand-2)}
.q .stamp .ico,.q .stamp span{position:relative}
.q .stamp span{font-size:13px;font-weight:600;line-height:1.25;color:var(--ink)}
.q .now{position:absolute;inset-inline-start:24px;bottom:-32px;z-index:2;display:flex;align-items:center;gap:16px;min-width:264px;padding:16px 24px;background:var(--paper);border-radius:var(--r-card);box-shadow:var(--shadow)}
.q .now small{display:block;font-size:13px;font-weight:500;line-height:1.3;color:var(--muted-s)}
.q .now strong{display:block;font-size:16px;font-weight:500;line-height:1.35;color:var(--ink)}
/* ביקורות: קיר רגוע */
.q .wall{position:relative;height:min(640px,78svh);overflow:hidden;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 12%,#000 88%,transparent)}
.q .col{animation:wodrift var(--t) linear infinite;will-change:transform}
.q .col.c1{--t:84s}.q .col.c2{--t:96s;animation-direction:reverse}.q .col.c3{--t:72s}
.q .wall:hover .col,.q .wall:focus-within .col,.q .wall.is-off .col{animation-play-state:paused}
.q[data-paused] .col,.q[data-paused] .stamp svg.sc{animation-play-state:paused}
.q .rv{display:flex;flex-direction:column;gap:16px;margin-bottom:24px;padding:24px 28px;background:var(--sand);border-radius:var(--r-card)}
.q .stars{font-size:15px;line-height:1;color:var(--terra-t)}
.q .rv blockquote{font-size:16px;line-height:1.6;color:var(--ink)}
.q .rv figcaption{display:flex;flex-direction:column;gap:2px}
.q .rv figcaption b{font-size:14px;font-weight:500;line-height:1.3}
.q .rv figcaption span{font-size:13px;line-height:1.3;color:var(--muted-s)}
.q .proof-foot{display:flex;align-items:center;justify-content:space-between;gap:16px 24px;flex-wrap:wrap;margin-top:24px}
/* רגע החתימה: הלילה של הכיכר */
.q .story{padding:var(--sec) var(--gut)}
.q .story-grid{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1fr);grid-template-areas:"vis head" "vis steps";column-gap:88px;align-items:start;max-width:1320px;margin-inline:auto}
.q .st-vis{grid-area:vis;position:sticky;top:96px;align-self:start}
.q .st-vis .pic{aspect-ratio:5/6}
.q .st-head{grid-area:head;display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:560px;margin-bottom:40px}
.q .steps{grid-area:steps;display:flex;flex-direction:column;gap:8px}
.q .step{display:grid;grid-template-columns:96px minmax(0,1fr);gap:20px;align-items:start;padding:24px 28px;border-radius:var(--r-card);transition:background .3s var(--ease)}
.q .step.is-on{background:var(--sand-2)}
.q .st-time{font-size:28px;line-height:1.1;font-weight:600;color:var(--muted-s);font-variant-numeric:tabular-nums;text-align:start;transition:color .3s var(--ease);unicode-bidi:isolate}
.q .step.is-on .st-time{color:var(--terra-d)}
.q .st-txt{display:flex;flex-direction:column;gap:8px;max-width:440px}
.q .st-txt p{font-size:16px;line-height:1.6;color:var(--muted-s)}
.q .dial{position:absolute;inset-inline-end:-56px;bottom:-32px;z-index:2;width:208px;height:208px;border-radius:50%;background:var(--paper);box-shadow:var(--shadow);display:grid;place-items:center}
.q .dial svg{position:absolute;inset:0;width:100%;height:100%}
.q .d-track{fill:none;stroke:var(--sand-2);stroke-width:12}
.q .d-prog{fill:none;stroke:var(--terra);stroke-width:12;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:0;transition:stroke-dashoffset .6s var(--ease)}
.q .d-dot{fill:var(--sage)}
.q .d-ctr{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.q .d-time{font-size:40px;line-height:1;font-weight:600;font-variant-numeric:tabular-nums;color:var(--ink);unicode-bidi:isolate}
.q .d-lbl{font-size:13px;font-weight:500;line-height:1.2;color:var(--muted-s)}
/* המדף */
.q .offer{padding-block:var(--sec)}
.q .offer-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:72px;align-items:start;max-width:1320px;margin-inline:auto}
.q .of-body .head{margin-bottom:32px}
.q .tabs{display:none;gap:8px;margin-bottom:24px}
.q.js .tabs{display:flex}
.q .tab{min-height:44px;padding:10px 24px;border:0;border-radius:999px;background:var(--sand-2);color:var(--ink);font-size:15px;font-weight:500;line-height:1;cursor:pointer;transition:background .18s var(--ease),color .18s var(--ease);-webkit-tap-highlight-color:transparent}
.q .tab[aria-selected="true"]{background:var(--terra);color:var(--on-terra)}
@media (hover:hover) and (pointer:fine){.q .tab[aria-selected="false"]:hover{background:#DCCDB5}}
.q .tab:focus-visible{border-radius:999px}
.q .panel[hidden]{display:none}
.q.js .pn-h{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.q .pn-h{margin-bottom:8px}
.q .panel+.panel{margin-top:32px}
.q .items{display:flex;flex-direction:column;gap:4px;margin-inline:-20px}
.q .items li{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px 20px;border-radius:var(--r-card);transition:background .3s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .items li:hover{background:var(--sand)}}
.q .it-name p{font-size:15px;line-height:1.5;color:var(--muted-s);margin-top:2px}
.q .price{display:inline-flex;align-items:baseline;gap:4px;font-size:22px;font-weight:600;line-height:1;color:var(--terra-t);font-variant-numeric:tabular-nums;white-space:nowrap}
.q .of-foot{display:flex;align-items:center;flex-wrap:wrap;gap:8px 28px;margin-top:24px}
.q .of-vis{position:relative}
.q .of-vis .pic{aspect-ratio:5/4}
.q .set{position:absolute;inset-inline-start:-24px;bottom:-32px;z-index:2;display:flex;flex-direction:column;gap:4px;padding:20px 28px;background:var(--paper);border-radius:var(--r-card);box-shadow:var(--shadow)}
.q .set small{font-size:13px;font-weight:500;line-height:1.3;color:var(--muted-s)}
.q .set strong{font-size:17px;font-weight:500;line-height:1.3}
.q .set .price{font-size:28px;margin-top:4px}
/* ביקור והזמנה */
.q .visit{padding:var(--sec) var(--gut)}
.q .vpanel{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);grid-template-areas:"photo body" "info body";grid-template-rows:auto 1fr;column-gap:56px;row-gap:32px;align-items:start;max-width:1320px;margin-inline:auto;padding:64px 56px;border-radius:var(--r-panel);background-color:var(--sand);background-image:var(--grain);background-size:128px}
.q .v-photo{grid-area:photo;margin-top:calc(-1 * (var(--sec) + 72px));aspect-ratio:4/3}
.q .vinfo{grid-area:info;display:flex;flex-direction:column;gap:16px}
.q .vinfo li{display:flex;align-items:flex-start;gap:12px}
.q .vinfo .ico{margin-top:2px}
.q .vinfo div{display:flex;flex-direction:column;gap:2px;font-size:15px;line-height:1.5;color:var(--muted-s)}
.q .vinfo b{font-size:16px;font-weight:500;color:var(--ink)}
.q .vinfo a[href^="tel"]{align-self:flex-start;display:inline-flex;align-items:center;min-height:44px;margin-block:-10px;font-size:16px;font-weight:500;color:var(--ink);unicode-bidi:isolate;transition:color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .vinfo a[href^="tel"]:hover{color:var(--terra-t)}}
.q .v-body{grid-area:body}
.q .v-body .head{margin-bottom:32px}
.q .form{display:flex;flex-direction:column;gap:24px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .opts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.q .opt{position:relative}
.q .opt input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.q .opt span{display:inline-flex;align-items:center;min-height:44px;padding:10px 20px;border-radius:999px;background:var(--paper);border:1.5px solid var(--field);font-size:15px;font-weight:500;line-height:1;transition:background .18s var(--ease),color .18s var(--ease),border-color .18s var(--ease)}
.q .opt input:checked+span{background:var(--terra);border-color:var(--terra);color:var(--on-terra)}
.q .opt input:focus-visible+span{outline:3px solid var(--terra-t);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.q .opt input:not(:checked):hover+span{background:var(--sand-2)}}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:16px 24px}
.q .ok{display:none;flex-direction:column;align-items:flex-start;gap:16px;padding:32px 0}
.q .ok .tick{width:56px;height:56px;border-radius:50%;background:var(--paper);display:grid;place-items:center}
.q .ok .tick .ico{color:var(--sage)}
.q .vpanel.is-sent .form{display:none}
.q .vpanel.is-sent .ok{display:flex}
/* פוטר: יריעה עגולה */
.q .ft{padding:72px var(--gut) 40px;border-radius:var(--r-sheet) var(--r-sheet) 0 0;background-color:var(--sand-2);background-image:var(--grain);background-size:128px}
.q .ft-top{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;max-width:1320px;margin-inline:auto}
.q .ft-brand{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.q .ft-brand p{font-size:15px;line-height:1.6;color:var(--muted-s);max-width:300px}
.q .ft-col{display:flex;flex-direction:column;font-size:15px;line-height:1.6;color:var(--muted-s)}
.q .ft-col span:not(.ft-h),.q .ft-col address{padding-block:6px}
.q .ft-h{font-size:14px;font-weight:600;line-height:1.3;color:var(--ink);margin-bottom:8px}
.q .ft-col a,.q .ft-bot a{display:inline-block;padding-block:6px;color:var(--muted-s);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate;align-self:flex-start}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:var(--terra-d)}}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1320px;margin:48px auto 0;font-size:14px;color:var(--muted-s)}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
.q .ft-word{max-width:1320px;margin:40px auto 0;font-size:clamp(72px,17cqi,224px);font-weight:600;line-height:.9;letter-spacing:-.03em;color:#DCCDB5;text-align:center;user-select:none;overflow:hidden}
/* מובייל וטאבלט */
@container (max-width:1023px){
.q{--sec:88px}
.q .hd-pill{gap:12px}
.q .hd nav{gap:0}
.q .hd nav a{padding:10px 12px}
.q .hero-in{gap:40px}
.q .story-grid{grid-template-columns:minmax(0,.75fr) minmax(0,1fr);column-gap:48px}
.q .st-vis{top:88px}
.q .dial{width:176px;height:176px;inset-inline-end:-24px;bottom:-24px}
.q .d-time{font-size:34px}
.q .step{grid-template-columns:80px minmax(0,1fr);gap:16px;padding:20px}
.q .st-time{font-size:24px}
.q .offer-grid{grid-template-columns:1fr;gap:72px}
.q .of-vis .pic{aspect-ratio:16/10}
.q .wall{grid-template-columns:repeat(2,minmax(0,1fr))}
.q .col.c3{display:none}
.q .ft-top{grid-template-columns:1fr 1fr}
.q .ft-col a,.q .ft-bot a{padding-block:12px}
.q .vpanel{grid-template-columns:1fr;grid-template-areas:"photo" "body" "info";grid-template-rows:none;padding:56px 40px;row-gap:40px}
.q .v-photo{margin-top:calc(-1 * (var(--sec) + 64px));aspect-ratio:16/10}
}
@container (max-width:767px){
.q{--sec:64px}
.q .hd nav{display:none}
.q .hd-pill{margin-top:12px;padding-inline:16px 10px;gap:12px}
.q .logo{font-size:19px}
.q .hero{padding:88px var(--gut) 56px}
.q .hero-in{grid-template-columns:1fr;gap:40px}
.q .hero-txt{gap:20px}
.q .ctas{width:100%;flex-direction:column;align-items:stretch;gap:0;margin-top:4px}
.q .ctas .btn{width:100%}
.q .ctas .lnk{justify-content:center}
.q .hero-img{aspect-ratio:4/3}
.q .stamp{inset-inline-end:8px;bottom:56px;width:96px;height:96px}
.q .stamp .ico{display:none}
.q .now{inset-inline-start:12px;inset-inline-end:auto;bottom:-24px;min-width:0;max-width:calc(100% - 128px);padding:12px 16px;gap:12px}
.q .head{margin-bottom:32px}
.q .wall{grid-template-columns:1fr;height:min(520px,72svh)}
.q .col.c2{display:none}
.q .story-grid{grid-template-columns:1fr;grid-template-areas:"head" "vis" "steps";column-gap:0}
.q .st-head{margin-bottom:32px}
.q .st-vis{position:relative;top:auto;margin-bottom:56px}
.q .st-vis .pic{aspect-ratio:1/1}
.q .dial{width:152px;height:152px;inset-inline-end:12px;bottom:-40px}
.q .d-time{font-size:30px}
.q .d-lbl{font-size:12px}
.q .step{grid-template-columns:72px minmax(0,1fr);gap:12px;padding:20px 16px}
.q .st-time{font-size:22px}
.q .offer-grid{grid-template-columns:1fr;gap:72px}
.q .items{margin-inline:-12px}
.q .items li{padding:14px 12px}
.q .set{inset-inline-start:12px;bottom:-24px;padding:16px 20px}
.q .vpanel{padding:40px 24px}
.q .v-photo{margin-top:calc(-1 * (var(--sec) + 48px));aspect-ratio:4/3}
.q .form .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:56px}
.q .ft-top{grid-template-columns:1fr;gap:32px}
.q .ft-bot{margin-top:32px}
.q .ft-bot nav{gap:16px}
}
@media (prefers-reduced-motion:reduce){
.q.js .reveal{opacity:1}
.q .reveal.is-in,.q .hd-pill,.q .oi,.q .hero-vis,.q .stamp,.q .now{animation:none}
.q .col,.q .stamp svg.sc{animation:none}
.q .wall{height:auto;overflow:visible;-webkit-mask-image:none;mask-image:none}
.q .dup{display:none}
.q .btn,.q .lnk,.q .lnk .ico,.q .tab,.q .items li,.q .step,.q .st-time,.q .d-prog,.q .pic img,.q .hd-pill,.q .opt span{transition:none}
.q .btn:hover,.q .btn:active{transform:none}
.q .pic:hover img,.q .lnk:hover .ico{transform:none}
}
@container (max-width:767px){
@media (prefers-reduced-motion:reduce){.q .col.c2{display:flex;flex-direction:column}.q .wall{grid-template-columns:1fr}}
}`;

// ───────── HTML ─────────
const SCALLOP = "M115.4 60.0 L114.7 62.5 L112.8 64.8 L110.5 66.8 L108.5 68.8 L107.4 70.8 L107.5 73.1 L108.5 75.7 L109.7 78.6 L110.3 81.5 L109.9 84.0 L108.2 85.9 L105.5 87.2 L102.5 88.1 L99.8 88.9 L98.0 90.3 L97.1 92.4 L96.8 95.2 L96.7 98.3 L96.0 101.2 L94.5 103.3 L92.2 104.3 L89.2 104.3 L86.1 103.7 L83.3 103.4 L81.1 103.8 L79.4 105.3 L77.9 107.7 L76.4 110.5 L74.6 112.8 L72.3 114.0 L69.8 113.9 L67.1 112.6 L64.6 110.7 L62.2 109.2 L60.0 108.6 L57.8 109.2 L55.4 110.7 L52.9 112.6 L50.2 113.9 L47.7 114.0 L45.4 112.8 L43.6 110.5 L42.1 107.7 L40.6 105.3 L38.9 103.8 L36.7 103.4 L33.9 103.7 L30.8 104.3 L27.8 104.3 L25.5 103.3 L24.0 101.2 L23.3 98.3 L23.2 95.2 L22.9 92.4 L22.0 90.3 L20.2 88.9 L17.5 88.1 L14.5 87.2 L11.8 85.9 L10.1 84.0 L9.7 81.5 L10.3 78.6 L11.5 75.7 L12.5 73.1 L12.6 70.8 L11.5 68.8 L9.5 66.8 L7.2 64.8 L5.3 62.5 L4.6 60.0 L5.3 57.5 L7.2 55.2 L9.5 53.2 L11.5 51.2 L12.6 49.2 L12.5 46.9 L11.5 44.3 L10.3 41.4 L9.7 38.5 L10.1 36.0 L11.8 34.1 L14.5 32.8 L17.5 31.9 L20.2 31.1 L22.0 29.7 L22.9 27.6 L23.2 24.8 L23.3 21.7 L24.0 18.8 L25.5 16.7 L27.8 15.7 L30.8 15.7 L33.9 16.3 L36.7 16.6 L38.9 16.2 L40.6 14.7 L42.1 12.3 L43.6 9.5 L45.4 7.2 L47.7 6.0 L50.2 6.1 L52.9 7.4 L55.4 9.3 L57.8 10.8 L60.0 11.4 L62.2 10.8 L64.6 9.3 L67.1 7.4 L69.8 6.1 L72.3 6.0 L74.6 7.2 L76.4 9.5 L77.9 12.3 L79.4 14.7 L81.1 16.2 L83.3 16.6 L86.1 16.3 L89.2 15.7 L92.2 15.7 L94.5 16.7 L96.0 18.8 L96.7 21.7 L96.8 24.8 L97.1 27.6 L98.0 29.7 L99.8 31.1 L102.5 31.9 L105.5 32.8 L108.2 34.1 L109.9 36.0 L110.3 38.5 L109.7 41.4 L108.5 44.3 L107.5 46.9 L107.4 49.2 L108.5 51.2 L110.5 53.2 L112.8 55.2 L114.7 57.5Z";
const IMG = "../assets/media/real/s14/";

const HTML = `<div class="cwrap sk-s14"><div class="q" id="s14-top">
<a class="skip" href="#s14-main">דילוג לתוכן</a>
<header class="hd"><div class="hd-pill">
<a class="logo" href="#s14-top" aria-label="קמח ומלח, לראש הדף">${I.mark}<span>קמח ומלח</span></a>
<nav aria-label="ראשי"><a href="#s14-story">איך אופים</a><a href="#s14-menu">המדף</a><a href="#s14-reviews">ביקורות</a><a href="#s14-visit">ביקור והזמנה</a></nav>
<a class="btn sm" href="#s14-visit">להזמין לחם</a>
</div></header>
<main id="s14-main">
<section class="hero" aria-labelledby="s14-h1"><div class="hero-in">
<div class="hero-txt">
<span class="eyebrow oi">${I.leaf}מאפייה ובית קפה שכונתי</span>
<h1 class="oi" id="s14-h1">לחם מחמצת שיוצא מהתנור כל בוקר ב-<span class="tm" dir="ltr">6:30</span></h1>
<p class="lead oi">המחמצת שלנו בת תשע שנים והבצק תופח יממה שלמה. אפשר לקחת כיכר חמה הביתה, או לשבת עם קפה ולחכות לקרואסון הראשון.</p>
<div class="ctas oi"><a class="btn" href="#s14-visit">להזמין לחם למחר</a><a class="lnk" href="#s14-menu">מה יש על המדף${I.arrow}</a></div>
<ul class="meta oi"><li>${I.pin}<span>הגפן 14, חיפה</span></li><li>${I.clock}<span data-open>ראשון עד שישי, מ-6:30</span></li></ul>
</div>
<div class="hero-vis">
<figure class="pic hero-img"><img src="${IMG}hero-bread.webp" width="1600" height="1333" alt="כיכר מחמצת חתוכה ופרוסה על שולחן עץ ישן, ועוד כיכר עטופה במגבת פשתן ברקע" fetchpriority="high" decoding="async"></figure>
<div class="stamp" style="--spin:48s" aria-hidden="true"><svg class="sc" viewBox="0 0 120 120"><path d="${SCALLOP}"/></svg>${I.leaf}<span>מחמצת<br>טבעית</span></div>
<div class="now">${I.flame}<div><small>יוצא עכשיו מהתנור</small><strong data-fresh>כיכר מחמצת, בכל בוקר</strong></div></div>
</div>
</div></section>

<section class="sec proof" id="s14-reviews" aria-labelledby="s14-rv-h"><div class="wrap">
<div class="head c reveal"><span class="eyebrow">${I.leaf}ביקורות</span><h2 id="s14-rv-h">מה השכנים כותבים</h2><p class="lead">ביקורות מגוגל, כמו שנכתבו.</p></div>
<div class="wall reveal" data-crop-ok role="group" aria-label="ביקורות של לקוחות">${col(0, "c1")}${col(1, "c2")}${col(2, "c3")}</div>
<div class="proof-foot reveal"><p class="micro">ביקורות לדוגמה: טקסטים להדגמה בלבד, לא של עסק אמיתי.</p><button class="lnk" type="button" data-pause>${I.pause}<span>השהיית התנועה</span></button></div>
</div></section>

<section class="sheet story" id="s14-story" aria-labelledby="s14-st-h"><div class="story-grid">
<div class="st-vis reveal">
<figure class="pic"><img src="${IMG}baker-hands.webp" width="1100" height="1320" alt="אופה בכיסוי ראש מעצב כיכר מחמצת על שולחן מקומח, וכיכרות נוספות סביבו" loading="lazy" decoding="async"></figure>
<div class="dial" role="img" aria-label="שעון הלילה, מ-18:00 ועד 6:30"><svg viewBox="0 0 208 208" aria-hidden="true"><circle class="d-track" cx="104" cy="104" r="88"/><circle class="d-prog" cx="104" cy="104" r="88" pathLength="100" transform="rotate(-90 104 104)"/>${ticks}</svg><div class="d-ctr"><b class="d-time" dir="ltr">06:30</b><span class="d-lbl">פתוח</span></div></div>
</div>
<div class="st-head reveal"><span class="eyebrow">${I.leaf}איך אופים</span><h2 id="s14-st-h">הכיכר של הבוקר מתחילה אתמול בערב</h2><p class="lead">אין קיצורי דרך: הבצק נח יממה שלמה, ואנחנו רק מגיעים בזמן לכל שלב.</p></div>
<ol class="steps">${STEPS.map(stepHtml).join("")}</ol>
</div></section>

<section class="offer sec" id="s14-menu" aria-labelledby="s14-mn-h"><div class="offer-grid">
<div class="of-body">
<div class="head reveal"><span class="eyebrow">${I.leaf}המדף והקפה</span><h2 id="s14-mn-h">מה יש על המדף</h2><p class="lead">הכמויות קטנות והכל נאפה באותו בוקר. מה שנגמר, נגמר, ואפשר לשמור לכם מראש.</p></div>
<div class="tabs reveal" role="tablist" aria-label="קטגוריות">${MENU.map(tabHtml).join("")}</div>
<div class="panels">${MENU.map(panelHtml).join("")}</div>
<div class="of-foot reveal"><a class="lnk" href="#s14-visit">לשמור לכם כיכר${I.arrow}</a><p class="micro">המחירים כוללים מע"מ. הזמנה מראש עד 19:00 ליום המחרת.</p></div>
</div>
<div class="of-vis reveal">
<figure class="pic"><img src="${IMG}croissants.webp" width="1250" height="1000" alt="שני קרואסונים על מפית יוטה וכוס קפה עם חלב על שולחן עץ" loading="lazy" decoding="async"></figure>
<div class="set"><small>סט הבוקר</small><strong>קפה וקרואסון חמאה</strong><span class="price">26 ₪</span></div>
</div>
</div></section>

<section class="visit" id="s14-visit" data-cta-end aria-labelledby="s14-vs-h"><div class="vpanel reveal">
<figure class="pic v-photo"><img src="${IMG}cafe-window.webp" width="1400" height="1050" alt="פינת הישיבה של בית הקפה בבוקר, שולחנות עץ וחלון גדול שהשמש נכנסת דרכו" loading="lazy" decoding="async"></figure>
<ul class="vinfo">
<li>${I.pin}<div><b>הגפן 14, חיפה</b><span>חניה ברחוב, ועוד שתי דקות הליכה מהגינה הקטנה</span></div></li>
<li>${I.clock}<div><b data-open>ראשון עד שישי, מ-6:30</b><span>ראשון עד חמישי 6:30 עד 17:00, שישי 6:30 עד 14:00</span></div></li>
<li>${I.phone}<div><a href="tel:+97245550142" dir="ltr">04-555-0142</a><span>אפשר להתקשר גם לשאול מה נשאר</span></div></li>
</ul>
<div class="v-body">
<div class="head"><span class="eyebrow">${I.leaf}ביקור והזמנה</span><h2 id="s14-vs-h">לשמור לכם כיכר למחר?</h2><p class="lead">משאירים שם וטלפון ובוחרים כיכר. נשלח הודעה לאישור, והכיכר מחכה בשקית עם השם שלכם עד 10:00.</p></div>
<form class="form" novalidate>
<div class="row">
<div class="fld"><label for="s14-name">שם</label><input class="in" id="s14-name" name="name" autocomplete="name" required aria-describedby="s14-name-m"><span class="msg" id="s14-name-m">${I.alert}איך נקרא לכם?</span></div>
<div class="fld"><label for="s14-tel">טלפון</label><input class="in" id="s14-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s14-tel-m"><span class="msg" id="s14-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<fieldset><legend class="legend">איזו כיכר לשמור?</legend><div class="opts">
<label class="opt"><input type="radio" name="loaf" value="white" checked><span>מחמצת לבנה</span></label>
<label class="opt"><input type="radio" name="loaf" value="whole"><span>קמח מלא וגרעינים</span></label>
<label class="opt"><input type="radio" name="loaf" value="rye"><span>שיפון ואגוזים</span></label>
</div></fieldset>
<div class="form-foot"><button class="btn" type="submit">לשמור לי כיכר</button><p class="micro">בלי רשימות תפוצה. את הטלפון משתמשים רק לאישור ההזמנה.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="tick">${I.check}</span><h3>קיבלנו</h3><p class="lead">נשלח הודעה לאישור עוד היום, והכיכר תחכה לכם בבוקר.</p></div>
</div>
</div></section>
</main>

<footer class="ft"><div class="ft-top">
<div class="ft-brand"><a class="logo" href="#s14-top" aria-label="קמח ומלח, לראש הדף">${I.mark}<span>קמח ומלח</span></a><p>מאפייה ובית קפה שכונתי בחיפה. מחמצת בת תשע שנים ותנור אבן, בלב השכונה.</p></div>
<div class="ft-col"><p class="ft-h">שעות</p><span>ראשון עד חמישי, 6:30 עד 17:00</span><span>שישי, 6:30 עד 14:00</span></div>
<div class="ft-col"><p class="ft-h">להגיע</p><address>הגפן 14, חיפה</address><a href="tel:+97245550142" dir="ltr" style="unicode-bidi:isolate">04-555-0142</a><a href="https://waze.com/ul?q=%D7%94%D7%92%D7%A4%D7%9F%2014%20%D7%97%D7%99%D7%A4%D7%94" rel="noopener">ניווט ב-Waze</a></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s14-story">איך אופים</a><a href="#s14-menu">המדף</a><a href="#s14-reviews">ביקורות</a><a href="#s14-visit">ביקור והזמנה</a></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> קמח ומלח</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
<div class="ft-word" aria-hidden="true">קמח ומלח</div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
// reduced-motion: reveal ופתיחה כבויים; הספירה בשעון נשארת (טקסט שמשתנה, לא תנועה).
const JS = `(function(){var root=document.querySelector(".sk-s14");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return(r||q).querySelector(s)}function $$(s,r){return[].slice.call((r||q).querySelectorAll(s))}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
/* הדר: headroom */
var hd=$(".hd"),top=document.querySelector(".vtop"),lastTop=-1,hidden=false,lastY=window.scrollY,acc=0;
function place(){if(!hd||!top)return;var s=getComputedStyle(top),v=s.position==="sticky"&&s.display!=="none"?top.offsetHeight:0;if(v!==lastTop){lastTop=v;hd.style.top=v+"px"}}
function setHidden(v){if(v===hidden)return;hidden=v;hd.classList.toggle("is-hidden",v)}
function onScroll(){place();var y=window.scrollY,d=y-lastY;lastY=y;if(y<=96){acc=0;setHidden(false);return}
acc=(d>0)===(acc>0)?acc+d:d;if(acc>6)setHidden(true);else if(acc<-6)setHidden(false)}
window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",place);hd.addEventListener("focusin",function(){setHidden(false)});place();
/* שעות פתיחה בשעון ישראל והכיכר שיוצאת עכשיו */
var HRS={0:[390,1020],1:[390,1020],2:[390,1020],3:[390,1020],4:[390,1020],5:[390,840]},DAY=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
function ft(m){var h=Math.floor(m/60),mm=m%60;return h+":"+(mm<10?"0":"")+mm}
function il(){try{var o={};new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});
return{d:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],m:(+o.hour%24)*60+(+o.minute)}}catch(e){return null}}
var n=il();if(n){var h=HRS[n.d],open=!!h&&n.m>=h[0]&&n.m<h[1],txt;
if(open){txt="פתוח עכשיו עד "+ft(h[1])}else{var k,dd,hh;for(k=0;k<8;k++){dd=(n.d+k)%7;hh=HRS[dd];if(hh&&(k>0||n.m<hh[0]))break}
txt="סגור כרגע, נפתח "+(k===0?"היום":k===1?"מחר":"ביום "+DAY[dd])+" ב-"+ft(HRS[dd][0])}
$$("[data-open]").forEach(function(e){e.textContent=txt});
var fr=$("[data-fresh]");if(fr)fr.textContent=!open?"פותחים בבוקר ב-6:30":n.m<600?"כיכר מחמצת לבנה, חמה":n.m<780?"קרואסון חמאה ושושוניות":"בגט מחמצת"}
/* reveal פעם אחת */
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* קיר הביקורות: עוצר מחוץ למסך, וכפתור השהיה לכל התנועה הרציפה */
var wall=$(".wall"),pb=$("[data-pause]");
if(wall&&"IntersectionObserver" in window){var wo=new IntersectionObserver(function(en){en.forEach(function(x){wall.classList.toggle("is-off",!x.isIntersecting)})});wo.observe(wall)}
if(pb)pb.addEventListener("click",function(){var p=q.hasAttribute("data-paused");if(p)q.removeAttribute("data-paused");else q.setAttribute("data-paused","");pb.innerHTML=(p?'<svg class="ico s" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14"/><path d="M15 5v14"/></svg><span>השהיית התנועה</span>':'<svg class="ico s" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg><span>הפעלת התנועה</span>')});
/* הלילה של הכיכר: שעון שמתמלא לפי השלב האחרון שעבר את קו 62% מהמסך. נמדד בגלילה ונכתב רק כשהשלב משתנה */
var steps=$$(".step"),prog=$(".d-prog"),tEl=$(".d-time"),lEl=$(".d-lbl"),cur=-1,shown=750,raf=0;
function fmt(m){var t=(1080+m)%1440,h=Math.floor(t/60),mm=t%60;return(h<10?"0":"")+h+":"+(mm<10?"0":"")+mm}
function countTo(to){cancelAnimationFrame(raf);var from=shown,t0=null;function f(ts){if(t0===null)t0=ts;var p=Math.min(1,(ts-t0)/600),e=1-Math.pow(1-p,3);shown=Math.round(from+(to-from)*e);tEl.textContent=fmt(shown);if(p<1)raf=requestAnimationFrame(f);else shown=to}raf=requestAnimationFrame(f)}
function setStep(i,instant){if(i===cur)return;cur=i;steps.forEach(function(s,j){s.classList.toggle("is-on",j===i)});var s=steps[i];
if(instant){prog.style.transition="none";prog.style.strokeDashoffset=String(100-100*(+s.dataset.p));void prog.getBoundingClientRect();prog.style.transition="";shown=+s.dataset.min;tEl.textContent=fmt(shown)}
else{prog.style.strokeDashoffset=String(100-100*(+s.dataset.p));countTo(+s.dataset.min)}lEl.textContent=s.dataset.label}
var story=$(".story"),storyOn=false;
function syncSteps(){var line=window.innerHeight*.62,a=0;for(var i=0;i<steps.length;i++){if(steps[i].getBoundingClientRect().top<=line)a=i}setStep(a,false)}
if(steps.length&&prog){setStep(0,true);
if("IntersectionObserver" in window&&story){new IntersectionObserver(function(en){storyOn=en[0].isIntersecting;if(storyOn)syncSteps()}).observe(story)}
window.addEventListener("scroll",function(){if(storyOn)syncSteps()},{passive:true})}
/* המדף: טאבים */
var tabs=$$(".tab"),panels=$$(".panel");
function pick(i,focus){tabs.forEach(function(t,j){t.setAttribute("aria-selected",String(j===i));t.tabIndex=j===i?0:-1});panels.forEach(function(p,j){p.hidden=j!==i});if(focus)tabs[i].focus()}
if(tabs.length){pick(0,false);var rtl=getComputedStyle(q).direction==="rtl";
tabs.forEach(function(t,i){t.addEventListener("click",function(){pick(i,false)});t.addEventListener("keydown",function(e){var d=e.key==="ArrowLeft"?(rtl?1:-1):e.key==="ArrowRight"?(rtl?-1:1):0;
if(d){e.preventDefault();pick((i+d+tabs.length)%tabs.length,true)}else if(e.key==="Home"){e.preventDefault();pick(0,true)}else if(e.key==="End"){e.preventDefault();pick(tabs.length-1,true)}})})}
/* טופס ההזמנה */
var form=$(".form"),vp=$(".vpanel");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/\\D/g,"").length>=9);
if(bad){bad.focus();return}vp.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Warm Organic", group: "שפות מהשטח",
  when: "מאפיות ובתי קפה, מזון טבעי, קוסמטיקה וסדנאות, קליניקות ומטפלים, יוגה, דולות, סטודיו לקרמיקה ואירוח. כל עסק קטן ושכונתי שמוכר רוגע, מגע וחומר, כשהתוכן הוא הכוכב והצילום אמיתי. האלטרנטיבה החמה והבהירה ל-s05.",
  no: "משפט, פיננסים, ביטחון, טכנולוגיה ומערכות: שם החום נקרא כחוסר רצינות. וגם לא לחנויות עם מאות מוצרים, ולא כשאין צילום אמיתי וחם: בלי תמונות טובות השפה נשארת צבע בלבד.",
  recipe: `פלטה: פשתן #F5EFE6 (הרקע, אף פעם לא לבן) · cream #FBF8F3 · חול #EFE6D8 ובהובר חול כהה #E6DAC7 (אותה משפחה, בלי צל) · paper #FFFCF7 (המשטח הלבן היחיד, ורק עליו צל)
ink #2F2A25 (חום כהה, לא שחור) · muted #6B6157 על פשתן, muted-s #5A5047 על חול (4.4 נופל על חול כהה, 5.7 עובר)
טרקוטה #A9502F (CTA, מספרים, מצב פעיל; שמנת עליה 5.15) · הובר #8F4327 · טקסט טרקוטה #9A4A2B (5.4 על פשתן, 5.0 על חול)
מרווה #6F7F63 רק באייקונים ובאיורים (3.8 על פשתן, מספיק לגרפיקה) · טקסט מרווה #56644B (5.5) לשורת הפתיחה בלבד
רדיוסים: pill 999 לכפתורים, שדות ובחירות · כרטיס, שורה ותמונה 24 · לוח 40 · יריעה 56 · פינה עגולה אחת בהירו (clamp 96 עד 224)
גרעין נייר: אריח PNG של 128px עם שקיפות ממוצעת 3%, כ-background-image על כל משטח פשתן וחול (לא SVG, לא שכבה קבועה)
Google Sans בלבד, שלושה משקלים: כותרות ופעולות 500, גוף 400, מספרים ושורת פתיחה 600 · H1 52/1.1/-.01em (יחס 3.25) · H2 38 · H3 20 · ליד 17 · גוף 16 · ללא ריווח חיובי
צל: 0 10px 30px rgba(74,54,36,.10), רק על משטח paper (כרטיס "יוצא עכשיו", שעון, סט הבוקר, ההדר הצף)
תנועה: reveal 16px/0.5s, סטאגר 70ms בתוך קבוצה, פתיחה 1.2s, שעון 0.6s, headroom 0.4s · ease cubic-bezier(.2,.6,.2,1) · תנועה רציפה (קיר, חותם) כ-CSS על transform`,
  apply: "הדר גלולה צפה על paper עם headroom, בלי קו; הירו בשני טורים: הטקסט בהתחלה, תמונה חמה בסוף עם פינה עגולה אחת, חותם מסתובב בקצה ותג 'יוצא עכשיו' שחוצים אותה. כל סקשן נפתח באותו eyebrow (עלה מרווה ושורת פתיחה). הוכחה כקיר ביקורות רגוע על כרטיסי חול. רגע החתימה על יריעת חול עגולה עם צילום ושעון. הרשימות בלי קווים: רווח, ובהובר גוון חול. הטופס בשדות pill עם בחירות pill, והמצב הפעיל בטרקוטה. בלוק ההזמנה לוח חול עגול שהצילום עולה מעליו. הפוטר יריעת חול כהה עם מילת המותג כצל טון על טון.",
  sig: "פינה עגולה אחת בצילום ההירו · חותם מסורג שמסתובב לאט · 'הלילה של הכיכר': שעון שמתמלא בטרקוטה בין 18:00 ל-6:30 והמספר שבמרכזו סופר עם כל שלב · '6:30' כמספר בטרקוטה בתוך הכותרת · צל וטרקוטה רק במקומות הסגורים, והחום מגיע מהנייר, מהצילום ומהצורות.",
  avoid: "פסטל חיוור וחסר רוויה (קליימורפיזם עייף) · בלובים · צל רך על הכל · קו או מסגרת על כרטיס, כי ההפרדה היא בגוון · טרקוטה גם כרקע וגם ככפתור · מרווה בכפתור או בטקסט גדול · סריף לגוף הטקסט, וגם לא כותרת סריף שאי אפשר לכייל · תמונות סטוק קרות עם פילטר חם: הגריידינג אחד לכל התמונות, והצילום עצמו חם · אייקוני אימוג'י.",
  qa: ["רקע פשתן וגרעין נייר גלוי רק מקרוב, ink חום ולא שחור", "טרקוטה רק על CTA, מספרים ומצב פעיל; מרווה רק באייקונים ובאיורים", "צל רק על משטח paper, ומשטח חול מכהה בהובר בלי צל", "פינה עגולה אחת בעמוד, בתמונת ההירו", "טקסט על חול בצבע muted-s ולא muted (AA)", "שלושה משקלים בלבד, בלי ריווח חיובי", "reveal ב-keyframes; תנועה רציפה נעצרת ב-reduced-motion וב'השהיית התנועה'"],
  engine: "ניגודיות (נמדד 6.10.2026): muted #6B6157 על פשתן 5.3, על חול 4.9, על חול כהה 4.4 (נופל, לכן muted-s #5A5047 = 5.7) · טקסט טרקוטה #9A4A2B על פשתן 5.4, על חול 5.0, על paper 6.1 · שמנת על טרקוטה 5.15 ועל הובר 6.65 · מרווה #6F7F63 על פשתן 3.8 ועל חול 3.5 (איקונים בלבד, 3:1) · גבול שדה #857058 על חול 3.8. שדות 16px. הפונט הוא Google Sans בלבד, בלי סריף. קיר הביקורות והחותם עוצרים בכפתור 'השהיית התנועה' (WCAG 2.2.2), בריחוף, מחוץ למסך וב-reduced-motion; הכל נראה בלי JS.",
  agent: "עצב בסגנון חם-אורגני: רקע פשתן חם עם גרעין נייר, טקסט חום כהה, מבטא טרקוטה אחד לכפתורי pill ולמספרים, ירוק מרווה רק באייקונים ובאיורים, Google Sans בשלושה משקלים, צילום אמיתי וחם באותו גריידינג עם פינה עגולה אחת בתמונת ההירו, יריעות חול עגולות במקום קווים, צל רק על משטח לבן, ורגע חתימה אחד שמרגיש כמו מלאכה (שעון שמתמלא, חותם מסתובב). אפס קווים ומסגרות לקישוט.",
  mobile: "ההדר: הניווט נעלם והכפתור (44px) נשאר בתוך הגלולה. ההירו: טקסט קודם, הכפתור הראשי ברוחב מלא, והצילום מציץ מתחת. הקיר בטור אחד. השעון יורד לתחתית התמונה, והשלבים בעמודה עם מספר קטן יותר. הטאבים בשורה אחת, השורות עם ריפוד מצומצם, התמונה של בלוק ההזמנה עולה על הלוח כמו בדסקטופ והטופס בעמודה אחת עם בחירות במגע של 44px.",
  fonts: [],
};

export default [
  {
    ...base,
    id: "s14", name: "חם אורגני",
    desc: "פשתן, טרקוטה וירוק מרווה על נייר עם גרעין. צילום חם אמיתי, צורות עגולות וקצב איטי: מרגיש כמו חדר טיפולים או מאפייה שכונתית באור של בוקר, לא כמו אפליקציה. כאן כעמוד אמיתי של מאפייה ובית קפה (דמיוני), לא שלד צבוע.",
    score: "30/30",
    note: "רף הסטודיו: 30/30, כל שבעת ה-★ עוברים. הכלי מדד 19 סעיפים וכולם עברו; ששת סעיפי העין (10, 11, 12, 17, 26, 30) נבדקו בצילומים בגודל אמיתי, וחמשת האחרים (15, 21, 22, 23, 27) לא חלים על העמוד כפי שהכלי קורא אותם ונבדקו בעין. מתח H1/גוף 52/16 = 3.25 (Google Sans) · שלושה משקלים: 500 כותרות, 600 מספרים ופעולות, 400 גוף · סולם ריווח 112/88/64 ו-4 עד 72, אפס חריגות · טיפול תמונה אחד: רדיוס 24, פינה עגולה אחת בהירו, גריידינג חם אחד לכל התמונות · כפתור בארבעה מצבים ושלוש רמות · reveal אחד ב-keyframes, 0.5s, 16px, סטאגר 70ms בקבוצה · הדר גלולה צפה עם headroom ופוטר יריעה (617px) · אפס קווים ומסגרות לקישוט, צל רק על משטח paper. רגע החתימה: 'הלילה של הכיכר', שעון שמתמלא בין 18:00 ל-6:30 והמספר שבמרכזו סופר עם השלב שעבר את קו 62% מהמסך. העסק, הביקורות, הכתובת והטלפון דמיוניים. הצילומים סטוק של Magnific, מקוצצים ובגריידינג חם אחיד: hero-bread (428123180), baker-hands (428357013), croissants (417523884), cafe-window (423192570). גרעין הנייר הוא אריח PNG של 128px (grain.png). בדוק: גלול לאט וראה את השעון מתמלא, עבור עם העכבר על כפתור, שורה בתפריט ותמונה, עצור את התנועה בכפתור 'השהיית התנועה', Tab בין השדות.",
    css: CSS, html: HTML, js: JS,
  },
];
