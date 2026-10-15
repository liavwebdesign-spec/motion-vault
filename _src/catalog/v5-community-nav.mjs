// v5-community-nav.mjs: community-inspired navigation moves. b76 is a RECREATE of the shifting-dropdown idea (code written from scratch).
const ARR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg>`;
const ic = d => `<span class="sd-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter">${d}</svg></span>`;
const IC = {
  site: ic(`<rect x="3" y="4" width="18" height="16"/><path d="M3 9h18"/>`),
  land: ic(`<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>`),
  shop: ic(`<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>`),
  sys: ic(`<rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><path d="M13 17h8M17 13v8"/>`),
  brand: ic(`<path d="M12 3l9 5v8l-9 5-9-5V8z"/><path d="M12 12v9M12 12l9-4M12 12L3 8"/>`),
  seo: ic(`<path d="M3 20h18"/><path d="M5 16l5-5 4 3 6-8"/>`),
  story: ic(`<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>`),
  steps: ic(`<path d="M4 18h5v-5h5V8h6"/>`),
  voice: ic(`<path d="M4 5h16v11H9l-5 4z"/>`),
};
const row = (icon, t, d) => `<a class="sd-row" href="#">${icon}<span class="sd-tx"><b>${t}</b><span>${d}</span></span></a>`;
const row2 = (t, d) => `<a class="sd-row sd-row2" href="#"><span class="sd-tx"><b>${t}</b><span>${d}</span></span>${ARR}</a>`;

export default [
{
  id:"b76", cat:"behavior", name:"תפריט עם פאנל אחד שמחליק בין הפריטים", tech:"CSS clip-path · JS", status:"ממתין",
  desc:"ארבעה פריטים בתפריט נפתחים לאותו פאנל. במעבר מפריט לפריט הפאנל לא נסגר ונפתח מחדש: החץ שלו מחליק אל הפריט החדש, הפאנל משנה את גודלו לתוכן, והתוכן נכנס מהצד שאליו זז העכבר.",
  when:"אתר שירותים או סטודיו עם שלושה עד חמישה פריטי תפריט שמסתתרים מאחוריהם קישורים עשירים (שירותים, תחומים, משאבים, אודות). בלי זה, כל פריט פותח חלון משלו ומי שסורק את התפריט רואה הבהוב. לא למגה תפריט אחד גדול (b65), ולא לאתר עם פחות משלושה קישורים בפאנל.",
  libs:[],
  runway:false,
  css:`.sd-demo{min-height:140vh}
.sd{--sd-r:18px;--sd-gap:14px;--sd-e:cubic-bezier(.2,.6,.2,1);position:sticky;top:0;z-index:50;background:var(--card);
  box-shadow:0 6px 20px color-mix(in srgb,var(--ink) 6%,transparent)}
.sd-bar{display:flex;align-items:center;gap:24px;min-height:72px;padding-inline:var(--gutter)}
.sd-logo{font-weight:800;font-size:20px}
.sd-nav ul{display:flex;align-items:center;gap:4px;list-style:none;margin:0;padding:0}
.sd-trig,.sd-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border:0;border-radius:999px;
  background:none;font:inherit;font-size:15px;font-weight:500;color:var(--muted);text-decoration:none;cursor:pointer;
  transition:color .15s var(--sd-e),background-color .18s var(--sd-e)}
/* the chevron is drawn with PHYSICAL borders: logical ones rotate it sideways in RTL */
.sd-trig i{width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;
  transform:rotate(45deg) translateY(-2px);transition:transform .3s var(--sd-e)}
.sd-trig[aria-expanded="true"]{color:var(--ink);background:color-mix(in srgb,var(--accent) 10%,transparent)}
.sd-trig[aria-expanded="true"] i{transform:rotate(225deg) translateY(-2px)}
.sd-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 20px;margin-inline-start:auto;border-radius:12px;
  background:var(--accent);color:var(--accent-ink);font-size:14px;font-weight:600;text-decoration:none;transition:transform .18s var(--sd-e)}
.sd-trig:focus-visible,.sd-link:focus-visible,.sd-cta:focus-visible,.sd-row:focus-visible,.sd-feat:focus-visible,.sd-m summary:focus-visible,.sd-m a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sd-row:focus-visible,.sd-feat:focus-visible{outline-offset:-2px}

