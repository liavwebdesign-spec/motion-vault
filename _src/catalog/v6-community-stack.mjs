// ערימת סקשנים שמכבדת סקשן ארוך (15.10.2026): g68, g84 ו-b37 מניחים שכל סקשן נכנס במסך. כאן הסקשן יכול להיות גבוה ממסך.
export default [
{
  id:"g153", cat:"gsap", name:"ערימת סקשנים שמכבדת סקשן ארוך", tech:"GSAP · ScrollTrigger scrub · CSS sticky", status:"ממתין", runway:false,
  desc:"ארבעה סקשנים נערמים זה על זה בגלילה. סקשן שגבוה ממסך נגלל עד סופו, נעצר כשהתחתית שלו מגיעה לתחתית המסך, ורק אז נסוג בזמן שהבא עולה מעליו. סקשן קצר פשוט נעצר ונסוג.",
  when:"תהליך עבודה, שירותים או סיפור שיש בהם סקשן אחד או יותר עם הרבה תוכן בעברית: פסקאות, רשימה, תמונה. בעיקר בטלפון, שבו כמעט כל סקשן גבוה ממסך. ארבעה עד חמישה סקשנים. כשכל הסקשנים נכנסים במסך, g68 או b37 פשוטים יותר.",
  note:"**במה זה שונה מ-g68, מ-g84 ומ-b37:** שלושתם מדביקים כל סקשן עם `top:0` ומניחים שהוא נכנס במסך. סקשן גבוה ממסך שנדבק כך נשאר תלוי בראשו, החלק התחתון שלו אף פעם לא מגיע לעין, והבא מכסה אותו. כאן ה-`top` של כל סקשן הוא `min(0px, 100dvh - גובה הסקשן)`: הסקשן נדבק כשהתחתית שלו מגיעה לתחתית המסך, כלומר רק אחרי שהגולש גלל דרכו עד הסוף. אחרי העצירה יש מרווח מנוחה (`margin-bottom` של 18svh) שבו התחתית נראית לבדה, ורק אחריו הסקשן הבא מתחיל לעלות. הנסיגה (כיווץ לכ-0.92 והחשכה) מתחילה רק עם עליית הבא, ולכן היא אף פעם לא קורית לפני שקראו את הסוף. סקשן קצר (`min-height:100lvh`) מתנהג כמו ב-g68.\n\n**מה נלקח מהמקור ומה נכתב מחדש:** ב-pen של GreenSock הסקשן הוא מסגרת בגובה מסך עם `overflow:hidden`, התוכן שלו מוזז ב-transform (גלילה מזויפת) בזמן ש-ScrollTrigger נועץ אותו, ו-`margin-bottom` שנכתב פעם אחת ב-JS דוחה את הבא. הסדר זהה: קודם התוכן עובר את הגלישה, אחר כך הסקשן נסוג. כאן במקום גלילה מזויפת יש גלילה אמיתית של העמוד, והעצירה היא `position:sticky` בלי גובה קבוע וללא קטימה. מה שזה נותן: תנופת הגלילה הטבעית בטלפון, חיפוש בדף וקישורים פנימיים עובדים, פוקוס מקלדת לא מגלגל תיבה חתוכה, ואין `margin` ב-JS לאפס בכל שינוי. את `margin-bottom` החליף מרווח המנוחה, שנכתב ב-CSS ביחידות מסך.\n\n**איך נשאר נכון בגודל מסך משתנה:** גובה כל סקשן נמדד ונכתב למשתנה `--sk-h` בשלושה מקומות: בכניסה, ב-`refreshInit` של ScrollTrigger (כל רענון, כולל סיבוב מסך) וב-ResizeObserver (פונט שנטען, שורה שנשברת אחרת). ההפחתה מגובה המסך נעשית ב-CSS ביחידת `dvh`, ולכן סרגל הכתובות בטלפון שנעלם ונגלה מתעדכן בלי JS. הגובה המינימלי הוא `lvh` ולא `svh`, כדי שהסקשנים לא יזוזו ולא ישנו את נקודות הטריגר בכל פעם שהסרגל נעלם. הטריגר הוא הסקשן הבא (`top bottom` עד `top top`), כמו ב-g68, ולכן הוא לא תלוי בגובה הסקשן היוצא.\n\n**הנסיגה:** הכיווץ וההחשכה הם משתני CSS רשומים (`@property`, בלי ירושה, כדי שתזוזה לא תחשב מחדש את כל תת-העץ) ש-GSAP מסקרב. נקודת הכיווץ (`transform-origin`) היא מרכז החלק הנראה של הסקשן, `100% - 50dvh`, ולכן סקשן גבוה מצטמצם סביב מה שרואים ולא סביב מרכזו הנסתר. ההחשכה היא שכבה שחורה מעל הסקשן ולא שקיפות שלו, מאותה סיבה כמו ב-b37: סקשן חצי שקוף מראה את הצבע של מה שמתחתיו. הסקשן האחרון לא נסוג, אחרת סוף הערימה נראה שבור.\n\n**בלי GSAP או בהפחתת תנועה:** המחלקה שמפעילה את ההדבקה (`is-stack`) נוספת רק מתוך `matchMedia` של תנועה מותרת. בלי הספרייה, או עם `prefers-reduced-motion`, הסקשנים זורמים כרגיל, בלי הדבקה, בלי נסיגה ובלי שום דבר מוסתר. בסיבוב טלפון `matchMedia` ו-ResizeObserver מחשבים הכל מחדש. אנכי בלבד, עברית ישרה לימין (`text-align:start`). בדמו של הוואולט ההדר העליון דביק בדסקטופ, ולכן לכל סקשן ריפוד עליון של 88 פיקסלים. באתר אמיתי הוא צריך להיות לפחות גובה ההדר הדביק.\n\n**שלוש תשובות הגימור.** (1) הגרסה הבנאלית היא sticky עם `top:0` על כל סקשן: הכל נראה מצוין עד הסקשן הראשון שגבוה ממסך, ואז החצי התחתון שלו נקבר. בפועל אצלנו הסקשן נעצר במקום שבו הוא נקרא עד הסוף, ויש מנוחה לפני שמשהו מכסה אותו. (2) המיקרו-אינטראקציה שנושאת מצב: הסקשן שנסוג נשאר גלוי מאחור, כהה וקטן יותר, כמו עמוד בערימה שכבר עברת, ומחוון השלבים (ארבעה פסים) בראש כל סקשן אומר היכן בתהליך נמצאים. (3) מה זה מקל על הגולש: לקרוא שלב ארוך בתהליך עבודה עד סופו, בטלפון, בלי לגלות שהרשימה נחתכה.\n\nמקור: GreenSock, https://codepen.io/GreenSock/pen/bGRdvMy, רישיון MIT (CodePen ציבורי)",
  libs:["gsap","ScrollTrigger"],
  css:`@property --sk-s{syntax:"<number>";inherits:false;initial-value:1}
@property --sk-dim{syntax:"<number>";inherits:true;initial-value:0}
.sk{--sk-r:clamp(20px,3vw,32px);position:relative;margin-top:clamp(24px,3vw,40px);background:var(--bg);color:var(--ink)}
/* ברירת מחדל: סקשנים שזורמים כרגיל, בגובה מסך לפחות. ההדבקה והנסיגה נכנסות רק עם .is-stack */
.sk-panel{position:relative;isolation:isolate;display:grid;align-content:center;min-height:100vh;min-height:100lvh;border-radius:var(--sk-r)}
.sk-panel:nth-child(1){background:var(--card)}
.sk-panel:nth-child(2){background:var(--ink);color:var(--bg)}
.sk-panel:nth-child(3){background:var(--accent);color:var(--accent-ink)}
.sk-panel:nth-child(4){background:var(--card)}
/* ההחשכה היא שכבה שחורה ולא שקיפות של הסקשן: סקשן חצי שקוף מראה את מה שמתחתיו */
.sk-panel::after{content:"";position:absolute;inset:0;z-index:2;border-radius:inherit;background:#000;opacity:var(--sk-dim);pointer-events:none}
/* הדבקה: top שלילי כשהסקשן גבוה ממסך, כלומר הוא נדבק כשהתחתית שלו בתחתית המסך. --sk-h נכתב מ-JS */
.sk.is-stack .sk-panel:not(:last-child){position:sticky;top:min(0px,calc(100dvh - var(--sk-h,100dvh)));margin-bottom:18svh;
  transform:scale(var(--sk-s));transform-origin:50% calc(100% - 50dvh);will-change:transform}
.sk-in{display:grid;gap:clamp(24px,3vw,40px);width:min(100%,1120px);margin-inline:auto;padding:88px var(--gutter) 64px}
.sk-in.narrow{width:min(100%,820px)}
.sk-step{display:flex;align-items:center;gap:12px;font-size:14px;font-weight:600}
.sk-dots{display:flex;gap:6px}
.sk-dots i{width:20px;height:4px;border-radius:2px;background:currentColor;opacity:.28}
.sk-dots i.on{opacity:1}
.sk-panel h3{margin:0;max-width:18ch;font-size:clamp(30px,4.2vw,60px);line-height:1.12;font-weight:800;text-wrap:balance}
.sk-panel p{margin:0;max-width:60ch;font-size:clamp(17px,1.4vw,20px);line-height:1.7;text-align:start}
.sk-txt{display:grid;gap:clamp(20px,2vw,28px);align-content:start}
.sk-cols{display:grid;gap:clamp(24px,4vw,64px);align-items:center}
@media(min-width:768px){.sk-cols{grid-template-columns:1.1fr .9fr}}
.sk-lh{margin:0 0 12px;font-size:15px;font-weight:700}
.sk-list{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.sk-list li{display:grid;grid-template-columns:24px 1fr;gap:12px;align-items:start;font-size:clamp(16px,1.3vw,18px);line-height:1.55}
.sk-list li::before{content:"";width:24px;height:24px;margin-top:2px;background:currentColor;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='black' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E") center/contain no-repeat}
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.sk-chips li{padding:8px 16px;border-radius:999px;font-size:14px;font-weight:600;background:color-mix(in srgb,currentColor 12%,transparent)}
.sk-fig{margin:0;display:grid;gap:10px}
.sk-fig img{display:block;width:100%;height:auto;aspect-ratio:var(--ar,3/2);max-height:var(--mh,none);object-fit:cover;object-position:var(--op,50% 50%);border-radius:var(--r)}
.sk-fig figcaption{font-size:14px;line-height:1.5;opacity:.8}
.sk-btn{justify-self:start;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding-inline:28px;border:0;border-radius:999px;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:16px;font-weight:600;cursor:pointer}
.sk-btn:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
html[dir="ltr"] .sk-panel p{text-align:start}`,
  html:`<div class="sk">
  <section class="sk-panel" aria-labelledby="sk-t1"><div class="sk-in">
    <div class="sk-step"><span class="sk-dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></span><span>שלב 1 מתוך 4</span></div>
    <div class="sk-txt">
      <h3 id="sk-t1">שיחה קצרה וסיור בחניה</h3>
      <p>מספרים לנו כמה דירות יש בבניין, כמה רכבים חשמליים חונים בו היום וכמה צפויים בשנתיים הקרובות. אנחנו מגיעים לראות את לוח החשמל ואת החניה, ויוצאים עם כיוון ברור ומחיר משוער.</p>
      <ul class="sk-chips"><li>עד שבוע מהפנייה</li><li>ללא עלות</li><li>בלי התחייבות</li></ul>
    </div>
  </div></section>
  <section class="sk-panel" aria-labelledby="sk-t2"><div class="sk-in">
    <div class="sk-step"><span class="sk-dots" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i><i></i></span><span>שלב 2 מתוך 4</span></div>
    <div class="sk-cols">
      <div class="sk-txt">
        <h3 id="sk-t2">תכנון והסכמה של ועד הבית</h3>
        <p>בבניין משותף אי אפשר להתקין עמדה בלי אישור הדיירים. אנחנו מכינים לוועד תוכנית אחת ברורה: איפה עוברים הכבלים, אילו חניות כלולות ומי משלם על מה.</p>
        <p>התוכנית כתובה בשפה שאפשר להקריא בישיבת דיירים, בלי מונחים של חשמלאים. אם עולות שאלות, אנחנו מגיעים לישיבה ועונים בעצמנו.</p>
        <div><h4 class="sk-lh">מה מקבל הוועד</h4>
          <ul class="sk-list">
            <li>תרשים חשמל של הבניין עם נקודת החיבור המוצעת</li>
            <li>חלוקת עלויות בין הדיירים שמתקינים לבין קופת הוועד</li>
            <li>נוסח הסכמה לחתימת הדיירים, מוכן להדפסה</li>
            <li>הערכת עומס: האם הבניין מחזיק עוד עמדות בלי שדרוג</li>
            <li>לוח זמנים להתקנה, כולל הפסקות חשמל קצרות</li>
          </ul></div>
        <ul class="sk-chips"><li>שבוע עד שבועיים</li><li>כולל ליווי בישיבה</li></ul>
      </div>
      <figure class="sk-fig"><img src="../assets/media/real/s10/lot-paint.webp" width="1600" height="1067" loading="lazy" alt="סימון חניה ייעודית לרכב חשמלי על האספלט"><figcaption>סימון החניה הייעודית הוא הצעד האחרון, לא הראשון.</figcaption></figure>
    </div>
  </div></section>
  <section class="sk-panel" aria-labelledby="sk-t3"><div class="sk-in narrow">
    <div class="sk-step"><span class="sk-dots" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></span><span>שלב 3 מתוך 4</span></div>
    <h3 id="sk-t3">התקנה בבניין, בלי הפתעות</h3>
    <p>חשמלאי מוסמך מגיע עם כל הציוד ביום אחד שנקבע מראש. מושכים קו ייעודי מלוח הבניין אל החניה, מתקינים עמדה לכל דייר ומחברים אותה למונה נפרד, כדי שכל אחד ישלם רק על מה שטען.</p>
    <figure class="sk-fig" style="--ar:16/10;--op:70% 40%"><img src="../assets/media/real/s10/install.webp" width="1200" height="1067" loading="lazy" alt="חשמלאי בכובע צמר ובמשקפי מגן מחבר כבלים בקופסת חיבורים"><figcaption>חיבור הקו בקופסת הפיצול, לפני סגירת הקיר.</figcaption></figure>
    <p>עבודה בבניין מאוכלס דורשת סדר. מודיעים לדיירים שבוע מראש, מכסים את הרצפה בזמן קידוח ומנקים בסוף כל יום עבודה. בסיום מקבל הוועד תיק מסירה עם תעודות ובדיקות.</p>
    <div><h4 class="sk-lh">ביום ההתקנה</h4>
      <ul class="sk-list">
        <li>קו ייעודי ומפסק מגן לכל עמדה</li>
        <li>מונה נפרד לכל דייר</li>
        <li>ארון חשמל סגור ומסומן</li>
        <li>קידוח וכיסוי הצנרת בצבע הקיר</li>
        <li>בדיקת הארקה ובדיקת מתח לפני חיבור</li>
        <li>ניקיון מלא והחזרת האזור למצבו הקודם</li>
      </ul></div>
    <p>אם מתגלה ליקוי בלוח הישן, מעדכנים את הוועד באותו יום ומציעים תיקון במחיר שסוכם מראש. לא ממשיכים בלי אישור.</p>
    <ul class="sk-chips"><li>יום עבודה אחד לעמדה</li><li>תיק מסירה כלול</li></ul>
  </div></section>
  <section class="sk-panel" aria-labelledby="sk-t4"><div class="sk-in">
    <div class="sk-step"><span class="sk-dots" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></span><span>שלב 4 מתוך 4</span></div>
    <div class="sk-cols">
      <div class="sk-txt">
        <h3 id="sk-t4">טעינה ראשונה ומסירה</h3>
        <p>מחברים את הרכב, מוודאים שהחיוב רשום על המונה הנכון ומראים איך מגדירים שעות טעינה זולות. מכאן כל בוקר מתחיל עם סוללה מלאה.</p>
        <button class="sk-btn" type="button">לתיאום סיור בחניה</button>
      </div>
      <figure class="sk-fig" style="--ar:4/3;--mh:min(520px,62vh);--op:50% 35%"><img src="../assets/media/real/s10/resident.webp" width="1100" height="1650" loading="lazy" alt="דיירת מדברת בטלפון ליד רכב חשמלי בטעינה"></figure>
    </div>
  </div></section>
</div>`,
  js:`(function(){
  // בלי הספרייה, או בלי ScrollTrigger, הסקשנים נשארים זורמים: אין .is-stack ולכן אין הדבקה, ושום דבר לא מוסתר
  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined")return;
  const root=document.querySelector(".sk"),panels=gsap.utils.toArray(".sk-panel",root);
  // בהפחתת תנועה הפונקציה לא רצה: הערימה לא מופעלת והסקשנים זורמים כרגיל. בסיבוב טאבלט matchMedia מחליף גרסה
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    root.classList.add("is-stack");
    // גובה כל סקשן למשתנה, וה-CSS מחשב ממנו את נקודת ההדבקה (100dvh פחות הגובה). offsetHeight לא מושפע מהכיווץ
    const measure=()=>panels.forEach(p=>p.style.setProperty("--sk-h",p.offsetHeight+"px"));
    measure();
    ScrollTrigger.addEventListener("refreshInit",measure);
    // פונט שנטען או שורה שנשברת אחרת משנים גובה בלי אירוע resize: מודדים ומרעננים את הטריגרים
    let raf=0;
    const ro=new ResizeObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{measure();ScrollTrigger.refresh();});});
    panels.forEach(p=>ro.observe(p));
    // הסקשן נסוג בדיוק בזמן שהבא עולה מעליו, ולכן הטריגר הוא הבא ולא הנוכחי. הנסיגה לא מתחילה לפני שהבא נכנס,
    // ובסקשן גבוה הבא נכנס רק אחרי מרווח המנוחה, כלומר אחרי שהתחתית נראתה
    panels.slice(0,-1).forEach((p,i)=>{
      gsap.fromTo(p,{"--sk-s":1,"--sk-dim":0},{"--sk-s":.92,"--sk-dim":.55,ease:"none",
        scrollTrigger:{trigger:panels[i+1],start:"top bottom",end:"top top",scrub:.4}});
    });
    return()=>{
      ScrollTrigger.removeEventListener("refreshInit",measure);ro.disconnect();cancelAnimationFrame(raf);
      root.classList.remove("is-stack");
      panels.forEach(p=>{p.style.removeProperty("--sk-h");p.style.removeProperty("--sk-s");p.style.removeProperty("--sk-dim");});
    };
  });
})();`
}
];
