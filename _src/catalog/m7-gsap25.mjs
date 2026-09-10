// GSAP גל 25 (10.9.2026): החצי השני של 20 מהלכי הגלילה המיוחדים שליאב ביקש.
export default [
{
  id:"g139", cat:"gsap", name:"כותרת שנמחקת בקו ומוחלפת", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"כותרת ישנה שקו נמתח עליה ומוחק אותה, ומתחתיה עולה הכותרת החדשה בצבע. \"לא עוד X. מעכשיו Y\" שהגלילה מבצעת.",
  when:"מסר של שינוי: לפני ואחרי, הדרך הישנה מול החדשה, מיצוב מחדש. פעם אחת בעמוד.",
  note:"הקו הוא פסאודו-אלמנט עם scaleX מימין (RTL) בסקראב, הישנה דוהה ל-40% והחדשה נכנסת מלמטה. הכל transform ו-opacity. במובייל שתי הכותרות נשברות לשתי שורות והקו עדיין מכסה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sk2{min-height:120vh;display:grid;place-items:center;padding-inline:var(--gutter);text-align:center}
.sk2-old{position:relative;display:inline-block;font-size:clamp(30px,5.5vw,76px);font-weight:800;line-height:1.15;color:var(--ink);margin:0}
.sk2-old i{position:absolute;inset-inline:-.1em;top:50%;height:.12em;translate:0 -50%;background:var(--accent);transform:scaleX(0);transform-origin:100% 50%;border-radius:4px}
html[dir="ltr"] .sk2-old i{transform-origin:0 50%}
.sk2-new{font-size:clamp(34px,6.5vw,92px);font-weight:900;line-height:1.1;color:var(--accent);margin:.2em 0 0;opacity:0;translate:0 30px}`,
  html:`<div class="sk2"><div>
  <h2 class="sk2-old">אתר שנראה טוב<i aria-hidden="true"></i></h2>
  <h2 class="sk2-new">אתר שמביא לקוחות</h2>
</div></div>`,
  js:`(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".sk2-old i",{scaleX:1});gsap.set(".sk2-old",{opacity:.4});gsap.set(".sk2-new",{opacity:1,translate:"0 0"});return;}
  gsap.timeline({scrollTrigger:{trigger:".sk2",start:"top 60%",end:"center 40%",scrub:.5}})
    .to(".sk2-old i",{scaleX:1,duration:1,ease:"power3.inOut"})
    .to(".sk2-old",{opacity:.4,duration:.4},.5)
    .to(".sk2-new",{opacity:1,translate:"0 0",duration:.8,ease:"power3.out"},.6);
})();`
},
{
  id:"g140", cat:"gsap", name:"טבעות יעד שמתמלאות בגלילה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"שלוש טבעות מקוננות, כל אחת מייצגת יעד אחר, שמתמלאות בקצב שונה ככל שגוללים, עם מקרא שהמספרים בו רצים. שלושה נתונים בתמונה אחת.",
  when:"תוצאות לקוח בשלושה מדדים, יעדי שנה, שביעות רצון לפי קטגוריה. בדיוק שלושה.",
  note:"שלושה circle עם stroke-dasharray ו-dashoffset בסקראב, כל אחד ליעד שונה, עם סטאגר קטן. המספרים מחושבים מאותו progress. במובייל הטבעות מעל המקרא במקום לצידו.",
  libs:["gsap","ScrollTrigger"],
  css:`.rg2{display:grid;grid-template-columns:auto 1fr;gap:clamp(24px,5vw,70px);align-items:center;max-width:900px;margin-inline:auto;padding-block:16vh 30vh}
