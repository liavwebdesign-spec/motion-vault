// גל awwwards 5-8 (2.9.2026): נכרה מ-driveberry.fr ומ-heronaiapp.com. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b23", cat:"behavior", name:"תפריט מסך מלא עם כניסה מדורגת", tech:"CSS clip-path · JS", status:"ממתין",
  desc:"לחיצה על הכפתור פורשת שכבה על כל המסך, הקישורים נכנסים אחד אחרי השני, והגלילה מאחור ננעלת. סגירה בכפתור, ב-Escape או בבחירת קישור.",
  when:"כמעט כל אתר תדמית. במובייל זו ברירת המחדל, ובדסקטופ זו בחירה עיצובית שמפנה מקום לכותרת ולתוכן.",
  libs:[],
  css:`.nv-bar{position:sticky;top:0;z-index:30;display:flex;align-items:center;justify-content:space-between;padding:16px var(--gutter);background:rgba(247,247,250,.86);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nv-toggle{display:flex;align-items:center;gap:10px;background:none;border:0;font:inherit;font-size:15px;cursor:pointer;color:var(--ink);padding:6px}
.nv-burger{width:26px;height:14px;position:relative;display:block}
.nv-burger i{position:absolute;inset-inline:0;height:2px;background:var(--ink);border-radius:2px;transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .25s}
.nv-burger i:nth-child(1){top:0}.nv-burger i:nth-child(2){top:6px}.nv-burger i:nth-child(3){top:12px}
.nv-open .nv-burger i:nth-child(1){transform:translateY(6px) rotate(45deg)}
.nv-open .nv-burger i:nth-child(2){opacity:0}
.nv-open .nv-burger i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
.nv-overlay{position:fixed;inset:0;z-index:29;background:#0f1020;color:#fff;display:grid;align-content:center;gap:6px;padding:12vh var(--gutter) 8vh;
  clip-path:inset(0 0 100% 0);transition:clip-path .62s cubic-bezier(.76,0,.24,1);visibility:hidden}
.nv-open .nv-overlay{clip-path:inset(0 0 0 0);visibility:visible}
.nv-link{display:block;font-size:clamp(34px,6vw,86px);font-weight:800;line-height:1.18;color:#fff;text-decoration:none;
  opacity:0;transform:translateY(28px);transition:opacity .5s,transform .5s;transition-delay:0s}
.nv-open .nv-link{opacity:1;transform:none}
.nv-open .nv-link:nth-child(1){transition-delay:.18s}
.nv-open .nv-link:nth-child(2){transition-delay:.25s}
.nv-open .nv-link:nth-child(3){transition-delay:.32s}
.nv-open .nv-link:nth-child(4){transition-delay:.39s}
.nv-link span{display:inline-block;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.nv-link:hover span{transform:translateX(-14px)}
.nv-link small{font-size:14px;font-weight:500;opacity:.45;margin-inline-start:14px;vertical-align:middle}
.nv-foot{margin-top:8vh;display:flex;gap:22px;flex-wrap:wrap;font-size:14px;color:#a7a9c4;opacity:0;transition:opacity .5s .5s}
.nv-open .nv-foot{opacity:1}
.nv-body{padding:var(--sec) var(--gutter);max-width:60ch;margin-inline:auto;color:var(--muted)}
@media (prefers-reduced-motion: reduce){.nv-overlay,.nv-link,.nv-foot{transition-duration:.01ms!important}}`,
  html:`<header class="nv-bar">
  <strong>לוגו</strong>
  <button class="nv-toggle" aria-expanded="false" aria-controls="nvmenu"><span class="nv-label">תפריט</span><span class="nv-burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
</header>
<nav class="nv-overlay" id="nvmenu" aria-hidden="true">
  <a class="nv-link" href="#"><span>עבודות</span><small>01</small></a>
  <a class="nv-link" href="#"><span>שירותים</span><small>02</small></a>
  <a class="nv-link" href="#"><span>אודות</span><small>03</small></a>
  <a class="nv-link" href="#"><span>יצירת קשר</span><small>04</small></a>
  <div class="nv-foot"><span>info@example.com</span><span>03-1234567</span><span>אינסטגרם</span></div>
</nav>
<div class="nv-body"><p>גלול קצת, ואז פתח את התפריט. הגלילה מאחור ננעלת בלי שהעמוד יקפוץ, כי רוחב פס הגלילה מוחזר כריפוד.</p><p style="height:150vh"></p><p>סוף העמוד.</p></div>`,
  js:`(function(){
  const btn=document.querySelector(".nv-toggle"),ov=document.querySelector(".nv-overlay"),root=document.documentElement;
  const links=[...ov.querySelectorAll(".nv-link")];
  let open=false,lastFocus=null;
  function set(v){
    open=v;
    document.body.classList.toggle("nv-open",v);
    btn.setAttribute("aria-expanded",String(v));
    ov.setAttribute("aria-hidden",String(!v));
    btn.querySelector(".nv-label").textContent=v?"סגירה":"תפריט";
    // נעילת גלילה בלי קפיצה: מחזירים את רוחב פס הגלילה כריפוד
    const sb=window.innerWidth-root.clientWidth;
    document.body.style.overflow=v?"hidden":"";
    document.body.style.paddingInlineEnd=v?sb+"px":"";
    if(v){lastFocus=document.activeElement;setTimeout(()=>links[0].focus(),260);}
    else if(lastFocus)lastFocus.focus();
  }
  btn.addEventListener("click",()=>set(!open));
  links.forEach(a=>a.addEventListener("click",()=>set(false)));
  addEventListener("keydown",e=>{
    if(!open)return;
    if(e.key==="Escape"){set(false);return;}
    if(e.key!=="Tab")return;
    // מלכודת פוקוס: הטאב לא בורח מאחורי השכבה
    const f=[btn,...links];
    const i=f.indexOf(document.activeElement);
    const next=e.shiftKey?(i<=0?f.length-1:i-1):(i===f.length-1?0:i+1);
    e.preventDefault();f[next].focus();
  });
})();`,
  runway:false,
  note:"שלושה דברים שבדרך כלל שוכחים: נעילת הגלילה חייבת להחזיר את רוחב פס הגלילה כריפוד אחרת העמוד קופץ ברגע הפתיחה, aria-expanded ו-aria-hidden חייבים להתעדכן, והטאב חייב להיתפס בתוך השכבה. ה-clip-path נותן פתיחה שנפרשת מלמעלה למטה במקום דהייה סתמית."
},
{
  id:"b24", cat:"behavior", name:"כפתור שהאותיות בו מתחלפות בהובר", tech:"CSS transform · JS split", status:"ממתין",
  desc:"שתי שכבות של אותו טקסט זו מעל זו. בהובר העליונה מחליקה למעלה והתחתונה עולה במקומה, אות אחרי אות, כך שהמילה מתגלגלת ולא סתם משנה צבע.",
  when:"כפתור ראשי, קישור ניווט, כפתור מוצר. מיקרו-אינטראקציה שמסמנת ליטוש. בעברית האותיות אינן מחוברות ולכן פיצול לאותיות בטוח.",
  libs:[],
  css:`.rb{--rb-bg:var(--ink);--rb-fg:#fff;
  display:inline-flex;align-items:center;gap:10px;border:0;cursor:pointer;font:inherit;font-weight:600;font-size:17px;
  background:var(--rb-bg);color:var(--rb-fg);border-radius:999px;padding:16px 30px;overflow:hidden;position:relative}
.rb.ghost{--rb-bg:transparent;--rb-fg:var(--ink);border:1px solid var(--line)}
.rb.accent{--rb-bg:var(--accent)}
.rb-txt{display:inline-flex;position:relative;overflow:hidden;line-height:1.25}
.rb-row{display:inline-flex}
.rb-row.b{position:absolute;inset-inline-start:0;top:0}
.rb-ch{display:inline-block;transition:transform .42s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i) * 22ms)}
.rb-row.a .rb-ch{transform:translateY(0)}
.rb-row.b .rb-ch{transform:translateY(105%)}
.rb:hover .rb-row.a .rb-ch,.rb:focus-visible .rb-row.a .rb-ch{transform:translateY(-105%)}
.rb:hover .rb-row.b .rb-ch,.rb:focus-visible .rb-row.b .rb-ch{transform:translateY(0)}
.rb-arrow{transition:transform .42s cubic-bezier(.2,.8,.2,1)}
.rb:hover .rb-arrow{transform:translateX(-5px)}
.rb-demo{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}
@media (prefers-reduced-motion: reduce){.rb-ch,.rb-arrow{transition:none}}`,
  html:`<div class="stage tight center"><div class="rb-demo">
  <button class="rb accent"><span class="rb-txt" data-rb>קבעו שיחה</span><span class="rb-arrow" aria-hidden="true">←</span></button>
  <button class="rb"><span class="rb-txt" data-rb>לכל העבודות</span><span class="rb-arrow" aria-hidden="true">←</span></button>
  <button class="rb ghost"><span class="rb-txt" data-rb>המחירון שלנו</span></button>
</div>
<p style="color:var(--muted);font-size:14px;margin-top:22px">העבר עכבר, או הגע עם Tab</p></div>`,
  js:`(function(){
  document.querySelectorAll("[data-rb]").forEach(el=>{
    const text=el.textContent.trim();
    el.textContent="";
    el.setAttribute("aria-label",text);
    // שתי שכבות זהות: העליונה יוצאת, התחתונה נכנסת
    ["a","b"].forEach(k=>{
      const row=document.createElement("span");
      row.className="rb-row "+k;
      row.setAttribute("aria-hidden","true");
      [...text].forEach((c,i)=>{
        const s=document.createElement("span");
        s.className="rb-ch";
        s.style.setProperty("--i",k==="a"?i:i);
        s.textContent=c===" "?"\\u00a0":c;
        row.appendChild(s);
      });
      el.appendChild(row);
    });
  });
})();`,
  runway:false,
  note:"הטקסט האמיתי נשמר ב-aria-label ושתי השכבות מסומנות aria-hidden, אחרת קורא מסך היה מקריא את המילה פעמיים. ההשהיה המדורגת היא 22 מילישניות לאות: מעל 30 זה מתחיל להרגיש איטי, ומתחת ל-15 האפקט נעלם."
}
];
