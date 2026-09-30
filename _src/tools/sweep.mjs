#!/usr/bin/env node
// sweep.mjs: סריקת רוחב לכל פריט במאגר, למה שהכלים האחרים לא בודקים (30.9.2026, סבב ה-QA המלא של המאגר).
//
// למה: behave בודק שמשהו זז, skins בודק ניגודיות, shots מצלם ב-1280 וב-500. אף אחד מהם לא עונה על:
//   1. גלישה אופקית: משהו רחב מהמסך ב-390, 768, 1024, 1440 או 1920 (כולל הכרום של המאגר עצמו).
//   2. תוכן שלא נראה אף פעם: טקסט שנשאר שקוף או מוסתר לאורך כל הגלילה, בתנועה רגילה ובהפחתת תנועה.
//      התורה (motion.md) דורשת שבהפחתת תנועה הכל גלוי; המדידה כאן היא "האם האלמנט נראה לפחות פעם אחת
//      כשהיה באמצע המסך".
//   3. יעדי מגע קטנים בטלפון: פקד מתחת ל-24 פיקסלים (כשל) או מתחת ל-44 (אזהרה), ב-390.
//   4. טקסט זעיר: מתחת ל-12 פיקסלים בדמו.
//   5. שגיאות JS בכל רוחב.
// זו מדידה לטריאז', לא שער: ממצא נבדק בעין לפני שמתקנים.
//
// שימוש:  node _src/tools/sweep.mjs --all            (כל הפריטים, 3 לשוניות במקביל)
//         node _src/tools/sweep.mjs g01 b30 c05       (מזהים)
//         node _src/tools/sweep.mjs --all --par 4
// פלט:   _src/tools/out/sweep/report.json, ושורה לכל פריט בקונסולה.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "_src", "tools", "out", "sweep");
const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const PAR = Number(flag("--par") || 3);
// --overflow: only the five-width overflow check (fast); --name x writes out/sweep/x.json instead of report.json
const ONLY_OVERFLOW = args.includes("--overflow");
// --nocdn: only the blocked-library pass (1440 and 390). Office networks block CDNs and Windows turns animations off
// (feedback_real_client_conditions_qa); a move that hides content in CSS and reveals it in GSAP then hides it forever.
const ONLY_NOCDN = args.includes("--nocdn");
// wait after every scroll stop: reveals run .6 to 1s with a stagger; 260ms reported finished reveals as never seen
const STEP_MS = Number(flag("--step") || 700);
const CDN_HOSTS = ["*cdn.jsdelivr.net*", "*unpkg.com*", "*cdnjs.cloudflare.com*", "*code.jquery.com*"];
const NAME = flag("--name") || "report";
const CATS = ["gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc", "style", "comp", "arch", "rhythm", "anti"];
const findPage = id => CATS.map(d => join(ROOT, d, id + ".html")).find(existsSync);
let ids = args.filter(a => !a.startsWith("--") && a !== flag("--par") && a !== flag("--name") && a !== flag("--step"));
if (args.includes("--all")) ids = CATS.flatMap(d => existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter(f => f.endsWith(".html") && !f.includes(".tmp")).map(f => f.replace(".html", "")) : []);
if (!ids.length) { console.error("תן מזהים או --all"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe")].filter(Boolean).find(existsSync);
if (!CHROME) { console.error("Chrome לא נמצא"); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 9300 + (process.pid % 90);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
  "--force-device-scale-factor=1", `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(process.env.TEMP || ".", "sweep-" + PORT)}`,
  // three pages run at once and only one is in front: without these flags the others get no animation frames,
  // scroll scenes never advance there, and the text they reveal was reported as "never seen" (30.9.2026, g23-g59 review)
  "--disable-background-timer-throttling", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding",
  "--window-size=1440,900", "about:blank"], { stdio: "ignore" });

let ws, msgId = 0;
const pending = new Map(), listeners = new Map();
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const id = ++msgId; pending.set(id, { res, rej });
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  setTimeout(() => { if (pending.has(id)) { pending.delete(id); rej(new Error("timeout " + method)); } }, 30000);
});
async function connect() {
  let ver;
  for (let i = 0; i < 80; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
  if (!ver) throw new Error("כרום לא פתח פורט ניפוי");
  ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); return; }
    if (m.sessionId && listeners.has(m.sessionId)) listeners.get(m.sessionId)(m);
  };
}
const evalIn = async (sessionId, expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};

