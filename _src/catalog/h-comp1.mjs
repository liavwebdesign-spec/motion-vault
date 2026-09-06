// קומפוזיציות C1-C8. מקור האמת של library/compositions.md בסקיל design-dna:
// הקובץ שם נוצר מכאן בבנייה, ולא נערך ידנית (הכרעה 6.9.2026).
//
// כל דמו ניטרלי בכוונה: הוא מגדיר מבנה בלבד (גריד, יחסים, קריסה).
// צבעים, רדיוסים, גופנים וריווח נלקחים מהעור של הפרויקט שאליו הוא נכנס.
//
// הקריסה למובייל כתובה ב-@container ולא ב-@media, כדי שמתג הרוחב בעמוד
// הדמו יראה קריסה אמיתית בלי לשנות את חלון הדפדפן. העטיפה .cwrap היא
// המכולה הנמדדת, ולכן היא חלק מהקוד המיוצא ולא מהמאגר.

export const BASE = `.cwrap{container-type:inline-size}
.cstage{--pad:clamp(20px,4cqi,64px);padding:clamp(36px,5cqi,80px) var(--pad)}
.tx{height:11px;border-radius:6px;background:#dfe0ea;margin:9px 0}
.tx.s{width:38%}.tx.m{width:62%}.tx.l{width:86%}
.ttl{font-size:clamp(22px,2.6cqi,34px);font-weight:700;margin:0 0 10px;line-height:1.2}
.lead{color:var(--muted);margin:0 0 14px;font-size:15px;line-height:1.6}
.btn{display:inline-block;background:var(--ink);color:#fff;border-radius:999px;padding:9px 18px;font-size:14px;font-weight:600;margin-top:12px}
.cwrap .ph{font-size:clamp(14px,1.6cqi,20px)}`;

const doc = (o) => ({ cat: "comp", area: "doctrine", status: "מאושר", runway: false, tech: "פריסה · CSS Grid", ...o });