/* one shared surface. Geometry is measured in JS and moved with transform and clip-path only: no width or height ever animates */
.sd-pop{position:absolute;inset-inline:0;top:100%;height:calc(var(--sd-h,340px) + var(--sd-gap) + 64px);overflow:clip;overflow-clip-margin:48px;
  pointer-events:none;visibility:hidden;opacity:0;transform:translateY(-6px);
  transition:opacity .2s var(--sd-e),transform .26s var(--sd-e),visibility 0s linear .26s}
.sd-pop.is-open{visibility:visible;opacity:1;transform:none;transition-delay:0s}
.sd-pop.snap,.sd-pop.snap *{transition:none!important}
.sd-bridge{position:absolute;inset-inline:0;top:0;height:calc(var(--sd-gap) + 4px);pointer-events:auto}
/* physical left on purpose: every position here comes from getBoundingClientRect, so it is already visual */
.sd-fx{position:absolute;left:0;top:var(--sd-gap);width:var(--sd-w,0px);height:var(--sd-h,0px);will-change:transform;
  filter:drop-shadow(0 0 1px color-mix(in srgb,var(--ink) 20%,transparent)) drop-shadow(0 22px 28px color-mix(in srgb,var(--ink) 14%,transparent));
  transition:transform .3s var(--sd-e)}
.sd-surface{position:absolute;inset:0;background:var(--card);pointer-events:auto;clip-path:inset(0 0 0 0 round var(--sd-r));
  transition:clip-path .3s var(--sd-e)}
.sd-nub{position:absolute;left:0;top:-8px;width:16px;height:16px;border-radius:3px;background:var(--card);pointer-events:none;
  transform:translate3d(0,0,0) rotate(45deg);transition:transform .3s var(--sd-e)}

/* the views: all stacked top-left inside the surface, one is on */
.sd-view{position:absolute;left:0;top:0;width:min(var(--w,480px),calc(100vw - 2 * var(--gutter)));padding:24px;
  opacity:0;visibility:hidden;transform:translate3d(var(--dx,0px),0,0);
  transition:transform .28s var(--sd-e),opacity .2s var(--sd-e),visibility 0s linear .28s}
.sd-view.on{opacity:1;visibility:visible;transform:none;transition-delay:0s,.04s,0s}
.sd-view.prep{transition:none}
.sd-v-services{--w:780px}
.sd-v-industries{--w:440px;padding:16px}
.sd-v-resources{--w:600px}
.sd-v-about{--w:400px;padding:16px}
.sd-split{display:grid;grid-template-columns:1fr 240px;gap:24px;align-items:start}
.sd-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 8px;align-content:start}
.sd-row{display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:start;padding:12px;border-radius:12px;color:var(--ink);text-decoration:none;
  transition:background-color .18s var(--sd-e)}
.sd-row2{grid-template-columns:1fr 18px;align-items:center}
.sd-row2 svg{width:18px;height:18px;opacity:0;transform:translateX(6px);transition:opacity .18s var(--sd-e),transform .18s var(--sd-e)}
[dir="ltr"] .sd-row2 svg{transform:translateX(-6px) scaleX(-1)}
.sd-ic{display:grid;place-items:center;width:40px;height:40px;border-radius:10px;background:color-mix(in srgb,var(--accent) 9%,var(--bg));color:var(--accent)}
.sd-ic svg{width:20px;height:20px}
.sd-tx b{display:block;font-size:15px;font-weight:600;line-height:1.3}
.sd-tx span{display:block;margin-top:2px;font-size:13px;line-height:1.45;color:var(--muted)}
.sd-feat{display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:var(--bg);color:var(--ink);text-decoration:none}
.sd-feat img{display:block;width:100%;height:132px;object-fit:cover;transition:transform .5s var(--sd-e)}
.sd-feat-b{display:grid;gap:6px;padding:16px}
.sd-eyebrow{font-size:12px;font-weight:600;color:var(--accent)}
.sd-feat strong{font-size:15px;font-weight:600;line-height:1.35}
.sd-more{display:inline-flex;align-items:center;gap:6px;margin-top:4px;font-size:13px;font-weight:600;color:var(--accent)}
.sd-more svg{width:16px;height:16px}
.sd-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px;padding:14px 16px;border-radius:12px;
  background:var(--bg);font-size:14px;color:var(--muted)}