// ---- in-page probes ----
const DESC = `function __d(e){var s=e.tagName.toLowerCase();if(e.id)s+="#"+e.id;var c=(e.getAttribute("class")||"").trim().split(/\\s+/).filter(Boolean).slice(0,2);if(c.length)s+="."+c.join(".");return s;}`;
// overflow: document wider than the viewport. W is the emulated width, not innerWidth: mobile emulation zooms out
// to fit wide content, and then innerWidth grows with the bug it should expose, and the widest offenders not clipped by an ancestor
const OVERFLOW = W => `(function(){${DESC}
var W=${W},sw=document.documentElement.scrollWidth,out=[];
// the vault sets overflow-x:clip on html and body, so scrollWidth never grows: a wide element is cut, not scrollable.
// Every element is checked, whatever scrollWidth says.
function clipped(e){for(var p=e.parentElement;p&&p!==document.body;p=p.parentElement){var o=getComputedStyle(p);if(/(hidden|clip|auto|scroll)/.test(o.overflowX)){var r=p.getBoundingClientRect();if(r.right<=W+1&&r.left>=-1)return true;}}return false;}
document.querySelectorAll("body *").forEach(function(e){var r=e.getBoundingClientRect();if(!r.width||!r.height)return;if((r.right>W+1||r.left<-1)&&!clipped(e)){var cs=getComputedStyle(e);if(cs.position==="fixed"&&cs.visibility==="hidden")return;out.push({el:__d(e),chrome:!!e.closest(".vtop,.vintro,.mvcode,.vpn-foot,.bpbar"),l:Math.round(r.left),r:Math.round(r.right)});}});
// when mobile emulation zooms out every block shifts; the wide ones are the cause
var wide=out.filter(function(o){return o.r-o.l>W+1;});
return {sw:sw,w:W,n:out.length,els:(wide.length?wide:out).slice(0,6)};})()`;
// text + controls inside the demo (vault chrome excluded)
const COLLECT = `(function(){${DESC}
window.__seen=new Map();window.__all=[];
var chrome=".vtop,.vintro,.mvcode,.vpn-foot,.mvpanel,.demo-note,.runway,.bpbar,.sr-only,[aria-hidden=true],script,style,noscript,template";
document.querySelectorAll("body *").forEach(function(e){if(e.closest(chrome))return;
  var own=[].some.call(e.childNodes,function(n){return n.nodeType===3&&n.textContent.trim().length>1});
  if(own)window.__all.push(e);});
return window.__all.length;})()`;
// effective visibility of each text element whose box sits in the middle band of the viewport
// band: the middle of the screen, except at the very top and bottom of the page, where a header link or a footer
// credit can never reach the middle; there the whole screen counts (the "edge" peeks in pass()).
const PEEK = (edge) => `(function(){var H=innerHeight,W=innerWidth,T=${edge ? 0 : .1},B=${edge ? 1 : .9};
// the box that can actually show: clipped by every ancestor that hides overflow. A collapsed accordion answer keeps
// its full box inside a 0-height wrapper; it is closed, not hidden, and must not count as "never seen".
function clipRect(e){var r=e.getBoundingClientRect(),t=r.top,b=r.bottom,l=r.left,rt=r.right;
  for(var p=e.parentElement;p&&p!==document.body;p=p.parentElement){var s=getComputedStyle(p);if(s.overflow!=="visible"||s.overflowY!=="visible"){var q=p.getBoundingClientRect();t=Math.max(t,q.top);b=Math.min(b,q.bottom);l=Math.max(l,q.left);rt=Math.min(rt,q.right);}}
  return {top:t,bottom:b,left:l,right:rt,width:Math.max(0,rt-l),height:Math.max(0,b-t)};}
window.__all.forEach(function(e,i){if(window.__seen.get(i))return;var r=clipRect(e);
  if(r.width<2||r.height<2||r.top<H*T||r.bottom>H*B||r.right<0||r.left>W)return;
  var op=1,vis=true;for(var p=e;p&&p.nodeType===1;p=p.parentElement){var s=getComputedStyle(p);op*=parseFloat(s.opacity);if(s.visibility==="hidden"||s.display==="none")vis=false;
    if(s.clipPath&&s.clipPath!=="none"&&/inset\\((4[5-9]|[5-9]\\d|100)%/.test(s.clipPath))vis=false;}
  // covered: a preloader or panel that never lifts leaves the text opaque but unreachable. elementFromPoint skips
  // pointer-events:none, so decorative layers over text do not count as covering it.
  if(vis&&op>.5){var c=document.elementFromPoint(Math.min(W-1,Math.max(0,r.left+r.width/2)),r.top+r.height/2);if(c&&!e.contains(c)&&!c.contains(e))vis=false;}
  if(vis&&op>.5)window.__seen.set(i,true);else if(!window.__seen.has(i))window.__seen.set(i,false);});})()`;
