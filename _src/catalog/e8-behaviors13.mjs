// מעבר מעמיק על המקורות (2.9.2026): שני רכיבי המרה שחזרו בכל ספריות הרכיבים.
export default [
{
  id:"b43", cat:"behavior", name:"מחשבון עם סליידר וגרף חי", tech:"input range · JS", status:"ממתין",
  desc:"סליידר אחד שמזיז את כל המסך: העמודות משנות גובה, המספרים מתעדכנים, והשורה התחתונה מחושבת בזמן אמת.",
  when:"הערכת מחיר, החזר על השקעה, חיסכון חודשי, גודל חבילה. עונה על \"כמה זה יעלה לי\" בלי טופס, ומכשיר את הליד לפני שהוא פונה.",
  libs:[],
  css:`.calc{max-width:min(860px,94vw);margin-inline:auto;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:clamp(22px,3vw,40px)}
.calc-top{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin-bottom:22px}
.calc-top h3{margin:0;font-size:clamp(20px,2.2vw,30px)}
.calc-out{text-align:end}
.calc-sum{font-size:clamp(30px,4vw,54px);font-weight:800;line-height:1;color:var(--accent);font-variant-numeric:tabular-nums}
.calc-sub{font-size:13px;color:var(--muted);margin-top:6px}
.calc-row{display:grid;gap:8px;margin-bottom:22px}
.calc-lbl{display:flex;justify-content:space-between;font-size:14px;color:var(--muted)}
.calc-lbl b{color:var(--ink);font-variant-numeric:tabular-nums}
.calc input[type=range]{width:100%;accent-color:var(--accent);height:26px}
.calc-bars{display:flex;align-items:flex-end;gap:clamp(8px,1.4vw,18px);height:clamp(140px,18vw,210px);margin-top:8px}
.calc-bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:8px;height:100%}
.calc-fill{width:100%;border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,#6f63ff,#4a3aff);
  transition:height .45s cubic-bezier(.2,.8,.2,1)}
.calc-bar.dim .calc-fill{background:linear-gradient(180deg,#cfcfe4,#b9b9d4)}
.calc-name{font-size:12px;color:var(--muted);white-space:nowrap}
.calc-foot{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;align-items:center;margin-top:24px;
  border-top:1px solid var(--line);padding-top:18px}
.calc-note{font-size:13px;color:var(--muted);max-width:44ch}
@media (prefers-reduced-motion: reduce){.calc-fill{transition:none}}`,
  html:`<div class="stage tight"><div class="calc">
  <div class="calc-top">
    <h3>כמה עמודים אתם צריכים?</h3>
    <div class="calc-out"><div class="calc-sum">0</div><div class="calc-sub">הערכה, לא הצעת מחיר</div></div>
  </div>
  <div class="calc-row">
    <div class="calc-lbl"><span>מספר עמודים</span><b class="calc-pages">5</b></div>
    <input type="range" min="1" max="20" value="5" class="calc-range" aria-label="מספר עמודים">
  </div>
  <div class="calc-bars">
    <div class="calc-bar"><div class="calc-fill" data-b="3" data-g="0.15" style="height:20%"></div><span class="calc-name">אפיון</span></div>
    <div class="calc-bar"><div class="calc-fill" data-b="2" data-g="0.9" style="height:30%"></div><span class="calc-name">עיצוב</span></div>
    <div class="calc-bar"><div class="calc-fill" data-b="1.5" data-g="1.4" style="height:44%"></div><span class="calc-name">פיתוח</span></div>
    <div class="calc-bar"><div class="calc-fill" data-b="1" data-g="0.5" style="height:16%"></div><span class="calc-name">תוכן</span></div>
    <div class="calc-bar dim"><div class="calc-fill" data-b="1" data-g="0.25" style="height:12%"></div><span class="calc-name">בדיקות</span></div>
  </div>
  <div class="calc-foot"><span class="calc-note">ההערכה מתעדכנת בזמן אמת. המחיר הסופי נקבע אחרי שיחה.</span>
  <button class="gbtn">לקבלת הצעה מדויקת</button></div>
</div></div>`,
  js:`(function(){
  const range=document.querySelector(".calc-range");
  const bars=[...document.querySelectorAll(".calc-fill")];
  const sum=document.querySelector(".calc-sum"),pages=document.querySelector(".calc-pages");
  const BASE=2400,PER=650;
  function render(){
    const n=+range.value;
    pages.textContent=n;
    // לכל מרכיב בסיס קבוע וקצב גידול משלו, ולכן היחס ביניהם משתנה עם מספר העמודים:
    // האפיון כמעט קבוע, והפיתוח הוא זה שמטפס. נרמול לפי הגבוהה כדי שתמיד תמלא את הגובה.
    const vals=bars.map(b=>+b.dataset.b + n * +b.dataset.g);
    const max=Math.max(...vals);
    bars.forEach((b,i)=>{b.style.height=Math.max(10,(vals[i]/max)*100)+"%";});
    const total=BASE+n*PER;
    sum.textContent=total.toLocaleString("he-IL")+" ש\\"ח";
  }
  range.addEventListener("input",render);
  render();
})();`,
  runway:false,
  note:"input type=range נותן נגישות מלאה בחינם: מקלדת, מגע וקורא מסך, בלי לכתוב סליידר מאפס. הנרמול חשוב, אחרת בערכים גבוהים כל העמודות נדבקות לתקרה ואי אפשר להשוות ביניהן. הסכום עובר דרך toLocaleString כדי לקבל פסיקים, והכיתוב מבהיר שזו הערכה בלבד, כי מחשבון שמתחייב למחיר יוצר ויכוח בשיחה."
},
{
  id:"b44", cat:"behavior", name:"סקשן תמחור עם השוואה והדגשת חבילה", tech:"CSS · GSAP", status:"ממתין",
  desc:"שלוש חבילות זו לצד זו, אחת מודגשת כמומלצת, ומתג שמחליף בין תצוגת כרטיסים לטבלת השוואה מלאה. הכרטיסים נכנסים בהדרגה, והמומלצת ראשונה.",
  when:"כל עסק שמוכר חבילות: אתרים, טיפולים, מנויים, תחזוקה, ליווי. הסקשן שקובע אם הליד פונה או ממשיך לחפש.",
  libs:["gsap","ScrollTrigger"],
  css:`.pr2{max-width:min(1080px,94vw);margin-inline:auto}
.pr2-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:clamp(22px,3vw,38px)}
.pr2-top h3{margin:0;font-size:clamp(24px,3vw,42px)}
.pr2-switch{display:inline-flex;background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:4px}
.pr2-switch button{border:0;background:none;font:inherit;font-size:14px;padding:9px 18px;border-radius:999px;cursor:pointer;color:var(--muted)}
.pr2-switch button.on{background:var(--ink);color:#fff}
.pr2-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--gap);align-items:start}
.pr2-card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:clamp(20px,2.4vw,32px);display:flex;flex-direction:column;gap:14px}
.pr2-card.best{border-color:var(--accent);box-shadow:0 18px 50px rgba(74,58,255,.14);position:relative}
.pr2-tag{position:absolute;top:-13px;inset-inline-start:24px;background:var(--accent);color:#fff;font-size:12px;border-radius:999px;padding:5px 13px}
.pr2-card h4{margin:0;font-size:19px}
.pr2-price{font-size:clamp(30px,3.6vw,46px);font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.pr2-price small{font-size:14px;font-weight:500;color:var(--muted)}
.pr2-card ul{list-style:none;margin:0;padding:0;display:grid;gap:9px;font-size:15px;color:var(--muted)}
.pr2-card li::before{content:"✓";color:#2b8a3e;font-weight:700;margin-inline-end:8px}
.pr2-card li.no{opacity:.5}
.pr2-card li.no::before{content:"✕";color:var(--muted);font-weight:500}
.pr2-card .gbtn{margin-top:auto;width:100%}
.pr2-card:not(.best) .gbtn{background:var(--bg);color:var(--ink);border:1px solid var(--line)}
.pr2-table{display:none;width:100%;border-collapse:collapse;font-size:15px}
.pr2-table th,.pr2-table td{padding:14px 12px;border-bottom:1px solid var(--line);text-align:start}
.pr2-table thead th{font-size:14px;color:var(--muted);font-weight:600}
.pr2-table td.mid,.pr2-table th.mid{text-align:center}
.pr2-table .best-col{background:rgba(74,58,255,.06)}
.pr2.table .pr2-cards{display:none}
.pr2.table .pr2-table{display:table}
@media(max-width:860px){.pr2-cards{grid-template-columns:1fr}.pr2-table{font-size:13px}}`,
  html:`<div class="stage tight"><div class="pr2">
  <div class="pr2-top">
    <h3>שלוש דרכים לעבוד יחד</h3>
    <div class="pr2-switch"><button class="on" data-v="cards">כרטיסים</button><button data-v="table">טבלת השוואה</button></div>
  </div>
  <div class="pr2-cards">
    <article class="pr2-card"><h4>קלאסי</h4><div class="pr2-price">4,900 <small>ש"ח</small></div>
      <ul><li>עד 5 עמודים</li><li>התאמה למובייל</li><li>טופס יצירת קשר</li><li class="no">כתיבת קופי</li><li class="no">אנימציות מתקדמות</li></ul>
      <button class="gbtn">מתאים לי</button></article>
    <article class="pr2-card best"><span class="pr2-tag">הכי נבחר</span><h4>גימור גבוה</h4><div class="pr2-price">8,900 <small>ש"ח</small></div>
      <ul><li>עד 10 עמודים</li><li>התאמה למובייל</li><li>טופס יצירת קשר</li><li>כתיבת קופי</li><li class="no">אנימציות מתקדמות</li></ul>
      <button class="gbtn">מתאים לי</button></article>
    <article class="pr2-card"><h4>שומט לסתות</h4><div class="pr2-price">14,900 <small>ש"ח</small></div>
      <ul><li>ללא הגבלת עמודים</li><li>התאמה למובייל</li><li>טופס יצירת קשר</li><li>כתיבת קופי</li><li>אנימציות מתקדמות</li></ul>
      <button class="gbtn">מתאים לי</button></article>
  </div>
  <table class="pr2-table">
    <thead><tr><th>מה כלול</th><th class="mid">קלאסי</th><th class="mid best-col">גימור גבוה</th><th class="mid">שומט לסתות</th></tr></thead>
    <tbody>
      <tr><td>מספר עמודים</td><td class="mid">5</td><td class="mid best-col">10</td><td class="mid">ללא הגבלה</td></tr>
      <tr><td>כתיבת קופי</td><td class="mid">✕</td><td class="mid best-col">✓</td><td class="mid">✓</td></tr>
      <tr><td>אנימציות מתקדמות</td><td class="mid">✕</td><td class="mid best-col">✕</td><td class="mid">✓</td></tr>
      <tr><td>זמן אספקה</td><td class="mid">שבועיים</td><td class="mid best-col">3 שבועות</td><td class="mid">5 שבועות</td></tr>
      <tr><td>ליווי אחרי השקה</td><td class="mid">חודש</td><td class="mid best-col">חודשיים</td><td class="mid">שלושה חודשים</td></tr>
    </tbody>
  </table>
</div></div>`,
  js:`(function(){
  const wrap=document.querySelector(".pr2");
  const btns=[...wrap.querySelectorAll(".pr2-switch button")];
  btns.forEach(b=>b.addEventListener("click",()=>{
    btns.forEach(x=>x.classList.toggle("on",x===b));
    wrap.classList.toggle("table",b.dataset.v==="table");
  }));
  // כניסה מדורגת, והחבילה המומלצת נכנסת ראשונה כדי שהעין תיפול עליה
  const cards=gsap.utils.toArray(".pr2-card");
  const order=[...cards].sort((a,b)=>(b.classList.contains("best")?1:0)-(a.classList.contains("best")?1:0));
  gsap.from(order,{y:34,autoAlpha:0,duration:.6,ease:"power3.out",stagger:.09,
    scrollTrigger:{trigger:".pr2-cards",start:"top 82%",once:true}});
})();`,
  runway:false,
  note:"שתי תצוגות לאותו מידע: כרטיסים למי שסורק מהר, וטבלה למי שמשווה ברצינות. ההדגשה של החבילה המומלצת נעשית במסגרת ובצל ולא בהגדלה, כי הגדלה שוברת את יישור הכרטיסים ומקפיצה את הגריד. הכניסה מתחילה דווקא מהחבילה המומלצת. בטבלה העמודה המומלצת מקבלת רקע עדין כדי שהעין תמצא אותה גם באמצע השוואה."
},
];