.rg2 svg{width:min(320px,70vw);height:auto;transform:rotate(-90deg)}
.rg2 circle{fill:none;stroke-width:14;stroke-linecap:round}
.rg2 .trk{stroke:var(--line)}
.rg2 .r1{stroke:var(--accent)}.rg2 .r2{stroke:#2b8a3e}.rg2 .r3{stroke:#e8590c}
.rg2-leg{display:grid;gap:18px}
.rg2-leg div{display:flex;align-items:center;gap:12px}
.rg2-leg i{width:14px;height:14px;border-radius:50%;flex:none}
.rg2-leg b{font-size:clamp(26px,3vw,40px);font-variant-numeric:tabular-nums;min-width:3.2ch;text-align:start}
.rg2-leg span{color:var(--muted);font-size:15px}
@media(max-width:767px){.rg2{grid-template-columns:1fr;justify-items:center}}`,
  html:`<div class="stage"><div class="rg2">
  <svg viewBox="0 0 200 200" aria-hidden="true">
    <circle class="trk" cx="100" cy="100" r="88"/><circle class="trk" cx="100" cy="100" r="66"/><circle class="trk" cx="100" cy="100" r="44"/>
    <circle class="r1" cx="100" cy="100" r="88" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
    <circle class="r2" cx="100" cy="100" r="66" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
    <circle class="r3" cx="100" cy="100" r="44" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
  </svg>
  <div class="rg2-leg">
    <div><i style="background:var(--accent)"></i><b data-to="92">0</b><span>אחוז מהלקוחות ממליצים</span></div>
    <div><i style="background:#2b8a3e"></i><b data-to="74">0</b><span>אחוז עלייה בפניות</span></div>
    <div><i style="background:#e8590c"></i><b data-to="58">0</b><span>אחוז חיסכון בזמן</span></div>
  </div>
</div></div>`,
  js:`(function(){
  const rings=[".r1",".r2",".r3"].map(s=>document.querySelector(".rg2 "+s)),nums=gsap.utils.toArray(".rg2-leg b");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tl=gsap.timeline({scrollTrigger:{trigger:".rg2",start:"top 75%",end:"top 25%",scrub:reduce?false:.5}});
  rings.forEach((r,i)=>{const to=+nums[i].dataset.to,o={v:0};
    tl.to(r,{strokeDashoffset:100-to,duration:1,ease:"power2.out"},i*.1)
      .to(o,{v:to,duration:1,ease:"power2.out",onUpdate(){nums[i].textContent=Math.round(o.v)+"%";}},i*.1);});
})();`
},
{
  id:"g141", cat:"gsap", name:"שיחת וואטסאפ שמתנהלת בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"בועות צ'אט שמופיעות אחת אחרי השנייה ככל שגוללים, עם \"מקליד...\" לפני כל תשובה. הסיפור של הליד מהפנייה ועד הפגישה, בפורמט שכולם מכירים.",
  when:"הדגמת שירות, תסריט מכירה, \"איך זה עובד\" לבוט או לצוות מכירות, עדות בסגנון שיחה. חמש עד עשר הודעות.",
  note:"כל הודעה היא טריגר משלה: הבועה נכנסת מהצד שלה עם scale קטן, ולפני הודעה של הצד השני מופיע אינדיקטור הקלדה לרגע. ההודעות במארקאפ (SEO וגיבוי). במובייל הרוחב 92vw כמו צ'אט אמיתי.",
  libs:["gsap","ScrollTrigger"],
  css:`.ch2{max-width:min(520px,92vw);margin-inline:auto;padding-block:10vh 30vh;display:grid;gap:12px}
.ch2-m{max-width:82%;padding:12px 16px;border-radius:18px;font-size:15.5px;line-height:1.5;opacity:0;translate:0 12px;position:relative}
.ch2-m.in{justify-self:start;background:var(--card);border:1px solid var(--line);border-end-start-radius:6px;transform-origin:0 100%}
.ch2-m.out{justify-self:end;background:color-mix(in srgb,var(--accent) 14%,var(--card));border-end-end-radius:6px;transform-origin:100% 100%}
.ch2-m small{display:block;font-size:11px;color:var(--muted);margin-top:4px;text-align:end}
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
  const msgs=gsap.utils.toArray(".ch2-m"),typ=document.querySelector(".ch2-typ"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){gsap.set(msgs,{opacity:1,translate:"0 0"});return;}
  msgs.forEach((m,i)=>{
    ScrollTrigger.create({trigger:m,start:"top 82%",once:true,onEnter(){
      const incoming=m.classList.contains("in");
      const show=()=>gsap.fromTo(m,{opacity:0,translate:"0 12px",scale:.92},{opacity:1,translate:"0 0",scale:1,duration:.45,ease:"power3.out"});
      if(incoming){m.before(typ);typ.style.display="flex";gsap.delayedCall(.7,()=>{typ.style.display="none";show();});}
      else show();
    }});
  });
})();`
},
{
  id:"g142", cat:"gsap", name:"קבלה שמודפסת בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"פירוט מחיר שמודפס כמו קבלה: הנייר יוצא מהמדפסת שורה אחרי שורה ככל שגוללים, עד לשורת הסיכום והתלישה. תמחור שקוף עם קריצה.",
  when:"פירוט חבילה, מה כלול במחיר, סיכום הזמנה. חמש עד תשע שורות.",
  note:"הקבלה חתוכה ב-clip-path inset מלמטה בסקראב (הנייר יוצא), עם שן מסור בקצה דרך פסאודו-אלמנט. השורות עצמן סטטיות, לכן אין reflow. במובייל הקבלה ברוחב 86vw.",
  libs:["gsap","ScrollTrigger"],
  css:`.rc{position:relative;height:220vh}
