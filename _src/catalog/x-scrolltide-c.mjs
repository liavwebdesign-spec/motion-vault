// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה ג (משפחה 3): אפקטים על תמונה אמיתית שמגיבים לעכבר. מנוע אחד (בלי ספרייה), שיידר לכל מהלך.
// המנוע מיוצא גם לקבוצות ד (מעברים) ו-ה (חלקיקים).

const E = "cubic-bezier(.2,.6,.2,1)";
const H1 = "margin:0;font-size:clamp(34px,4.4vw,64px);font-weight:800;line-height:1.05;letter-spacing:-.015em;text-wrap:balance";
export const R = "../assets/media/real/";
export const COLS = ["var(--bg)", "var(--accent)", "var(--ink)", "color-mix(in srgb,var(--accent) 25%,var(--bg))"];

// המנוע: קנבס אחד, עד ארבע תמונות, ארבעה צבעים מהעור, זמן, עכבר מוחלק ושובל של 24 נקודות.
// בטלפון ובהפחתת תנועה: פריים אחד קבוע (מעברים רצים גם בטלפון, כי הם אירוע קצר). בלי WebGL או JS: התמונה הרגילה.
export const TEX = `function mvTex(root,frag,o){
  if(!root)return null;
  const cv=root.querySelector("canvas"),gl=cv.getContext("webgl",{alpha:!!o.alpha,antialias:false,depth:false,stencil:false,powerPreference:"low-power"});
  if(!gl)return null;                                              // התמונה הרגילה נשארת
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const still=reduced||(!o.events&&matchMedia("(max-width:700px),(pointer:coarse)").matches);
  const G="float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\\n"+
    "float vn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),u.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),u.x),u.y);}\\n"+
    "float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.03+vec2(17.,9.);a*=.5;}return s;}\\n"+
    "vec2 cov(vec2 uv,float a){float r=R.x/R.y;vec2 s=r>a?vec2(1.,a/r):vec2(r/a,1.);return (uv-.5)*s+.5;}\\n";
  const head="precision highp float;uniform vec2 R,M;uniform float T,H,P,I,A0,A1,A2,A3;uniform vec3 C0,C1,C2,C3;uniform sampler2D U0,U1,U2,U3;uniform vec3 V[24];\\n"+G;
  function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(x));return null;}return x;}
  const vs=sh(gl.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"),fs=sh(gl.FRAGMENT_SHADER,head+frag);
  if(!vs||!fs)return null;
  const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.bindAttribLocation(pr,0,"a");gl.linkProgram(pr);gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  const U=n=>gl.getUniformLocation(pr,n);
  const px=document.createElement("canvas");px.width=px.height=1;const p2=px.getContext("2d",{willReadFrequently:true});
  const probe=document.createElement("span");probe.hidden=true;root.appendChild(probe);
  function rgb(v){probe.style.color=v;p2.fillStyle="#000";p2.fillStyle=getComputedStyle(probe).color;p2.fillRect(0,0,1,1);const d=p2.getImageData(0,0,1,1).data;return[d[0]/255,d[1]/255,d[2]/255];}
  function cols(){(o.c||[]).forEach((v,i)=>gl.uniform3fv(U("C"+i),rgb(v)));}
  [0,1,2,3].forEach(i=>gl.uniform1i(U("U"+i),i));
  const rest=o.rest||[.5,.5],V=new Float32Array(72),tx=[],asp=[];
  let w=1,h=1,mx=rest[0],my=rest[1],tm=mx,tn=my,seen=false,ready=false,started=false,raf=0,last=0,acc=o.t0||0,moved=-1e9,vi=0,lx=9,ly=9,video=null;
  const api={P:o.p0||0,I:0,H:0,th:0,busy:false,V,still,reduced,over:false,kick:go,draw:frame,use};
  function use(unit,i){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tx[i]);gl.uniform1f(U("A"+unit),asp[i]);}
  function mark(x,y){if(Math.hypot(x-lx,y-ly)<(o.gap||.03))return;lx=x;ly=y;V[vi*3]=x;V[vi*3+1]=y;V[vi*3+2]=1;vi=(vi+1)%24;}
  api.mark=mark;
  function size(){const s=Math.min(devicePixelRatio||1,o.dpr||1.5);w=Math.max(1,Math.round(cv.clientWidth*s));h=Math.max(1,Math.round(cv.clientHeight*s));cv.width=w;cv.height=h;gl.viewport(0,0,w,h);}
  function frame(){
    if(video&&video.readyState>=2){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tx[0]);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);gl.uniform1f(U("A0"),video.videoWidth/video.videoHeight);}
    gl.uniform2f(U("R"),w,h);gl.uniform1f(U("T"),acc);gl.uniform2f(U("M"),mx,my);gl.uniform1f(U("H"),api.H);gl.uniform1f(U("P"),api.P);gl.uniform1f(U("I"),api.I);gl.uniform3fv(U("V"),V);
    if(o.alpha)gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  function loop(now){
    raf=0;if(!seen||document.hidden||!ready)return;
    const dt=Math.min(.05,(now-last)/1000);last=now;acc+=dt*(o.speed||1);
    if(o.wander&&now-moved>2500){tm=rest[0]+o.wander[0]*Math.sin(acc*.5);tn=rest[1]+o.wander[1]*Math.sin(acc*.73+1);api.th=1;mark(tm,tn);}
    mx+=(tm-mx)*(o.ease||.09);my+=(tn-my)*(o.ease||.09);api.H+=(api.th-api.H)*.06;
    const dc=o.decay||.97;for(let i=0;i<24;i++)V[i*3+2]*=dc;
    if(o.tick)o.tick(dt,api,now,mx,my);
    frame();
    if(!o.events||api.busy)raf=requestAnimationFrame(loop);
  }
  function go(){if(!raf&&ready&&seen&&!document.hidden&&(!still||o.events)){last=performance.now();raf=requestAnimationFrame(loop);}}
  function reveal(){if(ready&&seen)root.classList.add("is-gl");}
  function upload(src){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,src);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t;}
  function strip(ims){const H0=640,cw=o.cell||740,gp=o.cellGap||28,c=document.createElement("canvas");c.width=(cw+gp)*ims.length;c.height=H0;const x=c.getContext("2d");
    ims.forEach((im,i)=>{const a=cw/H0,ia=im.naturalWidth/im.naturalHeight;let sw=im.naturalWidth,sh=im.naturalHeight;if(ia>a)sw=sh*a;else sh=sw/a;x.drawImage(im,(im.naturalWidth-sw)/2,(im.naturalHeight-sh)/2,sw,sh,(cw+gp)*i+gp/2,0,cw,H0);});return c;}
  function load(){
    if(started)return;started=true;
    Promise.all(o.imgs.map(s=>new Promise((res,rej)=>{const im=new Image();im.crossOrigin="anonymous";im.onload=()=>res(im);im.onerror=rej;im.src=s;}))).then(ims=>{
      if(o.strip){const c=strip(ims);tx.push(upload(c));asp.push(c.width/c.height);}
      else ims.forEach(im=>{tx.push(upload(im));asp.push(im.naturalWidth/im.naturalHeight);});
      tx.slice(0,4).forEach((_,i)=>use(i,i));
      if(o.video&&!still){video=document.createElement("video");video.muted=true;video.loop=true;video.playsInline=true;video.crossOrigin="anonymous";video.preload="none";video.src=o.video;}
      size();cols();ready=true;
      if(o.seed)o.seed(api);
      if(still&&!o.events)api.H=1;
      if(o.ready)o.ready(api);
      frame();reveal();go();syncVideo();
    }).catch(()=>{});                                               // תמונה שלא נטענה: נשארים על התמונה הרגילה
  }
  function syncVideo(){if(!video)return;if(seen&&!document.hidden){const p=video.play();if(p&&p.catch)p.catch(()=>{});}else video.pause();}
  new ResizeObserver(()=>{if(ready){size();frame();}}).observe(cv);
  new MutationObserver(()=>{if(ready){cols();frame();}}).observe(document.documentElement,{attributes:true});
  new IntersectionObserver(([e])=>{seen=e.isIntersecting;if(seen){load();reveal();}go();syncVideo();},{rootMargin:"200px"}).observe(root);
  document.addEventListener("visibilitychange",()=>{go();syncVideo();});
  if(!still){
    const box=o.area?(root.matches(o.area)?root:root.querySelector(o.area)):cv.parentElement;
    box.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const r=cv.getBoundingClientRect();tm=(e.clientX-r.left)/r.width;tn=1-(e.clientY-r.top)/r.height;moved=performance.now();api.over=true;if(!o.manualH)api.th=1;mark(tm,tn);if(!raf)go();});
    box.addEventListener("pointerleave",()=>{api.over=false;if(!o.manualH)api.th=0;});
  }
  return api;
}`;

