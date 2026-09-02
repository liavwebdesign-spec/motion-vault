// גל שני מ-madewithgsap (2.9.2026): קשת טקסט. שחזור התנהגות בלבד, מאפס.
export default [
{
  id:"g39", cat:"gsap", name:"טקסט מתעקל על קשת בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"משפט שמתחיל כשורה ישרה ומתעקל לקשת ככל שגוללים: כל תו מסתובב סביב ציר רחוק מתחת לשורה, כך שהמילים מתעגלות סביב מרכז דמיוני ולא רק זזות.",
  when:"רגע דקורטיבי אחד בעמוד: מעל סקשן הטבות, סביב תמונה עגולה, לפני ה-CTA. משפט קצר בלבד. הטקסט הנגיש נשמר ב-aria-label.",
  libs:["gsap","ScrollTrigger"],
  css:`html,body{overflow-x:clip}
.arc-t{height:100vh;display:grid;place-items:center;background:#fff;border-block:1px solid var(--line);overflow:hidden}
.arc-line{font-size:clamp(30px,5.2vw,86px);font-weight:800;white-space:nowrap;direction:rtl;will-change:transform}
.arc-line .ch{display:inline-block;transform-origin:50% 620px;will-change:transform}
.arc-hint{position:absolute;bottom:24px;inset-inline:0;text-align:center;font-size:13px;color:var(--muted)}`,
  html:`<div class="arc-t">
  <div class="arc-line" aria-label="עיצוב שנראה טוב גם כשעוצמים עיניים"><span aria-hidden="true">עיצוב שנראה טוב גם כשעוצמים עיניים</span></div>
  <p class="arc-hint">גלול והשורה מתעקלת</p>
</div>`,
  js:`(function(){
  const line=document.querySelector(".arc-line"),src=line.querySelector("span");
  // פיצול ידני לתווים: שומר על סדר RTL ועל רווחים, בלי להישען על SplitText
  const text=src.textContent;
  src.textContent="";
  const chars=[...text].map(c=>{
    const s=document.createElement("span");
    s.className="ch";
    s.textContent=c===" "?"\\u00a0":c;
    src.appendChild(s);
    return s;
  });
  const mid=(chars.length-1)/2;
  const MAX=1.55; // מעלות לכל תו בקצה הקשת
  gsap.set(chars,{rotation:0});
  gsap.to(chars,{
    rotation:i=>(i-mid)*MAX,
    y:i=>Math.abs(i-mid)*1.1,
    ease:"none",
    scrollTrigger:{trigger:".arc-t",start:"top bottom",end:"bottom top",scrub:1}
  });
})();`,
  note:"בעברית תווים אינם מחוברים זה לזה, ולכן פיצול לתווים בטוח כאן. הפיצול נעשה ידנית ולא ב-SplitText כדי לא להסתכן בהיפוך סדר ב-RTL, והמשפט המקורי נשמר ב-aria-label לקוראי מסך."
},
];
