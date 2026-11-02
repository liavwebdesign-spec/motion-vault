// מהלכים בהשראת Scrolltide (scrolltide.com, 1.11.2026). ליאב: "1, 2, 3 (מומלץ)", "גם 4, 5, 6".
// הרישיון שלהם אוסר הפצה של הקוד, ולכן לא נגענו בו: הכול נבנה מאפס מהתצוגות הציבוריות והתיאורים בלבד.
// קבוצה ב (משפחה 2): רקעים חיים על כרטיס המסך. מנוע אחד קטן (בלי ספרייה), ולכל רקע שיידר משלו.
// הצבעים נקראים מהעור (--bg, --accent, --ink), כך שכל רקע מתלבש על המותג בלי לגעת בשיידר.

const E = "cubic-bezier(.2,.6,.2,1)";
const H1 = "margin:0;font-size:clamp(36px,4.6vw,68px);font-weight:800;line-height:1.05;letter-spacing:-.015em;text-wrap:balance";

// המנוע: קנבס אחד, משולש שמכסה את המסך, ארבעה צבעים מהעור, זמן, ועכבר מוחלק.
// בטלפון ובהפחתת תנועה: פריים אחד קבוע. מחוץ למסך ובלשונית מוסתרת: עוצר.
const ENGINE = `function mvGL(root,frag,o){
  if(!root)return;
  const cv=root.querySelector("canvas"),gl=cv.getContext("webgl",{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:"low-power"});
  if(!gl)return;                                                   // הרקע של ה-CSS נשאר
  const still=matchMedia("(prefers-reduced-motion: reduce)").matches||matchMedia("(max-width:700px),(pointer:coarse)").matches;
  const NOISE="float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}\\n"+
    "vec2 h22(vec2 p){float n=h21(p);return vec2(n,h21(p+n+17.));}\\n"+
    "float vn(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),u.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),u.x),u.y);}\\n"+
    "float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(1.7,9.2);a*=.5;}return s;}\\n"+
    "float gr(){return h21(gl_FragCoord.xy+fract(T)*97.)-.5;}\\n";
  const head="precision highp float;uniform vec2 R,M;uniform float T,H;uniform vec3 C0,C1,C2,C3;\\n"+NOISE;
  function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(x));return null;}return x;}
  const vs=sh(gl.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"),fs=sh(gl.FRAGMENT_SHADER,head+frag);
  if(!vs||!fs)return;
  const pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.bindAttribLocation(pr,0,"a");gl.linkProgram(pr);gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  const U=n=>gl.getUniformLocation(pr,n);
  const px=document.createElement("canvas");px.width=px.height=1;const p2=px.getContext("2d",{willReadFrequently:true});
  const probe=document.createElement("span");probe.hidden=true;root.appendChild(probe);
  function rgb(v){probe.style.color=v;p2.fillStyle="#000";p2.fillStyle=getComputedStyle(probe).color;p2.fillRect(0,0,1,1);const d=p2.getImageData(0,0,1,1).data;return[d[0]/255,d[1]/255,d[2]/255];}
  function cols(){o.c.forEach((v,i)=>gl.uniform3fv(U("C"+i),rgb(v)));}
  let w=1,h=1,mx=.5,my=.5,tm=.5,tn=.5,hv=0,th=0,seen=false,raf=0,last=0,acc=o.t0||6;
  function size(){const s=(still?.5:.6)*Math.min(devicePixelRatio||1,1.5);w=Math.max(1,Math.round(cv.clientWidth*s));h=Math.max(1,Math.round(cv.clientHeight*s));cv.width=w;cv.height=h;gl.viewport(0,0,w,h);}
  function frame(){gl.uniform2f(U("R"),w,h);gl.uniform1f(U("T"),acc);gl.uniform2f(U("M"),mx,my);gl.uniform1f(U("H"),hv);gl.drawArrays(gl.TRIANGLES,0,3);}
  function loop(now){raf=0;if(!seen||document.hidden)return;acc+=Math.min(.05,(now-last)/1000)*(o.speed||1);last=now;mx+=(tm-mx)*.06;my+=(tn-my)*.06;hv+=(th-hv)*.05;frame();raf=requestAnimationFrame(loop);}
  function go(){if(!raf&&seen&&!document.hidden&&!still){last=performance.now();raf=requestAnimationFrame(loop);}}
  size();cols();frame();
  new ResizeObserver(()=>{size();frame();}).observe(cv);
  const mo=new MutationObserver(()=>{cols();frame();});            // החלפת עור מחליפה צבעים
  mo.observe(document.documentElement,{attributes:true});mo.observe(document.body,{attributes:true});
  if(still){root.classList.add("is-gl");return;}           // טלפון או תנועה מופחתת: פריים אחד, בלי לולאה
  new IntersectionObserver(([e])=>{seen=e.isIntersecting;if(seen)root.classList.add("is-gl");go();}).observe(root);   // הקנבס נכנס בהדרגה כשהסקשן נראה
  document.addEventListener("visibilitychange",go);
  root.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const r=root.getBoundingClientRect();tm=(e.clientX-r.left)/r.width;tn=1-(e.clientY-r.top)/r.height;th=1;});
  root.addEventListener("pointerleave",()=>{th=0;});
}`;

