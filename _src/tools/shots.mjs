#!/usr/bin/env node
// shots.mjs: צילום כל מהלך בשלושה מצבי גלילה אמיתיים, בדסקטופ ובמובייל, ואיסוף שגיאות JS בדרך.
//
// למה: בשני סבבי הסקירה של 10.9.2026, 16 מתוך 24 הדחיות של ליאב היו באגים שלא נראים בצילום
// סטטי ושמבחן ההתנהגות (behave.mjs) לא תופס: ספרה במכל ברוחב אפס, צבע שלא השתנה, מרקי שנתקע,
// סולם כניסות שנגמר לפני שמגיעים אליו. כולם נראים מיד בצילום של מצב גלילה אמיתי.
// לכן זה שער: מהלך לא מוצג לליאב לפני שגיליון הצילומים שלו נצפה.
//
// איך: כרום headless עם --remote-debugging-port, שיחה ב-CDP דרך ה-WebSocket הגלובלי של Node 24.
// לכל מהלך: ניווט, הסתרת הכרום של המאגר, ScrollTrigger.refresh, גלילה אמיתית לשלושה מצבים,
// צילום בכל אחד. פעמיים: 1280x800 ו-500x900 (כרום headless לא יורד מתחת ל-500 רוחב; 390 יוצא
// קרופ של viewport רחב יותר והתוכן נראה מוסט, נמדד). בדרך נאספות שגיאות קונסולה וחריגות.
// הפלט: _src/tools/out/shots/<id>-<pos>-<w>.png, index.html (גיליון קשר), sheet.png (הגיליון
// עצמו מצולם, כדי שאפשר יהיה להסתכל עליו בקריאה אחת), ו-report.json.
// בניגוד ל---screenshot של שורת הפקודה, CDP מחזיר את הפריים הנכון גם אחרי גלילה תוכניתית.
//
// שימוש:  node _src/tools/shots.mjs g105 b46          (מזהים)
//         node _src/tools/shots.mjs --all              (כל המהלכים, כ-20 דקות)
//         node _src/tools/shots.mjs g105 --pos 0.2,0.6 --hover   (מצבים משלך; --hover מפעיל mouseenter על האלמנט השני עם cursor:pointer לפני הצילום האחרון)
// יציאה: 0 כשאין שגיאות JS, 2 כשיש, 1 כשלא נמצא Chrome. אפס תלויות npm.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "_src", "tools", "out", "shots");
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const ALL = args.includes("--all");
const HOVER = args.includes("--hover");
const POS = (flag("--pos") || "0.15,0.5,0.85").split(",").map(Number);
const VIEWS = [[1280, 800], [500, 900]];
const MOVE_CATS = ["gsap", "behavior", "css", "lm", "misc", "style", "comp", "arch", "rhythm", "anti"];
const wanted = args.filter(a => !a.startsWith("--") && a !== flag("--pos"));

const CHROME = [process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
].filter(Boolean).find(existsSync);
if (!CHROME) { console.error("Chrome לא נמצא"); process.exit(1); }

const findPage = id => MOVE_CATS.map(d => join(ROOT, d, id + ".html")).find(existsSync);
let ids = wanted;
if (ALL) ids = MOVE_CATS.flatMap(d => existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter(f => f.endsWith(".html") && !f.includes(".tmp")).map(f => f.replace(".html", "")) : []);
if (!ids.length) { console.error("תן מזהים או --all"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 9400 + (process.pid % 500);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--allow-file-access-from-files", "--force-device-scale-factor=1", `--remote-debugging-port=${PORT}`,
  "--window-size=1280,800", "about:blank"], { stdio: "ignore" });

let ws, msgId = 0;
const pending = new Map();
const listeners = new Map();          // sessionId -> fn(event)
const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
  const id = ++msgId; pending.set(id, { res, rej });
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
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

