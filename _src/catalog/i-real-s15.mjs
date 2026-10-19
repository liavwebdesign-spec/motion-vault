// S15 · ניו-דקו, עמוד הייחוס (19.10.2026). שפה חדשה במאגר, מהמחקר על Pinterest Predicts 2026 ("Neodeco", שיש אדום, נחושת).
//
// מה זה: העסק הדמיוני "מרגו", בר קוקטיילים קטן בבניין משנת 1932 בתל אביב. אין כאן לקוח אמיתי; הצילומים סטוק (ids בשדה note).
// הפונטים: Bellefair לתצוגה (OFL, סריף עברי-לטיני עם ניגוד חד בקו, זה הדקו) ו-Google Sans לגוף. שניהם חינמיים ומותרים בריפו ציבורי.
// המבנה: הדר סימטרי (ניווט משני צדי הלוגו) · הירו עם צילום בקשת ושמש נחושת שנפתחת מאחוריה · "מניפת העונה" על שיש אדום
// (רגע החתימה: מניפה של ארבע להבים שנפתחת כשמגיעים אליה, וכל להב פותח את הקוקטיילים של אותו אלכוהול) · הערב בשלושה מספרים
// · ביקורות עם ציטוט הבר-מן · לוח הזמנה שהצילום בקשת עולה מעליו · פוטר שיש עם חצי שמש בקצה.
// הדקו בלי קווים: הקישוט כולו צורות ממולאות (קשת, להבים, קרני שמש, זיגורת), אף מסגרת ואף קו שיער (feedback_no_lines_and_frames).
// מנוע: ease אחד, reveal ב-keyframes 16px/0.6s, פתיחת המניפה 0.9s, הכל נראה בלי JS, reduced-motion פותח הכל מיד.

const EASE = "cubic-bezier(.2,.6,.2,1)";

