// Menus family (22.9.2026): mined from the Profix header, polished, and split into two reusable pieces.
// b65: responsive header with a mega menu (desktop) + drawer (mobile). b66: the mobile drawer alone, for any desktop nav.
const DRAWER_CSS = `
/* ---- mobile drawer (shared by b65 and b66) ---- */
.md{position:fixed;inset:0;z-index:60;visibility:hidden;transition:visibility 0s linear .44s}
.md.open{visibility:visible;transition-delay:0s}
.md-scrim{position:absolute;inset:0;background:color-mix(in srgb,var(--ink) 48%,transparent);opacity:0;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.md.open .md-scrim{opacity:1}
.md-panel{position:absolute;inset-block:0;inset-inline-start:0;width:min(86vw,380px);background:var(--card);color:var(--ink);
  display:flex;flex-direction:column;overflow:auto;padding:18px 24px 32px;box-shadow:0 0 48px color-mix(in srgb,var(--ink) 18%,transparent);
  transform:translateX(100%);transition:transform .44s cubic-bezier(.76,0,.24,1)}
[dir="ltr"] .md-panel{transform:translateX(-100%)}
.md.open .md-panel{transform:none}
.md-top{display:flex;align-items:center;justify-content:space-between;padding-bottom:24px}
.md-close{width:44px;height:44px;border:0;border-radius:12px;background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink);display:grid;place-items:center;cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1),transform .44s cubic-bezier(.76,0,.24,1)}
.md.open .md-close{transform:rotate(90deg)}
.md-close svg{width:18px;height:18px}
.md-list{list-style:none;margin:0;padding:8px 0 0}
.md-item{opacity:0;transform:translateY(12px);
  transition:opacity .18s cubic-bezier(.2,.6,.2,1),transform .18s cubic-bezier(.2,.6,.2,1)}
.md.open .md-item{opacity:1;transform:none;transition-duration:.4s,.4s;transition-delay:calc(.14s + var(--i) * 45ms)}
.md-link,.md-acc{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:56px;padding:12px 0;
  font:inherit;font-size:18px;font-weight:600;color:var(--ink);text-decoration:none;background:none;border:0;cursor:pointer;text-align:start;transition:color .15s cubic-bezier(.2,.6,.2,1)}
/* chevron: physical borders on purpose, a logical inline-end flips it sideways in RTL */
.md-acc i{width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg) translateY(-2px);transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.md-acc[aria-expanded="true"]{color:var(--accent)}
.md-acc[aria-expanded="true"] i{transform:rotate(225deg) translateY(-2px)}
.md-sub{display:grid;grid-template-rows:0fr;transition:grid-template-rows .32s cubic-bezier(.2,.6,.2,1)}
.md-sub.open{grid-template-rows:1fr}
.md-sub>div{overflow:hidden}
.md-sub h5{margin:8px 0 4px;font-size:13px;font-weight:600;color:var(--accent)}
.md-sub a{display:block;padding:10px 16px;font-size:15px;color:var(--muted);text-decoration:none;opacity:0;transform:translateX(8px);
  transition:opacity .2s cubic-bezier(.2,.6,.2,1),transform .2s cubic-bezier(.2,.6,.2,1),color .15s cubic-bezier(.2,.6,.2,1)}
[dir="ltr"] .md-sub a{transform:translateX(-8px)}
.md-sub.open a{opacity:1;transform:none;transition-delay:calc(var(--j) * 30ms)}
.md-sub>div>:last-child{margin-bottom:12px}
.md-cta{margin-top:24px;opacity:0;transform:translateY(12px);transition:opacity .18s,transform .18s}
.md.open .md-cta{opacity:1;transform:none;transition:opacity .4s cubic-bezier(.2,.6,.2,1) .42s,transform .4s cubic-bezier(.2,.6,.2,1) .42s}
.md-cta a{display:flex;justify-content:center;align-items:center;min-height:52px;border-radius:12px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
@media (hover:hover) and (pointer:fine){.md-link:hover,.md-acc:hover,.md-sub a:hover{color:var(--accent)}.md-close:hover,.burger:hover{background:color-mix(in srgb,var(--ink) 12%,transparent)}}
.burger{width:44px;height:44px;border:0;transition:background .18s cubic-bezier(.2,.6,.2,1);border-radius:12px;background:color-mix(in srgb,var(--ink) 6%,transparent);display:grid;place-content:center;gap:4px;cursor:pointer}
.burger i{display:block;width:18px;height:2px;background:var(--ink);border-radius:2px;transition:transform .36s cubic-bezier(.76,0,.24,1),opacity .2s}
.burger[aria-expanded="true"] i:nth-child(1){transform:translateY(6px) rotate(45deg)}
.burger[aria-expanded="true"] i:nth-child(2){opacity:0}
.burger[aria-expanded="true"] i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
@media (prefers-reduced-motion:reduce){.md,.md *{transition-duration:.01ms!important;transition-delay:0s!important}}`;

