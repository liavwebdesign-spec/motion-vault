// מהלכי צורות ורקעים אווירתיים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה, לא אתר גלילה. נבחרו דפוסים שחוזרים בכמה סרטונים ושמתורגמים לסקשן באתר עסקי,
// ונבנו מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל שכבה אווירתית משרתת סקשן אמיתי עם טקסט בעברית מעליה, ובכל קנבס יש מצב סטטי שלם בלי JS ובהפחתת תנועה.
// הצבעים בקנבס נקראים מהטוקנים בזמן ריצה, והציור מקובץ לפי צבע כדי לשמור אותו קל.
// ---- חישובי זמן בנייה: ה-SVG הסטטי של כל פריט נוצר מאותה נוסחה שהקנבס או הטיימליין משתמשים בה ----

// b96: שדה זרימה חלק. הזווית משתנה לאט בין תאים שכנים (עד כ-6 מעלות לתא), ולכן הקווים יוצרים זרמים ולא רעש.
// הקואורדינטות נמדדות ממרכז הלוח, והתזוזה והאורך של כל תא נגזרים מהאינדקס שלו ביחס למרכז (לא מ-Math.random),
// כך שה-SVG הסטטי והקנבס מציירים בדיוק את אותם קווים. כל הפונקציות נכנסות גם לסקריפט דרך toString
const FF_STEP = 22, FF_DRIFT = 32;
const ffAngle = (x, y, t) => -.2 + .55 * Math.sin(x * .55 + y * .4 + t * .3) + .45 * Math.cos(y * .8 - x * .3 - t * .24) + .3 * Math.sin((x + y) * .95 + t * .42);
const ffRand = n => { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); };
// דרגת הצבע (0 עד 4) לפי הסטייה של הקו מכיוון הבסיס: 0 = זרם רגוע, 4 = מערבולת
const ffDev = a => { let d = (((a + .2) % Math.PI) + Math.PI) % Math.PI; if (d > Math.PI / 2) d -= Math.PI; return Math.min(4, Math.floor(Math.abs(d) / 1.6 * 5)); };
const ffSvg = (() => {
  const W = 1200, H = 480, S = FF_STEP, cols = Math.ceil(W / S) | 1, rows = Math.ceil(H / S) | 1, P = [[], [], [], [], []];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const ii = i - (cols - 1) / 2, jj = j - (rows - 1) / 2;
    const x = W / 2 + (ii + (ffRand(ii * 127.1 + jj * 311.7) - .5) * .5) * S, y = H / 2 + (jj + (ffRand(ii * 269.5 + jj * 183.3) - .5) * .5) * S;
    const h = S * .46 * (.75 + .5 * ffRand(ii * 419.2 + jj * 371.9));
    const a = ffAngle((x - W / 2 + FF_DRIFT * .4) / 180, (y - H / 2) / 180, .4);
    const dx = Math.cos(a) * h, dy = Math.sin(a) * h;
    P[ffDev(a)].push("M" + (x - dx).toFixed(1) + " " + (y - dy).toFixed(1) + "l" + (2 * dx).toFixed(1) + " " + (2 * dy).toFixed(1));
  }
  return P.map((p, i) => `<path class="hf-l${i}" d="${p.join("")}"/>`).join("");
})();

// b97: צללית חוף (כף רחוקה עם אורות של עיירה, סירות עם תורנים, מזח עם פנסים) כ-symbol אחד. אותה צללית נכנסת לשמיים
// ופעם נוספת להשתקפות ההפוכה, כי קווים אנכיים וכתמי אור הם מה שהאדווה מראה הכי טוב
const hwShore = (() => {
  let dark = "", lit = "", glow = "";
  // a far headland, not drawn buildings: one soft ridge, and the town is only its lights, small and uneven along the water
  dark += `<path d="M0 200V170C46 162 96 151 146 153C196 155 226 146 276 150C336 155 386 167 456 176C546 187 646 196 720 200Z"/>`;
  let sd = 9;
  const rnd = () => (sd = (sd * 1664525 + 1013904223) >>> 0) / 4294967296;
  for (let k = 0; k < 46; k++) { const x = 16 + rnd() * 440, y = 179 + rnd() * 13; lit += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.9 + rnd() * 1.1).toFixed(1)}"/>`; }
  [[560, 92], [640, 68], [735, 84]].forEach(([x, h]) => {
    dark += `<path d="M${x - 24} 191H${x + 24}L${x + 16} 200H${x - 16}Z"/><rect x="${x - 1}" y="${200 - h}" width="2.5" height="${h - 8}"/><path d="M${x + 4} ${204 - h}V184H${x + 30}Z"/>`;
  });
  dark += `<rect x="870" y="187" width="700" height="4"/>`;
  for (let x = 880; x < 1570; x += 52) dark += `<rect x="${x}" y="191" width="3" height="9"/>`;
  for (let k = 0; k < 6; k++) {
    const x = 930 + k * 110;
    dark += `<rect x="${x}" y="154" width="3" height="33"/>`;
    lit += `<circle cx="${x + 1.5}" cy="152" r="3.6"/>`;
    glow += `<circle cx="${x + 1.5}" cy="152" r="17"/>`;
  }
  return `<symbol id="hw-shore" viewBox="0 0 1600 200"><g fill="url(#hw-glow)">${glow}</g><g fill="rgb(5,8,22)">${dark}</g><g fill="rgb(255,208,132)">${lit}</g></symbol>`;
})();

// g259: 144 נקודות בזווית הזהב. נקודה i יושבת ברדיוס c*sqrt(i) ובזווית i*137.5 מעלות, והצבע עובר ממרכז החוצה
const gaDots = (() => {
  const N = 144, c = 14.2, ga = Math.PI * (3 - Math.sqrt(5)), out = [];
  for (let i = 0; i < N; i++) {
    const r = c * Math.sqrt(i + .5), a = i * ga, b = Math.min(7, Math.floor(i / N * 8));
    out.push(`<circle class="hd-d hd-c${b}" cx="${(184 + r * Math.cos(a)).toFixed(1)}" cy="${(184 + r * Math.sin(a)).toFixed(1)}" r="${(c * .62).toFixed(1)}"/>`);
  }
  return out.join("");
})();

// b98: רשת ספרות סטטית (מצב בלי JS). מחולל פסאודו-אקראי קבוע, כדי שהבנייה תהיה זהה בכל הרצה
const digitGrid = (() => {
  let s = 20261021;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296, rows = [];
  for (let r = 0; r < 34; r++) { let line = ""; for (let k = 0; k < 110; k++) line += Math.floor(rnd() * 10); rows.push(line); }
  return rows.join("\n");
})();

// css41: צללי עלים. ענפים עם עלים בצורת טיפה, מחושבים בזמן בנייה; הטשטוש בתוך ה-SVG, כך שהשכבה הנעה מצוירת פעם אחת
const leafShadow = (seed, branches, size, blurId) => {
  let s = seed;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296, LEAF = "M0 0C10 -15 36 -15 60 0C36 15 10 15 0 0Z", out = [];
  for (let b = 0; b < branches; b++) {
    const ang = 142 + rnd() * 26, len = 560 + rnd() * 200, sx = 780 + rnd() * 90, sy = -40 + b * (300 / branches) + rnd() * 80;
    const bend = (rnd() - .5) * 140, ca = Math.cos(ang * Math.PI / 180), sa = Math.sin(ang * Math.PI / 180);
    const ex = sx + ca * len, ey = sy + sa * len, mx = (sx + ex) / 2 - sa * bend, my = (sy + ey) / 2 + ca * bend;
    out.push(`<path d="M${sx.toFixed(0)} ${sy.toFixed(0)}Q${mx.toFixed(0)} ${my.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}" fill="none" stroke="currentColor" stroke-width="${(size * .07).toFixed(1)}"/>`);
    const n = 15 + Math.floor(rnd() * 5);
    for (let i = 0; i < n; i++) {
      const t = .12 + .88 * i / (n - 1), u = 1 - t;
      const x = u * u * sx + 2 * u * t * mx + t * t * ex, y = u * u * sy + 2 * u * t * my + t * t * ey;
      const side = i % 2 ? 1 : -1, la = ang + side * (38 + rnd() * 26), sc = size * (.75 + rnd() * .5) * (1 - t * .25) / 60;
      out.push(`<path d="${LEAF}" transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${la.toFixed(0)}) scale(${sc.toFixed(2)})" fill="currentColor"/>`);
    }
  }
  return `<g filter="url(#${blurId})">${out.join("")}</g>`;
};

// g260: סריג יהלומים שנשזר: שתי משפחות אלכסונים, וכל חיתוך נפתח באחת מהן לסירוגין, כך שנוצרת אריגה
const lattice = (() => {
  const S = 512, s = 64, gx = 8 / Math.SQRT2, MAXLEN = S * Math.SQRT2, segs = [], f = n => n.toFixed(1);
  const dur = len => .18 + .42 * len / MAXLEN;
  // משפחה 0: x+y=a (אלכסון עולה), משפחה 1: x-y=b (אלכסון יורד). כל קו נצבע מהקצה הימני, כי העמוד עברי
  for (let fam = 0; fam < 2; fam++) {
    const idxs = fam ? Array.from({ length: 15 }, (_, i) => i - 7) : Array.from({ length: 15 }, (_, i) => i + 1);
    for (const k of idxs) {
      const c = k * s, x0 = fam ? Math.max(0, c) : Math.max(0, c - S), x1 = fam ? Math.min(S, S + c) : Math.min(S, c);
      const y = x => fam ? x - c : c - x, len = (x1 - x0) * Math.SQRT2;
      const cross = [];
      for (let m = fam ? 1 : -7; m <= (fam ? 15 : 7); m++) {
        const a = fam ? m * s : c, b = fam ? c : m * s, xc = (a + b) / 2, yc = (a - b) / 2;
        if (xc <= x0 + 1 || xc >= x1 - 1 || yc <= 1 || yc >= S - 1) continue;
        const kk = fam ? m : k, mm = fam ? k : m, under = fam ? (kk + mm) % 2 !== 0 : (kk + mm) % 2 === 0;
        if (under) cross.push(xc);
      }
      cross.sort((p, q) => p - q);
      let cur = x0;
      const parts = [];
      for (const xc of cross) { if (xc - gx > cur + .5) parts.push([cur, xc - gx]); cur = xc + gx; }
      if (x1 > cur + .5) parts.push([cur, x1]);
      const order = fam ? 7 - k : 15 - k;   // מי מתחיל קודם: מהצד הימני העליון, ובמשפחה השנייה מהימני התחתון
      for (const [xa, xb] of parts) {
        // כיוון הציור: מימין לשמאל. ta ו-tb הם חלקי הקו (0 בקצה הימני)
        const ta = (x1 - xb) / (x1 - x0), tb = (x1 - xa) / (x1 - x0);
        segs.push(`<path class="ho-s" pathLength="1" data-f="${fam}" data-o="${order}" data-a="${ta.toFixed(3)}" data-b="${tb.toFixed(3)}" data-d="${dur(len).toFixed(3)}" d="M${f(xb)} ${f(y(xb))}L${f(xa)} ${f(y(xa))}"/>`);
      }
    }
  }
  const dots = [];
  for (let i = 1; i < 16; i++) for (let j = 1; j < 16; j++) if ((i + j) % 2) dots.push(`<circle class="ho-dot" cx="${i * 32}" cy="${j * 32}" r="3.6"/>`);
  return { segs: segs.join(""), dots: dots.join("") };
})();

