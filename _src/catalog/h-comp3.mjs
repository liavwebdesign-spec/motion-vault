// קומפוזיציות C17-C28: סקשנים עם אופי (25.10.2026, ליאב בחר את הכיוון מתוך שלושה; C26 ו-C27 נמחקו בסקירה).
// כל אחת ממופה לסקשן שכמעט כל אתר צריך (המלצות, תהליך, צוות, מחירים, השוואה, שירותים,
// מספרים, קשר, גלריה, סגירה), ונותנת לו פריסה עם עמדה במקום הגריד הצפוי.
// אותם כללים כמו ב-h-comp1.mjs: דמו ניטרלי, קריסה ב-@container, צבעים מטוקנים בלבד.
//
// מספור (qa-checklist 11ב, 19.10.2026): מספר מופיע רק כשהסדר הוא מידע. במדרגות (C18) הוא
// בתוך <ol>; באינדקס השירותים (C22) אין מספרים, כי שירותים הם לא רצף, והשורה נושאת ספירת עבודות.
import { BASE } from "./h-comp1.mjs";

const doc = (o) => ({ cat: "comp", area: "doctrine", status: "מאושר", runway: false, tech: "פריסה · CSS Grid", ...o });

// סימן V בעיגול ומקף, של ההשוואה (C21). הצורה פיזית (left), כי זה סימן ולא טקסט.
const MARKS = `.mk{position:relative;display:inline-block;flex:none;width:20px;height:20px;border-radius:50%;vertical-align:middle}
.mk.y{background:var(--ink)}
.mk.y::after{content:"";position:absolute;left:7px;top:3px;width:5px;height:10px;border:solid var(--bg);border-width:0 2px 2px 0;transform:rotate(45deg)}
.mk.n::after{content:"";position:absolute;left:4px;top:9px;width:12px;height:2px;border-radius:2px;background:currentColor;opacity:.7}`;

