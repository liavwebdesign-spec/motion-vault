// מהלכי טקסט ומספרים מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה, לא אתר גלילה. נבחרו דפוסים שחוזרים בכמה סרטונים ושמתורגמים לסקשן באתר עסקי,
// ונבנו מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל הדמואים בעברית (RTL). מהלך שמסתמך על כיוון אומר בהערה מה להפוך לאתר משמאל לימין.
const rep = (w, n) => Array(n).fill("<span>" + w + "</span>").join("");
// שורה אחת של css37: שני עותקים זהים של קבוצת המילים, כדי שהלולאה תהיה חלקה בדיוק
const mrow = (w, n, d, o) => '<div class="mr-row" style="--d:' + d + 's;--o:' + o + 's"><div class="mr-strip"><div class="mr-g">' + rep(w, n) + '</div><div class="mr-g">' + rep(w, n) + '</div></div></div>';
export default [
{
  id:"g187", cat:"gsap", name:"מילה ענקית שנכנסת במריחה ומתחדדת", tech:"GSAP · ScrollTrigger scrub · SVG feGaussianBlur", status:"מאושר-עין",
  desc:"מילה ענקית אחת נכנסת מהצד במריחת תנועה, מתחדדת בזמן שהיא מאטה ונעצרת, ובצבע המותג היא מסתיימת בנקודה. המשפט שלה עולה מתחתיה, ואז המילה נמרחת החוצה והבאה נכנסת. בכל רגע על המסך מילה אחת וברורה.",
  when:"תהליך עבודה, עקרונות או שלבי טיפול של ארבעה עד שישה צעדים, ולכל אחד מילה אחת חזקה ומשפט אחד. סקשן אחד בעמוד, באתר שמרשה לעצמו דרמה. פחות מתאים למילים ארוכות או כשיש הרבה טקסט בכל שלב.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם מילה אחת גדולה נכנסת במריחה אופקית ומתחדדת כשהיא נעצרת, ונגמרת בנקודה צבעונית. נבנה מאפס מהצפייה. **המריחה:** פילטר SVG עם `feGaussianBlur` ו-`stdDeviation=\"X 0\"`, כלומר טשטוש לרוחב בלבד. המספר X רץ מ-90 ל-0 יחד עם התנועה (`expo.out`). הפילטרים נוצרים ב-JS ומוצמדים למילה רק כל עוד X גדול מ-0.4, ולכן המילה הסופית חדה לגמרי ובמנוחה אין שום פילטר פעיל. **המארקאפ הוא רשימה מסודרת:** כל שלב הוא `li` עם המילה והמשפט שלו, ובלי GSAP ובהפחתת תנועה זה מה שרואים. כשהמהלך רץ הסקריפט מוסיף `is-live`: הסקשן נעשה גבוה פי ארבעה, הבמה נדבקת למסך (`position:sticky`) וכל השלבים נערמים באותו מקום. המילה נכנסת מימין, המשפט עולה מתחתיה, והמילה יוצאת שמאלה בטשטוש עד שהבאה נכנסת. השלב האחרון נשאר. **התחלה מוקדמת:** הטריגר מתחיל ב-`top 40%`, כך שהמילה הראשונה כבר בדרך כשהסקשן עולה ולפני שהוא נדבק. **באתר משמאל לימין** מחליפים את הסימן של `xPercent`: מינוס 100 לכניסה ו-100 ליציאה. **נגישות:** הרשימה האמיתית נשארת בעץ הנגישות כל הזמן (שקיפות אינה הסתרה), והנקודה הצבעונית מוסתרת מקורא מסך. **בטלפון** אותה במה, והמילה היא 72px לפחות. מילים ארוכות מ-7 אותיות כדאי לקצר. פילטר SVG על אלמנט HTML חלש יותר ב-Safari, ושם המריחה עשויה להיראות כטשטוש עדין. התנועה עצמה נשארת.",
  libs:["gsap","ScrollTrigger"],
  css:`.mb{max-width:1100px;margin-inline:auto}
.mb-pin{display:grid;gap:48px}
.mb-h{margin:0;max-width:22ch;font-size:clamp(24px,2.4vw,36px);font-weight:600;line-height:1.2;text-wrap:balance}
.mb-list{list-style:none;margin:0;padding:0;display:grid;gap:clamp(40px,6vw,88px)}
.mb-li{display:grid;gap:12px;justify-items:start}
.mb-line{display:flex;align-items:baseline;line-height:.95}
.mb-w,.mb-d{font-size:clamp(72px,15vw,208px);font-weight:700;letter-spacing:-.03em}
.mb-d{font-style:normal;color:var(--accent)}
.mb-s{margin:0;max-width:34ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
/* המהלך רץ: הסקשן גבוה, הבמה נדבקת למסך וכל השלבים נערמים באותו תא */
.mb.is-live{height:420vh}
.mb.is-live .mb-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:clip;padding-block:32px;grid-template-rows:auto minmax(0,1fr);gap:0}
.mb.is-live .mb-list{align-content:center;gap:0}
.mb.is-live .mb-li{grid-area:1/1;align-content:center}
@media(max-width:767px){.mb-pin{gap:32px}}`,
  html:`<div class="stage"><div class="mb">
  <div class="mb-pin">
    <h2 class="mb-h">כך נראה הטיפול אצלנו, משלב לשלב</h2>
    <ol class="mb-list">
      <li class="mb-li"><div class="mb-line"><span class="mb-w">אבחון</span><i class="mb-d" aria-hidden="true">.</i></div><p class="mb-s">פגישה ראשונה של שעה: בדיקה מלאה ושיחה על מה שמפריע לכם ביום יום.</p></li>
      <li class="mb-li"><div class="mb-line"><span class="mb-w">תוכנית</span><i class="mb-d" aria-hidden="true">.</i></div><p class="mb-s">מקבלים תוכנית כתובה עם מטרות, מספר המפגשים והסבר על כל תרגיל.</p></li>
      <li class="mb-li"><div class="mb-line"><span class="mb-w">טיפול</span><i class="mb-d" aria-hidden="true">.</i></div><p class="mb-s">מפגשים קבועים עם אותו מטפל, והתוכנית מתעדכנת לפי ההתקדמות שלכם.</p></li>
      <li class="mb-li"><div class="mb-line"><span class="mb-w">מעקב</span><i class="mb-d" aria-hidden="true">.</i></div><p class="mb-s">אחרי הסיום בודקים איך אתם מרגישים, ואם צריך קובעים מפגש תחזוקה.</p></li>
    </ol>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארת הרשימה המסודרת
  const root=document.querySelector(".mb"),lis=[...root.querySelectorAll(".mb-li")];
  if(!lis.length)return;
  // בהפחתת תנועה הפונקציה לא רצה, והרשימה נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const NS="http://www.w3.org/2000/svg",svg=document.createElementNS(NS,"svg");
    svg.setAttribute("width","0");svg.setAttribute("height","0");svg.setAttribute("aria-hidden","true");svg.style.position="absolute";
    const lines=lis.map(li=>li.querySelector(".mb-line")),subs=lis.map(li=>li.querySelector(".mb-s"));
    // פילטר טשטוש אופקי לכל מילה: stdDeviation "X 0" מותח את המילה לרוחב בלבד
    const B=lines.map((ln,i)=>{
      const f=document.createElementNS(NS,"filter"),g=document.createElementNS(NS,"feGaussianBlur");
      f.setAttribute("id","mb-f"+i);f.setAttribute("x","-70%");f.setAttribute("y","-10%");f.setAttribute("width","240%");f.setAttribute("height","120%");
      f.setAttribute("color-interpolation-filters","sRGB");g.setAttribute("stdDeviation","0 0");f.appendChild(g);svg.appendChild(f);
      return{v:0,g:g,ln:ln,id:"mb-f"+i};
    });
    const blur=o=>{o.g.setAttribute("stdDeviation",o.v.toFixed(1)+" 0");o.ln.style.filter=o.v>.4?"url(#"+o.id+")":"none";};
    root.appendChild(svg);root.classList.add("is-live");
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top 40%",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    let t=0;
    lis.forEach((li,i)=>{
      const last=i===lis.length-1;
      // כניסה: המילה מאטה (expo.out) והטשטוש יורד איתה, המשפט עולה באמצע התנועה
      tl.fromTo(lines[i],{xPercent:100},{xPercent:0,duration:.9,ease:"expo.out"},t)
        .fromTo(lines[i],{opacity:0},{opacity:1,duration:.3,ease:"power1.out"},t)
        .fromTo(B[i],{v:90},{v:0,duration:.9,ease:"expo.out",onUpdate:()=>blur(B[i])},t)
        .fromTo(subs[i],{opacity:0,y:16},{opacity:1,y:0,duration:.5,ease:"power2.out"},t+.55);
      t+=1.8;
      if(!last){
        // יציאה: נמרחת שמאלה בזמן שהבאה כבר נכנסת
        tl.to(subs[i],{opacity:0,duration:.3,ease:"power1.in"},t)
          .to(lines[i],{xPercent:-100,duration:.55,ease:"power2.in"},t)
          .to(lines[i],{opacity:0,duration:.3,ease:"power1.in"},t+.25)
          .to(B[i],{v:70,duration:.55,ease:"power2.in",onUpdate:()=>blur(B[i])},t);
        t+=.5;
      }
    });
    tl.to({},{duration:.7},t);
    // אחרי רענון (שינוי גודל חלון) הטיימליין חוזר למקומו בלי להפעיל onUpdate, אז מסנכרנים את הטשטוש מהערכים
    const sync=()=>B.forEach(blur);
    ScrollTrigger.addEventListener("refresh",sync);
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);root.classList.remove("is-live");svg.remove();gsap.set([...lines,...subs],{clearProps:"all"});lines.forEach(l=>{l.style.filter="";});};
  });
})();`
},
{
  id:"g188", cat:"gsap", name:"אריחי תמונה שנכנסים בטשטוש לרשת מסודרת", tech:"GSAP · ScrollTrigger scrub · SVG feGaussianBlur", status:"מאושר-עין",
  desc:"שמונה אריחי צילום עפים פנימה מקצות המסך בטשטוש אופקי, שורה אחת מימין ושורה אחת משמאל, ונעצרים ברשת מסודרת. בזמן הגלילה רואים את האריחים מתחדדים ומתיישבים במקום, כמו לוח השראה שמתמלא.",
  when:"תיק עבודות, גלריית מוצרים או חומרי השראה של סטודיו: שישה עד תשעה צילומים אמיתיים של העבודה. פעם אחת בעמוד, כדי שהרשת תגיע כמסקנה ולא כקישוט. עובד גם באתר שקט, כי הכול נגמר בסדר נקי.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם תמונות עפות בטשטוש לתוך רשת מסודרת. נבנה מאפס מהצפייה. **המארקאפ הוא הרשת הסופית:** שמונה אריחים במקום, חדים, ובלי GSAP או בהפחתת תנועה זה מה שרואים. האריחים בדמו הם שמונה צילומים אמיתיים מהמאגר (`assets/media/real`), כל אחד `img` עם `width` ו-`height` מוגדרים, `object-fit:cover` וטעינה עצלה. בפרויקט מחליפים אותם בצילומי הלקוח ביחס 4:5 (ההתאמה נעשית בחיתוך, לכן אפשר לשלב גם צילום רחב). **כשהמהלך רץ** כל אריח מקבל פילטר SVG משלו (`feGaussianBlur` עם `stdDeviation=\"X 0\"`) וזז מקצה המסך אל מקומו. כיוון הכניסה מתחלף לפי שורה: שורה ראשונה מימין, שנייה משמאל. מספר העמודות נקרא מה-CSS, ולכן בטלפון (שתי עמודות) השורות מתחלפות בלי קוד נוסף. מרחק הכניסה מחושב מהמקום האמיתי של האריח (`getBoundingClientRect` פחות ה-`x` הנוכחי), כך שהאריח תמיד מתחיל מחוץ למסך. **ההתאמה לתנועה:** כל אריח מאט (`expo.out`) כשהוא מתקרב, והטשטוש יורד איתו. האריחים ברצף קצר אחד אחרי השני, והשורה השנייה מתחילה אחרי הראשונה. **גלישה:** האריחים מתחילים מחוץ למסך, לכן הסקשן שמחזיק את הרשת צריך `overflow-x:clip` (בדמו זה `.stage:has(.pt)`). **באתר משמאל לימין** מחליפים את סדר השורות: הראשונה משמאל. **נגישות:** לכל `img` יש `alt` שמתאר מה רואים בתמונה, והאריחים נשארים `figure` רגילים. **טעינה:** `width` ו-`height` שומרים מקום, כך שהרשת לא קופצת כשהתמונות מגיעות, והמרחק המחושב לכל אריח לא תלוי בטעינה. פילטר SVG על אלמנט HTML חלש יותר ב-Safari.",
  libs:["gsap","ScrollTrigger"],
  css:`.stage:has(.pt){overflow-x:clip}
.pt{display:grid;gap:clamp(32px,5vw,64px);max-width:1040px;margin-inline:auto}
.pt-txt{display:grid;gap:14px;max-width:44ch}
.pt-txt h2{margin:0;font-size:clamp(28px,3.4vw,52px);line-height:1.1;font-weight:700;text-wrap:balance}
.pt-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.pt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.pt-t{margin:0;position:relative;aspect-ratio:4 / 5;border-radius:18px;overflow:hidden;background:var(--card)}
.pt-t img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--p,50% 50%)}
@media(max-width:767px){.pt-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}`,
  html:`<div class="stage"><div class="pt">
  <div class="pt-txt">
    <h2>צילום מוצרים לחנויות אונליין</h2>
    <p>תמונות מוצר שמרגישות כמו צילום אחד: אותו יחס, אותה חדות וצבעים שמדברים זה עם זה. כך הלקוח מדפדף בקטלוג בלי שהצילום יפריע לו.</p>
  </div>
  <div class="pt-grid">
    <figure class="pt-t"><img src="../assets/media/real/s04/tusk.webp" width="900" height="1125" alt="כדור בצק בטורקיז עם שני ניבים לבנים על רקע ורוד" loading="lazy" decoding="async"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s15/flute.webp" width="1000" height="1250" alt="כוס שמפניה עם משקה בצבע ענבר, נצנצי זהב ופרוסת לימון מיובשת" loading="lazy" decoding="async"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s11/magenta-cone.webp" width="1000" height="1000" alt="גביע וופל ריק בצבע מג'נטה על רקע מחולק למנטה ולוורוד" loading="lazy" decoding="async" style="--p:38% 50%"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s14/croissants.webp" width="1250" height="1000" alt="שני קרואסונים על מפית יוטה לצד כוס קפה עם חלב" loading="lazy" decoding="async" style="--p:40% 50%"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s04/trio.webp" width="1200" height="1500" alt="שלוש דמויות בצק בצהוב, בטורקיז ובסגול על רקע חרדל" loading="lazy" decoding="async"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s11/hero-scoops.webp" width="1400" height="1750" alt="שלושה כדורי גלידה עם סוכריות צבעוניות על רקע ורוד ולבן" loading="lazy" decoding="async"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s04/hero-monster.webp" width="1200" height="1500" alt="פסל בצק בטורקיז עם עין אחת וכדורים כתומים על רקע אפור כהה" loading="lazy" decoding="async"></figure>
    <figure class="pt-t"><img src="../assets/media/real/s11/bowls.webp" width="1100" height="1650" alt="שתי קערות גלידה, ורודה וכחולה, מצולמות מלמעלה על רקע דו צבעי" loading="lazy" decoding="async" style="--p:50% 35%"></figure>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP הרשת כבר במקום
  const grid=document.querySelector(".pt-grid"),tiles=[...grid.children];
  // בהפחתת תנועה הפונקציה לא רצה, והאריחים במקומם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const NS="http://www.w3.org/2000/svg",svg=document.createElementNS(NS,"svg");
    svg.setAttribute("width","0");svg.setAttribute("height","0");svg.setAttribute("aria-hidden","true");svg.style.position="absolute";
    const B=tiles.map((tile,i)=>{
      const f=document.createElementNS(NS,"filter"),g=document.createElementNS(NS,"feGaussianBlur");
      f.setAttribute("id","pt-f"+i);f.setAttribute("x","-60%");f.setAttribute("y","-10%");f.setAttribute("width","220%");f.setAttribute("height","120%");
      f.setAttribute("color-interpolation-filters","sRGB");g.setAttribute("stdDeviation","0 0");f.appendChild(g);svg.appendChild(f);
      return{v:0,g:g,el:tile,id:"pt-f"+i};
    });
    const blur=o=>{o.g.setAttribute("stdDeviation",o.v.toFixed(1)+" 0");o.el.style.filter=o.v>.4?"url(#"+o.id+")":"none";};
    grid.appendChild(svg);
    const cols=()=>getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const dirOf=i=>Math.floor(i/cols())%2?-1:1;      // שורה ראשונה נכנסת מימין, שנייה משמאל, וחוזר חלילה
    // מרחק הכניסה: עד שהאריח כולו מחוץ למסך, לפי המקום האמיתי שלו בלי ה-x הנוכחי
    const off=(tile,dir)=>{
      const r=tile.getBoundingClientRect(),base=r.left-(+gsap.getProperty(tile,"x")||0);
      return dir>0?innerWidth-base+24:-(base+r.width+24);
    };
    const tl=gsap.timeline({scrollTrigger:{trigger:grid,start:"top 85%",end:"top 25%",scrub:.6,invalidateOnRefresh:true}});
    tiles.forEach((tile,i)=>{
      const at=(i%4)*.12+Math.floor(i/4)*.45;
      tl.fromTo(tile,{x:()=>off(tile,dirOf(i))},{x:0,duration:1.1,ease:"expo.out"},at)
        .fromTo(tile,{opacity:0},{opacity:1,duration:.3,ease:"power1.out"},at)
        .fromTo(B[i],{v:36},{v:0,duration:1.1,ease:"expo.out",onUpdate:()=>blur(B[i])},at);
    });
    // אחרי רענון (שינוי גודל חלון) הטיימליין חוזר למקומו בלי להפעיל onUpdate, אז מסנכרנים את הטשטוש מהערכים
    const sync=()=>B.forEach(blur);
    ScrollTrigger.addEventListener("refresh",sync);
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);svg.remove();gsap.set(tiles,{clearProps:"all"});};
  });
})();`
},
{
  id:"css37", cat:"css", name:"שורות מילים בקו מתאר מאחורי הכותרת", tech:"CSS · keyframes · text-stroke", status:"מאושר-עין",
  desc:"חמש שורות של מילות השירות בקו מתאר דק זורמות באיטיות, כל שורה בכיוון ובקצב אחר, מאחורי כותרת מלאה וכבדה. הכותרת נשארת הדבר הברור בעמוד, והרקע אומר את אותו דבר שוב ושוב כמו טקסטורה.",
  when:"הירו או פתיח של סטודיו, משרד או מותג שיש לו מילה או שתיים שמגדירות אותו: תכנון, עיצוב, ליווי. הטקסטורה מעשירה עמוד שיש בו מעט תמונות. מחוץ להירו עדיף לוותר, כי שורות זזות ליד פסקאות מפריעות לקריאה.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם שורות טקסט חוזרות בקו מתאר זורמות בכיוונים מתחלפים מאחורי כותרת אחת מלאה. נבנה מאפס מהצפייה. **CSS בלבד:** כל שורה היא רצועה (`.mr-strip`) עם שני עותקים זהים של אותה קבוצת מילים, והאנימציה מזיזה אותה בדיוק עותק אחד (`translateX(50%)`, כי הרצועה היא שני עותקים), ולכן הלולאה חלקה בלי קפיצה. השורות הזוגיות רצות הפוך (`animation-direction:reverse`), ולכל שורה משך ונקודת התחלה משלה (`--d` ו-`--o` במארקאפ). **גודל הקבוצה:** עותק אחד חייב להיות רחב לפחות כמו המסך הרחב ביותר, אחרת רואים רווח בסוף הלולאה. בדמו כל קבוצה היא 5 עד 9 מילים בגודל עד 120px, מספיק ל-2560px. **הקו:** `color:transparent` עם `-webkit-text-stroke` בצבע הדיו בשקיפות, כך שהוא מתאים לכל עור. **קריאות:** לכותרת ולפסקה יש `text-shadow` בצבע הרקע, והוא פותח סביב הטקסט אזור נקי בלי לצבוע קופסה. **באתר משמאל לימין** מחליפים את `50%` ב-`-50%` ב-keyframes. **הפחתת תנועה:** האנימציה נעצרת והשורות עומדות. **נגישות:** כל שכבת השורות `aria-hidden`, והתוכן האמיתי הוא הכותרת והפסקה. הרצועות נבנות בדמו מקוד כדי לקצר את המארקאפ, ובפרויקט אפשר לכתוב אותן ידנית.",
  libs:[],
  css:`.mr{position:relative;display:grid;place-items:center;min-height:clamp(480px,56vw,680px);overflow:clip;isolation:isolate}
.mr-rows{position:absolute;inset:0;display:grid;align-content:center;z-index:-1;-webkit-mask-image:linear-gradient(to right,transparent,black 7%,black 93%,transparent);mask-image:linear-gradient(to right,transparent,black 7%,black 93%,transparent)}
.mr-row{overflow:clip;white-space:nowrap;line-height:.98}
.mr-strip{display:flex;width:max-content;animation:mr-go var(--d,48s) linear infinite;animation-delay:var(--o,0s)}
.mr-row:nth-child(even) .mr-strip{animation-direction:reverse}
.mr-g{display:flex;flex:none;gap:.5em;padding-inline-end:.5em}
.mr-g span{font-size:clamp(56px,8.4vw,120px);font-weight:700;color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--ink) 24%,transparent)}
/* עותק אחד = חצי מהרצועה. באתר משמאל לימין: -50% */
@keyframes mr-go{from{transform:translateX(0)}to{transform:translateX(50%)}}
.mr-front{display:grid;justify-items:start;gap:18px;width:min(640px,100%);text-shadow:0 0 .5em var(--bg),0 0 1em var(--bg),0 0 1.6em var(--bg)}
.mr-front h2{margin:0;font-size:clamp(34px,5.2vw,76px);font-weight:700;line-height:1.05;letter-spacing:-.015em;text-wrap:balance}
.mr-front p{margin:0;max-width:34ch;font-size:var(--fs-body);line-height:1.6}
.mr-cta{display:inline-flex;align-items:center;padding:14px 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none;text-shadow:none}
@media(prefers-reduced-motion:reduce){.mr-strip{animation:none}}`,
  html:`<div class="stage"><section class="mr">
  <div class="mr-rows" aria-hidden="true">
    ${mrow("תכנון",9,52,0)}${mrow("עיצוב פנים",6,64,-21)}${mrow("ליווי בנייה",5,46,-9)}${mrow("בחירת חומרים",5,70,-33)}${mrow("הדמיות",7,56,-14)}
  </div>
  <div class="mr-front">
    <h2>תכנון ועיצוב פנים לדירות ולבתים פרטיים</h2>
    <p>סטודיו קטן בתל אביב שמלווה כל פרויקט מהשרטוט הראשון ועד המפתח ביד.</p>
    <a class="mr-cta" href="#">לפגישת היכרות</a>
  </div>
</section></div>`,
  js:``
},
{
  id:"b81", cat:"behavior", name:"טבעת מילים תלת ממדית שמסתובבת סביב נקודה", tech:"GSAP · CSS 3D · quickTo", status:"מאושר-עין",
  desc:"שירותי העסק כתובים על טבעת מוטה בתלת ממד, והיא מסתובבת לאט סביב נקודה בצבע המותג. הצד הקרוב בהיר וגדול, הצד הרחוק עמום והפוך. במחשב הטבעת נוטה מעט אחרי העכבר.",
  when:"הירו או סקשן שירותים של עסק עם חמישה עד שמונה שירותים קצרים של מילה או שתיים: מיתוג, אתרים, צילום. מהלך חתימה אחד בעמוד. פחות מתאים כשצריך לקרוא כל שירות בנחת, כי רק הצד הקרוב קריא בכל רגע.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם מילים על טבעת מוטה מקיפות נקודה במרכז. נבנה מאפס מהצפייה. **המארקאפ הוא שורת טקסט אחת:** זה מה שרואים בלי GSAP ובהפחתת תנועה, וגם מה שקורא מסך קורא, כי כשהטבעת נבנית השורה נשארת בעץ הנגישות (`sr-only`) והטבעת עצמה `aria-hidden`. **הבנייה ב-JS:** כל אות היא `span` ממוקם במרכז, ואחרי שהפונט נטען נמדד הרוחב האמיתי של כל אות. **הגודל נקבע ב-CSS:** הקוטר `clamp(280px,42vw,560px)` וגודל האות `clamp(18px,2vw,28px)` יושבים כמשתנים על `.rg`, וה-JS קורא אותם מאלמנט מדידה בלתי נראה (`.rg-sz`), כך שהטבעת תמיד הנושא של הסקשן ונכנסת לרוחב בטלפון. הרדיוס הוא חצי מהקוטר, ושורת השירותים חוזרת כמה פעמים שנכנס בהיקף. מה שנשאר עד היקף מלא מתחלק שווה בין הרווחים (ואם הרווח גדול מדי האות גדלה עד 30%), והאותיות נפרשות לפי רוחבן הנמדד, בלי הנחה שכולן שוות. הטבעת נבנית מחדש בשינוי גודל ובטעינת הפונט (ResizeObserver). בעברית בלי ניקוד פיצול לאותיות בטוח: האותיות הסופיות (ם ן ך ף ץ) הן תווים נפרדים ולא נשברות. **התלת ממד:** `perspective` על הבמה (פי 1.7 מהקוטר, כך שהעומק נראה אותו דבר בכל גודל), ושתי שכבות עם `preserve-3d`: הטיה (`rotationX` של מינוס 26 מעלות מסתכלת על הטבעת מלמעלה) וטבעת שמסתובבת ב-`rotationY` (36 שניות, `ease:\"none\"`). כל אות היא `rotateY(זווית) translateZ(רדיוס)`. השקיפות של כל אות מחושבת מקוסינוס הזווית בעולם, כך שהצד הרחוק עמום. הצד האחורי הפוך מעצמו, וזה חלק מהמראה. **כיוון:** האותיות נפרשות מימין לשמאל והצד הקרוב נע שמאלה. באתר משמאל לימין מחליפים את הסימן של הזווית (`ang`) ושל `rotationY`. **עכבר:** `quickTo` על ההטיה, רק במכשיר עם עכבר. **ביצועים:** הסיבוב נעצר כשהבמה מחוץ למסך (IntersectionObserver). **הפחתת תנועה:** הטבעת נבנית רק בתנועה רגילה, ובהפחתת תנועה נשארת השורה.",
  libs:["gsap"],
  css:`.rg{--rg-d:clamp(280px,42vw,560px);--rg-fs:clamp(18px,2vw,28px);position:relative;display:grid;justify-items:center;gap:24px;width:100%;text-align:center}
.rg-lead{margin:0;max-width:36ch;color:var(--muted);font-size:clamp(18px,1.9vw,26px);line-height:1.5;text-wrap:balance}
.rg-fallback{margin:0;max-width:24ch;font-size:clamp(22px,3vw,36px);font-weight:700;line-height:1.4;text-wrap:balance}
/* כשהטבעת נבנית, השורה נשארת לקורא מסך בלבד */
.rg.is-ring .rg-fallback{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.rg-stage{position:relative;width:100%;height:calc(var(--rg-d)*.64);perspective:calc(var(--rg-d)*1.7);perspective-origin:50% 39%}
/* מדד בלתי נראה: ה-JS קורא ממנו את הקוטר ואת גודל האות, כדי ששניהם יישארו ב-CSS */
.rg-sz{position:absolute;left:0;top:0;width:var(--rg-d);height:0;font-size:var(--rg-fs);visibility:hidden;pointer-events:none}
.rg-tilt,.rg-ring{position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d}
.rg-tilt{top:39%}
.rg-c{position:absolute;left:0;top:0;font-weight:700;line-height:1;white-space:pre;color:var(--ink)}
.rg-dot{position:absolute;left:50%;top:39%;width:max(14px,min(22px,var(--rg-d)*.04));aspect-ratio:1;translate:-50% -50%;border-radius:50%;background:var(--accent)}`,
  html:`<div class="stage"><div class="rg">
  <p class="rg-lead">אנחנו עובדים עם עסקים קטנים וגדולים על כל החומרים שהם צריכים כדי להיראות מקצועיים.</p>
  <p class="rg-fallback">מיתוג · אתרים · צילום · סרטונים · דפוס · קמפיינים</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת שורת השירותים
  const root=document.querySelector(".rg"),fb=root.querySelector(".rg-fallback");
  if(!fb)return;
  const src=fb.textContent.trim().split(" ").filter(Boolean).join(" ")+" ",NB=String.fromCharCode(160);
  const chars=[...src],S=chars.filter(c=>c===" ").length;
  // בהפחתת תנועה הפונקציה לא רצה, והשורה נשארת
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const stage=document.createElement("div");stage.className="rg-stage";stage.setAttribute("aria-hidden","true");
    stage.innerHTML='<i class="rg-sz"></i><div class="rg-tilt"><div class="rg-ring"></div></div><span class="rg-dot"></span>';
    root.appendChild(stage);root.classList.add("is-ring");
    const sz=stage.querySelector(".rg-sz"),tilt=stage.querySelector(".rg-tilt"),ring=stage.querySelector(".rg-ring");
    let spans=[],ang=[],alive=true,key="";const TILT=-26;
    gsap.set(tilt,{rotationX:TILT});
    // שקיפות לפי זווית בעולם: הצד הקרוב מלא, הרחוק עמום
    const paint=()=>{
      const r=(+gsap.getProperty(ring,"rotationY")||0)*Math.PI/180;
      for(let i=0;i<spans.length;i++)spans[i].style.opacity=(.16+.84*Math.pow(Math.max(Math.cos(ang[i]+r),0),1.4)).toFixed(3);
    };
    // n עותקים של השורה, בגודל אות fs
    const mk=(n,fs)=>{
      ring.textContent="";ring.style.fontSize=fs+"px";
      const out=[];
      for(let k=0;k<n;k++)chars.forEach(ch=>{const s=document.createElement("span");s.className="rg-c";s.textContent=ch===" "?NB:ch;ring.appendChild(s);out.push(s);});
      return out;
    };
    const keyNow=()=>sz.offsetWidth+":"+parseFloat(getComputedStyle(sz).fontSize);
    const build=()=>{
      key=keyNow();
      // הקוטר וגודל האות מגיעים מה-CSS (clamp), והטבעת נבנית לפיהם
      const D=sz.offsetWidth,fsT=parseFloat(getComputedStyle(sz).fontSize),C=Math.PI*D,R=D/2;
      let T1=0;mk(1,fsT).forEach(s=>{T1+=s.offsetWidth;});
      // כמה עותקים נכנסים בהיקף באות בגודל היעד. אם נשאר מקום גדול מדי בין המילים, האות גדלה מעט (עד 30%)
      let n=1,fs=fsT;
      if(T1>C)fs=fsT*C/T1*.97;
      else{n=Math.floor(C/T1);fs=fsT*Math.min(1.3,Math.max(1,C/(n*(T1+1.1*fsT*S))));}
      spans=mk(n,fs);
      const w=spans.map(s=>s.offsetWidth);
      let total=0;w.forEach(x=>{total+=x;});
      // מה שנשאר (או חסר) עד היקף מלא מתחלק שווה בין הרווחים, והטבעת נסגרת בדיוק
      const extra=S?(C-total)/(n*S):0;
      let cum=0;ang=[];
      // האות הראשונה בחזית והבאות שמאלה (זווית יורדת), כך שהקריאה ימין לשמאל. באתר LTR: זווית עולה
      spans.forEach((s,i)=>{
        const wi=w[i]+(chars[i%chars.length]===" "?extra:0);
        const a=-(cum+wi/2)/R;cum+=wi;ang.push(a);
        s.style.transform="translate(-50%,-50%) rotateY("+(a*57.29578).toFixed(3)+"deg) translateZ("+R.toFixed(1)+"px)";
      });
      paint();
    };
    build();
    const tw=gsap.to(ring,{rotationY:-360,duration:36,ease:"none",repeat:-1,onUpdate:paint});
    // הפונט נטען אחרי הבנייה הראשונה: בונים מחדש עם הרוחבים האמיתיים
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(alive)build();});
    const ro=new ResizeObserver(()=>{if(alive&&keyNow()!==key)build();});ro.observe(stage);ro.observe(sz);
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)tw.play();else tw.pause();});});io.observe(stage);
    // הטיה אחרי העכבר, רק כשיש עכבר
    const qx=gsap.quickTo(tilt,"rotationX",{duration:.8,ease:"power3"}),qz=gsap.quickTo(tilt,"rotationZ",{duration:.8,ease:"power3"});
    const move=e=>{const r=stage.getBoundingClientRect();qx(TILT+((e.clientY-r.top)/r.height-.5)*16);qz(-((e.clientX-r.left)/r.width-.5)*8);};
    const leave=()=>{qx(TILT);qz(0);};
    if(matchMedia("(hover: hover) and (pointer: fine)").matches){root.addEventListener("pointermove",move);root.addEventListener("pointerleave",leave);}
    return()=>{alive=false;tw.kill();io.disconnect();ro.disconnect();root.removeEventListener("pointermove",move);root.removeEventListener("pointerleave",leave);stage.remove();root.classList.remove("is-ring");};
  });
})();`
},
{
  id:"g189", cat:"gsap", name:"משפט שנשען על חבל וקורה כמו מבנה", tech:"GSAP · ScrollTrigger scrub · SVG", status:"מאושר-עין",
  desc:"חבל דק בצבע המותג נמתח מקצה לקצה, וכל מילה שנוחתת עליו מכופפת אותו, עד שמילה כבדה אחת תלויה ממנו בשני חוטים. בצדדים עולים עמודים של טקסט, הקורה נמתחת ישר והמילה הכבדה עולה איתה, ומילות הסיום נוחתות על הקורה. המשפט בנוי כמו מבנה שמחזיק משקל.",
  when:"משפט תזה אחד של שלוש או ארבע מילות מפתח, כשיש בו מילה אחת כבדה שהכול נשען עליה: אפיון, אחריות, ניסיון. סקשן אחד בעמוד תדמית של סטודיו או משרד שרוצה לדבר כמו אדריכלים. לא מתאים למשפט ארוך, כי המילים צריכות להתיישב על החבל.",
  note:"**שחזור.** השראה: סרטון אחד ב-prompt-motion.com (21.10.2026) שבו טקסט מתנהג כמו אדריכלות: חבל שנמתח תחת משקל המילים, מילה תלויה בחוטים, עמודי אותיות בצדדים ובסוף קורה מתוחה עם מילה עליה. נבנה מאפס מהצפייה. **הגיאומטריה:** החבל הוא עקומה ריבועית `M0,B Q W/2,B+2s W,B`, כלומר השקיעה במרכז היא s בדיוק. מילה שיושבת על החבל במרחק t (בין 0 ל-1 לאורכו) יורדת `4·s·t·(1-t)` ומסתובבת בזווית `atan(4·s·(1-2t)/W)`. מרכז כל מילה נמדד פעם אחת מהפריסה הרגילה (ובכל רענון), ולכן ה-CSS הוא שקובע איפה כל מילה יושבת. **המצב הסטטי הוא קורה מתוחה:** מילות הפתיחה מימין עליה, מילות הסיום משמאל, המילה הכבדה תלויה מתחתיה בשני חוטי CSS והעמודים בשני הצדדים. בלי GSAP ובהפחתת תנועה זה מה שרואים. **כשהמהלך רץ:** הסקשן גבוה פי שלושה וחצי, הבמה נדבקת למסך, והחבל והחוטים מצוירים ב-SVG שנוצר ב-JS (חוטי ה-CSS מוסתרים). טיימליין אחד קורא ל-`draw` בכל עדכון: מילות הפתיחה נוחתות בזו אחר זו והחבל שוקע, המילה הכבדה יורדת על חוטים שמתארכים והחבל שוקע עוד, העמודים נחשפים מלמטה למעלה (`clip-path`), החבל מתיישר והמילה הכבדה עולה איתו, ולבסוף מילות הסיום נוחתות על הקורה. השקיעה (`s`) והאורך של החוטים (`h`) הם שני מספרים באובייקט אחד, ולכן אין התנגשות בין קטעים. **העמודים:** `writing-mode:vertical-rl` עם `rotate(180deg)` נקרא מלמטה למעלה. **גדלים:** `--rig-h`, `--B` (מיקום הקורה) ו-`--hang` (אורך החוטים) נקראים מה-CSS, ובטלפון יש להם ערכים משלהם. **העמודים** ממוקמים עם `left` ו-`right` פיזיים, כי ב-`vertical-rl` המאפיינים הלוגיים מתהפכים לציר האנכי, וגודלם נגזר מגובה הרתמה כדי שיגיעו קרוב לקורה. **באתר משמאל לימין** `inset-inline` מתהפך לבד, ומחליפים רק את `left` ו-`right` של העמודים. **נגישות:** כל המבנה `aria-hidden`, והמשפט המלא בטקסט מוסתר.",
  libs:["gsap","ScrollTrigger"],
  css:`.rb{max-width:1040px;margin-inline:auto}
.rb-pin{display:grid;gap:32px;justify-items:center}
.rb-rig{--rig-h:440px;--B:136px;--hang:76px;position:relative;width:min(980px,100%);height:var(--rig-h);margin-inline:auto}
.rb-beam{position:absolute;inset-inline:0;top:var(--B);height:2px;border-radius:1px;background:var(--accent)}
.rb-lead,.rb-end{position:absolute;bottom:calc(var(--rig-h) - var(--B) + 6px);display:flex;gap:.28em;font-size:clamp(20px,5.2vw,64px);font-weight:700;line-height:1;white-space:nowrap}
.rb-lead{inset-inline-start:0}
.rb-end{inset-inline-end:0}
.rb-w{display:inline-block;transform-origin:50% 100%}
.rb-wi{display:inline-block}
/* המילה הכבדה תלויה בשני חוטים: בסטטי הם ::before ו-::after, כשהמהלך רץ הם קווי SVG */
.rb-hv{position:absolute;inset-inline:0;margin-inline:auto;width:max-content;top:calc(var(--B) + var(--hang))}
.rb-heavy{display:block;font-size:clamp(52px,8vw,96px);font-weight:700;line-height:1}
.rb-hv::before,.rb-hv::after{content:"";position:absolute;bottom:100%;width:2px;height:var(--hang);background:var(--accent)}
.rb-hv::before{inset-inline-start:12%}
.rb-hv::after{inset-inline-end:12%}
/* העמודים ב-left ו-right פיזיים: ב-vertical-rl המאפיינים הלוגיים מתהפכים לציר האנכי */
.rb-col{position:absolute;bottom:0;font-size:calc((var(--rig-h) - var(--B) - 8px)/1.95);font-weight:700;line-height:1;white-space:nowrap;writing-mode:vertical-rl;transform:rotate(180deg)}
.rb-col.r{right:0}
.rb-col.l{left:0}
.rb-p{margin:0;max-width:46ch;text-align:center;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.rb-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.rb-rope,.rb-hl{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round}
.rb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* המהלך רץ: הסקשן גבוה, הבמה נדבקת, והחבל והחוטים עוברים ל-SVG */
.rb.is-live{height:380vh}
.rb.is-live .rb-pin{position:sticky;top:0;height:100vh;height:100svh;align-content:center;overflow:clip}
.rb.is-live .rb-beam,.rb.is-live .rb-hv::before,.rb.is-live .rb-hv::after{display:none}
@media(max-width:767px){.rb-rig{--rig-h:300px;--B:104px;--hang:52px}}`,
  html:`<div class="stage"><div class="rb">
  <div class="rb-pin">
    <div class="rb-rig" aria-hidden="true">
      <div class="rb-beam"></div>
      <div class="rb-lead"><span class="rb-w"><span class="rb-wi">האתר</span></span><span class="rb-w"><span class="rb-wi">נשען</span></span><span class="rb-w"><span class="rb-wi">על</span></span></div>
      <div class="rb-hv"><span class="rb-heavy">אפיון</span></div>
      <div class="rb-end"><span class="rb-w"><span class="rb-wi">ולכן</span></span><span class="rb-w"><span class="rb-wi">הוא</span></span><span class="rb-w"><span class="rb-wi">מחזיק.</span></span></div>
      <span class="rb-col r">ניסיון</span><span class="rb-col l">ניסיון</span>
    </div>
    <p class="sr-only">האתר נשען על אפיון, ולכן הוא מחזיק.</p>
    <p class="rb-p">כל אתר שלנו מתחיל באפיון של כמה שעות עם בעל העסק, ורק אחריו עוברים לעיצוב.</p>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארת הקורה המתוחה
  const root=document.querySelector(".rb"),rig=root.querySelector(".rb-rig");
  const lead=[...rig.querySelectorAll(".rb-lead .rb-w")],end=[...rig.querySelectorAll(".rb-end .rb-w")],rope=lead.concat(end);
  const hv=rig.querySelector(".rb-hv"),heavy=hv.firstElementChild,cols=[...rig.querySelectorAll(".rb-col")];
  const inner=a=>a.map(w=>w.firstElementChild);
  // בהפחתת תנועה הפונקציה לא רצה, והקורה נשארת מתוחה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const NS="http://www.w3.org/2000/svg",svg=document.createElementNS(NS,"svg"),path=document.createElementNS(NS,"path");
    const h1=document.createElementNS(NS,"line"),h2=document.createElementNS(NS,"line");
    path.setAttribute("class","rb-rope");h1.setAttribute("class","rb-hl");h2.setAttribute("class","rb-hl");
    svg.setAttribute("class","rb-svg");svg.setAttribute("aria-hidden","true");svg.appendChild(path);svg.appendChild(h1);svg.appendChild(h2);
    rig.insertBefore(svg,rig.firstChild);root.classList.add("is-live");
    const S={s:0,h:0};      // s: שקיעת החבל (שבר מגובה הרתמה), h: כמה החוטים נמתחו (0 עד 1)
    let W=0,H=0,B=0,hang=0,cx=[],hcx=0,hx=[0,0];
    const num=n=>parseFloat(getComputedStyle(rig).getPropertyValue(n))||0;
    // מרכזי המילים נמדדים מהפריסה הרגילה, בלי טרנספורמציות
    const measure=()=>{
      rope.forEach(w=>{w.style.transform="";});hv.style.transform="";
      const rr=rig.getBoundingClientRect();W=rr.width;H=rr.height;B=num("--B");hang=num("--hang");
      cx=rope.map(w=>{const r=w.getBoundingClientRect();return r.left-rr.left+r.width/2;});
      const hr=hv.getBoundingClientRect();hcx=hr.left-rr.left+hr.width/2;
      hx=[hr.left-rr.left+hr.width*.12,hr.left-rr.left+hr.width*.88];
      svg.setAttribute("viewBox","0 0 "+W+" "+H);
    };
    const draw=()=>{
      const s=S.s*H;
      path.setAttribute("d","M0,"+B+" Q"+(W/2)+","+(B+2*s)+" "+W+","+B);
      rope.forEach((w,i)=>{
        const t=cx[i]/W;      // המילה יורדת עם החבל ומסתובבת לפי השיפוע שלו
        w.style.transform="translateY("+(4*s*t*(1-t)).toFixed(2)+"px) rotate("+(Math.atan(4*s*(1-2*t)/W)*57.2958).toFixed(2)+"deg)";
      });
      const th=hcx/W,dy=4*s*th*(1-th)-hang*(1-S.h);
      hv.style.transform="translateY("+dy.toFixed(2)+"px)";
      const top=B+hang+dy;
      [h1,h2].forEach((l,i)=>{
        const t=hx[i]/W,by=B+4*s*t*(1-t);
        l.setAttribute("x1",hx[i]);l.setAttribute("x2",hx[i]);l.setAttribute("y1",by);l.setAttribute("y2",Math.max(by,top));
        l.style.opacity=Math.min(1,S.h*5);
      });
    };
    const sync=()=>{measure();draw();};
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.eventCallback("onUpdate",draw);
    tl.fromTo(inner(lead),{yPercent:-170,opacity:0},{yPercent:0,opacity:1,duration:.55,ease:"power2.in",stagger:.35},0)
      .fromTo(S,{s:0},{s:.09,duration:1.2,ease:"power1.inOut"},.1)
      .fromTo(heavy,{opacity:0},{opacity:1,duration:.4,ease:"power1.out"},1.5)
      .fromTo(S,{h:0},{h:1,duration:1,ease:"power2.out"},1.5)
      .fromTo(S,{s:.09},{s:.16,duration:1,ease:"power1.inOut",immediateRender:false},1.5)
      .fromTo(cols,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.1,ease:"power2.out",stagger:.15},2.7)
      .fromTo(S,{s:.16},{s:0,duration:1.3,ease:"power2.inOut",immediateRender:false},3.9)
      .fromTo(inner(end),{yPercent:-220,opacity:0},{yPercent:0,opacity:1,duration:.5,ease:"power2.in",stagger:.28},5)
      .to({},{duration:.8},5.9);
    sync();
    ScrollTrigger.addEventListener("refresh",sync);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sync);
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);root.classList.remove("is-live");svg.remove();rope.forEach(w=>{w.style.transform="";});hv.style.transform="";gsap.set(inner(rope).concat([heavy],cols),{clearProps:"all"});};
  });
})();`
},
{
  id:"g190", cat:"gsap", name:"מילה שמתחלפת ומביאה איתה כרטיס ורקע", tech:"GSAP · ScrollTrigger scrub · pinned", status:"ממתין",
  desc:"משפט קבוע שנגמר בכפתור מילה: אתר, לוגו, קמפיין, מצגת. בכל גלילה המילה מתחלפת, הרקע עובר לצבע אחר, וכרטיס תואם נכנס לידה: אתר בדפדפן, לוגו על כרטיס, מודעה, שקף. כך רואים בדיוק מה העסק מקבל, ולא רק קוראים.",
  when:"סטודיו, מוצר או שירות שמייצר כמה סוגי תוצרים (ארבעה עד שישה), ורוצים להראות את כולם בלי רשימה. סקשן הירו או הסבר אחד בעמוד. מתאים כשלכל תוצר יש איור פשוט וברור. פחות מתאים כשהתוצרים דומים זה לזה.",
  note:"**שחזור.** השראה: סרטון אחד ב-prompt-motion.com (21.10.2026) שבו משפט קבוע נגמר במילה מתחלפת, והרקע וכרטיס של התוצר מתחלפים איתה, עם צורות רכות שנעות מאחור. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הראשון:** המילה הראשונה בכפתור, הכרטיס הראשון והרקע הראשון, ומתחתיהם משפט שמונה את כל התוצרים. בלי GSAP ובהפחתת תנועה זה מה שרואים והמידע שלם. **כשהמהלך רץ** הסקשן גבוה פי ארבעה, הבמה נדבקת למסך והמילים והכרטיסים נערמים באותו תא. בכל מעבר: **הרקע** מתחלף בדעיכה בין ארבע שכבות, כי GSAP לא יודע לעבור בין צבעי `color-mix`. **המילה** עולה החוצה והבאה נכנסת מלמטה בתוך הכפתור, שרוחבו עובר מרוחב מילה לרוחב מילה (המדידה נעשית בכל רענון). **הכרטיס** הקודם יוצא שמאלה והבא נכנס מימין. שתי כתמים רכים נעים לאורך כל הטיימליין. **הכרטיסים הם איור:** `aria-hidden` ובלי כפתורים אמיתיים. בפרויקט מחליפים אותם בצילומי מסך של העבודות. **רוחב מלא:** הבמה יוצאת מהמיכל עד קצה המסך (`100vw`), ובסקשן שכבר ברוחב מלא אפשר למחוק את זה. **באתר משמאל לימין** מחליפים את סימן ה-`xPercent` של הכרטיסים. **נגישות:** הכותרת הנראית מוסתרת מקורא מסך, ובמקומה כותרת בטקסט מוסתר עם כל ארבע המילים.",
  libs:["gsap","ScrollTrigger"],
  css:`.ns{max-width:1180px;margin-inline:auto}
.ns-pin{position:relative;isolation:isolate;overflow:clip;display:grid;align-items:center;min-height:clamp(480px,70vh,640px);margin-inline:calc(50% - 50vw);padding-inline:calc(50vw - 50%)}
.ns-bgs,.ns-blobs{position:absolute;inset:0;z-index:-1;pointer-events:none}
.ns-bgs i{position:absolute;inset:0;opacity:0}
.ns-bgs i:first-child{opacity:1}
.ns-b1{background:color-mix(in srgb,var(--accent) 12%,var(--bg))}
.ns-b2{background:color-mix(in srgb,var(--ink) 8%,var(--bg))}
.ns-b3{background:color-mix(in srgb,var(--accent) 20%,var(--bg))}
.ns-b4{background:color-mix(in srgb,var(--muted) 14%,var(--bg))}
.ns-blobs i{position:absolute;width:min(46vw,520px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 30%,transparent),transparent 65%)}
.ns-blobs i:first-child{inset-block-start:-12%;inset-inline-start:-6%}
.ns-blobs i:last-child{inset-block-end:-18%;inset-inline-end:8%;opacity:.7}
.ns-in{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,88px);padding-block:48px}
.ns-copy{display:grid;gap:24px}
.ns-h{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:.2em .35em;font-size:clamp(34px,5vw,72px);font-weight:700;line-height:1.1;letter-spacing:-.01em}
.ns-pill{box-sizing:border-box;display:inline-grid;place-items:center;overflow:clip;padding:.04em .42em .1em;border-radius:999px;background:var(--accent);color:var(--accent-ink)}
.ns-n{grid-area:1/1;width:max-content;white-space:nowrap}
.ns-n:not(:first-child){display:none}
.ns-sum{margin:0;max-width:34ch;font-size:var(--fs-body);line-height:1.6}
.ns-cards{position:relative;display:grid;place-items:center;min-height:clamp(240px,30vw,360px)}
.ns-card{grid-area:1/1;display:grid;width:min(420px,100%);aspect-ratio:4 / 3;border-radius:20px;background:var(--card);box-shadow:0 0 0 1px var(--line),0 24px 48px -24px color-mix(in srgb,var(--ink) 40%,transparent);overflow:clip}
.ns-card:not(:first-child){display:none}
.ns-web{grid-template-rows:auto 1fr}
.ns-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--line)}
.ns-bar i{width:8px;height:8px;border-radius:50%;background:var(--line)}
.ns-bar span{margin-inline-start:auto;direction:ltr;font-size:12px;color:var(--muted)}
.ns-pg{display:grid;align-content:start;gap:10px;padding:16px}
.ns-hero{display:block;height:78px;border-radius:12px;background:var(--accent)}
.ns-ln{display:block;height:8px;border-radius:4px;background:var(--line)}
.ns-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px}
.ns-tiles i{height:44px;border-radius:8px;background:color-mix(in srgb,var(--accent) 22%,var(--card))}
.ns-logo{place-items:center;align-content:center;gap:10px;text-align:center}
.ns-mark{display:grid;place-items:center;width:88px;height:88px;border-radius:26px;background:var(--accent);color:var(--accent-ink);font-size:44px;font-weight:700}
.ns-logo b{font-size:22px}
.ns-logo small{font-size:14px;color:var(--muted)}
.ns-ad{grid-template-columns:1fr 1fr;gap:16px;padding:16px}
.ns-img{border-radius:14px;background:linear-gradient(150deg,color-mix(in srgb,var(--accent) 70%,var(--card)),color-mix(in srgb,var(--ink) 40%,var(--card)))}
.ns-adt{display:grid;align-content:center;gap:10px}
.ns-adt b{font-size:20px;line-height:1.2}
.ns-btn{justify-self:start;padding:8px 16px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:14px;font-weight:600}
.ns-sl{grid-template-rows:auto 1fr;gap:14px;padding:20px}
.ns-sl b{font-size:20px}
.ns-bars{display:flex;align-items:flex-end;gap:10px;border-bottom:1px solid var(--line)}
.ns-bars i{flex:1;height:var(--h);border-radius:8px 8px 0 0;background:var(--accent)}
.ns-bars i:nth-child(even){background:color-mix(in srgb,var(--accent) 45%,var(--card))}
.ns .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* המהלך רץ: הסקשן גבוה, הבמה נדבקת, והמילים והכרטיסים נערמים באותו תא */
.ns.is-live{height:400vh}
.ns.is-live .ns-pin{position:sticky;top:0;height:100vh;height:100svh}
.ns.is-live .ns-n:not(:first-child),.ns.is-live .ns-card:not(:first-child){display:grid}
@media(max-width:767px){.ns-in{grid-template-columns:minmax(0,1fr);gap:24px;padding-block:32px}.ns-cards{min-height:min(64vw,260px)}}`,
  html:`<div class="stage"><div class="ns">
  <div class="ns-pin">
    <div class="ns-bgs" aria-hidden="true"><i class="ns-b1"></i><i class="ns-b2"></i><i class="ns-b3"></i><i class="ns-b4"></i></div>
    <div class="ns-blobs" aria-hidden="true"><i></i><i></i></div>
    <div class="ns-in">
      <div class="ns-copy">
        <h2 class="ns-h"><span class="sr-only">אנחנו מכינים לעסק אתר, לוגו, קמפיין ומצגת</span><span aria-hidden="true">אנחנו מכינים לעסק</span><span class="ns-pill" aria-hidden="true"><span class="ns-n">אתר</span><span class="ns-n">לוגו</span><span class="ns-n">קמפיין</span><span class="ns-n">מצגת</span></span></h2>
        <p class="ns-sum">אתרים, לוגואים, קמפיינים ומצגות, וכל אחד נבנה סביב העסק שהזמין אותו ולא מתבנית מוכנה.</p>
      </div>
      <div class="ns-cards" aria-hidden="true">
        <div class="ns-card ns-web"><div class="ns-bar"><i></i><i></i><i></i><span>almog-cafe.co.il</span></div><div class="ns-pg"><span class="ns-hero"></span><span class="ns-ln" style="width:62%"></span><span class="ns-ln" style="width:44%"></span><div class="ns-tiles"><i></i><i></i><i></i></div></div></div>
        <div class="ns-card ns-logo"><span class="ns-mark">א</span><b>קפה אלמוג</b><small>בית קלייה</small></div>
        <div class="ns-card ns-ad"><div class="ns-img"></div><div class="ns-adt"><b>פתיחת עונה בבית הקלייה</b><span class="ns-ln" style="width:80%"></span><span class="ns-btn">לפרטים</span></div></div>
        <div class="ns-card ns-sl"><b>סיכום רבעון</b><div class="ns-bars"><i style="--h:34%"></i><i style="--h:52%"></i><i style="--h:44%"></i><i style="--h:72%"></i><i style="--h:88%"></i></div></div>
      </div>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארים המילה והכרטיס הראשונים
  const root=document.querySelector(".ns"),pill=root.querySelector(".ns-pill"),nouns=[...root.querySelectorAll(".ns-n")];
  const cards=[...root.querySelectorAll(".ns-card")],bgs=[...root.querySelectorAll(".ns-bgs i")],blobs=[...root.querySelectorAll(".ns-blobs i")];
  const N=Math.min(nouns.length,cards.length,bgs.length);
  // בהפחתת תנועה הפונקציה לא רצה, והמצב הראשון נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const pad=()=>{const c=getComputedStyle(pill);return parseFloat(c.paddingLeft)+parseFloat(c.paddingRight);};
    const W=i=>nouns[i].offsetWidth+pad();      // רוחב הכפתור סביב המילה i
    gsap.set(pill,{width:W(0)});
    gsap.set(nouns.slice(1),{yPercent:110,opacity:0});
    gsap.set(cards.slice(1),{xPercent:40,scale:.94,opacity:0});
    gsap.set(bgs.slice(1),{opacity:0});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,invalidateOnRefresh:true}});
    let t=.6;
    for(let i=0;i<N-1;i++){
      // רקע בדעיכה, מילה שעולה החוצה ובאה מלמטה, כפתור שמשנה רוחב, כרטיס שיוצא שמאלה ובא מימין
      tl.to(bgs[i],{opacity:0,duration:1,ease:"power1.inOut"},t)
        .to(bgs[i+1],{opacity:1,duration:1,ease:"power1.inOut"},t)
        .to(nouns[i],{yPercent:-110,opacity:0,duration:.6,ease:"power2.in"},t)
        .fromTo(nouns[i+1],{yPercent:110,opacity:0},{yPercent:0,opacity:1,duration:.7,ease:"power3.out",immediateRender:false},t+.35)
        .to(pill,{width:()=>W(i+1),duration:.8,ease:"power3.inOut"},t+.1)
        .to(cards[i],{xPercent:-40,scale:.94,opacity:0,duration:.6,ease:"power2.in"},t)
        .fromTo(cards[i+1],{xPercent:40,scale:.94,opacity:0},{xPercent:0,scale:1,opacity:1,duration:.8,ease:"expo.out",immediateRender:false},t+.4);
      t+=2;
    }
    tl.to({},{duration:.6},t);
    const D=tl.duration();
    blobs.forEach((b,i)=>tl.fromTo(b,{xPercent:i?20:-20,yPercent:i?-10:10},{xPercent:i?-30:30,yPercent:i?20:-20,duration:D,ease:"none"},0));
    const sync=()=>{if(tl.progress()===0)gsap.set(pill,{width:W(0)});};      // שינוי גודל או פונט שנטען לפני שהתחילו לגלול
    ScrollTrigger.addEventListener("refresh",sync);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>ScrollTrigger.refresh());
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);root.classList.remove("is-live");gsap.set([pill].concat(nouns,cards,bgs,blobs),{clearProps:"all"});};
  });
})();`
},
{
  id:"g191", cat:"gsap", name:"מסכים מקוננים שמתקרבים פנימה", tech:"GSAP · ScrollTrigger scrub · pinned · container units", status:"מאושר-עין",
  desc:"חלון הזמנת תור שבתוכו, בצד, מסך קטן שהוא השלב הבא, ובתוכו עוד אחד, ועוד אחד. הגלילה מקרבת את המצלמה פנימה: המסך הקטן גדל עד שהוא ממלא את החלון והופך לשלב הבא, וכך ארבע פעמים, עד לאישור התור. מסך אחד, ארבעה שלבים, בלי חיתוך.",
  when:"תהליך של שלושה עד חמישה שלבים שרוצים להראות כרצף אחד: הזמנת תור, הרשמה, קניית חבילה, קליטת לקוח. סקשן אחד בעמוד שירות או תהליך. מתאים כשכל שלב הוא מסך אמיתי שאפשר לצייר בפשטות. לא מתאים כשיש הרבה טקסט בכל שלב, כי המסכים הפנימיים קטנים מאוד עד שהם מגיעים אליך.",
  note:"**שחזור.** השראה: סרטון אחד ב-prompt-motion.com של נגן שמכיל מסך שמנגן את אותו נגן, והמצלמה צוללת פנימה שוב ושוב (21.10.2026). נבנה מאפס מהצפייה. **העיקרון:** כל מסך הוא עותק של החלון, מוקטן ב-`--s` ומוזז לחריץ ב-`--sx` ו-`--sy` (שברים מגודל החלון). ארבעת המסכים הם אחים שטוחים בתוך `.ds-world` ולא מקוננים בפועל: מסך k מוקטן ב-`s` בחזקת k ומוזז בסכום סדרה הנדסית, ולכן החישוב הוא `translate` ו-`scale` נקיים בלי חיתוכים. **הזום:** כל המסכים מקבלים מקדם אחד `z = (1/s)^p` סביב נקודת השבת של ההעתקה `sx/(1-s)`, שנמצאת ב-`transform-origin` של העולם. כש-`p` הוא מספר שלם, מסך מספר p ממלא בדיוק את החלון. **תנועה:** מונה אחד `p` (0 עד 3) נע בשלוש קפיצות עם עצירה בין כל שתיים, כדי שכל שלב יספיק להיקרא. **חיסכון:** מסך שכוסה לגמרי על ידי הבא אחריו מקבל `visibility:hidden`. **חדות:** בלי `will-change` ובלי 3D, כדי שהטקסט יצויר מחדש חד בכל גודל. **היחידות:** כל מסך הוא `container` (`cqw`), ולכן גודל הפונט והריווחים נגזרים מרוחב המסך ולא מהדף. **במובייל** המסכים בפורמט עומד, החריץ במרכז מתחת לטקסט, והמשתנים `--s`, `--sx`, `--sy` מוחלפים ב-CSS (הקוד קורא אותם מחדש בכל רענון). **המצב הסטטי:** כל ארבעת המסכים מקוננים בגודל מלא ללא תנועה, ומתחתיהם הרשימה הממוספרת של השלבים, שהיא גם התוכן לקורא מסך. **אין כפתורים אמיתיים** בתוך המסכים, כי הם איור. **באתר משמאל לימין** מחליפים את צד החריץ (`--sx` הופך ל-`1 - s - sx`) ואת מיקום הטקסט.",
  libs:["gsap","ScrollTrigger"],
  css:`.ds{max-width:1040px;margin-inline:auto}
.ds-pin{display:grid;gap:24px;justify-items:center;align-content:center}
.ds-h{margin:0;font-size:clamp(26px,3.4vw,44px);font-weight:700;line-height:1.15;text-align:center}
.ds-view{--s:.4;--sx:.06;--sy:.3;--u:1cqw;position:relative;width:min(960px,100%,calc(62svh*1.6));aspect-ratio:16 / 10;margin-inline:auto;border-radius:20px;overflow:clip;background:color-mix(in srgb,var(--ink) 8%,var(--bg));box-shadow:0 0 0 1px var(--line),0 32px 64px -32px color-mix(in srgb,var(--ink) 45%,transparent)}
.ds-world{position:absolute;inset:0;transform-origin:calc(var(--sx)/(1 - var(--s))*100%) calc(var(--sy)/(1 - var(--s))*100%)}
.ds-l{position:absolute;left:0;top:0;width:100%;height:100%;container-type:size;transform-origin:0 0;transform:translate(calc(var(--tx)*100%),calc(var(--ty)*100%)) scale(var(--sc))}
.ds-l0{--tx:0;--ty:0;--sc:1}
.ds-l1{--tx:var(--sx);--ty:var(--sy);--sc:var(--s)}
.ds-l2{--tx:calc(var(--sx)*(1 + var(--s)));--ty:calc(var(--sy)*(1 + var(--s)));--sc:calc(var(--s)*var(--s))}
.ds-l3{--tx:calc(var(--sx)*(1 + var(--s) + var(--s)*var(--s)));--ty:calc(var(--sy)*(1 + var(--s) + var(--s)*var(--s)));--sc:calc(var(--s)*var(--s)*var(--s))}
.ds-fr{position:absolute;inset:0;overflow:clip;border-radius:calc(var(--u)*1.6);background:var(--card);box-shadow:0 0 0 1px var(--line)}
.ds-tb{position:absolute;inset-inline:0;top:0;height:9%;display:flex;align-items:center;gap:calc(var(--u)*.8);padding-inline:calc(var(--u)*2.4);border-bottom:1px solid var(--line);font-size:calc(var(--u)*1.5);color:var(--muted)}
.ds-tb i{width:calc(var(--u)*1.1);height:calc(var(--u)*1.1);border-radius:50%;background:var(--line)}
.ds-tb span{margin-inline-start:calc(var(--u)*1.6)}
.ds-tx{position:absolute;inset-inline-start:5%;top:54.5%;width:44%;display:grid;gap:calc(var(--u)*1.6);transform:translateY(-50%)}
.ds-tx small{font-size:calc(var(--u)*1.5);color:var(--muted)}
.ds-tx b{font-size:calc(var(--u)*3.4);line-height:1.15}
.ds-tx p{margin:0;font-size:calc(var(--u)*1.9);line-height:1.5}
.ds-ch{display:flex;flex-wrap:wrap;gap:calc(var(--u)*1)}
.ds-ch span{padding:calc(var(--u)*.6) calc(var(--u)*1.6);border:1px solid var(--line);border-radius:999px;font-size:calc(var(--u)*1.7)}
.ds-ch .on{border-color:transparent;background:var(--accent);color:var(--accent-ink)}
.ds-fd{display:grid;gap:calc(var(--u)*.6)}
.ds-in{display:flex;align-items:center;height:calc(var(--u)*4.2);padding-inline:calc(var(--u)*1.4);border:1px solid var(--line);border-radius:calc(var(--u)*1);background:var(--bg);font-size:calc(var(--u)*1.7)}
.ds-in i{display:block;width:40%;height:35%;border-radius:999px;background:var(--line)}
.ds-go{justify-self:start;padding:calc(var(--u)*.9) calc(var(--u)*2.4);border-radius:999px;background:var(--ink);color:var(--bg);font-size:calc(var(--u)*1.7);font-weight:600}
.ds-slot,.ds-ok{position:absolute;left:calc(var(--sx)*100%);top:calc(var(--sy)*100%);width:calc(var(--s)*100%);height:calc(var(--s)*100%)}
.ds-slot{border-radius:calc(var(--u)*1.2);background:color-mix(in srgb,var(--ink) 6%,var(--card))}
.ds-ok{display:grid;place-items:center}
.ds-ok i{display:grid;place-items:center;width:42%;aspect-ratio:1;border-radius:50%;background:var(--accent)}
.ds-ok svg{width:52%;height:52%;fill:none;stroke:var(--accent-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.ds-pr{position:absolute;inset-inline:5%;bottom:6%;display:flex;gap:calc(var(--u)*.8)}
.ds-pr i{flex:1;height:calc(var(--u)*.7);border-radius:999px;background:var(--line)}
.ds-pr i.on{background:var(--accent)}
.ds-steps{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 32px;margin:0;padding:0;list-style-position:inside;font-size:var(--fs-body);color:var(--muted)}
.ds-steps li{transition:color .2s linear}
.ds-steps li.is-on{color:var(--ink);font-weight:700}
/* המהלך רץ: הסקשן גבוה, הבמה נדבקת, והעולם מתקרב לפי הגלילה */
.ds.is-live{height:420vh}
.ds.is-live .ds-pin{position:sticky;top:0;height:100vh;height:100svh}
@media(max-width:767px){
.ds-view{--s:.46;--sx:.27;--sy:.46;--u:1.6cqw;width:min(100%,calc(52svh*.8));aspect-ratio:4 / 5}
.ds-tb{height:7%}
.ds-tx{inset-inline:7%;top:10%;width:auto;transform:none}
.ds-pr{display:none}
.ds-steps{gap:4px 20px}
}`,
  html:`<div class="stage"><div class="ds">
  <div class="ds-pin">
    <h2 class="ds-h">הזמנת תור בארבעה מסכים</h2>
    <div class="ds-view" aria-hidden="true"><div class="ds-world">
      <div class="ds-l ds-l0"><div class="ds-fr">
        <div class="ds-tb"><i></i><i></i><i></i><span>מרפאת השרון · קביעת תור</span></div>
        <div class="ds-tx"><small>שלב ראשון מארבעה</small><b>בחירת טיפול</b><div class="ds-ch"><span class="on">ייעוץ ראשוני</span><span>ניקוי</span><span>טיפול</span></div><span class="ds-go">המשך</span></div>
        <div class="ds-slot"></div>
        <div class="ds-pr"><i class="on"></i><i></i><i></i><i></i></div>
      </div></div>
      <div class="ds-l ds-l1"><div class="ds-fr">
        <div class="ds-tb"><i></i><i></i><i></i><span>מרפאת השרון · קביעת תור</span></div>
        <div class="ds-tx"><small>שלב שני מארבעה</small><b>בחירת מועד</b><div class="ds-ch"><span>ראשון</span><span class="on">שני</span><span>שלישי</span></div><div class="ds-ch"><span>09:00</span><span class="on">10:30</span><span>12:00</span></div><span class="ds-go">המשך</span></div>
        <div class="ds-slot"></div>
        <div class="ds-pr"><i class="on"></i><i class="on"></i><i></i><i></i></div>
      </div></div>
      <div class="ds-l ds-l2"><div class="ds-fr">
        <div class="ds-tb"><i></i><i></i><i></i><span>מרפאת השרון · קביעת תור</span></div>
        <div class="ds-tx"><small>שלב שלישי מארבעה</small><b>פרטים ליצירת קשר</b><div class="ds-fd"><small>שם מלא</small><span class="ds-in">דנה כהן</span></div><div class="ds-fd"><small>טלפון</small><span class="ds-in"><i></i></span></div><span class="ds-go">אישור התור</span></div>
        <div class="ds-slot"></div>
        <div class="ds-pr"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
      </div></div>
      <div class="ds-l ds-l3"><div class="ds-fr">
        <div class="ds-tb"><i></i><i></i><i></i><span>מרפאת השרון · קביעת תור</span></div>
        <div class="ds-tx"><small>שלב אחרון</small><b>התור נקבע</b><p>נתראה ביום שני בשעה 10:30, במרפאת השרון.</p></div>
        <div class="ds-ok"><i><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></i></div>
        <div class="ds-pr"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
      </div></div>
    </div></div>
    <ol class="ds-steps"><li class="is-on">בחירת טיפול</li><li>בחירת מועד</li><li>פרטים ליצירת קשר</li><li>אישור התור</li></ol>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארים ארבעת המסכים המקוננים
  const root=document.querySelector(".ds"),view=root.querySelector(".ds-view"),world=root.querySelector(".ds-world");
  const lv=[...world.querySelectorAll(".ds-l")],steps=[...root.querySelectorAll(".ds-steps li")];
  // בהפחתת תנועה הפונקציה לא רצה, והמסכים נשארים מקוננים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const P={p:0};
    let s=.4;
    const rd=()=>{s=parseFloat(getComputedStyle(view).getPropertyValue("--s"))||.4;};      // החריץ שונה בטלפון
    const draw=()=>{
      const z=Math.pow(1/s,P.p);      // z = (1/s)^p: כשp שלם, מסך מספר p ממלא את החלון
      world.style.transform="scale("+z.toFixed(4)+")";
      lv.forEach((l,k)=>{l.style.visibility=(k<lv.length-1&&z*Math.pow(s,k+1)>1.02)?"hidden":"";});      // מסך שהבא אחריו כיסה אותו לגמרי
      const cur=Math.round(P.p);
      steps.forEach((li,i)=>li.classList.toggle("is-on",i===cur));
    };
    rd();
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    tl.eventCallback("onUpdate",draw);
    tl.to({},{duration:.5});
    for(let k=1;k<=3;k++){
      tl.fromTo(P,{p:k-1},{p:k,duration:1.2,ease:"power2.inOut",immediateRender:false});
      tl.to({},{duration:k<3?.7:.8});
    }
    const sync=()=>{rd();draw();};
    ScrollTrigger.addEventListener("refresh",sync);
    return()=>{ScrollTrigger.removeEventListener("refresh",sync);root.classList.remove("is-live");world.style.transform="";lv.forEach(l=>{l.style.visibility="";});steps.forEach((li,i)=>li.classList.toggle("is-on",i===0));};
  });
})();`
},
{
  id:"g192", cat:"gsap", name:"שני גרפים שמונעים על ידי פרמטר אחד", tech:"GSAP · ScrollTrigger scrub · SVG clipPath", status:"מאושר-עין",
  desc:"הכמות עולה בגלילה, וסמן אחד נע על שני גרפים בו זמנית: בראשון המחיר ליחידה צונח, בשני המחיר הכולל עולה. שלושה מספרים מתעדכנים מעל הגרפים, ושורות הטבלה למטה נדלקות כשהסמן עובר עליהן. מי שגולל מבין למה הכמות הגדולה משתלמת בלי שאף אחד הסביר.",
  when:"הסבר תמחור, ריביות, חיסכון או כל קשר בין כמות לעלות. סקשן אחד בעמוד מחירים או מאמר. מתאים כשיש נוסחה אחת פשוטה ושני גדלים שנגזרים ממנה. לא מתאים לנתונים אמיתיים מרובים, כי הגרף כאן הוא עקומה מחושבת.",
  note:"**שחזור.** השראה: סרטונים ב-prompt-motion.com שבהם פרמטר אחד נע ושני תרשימים (או תרשים וטבלה) מתעדכנים יחד (21.10.2026). נבנה מאפס מהצפייה. **הנוסחה:** מחיר ליחידה `p(q) = 2 + 600/(q+60)` והמחיר הכולל `T = q·p`, לכן הגרף הראשון צונח והשני כמעט ישר. הנתונים כאן הם דוגמה: מחליפים את `P` ב-JS ואת שני המסלולים ב-SVG בנתוני הלקוח. **הציור:** המסלול המלא מצויר פעם אחת בקו חלש, והקו הצבעוני מעליו נחשף על ידי מלבן `clipPath` שרוחבו גדל. כך אין `stroke-dashoffset` ולא נדרש אורך מסלול. הסמן והקו המקווקו חיים על אותה נוסחה (לא על `getPointAtLength`), ולכן הם תמיד מדויקים על הקו. **הפרמטר:** מונה אחד `u` (0 עד 1) נגזר מהגלילה, `q = 50 + 950·u`, וכל מה שמוצג נגזר ממנו בפונקציה אחת. **טבלה:** כל שורה נדלקת כש-`q` עובר את הערך שלה. **המצב הסטטי:** שני הגרפים מלאים, הסמן בכמות 1000 והטבלה כולה בולטת, כלומר בלי GSAP ובהפחתת תנועה רואים את התשובה. **נגישות:** שני ה-SVG מוסתרים מקורא מסך, והטבלה עם כיתוב מוסתר היא התוכן שלו. **ציר המספרים** נשאר משמאל לימין (`direction:ltr`) גם בעמוד בעברית, כי כך קוראים גרף. **באתר משמאל לימין** אין מה להחליף.",
  libs:["gsap","ScrollTrigger"],
  css:`.lc{max-width:1040px;margin-inline:auto;display:grid;gap:32px}
.lc-h{margin:0;font-size:clamp(26px,3.4vw,44px);font-weight:700;line-height:1.15}
.lc-p{margin:0;max-width:54ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.lc-rds{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.lc-rds div{display:grid;gap:4px;padding:16px 20px;border-radius:16px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.lc-rds small{font-size:14px;color:var(--muted)}
.lc-rds b{display:block;font-size:clamp(24px,3.4vw,40px);font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums;text-align:start}
.lc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.lc-card{display:grid;gap:12px;padding:20px;border-radius:20px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.lc-card h3{margin:0;font-size:18px;font-weight:700}
.lc-card svg{display:block;width:100%;height:auto;direction:ltr}
.lc-ax,.lc-gr{stroke:var(--line);stroke-width:1}
.lc-gr{stroke-dasharray:2 5}
.lc-dim{fill:none;stroke:var(--line);stroke-width:2.5}
.lc-ln{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.lc-gd{stroke:var(--muted);stroke-width:1;stroke-dasharray:3 4}
.lc-mk{fill:var(--accent);stroke:var(--card);stroke-width:2}
.lc-tk{font-size:11px;fill:var(--muted);text-anchor:middle}
.lc-t{width:100%;max-width:720px;border-collapse:collapse;font-size:var(--fs-body);font-variant-numeric:tabular-nums}
.lc-t th,.lc-t td{padding:12px 16px;border-bottom:1px solid var(--line);text-align:start}
.lc-t th{font-size:14px;font-weight:600;color:var(--muted)}
.lc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
/* המהלך רץ: שורות שהסמן עוד לא הגיע אליהן מעומעמות */
.lc.is-live .lc-t tbody tr{opacity:.4;transition:opacity .2s linear}
.lc.is-live .lc-t tbody tr.is-on{opacity:1}
@media(max-width:767px){.lc-grid{grid-template-columns:minmax(0,1fr)}.lc-rds{gap:8px}.lc-rds div{padding:12px}}`,
  html:`<div class="stage"><div class="lc">
  <div>
    <h2 class="lc-h">מחיר ההדפסה לפי כמות</h2>
    <p class="lc-p">ככל שהכמות גדלה, המחיר ליחידה יורד מהר בהתחלה ואחר כך כמעט נעצר, והמחיר הכולל ממשיך לעלות בקו כמעט ישר.</p>
  </div>
  <div class="lc-rds" aria-hidden="true">
    <div><small>כמות</small><b dir="ltr" data-rq>1000</b></div>
    <div><small>מחיר ליחידה</small><b dir="ltr" data-ru>₪2.57</b></div>
    <div><small>מחיר כולל</small><b dir="ltr" data-rt>₪2,566</b></div>
  </div>
  <div class="lc-grid">
    <div class="lc-card"><h3>מחיר ליחידה</h3>
      <svg viewBox="0 0 360 220" aria-hidden="true" focusable="false"><defs><clipPath id="lc-ca"><rect x="40" y="0" width="308" height="220"/></clipPath></defs>
        <line class="lc-gr" x1="40" y1="103" x2="348" y2="103"/><line class="lc-ax" x1="40" y1="14" x2="40" y2="192"/><line class="lc-ax" x1="40" y1="192" x2="348" y2="192"/>
        <path class="lc-dim" d="M55.4,30.2L63.1,60.1L70.8,80.8L78.5,95.8L86.2,107.2L93.9,116.3L101.6,123.5L109.3,129.5L117,134.6L124.7,138.9L132.4,142.6L140.1,145.8L147.8,148.6L155.5,151.1L163.2,153.3L170.9,155.3L178.6,157.1L186.3,158.7L194,160.2L201.7,161.6L209.4,162.8L217.1,164L224.8,165L232.5,166L240.2,166.9L247.9,167.8L255.6,168.6L263.3,169.3L271,170L278.7,170.7L286.4,171.3L294.1,171.9L301.8,172.4L309.5,173L317.2,173.5L324.9,173.9L332.6,174.4L340.3,174.8L348,175.2"/>
        <path class="lc-ln" clip-path="url(#lc-ca)" d="M55.4,30.2L63.1,60.1L70.8,80.8L78.5,95.8L86.2,107.2L93.9,116.3L101.6,123.5L109.3,129.5L117,134.6L124.7,138.9L132.4,142.6L140.1,145.8L147.8,148.6L155.5,151.1L163.2,153.3L170.9,155.3L178.6,157.1L186.3,158.7L194,160.2L201.7,161.6L209.4,162.8L217.1,164L224.8,165L232.5,166L240.2,166.9L247.9,167.8L255.6,168.6L263.3,169.3L271,170L278.7,170.7L286.4,171.3L294.1,171.9L301.8,172.4L309.5,173L317.2,173.5L324.9,173.9L332.6,174.4L340.3,174.8L348,175.2"/>
        <line class="lc-gd" x1="348" y1="175.2" x2="348" y2="192"/><circle class="lc-mk" cx="348" cy="175.2" r="5"/>
        <text class="lc-tk" x="117" y="209">250</text><text class="lc-tk" x="194" y="209">500</text><text class="lc-tk" x="340" y="209">1000</text></svg>
    </div>
    <div class="lc-card"><h3>מחיר כולל</h3>
      <svg viewBox="0 0 360 220" aria-hidden="true" focusable="false"><defs><clipPath id="lc-cb"><rect x="40" y="0" width="308" height="220"/></clipPath></defs>
        <line class="lc-gr" x1="40" y1="103" x2="348" y2="103"/><line class="lc-ax" x1="40" y1="14" x2="40" y2="192"/><line class="lc-ax" x1="40" y1="192" x2="348" y2="192"/>
        <path class="lc-dim" d="M55.4,168.3L63.1,161.3L70.8,155.4L78.5,150.3L86.2,145.7L93.9,141.3L101.6,137.2L109.3,133.3L117,129.5L124.7,125.7L132.4,122.1L140.1,118.5L147.8,114.9L155.5,111.4L163.2,108L170.9,104.5L178.6,101.1L186.3,97.7L194,94.4L201.7,91L209.4,87.7L217.1,84.4L224.8,81L232.5,77.7L240.2,74.4L247.9,71.1L255.6,67.9L263.3,64.6L271,61.3L278.7,58.1L286.4,54.8L294.1,51.6L301.8,48.3L309.5,45.1L317.2,41.8L324.9,38.6L332.6,35.3L340.3,32.1L348,28.9"/>
        <path class="lc-ln" clip-path="url(#lc-cb)" d="M55.4,168.3L63.1,161.3L70.8,155.4L78.5,150.3L86.2,145.7L93.9,141.3L101.6,137.2L109.3,133.3L117,129.5L124.7,125.7L132.4,122.1L140.1,118.5L147.8,114.9L155.5,111.4L163.2,108L170.9,104.5L178.6,101.1L186.3,97.7L194,94.4L201.7,91L209.4,87.7L217.1,84.4L224.8,81L232.5,77.7L240.2,74.4L247.9,71.1L255.6,67.9L263.3,64.6L271,61.3L278.7,58.1L286.4,54.8L294.1,51.6L301.8,48.3L309.5,45.1L317.2,41.8L324.9,38.6L332.6,35.3L340.3,32.1L348,28.9"/>
        <line class="lc-gd" x1="348" y1="28.9" x2="348" y2="192"/><circle class="lc-mk" cx="348" cy="28.9" r="5"/>
        <text class="lc-tk" x="117" y="209">250</text><text class="lc-tk" x="194" y="209">500</text><text class="lc-tk" x="340" y="209">1000</text></svg>
    </div>
  </div>
  <table class="lc-t"><caption class="sr-only">מחיר ההדפסה לפי כמות</caption>
    <thead><tr><th scope="col">כמות</th><th scope="col">מחיר ליחידה</th><th scope="col">מחיר כולל</th></tr></thead>
    <tbody>
      <tr class="is-on" data-q="50"><td>50</td><td>₪7.45</td><td>₪373</td></tr>
      <tr class="is-on" data-q="100"><td>100</td><td>₪5.75</td><td>₪575</td></tr>
      <tr class="is-on" data-q="250"><td>250</td><td>₪3.94</td><td>₪984</td></tr>
      <tr class="is-on" data-q="500"><td>500</td><td>₪3.07</td><td>₪1,536</td></tr>
      <tr class="is-on" data-q="1000"><td>1000</td><td>₪2.57</td><td>₪2,566</td></tr>
    </tbody>
  </table>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארים הגרפים המלאים
  const root=document.querySelector(".lc");
  const rects=[...root.querySelectorAll("clipPath rect")],mk=[...root.querySelectorAll(".lc-mk")],gd=[...root.querySelectorAll(".lc-gd")];
  const rows=[...root.querySelectorAll(".lc-t tbody tr")];
  const rq=root.querySelector("[data-rq]"),ru=root.querySelector("[data-ru]"),rt=root.querySelector("[data-rt]");
  // הנוסחה: מחיר ליחידה p(q) ומחיר כולל T = q·p. אותם ערכים כמו ב-SVG שבמארקאפ
  const P=q=>2+600/(q+60),X=q=>40+q/1000*308,YA=p=>14+(8-p)/6*178,YB=t=>192-t/2800*178;
  const set=(el,o)=>{for(const k in o)el.setAttribute(k,o[k]);};
  const render=q=>{
    const p=P(q),t=q*p,x=X(q),ya=YA(p),yb=YB(t);
    rects.forEach(r=>r.setAttribute("width",(x-40).toFixed(2)));
    set(mk[0],{cx:x,cy:ya});set(mk[1],{cx:x,cy:yb});
    set(gd[0],{x1:x,x2:x,y1:ya,y2:192});set(gd[1],{x1:x,x2:x,y1:yb,y2:192});
    rq.textContent=Math.round(q);ru.textContent="₪"+p.toFixed(2);rt.textContent="₪"+Math.round(t).toLocaleString("en-US");
    rows.forEach(r=>r.classList.toggle("is-on",+r.dataset.q<=q+.5));
  };
  // בהפחתת תנועה הפונקציה לא רצה, והגרפים נשארים מלאים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const U={u:0};
    const draw=()=>render(50+950*U.u);
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top 75%",end:"bottom 55%",scrub:.7}});
    tl.eventCallback("onUpdate",draw);
    tl.fromTo(U,{u:0},{u:1,duration:1});
    draw();
    ScrollTrigger.addEventListener("refresh",draw);
    return()=>{ScrollTrigger.removeEventListener("refresh",draw);root.classList.remove("is-live");render(1000);};
  });
})();`
},
{
  id:"g193", cat:"gsap", name:"שני מונים במירוץ בזמנים שונים", tech:"GSAP · ScrollTrigger · counters", status:"מאושר-עין",
  desc:"שתי שעוני עצר זו לצד זו, והמהירה מסתיימת אחרי שנייה אחת עם תג סיום ועלות קטנה, בזמן שהאיטית ממשיכה לספור והעלות שלה ממשיכה לגדול. ההבדל בין ארבע דקות לעשרים ואחת דקות נראה בעין לפני שמישהו קרא מילה.",
  when:"השוואה בין שתי דרכים לעשות אותו דבר, אנחנו מול הדרך הישנה: תבנית מול מאפס, אוטומציה מול ידני. סקשן אחד בעמוד שירות או מחיר. מתאים כשיש שני זמנים ושני מחירים ברורים. לא מתאים להשוואה של יותר משתי אפשרויות.",
  note:"**שחזור.** השראה: שני סרטונים ב-prompt-motion.com עם שתי כרטיסיות שעון עצר שמסיימות בזמנים שונים מאוד (21.10.2026). נבנה מאפס מהצפייה. **העיקרון:** מונה אחד `R.t` רץ ליניארית מ-0 עד 5.63 שניות אמיתיות, ושתי השעונים נגזרים ממנו באותו מקדם `K`, כך שהמהירה מגיעה לסוף (04:12) ב-1.1 שניות והאיטית (21:30) ב-5.63. העלות היא `סך השניות חלקי 60 כפול התעריף` ומתעדכנת בכל פריים. **הסרגל** הוא `scaleX` עם נקודת מוצא בצד ההתחלה (ימין בעברית), והוא מתמלא עד אותו אחוז של הזמן. **התג:** התג של הכרטיס המהיר קופץ ב-`expo.out` ברגע שהשעון נעצר, והסטטוס של האיטית מתחלף מ\"עדיין עובדים\" ל\"הושלם\" רק בסוף. **ההפעלה:** נכנס ל-70% מגובה המסך, `play`, ויציאה אחורה מאפסת כדי שהמירוץ ירוץ שוב. **המצב הסטטי:** שני הערכים הסופיים והתג, כלומר בלי GSAP ובהפחתת תנועה רואים את התוצאה. **נגישות:** הכרטיסים `aria-hidden` ובמקומם משפט בטקסט מוסתר עם הערכים הסופיים, כדי שקורא מסך לא יקרא שעון שרץ. **השעונים** ב-`dir=\"ltr\"` ו-`tabular-nums` כדי שהספרות לא יזוזו. **באתר משמאל לימין** מחליפים את נקודת המוצא של הסרגל ל-`left`.",
  libs:["gsap","ScrollTrigger"],
  css:`.rc{max-width:1040px;margin-inline:auto;display:grid;gap:32px}
.rc>div:first-child{display:grid;gap:12px}
.rc-h{margin:0;font-size:clamp(26px,3.4vw,44px);font-weight:700;line-height:1.15}
.rc-p{margin:0;max-width:54ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.rc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.rc-card{display:grid;gap:20px;padding:28px;border-radius:24px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.rc-card.is-fast{box-shadow:0 0 0 2px var(--accent)}
.rc-top{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:32px}
.rc-lb{font-size:18px;font-weight:700}
.rc-bd{display:inline-block;padding:4px 14px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:14px;font-weight:700}
.rc-st{font-size:14px;color:var(--muted)}
.rc-tm{font-size:clamp(48px,8vw,96px);font-weight:700;line-height:1;font-variant-numeric:tabular-nums;text-align:start}
.rc-bar{height:8px;border-radius:999px;background:var(--line);overflow:clip}
.rc-bar i{display:block;height:100%;border-radius:inherit;background:var(--accent);transform:scaleX(var(--p));transform-origin:right}
.rc-cost{display:flex;align-items:baseline;justify-content:space-between;gap:16px;font-size:var(--fs-body)}
.rc-cost span{color:var(--muted)}
.rc-cost b{font-size:28px;font-variant-numeric:tabular-nums}
.rc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.rc-grid{grid-template-columns:minmax(0,1fr);gap:16px}.rc-card{padding:20px}}`,
  html:`<div class="stage"><div class="rc">
  <div>
    <h2 class="rc-h">כמה זמן לוקחת הצעת מחיר</h2>
    <p class="rc-p">אותה הצעה בדיוק, פעם עם תבנית שהכנו מראש ופעם מאפס. עלות הזמן מחושבת לפי שלושה שקלים לדקה.</p>
  </div>
  <div class="rc-grid" aria-hidden="true">
    <div class="rc-card is-fast">
      <div class="rc-top"><span class="rc-lb">עם תבנית מוכנה</span><span class="rc-bd">הושלם</span></div>
      <div class="rc-tm" dir="ltr" data-t>04:12</div>
      <div class="rc-bar"><i style="--p:.195"></i></div>
      <div class="rc-cost"><span>עלות הזמן</span><b dir="ltr" data-c>₪13</b></div>
    </div>
    <div class="rc-card">
      <div class="rc-top"><span class="rc-lb">מאפס בכל פעם</span><span class="rc-st" data-s>הושלם</span></div>
      <div class="rc-tm" dir="ltr" data-t>21:30</div>
      <div class="rc-bar"><i style="--p:1"></i></div>
      <div class="rc-cost"><span>עלות הזמן</span><b dir="ltr" data-c>₪65</b></div>
    </div>
  </div>
  <p class="sr-only">עם תבנית מוכנה ההצעה מוכנה תוך ארבע דקות ושתים עשרה שניות, בעלות של שלושה עשר שקלים. מאפס זה לוקח עשרים ואחת דקות ושלושים שניות, בעלות של שישים וחמישה שקלים.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;      // בלי GSAP נשארים הערכים הסופיים
  const root=document.querySelector(".rc");
  const tm=[...root.querySelectorAll("[data-t]")],cs=[...root.querySelectorAll("[data-c]")],bars=[...root.querySelectorAll(".rc-bar i")];
  const st=root.querySelector("[data-s]"),badge=root.querySelector(".rc-bd");
  const orig={t:tm.map(e=>e.textContent),c:cs.map(e=>e.textContent),p:bars.map(b=>b.style.getPropertyValue("--p")),s:st.textContent};
  const FAST=252,SLOW=1290,END=5.63,K=SLOW/END;      // שניות מוצגות לכל שנייה אמיתית: המהירה נגמרת ב-1.1 והאיטית ב-5.63
  const two=n=>(n<10?"0":"")+n;
  const mmss=n=>two(Math.floor(n/60))+":"+two(Math.floor(n%60));
  // בהפחתת תנועה הפונקציה לא רצה, והערכים הסופיים נשארים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const R={t:0};
    const draw=()=>{
      const v=[Math.min(FAST,R.t*K),Math.min(SLOW,R.t*K)];
      v.forEach((x,i)=>{
        tm[i].textContent=mmss(x);
        cs[i].textContent="₪"+Math.round(x/60*3);
        bars[i].style.setProperty("--p",(x/SLOW).toFixed(4));
      });
      st.textContent=v[1]>=SLOW?orig.s:"עדיין עובדים";
    };
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top 70%",toggleActions:"play none none reset",onLeaveBack:draw}});
    tl.fromTo(R,{t:0},{t:END,duration:END,ease:"none",onUpdate:draw},0)
      .fromTo(badge,{opacity:0,scale:.6},{opacity:1,scale:1,duration:.5,ease:"expo.out"},FAST/K);      // התג קופץ כשהשעון המהיר נעצר
    draw();
    return()=>{tm.forEach((e,i)=>{e.textContent=orig.t[i];});cs.forEach((e,i)=>{e.textContent=orig.c[i];});bars.forEach((b,i)=>b.style.setProperty("--p",orig.p[i]));st.textContent=orig.s;gsap.set(badge,{clearProps:"all"});};
  });
})();`
}
];