const COMMON = "**המנוע:** WebGL גולמי בלי ספרייה, קנבס אחד, והצבעים נקראים מהעור. **ביצועים:** עוצר מחוץ למסך ובלשונית מוסתרת, והתמונות נטענות רק כשהסקשן מתקרב. **טלפון והפחתת תנועה:** פריים אחד קבוע במצב מייצג. **בלי WebGL או JS:** התמונה הרגילה נשארת במקום. לא יותר מקנבס WebGL אחד בעמוד.";

// תבנית: טקסט ומדיה. wide = כותרת מעל ותמונה רחבה, split = שתי עמודות.
export const FX = (o) => {
  const c = o.cls, wide = o.layout !== "split";
  return {
    id:o.id, cat:"behavior", name:o.name, tech:o.tech || "WebGL · GLSL · תמונה אמיתית · JS", status:"ממתין", runway:false,
    desc:o.desc, when:o.when,
    note:`**שחזור.** השראה: Scrolltide (1.11.2026), ${o.insp}. נבנה מאפס. **במה זה שונה ממה שיש:** ${o.diff} **השיידר:** ${o.how} ${o.common || COMMON}`,
    libs:[],
    css:`.${c}{display:grid;gap:clamp(24px,3vw,48px);${wide ? "" : "grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);align-items:center;"}padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px)}
.${c}-tx{display:grid;gap:16px;${wide ? "grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:end;column-gap:clamp(24px,4vw,64px)" : ""}}
.${c}-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent)${wide ? ";grid-column:1/-1" : ""}}
.${c}-tx h2{${H1}}
.${c}-side{display:grid;gap:16px;justify-items:start}
.${c}-side p{margin:0;font-size:var(--fs-body);line-height:1.6;color:var(--muted)}
.${c}-cta{display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:var(--ink);color:var(--bg);font-weight:700;text-decoration:none}
.${c}-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.${c}-m{position:relative;overflow:hidden;border-radius:clamp(16px,2vw,28px);aspect-ratio:${o.ratio || (wide ? "16/8" : "4/5")};background:var(--surface,var(--bg));${o.cursor ? `cursor:${o.cursor};` : ""}${o.touch ? `touch-action:${o.touch};` : ""}}
.${c}-m img,.${c}-m canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.${c}-m img{object-fit:cover}
.${c}-m canvas{opacity:0;transition:opacity .7s ${E}}
.${c}.is-gl .${c}-m canvas{opacity:1}
${o.css || ""}
@media(max-width:800px){.${c}{grid-template-columns:minmax(0,1fr)}.${c}-tx{grid-template-columns:minmax(0,1fr)}.${c}-m{aspect-ratio:${o.ratioM || "4/5"}}}
@media(prefers-reduced-motion:reduce){.${c}-m canvas{transition:none}}`,
    html:`<div class="stage"><section class="${c}" data-${c}>
  <div class="${c}-tx">
    <p class="${c}-k">${o.k}</p>
    <h2>${o.h}</h2>
    <div class="${c}-side"><p>${o.p}</p><a class="${c}-cta" href="#">${o.cta}</a></div>
  </div>
  <div class="${c}-m">
    <img src="${R}${o.img}" width="${o.iw}" height="${o.ih}" alt="${o.alt}" decoding="async" loading="lazy">
    <canvas aria-hidden="true"></canvas>${o.extra || ""}
  </div>
</section></div>`,
    js:`(function(){
${TEX}
const root=document.querySelector("[data-${c}]");
${o.pre || ""}mvTex(root,${JSON.stringify(o.frag)},${o.opts});
})();`,
  };
};

