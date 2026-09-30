// גל awwwards (2.9.2026): נכרה מ-grafik.co.nz ומ-odysseeclinic.com.au. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"b22", cat:"behavior", name:"סקשן וידאו שמתנגן רק כשרואים אותו", tech:"IntersectionObserver · video", status:"ממתין",
  desc:"סרטון ברוחב מלא שמתחיל לנגן כשהסקשן נכנס למסך ונעצר כשהוא יוצא. עד אז מוצג פוסטר בלבד, והדפדפן לא מוריד את הווידאו.",
  when:"סקשני אווירה באתרי תדמית, קליניקות, מסעדות ונדל\"ן. הדרך הנכונה לשים וידאו גדול בעמוד בלי לשלם עליו בזמן טעינה.",
  libs:[],
  css:`.vsec{position:relative;min-height:min(88vh,780px);overflow:hidden;display:grid;place-items:center;background:#0f1020}
.vsec video,.vsec .vposter{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.vsec video{opacity:0;transition:opacity .6s ease}
.vsec.playing video{opacity:1}
.vsec::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.45))}
.vsec-in{position:relative;z-index:2;text-align:center;color:#fff;padding-inline:var(--gutter)}
.vsec-in h3{font-size:clamp(30px,4vw,66px);margin:0 0 12px;font-weight:800}
.vsec-in p{margin:0 auto;max-width:44ch;font-size:17px;opacity:.85}
.vstate{position:absolute;bottom:16px;inset-inline-end:20px;z-index:3;font-size:12px;letter-spacing:0;color:#fff;background:rgba(0,0,0,.45);border-radius:999px;padding:6px 14px}
/* כפתור עצירה והפעלה גלוי (WCAG 2.2.2, motion.md 9.2א): הסרטון מתנגן לכולם, גם בתנועה מופחתת, והכפתור הוא הדרך לעצור */
.vtoggle{position:absolute;bottom:16px;inset-inline-start:20px;z-index:3;width:44px;height:44px;border-radius:50%;border:0;padding:0;display:grid;place-items:center;
  background:rgba(0,0,0,.45);color:#fff;cursor:pointer;transition:background .18s}
.vtoggle:hover{background:rgba(0,0,0,.65)}
.vtoggle svg{width:16px;height:16px;fill:currentColor}
.vtoggle .i-play,.vtoggle.is-paused .i-pause{display:none}
.vtoggle.is-paused .i-play{display:block}`,
  html:`<div class="stage tight center" style="color:var(--muted)">גלול למטה. הסרטון יורד לרשת רק כשהסקשן מתקרב.</div>
<section class="vsec">
  <img class="vposter" src="../assets/media/demo-b.jpg" alt="">
  <video muted loop playsinline preload="none" poster="../assets/media/demo-b.jpg" data-src="../assets/media/demo-b.mp4"></video>
  <div class="vsec-in"><h3>שקט שאפשר להרגיש</h3><p>הווידאו מתנגן רק כשהוא באמת מול העיניים, ונעצר ברגע שהוא יוצא מהמסך.</p></div>
  <button class="vtoggle is-paused" type="button" aria-label="הפעלת הסרטון"><svg class="i-pause" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg><svg class="i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6a.6.6 0 0 0 .9.5l9.3-5.8a.6.6 0 0 0 0-1L4.9 1.7a.6.6 0 0 0-.9.5z"/></svg></button>
  <span class="vstate">ממתין</span>
</section>
<div class="stage center" style="color:var(--muted);min-height:120vh;display:grid;place-items:center">המשך לגלול, והסרטון ייעצר מאחוריך. גלול חזרה למעלה והוא יחזור לנגן.</div>`,
  js:`(function(){
  const sec=document.querySelector(".vsec"),v=sec.querySelector("video"),state=sec.querySelector(".vstate");
  const btn=sec.querySelector(".vtoggle");
  let loaded=false,inView=false,userPaused=false;
  const set=t=>state.textContent=t;
  // הכפתור משקף את המצב האמיתי של הסרטון, לא את הלחיצה האחרונה
  const paint=playing=>{btn.classList.toggle("is-paused",!playing);btn.setAttribute("aria-label",playing?"השהיית הסרטון":"הפעלת הסרטון");};
  function play(){
    if(!loaded){v.src=v.dataset.src;loaded=true;set("טוען");}
    const p=v.play();
    if(p&&p.then)p.then(()=>{sec.classList.add("playing");set("מתנגן");paint(true);}).catch(()=>{set("הדפדפן חסם ניגון");paint(false);});
  }
  // בלי ענף תנועה מופחתת: וידאו אווירה מתנגן לכולם, והכפתור הוא העצירה (motion.md 9.2א)
  btn.addEventListener("click",()=>{
    if(v.paused){userPaused=false;play();}
    else{userPaused=true;v.pause();set("מושהה");paint(false);}
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      inView=e.isIntersecting;
      if(inView){if(!userPaused)play();}
      else if(loaded){v.pause();sec.classList.remove("playing");set("מושהה");paint(false);}
    });
  },{threshold:.35});
  io.observe(sec);
})();`,
  runway:true,
  note:"הסף 0.35 אומר שהניגון מתחיל כשיותר משליש מהסקשן במסך, כדי שהוא לא יידלק ויכבה בגלילה מהירה. חובה muted ו-playsinline, אחרת הדפדפן יסרב לנגן בלי לחיצה ואייפון יפתח מסך מלא. הפוסטר הוא תמונה אמיתית מתחת לווידאו, כך שגם אם הרשת איטית הסקשן אף פעם לא ריק. הסרטון מתנגן לכולם, גם בהעדפת תנועה מופחתת, עם כפתור עצירה והפעלה גלוי (WCAG 2.2.2): במחשבי ארגון אפקטי האנימציה כבויים, וסרטון שנעצר על פריים ראשון נראה ללקוח תקוע. מי שעצר בכפתור נשאר עצור גם כשגולל החוצה וחוזר."
}
];
