// גלריית אנטי-פטרנים A1-A26: כל עמוד מציג "ככה לא" מול "ככה כן" על אותו
// בלוק ניטרלי בדיוק. המקור של A1-A16 הוא לקח שכבר רשום בתורה (צ'קליסט ה-QA
// של design-dna, קריקטורות השפות, כללי המנוע), וכאן הוא מקבל עיניים.
// A17-A26 (17.11.2026) באים ממחקר רשת על טביעות האצבע של מחוללי AI, ראו ההערה מעליהם.
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
.a01 .c{text-align:center;display:flex;flex-direction:column;gap:16px}
.a01 .c p:not(.ttl){max-width:min(300px,72%);margin:0;font-size:14px;line-height:1.5;color:#3c3f57;outline:1px dashed #c3c5d6;outline-offset:6px}
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
  rule: "צ'קליסט 3 (סיני, 12.8.2026): ציר היישור מגוון בין סקשנים. סקשנים ממורכזים (תהליך, סוגר, משפט מסכם) חייבים להיות ממורכזים באמת. FAQ וטפסים מיושרים (spacing-and-axes.md 5).",
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
  fix: "קו-חוצה על הטקסט + סימן ✕ באדום של שגיאה (לא במבטא, שהוא לפעולה) + אייקון מעומעם. שלושה סיגנלים, כל אחד מספיק לבד.",
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
  desc: "צ'יפ עם אייקון 28px וטקסט 11px. הטקסט נראה מנופח או מגומד, והצ'יפ לא קריא בזום 100%.",
  when: "צ'יפים, תגים, שורות מאפיינים עם אייקון.",
  rule: "צ'קליסט 10ד: אייקון 24px מול טקסט 15px, לא הפוך. בודקים כל צ'יפ בזום 100%.",
  why: "היחס הטבעי בין גובה האייקון לגודל הטקסט הוא עד 1.6 (24 מול 15). מעבר לזה האייקון הופך לכותרת והטקסט לכיתוב.",
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
.a06 .demo{gap:0}
.a06 .foot{background:#16182b;color:#9a9db8;font-size:12px;padding:14px 20px;border-radius:0 0 12px 12px}
.a06 .bad .close{background:#fff;border:1px solid var(--line,#e4e4ee);border-bottom:0}
.a06 .good .close{color:#fff;background:radial-gradient(60% 80% at 30% 20%,#5f7cff 0,#26306b 60%,#16182b 100%)}
.a06 .good .close::after{content:"";position:absolute;inset:auto 0 0;height:60%;background:linear-gradient(to top,#16182b 0,rgba(22,24,43,0) 100%)}
.a06 .good .btn{background:#fff;color:#16182b}`,
  html: wrap("a06",
    `<div class="close"><p class="ttl">מוכנים להתחיל?</p><span class="btn">לשיחה קצרה</span></div><div class="foot">© שם העסק · תנאים · פרטיות</div>`, "כותרת, כפתור, לבן. הסגירה נראית כמו עוד פסקה.",
    `<div class="close"><p class="ttl">מוכנים להתחיל?</p><span class="btn">לשיחה קצרה</span></div><div class="foot">© שם העסק · תנאים · פרטיות</div>`, "שכבת תמונה (כאן גרדיאנט כממלא מקום) וסקרים שמתחיל בדיוק בצבע הפוטר. אין תפר."),
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
.a08 .deco{position:absolute;width:150px;height:150px;border-radius:50%;background:#ffb4a0;inset-inline-start:48px;top:-24px}
.a08 .good .deco{z-index:0}
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
  fix: "גרדיאנט עשיר או תמונה מאחורי הזכוכית (לא blobs, 23.9.2026). אם אין, לא זכוכית.",
  spot: "מורידים את backdrop-filter. אם כלום לא השתנה, הזכוכית מזויפת.",
  css: `${AP_BASE}
.a09 .stage{border-radius:12px;padding:26px;min-height:190px;display:grid;place-items:center}
.a09 .bad .stage{background:#fafafc;border:1px solid var(--line,#e4e4ee)}
.a09 .good .stage{background:radial-gradient(50% 60% at 20% 20%,#6a3cff,transparent 60%),radial-gradient(50% 50% at 85% 70%,#ff5c8a,transparent 60%),#1a1040}
.a09 .glass{width:70%;padding:20px;border-radius:16px;background:rgba(255,255,255,.14);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.3);display:flex;flex-direction:column;gap:8px}
.a09 .good .glass .tx{background:rgba(255,255,255,.5)}
.a09 .good .glass .ttl{color:#fff}`,
  html: wrap("a09",
    `<div class="stage"><div class="glass"><p class="ttl">כרטיס זכוכית</p><div class="tx l"></div><div class="tx m"></div></div></div>`, "blur 18 על רקע לבן-שבור. הזכוכית נעלמת: נשארו רק הכותרת והקווים.",
    `<div class="stage"><div class="glass"><p class="ttl">כרטיס זכוכית</p><div class="tx l"></div><div class="tx m"></div></div></div>`, "אותו כרטיס בדיוק מעל רקע עשיר. עכשיו יש מה לטשטש."),
}),
doc({
  id: "a10", name: "ברוטליזם מרוכך",
  desc: "מסגרת שחורה עבה עם פינה מעוגלת וצל רך. לא ברוטליזם ולא עור אחר, אלא חצי-חצי שנראה כמו טעות.",
  when: "כל פרויקט בשפה קיצונית.",
  rule: "קריקטורת ברוטליזם (S7): או-או. radius 0 בכל מקום, אף צל עם blur.",
  why: "שפה קיצונית עובדת רק כשהיא עקבית. פרט מרוכך אחד הופך את כל הגולמיות ל\"לא ידעו לעגל\".",
  fix: "radius:0, box-shadow ללא blur (6px 6px 0 #000), ו-hover שמזיז את הצל במקום לרכך אותו.",
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
.a11 .good .btn{transition:transform .2s var(--ease,cubic-bezier(.2,.6,.2,1)),box-shadow .2s var(--ease,cubic-bezier(.2,.6,.2,1)),background .2s var(--ease,cubic-bezier(.2,.6,.2,1))}
/* שער ההובר במגע (motion.md): בלי השער ההובר נתקע בטלפון אחרי נגיעה */
@media (hover:hover) and (pointer:fine){.a11 .btn:hover{transform:translateY(-3px);box-shadow:0 10px 22px rgba(74,58,255,.35);background:#4a3aff}}
.a11 .btn:focus-visible{transform:translateY(-3px);box-shadow:0 10px 22px rgba(74,58,255,.35);background:#4a3aff;outline:2px solid #4a3aff;outline-offset:3px}
/* במגע אין הובר: הדמו מחליף מצב לבד, בקפיצה ב"ככה לא" ובמעבר ב"ככה כן" */
@media (hover:none) and (prefers-reduced-motion:no-preference){.a11 .btn{animation:a11d 2.4s infinite}.a11 .bad .btn{animation-timing-function:steps(1,end)}.a11 .good .btn{animation-timing-function:var(--ease,cubic-bezier(.2,.6,.2,1))}}
@keyframes a11d{0%,40%{transform:none;box-shadow:0 0 0 rgba(74,58,255,0);background:#16182b}50%,90%{transform:translateY(-3px);box-shadow:0 10px 22px rgba(74,58,255,.35);background:#4a3aff}}
/* הפחתת תנועה: הצבע והצל עדיין מתחלפים, בלי תזוזה */
@media (prefers-reduced-motion:reduce){.a11 .btn:hover,.a11 .btn:focus-visible{transform:none}}`,
  html: wrap("a11",
    `<p class="ttl">העבירו עכבר</p><span class="btn" tabindex="0">כפתור שקופץ</span>`, "אין transition. הכפתור מופיע במצב החדש בלי לעבור אליו, ובעזיבה חוזר בקפיצה. בטלפון הדמו מתחלף לבד.",
    `<p class="ttl">העבירו עכבר</p><span class="btn" tabindex="0">כפתור שעובר</span>`, "transition .2s על הבסיס, לא על :hover, וההובר בתוך שער המגע. גם הכניסה וגם היציאה חלקות. בטלפון הדמו מתחלף לבד."),
}),
doc({
  id: "a12", name: "ריווח אותיות חיובי בעברית",
  desc: "טקסט רץ עברי עם letter-spacing חיובי. האותיות מתפרקות למילה, ובמיוחד המילים הקצרות.",
  when: "כל טקסט רץ. מותר רק על כותרות לטיניות קטנות באותיות גדולות.",
  rule: "צ'קליסט 7: אין letter-spacing חיובי על טקסט רץ.",
  why: "אותיות עבריות בנויות להיצמד. מרווח נוסף שובר את צורת המילה והקריאה מאטה.",
  fix: "letter-spacing:0 על כל טקסט רץ. בכותרות מעל 40px ריווח שלילי עדין, 0.01em עד 0.025em (רף הסטודיו 4), חוץ מפונט צר (fonts.md).",
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
  rule: "חוק הגיוון (compositions.md): אותה קומפוזיציה לא פעמיים ברצף. ברירת המחדל היא גם לא יותר מפעמיים בעמוד (tokens.json composition.maxRepeatPerPage), אבל זו ברירת מחדל ולא חוק: פרויקט שהתוכן שלו באמת מאותו סוג יכול לחזור, כשהציר או הטיפול משתנים (ליאב, דוח הסקירה 4.10.2026: \"נכון אבל לא בהכרח לכל הפרויקטים\").",
  why: "הקומפוזיציה היא איך הקורא יודע שעבר לנושא אחר. שלוש פעמים אותו דבר = נושא אחד ארוך.",
  fix: "לשאול על כל סקשן \"מה טבע התוכן?\": תהליך = C6, פריט גיבור ולוויינים = C15, זוגות = C3. והגיוון הוא גם בציר: לא כל הקומפוזיציות מיושרות לימין, ממורכז ומפוצל שוברים את הרצף גם כשהפריסה דומה.",
  spot: "צילום העמוד ב-25%. אם שלושה בלוקים רצופים נראים זהים, נכשל.",
  css: `${AP_BASE}
.a13 .sec{border:1px solid var(--line,#e4e4ee);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px}
.a13 .sec small{font-size:12px;font-weight:700;color:#6a6d85}
.a13 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.a13 .g i{display:block;height:30px;background:#dfe0ea;border-radius:5px}
.a13 .zz{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.a13 .zz i{display:block;height:30px;background:#dfe0ea;border-radius:5px}
.a13 .zz .t{display:flex;flex-direction:column;gap:5px;justify-content:center}
.a13 .band{height:30px;border-radius:5px;background:#16182b}`,
  html: wrap("a13",
    `<div class="sec"><small>יתרונות · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>שירותים · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>למה אנחנו · C4</small><div class="g"><i></i><i></i><i></i></div></div>`, "שלושה גרידים ברצף. אי אפשר לדעת איפה נגמר סקשן ומתחיל הבא.",
    `<div class="sec"><small>יתרונות · C4</small><div class="g"><i></i><i></i><i></i></div></div><div class="sec"><small>שירותים · C3 זיגזג</small><div class="zz"><i></i><div class="t"><div class="tx m"></div><div class="tx l"></div></div></div><div class="zz"><div class="t"><div class="tx m"></div><div class="tx l"></div></div><i></i></div></div><div class="sec"><small>למה אנחנו · C10 פס</small><div class="band"></div></div>`, "גריד, זיגזג, פס. כל סקשן מודיע על עצמו בצורה שלו."),
}),
doc({
  id: "a14", name: "טקסט על הנקודה הבהירה",
  desc: "טקסט לבן על תמונה, בדיוק במקום שבו התמונה הכי בהירה. הניגודיות נמדדה על הממוצע, לא על הנקודה.",
  when: "הירו עם תמונה, כרטיס עם תמונת רקע, סקשן CTA.",
  rule: "צ'קליסט 9: AA לכל צמד, טקסט על ויז'ואל נבדק על הנקודה הבהירה. בגלסמורפיזם: על הנקודה הבהירה מאחורי הזכוכית.",
  why: "תמונות לא אחידות. ממוצע כהה עם כתם בהיר אחד מתחת לכותרת = שתי מילים שנעלמות.",
  fix: "סקרים מקומי מתחת לטקסט, או הזזת הטקסט לצד הכהה, או תמונה אחרת. ומודדים על הפיקסל הבהיר ביותר בקופסת הטקסט. נמדד ב-image-contrast.mjs (צ'קליסט 13יט).",
  spot: "מכסים את התמונה חוץ מהאזור שמתחת לטקסט, ומסתכלים על הפיקסל הבהיר ביותר שם.",
  css: `${AP_BASE}
.a14 .img{border-radius:12px;min-height:190px;position:relative;padding:22px;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;color:#fff;overflow:hidden;background:radial-gradient(45% 55% at 50% 42%,#fff3d6 0,#e8b86a 30%,#3b2a1e 75%)}
.a14 .img .ttl{position:relative;z-index:1;color:#fff}
.a14 .img p{position:relative;z-index:1;margin:0;font-size:14px;color:#fff}
.a14 .bad .img{justify-content:center;align-items:center;text-align:center}
.a14 .good .img::after{content:"";position:absolute;inset:auto 0 0;height:70%;background:linear-gradient(to top,rgba(20,12,6,.85) 0,rgba(20,12,6,0) 100%)}`,
  html: wrap("a14",
    `<div class="img"><p class="ttl">כותרת על התמונה</p><p>שורת תמיכה קצרה</p></div>`, "הטקסט במרכז, בדיוק על הכתם הבהיר. ממוצע התמונה כהה, אבל שם הוא לבן על שמנת.",
    `<div class="img"><p class="ttl">כותרת על התמונה</p><p>שורת תמיכה קצרה</p></div>`, "הטקסט ירד לצד הכהה וקיבל סקרים מקומי. הכתם הבהיר נשאר, רחוק מהמילים."),
}),
doc({
  id: "a15", name: "קווים ומסגרות בכל מקום",
  desc: "קו מעל כל טור, מסגרת לכל כרטיס, קו מתחת לכל שורה, וקו קטן לפני כל תווית. כל אחד נראה מסודר לבד, וביחד העמוד נראה כמו טבלה שנוצרה אוטומטית.",
  when: "שורות שירותים, טורי יתרונות, כרטיסי המלצה, פוטר, תוויות סקשן. בעיקר אחרי שמורידים כרטיסים ומחליפים אותם בקווים.",
  rule: "ליאב, 22.9.2026: שימוש יתר במסגרות ומפרידונים מזוהה עם עיצוב AI. מפרידים ברווח, במשטח ובטיפוגרפיה. קו או מסגרת רק כשהם המידע עצמו (שדה, ציר זמן, טבלה), ולכל היותר משפחה אחת לסקשן ושלוש לעמוד. נאכף ב-site-qa/qa.mjs סעיף 12.",
  why: "קו הוא הפתרון הזול לשאלה 'איך אני מפריד את זה'. כשהוא חוזר בכל רמה, העין לא מבחינה בין הפרדה חשובה להפרדה טכנית, והקצב של העמוד נעלם מאחורי רשת.",
  fix: "מוחקים את הקו ושואלים מה חסר. בדרך כלל רווח גדול יותר בין קבוצות, כותרת במשקל שמסמן התחלה, או משטח בגוון אחר לפריט הפעיל. מספר רק כשהטורים הם שלבים (a16). כרטיס מקבל משטח או מסגרת, לעולם לא את שניהם.",
  spot: "סופרים קווים במסך אחד. יותר משניים, או קו וגם הפרש משטח על אותו גבול, זה זה.",
  css: `${AP_BASE}
.a15 .row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.a15 .it .n{font-size:22px;font-weight:700;color:#e0701f;line-height:1}
.a15 .it .h{font-weight:700;font-size:15px;margin:8px 0 4px}
.a15 .it p{margin:0;font-size:13px;color:#5b5b66;line-height:1.5}
.a15 .ey{font-size:12px;font-weight:600;color:#6a6d85;display:flex;align-items:center;gap:8px;margin-bottom:10px}
.a15 .bad .ey::before{content:"";width:22px;height:2px;background:#e0701f}
.a15 .bad .row{border-top:1px solid #d9d9e0;padding-top:16px}
.a15 .bad .it{border-top:1px solid #d9d9e0;padding-top:14px;border-inline-start:1px solid #ececf1;padding-inline-start:10px}
.a15 .bad .q{border:1px solid #d9d9e0;background:#f7f7f9;border-radius:12px;padding:14px;margin-top:16px;font-size:13px}
.a15 .good .row{gap:28px}
.a15 .good .it .h{font-size:17px;margin-top:0}
.a15 .good .q{background:#f3f3f6;border-radius:12px;padding:16px;margin-top:26px;font-size:13px}
@container (max-width:480px){.a15 .row{grid-template-columns:1fr}}`,
  html: wrap("a15",
    `<p class="ey">למה אנחנו</p><div class="row"><div class="it"><div class="n">01</div><p class="h">מתכננים קודם</p><p>עובדים מול האדריכל לפני שהקירות נסגרים.</p></div><div class="it"><div class="n">02</div><p class="h">נשארים אחרי</p><p>מי שהתקין הוא מי שעונה.</p></div><div class="it"><div class="n">03</div><p class="h">בודקים בשטח</p><p>הצעה לפי מה שבאמת צריך.</p></div></div><div class="q">"ענו תוך שעה, והגיעו באותו יום."</div>`,
    "קו לפני התווית, קו מעל השורה, קו מעל כל טור, קו צד, ומסגרת וגם משטח לציטוט. חמש משפחות קו במסך אחד.",
    `<p class="ey">למה אנחנו</p><div class="row"><div class="it"><p class="h">מתכננים קודם</p><p>עובדים מול האדריכל לפני שהקירות נסגרים.</p></div><div class="it"><p class="h">נשארים אחרי</p><p>מי שהתקין הוא מי שעונה.</p></div><div class="it"><p class="h">בודקים בשטח</p><p>הצעה לפי מה שבאמת צריך.</p></div></div><div class="q">"ענו תוך שעה, והגיעו באותו יום."</div>`,
    "אפס קווים. הכותרת הכבדה פותחת כל טור, הרווח מפריד בין הטורים, והציטוט עומד על משטח בלבד. בלי מספרים: שלוש סיבות שוות הן לא רצף."),
}),
doc({
  id: "a16", name: "מספור וכרטיס תבנית",
  desc: "כל סקשן נפתח ב-01, 02, וכל כרטיס בנוי מאותו מכלול: מספר, קטגוריה, כותרת, שורת תיאור וקישור עם חץ, על משטח תכלת מעוגל. כל חלק נראה סביר לבד, וביחד זו התבנית שכל מחולל מוציא.",
  when: "ראשי סקשן, כרטיסי מדריכים ומאמרים, שירותים, דרכי קשר (01 התקשרו, 02 וואטסאפ, 03 השאירו פרטים).",
  rule: "ליאב, 19.10.2026: \"בתתי הכותרות AI נוטה תמיד להוסיף מספר וזה ישר מסגיר... יש לך מבנה קלאסי של AI לקופסת תוכן\", ועל דרכי הקשר בויזואל: \"ל-AI יש קטע שהוא אוהב למספר כמעט הכל. שזה לפעמים לא דבר רע אבל בטוב טעם ורק כשבאמת יש סיבה אמיתית לכך\". מספר לפני כותרת רק כשהסדר הוא מידע (שלבים, רצף, דירוג), מסומן ב-ol או data-order. נאכף ב-project-check (deco-number, card-template), צ'קליסט 11ב.",
  why: "מספר מבטיח סדר. כשאין סדר, הקורא מחפש אותו ולא מוצא, והמספר נשאר כקישוט שאומר רק דבר אחד: התבנית מילאה את עצמה. אותו דבר בכרטיס: חלקים שלא נבחרו בגלל התוכן נראים כמו טופס שמולא.",
  fix: "שואלים על כל חלק \"מה הקורא מפסיד אם הוא יורד?\". סקשן נפתח בכותרת, ובלי מספר. כרטיס מדריך: כותרת ושורה, וכל הכרטיס הוא הקישור. קטגוריה רק כשהיא עוזרת לסנן, ואז פעם אחת כמסנן מעל הגריד ולא בכל כרטיס. מספר נשאר רק לשלבים, לציר זמן ולדירוג.",
  spot: "מכסים את המספרים ושואלים אם משהו חסר. אם לא, הם קישוט. ובכרטיס: סופרים חלקים. חמישה בכל כרטיס, באותו סדר, זה זה.",
  css: `${AP_BASE}
.a16 .k{font-size:12px;color:#6a6d85;margin:0}
.a16 .h2{font-weight:700;font-size:clamp(17px,1.8cqi,22px);margin:2px 0 12px;line-height:1.2}
.a16 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.a16 .c{border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:6px;color:inherit;text-decoration:none}
.a16 .bad .c{background:#e8f1fb}
.a16 .c .n{font-size:12px;color:#6a6d85}
.a16 .c .cat{font-size:11px;color:#3d6fa8;font-weight:600}
.a16 .c .h{font-weight:700;font-size:14px;line-height:1.3;margin:0}
.a16 .c p{margin:0;font-size:12px;color:#5b5b66;line-height:1.45}
.a16 .c .go{font-size:12px;font-weight:600;margin-top:auto}
.a16 .good .c{background:#f3f3f6;transition:background .2s}
.a16 .good .c:hover{background:#e9e9ef}
.a16 .filt{display:flex;gap:6px;margin:-4px 0 10px;flex-wrap:wrap}
.a16 .filt span{font-size:11px;padding:4px 10px;border-radius:999px;background:#f3f3f6;color:#5b5b66}
.a16 .filt span:first-child{background:var(--ink,#16182b);color:#fff}
@container (max-width:480px){.a16 .g{grid-template-columns:1fr}}`,
  html: wrap("a16",
    `<p class="k">08 · מרכז הידע</p><p class="h2">ידע שמוסיף פרספקטיבה</p><div class="g"><a class="c" href="#"><span class="n">01</span><span class="cat">מוצרים מובנים</span><p class="h">מה זה מוצר מובנה</p><p>למי זה מתאים ומה בודקים לפני.</p><span class="go">פתיחת המדריך ←</span></a><a class="c" href="#"><span class="n">02</span><span class="cat">קרנות השתלמות</span><p class="h">איך בוחרים מסלול</p><p>דמי ניהול לאורך שנים.</p><span class="go">פתיחת המדריך ←</span></a><a class="c" href="#"><span class="n">03</span><span class="cat">פנסיה</span><p class="h">דוח המסלקה בעשר דקות</p><p>איפה מסתתר כפל ביטוחים.</p><span class="go">פתיחת המדריך ←</span></a></div>`,
    "מספר סקשן, ובכל כרטיס חמישה חלקים באותו סדר. המדריכים לא נקראים לפי סדר, ואף אחד לא יחפש את מדריך 02.",
    `<p class="h2">ידע שמוסיף פרספקטיבה</p><div class="filt"><span>הכל</span><span>מוצרים מובנים</span><span>השתלמות</span><span>פנסיה</span></div><div class="g"><a class="c" href="#"><p class="h">מה זה מוצר מובנה</p><p>למי זה מתאים ומה בודקים לפני.</p></a><a class="c" href="#"><p class="h">איך בוחרים מסלול</p><p>דמי ניהול לאורך שנים.</p></a><a class="c" href="#"><p class="h">דוח המסלקה בעשר דקות</p><p>איפה מסתתר כפל ביטוחים.</p></a></div>`,
    "כותרת בלי מספר. הקטגוריה עברה למסנן אחד מעל הגריד, וכל כרטיס הוא כותרת ושורה, והכרטיס כולו הוא הקישור."),
}),

// a17 עד a26 (17.11.2026): טביעות האצבע של מחוללי AI, ממחקר רשת בשבעה ערוצים (מחוללים, קהילות,
// רשימות חוקים וגלאים, רכיבים, עברית ו-RTL, תמונות, ממשקי מערכת). המקור הוא המחקר ולא ליאב,
// ולכן הם לא נכנסים ל-baseline.js ומחכים לעין שלו במסך הסקירה.
// שלושה עקרונות בכתיבה: (1) הסימן הוא הצירוף המוכן, השארית או הזיוף, אף פעם לא אפקט או רכיב לבדו,
// כי כמעט כל אפקט כאן קיים במאגר ומאושר. (2) בלי הוראות ניסוח: סימני קופי לא נכנסים לתורה.
// (3) כל spot נגמר ב"בשער:", מה נתפס אוטומטית ומה נשאר לעין.
doc({
  id: "a17", name: "שאריות של המחולל",
  desc: "מה שהמחולל משאיר אחריו כשלא נוגעים בו: הלב בלשונית, כותרת לשונית עם שם הכלי, תמונת שיתוף ותיאור אוטומטיים שנראים בכל שליחה בוואטסאפ, תג \"Edit with\" בפינה, עמוד 404 באנגלית, שנה ישנה בפוטר וקישורים שמובילים ל-#.",
  when: "כל אתר שעולה מ-Lovable או ממחולל אחר, ברגע הפרסום. רוב השאריות לא נמצאות בעמוד אלא מסביבו: בלשונית, בתצוגת הקישור בוואטסאפ ובכתובת שלא קיימת.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: התיעוד של Lovable על מטא-דאטה של אתר ועל הסתרת התג; קוד התבנית של עמוד 404 (\"Oops! Page not found\") כפי שהוא מופיע בפרויקטים פומביים; שרשורי r/vibecoding ו-r/lovable (2025 עד 2026). ממתין לעין של ליאב. משלים את feedback_lovable_favicon (18.10.2026) ואת צ'קליסט סגירת האתר.",
  why: "אלה הסימנים היחידים שלא דורשים עין של מעצב, כי הם נושאים את שם הכלי. מי שמקבל קישור בוואטסאפ רואה את תמונת השיתוף של המחולל עוד לפני שנכנס לאתר. וגם מי שלא מזהה את הכלי קורא את זה כ\"לא סיימו\".",
  fix: "רשימת סגירה לפני פרסום: סמל אתר מקובץ הלוגו, כותרת ותיאור לכל עמוד, תמונת שיתוף שנבחרה, התג כבוי בהגדרות הפרויקט ונבדק שוב אחרי כל פרסום, עמוד 404 בשפת האתר ובצבעיו עם דרך חזרה, שנה שמתעדכנת לבד, ואף קישור לא מוביל ל-#.",
  spot: "פותחים את האתר בלשונית חדשה ומסתכלים על הלשונית לפני העמוד. שולחים את הקישור לעצמך בוואטסאפ. מקלידים כתובת שלא קיימת. בשער: סמל האתר נבדק בסריקה השבועית; קיום עמוד 404, כפתורים מתים וקישורים ריקים ב-interact; המילה Lovable בטקסט העמוד ב-project-check. לא נבדק אוטומטית: כותרת הלשונית, תמונת השיתוף והתיאור, התג, שפת עמוד ה-404 והשנה.",
  css: `${AP_BASE}
.a17 .tab{display:flex;align-items:center;gap:8px;background:#eceef3;border-radius:10px 10px 0 0;padding:8px 12px;font-size:12px;width:max-content;max-width:100%}
.a17 .fav{width:16px;height:16px;border-radius:4px;display:grid;place-items:center;font-size:11px;line-height:1;color:#fff;flex:none}
.a17 .bad .fav{background:linear-gradient(135deg,#ff7a59,#ff3d9a)}
.a17 .good .fav{background:#1f3a2e;font-weight:700}
.a17 .wa{background:#e7f6dc;border-radius:12px;padding:8px;display:flex;flex-direction:column;gap:6px;max-width:270px}
.a17 .wa .im{height:72px;border-radius:8px;display:grid;place-items:center;font-size:12px;font-weight:600}
.a17 .bad .wa .im{background:linear-gradient(120deg,#ff7a59,#ff3d9a 55%,#7a5cff);color:#fff}
.a17 .good .wa .im{background:#c9d3c5;color:#1f3a2e}
.a17 .wa p{margin:0;line-height:1.35}
.a17 .wa .t{font-weight:700;font-size:13px}
.a17 .wa .d{font-size:12px;color:#4d5a4a}
.a17 .wa .u{font-size:11px;color:#6a7a66}
.a17 .sm{font-size:12px;color:#5b5b66;margin:0}
.a17 .bdg{position:absolute;bottom:0;inset-inline-end:0;font-size:11px;font-weight:600;background:#16182b;color:#fff;padding:6px 10px;border-radius:8px}`,
  html: wrap("a17",
    `<div class="tab"><span class="fav">♥</span><span>Lovable App</span></div><div class="wa"><div class="im">תמונת השיתוף של הכלי</div><p class="t">streamwave-vista-project</p><p class="d">Lovable Generated Project</p><p class="u">streamwave-vista.lovable.app</p></div><p class="sm">404 · Oops! Page not found</p><p class="sm">© 2024 כל הזכויות שמורות</p><span class="bdg">Edit with Lovable</span>`,
    "הלב ושם הכלי בלשונית, תצוגת קישור אוטומטית בוואטסאפ, עמוד 404 באנגלית, שנה ישנה ותג בפינה. אף אחד מאלה לא נמצא בעיצוב עצמו.",
    `<div class="tab"><span class="fav">נ</span><span>סטודיו נועה · אדריכלות פנים</span></div><div class="wa"><div class="im">תמונה שנבחרה מהפרויקטים</div><p class="t">סטודיו נועה, אדריכלות פנים בחיפה</p><p class="d">תכנון דירות ובתים פרטיים, מהסקיצה ועד המפתח.</p><p class="u">studio-noa.co.il</p></div><p class="sm">404 · העמוד לא נמצא. חזרה לדף הבית ←</p><p class="sm">© 2026 סטודיו נועה</p>`,
    "סמל מהלוגו, כותרת של העסק, תמונת שיתוף שנבחרה, עמוד 404 בשפת האתר, שנה נוכחית, ובלי תג."),
}),
doc({
  id: "a18", name: "ערכת ברירת המחדל",
  desc: "העיצוב נשאר על הערכים שהערכה הגיעה איתם: כפתור אינדיגו, אפורים כחלחלים, אותו רדיוס על כל דבר, צל אפור רך על כרטיס לבן עם מסגרת דקה, ותגיות פסטל. אף ערך לא נבחר, ולכן האתר נראה כמו כל אתר אחר שנבנה באותה ערכה.",
  when: "כל פרויקט שמתחיל מ-Tailwind ו-shadcn, כלומר כמעט כל מה שמחולל בונה. הכי בולט בכפתורים, בכרטיסים, בשדות ובתגיות.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: סקיל frontend-design של Anthropic (9.2026), Impeccable, taste-skill, Uncodixfy ומדריכי ה-frontend של OpenAI חוזרים על אותה רשימה (סגול על לבן, רדיוס אחיד, צל ברירת מחדל); הניקוד של Krebs ל-1,590 אתרי Show HN (4.2026); שרשור r/vibecoding (6.2026, 2,711 נקודות). ממתין לעין של ליאב. משלים את צ'קליסט 11ב (טיפוגרפיה וצבע).",
  why: "הגולש לא יודע מה זה shadcn, אבל ראה את אותו כפתור ואותו כרטיס במאה אתרים. מה שמסגיר הוא לא שלושה כרטיסים ולא צבע סגול, אלא שהכול יחד זהה לדף הדוגמה של הערכה.",
  fix: "מחליפים את ערכי הערכה לפני שבונים סקשן אחד: צבע מהלוגו, אפורים שנוטים לגוון המותג, רדיוס לפי תפקיד (כפתור, כרטיס, שדה), ומשטח או צל שצבוע בגוון הרקע במקום צל אפור. המבנה יכול להישאר בדיוק אותו דבר.",
  spot: "שמים את האתר ליד דף הדוגמה של הערכה. אם הכפתור, הכרטיס והתגית זהים, שום דבר לא נבחר. בשער: צל אפור על רקע צבעוני ורדיוס מקונן נבדקים ב-audit. לא נבדק אוטומטית: ערכי הצבע, האפורים והרדיוס של הערכה.",
  css: `${AP_BASE}
.a18 .h2{font-weight:700;font-size:clamp(17px,1.8cqi,22px);margin:0 0 4px;line-height:1.2}
.a18 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.a18 .c{padding:14px;display:flex;flex-direction:column;gap:6px}
.a18 .c .h{font-weight:700;font-size:14px;margin:0;line-height:1.3}
.a18 .c p{margin:0;font-size:12px;line-height:1.45}
.a18 .bd{font-size:11px;font-weight:600;width:max-content;padding:2px 8px}
.a18 .b{display:inline-block;width:max-content;font-weight:600;font-size:13px;padding:10px 18px;line-height:1.2}
.a18 .bad .h2,.a18 .bad .h{color:#0f172a}
.a18 .bad .c{background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.06)}
.a18 .bad .c p{color:#64748b}
.a18 .bad .bd{background:#e0e7ff;color:#4338ca;border-radius:8px}
.a18 .bad .b{background:#4f46e5;color:#fff;border-radius:8px}
.a18 .good .h2,.a18 .good .h{color:#1d2b24}
.a18 .good .c{background:#edf2ee;border-radius:20px}
.a18 .good .c p{color:#4c5a52}
.a18 .good .bd{padding:0;color:#a2532b}
.a18 .good .b{background:#1d2b24;color:#f4f7f4;border-radius:999px}
@container (max-width:480px){.a18 .g{grid-template-columns:1fr}}`,
  html: wrap("a18",
    `<p class="h2">שלושה מסלולי ליווי</p><div class="g"><div class="c"><span class="bd">חדש</span><p class="h">ליווי חודשי</p><p>פגישה אחת בחודש ומענה בין הפגישות.</p></div><div class="c"><p class="h">ליווי רבעוני</p><p>תוכנית עבודה ובדיקה כל שלושה חודשים.</p></div><div class="c"><p class="h">פגישה חד-פעמית</p><p>שעתיים על שאלה אחת.</p></div></div><span class="b">לתיאום שיחה</span>`,
    "כל ערך כאן הוא ברירת המחדל של הערכה: אינדיגו, אפור כחלחל, רדיוס אחד על הכול, צל אפור ותגית פסטל.",
    `<p class="h2">שלושה מסלולי ליווי</p><div class="g"><div class="c"><span class="bd">חדש</span><p class="h">ליווי חודשי</p><p>פגישה אחת בחודש ומענה בין הפגישות.</p></div><div class="c"><p class="h">ליווי רבעוני</p><p>תוכנית עבודה ובדיקה כל שלושה חודשים.</p></div><div class="c"><p class="h">פגישה חד-פעמית</p><p>שעתיים על שאלה אחת.</p></div></div><span class="b">לתיאום שיחה</span>`,
    "אותו מבנה בדיוק, שלושה כרטיסים שווים וכפתור. הצבע, האפורים והרדיוסים נבחרו מהמותג, והכרטיס עומד על משטח בלי צל."),
}),
doc({
  id: "a19", name: "אפקטים בערימה והובר על מה שלא לחיץ",
  desc: "כמה אפקטים מוכנים מספריות על אותו מסך: כפתור מנצנץ, מסגרת אור שמסתובבת, הילה זוהרת וחלקיקים ברקע. ולידם כרטיסים שקופצים ומקבלים צל בהובר, בלי שיש במה ללחוץ.",
  when: "הירו ואזור המחירים באתרי תדמית ומוצר, וכל גריד של כרטיסי מידע.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: \"Tells of a Slop UI\" והדיון עליו ב-Hacker News (9.2026), Performative-UI (6.2026), Impeccable, taste-skill, שרשורי r/vibecoding ו-r/UX_Design (2026). ממתין לעין של ליאב. כל אפקט שמופיע כאן קיים במאגר ומאושר לבדו; הסימן הוא הערימה, וההובר על דבר שאינו קישור. משלים את צ'קליסט 11 (אפקט חתימה אחד למסך).",
  why: "אפקט אחד מושך את העין למקום אחד. ארבעה מושכים לארבעה מקומות, והגולש מבין שאף אחד לא בחר. וכרטיס שמגיב להובר מבטיח לחיצה: כשלא קורה כלום, נשארת הבטחה שלא קוימה.",
  fix: "אפקט חתימה אחד למסך, עם סיבה שקשורה למסר, וכל השאר שקט. הובר רק על מה שלחיץ, ואז כל הכרטיס הוא הקישור.",
  spot: "סופרים כמה דברים זזים או זוהרים במסך אחד בלי שנגעת. ואז עוברים עם העכבר על הכרטיסים: מה שקופץ ולא נפתח בלחיצה, זה זה. בשער: slop-check תופס זוהר על רקע כהה ונקודה פועמת. לא נבדק אוטומטית: ספירת האפקטים במסך, והובר על אלמנט שאינו קישור.",
  css: `${AP_BASE}
.a19 .st{border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px;background:#0d0e1a;color:#fff;position:relative;overflow:hidden}
.a19 .bad .st{background:radial-gradient(180px 120px at 30% 20%,rgba(124,92,255,.55),transparent 70%),radial-gradient(rgba(255,255,255,.35) 1px,transparent 1.5px) 0 0/18px 18px,#0d0e1a}
.a19 .h{font-weight:700;font-size:16px;margin:0;line-height:1.25}
.a19 .row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.a19 .fc{position:relative;display:block;border-radius:12px;padding:2px;overflow:hidden;background:#2a2c40;color:inherit;text-decoration:none}
.a19 .fc i{position:absolute;inset:-60%;background:conic-gradient(from 0deg,transparent 0 70%,#9d7bff 85%,#5ad1ff 100%)}
.a19 .fc b{position:relative;display:block;border-radius:10px;background:#15172a;padding:12px;font-size:13px;font-weight:600;transition:background .2s}
.a19 .good .fc:hover b{background:#1d2038}
.a19 .ic{border-radius:12px;background:#15172a;padding:12px;font-size:13px}
.a19 .bad .ic{transition:transform .2s,box-shadow .2s}
.a19 .bad .ic:hover{transform:translateY(-6px);box-shadow:0 14px 30px rgba(124,92,255,.5)}
.a19 .cta{display:inline-block;width:max-content;padding:10px 18px;border-radius:999px;font-weight:600;font-size:13px;color:#0d0e1a;background:#fff}
.a19 .bad .cta{background:linear-gradient(110deg,#fff 35%,#b9a4ff 50%,#fff 65%) 0 0/250% 100%;box-shadow:0 0 24px rgba(157,123,255,.8)}
@media (prefers-reduced-motion:no-preference){.a19 .fc i{animation:a19spin 4s linear infinite}.a19 .bad .cta{animation:a19shim 2.2s linear infinite}}
@keyframes a19spin{to{transform:rotate(1turn)}}
@keyframes a19shim{to{background-position:-250% 0}}
@container (max-width:480px){.a19 .row{grid-template-columns:1fr}}`,
  html: wrap("a19",
    `<div class="st"><p class="h">בוחרים מסלול</p><div class="row"><div class="fc"><i aria-hidden="true"></i><b>המסלול המומלץ</b></div><div class="ic">המסלול הבסיסי</div></div><span class="cta">להתחיל עכשיו</span></div>`,
    "חלקיקים, הילה, מסגרת אור מסתובבת וכפתור מנצנץ וזוהר, כולם באותו מסך. והכרטיס הבסיסי קופץ בהובר בלי שיש בו קישור.",
    `<div class="st"><p class="h">בוחרים מסלול</p><div class="row"><a class="fc" href="#"><i aria-hidden="true"></i><b>המסלול המומלץ</b></a><div class="ic">המסלול הבסיסי</div></div><span class="cta">להתחיל עכשיו</span></div>`,
    "אפקט אחד: האור מקיף רק את המסלול המומלץ, כי זה המסר. הכרטיס הזה הוא קישור ולכן מגיב להובר. כל השאר שקט."),
}),
doc({
  id: "a20", name: "אימוג'י ואייקוני מדף",
  desc: "אימוג'י בתפקיד אייקון (טיל, ברק, ניצוצות), או אותו סט קווי דק מהמדף ליד כל כותרת, כל אייקון בצבע אחר, ולפעמים אייקון מדף בתור לוגו.",
  when: "כרטיסי שירותים ויתרונות, כותרות סקשן, כפתורים, פריטי תפריט, ולוגו זמני שנשאר.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: Uncodixfy, taste-skill, רשימת האיסורים של ux-skill (11.2026), NN/g על אייקון הניצוצות (2024), שרשורי r/vibecoding (11.2025, 6.2026) שבהם אימוג'י בכותרות ואייקוני Lucide מוזכרים בין הראשונים. ממתין לעין של ליאב. משלים את מדף האייקונים (Lucide חסומה), feedback_icons_sharp ו-feedback_brand_from_logo_file.",
  why: "אימוג'י נראה אחרת בכל מכשיר ואינו שייך למותג. סט מדף אחיד ליד כל כותרת אומר שהאייקון נכנס כי היה מקום, לא כי הוא מסביר משהו. וצבע אחר לכל אייקון הופך את כולם לקישוט.",
  fix: "קודם שואלים אם צריך אייקון בכלל: אם הכותרת מובנת בלעדיו, הוא יורד. אם צריך, מהמדף של העסק, בעובי קו אחד ובצבע מותג אחד. לוגו מגיע רק מקובץ הלוגו של הלקוח.",
  spot: "מכסים את האייקונים ושואלים אם משהו הפך פחות ברור. ואז בודקים אם יש שני אייקונים באותו צבע. בשער: Lucide נחסמת במדף האייקונים. לא נבדק אוטומטית: אימוג'י בתפקיד אייקון, וצבע שונה לכל אייקון.",
  css: `${AP_BASE}
.a20 .h2{font-weight:700;font-size:clamp(17px,1.8cqi,22px);margin:0 0 4px;line-height:1.2}
.a20 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.a20 .c{border-radius:12px;background:#f3f3f6;padding:12px;display:flex;flex-direction:column;gap:6px}
.a20 .c .e{font-size:20px;line-height:1}
.a20 .c .h{font-weight:700;font-size:13px;margin:0;line-height:1.3}
.a20 .c p{margin:0;font-size:12px;color:#5b5b66;line-height:1.45}
.a20 .ic{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;align-items:center}
.a20 .ic span{display:inline-flex;align-items:center;gap:6px}
.a20 .ic svg{width:18px;height:18px;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
@container (max-width:480px){.a20 .g{grid-template-columns:1fr}}`,
  html: wrap("a20",
    `<p class="h2">✨ מה אנחנו עושים</p><div class="g"><div class="c"><span class="e">🚀</span><p class="h">הקמה מהירה</p><p>עולים לאוויר תוך שבועיים.</p></div><div class="c"><span class="e">⚡</span><p class="h">ביצועים</p><p>העמוד נטען בפחות משנייה.</p></div><div class="c"><span class="e">🎯</span><p class="h">דיוק</p><p>כל עמוד נבנה למטרה אחת.</p></div></div><div class="ic"><span><svg viewBox="0 0 24 24" stroke="#7c3aed" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>מהיר</span><span><svg viewBox="0 0 24 24" stroke="#16a34a" aria-hidden="true"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z"/></svg>מאובטח</span><span><svg viewBox="0 0 24 24" stroke="#ea580c" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>מדיד</span></div>`,
    "אימוג'י בכותרת ובכל כרטיס, ומתחת שלושה אייקוני מדף, כל אחד בצבע אחר. אף אחד מהם לא מוסיף מידע שהכותרת לא אמרה.",
    `<p class="h2">מה אנחנו עושים</p><div class="g"><div class="c"><p class="h">הקמה מהירה</p><p>עולים לאוויר תוך שבועיים.</p></div><div class="c"><p class="h">ביצועים</p><p>העמוד נטען בפחות משנייה.</p></div><div class="c"><p class="h">דיוק</p><p>כל עמוד נבנה למטרה אחת.</p></div></div>`,
    "בלי אייקונים: הכותרות מובנות לבד, ולכן הם ירדו. כשאייקון באמת נדרש, הוא מגיע מהמדף של העסק, בקו אחד ובצבע אחד."),
}),
doc({
  id: "a21", name: "הוכחה מפוברקת",
  desc: "רכיבי הוכחה שהגיעו עם התבנית ולא מהלקוח: ערימת תמונות פרופיל חופפות עם חמישה כוכבים ומונה עגול, שורת לוגואים של חברות ענק או חברות שלא קיימות, והמלצות עם פנים מחוללות ושם פרטי בלבד.",
  when: "מתחת להירו, רצועת \"סומכים עלינו\", סקשן ההמלצות, מונים ומספרים.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: \"Tells of a Slop UI\" (9.2026), Performative-UI (6.2026), Hallmark (11.2026), שרשור r/SaaS (9.2026), ומקרה מתועד ב-r/lovable (4.2026) של לקוח שעבר למתחרה בגלל המלצת דמו שנשארה באתר. ממתין לעין של ליאב. הרכיבים עצמם (דירוג בהירו, רצועת לוגואים, המלצות) קיימים במאגר ומאושרים כשהחומר אמיתי.",
  why: "זה הסימן שעולה כסף ישירות: גולש שמזהה המלצה מפוברקת מפסיק להאמין גם לשאר העמוד. ומעבר למראה, זו הטעיה של הגולש.",
  fix: "הוכחה נכנסת רק מחומר שהלקוח מסר ושאפשר לאמת: מי אמר, מאיזה עסק, ומאיפה זה נלקח. אם אין חומר, הסקשן יורד מהעמוד עד שיהיה. תוכן דמו לא נשאר במקומו.",
  spot: "עוברים על כל לוגו, המלצה ומספר ושואלים \"מאיפה זה הגיע?\". מספר עגול בלי מקור, פנים חלקות מדי ושם בלי שם משפחה הם הדגל. בשער: טקסט ממלא מקום נתפס ב-project-check. לא נבדק אוטומטית: המקור של ההמלצות, של הלוגואים ושל המספרים.",
  css: `${AP_BASE}
.a21 .pr{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px}
.a21 .av{display:flex}
.a21 .av span{width:28px;height:28px;border-radius:50%;border:2px solid #fff;margin-inline-start:-8px;background:linear-gradient(135deg,#a5b4fc,#f0abfc)}
.a21 .av span:first-child{margin-inline-start:0}
.a21 .av span:nth-child(2){background:linear-gradient(135deg,#fde68a,#fca5a5)}
.a21 .av span:nth-child(3){background:linear-gradient(135deg,#99f6e4,#93c5fd)}
.a21 .sr{color:#f5a623;letter-spacing:2px;font-size:13px}
.a21 .lg{display:flex;gap:14px;flex-wrap:wrap;font-weight:700;font-size:13px;color:#a9abbb;letter-spacing:.04em}
.a21 .q{border-radius:12px;background:#f3f3f6;padding:12px;display:flex;flex-direction:column;gap:8px;font-size:13px;line-height:1.5}
.a21 .q p{margin:0}
.a21 .who{display:flex;align-items:center;gap:8px;font-size:12px;color:#5b5b66}
.a21 .who i{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#fbcfe8,#c7d2fe);flex:none}
.a21 .src{font-size:11px;color:#6a6d85}
.a21 .sm{font-size:12px;color:#5b5b66;margin:0}`,
  html: wrap("a21",
    `<div class="pr"><span class="av"><span></span><span></span><span></span><span></span></span><span class="sr">★★★★★</span><span>מעל 10,000 לקוחות מרוצים</span></div><div class="lg"><span>ACME</span><span>Globex</span><span>Initech</span><span>Umbrella</span></div><div class="q"><p>"שירות מדהים, ממליצה בחום לכל אחד!"</p><span class="who"><i></i>שרה כ. · מנכ"לית</span></div>`,
    "ערימת פרצופים, חמישה כוכבים ומספר עגול בלי מקור, לוגואים של חברות דמו, והמלצה עם פנים מחוללות ושם פרטי.",
    `<div class="q"><p>"הגיעו למדידה ביום שקבענו, והמטבח הותקן שבוע לפני המועד."</p><span class="who">דנה לוי · סטודיו לקרמיקה, חיפה</span><span class="src">מתוך ביקורת בגוגל, מרץ 2026</span></div><p class="sm">עבדנו עם: מאפיית לחם ארז · קליניקת ד"ר שגב</p>`,
    "המלצה אחת שאפשר לאמת: שם מלא, עסק ומקור. שני לקוחות שאישרו שמזכירים אותם, בשמם. מה שאין לו חומר אמיתי פשוט לא מופיע."),
}),
doc({
  id: "a22", name: "שלד התבנית",
  desc: "אותו סדר סקשנים בכל אתר: הירו ממורכז בגובה מסך עם גלולה קטנה, שני כפתורים ורצועת לוגואים, אחריו שלושה יתרונות, המלצות, מחירים, שאלות נפוצות וקריאה לפעולה. כל סקשן תקין לבדו. הרצף הוא הסימן.",
  when: "דף בית ודף נחיתה, בעיקר כשהעמוד נבנה מפרומפט אחד בלי אפיון.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: מדידה של 149 אתרי Lovable מול 64 אתרים מ-2019 עד 2021 (r/website, 10.2026, מקור יחיד), taste-skill, Hallmark (11.2026), שרשורי r/vibecoding ו-r/SaaS, וסרטון של Y Combinator (3.2026, מסיכום יד שנייה). ממתין לעין של ליאב. שלושה כרטיסים, מחירון ושאלות נפוצות נשארים מותרים; משלים את צ'קליסט 11ב (גיוון פריסה) ואת מקצבי העמוד במאגר.",
  why: "מי שראה שלושה אתרים כאלה מזהה את הרביעי לפני שקרא מילה. הסדר לא נבחר בשביל העסק הזה, ולכן העמוד עונה על שאלות שהגולש לא שאל ומדלג על אלה שכן.",
  fix: "הסדר נגזר ממסע הגולש באפיון: מה הוא צריך לדעת קודם כדי להמשיך. בוחרים מקצב עמוד מהמאגר, ולכל סקשן יש סיבה להיות במקום שלו. סקשן שאין לו חומר אמיתי יורד.",
  spot: "כותבים את שמות הסקשנים בשורה אחת. אם הרשימה מתאימה באותה מידה לרואה חשבון, לסטודיו ליוגה ולאפליקציה, היא לא נבנתה בשביל אף אחד מהם. בשער: פתיחי הסקשנים נבדקים ב-project-check, וגיוון הפריסה בצ'קליסט 11ב. לא נבדק אוטומטית: סדר הסקשנים.",
  css: `${AP_BASE}
.a22 .wf{display:flex;flex-direction:column;gap:6px}
.a22 .r{border-radius:8px;background:#eef0f5;padding:8px 10px;font-size:12px;color:#3b3d52;line-height:1.3;display:flex;align-items:center}
.a22 .bad .r{min-height:34px;justify-content:center;text-align:center}
.a22 .bad .r.t{min-height:64px;background:#dfe0ea;font-weight:600}
.a22 .good .r.t{min-height:84px;background:#dfe0ea;font-weight:600;align-items:flex-end}
.a22 .good .r.w{min-height:54px}
.a22 .good .r.n{background:none;padding:0 10px}`,
  html: wrap("a22",
    `<div class="wf"><div class="r t">הירו ממורכז · גלולה · שני כפתורים</div><div class="r">רצועת לוגואים</div><div class="r">שלושה יתרונות</div><div class="r">המלצות</div><div class="r">שלושה מחירים</div><div class="r">שאלות נפוצות</div><div class="r">קריאה לפעולה</div></div>`,
    "הרצף שכל מחולל מוציא. מחליפים את שם העסק והוא מתאים לכל תחום, כלומר לא נבנה בשביל אף אחד.",
    `<div class="wf"><div class="r t">מטבח אחד שסיימנו, בתמונה מלאה</div><div class="r n">כמה זה עולה, בשורה אחת</div><div class="r w">ארבעה שלבים, מהמדידה עד ההתקנה</div><div class="r w">שלוש עבודות, כל אחת עם מחיר ומשך</div><div class="r">תיאום מדידה</div></div>`,
    "נגר מטבחים: הגולש רוצה לראות עבודה, לדעת מחיר ולהבין את התהליך, בסדר הזה. הסקשנים, הגבהים והסדר נגזרו מזה."),
}),
doc({
  id: "a23", name: "טעם מוכן",
  desc: "מראה שלם שנלקח מהמדף ומולבש על כל עסק: קרם וסריף עם מילה אחת נטויה בטרקוטה; שחור כמעט מלא עם צבע חומצי אחד; תוויות מונו קטנות עם // ונקודות אמצע. כל אחד מהם נולד כבריחה מהמראה הסגול, והפך לתבנית בעצמו.",
  when: "הירו, כותרות סקשן ותוויות קטנות. בעיקר כשמבקשים מהמודל \"משהו לא גנרי\" בלי חומר מותג.",
  rule: "מחקר סימני AI, 17.11.2026. מקורות: \"The Claude Aesthetic\" (הניו יורקר, 6.2026), הדיון ב-Hacker News על \"design slop\" (4.2026), Impeccable (פלטת קרם, סריף נטוי), Hallmark (11.2026), ו-W3C על כך שבעברית אין נטוי אמיתי. ממתין לעין של ליאב. קרם, סריף, רקע כהה ופונט מונו אינם סימן לבדם; הסימן הוא הצירוף המוכן שלא נגזר מהמותג. משלים את feedback_brand_from_logo_file.",
  why: "זה הסימן של מי שכבר ברח מהסגול. הגולש לא חושב \"AI\" אלא \"ראיתי את זה אתמול\", והעסק נראה כמו עוד אחד באותה סדרה.",
  fix: "הפלטה והפונט מתחילים מקובץ הלוגו ומהחומרים של העסק, לא מסגנון. בעברית אין נטוי אמיתי, ולכן מילה מודגשת מקבלת משקל או צבע. תווית קטנה מקבלת עיצוב רק אם יש לה תפקיד.",
  spot: "מחליפים בראש את שם העסק בעסק מתחום אחר. אם העיצוב מתאים באותה מידה, הוא לא נגזר מהמותג. בשער: slop-check תופס פלטת קרם וסריף נטוי. לא נבדק אוטומטית: הקשר בין הפלטה לקובץ הלוגו.",
  css: `${AP_BASE}
.a23 .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.a23 .cd{border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:8px;min-height:150px}
.a23 .hd{font-size:clamp(16px,1.9cqi,22px);line-height:1.2;margin:0;font-weight:700}
.a23 .mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:.08em;margin:0;opacity:.7}
.a23 .cr{background:#f4efe6;color:#2b2622}
.a23 .cr .hd{font-family:"Frank Ruhl Libre","David",serif;font-weight:500}
.a23 .cr em{font-style:italic;color:#c0603d}
.a23 .dk{background:#0b0b0c;color:#f2f2ee}
.a23 .dk em{font-style:normal;color:#c6f432}
.a23 .good .cd{background:#eaf0f7;color:#12304f}
.a23 .good em{font-style:normal;color:#b86a12}
.a23 .lg{display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px}
.a23 .lg i{width:22px;height:22px;border-radius:6px;background:#12304f;box-shadow:inset -8px 0 0 #e8a33d}
.a23 .sw{display:flex;gap:6px;margin-top:auto}
.a23 .sw span{width:18px;height:18px;border-radius:50%}
@container (max-width:480px){.a23 .two{grid-template-columns:1fr}}`,
  html: wrap("a23",
    `<div class="two"><div class="cd cr"><p class="mono">// 01 · STUDIO</p><p class="hd">ליווי משכנתאות <em>אחרת</em></p></div><div class="cd dk"><p class="mono">// 01 · STUDIO</p><p class="hd">ליווי משכנתאות <em>אחרת</em></p></div></div>`,
    "שני מראות מדף על אותו עסק: קרם וסריף עם מילה נטויה בטרקוטה, ושחור עם צבע חומצי. שניהם היו מתאימים באותה מידה לכל עסק אחר.",
    `<div class="cd"><span class="lg"><i></i>גשר משכנתאות</span><p class="hd">ליווי משכנתאות <em>עד החתימה</em></p><span class="sw"><span style="background:#12304f"></span><span style="background:#e8a33d"></span><span style="background:#eaf0f7;box-shadow:inset 0 0 0 1px #c9d6e6"></span></span></div>`,
    "הכחול והצהוב נלקחו מקובץ הלוגו, והמשטח הוא גוון בהיר של אותו כחול. המילה המודגשת מקבלת צבע ומשקל, בלי נטוי."),
}),
doc({
  id: "a24", name: "תמונות שנראות מחוללות",
  desc: "תמונות שהמודל ייצר ואף אחד לא בדק מקרוב: עברית שבורה או הפוכה שנאפתה לתוך התמונה, אותן פנים בשלוש המלצות, מוצר שהוא כמעט המוצר של הלקוח, ואותו אור זהוב מטושטש על כל תמונה באתר.",
  when: "הירו, כרטיסי שירות, המלצות, גלריית מוצרים ותמונות למאמרים.",
  rule: "מחקר סימני AI, 17.11.2026 (ערוץ התמונות). מקורות: Decrypt (9.2026) ו-SF Standard (7.2026) על טקסט משובש בתמונות ועל תגובת לקוחות; CNN (9.2026) על אוכל מחולל; מדד Photoroom על נאמנות למוצר (7.2026); NN/g (8.2026); בדיקת עברית בתמונות מחוללות (nitaimodel, 8.2026). ממתין לעין של ליאב. תמונה מחוללת אינה סימן לבדה: רוב הגולשים לא מזהים תמונה טובה. הסימן הוא מה שלא נבדק, ומה שמתחזה לדבר אמיתי. משלים את feedback_sketch_real_visuals.",
  why: "עברית הפוכה בתוך תמונה נראית לכל ישראלי בשנייה. פנים שחוזרות בשלוש המלצות, או מוצר שאינו בדיוק המוצר, פוגעים באמון הרבה יותר מתמונה פשוטה ואמיתית.",
  fix: "מה שמציג דבר אמיתי (העסק, הצוות, המוצר, לקוחות) מצולם, או מתחיל מצילום אמיתי. טקסט ולוגו לא נאפים בתמונה אלא יושבים מעליה כטקסט חי. כל תמונה נבדקת בגודל מלא לפני שהיא עולה, ולכל סדרת תמונות יש מקור אחד וטיפול צבע אחד.",
  spot: "מגדילים כל תמונה ל-100% וקוראים כל אות, שלט ואריזה. מעמידים את תמונות האנשים זו ליד זו ומחפשים את אותן פנים. משווים את המוצר בתמונה למוצר האמיתי. בשער: לא נבדק אוטומטית, זו בדיקת עין.",
  css: `${AP_BASE}
.a24 .im{position:relative;border-radius:12px;min-height:110px;display:grid;place-items:center;overflow:hidden}
.a24 .bad .im{background:radial-gradient(120px 80px at 70% 30%,#ffe2a8,transparent 70%),linear-gradient(135deg,#f3b562,#c9742f)}
.a24 .bad .im b{font-size:26px;font-weight:800;color:#fff8e6;filter:blur(.6px);transform:rotate(-2deg)}
.a24 .good .im{background:#dfe0ea}
.a24 .good .im b{font-size:18px;font-weight:700;background:#16182b;color:#fff;padding:6px 12px;border-radius:8px}
.a24 .im small{position:absolute;bottom:8px;inset-inline-start:10px;font-size:11px;color:#3b3d52}
.a24 .ppl{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.a24 .p{display:flex;align-items:center;gap:8px;font-size:12px;background:#f3f3f6;border-radius:10px;padding:8px}
.a24 .p i{width:28px;height:28px;border-radius:50%;flex:none;font-style:normal}
.a24 .bad .p i{background:radial-gradient(circle at 50% 38%,#f6d2b8 0 34%,transparent 35%),radial-gradient(circle at 50% 110%,#7a8fb5 0 52%,transparent 53%),#e9d9c9}
.a24 .good .p i{background:#dfe0ea;display:grid;place-items:center;font-weight:700;font-size:11px;color:#3b3d52}
@container (max-width:480px){.a24 .ppl{grid-template-columns:1fr}}`,
  html: wrap("a24",
    `<div class="im"><b>ץיק עצבמ</b></div><div class="ppl"><div class="p"><i></i>מיכל</div><div class="p"><i></i>רונית</div><div class="p"><i></i>יעל</div></div>`,
    "\"מבצע קיץ\" נאפה בתוך התמונה ויצא הפוך, על רקע זהוב מטושטש. ושלוש ממליצות עם אותן פנים בדיוק.",
    `<div class="im"><b>מבצע קיץ</b><small>צילום של המוצר עצמו</small></div><div class="ppl"><div class="p"><i>מ.כ</i>מיכל כהן</div><div class="p"><i>ר.ל</i>רונית לוי</div><div class="p"><i>י.ב</i>יעל ברק</div></div>`,
    "התמונה היא צילום אמיתי, והטקסט יושב מעליה כטקסט חי. לממליצות אין פנים מחוללות: שם מלא, ותמונה רק אם הן שלחו אחת."),
}),
doc({
  id: "a25", name: "שאריות אנגלית באתר עברי",
  desc: "האתר בעברית, אבל חלקים ממנו נשארו בכיוון ובהרגלים של אנגלית: חץ \"המשך\" שמצביע ימינה, תבליט בצד הלא נכון, פס התקדמות שמתמלא משמאל, אותיות לטיניות בפונט אחר בתוך כותרת עברית, עברית נטויה מלאכותית, מחיר בדולרים, תאריך אמריקאי וכפתורי מערכת באנגלית.",
  when: "כל אתר עברי שנבנה במחולל: כפתורים עם חץ, רשימות, שלבי תהליך, קרוסלות, טפסים והודעות מערכת, מחירים ותאריכים.",
  rule: "מחקר סימני AI, 17.11.2026 (ערוץ העברית). מקורות: תיעוד ה-RTL של shadcn והדיון 9247 (1.2026), Evil Martians (5.2026), rtlify ומאמרו של עידן לוי על סוכני קוד ו-RTL, הנחיות הדו-כיווניות של Material, ו-W3C על נטוי בעברית. ממתין לעין של ליאב. משלים את כללי ה-RTL במנוע ואת בדיקות כיוון הטקסט בשער. לא הכול מתהפך: וי, סמל ניגון, לוגו ומספר טלפון נשארים כמו שהם.",
  why: "גולש ישראלי מרגיש את זה גם בלי לדעת להסביר: העין הולכת ימינה והחץ שולח אותה חזרה. זה נקרא כאתר שתורגם ולא כאתר שנבנה בעברית.",
  fix: "כיוון השורש מוגדר פעם אחת (dir=\"rtl\" ו-lang=\"he\"), והריווחים והמיקומים נכתבים במאפיינים לוגיים, כך שכל רכיב מתהפך לבד. חץ קדימה מצביע שמאלה. מחיר בשקלים ותאריך בסדר יום, חודש, שנה. כל מחרוזת מערכת (שליחה, שגיאה, טעינה, 404) בשפת האתר. פונט אחד שמכיל גם עברית וגם לטינית, והדגשה במשקל או בצבע.",
  spot: "עוברים על כל חץ ושואלים לאן הוא שולח. ממלאים טופס עד הסוף וקוראים כל הודעה שקופצת. מחפשים בעמוד את הסימן $, את המילה Submit ותאריך שמתחיל בחודש. בשער: project-check בודק lang ו-dir, יישור, פיסוק שנדד, מספר שהתהפך וכיוון שדות. לא נבדק אוטומטית: כיוון חצים ופסי התקדמות, מטבע ותאריך, מחרוזות מערכת באנגלית, ועירוב פונטים בכותרת.",
  css: `${AP_BASE}
.a25 .hd{font-weight:700;font-size:clamp(17px,1.8cqi,22px);margin:0;line-height:1.25}
.a25 .bad .hd .lat{font-family:Georgia,"Times New Roman",serif;font-weight:400}
.a25 .bad .hd em{font-style:italic}
.a25 .good .hd em{font-style:normal;color:#3d4fd6}
.a25 ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;font-size:13px}
.a25 li{position:relative}
.a25 li::before{content:"";position:absolute;top:.5em;width:7px;height:7px;border-radius:50%;background:#16182b}
.a25 .bad li{padding-left:16px}
.a25 .bad li::before{left:0}
.a25 .good li{padding-inline-start:16px}
.a25 .good li::before{inset-inline-start:0}
.a25 .bar{height:8px;border-radius:999px;background:#e4e4ee;overflow:hidden;display:flex}
.a25 .bar i{width:60%;background:#16182b;border-radius:999px}
.a25 .bad .bar{direction:ltr}
.a25 .sm{font-size:12px;color:#5b5b66;margin:0}
.a25 .row{display:flex;gap:8px;flex-wrap:wrap}`,
  html: wrap("a25",
    `<p class="hd">שירותי <span class="lat">Cloud</span> לעסק <em>שלך</em></p><ul><li>גיבוי יומי אוטומטי</li><li>תמיכה בעברית</li></ul><p class="sm">שלב 2 מתוך 3</p><div class="bar"><i></i></div><p class="sm">$29/mo · 11/17/2026</p><div class="row"><span class="btn">המשך →</span><span class="btn">Submit</span></div>`,
    "המילה הלטינית בפונט אחר, \"שלך\" בנטוי מלאכותי, התבליטים בצד שמאל, הפס מתמלא משמאל, מחיר בדולרים ותאריך אמריקאי, חץ שמצביע אחורה וכפתור באנגלית.",
    `<p class="hd">שירותי Cloud לעסק <em>שלך</em></p><ul><li>גיבוי יומי אוטומטי</li><li>תמיכה בעברית</li></ul><p class="sm">שלב 2 מתוך 3</p><div class="bar"><i></i></div><p class="sm">109 ש"ח לחודש · 17.11.2026</p><div class="row"><span class="btn">המשך ←</span><span class="btn">שליחה</span></div>`,
    "פונט אחד לעברית וללטינית, הדגשה בצבע, תבליטים בצד ההתחלה, הפס מתמלא מימין, שקלים ותאריך ישראלי, חץ קדימה וכפתור בעברית."),
}),
doc({
  id: "a26", name: "לוח בקרה מהמדף",
  desc: "מסך מערכת שנבנה מדף הדוגמה של הערכה: ארבע קוביות מדד זהות עם תגית שינוי ירוקה, כל דבר בתוך כרטיס באותו משקל, ריבוע צבעוני אחר בכל קובייה, גרף קישוטי, פעמון וחיפוש שלא עושים כלום, ונתוני דמו (Acme, John Doe).",
  when: "דשבורדים, מסכי ניהול, CRM ופאנלים: המסך הראשון אחרי ההתחברות.",
  rule: "מחקר סימני AI, 17.11.2026 (ערוץ ממשקי המערכת). מקורות: דף הדוגמה הרשמי של הדשבורד ב-shadcn, שהוא המקור של החתימה; שרשור r/webdesign \"האם הדשבורד הזה נראה מחולל\" (7.2025); \"Tells of a Slop UI\" (9.2026); רשימת הבדיקה של 21st.dev לממשק מחולל (8.2026); Hallmark (11.2026). ממתין לעין של ליאב. משלים את feedback_admin_panel_design.",
  why: "ארבעה מדדים באותו גודל אומרים שאף אחד לא שאל מה המשתמש בא לעשות במסך הזה. הוא נראה מלא ולא עונה על שאלה אחת. ונתוני דמו או כפתור מת שנשארו שוברים אמון במערכת כולה.",
  fix: "מתחילים מהשאלה הראשונה של המשתמש במסך, והיא מקבלת את המקום הגדול. שאר המספרים שקטים ובלי כרטיס לכל אחד. צבע מצב מופיע תמיד עם מילה. לכל אזור יש מצב ריק, מצב טעינה ומצב שגיאה. ספרות ברוחב אחיד. שום אלמנט לא נשאר בלי פעולה מאחוריו.",
  spot: "שואלים \"מה הדבר הראשון שהמשתמש צריך לדעת כאן?\" ובודקים אם זה הדבר הגדול במסך. לוחצים על כל אייקון בסרגל העליון. מחפשים Acme, John Doe ומספרים עגולים מדי. בשער: כפתורים מתים נתפסים ב-interact. לא נבדק אוטומטית: מבנה המסך, נתוני דמו, ומצבי ריק, טעינה ושגיאה.",
  css: `${AP_BASE}
.a26 .top{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#64748b}
.a26 .bell{position:relative;width:18px;height:18px;border-radius:50%;background:#e2e8f0;flex:none}
.a26 .bell::after{content:"";position:absolute;top:0;inset-inline-end:0;width:7px;height:7px;border-radius:50%;background:#ef4444}
.a26 .k4{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.a26 .k{border:1px solid #e2e8f0;border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:4px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.a26 .k .l{font-size:11px;color:#64748b;display:flex;justify-content:space-between;align-items:center;gap:6px}
.a26 .k .l i{width:18px;height:18px;border-radius:6px;flex:none;background:#dbeafe}
.a26 .k:nth-child(2) .l i{background:#dcfce7}
.a26 .k:nth-child(3) .l i{background:#fef3c7}
.a26 .k:nth-child(4) .l i{background:#fce7f3}
.a26 .k .n{font-size:18px;font-weight:700;line-height:1.1}
.a26 .k .d{font-size:10px;font-weight:600;color:#15803d;background:#dcfce7;border-radius:999px;padding:1px 7px;width:max-content}
.a26 .q{font-size:12px;color:#5b5b66;margin:0}
.a26 .big{font-size:clamp(20px,2.4cqi,28px);font-weight:700;line-height:1.15;margin:0}
.a26 .lst{display:flex;flex-direction:column;gap:6px;font-size:13px}
.a26 .lst a{display:flex;justify-content:space-between;gap:10px;background:#f3f3f6;border-radius:10px;padding:8px 12px;color:inherit;text-decoration:none;transition:background .2s}
.a26 .lst a:hover{background:#e9e9ef}
.a26 .lst b{font-weight:600}
.a26 .late{color:#a11414;font-weight:600}
.a26 .rest{display:flex;gap:18px;flex-wrap:wrap;font-size:12px;color:#5b5b66;font-variant-numeric:tabular-nums;margin:0}
.a26 .rest b{color:#16182b;font-size:14px}`,
  html: wrap("a26",
    `<div class="top"><span>Welcome back, John Doe 👋</span><span class="bell"></span></div><div class="k4"><div class="k"><span class="l">Total Revenue<i></i></span><span class="n">$45,231</span><span class="d">+20.1%</span></div><div class="k"><span class="l">Customers<i></i></span><span class="n">2,350</span><span class="d">+18.1%</span></div><div class="k"><span class="l">Sales<i></i></span><span class="n">12,234</span><span class="d">+19%</span></div><div class="k"><span class="l">Active Now<i></i></span><span class="n">573</span><span class="d">+20.1%</span></div></div><div class="ph">גרף</div>`,
    "ארבע קוביות זהות, כולן ירוקות ובאותו משקל, ריבוע צבעוני אחר בכל אחת, פעמון שלא נפתח, גרף קישוטי ונתוני דמו באנגלית.",
    `<p class="q">מה מחכה לך היום</p><p class="big">3 הצעות מחיר מחכות לתשובה</p><div class="lst"><a href="#"><b>סטודיו לקרמיקה</b><span class="late">באיחור של יומיים</span></a><a href="#"><b>מאפיית ארז</b><span>נשלחה אתמול</span></a><a href="#"><b>קליניקת שגב</b><span>נשלחה היום</span></a></div><p class="rest"><span><b>12</b> לידים החודש</span><span><b>4</b> פרויקטים פעילים</span></p>`,
    "המסך נפתח במה שהמשתמש צריך לעשות עכשיו, וכל שורה לחיצה. האיחור מסומן בצבע וגם במילה. שאר המספרים שקטים, בלי כרטיס לכל אחד."),
}),
];
