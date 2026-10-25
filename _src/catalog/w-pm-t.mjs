// חמש דיאגרמות תהליך והחלטה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// קווים שמתפצלים ואחד נבחר, קו מפותל שהופך לישר, צמתי קלט שמתכנסים להחלטה, קו מקווקו שנדחס בצוואר בקבוק, ומעגל תהליך עם הדגשה שנודדת.
// נבנו מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כולן SVG עם טוקני העיצוב, הטקסטים הם טקסט אמיתי ב-HTML (לא בתוך ה-SVG) והסדר שלהם ב-DOM הוא סדר השלבים.
// בטלפון כל דיאגרמה נבנית מחדש לאורך אנכי, עם סט קווים משלה, ולא מוקטנת.

const f1 = n => +n.toFixed(1);
// צל רך במקום מסגרת: משטח בלי קו מתאר. הצל בלבד נותן לכרטיס לבן קצה על רקע בהיר
const SOFT = "0 1px 2px color-mix(in srgb,var(--ink) 6%,transparent),0 6px 20px color-mix(in srgb,var(--ink) 5%,transparent)";
const SOFT_S = "0 1px 3px color-mix(in srgb,var(--ink) 10%,transparent)";
const pf = p => f1(p[0]) + " " + f1(p[1]);

// ---------------------------------------------------------------------------------------------
// g279: צירים של הפיצול. שורות קבועות בגובה, קווים באזור קבוע בפיקסלים ביניהן, כך שהקו תמיד נוגע בצומת.
// ---------------------------------------------------------------------------------------------
const FK_D = [44, 132, 220, 308];       // מרכזי ארבע השורות בדסקטופ (שורה 88)
const FK_M = [40, 120, 200, 280];       // מרכזי ארבע השורות בטלפון (שורה 80)
const FK_PICK = 1;
const fkDesk = FK_D.map(y => "M120 176C60 176 60 " + y + " 0 " + y);
const fkMob = FK_M.map(y => "M20 0V" + (y - 14) + "Q20 " + y + " 6 " + y + "H0");
const fkSvgD = `<svg class="fk-sd" viewBox="0 0 120 352" aria-hidden="true" focusable="false">${fkDesk.map((d, i) => `<path class="fk-b${i === FK_PICK ? " fk-pk" : ""}" pathLength="1" d="${d}"/>`).join("")}<path class="fk-hot" pathLength="1" d="${fkDesk[FK_PICK]}"/></svg>`;
const fkSvgM = `<svg class="fk-sm" viewBox="0 0 56 320" aria-hidden="true" focusable="false">${fkMob.map((d, i) => `<path class="fk-b${i === FK_PICK ? " fk-pk" : ""}" pathLength="1" d="${d}"/>`).join("")}<path class="fk-hot" pathLength="1" d="${fkMob[FK_PICK]}"/></svg>`;
const fkOpt = (b, s, pick) => `<li class="fk-o${pick ? " fk-pick" : ""}">${pick ? '<span class="sr-only">הדרך שנבחרה: </span>' : ""}<span class="fk-tx"><b>${b}</b><small>${s}</small></span>${pick ? '<span class="fk-chip" aria-hidden="true">נבחר</span>' : ""}</li>`;

// ---------------------------------------------------------------------------------------------
// g281: קווי ההתכנסות. דסקטופ: אזור קבוע בפיקסלים (148 על 288). טלפון: שלושה טורים, אזור ברוחב מלא שנמתח.
// ---------------------------------------------------------------------------------------------
const wtDesk = [48, 144, 240].map(y => "M148 " + y + "C74 " + y + " 74 144 0 144");
const wtMob = [250, 150, 50].map(x => "M" + x + " 0C" + x + " 40 150 40 150 80");

// ---------------------------------------------------------------------------------------------
// g282: צורת הערוץ והמקווקו. הפונקציה עצמה נכנסת גם לקוד הריצה (toString), כדי שהמצב הסטטי במארקאפ והמצב החי יצאו מאותו חישוב.
// vert=false: הזרימה מימין לשמאל (RTL), ה-SVG מתהפך ב-:dir(ltr). vert=true: הזרימה מלמעלה למטה.
// ---------------------------------------------------------------------------------------------
function bnShape(o) {
  var L = o.L, Hh = o.Hh, vert = o.vert, f = o.f, ph = o.ph, P0 = 22, duty = .5;
  var nu = .66 - .52 * f;                      // יחס גובה הצוואר לגובה הקצוות: חנוק .14, פתוח .66
  var J = 2.7 * f;                             // כמה המקווקו מצטופף בצוואר
  var sg = L * .13, c = L / 2;
  var G = function (s) { var q = (s - c) / sg; return Math.exp(-q * q); };
  var hh = function (s) { return Hh * (1 - (1 - nu) * G(s)); };
  var X = vert ? function (s, w) { return o.cx + w; } : function (s, w) { return o.x0 - s; };
  var Y = vert ? function (s, w) { return o.y0 + s; } : function (s, w) { return o.cy + w; };
  var pt = function (s, w) { return X(s, w).toFixed(1) + " " + Y(s, w).toFixed(1); };
  var N = 60, d1 = "", d2 = "", fill = "", i, s;
  for (i = 0; i <= N; i++) { s = L * i / N; d1 += (i ? "L" : "M") + pt(s, -hh(s)); d2 += (i ? "L" : "M") + pt(s, hh(s)); }
  fill = d1;
  for (i = N; i >= 0; i--) { s = L * i / N; fill += "L" + pt(s, hh(s)); }
  fill += "Z";
  // phi: מרחק "בתוך הדפוס". בצוואר ה-phi מתקדם מהר יותר לכל פיקסל, ולכן המקווקו קצר וצפוף שם
  var T = 240, tab = [0];
  for (i = 1; i <= T; i++) { s = L * (i - .5) / T; tab.push(tab[i - 1] + (1 + J * G(s)) * (L / T) / P0); }
  var Phi = tab[T];
  var inv = function (phi) {
    var lo = 0, hi = T, m, a, b;
    while (hi - lo > 1) { m = (lo + hi) >> 1; if (tab[m] < phi) lo = m; else hi = m; }
    a = tab[lo]; b = tab[hi];
    return L * (lo + (b > a ? (phi - a) / (b - a) : 0)) / T;
  };
  var lanes = [], LN = [-1, -.5, 0, .5, 1], j, k, d, lw, off, p0, a, b, q, ph2, s2;
  for (j = 0; j < 5; j++) {
    d = ""; lw = LN[j] * .74; off = (j * .37) % 1;
    for (k = Math.floor(-(ph + off)) - 1; k <= Math.ceil(Phi - (ph + off)) + 1; k++) {
      p0 = k + ph + off;
      a = Math.max(p0, 0); b = Math.min(p0 + duty, Phi);
      if (b - a < .02) continue;
      for (q = 0; q < 4; q++) {
        ph2 = a + (b - a) * q / 3; s2 = inv(ph2);
        d += (q ? "L" : "M") + pt(s2, lw * hh(s2));
      }
    }
    lanes.push(d);
  }
  return { wall: d1 + " " + d2, fill: fill, lanes: lanes };
}
const BN_D = { vert: false, L: 900, Hh: 104, x0: 950, cy: 140, f: 1, ph: 0 };
const BN_M = { vert: true, L: 380, Hh: 130, cx: 170, y0: 30, f: 1, ph: 0 };
const bnSvg = (cls, vb, g) => {
  const S = bnShape(g);
  return `<svg class="${cls}" viewBox="${vb}" aria-hidden="true" focusable="false"><path class="bn-fl" d="${S.fill}"/><path class="bn-wl" d="${S.wall}"/>${S.lanes.map(d => `<path class="bn-ln" d="${d}"/>`).join("")}</svg>`;
};

