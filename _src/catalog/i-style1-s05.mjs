// S5 · מינימליזם עריכתי ברמת סטודיו (7.9.2026). עמוד הייחוס גרסה 2.
//
// זו השפה הראשונה שנבנית מול engine/studio-bar.md: כל 30 הסעיפים נבדקו,
// והציון רשום בשדה score ובהערת העמוד. הערכים כאן הם העור storeos-quiet
// כפי שהוא (skins/storeos-quiet.md), מכוילים לפלוני (פקטור 1.19, λ 0.80).
//
// שני עמודים: s05 (עמוד הייחוס המלא) ו-s05d (הפרטים: כל רכיב בכל מצב).

const EASE = "cubic-bezier(.2,.6,.2,1)";

// ───────── טוקנים ומנוע (משותף לשני העמודים) ─────────
const TOKENS = `.cwrap{container-type:inline-size}
.q{--accent:#4A6EF6;--accent-text:#3552D8;--btn-solid:#3B5BDB;--tint-12:color-mix(in srgb,var(--accent) 12%,#fff);--tint-4:color-mix(in srgb,var(--accent) 4%,#fff);
 --ink:#111;--muted:#6b7280;--muted-strong:#4b5563;--border:#eaeaea;--border-2:#e5e7eb;--surface:#fff;--surface-muted:#f3f4f6;--err:#d92d20;
 --r-control:12px;--r-card:16px;--ease:${EASE};--shadow-soft:0 6px 20px rgba(17,24,39,.08);--shadow-shot:0 30px 60px rgba(17,24,39,.16);
 --sec:112px;--gut:clamp(20px,4cqi,64px);
 background:var(--surface);color:var(--ink);font-family:"Ploni","Heebo",system-ui,sans-serif;font-size:18px;line-height:1.36;overflow:hidden;position:relative;isolation:isolate;-webkit-font-smoothing:antialiased}
.q *{box-sizing:border-box}
.q h1,.q h2,.q h3,.q p,.q ul{margin:0}
.q a{color:inherit;text-decoration:none}
.q ul{list-style:none;padding:0}
.q h1{font-size:57px;line-height:.92;font-weight:600;letter-spacing:-.01em}
.q h2{font-size:41px;line-height:.96;font-weight:600}
.q h3{font-size:24px;line-height:1.08;font-weight:600}
.q .lead{font-size:20px;line-height:1.28;color:var(--muted);max-width:640px}
.q .body{font-size:18px;line-height:1.36;color:var(--muted);max-width:640px}
.q .meta{font-size:17px;font-weight:500;line-height:1.2;color:var(--muted)}
.q .micro{font-size:15px;line-height:1.2;color:var(--muted)}
.q .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;line-height:1;color:var(--accent-text);background:var(--tint-12);padding:7px 12px;border-radius:var(--r-control)}
.q .eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--accent);margin-top:1px}
.q .hl{font-size:15px;font-weight:500;color:var(--accent-text);margin-top:16px}
.q .muted-bg .body,.q .muted-bg .micro,.q .muted-bg .meta{color:var(--muted-strong)}
.q .ico{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;color:var(--accent);flex:none;display:block}
.q .ico.s{width:18px;height:18px}
/* כפתורים: שלוש רמות, ארבעה מצבים */
.q .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font:inherit;font-size:18px;font-weight:500;line-height:1;border-radius:var(--r-control);padding:13px 24px 14px;min-height:44px;border:1px solid transparent;cursor:pointer;background:var(--btn-solid);color:#fff;transition:background .18s var(--ease),border-color .18s var(--ease),color .18s var(--ease),transform .12s var(--ease),box-shadow .18s var(--ease)}
.q .btn:hover,.q .btn.is-hover{background:color-mix(in srgb,var(--btn-solid) 88%,#000)}
.q .btn:active,.q .btn.is-active{transform:scale(.98)}
.q .btn:focus-visible,.q .btn.is-focus{outline:0;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 35%,transparent)}
.q .btn.is-disabled,.q .btn:disabled{opacity:.5;pointer-events:none}
.q .btn.lg{font-size:20px;padding:15px 28px 16px;min-height:50px}
.q .btn.sm{font-size:17px;padding:9px 18px 10px;min-height:38px}
.q .btn.b2{background:var(--surface);color:var(--ink);border-color:var(--border-2)}
.q .btn.b2:hover,.q .btn.b2.is-hover{background:#f9fafb;border-color:#d1d5db}
.q .lnk{display:inline-flex;align-items:center;gap:6px;font-size:17px;font-weight:500;color:var(--ink);padding:4px 0;border-bottom:1px solid transparent;transition:color .18s var(--ease),border-color .18s var(--ease),gap .18s var(--ease)}
.q .lnk .ico{color:var(--accent);width:18px;height:18px;transition:transform .18s var(--ease)}
.q .lnk:hover,.q .lnk.is-hover{color:var(--accent-text);border-color:var(--accent-text)}
.q .lnk:hover .ico,.q .lnk.is-hover .ico{transform:translateX(-3px)}
.q .lnk:focus-visible{outline:0;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 35%,transparent);border-radius:4px}
/* על רצועת accent */
.q .band .btn{background:#fff;color:var(--accent-text)}
.q .band .btn:hover{background:#eef1ff}
.q .band .btn.b2{background:transparent;color:#fff;border-color:rgba(255,255,255,.65)}
.q .band .btn.b2:hover{border-color:#fff;background:transparent}
/* שדות: חמישה מצבים */
.q .fld{display:flex;flex-direction:column;gap:8px}
.q .fld label{font-size:17px;font-weight:500;line-height:1.2;color:var(--ink)}
.q .in{font:inherit;font-size:18px;line-height:1.2;padding:14px 16px;border:1px solid var(--border-2);border-radius:var(--r-control);background:#fff;color:var(--ink);appearance:none;width:100%;transition:border-color .18s var(--ease),box-shadow .18s var(--ease)}
.q .in::placeholder{color:#9ca3af}
.q .in:focus,.q .in.is-focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 22%,transparent)}
.q .fld.err .in{border-color:var(--err)}
.q .fld .msg{display:none;font-size:15px;line-height:1.2;color:var(--err);align-items:center;gap:6px}
.q .fld.err .msg{display:inline-flex}
.q .fld .msg .ico{width:16px;height:16px;color:var(--err)}
.q .in:disabled,.q .in.is-disabled{background:var(--surface-muted);color:var(--muted);pointer-events:none}
/* כרטיס, באדג', צ'יפ */
.q .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-card);padding:26px;transition:border-color .18s var(--ease),transform .18s var(--ease),box-shadow .18s var(--ease)}
.q .card.hv:hover,.q .card.is-hover{border-color:#d1d5db;transform:translateY(-2px);box-shadow:var(--shadow-soft)}
.q .badge{display:inline-block;font-size:14px;font-weight:600;line-height:1;padding:5px 12px 6px;border-radius:12px;background:var(--tint-12);color:var(--accent-text)}
.q .chip{display:inline-flex;align-items:center;gap:8px;font-size:17px;line-height:1;padding:8px 12px 9px;border-radius:var(--r-control);border:1px solid var(--border);background:#fff;color:var(--ink)}
.q .chip .ico{width:16px;height:16px;margin-top:-1px}
.q .chip.off{background:var(--surface-muted);color:var(--muted);filter:saturate(.6)}
.q .stat-chip{position:absolute;inset-inline-start:14px;bottom:14px;font-size:15px;font-weight:600;line-height:1;padding:7px 12px 8px;border-radius:12px;background:var(--tint-12);color:var(--accent-text);box-shadow:var(--shadow-soft)}
.q .hr{height:1px;background:var(--border);border:0;margin:0}
/* reveal: keyframes, לא transition (חוק סיני 12.8) */
.q .reveal{opacity:0}
.q .reveal.is-in{opacity:1;animation:qrev .5s ${EASE} both}
@keyframes qrev{from{opacity:0;translate:0 16px}to{opacity:1;translate:0 0}}
@media (prefers-reduced-motion:reduce){.q .reveal{opacity:1;animation:none}.q .reveal.is-in{animation:none}.q .btn,.q .card,.q .lnk,.q .lnk .ico{transition:none}}
/* ריווח סקשן: 112 / 88 / 64 */
.q .sec{padding:var(--sec) var(--gut)}
.q .muted-bg{background:var(--surface-muted)}
.q .wrap{max-width:1200px;margin-inline:auto}
@container (max-width:1023px){.q{--sec:88px}}
@container (max-width:767px){.q{--sec:64px}.q h1{font-size:38px;line-height:.96}.q h2{font-size:31px;line-height:1}.q h3{font-size:22px}.q .btn{width:100%;min-height:48px}}`;

