// גל שני מ-madewithgsap (2.9.2026): כרטיס וידאו בהובר, ומחיר מתגלגל. שחזור התנהגות בלבד.
export default [
{
  id:"b19", cat:"behavior", name:"כרטיס וידאו שמתנגן בהובר", tech:"HTML video · JS", status:"ממתין",
  desc:"גריד כרטיסים שבו כל אחד מציג תמונת פוסטר בלבד. בהובר הווידאו נטען ומתנגן בשקט, וביציאה נעצר וחוזר להתחלה. שום וידאו לא יורד לפני שנגעו בו.",
  when:"גלריית עבודות, קטלוג מוצרים, רשימת פרויקטים. הדרך הנכונה לשים הרבה וידאו בעמוד בלי להרוג את זמן הטעינה.",
  libs:[],
  css:`.vgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
.vcardx{position:relative;border-radius:var(--r);overflow:hidden;background:#0f1020;aspect-ratio:16/10;cursor:pointer}
.vcardx img,.vcardx video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.vcardx video{opacity:0;transition:opacity .3s ease}
.vcardx.playing video{opacity:1}
.vcardx figcaption{position:absolute;inset-inline:0;bottom:0;padding:14px 16px;color:#fff;font-size:14px;font-weight:500;background:linear-gradient(transparent,rgba(0,0,0,.6));z-index:2}
.vcardx .badge{position:absolute;top:12px;inset-inline-end:12px;z-index:2;background:rgba(255,255,255,.92);color:#111;border-radius:999px;padding:5px 12px;font-size:11px;letter-spacing:.08em}
@media(max-width:767px){.vgrid{grid-template-columns:1fr}}`,
  html:`<div class="stage tight"><div class="vgrid">
  <figure class="vcardx"><img src="../assets/media/demo-a.jpg" alt=""><video preload="none" muted loop playsinline poster="../assets/media/demo-a.jpg" data-src="../assets/media/demo-a.mp4"></video><span class="badge">וידאו</span><figcaption>פרויקט ראשון</figcaption></figure>
  <figure class="vcardx"><img src="../assets/media/demo-b.jpg" alt=""><video preload="none" muted loop playsinline poster="../assets/media/demo-b.jpg" data-src="../assets/media/demo-b.mp4"></video><span class="badge">וידאו</span><figcaption>פרויקט שני</figcaption></figure>
  <figure class="vcardx"><img src="../assets/media/demo-a.jpg" alt=""><video preload="none" muted loop playsinline poster="../assets/media/demo-a.jpg" data-src="../assets/media/demo-a.mp4"></video><span class="badge">וידאו</span><figcaption>פרויקט שלישי</figcaption></figure>
</div>
<p class="center" style="color:var(--muted);font-size:14px">בדסקטופ: הובר מנגן. במובייל: נגיעה מנגנת ועוצרת.</p></div>`,
  js:`(function(){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hoverable=matchMedia("(hover:hover)").matches;
  document.querySelectorAll(".vcardx").forEach(card=>{
    const v=card.querySelector("video");
    let loaded=false;
    const play=()=>{
      if(reduce)return;
      if(!loaded){v.src=v.dataset.src;loaded=true;}
      card.classList.add("playing");
      const p=v.play();if(p&&p.catch)p.catch(()=>{});
    };
    const stop=()=>{card.classList.remove("playing");v.pause();try{v.currentTime=0;}catch(e){}};
    if(hoverable){
      card.addEventListener("mouseenter",play);
      card.addEventListener("mouseleave",stop);
      card.addEventListener("focusin",play);
      card.addEventListener("focusout",stop);
    }else{
      card.addEventListener("click",()=>card.classList.contains("playing")?stop():play());
    }
  });
})();`,
  runway:false,
  note:"preload=\"none\" הוא הלב: הדפדפן לא נוגע בקובץ הווידאו עד ההובר הראשון, והפוסטר לבדו מצויר. הווידאו חייב muted כדי שדפדפנים ירשו ניגון בלי לחיצה, ו-playsinline כדי שאייפון לא יפתח נגן מסך מלא."
},
{
  id:"b20", cat:"behavior", name:"מחיר שמתגלגל בהחלפת מסלול", tech:"GSAP · timeline", status:"ממתין",
  desc:"מתג בין מסלול חודשי לשנתי, והמחיר לא מתחלף בקפיצה: הספרה הישנה נגללת למעלה ויוצאת, החדשה נכנסת מלמטה, וכל ספרה בעיכוב קטן משלה.",
  when:"כל סקשן מחירים עם שני מסלולים. ההתגלגלות מוכיחה שהמספר באמת השתנה, במקום שהעין תפספס את ההנחה.",
  libs:["gsap"],
  css:`.pr-card{max-width:420px;margin-inline:auto;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:32px 28px;text-align:center}
.pr-top{display:inline-flex;align-items:center;gap:12px;font-size:14px;color:var(--muted);margin-bottom:26px}
.pr-top button{background:none;border:0;font:inherit;color:var(--muted);cursor:pointer;padding:4px}
.pr-top button.on{color:var(--ink);font-weight:700}
.pr-sw{width:52px;height:30px;border-radius:999px;background:#dcdce8;position:relative;transition:background .3s;flex:none}
.pr-sw i{position:absolute;top:3px;inset-inline-start:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.pr-sw.year{background:var(--accent)}
.pr-sw.year i{transform:translateX(-22px)}
.pr-price{display:flex;justify-content:center;align-items:baseline;gap:4px;font-weight:800;line-height:1;font-size:clamp(52px,6vw,90px);direction:ltr}
.pr-digit{display:inline-block;overflow:hidden;height:1em;position:relative}
.pr-digit span{display:block;will-change:transform}
.pr-cur{font-size:.55em;font-weight:700;color:var(--muted)}
.pr-sub{color:var(--muted);font-size:14px;margin-top:14px;min-height:1.4em}
.pr-save{display:inline-block;margin-top:8px;font-size:12px;background:#e9ffd6;color:#2b6a13;border-radius:999px;padding:5px 12px}
.pr-save[hidden]{display:none}`,
  html:`<div class="stage tight"><div class="pr-card">
  <div class="pr-top">
    <button class="to-m on">חודשי</button>
    <span class="pr-sw" role="button" tabindex="0" aria-label="החלפת מסלול תשלום"><i></i></span>
    <button class="to-y">שנתי</button>
  </div>
  <div class="pr-price" aria-live="polite"><span class="pr-cur">₪</span><span class="pr-num"></span></div>
  <p class="pr-sub">לחודש, ללא התחייבות</p>
  <span class="pr-save" hidden>חיסכון של 20%</span>
</div></div>`,
  js:`(function(){
  const PLANS={m:{price:"390",sub:"לחודש, ללא התחייבות",save:false},y:{price:"312",sub:"לחודש, בחיוב שנתי",save:true}};
  const num=document.querySelector(".pr-num"),sub=document.querySelector(".pr-sub"),save=document.querySelector(".pr-save");
  const sw=document.querySelector(".pr-sw"),bm=document.querySelector(".to-m"),by=document.querySelector(".to-y");
  let plan="m",digits=[];
  function build(str){
    num.innerHTML="";
    digits=[...str].map(c=>{
      const w=document.createElement("span");w.className="pr-digit";
      const inner=document.createElement("span");inner.textContent=c;
      w.appendChild(inner);num.appendChild(w);return inner;
    });
  }
  function roll(str){
    if(digits.length!==str.length){build(str);return;}
    [...str].forEach((c,i)=>{
      const el=digits[i];
      if(el.textContent===c)return;
      gsap.timeline({delay:i*0.06})
        .to(el,{yPercent:-110,autoAlpha:0,duration:.22,ease:"power2.in",onComplete:()=>el.textContent=c})
        .fromTo(el,{yPercent:110,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.34,ease:"back.out(2)"});
    });
  }
  function apply(next){
    plan=next;const p=PLANS[plan];
    roll(p.price);
    sub.textContent=p.sub;save.hidden=!p.save;
    sw.classList.toggle("year",plan==="y");
    bm.classList.toggle("on",plan==="m");by.classList.toggle("on",plan==="y");
  }
  build(PLANS.m.price);
  const toggle=()=>apply(plan==="m"?"y":"m");
  sw.addEventListener("click",toggle);
  sw.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();toggle();}});
  bm.addEventListener("click",()=>apply("m"));
  by.addEventListener("click",()=>apply("y"));
})();`,
  runway:false,
  note:"המחיר עטוף ב-aria-live=\"polite\" כדי שקורא מסך יקריא את הערך החדש. הספרות ב-direction:ltr כי מספרים נכתבים משמאל לימין גם בעמוד עברי."
},
];