.rc-pin{position:sticky;top:0;height:100vh;display:grid;justify-items:center;align-content:start;padding-top:10vh}
.rc-slot{width:min(420px,86vw);height:16px;border-radius:8px;background:var(--ink);position:relative;z-index:2;box-shadow:0 8px 20px rgba(0,0,0,.2)}
.rc-paper{width:min(380px,80vw);background:var(--card);border:1px solid var(--line);padding:26px 22px 40px;font-family:ui-monospace,"Courier New",monospace;font-size:14px;color:var(--ink);margin-top:-4px;
  clip-path:inset(0 0 100% 0);will-change:clip-path;position:relative;box-shadow:0 20px 50px rgba(0,0,0,.1)}
.rc-paper::after{content:"";position:absolute;inset-inline:0;bottom:-8px;height:8px;background:linear-gradient(-45deg,transparent 6px,var(--card) 6px) 0 0/16px 8px,linear-gradient(45deg,transparent 6px,var(--card) 6px) 8px 0/16px 8px}
.rc-h{text-align:center;font-weight:700;letter-spacing:.14em;margin-bottom:14px;padding-bottom:12px;border-bottom:1px dashed var(--line)}
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
  const paper=document.querySelector(".rc-paper");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){paper.style.clipPath="inset(0 0 0% 0)";return;}
  gsap.fromTo(paper,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",ease:"none",scrollTrigger:{trigger:".rc",start:"top top",end:"bottom bottom",scrub:.4}});
})();`
},
{
  id:"g143", cat:"gsap", name:"פסים אופקיים שנפתחים בגלילה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"ארבעה פסים אופקיים צרים, כל אחד תמונה. ככל שגוללים, הפס התורן נפתח לגובה מלא והשאר מתכווצים, אחד אחרי השני. אקורדיון תמונות שהגלילה מנגנת.",
  when:"גלריית עבודות, ארבעה שירותים עם תמונה, סיפור בארבע תמונות. שלושה עד חמישה פסים.",
  note:"הגבהים דרך flex-grow שמתאנפש ב-GSAP (ערך מספרי), לא height, ולכן אין קפיצות; התמונה בכל פס ב-object-fit cover. במובייל אותו דבר בגובה 70vh.",
  libs:["gsap","ScrollTrigger"],
  css:`.ac2{position:relative;height:260vh}
