// סבב תשיעי (3.9.2026): GSAP בלבד, הכל מונע גלילה.
export default [
{
  id:"g60", cat:"gsap", name:"מילה שמתחלפת בתוך משפט בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"משפט אחד שנשאר על המסך, ומילה אחת בתוכו מתגלגלת ומתחלפת בקצב הגלילה. מתחתיו מתחלף גם משפט המשנה, כך שכל מצב עומד בפני עצמו.",
  when:"הירו של עמוד הבית, סקשן שירותים, הצהרת מיצוב. במקום לכתוב ארבעה משפטים נפרדים, כותבים אחד שמתגלגל בין ארבע התשובות.",
  libs:["gsap","ScrollTrigger"],
  css:`.ws{height:300vh;position:relative}
.ws-stick{position:sticky;top:0;height:100vh;display:grid;place-items:center;padding-inline:var(--gutter)}
.ws-line{display:flex;align-items:baseline;gap:.28em;flex-wrap:wrap;justify-content:center;
  font-size:clamp(28px,5.4vw,74px);font-weight:800;line-height:1.16;text-align:center}
/* החלון בגובה שורה אחת; רוחבו נקבע מאליו לפי המילה הרחבה ביותר */
.ws-win{display:inline-block;overflow:clip;height:1.16em;vertical-align:baseline}
.ws-stack{display:flex;flex-direction:column;will-change:transform}
.ws-stack span{height:1.16em;line-height:1.16em;color:var(--accent);white-space:nowrap}
.ws-subs{position:relative;margin-top:clamp(18px,2.4vw,32px);height:3.4em;width:min(46ch,90vw)}
.ws-subs p{position:absolute;inset:0;margin:0;text-align:center;color:var(--muted);
  font-size:clamp(15px,1.6vw,20px);line-height:1.7}
.ws-dots{position:absolute;bottom:9vh;inset-inline:0;display:flex;gap:8px;justify-content:center}
.ws-dots i{width:7px;height:7px;border-radius:50%;background:var(--line)}
.ws-dots i.on{background:var(--accent)}`,
  html:`<div class="ws"><div class="ws-stick"><div>
  <div class="ws-line">
    <span>אנחנו בונים</span>
    <span class="ws-win"><span class="ws-stack">
      <span>אתרי תדמית</span><span>דפי נחיתה</span><span>חנויות</span><span>מערכות</span>
    </span></span>
  </div>
  <div class="ws-subs">
    <p>אתר שמסביר מה אתם עושים ולמי, ומוביל לפנייה אחת ברורה.</p>
    <p>עמוד יחיד ממוקד לקמפיין, עם מסר אחד וקריאה אחת לפעולה.</p>
    <p>חנות שמוכרת גם בלי איש מכירות, עם מסלול קנייה קצר.</p>
    <p>ממשק לניהול לקוחות, משימות ודוחות במקום גיליונות.</p>
  </div>
  <div class="ws-dots"><i class="on"></i><i></i><i></i><i></i></div>
</div></div></div>`,
  js:`(function(){
  const stack=document.querySelector(".ws-stack");
  const words=gsap.utils.toArray(".ws-stack span");
  const subs=gsap.utils.toArray(".ws-subs p");
  const dots=gsap.utils.toArray(".ws-dots i");
  const n=words.length;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.set(subs,{opacity:0});gsap.set(subs[0],{opacity:1});
  if(reduce)return;
  const tl=gsap.timeline({scrollTrigger:{trigger:".ws",start:"top top",end:"bottom bottom",scrub:.5,
    // snap לנקודות שבהן מילה יושבת בול בחלון, אחרת נעצרים על חצי מילה
    snap:{snapTo:gsap.utils.snap(1/(n-1)),duration:.25,delay:.05,ease:"power2.inOut"}}});
  for(let i=1;i<n;i++){
    // כל מעבר מזיז את העמודה בדיוק בגובה שורה אחת. המדידה בפונקציה, כדי שתתעדכן ב-refresh
    tl.to(stack,{y:()=>-i*words[0].offsetHeight,ease:"power2.inOut",duration:1},i-1)
      .to(subs[i-1],{opacity:0,duration:.35},(i-1)+.1)
      .to(subs[i],{opacity:1,duration:.45},(i-1)+.4);
  }
  // הנקודות נגזרות מהמצב בפועל ולא מטוויין נפרד, ולכן הן תמיד מסונכרנות
  ScrollTrigger.create({trigger:".ws",start:"top top",end:"bottom bottom",
    onUpdate:self=>{const i=Math.round(self.progress*(n-1));
      dots.forEach((d,k)=>d.classList.toggle("on",k===i));}});
})();`,
  runway:false,
  note:"החלון הוא `overflow:clip` בגובה שורה אחת, והעמודה שבתוכו נעה בדיוק בגובה שורה בכל מעבר. הרוחב לא מוגדר בכלל: קונטיינר עמודה מקבל את רוחב הילד הרחב ביותר, ולכן המשפט מתרחב ומתכווץ מעצמו סביב המילה. **ה-`snap` הוא מה שהופך את זה לשמיש**: בלעדיו אפשר לעצור באמצע גלגול ולראות חצי מילה למעלה וחצי למטה. המדידה של גובה השורה נעשית בתוך פונקציה (`y:()=>...`) ולא כמספר קבוע, כך שהיא מחושבת מחדש בכל refresh וגם אחרי טעינת הפונט."
},
{
  id:"g61", cat:"gsap", name:"תמונה שמתאספת מרצועות בגלילה", tech:"GSAP · ScrollTrigger scrub", status:"ממתין",
  desc:"התמונה מפורקת לרצועות אנכיות שנעות בכיוונים מתחלפים ובקצב שונה. ככל שגוללים הן מתיישרות, וברגע מסוים התמונה מתאחדת לחתיכה אחת.",
  when:"מעבר בין פרקים, פתיחת סקשן עבודות, רגע חשיפה של מוצר. עובד גם הפוך: התמונה מתפרקת כשממשיכים לגלול.",
  libs:["gsap","ScrollTrigger"],
  css:`.bl{height:300vh;position:relative}
.bl-stick{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden}
.bl-frame{position:relative;width:min(880px,90vw);aspect-ratio:16/10;border-radius:18px;overflow:hidden;
  display:flex;background:var(--card)}
/* כל רצועה מציגה חלק אחר של אותה תמונה: הרקע רחב פי מספר הרצועות */
.bl-slice{flex:1;height:100%;background-image:linear-gradient(115deg,#3b5bdb,#0b7285 34%,#2b8a3e 58%,#e8590c 82%,#5f3dc4);
  background-repeat:no-repeat;will-change:transform}
.bl-cap{position:absolute;bottom:9vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}
.bl-after{padding:14vh var(--gutter);max-width:min(680px,92vw);margin-inline:auto;text-align:center;
  color:var(--muted);font-size:17px;line-height:1.9}`,
  html:`<div class="bl"><div class="bl-stick">
  <div class="bl-frame"></div>
  <p class="bl-cap">גלול. הרצועות מתיישרות והתמונה מתאחדת.</p>
</div></div>
<p class="bl-after">במקום גרדיאנט אפשר לשים תמונה אחת של הלקוח, ואותו קוד יפרק אותה לרצועות בלי לחתוך שום קובץ מראש.</p>`,
  js:`(function(){
  const N=9;
  const frame=document.querySelector(".bl-frame");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const slices=[];
  for(let i=0;i<N;i++){
    const s=document.createElement("div");
    s.className="bl-slice";
    // הרקע ברוחב הפריים כפול מספר הרצועות, וכל רצועה מוסטת בחלק שלה
    s.style.backgroundSize=(N*100)+"% 100%";
    s.style.backgroundPosition=(i/(N-1)*100)+"% 50%";
    frame.appendChild(s);slices.push(s);
  }
  if(reduce)return;
  gsap.fromTo(slices,
    {yPercent:i=>(i%2?1:-1)*(60+i*7),opacity:.25},
    {yPercent:0,opacity:1,ease:"none",
     scrollTrigger:{trigger:".bl",start:"top top",end:"bottom bottom",scrub:.6}});
})();`,
  runway:false,
  note:"הטריק כולו ב-`background-size` וב-`background-position`: כל רצועה נושאת את אותה תמונה ברוחב של הפריים כפול מספר הרצועות, וההיסט שלה בוחר איזה חלק היא מראה. לכן אין צורך לחתוך קבצים מראש, וגם החלפת התמונה היא שורה אחת. `yPercent` מקבל פונקציה שמקבלת אינדקס, וזו הדרך של GSAP לתת לכל אלמנט ערך משלו בלי לולאה. שים לב שהתנועה בכיוונים מתחלפים לפי זוגי ואי-זוגי, ושהמרחק גדל עם האינדקס: שני הדברים יחד הם מה שיוצר תחושת פירוק ולא תחושת גל."
},
{
  id:"g62", cat:"gsap", name:"לפני ואחרי שנחשף בגלילה", tech:"GSAP · ScrollTrigger · clip-path", status:"ממתין",
  desc:"שתי תמונות באותה מסגרת, וקו החשיפה נע ביניהן לפי הגלילה במקום לפי גרירה. המבקר לא צריך לדעת שאפשר לגרור, זה קורה לו מעצמו.",
  when:"שיפוץ, שיניים, אסתטיקה, כושר, ניקיון, עיצוב מחדש, לפני ואחרי של אתר. הגרסה הפסיבית של ההוכחה החזקה ביותר שיש.",
  libs:["gsap","ScrollTrigger"],
  css:`.ba2{height:280vh;position:relative}
.ba2-stick{position:sticky;top:0;height:100vh;display:grid;place-items:center;overflow:hidden;padding-inline:var(--gutter)}
.ba2-frame{position:relative;width:min(900px,92vw);aspect-ratio:16/10;border-radius:var(--r);overflow:hidden;
  border:1px solid var(--line)}
.ba2-layer{position:absolute;inset:0;border-radius:0;font-size:0}
/* השכבה העליונה היא "לפני", והיא נחתכת מימין לשמאל, בכיוון הקריאה בעברית */
.ba2-before{clip-path:inset(0 0 0 0)}
.ba2-tag{position:absolute;top:16px;z-index:3;background:rgba(0,0,0,.62);color:#fff;font-size:13px;
  padding:6px 14px;border-radius:999px;backdrop-filter:blur(6px)}
.ba2-tag.is-before{right:16px}
.ba2-tag.is-after{left:16px}
/* הקו מתחיל שקוף: לפני שהגלילה נכנסת לטווח הוא היה נראה כפס לבן דבוק לקצה */
.ba2-edge{position:absolute;top:0;bottom:0;width:2px;background:#fff;z-index:4;
  box-shadow:0 0 0 1px rgba(0,0,0,.18);left:0;opacity:0}
.ba2-cap{position:absolute;bottom:8vh;inset-inline:0;text-align:center;color:var(--muted);font-size:15px}`,
  html:`<div class="ba2"><div class="ba2-stick">
  <div class="ba2-frame">
    <div class="ph ba2-layer ba2-after ph-d"></div>
    <div class="ph ba2-layer ba2-before ph-b"></div>
    <span class="ba2-tag is-before">לפני</span>
    <span class="ba2-tag is-after">אחרי</span>
    <i class="ba2-edge"></i>
  </div>
  <p class="ba2-cap">גלול. קו החשיפה נע מימין לשמאל.</p>
</div></div>`,
  js:`(function(){
  const before=document.querySelector(".ba2-before"),edge=document.querySelector(".ba2-edge"),
        frame=document.querySelector(".ba2-frame");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){before.style.clipPath="inset(0 0 0 50%)";edge.style.left="50%";return;}
  const state={p:0};
  ScrollTrigger.create({
    trigger:".ba2",start:"top top",end:"bottom bottom",scrub:.5,
    onUpdate:self=>{
      // p הוא כמה נחשף מ"אחרי". החיתוך משמאל מותיר את "לפני" בימין
      const p=self.progress;
      before.style.clipPath="inset(0 0 0 "+(p*100).toFixed(2)+"%)";
      edge.style.left=(p*100).toFixed(2)+"%";
      edge.style.opacity=p>0.002&&p<0.998?1:0;
    }
  });
})();`,
  runway:false,
  note:"אותו רעיון של סליידר ההשוואה, בלי ידית: הגלילה היא הידית. `clip-path:inset(0 0 0 X%)` משאיר את מה שמימין ל-X, ולכן בעברית \"לפני\" יושב בימין והחשיפה מתקדמת שמאלה, בכיוון שבו קוראים. הקו הלבן ממוקם באחוזים באותו ערך עצמו, ולכן הוא לעולם לא מתפצל מהחיתוך גם כשמשנים גודל חלון, ואין כאן שום מדידה בפיקסלים. הוא נעלם בקצוות כי קו על גבול המסגרת נראה כמו פגם. במצב חיסכון בתנועה מציגים חצי חצי סטטי, שזה עדיין מסר מובן."
},
];