.sd-foot a{display:inline-flex;align-items:center;gap:6px;font-weight:600;color:var(--accent);text-decoration:none}
.sd-foot a svg{width:16px;height:16px}
.sd-foot a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sd-res{display:grid;grid-template-columns:1.1fr 1fr;gap:24px;align-items:start}
.sd-res h4{margin:0 0 8px;padding-inline:12px;font-size:12px;font-weight:600;color:var(--muted)}
.sd-time{display:block;margin-top:2px;font-size:12px;color:var(--muted)}
@media (hover:hover) and (pointer:fine){
  .sd-trig:hover,.sd-link:hover{color:var(--ink)}
  .sd-row:hover{background:color-mix(in srgb,var(--accent) 7%,transparent)}
  .sd-row2:hover svg{opacity:1;transform:none}
  .sd-feat:hover img{transform:scale(1.04)}
  .sd-cta:hover{transform:translateY(-1px)}
}

/* without JS: no shared surface, each view is a plain dropdown under its own item (hover and :focus-within) */
.sd:not(.is-js) .sd-pop{display:none}
.sd:not(.is-js) .sd-item{position:relative}
.sd:not(.is-js) .sd-view{left:auto;inset-inline-start:0;top:calc(100% + 20px);z-index:3;background:var(--card);border-radius:var(--sd-r);
  box-shadow:0 18px 40px color-mix(in srgb,var(--ink) 14%,transparent);pointer-events:none}
.sd:not(.is-js) .sd-view::before{content:"";position:absolute;inset-inline:0;top:-20px;height:20px}
.sd:not(.is-js) .sd-item:hover .sd-view,.sd:not(.is-js) .sd-item:focus-within .sd-view{opacity:1;visibility:visible;transform:none;pointer-events:auto}

/* below 1024 the desktop nav gives way to a plain disclosure (for phones the pattern is the drawer, b66) */
.sd-m{display:none}
.sd-body{padding:var(--sec) var(--gutter);max-width:1100px;margin-inline:auto}
.sd-body h2{max-width:20ch;margin-bottom:16px;font-weight:800}
.sd-body p{max-width:56ch;margin:0 0 24px;color:var(--muted)}
.sd-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
.sd-card{padding:24px;border-radius:var(--r);background:var(--card)}
.sd-card b{display:block;margin-bottom:8px;font-size:18px}
.sd-card span{font-size:15px;color:var(--muted)}
@media (max-width:1023px){
  .sd-nav,.sd-bar>.sd-cta{display:none}
  .sd-m{display:block;margin-inline-start:auto}
  .sd-m summary{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 18px;border-radius:999px;list-style:none;cursor:pointer;
    background:color-mix(in srgb,var(--accent) 10%,transparent);font-size:15px;font-weight:600;color:var(--ink)}
  .sd-m summary::-webkit-details-marker{display:none}
  .sd-m summary i{position:relative;width:16px;height:10px}
  .sd-m summary i::before,.sd-m summary i::after{content:"";position:absolute;inset-inline:0;height:2px;background:currentColor;transition:transform .25s var(--sd-e)}
  .sd-m summary i::before{top:0}
  .sd-m summary i::after{bottom:0}
  .sd-m[open] summary i::before{transform:translateY(4px) rotate(45deg)}
  .sd-m[open] summary i::after{transform:translateY(-4px) rotate(-45deg)}
  .sd-m-list{position:absolute;inset-inline:0;top:100%;padding:16px var(--gutter) 24px;background:var(--card);
    box-shadow:0 18px 32px color-mix(in srgb,var(--ink) 10%,transparent);animation:sd-in .24s var(--sd-e)}
  .sd-m-list h4{margin:16px 0 4px;font-size:12px;font-weight:600;color:var(--muted)}
  .sd-m-list h4:first-child{margin-top:0}
  .sd-m-list a{display:flex;align-items:center;min-height:44px;font-size:16px;color:var(--ink);text-decoration:none}
  .sd-m-list .sd-cta{justify-content:center;margin-top:16px;color:var(--accent-ink)}
  .sd-cards{grid-template-columns:1fr}
}
@keyframes sd-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){
  .sd-pop,.sd-pop *,.sd-m-list{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important}
  .sd-feat:hover img{transform:none}
}`,
  html:`<div class="sd-demo">
