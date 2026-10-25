// מהלכי מוצר ותהליך מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. כאן הקבוצה של ממשקי דוגמה: סמן שמפעיל חלון, שאלה שמוקלדת ותשובה שחוזרת,
// כרטיס שנבנה צעד אחר צעד, מסגרת שננעלת על יעדים, חומרים שנכנסים למעבד, ואיור שמצטבר עם ההתקדמות.
// נבנו מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
export default [
{
  id:"g180", cat:"gsap", name:"סמן מתוסרט שמפעיל ממשק דוגמה", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"חלון של מערכת אוטומציה, וסמן קטן עם תווית סטטוס שעובר בו לבד: מדליק שלושה מתגים בזה אחר זה, מקליד שם עסק בשדה, לוחץ על כפתור ההפעלה, ושורת ריבועים בתחתית מתמלאת בכל צעד. הגולש רואה את המוצר עובד לפני שהוא מנסה אותו.",
  when:"שירות עם ממשק או תהליך אמיתי שאפשר להראות בשלושה עד ארבעה צעדים: הגדרת אוטומציה, קביעת תור, פתיחת חשבון, הזמנה. סקשן ״איך זה עובד״ או הוכחה בעמוד נחיתה, כשהמילים לא מספיקות והגולש צריך לראות כמה זה פשוט. פעם אחת בעמוד ובחלון אחד.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026) שבהם סמן עם תווית עובר בממשק ומפעיל אותו. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** כל המתגים דולקים, השם מוקלד, הכפתור במצב ״פעיל״ וכל עשרת הריבועים מלאים, והסמן מוסתר. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** ה-JS מכבה הכל, ובכניסה לעמוד (`top 65%`, פעם אחת) ציר זמן אחד מזיז את הסמן בין היעדים ומדליק כל אחד בלחיצה. הקואורדינטות נמדדות מ-`getBoundingClientRect` של כל יעד ברגע שהקטע מתחיל, ולכן הסמן מדויק בכל רוחב מסך. ההקלדה היא מונה אחד ו-`slice` על הטקסט. החלון כולו `aria-hidden` והפסקה שלידו מסבירה את אותו דבר לקורא מסך. **להתאים:** שלוש השורות, הטקסט המוקלד ותווית הכפתור הם התוכן. מספר הריבועים הוא פי שניים ממספר הצעדים (חמישה צעדים, עשרה ריבועים). **RTL:** הידית של המתג נוסעת שמאלה והריבועים מתמלאים מימין. ב-LTR משנים את `--sx` ל-1. הסמן עצמו לא מתהפך, כמו בכל מערכת הפעלה. בנייד החלון יורד מתחת לטקסט ותופס את רוחב המסך.",
  libs:["gsap","ScrollTrigger"],
  css:`.sc{--sx:-1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1040px;margin-inline:auto}
.sc-txt{display:grid;gap:14px;max-width:36ch}
.sc-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.sc-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sc-win{position:relative;justify-self:center;box-sizing:border-box;width:min(460px,100%);background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.sc-bar{display:flex;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid var(--line)}
.sc-bar i{width:10px;height:10px;border-radius:50%;background:var(--line)}
.sc-ttl{margin-inline-start:12px;font-size:13px;color:var(--muted)}
.sc-body{display:grid;gap:12px;padding:20px}
.sc-opt{display:flex;align-items:center;gap:14px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;font-size:15px;line-height:1.3}
.sc-tg{flex:none;display:flex;align-items:center;box-sizing:border-box;width:40px;height:24px;padding:4px;border-radius:999px;background:var(--line);transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.sc-tg i{width:16px;height:16px;border-radius:50%;background:var(--muted);transition:transform .3s cubic-bezier(.2,.6,.2,1),background-color .3s cubic-bezier(.2,.6,.2,1)}
.sc-opt.is-on .sc-tg{background:var(--accent)}
.sc-opt.is-on .sc-tg i{background:var(--accent-ink);transform:translateX(calc(var(--sx) * 16px))}
.sc-in{display:grid;gap:6px}
.sc-lbl{font-size:13px;color:var(--muted)}
.sc-val{display:flex;align-items:center;min-height:44px;padding:0 14px;border:1px solid var(--line);border-radius:12px;font-size:15px;transition:border-color .25s linear}
.sc-in.is-focus .sc-val{border-color:var(--accent)}
.sc-caret{flex:none;width:2px;height:20px;margin-inline-start:4px;background:var(--accent);opacity:0}
.sc-in.is-typing .sc-caret{opacity:1;animation:sc-blink 1s steps(1) infinite}
@keyframes sc-blink{50%{opacity:0}}
.sc-go{display:grid;place-items:center;min-height:48px;padding:0 20px;border-radius:12px;background:var(--line);color:var(--ink);font-size:16px;font-weight:600;transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.sc-go>span{grid-area:1/1;transition:opacity .25s linear}
.sc-go-b{opacity:0;color:var(--accent-ink)}
.sc-go.is-on{background:var(--accent)}
.sc-go.is-on .sc-go-a{opacity:0}
.sc-go.is-on .sc-go-b{opacity:1}
.sc-meter{display:grid;grid-template-columns:repeat(10,1fr);gap:4px}
.sc-meter i{height:8px;border-radius:4px;background:var(--line);transition:background-color .25s linear}
.sc-meter i.on{background:var(--accent)}
.sc-cur{position:absolute;left:0;top:0;width:0;height:0;z-index:3;pointer-events:none;opacity:0}
.sc-cur svg{position:absolute;left:0;top:0;width:20px;height:26px;overflow:visible;fill:var(--ink);stroke:var(--card);stroke-width:1.5;stroke-linejoin:round;transform-origin:0 0}
.sc-tag{position:absolute;left:18px;top:24px;padding:4px 10px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:700;white-space:nowrap}
.sc-rip{position:absolute;left:-16px;top:-16px;box-sizing:border-box;width:32px;height:32px;border:2px solid var(--accent);border-radius:50%;opacity:0}
@media(max-width:767px){.sc{grid-template-columns:minmax(0,1fr)}.sc-txt{max-width:none}.sc-body{padding:16px}}`,
  html:`<div class="stage"><div class="sc">
  <div class="sc-txt"><h3>הפנייה הבאה כבר מקבלת מענה</h3><p>מדליקים שלושה צעדים, מקלידים את שם העסק ולוחצים על הפעלה. מכאן כל פנייה חדשה מקבלת תודה, פגישה ותזכורת, בלי שאף אחד יעבוד על זה.</p></div>
  <div class="sc-win" aria-hidden="true">
    <div class="sc-bar"><i></i><i></i><i></i><span class="sc-ttl">אוטומציות לפניות חדשות</span></div>
    <div class="sc-body">
      <span class="sc-opt is-on"><span class="sc-tg"><i></i></span><span>הודעת תודה מיד אחרי הפנייה</span></span>
      <span class="sc-opt is-on"><span class="sc-tg"><i></i></span><span>קביעת פגישה ביומן</span></span>
      <span class="sc-opt is-on"><span class="sc-tg"><i></i></span><span>תזכורת יום לפני הפגישה</span></span>
      <span class="sc-in"><span class="sc-lbl">שם העסק</span><span class="sc-val"><span class="sc-typed">סטודיו נועה</span><span class="sc-caret"></span></span></span>
      <span class="sc-go is-on"><span class="sc-go-a">הפעלת האוטומציה</span><span class="sc-go-b">האוטומציה פעילה</span></span>
      <span class="sc-meter"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span>
    </div>
    <div class="sc-cur"><svg viewBox="0 0 20 26"><path d="M2 2v19l5.2-4.7 3.4 7.7 3.6-1.6-3.4-7.5 7-.5z"/></svg><span class="sc-rip"></span><span class="sc-tag">מפעיל</span></div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP החלון נשאר במצב הסיום (במארקאפ)
  const root=document.querySelector(".sc"),win=root.querySelector(".sc-win");
  const opts=[...win.querySelectorAll(".sc-opt")],field=win.querySelector(".sc-in"),typed=win.querySelector(".sc-typed"),
    go=win.querySelector(".sc-go"),blocks=[...win.querySelectorAll(".sc-meter i")],
    cur=win.querySelector(".sc-cur"),arrow=cur.querySelector("svg"),tag=cur.querySelector(".sc-tag"),rip=cur.querySelector(".sc-rip");
  const full=typed.textContent;
  const meter=n=>blocks.forEach((b,i)=>b.classList.toggle("on",i<n));
  const finish=()=>{opts.forEach(o=>o.classList.add("is-on"));field.classList.remove("is-focus","is-typing");typed.textContent=full;go.classList.add("is-on");meter(blocks.length);};
  // בהפחתת תנועה הפונקציה לא רצה, והחלון נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    opts.forEach(o=>o.classList.remove("is-on"));go.classList.remove("is-on");typed.textContent="";meter(0);
    gsap.set(cur,{x:()=>win.offsetWidth*.84,y:()=>win.offsetHeight*.9,opacity:0});
    // מרכז היעד ביחס לחלון, נמדד ברגע שהקטע מתחיל
    const at=(el,fx,fy)=>{const a=win.getBoundingClientRect(),b=el.getBoundingClientRect();return{x:b.left-a.left+b.width*fx,y:b.top-a.top+b.height*fy};};
    const tl=gsap.timeline({paused:true,defaults:{ease:"power2.inOut"}});
    // ״>״ הוא סוף האנימציה האחרונה שנוספה, כך שהטבעת ממשיכה להתרחב בזמן שהסמן כבר בדרך ליעד הבא
    const say=t=>tl.call(()=>{tag.textContent=t;},null,">");
    const goTo=(el,fx,fy)=>tl.to(cur,{x:()=>at(el,fx,fy).x,y:()=>at(el,fx,fy).y,duration:.65},">+=.08");
    // לחיצה: החץ נלחץ, הפעולה קורית, טבעת מתרחבת והחץ חוזר
    const click=fn=>{
      tl.to(arrow,{scale:.8,duration:.1,ease:"power1.out"},">")
        .call(fn,null,">")
        .fromTo(rip,{scale:.3,opacity:.9},{scale:1.5,opacity:0,duration:.45,ease:"power1.out",immediateRender:false},"<")
        .to(arrow,{scale:1,duration:.18,ease:"power1.out"},"<");
    };
    tl.to(cur,{opacity:1,duration:.35,ease:"power1.out"});
    opts.forEach((o,i)=>{
      say("מפעיל");
      goTo(o.querySelector(".sc-tg"),.5,.5);
      click(()=>{o.classList.add("is-on");meter(2*(i+1));});
    });
    say("מקליד");
    goTo(field.querySelector(".sc-val"),.35,.5);
    click(()=>field.classList.add("is-focus","is-typing"));
    const k={n:0};
    tl.to(k,{n:full.length,duration:1,ease:"none",onUpdate:()=>{typed.textContent=full.slice(0,Math.round(k.n));}},">+=.15")
      .call(()=>{field.classList.remove("is-focus","is-typing");meter(8);},null,">");
    say("לוחץ");
    goTo(go,.6,.5);
    click(()=>{go.classList.add("is-on");meter(10);});
    say("בוצע");
    tl.to(cur,{opacity:0,duration:.5,ease:"power1.in"},">+=.9");
    const st=ScrollTrigger.create({trigger:root,start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([cur,arrow,rip],{clearProps:"all"});finish();};
  });
})();`
},
{
  id:"g181", cat:"gsap", name:"שדה שמקליד שאלה ומחזיר תשובה", tech:"GSAP · Timeline · CSS @property glow", status:"מאושר-עין",
  desc:"שדה חיפוש בצורת גלולה שמקליד לבד שאלה אחת עם סמן מהבהב. הכפתור עובר מאפור לצבע המותג ואז לספינר, מסגרת זוהרת סביב השדה מתבהרת ברגע השאלה, ומתחתיו נפתח כרטיס תשובה עם שורות שנכנסות בזו אחר זו. אפשר לראות מה השירות עושה בשתי שניות.",
  when:"אתר של שירות שעונה לשאלה אחת מוכרת: חיפוש תור פנוי, בדיקת זמינות, הערכת מחיר, בדיקת כתובת. תחילת העמוד או סקשן ״איך זה עובד״. השאלה והתשובה צריכות להיות אמיתיות, כאלה שהשירות באמת נותן, ולא ארוכות מארבע שורות. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטוני בינה מלאכותית וחיפוש בגלריה של prompt-motion.com (21.10.2026), שבהם שדה מקליד שאלה ומתחתיו מופיעה תשובה. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** השאלה מוקלדת, הכפתור צבוע ושלוש שורות התשובה מוצגות. בלי GSAP ובהפחתת תנועה זה מה שמוצג, והסמן המהבהב והספינר לא קיימים. **כשהמהלך רץ** ה-JS מרוקן את השדה ומסתיר את התשובה, ובכניסה לעמוד (`top 70%`, פעם אחת) ציר זמן אחד מקליד עם מונה ו-`slice`, צובע את הכפתור, לוחץ עליו, מראה ספינר ומכניס את התשובה בסטגר. **המסגרת הזוהרת** היא שיפוע חרוטי (`conic-gradient`) עם זווית שמסתובבת דרך `@property`, פעם כטבעת בגבול של הגלולה ופעם מטושטשת מאחוריה. העוצמה שלה עוברת דרך שלוש מחלקות (רגיל, בפוקוס, בשאלה). הסיבוב מופעל רק כשאין הפחתת תנועה. **מקום התשובה שמור מראש,** כך שהעמוד לא קופץ כשהיא מופיעה. החלק האינטראקטיבי כולו `aria-hidden`, והפסקה שמעליו מסבירה מה השירות עושה. **RTL:** השאלה בעברית מתקדמת משמאל לימין בהקלדה והסמן נשאר בסופה. לשאלה בלועזית מוסיפים `dir=ltr` על `.qf-q`. הצבעים של הזוהר הם גוונים של צבע המותג, בלי צבע חדש.",
  libs:["gsap","ScrollTrigger"],
  css:`@property --qf-ang{syntax:"<angle>";inherits:true;initial-value:0deg}
.qf{--qf-ring:conic-gradient(from var(--qf-ang),var(--accent),color-mix(in srgb,var(--accent) 55%,var(--card)),color-mix(in srgb,var(--accent) 82%,var(--ink)),color-mix(in srgb,var(--accent) 40%,var(--card)),var(--accent));display:grid;gap:32px;max-width:680px;margin-inline:auto}
@media(prefers-reduced-motion:no-preference){.qf-field{animation:qf-spin 7s linear infinite}}
@keyframes qf-spin{to{--qf-ang:360deg}}
.qf-txt{display:grid;gap:14px;justify-items:center;text-align:center}
.qf-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.qf-txt p{margin:0;max-width:44ch;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.qf-ui{display:grid;gap:20px}
.qf-field{position:relative;isolation:isolate}
.qf-field::after{content:"";position:absolute;inset:-4px;z-index:-1;border-radius:999px;background:var(--qf-ring);filter:blur(16px);opacity:.3;transition:opacity .5s cubic-bezier(.2,.6,.2,1)}
.qf-field.is-focus::after{opacity:.5}
.qf-field.is-ask::after{opacity:.9}
.qf-pill{display:flex;align-items:center;gap:12px;padding-block:8px;padding-inline:20px 8px;border:2px solid transparent;border-radius:999px;background:linear-gradient(var(--card) 0 0) padding-box,var(--qf-ring) border-box}
.qf-ico{flex:none;width:20px;height:20px;fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round}
.qf-q{flex:1;min-width:0;display:flex;align-items:center;font-size:clamp(15px,1.4vw,18px);white-space:nowrap}
.qf-typed{min-width:0;overflow:hidden}
.qf-caret{flex:none;width:2px;height:22px;margin-inline-start:4px;background:var(--accent);opacity:0}
.qf-field.is-typing .qf-caret{opacity:1;animation:qf-blink 1s steps(1) infinite}
@keyframes qf-blink{50%{opacity:0}}
.qf-btn{flex:none;display:grid;place-items:center;min-width:104px;min-height:44px;padding:0 20px;border-radius:999px;background:var(--line);color:var(--ink);font-size:15px;font-weight:600;transition:background-color .3s cubic-bezier(.2,.6,.2,1),color .3s linear}
.qf-btn.is-ready{background:var(--accent);color:var(--accent-ink)}
.qf-lab{grid-area:1/1;transition:opacity .2s linear}
.qf-spin{grid-area:1/1;box-sizing:border-box;width:18px;height:18px;border:2px solid color-mix(in srgb,var(--accent-ink) 30%,transparent);border-top-color:var(--accent-ink);border-radius:50%;opacity:0}
.qf-btn.is-busy .qf-lab{opacity:0}
.qf-btn.is-busy .qf-spin{opacity:1;animation:qf-rot .8s linear infinite}
@keyframes qf-rot{to{transform:rotate(360deg)}}
.qf-res{display:grid;gap:14px;padding:20px;background:var(--card);border:1px solid var(--line);border-radius:18px}
.qf-lead{margin:0;font-size:16px;font-weight:600;line-height:1.4}
.qf-rows{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.qf-row{display:flex;align-items:center;gap:14px;padding:12px 14px;border:1px solid var(--line);border-radius:12px;font-size:15px}
.qf-row b{font-weight:600}
.qf-row small{margin-inline-end:auto;color:var(--muted);font-size:14px}
.qf-pick{flex:none;padding:6px 14px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-size:13px;font-weight:600}
@media(max-width:767px){.qf-ico{display:none}.qf-pill{padding-inline:16px 6px}.qf-btn{min-width:80px;padding:0 14px}.qf-res{padding:16px}}`,
  html:`<div class="stage"><div class="qf">
  <div class="qf-txt"><h3>שואלים בשפה רגילה ומקבלים תור</h3><p>בלי טפסים ובלי לחכות לשיחה חוזרת. המערכת מחפשת ביומן של הקליניקה ומציעה את המועדים הקרובים.</p></div>
  <div class="qf-ui" aria-hidden="true">
    <div class="qf-field">
      <div class="qf-pill">
        <svg class="qf-ico" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>
        <span class="qf-q"><span class="qf-typed">יש תור פנוי לפיזיותרפיה השבוע?</span><span class="qf-caret"></span></span>
        <span class="qf-btn is-ready"><span class="qf-lab">חיפוש</span><span class="qf-spin"></span></span>
      </div>
    </div>
    <div class="qf-res">
      <p class="qf-lead">מצאתי שלושה תורים פנויים השבוע. איזה מהם מתאים לך?</p>
      <ul class="qf-rows">
        <li class="qf-row"><b>יום שלישי, 17:30</b><small>עם הדס</small><span class="qf-pick">הכי קרוב</span></li>
        <li class="qf-row"><b>יום רביעי, 09:00</b><small>עם אורי</small></li>
        <li class="qf-row"><b>יום חמישי, 12:15</b><small>עם הדס</small></li>
      </ul>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP השאלה כבר מוקלדת והתשובה מוצגת (במארקאפ)
  const root=document.querySelector(".qf"),field=root.querySelector(".qf-field"),typed=root.querySelector(".qf-typed"),
    btn=root.querySelector(".qf-btn"),card=root.querySelector(".qf-res"),parts=[...root.querySelectorAll(".qf-lead,.qf-row")];
  const full=typed.textContent;
  const finish=()=>{typed.textContent=full;field.classList.remove("is-focus","is-typing","is-ask");btn.classList.remove("is-busy");btn.classList.add("is-ready");};
  // בהפחתת תנועה הפונקציה לא רצה, והשאלה והתשובה נשארות במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    typed.textContent="";btn.classList.remove("is-ready");
    gsap.set(card,{autoAlpha:0});gsap.set(parts,{autoAlpha:0,y:14});
    const k={n:0},tl=gsap.timeline({paused:true});
    tl.call(()=>field.classList.add("is-focus","is-typing"),null,.3)
      .to(k,{n:full.length,duration:1.5,ease:"none",onUpdate:()=>{typed.textContent=full.slice(0,Math.round(k.n));}})
      .call(()=>{field.classList.remove("is-typing");btn.classList.add("is-ready");})
      .to(btn,{scale:.94,duration:.12,ease:"power1.out"},"+=.55")
      .to(btn,{scale:1,duration:.2,ease:"power1.out"})
      .call(()=>{btn.classList.add("is-busy");field.classList.add("is-ask");})
      .call(()=>{btn.classList.remove("is-busy");field.classList.remove("is-focus");},null,"+=1.2")
      .to(card,{autoAlpha:1,duration:.4,ease:"power1.out"},"<.1")
      .to(parts,{autoAlpha:1,y:0,duration:.55,stagger:.14,ease:"power2.out"},"<.15")
      .call(()=>field.classList.remove("is-ask"),null,"+=.8");
    const st=ScrollTrigger.create({trigger:root,start:"top 70%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([btn,card,...parts],{clearProps:"all"});finish();};
  });
})();`
},
{
  id:"g182", cat:"gsap", name:"רשימת שלבים עם שבבי סטטוס שמתחלפים", tech:"GSAP · ScrollTrigger · sticky", status:"מאושר-עין",
  desc:"כרטיס עם חמישה שלבים, ובכל שלב שבב סטטוס: ״ממתין״ באפור, ״בטיפול״ עם ספינר, ״הושלם״ בצבע המותג עם וי שמצטייר. הכרטיס נעוץ במסך והגלילה מקדמת אותו: שלב אחרי שלב הסטטוס מתחלף, פס ההתקדמות מתמלא והמונה למעלה עולה מאפס לחמש. זה תהליך שרואים מתקדם, לא רשימה שקוראים.",
  when:"תהליך אמיתי של שלושה עד שישה שלבים שיש להם סטטוס: קליטת לקוח, מעבר דירה או משרד, הקמת חשבון, הזמנה עם כמה שלבי טיפול. סקשן ״איך זה עובד״ או ״מה קורה אחרי שמצטרפים״. השלבים והסטטוסים צריכים להיות אמיתיים ובאים בסדר הזה. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטוני תהליך בגלריה של prompt-motion.com (21.10.2026), שבהם רשימת שלבים מחליפה סטטוסים בזה אחר זה ופס ההתקדמות עולה איתה. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** `ol` אמיתי, בכל שורה `data-s=\"done\"`, והמונה על 5. בלי GSAP ובהפחתת תנועה זו רשימה רגילה בזרימת העמוד. הקורא מסך מקבל את שם השלב ואת ״הושלם״, והתוויות האחרות של השבב מסומנות `aria-hidden`. **כשהמהלך רץ** הכרטיס נעוץ ב-`position:sticky` בתוך אזור גלילה גבוה (300vh, רק כשה-JS חי, כדי שבלעדיו לא יהיה רווח ריק). פונקציה אחת `paint(p)` מקבלת את ההתקדמות וקובעת לכל שורה את המצב (`pending`, `busy`, `done`) לפי הטווח שלה, ולכן אותו קוד עובד בגלילה למעלה ולמטה, ואין צורך בשום callback של ציר זמן. את המעבר בין שבבים עושה ה-CSS: שלוש תוויות חופפות שמתחלפות באטימות, ווי שמצטייר ב-`stroke-dashoffset`. **להתאים:** שלבים, שמות וסטטוסים הם התוכן, והטווח של כל שלב הוא `T` בקוד. **RTL:** הפס מתמלא מימין. ב-LTR משנים את `transform-origin` של `.cl-fill` ל-`left center`. בנייד הטקסט נמצא מעל הכרטיס, ושניהם נכנסים במסך אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`.cl{max-width:1040px;margin-inline:auto}
.cl-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);align-items:center;align-content:center;gap:clamp(32px,6vw,96px)}
.cl-txt{display:grid;gap:14px;max-width:36ch}
.cl-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.cl-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.cl-card{display:grid;gap:16px;padding:24px;background:var(--card);border:1px solid var(--line);border-radius:20px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.cl-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.cl-title{font-size:18px;font-weight:700}
.cl-count{font-size:14px;color:var(--muted);font-variant-numeric:tabular-nums}
.cl-count b{color:var(--ink);font-weight:600}
.cl-bar{height:8px;border-radius:4px;background:var(--line);overflow:hidden}
.cl-fill{display:block;height:100%;background:var(--accent);transform-origin:right center}
.cl-list{list-style:none;margin:0;padding:0}
.cl-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-top:1px solid var(--line)}
.cl-row:first-child{border-top:0}
.cl-ck{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--line);transition:background-color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1)}
.cl-ck svg{width:14px;height:14px;fill:none;stroke:var(--accent-ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.cl-ck path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .35s cubic-bezier(.2,.6,.2,1)}
.cl-name{flex:1;min-width:0;font-size:16px;font-weight:500;line-height:1.35;transition:color .3s linear}
.cl-chip{display:grid;justify-items:center;align-items:center;min-height:28px;padding:0 14px;border-radius:999px;font-size:13px;font-weight:600;color:var(--muted);box-shadow:inset 0 0 0 1px var(--line);transition:background-color .3s cubic-bezier(.2,.6,.2,1),color .3s linear,box-shadow .3s linear}
.cl-chip>span{grid-area:1/1;display:inline-flex;align-items:center;gap:8px;opacity:0;transition:opacity .25s linear}
.cl-sp{width:12px;height:12px;box-sizing:border-box;border:2px solid color-mix(in srgb,var(--accent) 30%,transparent);border-top-color:var(--accent);border-radius:50%}
.cl-row[data-s=pending] .cl-name{color:var(--muted)}
.cl-row[data-s=pending] .cl-w,.cl-row[data-s=busy] .cl-b,.cl-row[data-s=done] .cl-d{opacity:1}
.cl-row[data-s=busy] .cl-ck{box-shadow:inset 0 0 0 2px var(--accent)}
.cl-row[data-s=busy] .cl-chip{background:color-mix(in srgb,var(--accent) 12%,var(--card));color:var(--ink);box-shadow:inset 0 0 0 1px var(--accent)}
.cl-row[data-s=busy] .cl-sp{animation:cl-rot .8s linear infinite}
@keyframes cl-rot{to{transform:rotate(360deg)}}
.cl-row[data-s=done] .cl-ck{background:var(--accent);box-shadow:inset 0 0 0 2px var(--accent)}
.cl-row[data-s=done] .cl-ck path{stroke-dashoffset:0}
.cl-row[data-s=done] .cl-chip{background:var(--accent);color:var(--accent-ink);box-shadow:none}
.cl.is-live .cl-run{height:300vh}
.cl.is-live .cl-pin{position:sticky;top:0;min-height:100vh;min-height:100svh}
@media(max-width:767px){.cl-pin{grid-template-columns:minmax(0,1fr);gap:24px}.cl-txt{max-width:none}.cl-card{padding:20px}.cl-row{padding:12px 0}}`,
  html:`<div class="stage"><div class="cl"><div class="cl-run"><div class="cl-pin">
  <div class="cl-txt"><h3>ככה נראה השבוע הראשון שלכם איתנו</h3><p>אתם חותמים ומעבירים מסמכים. את השאר אנחנו עושים, ובכל שלב רואים בדיוק מה הושלם ומה עוד בדרך.</p></div>
  <div class="cl-card">
    <div class="cl-head"><span class="cl-title">הצטרפות של לקוח חדש</span><span class="cl-count">הושלמו <b>5</b> מתוך 5</span></div>
    <div class="cl-bar" aria-hidden="true"><i class="cl-fill"></i></div>
    <ol class="cl-list">
      <li class="cl-row" data-s="done"><span class="cl-ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span class="cl-name">חתימה על הסכם ייצוג</span><span class="cl-chip"><span class="cl-w" aria-hidden="true">ממתין</span><span class="cl-b" aria-hidden="true"><i class="cl-sp"></i>בטיפול</span><span class="cl-d">הושלם</span></span></li>
      <li class="cl-row" data-s="done"><span class="cl-ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span class="cl-name">העברת מסמכי העסק</span><span class="cl-chip"><span class="cl-w" aria-hidden="true">ממתין</span><span class="cl-b" aria-hidden="true"><i class="cl-sp"></i>בטיפול</span><span class="cl-d">הושלם</span></span></li>
      <li class="cl-row" data-s="done"><span class="cl-ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span class="cl-name">פתיחת תיק ברשויות</span><span class="cl-chip"><span class="cl-w" aria-hidden="true">ממתין</span><span class="cl-b" aria-hidden="true"><i class="cl-sp"></i>בטיפול</span><span class="cl-d">הושלם</span></span></li>
      <li class="cl-row" data-s="done"><span class="cl-ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span class="cl-name">חיבור לתוכנת הנהלת החשבונות</span><span class="cl-chip"><span class="cl-w" aria-hidden="true">ממתין</span><span class="cl-b" aria-hidden="true"><i class="cl-sp"></i>בטיפול</span><span class="cl-d">הושלם</span></span></li>
      <li class="cl-row" data-s="done"><span class="cl-ck" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span class="cl-name">פגישת היכרות ראשונה</span><span class="cl-chip"><span class="cl-w" aria-hidden="true">ממתין</span><span class="cl-b" aria-hidden="true"><i class="cl-sp"></i>בטיפול</span><span class="cl-d">הושלם</span></span></li>
    </ol>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP זו רשימה רגילה, וכל השלבים במצב הושלם (במארקאפ)
  const root=document.querySelector(".cl"),run=root.querySelector(".cl-run"),rows=[...root.querySelectorAll(".cl-row")],
    fill=root.querySelector(".cl-fill"),cnt=root.querySelector(".cl-count b");
  const n=rows.length,T=.17,L=.06,fin=T*.65;     // כל שלב תופס T מההתקדמות, הראשון מתחיל ב-L, ו-fin הוא הנקודה שבה הוא מושלם
  const end=L+(n-1)*T+fin;
  // מצב כל שורה נגזר מההתקדמות בלבד, ולכן אותו קוד נכון בגלילה קדימה ואחורה
  const paint=p=>{
    let done=0;
    rows.forEach((r,i)=>{const a=L+i*T,s=p>=a+fin?"done":p>=a?"busy":"pending";if(s==="done")done++;if(r.dataset.s!==s)r.dataset.s=s;});
    cnt.textContent=done;
    gsap.to(fill,{scaleX:Math.min(1,Math.max(0,(p-L)/(end-L))),duration:.35,ease:"power2.out",overwrite:true});
  };
  // בהפחתת תנועה הפונקציה לא רצה, והרשימה נשארת במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    gsap.set(fill,{scaleX:0});paint(0);
    const st=ScrollTrigger.create({trigger:run,start:"top top",end:"bottom bottom",invalidateOnRefresh:true,onUpdate:s=>paint(s.progress)});
    return()=>{st.kill();root.classList.remove("is-live");rows.forEach(r=>{r.dataset.s="done";});cnt.textContent=n;gsap.killTweensOf(fill);gsap.set(fill,{clearProps:"all"});};
  });
})();`
},
{
  id:"g183", cat:"gsap", name:"כרטיס מוצר שנבנה שלב אחר שלב", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"הודעה קטנה יורדת מלמעלה מטושטשת ומתחדדת, ומתחתיה נבנה כרטיס של דוח שבועי בסדר קבוע: מתג נדלק, מספר הפניות רץ עד 38, שבעה עמודים עולים בזה אחר זה והאחרון בצבע המותג, שורת אישור מציירת וי, והכפתור מתחלף מ״שליחה עכשיו״ ל״נשלח״. כל הדוח מצטייר בתוך שש שניות בערך.",
  when:"הצגת תוצאה אחת של מוצר או שירות: דוח, אישור, סיכום, התראה. סקשן הוכחה או ״מה מקבלים״ באתר של כלי, מערכת או שירות דיגיטלי. צריך תוצאה אחת ברורה ולא יותר מחמישה רכיבים בכרטיס. פעם אחת בעמוד.",
  note:"**שחזור.** השראה: כמה סרטוני מוצר בגלריה של prompt-motion.com (21.10.2026), שבהם התראה נופלת ומתחתיה כרטיס נבנה רכיב אחרי רכיב. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** ההודעה חדה, המתג דולק, המונה על 38, כל העמודים מלאים, שורת האישור מוצגת והכפתור במצב ״נשלח״. בלי GSAP ובהפחתת תנועה זה מה שמוצג. **כשהמהלך רץ** ה-JS מאפס הכל, ובכניסה לעמוד (`top 65%`, פעם אחת) ציר זמן אחד בונה את הכרטיס בסדר קבוע: ההודעה יורדת ומתחדדת (`filter: blur`, רק על רכיב קטן וקצר), הכרטיס עולה, המתג נדלק, המונה רץ, העמודים עולים ב-`scaleY` מהבסיס, הווי מצטייר ב-`stroke-dashoffset` והכפתור נלחץ. הכרטיס כולו `aria-hidden`, והמספר 38 כתוב גם בפסקה שלידו, כך שקורא המסך לא מפסיד כלום. **להתאים:** התראה, כותרת הכרטיס, המתג, המונה, העמודים ותווית הכפתור הם התוכן. העמוד האחרון הוא התוצאה, ולכן רק הוא בצבע המותג. **RTL:** הכרטיס בצד ימין של הטקסט, והעמודים מסודרים מימין לשמאל (הימים עוברים בכיוון הקריאה). ב-LTR מחליפים את סדר העמודות ב-`.pc` ואת `--sx`.",
  libs:["gsap","ScrollTrigger"],
  css:`.pc{--sx:-1;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1040px;margin-inline:auto}
