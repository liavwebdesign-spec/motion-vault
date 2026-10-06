// S9 · Soft Modern, עמוד ייחוס אמיתי (6.10.2026). נבנה מחדש מאפס, במקום הדמו הגנרי שנבנה על sk().
//
// העסק: "נחת", מרפאת ילדים ומשפחה בדויה ברמת גן. נבחרה כי Soft Modern חיה על אוויר, על שכבות עומק ועל צילום חם של בני אדם,
// והיא השפה הרכה והאקספרסיבית של המאגר, ולכן שונה מ-s05 (עריכתי, שקט, כחול, מסגרת דפדפן) בכל ציר: רקע לבנדר ולא לבן,
// accent חם (טרקוטה) ולא כחול, פינות 20 עד 28 ולא 12 עד 16, כפתור גלולה עם באדג' חץ, כרטיסים בשלושה עומקים, וצילום אמיתי.
// העור הוא skins/soft-modern.md כפי שהוא. מה שנלקח מנלי (הפרויקט האמיתי היחיד בשפה): הדר גלולה צפה עם headroom, כפתור גלולה
// עם באדג', שלושה עומקי משטח, אינדקס 001, מסגרת נוזלית. מה שלא נלקח: פלטת הקפה והפונט Polin (אלה של המותג שלה).
// הפונט: Google Sans מקומי (פקטור 0.95, λ 1.05), 700 לכותרות ומספרים וכפתורים, 500 לתוויות, 400 לגוף.
//
// רגע החתימה: "ככה נראה ביקור אצלנו". התמונה נדבקת בגלילה, והכרטיס שבמרכז המסך נדלק בגרדיאנט accent בזמן שהצילום והפתק מתחלפים.
// בסיס התנועה: פתיחת עמוד אחת (הדר, תוכן, ויז'ואל), reveal ב-keyframes לכל בלוק, משפחת hover אחת (כרטיס מתרומם, באדג' זז 4px).

const EASE = "cubic-bezier(.2,.6,.2,1)";
const IMG = "../assets/media/real/s09/";

// ───────── אייקונים: משפחה אחת, stroke 1.7, 20px (24 רק במיכלי הירו, לא בשימוש כאן) ─────────
const ic = (d) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const I = {
  arrow: ic(`<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`),
  check: ic(`<circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>`),
  cal: ic(`<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>`),
  clock: ic(`<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`),
  heart: ic(`<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`),
  video: ic(`<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>`),
  phone: ic(`<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/>`),
  file: ic(`<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>`),
  home: ic(`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>`),
  chat: ic(`<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>`),
  alert: ic(`<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>`),
};

