// סבב שישי על גלריית Webflow (3.9.2026): שתי טכניקות GSAP שהיו חסרות במאגר.
export default [
{
  id:"g52", cat:"gsap", name:"כפתור מגנטי שנמשך לסמן", tech:"GSAP · quickTo", status:"ממתין",
  desc:"כפתור שמרגיש שהעכבר מתקרב ונמשך אליו קלות, כשהטקסט שבתוכו זז קצת יותר ממנו. משחרר וחוזר למקום בקפיצה רכה.",
  when:"הקריאה הראשית לפעולה, לוגו, אייקוני רשתות, חצי סליידר. מיקרו-אינטראקציה אחת שגורמת לכפתור להרגיש כמו אובייקט ולא כמו מלבן.",
  libs:["gsap"],
  css:`.mg{display:flex;gap:clamp(16px,3vw,40px);justify-content:center;align-items:center;flex-wrap:wrap}
.mg-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:62px;
  padding-inline:36px;border-radius:999px;background:var(--accent);color:#fff;font-size:17px;font-weight:600;
  border:0;cursor:pointer;font-family:inherit;will-change:transform}
.mg-btn.ghost{background:var(--card);color:var(--ink);border:1px solid var(--line)}
.mg-btn span{display:inline-block;will-change:transform;pointer-events:none}
.mg-ico{width:58px;height:58px;min-height:0;padding:0;border-radius:50%;font-size:19px}
.mg-hint{text-align:center;color:var(--muted);font-size:14px;padding-top:30px}
.mg-note{text-align:center;color:var(--muted);font-size:14px;padding-top:8px}
@media(hover:none){.mg-hint::after{content:" (במגע האפקט כבוי, והכפתורים מתנהגים רגיל)"}}`,
  html:`<div class="stage tight">
<div class="mg">
  <button class="mg-btn" data-mag><span>קבעו שיחה</span></button>
  <button class="mg-btn ghost" data-mag><span>לתיק העבודות</span></button>
  <button class="mg-btn mg-ico ghost" data-mag aria-label="וואטסאפ"><span>◎</span></button>
  <button class="mg-btn mg-ico ghost" data-mag aria-label="אינסטגרם"><span>◈</span></button>
</div>
<p class="mg-hint">קרב את העכבר לכפתורים בלי לגעת בהם.</p>
<p class="mg-note">הכפתור זז עד 22 פיקסלים, והטקסט שבתוכו עוד קצת. זה מה שיוצר את העומק.</p>
</div>`,
  js:`(function(){
  const PULL=.34, MAX=22, RADIUS=110;
  if(matchMedia("(hover:none)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  document.querySelectorAll("[data-mag]").forEach(btn=>{
    const label=btn.querySelector("span");
    // quickTo מכין פונקציה אחת לכל תכונה ומעדכן את אותו טוויין, במקום ליצור טוויין חדש בכל תזוזת עכבר
    const bx=gsap.quickTo(btn,"x",{duration:.5,ease:"power3"}),
          by=gsap.quickTo(btn,"y",{duration:.5,ease:"power3"}),
          lx=gsap.quickTo(label,"x",{duration:.6,ease:"power3"}),
          ly=gsap.quickTo(label,"y",{duration:.6,ease:"power3"});
    let inside=false;
    addEventListener("mousemove",e=>{
      const r=btn.getBoundingClientRect();
      const dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
      // האזור המגנטי גדול מהכפתור עצמו, ולכן המשיכה מתחילה עוד לפני שנוגעים בו
      const near=Math.abs(dx)<r.width/2+RADIUS && Math.abs(dy)<r.height/2+RADIUS;
      if(near){
        inside=true;
        bx(gsap.utils.clamp(-MAX,MAX,dx*PULL)); by(gsap.utils.clamp(-MAX,MAX,dy*PULL));
        lx(gsap.utils.clamp(-MAX,MAX,dx*PULL)*.4); ly(gsap.utils.clamp(-MAX,MAX,dy*PULL)*.4);
      }else if(inside){
        inside=false;
        // החזרה היא הרגע שקובע אם זה מרגיש יקר או זול: אלסטי קצר, לא לינארי
        gsap.to(btn,{x:0,y:0,duration:.7,ease:"elastic.out(1,.4)"});
        gsap.to(label,{x:0,y:0,duration:.7,ease:"elastic.out(1,.4)"});
      }
    },{passive:true});
    btn.addEventListener("blur",()=>{gsap.to([btn,label],{x:0,y:0,duration:.4});});
  });
})();`,
  runway:false,
  note:"שלושה פרטים מפרידים בין מגנט שמרגיש יקר לאחד שמרגיש זול. הראשון: `gsap.quickTo` ולא `gsap.to` בכל תזוזת עכבר; הוא מחזיק טוויין אחד ומעדכן לו את היעד, וזה ההבדל בין תנועה חלקה לגמגום. השני: אזור המשיכה גדול מהכפתור, כי כל הקסם הוא שהוא מגיב עוד לפני המגע. השלישי: החזרה למקום היא `elastic.out` קצר, לא חזרה לינארית. שים לב שההאזנה היא ל-`mousemove` על החלון ולא ל-hover על הכפתור, אחרת האפקט מתחיל רק כשכבר נכנסים פנימה. במגע ובמצב חיסכון בתנועה הכל כבוי, כי שם אין סמן שאפשר להתקרב אליו."
},
{
  id:"g53", cat:"gsap", name:"פסקה שנחשפת שורה-שורה מתוך מסכה (RTL-נכון)", tech:"GSAP · ScrollTrigger · פיצול שורות עצמאי", status:"ממתין",
  desc:"בלוק טקסט שהשורות בו עולות מתוך עצמן, אחת אחרי השנייה, כאילו נחשפו מאחורי קו. הפיצול נבנה מחדש כשמשתנה רוחב החלון או כשהפונט מסיים להיטען.",
  when:"פסקת פתיחה, אמירה עסקית, ציטוט, סקשן אודות, כותרת ארוכה. האפקט הכי נפוץ בגלריה, ובעברית הוא דורש מימוש משלו.",
  libs:["gsap","ScrollTrigger"],
  css:`.sl{max-width:min(760px,92vw);margin-inline:auto;padding-block:12vh}
.sl h3{font-size:clamp(26px,4vw,54px);line-height:1.28;margin:0 0 clamp(20px,3vw,34px)}
.sl p{font-size:clamp(17px,1.6vw,22px);line-height:1.85;color:var(--muted);margin:0 0 22px}
.sl .tag{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.08em;color:var(--accent);margin-bottom:14px}
/* המסכה חותכת את השורה שמתחתיה, ולכן היא עולה "מתוך" הטקסט ולא מתוך שום מקום */
.sl-mask{display:block;overflow:clip}
.sl-line{display:block;will-change:transform}
.sl-note{max-width:min(680px,92vw);margin:6vh auto 0;text-align:center;color:var(--muted);font-size:14px}`,
  html:`<div class="stage"><div class="sl">
  <span class="tag" data-rev>איך אנחנו עובדים</span>
  <h3 data-rev>לא מתחילים מעיצוב. מתחילים מהשאלה מה צריך לקרות באתר הזה, ולמי.</h3>
  <p data-rev>רוב האתרים נראים טוב ולא מביאים כלום, כי מישהו התחיל לעצב לפני שהיה ברור מה המסר ומי הקהל. אנחנו הופכים את הסדר: קודם מבינים את העסק ואת הלקוח, אחר כך כותבים, ורק בסוף פותחים כלי עיצוב.</p>
  <p data-rev>התוצאה היא אתר שאפשר להסביר. כל סקשן בו קיים מסיבה, וכל כותרת עונה על שאלה אמיתית שיש למי שנחת בעמוד.</p>
</div>
<p class="sl-note">שנה את רוחב החלון: הפיצול לשורות נבנה מחדש לפי השבירה החדשה.</p></div>`,
  js:`(function(){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;                              // בלי תנועה הטקסט פשוט נמצא שם
  const blocks=gsap.utils.toArray("[data-rev]");
  const state=new Map();

  function split(el){
    const orig=el.dataset.orig||(el.dataset.orig=el.textContent.trim());
    el.setAttribute("aria-label",orig);          // הטקסט הנגיש נשמר על המעטפת
    // שלב א: כל מילה בתוך span, כדי שאפשר יהיה למדוד באיזו שורה היא נחתה
    el.textContent="";
    const words=orig.split(/\\s+/).map((w,i,arr)=>{
      const s=document.createElement("span");
      s.textContent=w;s.style.display="inline-block";
      el.appendChild(s);
      if(i<arr.length-1)el.appendChild(document.createTextNode(" "));
      return s;
    });
    // שלב ב: קיבוץ לפי המיקום האנכי בפועל. סובלנות של שישה פיקסלים מכסה עיגולי תת-פיקסל
    const rows=[];
    words.forEach(w=>{
      const top=Math.round(w.getBoundingClientRect().top);
      let row=rows.find(r=>Math.abs(r.top-top)<6);
      if(!row){row={top:top,words:[]};rows.push(row);}
      row.words.push(w.textContent);
    });
    // שלב ג: בונים מחדש כשורות עטופות במסכה
    el.textContent="";
    return rows.map(r=>{
      const mask=document.createElement("div");mask.className="sl-mask";mask.setAttribute("aria-hidden","true");
      const line=document.createElement("div");line.className="sl-line";
      line.textContent=r.words.join(" ");
      mask.appendChild(line);el.appendChild(mask);
      return line;
    });
  }

  function build(el){
    const prev=state.get(el);
    const wasShown=prev?prev.shown:false;
    if(prev){prev.tw&&prev.tw.kill();prev.st&&prev.st.kill();}
    const lines=split(el);
    // אם הטקסט כבר נחשף, בנייה מחדש אחרי טעינת פונט או שינוי רוחב לא מחביאה אותו שוב
    if(wasShown){state.set(el,{shown:true});return;}
    const rec={shown:false};
    const tw=gsap.from(lines,{yPercent:110,duration:.75,stagger:.09,ease:"power3.out",paused:true,
      onStart:()=>{rec.shown=true;}});
    const fire=()=>{if(!rec.fired){rec.fired=true;tw.play();}};
    // דגל במקום once:true, אחרת נחיתה באמצע העמוד או רענון לא מפעילים כלום
    const st=ScrollTrigger.create({trigger:el,start:"top 84%",
      onEnter:fire,onRefresh:self=>{if(self.progress>0)fire();}});
    rec.tw=tw;rec.st=st;state.set(el,rec);
  }

  blocks.forEach(build);
  // הפונט משנה את שבירת השורות, ולכן בונים שוב אחרי שהוא נטען
  document.fonts&&document.fonts.ready.then(()=>{blocks.forEach(build);ScrollTrigger.refresh();});
  let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{blocks.forEach(build);ScrollTrigger.refresh();},220);});
})();`,
  runway:true,
  note:"**זה המהלך שגילה באג אמיתי**: `SplitText` של GSAP 3.13, כולל `mask:\"lines\"` ו-`autoSplit`, לא מפצל לשורות בעמוד `dir=\"rtl\"`. הוא מחזיר שורה אחת שמכילה את כל הטקסט, בלי שגיאה, וכל האפקט מת בשקט. בדקתי את זה בארבע קומבינציות: עברית ב-LTR מתפצלת נכון לשלוש שורות, ואנגלית ב-RTL נכשלת בדיוק כמו עברית, כלומר הבעיה היא הכיוון ולא השפה. לכן הפיצול כאן נעשה ידנית בשלושה שלבים: עוטפים כל מילה, מקבצים לפי המיקום האנכי שנמדד בפועל, ובונים מחדש כשורות בתוך מסכות. זה גם חוסך את טעינת הפלאגין. שאר הכללים כרגיל: `aria-label` על המעטפת והמסכות `aria-hidden` כדי שהטקסט לא ייקרא פעמיים, בנייה מחדש אחרי `document.fonts.ready` ובשינוי רוחב, ודגל `fired` במקום `once` כדי שנחיתה באמצע העמוד תעבוד."
},
];
