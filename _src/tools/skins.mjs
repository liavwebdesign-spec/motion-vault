#!/usr/bin/env node
// skins.mjs: מטריצת עורות. כל מהלך רב-שימושי (gsap, behavior, css, lm, misc) מרונדר בייצוא
// העצמאי שלו (export/<id>.html) תחת כמה עורות שונים לגמרי מעור המאגר, ונמדד:
//   1. ניגודיות טקסט (WCAG) מול הרקע האפקטיבי, לכל אלמנט עם טקסט ישיר.
//   2. משטחים שמתעלמים מהעור: רקע בהיר קשיח על עור כהה (או להפך). זה מה שקורה כשצבע
//      נכתב כליטרל במקום כטוקן, והתוצאה אצל הלקוח היא כרטיס לבן באמצע אתר כהה.
//   3. צילום מסך לכל צירוף, וגיליון מגע אחד (out/skins/index.html) כדי שליאב יראה בעיניים.
//
// למה: כל מהלך נבדק עד היום רק בצבעי המאגר. אצל לקוח הטוקנים שונים, ומה שנראה מצוין על
// לבן יכול להיעלם על כהה. ה-QA הסטטי תופס ליטרלים של טוקני המאגר בלבד, לא כל ליטרל.
//
// מגבלה מוצהרת: רקע גרדיאנט או תמונה לא נמדד (כמו בדטקטור impeccable). פלייסהולדרים (.ph)
// מוחרגים כי הם מכוונים. הפונט בצילומים הוא Ploni מקומי, לא Heebo מהרשת (אין רשת).
//
// שימוש:  node _src/tools/skins.mjs              (הכל)
//         node _src/tools/skins.mjs b30 css02    (מזהים)
//         node _src/tools/skins.mjs --json       (פלט מכונה)
//         node _src/tools/skins.mjs --no-shots   (בלי צילומים, מהיר)
// פלט:   _src/tools/out/skins/report.json, index.html, <id>-<skin>.png  (לא בגיט)
// יציאה: 0 כשאין כשל ניגודיות קשה, 2 כשיש.

import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "_src", "tools", "out", "skins");
mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const NO_SHOTS = args.includes("--no-shots");
const wanted = new Set(args.filter(a => !a.startsWith("--")));

const CHROME = [process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
].filter(Boolean).find(p => existsSync(p));
if (!CHROME) { console.error("skins: Chrome לא נמצא. הגדר CHROME_PATH."); process.exit(1); }

const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import(pathToFileURL(join(ROOT, "_src", "catalog", f)).href);
  entries.push(...mod.default);
}
const REUSABLE = new Set(["gsap", "behavior", "css", "lm", "misc"]);

// ארבעה עורות רחוקים זה מזה בכוונה. לא "יפים", אלא כאלה שחושפים הנחות סמויות:
// כהה (טקסט כהה קשיח נעלם), שמנת (לבן קשיח בולט), accent בהיר (לבן על accent נופל),
// מונוכרום (accent = ink, כל מה שנשען על "ה-accent שונה מהטקסט" נשבר).
const SKINS = {
  dark:  { label: "כהה",            vars: { "--bg": "#0f1020", "--card": "#181a2e", "--ink": "#f2f3fa", "--muted": "#a4a7c0", "--line": "#2b2e45", "--accent": "#8b7cff", "--accent-ink": "#fff" } },
  cream: { label: "שמנת חמה",       vars: { "--bg": "#f3ede2", "--card": "#fffaf1", "--ink": "#2a2218", "--muted": "#65594a", "--line": "#e3d9c7", "--accent": "#b7542a", "--accent-ink": "#fff" } },
  sun:   { label: "accent בהיר",    vars: { "--bg": "#ffffff", "--card": "#f6f7fb", "--ink": "#101216", "--muted": "#5b6070", "--line": "#dfe2ea", "--accent": "#ffd23f", "--accent-ink": "#141414" } },
  mono:  { label: "מונוכרום כהה",   vars: { "--bg": "#111111", "--card": "#1a1a1a", "--ink": "#ffffff", "--muted": "#bdbdbd", "--line": "#333333", "--accent": "#ffffff", "--accent-ink": "#111111" } },
};
const FONT_CSS = `@font-face{font-family:"Ploni";src:url("${pathToFileURL(join(ROOT, "assets", "fonts", "ploni-regular-aaa.woff2")).href}") format("woff2");font-weight:400}
@font-face{font-family:"Ploni";src:url("${pathToFileURL(join(ROOT, "assets", "fonts", "ploni-bold-aaa.woff2")).href}") format("woff2");font-weight:700}
body{font-family:"Ploni",system-ui,sans-serif!important}`;

