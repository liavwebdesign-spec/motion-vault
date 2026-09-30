// גל awwwards, סריקה רוחבית (2.9.2026): שני רכיבים אוניברסליים נוספים.
export default [
{
  id:"b32", cat:"behavior", name:"טופס עם תוויות צפות, שגיאות ומצב שליחה", tech:"CSS :placeholder-shown · JS", status:"ממתין",
  desc:"התווית יושבת בתוך השדה ועולה למעלה ברגע שמקלידים. שגיאה נכנסת עם ריצוד עדין והודעה מתחת לשדה, והכפתור עובר למצב שליחה ואז לאישור.",
  when:"כל טופס בכל אתר: יצירת קשר, קביעת תור, הרשמה לרשימה, בקשת הצעת מחיר. זה הרכיב שקובע אם ליד נשלח או ננטש.",
  libs:[],
  css:`.ff{max-width:min(560px,92vw);margin-inline:auto;display:grid;gap:18px}
.ff-field{position:relative}
.ff-field input,.ff-field textarea{width:100%;font:inherit;font-size:16px;color:var(--ink);background:var(--card);
  border:1px solid var(--line);border-radius:12px;padding:26px 16px 10px;transition:border-color .25s,box-shadow .25s}
.ff-field textarea{min-height:120px;resize:vertical}
.ff-field input:focus,.ff-field textarea:focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 3px rgba(74,58,255,.13)}
/* נקודת הכיווץ בצד ההתחלה: בעברית ימין. עם 0 0 התווית הצפה בורחת שמאלה מקצה השדה */
.ff-field label{position:absolute;inset-inline-start:17px;top:17px;color:var(--muted);font-size:16px;pointer-events:none;
  transform-origin:100% 0;transition:transform .22s cubic-bezier(.2,.6,.2,1),color .22s}
[dir="ltr"] .ff-field label{transform-origin:0 0}
/* אימייל נכתב משמאל לימין (אחרת הנקודה וה-@ קופצים בזמן ההקלדה), אבל מיושר לימין כמו שאר השדות */
.ff-field input[type=email]{text-align:right}
[dir="ltr"] .ff-field input[type=email]{text-align:left}
/* התווית עולה כשהשדה בפוקוס או כשיש בו תוכן. placeholder ריק הוא התנאי לזיהוי */
.ff-field input:focus+label,.ff-field textarea:focus+label,
.ff-field input:not(:placeholder-shown)+label,.ff-field textarea:not(:placeholder-shown)+label{transform:translateY(-11px) scale(.78)}
.ff-field input:focus+label,.ff-field textarea:focus+label{color:var(--accent)}
/* visibility ולא רק שקיפות: הודעה שקופה עדיין נקראת בדפדוף גם כשהכל תקין */
.ff-err{display:block;font-size:13px;color:#c2255c;margin-top:6px;height:0;opacity:0;visibility:hidden;transition:opacity .25s,visibility 0s .25s}
.ff-field.bad input,.ff-field.bad textarea{border-color:#c2255c;animation:ffshake .34s}
.ff-field.bad .ff-err{height:auto;opacity:1;visibility:visible;transition-delay:0s}
@keyframes ffshake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.ff-btn{position:relative;min-height:54px;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-weight:600;
  font-size:17px;cursor:pointer;overflow:hidden;transition:background .3s}
.ff-btn span{display:block;transition:transform .3s cubic-bezier(.2,.6,.2,1),opacity .25s}
.ff-btn .s2,.ff-btn .s3{position:absolute;inset:0;display:grid;place-items:center;transform:translateY(110%);opacity:0}
.ff-btn.load .s1{transform:translateY(-110%);opacity:0}
.ff-btn.load .s2{transform:none;opacity:1}
.ff-btn.done{background:#2b8a3e}
.ff-btn.done .s1,.ff-btn.done .s2{transform:translateY(-110%);opacity:0}
.ff-btn.done .s3{transform:none;opacity:1}
.ff-spin{width:17px;height:17px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;animation:ffspin .7s linear infinite;display:inline-block}
@keyframes ffspin{to{transform:rotate(360deg)}}
.ff-note{font-size:13px;color:var(--muted);text-align:center}
.ff-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media (prefers-reduced-motion: reduce){.ff-field.bad input,.ff-field.bad textarea{animation:none}.ff-spin{animation-duration:2s}}`,
  html:`<div class="stage tight"><form class="ff" novalidate>
  <div class="ff-field"><input type="text" id="ffn" placeholder=" " autocomplete="name"><label for="ffn">שם מלא</label><small class="ff-err" id="ffn-err">צריך שם כדי לדעת למי לחזור</small></div>
  <div class="ff-field"><input type="email" id="ffe" dir="ltr" placeholder=" " autocomplete="email"><label for="ffe">אימייל</label><small class="ff-err" id="ffe-err">כתובת האימייל לא נראית תקינה</small></div>
  <div class="ff-field"><textarea id="ffm" placeholder=" "></textarea><label for="ffm">במה נוכל לעזור?</label><small class="ff-err" id="ffm-err">כמה מילים יעזרו לנו להתכונן</small></div>
  <button class="ff-btn" type="submit"><span class="s1">שליחה</span><span class="s2" aria-hidden="true"><i class="ff-spin"></i></span><span class="s3" aria-hidden="true">נשלח, נחזור אליך</span></button>
  <p class="ff-status" role="status"></p>
  <p class="ff-note">הדגמה בלבד. שום דבר לא נשלח לשום מקום.</p>
</form></div>`,
  js:`(function(){
  const form=document.querySelector(".ff"),btn=form.querySelector(".ff-btn"),status=form.querySelector(".ff-status");
  const fields=[...form.querySelectorAll(".ff-field")];
  function bad(f){
    const el=f.querySelector("input,textarea");
    const v=el.value.trim();
    if(el.type==="email")return !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v);
    return v.length<2;
  }
  // מצב השגיאה גם לקורא מסך: aria-invalid, והודעת השגיאה מחוברת לשדה רק כשהיא באמת מוצגת
  // (aria-describedby מקריא גם הודעה מוסתרת, ולכן הוא לא יושב בשדה כל הזמן)
  function mark(f,b){
    f.classList.toggle("bad",b);
    const el=f.querySelector("input,textarea"),err=f.querySelector(".ff-err");
    el.setAttribute("aria-invalid",String(b));
    if(b)el.setAttribute("aria-describedby",err.id);else el.removeAttribute("aria-describedby");
  }
  fields.forEach(f=>{
    const el=f.querySelector("input,textarea");
    // מסירים את השגיאה ברגע שמתקנים, לא רק בשליחה הבאה
    el.addEventListener("input",()=>{if(f.classList.contains("bad")&&!bad(f))mark(f,false);});
    el.addEventListener("blur",()=>{if(el.value.trim())mark(f,bad(f));});
  });
  form.addEventListener("submit",e=>{
    e.preventDefault();
    // לחיצה כפולה לא שולחת פעמיים
    if(btn.classList.contains("load")||btn.classList.contains("done"))return;
    let first=null;
    fields.forEach(f=>{const b=bad(f);mark(f,b);if(b&&!first)first=f;});
    if(first){first.querySelector("input,textarea").focus();return;}
    btn.classList.add("load");
    setTimeout(()=>{btn.classList.remove("load");btn.classList.add("done");status.textContent="נשלח, נחזור אליך";},1400);
  });
})();`,
  runway:false,
  note:"התווית הצפה עובדת בלי JS בזכות :placeholder-shown, ולכן חובה placeholder של רווח בודד בכל שדה, ובעברית היא מתכווצת לכיוון הימין (transform-origin:100% 0). השגיאה מנוקה תוך כדי הקלדה ולא רק בשליחה הבאה, וזה ההבדל בין טופס שמעצבן לטופס שעוזר. שדה עם שגיאה מקבל aria-invalid וההודעה מחוברת אליו ב-aria-describedby רק כשהיא מוצגת. הכפתור מחזיק שלושה מצבים באותו רוחב כדי שלא יקפוץ; מצבי הטעינה וההצלחה aria-hidden כדי ששם הכפתור יישאר «שליחה», וההצלחה מוכרזת ב-p מוסתר עם role=\"status\". שדה האימייל dir=\"ltr\", כדי שהנקודה וה-@ לא יקפצו בזמן ההקלדה."
},
{
  id:"b33", cat:"behavior", name:"גלריה עם לייטבוקס", tech:"JS · dialog", status:"ממתין",
  desc:"גריד תמונות שנפתח למסך מלא בלחיצה, עם מעבר בין תמונות בחצים ובמקלדת, סגירה ב-Escape או בלחיצה על הרקע, וגלילה נעולה מאחור.",
  when:"מסעדות, קליניקות, נדל\"ן, אולמות, סטודיו, חנויות. בכל אתר שיש בו תמונות שאנשים ירצו לראות גדול.",
  libs:[],
  css:`.gl{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding-inline:var(--gutter)}
.gl button{border:0;padding:0;background:none;cursor:zoom-in;border-radius:10px;overflow:hidden;aspect-ratio:1;position:relative}
.gl .ph{position:absolute;inset:0;border-radius:0;font-size:22px;transition:transform .5s cubic-bezier(.2,.6,.2,1)}
/* הזום רק בעכבר (אחרת נתקע אחרי נגיעה) ורק בלי העדפת תנועה מופחתת */
@media (hover:hover) and (pointer:fine) and (prefers-reduced-motion: no-preference){.gl button:hover .ph{transform:scale(1.06)}}
.lb{position:fixed;inset:0;z-index:80;background:rgba(10,10,16,.92);display:none;place-items:center;padding:clamp(16px,4vw,48px)}
.lb.on{display:grid}
.lb-stage{position:relative;width:min(1000px,92vw);aspect-ratio:3/2;border-radius:14px;overflow:hidden}
.lb-stage .ph{position:absolute;inset:0;border-radius:0;font-size:64px;opacity:0;transition:opacity .35s}
.lb-stage .ph.on{opacity:1}
.lb-close,.lb-arrow{position:absolute;z-index:2;width:48px;height:48px;border-radius:50%;border:0;cursor:pointer;
  background:rgba(255,255,255,.14);color:#fff;font-size:20px;display:grid;place-items:center;backdrop-filter:blur(8px);transition:background .25s}
.lb-close:hover,.lb-arrow:hover{background:rgba(255,255,255,.28)}
.lb-close{top:clamp(14px,3vw,28px);inset-inline-end:clamp(14px,3vw,28px)}
.lb-arrow{top:50%;transform:translateY(-50%)}
/* בעברית "הקודמת" יושבת בצד ההתחלה (ימין) וחצה מצביע ימינה, ו"הבאה" בצד הסיום
   (שמאל) וחצה מצביע שמאלה. הפוך מזה ושני החצים מצביעים אחד לשני. */
.lb-prev{inset-inline-start:clamp(10px,2vw,22px)}
.lb-next{inset-inline-end:clamp(10px,2vw,22px)}
.lb-count{position:absolute;bottom:clamp(14px,3vw,26px);inset-inline:0;text-align:center;color:#fff;font-size:13px;letter-spacing:.1em;z-index:2;direction:ltr}
@media(max-width:767px){.gl{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="stage tight">
<div class="gl">
  <button aria-label="פתח תמונה 1"><span class="ph ph-a">1</span></button>
  <button aria-label="פתח תמונה 2"><span class="ph ph-b">2</span></button>
  <button aria-label="פתח תמונה 3"><span class="ph ph-c">3</span></button>
  <button aria-label="פתח תמונה 4"><span class="ph ph-d">4</span></button>
  <button aria-label="פתח תמונה 5"><span class="ph ph-e">5</span></button>
  <button aria-label="פתח תמונה 6"><span class="ph ph-f">6</span></button>
  <button aria-label="פתח תמונה 7"><span class="ph ph-a">7</span></button>
  <button aria-label="פתח תמונה 8"><span class="ph ph-c">8</span></button>
</div>
<p class="center" style="color:var(--muted);font-size:14px;margin-top:18px">לחץ על תמונה. במקלדת: חצים למעבר, Escape לסגירה.</p>
</div>
<div class="lb" role="dialog" aria-modal="true" aria-label="תצוגת תמונה">
  <div class="lb-stage">
    <span class="ph ph-a">1</span><span class="ph ph-b">2</span><span class="ph ph-c">3</span><span class="ph ph-d">4</span>
    <span class="ph ph-e">5</span><span class="ph ph-f">6</span><span class="ph ph-a">7</span><span class="ph ph-c">8</span>
  </div>
  <button class="lb-close" aria-label="סגירה">✕</button>
  <button class="lb-arrow lb-prev" aria-label="הקודמת">→</button>
  <button class="lb-arrow lb-next" aria-label="הבאה">←</button>
  <span class="lb-count" aria-live="polite"></span>
</div>`,
  js:`(function(){
  const thumbs=[...document.querySelectorAll(".gl button")];
  const lb=document.querySelector(".lb"),shots=[...lb.querySelectorAll(".lb-stage .ph")];
  const count=lb.querySelector(".lb-count"),closeBtn=lb.querySelector(".lb-close");
  let i=0,opener=null;
  const root=document.documentElement;
  const focusables=[closeBtn,lb.querySelector(".lb-prev"),lb.querySelector(".lb-next")];
  function show(n){
    i=(n+shots.length)%shots.length;
    // רק התמונה הנוכחית בעץ הנגישות; המונה מוכרז בכל מעבר (aria-live)
    shots.forEach((s,k)=>{s.classList.toggle("on",k===i);s.setAttribute("aria-hidden",String(k!==i));});
    count.textContent=(i+1)+" / "+shots.length;
  }
  function open(n,from){
    opener=from;show(n);lb.classList.add("on");
    // נעילת גלילה (תוקן 23.9.2026): על <html> עם scrollbar-gutter, לא overflow על body וריפוד שבעברית נופל שמאלה
    root.style.scrollbarGutter="stable"; root.style.overflow="hidden";
    // השכבה fixed לא מכסה את המרזב, ובלי זה נשארת בצד רצועה בצבע העמוד ברוחב פס הגלילה
    root.style.backgroundColor=getComputedStyle(lb).backgroundColor;
    closeBtn.focus();
  }
  function close(){
    lb.classList.remove("on");
    root.style.overflow="";root.style.scrollbarGutter="";root.style.backgroundColor="";
    if(opener)opener.focus();
  }
  thumbs.forEach((b,n)=>b.addEventListener("click",()=>open(n,b)));
  closeBtn.addEventListener("click",close);
  lb.querySelector(".lb-prev").addEventListener("click",()=>show(i-1));
  lb.querySelector(".lb-next").addEventListener("click",()=>show(i+1));
  lb.addEventListener("click",e=>{if(e.target===lb)close();});
  addEventListener("keydown",e=>{
    if(!lb.classList.contains("on"))return;
    if(e.key==="Escape")close();
    // בעברית חץ שמאלה מתקדם לתמונה הבאה
    if(e.key==="ArrowLeft")show(i+1);
    if(e.key==="ArrowRight")show(i-1);
    // מלכודת פוקוס: Tab מסתובב בין שלושת הכפתורים ולא בורח אל הגריד שמאחורי השכבה
    if(e.key==="Tab"){
      const k=focusables.indexOf(document.activeElement);
      e.preventDefault();
      focusables[(k+(e.shiftKey?-1:1)+focusables.length)%focusables.length].focus();
    }
  });
})();`,
  runway:false,
  note:"ארבעה דברים שהופכים לייטבוקס מצעצוע לרכיב אמיתי: נעילת גלילה על <html> עם scrollbar-gutter:stable כדי שהעמוד לא יקפוץ, והמרזב נצבע בצבע הרקע של הלייטבוקס; מלכודת פוקוס, כך ש-Tab מסתובב בין הסגירה והחצים ולא בורח אל הגריד שמאחור; החזרת הפוקוס לתמונה שממנה נפתח אחרי הסגירה; וחצי מקלדת הפוכים בעברית. המונה מוכרז בכל מעבר (aria-live). בפרודקשן כל תמונה גדולה היא <img> עם alt, מוסיפים loading=\"lazy\" לתמונות הגריד ומחליפים לגרסה גדולה רק בפתיחה."
},
];
