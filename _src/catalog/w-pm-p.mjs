// תשעה מהלכי טיפוגרפיה מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// 25.10.2026: g206, g207 ו-g210 נמחקו אחרי הסקירה (ליאב: "נישתי מדי. למחוק", "לא כל כך מתחבר לזה. למחוק", "נישתי מדי, אפשר למחוק"). נשארו שישה.
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