const IMGS = (a) => JSON.stringify(a.map((s) => R + s));

export default [
FX({
  id:"b125", cls:"dt", name:"תמונה מנוקדת בשני צבעים עם עדשה שמגלה את האמת",
  insp:"אפקט דיתר (dither) עם עדשה שעוקבת אחרי העכבר",
  desc:"כל התמונה מצוירת בנקודות של שני צבעים בלבד, כמו הדפסה ישנה, בצבעי המותג. עיגול רך עוקב אחרי העכבר ומראה דרכו את התמונה האמיתית בצבע מלא.",
  when:"הירו או סקשן של אמנות, מוזיקה, תרבות, עיתון, כשהמותג נועז ויש צילום עם ניגוד חזק. מתי לא: מותג רפואי או שמרני, וצילום בהיר ודל ניגוד שמתפרק לנקודות בלי צורה. ",
  diff:"g11 מגדיל, ושאר אפקטי המסכה במאגר חושפים תמונה מתחת לצבע אחיד. כאן השכבה העליונה היא אותה תמונה ממש בשפה אחרת.",
  how:"מטריצת באייר 8 על 8 מחליטה לכל ריבוע של 3 פיקסלים אם הוא כהה או בהיר לפי הבהירות של התמונה. בתוך העדשה דוגמים את התמונה עצמה עם הגדלה קלה.",
  img:"s06/singer.webp", iw:1800, ih:1012, alt:"זמרת על במה חשוכה מול אורות זהובים",
  k:"פסטיבל קיץ", h:"שלושה לילות, במה אחת, ובלי שידור חוזר", p:"ההרכבים הגדולים של השנה על החוף. הכרטיסים נמכרים בגלים, והגל הראשון כבר בדרך החוצה.", cta:"לתוכנייה",
  frag:`float b2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}
float b4(vec2 a){return b2(.5*a)*.25+b2(a);}
float b8(vec2 a){return b4(.5*a)*.25+b2(a);}
void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;
vec3 t=texture2D(U0,cov(uv,A0)).rgb;float l=dot(t,vec3(.3,.59,.11));
float d=b8(gl_FragCoord.xy/3.)*.86+.07;
vec3 lo=mix(C2,C1,.12),hi=mix(C0,C1,.28);
vec3 c=l*1.35>d?hi:lo;
vec2 p=(uv-M)*vec2(ax,1.);float r=.2+.05*H+.006*sin(T*1.3);float m=smoothstep(r,r-.01,length(p))*step(.01,H);
vec3 lens=texture2D(U0,cov(M+(uv-M)*.86,A0)).rgb;
gl_FragColor=vec4(mix(c,lens,m),1.);}`,
  opts:`{c:${JSON.stringify(COLS)},imgs:${IMGS(["s06/singer.webp"])},rest:[.68,.55],wander:[.22,.2]}`,
}),
(() => {
  const ROWS = [["בית הירדן", "וילה פרטית, 2025", "s13/proj-a.webp", 1800, 1200, "סלון כהה עם ספה נמוכה"], ["מרפסת ברמת גן", "פנטהאוז, 2024", "s13/proj-b.webp", 1200, 1600, "פינה כהה עם צמח, מראה עגולה ומנורה"], ["מטבח שחור", "שיפוץ מלא, 2024", "s13/proj-c.webp", 2400, 1026, "מטבח שחור מרווח עם אי באמצע"], ["חדר קריאה", "דירת גן, 2023", "s13/room.webp", 2200, 1469, "חדר קריאה חשוך עם כורסה ומנורה"]];
  return {
    id:"b129", cat:"behavior", name:"גלריית רשימה שתמונה נוזלית נפתחת בה ליד העכבר", tech:"WebGL · GLSL · מטאבולס · pointer", status:"ממתין", runway:false,
    desc:"רשימת פרויקטים גדולה. במעבר על שורה נפתחת ליד העכבר תמונה של הפרויקט בצורת טיפה נוזלית: שלושה כתמים שנמשכים זה אחרי זה ומתמזגים. במעבר לשורה אחרת הטיפה מתחלפת, וכשיוצאים היא נסגרת.",
    when:"תיק עבודות או רשימת פרויקטים של סטודיו, כשכל פרויקט הוא שם ברור ותמונה חזקה. מתי לא: מעל 8 שורות, וכשאין תמונה טובה לכל פרויקט. בטלפון אין הובר, ולכן כל שורה מקבלת תמונה משלה בתוך הרשימה. ",
    note:`**שחזור.** השראה: Scrolltide (1.11.2026), גלריה שחושפת תמונה בהובר עם קצה נוזלי. נבנה מאפס. **במה זה שונה ממה שיש:** b79 מראה טיפות צבע, וההוברים במאגר חושפים תמונה מלבנית. כאן התמונה יושבת בתוך טיפה חיה שנגררת באיחור. **השיידר:** ארבעה כתמים בשרשרת של איחור נסכמים לשדה אחד, וסף על השדה נותן את קצה הטיפה. הקנבס שקוף ויושב מתחת לטקסט. ${COMMON}`,
    libs:[],
    css:`.gy{position:relative;display:grid;gap:clamp(20px,3vw,40px);padding:clamp(24px,4vw,64px) clamp(20px,5vw,72px);isolation:isolate}
.gy>canvas{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;opacity:0;transition:opacity .4s ${E}}
.gy.is-gl>canvas{opacity:1}
.gy-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:var(--accent)}
.gy h2{margin:0;font-size:clamp(28px,3.2vw,44px);font-weight:800;line-height:1.1}
.gy ul{list-style:none;margin:0;padding:0;display:grid;width:min(100%,560px)}
.gy-row{display:grid;grid-template-columns:minmax(0,1fr);gap:4px;padding:clamp(16px,1.6vw,24px) 0;text-decoration:none;color:var(--ink)}
.gy-row b{font-size:clamp(28px,3.4vw,52px);font-weight:800;line-height:1.1;transition:transform .35s ${E}}
.gy-row span{font-size:15px;color:var(--muted)}
.gy-row:hover b,.gy-row:focus-visible b{transform:translateX(-10px)}
.gy-row:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.gy-row img{display:none;width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:14px;margin-block-start:10px}
@media(max-width:800px),(hover:none){.gy>canvas{display:none}.gy-row img{display:block}}
@media(prefers-reduced-motion:reduce){.gy-row b{transition:none}}`,
    html:`<div class="stage"><section class="gy" data-gy>
  <canvas aria-hidden="true"></canvas>
  <p class="gy-k">עבודות נבחרות</p>
  <h2>ארבעה בתים, ארבעה סיפורים</h2>
  <ul>
${ROWS.map((r, i) => `    <li><a class="gy-row" href="#" data-i="${i}"><b>${r[0]}</b><span>${r[1]}</span><img src="${R}${r[2]}" width="${r[3]}" height="${r[4]}" alt="${r[5]}" loading="lazy" decoding="async"></a></li>`).join("\n")}
  </ul>
</section></div>`,
    js:`(function(){
${TEX}
const root=document.querySelector("[data-gy]");
if(matchMedia("(max-width:800px),(hover:none)").matches)return;   // הטלפון מקבל תמונה בתוך כל שורה
let apiRef=null,cur=0;const B=[[.26,.5],[.26,.5],[.26,.5],[.26,.5]];let tgt=[.26,.5];
const a=mvTex(root,${JSON.stringify(`void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=uv*vec2(ax,1.);float f=0.;
float rs=.17*H;
for(int i=0;i<4;i++){vec2 d=p-V[i].xy*vec2(ax,1.);float r=rs*(1.-float(i)*.2)*(1.+.08*sin(T*1.7+float(i)*2.));f+=r*r/max(dot(d,d),1e-4);}
float al=smoothstep(1.,1.12,f);
vec2 c=(p-V[0].xy*vec2(ax,1.))*1.5+.5;
float ia=I<.5?A0:I<1.5?A1:I<2.5?A2:A3;vec2 s=ia>1.?vec2(1./ia,1.):vec2(1.,ia);vec2 q=(c-.5)*s+.5;
vec4 t=I<.5?texture2D(U0,q):I<1.5?texture2D(U1,q):I<2.5?texture2D(U2,q):texture2D(U3,q);
gl_FragColor=vec4(t.rgb*al,al);}`)},{alpha:true,area:".gy",manualH:true,c:${JSON.stringify(COLS)},imgs:${IMGS(ROWS.map((r) => r[2]))},
  ready:function(x){apiRef=x;x.th=1;},
  tick:function(dt,x,now,mx,my){tgt=[.2+mx*.16,my];for(let i=0;i<4;i++){const s=i?B[i-1]:tgt,e=i?.16:.14;B[i][0]+=(s[0]-B[i][0])*e;B[i][1]+=(s[1]-B[i][1])*e;x.V[i*3]=B[i][0];x.V[i*3+1]=B[i][1];x.V[i*3+2]=1;}x.I=cur;}});
if(!a)return;
root.querySelectorAll(".gy-row").forEach(r=>{const on=()=>{cur=+r.dataset.i;if(apiRef)apiRef.th=1;};r.addEventListener("pointerenter",on);r.addEventListener("focus",on);r.addEventListener("pointerleave",()=>{if(apiRef)apiRef.th=0;});r.addEventListener("blur",()=>{if(apiRef)apiRef.th=0;});});
})();`,
  };
})(),
];
