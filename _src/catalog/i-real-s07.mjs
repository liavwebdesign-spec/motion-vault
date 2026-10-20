// S7 · ברוטליזם, עמוד הייחוס בגרסה 2 (15.10.2026). נבנה מחדש כעמוד אמיתי, לפי המודל של s05 ו-s14.
//
// מה זה: העסק הדמיוני "מכבש", דפוס ריזו בתל אביב: פוסטרים, זינים ותפריטים בדיו אמיתי, מעשרה עותקים. אין כאן לקוח אמיתי;
// הצילומים הם סטוק (ראו ids בשדה note), והמספרים, המחירים והביקורות הם דוגמאות ומסומנים כך בעמוד.
// הפונט: Google Sans בלבד, מקומי. הרעיון הגולמי בא מצבע, ממשטח, מצורה ומקצב; ספרות לטיניות בלבד נכתבות ב-stack המונוספייס של המערכת.
// שפת הברוטליזם כאן: שדות צבע שטוחים וקצוות קשיחים · צל אחד, מוסט וקשיח בלי טשטוש (אותו צל הוא גם "אי-יישור שכבות" של הדפסת ריזו) ·
// בלי קווים: הקצה העבה (3px דיו) מופיע רק על פקדים (כפתור, שדה, בחירה) והמשטחים נפרדים בצבע, ברווח ובצל · רדיוס אפס.
// המבנה: הדר נייר עם צל קשיח · הירו עם "מדפיסים היום, אוספים מחר" ועליו כרטיס עבודה · רצועת צילום מלאה עם כרטיס נייר · הוכחה על שדה דיו ·
// "אינדקס העבודות" (רגע החתימה: שורות שמחליפות הדפס בגזירה מדורגת steps) · שלושה צעדים על שדה כתום · מחירון · כרטיס עבודה שקט · פוטר דיו.
// מנוע: ease החתום, reveal ב-keyframes 16px/0.5s, reduced-motion מכבה הכל, הכל נראה בלי JS. steps() מותר רק ברגע החתימה ובחותם הטופס.

const EASE = "cubic-bezier(.2,.6,.2,1)";
const IMG = "../assets/media/real/s07/";

