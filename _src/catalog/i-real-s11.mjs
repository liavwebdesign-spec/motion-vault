// s11 · ממפיס (Memphis): עמוד אמיתי של גלידריה (דמיונית) "כדור ומשולש", ברף הסטודיו. כתוב מחדש ב-15.10.2026.
// עצמאי: אין import מ-i-style1.mjs ואין דגל archived.

const EASE = "cubic-bezier(.2,.6,.2,1)";

// ───────── אייקונים: משפחה אחת, קו 1.8 (כמו משקל הטקסט 500), 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  arrow: svg(" s", `<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  pin: svg(" s", `<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`),
  clock: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  phone: svg(" s", `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`),
  check: svg("", `<path d="M20 6 9 17l-5-5"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>`),
};
// סמל המותג: כדור ומשולש. מלא, כי זה סימן ולא אייקון
const MARK = `<span class="mk" aria-hidden="true"></span>`;
const stars = n => `<span class="stars" role="img" aria-label="${n} מתוך 5">${[1, 2, 3, 4, 5].map(k => `<i${k <= n ? "" : ' class="off"'}></i>`).join("")}</span>`;

// ───────── צורות הירו: ציור SVG בלבד, בלי קליפ-ארט ──────────
const SHAPES = {
  half: `<svg viewBox="0 0 120 60"><path d="M0 60a60 60 0 0 1 120 0z" fill="var(--cob)"/></svg>`,
  tri: `<svg viewBox="0 0 100 90"><path d="M50 0 100 90H0z" fill="var(--pink)"/></svg>`,
  ring: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--mint)" stroke-width="22"/></svg>`,
  zig: `<svg viewBox="0 0 160 44"><path d="M5 36 25 8l22 28L69 8l22 28 22-28 22 28 20-28" fill="none" stroke="var(--ink)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  dots: `<svg viewBox="0 0 100 100">${[0, 1, 2, 3].flatMap(r => [0, 1, 2, 3].map(c => `<circle cx="${14 + c * 24}" cy="${14 + r * 24}" r="6.5" fill="var(--ink)"/>`)).join("")}</svg>`,
  squig: `<svg viewBox="0 0 160 40"><path d="M5 20c9-21 18-21 27 0s18 21 27 0 18-21 27 0 18 21 27 0 18-21 20-8" fill="none" stroke="var(--cob)" stroke-width="8" stroke-linecap="round"/></svg>`,
};
const shp = (k, cls, style, d) => `<div class="shp ${cls}" style="${style}" aria-hidden="true"><div class="sv" style="--d:${d}">${SHAPES[k]}</div></div>`;

// ───────── קיר הטעמים: צבע = משפחה, דוגמה = הטעם ─────────
const FAM = { pink: "פירות אדומים", yel: "חמצמץ ורענן", mint: "ירוק ועשבים", cob: "קרמי ועמוק" };
const FLAVORS = [
  ["תות ובזיליקום", "תותי שדה מהמושב ועלי בזיליקום טריים", "pink", "dots", "circle"],
  ["לימון וג'ינג'ר", "חמצמץ וחד, קר עד העצם", "yel", "zig", "arch"],
  ["פיסטוק סיציליאני", "קלוי קל, בלי צבע מלאכותי", "mint", "stripe", "leaf"],
  ["שוקולד מריר", "שבעים אחוז קקאו וקורטוב מלח ים", "cob", "check", "sq"],
  ["פטל ורימון", "כמעט סורבה, בלי חלב ובלי ביצים", "pink", "grid", "leaf"],
  ["פסיפלורה", "חמצמץ ונקי, סורבה", "yel", "ring", "circle"],
  ["נענע ושבבי שוקולד", "נענע מהמרפסת ושבבים מרירים", "mint", "dots", "sq"],
  ["חלבה וקפה", "חלבה טחינית ואספרסו כפול", "cob", "stripe", "arch"],
  ["אשכולית ורודה", "מרירות קלה ומתיקות ארוכה", "pink", "zig", "sq"],
  ["אננס ונענע", "קר כמו קוקטייל, סורבה", "yel", "check", "leaf"],
  ["תפוח ירוק ומליסה", "פריך, ירוק וקליל", "mint", "ring", "arch"],
  ["וניל ומלח ים", "וניל אמיתי וקרם עמוק", "cob", "half", "circle"],
];
const tile = (f, i) => `<li class="tl reveal" style="--i:${i % 4}"><div class="art f-${f[2]} pt-${f[3]} sh-${f[4]}" aria-hidden="true"></div><div class="cap"><span class="fam">${FAM[f[2]]}</span><h3>${f[0]}</h3><p>${f[1]}</p></div></li>`;
const legend = `<ul class="legend" aria-label="משפחות הטעמים"><li><i class="lg lg-tri" style="--c:var(--pink)"></i>${FAM.pink}</li><li><i class="lg lg-cir" style="--c:var(--yel)"></i>${FAM.yel}</li><li><i class="lg lg-half" style="--c:var(--mint)"></i>${FAM.mint}</li><li><i class="lg lg-sq" style="--c:var(--cob)"></i>${FAM.cob}</li></ul>`;

// ───────── התפריט ─────────
const MENU = [
  ["על המקום", [
    ["כדור אחד", "בכוס או בקונוס וופל שנאפה אצלנו", 16],
    ["שני כדורים", "שני טעמים לבחירה, אפשר לערבב משפחות", 24],
    ["שלושה כדורים", "שלושה טעמים ורוטב חם לבחירה", 30],
    ["ספלית סורבה", "טעמי הפירות, בלי חלב ובלי ביצים", 22],
  ]],
  ["לקחת הביתה", [
    ["קרטון חצי ליטר", "שלושה טעמים, ארוז בקירור", 42],
    ["קרטון ליטר", "עד חמישה טעמים", 70],
    ["עוגת גלידה", "לשמונה אנשים, בהזמנה עד יומיים מראש", 190],
  ]],
];
const menuGroup = (g, gi) => `<div class="mg reveal" style="--i:${gi}"><h3>${g[0]}</h3><ul class="items">${g[1].map(m => `<li><div class="it"><h4>${m[0]}</h4><p>${m[1]}</p></div><span class="pr" aria-label="${m[2]} שקלים">${m[2]}<small> ₪</small></span></li>`).join("")}</ul></div>`;


const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
@property --pc{syntax:"<color>";inherits:true;initial-value:#ffffff}
.cwrap{container-type:inline-size}
.q{--ink:#1C1A44;--ink-2:#3A3870;--paper:#FFFBF1;
 --pink:#FF6FAE;--pink-t:#FFDDEA;--pink-th:#FFC9DD;
 --yel:#FFCE2B;--yel-t:#FFF0B3;--yel-th:#FFE680;
 --mint:#6BE2C3;--mint-t:#D6F7EC;--mint-th:#BCEFDF;
 --cob:#2B3CDD;--cob-d:#1D2BB4;--on-cob:#FFFFFF;--on-cob-2:#DCE0FF;--on-ink-2:#D4D2F2;--err:#B3261E;
 --mk-ink:var(--ink);--ease:${EASE};
 --sec:112px;--gut:clamp(20px,5cqi,72px);--hd:72px;
 background:var(--paper);color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.6;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q h4,.q p,.q ul,.q ol,.q figure,.q blockquote,.q address,.q fieldset,.q legend{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q fieldset{border:0;padding:0;min-width:0}
.q a{color:inherit;text-decoration:none}
.q address{font-style:normal}
.q img{display:block;max-width:100%}
.q button{font:inherit;color:inherit}
.q h1{font-size:clamp(36px,4.6cqi,64px);line-height:1.05;font-weight:700;text-wrap:balance}
.q h2{font-size:clamp(30px,3.4cqi,46px);line-height:1.12;font-weight:700;text-wrap:balance}
.q h3{font-size:20px;line-height:1.3;font-weight:500}
.q h4{font-size:17px;line-height:1.3;font-weight:500}
.q p{text-wrap:pretty}
.q .lead{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:520px}
.q .micro{font-size:13px;line-height:1.45;color:var(--ink-2)}
.q .eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:8px;background:var(--eb,var(--yel-t));font-size:14px;font-weight:700;line-height:1.2;color:var(--ink)}
.q .eyebrow::before{content:"";width:12px;height:12px;background:var(--cob);clip-path:polygon(50% 0,100% 100%,0 100%);flex:none}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block}
.q .ico.s{width:20px;height:20px}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;background:var(--paper);color:var(--ink);padding:12px 20px;border-radius:12px;font-weight:500}
.q .skip:focus{top:8px}
.q :is(a,button,summary,[tabindex]):focus-visible{outline:3px solid var(--ink);outline-offset:3px;border-radius:12px}
/* כפתורים: שלוש רמות, ארבעה מצבים. כחול הוא הצבע של פעולה בלבד */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:14px 28px;border:0;border-radius:12px;background:var(--cob);color:var(--on-cob);font-size:16px;font-weight:700;line-height:1;cursor:pointer;transition:background .18s var(--ease),transform .18s var(--ease);-webkit-tap-highlight-color:transparent;white-space:nowrap}
.q .btn:active{transform:scale(.98);transition-duration:.12s}
.q .btn.sm{min-height:44px;padding:10px 20px;font-size:15px}
.q .lnk{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:12px 0;background:none;border:0;font-size:16px;font-weight:700;line-height:1;color:var(--ink);cursor:pointer;text-decoration:underline;text-decoration-thickness:2px;text-decoration-color:var(--ink);text-underline-offset:6px;transition:color .15s var(--ease),text-decoration-color .15s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
@media (hover:hover) and (pointer:fine){
.q .btn:hover{background:var(--cob-d);transform:translateY(-2px)}
.q .lnk:hover{color:var(--cob);text-decoration-color:var(--cob)}
.q .lnk:hover .ico{transform:translateX(-4px)}
}
/* שדות: חמישה מצבים */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label,.q .legend-t{font-size:15px;font-weight:500;line-height:1.2;color:var(--ink)}
.q .in{font:inherit;font-size:16px;line-height:1.2;min-height:52px;padding:14px 16px;border:2px solid var(--ink);border-radius:12px;background:var(--yel-t);color:var(--ink);appearance:none;width:100%;transition:background .15s var(--ease),border-color .15s var(--ease),box-shadow .15s var(--ease)}
.q .in::placeholder{color:#55537F}
@media (hover:hover) and (pointer:fine){.q .in:hover{background:var(--yel-th)}}
.q .in:focus,.q .in:focus-visible{outline:0;border-color:var(--cob);background:var(--paper);box-shadow:0 0 0 4px rgba(43,60,221,.22)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;align-items:center;gap:6px;font-size:14px;line-height:1.3;color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{background:#EDEBF7;color:var(--ink-2);border-color:#8D8BB5}
/* reveal: keyframes ולא transition. התוכן גלוי בלי JS */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:mrev .5s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes mrev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* פתיחת עמוד אחת: ההדר יורד, הטקסט עולה, הקשת עולה והצורות מתאספות סביבה */
.q .hd-in{animation:mhd .6s ${EASE} both}
.q .oi{animation:mup .6s ${EASE} both}
.q .oi:nth-child(1){animation-delay:.1s}.q .oi:nth-child(2){animation-delay:.18s}.q .oi:nth-child(3){animation-delay:.26s}.q .oi:nth-child(4){animation-delay:.34s}.q .oi:nth-child(5){animation-delay:.42s}
.q .arch{animation:march .9s ${EASE} .15s both}
.q .sv{animation:mshape .9s ${EASE} both;animation-delay:calc(.45s + var(--d) * 90ms)}
@keyframes mhd{from{opacity:0;translate:0 -18px}to{opacity:1;translate:0 0}}
@keyframes mup{from{opacity:0;translate:0 18px}to{opacity:1;translate:0 0}}
@keyframes march{from{opacity:0;translate:0 44px}to{opacity:1;translate:0 0}}
@keyframes mshape{from{opacity:0;translate:var(--fx,0) var(--fy,40px);rotate:var(--fr,-60deg);scale:.2}to{opacity:1;translate:0 0;rotate:0deg;scale:1}}
/* תמונות */
.q .pic{overflow:hidden;background:var(--mint-t)}
.q .pic img{width:100%;height:100%;object-fit:cover;border-radius:inherit;transition:transform .5s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .pic:hover img{transform:scale(1.03)}}
/* מבנה */
.q .wrap{max-width:1320px;margin-inline:auto}
.q .sec{padding:var(--sec) var(--gut)}
.q .head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:640px;margin-bottom:56px}
.q section[id]{scroll-margin-top:96px}
/* הדר */
.q .hd{position:sticky;top:0;z-index:30;background:var(--paper);transition:transform .4s var(--ease)}
.q .hd.is-hidden{transform:translateY(-100%)}
.q .hd-in{max-width:1320px;margin-inline:auto;height:var(--hd);padding-inline:var(--gut);display:flex;align-items:center;gap:24px}
.q .logo{display:inline-flex;align-items:center;gap:10px;min-height:44px;white-space:nowrap;font-size:22px;font-weight:700;line-height:1;color:var(--ink)}
.q .mk{position:relative;width:32px;height:32px;flex:none}
.q .mk::before{content:"";position:absolute;left:7px;top:2px;width:18px;height:18px;border-radius:50%;background:var(--pink)}
.q .mk::after{content:"";position:absolute;left:7px;top:15px;width:18px;height:15px;background:var(--mk-ink);clip-path:polygon(0 0,100% 0,50% 100%)}
.q .hd nav{display:flex;gap:4px;margin-inline:auto}
.q .hd .btn.sm{margin-inline-start:auto}
.q .hd nav a{display:inline-flex;align-items:center;min-height:44px;font-size:15px;font-weight:500;line-height:1;padding:10px 16px;border-radius:12px;transition:background .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .hd nav a:hover{background:var(--yel-t)}}
/* הירו: שדה צהוב, קשת צילום וצורות שמתאספות סביבה */
.q .hero{position:relative;background:var(--yel);padding:40px var(--gut) 72px;min-height:min(calc(100svh - var(--hd) - 40px),780px);display:flex;align-items:center}
.q .hero::after{content:"";position:absolute;inset-inline:0;bottom:-1px;height:22px;background:var(--paper);-webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='22' viewBox='0 0 44 22'><path d='M0 22 22 0l22 22z'/></svg>") repeat-x bottom/44px 22px;mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='22' viewBox='0 0 44 22'><path d='M0 22 22 0l22 22z'/></svg>") repeat-x bottom/44px 22px}
.q .hero-in{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;width:100%;max-width:1320px;margin-inline:auto}
.q .hero-txt{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.q .hero h1{max-width:600px}
.q .hero .lead{color:var(--ink-2)}
.q .hero{--eb:var(--paper)}
.q .ctas{display:flex;align-items:center;flex-wrap:wrap;gap:8px 28px;margin-top:8px}
.q .meta{display:flex;flex-wrap:wrap;gap:12px 24px;font-size:15px;line-height:1.3;color:var(--ink);margin-top:8px}
.q .meta li{display:flex;align-items:center;gap:8px}
.q .stage{--sh:clamp(340px,calc(100svh - 260px),620px);position:relative;width:min(100%,calc(var(--sh) * .875));aspect-ratio:7/8;margin-inline:auto}
.q .arch{position:absolute;inset:5% 13% 6% 13%;border-radius:999px 999px 0 0;z-index:1}
.q .arch img{object-position:30% 55%}
.q .shp{position:absolute;transform:translate3d(0,calc(var(--sy,0px) * var(--k,0)),0);will-change:transform}
.q .shp .sv,.q .shp svg{display:block;width:100%;height:auto}
.q .s-half{left:-6%;bottom:2%;width:40%;z-index:3;--k:-.08;--fx:60px;--fy:60px;--fr:-40deg}
.q .s-tri{right:-3%;top:0;width:27%;z-index:2;rotate:12deg;--k:.16;--fx:-40px;--fy:-70px;--fr:90deg}
.q .s-ring{left:1%;top:4%;width:23%;z-index:0;--k:.1;--fx:40px;--fy:-50px;--fr:120deg}
.q .s-zig{right:-5%;bottom:13%;width:38%;z-index:3;rotate:-12deg;--k:-.12;--fx:-60px;--fy:30px;--fr:30deg}
.q .s-dots{right:-1%;top:34%;width:17%;z-index:0;--k:.2;--fx:-50px;--fy:0;--fr:-90deg}
.q .s-squig{left:-4%;top:46%;width:30%;z-index:0;rotate:-14deg;--k:-.18;--fx:50px;--fy:20px;--fr:60deg}
/* הוכחה: קלה ושקטה */
.q .proof{background:var(--paper)}
.q .proof-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:24px;align-items:stretch}
.q .p-photo{grid-column:1 / span 5;border-radius:999px 999px 0 0;aspect-ratio:4/3}
.q .q-big{grid-column:6 / span 7}
.q .q-sm.a{grid-column:1 / span 4}
.q .q-sm.b{grid-column:5 / span 4;margin-top:32px}
.q .rate{grid-column:9 / span 4;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:0 8px}
.q .rv{display:flex;flex-direction:column;justify-content:space-between;gap:24px;padding:32px;border-radius:12px;transition:background .3s var(--ease)}
.q .rv.t-pink{background:var(--pink-t);border-radius:0 0 80px 0}
.q .rv.t-mint{background:var(--mint-t)}
.q .rv.t-yel{background:var(--yel-t);border-radius:80px 0 0 0}
@media (hover:hover) and (pointer:fine){.q .rv.t-pink:hover{background:var(--pink-th)}.q .rv.t-mint:hover{background:var(--mint-th)}.q .rv.t-yel:hover{background:var(--yel-th)}}
.q .stars{display:inline-flex;gap:4px}
.q .stars i{display:block;width:20px;height:20px;background:var(--ink);clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.q .stars i.off{opacity:.22}
.q .rv blockquote{font-size:17px;line-height:1.6;color:var(--ink)}
.q .q-big blockquote{font-size:clamp(20px,2cqi,26px);line-height:1.45;font-weight:500}
.q .rv .who{display:flex;flex-direction:column;gap:2px;font-size:14px;line-height:1.3;color:var(--ink-2)}
.q .rv .who b{font-size:15px;font-weight:700;color:var(--ink)}
.q .rate b{unicode-bidi:isolate;font-size:clamp(56px,6cqi,80px);line-height:1;font-weight:700;color:var(--cob);font-variant-numeric:tabular-nums}
.q .rate p{font-size:15px;color:var(--ink-2)}
.q .proof .micro{margin-top:32px}
/* רגע החתימה: קיר הטעמים על שדה כהה */
.q .wallsec{background:var(--ink);color:var(--paper);padding-bottom:clamp(112px,12cqi,160px)}
.q .wallsec{--eb:var(--yel)}
.q .wallsec .lead{color:var(--on-ink-2)}
.q .w-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-bottom:72px}
.q .w-head .head{margin-bottom:0}
.q .legend{display:grid;grid-template-columns:1fr 1fr;gap:12px 32px;font-size:15px;font-weight:500;color:var(--paper)}
.q .legend li{display:flex;align-items:center;gap:12px;min-height:28px}
.q .lg{display:block;width:20px;height:20px;background:var(--c);flex:none}
.q .lg-tri{clip-path:polygon(50% 0,100% 100%,0 100%)}.q .lg-cir{border-radius:50%}.q .lg-half{border-radius:20px 20px 0 0;height:12px}.q .lg-sq{border-radius:2px}
.q .wall{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:56px 32px;align-items:start;padding-bottom:56px}
.q .tl:nth-child(4n+2),.q .tl:nth-child(4n+4){margin-top:56px}
.q .art{aspect-ratio:1;background-color:var(--bg);background-repeat:repeat;--pc:var(--p0);transition:transform .3s var(--ease)}
.q .f-pink{--bg:var(--pink);--p0:var(--paper);--c1:var(--yel);--c2:var(--cob);--c3:var(--mint)}
.q .f-yel{--bg:var(--yel);--p0:var(--cob);--c1:var(--pink);--c2:var(--ink);--c3:var(--paper)}
.q .f-mint{--bg:var(--mint);--p0:var(--cob);--c1:var(--pink);--c2:var(--yel);--c3:var(--ink)}
.q .f-cob{--bg:var(--cob);--p0:var(--yel);--c1:var(--pink);--c2:var(--mint);--c3:var(--paper)}
.q .sh-circle{border-radius:50%}.q .sh-arch{border-radius:999px 999px 0 0}.q .sh-leaf{border-radius:0 100% 0 100%}.q .sh-sq{border-radius:12px}
.q .pt-dots{background-image:radial-gradient(circle,var(--pc) 0 5px,transparent 5.5px);background-size:26px 26px}
.q .pt-zig{background-image:linear-gradient(135deg,var(--pc) 25%,transparent 25%),linear-gradient(225deg,var(--pc) 25%,transparent 25%),linear-gradient(315deg,var(--pc) 25%,transparent 25%),linear-gradient(45deg,var(--pc) 25%,transparent 25%);background-size:48px 48px;background-position:-24px 0,-24px 0,0 0,0 0}
.q .pt-stripe{background-image:repeating-linear-gradient(135deg,var(--pc) 0 9px,transparent 9px 22px)}
.q .pt-check{background-image:conic-gradient(var(--pc) 25%,transparent 0 50%,var(--pc) 0 75%,transparent 0);background-size:56px 56px}
.q .pt-ring{background-image:repeating-radial-gradient(circle at 50% 50%,var(--pc) 0 7px,transparent 7px 20px)}
.q .pt-grid{background-image:linear-gradient(var(--pc) 5px,transparent 5px),linear-gradient(90deg,var(--pc) 5px,transparent 5px);background-size:30px 30px}
.q .pt-half{background-image:radial-gradient(circle at 50% 100%,var(--pc) 0 11px,transparent 11.5px);background-size:30px 30px}
.q .cap{display:flex;flex-direction:column;gap:6px;margin-top:20px}
.q .fam{font-size:13px;font-weight:500;line-height:1.2;color:var(--on-ink-2)}
.q .cap h3{color:var(--paper);font-weight:700;font-size:22px}
.q .cap p{font-size:15px;line-height:1.5;color:var(--on-ink-2)}
@media (hover:hover) and (pointer:fine){
.q .tl:hover .art{transform:translateY(-8px) rotate(-3deg);animation:mcyc 1.2s linear infinite}
}
@keyframes mcyc{0%{--pc:var(--c1)}33%{--pc:var(--c2)}66%{--pc:var(--c3)}100%{--pc:var(--c1)}}
.q .w-note{margin-top:40px;color:var(--on-ink-2)}
.q .wallsec .micro{color:var(--on-ink-2)}
.q .wallsec :is(a,button,[tabindex]):focus-visible{outline-color:var(--paper)}
/* התפריט */
.q .offer{position:relative;z-index:1;background:var(--mint-t)}
.q .offer-grid{display:grid;grid-template-columns:minmax(0,560px) minmax(0,480px);justify-content:space-between;gap:88px;align-items:start;max-width:1320px;margin-inline:auto}
.q .offer .head{margin-bottom:40px}
.q .mg+.mg{margin-top:48px}
.q .mg h3{font-size:14px;font-weight:700;color:var(--ink-2);margin-bottom:8px}
.q .items{display:flex;flex-direction:column;gap:4px;margin-inline:-16px}
.q .items li{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px;border-radius:12px;transition:background .3s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .items li:hover{background:var(--mint-th)}}
.q .it p{font-size:15px;line-height:1.5;color:var(--ink-2);margin-top:2px}
.q .pr{display:inline-flex;align-items:baseline;gap:2px;font-size:30px;font-weight:700;line-height:1;color:var(--cob);font-variant-numeric:tabular-nums;white-space:nowrap}
.q .pr small{font-size:16px;font-weight:500}
.q .of-foot{display:flex;align-items:center;flex-wrap:wrap;gap:8px 28px;margin-top:32px}
.q .of-vis{position:relative;max-width:480px;margin-top:-168px;margin-inline:auto;width:100%}
.q .of-vis .pic{aspect-ratio:4/5.4;border-radius:999px 999px 0 0}
.q .of-vis .shp{--k:0}
.q .o-tri{right:-9%;top:30%;width:24%;rotate:-14deg}
.q .o-half{left:-7%;bottom:-3%;width:34%}
/* הזמנה: בלוק שקט */
.q .order{padding:var(--sec) var(--gut)}
.q .or-in{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:88px;align-items:center;max-width:1180px;margin-inline:auto}
.q .or-photo{aspect-ratio:1;border-radius:50%;max-width:380px;width:100%;margin-inline:auto}
.q .order .head{margin-bottom:32px}
.q .form{display:flex;flex-direction:column;gap:24px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .opts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.q .opt{position:relative}
.q .opt input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.q .opt span{display:inline-flex;align-items:center;min-height:44px;padding:10px 20px;border-radius:12px;background:var(--yel-t);border:2px solid var(--ink);font-size:15px;font-weight:500;line-height:1;transition:background .18s var(--ease),color .18s var(--ease),border-color .18s var(--ease)}
.q .opt input:checked+span{background:var(--cob);border-color:var(--cob);color:var(--on-cob);font-weight:700}
.q .opt input:focus-visible+span{outline:3px solid var(--ink);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.q .opt input:not(:checked):hover+span{background:var(--yel-th)}}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:16px 24px}
.q .ok{display:none;flex-direction:column;align-items:flex-start;gap:16px;padding:24px 0}
.q .ok .tick{width:56px;height:56px;border-radius:50%;background:var(--mint);display:grid;place-items:center;color:var(--ink)}
.q .or-in.is-sent .form{display:none}
.q .or-in.is-sent .ok{display:flex}
/* פוטר: שדה כחול עם קצה משולשים */
.q .ft{position:relative;margin-top:22px;padding:72px var(--gut) 40px;background:var(--cob);color:var(--on-cob);--mk-ink:var(--paper)}
.q .ft::before{content:"";position:absolute;inset-inline:0;top:-21px;height:22px;background:var(--cob);-webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='22' viewBox='0 0 44 22'><path d='M0 22 22 0l22 22z'/></svg>") repeat-x bottom/44px 22px;mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='22' viewBox='0 0 44 22'><path d='M0 22 22 0l22 22z'/></svg>") repeat-x bottom/44px 22px}
.q .ft :is(a,button):focus-visible{outline-color:var(--paper)}
.q .ft .logo{color:var(--on-cob)}
.q .ft-top{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;max-width:1320px;margin-inline:auto}
.q .ft-brand{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.q .ft-brand p{font-size:15px;line-height:1.6;color:var(--on-cob-2);max-width:300px}
.q .ft-col{display:flex;flex-direction:column;font-size:15px;line-height:1.6;color:var(--on-cob-2)}
.q .ft-col span:not(.ft-h),.q .ft-col address{padding-block:6px}
.q .ft-h{font-size:14px;font-weight:700;line-height:1.3;color:var(--on-cob);margin-bottom:8px}
.q .ft-col a,.q .ft-bot a{display:inline-block;padding-block:6px;color:var(--on-cob-2);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate;align-self:flex-start}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:var(--yel)}}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1320px;margin:56px auto 0;font-size:14px;color:var(--on-cob-2)}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
/* מובייל וטאבלט */
@container (min-width:1000px){
.q h1,.q h2{letter-spacing:-.02em}
}
@container (max-width:1023px){
.q{--sec:88px}
.q .of-vis{margin-top:0}
.q .hd-in{gap:12px}
.q .hd nav{gap:0}
.q .hd nav a{padding:10px 12px}
.q .hero-in{gap:40px}
.q .p-photo{grid-column:1 / span 6}
.q .q-big{grid-column:7 / span 6}
.q .q-sm.a{grid-column:1 / span 6}
.q .q-sm.b{grid-column:7 / span 6;margin-top:0}
.q .rate{grid-column:1 / span 12;flex-direction:row;align-items:center;gap:24px;padding:8px 0}
.q .w-head{grid-template-columns:1fr;gap:32px}
.q .wall{grid-template-columns:repeat(3,minmax(0,1fr))}
.q .tl:nth-child(4n+2),.q .tl:nth-child(4n+4){margin-top:0}
.q .tl:nth-child(3n+2){margin-top:48px}
.q .offer-grid{grid-template-columns:1fr;gap:72px}
.q .of-vis{max-width:420px}
.q .or-in{grid-template-columns:1fr;gap:56px}
.q .or-photo{max-width:280px}
.q .ft-top{grid-template-columns:1fr 1fr}
.q .ft-col a,.q .ft-bot a{padding-block:12px}
}
@container (max-width:767px){
.q{--sec:64px;--hd:64px}
.q .hd nav{display:none}
.q .logo{font-size:20px}
.q .hero{padding:24px var(--gut) 56px;min-height:calc(100svh - var(--hd));align-items:center}
.q .hero-in{grid-template-columns:1fr;gap:24px}
.q .hero-txt{gap:16px}
.q .hero .lead{font-size:16px}
.q .ctas{width:100%;flex-direction:column;align-items:stretch;gap:0;margin-top:4px}
.q .ctas .btn{width:100%}
.q .ctas .lnk{justify-content:center}
.q .meta{display:none}
.q .stage{--sh:clamp(200px,31svh,300px)}
.q .head{margin-bottom:40px}
.q .proof-grid{grid-template-columns:1fr;gap:16px}
.q .proof-grid>*{grid-column:1 / -1 !important;margin-top:0 !important}
.q .rv{padding:24px}
.q .rv.t-pink{border-radius:0 0 56px 0}.q .rv.t-yel{border-radius:56px 0 0 0}
.q .rate{flex-direction:column;align-items:flex-start;gap:8px}
.q .wall{grid-template-columns:repeat(2,minmax(0,1fr));gap:40px 20px}
.q .tl:nth-child(3n+2){margin-top:0}
.q .tl:nth-child(even){margin-top:32px}
.q .cap{margin-top:14px}
.q .cap h3{font-size:19px}
.q .cap p{font-size:14px}
.q .legend{grid-template-columns:1fr 1fr;gap:8px 16px}
.q .w-head{margin-bottom:48px}
.q .items{margin-inline:-12px}
.q .items li{padding:14px 12px}
.q .pr{font-size:26px}
.q .or-in{gap:40px}
.q .o-tri{right:-2%}
.q .o-half{left:-2%}
.q .form .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:56px}
.q .ft-top{grid-template-columns:1fr;gap:32px}
.q .ft-bot{margin-top:32px}
.q .ft-bot nav{gap:16px}
}
@media (max-width:767px) and (max-height:760px){
.q .hero .lead{display:none}
.q .hero-txt{gap:12px}
}
@media (max-width:767px) and (max-height:680px){
.q .hero{padding:16px var(--gut) 40px}
.q .hero-in{gap:16px}
.q .stage{--sh:clamp(150px,25svh,300px)}
.q .hero h1{font-size:34px}
}
@media (prefers-reduced-motion:reduce){
.q.js .reveal{opacity:1}
.q .reveal.is-in,.q .hd-in,.q .oi,.q .arch,.q .sv{animation:none}
.q .shp{transform:none;will-change:auto}
.q .btn,.q .lnk,.q .lnk .ico,.q .items li,.q .rv,.q .pic img,.q .art,.q .opt span,.q .hd{transition:none}
.q .btn:hover,.q .btn:active{transform:none}
.q .pic:hover img,.q .lnk:hover .ico{transform:none}
.q .tl:hover .art{animation:none;transform:none;--pc:var(--c1)}
}`;

