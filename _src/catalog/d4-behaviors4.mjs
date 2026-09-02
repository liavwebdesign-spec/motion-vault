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
.vstate{position:absolute;bottom:16px;inset-inline-end:20px;z-index:3;font-size:12px;letter-spacing:.1em;color:#fff;background:rgba(0,0,0,.45);border-radius:999px;padding:6px 14px}`,
  html:`<div class="stage tight center" style="color:var(--muted)">גלול למטה. הסרטון יורד לרשת רק כשהסקשן מתקרב.</div>
<section class="vsec">
  <img class="vposter" src="../assets/media/demo-b.jpg" alt="">
  <video muted loop playsinline preload="none" poster="../assets/media/demo-b.jpg" data-src="../assets/media/demo-b.mp4"></video>
  <div class="vsec-in"><h3>שקט שאפשר להרגיש</h3><p>הווידאו מתנגן רק כשהוא באמת מול העיניים, ונעצר ברגע שהוא יוצא מהמסך.</p></div>
  <span class="vstate">ממתין</span>
</section>
<div class="stage center" style="color:var(--muted);min-height:120vh;display:grid;place-items:center">המשך לגלול, והסרטון ייעצר מאחוריך. גלול חזרה למעלה והוא יחזור לנגן.</div>`,
  js:`(function(){
  const sec=document.querySelector(".vsec"),v=sec.querySelector("video"),state=sec.querySelector(".vstate");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let loaded=false;
  const set=t=>state.textContent=t;
  if(reduce){set("מושהה: העדפת תנועה מופחתת");return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        if(!loaded){v.src=v.dataset.src;loaded=true;set("טוען");}
        const p=v.play();
        if(p&&p.then)p.then(()=>{sec.classList.add("playing");set("מתנגן");}).catch(()=>set("הדפדפן חסם ניגון"));
      }else{
        v.pause();sec.classList.remove("playing");set("מושהה");
      }
    });
  },{threshold:.35});
  io.observe(sec);
})();`,
  runway:true,
  note:"הסף 0.35 אומר שהניגון מתחיל כשיותר משליש מהסקשן במסך, כדי שהוא לא יידלק ויכבה בגלילה מהירה. חובה muted ו-playsinline, אחרת הדפדפן יסרב לנגן בלי לחיצה ואייפון יפתח מסך מלא. הפוסטר הוא תמונה אמיתית מתחת לווידאו, כך שגם אם הרשת איטית הסקשן אף פעם לא ריק."
}
];
