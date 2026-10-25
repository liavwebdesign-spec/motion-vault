// תשעה מהלכי טיפוגרפיה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. נבחרו דפוסים שחוזרים בכמה סרטונים ושמתורגמים לסקשן באתר עסקי בעברית,
// ונבנו מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כללי העברית של הסדרה: בלי SplitText לתווים (פיצול ידני למילים, ולתווים רק כשהם בטוחים), כל טקסט מתערבל או נע חושף את הטקסט הסופי
// לקורא מסך, גליץ' קצר ולא חוזר, ובהפחתת תנועה הכול עומד במצב הסופי.
export default [
{
  id:"g205", cat:"gsap", name:"מילת הדגשה שנכנסת אחרונה בסגנון אחר", tech:"GSAP · ScrollTrigger · פיצול ידני למילים", status:"מאושר-עין",
  desc:"כותרת בשתי שורות שנכנסת מילה אחרי מילה, והביטוי המודגש בכל שורה מגיע רגע אחרי כולן: בצבע המותג, בעיצוב אחר, ומתבהר מתוך טשטוש קל. השורה השנייה ממשיכה באותו מקצב. הכותרת נקראת כמשפט אחד, והדגש נוחת כמו הסיומת שלו.",
  when:"כותרת הירו או פתיחה של סקשן, כשיש בה ביטוי אחד שהוא הלב של המסר: מה הלקוח מקבל או למי זה מיועד. עובד באתר שקט ובאתר חוויתי, כי זו כניסה אחת. פעם אחת בעמוד, בכותרת הראשית. לא לכותרת ארוכה, ולא כשאין בה ביטוי אחד שנבדל מהשאר.",
  note:"**שחזור.** השראה: כמה סרטוני כותרות בגלריה של prompt-motion.com (21.10.2026), שבהם המילה האחרונה בשורה נכנסת אחרי השאר בצבע ובפונט אחרים. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** כל מילה היא `span.aw-w` והביטוי המודגש הוא `span.aw-a`, כך שבלי GSAP ובהפחתת תנועה רואים כותרת שלמה עם הדגש. **פיצול ידני למילים, לא לתווים:** עברית נשברת כשמפצלים תווים (חיבורי כתיב, סימני ניקוד, סדר הפוך), ולכן כל מילה במארקאפ. סדר ה-DOM הוא סדר הקריאה, אז ה-stagger נכנס מימין לשמאל מעצמו. **התזמון:** המילים הרגילות נכנסות ב-`power3.out` עם y וטשטוש קל, והדגש מתחיל כשהמילה האחרונה כמעט נחתה (`>-.2`), ארוך יותר ועם טשטוש עמוק יותר. השורה השנייה מתחילה רבע שנייה אחרי הדגש הראשון. `clearProps:\"filter\"` מנקה את הטשטוש בסוף, כדי שלא יישאר שכבת GPU על כל מילה. **הדגש:** צבע `--accent`, משקל 400 מול 700, ו`font-style:italic`. בעברית זה נטייה מלאכותית של הדפדפן, ולכן אם לאתר יש פונט שני לעברית (עם נטייה אמיתית או סריף) מחליפים את `font-family` של `.aw-a` ולא נוגעים בשאר. **באתר משמאל לימין** אין מה להפוך: התנועה אנכית בלבד, והסדר עוקב אחרי ה-DOM. **נגישות:** הטקסט כולו תמיד ב-DOM, ושקיפות אפס לא מסתירה אותו מקורא מסך. ההפעלה פעם אחת (`once`) כשהכותרת נכנסת למסך.",
  libs:["gsap","ScrollTrigger"],
  css:`.aw{max-width:1080px;margin-inline:auto;display:grid;gap:32px}
.aw-h{margin:0;font-size:clamp(42px,7.4vw,112px);font-weight:700;line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
.aw-l{display:block}
.aw-w{display:inline-block}
.aw-a{display:inline-block;white-space:nowrap;color:var(--accent);font-style:italic;font-weight:400;letter-spacing:0}
.aw-p{margin:0;max-width:44ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}`,
  html:`<div class="stage"><div class="aw">
  <h2 class="aw-h">
    <span class="aw-l"><span class="aw-w">מטבחים</span> <span class="aw-w">שנבנים</span> <span class="aw-w">לפי</span> <span class="aw-a">הבית שלכם</span></span>
    <span class="aw-l"><span class="aw-w">ומגיעים</span> <span class="aw-w">בזמן,</span> <span class="aw-a">בלי הפתעות</span></span>
  </h2>
  <p class="aw-p">נגרייה משפחתית בשרון. מתכננים איתכם בבית, מייצרים בנגרייה ומתקינים בתוך שבוע.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכותרת כבר מוצגת במלואה, עם הדגש
  const root=document.querySelector(".aw"),lines=[...root.querySelectorAll(".aw-l")],all=root.querySelectorAll(".aw-w,.aw-a");
  // בהפחתת תנועה הפונקציה לא רצה, והכותרת נשארת במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true});
    lines.forEach((l,i)=>{
      const base=l.querySelectorAll(".aw-w"),acc=l.querySelector(".aw-a");
      // המילים הרגילות קודם. הדגש מתחיל כשהאחרונה שלהן כמעט נחתה, והשורה הבאה אחרי שהדגש נחת
      tl.fromTo(base,{opacity:0,y:30,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.65,ease:"power3.out",stagger:.075,clearProps:"filter"},i?">+.25":0)
        .fromTo(acc,{opacity:0,y:22,filter:"blur(14px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.85,ease:"power2.out",clearProps:"filter"},">-.2");
    });
    const st=ScrollTrigger.create({trigger:root,start:"top 85%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set(all,{clearProps:"opacity,transform,filter"});};
  });
})();`
},
{
  id:"g206", cat:"gsap", name:"כותרת מפוצלת בצבעים עם הבזק היפוך", tech:"GSAP · ScrollTrigger · oklch · עותקים מוסתרים", status:"ממתין",
  desc:"הכותרת נוחתת במכה אחת: שני עותקים בצבעי המותג נפרדים ממנה לשני הצדדים ורועדים כמה פיקסלים, ובאותו רגע הכרטיס כולו מהבהב להיפוך בהיר פעם אחת ונרגע. הכול נגמר בפחות מחצי שנייה ולא חוזר. בהובר אפשר להפעיל שוב את הרעידה, בלי ההבזק.",
  when:"משפט בודד שצריך להרגיש כמו מכה בנקודה אחת בעמוד: מוצר טכנולוגי, מערכת, קורס, שירות מהיר. כותרת קצרה אחת בכל עמוד. לא לשירותי בריאות, כספים או משפט, ולא לעסק שהלקוח רוצה בו אמון שקט.",
  note:"**שחזור.** השראה: כמה סרטוני כותרות בגלריה של prompt-motion.com (21.10.2026) עם פיצול צבע אדום וציאן והבזק היפוך. נבנה מאפס מהצפייה. **המארקאפ:** כותרת אחת, ובתוכה שני עותקים (`.gl-r`, `.gl-c`) עם `aria-hidden` ושקיפות אפס. בלי GSAP ובהפחתת תנועה זו כותרת רגילה. **הצבעים נגזרים מהעור:** עותק אחד ב-`--accent`, והשני במשלים שלו: `oklch(from var(--accent) l c calc(h + 180))`. דפדפן בלי צבע יחסי מקבל תערובת של accent ו-ink. אין אדום וציאן קבועים, ולכן זה עובד בכל עור. **כללי הבזק (WCAG 2.3.1):** פגיעה אחת היא חמישה היסטים קצרים בגודל יורד (7 מאיות שנייה כל אחד), הבזק היפוך אחד של הכרטיס בלבד ולא של המסך (`filter: invert(1) hue-rotate(180deg)` ל-90 מילישניות), וחזרה למנוחה. **נעילה:** `lock` מונע פגיעה נוספת במשך 2.5 שניות, ולכן גם גלילה מהירה למעלה ולמטה או הובר חוזר לא מייצרים יותר מהבזק אחד בכל 2.5 שניות. הובר מפעיל רק את הרעידה. **הפעלה:** כשהכרטיס נכנס למסך, ובכניסה חוזרת מלמטה. **באתר משמאל לימין** אין מה להפוך: ההיסטים סימטריים. **נגישות:** הטקסט היחיד שקורא מסך שומע הוא הכותרת עצמה. בהפחתת תנועה אין שום שכבה ואין הבזק.",
  libs:["gsap","ScrollTrigger"],
  css:`.gl{max-width:1120px;margin-inline:auto}
.gl-box{display:grid;gap:24px;padding:clamp(32px,6vw,96px);border-radius:28px;background:var(--card)}
.gl-t{position:relative;margin:0;font-size:clamp(44px,8vw,124px);font-weight:700;line-height:1.05;letter-spacing:-.02em;text-wrap:balance;isolation:isolate}
.gl-b{position:relative;z-index:1}
.gl-r,.gl-c{position:absolute;inset:0;opacity:0;pointer-events:none;user-select:none}
.gl-r{color:var(--accent)}
.gl-c{color:color-mix(in oklab,var(--accent) 35%,var(--ink))}
@supports (color:oklch(from red l c h)){.gl-c{color:oklch(from var(--accent) l c calc(h + 180))}}
.gl-p{margin:0;max-width:46ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}`,
  html:`<div class="stage"><div class="gl"><div class="gl-box">
  <h2 class="gl-t"><span class="gl-b">המלאי מתעדכן בזמן אמת</span><span class="gl-r" aria-hidden="true">המלאי מתעדכן בזמן אמת</span><span class="gl-c" aria-hidden="true">המלאי מתעדכן בזמן אמת</span></h2>
  <p class="gl-p">כל מכירה בחנות ובאתר יורדת מהמלאי באותו רגע, בלי ספירות בסוף היום.</p>
</div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP זו כותרת רגילה, בלי שכבות הצבע
  const root=document.querySelector(".gl"),box=root.querySelector(".gl-box"),title=root.querySelector(".gl-t"),
    R=root.querySelector(".gl-r"),C=root.querySelector(".gl-c");
  // בהפחתת תנועה הפונקציה לא רצה: אין היסטים ואין הבזק
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let lock=0,tl=null;
    const rnd=(a,b)=>a+Math.random()*(b-a);
    // פגיעה אחת: חמישה היסטים אקראיים וקצרים, הבזק היפוך אחד של הכרטיס (בכניסה בלבד), וחזרה למנוחה
    const hit=flash=>{
      const now=performance.now();
      if(now<lock)return;lock=now+2500;      // לפחות 2.5 שניות בין פגיעות: אין הבזקים חוזרים
      if(tl)tl.kill();
      tl=gsap.timeline({onComplete:()=>gsap.set([R,C,box],{clearProps:"opacity,transform,filter"})});
      tl.set(title,{opacity:1},0);
      for(let i=0;i<5;i++){
        const k=1-i/6;
        tl.set(R,{opacity:.9,x:-rnd(8,20)*k,y:rnd(-4,4)*k},i*.07).set(C,{opacity:.9,x:rnd(8,20)*k,y:rnd(-4,4)*k},i*.07);
      }
      if(flash)tl.set(box,{filter:"invert(1) hue-rotate(180deg)"},.07).set(box,{clearProps:"filter"},.16);
      tl.to([R,C],{opacity:0,x:0,y:0,duration:.2,ease:"power2.out"},.4);
    };
    const hover=()=>hit(false);
    gsap.set(title,{opacity:0});
    box.addEventListener("pointerenter",hover);
    const st=ScrollTrigger.create({trigger:box,start:"top 82%",onEnter:()=>hit(true),onEnterBack:()=>hit(true)});
    return()=>{st.kill();box.removeEventListener("pointerenter",hover);if(tl)tl.kill();gsap.set([title,R,C,box],{clearProps:"all"});};
  });
})();`
},
{
  id:"g207", cat:"gsap", name:"אותיות וספרות שמתערבלות ואז ננעלות", tech:"GSAP · ScrollTrigger · פיצול ידני", status:"ממתין",
  desc:"כותרת ושלושה מספרי נתון נטענים כרצף של סימנים אקראיים בצבע המותג, ונועלים לערך האמיתי תו אחרי תו: האותיות בעברית מימין לשמאל, והספרות מהגדולה לקטנה. כל תו שומר על הרוחב הסופי שלו בזמן הערבול, אז השורה לא קופצת. בסוף נשאר טקסט רגיל.",
  when:"כותרת הירו של מוצר דיגיטלי, מערכת או דשבורד, ורצועת נתונים עם שלושה מספרים. עובד כשיש מספרים אמיתיים שמרגישים כמו מדידה. פעם אחת בעמוד, כי ערבול חוזר מעייף. לא לכותרת רגשית ולא לעסק שמבקש חמימות.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם כותרת או מספר מתפענחים מסימנים אקראיים. נבנה מאפס מהצפייה. **המארקאפ:** כל מטרה היא זוג: `span.sr-only` עם הטקסט הסופי לקורא מסך, ו`span[data-sc][aria-hidden]` עם אותו טקסט למי שרואה. בלי GSAP ובהפחתת תנועה מוצג הטקסט הסופי, ואין ערבול. **פיצול ידני ובטוח:** רק בעת ההפעלה נבנים תווים בתוך מילים (`inline-block`, בלי מילים שנשברות באמצע), וכל תו נועל את הרוחב שנמדד לו. כך אין קפיצת שורה כשגליף אקראי רחב מהאות האמיתית. בסיום הכול חוזר ל-`textContent` רגיל, בלי תווים נפרדים. **סדר הנעילה:** לפי הסדר הלוגי של הטקסט. בעברית התו הראשון הוא הימני ביותר, כלומר מצד הקריאה, ובמספר הספרה הראשונה היא הגדולה ביותר. מילה שמתחילה בספרה עטופה ב-`direction:ltr; unicode-bidi:isolate`, כדי שהספרות לא יתהפכו ב-RTL. **קצב:** גליף חדש כל 55 מילישניות בערך, בצבע `--accent`, וכל תו שננעל חוזר לצבע הטקסט. אין הבהוב בהיר-כהה בשדה גדול. **הגליפים:** אותיות עברית לתווים עבריים, ספרות לספרות, וסימנים (פסיק, נקודה, אחוז) לא מתערבלים. **באתר משמאל לימין** מחליפים את מאגר האותיות `HEB` במאגר של השפה, וסדר הנעילה נשאר: התו הראשון תמיד. **נגישות:** קורא מסך שומע רק את הטקסט הסופי.",
  libs:["gsap","ScrollTrigger"],
  css:`.sc{max-width:1120px;margin-inline:auto;display:grid;gap:clamp(40px,6vw,88px)}
.sc-h{margin:0;font-size:clamp(38px,6.4vw,100px);font-weight:700;line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
.sc-stats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(24px,4vw,64px)}
.sc-stats li{display:grid;gap:8px;align-content:start}
.sc-n{display:block;font-size:clamp(40px,5.6vw,88px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.sc-stats li>span{color:var(--muted);font-size:var(--fs-body);line-height:1.4}
.sc-w{display:inline-block;white-space:nowrap}
.sc-w.is-num{direction:ltr;unicode-bidi:isolate}
.sc-c{display:inline-block;text-align:center}
.sc-c.is-s{color:var(--accent)}
.sc .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.sc-stats{grid-template-columns:minmax(0,1fr)}.sc-stats li{grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:16px}}`,
  html:`<div class="stage"><div class="sc">
  <h2 class="sc-h"><span class="sr-only">כל הנתונים של העסק, במקום אחד</span><span aria-hidden="true" data-sc>כל הנתונים של העסק, במקום אחד</span></h2>
  <ul class="sc-stats">
    <li><b class="sc-n"><span class="sr-only">12,480</span><span aria-hidden="true" data-sc>12,480</span></b><span>הזמנות החודש</span></li>
    <li><b class="sc-n"><span class="sr-only">98.4%</span><span aria-hidden="true" data-sc>98.4%</span></b><span>זמינות המערכת</span></li>
    <li><b class="sc-n"><span class="sr-only">3.2</span><span aria-hidden="true" data-sc>3.2</span></b><span>דקות זמן תגובה ממוצע</span></li>
  </ul>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הטקסט והמספרים כבר במצב הסופי
  const root=document.querySelector(".sc"),targets=[...root.querySelectorAll("[data-sc]")];
  const HEB="אבגדהוזחטיכלמנסעפצקרשת",FIN="ךםןףץ",DIG="0123456789";
  const pick=s=>s[Math.floor(Math.random()*s.length)];
  // בהפחתת תנועה הפונקציה לא רצה, והטקסט נשאר במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const finals=new Map(targets.map(el=>[el,el.textContent])),sts=[],tws=[];
    gsap.set(targets,{opacity:0});      // לפני ההפעלה השורה מוסתרת, כך שהטקסט הסופי לא מבהיב לפני הערבול
    targets.forEach((el,k)=>{
      const final=finals.get(el);
      const run=()=>{
        // פיצול ידני לתווים בתוך מילים. כל תו נועל את הרוחב הסופי שלו, והמילה לא נשברת באמצע
        el.textContent="";
        const cs=[];
        final.split(" ").forEach((w,wi,arr)=>{
          const ws=document.createElement("span");ws.className="sc-w";
          if(DIG.indexOf(w[0])>=0)ws.classList.add("is-num");
          [...w].forEach(ch=>{
            const c=document.createElement("span");c.className="sc-c";c.textContent=ch;ws.appendChild(c);
            cs.push({el:c,ch:ch,done:false,pool:DIG.indexOf(ch)>=0?DIG:(HEB.indexOf(ch)>=0||FIN.indexOf(ch)>=0)?HEB:""});
          });
          el.appendChild(ws);
          if(wi<arr.length-1)el.appendChild(document.createTextNode(" "));
        });
        cs.forEach(c=>{c.w=c.el.getBoundingClientRect().width;});
        cs.forEach(c=>{c.el.style.width=c.w+"px";});
        const n=cs.length,o={p:0};let last=-1;
        const paint=()=>{
          const t=Math.floor(performance.now()/55),locked=Math.floor(o.p*(n+2));
          cs.forEach((c,i)=>{
            if(i<locked){if(!c.done){c.done=true;c.el.textContent=c.ch;c.el.classList.remove("is-s");}}
            else if(c.pool&&t!==last){c.el.textContent=pick(c.pool);c.el.classList.add("is-s");}
          });
          last=t;
        };
        paint();      // כבר בפריים הראשון הכול מעורבל, בלי הבהוב של הטקסט הסופי
        gsap.to(el,{opacity:1,duration:.25,ease:"power1.out"});
        tws.push(gsap.to(o,{p:1,duration:.9+n*.05,delay:k*.18,ease:"none",onUpdate:paint,onComplete:()=>{el.textContent=final;}}));
      };
      sts.push(ScrollTrigger.create({trigger:el,start:"top 88%",once:true,onEnter:run}));
    });
    return()=>{sts.forEach(s=>s.kill());tws.forEach(t=>t.kill());targets.forEach(el=>{gsap.killTweensOf(el);gsap.set(el,{clearProps:"opacity"});el.textContent=finals.get(el);});};
  });
})();`
},
{
  id:"g208", cat:"gsap", name:"שורות טקסט שזורמות על מסלולים מעוקלים", tech:"GSAP · ticker · ScrollTrigger · SVG textPath", status:"מאושר-עין",
  desc:"שלוש שורות של שירותים מופרדים בנקודות מתעקלות על שלושה מסלולים בעקומות שונות, כל אחת במשקל ובצבע אחר: מלאה, מתווה וצבועה. השורות זורמות לכיוונים מנוגדים, ומהירות הזרימה גדלה כשגוללים. יחד הן נראות כסרט טיפוגרפי שחולף בעמוד.",
  when:"רצועת מעבר בין שני סקשנים, או רקע של הירו, כשיש שישה עד עשרה שירותים או תחומים קצרים להזכיר. מתאים לסטודיו, למשרד, לקבלן ולמרפאה עם כמה תחומי עיסוק. פעם אחת בעמוד. לא כשהמילים צריכות להיקרא לעומק, כי זה גם קישוט.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) עם שורות מילים שמתעקלות על מסלולים ונוסעות. נבנה מאפס מהצפייה. **המארקאפ:** שלושה `path` בתוך `defs`, ועל כל אחד `text` עם `textPath`. הטקסט חוזר ארבע פעמים, כך שגם בלי JS המסלולים מלאים והשורות עומדות במקום. **עברית על מסלול:** ל-`text` יש `direction:ltr`, והמילים העבריות מסתדרות בעצמן מימין לשמאל לאורך המסלול (נבדק בדפדפן). עם `direction:rtl` הטקסט יוצא מהמסלול ונעלם. **הזרימה:** `startOffset` מוזז ב-ticker של GSAP. הסקריפט מודד את אורך יחידה אחת (`data-u`) ומשכפל אותה עד שהשורה מכסה את המסלול ועוד שתי יחידות, ואז המיקום חוזר ב-modulo לאורך יחידה אחת, ולכן אין קפיצה בסיבוב. שורה ראשונה ושלישית זורמות ימינה (ההמשך של משפט בעברית נכנס משמאל), והשנייה שמאלה. **גלילה:** `ScrollTrigger.getVelocity()` מוסיף מהירות שדועכת מעצמה. כשהרצועה מחוץ למסך ה-ticker לא עושה כלום. **מובייל:** ה-SVG רחב פי 2.3 מהמסך וממורכז, כך שרואים את אמצע העקומות באותיות קריאות. **באתר משמאל לימין** מוחקים `direction:ltr` מה-CSS והופכים את סימן `dir` של השורות (`i%2?-1:1`). **נגישות:** הסרט כולו `aria-hidden`, והשירותים בפסקה מוסתרת. בהפחתת תנועה הוא עומד.",
  libs:["gsap","ScrollTrigger"],
  css:`.rb{max-width:1200px;margin-inline:auto;display:grid;gap:24px}
.rb-v{overflow:hidden;border-radius:32px;background:var(--card)}
.rb-svg{display:block;width:100%;height:auto}
.rb-svg text{direction:ltr;font-family:inherit;font-weight:700;font-size:60px;fill:var(--ink)}
.rb-svg .rb-t2{font-size:56px;font-weight:400;fill:none;stroke:var(--ink);stroke-width:1.6px}
.rb-svg .rb-t3{font-size:64px;fill:var(--accent)}
.rb-cap{margin:0;max-width:52ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.rb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.rb-svg{width:230%;max-width:none;margin-inline:-65%}}`,
  html:`<div class="stage"><div class="rb">
  <p class="sr-only">בנייה, שיפוצים, תכנון, עיצוב פנים, ליווי הנדסי ופיקוח</p>
  <div class="rb-v" aria-hidden="true">
    <svg class="rb-svg" viewBox="0 0 1200 640" focusable="false">
      <defs>
        <path id="rbA" d="M -240 600 C 120 -40, 760 -40, 1440 420"/>
        <path id="rbB" d="M -240 700 C 160 120, 800 140, 1440 540"/>
        <path id="rbC" d="M -240 800 C 200 300, 840 330, 1440 680"/>
      </defs>
      <text class="rb-t1" data-u="בנייה&#160;&#160;•&#160;&#160;שיפוצים&#160;&#160;•&#160;&#160;תכנון&#160;&#160;•&#160;&#160;"><textPath href="#rbA" startOffset="0">בנייה&#160;&#160;•&#160;&#160;שיפוצים&#160;&#160;•&#160;&#160;תכנון&#160;&#160;•&#160;&#160;בנייה&#160;&#160;•&#160;&#160;שיפוצים&#160;&#160;•&#160;&#160;תכנון&#160;&#160;•&#160;&#160;בנייה&#160;&#160;•&#160;&#160;שיפוצים&#160;&#160;•&#160;&#160;תכנון&#160;&#160;•&#160;&#160;בנייה&#160;&#160;•&#160;&#160;שיפוצים&#160;&#160;•&#160;&#160;תכנון&#160;&#160;•&#160;&#160;</textPath></text>
      <text class="rb-t2" data-u="עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;"><textPath href="#rbB" startOffset="0">עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;עיצוב פנים&#160;&#160;•&#160;&#160;ליווי הנדסי&#160;&#160;•&#160;&#160;</textPath></text>
      <text class="rb-t3" data-u="פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;"><textPath href="#rbC" startOffset="0">פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;פיקוח&#160;&#160;•&#160;&#160;ניהול פרויקט&#160;&#160;•&#160;&#160;</textPath></text>
    </svg>
  </div>
  <p class="rb-cap">שיפוצים ובנייה מהתכנון ועד המפתח, עם אדם אחד שאחראי על כל הפרויקט.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הסרטים עומדים במקום, עם הטקסט במלואו
  const root=document.querySelector(".rb"),view=root.querySelector(".rb-v"),texts=[...root.querySelectorAll(".rb-svg text")];
  // בהפחתת תנועה הפונקציה לא רצה, והסרטים נשארים עומדים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const saved=texts.map(t=>t.querySelector("textPath").textContent);
    const rows=texts.map((t,i)=>({t:t,tp:t.querySelector("textPath"),unit:t.getAttribute("data-u"),
      len:root.querySelector(t.querySelector("textPath").getAttribute("href")).getTotalLength(),
      P:1,ph:0,dir:i%2?-1:1,sp:[64,42,88][i]||56}));
    // אורך יחידה אחת נמדד, והטקסט מוארך עד שהוא מכסה את המסלול ועוד שתי יחידות, כדי שהסיבוב לא יקפוץ
    const measure=()=>rows.forEach(r=>{
      r.tp.textContent=r.unit;r.P=r.tp.getComputedTextLength()||1;
      r.tp.textContent=r.unit.repeat(Math.ceil((r.len+2*r.P)/r.P)+1);
    });
    measure();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
    let boost=0,on=true;
    const tick=(time,dt)=>{
      if(!on)return;
      const s=Math.min(dt,64)/1000;boost*=.92;
      rows.forEach(r=>{
        r.ph=((r.ph+r.dir*(r.sp+boost)*s)%r.P+r.P)%r.P;
        r.tp.setAttribute("startOffset",(r.ph-r.P).toFixed(1));
      });
    };
    gsap.ticker.add(tick);
    const st=ScrollTrigger.create({trigger:view,start:"top bottom",end:"bottom top",
      onToggle:s=>{on=s.isActive;},
      onUpdate:s=>{boost=Math.min(Math.abs(s.getVelocity())*.25,360);}});
    return()=>{gsap.ticker.remove(tick);st.kill();rows.forEach((r,i)=>{r.tp.textContent=saved[i];r.tp.setAttribute("startOffset","0");});};
  });
})();`
},
{
  id:"g209", cat:"gsap", name:"משפט שנבנה מתגיות גלולה שנכנסות אחת אחרי השנייה", tech:"GSAP · ScrollTrigger · expo.out", status:"מאושר-עין",
  desc:"משפט הצעה אחד שחלק ממילותיו הן גלולות צבעוניות. בכניסה למסך המילים הרגילות מופיעות והגלולות קופצות פנימה אחת אחרי השנייה, מימין לשמאל, וכל אחת מביאה מתחתיה שורה קטנה של פרט. בסוף מתווספת הערת אגב בנטייה מתחת למשפט.",
  when:"סיכום שירות או הצעת ערך שאפשר לומר במשפט אחד עם ארבעה עד שישה מונחים שחשוב שיזכרו. סקשן הירו משני, שירותים, או \"איך אנחנו עובדים\". עובד גם באתר שקט. פעם אחת בעמוד. לא למשפט ארוך, ולא כשלכל מונח אין פרט שמלווה אותו.",
  note:"**שחזור.** השראה: כמה סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם משפט בנוי מגלולות צבעוניות שנכנסות אחת אחת. נבנה מאפס מהצפייה. **המארקאפ:** משפט אחד ב-`flex` עם `wrap`, שבו מילה רגילה היא `.pc-w` וגלולה היא `.pc-c` (הגלולה `.pc-p` ומתחתיה `small` עם הפרט). בלי GSAP ובהפחתת תנועה רואים את המשפט המלא. **יישור:** למילה הרגילה אותו ריווח אנכי כמו לגלולה, ולכן קו הבסיס זהה ואין קפיצה בין סוגי הפריטים. **הכניסה:** סדר ה-DOM הוא סדר הקריאה, ולכן הכניסה מימין לשמאל. כל פריט נכנס חמישית שנייה אחרי הקודם: גלולה עם scale מ-.55, y וקפיצה ב-`expo.out` (בלי back, שאסור), מילה רגילה עם y קטן. הפרט שמתחת לגלולה נכנס מאוחר יותר. **הצבעים:** accent, ink ושלושה גוונים שנגזרים מהם ב-`color-mix`, וטקסט על accent ב-`--accent-ink`. **באתר משמאל לימין** אין מה להפוך: הסדר עוקב אחרי ה-DOM. **נגישות:** המשפט נקרא כרגיל, והפרטים קטנים אבל חלק מהטקסט.",
  libs:["gsap","ScrollTrigger"],
  css:`.pc{max-width:1120px;margin-inline:auto;display:grid;gap:32px}
.pc-s{margin:0;display:flex;flex-wrap:wrap;align-items:flex-start;gap:16px 14px;font-size:clamp(28px,4.6vw,68px);font-weight:600;line-height:1.1;letter-spacing:-.01em}
.pc-w{padding-block:.24em}
.pc-c{display:flex;flex-direction:column;align-items:center;gap:8px}
.pc-p{display:block;padding:.24em .62em;border-radius:999px;white-space:nowrap}
.pc-c small{font-size:max(.2em,14px);font-weight:500;line-height:1.2;color:var(--muted);white-space:nowrap}
.pc-1 .pc-p{background:var(--accent);color:var(--accent-ink)}
.pc-2 .pc-p{background:color-mix(in oklab,var(--accent) 18%,var(--card));color:var(--ink)}
.pc-3 .pc-p{background:var(--ink);color:var(--bg)}
.pc-4 .pc-p{background:color-mix(in oklab,var(--ink) 9%,var(--card));color:var(--ink)}
.pc-5 .pc-p{background:color-mix(in oklab,var(--accent) 42%,var(--card));color:var(--ink)}
.pc-a{margin:0;max-width:40ch;color:var(--muted);font-style:italic;font-size:clamp(20px,1.9vw,30px);line-height:1.4}`,
  html:`<div class="stage"><div class="pc">
  <p class="pc-s">
    <span class="pc-w">אנחנו</span>
    <span class="pc-c pc-1"><span class="pc-p">מתכננים</span><small>שבועיים</small></span>
    <span class="pc-c pc-2"><span class="pc-p">מייצרים</span><small>שישה שבועות</small></span>
    <span class="pc-c pc-3"><span class="pc-p">ומתקינים</span><small>שלושה ימי עבודה</small></span>
    <span class="pc-w">מטבחים</span>
    <span class="pc-c pc-4"><span class="pc-p">בנגרייה אחת</span><small>בחדרה, מאז 2009</small></span>
    <span class="pc-c pc-5"><span class="pc-p">ובמחיר סגור</span><small>בלי תוספות</small></span>
  </p>
  <p class="pc-a">וכן, גם את פירוק המטבח הישן אנחנו לוקחים.</p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המשפט כבר מוצג עם כל הגלולות
  const root=document.querySelector(".pc"),items=[...root.querySelectorAll(".pc-w,.pc-c")],aside=root.querySelector(".pc-a");
  // בהפחתת תנועה הפונקציה לא רצה, והמשפט נשאר במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const tl=gsap.timeline({paused:true});
    items.forEach((it,i)=>{
      const chip=it.classList.contains("pc-c"),body=chip?it.querySelector(".pc-p"):it;
      // הגלולה קופצת פנימה ב-expo.out, ללא overshoot. המילה הרגילה רק עולה ומתבהרת
      tl.fromTo(body,chip?{opacity:0,scale:.55,y:26,transformOrigin:"50% 60%"}:{opacity:0,y:14},
        chip?{opacity:1,scale:1,y:0,duration:.75,ease:"expo.out"}:{opacity:1,y:0,duration:.5,ease:"power2.out"},i*.2);
      if(chip)tl.fromTo(it.querySelector("small"),{opacity:0,y:8},{opacity:1,y:0,duration:.5,ease:"power2.out"},i*.2+.4);
    });
    tl.fromTo(aside,{opacity:0,y:14},{opacity:1,y:0,duration:.7,ease:"power2.out"},">-.1");
    const st=ScrollTrigger.create({trigger:root,start:"top 80%",once:true,onEnter:()=>tl.play()});
    const clear=[...items,aside,...root.querySelectorAll(".pc-p,.pc-c small")];
    return()=>{st.kill();tl.kill();gsap.set(clear,{clearProps:"opacity,transform"});};
  });
})();`
},
{
  id:"g210", cat:"gsap", name:"מספר ושלט הודעות שנבנים מנקודות LED", tech:"GSAP · ticker · Canvas 2D · ScrollTrigger", status:"ממתין",
  desc:"לוח עם שני שלטי נקודות: מספר גדול שנבנה מנקודות ועולה מאפס אל הערך האמיתי, ומתחתיו שורת הודעות שגוללת בנקודות בצבע המותג. הנקודות הכבויות נשארות עמומות ברקע, כמו בשלט אמיתי. נקודה קטנה פועמת ליד הכותרת.",
  when:"נתון חי או מצב פעילות בעסק שיש לו קצב: הזמנות שנארזו היום, פניות שהתקבלו, משלוחים בדרך. מתאים לאתר טכני או ללוגיסטיקה, ולא לאתר שקט או לעסק שרוצה חמימות. פעם אחת בעמוד. לא כשהמספר הוא הבטחה משפטית או מחיר.",
  note:"**שחזור.** השראה: שלושה סרטונים בגלריה של prompt-motion.com (21.10.2026) עם טקסט ומספרים מנקודות LED ושורת הודעות כתומה שגוללת. נבנה מאפס מהצפייה. **המארקאפ:** בכל שלט יש `span.led-plain` עם הטקסט הרגיל ו-`canvas` מוסתר. בלי JS ובהפחתת תנועה מוצג הטקסט הרגיל, גדול וקריא, והקנבס לא מוצג. כשהמהלך רץ `.led` מקבל `is-live`, הטקסט הרגיל הופך ל-`sr-only` (קורא מסך עדיין שומע אותו) והקנבס מוצג. **שני סוגי נקודות:** המספר בנוי מפונט נקודות קלאסי של 5 על 7 שמוגדר בקוד (`F`, שמונה שורות כדי שלפסיק יהיה זנב), כך שהספרות קריאות גם ברשת קטנה. שלט ההודעות נדגם מטקסט אמיתי: הטקסט מצויר בקנבס חצי-מוסתר בגובה 12 שורות, ולכל פיקסל מוגדר אם הנקודה דולקת. עברית נצבעת עם `direction=rtl`, ולכן אין צורך בפונט נקודות לעברית. **גודל:** גודל הנקודה נקבע לפי רוחב המכל, והלוח ממלא את כל הרוחב כמו שלט אמיתי. המספר מתכווץ בטלפון ונשאר קריא. הגודל נקבע לפי הערך הסופי, והמספר מיושר לימין, ולכן ספרת האחדות נשארת במקום בזמן הספירה. **שלט ההודעות:** הוא גולל ימינה: ההמשך של משפט בעברית נכנס מצד שמאל, כמו בכיוון הקריאה. הוא מתקדם בעמודות שלמות, 16 בשנייה. **ביצועים:** שני מילויים לכל ציור (כבויות ודולקות) ולא מילוי נפרד לכל נקודה, קנבס לפי DPR (עד 2), עצירה כשהלוח מחוץ למסך (IntersectionObserver), ושינוי גודל עם ResizeObserver. הצבעים נקראים מהעור: accent לדולקות ו-ink בשקיפות לכבויות. **באתר משמאל לימין** מחליפים `rtl` ל-`ltr` בציור השלט ומשנים את כיוון הגלילה לשמאלה. **נגישות:** הקנבסים `aria-hidden`, והנקודה הפועמת קישוט.",
  libs:["gsap","ScrollTrigger"],
  css:`.led{max-width:1200px;margin-inline:auto}
.led-panel{display:grid;gap:clamp(24px,3vw,48px);padding:clamp(24px,4vw,56px);border-radius:32px;background:var(--card)}
.led-lab{margin:0;display:flex;align-items:center;gap:12px;color:var(--muted);font-size:var(--fs-body)}
.led-dot{width:10px;height:10px;border-radius:50%;background:var(--accent)}
.led-plain{display:block;font-weight:700;color:var(--ink)}
.led-num .led-plain{font-size:clamp(64px,12vw,176px);line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.led-msg{font-size:clamp(22px,2.6vw,38px);line-height:1.3}
.led-cv{display:none}
.led.is-live .led-cv{display:block}
.led.is-live .led-plain{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
  html:`<div class="stage"><div class="led"><div class="led-panel">
  <p class="led-lab"><span class="led-dot" aria-hidden="true"></span>הזמנות שנארזו היום</p>
  <div class="led-num"><span class="led-plain">1,284</span><canvas class="led-cv" aria-hidden="true"></canvas></div>
  <div class="led-tick"><span class="led-plain led-msg">משלוח יצא לבאר שבע, הזמנה חדשה מרמת גן, המלאי של הקפה העונתי עודכן</span><canvas class="led-cv" aria-hidden="true"></canvas></div>
</div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשאר הטקסט הרגיל, בלי נקודות
  const root=document.querySelector(".led"),dot=root.querySelector(".led-dot");
  const numBox=root.querySelector(".led-num"),tickBox=root.querySelector(".led-tick");
  const numCv=numBox.querySelector("canvas"),tickCv=tickBox.querySelector("canvas");
  const numText=numBox.querySelector(".led-plain").textContent.trim(),msgText=tickBox.querySelector(".led-plain").textContent.trim();
  const FINAL=parseInt(numText.split(",").join(""),10)||0;
  // בהפחתת תנועה הפונקציה לא רצה, והטקסט הרגיל נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const off=document.createElement("canvas"),octx=off.getContext("2d",{willReadFrequently:true});
    // טקסט הופך לרשת: מצייר אותו בגובה השורות ובודק לכל פיקסל אם הנקודה דולקת
    const bmp=(text,rows,rtl)=>{
      const font="700 "+(rows*1.2)+"px 'Google Sans',system-ui,sans-serif";
      octx.font=font;const w=Math.max(1,Math.ceil(octx.measureText(text).width)+2);
      off.width=w;off.height=rows;octx.font=font;octx.direction=rtl?"rtl":"ltr";octx.textAlign=rtl?"right":"left";
      octx.fillStyle="#000";octx.fillText(text,rtl?w-1:1,rows*.88);
      const d=octx.getImageData(0,0,w,rows).data,a=new Uint8Array(w*rows);
      for(let i=0;i<a.length;i++)a[i]=d[i*4+3]>120?1:0;
      return{cols:w,rows:rows,a:a};
    };
    // פונט נקודות קלאסי של 5x7 למספר: ספרות קריאות גם ברשת קטנה, בלי לדגום טקסט
    const F={"0":"01110 10001 10011 10101 11001 10001 01110","1":"00100 01100 00100 00100 00100 00100 01110","2":"01110 10001 00001 00010 00100 01000 11111",
      "3":"11110 00001 00001 01110 00001 00001 11110","4":"00010 00110 01010 10010 11111 00010 00010","5":"11111 10000 11110 00001 00001 10001 01110",
      "6":"00110 01000 10000 11110 10001 10001 01110","7":"11111 00001 00010 00100 01000 01000 01000","8":"01110 10001 10001 01110 10001 10001 01110",
      "9":"01110 10001 10001 01111 00001 00010 01100",",":"00 00 00 00 00 11 11 10"};
    const numBmp=str=>{
      const g=[...str].map(ch=>{const r=(F[ch]||"000 000 000 000 000 000 000").split(" ");while(r.length<8)r.push("0".repeat(r[0].length));return r;});
      const cols=g.reduce((n,r)=>n+r[0].length+1,0)-1,a=new Uint8Array(cols*8);let x=0;
      g.forEach(r=>{r.forEach((row,y)=>{for(let q=0;q<row.length;q++)if(row[q]==="1")a[y*cols+x+q]=1;});x+=r[0].length+1;});
      return{cols:cols,rows:8,a:a};
    };
    const col=css=>{const p=document.createElement("i");p.style.cssText="position:absolute;visibility:hidden;color:"+css;root.appendChild(p);const c=getComputedStyle(p).color;p.remove();return c;};
    const ON=col("var(--accent)"),OFF=col("color-mix(in oklab, var(--ink) 11%, transparent)");
    const dpr=()=>Math.min(window.devicePixelRatio||1,2);
    const N={cv:numCv,ctx:numCv.getContext("2d"),rows:8,cols:0,pitch:0,val:0,bm:null};
    const T={cv:tickCv,ctx:tickCv.getContext("2d"),rows:12,cols:0,pitch:0,shift:0,last:0,bm:null};
    const fmt=v=>v.toLocaleString("en-US");
    const size=(d,pitch,cols)=>{
      const k=dpr();d.pitch=pitch;d.cols=cols;
      d.cv.width=Math.round(cols*pitch*k);d.cv.height=Math.round(d.rows*pitch*k);
      d.cv.style.width=cols*pitch+"px";d.cv.style.height=d.rows*pitch+"px";
    };
    const paint=(d,bit)=>{
      const c=d.ctx,k=dpr(),p=d.pitch,r1=p*.4,r0=p*.2;
      c.setTransform(k,0,0,k,0,0);c.clearRect(0,0,d.cols*p,d.rows*p);
      [0,1].forEach(on=>{
        c.beginPath();
        for(let r=0;r<d.rows;r++)for(let q=0;q<d.cols;q++){
          if((bit(r,q)?1:0)!==on)continue;
          const x=q*p+p/2,y=r*p+p/2,rad=on?r1:r0;c.moveTo(x+rad,y);c.arc(x,y,rad,0,6.2832);
        }
        c.fillStyle=on?ON:OFF;c.fill();
      });
    };
    const drawNum=()=>{
      const bm=numBmp(fmt(N.val)),gap=N.cols-bm.cols-2;      // מיושר לימין, שתי עמודות שוליים
      paint(N,(r,q)=>{const b=q-gap;return b>=0&&b<bm.cols&&bm.a[r*bm.cols+b];});
    };
    const drawTick=()=>{
      const bm=T.bm,M=bm.cols;
      paint(T,(r,q)=>bm.a[r*M+(((q-T.last)%M)+M)%M]);
    };
    const layout=()=>{
      const wN=numBox.clientWidth,fin=numBmp(fmt(FINAL)),pN=Math.max(4,Math.min(22,Math.floor(wN/(fin.cols+4))));
      size(N,pN,Math.floor(wN/pN));drawNum();      // הלוח ממלא את כל הרוחב, והנקודות הכבויות נראות כמו שלט אמיתי
      const wT=tickBox.clientWidth,pT=Math.max(3,Math.min(6,Math.floor(wT/200)));
      T.bm=bmp(msgText+"        ",T.rows,true);size(T,pT,Math.floor(wT/pT));drawTick();
    };
    root.classList.add("is-live");
    layout();
    const ro=new ResizeObserver(layout);ro.observe(root);
    let vis=true;const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;});io.observe(root);
    // השלט גולל ימינה בעמודות שלמות: 16 בשנייה
    const tick=(t,dt)=>{
      if(!vis)return;
      T.shift+=dt/1000*16;const s=Math.floor(T.shift);
      if(s!==T.last){T.last=s;drawTick();}
    };
    gsap.ticker.add(tick);
    const pulse=gsap.to(dot,{opacity:.3,duration:.9,yoyo:true,repeat:-1,ease:"sine.inOut"});
    const o={v:0};
    const st=ScrollTrigger.create({trigger:numBox,start:"top 88%",once:true,onEnter:()=>{
      gsap.to(o,{v:FINAL,duration:2.4,ease:"power2.out",onUpdate:()=>{const v=Math.round(o.v);if(v!==N.val){N.val=v;drawNum();}}});
    }});
    return()=>{gsap.ticker.remove(tick);st.kill();pulse.kill();gsap.killTweensOf(o);ro.disconnect();io.disconnect();root.classList.remove("is-live");gsap.set(dot,{clearProps:"opacity"});};
  });
})();`
},
{
  id:"g211", cat:"gsap", name:"שורות שנוספות אחת אחרי השנייה והישנות מתעמעמות", tech:"GSAP · ScrollTrigger scrub · sticky", status:"מאושר-עין",
  desc:"משפט פתיחה אחד נעוץ במסך, ובכל גלילה נוספת שורה חדשה מתחתיו. השורה שנכנסה זה עתה היא היחידה בצבע הטקסט המלא, והקודמת מתעמעמת לאפור. כך הרשימה נבנית כמו משפט מצטבר, והעין תמיד יודעת איפה הקורא נמצא.",
  when:"שירותים, שלבי עבודה או התחייבויות של עסק, בארבע עד שש שורות קצרות שכל אחת משלימה את הקודמת. מתאים לעמוד שירות, לאודות ולתהליך עבודה. פעם אחת בעמוד, בסקשן הנעוץ היחיד. לא לשורות ארוכות ולא כשהסדר ביניהן לא חשוב.",
  note:"**שחזור.** השראה: שני סרטונים בגלריה של prompt-motion.com (21.10.2026) שבהם שורות נוספות אחת אחת והישנות הופכות אפורות. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** כל השורות מוצגות, הישנות באפור (`--muted`) והאחרונה בצבע המלא. בלי GSAP ובהפחתת תנועה רואים את זה, בלי גובה נוסף. **כשהמהלך רץ** `.cs` מקבל `is-live` וגובה של מסך ועוד 56% מסך לכל שורה (`--n` נקבע מכמות השורות), והבמה נעוצה (`sticky`). אותו קוד עובד גם בטלפון, כי הגובה וההצמדה לא תלויים ברוחב. **הצבעים נקראים מהעור:** האפור משורה ראשונה והצבע המלא מהאחרונה (`getComputedStyle`), כך ש-GSAP מעביר בין שני ערכי rgb ולא מנסה לפתור `var()`. **כל צעד:** השורה החדשה עולה בשקיפות ובתנועה של 28 פיקסלים, והקודמת מתעמעמת באותו רגע. אין תנועה אופקית, ולכן אין מה להפוך באתר משמאל לימין. **נגישות:** רק `opacity` ולא `visibility`, כך שקורא מסך שומע את כל השורות גם לפני שהן מופיעות. **מספר השורות:** ארבע עד שש. יותר מזה הופך את הגלילה לארוכה.",
  libs:["gsap","ScrollTrigger"],
  css:`.cs{max-width:1000px;margin-inline:auto}