// ───────── אייקונים: משפחה אחת, stroke 2.2, קצוות ישרים, 24 או 20 ─────────
const svg = (cls, d) => `<svg class="ico${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
const I = {
  arrow: svg(" s", `<path d="M20 12H4"/><path d="M10 6 4 12l6 6"/>`),
  check: svg(" s", `<path d="M4 12.5 9.5 18 20 6"/>`),
  alert: svg(" s", `<circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><path d="M12 16.5v.5"/>`),
  mark: `<span class="mark" aria-hidden="true"><i></i><i></i></span>`,
};

// ───────── המסמך ─────────
const CSS = `/* Google Sans מקומי, בשם משלו (כמו ב-s05). בפרויקט טוענים Google Sans כרגיל. */
@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
.cwrap{container-type:inline-size}
.q{--paper:#F2EFE6;--paper-2:#E5E0D1;--paper-3:#D6D0BD;--ink:#0B0B0B;--ink-2:#262621;--ac:#FF4B12;--ac-d:#E63D05;--muted:#55524A;--muted-k:#BDB9AC;--err:#B3261E;
 --ease:${EASE};--edge:var(--ink);--fc:var(--ink);--sh:6px;--shl:12px;--sec:112px;--gut:clamp(20px,4.4cqi,64px);
 --mono:ui-monospace,"SFMono-Regular",Consolas,monospace;--grain:url("../assets/media/real/s07/grain.png");
 background:var(--paper);color:var(--ink);font-family:"MV Google Sans","Google Sans",system-ui,sans-serif;font-size:16px;line-height:1.6;overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q p,.q ul,.q ol,.q dl,.q dd,.q figure,.q blockquote{margin:0}
.q a{color:inherit;text-decoration:none}
.q ul,.q ol{list-style:none;padding:0}
.q img{display:block;max-width:100%}
.q :focus-visible{outline:3px solid var(--fc);outline-offset:3px}
.q .m{font-family:var(--mono);font-weight:700;unicode-bidi:isolate;letter-spacing:0}
.q h1{font-size:clamp(44px,7.4cqi,104px);line-height:.98;font-weight:700;letter-spacing:-.03em}
.q h2{font-size:clamp(40px,5.2cqi,72px);line-height:1.04;font-weight:700;letter-spacing:-.02em}
.q h3{font-size:24px;line-height:1.25;font-weight:700}
.q .lead{font-size:20px;line-height:1.55;color:var(--muted);max-width:620px}
.q .body{font-size:16px;line-height:1.6;color:var(--muted);max-width:620px}
.q .micro{font-size:13px;line-height:1.35;color:var(--muted)}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:square;stroke-linejoin:miter;flex:none;display:block}
.q .ico.s{width:20px;height:20px}
/* משטחים: נייר (עם גרעין), דיו, כתום. כל אחד קובע את צבע המסגרת וטבעת המיקוד שלו */
.q .paper,.q .paper2,.q .dk,.q .or{background-color:var(--paper);background-image:var(--grain);background-size:160px}
.q .paper2{background-color:var(--paper-2)}
.q .dk{background-color:var(--ink);color:var(--paper);--edge:var(--paper);--fc:var(--paper)}
.q .or{background-color:var(--ac);color:var(--ink)}
.q .dk .lead,.q .dk .body,.q .dk .micro{color:var(--muted-k)}
.q .sec{padding:var(--sec) var(--gut);scroll-margin-top:136px}
.q .wrap{max-width:1320px;margin-inline:auto}
.q .sec-hd{display:flex;flex-direction:column;align-items:flex-start;gap:24px;margin-bottom:64px}
/* שורת פתיחה אחת בכל העמוד: מספר מונו וטקסט, בלוק דיו (על דיו: בלוק כתום) */
.q .eyebrow{display:inline-flex;align-items:center;gap:12px;height:32px;padding:0 12px;background:var(--ac);color:var(--ink);font-size:13px;font-weight:500;line-height:1}
.q .eyebrow .ix{font-family:var(--mono);font-weight:700;font-size:13px;color:var(--ink);unicode-bidi:isolate}
.q .or .eyebrow{background:var(--paper)}
/* כפתורים: קצה עבה אחד, צל קשיח, לחיצה מכנית */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;font:inherit;font-size:17px;font-weight:700;line-height:1;padding:14px 28px;min-height:52px;border:3px solid var(--ink);border-radius:0;cursor:pointer;background:var(--ac);color:var(--ink);box-shadow:var(--sh) var(--sh) 0 var(--edge);transition:transform .12s var(--ease),box-shadow .12s var(--ease),background-color .18s var(--ease)}
.q .btn:hover,.q .btn.is-hover{background:var(--ac-d);transform:translate(-2px,-2px);box-shadow:8px 8px 0 var(--edge)}
.q .btn:active,.q .btn.is-active{transform:translate(var(--sh),var(--sh));box-shadow:0 0 0 var(--edge)}
.q .btn:focus-visible,.q .btn.is-focus{outline:3px solid var(--fc);outline-offset:4px}
.q .btn:disabled,.q .btn.is-disabled{opacity:.5;pointer-events:none}
.q .btn.lg{font-size:18px;padding:16px 32px;min-height:56px}
.q .btn.sm{font-size:15px;padding:10px 20px;min-height:44px;--sh:4px}
.q .btn.b2{background:var(--paper);color:var(--ink)}
.q .btn.b2:hover,.q .btn.b2.is-hover{background:var(--paper-2)}
.q .btn.blk{width:100%}
.q .lnk{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:4px 4px;font-size:17px;font-weight:700;color:var(--ink);box-shadow:inset 0 -8px 0 var(--ac);transition:box-shadow .18s var(--ease),color .18s var(--ease)}
.q .lnk .ico{transition:transform .18s var(--ease)}
.q .lnk:hover,.q .lnk.is-hover{box-shadow:inset 0 -48px 0 var(--ac)}
.q .lnk:hover .ico{transform:translateX(-4px)}
/* שדות: קצה עבה אחד, בלי רדיוס */
.q .fld{display:flex;flex-direction:column;gap:8px;min-width:0}
.q .fld label,.q .legend{font-size:15px;font-weight:700;line-height:1.2;color:var(--ink);padding:0}
.q .in{font:inherit;font-size:17px;line-height:1.2;padding:14px 16px;min-height:52px;border:3px solid var(--ink);border-radius:0;background:#fff;color:var(--ink);appearance:none;width:100%;transition:box-shadow .12s var(--ease),transform .12s var(--ease)}
.q .in:focus{outline:3px solid var(--ink);outline-offset:3px;box-shadow:var(--sh) var(--sh) 0 var(--ac)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;font-size:14px;line-height:1.3;color:var(--err);align-items:center;gap:8px;font-weight:500}
.q .fld.err .msg{display:inline-flex}
.q .fld .msg .ico{color:var(--err)}
.q fieldset{border:0;padding:0;margin:0;min-width:0}
.q .opts{display:flex;flex-wrap:wrap;gap:12px;margin-top:12px}
.q .opt{position:relative;display:block}
.q .opt input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer;width:100%;height:100%}
.q .opt span{display:flex;align-items:center;min-height:48px;padding:0 20px;background:#fff;border:3px solid var(--ink);font-size:16px;font-weight:500;color:var(--ink);transition:background-color .18s var(--ease),transform .12s var(--ease),box-shadow .12s var(--ease)}
.q .opt:hover span{background:var(--paper-2)}
.q .opt input:checked+span{background:var(--ac);font-weight:700;box-shadow:4px 4px 0 var(--ink);transform:translate(-2px,-2px)}
.q .opt input:focus-visible+span{outline:3px solid var(--ink);outline-offset:3px}
/* תמונה: קצה חד, אפס רדיוס, צל קשיח */
.q .pic{overflow:hidden;background:var(--ink);box-shadow:var(--shl) var(--shl) 0 var(--edge)}
.q .pic img{width:100%;height:100%;object-fit:cover}
/* reveal */
.q.js .reveal{opacity:0}
.q .reveal.is-in{animation:s07rv .5s ${EASE} both;animation-delay:calc(var(--i,0)*70ms)}
@keyframes s07rv{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
/* פתיחת העמוד */
.q .oi{animation:s07oi .6s ${EASE} both}
.q .oi:nth-child(1){animation-delay:.1s}.q .oi:nth-child(2){animation-delay:.18s}.q .oi:nth-child(3){animation-delay:.26s}.q .oi:nth-child(4){animation-delay:.34s}
.q .hero-vis{animation:s07oi .6s ${EASE} .2s both}
@keyframes s07oi{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
/* הדר */
.q .hd{position:sticky;top:0;z-index:50;background-color:var(--paper);background-image:var(--grain);background-size:160px;box-shadow:0 4px 0 var(--ink);transition:transform .4s var(--ease)}
.q .hd.is-hidden{transform:translateY(calc(-100% - 8px))}
.q .hd-in{display:flex;align-items:center;gap:32px;max-width:1320px;margin-inline:auto;padding:12px var(--gut);min-height:72px}
.q .logo{display:inline-flex;align-items:center;gap:12px;font-size:26px;font-weight:700;line-height:1;min-height:44px}
.q .logo .mark{position:relative;width:32px;height:32px;flex:none;display:block}
.q .mark i{position:absolute;width:22px;height:22px;display:block}
.q .mark i:first-child{top:0;inset-inline-start:0;background:var(--ink)}
.q .mark i:last-child{top:10px;inset-inline-start:10px;background:var(--ac)}
.q .dk .mark i:first-child{background:var(--paper)}
.q .nav{display:flex;gap:4px;margin-inline:auto}
.q .nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;font-size:16px;font-weight:500;transition:background-color .18s var(--ease)}
.q .nav a:hover{background:var(--paper-2)}
/* הירו */
.q .hero{padding:48px var(--gut) 56px}
.q .hero-in{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:64px;align-items:center;max-width:1320px;margin-inline:auto}
.q .hero-tx{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.q .hero h1 span{display:block}
.q .hero .mk{display:inline-block;margin-top:12px;padding:0 .14em .08em;background:var(--ac);box-shadow:.07em .07em 0 var(--ink)}
.q .cta{display:flex;flex-wrap:wrap;align-items:center;gap:12px 32px;margin-top:8px}
.q .hero-vis{position:relative}
.q .hero-img{aspect-ratio:4/5;max-height:min(560px,calc(100svh - 72px - 63px - 96px));width:100%}
.q .tk{position:absolute;inset-inline-start:-32px;bottom:32px;width:min(260px,70%);background:var(--paper);color:var(--ink);padding:16px 20px 20px;box-shadow:var(--sh) var(--sh) 0 var(--ink);animation:s07oi .6s ${EASE} .5s both}
.q .tk-h{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:13px;font-weight:500;line-height:1}
.q .tk-h .m{font-size:20px}
.q .tk dl{display:grid;gap:12px;margin-top:16px}
.q .tk dt{font-size:13px;color:var(--muted);line-height:1.2}
.q .tk dd{font-size:18px;font-weight:700;line-height:1.2;margin-top:4px}
.q .tk dd .m{font-size:18px}
.q .tk .micro{margin-top:16px}
/* רצועת הצילום */
.q .band{position:relative;display:flex;align-items:center;min-height:560px;padding:64px var(--gut);background-color:var(--paper-3)}
.q .band-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:20% 40%}
.q .band-w{position:relative;width:100%;max-width:1320px;margin-inline:auto}
.q .band-card{max-width:600px;background-color:var(--paper);background-image:var(--grain);background-size:160px;padding:48px;box-shadow:var(--shl) var(--shl) 0 var(--ink);display:flex;flex-direction:column;gap:24px}
.q .band-card h2{font-size:clamp(40px,4.4cqi,60px)}
.q .specs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px}
.q .spec{display:flex;flex-direction:column;gap:8px;background:var(--ink);color:var(--paper);padding:16px 16px 20px}
.q .spec .m{font-size:28px;line-height:1;color:var(--ac)}
.q .spec span:last-child{font-size:14px;line-height:1.3}
/* הוכחה */
.q .proof{--edge:var(--paper)}
.q .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.q .st{display:flex;flex-direction:column;gap:16px;padding:40px 40px 48px;background:var(--paper);color:var(--ink)}
.q .st.hi{background:var(--ac)}
.q .st .n{font-family:var(--mono);font-weight:700;font-size:clamp(56px,7cqi,96px);line-height:.95;unicode-bidi:isolate;letter-spacing:-.04em}
.q .st .l{font-size:18px;line-height:1.4;font-weight:500}
.q .stats-note{margin-top:16px}
.q .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:88px;align-items:start}
.q .rv{display:flex;flex-direction:column;gap:24px;padding:32px 32px 40px;background:var(--paper);color:var(--ink);box-shadow:var(--shl) var(--shl) 0 var(--ac)}
.q .rv:nth-child(2){margin-top:32px;background:var(--ac);box-shadow:var(--shl) var(--shl) 0 var(--paper)}
.q .rv:nth-child(3){margin-top:64px}
.q .rv-t{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:13px;font-weight:500;line-height:1}
.q .rv-t .m{font-size:20px}
.q .rv blockquote{font-size:21px;line-height:1.5;font-weight:500}
.q .rv figcaption{display:flex;flex-direction:column;gap:4px;font-size:15px;line-height:1.35}
.q .rv figcaption b{font-weight:700;font-size:17px}
.q .rv figcaption span{color:var(--muted)}
.q .rv:nth-child(2) figcaption span,.q .rv:nth-child(2) .rv-t{color:var(--ink)}
/* אינדקס העבודות: רגע החתימה */
.q .idx{--pvw:400px;position:relative;padding-inline-end:calc(var(--pvw) + 72px);min-height:760px}
.q .idx-list{display:flex;flex-direction:column;gap:8px}
.q .idx-b{display:grid;grid-template-columns:56px minmax(0,1fr) 24px;align-items:center;gap:20px;width:100%;min-height:96px;padding:20px 24px;border:0;border-radius:0;background:var(--paper-2);color:var(--ink);font:inherit;text-align:start;cursor:pointer;transition:background-color .18s var(--ease),color .18s var(--ease)}
.q .idx-b:hover{background:var(--paper-3)}
.q .idx-b .ix{font-family:var(--mono);font-weight:700;font-size:20px;line-height:1;unicode-bidi:isolate}
.q .idx-b .tx{display:flex;flex-direction:column;gap:6px;min-width:0}
.q .idx-b .nm{font-size:clamp(24px,2.6cqi,34px);line-height:1.1;font-weight:700;letter-spacing:-.02em}
.q .idx-b .sp{font-size:15px;color:var(--muted);line-height:1.3}
.q .idx-b .sp .m{font-weight:700;color:inherit}
.q .idx-b .ico{transition:transform .2s var(--ease)}
.q .idx-it.is-on .idx-b{background:var(--ink);color:var(--paper)}
.q .idx-it.is-on .idx-b .ix{color:var(--ac)}
.q .idx-it.is-on .idx-b .sp{color:var(--muted-k)}
.q .idx-it.is-on .idx-b:focus-visible{outline-color:var(--ink)}
.q .pv{display:none;position:absolute;inset-block:0;inset-inline-end:0;width:var(--pvw)}
.q .idx-it.is-on .pv{display:block}
.q .pv-in{position:sticky;top:136px;display:flex;flex-direction:column;gap:32px}
.q .sheet-w{box-shadow:10px 10px 0 var(--ink)}
.q .sheet{position:relative;display:block;aspect-ratio:3/4;overflow:hidden;container-type:inline-size;background:#FBF9F2;color:var(--ink)}
.q .idx-it.is-on .sheet{animation:s07wipe .4s steps(5,end) both}
@keyframes s07wipe{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}}
.q .pv-meta{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.q .pv-meta div{background:var(--paper-2);padding:12px 16px 14px}
.q .pv-meta dt{font-size:13px;line-height:1.2;color:var(--muted)}
.q .pv-meta dd{font-size:16px;font-weight:700;line-height:1.3;margin-top:4px}
.q .pv-meta .m{font-size:16px}
.q .idx-note{margin-top:24px}
/* עיצוב ההדפסים עצמם (cqi = אחוז מרוחב הדף) */
.q .sheet .big{position:absolute;font-weight:700;line-height:.9;letter-spacing:-.03em;white-space:nowrap}
.q .sheet .t{position:absolute;font-family:var(--mono);font-weight:700;font-size:4cqi;line-height:1}
.q .s1 .t{top:8cqi;inset-inline-start:8cqi}
.q .s1 .big{top:16cqi;inset-inline-start:8cqi;font-size:27cqi;text-shadow:1.4cqi 1.2cqi 0 var(--ac)}
.q .s1 .rows{position:absolute;inset-inline:8cqi;bottom:8cqi;display:grid;gap:3cqi;font-size:5.4cqi;font-weight:500;line-height:1.1}
.q .s1 .rows p{display:flex;justify-content:space-between;align-items:center;padding:1.4cqi 2cqi}
.q .s1 .rows p:first-child{background:var(--ac);font-weight:700}
.q .s1 .rows .m{font-size:5.4cqi}
.q .s2{background:var(--ac)}
.q .s2 .t{top:8cqi;inset-inline-start:8cqi}
.q .s2 .big{top:18cqi;inset-inline-start:6cqi;font-size:41cqi;text-shadow:1.6cqi 1.4cqi 0 var(--paper)}
.q .s2 .band-b{position:absolute;inset-inline:0;bottom:0;background:var(--ink);color:var(--paper);padding:6cqi 8cqi 8cqi;font-size:6.4cqi;font-weight:700;line-height:1.15}
.q .s2 .band-b .m{display:block;font-size:4cqi;color:var(--ac);margin-bottom:2cqi}
.q .s3{background:var(--ink);color:var(--paper)}
.q .s3 .t{top:8cqi;inset-inline-start:8cqi;color:var(--paper)}
.q .s3 .disc{position:absolute;width:62cqi;height:62cqi;border-radius:50%;background:var(--ac);inset-inline-start:19cqi;top:18cqi}
.q .s3 .big{bottom:10cqi;inset-inline-start:8cqi;font-size:30cqi;text-shadow:1.4cqi 1.2cqi 0 var(--ac)}
.q .s3 .sm{position:absolute;bottom:4cqi;inset-inline-start:8cqi;font-size:4.2cqi;font-weight:500}
.q .s4 .big{top:10cqi;inset-inline-start:7cqi;font-size:46cqi;font-family:var(--mono);letter-spacing:-.06em;text-shadow:1.8cqi 1.6cqi 0 var(--ac)}
.q .s4 .lab{position:absolute;inset-inline-start:8cqi;bottom:26cqi;background:var(--ink);color:var(--paper);font-size:11cqi;font-weight:700;line-height:1;padding:3cqi 4cqi 4cqi}
.q .s4 .sm{position:absolute;inset-inline-start:8cqi;bottom:9cqi;font-size:5cqi;font-weight:500}
.q .s5{background:var(--paper-2)}
.q .s5 .cd{position:absolute;width:64cqi;aspect-ratio:7/4;padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;font-size:4.6cqi;line-height:1.2;box-shadow:2cqi 2cqi 0 var(--ink)}
.q .s5 .c1{background:var(--ink);color:var(--paper);top:12cqi;inset-inline-start:8cqi}
.q .s5 .c2{background:var(--ac);color:var(--ink);top:46cqi;inset-inline-start:28cqi}
.q .s5 .cd b{font-size:7cqi;line-height:1.1}
.q .s5 .cd .m{font-size:4cqi}
.q .s6 .g{position:absolute;inset:8cqi 8cqi 36cqi;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:3cqi}
.q .s6 .g span{display:flex;align-items:flex-end;padding:3cqi;font-family:var(--mono);font-weight:700;font-size:5cqi}
.q .s6 .g span:nth-child(1){background:var(--ink);color:var(--paper)}
.q .s6 .g span:nth-child(2){background:var(--ac)}
.q .s6 .g span:nth-child(3){background:var(--paper-3)}
.q .s6 .g span:nth-child(4){background:var(--ink);color:var(--ac)}
.q .s6 .big{bottom:8cqi;inset-inline-start:8cqi;font-size:24cqi;text-shadow:1.2cqi 1cqi 0 var(--ac)}
/* שלושה צעדים */
.q .how-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:88px;align-items:center;max-width:1320px;margin-inline:auto}
.q .how .sec-hd{margin-bottom:48px}
.q .steps{display:flex;flex-direction:column;gap:24px}
.q .stp{display:grid;grid-template-columns:96px minmax(0,1fr);gap:24px;align-items:start}
.q .stp .no{display:flex;align-items:center;justify-content:center;height:96px;background:var(--ink);color:var(--ac);font-family:var(--mono);font-weight:700;font-size:48px;line-height:1}
.q .stp h3{margin-top:8px}
.q .stp p{margin-top:8px;font-size:17px;line-height:1.55;max-width:460px}
.q .how .pic{aspect-ratio:1/1;width:100%}
/* מחירון */
.q .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
.q .plan{display:flex;flex-direction:column;gap:24px;padding:40px;background:var(--paper-2);color:var(--ink);box-shadow:var(--shl) var(--shl) 0 var(--ink);transition:transform .3s var(--ease),box-shadow .3s var(--ease),background-color .3s var(--ease)}
.q .plan.hi{background:var(--ac)}
.q .card.plan:hover{transform:translate(-4px,-4px);box-shadow:16px 16px 0 var(--ink);background:var(--paper-3)}
.q .card.plan.hi:hover{background:var(--ac-d)}
.q .plan-t{display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:500;line-height:1}
.q .plan-t .m{font-size:16px}
.q .pr{display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px}
.q .pr .cur{font-size:32px;font-weight:700;line-height:1}
.q .pr .n{font-family:var(--mono);font-weight:700;font-size:clamp(64px,7cqi,92px);line-height:.9;letter-spacing:-.04em;unicode-bidi:isolate}
.q .pr .per{flex-basis:100%;font-size:15px;color:var(--muted);line-height:1.4}
.q .plan.hi .pr .per{color:var(--ink)}
.q .plan ul{display:flex;flex-direction:column;gap:12px;font-size:16px;line-height:1.4}
.q .plan li{display:flex;gap:12px;align-items:flex-start}
.q .plan li .ico{margin-top:2px}
.q .plan .btn{margin-top:auto}
.q .plan.hi .btn{background:var(--ink);color:var(--paper)}
.q .plan.hi .btn:hover{background:var(--ink-2)}
.q .plans-note{margin-top:40px}
/* כרטיס עבודה: בלוק ההזמנה */
.q .ord-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.7fr);gap:88px;align-items:center;max-width:1320px;margin-inline:auto}
.q .ord .sec-hd{margin-bottom:40px}
.q .ord h2{font-size:clamp(40px,4.6cqi,64px)}
.q .form{display:flex;flex-direction:column;gap:24px}
.q .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .form-foot{display:flex;align-items:center;flex-wrap:wrap;gap:16px 24px}
.q .vpanel .ok{display:none;flex-direction:column;align-items:flex-start;gap:20px}
.q .vpanel.is-sent .form{display:none}
.q .vpanel.is-sent .ok{display:flex}
.q .stamp{display:inline-flex;align-items:center;gap:12px;background:var(--ac);padding:12px 24px 14px;font-size:32px;font-weight:700;line-height:1;box-shadow:var(--sh) var(--sh) 0 var(--ink);animation:s07st .4s steps(4,end) both}
@keyframes s07st{from{opacity:0;transform:scale(1.7)}to{opacity:1;transform:none}}
.q .ord .pic{aspect-ratio:1/1;width:100%;align-self:start;margin-top:-168px;position:relative;z-index:1}
/* פוטר */
.q .ft{padding:88px var(--gut) 40px}
.q .ft-top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;max-width:1320px;margin-inline:auto}
.q .ft-brand{display:flex;flex-direction:column;gap:20px;align-items:flex-start}
.q .ft-brand p{font-size:16px;line-height:1.6;color:var(--muted-k);max-width:320px}
.q .ft-col{display:flex;flex-direction:column;font-size:16px;line-height:1.6;color:var(--muted-k)}
.q .ft-col span:not(.ft-h),.q .ft-col address{padding-block:6px;font-style:normal}
.q .ft-h{font-size:15px;font-weight:700;line-height:1.3;color:var(--paper);margin-bottom:8px}
.q .ft-col a,.q .ft-bot a{display:inline-flex;align-items:center;min-height:44px;color:var(--muted-k);transition:color .15s var(--ease)}
.q .ft-col a[href^="tel"]{unicode-bidi:isolate;align-self:flex-start}
@media (hover:hover) and (pointer:fine){.q .ft-col a:hover,.q .ft-bot a:hover{color:var(--ac)}}
.q .ft-bot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px 32px;max-width:1320px;margin:48px auto 0;font-size:15px;color:var(--muted-k)}
.q .ft-bot nav{display:flex;gap:24px;flex-wrap:wrap}
.q .ft-word{max-width:1320px;margin:40px auto 0;font-size:clamp(120px,27cqi,380px);font-weight:700;line-height:.82;letter-spacing:-.05em;color:var(--ac);text-align:center;user-select:none;overflow:hidden;white-space:nowrap}
/* טאבלט */
@container (max-width:1023px){
.q{--sec:88px}
.q .hero-in{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:48px}
.q .tk{inset-inline-start:-16px}
.q .revs{grid-template-columns:1fr;gap:32px;margin-top:64px}
.q .rv:nth-child(n){margin-top:0}
.q .stats{grid-template-columns:1fr;gap:16px}
.q .st{flex-direction:row;align-items:baseline;gap:24px;padding:24px 32px 28px}
.q .idx{--pvw:320px;padding-inline-end:calc(var(--pvw) + 40px)}
.q .idx-b{grid-template-columns:40px minmax(0,1fr) 24px}
.q .how-in,.q .ord-in{grid-template-columns:1fr;gap:56px}
.q .how .pic,.q .ord .pic{aspect-ratio:4/3;max-width:560px;margin-top:0}
.q .plans{grid-template-columns:1fr;gap:32px;max-width:560px}
.q .ft-top{grid-template-columns:1fr 1fr}
}
/* טלפון */
@container (max-width:767px){
.q{--sec:72px;--shl:8px}
.q .hd-in{gap:12px}
.q .nav{display:none}
.q .hd-in .btn{margin-inline-start:auto}
.q .hero{padding:32px var(--gut) 48px}
.q .hero-in{grid-template-columns:1fr;gap:48px}
.q .hero-in .hero-tx{min-height:calc(100svh - 72px - 63px - 80px);justify-content:center}
.q .hero-img{aspect-ratio:4/3;max-height:none}
.q .tk{inset-inline-start:16px;bottom:-24px;width:min(240px,80%)}
.q .hero-vis{margin-bottom:24px}
.q .cta .btn{width:100%}
.q .band{display:block;min-height:0;padding:0 0 64px}
.q .band-img{position:relative;height:300px}
.q .band-w{padding:0 var(--gut)}
.q .band-card{margin-top:-56px;padding:32px 24px;max-width:none}
.q .specs{grid-template-columns:1fr 1fr 1fr;gap:8px}
.q .spec{padding:12px 12px 16px}
.q .spec .m{font-size:24px}
.q .sec-hd{margin-bottom:48px}
.q .st .n{font-size:56px}
.q .rv{padding:24px 24px 32px}
.q .rv blockquote{font-size:19px}
.q .idx{padding-inline-end:0;min-height:0}
.q .idx-b{grid-template-columns:32px minmax(0,1fr) 24px;gap:12px;padding:16px 16px}
.q .idx-it.is-on .idx-b .ico{transform:rotate(-90deg)}
.q .pv{position:static;width:auto}
.q .idx-it.is-on .pv{display:block;margin:16px 0 24px}
.q .pv-in{position:static;flex-direction:column;gap:24px}
.q .sheet-w{width:min(100%,360px);margin-inline:auto 10px}
.q .pv-meta{max-width:360px}
.q .stp{grid-template-columns:72px minmax(0,1fr);gap:16px}
.q .stp .no{height:72px;font-size:36px}
.q .how .pic,.q .ord .pic{aspect-ratio:1/1;margin-top:0}
.q .plan{padding:32px 24px}
.q .row{grid-template-columns:1fr}
.q .form-foot .btn{width:100%}
.q .ft{padding-top:64px}
.q .ft-top{grid-template-columns:1fr;gap:32px}
.q .ft-bot{margin-top:32px}
.q .ft-bot nav{gap:16px}
}
/* תנועה מכובה למי שביקש */
@media (prefers-reduced-motion:reduce){
.q .reveal.is-in,.q .oi,.q .hero-vis,.q .tk,.q .stamp,.q .idx-it.is-on .sheet{animation:none}
.q.js .reveal{opacity:1}
.q .btn,.q .plan,.q .lnk,.q .idx-b,.q .hd{transition:none}
.q .btn:hover,.q .card.plan:hover,.q .opt input:checked+span{transform:none}
}`;

const jobs = [
  { nm: "תפריט לבר קטן", sp: `<span class="m">A4</span> 60 עותקים`, a: "A4", c: "2 צבעים", q: "60 עותקים", t: "יום עבודה אחד", sheet: `<div class="sheet s1" aria-hidden="true"><span class="t" dir="ltr">N°07</span><b class="big">תפריט</b><div class="rows"><p><span>בירה מהחבית</span><span class="m">28</span></p><p><span>יין הבית</span><span class="m">34</span></p><p><span>צלחת גבינות</span><span class="m">52</span></p></div></div>` },
  { nm: "זין על תרבות הסלון", sp: `<span class="m">A5</span> 80 עותקים`, a: "A5, 16 עמודים", c: "2 צבעים", q: "80 עותקים", t: "3 ימי עבודה", sheet: `<div class="sheet s2" aria-hidden="true"><span class="t">גיליון <span class="m">03</span></span><b class="big">סלון</b><div class="band-b"><span class="m">16</span>זין על תרבות הסלון</div></div>` },
  { nm: "פוסטר לפסטיבל סרטים", sp: `<span class="m">A3</span> 100 עותקים`, a: "A3", c: "2 צבעים", q: "100 עותקים", t: "יומיים", sheet: `<div class="sheet s3" aria-hidden="true"><span class="t"><span class="m">12.11</span> עד <span class="m">16.11</span></span><span class="disc"></span><b class="big">קולנוע</b><span class="sm">פסטיבל הסרטים הקצרים</span></div>` },
  { nm: "כרזת מבצע לחנות תקליטים", sp: `<span class="m">A4</span> 40 עותקים`, a: "A4", c: "צבע אחד", q: "40 עותקים", t: "יום עבודה אחד", sheet: `<div class="sheet s4" aria-hidden="true"><b class="big">30%</b><span class="lab">תקליטים</span><span class="sm">מבצע סוף עונה</span></div>` },
  { nm: "כרטיסי ביקור לאדריכלית", sp: `<span class="m">9×5</span> 300 כרטיסים`, a: "9 על 5 ס״מ", c: "2 צבעים", q: "300 כרטיסים", t: "יומיים", sheet: `<div class="sheet s5" aria-hidden="true"><div class="cd c1"><b>דנה אלון</b><span>אדריכלית פנים</span></div><div class="cd c2"><b>דנה אלון</b><span class="m" dir="ltr">050-555-0138</span></div></div>` },
  { nm: "חוברת תערוכה לגלריה", sp: `<span class="m">A5</span> 150 עותקים`, a: "A5, 24 עמודים", c: "3 צבעים", q: "150 עותקים", t: "4 ימי עבודה", sheet: `<div class="sheet s6" aria-hidden="true"><div class="g"><span>01</span><span>02</span><span>03</span><span>04</span></div><b class="big">תערוכה</b></div>` },
];
const idxHtml = jobs.map((j, i) => `<li class="idx-it${i === 0 ? " is-on" : ""}">
<button class="idx-b" type="button" id="s07-b${i + 1}" aria-expanded="${i === 0}" aria-controls="s07-pv${i + 1}"><span class="ix">0${i + 1}</span><span class="tx"><span class="nm">${j.nm}</span><span class="sp">${j.sp}</span></span>${I.arrow}</button>
<div class="pv" id="s07-pv${i + 1}" role="region" aria-labelledby="s07-b${i + 1}"><div class="pv-in"><div class="sheet-w">${j.sheet}</div>
<dl class="pv-meta"><div><dt>גודל</dt><dd>${j.a}</dd></div><div><dt>צבעי דיו</dt><dd>${j.c}</dd></div><div><dt>כמות</dt><dd>${j.q}</dd></div><div><dt>זמן אספקה</dt><dd>${j.t}</dd></div></dl></div></div>
</li>`).join("\n");

const HTML = `<div class="cwrap sk-s07"><div class="q" id="s07-top">
<header class="hd"><div class="hd-in">
<a class="logo" href="#s07-top" aria-label="מכבש, לראש הדף">${I.mark}<span>מכבש</span></a>
<nav class="nav" aria-label="ראשי"><a href="#s07-work">עבודות</a><a href="#s07-how">איך זה עובד</a><a href="#s07-prices">מחירים</a></nav>
<a class="btn sm" href="#s07-order">כרטיס עבודה</a>
</div></header>
<main>
<section class="hero paper" aria-labelledby="s07-h1"><div class="hero-in">
<div class="hero-tx">
<p class="eyebrow oi"><span>מכבש, דפוס ריזו בתל אביב</span></p>
<h1 class="oi" id="s07-h1"><span>מדפיסים היום,</span><span class="mk">אוספים מחר</span></h1>
<p class="lead oi">פוסטרים, זינים ותפריטים בדיו אמיתי, מעשרה עותקים ומעלה. שולחים קובץ עד 17:00, ומחר אוספים מהסטודיו או מקבלים בשליח.</p>
<div class="cta oi"><a class="btn lg" href="#s07-order">פותחים כרטיס עבודה</a><a class="lnk" href="#s07-work">לראות עבודות${I.arrow}</a></div>
</div>
<div class="hero-vis">
<figure class="pic hero-img"><img src="${IMG}hero-posters.webp" width="1100" height="1375" alt="קיר מכוסה בשכבות של כרזות קרועות בשחור לבן, עם שאריות של כותרות וכתובות" fetchpriority="high" decoding="async"></figure>
<div class="tk"><p class="tk-h"><span>כרטיס עבודה</span><span class="m" dir="ltr">0417</span></p>
<dl><div><dt>הקובץ נשלח</dt><dd><span class="m" data-d0>15.10</span> <span class="m">16:42</span></dd></div><div><dt>מוכן לאיסוף</dt><dd><span class="m" data-d1>16.10</span> <span class="m">17:00</span></dd></div></dl>
<p class="micro">כרטיס לדוגמה</p></div>
</div>
</div></section>

