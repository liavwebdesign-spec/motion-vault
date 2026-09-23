// Heroes family (22.9.2026). The intake calls the hero "the decision that sets the tone" and told me to offer
// MV:h4 with a link, but no hero demo existed in the vault: heroes lived as ten lines of prose in library/heroes.md.
// Eight live heroes, one entrance moment each, every one with a mobile layout. The ids match library/heroes.md.
// The thin logo row at the top of each demo is scaffolding so the hero reads as a page top; the header itself is
// its own category (hd1 to hd8). Media comes from the vault: assets/media/demo-a|b.jpg and demo-a.mp4.

const E = "cubic-bezier(.2,.6,.2,1)";

// ---- entrance: one observer, class .is-in on the hero root, children ordered by --i ----
const REVEAL_CSS = `
.rv{opacity:0;transform:translateY(18px);transition:opacity .5s ${E},transform .5s ${E}}
.is-in .rv{opacity:1;transform:none;transition-duration:.7s;transition-delay:calc(var(--i,0) * 90ms)}
@media (prefers-reduced-motion:reduce){.rv,.is-in .rv{transition-duration:.01ms!important;transition-delay:0s!important}}`;

const REVEAL_JS = `
// in view = fire. Measured directly on scroll and resize, not through IntersectionObserver:
// an observer does not update while the tab is throttled (and on a real site the hero is usually
// on screen at load anyway), and an entrance that never fires leaves the hero invisible.
function inView(el,f){
  function chk(){
    var r=el.getBoundingClientRect();
    if(r.top<innerHeight*.9&&r.bottom>0){off();f();}
  }
  function off(){removeEventListener("scroll",chk);removeEventListener("resize",chk);}
  addEventListener("scroll",chk,{passive:true}); addEventListener("resize",chk);
  requestAnimationFrame(chk); setTimeout(chk,300);
}
function enter(root){
  root.querySelectorAll(".rv").forEach(function(el,i){if(!el.style.getPropertyValue("--i"))el.style.setProperty("--i",i);});
  inView(root,function(){root.classList.add("is-in");});
}`;

// ---- demo scaffolding: the frame and the fake top row. Not part of the hero you copy ----
const FRAME_CSS = `
/* ---- demo frame and top row (scaffolding, not part of the hero) ---- */
.hf{position:relative;margin-inline:var(--gutter);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;background:var(--bg);isolation:isolate}
.hf-top{position:absolute;inset-inline:0;top:0;z-index:6;display:flex;align-items:center;gap:24px;padding:20px 28px;font-size:15px;font-weight:500}
.hf-top b{font-size:18px;font-weight:800}
.hf-top nav{display:flex;gap:18px;margin-inline-start:auto;opacity:.8}
@media (max-width:760px){.hf-top nav{display:none}}
.hbtn{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 28px;border-radius:12px;background:var(--accent);color:var(--accent-ink);
  font-size:16px;font-weight:600;white-space:nowrap;transition:transform .18s ${E},box-shadow .3s ${E}}
.hbtn.ghost{background:none;color:inherit;box-shadow:inset 0 0 0 1.5px currentColor}
@media (hover:hover) and (pointer:fine){.hbtn:hover{transform:translateY(-2px)}}
.hkick{font-size:14px;font-weight:600;letter-spacing:.02em;opacity:.75}
.hlead{margin:0;font-size:clamp(17px,1.2vw,20px);line-height:1.55;opacity:.82}
.hmicro{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:14px;opacity:.7}
.hcta{display:flex;flex-wrap:wrap;gap:12px}
${REVEAL_CSS}`;

const TOP = (light) => `<div class="hf-top"${light ? "" : ' style="color:var(--bg)"'}><b>לוגו</b><nav><span>שירותים</span><span>פרויקטים</span><span>אודות</span></nav></div>`;
const IMG = (f, alt) => `<img src="../assets/media/${f}" alt="${alt}" loading="lazy" decoding="async">`;

