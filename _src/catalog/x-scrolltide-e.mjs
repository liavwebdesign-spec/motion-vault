// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה ה (משפחה 5): חלקיקים. מנוע נקודות ומשולשים משלו, כי המשולש המסך-מלא של קבוצה ג לא מתאים כאן.

import { TEX, FX, R, COLS } from "./x-scrolltide-c.mjs";

const E = "cubic-bezier(.2,.6,.2,1)";
const H1 = "margin:0;font-size:clamp(34px,4.4vw,64px);font-weight:800;line-height:1.05;letter-spacing:-.015em;text-wrap:balance";
const CTA = (c) => `.${c}-cta{display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:700;text-decoration:none}
.${c}-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`;

// המנוע: תוכנית אחת, באפרים של אטריביוטים, זמן, עכבר מוחלק בפיקסלים של הקנבס (מלמעלה שמאל), צבעים מהעור.
const PTS = `function mvPts(root,o){
  if(!root)return null;
  const cv=root.querySelector("canvas"),gl=cv.getContext("webgl",{alpha:true,antialias:false,depth:false,stencil:false,powerPreference:"low-power"});
  if(!gl)return null;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,phone=matchMedia("(max-width:700px),(pointer:coarse)").matches;
  const still=reduced||(phone&&!o.phone);
  function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(x));return null;}return x;}
  const vs=sh(gl.VERTEX_SHADER,"precision highp float;uniform vec2 V,M;uniform float T,H,P,S,A;uniform vec3 C0,C1,C2,C3,W0,W1;\\n"+o.vs),fs=sh(gl.FRAGMENT_SHADER,"precision highp float;uniform vec2 V,M;uniform float T,H,P,S,A;uniform vec3 C0,C1,C2,C3;uniform sampler2D U0;\\n"+o.fs);
  if(!vs||!fs)return null;
  const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);gl.useProgram(pr);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);
  const U=n=>gl.getUniformLocation(pr,n);
  const px=document.createElement("canvas");px.width=px.height=1;const p2=px.getContext("2d",{willReadFrequently:true});
  const probe=document.createElement("span");probe.hidden=true;root.appendChild(probe);
  function rgb(v){probe.style.color=v;p2.fillStyle="#000";p2.fillStyle=getComputedStyle(probe).color;p2.fillRect(0,0,1,1);const d=p2.getImageData(0,0,1,1).data;return[d[0]/255,d[1]/255,d[2]/255];}
  function cols(){(o.c||[]).forEach((v,i)=>gl.uniform3fv(U("C"+i),rgb(v)));}
  let cw=1,ch=1,s=1,count=0,seen=false,ready=false,started=false,raf=0,last=0,acc=0,moved=-1e9,mx=0,my=0,tx=0,ty=0;const bufs={};
  const api={P:0,H:0,th:0,A:1,count:0,still,reduced,phone,over:false,cv,gl,kick:go,draw:frame,mesh,tex,U,get w(){return cw;},get h(){return ch;},get s(){return s;}};
  function mesh(attrs,n){count=n;api.count=n;for(const k in attrs){const l=gl.getAttribLocation(pr,k);if(l<0)continue;bufs[k]=bufs[k]||gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bufs[k]);gl.bufferData(gl.ARRAY_BUFFER,attrs[k].d,gl.STATIC_DRAW);gl.enableVertexAttribArray(l);gl.vertexAttribPointer(l,attrs[k].n,gl.FLOAT,false,0,0);}}
  function tex(im){const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.uniform1i(U("U0"),0);api.A=im.naturalWidth/im.naturalHeight;}
  function size(){s=Math.min(devicePixelRatio||1,o.dpr||1.5);cw=Math.max(1,cv.clientWidth);ch=Math.max(1,cv.clientHeight);cv.width=Math.round(cw*s);cv.height=Math.round(ch*s);gl.viewport(0,0,cv.width,cv.height);}
  function frame(){gl.uniform2f(U("V"),cw,ch);gl.uniform2f(U("M"),mx,my);gl.uniform1f(U("T"),acc);gl.uniform1f(U("H"),api.H);gl.uniform1f(U("P"),api.P);gl.uniform1f(U("S"),s);gl.uniform1f(U("A"),api.A);
    gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(o.tri?gl.TRIANGLES:gl.POINTS,0,count);}
  function loop(now){raf=0;if(!seen||document.hidden||!ready)return;
    const dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt;
    if(o.wander&&now-moved>2500){tx=cw*(.5+o.wander[0]*Math.sin(acc*.55));ty=ch*(.5+o.wander[1]*Math.sin(acc*.83+1));api.th=1;}
    mx+=(tx-mx)*(o.ease||.1);my+=(ty-my)*(o.ease||.1);api.H+=(api.th-api.H)*.07;
    if(o.tick)o.tick(dt,api,mx,my);
    frame();raf=requestAnimationFrame(loop);}
  function go(){if(!raf&&ready&&seen&&!document.hidden&&!still){last=performance.now();raf=requestAnimationFrame(loop);}}
  function reveal(){if(ready&&seen)root.classList.add("is-gl");}
  function load(){if(started)return;started=true;
    Promise.resolve(o.init(api)).then(()=>{size();mx=tx=cw*.5;my=ty=ch*.5;cols();if(o.build)o.build(api);ready=true;if(still)api.H=0;if(o.ready)o.ready(api);frame();reveal();go();}).catch(e=>console.warn(e));}
  let rt=0;new ResizeObserver(()=>{if(!ready)return;size();clearTimeout(rt);rt=setTimeout(()=>{if(o.build)o.build(api);frame();},180);frame();}).observe(cv);
  new MutationObserver(()=>{if(ready){cols();frame();}}).observe(document.documentElement,{attributes:true});
  new IntersectionObserver(([e])=>{seen=e.isIntersecting;if(seen){load();reveal();}go();},{rootMargin:"200px"}).observe(root);
  document.addEventListener("visibilitychange",go);
  if(!still){
    root.addEventListener("pointermove",e=>{if(e.pointerType==="touch"&&!o.touch)return;const r=cv.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;moved=performance.now();api.over=true;api.th=1;});
    root.addEventListener("pointerleave",()=>{api.over=false;api.th=0;});
  }
  return api;
}`;