// ───────── CSS: טוקנים, מנוע, רכיבים, סקשנים ─────────
const CSS = `@font-face{font-family:"MV Google Sans";src:url("../assets/fonts/google-sans.woff2") format("woff2");font-weight:400 700;font-display:swap}
.cwrap{container-type:inline-size}
.q{--bg:#EEF0F6;--surface:#fff;--surface-2:#F4F5F9;--surface-2-hv:#E7E9F2;
 --ink:#131A2B;--ink-2:#1C2540;--ink-hv:#26304D;--muted:#5A6274;--muted-on-ink:#B6BDD0;--ph:#656D80;
 --accent:#C63C18;--accent-2:#AD3212;--accent-hi:#E0562A;--accent-soft:color-mix(in srgb,var(--accent) 11%,#fff);
 --grad:linear-gradient(135deg,#A82F0E 0%,#BC3815 52%,#C84018 100%);--err:#B42318;
 --r-page:28px;--r-card:20px;--r-inner:14px;--r-chip:12px;--r-pill:999px;
 --sh-card:0 2px 8px rgba(19,26,43,.04),0 12px 32px rgba(19,26,43,.06);
 --sh-lift:0 4px 12px rgba(19,26,43,.06),0 24px 48px rgba(19,26,43,.10);
 --ease:${EASE};
 --gut:clamp(20px,3.75cqi,96px);--sm:clamp(12px,1.25cqi,24px);
 --sec:clamp(64px,7.5cqi,160px);--sec-loose:clamp(88px,8.75cqi,192px);
 --pad:clamp(24px,2.5cqi,48px);--gap:clamp(16px,1.875cqi,32px);--gap-l:clamp(32px,5cqi,96px);--head-gap:clamp(40px,4.375cqi,88px);--ov:clamp(40px,5cqi,112px);
 --fs-h1:clamp(36px,min(4.4cqi,7.8svh),104px);--fs-h2:clamp(28px,2.9cqi,72px);--fs-xl:clamp(34px,4.4cqi,96px);--fs-h3:clamp(20px,1.7cqi,34px);
 --fs-lead:clamp(18px,.9cqi + 8px,28px);--fs-body:clamp(16px,.35cqi + 12px,21px);--fs-ui:clamp(15px,.2cqi + 12.5px,18px);
 --fs-num:clamp(48px,4.4cqi,112px);--fs-price:clamp(44px,3.75cqi,88px);
 background:var(--bg);color:var(--ink);font-family:"MV Google Sans",system-ui,sans-serif;font-size:var(--fs-body);font-weight:400;line-height:1.65;
 overflow:clip;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q p,.q ul,.q ol{margin:0}
.q ul,.q ol{list-style:none;padding:0}
.q a{color:inherit;text-decoration:none}
.q img{display:block;max-width:100%}
.q :focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.q h1,.q h2,.q h3{text-wrap:balance;font-weight:700}
.q p{text-wrap:pretty}
.q section[id]{scroll-margin-top:calc(var(--vt,0px) + 88px)}
.q h1{font-size:var(--fs-h1);line-height:1.1;letter-spacing:-.015em}
.q h1 em{font-style:normal;color:var(--accent)}
.q h2{font-size:var(--fs-h2);line-height:1.15}
.q h3{font-size:var(--fs-h3);line-height:1.25}
.q .lead{font-size:var(--fs-lead);line-height:1.55;color:var(--muted);max-width:62ch}
.q .body{color:var(--muted);max-width:62ch}
.q .skip{position:absolute;inset-inline-start:16px;top:-80px;z-index:60;display:inline-flex;align-items:center;min-height:44px;padding:0 20px;border-radius:var(--r-pill);background:var(--ink);color:#fff;font-weight:500}
.q .skip:focus{top:16px}
.q .ico{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block}
/* eyebrow: אחד לכל העמוד */
.q .eyebrow{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 16px;border-radius:var(--r-pill);background:#fff;font-size:var(--fs-ui);font-weight:500;line-height:1;color:var(--ink)}
.q .eyebrow i{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none}
.q :is(.slab,.conv-card) .eyebrow{background:var(--surface-2)}
/* כפתורים: שלוש רמות, ארבעה מצבים. הבאדג' העגול בקצה החץ הוא החתימה */
.q .btn{display:inline-flex;align-items:center;gap:16px;min-height:56px;padding:8px;padding-inline-start:28px;border:0;border-radius:var(--r-pill);background:var(--accent);color:#fff;font:inherit;font-size:var(--fs-ui);font-weight:700;line-height:1;white-space:nowrap;cursor:pointer;
 transition:background-color .18s var(--ease),box-shadow .18s var(--ease),transform .12s var(--ease)}
.q .btn .bd{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#fff;color:var(--accent);flex:none;transition:transform .3s var(--ease),background-color .18s var(--ease),color .18s var(--ease)}
.q .btn:active{transform:scale(.98)}
.q .btn:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.q .btn.sm{min-height:48px;gap:12px;padding-inline-start:20px}
.q .btn.sm .bd{width:32px;height:32px}
.q .btn.b2{background:#fff;color:var(--ink);box-shadow:var(--sh-card)}
.q .btn.b2 .bd{background:var(--surface-2);color:var(--ink)}
.q .on-w .btn.b2{background:var(--surface-2);box-shadow:none}
.q .on-w .btn.b2 .bd{background:#fff}
.q .btn.bw{background:#fff;color:var(--ink)}
.q .btn.bw .bd{background:var(--accent);color:#fff}
.q :is(.on-dark,.card.dk) :focus-visible{outline-color:#fff}
.q .lnk{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-size:var(--fs-body);font-weight:500;color:var(--ink);transition:color .15s var(--ease)}
.q .lnk .ico{color:var(--accent);transition:transform .3s var(--ease)}
.q :is(.on-dark,.card.dk) .lnk{color:#fff}.q :is(.on-dark,.card.dk) .lnk .ico{color:#FFB59A}
@media (hover:hover) and (pointer:fine){
 .q .btn:hover{background:var(--accent-2)}
 .q .btn:hover .bd{transform:translateX(-4px)}
 .q .btn.b2:hover{background:#fff;box-shadow:var(--sh-lift)}
 .q .btn.b2:hover .bd{background:var(--accent);color:#fff}
 .q .on-w .btn.b2:hover{background:var(--surface-2-hv);box-shadow:none}
 .q .btn.bw:hover{background:var(--surface-2-hv)}
 .q .lnk:hover{color:var(--accent)}
 .q .lnk:hover .ico{transform:translateX(-4px)}
 .q :is(.on-dark,.card.dk) .lnk:hover{color:var(--muted-on-ink)}
}
/* שדות: חמישה מצבים (רגיל, focus, מלא, שגיאה, מושבת) */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label{font-size:var(--fs-ui);font-weight:500;line-height:1.2}
.q .in{display:block;width:100%;height:56px;padding:0 24px;border:0;border-radius:var(--r-pill);background:var(--surface-2);color:var(--ink);font:inherit;font-size:var(--fs-body);appearance:none;
 transition:background-color .15s var(--ease),box-shadow .15s var(--ease)}
.q .in::placeholder{color:var(--ph);opacity:1}
.q .in:focus,.q .in:focus-visible{outline:0;background:#fff;box-shadow:0 0 0 2px var(--accent),0 0 0 6px color-mix(in srgb,var(--accent) 22%,transparent)}
.q .fld.err .in{box-shadow:0 0 0 2px var(--err)}
.q .fld .msg{display:none;align-items:center;gap:8px;font-size:var(--fs-ui);line-height:1.2;color:var(--err)}
.q .fld.err .msg{display:inline-flex}
.q .in:disabled{opacity:.55}
/* כרטיס: שלושה עומקים. אפרפר (משטח), לבן מורם (צל), כהה (גיבור). hover: לבן מקבל צל, מגוון מקבל גוון כהה יותר, בלי צל */
.q .card{position:relative;border-radius:var(--r-card);padding:var(--pad);background:var(--surface-2);transition:transform .4s var(--ease),background-color .3s var(--ease),box-shadow .3s var(--ease)}
.q .card.w{background:#fff;box-shadow:var(--sh-card)}
.q .card.dk{background:var(--ink);color:#fff}
@media (hover:hover) and (pointer:fine){
 .q .card:not(.nh):hover{transform:translateY(-4px);background:var(--surface-2-hv)}
 .q .card.w:not(.nh):hover{background:#fff;box-shadow:var(--sh-lift)}
 .q .card.dk:not(.nh):hover{background:var(--ink-2)}
}
.q .ic{display:grid;place-items:center;width:44px;height:44px;border-radius:var(--r-chip);background:#fff;color:var(--accent);flex:none}
.q .card.w .ic{background:var(--accent-soft)}
.q .card.dk .ic{background:rgba(255,255,255,.1);color:#fff}
.q .idx{font-size:var(--fs-ui);font-weight:500;line-height:1;color:var(--muted);font-variant-numeric:tabular-nums}
.q .card.dk .idx{color:var(--muted-on-ink)}
.q .st-top{display:flex;align-items:center;justify-content:space-between}
.q .chip{display:inline-flex;align-items:center;gap:8px;height:32px;padding:0 14px;border-radius:var(--r-pill);background:#fff;font-size:var(--fs-ui);font-weight:500;line-height:1;color:var(--ink)}
.q .chip.acc{background:var(--accent-soft);color:var(--accent-2)}
/* reveal: keyframes ולא transition. נראה בלי JS (scripting:none) */
.q .reveal{opacity:0}
.q .reveal.is-in{animation:qrev .5s ${EASE} both;animation-delay:calc(var(--i,0) * 70ms)}
@keyframes qrev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
@media (scripting:none){.q .reveal{opacity:1}}
/* פתיחת עמוד: הדר יורד ראשון, אחריו התוכן, אחרון הוויז'ואל שעולה מ-48. CSS בלבד, פעם אחת */
.q .o{animation:qopen .9s ${EASE} var(--d,0s) both}
.q .o-h{animation:qdrop .7s ${EASE} both}
.q .o-v{animation:qup 1.2s ${EASE} .45s both}
@keyframes qopen{from{opacity:0;translate:0 24px}to{opacity:1;translate:0 0}}
@keyframes qdrop{from{opacity:0;translate:0 -18px}to{opacity:1;translate:0 0}}
@keyframes qup{from{opacity:0;translate:0 48px}to{opacity:1;translate:0 0}}
/* הדר: גלולה צפה, headroom. נדבק מתחת לסרגל המאגר (var(--vt)); בפרויקט --vt הוא 0 */
.q .hd{position:sticky;top:calc(var(--vt,0px) + 16px);z-index:30;margin:16px auto 0;width:calc(100% - 2 * var(--gut));height:64px;display:flex;align-items:center;gap:16px;padding-inline:28px 8px;border-radius:var(--r-pill);background:#fff;box-shadow:var(--sh-card);
 transition:transform .4s var(--ease),box-shadow .18s var(--ease)}
.q .hd.is-scrolled{box-shadow:var(--sh-lift)}
.q .hd.is-hidden{transform:translateY(calc(-100% - 160px))}
.q .logo{display:inline-flex;align-items:center;gap:12px;min-height:44px;font-size:24px;font-weight:700;line-height:1}
.q .mk{position:relative;width:32px;height:32px;flex:none}
.q .mk i{position:absolute;border-radius:50%}
.q .mk i:first-child{inset-block-start:0;inset-inline-start:0;width:22px;height:22px;background:var(--ink)}
.q .on-dark .mk i:first-child{background:#fff}
.q .mk i:last-child{inset-block-end:0;inset-inline-end:0;width:16px;height:16px;background:linear-gradient(135deg,var(--accent),var(--accent-hi))}
.q .hd nav{display:flex;gap:4px;margin-inline:auto}
.q .hd nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:var(--r-pill);font-size:var(--fs-ui);font-weight:500;color:var(--muted);transition:color .15s var(--ease),background-color .18s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .hd nav a:hover{color:var(--ink);background:var(--surface-2)}}
/* הירו */
.q .hero{padding:24px var(--gut) 0;background:radial-gradient(64cqi 44cqi at 78% 16%,rgba(255,255,255,.72),rgba(255,255,255,0) 72%)}
.q .hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--gap-l);align-items:center}
.q .hero-copy{display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.q .hero-copy .lead{max-width:34em}
.q .ctas{display:flex;flex-wrap:wrap;align-items:center;gap:8px 24px;margin-top:8px}
.q .trust{display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:8px}
.q .trust li{display:inline-flex;align-items:center;gap:8px;font-size:var(--fs-ui);font-weight:500;color:var(--muted)}
.q .trust .ico{color:var(--accent)}
.q .hero-visual{position:relative;margin-bottom:calc(var(--ov) * -1);border-radius:var(--r-page)}
.q .hv-photo{height:clamp(420px,68svh,720px);border-radius:inherit;overflow:hidden;background:var(--surface-2)}
.q .hv-photo img{width:100%;height:100%;object-fit:cover;object-position:34% 50%;border-radius:inherit}
.q .fc{position:absolute;z-index:2}
.q .fc-a{display:flex;align-items:center;gap:16px;inset-block-start:56px;inset-inline-start:-40px;padding:16px;width:min(320px,76%)}
.q .fc-a .tx{display:flex;flex-direction:column;gap:4px;flex:1;min-width:0}
.q .fc-a small{font-size:var(--fs-ui);line-height:1.2;color:var(--muted)}
.q .fc-a b{font-size:36px;line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .fc-a .sub{font-size:var(--fs-ui);line-height:1.2;font-weight:500}
.q .fc-a .bd{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:var(--surface-2);color:var(--ink);flex:none;transition:transform .3s var(--ease),background-color .18s var(--ease),color .18s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .fc-a:hover .bd{transform:translateX(-4px);background:var(--accent);color:#fff}}
.q .fc-b{inset-block-end:48px;inset-inline-end:-24px;display:flex;flex-direction:column;gap:8px;padding:20px 24px;width:min(236px,60%)}
.q .fc-b b{display:flex;align-items:baseline;gap:8px;font-size:var(--fs-num);line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .fc-b b small{font-size:20px;font-weight:500;letter-spacing:0;color:var(--muted-on-ink)}
.q .fc-b>span{font-size:var(--fs-ui);line-height:1.4;color:var(--muted-on-ink)}
/* ראש סקשן ממורכז (Soft Modern) */
.q .head{display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center;max-width:46em;margin:0 auto var(--head-gap)}
.q .head .lead{margin-inline:auto}
/* הוכחה: בנטו בשלושה עומקים */
.q .proof{padding:calc(var(--sec) + var(--ov)) var(--gut) var(--sec)}
.q .bento{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--gap)}
.q .stat{grid-column:span 4;display:flex;flex-direction:column;gap:12px;min-height:clamp(220px,18cqi,340px)}
.q .stat .num{display:flex;align-items:baseline;gap:8px;margin-top:auto;font-size:var(--fs-num);line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .stat .lbl{display:flex;align-items:center;gap:8px;color:var(--muted)}
.q .stat .lbl i{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none}
.q .video{grid-column:span 5;display:flex;flex-direction:column;gap:16px;overflow:hidden;min-height:clamp(300px,24cqi,440px)}
.q .video>*{position:relative;z-index:1}
.q .video h3{margin-top:auto;font-size:var(--fs-h2);line-height:1.15;max-width:12em}
.q .video p{color:var(--muted-on-ink);max-width:34em}
.q .video .lnk{align-self:flex-start;margin-top:8px}
.q .orb{position:absolute!important;z-index:0!important;inset-block-start:-128px;inset-inline-end:-128px;width:320px;height:320px;border-radius:50%;background:var(--ink-2);pointer-events:none}
.q .checks{grid-column:span 7;display:flex;flex-direction:column;gap:24px}
.q .checks .st-top{align-items:flex-start}
.q .checks .cl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 32px;margin-top:auto}
.q .cl li{display:flex;align-items:flex-start;gap:12px;line-height:1.45}
.q .checks .head3{display:flex;flex-direction:column;gap:8px}
.q .cl .ico{color:var(--accent);margin-top:2px}
/* החתימה: ביקור שנדלק שלב אחרי שלב. לוח לבן גדול על הלבנדר, תמונה נדבקת, כרטיס מרכזי בגרדיאנט */
.q .slab{background:#fff;border-radius:var(--r-page);margin-inline:var(--sm);padding:var(--sec) calc(var(--gut) - var(--sm))}
.q .sig-head{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--gap-l);margin-bottom:var(--head-gap)}
.q .sig-head .txt{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.q .sig-count{position:relative;display:grid;font-size:var(--fs-num);line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--accent)}
.q .sig-count span{grid-area:1/1;opacity:0;transition:opacity .3s var(--ease)}
.q .sig-count span.is-on{opacity:1}
.q .sig-count small{font-size:20px;font-weight:500;letter-spacing:0;color:var(--muted)}
.q .steps{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:var(--gap-l);align-items:start}
.q .steps-visual{position:sticky;top:calc(var(--vt,0px) + 96px);aspect-ratio:1/1.06;max-height:calc(100svh - var(--vt,0px) - 120px);border-radius:var(--r-page)}
.q .sv-stack{position:absolute;inset:0;border-radius:inherit;overflow:hidden;background:var(--surface-2)}
.q .sv-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;opacity:0;transform:scale(1.04);transition:opacity .6s var(--ease),transform 1.2s var(--ease)}
.q .sv-img.is-on{opacity:1;transform:none}
.q .sv-note{position:absolute;z-index:2;inset-block-end:32px;inset-inline-end:-32px;display:grid;background:#fff;border-radius:var(--r-card);box-shadow:var(--sh-lift)}
.q .sv-n{grid-area:1/1;display:flex;align-items:center;gap:16px;padding:14px 24px 14px 14px;opacity:0;translate:0 8px;transition:opacity .3s var(--ease),translate .4s var(--ease)}
.q .sv-n.is-on{opacity:1;translate:0 0}
.q .sv-n .ic{background:var(--accent-soft)}
.q .sv-n .tx{display:flex;flex-direction:column;gap:4px}
.q .sv-n small{font-size:var(--fs-ui);line-height:1.2;color:var(--muted)}
.q .sv-n b{font-size:var(--fs-lead);line-height:1.2;font-weight:700;white-space:nowrap}
.q .steps-list{display:flex;flex-direction:column;gap:var(--gap)}
.q .step{isolation:isolate;display:flex;flex-direction:column;gap:12px;min-height:clamp(224px,30svh,320px);transition:transform .4s var(--ease),background-color .3s var(--ease),color .4s var(--ease)}
.q .step::before{content:"";position:absolute;inset:0;z-index:-1;border-radius:inherit;background:var(--grad);opacity:0;transition:opacity .4s var(--ease)}
.q .step .st-top{margin-bottom:auto}
.q .step h3{margin-top:16px}
.q .step p{color:var(--muted);max-width:32em;transition:color .4s var(--ease)}
.q .step .ic,.q .step .idx{transition:background-color .4s var(--ease),color .4s var(--ease)}
.q .step.is-on{color:#fff}
.q .step.is-on::before{opacity:1}
.q .step.is-on p{color:#FFF0EA}
.q .step.is-on .ic{background:rgba(255,255,255,.16);color:#fff}
.q .step.is-on .idx{color:#FFE4DA}
.q .step-ph{display:none}
/* מסלולים */
.q .offer{padding:var(--sec) var(--gut) 0}
.q .plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--gap)}
.q .plan{display:flex;flex-direction:column;gap:24px}
.q .plan .top{display:flex;flex-direction:column;align-items:flex-start;gap:16px;min-height:clamp(96px,8cqi,144px)}
.q .price{display:flex;align-items:baseline;gap:12px}
.q .price b{font-size:var(--fs-price);line-height:1;font-weight:700;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.q .price b .cur{font-size:.5em;margin-inline-end:4px;font-weight:700;letter-spacing:0}
.q .price small{font-size:var(--fs-body);color:var(--muted)}
.q .plan.dk .price small,.q .plan.dk li{color:var(--muted-on-ink)}
.q .plan ul{display:flex;flex-direction:column;gap:12px}
.q .plan li{display:flex;align-items:flex-start;gap:12px;line-height:1.45;color:var(--muted)}
.q .plan li .ico{color:var(--accent);margin-top:2px}
.q .plan.dk li .ico{color:#FFB59A}
.q .plan .btn{align-self:flex-start;margin-top:auto}
.q .plan.dk .chip.acc{background:rgba(255,255,255,.12);color:#fff}
.q .inc{margin-top:var(--gap);display:flex;flex-wrap:wrap;align-items:center;gap:16px 24px}
.q .inc>span{font-weight:700}
.q .inc ul{display:flex;flex-wrap:wrap;gap:8px}
.q .inc .micro{margin-inline-start:auto;font-size:var(--fs-ui);color:var(--muted)}
/* המרה שקטה: כרטיס לבן אחד, בלי צילום, בלי רעש */
.q .conv{padding:var(--sec-loose) var(--gut) var(--sec)}
.q .conv-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--gap-l);padding:clamp(32px,5cqi,72px);border-radius:var(--r-page);background:#fff;box-shadow:var(--sh-card)}
.q .cv-copy{display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.q .cv-copy h2{max-width:12em}
.q .cv-links{display:flex;flex-direction:column;align-items:flex-start;margin-top:8px}
.q .cv-links .lnk{font-weight:700}
.q .form{display:flex;flex-direction:column;gap:20px;align-self:center}
.q .form .btn{align-self:flex-start;margin-top:4px}
.q .form .micro{font-size:var(--fs-ui);color:var(--muted)}
.q .done{display:flex;flex-direction:column;align-items:flex-start;gap:16px;align-self:center}
.q .done[hidden]{display:none}
.q .done .ic{width:56px;height:56px;border-radius:50%;background:var(--accent-soft)}
.q .done p{color:var(--muted)}
/* פוטר: סוגר ענק על לוח כהה (ft1) */
.q .ft{margin:0 var(--sm) var(--sm);padding:var(--sec) calc(var(--gut) - var(--sm)) 32px;border-radius:var(--r-page);background:var(--ink);color:#fff}
.q .ft-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:var(--gap-l);margin-bottom:calc(var(--sec) * .75)}
.q .ft-top h2{font-size:var(--fs-xl);line-height:1.08;letter-spacing:-.015em;max-width:10em}
.q .ft-top p{margin-top:16px;color:var(--muted-on-ink)}
.q .ft-act{display:flex;flex-wrap:wrap;align-items:center;gap:16px 32px}
.q .ft-tel{display:inline-flex;align-items:center;min-height:44px;font-size:var(--fs-h3);font-weight:700;direction:ltr;unicode-bidi:isolate;transition:color .15s var(--ease)}
.q .ft-cols{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr));gap:var(--gap-l);margin-bottom:calc(var(--sec) * .75)}
.q .ft-brand{display:flex;flex-direction:column;align-items:flex-start;gap:16px}
.q .ft-brand p{color:var(--muted-on-ink);max-width:24em}
.q .ft-col{display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.q .ft-col h3{font-size:var(--fs-ui);font-weight:500;line-height:1.2;color:#fff;margin-bottom:8px}
.q .ft-col a,.q .ft-col span{display:inline-flex;align-items:center;min-height:32px;font-size:var(--fs-ui);color:var(--muted-on-ink);transition:color .15s var(--ease)}
.q .ft-legal{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 32px;font-size:var(--fs-ui);color:var(--muted-on-ink)}
.q .ft-legal nav{display:flex;flex-wrap:wrap;gap:4px 24px}
.q .ft-legal a{display:inline-flex;align-items:center;min-height:44px;transition:color .15s var(--ease)}
@media (hover:hover) and (pointer:fine){.q .ft a:hover{color:#fff}.q .ft-tel:hover{color:var(--muted-on-ink)}}
/* קריסה */
@container (max-width:1023px){
 .q .fc-a{width:min(260px,74%)}
 .q .stat{grid-column:span 4}.q .video,.q .checks{grid-column:span 12}
 .q .ft-cols{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@container (max-width:899px){
 .q .hero-grid,.q .steps,.q .conv-card{grid-template-columns:minmax(0,1fr)}
 .q .hero-grid{gap:var(--gap)}
 .q .hero-copy .lead{max-width:none}
 .q .hd nav{display:none}
 .q .hv-photo{height:auto;aspect-ratio:1/.92}
 .q .fc-a{inset-inline-start:12px;inset-block-start:12px}
 .q .fc-b{inset-inline-end:12px;inset-block-end:-24px}
 .q .steps-visual{display:none}
 .q .sig-count{display:none}
 .q .step-ph{display:block;border-radius:var(--r-inner);overflow:hidden;margin-bottom:8px;aspect-ratio:16/10;background:var(--surface-2)}
 .q .step-ph img{width:100%;height:100%;object-fit:cover;border-radius:inherit}
 .q .step{min-height:0}
 .q .step .st-top{margin-bottom:0}
 .q .plans{grid-template-columns:minmax(0,1fr)}
 .q .plan.dk{order:-1}
 .q .plan .top{min-height:0}
 .q .form{align-self:stretch}
}
@container (max-width:767px){
 .q .hd{padding-inline:20px 8px}
 .q .step-ph{aspect-ratio:4/3}
 .q .stat{grid-column:span 12;min-height:0;flex-direction:row;flex-wrap:wrap;align-items:center}
 .q .stat .st-top{width:100%}
 .q .stat .num{margin-top:0}
 .q .checks .cl{grid-template-columns:minmax(0,1fr)}
 .q .ctas{flex-direction:column;align-items:stretch;gap:0;width:100%}
 .q .ctas .btn{justify-content:space-between}
 .q .ctas .lnk{justify-content:center}
 .q .hero-copy{gap:20px}
 .q .fc-a{width:calc(100% - 88px)}
 .q .fc-b{padding:16px 20px;width:auto}
 .q .hero-visual{margin-bottom:calc(var(--ov) * -1 + 8px)}
 .q .sig-head{flex-direction:column;align-items:flex-start}
 .q .inc .micro{margin-inline-start:0}
 .q .form .btn,.q .plan .btn{align-self:stretch;justify-content:space-between}
 .q .ft-cols{grid-template-columns:minmax(0,1fr)}
 .q .ft-col a{min-height:44px}
 .q .ft-legal{flex-direction:column;align-items:flex-start}
 .q .conv-card{padding:28px 24px}
}
@media (pointer:coarse){.q .ft-col a{min-height:44px}}
@media (prefers-reduced-motion:reduce){
 .q *,.q *::before,.q *::after{animation:none!important;transition:none!important}
 .q .reveal,.q .o,.q .o-h,.q .o-v{opacity:1;translate:none}
 .q .sv-img,.q .sv-n{transform:none;translate:none}
}`;