.pc-ui{display:grid;gap:14px;justify-self:center;width:min(420px,100%)}
.pc-note{display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--card);border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 40px -26px color-mix(in srgb,var(--ink) 38%,transparent)}
.pc-ava{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--accent);color:var(--accent-ink)}
.pc-ava svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.pc-note b{display:block;font-size:15px}
.pc-note small{font-size:13px;color:var(--muted)}
.pc-card{display:grid;gap:20px;padding:20px;background:var(--card);border:1px solid var(--line);border-radius:20px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.pc-title{font-size:17px;font-weight:700}
.pc-tgl{display:flex;align-items:center;justify-content:space-between;gap:16px;font-size:15px}
.pc-sw{flex:none;display:flex;align-items:center;box-sizing:border-box;width:40px;height:24px;padding:4px;border-radius:999px;background:var(--line);transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.pc-sw i{width:16px;height:16px;border-radius:50%;background:var(--muted);transition:transform .3s cubic-bezier(.2,.6,.2,1),background-color .3s cubic-bezier(.2,.6,.2,1)}
.pc-sw.is-on{background:var(--accent)}
.pc-sw.is-on i{background:var(--accent-ink);transform:translateX(calc(var(--sx) * 16px))}
.pc-stat{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:end;gap:24px}
.pc-num{display:block;font-size:56px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums}
.pc-lab{display:block;margin-top:8px;font-size:14px;color:var(--muted)}
.pc-bars{display:flex;align-items:flex-end;gap:6px;height:72px}
.pc-bars i{flex:1;height:var(--h);border-radius:6px;background:color-mix(in srgb,var(--ink) 16%,var(--card));transform-origin:50% 100%}
.pc-bars i:last-child{background:var(--accent)}
.pc-done{display:flex;align-items:center;gap:12px;font-size:15px}
.pc-ok{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--accent);color:var(--accent-ink)}
.pc-ok svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.pc-ok path{stroke-dasharray:1}
.pc-send{display:grid;place-items:center;min-height:48px;border-radius:14px;background:var(--ink);color:var(--bg);font-size:16px;font-weight:600;transition:background-color .3s cubic-bezier(.2,.6,.2,1),color .3s linear}
.pc-send>span{grid-area:1/1;transition:opacity .25s linear}
.pc-s-a{opacity:0}
.pc-send.is-sent{background:var(--accent);color:var(--accent-ink)}
.pc-send:not(.is-sent) .pc-s-b{opacity:0}
.pc-send:not(.is-sent) .pc-s-a{opacity:1}
.pc-txt{display:grid;gap:14px;max-width:36ch}
.pc-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.pc-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
@media(max-width:767px){.pc{grid-template-columns:minmax(0,1fr)}.pc-txt{max-width:none}.pc-num{font-size:48px}}`,
  html:`<div class="stage"><div class="pc">
  <div class="pc-ui" aria-hidden="true">
    <div class="pc-note"><span class="pc-ava"><svg viewBox="0 0 24 24"><path d="M6 17h12l-1.6-2.4V10.5a4.4 4.4 0 00-8.8 0v4.1zM10 20h4"/></svg></span><span><b>הדוח השבועי שלך מוכן</b><small>עכשיו</small></span></div>
    <div class="pc-card">
      <span class="pc-title">סיכום השבוע</span>
      <span class="pc-tgl"><span>שליחה אוטומטית בימי ראשון</span><span class="pc-sw is-on"><i></i></span></span>
      <div class="pc-stat">
        <span><b class="pc-num">38</b><span class="pc-lab">פניות חדשות</span></span>
        <span class="pc-bars"><i style="--h:44%"></i><i style="--h:62%"></i><i style="--h:50%"></i><i style="--h:76%"></i><i style="--h:56%"></i><i style="--h:68%"></i><i style="--h:100%"></i></span>
      </div>
      <span class="pc-done"><span class="pc-ok"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span><span>הדוח נשלח לשלושה נמענים</span></span>
      <span class="pc-send is-sent"><span class="pc-s-a">שליחה עכשיו</span><span class="pc-s-b">נשלח</span></span>
    </div>
  </div>
  <div class="pc-txt"><h3>הדוח מגיע לבד, בכל יום ראשון</h3><p>בשבוע האחרון נכנסו 38 פניות חדשות. סיכום קצר נשלח לשלושה אנשים בצוות, וכל אחד רואה מיד איפה העסק עומד.</p></div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכרטיס כבר שלם: מתג דולק, מספר סופי, כפתור במצב נשלח (במארקאפ)
  const root=document.querySelector(".pc"),note=root.querySelector(".pc-note"),card=root.querySelector(".pc-card"),
    sw=root.querySelector(".pc-sw"),num=root.querySelector(".pc-num"),bars=[...root.querySelectorAll(".pc-bars i")],
    done=root.querySelector(".pc-done"),tick=done.querySelector("path"),send=root.querySelector(".pc-send");
  const total=parseInt(num.textContent,10)||0;
  const finish=()=>{sw.classList.add("is-on");num.textContent=total;send.classList.add("is-sent");};
  // בהפחתת תנועה הפונקציה לא רצה, והכרטיס נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    sw.classList.remove("is-on");send.classList.remove("is-sent");num.textContent="0";
    gsap.set(note,{autoAlpha:0,y:-28,filter:"blur(14px)"});
    gsap.set(card,{autoAlpha:0,y:24});
    gsap.set(bars,{scaleY:0});
    gsap.set(done,{autoAlpha:0,y:10});
    gsap.set(tick,{strokeDashoffset:1});
    const c={v:0},tl=gsap.timeline({paused:true});
    tl.to(note,{autoAlpha:1,y:0,filter:"blur(0px)",duration:.8,ease:"power3.out"})
      .to(card,{autoAlpha:1,y:0,duration:.6,ease:"power2.out"},"-=.35")
      .call(()=>sw.classList.add("is-on"),null,">+=.2")
      .to(c,{v:total,duration:1,ease:"power2.out",onUpdate:()=>{num.textContent=Math.round(c.v);}},">+=.1")
      .to(bars,{scaleY:1,duration:.5,stagger:.12,ease:"power3.out"},"<.15")
      .to(done,{autoAlpha:1,y:0,duration:.45,ease:"power2.out"},">+=.1")
      .to(tick,{strokeDashoffset:0,duration:.35,ease:"power1.inOut"},"<.15")
      .to(send,{scale:.96,duration:.1,ease:"power1.out"},">+=.35")
      .call(()=>send.classList.add("is-sent"),null,">")
      .to(send,{scale:1,duration:.2,ease:"power1.out"},">");
    const st=ScrollTrigger.create({trigger:root,start:"top 65%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();gsap.set([note,card,bars,done,tick,send],{clearProps:"all"});finish();};
  });
})();`
},
{
  id:"g184", cat:"gsap", name:"מסגרת סימון שננעלת על יעדים", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"חשבונית של ספק על המסך, וארבע פינות סימון שנוחתות בזו אחר זו על שלושה דברים בה: שם הספק, התאריך והסכום לתשלום. בכל נעילה הפריט עף כשבב אל כרטיס בצד, הכרטיס מקבל מסגרת בצבע המותג והערך מופיע בו. שורת סטטוס מעל הכרטיסים אומרת על מה הסימון נעול. רואים את המערכת קוראת, בלי להסביר.",
  when:"הדגמה של זיהוי או חילוץ מידע: קריאת חשבונית, תעודה, טופס, חוזה, כרטיס ביקור, תמונה עם כמה פריטים. סקשן ״איך זה עובד״ באתר של כלי, מערכת או שירות שמוציא נתונים ממסמכים. שלושה עד חמישה יעדים, ולכל אחד ערך קצר שאפשר לקרוא. כשאין מה לחלץ, הסימון הוא קישוט בלבד.",
  note:"**שחזור.** השראה: כמה סרטוני זיהוי בגלריה של prompt-motion.com (21.10.2026), שבהם פינות סימון ננעלות על פריטים ואז הפריטים עוברים לכרטיסים מסודרים. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** שלושת השדות בחשבונית מסומנים והכרטיסים מלאים. בלי GSAP ובהפחתת תנועה זה מה שרואים, וההסבר נמצא בפסקה שליד (מי הספק, מתי, וכמה). אלמנט הסימון עצמו מוסתר ב-CSS ומוצג רק כשה-JS חי. **הפינות:** ארבעה אלמנטים קטנים, לכל אחד שני צדדים בגבול, שזזים ב-`x` וב-`y` בלבד. בכל יעד מחשבים את המלבן שלו מול המסמך ושולחים כל פינה לפינה שלה, ולכן אין שינוי בגודל והקו חד בכל רוחב. נעילה היא קפיצה קטנה של הפינות מ-1.7 ל-1. **הפריטים שעפים:** לכל שדה נוצר שבב מהטקסט שלו, והוא נע ממרכז היעד אל מרכז הערך בכרטיס ונעלם בזמן שהערך נחשף. הכל נמדד ברגע שהסקשן נכנס למסך, ולכן המסלול נכון בכל רוחב, ומי שגולל לפני שהגופן נטען לא מקבל סימון מוזז. **להתאים:** שלושה עד חמישה יעדים, והסדר שלהם הוא סדר הכרטיסים. הערכים בכרטיסים צריכים להיות מה שהמערכת באמת שומרת. **RTL:** הגיאומטריה נמדדת מה-DOM ולכן אין מה להפוך. המסמך והכרטיסים מתחלפים בצדדים לבד לפי כיוון העמוד. בנייד העמודות נערמות והשבבים עפים מטה.",
  libs:["gsap","ScrollTrigger"],
  css:`.sn{position:relative;display:grid;gap:40px;justify-items:center;max-width:920px;margin-inline:auto}