// ───────── אייקונים (stroke 1.7, משפחה אחת) ─────────
const I = {
  check: `<svg class="ico s" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`,
  zap: `<svg class="ico" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>`,
  shield: `<svg class="ico" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  clock: `<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  arrow: `<svg class="ico" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>`,
  alert: `<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`,
  logo: `<svg class="ico" viewBox="0 0 24 24" style="color:var(--accent)"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12h8M12 8v8"/></svg>`,
};

// ───────── ויז'ואל ההירו: מסגרת דפדפן עם UI מצויר (ממלא-מקום מעוצב) ─────────
const FRAME_CSS = `.q .frame{background:#fff;border:1px solid var(--border);border-radius:var(--r-card);overflow:hidden;box-shadow:var(--shadow-shot);position:relative;max-width:1000px;margin:56px auto -88px}
.q .frame .bar{height:38px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:7px;padding-inline:16px}
.q .frame .bar i{width:11px;height:11px;border-radius:50%;background:#e2e4e9}
.q .frame .scr{aspect-ratio:16/9;background:var(--surface-muted);display:grid;grid-template-columns:200px 1fr;gap:16px;padding:16px}
.q .frame .side{background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px}
.q .frame .side i{height:10px;border-radius:5px;background:var(--border)}
.q .frame .side i:first-child{width:60%;background:var(--tint-12)}
.q .frame .main{display:grid;grid-template-rows:auto 1fr;gap:16px}
.q .frame .kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.q .frame .kpi{background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:6px}
.q .frame .kpi b{font-size:26px;font-weight:600;letter-spacing:-.02em;line-height:1;color:var(--ink)}
.q .frame .kpi small{font-size:13px;color:var(--muted)}
.q .frame .kpi:first-child b{color:var(--accent)}
.q .frame .chart{background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;align-items:flex-end;gap:10px}
.q .frame .chart s{display:block;flex:1;background:var(--tint-12);border-radius:6px 6px 0 0;text-decoration:none}
.q .frame .chart s:nth-child(5){background:var(--accent)}
@container (max-width:767px){.q .frame{margin:40px auto -56px}.q .frame .scr{grid-template-columns:1fr;aspect-ratio:auto}.q .frame .side{display:none}.q .frame .kpis{grid-template-columns:1fr 1fr}.q .frame .chart{height:120px}}`;
const FRAME_HTML = `<div class="frame reveal"><div class="bar"><i></i><i></i><i></i></div><div class="scr"><div class="side"><i></i><i></i><i></i><i></i><i></i></div><div class="main"><div class="kpis"><div class="kpi"><b>1,240</b><small>הזמנות החודש</small></div><div class="kpi"><b>96%</b><small>נשלחו בזמן</small></div><div class="kpi"><b>4.9</b><small>דירוג</small></div></div><div class="chart"><s style="height:35%"></s><s style="height:55%"></s><s style="height:45%"></s><s style="height:70%"></s><s style="height:100%"></s><s style="height:80%"></s><s style="height:62%"></s></div></div></div><span class="stat-chip">+31% המרה מהחודש שעבר</span></div>`;