const li = (t) => `<li>${I.check}<span>${t}</span></li>`;
const IMGDIM = 'width="1500" height="1200"';

const HTML = `<div class="cwrap sk-s09"><div class="q">
<a class="skip" href="#main">דילוג לתוכן</a>
<header class="hd o-h" id="top"><a class="logo" href="#top" aria-label="נחת, דף הבית"><span class="mk" aria-hidden="true"><i></i><i></i></span>נחת</a>
<nav aria-label="ראשי"><a href="#proof">למה אצלנו</a><a href="#steps">איך זה עובד</a><a href="#plans">מסלולים</a><a href="#book">יצירת קשר</a></nav>
<a class="btn sm" href="#book"><span>לקבוע תור</span><i class="bd">${I.arrow}</i></a></header>
<main id="main">
<section class="hero"><div class="hero-grid">
<div class="hero-copy">
<span class="eyebrow o" style="--d:.1s"><i></i>מרפאת ילדים ומשפחה · רמת גן</span>
<h1 class="o" style="--d:.18s">רופא לילד שלכם,<br><em>באותו יום</em></h1>
<p class="lead o" style="--d:.26s">רופאי ילדים, רופא משפחה ואחות במרפאה אחת. קובעים תור בטלפון, נכנסים בלי המתנה ארוכה, והסיכום מחכה באפליקציה.</p>
<div class="ctas o" style="--d:.34s"><a class="btn" href="#book"><span>לקבוע תור</span><i class="bd">${I.arrow}</i></a><a class="lnk" href="#book">לראות שעות פנויות להיום${I.arrow}</a></div>
<ul class="trust o" style="--d:.42s"><li>${I.check}פתוחים עד 22:00</li><li>${I.check}וידאו או במרפאה</li><li>${I.check}בלי הפניה מראש</li></ul>
</div>
<div class="hero-visual o-v">
<div class="hv-photo"><img src="${IMG}hero-corridor.webp" width="2000" height="1666" alt="רופא ילדים נותן כיף לילדה קטנה במסדרון מואר של המרפאה" fetchpriority="high"></div>
<a class="fc fc-a card w" href="#book" aria-label="לקבוע תור להיום ב-17:40"><span class="ic">${I.cal}</span><span class="tx"><small>התור הקרוב היום</small><b>17:40</b><span class="sub">רופאת ילדים</span></span><i class="bd">${I.arrow}</i></a>
<div class="fc fc-b card dk nh"><b><span data-count="15">15</span><small>דק'</small></b><span>המתנה מקסימלית מהשעה שנקבעה</span></div>
</div>
</div></section>
<section class="proof" id="proof">
<div class="head reveal"><span class="eyebrow"><i></i>למה אצלנו</span><h2>פחות המתנה, יותר זמן עם הרופא</h2><p class="lead">המרפאה בנויה סביב השעה שקבעתם. הרישום, התזכורות והסיכום קורים בטלפון, וכל הזמן במרפאה נשאר לילד.</p></div>
<div class="bento">
<article class="card stat reveal" style="--i:0"><div class="st-top"><span class="ic">${I.heart}</span><span class="idx">001</span></div><b class="num"><span data-count="8">8</span></b><span class="lbl"><i></i>תחומי רפואה במרפאה אחת</span></article>
<article class="card w stat reveal" style="--i:1"><div class="st-top"><span class="ic">${I.clock}</span><span class="idx">002</span></div><b class="num">22:00</b><span class="lbl"><i></i>שעת סגירה בימי חול</span></article>
<article class="card stat reveal" style="--i:2"><div class="st-top"><span class="ic">${I.cal}</span><span class="idx">003</span></div><b class="num"><span data-count="6">6</span></b><span class="lbl"><i></i>ימים בשבוע, כולל שישי בבוקר</span></article>
<article class="card dk video reveal"><span class="orb" aria-hidden="true"></span><div class="st-top"><span class="ic">${I.video}</span><span class="idx">004</span></div><h3>לא חייבים להגיע למרפאה</h3><p>שיעול, פריחה, שאלה על תרופה: רופא על המסך באותו יום, ומרשם דיגיטלי שמגיע ישר לבית המרקחת.</p><a class="lnk" href="#plans">איך עובד ביקור וידאו${I.arrow}</a></article>
<article class="card w checks reveal"><div class="st-top"><div class="head3"><h3>מה מקבלים בכל ביקור</h3><p class="body">הכול כלול בעלות הביקור, בלי תוספות.</p></div><span class="idx">005</span></div><ul class="cl">${li("בדיקה מלאה אצל רופא או רופאה")}${li("סיכום ביקור מסודר באפליקציה")}${li("מרשם דיגיטלי לכל בית מרקחת")}${li("תזכורת לחיסונים לפי גיל הילד")}${li("הודעת מעקב אחרי יומיים")}${li("אחות זמינה בוואטסאפ")}</ul></article>
</div>
</section>
<section class="sig" id="steps"><div class="slab">
<div class="sig-head reveal"><div class="txt"><span class="eyebrow"><i></i>איך זה עובד</span><h2>ככה נראה ביקור אצלנו</h2><p class="lead">ארבעה שלבים. בכל אחד ברור מה קורה עכשיו ומה בא אחריו.</p></div>
<div class="sig-count" aria-hidden="true"><span class="is-on">01<small> / 04</small></span><span>02<small> / 04</small></span><span>03<small> / 04</small></span><span>04<small> / 04</small></span></div></div>
<div class="steps">
<div class="steps-visual" aria-hidden="true">
<div class="sv-stack">
<img class="sv-img is-on" src="${IMG}step-1-booking.webp" ${IMGDIM} alt="אמא וילד קטן יושבים על ספה ומסתכלים יחד על הטלפון" loading="lazy">
<img class="sv-img" src="${IMG}step-2-welcome.webp" ${IMGDIM} alt="רופאה מחייכת לילדה קטנה בשמלה כחולה מנוקדת" loading="lazy">
<img class="sv-img" src="${IMG}step-3-exam.webp" ${IMGDIM} alt="רופא מקשיב בסטטוסקופ לילדה מחייכת, ואמא יושבת לידם" loading="lazy">
<img class="sv-img" src="${IMG}step-4-home.webp" ${IMGDIM} alt="אמא מחזיקה ילד קטן שצוחק ליד חלון בבית" loading="lazy">
</div>
<div class="sv-note">
<div class="sv-n is-on"><span class="ic">${I.cal}</span><span class="tx"><small>התור שלך</small><b>היום ב-17:40</b></span></div>
<div class="sv-n"><span class="ic">${I.phone}</span><span class="tx"><small>צ'ק-אין</small><b>הושלם מהטלפון</b></span></div>
<div class="sv-n"><span class="ic">${I.heart}</span><span class="tx"><small>הבדיקה</small><b>עד 20 דקות</b></span></div>
<div class="sv-n"><span class="ic">${I.file}</span><span class="tx"><small>אחרי הביקור</small><b>הסיכום נשלח לטלפון</b></span></div>
</div>
</div>
<ol class="steps-list">
<li class="step card reveal is-on"><div class="step-ph"><img src="${IMG}step-1-booking.webp" ${IMGDIM} alt="אמא וילד קטן יושבים על ספה ומסתכלים יחד על הטלפון" loading="lazy"></div><div class="st-top"><span class="ic">${I.phone}</span><span class="idx">001</span></div><h3>קובעים תור</h3><p>באפליקציה או בטלפון. בוחרים שעה שנוחה ומקבלים תזכורת שעה לפני.</p></li>
<li class="step card reveal"><div class="step-ph"><img src="${IMG}step-2-welcome.webp" ${IMGDIM} alt="רופאה מחייכת לילדה קטנה בשמלה כחולה מנוקדת" loading="lazy"></div><div class="st-top"><span class="ic">${I.check}</span><span class="idx">002</span></div><h3>מגיעים ופוגשים</h3><p>צ'ק-אין מהטלפון, בלי שורה בקבלה. הרופאה כבר יודעת למה הגעתם ואיך קוראים לילד.</p></li>
<li class="step card reveal"><div class="step-ph"><img src="${IMG}step-3-exam.webp" ${IMGDIM} alt="רופא מקשיב בסטטוסקופ לילדה מחייכת, ואמא יושבת לידם" loading="lazy"></div><div class="st-top"><span class="ic">${I.heart}</span><span class="idx">003</span></div><h3>נבדקים בלי למהר</h3><p>יש זמן לשאול, לספר ולהבין מה הרופא רואה. הבדיקה מתנהלת בקצב של הילד.</p></li>
<li class="step card reveal"><div class="step-ph"><img src="${IMG}step-4-home.webp" ${IMGDIM} alt="אמא מחזיקה ילד קטן שצוחק ליד חלון בבית" loading="lazy"></div><div class="st-top"><span class="ic">${I.home}</span><span class="idx">004</span></div><h3>חוזרים הביתה</h3><p>הסיכום, המרשם והתוצאות מחכים באפליקציה. אחרי יומיים אחות מתקשרת לשאול מה שלום הילד.</p></li>
</ol>
</div>
</div></section>
<section class="offer" id="plans">
<div class="head reveal"><span class="eyebrow"><i></i>מסלולים</span><h2>בחרו מה נוח למשפחה שלכם</h2><p class="lead">כל המסלולים כוללים את האפליקציה, התזכורות והסיכומים. ההבדל הוא בכמה פעמים אתם צריכים אותנו.</p></div>
<div class="plans">
<article class="card w plan on-w reveal" style="--i:0"><div class="top"><h3>ביקור חד פעמי</h3><div class="price"><b><span class="cur">₪</span>290</b><small>לביקור</small></div></div><ul>${li("רופא ילדים או רופא משפחה")}${li("סיכום ומרשם באפליקציה")}${li("תור לאותו יום, לפי זמינות")}</ul><a class="btn b2" href="#book"><span>לקבוע ביקור</span><i class="bd">${I.arrow}</i></a></article>
<article class="card dk plan reveal" style="--i:1"><div class="top"><span class="chip acc">למשפחות עם ילדים קטנים</span><h3>מנוי משפחתי</h3><div class="price"><b><span class="cur">₪</span>119</b><small>לחודש</small></div></div><ul>${li("ביקורי וידאו ללא הגבלה")}${li("שני ביקורי מרפאה בשנה לכל ילד")}${li("אחות זמינה בוואטסאפ")}${li("תזכורות חיסונים לכל הילדים")}</ul><a class="btn bw" href="#book"><span>להצטרף למנוי</span><i class="bd">${I.arrow}</i></a></article>
<article class="card w plan on-w reveal" style="--i:2"><div class="top"><h3>ביקור וידאו</h3><div class="price"><b><span class="cur">₪</span>90</b><small>לביקור</small></div></div><ul>${li("רופא על המסך באותו יום")}${li("מרשם דיגיטלי לבית המרקחת")}${li("מתאים לשיעול, לפריחה ולשאלות")}</ul><a class="btn b2" href="#book"><span>לקבוע ביקור וידאו</span><i class="bd">${I.arrow}</i></a></article>
</div>
<div class="card inc nh reveal"><span>בכל המסלולים</span><ul><li class="chip">אפליקציה</li><li class="chip">תזכורות חיסונים</li><li class="chip">סיכומי ביקור</li><li class="chip">מרשם דיגיטלי</li><li class="chip">תשלום מהטלפון</li></ul><span class="micro">המחירים כוללים מע"מ</span></div>
</section>
<section class="conv" id="book"><div class="conv-card reveal">
<div class="cv-copy"><span class="eyebrow"><i></i>קביעת תור</span><h2>לא בטוחים מה מתאים לכם?</h2><p class="body">משאירים שם ומספר טלפון, ואחות מחזירה שיחה עד סוף היום. היא עוזרת לבחור רופא ושעה, בלי מכירה ובלי התחייבות.</p>
<div class="cv-links"><a class="lnk" href="tel:035550142" dir="ltr" style="unicode-bidi:isolate">03-5550142${I.arrow}</a><a class="lnk" href="https://wa.me/97235550142">לשלוח הודעה בוואטסאפ${I.arrow}</a></div></div>
<form class="form" novalidate onsubmit="return false">
<div class="fld"><label for="f-name">שם ההורה</label><input id="f-name" class="in" name="name" autocomplete="name" placeholder="איך קוראים לכם" required aria-describedby="f-name-m"><span class="msg" id="f-name-m" role="alert">${I.alert}כתבו את שמכם</span></div>
<div class="fld"><label for="f-tel">טלפון</label><input id="f-tel" class="in" name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="050-0000000" required aria-describedby="f-tel-m"><span class="msg" id="f-tel-m" role="alert">${I.alert}כתבו מספר טלפון תקין</span></div>
<div class="fld"><label for="f-why">מה הסיבה לביקור? (לא חובה)</label><input id="f-why" class="in" name="why" placeholder="משפט אחד מספיק"></div>
<button class="btn" type="submit"><span>לבקש שיחה</span><i class="bd">${I.arrow}</i></button>
<p class="micro">המספר ישמש רק לחזרה אליכם.</p>
</form>
<div class="done" hidden tabindex="-1" role="status"><span class="ic">${I.check}</span><h3>קיבלנו, תודה</h3><p>אחות תחזור אליכם עד סוף היום.</p></div>
</div></section>
</main>
<footer class="ft on-dark"><div class="ft-top">
<div><h2>הילד חם בבוקר? יש תור פנוי היום</h2><p>מזמינים בדקה, ומגיעים בשעה שקבעתם.</p></div>
<div class="ft-act"><a class="btn bw" href="#book"><span>לקבוע תור</span><i class="bd">${I.arrow}</i></a><a class="ft-tel" href="tel:035550142" dir="ltr">03-5550142</a></div>
</div>
<div class="ft-cols">
<div class="ft-brand"><a class="logo" href="#top"><span class="mk" aria-hidden="true"><i></i><i></i></span>נחת</a><p>נחת היא מרפאת ילדים ומשפחה ברמת גן: רופאים, אחיות ואפליקציה אחת שמחברת ביניהם.</p></div>
<nav class="ft-col" aria-label="המרפאה"><h3>המרפאה</h3><a href="#proof">למה אצלנו</a><a href="#steps">איך זה עובד</a><a href="#plans">מסלולים</a></nav>
<div class="ft-col"><h3>שעות פעילות</h3><span>א' עד ה': 08:00 עד 22:00</span><span>ו': 08:00 עד 13:00</span><span>שבת: סגור</span></div>
<div class="ft-col"><h3>יצירת קשר</h3><span>רמת גן</span><a href="tel:035550142" dir="ltr" style="unicode-bidi:isolate">03-5550142</a><a href="https://wa.me/97235550142">וואטסאפ</a></div>
</div>
<div class="ft-legal"><span>© <span data-year>2026</span> נחת, מרפאת ילדים ומשפחה</span><nav aria-label="משפטי"><a href="#privacy">מדיניות פרטיות</a><a href="#accessibility">הצהרת נגישות</a><a href="https://liavmatzri.co.il" target="_blank" rel="noopener">עוצב ופותח על ידי ליאב מצרי</a></nav></div>
</footer>
</div></div>`;