async function shoot(id, file) {
  const errors = [];
  const shots = [];
  for (const [w, h] of VIEWS) {
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    listeners.set(sessionId, m => {
      if (m.method === "Runtime.exceptionThrown") errors.push(`${w}: ${m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text}`.slice(0, 300));
      if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(`${w}: console.error ${m.params.args?.map(a => a.value || a.description).join(" ")}`.slice(0, 300));
    });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 }, sessionId);
    await send("Page.navigate", { url: pathToFileURL(file).href }, sessionId);
    await sleep(1500);
    await send("Runtime.evaluate", { expression: `document.querySelectorAll(".vtop,.vintro,.mvcode,.mvpanel,.demo-note,.runway").forEach(e=>e.style.display="none");if(window.ScrollTrigger)ScrollTrigger.refresh();` }, sessionId);
    await sleep(400);
    for (let i = 0; i < POS.length; i++) {
      const pos = POS[i];
      await send("Runtime.evaluate", { expression: `window.scrollTo(0,Math.round((document.documentElement.scrollHeight-innerHeight)*${pos}))` }, sessionId);
      await sleep(800);
      if (HOVER && i === POS.length - 1) {
        await send("Runtime.evaluate", { expression: `(function(){var els=[...document.querySelectorAll("*")].filter(e=>getComputedStyle(e).cursor==="pointer"&&e.getBoundingClientRect().width>20);var t=els[1]||els[0];if(t){t.dispatchEvent(new Event("mouseenter"));t.dispatchEvent(new MouseEvent("mouseover",{bubbles:true}));t.classList.add("__hov");}})()` }, sessionId);
        await sleep(700);
      }
      const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }, sessionId);
      const name = `${id}-${pos}-${w}.png`;
      writeFileSync(join(OUT, name), Buffer.from(data, "base64"));
      shots.push(name);
    }
    listeners.delete(sessionId);
    await send("Target.closeTarget", { targetId });
  }
  return { id, shots, errors: [...new Set(errors)] };
}

function indexHtml(results) {
  const rows = results.map(r => `<section><h2>${r.id}${r.errors.length ? ` <b class="err">${r.errors.length} שגיאות JS</b>` : ""}</h2>
<div class="row">${r.shots.filter(s => s.includes("-1280.")).map(s => `<figure><img src="${s}"><figcaption>${s.split("-")[1]}</figcaption></figure>`).join("")}
${r.shots.filter(s => s.includes("-500.")).map(s => `<figure class="m"><img src="${s}"><figcaption>${s.split("-")[1]}</figcaption></figure>`).join("")}</div>
${r.errors.length ? `<pre>${r.errors.join("\n")}</pre>` : ""}</section>`).join("\n");
  return `<!doctype html><html dir="rtl" lang="he"><meta charset="utf-8"><title>גיליון צילומים</title>
<style>body{margin:0;padding:16px;font:13px system-ui;background:#fff;color:#111}section{margin-bottom:18px;break-inside:avoid}h2{margin:0 0 6px;font-size:14px}
.row{display:flex;gap:6px;align-items:flex-start}figure{margin:0;flex:0 0 300px}figure.m{flex:0 0 100px}img{width:100%;display:block;border:1px solid #ddd}
figcaption{font-size:11px;color:#666;text-align:center}.err{color:#b00020;font-weight:700}pre{font-size:11px;color:#b00020;white-space:pre-wrap;margin:4px 0 0}</style>
<body>${rows}</body></html>`;
}

(async () => {
  let code = 0;
  try {
    await connect();
    const results = [];
    for (const id of ids) {
      const file = findPage(id);
      if (!file) { console.log(`?    ${id}  אין עמוד`); continue; }
      const r = await shoot(id, file);
      results.push(r);
      console.log(`${r.errors.length ? "ERR " : "ok  "} ${id.padEnd(8)} ${r.shots.length} צילומים${r.errors.length ? ", " + r.errors[0] : ""}`);
      if (r.errors.length) code = 2;
    }
    writeFileSync(join(OUT, "index.html"), indexHtml(results));
    writeFileSync(join(OUT, "report.json"), JSON.stringify({ generated: new Date().toISOString(), pos: POS, results }, null, 1));
    // הגיליון עצמו מצולם: קובץ אחד להסתכל עליו לפני שמראים לליאב
    // צילום מעבר ל-viewport עם override של מטריקות מחזיר לבן (נמדד); לכן מחכים לתמונות, מודדים את
    // גובה המסמך, מגדירים את ה-viewport לגובה הזה (עד 12 שורות) ומצלמים רגיל.
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1380, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send("Page.navigate", { url: pathToFileURL(join(OUT, "index.html")).href }, sessionId);
    await send("Runtime.evaluate", { expression: `Promise.all([...document.images].map(i=>i.decode().catch(()=>0))).then(()=>document.documentElement.scrollHeight)`, awaitPromise: true, returnByValue: true }, sessionId)
      .then(async r => {
        const h = Math.min(Math.max(600, r.result.value || 900), 12 * 300 + 60);
        await send("Emulation.setDeviceMetricsOverride", { width: 1380, height: h, deviceScaleFactor: 1, mobile: false }, sessionId);
        await sleep(400);
      });
    const { data } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    writeFileSync(join(OUT, "sheet.png"), Buffer.from(data, "base64"));
    await send("Target.closeTarget", { targetId });
    console.log(`\nshots: ${results.length} מהלכים, ${results.filter(r => r.errors.length).length} עם שגיאות JS\nגיליון: ${join(OUT, "sheet.png")}${results.length > 12 ? " (12 הראשונים; המלא ב-index.html)" : ""}`);
  } catch (e) { console.error(e.message); code = code || 1; }
  finally { try { ws?.close(); } catch {} chrome.kill(); process.exit(code); }
})();