// ───────── עמוד הייחוס גרסה 2 ─────────
const PAGE_CSS = `${TOKENS}
${FRAME_CSS}
.q .hd{position:sticky;top:0;z-index:20;height:64px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding-inline:var(--gut);transition:box-shadow .18s var(--ease)}
.q .hd.is-scrolled{box-shadow:var(--shadow-soft)}
.q .hd .logo{display:inline-flex;align-items:center;gap:8px;font-size:24px;font-weight:600;line-height:1}
.q .hd nav{position:absolute;inset-inline:0;margin-inline:auto;width:max-content;display:flex;gap:28px;font-size:17px;font-weight:500;color:var(--muted)}
.q .hd nav a{transition:color .18s var(--ease);padding:4px 0}
.q .hd nav a:hover{color:var(--ink)}
.q .hd .acts{margin-inline-start:auto;display:flex;align-items:center;gap:20px}
.q .hd .acts .login{font-size:17px;font-weight:500;color:var(--muted);transition:color .18s var(--ease)}
.q .hd .acts .login:hover{color:var(--ink)}
.q .hero{padding:64px var(--gut) 0;text-align:center}
.q .hero .wrap{display:flex;flex-direction:column;align-items:center;gap:24px}
.q .hero h1{max-width:760px}
.q .hero .lead{margin-inline:auto}
.q .hero .ctas{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px}
.q .proof{padding-top:calc(var(--sec) + 88px)}
.q .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;text-align:center}
.q .stat b{display:block;font-size:86px;line-height:1;font-weight:600;letter-spacing:-.02em;color:var(--accent);font-variant-numeric:tabular-nums}
.q .stat .meta{margin-top:12px}
.q .head{display:flex;flex-direction:column;gap:16px;max-width:760px;margin-bottom:48px}
.q .head.c{align-items:center;text-align:center;margin-inline:auto}
.q .head.c .lead{margin-inline:auto}
.q .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.q .g3 .card{display:flex;flex-direction:column;gap:14px}
.q .g3 .card h3{margin-top:0}.q .g3 .card .body{font-size:18px}
.q .state{padding:calc(var(--sec) * 1.5) var(--gut);text-align:center}
.q .state .wrap{display:flex;flex-direction:column;align-items:center;gap:24px;max-width:660px}
.q .state h2{max-width:660px}
.q .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:start}
.q .plan{position:relative;display:flex;flex-direction:column;gap:20px}
.q .plan.rec{border:2px solid var(--accent);box-shadow:var(--shadow-soft);background:var(--tint-4)}
.q .plan .badge{position:absolute;top:-13px;inset-inline:0;margin-inline:auto;width:max-content}
.q .plan .price{display:flex;align-items:baseline;gap:8px}
.q .plan .price b{font-size:45px;font-weight:600;letter-spacing:-.02em;line-height:1}
.q .plan ul{display:flex;flex-direction:column;gap:12px}
.q .plan li{display:flex;align-items:flex-start;gap:10px;font-size:18px;line-height:1.36;color:var(--muted)}
.q .plan li .ico{margin-top:3px}
.q .plan .btn{width:100%}
.q .form{max-width:640px;margin-inline:auto;display:flex;flex-direction:column;gap:20px}
.q .form .row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.q .form .btn{width:100%;min-height:50px;font-size:18px}
.q .form .micro{text-align:center}
.q .band{background:var(--accent);color:#fff;text-align:center}
.q .band .wrap{display:flex;flex-direction:column;align-items:center;gap:24px;max-width:760px}
.q .band h2{color:#fff}
.q .band .lead{color:rgba(255,255,255,.9);margin-inline:auto}
.q .band .ctas{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px}
.q .ft{border-top:1px solid var(--border);padding:48px var(--gut) 0}
.q .ft .cols{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;padding-bottom:40px}
.q .ft .brand{display:flex;flex-direction:column;gap:14px}
.q .ft .brand .logo{display:inline-flex;align-items:center;gap:8px;font-size:26px;font-weight:600;line-height:1}
.q .ft .brand .micro{max-width:300px;line-height:1.36}
.q .ft .col{display:flex;flex-direction:column;gap:12px}
.q .ft .col .meta{color:var(--ink);margin-bottom:4px}
.q .ft .col a{font-size:17px;color:var(--muted);transition:color .18s var(--ease)}
.q .ft .col a:hover{color:var(--ink)}
.q .ft .legal{border-top:1px solid var(--border);padding:20px 0;text-align:center}
@container (max-width:1023px){.q .stats{gap:24px}.q .stat b{font-size:64px}.q .ft .cols{grid-template-columns:1fr 1fr}}
@container (max-width:767px){.q .hd nav,.q .hd .acts .login{display:none}.q .hd .acts .btn{width:auto;min-height:38px}.q .g3,.q .plans,.q .stats,.q .form .row{grid-template-columns:1fr}.q .stat b{font-size:56px}.q .proof{padding-top:calc(var(--sec) + 56px)}.q .plan.rec{order:-1}.q .ft .cols{grid-template-columns:1fr;gap:28px}.q .state{padding-block:calc(var(--sec) * 1.25)}}`;

