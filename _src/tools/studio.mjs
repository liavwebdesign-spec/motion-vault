#!/usr/bin/env node
// studio.mjs: בודק אוטומטי לרף הסטודיו (design-dna/references/engine/studio-bar.md, 30 סעיפים, 7 חובה).
//
// למה: הרף נמדד פעם אחת בחיים (s05, 30/30) כי המדידה הייתה ידנית. שני שלישים מהסעיפים
// מדידים בקוד מתוך העמוד המרונדר: יחס H1 לגוף, מספר משקלים, סולם ריווח, מצבי כפתור, משכי
// תנועה, גובה פוטר. הכלי מודד את מה שמדיד, ואומר במפורש מה נשאר לעין. הציון אינו "עבר",
// הוא "X מתוך Y שנמדדו, ואילו ★ נפלו". 30/30 יוצא רק כשגם הסעיפים הידניים אושרו בעין.
//
// איך: כרום headless ב-CDP, viewport 1280x900, סקריפט מדידה בתוך העמוד (getComputedStyle,
// getBoundingClientRect, וטקסט גיליונות הסגנון לסעיפים שנוגעים למצבים ולתנועה).
// שימוש:  node _src/tools/studio.mjs s13                     (עמוד שפה במאגר, השורש .ref)
//         node _src/tools/studio.mjs ./index.html --project  (עמוד לקוח; ממלאי מקום נספרים ככשל)
//         node _src/tools/studio.mjs https://leonsverdlov.lovable.app --sel main
// פלט: טבלה בקונסולה + _src/tools/out/studio/<name>.json. יציאה: 0 כשאף ★ לא נפל, 2 כשנפל.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "_src", "tools", "out", "studio");
const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const PROJECT = args.includes("--project");
const target = args.find(a => !a.startsWith("--") && a !== flag("--sel"));
if (!target) { console.error("studio: תן מזהה במאגר, קובץ או URL"); process.exit(1); }
const STYLE_DIRS = ["style", "comp", "arch", "gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc", "rhythm", "anti"];
let url, name = target, sel = flag("--sel");
if (/^https?:/.test(target)) url = target;
else if (existsSync(target)) { url = pathToFileURL(resolve(target)).href; name = basename(target, ".html"); }
else { const f = STYLE_DIRS.map(d => join(ROOT, d, target + ".html")).find(existsSync); if (!f) { console.error("לא נמצא: " + target); process.exit(1); } url = pathToFileURL(f).href; if (!sel) sel = ".ref"; }
sel = sel || "body";

const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe")].filter(Boolean).find(existsSync);
if (!CHROME) { console.error("Chrome לא נמצא"); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 9900 + (process.pid % 90);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files", `--remote-debugging-port=${PORT}`, "--window-size=1280,900", "about:blank"], { stdio: "ignore" });
let ws, mid = 0; const pend = new Map();
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const id = ++mid; pend.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })); });

// ---------- משכי התנועה המותרים (סעיף 25) ----------
// המקור: tokens.json (motion.durations) מאוחד עם טבלת §3 ב-motion.md, כי studio-bar.md מגדיר את סעיף 25 כך ("רק הערכים של tokens.json וטבלת §3").
// tokens.json לבדו חסר חמישה ערכים שהטבלה מחייבת: .12 לחיצה, .2 שברון, .28 רקע מודאל, .3 הובר כרטיס, .4 headroom, .45 הדר צף.
// אצל מי שאין לו את התורה (המאגר ציבורי): null, והבדיקה נופלת לטווחים הקשיחים הישנים.
const ENGINE = join(homedir(), ".claude", "skills", "design-dna", "references", "engine");
const findKey = (o, k) => { if (!o || typeof o !== "object") return null; if (o[k] && typeof o[k] === "object") return o[k]; for (const v of Object.values(o)) { const r = findKey(v, k); if (r) return r; } return null; };
function loadDurations() {
  let tok;
  try { tok = findKey(JSON.parse(readFileSync(join(ENGINE, "tokens.json"), "utf8")), "durations"); } catch { return null; }
  if (!tok) return null;
  const set = new Set(Object.values(tok).filter(v => typeof v === "number").map(v => Math.round(v * 1000)));
  const fromTokens = [...set];
  try {
    const md = readFileSync(join(ENGINE, "motion.md"), "utf8"), a = md.indexOf("## 3."), b = md.indexOf("\n## 4.", a);
    if (a >= 0) md.slice(a, b > a ? b : undefined).split("\n").filter(l => l.startsWith("|")).forEach(l => { for (const m of (l.split("|")[3] || "").matchAll(/(\d*\.?\d+)\s*s\b/g)) set.add(Math.round(parseFloat(m[1]) * 1000)); });
  } catch {}
  const list = [...set].sort((x, y) => x - y);
  return { list, missingInTokens: list.filter(v => !fromTokens.includes(v)) };
}
const DUR = loadDurations();