.sn-txt{display:grid;gap:12px;max-width:52ch;text-align:center}
.sn-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.sn-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.sn-row{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:center;gap:clamp(24px,5vw,64px);width:100%}
.sn-doc{position:relative;display:grid;gap:14px;padding:28px;background:var(--card);border:1px solid var(--line);border-radius:12px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.sn-dh{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--line)}
.sn-co{font-size:18px;font-weight:700}
.sn-kind{font-size:13px;color:var(--muted)}
.sn-dt{display:flex;align-items:baseline;gap:16px;font-size:14px;color:var(--muted)}
.sn-t{display:inline-block;border-radius:4px;color:var(--ink);transition:background-color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1)}
.sn-t.is-hit{background:color-mix(in srgb,var(--accent) 14%,transparent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 14%,transparent)}
.sn-lines{display:grid;gap:10px;font-size:14px}
.sn-ln{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px}
.sn-ln span:last-child{color:var(--muted);font-variant-numeric:tabular-nums}
.sn-sum{display:grid;gap:8px;padding-top:14px;border-top:1px solid var(--line);font-size:14px}
.sn-sl{display:flex;justify-content:space-between;gap:16px;color:var(--muted)}
.sn-tot{display:flex;justify-content:space-between;align-items:baseline;gap:16px;font-size:16px;font-weight:700}
.sn-bk{position:absolute;inset:0;pointer-events:none;display:none}
.sn.is-live .sn-bk{display:block}
.sn-bk i{position:absolute;left:0;top:0;width:16px;height:16px;border:0 solid var(--accent)}
.sn-bk i:nth-child(1){border-top-width:3px;border-left-width:3px;border-top-left-radius:4px}
.sn-bk i:nth-child(2){border-top-width:3px;border-right-width:3px;border-top-right-radius:4px}
.sn-bk i:nth-child(3){border-bottom-width:3px;border-left-width:3px;border-bottom-left-radius:4px}
.sn-bk i:nth-child(4){border-bottom-width:3px;border-right-width:3px;border-bottom-right-radius:4px}
.sn-side{display:grid;gap:14px;align-content:center}
.sn-st{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--muted)}
.sn-dot{flex:none;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.sn-card{display:grid;gap:4px;padding:16px 20px;background:var(--card);border:1px solid var(--line);border-radius:14px;transition:border-color .3s cubic-bezier(.2,.6,.2,1)}
.sn-card.is-hit{border-color:var(--accent)}
.sn-lab{font-size:13px;color:var(--muted)}
.sn-val{font-size:18px;font-weight:600;font-variant-numeric:tabular-nums}
.sn-fly{position:absolute;left:0;top:0;z-index:3;padding:4px 10px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-size:14px;font-weight:600;white-space:nowrap;pointer-events:none;visibility:hidden}
@media(max-width:767px){.sn{gap:32px}.sn-row{grid-template-columns:minmax(0,1fr);gap:24px}.sn-doc{padding:20px}}`,
  html:`<div class="stage"><div class="sn">
  <div class="sn-txt"><h3>מצלמים חשבונית, והפרטים נכנסים לבד</h3><p>החשבונית של נגריית אביב מ-14.10.2026, על סך 4,543 ₪, נקראת בלי הקלדה: המערכת מזהה את שם הספק, את התאריך ואת הסכום לתשלום, ושמה כל אחד בכרטיס שלו.</p></div>
  <div class="sn-row">
    <div class="sn-doc" aria-hidden="true">
      <div class="sn-dh"><span class="sn-co"><span class="sn-t is-hit">נגריית אביב בע״מ</span></span><span class="sn-kind">חשבונית מס 20418</span></div>
      <div class="sn-dt"><span>תאריך</span><span class="sn-t is-hit">14.10.2026</span></div>
      <div class="sn-lines">
        <div class="sn-ln"><span>דלתות לארון, 4 יחידות</span><span>3,200</span></div>
        <div class="sn-ln"><span>התקנה במקום</span><span>650</span></div>
      </div>
      <div class="sn-sum">
        <div class="sn-sl"><span>מע״מ 18%</span><span>693</span></div>
        <div class="sn-tot"><span>סה״כ לתשלום</span><span class="sn-t is-hit">4,543 ₪</span></div>
      </div>
      <div class="sn-bk"><i></i><i></i><i></i><i></i></div>
    </div>
    <div class="sn-side" aria-hidden="true">
      <div class="sn-st"><i class="sn-dot"></i><span class="sn-sttx">זוהו שלושה שדות</span></div>
      <div class="sn-card is-hit"><span class="sn-lab">ספק</span><span class="sn-val">נגריית אביב בע״מ</span></div>
      <div class="sn-card is-hit"><span class="sn-lab">תאריך החשבונית</span><span class="sn-val">14.10.2026</span></div>
      <div class="sn-card is-hit"><span class="sn-lab">סכום לתשלום</span><span class="sn-val">4,543 ₪</span></div>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP כל השדות מסומנים והכרטיסים מלאים (במארקאפ)
  const root=document.querySelector(".sn"),doc=root.querySelector(".sn-doc"),bk=root.querySelector(".sn-bk"),
    cs=[...bk.children],ts=[...doc.querySelectorAll(".sn-t")],cards=[...root.querySelectorAll(".sn-card")],
    vals=cards.map(c=>c.querySelector(".sn-val")),sttx=root.querySelector(".sn-sttx");
  const say=["סורק את החשבונית","נעול על שם הספק","נעול על התאריך","נעול על הסכום","זוהו שלושה שדות"];
  const PAD=8,S=16;                          // PAD: הרווח בין המסגרת ליעד. S: גודל פינה
  // מלבן של אלמנט ביחס להורה (בפיקסלים), כדי לשלוח כל פינה לפינה שלה
  const rel=(el,ref)=>{const a=el.getBoundingClientRect(),b=ref.getBoundingClientRect();return{x:a.left-b.left-ref.clientLeft,y:a.top-b.top-ref.clientTop,w:a.width,h:a.height};};
  const corners=(r,p)=>[[r.x-p,r.y-p],[r.x+r.w+p-S,r.y-p],[r.x-p,r.y+r.h+p-S],[r.x+r.w+p-S,r.y+r.h+p-S]];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let tl=null,flies=[];
    root.classList.add("is-live");
    ts.forEach(t=>t.classList.remove("is-hit"));cards.forEach(c=>c.classList.remove("is-hit"));
    gsap.set(vals,{autoAlpha:0});gsap.set(bk,{autoAlpha:0});sttx.textContent=say[0];
    const run=()=>{
      flies=ts.map(t=>{const f=document.createElement("span");f.className="sn-fly";f.setAttribute("aria-hidden","true");f.textContent=t.textContent;root.appendChild(f);return f;});
      const full=rel(doc,doc);full.x=0;full.y=0;
      const c0=corners(full,-12);              // בתחילה המסגרת סוגרת על כל המסמך
      tl=gsap.timeline();
      tl.set(cs,{x:i=>c0[i][0],y:i=>c0[i][1]},0).to(bk,{autoAlpha:1,duration:.3},.1);
      let t=.6;
      ts.forEach((el,i)=>{
        const r=rel(el,doc),c=corners(r,PAD),f=flies[i],fw=f.offsetWidth,fh=f.offsetHeight,a=rel(el,root),b=rel(vals[i],root);
        const ax=a.x+a.w/2-fw/2,ay=a.y+a.h/2-fh/2,bx=b.x+b.w/2-fw/2,by=b.y+b.h/2-fh/2;
        tl.to(cs,{x:j=>c[j][0],y:j=>c[j][1],duration:.6,ease:"power3.inOut"},t)
          .call(()=>{sttx.textContent=say[i+1];},null,t)
          .fromTo(cs,{scale:1.7},{scale:1,duration:.3,ease:"power2.out",immediateRender:false},t+.6)
          .call(()=>el.classList.add("is-hit"),null,t+.6)
          .fromTo(f,{x:ax,y:ay,autoAlpha:1},{x:bx,y:by,duration:.75,ease:"power3.inOut",immediateRender:false},t+.95)
          .to(f,{autoAlpha:0,duration:.2,ease:"none"},t+1.55)
          .to(vals[i],{autoAlpha:1,duration:.3,ease:"power2.out"},t+1.55)
          .call(()=>cards[i].classList.add("is-hit"),null,t+1.5);
        t+=1.6;                               // המסגרת ממשיכה ליעד הבא בזמן שהשבב עדיין בדרך
      });
      tl.to(bk,{autoAlpha:0,duration:.3},t).call(()=>{sttx.textContent=say[4];},null,t);
    };
    const st=ScrollTrigger.create({trigger:root,start:"top 65%",once:true,onEnter:run});
    return()=>{st.kill();if(tl)tl.kill();flies.forEach(f=>f.remove());flies=[];gsap.set([bk,...cs,...vals],{clearProps:"all"});
      ts.forEach(t=>t.classList.add("is-hit"));cards.forEach(c=>c.classList.add("is-hit"));sttx.textContent=say[4];root.classList.remove("is-live");};
  });
})();`
},
{
  id:"g185", cat:"gsap", name:"פריטים נכנסים למעבד ותוצרים יוצאים", tech:"GSAP · Timeline · ScrollTrigger once", status:"מאושר-עין",
  desc:"ארבעה שבבי קבצים (PDF, DOCX, קישור, TXT) מרחפים בפינות כרטיס, ונמשכים בזה אחר זה אל אזור הגרירה המקווקו שבמרכזו. כשהאחרון נכנס האזור נצבע ונעלם, ובמקומו עולה שורת קובץ אחת: פס ההעלאה מתמלא, והתווית מתחלפת מ״מעלה״ ל״הועלה״ עם וי שמצטייר. ארבעה פריטים נכנסים, תוצאה אחת יוצאת.",
  when:"שלב העלאה, קליטה או הרשמה: מסמכים לפתיחת תיק, חומרים לאתר, קבצים לשירות שמעבד אותם. סקשן ״מה קורה כשמעלים״ או ״איך מתחילים״. צריך שלושה עד ארבעה סוגי קבצים אמיתיים ותוצאה אחת ברורה שאומרת שהכל נקלט.",
  note:"**שחזור.** השראה: כמה סרטוני קליטה בגלריה של prompt-motion.com (21.10.2026), שבהם שבבים של קבצים מתכנסים לאזור גרירה והוא מתחלף בשורת קובץ. נבנה מאפס מהצפייה. **המארקאפ הוא מצב הסיום:** שורת הקובץ מלאה, הפס מלא והוי מצויר, ואזור הגרירה והשבבים מוסתרים ב-CSS. בלי GSAP ובהפחתת תנועה רואים את הכרטיס המוגמר, והפסקה שליד אומרת מה בו. **ציר הזמן** (פעם אחת, כשהסקשן נכנס): השבבים מופיעים בפינות, נמשכים למרכז האזור עם הקטנה ב-`power3.in` (תחושת משיכה) ונעלמים בהגיעם, האזור נצבע ונעלם, שורת הקובץ עולה, הפס מתמלא ב-`scaleX` והתווית מתחלפת עם וי ב-`stroke-dashoffset`. המרחקים נמדדים ברגע ההפעלה ולכן נכונים בכל רוחב. שני מצבי הגוף (אזור ושורה) יושבים באותו תא בגריד, כך שגובה הכרטיס לא קופץ. **להתאים:** סוגי הקבצים והשמות הם התוכן, ואפשר שלושה שבבים במקום ארבעה. השבבים שומרים על ארבע פינות, ולכן עם שלושה מוחקים אחד מהם. **RTL:** הפס מתמלא מימין, ב-LTR משנים את `transform-origin` של `.up-fill` ל-`left center`. מסלולי השבבים נמדדים מה-DOM ולכן אין מה להפוך.",
  libs:["gsap","ScrollTrigger"],
  css:`.up{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);align-items:center;gap:clamp(32px,6vw,96px);max-width:1040px;margin-inline:auto}
