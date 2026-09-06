// גלריית אנטי-פטרנים A1-A14: כל עמוד מציג "ככה לא" מול "ככה כן" על אותו
// בלוק ניטרלי בדיוק. המקור לכל פריט הוא לקח שכבר רשום בתורה (צ'קליסט ה-QA
// של design-dna, קריקטורות השפות, כללי המנוע), וכאן הוא מקבל עיניים.
//
// ההכרעה (6.9.2026): הסקיל library/anti-patterns.md נבנה מכאן.
// שדות: rule (החוק שנשבר ומקורו), why (למה זה נראה רע), fix (התיקון), spot
// (איך מזהים את זה בעין, בדרך כלל איפה להסתכל).

export const AP_BASE = `.cwrap{container-type:inline-size}
.ap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2.5cqi,28px);padding:clamp(24px,4cqi,56px) clamp(20px,4cqi,64px)}
.pane{position:relative;border-radius:16px;border:1px solid var(--line,#e4e4ee);background:#fff;padding:56px clamp(18px,3cqi,36px) clamp(18px,3cqi,32px);overflow:hidden;display:flex;flex-direction:column;gap:14px}
.pane .lbl{position:absolute;top:14px;inset-inline-start:14px;font-size:12px;font-weight:700;padding:4px 11px;border-radius:999px;z-index:5;line-height:1.3}
.bad .lbl{background:#ffe3e3;color:#a11414}
.good .lbl{background:#e3f7e8;color:#176b2c}
.pane .cap{margin:auto 0 0;padding-top:12px;border-top:1px dashed var(--line,#e4e4ee);font-size:13px;color:var(--muted,#6a6d85);line-height:1.45}
.demo{flex:1;display:flex;flex-direction:column;gap:10px;position:relative}
.tx{height:10px;border-radius:6px;background:#dfe0ea;margin:0}
.tx.s{width:38%}.tx.m{width:62%}.tx.l{width:86%}
.ttl{font-weight:700;font-size:clamp(18px,2cqi,24px);line-height:1.15;margin:0}
.ph{background:#dfe0ea;border-radius:10px;display:grid;place-items:center;color:#6a6d85;font-size:13px;font-weight:600;min-height:90px}
.btn{display:inline-block;padding:10px 18px;border-radius:10px;background:var(--ink,#16182b);color:#fff;font-weight:600;font-size:14px;line-height:1.2;width:max-content}
@container (max-width:767px){.ap{grid-template-columns:1fr}}`;

const doc = (o) => ({ cat: "anti", area: "doctrine", status: "מאושר", runway: false, tech: "אנטי-פטרן · ככה לא / ככה כן", ...o });
const pane = (kind, inner, cap) => `<div class="pane ${kind}"><span class="lbl">${kind === "bad" ? "ככה לא" : "ככה כן"}</span><div class="demo">${inner}</div><p class="cap">${cap}</p></div>`;
const wrap = (id, bad, badCap, good, goodCap) => `<div class="cwrap ${id}"><div class="ap">${pane("bad", bad, badCap)}${pane("good", good, goodCap)}</div></div>`;

const PARA = "פסקה של שתי שורות שמסבירה משהו על השירות, ואז השורה האחרונה שלה נשארת קצרה.";