<section class="band" aria-labelledby="s07-h2a">
<img class="band-img" src="${IMG}band-type.webp" width="2560" height="1000" alt="ערימת אותיות מתכת של דפוס, מצולמת מקרוב על רקע בהיר" loading="lazy" decoding="async">
<div class="band-w"><div class="band-card reveal">
<p class="eyebrow"><span>מה זה ריזו</span></p>
<h2 id="s07-h2a">דיו אמיתי, שכבה אחרי שכבה</h2>
<p class="body">כל צבע עובר בנפרד במכונה, והשכבות נופלות זו על זו בסטייה קטנה שרואים בעין. ככה נראים הזינים והפוסטרים שאנשים שומרים אצלם בבית.</p>
<div class="specs"><p class="spec"><span class="m" dir="ltr">A5-A3</span><span>גדלי נייר</span></p><p class="spec"><span class="m" dir="ltr">1-3</span><span>צבעי דיו</span></p><p class="spec"><span class="m" dir="ltr">10+</span><span>עותקים בהזמנה</span></p></div>
</div></div>
</section>

<section class="sec dk proof" id="s07-proof" aria-labelledby="s07-h2b"><div class="wrap">
<header class="sec-hd reveal"><p class="eyebrow"><span>לקוחות</span></p><h2 id="s07-h2b">מה אומרים אחרי שהנייר נאסף</h2></header>
<div class="stats">
<div class="st hi reveal"><b class="n" dir="ltr"><span data-count="312">312</span></b><span class="l">פרויקטים הודפסו השנה</span></div>
<div class="st reveal" style="--i:1"><b class="n" dir="ltr"><span data-count="24">24</span></b><span class="l">שעות מקובץ לנייר</span></div>
<div class="st reveal" style="--i:2"><b class="n" dir="ltr"><span data-count="10">10</span></b><span class="l">עותקים בהזמנה מינימלית</span></div>
</div>
<p class="micro stats-note">המספרים והביקורות בעמוד הם דוגמאות.</p>
<div class="revs">
<figure class="rv reveal"><p class="rv-t"><span>ביקורת לדוגמה</span><span class="m" dir="ltr">5/5</span></p><blockquote>שלחתי קובץ של תפריט בשבע בערב. בתשע בבוקר הוא חיכה לי ארוז, והכתום יצא בדיוק כמו שביקשתי.</blockquote><figcaption><b>נעמה ברק</b><span>בעלת בית קפה בפלורנטין</span></figcaption></figure>
<figure class="rv reveal" style="--i:1"><p class="rv-t"><span>ביקורת לדוגמה</span><span class="m" dir="ltr">5/5</span></p><blockquote>הדפסנו מאה פוסטרים בשני צבעים. השכבות זזות קצת זו מזו, ובגלל זה אנשים עצרו ברחוב לצלם אותם.</blockquote><figcaption><b>איתי שחר</b><span>מפיק פסטיבל סרטים</span></figcaption></figure>
<figure class="rv reveal" style="--i:2"><p class="rv-t"><span>ביקורת לדוגמה</span><span class="m" dir="ltr">4/5</span></p><blockquote>הקובץ שלי היה עם בעיית שוליים. בטלפון הסבירו מה לתקן, ובסוף היום קיבלתי הוכחת הדפס במייל.</blockquote><figcaption><b>ליאת גולן</b><span>מעצבת גרפית</span></figcaption></figure>
</div>
</div></section>