const li = (t) => `<li>${I.check}<span>${t}</span></li>`;
const PAGE_HTML = `<div class="cwrap sk-s05"><div class="q">
<header class="hd"><a class="logo">${I.logo}שם העסק</a><nav><a>מוצר</a><a>מחירים</a><a>לקוחות</a><a>בלוג</a></nav><div class="acts"><a class="login">התחברות</a><a class="btn sm">להתחיל</a></div></header>
<section class="hero"><div class="wrap">
<span class="eyebrow reveal"><i></i>מערכת ניהול לחנויות קטנות</span>
<h1 class="reveal">כל ההזמנות במקום אחד, בלי גיליונות</h1>
<p class="lead reveal">מלאי, משלוחים ולקוחות בממשק אחד שקט. מתחילים בעשר דקות, בלי הדרכה ובלי כרטיס אשראי.</p>
<div class="ctas reveal"><a class="btn lg">להתחיל בחינם</a><a class="btn b2 lg">לראות איך זה עובד</a></div>
${FRAME_HTML}
</div></section>
<section class="sec muted-bg proof"><div class="wrap"><div class="stats">
<div class="stat reveal"><b data-count="1240">0</b><span class="meta">חנויות פעילות</span></div>
<div class="stat reveal"><b data-count="96" data-suffix="%">0</b><span class="meta">משלוחים שנשלחו בזמן</span></div>
<div class="stat reveal"><b data-count="12" data-suffix=" דק'">0</b><span class="meta">מהרשמה להזמנה ראשונה</span></div>
</div></div></section>
<section class="sec"><div class="wrap">
<div class="head reveal"><span class="eyebrow"><i></i>למה זה עובד</span><h2>שלושה דברים שהמערכת עושה במקומכם</h2><p class="lead">לא רשימת פיצ'רים. שלוש פעולות שחוזרות כל יום, ושמהיום קורות לבד.</p></div>
<div class="g3">
<article class="card hv reveal">${I.zap}<h3>הזמנה נכנסת, מדבקה יוצאת</h3><p class="body">כל הזמנה חדשה מקבלת מדבקת משלוח מוכנה להדפסה, עם הכתובת מאומתת מול הדואר.</p></article>
<article class="card hv reveal">${I.shield}<h3>מלאי שלא משקר</h3><p class="body">הכמות מתעדכנת ברגע המכירה, בכל הערוצים. מוצר שנגמר יורד מהאתר לבד.</p></article>
<article class="card hv reveal">${I.clock}<h3>לקוח שמקבל תשובה</h3><p class="body">הודעת וואטסאפ אוטומטית בכל שלב: התקבל, נארז, נשלח. פחות טלפונים, יותר אמון.</p></article>
</div>
<p class="hl reveal">אף מערכת אחרת לא מדפיסה את המדבקה בשבילכם.</p>
</div></section>
<section class="state muted-bg"><div class="wrap">
<h2 class="reveal">מערכת טובה היא זו שלא מרגישים.</h2>
<p class="lead reveal">בנינו אותה לחנויות של אדם אחד או שניים, שאין להם זמן ללמוד תוכנה. אם משהו דורש הסבר, שינינו אותו.</p>
<a class="lnk reveal">לקרוא איך בנינו את זה${I.arrow}</a>
</div></section>
<section class="sec"><div class="wrap">
<div class="head c reveal"><span class="eyebrow"><i></i>מחירים</span><h2>מחיר אחד לחודש, בלי הפתעות</h2><p class="lead">כל החבילות כוללות את כל הפיצ'רים. ההבדל הוא רק בכמות ההזמנות.</p></div>
<div class="plans">
<article class="card plan reveal"><h3>קטנה</h3><div class="price"><b>₪89</b><span class="meta">לחודש</span></div><ul>${li("עד 200 הזמנות בחודש")}${li("מדבקות משלוח")}${li("הודעות וואטסאפ")}</ul><a class="btn b2">להתחיל בחינם</a></article>
<article class="card plan rec reveal"><span class="badge">הכי נפוצה</span><h3>בינונית</h3><div class="price"><b>₪149</b><span class="meta">לחודש</span></div><ul>${li("עד 1,000 הזמנות בחודש")}${li("מדבקות משלוח")}${li("הודעות וואטסאפ")}${li("חיבור לחשבונית ירוקה")}</ul><a class="btn">להתחיל בחינם</a></article>
<article class="card plan reveal"><h3>גדולה</h3><div class="price"><b>₪249</b><span class="meta">לחודש</span></div><ul>${li("הזמנות ללא הגבלה")}${li("כל מה שבבינונית")}${li("שני משתמשים")}${li("תמיכה בטלפון")}</ul><a class="btn b2">להתחיל בחינם</a></article>
</div>
</div></section>
<section class="sec muted-bg"><div class="wrap">
<div class="head c reveal"><h2>שאלה לפני שמתחילים?</h2><p class="lead">משאירים פרטים וחוזרים אליכם תוך יום עבודה. בלי מכירה, רק תשובות.</p></div>
<form class="form reveal" onsubmit="return false"><div class="row"><div class="fld"><label>שם מלא</label><input class="in" placeholder="איך קוראים לכם"></div><div class="fld"><label>טלפון</label><input class="in" placeholder="050-0000000"></div></div><div class="fld"><label>מה השאלה?</label><input class="in" placeholder="משפט אחד מספיק"></div><button class="btn" type="submit">לשלוח</button><p class="micro">בלי רשימות תפוצה. עונים ומוחקים.</p></form>
</div></section>
<section class="sec band"><div class="wrap">
<h2 class="reveal">מתחילים היום, ההזמנה הראשונה נשלחת מחר</h2>
<p class="lead reveal">14 יום ניסיון, בלי כרטיס אשראי. אם לא התאים, לא קרה כלום.</p>
<div class="ctas reveal"><a class="btn lg">להתחיל בחינם</a><a class="btn b2 lg">לדבר איתנו</a></div>
</div></section>
<footer class="ft"><div class="wrap"><div class="cols">
<div class="brand"><span class="logo">${I.logo}שם העסק</span><p class="micro">מערכת ניהול לחנויות קטנות. נבנתה בישראל, נתמכת בעברית, עובדת בשקט.</p></div>
<div class="col"><span class="meta">מוצר</span><a>מה כלול</a><a>מחירים</a><a>עדכונים</a></div>
<div class="col"><span class="meta">חברה</span><a>אודות</a><a>לקוחות</a><a>בלוג</a></div>
<div class="col"><span class="meta">עזרה</span><a>מרכז תמיכה</a><a>וואטסאפ</a><a>יצירת קשר</a></div>
</div><p class="legal micro">© שם העסק · תנאי שימוש · פרטיות · נגישות</p></div></footer>
</div></div>`;