export default [
{
  id:"g258", cat:"gsap", name:"אייקון שנופל, נמעך וקופץ עד שהוא נרגע", tech:"GSAP timeline · ScrollTrigger · scaleX/scaleY", status:"מאושר-עין",
  desc:"אייקון הסל נופל מלמעלה ומתארך בנפילה, נמעך לרגע כשהוא פוגע ברצפה, ואז קופץ שלוש פעמים בקשתות שהולכות וקטנות, עד שהוא נרגע במרכז. מאחוריו נשאר שובל של עיגולים ריקים שדועכים, ובכל נחיתה נרשמת קשת של נקודות. הצל שמתחתיו מצטמצם כשהאייקון באוויר. הריחוף על הכרטיס מפעיל את זה מחדש.",
  when:"מצב ריק או הודעת סיום שצריכים קצת חיים: סל קניות ריק, תיבת הודעות נקייה, תוצאות חיפוש בלי תוצאות, דף תודה. מתאים לאתר חנות או שירות שמרשה לעצמו נימה ידידותית. תנועה אחת, באלמנט אחד, שנרגעת מהר.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כדור נופל עם שובל של עיגולים, נמעך על קו הבסיס וקופץ בקשתות שהולכות ופוחתות. נבנה מאפס מהצפייה, אבל על אלמנט ממשק אמיתי (אייקון בעיגול) ולא על כדור. **המארקאפ הוא המצב הסופי:** האייקון נח במרכז הרצפה, וזה מה שרואים בלי GSAP ובהפחתת תנועה. **הפיזיקה בשתי שורות:** משך כל קפיצה הוא `k * sqrt(גובה)`, ובעליה ובירידה `power1` (ריבועי), ולכן כל קשת היא פרבולה אמיתית. הקצב נקבע במקום אחד: `k`. **מתיחה ועיוות:** `transform-origin` בבסיס האייקון, כך שהוא נמתח כלפי מעלה ונמעך כלפי הרצפה ולא סביב המרכז. המעיכה קטנה בכל פגיעה (`SQ`), והרוחב נגזר ממנה כדי שהשטח ישמר בערך. **השובל:** חמישה שכפולים ריקים של האייקון, כל אחד מריץ את אותה תנועה באיחור של 50ms ושקיפות יורדת, ונעלמים כשהאייקון נח. **הקשתות:** כל קשת היא `Q` אחד ב-SVG (נקודת הבקרה בגובה כפול מהשיא נותנת פרבולה מדויקת), מצוירת בנקודות עגולות (`stroke-dasharray:0 9`) ונחשפת בנחיתה. **הצל:** אליפסה שרק מצטמצמת ודוהה בגובה. **תזמון:** הטיימליין רץ רק כשהכרטיס על המסך (ScrollTrigger), חוזר אחרי הפסקה, ומופעל מחדש בריחוף. המידות נמדדות מהרצפה, ולכן הוא נבנה מחדש בשינוי רוחב. **כיווניות:** הקפיצות נעות עם כיוון הקריאה, מימין לשמאל באתר עברי, והקוד קורא את `direction` ומתהפך לבד באתר LTR. **נגישות:** כל האיור `aria-hidden`, והמסר הוא הכותרת והפסקה.",
  libs:["gsap","ScrollTrigger"],
  css:`.hp{max-width:680px;margin-inline:auto}
.hp-card{position:relative;overflow:hidden;display:grid;justify-items:center;gap:12px;padding:clamp(24px,4vw,48px) clamp(20px,4vw,56px) clamp(32px,4vw,56px);border-radius:28px;background:var(--card);box-shadow:0 0 0 1px var(--line);text-align:center}
.hp-floor{--s:112px;position:relative;width:100%;height:clamp(240px,30vw,300px);margin-bottom:8px}
.hp-ico,.hp-ghost{position:absolute;left:50%;bottom:48px;width:var(--s);height:var(--s);margin-left:calc(var(--s) / -2);border-radius:50%;transform-origin:50% 100%}
.hp-ico{display:grid;place-items:center;background:var(--accent);color:var(--accent-ink);will-change:transform}
.hp-ico svg{width:46%;height:46%;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
/* שכפול ריק של האייקון: רק מתאר בצבע המותג, ורק כשהאייקון בתנועה */
.hp-ghost{opacity:0;box-shadow:inset 0 0 0 2px var(--accent)}
.hp-shadow{position:absolute;left:50%;bottom:32px;width:var(--s);height:16px;margin-left:calc(var(--s) / -2);border-radius:50%;background:var(--ink);opacity:.16;filter:blur(5px)}
.hp-arcs{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.hp-arc{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-dasharray:0 9;opacity:0}
.hp-card h2{margin:0;font-size:clamp(26px,2.6vw,38px);line-height:1.15}
.hp-card p{margin:0;max-width:36ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hp-btn{display:inline-flex;align-items:center;margin-top:12px;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hp-btn:hover{transform:translateY(-2px)}}
.hp-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(max-width:767px){.hp-floor{--s:96px}}`,
  html:`<div class="stage"><section class="hp" aria-labelledby="hp-h">
  <div class="hp-card">
    <div class="hp-floor" aria-hidden="true">
      <svg class="hp-arcs"></svg>
      <span class="hp-shadow"></span>
      <span class="hp-ico"><svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h7.7a1.6 1.6 0 0 0 1.6-1.2L20 8H6.2"/><circle cx="9.5" cy="19.4" r="1.2"/><circle cx="16.5" cy="19.4" r="1.2"/></svg></span>
    </div>
    <h2 id="hp-h">הסל שלך ריק</h2>
    <p>מוסיפים מוצר מהחנות והוא נשמר כאן, גם אם סוגרים את העמוד באמצע.</p>
    <a class="hp-btn" href="#">לכל המוצרים</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP האייקון נח במרכז הרצפה
  const root=document.querySelector(".hp"),card=root.querySelector(".hp-card"),floor=root.querySelector(".hp-floor"),
    ico=floor.querySelector(".hp-ico"),sh=floor.querySelector(".hp-shadow"),arcs=floor.querySelector(".hp-arcs");
  // בהפחתת תנועה הפונקציה לא רצה, והאייקון נשאר במנוחה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const dir=getComputedStyle(root).direction==="rtl"?1:-1,SVGNS="http://www.w3.org/2000/svg";
    const K=.036,SQ=[.58,.74,.88,.95],GH=5;
    let tl,st,ghosts=[],paths=[],ro,w0=0;
    function build(){
      if(tl)tl.kill();ghosts.forEach(g=>g.remove());paths.forEach(p=>p.remove());ghosts=[];paths=[];
      const W=floor.clientWidth,H=floor.clientHeight,S=ico.offsetWidth,BASE=48;
      const a=Math.min(W*.3,200)*dir,xs=[1,.58,.25,0].map(v=>v*a),D=H+24,hs=[H*.4,H*.17,H*.06],y0=-D;
      const yc=H-BASE-S/2;                       // מרכז האייקון במנוחה, במערכת הקואורדינטות של הרצפה
      arcs.setAttribute("viewBox","0 0 "+W+" "+H);
      for(let i=0;i<GH;i++){const g=document.createElement("span");g.className="hp-ghost";floor.insertBefore(g,ico);ghosts.push(g);}
      for(let i=0;i<3;i++){      // קשת נקודות לכל קפיצה: Q אחד, ונקודת הבקרה בגובה כפול מהשיא
        const p=document.createElementNS(SVGNS,"path"),x1=W/2+xs[i],x2=W/2+xs[i+1];
        p.setAttribute("class","hp-arc");p.setAttribute("d","M"+x1+" "+yc+"Q"+(x1+x2)/2+" "+(yc-2*hs[i])+" "+x2+" "+yc);arcs.appendChild(p);paths.push(p);
      }
      tl=gsap.timeline({repeat:-1,repeatDelay:3.2,paused:true});
      // כל התנועה של אלמנט אחד, מרגע t: נפילה, ושלוש פעמים פגיעה, קפיצה ונחיתה. מחזיר את רגע הסיום
      const move=(el,t)=>{
        let c=t;const f=K*Math.sqrt(D);
        tl.set(el,{x:xs[0],y:y0,scaleX:1,scaleY:1},c);
        tl.to(el,{y:0,scaleY:1.2,scaleX:.88,duration:f,ease:"power1.in"},c);c+=f;
        for(let i=0;i<4;i++){
          tl.to(el,{scaleY:SQ[i],scaleX:1+(1-SQ[i])*.8,duration:.07,ease:"power2.out"},c);c+=.07;
          if(i===3){tl.to(el,{scaleY:1,scaleX:1,duration:.35,ease:"power2.out"},c);c+=.35;break;}
          const r=K*Math.sqrt(hs[i]);
          tl.to(el,{y:-hs[i],duration:r,ease:"power1.out"},c).to(el,{y:0,duration:r,ease:"power1.in"},c+r)
            .to(el,{x:xs[i+1],duration:2*r,ease:"none"},c)
            .to(el,{scaleY:1.14,scaleX:.93,duration:r*.35,ease:"power2.out"},c)
            .to(el,{scaleY:1,scaleX:1,duration:r*.65,ease:"power1.inOut"},c+r*.35)
            .to(el,{scaleY:1.1,scaleX:.94,duration:r*.4,ease:"power1.in"},c+r*1.6);
          c+=2*r;
        }
        return c;
      };
      const end=move(ico,0);
      ghosts.forEach((g,i)=>{const d=.05*(i+1);move(g,d);tl.set(g,{opacity:.4-.06*i},d).to(g,{opacity:0,duration:.25},end+d-.3);});
      // הצל: מצטמצם ודוהה כשהאייקון באוויר, וחוזר כשהוא נוחת
      const f=K*Math.sqrt(D);
      tl.set(sh,{x:xs[0],scaleX:.4,opacity:.04},0).to(sh,{scaleX:1,opacity:.16,duration:f,ease:"power1.in"},0);
      let c=f+.07;
      for(let i=0;i<3;i++){
        const r=K*Math.sqrt(hs[i]),k=1-.5*hs[i]/hs[0];
        tl.to(sh,{scaleX:k,opacity:.16*(1-.6*hs[i]/hs[0]),duration:r,ease:"power1.out"},c).to(sh,{scaleX:1,opacity:.16,duration:r,ease:"power1.in"},c+r)
          .to(sh,{x:xs[i+1],duration:2*r,ease:"none"},c);
        c+=2*r+.07;
      }
      // הקשתות נחשפות בנחיתה ונמחקות בתחילת הסבב הבא
      let t=K*Math.sqrt(D)+.07;
      tl.set(paths,{opacity:0},0);
      paths.forEach((p,i)=>{const r=K*Math.sqrt(hs[i]);t+=2*r;tl.to(p,{opacity:.55,duration:.25,ease:"power1.out"},t);t+=.07;});
    }
    build();
    st=ScrollTrigger.create({trigger:floor,start:"top 85%",end:"bottom 15%",
      onEnter:()=>tl.restart(),onEnterBack:()=>tl.play(),onLeave:()=>tl.pause(),onLeaveBack:()=>tl.pause()});
    // ריחוף על הכרטיס מפעיל את הנפילה מחדש, אם היא לא באמצע
    const again=()=>{if(!tl.isActive()||tl.time()>tl.duration()-.2)tl.restart();};
    if(matchMedia("(hover:hover)").matches)card.addEventListener("pointerenter",again);
    w0=floor.clientWidth;
    ro=new ResizeObserver(()=>{const w=floor.clientWidth;if(Math.abs(w-w0)<2)return;w0=w;const was=st.isActive;build();if(was)tl.restart();});ro.observe(floor);
    return()=>{ro.disconnect();card.removeEventListener("pointerenter",again);if(tl)tl.kill();ghosts.forEach(g=>g.remove());paths.forEach(p=>p.remove());gsap.set([ico,sh],{clearProps:"all"});};
  });
})();`
},
{
  id:"b96", cat:"behavior", name:"שדה קווים קצרים שזורם ומתעקל סביב הסמן", tech:"Canvas 2D · pointer · SVG סטטי", status:"ממתין", runway:false,
  desc:"מאות קווים קצרים, כל אחד במרכז תא ברשת מעט לא סדורה, מצביעים לכיוון שנקבע לפי שדה זרימה חלק, ולכן הם יוצרים זרמים ושרשראות ולא פיזור אקראי. השדה נע לאט לכיוון הקריאה, והקווים מסתובבים ומתיישרים בגלים. הקווים הרגועים אפורים, וככל שקו סוטה מכיוון הזרם הוא מתקרב לצבע המותג. סמן שעובר מעל הסקשן מסובב את הקווים שלידו סביבו ומדליק אותם בצבע המותג, ובטלפון מעגל דמיוני עושה את אותו הדבר. הקווים דועכים לפני הטקסט, ויש כפתור השהיה.",
  when:"רקע של הירו לשירות שמדבר על נתונים, תחזיות, מסלולים או תנועה: אנליטיקה, לוגיסטיקה, חנות אונליין, ייעוץ. מתאים כשהקו הוא רעיון של כיוון ושל זרימה. לא מתחת לטקסט ארוך, לא ליד טופס, ולא באתר שכל אזור בו כבר עמוס בתנועה.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם קווים קצרים על רקע חלק מסתובבים בגלים, וחלקיקים שנגררים לאורכם. נבנה מאפס מהצפייה, בלי חלקיקים: הקווים עצמם הם התוכן. **שופר ב-25.10.2026 אחרי שנדחה:** השדה היה רועש (שכנים הצביעו לכיוונים שונים לגמרי, ולכן זה נראה כמו פיזור אקראי ולא כמו זרימה), הרשת הייתה קשיחה, הצבע נקבע לפי זווית מוחלטת ויצר פסי צבע שרירותיים, נפער חור בהיר מאחורי הטקסט, והאפקט של הסמן לא הופיע בטלפון. **השדה:** `ffAngle(x, y, t)` הוא סכום של שלוש פונקציות גל איטיות בקואורדינטות של `px/180`, והתוצאה היא זווית ברדיאנים סביב כיוון בסיס של 0.2 רדיאנים כלפי מעלה. המשרעות קטנות (סכום כ-1.3 רדיאנים), ולכן בין שני תאים שכנים הזווית משתנה בעד כ-6 מעלות. זה מה שהופך את הרשת לזרמים ולא לרעש. הקואורדינטות נמדדות ממרכז הלוח, ולכן שינוי גודל לא מערבב את התבנית. **הרשת:** תא של 22px בכל מסך, עם תזוזה קבועה לכל תא (עד רבע תא לכל כיוון) ואורך קו בין 0.69 ל-1.15 תא. התזוזה והאורך נגזרים מהאינדקס של התא ביחס למרכז (`ffRand`), לא מ-`Math.random`, ולכן ה-SVG הסטטי והקנבס מציירים בדיוק את אותם קווים וההצלבה ביניהם לא מזיזה כלום. מספר העמודות והשורות תמיד אי-זוגי, כדי שהתא האמצעי ישב בדיוק במרכז בשני הציורים. כל הפונקציות נכנסות לסקריפט דרך `toString`. **צבע:** הצבע נקבע לפי הסטייה של הקו מכיוון הבסיס (`ffDev`, חמש דרגות), מאפור רך של הטקסט ועד צבע המותג. הזרם הרגוע שקט, והמערבולות, ובעיקר האזור סביב הסמן, נדלקות בצבע המותג. **הסמן:** כל קו בתוך 110 עד 170px מהסמן (לפי גובה הלוח) מסתובב לכיוון המשיק למעגל סביבו, בסיבוב הקצר ביותר מודולו π ובמשקל שיורד ריבועית עם המרחק, והסמן עצמו מוחלק. **בטלפון** אין סמן, ולכן מעגל דמיוני נע לאט על הלוח ועושה את אותו הדבר (`(hover:none)`). **קל:** הציור מקובץ לחמש קבוצות צבע ומסלול אחד לכל קבוצה, DPR עד 2, והלולאה רצה רק כשהסקשן על המסך ובלשונית פעילה. בהשהיה הציור מתעדכן רק כשהסמן זז. **השהיה:** כפתור בפינה (מופיע רק כשהתנועה פועלת) מקפיא את השעון של השדה, ולכן אחרי ההפעלה מחדש הזרימה ממשיכה מאותה נקודה. **RTL:** הדריפט של השדה נע שמאלה באתר עברי ומתהפך לבד באתר LTR (הקוד קורא את `direction`). **בלי JS ובהפחתת תנועה:** SVG סטטי של אותו שדה בזמן קבוע, ובהפחתת תנועה מצויר פריים אחד בקנבס, בלי כפתור. **הקריאות:** הקווים לא עוברים מתחת לטקסט. מסכה בכיוון הקריאה (`linear-gradient`, מתהפכת ב-`:dir(ltr)`) מעמעמת אותם בצד שבו יושב הטקסט, ומסכה אנכית מעמעמת את הקצוות העליון והתחתון. **בטלפון** הטקסט תופס את כל הרוחב, ולכן הקווים מקבלים רצועה משלהם מתחת לטקסט, עם דעיכה למעלה ולמטה. **נגישות:** כל השכבה `aria-hidden`.",
  libs:[],
  css:`.hf{--hf-mu:color-mix(in srgb,var(--ink) 40%,var(--bg));--hf-strip:clamp(200px,58vw,260px);position:relative;isolation:isolate;overflow:hidden;display:grid;align-items:center;min-height:clamp(420px,66vh,640px);padding:clamp(48px,6vw,96px) var(--gutter)}
/* מסכה בכיוון הקריאה: הקווים דועכים בצד שבו יושב הטקסט, ובנוסף הקצוות העליון והתחתון. כך אין חור מאחורי הטקסט */
.hf-art{position:absolute;inset:0;z-index:-1;-webkit-mask-image:linear-gradient(to left,transparent 22%,var(--ink) 62%),linear-gradient(to bottom,transparent,var(--ink) 20%,var(--ink) 80%,transparent);-webkit-mask-composite:source-in;mask-image:linear-gradient(to left,transparent 22%,var(--ink) 62%),linear-gradient(to bottom,transparent,var(--ink) 20%,var(--ink) 80%,transparent);mask-composite:intersect}
.hf-art:dir(ltr){-webkit-mask-image:linear-gradient(to right,transparent 22%,var(--ink) 62%),linear-gradient(to bottom,transparent,var(--ink) 20%,var(--ink) 80%,transparent);mask-image:linear-gradient(to right,transparent 22%,var(--ink) 62%),linear-gradient(to bottom,transparent,var(--ink) 20%,var(--ink) 80%,transparent)}
.hf-svg,.hf-cv{transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.hf-cv{position:absolute;inset:0;width:100%;height:100%;opacity:0}
.hf-svg{position:absolute;left:50%;top:50%;width:max(100%,1200px);max-width:none;height:auto;aspect-ratio:5 / 2;transform:translate(-50%,-50%)}
.hf-svg path{fill:none;stroke-width:1.6;stroke-linecap:round;vector-effect:non-scaling-stroke;opacity:.8}
.hf-l0{stroke:var(--hf-mu)}
.hf-l1{stroke:color-mix(in srgb,var(--accent) 20%,var(--hf-mu))}
.hf-l2{stroke:color-mix(in srgb,var(--accent) 45%,var(--hf-mu))}
.hf-l3{stroke:color-mix(in srgb,var(--accent) 72%,var(--hf-mu))}
.hf-l4{stroke:var(--accent)}
.hf-art.is-on .hf-cv{opacity:1}
.hf-art.is-on .hf-svg{opacity:0}
.hf-in{position:relative;display:grid;gap:16px;justify-items:start;max-width:38ch}
.hf-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.hf h2{margin:0;font-size:clamp(34px,4.6vw,64px);line-height:1.08;text-wrap:balance}
.hf-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.hf-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hf-btn:hover{transform:translateY(-2px)}}
.hf-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.hf-pz{position:absolute;inset-block-end:16px;inset-inline-end:16px;z-index:2;display:none;align-items:center;gap:8px;min-height:44px;padding:8px 16px;border:0;border-radius:999px;background:var(--card);box-shadow:0 0 0 1px var(--line);color:var(--ink);font:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s cubic-bezier(.2,.6,.2,1)}
.hf-pz svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.hf.is-motion .hf-pz{display:inline-flex}
@media (hover:hover) and (pointer:fine){.hf-pz:hover{background:color-mix(in srgb,var(--ink) 6%,var(--card))}}
.hf-pz:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.hf-svg,.hf-cv,.hf-pz{transition:none}}
/* בטלפון הטקסט תופס את כל הרוחב, ולכן הקווים מקבלים רצועה משלהם מתחתיו */
@media(max-width:767px){.hf{min-height:0;padding-block-end:calc(var(--hf-strip) + 16px)}.hf-art,.hf-art:dir(ltr){inset:auto 0 0 0;height:var(--hf-strip);-webkit-mask-image:linear-gradient(to bottom,transparent,var(--ink) 36%,var(--ink) 86%,transparent);mask-image:linear-gradient(to bottom,transparent,var(--ink) 36%,var(--ink) 86%,transparent);-webkit-mask-composite:source-over;mask-composite:add}.hf-pz{inset-block-end:12px;inset-inline-end:12px}}`,
  html:`<div class="stage"><section class="hf">
  <div class="hf-art" aria-hidden="true">
    <svg class="hf-svg" viewBox="0 0 1200 480">${ffSvg}</svg>
    <canvas class="hf-cv"></canvas>
  </div>
  <div class="hf-in">
    <p class="hf-k">אנליטיקה לחנויות אונליין</p>
    <h2>תחזית ביקוש לחנות שלכם</h2>
    <p class="hf-lead">מחברים את נתוני המכירות, המלאי והקמפיינים, ומקבלים כל שבוע המלצה ברורה להזמנות ולתקציב הפרסום.</p>
    <a class="hf-btn" href="#">לתיאום שיחה</a>
  </div>
  <button class="hf-pz" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg><span>השהיית התנועה</span></button>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".hf"),art=root.querySelector(".hf-art"),cv=art.querySelector(".hf-cv"),ctx=cv.getContext("2d");
  const pz=root.querySelector(".hf-pz"),pzi=pz.querySelector("path"),pzl=pz.querySelector("span");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,ghost=matchMedia("(hover:none)").matches,rtl=getComputedStyle(root).direction==="rtl",PI=Math.PI;
  const ff=${ffAngle.toString()},rnd=${ffRand.toString()},dev=${ffDev.toString()},STEP=${FF_STEP},DRIFT=${FF_DRIFT};
  let W=0,H=0,R=150,N=0,cx,cy,hl,ang,bk,COL=[],running=false,vis=false,raf=0,paused=false,clock=.4,tPrev=0;
  const M={x:0,y:0,tx:0,ty:0,k:0,tk:0};
  // הצבעים נקראים מהטוקנים בזמן ריצה: חמש דרגות בין אפור רך של הטקסט לצבע המותג
  const probe=document.createElement("canvas").getContext("2d");
  const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
  const colors=()=>{const cs=getComputedStyle(root),ink=rgb(cs.color),bg=rgb(cs.getPropertyValue("--bg").trim()||"#fff"),acc=rgb(cs.getPropertyValue("--accent").trim()||cs.color);
    const mu=ink.map((v,i)=>v*.4+bg[i]*.6);
    COL=[0,.2,.45,.72,1].map(k=>"rgb("+mu.map((v,i)=>Math.round(v+(acc[i]-v)*k)).join(",")+")");};
  function frame(t){
    const dir=rtl?1:-1,R2=R*R,mx=W/2,my=H/2;
    for(let i=0;i<N;i++){
      // הדריפט הוא הזזה של השדה עצמו לכיוון הקריאה
      let a=ff((cx[i]-mx+dir*t*DRIFT)/180,(cy[i]-my)/180,t);
      if(M.k>.01){
        const dx=cx[i]-M.x,dy=cy[i]-M.y,dd=dx*dx+dy*dy;
        if(dd<R2){
          const w=1-Math.sqrt(dd)/R,b=Math.atan2(dy,dx)+PI/2;
          let df=(((b-a)%PI)+PI)%PI;if(df>PI/2)df-=PI;   // הסיבוב הקצר ביותר, כי לקו אין כיוון
          a+=w*w*M.k*df;
        }
      }
      ang[i]=a;bk[i]=dev(a);
    }
    ctx.clearRect(0,0,W,H);ctx.lineWidth=1.6;ctx.lineCap="round";ctx.globalAlpha=.8;
    for(let b=0;b<5;b++){
      ctx.strokeStyle=COL[b];ctx.beginPath();
      for(let i=0;i<N;i++){if(bk[i]!==b)continue;const c=Math.cos(ang[i])*hl[i],s=Math.sin(ang[i])*hl[i];ctx.moveTo(cx[i]-c,cy[i]-s);ctx.lineTo(cx[i]+c,cy[i]+s);}
      ctx.stroke();
    }
  }
  // רשת אי-זוגית סביב מרכז הלוח, עם תזוזה ואורך קבועים לכל תא: אותם קווים כמו ב-SVG הסטטי
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    R=Math.max(110,Math.min(170,H*.45));
    const cols=Math.ceil(W/STEP)|1,rows=Math.ceil(H/STEP)|1;N=cols*rows;
    cx=new Float32Array(N);cy=new Float32Array(N);hl=new Float32Array(N);ang=new Float32Array(N);bk=new Uint8Array(N);
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
      const k=j*cols+i,ii=i-(cols-1)/2,jj=j-(rows-1)/2;
      cx[k]=W/2+(ii+(rnd(ii*127.1+jj*311.7)-.5)*.5)*STEP;
      cy[k]=H/2+(jj+(rnd(ii*269.5+jj*183.3)-.5)*.5)*STEP;
      hl[k]=STEP*.46*(.75+.5*rnd(ii*419.2+jj*371.9));
    }
    colors();frame(clock);
  }
  function loop(now){
    const dt=Math.min(.1,(now-tPrev)/1000);tPrev=now;
    if(!paused)clock+=dt;
    // בטלפון אין סמן: מעגל דמיוני נע לאט על הלוח ועושה את אותו הדבר
    if(ghost){const g=clock*.5;M.tx=W*(.5+.3*Math.sin(g*.9));M.ty=H*(.5+.28*Math.sin(g*1.3+1));M.tk=.9;}
    const px=M.x,py=M.y,pk=M.k;
    M.x+=(M.tx-M.x)*.14;M.y+=(M.ty-M.y)*.14;M.k+=(M.tk-M.k)*.08;
    // בהשהיה מציירים רק כשהסמן באמת זז
    if(!paused||Math.abs(M.x-px)+Math.abs(M.y-py)+Math.abs(M.k-pk)>.01)frame(clock);
    raf=running?requestAnimationFrame(loop):0;
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf){tPrev=performance.now();raf=requestAnimationFrame(loop);}}
  root.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=art.getBoundingClientRect();M.tx=e.clientX-r.left;M.ty=e.clientY-r.top;if(M.tk<.01){M.x=M.tx;M.y=M.ty;}M.tk=1;});
  root.addEventListener("pointerleave",()=>{M.tk=0;});
  document.addEventListener("visibilitychange",sync);
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){art.classList.add("is-on");colors();}sync();},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");   // פריים אחד, בלי לולאה ובלי כפתור
  else{
    root.classList.add("is-motion");
    pz.addEventListener("click",()=>{
      paused=!paused;
      pzl.textContent=paused?"הפעלת התנועה":"השהיית התנועה";
      pzi.setAttribute("d",paused?"M8 5l11 7-11 7z":"M9 5v14M15 5v14");
      if(!paused)tPrev=performance.now();
    });
  }
  build();
})();`
},
{
  id:"g259", cat:"gsap", name:"נקודות בזווית הזהב שמתמלאות לדיסק בגלילה", tech:"GSAP · ScrollTrigger scrub · SVG", status:"מאושר-עין",
  desc:"הסקשן נעוץ במסך, ובזמן הגלילה 144 נקודות נוחתות אחת אחרי השנייה על ספירלה: כל נקודה מסתובבת 137.5 מעלות מהקודמת, ולכן הן מתפזרות לדיסק צפוף ושווה כמו לב של חמנייה. הצבע עובר ממרכז הדיסק החוצה, והדיסק כולו מתיישר לאט תוך כדי המילוי. מספר גדול בצד סופר את הנקודות שכבר נחתו, ומתחת לדיסק שורת הסבר קצרה על הזווית.",
  when:"סקשן שמראה כמה: לקוחות, חברי קהילה, פרויקטים, משתתפים, מתנדבים. כל נקודה היא יחידה אחת, ולכן המספר בין 60 ל-200. לא למספרים קטנים (פחות מ-40 נקודות נראות כמו פיזור), ולא כשחשוב לראות כל יחידה כפרצוף או כלוגו.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם נקודות מונחות בזווית הזהב ומתמלאות לדיסק צפוף, עם צבע שעובר מגוון לגוון. נבנה מאפס מהצפייה. **הנוסחה:** נקודה `i` יושבת ברדיוס `c * sqrt(i + .5)` ובזווית `i * 137.508°`. הרדיוס עולה כשורש כדי שהצפיפות תישאר קבועה, והזווית היא זווית הזהב, שהיא היחס הכי רחוק מכל שבר, ולכן אין שני קווים שנוצרים (הקרנות). הנקודות מחושבות בזמן בנייה ונכתבות כ-144 אלמנטי `circle` ב-SVG אחד. הרדיוס של כל נקודה הוא 0.62 מהקבוע `c`, ולכן המרווח בין הנקודות קבוע. **הצבע** הוא שמונה דרגות (`hd-c0` עד `hd-c7`) בין צבע המותג לצבע הטקסט, לפי אינדקס הנקודה. **הגלילה:** הסקשן מקבל `is-live` וגובה 260vh, והבמה נעוצה (`position: sticky`). ScrollTrigger עם `scrub: .6` מקדם טיימליין אחד: 144 הנקודות נכנסות ב-`stagger` של `.9 / 143` ובמשך `.14` כל אחת, הקבוצה כולה מסתובבת מ-28 מעלות ל-0, והמונה והזווית הם טווינים על אובייקט ביניים עם `ease: none`, כך שהם מסתנכרנים עם הנחיתות. את הזווית כותבת פונקציה קטנה ישירות ל-`transform` של הקבוצה סביב מרכז ה-viewBox: ב-`svgOrigin` של GSAP בתוך סקשן נעוץ מרכז הדיסק זז במדידה, ולכן לא משתמשים בו. **המצב הסופי במארקאפ:** הדיסק המלא והמספר 144, וזה מה שרואים בלי GSAP ובהפחתת תנועה. **בטלפון** הבמה נעוצה וההסבר מעל הדיסק, והדיסק מוגבל ל-44% מגובה המסך. **נגישות:** האיור `aria-hidden`, והמספר הסופי נמצא ב-`sr-only`. **הערה לאתר LTR:** אין כיוון בצורה עצמה, ואין מה להפוך.",
  libs:["gsap","ScrollTrigger"],
  css:`.hd{position:relative;max-width:1100px;margin-inline:auto}
.hd-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);padding:clamp(32px,5vw,72px) 0}
.hd-copy{display:grid;gap:16px;justify-items:start}
.hd-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.hd h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.hd-count{display:flex;align-items:baseline;gap:12px;margin:0;font-size:clamp(64px,9vw,128px);font-weight:700;line-height:.9;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.hd-count small{font-size:max(.18em,16px);font-weight:500;letter-spacing:0;color:var(--muted)}
.hd-lead{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hd .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hd-fig{margin:0;justify-self:center;display:grid;gap:12px;width:min(100%,76svh)}
.hd-svg{display:block;width:100%;height:auto;overflow:visible}
.hd-c0{fill:var(--accent)}
.hd-c1{fill:color-mix(in srgb,var(--accent) 86%,var(--ink))}
.hd-c2{fill:color-mix(in srgb,var(--accent) 72%,var(--ink))}
.hd-c3{fill:color-mix(in srgb,var(--accent) 58%,var(--ink))}
.hd-c4{fill:color-mix(in srgb,var(--accent) 44%,var(--ink))}
.hd-c5{fill:color-mix(in srgb,var(--accent) 32%,var(--ink))}
.hd-c6{fill:color-mix(in srgb,var(--accent) 20%,var(--ink))}
.hd-c7{fill:color-mix(in srgb,var(--accent) 10%,var(--ink))}
.hd-cap{margin:0;color:var(--muted);font-size:14px;line-height:1.5;text-align:center}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, והגלילה ממלאת את הדיסק */
.hd.is-live{height:260vh}
.hd.is-live .hd-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
@media(max-width:767px){
  .hd-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:16px}
  .hd-copy{gap:12px}
  .hd-count{font-size:clamp(56px,16vw,80px)}
  .hd-fig{width:min(100%,40svh)}
  .hd-cap{display:none}
}`,
  html:`<div class="stage"><section class="hd" aria-labelledby="hd-h">
  <div class="hd-pin">
    <div class="hd-copy">
      <p class="hd-k">הלקוחות של הסטודיו</p>
      <h2 id="hd-h">העסקים שמתחזקים אצלנו את האתר</h2>
      <p class="hd-count"><span class="sr-only">144 עסקים פעילים</span><b class="hd-num" aria-hidden="true">144</b><small aria-hidden="true">עסקים פעילים</small></p>
      <p class="hd-lead">חלקם איתנו כבר שש שנים, ובכל חודש מצטרפים עוד כמה עסקים שמעדיפים מקום אחד לאתר, לקמפיינים ולתמיכה.</p>
    </div>
    <figure class="hd-fig" aria-hidden="true">
      <svg class="hd-svg" viewBox="0 0 368 368"><g class="hd-g">${gaDots}</g></svg>
      <figcaption class="hd-cap">כל נקודה היא עסק, וכל אחד מתיישב 137.5 מעלות אחרי הקודם.</figcaption>
    </figure>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP נשאר הדיסק המלא והמספר הסופי
  gsap.registerPlugin(ScrollTrigger);
  const root=document.querySelector(".hd"),g=root.querySelector(".hd-g"),num=root.querySelector(".hd-num"),dots=[...g.querySelectorAll(".hd-d")];
  const FINAL=dots.length;
  // בהפחתת תנועה הפונקציה לא רצה, והדיסק המלא נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    gsap.set(dots,{scale:0,opacity:0,transformOrigin:"50% 50%"});
    // הסיבוב והמונה נכתבים ישירות: מנוע הסיבוב של GSAP לקבוצת SVG הזיז כאן את מרכז הדיסק, ולכן הזווית נכתבת כ-attribute סביב מרכז ה-viewBox
    const o={n:0,r:-28},each=.9/(FINAL-1);
    const paint=()=>{num.textContent=Math.round(o.n);g.setAttribute("transform","rotate("+o.r.toFixed(2)+" 184 184)");};
    paint();
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // הנקודות נוחתות לפי האינדקס, ובמקביל הדיסק מתיישר והמונה עולה באותו קצב
    tl.to(dots,{scale:1,opacity:1,duration:.14,ease:"power2.out",stagger:{each}},0)
      .to(o,{r:0,duration:.9+.14,onUpdate:paint},0)
      .to(o,{n:FINAL,duration:.9+.07,onUpdate:paint},0);
    return()=>{
      if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();
      root.classList.remove("is-live");num.textContent=FINAL;
      gsap.set(dots,{clearProps:"all"});g.removeAttribute("transform");
    };
  });
})();`
},
{
  id:"b97", cat:"behavior", name:"השתקפות מים מתנדנדת מתחת לתמונה", tech:"SVG feTurbulence + feDisplacementMap · IntersectionObserver · CSS mask", status:"ממתין", runway:false,
  desc:"תמונת שקיעה על הים נחתכת בקו האופק, ועל האופק יושבת צללית חוף כהה: כף רחוקה עם אורות קטנים של עיירה, סירות עם תורנים ומזח עם פנסים. מתחת לקו מופיע העתק הפוך שלה, מעומעם, כמו השתקפות במים שקטים, והוא מתעוות בגלים אופקיים דקים שמשתנים כל הזמן: התורנים נשברים לקטעים מתנדנדים והפנסים הופכים לנצנוצים. כשהסקשן נחשף, ההשתקפות עולה לאט מקו האופק. הכותרת יושבת על השמיים, ויש כפתור השהיה.",
  when:"הירו של עסק שיושב ליד מים או שמוכר רוגע: חדרי אירוח, ספא, חוף אירועים, יאכטות, צימרים, סדנאות. עובד רק עם תמונה שיש בה אופק ברור ושמיים חלקים, ועם צללית שיש בה קווים אנכיים (תורנים, עמודים, בניינים), כי עליהם רואים את האדווה. לא לתמונת אנשים או מוצר, ולא באתר שצריך להרגיש טכני.",
  note:"**שחזור.** השראה: שני סרטונים ב-prompt-motion.com (21.10.2026) שבהם החלק התחתון של הפריים משקף את הסצנה שמעליו בגלים אופקיים. נבנה מאפס מהצפייה, על תמונת שקיעה מהמאגר (`s08/hero.webp`). **שופר ב-25.10.2026 אחרי שנדחה:** התמונה עצמה כבר פסים אופקיים ארוכים (חשיפה ארוכה), ולכן ההעתק המעוות נראה כמו התמונה עצמה הפוכה ולא כמו מים. גם ההעתק היה בהיר כמו המקור וקו האופק נראה כמו קפל. מה שחסר היה נושא עם קצוות אנכיים שהאדווה יכולה לשבור. **הצללית:** `hwShore` בונה `symbol` אחד (ציור קצר, 1600 על 200) עם כף רחוקה ועליה 46 נקודות אור קטנות בגדלים שונים (במקום בניינים מצוירים, שנראו כמו קליפ-ארט), שלוש סירות עם תורן דק ומפרש, ומזח עם שישה פנסים ו-`radialGradient` של זוהר. היא יושבת בתחתית קופסת השמיים, על קו האופק, ואותו `symbol` נכנס פעם נוספת לתוך הקופסה ההפוכה של ההשתקפות. הרוחב `max(100cqw, גובה * 2.2)` והמרכוז זהים בשני המקומות, ולכן כל תורן יושב מעל ההשתקפות שלו בדיוק. בטלפון הצללית רחבה מהמסך ונחתכת מהצדדים, והסירות והפנסים הראשונים נשארים במרכז. **החיתוך:** קו האופק בתמונה הוא ב-71% מהגובה, ולכן כל התמונה מונחת בתחתית אזור השמיים כך ש-29% התחתונים שלה יוצאים מהקופסה והאופק יושב בדיוק על הקצה. הרוחב הוא `max(100cqw, גובה / .473)`, והגובה נגזר מ-`--hs`, ולכן בטלפון התמונה גדלה ונחתכת מהצדדים במקום לאבד את האופק. **ההשתקפות:** אותה קופסה, הפוכה ב-`scaleY(-1)`, כך שקו האופק יושב בקצה העליון שלה, וחלון קטן יותר (60% מ-`--hs`) חותך אותה. שכבת ::after כהה (28% למעלה ועד 52% למטה) מעמעמת אותה, ומסכה מדללת אותה כלפי מטה. **העיוות:** מסנן SVG אחד: `feTurbulence` בתדר נמוך אופקית וגבוה אנכית נותן פסים אופקיים, `feColorMatrix` קובע את הערוץ הירוק ל-.5, כך שהעיוות הוא אופקי בלבד ואין חור שקוף באופק, ו-`feDisplacementMap` בעוצמה 28 מזיז את הפיקסלים. כל פס אופקי זז במרחק אחר, ולכן קו אנכי נשבר לקטעים, וזה מה שהופך תורן להשתקפות בגלים. הקופסה רחבה ב-32px מכל צד, והתמונה בתוכה רחבה ב-64px מהשמיים, כדי שהעיוות לא ימשוך שקיפות מהקצה. **התנועה:** `baseFrequency` משתנה בגל איטי ב-20 עדכונים בשנייה (15 בטלפון), והמסנן מחושב מחדש בכל עדכון, ולכן האזור נשמר נמוך (כ-250px) והלולאה עוצרת מחוץ למסך, בלשונית רקע ובהפחתת תנועה. זו העלות הגבוהה ביותר בקבוצה: מסנן SVG רץ על המעבד, ולכן לא מגדילים את אזור המים. **השהיה:** כפתור בפינה (מופיע רק כשהתנועה פועלת) עוצר את העדכונים. הגלים נמדדים בשעון פנימי שמתקדם רק כשהם רצים, ולכן אחרי ההפעלה מחדש הם ממשיכים מאותה נקודה ולא קופצים. **המצב הסטטי:** ההשתקפות עם אותו מסנן, בלי עדכונים, וזה מה שרואים בלי JS ובהפחתת תנועה. **החשיפה:** `is-ready` ו-`is-in` מעלים את ההשתקפות ב-`opacity`. **להחליף:** את `hwShore` בצללית של העסק (קו חוף, גג, גשר, ספינה) או בתמונה עם קווים אנכיים. **נגישות:** התמונות והצללית `aria-hidden`, והמסר בכותרת ובפסקה.",
  libs:[],
  css:`.hw{--hs:clamp(380px,56vh,480px);--iw:max(100cqw,calc(var(--hs) / .473));--sw:max(100cqw,calc(var(--hs) * 2.2));position:relative;isolation:isolate;overflow:hidden;background:rgb(8,12,30)}
.hw::after{content:"";display:block;height:calc(var(--hs) * .6)}
.hw-defs{position:absolute;width:0;height:0;overflow:hidden}
.hw-art{position:absolute;inset:0;z-index:-1;container-type:inline-size}
.hw-sky,.hw-flip{position:absolute;inset-inline:0;top:0;height:var(--hs);overflow:hidden}
.hw-art img{position:absolute;left:50%;bottom:calc(var(--iw) * -.1933);width:var(--iw);height:auto;max-width:none;transform:translateX(-50%)}
/* צללית החוף יושבת על קו האופק, ואותה צללית נכנסת להשתקפות. הרוחב והמרכוז זהים בשתיהן, ולכן כל תורן מעל ההשתקפות שלו */
.hw-sil{position:absolute;left:50%;bottom:0;width:var(--sw);max-width:none;height:auto;aspect-ratio:8 / 1;transform:translateX(-50%)}
.hw-ref{--iw:calc(max(100cqw,var(--hs) / .473) + 64px)}
/* ההשתקפות: חלון נמוך יותר מעל קופסה הפוכה, בלי מרווח בקו האופק */
.hw-ref{position:absolute;inset-inline:-32px;top:var(--hs);height:calc(var(--hs) * .6);overflow:hidden;filter:url(#hw-rip);-webkit-mask-image:linear-gradient(var(--ink) 18%,transparent);mask-image:linear-gradient(var(--ink) 18%,transparent)}
/* מים כהים מהשמיים: בלי זה ההעתק נראה כמו התמונה עצמה הפוכה */
.hw-ref::after{content:"";position:absolute;inset:0;background:linear-gradient(rgba(5,8,22,.28),rgba(5,8,22,.52))}
.hw-flip{inset-inline:0;transform:scaleY(-1)}
.hw.is-ready .hw-ref{opacity:0;transition:opacity 1.2s cubic-bezier(.2,.6,.2,1)}
.hw.is-ready.is-in .hw-ref{opacity:1}
.hw-in{position:relative;z-index:1;display:grid;align-content:center;justify-items:start;gap:16px;min-height:var(--hs);padding:clamp(48px,6vw,88px) var(--gutter);color:#fff;background:linear-gradient(rgba(6,10,26,.5),rgba(6,10,26,.14))}
.hw-in>*{max-width:36ch}
.hw-k{margin:0;font-size:15px;font-weight:600;opacity:.85}
.hw h2{margin:0;font-size:clamp(34px,4.6vw,64px);line-height:1.08;text-wrap:balance}
.hw-lead{margin:0;font-size:var(--fs-body);line-height:1.6;opacity:.92}
.hw-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hw-btn:hover{transform:translateY(-2px)}}
.hw-btn:focus-visible{outline:2px solid #fff;outline-offset:3px}
.hw-pz{position:absolute;inset-block-end:16px;inset-inline-end:16px;z-index:2;display:none;align-items:center;gap:8px;min-height:44px;padding:8px 16px;border:0;border-radius:999px;background:rgba(6,10,26,.55);color:#fff;font:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s cubic-bezier(.2,.6,.2,1)}
.hw-pz svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.hw.is-motion .hw-pz{display:inline-flex}
@media (hover:hover) and (pointer:fine){.hw-pz:hover{background:rgba(6,10,26,.75)}}
.hw-pz:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media(prefers-reduced-motion:reduce){.hw.is-ready .hw-ref,.hw-pz{transition:none}}
@media(max-width:767px){.hw{--hs:clamp(420px,64svh,520px)}.hw-pz{inset-block-end:12px;inset-inline-end:12px}}`,
  html:`<div class="stage"><section class="hw">
  <svg class="hw-defs" width="0" height="0" aria-hidden="true" focusable="false"><radialGradient id="hw-glow"><stop offset="0" stop-color="rgb(255,190,100)" stop-opacity=".8"/><stop offset="1" stop-color="rgb(255,190,100)" stop-opacity="0"/></radialGradient>${hwShore}<filter id="hw-rip" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence id="hw-turb" type="fractalNoise" baseFrequency="0.0055 0.092" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="1 0 0 0 0  0 0 0 0 .5  0 0 1 0 0  0 0 0 0 1" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="28" xChannelSelector="R" yChannelSelector="G"/></filter></svg>
  <div class="hw-art" aria-hidden="true">
    <div class="hw-sky"><img src="../assets/media/real/s08/hero.webp" alt="" width="2560" height="1707" loading="lazy" decoding="async"><svg class="hw-sil" viewBox="0 0 1600 200"><use href="#hw-shore"/></svg></div>
    <div class="hw-ref"><div class="hw-flip"><img src="../assets/media/real/s08/hero.webp" alt="" width="2560" height="1707" loading="lazy" decoding="async"><svg class="hw-sil" viewBox="0 0 1600 200"><use href="#hw-shore"/></svg></div></div>
  </div>
  <div class="hw-in">
    <p class="hw-k">חדרי אירוח בחוף הצפוני</p>
    <h2>שמונה חדרים מול הים</h2>
    <p class="hw-lead">לכל חדר מרפסת שפונה מערבה, וארוחת הבוקר מוגשת עד אחת עשרה, במרחק דקה מהחוף.</p>
    <a class="hw-btn" href="#">בדיקת זמינות</a>
  </div>
  <button class="hw-pz" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg><span>השהיית התנועה</span></button>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".hw"),turb=document.getElementById("hw-turb");
  if(!turb||matchMedia("(prefers-reduced-motion: reduce)").matches)return;   // בלי JS ובהפחתת תנועה: ההשתקפות הסטטית, בלי כפתור
  const pz=root.querySelector(".hw-pz"),pzi=pz.querySelector("path"),pzl=pz.querySelector("span");
  const small=matchMedia("(max-width:767px)").matches,GAP=small?66:50;
  let vis=false,raf=0,last=0,clock=0,paused=false;
  // ההשתקפות עולה מקו האופק כשהסקשן נחשף
  root.classList.add("is-ready","is-motion");
  // הגלים: התדר עצמו משתנה לאט, וכך הפסים נמרחים ונעים. עדכון ב-20 פעמים בשנייה מספיק, כי המסנן מחושב מחדש בכל עדכון.
  // השעון הוא שלנו ומתקדם רק כשהגלים רצים, ולכן אחרי השהיה הם ממשיכים מאותה נקודה
  function tick(now){
    raf=0;if(!vis||document.hidden||paused)return;
    if(now-last>=GAP){clock+=Math.min(.25,(now-last)/1000);last=now;
      turb.setAttribute("baseFrequency",(.0055+.0012*Math.sin(clock*.35)).toFixed(5)+" "+(.092+.012*Math.sin(clock*.5)).toFixed(5));}
    raf=requestAnimationFrame(tick);
  }
  const go=()=>{if(vis&&!document.hidden&&!paused&&!raf){last=performance.now();raf=requestAnimationFrame(tick);}};
  pz.addEventListener("click",()=>{
    paused=!paused;
    pzl.textContent=paused?"הפעלת התנועה":"השהיית התנועה";
    pzi.setAttribute("d",paused?"M8 5l11 7-11 7z":"M9 5v14M15 5v14");
    go();
  });
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)root.classList.add("is-in");go();},{rootMargin:"10% 0px"}).observe(root);
  document.addEventListener("visibilitychange",go);
})();`
},
{
  id:"css41", cat:"css", name:"צל עלים שמתנדנד על קיר ועל מסגרת", tech:"CSS keyframes · SVG blur · transform-origin בפינה", status:"מאושר-עין", runway:false,
  desc:"על קיר חלק תלוי הדפס ממוסגר, ומעליו נופל צל של ענפים עם עלים, כאילו שמש עוברת דרך עץ ליד חלון. הצל מטושטש, מכסה גם את הקיר וגם את ההדפס, ומתנדנד לאט סביב פינה אחת, כמו ענף ברוח קלה. שתי שכבות של עלים בגדלים שונים נעות במהירויות שונות, כך שהצל אף פעם לא חוזר על עצמו בדיוק. הכול CSS, בלי JS.",
  when:"תמונת מוצר או הדפס יחיד על רקע חלק: חנות לאמנות, מסגרות, אביזרי בית, נרות, צמחים, קרמיקה, מלון בוטיק. מוסיף חיים לתמונה סטטית בלי להסיח את העין ממנה. לא על תמונה עמוסה או צבעונית מאוד, ולא כשיש כמה מוצרים באותו קיר.",
  note:"**שחזור.** השראה: סרטון אחד ב-prompt-motion.com (21.10.2026) שבו צל עלים מתנדנד על קיר סביב מסגרת. נבנה מאפס מהצפייה. **הצל:** שני SVG מעל הקיר והמסגרת, וכל אחד מכיל ענפים וטיפות עלים שמחושבים בזמן בנייה (מחולל פסאודו-אקראי קבוע, כך שהצל זהה בכל טעינה). הצבע הוא `currentColor` שהוא `var(--ink)`, בשקיפות 14% עד 22%, ובלי `mix-blend-mode`, כי `multiply` על קיר כהה לא רואים. בעור כהה `--ink` בהיר, והצל הופך לאור שעובר בעלים, וזה עדיין נראה כמו צל של עלים. **הטשטוש בתוך ה-SVG** (`feGaussianBlur` על הקבוצה), ולא ב-`filter` של CSS על השכבה הנעה, כדי שהשכבה תצויר פעם אחת, והאנימציה תהיה רק `transform` על הרכבה. **התנועה:** `transform-origin: 100% 0` (הפינה שמשם הענפים יוצאים), סיבוב של פחות משלוש מעלות והזזה של כמה עשרות פיקסלים, `alternate` בלי סוף, ב-17 שניות לשכבה הגדולה וב-11 שניות לקטנה עם `animation-delay` שלילי. העקומה היא `cubic-bezier(.4,0,.2,1)`, הקרובה ביותר לסינוס מבין הרשימה המותרת. **הצל חייב לצאת מהקיר:** `overflow: hidden` על הקיר, והענפים מתחילים מחוץ ל-viewBox. **בהפחתת תנועה** האנימציה כבויה והצל נשאר במקום. **נגישות:** הצל `aria-hidden`, והתמונה עם `alt` אמיתי.",
  libs:[],
  css:`.hl{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);max-width:1100px;margin-inline:auto;padding:clamp(32px,5vw,72px) 0}
.hl-wall{position:relative;isolation:isolate;overflow:hidden;display:grid;place-items:center;aspect-ratio:1 / 1;border-radius:24px;background:color-mix(in srgb,var(--accent) 7%,var(--card))}
.hl-frame{margin:0;width:52%;padding:20px;border:8px solid var(--muted);background:var(--bg);box-shadow:0 24px 40px color-mix(in srgb,var(--ink) 22%,transparent)}
.hl-frame img{display:block;width:100%;height:auto;aspect-ratio:4 / 5;object-fit:cover}
.hl-shadow{position:absolute;inset:0;z-index:1;pointer-events:none;color:var(--ink)}
.hl-sh{position:absolute;inset:0;width:100%;height:100%;transform-origin:100% 0}
.hl-sh1{opacity:.22;animation:hl-sway1 17s cubic-bezier(.4,0,.2,1) infinite alternate}
.hl-sh2{opacity:.14;animation:hl-sway2 11s cubic-bezier(.4,0,.2,1) infinite alternate;animation-delay:-5s}
@keyframes hl-sway1{from{transform:rotate(-2.4deg) translate(-16px,6px)}to{transform:rotate(2.2deg) translate(14px,-8px)}}
@keyframes hl-sway2{from{transform:rotate(2deg) translate(12px,-4px) scale(1.04)}to{transform:rotate(-2.6deg) translate(-14px,8px) scale(1.04)}}
.hl-copy{display:grid;gap:16px;justify-items:start}
.hl-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.hl h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.hl-lead{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hl-price{margin:0;font-size:20px;font-weight:700}
.hl-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hl-btn:hover{transform:translateY(-2px)}}
.hl-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.hl-sh{animation:none}}
@media(max-width:767px){.hl{grid-template-columns:minmax(0,1fr)}.hl-frame{width:58%}}`,
  html:`<div class="stage"><section class="hl" aria-labelledby="hl-h">
  <div class="hl-wall">
    <figure class="hl-frame"><img src="../assets/media/real/s07/hero-posters.webp" alt="הדפס בשחור לבן של קיר מלא בפוסטרים קרועים" width="1100" height="1375" loading="lazy" decoding="async"></figure>
    <div class="hl-shadow" aria-hidden="true">
      <svg class="hl-sh hl-sh1" viewBox="0 0 800 800" preserveAspectRatio="xMaxYMin slice"><defs><filter id="hl-b1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter></defs>${leafShadow(7, 3, 96, "hl-b1")}</svg>
      <svg class="hl-sh hl-sh2" viewBox="0 0 800 800" preserveAspectRatio="xMaxYMin slice"><defs><filter id="hl-b2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter></defs>${leafShadow(23, 4, 54, "hl-b2")}</svg>
    </div>
  </div>
  <div class="hl-copy">
    <p class="hl-k">הדפסי אמנות</p>
    <h2 id="hl-h">הדפס ממוסגר, מוכן לתלייה</h2>
    <p class="hl-lead">מדפיסים על נייר כותנה בסדנה בתל אביב, ממסגרים בעץ אלון ושולחים באריזה קשיחה, בדרך כלל תוך חמישה ימי עבודה.</p>
    <p class="hl-price">החל מ-390 ₪</p>
    <a class="hl-btn" href="#">לבחירת הדפס</a>
  </div>
</section></div>`
},
{
  id:"g260", cat:"gsap", name:"דגם אריגה שמצייר את עצמו קו אחר קו", tech:"GSAP · ScrollTrigger scrub · SVG stroke-dashoffset", status:"מאושר-עין",
  desc:"בזמן הגלילה סריג יהלומים מצייר את עצמו על משטח כהה: קודם האלכסונים העולים נמשכים מהצד הימני אחד אחרי השני, אחר כך היורדים, וכל חיתוך נפתח באחד מהקווים לסירוגין, כך שהם נראים שזורים זה בזה. אחרי הקווים נוחתות נקודות במרכזי היהלומים, ובסוף נסגרת מסגרת דקה סביב הכול. הסקשן נעוץ במסך לאורך הציור.",
  when:"סקשן של סדנה, מלאכה, תרבות, אדריכלות או מתמטיקה, שהדוגמה בו היא התוכן: אריחים, טקסטיל, רהיטים בעבודת יד, סטודיו לעיצוב פנים. הציור נותן לדוגמה זמן להיבנות מול העין. לא למותג טכנולוגי קר, ולא כשאין דוגמה אמיתית שחוזרת על עצמה.",
  note:"**שחזור.** השראה: סרטון אחד ב-prompt-motion.com (21.10.2026) שבו סריג של לולאות שזורות מצייר את עצמו סביב רשת נקודות על רקע כחול כהה. נבנה מאפס מהצפייה, בצורה פשוטה יותר: סריג יהלומים שזור, ולא הלולאות המקוריות. **הסריג:** שתי משפחות של 15 קווים, `x + y = a` ו-`x - y = b`, במרווח של 64 ביחידות viewBox של 512. כל חיתוך בין שני קווים נפתח באחד מהם לפי זוגיות האינדקסים, בפער של 8 יחידות לכל צד, וזה מה שיוצר את מראה האריגה. הנקודות במרכזי היהלומים הן הנקודות `(i * 32, j * 32)` שבהן `i + j` אי-זוגי. **כל קטע הוא `path` נפרד עם `pathLength=\"1\"`**, כי `stroke-dasharray` מתאפס בתחילת כל תת-מסלול, וקו שלם עם כמה תת-מסלולים היה נצבע בכל קטעיו בבת אחת. בנתונים של כל קטע (`data-a`, `data-b`) כתוב איזה חלק מהקו הוא מכסה, ולכן הציור זורם לאורך הקו במהירות אחידה. **הטיימליין:** `scrub: .6` על סקשן נעוץ בגובה 280vh. הקווים נצבעים מימין לשמאל, האלכסונים העולים ב-0 עד 1.1 והיורדים ב-.4 עד 1.5, הנקודות ב-1.35 עם `stagger` של `.3` מהמרכז, והמסגרת ב-1.5. **המצב הסופי במארקאפ:** הסריג המלא, הנקודות והמסגרת, וזה מה שרואים בלי GSAP ובהפחתת תנועה. **המשטח** הוא `var(--ink)` והקווים `var(--bg)`, ולכן הוא מתהפך נכון בעור כהה. **בטלפון** הטקסט מעל והמשטח מתחת, והמשטח מוגבל ל-46% מגובה המסך. **אתר LTR:** `.ho-svg:dir(ltr){transform:scaleX(-1)}` הופך את הצורה, כך שהציור מתחיל מהצד השמאלי. **נגישות:** האיור `aria-hidden`.",
  libs:["gsap","ScrollTrigger"],
  css:`.ho{position:relative;max-width:1100px;margin-inline:auto}
.ho-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);padding:clamp(32px,5vw,72px) 0}
.ho-copy{display:grid;gap:16px;justify-items:start}
.ho-k{margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.ho h2{margin:0;font-size:clamp(28px,3.4vw,48px);line-height:1.12;text-wrap:balance}
.ho-lead{margin:0;max-width:40ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ho-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.ho-btn:hover{transform:translateY(-2px)}}
.ho-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.ho-art{justify-self:center;width:min(100%,76svh);aspect-ratio:1 / 1;overflow:hidden;border-radius:24px;background:var(--ink)}
.ho-svg{display:block;width:100%;height:100%}
.ho-svg:dir(ltr){transform:scaleX(-1)}
.ho-s{fill:none;stroke:var(--bg);stroke-width:2.2;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;opacity:.92}
.ho-dot{fill:var(--accent)}
.ho-fr{fill:none;stroke:var(--bg);stroke-width:1.5;stroke-dasharray:1;stroke-dashoffset:0;opacity:.7}
/* המהלך רץ: הסקשן גבוה והבמה נעוצה במסך, והגלילה מציירת את הדגם */
.ho.is-live{height:280vh}
.ho.is-live .ho-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}
@media(max-width:767px){
  .ho-pin{grid-template-columns:minmax(0,1fr);align-content:center;gap:16px}
  .ho-copy{gap:12px}
  .ho-art{width:min(100%,46svh)}
}`,
  html:`<div class="stage"><section class="ho" aria-labelledby="ho-h">
  <div class="ho-pin">
    <div class="ho-copy">
      <p class="ho-k">סדנת אריחים בעבודת יד</p>
      <h2 id="ho-h">אריחים שמתחילים בשרטוט אחד</h2>
      <p class="ho-lead">כל דוגמה נבנית מקו אחד שחוזר על עצמו ונשזר בקו הבא, ובסדנה כל אריח נוצק, נצבע ונשרף בנפרד.</p>
      <a class="ho-btn" href="#">לקטלוג הדוגמאות</a>
    </div>
    <div class="ho-art" aria-hidden="true">
      <svg class="ho-svg" viewBox="0 0 512 512">${lattice.segs}${lattice.dots}<rect class="ho-fr" x="10" y="10" width="492" height="492" rx="6" pathLength="1"/></svg>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;   // בלי GSAP נשאר הדגם המלא
  gsap.registerPlugin(ScrollTrigger);
  const root=document.querySelector(".ho"),segs=[...root.querySelectorAll(".ho-s")],dots=[...root.querySelectorAll(".ho-dot")],fr=root.querySelector(".ho-fr");
  // בהפחתת תנועה הפונקציה לא רצה, והדגם המלא נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    gsap.set(segs,{strokeDashoffset:1});gsap.set(fr,{strokeDashoffset:1});
    gsap.set(dots,{scale:0,transformOrigin:"50% 50%"});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    // כל קטע מצייר את החלק שלו מהקו (a עד b) בתוך משך הקו, כך שהציור זורם במהירות אחידה לאורך כל קו
    segs.forEach(s=>{
      const d=s.dataset,a=+d.a,b=+d.b,dur=+d.d,start=(+d.f?.4:0)+(+d.o)/14*.5;
      tl.to(s,{strokeDashoffset:0,duration:dur*(b-a)},start+dur*a);
    });
    tl.to(dots,{scale:1,duration:.2,ease:"power2.out",stagger:{amount:.3,from:"center"}},1.35)
      .to(fr,{strokeDashoffset:0,duration:.5},1.5);
    return()=>{
      if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();
      root.classList.remove("is-live");
      gsap.set([...segs,...dots,fr],{clearProps:"all"});
    };
  });
})();`
},
{
  id:"b98", cat:"behavior", name:"רשת ספרות עמומה שמהבהבת מאחורי כותרת", tech:"Canvas 2D · IntersectionObserver · טקסט סטטי", status:"מאושר-עין", runway:false,
  desc:"מאחורי הכותרת של סקשן ניטור פרוסה רשת צפופה של ספרות עמומות, כמו מסך נתונים כבוי למחצה. מדי פעם ספרה בודדת מתחלפת ומתלקחת בצבע המותג, ודועכת בחזרה בתוך חצי שנייה, בלי קצב קבוע. בצד הכותרת נקודת סטטוס עם הילה שמפעמת לאט. הרשת דועכת בקצוות, ומתחת לטקסט יושבת שכבה רכה שמשאירה אותו קריא.",
  when:"הירו או סקשן סטטוס של שירות טכני: ניטור, אבטחה, תשלומים, תשתיות, כלי נתונים, אירוח. הרשת מספרת שיש מערכת שרצה בלי להגיד כלום. לא לאתר של עסק מקומי או של שירות אישי, לא מתחת לטקסט ארוך, ולא ליד טבלה אמיתית של מספרים, כי היא תתחרה בה.",
  note:"**שחזור.** השראה: שני סרטונים ב-prompt-motion.com (21.10.2026): רשת ספרות עמומה מאחורי כותרת, ועמודות גושים שיורדות ומשנות צבע. נבנה מאפס מהצפייה, רק את הרשת (הגשם הוא תנועה אחרת). **הציור:** קנבס אחד, תא של 14 על 20 פיקסלים עם ספרה במרכזו, `ctx.fillText` רק בתאים שמשתנים. הרשת מצוירת פעם אחת עמומה (`ink` בשקיפות 20%), ואחר כך בכל פריים (16 פעמים בשנייה) נדלקים כמה תאים אקראיים: מוחקים את התא (`clearRect`), מציירים אותו עמום ומעליו את אותה ספרה בצבע המותג בעוצמה `heat`, ו-`heat` יורד ב-.12 בכל פריים עד שהתא חוזר לעמום. כך עלות הפריים היא עשרות תאים ולא אלפים, ויש לפעמים ספרה חדשה בכל התלקחות. כמות ההדלקות היא 0.6% מהתאים בפריים. **קל:** DPR עד 2, ResizeObserver לבנייה מחדש, והלולאה עוצרת מחוץ למסך ובלשונית רקע. הצבעים נקראים מהטוקנים בזמן ריצה. **בלי JS:** `pre` עם 34 שורות של 110 ספרות מחולל פסאודו-אקראי, בגופן מונוספייס ובאותו צבע עמום, `aria-hidden`. כשהקנבס מוכן הוא מחליף אותו בהצלבה (`is-on`). **בהפחתת תנועה** הקנבס מצויר פעם אחת ואין הדלקות. **הקריאות:** הכותרת יושבת על שכבה רכה בצבע הרקע, והרשת דועכת בקצוות במסכה. הספרות הן הרקע בלבד: אין בהן מידע, ולכן אסור להציג בצורה הזו מספרים אמיתיים. **נקודת הסטטוס** היא אנימציית CSS של טבעת שמתרחבת ודוהה (`transform` ו-`opacity`).",
  libs:[],
  css:`.hm{position:relative;isolation:isolate;overflow:hidden;display:grid;align-items:center;min-height:clamp(420px,66vh,640px);padding:clamp(48px,6vw,96px) var(--gutter)}
.hm-art{position:absolute;inset:0;z-index:-1;-webkit-mask-image:radial-gradient(ellipse at 50% 50%,var(--ink) 40%,transparent 100%);mask-image:radial-gradient(ellipse at 50% 50%,var(--ink) 40%,transparent 100%)}
.hm-txt{position:absolute;inset:0;margin:0;direction:ltr;overflow:hidden;white-space:pre;font:12px/20px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:6.4px;color:color-mix(in srgb,var(--ink) 20%,transparent);transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.hm-cv{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .6s cubic-bezier(.2,.6,.2,1)}
.hm-art.is-on .hm-cv{opacity:1}
.hm-art.is-on .hm-txt{opacity:0}
.hm-in{position:relative;display:grid;gap:16px;justify-items:start;max-width:38ch}
.hm-in::before{content:"";position:absolute;inset:-48px -64px;z-index:-1;pointer-events:none;background:radial-gradient(closest-side,color-mix(in srgb,var(--bg) 96%,transparent) 55%,transparent)}
.hm-status{display:flex;align-items:center;gap:12px;margin:0;font-size:15px;font-weight:600;color:var(--muted)}
.hm-dot{position:relative;width:10px;height:10px;border-radius:50%;background:var(--accent)}
.hm-dot::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--accent);animation:hm-pulse 2.4s cubic-bezier(.4,0,.2,1) infinite}
@keyframes hm-pulse{from{transform:scale(1);opacity:.7}to{transform:scale(3);opacity:0}}
.hm h2{margin:0;font-size:clamp(34px,4.6vw,64px);line-height:1.08;text-wrap:balance}
.hm-lead{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.hm-btn{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:700;text-decoration:none;transition:transform .2s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hm-btn:hover{transform:translateY(-2px)}}
.hm-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media(prefers-reduced-motion:reduce){.hm-txt,.hm-cv{transition:none}.hm-dot::after{animation:none}}
@media(max-width:767px){.hm{min-height:480px}.hm-in::before{inset:-32px -24px}}`,
  html:`<div class="stage"><section class="hm">
  <div class="hm-art" aria-hidden="true">
    <pre class="hm-txt">${digitGrid}</pre>
    <canvas class="hm-cv"></canvas>
  </div>
  <div class="hm-in">
    <p class="hm-status"><span class="hm-dot" aria-hidden="true"></span>כל המערכות פעילות</p>
    <h2>ניטור זמינות לאתר ולחנות</h2>
    <p class="hm-lead">בדיקה כל דקה מחמישה אזורים בעולם, והודעה בוואטסאפ ברגע שמשהו משתנה.</p>
    <a class="hm-btn" href="#">להתחיל תקופת ניסיון</a>
  </div>
</section></div>`,
  js:`(function(){
  const root=document.querySelector(".hm"),art=root.querySelector(".hm-art"),cv=art.querySelector(".hm-cv"),ctx=cv.getContext("2d");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,CW=14,CH=20;
  let W=0,H=0,cols=0,rows=0,N=0,dig,heat,act=[],ink=[0,0,0],acc=[0,0,0],running=false,vis=false,raf=0,last=0,seed=7;
  const rnd=()=>(seed=(seed*1664525+1013904223)>>>0)/4294967296;
  // הצבעים נקראים מהטוקנים בזמן ריצה
  const probe=document.createElement("canvas").getContext("2d");
  const rgb=c=>{probe.fillStyle="#000";probe.fillStyle=c;const h=probe.fillStyle;
    if(h.charAt(0)==="#")return[1,3,5].map(k=>parseInt(h.slice(k,k+2),16));
    return h.slice(h.indexOf("(")+1,h.lastIndexOf(")")).split(",").slice(0,3).map(Number);};
  const colors=()=>{const cs=getComputedStyle(root);ink=rgb(cs.color);acc=rgb(cs.getPropertyValue("--accent").trim()||cs.color);};
  const rgba=(c,a)=>"rgba("+c[0]+","+c[1]+","+c[2]+","+a+")";
  // תא אחד: מוחקים, מציירים עמום, ומעליו את אותה ספרה בצבע המותג לפי החום
  function cell(i,h){
    const x=(i%cols)*CW,y=((i/cols)|0)*CH;
    ctx.clearRect(x,y,CW,CH);ctx.fillStyle=rgba(ink,.2);ctx.fillText(dig[i],x+CW/2,y+CH/2);
    if(h>0){ctx.fillStyle=rgba(acc,Math.min(1,h*.95));ctx.fillText(dig[i],x+CW/2,y+CH/2);}
  }
  function build(){
    const dpr=Math.min(2,devicePixelRatio||1),r=art.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;
    cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.font="12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";ctx.textAlign="center";ctx.textBaseline="middle";
    cols=Math.ceil(W/CW);rows=Math.ceil(H/CH);N=cols*rows;dig=new Uint8Array(N);heat=new Float32Array(N);act=[];
    colors();for(let i=0;i<N;i++){dig[i]=(rnd()*10)|0;cell(i,0);}
  }
  function tick(now){
    raf=0;if(!running)return;
    if(now-last>=62){
      last=now;
      for(let n=Math.max(2,Math.round(N*.006));n>0;n--){const i=(rnd()*N)|0;if(heat[i]<=0)act.push(i);dig[i]=(rnd()*10)|0;heat[i]=1;}
      for(let k=act.length-1;k>=0;k--){const i=act[k];heat[i]-=.12;if(heat[i]<=0){heat[i]=0;act.splice(k,1);}cell(i,heat[i]);}
    }
    raf=requestAnimationFrame(tick);
  }
  function sync(){running=!reduced&&vis&&!document.hidden;if(running&&!raf)raf=requestAnimationFrame(tick);}
  document.addEventListener("visibilitychange",sync);
  new ResizeObserver(build).observe(art);
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){art.classList.add("is-on");colors();}sync();},{rootMargin:"20% 0px"}).observe(root);
  if(reduced)art.classList.add("is-on");   // פריים אחד, בלי הדלקות
  build();
})();`
}
];