// rAF על setTimeout ו-IO מיידי, כמו ב-behave.mjs: בלי זה כניסות מבוססות גלילה נשארות שקופות בצילום
const SHIM = `<script>(function(){var q=setTimeout;window.requestAnimationFrame=function(cb){return q(function(){cb(performance.now())},16)};window.cancelAnimationFrame=clearTimeout;
function IO(cb){this.cb=cb;this.els=[]}IO.prototype.observe=function(el){var s=this;s.els.push(el);q(function(){var r=el.getBoundingClientRect();s.cb([{target:el,isIntersecting:true,intersectionRatio:1,boundingClientRect:r,intersectionRect:r,rootBounds:null,time:performance.now()}],s)},0)};
IO.prototype.unobserve=function(){};IO.prototype.disconnect=function(){};IO.prototype.takeRecords=function(){return[]};window.IntersectionObserver=IO;
document.startViewTransition=function(cb){var p=Promise.resolve().then(function(){return cb&&cb()});return{updateCallbackDone:p,ready:p,finished:p,skipTransition:function(){}}};})();</script>`;

const PROBE = String.raw`
<script>
(function(){
  function drive(){ try{
    if(window.ScrollTrigger){ ScrollTrigger.refresh(); ScrollTrigger.getAll().forEach(function(t){ try{ t.scroll(t.end); if(t.animation)t.animation.progress(1);}catch(e){} }); ScrollTrigger.update(); }
    if(window.gsap){ gsap.globalTimeline.time(gsap.globalTimeline.time()+3); }
    document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("is-in")});
    window.dispatchEvent(new Event("scroll"));
  }catch(e){} }
  function parse(c){ var m=/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(c||""); return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null; }
  function lum(c){ var a=c.slice(0,3).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}); return .2126*a[0]+.7152*a[1]+.0722*a[2]; }
  function ratio(f,b){ var l1=lum(f),l2=lum(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05); }
  function over(top,bot){ var a=top[3]; return [top[0]*a+bot[0]*(1-a), top[1]*a+bot[1]*(1-a), top[2]*a+bot[2]*(1-a), 1]; }
  // הרקע האפקטיבי: מטפסים בעץ ומרכיבים כל רקע חצי-שקוף על מה שמתחתיו. גרדיאנט/תמונה = לא ידוע.
  function compose(layers){ var base=[255,255,255,1]; var body=parse(getComputedStyle(document.body).backgroundColor); if(body&&body[3]>0)base=body;
    var acc=base; for(var i=layers.length-1;i>=0;i--)acc=over(layers[i],acc); return {c:acc}; }
  // הרקע האפקטיבי לפי מה שבאמת מצויר מתחת לטקסט: elementsFromPoint במרכז האלמנט, ולא רק אבות.
  // ככה שכבת רקע אחות (div כהה ממוקם מאחורי הכותרת) נספרת, וגרדיאנט/תמונה = לא ידוע.
  function effBg(el){
    var r=el.getBoundingClientRect(); var x=r.left+Math.min(r.width/2,24), y=r.top+Math.min(r.height/2,12);
    if(x<0||y<0||x>=innerWidth||y>=innerHeight){ el.scrollIntoView({block:"center"}); r=el.getBoundingClientRect(); x=r.left+Math.min(r.width/2,24); y=r.top+Math.min(r.height/2,12); }
    var stack=(x>=0&&y>=0&&x<innerWidth&&y<innerHeight)?document.elementsFromPoint(x,y):[];
    var i=stack.indexOf(el);
    if(i<0){ // נפילה לאחור: טיפוס באבות
      var layers=[]; var n=el;
      while(n&&n.nodeType===1){ var cs=getComputedStyle(n);
        if(cs.backgroundImage&&cs.backgroundImage!=="none") return {unknown:true};
        var bg=parse(cs.backgroundColor); if(bg&&bg[3]>0){ layers.push(bg); if(bg[3]>=1)break; }
        n=n.parentElement; }
      return compose(layers); }
    var ls=[];
    for(var k=i;k<stack.length;k++){ var m=stack[k]; if(m===document.documentElement)break; var c2=getComputedStyle(m);
      if(c2.backgroundImage&&c2.backgroundImage!=="none") return {unknown:true};
      var b2=parse(c2.backgroundColor); if(b2&&b2[3]>0){ ls.push(b2); if(b2[3]>=1)break; } }
    return compose(ls); }
  function hasText(el){ for(var i=0;i<el.childNodes.length;i++){ var n=el.childNodes[i]; if(n.nodeType===3&&n.nodeValue.trim().length>1)return true; } return false; }
  function idOf(el){ return el.tagName.toLowerCase()+(el.className&&typeof el.className==="string"?"."+el.className.trim().split(/\s+/).slice(0,2).join("."):""); }
  function run(){
    var skinBg=parse(getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()||"")||parse(getComputedStyle(document.body).backgroundColor);
    // --bg הוא hex, לא rgb: ממירים דרך אלמנט
    var t=document.createElement("i"); t.style.color=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(); document.body.appendChild(t); skinBg=parse(getComputedStyle(t).color); t.remove();
    var skinDark=skinBg?lum(skinBg)<.25:false;
    var ta=document.createElement("i"); ta.style.color=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(); document.body.appendChild(ta); var accent=parse(getComputedStyle(ta).color); ta.remove();
    var same=function(a,b){ return a&&b&&Math.abs(a[0]-b[0])<3&&Math.abs(a[1]-b[1])<3&&Math.abs(a[2]-b[2])<3; };
    var fails=[], mism=[], checked=0;
    document.querySelectorAll("body *").forEach(function(el){
      if(el.tagName==="SCRIPT"||el.tagName==="STYLE"||el.closest(".mv-runway"))return;   // המסלול הוא פיגום הייצוא, לא המהלך
      var cs=getComputedStyle(el); if(cs.display==="none"||cs.visibility==="hidden")return;
      var r=el.getBoundingClientRect(); if(!r.width||!r.height)return;
      // משטח שמתעלם מהעור: רקע אטום שהבהירות שלו הפוכה לעור, ולא פלייסהולדר ולא כפתור accent
      var bg=parse(cs.backgroundColor);
      if(bg&&bg[3]>=.9&&!el.closest(".ph")&&r.width*r.height>4000){ var L=lum(bg);
        if(skinDark&&L>.7) mism.push({el:idOf(el),bg:cs.backgroundColor,kind:"light surface on dark skin"});
        if(!skinDark&&L<.08) mism.push({el:idOf(el),bg:cs.backgroundColor,kind:"dark surface on light skin"}); }
      if(!hasText(el))return; if(el.closest(".ph"))return;
      var fg=parse(cs.color); if(!fg||fg[3]===0)return;   // צבע שקוף = טקסט גרדיאנט או קו מתאר, לא נמדד
      if(cs.webkitTextFillColor&&cs.webkitTextFillColor!==cs.color&&cs.webkitTextFillColor==="rgba(0, 0, 0, 0)")return;
      if(parseFloat(cs.opacity)===0)return;   // מוסתר בכוונה (מצב לפני כניסה שלא הופעל)
      var eb=effBg(el); if(eb.unknown)return;
      var f=fg[3]<1?over(fg,eb.c):fg; var rr=ratio(f,eb.c); checked++;
      var size=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight,10)>=700; var large=size>=24||(size>=18.66&&bold);
      var need=large?3:4.5;
      // טקסט על ה-accent: כשל של ההנחה "accent תמיד כהה ולבן עליו קריא", לא של המהלך הבודד. מסומן בנפרד.
      // גם טקסט בצבע accent (מחיר, תג) נופל כשה-accent בהיר: זו מגבלה של העור, לא של המהלך
      if(rr<need) fails.push({el:idOf(el),text:el.textContent.trim().slice(0,28),fg:cs.color,bg:"rgb("+eb.c.slice(0,3).map(Math.round).join(",")+")",ratio:+rr.toFixed(2),need:need,size:Math.round(size),onAccent:same(eb.c,accent)||same(f,accent)});
    });
    var res={checked:checked,fails:fails,mismatches:mism.slice(0,12),mismatchCount:mism.length};
    var s=document.createElement("script"); s.type="application/json"; s.id="skins-result"; s.textContent=JSON.stringify(res); document.body.appendChild(s);
    if(window.__skinsScroll)window.__skinsScroll();
  }
  var ready=(document.fonts&&document.fonts.ready)||Promise.resolve();
  ready.then(function(){ setTimeout(function(){ drive(); setTimeout(function(){
    var st=document.createElement("style"); st.textContent="*,*::before,*::after{transition:none!important;animation-duration:0s!important;animation-delay:0s!important}"; document.head.appendChild(st); void document.body.offsetHeight;
    if(window.__skinsScroll)window.__skinsScroll();   // לפני המדידה: elementsFromPoint רואה רק מה שבחלון
    setTimeout(run,50); },900); },150); });
  // גוללים כך שהרכיב עצמו (ולא המסלול) יהיה בראש הצילום. גם אחרי המדידה, כי המדידה גוללת לאלמנטים שמחוץ לחלון.
  window.__skinsScroll=function(){ var comp=document.querySelector(".mv-runway ~ *:not(script):not(style):not(.mv-runway)"); if(comp){ var y=Math.max(0,comp.getBoundingClientRect().top+scrollY-8); window.scrollTo(0,y); document.documentElement.scrollTop=y; } };
})();
</script>`;