const IMG = "../assets/media/real/s11/";

const HTML = `<div class="cwrap sk-s11"><div class="q" id="s11-top">
<a class="skip" href="#s11-main">דילוג לתוכן</a>
<header class="hd"><div class="hd-in">
<a class="logo" href="#s11-top" aria-label="כדור ומשולש, לראש הדף">${MARK}<span>כדור ומשולש</span></a>
<nav aria-label="ראשי"><a href="#s11-wall">הטעמים</a><a href="#s11-menu">התפריט</a><a href="#s11-reviews">ביקורות</a><a href="#s11-order">הזמנה</a></nav>
<a class="btn sm" href="#s11-order">להזמין קרטון</a>
</div></header>
<main id="s11-main">
<section class="hero" aria-labelledby="s11-h1"><div class="hero-in">
<div class="hero-txt">
<span class="eyebrow oi">גלידריה בעבודת יד בתל אביב</span>
<h1 class="oi" id="s11-h1">גלידה שנעשתה הבוקר, בטעמים שמתחלפים כל שבוע</h1>
<p class="lead oi">מכינים כל בוקר על הבר, מחלב מקומי ומפירות העונה. אפשר לשבת, לקחת קונוס לדרך או להזמין קרטון ליום שישי.</p>
<div class="ctas oi"><a class="btn" href="#s11-order">להזמין קרטון לשישי</a><a class="lnk" href="#s11-wall">לראות את הטעמים${I.arrow}</a></div>
<ul class="meta oi"><li>${I.pin}<span>אחד העם 19, תל אביב</span></li><li>${I.clock}<span data-open>ראשון עד חמישי, מ-12:00</span></li></ul>
</div>
<div class="stage">
${shp("ring", "s-ring", "", 1)}${shp("dots", "s-dots", "", 3)}${shp("squig", "s-squig", "", 5)}
<figure class="pic arch"><img src="${IMG}hero-scoops.webp" width="1400" height="1750" alt="שלושה כדורי גלידה על נייר בשני גווני ורוד: שניים לבנים וכדור אחד בצבע תות, עם סוכריות צבעוניות מפוזרות סביבם" fetchpriority="high" decoding="async"></figure>
${shp("tri", "s-tri", "", 2)}${shp("half", "s-half", "", 0)}${shp("zig", "s-zig", "", 4)}
</div>
</div></section>

<section class="sec proof" id="s11-reviews" aria-labelledby="s11-rv-h"><div class="wrap">
<div class="head reveal"><span class="eyebrow">ביקורות</span><h2 id="s11-rv-h">מה אומרים בשכונה</h2></div>
<div class="proof-grid">
<figure class="pic p-photo reveal"><img src="${IMG}cones-yellow.webp" width="1400" height="1050" alt="שלושה קונוסים עם כדורי גלידה בצבע טורקיז על רקע צהוב חמאתי" loading="lazy" decoding="async"></figure>
<div class="rv q-big t-pink reveal" style="--i:1">${stars(5)}<blockquote>בא לי לעצור בכל פעם שאני עוברת באחד העם. הפיסטוק הוא פיסטוק אמיתי, לא ירוק מלאכותי, והכדורים ממש מלאים.</blockquote><div class="who"><b>נועה ל.</b><span>תל אביב · ביקורת בגוגל</span></div></div>
<div class="rv q-sm a t-mint reveal" style="--i:1">${stars(5)}<blockquote>הזמנו עוגת גלידה ליום ההולדת של הבן. היא הגיעה בזמן, הוא התעקש על לימון וג'ינג'ר, והילדים ביקשו עוד.</blockquote><div class="who"><b>איתי ר.</b><span>רמת גן · ביקורת בגוגל</span></div></div>
<div class="rv q-sm b t-yel reveal" style="--i:2">${stars(4)}<blockquote>טעים ומסוגנן. בסופי שבוע צריך לחכות בתור, ושווה את זה.</blockquote><div class="who"><b>מיכל ד.</b><span>תל אביב · ביקורת בגוגל</span></div></div>
<div class="rate reveal" style="--i:3"><b>4.8</b>${stars(5)}<p>מתוך 5, לפי ביקורות בגוגל</p></div>
</div>
<p class="micro">ביקורות ודירוג לדוגמה: טקסטים להדגמה בלבד, לא של עסק אמיתי.</p>
</div></section>

<section class="sec wallsec" id="s11-wall" aria-labelledby="s11-wl-h"><div class="wrap">
<div class="w-head reveal">
<div class="head"><span class="eyebrow">קיר הטעמים</span><h2 id="s11-wl-h">שנים עשר טעמים על הלוח השבוע</h2><p class="lead">הצבע הוא המשפחה והדוגמה היא הטעם, וככה מוצאים בשנייה מה בא לכם. הלוח מתחלף כל יום שני בבוקר.</p></div>
${legend}
</div>
<ul class="wall">${FLAVORS.map(tile).join("")}</ul>
<p class="micro w-note">העסק, הטעמים והמחירים כאן דמיוניים, להדגמת השפה בלבד.</p>
</div></section>

<section class="sec offer" id="s11-menu" aria-labelledby="s11-mn-h"><div class="offer-grid">
<div class="of-body">
<div class="head reveal"><span class="eyebrow">התפריט</span><h2 id="s11-mn-h">מה אפשר לקחת</h2><p class="lead">כל כדור הוא כדור מלא. אפשר לערבב טעמים, וסורבה בלי חלב יש בכל יום.</p></div>
${MENU.map(menuGroup).join("")}
<div class="of-foot reveal"><a class="lnk" href="#s11-order">להזמין קרטון${I.arrow}</a><p class="micro">המחירים כוללים מע"מ והם לדוגמה.</p></div>
</div>
<div class="of-vis reveal">
<figure class="pic"><img src="${IMG}bowls.webp" width="1100" height="1650" alt="שתי קערות גלידה מלמעלה על רקע בשני צבעים: קערה ורודה עם גלידת תות וניל וקערה כחולה עם שוקולד" loading="lazy" decoding="async"></figure>
<div class="shp o-tri" aria-hidden="true">${SHAPES.tri}</div><div class="shp o-half" aria-hidden="true">${SHAPES.half}</div>
</div>
</div></section>

<section class="order" id="s11-order" data-cta-end aria-labelledby="s11-or-h"><div class="or-in reveal">
<figure class="pic or-photo"><img src="${IMG}magenta-cone.webp" width="1000" height="1000" alt="קונוס וופל בצבע מגנטה על רקע שמחולק באלכסון לטורקיז בהיר ולמגנטה" loading="lazy" decoding="async"></figure>
<div class="or-body">
<div class="head"><span class="eyebrow">הזמנה לאיסוף</span><h2 id="s11-or-h">לשמור לכם קרטון ליום שישי?</h2><p class="lead">בוחרים גודל ויום איסוף ומשאירים טלפון. נשלח הודעה לאישור, והקרטון מחכה בקירור עם השם שלכם.</p></div>
<form class="form" novalidate>
<div class="row">
<div class="fld"><label for="s11-name">שם</label><input class="in" id="s11-name" name="name" autocomplete="name" required aria-describedby="s11-name-m"><span class="msg" id="s11-name-m">${I.alert}איך נקרא לכם?</span></div>
<div class="fld"><label for="s11-tel">טלפון</label><input class="in" id="s11-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s11-tel-m"><span class="msg" id="s11-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<fieldset><legend class="legend-t">איזה גודל?</legend><div class="opts">
<label class="opt"><input type="radio" name="size" value="half" checked><span>חצי ליטר, 42 ₪</span></label>
<label class="opt"><input type="radio" name="size" value="liter"><span>ליטר, 70 ₪</span></label>
<label class="opt"><input type="radio" name="size" value="cake"><span>עוגת גלידה, 190 ₪</span></label>
</div></fieldset>
<fieldset><legend class="legend-t">מתי לאסוף?</legend><div class="opts">
<label class="opt"><input type="radio" name="day" value="thu" checked><span>חמישי אחר הצהריים</span></label>
<label class="opt"><input type="radio" name="day" value="fri"><span>שישי בבוקר</span></label>
</div></fieldset>
<div class="form-foot"><button class="btn" type="submit">לשמור לי קרטון</button><p class="micro">בלי רשימות תפוצה. את הטלפון משתמשים רק לאישור ההזמנה.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="tick">${I.check}</span><h3>קיבלנו</h3><p class="lead">נשלח הודעה לאישור עוד היום, והקרטון יחכה לכם ביום שבחרתם.</p></div>
</div>
</div></section>
</main>

<footer class="ft"><div class="ft-top">
<div class="ft-brand"><a class="logo" href="#s11-top" aria-label="כדור ומשולש, לראש הדף">${MARK}<span>כדור ומשולש</span></a><p>גלידריה בעבודת יד באחד העם בתל אביב. חלב מקומי, פירות העונה ולוח טעמים שמתחלף כל שבוע.</p></div>
<div class="ft-col"><p class="ft-h">שעות</p><span>ראשון עד חמישי, 12:00 עד 23:30</span><span>שישי, 10:00 עד 16:00</span><span>מוצאי שבת, 19:30 עד 23:30</span></div>
<div class="ft-col"><p class="ft-h">להגיע</p><address>אחד העם 19, תל אביב</address><a href="tel:+97235550123" dir="ltr">03-555-0123</a><a href="https://waze.com/ul?q=%D7%90%D7%97%D7%93%20%D7%94%D7%A2%D7%9D%2019%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91" rel="noopener">ניווט ב-Waze</a></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s11-wall">הטעמים</a><a href="#s11-menu">התפריט</a><a href="#s11-reviews">ביקורות</a><a href="#s11-order">הזמנה</a></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> כדור ומשולש</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
// reduced-motion: reveal, פתיחה והיסחפות הצורות כבויים.
const JS = `(function(){var root=document.querySelector(".sk-s11");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
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
/* שעות פתיחה בשעון ישראל */
var HRS={0:[720,1410],1:[720,1410],2:[720,1410],3:[720,1410],4:[720,1410],5:[600,960],6:[1170,1410]},DAY=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
function ft(m){var h=Math.floor(m/60),mm=m%60;return h+":"+(mm<10?"0":"")+mm}
function il(){try{var o={};new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});
return{d:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],m:(+o.hour%24)*60+(+o.minute)}}catch(e){return null}}
var n=il();if(n){var h=HRS[n.d],open=!!h&&n.m>=h[0]&&n.m<h[1],txt;
if(open){txt="פתוח עכשיו עד "+ft(h[1])}else{var k,dd,hh;for(k=0;k<8;k++){dd=(n.d+k)%7;hh=HRS[dd];if(hh&&(k>0||n.m<hh[0]))break}
txt="סגור כרגע, נפתח "+(k===0?"היום":k===1?"מחר":"ביום "+DAY[dd])+" ב-"+ft(HRS[dd][0])}
$$("[data-open]").forEach(function(e){e.textContent=txt})}
/* reveal פעם אחת */
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* רגע החתימה: הצורות מתאספות בפתיחה (CSS) ואחר כך נסחפות קלות עם הגלילה. transform בלבד, נכתב רק כשהערך השתנה, ורק כשההירו על המסך */
var stage=$(".stage"),hero=$(".hero"),lastSy=-1,tick=0,heroOn=false;
function drift(){tick=0;var y=Math.round(Math.max(0,Math.min(window.scrollY,900)));if(y!==lastSy){lastSy=y;stage.style.setProperty("--sy",y+"px")}}
function onDrift(){if(!tick)tick=requestAnimationFrame(drift)}
if(stage&&hero&&!rm&&"IntersectionObserver" in window){new IntersectionObserver(function(en){var on=en[0].isIntersecting;if(on===heroOn)return;heroOn=on;if(on){window.addEventListener("scroll",onDrift,{passive:true});onDrift()}else window.removeEventListener("scroll",onDrift)}).observe(hero)}
/* טופס ההזמנה */
var form=$(".form"),oi=$(".or-in");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/\\D/g,"").length>=9);
if(bad){bad.focus();return}oi.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

