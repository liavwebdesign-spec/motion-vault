// GSAP גל 25 (10.9.2026): החצי השני של 20 מהלכי הגלילה המיוחדים שליאב ביקש.
export default [
{
  id:"g139", cat:"gsap", name:"כותרת שנמחקת בקו ומוחלפת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כותרת ישנה שקו נמתח עליה ומוחק אותה, ומתחתיה עולה הכותרת החדשה בצבע. \"לא עוד X. מעכשיו Y\" שהגלילה מבצעת.",
  when:"מסר של שינוי: לפני ואחרי, הדרך הישנה מול החדשה, מיצוב מחדש. פעם אחת בעמוד.",
  note:"הקו הוא אלמנט i עם scaleX מימין (RTL) בסקראב, הטקסט הישן (span בתוך הכותרת) דוהה לקצת יותר מחצי והחדשה נכנסת מלמטה. הקו לא דוהה עם הטקסט, כי הוא לא בתוך ה-span: הוא נשאר בצבע המותג, והטקסט הישן אפור וקריא. הכל transform ו-opacity. במובייל שתי הכותרות נשברות לשתי שורות והקו עדיין מכסה. בלי GSAP ובהפחתת תנועה רואים את מצב הסוף: הישנה מחוקה, החדשה גלויה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sk2{min-height:120vh;display:grid;place-items:center;padding-inline:var(--gutter);text-align:center}
.sk2-old{position:relative;display:inline-block;font-size:clamp(30px,5.5vw,76px);font-weight:800;line-height:1.15;color:var(--ink);margin:0}
.sk2-old span{opacity:.55}
.sk2-old i{position:absolute;inset-inline:-.1em;top:50%;height:.12em;translate:0 -50%;background:var(--accent);transform-origin:100% 50%;border-radius:4px;pointer-events:none}
html[dir="ltr"] .sk2-old i{transform-origin:0 50%}
.sk2-new{font-size:clamp(34px,6.5vw,92px);font-weight:900;line-height:1.1;color:var(--accent);margin:.2em 0 0}`,
  html:`<div class="sk2"><div>
  <h2 class="sk2-old"><span>אתר שנראה טוב</span><i aria-hidden="true"></i></h2>
  <h2 class="sk2-new">אתר שמביא לקוחות</h2>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP מצב הסוף: הישנה מחוקה, החדשה גלויה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.timeline({scrollTrigger:{trigger:".sk2",start:"top 60%",end:"center 40%",scrub:.5}})
      .fromTo(".sk2-old i",{scaleX:0},{scaleX:1,duration:1,ease:"power3.inOut"})
      .fromTo(".sk2-old span",{opacity:1},{opacity:.55,duration:.4},.5)
      .fromTo(".sk2-new",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6);
  });
})();`
},
{
  id:"g140", cat:"gsap", name:"טבעות יעד שמתמלאות בגלילה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"שלוש טבעות מקוננות, כל אחת מייצגת יעד אחר, שמתמלאות בקצב שונה ככל שגוללים, עם מקרא שהמספרים בו רצים. שלושה נתונים בתמונה אחת.",
  when:"תוצאות לקוח בשלושה מדדים, יעדי שנה, שביעות רצון לפי קטגוריה. בדיוק שלושה.",
  note:"שלושה circle עם stroke-dasharray ו-dashoffset בסקראב, כל אחד ליעד שונה, עם סטאגר קטן. המספרים מחושבים מאותו progress. במובייל הטבעות מעל המקרא במקום לצידו. הערכים הסופיים כתובים במארקאפ (הטבעות מלאות והמספרים סופיים): בלי GSAP ובהפחתת תנועה רואים אותם מיד, ורק כשהמהלך רץ הוא מאפס ומריץ אותם. שני צבעי הטבעות הנוספים הם משתנים (--rg2, --rg3) שהפרויקט מחליף.",
  libs:["gsap","ScrollTrigger"],
  css:`.rg2{--rg2:#2b8a3e;--rg3:#e8590c;display:grid;grid-template-columns:auto auto;justify-content:center;gap:clamp(24px,5vw,70px);align-items:center;max-width:900px;margin-inline:auto;padding-block:16vh 30vh}
.rg2 svg{width:min(320px,70vw);height:auto;transform:rotate(-90deg)}
.rg2 circle{fill:none;stroke-width:14;stroke-linecap:round}
.rg2 .trk{stroke:var(--line)}
.rg2 .r1{stroke:var(--accent)}.rg2 .r2{stroke:var(--rg2)}.rg2 .r3{stroke:var(--rg3)}
.rg2-leg{display:grid;gap:18px}
.rg2-leg div{display:flex;align-items:center;gap:12px}
.rg2-leg i{width:14px;height:14px;border-radius:50%;flex:none}
.rg2-leg b{font-size:clamp(26px,3vw,40px);font-variant-numeric:tabular-nums;min-width:3.2ch;text-align:start}
.rg2-leg span{color:var(--muted);font-size:15px}
@media(max-width:767px){.rg2{grid-template-columns:1fr;justify-items:center}}`,
  html:`<div class="stage"><div class="rg2">
  <svg viewBox="0 0 200 200" aria-hidden="true">
    <circle class="trk" cx="100" cy="100" r="88"/><circle class="trk" cx="100" cy="100" r="66"/><circle class="trk" cx="100" cy="100" r="44"/>
    <circle class="r1" cx="100" cy="100" r="88" pathLength="100" stroke-dasharray="100" stroke-dashoffset="8"/>
    <circle class="r2" cx="100" cy="100" r="66" pathLength="100" stroke-dasharray="100" stroke-dashoffset="26"/>
    <circle class="r3" cx="100" cy="100" r="44" pathLength="100" stroke-dasharray="100" stroke-dashoffset="42"/>
  </svg>
  <div class="rg2-leg">
    <div><i style="background:var(--accent)"></i><b data-to="92">92%</b><span>מהלקוחות ממליצים</span></div>
    <div><i style="background:var(--rg2)"></i><b data-to="74">74%</b><span>עלייה בפניות</span></div>
    <div><i style="background:var(--rg3)"></i><b data-to="58">58%</b><span>חיסכון בזמן</span></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הטבעות והמספרים כבר בערך הסופי (במארקאפ)
  const rings=[".r1",".r2",".r3"].map(s=>document.querySelector(".rg2 "+s)),nums=gsap.utils.toArray(".rg2-leg b");
  // בהפחתת תנועה הפונקציה לא רצה: מילוי טבעת הוא תנועה, והערכים הסופיים מוצגים מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({scrollTrigger:{trigger:".rg2",start:"top 75%",end:"top 25%",scrub:.5}});
    rings.forEach((r,i)=>{const to=+nums[i].dataset.to,o={v:0};nums[i].textContent="0%";
      tl.fromTo(r,{strokeDashoffset:100},{strokeDashoffset:100-to,duration:1,ease:"power2.out"},i*.1)
        .to(o,{v:to,duration:1,ease:"power2.out",onUpdate(){nums[i].textContent=Math.round(o.v)+"%";}},i*.1);});
    return()=>nums.forEach(b=>b.textContent=b.dataset.to+"%");
  });
})();`
},
{
  id:"g141", cat:"gsap", name:"שיחת וואטסאפ שמתנהלת בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"בועות צ'אט שמופיעות אחת אחרי השנייה ככל שגוללים, עם \"מקליד...\" לפני כל תשובה. הסיפור של הליד מהפנייה ועד הפגישה, בפורמט שכולם מכירים.",
  when:"הדגמת שירות, תסריט מכירה, \"איך זה עובד\" לבוט או לצוות מכירות, עדות בסגנון שיחה. חמש עד עשר הודעות.",
  note:"כל הודעה היא טריגר משלה: הבועה עולה 12 פיקסלים עם scale קטן מהפינה של הזנב שלה, ולפני הודעה של הצד השני מופיע אינדיקטור הקלדה לרגע. ההודעות במארקאפ (SEO וגיבוי), והן מוסתרות רק בתוך הענף של GSAP: בלי GSAP ובהפחתת תנועה כל השיחה גלויה. במובייל הרוחב 92vw כמו צ'אט אמיתי.",
  libs:["gsap","ScrollTrigger"],
  css:`.ch2{max-width:min(520px,92vw);margin-inline:auto;padding-block:10vh 30vh;display:grid;gap:12px}
