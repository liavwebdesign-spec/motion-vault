#!/usr/bin/env node
// numbering.mjs: מספור דקורטיבי וכרטיס תבנית בדמואים של המאגר (20.10.2026, באישור המנכ"ל).
//
// למה: ההנחיה לסוכן מעתיקה את ה-HTML של הדמו, ודמו שמלמד "01 · כותרת" או כרטיס של מספר+קטגוריה+כותרת+תיאור+חץ
// מלמד בדיוק את מה שהתורה אוסרת מ-19.10 (qa-checklist 11ב). זה אותו בודק שרץ על פרויקטים ב-project-check
// (_numbering.mjs בתורה), כאן על עמודי המאגר. סדר אמיתי (שלבים, ציר זמן, דירוג) מסומן ב-<ol> או ב-data-order
// על הקבוצה, והבודק מדלג עליו.
// אנטי-פטרנים (anti) מדולגים: הצד הרע שלהם מראה את הטעות בכוונה (A16).
//
// שימוש:  node _src/tools/numbering.mjs g01 s07     (מזהים)
//         node _src/tools/numbering.mjs --all
// יציאה: 0 נקי, 1 נמצא משהו (gate נעצר), 2 תקלה.

import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const { numberingProbe } = await import(pathToFileURL(join(homedir(), ".claude/skills/design-dna/tools/site-qa/_numbering.mjs")).href);
const args = process.argv.slice(2);
const CATS = ["gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc", "style", "comp", "arch", "rhythm"];
const findPage = id => CATS.map(d => join(ROOT, d, id + ".html")).find(existsSync);
let ids = args.filter(a => !a.startsWith("--"));
if (args.includes("--all")) ids = CATS.flatMap(d => existsSync(join(ROOT, d)) ? readdirSync(join(ROOT, d)).filter(f => f.endsWith(".html") && !f.includes(".tmp")).map(f => f.replace(".html", "")) : []);
ids = ids.filter(id => !/^a\d/.test(id));
if (!ids.length) { console.log("numbering: אין פריטים לבדוק (אנטי-פטרנים מדולגים)"); process.exit(0); }

const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe")].filter(Boolean).find(existsSync);
if (!CHROME) { console.error("Chrome לא נמצא"); process.exit(2); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 9400 + (process.pid % 90);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--allow-file-access-from-files",
  "--force-device-scale-factor=1", `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(process.env.TEMP || ".", "numbering-" + PORT)}`,
  "--disable-background-timer-throttling", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding",
  "--window-size=1440,900", "about:blank"], { stdio: "ignore" });

let ws, msgId = 0;
const pending = new Map();
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
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } };
}
const evalIn = async (sessionId, expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
};

// the vault's own chrome (top bar, intro, code panel, footer of the page) is not the demo
// a digit inside an image placeholder (.ph "1", "2") names the slot, it is not a kicker; .tagc is the archetype's own
// annotation of section order ("3 · עדויות · C13"), which is the point of an archetype
const STRIP = `document.querySelectorAll(".vtop,.vintro,.mvcode,.vpn-foot,.mvpanel,.demo-note,.bpbar,.runway,.tagc").forEach(e=>e.remove());document.querySelectorAll(".ph").forEach(e=>{e.textContent=""})`;
const SCROLL = `(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0);await new Promise(r=>setTimeout(r,700))})()`;

async function check(id) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  try {
    await send("Page.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] }, sessionId);
    await send("Page.navigate", { url: pathToFileURL(findPage(id)).href }, sessionId);
    for (let t = 0; t < 40; t++) { if (await evalIn(sessionId, "document.readyState").catch(() => "") === "complete") break; await sleep(150); }
    await sleep(600);
    await evalIn(sessionId, SCROLL);
    await evalIn(sessionId, STRIP);
    return await evalIn(sessionId, `(${numberingProbe.toString()})()`);
  } finally { await send("Target.closeTarget", { targetId }).catch(() => {}); }
}

let code = 0;
try {
  await connect();
  const queue = [...ids], hits = [];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const id = queue.shift();
      if (!findPage(id)) { console.log(`?    ${id}`); continue; }
      try {
        const r = await check(id), list = [...r.deco.map(x => "מספור: " + x), ...r.cards.map(x => "כרטיס תבנית: " + x)];
        if (list.length) { hits.push(id); code = 1; console.log(`!!  ${id.padEnd(9)} ${list.join("  |  ")}`); }
      } catch (e) { code = Math.max(code, 2); console.log(`ERR ${id.padEnd(9)} ${e.message.slice(0, 120)}`); }
    }
  }));
  console.log(`\nnumbering: ${ids.length} נבדקו, ${hits.length} עם מספור דקורטיבי או כרטיס תבנית${hits.length ? ": " + hits.sort().join(" ") : ""}`);
  if (hits.length) console.log("תיקון: מורידים את המספר, או מסמנים סדר אמיתי ב-<ol> או ב-data-order על הקבוצה (qa-checklist 11ב).");
} catch (e) { console.error(e.message); code = 2; }
finally { try { ws?.close(); } catch {} chrome.kill(); process.exit(code); }