function runOne(e, skin) {
  const page = join(ROOT, "export", e.id + ".html");
  if (!existsSync(page)) return { error: "no export" };
  const VENDOR = join(ROOT, "_src", "tools", "vendor");
  const vars = skin ? Object.entries(SKINS[skin].vars).map(([k, v]) => `${k}:${v}`).join(";") : "";
  const html = readFileSync(page, "utf8")
    .replace(/<script src="https?:\/\/[^"]+\/([A-Za-z0-9_.-]+\.min\.js)"><\/script>/g, (m, f) =>
      existsSync(join(VENDOR, f)) ? `<script src="${pathToFileURL(join(VENDOR, f)).href}"></script>` : m)
    .replace(/<script src="https?:\/\/[^"]*lenis[^"]*"><\/script>/gi, m => {
      const f = readdirSync(VENDOR).find(n => /lenis/i.test(n)); return f ? `<script src="${pathToFileURL(join(VENDOR, f)).href}"></script>` : m; })
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "")
    .replace(/<head>/i, "<head>" + SHIM)
    .replace(/<\/head>/i, `<style id="skin-font">${FONT_CSS}</style>${vars ? `<style id="skin">:root{${vars}}</style>` : ""}</head>`)
    .replace(/<\/body>/i, PROBE + "\n</body>");
  const tmp = join(ROOT, "export", `${e.id}.skin-${skin || "base"}.tmp.html`);
  writeFileSync(tmp, html, "utf8");
  const shot = join(OUT, `${e.id}-${skin || "base"}.png`);
  try {
    const flags = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
      "--run-all-compositor-stages-before-draw", "--window-size=1280,1400", "--virtual-time-budget=4000", "--allow-file-access-from-files"];
    if (!NO_SHOTS) flags.push(`--screenshot=${shot}`);
    flags.push("--dump-dom", pathToFileURL(tmp).href);
    const out = execFileSync(CHROME, flags, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 60000, stdio: ["ignore", "pipe", "ignore"] });
    const m = /<script type="application\/json" id="skins-result">([\s\S]*?)<\/script>/.exec(out);
    if (!m) return { error: "probe did not report" };
    return JSON.parse(m[1]);
  } catch (err) {
    return { error: "chrome: " + String(err.message).slice(0, 100) };
  } finally { try { unlinkSync(tmp); } catch {} }
}