<header class="sd" data-sd>
  <div class="sd-bar">
    <strong class="sd-logo">לוגו</strong>
    <nav class="sd-nav" aria-label="ניווט ראשי"><ul>
      <li class="sd-item"><button class="sd-trig" type="button" aria-expanded="false" aria-controls="sdv-services">שירותים <i aria-hidden="true"></i></button>
        <div class="sd-view sd-v-services" id="sdv-services" role="region" aria-label="שירותים"><div class="sd-split">
          <div class="sd-grid">
            ${row(IC.site,"אתרי תדמית","אתר שמסביר מי אתם ולמה דווקא אתכם")}
            ${row(IC.land,"דפי נחיתה","עמוד אחד עם מטרה אחת: פנייה")}
            ${row(IC.shop,"חנויות אונליין","מסלול קנייה קצר ודף מוצר שמוכר")}
            ${row(IC.sys,"מערכות פנימיות","לקוחות, הצעות מחיר ואוטומציות במקום אחד")}
            ${row(IC.brand,"מיתוג ועיצוב","לוגו, צבעים ושפה שנשארים עקביים")}
            ${row(IC.seo,"קידום וחיפוש","להופיע כשמחפשים אתכם בגוגל ובצ'אט")}
          </div>
          <a class="sd-feat" href="#"><img src="../assets/media/real/s09/step-3-exam.webp" width="1500" height="1200" alt="" decoding="async">
            <span class="sd-feat-b"><span class="sd-eyebrow">מקרה לדוגמה</span><strong>איך מרפאה קטנה הפכה את האתר לערוץ הפניות הראשי</strong><span class="sd-more">לקריאת המקרה ${ARR}</span></span></a>
        </div></div></li>
      <li class="sd-item"><button class="sd-trig" type="button" aria-expanded="false" aria-controls="sdv-industries">תחומים <i aria-hidden="true"></i></button>
        <div class="sd-view sd-v-industries" id="sdv-industries" role="region" aria-label="תחומים">
          ${row2("נדל\"ן ויזמות","אתרי פרויקט, דפי השקה ומערכת לידים")}
          ${row2("קליניקות ורפואה","קביעת תורים ואמון כבר במסך הראשון")}
          ${row2("חנויות ומותגי מוצר","קטלוג, סל ותשלום בלי חיכוך")}
          ${row2("עורכי דין ויועצים","סמכות מקצועית שמביאה פניות איכותיות")}
          <div class="sd-foot"><span>לא מצאתם את התחום שלכם?</span><a href="#">נדבר על זה ${ARR}</a></div>
        </div></li>
      <li><a class="sd-link" href="#">פרויקטים</a></li>
      <li class="sd-item"><button class="sd-trig" type="button" aria-expanded="false" aria-controls="sdv-resources">משאבים <i aria-hidden="true"></i></button>
        <div class="sd-view sd-v-resources" id="sdv-resources" role="region" aria-label="משאבים"><div class="sd-res">
          <a class="sd-feat" href="#"><img src="../assets/media/real/s13/room.webp" width="2200" height="1469" alt="" decoding="async">
            <span class="sd-feat-b"><span class="sd-eyebrow">מדריך חדש</span><strong>מה צריך לדעת לפני שמזמינים אתר</strong><span class="sd-time">קריאה של שש דקות</span></span></a>
          <div><h4>מדריכים קצרים</h4>
            <a class="sd-row sd-row2" href="#"><span class="sd-tx"><b>רשימת בדיקה לפני השקה</b><span class="sd-time">קריאה של ארבע דקות</span></span>${ARR}</a>
            <a class="sd-row sd-row2" href="#"><span class="sd-tx"><b>איך כותבים אפיון בעמוד אחד</b><span class="sd-time">קריאה של חמש דקות</span></span>${ARR}</a>
            <a class="sd-row sd-row2" href="#"><span class="sd-tx"><b>נגישות באתר: מה החוק דורש</b><span class="sd-time">קריאה של שבע דקות</span></span>${ARR}</a>
            <div class="sd-foot"><a href="#">לכל המשאבים ${ARR}</a></div>
          </div>
        </div></div></li>
      <li class="sd-item"><button class="sd-trig" type="button" aria-expanded="false" aria-controls="sdv-about">אודות <i aria-hidden="true"></i></button>
        <div class="sd-view sd-v-about" id="sdv-about" role="region" aria-label="אודות">
          ${row(IC.story,"הסיפור שלנו","למה התחלנו, ואיך אנחנו עובדים")}
          ${row(IC.steps,"תהליך העבודה","מהשיחה הראשונה ועד ההשקה, בחמישה שלבים")}
          ${row(IC.voice,"מה אומרים לקוחות","מי שכבר עבד איתנו מספר")}
        </div></li>
    </ul></nav>
    <a class="sd-cta" href="#">לשיחת היכרות</a>
    <details class="sd-m"><summary><i aria-hidden="true"></i>תפריט</summary>
      <div class="sd-m-list">
        <h4>שירותים</h4><a href="#">אתרי תדמית</a><a href="#">דפי נחיתה</a><a href="#">חנויות אונליין</a><a href="#">מערכות פנימיות</a><a href="#">מיתוג ועיצוב</a><a href="#">קידום וחיפוש</a>
        <h4>תחומים</h4><a href="#">נדל"ן ויזמות</a><a href="#">קליניקות ורפואה</a><a href="#">חנויות ומותגי מוצר</a><a href="#">עורכי דין ויועצים</a>
        <h4>עוד</h4><a href="#">פרויקטים</a><a href="#">מדריכים ומשאבים</a><a href="#">אודות</a>
        <a class="sd-cta" href="#">לשיחת היכרות</a>
      </div></details>
  </div>
  <div class="sd-pop"><div class="sd-bridge"></div><div class="sd-fx"><div class="sd-surface"></div><span class="sd-nub"></span></div></div>