const COMMON_NOTE = "**המנוע** (משותף לרקעים, בלי ספרייה): קנבס WebGL אחד ומשולש אחד שמכסה אותו, והשיידר מצייר כל פיקסל. הקנבס מרונדר ב-60% מהרזולוציה (רקע רך לא צריך יותר) ונמתח ב-CSS. **הצבעים** נקראים מהעור: `--bg`, `--accent`, `--ink` וגוון ביניים, דרך אלמנט בדיקה וקנבס של פיקסל אחד, כך שכל פורמט צבע עובד; החלפת עור מציירת מחדש. **העכבר** מוחלק (0.06 בכל פריים) ונכנס לשיידר כ-`M`, ועוצמת הריחוף כ-`H`. **עוצר** מחוץ למסך ובלשונית מוסתרת. **בטלפון ובהפחתת תנועה:** פריים אחד קבוע, בלי לולאה. **בלי WebGL או בלי JS:** גרדיאנט CSS באותם צבעים. **כלל:** רקע אחד כזה לעמוד, ולא מתחת לטקסט ארוך.";

const BG = (o) => {
  const c = o.cls, dark = !!o.dark;
  return {
    id:o.id, cat:"behavior", name:o.name, tech:"WebGL · GLSL · JS", status:"ממתין", runway:false,
    desc:o.desc, when:o.when,
    note:`**שחזור.** השראה: Scrolltide (1.11.2026), ${o.insp}. נבנה מאפס. **במה זה שונה ממה שיש:** ${o.diff} **השיידר:** ${o.how} ${COMMON_NOTE}`,
    libs:[],
    css:`.${c}{position:relative;isolation:isolate;display:grid;align-content:${o.align || "center"};min-height:min(82vh,760px);padding:clamp(40px,6vw,96px) clamp(20px,5vw,72px);border-radius:clamp(20px,2.4vw,32px);overflow:hidden;background:${o.fb};color:${dark ? "var(--bg)" : "var(--ink)"}}
.${c}>canvas{position:absolute;inset:0;z-index:-1;width:100%;height:100%;opacity:0;transition:opacity .8s ${E}}
.${c}.is-gl>canvas{opacity:1}
.${c}-tx{display:grid;gap:18px;max-width:${o.tw || "32rem"};justify-self:${o.side || "start"};text-align:${o.side === "center" ? "center" : "start"}}
.${c}-k{margin:0;font-size:15px;font-weight:700;letter-spacing:.04em;color:${dark ? "color-mix(in srgb,var(--bg) 78%,var(--accent))" : "var(--accent)"}}
.${c}-tx h2{${H1}}
.${c}-tx p{margin:0;font-size:var(--fs-body);line-height:1.6;color:${dark ? "color-mix(in srgb,var(--bg) 78%,var(--ink))" : "var(--muted)"}}
.${c}-cta{justify-self:${o.side === "center" ? "center" : "start"};display:inline-flex;align-items:center;min-height:48px;padding:12px 24px;border-radius:999px;background:${dark ? "var(--bg)" : "var(--ink)"};color:${dark ? "var(--ink)" : "var(--bg)"};font-weight:700;text-decoration:none}
.${c}-cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}`,
    html:`<div class="stage"><section class="${c}" data-${c}${o.vars ? ` style="${o.vars}"` : ""}>
  <canvas aria-hidden="true"></canvas>
  <div class="${c}-tx">
    <p class="${c}-k">${o.k}</p>
    <h2>${o.h}</h2>
    <p>${o.p}</p>
    <a class="${c}-cta" href="#">${o.cta}</a>
  </div>
</section></div>`,
    js:`(function(){
${ENGINE}
mvGL(document.querySelector("[data-${c}]"),${JSON.stringify(o.frag)},{c:${JSON.stringify(o.cols)},t0:${o.t0 || 6},speed:${o.speed || 1}});
})();`,
  };
};