.ch2-m{max-width:82%;padding:12px 16px;border-radius:18px;font-size:15.5px;line-height:1.5;position:relative}
/* הבועה צומחת מהפינה של הזנב: בעברית .in בימין (הזנב בפינה הימנית התחתונה), .out בשמאל */
.ch2-m.in{justify-self:start;background:var(--card);border:1px solid var(--line);border-end-start-radius:6px;transform-origin:100% 100%}
.ch2-m.out{justify-self:end;background:color-mix(in srgb,var(--accent) 14%,var(--card));border-end-end-radius:6px;transform-origin:0 100%}
html[dir="ltr"] .ch2-m.in{transform-origin:0 100%}
html[dir="ltr"] .ch2-m.out{transform-origin:100% 100%}
.ch2-m small{display:block;font-size:12px;color:color-mix(in srgb,var(--muted) 75%,var(--ink));margin-top:4px;text-align:end}
.ch2-typ{justify-self:start;display:none;gap:4px;padding:12px 16px;background:var(--card);border:1px solid var(--line);border-radius:18px;border-end-start-radius:6px}
.ch2-typ i{width:7px;height:7px;border-radius:50%;background:var(--muted);animation:ch2-b 1s infinite}
.ch2-typ i:nth-child(2){animation-delay:.15s}.ch2-typ i:nth-child(3){animation-delay:.3s}
@keyframes ch2-b{50%{opacity:.3;translate:0 -3px}}
.ch2-day{justify-self:center;font-size:12px;color:var(--muted);background:var(--bg);padding:4px 12px;border-radius:999px}`,
  html:`<div class="ch2">
  <span class="ch2-day">היום</span>
  <div class="ch2-m out">היי, ראיתי את האתר שלכם. אפשר הצעת מחיר לאתר לקליניקה?<small>10:12</small></div>
  <div class="ch2-m in">בטח. שתי שאלות קצרות: כמה שירותים יש בקליניקה, ויש כבר לוגו?<small>10:13</small></div>
  <div class="ch2-m out">ארבעה שירותים, ולוגו יש.<small>10:15</small></div>
  <div class="ch2-m in">מעולה. אתר תדמית עם עמוד לכל שירות וטופס קביעת תור: 12,500 ש"ח, שבועיים עבודה. רוצה שנקבע שיחה של 20 דקות?<small>10:16</small></div>
  <div class="ch2-m out">כן. מחר בבוקר?<small>10:16</small></div>
  <div class="ch2-m in">קבענו, 09:30. שלחתי לך זימון. נתראה 🙂<small>10:17</small></div>
  <div class="ch2-typ" aria-hidden="true"><i></i><i></i><i></i></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל השיחה גלויה
  const msgs=gsap.utils.toArray(".ch2-m"),typ=document.querySelector(".ch2-typ");
  // ההודעות מוסתרות רק כאן, בענף התנועה. בהפחתת תנועה הפונקציה לא רצה והשיחה גלויה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(msgs,{opacity:0,y:12});
    msgs.forEach(m=>{
      ScrollTrigger.create({trigger:m,start:"top 82%",once:true,onEnter(){
        const show=()=>gsap.fromTo(m,{opacity:0,y:12,scale:.92},{opacity:1,y:0,scale:1,duration:.45,ease:"power3.out"});
        if(m.classList.contains("in")){m.before(typ);typ.style.display="flex";gsap.delayedCall(.7,()=>{typ.style.display="none";show();});}
        else show();
      }});
    });
    return()=>{typ.style.display="none";gsap.set(msgs,{clearProps:"opacity,transform"});};
  });
})();`
},
{
  id:"g142", cat:"gsap", name:"קבלה שמודפסת בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"פירוט מחיר שמודפס כמו קבלה: הנייר יוצא מהמדפסת שורה אחרי שורה ככל שגוללים, עד לשורת הסיכום והתלישה. תמחור שקוף עם קריצה.",
  when:"פירוט חבילה ומה כלול במחיר, כסיפור לפני סקשן המחירים. חמש עד תשע שורות. לא בתוך סקשן המחירים או הקופה עצמם: אזור המרה נשאר נקי מתנועה.",
  note:"הקבלה חתוכה ב-clip-path inset מלמטה בסקראב (הנייר יוצא), עם שן מסור בקצה דרך פסאודו-אלמנט. הסוף ב-inset שלילי קטן (3%-) ולא ב-0, כי inset(0) חותך גם את השיניים שיושבות מתחת לקופסה. השורות עצמן סטטיות, לכן אין reflow. במובייל הקבלה ברוחב 86vw. בלי GSAP ובהפחתת תנועה אין נעילה: הקבלה מודפסת כולה.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: הקבלה גלויה כולה, בלי נעילה. הנעילה והחיתוך רק כשהמהלך רץ (.gsap-live) */
.rc{position:relative}
.rc-pin{display:grid;justify-items:center;align-content:start;padding-block:48px}
.rc.gsap-live{height:220vh}
.rc.gsap-live .rc-pin{position:sticky;top:0;height:100vh;padding-block:10vh 0}
.rc-slot{width:min(420px,86vw);height:16px;border-radius:8px;background:var(--ink);position:relative;z-index:2;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.rc-paper{width:min(380px,80vw);background:var(--card);border:1px solid var(--line);padding:26px 22px 40px;font-family:ui-monospace,"Courier New",monospace;font-size:14px;color:var(--ink);margin-top:-4px;
  position:relative;box-shadow:0 20px 50px rgba(0,0,0,.1)}
.rc.gsap-live .rc-paper{will-change:clip-path}
.rc-paper::after{content:"";position:absolute;inset-inline:0;bottom:-8px;height:8px;background:linear-gradient(-45deg,transparent 6px,var(--card) 6px) 0 0/16px 8px,linear-gradient(45deg,transparent 6px,var(--card) 6px) 8px 0/16px 8px}
.rc-h{text-align:center;font-weight:700;margin-bottom:14px;padding-bottom:12px;border-bottom:1px dashed var(--line)}
.rc-l{display:flex;justify-content:space-between;gap:12px;padding:6px 0}
.rc-l.tot{border-top:1px dashed var(--line);margin-top:8px;padding-top:12px;font-weight:700;font-size:16px}
.rc-f{text-align:center;color:var(--muted);margin-top:14px;font-size:12px}`,
  html:`<div class="rc">
  <div class="rc-pin"><div class="rc-slot"></div><div class="rc-paper">
    <div class="rc-h">אתר תדמית · חבילה מלאה</div>
    <div class="rc-l"><span>אפיון ואסטרטגיה</span><span>כלול</span></div>
    <div class="rc-l"><span>קופי בעברית, 6 עמודים</span><span>כלול</span></div>
    <div class="rc-l"><span>עיצוב מובייל ודסקטופ</span><span>כלול</span></div>
    <div class="rc-l"><span>בנייה ואנימציות</span><span>כלול</span></div>
    <div class="rc-l"><span>טופס + חיבור לוואטסאפ</span><span>כלול</span></div>
    <div class="rc-l"><span>חודש ליווי</span><span>כלול</span></div>
    <div class="rc-l tot"><span>סה"כ</span><span>12,500 ש"ח</span></div>
    <div class="rc-f">תודה שקראתם עד הסוף</div>
  </div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הקבלה גלויה כולה
  const root=document.querySelector(".rc"),paper=root.querySelector(".rc-paper");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    // הסוף ב-3%- ולא ב-0: inset(0) חותך גם את שן המסור שיושבת מתחת לקופסה
    gsap.fromTo(paper,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 -3% 0)",ease:"none",scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.4}});
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g143", cat:"gsap", name:"פסים אופקיים שנפתחים בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"ארבעה פסים אופקיים צרים, כל אחד תמונה. ככל שגוללים, הפס התורן נפתח לגובה מלא והשאר מתכווצים, אחד אחרי השני. אקורדיון תמונות שהגלילה מנגנת.",
  when:"גלריית עבודות, ארבעה שירותים עם תמונה, סיפור בארבע תמונות. שלושה עד חמישה פסים.",
  note:"הגבהים דרך flex-grow מספרי. זו אנימציית layout (reflow בכל פריים), חריגה מודעת מהכלל transform בלבד: זולה בשלושה עד חמישה פסים, אבל לא לשים בתוכם וידאו או תוכן כבד. התמונה בכל פס ב-object-fit cover. במובייל אותו דבר בגובה 70vh. בלי GSAP ובהפחתת תנועה אין נעילה: ארבעה פסים שווים במסך אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: ארבעה פסים שווים במסך אחד. הנעילה רק כשהמהלך רץ (.gsap-live) */
.ac2{position:relative}
.ac2-pin{position:relative;height:100vh;display:grid;place-items:center}
.ac2.gsap-live{height:260vh}
.ac2.gsap-live .ac2-pin{position:sticky;top:0}
.ac2-stack{display:flex;flex-direction:column;gap:8px;width:min(1000px,92vw);height:78vh}
.ac2-p{flex:1 1 0;min-height:0;position:relative;border-radius:16px;overflow:hidden;display:flex;align-items:flex-end}
.ac2-p .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.ac2-p h3{position:relative;z-index:1;margin:0;padding:16px 20px;color:#fff;font-size:clamp(16px,2vw,26px);text-shadow:0 2px 14px rgba(0,0,0,.5)}
@media(max-width:767px){.ac2-stack{height:70vh}}`,
  html:`<div class="ac2">
  <div class="ac2-pin"><div class="ac2-stack">
    <div class="ac2-p"><div class="ph ph-a"></div><h3>קליניקה בתל אביב</h3></div>
    <div class="ac2-p"><div class="ph ph-b"></div><h3>חנות אונליין לרהיטים</h3></div>
    <div class="ac2-p"><div class="ph ph-c"></div><h3>משרד עורכי דין</h3></div>
    <div class="ac2-p"><div class="ph ph-d"></div><h3>סטודיו לעיצוב פנים</h3></div>
  </div></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP ארבעה פסים שווים
  const root=document.querySelector(".ac2"),panels=gsap.utils.toArray(".ac2-p"),n=panels.length;
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("gsap-live");
    gsap.set(panels,{flexGrow:1});gsap.set(panels[0],{flexGrow:6});
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}});
    for(let i=1;i<n;i++){tl.to(panels[i-1],{flexGrow:1,duration:1,ease:"power2.inOut"},i-1+.2).to(panels[i],{flexGrow:6,duration:1,ease:"power2.inOut"},i-1+.2);}
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g144", cat:"gsap", name:"תמונה שנקרעת לשניים וחושפת טקסט", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"תמונת הירו נקרעת לאורך קו משונן לשני חצאים שנפרדים לצדדים, ובפער נחשפת כותרת. קריעה של נייר, בקצב הגלילה.",
  when:"פתיחה דרמטית לקמפיין, \"שוברים את הכללים\", מעבר מהישן לחדש. פעם אחת בעמוד.",
  note:"שני עותקים של התמונה, כל אחד עם clip-path polygon של חצי עם קצה משונן, ו-x בסקראב לכיוונים מנוגדים עם סיבוב קל. הקצוות המשוננים חופפים ברבע אחוז: באותן נקודות בדיוק, ההחלקה בקצה משאירה קו כהה דק שעובר דרך התמונה עוד לפני הקריעה. במובייל הקריעה אנכית זהה, התזוזה קטנה. בלי GSAP ובהפחתת תנועה אין נעילה ואין תמונה: הכותרת על הרקע, כמו מצב הסוף.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: מצב הסוף, הכותרת על הרקע. הנעילה ושני החצאים רק כשהמהלך רץ (.gsap-live) */
.tr{position:relative}
.tr-pin{position:relative;height:100vh;overflow:hidden;display:grid;place-items:center;background:var(--ink)}
.tr.gsap-live{height:200vh}
.tr.gsap-live .tr-pin{position:sticky;top:0}
.tr-half{display:none;position:absolute;inset:0;will-change:transform}
.tr.gsap-live .tr-half{display:block}
.tr-half .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.tr-half.l{clip-path:polygon(0 0,50.25% 0,48.25% 8%,53.25% 16%,47.25% 24%,52.25% 32%,48.25% 40%,53.25% 48%,47.25% 56%,52.25% 64%,48.25% 72%,53.25% 80%,47.25% 88%,52.25% 96%,50.25% 100%,0 100%)}
.tr-half.r{clip-path:polygon(49.75% 0,100% 0,100% 100%,49.75% 100%,51.75% 96%,46.75% 88%,52.75% 80%,47.75% 72%,51.75% 64%,46.75% 56%,52.75% 48%,47.75% 40%,51.75% 32%,46.75% 24%,52.75% 16%,47.75% 8%)}
.tr-txt{position:relative;text-align:center;color:var(--bg);max-width:26ch;padding:24px}
.tr-txt h2{margin:0 0 8px;font-size:var(--fs-h2)}
.tr-txt p{margin:0;opacity:.8}`,
  html:`<div class="tr">
  <div class="tr-pin">
    <div class="tr-txt"><h2>מה שמאחורי התמונה</h2><p>גלול כדי לקרוע.</p></div>
    <div class="tr-half l"><div class="ph ph-c"></div></div>
    <div class="tr-half r"><div class="ph ph-c"></div></div>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכותרת גלויה על הרקע
  const root=document.querySelector(".tr");
  // בהפחתת תנועה אף תנאי לא מתקיים: נשאר מצב הסוף
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    root.classList.add("gsap-live");
    const d=ctx.conditions.mob?60:100;
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6}})
      .to(".tr-half.l",{xPercent:-d,rotate:-3,duration:1,ease:"power2.in"},0)
      .to(".tr-half.r",{xPercent:d,rotate:3,duration:1,ease:"power2.in"},0)
      .fromTo(".tr-txt",{opacity:0,scale:.9},{opacity:1,scale:1,duration:.6,ease:"power3.out"},.35);
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g145", cat:"gsap", name:"מילים שנופלות מהשורה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"משפט שהמילים שלו מתנתקות ונופלות אחת אחת, כל אחת בסיבוב ובכיוון קצת אחר, כשגוללים דרכו. מה שנשאר בשורה הוא המסר.",
  when:"\"מה שלא עובד\", ניקוי מהרעש, פתיחה של סקשן ערכים בסגנון \"פחות זה יותר\". פעם אחת בעמוד.",
  note:"כל מילה שסומנת לנפילה מקבלת y גדול, rotate אקראי קטן ו-opacity 0 בסקראב עם סטאגר; המילים שנשארות נצבעות ב-accent בתוך אותו טיימליין (לא במחלקה עם transition, כדי שקפיצת progress תופסת גם אותן). הרוחב של השורה נשמר כי המילים הן inline-block עם transform בלבד. הטווח קשור לכותרת ומתחיל בהפסקה קצרה: המשפט נכנס שלם ונקרא, ורק אז המילים נופלות, אחרת הבדיחה מאבדת את ההקמה שלה. במובייל המרחק קצר. בלי GSAP ובהפחתת תנועה המשפט המלא נשאר, המילים המיותרות אפורות ומחוקות בקו, והמסר בצבע המותג.",
  libs:["gsap","ScrollTrigger"],
  css:`.fw2{min-height:150vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.fw2 h2{font-size:clamp(28px,5vw,72px);font-weight:800;line-height:1.3;margin:0;text-align:center;max-width:22ch}
.fw2 .w{display:inline-block;margin-inline:.14em;will-change:transform,opacity}
/* מצב סטטי (בלי GSAP ובהפחתת תנועה): המשפט שלם, המיותר מחוק, המסר צבוע. כשהמהלך רץ (.gsap-live) המילים נופלות במקום */
.fw2 .w:not(.keep){color:var(--muted);text-decoration:line-through;text-decoration-thickness:.06em}
.fw2 .keep{color:var(--accent)}
.fw2.gsap-live .w{color:inherit;text-decoration:none}`,
  html:`<div class="fw2"><h2><span class="w keep">אתר</span> <span class="w">מרשים</span> <span class="w">עם</span> <span class="w">אפקטים</span> <span class="w">ותמונות</span> <span class="w">ענקיות</span> <span class="w keep">שמביא</span> <span class="w">בעיקר</span> <span class="w">מחמאות</span> <span class="w keep">לקוחות</span></h2></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המשפט שלם, המיותר מחוק
  const root=document.querySelector(".fw2"),h=root.querySelector("h2");
  const drop=gsap.utils.toArray(".fw2 .w:not(.keep)"),keep=gsap.utils.toArray(".fw2 .keep");
  const accent=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#4a3aff";
  // בהפחתת תנועה אף תנאי לא מתקיים: נשאר המצב הסטטי
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    root.classList.add("gsap-live");
    const dy=ctx.conditions.mob?240:420;
    // הטווח על הכותרת: היא נכנסת שלמה, נקראת רגע (הטווין הריק), ורק אז המילים נופלות. המסר נצבע כשהיא עוד במסך
    gsap.timeline({scrollTrigger:{trigger:h,start:"center 55%",end:"center 20%",scrub:.6}})
      .to({},{duration:.5})
      .to(drop,{y:dy,rotate:()=>gsap.utils.random(-40,40),opacity:0,duration:1,ease:"power2.in",stagger:{each:.12,from:"random"}})
      .to(keep,{color:accent,duration:.4},"-=.3");
    return()=>root.classList.remove("gsap-live");
  });
})();`
},
{
  id:"g146", cat:"gsap", name:"מד מהירות שהמחט שלו זזה בגלילה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"מד עגול כמו בלוח מכונית: המחט מטפסת מהאפס לערך ככל שגוללים, הקשת נצבעת מאחוריה והמספר במרכז רץ. ביצועים, ציון, מהירות טעינה.",
  when:"מהירות אתר, ציון ביקורת, רמת שירות, כל נתון שיש לו סקאלה. אחד לסקשן.",
  note:"קשת של 240 מעלות סביב הנקודה (100,110) עם stroke-dashoffset בסקראב, והמחט מסתובבת סביב אותה נקודה דרך תכונת transform של SVG (rotate(a 100 110)), כך שהקצה שלה נוגע בדיוק בקצה המילוי. המספר מאותו progress עם ease זהה, כך ששלושתם מסונכרנים. הערך הסופי כתוב במארקאפ (98, קשת מלאה, מחט במקום): בלי GSAP ובהפחתת תנועה המד מראה אותו מיד, ורק כשהמהלך רץ הוא מתאפס ועולה. המד נע משמאל לימין גם בעמוד עברי, כמו מד אמיתי. במובייל המד 70vw.",
  libs:["gsap","ScrollTrigger"],
  css:`.gg{display:grid;justify-items:center;gap:10px;padding-block:14vh 30vh;text-align:center}
