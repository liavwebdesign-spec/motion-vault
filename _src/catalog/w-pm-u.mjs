// מהלכי מעבר ומחיקה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// שמונה מהלכים של מעבר בין שני מצבים: לוח צבע שחולף, סרט פסים שנמתח, מעבר מהיר עם טשטוש, קו דק שנפתח, תמונה שנחתכת לשני פאנלים,
// מחיקה מעגלית כמו מחוג, מונה לאחור לפני האתר, וזום רדיאלי אל הצופה. נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// בכל מהלך יש תוכן אמיתי משני הצדדים של המעבר, ובלי GSAP ובהפחתת תנועה רואים את המצב הסופי הקריא.
export default [
{
  id:"g219", cat:"gsap", name:"לוח צבע אלכסוני שעובר ומחליף תמונה", tech:"GSAP · ScrollTrigger scrub · clip-path", status:"מאושר-עין",
  desc:"שתי תמונות מלאות זו על זו, וכשגוללים לוח צבע אלכסוני רחב עובר על המסך מימין לשמאל, ומאחוריו נחשפת התמונה השנייה. מיד אחריו חולף לוח שני, דק ובהיר יותר. המעבר מכסה את הראשונה ומגלה את הבאה בתנועה אחת, בלי קפיצה.",
  when:"מעבר בין שני פרקים של אותו סיפור שלכל אחד תמונה גדולה משלו: בית קפה ואז המאפייה, לפני ואחרי, שני מוצרים, שני מקומות. פעם אחת בעמוד, ורק כשהתמונות חזקות מספיק כדי לשאת את המעבר.",
  note:"**שחזור.** השראה: כמה סרטוני קידום ב-prompt-motion.com (21.10.2026) שבהם לוח צבע או רצועת אור אלכסונית חולפת על הפריים ומחליפה סצנה. נבנה מאפס מהצפייה. **שלוש שכבות, כולן `clip-path`:** התמונה השנייה נחשפת בפוליגון שקצהו המשופע נע עם הלוחות, והלוחות עצמם הם שני פוליגונים מקבילים לאותו קצה. משתנה אחד (`o.p`) מזיז את כולם, ולכן הלוח לא נפרד מקצה התמונה. **הצד החיצוני של הפוליגון רחוק מהמסך תמיד:** אחרת הצורה מתהפכת כשהקצה עובר את שולי המסך. **המשפט של הקצה:** ההטיה נקבעת מגובה הבמה (`k = h * .2`), לא מהרוחב, כך שבטלפון הזווית לא נהיית שטוחה. **בלי GSAP ובהפחתת תנועה** שתי הסצנות זו מתחת לזו והלוחות לא קיימים. **כשהמהלך רץ** הבמה נעוצה, לכן צריך מסלול של כשלושה מסכים בגובה: `height:280svh` על העוטף. **כיוון:** הלוח נכנס מהקצה הימני ויוצא בשמאלי, כך שהמחיקה קוראת בכיוון הקריאה בעברית. באתר משמאל לימין מחליפים בין הקצה הימני לשמאלי (מראת הציר: `T0` מתחיל משמאל). **גרסה רכה (רצועת אור):** מחליפים את שני הלוחות בשכבה אחת עם `filter:blur(24px)`, גרדיאנט פסטל ו-`mix-blend-mode:screen`, עם אותו פוליגון. **נגישות:** הלוחות הם קישוט (`aria-hidden`), והטקסט של כל סצנה נשאר בתוך התמונה שלה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שתי הסצנות זו מתחת לזו. ההצמדה, הלוחות והחיתוך רק כשהמהלך רץ (.is-live) */
.ls{position:relative}
.ls-scene{position:relative;margin:0;min-height:72svh;display:grid;align-items:end;justify-items:start;overflow:hidden;color:var(--bg);background:var(--ink)}
.ls-scene img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ls-scene::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,color-mix(in oklab,var(--ink) 80%,transparent),transparent 66%)}
.ls-scene figcaption{position:relative;z-index:1;display:grid;gap:12px;max-width:640px;padding:var(--gutter)}
.ls-scene h2{margin:0;font-size:clamp(34px,4.8vw,76px);font-weight:700;line-height:1.05;letter-spacing:-.015em;text-wrap:balance}
.ls-scene p{margin:0;max-width:42ch;font-size:var(--fs-body);line-height:1.5}
.ls-slab{display:none;position:absolute;inset:0;pointer-events:none}
.ls-s1{background:var(--accent)}
.ls-s2{background:color-mix(in oklab,var(--accent) 40%,var(--bg))}
.ls.is-live{height:280svh}
.ls.is-live .ls-pin{position:sticky;top:0;height:100svh;overflow:hidden}
.ls.is-live .ls-scene{position:absolute;inset:0;min-height:0}
.ls.is-live .ls-b{z-index:1}
.ls.is-live .ls-slab{display:block;z-index:2}`,
  html:`<div class="stage full" style="padding-block:0"><div class="ls">
  <div class="ls-pin">
    <figure class="ls-scene ls-a">
      <img src="../assets/media/real/s14/cafe-window.webp" alt="שולחנות עץ ליד חלון גדול בבית קפה" width="1400" height="1050" loading="lazy" decoding="async">
      <figcaption><h2>בית קפה שכונתי בבוקר</h2><p>פותחים בשבע. קפה טחון טרי, שולחן ליד החלון, ובדרך כלל מישהו שכבר מכיר אותך בשם.</p></figcaption>
    </figure>
    <figure class="ls-scene ls-b">
      <img src="../assets/media/real/s14/hero-bread.webp" alt="כיכרות לחם פרוסות על קרש עץ" width="1600" height="1333" loading="lazy" decoding="async">
      <figcaption><h2>הלחם נאפה כאן בלילה</h2><p>המאפה הראשון יוצא מהתנור בחמש בבוקר. מה שלא נמכר עד הצהריים נשלח לארגון שמחלק אוכל לנזקקים.</p></figcaption>
    </figure>
    <span class="ls-slab ls-s1" aria-hidden="true"></span>
    <span class="ls-slab ls-s2" aria-hidden="true"></span>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP שתי הסצנות זו מתחת לזו
  const root=document.querySelector(".ls"),pin=root.querySelector(".ls-pin"),A=root.querySelector(".ls-a"),B=root.querySelector(".ls-b"),
    s1=root.querySelector(".ls-s1"),s2=root.querySelector(".ls-s2"),ia=A.querySelector("img"),ib=B.querySelector("img");
  // בהפחתת תנועה הפונקציה לא רצה, והסצנות נשארות זו מתחת לזו
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const o={p:0};let w=0,h=0;
    const quad=(a,b,k)=>"polygon("+(a+k)+"px 0,"+(b+k)+"px 0,"+(b-k)+"px 100%,"+(a-k)+"px 100%)";
    const draw=()=>{
      const k=h*.2,w1=Math.max(w*.2,150),w2=Math.max(w*.035,26),gap=w2*.7;
      const t0=w+w1+w2+gap+k*2,T=t0+(-k-t0)*o.p;        // הקצה נע מימין למסך אל שמאל לו, ההטיה k נשארת קבועה
      // הצד הימני של הפוליגון תמיד מעבר לשולי המסך, אחרת הצורה מתהפכת כשהקצה עובר אותם
      B.style.clipPath="polygon("+(T-2+k)+"px 0,"+(t0+k)+"px 0,"+(t0+k)+"px 100%,"+(T-2-k)+"px 100%)";
      s2.style.clipPath=quad(T-w2,T,k);
      const b=T-w2-gap;
      s1.style.clipPath=quad(b-w1,b,k);
      gsap.set(ib,{scale:1.1-.1*o.p});
      gsap.set(ia,{scale:1.1,xPercent:-4*o.p});
    };
    const size=()=>{w=pin.clientWidth;h=pin.clientHeight;draw();};
    ScrollTrigger.addEventListener("refresh",size);size();
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to({},{duration:.14})
      .to(o,{p:1,duration:.72,ease:"power2.inOut",onUpdate:draw})
      .to({},{duration:.14});
    return()=>{ScrollTrigger.removeEventListener("refresh",size);root.classList.remove("is-live");
      [B,s1,s2].forEach(e=>{e.style.clipPath="";});gsap.set([ia,ib],{clearProps:"transform"});};
  });
})();`
},
{
  id:"g220", cat:"gsap", name:"סרט פסים עבה שנמתח על המסך וחושף את הסקשן הבא", tech:"GSAP · ScrollTrigger scrub · SVG stroke + mask", status:"מאושר-עין",
  desc:"סרט עבה בכמה פסי צבע, עם מסגרת כהה וראש מעוגל, נכנס מימין המסך ושוחה במסלול מתעקל עד הקצה השמאלי. מאחורי הראש נחשף הסקשן הבא, והזנב ממשיך לחלוף עד שהסרט יוצא מהמסך. המעבר מרגיש כמו משיכת קו אחת שמעבירה אתכם הלאה.",
  when:"מעבר בין שני סקשנים חזקים באתר שיש לו אופי גרפי ושובב: סטודיו, מותג לילדים, אירוע, מרפאה ידידותית. פעם אחת בעמוד, כשיש סקשן אחד שנגמר ואחד שמתחיל, ושניהם עם תוכן. באתר רציני וקפדני עדיף לוח שקט.",
  note:"**שחזור.** השראה: סרטוני קידום ב-prompt-motion.com (21.10.2026) שבהם צינור עבה בפסי צבע עם מסגרת כהה נמתח על פני הפריים בקשת. נבנה מאפס מהצפייה. **ארבעה נתיבים באותו מסלול:** מסגרת כהה, פס צבע, פס בהיר וקו דק במרכז, כל אחד בעובי קטן יותר, עם `stroke-linecap:round`. **הנתיבים נבנים בפיקסלים של הבמה:** הסקריפט מחשב את המסלול מהרוחב והגובה (נבנה מחדש ב-refresh), ולכן הסרט עובר מקצה לקצה בכל מסך, ובטלפון הוא לא נחתך. כל הנתיבים עם `pathLength=1`, כך שההתקדמות היא מספר בין 0 ל-1 ולא אורך בפיקסלים. **נחש ולא קו:** הקטע הנראה הוא `stroke-dasharray` באורך קבוע שזז לאורך המסלול, עם ראש וזנב, ולכן הסרט גם נמתח וגם יוצא מהמסך. **החשיפה:** הסקשן השני מוסתר ב-`mask:url(#rb-m)` שמצויר מאותו מסלול בקו עבה מאוד (פי 1.9 מגובה הבמה, כדי לכסות את כל הגובה), ומתקדם מעט אחרי ראש הסרט (`LAG`). שים לב: `mask` שמפנה ל-SVG עובד ב-Chrome וב-Firefox, ב-Safari צריך לבדוק; חלופה בטוחה היא `clip-path` עם קצה משופע כמו ב-g219. **בלי GSAP ובהפחתת תנועה** שני הסקשנים זה מתחת לזה והסרט לא נוצר בכלל. **כיוון:** הסרט נכנס מימין ויוצא בשמאל (קריאה בעברית). באתר משמאל לימין הופכים את הסדר של נקודות המסלול. **נגישות:** ה-SVG קישוט (`aria-hidden`), והתוכן של שני הסקשנים הוא טקסט ותמונה רגילים.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שני הסקשנים זה מתחת לזה. ההצמדה, הסרט והמסכה רק כשהמהלך רץ (.is-live) */
.rb{position:relative}
.rb-scene{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);min-height:80svh;padding:var(--gutter)}
.rb-a{background:var(--card)}
.rb-b{background:color-mix(in oklab,var(--accent) 14%,var(--bg))}
.rb-txt{display:grid;gap:14px;max-width:40ch;justify-self:center}
.rb-txt h2{margin:0;font-size:clamp(32px,3.8vw,60px);font-weight:700;line-height:1.08;text-wrap:balance}
.rb-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.rb-photo{margin:0;justify-self:center;width:100%;max-width:560px;aspect-ratio:5/4;max-height:68svh}
.rb-photo img{display:block;width:100%;height:100%;object-fit:cover;border-radius:24px}
.rb-b .rb-photo{order:-1}
.rb-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;overflow:visible}
.rb-l{fill:none;stroke-linecap:round;stroke-linejoin:round}
.rb-l0{stroke:var(--ink)}
.rb-l1{stroke:var(--accent)}
.rb-l2{stroke:var(--card)}
.rb-l3{stroke:color-mix(in oklab,var(--accent) 50%,var(--ink))}
.rb.is-live{height:300svh}
.rb.is-live .rb-pin{position:sticky;top:0;height:100svh;overflow:hidden}
.rb.is-live .rb-scene{position:absolute;inset:0;min-height:0}
.rb.is-live .rb-b{-webkit-mask:url(#rb-m);mask:url(#rb-m)}
@media(max-width:767px){
  .rb-scene{grid-template-columns:minmax(0,1fr);align-content:center;gap:20px}
  .rb-photo,.rb-b .rb-photo{order:-1;aspect-ratio:16/10;max-height:34svh}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="rb">
  <div class="rb-pin">
    <section class="rb-scene rb-a">
      <div class="rb-txt"><h2>מתחילים בשיחה קצרה</h2><p>אתם מספרים מה מטריד, אנחנו מסבירים מה אפשר לעשות. בלי בדיקות ובלי למהר.</p></div>
      <figure class="rb-photo"><img src="../assets/media/real/s09/step-1-booking.webp" alt="אמא וילד על ספה מביטים בטלפון" width="1500" height="1200" loading="lazy" decoding="async"></figure>
    </section>
    <section class="rb-scene rb-b">
      <div class="rb-txt"><h2>ואז מגיעה הבדיקה</h2><p>הבדיקה נעשית בחדר שקט, אצל הרופא שהכרתם בשיחה. הוא מסביר כל שלב לפני שהוא מתחיל.</p></div>
      <figure class="rb-photo"><img src="../assets/media/real/s09/step-3-exam.webp" alt="רופא בודק ילדה בנוכחות אמה" width="1500" height="1200" loading="lazy" decoding="async"></figure>
    </section>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP שני הסקשנים זה מתחת לזה
  const root=document.querySelector(".rb"),pin=root.querySelector(".rb-pin");
  // בהפחתת תנועה הפונקציה לא רצה, והסרט לא נוצר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const NS="http://www.w3.org/2000/svg";
    const mk=(n,a,p)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;};
    const svg=mk("svg",{"class":"rb-svg","aria-hidden":"true","focusable":"false"});
    const mask=mk("mask",{id:"rb-m",maskUnits:"userSpaceOnUse"},mk("defs",{},svg));
    const mp=mk("path",{fill:"none",stroke:"white",pathLength:1,"stroke-linecap":"butt"},mask);
    const L=["rb-l0","rb-l1","rb-l2","rb-l3"].map(c=>mk("path",{"class":"rb-l "+c,pathLength:1},svg));
    pin.appendChild(svg);root.classList.add("is-live");
    const o={h:0},SEG=.5,LAG=.09;let w=0,h=0;
    // המסלול נבנה מהמידות של הבמה: נכנס מימין, יורד, עולה ויוצא משמאל
    const layout=()=>{
      w=pin.clientWidth;h=pin.clientHeight;
      const P=[[w+90,h*.3],[w*.85,h*.3],[w*.8,h*.7],[w*.58,h*.66],[w*.4,h*.62],[w*.38,h*.26],[w*.18,h*.32],[w*.08,h*.35],[-w*.04,h*.6],[-90,h*.6]];      // המסלול נגמר במשיק אופקי מחוץ למסך, כדי שהמסכה תכסה את כל הפינה
      const d="M"+P[0]+"C"+P.slice(1).map(p=>p.join(" ")).join(" ");
      const t=Math.min(Math.max(w*.045,26),60);
      svg.setAttribute("viewBox","0 0 "+w+" "+h);
      [mp].concat(L).forEach(p=>p.setAttribute("d",d));
      [1,.8,.5,.16].forEach((f,i)=>L[i].setAttribute("stroke-width",(t*f).toFixed(1)));
      mp.setAttribute("stroke-width",(h*1.9).toFixed(0));
      ["x","y"].forEach(a=>mask.setAttribute(a,0));mask.setAttribute("width",w);mask.setAttribute("height",h);
    };
    const draw=()=>{
      const head=o.h,tail=Math.max(head-SEG,0),vis=Math.max(Math.min(head,1)-tail,0);
      L.forEach(p=>{p.setAttribute("stroke-dasharray",vis+" 3");p.setAttribute("stroke-dashoffset",-tail);p.style.opacity=vis>.002?1:0;});
      mp.setAttribute("stroke-dasharray",Math.min(Math.max(head-LAG,0),1)+" 3");
    };
    const size=()=>{layout();draw();};
    ScrollTrigger.addEventListener("refresh",size);size();
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to({},{duration:.12})
      .to(o,{h:1+SEG,duration:.76,ease:"power1.inOut",onUpdate:draw})
      .to({},{duration:.12});
    return()=>{ScrollTrigger.removeEventListener("refresh",size);root.classList.remove("is-live");svg.remove();};
  });
})();`
},
{
  id:"g221", cat:"gsap", name:"מעבר מהיר בין מסכי מוצר עם טשטוש תנועה", tech:"GSAP · ScrollTrigger scrub · SVG feGaussianBlur", status:"מאושר-עין",
  desc:"חלון דפדפן אחד נעוץ במסך, ובתוכו שלושה מסכי מערכת בשורה. בגלילה המצלמה לא גוררת אלא מזנקת: המסך הנוכחי נזרק הצידה במהירות עם טשטוש תנועה אופקי, והבא נוחת במקומו חד ויציב. הטשטוש תלוי במהירות בלבד, אז כשעוצרים באמצע הוא נעלם.",
  when:"הסבר של זרימה אמיתית במערכת או באפליקציה: הזמנה, תשלום, ניהול. שלושה מסכים ברורים שלכל אחד תפקיד. מתאים להראות שהמערכת פשוטה ושהשלבים באים בזה אחר זה. לא לשימוש כשכל מסך מלא טקסט קטן שצריך לקרוא בזמן המעבר.",
  note:"**שחזור.** השראה: שני סרטוני מוצר ב-prompt-motion.com (21.10.2026) שבהם התצוגה עוברת בין מסכי ממשק בתנועת מצלמה מהירה עם טשטוש אופקי. נבנה מאפס מהצפייה. **המסילה:** שלושה מסכים בשורה אחת ברוחב 300%, והיא זזה ב-`power`-חזק של `expo.inOut` בין עצירות ארוכות, כך שרוב הגלילה היא עצירה על מסך והזינוק קצר. **הטשטוש הוא מסנן SVG ולא `blur()`:** `feGaussianBlur` עם `stdDeviation=\"x 0\"` מטשטש רק לרוחב, כמו תנועת מצלמה. הוא מופעל על אזור החלון בלבד (לא על המסילה כולה, שרחבה פי שלושה), ורק כשיש מהירות. **המהירות נמדדת מההפרש בין שני פריימים** ומוחלקת ב-`gsap.ticker`, ולכן הטשטוש דועך לבד אחרי שהגלילה נעצרת, ולא נשאר תקוע באמצע. תקרה של 14 פיקסלים כדי שיישאר עדין. **כיוון:** המסך הראשון מימין והבא משמאל לו, כמו סדר הקריאה, והמסילה זזה ימינה (`dir` נקרא מה-`direction` של העמוד). באתר משמאל לימין זה מתהפך אוטומטית. **בלי GSAP ובהפחתת תנועה** שלושת המסכים זה מתחת לזה, בלי טשטוש. **לשימוש בלחיצה** במקום בגלילה: מחליפים את הטיימליין ב-`gsap.to(o,{i:n,ease:\"expo.inOut\",duration:.5,onUpdate:place})`. **נגישות:** החלון הוא איור (`aria-hidden`), והמשמעות בכותרת ובפסקה שמעליו.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שלושת המסכים זה מתחת לזה בתוך חלון אחד. ההצמדה, המסילה והטשטוש רק כשהמהלך רץ (.is-live) */