export default [
  {
    cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
    id: "s11", name: "ממפיס", en: "Memphis", group: "שפות נוספות",
    when: "מותגים שמוכרים שמחה בלי להיות ילדותיים: גלידריות ובתי קפה עם אופי, חנויות ספרים ומשחקים, סטודיו ליצירה וסדנאות, מקומות לאירועים, בתי ספר ומחנות, אפליקציות צעירות. מתאים כשיש מוצר צבעוני או צילום עם שדות צבע נקיים והעסק רוצה להיראות כמו מישהו עם דעה.",
    no: "עסקים שהאמינות שלהם נמדדת בשקט: משפט, פיננסים, רפואה, ביטחון, תעשייה. גם לא כשאין צילום נקי וצבעוני: דוגמאות ורעש על תמונה מבולגנת נראים כמו מצגת ילדים.",
    recipe: `פלטה: ארבעה צבעים, כל אחד עם תפקיד, ועוד דיו וניר. צהוב #FFCE2B (שדה ההירו וההדגשה) · ורוד #FF6FAE (צורות, משפחת "פירות אדומים") · מנטה #6BE2C3 (משטח הנחה, משפחת "ירוק ועשבים") · כחול קובלט #2B3CDD (פעולה בלבד: כפתורים, קישורים, מחיר, פוטר) · דיו #1C1A44 (טקסט והשדה הכהה) · נייר #FFFBF1 (הרקע, אף פעם לא לבן טהור)
גוונים בהירים לכל צבע לשטחים: ורוד #FFDDEA, צהוב #FFF0B3, מנטה #D6F7EC. בהובר אותו משפחה כהה יותר (#FFC9DD, #FFE680, #BCEFDF), בלי צל ובלי קו
טקסט משני: #3A3870 (7.1 על צהוב, 10.3 על נייר). לא אפור: אפור על שדה צבעוני נראה מלוכלך
צורות: משולש, חצי עיגול, טבעת, זיגזג וקו מתפתל כציור SVG, וגם עיגולים וקשתות כחיתוך של תמונה. עד שש צורות בסקשן, תמיד בשוליים של תמונה או של כותרת, אף פעם לא בתוך טופס, מחיר או כפתור
דוגמאות: נקודות, פסים, זיגזג, משבצות, טבעות, רשת וחצאי עיגול, בגרדיאנט קשיח של CSS (בלי מעבר רך), בגודל 26 עד 56px, רק על משטח צורה ולא מאחורי טקסט. טקסט תמיד על משטח אחיד
רדיוסים: כפתור, שדה ושורה 12 · כרטיס ציטוט אחד עגול לפינה אחת (80) · תמונה כקשת (999 למעלה), פינה אחת עגולה (160) או עיגול מלא
Google Sans בלבד, שלושה משקלים: 700 לכותרות, מחירים ופעולות, 500 לשמות ולתוויות, 400 לגוף · H1 עד 64/1.05, ריווח שלילי בלבד מ-40px ובעברית אף פעם לא חיובי
פתיחה: ההדר יורד, הטקסט עולה, הקשת עולה וששת הצורות מתאספות סביבה אחת-אחת (0.85s, סטאגר 90ms). אחר כך הן נסחפות בגלילה בין 8 ל-20 אחוז מהמרחק (transform בלבד) · reveal 16px/0.5s · ease cubic-bezier(.2,.6,.2,1)`,
    apply: "הדר נייר עם סמל כדור ומשולש, ניווט וכפתור כחול. ההירו שדה צהוב שלם: הטקסט בהתחלה ובסופו קשת של צילום אמיתי, וסביבה שש צורות שמתאספות; הקצה התחתון של ההירו מסונן במשולשים ולא בקו. ההוכחה על נייר, קלה: צילום עם פינה עגולה אחת, כרטיסי ציטוט בשלושה גוונים בהירים בפינות שונות ודירוג בספרה כחולה. קיר הטעמים על שדה כהה: כל טעם הוא צורה אחרת בצבע המשפחה שלו עם דוגמה משלו, והשם והתיאור מתחתיו על הדיו. התפריט על מנטה בהירה: שורות בלי קו ומחיר כחול גדול, וצילום בקשת עם שתי צורות בפינות. ההזמנה על נייר, שקטה: תמונה בעיגול, שדות מלאים בצהוב בהיר עם מסגרת דיו עבה ובחירות מלבניות שהפעילה בהן כחולה. הפוטר שדה כחול עם קצה משולשים.",
    sig: "צורות שמתאספות סביב צילום ההירו ונסחפות קלות עם הגלילה (שש צורות, transform בלבד) · קיר טעמים שבו הצבע הוא המשפחה והדוגמה היא הטעם, ובריחוף הדוגמה מתחלפת בין צבעי הפלטה · קצה משולשים במקום קו מפריד (בהירו ובפוטר) · כל קשת, פינה ועיגול הם חיתוך של צילום אמיתי · כחול רק לפעולה.",
    avoid: "קונפטי של צורות ברקע כל סקשן · קליפ-ארט או אייקוני אימוג'י · יותר משש צורות בסקשן · צורות בתוך טפסים, מחירים או כפתורים, או צורה שנראית ככפתור · טקסט על דוגמה · יותר מארבעה צבעים · גרדיאנט רך או בלוב · קווי מתאר שחורים וצל מוזח (זה ברוטליזם, לא ממפיס) · כל סקשן רועש: אחרי סקשן רועש בא שקט · ניסוח ילדותי ('וואו', 'יאמי') · פונט תצוגה מצחיק: האופי בא מצבע, צורה וקומפוזיציה.",
    qa: ["ארבעה צבעים בלבד עם דיו וניר, ולכל צבע תפקיד אחד (כחול רק פעולה)", "צורה אחת לא נוגעת בטופס, מחיר או כפתור; עד שש צורות בסקשן", "אין טקסט על דוגמה: שם וטקסט על משטח אחיד", "אחרי סקשן רועש בא סקשן שקט (צהוב, נייר, דיו, מנטה, נייר, כחול)", "הירו נכנס במסך הראשון בדסקטופ ובטלפון, ובטלפון ממורכז אנכית", "אין קו מפריד אפור או מסגרת קישוט; משטח בהיר מכהה בהובר באותה משפחה", "שלושה משקלים בלבד, בלי ריווח חיובי בעברית", "reveal ופתיחה ב-keyframes; reduced-motion מכבה תנועה והצורות נשארות בצד", "ניגודיות AA גם לטקסט על צהוב, מנטה וכחול"],
    engine: "ניגודיות (נמדד 15.10.2026): דיו #1C1A44 על נייר 15.9, על צהוב 11.0, על מנטה 10.4, על ורוד 6.4 · טקסט משני #3A3870 על נייר 10.3, על צהוב 7.1, על מנטה בהירה 9.3 (8.4 בהובר), על ורוד בהיר 8.5 (7.4 בהובר) · כחול #2B3CDD על נייר 7.3, על מנטה בהירה 6.6 (5.9 בהובר), על צהוב בהיר 6.6 · לבן על כחול 7.5 ועל כחול כהה (הובר) 10.2 · צהוב על כחול 5.1 · טקסט בהיר #D4D2F2 על דיו 11.2 · טקסט פוטר #DCE0FF על כחול 5.8. כחול על דיו 2.2: לכן אין טקסט כחול על הקיר הכהה, והצורה הכחולה בקיר היא גרפיקה בלבד. שדות 16px עם מסגרת דיו 2px. הצורות והדוגמאות דקורטיביות (aria-hidden) והמידע בכל טעם נמצא גם בטקסט (שם, משפחה ותיאור). הפונט הוא Google Sans בלבד. הצבע של הדוגמה בריחוף מונפש דרך @property --pc (דפדפן בלי תמיכה מדלג בין צבעים בלי מעבר). הכל נראה בלי JS.",
    agent: "עצב בסגנון ממפיס מעודכן: שדות צבע שטוחים ורוויים בארבעה צבעים לכל היותר (צהוב, ורוד, מנטה וכחול קובלט) ועוד דיו כחול-כהה ונייר חם, כל צבע עם תפקיד אחד (כחול לפעולה בלבד). צורות גיאומטריות מצוירות ב-SVG (משולש, חצי עיגול, טבעת, זיגזג, קו מתפתל) כתכשיט בשולי צילום וכותרת, עד שש בסקשן, אף פעם לא בתוך טופס, מחיר או כפתור, וצילום אמיתי בהיר עם רקע נקי שנחתך לקשת, לעיגול או לפינה עגולה אחת. דוגמאות (נקודות, פסים, זיגזג, משבצות) רק על משטח צורה ולעולם לא מאחורי טקסט. Google Sans בשלושה משקלים, בלי פונט תצוגה. קצה משולשים במקום קווים. רגע חתימה אחד: צורות שמתאספות סביב הצילום בפתיחה ונסחפות בגלילה ב-transform בלבד. סקשן רועש תמיד אחריו סקשן שקט. בלי קונפטי, קליפ-ארט, צל מוזח או קווי מתאר שחורים.",
    mobile: "ההדר: הניווט נעלם והכפתור (44px) נשאר. ההירו ממורכז אנכית במסך הראשון: כותרת, שורה, כפתור ברוחב מלא ואחריהם קשת הצילום עם הצורות בגובה שמתכווץ לפי גובה המסך (שורת הפרטים יורדת). ההוכחה בעמודה אחת. קיר הטעמים בשתי עמודות עם הסטה קלה, והמקרא בשתי עמודות. התפריט בעמודה עם הצילום מתחתיו. ההזמנה בעמודה אחת: העיגול קטן, השדות בעמודה, הבחירות במגע של 44px והכפתור ברוחב מלא.",
    fonts: [],
    desc: "ממפיס של שנות ה-80, מעודכן: צורות גיאומטריות מצוירות, שדות צבע שטוחים בארבעה צבעים, דוגמאות וקצה משולשים, וצילום אמיתי בהיר. כאן כעמוד אמיתי של גלידריה דמיונית, 'כדור ומשולש', שבה הצבע הוא משפחת הטעם והדוגמה היא הטעם.",
    score: "20/20 נמדדו",
    note: "העסק, הביקורות, הכתובת, הטלפון, המחירים והדירוג דמיוניים. הצילומים סטוק של Magnific (רישיון חופשי, ללא AI), מקוצצים ומומרים ל-WebP: hero-scoops (8087478), bowls (6753286), cones-yellow (4503092), magenta-cone (4472795). קרדיטים שנוצלו: 0 (יתרה לפני ואחרי: 147723). בדוק: גלול בהירו וראה את הצורות נסחפות, עבור עם העכבר על טעם בקיר וראה את הדוגמה מתחלפת בצבעים, Tab בין השדות, ושינוי רוחב ל-500.",
    css: CSS, html: HTML, js: JS,
  },
];