const NEVER = `(function(){${DESC}var out=[];window.__seen.forEach(function(v,i){if(!v){var e=window.__all[i];out.push(__d(e)+" «"+e.textContent.trim().slice(0,30)+"»");}});return out.slice(0,8);})()`;
// small targets and tiny text at phone width
const TARGETS = `(function(){${DESC}var bad=[],warn=[],tiny=[];
var chrome=".vtop,.vintro,.mvcode,.vpn-foot,.mvpanel,.demo-note,.runway,.bpbar";
document.querySelectorAll("a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=tab],summary,[tabindex]:not([tabindex='-1'])").forEach(function(e){
  if(e.closest(chrome)||e.closest("[aria-hidden=true]"))return;var r=e.getBoundingClientRect();if(!r.width||!r.height)return;
  var s=getComputedStyle(e);if(s.visibility==="hidden"||parseFloat(s.opacity)===0)return;
  var m=Math.min(r.width,r.height);if(m<24)bad.push(__d(e)+" "+Math.round(r.width)+"x"+Math.round(r.height));else if(m<44)warn.push(__d(e)+" "+Math.round(r.width)+"x"+Math.round(r.height));});
(window.__all||[]).forEach(function(e){var r=e.getBoundingClientRect();if(!r.width)return;var fs=parseFloat(getComputedStyle(e).fontSize);if(fs<12)tiny.push(__d(e)+" "+fs+"px");});
return {bad:bad.slice(0,6),nBad:bad.length,warn:warn.slice(0,4),nWarn:warn.length,tiny:tiny.slice(0,4),nTiny:tiny.length};})()`;

async function open(url, w, h, reduce, nocdn) {
  const errors = [];
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  listeners.set(sessionId, m => {
    if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text || "").split("\n")[0].slice(0, 200));
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(("console.error " + (m.params.args || []).map(a => a.value || a.description).join(" ")).slice(0, 200));
  });
  await send("Page.enable", {}, sessionId);
  await send("Emulation.setFocusEmulationEnabled", { enabled: true }, sessionId).catch(() => {});
  if (nocdn) { await send("Network.enable", {}, sessionId); await send("Network.setBlockedURLs", { urls: CDN_HOSTS }, sessionId); }
  await send("Runtime.enable", {}, sessionId);
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 }, sessionId);
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }] }, sessionId);
  await send("Page.navigate", { url }, sessionId);
  for (let t = 0; t < 40; t++) { const s = await evalIn(sessionId, "document.readyState").catch(() => ""); if (s === "complete") break; await sleep(150); }
  await sleep(900);
  const close = async () => { listeners.delete(sessionId); await send("Target.closeTarget", { targetId }).catch(() => {}); };
  return { sessionId, errors, close };
}

// scroll the whole page in half-screen steps, peeking at text visibility at every stop
async function pass(sessionId) {
  await evalIn(sessionId, COLLECT);
  const H = await evalIn(sessionId, "innerHeight");
  let y = 0;
  for (let i = 0; i < 80; i++) {
    await evalIn(sessionId, `window.scrollTo(0,${y})`);
    await sleep(STEP_MS);
    await evalIn(sessionId, PEEK(false));
    if (i === 0) await evalIn(sessionId, PEEK(true));
    const max = await evalIn(sessionId, "document.documentElement.scrollHeight-innerHeight");
    if (y >= max) { await evalIn(sessionId, PEEK(true)); break; }
    y = Math.min(max, y + Math.round(H / 2));
  }
  return evalIn(sessionId, NEVER);
}

