#!/usr/bin/env node
// thumbs.mjs: a preview image for every vault page, for the library view (library.html, 23.9.2026).
// Liav: "306 items and you have to open each one to know what it looks like". Same CDP pattern as shots.mjs:
// the vault chrome (top bar, intro, code panel) is hidden, the page is scrolled to where the demo is alive,
// and one 1280x800 frame is captured at 0.4375 scale = 560x350 JPEG in assets/thumbs/<id>.jpg.
// usage: node _src/tools/thumbs.mjs            (only missing thumbs)
//        node _src/tools/thumbs.mjs --all      (rebuild all)
//        node _src/tools/thumbs.mjs g83 hd6    (these ids)
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "assets", "thumbs");
const args = process.argv.slice(2);
const ALL = args.includes("--all");
const wanted = args.filter(a => !a.startsWith("--"));
const CATS = ["gsap", "behavior", "header", "hero", "footer", "css", "lm", "misc", "comp", "rhythm", "style", "anti", "arch"];
const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].filter(Boolean).find(existsSync);
if (!CHROME) { console.error("Chrome לא נמצא"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

let pages = CATS.flatMap(c => existsSync(join(ROOT, c)) ? readdirSync(join(ROOT, c)).filter(f => f.endsWith(".html") && !f.includes(".tmp")).map(f => ({ id: f.replace(".html", ""), file: join(ROOT, c, f), cat: c })) : []);
if (wanted.length) pages = pages.filter(p => wanted.includes(p.id));
// only missing ones by default: build.mjs rewrites every page on every run, so an mtime check would redo all 306.
// after changing a demo, pass its id (the gate does this for the ids it checks).
else if (!ALL) pages = pages.filter(p => !existsSync(join(OUT, p.id + ".jpg")));
if (!pages.length) { console.log("thumbs: nothing to do"); process.exit(0); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 9600 + (process.pid % 300);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--mute-audio",
  "--allow-file-access-from-files", "--force-device-scale-factor=1", `--remote-debugging-port=${PORT}`, "--window-size=1280,800", "about:blank"], { stdio: "ignore" });
let ws, msgId = 0; const pending = new Map();
const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const id = ++msgId; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })); });

async function connect() {
  let ver; for (let i = 0; i < 80; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
  if (!ver) throw new Error("no devtools port");
  ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); } };
}

// where the demo "lives": doctrine pages (style, comp, arch...) read best from the top; motion demos a bit into the scroll
const POS = cat => ["style", "comp", "rhythm", "arch", "anti", "misc", "header", "hero", "footer"].includes(cat) ? 0.02 : 0.3;

async function shoot(p) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  try {
    await send("Page.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send("Page.navigate", { url: pathToFileURL(p.file).href }, sessionId);
    await sleep(1600);
    await send("Runtime.evaluate", { expression: `document.querySelectorAll(".vtop,.vintro,.mvcode,.mvpanel,.demo-note,.runway,.bpbar,.fontbar,h2.sr-only").forEach(e=>e.style.display="none");document.documentElement.style.scrollBehavior="auto";if(window.ScrollTrigger)ScrollTrigger.refresh();` }, sessionId);
    await sleep(300);
    await send("Runtime.evaluate", { expression: `window.scrollTo(0,Math.round(Math.max(0,document.documentElement.scrollHeight-innerHeight)*${POS(p.cat)}));window.dispatchEvent(new Event("scroll"));` }, sessionId);
    await sleep(1100);
    const { data } = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, clip: { x: 0, y: 0, width: 1280, height: 800, scale: 0.4375 }, captureBeyondViewport: false }, sessionId);
    writeFileSync(join(OUT, p.id + ".jpg"), Buffer.from(data, "base64"));
    return true;
  } catch (e) { console.error(`  ${p.id}: ${e.message}`); return false; }
  finally { await send("Target.closeTarget", { targetId }).catch(() => {}); }
}

let code = 0;
try {
  await connect();
  let done = 0, ok = 0; const queue = [...pages]; const W = 4;
  await Promise.all(Array.from({ length: W }, async () => { while (queue.length) { const p = queue.shift(); if (await shoot(p)) ok++; done++; if (done % 25 === 0) console.log(`  ${done}/${pages.length}`); } }));
  console.log(`thumbs: ${ok}/${pages.length} written to assets/thumbs`);
  if (ok < pages.length) code = 1;
} catch (e) { console.error(e.message); code = 1; }
finally { chrome.kill(); }
process.exit(code);