// ───────── אייקונים: משפחה אחת, stroke 1.6, 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  arrow: svg(" s", `<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  pin: svg(" s", `<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>`),
  clock: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`),
  phone: svg(" s", `<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`),
  note: svg(" s", `<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>`),
  glass: svg("", `<path d="M5 4h14l-7 8z"/><path d="M12 12v8"/><path d="M8 20h8"/>`),
  check: svg("", `<path d="M20 6 9 17l-5-5"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>`),
};

// ───────── צורות הדקו: מניפה ממולאת (לוגו ו-eyebrow) וקרני השמש של ההירו. מחושבות פעם אחת כאן ─────────
const P = (cx, cy, r, a) => [(cx + r * Math.cos(a)).toFixed(1), (cy + r * Math.sin(a)).toFixed(1)];
function fan(cx, cy, r, n, gap) {
  const step = Math.PI / n, g = gap * Math.PI / 180;
  return Array.from({ length: n }, (_, i) => {
    const a0 = Math.PI + i * step + g / 2, a1 = Math.PI + (i + 1) * step - g / 2;
    const [x0, y0] = P(cx, cy, r, a0), [x1, y1] = P(cx, cy, r, a1);
    return `<path d="M${cx} ${cy}L${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}Z"/>`;
  }).join("");
}
const MARK = `<svg class="brand-mark mark" viewBox="0 0 32 18" aria-hidden="true" focusable="false">${fan(16, 17, 15, 5, 7)}</svg>`;
// ה-eyebrow נושא את סימן הלוגו עצמו בקטן (אותה מניפה של חמישה להבים), ולכן הוא סימן מותג ולא אייקון
const ORN = `<svg class="brand-mark orn" viewBox="0 0 32 18" aria-hidden="true" focusable="false">${fan(16, 17, 15, 5, 7)}</svg>`;
// שמש עולה: 30 קרניים ממולאות מנקודה אחת בתחתית הקשת, ארוכה וקצרה לסירוגין. כל קרן טריז דק, לא קו.
const RAYS = (() => {
  const cx = 500, cy = 640, n = 30, out = [];
  for (let i = 0; i <= n; i++) {
    const a = Math.PI + (i / n) * Math.PI, w = 0.022, r = i % 2 ? 470 : 610;
    const [x0, y0] = P(cx, cy, r, a - w), [x1, y1] = P(cx, cy, r, a + w);
    out.push(`<path class="${i % 2 ? "r2" : "r1"}" d="M${cx} ${cy}L${x0} ${y0}L${x1} ${y1}Z"/>`);
  }
  return out.join("");
})();

// ───────── מניפת העונה: ארבעה אלכוהולים, שלושה קוקטיילים לכל אחד ─────────
const MENU = [
  ["ג'ין", 60, [
    ["ורד הנגב", "ג'ין, ליקר ורדים, לימון וטוניק", 58],
    ["מרטיני 1932", "ג'ין, ורמוט יבש וקליפת לימון", 62],
    ["נגרוני נחושת", "ג'ין, קמפרי, ורמוט מתוק ותפוז שרוף", 60],
  ]],
  ["וויסקי", 20, [
    ["אולד פאשנד מעושן", "בורבון, סירופ דבש, ביטרס ועשן עץ דובדבן", 64],
    ["פני על השיש", "סקוץ', ג'ינג'ר טרי, דבש ולימון", 60],
    ["מנהטן ארוך", "ריי, ורמוט מתוק וביטרס תפוזים", 66],
  ]],
  ["רום", -20, [
    ["דאיקירי ירקון", "רום לבן, ליים וסוכר קנים", 54],
    ["רום ושוקולד", "רום כהה, קקאו, אספרסו ומלח ים", 58],
    ["הוואנה 30", "רום מיושן, אננס צלוי וליים", 60],
  ]],
  ["אגבה", -60, [
    ["פלומה אדומה", "טקילה, אשכולית אדומה, ליים וסודה", 56],
    ["מסקל וסלק", "מסקל, סלק, ג'ינג'ר ולימון", 62],
    ["מרגריטה מרגו", "טקילה, ליקר תפוזים, ליים ומלח מעושן", 58],
  ]],
];
const bladeHtml = (g, gi) => `<button class="blade" type="button" role="tab" id="s15-t${gi}" aria-controls="s15-p${gi}" aria-selected="${gi === 0}" tabindex="${gi === 0 ? 0 : -1}" style="--a:${g[1]}deg;--i:${gi}"><span class="bl-shape" aria-hidden="true"></span><span class="bl-lbl">${g[0]}</span></button>`;
const panelHtml = (g, gi) => `<div class="panel" role="tabpanel" id="s15-p${gi}" aria-labelledby="s15-t${gi}"><h3 class="pn-h">${g[0]}</h3><ul class="drinks">${g[2].map(d => `<li><h4>${d[0]}</h4><p>${d[1]}</p><span class="price" aria-label="${d[2]} שקלים">${d[2]} ₪</span></li>`).join("")}</ul></div>`;

const REVIEWS = [
  ["מאיה לוי", "לפני שבוע", "ישבנו ליד הבר והבר-מן הסביר כל קוקטייל בלי להתנשא. הנגרוני הכי טוב שהיה לי בעיר."],
  ["יונתן שגב", "לפני חודש", "באנו לדרינק אחד ונשארנו לכל הסט של הפסנתר. מקום קטן ושקט מספיק כדי לדבר."],
  ["רוני אברהם", "לפני שבועיים", "הזמנתי שולחן ליום הולדת, וחיכה לנו כרטיס עם השם וקינוח קטן. פרט קטן שעושה את הערב."],
];
const rv = r => `<figure class="rv reveal"><span class="stars" role="img" aria-label="5 מתוך 5">★★★★★</span><blockquote>${r[2]}</blockquote><figcaption><b>${r[0]}</b><span>${r[1]} · ביקורת בגוגל</span></figcaption></figure>`;

const NUMS = [["30", "מקומות", "סביב בר השיש ובשמונה שולחנות קטנים"], ["12", "קוקטיילים", "בתפריט של העונה, ומתחלפים ארבע פעמים בשנה"], ["3", "ערבי פסנתר", "בכל שבוע, מחמישי עד שבת מ-21:30"]];

// ───────── CSS ─────────
const IMG = "../assets/media/real/s15/";
const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
@font-face{font-family:"MV Bellefair";src:url("../assets/fonts/bellefair.woff2") format("woff2");font-weight:400;font-display:swap;size-adjust:112%}
.cwrap{container-type:inline-size}
.q{--ivory:#F4EEE4;--ivory-2:#EAE0D0;--ivory-3:#DFD2BE;--paper:#FBF7F0;--ink:#221917;--muted:#5E504A;
 --ox:#5C1A1E;--ox-d:#47121A;--on-ox:#F6EBDD;--copper:#B4693A;--copper-t:#8C4A22;--copper-l:#D9A178;--mut-d:#CBB8AC;--field:#8A7466;--err:#B3261E;--err-d:#FFB4A9;
 --marble:#320F0F url("${IMG}marble.webp") center/cover;
 --disp:"MV Bellefair","Bellefair",Georgia,serif;--ease:${EASE};
 --shadow:0 12px 32px rgba(50,15,15,.14);
 --sec:112px;--gut:clamp(20px,5cqi,72px);--arch:999px 999px 0 0;
 background:var(--ivory);color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.65;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q h4,.q p,.q ul,.q ol,.q figure,.q blockquote,.q address,.q fieldset,.q legend{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q fieldset{border:0;padding:0;min-width:0}
.q a{color:inherit;text-decoration:none}
.q address{font-style:normal}
.q img{display:block;max-width:100%}
.q button{font:inherit;color:inherit}
.q h1,.q h2{font-family:var(--disp);font-weight:400;letter-spacing:-.01em;text-wrap:balance}
.q h1{font-size:clamp(42px,5.2cqi,68px);line-height:1.06}
.q h2{font-size:clamp(34px,3.6cqi,48px);line-height:1.12}
.q h3{font-size:20px;line-height:1.35;font-weight:500}
.q h4{font-size:17px;line-height:1.35;font-weight:500}
.q p{text-wrap:pretty}
.q .lead{font-size:17px;line-height:1.6;color:var(--muted);max-width:500px}
.q .micro{font-size:13px;line-height:1.45;color:var(--muted)}
.q .eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:600;line-height:1;color:var(--copper-t)}
.q .brand-mark{fill:var(--copper);flex:none;display:block}
.q .orn{width:21px;height:12px}
.q .yr{font-family:var(--disp);color:var(--copper-t);font-variant-numeric:lining-nums;unicode-bidi:isolate;white-space:nowrap}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block;color:var(--copper)}
.q .ico.s{width:20px;height:20px}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;background:var(--paper);color:var(--ink);padding:12px 20px;border-radius:999px;font-weight:600;box-shadow:var(--shadow)}
.q .skip:focus{top:8px}
.q :is(a,button,[tabindex]):focus-visible{outline:3px solid var(--copper-t);outline-offset:3px;border-radius:12px}
/* כפתורים: שלוש רמות, ארבעה מצבים. הראשי בורדו, המשני משטח שנהב, השלישי טקסט עם חץ */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:14px 32px;border:0;border-radius:999px;background:var(--ox);color:var(--on-ox);font-size:16px;font-weight:600;line-height:1;cursor:pointer;transition:background .18s var(--ease),transform .18s var(--ease),box-shadow .18s var(--ease);-webkit-tap-highlight-color:transparent;white-space:nowrap}
.q .btn:active{transform:scale(.98);transition-duration:.12s}
.q .btn:focus-visible{border-radius:999px}
.q .btn.sm{min-height:44px;padding:10px 24px;font-size:15px}
.q .btn.b2{background:var(--ivory-2);color:var(--ink)}
.q .lnk{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:12px 0;background:none;border:0;font-size:15px;font-weight:600;line-height:1;color:var(--ink);cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:6px;transition:color .15s var(--ease),text-decoration-color .15s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
@media (hover:hover) and (pointer:fine){
.q .btn:hover{background:var(--ox-d);transform:translateY(-2px);box-shadow:0 8px 20px rgba(71,18,26,.24)}
.q .btn.b2:hover{background:var(--ivory-3);box-shadow:none}
.q .lnk:hover{color:var(--copper-t);text-decoration-color:var(--copper-t)}
.q .lnk:hover .ico{transform:translateX(-4px)}
}
/* שדות: חמישה מצבים */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label,.q .legend{font-size:14px;font-weight:500;line-height:1.2;color:var(--ink)}
.q .in{font:inherit;font-size:16px;line-height:1.2;min-height:52px;padding:14px 20px;border:1.5px solid var(--field);border-radius:999px;background:var(--paper);color:var(--ink);appearance:none;width:100%;transition:border-color .15s var(--ease),box-shadow .15s var(--ease)}
.q .in::placeholder{color:#7A6A62}
.q .in:focus,.q .in:focus-visible{outline:0;border-color:var(--copper-t);box-shadow:0 0 0 3px rgba(180,105,58,.25)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;align-items:center;gap:6px;font-size:13px;line-height:1.3;color:var(--err)}
.q .fld .msg .ico{color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{background:var(--ivory-2);color:var(--muted)}
/* reveal: keyframes. התוכן גלוי בלי JS; רק .js מסתיר */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:ndrev .6s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes ndrev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
/* פתיחת עמוד (1.1 שניות): ההדר, הטקסט, הקשת עולה והשמש נפתחת מאחוריה */
.q .hd-in{animation:ndfade .6s ${EASE} both}
.q .oi{animation:ndup .6s ${EASE} both}
.q .oi:nth-child(1){animation-delay:.08s}.q .oi:nth-child(2){animation-delay:.16s}.q .oi:nth-child(3){animation-delay:.24s}.q .oi:nth-child(4){animation-delay:.32s}.q .oi:nth-child(5){animation-delay:.4s}
.q .hero-arch{animation:ndarch .9s ${EASE} .15s both}
.q .sun{animation:ndsun 1.1s ${EASE} .3s both}
.q .tag{animation:ndfade .5s ${EASE} .9s both}
@keyframes ndfade{from{opacity:0}to{opacity:1}}
@keyframes ndup{from{opacity:0;translate:0 18px}to{opacity:1;translate:0 0}}
@keyframes ndarch{from{opacity:0;translate:0 40px}to{opacity:1;translate:0 0}}
@keyframes ndsun{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}
@keyframes ndpanel{from{opacity:0;translate:0 12px}to{opacity:1;translate:0 0}}
/* תמונות: טיפול אחד בכל העמוד. קשת (חצי עיגול למעלה, ישר למטה), אותו גריידינג חם, זום 3% בריחוף */
.q .arch{overflow:hidden;border-radius:var(--arch);background:var(--ivory-3);aspect-ratio:4/5}
.q .arch img{width:100%;height:100%;object-fit:cover;transition:transform .45s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .arch:hover img{transform:scale(1.03)}}
/* מבנה */
.q .wrap{max-width:1240px;margin-inline:auto}
.q .sec{padding:var(--sec) var(--gut)}
.q .head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:620px;margin-bottom:56px}
.q .head.c{align-items:center;text-align:center;margin-inline:auto}
.q .head.c .lead{margin-inline:auto}
.q section[id]{scroll-margin-top:96px}
/* הדר: סימטרי, הלוגו במרכז, headroom */
.q .hd{position:sticky;top:0;z-index:30;padding-inline:var(--gut);background:var(--ivory);transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
.q .hd.is-hidden{transform:translateY(-100%)}
.q .hd.is-stuck{box-shadow:0 8px 24px rgba(50,15,15,.08)}
.q .hd-in{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;max-width:1240px;height:80px;margin-inline:auto}
.q .hd nav{display:flex;gap:4px}
.q .hd-end{display:flex;align-items:center;justify-content:flex-end;gap:4px}
.q .hd nav a{display:inline-flex;align-items:center;min-height:44px;padding:10px 16px;border-radius:999px;font-size:14px;font-weight:500;line-height:1;color:var(--muted);transition:background .15s var(--ease),color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .hd nav a:hover{background:var(--ivory-2);color:var(--ink)}}
.q .hd .btn.sm{margin-inline-start:12px}
.q .logo{display:inline-flex;flex-direction:column;align-items:center;gap:4px;min-height:44px;justify-content:center;font-family:var(--disp);font-size:30px;line-height:1;color:var(--ink)}
.q .mark{width:32px;height:18px}
/* הירו */
.q .hero{padding:24px var(--gut) 0;position:relative;z-index:2}
.q .hero-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:end;max-width:1240px;margin-inline:auto}
.q .hero-txt{display:flex;flex-direction:column;align-items:flex-start;gap:24px;padding-bottom:112px}
.q .hero h1{max-width:560px}
.q .ctas{display:flex;align-items:center;flex-wrap:wrap;gap:8px 32px;margin-top:8px}
.q .meta{display:flex;flex-wrap:wrap;gap:12px 28px;font-size:14px;line-height:1.3;color:var(--muted);margin-top:8px}
.q .meta li{display:flex;align-items:center;gap:8px}
.q .hero-vis{position:relative;display:grid;justify-items:center}
.q .sun{position:absolute;inset-inline:-12%;bottom:0;width:124%;height:auto;transform-origin:50% 100%;pointer-events:none;overflow:visible}
.q .sun .r1{fill:var(--copper);opacity:.5}
.q .sun .r2{fill:var(--copper-l);opacity:.45}
.q .hero-arch{position:relative;width:min(100%,440px);height:min(560px,calc(100svh - 200px));aspect-ratio:auto;margin-bottom:-64px;box-shadow:var(--shadow)}
.q .tag{position:absolute;inset-inline-start:0;bottom:24px;z-index:2;display:flex;flex-direction:column;gap:4px;padding:16px 24px;background:var(--paper);border-radius:24px;box-shadow:var(--shadow)}
.q .tag small{font-size:13px;font-weight:500;line-height:1.3;color:var(--muted)}
.q .tag strong{font-size:16px;font-weight:500;line-height:1.3}
.q .tag .price{font-size:28px;color:var(--copper-t)}
/* מספרים ומחירים: פונט התצוגה, נחושת */
.q .price{font-family:var(--disp);font-size:30px;line-height:1;font-variant-numeric:lining-nums tabular-nums;white-space:nowrap}
/* רגע החתימה: מניפת העונה על שיש אדום */
.q .marble{position:relative;background:var(--marble);color:var(--on-ox);padding:calc(var(--sec) + 48px) var(--gut) calc(var(--sec) + 48px);clip-path:polygon(0 0,100% 0,100% calc(100% - 48px),58% calc(100% - 48px),58% calc(100% - 32px),55% calc(100% - 32px),55% calc(100% - 16px),52% calc(100% - 16px),52% 100%,48% 100%,48% calc(100% - 16px),45% calc(100% - 16px),45% calc(100% - 32px),42% calc(100% - 32px),42% calc(100% - 48px),0 calc(100% - 48px))}
.q .marble::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 55%,rgba(30,8,8,.55),rgba(30,8,8,.2) 70%,transparent);pointer-events:none}
.q .marble>*{position:relative}
.q .marble .eyebrow{color:var(--copper-l)}
.q .marble .orn{fill:var(--copper-l)}
.q .marble .lead{color:var(--mut-d)}
.q .marble :is(a,button,[tabindex]):focus-visible{outline-color:var(--copper-l)}
.q .fan{display:none;position:relative;width:520px;height:300px;margin:0 auto 8px}
.q.js .fan{display:block}
.q .blade{position:absolute;left:50%;bottom:24px;width:128px;height:268px;margin-left:-64px;padding:0;border:0;background:none;cursor:pointer;transform-origin:50% 100%;transform:rotate(0deg);transition:transform .9s var(--ease);transition-delay:calc(var(--i) * 60ms);-webkit-tap-highlight-color:transparent}
.q .fan.is-open .blade{transform:rotate(var(--a))}
.q .bl-shape{position:absolute;inset:0;background:rgba(217,161,120,.16);clip-path:polygon(44% 100%,56% 100%,100% 9%,50% 0,0 9%);transition:background .3s var(--ease)}
.q .blade[aria-selected="true"] .bl-shape{background:var(--copper-l)}
.q .bl-lbl{position:absolute;left:50%;top:56px;translate:-50% 0;transform:rotate(calc(var(--a) * -1));transition:transform .9s var(--ease),color .3s var(--ease);font-family:var(--disp);font-size:26px;line-height:1;white-space:nowrap;color:var(--copper-l);padding:4px 8px;border-radius:8px}
.q .fan:not(.is-open) .bl-lbl{transform:rotate(0deg)}
.q .blade[aria-selected="true"] .bl-lbl{color:var(--ink)}
.q .blade:focus-visible{outline:0}
.q .blade:focus-visible .bl-lbl{outline:3px solid var(--on-ox);outline-offset:2px}
@media (hover:hover) and (pointer:fine){.q .blade[aria-selected="false"]:hover .bl-shape{background:rgba(217,161,120,.3)}}
.q .hub{position:absolute;left:50%;bottom:0;width:176px;height:88px;margin-left:-88px;border-radius:88px 88px 0 0;background:var(--copper-l);color:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:16px;gap:4px;pointer-events:none;z-index:2}
.q .hub b{font-family:var(--disp);font-weight:400;font-size:26px;line-height:1}
.q .hub span{font-size:12px;font-weight:600;line-height:1}
.q .panels{max-width:1080px;margin-inline:auto}
.q .panel[hidden]{display:none}
.q.js .panel:not([hidden]){animation:ndpanel .45s ${EASE} both}
.q.js .pn-h{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.q .pn-h{font-family:var(--disp);font-weight:400;font-size:30px;color:var(--copper-l);margin-bottom:24px;text-align:center}
.q .panel+.panel{margin-top:56px}
.q .drinks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;padding-top:32px;text-align:center}
.q .drinks li{display:flex;flex-direction:column;align-items:center;gap:12px}
.q .drinks h4{font-family:var(--disp);font-weight:400;font-size:28px;line-height:1.15;color:var(--on-ox)}
.q .drinks p{font-size:15px;line-height:1.55;color:var(--mut-d);max-width:260px}
.q .drinks .price{color:var(--copper-l);margin-top:4px}
.q .mn-foot{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px 32px;margin-top:56px}
.q .mn-foot .micro{color:var(--mut-d)}
.q .mn-foot .lnk{color:var(--on-ox)}
@media (hover:hover) and (pointer:fine){.q .mn-foot .lnk:hover{color:var(--copper-l);text-decoration-color:var(--copper-l)}}
.q .mn-foot .lnk .ico{color:var(--copper-l)}
/* הערב בשלושה מספרים */
.q .evening{padding:var(--sec) var(--gut) var(--sec)}
.q .ev-grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:88px;align-items:center;max-width:1240px;margin-inline:auto}
.q .ev-vis .arch{aspect-ratio:5/6}
.q .ev-body .head{margin-bottom:48px}
.q .nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}
.q .nums li{display:flex;flex-direction:column;gap:8px}
.q .num{font-family:var(--disp);font-size:clamp(64px,7cqi,96px);line-height:.9;color:var(--copper-t);font-variant-numeric:lining-nums}
.q .nums b{font-size:17px;font-weight:500;line-height:1.3}
.q .nums p{font-size:15px;line-height:1.55;color:var(--muted);max-width:220px}
/* ביקורות וציטוט הבר-מן */
.q .proof{padding:0 var(--gut) var(--sec)}
.q .pr-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:88px;align-items:start;max-width:1240px;margin-inline:auto}
.q .pr-side{display:flex;flex-direction:column;gap:32px;position:sticky;top:104px}
.q .pr-side .arch{aspect-ratio:4/5;max-height:520px}
.q .quote{font-family:var(--disp);font-size:clamp(26px,2.6cqi,34px);line-height:1.25;letter-spacing:-.01em;color:var(--ink);text-wrap:balance}
.q .q-by{font-size:14px;font-weight:500;line-height:1.3;color:var(--muted);margin-top:12px}
.q .rvs{display:flex;flex-direction:column;gap:8px}
.q .rv{display:flex;flex-direction:column;gap:16px;padding:32px;border-radius:24px;transition:background .3s var(--ease)}
.q .rv:nth-child(2){background:var(--ivory-2)}
.q .stars{font-size:15px;line-height:1;letter-spacing:0;color:var(--copper-t)}
.q .rv blockquote{font-size:18px;line-height:1.6;color:var(--ink);max-width:560px}
.q .rv figcaption{display:flex;flex-direction:column;gap:4px}
.q .rv figcaption b{font-size:14px;font-weight:500;line-height:1.3}
.q .rv figcaption span{font-size:13px;line-height:1.3;color:var(--muted)}
.q .pr-foot{margin-top:16px;padding-inline:32px}
/* הזמנה: לוח שנהב שהצילום בקשת עולה מעליו */
.q .reserve{padding:var(--sec) var(--gut)}
.q .rpanel{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);grid-template-areas:"photo body" "info body";grid-template-rows:auto 1fr;column-gap:72px;row-gap:40px;align-items:start;max-width:1240px;margin-inline:auto;padding:64px;border-radius:40px;background:var(--ivory-2)}
.q .r-photo{grid-area:photo;margin-top:calc(-1 * (var(--sec) + 88px));aspect-ratio:4/5;max-height:520px;width:min(100%,400px);box-shadow:var(--shadow)}
.q .rinfo{grid-area:info;display:flex;flex-direction:column;gap:16px}
.q .rinfo li{display:flex;align-items:flex-start;gap:12px}
.q .rinfo .ico{margin-top:2px}
.q .rinfo div{display:flex;flex-direction:column;gap:4px;font-size:15px;line-height:1.5;color:var(--muted)}
.q .rinfo b{font-size:16px;font-weight:500;color:var(--ink)}
.q .rinfo a[href^="tel"]{align-self:flex-start;display:inline-flex;align-items:center;min-height:44px;margin-block:-10px;font-size:16px;font-weight:500;color:var(--ink);unicode-bidi:isolate;transition:color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .rinfo a[href^="tel"]:hover{color:var(--copper-t)}}
.q .r-body{grid-area:body}
.q .r-body .head{margin-bottom:32px}
.q .form{display:flex;flex-direction:column;gap:24px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .opts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.q .opt{position:relative}
.q .opt input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.q .opt span{display:inline-flex;align-items:center;min-height:44px;padding:10px 20px;border-radius:999px;background:var(--paper);border:1.5px solid var(--field);font-size:15px;font-weight:500;line-height:1;transition:background .18s var(--ease),color .18s var(--ease),border-color .18s var(--ease)}
.q .opt input:checked+span{background:var(--ox);border-color:var(--ox);color:var(--on-ox)}
.q .opt input:focus-visible+span{outline:3px solid var(--copper-t);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.q .opt input:not(:checked):hover+span{background:var(--ivory-3)}}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:16px 24px}
.q .ok{display:none;flex-direction:column;align-items:flex-start;gap:16px;padding:32px 0}
.q .ok .tick{width:56px;height:56px;border-radius:50%;background:var(--paper);display:grid;place-items:center}
.q .rpanel.is-sent .form{display:none}
.q .rpanel.is-sent .ok{display:flex}
/* פוטר: שיש, חצי שמש עולה בקצה העליון */
.q .ft{position:relative;margin-top:88px;padding:112px var(--gut) 40px;background:var(--marble);color:var(--on-ox);text-align:center}
.q .ft::before{content:"";position:absolute;left:50%;top:-88px;width:176px;height:88px;margin-left:-88px;border-radius:88px 88px 0 0;background:var(--copper-l)}
.q .ft-mark{position:absolute;left:50%;top:-56px;width:72px;height:40px;margin-left:-36px;fill:var(--ox)}
.q .ft-brand{display:flex;flex-direction:column;align-items:center;gap:16px;max-width:520px;margin:0 auto 56px}
.q .ft-brand .logo{font-size:56px;color:var(--on-ox)}
.q .ft-brand p{font-size:15px;line-height:1.6;color:var(--mut-d)}
.q .ft-top{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;max-width:960px;margin-inline:auto}
.q .ft-col{display:flex;flex-direction:column;align-items:center;font-size:15px;line-height:1.6;color:var(--mut-d)}
.q .ft-col span:not(.ft-h),.q .ft-col address{padding-block:6px}
.q .ft-h{font-size:14px;font-weight:600;line-height:1.3;color:var(--copper-l);margin-bottom:8px}
.q .ft-col a,.q .ft-bot a{display:inline-block;padding-block:6px;color:var(--mut-d);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:var(--on-ox)}}
.q .ft :is(a,button):focus-visible{outline-color:var(--copper-l)}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1240px;margin:72px auto 0;font-size:14px;color:var(--mut-d)}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
/* טאבלט */
@container (max-width:1023px){
.q{--sec:88px}
.q .hd nav a{padding:10px 12px}
.q .hero-in{gap:32px}
.q .hero-txt{padding-bottom:88px}
.q .fan{transform:scale(.88);transform-origin:50% 100%}
.q .drinks{gap:28px}
.q .ev-grid{gap:48px}
.q .nums{gap:24px}
.q .pr-grid{gap:48px}
.q .rpanel{grid-template-columns:1fr;grid-template-areas:"photo" "body" "info";grid-template-rows:none;padding:56px 40px;row-gap:40px}
.q .r-photo{margin-top:calc(-1 * (var(--sec) + 72px));aspect-ratio:16/10;width:100%}
.q .ft-col a,.q .ft-bot a{padding-block:12px}
}
/* טלפון */
@container (max-width:767px){
.q{--sec:64px}
.q .hd-in{grid-template-columns:auto 1fr;height:68px;gap:12px}
.q .hd nav{display:none}
.q .hd-in>.logo{order:-1;flex-direction:row;gap:8px;font-size:26px}
.q .hero{padding-top:16px}
.q .hero-in{grid-template-columns:1fr;gap:32px}
.q .hero-txt{gap:20px;padding-bottom:0}
.q .ctas{width:100%;flex-direction:column;align-items:stretch;gap:0;margin-top:4px}
.q .ctas .btn{width:100%}
.q .ctas .lnk{justify-content:center}
.q .hero-arch{width:min(100%,320px);height:auto;aspect-ratio:4/5;margin-bottom:-48px}
.q .tag{bottom:12px;padding:12px 16px}
.q .tag .price{font-size:24px}
.q .marble{padding-top:calc(var(--sec) + 32px)}
.q .head{margin-bottom:40px}
.q .fan{width:340px;height:220px;transform:none}
.q .blade{width:96px;height:196px;margin-left:-48px;bottom:16px}
.q .bl-lbl{top:36px;font-size:22px}
.q .hub{width:128px;height:64px;margin-left:-64px;padding-bottom:10px}
.q .hub b{font-size:20px}
.q .hub span{font-size:11px}
.q .drinks{grid-template-columns:1fr;gap:32px;padding-top:24px}
.q .ev-grid{grid-template-columns:1fr;gap:40px}
.q .ev-vis .arch{aspect-ratio:4/5;max-height:440px;width:min(100%,360px);margin-inline:auto}
.q .nums{grid-template-columns:1fr;gap:28px}
.q .nums li{display:grid;grid-template-columns:96px minmax(0,1fr);column-gap:16px;align-items:center}
.q .nums .num{grid-row:span 2;font-size:64px}
.q .pr-grid{grid-template-columns:1fr;gap:40px}
.q .pr-side{position:relative;top:auto}
.q .pr-side .arch{max-height:420px;width:min(100%,340px)}
.q .rv{padding:24px 20px}
.q .pr-foot{padding-inline:20px}
.q .rpanel{padding:40px 24px}
.q .r-photo{margin-top:calc(-1 * (var(--sec) + 48px));aspect-ratio:4/5;width:min(100%,300px);margin-inline:auto}
.q .form .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:88px}
.q .ft-brand .logo{font-size:48px}
.q .ft-top{grid-template-columns:1fr;gap:32px}
.q .ft-bot{justify-content:center;text-align:center;margin-top:48px}
.q .ft-bot nav{gap:16px;justify-content:center}
}
@media (prefers-reduced-motion:reduce){
.q.js .reveal{opacity:1}
.q .reveal.is-in,.q .hd-in,.q .oi,.q .hero-arch,.q .sun,.q .tag,.q.js .panel:not([hidden]){animation:none}
.q .blade,.q .bl-lbl{transition:none}
.q .btn,.q .lnk,.q .lnk .ico,.q .arch img,.q .hd,.q .opt span,.q .bl-shape{transition:none}
.q .btn:hover,.q .btn:active{transform:none}
.q .arch:hover img,.q .lnk:hover .ico{transform:none}
}`;