const PCOMMON = "**המנוע:** WebGL גולמי בלי ספרייה, והצבעים נקראים מהעור. **ביצועים:** עוצר מחוץ למסך ובלשונית מוסתרת. לא יותר מקנבס WebGL אחד בעמוד.";

export default [
{
  id:"b136", cat:"behavior", name:"כותרת ענקית מאלפי חלקיקים שנדחפים מהעכבר", tech:"WebGL · חלקיקים · דגימת טקסט", status:"ממתין", runway:false,
  desc:"הכותרת עצמה בנויה מעשרות אלפי נקודות שמתכנסות אליה כשהסקשן נכנס. העכבר דוחף אותן הצידה כמו יד בחול, והן חוזרות למקומן בעדינות. הכותרת האמיתית נשארת בעמוד לגוגל ולקורא מסך.",
  when:"הירו של סטודיו, טכנולוגיה או השקה, עם כותרת קצרה מאוד של עד שלוש מילים. מתי לא: כותרת ארוכה (הקריאה נשברת), עמוד שצריך לטעון מהר בטלפון ישן, או טקסט שהלקוח משנה כל שבוע בלי שמישהו יבדוק אותו. ",
  note:`**שחזור.** השראה: Scrolltide (1.11.2026), טקסט מחלקיקים שמגיב לעכבר. נבנה מאפס. **במה זה שונה ממה שיש:** g169 מעביר איור בין עונות, ו-g172 הוא גלובוס נקודות. אין במאגר כותרת קריאה שעשויה מחלקיקים. **הרעיון:** הכותרת מצוירת פעם אחת בקנבס נסתר באותו פונט ובאותו מיקום, כל פיקסל שנדגם הופך לנקודה, והשיידר מחשב את הדחיפה בלי סימולציה, ולכן עשרות אלפי נקודות זולות. **הכותרת נשארת טקסט אמיתי**, רק שקופה. ${PCOMMON} **טלפון, הפחתת תנועה ובלי WebGL:** הכותרת הרגילה, בלי קנבס.`,
  libs:[],
  css:`.pw{position:relative;display:grid;gap:clamp(24px,3vw,48px);align-content:center;min-height:min(86vh,760px);padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px);overflow:hidden}
.pw>canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .5s ${E}}
.pw.is-gl>canvas{opacity:1}
.pw-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent);text-align:center}
.pw h2{margin:0;font-size:clamp(56px,12.5vw,210px);font-weight:800;line-height:1;letter-spacing:-.02em;text-align:center}
.pw h2 span{display:block}
.pw.is-gl h2{color:transparent}
.pw-b{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px 32px;position:relative}
.pw-b p{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
${CTA("pw")}`,
  html:`<div class="stage"><section class="pw" data-pw>
  <canvas aria-hidden="true"></canvas>
  <p class="pw-k">סטודיו למוצרים דיגיטליים</p>
  <h2><span>בונים דברים</span><span>שזזים</span></h2>
  <div class="pw-b"><p>מוצרים שאנשים פותחים כל יום, מהסקיצה הראשונה ועד הגרסה שעובדת בלי שמישהו ישים לב.</p><a class="pw-cta" href="#">דברו איתנו</a></div>
</section></div>`,
  js:`(function(){
${PTS}
const root=document.querySelector("[data-pw]");
if(matchMedia("(max-width:700px),(pointer:coarse),(prefers-reduced-motion: reduce)").matches)return;   // הכותרת הרגילה
mvPts(root,{c:${JSON.stringify(COLS)},wander:[.32,.2],ease:.14,
vs:${JSON.stringify(`attribute vec2 a,b;varying float v;varying float w;
void main(){vec2 p=a;vec2 d=p-M;float r=length(d);float f=H*exp(-r*r/(2.*92.*92.));
vec2 n=d/max(r,1.);vec2 t=vec2(-n.y,n.x);
p+=n*f*(30.+62.*b.x)+t*f*(b.y-.5)*38.;
p+=vec2(sin(T*1.3+a.y*.03+b.x*6.28),cos(T*1.1+a.x*.02+b.y*6.28))*(.7+f*5.);
float e=P*P*(3.-2.*P);float q=clamp(e*1.8-b.y*.8,0.,1.);q=q*q*(3.-2.*q);
p=mix(a+(b-.5)*V*vec2(1.3,1.5),p,q);
v=f;w=b.x;
gl_Position=vec4(p.x/V.x*2.-1.,1.-p.y/V.y*2.,0.,1.);
gl_PointSize=(2.8+f*1.1)*S;}`)},
fs:${JSON.stringify(`varying float v;varying float w;
void main(){float l=length(gl_PointCoord-.5);float a=smoothstep(.5,.38,l);
vec3 c=mix(C2,C1,clamp(v*1.6+step(w,.07),0.,1.));gl_FragColor=vec4(c*a,a);}`)},
init:function(){return document.fonts?document.fonts.ready:null;},
build:function(a){
  const W=a.w,H=a.h,c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d",{willReadFrequently:true});
  const h=root.querySelector("h2"),cs=getComputedStyle(h),rr=a.cv.getBoundingClientRect();
  x.font=cs.fontWeight+" "+cs.fontSize+" "+cs.fontFamily;x.direction="rtl";x.textAlign="center";x.textBaseline="alphabetic";x.fillStyle="#000";try{x.letterSpacing=cs.letterSpacing;}catch(_){}
  h.querySelectorAll("span").forEach(sp=>{const g=document.createRange();g.selectNodeContents(sp);const b=g.getBoundingClientRect(),m=x.measureText(sp.textContent);const A=m.fontBoundingBoxAscent,D=m.fontBoundingBoxDescent;x.fillText(sp.textContent,(b.left+b.right)/2-rr.left,b.top-rr.top+(b.height+A-D)/2);});
  const d=x.getImageData(0,0,W,H).data;let st=2,pts=[];
  for(;st<8;st+=.5){pts=[];for(let y=0;y<H;y+=st)for(let X=0;X<W;X+=st){if(d[(Math.round(y)*W+Math.round(X))*4+3]>128)pts.push(X,y);}if(pts.length/2<26000)break;}
  const n=pts.length/2,sd=new Float32Array(n*2);for(let i=0;i<n*2;i++)sd[i]=Math.random();
  a.mesh({a:{n:2,d:new Float32Array(pts)},b:{n:2,d:sd}},n);
},
tick:function(dt,a){if(a.P<1)a.P=Math.min(1,a.P+dt/1.5);}});
})();`,
},
{
  id:"b137", cat:"behavior", name:"תמונה שמתפרקת לעלי כותרת בגלילה וחוזרת באחורה", tech:"WebGL · משולשים · גלילה מוצמדת", status:"ממתין", runway:false,
  desc:"תמונה על כל המסך. בגלילה היא מתפרקת מלמטה ומהצד לאלפי עלי כותרת שמסתובבים ועפים עם הרוח, וחושפים כותרת שישבה מאחוריה. גלילה אחורה מחזירה כל עלה בדיוק למקומו והתמונה נשלמת.",
  when:"הירו של פרחים, גלידה, קוסמטיקה, חתונות ומותג רך, כשמעבר בין פתיחה למסר הוא רגע מרכזי בעמוד. מתי לא: דף שצריך להגיע למידע מהר (הסקשן לוקח שלושה מסכי גלילה), או מותג תעשייתי וטכני שעלי הכותרת נראים עליו מחופשים. ",
  note:`**שחזור.** השראה: Scrolltide (1.11.2026), תמונה שמתפרקת לעלים לפי הגלילה. נבנה מאפס. **במה זה שונה ממה שיש:** g251 מוחק אובייקט. כאן כל התמונה היא אלפי משולשים נפרדים שעפים ממש, ואין לולאה: המיקום של כל עלה הוא פונקציה של הגלילה, ולכן החזרה מדויקת. **השיידר:** קודקודים של רבועים בגריד, כל רבוע עם זרע אקראי. הסיבוב, הרוח והגודל מחושבים מההתקדמות. בנקודת ההתחלה הרבועים מלאים ורציפים, ואחרי שמתחילים לעוף הצורה נחתכת לעלה. ${PCOMMON} **טלפון:** אותו דבר עם פחות עלים. **הפחתת תנועה ובלי WebGL:** הכותרת והתמונה זו מעל זו, בלי הצמדה.`,
  libs:[],
  css:`.pe{position:relative}
.pe-s{display:grid;gap:clamp(24px,3vw,48px);padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px)}
.pe-t{display:grid;gap:16px;justify-items:center;text-align:center}
.pe-t h2{${H1}}
.pe-t p{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.pe-k{font-size:15px!important;font-weight:700;letter-spacing:.04em;color:var(--accent)!important}
${CTA("pe")}
.pe-s>img{width:100%;height:auto;max-height:80vh;object-fit:cover;border-radius:clamp(16px,2vw,28px);display:block}
.pe>.pe-s>canvas{display:none}
.pe.is-on{height:300vh}
.pe.is-on>.pe-s{position:sticky;top:0;height:100vh;padding:0;place-content:center;overflow:hidden}
.pe.is-on .pe-t{padding:clamp(20px,5vw,72px)}
.pe.is-on>.pe-s>canvas{display:block;position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.pe.is-on>.pe-s>img{position:absolute;inset:0;width:100%;height:100%;max-height:none;border-radius:0}
.pe.is-gl>.pe-s>img{visibility:hidden}`,
  html:`<div class="stage"><section class="pe" data-pe><div class="pe-s">
  <div class="pe-t">
    <p class="pe-k">גלידריה משפחתית</p>
    <h2>מה שנשאר בסוף הוא הטעם</h2>
    <p>חלב מהמשק, פרי מהשוק של אותו בוקר, ובלי שום דבר שאי אפשר לבטא.</p>
    <a class="pe-cta" href="#">לטעמים של השבוע</a>
  </div>
  <img src="${R}s11/hero-scoops.webp" width="1400" height="1750" alt="כדורי גלידה צבעוניים בקערה" decoding="async" loading="lazy">
  <canvas aria-hidden="true"></canvas>
</div></section></div>`,
  js:`(function(){
${PTS}
const root=document.querySelector("[data-pe]");
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;   // הכותרת והתמונה בלי הצמדה
root.classList.add("is-on");
const api=mvPts(root,{phone:true,tri:true,dpr:1.25,c:${JSON.stringify(COLS)},
vs:${JSON.stringify(`attribute vec2 c,k;attribute vec3 s;uniform vec2 Z;varying vec2 u,q;varying float t;
void main(){float d=(1.-c.y)*.42+(1.-c.x)*.22+s.x*.26;
float x=clamp((P*1.65-d)/.72,0.,1.);t=x;float e=x*x;
float a=x*(4.+s.y*9.)*(s.z<.5?-1.:1.);float fl=cos(x*(5.+s.z*9.));
vec2 sz=Z*(1.02+x*(1.1+s.x*2.4));vec2 kk=k*sz;kk.x*=mix(1.,.25+.75*abs(fl),smoothstep(0.,.12,x));
vec2 r=vec2(kk.x*cos(a)-kk.y*sin(a),kk.x*sin(a)+kk.y*cos(a));
vec2 p=c*V+r;
p+=vec2(-V.x*(.25+.95*s.y),-V.y*(.35+.8*s.x))*e;
p+=vec2(sin(x*7.+s.x*6.28)*60.,cos(x*5.+s.y*6.28)*46.)*x;
p+=vec2(sin(T*.9+s.x*6.28),cos(T*.7+s.y*6.28))*x*7.;
u=c+k*Z/V;q=k;
gl_Position=vec4(p.x/V.x*2.-1.,1.-p.y/V.y*2.,0.,1.);}`)},
fs:${JSON.stringify(`varying vec2 u,q;varying float t;
void main(){float ra=V.x/V.y;vec2 s=ra>A?vec2(1.,A/ra):vec2(ra/A,1.);vec3 c=texture2D(U0,(u-.5)*s+.5).rgb;
float l=length(vec2(q.x*(1.25-.35*q.y),q.y));float p=smoothstep(1.,.86,l);float a=mix(1.,p,smoothstep(0.,.05,t));
a*=1.-smoothstep(.82,1.,t);
c*=1.+.16*sin(t*14.+q.x*2.)*smoothstep(0.,.1,t);
gl_FragColor=vec4(c*a,a);}`)},
init:function(a){return new Promise((res,rej)=>{const im=new Image();im.crossOrigin="anonymous";im.onload=()=>{a.gl.pixelStorei(a.gl.UNPACK_FLIP_Y_WEBGL,false);a.tex(im);res();};im.onerror=rej;im.src="${R}s11/hero-scoops.webp";});},
build:function(a){
  const W=a.w,H=a.h,cell=a.phone?15:11,cn=Math.ceil(W/cell),rn=Math.ceil(H/cell),n=cn*rn*6,c=new Float32Array(n*2),k=new Float32Array(n*2),s=new Float32Array(n*3);
  const K=[-1,-1,1,-1,1,1,-1,-1,1,1,-1,1];let v=0;
  for(let y=0;y<rn;y++)for(let x=0;x<cn;x++){const u=(x+.5)/cn,w=(y+.5)/rn,r1=Math.random(),r2=Math.random(),r3=Math.random();
    for(let j=0;j<6;j++){c[v*2]=u;c[v*2+1]=w;k[v*2]=K[j*2];k[v*2+1]=K[j*2+1];s[v*3]=r1;s[v*3+1]=r2;s[v*3+2]=r3;v++;}}
  a.mesh({c:{n:2,d:c},k:{n:2,d:k},s:{n:3,d:s}},n);
  a.gl.uniform2f(a.U("Z"),W/cn/2,H/rn/2);
},
tick:function(dt,a){a.P=prog();}});
function prog(){const r=root.getBoundingClientRect(),L=r.height-innerHeight;return L>0?Math.max(0,Math.min(1,-r.top/L)):0;}
if(!api)root.classList.remove("is-on");
})();`,
},
(() => {
  const TABS = [["אתרים","אתר שעובד בשבילכם גם כשאתם ישנים, עם כל מה שגוגל ולקוחות מחפשים."],["מערכות","כלים פנימיים שמחליפים אקסלים, הודעות וזיכרון של עובד אחד."],["שיווק","קמפיינים שנמדדים בלידים אמיתיים ולא בלייקים."]];
  return {
    id:"b138", cat:"behavior", name:"ענן חלקיקים שמתעצב מחדש לכל שירות", tech:"WebGL · חלקיקים · מורפינג", status:"ממתין", runway:false,
    desc:"עשרות אלפי נקודות יוצרות כדור, ובמעבר לשירות הבא הן זורמות ומתארגנות לטבעת ואז לגל. כל נקודה יוצאת באיחור קטן משלה, ולכן הצורה נמסה ונבנית במקום לקפוץ. העכבר מטה את הענן.",
    when:"סקשן שירותים או מוצרים של חברת טכנולוגיה, AI או נתונים, עם שלוש עד חמש אפשרויות. מתי לא: מותג חם ואנושי שצריך פנים ותמונות, או עמוד שיש בו כבר אפקט חלקיקים. ",
    note:`**שחזור.** השראה: Scrolltide (1.11.2026), חלקיקים שעוברים בין צורות. נבנה מאפס. **במה זה שונה ממה שיש:** g172 הוא גלובוס נקודות קבוע, g259 דיסק שמתמלא, ו-g169 איור בין עונות. כאן הצורה משתנה לפי בחירת הגולש, והחלקיקים עצמם זורמים ביניהן. **השיידר:** לכל נקודה שלושה מיקומים שמורים בזיכרון של כרטיס המסך, ומשקל לכל צורה. הסיבוב והפרספקטיבה מחושבים שם, ו-JS רק מזיז את ההתקדמות. ${PCOMMON} **טלפון:** פחות נקודות. **הפחתת תנועה:** צורה אחת קבועה, והלשוניות עדיין מחליפות טקסט. **בלי WebGL:** הטקסט והלשוניות בלבד.`,
    libs:[],
    css:`.gf{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);align-items:center;gap:clamp(24px,4vw,64px);padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px)}
.gf-t{display:grid;gap:24px;justify-items:start}
.gf-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent)}
.gf h2{${H1}}
.gf-tabs{display:flex;flex-wrap:wrap;gap:8px}
.gf-tab{min-height:44px;padding:8px 24px;border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);border-radius:999px;background:transparent;color:var(--ink);font:inherit;font-weight:700;cursor:pointer;transition:background .3s ${E},color .3s ${E}}
.gf-tab[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.gf-tab:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.gf-d{margin:0;min-height:3.2em;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.gf-m{position:relative;aspect-ratio:1/1;max-height:80vh;width:100%}
.gf-m canvas{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .6s ${E}}
.gf.is-gl .gf-m canvas{opacity:1}
@media(max-width:800px){.gf{grid-template-columns:minmax(0,1fr)}}
@media(prefers-reduced-motion:reduce){.gf-tab{transition:none}}`,
    html:`<div class="stage"><section class="gf" data-gf>
  <div class="gf-t">
    <p class="gf-k">מה אנחנו עושים</p>
    <h2>שלושה דברים, ומעט מאוד חוץ מהם</h2>
    <div class="gf-tabs" role="group" aria-label="בחירת שירות">${TABS.map((t, i) => `<button class="gf-tab" type="button" data-t="${i}" aria-pressed="${i ? "false" : "true"}">${t[0]}</button>`).join("")}</div>
    <p class="gf-d" data-d aria-live="polite">${TABS[0][1]}</p>
  </div>
  <div class="gf-m"><canvas aria-hidden="true"></canvas></div>
</section></div>`,
    js:`(function(){
${PTS}
const root=document.querySelector("[data-gf]"),tabs=[...root.querySelectorAll(".gf-tab")],desc=root.querySelector("[data-d]"),T=${JSON.stringify(TABS.map((t) => t[1]))};
let cur=0,nx=0,t=1,hold=0,auto=true;const VEC=[[1,0,0],[0,1,0],[0,0,1]];
function pick(i){tabs.forEach((b,j)=>b.setAttribute("aria-pressed",String(j===i)));desc.textContent=T[i];if(!api||api.still){cur=nx=i;t=1;if(api){set(api);api.draw();}return;}if(i===nx&&t<1)return;cur=nx;nx=i;t=0;hold=0;set(api);}
function set(a){a.gl.uniform3fv(a.U("W0"),VEC[cur]);a.gl.uniform3fv(a.U("W1"),VEC[nx]);a.P=t;}
const api=mvPts(root,{phone:true,dpr:1.5,c:${JSON.stringify(COLS)},ease:.05,
vs:${JSON.stringify(`attribute vec3 a,b,d;attribute vec2 s;varying float v;varying float w;
void main(){float q=clamp(P*1.5-s.x*.5,0.,1.);q=q*q*(3.-2.*q);
vec3 wt=mix(W0,W1,q);vec3 p=a*wt.x+b*wt.y+d*wt.z;
float sw=sin(q*3.14159);p+=vec3(sin(s.x*40.+T),cos(s.y*40.+T*.8),sin(s.x*17.+s.y*23.))*sw*.22;
p+=vec3(sin(T*.6+s.y*6.28),cos(T*.5+s.x*6.28),0.)*.012;
float ay=T*.22+(M.x/V.x-.5)*1.1,ax=-.34+(M.y/V.y-.5)*.8;
float c1=cos(ay),s1=sin(ay),c2=cos(ax),s2=sin(ax);
p=vec3(p.x*c1+p.z*s1,p.y,-p.x*s1+p.z*c1);p=vec3(p.x,p.y*c2-p.z*s2,p.y*s2+p.z*c2);
float z=2.9+p.z;float k=2.35/z;float ra=V.x/V.y;
gl_Position=vec4(p.x*k*min(1.,1./ra),p.y*k*min(1.,ra),0.,1.);
v=clamp(1.-(z-1.9)/2.,0.,1.);w=s.y;
gl_PointSize=(1.3+s.y*1.1)*S*k*1.25;}`)},
fs:${JSON.stringify(`varying float v;varying float w;
void main(){float l=length(gl_PointCoord-.5);float a=smoothstep(.5,.28,l)*(.3+.7*v);
vec3 c=mix(C2,C1,step(w,.5)*.85+.15*v);gl_FragColor=vec4(c*a,a);}`)},
init:function(){},
build:function(x){
  if(x.count)return;const n=x.phone?9000:34000,a=new Float32Array(n*3),b=new Float32Array(n*3),d=new Float32Array(n*3),s=new Float32Array(n*2),G=Math.PI*(3-Math.sqrt(5)),side=Math.ceil(Math.sqrt(n));
  for(let i=0;i<n;i++){const y=1-2*(i+.5)/n,r=Math.sqrt(1-y*y),th=G*i;a[i*3]=Math.cos(th)*r;a[i*3+1]=y;a[i*3+2]=Math.sin(th)*r;
    const u=Math.random()*6.2832,v=Math.random()*6.2832,R0=.72,r0=.3;b[i*3]=(R0+r0*Math.cos(v))*Math.cos(u);b[i*3+1]=r0*Math.sin(v);b[i*3+2]=(R0+r0*Math.cos(v))*Math.sin(u);
    const gx=(i%side)/side*2-1,gz=Math.floor(i/side)/side*2-1,dr=Math.hypot(gx,gz);d[i*3]=gx*1.15;d[i*3+1]=.28*Math.sin(dr*7.)*Math.cos(gx*2.);d[i*3+2]=gz*1.15;
    s[i*2]=Math.random();s[i*2+1]=Math.random();}
  x.mesh({a:{n:3,d:a},b:{n:3,d:b},d:{n:3,d:d},s:{n:2,d:s}},n);
},
ready:function(a){set(a);},
tick:function(dt,a){if(t<1){t=Math.min(1,t+dt/1.7);a.P=t;}else if(auto){hold+=dt;if(hold>2.6)pick((nx+1)%3);}}});
tabs.forEach((b,i)=>b.addEventListener("click",()=>{auto=false;pick(i);}));
})();`,
  };
})(),
{
  id:"b139", cat:"behavior", name:"דשא שצומח בכל מקום שהעכבר עובר בו", tech:"Canvas 2D · pointer", status:"ממתין", runway:false,
  desc:"בתחתית הסקשן שטיח של גבעולים נמוכים. איפה שהעכבר עובר הדשא צומח לגובה, נוטה ברוח ומתרחק מהסמן, ואחרי זמן ארוך הוא חוזר להיות נמוך. בטלפון האצבע מצמיחה אותו באותה צורה.",
  when:"גינון, קיימות, חקלאות, ילדים וכל מותג ירוק, או סוף עמוד שרוצים שישאיר חיוך. מתי לא: מותג רציני ומדויק (משפטים, פיננסים), או מעל תוכן שצריך ללחוץ עליו. ",
  note:`**שחזור.** השראה: Scrolltide (1.11.2026), דשא שמגיב לעכבר. נבנה מאפס. **במה זה שונה ממה שיש:** b102 מעלה גצים שמרחפים ונעלמים. כאן יש מצב שנשמר: המקום שעברו בו נשאר גבוה ומספר איפה היה העכבר. **איך:** לכל גבעול גובה נוכחי, והוא גדל לפי המרחק מהסמן. הציור הוא מסלול אחד לכל גוון, ולכן מאות גבעולים לא יקרים. הירוקים הם צבע של חומר ולא צבע מותג, ולכן הם קבועים. **ביצועים:** עוצר מחוץ למסך. **הפחתת תנועה ובלי JS:** הדשא לא מופיע או מצויר פעם אחת כגל קבוע.`,
  libs:[],
  css:`.gs{position:relative;display:grid;gap:16px;justify-items:center;text-align:center;align-content:start;min-height:min(86vh,720px);padding:clamp(48px,7vw,96px) clamp(20px,5vw,72px) 0;overflow:hidden}
.gs-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent)}
.gs h2{${H1}}
.gs p.gs-p{margin:0;max-width:44ch;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
${CTA("gs")}
.gs canvas{position:absolute;inset-inline:0;bottom:0;width:100%;height:50%;pointer-events:none;opacity:0;transition:opacity .8s ${E}}
.gs.is-on canvas{opacity:1}
@media(prefers-reduced-motion:reduce){.gs canvas{transition:none}}`,
  html:`<div class="stage"><section class="gs" data-gs>
  <p class="gs-k">גינון בקהילה</p>
  <h2>הגינה מתחילה איפה שעוברים בה</h2>
  <p class="gs-p">מלווים בניינים ושכונות בהקמת גינה משותפת, מהאדמה הראשונה ועד שהשכנים כבר לא צריכים אותנו.</p>
  <a class="gs-cta" href="#">לבדיקת שטח בחינם</a>
  <canvas aria-hidden="true"></canvas>
</section></div>`,
  js:`(function(){
const root=document.querySelector("[data-gs]"),cv=root.querySelector("canvas"),x=cv.getContext("2d");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const COL=["#27593a","#2f6e43","#3c8450","#5a9a55","#86b35d"];
let W=1,H=1,B=[],seen=false,raf=0,last=0,T=0,px=-999,py=0,tx=-999,moved=-1e9;
function size(){const s=Math.min(devicePixelRatio||1,1.5);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*s;cv.height=H*s;x.setTransform(s,0,0,s,0,0);
  const n=Math.min(1100,Math.round(W/1.25)),old=B;B=[];for(let i=0;i<n;i++){const X=(i+Math.random())/n*W,prev=old[Math.floor(i/n*old.length)];B.push({x:X,g:prev?prev.g:.07+.06*(Math.sin(X*.012)+1),max:(.55+Math.random()*.45)*H*.92,w:1.6+Math.random()*2.2,ph:Math.random()*6.28,c:Math.floor(Math.random()*COL.length),lean:(Math.random()-.5)*16});}}
function draw(){x.clearRect(0,0,W,H);
  for(let c=0;c<COL.length;c++){x.fillStyle=COL[c];x.beginPath();
    for(let i=0;i<B.length;i++){const b=B[i];if(b.c!==c)continue;const h=b.max*b.g,dx=b.x-px,near=Math.exp(-dx*dx/(2*70*70));
      const wind=Math.sin(T*1.1+b.x*.012+b.ph*.3)*(8+h*.09)+b.lean+(dx>0?1:-1)*near*h*.34;
      const tipx=b.x+wind,tipy=H-h,cx=b.x+wind*.25,cy=H-h*.55;
      x.moveTo(b.x-b.w,H);x.quadraticCurveTo(cx-b.w*.5,cy,tipx,tipy);x.quadraticCurveTo(cx+b.w*.5,cy,b.x+b.w,H);x.closePath();}
    x.fill();}}
function loop(now){raf=0;if(!seen||document.hidden)return;const dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;
  if(now-moved>2500)tx=W*(.5+.42*Math.sin(T*.42));px+=(tx-px)*.14;
  for(let i=0;i<B.length;i++){const b=B[i],dx=b.x-px,inf=Math.exp(-dx*dx/(2*62*62));b.g+=(1-b.g)*inf*dt*4.2;b.g=Math.max(.07,b.g-dt*.012);}
  draw();raf=requestAnimationFrame(loop);}
function go(){if(!raf&&seen&&!document.hidden&&!reduced){last=performance.now();raf=requestAnimationFrame(loop);}}
size();px=tx=W*.3;
if(reduced){B.forEach(b=>{b.g=.18+.32*(Math.sin(b.x*.01)+1)/2;});draw();}
new ResizeObserver(()=>{size();draw();}).observe(cv);
new IntersectionObserver(([e])=>{seen=e.isIntersecting;if(seen)root.classList.add("is-on");go();},{rootMargin:"100px"}).observe(root);
document.addEventListener("visibilitychange",go);
root.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();tx=e.clientX-r.left;moved=performance.now();go();});
})();`,
},
FX({
  id:"b140", cls:"em", name:"העכבר שורף את המשטח וחושף תמונה בקצה לוהט",
  tech:"WebGL · GLSL · מסכה מקנבס · JS",
  insp:"חריטה בגחלים: העכבר שורף שכבה וחושף תמונה",
  desc:"משטח כהה מכסה תמונה. העכבר שורף בו שביל לא אחיד, בשפה של השביל גחלים זוהרים וסביבן מסגרת חרוכה, ומתחת מתגלה התמונה. אחרי כמה שניות המשטח נסגר לאט, ואפשר לשרוף שוב.",
  when:"ברביקיו, מסעדת עץ ואש, מוזיקה, קעקועים, אמנות וכל מותג שהאש היא חלק מהסיפור. מתי לא: חומר רגיש, ילדים, בריאות, ועמוד שבו התמונה היא מידע שחייבים לראות בלי לעבוד בשבילו. ",
  diff:"g251 מוחק אובייקט אחד בקו קשקוש מוכן מראש, ו-b102 מעלה גצים מקו. כאן הגולש בוחר מה נחשף, והשפה חיה ובוערת.",
  how:"מסכה קטנה בקנבס דו-ממדי מקבלת מכחול רך בכל תזוזה ועולה לכרטיס המסך בכל פריים. השיידר מעוות אותה ברעש, ומהסף גוזר שלושה אזורים: תמונה, גחלים וחריכה.",
  img:"s07/ink-hands.webp", iw:1000, ih:1000, alt:"ידיים מוכתמות בדיו שחור", ratio:"16/7",
  k:"סדנאות דפוס", h:"מה שעובר דרך האש כבר לא חוזר", p:"סדנה של יום שלם בדפוס עץ ובצריבה. יוצאים עם ידיים שחורות ועם משהו שאי אפשר להזמין באינטרנט.", cta:"לתאריכים הקרובים",
  frag:`void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=uv*vec2(ax,1.);
float n=fbm(p*4.+1.);float n2=fbm(p*17.+T*.25);
float m=texture2D(U1,uv).r;float v=m+(n-.5)*.46+(n2-.5)*.1;
vec3 img=texture2D(U0,cov(uv,A0)).rgb;
float grain=fbm(p*38.);vec3 skin=mix(C2,C1,.1)*(.72+.56*grain);
float d=v-.5;
float cut=smoothstep(.0,.012,d);
float char=smoothstep(-.12,-.012,d)*(1.-cut);
vec3 c=mix(skin,skin*.16,char);
c=mix(c,img,cut);
float fl=.72+.28*sin(T*5.+n2*14.);
float hot=smoothstep(.045,.0,abs(d));
c+=vec3(1.,.42,.08)*hot*1.25*fl;c+=vec3(1.,.82,.5)*smoothstep(.014,.0,abs(d))*.8*fl;
c*=1.-.28*cut*smoothstep(.1,.0,d);
gl_FragColor=vec4(c,1.);}`,
  pre:`const mask=document.createElement("canvas");mask.width=360;mask.height=158;const mx2=mask.getContext("2d");mx2.fillStyle="#000";mx2.fillRect(0,0,360,158);
const mgl=root.querySelector("canvas").getContext("webgl");let mtex=null;
function brush(x,y,r,a){const X=x*360,Y=(1-y)*158,g=mx2.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,"rgba(255,255,255,"+a+")");g.addColorStop(1,"rgba(255,255,255,0)");mx2.globalCompositeOperation="lighter";mx2.fillStyle=g;mx2.beginPath();mx2.arc(X,Y,r,0,6.3);mx2.fill();}
function pushMask(){if(!mtex)return;mgl.activeTexture(mgl.TEXTURE1);mgl.bindTexture(mgl.TEXTURE_2D,mtex);mgl.texImage2D(mgl.TEXTURE_2D,0,mgl.RGBA,mgl.RGBA,mgl.UNSIGNED_BYTE,mask);}
function seedMask(){for(let i=0;i<34;i++)brush(.2+i*.018,.46+.17*Math.sin(i*.31),30,.5);}
`,
  opts:`{c:${JSON.stringify(COLS)},imgs:${JSON.stringify([R + "s07/ink-hands.webp"])},rest:[.5,.5],wander:[.36,.26],ease:.1,
ready:function(a){mtex=mgl.createTexture();mgl.activeTexture(mgl.TEXTURE1);mgl.bindTexture(mgl.TEXTURE_2D,mtex);[[mgl.TEXTURE_MIN_FILTER,mgl.LINEAR],[mgl.TEXTURE_MAG_FILTER,mgl.LINEAR],[mgl.TEXTURE_WRAP_S,mgl.CLAMP_TO_EDGE],[mgl.TEXTURE_WRAP_T,mgl.CLAMP_TO_EDGE]].forEach(p=>mgl.texParameteri(mgl.TEXTURE_2D,p[0],p[1]));seedMask();pushMask();a.use(0,0);},
tick:function(dt,a,now,x,y){if(a.H>.2)brush(x,y,27,.5);mx2.globalCompositeOperation="source-over";mx2.fillStyle="rgba(0,0,0,.006)";mx2.fillRect(0,0,360,158);pushMask();}}`,
}),
];