const targets = entries.filter(e => REUSABLE.has(e.cat) && (!wanted.size || wanted.has(e.id)));
const results = [];
for (const e of targets) {
  const row = { id: e.id, cat: e.cat, name: e.name, skins: {} };
  row.skins.base = runOne(e, null);
  for (const k of Object.keys(SKINS)) row.skins[k] = runOne(e, k);
  // כשל אמיתי = נופל בעור אבל לא בבסיס. מה שנופל גם בבסיס הוא בעיה של המהלך עצמו (ידווח בנפרד).
  const baseFails = new Set((row.skins.base.fails || []).map(f => f.el + "|" + f.text));
  row.skinOnly = {}; row.mismatch = {};
  for (const k of Object.keys(SKINS)) {
    const r = row.skins[k];
    const so = (r.fails || []).filter(f => !baseFails.has(f.el + "|" + f.text));
    row.skinOnly[k] = so.filter(f => !f.onAccent).length;
    row.accentOnly = row.accentOnly || {}; row.accentOnly[k] = so.filter(f => f.onAccent).length;
    row.mismatch[k] = r.mismatchCount || 0;
  }
  row.baseFails = baseFails.size;
  row.worst = Math.max(...Object.values(row.skinOnly));
  results.push(row);
  if (!JSON_OUT) {
    const flag = row.worst || Object.values(row.mismatch).some(Boolean) || row.baseFails;
    process.stdout.write((flag ? "!!   " : "ok   ") + e.id.padEnd(6) +
      Object.keys(SKINS).map(k => `${k}:${row.skinOnly[k]}${row.accentOnly[k] ? "+" + row.accentOnly[k] + "a" : ""}${row.mismatch[k] ? "+" + row.mismatch[k] + "s" : ""}`).join("  ") +
      (row.baseFails ? `  base:${row.baseFails}` : "") + "\n");
  }
}
writeFileSync(join(OUT, "report.json"), JSON.stringify({ skins: SKINS, results }, null, 1), "utf8");