.ac2-pin{position:sticky;top:0;height:100vh;display:grid;place-items:center}
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
  const panels=gsap.utils.toArray(".ac2-p"),n=panels.length;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  gsap.set(panels,{flexGrow:1});gsap.set(panels[0],{flexGrow:6});
  const tl=gsap.timeline({scrollTrigger:{trigger:".ac2",start:"top top",end:"bottom bottom",scrub:.6}});
  for(let i=1;i<n;i++){tl.to(panels[i-1],{flexGrow:1,duration:1,ease:"power2.inOut"},i-1+.2).to(panels[i],{flexGrow:6,duration:1,ease:"power2.inOut"},i-1+.2);}
})();`
},
{
  id:"g144", cat:"gsap", name:"תמונה שנקרעת לשניים וחושפת טקסט", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"תמונת הירו נקרעת לאורך קו משונן לשני חצאים שנפרדים לצדדים, ובפער נחשפת כותרת. קריעה של נייר, בקצב הגלילה.",
  when:"פתיחה דרמטית לקמפיין, \"שוברים את הכללים\", מעבר מהישן לחדש. פעם אחת בעמוד.",
  note:"שני עותקים של התמונה, כל אחד עם clip-path polygon של חצי עם קצה משונן (אותן נקודות, בשני הצדדים), ו-x בסקראב לכיוונים מנוגדים עם סיבוב קל. במובייל הקריעה אנכית זהה, התזוזה קטנה.",
  libs:["gsap","ScrollTrigger"],
  css:`.tr{position:relative;height:200vh}