async function sweep(id) {
  const url = pathToFileURL(findPage(id)).href;
  const r = { id, overflow: {}, never: {}, targets: null, errors: [] };
  for (const w of ONLY_NOCDN ? [390, 1440] : []) {
    const p = await open(url, w, w < 768 ? 844 : 900, false, true);
    try { const n = await pass(p.sessionId); if (n.length) r.never[w + "-nocdn"] = n; } catch (e) { r.errors.push(`${w}-nocdn: probe ${e.message.slice(0, 120)}`); }
    await p.close();
  }
  if (ONLY_NOCDN) return r;
  for (const w of [390, 768, 1024, 1440, 1920]) {
    const h = w < 768 ? 844 : w < 1440 ? 1024 : 900;
    const p = await open(url, w, h, false);
    try {
      const o = await evalIn(p.sessionId, OVERFLOW(w));
      if (o.els.length || o.sw > o.w + 1) r.overflow[w] = o;
      // a second look mid-page: a pinned track or a scrubbed scene can push something out only while it runs
      await evalIn(p.sessionId, "window.scrollTo(0,Math.round((document.documentElement.scrollHeight-innerHeight)*.5))");
      await sleep(500);
      const o2 = await evalIn(p.sessionId, OVERFLOW(w));
      if (o2.els.length && !r.overflow[w]) r.overflow[w] = { ...o2, mid: true };
      if (ONLY_OVERFLOW) { r.errors.push(...p.errors.map(x => `${w}: ${x}`)); await p.close(); continue; }
      if (w === 390) { await evalIn(p.sessionId, COLLECT); r.targets = await evalIn(p.sessionId, TARGETS); }
      if (w === 390 || w === 1440) { const n = await pass(p.sessionId); if (n.length) r.never[w] = n; }
    } catch (e) { r.errors.push(`${w}: probe ${e.message.slice(0, 120)}`); }
    r.errors.push(...p.errors.map(x => `${w}: ${x}`));
    await p.close();
  }
  for (const w of ONLY_OVERFLOW ? [] : [390, 1440]) {
    const p = await open(url, w, w < 768 ? 844 : 900, true);
    try { const n = await pass(p.sessionId); if (n.length) r.never[w + "-rm"] = n; } catch (e) { r.errors.push(`${w}-rm: probe ${e.message.slice(0, 120)}`); }
    r.errors.push(...p.errors.map(x => `${w}-rm: ${x}`));
    await p.close();
  }
  r.errors = [...new Set(r.errors)];
  return r;
}

(async () => {
  let code = 0;
  const results = [];
  try {
    await connect();
    const queue = [...ids];
    await Promise.all(Array.from({ length: PAR }, async () => {
      while (queue.length) {
        const id = queue.shift();
        if (!findPage(id)) { console.log(`?    ${id}`); continue; }
        let r;
        try { r = await sweep(id); } catch (e) { r = { id, fatal: e.message }; }
        results.push(r);
        const flags = r.fatal ? ["FATAL " + r.fatal] : [
          ...Object.keys(r.overflow).map(w => `גלישה@${w}`),
          ...Object.keys(r.never).map(w => `לא-נראה@${w}`),
          r.targets && r.targets.nBad ? `מגע<24×${r.targets.nBad}` : "",
          r.targets && r.targets.nTiny ? `טקסט<12×${r.targets.nTiny}` : "",
          r.errors.length ? `JS×${r.errors.length}` : ""].filter(Boolean);
        if (flags.length) code = 2;
        console.log(`${flags.length ? "!!" : "ok"}  ${id.padEnd(9)} ${flags.join("  ")}`);
      }
    }));
  } catch (e) { console.error(e.message); code = 1; }
  finally {
    results.sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
    writeFileSync(join(OUT, NAME + ".json"), JSON.stringify({ generated: new Date().toISOString(), overflowOnly: ONLY_OVERFLOW, results }, null, 1));
    console.log(`\nsweep: ${results.length} פריטים. דוח: ${join(OUT, NAME + ".json")}`);
    try { ws?.close(); } catch {}
    chrome.kill(); process.exit(code);
  }
})();