// ---------- סקריפט המדידה: רץ בתוך העמוד ומחזיר את 30 הסעיפים ----------
const MEASURE = `(function(SEL, PROJECT, DUR){
  const isVault=!!document.querySelector(".vtop");
  document.querySelectorAll(".vtop,.vintro,.mvcode,.vpn-foot,.mvpanel,.demo-note,.bpbar,.runway").forEach(e=>e.style.display="none");
  const root=document.querySelector(SEL)||(isVault?(document.querySelector(".bpwrap")||document.querySelector(".ref")):null)||document.body;
  const cs=el=>getComputedStyle(el);
  const px=v=>parseFloat(v)||0;
  const vis=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&cs(el).visibility!=="hidden"&&cs(el).display!=="none";};
  const q=s=>[...root.querySelectorAll(s)].filter(vis);
  const txt=el=>(el.textContent||"").trim();
  const median=a=>{if(!a.length)return 0;const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)];};
  const uniq=a=>[...new Set(a)];
  let css="";try{for(const sh of document.styleSheets){if(isVault&&sh.href)continue;try{for(const r of sh.cssRules)css+=r.cssText+"\\n";}catch(e){}}}catch(e){}
  // טקסט גולמי של הגיליונות: shorthand עם var() ליד longhand (animation: reveal .5s var(--ease) both + animation-delay) מסתדר ב-CSSOM כמחרוזת ריקה, והסריקה הייתה עיוורת.
  // style: textContent. link: XHR סינכרוני לאותו מקור (או file://), בלי הערות.
  const rawCss=skipLinked=>{let t="";document.querySelectorAll("style").forEach(s=>{t+=s.textContent+"\\n";});if(!skipLinked)document.querySelectorAll('link[rel~="stylesheet"]').forEach(l=>{try{const u=new URL(l.href,location.href);if(u.protocol!==location.protocol||(u.protocol!=="file:"&&u.origin!==location.origin))return;const x=new XMLHttpRequest();x.open("GET",u.href,false);x.send();if(x.status===200||x.status===0)t+=x.responseText+"\\n";}catch(e){}});return t.replace(/\\/\\*[\\s\\S]*?\\*\\//g,"");};
  css+=rawCss(isVault);
  const R=[];const add=(n,star,name,status,evidence)=>R.push({n,star,name,status,evidence:String(evidence||"")});
  const h1=q("h1")[0]||q("h2")[0];
  const ps=q("p").filter(p=>txt(p).length>=20);
  const bodyFs=median(ps.map(p=>px(cs(p).fontSize)))||16;
  // 1 ★ מתח טיפוגרפי
  if(h1){const r=px(cs(h1).fontSize)/bodyFs;add(1,true,"סולם עם מתח (H1/גוף ≥ 3.0)",r>=3?"pass":"fail",Math.round(px(cs(h1).fontSize))+"/"+Math.round(bodyFs)+" = "+r.toFixed(2));}else add(1,true,"סולם עם מתח","na","אין H1");
  // 2 ★ משקלים
  const textEls=q("h1,h2,h3,h4,p,a,button,li,label,span,small,b,strong,em,input");
  const weights=uniq(textEls.map(e=>cs(e).fontWeight));
  add(2,true,"עד ארבעה משקלים",weights.length<=4?"pass":"fail",weights.join(", "));
  // 3 גובה שורה כפול מצב
  if(h1&&ps.length){const lh1=px(cs(h1).lineHeight)/px(cs(h1).fontSize),lhp=px(cs(ps[0]).lineHeight)/px(cs(ps[0]).fontSize);add(3,false,"גובה שורה: כותרת הדוקה, גוף פתוח (הפרש ≥ .35)",(lhp-lh1)>=.35?"pass":"fail","H1 "+lh1.toFixed(2)+" · גוף "+lhp.toFixed(2));}else add(3,false,"גובה שורה כפול מצב","na","");
  // 4 ריווח אותיות בכותרת גדולה
  if(h1){const fs=px(cs(h1).fontSize),ls=cs(h1).letterSpacing;const lsv=ls==="normal"?0:px(ls);add(4,false,"ריווח אותיות שלילי בכותרת מעל 40px",fs<=40?"na":(lsv<0?"pass":"fail"),Math.round(fs)+"px · "+ls);}
  // 5 measure
  let worst=0;ps.forEach(p=>{const lines=Math.max(1,Math.round(p.getBoundingClientRect().height/px(cs(p).lineHeight)));const cpl=txt(p).length/lines;if(cpl>worst)worst=cpl;});
  add(5,false,"measure עד 80 תווים בשורה",ps.length?(worst<=80?"pass":"fail"):"na",Math.round(worst)+" תווים בשורה הרחבה");
  // 6 מספרים כאלמנט
  const nums=textEls.filter(e=>/(\\d[\\d,\\.]{2,}|₪)/.test(txt(e))&&txt(e).length<20&&e.children.length===0);
  if(nums.length){const styled=nums.some(e=>px(cs(e).fontSize)>=bodyFs*1.4||px(cs(e).fontWeight)>=600&&px(cs(e).fontSize)>bodyFs);add(6,false,"מספרים עם טיפול משלהם",styled?"pass":"fail",nums.length+" מספרים, הגדול "+Math.round(Math.max(...nums.map(e=>px(cs(e).fontSize))))+"px");}else add(6,false,"מספרים כאלמנט עיצובי","na","אין מספרים");
  // 7 eyebrow אחיד
  const eyes=q('[class*="eyebrow"],[class*="kicker"]');
  if(eyes.length>=2){const sig=uniq(eyes.map(e=>[cs(e).fontSize,cs(e).fontWeight,cs(e).color,cs(e).letterSpacing].join("|")));add(7,false,"eyebrow בסגנון אחד",sig.length<=1?"pass":"fail",eyes.length+" eyebrows, "+sig.length+" סגנונות");}else add(7,false,"eyebrow עם תפקיד","na",eyes.length+" eyebrows");
  // 8 ★ סולם ריווח
  const ladder=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,32,36,40,44,48,56,64,72,80,88,96,112,128,150,160];
  const onL=v=>ladder.some(l=>Math.abs(l-v)<=.6);
  const sp=new Set();
  q("*").slice(0,1500).forEach(e=>{const c=cs(e);["paddingTop","paddingBottom","paddingLeft","paddingRight","rowGap","columnGap"].forEach(k=>{const v=px(c[k]);if(v>0&&c[k]!=="normal")sp.add(Math.round(v*2)/2);});});
  const off=[...sp].filter(v=>!onL(v));
  let cssAll="";try{for(const sh of document.styleSheets){try{for(const r of sh.cssRules)cssAll+=r.cssText;}catch(e){}}}catch(e){}
  cssAll+=rawCss(false);
  const clampy=/(padding|gap|--sec|--gutter|--pad)[^;{}]*clamp\\(/.test(cssAll);
  add(8,true,"סולם ריווח אחד (עד 2 ערכים מחוץ לסולם)",off.length<=2?"pass":(clampy?"manual":"fail"),off.length+" מחוץ לסולם"+(clampy?" (יש clamp: ערכים נוזליים, לבדוק בעין)":"")+(off.length?": "+off.slice(0,6).join(", "):""));
  // 9 ריווח סקשן נושם
  const secs=q('section,[class*="sec"],.hero,footer,.ft').filter(s=>s.getBoundingClientRect().height>120);
  const sp2=uniq(secs.map(s=>Math.round(px(cs(s).paddingTop)))).filter(v=>v>0).sort((a,b)=>a-b);
  add(9,false,"לפחות שני ריווחי סקשן ביחס 1.5",sp2.length>=2&&sp2[sp2.length-1]/sp2[0]>=1.5?"pass":"fail",sp2.join(", "));
  add(10,false,"יישור אופטי (זום 200% על כפתור וצ'יפ)","manual","");
  // 11 גריד שרואים בלי לראות: קצה ההתחלה של הטקסט בכל סקשן
  const rtl=cs(document.documentElement).direction==="rtl";
  const edges=secs.map(s=>{const t=[...s.querySelectorAll("h1,h2,h3,p")].find(vis);if(!t)return null;const r=t.getBoundingClientRect();return Math.round(rtl?r.right:r.left);}).filter(v=>v!==null);
  if(edges.length>=3){const mode=median(edges);const outl=edges.filter(e=>Math.abs(e-mode)>4).length;add(11,false,"קצוות התוכן על אותו קו אנכי",outl<=1?"pass":"manual",edges.join(", ")+(outl>1?" (חלק מהסטיות מכוונות, ממורכז או full-bleed)":""));}else add(11,false,"גריד שרואים בלי לראות","na","");
  add(12,false,"הפוגה אחרי שיא (כבד/קל לסירוגין)","manual","");
  // 13 ★ טיפול תמונה אחד
  const imgs=q('img,.ph,.hero-v,[class*="visual"],figure');
  if(imgs.length){const radii=uniq(imgs.map(i=>cs(i).borderRadius));add(13,true,"טיפול תמונה אחד (רדיוס אחיד)",radii.length<=2?"pass":"fail",imgs.length+" תמונות, רדיוסים: "+radii.slice(0,4).join(" · "));}else add(13,true,"טיפול תמונה אחד","na","אין תמונות");
  // 14 תמונה שנוגעת במשהו
  if(imgs.length&&secs.length){const touch=imgs.some(i=>{const r=i.getBoundingClientRect();const s=i.closest('section,[class*="sec"],.hero');if(!s)return false;const b=s.getBoundingClientRect();return r.top<b.top-2||r.bottom>b.bottom+2||r.left<b.left-2||r.right>b.right+2;});add(14,false,"תמונה אחת חורגת מהקופסה שלה",touch?"pass":"fail","");}else add(14,false,"תמונה שנוגעת במשהו","na","");
  // 15 ממלאי מקום
  const phs=q(".ph").filter(p=>/תמונה|ויז|image/i.test(txt(p)));
  add(15,false,"ממלא מקום שנראה מעוצב",PROJECT?(phs.length?"fail":"pass"):"na",PROJECT?phs.length+" ממלאי מקום גולמיים":"במאגר פטור בכוונה");
  // 16 אייקונים ממשפחה אחת
  // SVG פנימי (כולל ספרייט <use href="#i-...">), גדלים 16/20/24/32 בלבד, או stroke או filled. mask-image ו-background-image על אלמנט קטן אסורים (visual-language.md, אייקונים).
  const svgs=q("svg").filter(s=>s.getBoundingClientRect().width<=48);  // מעל 48 זה איור, לא אייקון (g86: שלושה איורים של 64)
  const isUrl=v=>/url\\(/.test(v||"");
  const maskHit=(c,mask)=>isUrl(c.maskImage)||isUrl(c.webkitMaskImage)||(mask&&/url\\([^)]*(\\.svg|image\\/svg)/.test(c.backgroundImage||""));
  const mIcons=[];
  q("*").slice(0,4000).forEach(e=>{if(e.closest("svg"))return;const r=e.getBoundingClientRect(),nm=(typeof e.className==="string"&&e.className.trim()?"."+e.className.trim().split(/\\s+/)[0]:e.tagName.toLowerCase());
    if(r.width<=48&&r.height<=48&&maskHit(cs(e),true))mIcons.push(nm);
    ["::before","::after"].forEach(p=>{const c=getComputedStyle(e,p);if(c.content==="none"||!maskHit(c,true))return;const w=px(c.width)||r.width,h=px(c.height)||r.height;if(w>0&&h>0&&w<=48&&h<=48)mIcons.push(nm+p);});});
  // סגנון האייקון נקבע מהצורות שלו. ב-<use> ערך שלא נכתב על הצורה עצמה (attribute או style) עובר בירושה מהאלמנט use
  const shapesOf=s=>{const own=[...s.querySelectorAll("path,circle,rect,line,polyline,polygon,ellipse")].map(e=>({e,inh:null}));[...s.querySelectorAll("use")].forEach(u=>{const h=u.getAttribute("href")||u.getAttribute("xlink:href")||"",t=h[0]==="#"?document.getElementById(h.slice(1)):null;if(t)(t.matches("path,circle,rect,line,polyline,polygon,ellipse")?[t]:[...t.querySelectorAll("path,circle,rect,line,polyline,polygon,ellipse")]).forEach(e=>own.push({e,inh:u}));});return own;};
  const eff=(x,a,k)=>{if(!x.inh)return cs(x.e)[k];for(let n=x.e;n&&n.tagName!=="symbol"&&n.tagName!=="svg";n=n.parentElement)if(n.getAttribute(a)||n.style[k])return cs(x.e)[k];return cs(x.inh)[k];};
  const ic=svgs.map(s=>{const sh=shapesOf(s),st=sh.filter(x=>eff(x,"stroke","stroke")!=="none"&&px(eff(x,"stroke-width","strokeWidth"))>0),fl=sh.filter(x=>{const f=eff(x,"fill","fill");return f!=="none"&&f!=="rgba(0, 0, 0, 0)";});
    return {size:Math.round(s.getBoundingClientRect().width),kind:st.length&&!fl.length?"stroke":fl.length&&!st.length?"fill":"mixed",sw:st.length?Math.round(px(eff(st[0],"stroke-width","strokeWidth"))*100)/100:0};});
  if(mIcons.length){add(16,false,"אייקונים: משפחה אחת ב-SVG פנימי, בלי mask/background",
    "fail",mIcons.length+" אייקוני mask/background ("+uniq(mIcons).slice(0,4).join(", ")+")"+(svgs.length?" · ועוד "+svgs.length+" SVG":""));}
  else if(svgs.length>=2){const sizes=uniq(ic.map(i=>i.size)).sort((a,b)=>a-b),okS=[16,20,24,32,40,48],badS=sizes.filter(v=>!okS.includes(v)),
      strokes=ic.filter(i=>i.kind==="stroke"),fills=ic.filter(i=>i.kind==="fill"),sw=uniq(strokes.map(i=>i.sw)).sort((a,b)=>a-b),
      probs=[];
    if(badS.length)probs.push("גדלים מחוץ ל-16/20/24/32: "+badS.join("/"));
    if(sizes.length>2)probs.push("יותר משני גדלים");
    if(sw.length>1)probs.push("עובי קו לא אחיד");
    if(strokes.length&&fills.length)probs.push("ערבוב stroke ו-filled ("+strokes.length+"/"+fills.length+")");
    add(16,false,"אייקונים: משפחה אחת, גדלים 16/20/24/32, או stroke או filled",probs.length?"fail":"pass",
      svgs.length+" אייקונים · גדלים "+sizes.join("/")+" · "+(strokes.length?"stroke "+sw.join("/"):"")+(strokes.length&&fills.length?" + ":"")+(fills.length?"filled":"")+(strokes.length||fills.length?"":"מעורב")+(probs.length?" · "+probs.join(" · "):""));}
  else add(16,false,"אייקונים ממשפחה אחת","na",svgs.length+" אייקונים");
  add(17,false,"טקסט על תמונה עם סקרים מקומי (ניגודיות בנקודה הבהירה)","manual","");
  // 18 ★ כפתור בארבעה מצבים
  const hasBtn=/\\.btn|button/.test(css);
  const st=n=>new RegExp("(\\\\.btn|button)[^{,]*:"+n).test(css);
  const btnTrans=/(\\.btn|button)[^{]*\\{[^}]*transition/.test(css);
  add(18,true,"כפתור: hover, active, focus-visible + transition",hasBtn?((st("hover")&&st("active")&&st("focus-visible")&&btnTrans)?"pass":"fail"):"na","hover "+st("hover")+" · active "+st("active")+" · focus-visible "+st("focus-visible")+" · transition "+btnTrans);
  // 19 רמה שלישית: טקסט + חץ
  const tert=q("a").some(a=>/[→←↗›‹»«]/.test(txt(a))||a.querySelector("svg")&&(cs(a).backgroundColor==="rgba(0, 0, 0, 0)"&&cs(a).borderStyle==="none"));
  add(19,false,"היררכיית כפתורים: יש קישור טקסט + חץ",tert?"pass":"fail","");
  // 20 שדה: focus מעוצב
  const inFocus=/(input|\\.in\\b|\\.field)[^{,]*:focus[^{]*\\{[^}]*(box-shadow|outline|border)/.test(css);
  add(20,false,"שדה טופס: טבעת focus של העור",q("input,textarea,select").length?(inFocus?"pass":"fail"):"na","");
  // 21 כרטיס: סיגנל עומק אחד
  const cards=q(".card,article");
  if(cards.length){const c=cards[0],p=c.parentElement;const sig=[cs(c).boxShadow!=="none",px(cs(c).borderTopWidth)>0&&cs(c).borderTopColor!=="rgba(0, 0, 0, 0)",cs(c).backgroundColor!==cs(p).backgroundColor&&cs(c).backgroundColor!=="rgba(0, 0, 0, 0)"].filter(Boolean).length;add(21,false,"כרטיס עם עד שני סיגנלי עומק",sig<=2?"pass":"fail",sig+" סיגנלים");}else add(21,false,"כרטיס עם עומק של שכבה אחת","na","");
  // 22 מפרידים
  const seps=q("hr").map(h=>cs(h).borderTopColor+" "+cs(h).borderTopWidth).concat(q("header,.hd,footer,.ft").map(e=>(px(cs(e).borderBottomWidth)?cs(e).borderBottomColor+" "+cs(e).borderBottomWidth:"")+(px(cs(e).borderTopWidth)?cs(e).borderTopColor+" "+cs(e).borderTopWidth:"")).filter(Boolean));
  add(22,false,"מפרידים מסוג אחד או שניים",seps.length?(uniq(seps).length<=2?"pass":"fail"):"na",uniq(seps).length+" סוגים");
  // 23 צ'יפים
  const chips=q(".chip,[class*='chip']");
  if(chips.length){const hs=chips.map(c=>Math.round(c.getBoundingClientRect().height));add(23,false,"צ'יפ בגובה 30 עד 36",hs.every(h=>h>=30&&h<=36)?"pass":"fail",hs.join(", "));}else add(23,false,"תגיות וצ'יפים בפרופורציה","na","אין צ'יפים");
  // 24 ★ כוריאוגרפיית כניסה
  const revealRules=[...css.matchAll(/\\.(reveal|is-in|lad|fade-?in|rise)\\b[^{]*\\{[^}]*\\}/g)].map(m=>m[0]);
  const durs=uniq([...css.matchAll(/(?:transition|animation)(?:-duration)?:[^;]*?(\\d*\\.?\\d+)(m?s)/g)].map(m=>Math.round(parseFloat(m[1])*(m[2]==="s"?1000:1)))).filter(d=>d>0);
  const rdAll=uniq(revealRules.flatMap(r=>[...r.matchAll(/(\\d*\\.?\\d+)(m?s)/g)].map(m=>Math.round(parseFloat(m[1])*(m[2]==="s"?1000:1))))).filter(v=>v>=300);
  if(revealRules.length&&rdAll.length){const rd=uniq(revealRules.flatMap(r=>[...r.matchAll(/(\\d*\\.?\\d+)(m?s)/g)].map(m=>Math.round(parseFloat(m[1])*(m[2]==="s"?1000:1)))).filter(v=>v>=300));add(24,true,"reveal אחד: משך אחיד",rd.length<=1?"pass":"fail","משכי reveal: "+rd.join(", ")+"ms");}else add(24,true,"כוריאוגרפיית כניסה אחת",PROJECT?"fail":"na",PROJECT?"אין מערכת reveal":"אין reveal בעמוד ייחוס");
  // 25 שלוש מהירויות
  // עם התורה: מיקרו = רק הערכים של tokens.json וטבלת §3, מעבר 500-700, סצנה 900-1200. בלעדיה: הטווחים הקשיחים הישנים.
  const bad=durs.filter(d=>DUR?!(DUR.some(m=>Math.abs(m-d)<=2)||(d>=500&&d<=700)||(d>=900&&d<=1200)):!((d>=120&&d<=250)||(d>=450&&d<=750)||(d>=900&&d<=1200)));
  add(25,false,DUR?"תזמונים בשלוש קבוצות (ערכי הטבלה / 500-700 / 900-1200)":"תזמונים בשלוש קבוצות (150-200 / 500-700 / 900-1200)",durs.length?(bad.length<=1?"pass":"fail"):"na","משכים: "+durs.join(", ")+(bad.length?" · חריגים: "+bad.join(", "):""));
  add(26,false,"מעבר סקשנים אחד שאינו קו ישר","manual","");
  // 27 hover על כרטיס
  const cardHover=/\\.card[^{,]*:hover[^{]*\\{[^}]*(transform|box-shadow|border|translate)/.test(css);
  add(27,false,"hover על כרטיס עם תנועה קטנה",cards.length?(cardHover?"pass":"fail"):"na","");
  // 28 reduced-motion
  const anim=/transition|animation|@keyframes/.test(css);
  add(28,false,"prefers-reduced-motion מכבה תנועה",anim?(/prefers-reduced-motion/.test(css)?"pass":"fail"):"na","");
  // 29 ★ הדר ופוטר
  const ft=q("footer,.ft")[0],hd=q("header,.hd")[0];
  const ftH=ft?Math.round(ft.getBoundingClientRect().height):0;
  const hdSticky=hd?(["sticky","fixed"].includes(cs(hd).position)||/is-solid|scrolled|\\.hd\\.on|header\\.on/.test(css)):false;
  add(29,true,"פוטר ≥ 120px והדר שמשתנה בגלילה",(ftH>=120&&hdSticky)?"pass":"fail","פוטר "+ftH+"px · הדר "+(hdSticky?"דביק/משתנה":"סטטי"));
  add(30,false,"רגע חתימה אחד (\\"מה אזכור מחר?\\")","manual","");
  return {sel:SEL,root:root.className,results:R};
})(${JSON.stringify(sel)}, ${PROJECT}, ${JSON.stringify(DUR ? DUR.list : null)})`;

