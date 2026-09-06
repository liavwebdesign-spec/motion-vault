// מקצבי עמוד P1-P5. מקצב הוא איך הקומפוזיציות מתחלפות לאורך הגלילה,
// ובוחרים אחד לעמוד בשלב האפיון.
//
// הדמו כאן הוא "תווים": רצף בלוקים שגובהם וצפיפותם מייצגים את הסקשנים,
// עם שם הסקשן והקומפוזיציה המומלצת לו. זה מה שצריך כדי להשוות מקצבים
// זה מול זה בעין, בלי לבנות חמישה עמודים מלאים.

const BASE = `.cwrap{container-type:inline-size}
.cstage{--pad:clamp(20px,4cqi,64px);padding:clamp(36px,5cqi,80px) var(--pad)}
.score{display:flex;flex-direction:column;gap:12px;max-width:760px;margin-inline:auto}
.rb{border-radius:var(--r);display:flex;align-items:center;justify-content:space-between;padding:0 22px;font-weight:600;font-size:14px}
.rb small{font-weight:500;color:inherit;opacity:.65}
.rich{min-height:clamp(110px,16cqi,180px);background:#eef0ff;color:#2b3a99}
.mid{min-height:clamp(84px,12cqi,120px);background:#fff;border:1px solid var(--line);color:var(--ink)}
.air{min-height:clamp(60px,9cqi,84px);background:#fafafd;border:1px dashed var(--line);color:var(--muted)}
.cta{min-height:clamp(96px,14cqi,130px);background:var(--ink);color:#fff}
.hero{min-height:clamp(120px,18cqi,200px);background:linear-gradient(160deg,#3b5bdb,#748ffc);color:#fff}`;

const doc = (o) => ({ cat: "rhythm", area: "doctrine", status: "מאושר", runway: false, tech: "מקצב עמוד", ...o });
const blk = (cls, name, comp) => `<div class="rb ${cls}"><span>${name}</span><small>${comp}</small></div>`;

export default [
doc({
  id:"p01", name:"מדורג קלאסי",
  desc:"רחב, צר, רחב, צר: סקשן עשיר (C3 או C5) ואז ממוקד (C14 או C10) וחוזר חלילה. ברירת המחדל, מקצב נשימה טבעי.",
  when:"כמעט כל עמוד שאין לו סיבה למקצב אחר.",
  mobile:"המקצב נשמר כפי שהוא, הגלילה רק מתארכת.",
  note:"אם אין סיבה טובה לבחור אחרת, זה המקצב.",
  css:BASE,
  html:`<div class="cwrap cstage"><div class="score">
${blk("hero","הירו","C9")}${blk("rich","יתרונות","C5 בנטו")}${blk("air","נשימה","C14")}${blk("rich","שירותים","C3 זיגזג")}${blk("air","הוכחה","C10 פס")}${blk("rich","עדויות","C13")}${blk("cta","סגירה","CTA")}
</div></div>`
}),
doc({
  id:"p02", name:"קרשנדו",
  desc:"הצפיפות והעוצמה עולות לקראת ה-CTA הסופי: פתיחה אוורירית, אמצע עשיר בהוכחות, סגירה אינטנסיבית.",
  when:"דפי נחיתה ומכירה.",
  mobile:"המקצב נשמר.",
  note:"הסגירה חייבת להיות הסקשן הצפוף ביותר בעמוד, אחרת הקרשנדו נשבר בדיוק ברגע שהוא נועד להגיע אליו.",
  css:BASE,
  html:`<div class="cwrap cstage"><div class="score">
${blk("hero","הירו אוורירי","C14 או C7")}${blk("air","הצהרה","C14")}${blk("mid","הבעיה","C1")}${blk("rich","הפתרון","C3")}${blk("rich","הוכחות","C5 + C13")}${blk("rich","מחירים","C4 או C16")}${blk("cta","סגירה אינטנסיבית","C9 + CTA")}
</div></div>`
}),
doc({
  id:"p03", name:"נשימות",
  desc:"אחרי כל שניים או שלושה סקשני תוכן, סקשן אוויר (C14, C10 או אווירה).",
  when:"עמודים ארוכים ואתרי תדמית פרימיום. האוויר הוא חלק מהיוקרה.",
  mobile:"סקשני האוויר נשארים. קיצורם במובייל הורג את המקצב.",
  note:"סקשן אוויר אינו סקשן ריק: יש בו משפט אחד, ציטוט, או תמונת אווירה.",
  css:BASE,
  html:`<div class="cwrap cstage"><div class="score">
${blk("hero","הירו","C9")}${blk("mid","אודות","C8 עריכתי")}${blk("mid","שירותים","C4")}${blk("air","נשימה","C14")}${blk("mid","תהליך","C6")}${blk("mid","עבודות","C13")}${blk("air","נשימה","אווירה")}${blk("cta","סגירה","CTA")}
</div></div>`
}),
doc({
  id:"p04", name:"סיפור-גלילה",
  desc:"הסקשנים נקשרים לרצף נרטיבי אחד: אלמנט חוזר (קו, מספור, דמות) מלווה את הגלילה, וכל סקשן ממשיך את קודמו. C6 כעמוד שדרה מלא.",
  when:"\"איך זה עובד\", אודות, מסע לקוח.",
  mobile:"עמוד השדרה עובר לצד הימני, כמו ב-C6.",
  note:"הכי מרשים והכי תובעני. דורש תוכן שבאמת מספר סיפור; בלי סיפור זה C6 ארוך.",
  css:`${BASE}
.score.spine{position:relative;padding-inline-start:34px}
.score.spine::before{content:"";position:absolute;inset-block:0;inset-inline-start:12px;width:2px;background:#3b5bdb;opacity:.5}
.score.spine .rb::before{content:"";position:absolute;inset-inline-start:-28px;width:10px;height:10px;border-radius:50%;background:#3b5bdb;margin-top:2px}
.score.spine .rb{position:relative}`,
  html:`<div class="cwrap cstage"><div class="score spine">
${blk("hero","פתיחה","C7 מילה ענקית")}${blk("mid","פרק 1","C6")}${blk("mid","פרק 2","C6")}${blk("air","מפנה","C14")}${blk("mid","פרק 3","C6")}${blk("mid","פרק 4","C6")}${blk("cta","סוף הסיפור","CTA")}
</div></div>`
}),
doc({
  id:"p05", name:"סנדוויץ'",
  desc:"פתיחה וסגירה חזקות (הירו דרמטי ו-CTA דרמטי), אמצע שקט ותכל'סי.",
  when:"קהל ענייני שרוצה מידע. הדרמה בקצוות, המידע נקי באמצע.",
  mobile:"המקצב נשמר.",
  note:"האמצע השקט אינו רשלני: הוא C4 ו-C1 מדויקים ונקיים, בלי אפקטים.",
  css:BASE,
  html:`<div class="cwrap cstage"><div class="score">
${blk("hero","הירו דרמטי","C9 או C7")}${blk("mid","מידע","C1")}${blk("mid","מפרט","C4")}${blk("mid","שאלות","C11")}${blk("mid","מחירים","C4")}${blk("cta","סגירה דרמטית","C16 או CTA")}
</div></div>`
}),
];