// ───────── HTML ─────────
const HTML = `<div class="cwrap sk-s15"><div class="q" id="s15-top">
<a class="skip" href="#s15-main">דילוג לתוכן</a>
<header class="hd"><div class="hd-in">
<nav aria-label="ראשי"><a href="#s15-menu">התפריט</a><a href="#s15-evening">הערב</a><a href="#s15-reviews">ביקורות</a></nav>
<a class="logo" href="#s15-top" aria-label="מרגו, לראש הדף">${MARK}<span>מרגו</span></a>
<div class="hd-end"><a class="btn sm" href="#s15-reserve">להזמין שולחן</a></div>
</div></header>
<main id="s15-main">
<section class="hero" aria-labelledby="s15-h1"><div class="hero-in">
<div class="hero-txt">
<span class="eyebrow oi">${ORN}בר קוקטיילים · לילינבלום 22, תל אביב</span>
<h1 class="oi" id="s15-h1">בר קוקטיילים קטן בבניין משנת <span class="yr" dir="ltr">1932</span></h1>
<p class="lead oi">שלושים מקומות סביב בר של שיש אדום, שנים&nbsp;עשר קוקטיילים שמתחלפים עם העונה, ופסנתר חי מחמישי עד שבת.</p>
<div class="ctas oi"><a class="btn" href="#s15-reserve">להזמין שולחן</a><a class="lnk" href="#s15-menu">לתפריט של העונה${I.arrow}</a></div>
<ul class="meta oi"><li>${I.clock}<span data-open>שני עד שבת, 19:00 עד 01:00</span></li><li>${I.note}<span>פסנתר חי, חמישי עד שבת</span></li></ul>
</div>
<div class="hero-vis">
<svg class="sun" viewBox="0 0 1000 640" aria-hidden="true" focusable="false">${RAYS}</svg>
<figure class="arch hero-arch"><img src="${IMG}hero-glass.webp" width="1100" height="1375" alt="כוס קוקטייל ענברי על שולחן שיש עגול עם עורקים כהים, ומאחוריה ספות קטיפה אדומות" fetchpriority="high" decoding="async"></figure>
<div class="tag"><small>הקוקטייל של השבוע</small><strong>נגרוני נחושת</strong><span class="price">60 ₪</span></div>
</div>
</div></section>

<section class="marble" id="s15-menu" aria-labelledby="s15-mn-h">
<div class="head c reveal"><span class="eyebrow">${ORN}תפריט הסתיו</span><h2 id="s15-mn-h">ארבעה אלכוהולים, שלושה קוקטיילים לכל אחד</h2><p class="lead">בוחרים להב במניפה ורואים מה מוזגים ממנו העונה.</p></div>
<div class="fan reveal" role="tablist" aria-label="בחירת אלכוהול">${MENU.map(bladeHtml).join("")}<div class="hub" aria-hidden="true"><b>סתיו</b><span>2026</span></div></div>
<div class="panels">${MENU.map(panelHtml).join("")}</div>
<div class="mn-foot reveal"><a class="lnk" href="#s15-reserve">לשמור מקום ליד הבר${I.arrow}</a><p class="micro">המחירים כוללים מע"מ. יש גם גרסה בלי אלכוהול לכל קוקטייל.</p></div>
</section>

<section class="evening" id="s15-evening" aria-labelledby="s15-ev-h"><div class="ev-grid">
<div class="ev-vis reveal"><figure class="arch"><img src="${IMG}room.webp" width="1100" height="1320" alt="הבר המואר באור ענבר בחלל כהה, מדפי בקבוקים מאחוריו ושולחנות עגולים לפניו" loading="lazy" decoding="async"></figure></div>
<div class="ev-body">
<div class="head reveal"><span class="eyebrow">${ORN}הערב אצל מרגו</span><h2 id="s15-ev-h">ערב אחד, בשלושה מספרים</h2><p class="lead">חדר קטן בכוונה: מספיק מקום כדי שהבר-מן יכיר אתכם, ומספיק שקט כדי לשמוע את הפסנתר.</p></div>
<ul class="nums">${NUMS.map((n, i) => `<li class="reveal" style="--i:${i}"><span class="num" dir="ltr">${n[0]}</span><b>${n[1]}</b><p>${n[2]}</p></li>`).join("")}</ul>
</div>
</div></section>

<section class="proof" id="s15-reviews" aria-labelledby="s15-rv-h"><div class="pr-grid">
<div class="pr-side reveal">
<figure class="arch"><img src="${IMG}pour.webp" width="1000" height="1250" alt="ברמן בסינר עור חום מוזג משקה מכוס ערבוב מגולפת לכוס בלון" loading="lazy" decoding="async"></figure>
<div><p class="quote">"קרח קשה, מידה מדויקת, ועוד חצי דקה של סבלנות. זה כל הסוד."</p><p class="q-by">נועם, הבר הראשי</p></div>
</div>
<div>
<div class="head reveal"><span class="eyebrow">${ORN}ביקורות</span><h2 id="s15-rv-h">מה כותבים אחרי הסיבוב האחרון</h2></div>
<div class="rvs">${REVIEWS.map(rv).join("")}</div>
<p class="micro pr-foot reveal">ביקורות לדוגמה: טקסטים להדגמה בלבד, לא של עסק אמיתי.</p>
</div>
</div></section>

<section class="reserve" id="s15-reserve" data-cta-end aria-labelledby="s15-rs-h"><div class="rpanel reveal">
<figure class="arch r-photo"><img src="${IMG}flute.webp" width="1000" height="1250" alt="כוס שמפניה גבוהה עם קוקטייל ענברי מנצנץ ופרוסת לימון מיובשת, על רקע מסגרת זהב" loading="lazy" decoding="async"></figure>
<ul class="rinfo">
<li>${I.pin}<div><b>לילינבלום 22, תל אביב</b><span>הכניסה מהחצר, בקומת הקרקע של הבניין</span></div></li>
<li>${I.clock}<div><b data-open>שני עד שבת, 19:00 עד 01:00</b><span>ראשון סגור. המטבח הקטן פתוח עד 23:30</span></div></li>
<li>${I.phone}<div><a href="tel:+97235550193" dir="ltr">03-555-0193</a><span>אפשר להתקשר גם לשאול אם יש מקום ליד הבר</span></div></li>
</ul>
<div class="r-body">
<div class="head"><span class="eyebrow">${ORN}הזמנת שולחן</span><h2 id="s15-rs-h">לשמור לכם מקום ליד הבר?</h2><p class="lead">בוחרים ערב ומספר אורחים, ונחזור אליכם בהודעה לאישור עוד באותו יום. בלי הזמנה אפשר תמיד לנסות את הבר.</p></div>
<form class="form" novalidate>
<div class="row">
<div class="fld"><label for="s15-name">שם</label><input class="in" id="s15-name" name="name" autocomplete="name" required aria-describedby="s15-name-m"><span class="msg" id="s15-name-m">${I.alert}על איזה שם לשמור?</span></div>
<div class="fld"><label for="s15-tel">טלפון</label><input class="in" id="s15-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s15-tel-m"><span class="msg" id="s15-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<fieldset><legend class="legend">איזה ערב?</legend><div class="opts">
<label class="opt"><input type="radio" name="night" value="thu" checked><span>חמישי</span></label>
<label class="opt"><input type="radio" name="night" value="fri"><span>שישי</span></label>
<label class="opt"><input type="radio" name="night" value="sat"><span>שבת</span></label>
<label class="opt"><input type="radio" name="night" value="other"><span>ערב אחר</span></label>
</div></fieldset>
<fieldset><legend class="legend">כמה תהיו?</legend><div class="opts">
<label class="opt"><input type="radio" name="guests" value="2" checked><span>שניים</span></label>
<label class="opt"><input type="radio" name="guests" value="3"><span>שלושה</span></label>
<label class="opt"><input type="radio" name="guests" value="4"><span>ארבעה</span></label>
<label class="opt"><input type="radio" name="guests" value="5"><span>חמישה ומעלה</span></label>
</div></fieldset>
<div class="form-foot"><button class="btn" type="submit">לשמור שולחן</button><p class="micro">את הטלפון משתמשים רק לאישור ההזמנה.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="tick">${I.check}</span><h3>קיבלנו</h3><p class="lead">נחזור אליכם בהודעה לאישור עוד היום. נתראה ליד הבר.</p></div>
</div>
</div></section>
</main>

<footer class="ft">
<svg class="brand-mark ft-mark" viewBox="0 0 32 18" aria-hidden="true" focusable="false">${fan(16, 17, 15, 5, 7)}</svg>
<div class="ft-brand"><a class="logo" href="#s15-top" aria-label="מרגו, לראש הדף">מרגו</a><p>בר קוקטיילים בבניין משנת 1932 בתל אביב. שיש אדום, נחושת ופסנתר.</p></div>
<div class="ft-top">
<div class="ft-col"><p class="ft-h">שעות</p><span>שני עד שבת, 19:00 עד 01:00</span><span>ראשון סגור</span></div>
<div class="ft-col"><p class="ft-h">להגיע</p><address>לילינבלום 22, תל אביב</address><a href="tel:+97235550193" dir="ltr">03-555-0193</a><a href="https://waze.com/ul?q=%D7%9C%D7%99%D7%9C%D7%99%D7%A0%D7%91%D7%9C%D7%95%D7%9D%2022%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91" rel="noopener">ניווט ב-Waze</a></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s15-menu">התפריט</a><a href="#s15-evening">הערב</a><a href="#s15-reviews">ביקורות</a><a href="#s15-reserve">הזמנת שולחן</a></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> מרגו</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
const JS = `(function(){var root=document.querySelector(".sk-s15");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return(r||q).querySelector(s)}function $$(s,r){return[].slice.call((r||q).querySelectorAll(s))}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
/* הדר: headroom */
var hd=$(".hd"),top=document.querySelector(".vtop"),lastTop=-1,hidden=false,stuck=false,lastY=window.scrollY,acc=0;
function place(){if(!hd||!top)return;var s=getComputedStyle(top),v=s.position==="sticky"&&s.display!=="none"?top.offsetHeight:0;if(v!==lastTop){lastTop=v;hd.style.top=v+"px"}}
function setHidden(v){if(v===hidden)return;hidden=v;hd.classList.toggle("is-hidden",v)}
function onScroll(){place();var y=window.scrollY,d=y-lastY,s=y>24;lastY=y;if(s!==stuck){stuck=s;hd.classList.toggle("is-stuck",s)}if(y<=96){acc=0;setHidden(false);return}
acc=(d>0)===(acc>0)?acc+d:d;if(acc>6)setHidden(true);else if(acc<-6)setHidden(false)}
window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",place);hd.addEventListener("focusin",function(){setHidden(false)});place();
/* שעות פתיחה בשעון ישראל: שני עד שבת 19:00 עד 01:00, כולל הלילה שאחרי חצות */
var OPEN=[0,1,1,1,1,1,1],DAY=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];
function il(){try{var o={};new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jerusalem",weekday:"short",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});
return{d:{Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[o.weekday],m:(+o.hour%24)*60+(+o.minute)}}catch(e){return null}}
var n=il();if(n){var txt;
if(OPEN[n.d]&&n.m>=1140)txt="פתוח עכשיו עד 01:00";else if(n.m<60&&OPEN[(n.d+6)%7])txt="פתוח עכשיו עד 01:00";
else{var k,dd;for(k=0;k<8;k++){dd=(n.d+k)%7;if(OPEN[dd]&&(k>0||n.m<1140))break}txt="סגור כרגע, נפתח "+(k===0?"היום":k===1?"מחר":"ביום "+DAY[dd])+" ב-19:00"}
$$("[data-open]").forEach(function(e){e.textContent=txt})}
/* reveal פעם אחת */
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* מניפת העונה: נפתחת כשמגיעים אליה, וכל להב הוא טאב */
var fanEl=$(".fan"),blades=$$(".blade"),panels=$$(".panel");
if(fanEl){if(rm||!("IntersectionObserver" in window))fanEl.classList.add("is-open");
else{var fo=new IntersectionObserver(function(en){if(en[0].isIntersecting){fanEl.classList.add("is-open");fo.disconnect()}},{threshold:.35});fo.observe(fanEl)}}
function pick(i,focus){blades.forEach(function(t,j){t.setAttribute("aria-selected",String(j===i));t.tabIndex=j===i?0:-1});panels.forEach(function(p,j){p.hidden=j!==i});if(focus)blades[i].focus()}
if(blades.length){pick(0,false);var rtl=getComputedStyle(q).direction==="rtl";
blades.forEach(function(t,i){t.addEventListener("click",function(){pick(i,false)});t.addEventListener("keydown",function(e){var d=e.key==="ArrowLeft"?(rtl?1:-1):e.key==="ArrowRight"?(rtl?-1:1):0;
if(d){e.preventDefault();pick((i+d+blades.length)%blades.length,true)}else if(e.key==="Home"){e.preventDefault();pick(0,true)}else if(e.key==="End"){e.preventDefault();pick(blades.length-1,true)}})})}
/* טופס ההזמנה */
var form=$(".form"),rp=$(".rpanel");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/\\D/g,"").length>=9);
if(bad){bad.focus();return}rp.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Neo Deco", group: "שפות מהשטח",
  when: "ברים ומסעדות ערב, מלונות בוטיק, תכשיטים ושעונים, מספרות וסלונים יוקרתיים, קליניקות אסתטיקה, יין ואלכוהול, אירועים וחתונות, תיאטרון והופעות. כל עסק שמוכר ערב, טקס או מתנה, ורוצה להיראות חגיגי בלי להיות כהה. הטרנד של Pinterest Predicts 2026 (\"Neodeco\", חיפושי שיש אדום עלו ב-80%).",
  no: "טכנולוגיה, SaaS ומערכות, ילדים, בריאות שגרתית, עמותות ושירותים עממיים: הקישוט נקרא כיוקרה מזויפת או כמסיבה. וגם לא כשאין צילום חם ואמיתי של המקום או המוצר, ולא לאתר תוכן ארוך: פונט התצוגה הדק מעייף בכמות.",
  recipe: `פלטה: שנהב #F4EEE4 (הרקע) · שנהב 2 #EAE0D0 (משטח) ושנהב 3 #DFD2BE (הובר) · paper #FBF7F0 (המשטח הלבן היחיד, ורק עליו צל)
ink #221917 · muted #5E504A (6.7 על שנהב, 5.2 על שנהב 3)
בורדו #5C1A1E: הכפתור הראשי והבחירה הפעילה (שמנת #F6EBDD עליו 11.0) · הובר #47121A
נחושת #B4693A רק בצורות (קרניים, מניפות, אייקונים; 3.6 על שנהב) · טקסט נחושת #8C4A22 (5.8) למספרים, מחירים ושורת פתיחה · נחושת בהירה #D9A178 על שיש (7.7)
שיש אדום: אריח webp (16KB) עם הצללה רדיאלית מקומית מתחת לתוכן, לסקשן החתימה ולפוטר בלבד. טקסט עליו בשמנת ובאפור חם #CBB8AC
פונטים: Bellefair 400 (OFL) לכותרות, למספרים, למחירים ולמילת המותג, size-adjust 112% · Google Sans לגוף 400, כותרות משנה 500, פעולות ו-eyebrow 600 · H1 68/1.06/-.01em (יחס 4.25) · H2 48 · H3 20 · גוף 16
טיפול תמונה אחד: קשת (רדיוס 999 למעלה, ישר למטה), יחס 4:5, גריידינג חם אחד, זום 3% בריחוף
קישוט: רק צורות ממולאות. מניפה (לוגו ו-eyebrow), שמש עולה של 30 קרניים, להבי מניפה, זיגורת מדורגת בתחתית השיש, חצי שמש בראש הפוטר. אפס קווים
תנועה: reveal 16px/0.6s, סטאגר 70ms, פתיחה 1.1s (הקשת עולה, השמש נפתחת מ-55%), מניפה 0.9s עם סטאגר 60ms · ease cubic-bezier(.2,.6,.2,1)`,
  apply: "הדר סימטרי על שנהב: ניווט מצד אחד, מילת המותג Bellefair עם מניפת נחושת במרכז, כפתור בצד השני; headroom ובלי קו. הירו בשני טורים: הטקסט בהתחלה עם השנה בנחושת בתוך הכותרת, ובסוף צילום בקשת ששמש של קרני נחושת נפתחת מאחוריו, והקשת יורדת אל תוך סקשן השיש. כל סקשן נפתח באותו eyebrow (מניפה קטנה ושורה). סקשן החתימה על שיש אדום: מניפה של ארבעה להבים שנפתחת כשמגיעים אליה, וכל להב טאב שמציג שלושה קוקטיילים ממורכזים עם מחיר בנחושת; התחתית נחתכת בזיגורת. המספרים הגדולים ב-Bellefair נחושת. הביקורות בלי כרטיסים, רק השנייה על משטח. לוח ההזמנה שנהב 2 שהקשת עולה מעליו. הפוטר שיש עם חצי שמש בקצה העליון.",
  sig: "מניפת העונה: ארבעה להבי נחושת שנפתחים כמו מניפת דקו כשמגיעים אליה, והלהב שנבחר נדלק ופותח את הקוקטיילים שלו · שמש של 30 קרני נחושת שנפתחת מאחורי צילום הקשת בפתיחת העמוד · כל תמונה בקשת אחת, אותה קשת בכל העמוד · זיגורת מדורגת בתחתית השיש וחצי שמש בראש הפוטר במקום קו ישר · '1932' בנחושת בתוך הכותרת.",
  avoid: "זהב מבריק וגרדיאנט 'מתכתי' בטקסט ובכפתורים (נראה כמו הזמנה לבר מצווה) · קווי שיער, מסגרות כפולות ופינות מעוטרות סביב כל דבר: הדקו כאן בצורות ממולאות, לא בקווים · רקע כהה לכל העמוד (זה כהה יוקרתי, s13) · Bellefair מתחת ל-26px או בגוף טקסט · ריווח אותיות חיובי ו-ALL CAPS בלטינית · יותר מסקשן שיש אחד באמצע העמוד · שחור-זהב גנרי · אייקונים מעוטרים או ממולאים.",
  qa: ["רקע שנהב, השיש רק בסקשן החתימה ובפוטר", "בורדו רק בכפתור הראשי ובבחירה פעילה; נחושת רק בצורות, במספרים ובמחירים", "כל התמונות באותה קשת ובאותו גריידינג", "אפס קווים ומסגרות לקישוט: הקישוט צורות ממולאות", "Bellefair רק בכותרות, במספרים, במחירים ובמילת המותג, מעל 26px", "טקסט על השיש עובר 4.5 גם על העורקים (הצללה רדיאלית מתחת לתוכן)", "המניפה נפתחת פעם אחת, נשלטת במקלדת (חצים, Home, End), ובלי JS כל ארבעת התפריטים גלויים"],
  engine: "ניגודיות (נמדד 19.10.2026): muted #5E504A על שנהב 6.7, על שנהב 2 5.9, על שנהב 3 5.2 · טקסט נחושת #8C4A22 על שנהב 5.8, על שנהב 2 5.2 · שמנת על בורדו 11.0 · נחושת בהירה #D9A178 על בסיס השיש 7.7, ו-ink עליה 9.3 (הלהב הנבחר והחצי-שמש) · אפור חם #CBB8AC על בסיס השיש 9.1 · נחושת #B4693A 3.6 על שנהב, לצורות ולאייקונים בלבד · גבול שדה #8A7466 על שנהב 3.8. שדות 16px. המניפה היא tablist אמיתי: role=tab על כל להב, aria-selected, חצים לפי RTL, והתווית מסתובבת נגד הלהב כדי להישאר ישרה; טבעת הפוקוס על התווית כי הלהב חתוך ב-clip-path. אין תנועה רציפה בעמוד, ולכן אין צורך בכפתור השהיה. הכל נראה בלי JS.",
  agent: "עצב בסגנון ניו-דקו: רקע שנהב חם, טקסט חום-שחור, בורדו לכפתור הראשי ולבחירה, נחושת לצורות, למספרים ולמחירים, ושיש אדום רק בסקשן אחד ובפוטר. כותרות ב-Bellefair (סריף עם ניגוד חד), גוף ב-Google Sans. כל התמונות בקשת אחת עם גריידינג חם. הקישוט רק צורות ממולאות בהשראת שנות ה-20 (מניפה, קרני שמש, זיגורת), אף פעם לא קווים ומסגרות. רגע חתימה אחד שמרגיש כמו טקס: מניפה שנפתחת ומציגה את התפריט, או שמש שנפתחת מאחורי הקשת.",
  mobile: "ההדר: מילת המותג עם המניפה בהתחלה והכפתור בסוף, הניווט נעלם. ההירו: טקסט קודם, הכפתור ברוחב מלא, הקשת ממורכזת ברוחב 320 והשמש מאחוריה. המניפה מוקטנת (להבים של 196px) ועדיין נשלטת במגע, הקוקטיילים בעמודה אחת. המספרים בשורות: מספר גדול בצד ותיאור לידו. הביקורות בעמודה, ציטוט הבר-מן מעל. לוח ההזמנה: הקשת עולה מעליו ממורכזת, הטופס בעמודה אחת עם בחירות במגע של 44px. הפוטר ממורכז.",
  fonts: ["Bellefair (OFL, assets/fonts/bellefair.woff2)"],
};

