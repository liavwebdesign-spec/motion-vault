// גל awwwards 13-16 (2.9.2026): נכרה מ-era-residence.com ומ-ronnsquare.fr. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b28", cat:"behavior", name:"חותם עגול עם טקסט שמסתובב", tech:"CSS transform · JS split", status:"ממתין",
  desc:"טקסט שמסודר סביב מעגל ומסתובב לאט בלולאה, עם סמל במרכז. בהובר הסיבוב מאיץ קלות.",
  when:"חותם איכות בהירו, תג \"מאז 1998\", כפתור צף של יצירת קשר, או חתימה בפוטר. אחד בעמוד, קטן ולא במרכז הבמה.",
  libs:[],
  css:`.seal-row{display:flex;gap:clamp(30px,6vw,90px);align-items:center;justify-content:center;flex-wrap:wrap}
.seal{position:relative;width:var(--sz,168px);height:var(--sz,168px);display:grid;place-items:center;flex:none}
.seal-ring{position:absolute;inset:0;animation:sealspin 22s linear infinite}
.seal:hover .seal-ring{animation-duration:9s}
@keyframes sealspin{to{transform:rotate(360deg)}}
.seal-ch{position:absolute;inset-block-start:0;inset-inline-start:50%;height:50%;transform-origin:bottom center;font-size:var(--fs,12.5px);font-weight:700;letter-spacing:.02em}
.seal-mid{width:44%;height:44%;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:calc(var(--sz,168px) * .17)}
.seal.warm .seal-mid{background:#c2255c}
.seal.warm .seal-ch{color:#c2255c}
.seal.ghost .seal-mid{background:transparent;color:var(--ink);border:1px solid var(--line)}
.seal-cap{text-align:center;color:var(--muted);font-size:14px;margin-top:26px}
@media (prefers-reduced-motion: reduce){.seal-ring{animation:none}}`,
  html:`<div class="stage tight"><div class="seal-row">
  <div class="seal" style="--sz:186px"><span class="seal-ring" data-seal="· בונים אתרים מאז 2014 ">
  </span><span class="seal-mid" aria-hidden="true">✦</span></div>
  <div class="seal warm" style="--sz:150px;--fs:11.5px"><span class="seal-ring" data-seal="· אחריות מלאה · שירות אישי ">
  </span><span class="seal-mid" aria-hidden="true">♥</span></div>
  <div class="seal ghost" style="--sz:128px;--fs:10.5px"><span class="seal-ring" data-seal="· דברו איתנו · דברו איתנו ">
  </span><span class="seal-mid" aria-hidden="true">←</span></div>
</div>
<p class="seal-cap">העבר עכבר על אחד מהם והסיבוב יאיץ</p></div>`,
  js:`(function(){
  document.querySelectorAll("[data-seal]").forEach(ring=>{
    const text=ring.dataset.seal;
    const chars=[...text];
    const step=360/chars.length;
    ring.setAttribute("aria-label",text.replace(/·/g," ").trim());
    ring.setAttribute("role","img");
    // כל תו מסובב סביב מרכז המעגל. הזווית מחושבת מהסוף להתחלה כדי שהעברית תיקרא עם כיוון השעון.
    chars.forEach((c,i)=>{
      const s=document.createElement("span");
      s.className="seal-ch";
      s.setAttribute("aria-hidden","true");
      s.textContent=c===" "?"\\u00a0":c;
      s.style.transform="translateX(-50%) rotate("+(-i*step)+"deg)";
      ring.appendChild(s);
    });
  });
})();`,
  runway:false,
  note:"הסוד הוא transform-origin בתחתית התו: כל תו הוא רדיוס של המעגל, והזווית שלו קובעת איפה הוא יושב. בעברית הסימן שלילי כדי שהמילים יתקדמו עם כיוון השעון וייקראו נכון. הטקסט המלא נשמר ב-aria-label והתווים עצמם מוסתרים מקוראי מסך."
},
{
  id:"b29", cat:"behavior", name:"רקע העמוד שמחליף צבע לפי הסקשן", tech:"IntersectionObserver · CSS vars", status:"ממתין",
  desc:"כל סקשן מכריז על ערכת הצבע שלו, והרקע והטקסט של העמוד עוברים אליה במעבר רך. הצבע מחליף במקום שהסקשן יגזור אותו.",
  when:"אתרי תדמית וסיפור מותג, עמודי מוצר ארוכים. נותן תחושת פרקים בלי קווים מפרידים ובלי סקשנים עם קצוות חדים.",
  libs:[],
  css:`.bgz{--bg:#f7f7fa;--fg:#16182b;--soft:#6a6d85;
  background:var(--bg);color:var(--fg);transition:background-color .8s ease,color .8s ease}
.bgz-sec{min-height:92vh;display:grid;place-items:center;text-align:center;padding:8vh var(--gutter)}
.bgz-sec h3{font-size:clamp(30px,4.4vw,72px);margin:0 0 14px;font-weight:800;max-width:18ch}
.bgz-sec p{margin:0;max-width:46ch;color:var(--soft);font-size:17px;line-height:1.6}
.bgz-tag{font-size:12px;letter-spacing:.18em;margin-bottom:18px;opacity:.6}
.bgz-dot{width:10px;height:10px;border-radius:50%;background:currentColor;margin:26px auto 0;opacity:.4}
.bgz-rail{position:fixed;inset-inline-end:18px;top:50%;transform:translateY(-50%);z-index:20;display:grid;gap:10px}
.bgz-rail i{display:block;width:7px;height:7px;border-radius:50%;background:currentColor;opacity:.28;transition:opacity .4s,transform .4s}
.bgz-rail i.on{opacity:1;transform:scale(1.5)}
@media (prefers-reduced-motion: reduce){.bgz{transition-duration:.01ms}}`,
  html:`<div class="bgz">
  <section class="bgz-sec" data-bg="#f7f7fa" data-fg="#16182b" data-soft="#6a6d85">
    <div><p class="bgz-tag">פרק ראשון</p><h3>מתחילים בהיר</h3><p>גלול למטה. הרקע של העמוד כולו יעבור לצבע של הסקשן הבא, בלי קו מפריד ובלי קפיצה.</p><span class="bgz-dot"></span></div>
  </section>
  <section class="bgz-sec" data-bg="#101322" data-fg="#f2f2f7" data-soft="#a3a6c0">
    <div><p class="bgz-tag">פרק שני</p><h3>ואז נכנסים לעומק</h3><p>אותו טקסט, אותה פריסה, ורק ערכת הצבע מתחלפת. זה מה שנותן תחושה של מעבר בין פרקים.</p><span class="bgz-dot"></span></div>
  </section>
  <section class="bgz-sec" data-bg="#123b32" data-fg="#f2fbf6" data-soft="#9dc7b6">
    <div><p class="bgz-tag">פרק שלישי</p><h3>וממשיכים לצבע של המותג</h3><p>בפרויקט אמיתי הצבעים מגיעים מהטוקנים של העור, ולא נכתבים בכל סקשן מחדש.</p><span class="bgz-dot"></span></div>
  </section>
  <section class="bgz-sec" data-bg="#f4ede3" data-fg="#3a2a1c" data-soft="#8a7561">
    <div><p class="bgz-tag">פרק רביעי</p><h3>ונוחתים רך</h3><p>המעבר הוא 0.8 שניות. מהר מזה מרגיש כמו הבהוב, ואיטי מזה מרגיש כמו באג.</p><span class="bgz-dot"></span></div>
  </section>
  <nav class="bgz-rail" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></nav>
</div>`,
  js:`(function(){
  const wrap=document.querySelector(".bgz");
  const secs=[...wrap.querySelectorAll(".bgz-sec")];
  const dots=[...wrap.querySelectorAll(".bgz-rail i")];
  function apply(sec){
    wrap.style.setProperty("--bg",sec.dataset.bg);
    wrap.style.setProperty("--fg",sec.dataset.fg);
    wrap.style.setProperty("--soft",sec.dataset.soft);
    const i=secs.indexOf(sec);
    dots.forEach((d,n)=>d.classList.toggle("on",n===i));
  }
  // בוחרים את הסקשן שתופס הכי הרבה מהמסך. חשוב למדוד את כל הסקשנים בכל בדיקה
  // ולא רק את אלה שהאירוע דיווח עליהם, אחרת הצבע נתקע על הראשון.
  let last=null;
  function pick(){
    let best=null,area=0;
    secs.forEach(s=>{
      const r=s.getBoundingClientRect();
      const vis=Math.max(0,Math.min(r.bottom,window.innerHeight)-Math.max(r.top,0));
      if(vis>area){area=vis;best=s;}
    });
    if(best&&best!==last){last=best;apply(best);}
  }
  // ויסות לפי זמן ולא לפי requestAnimationFrame: אם פריים אחד לא מגיע, דגל של rAF נתקע דלוק
  // וכל אירועי הגלילה הבאים נבלעים. מדידה של 80 מילישניות זולה ואמינה בכל מצב.
  let t=0;
  const onScroll=()=>{const n=performance.now();if(n-t<80)return;t=n;pick();};
  const io=new IntersectionObserver(pick,{threshold:[0,.2,.4,.6,.8,1]});
  secs.forEach(s=>io.observe(s));
  addEventListener("scroll",onScroll,{passive:true});
  pick();
})();`,
  runway:false,
  note:"המלכודת שנתפסה כאן בבדיקה: אם בוחרים את הסקשן לפי היחסים שמגיעים באירוע של IntersectionObserver, הצבע נתקע על הראשון, כי כל אירוע מדווח רק על מה שהשתנה. הפתרון הוא למדוד בכל בדיקה את כל הסקשנים ולבחור את זה שתופס הכי הרבה מהמסך. מלכודת שנייה: המעבר חייב לשבת על משתני CSS ברמת המעטפת ולא על כל אלמנט בנפרד, אחרת רצים עשרות טרנזישנים במקביל."
},
];
