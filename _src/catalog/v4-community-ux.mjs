// קהילה ו-UX (15.10.2026): שני מהלכי משוב ופעולה ממובייל: מוצר שעף לעגלה, ומגירה תחתונה שנסגרת בגרירה.
export default [
{
  id:"b74", cat:"behavior", name:"מוצר שעף לעגלה עם משוב על הסל", tech:"GSAP · Flip · CustomWiggle · JS", status:"ממתין",
  desc:"לחיצה על \"הוספה לסל\" שולחת תמונה קטנה של המוצר במסלול קשת עדין אל כפתור הסל. הסל מתנדנד קצרות, המספר שעליו מתגלגל למעלה, והכפתור הופך ל\"נוסף\" עם וי ואז חוזר. הסל נפתח לרשימה קטנה עם הסרה לכל שורה, ומי שלא רואה מכריזים לו מה נוסף.",
  when:"חנויות והזמנות אונליין: מאפייה, פרחים, אוכל, חנות קטנה. גם \"שמירה לרשימה\" או \"סל הצעת מחיר\" באתר שירות (בחירת שירותים לפני שיחה). לא כשיש מוצר אחד בעמוד, ולא באתר שבו אין עגלה בכלל: ההגעה של התמונה חייבת להיות למקום שנשאר גלוי.",
  libs:["gsap","CustomEase","CustomWiggle","Flip"],
  css:`.pc{max-width:min(960px,100%);margin-inline:auto;position:relative}
.pc [hidden],.bs [hidden]{display:none!important}
.pc-hd{position:relative;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border-radius:var(--r);background:var(--card);box-shadow:0 0 0 1px var(--line)}
.pc-brand{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:700;line-height:1.2}
.pc-brand svg{flex:none;width:28px;height:28px;color:var(--accent)}
.pc-cart{position:relative;display:grid;place-items:center;width:48px;height:48px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink);cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1)}
.pc-cart:hover{background:color-mix(in srgb,var(--ink) 12%,transparent)}
.pc-cart svg{width:24px;height:24px;transform-origin:50% 20%;pointer-events:none}
.pc-cart:focus-visible,.pc-add:focus-visible,.pc-rm:focus-visible,.pc-go:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pc-badge{position:absolute;top:-4px;inset-inline-end:-4px;display:grid;min-width:20px;height:20px;padding-inline:6px;border-radius:999px;overflow:hidden;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:700;line-height:20px;font-variant-numeric:tabular-nums;box-shadow:0 0 0 2px var(--card);transform:scale(0);pointer-events:none;transition:transform .25s cubic-bezier(.2,.6,.2,1)}
.pc-badge.on{transform:scale(1)}
.pc-bn{grid-area:1/1;text-align:center}
.pc-live{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.pc-title{margin:32px 0 4px;font-size:clamp(24px,2.6vw,34px);line-height:1.2;font-weight:700}
.pc-lead{margin:0 0 24px;color:var(--muted);font-size:16px;line-height:1.5}
.pc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pc-card{display:grid;gap:12px;align-content:start;padding:12px;border-radius:var(--r);background:var(--card);box-shadow:0 0 0 1px var(--line)}
.pc-ph{position:relative;aspect-ratio:1;border-radius:calc(var(--r) - 4px);overflow:hidden;background:var(--line)}
.pc-ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--op,50% 50%);transform:scale(var(--z,1));transform-origin:var(--to,var(--op,50% 50%))}
.pc-info{display:grid;gap:4px;padding-inline:4px}
.pc-name{margin:0;font-size:16px;font-weight:600;line-height:1.3}
.pc-sub{margin:0;color:var(--muted);font-size:14px;line-height:1.4}
.pc-price{font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}
.pc-add{position:relative;display:grid;min-height:48px;padding:0;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:16px;font-weight:600;cursor:pointer;overflow:hidden;transition:background .25s cubic-bezier(.2,.6,.2,1),color .25s cubic-bezier(.2,.6,.2,1),transform .12s cubic-bezier(.2,.6,.2,1)}
.pc-add:active{transform:scale(.97)}
.pc-add span{grid-area:1/1;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform .28s cubic-bezier(.2,.6,.2,1),opacity .2s cubic-bezier(.2,.6,.2,1)}
.pc-add .a2{transform:translateY(110%);opacity:0}
.pc-add.ok{background:var(--ink);color:var(--bg)}
.pc-add.ok .a1{transform:translateY(-110%);opacity:0}
.pc-add.ok .a2{transform:none;opacity:1}
.pc-add svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.pc-add path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .3s cubic-bezier(.2,.6,.2,1)}
.pc-add.ok path{stroke-dashoffset:0;transition-delay:.12s}
.pc-panel{position:absolute;z-index:30;top:calc(100% + 8px);inset-inline-end:0;width:min(380px,100%);padding:16px;border-radius:var(--r);background:var(--card);box-shadow:0 0 0 1px var(--line),0 24px 48px color-mix(in srgb,var(--ink) 14%,transparent);visibility:hidden;opacity:0;transform:translateY(-8px) scale(.98);transform-origin:0 0;transition:opacity .24s cubic-bezier(.2,.6,.2,1),transform .24s cubic-bezier(.2,.6,.2,1),visibility 0s .24s}
html[dir="ltr"] .pc-panel{transform-origin:100% 0}
.pc-panel.on{visibility:visible;opacity:1;transform:none;transition-delay:0s}
.pc-pt{margin:0 0 8px;font-size:16px;font-weight:700}
.pc-empty{margin:0;padding-block:8px;color:var(--muted);font-size:15px;line-height:1.5}
.pc-list{margin:0;padding:0;list-style:none;display:grid;gap:4px}
.pc-row{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;gap:12px;padding-block:4px}
.pc-row .pc-ph{width:44px;border-radius:10px}
.pc-rn{display:block;font-size:15px;font-weight:600;line-height:1.3}
.pc-rs{display:block;color:var(--muted);font-size:13px;font-variant-numeric:tabular-nums}
.pc-rm{display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:transparent;color:var(--muted);cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1),color .18s cubic-bezier(.2,.6,.2,1)}
.pc-rm:hover{background:color-mix(in srgb,var(--ink) 8%,transparent);color:var(--ink)}
.pc-rm svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;pointer-events:none}
.pc-sum{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;font-size:16px;font-weight:700;font-variant-numeric:tabular-nums}
.pc-go{width:100%;min-height:48px;margin-top:12px;padding:0;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.pc-fly{position:fixed;z-index:200;margin:0;pointer-events:none;will-change:transform;box-shadow:0 12px 28px color-mix(in srgb,var(--ink) 22%,transparent)}
.pc-note{margin:24px 0 0;color:var(--muted);font-size:13px;text-align:center}
@media(max-width:767px){.pc-grid{grid-template-columns:repeat(2,1fr);gap:12px}.pc-card{padding:8px}.pc-title{margin-top:24px}.pc-name{font-size:15px}}
@media (prefers-reduced-motion: reduce){.pc-panel,.pc-badge,.pc-add,.pc-add span,.pc-add path{transition:none}}`,
  html:`<div class="stage tight"><div class="pc">
  <header class="pc-hd">
    <div class="pc-brand">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20c0-6 4-11 11-11s11 5 11 11H5z"/><path d="M10 25h12"/><path d="M12 15l1.5 2M16 13.5V17M20 15l-1.5 2"/></svg>
      <span>מאפיית השכונה</span>
    </div>
    <button class="pc-cart" type="button" aria-expanded="false" aria-controls="pc-panel" aria-label="סל הקניות, ריק">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/></svg>
      <span class="pc-badge" aria-hidden="true"><span class="pc-bn">0</span></span>
    </button>
    <section class="pc-panel" id="pc-panel" aria-label="הסל שלך">
      <p class="pc-pt">הסל שלך</p>
      <p class="pc-empty">הסל ריק. הוסיפו משהו טעים מהרשימה.</p>
      <ul class="pc-list" hidden></ul>
      <div class="pc-sum" hidden><span>סה"כ</span><span class="pc-total">0 ₪</span></div>
      <button class="pc-go" type="button" hidden>המשך להזמנה</button>
    </section>
  </header>
  <p class="pc-live" role="status" aria-live="polite"></p>
  <h2 class="pc-title">הזמנה לאיסוף מחר בבוקר</h2>
  <p class="pc-lead">הכל יוצא מהתנור בשבע. מזמינים עד חצות, אוספים בלי תור.</p>
  <div class="pc-grid">
    <article class="pc-card" data-id="croissant" data-name="קרואסון חמאה" data-price="14">
      <div class="pc-ph" style="--op:34% 72%;--z:1.5"><img src="../assets/media/real/s14/croissants.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">קרואסון חמאה</h3><p class="pc-sub">בצק עלים, מתקלף</p><span class="pc-price">14 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: קרואסון חמאה"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
    <article class="pc-card" data-id="coffee" data-name="קפה הפוך" data-price="16">
      <div class="pc-ph" style="--op:92% 4%;--z:1.35"><img src="../assets/media/real/s14/croissants.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">קפה הפוך</h3><p class="pc-sub">קלייה מקומית</p><span class="pc-price">16 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: קפה הפוך"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
    <article class="pc-card" data-id="loaf" data-name="כיכר מחמצת" data-price="32">
      <div class="pc-ph" style="--op:78% 60%;--z:1.45"><img src="../assets/media/real/s14/hero-bread.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">כיכר מחמצת</h3><p class="pc-sub">תסיסה של 24 שעות</p><span class="pc-price">32 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: כיכר מחמצת"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
    <article class="pc-card" data-id="slices" data-name="לחם מחמצת פרוס" data-price="18">
      <div class="pc-ph" style="--op:14% 72%;--z:1.4"><img src="../assets/media/real/s14/hero-bread.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">לחם מחמצת פרוס</h3><p class="pc-sub">בשקית, מוכן לטוסט</p><span class="pc-price">18 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: לחם מחמצת פרוס"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
    <article class="pc-card" data-id="wheat" data-name="כיכר קמח מלא" data-price="36">
      <div class="pc-ph" style="--op:50% 100%;--to:30% 90%;--z:1.6"><img src="../assets/media/real/s14/baker-hands.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">כיכר קמח מלא</h3><p class="pc-sub">עיצוב ידני, 800 גרם</p><span class="pc-price">36 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: כיכר קמח מלא"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
    <article class="pc-card" data-id="pair" data-name="חבילת בוקר לשניים" data-price="54">
      <div class="pc-ph" style="--op:50% 60%;--z:1.05"><img src="../assets/media/real/s14/croissants.webp" alt="" loading="lazy"></div>
      <div class="pc-info"><h3 class="pc-name">חבילת בוקר לשניים</h3><p class="pc-sub">שני קרואסונים ושני קפה</p><span class="pc-price">54 ₪</span></div>
      <button class="pc-add" type="button" aria-label="הוספה לסל: חבילת בוקר לשניים"><span class="a1">הוספה לסל</span><span class="a2" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg>נוסף</span></button>
    </article>
  </div>
  <p class="pc-note">הדגמה בלבד. שום הזמנה לא נשלחת.</p>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".pc");
  const cartBtn=root.querySelector(".pc-cart"),cartIcon=cartBtn.querySelector("svg");
  const badge=root.querySelector(".pc-badge");
  const panel=root.querySelector(".pc-panel"),list=panel.querySelector(".pc-list"),empty=panel.querySelector(".pc-empty");
  const sum=panel.querySelector(".pc-sum"),totalEl=panel.querySelector(".pc-total"),go=panel.querySelector(".pc-go");
  const live=root.querySelector(".pc-live");
  const rm=matchMedia("(prefers-reduced-motion: reduce)");
  const EASE="cubic-bezier(.2,.6,.2,1)";
  const rtl=()=>getComputedStyle(root).direction==="rtl";
  const cards={};root.querySelectorAll(".pc-card").forEach(c=>cards[c.dataset.id]=c);
  const cart=new Map();          // id -> כמות. הסדר הוא סדר ההוספה הראשונה
  let shown=0;                   // המספר שמוצג על התג (מתעדכן בנחיתה, לא בלחיצה)
  const hasGsap=()=>typeof gsap!=="undefined";
  if(hasGsap()&&typeof CustomWiggle!=="undefined")CustomWiggle.create("pcWig",{wiggles:4,type:"easeOut"});

  const count=()=>[...cart.values()].reduce((a,b)=>a+b,0);
  const total=()=>[...cart].reduce((a,[id,q])=>a+q*(+cards[id].dataset.price),0);
  const words=n=>n===0?"הסל ריק":n===1?"בסל פריט אחד":"בסל "+n+" פריטים";
  function announce(t){live.textContent="";requestAnimationFrame(()=>{live.textContent=t;});}
  function label(){const n=count();cartBtn.setAttribute("aria-label","סל הקניות, "+(n===0?"ריק":n===1?"פריט אחד":n+" פריטים"));}

  // התג: המספר הישן יוצא למעלה והחדש נכנס מלמטה (בהסרה הפוך). WAAPI, כך שזה עובד גם בלי GSAP
  function renderBadge(n,dir){
    const cur=badge.querySelector(".pc-bn");
    badge.classList.toggle("on",n>0);
    if(n===shown){cur.textContent=n;return;}
    shown=n;
    if(!cur.animate||n===0){cur.textContent=n;return;}
    if(rm.matches){cur.textContent=n;cur.animate([{opacity:.35},{opacity:1}],{duration:200,easing:EASE});return;}
    const nu=cur.cloneNode();nu.textContent=n;badge.appendChild(nu);
    const o={duration:300,easing:EASE,fill:"both"};
    cur.animate([{transform:"none",opacity:1},{transform:"translateY("+(-100*dir)+"%)",opacity:0}],o).onfinish=()=>cur.remove();
    nu.animate([{transform:"translateY("+(100*dir)+"%)",opacity:0},{transform:"none",opacity:1}],o).onfinish=e=>{nu.style.cssText="";};
    badge.animate([{transform:"scale(1)"},{transform:"scale(1.2)",offset:.4},{transform:"scale(1)"}],{duration:340,easing:EASE});
  }
  function wiggle(){
    if(rm.matches||!hasGsap())return;
    if(typeof CustomWiggle!=="undefined")gsap.fromTo(cartIcon,{rotation:0},{rotation:13,duration:.7,ease:"pcWig",overwrite:true});
    gsap.fromTo(cartBtn,{scale:1},{scale:1.08,duration:.16,ease:"power2.out",yoyo:true,repeat:1,overwrite:"auto"});
  }

  // רשימת הסל. מעדכנים שורות קיימות ולא בונים הכל מחדש, כדי ש-Flip יכיר את האלמנטים
  function row(id){return list.querySelector('[data-id="'+id+'"]');}
  function syncPanel(){
    const n=count();
    cart.forEach((q,id)=>{
      let li=row(id);
      if(!li){
        li=document.createElement("li");li.className="pc-row";li.dataset.id=id;
        li.innerHTML='<span class="pc-ph-slot"></span><span><span class="pc-rn"></span><span class="pc-rs"></span></span><button class="pc-rm" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
        const ph=cards[id].querySelector(".pc-ph").cloneNode(true);
        li.firstChild.replaceWith(ph);
        li.querySelector(".pc-rn").textContent=cards[id].dataset.name;
        li.querySelector(".pc-rm").setAttribute("aria-label","הסרת "+cards[id].dataset.name+" מהסל");
        list.appendChild(li);
      }
      li.querySelector(".pc-rs").textContent=q+" × "+cards[id].dataset.price+" ₪";
    });
    [...list.children].forEach(li=>{if(!cart.has(li.dataset.id))li.remove();});
    list.hidden=sum.hidden=go.hidden=n===0;
    empty.hidden=n>0;
    totalEl.textContent=total()+" ₪";
  }

  function remove(id){
    const li=row(id),name=cards[id].dataset.name;
    cart.delete(id);label();
    const n=count();
    const next=li.nextElementSibling||li.previousElementSibling;
    const finish=()=>{
      if(hasGsap()&&typeof Flip!=="undefined"&&!rm.matches){
        const rest=[...list.children].filter(x=>x!==li);
        const st=Flip.getState(rest);
        li.remove();syncPanel();
        Flip.from(st,{duration:.3,ease:"power2.out"});
      }else{li.remove();syncPanel();}
      renderBadge(n,-1);
      announce("הוסר מהסל: "+name+". "+words(n));
      (next&&next.isConnected?next.querySelector(".pc-rm"):cartBtn).focus();
    };
    if(hasGsap()&&!rm.matches)gsap.to(li,{opacity:0,xPercent:(rtl()?-1:1)*14,duration:.18,ease:"power2.in",onComplete:finish});
    else finish();
  }
  list.addEventListener("click",e=>{const b=e.target.closest(".pc-rm");if(b)remove(b.closest(".pc-row").dataset.id);});

  // הטיסה: שיבוט של התמונה (הכרטיס עצמו לא זז, ולכן הגריד לא קופץ), במסלול ריבועי עם נקודת בקרה מורמת.
  // היעד נמדד מחדש בכל פריים, אז גלילה באמצע הטיסה לא מחטיאה את הסל.
  function fly(src,done){
    const r=src.getBoundingClientRect();
    const c=src.cloneNode(true);
    c.classList.add("pc-fly");c.setAttribute("aria-hidden","true");
    c.style.left=r.left+"px";c.style.top=r.top+"px";c.style.width=r.width+"px";c.style.height=r.height+"px";
    document.body.appendChild(c);
    const sx=r.left+r.width/2,sy=r.top+r.height/2;
    const tgt=()=>{const t=cartBtn.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2};};
    const T0=tgt(),dx0=T0.x-sx,dy0=T0.y-sy,len=Math.hypot(dx0,dy0)||1;
    let nx=-dy0/len,ny=dx0/len;if(ny>0){nx=-nx;ny=-ny;}      // הקשת תמיד מתרוממת כלפי מעלה
    const bow=Math.min(96,len*.2);
    const o={p:0},end=Math.min(1,26/r.width);
    gsap.set(c,{transformOrigin:"50% 50%"});
    gsap.timeline({onComplete(){c.remove();done();}})
      .to(o,{p:1,duration:.62,ease:"power2.inOut",onUpdate(){
        const T=tgt(),dx=T.x-sx,dy=T.y-sy,cx=dx/2+nx*bow,cy=dy/2+ny*bow,t=o.p,u=1-t;
        gsap.set(c,{x:2*u*t*cx+t*t*dx,y:2*u*t*cy+t*t*dy});
      }},0)
      .to(c,{scale:end,duration:.62,ease:"power2.in"},0)
      .to(c,{borderRadius:"50%",duration:.62,ease:"power2.in"},0)
      .to(c,{opacity:0,duration:.1,ease:"none"},.52);
  }

  root.addEventListener("click",e=>{
    const btn=e.target.closest(".pc-add");if(!btn)return;
    const card=btn.closest(".pc-card"),id=card.dataset.id;
    cart.set(id,(cart.get(id)||0)+1);label();syncPanel();
    // הכפתור הופך ל"נוסף" ואחרי רגע חוזר. לחיצה נוספת מאפסת את הספירה ומוסיפה עוד אחד
    btn.classList.add("ok");clearTimeout(btn._t);btn._t=setTimeout(()=>btn.classList.remove("ok"),1500);
    announce("נוסף לסל: "+card.dataset.name+". "+words(count()));
    const land=()=>{renderBadge(count(),1);wiggle();};
    if(hasGsap()&&!rm.matches)fly(card.querySelector(".pc-ph"),land);else land();
  });

  // פתיחה וסגירה של הסל: כפתור, Escape, לחיצה בחוץ, ויציאת פוקוס
  function setOpen(v){
    panel.classList.toggle("on",v);cartBtn.setAttribute("aria-expanded",String(v));
  }
  cartBtn.addEventListener("click",()=>setOpen(!panel.classList.contains("on")));
  go.addEventListener("click",()=>{setOpen(false);cartBtn.focus();});
  document.addEventListener("pointerdown",e=>{if(panel.classList.contains("on")&&!e.target.closest(".pc-hd"))setOpen(false);});
  root.addEventListener("keydown",e=>{
    if(e.key==="Escape"&&panel.classList.contains("on")){setOpen(false);cartBtn.focus();}
  });
  panel.addEventListener("focusout",e=>{
    if(panel.classList.contains("on")&&e.relatedTarget&&!e.relatedTarget.closest(".pc-hd"))setOpen(false);
  });
})();`,
  runway:false,
  note:"הגרסה הבנאלית: לחיצה, והמספר על הסל קופץ בלי שום קשר לכפתור שנלחץ, או הודעת טוסט שנעלמת. כאן התמונה עצמה נוסעת מהכרטיס אל הסל, ולכן העין רואה לאן המוצר הלך; הסל מגיב בנדנוד קצר, המספר מתגלגל, והכפתור מחזיק שני מצבים (הוספה לסל, נוסף עם וי) באותו רוחב כדי שלא יקפוץ. מה שמשנה בפועל: ההגעה מאשרת את הפעולה, ובסל הפתוח כל שורה נשארת עם כפתור הסרה, כלומר ביטול בלחיצה אחת שמנגנת את המספר בכיוון ההפוך. השורות שנשארות מתיישבות במקומן ב-Flip. קלון ולא האלמנט האמיתי: הכרטיס לא זז ולכן הגריד לא עושה reflow, וגם לא בגלילה באמצע. הקשת היא עקומת בזייה ריבועית שנחשבת ב-onUpdate, והיעד נמדד מחדש בכל פריים (getBoundingClientRect, אז גלילה לא מחטיאה), בלי אלסטיות: power2 בלבד. מספר הפריטים על התג מתעדכן בנחיתה ולא בלחיצה, והמצב (הסל עצמו, הרשימה והסכום) מתעדכן מיד. הכרזה לקורא מסך: אזור aria-live עם \"נוסף לסל: שם. בסל 3 פריטים\", וגם הכפתור של הסל מעדכן aria-label. RTL: הסל בצד הסיום (שמאל בעברית), הקשת מתרוממת כלפי מעלה, והחלונית נעוגה לאותו צד. בטלפון 390 הגריד בשני טורים והטיסה נוחתת על הסל. הפחתת תנועה: בלי טיסה ובלי נדנוד, והמספר רק מתחלף בדהייה עדינה. בלי GSAP: הכל עובד (הוספה, הסרה, מספר שמתגלגל ב-WAAPI), רק בלי הטיסה והנדנוד; בלי JS הגריד גלוי אבל אין סל. הבדל מ-g23: שם Flip מזיז פריט בין שני פריסות של אותו גריד (הגדלה והחזרה), כאן התמונה עוברת אל רכיב אחר בעמוד ויש מצב שנשמר אחריה. הבדל מ-cv8: שם הטיפול הוא בשליחה שנכשלת ובפרטים שלא הולכים לאיבוד בטופס; כאן הפידבק הוא על פעולה שהצליחה ועל ביטול שלה בסל. מקור: GSAP Flip cart, Ryan Mulligan, https://codepen.io/hexagoncircle/pen/RwLQLop (ומאמר: https://ryanmulligan.dev/blog/gsap-flip-cart/), רישיון MIT; הרעיון והזרימה משם, הקוד נכתב מחדש עם קלון וקשת ומשוב לסל."
},
{
  id:"b75", cat:"behavior", name:"מגירה תחתונה שנסגרת בגרירה", tech:"CSS · JS · dialog · Pointer Events", status:"ממתין",
  desc:"בטלפון נפתחת מהתחתית מגירה עם טופס קצר לתיאום שיחה. אוחזים בידית וגוררים למטה: המגירה עוקבת אחרי האצבע בהתנגדות, הרקע מתבהר, והיא נסגרת כשגררו מספיק או כשהפנו אותה במהירות. אחרת היא חוזרת למקומה. בדסקטופ אותו תוכן בחלון במרכז.",
  when:"פעולה קצרה מהטלפון: תיאום שיחה, שעות פתיחה והגעה, בחירת משלוח, סינון. טופס של שלושה שדות ומטה. לא לטפסים ארוכים (עמוד נפרד טוב מהם), ולא לתפריט ניווט (b66, b67).",
  libs:[],
  css:`.bsd{max-width:min(560px,100%);margin-inline:auto;display:grid;gap:20px;justify-items:start}
.bsd h2{margin:0;font-size:clamp(26px,3vw,40px);line-height:1.15;font-weight:700}
.bsd p{margin:0;max-width:44ch;color:var(--muted);font-size:17px;line-height:1.5}
.bsd-meta{display:flex;flex-wrap:wrap;gap:8px}
.bsd-meta span{padding:6px 14px;border-radius:999px;background:color-mix(in srgb,var(--ink) 6%,transparent);font-size:14px}
.bsd-open{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding-inline:28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:17px;font-weight:600;cursor:pointer;transition:transform .12s cubic-bezier(.2,.6,.2,1)}
.bsd-open:active{transform:scale(.97)}
.bsd-open:focus-visible,.bs-x:focus-visible,.bs-btn:focus-visible,.bs-call:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.bsd-hint{font-size:14px}
.bs{position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;color:var(--ink);overflow:hidden}
.bs[open]{display:grid}
.bs [hidden]{display:none!important}
.bs::backdrop{background:transparent}
.bs-ov{grid-area:1/1;background:color-mix(in srgb,var(--ink) 52%,transparent);opacity:0;transition:opacity .28s cubic-bezier(.2,.6,.2,1)}
.bs.is-in .bs-ov{opacity:1}
.bs-sheet{position:relative;grid-area:1/1;align-self:end;justify-self:center;display:flex;flex-direction:column;width:100%;max-width:560px;max-height:85vh;max-height:85dvh;border-radius:calc(var(--r) * 2) calc(var(--r) * 2) 0 0;background:var(--card);box-shadow:0 -12px 40px color-mix(in srgb,var(--ink) 18%,transparent);transform:translateY(100%);transition:transform .34s cubic-bezier(.2,.6,.2,1)}
.bs.is-in .bs-sheet{transform:none}
.bs-sheet.dragging{transition:none}
.bs-sheet::after{content:"";position:absolute;inset-inline:0;top:100%;height:48px;background:var(--card)}
.bs-grab{flex:none;display:grid;place-items:center;min-height:44px;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none}
.dragging .bs-grab{cursor:grabbing}
.bs-pill{width:56px;height:6px;border-radius:999px;background:color-mix(in srgb,var(--ink) 22%,transparent);transition:background .2s cubic-bezier(.2,.6,.2,1)}
.bs-grab:hover .bs-pill,.dragging .bs-pill{background:color-mix(in srgb,var(--ink) 38%,transparent)}
.bs-head{flex:none;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:0 20px 8px}
.bs-head h2{margin:0;font-size:22px;line-height:1.25;font-weight:700}
.bs-head p{margin:4px 0 0;color:var(--muted);font-size:15px;line-height:1.45}
.bs-x{flex:none;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:color-mix(in srgb,var(--ink) 7%,transparent);color:var(--ink);cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1)}
.bs-x:hover{background:color-mix(in srgb,var(--ink) 13%,transparent)}
.bs-x svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;pointer-events:none}
.bs-body{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;padding:8px 20px max(24px,env(safe-area-inset-bottom))}
.bs-form{display:grid;gap:16px}
.bf{position:relative}
.bf input{width:100%;min-height:56px;padding:24px 16px 8px;border:1px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);font:inherit;font-size:16px;transition:border-color .25s cubic-bezier(.2,.6,.2,1),box-shadow .25s cubic-bezier(.2,.6,.2,1)}
.bf input:focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 16%,transparent)}
.bf input[type=tel]{text-align:right}
html[dir="ltr"] .bf input[type=tel]{text-align:left}
.bf label{position:absolute;inset-inline-start:17px;top:16px;color:var(--muted);font-size:16px;pointer-events:none;transform-origin:100% 0;transition:transform .22s cubic-bezier(.2,.6,.2,1),color .22s cubic-bezier(.2,.6,.2,1)}
html[dir="ltr"] .bf label{transform-origin:0 0}
.bf input:focus+label,.bf input:not(:placeholder-shown)+label{transform:translateY(-10px) scale(.78)}
.bf input:focus+label{color:var(--accent)}
.bf-err{display:block;height:0;margin-top:6px;color:#c2255c;font-size:13px;opacity:0;visibility:hidden;transition:opacity .25s cubic-bezier(.2,.6,.2,1),visibility 0s .25s}
.bf.bad input{border-color:#c2255c;animation:bsshake .34s}
.bf.bad .bf-err{height:auto;opacity:1;visibility:visible;transition-delay:0s}
@keyframes bsshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.bs-fs{min-width:0;margin:0;padding:0;border:0}
.bs-fs legend{margin-bottom:8px;padding:0;font-size:14px;font-weight:600}
.bs-chips{display:flex;flex-wrap:wrap;gap:8px}
.bs-chip{position:relative;display:block}
.bs-chip input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.bs-chip span{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding-inline:16px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:15px;transition:background .2s cubic-bezier(.2,.6,.2,1),color .2s cubic-bezier(.2,.6,.2,1),box-shadow .2s cubic-bezier(.2,.6,.2,1)}
.bs-chip small{font-size:13px;opacity:.7;font-variant-numeric:tabular-nums}
.bs-chip input:checked+span{background:var(--accent);color:var(--accent-ink);box-shadow:none}
.bs-chip input:focus-visible+span{outline:2px solid var(--accent);outline-offset:2px}
.bs-btn{position:relative;min-height:54px;padding:0;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:17px;font-weight:600;cursor:pointer;overflow:hidden;transition:background .3s cubic-bezier(.2,.6,.2,1)}
.bs-btn span{display:block;transition:transform .3s cubic-bezier(.2,.6,.2,1),opacity .25s cubic-bezier(.2,.6,.2,1)}
.bs-btn .s2{position:absolute;inset:0;display:grid;place-items:center;transform:translateY(110%);opacity:0}
.bs-btn.load .s1{transform:translateY(-110%);opacity:0}
.bs-btn.load .s2{transform:none;opacity:1}
.bs-spin{display:inline-block;width:18px;height:18px;border:2px solid color-mix(in srgb,var(--accent-ink) 35%,transparent);border-top-color:var(--accent-ink);border-radius:50%;animation:bsspin .7s linear infinite}
@keyframes bsspin{to{transform:rotate(360deg)}}
.bs-alt{margin:8px 0 0;color:var(--muted);font-size:15px;text-align:center}
.bs-call{display:inline-flex;align-items:center;min-height:44px;padding-inline:6px;color:var(--ink);font-weight:600;text-decoration:underline;text-underline-offset:3px;unicode-bidi:isolate}
.bs-ok{display:grid;justify-items:center;gap:12px;padding-block:16px 8px;text-align:center}
.bs-ok:focus{outline:0}
.bs-okmark{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:color-mix(in srgb,var(--accent) 14%,var(--card));color:var(--accent)}
.bs-okmark svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.bs-okmark path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .4s cubic-bezier(.2,.6,.2,1) .15s}
.bs-ok.show .bs-okmark path{stroke-dashoffset:0}
.bs-ok h3{margin:0;font-size:20px;line-height:1.3}
.bs-ok p{margin:0;max-width:34ch;color:var(--muted);font-size:15px;line-height:1.5}
.bs-ok .bs-btn{width:100%;margin-top:8px;background:color-mix(in srgb,var(--ink) 8%,transparent);color:var(--ink)}
@media (min-width:768px){
  .bs-sheet{align-self:center;max-height:min(85vh,720px);max-height:min(85dvh,720px);border-radius:calc(var(--r) * 1.5);opacity:0;transform:translateY(16px);transition:transform .3s cubic-bezier(.2,.6,.2,1),opacity .3s cubic-bezier(.2,.6,.2,1)}
  .bs.is-in .bs-sheet{opacity:1;transform:none}
  .bs-sheet::after,.bs-grab{display:none}
  .bs-head{padding:28px 28px 8px}
  .bs-body{padding:8px 28px 28px}
}
@media (prefers-reduced-motion: reduce){.bs-ov,.bs-sheet,.bs-btn,.bs-btn span,.bs-okmark path{transition:none}.bf.bad input,.bs-spin{animation:none}}`,
  html:`<div class="stage tight"><div class="bsd">
  <h2>כאב גב שלא עובר?</h2>
  <p>שיחה קצרה של עשר דקות עם פיזיותרפיסט שמכיר את התחום, בלי התחייבות. נחזור אליכם באותו יום.</p>
  <div class="bsd-meta"><span>ללא עלות</span><span>תשובה תוך שעתיים בשעות הפעילות</span></div>
  <a class="bsd-open" href="#bs75" data-bs-open role="button" aria-haspopup="dialog">תיאום שיחה</a>
  <p class="bsd-hint">בטלפון: גוררים את הידית למטה כדי לסגור. בדסקטופ: חלון במרכז.</p>
</div></div>
<dialog class="bs" id="bs75" aria-labelledby="bs75-t">
  <div class="bs-ov"></div>
  <div class="bs-sheet">
    <div class="bs-grab" aria-hidden="true"><span class="bs-pill"></span></div>
    <div class="bs-head">
      <div><h2 id="bs75-t">תיאום שיחה עם הקליניקה</h2><p>נחזור אליכם בחלון הזמן שבחרתם.</p></div>
      <button class="bs-x" type="button" aria-label="סגירה"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <div class="bs-body">
      <form class="bs-form" novalidate>
        <div class="bf"><input type="text" id="bs75-n" name="name" placeholder=" " autocomplete="name" required><label for="bs75-n">שם מלא</label><small class="bf-err" id="bs75-n-e">צריך שם כדי לדעת למי לחזור</small></div>
        <div class="bf"><input type="tel" id="bs75-p" name="phone" dir="ltr" inputmode="tel" placeholder=" " autocomplete="tel" required><label for="bs75-p">טלפון</label><small class="bf-err" id="bs75-p-e">מספר הטלפון לא נראה תקין</small></div>
        <fieldset class="bs-fs">
          <legend>מתי נוח לכם?</legend>
          <div class="bs-chips">
            <label class="bs-chip"><input type="radio" name="when" value="בבוקר" checked><span>בוקר <small>9:00 עד 12:00</small></span></label>
            <label class="bs-chip"><input type="radio" name="when" value="בצהריים"><span>צהריים <small>12:00 עד 16:00</small></span></label>
            <label class="bs-chip"><input type="radio" name="when" value="בערב"><span>ערב <small>16:00 עד 19:00</small></span></label>
            <label class="bs-chip"><input type="radio" name="when" value="בהקדם האפשרי"><span>בהקדם</span></label>
          </div>
        </fieldset>
        <button class="bs-btn" type="submit"><span class="s1">שליחה</span><span class="s2" aria-hidden="true"><i class="bs-spin"></i></span></button>
      </form>
      <p class="bs-alt">מעדיפים לדבר עכשיו? <a class="bs-call" href="tel:035550142" dir="ltr">03-555-0142</a></p>
      <div class="bs-ok" role="status" tabindex="-1" hidden>
        <span class="bs-okmark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1"/></svg></span>
        <h3>קיבלנו, נתקשר</h3>
        <p class="bs-okt"></p>
        <button class="bs-btn bs-done" type="button"><span>סגירה</span></button>
      </div>
    </div>
  </div>
</dialog>
<noscript><style>.bs{position:static;display:block;height:auto;overflow:visible;padding-block:var(--sec)}.bs-ov,.bs-grab,.bs-x{display:none}.bs-sheet{margin-inline:auto;transform:none;opacity:1;border-radius:var(--r);max-height:none}.bsd-open{display:none}</style></noscript>`,
  js:`(function(){
  const dlg=document.getElementById("bs75"),sheet=dlg.querySelector(".bs-sheet"),ov=dlg.querySelector(".bs-ov");
  const grab=dlg.querySelector(".bs-grab"),xBtn=dlg.querySelector(".bs-x"),body=dlg.querySelector(".bs-body");
  const form=dlg.querySelector(".bs-form"),btn=form.querySelector(".bs-btn"),alt=dlg.querySelector(".bs-alt");
  const ok=dlg.querySelector(".bs-ok"),okT=dlg.querySelector(".bs-okt"),done=dlg.querySelector(".bs-done");
  const fields=[...form.querySelectorAll(".bf")];
  const rm=matchMedia("(prefers-reduced-motion: reduce)"),desk=matchMedia("(min-width: 768px)");
  const root=document.documentElement;
  let opener=null,closing=false,drag=null,sending=false;

  // נעילת גלילה כמו ב-b33: על html עם scrollbar-gutter, כדי שהעמוד לא יקפוץ
  function lock(){
    root.style.scrollbarGutter="stable";root.style.overflow="hidden";
    root.style.backgroundColor="color-mix(in srgb, var(--ink) 52%, var(--bg))";
  }
  function unlock(){root.style.overflow="";root.style.scrollbarGutter="";root.style.backgroundColor="";}

  function reset(){
    form.reset();form.hidden=false;alt.hidden=false;ok.hidden=true;ok.classList.remove("show");
    btn.classList.remove("load");sending=false;
    fields.forEach(f=>mark(f,false));
  }
  function open(from){
    if(dlg.open)return;
    opener=from;closing=false;reset();
    dlg.showModal();lock();body.scrollTop=0;
    if(rm.matches)dlg.classList.add("is-in");
    else{void sheet.offsetHeight;dlg.classList.add("is-in");}   // קריאת פריסה כדי שהמצב ההתחלתי יצויר לפני המעבר
  }
  function finish(){if(dlg.open)dlg.close();}
  function requestClose(fromDrag){
    if(!dlg.open||closing)return;
    closing=true;
    if(rm.matches){finish();return;}
    dlg.classList.remove("is-in");
    // מגרירה: ממשיכים מהמקום שבו המגירה נמצאת אל מחוץ למסך (ה-transform הפנימי מחליף את זה של ה-CSS)
    if(fromDrag){sheet.classList.remove("dragging");sheet.style.transform="translateY(100%)";ov.style.opacity="0";}
    else{sheet.style.transform="";ov.style.opacity="";}
    let t=setTimeout(finish,460);
    sheet.addEventListener("transitionend",function h(e){
      if(e.target!==sheet||(e.propertyName!=="transform"&&e.propertyName!=="opacity"))return;
      sheet.removeEventListener("transitionend",h);clearTimeout(t);finish();
    });
  }
  // close מופעל גם על Escape כפול של כרום שעוקף את cancel, ולכן הניקוי כאן ולא ב-requestClose
  dlg.addEventListener("close",()=>{
    dlg.classList.remove("is-in");sheet.classList.remove("dragging");
    sheet.style.transform="";ov.style.opacity="";drag=null;closing=false;
    unlock();
    if(opener&&opener.isConnected)opener.focus();
  });
  dlg.addEventListener("cancel",e=>{e.preventDefault();requestClose(false);});
  ov.addEventListener("click",()=>requestClose(false));
  xBtn.addEventListener("click",()=>requestClose(false));
  done.addEventListener("click",()=>requestClose(false));

  document.querySelectorAll("[data-bs-open]").forEach(a=>{
    a.addEventListener("click",e=>{e.preventDefault();open(a);});
    a.addEventListener("keydown",e=>{if(e.key===" "){e.preventDefault();open(a);}});
  });

  // הגרירה: רק מהידית. למעלה כמעט בלי תנועה, למטה בחצי מהמרחק של האצבע.
  // סוגרים כשהיסט המגירה >= 100 פיקסל, או כשהשחרור מהיר (יותר מ-0.6 פיקסל למילישנייה כלפי מטה)
  grab.addEventListener("pointerdown",e=>{
    if(closing)return;
    if(e.pointerType==="mouse"&&e.button!==0)return;
    grab.setPointerCapture(e.pointerId);
    drag={id:e.pointerId,y0:e.clientY,off:0,s:[{t:e.timeStamp,y:e.clientY}]};
    sheet.classList.add("dragging");
  });
  grab.addEventListener("pointermove",e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const dy=e.clientY-drag.y0;
    drag.off=dy>0?dy*.5:-Math.min(8,Math.sqrt(-dy)*.9);
    drag.s.push({t:e.timeStamp,y:e.clientY});
    while(drag.s.length>2&&e.timeStamp-drag.s[0].t>110)drag.s.shift();
    sheet.style.transform="translateY("+drag.off+"px)";
    const p=Math.min(1,Math.max(0,drag.off)/(sheet.offsetHeight*.45));
    ov.style.opacity=String(1-.75*p);
  });
  function release(e,cancelled){
    if(!drag||e.pointerId!==drag.id)return;
    const a=drag.s[0],b=drag.s[drag.s.length-1],dt=b.t-a.t;
    const v=dt>0?(b.y-a.y)/dt:0,off=drag.off;
    drag=null;
    if(!cancelled&&(off>=100||(v>.6&&off>6))){requestClose(true);return;}
    // חוזרים למקום: מורידים את מצב הגרירה, והמעבר של ה-CSS מחזיר את המגירה והרקע
    sheet.classList.remove("dragging");sheet.style.transform="";ov.style.opacity="";
  }
  grab.addEventListener("pointerup",e=>release(e,false));
  grab.addEventListener("pointercancel",e=>release(e,true));

  // הטופס: אותו מנגנון כמו b32, עם טלפון במקום אימייל
  function bad(f){
    const el=f.querySelector("input"),v=el.value.trim();
    if(el.type==="tel")return !/^0\\d{8,9}$/.test(v.replace(/\\D/g,""));
    return v.length<2;
  }
  function mark(f,b){
    f.classList.toggle("bad",b);
    const el=f.querySelector("input"),err=f.querySelector(".bf-err");
    el.setAttribute("aria-invalid",String(b));
    if(b)el.setAttribute("aria-describedby",err.id);else el.removeAttribute("aria-describedby");
  }
  fields.forEach(f=>{
    const el=f.querySelector("input");
    el.addEventListener("input",()=>{if(f.classList.contains("bad")&&!bad(f))mark(f,false);});
    el.addEventListener("blur",()=>{if(el.value.trim())mark(f,bad(f));});
  });
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(sending)return;
    let first=null;
    fields.forEach(f=>{const b=bad(f);mark(f,b);if(b&&!first)first=f;});
    if(first){first.querySelector("input").focus();return;}
    sending=true;btn.classList.add("load");
    setTimeout(()=>{
      const w=form.querySelector('input[name="when"]:checked').value;
      okT.textContent="נתקשר למספר "+form.phone.value.trim()+" "+w+".";
      form.hidden=true;alt.hidden=true;ok.hidden=false;
      void ok.offsetHeight;ok.classList.add("show");
      ok.focus();sending=false;btn.classList.remove("load");
    },1200);
  });
})();`,
  runway:false,
  note:"שחזור, השראה: Hover.dev Drag Close Drawer (https://www.hover.dev/components/modals); הקוד נכתב מחדש, ונוספה סגירה לפי מהירות. הרישיון של Hover.dev אוסר הפצה מחדש, ולכן לא הועתק ממנו דבר. הגרסה הבנאלית: מודאל שקופץ באמצע, או מגירה שנסגרת רק ב-X שבפינה העליונה, רחוק מהאגודל. כאן האגודל אוחז בידית וגורר, והמגירה עוקבת אחריו, אבל מתנגדת: למטה בחצי מהמרחק, למעלה כמעט בלי תנועה (עד 8 פיקסלים), והרקע מתבהר בקצב הגרירה. ההכרעה בשחרור היא לפי שני מבחנים: היסט של 100 פיקסל, או מהירות מעל 0.6 פיקסל למילישנייה כלפי מטה (נמדדת על 110 אלפיות השנייה האחרונות), כך שגם החלקה קצרה וחדה סוגרת, וגרירה איטית שלא הגיעה רחוק חוזרת. זו המיקרו-אינטראקציה שנושאת את המצב: האצבע רואה בכל רגע אם עוד רגע זה ייסגר. מה זה מקל: סגירה ביד אחת בלי לחפש כפתור, ופתיחה של פעולה קצרה בלי לעזוב את העמוד. המימוש: dialog ו-showModal, כך שמלכודת הפוקוס, ה-inert לדף שמאחור ו-Escape מגיעים מהדפדפן (Escape עובר ב-cancel ומסתיים באנימציית סגירה). הרקע הוא אלמנט משלו ולא ::backdrop, כי את השקיפות שלו אי אפשר לשנות מ-JS בזמן הגרירה בלי תלות בירושת משתנים. PointerEvents עם setPointerCapture על הידית בלבד, ו-touch-action:none רק עליה, כך שהתוכן שבפנים ממשיך להיגלל (max-height:85dvh, overscroll-behavior:contain). אזור האחיזה גבוה 44 פיקסל והפס עצמו 56 על 6. כל מסלול הגרירה הוא transform בלבד, ושחרור שלא סוגר מחזיר דרך אותו מעבר CSS. סגירות נוספות: לחיצה על הרקע, Escape, וכפתור X גלוי, והפוקוס חוזר למי שפתח. הטופס מ-b32: תוויות צפות, שדות 16 פיקסל (בלי זום של iOS), שגיאה לכל שדה עם aria-invalid, מצב שליחה ומסך אישור שמקבל פוקוס ומוכרז. בדסקטופ (768 ומעלה) אותו תוכן בחלון במרכז, בלי ידית. הפחתת תנועה: פתיחה וסגירה מיידיות (הגרירה עצמה ממשיכה לעקוב אחרי האצבע). בלי JS: הקישור מוביל לאותו תוכן, שמוצג בעמוד עצמו (noscript). הבדל מ-cv1: שם פס קבוע בתחתית שמציע ערוצי קשר, ללא מגירה ובלי גרירה; הבדל מ-b66 ו-b67: אלה תפריטי ניווט (מגירה מהצד וגלולה צפה), כאן משטח פעולה עם טופס שנסגר בתנועת אגודל."
},
];