.up-txt{display:grid;gap:14px;max-width:36ch}
.up-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.up-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.up-demo{position:relative;width:100%;max-width:460px;justify-self:center;padding:72px 0}
.up-chip{position:absolute;z-index:2;display:flex;align-items:center;gap:8px;padding-block:6px;padding-inline:6px 12px;border-radius:12px;background:var(--card);border:1px solid var(--line);box-shadow:0 14px 28px -18px color-mix(in srgb,var(--ink) 45%,transparent);font-size:13px;font-weight:600;white-space:nowrap;visibility:hidden}
.up-chip b{display:grid;place-items:center;min-width:40px;height:24px;padding:0 6px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-size:12px;font-weight:700}
.up-c1{top:0;right:0}
.up-c2{top:0;left:0}
.up-c3{bottom:0;right:0}
.up-c4{bottom:0;left:0}
.up-card{display:grid;gap:16px;padding:20px;background:var(--card);border:1px solid var(--line);border-radius:20px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.up-hd{display:flex;justify-content:space-between;align-items:baseline;gap:16px}
.up-ttl{font-size:17px;font-weight:700}
.up-sub{font-size:13px;color:var(--muted)}
.up-body{display:grid}
.up-zone{grid-area:1/1;display:grid;justify-items:center;align-content:center;gap:12px;min-height:168px;padding:24px;border:2px dashed var(--line);border-radius:16px;text-align:center;color:var(--muted);font-size:15px;opacity:0;visibility:hidden;transition:border-color .3s cubic-bezier(.2,.6,.2,1),background-color .3s cubic-bezier(.2,.6,.2,1)}
.up-zone.is-over{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,var(--card))}
.up-ic{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:color-mix(in srgb,var(--accent) 12%,var(--card));color:var(--ink)}
.up-ic svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.up-file{grid-area:1/1;align-self:center;display:grid;gap:14px;padding:16px;border:1px solid var(--line);border-radius:14px}
.up-fr{display:flex;align-items:center;gap:14px}
.up-fi{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:10px;background:color-mix(in srgb,var(--ink) 8%,var(--card))}
.up-fi svg{width:20px;height:20px;fill:none;stroke:var(--ink);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.up-fn{flex:1;min-width:0;display:grid;gap:4px}
.up-fn b{font-size:15px;font-weight:600}
.up-fn small{font-size:13px;color:var(--muted)}
.up-ss{display:grid;font-size:13px;font-weight:600}
.up-sa,.up-sb{grid-area:1/1;justify-self:end;display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
.up-sa{opacity:0;color:var(--muted)}
.up-ok{flex:none;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--accent)}
.up-ok svg{width:12px;height:12px;fill:none;stroke:var(--accent-ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.up-ok path{stroke-dasharray:1;stroke-dashoffset:0}
.up-bar{height:8px;border-radius:4px;background:var(--line);overflow:hidden}
.up-fill{display:block;height:100%;background:var(--accent);transform-origin:right center}
@media(max-width:767px){.up{grid-template-columns:minmax(0,1fr);gap:32px}.up-txt{max-width:none}.up-demo{padding:64px 0}.up-card{padding:16px}.up-zone{min-height:152px;padding:20px}}`,
  html:`<div class="stage"><div class="up">
  <div class="up-txt"><h3>הלקוח מעלה ארבעה קבצים ומקבל אישור אחד</h3><p>חוזה, תלושי שכר, קישור לתיקיית תמונות והערות בכתב. הכל נכנס לתיק הלקוח במקום אחד, ופס ההעלאה מראה מתי זה הסתיים.</p></div>
  <div class="up-demo" aria-hidden="true">
    <span class="up-chip up-c1"><b>PDF</b>חוזה שכירות</span>
    <span class="up-chip up-c2"><b>DOCX</b>תלושי שכר</span>
    <span class="up-chip up-c3"><b>קישור</b>תיקיית תמונות</span>
    <span class="up-chip up-c4"><b>TXT</b>הערות</span>
    <div class="up-card">
      <div class="up-hd"><span class="up-ttl">תיק לקוח חדש</span><span class="up-sub">נקלט היום</span></div>
      <div class="up-body">
        <div class="up-zone"><span class="up-ic"><svg viewBox="0 0 24 24"><path d="M12 16V5M7 10l5-5 5 5M5 19h14"/></svg></span>גררו לכאן את המסמכים של הלקוח</div>
        <div class="up-file">
          <div class="up-fr"><span class="up-fi"><svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v4h4"/></svg></span><span class="up-fn"><b>מסמכי פתיחת תיק</b><small>4 קבצים, 3.2 MB</small></span><span class="up-ss"><span class="up-sa">מעלה</span><span class="up-sb"><span class="up-ok"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" pathLength="1"/></svg></span>הועלה</span></span></div>
          <div class="up-bar"><i class="up-fill"></i></div>
        </div>
      </div>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP רואים את הכרטיס המוגמר (במארקאפ)
  const root=document.querySelector(".up"),zone=root.querySelector(".up-zone"),file=root.querySelector(".up-file"),
    chips=[...root.querySelectorAll(".up-chip")],fill=root.querySelector(".up-fill"),
    sa=root.querySelector(".up-sa"),sb=root.querySelector(".up-sb"),tick=root.querySelector(".up-ok path");
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let tl=null;
    zone.classList.remove("is-over");
    gsap.set(zone,{autoAlpha:1});gsap.set(file,{autoAlpha:0,y:8});gsap.set(fill,{scaleX:0});
    gsap.set(sa,{opacity:1});gsap.set(sb,{opacity:0});gsap.set(tick,{strokeDashoffset:1});gsap.set(chips,{autoAlpha:0,x:0,y:0,scale:1});
    const run=()=>{
      const z=zone.getBoundingClientRect(),zx=z.left+z.width/2,zy=z.top+z.height/2;   // מרכז אזור הגרירה, נמדד עכשיו
      tl=gsap.timeline();
      chips.forEach((c,i)=>{
        const r=c.getBoundingClientRect(),dx=zx-(r.left+r.width/2),dy=zy-(r.top+r.height/2);
        tl.fromTo(c,{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.45,ease:"power2.out"},i*.1)
          .to(c,{x:dx,y:dy,scale:.35,duration:.8,ease:"power3.in"},.9+i*.12)
          .to(c,{autoAlpha:0,duration:.18,ease:"none"},1.52+i*.12);
      });
      tl.call(()=>zone.classList.add("is-over"),null,1.7)
        .to(zone,{autoAlpha:0,duration:.3,ease:"power1.out"},2.45)
        .to(file,{autoAlpha:1,y:0,duration:.4,ease:"power2.out"},2.5)
        .to(fill,{scaleX:1,duration:1.4,ease:"power1.inOut"},2.9)
        .to(sa,{opacity:0,duration:.2,ease:"none"},4.25)
        .to(sb,{opacity:1,duration:.2,ease:"none"},4.3)
        .to(tick,{strokeDashoffset:0,duration:.35,ease:"power2.out"},4.35);
    };
    const st=ScrollTrigger.create({trigger:root,start:"top 65%",once:true,onEnter:run});
    return()=>{st.kill();if(tl)tl.kill();gsap.set([zone,file,fill,sa,sb,tick,...chips],{clearProps:"all"});zone.classList.remove("is-over");};
  });
})();`
},
{
  id:"g186", cat:"gsap", name:"איור שנבנה צעד אחרי צעד עם מונה", tech:"GSAP · ScrollTrigger scrub · sticky · SVG", status:"מאושר-עין",
  desc:"מטבח באיור איזומטרי נבנה שכבה אחר שכבה בזמן הגלילה: קווי מדידה, ריצוף, ארונות תחתונים עם כיריים, ארונות עליונים עם קולט אדים, ולבסוף אי עם שלוש מנורות. לצד האיור כרטיס שלב עם פס שמתמלא ואחוזים שעולים עד 100, ומתחת שורת עיגולים שנסגרת אחד אחד. בסוף נדלקים ניצוצות קטנים. הגלילה היא שעון ההתקדמות.",
  when:"תהליך של שלושה עד שישה שלבים שבו חפץ אחד מצטבר: מטבח, חדר, תיק, אריזה, תוכנית. סקשן ״איך זה עובד״ באתר של בונה, מעצב, סטודיו או שירות עם מסירה. האיור צריך להיות בנוי משכבות שמתאימות לשלבים. פעם אחת בעמוד, כי הוא תופס כמה מסכי גלילה.",
  note:"**שחזור.** השראה: כמה סרטוני התקדמות בגלריה של prompt-motion.com (21.10.2026), שבהם איור איזומטרי מתמלא בפריטים בזמן שמונה ושלבים עולים. נבנה מאפס מהצפייה. **האיור** הוא SVG אחד שחושב כקוביות איזומטריות (שלוש פאות, 30 מעלות) ומשתמש בצבעי ערכת הנושא בלבד, ולכן הוא מתלבש על כל עור. כל שלב הוא קבוצת `g` משלו (`il-l1` עד `il-l5`), ואחריהן קבוצת הניצוצות. **המארקאפ הוא מצב הסיום:** איור שלם, כל העיגולים סגורים, 100%. בלי GSAP ובהפחתת תנועה רואים אותו, וה-`ol` של השלבים קריא לקורא מסך. **כשהמהלך רץ** הסצנה נעוצה ב-`position:sticky` בתוך אזור גלילה של 380vh (רק עם `is-live`, כדי שבלעדיו לא יהיה רווח ריק). ציר זמן אחד מוצמד לגלילה עם `scrub` של חצי שנייה: כל שכבה נכנסת בנקודה שלה, שתיים ראשונות בהקטנה קלה ושלוש אחרונות בנפילה של 18 יחידות. פונקציה אחת `paint(t)` קובעת מזמן הציר את מצב העיגולים (`todo`, `cur`, `done`), את שם השלב בכרטיס (דרך `data-cur` על השורש ו-CSS), את הפס ואת האחוזים, ולכן היא נכונה גם בגלילה למעלה. **להתאים:** מספר השלבים הוא מספר השכבות, וזמני ההתחלה הם המערך `starts`. כל איור אחר מתאים כל עוד הוא מחולק לקבוצות לפי שלבים. **RTL:** הפס מתמלא מימין, ב-LTR משנים את `transform-origin` של `.il-fill`. העיגולים מסתדרים לפי כיוון העמוד והקו ביניהם משתמש ב-`inset-inline-start`, כך שאין מה להפוך. בנייד הטקסט, האיור והכרטיס נערמים במסך אחד.",
  libs:["gsap","ScrollTrigger"],
  css:`.il{max-width:1040px;margin-inline:auto}