<section class="sec paper" id="s07-work" aria-labelledby="s07-h2c"><div class="wrap">
<header class="sec-hd reveal"><p class="eyebrow"><span>עבודות</span></p><h2 id="s07-h2c">אינדקס העבודות</h2><p class="lead">בוחרים שורה ורואים מה יצא מהמכונה: הגודל, הדיו, הכמות וכמה זמן זה לקח.</p></header>
<div class="idx reveal"><ol class="idx-list">
${idxHtml}
</ol></div>
<p class="micro idx-note">העבודות, הכמויות והשמות בעמוד הם דוגמאות.</p>
</div></section>

<section class="sec or how" id="s07-how" aria-labelledby="s07-h2d"><div class="how-in">
<div>
<header class="sec-hd reveal"><p class="eyebrow"><span>איך זה עובד</span></p><h2 id="s07-h2d">שלושה צעדים, בלי טפסים</h2></header>
<ol class="steps">
<li class="stp reveal"><span class="no" aria-hidden="true">1</span><div><h3>שולחים קובץ</h3><p>PDF או תמונה, עד 17:00. אנחנו בודקים אותו ומחזירים הערות באותו יום.</p></div></li>
<li class="stp reveal" style="--i:1"><span class="no" aria-hidden="true">2</span><div><h3>מכונה, דיו, ייבוש</h3><p>כל צבע עובר בנפרד. אחרי כל מעבר הנייר מתייבש, ורק אז מגיעה השכבה הבאה.</p></div></li>
<li class="stp reveal" style="--i:2"><span class="no" aria-hidden="true">3</span><div><h3>אוספים או שולחים</h3><p>הזמנה שאושרה עד 17:00 מוכנה מחר ב-17:00 בסטודיו, או בשליח בתוספת תשלום.</p></div></li>
</ol>
</div>
<figure class="pic reveal"><img src="${IMG}paper-stack.webp" width="1100" height="1100" alt="ידיים מיישרות ערימת נייר גדולה על שולחן של מכונת חיתוך" loading="lazy" decoding="async"></figure>
</div></section>