// reveal פעם אחת, count-up 0.7s ב-28 צעדים, צל הדר בגלילה. הכל כבוי ב-reduced-motion.
const PAGE_JS = `(function(){var root=document.querySelector(".sk-s05");if(!root)return;
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var hd=root.querySelector(".hd");var top=document.querySelector(".vtop");if(top&&hd)hd.style.top=top.offsetHeight+"px";
function onScroll(){if(hd)hd.classList.toggle("is-scrolled",window.scrollY>8)}window.addEventListener("scroll",onScroll,{passive:true});onScroll();
function count(b){var t=+b.dataset.count,suf=b.dataset.suffix||"",step=Math.max(1,Math.round(t/28)),v=0;if(rm){b.textContent=t.toLocaleString("he-IL")+suf;return}
var id=setInterval(function(){v+=step;if(v>=t){v=t;clearInterval(id)}b.textContent=v.toLocaleString("he-IL")+suf},24)}
var els=root.querySelectorAll(".reveal");
if(rm||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("is-in")});root.querySelectorAll("[data-count]").forEach(count);return}
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;x.target.classList.add("is-in");x.target.querySelectorAll("[data-count]").forEach(count);if(x.target.matches("[data-count]"))count(x.target);io.unobserve(x.target)})},{threshold:.15,rootMargin:"0px 0px -8% 0px"});
els.forEach(function(e){io.observe(e)});})();`;