.il-pin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);grid-template-areas:"t s" "c s";align-content:center;align-items:center;column-gap:clamp(32px,6vw,96px);row-gap:24px}
.il-txt{grid-area:t;align-self:end;display:grid;gap:14px;max-width:38ch}
.il-txt h3{margin:0;font-size:clamp(26px,2.6vw,40px);line-height:1.15;text-wrap:balance}
.il-txt p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.il-scene{grid-area:s;display:grid;gap:20px;align-content:center}
.il-svg{display:block;width:100%;height:auto;max-width:560px;margin-inline:auto;overflow:visible}
.il-svg polygon,.il-svg ellipse{stroke:var(--line);stroke-width:1;stroke-linejoin:round}
.il-svg .il-dim{stroke:var(--accent);stroke-width:2;stroke-linecap:round;fill:none}
.il-svg .il-tile{stroke:var(--card);stroke-width:1.5;opacity:.7}
.il-svg .il-seam{stroke:color-mix(in srgb,var(--ink) 30%,var(--card));stroke-width:1.2}
.il-svg .il-plate{fill:color-mix(in srgb,var(--ink) 55%,var(--card));stroke:none}
.il-svg .il-cord{stroke:var(--ink);stroke-width:1.2}
.il-svg .il-cone{fill:var(--ink);stroke:none}
.il-svg .il-glow{fill:color-mix(in srgb,var(--accent) 40%,transparent);stroke:none}
.il-svg .il-burst path{fill:var(--accent);stroke:none}
.il-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr))}
.il-step{position:relative;display:grid;justify-items:center;align-content:start;gap:8px;padding-inline:4px;text-align:center;font-size:12px;line-height:1.3;color:var(--muted);transition:color .3s linear}
.il-step:not(:first-child)::before{content:"";position:absolute;top:13px;inset-inline-start:-50%;width:100%;height:2px;background:var(--line);transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.il-step[data-s=done]+.il-step::before{background:var(--accent)}
.il-n{position:relative;z-index:1;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--card);box-shadow:inset 0 0 0 2px var(--line);color:var(--muted);font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;transition:background-color .3s cubic-bezier(.2,.6,.2,1),box-shadow .3s cubic-bezier(.2,.6,.2,1),color .3s linear}
.il-n>*{grid-area:1/1;transition:opacity .25s linear}
.il-c{width:14px;height:14px;fill:none;stroke:var(--accent-ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0}
.il-step[data-s=cur],.il-step[data-s=done]{color:var(--ink)}
.il-step[data-s=cur] .il-n{box-shadow:inset 0 0 0 2px var(--accent);color:var(--ink)}
.il-step[data-s=done] .il-n{background:var(--accent);box-shadow:none}
.il-step[data-s=done] .il-d{opacity:0}
.il-step[data-s=done] .il-c{opacity:1}
.il-card{grid-area:c;align-self:start;display:grid;gap:14px;padding:20px;background:var(--card);border:1px solid var(--line);border-radius:20px;box-shadow:0 28px 56px -32px color-mix(in srgb,var(--ink) 40%,transparent)}
.il-cap{display:flex;justify-content:space-between;align-items:baseline;gap:16px;font-size:14px;color:var(--muted);font-variant-numeric:tabular-nums}
.il-cap b,.il-pct{color:var(--ink);font-weight:700}
.il-bar{height:8px;border-radius:4px;background:var(--line);overflow:hidden}
.il-fill{display:block;height:100%;background:var(--accent);transform-origin:right center}
.il-say{display:grid}
.il-say>span{grid-area:1/1;display:grid;gap:4px;align-content:start;opacity:0;transition:opacity .3s linear}
.il-say b{font-size:17px;font-weight:700}
.il-say small{font-size:14px;line-height:1.5;color:var(--muted)}
.il[data-cur="1"] .il-say>span:nth-child(1),.il[data-cur="2"] .il-say>span:nth-child(2),.il[data-cur="3"] .il-say>span:nth-child(3),.il[data-cur="4"] .il-say>span:nth-child(4),.il[data-cur="5"] .il-say>span:nth-child(5),.il[data-cur="6"] .il-say>span:nth-child(6){opacity:1}
.il.is-live .il-run{height:380vh}
.il.is-live .il-pin{position:sticky;top:0;min-height:100vh;min-height:100svh}
@media(max-width:767px){.il-pin{grid-template-columns:minmax(0,1fr);grid-template-areas:"t" "s" "c";row-gap:20px}.il-txt{align-self:auto;max-width:none}.il-card{align-self:auto;padding:16px}.il-scene{gap:14px}}`,
  html:`<div class="stage"><div class="il" data-cur="6"><div class="il-run"><div class="il-pin">
  <div class="il-txt"><h3>מטבח חדש בחמישה שלבים</h3><p>מהמדידה ועד התאורה מעל האי, השלבים תמיד בסדר הזה. בזמן שהמטבח מתמלא אתם רואים באיזה שלב אנחנו.</p><span class="sr-only">בסוף התהליך כל חמשת השלבים הושלמו והמטבח מוכן.</span></div>
  <div class="il-scene">
<svg class="il-svg" viewBox="0 0 560 380" aria-hidden="true">
<g class="il-room"><polygon points="264.4,-10.8 108.5,79.2 108.5,198 264.4,108" style="fill:color-mix(in srgb,var(--line) 45%,var(--card))"/><polygon points="264.4,-10.8 451.5,97.2 451.5,216 264.4,108" style="fill:var(--card)"/><polygon points="264.4,108 451.5,216 295.6,306 108.5,198" style="fill:color-mix(in srgb,var(--line) 70%,var(--bg))"/></g>
<g class="il-l il-l1"><line x1="94.5" y1="206.1" x2="281.6" y2="314.1" class="il-dim"/><line x1="100.7" y1="202.5" x2="88.3" y2="209.7" class="il-dim"/><line x1="287.8" y1="310.5" x2="275.3" y2="317.7" class="il-dim"/><line x1="465.5" y1="224.1" x2="309.6" y2="314.1" class="il-dim"/><line x1="459.3" y1="220.5" x2="471.7" y2="227.7" class="il-dim"/><line x1="303.4" y1="310.5" x2="315.9" y2="317.7" class="il-dim"/></g>
<g class="il-l il-l2"><polygon points="264.4,108 451.5,216 295.6,306 108.5,198" style="fill:color-mix(in srgb,var(--accent) 22%,var(--card))"/><line x1="295.6" y1="126" x2="139.7" y2="216" class="il-tile"/><line x1="326.8" y1="144" x2="170.9" y2="234" class="il-tile"/><line x1="357.9" y1="162" x2="202.1" y2="252" class="il-tile"/><line x1="389.1" y1="180" x2="233.2" y2="270" class="il-tile"/><line x1="420.3" y1="198" x2="264.4" y2="288" class="il-tile"/><line x1="233.2" y1="126" x2="420.3" y2="234" class="il-tile"/><line x1="202.1" y1="144" x2="389.1" y2="252" class="il-tile"/><line x1="170.9" y1="162" x2="357.9" y2="270" class="il-tile"/><line x1="139.7" y1="180" x2="326.8" y2="288" class="il-tile"/></g>
<g class="il-l il-l3"><polygon points="222.3,83.7 281.6,117.9 281.6,171.9 222.3,137.7" style="fill:color-mix(in srgb,var(--line) 55%,var(--card))"/><polygon points="328.3,90.9 281.6,117.9 281.6,171.9 328.3,144.9" style="fill:color-mix(in srgb,var(--line) 100%,var(--muted) 0%)"/><polygon points="269.1,56.7 328.3,90.9 281.6,117.9 222.3,83.7" style="fill:var(--card)"/><polygon points="281.6,117.9 340.8,152.1 340.8,206.1 281.6,171.9" style="fill:color-mix(in srgb,var(--line) 55%,var(--card))"/><polygon points="387.6,125.1 340.8,152.1 340.8,206.1 387.6,179.1" style="fill:color-mix(in srgb,var(--line) 100%,var(--muted) 0%)"/><polygon points="328.3,90.9 387.6,125.1 340.8,152.1 281.6,117.9" style="fill:var(--card)"/><polygon points="342.4,153 400,186.3 400,240.3 342.4,207" style="fill:color-mix(in srgb,var(--line) 55%,var(--card))"/><polygon points="446.8,159.3 400,186.3 400,240.3 446.8,213.3" style="fill:color-mix(in srgb,var(--line) 100%,var(--muted) 0%)"/><polygon points="389.1,126 446.8,159.3 400,186.3 342.4,153" style="fill:var(--card)"/><line x1="251.9" y1="150.5" x2="251.9" y2="105.1" class="il-seam"/><line x1="311.2" y1="184.7" x2="311.2" y2="139.3" class="il-seam"/><line x1="371.2" y1="219.3" x2="371.2" y2="174" class="il-seam"/><polygon points="215.5,79 396.3,183.4 396.3,188.5 215.5,84.1" style="fill:color-mix(in srgb,var(--ink) 30%,var(--card))"/><polygon points="446.8,154.3 396.3,183.4 396.3,188.5 446.8,159.3" style="fill:color-mix(in srgb,var(--ink) 40%,var(--card))"/><polygon points="266,49.9 446.8,154.3 396.3,183.4 215.5,79" style="fill:color-mix(in srgb,var(--ink) 14%,var(--card))"/><ellipse cx="337.7" cy="107.5" rx="16.6" ry="9.6" class="il-plate"/><ellipse cx="357.9" cy="119.2" rx="16.6" ry="9.6" class="il-plate"/></g>
<g class="il-l il-l4"><polygon points="245.7,10.8 314.3,50.4 314.3,84.6 245.7,45" style="fill:color-mix(in srgb,var(--line) 55%,var(--card))"/><polygon points="337.7,36.9 314.3,50.4 314.3,84.6 337.7,71.1" style="fill:color-mix(in srgb,var(--line) 100%,var(--muted) 0%)"/><polygon points="269.1,-2.7 337.7,36.9 314.3,50.4 245.7,10.8" style="fill:var(--card)"/><polygon points="365.7,80.1 423.4,113.4 423.4,147.6 365.7,114.3" style="fill:color-mix(in srgb,var(--line) 55%,var(--card))"/><polygon points="446.8,99.9 423.4,113.4 423.4,147.6 446.8,134.1" style="fill:color-mix(in srgb,var(--line) 100%,var(--muted) 0%)"/><polygon points="389.1,66.6 446.8,99.9 423.4,113.4 365.7,80.1" style="fill:var(--card)"/><line x1="280" y1="61.2" x2="280" y2="34.2" class="il-seam"/><line x1="394.6" y1="127.3" x2="394.6" y2="100.3" class="il-seam"/><polygon points="320.5,82.8 361.1,106.2 362.6,72.9 331.4,54.9" style="fill:color-mix(in srgb,var(--ink) 30%,var(--card))"/><polygon points="361.1,106.2 362.6,72.9 379.8,63 384.4,92.7" style="fill:color-mix(in srgb,var(--ink) 42%,var(--card))"/><polygon points="348.6,45 379.8,63 362.6,72.9 331.4,54.9" style="fill:color-mix(in srgb,var(--ink) 20%,var(--card))"/></g>
<g class="il-l il-l5"><polygon points="195.8,147.6 286.2,199.8 286.2,253.8 195.8,201.6" style="fill:color-mix(in srgb,var(--accent) 24%,var(--card))"/><polygon points="322.1,179.1 286.2,199.8 286.2,253.8 322.1,233.1" style="fill:color-mix(in srgb,var(--accent) 38%,var(--line))"/><polygon points="231.7,126.9 322.1,179.1 286.2,199.8 195.8,147.6" style="fill:var(--card)"/><polygon points="189.6,142.9 286.2,198.7 286.2,203.4 189.6,147.6" style="fill:color-mix(in srgb,var(--ink) 30%,var(--card))"/><polygon points="326.8,175.3 286.2,198.7 286.2,203.4 326.8,180" style="fill:color-mix(in srgb,var(--ink) 40%,var(--card))"/><polygon points="230.1,119.5 326.8,175.3 286.2,198.7 189.6,142.9" style="fill:color-mix(in srgb,var(--ink) 14%,var(--card))"/><line x1="231.7" y1="81.9" x2="231.7" y2="108.9" class="il-cord"/><ellipse cx="231.7" cy="132.9" rx="22" ry="13" class="il-glow"/><polygon points="224.7,108.9 238.7,108.9 246.7,126.9 216.7,126.9" class="il-cone"/><line x1="261.3" y1="99" x2="261.3" y2="126" class="il-cord"/><ellipse cx="261.3" cy="150" rx="22" ry="13" class="il-glow"/><polygon points="254.3,126 268.3,126 276.3,144 246.3,144" class="il-cone"/><line x1="290.9" y1="116.1" x2="290.9" y2="143.1" class="il-cord"/><ellipse cx="290.9" cy="167.1" rx="22" ry="13" class="il-glow"/><polygon points="283.9,143.1 297.9,143.1 305.9,161.1 275.9,161.1" class="il-cone"/></g>
<g class="il-burst"><path d="M168,81 Q168,96 183,96 Q168,96 168,111 Q168,96 153,96 Q168,96 168,81Z"/><path d="M214,51 Q214,60 223,60 Q214,60 214,69 Q214,60 205,60 Q214,60 214,51Z"/><path d="M132,133 Q132,142 141,142 Q132,142 132,151 Q132,142 123,142 Q132,142 132,133Z"/><path d="M206,122 Q206,128 212,128 Q206,128 206,134 Q206,128 200,128 Q206,128 206,122Z"/><path d="M150,55 Q150,62 157,62 Q150,62 150,69 Q150,62 143,62 Q150,62 150,55Z"/></g>
</svg>
    <ol class="il-steps" role="list">
      <li class="il-step" data-s="done"><span class="il-n" aria-hidden="true"><span class="il-d">1</span><svg class="il-c" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="il-tx">מדידה</span></li>
      <li class="il-step" data-s="done"><span class="il-n" aria-hidden="true"><span class="il-d">2</span><svg class="il-c" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="il-tx">ריצוף</span></li>
      <li class="il-step" data-s="done"><span class="il-n" aria-hidden="true"><span class="il-d">3</span><svg class="il-c" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="il-tx">ארונות תחתונים</span></li>
      <li class="il-step" data-s="done"><span class="il-n" aria-hidden="true"><span class="il-d">4</span><svg class="il-c" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="il-tx">ארונות עליונים</span></li>
      <li class="il-step" data-s="done"><span class="il-n" aria-hidden="true"><span class="il-d">5</span><svg class="il-c" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></span><span class="il-tx">אי ותאורה</span></li>
    </ol>
  </div>
  <div class="il-card" aria-hidden="true">
    <div class="il-cap"><span>שלב <b class="il-sn">5</b> מתוך 5</span><span class="il-pct">100%</span></div>
    <div class="il-bar"><i class="il-fill"></i></div>
    <div class="il-say">
      <span><b>מודדים את החלל</b><small>מגיעים אליכם הביתה, מודדים כל קיר ומסמנים איפה עוברים מים וחשמל.</small></span>
      <span><b>בוחרים ריצוף</b><small>מניחים את הריצוף ליד צבעי הקירות, ומאשרים לפני שמזמינים.</small></span>
      <span><b>ארונות תחתונים ושיש</b><small>מסדרים את הארונות לפי מה שאתם באמת מבשלים, ומניחים את השיש.</small></span>
      <span><b>ארונות עליונים וקולט אדים</b><small>מוסיפים אחסון עד התקרה, וקולט אדים מעל הכיריים.</small></span>
      <span><b>אי מרכזי ותאורה</b><small>האי מחבר בין הבישול לשולחן, והמנורות תלויות מעליו.</small></span>
      <span><b>המטבח מוכן</b><small>אחרי ההתקנה עוברים יחד על כל פרט, ואם צריך סוגרים רשימת תיקונים.</small></span>
    </div>
  </div>
</div></div></div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP: המטבח המלא, כל השלבים סגורים ו-100% (במארקאפ)
  const root=document.querySelector(".il"),run=root.querySelector(".il-run"),
    layers=[1,2,3,4,5].map(k=>root.querySelector(".il-l"+k)),sparks=[...root.querySelector(".il-burst").children],
    steps=[...root.querySelectorAll(".il-step")],fill=root.querySelector(".il-fill"),pct=root.querySelector(".il-pct"),sn=root.querySelector(".il-sn");
  const n=steps.length,D=9,dur=.9,starts=[.3,1.95,3.6,5.25,6.9],span=starts[n-1]+dur-starts[0];   // זמני ההתחלה של השכבות בציר
  // כל מה שבכרטיס ובעיגולים נגזר מזמן הציר בלבד, ולכן נכון בגלילה קדימה ואחורה
  const paint=t=>{
    let cur=0,done=0;
    steps.forEach((s,i)=>{const v=t>=starts[i]+dur?"done":t>=starts[i]?"cur":"todo";if(v==="done")done++;if(t>=starts[i])cur=i+1;if(s.dataset.s!==v)s.dataset.s=v;});
    const p=Math.min(1,Math.max(0,(t-starts[0])/span));
    root.dataset.cur=done===n?n+1:Math.max(1,cur);
    sn.textContent=Math.min(n,Math.max(1,cur));
    pct.textContent=Math.round(p*100)+"%";
    gsap.set(fill,{scaleX:p});
  };
  // בהפחתת תנועה לא רצים, והאיור נשאר במצב הסיום
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const tl=gsap.timeline({defaults:{ease:"power3.out"},scrollTrigger:{trigger:run,start:"top top",end:"bottom bottom",scrub:.5,invalidateOnRefresh:true}});
    layers.forEach((g,i)=>tl.fromTo(g,{autoAlpha:0,y:i<2?0:-18,scale:i<2?.94:1},{autoAlpha:1,y:0,scale:1,duration:dur},starts[i]));
    sparks.forEach((p,i)=>tl.fromTo(p,{autoAlpha:0,scale:.3},{autoAlpha:1,scale:1,duration:.5,ease:"power2.out"},starts[n-1]+dur+.1+i*.08));
    tl.set({},{},D);                          // מותח את הציר ל-D כדי להשאיר רגע מנוחה בסוף
    tl.eventCallback("onUpdate",()=>paint(tl.time()));
    paint(0);
    return()=>{tl.scrollTrigger.kill();tl.kill();root.classList.remove("is-live");gsap.set([...layers,...sparks,fill],{clearProps:"all"});
      steps.forEach(s=>{s.dataset.s="done";});root.dataset.cur=n+1;sn.textContent=n;pct.textContent="100%";};
  });
})();`
}
];
