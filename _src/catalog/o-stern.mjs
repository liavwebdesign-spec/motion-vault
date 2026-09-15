// נכרה מ-stern-architecture.co.il (15.9.2026), סקשן הפרויקטים. שחזור התנהגות בלבד, מאפס, ב-GSAP ובטוקנים שלנו.
// המקור: jQuery על אירוע scroll בלי ויסות, ובמובייל מחלקה עם transition. כאן ScrollTrigger עם scrub, ופריסה אחרת במובייל.
export default [
{
  id:"g149", cat:"gsap", name:"שתי תמונות שנפרשות לצדדים וחושפות את הפרויקט", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"בכל כרטיס פרויקט שתי תמונות לאורך מונחות זו על זו במרכז ומסתירות את הטקסט. כשהכרטיס נכנס למסך הן נפרשות לצדדים עם הטיה קלה, כמו שתי תמונות שמזיזים על שולחן, ובאמצע נחשפים שם הפרויקט, התיאור והכפתור.",
  when:"רשימת פרויקטים של אדריכל, יזם נדל\"ן, מעצב פנים, צלם או סטודיו. גם מקרי בוחן ומוצרים דגל. עובד כשלכל פריט יש שתי תמונות טובות (חוץ ופנים, לפני ואחרי, יום ולילה), וחוזר על עצמו כרטיס אחרי כרטיס בלי להימאס כי הוא לא נועל את הגלילה.",
  note:"ההבדל מ-g144: שם תמונה אחת נקרעת פעם אחת בעמוד עם נעילת גלילה. כאן שתי תמונות שונות, רשימה שחוזרת, ובלי נעילה. המרחק הסופי מחושב ב-JS מרוחב הטקסט ומרוחב המסך, כך שהתמונות נעצרות צמוד לטקסט ולא בורחות מהמסך ברוחבים שונים. הטווח מתחיל כשראש הכרטיס ב-62% מהמסך ולא בתחתיתו: התמונות יושבות באמצע כרטיס בגובה מסך, ולכן כשהטווח התחיל בתחתית הן כבר היו חצי פרושות ברגע שנכנסו לעין, והרגע שבו הן מכסות את הטקסט לא נראה אף פעם (נתפס בצילום). הטווח מסתיים ב-8%, וה-ease הוא power1.out, רך יותר מעקומת המקור, מאותה סיבה. במובייל אין מקום לתמונות לצד הטקסט, ולכן הן יושבות מעליו ונפרשות רק חלקית.",
  libs:["gsap","ScrollTrigger"],
  css:`.pf{overflow-x:clip;padding-block:var(--sec)}
.pf-head{text-align:center;max-width:52ch;margin:0 auto clamp(20px,6vh,64px);padding-inline:var(--gutter)}
.pf-head h2{margin:0 0 12px;font-size:var(--fs-h2)}
.pf-head p{margin:0;color:var(--muted);line-height:1.6}
.pf-card{--iw:min(30vw,50vh);position:relative;min-height:max(100vh,calc(var(--iw) * 1.25 + 112px));display:grid;place-items:center;padding-inline:var(--gutter)}
.pf-txt{position:relative;z-index:1;text-align:center;max-width:min(440px,36vw)}
.pf-txt h3{margin:0 0 16px;font-size:clamp(28px,3vw,46px);font-weight:600}
.pf-txt p{margin:0 0 32px;color:var(--muted);font-size:16px;line-height:1.6}
.pf-btn{display:inline-block;border:1px solid var(--ink);color:var(--ink);padding:12px 24px;text-decoration:none;font-size:15px;transition:background-color .3s,color .3s}
.pf-btn:hover{background:var(--ink);color:var(--bg)}
/* שתי התמונות יושבות בדיוק באותו מקום, במרכז ומעל הטקסט. JS מזיז אותן */
.pf-img{position:absolute;left:50%;top:50%;z-index:2;width:var(--iw);aspect-ratio:4/5;margin:calc(var(--iw) * -.625) 0 0 calc(var(--iw) * -.5);will-change:transform;
  box-shadow:0 30px 60px -30px color-mix(in srgb,var(--ink) 55%,transparent)}
.pf-img .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.pf-img.r{z-index:3}
@media (max-width:767px){
  /* קצב אנכי מובייל: 32 מעל ומתחת לכל כרטיס = 64 בין כרטיס לכרטיס, כמו קצב הסקשן במובייל */
  .pf-card{--iw:min(56vw,300px);min-height:0;display:flex;flex-direction:column;align-items:center;padding-block:32px}
  .pf-stack{position:relative;width:100%;height:calc(var(--iw) * 1.25 + 32px);margin-bottom:32px}
  .pf-txt{max-width:36ch}
}
@media (min-width:768px){.pf-stack{display:contents}}`,
  html:`<section class="pf">
  <header class="pf-head"><h2>פרויקטים נבחרים</h2><p>כל פרויקט מתחיל מסגור, ושתי התמונות שלו נפרשות כשמגיעים אליו.</p></header>
  <article class="pf-card">
    <div class="pf-txt"><h3>מגדל הגפן</h3><p>שמונה קומות מגורים על מגרש פינתי צר, עם חזית שנפתחת לרחוב ומרפסות שמוסתרות מהשכנים.</p><a class="pf-btn" href="#">לצפייה בפרויקט</a></div>
    <div class="pf-stack"><div class="pf-img l"><div class="ph ph-a"></div></div><div class="pf-img r"><div class="ph ph-c"></div></div></div>
  </article>
  <article class="pf-card">
    <div class="pf-txt"><h3>בית הכרם 12</h3><p>שימור מבנה מ-1936 ותוספת של שתי קומות, בלי לגעת בקו החזית המקורי.</p><a class="pf-btn" href="#">לצפייה בפרויקט</a></div>
    <div class="pf-stack"><div class="pf-img l"><div class="ph ph-d"></div></div><div class="pf-img r"><div class="ph ph-b"></div></div></div>
  </article>
  <article class="pf-card">
    <div class="pf-txt"><h3>קריית המדע</h3><p>קמפוס משרדים של שלושה מבנים סביב חצר משותפת, עם מעבר ציבורי שחוצה אותו.</p><a class="pf-btn" href="#">לצפייה בפרויקט</a></div>
    <div class="pf-stack"><div class="pf-img l"><div class="ph ph-e"></div></div><div class="pf-img r"><div class="ph ph-a"></div></div></div>
  </article>
</section>`,
  js:`(function(){
  gsap.registerPlugin(ScrollTrigger);
  const cards=gsap.utils.toArray(".pf-card");
  const mobile=()=>matchMedia("(max-width:767px)").matches;
  // המרחק שבו התמונה נעצרת: צמוד לטקסט בדסקטופ, בלי לחרוג מהמסך. במובייל חלקי, כי התמונות מעל הטקסט
  function spread(card){
    const img=card.querySelector(".pf-img"),txt=card.querySelector(".pf-txt");
    const iw=img.offsetWidth,vw=innerWidth;
    if(mobile())return Math.min(vw*.5-iw*.5-12,iw*.42);
    return Math.min(txt.offsetWidth*.5+iw*.5+40,vw*.5-iw*.5-16);
  }
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){
    cards.forEach(c=>{const d=spread(c);gsap.set(c.querySelector(".pf-img.l"),{x:-d,rotate:-6});gsap.set(c.querySelector(".pf-img.r"),{x:d,rotate:6});});
    return;
  }
  cards.forEach(card=>{
    const rot=mobile()?3:6;
    gsap.timeline({scrollTrigger:{trigger:card,start:"top 62%",end:"top 8%",scrub:.5,invalidateOnRefresh:true}})
      .fromTo(card.querySelector(".pf-img.l"),{x:0,rotate:0},{x:()=>-spread(card),rotate:-rot,ease:"power1.out"},0)
      .fromTo(card.querySelector(".pf-img.r"),{x:0,rotate:0},{x:()=>spread(card),rotate:rot,ease:"power1.out"},0);
  });
})();`
},
];