<section class="sec paper" id="s07-prices" aria-labelledby="s07-h2e"><div class="wrap">
<header class="sec-hd reveal"><p class="eyebrow"><span>מחירון</span></p><h2 id="s07-h2e">מחיר ברור לפני שמתחילים</h2></header>
<div class="plans">
<article class="plan card reveal"><p class="plan-t"><span>פוסטר</span><span class="m">A3</span></p><h3>פוסטר בשני צבעים</h3>
<p class="pr"><span class="cur">₪</span><span class="n" dir="ltr">6</span><span class="per">ליחידה, בהזמנה של 50 עותקים</span></p>
<ul><li>${I.check}<span>נייר 120 גרם</span></li><li>${I.check}<span>חיתוך כלול</span></li><li>${I.check}<span>הוכחת הדפס במייל</span></li></ul>
<a class="btn" href="#s07-order">להזמין פוסטר</a></article>
<article class="plan card hi reveal" style="--i:1"><p class="plan-t"><span>זין</span><span class="m">A5</span></p><h3>זין של 16 עמודים</h3>
<p class="pr"><span class="cur">₪</span><span class="n" dir="ltr">28</span><span class="per">ליחידה, בהזמנה של 30 עותקים</span></p>
<ul><li>${I.check}<span>הדפסה דו צדדית</span></li><li>${I.check}<span>הדבקה בסיכות</span></li><li>${I.check}<span>תיקון הגהה אחד</span></li></ul>
<a class="btn" href="#s07-order">להזמין זין</a></article>
<article class="plan card reveal" style="--i:2"><p class="plan-t"><span>תפריט</span><span class="m">A4</span></p><h3>תפריט צבע אחד</h3>
<p class="pr"><span class="cur">₪</span><span class="n" dir="ltr">4</span><span class="per">ליחידה, בהזמנה של 100 עותקים</span></p>
<ul><li>${I.check}<span>נייר 100 גרם</span></li><li>${I.check}<span>אפשר לשנות מחירים בין הדפסות</span></li><li>${I.check}<span>מוכן למחרת</span></li></ul>
<a class="btn" href="#s07-order">להזמין תפריט</a></article>
</div>
<p class="micro plans-note">המחירים לדוגמה, כולל מע״מ.</p>
</div></section>