.cs-st{display:flex;flex-direction:column;justify-content:center;gap:24px;padding-block:48px}
.cs-k{margin:0;color:var(--muted);font-size:var(--fs-body)}
.cs-ls{display:grid;gap:clamp(12px,1.6vw,24px)}
.cs-l{margin:0;font-size:clamp(26px,3.7vw,56px);font-weight:600;line-height:1.2;letter-spacing:-.01em;text-wrap:balance;color:var(--muted)}
.cs-l:last-child{color:var(--ink)}
/* המהלך רץ: גובה של מסך ועוד 56% לכל שורה, והבמה נעוצה למעלה */
.cs.is-live{height:calc(100vh + (var(--n) - 1) * 56vh);height:calc(100svh + (var(--n) - 1) * 56svh)}
.cs.is-live .cs-st{position:sticky;top:0;height:100vh;height:100svh;padding-block:0}`,
  html:`<div class="stage"><section class="cs">
  <div class="cs-st">
    <p class="cs-k">איך עובדים איתנו</p>
    <div class="cs-ls">
      <p class="cs-l">כל פרויקט מתחיל בהיכרות עם העסק.</p>
      <p class="cs-l">אחרי זה בונים תכנית עבודה שאפשר לקרוא בלי מילון.</p>
      <p class="cs-l">לכל שלב יש תאריך ואדם אחראי.</p>
      <p class="cs-l">שינויים קטנים נכנסים בלי תוספת תשלום.</p>
      <p class="cs-l">ובסוף מקבלים אתר שאפשר לנהל לבד.</p>
    </div>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל השורות מוצגות, הישנות באפור והאחרונה במלואה
  const root=document.querySelector(".cs"),ls=[...root.querySelectorAll(".cs-l")];
  // בהפחתת תנועה הפונקציה לא רצה, והרשימה נשארת במצב הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const muted=getComputedStyle(ls[0]).color,ink=getComputedStyle(ls[ls.length-1]).color;
    root.classList.add("is-live");root.style.setProperty("--n",ls.length);
    gsap.set(ls,{color:ink});gsap.set(ls.slice(1),{opacity:0,y:28});
    const tl=gsap.timeline({defaults:{ease:"power2.out"},
      scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    // בכל צעד: השורה החדשה עולה והקודמת מתעמעמת באותו רגע
    ls.slice(1).forEach((l,i)=>{
      tl.to(ls[i],{color:muted,duration:.5,ease:"none"},i+.2).to(l,{opacity:1,y:0,duration:.6},i+.2);
    });
    tl.to({},{duration:.5});      // עצירה בסוף, כדי שהשורה האחרונה תישאר במלואה רגע לפני שהעמוד ממשיך
    return()=>{if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");root.style.removeProperty("--n");gsap.set(ls,{clearProps:"color,opacity,transform"});};
  });
})();`
},
{
  id:"g212", cat:"gsap", name:"רצועת שמות שנעה והשם במרכזה מואר", tech:"GSAP · ticker · ScrollTrigger", status:"מאושר-עין",
  desc:"רצועה של שמות לקוחות זורמת בלי הפסקה, כשכל השמות מתווה ריק חוץ מזה שנמצא במרכז: הוא נצבע במלואו בצבע המותג, ובדרך החוצה חוזר להיות מתווה. השם המואר מתחלף ברציפות, ומתחת לרצועה עומד נתון אחד גדול.",
  when:"רצועת לקוחות, שותפים או מותגים שאין להם לוגו מוכן, או שרוצים להאיר בהם אחד בכל פעם. מתאים לסקשן הוכחה, מתחת להירו או לפני הצעה. פעם אחת בעמוד. לא כשיש פחות משישה שמות, ולא כשהשמות הם הבטחה משפטית.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) עם רצועת שמות חברות שבה השם שבמרכז מואר ושאר השמות מתווה. נבנה מאפס מהצפייה. **המארקאפ הוא המצב הסופי:** רשימת שמות רגילה (`ul`) שעוטפת לכמה שורות במצב ניגודיות בינוני. כך זה נראה בלי GSAP ובהפחתת תנועה, ושם גם קורא מסך שומע אותה. **כשהמהלך רץ** הרשימה הופכת ל-`sr-only`, והסקריפט משכפל את הפריטים פעמיים לרצועה אחת (`aria-hidden`) שנעה ימינה: ההמשך של משפט בעברית נכנס מצד שמאל, כמו בכיוון הקריאה. מחזור אחד הוא רוחב סדרה אחת, ולכן אין קפיצה. **ההארה:** לכל פריט מחושבת מרחק מהמרכז ממידות שנשמרו בזמן המדידה (בלי `getBoundingClientRect` בכל פריים), ומוגדר `--l` בין 0 ל-1. ה-CSS מערבב מ-`--l` את הצבע ואת קו המתאר ב-`color-mix`. ההדרגה ריבועית, כך שההארה חדה במרכז ונגמרת מהר. `--l` מתעדכן רק כשהערך זז, ולכן הדפדפן לא מחשב סגנון מחדש בכל פריים. **ביצועים:** עצירה כשהרצועה מחוץ למסך, והמדידה מחדש בשינוי גודל ובטעינת הפונטים. **באתר משמאל לימין** מחליפים את הסימן של התנועה (`x` מחושב כ-`-ph` במקום `ph-W`) כך שהרצועה זזה שמאלה. **מספר שמות:** שבעה עד שנים עשר. פחות מזה והרצועה לא מכסה את הרוחב.",
  libs:["gsap","ScrollTrigger"],
  css:`.ml{max-width:1200px;margin-inline:auto;display:grid;gap:clamp(40px,5vw,72px)}