.gg svg{width:min(360px,70vw);height:auto;overflow:visible}
.gg .arc{fill:none;stroke:var(--line);stroke-width:16;stroke-linecap:round}
.gg .fill{fill:none;stroke:var(--accent);stroke-width:16;stroke-linecap:round}
.gg .ndl{stroke:var(--ink);stroke-width:4;stroke-linecap:round}
.gg .hub{fill:var(--ink)}
.gg-val{font-size:clamp(44px,7vw,84px);font-weight:900;line-height:1;margin-top:calc(min(360px,70vw) * -.2);font-variant-numeric:tabular-nums}
.gg-val small{font-size:.35em;font-weight:500;color:var(--muted);display:block;margin-top:4px}`,
  html:`<div class="gg">
  <svg viewBox="0 0 200 170" aria-label="ציון מהירות 98">
    <path class="arc" d="M 23.8 154 A 88 88 0 1 1 176.2 154"/>
    <path class="fill" d="M 23.8 154 A 88 88 0 1 1 176.2 154" pathLength="100" stroke-dasharray="100" stroke-dashoffset="2"/>
    <line class="ndl" x1="100" y1="110" x2="100" y2="40" transform="rotate(115.2 100 110)"/>
    <circle class="hub" cx="100" cy="110" r="8"/>
  </svg>
  <div class="gg-val"><span class="gg-n">98</span><small>ציון מהירות טעינה</small></div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המד כבר בערך הסופי (במארקאפ)
  const fill=document.querySelector(".gg .fill"),ndl=document.querySelector(".gg .ndl"),n=document.querySelector(".gg-n"),TO=98;
  // v מ-0 עד 100. המחט מסתובבת סביב מרכז הקשת (100,110), מ-120- עד 120+ מעלות, בתכונת transform של SVG
  const at=v=>{fill.setAttribute("stroke-dashoffset",100-v);ndl.setAttribute("transform","rotate("+(-120+240*v/100)+" 100 110)");n.textContent=Math.round(v);};
  // בהפחתת תנועה הפונקציה לא רצה: סיבוב מחט ומילוי קשת הם תנועה, והמד מראה את הערך הסופי מיד
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const o={v:0};at(0);
    gsap.to(o,{v:TO,ease:"power2.out",scrollTrigger:{trigger:".gg",start:"top 75%",end:"top 25%",scrub:.5},onUpdate:()=>at(o.v)});
    return()=>at(TO);
  });
})();`
},
{
  id:"g148", cat:"gsap", name:"כתם דיו שמתפשט וחושף", tech:"GSAP · ScrollTrigger · SVG mask", status:"ממתין",
  desc:"כתם דיו לא סימטרי שגדל מנקודה עד שהוא מכסה את המסך, וכל מה שבתוכו הוא הסצנה הבאה. חשיפה אורגנית במקום עיגול או פס.",
  when:"מעבר לפרק אמנותי, אתרי סטודיו, אופנה, קולינריה. פעם אחת בעמוד.",
  note:"מסכת SVG עם path של כתם (בלוב) שמקבל scale מ-0.05 ל-30 סביב מרכזו, עם transformOrigin בטווין (GSAP מתעלם מ-transform-origin של CSS ב-SVG, ראה g89). במובייל נקודת ההתחלה במרכז. הכלל לתוכן של הסצנה השנייה תופס רק ילדים ישירים שאינם תמונה (>div:not(.ph)): כלל רחב על div מכווץ את התמונה לרוחב אפס. בלי GSAP ובהפחתת תנועה אין נעילה ואין מסכה: שתי הסצנות זו אחרי זו.",
  libs:["gsap","ScrollTrigger"],
  css:`/* בלי GSAP ובהפחתת תנועה: שתי הסצנות זו אחרי זו, בלי מסכה. ההצמדה והכתם רק כשהמהלך רץ (.gsap-live) */