export default [
doc({
  id:"c01", name:"חצי-חצי קלאסי",
  desc:"טקסט מול ויז'ואל, 50/50 או 60/40 (טקסט רחב יותר כשהוא העיקר). המבנה הבסיסי של האינטרנט.",
  when:"הסבר עם המחשה, אודות, פיצ'ר יחיד.",
  mobile:"ערימה, הוויז'ואל אחרי הכותרת.",
  note:"הכי נפוץ שווה הכי שקוף. להעדיף וריאציה (C2 או C3) כשהעמוד כבר מכיל אחד.",
  css:`${BASE}
.c1{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(20px,4cqi,64px);align-items:center}
.c1 .ph{aspect-ratio:4/3;border-radius:var(--r)}
@container (max-width:767px){.c1{grid-template-columns:1fr}}`,
  html:`<div class="cwrap cstage"><div class="c1">
  <div><h3 class="ttl">כותרת הסקשן, שתי שורות לכל היותר</h3><div class="tx l"></div><div class="tx m"></div><div class="tx s"></div><span class="btn">פעולה</span></div>
  <div class="ph ph-a">ויז'ואל</div>
</div></div>`
}),
doc({
  id:"c02", name:"חצי-חצי חופף",
  desc:"כמו C1, אבל שכבה אחת פולשת לשנייה: כרטיס טקסט שרוכב על קצה התמונה, או ויז'ואל שנשפך מתחת לטקסט.",
  when:"אותם תכנים כמו C1, כשרוצים עומק ועניין.",
  mobile:"החפיפה מצטמצמת ל-16 עד 24 פיקסלים או נעלמת.",
  note:"החפיפה יוצרת עומק בלי אף אפקט. הקומפוזיציה עושה את העבודה.",
  css:`${BASE}
.c2{display:grid;grid-template-columns:1fr 1fr;align-items:center}
.c2 .card{position:relative;z-index:2;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:clamp(20px,3cqi,36px);margin-inline-end:-64px;box-shadow:0 20px 50px rgba(22,24,43,.08)}
.c2 .ph{aspect-ratio:4/3;border-radius:var(--r)}
@container (max-width:767px){.c2{grid-template-columns:1fr}.c2 .card{order:2;margin-inline:16px;margin-top:-24px}}`,
  html:`<div class="cwrap cstage"><div class="c2">
  <div class="card"><h3 class="ttl">הכרטיס רוכב על התמונה</h3><div class="tx l"></div><div class="tx m"></div><span class="btn">פעולה</span></div>
  <div class="ph ph-b">ויז'ואל</div>
</div></div>`
}),
doc({
  id:"c03", name:"ציר מדורג (זיגזג)",
  desc:"שורות C1 שמתחלפות כיוון: טקסט מימין וויז'ואל משמאל, ואז הפוך. שתיים עד ארבע שורות.",
  when:"סדרת פיצ'רים או שירותים שכל אחד ראוי לפירוט.",
  mobile:"ערימה אחידה. הזיגזג נעלם, וזה בסדר.",
  note:"מעל ארבע שורות זה מונוטוני. לשבור באמצע עם C10 או C14.",
  css:`${BASE}
.c3 .row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4cqi,64px);align-items:center;margin-bottom:clamp(36px,6cqi,96px)}
.c3 .row:last-child{margin-bottom:0}
.c3 .row:nth-child(even) .txt{order:2}
.c3 .ph{aspect-ratio:4/3;border-radius:var(--r)}
@container (max-width:767px){.c3 .row{grid-template-columns:1fr}.c3 .row:nth-child(even) .txt{order:0}}`,
  html:`<div class="cwrap cstage"><div class="c3">
  <div class="row"><div class="txt"><h3 class="ttl">פיצ'ר ראשון</h3><div class="tx l"></div><div class="tx m"></div></div><div class="ph ph-a">01</div></div>
  <div class="row"><div class="txt"><h3 class="ttl">פיצ'ר שני</h3><div class="tx l"></div><div class="tx s"></div></div><div class="ph ph-c">02</div></div>
  <div class="row"><div class="txt"><h3 class="ttl">פיצ'ר שלישי</h3><div class="tx m"></div><div class="tx l"></div></div><div class="ph ph-b">03</div></div>
</div></div>`
}),
doc({
  id:"c04", name:"גריד כרטיסים",
  desc:"שתיים עד ארבע עמודות של פריטים שקולים. ברירת המחדל של האינטרנט, ולכן גם הבנאלית ביותר.",
  when:"פריטים באמת שקולים: מוצרים, מאמרים, חברי צוות.",
  mobile:"שתי עמודות ואז אחת, או קרוסלת peek.",
  note:"לפני שבוחרים בו, לשאול אם התוכן באמת שקול. אם יש פריט חשוב יותר, C5 או C15 מדויקים יותר.",
  css:`${BASE}
.c4{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2cqi,28px)}
.c4 .it{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px}
.c4 .ph{aspect-ratio:16/10;border-radius:10px;margin-bottom:14px}
@container (max-width:767px){.c4{grid-template-columns:repeat(2,1fr)}}
@container (max-width:479px){.c4{grid-template-columns:1fr}}`,
  html:`<div class="cwrap cstage"><div class="c4">
  <div class="it"><div class="ph ph-a">1</div><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><div class="ph ph-b">2</div><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><div class="ph ph-c">3</div><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><div class="ph ph-d">4</div><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><div class="ph ph-e">5</div><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><div class="ph ph-f">6</div><div class="tx m"></div><div class="tx l"></div></div>
</div></div>`
}),
doc({
  id:"c05", name:"בנטו",
  desc:"גריד עם תאים בגדלים שונים: תא גיבור 2 על 2, השאר קטנים. כל תא עולם משלו.",
  when:"תוכן מעורב סוגים (מספר, תמונה, טקסט, גרף), פיצ'רים עם היררכיה.",
  mobile:"תא הגיבור מלא ואז שתי עמודות. לאפס grid-column:span של תאים רחבים, אחרת נוצרות עמודות משתמעות.",
  note:"החוזק שלו הוא ההיררכיה: כל התאים שווים זה C4 מחופש. אין תאים ריקים: כשמספר הפריטים לא סוגר את הגריד, ממלאים את החור בתא CTA (כותרת קצרה וכפתור), לא משאירים חצי שורה ריקה ולא תולים את הכפתור לבד מתחת לגריד (נתפס בפועל, 8.2026).",
  css:`${BASE}
.c5{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:clamp(96px,14cqi,150px);gap:clamp(10px,1.6cqi,20px)}
.c5 .cell{border-radius:var(--r);padding:16px;display:flex;flex-direction:column;justify-content:flex-end}
/* הלבן רק לתאים שאינם ויז'ואל. .c5 .cell (שתי מחלקות) גובר על .ph-a (מחלקה אחת),
   ובלי הסייג הזה תא הגיבור יצא לבן עם טקסט לבן, כלומר ריק. נתפס בצילום, 6.9.2026. */
.c5 .cell:not(.ph):not(.cta){background:#fff;border:1px solid var(--line)}
.c5 .hero{grid-column:span 2;grid-row:span 2}
.c5 .tall{grid-row:span 2}
.c5 .num{font-size:clamp(30px,5cqi,56px);font-weight:800;line-height:1}
.c5 .cta{background:var(--ink);color:#fff;justify-content:center;align-items:flex-start}
.c5 .cta .btn{background:#fff;color:var(--ink)}
.c5 .ph{border-radius:var(--r)}
@container (max-width:767px){.c5{grid-template-columns:repeat(2,1fr)}.c5 .cell{grid-column:span 1 !important;grid-row:span 1 !important}.c5 .hero{grid-column:span 2 !important}}`,
  html:`<div class="cwrap cstage"><div class="c5">
  <div class="cell hero ph ph-a">תא גיבור 2 על 2</div>
  <div class="cell"><span class="num">120</span><div class="tx m"></div></div>
  <div class="cell tall ph ph-c">תא גבוה</div>
  <div class="cell"><div class="tx l"></div><div class="tx s"></div></div>
  <div class="cell"><span class="num">7</span><div class="tx m"></div></div>
  <div class="cell cta"><b>נשאר חור בגריד?</b><span class="btn">תא CTA ממלא אותו</span></div>
</div></div>`
}),
doc({
  id:"c06", name:"ציר אנכי ממוספר",
  desc:"עמוד שדרה אנכי (קו ומספרים 01 עד 04) שהתוכן נתלה עליו לסירוגין או בצד אחד.",
  when:"תהליך, שלבים, טיימליין, \"איך זה עובד\".",
  mobile:"הציר עובר לצד הימני והתוכן נערם משמאלו.",
  note:"המספור עצמו הוא ויז'ואל. אפשר ענק ושקוף (opacity .1) מאחורי התוכן.",
  css:`${BASE}
.c6{position:relative;padding-block:8px}
.c6::before{content:"";position:absolute;inset-block:0;inset-inline-start:50%;width:2px;background:var(--line)}
.c6 .it{position:relative;width:46%;margin-bottom:clamp(28px,5cqi,64px);background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:20px 22px 20px}
.c6 .it:nth-child(odd){margin-inline-start:0}
.c6 .it:nth-child(even){margin-inline-start:54%}
.c6 .it::after{content:"";position:absolute;top:26px;width:14px;height:14px;border-radius:50%;background:var(--ink);inset-inline-end:calc(-8.7% - 7px)}
.c6 .it:nth-child(even)::after{inset-inline-end:auto;inset-inline-start:calc(-8.7% - 7px)}
.c6 .n{position:absolute;top:-10px;inset-inline-end:14px;font-size:clamp(56px,9cqi,120px);font-weight:900;line-height:1;opacity:.08;pointer-events:none}
@container (max-width:767px){.c6::before{inset-inline-start:14px}.c6 .it{width:auto;margin-inline:0 !important;margin-inline-start:40px !important}.c6 .it::after{inset-inline-end:auto !important;inset-inline-start:-33px !important}}`,
  html:`<div class="cwrap cstage"><div class="c6">
  <div class="it"><span class="n">01</span><h3 class="ttl">שלב ראשון</h3><div class="tx l"></div><div class="tx m"></div></div>
  <div class="it"><span class="n">02</span><h3 class="ttl">שלב שני</h3><div class="tx l"></div><div class="tx s"></div></div>
  <div class="it"><span class="n">03</span><h3 class="ttl">שלב שלישי</h3><div class="tx m"></div><div class="tx l"></div></div>
  <div class="it"><span class="n">04</span><h3 class="ttl">שלב רביעי</h3><div class="tx l"></div><div class="tx m"></div></div>
</div></div>`
}),
doc({
  id:"c07", name:"מילה ענקית ולוויינים",
  desc:"מילה או מספר ענק (8 עד 14vw) כמרכז הקומפוזיציה, ופריטי תוכן קטנים מרחפים סביבו או נערמים לצדו.",
  when:"הצהרת מותג, מספר גיבור (שנות ניסיון, לקוחות), רגע דרמטי.",
  mobile:"המילה נשארת גדולה (6 עד 8vw לפחות), לא לפחד ממנה. הלוויינים יורדים לשורה מתחת.",
  note:"אחת לעמוד מקסימום. זה רגע, לא שיטה.",
  css:`${BASE}
.c7{position:relative;text-align:center;padding-block:clamp(24px,6cqi,80px)}
.c7 .big{font-size:clamp(64px,15cqi,220px);font-weight:900;line-height:.92;letter-spacing:-.02em;margin:0}
.c7 .sub{color:var(--muted);margin-top:8px}
.c7 .sat{position:absolute;background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 14px;font-size:13px;font-weight:600;box-shadow:0 10px 30px rgba(22,24,43,.06)}
.c7 .s1{top:10%;inset-inline-start:6%}.c7 .s2{top:14%;inset-inline-end:8%}.c7 .s3{bottom:12%;inset-inline-start:12%}.c7 .s4{bottom:8%;inset-inline-end:10%}
.c7 .sats{display:contents}
@container (max-width:767px){.c7 .big{font-size:clamp(56px,22cqi,120px)}.c7 .sats{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:18px}.c7 .sat{position:static}}`,
  html:`<div class="cwrap cstage"><div class="c7">
  <p class="big">340+</p><p class="sub">אתרים שעלו לאוויר</p>
  <div class="sats"><span class="sat s1">12 שנות ניסיון</span><span class="sat s2">4.9 ממוצע ביקורות</span><span class="sat s3">מענה תוך יום</span><span class="sat s4">100% מותאם אישית</span></div>
</div></div>`
}),
doc({
  id:"c08", name:"עריכתי, טקסט עוטף",
  desc:"פריסת מגזין: ויז'ואל נטוע בתוך גוש הטקסט (float) או טור טקסט צר עם הערות שוליים ויזואליות.",
  when:"סיפור, אודות ארוך, מאמר, תוכן שרוצים שירגיש \"כתבה\".",
  mobile:"הוויז'ואל נחלץ מהזרימה לבלוקים.",
  note:"measure צר (55 עד 65 תווים) חובה. זו כל האלגנטיות.",
  css:`${BASE}
.c8{max-width:62ch;margin-inline:auto}
.c8 .fig{float:inline-start;width:42%;aspect-ratio:1;border-radius:var(--r);margin:6px 0 12px 24px}
.c8 p{margin:0 0 14px;line-height:1.75;color:var(--muted)}
.c8 h3{font-size:clamp(22px,2.4cqi,30px);margin:0 0 14px}
@container (max-width:767px){.c8 .fig{float:none;width:100%;aspect-ratio:16/9;margin:0 0 16px}}`,
  html:`<div class="cwrap cstage"><div class="c8">
  <h3>כותרת בגובה כתבה, לא בגובה באנר</h3>
  <div class="fig ph ph-e">ויז'ואל נטוע</div>
  <p>הטקסט זורם סביב הוויז'ואל כמו בעמוד מגזין. הטור צר בכוונה, כי שורה ארוכה מדי מאבדת את הקורא בדרך חזרה לתחילת השורה הבאה, ובעברית זה מורגש עוד יותר.</p>
  <p>הפסקה השנייה ממשיכה לעטוף, ורק כשהוויז'ואל נגמר השורות חוזרות לרוחב המלא של הטור. זה מה שנותן לעמוד תחושה של כתבה שנערכה ולא של תבנית שמולאה.</p>
  <p>במובייל אין מקום לעטיפה, ולכן הוויז'ואל נחלץ מהזרימה והופך לבלוק מלא מעל הטקסט. השינוי הזה מכוון ולא פשרה.</p>
</div></div>`
}),
];