const DRAWER_JS = `
function drawer(root, burger){
  const panel=root.querySelector(".md-panel"), scrim=root.querySelector(".md-scrim"), closeBtn=root.querySelector(".md-close");
  const doc=document.documentElement; let last=null;
  // numbering for the stagger: every top-level row and every sub link gets its own index
  root.querySelectorAll(".md-item").forEach((el,i)=>el.style.setProperty("--i",i));
  root.querySelectorAll(".md-sub").forEach(s=>s.querySelectorAll("a").forEach((a,j)=>a.style.setProperty("--j",j)));
  panel.inert=true;
  function set(open){
    root.classList.toggle("open",open);
    panel.inert=!open;
    if(burger) burger.setAttribute("aria-expanded",String(open));
    // scroll lock without a jump: give the scrollbar width back as padding
    const sb=innerWidth-doc.clientWidth;
    document.body.style.overflow=open?"hidden":"";
    document.body.style.paddingInlineEnd=open&&sb>0?sb+"px":"";
    if(open){last=document.activeElement;setTimeout(()=>closeBtn.focus(),180);}
    else{root.querySelectorAll(".md-sub.open").forEach(s=>toggleSub(s.previousElementSibling,false)); if(last)last.focus();}
  }
  function toggleSub(btn,force){
    const sub=btn.nextElementSibling, open=force!==undefined?force:!sub.classList.contains("open");
    sub.classList.toggle("open",open); btn.setAttribute("aria-expanded",String(open));
    sub.querySelectorAll("a").forEach(a=>a.tabIndex=open?0:-1);
  }
  root.querySelectorAll(".md-acc").forEach(b=>{toggleSub(b,false);b.addEventListener("click",()=>toggleSub(b));});
  if(burger) burger.addEventListener("click",()=>set(!root.classList.contains("open")));
  closeBtn.addEventListener("click",()=>set(false));
  scrim.addEventListener("click",()=>set(false));
  root.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>set(false)));
  addEventListener("keydown",e=>{
    if(!root.classList.contains("open"))return;
    if(e.key==="Escape"){set(false);return;}
    if(e.key!=="Tab")return;
    // focus trap: tab cycles inside the drawer
    const f=[...panel.querySelectorAll("a,button")].filter(x=>x.tabIndex!==-1&&x.offsetParent!==null);
    const i=f.indexOf(document.activeElement);
    const n=e.shiftKey?(i<=0?f.length-1:i-1):(i===f.length-1?0:i+1);
    e.preventDefault(); f[n].focus();
  });
  return set;
}`;

const DRAWER_HTML = (idPrefix) => `
<div class="md" id="${idPrefix}">
  <div class="md-scrim"></div>
  <nav class="md-panel" aria-label="תפריט">
    <div class="md-top"><strong>לוגו</strong>
      <button class="md-close" type="button" aria-label="סגירת תפריט"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    </div>
    <ul class="md-list">
      <li class="md-item"><a class="md-link" href="#">ראשי</a></li>
      <li class="md-item"><button class="md-acc" type="button" aria-expanded="false">פתרונות ושירותים <i aria-hidden="true"></i></button>
        <div class="md-sub"><div>
          <h5>לעסק</h5><a href="#">תמיכת IT שוטפת</a><a href="#">ענן וגיבוי</a><a href="#">אבטחת מידע</a><a href="#">רשת ו-Wi-Fi</a>
          <h5>לבית</h5><a href="#">נקודות רשת ו-Wi-Fi</a><a href="#">מצלמות ואזעקה</a><a href="#">בית חכם</a><a href="#">סאונד ומולטימדיה</a>
        </div></div></li>
      <li class="md-item"><a class="md-link" href="#">פרויקטים</a></li>
      <li class="md-item"><a class="md-link" href="#">אודות</a></li>
      <li class="md-item"><a class="md-link" href="#">מאמרים וטיפים</a></li>
      <li class="md-item"><a class="md-link" href="#">צור קשר</a></li>
    </ul>
    <div class="md-cta"><a href="#">לקבלת הצעת מחיר</a></div>
  </nav>
</div>`;