.ink{position:relative}
.ink-pin{background:var(--bg)}
.ink-a{position:relative;z-index:1;text-align:center;max-width:30ch;padding:24px;min-height:100vh;display:grid;place-content:center;margin-inline:auto}
.ink-a h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ink-a p{margin:0;color:var(--muted)}
.ink-b{position:relative;min-height:100vh;display:grid;place-items:center;text-align:center;color:var(--bg);background:var(--ink);padding:24px}
.ink.gsap-live{height:200vh}
.ink.gsap-live .ink-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center}
.ink.gsap-live .ink-a{min-height:0;display:block;margin:0}
.ink.gsap-live .ink-b{position:absolute;inset:0;z-index:2;min-height:0;mask:url(#ink-m);-webkit-mask:url(#ink-m)}
.ink-b .ph{position:absolute;inset:0;border-radius:0;opacity:.35;font-size:0}
.ink-b>div:not(.ph){position:relative;max-width:30ch}
.ink-b h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ink-b p{margin:0;opacity:.85}
.ink-svg{position:absolute;width:0;height:0}`,
  html:`<div class="ink">
  <svg class="ink-svg" aria-hidden="true"><defs><mask id="ink-m" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><path class="ink-blob" fill="#fff" d="M.5 .42 C.56 .38 .63 .4 .64 .47 C.65 .53 .6 .58 .54 .59 C.48 .6 .41 .57 .4 .5 C.39 .45 .44 .46 .5 .42 Z"/></mask></defs></svg>
  <div class="ink-pin">
    <div class="ink-a"><h2>לפני הדיו</h2><p>עמוד שקט, ואז משהו מתפשט.</p></div>
    <div class="ink-b"><div class="ph ph-b"></div><div><h2>ומה שנחשף</h2><p>הפרק האמנותי של האתר, בצבעים שלו.</p></div></div>
  </div>
</div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP שתי הסצנות זו אחרי זו
  const root=document.querySelector(".ink"),blob=root.querySelector(".ink-blob");
  // בהפחתת תנועה אף תנאי לא מתקיים: הסצנות נשארות זו אחרי זו
  gsap.matchMedia().add({desk:"(min-width:768px) and (prefers-reduced-motion: no-preference)",mob:"(max-width:767px) and (prefers-reduced-motion: no-preference)"},ctx=>{
    root.classList.add("gsap-live");
    const mob=ctx.conditions.mob;
    gsap.set(blob,{scale:.05,transformOrigin:"50% 50%",x:mob?0:.18,y:mob?0:-.12});   // יחידות objectBoundingBox: 1 = כל המכל
    // המסכה לא חוסמת לחיצות: עד שהכתם מכסה את רוב המסך, הסצנה הראשונה היא זו שמקבלת אותן
    const b=root.querySelector(".ink-b");
    gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.6,onUpdate:s=>{b.style.pointerEvents=s.progress>.7?"":"none";}}})
      .to(blob,{scale:30,ease:"power2.in",duration:1});
    b.style.pointerEvents="none";
    return()=>{root.classList.remove("gsap-live");b.style.pointerEvents="";};
  });
})();`
},
];