<section class="sec paper2 ord" id="s07-order" aria-labelledby="s07-h2f"><div class="ord-in">
<div class="vpanel">
<header class="sec-hd reveal"><p class="eyebrow"><span>כרטיס עבודה</span></p><h2 id="s07-h2f">פותחים כרטיס, ומחר זה אצלכם</h2><p class="lead">משאירים שם וטלפון, ואנחנו חוזרים עם מחיר וזמן אספקה עוד היום.</p></header>
<form class="form reveal" novalidate>
<div class="row">
<div class="fld"><label for="s07-name">שם</label><input class="in" id="s07-name" name="name" autocomplete="name" required aria-describedby="s07-name-m"><span class="msg" id="s07-name-m">${I.alert}איך נקרא לכם?</span></div>
<div class="fld"><label for="s07-tel">טלפון</label><input class="in" id="s07-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" required aria-describedby="s07-tel-m"><span class="msg" id="s07-tel-m">${I.alert}המספר לא נראה תקין, אפשר לבדוק?</span></div>
</div>
<fieldset><legend class="legend">מה מדפיסים?</legend><div class="opts">
<label class="opt"><input type="radio" name="job" value="poster" checked><span>פוסטר</span></label>
<label class="opt"><input type="radio" name="job" value="zine"><span>זין</span></label>
<label class="opt"><input type="radio" name="job" value="menu"><span>תפריט</span></label>
<label class="opt"><input type="radio" name="job" value="other"><span>משהו אחר</span></label>
</div></fieldset>
<div class="form-foot"><button class="btn" type="submit">פותחים כרטיס</button><p class="micro">בלי רשימות תפוצה. הטלפון משמש רק לחזרה אליכם.</p></div>
</form>
<div class="ok" role="status" aria-live="polite"><span class="stamp">${I.check}<span>התקבל</span></span><h3>נפתח כרטיס עבודה</h3><p class="lead">נחזור אליכם עד סוף היום עם מחיר וזמן אספקה.</p></div>
</div>
<figure class="pic reveal"><img src="${IMG}ink-hands.webp" width="1000" height="1000" alt="ידיים מערבבות דיו עם מרית ליד פחיות דיו פתוחות בסטודיו הדפסה" loading="lazy" decoding="async"></figure>
</div></section>
</main>

