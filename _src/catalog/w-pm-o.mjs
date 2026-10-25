// מהלכי ממשק ותהליך, חלק שני, מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. כאן שמונה מהלכים של ממשק דוגמה: חלון טרמינל שמקליד, אתר בתוך חלון דפדפן,
// ידיות בחירה על תמונה, מקלדת שמקישה, סורק ימי שבוע, כתובת שמצטמצמת, חלון סריקה על רשת, וקשקוש שמוחק אובייקט.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
export default [
{
  id:"g244", cat:"gsap", name:"חלון טרמינל שמקליד פלט", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"חלון כהה עם שלוש נקודות בכותרת. שורת הפקודה מוקלדת תו אחרי תו עם סמן שנע אחרי התו האחרון, ומתחתיה שלוש שורות תוצאה שנכתבות מהר יותר, כל אחת עם סימן וי שקופץ לפניה. כשהשורה נגמרת המספרים והמילים החשובות בה נצבעים, ובסוף מגיעה שורת סיכום עם הזמן שלקח.",
  when:"שירות שמריץ משהו מאחורי הקלעים ויכול להראות את זה בשלוש שורות: אוטומציה, סנכרון הזמנות, גיבוי, מערכת חשבוניות, חיבור בין כלים. מתאים לסקשן ״איך זה עובד״ או להוכחה שהשירות באמת עושה את העבודה. לא לשירות שאין לו תוצאה שאפשר למנות: שורות של יומן עבודה בלי מספר אמיתי נראות מוזרות.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר טכני בגלריה של prompt-motion.com (21.10.2026), שבהם חלון טרמינל מקליד פקודה ומציג מתחתיה פלט עם סימני וי ושורת תוצאה. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** כל השורות כתובות והמילים החשובות צבועות. רק כשיש GSAP ואין הפחתת תנועה הסקריפט עוטף כל תו בספאן, מסתיר אותם, וחושף אותם בזה אחר זה בטיימליין אחד שרץ פעם אחת כשהחלון נכנס למסך; בניקוי הוא מחזיר את ה-HTML המקורי של כל שורה. הסמן הוא ספאן אחד שעובר ממקום למקום, ולכן הוא תמיד צמוד לתו האחרון. **החלון כהה בכוונה** (`--ink` כרקע ו-`--bg` לטקסט), והמילים הצבועות משתמשות ב-`--accent` עם `--accent-ink`, כך שהניגודיות נשמרת בכל עור. הכול `aria-hidden`, ומתחתיו טקסט לקוראי מסך עם תוכן היומן. **RTL:** השורות נכתבות מימין לשמאל והסמן נשאר צמוד לתו האחרון, ולכן באתר LTR אין מה להפוך; מחליפים רק את תוכן השורות. בטלפון העמודות הופכות לעמודה אחת ושורות הפלט קצרות כדי שלא ייחתכו.",
  libs:["gsap","ScrollTrigger"],
  css:`.tm{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.tm .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.tm-txt{display:grid;gap:14px;max-width:36ch}
.tm-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.tm-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.tm-win{justify-self:center;box-sizing:border-box;width:min(640px,100%);overflow:hidden;border-radius:18px;background:var(--ink);color:var(--bg);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 55%,transparent)}
.tm-bar{display:flex;align-items:center;gap:8px;padding:14px 18px;background:color-mix(in srgb,var(--bg) 9%,var(--ink))}
.tm-bar i{width:10px;height:10px;border-radius:50%;background:color-mix(in srgb,var(--bg) 30%,var(--ink))}
.tm-ttl{margin-inline-start:12px;font-size:13px;color:color-mix(in srgb,var(--bg) 62%,var(--ink))}
.tm-body{display:grid;gap:12px;padding:24px 24px 28px;font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;font-size:clamp(14px,1.3vw,16px);line-height:1.5}
.tm-ln{display:flex;align-items:center;gap:12px;min-height:24px;white-space:nowrap}
.tm-pr{flex:none;color:color-mix(in srgb,var(--bg) 55%,var(--ink))}
.tm-ck{flex:none;display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--accent)}
.tm-ck svg{width:11px;height:11px;fill:none;stroke:var(--accent-ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.tm-t{white-space:pre}
.tm-k{display:inline-block;padding:0 6px;border-radius:4px;transition:background-color .3s cubic-bezier(.2,.6,.2,1),color .3s cubic-bezier(.2,.6,.2,1)}
.tm-k.is-hot{background:var(--accent);color:var(--accent-ink)}
.tm-end{margin-top:8px;font-size:1.1em;font-weight:700}
.tm-caret{display:inline-block;width:8px;height:1.2em;vertical-align:text-bottom;background:var(--bg);animation:tm-blink 1s steps(1) infinite}
@keyframes tm-blink{50%{opacity:0}}
@media(max-width:767px){.tm{grid-template-columns:minmax(0,1fr)}.tm-txt{max-width:none}.tm-body{padding:20px 16px 24px}}`,
  html:`<div class="stage"><div class="tm">
  <div class="tm-txt"><h3>הזמנות חדשות מסתדרות לבד</h3><p>בכל בוקר המערכת מושכת את ההזמנות מהחנות, מוציאה חשבוניות ושולחת ללקוחות אישור. ככה זה נראה ביומן העבודה, שורה אחרי שורה.</p></div>
  <div class="tm-win" aria-hidden="true">
    <div class="tm-bar"><i></i><i></i><i></i><span class="tm-ttl">סנכרון בוקר</span></div>
    <div class="tm-body">
      <div class="tm-ln"><span class="tm-pr">$</span><span class="tm-t">סנכרון הזמנות מהחנות</span></div>
      <div class="tm-ln"><span class="tm-ck"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="tm-t">נמצאו <span class="tm-k is-hot">12</span> הזמנות חדשות</span></div>
      <div class="tm-ln"><span class="tm-ck"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="tm-t">הופקו <span class="tm-k is-hot">12</span> חשבוניות</span></div>
      <div class="tm-ln"><span class="tm-ck"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="tm-t">נשלחו אישורים ל-<span class="tm-k is-hot">12 לקוחות</span></span></div>
      <div class="tm-ln tm-end"><span class="tm-t">הסנכרון הסתיים תוך <span class="tm-k is-hot">4 שניות</span></span></div>
    </div>
  </div>
  <span class="sr-only">יומן העבודה: נמצאו 12 הזמנות חדשות, הופקו 12 חשבוניות, נשלחו אישורים ל-12 לקוחות והסנכרון הסתיים תוך 4 שניות.</span>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: כל השורות כתובות והמילים החשובות צבועות (במארקאפ)
  const root=document.querySelector(".tm"),lines=[...root.querySelectorAll(".tm-ln")];
  const saved=lines.map(l=>l.innerHTML);
  // כל תו הופך לספאן, כדי לחשוף אותם אחד אחרי השני גם כשבתוך השורה יש מילים צבועות
  const split=el=>{
    const out=[];
    const walk=node=>[...node.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const f=document.createDocumentFragment();
        [...n.textContent].forEach(ch=>{const s=document.createElement("span");s.textContent=ch;f.appendChild(s);out.push(s);});
        n.replaceWith(f);
      }else if(n.nodeType===1)walk(n);
    });
    walk(el);return out;
  };
  // בהפחתת תנועה הפונקציה לא רצה, והחלון נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const caret=document.createElement("span");caret.className="tm-caret";caret.style.opacity=0;
    const rows=lines.map(l=>{const t=l.querySelector(".tm-t");return{t,ck:l.querySelector(".tm-ck"),keys:[...t.querySelectorAll(".tm-k")],chars:split(t)};});
    rows.forEach(r=>{
      r.chars.forEach(c=>{c.style.opacity=0;});
      r.keys.forEach(k=>k.classList.remove("is-hot"));
      if(r.ck)gsap.set(r.ck,{opacity:0,scale:.5});
    });
    rows[0].t.prepend(caret);
    const tl=gsap.timeline({paused:true});
    // הקלדה של שורה: n עולה מ-0 למספר התווים, והסמן נצמד לתו האחרון שנחשף
    const typeLine=(r,per)=>{
      const o={n:0};let shown=0;
      tl.call(()=>{r.t.prepend(caret);caret.style.opacity=1;},null,">");
      tl.to(o,{n:r.chars.length,duration:r.chars.length*per,ease:"none",onUpdate:()=>{
        const k=Math.round(o.n);if(k===shown)return;
        for(let i=shown;i<k;i++)r.chars[i].style.opacity=1;
        shown=k;r.chars[k-1].after(caret);
      }},">");
      tl.call(()=>r.keys.forEach(k=>k.classList.add("is-hot")),null,">");
    };
    tl.to({},{duration:.3});
    typeLine(rows[0],.055);
    rows.slice(1).forEach((r,i)=>{
      if(r.ck)tl.to(r.ck,{opacity:1,scale:1,duration:.25,ease:"power2.out"},">+=.35");
      typeLine(r,i<3?.026:.032);
    });
    tl.call(()=>caret.remove(),null,">+=1");
    const st=ScrollTrigger.create({trigger:root,start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();caret.remove();lines.forEach((l,i)=>{l.innerHTML=saved[i];});};
  });
})();`
},
{
  id:"g245", cat:"gsap", name:"אתר בתוך חלון דפדפן שעובר בין עמודים", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"חלון דפדפן עם שורת כתובת, ובתוכו אתר של מאפייה. העמוד גולל לאט כלפי מטה, ואז מתחלף לעמוד הבא שעולה מלמטה, וכתובת האתר למעלה מתעדכנת בכל מעבר: דף הבית, התפריט, ובסוף טופס הזמנה. כל זה קורה בזמן הגלילה, ואפשר לעצור באמצע ולחזור אחורה.",
  when:"סקשן שמראה את האתר או המוצר של הלקוח כמו שהוא נראה: תיק עבודות של סטודיו, הצגת מערכת הזמנות, דוגמה לאתר שנבנה, הסבר על שלושה עמודים שהשירות כולל. כדאי שיהיו שלושה עד ארבעה מסכים אמיתיים של אתר אחד. לא לאתר שאין לו מה להראות בפנים: חלון דפדפן ריק רק מסתיר את העמוד.",
  note:"**שחזור.** השראה: כמה סרטוני הצגת אתרים בגלריה של prompt-motion.com (21.10.2026), שבהם אתר עומד בתוך חלון דפדפן, גולל, ומתחלף בין מסכים. נבנה מאפס מהצפייה. **המארקאפ הוא מצב ההתחלה:** המסך הראשון במנוחה והשניים האחרים מוסתרים. `is-live` מתווסף רק ב-JS ומפעיל את הקטע הדביק (`.bf-run` גבוה, `.bf-pin` דביק), כך שבלי GSAP העמוד קצר ונקרא. **הציר:** כל מסך גולל בתוך החלון בהזזת `.bf-page` (המרחק נמדד מהגובה האמיתי ומחושב מחדש בכל רענון), והמעבר בין מסכים הוא התעמעמות עם עלייה קלה. טקסט הכתובת נגזר מזמן הציר בלבד, ולכן נכון גם בגלילה אחורה. **הכתובת היא התווית של הצעד,** ואין תווית נפרדת. שורת הכתובת וחלון הדפדפן הם `direction:ltr` כמו בדפדפן אמיתי, והאתר שבפנים יורש RTL. התמונות הן תמונות אמיתיות מהמאגר עם `loading=lazy` וגדלים מפורשים. הדמו כולו `aria-hidden`. בטלפון הטקסט עובר מעל החלון וגובה החלון קטן. החלפה לאתר LTR: אין מה להפוך.",
  libs:["gsap","ScrollTrigger"],
  css:`.bf{max-width:1160px;margin-inline:auto}
.bf .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.bf-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.8fr);align-content:center;align-items:center;column-gap:clamp(32px,6vw,96px);row-gap:24px}
.bf-txt{display:grid;gap:14px;max-width:34ch}
.bf-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.bf-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.bf-win{justify-self:center;box-sizing:border-box;width:min(740px,100%);overflow:hidden;border:1px solid var(--line);border-radius:16px;background:var(--card);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.bf-bar{direction:ltr;display:flex;align-items:center;gap:8px;padding:12px 16px;background:color-mix(in srgb,var(--ink) 5%,var(--card))}
.bf-bar i{flex:none;width:10px;height:10px;border-radius:50%;background:var(--line)}
.bf-url{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;min-width:0;min-height:28px;margin-inline:12px;padding:0 12px;overflow:hidden;border-radius:999px;background:var(--bg);color:var(--muted);font-size:12px;white-space:nowrap}
.bf-url svg{flex:none;width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.bf-view{position:relative;height:clamp(320px,38vw,440px);overflow:hidden;background:var(--bg)}
.bf-scr{position:absolute;inset:0;overflow:hidden}
.bf-scr+.bf-scr{opacity:0;visibility:hidden}
.bf-page{display:grid;gap:20px;align-content:start;padding:16px 20px 28px}
.bf-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:12px}
.bf-logo{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:700}
.bf-logo i{width:18px;height:18px;border-radius:50%;background:var(--accent)}
.bf-lk{display:flex;gap:16px;color:var(--muted)}
.bf-hero{position:relative;overflow:hidden;border-radius:12px;aspect-ratio:2/1}
.bf-hero img{display:block;width:100%;height:100%;object-fit:cover}
.bf-cap{position:absolute;inset-inline-start:12px;inset-block-end:12px;display:grid;gap:8px;justify-items:start;padding:12px 14px;border-radius:10px;background:var(--card);font-size:14px}
.bf-btn{display:grid;place-items:center;min-height:32px;padding:0 14px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:700}
.bf-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.bf-card{display:grid;gap:6px;font-size:12px}
.bf-card img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:10px}
.bf-card span{color:var(--muted)}
.bf-info{display:grid;gap:6px;padding:14px 16px;border:1px solid var(--line);border-radius:12px;background:var(--card);font-size:12px}
.bf-info span{color:var(--muted)}
.bf-h{margin:0;font-size:18px;line-height:1.2}
.bf-item{display:grid;grid-template-columns:56px minmax(0,1fr) auto;align-items:center;gap:12px;padding:10px;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.bf-item img{display:block;width:56px;height:56px;object-fit:cover;border-radius:8px}
.bf-item b{display:block;font-size:13px}
.bf-item small{display:block;margin-top:4px;color:var(--muted);font-size:12px}
.bf-price{padding:4px 10px;border-radius:999px;background:color-mix(in srgb,var(--accent) 14%,var(--card));font-size:12px;font-weight:700}
.bf-ban{display:block;width:100%;height:auto;aspect-ratio:3/1;object-fit:cover;object-position:50% 20%;border-radius:12px}
.bf-fld{display:grid;gap:4px;font-size:12px;color:var(--muted)}
.bf-in{display:flex;align-items:center;min-height:36px;padding:0 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font-size:13px}
.bf-sum{display:flex;justify-content:space-between;gap:12px;font-size:13px}
.bf-sum b{font-variant-numeric:tabular-nums}
.bf-send{min-height:40px;font-size:13px;border-radius:10px}
.bf.is-live .bf-run{height:360vh}
.bf.is-live .bf-pin{position:sticky;top:0;min-height:100vh;min-height:100svh}
@media(max-width:767px){.bf-pin{grid-template-columns:minmax(0,1fr)}.bf-txt{max-width:none}.bf-view{height:320px}.bf-page{padding:12px 14px 24px}.bf-lk{gap:12px}}`,
  html:`<div class="stage"><div class="bf"><div class="bf-run"><div class="bf-pin">
  <div class="bf-txt"><h3>שלושה עמודים בחלון אחד</h3><p>בזמן שגוללים, החלון עובר מדף הבית אל התפריט ואחר כך אל טופס ההזמנה, וכתובת האתר למעלה מתעדכנת בכל מעבר.</p><span class="sr-only">באתר הדוגמה שלושה עמודים: דף הבית, התפריט וטופס הזמנה לאיסוף.</span></div>
  <div class="bf-win" aria-hidden="true">
    <div class="bf-bar"><i></i><i></i><i></i><span class="bf-url"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span class="bf-path">harechov.co.il</span></span></div>
    <div class="bf-view">
      <div class="bf-scr"><div class="bf-page">
        <div class="bf-nav"><span class="bf-logo"><i></i>מאפיית הרחוב</span><span class="bf-lk"><span>תפריט</span><span>הזמנות</span><span>אודות</span></span></div>
        <div class="bf-hero"><img src="../assets/media/real/s14/hero-bread.webp" width="1600" height="1333" alt="" loading="lazy" decoding="async"><div class="bf-cap"><b>לחם שנאפה הבוקר</b><span class="bf-btn">להזמנה</span></div></div>
        <div class="bf-cards">
          <div class="bf-card"><img src="../assets/media/real/s14/croissants.webp" width="1250" height="1000" alt="" loading="lazy" decoding="async"><b>קרואסון חמאה</b><span>14 ש״ח</span></div>
          <div class="bf-card"><img src="../assets/media/real/s14/baker-hands.webp" width="1100" height="1320" alt="" loading="lazy" decoding="async"><b>לחמניות שמרים</b><span>6 ש״ח</span></div>
          <div class="bf-card"><img src="../assets/media/real/s14/cafe-window.webp" width="1400" height="1050" alt="" loading="lazy" decoding="async"><b>ישיבה בפנים</b><span>עד 24 מקומות</span></div>
        </div>
        <div class="bf-info"><b>שעות פתיחה</b><span>ראשון עד חמישי, 6:30 עד 18:00</span><span>שישי, 6:30 עד 14:00</span></div>
      </div></div>
      <div class="bf-scr"><div class="bf-page">
        <div class="bf-nav"><span class="bf-logo"><i></i>מאפיית הרחוב</span><span class="bf-lk"><span>תפריט</span><span>הזמנות</span><span>אודות</span></span></div>
        <h4 class="bf-h">התפריט של הבוקר</h4>
        <div class="bf-item"><img src="../assets/media/real/s14/hero-bread.webp" width="1600" height="1333" alt="" loading="lazy" decoding="async"><span><b>לחם מחמצת</b><small>אפייה איטית, קרום פריך</small></span><span class="bf-price">28 ש״ח</span></div>
        <div class="bf-item"><img src="../assets/media/real/s14/croissants.webp" width="1250" height="1000" alt="" loading="lazy" decoding="async"><span><b>קרואסון חמאה</b><small>שכבות דקות, יוצא מהתנור בשבע</small></span><span class="bf-price">14 ש״ח</span></div>
        <div class="bf-item"><img src="../assets/media/real/s14/baker-hands.webp" width="1100" height="1320" alt="" loading="lazy" decoding="async"><span><b>לחמניות שמרים</b><small>בצק שנילוש בבוקר</small></span><span class="bf-price">6 ש״ח</span></div>
        <div class="bf-item"><img src="../assets/media/real/s14/croissants.webp" width="1250" height="1000" alt="" loading="lazy" decoding="async" style="object-position:80% 20%"><span><b>קפה ומאפה</b><small>קפה הפוך וקרואסון</small></span><span class="bf-price">22 ש״ח</span></div>
        <div class="bf-item"><img src="../assets/media/real/s14/cafe-window.webp" width="1400" height="1050" alt="" loading="lazy" decoding="async"><span><b>ארוחת בוקר בפנים</b><small>עד 24 מקומות ליד החלון</small></span><span class="bf-price">48 ש״ח</span></div>
      </div></div>
      <div class="bf-scr"><div class="bf-page">
        <div class="bf-nav"><span class="bf-logo"><i></i>מאפיית הרחוב</span><span class="bf-lk"><span>תפריט</span><span>הזמנות</span><span>אודות</span></span></div>
        <img class="bf-ban" src="../assets/media/real/s14/baker-hands.webp" width="1100" height="1320" alt="" loading="lazy" decoding="async">
        <h4 class="bf-h">הזמנה לאיסוף</h4>
        <div class="bf-fld">שם מלא<span class="bf-in">דנה לוי</span></div>
        <div class="bf-fld">שעת איסוף<span class="bf-in">מחר, 8:30</span></div>
        <div class="bf-fld">מה להזמין<span class="bf-in">לחם מחמצת ושני קרואסונים</span></div>
        <div class="bf-sum"><span>סה״כ לתשלום באיסוף</span><b>56 ש״ח</b></div>
        <span class="bf-btn bf-send">שליחת ההזמנה</span>
      </div></div>
    </div>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: המסך הראשון במנוחה והעמוד קצר (במארקאפ)
  const root=document.querySelector(".bf"),run=root.querySelector(".bf-run"),view=root.querySelector(".bf-view"),
    scr=[...root.querySelectorAll(".bf-scr")],pages=scr.map(s=>s.querySelector(".bf-page")),path=root.querySelector(".bf-path");
  const urls=["harechov.co.il","harechov.co.il/menu","harechov.co.il/order"];
  // זמני המעבר בציר: הכתובת נגזרת מהזמן בלבד, ולכן נכונה גם בגלילה אחורה
  const swapAt=[3.2,6.1],D=9;
  let cur=0;
  const paint=t=>{
    const i=t>=swapAt[1]?2:t>=swapAt[0]?1:0;
    if(i===cur)return;
    cur=i;path.textContent=urls[i];
    gsap.fromTo(path,{opacity:0,y:4},{opacity:1,y:0,duration:.25,ease:"power2.out",overwrite:true});
  };
  // בהפחתת תנועה לא רצים, והחלון נשאר במצב ההתחלה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const max=i=>()=>-Math.max(0,pages[i].offsetHeight-view.clientHeight);
    const tl=gsap.timeline({defaults:{ease:"power1.inOut"},scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    tl.to(pages[0],{y:max(0),duration:2},.5);
    tl.to(scr[0],{autoAlpha:0,y:-16,duration:.6,ease:"power2.in"},2.9);
    tl.fromTo(scr[1],{autoAlpha:0,y:32},{autoAlpha:1,y:0,duration:.6,ease:"power2.out"},3.0);
    tl.to(pages[1],{y:max(1),duration:1.6},3.8);
    tl.to(scr[1],{autoAlpha:0,y:-16,duration:.6,ease:"power2.in"},5.8);
    tl.fromTo(scr[2],{autoAlpha:0,y:32},{autoAlpha:1,y:0,duration:.6,ease:"power2.out"},5.9);
    tl.to(pages[2],{y:max(2),duration:1.4},6.8);
    tl.set({},{},D);                          // רגע מנוחה בסוף
    tl.eventCallback("onUpdate",()=>paint(tl.time()));
    return()=>{tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");gsap.killTweensOf(path);
      gsap.set([...scr,...pages,path],{clearProps:"all"});cur=0;path.textContent=urls[0];};
  });
})();`
},
{
  id:"g246", cat:"gsap", name:"ידיות בחירה שמותחות ומסובבות תמונה", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"תמונה על לוח עבודה, סביבה מסגרת בחירה עם שמונה ידיות ועם ידית סיבוב מעליה. סמן קטן תופס את הפינה ומותח את התמונה עד הגודל המלא, ואז תופס את ידית הסיבוב ומטה אותה בכמה מעלות. תווית המידות מתחת לתמונה ולוח הנתונים בפינה מתעדכנים בזמן אמת.",
  when:"שירות שקשור לעיצוב, צילום או עריכה: סטודיו קריאייטיב, צילום מוצר, עיצוב מודעות, בניית אתרים. אפשר להראות כך ״מתאימים לכם את התמונה למקום״ בלי לצלם מסך של תוכנה אמיתית. מתאים לראש עמוד או לסקשן ״איך אנחנו עובדים״. לא לעסק שאין לו עריכה של תמונות: ידיות בחירה בלי עבודה מאחוריהן נראות כקישוט.",
  note:"**שחזור.** השראה: כמה סרטוני עיצוב ותנועה בגלריה של prompt-motion.com (21.10.2026), שבהם צורה עומדת בתוך תיבת בחירה של תוכנת עיצוב עם ידיות ותווית זווית, ומסתובבת ומשתנה בגודל. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** התמונה בגודל המלא ומוטה ב-6 מעלות, הידיות במקומן והמידות כתובות. הסקריפט רץ פעם אחת כשהלוח נכנס למסך, ומחזיק אובייקט מצב אחד (גודל וזווית) שממנו נגזרים הגודל, הסיבוב, התוויות ומיקום הסמן. **הידיות לא גדלות עם התמונה:** הגודל משתנה ב-`width` (עם `aspect-ratio`), לא ב-`scale`, ולכן הידיות נשארות 10 פיקסלים. מיקום הסמן מחושב מהפינה אחרי סיבוב, כך שהוא נשאר על הידית. תווית המידות מסתובבת הפוך כדי להישאר ישרה. הזוויות המוצגות חיוביות. התמונה היא תמונה אמיתית מהמאגר. הלוח `aria-hidden`, ובטקסט לקוראי מסך נאמר מה הוצג. בטלפון הלוח ממלא את הרוחב והטקסט עובר מעליו. בלי GSAP או בהפחתת תנועה נשאר מצב הסיום. באתר LTR אין מה להפוך, רק את מיקום לוח הנתונים (`inset-inline-start`) שעובר אוטומטית.",
  libs:["gsap","ScrollTrigger"],
  css:`.hx{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.hx .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.hx-txt{display:grid;gap:14px;max-width:36ch}
.hx-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.hx-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hx-board{position:relative;justify-self:center;box-sizing:border-box;width:min(620px,100%);aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);border-radius:20px;background-color:var(--card);background-image:radial-gradient(color-mix(in srgb,var(--ink) 16%,transparent) 1px,transparent 1.5px);background-size:20px 20px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.hx-obj{position:absolute;left:50%;top:50%;width:52%;aspect-ratio:1;transform:translate(-50%,-50%) rotate(6deg)}
.hx-img{display:block;width:100%;height:100%;object-fit:cover;box-shadow:0 18px 40px -20px color-mix(in srgb,var(--ink) 50%,transparent)}
.hx-box{position:absolute;inset:0;border:1.5px solid var(--accent);pointer-events:none}
.hx-h{position:absolute;box-sizing:border-box;width:10px;height:10px;border:1.5px solid var(--accent);background:var(--card);transform:translate(-50%,-50%)}
.hx-tl{left:0;top:0}.hx-tm{left:50%;top:0}.hx-tr{left:100%;top:0}
.hx-ml{left:0;top:50%}.hx-mr{left:100%;top:50%}
.hx-bl{left:0;top:100%}.hx-bm{left:50%;top:100%}.hx-br{left:100%;top:100%}
.hx-stem{position:absolute;left:50%;top:0;width:1.5px;height:30px;background:var(--accent);transform:translate(-50%,-100%)}
.hx-rot{position:absolute;left:50%;top:0;box-sizing:border-box;width:12px;height:12px;border:1.5px solid var(--accent);border-radius:50%;background:var(--card);transform:translate(-50%,-36px)}
.hx-size{position:absolute;left:50%;top:100%;transform:translate(-50%,16px) rotate(-6deg)}
.hx-wh{display:block;padding:4px 10px;border-radius:6px;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:600;white-space:nowrap;direction:ltr;font-variant-numeric:tabular-nums}
.hx-rd{position:absolute;inset-block-start:16px;inset-inline-start:16px;display:grid;gap:4px;padding:10px 14px;border-radius:10px;background:var(--bg);color:var(--muted);font-size:12px;line-height:1.3;font-variant-numeric:tabular-nums}
.hx-rd b{color:var(--ink);font-weight:700;unicode-bidi:isolate}
.hx-cur{position:absolute;left:0;top:0;z-index:3;width:0;height:0;pointer-events:none;opacity:0}
.hx-cur svg{position:absolute;left:0;top:0;width:20px;height:26px;overflow:visible;fill:var(--ink);stroke:var(--card);stroke-width:1.5;stroke-linejoin:round;transform-origin:0 0}
@media(max-width:767px){.hx{grid-template-columns:minmax(0,1fr)}.hx-txt{max-width:none}.hx-rd{inset-block-start:12px;inset-inline-start:12px;padding:8px 12px}}`,
  html:`<div class="stage"><div class="hx">
  <div class="hx-txt"><h3>התמונה מתיישבת בגודל ובזווית הנכונים</h3><p>מושכים את הפינה עד שהתמונה ממלאת את המקום, ומסובבים אותה עד שהיא יושבת טוב. המידות והזווית מתעדכנות בזמן שמזיזים.</p><span class="sr-only">בדוגמה התמונה נמתחה לרוחב של 1080 פיקסלים והוטתה בשש מעלות.</span></div>
  <div class="hx-board" aria-hidden="true">
    <div class="hx-obj">
      <img class="hx-img" src="../assets/media/real/s11/magenta-cone.webp" width="1000" height="1000" alt="" loading="lazy" decoding="async">
      <span class="hx-box"></span>
      <span class="hx-stem"></span><span class="hx-rot"></span>
      <span class="hx-h hx-tl"></span><span class="hx-h hx-tm"></span><span class="hx-h hx-tr"></span>
      <span class="hx-h hx-ml"></span><span class="hx-h hx-mr"></span>
      <span class="hx-h hx-bl"></span><span class="hx-h hx-bm"></span><span class="hx-h hx-br"></span>
      <span class="hx-size"><span class="hx-wh">1080 × 1080</span></span>
    </div>
    <span class="hx-rd"><span>זווית <b class="hx-ang">6.0°</b></span><span>רוחב <b class="hx-w">1080</b></span></span>
    <span class="hx-cur"><svg viewBox="0 0 20 26"><path d="M2 2v19l5.2-4.7 3.4 7.7 3.6-1.6-3.4-7.5 7-.5z"/></svg></span>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: התמונה בגודל המלא, מוטה ב-6 מעלות (במארקאפ)
  const root=document.querySelector(".hx"),board=root.querySelector(".hx-board"),obj=root.querySelector(".hx-obj"),
    size=root.querySelector(".hx-size"),wh=root.querySelector(".hx-wh"),angEl=root.querySelector(".hx-ang"),wEl=root.querySelector(".hx-w"),
    cur=root.querySelector(".hx-cur"),arrow=cur.querySelector("svg");
  const FA=6,FW=1080;                       // מצב הסיום: זווית ורוחב
  // בהפחתת תנועה הפונקציה לא רצה, והלוח נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const s={k:.55,a:0};                    // k: החלק מהגודל הסופי, a: הזווית במעלות
    let base=obj.offsetWidth;
    const apply=()=>{
      const w=base*s.k,px=Math.round(FW*s.k);
      obj.style.width=w+"px";
      obj.style.transform="translate(-50%,-50%) rotate("+s.a+"deg)";
      size.style.transform="translate(-50%,16px) rotate("+(-s.a)+"deg)";
      wh.textContent=px+" × "+px;wEl.textContent=px;angEl.textContent=s.a.toFixed(1)+"°";
    };
    // נקודה על התיבה (fx, fy מ-0.5- עד 0.5) ביחס ללוח, אחרי גודל וסיבוב, ועוד הזחה אנכית בפיקסלים
    const pt=(fx,fy,ey)=>{
      const w=base*s.k,th=s.a*Math.PI/180,dx=fx*w,dy=fy*w+ey;
      return{x:board.clientWidth/2+dx*Math.cos(th)-dy*Math.sin(th),y:board.clientHeight/2+dx*Math.sin(th)+dy*Math.cos(th)};
    };
    const follow=(fx,fy,ey)=>()=>{apply();const p=pt(fx,fy,ey);gsap.set(cur,{x:p.x,y:p.y});};
    const aim=(fx,fy,ey)=>({x:()=>pt(fx,fy,ey).x,y:()=>pt(fx,fy,ey).y});
    apply();
    gsap.set(cur,{x:()=>board.clientWidth*.9,y:()=>board.clientHeight*.9,opacity:0});
    const tl=gsap.timeline({paused:true,defaults:{ease:"power2.inOut"}});
    tl.call(()=>{obj.style.width="";base=obj.offsetWidth;apply();},null,0);   // מדידה מחדש ברגע שהלוח נכנס למסך
    tl.to(cur,{opacity:1,duration:.3,ease:"power1.out"},0.05);
    tl.to(cur,{...aim(-.5,.5,0),duration:.8},">+=.2");                          // לפינה התחתונה
    tl.to(arrow,{scale:.85,duration:.1,ease:"power1.out"},">");
    tl.to(s,{k:1,duration:1.4,onUpdate:follow(-.5,.5,0)},">");                  // מתיחה
    tl.to(arrow,{scale:1,duration:.15,ease:"power1.out"},">");
    tl.to(cur,{...aim(0,-.5,-36),duration:.8},">+=.25");                        // לידית הסיבוב
    tl.to(arrow,{scale:.85,duration:.1,ease:"power1.out"},">");
    tl.to(s,{a:FA,duration:1.1,onUpdate:follow(0,-.5,-36)},">");                // סיבוב
    tl.to(arrow,{scale:1,duration:.15,ease:"power1.out"},">");
    tl.to(cur,{opacity:0,duration:.4,ease:"power1.in"},">+=.6");
    const st=ScrollTrigger.create({trigger:board,start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([cur,arrow],{clearProps:"all"});
      obj.style.width="";obj.style.transform="";size.style.transform="";
      wh.textContent=FW+" × "+FW;wEl.textContent=FW;angEl.textContent=FA.toFixed(1)+"°";};
  });
})();`
},
{
  id:"g247", cat:"gsap", name:"מקלדת על המסך שמקישה את ההודעה", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"טלפון עם שיחה פתוחה. מקלדת עברית עולה מתחת לשדה ההודעה, המקשים נלחצים אחד אחרי השני והאותיות מופיעות בשדה בדיוק באותו קצב, והחץ בצד השדה נצבע. בסוף מקש השליחה נדלק ונלחץ, המקלדת יורדת וההודעה נשארת בשיחה כבועה שנשלחה.",
  when:"שירות שמדבר עם לקוחות בצ׳אט או בוואטסאפ: קביעת תורים, תשובות לפניות, מוקד שירות, מענה אוטומטי. מראה שהתשובה לוקחת שנייה ובאה מהטלפון. מתאים לסקשן ״איך זה עובד״ או לראש עמוד של שירות שיחות. לא לשירות שאין בו שיחה: מקלדת שמקישה בלי הודעה אמיתית היא רעש.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו מקלדת עולה מתחת לשדה קטן, מקשים נלחצים בזה אחר זה והטקסט מופיע בשדה, ובסוף המקלדת יורדת. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** המקלדת סגורה (גובה אפס), ההודעה כבר בשיחה כבועה שנשלחה והשדה מציג את הטקסט הריק. כל לחיצה בטיימליין היא שתי קריאות: מקש יורד, והודעה מתעדכנת בשדה (ואחרי תשע מאות אלפיות מקש חוזר), באותה שנייה בדיוק, ולכן המקש והאות לא יכולים לצאת מסנכרון. המרווחים בין לחיצות לא שווים (נגזרים ממיקום האות), כדי שזה לא ירגיש כמו מכונה. **המקלדת היא עברית אמיתית** לפי הפריסה הישראלית, עם `direction:ltr` על המקלדת בלבד כי מקלדת פיזית לא מתהפכת ב-RTL, והטקסט בשדה כותב מימין לשמאל. המקלדת עולה בעזרת טווין של גובה על ה-slot (GSAP), והשיחה נשארת צמודה לתחתית כך שההודעה האחרונה תמיד נראית. הטלפון `aria-hidden`, ובטקסט לקוראי מסך נאמרת ההודעה שנשלחה. התמונה בכותרת היא התמונה האנושית של המאגר. בטלפון הרוחב הוא מלוא הרוחב עד 340 פיקסלים. באתר LTR מחליפים את פריסת המקשים ואת כיוון חץ השליחה.",
  libs:["gsap","ScrollTrigger"],
  css:`.kb{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.kb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.kb-txt{display:grid;gap:14px;max-width:36ch}
.kb-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.kb-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.kb-ph{justify-self:center;box-sizing:border-box;width:min(340px,100%);height:560px;display:grid;grid-template-rows:auto minmax(0,1fr) auto auto;overflow:hidden;border:1px solid var(--line);border-radius:32px;background:var(--bg);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.kb-hd{display:flex;align-items:center;gap:12px;padding:16px 20px;background:color-mix(in srgb,var(--ink) 4%,var(--card))}
.kb-av{flex:none;width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:47% 18%}
.kb-nm{display:grid;gap:4px;font-size:14px;font-weight:700;line-height:1.2}
.kb-nm small{font-size:12px;font-weight:400;color:var(--muted)}
.kb-chat{display:flex;flex-direction:column;justify-content:flex-end;gap:10px;padding:16px;overflow:hidden}
.kb-b{max-width:84%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.45}
.kb-in{align-self:flex-start;background:var(--card);border:1px solid var(--line)}
.kb-out{align-self:flex-end;background:var(--accent);color:var(--accent-ink)}
.kb-cmp{display:flex;align-items:center;gap:10px;padding:12px 16px}
.kb-fld{flex:1;min-width:0;display:flex;align-items:center;min-height:44px;padding:0 16px;border:1.5px solid var(--line);border-radius:999px;background:var(--card);font-size:15px;white-space:nowrap;overflow:hidden;transition:border-color .25s linear}
.kb-fld.is-focus{border-color:var(--accent)}
.kb-pl{color:var(--muted)}
.kb-fld:not(.is-empty) .kb-pl{display:none}
.kb-car{flex:none;width:2px;height:20px;margin-inline-start:2px;background:var(--accent);opacity:0}
.kb-fld.is-focus .kb-car{opacity:1;animation:kb-blink 1s steps(1) infinite}
@keyframes kb-blink{50%{opacity:0}}
.kb-send{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--line);transition:background-color .25s linear}
.kb-send svg{width:20px;height:20px;fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:stroke .25s linear}
.kb-send.is-ready{background:var(--accent)}
.kb-send.is-ready svg{stroke:var(--accent-ink)}
.kb-slot{height:0;overflow:hidden}
.kb-pad{direction:ltr;display:grid;gap:6px;padding:8px 6px 14px;background:color-mix(in srgb,var(--ink) 7%,var(--bg))}
.kb-r{display:flex;gap:4px}
.kb-k{flex:1 1 0;min-width:0;display:grid;place-items:center;min-height:36px;border-radius:6px;background:var(--card);box-shadow:0 1px 0 var(--line);color:var(--ink);font-size:16px;line-height:1;transition:transform .1s linear,background-color .1s linear}
.kb-k svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.kb-k.is-down{transform:translateY(1px) scale(.92);background:color-mix(in srgb,var(--accent) 24%,var(--card))}
.kb-w{flex:1.45 1 0;background:color-mix(in srgb,var(--ink) 10%,var(--card));font-size:13px}
.kb-sp{flex:5 1 0;font-size:13px;color:var(--muted)}
.kb-go{flex:2 1 0;background:color-mix(in srgb,var(--ink) 10%,var(--card));font-size:13px;font-weight:700}
.kb-go.is-hot{background:var(--accent);color:var(--accent-ink)}
@media(max-width:767px){.kb{grid-template-columns:minmax(0,1fr)}.kb-txt{max-width:none}.kb-ph{height:520px}}`,
  html:`<div class="stage"><div class="kb">
  <div class="kb-txt"><h3>תשובה אחת מהטלפון וסגרנו</h3><p>הלקוח כותב את התשובה על המקלדת, ובשליחה השיחה נסגרת על מועד אחד. אפשר לראות כל מקש נלחץ באותו רגע שהאות מופיעה.</p><span class="sr-only">בשיחה נשלחה התשובה: יום שלישי בארבע מתאים לי.</span></div>
  <div class="kb-ph" aria-hidden="true">
    <div class="kb-hd"><img class="kb-av" src="../assets/media/dive/portrait.webp" width="2400" height="1600" alt="" loading="lazy" decoding="async"><span class="kb-nm">קליניקת נועה<small>עונים בדרך כלל תוך דקות</small></span></div>
    <div class="kb-chat">
      <span class="kb-b kb-in">היי דנה, התור שלך נקבע לשבוע הבא. נוח לך יום שלישי או רביעי?</span>
      <span class="kb-b kb-in">יש לנו פנוי ביום שלישי בארבע וביום רביעי בעשר.</span>
      <span class="kb-b kb-out">יום שלישי בארבע מתאים לי</span>
    </div>
    <div class="kb-cmp"><span class="kb-fld is-empty"><span class="kb-pl">כתבו הודעה</span><span class="kb-txt2"></span><span class="kb-car"></span></span><span class="kb-send"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></span></div>
    <div class="kb-slot"><div class="kb-pad">
      <span class="kb-r"><span class="kb-k" data-k="/">/</span><span class="kb-k" data-k="'">'</span><span class="kb-k" data-k="ק">ק</span><span class="kb-k" data-k="ר">ר</span><span class="kb-k" data-k="א">א</span><span class="kb-k" data-k="ט">ט</span><span class="kb-k" data-k="ו">ו</span><span class="kb-k" data-k="ן">ן</span><span class="kb-k" data-k="ם">ם</span><span class="kb-k" data-k="פ">פ</span></span>
      <span class="kb-r"><span class="kb-k" data-k="ש">ש</span><span class="kb-k" data-k="ד">ד</span><span class="kb-k" data-k="ג">ג</span><span class="kb-k" data-k="כ">כ</span><span class="kb-k" data-k="ע">ע</span><span class="kb-k" data-k="י">י</span><span class="kb-k" data-k="ח">ח</span><span class="kb-k" data-k="ל">ל</span><span class="kb-k" data-k="ך">ך</span><span class="kb-k" data-k="ף">ף</span></span>
      <span class="kb-r"><span class="kb-k kb-w"><svg viewBox="0 0 24 24"><path d="M12 5l7 8h-4v6H9v-6H5z"/></svg></span><span class="kb-k" data-k="ז">ז</span><span class="kb-k" data-k="ס">ס</span><span class="kb-k" data-k="ב">ב</span><span class="kb-k" data-k="ה">ה</span><span class="kb-k" data-k="נ">נ</span><span class="kb-k" data-k="מ">מ</span><span class="kb-k" data-k="צ">צ</span><span class="kb-k" data-k="ת">ת</span><span class="kb-k" data-k="ץ">ץ</span><span class="kb-k kb-w"><svg viewBox="0 0 24 24"><path d="M9 6h11v12H9l-6-6zM12.5 9.5l5 5m0-5l-5 5"/></svg></span></span>
      <span class="kb-r"><span class="kb-k kb-w">123</span><span class="kb-k kb-sp" data-k="space">רווח</span><span class="kb-k kb-go">שליחה</span></span>
    </div></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: המקלדת סגורה וההודעה כבר בשיחה (במארקאפ)
  const root=document.querySelector(".kb"),ph=root.querySelector(".kb-ph"),slot=root.querySelector(".kb-slot"),pad=root.querySelector(".kb-pad"),
    fld=root.querySelector(".kb-fld"),typed=root.querySelector(".kb-txt2"),send=root.querySelector(".kb-send"),out=root.querySelector(".kb-out"),
    keys=[...root.querySelectorAll(".kb-k")],go=root.querySelector(".kb-go");
  const text=out.textContent.trim();
  const keyOf=ch=>keys.find(k=>k.dataset.k===(ch===" "?"space":ch));
  const idle=()=>{typed.textContent="";fld.classList.add("is-empty");fld.classList.remove("is-focus");send.classList.remove("is-ready");};
  // בהפחתת תנועה הפונקציה לא רצה, והמקלדת נשארת סגורה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(out,{autoAlpha:0,y:12});
    const tl=gsap.timeline({paused:true});
    tl.call(()=>fld.classList.add("is-focus"),null,.2);
    tl.to(slot,{height:()=>pad.offsetHeight,duration:.6,ease:"power3.out"},.2);
    // כל לחיצה: מקש יורד והאות מופיעה באותו רגע, ואחרי רגע קצר המקש חוזר
    let t=1;
    [...text].forEach((ch,i)=>{
      const k=keyOf(ch);
      tl.call(()=>{if(k)k.classList.add("is-down");typed.textContent=text.slice(0,i+1);fld.classList.remove("is-empty");send.classList.add("is-ready");},null,t);
      tl.call(()=>{if(k)k.classList.remove("is-down");},null,t+.09);
      t+=.115+((i*37)%5)*.012;
    });
    tl.call(()=>go.classList.add("is-hot"),null,t+.2);
    tl.call(()=>go.classList.add("is-down"),null,t+.45);
    tl.call(()=>{go.classList.remove("is-down");idle();},null,t+.55);
    tl.to(slot,{height:0,duration:.6,ease:"power3.inOut"},t+.7);
    tl.to(out,{autoAlpha:1,y:0,duration:.5,ease:"power3.out"},t+.9);
    tl.call(()=>go.classList.remove("is-hot"),null,t+1.4);
    const st=ScrollTrigger.create({trigger:ph,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([slot,out],{clearProps:"all"});idle();keys.forEach(k=>k.classList.remove("is-down","is-hot"));};
  });
})();`
},
{
  id:"g248", cat:"gsap", name:"מסגרת שסורקת ימי שבוע ונעצרת על יום אחד", tech:"GSAP · Tween על מונה · ScrollTrigger once", status:"מאושר-עין",
  desc:"שבעה אריחי ימים בשורה. מסגרת קטנה קופצת מיום ליום, מהר בהתחלה ובהאטה הולכת וגוברת, ונעצרת על יום אחד. שאר הימים מתעמעמים, היום שנבחר נצבע, והמשפט שמתחת מתחלף לתאריך ולשעות הפנויות. קו דק מתמלא לאורך הסריקה.",
  when:"שירות עם תורים או מועדים: קליניקה, ייעוץ, פגישות, מועד השקה, אירוע. התנועה אומרת בלי מילים ״בדקנו בשבילכם ובחרנו את היום הקרוב ביותר״. לא מתאים כשהלקוח בוחר יום בעצמו: סריקה שנגמרת בבחירה של המערכת מבטיחה בחירה אוטומטית, ואם אין כזו זה מטעה.",
  note:"**שחזור.** השראה: סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם שורה של שבעה אריחי ימים ומסגרת מתאר שקופצת ביניהם, מאטה ונעצרת על אחד בעוד השאר מתעמעמים. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** האריח השלישי מסומן (`is-pick`), האחרים מעומעמים והמשפט מציג תאריך ושעות. בזמן הסריקה הסקריפט מוסיף `is-scan` לשורש, ואז כל האריחים שווים, וההסרה שלו בסוף היא שצובעת את הנבחר ומעמעמת את השאר (במעבר CSS על צבע ושקיפות). **המנגנון:** מונה אחד `p` עובר מ-0 ל-16 ב-`power3.out`, והאריח הנוכחי הוא `Math.round(p) % 7`, ולכן המסגרת קופצת בצעדים שלמים, מאטה ונעצרת. 16 מודולו 7 הוא 2, כלומר האריח השלישי. כדי לעצור ביום אחר משנים את `END` כך שהשארית תהיה האינדקס הרצוי ומסמנים את `is-pick` באריח הזה. המסגרת ממוקמת לפי `offsetLeft` ו-`offsetWidth` של האריח, ולכן אין תלות בכיוון הדף. **באתר LTR** רק מסדרים את הימים במארקאפ משמאל לימין, והקו נפרש מתחילת השורה מעצמו. **נגישות:** הלוח `aria-hidden`, ומשפט לקוראי מסך נותן את היום והשעות. בהפחתת תנועה נשאר מצב הסיום. **טלפון:** האריחים מצטמצמים לכ-42 פיקסלים, האות והסטטוס נשארים קריאים. כל מה שמופיע בימים הוא דוגמה: מחליפים בנתוני היומן האמיתיים.",
  libs:["gsap","ScrollTrigger"],
  css:`.wd{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.wd .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.wd-txt{display:grid;gap:14px;max-width:36ch}
.wd-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.wd-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.wd-board{box-sizing:border-box;justify-self:center;width:min(660px,100%);display:grid;gap:20px;padding:clamp(16px,3vw,28px);border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 36%,transparent)}
.wd-ttl{font-size:14px;font-weight:700}
.wd-row{position:relative;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px}
.wd-d{display:grid;place-items:center;align-content:center;gap:6px;min-height:88px;padding:12px 0;border-radius:12px;background:color-mix(in srgb,var(--ink) 6%,var(--card));color:var(--ink);transition:opacity .5s linear,background-color .35s linear,color .35s linear}
.wd-d b{font-size:clamp(18px,2.4vw,26px);font-weight:700;line-height:1}
.wd-d small{font-size:12px;line-height:1.2;color:var(--muted);transition:color .35s linear}
.wd:not(.is-scan) .wd-d.is-pick{background:var(--accent);color:var(--accent-ink)}
.wd:not(.is-scan) .wd-d.is-pick small{color:var(--accent-ink)}
.wd:not(.is-scan) .wd-d:not(.is-pick){opacity:.45}
.wd-fr{position:absolute;left:0;top:0;box-sizing:border-box;width:0;height:100%;border:2px solid var(--accent);border-radius:12px;opacity:0;pointer-events:none}
.wd-rd{display:grid;gap:6px}
.wd-l1{font-size:clamp(18px,2vw,22px);font-weight:700;line-height:1.25}
.wd-l2{font-size:14px;color:var(--muted);line-height:1.4}
.wd-bar{display:block;height:4px;margin-top:6px;border-radius:2px;background:var(--line);overflow:hidden}
.wd-bar i{display:block;width:100%;height:100%;background:var(--accent)}
@media(max-width:767px){.wd{grid-template-columns:minmax(0,1fr)}.wd-txt{max-width:none}.wd-row{gap:4px}.wd-d{min-height:76px;padding:10px 0}.wd-d small{font-size:11px}}`,
  html:`<div class="stage"><div class="wd">
  <div class="wd-txt"><h3>מצאנו את היום הקרוב שיש בו מקום</h3><p>המערכת עוברת על ימי השבוע ועוצרת ביום הראשון שבו יש תור פנוי. הלקוח רואה מיד את התאריך ואת השעות.</p><span class="sr-only">היום הקרוב עם תור פנוי הוא יום שלישי, 27 באוקטובר. שעות פנויות: 10:00, 13:30 ו-16:00.</span></div>
  <div class="wd-board" aria-hidden="true">
    <span class="wd-ttl">קביעת פגישת ייעוץ</span>
    <div class="wd-row">
      <span class="wd-d"><b>א׳</b><small>מלא</small></span>
      <span class="wd-d"><b>ב׳</b><small>מלא</small></span>
      <span class="wd-d is-pick"><b>ג׳</b><small>פנוי</small></span>
      <span class="wd-d"><b>ד׳</b><small>פנוי</small></span>
      <span class="wd-d"><b>ה׳</b><small>מלא</small></span>
      <span class="wd-d"><b>ו׳</b><small>סגור</small></span>
      <span class="wd-d"><b>ש׳</b><small>סגור</small></span>
      <span class="wd-fr"></span>
    </div>
    <div class="wd-rd"><span class="wd-l1">יום שלישי, 27 באוקטובר</span><span class="wd-l2">שעות פנויות: 10:00, 13:30 ו-16:00</span><span class="wd-bar"><i></i></span></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: היום השלישי נבחר, המשפט מציג תאריך ושעות (במארקאפ)
  const root=document.querySelector(".wd"),days=[...root.querySelectorAll(".wd-d")],fr=root.querySelector(".wd-fr"),
    l1=root.querySelector(".wd-l1"),l2=root.querySelector(".wd-l2"),bar=root.querySelector(".wd-bar i");
  const N=days.length,END=16;               // END מודולו 7 הוא האינדקס של היום הנבחר (2 = שלישי)
  const done1=l1.textContent,done2=l2.textContent;
  // בהפחתת תנועה הפונקציה לא רצה, והלוח נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const s={p:0};let last=-1;
    root.classList.add("is-scan");
    l1.textContent="בודקים את השבוע";l2.textContent="עוברים על היומן ועל הימים הפנויים";
    gsap.set(bar,{width:"0%"});
    // המסגרת קופצת לאריח לפי המונה, ולכן בצעדים שלמים ובהאטה
    const hop=()=>{const i=Math.round(s.p)%N;if(i===last)return;last=i;gsap.set(fr,{x:days[i].offsetLeft,width:days[i].offsetWidth});};
    const tl=gsap.timeline({paused:true});
    tl.call(hop,null,0);
    tl.to(fr,{opacity:1,duration:.25,ease:"power1.out"},0);
    tl.to(s,{p:END,duration:3.4,ease:"power3.out",onUpdate:hop},.2);
    tl.to(bar,{width:"100%",duration:3.4,ease:"power3.out"},.2);
    tl.call(()=>root.classList.remove("is-scan"),null,">+=.2");               // הנבחר נצבע, השאר מתעממים
    tl.to([l1,l2],{opacity:0,duration:.2,ease:"power1.in"},"<+=.2");
    tl.call(()=>{l1.textContent=done1;l2.textContent=done2;},null,">");
    tl.to([l1,l2],{opacity:1,duration:.35,ease:"power1.out"},">");
    tl.to(fr,{opacity:0,duration:.45,ease:"power1.in"},"<+=.2");
    const st=ScrollTrigger.create({trigger:root.querySelector(".wd-board"),start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();root.classList.remove("is-scan");gsap.set([fr,bar,l1,l2],{clearProps:"all"});
      l1.textContent=done1;l2.textContent=done2;};
  });
})();`
},
{
  id:"g249", cat:"gsap", name:"כתובת ארוכה שמצטמצמת לתווית עגולה קצרה", tech:"GSAP · מונה הקלדה · Tween רוחב", status:"מאושר-עין",
  desc:"קישור ארוך מאוד נכתב תו אחר תו בשורה אחת, עם קצוות שדוהים וסמן מהבהב. בסוף השורה כולה מתכווצת לתווית עגולה וכהה ובה הקישור הקצר, כשהחלק האחרון שלו נצבע. מתחת מופיעה שורה שסופרת כמה תווים נחסכו.",
  when:"שירות שמקצר, מפשט או מארגן: קישורים לקמפיינים, כתובות שנשלחות ללקוחות, חבילה מורכבת שהופכת להצעה אחת. טוב לכניסה למסך של פיצ׳ר קטן. לא לעסק שאין לו מה לקצר: אותה תנועה על טקסט שקצר ממילא נראית כמו תרגיל.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו כתובת ארוכה נכתבת על פני המסך, מתכווצת לתווית עגולה וקצרה, והמקטע האחרון בה מודגש. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** התווית הכהה עם הקישור הקצר, והשורה שמתחתיה. הכתובת הארוכה כתובה בתוך `.ls-ty` ומוסתרת (`visibility:hidden`), והסקריפט קורא אותה משם ומקליד אותה מחדש תו אחר תו. **המעבר:** התווית מתחילה ברוחב הקופסה ובצבע של שדה, ובסוף ה-Tween של `width` מכווץ אותה לרוחב הטבעי שנמדד לפני ההתחלה. שתי שכבות עושות את החלפת הצבע: שכבת רקע כהה שהשקיפות שלה עולה, והטקסט הארוך שנעלם ביחד עם הקצר שמופיע, כך שאין צורך להמיר צבעים. הקצוות הדועכים הם `mask-image` על שכבת הטקסט הארוך, והסמן נשאר בקצה הימני של השורה (הכתובת עצמה תמיד LTR). **באתר LTR** אין מה להפוך. המספר בשורה התחתונה הוא ההפרש בין אורך הכתובת הארוכה לקצרה, ומחושב מהמארקאפ. **נגישות:** הלוח `aria-hidden`, ובטקסט לקוראי מסך נאמר מה התקצר ולמה. בהפחתת תנועה נשארת התווית הקצרה. **טלפון:** התווית מצטמצמת לרוחב הקופסה והכתובת נחתכת בקצה.",
  libs:["gsap","ScrollTrigger"],
  css:`.ls{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.ls .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ls-txt{display:grid;gap:14px;max-width:36ch}
.ls-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.ls-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ls-board{box-sizing:border-box;justify-self:center;width:min(680px,100%);display:grid;gap:20px;padding:clamp(20px,3.4vw,40px);border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 36%,transparent)}
.ls-lbl{font-size:16px;font-weight:700}
.ls-box{display:flex;justify-content:center;min-width:0}
.ls-pill{position:relative;display:inline-flex;align-items:center;box-sizing:border-box;max-width:100%;height:72px;padding:0 28px;border-radius:999px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;direction:ltr;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:clamp(14px,1.55vw,20px)}
.ls-bg{position:absolute;inset:0;border-radius:inherit;background:var(--ink)}
.ls-s{position:relative;z-index:1;color:var(--bg);white-space:nowrap}
.ls-hot{margin-inline-start:2px;padding:2px 8px;border-radius:6px;background:var(--accent);color:var(--accent-ink)}
.ls-l{position:absolute;inset:0;z-index:2;display:flex;align-items:center;padding:0 28px;visibility:hidden;color:var(--ink);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.ls-in{display:flex;align-items:center;white-space:nowrap}
.ls-car{flex:none;width:2px;height:26px;margin-inline-start:2px;background:var(--accent);animation:ls-blink 1s steps(1) infinite}
@keyframes ls-blink{50%{opacity:0}}
.ls-cap{font-size:16px;color:var(--muted);line-height:1.5;text-align:center}
.ls-cap b{color:var(--ink);font-variant-numeric:tabular-nums}
@media(max-width:767px){.ls{grid-template-columns:minmax(0,1fr)}.ls-txt{max-width:none}.ls-pill{height:52px;padding:0 16px}.ls-l{padding:0 16px}}`,
  html:`<div class="stage"><div class="ls">
  <div class="ls-txt"><h3>קישור ארוך הופך לכתובת אחת קצרה</h3><p>כתובת עם שובל ארוך של פרטי מעקב נכנסת לתווית אחת שאפשר לשלוח בהודעה, להדפיס על שלט או להכתיב בטלפון.</p><span class="sr-only">הקישור לסדנה קוצר מכתובת של 165 תווים לכתובת של 17 תווים: nofit.link/autumn.</span></div>
  <div class="ls-board" aria-hidden="true">
    <span class="ls-lbl">הקישור לסדנת הקרמיקה</span>
    <div class="ls-box"><div class="ls-pill">
      <span class="ls-bg"></span>
      <span class="ls-s">nofit.link/<span class="ls-hot">autumn</span></span>
      <span class="ls-l"><span class="ls-in"><span class="ls-ty">https://nofit-ceramics.co.il/workshops/pottery-weekend?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=autumn-workshops&amp;utm_content=top-button&amp;ref=customers-list</span><span class="ls-car"></span></span></span>
    </div></div>
    <span class="ls-cap">קוצרו <b class="ls-n">148</b> תווים, והקישור נכנס בהודעה אחת</span>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: התווית הקצרה והשורה שמתחתיה (במארקאפ)
  const root=document.querySelector(".ls"),box=root.querySelector(".ls-box"),pill=root.querySelector(".ls-pill"),bg=root.querySelector(".ls-bg"),
    sh=root.querySelector(".ls-s"),lg=root.querySelector(".ls-l"),inn=root.querySelector(".ls-in"),ty=root.querySelector(".ls-ty"),
    cap=root.querySelector(".ls-cap"),num=root.querySelector(".ls-n");
  const full=ty.textContent,saved=parseInt(num.textContent,10);
  // בהפחתת תנועה הפונקציה לא רצה, והלוח נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const w1=pill.offsetWidth,w0=box.clientWidth;      // רוחב טבעי של התווית הקצרה, ורוחב הקופסה
    const s={n:0},c={v:0};
    ty.textContent="";
    gsap.set(pill,{width:w0});gsap.set(bg,{opacity:0});gsap.set(sh,{opacity:0});gsap.set(lg,{autoAlpha:1});gsap.set(cap,{opacity:0});num.textContent="0";
    // הסמן תמיד בקצה הנראה: כשהשורה ארוכה מהתווית מזיזים אותה שמאלה
    const type=()=>{
      ty.textContent=full.slice(0,Math.round(s.n));
      const room=lg.clientWidth-56,over=inn.offsetWidth-room;
      gsap.set(inn,{x:over>0?-over-8:0});
    };
    const tl=gsap.timeline({paused:true});
    tl.to(s,{n:full.length,duration:2.8,ease:"power1.out",onUpdate:type},.05);
    tl.to(lg,{autoAlpha:0,duration:.35,ease:"power1.in"},"+=.35");
    tl.to(pill,{width:w1,duration:.95,ease:"power3.inOut"},"<");
    tl.to(bg,{opacity:1,duration:.5,ease:"power1.out"},"<+=.2");
    tl.to(sh,{opacity:1,duration:.4,ease:"power1.out"},"<+=.3");
    tl.to(cap,{opacity:1,duration:.4,ease:"power1.out"},">-=.1");
    tl.to(c,{v:saved,duration:.9,ease:"power2.out",onUpdate:()=>{num.textContent=Math.round(c.v);}},"<");
    const st=ScrollTrigger.create({trigger:root.querySelector(".ls-board"),start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([pill,bg,sh,lg,inn,cap],{clearProps:"all"});ty.textContent=full;num.textContent=saved;};
  });
})();`
},
{
  id:"g250", cat:"gsap", name:"חלון שעובר על תמונה גסה ומצייר מפת קצוות", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"תמונה מפוקסלת לרשת של ארבע עשרה על ארבע עשרה משבצות. מסגרת קטנה עוברת עליה שורה אחרי שורה לפי הגלילה, ובפאנל שליד נצבעת מפה של המקומות שבהם הצבע משתנה בבת אחת. בין שני הפאנלים מילה גדולה אחת שנותנת שם לפעולה, ומתחת מונה שסופר כמה משבצות נסרקו.",
  when:"סקשן ״איך זה עובד״ של שירות שמנתח משהו: בדיקת איכות בייצור, זיהוי מוצרים בתמונה, ניתוח מסמכים, חיפוש לפי תמונה. הגלילה היא סרגל ההתקדמות, והמבקר רואה את הניתוח נבנה במקום לקרוא עליו. לא לשירות שאין בו ניתוח אמיתי: מפה שנצבעת בלי שום משמעות היא קישוט שמבטיח יותר מדי.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו ריבוע מתאר קטן עובר על רשת גסה של פיקסלים שורה אחרי שורה, ופאנל שני מצטבר ממנו מפת תוצאה, עם מילה אחת גדולה שנותנת שם לפעולה. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** המפה מלאה, החלון נמצא במשבצת האחרונה והמונה אומר 144 מתוך 144. **התמונה:** תמונה אמיתית מהמאגר שהוקטנה ל-14 על 14 פיקסלים (PNG של כ-450 בתים, מוטמע), ו-`image-rendering:pixelated` מגדיל אותה למשבצות חדות בכל צפיפות מסך. המפה היא 12 על 12 ערכים (`--v` בין 0 ל-1) שחושבו מראש מהתמונה הזאת (גודל השיפוע בין שכנים, חלון של 3 על 3), ולכן החלון והמפה מתאימים לתמונה באמת. **האנימציה:** טיימליין עם `scrub`, וכל הציור קורה ב-`onUpdate`: אינדקס אחד `n` נגזר מהזמן, החלון זז לשורה ולעמודה של `n` דרך משתני CSS (`--c`, `--r`) והמשבצות עד `n` מוצגות. כך הכיוון האחורי בגלילה עובד בלי חשבון נוסף. **הצמדה:** `.sw-run` מקבל גובה רק אחרי ש-`is-live` נוסף ב-JS, ו-`.sw-pin` הוא `sticky`. **נגישות:** המפה והתמונה `aria-hidden`, ומשפט לקוראי מסך אומר מה הוצג. בהפחתת תנועה הכל נשאר במצב הסיום וגם אין הצמדה. **באתר LTR** הסדר בשורה מתהפך מעצמו, והחלון ממוקם בקואורדינטות פיזיות כי התמונה לא מתהפכת. **טלפון:** שני הפאנלים נערמים אנכית, עם המילה ביניהם, וכל הערימה נכנסת במסך אחד. כדי להחליף תמונה: ליצור PNG חדש של 14 על 14 ולחשב מחדש את 144 הערכים, אחרת החלון יסמן קצוות שלא קיימים.",
  libs:["gsap","ScrollTrigger"],
  css:`.sw{--pn:clamp(150px,min(24vw,31vh),320px)}
.sw .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.sw-run{position:relative}
.sw.is-live .sw-run{height:420vh}
.sw-pin{position:sticky;top:0;box-sizing:border-box;min-height:100vh;min-height:100svh;display:grid;align-content:center;justify-items:center;gap:clamp(20px,3vw,40px);padding:24px 0}
.sw-hd{display:grid;gap:12px;max-width:52ch;text-align:center}
.sw-hd h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.sw-hd p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sw-row{display:grid;grid-auto-flow:column;align-items:center;justify-content:center;gap:clamp(24px,5vw,72px)}
.sw-pn{margin:0;display:grid;gap:12px;justify-items:center}
.sw-pn figcaption{font-size:13px;color:var(--muted)}
.sw-fr{position:relative;box-sizing:border-box;width:var(--pn);aspect-ratio:1;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:var(--card)}
.sw-fr img{display:block;width:100%;height:100%;image-rendering:pixelated}
.sw-win{position:absolute;left:0;top:0;box-sizing:border-box;width:calc(100% * 3 / 14);height:calc(100% * 3 / 14);border:2px solid var(--accent);box-shadow:0 0 0 2px var(--bg);transform:translate(calc(var(--c,11) * 100% / 3),calc(var(--r,11) * 100% / 3))}
.sw-grid{box-sizing:border-box;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-template-rows:repeat(12,minmax(0,1fr));gap:2px;padding:6px}
.sw-grid i{display:block;border-radius:2px;background:color-mix(in srgb,var(--accent) calc(var(--v) * 100%),color-mix(in srgb,var(--ink) 6%,var(--card)))}
.sw-word{font-size:clamp(40px,6vw,96px);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--ink)}
.sw-cnt{margin:0;font-size:14px;color:var(--muted)}
.sw-cnt b{color:var(--ink);font-variant-numeric:tabular-nums}
@media(max-width:767px){.sw{--pn:clamp(120px,min(50vw,22vh),240px)}.sw-row{grid-auto-flow:row;justify-items:center;gap:12px}.sw-word{font-size:44px}.sw-hd p{font-size:14px}}`,
  html:`<div class="stage"><div class="sw"><div class="sw-run"><div class="sw-pin">
  <div class="sw-hd"><h3>המערכת סורקת את התמונה משבצת אחרי משבצת</h3><p>חלון קטן עובר על התמונה ובכל צעד בודק אם הצבע משתנה. מהצעדים האלה נבנית מפה, ובה רואים איפה נגמר המוצר ואיפה מתחיל הרקע.</p><span class="sr-only">בדוגמה נסרקו כל 144 המשבצות, והמפה מסמנת את הקצוות של המוצר בתמונה.</span></div>
  <div class="sw-row" aria-hidden="true">
    <figure class="sw-pn"><div class="sw-fr"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAABf0lEQVR42jWSv2rUQRSFvzMzm81usmHdGMGoMbEQtArYCRbic/hQvoU2PoOFNoKFiIiCWgiijX+i0f1lZu6x2PXyledwzz1cfainQgmSJBASSIj16OOf+YuB7tJscIJMSpBAInmt1a+283LAEJSV29BtCyBZloUIT5//zl2ARYr/i4xtwgQG2Yxen26eCEQCUdaBpHry98uDp4vZvLW6uH88KePZu7ZObUkuti0J6ji9evjk4Oe02eN7Rxc+z9RBxmAcpE4Ett0S/cbuEG0o3vqk8qN7sM/sM7sGNVJ1dEe3xylv39yPiKm29t6IwR66lyvC1ak5qiNwVtq+dWVw3Zmcy9PiZipU6BBgpW4H7oRh//b1s5F3Dy5isFeHU0SRslKYsG2CuPp2tJVn5w8vkUWAIEsrNlRYtYjL17Z4trx8dG1+uIeNJYkESWRIKt3OdrSYP/qeljq+eyeNCh2AgASxegtKsxWeP/628b72zZw2s5edKibZvWtDZDtLRf8AttrjbAN6BJAAAAAASUVORK5CYII=" width="14" height="14" alt=""><span class="sw-win"></span></div><figcaption>התמונה</figcaption></figure>
    <div class="sw-word">קצוות</div>
    <figure class="sw-pn"><div class="sw-fr sw-grid"><i style="--v:0.07"></i><i style="--v:0.09"></i><i style="--v:0.1"></i><i style="--v:0.09"></i><i style="--v:0.07"></i><i style="--v:0.08"></i><i style="--v:0.07"></i><i style="--v:0.04"></i><i style="--v:0.25"></i><i style="--v:0.45"></i><i style="--v:0.42"></i><i style="--v:0.2"></i><i style="--v:0.02"></i><i style="--v:0.04"></i><i style="--v:0.08"></i><i style="--v:0.09"></i><i style="--v:0.07"></i><i style="--v:0.08"></i><i style="--v:0.08"></i><i style="--v:0.17"></i><i style="--v:0.41"></i><i style="--v:0.45"></i><i style="--v:0.25"></i><i style="--v:0.1"></i><i style="--v:0.05"></i><i style="--v:0.09"></i><i style="--v:0.39"></i><i style="--v:0.58"></i><i style="--v:0.64"></i><i style="--v:0.57"></i><i style="--v:0.41"></i><i style="--v:0.35"></i><i style="--v:0.46"></i><i style="--v:0.31"></i><i style="--v:0.09"></i><i style="--v:0.09"></i><i style="--v:0.07"></i><i style="--v:0.15"></i><i style="--v:0.71"></i><i style="--v:0.89"></i><i style="--v:0.97"></i><i style="--v:0.91"></i><i style="--v:0.71"></i><i style="--v:0.43"></i><i style="--v:0.38"></i><i style="--v:0.16"></i><i style="--v:0.07"></i><i style="--v:0.09"></i><i style="--v:0.09"></i><i style="--v:0.15"></i><i style="--v:0.88"></i><i style="--v:0.88"></i><i style="--v:0.62"></i><i style="--v:0.85"></i><i style="--v:0.81"></i><i style="--v:0.36"></i><i style="--v:0.25"></i><i style="--v:0.14"></i><i style="--v:0.14"></i><i style="--v:0.14"></i><i style="--v:0.11"></i><i style="--v:0.12"></i><i style="--v:0.87"></i><i style="--v:0.96"></i><i style="--v:0.34"></i><i style="--v:0.79"></i><i style="--v:0.8"></i><i style="--v:0.25"></i><i style="--v:0.18"></i><i style="--v:0.17"></i><i style="--v:0.17"></i><i style="--v:0.16"></i><i style="--v:0.12"></i><i style="--v:0.05"></i><i style="--v:0.74"></i><i style="--v:0.98"></i><i style="--v:0.51"></i><i style="--v:0.76"></i><i style="--v:0.75"></i><i style="--v:0.2"></i><i style="--v:0.16"></i><i style="--v:0.16"></i><i style="--v:0.15"></i><i style="--v:0.13"></i><i style="--v:0.13"></i><i style="--v:0.08"></i><i style="--v:0.57"></i><i style="--v:1"></i><i style="--v:0.64"></i><i style="--v:0.77"></i><i style="--v:0.68"></i><i style="--v:0.15"></i><i style="--v:0.08"></i><i style="--v:0.07"></i><i style="--v:0.05"></i><i style="--v:0.07"></i><i style="--v:0.14"></i><i style="--v:0.11"></i><i style="--v:0.38"></i><i style="--v:0.98"></i><i style="--v:0.66"></i><i style="--v:0.78"></i><i style="--v:0.57"></i><i style="--v:0.12"></i><i style="--v:0.07"></i><i style="--v:0.1"></i><i style="--v:0.12"></i><i style="--v:0.12"></i><i style="--v:0.13"></i><i style="--v:0.12"></i><i style="--v:0.42"></i><i style="--v:0.92"></i><i style="--v:0.52"></i><i style="--v:0.75"></i><i style="--v:0.42"></i><i style="--v:0.13"></i><i style="--v:0.11"></i><i style="--v:0.12"></i><i style="--v:0.12"></i><i style="--v:0.12"></i><i style="--v:0.12"></i><i style="--v:0.31"></i><i style="--v:0.57"></i><i style="--v:0.72"></i><i style="--v:0.46"></i><i style="--v:0.62"></i><i style="--v:0.26"></i><i style="--v:0.14"></i><i style="--v:0.14"></i><i style="--v:0.11"></i><i style="--v:0.1"></i><i style="--v:0.1"></i><i style="--v:0.25"></i><i style="--v:0.56"></i><i style="--v:0.59"></i><i style="--v:0.35"></i><i style="--v:0.32"></i><i style="--v:0.34"></i><i style="--v:0.18"></i><i style="--v:0.17"></i><i style="--v:0.17"></i><i style="--v:0.16"></i><i style="--v:0.15"></i><i style="--v:0.15"></i></div><figcaption>המפה</figcaption></figure>
  </div>
  <p class="sw-cnt" aria-hidden="true">נסרקו <b class="sw-n">144</b> מתוך 144 משבצות</p>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: המפה מלאה והחלון במשבצת האחרונה (במארקאפ)
  const root=document.querySelector(".sw"),run=root.querySelector(".sw-run"),win=root.querySelector(".sw-win"),
    cells=[...root.querySelectorAll(".sw-grid i")],word=root.querySelector(".sw-word"),cnt=root.querySelector(".sw-n");
  const T=cells.length,COLS=12,D=10;
  let shown=T;
  // כל הציור נגזר מזמן הטיימליין: n משבצות נסרקו, והחלון עומד על המשבצת ה-n
  const paint=t=>{
    const p=Math.min(1,Math.max(0,t/D)),n=Math.round(p*T),pos=Math.min(n,T-1);
    win.style.setProperty("--c",pos%COLS);win.style.setProperty("--r",Math.floor(pos/COLS));
    if(n!==shown){
      const a=Math.min(n,shown),b=Math.max(n,shown);
      for(let k=a;k<b;k++)cells[k].style.opacity=k<n?1:0;
      shown=n;
    }
    cnt.textContent=n;
    word.style.opacity=(.2+.8*p).toFixed(2);
  };
  // בהפחתת תנועה הפונקציה לא רצה, ואין הצמדה: המפה נשארת מלאה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const tl=gsap.timeline({scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    tl.set({},{},D);                          // זמן הטיימליין
    tl.eventCallback("onUpdate",()=>paint(tl.time()));
    cells.forEach(c=>{c.style.opacity=0;});shown=0;paint(0);
    return()=>{tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");
      cells.forEach(c=>{c.style.opacity="";});win.style.removeProperty("--c");win.style.removeProperty("--r");
      word.style.opacity="";cnt.textContent=T;shown=T;};
  });
})();`
},
{
  id:"g251", cat:"gsap", name:"קשקוש על תמונה שמוחק את האובייקט", tech:"GSAP · stroke-dashoffset · ScrollTrigger once", status:"מאושר-עין",
  desc:"תמונת מוצר עם שלושה גביעי גלידה בשורה. קו קשקוש נצבע בזיגזג על הגביע הימני, והגביע נמחק והרקע משלים את עצמו. אחר כך אותו דבר על השמאלי. בסוף קופצת תווית קטנה שמספרת מה הוסר.",
  when:"שירות של עריכת תמונה, ניקוי רקע, צילום מוצר או שיפור תמונות בבינה מלאכותית: ״מסמנים מה מפריע והוא נעלם״. מתאים לדמו בראש עמוד או לסקשן של ״לפני ואחרי״. לא לשירות שלא מנקה תמונה בפועל: המחיקה כאן היא הבטחה שמישהו יבדוק על תמונה שלו.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) שבו קשקוש ורוד נצבע על אובייקט בתוך תמונה, האובייקט נעלם והרקע משלים את עצמו, ותווית קטנה קופצת לידו. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** התמונה נקייה (נשאר גביע אחד) והתווית נראית. **איך זה בנוי:** תמונה אחת עם שלוש גביעים, ומעליה שתי שכבות תיקון (`sc-pl`, `sc-pr`), כל אחת תמונת WebP שקופה וקטנה (כ-2.7KB) שבה האזור של גביע אחד מולא מחדש בצבע הרקע ועם קצה רך. בהתחלה הסקריפט מוריד את שתי השכבות לשקיפות אפס, כך שרואים את התמונה המקורית. הקשקוש הוא מסלול SVG עם `pathLength=1`, והציור הוא `stroke-dashoffset` מ-1 ל-0 (בלי תוסף). אחרי כל קשקוש שכבת התיקון עולה והקשקוש דועך. **שכבות התיקון הן דוגמה:** הן חושבו מהצבע הרקע החלק של התמונה הזאת. בעבודה אמיתית שכבת התיקון היא התמונה המעובדת בפועל, עם אותו גודל ואותו יחס, ואז אין שום תלות בצבע הרקע. **באתר LTR** התווית עוברת לצד השני אוטומטית (`inset-inline-start`), והקשקושים בקואורדינטות פיזיות של התמונה. **נגישות:** לתמונה יש טקסט חלופי שמתאר את המצב הסופי, הקשקוש והתווית `aria-hidden`, ומשפט לקוראי מסך אומר שהוסרו שני גביעים. בהפחתת תנועה נשארת התמונה הנקייה והתווית. **טלפון:** התמונה ממלאת את הרוחב, והקו עבה מספיק (3.4 יחידות מתוך 140) כדי להיראות גם בקטן.",
  libs:["gsap","ScrollTrigger"],
  css:`.sc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1160px;margin-inline:auto}
.sc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.sc-txt{display:grid;gap:14px;max-width:36ch}
.sc-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.sc-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sc-img{position:relative;margin:0;justify-self:center;box-sizing:border-box;width:min(660px,100%);aspect-ratio:4/3;overflow:hidden;border:1px solid var(--line);border-radius:20px;background:var(--card);box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 36%,transparent)}
.sc-img img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover}
.sc-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sc-sk{opacity:0}
.sc-sk path{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 2;stroke-dashoffset:0}
.sc-halo{stroke:var(--bg);stroke-width:5.6}
.sc-line{stroke:var(--accent);stroke-width:3.4}
.sc-chip{position:absolute;inset-block-start:16px;inset-inline-start:16px;display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:13px;font-weight:600;line-height:1}
.sc-chip svg{flex:none;width:16px;height:16px}
.sc-chip circle{fill:var(--accent)}
.sc-chip path{fill:none;stroke:var(--accent-ink);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
@media(max-width:767px){.sc{grid-template-columns:minmax(0,1fr)}.sc-txt{max-width:none}}`,
  html:`<div class="stage"><div class="sc">
  <div class="sc-txt"><h3>מסמנים מה מפריע, והוא נעלם</h3><p>מקשקשים על מה שלא צריך להיות בתמונה, והמערכת מוחקת אותו ומשלימה את הרקע. התמונה נשארת נקייה, בלי עריכה ידנית.</p><span class="sr-only">בתמונה הוסרו שני גביעים, ונשאר גביע אחד באמצע.</span></div>
  <figure class="sc-img">
    <img class="sc-base" src="../assets/media/real/s11/cones-yellow.webp" width="1400" height="1050" alt="גביע גלידה כחול על רקע צהוב" loading="lazy" decoding="async">
    <img class="sc-p sc-pl" src="data:image/webp;base64,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" width="1400" height="1050" alt="" decoding="async">
    <img class="sc-p sc-pr" src="data:image/webp;base64,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" width="1400" height="1050" alt="" decoding="async">
    <svg class="sc-svg" viewBox="0 0 140 105" preserveAspectRatio="none" aria-hidden="true">
      <g class="sc-sk sc-skr"><path class="sc-halo" pathLength="1" d="M95.7 66.3 L125.1 70.0 L96.4 75.1 L123.1 79.3 L95.0 85.5 L123.2 89.5 L95.8 93.6 L124.1 97.4 L94.4 102.3"/><path class="sc-line" pathLength="1" d="M95.7 66.3 L125.1 70.0 L96.4 75.1 L123.1 79.3 L95.0 85.5 L123.2 89.5 L95.8 93.6 L124.1 97.4 L94.4 102.3"/></g>
      <g class="sc-sk sc-skl"><path class="sc-halo" pathLength="1" d="M19.1 66.7 L46.4 70.9 L19.6 76.1 L44.9 80.8 L18.4 85.1 L45.0 88.7 L19.3 94.9 L45.1 97.9 L19.8 104.1"/><path class="sc-line" pathLength="1" d="M19.1 66.7 L46.4 70.9 L19.6 76.1 L44.9 80.8 L18.4 85.1 L45.0 88.7 L19.3 94.9 L45.1 97.9 L19.8 104.1"/></g>
    </svg>
    <span class="sc-chip" aria-hidden="true"><svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/><path d="M4.5 8.3l2.3 2.3 4.7-5"/></svg><span class="sc-t">הוסרו שני פריטים</span></span>
  </figure>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: התמונה הנקייה והתווית (במארקאפ)
  const root=document.querySelector(".sc"),fig=root.querySelector(".sc-img"),pl=root.querySelector(".sc-pl"),pr=root.querySelector(".sc-pr"),
    skR=root.querySelector(".sc-skr"),skL=root.querySelector(".sc-skl"),chip=root.querySelector(".sc-chip"),
    lines=[...root.querySelectorAll(".sc-sk path")];
  // בהפחתת תנועה הפונקציה לא רצה, והתמונה נשארת נקייה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set([pl,pr],{opacity:0});gsap.set([skR,skL],{opacity:1});gsap.set(lines,{strokeDashoffset:1});
    gsap.set(chip,{autoAlpha:0,scale:.85,y:8});
    const tl=gsap.timeline({paused:true});
    // קשקוש נצבע, שכבת התיקון עולה והקשקוש דועך
    const erase=(sk,patch,at)=>{
      tl.to(sk.querySelectorAll("path"),{strokeDashoffset:0,duration:1.05,ease:"power1.inOut"},at);
      tl.to(patch,{opacity:1,duration:.6,ease:"power1.out"},at+1.1);
      tl.to(sk,{opacity:0,duration:.45,ease:"power1.in"},at+1.2);
    };
    erase(skR,pr,.4);
    erase(skL,pl,2.5);
    tl.to(chip,{autoAlpha:1,scale:1,y:0,duration:.5,ease:"power3.out"},">-=.1");
    const st=ScrollTrigger.create({trigger:fig,start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([pl,pr,skR,skL,chip,...lines],{clearProps:"all"});};
  });
})();`
}
]
