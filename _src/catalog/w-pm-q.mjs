// שמונה מהלכי טיפוגרפיה מ-prompt-motion.com, אצווה q (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה, לא אתר גלילה. כל מהלך כאן נבנה מאפס מהצפייה בלבד: בלי הקוד, הפרומפטים, הסרטונים
// או הטקסטים של המקור, והדמו נכתב כאתר עסקי עברי רגיל. הדימויים הם תמונות אמיתיות מהמאגר (assets/media/real ו-dive).
// עברית: אין חיבור בין אותיות, ולכן פיצול לאותיות בטוח כל עוד סימני ניקוד וטעמים נשארים צמודים לאות (פונקציית gr בכל מהלך
// מחברת אותם), ומילים נשארות עטופות ב-nowrap כדי שהשורה תישבר רק בין מילים. כל טקסט שמונפש מופיע גם כ-sr-only לקורא מסך.
// גם בלי GSAP ובהפחתת תנועה העמוד מציג את המצב הסופי והקריא.

export default [
{
  id:"g231", cat:"gsap", name:"מילה גדולה עם הדים שנגררים אחריה", tech:"GSAP · ScrollTrigger velocity · pointer · text-stroke", status:"ממתין",
  desc:"מילה אחת גדולה מצוירת כמה פעמים מאחורי עצמה: חמישה עותקים בקו מתאר בצבע המותג, כל אחד מוסט מעט יותר מהקודם ובהיר פחות. כשהעמוד נכנס למסך העותקים נפתחים מהמילה אחד אחרי השני. כשגוללים מהר או מזיזים את העכבר המילה זזה, והעותקים נגררים אחריה בהשהיה, אחד אחרי השני, ואחרי רגע חוזרים ונשארים כערימה מוסטת מאחוריה. בלי GSAP ובהפחתת תנועה הערימה עומדת במקומה.",
  when:"כותרת הירו או פתיח של עמוד שכולו מילה אחת קצרה וחזקה, באתר עם אופי נועז: סטודיו, מותג צעיר, אירוע או קולקציה. מילה של עד שש אותיות, פעם אחת בעמוד. כשצריך לקרוא משפט שלם ההדים רק מפריעים.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם מילה אחת ענקית מצוירת שוב ושוב מאחורי עצמה, בעותקים בקו מתאר ובהיסטים קטנים. נבנה מאפס מהצפייה. **המארקאפ:** ה-h2 מחזיק טקסט `sr-only` עם המילה ועטיפה `aria-hidden` עם שישה עותקים שלה: חמישה הדים (`.ge-e`, ולכל אחד `--k` מ-1 עד 5) ומילה מלאה אחת (`.ge-m`) שיושבת אחרונה ב-DOM, כדי שתצויר מעליהם. ההדים הם `-webkit-text-stroke` בלי מילוי. המצב הסופי הוא CSS בלבד: היסט של `--k` כפול `--dx` ו-`--dy` (באורך `em`, ולכן גדל עם המילה; `--dx` מוגבל ל-1.15% מרוחב המסך כדי שההדים לא ייחתכו בשולי הטלפון) ושקיפות שיורדת עם `--k`. **כשהמהלך רץ** (`.is-live`) ה-CSS מוותר על ההיסט וה-JS כותב `transform` ישירות. חמישה עותקים בכל פריים לא צריכים את GSAP set. הלולאה היא `gsap.ticker` שפועל רק כשיש תנועה ונעצר כשהכול התייצב. **שלושה כוחות מזיזים את המילה:** (1) מצביע: המילה נמשכת עד כ-15% מגודל האות לכיוון העכבר, ביחס למרכז הסקשן ולא למרכז המילה, כדי שלא תיווצר לולאת משוב. (2) מהירות גלילה: `ScrollTrigger.getVelocity()` מתורגם להיסט אנכי שדועך ב-12% בכל פריים. (3) כניסה: כל הד נפתח מהמילה בעיכוב משלו (`power3.out`, ‏1.1 שניות). **ההדים נגררים בשרשרת:** הד 1 עוקב אחרי המילה, הד 2 אחרי הד 1 וכן הלאה, וכל חוליה עם מקדם השהיה קטן מהקודמת, ולכן ככל שההד רחוק יותר הוא מפגר יותר. **RTL:** ההדים נערמים ימינה ולמעלה, כלומר מאחורי כיוון הקריאה. לאתר LTR מחליפים את הסימן של `--dx` (כבר מוגדר ב-`:dir(ltr)`, וה-JS קורא את `direction` בעצמו). **לשימוש:** מילה אחת של עד שש אותיות, צבע ההדים הוא `--accent`, ועובי הקו `max(1.5px, .01em)`. בטלפון אין מצביע והגלילה היא שמניעה את ההדים.",
  libs:["gsap","ScrollTrigger"],
  css:`.ge{max-width:1100px;margin-inline:auto;display:grid;gap:32px}
.ge .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ge-h{margin:0;font-size:clamp(112px,26vw,360px);font-weight:700;line-height:.8;letter-spacing:-.02em}
.ge-stack{position:relative;display:inline-block;--dx:min(.05em,1.15vw);--dy:-.045em}
.ge-stack:dir(ltr){--dx:max(-.05em,-1.15vw)}
.ge-e,.ge-m{display:block;white-space:nowrap}
/* המנוחה: ערימת הדים מוסטת, בלי JS */
.ge-e{position:absolute;inset:0;color:transparent;-webkit-text-stroke:max(1.5px,.01em) var(--accent);transform:translate(calc(var(--k) * var(--dx)),calc(var(--k) * var(--dy)));opacity:calc(1 - var(--k) * .17);pointer-events:none;user-select:none}
.ge-m{position:relative;color:var(--ink)}
.ge-body{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;max-width:640px}
.ge-body p{margin:0;flex:1 1 320px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ge-cta{display:inline-flex;align-items:center;min-height:48px;padding:0 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
/* המהלך רץ: ה-JS קובע את ההיסטים */
.ge.is-live .ge-e{transform:none;opacity:0;will-change:transform}
.ge.is-live .ge-m{will-change:transform}`,
  html:`<div class="stage"><section class="ge">
  <h2 class="ge-h"><span class="sr-only">מרחב</span><span class="ge-stack" aria-hidden="true"><span class="ge-e" style="--k:5">מרחב</span><span class="ge-e" style="--k:4">מרחב</span><span class="ge-e" style="--k:3">מרחב</span><span class="ge-e" style="--k:2">מרחב</span><span class="ge-e" style="--k:1">מרחב</span><span class="ge-m">מרחב</span></span></h2>
  <div class="ge-body">
    <p>סטודיו לתכנון ועיצוב פנים. מלווים דירות, משרדים וחנויות מהסקיצה הראשונה ועד שהמפתחות עוברים ידיים.</p>
    <a class="ge-cta" href="#">לקביעת פגישת היכרות</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP נשארת ערימת ההדים הסטטית
  const root=document.querySelector(".ge"),main=root.querySelector(".ge-m"),E=[...root.querySelectorAll(".ge-e")].reverse();   // E[0] הוא ההד הקרוב ביותר
  // בהפחתת תנועה הפונקציה לא רצה, וההדים נשארים במקומם
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-live");
    const N=E.length,sgn=getComputedStyle(root).direction==="rtl"?1:-1;
    const rest=E.map((e,k)=>1-(k+1)*.17);                       // השקיפות במנוחה, כמו ב-CSS
    const sp=E.map(()=>({v:0}));                                 // כמה כל הד כבר נפתח מהמילה (0 עד 1)
    const m={x:0,y:0},p=E.map(()=>({x:0,y:0}));                  // מיקום המילה, ומיקום כל חוליה בשרשרת
    let fs=200,dxp=10,px=0,py=0,sy=0,on=false,entered=false;
    const measure=()=>{fs=parseFloat(getComputedStyle(main).fontSize)||200;dxp=Math.min(.05*fs,.0115*innerWidth);};   // כמו --dx ב-CSS: ההדים לא חורגים מהשוליים בטלפון
    const draw=()=>{
      main.style.transform="translate3d("+m.x+"px,"+m.y+"px,0)";
      for(let k=0;k<N;k++){
        const a=sp[k].v;
        E[k].style.transform="translate3d("+(p[k].x+sgn*(k+1)*dxp*a)+"px,"+(p[k].y-(k+1)*.045*fs*a)+"px,0)";
        E[k].style.opacity=rest[k]*a;
      }
    };
    const tick=()=>{
      sy*=.88;
      const tx=px,ty=py+sy;
      m.x+=(tx-m.x)*.16;m.y+=(ty-m.y)*.16;
      let prev=m,energy=Math.abs(tx-m.x)+Math.abs(ty-m.y);
      for(let k=0;k<N;k++){                                      // כל חוליה רודפת אחרי הקודמת, ופחות מהקודמת
        const f=.24-k*.035;
        p[k].x+=(prev.x-p[k].x)*f;p[k].y+=(prev.y-p[k].y)*f;
        energy+=Math.abs(prev.x-p[k].x)+Math.abs(prev.y-p[k].y);prev=p[k];
      }
      draw();
      if(energy<.05&&Math.abs(sy)<.05&&sp.every(o=>o.v===1))stop();
    };
    const go=()=>{if(!on){on=true;gsap.ticker.add(tick);}};
    const stop=()=>{if(on){on=false;gsap.ticker.remove(tick);}};
    const enter=()=>{
      if(entered)return;entered=true;go();
      sp.forEach((o,i)=>gsap.to(o,{v:1,duration:1.1,delay:.12+i*.09,ease:"power3.out"}));
    };
    const clamp=gsap.utils.clamp;
    const st=ScrollTrigger.create({trigger:root,start:"top 85%",end:"bottom top",onEnter:enter,onUpdate:s=>{   // מהירות הגלילה מושכת את המילה, וההדים נגררים אחריה
      sy=clamp(-fs*.3,fs*.3,s.getVelocity()*fs*.00006);go();
    }});
    const onMove=e=>{
      if(e.pointerType==="touch")return;
      const r=root.getBoundingClientRect();
      px=clamp(-1,1,(e.clientX-(r.left+r.width/2))/(innerWidth/2))*fs*.15;
      py=clamp(-1,1,(e.clientY-(r.top+r.height/2))/(innerHeight/2))*fs*.08;go();
    };
    const onLeave=()=>{px=py=0;go();};
    root.addEventListener("pointermove",onMove);root.addEventListener("pointerleave",onLeave);
    ScrollTrigger.addEventListener("refresh",measure);
    measure();draw();
    return()=>{
      stop();st.kill();sp.forEach(o=>gsap.killTweensOf(o));
      root.removeEventListener("pointermove",onMove);root.removeEventListener("pointerleave",onLeave);
      ScrollTrigger.removeEventListener("refresh",measure);
      root.classList.remove("is-live");main.style.transform="";E.forEach(e=>{e.style.transform="";e.style.opacity="";});
    };
  });
})();`
},
{
  id:"g232", cat:"gsap", name:"אותיות שנוחתות במתיחה ובמעיכה", tech:"GSAP · ScrollTrigger once · פיצול לאותיות בלי SplitText", status:"ממתין",
  desc:"כותרת נבנית אות אחרי אות, לפי סדר הקריאה. כל אות יורדת מלמעלה ארוכה וצרה, עם צל בצבע המותג שנגרר מעליה, נמעכת לרגע כשהיא פוגעת בקו הבסיס, קופצת מעט למעלה ומתיישבת בגודל הרגיל. הקפיצה והמעיכה בנויות משלוש תנועות עוצמה רגילות בזו אחר זו, בלי עקומות קפיץ. בלי GSAP ובהפחתת תנועה הכותרת מוצגת סגורה.",
  when:"כותרת הירו קצרה, עד עשרים וארבעה תווים בשורה, בעמוד של מותג עם אופי שובב או חזק: מטבחים, קייטרינג, מותג לילדים, חדר כושר. פעם אחת בעמוד, בכותרת הראשית בלבד.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם אותיות של כותרת נכנסות מעוותות, ארוכות או רחבות מדי, וחוזרות לפרופורציה שלהן. נבנה מאפס מהצפייה. **הפיצול בלי SplitText:** פונקציה קטנה (`gr`) מפרקת את הטקסט לאותיות וחוברת אליהן כל סימן ניקוד או טעם (תווים 1425 עד 1479), כך שאות עם ניקוד נשארת יחידה אחת. כל מילה עטופה ב-`.gk-w` עם `nowrap`, והאותיות הן `.gk-c` מסוג `inline-block`, כדי שהשורה תישבר רק בין מילים. אסור לפצל כך כתב שמתחבר (ערבית). **הטקסט לקורא מסך:** ה-h2 מחזיק עותק `sr-only`, והטקסט המפוצל יושב בעטיפה `aria-hidden`. **הצל** הוא `::after` על כל אות עם `content:attr(data-c)` ושני משתנים (`--gh` שקיפות, `--gy` הזזה אנכית) ש-GSAP מנפיש. **התנועה לכל אות, בסדר זה:** נפילה (`power2.in`, ‏.28 שניות) שבה האות מתכווצת מרוחב 1.3 וגובה .6 אחרי שהייתה גבוהה וצרה; קפיצה (`power2.out`, ‏.2) לגובה 1.12; התיישבות (`power2.inOut`, ‏.26). מקור הטרנספורם הוא קו הבסיס (`50% 100%`) כדי שהמעיכה תהיה על הקו. ההשהיה בין אותיות היא .05 שניות. **למה לא עקומת קפיץ:** `back`, ‏`elastic` ו-`bounce` אסורים בתורה, ושלוש תנועות עוצמה רגילות נותנות את אותו קצב. **ההפעלה:** פעם אחת בכניסה למסך (`once`). עד אז האותיות מוסתרות, והכותרת מופיעה לקורא מסך מה-sr-only. **RTL:** האות הראשונה היא הימנית, כי הסדר הוא סדר ה-DOM. באתר LTR אין מה להחליף.",
  libs:["gsap","ScrollTrigger"],
  css:`.gk{max-width:1100px;margin-inline:auto;display:grid;gap:32px;justify-items:start}
.gk .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.gk-h{margin:0;font-size:clamp(48px,11vw,150px);font-weight:700;line-height:1.08;letter-spacing:-.02em;text-wrap:balance}
.gk-w{display:inline-block;white-space:nowrap}
.gk-c{position:relative;display:inline-block;transform-origin:50% 100%;will-change:transform}
.gk-c::after{content:attr(data-c);position:absolute;inset:0;color:var(--accent);opacity:var(--gh,0);transform:translateY(calc(var(--gy,0) * 1em));pointer-events:none}
.gk-body{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;max-width:640px}
.gk-body p{margin:0;flex:1 1 320px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.gk-cta{display:inline-flex;align-items:center;min-height:48px;padding:0 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}`,
  html:`<div class="stage"><section class="gk">
  <h2 class="gk-h"><span class="sr-only">מטבח שנעים להיות בו</span><span class="gk-vis" aria-hidden="true">מטבח שנעים להיות בו</span></h2>
  <div class="gk-body">
    <p>תכנון ובנייה של מטבחים בהתאמה אישית, עם ליווי צמוד מהמדידה בבית ועד ההתקנה האחרונה.</p>
    <a class="gk-cta" href="#">לתיאום פגישת תכנון</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הכותרת מוצגת סגורה
  const root=document.querySelector(".gk"),vis=root.querySelector(".gk-vis");
  // ניקוד וטעמים (1425 עד 1479) נשארים צמודים לאות שלפניהם. עברית לא מתחברת, ולכן פיצול לאותיות בטוח
  const isMark=ch=>{const c=ch.charCodeAt(0);return c>=1425&&c<=1479;};
  const gr=s=>{const o=[];for(const ch of s){if(o.length&&isMark(ch))o[o.length-1]+=ch;else o.push(ch);}return o;};
  // בהפחתת תנועה הפונקציה לא רצה, והכותרת נשארת כמו שהיא
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const orig=vis.textContent;vis.textContent="";
    const L=[],words=orig.split(" ");
    words.forEach((w,wi)=>{
      const ws=document.createElement("span");ws.className="gk-w";
      gr(w).forEach(g=>{const c=document.createElement("span");c.className="gk-c";c.textContent=g;c.setAttribute("data-c",g);ws.appendChild(c);L.push(c);});
      vis.appendChild(ws);if(wi<words.length-1)vis.appendChild(document.createTextNode(" "));
    });
    gsap.set(L,{yPercent:-130,scaleY:1.9,scaleX:.6,opacity:0,"--gh":.55,"--gy":-.55});
    const tl=gsap.timeline({paused:true});
    L.forEach((c,i)=>{
      const t=i*.05;
      tl.to(c,{yPercent:0,scaleY:.6,scaleX:1.3,duration:.28,ease:"power2.in"},t)             // נפילה: נמתחת ואז נמעכת
        .to(c,{opacity:1,duration:.08,ease:"none"},t)
        .to(c,{"--gh":0,"--gy":0,duration:.28,ease:"power1.in"},t)                              // הצל נבלע באות
        .to(c,{yPercent:-9,scaleY:1.12,scaleX:.94,duration:.2,ease:"power2.out"},t+.28)         // קפיצה קטנה
        .to(c,{yPercent:0,scaleY:1,scaleX:1,duration:.26,ease:"power2.inOut"},t+.48);           // התיישבות
    });
    const st=ScrollTrigger.create({trigger:vis,start:"top 85%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();vis.textContent=orig;};
  });
})();`
},
{
  id:"g233", cat:"gsap", name:"פרוסות של מילה שקופצות הצידה וחוזרות למקום", tech:"GSAP · ScrollTrigger once · clip-path · background-clip:text", status:"ממתין",
  desc:"מילה גדולה שממולאת בתמונה נחתכת לשבע פרוסות אופקיות. כשהיא נכנסת למסך הפרוסות קופצות הצידה בצעדים חדים, בכיוונים מתחלפים, ופסים דקים בצבע המותג מחליקים עליהן. אחר כך כל הפרוסות נשמטות חזרה ליישור והמילה נשארת שלמה. אותו דבר קורה שוב בכל ריחוף בעכבר. בלי GSAP ובהפחתת תנועה המילה מוצגת שלמה.",
  when:"מילה אחת שמסמלת את הרגע שבו העמוד נפתח, באתר של עסק שרוצה חדות ותנועה: הפלגות, מוזיקה, אירועים, מותג לצעירים. התמונה שממלאת את המילה חייבת להיות צבעונית וברורה, והמילה עבה מספיק כדי שהתמונה תיראה בתוכה.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם אות או מילה נחתכות לפרוסות שקופצות הצידה וחוזרות ליישור, באחד מהם כשהמילה ממולאת בתמונה. נבנה מאפס מהצפייה. **המארקאפ:** ה-h2 מחזיק `sr-only` עם המילה, ועטיפה `aria-hidden` (`.gs-stack`) שמכילה את המילה השלמה (`.gs-w`). **מילוי בתמונה:** `background:url(...) 50% 60% / cover` עם `background-clip:text` ו-`-webkit-text-fill-color:transparent`. **הפרוסות:** כשהמהלך רץ ה-JS מוסיף שבעה עותקים של המילה (`.gs-b`), כל אחד `position:absolute; inset:0` בדיוק על המילה, עם אותו רקע, ו-`clip-path: inset(i/7 0 (6-i)/7 0)`. מכיוון שלכולם אותה תיבה, התמונה ממשיכה ברצף ביניהם. **הרצף:** המילה השלמה נעלמת, והפרוסות מופיעות עם `xPercent` שנקבע בשלוש קפיצות קשיחות (‏`set` בזמנים .0, ‏.1, ‏.2, בין 7 ל-26 אחוז מרוחב המילה, בסימנים מתחלפים בין פרוסה לפרוסה), ואז כל פרוסה חוזרת ל-0 ב-`power4.out` (‏.3 שניות, ‏.022 בין פרוסות). בסוף המילה השלמה חוזרת והפרוסות מוסתרות. **החלפה בסוף:** המעבר לעותק השלם חשוב, כי קצוות חיתוך על פיקסלים חצויים משאירים קווי שיער בין פרוסות. **שלושה פסים דקים** (`.gs-bar`, גובה 3px, `--accent`) נכנסים בהחלקה ודוהים, ואין הבהוב בשום שלב. **הפעלה:** פעם אחת בכניסה למסך ובכל `pointerenter` של עכבר (לא של מגע). עד הכניסה המילה מוסתרת, והפרוסות הן שבונות אותה. **RTL:** הכיוון של הקפיצות אקראי ואין מה להחליף. **התמונה:** `assets/media/real/s08/hero.webp`; לתמונה כהה מאוד, האותיות נבלעות בעור כהה.",
  libs:["gsap","ScrollTrigger"],
  css:`.gs{max-width:1100px;margin-inline:auto;display:grid;gap:32px;justify-items:start}
.gs .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.gs-h{margin:0;font-weight:700}
.gs-stack{position:relative;display:inline-block;font-size:clamp(150px,30vw,420px);line-height:.85;letter-spacing:-.02em}
.stage:has(.gs){overflow-x:clip}   /* הפרוסות קופצות הצידה: חותכים בקצה המסך במקום ליצור גלילה אופקית (חובה ב-LTR) */
/* המילה וכל פרוסה: אותה תיבה ואותו רקע, כדי שהתמונה תמשיך ברצף */
.gs-w,.gs-b{display:block;white-space:nowrap;color:var(--ink);-webkit-text-fill-color:transparent;background:url(../assets/media/real/s08/hero.webp) 50% 60% / cover;-webkit-background-clip:text;background-clip:text}
.gs-b{position:absolute;inset:0;visibility:hidden;will-change:transform}
.gs-bar{position:absolute;height:3px;border-radius:2px;background:var(--accent);opacity:0;pointer-events:none}
.gs-body{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;max-width:640px}
.gs-body p{margin:0;flex:1 1 320px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.gs-cta{display:inline-flex;align-items:center;min-height:48px;padding:0 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}`,
  html:`<div class="stage"><section class="gs">
  <h2 class="gs-h"><span class="sr-only">אופק</span><span class="gs-stack" aria-hidden="true"><span class="gs-w">אופק</span></span></h2>
  <div class="gs-body">
    <p>הפלגות פרטיות על יאכטה לשישה אנשים, עם סקיפר, ארוחה על הסיפון ושקיעה שאף אחד לא ממהר ממנה.</p>
    <a class="gs-cta" href="#">לבדיקת תאריכים פנויים</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המילה מוצגת שלמה
  const root=document.querySelector(".gs"),stack=root.querySelector(".gs-stack"),base=stack.querySelector(".gs-w");
  // בהפחתת תנועה הפונקציה לא רצה, והמילה נשארת שלמה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const N=7,txt=base.textContent,bands=[],bars=[],R=gsap.utils.random;
    for(let i=0;i<N;i++){                                         // שבע פרוסות: אותו טקסט, אותה תיבה, חיתוך אחר
      const b=document.createElement("span");b.className="gs-b";b.setAttribute("aria-hidden","true");b.textContent=txt;
      b.style.clipPath="inset("+(i*100/N)+"% 0 "+((N-1-i)*100/N)+"% 0)";stack.appendChild(b);bands.push(b);
    }
    for(let i=0;i<3;i++){
      const r=document.createElement("span");r.className="gs-bar";r.setAttribute("aria-hidden","true");
      r.style.top=R(22,78,1)+"%";r.style.width=R(22,40,1)+"%";r.style.insetInlineStart=R(0,60,1)+"%";stack.appendChild(r);bars.push(r);
    }
    let tl=null;
    const run=()=>{
      if(tl&&tl.isActive())return;
      if(tl)tl.kill();
      tl=gsap.timeline({onComplete:()=>{gsap.set(base,{opacity:1});gsap.set(bands,{visibility:"hidden",xPercent:0});}});
      tl.set(base,{opacity:0},0).set(bands,{visibility:"visible"},0);
      bands.forEach((b,i)=>{
        const s=i%2?1:-1;
        for(let j=0;j<3;j++)tl.set(b,{xPercent:s*(j%2?-1:1)*R(7,26,1)},j*.1+i*.014);   // שלוש קפיצות קשיחות הצידה
        tl.to(b,{xPercent:0,duration:.3,ease:"power4.out"},.42+i*.022);                    // ושמיטה חזרה ליישור
      });
      bars.forEach((r,j)=>{
        tl.fromTo(r,{xPercent:R(-140,140,1),opacity:0},{xPercent:0,opacity:.9,duration:.16,ease:"power2.out"},.04+j*.1)
          .to(r,{opacity:0,duration:.3,ease:"none"},.55+j*.05);
      });
      tl.set(base,{opacity:1},.95).set(bands,{visibility:"hidden"},.95);                   // הפרוסות מוחלפות במילה השלמה, בלי קווי שיער
    };
    gsap.set(base,{opacity:0});                                    // עד הכניסה הפרוסות הן שבונות את המילה
    const st=ScrollTrigger.create({trigger:stack,start:"top 85%",once:true,onEnter:run});
    const over=e=>{if(e.pointerType==="mouse")run();};
    stack.addEventListener("pointerenter",over);
    return()=>{
      st.kill();if(tl)tl.kill();stack.removeEventListener("pointerenter",over);
      bands.concat(bars).forEach(n=>n.remove());gsap.set(base,{clearProps:"opacity"});
    };
  });
})();`
},
{
  id:"g234", cat:"gsap", name:"אותיות שנוחתות על קווי הנחיה", tech:"GSAP · ScrollTrigger once · פיצול לאותיות", status:"ממתין",
  desc:"ארבעה קווי הנחיה אופקיים נמתחים לרוחב הסקשן, מהצד שבו מתחילה הקריאה: קו עליון לאותיות הגבוהות, קו לגובה האות, קו בסיס וקו תחתון לאותיות שיורדות. אחר כך אותיות הכותרת יורדות מלמעלה אחת אחרי השנייה, מסתובבות מעט ונוחתות על קו הבסיס, והקו נדלק בצבע המותג כשהמילה שלמה. בלי GSAP ובהפחתת תנועה המילה מוצגת עם הקווים הדהויים.",
  when:"סקשן שמציג מלאכה שקשורה לאותיות: קליגרפיה, מיתוג, הוצאה לאור, עיצוב גרפי, בית דפוס. מילה אחת גדולה, פעם אחת בעמוד, וכדאי שיהיו בה אות גבוהה (כמו ל) ואות יורדת (כמו ק), כדי שהקווים יסבירו משהו.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם קווי הנחיה טיפוגרפיים נמתחים קודם, ואז אותיות נוחתות עליהם ובונות את המילה. נבנה מאפס מהצפייה. **המארקאפ:** אזור (`.gr-fig`) בגודל גופן אחד, ובתוכו ה-h2 עם `line-height:1`, ארבעה קווים (`.gr-ln`) וארבע תוויות (`.gr-lb`). **מיקום הקווים נמדד, לא מנוחש:** `top` של כל קו הוא `--y` באורך `em` מראש התיבה. התוויות הן בגופן קטן משלהן, ולכן הן נמדדות מגודל הגופן של האזור (`--fs`) ולא מ-`em` שלהן. ל-Google Sans בעברית, בתיבה של שורה אחת: גובה אות גבוהה .135, גובה אות רגילה .28, קו בסיס .77, קו תחתון .945. הערכים נמדדו עם `measureText` ועם בדיקת baseline בדפדפן. בגופן אחר מודדים מחדש ומחליפים את ארבעת הערכים. **הפיצול:** `gr` מפרקת לאותיות וחוברת סימני ניקוד וטעמים לאות שלפניהם (ללא `SplitText`). האות היא `inline-block` עם מקור טרנספורם בקו הבסיס. הטקסט לקורא מסך הוא `sr-only` בתוך ה-h2, והאותיות בעטיפה `aria-hidden`. **הרצף (ציר זמן אחד):** הקווים נמתחים (‏`scaleX` מ-0 ל-1, ‏`power3.inOut`, ‏.8 שניות, ‏.12 בין קווים) מהצד שבו מתחילה הקריאה, התוויות מופיעות, האותיות יורדות (‏`yPercent` מ-150- עם סיבוב אקראי עד 18 מעלות, ‏`power4.out`, ‏.75 שניות, ‏.09 בין אותיות), ובסוף קו הבסיס מתחזק מ-35% ל-100% בצבע `--accent`. **RTL:** מקור הקווים נקרא מ-`direction`, והם נמתחים מימין. באתר LTR הקוד מתהפך לבד, והתוויות עוברות לצד השני (`inset-inline-end`). **בטלפון** התוויות מוסתרות (הקווים צפופים מדי בשבילן) והקווים נשארים, והמילה שומרת על יחס `em`.",
  libs:["gsap","ScrollTrigger"],
  css:`.gr{max-width:1100px;margin-inline:auto;display:grid;gap:32px;justify-items:stretch}
.gr .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.gr-fig{--fs:clamp(72px,19vw,260px);position:relative;font-size:var(--fs);line-height:1}
.gr-h{margin:0;font-size:1em;font-weight:700;line-height:1}
.gr-c{display:inline-block;transform-origin:50% 100%}
/* ארבעה קווים, כל אחד במקומו הנמדד בגופן (em מראש תיבת השורה) */
.gr-ln{position:absolute;inset-inline:0;top:calc(var(--y) * 1em);height:1px;background:color-mix(in srgb,var(--ink) 24%,transparent);pointer-events:none}
.gr-ln.is-base{height:2px;background:var(--accent)}
.gr-lb{position:absolute;inset-inline-end:0;top:calc(var(--y) * var(--fs));transform:translateY(calc(-100% - 4px));font-size:13px;line-height:1;color:var(--muted);white-space:nowrap;pointer-events:none}
.gr-body{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;max-width:640px}
.gr-body p{margin:0;flex:1 1 320px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
@media(max-width:767px){.gr-lb{display:none}}`,
  html:`<div class="stage"><section class="gr">
  <div class="gr-fig">
    <span class="gr-ln" style="--y:.135" aria-hidden="true"></span><span class="gr-lb" style="--y:.135" aria-hidden="true">קו עליון</span>
    <span class="gr-ln" style="--y:.28" aria-hidden="true"></span><span class="gr-lb" style="--y:.28" aria-hidden="true">גובה האות</span>
    <span class="gr-ln is-base" style="--y:.77" aria-hidden="true"></span><span class="gr-lb" style="--y:.77" aria-hidden="true">קו בסיס</span>
    <span class="gr-ln" style="--y:.945" aria-hidden="true"></span><span class="gr-lb" style="--y:.945" aria-hidden="true">קו תחתון</span>
    <h2 class="gr-h"><span class="sr-only">קליגרפיה</span><span class="gr-vis" aria-hidden="true">קליגרפיה</span></h2>
  </div>
  <div class="gr-body">
    <p>סדנאות קליגרפיה עברית בסטודיו קטן בצפון תל אביב, בקבוצות של שמונה משתתפים. כל מפגש נפתח בחימום של קווים ואותיות בסיסיות.</p>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המילה מוצגת עם הקווים הדהויים
  const root=document.querySelector(".gr"),vis=root.querySelector(".gr-vis"),lines=[...root.querySelectorAll(".gr-ln")],labels=[...root.querySelectorAll(".gr-lb")],baseLine=root.querySelector(".gr-ln.is-base");
  const isMark=ch=>{const c=ch.charCodeAt(0);return c>=1425&&c<=1479;};      // ניקוד וטעמים נשארים צמודים לאות
  const gr=s=>{const o=[];for(const ch of s){if(o.length&&isMark(ch))o[o.length-1]+=ch;else o.push(ch);}return o;};
  // בהפחתת תנועה הפונקציה לא רצה, והמילה נשארת עם הקווים הדהויים
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const orig=vis.textContent,rtl=getComputedStyle(root).direction==="rtl";
    vis.textContent="";
    const L=gr(orig).map(g=>{const c=document.createElement("span");c.className="gr-c";c.textContent=g;vis.appendChild(c);return c;});
    gsap.set(lines,{scaleX:0,transformOrigin:rtl?"100% 50%":"0% 50%"});   // הקווים נמתחים מהצד שבו מתחילה הקריאה
    gsap.set(labels,{opacity:0});
    gsap.set(baseLine,{opacity:.35});
    gsap.set(L,{yPercent:-150,rotation:()=>gsap.utils.random(-18,18),opacity:0});
    const tl=gsap.timeline({paused:true});
    tl.to(lines,{scaleX:1,duration:.8,ease:"power3.inOut",stagger:.12})
      .to(labels,{opacity:1,duration:.4,ease:"none",stagger:.08},.5)
      .to(L,{yPercent:0,rotation:0,opacity:1,duration:.75,ease:"power4.out",stagger:.09},1)   // האותיות נוחתות על קו הבסיס
      .to(baseLine,{opacity:1,duration:.5,ease:"power1.out"},">-.3");                         // והקו נדלק כשהמילה שלמה
    const st=ScrollTrigger.create({trigger:root.querySelector(".gr-fig"),start:"top 80%",once:true,onEnter:()=>tl.play()});
    return()=>{st.kill();tl.kill();vis.textContent=orig;gsap.set(lines.concat(labels,[baseLine]),{clearProps:"all"});};
  });
})();`
},
{
  id:"g235", cat:"gsap", name:"כותרת עם אווטארים שמתחלפים ומילה שמתגלגלת", tech:"GSAP · IntersectionObserver · תמונות אמיתיות", status:"ממתין",
  desc:"בתוך משפט הכותרת יושבת חבילה של ארבעה עיגולים חופפים עם פנים של אנשים, בין שתי מילים. כל כמה שניות הפנים מתחלפות בגלגול אנכי, עיגול אחרי עיגול, והמילה האחרונה במשפט מתגלגלת יחד איתן למילה אחרת. כשהכותרת נכנסת למסך החבילה צומחת עיגול אחרי עיגול. בלי GSAP ובהפחתת תנועה מוצגות ארבע פנים והמילה הראשונה.",
  when:"כותרת הירו של סוכנות, קליניקה או שירות שמאחוריו אנשים אמיתיים, כשיש ארבע עד שמונה תמונות פנים באיכות טובה. המילה המתגלגלת היא מי שהעסק משרת. כשאין תמונות פנים אמיתיות עדיף לוותר על המהלך.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם משפט כותרת מכיל חבילה קטנה של אווטארים חופפים, והפנים מתחלפות בין המילים. נבנה מאפס מהצפייה. **המארקאפ:** ה-h2 מחזיק עותק `sr-only` של המשפט עם המילה הראשונה בלבד, והמשפט החזותי (`.ga-vis`) הוא `aria-hidden`. החבילה (`.ga-av`) היא `inline-flex` עם `vertical-align:middle` וגודלה `.9em`, ולכן היא גדלה עם הכותרת וחלק מהשורה. כל עיגול (`.ga-s`) חופף את קודמו ב-.3em, עם טבעת בצבע הרקע. המילה המתגלגלת (`.ga-roll`) היא `inline-grid` שבו כל המילים באותו תא ומסכה `overflow:hidden` בגובה השורה, ורוחבה הוא רוחב המילה הרחבה ביותר. **חיתוך הפנים:** התמונות רחבות, ולכן כל תמונה מקבלת שלושה משתנים (`--x` ו-`--y` הם מיקום הפנים כשבר מהתמונה, ‏`--z` הגדלה) ו-`--ar` יחס רוחב לגובה. ה-CSS מציב את התמונה כך שהפנים נופלות במרכז העיגול: גובה `var(--s) * var(--z)` ו-`left` של `var(--s) * (.5 - x*z*ar)`. כשמחליפים תמונה מודדים מחדש את x ו-y. **התנועה:** מאגר של שמונה פנים. בכל סבב כל עיגול מקבל את הפנים ה'הבאות' במאגר (עיגול i מציג את `(i+t) mod 8`, ולכן ארבע פנים שונות תמיד), בגלגול אנכי של `yPercent` עם `power3.inOut`, ‏.7 שניות, ‏.12 בין עיגולים. המילה מתגלגלת באותו סבב. הסבב חוזר כל 2.8 שניות רק בזמן שהכותרת על המסך (`IntersectionObserver`, בלי ScrollTrigger, כי זה לא מהלך גלילה), ובכל כניסה למסך התמונות נטענות מראש. **ההחלפה** שומרת על שורה אחת שלמה: הפנים החדשות נכנסות מלמטה והישנות יוצאות למעלה. **RTL:** העיגול הראשון הוא הימני, והעיגולים הבאים נערמים שמאלה (`margin-inline-start` שלילי). באתר LTR ההערמה מתהפכת לבד. **בטלפון** הכותרת קטנה והחבילה והמילה שומרות על אותו יחס `em`.",
  libs:["gsap"],
  css:`.ga{max-width:1100px;margin-inline:auto;display:grid;gap:32px;justify-items:start}
.ga .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.ga-h{margin:0;font-size:clamp(36px,6.6vw,96px);font-weight:700;line-height:1.3;letter-spacing:-.015em;text-wrap:balance}
.ga-av{display:inline-flex;vertical-align:middle;margin-inline:.12em}
.ga-s{--s:.9em;position:relative;flex:none;width:var(--s);height:var(--s);margin-inline-start:-.3em;border-radius:50%;overflow:hidden;background:color-mix(in srgb,var(--accent) 16%,var(--card));box-shadow:0 0 0 .07em var(--bg)}
.ga-s:first-child{margin-inline-start:0}
.ga-s img{position:absolute;display:block;max-width:none;height:calc(var(--s) * var(--z));width:auto;left:calc(var(--s) * (.5 - var(--x) * var(--z) * var(--ar)));top:calc(var(--s) * (.5 - var(--y) * var(--z)))}
.ga-roll{display:inline-grid;vertical-align:bottom;overflow:hidden;height:1.3em;line-height:1.3}
.ga-roll>span{grid-area:1 / 1;justify-self:start;white-space:nowrap}
.ga-roll>span+span{opacity:0}
.ga-body{display:flex;flex-wrap:wrap;align-items:center;gap:20px 32px;max-width:640px}
.ga-body p{margin:0;flex:1 1 320px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ga-cta{display:inline-flex;align-items:center;min-height:48px;padding:0 28px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}`,
  html:`<div class="stage"><section class="ga">
  <h2 class="ga-h"><span class="sr-only">אנחנו בונים אתרים למסעדות</span><span class="ga-vis" aria-hidden="true">אנחנו <span class="ga-av"><span class="ga-s"><img src="../assets/media/real/s02/hero-panel.webp" alt="" width="2200" height="1468" loading="lazy" decoding="async" style="--x:.3;--y:.45;--z:3.2;--ar:1.499"></span><span class="ga-s"><img src="../assets/media/real/s09/step-2-welcome.webp" alt="" width="1500" height="1200" loading="lazy" decoding="async" style="--x:.65;--y:.27;--z:2.8;--ar:1.25"></span><span class="ga-s"><img src="../assets/media/real/s12/hero-window.webp" alt="" width="1100" height="1100" loading="lazy" decoding="async" style="--x:.48;--y:.33;--z:2.5;--ar:1"></span><span class="ga-s"><img src="../assets/media/real/s06/hug.webp" alt="" width="1500" height="1100" loading="lazy" decoding="async" style="--x:.35;--y:.5;--z:2.8;--ar:1.364"></span></span> בונים אתרים <span class="ga-roll"><span>למסעדות</span><span>למרפאות</span><span>לחנויות</span><span>לסטודיואים</span></span></span></h2>
  <div class="ga-body">
    <p>צוות של ארבעה אנשים שעובד ישירות מול בעלי העסק, בלי מתווכים ובלי חבילות מוכנות.</p>
    <a class="ga-cta" href="#">לשיחת היכרות</a>
  </div>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined"||typeof IntersectionObserver==="undefined")return;      // בלי GSAP מוצגות ארבע פנים והמילה הראשונה
  const root=document.querySelector(".ga"),slots=[...root.querySelectorAll(".ga-s")],words=[...root.querySelectorAll(".ga-roll>span")];
  const IMG="../assets/media/";
  // [תמונה, רוחב, גובה, x, y, z]: x ו-y הם מיקום הפנים כשבר מהתמונה, z ההגדלה. ארבעת הראשונים הם מה שבמארקאפ
  const POOL=[["real/s02/hero-panel",2200,1468,.3,.45,3.2],["real/s09/step-2-welcome",1500,1200,.65,.27,2.8],["real/s12/hero-window",1100,1100,.48,.33,2.5],["real/s06/hug",1500,1100,.35,.5,2.8],
    ["real/s12/hero-window",1100,1100,.2,.37,2.5],["real/s09/hero-corridor",2000,1666,.26,.22,3],["real/s09/step-1-booking",1500,1200,.22,.28,2.8],["real/s12/hero-window",1100,1100,.86,.32,2.5]];
  // בהפחתת תנועה הפונקציה לא רצה, והחבילה והמילה נשארות במצב הראשון
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const init=slots.map(s=>s.innerHTML);
    let t=0,w=0,loop=null,warm=false,intro=false;
    const mk=p=>{
      const i=document.createElement("img");
      i.src=IMG+p[0]+".webp";i.alt="";i.width=p[1];i.height=p[2];i.decoding="async";
      i.style.cssText="--x:"+p[3]+";--y:"+p[4]+";--z:"+p[5]+";--ar:"+(p[1]/p[2]).toFixed(3);return i;
    };
    const step=()=>{
      t++;
      slots.forEach((s,i)=>{
        const old=s.querySelector("img:last-child"),nu=mk(POOL[(i+t)%POOL.length]),d=i*.12;
        s.appendChild(nu);
        gsap.fromTo(nu,{yPercent:100},{yPercent:0,duration:.7,ease:"power3.inOut",delay:d});
        gsap.to(old,{yPercent:-100,duration:.7,ease:"power3.inOut",delay:d,onComplete:()=>old.remove()});
      });
      const cur=words[w];w=(w+1)%words.length;
      gsap.fromTo(words[w],{yPercent:110},{yPercent:0,duration:.7,ease:"power3.inOut",delay:.1});
      gsap.to(cur,{yPercent:-110,duration:.7,ease:"power3.inOut",delay:.1});
    };
    const tick=()=>{step();loop=gsap.delayedCall(2.8,tick);};
    gsap.set(words.slice(1),{yPercent:110,opacity:1});
    gsap.set(slots,{scale:.5,opacity:0});
    // הסבב רץ רק כשהכותרת על המסך: IntersectionObserver במקום ScrollTrigger
    const io=new IntersectionObserver(es=>{es.forEach(e=>{
      if(loop){loop.kill();loop=null;}
      if(!e.isIntersecting)return;
      if(!warm){warm=true;POOL.forEach(p=>{new Image().src=IMG+p[0]+".webp";});}
      if(!intro){intro=true;gsap.to(slots,{scale:1,opacity:1,duration:.6,ease:"power3.out",stagger:.08});}
      loop=gsap.delayedCall(1.2,tick);
    });},{threshold:.2});
    io.observe(root);
    return()=>{
      io.disconnect();if(loop)loop.kill();
      gsap.killTweensOf(slots.concat(words));slots.forEach(s=>gsap.killTweensOf(s.querySelectorAll("img")));
      slots.forEach((s,i)=>{s.innerHTML=init[i];});gsap.set(slots.concat(words),{clearProps:"all"});
    };
  });
})();`
},
{
  id:"g236", cat:"gsap", name:"שם המותג ענק שנחתך בקצה הפוטר", tech:"GSAP · ScrollTrigger once · overflow hidden", status:"ממתין",
  desc:"בתחתית הפוטר, מתחת לעמודות הקישורים, יושבת מילת המותג ברוחב של כל המשטח, בגוון בהיר שכמעט נבלע בו, והשליש התחתון שלה נחתך בקצה. כשהפוטר נכנס למסך עמודות הקישורים עולות בעדינות, והמילה עולה מלמטה ומתיישבת. בלי GSAP ובהפחתת תנועה המילה עומדת חתוכה במקומה.",
  when:"סוף עמוד באתר של עסק עם שם קצר וזכיר: סטודיו, מותג, חנות. הפוטר צריך לכלול קישורים אמיתיים, והמילה היא סגירה ולא אלמנט ניווט. פעם אחת בעמוד, בפוטר בלבד, ובשם של עד שש אותיות.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו שם המותג ענק יושב מתחת עמודות הקישורים בפוטר ונחתך בקצה, ובסרטון אחר מילה ענקית חתוכה בתחתית כרטיס. נבנה מאפס מהצפייה. **המארקאפ:** משטח בצבע `--accent` עם `overflow:hidden` וקצוות מעוגלים, בו עמודות קישורים (טקסט `--accent-ink`) ומתחתיהן `.gf-mark`, עטיפה `aria-hidden` שמכילה את המילה. **החיתוך נקבע בגובה העטיפה:** `.gf-mark` הוא `.42em` בלבד, והמילה בתוכה (`span` עם `margin-top:-.2em`) יושבת כך שהשליש התחתון שלה מחוץ לתיבה. המספרים נמדדו ב-Google Sans בעברית: האות עצמה גבוהה .505em, וקו הבסיס ב-.77em מראש שורה של `line-height:1`. בגופן אחר מודדים מחדש ומתאימים את `.42em` ואת `-.2em`. הצבע של המילה הוא `color-mix` של `--accent-ink` ב-20% ושקיפות, ולכן הוא תמיד בהיר מעט מהמשטח בכל עור. **התנועה** (פעם אחת, כשהפוטר נכנס ל-85% מהמסך): העמודות עולות 20px עם `power3.out` ובהשהיה של .07 בין עמודות, והמילה עולה 42% מגובהה ומתגדלת מ-.92 ל-1 (`power3.out`, ‏1.4 שניות, מקור בתחתית). עד הכניסה המילה שוכנת מתחת לחיתוך, ולכן היא מופיעה ממש מהקצה. **הפוטר המלא** (עמוד פרטיות, נגישות, קרדיט, שנה) הוא של הפוטרים במאגר (`cat:footer`); כאן רק המהלך. **RTL:** המילה ממורכזת ואין מה להחליף. **בטלפון** העמודות הופכות לשתיים והמילה קטנה (`clamp` עד 120px).",
  libs:["gsap","ScrollTrigger"],
  css:`.gf{position:relative;overflow:hidden;border-radius:28px;background:var(--accent);color:var(--accent-ink);padding:56px clamp(24px,4vw,64px) 0;display:grid;gap:56px}
.gf-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px 24px}
.gf-col{display:grid;align-content:start;gap:10px}
.gf-col h3{margin:0 0 6px;font-size:14px;font-weight:600;opacity:.72}
.gf-col p{margin:0;font-size:15px;line-height:1.6;max-width:30ch}
.gf-col .gf-name{font-size:22px;font-weight:700;opacity:1}
.gf-col ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.gf a{color:inherit;text-decoration:none;font-size:15px}
.gf a[href^="tel:"]{unicode-bidi:isolate}
/* החיתוך: העטיפה נמוכה מהמילה, והמילה יושבת כך שהשליש התחתון שלה בחוץ */
.gf-mark{height:.42em;overflow:hidden;font-size:clamp(120px,30vw,520px);line-height:1;font-weight:700;letter-spacing:-.02em;text-align:center;color:color-mix(in srgb,var(--accent-ink) 20%,transparent);user-select:none;pointer-events:none}
.gf-mark span{display:block;margin-top:-.2em}
@media(max-width:767px){.gf-top{grid-template-columns:1fr 1fr}.gf-col:first-child{grid-column:1 / -1}}`,
  html:`<div class="stage tight"><footer class="gf">
  <div class="gf-top">
    <div class="gf-col"><p class="gf-name">אדמה</p><p>סטודיו לתכנון ולבניית גינות פרטיות, חצרות ומרפסות.</p><p>הרצל 14, רעננה</p></div>
    <nav class="gf-col" aria-label="שירותים"><h3>מה אנחנו עושים</h3><ul><li><a href="#">גינות פרטיות</a></li><li><a href="#">חצרות ומרפסות</a></li><li><a href="#">גינות על גגות</a></li><li><a href="#">תחזוקה שוטפת</a></li></ul></nav>
    <nav class="gf-col" aria-label="הסטודיו"><h3>הסטודיו</h3><ul><li><a href="#">פרויקטים</a></li><li><a href="#">תהליך העבודה</a></li><li><a href="#">שאלות נפוצות</a></li><li><a href="#">צור קשר</a></li></ul></nav>
    <div class="gf-col"><h3>לתיאום פגישה</h3><ul><li><a href="tel:+97295550142" dir="ltr">09-555-0142</a></li><li><a href="#">שליחת הודעה</a></li></ul></div>
  </div>
  <div class="gf-mark" aria-hidden="true"><span>אדמה</span></div>
</footer></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP המילה עומדת חתוכה במקומה
  const root=document.querySelector(".gf"),word=root.querySelector(".gf-mark span"),cols=[...root.querySelectorAll(".gf-col")];
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    gsap.set(word,{yPercent:42,scale:.92,transformOrigin:"50% 100%"});     // המילה מתחילה מתחת לחיתוך
    gsap.set(cols,{y:20,opacity:0});
    const st=ScrollTrigger.create({trigger:root,start:"top 85%",once:true,onEnter:()=>{
      gsap.to(cols,{y:0,opacity:1,duration:.7,ease:"power3.out",stagger:.07});
      gsap.to(word,{yPercent:0,scale:1,duration:1.4,ease:"power3.out",delay:.15});
    }});
    return()=>{st.kill();gsap.killTweensOf(cols.concat([word]));gsap.set(cols.concat([word]),{clearProps:"all"});};
  });
})();`
},
{
  id:"b92", cat:"behavior", name:"עדשת זכוכית שמגדילה ומעקמת את הטקסט", tech:"GSAP ticker · pointer · SVG feDisplacementMap", status:"ממתין", runway:false,
  desc:"עדשה עגולה מזכוכית מרחפת מעל משפט גדול ומגדילה את האותיות שמתחתיה, והקצוות שלהן מתעקמים כמו בכדור אמיתי. בעכבר העדשה עוקבת אחרי המצביע בהשהיה קלה, ובלי עכבר, כמו בטלפון, היא מחליקה לבד לאורך המשפט. בלי GSAP ובהפחתת תנועה אין עדשה והמשפט מוצג כרגיל.",
  when:"משפט מרכזי באתר של עסק שעוסק בפרטים: משרד עורכי דין, רואה חשבון, מעבדה, בית מלאכה. מושך את העין לקריאה סבלנית של משפט אחד. לא כשהמשפט ארוך מארבע שורות, ולא כשיש כמה אזורים אינטראקטיביים באותו מסך.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כדור זכוכית מחליק מעל שורת טקסט ומעקם את האותיות שמאחוריו. נבנה מאפס מהצפייה. **למה לא `backdrop-filter`:** הוא לא מגדיל, ובחלק מהדפדפנים לא מקבל `feDisplacementMap`. לכן העדשה היא עותק של המשפט בתוך עיגול: ה-JS יוצר `span.gl-lens` (עיגול, `overflow:hidden`, רקע `--bg` שמסתיר את הטקסט שמתחתיו) ובתוכו עותק של הפסקה ברוחב הסקשן. מרכז העדשה (x, y) מציב את העותק ב-`translate(R - M*x, R - M*y) scale(M)` עם מקור בפינה, כך שכל נקודה בטקסט נראית בדיוק מעל מקומה, מוגדלת פי M (1.5) סביב מרכז העדשה, כתב וקטורי חד. **העיקום:** על האלמנט שמחזיק את העותק (בגודל העדשה בלבד, ולא על כל העמוד) יושב `filter:url(#gl-bulge)`: `feImage` עם מפת היסטים שנוצרת ב-canvas בגודל העדשה, ו-`feDisplacementMap`. במפה ההיסט הוא `-k * d` כש-d הוא הווקטור מהמרכז ו-`k = .2 * (1 - rho^2)`, כלומר חזק במרכז (הגדלה נוספת של כרבע) ואפס בקצה. את רוב ההגדלה עושה הטרנספורם, שחד, ואת העיקום רק המפה, כדי שהכתב לא יתפקסל, כך ש-`P - k*d` תמיד נשאר בתוך העיגול ואין שוליים ריקים. המפה נבנית מחדש בכל `refresh` של ScrollTrigger (שינוי גודל). **הזכוכית** היא שכבת הברקה (`radial-gradient` מ-`--card` ו-`--ink`) וטבעת בצבע `--accent`, כולן בטוקנים. **התנועה:** `gsap.ticker` שרץ רק בזמן שהסקשן על המסך. בעכבר (`pointermove`) המטרה היא המצביע, ובלי תנועה של 1.4 שניות המטרה היא מסלול איטי לאורך המשפט (סינוסים). העדשה רודפת אחרי המטרה ב-12% בכל פריים. מגע לא מושך את העדשה, כדי לא לתפוס גלילה. **נגישות:** כל העדשה `aria-hidden`, הטקסט המקורי נשאר בפסקה ונבחר ונקרא כרגיל, והעדשה `pointer-events:none`. **דפדפנים:** אם `feImage` לא נתמך העדשה רק מגדילה. **RTL:** העותק יורש `direction`, ולכן שבירת השורות זהה בדיוק. אין מה להחליף ב-LTR.",
  libs:["gsap","ScrollTrigger"],
  css:`.gl{position:relative;max-width:1100px;margin-inline:auto;display:grid;gap:32px;--lr:clamp(72px,9vw,116px)}
.gl-t{margin:0;font-size:clamp(32px,4.8vw,68px);font-weight:700;line-height:1.28;letter-spacing:-.01em;text-wrap:pretty}
.gl-body{margin:0;max-width:640px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.gl-wrap{position:relative}
.gl-lens{position:absolute;left:0;top:0;width:calc(var(--lr) * 2);height:calc(var(--lr) * 2);border-radius:50%;overflow:hidden;background:var(--bg);box-shadow:0 .5em 1.6em color-mix(in srgb,var(--ink) 22%,transparent);opacity:0;pointer-events:none;user-select:none;will-change:transform}
.gl-fx{position:absolute;inset:0}
.gl-in{position:absolute;left:0;top:0;transform-origin:0 0}
.gl-gl{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 32% 26%,color-mix(in srgb,var(--card) 72%,transparent) 0,transparent 36%),radial-gradient(circle at 50% 50%,transparent 60%,color-mix(in srgb,var(--ink) 28%,transparent) 100%);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--accent) 45%,transparent)}`,
  html:`<div class="stage"><section class="gl">
  <div class="gl-wrap">
    <p class="gl-t">את הפרטים הקטנים בהסכם אנחנו קוראים לפני שאתם חותמים, ומסבירים אותם בשפה שכולם מבינים.</p>
  </div>
  <p class="gl-body">משרד עורכי דין לעסקים קטנים, עם ליווי אישי מהחתימה ועד הביצוע.</p>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP אין עדשה והמשפט מוצג כרגיל
  const root=document.querySelector(".gl-wrap"),t=root.querySelector(".gl-t");
  const clamp=gsap.utils.clamp;
  // בהפחתת תנועה הפונקציה לא רצה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const M=1.5;
    const lens=document.createElement("span"),fx=document.createElement("span"),inn=document.createElement("span"),glare=document.createElement("span");
    lens.className="gl-lens";fx.className="gl-fx";inn.className="gl-in";glare.className="gl-gl";
    lens.setAttribute("aria-hidden","true");
    const clone=t.cloneNode(true);inn.appendChild(clone);fx.appendChild(inn);lens.appendChild(fx);lens.appendChild(glare);root.appendChild(lens);
    let W=0,H=0,R=0,svg=null,fil=null,x=0,y=0,tx=0,ty=0,hold=0,on=false;
    const NS="http://www.w3.org/2000/svg";
    // מפת ההיסטים: במרכז מושכת פנימה (הגדלה נוספת), בקצה אפס, כך שהדגימה נשארת בתוך העיגול
    const buildMap=()=>{
      const S=Math.round(R*2);if(S<8)return;
      const c=document.createElement("canvas");c.width=c.height=S;
      const g=c.getContext("2d"),img=g.createImageData(S,S),d=img.data,scale=S*.5;
      for(let j=0;j<S;j++)for(let i=0;i<S;i++){
        const dx=i+.5-S/2,dy=j+.5-S/2,rho=Math.hypot(dx,dy)/(S/2),k=rho<1?(1-rho*rho)*.2:0,o=(j*S+i)*4;
        d[o]=Math.round(255*(.5-k*dx/scale));d[o+1]=Math.round(255*(.5-k*dy/scale));d[o+2]=128;d[o+3]=255;
      }
      g.putImageData(img,0,0);
      if(!svg){
        svg=document.createElementNS(NS,"svg");svg.setAttribute("width","0");svg.setAttribute("height","0");svg.setAttribute("aria-hidden","true");svg.style.cssText="position:absolute;width:0;height:0";
        svg.innerHTML='<filter id="gl-bulge" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="" xChannelSelector="R" yChannelSelector="G"/></filter>';
        root.appendChild(svg);fil=svg.querySelector("filter");
        const im=fil.querySelector("feImage");im.setAttribute("result","map");fil.querySelector("feDisplacementMap").setAttribute("in2","map");
        fx.style.filter="url(#gl-bulge)";
      }
      const im=fil.querySelector("feImage");
      im.setAttribute("href",c.toDataURL());im.setAttribute("x","0");im.setAttribute("y","0");im.setAttribute("width",S);im.setAttribute("height",S);
      fil.querySelector("feDisplacementMap").setAttribute("scale",scale);
    };
    const place=()=>{
      lens.style.transform="translate3d("+(x-R)+"px,"+(y-R)+"px,0)";
      inn.style.transform="translate("+(R-M*x)+"px,"+(R-M*y)+"px) scale("+M+")";
    };
    const measure=()=>{
      W=root.clientWidth;H=root.clientHeight;R=lens.offsetWidth/2;inn.style.width=W+"px";
      if(!hold){x=tx=W*.5;y=ty=H*.5;}
      buildMap();place();
    };
    const tick=()=>{
      const now=performance.now();
      if(now-hold>1400){const u=now/1000;tx=W*(.5+.4*Math.sin(u*.33));ty=H*(.5+.34*Math.sin(u*.51+1.3));}   // בלי מצביע: מסלול איטי לאורך המשפט
      x+=(tx-x)*.12;y+=(ty-y)*.12;place();
    };
    const go=()=>{if(!on){on=true;gsap.ticker.add(tick);}};
    const stop=()=>{if(on){on=false;gsap.ticker.remove(tick);}};
    const onMove=e=>{
      if(e.pointerType==="touch")return;
      const r=root.getBoundingClientRect();tx=clamp(0,W,e.clientX-r.left);ty=clamp(0,H,e.clientY-r.top);hold=performance.now();
    };
    const onLeave=()=>{hold=0;};
    root.addEventListener("pointermove",onMove);root.addEventListener("pointerleave",onLeave);
    ScrollTrigger.addEventListener("refresh",measure);
    measure();
    const st=ScrollTrigger.create({trigger:root,start:"top bottom",end:"bottom top",onToggle:s=>{if(s.isActive)go();else stop();}});
    gsap.to(lens,{opacity:1,duration:.6,delay:.2,ease:"power1.out"});
    return()=>{
      stop();st.kill();gsap.killTweensOf(lens);
      root.removeEventListener("pointermove",onMove);root.removeEventListener("pointerleave",onLeave);ScrollTrigger.removeEventListener("refresh",measure);
      lens.remove();if(svg)svg.remove();
    };
  });
})();`
},
{
  id:"b93", cat:"behavior", name:"מילה שמחליפה משפחת גופן במקום", tech:"GSAP · ScrollTrigger toggle · hover · Bellefair", status:"ממתין", runway:false,
  desc:"מילה גדולה כתובה בגופן סנס ישר וחד, ושלושה קווי הנחיה מאחוריה (קו עליון, קו בסיס וקו תחתון) לא זזים. כשהמילה מגיעה לאמצע המסך, או כשמרחפים מעליה, היא מתחלפת בטשטוש רך לאותה מילה בגופן סריף חם ואישי, באותו גובה ועל אותו קו בסיס. תווית קטנה מתחת מראה באיזה קול המילה נמצאת עכשיו. בלי GSAP ובהפחתת תנועה מוצג רק הגופן הראשון.",
  when:"כשרוצים להראות שני קולות של אותו עסק, הרשמי והאישי. מילה אחת בכותרת, באתר של סטודיו, יועץ או חנות בוטיק. כשהגופנים דומים מדי זה לזה אין מה להראות, וכשהשורה מכילה כמה מילים הדגש הולך לאיבוד.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם אותה מילה מתחלפת בין גופן סנס חמור לגופן סריף אישי, וקווי ההנחיה נשארים במקומם. נבנה מאפס מהצפייה. **המארקאפ:** אותה מילה פעמיים בתא אחד של grid (`.gw-a` סנס, `.gw-b` סריף) עם `align-items:baseline`, כך שקווי הבסיס שלהם נצמדים והשורה לא קופצת. הגופן השני הוא Bellefair, שמוגדר ב-`@font-face` בקובץ (`size-adjust:112%`, וגם `font-size:.95em` כדי שגובה האות יתאים לגופן הראשון). לגופן סריף אחר נבדקים שני דברים: שיש בו עברית, ושגובה האות שלו מתאים לקו העליון (אחרת מכווננים את `font-size` של `.gw-b`). **קווי ההנחיה** הם ארבעה `span` ב-`em` מראש תיבת השורה, והם לא נוגעים בטקסט, ולכן לא זזים בהחלפה. הערכים (עליון .30, בסיס .79, תחתון .965) נמדדו בשורה אחת של Google Sans ו-Bellefair יחד. **ההחלפה:** `opacity` ו-`filter:blur(10px)` ב-`power2.inOut`, ‏.7 שניות, בשני העותקים בכיוונים הפוכים (ובתוויות). כשאין GSAP או שיש הפחתת תנועה, העותק השני נשאר שקוף ובלי טשטוש. **הטריגרים:** `ScrollTrigger` עם `onToggle` כשהמילה בין 62% ל-38% מהמסך (מצב סריף), ו-`pointerenter` ו-`pointerleave` של עכבר (מגע לא מחליף). המצב הוא `hover || scroll`, ולכן אין התנגשות בין השניים. **נגישות:** ה-h2 מחזיק `sr-only` עם המילה, והעותקים בעטיפה `aria-hidden`. אין פקד לחיץ, ולכן אין מה להפעיל במקלדת. **RTL:** אין תנועה אופקית, ולכן אין מה להחליף.",
  libs:["gsap","ScrollTrigger"],
  css:`@font-face{font-family:"MV Bellefair";src:url("../assets/fonts/bellefair.woff2") format("woff2");font-weight:400;font-display:swap;size-adjust:112%}
.gw{max-width:1100px;margin-inline:auto;display:grid;gap:32px;justify-items:start}
.gw .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.gw-fig{position:relative;font-size:clamp(120px,30vw,380px);line-height:1}
.gw-ln{position:absolute;inset-inline:-8px;top:calc(var(--y) * 1em);height:1px;background:color-mix(in srgb,var(--ink) 24%,transparent);pointer-events:none}
.gw-ln.is-base{height:2px;background:var(--accent)}
.gw-h{margin:0;font-size:1em;line-height:1;font-weight:400}
.gw-stack{display:grid;align-items:baseline;justify-items:start}
.gw-a,.gw-b{grid-area:1 / 1;display:block;white-space:nowrap}
.gw-a{font-weight:700;letter-spacing:-.02em}
.gw-b{font-family:"MV Bellefair","Bellefair",Georgia,serif;font-weight:400;font-size:.95em;opacity:0;filter:blur(10px)}
.gw-tags{display:grid;margin:0;font-size:14px;font-weight:600;color:var(--muted)}
.gw-tags span{grid-area:1 / 1}
.gw-tb{opacity:0}
.gw-p{margin:0;max-width:640px;color:var(--muted);font-size:var(--fs-body);line-height:1.6}`,
  html:`<div class="stage"><section class="gw">
  <div class="gw-fig">
    <span class="gw-ln" style="--y:.3" aria-hidden="true"></span>
    <span class="gw-ln is-base" style="--y:.79" aria-hidden="true"></span>
    <span class="gw-ln" style="--y:.965" aria-hidden="true"></span>
    <h2 class="gw-h"><span class="sr-only">אנחנו</span><span class="gw-stack" aria-hidden="true"><span class="gw-a">אנחנו</span><span class="gw-b">אנחנו</span></span></h2>
  </div>
  <p class="gw-tags" aria-hidden="true"><span class="gw-ta">גופן סנס: הקול המקצועי</span><span class="gw-tb">גופן סריף: הקול האישי</span></p>
  <p class="gw-p">סטודיו קטן לעיצוב גרפי, ארבעה אנשים ושולחן אחד גדול. כל פרויקט מתחיל בשיחה ארוכה ובכוס קפה.</p>
</section></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP מוצג רק הגופן הראשון
  const root=document.querySelector(".gw"),stack=root.querySelector(".gw-stack"),a=root.querySelector(".gw-a"),b=root.querySelector(".gw-b"),ta=root.querySelector(".gw-ta"),tb=root.querySelector(".gw-tb");
  // בהפחתת תנועה הפונקציה לא רצה, והגופן הראשון נשאר
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let toB=false,hov=false,scr=false;
    const apply=()=>{
      const want=hov||scr;if(want===toB)return;toB=want;
      const o={duration:.7,ease:"power2.inOut",overwrite:"auto"};
      gsap.to(a,Object.assign({opacity:want?0:1,filter:"blur("+(want?10:0)+"px)"},o));
      gsap.to(b,Object.assign({opacity:want?1:0,filter:"blur("+(want?0:10)+"px)"},o));
      gsap.to(ta,{opacity:want?0:1,duration:.5,ease:"none",overwrite:"auto"});
      gsap.to(tb,{opacity:want?1:0,duration:.5,ease:"none",overwrite:"auto"});
    };
    const st=ScrollTrigger.create({trigger:stack,start:"top 62%",end:"bottom 38%",onToggle:s=>{scr=s.isActive;apply();}});
    const over=e=>{if(e.pointerType==="mouse"){hov=true;apply();}};
    const out=e=>{if(e.pointerType==="mouse"){hov=false;apply();}};
    stack.addEventListener("pointerenter",over);stack.addEventListener("pointerleave",out);
    return()=>{
      st.kill();stack.removeEventListener("pointerenter",over);stack.removeEventListener("pointerleave",out);
      gsap.killTweensOf([a,b,ta,tb]);gsap.set([a,b,ta,tb],{clearProps:"opacity,filter"});
    };
  });
})();`
}
];