export default [
doc({
  id: "a01", name: "מרכוז מזויף",
  desc: "כותרת ממורכזת ופסקה שנראית מיושרת לימין, כי text-align:center מרכז רק בתוך קופסת ה-measure שדבוקה לצד ההתחלה.",
  when: "כל סקשן ממורכז בעמוד שיש בו p{max-width} גלובלי, כלומר כמעט כל עמוד.",
  rule: "צ'קליסט 3א (סיני, 17.8.2026): כל סקשן ממורכז מקבל גם margin-inline:auto על הפסקאות.",
  why: "הקורא רואה כותרת במרכז ופסקה שזזה ימינה. זה נקרא כטעות יישור, לא כבחירה.",
  fix: ".centered p, .centered .lead { margin-inline: auto }",
  spot: "השורה האחרונה של הפסקה. אם היא קצרה, מיד רואים איפה הקופסה באמת יושבת.",
  css: `${AP_BASE}
.a01 .c{text-align:center}
.a01 .c p:not(.ttl){max-width:300px;margin:0;font-size:14px;line-height:1.5;color:#3c3f57;outline:1px dashed #c3c5d6;outline-offset:6px}
.a01 .good .c p:not(.ttl){margin-inline:auto}`,
  html: wrap("a01",
    `<div class="c"><p class="ttl">כותרת ממורכזת</p><p>${PARA}</p></div>`, "הפסקה מוגבלת ל-300px ודבוקה לימין. הטקסט ממורכז בתוכה, ולכן השורה האחרונה מסגירה את הקופסה.",
    `<div class="c"><p class="ttl">כותרת ממורכזת</p><p>${PARA}</p></div>`, "אותה קופסה, עם margin-inline:auto. עכשיו הכותרת והפסקה חולקות ציר אחד."),
}),
doc({
  id: "a02", name: "כפתור תלוי באוויר",
  desc: "סקשן מיושר לימין שהכפתור שלו ממורכז, או להפך: הכפתור לא שייך לאף ציר של הסקשן.",
  when: "כל סקשן עם כפתור סוגר.",
  rule: "צ'קליסט 3ב (סיני, 12.8.2026): כל כפתור-סקשן מיושר בהחלטה מודעת (התחלה או מרכז) ונבדק ויזואלית מול הסקשן שלו.",
  why: "העין מחפשת ציר. כפתור בין שני צירים נראה כמו שכחה, והוא בדיוק האלמנט שאמור להיות הכי ברור.",
  fix: "הכפתור יורש את ציר הסקשן: סקשן קריאה מיושר לימין מקבל כפתור בהתחלה, סקשן טקס ממורכז מקבל כפתור ממורכז.",
  spot: "מותחים קו דמיוני מהכותרת למטה. אם הכפתור לא יושב עליו ולא במרכז המדויק, הוא תלוי.",
  css: `${AP_BASE}
.a02 .bad .btn{align-self:center}
.a02 .good .btn{align-self:flex-start}`,
  html: wrap("a02",
    `<p class="ttl">כותרת מיושרת לימין</p><div class="tx l"></div><div class="tx m"></div><div class="tx s"></div><span class="btn">הפעולה</span>`, "כותרת וטקסט על ציר הימין, כפתור במרכז. הוא לא שייך לכלום.",
    `<p class="ttl">כותרת מיושרת לימין</p><div class="tx l"></div><div class="tx m"></div><div class="tx s"></div><span class="btn">הפעולה</span>`, "הכפתור על אותו ציר של הכותרת. הסקשן נקרא כיחידה אחת."),
}),
doc({
  id: "a03", name: "עמוד שכולו צמוד-ימין",
  desc: "כל הסקשנים מיושרים לאותו צד. אין נשימה, אין טקס, הגלילה מונוטונית.",
  when: "עמודים ארוכים, במיוחד כשכל הסקשנים נבנו מאותה תבנית.",
  rule: "צ'קליסט 3 (סיני, 12.8.2026): ציר היישור מגוון בין סקשנים. סקשנים ממורכזים (תהליך, FAQ, סוגר) חייבים להיות ממורכזים באמת.",
  why: "יישור אחיד הופך את העמוד לרשימה. גיוון הצירים הוא מה שנותן לגלילה מקצב.",
  fix: "מערכת הצירים של המנוע: טקס ממורכז, קריאה מיושרת, ראש-לפי-גוף, ולסירוגין.",
  spot: "מקטינים את העמוד ל-25% ומסתכלים על הצללית. אם כל הבלוקים מתחילים מאותו קו, זה זה.",
  css: `${AP_BASE}
.a03 .map{display:grid;gap:8px}
.a03 .row{display:flex;flex-direction:column;gap:5px;padding:10px 12px;border:1px solid var(--line,#e4e4ee);border-radius:8px}
.a03 .row .tx{height:7px}
.a03 .row.c{align-items:center}`,
  html: wrap("a03",
    `<div class="map"><div class="row"><div class="tx m"></div><div class="tx l"></div></div><div class="row"><div class="tx s"></div><div class="tx l"></div></div><div class="row"><div class="tx m"></div><div class="tx l"></div></div><div class="row"><div class="tx s"></div><div class="tx m"></div></div><div class="row"><div class="tx m"></div><div class="tx l"></div></div></div>`, "חמישה סקשנים, קו התחלה אחד. הצללית של העמוד היא מדרגה אחת ארוכה.",
    `<div class="map"><div class="row"><div class="tx m"></div><div class="tx l"></div></div><div class="row c"><div class="tx s"></div><div class="tx m"></div></div><div class="row"><div class="tx m"></div><div class="tx l"></div></div><div class="row c"><div class="tx s"></div><div class="tx m"></div></div><div class="row c"><div class="tx m"></div><div class="tx s"></div></div></div>`, "קריאה מיושרת, טקס ממורכז, לסירוגין. אותו תוכן, גלילה עם מקצב."),
}),
doc({
  id: "a04", name: "מצב \"אין\" שלא נקרא",
  desc: "צ'יפ מאפיין שלילי (אין מחסן) שמסומן רק בגבול מקווקו. בלי הצ'יפ החיובי לידו, אי אפשר לדעת שהוא שלילי.",
  when: "רשימות מאפיינים בוליאניים: נדל\"ן, מפרטים, חבילות.",
  rule: "צ'קליסט 10ג (סיני, 17.8.2026): מצב שלילי חייב להיקרא גם בלי להשוות למצב חיובי לידו. סיגנל כפול לפחות.",
  why: "גבול מקווקו הוא הבדל עדין מדי, ובמובייל הוא נעלם. הקורא מפרש \"אין מחסן\" כמאפיין שיש.",
  fix: "קו-חוצה על הטקסט + סימן ✕ בצבע ההדגשה + אייקון מעומעם. שלושה סיגנלים, כל אחד מספיק לבד.",
  spot: "מכסים את שאר הצ'יפים ומסתכלים על השלילי לבד. אם הוא נראה כמו \"יש\", נכשל.",
  css: `${AP_BASE}
.a04 .chips{display:flex;flex-wrap:wrap;gap:8px}
.a04 .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;border:1px solid #16182b;font-size:14px;font-weight:500;line-height:1}
.a04 .chip i{width:18px;height:18px;border-radius:5px;background:#16182b;display:inline-block}
.a04 .bad .chip.no{border-style:dashed}
.a04 .good .chip.no{border-color:#c3c5d6;color:#6a6d85}
.a04 .good .chip.no span{text-decoration:line-through}
.a04 .good .chip.no i{opacity:.3}
.a04 .good .chip.no::after{content:"✕";color:#d0342c;font-weight:800}`,
  html: wrap("a04",
    `<p class="ttl">מאפייני הנכס</p><div class="chips"><span class="chip"><i></i><span>מרפסת</span></span><span class="chip no"><i></i><span>מחסן</span></span><span class="chip"><i></i><span>חניה</span></span><span class="chip no"><i></i><span>מעלית</span></span></div>`, "\"מחסן\" ו\"מעלית\" הם אין. רק הקו המקווקו אומר את זה, ובמובייל גם הוא לא.",
    `<p class="ttl">מאפייני הנכס</p><div class="chips"><span class="chip"><i></i><span>מרפסת</span></span><span class="chip no"><i></i><span>מחסן</span></span><span class="chip"><i></i><span>חניה</span></span><span class="chip no"><i></i><span>מעלית</span></span></div>`, "קו-חוצה, ✕ אדום ואייקון מעומעם. כל אחד מהם לבד מספיק כדי לקרוא \"אין\"."),
}),
doc({
  id: "a05", name: "אייקון ענק, טקסט זעיר",
  desc: "צ'יפ עם אייקון 28px וטקסט 12px. הטקסט נראה מנופח או מגומד, והצ'יפ לא קריא בזום 100%.",
  when: "צ'יפים, תגים, שורות מאפיינים עם אייקון.",
  rule: "צ'קליסט 10ד: אייקון 24px מול טקסט 15px, לא הפוך. בודקים כל צ'יפ בזום 100%.",
  why: "היחס הטבעי בין אייקון לטקסט הוא 1.5 לכל היותר. מעבר לזה האייקון הופך לכותרת והטקסט לכיתוב.",
  fix: "אייקון 20-24px, טקסט 14-15px, gap 8px, ושניהם על אותו קו אמצע.",
  spot: "אם צריך להתקרב כדי לקרוא את הטקסט אבל האייקון נראה מרחוק, היחס שבור.",
  css: `${AP_BASE}
.a05 .chips{display:flex;flex-wrap:wrap;gap:10px}
.a05 .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;border:1px solid #c3c5d6;line-height:1;font-weight:500}
.a05 .chip i{border-radius:6px;background:#4a3aff;display:inline-block}
.a05 .bad .chip{font-size:11px}.a05 .bad .chip i{width:28px;height:28px}
.a05 .good .chip{font-size:15px}.a05 .good .chip i{width:20px;height:20px}`,
  html: wrap("a05",
    `<p class="ttl">פרטי הנכס</p><div class="chips"><span class="chip"><i></i>4 חדרים</span><span class="chip"><i></i>קומה 3</span><span class="chip"><i></i>110 מ"ר</span></div>`, "אייקון 28px ליד טקסט 11px. האייקון הוא הכוכב, המידע הוא הערת שוליים.",
    `<p class="ttl">פרטי הנכס</p><div class="chips"><span class="chip"><i></i>4 חדרים</span><span class="chip"><i></i>קומה 3</span><span class="chip"><i></i>110 מ"ר</span></div>`, "אייקון 20px, טקסט 15px. המידע נקרא, האייקון תומך."),
}),
doc({
  id: "a06", name: "CTA סוגר על לבן ריק",
  desc: "סקשן הסגירה של העמוד: כותרת וכפתור על רקע לבן, בלי שום שכבה. במילות ליאב: \"משעמם ברמות\".",
  when: "הסקשן האחרון לפני הפוטר, בכל עמוד כולל עמודים פנימיים.",
  rule: "צ'קליסט 10ה (סיני, 17.8.2026): סקשן CTA סוגר לעולם לא על רקע לבן ריק. שכבת תמונה + סקרים, והתמונה נמסה לפוטר ולא נחתכת.",
  why: "הסגירה היא הרגע שבו העמוד מבקש פעולה. סקשן חלש שם מוריד את כל המומנטום שנבנה.",
  fix: "תמונת מותג קבועה + גרדיאנט שנקודת ה-0% שלו היא בדיוק צבע הפוטר. התפר בלתי נראה.",
  spot: "הקו בין הסגירה לפוטר. אם רואים אותו כקו ישר, התמונה נחתכה במקום להימס.",
  css: `${AP_BASE}
.a06 .close{border-radius:12px 12px 0 0;padding:36px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;position:relative;overflow:hidden}
.a06 .close .btn{position:relative;z-index:1}.a06 .close .ttl{position:relative;z-index:1}
.a06 .foot{background:#16182b;color:#9a9db8;font-size:12px;padding:14px 20px;border-radius:0 0 12px 12px}
.a06 .bad .close{background:#fff;border:1px solid var(--line,#e4e4ee);border-bottom:0}
.a06 .good .close{color:#fff;background:radial-gradient(60% 80% at 30% 20%,#5f7cff 0,#26306b 60%,#16182b 100%)}
.a06 .good .close::after{content:"";position:absolute;inset:auto 0 0;height:60%;background:linear-gradient(to top,#16182b 0,rgba(22,24,43,0) 100%)}`,
  html: wrap("a06",
    `<div class="close"><p class="ttl">מוכנים להתחיל?</p><span class="btn">לשיחה קצרה</span></div><div class="foot">© שם העסק · תנאים · פרטיות</div>`, "כותרת, כפתור, לבן. הסגירה נראית כמו עוד פסקה.",
    `<div class="close"><p class="ttl">מוכנים להתחיל?</p><span class="btn">לשיחה קצרה</span></div><div class="foot">© שם העסק · תנאים · פרטיות</div>`, "שכבת תמונה (כאן גרדיאנט כממלא מקום) וסקרים שמתחיל בדיוק בצבע הפוטר. אין תפר."),
}),
doc({
  id: "a07", name: "אזהרה בקוד צבע",
  desc: "רשימה ממוספרת שבה הפריט \"שימו לב\" מקבל עיגול אפור במקום זהב. הוא נקרא כלא-פעיל, לא כאזהרה.",
  when: "רשימות שלבים או מאפיינים שבהן פריט אחד דורש תשומת לב.",
  rule: "צ'קליסט 10ו (סיני, 17.8.2026): סיגנל שלילי בהדגשה, לא בקוד צבע. המספור נשאר אחיד.",
  why: "צבע חלש על מספור = \"מושבת\". זו קונבנציה חזקה מכל כוונה עיצובית.",
  fix: "פס צד בצבע ההדגשה + תווית טקסטואלית (\"שימו לב · \"). המספר לא משתנה.",
  spot: "אם פריט אחד ברשימה נראה כאילו אפשר לדלג עליו, זה בדיוק הפריט שרצו להדגיש.",
  css: `${AP_BASE}
.a07 .li{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#e4e4ee);font-size:14px;position:relative}
.a07 .li b{width:28px;height:28px;border-radius:50%;background:#d9a32b;color:#fff;display:grid;place-items:center;font-size:13px;flex:none}
.a07 .bad .li.warn b{background:#c3c5d6}
.a07 .good .li.warn{border-inline-start:4px solid #d0342c;padding-inline-start:10px}
.a07 .good .li.warn::before{content:"שימו לב · ";font-weight:700;color:#d0342c;order:2}`,
  html: wrap("a07",
    `<div class="li"><b>1</b>בדיקת זכויות בנייה</div><div class="li"><b>2</b>הערכת שווי</div><div class="li warn"><b>3</b>אישור ועדה מקומית</div><div class="li"><b>4</b>חתימה על חוזה</div>`, "שלב 3 הוא הקריטי, וקיבל עיגול אפור. הקורא מדלג עליו.",
    `<div class="li"><b>1</b>בדיקת זכויות בנייה</div><div class="li"><b>2</b>הערכת שווי</div><div class="li warn"><b>3</b><span>אישור ועדה מקומית</span></div><div class="li"><b>4</b>חתימה על חוזה</div>`, "פס צד אדום ותווית. המספור זהה בכל הארבעה."),
}),
doc({
  id: "a08", name: "דקורציה מעל התוכן",
  desc: "כתם רקע אבסולוטי שנוסף אחרי התוכן ב-DOM, בלי z-index מפורש, ומכסה את הטקסט.",
  when: "כל תכשיט מוזרק: בלובים, קווים, צורות, אורורה.",
  rule: "צ'קליסט 11 + motion.md §8: דקורציה אבסולוטית עם z-index:0 מפורש מתחת לתוכן, ובודקים ויזואלית נקודת חפיפה אחת.",
  why: "סדר ה-DOM קובע ערימה כשאין z-index. תכשיט שנוסף בסוף עולה על הכל, וזה מתגלה רק במסך שבו הוא נוגע בטקסט.",
  fix: ".deco{position:absolute;z-index:0} .content{position:relative;z-index:1} על עטיפה עם isolation:isolate.",
  spot: "מחפשים את המסך שבו הדקורציה הכי קרובה לטקסט, ומסתכלים אם היא מעליו או מתחתיו.",
  css: `${AP_BASE}
.a08 .box{position:relative;isolation:isolate;padding:22px;border-radius:12px;border:1px solid var(--line,#e4e4ee);min-height:170px;display:flex;flex-direction:column;gap:8px}
.a08 .box p{margin:0;font-size:14px;line-height:1.5;color:#3c3f57;max-width:34ch}
.a08 .deco{position:absolute;width:150px;height:150px;border-radius:50%;background:#ffb4a0;inset-inline-end:-20px;top:-20px}
.a08 .good .deco{z-index:0;opacity:.7}
.a08 .good .box .ttl,.a08 .good .box p{position:relative;z-index:1}`,
  html: wrap("a08",
    `<div class="box"><p class="ttl">כותרת של כרטיס</p><p>${PARA}</p><span class="deco"></span></div>`, "העיגול נוסף אחרון ב-DOM ואין לו z-index. הוא יושב על הכותרת.",
    `<div class="box"><p class="ttl">כותרת של כרטיס</p><p>${PARA}</p><span class="deco"></span></div>`, "z-index:0 לדקורציה, position:relative + z-index:1 לתוכן, isolation על הקופסה."),
}),
doc({
  id: "a09", name: "זכוכית על לבן",
  desc: "כרטיס גלסמורפיזם מעל רקע לבן או חלש. אין מה לטשטש, והזכוכית נעלמת.",
  when: "כל שימוש ב-backdrop-filter.",
  rule: "קריקטורת גלסמורפיזם (S3): רקע עשיר מאחורי כל משטח זכוכית. ה-QA של השפה בודק את זה ראשון.",
  why: "זכוכית היא אפקט על מה שמאחוריה. על לבן היא רק גבול דק ושקיפות חסרת משמעות.",
  fix: "גרדיאנט עשיר, תמונה, או blobs צבעוניים מאחורי הזכוכית. אם אין, לא זכוכית.",
  spot: "מורידים את backdrop-filter. אם כלום לא השתנה, הזכוכית מזויפת.",
  css: `${AP_BASE}
.a09 .stage{border-radius:12px;padding:26px;min-height:190px;display:grid;place-items:center}
.a09 .bad .stage{background:#fafafc;border:1px solid var(--line,#e4e4ee)}
.a09 .good .stage{background:radial-gradient(50% 60% at 20% 20%,#6a3cff,transparent 60%),radial-gradient(50% 50% at 85% 70%,#ff5c8a,transparent 60%),#1a1040}
.a09 .glass{width:70%;padding:20px;border-radius:16px;background:rgba(255,255,255,.14);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.3);display:flex;flex-direction:column;gap:8px}
.a09 .good .glass .tx{background:rgba(255,255,255,.5)}
.a09 .good .glass .ttl{color:#fff}`,
  html: wrap("a09",
    `<div class="stage"><div class="glass"><p class="ttl">כרטיס זכוכית</p><div class="tx l"></div><div class="tx m"></div></div></div>`, "blur 18 על רקע לבן-שבור. רואים גבול, לא זכוכית.",
    `<div class="stage"><div class="glass"><p class="ttl">כרטיס זכוכית</p><div class="tx l"></div><div class="tx m"></div></div></div>`, "אותו כרטיס בדיוק מעל רקע עשיר. עכשיו יש מה לטשטש."),
}),
doc({
  id: "a10", name: "ברוטליזם מרוכך",
  desc: "מסגרת שחורה עבה עם פינה מעוגלת וצל רך. לא ברוטליזם ולא עור אחר, אלא חצי-חצי שנראה כמו טעות.",
  when: "כל פרויקט בשפה קיצונית.",
  rule: "קריקטורת ברוטליזם (S7): או-או. radius 0 בכל מקום, אף צל עם blur.",
  why: "שפה קיצונית עובדת רק כשהיא עקבית. פרט מרוכך אחד הופך את כל הגולמיות ל\"לא ידעו לעגל\".",
  fix: "radius:0, box-shadow ללא blur (5px 5px 0 #000), ו-hover שמזיז את הצל במקום לרכך אותו.",
  spot: "פינה אחת. אם היא עגולה, כל השאר לא ברוטליזם.",
  css: `${AP_BASE}
.a10 .card{border:3px solid #000;padding:20px;display:flex;flex-direction:column;gap:10px;background:#fff;width:80%}
.a10 .bad .card{border-radius:14px;box-shadow:0 10px 24px rgba(0,0,0,.18)}
.a10 .good .card{border-radius:0;box-shadow:6px 6px 0 #000}
.a10 .card .btn{border-radius:0;background:#d9ff00;color:#000;border:3px solid #000}
.a10 .bad .card .btn{border-radius:8px}`,
  html: wrap("a10",
    `<div class="card"><p class="ttl">כותרת גולמית</p><div class="tx l"></div><div class="tx m"></div><span class="btn">פעולה</span></div>`, "מסגרת 3px וניאון, אבל פינות 14px וצל רך. השפה נשברה.",
    `<div class="card"><p class="ttl">כותרת גולמית</p><div class="tx l"></div><div class="tx m"></div><span class="btn">פעולה</span></div>`, "אפס עיגול, צל קשיח 6px. עכשיו זה אמירה."),
}),
doc({
  id: "a11", name: "hover בלי transition",
  desc: "כפתור שקופץ למצב ה-hover שלו בלי מעבר. נסו: העבירו עכבר על שני הכפתורים.",
  when: "כל property שמשתנה ב-hover.",
  rule: "motion.md: אין hover בלי transition. כל property שמשתנה ב-hover יש לו transition בבסיס, לא ב-:hover.",
  why: "קפיצה חדה נקראת כתקלה. המעבר הוא מה שאומר \"זה מגיב לך\".",
  fix: "transition על הבסיס (.btn{transition:transform .2s,box-shadow .2s}), עם easing אחיד של העור.",
  spot: "עוברים עם העכבר ויוצאים. אם היציאה גם קופצת, ה-transition הוגדר על :hover ולא על הבסיס.",
  css: `${AP_BASE}
.a11 .demo{align-items:flex-start;justify-content:center}
.a11 .btn{cursor:pointer;box-shadow:0 0 0 rgba(74,58,255,0)}
.a11 .btn:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(74,58,255,.35);background:#4a3aff}
.a11 .good .btn{transition:transform .2s cubic-bezier(.2,.6,.2,1),box-shadow .2s,background .2s}`,
  html: wrap("a11",
    `<p class="ttl">העבירו עכבר</p><span class="btn">כפתור שקופץ</span>`, "אין transition. הכפתור מופיע במצב החדש בלי לעבור אליו, ובעזיבה חוזר בקפיצה.",
    `<p class="ttl">העבירו עכבר</p><span class="btn">כפתור שעובר</span>`, "transition .2s על הבסיס, לא על :hover. גם הכניסה וגם היציאה חלקות."),
}),
doc({
  id: "a12", name: "ריווח אותיות חיובי בעברית",
  desc: "טקסט רץ עברי עם letter-spacing חיובי. האותיות מתפרקות למילה, ובמיוחד המילים הקצרות.",
  when: "כל טקסט רץ. מותר רק על כותרות לטיניות קטנות באותיות גדולות.",
  rule: "צ'קליסט 7: אין letter-spacing חיובי על טקסט רץ.",
  why: "אותיות עבריות בנויות להיצמד. מרווח נוסף שובר את צורת המילה והקריאה מאטה.",
  fix: "letter-spacing:0 על כל טקסט רץ. בכותרות גדולות מותר שלילי עדין (-.01em).",
  spot: "מילים של שתיים-שלוש אותיות. אם הן נראות כמו ראשי תיבות, יש ריווח.",
  css: `${AP_BASE}
.a12 p.t{margin:0;font-size:15px;line-height:1.6;color:#3c3f57}
.a12 .bad p.t{letter-spacing:.08em}`,
  html: wrap("a12",
    `<p class="ttl">פסקה עם ריווח</p><p class="t">אם זה לא עובד, לא משלמים. כל אתר עובר בדיקה על יד לפני שהוא עולה לאוויר, ואז עוד אחת.</p>`, "letter-spacing .08em. \"אם\", \"לא\", \"יד\" מתפרקות.",
    `<p class="ttl">פסקה בלי ריווח</p><p class="t">אם זה לא עובד, לא משלמים. כל אתר עובר בדיקה על יד לפני שהוא עולה לאוויר, ואז עוד אחת.</p>`, "letter-spacing 0. המילים שומרות על הצורה שלהן."),
}),
doc({
  id: "a13", name: "אותה קומפוזיציה שלוש פעמים",
  desc: "שלושה סקשנים רצופים שכולם גריד כרטיסים. העמוד הופך לקטלוג, והקורא מפסיק להבחין בין הסקשנים.",
  when: "עמודים שנבנו מ\"עוד שלושה כרטיסים\" בכל פעם.",
  rule: "חוק הגיוון (compositions.md): אותה קומפוזיציה לא פעמיים ברצף ולא יותר מפעמיים בעמוד. חריג: C4 עד שלוש אם התוכן באמת שקול, אבל לא ברצף.",
  why: "הקומפוזיציה היא איך הקורא יודע שעבר לנושא אחר. שלוש פעמים אותו דבר = נושא אחד ארוך.",
  fix: "לשאול על כל סקשן \"מה טבע התוכן?\": תהליך = C6, פריט גיבור ולוויינים = C15, זוגות = C3.",
  spot: "צילום העמוד ב-25%. אם שלושה בלוקים רצופים נראים זהים, נכשל.",
  css: `${AP_BASE}
.a13 .sec{border:1px solid var(--line,#e4e4ee);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px}
.a13 .sec small{font-size:11px;font-weight:700;color:#6a6d85}
.a13 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.a13 .g i{display:block;height:30px;background:#dfe0ea;border-radius:5px}
.a13 .zz{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.a13 .zz i{display:block;height:30px;background:#dfe0ea;border-radius:5px}
.a13 .zz .t{display:flex;flex-direction:column;gap:5px;justify-content:center}
.a13 .band{height:30px;border-radius:5px;background:#16182b}`,
  html: wrap("a13",
    `<div class="sec"><small>יתרונות · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>שירותים · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>למה אנחנו · C4</small><div class="g"><i></i><i></i><i></i></div></div>`, "שלושה גרידים ברצף. אי אפשר לדעת איפה נגמר סקשן ומתחיל הבא.",
    `<div class="sec"><small>יתרונות · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>שירותים · C3 זיגזג</small><div class="zz"><i></i><div class="t"><div class="tx m"></div><div class="tx l"></div></div></div></div><div class="sec"><small>למה אנחנו · C10 פס</small><div class="band"></div></div>`, "גריד, זיגזג, פס. כל סקשן מודיע על עצמו בצורה שלו."),
}),
doc({
  id: "a14", name: "טקסט על הנקודה הבהירה",
  desc: "טקסט לבן על תמונה, בדיוק במקום שבו התמונה הכי בהירה. הניגודיות נמדדה על הממוצע, לא על הנקודה.",
  when: "הירו עם תמונה, כרטיס עם תמונת רקע, סקשן CTA.",
  rule: "צ'קליסט 9: AA לכל צמד, טקסט על ויז'ואל נבדק על הנקודה הבהירה. בגלסמורפיזם: על הנקודה הבהירה מאחורי הזכוכית.",
  why: "תמונות לא אחידות. ממוצע כהה עם כתם בהיר אחד מתחת לכותרת = שתי מילים שנעלמות.",
  fix: "סקרים מקומי מתחת לטקסט, או הזזת הטקסט לצד הכהה, או תמונה אחרת. ומודדים על הפיקסל הבהיר ביותר בקופסת הטקסט.",
  spot: "מכסים את התמונה חוץ מהאזור שמתחת לטקסט, ומסתכלים על הפיקסל הבהיר ביותר שם.",
  css: `${AP_BASE}
.a14 .img{border-radius:12px;min-height:190px;position:relative;padding:22px;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;color:#fff;overflow:hidden;background:radial-gradient(45% 55% at 70% 35%,#fff3d6 0,#e8b86a 30%,#3b2a1e 75%)}
.a14 .img .ttl{position:relative;z-index:1;color:#fff}
.a14 .img p{position:relative;z-index:1;margin:0;font-size:14px;color:#fff}
.a14 .bad .img{justify-content:center;align-items:center;text-align:center}
.a14 .good .img::after{content:"";position:absolute;inset:auto 0 0;height:70%;background:linear-gradient(to top,rgba(20,12,6,.85) 0,rgba(20,12,6,0) 100%)}`,
  html: wrap("a14",
    `<div class="img"><p class="ttl">כותרת על התמונה</p><p>שורת תמיכה קצרה</p></div>`, "הטקסט במרכז, בדיוק על הכתם הבהיר. ממוצע התמונה כהה, אבל שם הוא לבן על שמנת.",
    `<div class="img"><p class="ttl">כותרת על התמונה</p><p>שורת תמיכה קצרה</p></div>`, "הטקסט ירד לצד הכהה וקיבל סקרים מקומי. הכתם הבהיר נשאר, רחוק מהמילים."),
}),
];
