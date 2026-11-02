// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה ד (משפחה 4): מעברים בין תמונות, על המנוע של קבוצה ג. רצים רק בזמן המעבר, ולכן גם בטלפון.

import { TEX, FX, R, COLS } from "./x-scrolltide-c.mjs";

// בקר מעברים: תמונה נוכחית ב-U0, הבאה ב-U1, התקדמות ב-P. כפתור "הבא", ריצה לבד כשנראה, וכיתוב שמתחלף.
const SWAP = `function mvSwap(root,frag,o){
  const N=o.imgs.length,cap=root.querySelector("[data-cap]"),btn=root.querySelector("[data-next]");
  let cur=0,nx=1,t=0,timer=0,inView=false,api=null;
  const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
  function bind(a){a.use(0,cur);a.use(1,nx);}
  function step(){cur=nx;nx=(cur+1)%N;if(cap)cap.textContent=o.caps[cur];}
  function arm(){clearTimeout(timer);if(api&&inView&&!document.hidden&&!api.reduced)timer=setTimeout(start,o.wait||2600);}
  function start(){if(!api||api.busy)return;clearTimeout(timer);
    if(api.reduced){step();bind(api);api.draw();return;}
    t=0;api.busy=true;api.kick();}
  api=mvTex(root,frag,Object.assign({},o,{events:true,
    ready:function(a){api=a;bind(a);arm();},
    tick:function(dt,a){t=Math.min(1,t+dt/(o.dur||1.7));a.P=ease(t);if(t>=1){step();bind(a);a.P=0;a.busy=false;arm();}}}));
  if(!api)return;
  if(btn)btn.addEventListener("click",start);
  new IntersectionObserver(([e])=>{inView=e.isIntersecting;if(inView)arm();else clearTimeout(timer);},{threshold:.3}).observe(root);
  document.addEventListener("visibilitychange",arm);
}`;

const COMMON = "**המנוע:** WebGL גולמי בלי ספרייה, קנבס אחד, והצבעים נקראים מהעור. **ביצועים:** הציור רץ רק בזמן המעבר עצמו, והתמונות נטענות רק כשהסקשן מתקרב. **טלפון:** אותו מעבר, כי הוא אירוע קצר ולא לולאה. **הפחתת תנועה:** החלפה מיידית בלי אנימציה. **בלי WebGL או JS:** התמונה הראשונה נשארת. לא יותר מקנבס WebGL אחד בעמוד.";

const BAR = (c, cap) => `<div class="${c}-bar"><span class="${c}-cap" data-cap aria-live="polite">${cap}</span><button class="${c}-nx" type="button" data-next>הבא</button></div>`;
const BARCSS = (c) => `.${c}-bar{position:absolute;inset-inline:clamp(12px,2vw,24px);bottom:clamp(12px,2vw,24px);display:flex;align-items:center;justify-content:space-between;gap:16px;z-index:2}
.${c}-cap{padding:8px 16px;border-radius:999px;background:color-mix(in srgb,var(--bg) 88%,transparent);color:var(--ink);font-size:15px;font-weight:700}
.${c}-nx{min-height:44px;padding:8px 24px;border:0;border-radius:999px;background:var(--ink);color:var(--bg);font:inherit;font-weight:700;cursor:pointer}
.${c}-nx:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`;

const SW = (o) => {
  const e = FX({ ...o, common: COMMON, extra: BAR(o.cls, o.caps[0]), css: BARCSS(o.cls), pre: "", opts: "{}" });
  e.js = `(function(){
${TEX}
${SWAP}
mvSwap(document.querySelector("[data-${o.cls}]"),${JSON.stringify(o.frag)},${JSON.stringify({ c: COLS, imgs: o.imgs.map((s) => R + s), caps: o.caps, dur: o.dur, wait: o.wait })});
})();`;
  return e;
};