// גיליון מגע: שורה למהלך, עמודה לעור, עם דגלים. נפתח מקומית, לא נדחף.
if (!NO_SHOTS) {
  const cols = ["base", ...Object.keys(SKINS)];
  const rows = results.map(r => `<tr><th><a href="../../../../${r.cat}/${r.id}.html">${r.id}</a><br><small>${r.name}</small>${r.baseFails ? `<br><b class="bad">בסיס: ${r.baseFails}</b>` : ""}</th>` +
    cols.map(k => { const so = k === "base" ? 0 : r.skinOnly[k], mm = k === "base" ? 0 : r.mismatch[k];
      const fl = r.skins[k].fails || [];
      return `<td class="${so ? "bad" : ""}"><img loading="lazy" src="${r.id}-${k}.png" alt=""><div class="f">${so ? `ניגודיות: ${so}` : ""}${mm ? ` · משטח: ${mm}` : ""}${r.skins[k].error ? r.skins[k].error : ""}</div>${so ? `<div class="d">${fl.slice(0, 3).map(f => `${f.el} ${f.ratio}:1 “${f.text}”`).join("<br>")}</div>` : ""}</td>`; }).join("") + "</tr>").join("\n");
  writeFileSync(join(OUT, "index.html"), `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><title>מטריצת עורות</title>
<style>body{font-family:system-ui;margin:20px;background:#eee;color:#111}table{border-collapse:collapse}th,td{vertical-align:top;padding:6px;border-bottom:1px solid #ccc;text-align:start}
img{width:240px;display:block;border:1px solid #bbb}td.bad{background:#ffe3e3}.bad{color:#b00}.f{font-size:12px;margin-top:4px}.d{font-size:11px;color:#600}th{width:150px;font-weight:600}small{color:#555;font-weight:400}
thead th{position:sticky;top:0;background:#eee}</style>
<h1>מטריצת עורות · ${results.length} מהלכים × ${cols.length} עורות</h1>
<p>אדום = כשל ניגודיות שקיים רק בעור הזה ולא בבסיס. "משטח" = רקע קשיח שמתעלם מהעור.</p>
<table><thead><tr><th>מהלך</th>${cols.map(k => `<th>${k === "base" ? "המאגר" : SKINS[k].label}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></html>`, "utf8");
}
// כשל = ניגודיות שנשברת רק בעור ולא בבסיס, ולא על accent. "משטח" ו"accent" הם מידע (בעור מונוכרום כל כפתור
// accent הוא משטח בהיר בהגדרה, וסקשן על var(--ink) מתהפך בכוונה), ולכן לא מפילים את הריצה.
const flagged = results.filter(r => r.worst);
if (JSON_OUT) console.log(JSON.stringify({ checked: results.length, flagged: flagged.length, results }, null, 1));
else console.log(`\nskins: ${results.length} נבדקו, ${flagged.length} עם ממצא בעור כלשהו, ${results.filter(r => Object.values(r.accentOnly).some(Boolean)).length} נשענים על "לבן על accent", ${results.filter(r => r.baseFails).length} עם כשל כבר בבסיס`);
process.exit(flagged.length ? 2 : 0);