export default [
  {
    ...base,
    id: "s15", name: "ניו-דקו",
    desc: "ארט-דקו של שנות ה-20 בגרסה של 2026: שנהב, בורדו, נחושת ושיש אדום, סריף עם ניגוד חד, תמונות בקשת וקישוט של צורות ממולאות במקום קווים. מרגיש כמו ערב חגיגי בבר של מלון ישן. כאן כעמוד אמיתי של בר קוקטיילים (דמיוני), לא שלד צבוע.",
    score: "30/30",
    note: "רף הסטודיו: 30/30, כל שבעת ה-★ עוברים. הכלי מדד 20 סעיפים וכולם עברו, כולל ניגודיות טקסט מול הפיקסלים של השיש (58 מדידות ב-1280 וב-390, אפס כשלים); חמשת סעיפי העין (10, 11, 12, 26, 30) נבדקו בצילומים בגודל אמיתי ב-1440 וב-390, וחמשת האחרים (15, 21, 22, 23, 27) לא חלים על העמוד. מתח H1/גוף 67/15 = 4.44. מעבר הסקשנים שאינו קו ישר: זיגורת בתחתית השיש וחצי שמש בראש הפוטר. נבדק בדפדפן: המניפה בעכבר ובמקלדת (חצים לפי RTL, Home), הטופס (שגיאה, פוקוס לשדה הראשון, הצלחה), שעות הפתיחה בשעון ישראל כולל הלילה שאחרי חצות, קונסול נקי. הצילומים: Freepik, 'Cocktail in Glass on Marble Table in Lounge' (פרימיום), ושלושה חינמיים ('Red and brown restaurant', ברמן בסינר עור, כוס שמפניה מול מסגרת זהב), כולם בגריידינג חם אחד. השיש מרונדר מ-SVG (feTurbulence), לא צילום. Bellefair תחת SIL OFL 1.1, הרישיון ליד הקובץ.",
    css: CSS, html: HTML, js: JS,
  },
];