// the header family (q-headers.mjs) reuses the same drawer, so there is one mobile menu in the vault, not five
export { DRAWER_CSS, DRAWER_JS };

export default [
{
  id:"b65", cat:"behavior", name:"הדר עם מגה תפריט בשני טורים", tech:"CSS · JS", status:"ממתין",
  desc:"פריט אחד בתפריט פותח פאנל רחב: שני טורים של קישורים עם תיאור קצר, וטור פעולה בצד. הפאנל נפרש מלמעלה והקישורים נכנסים בזה אחר זה. במובייל אותו הדר הופך לכפתור שפותח מגירה עם אקורדיון (b66).",
  when:"אתרים עם עשרה עמודי שירות ומעלה שמתחלקים לשתי קבוצות: לעסק ולבית, מוצרים ושירותים, לפי קהל או לפי תחום. מחליף תפריט של שנים עשר פריטים ששורה אחת לא מחזיקה.",
  libs:[],
  css:`.mh{position:sticky;top:0;z-index:50;background:var(--card);box-shadow:0 6px 20px color-mix(in srgb,var(--ink) 6%,transparent)}
.mh-bar{display:flex;align-items:center;gap:24px;padding:12px var(--gutter);min-height:72px}
.mh-logo{font-weight:800}
.mh-nav{display:flex;align-items:center;gap:4px;list-style:none;margin:0 auto;padding:0}
.mh-nav>li{position:static}
/* top-level items only: a bare .mh-nav a would also restyle the links and the CTA inside the panel */
.mh-nav>li>a,.mh-trig{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:999px;
  font:inherit;font-size:15px;font-weight:500;color:var(--muted);text-decoration:none;background:none;border:0;cursor:pointer;
  transition:color .15s cubic-bezier(.2,.6,.2,1),background .18s cubic-bezier(.2,.6,.2,1)}
.mh-trig i{width:6px;height:6px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg) translateY(-2px);transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.mh-trig[aria-expanded="true"]{color:var(--ink);background:color-mix(in srgb,var(--accent) 10%,transparent)}
.mh-trig[aria-expanded="true"] i{transform:rotate(225deg) translateY(-2px)}
.mh-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:12px;background:var(--accent);color:var(--accent-ink);font-weight:600;font-size:14px;text-decoration:none;transition:transform .18s cubic-bezier(.2,.6,.2,1)}
/* the panel hangs from the whole bar, not from the button, so it can be wide and centred */
.mg{position:absolute;inset-inline:var(--gutter);top:100%;padding-top:10px;visibility:hidden;pointer-events:none;transition:visibility 0s linear .24s}
.mg::before{content:"";position:absolute;inset-inline:0;top:0;height:10px}
.mg-card{background:var(--card);border-radius:18px;box-shadow:0 24px 64px color-mix(in srgb,var(--ink) 14%,transparent);
  display:grid;grid-template-columns:1fr 1fr minmax(220px,.8fr);gap:32px;padding:28px;
  opacity:0;transform:translateY(-8px);clip-path:inset(0 0 100% 0 round 18px);
  transition:opacity .22s cubic-bezier(.2,.6,.2,1),transform .24s cubic-bezier(.2,.6,.2,1),clip-path .24s cubic-bezier(.2,.6,.2,1)}
.mh-mega.open .mg{visibility:visible;pointer-events:auto;transition-delay:0s}
.mh-mega.open .mg-card{opacity:1;transform:none;clip-path:inset(0 0 0 0 round 18px);transition-duration:.3s,.42s,.42s}
.mg-col h4{display:flex;align-items:center;gap:12px;margin:0 0 12px;font-size:13px;font-weight:600;color:var(--accent)}

.mg-link{position:relative;display:block;padding:10px 12px;padding-inline-end:40px;border-radius:12px;text-decoration:none;color:var(--ink);
  opacity:0;transform:translateY(6px);transition:opacity .2s cubic-bezier(.2,.6,.2,1),transform .2s cubic-bezier(.2,.6,.2,1),background .18s cubic-bezier(.2,.6,.2,1)}
.mh-mega.open .mg-link{opacity:1;transform:none;transition-delay:calc(.08s + var(--i) * 28ms),calc(.08s + var(--i) * 28ms),0s}
.mg-link b{display:block;font-size:15px;font-weight:600}
.mg-link span{display:block;margin-top:2px;font-size:13px;color:var(--muted)}
.mg-link svg{position:absolute;inset-inline-end:12px;top:50%;margin-top:-8px;width:16px;height:16px;opacity:0;transform:translateX(6px);transition:opacity .18s cubic-bezier(.2,.6,.2,1),transform .18s cubic-bezier(.2,.6,.2,1)}
[dir="ltr"] .mg-link svg{transform:translateX(-6px) scaleX(-1)}
.mg-side{display:flex;flex-direction:column;justify-content:space-between;gap:16px;padding:24px;border-radius:14px;background:color-mix(in srgb,var(--accent) 8%,var(--bg));
  opacity:0;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.mh-mega.open .mg-side{opacity:1;transition-delay:.2s}
.mg-side p{margin:0;font-size:15px;line-height:1.6;color:var(--ink)}
.mg-side a{align-self:flex-start}
.mh-burger-wrap{display:none}
@media (hover:hover) and (pointer:fine){
  .mh-nav>li>a:hover,.mh-trig:hover{color:var(--ink)}
  .mg-link:hover{background:color-mix(in srgb,var(--accent) 8%,transparent)}
  .mg-link:hover svg{opacity:1;transform:none}
  .mh-cta:hover{transform:translateY(-1px)}
}
@media (max-width:900px){.mh-nav,.mh-bar>.mh-cta{display:none}.mh-burger-wrap{display:block;margin-inline-start:auto}}
@media (prefers-reduced-motion:reduce){.mg,.mg *{transition-duration:.01ms!important;transition-delay:0s!important}}
.mh-body{padding:var(--sec) var(--gutter);max-width:60ch;margin-inline:auto;color:var(--muted)}
${DRAWER_CSS}`,
  html:`<header class="mh">
  <div class="mh-bar">
    <strong class="mh-logo">לוגו</strong>
    <ul class="mh-nav">
      <li><a href="#">ראשי</a></li>
      <li class="mh-mega">
        <button class="mh-trig" type="button" aria-expanded="false" aria-controls="mg1">פתרונות ושירותים <i aria-hidden="true"></i></button>
        <div class="mg" id="mg1"><div class="mg-card">
          <div class="mg-col"><h4>לעסק</h4>
            <a class="mg-link" href="#"><b>תמיכת IT שוטפת</b><span>מתקשרים, ואנחנו מטפלים</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>ענן וגיבוי</b><span>קבצים שעובדים מכל מקום</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>אבטחת מידע</b><span>חוזרים לעבוד תוך שעות</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>רשת ו-Wi-Fi למשרד</b><span>יציב, מסודר, מסומן</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
          </div>
          <div class="mg-col"><h4>לבית</h4>
            <a class="mg-link" href="#"><b>נקודות רשת ו-Wi-Fi</b><span>מתוכנן לפני הטיח</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>מצלמות ואזעקה</b><span>רואים הכל מהטלפון</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>בית חכם</b><span>תאורה, תריסים ומיזוג</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
            <a class="mg-link" href="#"><b>סאונד ומולטימדיה</b><span>מוזיקה בכל חדר</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg></a>
          </div>
          <div class="mg-side"><p>לא בטוחים מה אתם צריכים? שאלון של דקה מסדר את זה.</p><a class="mh-cta" href="#">לקבלת הצעת מחיר</a></div>
        </div></div>
      </li>
      <li><a href="#">פרויקטים</a></li>
      <li><a href="#">אודות</a></li>
      <li><a href="#">צור קשר</a></li>
    </ul>
    <a class="mh-cta" href="#">לקבלת הצעת מחיר</a>
    <div class="mh-burger-wrap"><button class="burger" type="button" aria-label="פתיחת תפריט" aria-expanded="false" aria-controls="md65"><i></i><i></i><i></i></button></div>
  </div>
</header>
${DRAWER_HTML("md65")}
<div class="mh-body"><p>עבור עם העכבר על "פתרונות ושירותים", או הגע אליו בטאב ולחץ חץ למטה. במסך צר לחץ על ההמבורגר.</p><p style="height:120vh"></p></div>`,
  js:`${DRAWER_JS}
(function(){
  drawer(document.getElementById("md65"), document.querySelector(".mh .burger"));
  const li=document.querySelector(".mh-mega"), trig=li.querySelector(".mh-trig"), links=[...li.querySelectorAll(".mg-link")];
  links.forEach((a,i)=>a.style.setProperty("--i",i));
  const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
  let tOpen,tClose;
  function set(v,focusFirst){
    clearTimeout(tOpen);clearTimeout(tClose);
    li.classList.toggle("open",v); trig.setAttribute("aria-expanded",String(v));
    links.forEach(a=>a.tabIndex=v?0:-1);
    if(v&&focusFirst)setTimeout(()=>links[0].focus(),60);
  }
  set(false);
  trig.addEventListener("click",()=>set(!li.classList.contains("open")));
  // hover intent: a short delay to open, a longer one to close, so crossing the gap never snaps it shut
  if(fine){
    li.addEventListener("mouseenter",()=>{clearTimeout(tClose);tOpen=setTimeout(()=>set(true),70);});
    li.addEventListener("mouseleave",()=>{clearTimeout(tOpen);tClose=setTimeout(()=>set(false),180);});
  }
  trig.addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();set(true,true);}});
  li.addEventListener("keydown",e=>{if(e.key==="Escape"&&li.classList.contains("open")){set(false);trig.focus();}});
  li.addEventListener("focusout",e=>{if(!li.contains(e.relatedTarget))set(false);});
  document.addEventListener("click",e=>{if(!li.contains(e.target))set(false);});
})();`,
  note:"שלושה דברים שמבדילים אותו מדרופדאון: הפאנל תלוי מכל ההדר ולא מהכפתור (inset-inline של המרזב), ולכן הוא רחב וממורכז ולא נחתך בקצה. יש גשר שקוף של 10 פיקסלים מעל הפאנל, והשהיית סגירה של 180 מילישניות מול 70 לפתיחה, כך שמעבר עכבר אלכסוני לא סוגר אותו. והכניסה היא clip-path מלמעלה עם קישורים מדורגים ב-28 מילישניות, והיציאה קצרה ובלי דירוג: יוצאים מהר יותר משנכנסים. נגישות: aria-expanded, חץ למטה פותח ומתמקד בקישור הראשון, Escape מחזיר את הפוקוס לכפתור, ויציאת פוקוס סוגרת. בסגור הקישורים tabIndex=-1. במגע אין hover, רק לחיצה."
},
{
  id:"b66", cat:"behavior", name:"מגירת מובייל עם אקורדיון וכניסה מדורגת", tech:"CSS · JS", status:"ממתין",
  desc:"ההמבורגר הופך ל-X, המגירה נוסעת מהצד, השורות נכנסות אחת אחרי השנייה, ותת-תפריט נפתח כאקורדיון בתוך המגירה. ביציאה הכל חוזר מהר ובלי דירוג.",
  when:"כל אתר עם יותר מחמישה פריטי תפריט או עם תת-תפריט (מגה תפריט בדסקטופ). משתלב עם כל תפריט דסקטופ: b39, b55, b65.",
  libs:[],
  css:`.mdh{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:12px var(--gutter);min-height:64px;background:var(--card);box-shadow:0 6px 20px color-mix(in srgb,var(--ink) 6%,transparent)}
.mdh-body{padding:var(--sec) var(--gutter);max-width:60ch;margin-inline:auto;color:var(--muted)}
${DRAWER_CSS}`,
  html:`<header class="mdh"><strong>לוגו</strong><button class="burger" type="button" aria-label="פתיחת תפריט" aria-expanded="false" aria-controls="md66"><i></i><i></i><i></i></button></header>
${DRAWER_HTML("md66")}
<div class="mdh-body"><p>לחץ על ההמבורגר, ואז על "פתרונות ושירותים" כדי לפתוח את האקורדיון. סגירה בלחיצה על הרקע, על X, או ב-Escape.</p><p style="height:120vh"></p></div>`,
  js:`${DRAWER_JS}
drawer(document.getElementById("md66"), document.querySelector(".mdh .burger"));`,
  note:"החלק שחסר כמעט בכל אתר: אנימציית יציאה. visibility עם השהיה של משך המעבר שומר את המגירה גלויה עד שהיא יוצאת, ורק אז מסתיר; display:none במקום זה הורג את היציאה ואת הכניסה (זה מה שקרה בפרופיקס). ה-easing של הנסיעה הוא in-out, כי ease-out על נסיעה של מסך שלם נראה כמו זריקה. השורות נכנסות עם --i ב-45 מילישניות, והיציאה קצרה ובלי דירוג. נגישות: inert על הפאנל כשסגור, מלכודת פוקוס, Escape, החזרת פוקוס לכפתור, ונעילת גלילה שמחזירה את רוחב פס הגלילה. תת-התפריט נסגר כשהמגירה נסגרת, כדי שבפתיחה הבאה היא תתחיל נקייה."
}
];