// ───────── עמוד הפרטים: כל רכיב בכל מצב ─────────
const DET_CSS = `${TOKENS}
.q .det{padding:48px var(--gut);display:flex;flex-direction:column;gap:56px;max-width:1100px;margin-inline:auto}
.q .blk{display:flex;flex-direction:column;gap:20px}
.q .blk>h3{padding-bottom:12px;border-bottom:1px solid var(--border)}
.q .rowx{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}
.q .cell{display:flex;flex-direction:column;gap:10px;align-items:flex-start;min-width:150px}
.q .cell .micro{font-weight:500}
.q .band-x{background:var(--accent);padding:24px;border-radius:var(--r-card);display:flex;gap:12px;flex-wrap:wrap}
.q .seg{display:inline-grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:4px;padding:4px;background:var(--surface-muted);border:1px solid var(--border);border-radius:12px}
.q .seg span{font-size:17px;font-weight:500;color:var(--muted);padding:10px 14px;border-radius:9px;line-height:1;display:inline-flex;gap:8px;align-items:center;white-space:nowrap}
.q .seg span.on{background:#fff;box-shadow:var(--shadow-soft);color:var(--accent-text)}
.q .seg b{font-size:14px;font-weight:600;padding:2px 8px;border-radius:999px;background:#fff;line-height:1.2}
.q .seg span.on b{background:var(--tint-12)}
.q .acc{width:100%;max-width:640px}
.q .acc .it{border-bottom:1px solid var(--border)}
.q .acc .qn{display:flex;justify-content:space-between;align-items:center;padding:22px 0;font-size:21px;font-weight:600;line-height:1.2}
.q .acc .qn .ico{width:20px;height:20px;color:var(--muted);transition:transform .2s var(--ease)}
.q .acc .it.open .qn .ico{transform:rotate(180deg)}
.q .acc .an{padding:0 0 22px;font-size:18px;color:var(--muted);line-height:1.36;max-width:640px}
.q .tbl{display:grid;grid-template-columns:1fr 150px 150px;max-width:640px;border:1px solid var(--border);border-radius:var(--r-card);overflow:hidden}
.q .tbl>div{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;font-size:17px}
.q .tbl .th{background:var(--surface-muted);font-size:15px;font-weight:600;color:var(--muted-strong)}
.q .tbl .x{color:#c0c4cc;font-size:20px}
.q .stat-x{position:relative;width:260px;height:150px;border-radius:var(--r-card);background:var(--surface-muted);border:1px solid var(--border)}
.q .nums{display:flex;gap:40px;align-items:baseline;flex-wrap:wrap}
.q .nums b{font-weight:600;letter-spacing:-.02em;line-height:1}
.q .succ{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
.q .succ i{width:56px;height:56px;border-radius:50%;background:var(--tint-12);display:grid;place-items:center}
.q .succ i .ico{color:var(--accent);width:24px;height:24px}
@container (max-width:767px){.q .tbl{grid-template-columns:1fr 90px 90px}.q .btn{width:auto}}`;