(async () => {
  let code = 0;
  try {
    let ver; for (let i = 0; i < 80; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
    ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } };
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId); await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send("Page.navigate", { url }, sessionId); await sleep(2200);
    await send("Runtime.evaluate", { expression: `document.fonts.ready`, awaitPromise: true }, sessionId);
    const r = await send("Runtime.evaluate", { expression: MEASURE, returnByValue: true }, sessionId);
    if (r.exceptionDetails) throw new Error("מדידה נכשלה: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    const { results } = r.result.value;
    const pass = results.filter(x => x.status === "pass").length, fail = results.filter(x => x.status === "fail"), manual = results.filter(x => x.status === "manual").length, na = results.filter(x => x.status === "na").length;
    const starsFailed = fail.filter(x => x.star).map(x => x.n);
    const mark = { pass: "✓", fail: "✗", manual: "עין", na: "לא רלוונטי" };
    console.log(`\nרף הסטודיו · ${name} (${sel})\n`);
    for (const x of results) console.log(`${x.star ? "★" : " "} ${String(x.n).padStart(2)}  ${mark[x.status].padEnd(11)} ${x.name}${x.evidence ? "  · " + x.evidence : ""}`);
    console.log(`\nנמדדו ${pass + fail.length}: ${pass} עברו, ${fail.length} נפלו · ${manual} לעין · ${na} לא רלוונטיים`);
    console.log(starsFailed.length ? `★ שנפלו: ${starsFailed.join(", ")}  ← לא ברף` : `כל ה-★ שנמדדו עברו. הציון הסופי אחרי ${manual} סעיפי העין.`);
    mkdirSync(OUT, { recursive: true });
    writeFileSync(join(OUT, name.replace(/[^\w.-]+/g, "_") + ".json"), JSON.stringify({ target, url, sel, generated: new Date().toISOString(), pass, fail: fail.length, manual, na, starsFailed, results }, null, 1));
    if (starsFailed.length) code = 2;
  } catch (e) { console.error(e.message); code = code || 1; }
  finally { try { ws?.close(); } catch {} chrome.kill(); process.exit(code); }
})();
