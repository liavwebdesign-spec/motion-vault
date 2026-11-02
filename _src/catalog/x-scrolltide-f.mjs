// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה ו (משפחה 6): טבעות וחללים בתלת ממד מתמונות אמיתיות. CSS 3D עם מנוע קטן אחד, בלי ספרייה.
// בלי JS או בהפחתת תנועה נשאר גריד תמונות רגיל: המחלקה is-on היא שמדליקה את התלת ממד.

import { FX, R, COLS } from "./x-scrolltide-c.mjs";

const E = "cubic-bezier(.2,.6,.2,1)";
const H1 = "margin:0;font-size:clamp(34px,4.4vw,64px);font-weight:800;line-height:1.05;letter-spacing:-.015em;text-wrap:balance";
const L = "../assets/media/luma/";

const RCOMMON = "**המנוע:** CSS 3D ו-JS קטן בלי ספרייה. רק הטרנספורם משתנה, ולכן זה רץ חלק גם בלי כרטיס מסך חזק, ואפשר יותר ממהלך אחד כזה בעמוד. **ביצועים:** עוצר מחוץ למסך. **טלפון:** פחות תמונות, אותה תנועה. **הפחתת תנועה ובלי JS:** גריד תמונות רגיל, הכול קריא.";

// המנוע: מקום לכל תמונה לפי p ו-q. p מגיע מגלילה (range) או מגרירה (drag) עם תנופה וסיבוב לבד (auto).
const R3 = `function mod(v,n){return((v%n)+n)%n;}
function ss(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
function mv3(root,o){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  const view=root.querySelector("[data-view]"),scene=root.querySelector("[data-scene]"),all=[...root.querySelectorAll("[data-i]")];
  const phone=innerWidth<800,items=phone&&o.phoneN?all.slice(0,o.phoneN):all;
  all.slice(items.length).forEach(e=>e.remove());
  root.classList.add("is-on");
  const a={N:items.length,items,root,view,scene,phone,p:o.p0||0,q:o.q0||0,t:0,mx:0,my:0,w:1,h:1};
  let tp=a.p,tq=a.q,vp=0,vq=0,dn=false,lx=0,ly=0,last=0,idle=0,raf=0,seen=false,mxT=0,myT=0,first=true;
  const ease=o.ease||.09;
  function sp(){const r=root.getBoundingClientRect(),d=r.height-innerHeight;return d>0?Math.min(1,Math.max(0,-r.top/d)):0;}
  function size(){a.w=view.clientWidth||1;a.h=view.clientHeight||1;if(o.size)o.size(a);kick();}
  function frame(now){raf=0;if(!seen)return;
    const dt=Math.min(.05,last?(now-last)/1000:.016);last=now;a.t+=dt;
    if(o.range){const g=o.range(a);tp=g[0]+(g[1]-g[0])*sp();if(first){a.p=tp;first=false;}}
    if(o.drag&&!dn){tp+=vp;tq+=vq;vp*=.94;vq*=.94;if(idle>0)idle-=dt;else if(o.auto)tp+=o.auto*dt;}
    if(o.qMax)tq=Math.max(-o.qMax,Math.min(o.qMax,tq));
    a.p+=(tp-a.p)*ease;a.q+=(tq-a.q)*ease;a.mx+=(mxT-a.mx)*.06;a.my+=(myT-a.my)*.06;
    if(o.frame)o.frame(a);
    for(let i=0;i<a.N;i++)o.place(items[i],i,a);
    if(o.auto||o.always||dn||Math.abs(tp-a.p)>.0004||Math.abs(vp)>.00005||Math.abs(mxT-a.mx)>.002||Math.abs(myT-a.my)>.002)raf=requestAnimationFrame(frame);}
  function kick(){if(!raf&&seen){last=0;raf=requestAnimationFrame(frame);}}
  new IntersectionObserver(([e])=>{seen=e.isIntersecting;if(seen)kick();},{rootMargin:"120px"}).observe(root);
  new ResizeObserver(size).observe(view);
  addEventListener("scroll",kick,{passive:true});
  root.addEventListener("pointermove",e=>{const r=view.getBoundingClientRect();mxT=((e.clientX-r.left)/r.width-.5)*2;myT=((e.clientY-r.top)/r.height-.5)*2;kick();});
  if(o.drag){
    view.addEventListener("pointerdown",e=>{dn=true;lx=e.clientX;ly=e.clientY;vp=vq=0;view.style.cursor="grabbing";try{view.setPointerCapture(e.pointerId);}catch(_){}kick();});
    view.addEventListener("pointermove",e=>{if(!dn)return;const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;vp=dx*o.drag;tp+=vp;if(o.dragQ){vq=dy*o.dragQ;tq+=vq;}});
    const up=()=>{dn=false;idle=1.4;view.style.cursor="";kick();};
    view.addEventListener("pointerup",up);view.addEventListener("pointercancel",up);
  }
  size();
}`;