export default [
{
  id:"h1", cat:"hero", name:"הירו ממורכז קלאסי עם ויז'ואל מציץ", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"כותרת ממורכזת, משפט הסבר, זוג כפתורים, שורת אמון, ומתחת ויז'ואל רחב שנחתך בקצה המסך. הכותרת והשורות עולות בזו אחר זו, והוויז'ואל נחשף אחרון.",
  when:"שירות או מוצר שהמסר שלו מילולי: ייעוץ, פיננסים, תוכנה, מערכת. ברירת המחדל של העור השקט. לא לעסק שמוכר חלל, אוכל, גוף או חומר, שם הצילום צריך להוביל.",
  libs:[],
  css:`${FRAME_CSS}
.h1h{display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;padding:112px 28px 0;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 7%,var(--bg)),var(--bg))}
.h1h h3{margin:0;max-width:16ch;font-size:clamp(36px,4.6vw,68px);line-height:1.04;font-weight:700;text-wrap:balance}
.h1h .hlead{max-width:46ch}
.h1-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 28px;font-size:14px;opacity:.72}
.h1-trust span{display:inline-flex;align-items:center;gap:8px}
.h1-trust i{width:7px;height:7px;border-radius:50%;background:var(--accent);display:inline-block}
.h1-vis{width:min(1000px,100%);margin-top:16px;border-radius:18px 18px 0 0;overflow:hidden;box-shadow:0 40px 80px color-mix(in srgb,var(--ink) 22%,transparent);
  clip-path:inset(0 0 100% 0 round 18px 18px 0 0);transition:clip-path .9s ${E}}
.is-in .h1-vis{clip-path:inset(0 0 0 0 round 18px 18px 0 0);transition-delay:.35s}
.h1-vis img{display:block;width:100%;aspect-ratio:16/8;object-fit:cover}
@media (prefers-reduced-motion:reduce){.h1-vis{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:760px){.h1h{padding:96px 20px 0;gap:20px}.h1-vis{margin-top:8px}.h1-vis img{aspect-ratio:4/3}}`,
  html:`<div class="hf">${TOP(true)}
  <section class="h1h" id="h1">
    <span class="hkick rv">ייעוץ פיננסי לחברות</span>
    <h3 class="rv">מספרים שמסבירים את עצמם, ולא דוח שאף אחד לא פותח</h3>
    <p class="hlead rv">ליווי חודשי לבעלי עסקים: תזרים, תמחור והחלטות, בשפה שאפשר להסביר בה לשותף.</p>
    <div class="hcta rv"><a class="hbtn" href="#h1">לשיחת היכרות</a><a class="hbtn ghost" href="#h1">איך זה עובד</a></div>
    <div class="h1-trust rv"><span><i></i>מלווים 40 חברות</span><span><i></i>דוח חודשי עד ה-10</span><span><i></i>בלי התחייבות לשנה</span></div>
    <div class="h1-vis">${IMG("demo-b.jpg", "צילום מהמשרד")}</div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h1"));`,
  note:"הוויז'ואל נחתך בקצה התחתון ולא יושב שלם, וזה מה שמזמין לגלול: העין יודעת שיש המשך. הוא נחשף ב-clip-path מלמעלה למטה ולא ב-opacity, כך שהוא מרגיש כמו וילון שנפתח ולא כמו תמונה שדולקת. הטקסט עולה לפניו בדירוג של 90 מילישניות, והוויז'ואל מאחר בכוונה ב-350, כי הוא הדבר הכבד. `text-wrap:balance` שומר על שורות מאוזנות בכותרת בעברית."
},
{
  id:"h2", cat:"hero", name:"הירו טקסט ותמונה עם כרטיסי נתון", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"טקסט בצד אחד, תמונה גבוהה בצד השני, ושני כרטיסי נתון שיושבים על קצוות התמונה ונכנסים אחרונים. בלי קישוט: התמונה והנתון עושים את העבודה.",
  when:"עסק שיש לו נתון אמיתי להראות (שנים, לקוחות, זמן תגובה): מערכת, שירות מקצועי, קליניקה, חברת השמה. לא כשהמספרים מומצאים, שם הם מורידים אמון.",
  libs:[],
  css:`${FRAME_CSS}
.h2h{display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:56px;padding:112px 28px 72px;background:var(--bg)}
.h2-txt{display:flex;flex-direction:column;gap:20px}
.h2h h3{margin:0;max-width:14ch;font-size:clamp(34px,3.8vw,58px);line-height:1.06;font-weight:700}
.h2-vis{position:relative}
.h2-vis img{position:relative;display:block;width:100%;aspect-ratio:4/4.4;object-fit:cover;border-radius:20px}
.h2-card{position:absolute;z-index:2;background:var(--card);border-radius:14px;padding:16px 20px;box-shadow:0 12px 32px color-mix(in srgb,var(--ink) 12%,transparent)}
.h2-card b{display:block;font-size:26px;line-height:1.1}
.h2-card span{font-size:13px;color:var(--muted)}
.h2-c1{inset-block-start:14%;inset-inline-start:-32px}
.h2-c2{inset-block-end:12%;inset-inline-end:-24px}
@media (max-width:860px){.h2h{grid-template-columns:1fr;gap:32px;padding:96px 20px 56px}.h2-card{display:none}.h2-vis img{aspect-ratio:4/3}}`,
  html:`<div class="hf">${TOP(true)}
  <section class="h2h" id="h2">
    <div class="h2-txt">
      <span class="hkick rv">מרפאת שיניים, רמת גן</span>
      <h3 class="rv">נכנסים בחשש, יוצאים עם תוכנית</h3>
      <p class="hlead rv">בדיקה ראשונה של 40 דקות, צילום, ותוכנית טיפול מודפסת עם מחירים. בלי הפתעות בכיסא.</p>
      <div class="hcta rv"><a class="hbtn" href="#h2">לקביעת בדיקה</a><a class="hbtn ghost" href="#h2">המחירון שלנו</a></div>
      <div class="hmicro rv"><span>חניה בבניין</span><span>מרדים מוסמך</span><span>הסדר עם כל הקופות</span></div>
    </div>
    <div class="h2-vis rv" style="--i:2">${IMG("demo-a.jpg", "צילום מהמרפאה")}
      <div class="h2-card h2-c1 rv" style="--i:5"><b>40 דק׳</b><span>בדיקה ראשונה</span></div>
      <div class="h2-card h2-c2 rv" style="--i:6"><b>12 שנה</b><span>באותה כתובת</span></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h2"));`,
  note:"גרסה ראשונה ישבה על כתם צבע אורגני (blob) מאחורי התמונה, וליאב פסל אותו: נישתי ולא מתחבר (23.9.2026). עכשיו אין קישוט בכלל. התמונה גבוהה (4:4.4) כדי לאזן עמודת טקסט של חמש שורות, והכרטיסים יוצאים מקצה התמונה ב-32 וב-24 פיקסלים, מספיק כדי להיראות מונחים עליה ולא כדי לצוף באוויר. הם יושבים על inset לוגי ולכן מתהפכים לבד ב-RTL וב-LTR, נעלמים במובייל, ונכנסים אחרונים (--i 5 ו-6) כי הם הפרט, לא המסר. אם אין נתון אמיתי, בוחרים הירו אחר."
},
{
  id:"h3", cat:"hero", name:"הירו מדיה מלאה עם שכבת קריאות", tech:"CSS · JS · video", status:"ממתין", runway:false,
  desc:"וידאו או צילום שממלא את המסך, שכבת גרדיאנט שמבטיחה שהטקסט קריא, וכותרת שעולה מתוך חיתוך. הווידאו מתחיל רק כשהוא על המסך, ובהעדפת תנועה מופחתת נשאר הפוסטר.",
  when:"עסק שמוכר חוויה, מקום או חומר: מסעדה, מלון, אולם אירועים, סטודיו, תיירות, קבלן. דורש צילום אמיתי וטוב. לא לאתר שירות עם תמונות סטוק.",
  libs:[],
  css:`${FRAME_CSS}
.h3h{position:relative;min-height:min(78vh,720px);display:flex;flex-direction:column;justify-content:flex-end;gap:20px;padding:112px 28px 56px;color:var(--bg);overflow:hidden}
.h3-media{position:absolute;inset:0;z-index:-2}
.h3-media img,.h3-media video{width:100%;height:100%;object-fit:cover;display:block}
.h3-media video{position:absolute;inset:0;opacity:0;transition:opacity .6s ${E}}
.h3-media video.on{opacity:1}
.h3-scrim{position:absolute;inset:0;z-index:-1;background:linear-gradient(to top,color-mix(in srgb,var(--ink) 88%,transparent) 0%,color-mix(in srgb,var(--ink) 55%,transparent) 42%,transparent 78%)}
.h3h h3{margin:0;max-width:15ch;font-size:clamp(38px,5.4vw,84px);line-height:1;font-weight:700}
.h3-line{overflow:hidden}
.h3-line span{display:block;transform:translateY(105%);transition:transform .8s ${E}}
.is-in .h3-line span{transform:none}
.is-in .h3-line:nth-of-type(2) span{transition-delay:.1s}
.h3h .hlead{max-width:42ch;opacity:.9}
@media (prefers-reduced-motion:reduce){.h3-line span{transition-duration:.01ms!important}}
@media (max-width:760px){.h3h{padding:96px 20px 40px;min-height:74vh}}`,
  html:`<div class="hf">${TOP(false)}
  <section class="h3h" id="h3">
    <div class="h3-media">${IMG("demo-a.jpg", "צילום מהמקום")}<video muted loop playsinline preload="none" poster="../assets/media/demo-a.jpg" data-src="../assets/media/demo-a.mp4"></video></div>
    <span class="h3-scrim"></span>
    <span class="hkick rv">ביסטרו, נמל תל אביב</span>
    <h3><span class="h3-line"><span>ארוחת ערב</span></span><span class="h3-line"><span>שנמשכת כל הערב</span></span></h3>
    <p class="hlead rv" style="--i:2">מטבח פתוח, תפריט שמתחלף כל שבועיים, ורשימת יינות קטנה שאפשר לסמוך עליה.</p>
    <div class="hcta rv" style="--i:3"><a class="hbtn" href="#h3">להזמנת שולחן</a><a class="hbtn ghost" href="#h3">לתפריט הערב</a></div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h3"), v=root.querySelector("video");
  enter(root);
  var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  // the video is fetched only when the hero is on screen, and never under reduced motion: the poster stays
  if(!reduce)inView(root,function(){
    v.src=v.dataset.src; v.muted=true; v.setAttribute("autoplay","");
    // if the browser blocks autoplay, the class is never added and the poster simply stays: the hero still works
    var p=v.play(); if(p&&p.then)p.then(function(){v.classList.add("on");},function(){});
    else v.classList.add("on");
  });
})();`,
  note:"שכבת הקריאות היא חובה ולא קישוט: גרדיאנט מכיוון הטקסט (כאן מלמטה), שמגיע ל-88% מעל האזור שבו יושבות המילים. בלעדיה הכותרת תיפול על אזור בהיר בצילום ותיעלם, וזה נראה רק בצילום מסך אמיתי. הכותרת עולה מתוך חיתוך (overflow hidden על השורה, translateY 105% על הפנים), שתי שורות בהפרש של 100 מילישניות. הווידאו נטען ב-data-src רק כשהוא על המסך, מתחיל שקוף ומתמזג מעל הפוסטר, וב-reduced-motion לא נטען בכלל. אם הדפדפן חוסם הפעלה אוטומטית (קורה בחלונית של קלוד קוד ובחלק מהמובייל), המחלקה לא נוספת והפוסטר פשוט נשאר, וההירו עדיין שלם: זו הסיבה שהפוסטר חייב להיות פריים אמיתי מהסרטון ולא תמונה אחרת."
},
{
  id:"h4", cat:"hero", name:"הירו חצי חצי עם הפרדה חדה", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"חצי אחד צילום שמגיע עד הקצה, חצי שני טקסט על משטח נקי, בלי מעבר רך ביניהם. התמונה נכנסת בהחלקה מהצד והטקסט עולה.",
  when:"אדריכלות, נדל״ן, עיצוב פנים, אופנה, מותג מוצר. כשיש צילום אחד חזק שמספר את הסיפור. עובד יפה גם כשהטקסט קצר.",
  libs:[],
  css:`${FRAME_CSS}
.h4h{display:grid;grid-template-columns:1fr 1fr;min-height:min(74vh,660px)}
/* the text half sits at the start side, under the logo; the photo takes the end side. Nothing light-on-light */
.h4-vis{position:relative;overflow:hidden;order:2}
.h4-vis img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.08);transition:transform 1.2s ${E}}
.is-in .h4-vis img{transform:none}
.h4-txt{display:flex;flex-direction:column;justify-content:center;gap:24px;padding:112px 48px 56px;background:var(--card)}
.h4h h3{margin:0;max-width:13ch;font-size:clamp(34px,3.8vw,60px);line-height:1.04;font-weight:700}
.h4-meta{display:grid;gap:10px;font-size:15px;color:var(--muted);border-top:1px solid var(--line);padding-top:20px}
.h4-meta div{display:flex;justify-content:space-between;gap:16px}
.h4-meta b{color:var(--ink);font-weight:600}
@media (prefers-reduced-motion:reduce){.h4-vis img{transition-duration:.01ms!important}}
@media (max-width:860px){.h4h{grid-template-columns:1fr;min-height:0}.h4-vis{aspect-ratio:4/3}.h4-vis img{position:relative}.h4-txt{padding:40px 20px 48px}}`,
  html:`<div class="hf"><div class="hf-top"><b>לוגו</b></div>
  <section class="h4h" id="h4">
    <div class="h4-vis">${IMG("demo-b.jpg", "צילום מפרויקט")}</div>
    <div class="h4-txt">
      <span class="hkick rv">סטודיו לאדריכלות</span>
      <h3 class="rv">בתים שנבנים מהאור של אחר הצהריים</h3>
      <p class="hlead rv">שמונה פרויקטים בשנה, לא יותר. ליווי מהסקיצה ועד היום שנכנסים.</p>
      <div class="hcta rv"><a class="hbtn" href="#h4">לתיק העבודות</a></div>
      <div class="h4-meta rv"><div><span>בית פרטי, הרצליה</span><b>2026</b></div><div><span>שטח</span><b>240 מ״ר</b></div></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h4"));`,
  note:"ההפרדה נשארת חדה בכוונה: אין רדיוס, אין צל ואין גרדיאנט בין החצאים, וזה מה שנותן את האופי האדריכלי. התמונה מתחילה מוגדלת ב-8% וחוזרת ל-100 לאורך 1.2 שניות, תנועה איטית מספיק כדי להיקרא כנשימה ולא כזום. במובייל היא הופכת ליחס 4:3 מעל הטקסט, כי חצי מסך לכל אחד בטלפון נותן שני חצאים חנוקים. שורת המטא למטה היא מה שהופך אותו מ״יפה״ ל״מקצועי״: עובדה אחת אמיתית מתחת לכפתור."
},
{
  id:"h5", cat:"hero", name:"הירו טיפוגרפי טהור", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"אין תמונה. הכותרת הענקית היא הוויז'ואל, ומסביבה פרטים קטנים: קו, תאריך, מיקום, ושורת פעולה. המילים נכנסות אחת אחרי השנייה מלמטה.",
  when:"כשהטיפוגרפיה היא המוצר, או כשאין נכס ויזואלי בכלל ולא רוצים סטוק: סטודיו, מותג, אירוע, כנס, פרסום, ייעוץ בכיר. דורש פונט תצוגה עם נוכחות (library/fonts.md, קבוצת X או L).",
  libs:[],
  css:`${FRAME_CSS}
.h5h{position:relative;min-height:min(74vh,660px);display:flex;flex-direction:column;justify-content:center;gap:32px;padding:112px 28px 56px;background:var(--ink);color:var(--bg);overflow:hidden}
.h5h h3{margin:0;font-size:clamp(44px,9vw,150px);line-height:.94;font-weight:700;letter-spacing:-.01em}
.h5-w{display:inline-block;overflow:hidden;vertical-align:bottom}
.h5-w span{display:inline-block;transform:translateY(110%);transition:transform .8s ${E}}
.is-in .h5-w span{transform:none;transition-delay:calc(var(--i) * 70ms)}
.h5-rule{height:1px;background:color-mix(in srgb,var(--bg) 30%,transparent);transform-origin:right;transform:scaleX(0);transition:transform .9s ${E} .5s}
.is-in .h5-rule{transform:none}
.h5-foot{display:flex;flex-wrap:wrap;gap:16px 40px;align-items:center;font-size:15px;opacity:.78}
.h5-foot .hbtn{opacity:1}
@media (prefers-reduced-motion:reduce){.h5-w span,.h5-rule{transition-duration:.01ms!important;transition-delay:0s!important}}
@media (max-width:760px){.h5h{padding:96px 20px 40px;gap:24px}}`,
  html:`<div class="hf">${TOP(false)}
  <section class="h5h" id="h5">
    <span class="hkick rv">סטודיו למיתוג</span>
    <h3><span class="h5-w" style="--i:0"><span>שפה</span></span> <span class="h5-w" style="--i:1"><span>שאי אפשר</span></span> <span class="h5-w" style="--i:2"><span>לבלבל</span></span></h3>
    <span class="h5-rule"></span>
    <div class="h5-foot"><a class="hbtn" href="#h5">לדבר איתנו</a><span>מיתוג · אריזה · דיגיטל</span><span>תל אביב</span></div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h5"));`,
  note:"כל מילה עטופה בחלון עם overflow:hidden ונוסעת מ-110% למטה, ולכן היא נחשפת ולא מופיעה. 70 מילישניות בין מילה למילה, מהירות קריאה ולא מצגת. הקו נמתח מימין (transform-origin:right) כי זה כיוון הקריאה בעברית, ובאנגלית הופכים ל-left. בעברית גובה השורה בכותרת ענקית חייב לרדת מתחת ל-1 (כאן .94) כי הבלוק הגליפי גבוה, אחרת נפער רווח בין השורות."
},
{
  id:"h6", cat:"hero", name:"הירו בנטו", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"כרטיס ראשי גדול עם הכותרת והפעולה, ולצידו שלושה כרטיסים קטנים עם תוכן אמיתי: נתון, צילום, ומצב חי. הכרטיסים נכנסים בדירוג אלכסוני.",
  when:"מערכת, SaaS, דשבורד, סוכנות עם כמה שירותים, אתר שמציג כמה עולמות בבת אחת. גם כשיש תוכן דינמי להראות (משמרות, מחירים, זמינות).",
  libs:[],
  css:`${FRAME_CSS}
.h6h{display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:auto auto;gap:16px;padding:112px 28px 56px;background:var(--bg)}
.h6-card{position:relative;overflow:hidden;border-radius:20px;background:var(--card);border:1px solid var(--line);padding:32px}
.h6-main{grid-row:span 2;display:flex;flex-direction:column;justify-content:flex-end;gap:20px;background:var(--ink);color:var(--bg);border-color:transparent;min-height:340px}
.h6-main h3{margin:0;max-width:13ch;font-size:clamp(32px,3.4vw,52px);line-height:1.05;font-weight:700}
.h6-main .hlead{opacity:.78}
.h6-num b{display:block;font-size:clamp(36px,4vw,56px);line-height:1;font-weight:700}
.h6-num span{font-size:14px;color:var(--muted)}
.h6-img{padding:0;min-height:150px}
.h6-img img{width:100%;height:100%;object-fit:cover;display:block}
.h6-live{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600}
.h6-live i{width:9px;height:9px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 50%,transparent);animation:h6p 2.4s ${E} infinite}
@keyframes h6p{70%{box-shadow:0 0 0 12px transparent}100%{box-shadow:0 0 0 0 transparent}}
@media (prefers-reduced-motion:reduce){.h6-live i{animation:none}}
@media (max-width:860px){.h6h{grid-template-columns:1fr;padding:96px 20px 48px}.h6-main{grid-row:auto;min-height:0;padding:28px}}`,
  html:`<div class="hf">${TOP(true)}
  <section class="h6h" id="h6">
    <div class="h6-card h6-main rv">
      <span class="hkick">ניהול משמרות לעסקים</span>
      <h3>כל המשמרות במקום אחד, בלי אקסל</h3>
      <p class="hlead">סידור עבודה, החלפות, ודיווח שעות שמגיע ישר לשכר.</p>
      <div class="hcta"><a class="hbtn" href="#h6">להתחיל בחינם</a></div>
    </div>
    <div class="h6-card h6-num rv"><b>6 דק׳</b><span>זמן ממוצע לבניית סידור שבועי</span></div>
    <div class="h6-card h6-img rv">${IMG("demo-b.jpg", "צילום מהמערכת")}</div>
    <div class="h6-card rv" style="grid-column:1/-1"><span class="h6-live"><i></i>14 עובדים מסומנים במשמרת עכשיו</span></div>
  </section>
</div>`,
  js:`${REVEAL_JS}
enter(document.getElementById("h6"));`,
  note:"בנטו נופל כשכל התאים באותו גודל ובאותו סוג תוכן. כאן כל תא הוא סוג אחר: מסר, נתון, צילום, מצב חי, והכרטיס הראשי תופס שתי שורות כדי שתהיה היררכיה ולא רשת. הנקודה הפועמת היא ההבדל בין ״מערכת״ ל״צילום מסך״: היא מרמזת שמשהו קורה עכשיו. היא כבויה ב-reduced-motion. במובייל הכל נערם לעמודה, והכרטיס הראשי מאבד את הגובה הכפוי."
},
{
  id:"h7", cat:"hero", name:"הירו עם שאלון ניתוב", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"במקום שני כפתורים כלליים, שאלה אחת עם שתיים עד שלוש תשובות. הבחירה מחליפה את הכותרת, את המשפט ואת הפעולה, ורק אז שולחת לעמוד הנכון.",
  when:"עסק ששני קהלים שלו מחפשים דברים שונים: לבית מול לעסק, שכיר מול עצמאי, מכירה מול השכרה, פרטי מול מוסדי. במקום לפצל את האתר, מפצלים את הרגע הראשון.",
  libs:[],
  css:`${FRAME_CSS}
.h7h{display:flex;flex-direction:column;gap:28px;padding:112px 28px 64px;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 8%,var(--bg)),var(--bg))}
.h7h h3{margin:0;max-width:15ch;font-size:clamp(34px,4.2vw,62px);line-height:1.04;font-weight:700}
.h7-q{display:flex;flex-wrap:wrap;align-items:center;gap:12px;font-size:15px}
.h7-q p{margin:0;font-weight:600}
.h7-opt{min-height:52px;padding:0 24px;border-radius:999px;border:1.5px solid color-mix(in srgb,var(--ink) 16%,transparent);background:var(--card);color:var(--ink);
  font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:border-color .2s ${E},background .2s ${E},color .2s ${E}}
.h7-opt[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
@media (hover:hover) and (pointer:fine){.h7-opt:hover{border-color:var(--ink)}}
.h7-swap{display:grid;gap:16px;max-width:52ch}
.h7-swap>*{transition:opacity .25s ${E},transform .25s ${E}}
.h7h.swapping .h7-swap>*{opacity:0;transform:translateY(8px)}
.h7-list{display:flex;flex-wrap:wrap;gap:8px 16px;margin:0;padding:0;list-style:none;font-size:15px;color:var(--muted)}
.h7-list li{display:flex;align-items:center;gap:8px}
.h7-list li::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent)}
@media (max-width:760px){.h7h{padding:96px 20px 48px;gap:24px}.h7-opt{flex:1 1 40%}}`,
  html:`<div class="hf">${TOP(true)}
  <section class="h7h" id="h7">
    <span class="hkick rv">חשמל, תקשורת ומיגון</span>
    <h3 class="rv">מה אתם צריכים לפתור?</h3>
    <div class="h7-q rv"><p>האתר הזה מדבר עם:</p>
      <button class="h7-opt" type="button" aria-pressed="true" data-k="home">בית פרטי</button>
      <button class="h7-opt" type="button" aria-pressed="false" data-k="biz">עסק או משרד</button>
    </div>
    <div class="h7-swap rv">
      <p class="hlead" data-f="lead">נקודות רשת, מצלמות ובית חכם. מגיעים לסיור, ומתכננים לפני שסוגרים את הטיח.</p>
      <ul class="h7-list" data-f="list"><li>תכנון לפני שיפוץ</li><li>מצלמות ואזעקה</li><li>תאורה ותריסים</li></ul>
      <div class="hcta"><a class="hbtn" href="#h7" data-f="cta">לתיאום סיור בבית</a></div>
    </div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h7"); enter(root);
  var DATA={
    home:{lead:"נקודות רשת, מצלמות ובית חכם. מגיעים לסיור, ומתכננים לפני שסוגרים את הטיח.",
      list:["תכנון לפני שיפוץ","מצלמות ואזעקה","תאורה ותריסים"],cta:"לתיאום סיור בבית"},
    biz:{lead:"תשתית שלא נופלת באמצע יום עבודה: רשת, שרתים, גיבוי ותמיכה שמגיעה באותו יום.",
      list:["תמיכה שוטפת","ענן וגיבוי","בקרת כניסה"],cta:"לשיחה עם מנהל טכני"}
  };
  var opts=[].slice.call(root.querySelectorAll(".h7-opt"));
  var f={lead:root.querySelector('[data-f="lead"]'),list:root.querySelector('[data-f="list"]'),cta:root.querySelector('[data-f="cta"]')};
  function set(k,btn){
    if(btn.getAttribute("aria-pressed")==="true")return;
    opts.forEach(function(b){b.setAttribute("aria-pressed",String(b===btn));});
    // fade out, swap the text, fade in: the same three lines, not a second hero
    root.classList.add("swapping");
    setTimeout(function(){
      var d=DATA[k];
      f.lead.textContent=d.lead;
      f.list.innerHTML=d.list.map(function(t){return "<li>"+t+"</li>";}).join("");
      f.cta.textContent=d.cta;
      root.classList.remove("swapping");
    },250);
  }
  opts.forEach(function(b){b.addEventListener("click",function(){set(b.dataset.k,b);});});
})();`,
  note:"זה ההירו שמממש את מה שליאב אומר על שאלונים חכמים: במקום להכריח את המבקר לנחש איזה עמוד שלו, שואלים אותו שאלה אחת. הבחירה לא מנווטת מיד, היא מחליפה שלוש שורות במקום, ורק הכפתור מוביל הלאה, ולכן אין טעינת עמוד ואין חזרה. הכפתורים הם button עם aria-pressed ולא קישורים, כי הם מצב ולא יעד. ההחלפה היא דהייה של 250 מילישניות ולא אנימציית גובה, כי טקסט שמשנה אורך בזמן שהוא זז נראה שבור."
},
{
  id:"h8", cat:"hero", name:"הירו רשימת עבודות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"רשימת פרויקטים או שירותים בשורות טיפוגרפיות גדולות, וריחוף על שורה מציג את הצילום שלה בצד. במגע הצילום הראשון מוצג תמיד.",
  when:"תיק עבודות שהוא עצמו ההצעה: אדריכלות, צילום, הפקה, מיתוג, קבלן שיפוצים, יועץ עם פרויקטים בולטים. דורש בין שלושה לשישה פריטים עם שם אמיתי.",
  libs:[],
  css:`${FRAME_CSS}
.h8h{display:grid;grid-template-columns:1.25fr .75fr;gap:48px;align-items:center;padding:112px 28px 64px;background:var(--bg)}
.h8-list{display:flex;flex-direction:column}
.h8-row{display:flex;align-items:baseline;gap:16px;padding:18px 0;border-bottom:1px solid var(--line);cursor:pointer;transition:opacity .25s ${E}}
.h8-row b{font-size:clamp(26px,3vw,44px);line-height:1.08;font-weight:700;transition:transform .3s ${E}}
.h8-row span{font-size:14px;color:var(--muted);margin-inline-start:auto;white-space:nowrap}
.h8h h3{margin:0 0 8px;font-size:15px;font-weight:600;opacity:.7}
@media (hover:hover) and (pointer:fine){
  .h8-list:hover .h8-row{opacity:.45}
  .h8-list .h8-row:hover{opacity:1}
  .h8-row:hover b{transform:translateX(-10px)}
  [dir="ltr"] .h8-row:hover b{transform:translateX(10px)}
}
.h8-vis{position:relative;aspect-ratio:3/4;border-radius:20px;overflow:hidden;background:color-mix(in srgb,var(--ink) 6%,var(--bg))}
.h8-vis img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.04);transition:opacity .4s ${E},transform .6s ${E}}
.h8-vis img.on{opacity:1;transform:none}
@media (max-width:860px){.h8h{grid-template-columns:1fr;gap:28px;padding:96px 20px 48px}.h8-vis{aspect-ratio:4/3;order:-1}.h8-row b{font-size:26px}}`,
  html:`<div class="hf">${TOP(true)}
  <section class="h8h" id="h8">
    <div>
      <h3 class="rv">סטודיו לצילום אדריכלות, עבודות נבחרות</h3>
      <div class="h8-list rv" style="--i:1">
        <div class="h8-row" data-img="0" tabindex="0"><b>בית בשכונת הכרם</b><span>2026</span></div>
        <div class="h8-row" data-img="1" tabindex="0"><b>מלון בוטיק, עכו</b><span>2025</span></div>
        <div class="h8-row" data-img="0" tabindex="0"><b>משרדים בשרונה</b><span>2025</span></div>
        <div class="h8-row" data-img="1" tabindex="0"><b>בית קפה, נווה צדק</b><span>2024</span></div>
      </div>
      <div class="hcta rv" style="--i:2;margin-top:24px"><a class="hbtn" href="#h8">לכל התיק</a></div>
    </div>
    <div class="h8-vis rv" style="--i:2">${IMG("demo-a.jpg", "צילום מפרויקט")}${IMG("demo-b.jpg", "צילום מפרויקט")}</div>
  </section>
</div>`,
  js:`${REVEAL_JS}
(function(){
  var root=document.getElementById("h8"); enter(root);
  var imgs=[].slice.call(root.querySelectorAll(".h8-vis img")), rows=[].slice.call(root.querySelectorAll(".h8-row"));
  function show(i){imgs.forEach(function(im,k){im.classList.toggle("on",k===i);});}
  show(0);
  var fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
  rows.forEach(function(r){
    var i=+r.dataset.img;
    if(fine)r.addEventListener("mouseenter",function(){show(i);});
    // keyboard and touch get the same result without hover: focus, and tap
    r.addEventListener("focus",function(){show(i);});
    r.addEventListener("click",function(){show(i);});
  });
})();`,
  note:"שני דברים עושים את ההבדל: העמעום ההפוך (בריחוף על הרשימה כל השורות יורדות ל-45% והשורה שמתחתיה חוזרת ל-100), וההזזה של השם ב-10 פיקסלים לכיוון הקריאה. הצילום מתחלף בהצלבה של opacity עם scale קל, בלי לרוקן את התיבה, ולכן אין הבהוב לבן. הריחוף מותנה ב-hover:hover, ובמגע ובמקלדת אותה תוצאה מגיעה מ-focus ומ-click, כך שהשורות גם נגישות ב-tab."
}
];