.ml-ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:16px 40px}
.ml-ul li{font-size:clamp(28px,4.2vw,60px);font-weight:700;line-height:1.1;letter-spacing:-.01em;color:color-mix(in oklab,var(--ink) 55%,transparent)}
.ml-vw{display:none;direction:ltr;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.ml-tr{position:relative;display:flex;width:max-content;direction:ltr;will-change:transform}
.ml-tr li{flex:none;list-style:none;direction:rtl;white-space:nowrap;padding-inline:clamp(20px,3vw,48px);font-size:clamp(34px,5.4vw,80px);font-weight:700;line-height:1.2;letter-spacing:-.01em;--l:0;
  color:color-mix(in oklab,var(--accent) calc(var(--l) * 100%),transparent);
  -webkit-text-stroke:1.5px color-mix(in oklab,var(--accent) calc(var(--l) * 100%),color-mix(in oklab,var(--ink) 42%,transparent))}
.ml.is-live .ml-vw{display:block}
.ml.is-live .ml-ul{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ml-st{margin:0;display:flex;align-items:baseline;justify-content:center;gap:16px 24px;flex-wrap:wrap;text-align:center}
.ml-n{font-size:clamp(64px,10vw,144px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;unicode-bidi:isolate}
.ml-c{max-width:26ch;color:var(--muted);font-size:var(--fs-body);line-height:1.5}`,
  html:`<div class="stage"><div class="ml">
  <ul class="ml-ul">
    <li>נגריית הגליל</li><li>מאפיית שחר</li><li>קליניקת ורד</li><li>סטודיו אופק</li><li>חוות עמק</li><li>קפה הרצל</li><li>משרד עו״ד לוי</li><li>שיפוצי ברק</li><li>גן אירועים נוף</li>
  </ul>
  <div class="ml-vw" aria-hidden="true"><div class="ml-tr"></div></div>
  <p class="ml-st"><b class="ml-n" dir="ltr">140+</b><span class="ml-c">עסקים קטנים עובדים איתנו, חלקם כבר שבע שנים.</span></p>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת רשימה רגילה של השמות
  const root=document.querySelector(".ml"),ul=root.querySelector(".ml-ul"),view=root.querySelector(".ml-vw"),track=root.querySelector(".ml-tr");
  // בהפחתת תנועה הפונקציה לא רצה, והשמות נשארים ברשימה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const items=[...ul.children];
    // שתי סדרות זהות ברצף, והמסלול נע רוחב סדרה אחת ומתחיל מחדש בלי קפיצה
    const sets=[0,1].map(()=>items.map(li=>{const c=li.cloneNode(true);track.appendChild(c);return c;}));
    root.classList.add("is-live");
    let W=1,half=0,ph=0,on=true,pos=[];
    const measure=()=>{
      half=view.clientWidth/2;W=track.scrollWidth/2||1;
      pos=[].concat(...sets).map(c=>({c:c,x:c.offsetLeft,w:c.offsetWidth,l:-1}));
    };
    const tick=(t,dt)=>{
      if(!on)return;
      ph=(ph+Math.min(dt,64)/1000*70)%W;      // ימינה: כיוון הקריאה בעברית נכנס משמאל
      const x=ph-W,R=Math.max(160,half*.34);
      track.style.transform="translate3d("+x.toFixed(1)+"px,0,0)";
      for(let i=0;i<pos.length;i++){
        const p=pos[i],d=Math.abs(p.x+x+p.w/2-half),l=Math.max(0,1-d/R),v=Math.round(l*l*50)/50;
        if(v!==p.l){p.l=v;p.c.style.setProperty("--l",v);}
      }
    };
    measure();tick(0,0);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
    gsap.ticker.add(tick);
    window.addEventListener("resize",measure);ScrollTrigger.addEventListener("refresh",measure);
    const st=ScrollTrigger.create({trigger:view,start:"top bottom",end:"bottom top",onToggle:s=>{on=s.isActive;}});
    return()=>{gsap.ticker.remove(tick);st.kill();window.removeEventListener("resize",measure);ScrollTrigger.removeEventListener("refresh",measure);
      sets.forEach(s=>s.forEach(c=>c.remove()));root.classList.remove("is-live");track.style.transform="";};
  });
})();`
},
{
  id:"css38", cat:"css", name:"מילה ענקית שגולשת מהמסגרת עם עותקים מטושטשים בעומק", tech:"CSS scroll-driven · animation-timeline · filter blur", status:"מאושר-עין",
  desc:"מילה אחת בגודל כזה שהיא חורגת מהמסגרת ונחתכת בקצוות, ומאחוריה שני עותקים מטושטשים בצבע המותג. כשגוללים, שלוש השכבות זזות בקצבים שונים: הרחוקה והמטושטשת הכי הרבה, החדה הכי מעט. נוצר עומק של כרזה, בלי JavaScript.",
  when:"פתיחה בסגנון כרזה לעסק עם שם או מוצר של מילה אחת חזקה: קפה, לחם, ספה, פרחים. מתאים להירו, לסקשן הפרדה או לקריאה לפעולה. פעם אחת בעמוד. לא למילה ארוכה ולא למשפט, ולא לאתר שהטקסט בו צריך להיקרא ראשון.",
  note:"**שחזור.** השראה: סרטון בגלריה של prompt-motion.com (21.10.2026) עם אותיות ענק שחורגות מהמסגרת ועותקים מטושטשים מאחוריהן. נבנה מאפס מהצפייה. **המארקאפ:** שלוש שכבות של אותה מילה בתוך מסגרת עם `overflow:clip`. הרחוקה (`.gt-b2`) מטושטשת ב-34 פיקסלים, האמצעית (`.gt-b1`) ב-14, והחדה (`.gt-s`) היא הכותרת האמיתית. שתי המטושטשות `aria-hidden`. **התנועה:** בלי JS. למסגרת יש `view-timeline` בשם `--gt`, וכל שכבה זזה אנכית לפי ההתקדמות שלה (26%, 14% ו-4% מהגובה, בכיוונים הפוכים). זה רץ על ה-compositor (transform בלבד), והטשטוש סטטי. **תמיכה:** `@supports (animation-timeline: view())`. דפדפן בלי התכונה מציג את הכרזה במנוחה, והיא עדיין נראית שלמה. **הפחתת תנועה:** האנימציה כבויה. **הגודל:** גודל האות הוא `clamp(200px, 58vw, 980px)`, כך שהמילה חורגת מהמסגרת בכמה עשרות פיקסלים בכל רוחב, ובטלפון עדיין קריאה. מחליפים את המילה ומתאימים את הגודל, והמסגרת קובעת את הקצוות. **עברית:** `letter-spacing` שלילי לא פוגע, ואין תנועה אופקית, ולכן אין מה להפוך באתר משמאל לימין. **נגישות:** הכותרת החדה היא האלמנט היחיד שקורא מסך שומע.",
  libs:[],
  css:`.gt-wrap{max-width:1200px;margin-inline:auto;display:grid;gap:24px}