// שם ← [נתיב, רוחב, גובה, תיאור]
const P = {
  bench:["s01/bench-hands",1500,1000,"ידיים מנקות מצלמה במברשת"], dial:["s01/hero-dial",1900,1267,"אצבעות מסובבות חוגה של מצלמה"], neg:["s01/negatives",1400,933,"רצועות נגטיב של פילם"], street:["s01/street-light",1700,1138,"רחוב אבן בשקיעה"],
  ddial:["s02/dial-detail",1600,1067,"חוגת טמפרטורה לבנה בתקריב"], panel:["s02/hero-panel",2200,1468,"אישה מחייכת נוגעת בלוח קיר"], night:["s02/night-room",2000,1333,"חדר שינה בהיר"],
  monster:["s04/hero-monster",1200,1500,"מפלצת פלסטלינה בטורקיז"], trio:["s04/trio",1200,1500,"שלוש דמויות פלסטלינה"], tusk:["s04/tusk",900,1125,"דמות פלסטלינה על רקע ורוד"],
  dancers:["s06/dancers",1500,1212,"חברים רוקדים בפסטיבל"], food:["s06/food",1300,1000,"ילד מקבל מנה מדוכן"], hands:["s06/hands",2560,1400,"ידיים מורמות מול השמש"], hug:["s06/hug",1500,1100,"שתי חברות מתחבקות בפסטיבל"], singer:["s06/singer",1800,1012,"זמרת על במה"],
  posters:["s07/hero-posters",1100,1375,"כרזות דפוס בשחור לבן"], ink:["s07/ink-hands",1000,1000,"ידיים פורשות דיו כתום"], paper:["s07/paper-stack",1100,1100,"יד על ערימת נייר"], type:["s07/band-type",2560,1000,"אותיות עופרת"],
  wall:["s10/wallbox",1000,1500,"עמדת טעינה על קיר"],
  bowls:["s11/bowls",1100,1650,"קערות גלידה"], cones:["s11/cones-yellow",1400,1050,"שלושה גביעי גלידה על צהוב"], scoops:["s11/hero-scoops",1400,1750,"כדורי גלידה על ורוד"], magenta:["s11/magenta-cone",1000,1000,"גביע מג'נטה על רקע דו-צבעי"],
  camp:["s12/dusk-camp",1000,1000,"קרוואן בשדה עם דמדומים"], window:["s12/hero-window",1100,1100,"שלושה חברים בחלון קרוואן"], thermos:["s12/thermos",900,1200,"מוזגים קפה מתרמוס"], van:["s12/van-door",1000,1200,"חברים בדלת קרוואן"],
  light:["s13/hero",2560,1435,"אור שקיעה על קיר כהה"], proja:["s13/proj-a",1800,1200,"סלון כהה עם חלון גדול"], projb:["s13/proj-b",1200,1600,"פינה כהה עם מראה ועציץ"], projc:["s13/proj-c",2400,1026,"מטבח פתוח בגוון כהה"], room:["s13/room",2200,1469,"חדר קריאה עם ספריה מוארת"],
  baker:["s14/baker-hands",1100,1320,"אופה לש כיכר"], cafe:["s14/cafe-window",1400,1050,"בית קפה מואר מהחלון"], croiss:["s14/croissants",1250,1000,"קרואסונים וספל קפה"], bread:["s14/hero-bread",1600,1333,"כיכרות לחם על עץ"],
  flute:["s15/flute",1000,1250,"גביע שמפניה"], glass:["s15/hero-glass",1100,1375,"כוס קוקטייל על שולחן שיש"], marble:["s15/marble",1600,1000,"שיש אדום כהה"], pour:["s15/pour",1000,1250,"ברמנית מוזגת לכוס"], bar:["s15/room",1100,1320,"בר עם תאורה חמה"],
  gl:["s08/glass",2560,1440,"בניין זכוכית כחול מלמטה"], sky:["s08/hero",2560,1707,"שמיים בפסים כתומים וכחולים"], sea:["s08/sea",2560,1706,"שמש נמוכה מעל ים כהה"],
};
const IMG = (k) => { const [s, w, h, a] = P[k]; return `<img src="${R}${s}.webp" width="${w}" height="${h}" alt="${a}" loading="lazy" decoding="async" draggable="false">`; };
const TILES = (c, keys) => keys.map((k) => `<figure class="${c}-i" data-i>${IMG(k)}</figure>`).join("");

const BASE = (c, o) => `.${c}{position:relative}
.${c}-s{display:grid;gap:clamp(24px,3vw,48px);padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px)}
.${c}-t{display:grid;gap:16px;justify-items:start}
.${c}-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent)}
.${c}-t h2{${H1}}
.${c}-t p:not(.${c}-k){margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.${c}-cta{display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:700;text-decoration:none}
.${c}-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.${c}-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:16px}
.${c}-i{margin:0}
.${c}-i img{display:block;width:100%;height:auto;aspect-ratio:${o.ar};object-fit:cover;border-radius:12px}
.${c}.is-on .${c}-s{overflow-x:clip}
.${c}.is-on .${c}-v{position:relative;perspective:${o.persp}${o.vh ? `;height:${o.vh}` : ""}${o.drag ? ";cursor:grab;touch-action:pan-y;user-select:none" : ""}}
.${c}.is-on .${c}-g{display:block;position:absolute;inset:0;transform-style:preserve-3d}
.${c}.is-on .${c}-i{position:absolute;inset:0;margin:auto;height:fit-content;width:${o.tw}}
`;

const RG = (o) => ({
  id:o.id, cat:"behavior", name:o.name, tech:o.tech, status:"ממתין", runway:false,
  desc:o.desc, when:o.when,
  note:`**שחזור.** השראה: Scrolltide (1.11.2026), ${o.insp}. נבנה מאפס. **במה זה שונה ממה שיש:** ${o.diff} **הבנייה:** ${o.how} ${RCOMMON}`,
  libs:[],
  css:BASE(o.cls, o) + o.css,
  html:`<div class="stage"><section class="${o.cls}" data-${o.cls}><div class="${o.cls}-s">
  <div class="${o.cls}-t">
    <p class="${o.cls}-k">${o.k}</p>
    <h2>${o.h}</h2>
    <p>${o.p}</p>
    ${o.cta ? `<a class="${o.cls}-cta" href="#">${o.cta}</a>` : ""}${o.inText || ""}
  </div>
  <div class="${o.cls}-v" data-view><div class="${o.cls}-g" data-scene>${o.tiles}</div>${o.inView || ""}</div>${o.after || ""}
</div></section></div>`,
  js:`(function(){
${R3}
${o.pre || ""}mv3(document.querySelector("[data-${o.cls}]"),${o.opts});
})();`,
});