.tr-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:grid;place-items:center;background:var(--ink)}
.tr-half{position:absolute;inset:0;will-change:transform}
.tr-half .ph{position:absolute;inset:0;border-radius:0;font-size:0}
.tr-half.l{clip-path:polygon(0 0,50% 0,48% 8%,53% 16%,47% 24%,52% 32%,48% 40%,53% 48%,47% 56%,52% 64%,48% 72%,53% 80%,47% 88%,52% 96%,50% 100%,0 100%)}
.tr-half.r{clip-path:polygon(50% 0,100% 0,100% 100%,50% 100%,52% 96%,47% 88%,53% 80%,48% 72%,52% 64%,47% 56%,53% 48%,48% 40%,52% 32%,47% 24%,53% 16%,48% 8%)}
.tr-txt{position:relative;text-align:center;color:var(--bg);max-width:26ch;padding:24px;opacity:0;scale:.9}
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
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(".tr-half",{opacity:0});gsap.set(".tr-txt",{opacity:1,scale:1});return;}
  const d=matchMedia("(max-width:767px)").matches?60:100;
  gsap.timeline({scrollTrigger:{trigger:".tr",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(".tr-half.l",{xPercent:-d,rotate:-3,duration:1,ease:"power2.in"},0)
    .to(".tr-half.r",{xPercent:d,rotate:3,duration:1,ease:"power2.in"},0)
    .to(".tr-txt",{opacity:1,scale:1,duration:.6,ease:"power3.out"},.35);
})();`
},
{
  id:"g145", cat:"gsap", name:"מילים שנופלות מהשורה", tech:"GSAP · ScrollTrigger", status:"ממתין",
  desc:"משפט שהמילים שלו מתנתקות ונופלות אחת אחת, כל אחת בסיבוב ובכיוון קצת אחר, כשגוללים דרכו. מה שנשאר בשורה הוא המסר.",
  when:"\"מה שלא עובד\", ניקוי מהרעש, פתיחה של סקשן ערכים בסגנון \"פחות זה יותר\". פעם אחת בעמוד.",
  note:"כל מילה שסומנת לנפילה מקבלת y גדול, rotate אקראי קטן ו-opacity 0 בסקראב עם סטאגר; המילים שנשארות נצבעות ב-accent בתוך אותו טיימליין (לא במחלקה עם transition, כדי שקפיצת progress תופסת גם אותן). הרוחב של השורה נשמר כי המילים הן inline-block עם transform בלבד. במובייל המרחק קצר.",
  libs:["gsap","ScrollTrigger"],
  css:`.fw2{min-height:150vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.fw2 h2{font-size:clamp(28px,5vw,72px);font-weight:800;line-height:1.3;margin:0;text-align:center;max-width:22ch}
.fw2 .w{display:inline-block;margin-inline:.14em;will-change:transform,opacity}`,
  html:`<div class="fw2"><h2><span class="w keep">אתר</span> <span class="w">מרשים</span> <span class="w">עם</span> <span class="w">אפקטים</span> <span class="w">ותמונות</span> <span class="w">ענקיות</span> <span class="w keep">שמביא</span> <span class="w">בעיקר</span> <span class="w">מחמאות</span> <span class="w keep">לקוחות</span></h2></div>`,
  js:`(function(){
  const drop=gsap.utils.toArray(".fw2 .w:not(.keep)"),keep=gsap.utils.toArray(".fw2 .keep");
  const accent=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#4a3aff";
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(drop,{opacity:0});gsap.set(keep,{color:accent});return;}
  const dy=matchMedia("(max-width:767px)").matches?240:420;
  gsap.timeline({scrollTrigger:{trigger:".fw2",start:"top 60%",end:"bottom 60%",scrub:.6}})
    .to(drop,{y:dy,rotate:()=>gsap.utils.random(-40,40),opacity:0,duration:1,ease:"power2.in",stagger:{each:.12,from:"random"}})
    .to(keep,{color:accent,duration:.4},"-=.3");
})();`
},
{
  id:"g146", cat:"gsap", name:"מד מהירות שהמחט שלו זזה בגלילה", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"מד עגול כמו בלוח מכונית: המחט מטפסת מהאפס לערך ככל שגוללים, הקשת נצבעת מאחוריה והמספר במרכז רץ. ביצועים, ציון, מהירות טעינה.",
  when:"מהירות אתר, ציון ביקורת, רמת שירות, כל נתון שיש לו סקאלה. אחד לסקשן.",
  note:"קשת של 240 מעלות עם stroke-dashoffset בסקראב, והמחט rotate סביב מרכז המד דרך svgOrigin (GSAP מתעלם מ-transform-origin של CSS ב-SVG). המספר מאותו progress עם ease זהה, כך ששלושתם מסונכרנים. במובייל המד 70vw.",
  libs:["gsap","ScrollTrigger"],
  css:`.gg{display:grid;justify-items:center;gap:10px;padding-block:14vh 30vh;text-align:center}
.gg svg{width:min(360px,70vw);height:auto;overflow:visible}
.gg .arc{fill:none;stroke:var(--line);stroke-width:16;stroke-linecap:round}
.gg .fill{fill:none;stroke:var(--accent);stroke-width:16;stroke-linecap:round}
.gg .ndl{stroke:var(--ink);stroke-width:4;stroke-linecap:round}
.gg .hub{fill:var(--ink)}
.gg-val{font-size:clamp(44px,7vw,84px);font-weight:900;line-height:1;margin-top:-40px;font-variant-numeric:tabular-nums}
.gg-val small{font-size:.35em;font-weight:500;color:var(--muted);display:block;margin-top:4px}`,
  html:`<div class="gg">
  <svg viewBox="0 0 200 140" aria-label="ציון מהירות 98">
    <path class="arc" d="M 22 128 A 88 88 0 1 1 178 128"/>
    <path class="fill" d="M 22 128 A 88 88 0 1 1 178 128" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/>
    <line class="ndl" x1="100" y1="110" x2="100" y2="34"/>
    <circle class="hub" cx="100" cy="110" r="8"/>
  </svg>
  <div class="gg-val"><span class="gg-n">0</span><small>ציון מהירות טעינה</small></div>
</div>`,
  js:`(function(){
  const fill=document.querySelector(".gg .fill"),ndl=document.querySelector(".gg .ndl"),n=document.querySelector(".gg-n"),TO=98;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,o={v:0};
  gsap.set(ndl,{svgOrigin:"100 110",rotate:-120});
  gsap.to(o,{v:TO,ease:"power2.out",scrollTrigger:{trigger:".gg",start:"top 75%",end:"top 25%",scrub:reduce?false:.5},
    onUpdate(){gsap.set(fill,{strokeDashoffset:100-o.v});gsap.set(ndl,{svgOrigin:"100 110",rotate:-120+240*o.v/100});n.textContent=Math.round(o.v);}});
})();`
},
{
  id:"g148", cat:"gsap", name:"כתם דיו שמתפשט וחושף", tech:"GSAP · ScrollTrigger · SVG mask", status:"ממתין",
  desc:"כתם דיו לא סימטרי שגדל מנקודה עד שהוא מכסה את המסך, וכל מה שבתוכו הוא הסצנה הבאה. חשיפה אורגנית במקום עיגול או פס.",
  when:"מעבר לפרק אמנותי, אתרי סטודיו, אופנה, קולינריה. פעם אחת בעמוד.",
  note:"מסכת SVG עם path של כתם (בלוב) שמקבל scale מ-0.02 ל-30 סביב מרכזו, עם transformOrigin בטווין (GSAP מתעלם מ-transform-origin של CSS ב-SVG, ראה g89). במובייל נקודת ההתחלה במרכז.",
  libs:["gsap","ScrollTrigger"],
  css:`.ink{position:relative;height:200vh}
.ink-pin{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--bg);display:grid;place-items:center}
.ink-a{position:relative;z-index:1;text-align:center;max-width:30ch;padding:24px}
.ink-a h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ink-a p{margin:0;color:var(--muted)}
.ink-b{position:absolute;inset:0;z-index:2;display:grid;place-items:center;text-align:center;color:var(--bg);background:var(--ink);mask:url(#ink-m);-webkit-mask:url(#ink-m);padding:24px}
.ink-b .ph{position:absolute;inset:0;border-radius:0;opacity:.35;font-size:0}
.ink-b div{position:relative;max-width:30ch}
.ink-b h2{margin:0 0 8px;font-size:var(--fs-h2)}
.ink-b p{margin:0;opacity:.85}
.ink-svg{position:absolute;width:0;height:0}`,
  html:`<div class="ink">
  <svg class="ink-svg" aria-hidden="true"><defs><mask id="ink-m" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><path class="ink-blob" fill="#fff" d="M.5 .42 C.56 .38 .63 .4 .64 .47 C.65 .53 .6 .58 .54 .59 C.48 .6 .41 .57 .4 .5 C.39 .45 .44 .43 .5 .42 Z"/></mask></defs></svg>
  <div class="ink-pin">
    <div class="ink-a"><h2>לפני הדיו</h2><p>עמוד שקט, ואז משהו מתפשט.</p></div>
    <div class="ink-b"><div class="ph ph-b"></div><div><h2>ומה שנחשף</h2><p>הפרק האמנותי של האתר, בצבעים שלו.</p></div></div>
  </div>
</div>`,
  js:`(function(){
  const blob=document.querySelector(".ink-blob");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(blob,{scale:30,transformOrigin:"50% 50%"});return;}
  const mob=matchMedia("(max-width:767px)").matches;
  gsap.set(blob,{scale:.05,transformOrigin:"50% 50%",x:mob?0:.18,y:mob?0:-.12});   // יחידות objectBoundingBox: 1 = כל המכל
  gsap.timeline({scrollTrigger:{trigger:".ink",start:"top top",end:"bottom bottom",scrub:.6}})
    .to(blob,{scale:30,ease:"power2.in",duration:1});
})();`
},
];
