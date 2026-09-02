// CSS24: הדגשת מרקר. השראה: המילים המודגשות בעמוד הבית של gsap.com. CSS בלבד.
export default [
{
  id:"css24", cat:"css", name:"מרקר שנמתח מאחורי מילה", tech:"CSS · scroll-driven", status:"ממתין",
  desc:"מילה שמקבלת פס צבע מאחוריה, נמתח מימין לשמאל בזמן שהיא נכנסת למסך. בלי JS: הרקע הוא גרדיאנט שגדל, והתזמון מגיע מ-animation-timeline של הגלילה.",
  when:"הדגשת מילת מפתח במשפט פתיחה, ציטוט, הבטחה מרכזית. אחת או שתיים בעמוד, אחרת זה הופך לצבע ולא להדגשה.",
  libs:[],
  css:`.mk-wrap{max-width:24ch;margin-inline:auto;font-size:clamp(28px,3.4vw,58px);font-weight:800;line-height:1.35;text-align:center}
.mk{
  background-image:linear-gradient(var(--mk,#d9ff5c),var(--mk,#d9ff5c));
  background-repeat:no-repeat;
  background-position:right 0.06em center;
  background-size:0% 62%;
  padding-inline:.12em;
  box-decoration-break:clone;-webkit-box-decoration-break:clone;
}
.mk--ink{--mk:#c9c6ff}
@supports (animation-timeline: view()){
  .mk{animation:mk-grow linear both;animation-timeline:view();animation-range:entry 25% cover 42%}
}
@supports not (animation-timeline: view()){
  .mk{background-size:100% 62%}
}
@keyframes mk-grow{from{background-size:0% 62%}to{background-size:100% 62%}}
@media (prefers-reduced-motion: reduce){.mk{animation:none;background-size:100% 62%}}
.mk-hover{margin-top:18px;font-size:17px;font-weight:500;color:var(--muted);text-align:center}
.mk-hover b{font-weight:700;color:var(--ink);background-image:linear-gradient(#ffd6e7,#ffd6e7);background-repeat:no-repeat;background-position:right center;background-size:0% 58%;transition:background-size .45s cubic-bezier(.2,.8,.2,1);padding-inline:.1em}
.mk-hover:hover b{background-size:100% 58%}`,
  html:`<div class="stage"><p class="mk-wrap">אנחנו לא מוכרים אתר. אנחנו מוכרים <span class="mk">תוצאה שאפשר למדוד</span> בסוף החודש.</p></div>
<div class="stage"><p class="mk-wrap">כל פרויקט מתחיל ב<span class="mk mk--ink">אפיון</span>, לא בעיצוב.</p>
<p class="mk-hover">יש גם וריאנט הובר: העבר עכבר על <b>המילה הזאת</b> ותראה.</p></div>`,
  js:"",
  note:"ה-background-position הוא right כדי שהמרקר יימתח מימין לשמאל, ככיוון הקריאה בעברית; באתר אנגלי משנים ל-left. box-decoration-break: clone שומר שהפס יעבוד נכון גם כשהמילה נשברת לשתי שורות. בדפדפן בלי תמיכה בגלילה כטיימליין ההדגשה פשוט מוצגת מלאה."
},
];