const LIGHT = ["var(--bg)", "color-mix(in srgb,var(--accent) 55%,var(--bg))", "var(--ink)", "color-mix(in srgb,var(--accent) 25%,var(--bg))"];
const DARK = ["var(--bg)", "var(--accent)", "color-mix(in srgb,var(--ink) 92%,var(--accent))", "color-mix(in srgb,var(--accent) 55%,var(--bg))"];

export default [
BG({
  id:"b116", cls:"mg", name:"רקע גרדיאנט רשת שזורם לאט", insp:"רקע Mesh Gradient של צבעים שזורמים זה לתוך זה",
  desc:"רקע של ארבעה כתמי צבע רכים שנודדים לאט ונמסים זה לתוך זה, כמו צבע מים על נייר רטוב, עם גרעין עדין. כתם אחד נמשך לאט לכיוון העכבר. הצד שבו יושב הטקסט נשאר בהיר ושקט.",
  when:"הירו של אפליקציה, סטארטאפ, קליניקה או מותג רך, כשאין צילום חזק ורוצים שהמסך הראשון ירגיש חי ולא שטוח. מתי לא: כשיש צילום טוב (הוא תמיד עדיף), או מותג קשוח ותעשייתי.",
  diff:"css31 מזיז שלושה כתמים מטושטשים ב-CSS, והם נשארים עיגולים. כאן כל פיקסל הוא שקלול של ארבע נקודות צבע לפי מרחק, על מרחב מעוות ברעש, ולכן הגבולות זורמים ומתעקלים, ונקודה אחת נמשכת לעכבר.",
  how:"ארבע נקודות נעות במסלולי ליסז'ו איטיים; משקל כל נקודה הוא אחד חלקי המרחק בריבוע, והצבע הוא הממוצע המשוקלל. לפני החישוב המרחב מעוות ב-fbm, ומעל הכול גרעין של 3.5%. נקודת הרקע יושבת בצד הטקסט, ולכן הניגודיות שם נשמרת.",
  fb:"radial-gradient(70% 90% at 15% 30%,color-mix(in srgb,var(--accent) 45%,var(--bg)),transparent),radial-gradient(60% 80% at 40% 90%,color-mix(in srgb,var(--accent) 25%,var(--bg)),transparent),var(--bg)",
  k:"תורים לקליניקות", h:"המטופלים קובעים לבד, ואתם מפסיקים לענות לטלפון", p:"יומן אחד לכל המטפלים, תזכורת בוואטסאפ יום לפני, ורשימת המתנה שממלאת ביטולים לבד.", cta:"לנסות חודש בחינם",
  cols:LIGHT,
  frag:`void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;
vec2 q=uv+.14*(vec2(fbm(uv*1.8+T*.04),fbm(uv*1.8-T*.05+3.))-.5);q.x*=ax;
vec2 p0=vec2(ax*(.8+.08*sin(T*.13)),.62+.1*cos(T*.11));
vec2 p1=vec2(ax*(.15+.1*cos(T*.17)),.3+.2*sin(T*.09));
vec2 p2=vec2(ax*(.4+.15*sin(T*.07+2.)),.85+.1*cos(T*.15));
vec2 p3=mix(vec2(ax*(.3+.15*cos(T*.1+1.)),.2+.15*sin(T*.12)),vec2(M.x*ax,M.y),.45*H);
float w0=2.2/pow(length(q-p0)+.1,2.),w1=1./pow(length(q-p1)+.1,2.),w2=1./pow(length(q-p2)+.1,2.),w3=1./pow(length(q-p3)+.1,2.);
vec3 c=(C0*w0+C1*w1+C3*w2+mix(C1,C2,.18)*w3)/(w0+w1+w2+w3);
gl_FragColor=vec4(c+gr()*.035,1.);}`,
}),
BG({
  id:"b120", cls:"fl", name:"אש שעולה מתחתית הסקשן", insp:"רקע Flame של להבות רכות",
  desc:"להבות רכות עולות מתחתית הסקשן על רקע כהה, בגוון של המותג, עם ליבה בהירה ונצנוץ. הן לא מצוירות כציור אלא כאש אמיתית שמשנה צורה כל הזמן. העכבר מטה אותן מעט לצדו, כמו רוח.",
  when:"מסעדת גריל או עץ, מאפייה עם תנור, נפחות, קפה קלוי, אירוע ערב, או השקה עם אנרגיה חמה. מתי לא: כל עסק שאש היא אסוציאציה רעה (ביטוח, בטיחות), או עמוד בהיר שכל שאר הסקשנים בו שקטים.",
  diff:"b102 מעלה גצים בודדים מקו זוהר. כאן גוף האש עצמו: שדה רעש שזורם למעלה ונחתך בגובה, כך שיש לשונות אש ולא נקודות.",
  how:"fbm שזורם כלפי מעלה (הזמן מוחסר מ-y), מעוות ב-fbm שני; העוצמה היא הרעש כפול המרחק מהחלק העליון, דרך smoothstep. העוצמה עוברת בין הרקע הכהה, גוון המותג וליבה בהירה, ועוד זוהר עדין בבסיס.",
  fb:"linear-gradient(to top,color-mix(in srgb,var(--accent) 45%,var(--ink)),var(--ink) 55%)",
  k:"גריל עצים · נמל תל אביב", h:"הכול נצלה על עץ זית, מול העיניים שלכם", p:"נתחים מקצב שאנחנו מכירים בשם, ירקות מהשוק של הבוקר, ואש שנדלקת בחמש אחר הצהריים.", cta:"להזמנת שולחן", align:"start", dark:true, vars:"--accent:#e8692c",
  cols:DARK, speed:.9,
  frag:`void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=vec2(uv.x*ax,uv.y);
float mx=(M.x-uv.x)*H;
vec2 q=vec2(p.x*2.2+mx*.7*uv.y,p.y*1.6-T*.9);
float n=fbm(q+fbm(q*1.5+T*.2)*.8);
float f=smoothstep(.18,.95,n*(1.-uv.y)*2.-uv.y*.3);
vec3 c=mix(C2,C1,smoothstep(0.,.5,f));c=mix(c,mix(C1,C0,.65),smoothstep(.55,1.,f));
c+=C1*.14*smoothstep(.45,0.,uv.y);
gl_FragColor=vec4(c+gr()*.03,1.);}`,
}),
BG({
  id:"b122", cls:"nb", name:"כתמי צבע שנמסים זה לזה ונמשכים לעכבר", insp:"רקע Noise Blobs של כתמים רכים",
  desc:"חמישה כתמים רכים בצבע המותג צפים בצד המסך, ונמסים זה לתוך זה כשהם נפגשים, כמו טיפות שמן במים. העכבר הוא כתם שישי שלא רואים: כשמתקרבים, הכתמים נמשכים אליו ומתחברים אליו.",
  when:"סטודיו יצירה, קרמיקה, מוצרי טיפוח, מעדנייה, מותג לילדים, או כל מותג רך ושובב. מתי לא: מותג רציני ומדויק, או עמוד שבו העכבר כבר עושה משהו אחר.",
  diff:"b79 מקיף כתם מרכזי בעיגולים שמתמזגים אליו, במסלול קבוע. כאן אין מרכז: חמישה כתמים נודדים חופשי בצד אחד, והעכבר מצטרף אליהם כשדה כוח, כך שהמבקר משחק בהם.",
  how:"מטבולים: כל כתם תורם רדיוס בריבוע חלקי מרחק בריבוע, והסכום נחתך בסף רך. הפנים צבוע בגרדיאנט בין גוון המותג לגוון ביניים, וסביב הקצה טבעת בהירה דקה. העכבר מוסיף לסכום תרומה לפי עוצמת הריחוף.",
  fb:"radial-gradient(28% 40% at 22% 45%,color-mix(in srgb,var(--accent) 55%,var(--bg)) 60%,transparent 62%),radial-gradient(18% 26% at 42% 65%,color-mix(in srgb,var(--accent) 45%,var(--bg)) 60%,transparent 62%),var(--bg)",
  k:"סטודיו לקרמיקה · יפו", h:"אחרי שעתיים על האובניים, הידיים נרגעות", p:"סדנאות ערב לזוגות ולחברים, קבוצות של שישה, והכלים נשרפים ומחכים לכם אחרי שבוע.", cta:"לסדנה הקרובה",
  cols:LIGHT, speed:1,
  frag:`void main(){vec2 p=gl_FragCoord.xy/R.y;float ax=R.x/R.y;float f=0.;
for(int i=0;i<5;i++){float fi=float(i);vec2 c=vec2(ax*(.12+.1*fi+.07*sin(T*.3+fi*2.1)),.5+.27*sin(T*.23+fi*1.3));float r=.12+.035*sin(fi*3.1);vec2 d=p-c;f+=r*r/dot(d,d);}
vec2 mm=vec2(M.x*ax,M.y);vec2 dm=p-mm;f+=H*.018/dot(dm,dm);
float a=smoothstep(.92,1.04,f);
vec3 inside=mix(C1,C3,clamp(p.y*1.1+.1*sin(T*.2),0.,1.));
float rim=smoothstep(.92,1.,f)-smoothstep(1.,1.5,f);
vec3 c=mix(C0,inside,a)+rim*.05;
gl_FragColor=vec4(c+gr()*.04,1.);}`,
}),
BG({
  id:"b123", cls:"lc", name:"קרני במה שיורדות מלמעלה", insp:"רקע Light Cove של נתיבי אור",
  desc:"שש קרני אור יורדות מלמעלה על רקע כהה, כמו פנסים מעל במה, ומתרחבות ונמוגות כלפי מטה. הן נושמות כל אחת בקצב משלה, ואבק דק מרחף בתוכן. העכבר מטה את כל הקרניים לצדו, כאילו מישהו מסובב את הפנסים.",
  when:"אולם הופעות, תיאטרון, אירוע השקה, גלריה, מותג בידור או אופנת ערב. מתי לא: עמוד שמוכר בהירות ופשטות, או כשהכותרת ארוכה (הקרניים צריכות אוויר).",
  diff:"g273 פותח קרני שמש מעיגול במרכז, בגלילה. כאן הקרניים מקבילות ויורדות מלמעלה כמו תאורת במה, כל אחת נושמת לחוד, והעכבר מכוון אותן.",
  how:"לכל קרן מרכז שנודד מעט; המרחק האופקי ממנו (עם הטיה שגדלה כלפי מטה) עובר דרך גאוסיאן שהרוחב שלו גדל כלפי מטה, והבהירות דועכת עם הגובה. האבק הוא fbm בחזקה שישית, כך שרק נקודות מעטות בוהקות.",
  fb:"linear-gradient(to bottom,color-mix(in srgb,var(--accent) 22%,var(--ink)),var(--ink) 70%)",
  k:"אולם ההופעות של הנמל", h:"העונה החדשה נפתחת בנובמבר", p:"שלושים ערבים, ארבע הפקות מקור ומקום ל-600 איש. מנויים בוחרים מושב לפני כולם.", cta:"למנוי לעונה", side:"center", tw:"38rem", align:"end", dark:true,
  cols:DARK, speed:1,
  frag:`void main(){vec2 uv=gl_FragCoord.xy/R;float ax=R.x/R.y;vec2 p=vec2(uv.x*ax,uv.y);
vec3 c=C2;float tilt=(M.x-.5)*H*.6;
for(int i=0;i<6;i++){float fi=float(i);
float cx=ax*(.08+fi*.168)+.04*sin(T*.25+fi*1.9);
float x=p.x-cx-(1.-uv.y)*(tilt+.14*sin(fi*2.3));
float w=.018+.11*(1.-uv.y);
float b=exp(-x*x/(w*w))*smoothstep(.0,.95,uv.y)*(.55+.45*sin(T*.45+fi*3.))*1.05;
c+=mix(C1,C3,mod(fi,2.))*b;}
float dust=fbm(p*7.+vec2(0.,T*.06));c+=C3*pow(dust,6.)*.9;
c+=C1*.05*(1.-uv.y);
gl_FragColor=vec4(c+gr()*.03,1.);}`,
}),
];
