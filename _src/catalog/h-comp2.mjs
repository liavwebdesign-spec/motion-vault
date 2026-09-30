// קומפוזיציות C9-C16. ראה הערת הפתיחה ב-h-comp1.mjs.
import { BASE } from "./h-comp1.mjs";

const doc = (o) => ({ cat: "comp", area: "doctrine", status: "מאושר", runway: false, tech: "פריסה · CSS Grid", ...o });

export default [
doc({
  id:"c09", name:"שכבות צפות",
  desc:"ויז'ואל מרכזי אחד, ועליו או סביבו שניים עד ארבעה כרטיסים קטנים צפים: סטטיסטיקה, תג, ציטוט מיני.",
  when:"הירו, מוצר גיבור, הדגמת מערכת (צילום מסך ונתונים צפים).",
  mobile:"הצפים יורדים לשורת צ'יפים מתחת לוויז'ואל.",
  note:"הצפים חורגים מגבול הוויז'ואל, חצי בפנים וחצי בחוץ. זה מה שמוכר את העומק. מספר עם סימן פלוס או מינוס נעטף ב-`<bdi dir=\"ltr\">`, אחרת בתחילת שורה עברית הסימן קופץ לצד השני של המספר (נתפס בדמו הזה, 30.9.2026).",
  css:`${BASE}
.c9{position:relative;max-width:820px;margin-inline:auto;padding:24px 40px}
.c9 .main{aspect-ratio:16/10;border-radius:var(--r)}
.c9 .fls{display:contents}
.c9 .fl{position:absolute;background:var(--card);border-radius:12px;padding:10px 14px;font-size:13px;font-weight:600;box-shadow:0 14px 34px rgba(22,24,43,.1)}
.c9 .f1{top:14%;inset-inline-start:0}.c9 .f2{top:48%;inset-inline-end:0}.c9 .f3{bottom:10%;inset-inline-start:12%}
@container (max-width:767px){.c9{padding:0}.c9 .fls{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.c9 .fl{position:static;box-shadow:none}}`,
  html:`<div class="cwrap cstage"><div class="c9">
  <div class="main ph ph-b">ויז'ואל מרכזי</div>
  <div class="fls"><span class="fl f1"><bdi dir="ltr">+38%</bdi> המרה</span><span class="fl f2">"עבודה מדויקת"</span><span class="fl f3">4.9 דירוג</span></div>
</div></div>`
}),
doc({
  id:"c10", name:"פס רץ (Band)",
  desc:"רצועה צרה מקצה לקצה שחוצה את העמוד: לוגואים רצים, שורת מספרים, ציטוט יחיד, רצועת CTA.",
  when:"הפוגה בין סקשנים כבדים, הוכחה חברתית, הנעה ביניים.",
  mobile:"כמו דסקטופ. זה היתרון שלו.",
  note:"הוא כלי מקצב יותר מכלי תוכן. למקם איפה שהעמוד צריך נשימה או דחיפה, עם אוויר מעליו ומתחתיו כדי שלא ייקרא כחלק מהפסקה. **כשהוא רץ, המסילה לא מתרוקנת אף פעם** (QA 13ב): שני סטים זהים, כל אחד רחב לפחות כמו המסך, הלולאה זזה בדיוק סט אחד, והשני aria-hidden. סט קצר מהמסך השאיר עד חצי פס ריק בסוף כל סיבוב ב-1280 ויותר ב-1920 (נתפס בדמו הזה, 30.9.2026). הפס עוצר במעבר עכבר ובפוקוס (WCAG 2.2.2), ונעצר לגמרי בהפחתת תנועה.",
  tech:"פריסה · full-bleed",
  css:`${BASE}
.c10{margin-inline:calc(-1 * var(--pad));margin-block:clamp(24px,4cqi,48px);background:var(--ink);color:var(--bg);padding:18px 0;overflow:hidden}
/* שני סטים זהים, כל אחד רחב לפחות כמו המסך. חצי מסילה הוא בדיוק סט, ולכן הלולאה רציפה ולא מתרוקנת.
   ב-RTL הפריטים נכנסים משמאל, בכיוון הקריאה; בעמוד LTR הכיוון מתהפך מעצמו (:dir) */
.c10 .track{display:flex;width:max-content;animation:c10 14s linear infinite}
.c10 .track:dir(ltr){animation-name:c10-ltr}
.c10 .set{display:flex;flex-shrink:0;min-width:100vw;justify-content:space-around;gap:56px;padding-inline:28px;white-space:nowrap}
.c10 .lg{font-weight:800;font-size:18px;letter-spacing:.06em;opacity:.85}
@keyframes c10{to{transform:translateX(50%)}}
@keyframes c10-ltr{to{transform:translateX(-50%)}}
@media (hover:hover) and (pointer:fine){.c10:hover .track{animation-play-state:paused}}
.c10:focus-within .track{animation-play-state:paused}
@container (max-width:767px){.c10 .track{animation-duration:7s}}
@media (prefers-reduced-motion:reduce){.c10 .track,.c10 .track:dir(ltr){animation:none}}`,
  html:`<div class="cwrap cstage"><div class="tx m"></div><div class="tx l"></div>
<div class="c10"><div class="track">
  <div class="set"><span class="lg">LOGO</span><span class="lg">BRAND</span><span class="lg">STUDIO</span><span class="lg">HOUSE</span><span class="lg">LABS</span><span class="lg">GROUP</span></div>
  <div class="set" aria-hidden="true"><span class="lg">LOGO</span><span class="lg">BRAND</span><span class="lg">STUDIO</span><span class="lg">HOUSE</span><span class="lg">LABS</span><span class="lg">GROUP</span></div>
</div></div>
<div class="tx l"></div><div class="tx m"></div></div>`
}),
doc({
  id:"c11", name:"מסך מפוצל דביק",
  desc:"צד אחד קבוע (sticky: כותרת, ויז'ואל או ניווט משנה) בזמן שהצד השני גולל תוכן ארוך.",
  when:"רשימה ארוכה עם הקשר קבוע: תפריט, מפרט, שלבי שירות, עמודי פורטפוליו.",
  mobile:"הדביקות מתבטלת. כותרת ואז זרימה.",
  note:"הצד הדביק חייב להיות מעניין מספיק להישאר על המסך. טקסט בלבד משעמם; ויז'ואל או מספרים מתחלפים מצוין. המרחק מלמעלה נגזר מגובה ההדר של הפרויקט (`--header-h`), לא ממספר קבוע.",
  tech:"פריסה · position sticky",
  css:`${BASE}
.c11{display:grid;grid-template-columns:1fr 1.4fr;gap:clamp(20px,4cqi,64px);align-items:start}
.c11 .side{position:sticky;top:calc(var(--header-h, 64px) + 20px)}
.c11 .side .ph{aspect-ratio:1;border-radius:var(--r);margin-top:14px}
.c11 .it{background:var(--card);border-radius:var(--r);padding:20px;margin-bottom:16px;min-height:150px}
@container (max-width:767px){.c11{grid-template-columns:1fr}.c11 .side{position:static}}`,
  html:`<div class="cwrap cstage"><div class="c11">
  <div class="side"><h3 class="ttl">הצד הזה נשאר</h3><div class="tx l"></div><div class="tx m"></div><div class="ph ph-c">ויז'ואל קבוע</div></div>
  <div>
    <div class="it"><b>פריט 1</b><div class="tx l"></div><div class="tx m"></div></div>
    <div class="it"><b>פריט 2</b><div class="tx l"></div><div class="tx s"></div></div>
    <div class="it"><b>פריט 3</b><div class="tx m"></div><div class="tx l"></div></div>
    <div class="it"><b>פריט 4</b><div class="tx l"></div><div class="tx m"></div></div>
    <div class="it"><b>פריט 5</b><div class="tx l"></div><div class="tx s"></div></div>
  </div>
</div></div>`
}),
doc({
  id:"c12", name:"מסדרון אופקי",
  desc:"שורת פריטים שגולשת אופקית עם peek, הפריט הבא מציץ. קרוסלה שהיא פריסה, לא וידג'ט.",
  when:"גלריות, המלצות רבות, מוצרים, כשיש יותר פריטים מרוחב.",
  mobile:"הבית הטבעי שלו.",
  note:"בדסקטופ רק כשבאמת יש חמישה פריטים ומעלה. פחות מזה, לפרוש בגריד (פסיקת הסתרת התוכן). בדסקטופ מוסיפים חיצי הקודם והבא, כי גלגלת עכבר לא גוללת הצידה. המסדרון עצמו מקבל tabindex=\"0\", role=\"region\" ושם, כדי שמקלדת תוכל לגלול אותו וקורא מסך יידע שזו גלריה.",
  tech:"פריסה · scroll-snap",
  css:`${BASE}
.c12{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-block:6px 14px;scrollbar-width:thin}
.c12:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
.c12 .ph{flex:0 0 36%;aspect-ratio:3/4;border-radius:var(--r);scroll-snap-align:start}
@container (max-width:767px){.c12 .ph{flex-basis:78%}}`,
  html:`<div class="cwrap cstage"><h3 class="ttl">גלול הצידה, הפריט הבא מציץ</h3><div class="c12" tabindex="0" role="region" aria-label="גלריה, גלילה הצידה">
  <div class="ph ph-a">1</div><div class="ph ph-b">2</div><div class="ph ph-c">3</div><div class="ph ph-d">4</div><div class="ph ph-e">5</div><div class="ph ph-f">6</div>
</div></div>`
}),
doc({
  id:"c13", name:"פסיפס אסימטרי",
  desc:"פריטים על גריד, אבל עם הסטות מכוונות: גבהים שונים, offset אנכי, רוטציה עדינה של עד שתי מעלות.",
  when:"פורטפוליו, גלריה, עדויות. תוכן ויזואלי שרוצים שירגיש אנושי ולא תבניתי.",
  mobile:"ההסטות מצטמצמות (טור עם הסטות קלות) או ערימה.",
  note:"האסימטריה מבוימת. הגריד מתחת חייב להישאר, אחרת זה נראה שבור. **ההסטה ב-transform, קטנה מה-gap, ולעולם לא margin שלילי**: margin שלילי מושך את השורה הבאה ופריט עולה על פריט (פיצ׳ 24.9.2026, אריחי התגובות). project-check (flow-overlap) תופס.",
  css:`${BASE}
.c13{--g:clamp(14px,2.4cqi,32px);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--g);align-items:start}
.c13 .ph{border-radius:var(--r)}
/* ההסטה נגזרת מה-gap ותמיד קטנה ממנו, גם כשהגריד צר וה-gap יורד ל-14 */
.c13 .a{aspect-ratio:4/5}.c13 .b{aspect-ratio:1;transform:translateY(min(28px, var(--g) - 4px)) rotate(-1.5deg)}.c13 .c{aspect-ratio:3/4;transform:translateY(-10px)}
.c13 .d{aspect-ratio:1;transform:rotate(1.2deg)}.c13 .e{aspect-ratio:4/5;transform:translateY(min(22px, var(--g) - 4px))}.c13 .f{aspect-ratio:1;transform:translateY(-6px) rotate(-1deg)}
@container (max-width:767px){.c13{grid-template-columns:repeat(2,1fr)}.c13 .b{transform:translateY(12px)}.c13 .e{transform:translateY(10px)}.c13 .c,.c13 .f{transform:none}}`,
  html:`<div class="cwrap cstage"><div class="c13">
  <div class="ph ph-a a">1</div><div class="ph ph-b b">2</div><div class="ph ph-c c">3</div>
  <div class="ph ph-d d">4</div><div class="ph ph-e e">5</div><div class="ph ph-f f">6</div>
</div></div>`
}),
doc({
  id:"c14", name:"מונולוג ממורכז",
  desc:"בלוק טקסט יחיד ממורכז על רקע נקי או אווירה: הצהרה, ציטוט, שאלה. אפס אלמנטים מתחרים.",
  when:"רגע אווירה, מעבר בין פרקי עמוד, משפט המותג.",
  mobile:"כמו דסקטופ.",
  note:"העוצמה מהבדידות: measure צר, גודל גדול, המון אוויר מעל ומתחת. המרכוז דורש margin-inline:auto על הפסקה, לא רק text-align.",
  tech:"פריסה · טיפוגרפיה",
  css:`${BASE}
.c14{text-align:center;padding-block:clamp(40px,10cqi,140px)}
.c14 p{font-size:clamp(26px,3.2cqi,44px);line-height:1.3;font-weight:600;max-width:24ch;margin:0 auto}
.c14 small{display:block;color:var(--muted);margin-top:18px;font-size:14px}`,
  html:`<div class="cwrap cstage"><div class="c14">
  <p>משפט אחד שאומר את כל מה שהעמוד הזה מנסה לומר.</p>
  <small>מי אמר, ולמה זה חשוב</small>
</div></div>`
}),
doc({
  id:"c15", name:"דו-קומה",
  desc:"קומה עליונה: פריט גיבור רחב (רוחב מלא או שני שלישים). קומה תחתונה: שורת שלושה או ארבעה פריטים קטנים.",
  when:"תוכן עם היררכיה ברורה: מוצר דגל ומשלימים, מאמר ראשי ועוד, שירות עיקרי ומשניים.",
  mobile:"הגיבור נערם (ויז'ואל ואז טקסט), והקטנים בשתי עמודות. מעל ארבעה קטנים: קרוסלת peek.",
  note:"הגיבור חייב להיראות שונה (גודל, כיוון פריסה), לא רק ראשון.",
  css:`${BASE}
.c15 .hero{display:grid;grid-template-columns:1.6fr 1fr;gap:clamp(16px,3cqi,40px);background:var(--card);border-radius:var(--r);padding:clamp(18px,3cqi,36px);align-items:center}
.c15 .hero .ph{aspect-ratio:16/10;border-radius:var(--r)}
.c15 .row{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,2cqi,24px);margin-top:clamp(16px,3cqi,32px)}
.c15 .row .it{background:var(--card);border-radius:var(--r);padding:16px}
.c15 .row .ph{aspect-ratio:1;border-radius:10px;margin-bottom:12px}
@container (max-width:767px){.c15 .hero{grid-template-columns:1fr}.c15 .row{grid-template-columns:repeat(2,1fr)}}`,
  html:`<div class="cwrap cstage"><div class="c15">
  <div class="hero"><div class="ph ph-a">הגיבור</div><div><h3 class="ttl">הפריט הראשי נראה אחרת</h3><div class="tx l"></div><div class="tx m"></div><span class="btn">פעולה</span></div></div>
  <div class="row">
    <div class="it"><div class="ph ph-b">1</div><div class="tx l"></div></div>
    <div class="it"><div class="ph ph-c">2</div><div class="tx l"></div></div>
    <div class="it"><div class="ph ph-d">3</div><div class="tx l"></div></div>
    <div class="it"><div class="ph ph-e">4</div><div class="tx l"></div></div>
  </div>
</div></div>`
}),
doc({
  id:"c16", name:"שער כפול",
  desc:"שני בלוקים גדולים זה לצד זה, כל אחד שער לעולם אחר: שני קהלים, שני מסלולים, לפני ואחרי.",
  when:"פיצול קהלים (\"לעסקים / לפרטיים\"), השוואה, שתי הצעות שקולות.",
  mobile:"ערימה עם הפרדה ברורה.",
  note:"סימטריה מכוונת. זו הפעם שבה שני אלמנטים כן שווים בדיוק; ההבדל בצבע ובוויז'ואל, לא בגודל. כל שער הוא קישור אחד (`<a>`) שמגיעים אליו במקלדת, והכותרת הלבנה יושבת על שכבת הצללה מקומית מלמטה: בלעדיה, על הצד הבהיר של התמונה, היא יורדת ל-1.9:1.",
  css:`${BASE}
.c16{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.c16 .gate{position:relative;isolation:isolate;min-height:clamp(220px,32cqi,380px);border-radius:var(--r);padding:clamp(20px,3cqi,40px);display:flex;flex-direction:column;justify-content:flex-end;color:#fff;align-items:flex-start;text-decoration:none}
/* שכבת הקריאות: מתחת לאזור הטקסט בלבד, כי הטקסט לבן גם כשהתמונה בהירה */
.c16 .gate::before{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(to top,rgba(16,18,43,.55),rgba(16,18,43,0) 65%);z-index:-1}
.c16 .gate:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.c16 .gate .btn{background:var(--bg);color:var(--ink)}
@container (max-width:767px){.c16{grid-template-columns:1fr;gap:16px}}`,
  html:`<div class="cwrap cstage"><div class="c16">
  <a class="gate ph ph-a" href="#"><h3 class="ttl">לעסקים</h3><span class="btn">להמשיך כאן</span></a>
  <a class="gate ph ph-e" href="#"><h3 class="ttl">לפרטיים</h3><span class="btn">להמשיך כאן</span></a>
</div></div>`
}),
];