export default [
SW({
  id:"b132", cls:"ct", name:"מעבר בין תמונות דרך קווי גובה וכפור",
  tech:"WebGL · GLSL · מעבר בין תמונות",
  insp:"מעבר שמתקדם לאורך קווי גובה עם קצה קפוא",
  desc:"התמונה הבאה עולה כמו מים על מפה טופוגרפית: מפת גבהים אקראית נחשפת מהנמוך לגבוה, לאורך החזית מצוירים קווי גובה דקים, וממש בקצה התמונה קפואה ומטושטשת כמו זכוכית בחורף.",
  when:"נדל\"ן, תיירות וטבע, כשעוברים בין נופים או פרויקטים בהירו. מתי לא: תמונות דלות בפרטים, או עמוד שבו המעבר מסתיר מידע שצריך לקרוא בזמן שהוא רץ. ",
  diff:"המעברים במאגר הם וילון, מחיקה או מסכה בקצה חד. כאן יש לחזית עובי וחומר: קווים מדויקים לפי שיפוע השטח וכפור שמעוות את מה שמתחת.",
  how:"רעש שכבות נותן מפת גבהים. הסף עולה עם ההתקדמות. עובי הקו מחושב מהשיפוע המקומי, ולכן הוא נשאר אחיד. בפס החזית דוגמים ארבע פעמים בהיסט רעש ומערבבים עם לבן.",
  img:"s08/sea.webp", iw:2560, ih:1706, alt:"ים כחול במבט מהחוף", imgs:["s08/sea.webp","s08/hero.webp","s08/glass.webp"], caps:["חוף הצוק","מגדל הכניסה","חזית הזכוכית"], dur:2.1,
  k:"שלושה פרויקטים", h:"אותו אדריכל, שלושה נופים שונים לגמרי", p:"כל פרויקט נולד מהשטח שעליו הוא עומד, ולכן אף אחד מהם לא דומה לקודם.", cta:"לכל הפרויקטים",
  frag:`float H0(vec2 p){return clamp((fbm(p*2.1+vec2(3.,7.))-.2)/.58,0.,1.);}
void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=uv*vec2(ax,1.);
float n=H0(p);float e=.004;float gr=length(vec2(H0(p+vec2(e,0.))-n,H0(p+vec2(0.,e))-n))/e;
float f=P*1.36-.18;float d=n-f;
float band=smoothstep(.17,.0,abs(d));
float wx=fbm(p*14.);vec2 off=(vec2(wx,fbm(p*14.+9.))-.5)*.05*band;
vec3 a=texture2D(U0,cov(uv+off,A0)).rgb,b=texture2D(U1,cov(uv+off,A1)).rgb;
if(band>.01){vec2 s=vec2(.006,.009)*band;
a=(a+texture2D(U0,cov(uv+off+s,A0)).rgb+texture2D(U0,cov(uv+off-s,A0)).rgb+texture2D(U0,cov(uv+off+s.yx*vec2(-1.,1.),A0)).rgb)/4.;
b=(b+texture2D(U1,cov(uv+off+s,A1)).rgb+texture2D(U1,cov(uv+off-s,A1)).rgb+texture2D(U1,cov(uv+off+s.yx*vec2(-1.,1.),A1)).rgb)/4.;}
float m=smoothstep(.006,-.006,d);vec3 c=mix(a,b,m);
c=mix(c,vec3(.93,.97,1.),band*.5*(.55+.45*wx));
float iso=abs(fract(n*15.)-.5)/15./max(gr,.05);float px=1.3/R.y;
float show=smoothstep(.3,.02,abs(d))*step(.001,P)*step(P,.999);
c=mix(c,vec3(1.),smoothstep(px*1.6,px*.5,iso)*show*.85);
gl_FragColor=vec4(c,1.);}`,
}),
SW({
  id:"b133", cls:"mb", name:"מעבר שנפתח לאורך גידים של שיש עם קצה זהב",
  tech:"WebGL · GLSL · מעבר בין תמונות",
  insp:"מעבר שמתפשט לאורך גידי שיש",
  desc:"התמונה הבאה נפתחת קודם לאורך גידים דקים ומסועפים, כמו סדקים בשיש, ומשם מתרחבת עד שהיא ממלאת הכול. הקצה של כל גיד זוהר בזהב עדין, והוא נמוג כשהמעבר נגמר.",
  when:"מותגי יוקרה, תכשיטים, קוסמטיקה, בשמים, מלונות ושיש ואבן. מתי לא: מותג צעיר וצבעוני שהזהב נראה עליו מחופש, או תמונות כהות מאוד שהגידים נבלעים בהן. ",
  diff:"המעברים במאגר נעים בקו או במסכה רכה. כאן הצורה היא רשת גידים אורגנית, וההתקדמות מתפשטת מהם החוצה.",
  how:"שדה הגידים הוא מרחק מקו האפס של רעש מעוות, בשתי סקאלות. הסף גדל עם ההתקדמות, עם שפה של זהב ברוחב משתנה. הזהב הוא צבע חומר ולא צבע מותג, ולכן הוא קבוע.",
  img:"s15/hero-glass.webp", iw:1100, ih:1375, alt:"בקבוק זכוכית על משטח שיש", imgs:["s15/hero-glass.webp","s15/room.webp","s15/pour.webp"], caps:["הקולקציה","הבית","הטקס"], ratio:"16/9", dur:2.2,
  k:"בית בושם", h:"ריח שנשאר בחדר הרבה אחרי שיצאתם", p:"קולקציה קטנה של שלושה ניחוחות, שנמזגים ביד ומגיעים בבקבוק זכוכית כבד.", cta:"לקולקציה",
  frag:`float vein(vec2 p){vec2 w=vec2(fbm(p*1.3+2.),fbm(p*1.3+vec2(8.,1.)));float a=abs(fbm(p*1.1+w*2.2)-.5)*2.;float b=abs(fbm(p*3.1+w*1.4+5.)-.5)*2.;return min(a,b*1.5+.03);}
void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=uv*vec2(ax,1.);
float v=vein(p*1.3);float f=P*P*.95;
float d=v-f;float m=smoothstep(.006,-.006,d);
vec3 a=texture2D(U0,cov(uv,A0)).rgb,b=texture2D(U1,cov(uv,A1)).rgb;
vec3 c=mix(a,b,m);
float live=smoothstep(0.,.08,P)*smoothstep(1.,.86,P);
float rim=smoothstep(.014,.0,abs(d));float wide=smoothstep(.07,.0,abs(d));
vec3 gold=mix(vec3(.74,.54,.22),vec3(1.,.9,.62),rim);
c=mix(c,gold,live*max(rim,wide*.16));
gl_FragColor=vec4(c,1.);}`,
}),
SW({
  id:"b134", cls:"ht", name:"מעבר בין תמונות דרך נקודות דפוס שגדלות",
  tech:"WebGL · GLSL · מעבר בין תמונות",
  insp:"מעבר בנקודות הדפסה (halftone)",
  desc:"גריד נקודות אלכסוני כמו בעיתון מודפס עובר על התמונה כגל. בתוך כל נקודה כבר רואים את התמונה הבאה, הנקודות גדלות עד שהן נוגעות זו בזו, ואז הכול מתמלא.",
  when:"מגזין, תרבות, מוזיקה, דפוס ומיתוג, כשרוצים תחושת הדפסה. מתי לא: מותג רפואי, פיננסי או טכנולוגי נקי, ותמונות עם טקסט קטן בתוכן. ",
  diff:"b125 צובע את התמונה עצמה בנקודות קבועות. המעברים במאגר מוחקים בצורה אחת גדולה. כאן אלפי צורות קטנות משלימות זו את זו בזמן שגל עובר.",
  how:"הקואורדינטה מסובבת ב-45 מעלות ומחולקת לתאים. רדיוס הנקודה נקבע מההתקדמות, מהמיקום בגל ומהבהירות של התמונה הקודמת, ולכן אזורים כהים נפתחים קודם.",
  img:"s06/hands.webp", iw:2560, ih:1400, alt:"ידיים מורמות בקהל מול במה", imgs:["s06/hands.webp","s06/dancers.webp","s06/hug.webp"], caps:["הקהל","הרחבה","אחרי ההופעה"], dur:1.8,
  k:"מגזין העיר", h:"הלילה שבו כל העיר יצאה לרקוד", p:"גיליון מיוחד עם הצילומים שלא נכנסו לדפוס, ועם כל מי שהיה שם וזוכר הכול אחרת.", cta:"לגיליון",
  frag:`void main(){vec2 uv=gl_FragCoord.xy/R;
float cs=max(11.,R.y/44.);vec2 rp=mat2(.7071,-.7071,.7071,.7071)*gl_FragCoord.xy/cs;vec2 id=floor(rp),f=fract(rp)-.5;
vec2 cc=(mat2(.7071,.7071,-.7071,.7071)*(id+.5))*cs/R;
vec3 a=texture2D(U0,cov(uv,A0)).rgb,b=texture2D(U1,cov(uv,A1)).rgb;
float l=dot(texture2D(U0,cov(cc,A0)).rgb,vec3(.3,.59,.11));
float w=clamp(P*1.9-(1.-cc.x)*.72-.1+(.5-l)*.2,0.,1.);
float r=pow(w,1.25)*.76;
float m=smoothstep(r+.035,r-.035,length(f))*step(.001,w);
vec3 c=mix(a,b,m);
float ring=smoothstep(.07,.0,abs(length(f)-r))*step(.001,w)*step(w,.97);
c=mix(c,C2,ring*.55);
gl_FragColor=vec4(c,1.);}`,
}),
(() => {
  const FRAG = `void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;float y=uv.y;
float rip=smoothstep(0.,.42,P-abs(y-.52)*.5);float open=rip*(.04+.72*P*P);
float cx=.5+(fbm(vec2(y*2.3,5.))-.5)*.32;
float j=(fbm(vec2(y*7.,1.))-.5)*.09+(vn(vec2(y*90.,2.))-.5)*.022+(vn(vec2(y*380.,3.))-.5)*.012;
float dx=uv.x-cx-j*step(.001,open);float side=dx<0.?-1.:1.;
float pull=open*.85;
vec2 q=vec2(uv.x-side*pull,y);
float a0=q.x*ax*2.4+sin(y*3.1+T*.25)*.5;
float f=fbm(vec2(a0,y*1.2)+T*.03);float f2=fbm(vec2(a0+.012,y*1.2)+T*.03);
float lit=clamp((f2-f)*34.+.5,0.,1.);
vec3 c=mix(mix(C2,C1,.55),mix(C0,C1,.6),lit);c+=pow(lit,5.)*.22;
float ed=abs(dx)-open;
float a=smoothstep(-.0015,.0015,ed);
float fr=vn(vec2(y*700.,side*3.));float tf=smoothstep(.022,.0,abs(ed))*step(.42,fr)*step(.001,open);
if(open>.001){a=max(a,tf*.92);c=mix(c,mix(C0,C1,.25),smoothstep(.03,.0,max(ed,0.))*.75);}
gl_FragColor=vec4(c*a,a);}`;
  const c = "st";
  const e = FX({
    id:"b135", cls:c, name:"מסך טעינה שנקרע כמו משי וחושף את האתר",
    tech:"WebGL · GLSL · מסך טעינה",
    insp:"מסך טעינה שנקרע כמו בד",
    desc:"מסך פתיחה בצבע המותג מכוסה בד משי עם קפלים שזזים לאט. מונה קטן עולה, ובסוף הבד נקרע מהאמצע עם סיבים דקים בקצה, ושני הצדדים נמשכים הצידה וחושפים את האתר. כפתור מריץ שוב.",
    when:"מותג יוקרה, אופנה, השקה, אירוע, פעם אחת בביקור. מתי לא: אתר שמוכר בחיפוש ובמהירות, דף נחיתה מקמפיין, וכל מקום שבו שתי שניות המתנה עולות המרות. ",
    diff:"g225 סופר לאחור על מסך כהה ונעלם. המסכים האחרים במאגר מחליקים החוצה. כאן הכיסוי הוא חומר שנקרע, עם קפלים וסיבים.",
    how:"הקפלים הם רעש מתוח עם תאורה מהשיפוע שלו. קו הקרע מתקדם מהאמצע לקצוות, הקצה משונן בשלוש סקאלות, ושני צדי הבד נמשכים בקואורדינטה ולא נחתכים.",
    common:"**המנוע:** WebGL גולמי בלי ספרייה. **ביצועים:** רץ רק בזמן הפתיחה, ואחריו הקנבס נעצר. בשימוש אמיתי מריצים פעם אחת בביקור ומחברים את המונה לטעינה אמיתית, לא לטיימר. **הפחתת תנועה ובלי WebGL:** אין מסך פתיחה בכלל, והאתר גלוי מיד. לא יותר מקנבס WebGL אחד בעמוד.",
    img:"s15/flute.webp", iw:1000, ih:1250, alt:"כוס שמפניה מלאה על רקע כהה", ratio:"16/9",
    k:"השקת הקולקציה", h:"ערב אחד, מאה מוזמנים, ובקבוק שלא יחזור", p:"אירוע ההשקה של הקולקציה החדשה. מספר המקומות מוגבל, וההרשמה נסגרת כשהם נגמרים.", cta:"לשמירת מקום",
    extra:`<div class="st-cover" aria-hidden="true"><b>מיסון</b><span data-count>0</span></div><button class="st-re" type="button" data-replay>להריץ שוב</button>`,
    css:`.st-cover{position:absolute;inset:0;display:none;place-content:center;justify-items:center;gap:8px;color:#fff;background-image:radial-gradient(closest-side,rgb(0 0 0 / .24),transparent);text-shadow:0 1px 16px rgb(0 0 0 / .35);pointer-events:none;transition:opacity .35s ${"cubic-bezier(.2,.6,.2,1)"};z-index:1}
.st-cover b{font-size:clamp(34px,5vw,72px);font-weight:800;letter-spacing:-.01em}
.st-cover span{font-size:18px;font-variant-numeric:tabular-nums}
.st.is-on .st-cover{display:grid}.st.is-tear .st-cover{opacity:0}
.st-re{position:absolute;inset-inline-end:clamp(12px,2vw,24px);bottom:clamp(12px,2vw,24px);min-height:44px;padding:8px 24px;border:0;border-radius:999px;background:color-mix(in srgb,var(--bg) 88%,transparent);color:var(--ink);font:inherit;font-weight:700;cursor:pointer;z-index:2}
.st-re:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`,
    pre:"", opts:"{}", frag:FRAG,
  });
  e.js = `(function(){
${TEX}
const root=document.querySelector("[data-st]"),num=root.querySelector("[data-count]"),re=root.querySelector("[data-replay]");
let t=0,api=null,done=false;const L=1.5,D=1.5;   // L טעינה, D קריעה
function run(){if(!api||api.reduced)return;t=0;api.P=0;root.classList.add("is-on");root.classList.remove("is-tear");num.textContent="0";api.busy=true;api.kick();}
api=mvTex(root,${JSON.stringify(FRAG)},{alpha:true,events:true,c:${JSON.stringify(COLS)},imgs:[],p0:0,
  ready:function(a){api=a;if(a.reduced){a.P=1;a.draw();}else{a.draw();}},
  tick:function(dt,a){t+=dt;num.textContent=String(Math.min(100,Math.round(t/L*100)));
    if(t>=L){root.classList.add("is-tear");const x=Math.min(1,(t-L)/D);a.P=x*x*(3-2*x);}
    if(t>=L+D){a.P=1;a.busy=false;root.classList.remove("is-on");}}});
if(!api){re.hidden=true;return;}
re.addEventListener("click",run);
new IntersectionObserver(([e])=>{if(e.isIntersecting&&!done){done=true;const w=()=>{if(api.draw&&root.classList.contains("is-gl"))run();else setTimeout(w,60);};w();}},{threshold:.4}).observe(root);
})();`;
  return e;
})(),
];