// ---------------------------------------------------------------------------------------------
// g283: ציר המעגל. אליפסה 880 על 420, ארבעה כרטיסים בזוויות 45, קשתות בין הכרטיסים נחתכות במקום שבו הן יוצאות מהכרטיס.
// ---------------------------------------------------------------------------------------------
const LP = { W: 880, H: 420, cx: 440, cy: 210, rx: 350, ry: 165, hw: 115, hh: 48 };
const lpAng = [-45, -135, -225, -315].map(d => d * Math.PI / 180);
const lpPt = a => [LP.cx + LP.rx * Math.cos(a), LP.cy + LP.ry * Math.sin(a)];
const lpOut = (a, c, pad) => { const p = lpPt(a); return Math.abs(p[0] - c[0]) > LP.hw + pad || Math.abs(p[1] - c[1]) > LP.hh + pad; };
const lpArcs = [0, 1, 2, 3].map(k => {
  const a0 = lpAng[k], a1 = a0 - Math.PI / 2, c0 = lpPt(a0), c1 = lpPt(a1);
  let s = a0, e = a1;
  while (!lpOut(s, c0, 8)) s -= .002;
  while (!lpOut(e, c1, 6)) e += .002;
  const ps = lpPt(s), pe = lpPt(e), dx = LP.rx * Math.sin(e), dy = -LP.ry * Math.cos(e), m = Math.hypot(dx, dy), ux = dx / m, uy = dy / m;
  const w1 = [pe[0] - ux * 11 - uy * 6, pe[1] - uy * 11 + ux * 6], w2 = [pe[0] - ux * 11 + uy * 6, pe[1] - uy * 11 - ux * 6];
  return "M" + pf(ps) + "A" + LP.rx + " " + LP.ry + " 0 0 0 " + pf(pe) + "M" + pf(w1) + "L" + pf(pe) + "L" + pf(w2);
});
const lpPos = lpAng.map(a => { const c = lpPt(a); return { x: f1((LP.W - c[0]) / LP.W * 100), y: f1(c[1] / LP.H * 100) }; });
const lpPosCss = lpPos.map((p, i) => `.lp-n${i + 1}{inset-inline-start:${p.x}%;top:${p.y}%}`).join("\n");
const lpCard = (b, s, i) => `<li class="lp-n lp-n${i}"><div class="lp-c"><b>${b}</b><small>${s}</small><span class="lp-bar" aria-hidden="true"><i></i></span></div>${i < 4 ? `<svg class="lp-am" viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path class="lp-b" d="M12 4V28M6 22L12 30L18 22"/><path class="lp-h" pathLength="1" d="M12 4V28M6 22L12 30L18 22"/></svg>` : ""}</li>`;