.gt{view-timeline:--gt block;position:relative;display:grid;place-items:center;min-height:clamp(480px,72vh,760px);border-radius:32px;overflow:clip;background:var(--card)}
.gt-w{position:absolute;inset:0;display:grid;place-items:center;margin:0;font-size:clamp(200px,58vw,980px);font-weight:700;line-height:.8;letter-spacing:-.04em;white-space:nowrap;user-select:none}
.gt-b2{color:color-mix(in oklab,var(--accent) 62%,transparent);filter:blur(34px)}
.gt-b1{color:color-mix(in oklab,var(--accent) 40%,transparent);filter:blur(14px)}
.gt-s{color:var(--ink)}
.gt-p{margin:0;max-width:46ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
@supports (animation-timeline:view()){
  .gt-w{animation-timing-function:linear;animation-fill-mode:both;animation-timeline:--gt;animation-range:cover 0% cover 100%}
  .gt-b2{animation-name:gt-far}
  .gt-b1{animation-name:gt-mid}
  .gt-s{animation-name:gt-near}
  @keyframes gt-far{from{transform:translateY(26%) scale(1.06)}to{transform:translateY(-26%) scale(1.06)}}
  @keyframes gt-mid{from{transform:translateY(14%)}to{transform:translateY(-14%)}}
  @keyframes gt-near{from{transform:translateY(4%)}to{transform:translateY(-4%)}}
}
@media(prefers-reduced-motion:reduce){.gt-w{animation:none}}`,
  html:`<div class="stage"><div class="gt-wrap"><section class="gt">
  <span class="gt-w gt-b2" aria-hidden="true">קפה</span>
  <span class="gt-w gt-b1" aria-hidden="true">קפה</span>
  <h2 class="gt-w gt-s">קפה</h2>
</section>
<p class="gt-p">קלייה קטנה בתל אביב. השקית נארזת ביום ההזמנה ומגיעה אליכם טרייה.</p>
</div></div>`,
  js:``
}
];