export default [
doc({
  id:"c17", name:"המלצה גיבור וקיר קטן",
  desc:"המלצה אחת גדולה על משטח כהה, עם שם, תפקיד ודיוקן, ולידה קיר של ארבע המלצות קצרות על משטח בהיר.",
  when:"כשיש המלצה אחת שחזקה בבירור מהשאר (לקוח מוכר, תוצאה מדידה), ועוד כמה שתומכות בה.",
  mobile:"הגיבורה נשארת ראשונה ברוחב מלא, והקיר הופך לשורת גלילה הצידה שהפריט הבא מציץ בה.",
  note:"ההבדל בין הגיבורה לקיר הוא בגודל ובמשטח, לא רק בסדר: אם שתיהן באותו כרטיס, זה גריד. ההמלצה היא `<figure>` עם `<blockquote>` ו-`<figcaption>`, כדי שקורא מסך יידע מי אמר. שורת הגלילה בטלפון מקבלת tabindex=\"0\", role=\"region\" ושם, כמו C12.",
  tech:"פריסה · CSS Grid · scroll-snap",
  css:`${BASE}
.c17{display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(12px,2cqi,24px);align-items:stretch}
.c17 .hq{margin:0;background:var(--ink);color:var(--bg);border-radius:var(--r);padding:clamp(24px,4cqi,56px);display:flex;flex-direction:column;justify-content:space-between;gap:32px}
.c17 blockquote{margin:0;font-size:clamp(22px,2.4cqi,32px);line-height:1.35;font-weight:600;max-width:24ch}
.c17 blockquote::before{content:"”";display:block;font-size:2.6em;line-height:.7;opacity:.4}
.c17 .who{display:flex;align-items:center;gap:12px;font-size:15px;font-weight:700}
.c17 .who .av{width:48px;height:48px;border-radius:50%;flex:none}
.c17 .who small{display:block;font-weight:400;opacity:.75;font-size:13px;margin-top:2px}
.c17 .wall{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6cqi,20px);margin:0;padding:0;list-style:none}
.c17 .wall li{background:var(--card);border-radius:var(--r);padding:20px;display:flex;flex-direction:column;justify-content:space-between;gap:12px}
.c17 .wall b{font-size:14px}
.c17 .wall .tx{margin:6px 0}
@container (max-width:767px){
  .c17{grid-template-columns:1fr}
  .c17 .wall{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}
  .c17 .wall li{flex:0 0 78%;scroll-snap-align:start;min-height:150px}
}`,
  html:`<div class="cwrap cstage"><div class="c17">
  <figure class="hq">
    <blockquote>המשפט הכי חזק שלקוח אמר עליכם, במילים שלו ובאורך של שתי שורות.</blockquote>
    <figcaption class="who"><span class="av ph ph-c" aria-hidden="true"></span><span>שם הלקוח<small>תפקיד · שם העסק</small></span></figcaption>
  </figure>
  <ul class="wall" tabindex="0" role="region" aria-label="עוד המלצות">
    <li><div><div class="tx l"></div><div class="tx m"></div><div class="tx s"></div></div><b>שם · עסק</b></li>
    <li><div><div class="tx l"></div><div class="tx l"></div><div class="tx s"></div></div><b>שם · עסק</b></li>
    <li><div><div class="tx m"></div><div class="tx l"></div></div><b>שם · עסק</b></li>
    <li><div><div class="tx l"></div><div class="tx m"></div><div class="tx m"></div></div><b>שם · עסק</b></li>
  </ul>
</div></div>`
}),
doc({
  id:"c18", name:"מדרגות",
  desc:"שלושה עד חמישה שלבים בטורים, וכל שלב מתחיל נמוך מקודמו. הטורים נגמרים באותו קו, ולכן הצללית היא גרם מדרגות שיורד באלכסון אל השלב האחרון.",
  when:"תהליך קצר שבאמת עוקב, כשרוצים שהעין תרד אל הסוף: \"איך זה עובד\", שלבי עבודה, הדרך עד ההשקה.",
  mobile:"הטורים נערמים, וכל שלב זז פנימה קצת יותר מקודמו. האלכסון נשמר.",
  note:"השלבים הם `<ol>`, ולכן המספר מותר: הסדר הוא המידע. השלב האחרון מקבל את המשטח הכהה ואת הפעולה, כי לשם המדרגות מובילות. מעל חמישה שלבים המדרגה הראשונה נעשית גבוהה מדי: C6.",
  css:`${BASE}
.c18{--rise:clamp(28px,6cqi,72px);list-style:none;margin:clamp(20px,3cqi,40px) 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(8px,1.2cqi,16px)}
.c18 li{background:var(--card);border-radius:var(--r);padding:clamp(18px,2.4cqi,28px)}
.c18 li:nth-child(2){margin-top:var(--rise)}
.c18 li:nth-child(3){margin-top:calc(var(--rise) * 2)}
.c18 li:nth-child(4){margin-top:calc(var(--rise) * 3)}
.c18 .n{display:block;font-size:clamp(28px,3.4cqi,44px);font-weight:800;line-height:1;color:var(--muted)}
.c18 h4{margin:14px 0 6px;font-size:clamp(17px,1.6cqi,20px)}
.c18 .end{background:var(--ink);color:var(--bg)}
.c18 .end .n{color:inherit;opacity:.6}
.c18 .end .btn{background:var(--bg);color:var(--ink)}
@container (max-width:767px){
  .c18{grid-template-columns:1fr;gap:12px}
  .c18 li{margin-top:0 !important}
  .c18 li:nth-child(2){margin-inline-start:16px}
  .c18 li:nth-child(3){margin-inline-start:32px}
  .c18 li:nth-child(4){margin-inline-start:48px}
}`,
  html:`<div class="cwrap cstage"><h3 class="ttl">ארבעה צעדים עד שזה באוויר</h3>
<ol class="c18">
  <li><span class="n">01</span><h4>שיחת היכרות</h4><div class="tx l"></div><div class="tx m"></div></li>
  <li><span class="n">02</span><h4>סקיצה ראשונה</h4><div class="tx l"></div><div class="tx s"></div></li>
  <li><span class="n">03</span><h4>תיקונים</h4><div class="tx m"></div><div class="tx l"></div></li>
  <li class="end"><span class="n">04</span><h4>עולים לאוויר</h4><div class="tx l"></div><span class="btn">להתחיל</span></li>
</ol></div>`
}),
doc({
  id:"c19", name:"צוות בגבהים שונים",
  desc:"דיוקנאות בשורה, כל אחד בגובה אחר והתחתיות על קו אחד, כמו קו רקיע. השם רץ לאורך הצד של התמונה, והתפקיד מתחתיה.",
  when:"צוות של שלושה עד שישה אנשים באתר תדמית, סטודיו או משרד, כשרוצים שהאנשים ירגישו כמו אנשים ולא כמו כרטיסי עובד.",
  mobile:"שני טורים. הגבהים השונים נשמרים, וכל שורה מיושרת לתחתית.",
  note:"הגובה המשתנה עובד רק כשהצילומים אחידים בתאורה ובחיתוך. אחרת זה נראה כמו טעות. השם הוא טקסט אמיתי (writing-mode), לא חלק מהתמונה, ולכן קורא מסך ומנוע חיפוש קוראים אותו. שם ארוך משלוש מילים לא נכנס לצד: C4.",
  tech:"פריסה · CSS Grid · writing-mode",
  css:`${BASE}
.c19h{text-align:center}
.c19{list-style:none;margin:clamp(20px,3cqi,40px) 0 0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,2.4cqi,32px);align-items:end}
.c19 li{display:grid;grid-template-columns:auto 1fr;column-gap:10px;align-items:end}
.c19 .nm{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;font-size:clamp(15px,1.4cqi,18px);white-space:nowrap;line-height:1}
.c19 .ph{border-radius:var(--r)}
.c19 .p1{aspect-ratio:4/5}.c19 .p2{aspect-ratio:3/5}.c19 .p3{aspect-ratio:3/4}.c19 .p4{aspect-ratio:2/3}
.c19 .role{grid-column:2;color:var(--muted);font-size:14px;margin-top:10px}
@container (max-width:767px){.c19{grid-template-columns:1fr 1fr;row-gap:24px}}`,
  html:`<div class="cwrap cstage"><h3 class="ttl c19h">האנשים שעובדים על זה</h3>
<ul class="c19">
  <li><span class="nm">נועה לוי</span><div class="ph ph-a p1" role="img" aria-label="דיוקן"></div><span class="role">עיצוב</span></li>
  <li><span class="nm">דני כהן</span><div class="ph ph-b p2" role="img" aria-label="דיוקן"></div><span class="role">פיתוח</span></li>
  <li><span class="nm">מאיה רז</span><div class="ph ph-c p3" role="img" aria-label="דיוקן"></div><span class="role">אסטרטגיה</span></li>
  <li><span class="nm">יואב בר</span><div class="ph ph-e p4" role="img" aria-label="דיוקן"></div><span class="role">ניהול פרויקט</span></li>
</ul></div>`
}),
doc({
  id:"c20", name:"מחירים עם עוגן מורם",
  desc:"שלוש חבילות, והאמצעית גבוהה מהשתיים שלצדה, על משטח כהה ועם תג. היא בולטת מעל ומתחת לשורה, והשתיים האחרות הן ההקשר שלה.",
  when:"עמוד מחירים או סקשן חבילות, כשיש חבילה אחת שרוצים שרוב האנשים יבחרו.",
  mobile:"נערמות לפי הסדר, והעוגן נשאר כהה וגבוה. לא מקדמים אותו עם order, כי סדר הקריאה וסדר הטאב חייבים להיות זהים לסדר שרואים.",
  note:"העוגן גבוה בזכות ריפוד, לא בזכות transform: כך הוא דוחף את השורה ולא עולה על מה שמעליה. מבטא אחד בלבד בעוגן, על הכפתור, והתג שקט. החבילות שבצדדים מקבלות כפתור משני (קו מתאר), כי קו בכפתור משני הוא מידע.",
  css:`${BASE}
.c20h{text-align:center}
.c20{display:grid;grid-template-columns:1fr 1.12fr 1fr;gap:clamp(12px,1.6cqi,20px);align-items:center;margin-top:clamp(24px,4cqi,48px)}
.c20 .tier{background:var(--card);border-radius:var(--r);padding:clamp(20px,2.6cqi,32px)}
.c20 .anchor{background:var(--ink);color:var(--bg);padding-block:clamp(32px,4.4cqi,56px)}
.c20 .tag{display:inline-block;background:color-mix(in srgb,var(--bg) 16%,transparent);font-size:13px;font-weight:700;border-radius:999px;padding:4px 12px;margin-bottom:12px}
.c20 h4{margin:0;font-size:18px}
.c20 .pr{margin:12px 0 16px;display:flex;align-items:baseline;gap:8px}
.c20 .pr b{font-size:clamp(30px,3.4cqi,44px);line-height:1;font-variant-numeric:tabular-nums}
.c20 .pr small{color:var(--muted);font-size:14px}
.c20 .anchor .pr small{color:inherit;opacity:.75}
.c20 ul{list-style:none;margin:0;padding:0}
.c20 li{display:flex;align-items:center;gap:10px}
.c20 li::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.5;flex:none}
.c20 li .tx{flex:1;margin:8px 0}
.c20 .btn{display:block;text-align:center;margin-top:20px}
.c20 .tier:not(.anchor) .btn{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink)}
.c20 .anchor .btn{background:var(--accent);color:var(--accent-ink)}
@container (max-width:767px){.c20{grid-template-columns:1fr}}`,
  html:`<div class="cwrap cstage"><h3 class="ttl c20h">שלוש חבילות, אחת בולטת</h3>
<div class="c20">
  <div class="tier"><h4>בסיס</h4><p class="pr"><b>₪1,900</b><small>תשלום אחד</small></p><ul><li><div class="tx l"></div></li><li><div class="tx m"></div></li><li><div class="tx m"></div></li></ul><span class="btn">לבחור</span></div>
  <div class="tier anchor"><span class="tag">הכי נבחרת</span><h4>מלאה</h4><p class="pr"><b>₪4,900</b><small>תשלום אחד</small></p><ul><li><div class="tx l"></div></li><li><div class="tx m"></div></li><li><div class="tx l"></div></li><li><div class="tx m"></div></li><li><div class="tx s"></div></li></ul><span class="btn">לבחור</span></div>
  <div class="tier"><h4>פרימיום</h4><p class="pr"><b>₪8,900</b><small>תשלום אחד</small></p><ul><li><div class="tx l"></div></li><li><div class="tx m"></div></li><li><div class="tx l"></div></li></ul><span class="btn">לבחור</span></div>
</div></div>`
}),
doc({
  id:"c21", name:"אנחנו מול האחרים",
  desc:"טבלת השוואה בשורה לכל נקודה: שם הנקודה, הערך אצלנו והערך המקובל. הטור שלנו יושב על משטח רציף אחד מלמעלה עד למטה, והטור השני שקט.",
  when:"כשהלקוחות משווים, וההבדל נמדד בנקודות ברורות: זמן, מה כלול, מה קורה אחרי. גם \"לפני ואחרי\" של שיטת עבודה.",
  mobile:"הטבלה נשארת טבלה, עם ריפוד קטן יותר. הערכים צריכים להיות קצרים (מילה עד שלוש), וזה גם מה שעושה אותם חזקים.",
  note:"זו טבלה אמיתית (`<table>`, `th scope`), כי ההשוואה היא נתונים בשתי עמודות. היא ברוחב קריאה (עד 880 פיקסלים) ובמרכז, כי טבלה שפרושה על כל הרוחב קשה לסרוק לאורך שורה. השורות מופרדות ברווח בלבד, והמשטח הרציף של הטור שלנו הוא המבנה. \"האחרים\" הם המקובל בשוק, לא מתחרה בשם. שורה שבה אנחנו לא עדיפים לא נכנסת.",
  tech:"פריסה · טבלה",
  css:`${BASE}
${MARKS}
.c21h{text-align:center}
.c21{width:100%;max-width:880px;border-collapse:separate;border-spacing:0;margin:clamp(20px,3cqi,40px) auto 0;font-size:clamp(15px,1.3cqi,17px)}
.c21 th,.c21 td{padding:clamp(14px,1.8cqi,20px) clamp(12px,2cqi,24px);text-align:start;vertical-align:middle}
.c21 thead th{font-size:14px;font-weight:700;color:var(--muted)}
.c21 tbody th{font-weight:600;width:40%}
.c21 .us{background:var(--card);font-weight:700}
.c21 thead .us{color:var(--ink);border-start-start-radius:var(--r);border-start-end-radius:var(--r)}
.c21 tbody tr:last-child .us{border-end-start-radius:var(--r);border-end-end-radius:var(--r)}
.c21 td:not(.us){color:var(--muted)}
.c21 .mk{margin-inline-end:10px}
@container (max-width:767px){.c21{font-size:14px}.c21 th,.c21 td{padding:12px 8px}.c21 .mk{display:none}}`,
  html:`<div class="cwrap cstage"><h3 class="ttl c21h">מה ההבדל, נקודה אחרי נקודה</h3>
<table class="c21">
  <thead><tr><td></td><th scope="col" class="us">אצלנו</th><th scope="col">בדרך כלל</th></tr></thead>
  <tbody>
    <tr><th scope="row">זמן עד סקיצה ראשונה</th><td class="us"><span class="mk y" aria-hidden="true"></span>שבוע</td><td><span class="mk n" aria-hidden="true"></span>חודש ויותר</td></tr>
    <tr><th scope="row">מי כותב את הטקסטים</th><td class="us"><span class="mk y" aria-hidden="true"></span>אנחנו</td><td><span class="mk n" aria-hidden="true"></span>אתם</td></tr>
    <tr><th scope="row">סבבי תיקונים</th><td class="us"><span class="mk y" aria-hidden="true"></span>עד שזה נכון</td><td><span class="mk n" aria-hidden="true"></span>שניים</td></tr>
    <tr><th scope="row">אחרי ההשקה</th><td class="us"><span class="mk y" aria-hidden="true"></span>חודש ליווי</td><td><span class="mk n" aria-hidden="true"></span>לפי שעה</td></tr>
  </tbody>
</table></div>`
}),
doc({
  id:"c22", name:"אינדקס שירותים",
  desc:"רשימה של שמות שירות בגודל ענק, שורה לכל שירות, וכל שורה היא קישור. במעבר עכבר השורה מקבלת משטח, תמונה קטנה מציצה בקצה, והשורות האחרות מתעמעמות.",
  when:"סטודיו, משרד או נותן שירות עם ארבעה עד שבעה תחומים, כשהשמות קצרים ורוצים שהשירותים עצמם יהיו הוויז'ואל.",
  mobile:"השם נשאר גדול, ספירת העבודות יורדת מתחתיו, והתמונה הקטנה גלויה תמיד בקצה, כי במגע אין מעבר עכבר.",
  note:"בלי מספרים לפני השמות: שירותים הם לא רצף, ומספור לקישוט מסגיר AI (qa-checklist 11ב). מה שמפריד בין השורות הוא הגודל והרווח, לא קו. התמונה המציצה היא בונוס של מעבר עכבר ולא מידע, ולכן היא aria-hidden. הפוקוס מהמקלדת מקבל את אותו מצב כמו העכבר.",
  tech:"פריסה · hover",
  css:`${BASE}
.c22{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.c22 a{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:clamp(12px,2.4cqi,32px);padding:clamp(10px,1.4cqi,16px) clamp(12px,2cqi,24px);border-radius:var(--r);color:inherit;text-decoration:none;transition:background-color .3s cubic-bezier(.2,.6,.2,1)}
.c22 .nm{font-size:clamp(34px,6.4cqi,88px);font-weight:800;line-height:1.05;letter-spacing:-.02em;transition:opacity .3s cubic-bezier(.2,.6,.2,1)}
.c22 .meta{color:var(--muted);font-size:14px;white-space:nowrap;align-self:start;margin-top:.5em}
.c22 .pk{width:clamp(72px,10cqi,128px);aspect-ratio:4/3;border-radius:10px;transform:rotate(-3deg)}
.c22 .go{font-size:24px;line-height:1}
.c22 a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (hover:hover) and (pointer:fine){
  .c22 .pk{opacity:0;transform:translateY(8px) rotate(-6deg) scale(.9);transition:opacity .3s cubic-bezier(.2,.6,.2,1),transform .4s cubic-bezier(.2,.6,.2,1)}
  .c22 a:hover,.c22 a:focus-visible{background-color:var(--card)}
  .c22 a:hover .pk,.c22 a:focus-visible .pk{opacity:1;transform:rotate(-3deg)}
  .c22:hover a:not(:hover) .nm{opacity:.35}
}
@media (prefers-reduced-motion:reduce){.c22 .pk{transform:rotate(-3deg) !important}}
@container (max-width:767px){
  .c22 a{grid-template-columns:1fr auto;grid-template-areas:"nm pk" "meta pk";row-gap:4px}
  .c22 .nm{grid-area:nm}.c22 .meta{grid-area:meta;margin-top:0}.c22 .pk{grid-area:pk;width:72px;opacity:1 !important;transform:rotate(-3deg) !important}.c22 .go{display:none}
}`,
  html:`<div class="cwrap cstage"><ul class="c22">
  <li><a href="#"><span class="nm">מיתוג</span><span class="meta">12 עבודות</span><span class="pk ph ph-a" aria-hidden="true"></span><span class="go" aria-hidden="true">←</span></a></li>
  <li><a href="#"><span class="nm">אתרים</span><span class="meta">38 עבודות</span><span class="pk ph ph-b" aria-hidden="true"></span><span class="go" aria-hidden="true">←</span></a></li>
  <li><a href="#"><span class="nm">חנויות</span><span class="meta">9 עבודות</span><span class="pk ph ph-c" aria-hidden="true"></span><span class="go" aria-hidden="true">←</span></a></li>
  <li><a href="#"><span class="nm">קמפיינים</span><span class="meta">21 עבודות</span><span class="pk ph ph-e" aria-hidden="true"></span><span class="go" aria-hidden="true">←</span></a></li>
  <li><a href="#"><span class="nm">מערכות</span><span class="meta">6 עבודות</span><span class="pk ph ph-d" aria-hidden="true"></span><span class="go" aria-hidden="true">←</span></a></li>
</ul></div>`
}),
doc({
  id:"c23", name:"מספר אחד וסרגל שמפרק אותו",
  desc:"מספר אחד ענק עם שורת הסבר לצדו, ומתחתיו סרגל ברוחב מלא שמחולק לפי מה שמרכיב את המספר. מתחת לכל חלק בסרגל, הערך והשם שלו.",
  when:"מספר גיבור שיש לו הרכב מעניין: מאיפה הגיעו הפניות, לאן הלך התקציב, איך מתחלקים הלקוחות.",
  mobile:"המספר והסרגל נשארים ברוחב מלא. המקרא יורד לשני טורים, עם ריבוע צבע ליד כל שורה.",
  note:"החלקים חייבים להסתכם במספר הגדול, אחרת הסרגל משקר. הגוונים הם מדרגות של צבע הדיו ולא צבעים שונים, כדי שהסקשן יתלבש בכל עור. הסרגל aria-hidden, והמקרא הוא רשימה שנושאת את כל הנתונים. מספר עם פסיק עטוף ב-`<bdi dir=\"ltr\">`.",
  css:`${BASE}
.c23 .top{display:flex;align-items:flex-end;flex-wrap:wrap;gap:12px 32px}
.c23 .big{margin:0;font-size:clamp(72px,13cqi,180px);font-weight:800;line-height:.9;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.c23 .lbl{margin:0 0 .6em;max-width:22ch;font-size:clamp(17px,1.6cqi,22px);font-weight:600;line-height:1.35}
.c23 .bar,.c23 .leg{display:grid;grid-template-columns:46fr 28fr 18fr 8fr;gap:4px}
.c23 .bar{margin-top:clamp(24px,4cqi,48px);height:clamp(14px,1.6cqi,20px)}
.c23 .bar i{border-radius:6px}
.c23 .s1{background:var(--ink)}
.c23 .s2{background:color-mix(in srgb,var(--ink) 62%,var(--bg))}
.c23 .s3{background:color-mix(in srgb,var(--ink) 36%,var(--bg))}
.c23 .s4{background:color-mix(in srgb,var(--ink) 18%,var(--bg))}
.c23 .leg{list-style:none;margin:12px 0 0;padding:0;font-size:14px;color:var(--muted)}
.c23 .leg b{display:block;color:var(--ink);font-size:clamp(18px,1.8cqi,24px);font-variant-numeric:tabular-nums}
.c23 .leg li::before{content:none}
@container (max-width:767px){
  .c23 .leg{grid-template-columns:1fr 1fr;row-gap:14px}
  .c23 .leg li{display:grid;grid-template-columns:auto 1fr;column-gap:8px}
  .c23 .leg li::before{content:"";grid-row:1 / 3;width:12px;height:12px;border-radius:3px;margin-top:6px}
  .c23 .leg li:nth-child(1)::before{background:var(--ink)}
  .c23 .leg li:nth-child(2)::before{background:color-mix(in srgb,var(--ink) 62%,var(--bg))}
  .c23 .leg li:nth-child(3)::before{background:color-mix(in srgb,var(--ink) 36%,var(--bg))}
  .c23 .leg li:nth-child(4)::before{background:color-mix(in srgb,var(--ink) 18%,var(--bg))}
}`,
  html:`<div class="cwrap cstage"><div class="c23">
  <div class="top"><p class="big"><bdi dir="ltr">1,240</bdi></p><p class="lbl">פניות שהגיעו מהאתר בשנה האחרונה</p></div>
  <div class="bar" aria-hidden="true"><i class="s1"></i><i class="s2"></i><i class="s3"></i><i class="s4"></i></div>
  <ul class="leg"><li><b>570</b>מחיפוש בגוגל</li><li><b>347</b>מאינסטגרם</li><li><b>223</b>מהמלצות</li><li><b>100</b>מקמפיינים</li></ul>
</div></div>`
}),
doc({
  id:"c24", name:"כרטיס קשר שרוכב על מפה",
  desc:"מפה רחבה ברוחב הסקשן, ועליה, בצד ההתחלה, כרטיס עם כל מה שצריך כדי להגיע: כתובת, טלפון, שעות וכפתור ניווט. הסיכה על המפה יושבת בחלק שהכרטיס לא מכסה.",
  when:"סקשן קשר של עסק שמגיעים אליו פיזית: קליניקה, חנות, משרד, מסעדה.",
  mobile:"המפה מתקצרת לרצועה, והכרטיס יורד מתחתיה ועולה עליה בחלקו. החפיפה בנויה בגריד (שני אזורים חופפים), לא ב-margin שלילי.",
  note:"הכרטיס הוא HTML אמיתי: הטלפון קישור tel, הכתובת טקסט שאפשר להעתיק. המפה היא תמונה סטטית או iframe עם title ו-loading=\"lazy\", ושום מידע לא חי רק בתוכה. הכרטיס והמפה באותו תא בגריד, ולכן הכרטיס לא יוצא מהסקשן גם כשהטקסט מתארך.",
  tech:"פריסה · שכבות בגריד",
  css:`${BASE}
.c24{display:grid;grid-template-columns:minmax(260px,380px) 1fr}
.c24 .map{grid-column:1 / -1;grid-row:1;min-height:clamp(340px,40cqi,480px);border-radius:var(--r);position:relative;overflow:hidden;
  background-color:color-mix(in srgb,var(--ink) 6%,var(--bg));
  background-image:linear-gradient(28deg,transparent 46%,var(--card) 46% 48.5%,transparent 48.5%),linear-gradient(-58deg,transparent 60%,var(--card) 60% 62%,transparent 62%),linear-gradient(90deg,transparent 30%,var(--card) 30% 31.2%,transparent 31.2%),radial-gradient(circle at 18% 78%,color-mix(in srgb,var(--ink) 10%,transparent) 0 64px,transparent 65px)}
.c24 .pin{position:absolute;top:40%;inset-inline-start:66%;width:24px;height:24px;border-radius:50% 50% 50% 0;background:var(--accent);transform:rotate(-45deg);box-shadow:0 0 0 10px color-mix(in srgb,var(--accent) 20%,transparent)}
.c24 .card{grid-column:1;grid-row:1;align-self:center;position:relative;margin:clamp(16px,3cqi,40px);background:var(--card);border-radius:var(--r);padding:clamp(20px,2.6cqi,32px);box-shadow:0 18px 40px rgba(22,24,43,.12)}
.c24 dl{margin:16px 0 0;display:grid;grid-template-columns:auto 1fr;gap:8px 16px;font-size:15px}
.c24 dt{color:var(--muted)}
.c24 dd{margin:0;font-weight:600}
.c24 dd a{color:inherit}
@container (max-width:767px){
  .c24{grid-template-columns:1fr;grid-template-rows:200px 48px auto}
  .c24 .map{grid-row:1 / 3;min-height:0}
  .c24 .card{grid-row:2 / 4;margin:0 12px}
}`,
  html:`<div class="cwrap cstage"><div class="c24">
  <div class="map" role="img" aria-label="מפה עם מיקום העסק"><span class="pin"></span></div>
  <div class="card"><h3 class="ttl">בואו להיפגש</h3><p class="lead">רחוב הדוגמה 12, תל אביב</p>
    <dl><dt>טלפון</dt><dd><a href="tel:+97230000000"><bdi dir="ltr">03-000-0000</bdi></a></dd><dt>שעות</dt><dd>ראשון עד חמישי, 9:00 עד 18:00</dd></dl>
    <span class="btn">לנווט לכאן</span></div>
</div></div>`
}),
doc({
  id:"c25", name:"תמונה ראשית ופס ממוזערות",
  desc:"תמונה אחת גדולה, ומתחתיה פס של ממוזערות. לחיצה על ממוזערת מחליפה את התמונה הגדולה, והממוזערת הנבחרת מסומנת.",
  when:"פרויקט אחד עם הרבה צילומים, מוצר עם כמה זוויות, נכס או חלל שרוצים להראות לעומק.",
  mobile:"אותו מבנה. הממוזערות קטנות יותר ונשארות בשורה אחת, כי אגודל בוחר אותן בקלות.",
  note:"הממוזערות הן כפתורים עם aria-pressed ושם, לא תמונות לחיצות, ולכן עובדות במקלדת וקורא מסך אומר איזו נבחרה. בפרויקט אמיתי התמונה הגדולה היא `<img>` שה-src שלה מתחלף, והתמונות הבאות נטענות מראש. מעל עשר תמונות: C12 מסדרון אופקי.",
  tech:"פריסה · JS קטן",
  css:`${BASE}
.c25{max-width:960px;margin-inline:auto}
.c25 .main{aspect-ratio:16/9;border-radius:var(--r);position:relative}
.c25 .cap{position:absolute;bottom:16px;inset-inline-start:16px}
.c25 .thumbs{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(6px,1cqi,12px);margin-top:clamp(8px,1.2cqi,16px)}
.c25 .thumbs button{aspect-ratio:4/3;border:0;padding:0;cursor:pointer;border-radius:10px;opacity:.5;font:inherit;transition:opacity .25s cubic-bezier(.2,.6,.2,1)}
.c25 .thumbs button:hover{opacity:.85}
.c25 .thumbs button[aria-pressed="true"]{opacity:1;outline:2px solid var(--ink);outline-offset:3px}
.c25 .thumbs button:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`,
  html:`<div class="cwrap cstage"><div class="c25">
  <div class="main ph ph-a" role="img" aria-label="תמונה 1 מתוך 6"><span class="cap ph-l"><bdi dir="ltr">1 / 6</bdi></span></div>
  <div class="thumbs" role="group" aria-label="בחירת תמונה">
    <button type="button" class="ph ph-a" data-ph="ph-a" aria-pressed="true" aria-label="תמונה 1"></button>
    <button type="button" class="ph ph-b" data-ph="ph-b" aria-pressed="false" aria-label="תמונה 2"></button>
    <button type="button" class="ph ph-c" data-ph="ph-c" aria-pressed="false" aria-label="תמונה 3"></button>
    <button type="button" class="ph ph-d" data-ph="ph-d" aria-pressed="false" aria-label="תמונה 4"></button>
    <button type="button" class="ph ph-e" data-ph="ph-e" aria-pressed="false" aria-label="תמונה 5"></button>
    <button type="button" class="ph ph-f" data-ph="ph-f" aria-pressed="false" aria-label="תמונה 6"></button>
  </div>
</div></div>`,
  js:`document.querySelectorAll(".c25").forEach(function(g){
  var main=g.querySelector(".main"),cap=main.querySelector(".cap bdi"),bs=[].slice.call(g.querySelectorAll(".thumbs button"));
  bs.forEach(function(b,i){b.addEventListener("click",function(){
    bs.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});
    main.className="main ph "+b.dataset.ph;
    main.setAttribute("aria-label","תמונה "+(i+1)+" מתוך "+bs.length);
    cap.textContent=(i+1)+" / "+bs.length;
  })});
});`
}),
doc({
  id:"c28", name:"סגירה עם הוכחות סביב",
  desc:"סקשן סגירה: כותרת, משפט וכפתור באמצע, ומסביבם שש הוכחות קטנות על משטחים (דירוג, מספר לקוחות, ציטוט קצר, זמן תגובה, ערבות), שתיים מעל, שתיים בצדדים ושתיים מתחת.",
  when:"הסקשן האחרון לפני הפוטר בדף נחיתה או באתר שירות, כשרוצים שההתנגדויות האחרונות ייענו בדיוק ליד הכפתור.",
  mobile:"הכותרת והכפתור קודם, וההוכחות מתחתם בשני טורים.",
  note:"ההוכחות מונחות בגריד של שלוש על שלוש ולא במיקום מוחלט, ולכן הן לא עולות על הכפתור ולא בורחות מהסקשן בשום רוחב. ב-DOM הליבה ראשונה, כדי שקורא מסך יגיע לפעולה לפני ההוכחות. כל הוכחה חייבת להיות אמיתית וספציפית; הוכחה כללית (\"שירות מעולה\") עדיף שלא תהיה. מבטא רק על הכפתור.",
  css:`${BASE}
.c28{display:grid;grid-template-columns:1fr minmax(0,460px) 1fr;grid-template-areas:"p1 p2 ." "p3 core p4" ". p5 p6";gap:clamp(14px,2.2cqi,30px) clamp(16px,3cqi,40px);align-items:center;padding-block:clamp(12px,2cqi,24px)}
.c28 .core{grid-area:core;text-align:center;padding-block:clamp(16px,3cqi,40px)}
.c28 .core .ttl{font-size:clamp(28px,3.6cqi,48px)}
.c28 .core .lead{margin-inline:auto;max-width:32ch}
.c28 .core .btn{background:var(--accent);color:var(--accent-ink);padding:12px 24px;font-size:15px}
.c28 .pf{background:var(--card);border-radius:16px;padding:16px 20px;font-size:15px;line-height:1.45;display:flex;align-items:center;gap:12px;max-width:280px;box-shadow:0 14px 34px rgba(22,24,43,.07)}
.c28 .pf b{font-size:clamp(22px,2.2cqi,28px);line-height:1;font-variant-numeric:tabular-nums}
.c28 .pf small{display:block;color:var(--muted);font-size:13px}
.c28 .p1{grid-area:p1;justify-self:end;align-self:end}
.c28 .p2{grid-area:p2;justify-self:center;transform:translateX(-32px)}
.c28 .p3{grid-area:p3;justify-self:end}
.c28 .p4{grid-area:p4;justify-self:start;transform:translateY(-18px)}
.c28 .p5{grid-area:p5;justify-self:center;transform:translateX(36px)}
.c28 .p6{grid-area:p6;justify-self:start;align-self:start}
.c28 .avs{display:grid;grid-template-columns:repeat(3,18px);padding-inline-end:10px}
.c28 .avs i{width:28px;height:28px;border-radius:50%;box-shadow:0 0 0 2px var(--card)}
@container (max-width:767px){
  .c28{grid-template-columns:1fr 1fr;grid-template-areas:"core core" "p1 p2" "p3 p4" "p5 p6"}
  .c28 .pf{justify-self:stretch;max-width:none;transform:none;flex-direction:column;align-items:flex-start;gap:6px}
}`,
  html:`<div class="cwrap cstage"><div class="c28">
  <div class="core"><h3 class="ttl">מוכנים להתחיל?</h3><p class="lead">שיחה של עשרים דקות, בלי התחייבות, ותצאו ממנה עם תוכנית.</p><span class="btn">לקבוע שיחה</span></div>
  <div class="pf p1"><b>4.9</b><span>ממוצע<small>212 ביקורות בגוגל</small></span></div>
  <div class="pf p2"><span class="avs" aria-hidden="true"><i class="ph ph-a"></i><i class="ph ph-c"></i><i class="ph ph-e"></i></span><span>340 עסקים<small>כבר עבדו איתנו</small></span></div>
  <div class="pf p3"><span>״הכי פשוט שהיה לנו״<small>דנה, סטודיו לעיצוב</small></span></div>
  <div class="pf p4"><b>48</b><span>שעות<small>עד סקיצה ראשונה</small></span></div>
  <div class="pf p5"><span>החזר מלא<small>אם הסקיצה לא מתאימה</small></span></div>
  <div class="pf p6"><b>1</b><span>איש קשר<small>מההתחלה ועד הסוף</small></span></div>
</div></div>`
}),
];