const cell = (label, inner) => `<div class="cell"><span class="micro">${label}</span>${inner}</div>`;
const DET_HTML = `<div class="cwrap sk-s05"><div class="q"><div class="det">
<div class="blk"><h3>כפתורים · שלוש רמות, ארבעה מצבים</h3>
<div class="rowx">${cell("ראשי · רגיל", `<a class="btn">להתחיל בחינם</a>`)}${cell("hover", `<a class="btn is-hover">להתחיל בחינם</a>`)}${cell("active (לחיצה)", `<a class="btn is-active">להתחיל בחינם</a>`)}${cell("focus-visible", `<a class="btn is-focus">להתחיל בחינם</a>`)}${cell("מושבת", `<a class="btn is-disabled">להתחיל בחינם</a>`)}</div>
<div class="rowx">${cell("משני · רגיל", `<a class="btn b2">לראות דוגמאות</a>`)}${cell("hover", `<a class="btn b2 is-hover">לראות דוגמאות</a>`)}${cell("שלישי · טקסט + חץ", `<a class="lnk">לקרוא את הסיפור${I.arrow}</a>`)}${cell("hover", `<a class="lnk is-hover">לקרוא את הסיפור${I.arrow}</a>`)}${cell("גדלים", `<a class="btn lg">הירו 20px</a>`)}${cell("", `<a class="btn sm">הדר 17px</a>`)}</div>
<div class="band-x"><a class="btn">ראשי הפוך על accent</a><a class="btn b2">משני שקוף</a></div>
<p class="micro">הרמה השלישית (טקסט + חץ) היא מה שתבניות שוכחות. hover מזיז את החץ 3px ומוסיף קו תחתון. active מכווץ ל-.98. focus הוא טבעת accent ב-35%, לא הכחול של הדפדפן.</p></div>

<div class="blk"><h3>שדות · חמישה מצבים</h3>
<div class="rowx">${cell("רגיל", `<div class="fld"><label>טלפון</label><input class="in" placeholder="050-0000000"></div>`)}${cell("focus", `<div class="fld"><label>טלפון</label><input class="in is-focus" placeholder="050-0000000"></div>`)}${cell("מלא", `<div class="fld"><label>טלפון</label><input class="in" value="052-1234567"></div>`)}${cell("שגיאה", `<div class="fld err"><label>טלפון</label><input class="in" value="052-12"><span class="msg">${I.alert}מספר קצר מדי</span></div>`)}${cell("מושבת", `<div class="fld"><label>טלפון</label><input class="in is-disabled" placeholder="לא זמין"></div>`)}</div>
<p class="micro">18px כדי שאייפון לא יזום. תווית 17/500 ink מעל. שגיאה = צבע + טקסט + אייקון, לעולם לא צבע לבד.</p></div>

<div class="blk"><h3>כרטיס, באדג', צ'יפים</h3>
<div class="rowx">${cell("כרטיס · רגיל", `<article class="card" style="width:280px;display:flex;flex-direction:column;gap:14px">${I.zap}<h3>כותרת הכרטיס</h3><p class="body">אייקון accent, כותרת 24, טקסט 18 muted.</p></article>`)}${cell("hover", `<article class="card is-hover" style="width:280px;display:flex;flex-direction:column;gap:14px">${I.zap}<h3>כותרת הכרטיס</h3><p class="body">גבול כהה יותר, 2px למעלה, צל רך. סיגנל אחד.</p></article>`)}
${cell("באדג'", `<span class="badge">מומלץ</span>`)}${cell("צ'יפ", `<span class="chip">${I.check}מדבקות משלוח</span>`)}${cell("צ'יפ מנוטרל", `<span class="chip off">${I.check}אין אצל אחרים</span>`)}</div></div>

<div class="blk"><h3>eyebrow, מספרים, קו הדגשה</h3>
<div class="rowx">${cell("eyebrow", `<span class="eyebrow"><i></i>למה זה עובד</span>`)}${cell("קו מיקרו-הדגשה", `<p class="hl" style="margin:0">אף אחד אחר לא נותן לכם את זה.</p>`)}</div>
<div class="nums"><div><b style="font-size:86px;color:var(--accent)">1,240</b><span class="meta" style="display:block;margin-top:8px">סטט ענק 86 · accent</span></div><div><b style="font-size:45px">₪149</b><span class="meta" style="display:block;margin-top:8px">מחיר 45 · ink</span></div><div><b style="font-size:26px">96%</b><span class="meta" style="display:block;margin-top:8px">KPI 26 · ink</span></div></div>
<p class="micro">כותרות תמיד ink. accent מופיע בעשרה מקומות סגורים בלבד: כפתור ראשי, אייקונים, מצב אקטיבי, סטט ענק, קו הדגשה, צ'יפ סטט, באדג', רצועת CTA, טבעת פוקוס, V ברשימות.</p></div>

<div class="blk"><h3>טאבים, אקורדיון, טבלת השוואה, צ'יפ סטט, הצלחה</h3>
<div class="rowx">${cell("segmented", `<div class="seg"><span class="on">חנויות<b>12</b></span><span>שירותים<b>4</b></span><span>מסעדות</span></div>`)}${cell("צ'יפ סטט צף", `<div class="stat-x"><span class="stat-chip">+31% המרה</span></div>`)}${cell("הצלחה", `<div class="succ"><i>${I.check}</i><h3 style="font-size:21px">נשלח</h3><p class="micro">חוזרים תוך יום עבודה</p></div>`)}</div>
<div class="rowx"><div class="acc"><div class="it open"><div class="qn">כמה זמן לוקח להתחיל?<svg class="ico" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></div><p class="an">עשר דקות. מייבאים את המוצרים מקובץ, מחברים את הדומיין, וההזמנה הראשונה יכולה להיכנס.</p></div><div class="it"><div class="qn">אפשר לבטל?<svg class="ico" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></div></div></div></div>
<div class="tbl"><div class="th"></div><div class="th">אצלנו</div><div class="th">אחרים</div><div>מדבקות משלוח</div><div>${I.check}</div><div class="x">✕</div><div>הודעות וואטסאפ</div><div>${I.check}</div><div class="micro">בתוספת תשלום</div><div>מלאי בזמן אמת</div><div>${I.check}</div><div>${I.check}</div></div></div>

<div class="blk"><h3>מפרידים ורדיוסים</h3>
<div class="rowx">${cell("hairline · border #eaeaea", `<hr class="hr" style="width:220px">`)}${cell("r-control 12", `<div style="width:64px;height:44px;border:1px solid var(--border-2);border-radius:var(--r-control)"></div>`)}${cell("r-card 16", `<div style="width:64px;height:64px;border:1px solid var(--border);border-radius:var(--r-card)"></div>`)}${cell("pill 999 (מונים בלבד)", `<div style="width:64px;height:24px;background:var(--tint-12);border-radius:999px"></div>`)}${cell("צל רך", `<div style="width:64px;height:64px;border-radius:var(--r-card);background:#fff;box-shadow:var(--shadow-soft)"></div>`)}</div>
<p class="micro">מפריד אחד לכל העמוד: קו שיער בצבע הגבול. אין קווים עבים ואין קווים אפורים אקראיים. צל דרמטי שמור לוויז'ואל ההירו בלבד.</p></div>
</div></div></div>`;

