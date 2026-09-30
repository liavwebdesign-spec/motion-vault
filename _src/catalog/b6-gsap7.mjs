// גל awwwards (2.9.2026): נכרה מ-21oaks.org. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g42", cat:"gsap", name:"קו מצויר ביד מתחת לכותרת", tech:"GSAP · ScrollTrigger · stroke-dashoffset", status:"ממתין",
  desc:"קו לא מושלם, כמו שרבוט של עיפרון, שנמתח מימין לשמאל מתחת למילה כשהכותרת נכנסת למסך. שלושה סוגים: קו תחתון, עיגול סביב מילה, וחץ שמצביע.",
  when:"הדגשת מילת מפתח בכותרת ראשית, מחיר, או הבטחה. עובד יפה במותגים חמים ואנושיים. אחד או שניים בעמוד, לא יותר.",
  libs:["gsap","ScrollTrigger"],
  css:`.hd-wrap{max-width:22ch;margin-inline:auto;text-align:center;font-size:clamp(30px,3.6vw,62px);font-weight:800;line-height:1.4}
.hd-mark{position:relative;display:inline-block;white-space:nowrap}
.hd-mark svg{position:absolute;inset-inline:-6%;bottom:-.28em;width:112%;height:.42em;overflow:visible;pointer-events:none}
.hd-mark.circle svg{inset:-22% -10%;width:120%;height:150%;bottom:auto}
.hd-mark path{fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}
.hd-mark.warm path{stroke:#e8590c}
.hd-arrow{display:block;width:min(240px,50vw);height:70px;margin:26px auto 0;overflow:visible}
.hd-arrow path{fill:none;stroke:var(--muted);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
/* המקף נמדד בפיקסלים של המסך (--len, מה-JS), כי vector-effect מצייר אותו כך. --p הוא החלק המצויר.
   הפיקסל הנוסף בהיסט מונע נקודה בתחילת הקו לפני שהציור מתחיל (מקף באורך אפס עם קצה עגול).
   בלי JS --len לא מוגדר, הערך לא תקף, והקו מצויר מלא */
.hd-mark path,.hd-arrow path{stroke-dasharray:calc(var(--len)*1px) calc(var(--len)*1px);stroke-dashoffset:calc((var(--len)*(1 - var(--p,1)) + 1)*1px)}
.hd-note{text-align:center;font-size:16px;font-weight:500;color:var(--muted);margin-top:6px}`,
  html:`<div class="stage"><p class="hd-wrap">בונים לך אתר שגם <span class="hd-mark"><span>נראה טוב</span>
<svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M296,17 C250,25 190,7 140,14 C96,20 44,10 6,19"/></svg>
</span> וגם מביא לקוחות.</p></div>
<div class="stage"><p class="hd-wrap">המחיר מתחיל ב<span class="hd-mark circle warm"><span>2,900</span>
<svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true"><path d="M262,26 C226,6 96,2 46,22 C-4,44 6,92 62,106 C132,122 268,112 288,80 C300,58 286,34 250,22"/></svg>
</span> ש"ח בלבד.</p>
<svg class="hd-arrow" viewBox="0 0 240 70" aria-hidden="true"><path d="M228,10 C196,44 150,60 96,58 L118,40 L96,58 L120,66"/></svg>
<p class="hd-note">גם החץ מצויר ביד</p></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const paths=gsap.utils.toArray(".hd-mark svg path, .hd-arrow path");
  // האורך של הקו כפי שהוא מצויר על המסך: דוגמים את ה-path ומכפילים במטריצה של ה-SVG.
  // כל path חייב להיות רצוף, בלי M באמצע: הדפדפן מתחיל את המקף מחדש בכל תת-מסלול,
  // וראש החץ היה מצויר שלם באמצע האנימציה, מנותק מהקו. לכן ראש החץ ממשיך את אותו קו (הלוך וחזור על כנף אחת).
  const screenLen=p=>{
    const m=p.getScreenCTM(),L=p.getTotalLength();
    let s=0,a=null;
    for(let i=0;i<=256;i++){
      const q=p.getPointAtLength(L*i/256),x=m.a*q.x+m.c*q.y,y=m.b*q.x+m.d*q.y;
      if(a)s+=Math.hypot(x-a[0],y-a[1]);
      a=[x,y];
    }
    // הדגימה מקצרת פינות חדות (ראש החץ), ולכן מעגלים למעלה עם מרווח: אורך קצר מהאמיתי היה משאיר קצה לא מצויר
    return Math.ceil(s*1.02)+4;
  };
  const size=()=>paths.forEach(p=>p.style.setProperty("--len",screenLen(p)));
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    size();addEventListener("resize",size);
    paths.forEach(p=>gsap.fromTo(p,{"--p":0},{"--p":1,duration:.75,ease:"power2.inOut",
      scrollTrigger:{trigger:p.ownerSVGElement,start:"top 80%",toggleActions:"play none none none"}}));
    return ()=>{removeEventListener("resize",size);paths.forEach(p=>p.style.removeProperty("--len"));};
  });
})();`,
  note:"הקו מצויר מהקצה הימני של ה-path שמאלה, ככיוון הקריאה בעברית. באתר אנגלי הופכים את סדר הנקודות ב-d. הסוד לתחושת יד: לא להשתמש בקו ישר, אלא בעקומה עם שתי נקודות בקרה שסוטות מעט למעלה ולמטה, ו-stroke-linecap עגול. **למה לא DrawSVG**: ה-SVG נמתח לא אחיד (preserveAspectRatio=none), ולכן vector-effect:non-scaling-stroke חובה, אחרת עובי הקו מתעוות. אבל עם vector-effect המקף נמדד בפיקסלים של המסך, בעוד ש-DrawSVG מודד ביחידות ה-SVG, ובפועל בטלפון הקו נגמר בשליש הראשון של האנימציה ובמסך רחב נשאר ממנו מקטע מנותק. לכן האורך נמדד כאן על המסך, נשמר במשתנה --len ומחושב מחדש בשינוי רוחב, והטווין מניע רק את --p. **ומלכודת נוספת**: path עם כמה תת-מסלולים (M באמצע ה-d) לא מתאים לשיטה, כי הדפדפן מתחיל את המקף מחדש בכל תת-מסלול, ובחץ הקודם ראש החץ הופיע שלם באמצע הציור, מנותק מהקו. לכן ראש החץ הוא המשך של אותו קו (הולך לקצה כנף אחת, חוזר, וממשיך לשנייה), עם stroke-linejoin עגול. בלי JS ובהפחתת תנועה הקווים מצוירים מלאים. ה-SVG מסומן aria-hidden כי הוא קישוט בלבד."
},
];
