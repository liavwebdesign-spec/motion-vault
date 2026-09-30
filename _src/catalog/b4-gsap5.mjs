// גל שני מ-madewithgsap (2.9.2026): קשת טקסט. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g39", cat:"gsap", name:"טקסט מתעקל על קשת בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"משפט שמתחיל כשורה ישרה ומתעקל לקשת ככל שגוללים: כל תו מסתובב סביב ציר רחוק מתחת לשורה, כך שהמילים מתעגלות סביב מרכז דמיוני ולא רק זזות.",
  when:"רגע דקורטיבי אחד בעמוד: מעל סקשן הטבות, סביב תמונה עגולה, לפני ה-CTA. משפט קצר בלבד. המשפט המלא נשמר בטקסט נסתר לקוראי מסך.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.arc-t{position:relative;height:100vh;display:grid;place-items:center;background:var(--bg);border-block:1px solid var(--line);overflow:hidden}
.arc-line{position:relative;margin:0;font-size:clamp(22px,5.2vw,86px);font-weight:800;white-space:nowrap;direction:rtl}
.arc-line .ch{display:inline-block;will-change:transform}
.arc-hint{position:absolute;bottom:24px;inset-inline:0;margin:0;text-align:center;font-size:13px;color:var(--muted)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}`,
  html:`<div class="arc-t">
  <p class="arc-line"><span class="sr-only">עיצוב שנראה טוב גם כשעוצמים עיניים</span><span aria-hidden="true">עיצוב שנראה טוב גם כשעוצמים עיניים</span></p>
  <p class="arc-hint">גלול והשורה מתעקלת</p>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;
  const line=document.querySelector(".arc-line"),src=line.querySelector("span[aria-hidden]");
  const text=src.textContent;
  const ANG=25*Math.PI/180;   // הזווית של התו הקיצוני בסוף הקשת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    // פיצול ידני לתווים: שומר על סדר RTL ועל רווחים, בלי להישען על SplitText
    src.textContent="";
    const chars=[...text].map(c=>{
      const s=document.createElement("span");
      s.className="ch";
      s.textContent=c===" "?"\\u00a0":c;
      src.appendChild(s);
      return s;
    });
    // R: רדיוס הקשת. D: המרחק האופקי של מרכז כל תו ממרכז השורה, נמדד מהפריסה ולא מסדר ה-DOM,
    // ולכן אותו קוד עובד בעברית ובאנגלית בלי להפוך סימן.
    let R=1,D=[];
    const measure=()=>{
      const half=line.offsetWidth/2;
      R=half/ANG;
      D=chars.map(c=>c.offsetLeft+c.offsetWidth/2-half);
      gsap.set(chars,{transformOrigin:"50% "+R+"px"});
    };
    measure();
    gsap.fromTo(chars,{rotation:0,x:0},{
      rotation:i=>D[i]/R*180/Math.PI,
      x:i=>-D[i],
      ease:"none",
      scrollTrigger:{trigger:".arc-t",start:"top bottom",end:"bottom top",scrub:.6,invalidateOnRefresh:true,onRefreshInit:measure}
    });
    return ()=>{src.textContent=text;};
  });
})();`,
  note:"החשבון: כל תו מסתובב סביב נקודה במרחק R מתחתיו, בזווית של המרחק שלו ממרכז השורה חלקי R, ו-x מחזיר אותו פנימה באותו מרחק, כך שכל התווים נוחתים על אותו מעגל והשורה שומרת על הרוחב שלה. המרחק נמדד מהפריסה, ולכן זה עובד בעברית ובאנגלית בלי להפוך סימן (הגרסה הקודמת לקחה את הסימן מסדר ה-DOM, ובעברית האותיות קרסו זו על זו). בעברית תווים אינם מחוברים זה לזה, ולכן פיצול לתווים בטוח כאן. הפיצול נעשה ידנית ולא ב-SplitText כדי לא להסתכן בהיפוך סדר ב-RTL, והמשפט המקורי נשמר בטקסט נסתר (sr-only) לקוראי מסך, כי aria-label על div בלי role לא נקרא. בהפחתת תנועה השורה נשארת ישרה."
},
];