const base = {
  cat: "style", area: "doctrine", status: "מאושר", runway: false, tech: "שפת עיצוב · רמת סטודיו",
  en: "Editorial Minimalism", group: "אמירה וקיצון",
  when: "פרימיום, פורטפוליו, SaaS מקצועי, חנויות ומערכות, כשהתוכן הוא הכוכב. עור ברירת המחדל.",
  no: "מוצרים עתירי פיצ'רים שדורשים גילוי מהיר, ומותגים שצריכים רעש.",
  recipe: `זה העור המלא storeos-quiet (skins/storeos-quiet.md). הדמו כאן הוא העור עצמו, מכויל לפלוני:
accent #4A6EF6 · accent-text #3552D8 · btn-solid #3B5BDB · tint-12 / tint-4 (color-mix)
ink #111 · muted #6b7280 · muted-strong #4b5563 · border #eaeaea · border-2 #e5e7eb · surface-muted #f3f4f6
r-control 12 · r-card 16 · ease cubic-bezier(.2,.6,.2,1) · shadow-soft 0 6px 20px rgba(17,24,39,.08)
פלוני (פקטור 1.19, λ 0.80): H1 57/.92/-.01em · H2 41/.96 · H3 24/1.08 · ליד 20/1.28 · גוף 18/1.36 · meta 17/500 · סטט 86/-.02em · מחיר 45
סקשן 112 / 88 / 64 · טקסט רץ 640 · ראש סקשן 760`,
  apply: "צבע אחד עושה הכל: accent בעשרה מקומות סגורים (כפתור ראשי, אייקונים, מצב אקטיבי, סטט ענק, קו הדגשה, צ'יפ סטט, באדג', רצועת CTA, טבעת פוקוס, V ברשימות) ואסור בכותרות. רקעים לסירוגין לבן/אפרפר, רצועת accent אחת לפני הפוטר. הדר 64 דביק עם צל בגלילה, ניווט ממורכז אבסולוטית. ויז'ואל = מסגרת דפדפן אפורה (לא עיגולי צבע) שחוצה את גבול ההירו.",
  sig: "מסגרת דפדפן שחוצה מהירו לסקשן ההוכחה · סטט ענק 86 ב-accent עם count-up של 0.7 שניות · קו מיקרו-הדגשה אחד לסקשן · קישור טקסט+חץ כרמה שלישית.",
  avoid: "ריק אינו מינימליזם, עמוד בלי מתח טיפוגרפי הוא סתם ריק · כותרת צבעונית · שני צבעי אייקונים באותו בלוק · שני אפרפרים רצופים · גרדיאנט או צל כבד על כפתור · pill על כפתורים.",
  qa: ["accent רק בעשרת המקומות", "H1 ink ולא accent", "אין שני אפרפרים רצופים", "רצועת accent אחת בלבד", "focus ring accent על כל אינטראקטיבי", "reveal ב-keyframes ולא ב-transition"],
  engine: "טקסט צבעוני קטן תמיד accent-text; אפור על אפרפר תמיד muted-strong; 18px בשדות; reduced-motion מכבה reveal, count-up ו-hover transforms.",
  agent: "עצב מינימליסטי-עריכתי: המון white space, היררכיה טיפוגרפית חזקה (H1/גוף ביחס 3 ומעלה), פלטה נייטרלית עם צבע מבטא אחד בעשרה מקומות סגורים, מסגרת דפדפן כוויז'ואל, הדר דביק עם צל בגלילה, רצועת CTA אחת בצבע המבטא לפני פוטר מלא.",
  mobile: "הדר: ניווט ופעולות נעלמים, כפתור ראשי נשאר. הירו 38px. הסטטים לעמודה, 56px. החבילה המומלצת עולה ראשונה. כפתורים ברוחב מלא, 48px. המסגרת מאבדת את הסרגל הצדדי.",
  fonts: [],
};

export default [
  {
    ...base,
    id: "s05", name: "מינימליזם עריכתי",
    desc: "רק מה שחייב. מרחב נשימה ענק, טיפוגרפיה חזקה, צבע אחד. השקט הוא הלוקסוס. גרסה 2 (7.9.2026): ברמת סטודיו, מול רף 30 הסעיפים.",
    score: "30/30",
    note: "רף הסטודיו: 30/30, כל שבעת ה-★ עוברים. מתח H1/גוף 57/18 = 3.2 · שני משקלים (600 כותרות, 500 תוויות, 400 גוף) · סולם ריווח 112/88/64 ו-4 עד 48 · טיפול ויז'ואל אחד (מסגרת דפדפן, radius 16, צל דרמטי בהירו בלבד) · כפתור בארבעה מצבים ושלוש רמות · reveal אחד ב-keyframes, 0.5s, 16px, בלי stagger מתוכנת · הדר דביק עם צל ופוטר בארבע עמודות · רגע חתימה: המסגרת שחוצה את הגבול והסטט שנספר. בדוק: גלול לאט, עבור על כרטיס וכפתור, Tab בין השדות. הפרטים בכל מצב: MV:s05d.",
    css: PAGE_CSS, html: PAGE_HTML, js: PAGE_JS,
  },
  {
    ...base,
    sub: true, id: "s05d", name: "מינימליזם עריכתי · פרטים",
    desc: "כל רכיב של העור בכל מצב, בבידוד: כפתורים (3 רמות × 5 מצבים), שדות (5 מצבים), כרטיס, באדג', צ'יפים, eyebrow, מספרים, טאבים, אקורדיון, טבלת השוואה, מפרידים ורדיוסים. זה מה שהעין בודקת בזום 200%.",
    score: "",
    note: "המצבים כאן קפואים בכוונה (מחלקות is-hover / is-active / is-focus) כדי שאפשר יהיה לראות את כולם זה לצד זה. בעמוד הייחוס (MV:s05) הם חיים.",
    css: DET_CSS, html: DET_HTML,
  },
];
