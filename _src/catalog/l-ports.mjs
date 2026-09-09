// פורטים נייטיב (8.9.2026): 13 מהלכים שהיו במאגר רק כ-iframe של דוקס (MagicUI, ReactBits)
// נכתבו מחדש כ-CSS/JS טהור, RTL-נכון, על טוקני המאגר, לפי התורה (easing חתום, בלי
// transition על layout, שערי hover ו-reduced-motion). המקור מצוין ב-note לכל מהלך.
// לא נכתבו מחדש: ScrollVelocity (יש b42), Marquee (b01), ScrollExpand (g56), AccordionGallery (b46),
// ScrollStack (b37), BorderBeam (css12), NumberTicker (b02), BlurFade (css05), SplitText (g04/g16),
// ושני ה-WebGL (MorphSlider, CircularGallery). DepthCarousel נכתב מחדש כ-b62 (9.9.2026) בלי WebGL.
export default [
{
  id:"css25", cat:"css", name:"בנטו עם כוריאוגרפיית הובר", tech:"CSS · grid", status:"ממתין", runway:false,
  desc:"גריד בנטו שכל כרטיס בו מגיב להובר בשלוש שכבות בבת אחת: הטקסט עולה, האייקון מתכווץ, וקישור נחשף מלמטה. תנועה אחת שמרגישה כמו שלוש.",
  when:"סקשן פיצ'רים עם היררכיה (תא אחד גדול, השאר קטנים). חוק התאים הריקים חל: כל תא חייב תוכן אמיתי.",
  note:"מקור: MagicUI BentoGrid. נכתב מחדש ב-CSS בלבד. במגע אין הובר, לכן הקישור גלוי תמיד במובייל.",
  libs:[],
  css:`.bn{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:minmax(220px,auto);gap:var(--gap);max-width:1100px;margin-inline:auto}
.bn-card{position:relative;overflow:hidden;border-radius:var(--r);background:var(--card);border:1px solid var(--line);padding:24px;display:flex;flex-direction:column;justify-content:flex-end;min-height:220px;isolation:isolate}
.bn-card.wide{grid-column:span 2}
.bn-ic{width:44px;height:44px;border-radius:12px;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font-weight:800;margin-bottom:auto;transform-origin:top right;transition:transform .5s cubic-bezier(.2,.6,.2,1)}
.bn-body{transition:transform .5s cubic-bezier(.2,.6,.2,1)}
.bn-body h3{margin:0 0 6px;font-size:clamp(18px,1.8vw,24px)}
.bn-body p{margin:0;color:var(--muted);font-size:15px;line-height:1.55;max-width:38ch}
.bn-cta{position:absolute;inset-inline:24px;bottom:0;display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px;color:var(--accent);padding-block:14px;
  transform:translateY(100%);opacity:0;transition:transform .5s cubic-bezier(.2,.6,.2,1),opacity .35s}
.bn-cta::after{content:"←"}
.bn-card::after{content:"";position:absolute;inset:0;background:var(--ink);opacity:0;transition:opacity .4s;z-index:-1;pointer-events:none}
@media (hover:hover) and (pointer:fine){
  .bn-card:hover .bn-body{transform:translateY(-38px)}
  .bn-card:hover .bn-ic{transform:scale(.78)}
  .bn-card:hover .bn-cta{transform:none;opacity:1}
  .bn-card:hover::after{opacity:.04}
}
@media (hover:none){.bn-cta{position:static;transform:none;opacity:1;margin-top:14px;padding-block:0}}
@media (max-width:767px){.bn{grid-template-columns:1fr}.bn-card.wide{grid-column:auto}}
@media (prefers-reduced-motion: reduce){.bn-body,.bn-ic,.bn-cta,.bn-card::after{transition:none}}`,
  html:`<div class="stage tight"><div class="bn">
  <article class="bn-card wide"><div class="bn-ic">01</div><div class="bn-body"><h3>אפיון לפני עיצוב</h3><p>שיחה אחת שממפה מי הלקוח, מה הוא מחפש ומה מונע ממנו לפנות. משם נגזר כל העמוד.</p></div><a class="bn-cta" href="#">איך זה עובד</a></article>
  <article class="bn-card"><div class="bn-ic">02</div><div class="bn-body"><h3>קופי שמוכר</h3><p>כל משפט עונה על שאלה שהגולש שואל.</p></div><a class="bn-cta" href="#">דוגמאות</a></article>
  <article class="bn-card"><div class="bn-ic">03</div><div class="bn-body"><h3>מובייל קודם</h3><p>שבעים אחוז מהתנועה. שם מתחילים.</p></div><a class="bn-cta" href="#">למה</a></article>
  <article class="bn-card wide"><div class="bn-ic">04</div><div class="bn-body"><h3>מדידה מהיום הראשון</h3><p>טפסים, שיחות, וואטסאפ. כל פנייה נספרת, וכל שינוי נבחן מול מספר.</p></div><a class="bn-cta" href="#">מה מודדים</a></article>
</div></div>`
},
{
  id:"css26", cat:"css", name:"קיר אריחים נסחף בפרספקטיבה", tech:"CSS · keyframes", status:"ממתין", runway:false,
  desc:"קיר אינסופי של אריחים בפרספקטיבה קלה שנסחף אנכית בלי סוף, כל עמודה בקצב אחר. הובר עוצר את העמודה ומרים אריח.",
  when:"רקע אווירה חי מאחורי הירו של תיק עבודות, קיר לוגואים של לקוחות, סקשן \"עבדנו עם\". תמיד עם שכבת טקסט מעל.",
  note:"מקור: ReactBits DriftWall. נכתב מחדש ב-CSS בלבד: כל עמודה משוכפלת פעמיים ונעה 50%, כך שהלולאה חלקה. reduced-motion עוצר את הסחיפה.",
  libs:[],
  css:`.dw{position:relative;height:clamp(360px,60vh,560px);overflow:hidden;border-radius:var(--r);background:var(--ink);perspective:900px;
  mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent);-webkit-mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)}
.dw-grid{position:absolute;inset:-10% -4%;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;transform:rotateX(14deg) rotateZ(-4deg) scale(1.08);transform-style:preserve-3d}
.dw-col{display:flex;flex-direction:column;gap:14px;animation:dw-up 26s linear infinite}
.dw-col:nth-child(2n){animation-duration:34s;animation-direction:reverse}
.dw-col:nth-child(3n){animation-duration:30s}
.dw-tile{aspect-ratio:4/3;border-radius:12px;background:color-mix(in srgb,var(--bg) 8%,transparent);border:1px solid color-mix(in srgb,var(--bg) 10%,transparent);display:grid;place-items:center;color:color-mix(in srgb,var(--bg) 60%,transparent);font-weight:700;font-size:14px;
  transition:transform .5s cubic-bezier(.2,.6,.2,1),background-color .4s}
.dw-tile.ph{color:#fff}
@keyframes dw-up{to{transform:translateY(-50%)}}
@media (hover:hover) and (pointer:fine){
  .dw-col:hover{animation-play-state:paused}
  .dw-tile:hover{transform:translateZ(40px) scale(1.04);background:rgba(255,255,255,.14)}
}
.dw-over{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--bg);pointer-events:none;padding:24px}
.dw-over h2{margin:0;font-size:var(--fs-h2);text-shadow:0 2px 24px rgba(0,0,0,.5)}
@media (prefers-reduced-motion: reduce){.dw-col{animation:none}}`,
  html:`<div class="stage tight"><div class="dw">
  <div class="dw-grid">
    <div class="dw-col"><div class="dw-tile ph ph-a">1</div><div class="dw-tile">2</div><div class="dw-tile ph ph-c">3</div><div class="dw-tile">4</div><div class="dw-tile ph ph-a">1</div><div class="dw-tile">2</div><div class="dw-tile ph ph-c">3</div><div class="dw-tile">4</div></div>
    <div class="dw-col"><div class="dw-tile">5</div><div class="dw-tile ph ph-b">6</div><div class="dw-tile">7</div><div class="dw-tile ph ph-d">8</div><div class="dw-tile">5</div><div class="dw-tile ph ph-b">6</div><div class="dw-tile">7</div><div class="dw-tile ph ph-d">8</div></div>
    <div class="dw-col"><div class="dw-tile ph ph-e">9</div><div class="dw-tile">10</div><div class="dw-tile ph ph-a">11</div><div class="dw-tile">12</div><div class="dw-tile ph ph-e">9</div><div class="dw-tile">10</div><div class="dw-tile ph ph-a">11</div><div class="dw-tile">12</div></div>
    <div class="dw-col"><div class="dw-tile">13</div><div class="dw-tile ph ph-c">14</div><div class="dw-tile">15</div><div class="dw-tile ph ph-b">16</div><div class="dw-tile">13</div><div class="dw-tile ph ph-c">14</div><div class="dw-tile">15</div><div class="dw-tile ph ph-b">16</div></div>
    <div class="dw-col"><div class="dw-tile ph ph-d">17</div><div class="dw-tile">18</div><div class="dw-tile ph ph-e">19</div><div class="dw-tile">20</div><div class="dw-tile ph ph-d">17</div><div class="dw-tile">18</div><div class="dw-tile ph ph-e">19</div><div class="dw-tile">20</div></div>
  </div>
  <div class="dw-over"><h2>יותר מארבעים פרויקטים שעלו לאוויר</h2></div>
</div></div>`
},
{
  id:"css27", cat:"css", name:"לוויינים במסלול סביב מרכז", tech:"CSS · keyframes", status:"ממתין", runway:false,
  desc:"אלמנט מרכזי ושני מסלולים סביבו, שבכל אחד אייקונים מקיפים אותו במהירות וכיוון שונים. האייקונים נשארים זקופים כי הם מסתובבים נגד המסלול.",
  when:"הצגת אקוסיסטם: אינטגרציות סביב מוצר, כישורים סביב לוגו, שותפים סביב חברה. אחד לעמוד.",
  note:"מקור: MagicUI OrbitingCircles. נכתב מחדש ב-CSS בלבד. כל לוויין מקבל זווית התחלה ב---a, והסיבוב הנגדי שומר אותו קריא.",
  libs:[],
  css:`.orb{position:relative;width:min(520px,90vw);aspect-ratio:1;margin-inline:auto;display:grid;place-items:center}
.orb-core{width:96px;height:96px;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:grid;place-items:center;font-weight:800;font-size:22px;box-shadow:0 20px 50px color-mix(in srgb,var(--accent) 35%,transparent);position:relative;z-index:2}
.orb-ring{position:absolute;inset:0;border-radius:50%;border:1px dashed var(--line);margin:auto;animation:orb-spin var(--t,22s) linear infinite}
.orb-ring.in{width:56%;height:56%;--t:14s;animation-direction:reverse}
.orb-ring.out{width:92%;height:92%}
.orb-sat{position:absolute;top:50%;left:50%;width:64px;height:64px;margin:-32px;border-radius:50%;background:var(--card);border:1px solid var(--line);display:grid;place-items:center;font-weight:700;font-size:12px;color:var(--ink);box-shadow:0 6px 18px rgba(0,0,0,.08);text-align:center;padding:4px;line-height:1.1;
  transform:rotate(var(--a)) translateX(calc(var(--rad) * 1px)) rotate(calc(-1 * var(--a)));animation:orb-counter var(--t,22s) linear infinite}
.orb-ring.in .orb-sat{animation-direction:reverse}
.orb-ring.in{--rad:146}.orb-ring.out{--rad:239}
@media (max-width:520px){.orb-ring.in{--rad:110}.orb-ring.out{--rad:180}.orb-ring.out{width:88%;height:88%}}
@keyframes orb-spin{to{transform:rotate(360deg)}}
@keyframes orb-counter{to{transform:rotate(calc(var(--a) + 360deg)) translateX(calc(var(--rad) * 1px)) rotate(calc(-1 * var(--a) - 360deg))}}
@media (prefers-reduced-motion: reduce){.orb-ring,.orb-sat{animation:none}}`,
  html:`<div class="stage tight"><div class="orb">
  <div class="orb-core">MV</div>
  <div class="orb-ring in"><span class="orb-sat" style="--a:0deg">CRM</span><span class="orb-sat" style="--a:120deg">מייל</span><span class="orb-sat" style="--a:240deg">וואטסאפ</span></div>
  <div class="orb-ring out"><span class="orb-sat" style="--a:30deg">סליקה</span><span class="orb-sat" style="--a:102deg">יומן</span><span class="orb-sat" style="--a:174deg">אנליטיקס</span><span class="orb-sat" style="--a:246deg">חשבוניות</span><span class="orb-sat" style="--a:318deg">אוטומציה</span></div>
</div></div>`
},
{
  id:"css28", cat:"css", name:"אדוות רקע מאחורי אלמנט", tech:"CSS · keyframes", status:"ממתין", runway:false,
  desc:"מעגלים קונצנטריים שמתרחבים ודוהים לאט מאחורי אלמנט מרכזי, כמו אבן במים. שקט מאוד, כמעט לא מורגש, ונותן לכפתור או ללוגו נוכחות.",
  when:"מאחורי CTA ראשי, לוגו בהירו, או אייקון \"זמין עכשיו\". עדין מספיק כדי לשבת מאחורי טקסט.",
  note:"מקור: MagicUI Ripple. נכתב מחדש ב-CSS בלבד עם שמונה טבעות ב---i. השקיפות יורדת עם הרדיוס, כך שהחיצוניות כמעט לא נראות.",
  libs:[],
  css:`.rip{position:relative;height:clamp(320px,50vh,480px);display:grid;place-items:center;overflow:hidden;border-radius:var(--r);background:var(--card);border:1px solid var(--line)}
.rip-ring{position:absolute;top:50%;left:50%;width:calc(180px + var(--i) * 70px);aspect-ratio:1;border-radius:50%;border:1px solid var(--accent);
  background:color-mix(in srgb,var(--accent) 6%,transparent);opacity:calc(.55 - var(--i) * .06);transform:translate(-50%,-50%) scale(1);
  animation:rip-pulse 3.2s cubic-bezier(.2,.6,.2,1) infinite;animation-delay:calc(var(--i) * .22s)}
@keyframes rip-pulse{50%{transform:translate(-50%,-50%) scale(.94)}}
.rip-core{position:relative;z-index:1;text-align:center}
.rip-core h3{margin:0 0 14px;font-size:clamp(22px,2.6vw,36px)}
@media (prefers-reduced-motion: reduce){.rip-ring{animation:none}}`,
  html:`<div class="stage tight"><div class="rip">
  <span class="rip-ring" style="--i:0"></span><span class="rip-ring" style="--i:1"></span><span class="rip-ring" style="--i:2"></span><span class="rip-ring" style="--i:3"></span>
  <span class="rip-ring" style="--i:4"></span><span class="rip-ring" style="--i:5"></span><span class="rip-ring" style="--i:6"></span><span class="rip-ring" style="--i:7"></span>
  <div class="rip-core"><h3>מוכנים להתחיל?</h3><button class="gbtn">קבעו שיחת היכרות</button></div>
</div></div>`
},
{
  id:"css29", cat:"css", name:"מטאורים חולפים ברקע", tech:"CSS · keyframes", status:"ממתין", runway:false,
  desc:"פסי אור דקים שחוצים את הרקע באלכסון בזמנים ומהירויות אקראיים. עשרים שניות של רקע חי בלי שום JS.",
  when:"הירו כהה של מוצר טכנולוגי, סקשן \"בקרוב\", עמוד 404. רק על רקע כהה, ורק אחד לעמוד.",
  note:"מקור: MagicUI Meteors. נכתב מחדש ב-CSS בלבד: כל מטאור מקבל מיקום, השהיה ומשך ב-inline vars, כך שאין שני מטאורים זהים.",
  libs:[],
  css:`.met{position:relative;height:clamp(340px,56vh,520px);overflow:hidden;border-radius:var(--r);background:var(--ink);display:grid;place-items:center;color:var(--bg);text-align:center;padding:24px}
.met h2{margin:0;font-size:var(--fs-h2);position:relative;z-index:1}
.met p{margin:10px 0 0;color:color-mix(in srgb,var(--bg) 72%,transparent);position:relative;z-index:1}
.met-s{position:absolute;top:-4px;left:var(--x);width:2px;height:2px;border-radius:50%;background:#fff /* qa-allow: white, ידית/סמן ולא משטח טקסט */;box-shadow:0 0 0 1px rgba(255,255,255,.1);transform:rotate(215deg);
  animation:met-fall var(--d,5s) linear infinite;animation-delay:var(--w,0s);opacity:0}
.met-s::before{content:"";position:absolute;top:50%;transform:translateY(-50%);width:80px;height:1px;background:linear-gradient(90deg,#fff,transparent)}
@keyframes met-fall{0%{transform:rotate(215deg) translateX(0);opacity:1}70%{opacity:1}100%{transform:rotate(215deg) translateX(-620px);opacity:0}}
@media (prefers-reduced-motion: reduce){.met-s{animation:none;opacity:.35}}`,
  html:`<div class="stage tight"><div class="met">
  <span class="met-s" style="--x:8%;--d:4.2s;--w:0s"></span><span class="met-s" style="--x:22%;--d:6s;--w:1.4s"></span><span class="met-s" style="--x:35%;--d:5.1s;--w:2.6s"></span>
  <span class="met-s" style="--x:48%;--d:7s;--w:.8s"></span><span class="met-s" style="--x:57%;--d:4.6s;--w:3.9s"></span><span class="met-s" style="--x:69%;--d:6.4s;--w:2.1s"></span>
  <span class="met-s" style="--x:78%;--d:5.4s;--w:4.8s"></span><span class="met-s" style="--x:88%;--d:6.8s;--w:1.9s"></span><span class="met-s" style="--x:96%;--d:4.9s;--w:3.2s"></span>
  <span class="met-s" style="--x:15%;--d:7.4s;--w:5.6s"></span><span class="met-s" style="--x:42%;--d:5.8s;--w:6.3s"></span><span class="met-s" style="--x:63%;--d:4.4s;--w:7.1s"></span>
  <div><h2>הגרסה הבאה בדרך</h2><p>נעדכן אתכם כשהיא עולה.</p></div>
</div></div>`
},
{
  id:"css30", cat:"css", name:"מילים שמתבהרות מהערפל", tech:"CSS · IntersectionObserver", status:"ממתין",
  desc:"כותרת שנכנסת מילה אחרי מילה, כל מילה מטושטשת ומעט למטה ומתבהרת למקומה. פיצול למילים בלבד, אף פעם לא לאותיות בעברית.",
  when:"כותרת הירו או משפט מפתח אחד בעמוד. הפיצול למילים שומר על הקריאות של עברית מחוברת.",
  note:"מקור: ReactBits BlurText. נכתב מחדש: המילים כבר מפוצלות במארקאפ (בלי JS שמפצל בזמן ריצה), הסטאגר ב---i, וה-IO רק מוסיף .in. בלי JS המילים פשוט מופיעות.",
  libs:[],
  css:`.bt{max-width:22ch;margin-inline:auto;text-align:center;font-size:var(--fs-demo);font-weight:800;line-height:1.15}
.bt .w{display:inline-block;margin-inline:.12em;opacity:0;filter:blur(10px);translate:0 14px;
  transition:opacity .7s cubic-bezier(.2,.6,.2,1),filter .7s cubic-bezier(.2,.6,.2,1),translate .7s cubic-bezier(.2,.6,.2,1);transition-delay:calc(var(--i) * 90ms)}
.bt.in .w{opacity:1;filter:blur(0);translate:0 0}
.bt-sub{text-align:center;color:var(--muted);margin-top:18px;opacity:0;transition:opacity .6s .7s}
.bt.in + .bt-sub{opacity:1}
@media (prefers-reduced-motion: reduce){.bt .w{transition:none;opacity:1;filter:none;translate:none}.bt-sub{transition:none;opacity:1}}`,
  html:`<div class="stage"><h2 class="bt"><span class="w" style="--i:0">אתר</span><span class="w" style="--i:1">שמביא</span><span class="w" style="--i:2">לקוחות,</span><span class="w" style="--i:3">לא</span><span class="w" style="--i:4">רק</span><span class="w" style="--i:5">מחמאות.</span></h2>
<p class="bt-sub">כל עמוד נבנה סביב פעולה אחת שהגולש אמור לעשות.</p></div>`,
  js:`const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)} }),{threshold:.4});
document.querySelectorAll(".bt").forEach(el=>io.observe(el));`
},
{
  id:"css31", cat:"css", name:"זוהר צפוני ברקע (בלי WebGL)", tech:"CSS · keyframes", status:"ממתין", runway:false,
  desc:"שלושה כתמי צבע מטושטשים שנעים לאט אחד על השני ויוצרים רקע גלי רך, כמו זוהר צפוני. אפס JS, אפס WebGL, עובד בכל מכשיר.",
  when:"רקע הירו באתרי טכנולוגיה ופרימיום כהים, מאחורי כותרת אחת. אחד לעמוד.",
  note:"מקור: ReactBits Aurora (WebGL). כאן גרסת CSS: blur כבד על שלושה בלובים ב-mix-blend-mode. זולה למעבד, ובמובייל ה-blur מצטמצם כדי לא לחמם.",
  libs:[],
  css:`.au{position:relative;height:clamp(360px,62vh,560px);overflow:hidden;border-radius:var(--r);background:#07081a;display:grid;place-items:center;text-align:center;color:#fff;padding:24px;isolation:isolate}
.au-b{position:absolute;width:60%;aspect-ratio:1;border-radius:50%;filter:blur(70px);opacity:.75;mix-blend-mode:screen;animation:au-move var(--t) ease-in-out infinite alternate;will-change:transform}
.au-b.a{background:var(--accent);top:-20%;left:-10%;--t:16s}
.au-b.b{background:#2bd4c8;bottom:-25%;right:-8%;--t:21s;animation-delay:-6s}
.au-b.c{background:#ff5fa2;top:20%;left:35%;width:45%;--t:19s;animation-delay:-11s;opacity:.55}
@keyframes au-move{from{transform:translate(0,0) scale(1)}to{transform:translate(18%,12%) scale(1.25)}}
.au-txt{position:relative;z-index:1;max-width:30ch}
.au-txt h2{margin:0 0 12px;font-size:var(--fs-h2)}
.au-txt p{margin:0;color:rgba(255,255,255,.92)}
.au-txt::before{content:"";position:absolute;inset:-40px -60px;background:radial-gradient(closest-side,rgba(7,8,26,.55),transparent);z-index:-1;border-radius:50%}
@media (max-width:767px){.au-b{filter:blur(44px)}}
@media (prefers-reduced-motion: reduce){.au-b{animation:none}}`,
  html:`<div class="stage tight"><div class="au">
  <span class="au-b a"></span><span class="au-b b"></span><span class="au-b c"></span>
  <div class="au-txt"><h2>הפלטפורמה שמנהלת את הלקוחות בשבילכם</h2><p>לידים, הצעות מחיר, גבייה ומעקב. במקום אחד, בעברית.</p></div>
</div></div>`
},
{
  id:"css32", cat:"css", name:"קרן אור שזורמת בין שני אלמנטים", tech:"CSS · SVG", status:"ממתין", runway:false,
  desc:"קו SVG מחבר שני כרטיסים, ופולס של אור זורם עליו שוב ושוב ומראה שהם מדברים. דיאגרמה שמרגישה חיה.",
  when:"איך זה עובד, חיבורי מערכות, אינטגרציות, זרימת נתונים. שניים עד ארבעה קווים לכל היותר.",
  note:"מקור: MagicUI AnimatedBeam. נכתב מחדש: הקו סטטי ב-SVG, הפולס הוא stroke-dasharray קצר עם dashoffset מונפש ב-keyframes. הקואורדינטות קבועות ל-viewBox, לכן הדיאגרמה מתכווצת יחסית ולא נשברת.",
  libs:[],
  css:`.bm{position:relative;max-width:760px;margin-inline:auto;aspect-ratio:760/300}
.bm svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.bm-line{fill:none;stroke:var(--line);stroke-width:2}
.bm-pulse{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:60 900;stroke-dashoffset:960;animation:bm-flow 2.6s cubic-bezier(.2,.6,.2,1) infinite}
.bm-pulse.d2{animation-delay:.9s}.bm-pulse.d3{animation-delay:1.7s}
@keyframes bm-flow{to{stroke-dashoffset:0}}
.bm-node{position:absolute;width:84px;height:84px;border-radius:20px;background:var(--card);border:1px solid var(--line);box-shadow:0 10px 30px rgba(0,0,0,.08);display:grid;place-items:center;font-weight:700;font-size:13px;color:var(--ink);transform:translate(-50%,-50%)}
.bm-node.hub{width:104px;height:104px;background:var(--accent);color:var(--accent-ink);font-size:16px}
@media (prefers-reduced-motion: reduce){.bm-pulse{animation:none;stroke-dasharray:none;opacity:.5}}`,
  html:`<div class="stage tight"><div class="bm">
  <svg viewBox="0 0 760 300" aria-hidden="true">
    <path class="bm-line" d="M120 60 C 300 60, 300 150, 380 150"/><path class="bm-pulse" d="M120 60 C 300 60, 300 150, 380 150"/>
    <path class="bm-line" d="M120 150 L 380 150"/><path class="bm-pulse d2" d="M120 150 L 380 150"/>
    <path class="bm-line" d="M120 240 C 300 240, 300 150, 380 150"/><path class="bm-pulse d3" d="M120 240 C 300 240, 300 150, 380 150"/>
    <path class="bm-line" d="M380 150 L 640 150"/><path class="bm-pulse d2" d="M380 150 L 640 150"/>
  </svg>
  <div class="bm-node" style="left:15.8%;top:20%">טופס</div>
  <div class="bm-node" style="left:15.8%;top:50%">וואטסאפ</div>
  <div class="bm-node" style="left:15.8%;top:80%">טלפון</div>
  <div class="bm-node hub" style="left:50%;top:50%">CRM</div>
  <div class="bm-node" style="left:84.2%;top:50%">נציג</div>
</div></div>`
},
{
  id:"b57", cat:"behavior", name:"גריד Masonry עם כניסה מונפשת", tech:"vanilla JS · CSS", status:"ממתין",
  desc:"פריטים בגבהים שונים נארזים בעמודות בלי חורים, נכנסים מלמטה בסטאגר, ומסתדרים מחדש בחלקות כשהחלון משתנה. RTL: העמודה הראשונה מימין.",
  when:"גלריות ובלוגים עם תמונות בגבהים שונים, תיק עבודות, פיד. כשהגבהים אחידים גריד רגיל עדיף.",
  note:"מקור: ReactBits Masonry (GSAP). נכתב מחדש בלי ספרייה: JS מחשב מיקום לכל פריט ומזיז ב-transform בלבד, כך שה-reflow לא נוגע ב-layout. ResizeObserver מסדר מחדש.",
  libs:[],
  css:`.ms{position:relative;max-width:1100px;margin-inline:auto}
.ms-item{position:absolute;top:0;right:0;width:var(--w);opacity:0;translate:0 40px;transition:transform .6s cubic-bezier(.2,.6,.2,1),opacity .6s,translate .6s cubic-bezier(.2,.6,.2,1);transition-delay:var(--d,0s)}
.ms.ready .ms-item{opacity:1;translate:0 0}
.ms-item .ph{width:100%;height:var(--h);border-radius:var(--r);font-size:22px}
.ms-item.ph-l{background:none}
@media (hover:hover) and (pointer:fine){.ms-item .ph{transition:transform .5s cubic-bezier(.2,.6,.2,1)}.ms-item:hover .ph{transform:scale(1.03)}}
@media (prefers-reduced-motion: reduce){.ms-item{transition:none}}`,
  html:`<div class="stage tight"><div class="ms">
  <div class="ms-item" style="--h:220px"><div class="ph ph-a">1</div></div><div class="ms-item" style="--h:320px"><div class="ph ph-b">2</div></div>
  <div class="ms-item" style="--h:180px"><div class="ph ph-c">3</div></div><div class="ms-item" style="--h:260px"><div class="ph ph-d">4</div></div>
  <div class="ms-item" style="--h:340px"><div class="ph ph-e">5</div></div><div class="ms-item" style="--h:200px"><div class="ph ph-a">6</div></div>
  <div class="ms-item" style="--h:280px"><div class="ph ph-b">7</div></div><div class="ms-item" style="--h:240px"><div class="ph ph-c">8</div></div>
  <div class="ms-item" style="--h:300px"><div class="ph ph-d">9</div></div>
</div></div>`,
  js:`(function(){
  const grid=document.querySelector(".ms"),items=[...grid.querySelectorAll(".ms-item")],GAP=16;
  function layout(){
    const W=grid.clientWidth,cols=W<560?1:W<900?2:3,w=(W-GAP*(cols-1))/cols,tops=new Array(cols).fill(0);
    items.forEach((it,i)=>{
      const c=tops.indexOf(Math.min(...tops)),h=parseFloat(getComputedStyle(it).getPropertyValue("--h"));
      it.style.setProperty("--w",w+"px");
      // RTL: העמודה 0 מימין, לכן מזיזים שמאלה (ערך שלילי)
      it.style.transform="translate("+(-(c*(w+GAP)))+"px,"+tops[c]+"px)";
      it.style.setProperty("--d",(i*70)+"ms");
      tops[c]+=h+GAP;
    });
    grid.style.height=Math.max(...tops)-GAP+"px";
  }
  layout();requestAnimationFrame(()=>grid.classList.add("ready"));
  new ResizeObserver(()=>layout()).observe(grid);
})();`
},
{
  id:"b58", cat:"behavior", name:"דוק אייקונים שמתנפחים ליד הסמן", tech:"vanilla JS · CSS", status:"ממתין", runway:false,
  desc:"שורת אייקונים שכל אחד מהם גדל ככל שהסמן קרוב אליו, והשכנים גדלים פחות. בדיוק כמו הדוק של מק. במגע הכל נשאר בגודל אחיד.",
  when:"ניווט צף בתחתית המסך באתרי פורטפוליו ומוצר, סרגל כלים, קישורים חברתיים. דסקטופ בלבד, במובייל זה סרגל רגיל.",
  note:"מקור: MagicUI Dock. נכתב מחדש: המרחק מהסמן נמדד ב-mousemove, וכל אייקון מקבל scale לפי עקומה, על transform בלבד. הרוחב לא משתנה, לכן השכנים לא קופצים.",
  libs:[],
  css:`.dk-wrap{display:flex;justify-content:center;padding-block:60px 30px}
.dk{display:flex;align-items:flex-end;gap:10px;padding:10px 14px;border-radius:22px;background:var(--card);border:1px solid var(--line);box-shadow:0 18px 50px rgba(0,0,0,.12)}
.dk a{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;background:var(--bg);color:var(--ink);font-weight:700;font-size:12px;text-decoration:none;
  transform-origin:bottom center;transform:scale(var(--s,1));transition:transform .18s cubic-bezier(.2,.6,.2,1);position:relative}
.dk a::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 10px);left:50%;translate:-50% 4px;background:var(--ink);color:var(--bg);font-size:12px;padding:5px 9px;border-radius:8px;white-space:nowrap;opacity:0;transition:opacity .2s,translate .2s;pointer-events:none}
@media (hover:hover) and (pointer:fine){.dk a:hover::after{opacity:1;translate:-50% 0}}
.dk a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (prefers-reduced-motion: reduce){.dk a{transition:none}}`,
  html:`<div class="stage tight"><div class="dk-wrap"><nav class="dk" aria-label="ניווט מהיר">
  <a href="#" data-tip="בית">בית</a><a href="#" data-tip="עבודות">עבודות</a><a href="#" data-tip="שירותים">שירות</a><a href="#" data-tip="בלוג">בלוג</a><a href="#" data-tip="אודות">אודות</a><a href="#" data-tip="צור קשר">קשר</a>
</nav></div></div>`,
  js:`(function(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
  const dock=document.querySelector(".dk"),icons=[...dock.querySelectorAll("a")],RANGE=140,MAX=1.7;
  function paint(x){
    icons.forEach(a=>{
      const r=a.getBoundingClientRect(),d=Math.abs(x-(r.left+r.width/2));
      const s=d>RANGE?1:1+(MAX-1)*Math.cos((d/RANGE)*Math.PI/2);   // קוסינוס: רך במרכז, מתאפס בקצה הטווח
      a.style.setProperty("--s",s.toFixed(3));
    });
  }
  dock.addEventListener("mousemove",e=>paint(e.clientX));
  dock.addEventListener("mouseleave",()=>icons.forEach(a=>a.style.setProperty("--s",1)));
})();`
},
{
  id:"b59", cat:"behavior", name:"רשימה חיה שפריטים נכנסים אליה", tech:"vanilla JS · FLIP", status:"ממתין", runway:false,
  desc:"פריט חדש נכנס לראש הרשימה בקפיצה קטנה, והקודמים נדחפים למטה בחלקות במקום לקפוץ. הרשימה מרגישה כמו פיד חי.",
  when:"פיד התראות, הדגמת מערכת שעובדת, לוג פעילות, \"מה קרה היום\". מקסימום חמישה פריטים גלויים.",
  note:"מקור: MagicUI AnimatedList. נכתב מחדש עם FLIP ידני: מודדים מיקום לפני ואחרי ההוספה ומזיזים ב-transform. הישנים נגזרים מלמטה, לא נמחקים בבת אחת.",
  libs:[],
  css:`.al{max-width:440px;margin-inline:auto;display:flex;flex-direction:column;gap:12px;height:380px;overflow:hidden;
  mask-image:linear-gradient(180deg,#000 70%,transparent);-webkit-mask-image:linear-gradient(180deg,#000 70%,transparent)}
.al-item{display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 16px;box-shadow:0 6px 20px rgba(0,0,0,.06);will-change:transform}
.al-item.enter{animation:al-in .55s cubic-bezier(.2,.6,.2,1) both}
@keyframes al-in{from{opacity:0;transform:scale(.92) translateY(-10px)}}
.al-ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;color:#fff;font-weight:800;flex:none}
.al-t{display:flex;flex-direction:column;gap:2px;min-width:0}
.al-t b{font-size:15px}.al-t span{font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.al-time{margin-inline-start:auto;font-size:12px;color:var(--muted);flex:none}
@media (prefers-reduced-motion: reduce){.al-item.enter{animation:none}}`,
  html:`<div class="stage tight"><div class="al" aria-live="polite"></div></div>`,
  js:`(function(){
  const list=document.querySelector(".al"),reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const feed=[["ליד חדש","דנה מחיפה השאירה פרטים בטופס","ph-a"],["תשלום התקבל","חשבונית 2041 שולמה","ph-d"],["פגישה נקבעה","יום שלישי 10:00 עם רועי","ph-b"],["הודעת וואטסאפ","\\"אפשר הצעת מחיר?\\"","ph-c"],["ביקור חוזר","לקוח מ-2024 חזר לעמוד המחירים","ph-e"]];
  let i=0;
  function add(){
    const [t,s,c]=feed[i++%feed.length];
    const before=new Map([...list.children].map(el=>[el,el.getBoundingClientRect().top]));
    const el=document.createElement("div");el.className="al-item enter";
    el.innerHTML='<span class="al-ic '+c+'">'+t[0]+'</span><div class="al-t"><b>'+t+'</b><span>'+s+'</span></div><span class="al-time">עכשיו</span>';
    list.prepend(el);
    if(!reduce){before.forEach((top,node)=>{const d=top-node.getBoundingClientRect().top;if(!d)return;
      node.animate([{transform:"translateY("+d+"px)"},{transform:"none"}],{duration:500,easing:"cubic-bezier(.2,.6,.2,1)"});});}
    [...list.children].slice(6).forEach(n=>n.remove());
    el.addEventListener("animationend",()=>el.classList.remove("enter"),{once:true});
  }
  add();add();add();
  setInterval(add,2200);
})();`
},
{
  id:"b60", cat:"behavior", name:"וידאו שנפתח מתמונת ההירו", tech:"vanilla JS · FLIP", status:"ממתין", runway:false,
  desc:"תמונת פתיחה עם כפתור נגן. בלחיצה היא גדלה למודאל וידאו במעבר רציף מהמקום שלה, ובסגירה חוזרת אליו. הוידאו נטען רק בלחיצה.",
  when:"הירו עם סרטון תדמית. הדרך הנכונה לשים וידאו בלי להכביד על הטעינה הראשונה.",
  note:"מקור: MagicUI HeroVideoDialog. נכתב מחדש: FLIP מהמלבן של התמונה למלבן המודאל על transform בלבד, Esc ולחיצה על הרקע סוגרים, הפוקוס חוזר לכפתור.",
  libs:[],
  css:`.hv{max-width:900px;margin-inline:auto}
.hv-thumb{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;border-radius:var(--r);overflow:hidden;cursor:pointer;background:none;font:inherit}
.hv-thumb .ph{position:absolute;inset:0;font-size:18px;border-radius:0;align-items:flex-end;justify-content:flex-start;padding:22px}
.hv-play{position:absolute;inset:0;display:grid;place-items:center}
.hv-play span{width:84px;height:84px;border-radius:50%;background:rgba(255,255,255,.92);display:grid;place-items:center;color:var(--ink);font-size:26px;box-shadow:0 12px 40px rgba(0,0,0,.25);transition:transform .35s cubic-bezier(.2,.6,.2,1)}
@media (hover:hover) and (pointer:fine){.hv-thumb:hover .hv-play span{transform:scale(1.08)}}
.hv-thumb:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
.hv-modal{position:fixed;inset:0;z-index:50;display:none;place-items:center;padding:24px;background:rgba(10,10,20,0);transition:background-color .4s}
.hv-modal.on{display:grid}.hv-modal.in{background:rgba(10,10,20,.82)}
.hv-frame{width:min(1100px,100%);aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;background:#000;transform-origin:top left;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.hv-frame video{width:100%;height:100%;display:block;object-fit:cover}
.hv-close{position:absolute;top:18px;inset-inline-end:18px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:20px;cursor:pointer;opacity:0;transition:opacity .3s .2s}
.hv-modal.in .hv-close{opacity:1}
.hv-close:focus-visible{outline:2px solid #fff}`,
  html:`<div class="stage tight"><div class="hv">
  <button class="hv-thumb" aria-label="נגן סרטון תדמית"><div class="ph ph-b">סרטון תדמית</div><div class="hv-play"><span>▶</span></div></button>
</div>
<div class="hv-modal" role="dialog" aria-modal="true" aria-label="סרטון תדמית">
  <div class="hv-frame"><video data-src="../assets/media/demo-a.mp4" playsinline controls muted></video></div>
  <button class="hv-close" aria-label="סגור">✕</button>
</div></div>`,
  js:`(function(){
  const btn=document.querySelector(".hv-thumb"),modal=document.querySelector(".hv-modal"),frame=modal.querySelector(".hv-frame"),video=frame.querySelector("video"),close=modal.querySelector(".hv-close");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,E="cubic-bezier(.2,.6,.2,1)";
  function open(){
    if(!video.src)video.src=video.dataset.src;
    const a=btn.getBoundingClientRect();modal.classList.add("on");
    const b=frame.getBoundingClientRect();
    if(!reduce){frame.animate([{transform:"translate("+(a.left-b.left)+"px,"+(a.top-b.top)+"px) scale("+(a.width/b.width)+","+(a.height/b.height)+")"},{transform:"none"}],{duration:520,easing:E});}
    requestAnimationFrame(()=>modal.classList.add("in"));
    video.play().catch(()=>{});close.focus();
    document.addEventListener("keydown",onKey);
  }
  function shut(){
    video.pause();modal.classList.remove("in");
    const a=btn.getBoundingClientRect(),b=frame.getBoundingClientRect();
    const anim=reduce?null:frame.animate([{transform:"none"},{transform:"translate("+(a.left-b.left)+"px,"+(a.top-b.top)+"px) scale("+(a.width/b.width)+","+(a.height/b.height)+")"}],{duration:420,easing:E});
    (anim?anim.finished:Promise.resolve()).then(()=>{modal.classList.remove("on");btn.focus();});
    document.removeEventListener("keydown",onKey);
  }
  function onKey(e){if(e.key==="Escape")shut();}
  btn.addEventListener("click",open);close.addEventListener("click",shut);
  modal.addEventListener("click",e=>{if(e.target===modal)shut();});
})();`
},
{
  id:"b61", cat:"behavior", name:"משיכה מגנטית לעבר הסמן", tech:"vanilla JS", status:"ממתין", runway:false,
  desc:"כפתור שנמשך בעדינות לעבר הסמן כשהוא מתקרב, וחוזר למקומו כשהסמן מתרחק. תזוזה של כמה פיקסלים, מספיק כדי להרגיש שהכפתור \"רוצה\" שילחצו עליו.",
  when:"CTA ראשי אחד בעמוד, אייקונים חברתיים, לוגו בהדר. דסקטופ בלבד, ולעולם לא על טקסט רץ.",
  note:"מקור: ReactBits Magnet. נכתב מחדש: המרחק נמדד מהמרכז, המשיכה היא שבר מהמרחק (לא מיקום מוחלט), על translate בלבד, וחזרה עם טרנזישן ארוך יותר מהמשיכה.",
  libs:[],
  css:`.mg-wrap{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;padding-block:40px}
.mg{position:relative;padding:40px}
.mg .gbtn,.mg .mg-ic{translate:var(--x,0) var(--y,0);transition:translate .25s cubic-bezier(.2,.6,.2,1)}
.mg.leave .gbtn,.mg.leave .mg-ic{transition-duration:.6s}
.mg-ic{width:56px;height:56px;border-radius:50%;background:var(--card);border:1px solid var(--line);display:grid;place-items:center;font-weight:700;color:var(--ink)}
@media (prefers-reduced-motion: reduce){.mg .gbtn,.mg .mg-ic{transition:none;translate:none}}`,
  html:`<div class="stage tight"><div class="mg-wrap">
  <div class="mg"><button class="gbtn">בואו נדבר</button></div>
  <div class="mg"><span class="mg-ic">in</span></div>
  <div class="mg"><span class="mg-ic">ig</span></div>
</div></div>`,
  js:`(function(){
  if(!matchMedia("(hover:hover) and (pointer:fine)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const PULL=.35;   // כמה מהמרחק הכפתור עובר לעבר הסמן. 1 = דבוק לסמן, זה כבר לא אלגנטי
  document.querySelectorAll(".mg").forEach(zone=>{
    const el=zone.firstElementChild;
    zone.addEventListener("mousemove",e=>{
      const r=zone.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
      zone.classList.remove("leave");
      el.style.setProperty("--x",(dx*PULL).toFixed(1)+"px");el.style.setProperty("--y",(dy*PULL).toFixed(1)+"px");
    });
    zone.addEventListener("mouseleave",()=>{zone.classList.add("leave");el.style.setProperty("--x","0px");el.style.setProperty("--y","0px");});
  });
})();`
},
{
  id:"b62", cat:"behavior", name:"קרוסלת עומק תלת-ממדית", tech:"GSAP · pointer", status:"ממתין", runway:false,
  desc:"כרטיסים על מסילה תלת-ממדית: הפעיל קדימה ובגודל מלא, השאר נסוגים לעומק ומתכהים. גרירה, חיצים, מקלדת ואוטו-פליי שנעצר במגע.",
  when:"תיק עבודות, מוצרים נבחרים, סיפורי לקוח. שלושה עד שבעה פריטים, כשרוצים נוכחות קולנועית בלי גריד.",
  note:"מקור: ReactBits DepthCarousel (GSAP). נכתב מחדש בלי ספריית גרירה: pointer events עם סף 40px, וכל כרטיס מקבל translateZ/x/opacity לפי המרחק מהפעיל. RTL: החץ הימני מוביל אחורה ומקש ArrowRight גם. במובייל הפרספקטיבה קטנה והכרטיסים צרים יותר כדי שהשכנים יציצו.",
  libs:["gsap"],
  css:`.dc{position:relative;height:clamp(360px,52vh,520px);perspective:1200px;overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
.dc.drag{cursor:grabbing}
.dc-track{position:absolute;inset:0;transform-style:preserve-3d}
.dc-card{position:absolute;top:50%;left:50%;width:min(62vw,520px);aspect-ratio:16/10;margin:calc(min(62vw,520px) * -0.3125) 0 0 calc(min(62vw,520px) * -0.5);border-radius:var(--r);overflow:hidden;will-change:transform,opacity;box-shadow:0 30px 70px rgba(0,0,0,.25)}
.dc-card .ph{position:absolute;inset:0;border-radius:0;font-size:22px}
.dc-cap{position:absolute;inset-inline:0;bottom:0;padding:16px 18px;background:linear-gradient(transparent,rgba(0,0,0,.55));color:#fff;font-weight:600;font-size:15px}
.dc-nav{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:18px}
.dc-btn{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:18px;cursor:pointer;display:grid;place-items:center}
.dc-btn:hover{border-color:var(--ink)}
.dc-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.dc-dots{display:flex;gap:6px}
.dc-dots i{width:6px;height:6px;border-radius:50%;background:var(--line);transition:transform .3s cubic-bezier(.2,.6,.2,1),background-color .3s}
.dc-dots i.on{background:var(--accent);transform:scale(1.5)}
@media(max-width:767px){.dc{perspective:800px;height:min(60vh,420px)}.dc-card{width:74vw;margin:calc(74vw * -0.3125) 0 0 calc(74vw * -0.5)}}
@media (prefers-reduced-motion: reduce){.dc-dots i{transition:none}}`,
  html:`<div class="stage tight">
<div class="dc" aria-roledescription="carousel" aria-label="פרויקטים נבחרים" tabindex="0">
  <div class="dc-track">
    <figure class="dc-card"><div class="ph ph-a">1</div><figcaption class="dc-cap">קליניקה פרטית, אתר תדמית</figcaption></figure>
    <figure class="dc-card"><div class="ph ph-b">2</div><figcaption class="dc-cap">חנות אונליין, 2,000 מוצרים</figcaption></figure>
    <figure class="dc-card"><div class="ph ph-c">3</div><figcaption class="dc-cap">משרד עורכי דין, שלוש שפות</figcaption></figure>
    <figure class="dc-card"><div class="ph ph-d">4</div><figcaption class="dc-cap">מערכת CRM לסוכנות</figcaption></figure>
    <figure class="dc-card"><div class="ph ph-e">5</div><figcaption class="dc-cap">דף נחיתה לקורס</figcaption></figure>
  </div>
</div>
<div class="dc-nav"><button class="dc-btn dc-prev" aria-label="הקודם">→</button><div class="dc-dots" aria-hidden="true"></div><button class="dc-btn dc-next" aria-label="הבא">←</button></div>
</div>`,
  js:`(function(){
  const root=document.querySelector(".dc"),cards=[...root.querySelectorAll(".dc-card")],dots=document.querySelector(".dc-dots"),n=cards.length;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,mob=matchMedia("(max-width:767px)").matches;
  const GAP=mob?.28:.34;   // כמה מהרוחב זז כל כרטיס הצידה; קטן במובייל כדי שהשכנים יציצו
  let cur=0,timer=null;
  cards.forEach(()=>dots.appendChild(document.createElement("i")));
  function layout(animate){
    const w=cards[0].offsetWidth;
    cards.forEach((c,i)=>{
      let off=i-cur; if(off>n/2)off-=n; if(off<-n/2)off+=n;      // מסילה מעגלית: הקצר מבין שני הכיוונים
      const depth=Math.abs(off);
      // RTL: הבא נמצא משמאל, לכן ההיסט האופקי הפוך
      gsap.to(c,{x:-off*w*GAP,z:-depth*220,opacity:depth>2?0:1-depth*.28,scale:1-depth*.06,zIndex:n-depth,duration:animate&&!reduce?.7:0,ease:"power3.out",overwrite:true});
      c.setAttribute("aria-hidden",off!==0);
    });
    [...dots.children].forEach((d,i)=>d.classList.toggle("on",i===cur));
  }
  function go(step){cur=(cur+step+n)%n;layout(true);restart();}
  function restart(){clearInterval(timer);if(!reduce)timer=setInterval(()=>go(1),3800);}
  document.querySelector(".dc-next").addEventListener("click",()=>go(1));
  document.querySelector(".dc-prev").addEventListener("click",()=>go(-1));
  // מקלדת: בעברית חץ שמאלה = הבא
  root.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")go(1);if(e.key==="ArrowRight")go(-1);});
  // גרירה עם סף, בלי ספרייה
  let x0=null;
  root.addEventListener("pointerdown",e=>{x0=e.clientX;root.classList.add("drag");root.setPointerCapture(e.pointerId);clearInterval(timer);});
  root.addEventListener("pointerup",e=>{if(x0===null)return;const dx=e.clientX-x0;x0=null;root.classList.remove("drag");if(Math.abs(dx)>40)go(dx<0?1:-1);else restart();});
  root.addEventListener("pointercancel",()=>{x0=null;root.classList.remove("drag");restart();});
  root.addEventListener("mouseenter",()=>clearInterval(timer));root.addEventListener("mouseleave",restart);
  layout(false);restart();
  addEventListener("resize",()=>layout(false));
})();`
},
];