// JS: הדר צף עם headroom (נדבק מתחת לסרגל המאגר, ובפרויקט --vt הוא 0), reveal פעם אחת, count-up, לב החתימה (איזה שלב במרכז המסך),
// טופס שקט, שנה אוטומטית. מאזין הגלילה כותב ל-DOM רק כשהערך השתנה. reduced-motion מכבה reveal; המספרים עדיין סופרים.
const JS = String.raw`(function(){var root=document.querySelector(".sk-s09");if(!root)return;var q=root.querySelector(".q");if(!q)return;
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var hd=q.querySelector(".hd"),vt=document.querySelector(".vtop"),vtH=-1;
function place(){var h=0;if(vt){var s=getComputedStyle(vt);if((s.position==="sticky"||s.position==="fixed")&&s.display!=="none")h=vt.offsetHeight}if(h!==vtH){vtH=h;q.style.setProperty("--vt",h+"px")}}
var steps=q.querySelector(".steps"),sL=[].slice.call(q.querySelectorAll(".step")),sI=[].slice.call(q.querySelectorAll(".sv-img")),sN=[].slice.call(q.querySelectorAll(".sv-n")),sC=[].slice.call(q.querySelectorAll(".sig-count span")),on=0,sIn=false;
function setOn(i){if(i===on)return;[sL,sI,sN,sC].forEach(function(L){if(L[on])L[on].classList.remove("is-on");if(L[i])L[i].classList.add("is-on")});on=i}
function measure(){if(!sIn||!sL.length)return;var mid=window.innerHeight*.5,best=0,bd=1e9;for(var i=0;i<sL.length;i++){var r=sL[i].getBoundingClientRect(),d=Math.abs(r.top+r.height/2-mid);if(d<bd){bd=d;best=i}}setOn(best)}
var lastY=window.scrollY||0,acc=0,hidden=false,sc=false,tick=false;
function show(){if(hidden){hidden=false;hd.classList.remove("is-hidden")}}
function frame(){tick=false;var y=window.scrollY||0,d=y-lastY;lastY=y;
 var stuck=q.getBoundingClientRect().top<=vtH;
 if(stuck!==sc){sc=stuck;hd.classList.toggle("is-scrolled",stuck)}
 if(!stuck){acc=0;show()}
 else{if(d!==0)acc=(d>0)===(acc>0)?acc+d:d;
  if(!hidden&&acc>6&&!hd.contains(document.activeElement)){hidden=true;hd.classList.add("is-hidden")}
  else if(hidden&&acc<-6)show()}
 measure()}
function onScroll(){if(!tick){tick=true;window.requestAnimationFrame(frame)}}
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("resize",function(){place();onScroll()});
hd.addEventListener("focusin",show);
place();frame();
function count(b){var t=+b.dataset.count,step=Math.max(1,Math.round(t/28)),v=0;b.textContent="0";var id=setInterval(function(){v+=step;if(v>=t){v=t;clearInterval(id)}b.textContent=v.toLocaleString("he-IL")},24)}
var els=q.querySelectorAll(".reveal"),nums=q.querySelectorAll("[data-count]");
q.querySelectorAll("[data-year]").forEach(function(e){e.textContent=new Date().getFullYear()});
if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")});sIn=true;return}
var cio=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;count(x.target);cio.unobserve(x.target)})},{threshold:.6});
nums.forEach(function(b){cio.observe(b)});
if(steps)new IntersectionObserver(function(en){sIn=en[0].isIntersecting;if(sIn)measure()},{threshold:0}).observe(steps);
if(rm){els.forEach(function(e){e.classList.add("is-in")})}
else{var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");io.unobserve(x.target)})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
var form=q.querySelector(".form");
if(form){var nm=form.querySelector("#f-name"),tel=form.querySelector("#f-tel");
 function flag(inp,ok){inp.closest(".fld").classList.toggle("err",!ok);inp.setAttribute("aria-invalid",ok?"false":"true");return ok}
 [nm,tel].forEach(function(i){i.addEventListener("input",function(){if(i.closest(".fld").classList.contains("err"))flag(i,true)})});
 form.addEventListener("submit",function(e){e.preventDefault();
  var okN=flag(nm,nm.value.trim().length>=2),dg=tel.value.replace(/\D/g,""),okT=flag(tel,dg.length>=9&&dg.length<=12);
  if(!okN){nm.focus();return}if(!okT){tel.focus();return}
  form.hidden=true;var d=q.querySelector(".done");d.hidden=false;d.focus()})}
})();`;