<footer class="ft dk"><div class="ft-top">
<div class="ft-brand"><a class="logo" href="#s07-top" aria-label="מכבש, לראש הדף">${I.mark}<span>מכבש</span></a><p>דפוס ריזו בתל אביב. פוסטרים, זינים ותפריטים בדיו אמיתי, מעשרה עותקים.</p></div>
<div class="ft-col"><p class="ft-h">שעות</p><span>ראשון עד חמישי, 9:00 עד 18:00</span><span>שישי, 9:00 עד 13:00</span></div>
<div class="ft-col"><p class="ft-h">הסטודיו</p><address>הברזל 9, תל אביב</address><a href="tel:+97235550173" dir="ltr" style="unicode-bidi:isolate">03-555-0173</a></div>
<div class="ft-col"><p class="ft-h">באתר</p><a href="#s07-work">עבודות</a><a href="#s07-how">איך זה עובד</a><a href="#s07-prices">מחירים</a><a href="#s07-order">כרטיס עבודה</a></div>
</div>
<div class="ft-bot"><p>© <span data-year>2026</span> מכבש</p><nav aria-label="משפטי"><a href="privacy.html">מדיניות פרטיות</a><a href="accessibility.html">הצהרת נגישות</a></nav><p>עוצב ופותח על ידי <a href="https://liavmatzri.co.il" rel="noopener">ליאב מצרי</a></p></div>
<div class="ft-word" aria-hidden="true">מכבש</div>
</footer>
</div></div>`;

// ───────── JS ─────────
// כל כתיבה ל-DOM בגלילה רק כשהערך השתנה. ההדר נדבק מתחת לסרגל המאגר רק כשהוא דביק ומוצג (בפרויקט אין סרגל).
const JS = `(function(){var root=document.querySelector(".sk-s07");if(!root)return;var q=root.querySelector(".q");q.classList.add("js");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(s,r){return(r||q).querySelector(s)}function $$(s,r){return[].slice.call((r||q).querySelectorAll(s))}
$$("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
/* תאריכי הכרטיס: היום ומחר */
function dm(d){var a=d.getDate(),b=d.getMonth()+1;return(a<10?"0":"")+a+"."+(b<10?"0":"")+b}
var t0=new Date(),t1=new Date(t0.getTime()+864e5);
$$("[data-d0]").forEach(function(e){e.textContent=dm(t0)});$$("[data-d1]").forEach(function(e){e.textContent=dm(t1)});
/* הדר: headroom */
var hd=$(".hd"),top=document.querySelector(".vtop"),lastTop=-1,hidden=false,lastY=window.scrollY,acc=0;
function place(){if(!hd||!top)return;var s=getComputedStyle(top),v=s.position==="sticky"&&s.display!=="none"?top.offsetHeight:0;if(v!==lastTop){lastTop=v;hd.style.top=v+"px"}}
function setHidden(v){if(v===hidden)return;hidden=v;hd.classList.toggle("is-hidden",v)}
function onScroll(){place();var y=window.scrollY,d=y-lastY;lastY=y;if(y<=96){acc=0;setHidden(false);return}
acc=(d>0)===(acc>0)?acc+d:d;if(acc>6)setHidden(true);else if(acc<-6)setHidden(false)}
if(hd){window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",place);hd.addEventListener("focusin",function(){setHidden(false)});place()}
/* reveal פעם אחת */
var els=$$(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
/* ספירה במספרים: פעם אחת כשהבלוק נכנס */
var cnt=$$("[data-count]");
if(!rm&&"IntersectionObserver" in window){cnt.forEach(function(e){e.textContent="0"});
var co=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;var e=x.target,to=+e.getAttribute("data-count"),t=null;co.unobserve(e);
function f(ts){if(t===null)t=ts;var p=Math.min(1,(ts-t)/900),v=1-Math.pow(1-p,3);e.textContent=String(Math.round(to*v));if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.4});cnt.forEach(function(e){co.observe(e)})}
/* אינדקס העבודות: בחירה בלחיצה, בריחוף (עכבר) ובמקלדת. ההדפס מתחלף בגזירה מדורגת (steps) */
var items=$$(".idx-it"),btns=$$(".idx-b"),fine=window.matchMedia("(hover: hover) and (pointer: fine)").matches,cur=0;
function sel(i,scroll){if(i===cur)return;cur=i;items.forEach(function(it,j){var on=j===i;it.classList.toggle("is-on",on);btns[j].setAttribute("aria-expanded",String(on))});
if(scroll&&q.clientWidth<768)btns[i].scrollIntoView({block:"nearest",behavior:rm?"auto":"smooth"})}
btns.forEach(function(b,i){b.addEventListener("click",function(){sel(i,true)});
if(fine)b.addEventListener("mouseenter",function(){sel(i,false)});
b.addEventListener("keydown",function(e){var n=btns.length,d=e.key==="ArrowDown"?1:e.key==="ArrowUp"?-1:0;
if(d){e.preventDefault();btns[(i+d+n)%n].focus()}else if(e.key==="Home"){e.preventDefault();btns[0].focus()}else if(e.key==="End"){e.preventDefault();btns[n-1].focus()}})});
/* כרטיס העבודה */
var form=$(".form"),vp=$(".vpanel");
if(form)form.addEventListener("submit",function(e){e.preventDefault();var nm=form.elements.name,tl=form.elements.tel,bad=null;
function chk(f,ok){var w=f.closest(".fld");w.classList.toggle("err",!ok);f.setAttribute("aria-invalid",String(!ok));if(!ok&&!bad)bad=f}
chk(nm,nm.value.trim().length>1);chk(tl,tl.value.replace(/[^0-9]/g,"").length>=9);
if(bad){bad.focus();return}vp.classList.add("is-sent");var ok=$(".ok");if(ok){ok.setAttribute("tabindex","-1");ok.focus()}});
})();`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Brutalism", group: "אמירה וקיצון",
  when: "סטודיואים, דפוסים ועסקי יצירה, מגזינים ומו״לות, בתי קפה וברים עם אופי, אדריכלות פנים, תערוכות ופסטיבלים, מותגי רחוב ומוזיקה, ומי שהמוצר שלו הוא עמדה. כל עסק שרוצה שיזכרו אותו ולא ישכחו, כשהתוכן ישר וההזמנה פשוטה.",
  no: "פיננסים, ביטוח, בריאות ומשפט (שם הקצה נקרא כחוסר אחריות), עמותות רגישות, וכל קהל שמחפש ביטחון שקט. גם לא בלי צילום עם ניגודיות, ולא כשהלקוח לא מוכן שהעמוד ייראה גבוה בקול: בלי שליטה בסקאלה השפה נופלת לבלגן.",
  recipe: `פלטה: נייר #F2EFE6 (הרקע) · נייר-2 #E5E0D1 ובהובר נייר-3 #D6D0BD (אותה משפחה, בלי צל) · דיו #0B0B0B (הכל באותו שחור) · כתום ריזו #FF4B12 (שדות, כפתור ומספרים על דיו) ובהובר #E63D05
כתום לא משמש כצבע טקסט על נייר (2.9 נופל); על כתום תמיד דיו (5.87). טקסט מושתק #55524A על נייר 6.78, על נייר-2 5.91, על נייר-3 5.06; על דיו #BDB9AC 10.03
משטחים שטוחים: נייר (עם גרעין PNG של 160px), נייר-2, דיו, כתום; בלי גרדיאנט ובלי טשטוש. רדיוס אפס בכל מקום (התמונות, הכרטיסים, הפקדים) · היוצא מן הכלל היחיד הוא עיגול גיאומטרי בתוך הדפס הפוסטר
קצה: 3px דיו רק על פקדים (כפתור, שדה, בחירה); משטחי תוכן בלי מסגרת, והפרדה בצבע וברווח
צל: קשיח ומוסט בלי טשטוש, 6px על פקדים, 12px על כרטיסים ותמונות (8px בטלפון), בצבע הקצה של המשטח (דיו על נייר, נייר על דיו); בהובר הכפתור זז 2px אל המקור וצלו גדל ל-8, בלחיצה הוא נכנס לצל
Google Sans בלבד, שלושה משקלים: 700 כותרות ופעולות, 500 תוויות, 400 גוף · H1 clamp(44, 7.4cqi, 104)/.98/-.03em · H2 clamp(40, 5.2cqi, 72)/-.02em · H3 24 · ליד 20 · גוף 16 · ללא ריווח חיובי
מונוספייס של המערכת (ui-monospace, SFMono, Consolas) רק לספרות לטיניות ולמספרי אינדקס: מספרי שורה, מחירים, כרטיס העבודה
תנועה: reveal 16px/0.5s, סטאגר 70ms, פתיחה 0.6s, headroom 0.4s, כפתור 0.12 עד 0.18s · ease cubic-bezier(.2,.6,.2,1) · steps() רק בגזירת ההדפס ובחותם הטופס`,
  apply: "הדר נייר עם צל קשיח של 4px כלפי מטה (אותו צל, לא קו) ו-headroom. הירו בשני טורים: כותרת ענקית, מילת ההבטחה על שדה כתום עם צל דיו, ומימין צילום חד בשחור לבן עם כרטיס עבודה נייר שחוצה את קצהו. רצועת צילום מלאה עם כרטיס נייר גדול עליה. ההוכחה על שדה דיו: שלושה בלוקי מספרים ושלוש ביקורות שמוסטות זו מזו. החתימה היא אינדקס שורות: כל שורה בלוק שטוח, ובבחירה היא נהפכת לדיו והדפס שלם מתחלף בצד. שלושה צעדים על שדה כתום, מחירון בשלושה בלוקים עם צל, וכרטיס עבודה שקט על נייר כהה. הפוטר שדה דיו עם מילת המותג בכתום.",
  sig: "הצל הקשיח הוא גם אי-היישור של הדפסת ריזו: אותה הסטה של 1 עד 2 אחוז בכותרות שבתוך ההדפסים, בצל הכרטיסים ובכפתור · אינדקס העבודות: שורה היא בלוק שטוח, בחירה הופכת אותה לדיו, וההדפס שלידה נחשף בגזירה של חמישה צעדים (steps) כמו נייר שיוצא מהמכונה · ספרות מונו כמספרי מערכת (01, 0417, 16:42) · כפתור שנלחץ אל הצל שלו · הקצה העבה קיים רק על מה שנלחץ ונכתב · צילום שחור לבן עם נקודת שחור ונייר של הדף עצמו, ותצלום אחד בדוטון כתום.",
  avoid: "קריקטורה של ברוטליזם: פונט סריף ברירת מחדל, שחור על לבן בלי כתום אחד, ניאון על הכל, ניווט שבור בכוונה, טקסט קטן שאי אפשר לקרוא, בלגן בלי רשת · מסגרת שחורה סביב כל כרטיס, כי הקצה שמור לפקדים · צל רך או טשטוש · רדיוסים · הדרגות צבע · קווים דקים או גבולות אפורים · תמונות צבעוניות שלא תואמות לדוטון · מרכוז כל הבלוקים: הרשת צריכה להיראות ולהיות סימטרית רק איפה שהיא משרתת.",
  qa: ["כל הפינות חדות: רדיוס אפס בתמונות, בכרטיסים ובפקדים", "קצה 3px דיו רק על כפתור, שדה ובחירה; בלי מסגרת סביב כרטיסי תוכן", "צל קשיח בלי טשטוש, בצבע הקצה של המשטח (דיו על נייר, נייר על דיו)", "כתום לא כטקסט על נייר; על כתום תמיד דיו", "ספרות לטיניות בלבד במונוספייס של המערכת, בלי עברית בו", "שלושה משקלים בלבד, ריווח שלילי רק מ-40px", "גזירת steps רק בהחלפת ההדפס ובחותם הטופס; reveal ב-keyframes, כבוי ב-reduced-motion"],
  engine: "ניגודיות (נמדד 15.10.2026): דיו על נייר 17.12 · מושתק #55524A על נייר 6.78, על נייר-2 5.91, על נייר-3 5.06 · דיו על כתום 5.87 ועל כתום-הובר 4.72 · כתום על דיו 5.87 (מספרים ושורת פתיחה על דיו) · כתום על נייר 2.91 (אסור כטקסט, מותר כשדה בלבד) · מושתק-כהה #BDB9AC על דיו 10.03 · שגיאה #B3261E על לבן 6.54 ועל נייר 5.69. שדות 17px ומשטחי לחיצה 44 עד 52px. הפונט הוא Google Sans בלבד, והמונו הוא מחסנית המערכת לספרות לטיניות. אין תנועה רציפה בעמוד; reveal ופתיחה כבויים ב-reduced-motion וכל התוכן נראה בלי JS.",
  agent: "עצב בסגנון ברוטליזם: רקע נייר #F2EFE6 עם גרעין, דיו #0B0B0B ומבטא כתום #FF4B12 אחד שמשמש שדה, כפתור ומספר על דיו ולא טקסט על נייר. Google Sans בשלושה משקלים וכותרות ענקיות, מספרי מערכת בספרות לטיניות במונוספייס. משטחים שטוחים בלי גרדיאנט, רדיוס אפס, קצה 3px דיו רק על פקדים (כפתור, שדה, בחירה), צל קשיח מוסט בלי טשטוש על כרטיסים ותמונות, וצילום אמיתי בשחור לבן עם נקודת שחור ונייר של הדף. רגע חתימה אחד, מכני: רשימת פריטים שמחליפה הדפס בגזירה מדורגת. הכל נשאר קריא וניתן לשימוש: הטקסט גדול, ההזמנה פשוטה, והרשת גלויה.",
  mobile: "ההדר: הניווט נעלם וכפתור הכרטיס (44px) נשאר. ההירו: הטקסט ממורכז אנכית במסך הראשון, הכפתור הראשי ברוחב מלא, והצילום עם כרטיס העבודה מתחת. רצועת הצילום נערמת: תמונה, ומעליה כרטיס הנייר נכנס אליה ב-56px. שלושת המספרים בעמודה, והביקורות בלי הסטה. אינדקס העבודות נהפך לאקורדיון: השורה שנבחרה נפתחת עם ההדפס מתחתיה. המחירון בעמודה, והטופס בעמודה אחת עם בחירות של 48px.",
  fonts: [],
};

export default [
  {
    ...base,
    id: "s07", name: "ברוטליזם",
    desc: "גולמי בכוונה: שדות צבע שטוחים, קצוות חדים, כותרות ענקיות וצל קשיח אחד שמוסט בלי טשטוש. נייר, דיו וכתום, מספרי מערכת במונו וצילום שחור לבן. כאן כעמוד אמיתי של דפוס ריזו (דמיוני), לא שלד צבוע.",
    score: "27/30",
    note: "רף הסטודיו: 27/30. הכלי מדד 22 סעיפים וכולם עברו, כולל כל ה-★. מתוך חמשת סעיפי העין, שלושה נבדקו בצילומים בגודל אמיתי ועברו (12, 17, 30), סעיף 10 (יישור אופטי בזום 200%) לא נבדק, וסעיף 26 (מעבר סקשנים שאינו קו ישר) לא מתקיים בכוונה: בברוטליזם המעברים בין שדות הצבע חדים וישרים. מתח H1/גוף 95/16 = 5.9 (Google Sans) · שלושה משקלים: 700, 500, 400 · מונו מערכת רק לספרות לטיניות · קצה עבה של 3px בצבע דיו רק על פקדים (כפתור, שדה, צ'יפ), כל השאר שדות צבע שטוחים וצל קשיח של 6 ו-12 פיקסלים בלי טשטוש · רדיוס 0 בכל התמונות · תמונות מצולמות שחור-לבן ומומרות לדו-גוון דיו-נייר (וגרסה אחת בכתום) ב-Pillow, בלי mix-blend-mode · גרעין נייר כאריח PNG עם שקיפות נמוכה · רגע חתימה: אינדקס עבודות שנהפך לדיו בבחירה, והדפס CSS שנחשף ב-clip-path עם steps(5) תוך 0.4 שניות; חותמת בטופס עם steps(4) · reveal אחד של 0.5 שניות · כל התוכן נראה בלי JS ובתנועה מופחתת · נבדק בלי גלישה אופקית ב-360, 414, 768 ו-1024, ובלי יעד מגע מתחת ל-44 פיקסלים · בדיקת מקלדת וטופס (שגיאה והצלחה) עברה. תמונות (Freepik בחינם, 0 קרדיטים; יתרה 147723 לפני ואחרי): 1034491 כרזות קרועות (hero-posters.webp 1100x1375), 27506276 אותיות דפוס מתכתיות (band-type.webp 2560x1000), 13781451 ידיים על ערימת נייר (paper-stack.webp 1100x1100), 1281820 ידיים עם צבע דפוס (ink-hands.webp 1000x1000, דו-גוון כתום). סך התמונות כ-480KB, והגרעין 17KB. בתמונה 1170601 הורדה ולא נעשה בה שימוש. כל המספרים, הביקורות והמחירים בעמוד הם דוגמאות ומסומנים ככאלה.",
    css: CSS, html: HTML, js: JS,
  },
];