</header>
<main class="sd-body">
  <h2>אתר שמסביר, משכנע ומביא פניות</h2>
  <p>העבירו את העכבר על "שירותים", ואז על "תחומים" ועל "משאבים": הפאנל נשאר במקומו, החץ שלו נוסע אל הפריט החדש והתוכן נכנס מהצד שממנו הגעתם. במגע, לחיצה פותחת וסוגרת. במקלדת: Enter, או חץ למטה.</p>
  <div class="sd-cards">
    <div class="sd-card"><b>שיחת אפיון</b><span>עשרים דקות שבהן מבינים מי הלקוח שלכם ומה גורם לו לפנות.</span></div>
    <div class="sd-card"><b>סקיצה לפני שמשלמים</b><span>רואים את העמוד הראשי בפועל, ורק אחרי זה מאשרים.</span></div>
    <div class="sd-card"><b>השקה ותמיכה</b><span>האתר עולה, נבדק בטלפון ובמחשב, ונשאר מתוחזק.</span></div>
  </div>
</main>
</div>`,
  js:`(function(){
  const root=document.querySelector("[data-sd]");
  const pop=root.querySelector(".sd-pop"), fx=pop.querySelector(".sd-fx"), surf=pop.querySelector(".sd-surface"), nub=pop.querySelector(".sd-nub");
  const bar=root.querySelector(".sd-bar");
  const items=[...root.querySelectorAll(".sd-item")];
  const trigs=items.map(li=>li.querySelector(".sd-trig"));
  // the views leave their list items and join the one shared surface; without JS they stay where they are
  const views=items.map(li=>surf.appendChild(li.querySelector(".sd-view")));
  root.classList.add("is-js");
  const desktop=matchMedia("(min-width:1024px)"), reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const DIST=36, R=18;
  let size=[], Wm=0, Hm=0, cur=null, curG=null, mode=null, confirmed=false, pt="mouse", tOpen=0, tClose=0;

  function measure(){
    size=views.map(v=>({w:v.offsetWidth,h:v.offsetHeight}));
    Wm=Math.max(...size.map(s=>s.w)); Hm=Math.max(...size.map(s=>s.h));
    root.style.setProperty("--sd-w",Wm+"px"); root.style.setProperty("--sd-h",Hm+"px");
  }
  // direction and position come from the visual rectangles, never from the index: in RTL index 0 is the rightmost trigger
  function geo(i){
    const r=trigs[i].getBoundingClientRect(), b=root.getBoundingClientRect();
    const cx=r.left+r.width/2-b.left, w=size[i].w, h=size[i].h;
    const pad=parseFloat(getComputedStyle(bar).paddingLeft)||16;
    const left=Math.max(pad,Math.min(cx-w/2,b.width-w-pad));
    const nubX=Math.max(R+10,Math.min(cx-left,w-R-10));
    return {cx,w,h,left,nubX};
  }
  function put(g){
    fx.style.transform="translate3d("+g.left+"px,0,0)";
    surf.style.clipPath="inset(0px "+(Wm-g.w)+"px "+(Hm-g.h)+"px 0px round var(--sd-r))";
    nub.style.transform="translate3d("+(g.nubX-8)+"px,0,0) rotate(45deg)";
  }
  function snap(fn){ pop.classList.add("snap"); fn(); void pop.offsetWidth; pop.classList.remove("snap"); }
  function relayout(){
    if(!desktop.matches){close();return;}
    measure();
    if(cur!==null){curG=geo(cur);snap(()=>put(curG));}
  }

  function swap(prev,next,dir){
    const d=reduce.matches?0:DIST, inn=views[next], out=views[prev];
    // the new content enters from the side the new trigger is on, the old one leaves towards the other side
    inn.style.setProperty("--dx",(dir*d)+"px");
    inn.classList.add("prep"); void inn.offsetWidth; inn.classList.remove("prep");
    inn.classList.add("on"); inn.inert=false;
    out.style.setProperty("--dx",(-dir*d)+"px");
    out.classList.remove("on"); out.inert=true;
  }
  function open(i,how){
    clearTimeout(tClose); clearTimeout(tOpen);
    if(i===cur)return;
    if(size.length===0||!size[i].w)measure();
    const g=geo(i), prev=cur;
    if(prev===null){
      snap(()=>{
        views.forEach((v,k)=>{v.classList.toggle("on",k===i);v.inert=k!==i;v.style.removeProperty("--dx");});
        put(g);
      });
      pop.classList.add("is-open");
    }else{
      put(g);
      swap(prev,i,Math.sign(g.cx-curG.cx)||1);
    }
    trigs.forEach((t,k)=>t.setAttribute("aria-expanded",String(k===i)));
    cur=i; curG=g; mode=how; confirmed=false;
  }
  function close(){
    clearTimeout(tClose); clearTimeout(tOpen);
    if(cur===null)return;
    pop.classList.remove("is-open");
    // inert at once: the panel fades for 260ms and must not catch Tab or clicks while it does
    views.forEach(v=>{v.inert=true;});
    trigs[cur].setAttribute("aria-expanded","false");
    cur=null; curG=null; mode=null;
  }
  const later=()=>{clearTimeout(tClose);tClose=setTimeout(close,180);};
  const focusables=v=>[...v.querySelectorAll("a[href],button")];

  trigs.forEach((t,i)=>{
    t.addEventListener("pointerdown",e=>{pt=e.pointerType;});
    // hover: a short intent delay to open, none to switch (the panel is already there)
    t.addEventListener("pointerenter",e=>{
      if(e.pointerType!=="mouse"||!desktop.matches)return;
      clearTimeout(tClose);
      if(cur!==null){open(i,"hover");return;}
      clearTimeout(tOpen); tOpen=setTimeout(()=>open(i,"hover"),80);
    });
    t.addEventListener("pointerleave",()=>clearTimeout(tOpen));
    t.addEventListener("click",e=>{
      if(!desktop.matches)return;
      if(cur===i){
        // the hover already opened it: the click that follows confirms, it does not snap the panel shut under the pointer
        if(pt==="mouse"&&e.detail&&mode==="hover"&&!confirmed){confirmed=true;return;}
        close();return;
      }
      open(i,pt==="touch"||pt==="pen"?"touch":(e.detail?"hover":"key"));
      if(pt==="mouse"&&e.detail)confirmed=true;
    });
    t.addEventListener("keydown",e=>{
      if(e.key==="ArrowDown"){
        e.preventDefault(); open(i,"key"); focusables(views[i])[0].focus();
      }else if(e.key==="Tab"&&!e.shiftKey&&cur===i){
        e.preventDefault(); focusables(views[i])[0].focus();
      }else if(e.key==="ArrowLeft"||e.key==="ArrowRight"){
        // arrows follow the screen: the neighbour is chosen by its visual centre, not by its place in the list
        const sign=e.key==="ArrowRight"?1:-1, me=trigs[i].getBoundingClientRect(), mc=me.left+me.width/2;
        let best=-1,bd=1e9;
        trigs.forEach((o,k)=>{const r=o.getBoundingClientRect(),d=(r.left+r.width/2-mc)*sign;if(d>1&&d<bd){bd=d;best=k;}});
        if(best<0)return;
        e.preventDefault(); trigs[best].focus(); if(cur!==null)open(best,"key");
      }
    });
  });
  // leaving the nav closes it after a grace period; moving between triggers and over the panel cancels the countdown
  root.addEventListener("pointerover",e=>{
    if(e.pointerType!=="mouse"||!desktop.matches)return;
    if(e.target.closest(".sd-trig,.sd-pop"))clearTimeout(tClose);
    else if(cur!==null&&mode!=="key")later();
  });
  root.addEventListener("pointerleave",e=>{
    if(e.pointerType!=="mouse")return;
    clearTimeout(tOpen); if(cur!==null&&mode!=="key")later();
  });
  // Tab leaves the panel into the next item of the nav, not into whatever follows it in the DOM
  pop.addEventListener("keydown",e=>{
    if(e.key!=="Tab"||cur===null)return;
    const f=focusables(views[cur]), a=document.activeElement;
    if(e.shiftKey&&a===f[0]){e.preventDefault();trigs[cur].focus();}
    else if(!e.shiftKey&&a===f[f.length-1]){
      e.preventDefault();
      const t=trigs[cur], all=[...bar.querySelectorAll("a[href],button")].filter(x=>x.offsetParent!==null);
      const next=all.find(x=>t.compareDocumentPosition(x)&Node.DOCUMENT_POSITION_FOLLOWING);
      close(); (next||t).focus();
    }
  });
  // Escape closes from anywhere (also a panel opened by hover, WCAG 1.4.13); focus returns to the trigger if it was in the nav
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    const m=root.querySelector(".sd-m[open]"); if(m){m.open=false;m.querySelector("summary").focus();}
    if(cur===null)return;
    const t=trigs[cur], inside=root.contains(document.activeElement);
    close(); if(inside)t.focus();
  });
  root.addEventListener("focusout",e=>{if(cur!==null&&e.relatedTarget&&!root.contains(e.relatedTarget))close();});
  document.addEventListener("pointerdown",e=>{
    if(!root.contains(e.target)){close();const m=root.querySelector(".sd-m[open]");if(m)m.open=false;}
  });
  desktop.addEventListener("change",relayout);
  let raf=0; addEventListener("resize",()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(relayout);});
  if("ResizeObserver" in window){const ro=new ResizeObserver(()=>{if(desktop.matches)relayout();});views.forEach(v=>ro.observe(v));}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(relayout);
  views.forEach(v=>{v.inert=true;});
  relayout();
  // demo only: ?open=2 opens the third panel on load (used by screenshots), nothing else reads the query
  const q=/[?&]open=(\\d)/.exec(location.search);
  if(q&&items[+q[1]]&&desktop.matches)open(+q[1],"key");
})();`,
  note:"מה זה מוסיף על b39 ו-b65: ב-b39 כל פריט מחזיק פאנל משלו שנפתח ונסגר, וב-b65 יש מגה תפריט אחד שנפרש מלמעלה. כאן יש משטח אחד לכל הפריטים: במעבר מפריט לפריט הוא לא נסגר ונפתח מחדש, אלא משנה צורה. שלושה דברים נעים יחד באותם 300 מילישניות ובאותה עקומה: החץ (nub) מחליק אל מרכז הפריט החדש, הפאנל נוסע לשם ומשנה גודל, והתוכן נכנס מהצד שממנו זז העכבר. **הגודל בלי לאנפש גובה או רוחב**: כל התצוגות מונחות אחת על השנייה בתוך המשטח, ה-JS מודד את הגדולה שבהן ומגדיר למשטח את הגודל המקסימלי, ו-clip-path מצמצם אותו לגודל התוכן הפעיל. clip-path עם round שומר על פינות עגולות בכל שלב, ו-drop-shadow על העטיפה (ולא box-shadow, שהיה נחתך) נותן צל אחד לכל הצורה, כולל החץ. תנועת הפאנל עצמו היא transform, ואין שום transition על layout. **כיוון נמדד חזותית**: המיקום והכיוון מחושבים ממרכזי המלבנים של הכפתורים (getBoundingClientRect), לא מהאינדקס, כי ב-RTL האינדקס הראשון הוא הכפתור הימני ביותר. פריט חדש שנמצא חזותית משמאל מכניס את התוכן משמאל, והחצים במקלדת (ימינה ושמאלה) זזים גם הם לפי המסך. כשאין פאנל פתוח, הפתיחה הראשונה מצמידה את הגיאומטריה בלי תנועה ורק אז מציגה (מחלקת snap), אחרת הפאנל היה מגיע מהפינה. **גשר ויציאה**: פס שקוף מעל הפאנל סוגר את הרווח, ויציאה מכל התפריט סוגרת אחרי 180 מילישניות; מעבר בין כפתורים או אל הפאנל מבטל את הספירה. לחיצה על פריט שהריחוף פתח היא אישור ולא סוגרת, לחיצה שנייה סוגרת. **נגישות**: כפתורים עם aria-expanded ו-aria-controls, Enter ורווח פותחים, חץ למטה פותח ועובר לקישור הראשון, Tab מהכפתור נכנס לפאנל ו-Tab מהקישור האחרון ממשיך לפריט הבא בתפריט (לא למה שבא אחרי הפאנל ב-DOM), Escape סוגר מכל מקום ומחזיר את הפוקוס, והתצוגות הלא פעילות הן inert ו-visibility:hidden. **מגע**: אין תלות בריחוף, לחיצה פותחת וסוגרת, ולחיצה בחוץ סוגרת. **מתחת ל-1024 פיקסלים** התפריט הופך לכפתור פשוט (details) עם רשימה; לטלפון הדפוס המומלץ הוא המגירה של b66. **הפחתת תנועה**: בלי החלקה ובלי מורפינג, החלפה מיידית. **בלי JS**: התצוגות נשארות בתוך הפריטים שלהן ונפתחות כרשימה נפתחת רגילה ב-hover וב-focus-within, והקישורים נגישים. **הערת דמו**: הכתובת עם ?open=1 פותחת את הפאנל השני בטעינה (לצילומי בדיקה בלבד). **שלוש שאלות הגימור.** (1) הגרסה הבנאלית היא דרופדאון נפרד לכל פריט שנסגר ונפתח, או מגה תפריט שמרצד בין פריטים כשהעכבר חוצה את הרווח; כאן זה משטח אחד שמשנה צורה, בלי הבהוב ובלי רגע ריק בין פריט לפריט. (2) המיקרו-אינטראקציה שנושאת את ההמשכיות היא החץ שנוסע: הוא מראה לעין לאן עברנו ושהפאנל הוא אותו פאנל, והכיוון של כניסת התוכן מספר באיזה כיוון זזנו. (3) הפעולה שזה מקל היא סריקה של כמה קטגוריות ברצף: מעבירים את העכבר לאורך התפריט בלי ללחוץ ובלי לחכות לפתיחות חוזרות. שחזור, השראה: Hover.dev Shifting Dropdown (https://www.hover.dev/components/navigation); הקוד נכתב מחדש, והכיוון נמדד לפי מיקום חזותי כדי שיעבוד בעברית."
}
];