export default [
  {
    cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
    id: "s09", name: "Soft Modern", en: "Soft Modern", group: "שפות נוספות",
    desc: "לבנדר ולבן בשכבות, כרטיסים רכים, רדיוסים גדולים ובאדג' חץ בכפתור. דף אמיתי של מרפאת ילדים ומשפחה עם צילום אמיתי: הירו מפוצל עם כרטיסי ממשק צפים, בנטו בשלושה עומקים, ביקור שנדלק שלב אחרי שלב, מסלולים וטופס שקט.",
    when: "ייעוץ, בריאות, טק, שירותים לבית ולמשפחה, כל עסק שרוצה להיראות מודרני, נגיש ורך בלי להיות ילדותי, ושיש לו צילום אנושי חם.",
    no: "מותגים שצריכים חדות, יוקרה קרה או אמירה חזקה; עמודים צפופים, כי השפה הזו חיה על אוויר.",
    recipe: `זה העור המלא soft-modern.md, עם accent חם (טרקוטה) במקום הסגול הישן, מכויל ל-Google Sans (פקטור 0.95, λ 1.05):
משטחים: bg #EEF0F6 (לבנדר, אף פעם לא לבן) · surface #fff · surface-2 #F4F5F9 (hover: #E7E9F2) · ink #131A2B · ink-2 #1C2540 · muted #5A6274 (על כהה #B6BDD0)
accent #C63C18 (לבן עליו 5.2, גם טקסט קטן על לבנדר 4.6) · hover #AD3212 · גרדיאנט הכרטיס המואר: #A82F0E ← #BC3815 ← #C84018 (לבן עליו מעל 5)
רדיוסים: 28 לוח · 20 כרטיס · 14 תמונה בתוך כרטיס · 12 מיכל אייקון · גלולה לכפתורים, שדות וצ'יפים
צל רק על לבן: 0 2px 8px rgba(19,26,43,.04), 0 12px 32px rgba(19,26,43,.06); הרמה: 0 4px 12px rgba(…,.06), 0 24px 48px rgba(…,.10). משטח מגוון מקבל גוון כהה יותר מאותה משפחה ב-hover, בלי צל
טיפוגרפיה (700 כותרות, מספרים וכפתורים · 500 תוויות · 400 גוף): H1 clamp(36, min(4.4cqi, 7.8svh), 104) · H2 2.9cqi · H3 1.7cqi · גוף .35cqi+12px · H1/גוף 3.4 @1280
ריווח נוזלי, כל ערך נוחת על הסולם ב-1280: gutter 3.75cqi (48) · סקשן 7.5cqi (96) · כרטיס 2.5cqi (32) · gap 1.875cqi (24) · טקסט רץ 62ch`,
    apply: "שלושה עומקים בכל מסך: לבנדר (עמוד), אפרפר (כרטיס משטח), לבן מורם (כרטיס עם צל), ובכל גריד כרטיס כהה אחד בלבד. כפתור ראשי = גלולה accent עם באדג' לבן עגול וחץ שמאלה (כיוון ההתקדמות ב-RTL); משני = גלולה לבנה עם צל, שנהפכת באדג' accent ב-hover; שלישי = טקסט + חץ. מיכל אייקון 44 ברדיוס 12, אינדקס 001 בפינה הנגדית, נקודה accent לפני תווית מספר. ראשי סקשן ממורכזים עם ליד muted. הדר = גלולה לבנה צפה שנעלמת בגלילה מטה וחוזרת בתנועה מעלה. לוח לבן ענק (28) צף על הלבנדר לסקשן אחד, ופוטר כהה על לוח נוסף. רק accent אחד: כפתור ראשי, אייקונים, נקודות, מילה אחת בכותרת, וכרטיס מואר אחד בכל רגע.",
    sig: "ביקור שנדלק שלב אחרי שלב: תמונה נדבקת וכרטיס אחד מואר בגרדיאנט לפי מה שבמרכז המסך, עם פתק ממשק שמתחלף על התמונה · כרטיסי ממשק צפים שחוצים את קצה צילום ההירו · כפתור גלולה עם באדג' חץ · בנטו בשלושה עומקים (אפרפר, לבן מורם, כהה) · אינדקס 001.",
    avoid: "הכל באותה שכבת משטח · לבן טהור כרקע עמוד · קווים ומסגרות כקישוט · צל על משטח מגוון או כהה · יותר מכרטיס כהה אחד בגריד · כותרות בגופן דק · accent שני · עמוד צפוף · כפתור מלא ללא הבאדג'.",
    qa: ["שלושה עומקי משטח נראים בכל מסך (לבנדר, אפרפר, לבן מורם)", "צל רק על לבן, לעולם לא על אפרפר, כהה או accent", "כרטיס כהה אחד בכל גריד, accent אחד בכל רגע", "אין קו או מסגרת מפרידים", "H1 ביחס 3 ומעלה מהגוף, וריווח סקשן בשני ערכים לפחות", "הדר נעלם בגלילה מטה וחוזר בתנועה מעלה", "הכרטיס המואר נדלק לפי מרכז המסך, ובלי JS הכל גלוי", "reduced-motion מכבה reveal, פתיחה וכל תנועה"],
    engine: "טקסט accent קטן הוא #C63C18 (4.6 על לבנדר, 5.2 על לבן); על כהה #B6BDD0 (9.2); גרדיאנט הכרטיס המואר נשאר כהה מספיק ללבן מעל 5, ולכן הוא לא נמרח עד הצבע הבהיר של האייקונים. אייקונים: גדלים 20 בלבד, stroke 1.7. הבאדג' בכפתור 40 (32 בהדר) עם חץ 20. כל transform של hover בתוך (hover:hover) and (pointer:fine). reveal ב-keyframes, פתיחת עמוד ב-CSS בלבד, scripting:none מציג הכל.",
    agent: "עצב ב-Soft Modern: רקע לבנדר #EEF0F6 לעולם לא לבן, שלושה עומקים תמיד (לבנדר, כרטיס אפרפר, כרטיס לבן מורם עם צל רך רחב) וכרטיס כהה אחד לכל גריד, רדיוסים גדולים (28 לוח, 20 כרטיס), כפתורי גלולה עם באדג' חץ עגול שזז 4px ב-hover, מספור 001 בכרטיסים, מיכל אייקון 44, ראשי סקשן ממורכזים, כותרות 700 דחוסות ו-accent חם אחד בלבד. הדר גלולה לבנה צפה עם headroom, צילום אנושי אמיתי בהירו עם כרטיסי ממשק צפים שחוצים את קצה התמונה, סקשן חתימה אחד (תמונה נדבקת וכרטיס מואר בגרדיאנט), ופוטר כהה על לוח מעוגל. בלי קווים ומסגרות, צל רק על לבן, וריווח נדיב.",
    mobile: "הדר: הניווט נעלם והכפתור נשאר (48). ההירו מתקפל לעמודה: כותרת, ליד, כפתור ברוחב מלא וקישור, ואז התמונה עם הכרטיסים הצפים בתוך המסגרת. הסטטים והכרטיסים לעמודה אחת. התמונה הנדבקת נעלמת וכל שלב מקבל צילום בראש הכרטיס, והכרטיס שבמרכז המסך נדלק כמו בדסקטופ. המנוי המשפחתי עולה ראשון. כל המטרות 44 ומעלה.",
    fonts: [],
    score: "30/30",
    note: "רף הסטודיו: 30/30, כל שבעת ה-★ עוברים. 22 סעיפים נמדדו בכלי ועברו, 6 נבדקו בעין (ריווח אופטי, קצוות, הפוגה, טקסט על תמונה, מעבר שאינו קו ישר, רגע חתימה) ו-2 לא חלים (ממלא מקום, מפרידים: אין). **נחת** היא מרפאה בדויה, והמספרים, המחירים והשעות הם נתוני דמו שמחליפים בפרויקט במידע אמיתי של הלקוח. הצילומים אמיתיים (Magnific, רישיון premium, בלי AI), באותו גריידינג (רוויה 0.92, צללים כחולים, הדגשים חמים) וברדיוס אחד: מזהי סטוק 372427728 (הירו), 404007617, 77087370, 145755935, 417414489. **בדוק:** גלול לאט מההירו עד המסלולים ושים לב איך הכרטיס המואר, התמונה והפתק מתחלפים יחד; עבור על כרטיס וכפתור; Tab בין שדות הטופס; כווץ ל-500.",
    css: CSS, html: HTML, js: JS,
  },
];
