// גל שני מ-madewithgsap (2.9.2026): כרטיס וידאו בהובר, ומחיר מתגלגל. שחזור התנהגות בלבד.
export default [
{
  id:"b19", cat:"behavior", name:"כרטיס וידאו שמתנגן בהובר", tech:"HTML video · JS", status:"ממתין",
  desc:"גריד כרטיסים שבו כל אחד מציג תמונת פוסטר בלבד. בהובר הווידאו נטען ומתנגן בשקט, וביציאה נעצר וחוזר להתחלה. שום וידאו לא יורד לפני שנגעו בו.",
  when:"גלריית עבודות, קטלוג מוצרים, רשימת פרויקטים. הדרך הנכונה לשים הרבה וידאו בעמוד בלי להרוג את זמן הטעינה.",
  libs:[],
  css:`.vgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);padding-inline:var(--gutter)}
/* margin:0: ל-<figure> יש שוליים של הדפדפן (40px מכל צד), והכרטיס יוצא צר מהעמודה עם רווח ענק בגריד */
.vcardx{position:relative;margin:0;border-radius:var(--r);overflow:hidden;background:#0f1020;aspect-ratio:16/10}
@media (hover:none){.vcardx{cursor:pointer}}
.vcardx img,.vcardx video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.vcardx video{opacity:0;transition:opacity .3s ease}
.vcardx.playing video{opacity:1}
.vcardx figcaption{position:absolute;inset-inline:0;bottom:0;padding:14px 16px;color:#fff;font-size:14px;font-weight:500;background:linear-gradient(transparent,rgba(0,0,0,.6));z-index:2}
.vcardx .badge{position:absolute;top:12px;inset-inline-end:12px;z-index:2;background:rgba(255,255,255,.92);color:#111;border-radius:999px;padding:5px 12px;font-size:12px;letter-spacing:0}
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
  note:"preload=\"none\" הוא הלב: הדפדפן לא נוגע בקובץ הווידאו עד ההובר הראשון, והפוסטר לבדו מצויר. הווידאו חייב muted כדי שדפדפנים ירשו ניגון בלי לחיצה, ו-playsinline כדי שאייפון לא יפתח נגן מסך מלא. בפרויקט כל כרטיס הוא קישור לעמוד הפרויקט (<a class=\"vcardx\" href=\"...\"> עם display:block), ואז focusin מנגן גם מהמקלדת והלחיצה בדסקטופ מובילה לאנשהו. בדמו אין לאן לקשר, ולכן בדסקטופ אין סמן יד."
},
{
  id:"b20", cat:"behavior", name:"מחיר שמתגלגל בהחלפת מסלול", tech:"GSAP · timeline", status:"ממתין",
  desc:"מתג בין מסלול חודשי לשנתי, והמחיר לא מתחלף בקפיצה: הספרה הישנה נגללת למעלה ויוצאת, החדשה נכנסת מלמטה, וכל ספרה בעיכוב קטן משלה.",
  when:"כל סקשן מחירים עם שני מסלולים. ההתגלגלות מוכיחה שהמספר באמת השתנה, במקום שהעין תפספס את ההנחה.",
  libs:["gsap"],
  css:`.pr-card{max-width:420px;margin-inline:auto;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:32px 28px;text-align:center}
.pr-top{display:inline-flex;align-items:center;gap:12px;font-size:14px;color:var(--muted);margin-bottom:26px}
/* אזור הלחיצה של חודשי ושנתי גדל ל-44px בגובה, וה-margin השלילי משאיר את השורה באותו גובה */
.pr-top button:not(.pr-sw){background:none;border:0;font:inherit;color:var(--muted);cursor:pointer;padding:14px 8px;margin-block:-10px}
.pr-top button.on{color:var(--ink);font-weight:700}
.pr-sw{width:52px;height:30px;border:0;padding:0;border-radius:999px;background:#dcdce8;position:relative;transition:background .3s;flex:none;cursor:pointer}
/* אזור לחיצה של 60x44 סביב המתג, בלי לשנות את המראה */
.pr-sw::after{content:"";position:absolute;inset:-7px -4px}
.pr-sw i{position:absolute;top:3px;inset-inline-start:3px;width:24px;height:24px;border-radius:50%;background:#fff /* qa-allow: white, ידית/סמן ולא משטח טקסט */;transition:transform .3s cubic-bezier(.2,.6,.2,1)}
.pr-sw.year{background:var(--accent)}
.pr-sw.year i{transform:translateX(-22px)}
[dir="ltr"] .pr-sw.year i{transform:translateX(22px)}
.pr-price{display:flex;justify-content:center;align-items:baseline;gap:4px;font-weight:800;line-height:1;font-size:clamp(52px,6vw,90px);direction:ltr}
/* clip-path ולא overflow:hidden: בלוק inline-block עם overflow מקבל את הקצה התחתון שלו כקו בסיס, וה-₪ צנח 15px מתחת לספרות.
   החיתוך האנכי זהה, והגלגול עדיין נחתך בגבולות הספרה */
.pr-digit{display:inline-block;height:1em;position:relative;overflow:visible;clip-path:inset(0 -.1em)}
.pr-digit span{display:block;will-change:transform}
.pr-cur{font-size:.55em;font-weight:700;color:var(--muted)}
.pr-sub{color:var(--muted);font-size:14px;margin-top:14px;min-height:1.4em}
.pr-save{display:inline-block;margin-top:8px;font-size:12px;background:#e9ffd6;color:#2b6a13;border-radius:999px;padding:5px 12px}
/* התגית שומרת את מקומה גם כשהיא מוסתרת, כדי שהכרטיס לא יגדל ויקפיץ את מה שמתחתיו בכל החלפה */
.pr-save[hidden]{display:inline-block;visibility:hidden}
.pr-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
  html:`<div class="stage tight"><div class="pr-card">
  <div class="pr-top">
    <button type="button" class="to-m on" aria-pressed="true">חודשי</button>
    <button type="button" class="pr-sw" role="switch" aria-checked="false" aria-label="חיוב שנתי"><i></i></button>
    <button type="button" class="to-y" aria-pressed="false">שנתי</button>
  </div>
  <div class="pr-price"><span class="pr-cur" aria-hidden="true">₪</span><span class="pr-num" aria-hidden="true">390</span></div>
  <span class="pr-sr" aria-live="polite">390 שקלים</span>
  <p class="pr-sub">לחודש, ללא התחייבות</p>
  <span class="pr-save" hidden>חיסכון של 20%</span>
</div></div>`,
  js:`(function(){
  const PLANS={m:{price:"390",sub:"לחודש, ללא התחייבות",save:false},y:{price:"312",sub:"לחודש, בחיוב שנתי",save:true}};
  const num=document.querySelector(".pr-num"),sub=document.querySelector(".pr-sub"),save=document.querySelector(".pr-save");
  const sw=document.querySelector(".pr-sw"),bm=document.querySelector(".to-m"),by=document.querySelector(".to-y");
  const sr=document.querySelector(".pr-sr");
  const still=matchMedia("(prefers-reduced-motion: reduce)");
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
      // בלי GSAP (CDN חסום) או בתנועה מופחתת: הספרה פשוט מתחלפת. זה רכיב מחירים, והוא חייב לעבוד בכל מצב
      if(!window.gsap||still.matches){el.textContent=c;return;}
      gsap.timeline({delay:i*0.06})
        .to(el,{yPercent:-110,autoAlpha:0,duration:.22,ease:"power2.in",onComplete:()=>el.textContent=c})
        .fromTo(el,{yPercent:110,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.34,ease:"power3.out"});
    });
  }
  function apply(next){
    plan=next;const p=PLANS[plan];
    roll(p.price);
    sub.textContent=p.sub;save.hidden=!p.save;
    sw.classList.toggle("year",plan==="y");
    bm.classList.toggle("on",plan==="m");by.classList.toggle("on",plan==="y");
    sw.setAttribute("aria-checked",String(plan==="y"));
    bm.setAttribute("aria-pressed",String(plan==="m"));by.setAttribute("aria-pressed",String(plan==="y"));
    sr.textContent=p.price+" שקלים, "+p.sub;
  }
  build(PLANS.m.price);
  // כפתור אמיתי מטפל ב-Enter וברווח לבד, ולכן אין מאזין מקלדת
  sw.addEventListener("click",()=>apply(plan==="m"?"y":"m"));
  bm.addEventListener("click",()=>apply("m"));
  by.addEventListener("click",()=>apply("y"));
})();`,
  runway:false,
  note:"הספרות המתגלגלות aria-hidden, כי קורא מסך היה מקריא ערכי ביניים כמו 392 בזמן שהן מתחלפות אחת אחת. את המחיר החדש מקריא span מוסתר עם aria-live=\"polite\" שמקבל את הערך הסופי בבת אחת. המתג הוא button עם role=\"switch\" ו-aria-checked, וכפתורי חודשי ושנתי נושאים aria-pressed. בלי GSAP או בתנועה מופחתת הספרות מתחלפות בלי גלגול, והמתג עובד. הספרות ב-direction:ltr כי מספרים נכתבים משמאל לימין גם בעמוד עברי."
},
];