.wp{position:relative}
.wp-defs{position:absolute}
.wp-copy{display:grid;gap:12px;max-width:560px;margin-inline:auto;padding:var(--gutter);text-align:center;justify-items:center}
.wp-copy h2{margin:0;font-size:clamp(28px,3vw,46px);font-weight:700;line-height:1.1;text-wrap:balance}
.wp-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.55}
.wp-win{width:min(1080px,92%);margin:0 auto 48px;border-radius:20px;overflow:hidden;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.wp-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--line)}
.wp-bar>i{width:10px;height:10px;border-radius:50%;background:var(--line)}
.wp-url{flex:0 1 240px;margin-inline:12px;padding:6px 14px;border-radius:999px;background:var(--bg);color:var(--muted);font-size:13px;white-space:nowrap}
.wp-tabs{margin-inline-start:auto;display:flex;gap:4px;font-size:14px}
.wp-tabs span{padding:6px 14px;border-radius:999px;color:var(--muted)}
.wp-tabs .on{background:var(--ink);color:var(--bg)}
.wp-track{display:grid}
.wp-s{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:24px;padding:24px;align-items:stretch;box-sizing:border-box}
.wp-s+.wp-s{border-top:1px solid var(--line)}
.wp-ph{margin:0;min-height:200px;border-radius:16px;overflow:hidden}
.wp-ph img{display:block;width:100%;height:100%;object-fit:cover}
.wp-ui{display:grid;gap:12px;align-content:center}
.wp-ui h3{margin:0 0 4px;font-size:clamp(20px,1.8vw,26px)}
.wp-opt{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;box-shadow:inset 0 0 0 1px var(--line);font-size:15px}
.wp-opt i{width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--line)}
.wp-opt b{display:block;font-size:16px}
.wp-opt small{color:var(--muted);font-size:13px}
.wp-opt em{font-style:normal;font-weight:600;font-variant-numeric:tabular-nums}
.wp-opt.on{background:color-mix(in oklab,var(--accent) 12%,var(--card));box-shadow:inset 0 0 0 2px var(--accent)}
.wp-opt.on i{background:var(--accent);box-shadow:inset 0 0 0 4px var(--card)}
.wp-cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;text-align:center;font-size:14px;font-variant-numeric:tabular-nums}
.wp-cal span{padding:10px 0;border-radius:10px}
.wp-cal .h{color:var(--muted);font-size:12px;padding-block:4px}
.wp-cal .in{background:color-mix(in oklab,var(--accent) 18%,var(--card))}
.wp-cal .end{background:var(--accent);color:var(--accent-ink);font-weight:600}
.wp-sum{display:flex;justify-content:space-between;gap:16px;padding-top:12px;border-top:1px solid var(--line);font-size:15px}
.wp-sum b{font-variant-numeric:tabular-nums}
.wp-ok{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--accent);color:var(--accent-ink)}
.wp-ok svg{width:28px;height:28px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.wp-lines{display:grid;gap:6px;color:var(--muted);font-size:15px}
.wp.is-live{height:420svh}
.wp.is-live .wp-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:grid;align-content:center}
.wp.is-live .wp-copy{padding-block:0 24px}
.wp.is-live .wp-win{margin-bottom:0}
.wp.is-live .wp-view{overflow:hidden}
.wp.is-live .wp-track{display:flex;width:300%}
.wp.is-live .wp-s{flex:0 0 33.3333%;height:min(54svh,500px);border-top:0}
@media(max-width:767px){
  .wp-s{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:16px;padding:16px}
  .wp-ph{min-height:0;height:26svh}
  .wp-url{display:none}
  .wp.is-live .wp-s{height:56svh}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="wp">
  <svg class="wp-defs" width="0" height="0" aria-hidden="true" focusable="false"><filter id="wp-blur" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feGaussianBlur id="wp-gb" stdDeviation="0 0"/></filter></svg>
  <div class="wp-pin">
    <div class="wp-copy"><h2>בוחרים רכב, תאריכים, ומקבלים אישור</h2><p>מערכת ההזמנות מראה מה פנוי בזמן אמת, ואין צורך להתקשר כדי לברר.</p></div>
    <div class="wp-win" aria-hidden="true">
      <div class="wp-bar"><i></i><i></i><i></i><span class="wp-url">hizmana.example</span>
        <nav class="wp-tabs"><span class="on">רכב</span><span>תאריכים</span><span>אישור</span></nav></div>
      <div class="wp-view"><div class="wp-track">
        <section class="wp-s">
          <figure class="wp-ph"><img src="../assets/media/real/s12/van-door.webp" alt="" width="1000" height="1200" loading="lazy" decoding="async"></figure>
          <div class="wp-ui"><h3>בחרו רכב</h3>
            <div class="wp-opt on"><i></i><span><b>קרוואן קטן</b><small>מיטה זוגית ומטבחון</small></span><em>420 ₪</em></div>
            <div class="wp-opt"><i></i><span><b>קרוואן משפחתי</b><small>עד ארבעה אנשים</small></span><em>560 ₪</em></div>
            <div class="wp-opt"><i></i><span><b>ואן מטייל</b><small>מושבים מתקפלים</small></span><em>380 ₪</em></div>
          </div>
        </section>
        <section class="wp-s">
          <figure class="wp-ph"><img src="../assets/media/real/s12/hero-window.webp" alt="" width="1100" height="1100" loading="lazy" decoding="async"></figure>
          <div class="wp-ui"><h3>בחרו תאריכים</h3>
            <div class="wp-cal"><span class="h">א׳</span><span class="h">ב׳</span><span class="h">ג׳</span><span class="h">ד׳</span><span class="h">ה׳</span><span class="h">ו׳</span><span class="h">ש׳</span>
              <span>7</span><span>8</span><span class="end">9</span><span class="in">10</span><span class="in">11</span><span class="in">12</span><span class="end">13</span>
              <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span></div>
            <div class="wp-sum"><span>ארבעה לילות</span><b>1,680 ₪</b></div>
          </div>
        </section>
        <section class="wp-s">
          <figure class="wp-ph"><img src="../assets/media/real/s12/dusk-camp.webp" alt="" width="1000" height="1000" loading="lazy" decoding="async"></figure>
          <div class="wp-ui"><span class="wp-ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><h3>ההזמנה אושרה</h3>
            <div class="wp-lines"><span>קרוואן קטן, ארבעה לילות</span><span>איסוף ביום שלישי בעשר בבוקר</span><span>פרטי האישור נשלחו למייל</span></div>
          </div>
        </section>
      </div></div>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP שלושת המסכים זה מתחת לזה
  const root=document.querySelector(".wp"),view=root.querySelector(".wp-view"),track=root.querySelector(".wp-track"),
    tabs=[...root.querySelectorAll(".wp-tabs span")],gb=document.getElementById("wp-gb"),n=tabs.length;
  // בהפחתת תנועה הפונקציה לא רצה, והמסכים נשארים זה מתחת לזה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const dir=getComputedStyle(root).direction==="rtl"?1:-1;      // בעברית המסך הבא משמאל, והמסילה זזה ימינה
    const o={i:0};let w=view.clientWidth,last=0,vel=0,on=-1;
    const place=()=>{
      gsap.set(track,{x:o.i*w*dir});
      const k=Math.round(o.i);
      if(k!==on){on=k;tabs.forEach((t,j)=>t.classList.toggle("on",j===k));}
    };
    const blur=s=>{gb.setAttribute("stdDeviation",s.toFixed(1)+" 0");view.style.filter=s>.4?"url(#wp-blur)":"";};
    // המהירות נמדדת מהפרש הפריימים, ולכן הטשטוש דועך לבד כשהגלילה נעצרת
    const tick=()=>{
      const dx=Math.abs(o.i-last)*w;last=o.i;vel+=(dx-vel)*.3;
      if(vel>.5||view.style.filter)blur(Math.min(vel*.45,14));
    };
    gsap.ticker.add(tick);
    const size=()=>{w=view.clientWidth;place();};
    ScrollTrigger.addEventListener("refresh",size);size();
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5}});
    tl.to({},{duration:1});
    for(let j=1;j<n;j++)tl.to(o,{i:j,duration:.5,ease:"expo.inOut",onUpdate:place}).to({},{duration:1});
    return()=>{gsap.ticker.remove(tick);ScrollTrigger.removeEventListener("refresh",size);root.classList.remove("is-live");
      view.style.filter="";gsap.set(track,{clearProps:"transform"});tabs.forEach((t,j)=>t.classList.toggle("on",j===0));};
  });
})();`
},
{
  id:"g222", cat:"gsap", name:"שם שמתכווץ לקו דק ונפתח לסקשן הבא", tech:"GSAP · ScrollTrigger scrub · clip-path", status:"מאושר-עין",
  desc:"שם הסטודיו בגדול על רקע כהה. בגלילה הוא נמעך לגובה אפס ונהפך לקו אור דק, כמו מסך ישן שנכבה. הקו מתארך לרוחב המסך, ואז נפתח מהמרכז למעלה ולמטה כמו עפעפיים, ובמרווח שנפתח מופיע הסקשן הבא עם התמונה והטקסט שלו.",
  when:"פתיחה או מעבר ראשון של אתר סטודיו, צילום, עיצוב או אדריכלות, שמתחיל בשם ואז נכנס לעבודה. מעבר דרמטי, לכן פעם אחת בעמוד ובין שני סקשנים שיש להם משקל.",
  note:"**שחזור.** השראה: שני סרטוני הצגה ב-prompt-motion.com (21.10.2026), באחד שם נמעך לקו אור והולך לשחור ובשני קו דק נפתח לפאנל בהיר. נבנה מאפס מהצפייה, כמהלך אחד שמחבר את שני החצאים. **שלושה שלבים בטיימליין אחד:** (1) השם נמעך ב-`scaleY` עד כמעט אפס, והשורה שמתחתיו דוהה. (2) קו אור (`.so-line`) לוקח את מקומו ברוחב השם ומתארך לרוחב המסך, עם `box-shadow` זוהר בצבע המותג. (3) הסקשן השני נחשף ב-`clip-path:inset(50% 0)` שנפתח ל-`inset(0)`, והקו נמוג בפתיחה. **הרוחב ההתחלתי של הקו** נמדד מהשם עצמו (`offsetWidth`), כדי שהמעבר מהשם לקו לא יקפוץ. **בלי GSAP ובהפחתת תנועה** שני הסקשנים זה מתחת לזה והקו לא קיים. **כשהמהלך רץ** הבמה נעוצה ויש לה מסלול של כשלושה מסכים. **כפרילודר:** אותו קו, בלי גלילה: טיימליין של שנייה וחצי שמופעל בטעינה ומתנקה מיד (ראו g15b לעקרון של פרילודר שלא חוסם). **כיוון:** המהלך אנכי ולכן אין מה להפוך באתר משמאל לימין. **נגישות:** השם נשאר טקסט אמיתי (`h2`), והקו הוא קישוט (`aria-hidden`).",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שני הסקשנים זה מתחת לזה. ההצמדה, הקו והחיתוך רק כשהמהלך רץ (.is-live) */
.so{position:relative}
.so-a{display:grid;place-content:center;justify-items:center;gap:16px;min-height:70svh;padding:var(--gutter);background:var(--ink);color:var(--bg);text-align:center}
.so-word{margin:0;font-size:clamp(72px,14vw,220px);font-weight:700;line-height:1;letter-spacing:-.02em}
.so-tag{margin:0;font-size:var(--fs-body);color:color-mix(in oklab,var(--bg) 72%,transparent)}
.so-b{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);min-height:80svh;padding:var(--gutter);background:var(--bg);color:var(--ink)}
.so-txt{display:grid;gap:14px;max-width:40ch;justify-self:center}
.so-txt h2{margin:0;font-size:clamp(32px,3.8vw,60px);font-weight:700;line-height:1.08;text-wrap:balance}
.so-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.so-photo{margin:0;justify-self:center;width:100%;max-width:560px;aspect-ratio:5/4;max-height:68svh;overflow:hidden;border-radius:24px}
.so-photo img{display:block;width:100%;height:100%;object-fit:cover}
.so-line{display:none}
.so.is-live{height:300svh}
.so.is-live .so-pin{position:sticky;top:0;height:100svh;overflow:hidden;background:var(--ink)}
.so.is-live .so-a,.so.is-live .so-b{position:absolute;inset:0;min-height:0}
.so.is-live .so-b{clip-path:inset(50% 0 50% 0)}
.so.is-live .so-line{display:block;position:absolute;inset-inline:0;top:50%;height:2px;translate:0 -50%;z-index:2;pointer-events:none;
  background:var(--bg);box-shadow:0 0 24px 4px color-mix(in oklab,var(--accent) 70%,transparent),0 0 2px 0 var(--bg);opacity:0}
@media(max-width:767px){
  .so-b{grid-template-columns:minmax(0,1fr);align-content:center;gap:20px}
  .so-photo{order:-1;aspect-ratio:16/10;max-height:34svh}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="so">
  <div class="so-pin">
    <section class="so-a"><h2 class="so-word">סטודיו נור</h2><p class="so-tag">צילום אדריכלות ופנים</p></section>
    <section class="so-b">
      <div class="so-txt"><h2>מצלמים את הדירה כשהאור נכנס אליה</h2><p>כל צילום נקבע לשעה שבה החדר נראה הכי טוב. בדרך כלל זה בוקר, ולפעמים הרבה לפני שהדיירים קמים.</p></div>
      <figure class="so-photo"><img src="../assets/media/real/s02/night-room.webp" alt="חדר שינה לבן עם מנורות קש תלויות" width="2000" height="1333" loading="lazy" decoding="async"></figure>
    </section>
    <span class="so-line" aria-hidden="true"></span>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP שני הסקשנים זה מתחת לזה
  const root=document.querySelector(".so"),pin=root.querySelector(".so-pin"),A=root.querySelector(".so-a"),B=root.querySelector(".so-b"),
    word=root.querySelector(".so-word"),tag=root.querySelector(".so-tag"),line=root.querySelector(".so-line"),img=B.querySelector("img");
  // בהפחתת תנועה הפונקציה לא רצה, והסקשנים נשארים זה מתחת לזה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    // הקו מתחיל ברוחב השם עצמו, כך שהמעבר מהשם לקו לא קופץ
    const ratio=()=>Math.min(word.offsetWidth/pin.clientWidth,1);
    gsap.set(line,{scaleX:ratio,opacity:0});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    tl.to({},{duration:.12})
      .to(tag,{opacity:0,duration:.1})
      .to(word,{scaleY:.012,scaleX:1.04,duration:.26,ease:"power3.in"},"<")
      .to(word,{opacity:0,duration:.04},">-.04")
      .to(line,{opacity:1,duration:.04},"<")
      .to(line,{scaleX:1,duration:.22,ease:"power2.out"},">")
      .to({},{duration:.1})
      .fromTo(B,{clipPath:"inset(50% 0% 50% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:.5,ease:"power2.inOut"})
      .fromTo(img,{scale:1.18},{scale:1,duration:.5},"<")
      .to(line,{opacity:0,duration:.14},"<.04")
      .to({},{duration:.1});
    return()=>{root.classList.remove("is-live");gsap.set([word,tag,line,B,img],{clearProps:"all"});};
  });
})();`
},
{
  id:"g223", cat:"gsap", name:"תמונה מלאה שמצטמצמת לפאנל ליד טקסט", tech:"GSAP · ScrollTrigger scrub · sticky · flex-basis", status:"מאושר-עין",
  desc:"תמונה אחת על כל המסך עם כותרת. בגלילה תמונה שנייה נכנסת מהצד הימני ותופסת את המקום, ואז היא מצטמצמת לצד אחד והמסך נחתך לשני פאנלים: התמונה ובצדה משטח כהה עם פרטי הפרויקט. קווי שיער נמתחים על המשטח ומסדרים אותו.",
  when:"תיק עבודות, מקרי בוחן או גלריית פרויקטים שבה כל פרויקט מקבל רגע משלו: תמונה גדולה, ואז הפרטים. מתאים לאדריכלות, עיצוב פנים, צילום, בנייה. פעם אחת בעמוד, על פרויקט מוביל.",
  note:"**שחזור.** השראה: סרטון הצגה של סטודיו ב-prompt-motion.com (21.10.2026), שבו תמונה מלאה מצטמצמת ונהפכת למסך מפוצל עם משטח כהה ופרטים. נבנה מאפס מהצפייה. **המצב הסופי הוא המארקאפ:** בלי GSAP ובהפחתת תנועה רואים תמונה (56%) ומשטח כהה (44%), ואת הפרויקט המלא. הסצנה הפותחת (התמונה המלאה עם הכותרת) היא שכבה שמופיעה רק כשהמהלך רץ, ומסומנת `aria-hidden` כי היא טיזר של אותו תוכן. **המעבר בשלושה צעדים:** (1) התמונה השנייה זזה מהקצה הימני (`xPercent` מ-100 ל-0) כשהראשונה נסוגה מעט. (2) אזור המדיה מצטמצם מ-100% ל-56% דרך `flex-basis`, והתמונות נחתכות ב-`object-fit:cover` בלי להימתח. (3) התוכן נכנס. **המשטח לא זורם מחדש בזמן הצמצום:** התוכן שלו ברוחב קבוע ב-`cqw` של הבמה, מעוגן לקצה שליד התמונה, ולכן הוא נחשף מאחורי התמונה במקום להיעטף מחדש. **בלי קווי קישוט על המשטח** (הכלל של קווים ומסגרות): ההפרדה באה מהמשטח הכהה עצמו. **בטלפון** הפאנלים זה מעל זה וה-`flex-basis` הוא גובה (100% ל-46%). **כיוון:** התמונה בצד הימני, המשטח משמאל, והחדשה נכנסת מימין. באתר משמאל לימין הופכים את שלושתם. **הסימון \"2 מתוך 4\"** הוא מידע (מיקום בסדרה) ולא קישוט.",
  libs:["gsap","ScrollTrigger"],
  css:`/* המצב הסופי: תמונה ומשטח כהה זה לצד זה. הסצנה הפותחת והמסלול רק כשהמהלך רץ (.is-live) */
.sp{position:relative}
.sp-pin{position:relative;display:flex;min-height:80svh;container-type:inline-size}
.sp-media{position:relative;flex:0 0 56%;overflow:hidden;background:var(--ink)}
.sp-media figure{position:absolute;inset:0;margin:0}
.sp-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sp-a{display:none}
.sp-a::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,color-mix(in oklab,var(--ink) 78%,transparent),transparent 62%)}
.sp-a figcaption{position:absolute;z-index:1;inset-inline:0;bottom:0;display:grid;gap:8px;padding:var(--gutter);color:var(--bg)}
.sp-a h2{margin:0;font-size:clamp(34px,4.6vw,72px);font-weight:700;line-height:1.05;text-wrap:balance}
.sp-a p{margin:0;font-size:var(--fs-body)}
.sp-panel{position:relative;flex:1;overflow:hidden;background:var(--ink);color:var(--bg)}
.sp-in{position:absolute;inset-block:0;inset-inline-start:0;width:44cqw;box-sizing:border-box;display:grid;align-content:center;gap:16px;padding:var(--gutter)}
.sp-idx{margin:0;font-size:14px;color:color-mix(in oklab,var(--bg) 65%,transparent)}
.sp-in h3{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.08;text-wrap:balance}
.sp-in>p{margin:0;max-width:36ch;font-size:var(--fs-body);line-height:1.55;color:color-mix(in oklab,var(--bg) 80%,transparent)}
.sp-dl{display:grid;margin:8px 0 0}
.sp-dl>div{display:flex;justify-content:space-between;gap:16px;padding-block:14px;font-size:16px}
.sp-dl dt{color:color-mix(in oklab,var(--bg) 62%,transparent)}
.sp-dl dd{margin:0}
.sp-h1{top:14%}.sp-h2{top:86%}
.sp.is-live{height:320svh}
.sp.is-live .sp-pin{position:sticky;top:0;height:100svh;min-height:0;overflow:hidden}
.sp.is-live .sp-media{flex-basis:100%}
.sp.is-live .sp-a{display:block}
@media(max-width:767px){
  .sp-pin{flex-direction:column;container-type:normal}
  .sp-media{flex:0 0 46svh}
  .sp-in{position:relative;inset:auto;width:auto;align-content:start;padding-block:24px}
  .sp.is-live .sp-in{position:absolute;inset-block:0;inset-inline:0;width:auto}
  .sp-dl>div{padding-block:10px}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="sp">
  <div class="sp-pin">
    <div class="sp-media">
      <figure class="sp-a" aria-hidden="true">
        <img src="../assets/media/real/s13/proj-a.webp" alt="" width="1800" height="1200" loading="lazy" decoding="async">
        <figcaption><h2>בית פרטי ברמת השרון</h2><p>סלון שנפתח אל הנוף</p></figcaption>
      </figure>
      <figure class="sp-b"><img src="../assets/media/real/s13/proj-c.webp" alt="מטבח כהה עם אי ושיש ותאורה תלויה" width="2400" height="1026" loading="lazy" decoding="async"></figure>
    </div>
    <aside class="sp-panel">
      <div class="sp-in">
        <p class="sp-idx">פרויקט 2 מתוך 4</p>
        <h3>מטבח בהרצליה</h3>
        <p>דירה של שבעים מטרים, שבה המטבח הפך מחדר צדדי לחדר שכולם מתכנסים בו.</p>
        <dl class="sp-dl"><div><dt>שטח</dt><dd>24 מ״ר</dd></div><div><dt>משך העבודה</dt><dd>שישה שבועות</dd></div><div><dt>חומרים</dt><dd>שיש, אלון ופלדה</dd></div></dl>
      </div>
    </aside>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשאר המסך המפוצל הסופי
  const root=document.querySelector(".sp"),media=root.querySelector(".sp-media"),A=root.querySelector(".sp-a"),B=root.querySelector(".sp-b"),
    inner=root.querySelector(".sp-in");
  // בהפחתת תנועה הפונקציה לא רצה, והמסך המפוצל מוצג מיד
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const mob=ctx.conditions.mob,rtl=getComputedStyle(root).direction==="rtl";
    root.classList.add("is-live");
    const tl=gsap.timeline({defaults:{ease:"power3.inOut"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.to({},{duration:.12})
      .fromTo(B,{xPercent:rtl?100:-100},{xPercent:0,duration:.3},">")
      .to(A,{xPercent:rtl?-16:16,duration:.3},"<")
      .to({},{duration:.1})
      .fromTo(media,{flexBasis:"100%"},{flexBasis:mob?"46%":"56%",duration:.34},">")
      .fromTo(inner,{opacity:0,x:rtl?36:-36},{opacity:1,x:0,duration:.24,ease:"power2.out"},"<.12")
      .to({},{duration:.14});
    return()=>{root.classList.remove("is-live");gsap.set([media,A,B,inner],{clearProps:"all"});};
  });
})();`
},
{
  id:"g224", cat:"gsap", name:"מחיקה מעגלית כמו מחוג שמחליפה מספר", tech:"GSAP · ScrollTrigger scrub · conic-gradient mask", status:"מאושר-עין",
  desc:"עיגול גדול עם טבעת דקה וסימני שעון, ובמרכזו מספר ענק. בגלילה מחוג דק מסתובב סביב המרכז, ומאחוריו המספר הבא מחליף את הקודם בצבע אחר, פלח אחר פלח, כמו שעון שנסגר. קו אור אופקי מהבהב על פני המסך בכל סיבוב, והטקסט שלצד העיגול מתחלף יחד איתו.",
  when:"תהליך עבודה בשלושה שלבים ברורים: ייעוץ, תכנון, ביצוע. כל מקום שבו המספר הוא מידע ולא קישוט, ושלושה שלבים באים אחד אחרי השני. מתאים גם לספירה לאחור של הצעה או מבצע.",
  note:"**שחזור.** השראה: שלושה סרטונים ב-prompt-motion.com (21.10.2026) שבהם טבעת דקה מקיפה מספר גדול ופלח מעגלי מחליף אותו במספר הבא, בליווי הבזק אור אופקי. נבנה מאפס מהצפייה. **המספרים הם שלוש שכבות זו על זו**, לכל אחת דיסק רקע אטום משלה ו-`mask-image:conic-gradient(#000 var(--a), transparent 0)`. השכבה העליונה נחתכת לפלח שגדל מ-0 ל-360 מעלות, ומאחוריו נראית הקודמת. דיסק אטום הכרחי: בלעדיו הספרה הישנה הייתה נראית דרך הספרה החדשה. **`--a` מתעדכן מ-GSAP** (`style.setProperty`), לא דרך `@property`, ולכן זה עובד גם בדפדפנים בלי תמיכה בהנפשת משתנים. **מחוג וקשת:** קו דק מסתובב סביב אותה נקודה (`rotate`), וקשת צבועה על הטבעת (`stroke-dasharray`) נמתחת איתו. **בלי GSAP ובהפחתת תנועה** רואים את המספר האחרון (3) ואת שלושת השלבים כרשימה, כל אחד עם התווית \"שלב\" שלו. **כשהמהלך רץ** הבמה נעוצה והשלבים נערמים באותו תא בגריד ועולים בתור. **כיוון:** המחוג מסתובב עם כיוון השעון גם באתר בעברית, כי שעונים לא מתהפכים. **נגישות:** העיגול והמספרים הם איור (`aria-hidden`), והמספר נמצא בתווית של כל שלב ברשימה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: העיגול מציג את המספר האחרון, והשלבים רשימה. ההצמדה והחיתוך רק כשהמהלך רץ (.is-live) */
.ck{position:relative}
.ck-pin{position:relative;display:grid;place-items:center;min-height:80svh}
.ck-grid{width:100%;max-width:1120px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px);padding:var(--gutter)}
.ck-copy{display:grid;gap:28px}
.ck-copy h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;text-wrap:balance}
.ck-steps{list-style:none;margin:0;padding:0;display:grid;gap:28px}
.ck-k{font-size:14px;font-weight:600;color:var(--muted)}
.ck-steps h3{margin:4px 0 8px;font-size:clamp(22px,2vw,30px)}
.ck-steps p{margin:0;max-width:38ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ck-dial{position:relative;justify-self:center;width:min(100%,520px,60svh);aspect-ratio:1;container-type:size}
.ck-ring{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.ck-ring circle{fill:none}
.ck-c0{stroke:var(--ink);stroke-width:.4}
.ck-tk{stroke:color-mix(in oklab,var(--ink) 55%,transparent);stroke-width:3;stroke-dasharray:.06 .94}
.ck-arc{stroke:var(--accent);stroke-width:1.6;stroke-linecap:round;opacity:0}
.ck-n{position:absolute;inset:8%;display:grid;place-items:center;border-radius:50%;font-size:56cqw;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;
  -webkit-mask-image:conic-gradient(#000 var(--a,360deg),transparent 0);mask-image:conic-gradient(#000 var(--a,360deg),transparent 0)}
.ck-n1{background:var(--card);color:var(--ink)}
.ck-n2{background:var(--ink);color:var(--bg)}
.ck-n3{background:var(--accent);color:var(--accent-ink)}
.ck-hand{position:absolute;left:calc(50% - 1px);top:8%;width:2px;height:42%;border-radius:2px;background:var(--accent);transform-origin:50% 100%;opacity:0;pointer-events:none}
.ck-flare{display:none}
.ck.is-live{height:320svh}
.ck.is-live .ck-pin{position:sticky;top:0;height:100svh;min-height:0;overflow:hidden}
.ck.is-live .ck-steps{gap:0}
.ck.is-live .ck-steps li{grid-area:1/1;align-self:start}
.ck.is-live .ck-flare{display:block;position:absolute;inset-inline:0;top:50%;height:2px;translate:0 -50%;z-index:2;pointer-events:none;opacity:0;
  background:linear-gradient(to right,transparent,var(--accent) 28%,var(--accent) 72%,transparent);box-shadow:0 0 20px 3px color-mix(in oklab,var(--accent) 60%,transparent)}
@media(max-width:767px){
  .ck-grid{grid-template-columns:minmax(0,1fr);gap:24px}
  .ck-dial{order:-1;width:min(70vw,36svh)}
  .ck.is-live .ck-copy{gap:16px}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="ck">
  <div class="ck-pin">
    <div class="ck-grid">
      <div class="ck-copy">
        <h2>משכנתא בשלושה שלבים, מהשיחה הראשונה ועד החתימה</h2>
        <ol class="ck-steps">
          <li><span class="ck-k">שלב 1</span><h3>שיחת היכרות</h3><p>מספרים לנו על הדירה, על ההכנסות ועל ההחזר החודשי שנוח לכם. השיחה אורכת חצי שעה.</p></li>
          <li><span class="ck-k">שלב 2</span><h3>השוואה בין הבנקים</h3><p>מבקשים הצעות משישה בנקים ומציגים אותן בטבלה אחת, עם ההחזר החודשי והריבית הכוללת.</p></li>
          <li><span class="ck-k">שלב 3</span><h3>חתימה וליווי</h3><p>מלווים אתכם עד החתימה בבנק, ואחריה בודקים מדי שנה אם כדאי למחזר.</p></li>
        </ol>
      </div>
      <div class="ck-dial" aria-hidden="true">
        <svg class="ck-ring" viewBox="0 0 100 100"><circle class="ck-c0" cx="50" cy="50" r="49.6"/><circle class="ck-tk" cx="50" cy="50" r="46" pathLength="60"/><circle class="ck-arc" cx="50" cy="50" r="49.6" pathLength="1" stroke-dasharray="0 1" transform="rotate(-90 50 50)"/></svg>
        <span class="ck-n ck-n1">1</span><span class="ck-n ck-n2">2</span><span class="ck-n ck-n3">3</span>
        <i class="ck-hand"></i>
      </div>
    </div>
    <i class="ck-flare" aria-hidden="true"></i>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP העיגול מציג את המספר האחרון
  const root=document.querySelector(".ck"),n2=root.querySelector(".ck-n2"),n3=root.querySelector(".ck-n3"),hand=root.querySelector(".ck-hand"),
    arc=root.querySelector(".ck-arc"),flare=root.querySelector(".ck-flare"),li=[...root.querySelectorAll(".ck-steps li")];
  // בהפחתת תנועה הפונקציה לא רצה, והמספר האחרון והרשימה מוצגים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const o={a:0,b:0};
    const draw=()=>{
      n2.style.setProperty("--a",o.a+"deg");n3.style.setProperty("--a",o.b+"deg");
      const cur=o.b>0?o.b:o.a,run=cur>0&&cur<360;
      hand.style.rotate=cur+"deg";hand.style.opacity=run?1:0;
      arc.setAttribute("stroke-dasharray",(run?cur/360:0)+" 1");arc.style.opacity=run?1:0;
      flare.style.opacity=run?Math.sin(Math.PI*cur/360)*.9:0;
    };
    gsap.set(li.slice(1),{autoAlpha:0});draw();
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.to({},{duration:.4})
      .to(o,{a:360,duration:.9,ease:"power2.inOut",onUpdate:draw})
      .to(li[0],{autoAlpha:0,duration:.25,ease:"power1.in"},"<.15")
      .to(li[1],{autoAlpha:1,duration:.3,ease:"power1.out"},"<.3")
      .to({},{duration:.7})
      .to(o,{b:360,duration:.9,ease:"power2.inOut",onUpdate:draw})
      .to(li[1],{autoAlpha:0,duration:.25,ease:"power1.in"},"<.15")
      .to(li[2],{autoAlpha:1,duration:.3,ease:"power1.out"},"<.3")
      .to({},{duration:.7});
    return()=>{root.classList.remove("is-live");[n2,n3].forEach(e=>e.style.removeProperty("--a"));
      hand.style.cssText="";flare.style.cssText="";arc.style.cssText="";arc.setAttribute("stroke-dasharray","0 1");gsap.set(li,{clearProps:"all"});};
  });
})();`
},
{
  id:"g225", cat:"gsap", name:"מונה לאחור על מסך פתיחה קצר", tech:"GSAP timeline · SVG stroke · ScrollTrigger once", status:"מאושר-עין",
  desc:"מסך פתיחה כהה ובמרכזו מספר ענק עם צל קשיח בצבע המותג, בתוך טבעת דקה עם סימני שעון. הוא סופר שלוש, שתיים, אחת, כשהטבעת נצבעת עם הזמן, ואז המסך כולו מתרומם ומגלה את האתר, שכל חלקיו נכנסים מיד אחריו. כל זה במהירות של שנייה וחצי.",
  when:"אתר חוויה, סטודיו, השקה או אירוע שמתחילים בדרמה קצרה לפני הדף. רק כשהדף באמת נטען לאט מהמסך, או פעם אחת בכל ביקור. באתר שבו המבקר מחפש תשובה מהר, אל תשתמשו בו.",
  note:"**שחזור.** השראה: שלושה סרטונים ב-prompt-motion.com (21.10.2026) שנפתחים במספר ענק עם צל קשיח בתוך עיגול דק לפני שהסצנה מתחילה. נבנה מאפס מהצפייה. **לא חוסם:** כל ההפעלה היא 3 x 0.42 שניות עם 0.6 שניות הרמה, ולפחות 40 אחוז מהזמן הזה כבר חושף את התוכן. המסך עם `pointer-events:none` תמיד, כך שגם בלחיצה מוקדמת לא נתקעים. **בפרויקט:** מפעילים בטעינה (`play()` ישיר) ובתנאי של ביקור ראשון (`sessionStorage`), לא מחכים ל-ScrollTrigger. כאן ה-ScrollTrigger נמצא רק כדי שהדמו ירוץ כשרואים אותו. **בלי GSAP ובהפחתת תנועה** המסך לא מופיע בכלל והאתר מוצג מיד (התנאי הוא `display:none` כברירת מחדל, והמחלקה מופעלת רק בסקריפט). **הצל הקשיח** הוא `text-shadow` ללא טשטוש, והטבעת נצבעת ב-`stroke-dashoffset` על נתיב עם `pathLength=1`. **כפתור \"הפעלה חוזרת\"** שייך לדמו בלבד: הוא כפתור אמיתי, עובד במקלדת, ואפשר להסיר אותו בפרויקט. **נגישות:** המסך כולו `aria-hidden`, והתוכן שמאחוריו תמיד קיים ב-DOM ונגיש גם בזמן הספירה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: אין מסך פתיחה, האתר מוצג מיד. המסך מופיע רק כשהסקריפט מפעיל .is-armed */
.cd{position:relative;max-width:1180px;margin-inline:auto;padding:var(--gutter);display:grid;gap:16px;justify-items:start}
.cd-site{position:relative;overflow:hidden;width:100%;box-sizing:border-box;min-height:min(76svh,680px);display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,72px);padding:clamp(24px,5vw,72px);border-radius:28px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.cd-copy{display:grid;gap:16px;justify-items:start}
.cd-copy h2{margin:0;font-size:clamp(32px,4vw,64px);font-weight:700;line-height:1.05;text-wrap:balance}
.cd-copy p{margin:0;max-width:38ch;color:var(--muted);font-size:var(--fs-body);line-height:1.55}
.cd-cta{display:inline-flex;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.cd-photo{margin:0;aspect-ratio:4/3;border-radius:20px;overflow:hidden}
.cd-photo img{display:block;width:100%;height:100%;object-fit:cover}
.cd-over{display:none;position:absolute;inset:0;z-index:3;place-items:center;background:var(--ink);color:var(--bg);pointer-events:none}
.cd.is-armed .cd-over{display:grid}
.cd-dial{position:relative;display:grid;place-items:center;width:min(78%,420px,64svh);aspect-ratio:1;container-type:size}
.cd-ring{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.cd-ring circle{fill:none}
.cd-t0{stroke:color-mix(in oklab,var(--bg) 26%,transparent);stroke-width:.4}
.cd-tk{stroke:color-mix(in oklab,var(--bg) 50%,transparent);stroke-width:3;stroke-dasharray:.06 .94}
.cd-arc{stroke:var(--accent);stroke-width:1.4;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1}
.cd-num{font-size:62cqw;font-weight:800;line-height:1;font-variant-numeric:tabular-nums;text-shadow:.05em .05em 0 var(--accent)}
.cd-replay{padding:12px 24px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-weight:600;cursor:pointer}
.cd-replay[hidden]{display:none}
.cd-replay:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
@media(max-width:767px){
  .cd-site{grid-template-columns:minmax(0,1fr);align-content:center;min-height:min(80svh,720px)}
  .cd-photo{order:-1;aspect-ratio:16/10}
}`,
  html:`<div class="stage full" style="padding-block:0"><div class="cd">
  <div class="cd-site">
    <div class="cd-copy">
      <h2>הפלגות שקיעה מנמל הרצליה</h2>
      <p>יציאה כל ערב, שעתיים על הים, עם יין וכיבוד קל. עד שמונה אנשים בסירה.</p>
      <a class="cd-cta" href="#">לבדיקת מועדים</a>
    </div>
    <figure class="cd-photo"><img src="../assets/media/real/s08/hero.webp" alt="שקיעה כתומה מעל הים" width="2560" height="1707" loading="lazy" decoding="async"></figure>
    <div class="cd-over" aria-hidden="true">
      <div class="cd-dial">
        <svg class="cd-ring" viewBox="0 0 100 100"><circle class="cd-t0" cx="50" cy="50" r="49.6"/><circle class="cd-tk" cx="50" cy="50" r="46" pathLength="60"/><circle class="cd-arc" cx="50" cy="50" r="49.6" pathLength="1" transform="rotate(-90 50 50)"/></svg>
        <span class="cd-num">3</span>
      </div>
    </div>
  </div>
  <button class="cd-replay" type="button" hidden>הפעלה חוזרת של הספירה</button>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP אין מסך פתיחה
  const root=document.querySelector(".cd"),site=root.querySelector(".cd-site"),over=root.querySelector(".cd-over"),num=root.querySelector(".cd-num"),
    arc=root.querySelector(".cd-arc"),btn=root.querySelector(".cd-replay"),parts=root.querySelectorAll(".cd-copy>*,.cd-photo");
  // בהפחתת תנועה הפונקציה לא רצה, ולכן המסך לא מופיע והאתר מוצג מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const STEP=.42;let tl=null;
    const arm=()=>{root.classList.add("is-armed");num.textContent="3";gsap.set(over,{yPercent:0});gsap.set(arc,{strokeDashoffset:1});gsap.set(parts,{opacity:0});btn.hidden=true;};
    // בפרויקט קוראים ל-play() בטעינה, ובביקור ראשון בלבד
    const play=()=>{
      if(tl)tl.kill();
      tl=gsap.timeline({onComplete:()=>{root.classList.remove("is-armed");btn.hidden=false;}});
      [3,2,1].forEach((v,i)=>{
        tl.call(()=>{num.textContent=v;},null,i*STEP)
          .fromTo(num,{scale:1.16,opacity:0},{scale:1,opacity:1,duration:.2,ease:"power3.out"},i*STEP);
      });
      tl.to(arc,{strokeDashoffset:0,duration:STEP*3,ease:"none"},0)
        .to(over,{yPercent:-100,duration:.6,ease:"power3.inOut"},STEP*3+.04)
        .to(parts,{opacity:1,y:0,duration:.5,ease:"power2.out",stagger:.08},STEP*3+.2);
      gsap.set(parts,{y:24});
    };
    arm();
    const st=ScrollTrigger.create({trigger:site,start:"top 70%",once:true,onEnter:play});
    btn.addEventListener("click",()=>{arm();play();});
    return()=>{st.kill();if(tl)tl.kill();root.classList.remove("is-armed");btn.hidden=true;gsap.set([over,num,arc,parts],{clearProps:"all"});};
  });
})();`
},
{
  id:"g226", cat:"gsap", name:"תמונה מוטה שעפה אל הצופה עם טשטוש רדיאלי", tech:"GSAP · ScrollTrigger scrub · עותקי תמונה + קרניים", status:"מאושר-עין",
  desc:"תמונה קטנה ומוטה במרכז המסך. בגלילה היא מסתובבת ישר ומתקרבת אל הצופה, ומסביבה נמתחים עותקים חיוורים וקרני אור שיוצאות מהמרכז, כמו צילום בזום מהיר. כשהיא נוחתת במקומה, הקרניים נעלמות והמספר שלצדה כבר קפץ לערך גדול.",
  when:"סקשן הוכחה או פתיחה של אתר מוצר, צילום או מותג עם תמונה אחת חזקה ונתון אחד גדול: כמה לקוחות, כמה מוצרים, כמה שנים. פעם אחת בעמוד. בטלפון זה רק התקרבות וסיבוב, בלי הטשטוש.",
  note:"**שחזור.** השראה: סרטון מותג ב-prompt-motion.com (21.10.2026) שבו אריח מוטה מסתובב וזוכה לזום רדיאלי כשמספר קופץ לערך ענק. נבנה מאפס מהצפייה, **בלי canvas ובלי WebGL:** הטשטוש הרדיאלי הוא שישה עותקי תמונה חיוורים מאחורי התמונה, כל אחד מוגדל מעט יותר ושקוף יותר, ושכבת קרניים (`repeating-conic-gradient` עם מסכה רדיאלית) שסביבה. כל זה `transform` ו-`opacity` בלבד. **העוצמה** נגזרת מהקטע האמצעי של התנועה (`sin(π·t)`): אפס בהתחלה ובסוף, ולכן התמונה נוחתת חדה לגמרי. **עדין בכוונה:** העותק החיצוני מוגדל ב-21% לכל היותר, והשקיפות של כל עותק נמוכה. **המספר** עולה בשלב האמצעי ומוצג תמיד כמספר שלם. **בלי GSAP ובהפחתת תנועה** התמונה במנוחה והמספר הסופי, ואין עותקים וקרניים. **בטלפון** (עד 767 פיקסלים) אין עותקים וקרניים, כדי לחסוך ציור, והאריח רק מסתובב ומתקרב. **נגישות:** העותקים והקרניים קישוט (`aria-hidden`), והמספר הרץ מוסתר מקורא מסך ובמקומו המספר הסופי בטקסט מוסתר.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: התמונה במנוחה והמספר הסופי. העותקים, הקרניים וההצמדה רק כשהמהלך רץ (.is-live) */
.zb{position:relative}
.zb-pin{position:relative;display:grid;justify-items:center;align-content:center;gap:28px;min-height:84svh;padding:var(--gutter);overflow:hidden}
.zb-tile{position:relative;width:min(820px,88%);aspect-ratio:3/2;border-radius:24px;will-change:transform}
.zb-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit}
.zb-ghost{pointer-events:none}
.zb-rays{display:none;position:absolute;inset:-30%;pointer-events:none;opacity:0;
  background:repeating-conic-gradient(from 0deg,color-mix(in oklab,var(--ink) 60%,transparent) 0 .4deg,transparent .4deg 3deg);
  -webkit-mask-image:radial-gradient(circle,transparent 30%,#000 60%,transparent 82%);mask-image:radial-gradient(circle,transparent 30%,#000 60%,transparent 82%)}
.zb-count{position:relative;margin:0;display:flex;align-items:baseline;gap:14px;font-size:var(--fs-body);color:var(--muted)}
.zb-count b{min-width:5ch;font-size:clamp(48px,7vw,104px);font-weight:700;line-height:1;letter-spacing:-.02em;color:var(--ink);font-variant-numeric:tabular-nums}
.zb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.zb.is-live{height:300svh}
.zb.is-live .zb-pin{position:sticky;top:0;height:100svh;min-height:0}
.zb.is-live .zb-rays{display:block}
@media(max-width:767px){.zb-rays{display:none!important}}`,
  html:`<div class="stage full" style="padding-block:0"><div class="zb">
  <div class="zb-pin">
    <span class="zb-rays" aria-hidden="true"></span>
    <div class="zb-tile"><img class="zb-img" src="../assets/media/real/s01/hero-dial.webp" alt="יד מכוונת את גלגל הצמצם של מצלמה" width="1900" height="1267" loading="lazy" decoding="async"></div>
    <p class="zb-count"><b aria-hidden="true" data-to="12480">12,480</b><span class="sr-only">12,480 </span><span>מוצרים צולמו בסטודיו מאז שנפתח</span></p>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP התמונה במנוחה והמספר הסופי
  const root=document.querySelector(".zb"),tile=root.querySelector(".zb-tile"),img=tile.querySelector(".zb-img"),rays=root.querySelector(".zb-rays"),
    num=root.querySelector(".zb-count b"),to=parseInt(num.getAttribute("data-to"),10)||0;
  // בהפחתת תנועה הפונקציה לא רצה, והתמונה במנוחה
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    const mob=ctx.conditions.mob,N=mob?0:6,s0=mob?.6:.34,r0=mob?-8:-14;
    root.classList.add("is-live");
    const ghosts=[];
    for(let i=0;i<N;i++){const g=img.cloneNode();g.className="zb-ghost";g.alt="";g.setAttribute("aria-hidden","true");tile.insertBefore(g,img);ghosts.push(g);}
    const o={t:0,c:0};
    const draw=()=>{
      const t=o.t,s=Math.sin(Math.PI*t);      // העוצמה היא אפס בהתחלה ובסוף, התמונה נוחתת חדה
      gsap.set(tile,{scale:s0+(1-s0)*t,rotate:r0*(1-t)});
      ghosts.forEach((g,i)=>gsap.set(g,{scale:1+(i+1)*.035*s,opacity:s*(.2-i*.025)}));
      if(!mob)gsap.set(rays,{opacity:s*.6,scale:.8+.5*t,rotate:t*18});
      num.textContent=Math.round(o.c*to).toLocaleString("en-US");
    };
    draw();
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to({},{duration:.1})
      .to(o,{t:1,duration:.7,ease:"power2.inOut",onUpdate:draw})
      .to(o,{c:1,duration:.5,ease:"power2.out",onUpdate:draw},"<.2")
      .to({},{duration:.2});
    return()=>{root.classList.remove("is-live");ghosts.forEach(g=>g.remove());gsap.set([tile,rays],{clearProps:"all"});num.textContent=to.toLocaleString("en-US");};
  });
})();`
}
];
