// קהילה, גל 1 (15.10.2026): שלושה מהלכי CSS מודרניים שנכתבו מחדש לפי התורה: טשטוש הדרגתי בקצה (backdrop-filter בשכבות),
// דהייה של קצה רק כשיש עוד תוכן (scroll-driven animation), ותמונה שגולשת בתוך המסגרת בקרוסלה (view timeline).
// כולם CSS בלבד בתנועה עצמה. ה-JS (אם יש) נוגע רק בכפתורים ובמצב, לא בתנועה.

// שמונה שכבות טשטוש, כל אחת מטשטשת פי שניים מקודמתה (Magic UI). ב-CSS: --k מספר השכבה, --n כמה שכבות פעילות.
const PB_LAYERS = Array.from({ length: 8 }, (_, k) => `<i style="--k:${k}"></i>`).join("");

export default [
{
  id:"css33", cat:"css", name:"טשטוש הדרגתי בקצה", tech:"CSS · backdrop-filter · mask", status:"ממתין", runway:false,
  desc:"תוכן שנגלל מתחת להדר דביק או לסרגל פעולה תחתון נמוג בטשטוש הדרגתי: בקצה עצמו הוא ערפל, ובמרחק קטן כבר חד. בלי קו, בלי כיסוי צבעוני, והתמונות והטקסט נשארים אמיתיים עד הסוף. כפתור קטן מאפשר להשוות בין טשטוש, דהייה לבנה רגילה ובלי טיפול.",
  when:"הדר דביק מעל תמונות וכתבות, סרגל CTA תחתון במובייל (לתיאום פגישה, הזמנה, התקשרות), קצה של רצועת תמונות, תחתית תמונת הירו שנכנסת מתחת לתפריט. אחד לכל קצה ולא יותר משלושה קצוות בעמוד, כי כל קצה הוא שמונה שכבות שהמעבד מצייר מחדש בגלילה.",
  note:"מקור: Magic UI, progressive-blur, https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/progressive-blur.tsx, רישיון MIT, בשילוב הרעיון של Jhey Tompkins, https://codepen.io/jh3y/pen/wBBYprw (CodePen, MIT). הקוד נכתב מחדש: שמונה שכבות מוצבות זו על זו, לכל שכבה backdrop-filter משלה (חצי פיקסל, אחד, 2, 4 ועד 64) ומסכה שמחלקת את המארח לרצועות חופפות: שכבה k שקופה עד k*s אחוז, אטומה בין (k+1)*s ל-(k+2)*s, ושקופה שוב ב-(k+3)*s, כש-s הוא 100 חלקי מספר השכבות. כך הטשטוש מצטבר בהדרגה ואין אף מקום שבו רואים קו. המארח הוא position:absolute עם pointer-events:none, ולכן הגלילה והלחיצות עוברים דרכו. הכל מחושב ב-CSS מתוך --k, --n ו---bmax (עם pow()), ולכן במובייל מורידים לחמש שכבות ו-bmax של 32 בשתי שורות במקום לכתוב הכל מחדש. הכיוון נקבע ב---dir ומשתנה לפי הקצה, וברצועה האופקית הוא מתהפך ב-dir=ltr. כותבים גם -webkit-backdrop-filter ו-webkit-mask-image. המלכודת: מארח שנמצא בתוך אלמנט עם filter, opacity, mask או clip-path הופך לשורש של הרקע ולא רואה את התוכן שמתחתיו, והטשטוש פשוט לא קורה; לכן המארחים הם אחים של אזור הגלילה ולא ילדים של אלמנט כזה, והמעבר בין המצבים נעשה על ה-opacity של השכבות עצמן. ב-@supports not (או כשאין pow()) השכבות נעלמות וצומחת דהייה פשוטה לצבע הרקע, והתוכן כולו נשאר קריא. תנועה מופחתת: אין תנועה בכלל, רק מעבר מצב קצר שנכבה. בלי JS: המצב הרגיל (טשטוש) עובד כמו שהוא וכפתורי ההשוואה מוסתרים. מגע: אין hover בשום מקום, וכל כפתור 44 פיקסלים לפחות. שלוש התשובות: (1) הגרסה הבנאלית היא גרדיאנט לבן מעל התוכן, שמכסה את התמונה בערפל חלבי ויוצר קו שבו הצבע מתחיל; כאן אין צבע בכלל, אלא אותו תוכן עצמו שמאבד חדות, ולכן זה נראה כמו עומק שדה ועובד על כל עור, גם כהה. (2) המשוב: הכפתורים להשוואה ומשפט שמתעדכן בלייב, והסרגל הדביק נשאר קריא כי מתחתיו תמיד ערפל ולא טקסט חד. (3) הפעולה שזה מקל: קריאה של כפתור הפעולה התחתון בזמן גלילה, ויכולת של הגולש להבין שיש עוד תוכן מתחת לסרגל בלי שום חץ.",
  libs:[],
  css:`.pb{max-width:min(920px,100%);margin-inline:auto;display:grid;gap:var(--gap)}
.pb-bar{display:none;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
.pb-js .pb-bar{display:flex}
.pb-seg{display:inline-flex;gap:4px;padding:4px;border-radius:999px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.pb-m{min-height:44px;padding-inline:20px;border:0;border-radius:999px;background:none;color:var(--muted);font:inherit;font-size:15px;font-weight:600;cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1),color .18s cubic-bezier(.2,.6,.2,1),box-shadow .18s cubic-bezier(.2,.6,.2,1)}
.pb-m[aria-pressed="true"]{background:var(--bg);color:var(--ink);box-shadow:inset 0 0 0 2px var(--accent)}
.pb-m:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pb-cap{margin:0;color:var(--muted);font-size:15px;line-height:1.5;max-width:62ch;min-height:3em}
.pb-frame{--pb-pad:clamp(20px,4vw,40px);position:relative;height:clamp(480px,72vh,640px);border-radius:var(--r);overflow:hidden;isolation:isolate;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.pb-scroll{position:absolute;inset:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--line) transparent}
.pb-scroll:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.pb-hero{margin:0;height:clamp(280px,38vh,360px)}
.pb-hero img{display:block;width:100%;height:100%;object-fit:cover}
.pb-body{padding:clamp(24px,3vw,40px) var(--pb-pad) 0}
.pb-eye{margin:0 0 8px;font-size:14px;font-weight:600;color:var(--muted)}
.pb-body h3{margin:0 0 12px;font-size:clamp(24px,2.6vw,34px);line-height:1.15}
.pb-body h4,.pb-h{margin:0 0 16px;font-size:clamp(18px,1.6vw,22px);line-height:1.25}
.pb-body p{margin:0 0 16px;font-size:16px;line-height:1.65;max-width:60ch}
.pb-sec{padding-top:clamp(32px,4vw,48px)}
.pb-h{padding-inline:var(--pb-pad)}
.pb-railw{position:relative}
.pb-rail{display:flex;gap:16px;overflow-x:auto;padding-inline:var(--pb-pad);scroll-padding-inline:var(--pb-pad);scroll-snap-type:x proximity;scrollbar-width:none}
.pb-rail::-webkit-scrollbar{display:none}
.pb-rail:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.pb-card{flex:0 0 min(240px,62%);margin:0;scroll-snap-align:start}
.pb-body.pb-gap{padding-top:clamp(32px,4vw,48px)}
.pb-card img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--r)}
.pb-card b{display:block;margin-top:12px;font-size:16px}
.pb-card span{font-size:14px;color:var(--muted)}
.pb-steps{margin:0;padding:0;list-style:none;display:grid;gap:16px;counter-reset:s}
.pb-steps li{position:relative;padding-inline-start:48px;font-size:16px;line-height:1.6;max-width:56ch;counter-increment:s}
.pb-steps li::before{content:counter(s);position:absolute;inset-inline-start:0;top:0;width:32px;height:32px;border-radius:50%;background:var(--ink);color:var(--bg);display:grid;place-items:center;font-size:14px;font-weight:700}
.pb-steps b{display:block}
.pb-tail{height:clamp(120px,22vh,176px)}
.pb-hd{position:absolute;z-index:3;inset-inline:0;top:0;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px clamp(16px,3vw,24px);pointer-events:none}
.pb-hd>*{pointer-events:auto}
.pb-brand{display:inline-flex;align-items:center;min-height:44px;padding-inline:20px;border-radius:999px;background:var(--card);color:var(--ink);box-shadow:0 2px 12px rgba(0,0,0,.14);font-weight:700;font-size:16px}
.pb-ic{display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:var(--card);color:var(--ink);box-shadow:0 2px 12px rgba(0,0,0,.14);cursor:pointer}
.pb-ic svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.pb-cta{position:absolute;z-index:3;inset-inline:0;bottom:0;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px clamp(16px,3vw,24px) clamp(16px,3vw,24px);pointer-events:none}
.pb-cta>*{pointer-events:auto}
.pb-info{display:inline-flex;align-items:center;min-height:44px;padding-inline:16px;border-radius:999px;background:var(--card);color:var(--ink);box-shadow:0 2px 12px rgba(0,0,0,.14);font-size:14px;font-weight:500}
.pb-go:focus-visible,.pb-ic:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pb-edge{--n:8;--bmax:64;--s:calc(100 / var(--n));position:absolute;z-index:2;pointer-events:none}
.pb-edge-t{inset-block-start:0;inset-inline:0;height:clamp(104px,16vh,136px);--dir:to top}
.pb-edge-b{inset-block-end:0;inset-inline:0;height:clamp(128px,20vh,168px);--dir:to bottom}
.pb-edge-e{inset-block:0;inset-inline-end:0;width:clamp(64px,10vw,96px);--dir:to left}
.pb-edge-e:dir(ltr){--dir:to right}
.pb-edge i{position:absolute;inset:0;
  -webkit-backdrop-filter:blur(calc(var(--bmax) / pow(2, var(--n) - 1 - var(--k)) * 1px));backdrop-filter:blur(calc(var(--bmax) / pow(2, var(--n) - 1 - var(--k)) * 1px));
  -webkit-mask-image:linear-gradient(var(--dir),transparent calc(var(--k) * var(--s) * 1%),#000 calc((var(--k) + 1) * var(--s) * 1%),#000 calc((var(--k) + 2) * var(--s) * 1%),transparent calc((var(--k) + 3) * var(--s) * 1%));
  mask-image:linear-gradient(var(--dir),transparent calc(var(--k) * var(--s) * 1%),#000 calc((var(--k) + 1) * var(--s) * 1%),#000 calc((var(--k) + 2) * var(--s) * 1%),transparent calc((var(--k) + 3) * var(--s) * 1%));
  transition:opacity .28s cubic-bezier(.2,.6,.2,1)}
.pb-fb{position:absolute;inset:0;opacity:0;background:linear-gradient(var(--dir),transparent,var(--card));transition:opacity .28s cubic-bezier(.2,.6,.2,1)}
.pb[data-mode="fade"] .pb-edge i,.pb[data-mode="none"] .pb-edge i{opacity:0}
.pb[data-mode="fade"] .pb-fb{opacity:1}
@supports not ((backdrop-filter: blur(1px)) and (width: calc(1px * pow(2, 3)))){
  .pb-edge i{display:none}
  .pb-fb{opacity:1}
  .pb .pb-bar{display:none}
}
@media (min-width:768px){
  .pb-steps{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
  .pb-steps li{padding-inline-start:0;padding-top:48px}
}
@media (max-width:767px){
  .pb-edge{--n:5;--bmax:32}
  .pb-edge i:nth-child(n+6){display:none}
  .pb-frame{height:min(580px,78vh)}
  .pb-info{display:none}
  .pb-cta{justify-content:center}
}
@media (prefers-reduced-motion: reduce){.pb-edge i,.pb-fb,.pb-m{transition:none}}`,
  html:`<div class="stage tight"><div class="pb" data-mode="blur">
  <div class="pb-bar">
    <div class="pb-seg" role="group" aria-label="סוג הדהייה בקצה">
      <button type="button" class="pb-m" data-m="blur" aria-pressed="true">טשטוש הדרגתי</button>
      <button type="button" class="pb-m" data-m="fade" aria-pressed="false">דהייה לבנה</button>
      <button type="button" class="pb-m" data-m="none" aria-pressed="false">בלי טיפול</button>
    </div>
  </div>
  <p class="pb-cap" aria-live="polite">טשטוש הדרגתי: התוכן מאבד חדות לאט ככל שהוא מתקרב לקצה, בלי קו ובלי צבע. התמונה והכותרות נשארות אמיתיות.</p>
  <div class="pb-frame">
    <div class="pb-scroll" tabindex="0" role="region" aria-label="עמוד של סטודיו לעיצוב פנים. גללו כדי לראות איך התוכן נמוג בקצה העליון והתחתון">
      <figure class="pb-hero"><img src="../assets/media/real/s13/hero.webp" alt="חדר בשעת אחר צהריים, קרני שמש נכנסות דרך חלון גבוה" width="1280" height="718" decoding="async"></figure>
      <div class="pb-body">
        <p class="pb-eye">סטודיו לעיצוב פנים, תל אביב</p>
        <h3>בית שנבנה סביב איך שאתם חיים</h3>
        <p>כל פרויקט מתחיל בשיחה על הבוקר שלכם, לא בקטלוג של ריצוף. אנחנו מתכננים את החלל סביב מה שאתם עושים בו בפועל: איפה שותים קפה, איפה הילדים עושים שיעורים, ואיפה אפשר פשוט לשבת בשקט.</p>
        <p>בסוף התהליך מקבלים תוכנית עבודה מסודרת, רשימת בעלי מקצוע שאנחנו עובדים איתם שנים, ומחיר סגור לפני ששוברים קיר ראשון.</p>
      </div>
      <section class="pb-sec">
        <h4 class="pb-h">פרויקטים אחרונים</h4>
        <div class="pb-railw">
          <div class="pb-rail" tabindex="0" role="region" aria-label="גלריית פרויקטים אחרונים">
            <figure class="pb-card"><img src="../assets/media/real/s13/proj-a.webp" alt="סלון כהה עם ספה רחבה ותאורה חמה" width="600" height="750" loading="lazy" decoding="async"><b>סלון בדירת גן</b><span>רמת גן, חמישה חדרים</span></figure>
            <figure class="pb-card"><img src="../assets/media/real/s13/proj-b.webp" alt="פינת רחצה עם מראה עגולה וצמח" width="600" height="750" loading="lazy" decoding="async"><b>פינת רחצה בצבע עמוק</b><span>הרצליה, שישה שבועות</span></figure>
            <figure class="pb-card"><img src="../assets/media/real/s13/room.webp" alt="פינת קריאה עם כורסה ומדפי ספרים" width="600" height="750" loading="lazy" decoding="async"><b>פינת קריאה וספרייה</b><span>תל אביב, חדר עבודה</span></figure>
            <figure class="pb-card"><img src="../assets/media/real/s13/proj-c.webp" alt="מטבח אפור פתוח עם אי ארוך" width="600" height="750" loading="lazy" decoding="async"><b>מטבח עם אי פתוח</b><span>מודיעין, תשעה שבועות</span></figure>
          </div>
          <div class="pb-edge pb-edge-e" aria-hidden="true">${PB_LAYERS}<span class="pb-fb"></span></div>
        </div>
      </section>
      <div class="pb-body pb-gap">
        <h4>איך זה עובד</h4>
        <ol class="pb-steps">
          <li><b>היכרות בבית שלכם</b>שלושים דקות של שיחה, מדידה וצילום. בלי עלות ובלי התחייבות.</li>
          <li><b>תכנון והדמיה</b>תוכנית, חומרים והדמיה של החללים המרכזיים, עד שאתם אומרים "זה זה".</li>
          <li><b>ליווי עד המפתח</b>אנחנו מול הקבלן והספקים, ואתם מקבלים עדכון קצר בכל שבוע.</li>
        </ol>
      </div>
      <div class="pb-body pb-gap">
        <h4>מה כלול בפגישת ההיכרות</h4>
        <p>מדידה בסיסית של החלל, שיחה על התקציב והלו"ז, והצעת מחיר כתובה תוך שלושה ימי עבודה. אם נראה שאנחנו לא הכתובת הנכונה, נגיד את זה ונפנה אתכם הלאה.</p>
        <p>הפגישות מתקיימות בשעות אחר הצהריים וגם בימי שישי בבוקר, ואפשר לבקש שיחת וידאו אם הנכס רחוק.</p>
      </div>
      <div class="pb-tail"></div>
    </div>
    <div class="pb-edge pb-edge-t" aria-hidden="true">${PB_LAYERS}<span class="pb-fb"></span></div>
    <div class="pb-edge pb-edge-b" aria-hidden="true">${PB_LAYERS}<span class="pb-fb"></span></div>
    <div class="pb-hd">
      <span class="pb-brand">סטודיו אור ועץ</span>
      <button type="button" class="pb-ic" aria-label="תפריט"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
    <div class="pb-cta">
      <span class="pb-info">פגישת היכרות, 30 דקות</span>
      <button type="button" class="gbtn pb-go">לתיאום פגישה</button>
    </div>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".pb");if(!root)return;
  const cap=root.querySelector(".pb-cap"),btns=[...root.querySelectorAll(".pb-m")];
  const MSG={
    blur:"טשטוש הדרגתי: התוכן מאבד חדות לאט ככל שהוא מתקרב לקצה, בלי קו ובלי צבע. התמונה והכותרות נשארות אמיתיות.",
    fade:"דהייה לבנה רגילה: יש קו שבו הצבע מתחיל, והתמונה נראית מכוסה בערפל בצבע הרקע.",
    none:"בלי טיפול: הטקסט נדרס מתחת לכפתורים, וקשה לקרוא את שניהם."
  };
  root.classList.add("pb-js");   // רק עם JS מציגים את כפתורי ההשוואה: בלעדיו המצב הרגיל פשוט עובד
  btns.forEach(b=>b.addEventListener("click",()=>{
    root.dataset.mode=b.dataset.m;
    btns.forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
    cap.textContent=MSG[b.dataset.m];
  }));
})();`
},
{
  id:"css34", cat:"css", name:"קצה שמתעמעם רק כשיש עוד", tech:"CSS · scroll-driven animation", status:"ממתין", runway:false,
  desc:"קופסה שנגללת (שורת צ'יפים, טבלת השוואה רחבה, רשימה ארוכה) מעמעמת את הקצה שלה רק בכיוון שבו יש עוד תוכן: בתחילה ההתחלה חדה, ככל שגוללים ההתחלה דוהה בהדרגה, ובקצה האחרון הדהייה בסוף נעלמת. כשהכל נכנס ואין מה לגלול, אין דהייה בכלל.",
  when:"שורת קטגוריות או תגיות שגולשת בטלפון, טבלת מחירים או השוואה רחבה בתוך עטיפה אופקית, רשימה ארוכה בתוך פאנל בגובה קבוע. בכל מקום שבו חיתוך חד של תוכן נראה כמו באג ולא כמו הזמנה לגלול.",
  note:"מקור: shadcn/ui, תוסף scroll-fade, https://github.com/shadcn-ui/ui (packages/shadcn/src/tailwind.css), רישיון MIT, והרעיון של Shu Ding, https://codepen.io/shuding/pen/WNLGQor (CodePen, MIT). הקוד נכתב מחדש בלי Tailwind: שני משתנים רשומים (@property, מסוג length) --sf-s ו---sf-e שמייצגים את גודל הדהייה בהתחלה ובסוף, שני keyframes שמגדלים את הראשון מ-0 לגודל המלא ומקטינים את השני לאפס, ושתי אנימציות שכל אחת מחוברת ל-scroll(self inline) (או block לאנכי) עם animation-range משלה: 0 עד 96px בהתחלה, ו-calc(100% - 96px) עד 100% בסוף. המסכה היא linear-gradient אחד שקורא את שני המשתנים. הערך 96px הוא כמה גוללים עד שהדהייה מלאה, וה---sf-size הוא רוחב הדהייה עצמה (48 עד 56 פיקסלים), והם בכוונה נפרדים. כשאין גלישה, ציר הגלילה לא פעיל והאנימציות לא רצות, ולכן אין דהייה בכלל, בלי שורה אחת של קוד לבדיקה. RTL: הכיוון נקבע ב-:dir(rtl) ו-:dir(ltr) (ברירת המחדל עברית: to left), וציר ה-inline של הגלילה מתחיל מהצד הימני, כך שההתחלה בעברית היא הימנית ונבדקה בכרום: בטעינה הצד הימני חד והשמאלי דוהה. מלכודות: animation בקיצור מאפס את animation-timeline ואת animation-range ולכן הם מוגדרים אחריו; המסכה נחתכת לפי תיבת הגבול ולכן אין צל חיצוני על האלמנט המוסתר (הרקע נשאר, הצל לא); scroll-padding בצ'יפים מונע ממקלדת להביא צ'יפ אל תוך הדהייה. מסלול נפילה: ב-@supports not (animation-timeline: scroll()) נשארת דהייה סטטית קטנה בסוף ו-JS קטן מחשב את אותם שני משתנים בגלילה, כך שגם דפדפן בלי התמיכה מקבל את אותה התנהגות, והתוכן אף פעם לא מוסתר. תנועה מופחתת: זה מחוון מצב ולא קישוט, ולכן לא מכבים אותו. בלי JS: הדהייה עצמה בלי JS בכלל בדפדפן תומך; רק בחירת הצ'יפ דורשת JS. שלוש התשובות: (1) הגרסה הבנאלית היא דהייה קבועה בשני הצדדים, או צל פנימי שנשאר גם כשהגעתם לסוף ומסתיר את הפריט האחרון, או חיתוך חד בלי שום רמז; כאן הדהייה מדווחת על המצב האמיתי של הקופסה בכל רגע. (2) המיקרו-אינטראקציה שנושאת מצב: הדהייה עצמה, שגדלה ונעלמת עם הגלילה, ובחירת צ'יפ שמרכזת אותו ומעדכנת את שני הקצוות. (3) הפעולה שזה מקל: הבנה שיש עוד בלי לנחש, ותנועה לצד הנכון בלי חצים.",
  libs:[],
  css:`@property --sf-s{syntax:"<length>";inherits:false;initial-value:0px}
@property --sf-e{syntax:"<length>";inherits:false;initial-value:0px}
@keyframes sf-in{from{--sf-s:0px}to{--sf-s:var(--sf-size)}}
@keyframes sf-out{from{--sf-e:var(--sf-size)}to{--sf-e:0px}}
.sf{--sf-size:56px;--sf-reveal:96px;
  -webkit-mask-image:linear-gradient(var(--sf-dir),transparent 0,#000 var(--sf-s),#000 calc(100% - var(--sf-e)),transparent 100%);
  mask-image:linear-gradient(var(--sf-dir),transparent 0,#000 var(--sf-s),#000 calc(100% - var(--sf-e)),transparent 100%)}
.sf-x{--sf-dir:to left}
.sf-x:dir(ltr){--sf-dir:to right}
.sf-y{--sf-dir:to bottom}
@supports (animation-timeline: scroll()){
  .sf-x{animation:sf-in linear both,sf-out linear both;animation-timeline:scroll(self inline),scroll(self inline);animation-range:0 var(--sf-reveal),calc(100% - var(--sf-reveal)) 100%}
  .sf-y{animation:sf-in linear both,sf-out linear both;animation-timeline:scroll(self block),scroll(self block);animation-range:0 var(--sf-reveal),calc(100% - var(--sf-reveal)) 100%}
}
@supports not (animation-timeline: scroll()){.sf{--sf-e:28px}}
.sfd{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(40px,5vw,64px);max-width:760px;margin-inline:auto}
.sfd h3{margin:0 0 4px;font-size:clamp(20px,1.8vw,26px)}
.sfd p{margin:0 0 16px;color:var(--muted);font-size:15px;line-height:1.55;max-width:56ch}
.sf-chips{display:flex;gap:8px;overflow-x:auto;padding-block:4px;scroll-padding-inline:var(--sf-size);scrollbar-width:none;--sf-size:48px}
.sf-chips::-webkit-scrollbar{display:none}
.sf-chip{flex:none;min-height:44px;padding-inline:20px;border:0;border-radius:999px;background:var(--card);color:var(--ink);box-shadow:0 0 0 1px var(--line);font:inherit;font-size:15px;font-weight:500;white-space:nowrap;cursor:pointer;transition:background .18s cubic-bezier(.2,.6,.2,1),color .18s cubic-bezier(.2,.6,.2,1)}
.sf-chip[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);box-shadow:none}
.sf-chip:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sf-tw{overflow-x:auto;border-radius:var(--r);background:var(--card);scrollbar-width:thin;scrollbar-color:var(--line) transparent}
.sf-tw:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.sf-t{border-collapse:collapse;width:100%;min-width:920px;font-size:15px}
.sf-t th,.sf-t td{padding:16px 20px;text-align:start;white-space:nowrap}
.sf-t thead th{font-weight:700}
.sf-t tbody tr:nth-child(odd){background:color-mix(in srgb,var(--ink) 4%,transparent)}
.sf-t tbody th{font-weight:500;color:var(--muted)}
.sf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.sf-list{height:clamp(256px,38vh,312px);overflow-y:auto;border-radius:var(--r);background:var(--card);scrollbar-width:thin;scrollbar-color:var(--line) transparent;--sf-size:40px}
.sf-list:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.sf-list ul{margin:0;padding:8px 0;list-style:none}
.sf-list li{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:14px 20px;font-size:15px}
.sf-list li b{font-weight:600}
.sf-list li span{color:var(--muted);font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion: reduce){.sf-chip{transition:none}}`,
  html:`<div class="stage tight"><div class="sfd">
  <section>
    <h3>תחומי עבודה</h3>
    <p>שורה שגולשת בטלפון וגם במחשב. בהתחלה הקצה הימני חד, ובכל גלילה הוא דוהה, כי יש משהו שכבר עבר.</p>
    <div class="sf sf-x sf-chips" role="group" aria-label="תחומי עבודה">
      <button type="button" class="sf-chip" aria-pressed="true">הכול</button>
      <button type="button" class="sf-chip" aria-pressed="false">מטבחים</button>
      <button type="button" class="sf-chip" aria-pressed="false">חדרי רחצה</button>
      <button type="button" class="sf-chip" aria-pressed="false">סלונים</button>
      <button type="button" class="sf-chip" aria-pressed="false">חדרי שינה</button>
      <button type="button" class="sf-chip" aria-pressed="false">משרדים</button>
      <button type="button" class="sf-chip" aria-pressed="false">תאורה</button>
      <button type="button" class="sf-chip" aria-pressed="false">נגרות בהתאמה</button>
      <button type="button" class="sf-chip" aria-pressed="false">שיפוץ דירות</button>
      <button type="button" class="sf-chip" aria-pressed="false">וילונות ובדים</button>
      <button type="button" class="sf-chip" aria-pressed="false">מרפסות וגינות</button>
      <button type="button" class="sf-chip" aria-pressed="false">חללים קטנים</button>
      <button type="button" class="sf-chip" aria-pressed="false">דירות להשכרה</button>
      <button type="button" class="sf-chip" aria-pressed="false">בתים פרטיים</button>
    </div>
  </section>
  <section>
    <h3>השוואת חבילות</h3>
    <p>טבלה רחבה בתוך עטיפה אופקית. בטלפון היא גולשת מיד, ובמחשב מעט. כשהיא נכנסת כולה לא תראו דהייה בכלל.</p>
    <div class="sf sf-x sf-tw" tabindex="0" role="region" aria-label="השוואת חבילות עיצוב, גללו הצידה כדי לראות את כל העמודות">
      <table class="sf-t">
        <caption class="sf-sr">השוואה בין חמש חבילות עיצוב פנים</caption>
        <thead><tr><th scope="col">מה כלול</th><th scope="col">ייעוץ נקודתי</th><th scope="col">תכנון חדר</th><th scope="col">תכנון דירה</th><th scope="col">ליווי מלא</th><th scope="col">מפתח ביד</th></tr></thead>
        <tbody>
          <tr><th scope="row">מחיר התחלתי</th><td>2,400 ₪</td><td>7,800 ₪</td><td>18,500 ₪</td><td>32,000 ₪</td><td>48,000 ₪</td></tr>
          <tr><th scope="row">פגישות בבית הלקוח</th><td>1</td><td>2</td><td>4</td><td>6</td><td>8</td></tr>
          <tr><th scope="row">תוכניות עבודה</th><td>לא כלול</td><td>כלול</td><td>כלול</td><td>כלול</td><td>כלול</td></tr>
          <tr><th scope="row">הדמיות תלת ממדיות</th><td>לא כלול</td><td>חדר אחד</td><td>כל הדירה</td><td>כל הדירה</td><td>כל הדירה</td></tr>
          <tr><th scope="row">בחירת חומרים וריהוט</th><td>המלצות</td><td>כלול</td><td>כלול</td><td>כלול</td><td>כלול</td></tr>
          <tr><th scope="row">פיקוח בשטח</th><td>לא כלול</td><td>לא כלול</td><td>אפשר להוסיף</td><td>כלול</td><td>כלול</td></tr>
          <tr><th scope="row">ניהול קבלנים וספקים</th><td>לא כלול</td><td>לא כלול</td><td>לא כלול</td><td>כלול</td><td>כלול</td></tr>
          <tr><th scope="row">משך העבודה</th><td>שבוע</td><td>5 שבועות</td><td>10 שבועות</td><td>עד 6 חודשים</td><td>עד 9 חודשים</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <h3>תורים קרובים</h3>
    <p>רשימה ארוכה בפאנל בגובה קבוע. למעלה היא חדה, ובתחתית יש עוד, ולכן הקצה התחתון דוהה.</p>
    <div class="sf sf-y sf-list" tabindex="0" role="region" aria-label="תורים קרובים, גללו כדי לראות את כל הרשימה">
      <ul>
        <li><b>דנה אלון</b><span>09:00 · היכרות</span></li>
        <li><b>אורי שמעוני</b><span>09:45 · מדידה</span></li>
        <li><b>משפחת בן דוד</b><span>10:30 · הצגת הדמיה</span></li>
        <li><b>נועה פרידמן</b><span>11:30 · בחירת חומרים</span></li>
        <li><b>רן ואילנית כץ</b><span>12:15 · היכרות</span></li>
        <li><b>תמר גבאי</b><span>13:30 · סיור בשטח</span></li>
        <li><b>יובל מרום</b><span>14:15 · הצעת מחיר</span></li>
        <li><b>שירה אביטל</b><span>15:00 · היכרות</span></li>
        <li><b>אסף לוי</b><span>15:45 · בחירת ריהוט</span></li>
        <li><b>מיכל רוזן</b><span>16:30 · מדידה</span></li>
        <li><b>עידו ברק</b><span>17:15 · הצגת הדמיה</span></li>
        <li><b>הילה סגל</b><span>18:00 · היכרות</span></li>
        <li><b>גיא נחמיאס</b><span>18:45 · סיור בשטח</span></li>
      </ul>
    </div>
  </section>
</div></div>`,
  js:`(function(){
  const reduce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  // צ'יפ שנבחר מתמרכז: שני הקצוות של השורה מתעדכנים לבד, כי הם נקראים מהגלילה
  document.querySelectorAll(".sf-chips").forEach(row=>{
    const chips=[...row.querySelectorAll(".sf-chip")];
    chips.forEach(c=>c.addEventListener("click",()=>{
      chips.forEach(x=>x.setAttribute("aria-pressed",String(x===c)));
      c.scrollIntoView({inline:"center",block:"nearest",behavior:reduce()?"auto":"smooth"});
    }));
  });
  // דפדפן בלי scroll-driven animation: אותם שני משתנים, מחושבים בגלילה. בדפדפן תומך אין שורה אחת שרצה.
  if(window.CSS&&CSS.supports&&CSS.supports("animation-timeline: scroll()"))return;
  const clamp=v=>Math.max(0,Math.min(1,v));
  document.querySelectorAll(".sf").forEach(el=>{
    const x=el.classList.contains("sf-x"),size=parseFloat(getComputedStyle(el).getPropertyValue("--sf-size"))||48,reveal=96;
    function sync(){
      const pos=x?Math.abs(el.scrollLeft):el.scrollTop,max=x?el.scrollWidth-el.clientWidth:el.scrollHeight-el.clientHeight;
      if(max<=1){el.style.setProperty("--sf-s","0px");el.style.setProperty("--sf-e","0px");return;}
      el.style.setProperty("--sf-s",size*clamp(pos/reveal)+"px");
      el.style.setProperty("--sf-e",size*clamp((max-pos)/reveal)+"px");
    }
    el.addEventListener("scroll",sync,{passive:true});addEventListener("resize",sync);sync();
  });
})();`
},
{
  id:"css35", cat:"css", name:"תמונה שגולשת בתוך המסגרת בהחלקה", tech:"CSS scroll-snap · scroll() timeline", status:"ממתין", runway:false,
  desc:"קרוסלת תמונות נטיבית עם scroll-snap, שבה בכל החלקה התמונה גולשת בתוך המסגרת שלה לאט יותר מהמסגרת, כמו הצצה דרך חלון. התנועה קשורה למיקום הגלילה, בלי JS. יש חצים, גרירה בעכבר, מקלדת, מונה ופס התקדמות.",
  when:"גלריית עבודות, מוצרים, צוות או מקרי בוחן בתמונות גדולות, כשהתמונה היא הסיפור והגולש מחליק ביד אחת. לא לצילומי מסמכים או תמונות שחשוב לראות כולן בלי חיתוך, ולא יותר מקרוסלה אחת בעמוד.",
  note:"מקור: Preethi Sam, https://codepen.io/rpsthecoder/pen/JoXbNbg (CodePen, MIT). בקוד המקורי הרקע של כל שקופית מונפש ב-background-position-x תחת animation-timeline: view(inline). כאן נכתב מחדש עם תמונה אמיתית (img) שרחבה 130 אחוז מהמסגרת, ממורכזת, ו-translate שרץ מצד לצד לפי ה-view timeline, מה שזול הרבה יותר מ-object-position כי translate רץ על הקומפוזיטור ולא מצייר מחדש. הכיוון: המסגרת נעה בכיוון ההחלקה, והתמונה זזה בכיוון ההפוך ביחס אליה, ולכן במסך היא נעה לאט יותר מהמסגרת. חשוב: בכוונה לא השתמשתי ב-view-timeline של הפרויקט המקורי. בדקתי בכרום 155 ב-RTL, והפאזה של view(inline) שם לא נכונה: ההתקדמות של כל שקופית מחושבת לפי מיקום השקופית ההפוכה בשורה, כך שהראשונה והאחרונה עומדות במקום בזמן שהן על המסך והאמצעיות זזות. ב-LTR זה תקין. לכן כל תמונה רצה על scroll-timeline של המסלול (scroll-timeline: --slgt inline), עם animation-range משלה: מרחק שקופית i משפת ההתחלה הוא i * (רוחב השקופית + הרווח), והטווח הוא מהרגע שהמסגרת נכנסת מהצד הרחוק (מרחק מינוס רוחב המסלול) עד שהיא יוצאת מהצד הקרוב (מרחק ועוד רוחב השקופית). זו אותה נוסחה בעברית ובאנגלית, כי היא מודדת מרחק משפת ההתחלה ולא כיוון פיזי, והיא נבדקה בכרום בשני הכיוונים: תמונה במרכז המסלול ללא הזזה, ובצדדים בדיוק פלוס ומינוס 11.5 אחוז. רוחב השקופית מוגדר פעם אחת ב---slg-fw (min(340px,78cqw)) והמסלול הוא container-type: inline-size, ולכן ה-cqw בטווח מתייחס לרוחב המסלול ועובד גם כשהרוחב משתנה. לכל שקופית יש --i באינליין (0 עד 4). הסימן ב---slg-s הוא 1 בעברית ו--1 ב-:dir(ltr), כי כיוון התנועה על המסך מתהפך. האנימציה כולה בתוך @supports (animation-timeline: scroll()) ו-@media (prefers-reduced-motion: no-preference); בלעדיהם התמונה פשוט עומדת במרכז המסגרת ולא נחתכת. הקרוסלה שלמה: scroll-snap mandatory, המסלול הוא region עם tabindex ו-aria-label וחצי מקלדת, חצי הקודם והבא מגללים שקופית אחת עם scrollBy לפי מרחק בין שפות ההתחלה (כך הסימן נכון גם ב-RTL, שבו scrollLeft שלילי), הם מקבלים aria-disabled בקצוות כדי שהפוקוס לא ייעלם, ויש גרירה בעכבר בלבד (במגע הדפדפן עושה את זה לבד). פס ההתקדמות הוא גם scroll timeline (scroll-timeline על המסלול ו-timeline-scope על העטיפה) ומוצג רק בדפדפן שתומך. בלי JS: ההחלקה, ה-snap והתנועה של התמונה עובדים, הכפתורים מוסתרים. תנועה מופחתת: אין גלישה של התמונה, וההחלקה עצמה נשארת. מגע: כפתורים של 44 פיקסלים, בלי hover. הפרש מ-b31: b31 הוא סליידר המלצות (כרטיסי טקסט עם נקודות); כאן מוסיפים את התנועה הפנימית של התמונה שמתאימה לקרוסלות תמונה, ואת מונה המיקום, ותנועת התמונה היא CSS בלבד. שלוש התשובות: (1) הגרסה הבנאלית היא תמונה קבועה בתוך כרטיס שמחליק, שנראית כמו מדבקה; כאן התמונה חיה בתוך המסגרת בכל פיקסל של החלקה, ולכן ההחלקה מרגישה כמו עומק ולא כמו החלפת כרטיסים, בלי ספרייה ובלי סקריפט. (2) המשוב: מונה וקו התקדמות שזזים עם האצבע, וחצים שנכבים בקצה. (3) הפעולה שזה מקל: לעבור בין עבודות עם החלקה אחת, ולהרגיש כמה נשאר בלי לספור.",
  libs:[],
  css:`.slg{--slg-s:1;--slg-fw:min(340px,78cqw);max-width:min(1100px,100%);margin-inline:auto;timeline-scope:--slgt}
.slg:dir(ltr){--slg-s:-1}
.slg-track{display:flex;gap:var(--gap);overflow-x:auto;padding-block:4px;scroll-snap-type:x mandatory;scrollbar-width:none;container-type:inline-size;scroll-timeline:--slgt inline;cursor:grab;-webkit-overflow-scrolling:touch}
.slg-track::-webkit-scrollbar{display:none}
.slg-track:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.slg-track.drag{scroll-snap-type:none;cursor:grabbing;user-select:none}
.slg-slide{flex:0 0 var(--slg-fw);margin:0;scroll-snap-align:start}
.slg-frame{position:relative;aspect-ratio:4/5;border-radius:var(--r);overflow:hidden;background:var(--line)}
.slg-frame img{position:absolute;inset-block:0;inset-inline-start:-15%;display:block;width:130%;height:100%;object-fit:cover;-webkit-user-drag:none;user-select:none}
@keyframes slg-glide{from{translate:calc(var(--slg-s) * 11.5%)}to{translate:calc(var(--slg-s) * -11.5%)}}
/* כל תמונה רצה על ציר הגלילה של המסלול, בטווח שמתחיל כשהמסגרת שלה נכנסת מהצד הרחוק ומסתיים כשהיא יוצאת מהצד הקרוב. המרחק של שקופית i משפת ההתחלה הוא i * (רוחב + רווח), ולכן אותו חישוב נכון בעברית ובאנגלית */
@supports (animation-timeline: scroll()){
  @media (prefers-reduced-motion: no-preference){
    .slg-frame img{animation:slg-glide linear both;animation-timeline:--slgt;
      animation-range:calc(var(--i) * (var(--slg-fw) + var(--gap)) - 100cqw) calc(var(--i) * (var(--slg-fw) + var(--gap)) + var(--slg-fw))}
  }
}
.slg-cap{display:grid;gap:4px;margin-top:14px}
.slg-cap b{font-size:17px}
.slg-cap span{font-size:14px;color:var(--muted)}
.slg-bar{display:none;align-items:center;gap:24px;margin-top:24px}
.slg-js .slg-bar{display:flex}
.slg-count{min-width:56px;font-size:15px;color:var(--muted);font-variant-numeric:tabular-nums}
.slg-count b{color:var(--ink);font-weight:700}
.slg-prog{display:none;flex:1;height:4px;border-radius:999px;background:var(--line);overflow:hidden}
.slg-prog i{display:block;height:100%;background:var(--accent);transform-origin:right center;scale:0 1}
.slg:dir(ltr) .slg-prog i{transform-origin:left center}
@keyframes slg-fill{to{scale:1 1}}
@supports (animation-timeline: scroll()){
  .slg-prog{display:block}
  .slg-prog i{animation:slg-fill linear both;animation-timeline:--slgt}
}
.slg-nav{display:flex;gap:8px;margin-inline-start:auto}
.slg-btn{display:grid;place-items:center;width:48px;height:48px;padding:0;border:0;border-radius:50%;background:var(--card);color:var(--ink);box-shadow:0 0 0 1px var(--line);cursor:pointer;transition:opacity .2s cubic-bezier(.2,.6,.2,1),background .2s cubic-bezier(.2,.6,.2,1)}
.slg-btn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.slg:dir(ltr) .slg-btn svg{scale:-1 1}
.slg-btn[aria-disabled="true"]{opacity:.35;cursor:default}
.slg-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (hover:hover) and (pointer:fine){.slg-btn:not([aria-disabled="true"]):hover{background:color-mix(in srgb,var(--ink) 8%,var(--card))}}
@media (prefers-reduced-motion: reduce){.slg-btn{transition:none}}`,
  html:`<div class="stage tight"><div class="slg">
  <div class="slg-track" tabindex="0" role="region" aria-roledescription="קרוסלה" aria-label="עבודות אחרונות של הסטודיו, החליקו או השתמשו בחצים">
    <figure class="slg-slide" role="group" aria-roledescription="שקופית" aria-label="1 מתוך 5" style="--i:0"><div class="slg-frame"><img src="../assets/media/real/s13/proj-a.webp" alt="סלון כהה עם ספה רחבה, פמוטים ותאורה חמה" width="1040" height="780" draggable="false" decoding="async"></div><figcaption class="slg-cap"><b>סלון בדירת גן</b><span>רמת גן, חמישה חדרים, אחד עשר שבועות</span></figcaption></figure>
    <figure class="slg-slide" role="group" aria-roledescription="שקופית" aria-label="2 מתוך 5" style="--i:1"><div class="slg-frame"><img src="../assets/media/real/s13/proj-b.webp" alt="פינת רחצה עם מראה עגולה, ברז זהב וצמח" width="780" height="1040" draggable="false" loading="lazy" decoding="async"></div><figcaption class="slg-cap"><b>פינת רחצה בצבע עמוק</b><span>הרצליה, שישה שבועות</span></figcaption></figure>
    <figure class="slg-slide" role="group" aria-roledescription="שקופית" aria-label="3 מתוך 5" style="--i:2"><div class="slg-frame"><img src="../assets/media/real/s13/proj-c.webp" alt="מטבח אפור פתוח עם אי ארוך ותאורה תלויה" width="1040" height="780" draggable="false" loading="lazy" decoding="async"></div><figcaption class="slg-cap"><b>מטבח עם אי פתוח</b><span>מודיעין, תשעה שבועות</span></figcaption></figure>
    <figure class="slg-slide" role="group" aria-roledescription="שקופית" aria-label="4 מתוך 5" style="--i:3"><div class="slg-frame"><img src="../assets/media/real/s13/room.webp" alt="פינת קריאה עם כורסה אדומה, מנורה ומדפי ספרים" width="1040" height="780" draggable="false" loading="lazy" decoding="async"></div><figcaption class="slg-cap"><b>פינת קריאה וספרייה</b><span>תל אביב, חדר עבודה</span></figcaption></figure>
    <figure class="slg-slide" role="group" aria-roledescription="שקופית" aria-label="5 מתוך 5" style="--i:4"><div class="slg-frame"><img src="../assets/media/real/s13/hero.webp" alt="חדר מגורים באור צהריים, קרני שמש על הקיר" width="1040" height="780" draggable="false" loading="lazy" decoding="async"></div><figcaption class="slg-cap"><b>חדר מגורים באור צהריים</b><span>כפר שמריהו, בית פרטי</span></figcaption></figure>
  </div>
  <div class="slg-bar">
    <span class="slg-count" aria-hidden="true"><b>1</b> / 5</span>
    <span class="slg-prog" aria-hidden="true"><i></i></span>
    <div class="slg-nav">
      <button type="button" class="slg-btn prev" aria-label="לפרויקט הקודם"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
      <button type="button" class="slg-btn next" aria-label="לפרויקט הבא"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    </div>
  </div>
</div></div>`,
  js:`document.querySelectorAll(".slg").forEach(root=>{
  const track=root.querySelector(".slg-track"),slides=[...track.children];
  const prev=root.querySelector(".slg-btn.prev"),next=root.querySelector(".slg-btn.next"),num=root.querySelector(".slg-count b");
  const rtl=getComputedStyle(track).direction==="rtl";
  const reduce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
  // שפת ההתחלה: ימין בעברית, שמאל באנגלית. כל החישובים לפי מרחק בין שפות, ולכן הסימן נכון גם כש-scrollLeft שלילי
  const edge=el=>{const r=el.getBoundingClientRect();return rtl?r.right:r.left;};
  const pos=()=>Math.abs(track.scrollLeft),max=()=>track.scrollWidth-track.clientWidth;
  const atStart=()=>pos()<4,atEnd=()=>max()-pos()<4;
  function current(){
    const s=edge(track);let best=0,d=1e9;
    slides.forEach((c,i)=>{const k=Math.abs(edge(c)-s);if(k<d){d=k;best=i;}});
    return best;
  }
  function go(i){
    i=Math.max(0,Math.min(slides.length-1,i));
    track.scrollBy({left:edge(slides[i])-edge(track),behavior:reduce()?"auto":"smooth"});
  }
  // המונה מראה עד איזו שקופית כבר ראיתם במלואה: בדסקטופ נראות כמה יחד, ובטלפון אחת, ובשני המקרים בסוף המסלול זה המספר האחרון
  function seen(){
    const t=track.getBoundingClientRect();let n=1;
    slides.forEach((c,i)=>{const r=c.getBoundingClientRect();if(r.left>=t.left-2&&r.right<=t.right+2)n=i+1;});
    return atEnd()?slides.length:n;
  }
  function sync(){
    num.textContent=seen();
    prev.setAttribute("aria-disabled",String(atStart()));
    next.setAttribute("aria-disabled",String(atEnd()));
  }
  // aria-disabled ולא disabled: כפתור שנכבה תוך כדי שהוא בפוקוס לא משאיר את המקלדת באוויר
  prev.addEventListener("click",()=>{if(!atStart())go(current()-1);});
  next.addEventListener("click",()=>{if(!atEnd())go(current()+1);});
  track.addEventListener("scroll",()=>requestAnimationFrame(sync),{passive:true});
  track.addEventListener("keydown",e=>{
    if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;
    e.preventDefault();
    const forward=(e.key==="ArrowLeft")===rtl;   // בעברית השקופית הבאה היא משמאל
    go(current()+(forward?1:-1));
  });
  // גרירה בעכבר בלבד. במגע הדפדפן כבר גולל לבד.
  let down=false,sx=0,sl=0;
  track.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse"||e.button!==0)return;down=true;sx=e.clientX;sl=track.scrollLeft;track.classList.add("drag");track.setPointerCapture(e.pointerId);});
  track.addEventListener("pointermove",e=>{if(down)track.scrollLeft=sl-(e.clientX-sx);});
  const up=()=>{if(!down)return;down=false;track.classList.remove("drag");go(current());};
  ["pointerup","pointercancel"].forEach(ev=>track.addEventListener(ev,up));
  root.classList.add("slg-js");   // רק עם JS מציגים חצים ומונה: בלעדיו ההחלקה והתנועה של התמונה עובדות כמו שהן
  sync();
});`
},
];