export default [
// =============================================================================================
{
  id:"g279", cat:"gsap", name:"קווים שמתפצלים ואחד מהם נבחר", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"מאושר-עין",
  desc:"צומת אחד כבר הושלם, ומתוכו יוצאים ארבעה קווים דקים לארבע אפשרויות. האפשרויות נגלות אחת אחרי השנייה, ואז אחת נבחרת: הקו שלה מתעבה וצובע את עצמו, הצומת מתמלא בצבע ומקבל תווית, והשלוש האחרות נחלשות. הגלילה מובילה את הבחירה, וגלילה אחורה מחזירה את כל האפשרויות לפתוחות.",
  when:"סקשן שמראה איך מכמה כיוונים מגיעים לתוכנית אחת: בחירת מסלול התחלה, חבילה, גרסה מומלצת או כיוון עיצובי. מתאים כשיש שלוש עד ארבע אפשרויות אמיתיות ואחת מהן היא ההמלצה שלכם. לא כשיש רק שתי אפשרויות, ולא כשהבחירה שייכת למבקר ולא לכם. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם מצומת שהושלם יוצאים קווים דקים לצמתי מועמדים, ואחד מהם מתמלא כצעד הבא וקו שלו מתעבה. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** כל הקווים מצוירים, האפשרות הנבחרת מלאה בצבע ועליה התווית, והאחרות חלשות. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (`sticky` בתוך אזור של 300vh) ו-`paint(p)` אחת כותבת את כל המצב מההתקדמות: קווים דרך `stroke-dashoffset` (כל נתיב עם `pathLength=1`), כניסת האפשרויות וההחלשות דרך משתני CSS (`--a`, `--dim`, `--on`), והצבע של כל אפשרות מחושב ב-`color-mix` מהמשתנים האלה, ולכן אין אינטרפולציית צבע ב-JS וגלילה אחורה נכונה בלי קוד נוסף. **הבחירה עצמה:** נתיב נוסף (`.fk-hot`, עובי 4, בצבע accent) מצוייר על גבי הקו הדק של האפשרות הנבחרת. כדי לבחור אפשרות אחרת מחליפים את `fk-pick` ואת האינדקס `FK_PICK` בנתיב, והשאר מחושב. **פריסה:** שורות קבועות בגובה (88 בדסקטופ, 80 בטלפון) ואזור קווים ברוחב קבוע בפיקסלים (120 ו-40) בין העמודות, ולכן הקו תמיד נוגע בצומת בכל רוחב. בטלפון הדיאגרמה אנכית: צומת המקור למעלה וגזע עם ענפים לארבע האפשרויות, בסט SVG משלו. **ל-LTR:** העמודות זורמות לפי כיוון העמוד, ו-`:dir(ltr)` הופך את שני ה-SVG ב-`scaleX(-1)` ואת כיוון הכניסה (`--dx`). אין צורך לשנות דבר, ורק מי שמצייר נתיבים חדשים צריך לזכור שהם מצוירים כשהמקור מימין.",
  libs:["gsap","ScrollTrigger"],
  css:`.fk{--dx:16px;max-width:1120px;margin-inline:auto}
:dir(ltr) .fk{--dx:-16px}
.fk-pin{display:grid;align-content:center;gap:40px}
.fk-head{display:grid;gap:12px;max-width:52ch}
.fk-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.fk-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.fk-d{display:grid;grid-template-columns:minmax(0,.8fr) 120px minmax(0,1.25fr);grid-template-rows:352px;align-items:center}
.fk-src{grid-column:1;grid-row:1;display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:18px;background:var(--card);box-shadow:${SOFT}}
.fk-ck{display:grid;place-items:center;flex:none;width:32px;height:32px;border-radius:50%;background:var(--accent)}
.fk-ck svg{display:block;width:16px;height:16px;fill:none;stroke:var(--accent-ink);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.fk-ckp{stroke-dasharray:1;stroke-dashoffset:0}
.fk-tx{display:grid;gap:4px;min-width:0}
.fk-tx b{font-size:17px;font-weight:700;line-height:1.25}
.fk-tx small{font-size:14px;line-height:1.3;color:var(--muted)}
.fk-sd,.fk-sm{display:block;overflow:visible}
.fk-sd{grid-column:2;grid-row:1;width:120px;height:352px}
.fk-sm{display:none}
.fk-b{fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:0;opacity:.4}
.fk-b.fk-pk{opacity:1}
.fk-hot{fill:none;stroke:var(--accent);stroke-width:4;stroke-dasharray:1;stroke-dashoffset:0}
:dir(ltr) .fk-sd,:dir(ltr) .fk-sm{transform:scaleX(-1)}
.fk-opts{grid-column:3;grid-row:1;list-style:none;margin:0;padding:0;display:grid;grid-template-rows:repeat(4,88px);align-items:center}
.fk-o{--a:1;--on:0;--dim:1;display:flex;align-items:center;gap:12px;height:72px;padding:0 20px;border-radius:16px;
  background:color-mix(in srgb,var(--accent) calc(var(--on) * 100%),var(--card));
  box-shadow:${SOFT};
  opacity:var(--a);transform:translateX(calc(var(--dx) * (1 - var(--a))))}
.fk-pick{--on:1;--dim:0}
.fk-o b{color:color-mix(in srgb,var(--accent-ink) calc(var(--on) * 100%),color-mix(in srgb,var(--muted) calc(var(--dim) * 100%),var(--ink)))}
.fk-o small{color:color-mix(in srgb,var(--accent-ink) calc(var(--on) * 100%),var(--muted))}
.fk-chip{flex:none;margin-inline-start:auto;padding:4px 12px;border-radius:999px;background:var(--accent-ink);color:var(--accent);font-size:13px;font-weight:700;line-height:1.4;opacity:var(--ch,1)}
.fk .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.fk.is-live .fk-run{height:300vh}
.fk.is-live .fk-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .fk-pin{gap:24px}
  .fk-d{grid-template-columns:56px minmax(0,1fr);grid-template-rows:auto 320px}
  .fk-src{grid-column:1 / 3;grid-row:1}
  .fk-sd{display:none}
  .fk-sm{display:block;grid-column:1;grid-row:2;width:56px;height:320px}
  .fk-opts{grid-column:2;grid-row:2;grid-template-rows:repeat(4,80px)}
  .fk-o{height:64px;padding:0 14px}
  .fk.is-live .fk-head p{display:none}
}`,
  html:`<div class="stage"><div class="fk"><div class="fk-run"><div class="fk-pin">
  <div class="fk-head"><h2>אחרי שיחת האפיון מציעים ללקוח ארבע דרכים להתחיל</h2><p>כל דרך מוצגת עם מה שהיא כוללת, והלקוח בוחר את זו שמתאימה לעסק ולתקציב שלו.</p></div>
  <div class="fk-d">
    <div class="fk-src"><span class="fk-ck" aria-hidden="true"><svg viewBox="0 0 16 16"><path class="fk-ckp" pathLength="1" d="M3.4 8.4l3 3 6.2-6.4"/></svg></span><span class="fk-tx"><b>האפיון הסתיים</b><small>שיחה אחת ומסמך מסודר</small></span></div>
    ${fkSvgD}
    ${fkSvgM}
    <ol class="fk-opts">
      ${fkOpt("דף נחיתה אחד", "מהיר, מיועד לקמפיין", false)}
      ${fkOpt("אתר תדמית", "חמישה עמודים וחיפוש בגוגל", true)}
      ${fkOpt("חנות מקוונת", "קטלוג, סל קניות ותשלום", false)}
      ${fkOpt("אתר עם יומן תורים", "לקוחות קובעים בעצמם", false)}
    </ol>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: כל הקווים מצוירים והאפשרות הנבחרת מלאה (במארקאפ)
  const root=document.querySelector(".fk");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const run=root.querySelector(".fk-run"),ckp=root.querySelector(".fk-ckp"),opts=[...root.querySelectorAll(".fk-o")],
    chip=root.querySelector(".fk-chip"),pick=opts.findIndex(o=>o.classList.contains("fk-pick"));
  const cl=v=>Math.min(1,Math.max(0,v)),seg=(p,a,b)=>cl((p-a)/(b-a)),E=gsap.parseEase("power2.inOut"),O=gsap.parseEase("power2.out");
  const put=(el,k,v)=>el.style.setProperty(k,v.toFixed(3));
  const mm=gsap.matchMedia();
  // sel: סט הקווים הגלוי (דסקטופ או טלפון). הסט השני נשאר במצב הסיום ומוסתר ב-CSS
  const build=sel=>{
    const svg=root.querySelector(sel),base=[...svg.querySelectorAll(".fk-b")],hot=svg.querySelector(".fk-hot");
    const paint=p=>{
      const c=seg(p,0,.1);
      ckp.style.strokeDashoffset=(1-O(c)).toFixed(3);ckp.style.opacity=c>0?1:0;
      const dim=E(seg(p,.64,.8)),on=E(seg(p,.7,.84));
      base.forEach((b,i)=>{
        b.style.strokeDashoffset=(1-E(seg(p,.1+i*.07,.3+i*.07))).toFixed(3);
        if(i!==pick)b.style.opacity=(1-.6*dim).toFixed(3);
      });
      opts.forEach((o,i)=>{
        put(o,"--a",O(seg(p,.22+i*.07,.36+i*.07)));
        if(i===pick){put(o,"--dim",0);put(o,"--on",on);}else{put(o,"--dim",dim);put(o,"--on",0);}
      });
      hot.style.strokeDashoffset=(1-E(seg(p,.58,.76))).toFixed(3);
      put(chip,"--ch",O(seg(p,.82,.94)));
    };
    root.classList.add("is-live");paint(0);
    const o={p:0};
    const tw=gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    return()=>{
      tw.scrollTrigger.kill();tw.kill();root.classList.remove("is-live");
      [ckp,chip,hot,...opts,...base].forEach(el=>el.removeAttribute("style"));
    };
  };
  // בהפחתת תנועה שני התנאים לא מתקיימים, ונשאר מצב הסיום
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 600px)",()=>build(".fk-sd"));
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px) and (min-height: 600px)",()=>build(".fk-sm"));
})();`
},
// =============================================================================================
{
  id:"g280", cat:"gsap", name:"קו מפותל שהופך לישר בין שני צמתים", tech:"GSAP · ScrollTrigger scrub · sticky · SVG path", status:"מאושר-עין",
  desc:"בין עיגול לריבוע נמתח קו מפותל עם לולאות, ועליו תלויות ארבע תוויות כמו חרוזים על חוט. בגלילה הלולאות נפתחות לגלים, הגלים מתיישרים לקו אחד, וצבע הקו עובר מאפור לצבע המותג. התוויות נמשכות עם הקו ונעצרות מסודרות לאורכו, בזמן שהצמתים עצמם לא זזים.",
  when:"מעבר מבלגן לסדר: חומרים מפוזרים שהופכים לתוכנית, תהליך עבודה שהיה מסובך והפך לפשוט, מסלול ישיר בין הבקשה למוצר. סקשן ״איך זה עובד״ או ״הבעיה והפתרון״. מתאים כשיש שני קצוות ברורים וארבע דוגמאות לבלגן שביניהם. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם בין עיגול לריבוע יש קו מפותל שמתהדק לקו ישר בזמן שהתוויות נשארות במקומן. נבנה מאפס מהצפייה, בלי MorphSVG. **המארקאפ הוא מצב הסיום:** בלי JS ובהפחתת תנועה רואים עיגול, ריבוע וקו ישר מצבע המותג שעליו ארבע התוויות (קו CSS רגיל מאחורי רשימה). **כשהמהלך רץ** הקו נבנה מחדש בכל פריים ממשוואה פרמטרית, ללא שני נתיבים עם אותו מספר נקודות: לכל נקודה לאורך הקו `s = D·u − b·sin θ` ו-`w = a·cos θ` (טרוכואידה), כאשר `θ = 2π·n·u`. כשהמשרעת `b` גדולה מ-`D/(2πn)` נוצרות לולאות, ובאפס הקו ישר. **`a` יורדת מהר מ-`b`** (חזקה 1.7 של ההתקדמות), ולכן הלולאות משתטחות לאליפסות נמוכות ונעלמות, במקום לעבור דרך חוד חד שמופיע כשהמשרעות שוות. מעטפת חלקה מאפסת את המשרעת בקצוות, כדי שהקו ייכנס לצמתים ישר. **הגיאומטריה נמדדת, לא מקודדת:** מרכזי שני הצמתים ושל כל תווית נמדדים ב-`refresh` של ScrollTrigger, כך שהכיוון (RTL או LTR), הרוחב והפריסה האנכית בטלפון לא דורשים שום היפוך. כל תווית מקבלת היסט שהוא 55 אחוז מההיסט של הקו בנקודה שלה, ולכן היא נמשכת עם הקו בלי להתנגש בשכנות. הצמתים והתוויות מעל ה-SVG (`z-index`) והרקע שלהם אטום, כך שהקו נראה עובר מאחוריהם. **להחליף:** מספר הלולאות (`n`), גובה הבלגן (`a0`) וקצב ההיפתחות (`seg(p,.08,.86)`). הסקשן נעוץ ב-300vh. מתחת ל-1024 הציר אנכי (ארבע התוויות לא נכנסות בין הצמתים), ובמסך נמוך מ-600 המהלך לא נעוץ ומוצג מצב הסיום.",
  libs:["gsap","ScrollTrigger"],
  css:`.sq{max-width:1120px;margin-inline:auto}
.sq-pin{display:grid;align-content:center;gap:40px}
.sq-head{display:grid;gap:12px;max-width:52ch}
.sq-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.sq-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sq-d{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;min-height:300px}
.sq-ov{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;display:none}
.sq.is-live .sq-ov{display:block}
.sq-ln{fill:none;stroke:color-mix(in srgb,var(--accent) calc((1 - var(--k,0)) * 100%),var(--muted));stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.sq-n{position:relative;z-index:1;display:grid;place-content:center;gap:4px;width:152px;height:152px;padding:0 16px;text-align:center}
.sq-n b{font-size:18px;font-weight:700;line-height:1.25}
.sq-n small{font-size:14px;line-height:1.3}
.sq-a{border-radius:50%;background:var(--card);box-shadow:${SOFT}}
.sq-a small{color:var(--muted)}
.sq-b{border-radius:24px;background:var(--accent);color:var(--accent-ink)}
.sq-chips{list-style:none;margin:0;padding:0 24px;position:relative;align-self:stretch;display:flex;align-items:center;justify-content:space-around;gap:12px}
.sq-chips::before{content:"";position:absolute;left:0;right:0;top:50%;height:3px;border-radius:2px;background:var(--accent);transform:translateY(-50%)}
.sq.is-live .sq-chips::before{opacity:0}
.sq-c{position:relative;z-index:1;padding:10px 18px;border-radius:999px;background:var(--card);box-shadow:${SOFT_S};font-size:15px;font-weight:600;line-height:1.3;white-space:nowrap;will-change:transform}
.sq.is-live .sq-run{height:300vh}
.sq.is-live .sq-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:1023px){
  .sq-d{grid-template-columns:minmax(0,1fr);justify-items:center;min-height:0}
  .sq-chips{flex-direction:column;width:100%;height:300px;padding:24px 0}
  .sq-chips::before{left:50%;right:auto;top:0;bottom:0;width:3px;height:auto;transform:translateX(-50%)}
}
@media(max-width:767px){
  .sq-pin{gap:24px}
  .sq-n{width:112px;height:112px;padding:0 8px}
  .sq-n b{font-size:16px}
  .sq-n small{font-size:13px}
  .sq.is-live .sq-head p{display:none}
}`,
  html:`<div class="stage"><figure class="sq" style="margin-block:0"><div class="sq-run"><div class="sq-pin">
  <figcaption class="sq-head"><h2>דרישות מפוזרות שהופכות לתוכנית עבודה אחת</h2><p>הלקוח שולח חומרים מכל כיוון. אנחנו מסדרים אותם למסמך אחד, ומשם ברור מה מתחילים לעשות.</p></figcaption>
  <div class="sq-d">
    <svg class="sq-ov" aria-hidden="true" focusable="false"><path class="sq-ln" d=""/></svg>
    <div class="sq-n sq-a"><b>מה הלקוח שלח</b><small>חומר מכמה ערוצים</small></div>
    <ul class="sq-chips">
      <li class="sq-c">הודעה בוואטסאפ</li>
      <li class="sq-c">הערות מהשיחה</li>
      <li class="sq-c">קובץ במייל</li>
      <li class="sq-c">תמונות מהדרייב</li>
    </ul>
    <div class="sq-n sq-b"><b>תוכנית עבודה</b><small>מה קודם ומה אחר כך</small></div>
  </div>
</div></div></figure></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: עיגול, קו ישר וריבוע עם התוויות על הקו (במארקאפ ו-CSS)
  const root=document.querySelector(".sq");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const run=root.querySelector(".sq-run"),d=root.querySelector(".sq-d"),svg=root.querySelector(".sq-ov"),ln=svg.querySelector(".sq-ln"),
    na=root.querySelector(".sq-a"),nb=root.querySelector(".sq-b"),chips=[...root.querySelectorAll(".sq-c")];
  const cl=v=>Math.min(1,Math.max(0,v)),seg=(p,a,b)=>cl((p-a)/(b-a)),E=gsap.parseEase("power2.inOut");
  let G=null;
  // מעטפת: המשרעת מתאפסת בקצוות, כדי שהקו ייכנס לצמתים ישר
  const env=u=>{const a=cl((u-.06)/.14),b=cl((.94-u)/.14);return a*a*(3-2*a)*b*b*(3-2*b);};
  function measure(){
    chips.forEach(c=>{c.style.transform="";});     // מודדים בלי ההיסט, אחרת המדידה מושפעת מהפריים הקודם
    const r=d.getBoundingClientRect(),mid=el=>{const q=el.getBoundingClientRect();return{x:q.left-r.left+q.width/2,y:q.top-r.top+q.height/2};};
    const A=mid(na),B=mid(nb),dx=B.x-A.x,dy=B.y-A.y,D=Math.hypot(dx,dy),T={x:dx/D,y:dy/D},N={x:-T.y,y:T.x};
    const vert=Math.abs(T.y)>Math.abs(T.x),n=vert?5:6,c0=D/(2*Math.PI*n),a0=Math.min(vert?44:68,3.1*c0);
    const us=chips.map(el=>{const q=mid(el);return cl(((q.x-A.x)*T.x+(q.y-A.y)*T.y)/D);});
    svg.setAttribute("viewBox","0 0 "+r.width.toFixed(1)+" "+r.height.toFixed(1));
    G={A,T,N,D,n,a0,us};
  }
  // נקודה לאורך הקו: s לאורך הציר בין הצמתים, w לרוחב. b (לאורך הציר) יורד לאט מ-a (לרוחב), ולכן הלולאות משתטחות ולא עוברות דרך חוד
  const at=(u,k)=>{const th=2*Math.PI*G.n*u,e=env(u),b=G.a0*k*e,a=G.a0*Math.pow(k,1.7)*e;return{s:G.D*u-b*Math.sin(th),w:a*Math.cos(th)};};
  const xy=(s,w)=>[G.A.x+G.T.x*s+G.N.x*w,G.A.y+G.T.y*s+G.N.y*w];
  function paint(p){
    if(!G)return;
    const k=1-E(seg(p,.08,.86)),M=240;let s="";
    for(let j=0;j<=M;j++){const l=at(j/M,k),q=xy(l.s,l.w);s+=(j?"L":"M")+q[0].toFixed(1)+" "+q[1].toFixed(1);}
    ln.setAttribute("d",s);
    root.style.setProperty("--k",k.toFixed(3));
    chips.forEach((c,i)=>{
      const l=at(G.us[i],k),ds=l.s-G.D*G.us[i],x=(G.T.x*ds+G.N.x*l.w)*.55,y=(G.T.y*ds+G.N.y*l.w)*.55;
      c.style.transform="translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px)";
    });
  }
  // בהפחתת תנועה הפונקציה לא רצה, ונשאר מצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference) and (min-height: 600px)",()=>{
    root.classList.add("is-live");measure();paint(0);
    const o={p:0};
    const tw=gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    const onRefresh=()=>{measure();paint(o.p);};
    ScrollTrigger.addEventListener("refresh",onRefresh);
    return()=>{
      ScrollTrigger.removeEventListener("refresh",onRefresh);
      tw.scrollTrigger.kill();tw.kill();root.classList.remove("is-live");
      chips.forEach(c=>c.removeAttribute("style"));root.style.removeProperty("--k");ln.setAttribute("d","");
    };
  });
})();`
},
// =============================================================================================
{
  id:"g281", cat:"gsap", name:"צמתי קלט שמתכנסים להחלטה", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"מאושר-עין",
  desc:"שלושה צמתי קלט מחוברים בקווים דקים לצומת מרכזי, ועל כל קו משקל קטן. בגלילה הקלטים נדלקים אחד אחד, כל קו מתמלא בצבע, והציון בצומת המרכזי עולה ומראה מאילו חלקים הוא מורכב. כשהציון חוצה את הסף על הסרגל, ההחלטה מימין מתהפכת מ״ממתינים״ ל״מקבלים את הפרויקט״.",
  when:"הסבר איך מתקבלת החלטה: אם לקחת פרויקט, מה נכנס לשיקול בהצעת מחיר, איך נקבע שלב בתהליך. מתאים כשיש שלושה גורמים אמיתיים עם משקל, סף ברור ותוצאה אחת. סקשן ״איך אנחנו מחליטים״, ״איך נבנה המחיר״ או ״איך זה עובד״. לא כשהמשקלות מומצאים, כי הדיאגרמה נראית מדויקת ויוצרת ציפייה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אחד בגלריה של prompt-motion.com (21.10.2026) שבו כמה צמתי קלט מחוברים בקווים לצומת מסכם, עם משקל קטן על כל קו וקריאת סף, והפלט מתהפך מ-0 ל-1. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** שלושת הקלטים דולקים, הציון 1.00 עם הנוסחה המלאה, והחלטה חיובית. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** הסקשן נעוץ (300vh) ו-`paint(p)` אחת כותבת הכל: קווים דרך `stroke-dashoffset`, דליקת כל קלט דרך `--on`, והציון הוא סכום `משקל × הגעה` שמשתנה ברציפות. הנוסחה, מילוי הסרגל והחלטה נגזרים מהציון: ההחלטה מתהפכת (`--f`) כשהציון עובר את הסף, ולכן הסף הוא מספר אחד (`TH`) ולא תזמון. **מספרים:** הציון והנוסחה הם `aria-hidden`, והמשפט הסופי נמצא ב-`sr-only`. **פריסה:** בדסקטופ אזור קווים ברוחב קבוע בפיקסלים (148) בין עמודת הקלטים לצומת המרכזי, ותוויות המשקל ממורכזות עליו. בטלפון הקלטים בשלושה טורים והקווים מתכנסים כלפי מטה בסט SVG נמתח (`preserveAspectRatio=none`, הפרש עובי קטן, ו-`pathLength` נשמר). **ל-LTR:** שני אזורי הקווים מתהפכים ב-`:dir(ltr)` (`scaleX(-1)`), תוויות המשקל ממוקמות ב-`inset-inline-start` והסרגל מתמלא מצד ההתחלה. **להחליף:** מערכי `W` (משקלים) ו-`T` (זמני הדלקה) ו-`TH`, והטקסטים מהמארקאפ.",
  libs:["gsap","ScrollTrigger"],
  css:`.wt{max-width:1120px;margin-inline:auto}
.wt-pin{display:grid;align-content:center;gap:40px}
.wt-head{display:grid;gap:12px;max-width:52ch}
.wt-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.wt-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.wt-d{display:grid;grid-template-columns:minmax(0,1fr) 148px minmax(0,.9fr) 84px minmax(0,.8fr);grid-template-rows:288px;align-items:center}
.wt-in{grid-column:1;grid-row:1;list-style:none;margin:0;padding:0;display:grid;grid-template-rows:repeat(3,96px);align-items:center}
.wt-i{--on:1;display:flex;align-items:center;gap:14px;height:76px;padding:0 18px;border-radius:16px;
  background:color-mix(in srgb,var(--accent) calc(var(--on) * 12%),var(--card));
  box-shadow:${SOFT}}
.wt-dot{flex:none;width:14px;height:14px;border-radius:50%;background:color-mix(in srgb,var(--accent) calc(var(--on) * 100%),var(--line))}
.wt-tx{display:grid;gap:4px;min-width:0}
.wt-tx b{font-size:16px;font-weight:700;line-height:1.25}
.wt-tx small{font-size:14px;line-height:1.3;color:var(--muted)}
.wt-z1{grid-column:2;grid-row:1;position:relative;width:148px;height:288px}
.wt-z2{grid-column:4;grid-row:1;position:relative;width:84px;height:288px}
.wt-sd,.wt-sd2{display:block;overflow:visible;width:100%;height:100%}
.wt-sm,.wt-sm2{display:none;overflow:visible}
:dir(ltr) .wt-sd,:dir(ltr) .wt-sd2,:dir(ltr) .wt-sm,:dir(ltr) .wt-sm2{transform:scaleX(-1)}
.wt-b{fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:1;stroke-dashoffset:0;opacity:.45}
.wt-h,.wt-h2{fill:none;stroke:var(--accent);stroke-width:3.5;stroke-dasharray:1;stroke-dashoffset:0}
.wt-ah{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.wt-w{--on:1;position:absolute;inset-inline-start:50%;top:var(--y);transform:translate(50%,-50%);padding:4px 8px;border-radius:999px;background:var(--card);
  box-shadow:${SOFT_S};
  color:color-mix(in srgb,var(--accent) calc(var(--on) * 100%),var(--muted));font-size:13px;font-weight:700;line-height:1.4;font-variant-numeric:tabular-nums}
:dir(ltr) .wt-w{transform:translate(-50%,-50%)}
.wt-w1{--y:96px;--xm:33.3%}.wt-w2{--y:144px;--xm:50%}.wt-w3{--y:192px;--xm:66.7%}
.wt-sum{--on:1;grid-column:3;grid-row:1;align-self:center;display:grid;gap:10px;padding:20px;border-radius:20px;background:color-mix(in srgb,var(--accent) calc(var(--on) * 6%),var(--card));
  box-shadow:${SOFT}}
.wt-lbl{font-size:14px;font-weight:600;color:var(--muted);line-height:1.3}
.wt-score{justify-self:start;font-size:clamp(40px,4.4vw,60px);font-weight:800;line-height:1;font-variant-numeric:tabular-nums;direction:ltr}
.wt-bar{position:relative;height:8px;border-radius:999px;background:var(--line);overflow:hidden}
.wt-fill{--s:1;position:absolute;inset:0;background:var(--accent);transform:scaleX(var(--s));transform-origin:100% 50%}
:dir(ltr) .wt-fill{transform-origin:0 50%}
.wt-tick{position:absolute;inset-block:0;inset-inline-start:60%;width:2px;background:var(--ink)}
.wt-th{font-size:13px;color:var(--muted);line-height:1.3}
.wt-fx{justify-self:start;padding:4px 10px;border-radius:999px;background:var(--bg);font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;font-family:inherit;direction:ltr}
.wt-out{--f:1;grid-column:5;grid-row:1;align-self:center;display:grid;gap:8px;padding:20px;border-radius:20px;
  background:color-mix(in srgb,var(--accent) calc(var(--f) * 100%),var(--card));
  box-shadow:${SOFT};
  color:color-mix(in srgb,var(--accent-ink) calc(var(--f) * 100%),var(--ink))}
.wt-out small{font-size:14px;font-weight:600;line-height:1.3;color:color-mix(in srgb,var(--accent-ink) calc(var(--f) * 100%),var(--muted))}
.wt-ans{display:grid}
.wt-ans b{grid-area:1 / 1;font-size:clamp(20px,1.8vw,26px);font-weight:700;line-height:1.2}
.wt-yes{opacity:var(--f)}
.wt-no{opacity:calc(1 - var(--f))}
.wt .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.wt.is-live .wt-run{height:300vh}
.wt.is-live .wt-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
  .wt-pin{gap:24px}
  .wt-d{grid-template-columns:minmax(0,1fr);grid-template-rows:auto 80px auto 44px auto;max-width:440px;margin-inline:auto}
  .wt-sm .wt-b{stroke-width:1.6}
  .wt-sm .wt-h{stroke-width:2.6}
  .wt-in{grid-column:1;grid-row:1;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:none;gap:8px}
  .wt-i{flex-direction:column;justify-content:center;height:auto;min-height:104px;padding:12px 8px;gap:8px;text-align:center}
  .wt-tx b{font-size:14px}
  .wt-tx small{display:none}
  .wt-z1{grid-column:1;grid-row:2;width:100%;height:80px}
  .wt-sd{display:none}
  .wt-sm{display:block;width:100%;height:80px}
  .wt-w{inset-inline-start:var(--xm);top:40px}
  .wt-sum{grid-column:1;grid-row:3;padding:16px}
  .wt-z2{grid-column:1;grid-row:4;width:100%;height:44px}
  .wt-sd2{display:none}
  .wt-sm2{display:block;width:44px;height:44px;margin-inline:auto}
  .wt-out{grid-column:1;grid-row:5;padding:16px}
  .wt.is-live .wt-head p{display:none}
}`,
  html:`<div class="stage"><figure class="wt" style="margin-block:0"><div class="wt-run"><div class="wt-pin">
  <figcaption class="wt-head"><h2>איך מחליטים אם לקחת פרויקט חדש</h2><p>שלושה דברים נבחנים, ולכל אחד יש משקל. כשהציון עובר את הסף, אנחנו מתחילים.</p></figcaption>
  <div class="wt-d">
    <ol class="wt-in">
      <li class="wt-i"><span class="wt-dot" aria-hidden="true"></span><span class="wt-tx"><b>התקציב מתאים<span class="sr-only">, משקל 0.40</span></b><small>בהתאם להצעה שאושרה</small></span></li>
      <li class="wt-i"><span class="wt-dot" aria-hidden="true"></span><span class="wt-tx"><b>יש מקום בלוח הזמנים<span class="sr-only">, משקל 0.35</span></b><small>מתחילים תוך שבועיים</small></span></li>
      <li class="wt-i"><span class="wt-dot" aria-hidden="true"></span><span class="wt-tx"><b>הלקוח זמין לשיתוף פעולה<span class="sr-only">, משקל 0.25</span></b><small>משיב בתוך יום עבודה</small></span></li>
    </ol>
    <div class="wt-z1" aria-hidden="true">
      <svg class="wt-sd" viewBox="0 0 148 288" focusable="false">${wtDesk.map(d => `<path class="wt-b" pathLength="1" d="${d}"/>`).join("")}${wtDesk.map(d => `<path class="wt-h" pathLength="1" d="${d}"/>`).join("")}</svg>
      <svg class="wt-sm" viewBox="0 0 300 80" preserveAspectRatio="none" focusable="false">${wtMob.map(d => `<path class="wt-b" pathLength="1" d="${d}"/>`).join("")}${wtMob.map(d => `<path class="wt-h" pathLength="1" d="${d}"/>`).join("")}</svg>
      <span class="wt-w wt-w1">0.40</span><span class="wt-w wt-w2">0.35</span><span class="wt-w wt-w3">0.25</span>
    </div>
    <div class="wt-sum"><span class="wt-lbl">ציון ההתאמה</span><b class="wt-score" aria-hidden="true">1.00</b>
      <span class="wt-bar" aria-hidden="true"><i class="wt-fill"></i><i class="wt-tick"></i></span>
      <span class="wt-th">הסף לקבלת פרויקט: 0.60</span>
      <code class="wt-fx" aria-hidden="true">0.40 + 0.35 + 0.25</code>
      <span class="sr-only">הציון הסופי 1.00, מעל הסף של 0.60.</span></div>
    <div class="wt-z2" aria-hidden="true">
      <svg class="wt-sd2" viewBox="0 0 84 288" focusable="false"><path class="wt-b" pathLength="1" d="M84 144H6"/><path class="wt-h2" pathLength="1" d="M84 144H6"/><path class="wt-ah" d="M14 136L6 144L14 152"/></svg>
      <svg class="wt-sm2" viewBox="0 0 44 44" focusable="false"><path class="wt-b" pathLength="1" d="M22 0V36"/><path class="wt-h2" pathLength="1" d="M22 0V36"/><path class="wt-ah" d="M14 28L22 37L30 28"/></svg>
    </div>
    <div class="wt-out"><small>ההחלטה</small><span class="wt-ans"><b class="wt-yes">מקבלים את הפרויקט</b><b class="wt-no" aria-hidden="true">ממתינים</b></span></div>
  </div>
</div></div></figure></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: שלושת הקלטים דולקים, הציון 1.00 וההחלטה חיובית (במארקאפ)
  const root=document.querySelector(".wt");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const run=root.querySelector(".wt-run"),ins=[...root.querySelectorAll(".wt-i")],wts=[...root.querySelectorAll(".wt-w")],
    sum=root.querySelector(".wt-sum"),fill=root.querySelector(".wt-fill"),sc=root.querySelector(".wt-score"),fx=root.querySelector(".wt-fx"),
    out=root.querySelector(".wt-out"),scText=sc.textContent,fxText=fx.textContent;
  const W=[.40,.35,.25],T=[.08,.32,.56],TH=.6;       // משקלים, זמני הדלקה, סף
  const cl=v=>Math.min(1,Math.max(0,v)),seg=(p,a,b)=>cl((p-a)/(b-a)),E=gsap.parseEase("power2.inOut");
  const put=(el,k,v)=>el.style.setProperty(k,v.toFixed(3));
  const mm=gsap.matchMedia();
  // mob: סט הקווים של הטלפון. הסט השני נשאר במצב הסיום ומוסתר ב-CSS
  const build=mob=>{
    const z1=root.querySelector(mob?".wt-sm":".wt-sd"),z2=root.querySelector(mob?".wt-sm2":".wt-sd2"),
      base=[...z1.querySelectorAll(".wt-b")],hot=[...z1.querySelectorAll(".wt-h")],b2=z2.querySelector(".wt-b"),h2=z2.querySelector(".wt-h2");
    let lastS="",lastF="";
    const paint=p=>{
      let score=0;const terms=[];
      for(let i=0;i<3;i++){
        const on=E(seg(p,T[i]-.02,T[i]+.06)),arr=E(seg(p,T[i]+.1,T[i]+.22));
        base[i].style.strokeDashoffset=(1-E(seg(p,.02*i,.1+.02*i))).toFixed(3);
        hot[i].style.strokeDashoffset=(1-E(seg(p,T[i],T[i]+.14))).toFixed(3);
        put(ins[i],"--on",on);put(wts[i],"--on",on);
        score+=W[i]*arr;if(arr>.5)terms.push(W[i].toFixed(2));
      }
      put(sum,"--on",cl(score/.75));put(fill,"--s",score);
      const s=score.toFixed(2),f=terms.length?terms.join(" + "):"0.00";
      if(s!==lastS){lastS=s;sc.textContent=s;}
      if(f!==lastF){lastF=f;fx.textContent=f;}
      b2.style.strokeDashoffset=(1-E(seg(p,.1,.2))).toFixed(3);
      h2.style.strokeDashoffset=(1-E(seg(score,.3,.7))).toFixed(3);
      put(out,"--f",E(seg(score,TH-.08,TH+.08)));
    };
    root.classList.add("is-live");paint(0);
    const o={p:0};
    const tw=gsap.to(o,{p:1,ease:"none",onUpdate:()=>paint(o.p),
      scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.4,invalidateOnRefresh:true}});
    return()=>{
      tw.scrollTrigger.kill();tw.kill();root.classList.remove("is-live");
      [...base,...hot,b2,h2,...ins,...wts,sum,fill,out].forEach(el=>el.removeAttribute("style"));
      sc.textContent=scText;fx.textContent=fxText;
    };
  };
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 600px)",()=>build(false));
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px) and (min-height: 600px)",()=>build(true));
})();`
},
// =============================================================================================
{
  id:"g282", cat:"gsap", name:"קו מקווקו שנדחס דרך צוואר בקבוק", tech:"GSAP ticker · SVG · IntersectionObserver by ScrollTrigger", status:"ממתין",
  desc:"ערוץ בצורת שעון חול, ובתוכו חמישה קווים מקווקווים שזורמים מצד אחד לשני. בצוואר הערוץ הקווים מתקרבים והמקווקו מתקצר ומצטופף ומתקדם לאט, ומעבר לצוואר הוא חוזר להיות רגיל. אחרי כמה שניות הצוואר נפתח, הצפיפות נעלמת והזרימה חופשית, ואז הוא נסגר שוב. התנועה רצה רק כשהסקשן על המסך.",
  when:"להראות איפה תהליך נתקע ומה פותר את זה: אישור לקוח שמעכב את העבודה, מאשר יחיד בתהליך, שלב שכולם מחכים לו. סקשן ״הבעיה והפתרון״ או ״איך אנחנו עובדים״. מתאים כשיש צוואר בקבוק אמיתי ופתרון ברור, כי הדיאגרמה מציגה את שניהם. לא כשאין פתרון, שאז היא רק מציגה תקלה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אחד בגלריה של prompt-motion.com (21.10.2026) שבו קו מקווקו נדחס בצוואר של צורת שעון חול וממשיך חופשי אחריו. נבנה מאפס מהצפייה. **המארקאפ הוא תמונת הצפיפות:** בלי GSAP ובהפחתת תנועה רואים ערוץ עם צוואר צר וחמישה קווים מקווקווים שמצטופפים בו, כפי שהם נראים בשנייה הראשונה של המהלך (אותה פונקציה, `bnShape`, מחשבת את המארקאפ ואת הפריימים). **הדחיסה אינה `stroke-dasharray`:** דפוס מקווקו אחיד אינו יכול להצטופף במקום אחד. במקום זה כל קו הוא נתיב אחד שמורכב מקטעים נפרדים, וכל קטע ממוקם לפי `phi`, מרחק ״בתוך הדפוס״ שמתקדם מהר יותר לכל פיקסל בצוואר (צפיפות `1 + J·G(s)`, כאשר G הוא פעמון סביב מרכז הערוץ). לכן הקטעים קצרים וצפופים בצוואר, והזמן שלהם בו ארוך יותר (הם נראים איטיים). בהתקדמות הדפוס הקטעים זזים, והנתיב נבנה מחדש בכל פריים (כ-1400 נקודות). **הצוואר נפתח ונסגר:** `f` בין 1 (חנוק) ל-0 (פתוח) במחזור של 14 שניות. הוא קובע גם את רוחב הצוואר (`nu`), גם את הצפיפות (`J`) וגם את ההחלפה בין שתי שורות ההסבר. **הרצה:** `gsap.ticker`, שנכנס כשהסקשן על המסך (ScrollTrigger עם `onToggle`) ויוצא כשהוא יוצא, כך שאין עבודה ברקע. **פריסה:** בדסקטופ הערוץ אופקי ומתרחב ברוחב הסקשן (viewBox 1000 על 280, בלי טקסט בתוכו), ובטלפון הוא אנכי, שעון חול אמיתי, בסט משלו. תוויות הכניסה והיציאה הן HTML. **ל-LTR:** הערוץ מצויר כשהכניסה מימין, ו-`:dir(ltr)` הופך את ה-SVG ב-`scaleX(-1)`, כך שהזרימה תמיד מתחילה בצד הקריאה. **להחליף:** `P0` (אורך מחזור המקווקו), `LN` (מספר הקווים ומיקומם), `CYC` ו-`fAt` (קצב החנק והפתיחה).",
  libs:["gsap","ScrollTrigger"],
  css:`.bn{--op:0;max-width:1120px;margin-inline:auto}
.bn-head{display:grid;gap:12px;max-width:52ch;margin-bottom:48px}
.bn-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.bn-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.bn-d{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px 24px}
.bn-cv{grid-column:1 / 3;grid-row:1;position:relative}
.bn-sd,.bn-sm{display:block;width:100%;height:auto;overflow:visible}
.bn-sm{display:none}
:dir(ltr) .bn-sd,:dir(ltr) .bn-sm{transform:scaleX(-1)}
.bn-fl{fill:color-mix(in srgb,var(--accent) 7%,var(--card));stroke:none}
.bn-wl{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.bn-ln{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.bn-nk{position:absolute;left:50%;top:0;transform:translateX(-50%);display:grid;justify-items:center;gap:6px;text-align:center}
.bn-nk b{padding:6px 14px;border-radius:999px;background:var(--card);box-shadow:${SOFT_S};font-size:15px;font-weight:700;line-height:1.3;white-space:nowrap}
.bn-nk::after{content:"";width:2px;height:100px;background:var(--line);transform-origin:50% 0;transform:scaleY(calc(1 - .62 * var(--op)))}
.bn-in{grid-column:1;grid-row:2;font-size:16px;font-weight:600;line-height:1.4}
.bn-out{grid-column:2;grid-row:2;justify-self:end;font-size:16px;font-weight:600;line-height:1.4}
.bn-cap{grid-column:1 / 3;grid-row:3;display:grid;margin:8px 0 0;padding:16px 20px;border-radius:16px;background:var(--card);box-shadow:${SOFT};font-size:var(--fs-body);line-height:1.5}
.bn-cap span{grid-area:1 / 1}
.bn-s1{opacity:calc(1 - var(--op))}
.bn-s2{opacity:var(--op)}
.bn .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){
  .bn-head{margin-bottom:32px}
  .bn-d{grid-template-columns:minmax(0,1fr);gap:8px}
  .bn-in{grid-column:1;grid-row:1}
  .bn-cv{grid-column:1;grid-row:2;max-width:340px;width:100%;justify-self:center}
  .bn-out{grid-column:1;grid-row:3;justify-self:start}
  .bn-sd{display:none}
  .bn-sm{display:block}
  .bn-nk{left:auto;inset-inline-end:0;top:50%;transform:translateY(-50%);display:flex;flex-direction:row;align-items:center;gap:8px}
  .bn-nk::after{display:none}
  .bn-nk::before{content:"";width:32px;height:2px;background:var(--line)}
  .bn-cap{grid-column:1;grid-row:4}
}`,
  html:`<div class="stage"><div class="bn">
  <div class="bn-head"><h2>כל הבקשות עוברות דרך אישור אחד</h2><p>עד שהלקוח מאשר את העיצוב, העבודה עומדת במקום. אחרי שמוסיפים מאשר שני, הבקשות ממשיכות להתקדם.</p></div>
  <div class="bn-d">
    <p class="bn-in">בקשות חדשות מהלקוחות</p>
    <div class="bn-cv">
      ${bnSvg("bn-sd", "0 0 1000 280", BN_D)}
      ${bnSvg("bn-sm", "0 0 340 440", BN_M)}
      <div class="bn-nk"><b>אישור העיצוב</b></div>
    </div>
    <p class="bn-out">עבודה שמתקדמת</p>
    <p class="bn-cap" aria-hidden="true"><span class="bn-s1">כרגע אדם אחד מאשר, וכל השאר מחכים בתור.</span><span class="bn-s2">עם מאשר שני התור זז, והעבודה מתקדמת.</span></p>
    <p class="sr-only">הבקשות מצטופפות בשלב אישור העיצוב כשרק אדם אחד מאשר. אחרי שמוסיפים מאשר שני הן עוברות בלי עיכוב.</p>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: ערוץ עם צוואר צר והמקווקו מצטופף בו (במארקאפ)
  const root=document.querySelector(".bn");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  ${bnShape.toString()}
  const CYC=14,sm=(a,b,t)=>{const x=Math.min(1,Math.max(0,(t-a)/(b-a)));return x*x*(3-2*x);};
  // f: 1 חנוק, 0 פתוח. חנוק עד 5.6 שניות, נפתח עד 7.2, פתוח עד 11.8, נסגר עד 13.4
  const fAt=t=>{const c=t%CYC;return 1-sm(5.6,7.2,c)+sm(11.8,13.4,c);};
  const mm=gsap.matchMedia();
  const build=mob=>{
    const svg=root.querySelector(mob?".bn-sm":".bn-sd"),wall=svg.querySelector(".bn-wl"),fl=svg.querySelector(".bn-fl"),lanes=[...svg.querySelectorAll(".bn-ln")];
    const g=mob?{vert:true,L:380,Hh:130,cx:170,y0:30}:{vert:false,L:900,Hh:104,x0:950,cy:140};
    const keep=[wall.getAttribute("d"),fl.getAttribute("d"),...lanes.map(l=>l.getAttribute("d"))];
    let lastF=-1;
    const tick=()=>{
      const t=gsap.ticker.time,f=fAt(t),S=bnShape(Object.assign({f:f,ph:(t*1.9)%1},g));
      if(Math.abs(f-lastF)>.002){wall.setAttribute("d",S.wall);fl.setAttribute("d",S.fill);root.style.setProperty("--op",(1-f).toFixed(3));lastF=f;}
      lanes.forEach((l,i)=>l.setAttribute("d",S.lanes[i]));
    };
    // רץ רק כשהסקשן על המסך
    const st=ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:s=>{if(s.isActive)gsap.ticker.add(tick);else gsap.ticker.remove(tick);}});
    if(st.isActive)gsap.ticker.add(tick);
    return()=>{
      st.kill();gsap.ticker.remove(tick);
      wall.setAttribute("d",keep[0]);fl.setAttribute("d",keep[1]);lanes.forEach((l,i)=>l.setAttribute("d",keep[i+2]));
      root.style.removeProperty("--op");
    };
  };
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)",()=>build(false));
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)",()=>build(true));
})();`
},
// =============================================================================================
{
  id:"g283", cat:"gsap", name:"מעגל תהליך עם הדגשה שנודדת", tech:"GSAP timeline loop · SVG ring · CSS variables", status:"מאושר-עין",
  desc:"ארבעה שלבים סביב מעגל, עם חצים מעוגלים ביניהם. הדגשה עוברת משלב לשלב: השלב נדלק, פס ההתקדמות שבתוכו מתמלא, החץ אל השלב הבא מצטייר, והשלב הבא נדלק. אחרי הרביעי המחזור מתאפס וחוזר מההתחלה, והתנועה נעצרת כשהסקשן יוצא מהמסך. בטלפון המעגל הופך לרשימה אנכית עם חץ חזרה בצד.",
  when:"שירות שחוזר על עצמו: תחזוקה חודשית של אתר, מחזור קמפיין, בדיקה תקופתית, ריטיינר. מתאים כשיש ארבעה עד חמישה שלבים בסדר קבוע והמחזור חוזר מההתחלה, כי המעגל מראה את זה בלי להסביר. לא לתהליך שיש לו סוף, כמו פרויקט חד פעמי. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: סרטון אחד בגלריה של prompt-motion.com (21.10.2026) שבו צמתים יושבים על טבעת עם חצים ביניהם, הדגשה עוברת ביניהם ופסי התקדמות מתמלאים לכל צומת. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** כל ארבעת השלבים דולקים, כל הפסים מלאים וכל החצים בצבע. בלי GSAP ובהפחתת תנועה זה מה שמוצג, ואפשר לקרוא את הסדר מהרשימה. **הגיאומטריה נחשבת בזמן בנייה:** אליפסה 880 על 420, ארבעה כרטיסים בזוויות 45 מעלות, וכל קשת נחתכת בנקודה שבה היא יוצאת מהכרטיס שלה ונכנסת לכרטיס הבא (דגימת נקודות מול מלבן הכרטיס), עם ראש חץ בכיוון המשיק. הכרטיסים ממוקמים באחוזים ובמאפייני `inset-inline-start`. **כשהמהלך רץ** טיימליין אחד עם `repeat:-1` מזיז משתני CSS: `--act` על הכרטיס (דולק או לא), `--b` על הפס (מילוי), ו-`stroke-dashoffset` על קשת ההדגשה (כל קשת עם `pathLength=1` וראש החץ באותו נתיב, ולכן הוא מופיע אחרון). בסוף המחזור הכל מתאפס בחצי שנייה. הטיימליין נעצר כשהסקשן מחוץ למסך (ScrollTrigger עם `onToggle`). **בטלפון** (פחות מ-1000) אותה רשימה `ol` הופכת לעמודה, החצים בין הכרטיסים הם SVG קטן בתוך כל פריט, וחץ החזרה מהרביעי לראשון הוא סוגר בצד ההתחלה של העמודה (גובה כל כרטיס 96 וכל מרווח 36, ולכן ה-SVG בגובה קבוע). סדר השלבים הוא סדר ה-DOM, והחצים והפסים `aria-hidden`. **ל-LTR:** מיקום הכרטיסים לוגי (`inset-inline-start`) וה-SVG מתהפך ב-`:dir(ltr)`, כך שהמעגל זורם נגד כיוון השעון מימין למעלה ב-RTL, ובכיוון השעון משמאל למעלה ב-LTR, תמיד לפי כיוון הקריאה. **להחליף:** מספר השלבים דורש גם זוויות חדשות במערך `lpAng` בקוד הבנייה, וקצב ההדגשה הוא `SLOT`.",
  libs:["gsap","ScrollTrigger"],
  css:`.lp{max-width:1120px;margin-inline:auto}
.lp-head{display:grid;gap:12px;max-width:52ch;margin-bottom:56px}
.lp-head h2{margin:0;font-size:clamp(28px,3.2vw,48px);font-weight:700;line-height:1.12;text-wrap:balance}
.lp-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.lp-ring{position:relative;width:min(100%,880px);aspect-ratio:880 / 420;margin-inline:auto}
.lp-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
:dir(ltr) .lp-svg{transform:scaleX(-1)}
.lp-b{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.5}
.lp-h{fill:none;stroke:var(--accent);stroke-width:3.5;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:0}
.lp-mid{position:absolute;inset:0;display:grid;place-content:center;gap:4px;margin:0;text-align:center;pointer-events:none}
.lp-mid b{font-size:20px;font-weight:700;line-height:1.3}
.lp-mid span{font-size:14px;color:var(--muted);line-height:1.3}
.lp-ol{list-style:none;margin:0;padding:0}
.lp-n{--act:1;--b:1;position:absolute;width:230px;transform:translate(50%,-50%)}
:dir(ltr) .lp-n{transform:translate(-50%,-50%)}
${lpPosCss}
.lp-c{box-sizing:border-box;height:96px;display:grid;align-content:center;gap:4px;padding:0 20px;border-radius:16px;
  background:color-mix(in srgb,var(--accent) calc(var(--act) * 14%),var(--card));
  box-shadow:${SOFT}}
.lp-c b{font-size:17px;font-weight:700;line-height:1.25}
.lp-c small{font-size:14px;line-height:1.3;color:var(--muted)}
.lp-bar{display:block;height:6px;margin-top:6px;border-radius:999px;background:var(--line);overflow:hidden}
.lp-bar i{display:block;height:100%;background:var(--accent);transform:scaleX(var(--b));transform-origin:100% 50%}
:dir(ltr) .lp-bar i{transform-origin:0 50%}
.lp-am,.lp-br{display:none}
@media(max-width:999px){
  .lp-head{margin-bottom:40px}
  .lp-ring{width:100%;max-width:520px;aspect-ratio:auto;container-type:normal}
  .lp-svg,.lp-mid{display:none}
  .lp-ol{position:relative;display:grid;padding-inline-end:48px}
  .lp-n{position:static;width:auto;transform:none;display:grid;grid-template-rows:96px 36px}
  :dir(ltr) .lp-n{transform:none}
  .lp-n4{grid-template-rows:96px}
  .lp-am{display:block;width:24px;height:36px;justify-self:center;overflow:visible}
  .lp-br{display:block;position:absolute;inset-block:0;inset-inline-end:0;width:48px;height:100%;overflow:visible}
  :dir(ltr) .lp-br{transform:scaleX(-1)}
}
.lp .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
  html:`<div class="stage"><div class="lp">
  <div class="lp-head"><h2>כל חודש האתר עובר אותו מחזור</h2><p>הסדר קבוע, ולכן הלקוח יודע מה קורה עם האתר גם כשהוא לא חושב עליו.</p></div>
  <div class="lp-ring">
    <svg class="lp-svg" viewBox="0 0 ${LP.W} ${LP.H}" aria-hidden="true" focusable="false">${lpArcs.map(d => `<path class="lp-b" d="${d}"/>`).join("")}${lpArcs.map(d => `<path class="lp-h" pathLength="1" d="${d}"/>`).join("")}</svg>
    <p class="lp-mid"><b>מחזור חודשי</b><span>חוזר מההתחלה כל חודש</span></p>
    <ol class="lp-ol">
      ${lpCard("סורקים את האתר", "מהירות, נגישות ושגיאות", 1)}
      ${lpCard("מעדכנים ומתקנים", "תוספים, תוכן ותקלות", 2)}
      ${lpCard("בודקים שהכל עובד", "טפסים, תשלום וטלפון", 3)}
      ${lpCard("שולחים דוח ללקוח", "מה נעשה ומה בא אחר כך", 4)}
    </ol>
    <svg class="lp-br" viewBox="0 0 48 492" aria-hidden="true" focusable="false"><path class="lp-b" d="M46 444H22Q10 444 10 432V60Q10 48 22 48H44M38 42L45 48L38 54"/><path class="lp-h" pathLength="1" d="M46 444H22Q10 444 10 432V60Q10 48 22 48H44M38 42L45 48L38 54"/></svg>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: כל השלבים דולקים, הפסים מלאים והחצים בצבע (במארקאפ)
  const root=document.querySelector(".lp");if(!root)return;
  gsap.registerPlugin(ScrollTrigger);
  const nodes=[...root.querySelectorAll(".lp-n")],bars=[...root.querySelectorAll(".lp-bar")];
  const SLOT=2.6,mm=gsap.matchMedia();
  // mob: רשימה אנכית. הקשת הרביעית (חזרה לראשון) היא הסוגר שבצד
  const build=mob=>{
    const arcs=mob?[...root.querySelectorAll(".lp-am .lp-h"),root.querySelector(".lp-br .lp-h")]:[...root.querySelectorAll(".lp-svg .lp-h")];
    gsap.set(nodes,{"--act":0});gsap.set(bars,{"--b":0});gsap.set(arcs,{strokeDashoffset:1});
    const tl=gsap.timeline({repeat:-1,paused:true}),end=nodes.length*SLOT;
    nodes.forEach((n,i)=>{
      const t=i*SLOT;
      tl.to(n,{"--act":1,duration:.35,ease:"power1.out"},t)
        .to(bars[i],{"--b":1,duration:SLOT-.6,ease:"none"},t+.15)
        .to(arcs[i],{strokeDashoffset:0,duration:.7,ease:"power1.inOut"},t+SLOT-.75);
      if(i<nodes.length-1)tl.to(n,{"--act":0,duration:.35,ease:"power1.in"},t+SLOT);
    });
    // סוף המחזור: הכל מתאפס, והשלב הראשון נדלק מחדש בהתחלה הבאה
    tl.to(nodes[nodes.length-1],{"--act":0,duration:.5},end+.2).to(bars,{"--b":0,duration:.5},end+.2).to(arcs,{strokeDashoffset:1,duration:.5},end+.2);
    // רץ רק כשהסקשן על המסך
    const st=ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:s=>{if(s.isActive)tl.play();else tl.pause();}});
    if(st.isActive)tl.play();
    return()=>{
      st.kill();tl.kill();
      nodes.forEach(n=>n.style.removeProperty("--act"));bars.forEach(b=>b.style.removeProperty("--b"));
      arcs.forEach(a=>a.removeAttribute("style"));
    };
  };
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1000px)",()=>build(false));
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 999px)",()=>build(true));
})();`
},
];
