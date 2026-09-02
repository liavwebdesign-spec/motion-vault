// גל awwwards (2.9.2026): נכרה מ-21oaks.org. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g42", cat:"gsap", name:"קו מצויר ביד מתחת לכותרת", tech:"GSAP · DrawSVG", status:"ממתין",
  desc:"קו לא מושלם, כמו שרבוט של עיפרון, שנמתח מימין לשמאל מתחת למילה כשהכותרת נכנסת למסך. שלושה סוגים: קו תחתון, עיגול סביב מילה, וחץ שמצביע.",
  when:"הדגשת מילת מפתח בכותרת ראשית, מחיר, או הבטחה. עובד יפה במותגים חמים ואנושיים. אחד או שניים בעמוד, לא יותר.",
  libs:["gsap","ScrollTrigger","DrawSVGPlugin"],
  css:`.hd-wrap{max-width:22ch;margin-inline:auto;text-align:center;font-size:clamp(30px,3.6vw,62px);font-weight:800;line-height:1.4}
.hd-mark{position:relative;display:inline-block;white-space:nowrap}
.hd-mark svg{position:absolute;inset-inline:-6%;bottom:-.28em;width:112%;height:.42em;overflow:visible;pointer-events:none}
.hd-mark.circle svg{inset:-22% -10%;width:120%;height:150%;bottom:auto}
.hd-mark path{fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}
.hd-mark.warm path{stroke:#e8590c}
.hd-arrow{display:block;width:min(240px,50vw);height:70px;margin:26px auto 0;overflow:visible}
.hd-arrow path{fill:none;stroke:var(--muted);stroke-width:3;stroke-linecap:round;vector-effect:non-scaling-stroke}
.hd-note{text-align:center;font-size:16px;font-weight:500;color:var(--muted);margin-top:6px}`,
  html:`<div class="stage"><p class="hd-wrap">בונים לך אתר שגם <span class="hd-mark"><span>נראה טוב</span>
<svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M296,17 C250,25 190,7 140,14 C96,20 44,10 6,19"/></svg>
</span> וגם מביא לקוחות.</p></div>
<div class="stage"><p class="hd-wrap">המחיר מתחיל ב<span class="hd-mark circle warm"><span>2,900</span>
<svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true"><path d="M262,26 C226,6 96,2 46,22 C-4,44 6,92 62,106 C132,122 268,112 288,80 C300,58 286,34 250,22"/></svg>
</span> ש"ח בלבד.</p>
<svg class="hd-arrow" viewBox="0 0 240 70" aria-hidden="true"><path d="M228,10 C196,44 150,60 96,58 M96,58 L118,40 M96,58 L120,66"/></svg>
<p class="hd-note">גם החץ מצויר ביד</p></div>`,
  js:`gsap.utils.toArray(".hd-mark svg path, .hd-arrow path").forEach(p=>{
  gsap.fromTo(p,{drawSVG:"0% 0%"},{drawSVG:"0% 100%",duration:.75,ease:"power2.inOut",
    scrollTrigger:{trigger:p.closest(".stage"),start:"top 62%",toggleActions:"play none none none"}});
});`,
  note:"הקו מצויר מהקצה הימני של ה-path שמאלה, ככיוון הקריאה בעברית. באתר אנגלי הופכים את סדר הנקודות ב-d. הסוד לתחושת יד: לא להשתמש בקו ישר, אלא בעקומה עם שתי נקודות בקרה שסוטות מעט למעלה ולמטה, ו-stroke-linecap עגול. ה-SVG מסומן aria-hidden כי הוא קישוט בלבד."
},
];