export default [

RG({
  id:"b141", cls:"hx", name:"סליל תמונות שהגלילה יורדת לאורכו", tech:"CSS 3D · גלילה מוצמדת",
  insp:"סליל תמונות שנוסעים לאורכו",
  desc:"עשרים תמונות יושבות על סליל אחד שעולה מלמטה למעלה. הטקסט נשאר במקום, והגלילה מסובבת את הסליל ומורידה את המבט לאורכו, כך שכל תמונה מגיעה מלפנים ועוברת אחורה ונעלמת.",
  when:"תיק עבודות או גלריה של מעצב, אדריכל או צלם עם הרבה עבודות חזקות, כשרוצים לתת תחושת כמות בלי גריד. מתי לא: מעט עבודות (חוזרות על עצמן), או עמוד שצריך לקרוא בו כל פריט, כי התמונות חולפות.",
  diff:"g57 הוא גלגל שטוח ענק, רובו מחוץ למסך, ו-b112 טבעת אחת של חמש תמונות עם המלצות. כאן התמונות מסודרות לעומק וגם לגובה, יש כמה קומות במסך בבת אחת, והגלילה מתקדמת בפועל לאורך הסליל.",
  how:"כל תמונה מקבלת זווית וגובה לפי המספר שלה, וההתקדמות מזיזה את שניהם יחד. שקיפות יורדת לפי המרחק מהמרכז ולפי הצד האחורי.",
  k:"אדריכלות פנים", h:"עשרים חללים, סיבוב אחד", p:"דירות, ברים ומטבחים שעיצבנו בעשור האחרון, בסדר שבו הם נבנו.", cta:"לכל הפרויקטים",
  ar:"4/3", persp:"1100px", tw:"clamp(132px,17vw,260px)",
  tiles:TILES("hx", ["proja","room","projc","bar","projb","light","cafe","glass","night","proja","projc","room","bar","projb","cafe","light","glass","night","proja","room"]),
  css:`.hx.is-on{height:420vh}
.hx.is-on .hx-s{position:sticky;top:0;height:100vh;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);align-items:center;padding-block:0;overflow:clip}
.hx.is-on .hx-v{height:100%}
@media(max-width:800px){.hx.is-on .hx-s{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);padding-block:24px 0}.hx.is-on .hx-t p:not(.hx-k){display:none}}`,
  opts:`{phoneN:14,ease:.1,
range:function(a){return [1.6,(a.N-3)*.8];},
size:function(a){a.R=Math.min(a.w*.36,a.h*.46,340);a.th=a.items[0].offsetHeight||160;},
frame:function(a){a.scene.style.transform="rotateX("+(-5-a.my*3)+"deg) rotateY("+a.mx*5+"deg)";},
place:function(e,i,a){const th=i*.8-a.p,y=(i-a.p/.8)*a.th*.3,off=Math.abs(y)/(a.h*.52);
e.style.transform="translateY("+y.toFixed(1)+"px) rotateY("+th.toFixed(3)+"rad) translateZ("+a.R.toFixed(1)+"px)";
e.style.opacity=((1-ss(.7,1,off))*(.28+.72*ss(-.4,.5,Math.cos(th)))).toFixed(3);}}`,
}),

RG({
  id:"b142", cls:"dn", name:"שני גדילי תמונות שמתפתלים זה סביב זה", tech:"CSS 3D · גרירה עם תנופה",
  insp:"קרוסלה בצורת סליל כפול",
  desc:"שני גדילים של תמונות נעים לרוחב המסך ומתפתלים זה סביב זה כמו סליל כפול. כל תמונה עולה מלפנים, מתהפכת על הציר ונעלמת מאחור. נגרר הצידה עם תנופה, ובלי מגע ממשיך לזרום לאט.",
  when:"אירועים, פסטיבל, קהילה, או כל סיפור של שני צדדים שנפגשים (מוזיקה וקהל, שתי חברות, לפני ואחרי). מתי לא: תמונות שצריך לראות במלואן לאורך זמן, כי כל תמונה מתהפכת ולרגע נראית מהצד.",
  diff:"g272 הוא סליל מצויר עם קו סריקה, בלי תמונות, ו-b62 קרוסלה של גדיל אחד. כאן הגדילים הם התמונות עצמן, הם מתחלפים מי מלפנים ומי מאחור, והציר אופקי.",
  how:"לכל גדיל חצי סיבוב הפרש. המיקום לרוחב קובע את הזווית סביב הציר, והכול מתגלגל בלולאה אין סופית.",
  k:"קיץ 2027", h:"שלושה ימים, שתי במות", p:"מוזיקה עד הזריחה, אוכל מהדוכנים וקרוואנים בשדה.", cta:"לכרטיסים",
  ar:"5/4", persp:"1400px", tw:"clamp(150px,19vw,280px)", vh:"clamp(380px,64vh,640px)", drag:true,
  tiles:TILES("dn", ["dancers","singer","hug","camp","hands","window","food","van","thermos","singer","dancers","camp","window","hands","hug","food","van","thermos"]),
  css:`.dn-t{justify-items:center;text-align:center}
.dn-t p:not(.dn-k){text-align:center}`,
  opts:`{phoneN:12,drag:-.0065,auto:.32,
size:function(a){const t=a.items[0].offsetWidth||200;a.gap=t*1.03;a.tw=a.gap*1.5;a.A=Math.min(a.h*.27,t*.62);a.L=Math.floor(a.N/2)*a.gap;},
place:function(e,i,a){const s=i>>1,x=mod(s*a.gap-a.p*a.gap+a.L/2,a.L)-a.L/2,g=x/a.tw+(i&1?Math.PI:0),f=1-ss(a.L*.36,a.L*.5,Math.abs(x));
e.style.transform="translate3d("+x.toFixed(1)+"px,0,0) rotateX("+g.toFixed(3)+"rad) translateZ("+a.A.toFixed(1)+"px)";
e.style.opacity=(f*(.42+.58*ss(-.5,.4,Math.cos(g)))).toFixed(3);}}`,
}),

RG({
  id:"b143", cls:"wv", name:"סרט תמונות שגל עובר לאורכו", tech:"CSS 3D · גרירה עם תנופה",
  insp:"רצועת תמונות על גל",
  desc:"שורת תמונות צמודות שנראית כמו סרט גמיש אחד. גל עובר לאורכו בלי הפסקה ומקרב ומרחיק כל תמונה, והיא נוטה בדיוק לפי השיפוע שלו. נגרר הצידה עם תנופה, והעכבר למעלה ולמטה מגביה ומשטיח את הגל.",
  when:"מותג שמח וצבעוני, אוכל, צעצועים, אופנה, כשיש שורת מוצרים או קולקציה. מתי לא: מותג מדויק ורציני, או תמונות עם טקסט, כי התמונות נמתחות מעט בשיפוע.",
  diff:"g35 מניח טקסט על גל, g151 כרטיסים על קשת קבועה, ו-b42 מרקי ישר שרק מאיץ. כאן התמונות צמודות כמו סרט אחד, והגל חי כל הזמן גם כשלא נוגעים.",
  how:"הגובה מסינוס, והזווית מהנגזרת שלו, ולכן התמונה תמיד משיקה לגל. מתיחה קלה לרוחב סוגרת את הרווחים שנפתחים בשיפוע.",
  k:"קולקציית קיץ", h:"שתים עשרה סיבות לחזור מחר", p:"טעמים חדשים כל שבוע, ואף אחד מהם לא נשאר יותר מחודש.", cta:"לטעמים של השבוע",
  ar:"4/5", persp:"1300px", tw:"clamp(150px,17vw,280px)", vh:"clamp(380px,62vh,620px)", drag:true,
  tiles:TILES("wv", ["cones","trio","scoops","monster","magenta","bowls","tusk","cones","scoops","trio","magenta","monster"]),
  css:`.wv-t{justify-items:center;text-align:center}
.wv-t p:not(.wv-k){text-align:center}`,
  opts:`{phoneN:8,drag:-.0042,auto:.2,always:true,
size:function(a){a.sp=(a.items[0].offsetWidth||220)+2;a.L=a.N*a.sp;a.k=6.283/(a.sp*5.2);},
place:function(e,i,a){const x=mod(i*a.sp-a.p*a.sp+a.L/2,a.L)-a.L/2,ph=a.t*.7,A=Math.min(a.h*.3,a.sp*.62)*(1+.32*a.my),u=a.k*x+ph,z=A*Math.sin(u),sl=A*a.k*Math.cos(u),y=a.h*.05*Math.sin(u*.5+ph*.3),sx=Math.min(1.5,Math.sqrt(1+sl*sl));
e.style.transform="translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,"+z.toFixed(1)+"px) rotateY("+(-Math.atan(sl)).toFixed(3)+"rad) scaleX("+sx.toFixed(3)+")";
e.style.opacity=(1-ss(a.L*.4,a.L*.5,Math.abs(x))).toFixed(3);}}`,
}),

RG({
  id:"b144", cls:"rl", name:"רולודקס שהגלילה מפילה בו כרטיס אחרי כרטיס", tech:"CSS 3D · גלילה מוצמדת",
  insp:"כרטיסים שמתהפכים על ציר אופקי",
  desc:"ערימת כרטיסים עומדת על ציר בתחתית, כמו רולודקס על שולחן. כל מנת גלילה מפילה את הכרטיס הקדמי קדימה ומטה, והבא אחריו מתרומם למקומו. גלילה אחורה מרימה אותם בחזרה, ומונה בצד מראה איפה אנחנו.",
  when:"ארכיון, לקוחות, פרויקטים או שלבים, שישה עד עשרה פריטים שכל אחד מהם צריך רגע משלו. מתי לא: מעל עשרה פריטים (הגלילה נהיית ארוכה), או דף שצריך להגיע בו למידע מהר.",
  diff:"g99 מסובב שורות טקסט על גליל, ו-g151 כרטיסים על קשת בצד. כאן הכרטיסים נופלים על ציר בתחתית שלהם, וכל אחד תופס את כל הבמה לרגע.",
  how:"הכרטיס מסתובב סביב הקצה התחתון שלו. הכרטיסים שמאחור נשענים מעט אחורה ומתרחקים, כך שרואים את הערימה, וזה שנפל נעלם לפני שרואים את גבו.",
  k:"דפוס וצילום", h:"שמונה עבודות מהארכיון", p:"עבודות יד, נייר אמיתי, ובלי פילטרים.",
  ar:"4/3", persp:"1100px", tw:"clamp(260px,38vw,600px)",
  inText:`<p class="rl-n" aria-live="polite"><span data-n>1</span> מתוך <span data-of>8</span></p>`,
  tiles:[["bench","ניקוי מצלמה","סדנה, 2024"],["posters","כרזות בשחור לבן","דפוס משי, 2023"],["neg","סריקת נגטיבים","ארכיון, 2023"],["ink","דיו כתום","דפוס משי, 2022"],["street","רחוב האבן","צילום, 2022"],["paper","גיליון אחרון","בית דפוס, 2021"],["dial","חוגה ידנית","צילום, 2021"],["type","אותיות עופרת","סדר ידני, 2020"]]
    .map(([k, a, b]) => `<figure class="rl-i" data-i>${IMG(k)}<figcaption><b>${a}</b><span>${b}</span></figcaption></figure>`).join(""),
  css:`.rl-i figcaption{display:flex;justify-content:space-between;gap:16px;padding-block:12px 4px;font-size:15px}
.rl-i figcaption span{color:var(--muted)}
.rl-n{margin:0;font-size:15px;font-weight:700;font-variant-numeric:tabular-nums}
.rl.is-on{height:380vh}
.rl.is-on .rl-s{position:sticky;top:0;height:100vh;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);align-items:center;padding-block:0;overflow:clip}
.rl.is-on .rl-v{height:100%;perspective-origin:50% 26%}
.rl.is-on .rl-i{padding:12px;border-radius:16px;background:var(--surface,var(--bg));box-shadow:0 12px 32px color-mix(in srgb,var(--ink) 16%,transparent);transform-origin:50% 100%}
@media(max-width:800px){.rl.is-on .rl-s{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);padding-block:24px 0}.rl.is-on .rl-t p:not(.rl-k):not(.rl-n){display:none}}`,
  pre:`let shown=-1,nEl=document.querySelector("[data-n]"),ofEl=document.querySelector("[data-of]");\n`,
  opts:`{phoneN:6,ease:.1,
range:function(a){return [0,a.N-1.02];},
size:function(a){ofEl.textContent=a.N;a.y=a.h*.06;},
frame:function(a){const n=Math.round(a.p);if(n!==shown){shown=n;nEl.textContent=n+1;}},
place:function(e,i,a){const d=i-a.p;let g,z,o;
if(d<0){g=Math.max(-92,d*92);z=0;o=1-ss(.72,1,-d);}else{g=d*11;z=-d*30;o=1-ss(4,5.4,d);}
e.style.transform="translate3d(0,"+a.y.toFixed(1)+"px,"+z.toFixed(1)+"px) rotateX("+g.toFixed(2)+"deg)";
e.style.opacity=o.toFixed(3);e.style.visibility=o<.01?"hidden":"visible";}}`,
}),

RG({
  id:"b145", cls:"cy", name:"גליל תמונות שרואים גם את הצד האחורי שלו", tech:"CSS 3D · שני צדדים · גרירה",
  insp:"גליל תמונות עם צד אחורי",
  desc:"שתים עשרה תמונות על גליל פתוח שמסתובב לאט. בצד הקרוב רואים את התמונה, ובצד הרחוק, דרך הרווחים, רואים את הגב שלה: לוח כהה עם שם המנה. נגרר הצידה עם תנופה, ככה שכל תמונה שעברה חושפת את השם שלה.",
  when:"תפריט, קטלוג או קולקציה קצרה, שבהם תמונה ושם הולכים יחד, כמו מסעדה, בר, קוסמטיקה. מתי לא: שמות ארוכים (אין מקום בגב), או מעל 16 פריטים.",
  diff:"b62 וב-b112 רואים רק את פני התמונות, ו-g99 הוא גליל של טקסט. כאן כל תמונה היא כרטיס דו-צדדי, והמידע נמצא על הגב, בצד הרחוק של הגליל.",
  how:"לכל פריט שני צדדים עם הסתרת גב, והרדיוס מחושב ממספר הפריטים. כיתובי הגב נמצאים ב-DOM, ולכן קורא מסך מקבל אותם גם כשלא רואים אותם.",
  k:"מהתפריט", h:"מה יוצא מהתנור ומהבר", p:"משתנה לפי העונה. גררו את הגליל, השם של כל מנה כתוב בגב שלה.", cta:"להזמנת שולחן",
  ar:"3/4", persp:"1500px", tw:"clamp(120px,17vw,250px)", vh:"clamp(420px,68vh,680px)", drag:true,
  tiles:[["bread","לחם מחמצת","נאפה ב-5 בבוקר"],["flute","שמפניה וענבים","בקבוק פתוח"],["croiss","קרואסון חמאה","עד שנגמר"],["glass","קוקטייל הבית","על קרח גדול"],["baker","כיכר הכפר","קמח מלא"],["pour","מזיגה איטית","ויסקי ודבש"],["cafe","בוקר בחלון","עד 12:00"],["bar","שולחן הבר","שישה מקומות"],["food","מנת הרחוב","בלחם טרי"],["thermos","קפה בתרמוס","לקחת איתך"],["scoops","גלידת שמנת","שלושה כדורים"],["bowls","קערת קיץ","פרי מהשוק"]]
    .map(([k, a, b]) => `<figure class="cy-i" data-i>${IMG(k)}<figcaption class="cy-b"><b>${a}</b><span>${b}</span></figcaption></figure>`).join(""),
  css:`.cy-t{justify-items:center;text-align:center}
.cy-t p:not(.cy-k){text-align:center}
.cy-b{display:grid;gap:4px;padding-block:8px;font-size:15px}
.cy-b span{color:var(--muted)}
.cy.is-on .cy-i{transform-style:preserve-3d}
.cy.is-on .cy-i img{backface-visibility:hidden}
.cy.is-on .cy-b{position:absolute;inset:0;padding:16px;align-content:end;border-radius:12px;background:var(--ink);color:var(--bg);transform:rotateY(180deg);backface-visibility:hidden}
.cy.is-on .cy-b span{color:color-mix(in srgb,var(--bg) 72%,transparent)}`,
  opts:`{phoneN:8,drag:.0048,auto:.16,
size:function(a){const t=a.items[0].offsetWidth||180;a.R=a.N*t*1.2/6.283;a.st=6.283/a.N;},
frame:function(a){a.scene.style.transform="rotateX("+(-7+a.my*3)+"deg)";},
place:function(e,i,a){e.style.transform="rotateY("+(i*a.st+a.p).toFixed(3)+"rad) translateZ("+a.R.toFixed(1)+"px)";}}`,
}),

RG({
  id:"b146", cls:"cr", name:"מעוף במסדרון שקירותיו, תקרתו ורצפתו תמונות", tech:"CSS 3D · גלילה מוצמדת",
  insp:"טיסה קדימה במסדרון של ארבעה קירות",
  desc:"מסך כהה שנפתח על כותרת. בגלילה המבט טס קדימה לתוך מסדרון שהקירות, התקרה והרצפה שלו מרופדים בתמונות, והן חולפות מכל הכיוונים. בקצה המסדרון מחכה משפט אחד וכפתור.",
  when:"פתיחה של מותג קולנועי, סוכנות, סטודיו או תערוכה, שהתמונות שלו מספרות את הסיפור. מתי לא: דף מכירה קצר (הסקשן לוקח חמישה מסכי גלילה), או תמונות בהירות ושמחות, כי הוא נשען על חושך.",
  diff:"g261 הוא מנהרה של ריבועים צבעוניים בלי תמונות, ו-c12 מסדרון אופקי שטוח. g37 ענן תמונות שעולות. כאן יש חלל אמיתי עם ארבעה קירות, והמצלמה היא שזזה קדימה, לא התמונות.",
  how:"כל תמונה יושבת על קיר אחר ובעומק משלה, במקום קבוע. הגלילה מזיזה טרנספורם אחד של כל הסצנה, ותמונה רחוקה מתבהרת רק כשמתקרבים אליה.",
  k:"תערוכה", h:"נכנסים לאט", p:"עשר שנים של צילום, מסודרות כמו מסדרון אחד.",
  ar:"16/10", persp:"700px", tw:"30vw",
  tiles:TILES("cr", ["sea","street","sky","light","gl","neg","ink","projb","type","posters","ddial","marble","sea","room","sky","street","gl","light","ink","neg"]),
  after:`<div class="cr-e" data-end><h3>בסוף המסדרון יש דלת</h3><a class="cr-cta" href="#">לכרטיסים</a></div>`,
  css:`.cr-e{display:grid;gap:16px;justify-items:start}
.cr-e h3{${H1}}
.cr.is-on{height:560vh}
.cr.is-on .cr-s{position:sticky;top:0;height:100vh;padding:0;overflow:clip;background:var(--ink);color:var(--bg)}
.cr.is-on .cr-v{position:absolute;inset:0}
.cr.is-on .cr-i img{height:100%;aspect-ratio:auto;border-radius:4px}
.cr.is-on .cr-t,.cr.is-on .cr-e{position:absolute;inset:0;margin:auto;height:fit-content;z-index:2;justify-items:center;text-align:center;padding-inline:clamp(20px,5vw,72px)}
.cr.is-on .cr-k{color:color-mix(in srgb,var(--bg) 78%,var(--ink))}
.cr.is-on .cr-t p:not(.cr-k){color:color-mix(in srgb,var(--bg) 78%,transparent);text-align:center}
.cr.is-on .cr-e{opacity:0;pointer-events:none}
.cr.is-on .cr-cta{background:var(--bg);color:var(--ink)}`,
  pre:`const tEl=document.querySelector(".cr-t"),eEl=document.querySelector("[data-end]");\n`,
  opts:`{phoneN:12,ease:.08,
range:function(a){return [0,a.total||1];},
size:function(a){a.sp=a.h*.9;a.W=Math.max(a.w,a.h*.72);a.H=a.h;a.step=a.sp*.34;a.total=(a.N*.34+.9)*a.sp;a.far=a.sp*3.1;
a.items.forEach(function(e,i){const w=i%4,z=-(i+1.4)*a.step,dy=(i%8<4?-1:1)*a.H*.07,dx=(i%8<4?1:-1)*a.W*.08;e.dataset.z=z;
if(w===0||w===2){e.style.width=a.sp*.84+"px";e.style.height=a.H*.56+"px";e.style.transform="translate3d("+(w?a.W/2:-a.W/2)+"px,"+dy+"px,"+z+"px) rotateY("+(w?-90:90)+"deg)";}
else{e.style.width=a.W*.54+"px";e.style.height=a.sp*.84+"px";e.style.transform="translate3d("+dx+"px,"+(w===1?-a.H/2:a.H/2)+"px,"+z+"px) rotateX("+(w===1?-90:90)+"deg)";}});},
frame:function(a){a.scene.style.transform="translateZ("+a.p.toFixed(1)+"px) rotateZ("+(a.mx*.8).toFixed(2)+"deg)";const u=a.p/(a.total||1),f=1-ss(.015,.1,u),g=ss(.88,.985,u);
tEl.style.opacity=f.toFixed(3);tEl.style.transform="scale("+(1+(1-f)*.5).toFixed(3)+")";tEl.style.visibility=f<.01?"hidden":"visible";
eEl.style.opacity=g.toFixed(3);eEl.style.transform="scale("+(.86+g*.14).toFixed(3)+")";eEl.style.pointerEvents=g>.6?"auto":"none";},
place:function(e,i,a){const rel=+e.dataset.z+a.p,o=(1-ss(a.far*.55,a.far,-rel))*(1-ss(a.sp*.3,a.sp*.7,rel));e.style.opacity=o.toFixed(3);e.style.visibility=o<.01?"hidden":"visible";}}`,
}),

FX({
  id:"b147", cls:"bl", name:"קיר עבודות שהעכבר מנפח בו בועה", tech:"WebGL · GLSL · תמונות אמיתיות · גרירה",
  insp:"עדשה שמנפחת גריד תמונות",
  desc:"שתי שורות עבודות זזות בכיוונים מנוגדים לאורך כל הסקשן. סביב העכבר המשטח מתנפח כמו כדור: התמונות באמצע גדלות, והקצוות נדחסים, בלי שום קו שמפריד. נגרר הצידה עם תנופה.",
  when:"תיק עבודות או גלריית מוצרים בעמוד של סטודיו או מותג, כשרוצים רגע אחד של משחק. מתי לא: תמונות שחייבים לראות נקי, או יחד עם מהלך אחר שמעוות תמונה בעמוד.",
  diff:"b127 הוא עדשת זכוכית קטנה עם קצה מבריק ושבירת צבע על שורה אחת, ו-b92 עדשה על טקסט. כאן אין קצה ואין זכוכית: כל המשטח מתעקם כמו כדור גדול, על גריד של שתי שורות נגדיות.",
  how:"המרחק מהעכבר הופך לגובה של כדור, והגובה קובע כמה להגדיל. השורות נדגמות מאטלס אחד של תמונות, ולכן הכול נמצא על קנבס אחד ובציור אחד.",
  img:"s13/proj-a.webp", iw:1800, ih:1200, alt:"סלון כהה עם חלון גדול",
  k:"עבודות נבחרות", h:"קרבו את העכבר, העבודות יבואו אליכם", p:"שישה פרויקטים מהשנה האחרונה, בלי סדר מיוחד.", cta:"לתיק העבודות",
  ratio:"16/8", ratioM:"4/5", cursor:"grab", touch:"pan-y",
  frag:`vec3 tile(vec2 uv,float ax){float gy=uv.y*2.;float row=floor(gy);float v=fract(gy);float dir=mod(row,2.)<.5?1.:-1.;
float u=uv.x*ax*2./A0+row*.37+dir*(P+T*.007);vec4 t=texture2D(U0,vec2(fract(u),(v-.5)*.97+.5));
float m=smoothstep(0.,.005,v-.012)*smoothstep(0.,.005,.988-v);return mix(C0,t.rgb,t.a*m);}
void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=(uv-M)*vec2(ax,1.);float rad=.56+.06*H;float d=length(p)/rad;vec2 u=uv;float z=0.;
if(d<1.){z=sqrt(1.-d*d);u=M+p*(1.-.6*z)/vec2(ax,1.);}
vec3 c=tile(clamp(u,0.,1.),ax);if(d<1.)c*=mix(1.05,.8,pow(d,5.));gl_FragColor=vec4(c,1.);}`,
  pre:`const dragBox=root.querySelector(".bl-m");let dn=false,lx=0,vel=0,apiRef=null;
dragBox.addEventListener("pointerdown",e=>{dn=true;lx=e.clientX;vel=0;dragBox.style.cursor="grabbing";try{dragBox.setPointerCapture(e.pointerId);}catch(_){}});
dragBox.addEventListener("pointermove",e=>{if(!dn||!apiRef)return;const dx=(e.clientX-lx)/dragBox.clientWidth;lx=e.clientX;vel=-dx*.32;apiRef.P+=vel;});
const up=()=>{dn=false;dragBox.style.cursor="";};dragBox.addEventListener("pointerup",up);dragBox.addEventListener("pointercancel",up);
`,
  opts:`{c:${JSON.stringify(COLS)},imgs:${JSON.stringify(["s13/proj-a", "s06/dancers", "s11/cones-yellow", "s12/hero-window", "s14/hero-bread", "s08/sea"].map((s) => R + s + ".webp"))},strip:true,cell:560,cellGap:24,rest:[.5,.5],wander:[.24,.16],ready:function(a){apiRef=a;},tick:function(dt,a){if(!dn){a.P+=vel;vel*=.94;}}}`,
}),

RG({
  id:"b148", cls:"gb", name:"גלובוס שעשוי מעשרות תמונות ונגרר בכל כיוון", tech:"CSS 3D · גרירה בשני צירים",
  insp:"כדור תמונות שגוררים ביד",
  desc:"עשרות תמונות מרובעות מכסות כדור ברווחים שווים. הוא מסתובב לאט, נגרר ביד בכל כיוון וממשיך בתנופה. התמונות בצד הקרוב מלאות, ובצד הרחוק נראות דרך הרווחים כמעט שקופות, וזה מה שנותן לו נפח.",
  when:"כמות היא המסר: לקוחות, קהילה, עבודות, ענף עם המון פריטים. מתי לא: מעט תמונות או תמונות שצריך להבין אחת אחת, כי כאן רואים את השלם ולא את הפרט.",
  diff:"g172 הוא גלובוס מנקודות עם סיכות וקשתות, ו-g37 ענן תמונות מרחפות בלי צורה. כאן התמונות הן פני הכדור עצמו, והוא נגרר בשני צירים.",
  how:"המיקומים מספירלה שווה על הכדור, וכל תמונה מקבלת טרנספורם קבוע פעם אחת בלבד. בכל פריים מסתובבת רק הסצנה, וחשבון קטן קובע לכל תמונה כמה היא שקופה.",
  k:"מאז 2016", h:"כל מה שעשינו עד היום, בכדור אחד", p:"מסעדות, מותגים ומשפחות. גררו אותו, הוא לא נשבר.", cta:"לכל העבודות",
  ar:"1/1", persp:"1400px", tw:"90px", vh:"clamp(420px,76vh,720px)", drag:true,
  tiles:TILES("gb", ["dancers","cones","proja","bread","sea","trio","window","posters","flute","hug","magenta","street","croiss","camp","glass","hands","monster","room","baker","ink","sky","scoops","singer","projb","cafe","van","dial","tusk","pour","food","neg","bowls","light","thermos","gl","bar","paper","projc","panel","night","bench","marble","ddial","wall","type","bench"]),
  css:`.gb.is-on .gb-s{grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);align-items:center}
@media(max-width:800px){.gb.is-on .gb-s{grid-template-columns:minmax(0,1fr)}}`,
  opts:`{phoneN:26,drag:.0055,dragQ:-.0045,qMax:.85,q0:-.22,auto:.13,
size:function(a){a.R=Math.min(a.w*.42,a.h*.4);const G=Math.PI*(3-Math.sqrt(5)),t=a.R*Math.sqrt(9.5/a.N)*1.02;a.n=[];
a.items.forEach(function(e,i){const y=1-2*(i+.5)/a.N,lat=Math.asin(y),lon=G*i;e.style.width=t+"px";
e.style.transform="rotateY("+lon+"rad) rotateX("+lat+"rad) translateZ("+a.R+"px)";a.n.push([Math.cos(lat)*Math.sin(lon),-Math.sin(lat),Math.cos(lat)*Math.cos(lon)]);});},
frame:function(a){a.scene.style.transform="rotateX("+a.q.toFixed(3)+"rad) rotateY("+a.p.toFixed(3)+"rad)";a.cp=Math.cos(a.p);a.sp=Math.sin(a.p);a.cq=Math.cos(a.q);a.sq=Math.sin(a.q);},
place:function(e,i,a){const n=a.n[i],z1=-n[0]*a.sp+n[2]*a.cp,z=n[1]*a.sq+z1*a.cq;e.style.opacity=(.1+.9*ss(-.22,.1,z)).toFixed(3);}}`,
}),

RG({
  id:"b149", cls:"ob", name:"בקבוק במרכז וטבעות תמונות שמקיפות אותו", tech:"CSS 3D · רצף פריימים · גרירה",
  insp:"טבעות תמונות במסלול סביב מוצר",
  desc:"בקבוק אחד במרכז המסך, ושתי טבעות תמונות נטויות מקיפות אותו בכיוונים מנוגדים: עוברות מלפניו, נעלמות מאחוריו וחוזרות. העכבר מטה את כל הסצנה, והבקבוק עצמו מסתובב איתו בעזרת רצף תמונות אמיתי.",
  when:"השקה של מוצר אחד חזק, בושם, שעון, משקה, שרוצים להקיף אותו בעולם שלו. מתי לא: קטלוג של הרבה מוצרים, או מוצר בלי תמונה חתוכה על רקע שקוף.",
  diff:"b81 טבעת של מילים, b112 טבעת אחת בלי מוצר, ו-h36 הירו של מוצר בלי סביבה. כאן המוצר ממוקם בתוך החלל עצמו, ולכן התמונות באמת עוברות מלפניו ומאחוריו.",
  how:"הבקבוק והתמונות באותה סצנת תלת ממד, והדפדפן ממיין את העומק לבד. תמונות הטבעת תמיד פונות אלינו, והסיבוב של הבקבוק נטען רק כשהוא נכנס למסך.",
  k:"LUMA", h:"ריח אחד, והעולם שסביבו", p:"ענבר, עשן ומלח. בקבוק שנמזג ביד, במהדורה של 400.", cta:"להזמנה מוקדמת",
  ar:"4/5", persp:"2000px", tw:"clamp(68px,8.5vw,132px)", vh:"clamp(460px,78vh,780px)", drag:true,
  tiles:TILES("ob", ["marble","sea","glass","sky","light","ink","street","projb","ddial","hands","pour","gl","flute","neg"]),
  inView:"",
  css:`.ob-t{justify-items:center;text-align:center}
.ob-t p:not(.ob-k){text-align:center}
.ob-b{display:block;width:clamp(180px,24vw,340px);height:auto;margin-inline:auto}
.ob.is-on .ob-b{position:absolute;inset:0;margin:auto}`,
  pre:`const obView=document.querySelector(".ob-g"),bottle=new Image();bottle.className="ob-b";bottle.width=600;bottle.height=750;bottle.alt="בקבוק בושם LUMA";bottle.draggable=false;const B="${L}";bottle.src=B+"t-2-06.webp";obView.prepend(bottle);
const fr=[];let shownF=6,asked=false;function loadF(){if(asked)return;asked=true;for(let q=0;q<13;q++){const im=new Image();im.decoding="async";im.src=B+"t-2-"+String(q).padStart(2,"0")+".webp";fr.push(im);}}
`,
  opts:`{phoneN:10,drag:-.0042,auto:.2,
size:function(a){a.R1=Math.min(a.w*.46,a.h*.72);a.R2=a.R1*.74;a.ct=Math.ceil(a.N/2);a.cz=Math.sin(.56);a.cc=Math.cos(.56);loadF();},
frame:function(a){a.scene.style.transform="rotateX("+(-a.my*6).toFixed(2)+"deg) rotateY("+(a.mx*11).toFixed(2)+"deg)";
const f=Math.max(0,Math.min(12,Math.round(6+a.mx*6)));if(f!==shownF&&fr[f]&&fr[f].complete){shownF=f;bottle.src=fr[f].src;}},
place:function(e,i,a){const r=i&1,g=(i>>1)/a.ct*6.283+a.p*(r?-.8:1),R0=r?a.R2:a.R1,ps=r?-.3:.16,x=R0*Math.cos(g),s=R0*Math.sin(g),y=s*a.cz,z=s*a.cc,cs=Math.cos(ps),sn=Math.sin(ps);
e.style.transform="translate3d("+(x*cs-y*sn).toFixed(1)+"px,"+(x*sn+y*cs).toFixed(1)+"px,"+z.toFixed(1)+"px) rotateY("+(-Math.cos(g)*.5).toFixed(3)+"rad)";
e.style.opacity=(.5+.5*ss(-.6,.4,Math.sin(g))).toFixed(3);}}`,
}),

];
