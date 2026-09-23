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
const CATS = ["gsap", "behavior", "header", "hero", "footer", "conv", "css", "lm", "misc", "comp", "rhythm", "style", "anti", "arch"];
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

// where the demo "lives". Doctrine and page parts (header/hero/footer, style, arch...) read best from the top.
// Motion demos sit between two .runway spacers and many only come alive mid-scroll, so a fixed fraction of the
// page gave 30 near-empty cards (23.9.2026). Now: walk down through the demo range in steps (so ScrollTrigger,
// IntersectionObserver and the inView checks all fire), park the mouse in the middle (hover demos), capture at
// four points and keep the richest frame. JPEG size is the richness measure: an empty frame compresses to ~2KB.
const TOP = new Set(["style", "comp", "rhythm", "arch", "anti", "misc", "header", "hero", "footer", "conv"]);
const HIDE = `.vtop,.vintro,.mvcode,.mvpanel,.demo-note,.bpbar,.fontbar,h2.sr-only`;

async function shoot(p) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const ev = (expression) => send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId).then(r => r.result && r.result.value);
  // clip is in document coordinates, not viewport ones: y must be the current scroll, or every frame is the page top
  const grab = async () => { const y = await ev("scrollY"); return send("Page.captureScreenshot", { format: "jpeg", quality: 70, clip: { x: 0, y: y || 0, width: 1280, height: 800, scale: 0.4375 }, captureBeyondViewport: false }, sessionId).then(r => Buffer.from(r.data, "base64")); };
  try {
    await send("Page.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false }, sessionId);
    await send("Page.navigate", { url: pathToFileURL(p.file).href }, sessionId);
    await sleep(1600);
    const top = TOP.has(p.cat);
    // doctrine pages have no runways: hide them too so the demo starts at the top. Motion pages keep them: they are the scroll room.
    await ev(`document.querySelectorAll(${JSON.stringify(HIDE + (top ? ",.runway" : ""))}).forEach(e=>e.style.display="none");document.documentElement.style.scrollBehavior="auto";if(window.ScrollTrigger)ScrollTrigger.refresh();0`);
    await sleep(300);
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 640, y: 400 }, sessionId).catch(() => {});
    if (top) {
      await ev(`scrollTo(0,0);dispatchEvent(new Event("scroll"));0`);
      // a phone stage (the mobile bars, conv): the thing to see appears only after the phone's own page scrolls
      await ev(`(async()=>{const s=document.querySelector("[data-phone] [data-scroller]");if(!s)return 0;for(let y=0;y<=900;y+=120){s.scrollTop=y;s.dispatchEvent(new Event("scroll"));await new Promise(r=>setTimeout(r,40))}return 1})()`);
      await sleep(900); writeFileSync(join(OUT, p.id + ".jpg"), await grab()); return true;
    }
    const [a, b] = await ev(`(()=>{const r=[...document.querySelectorAll(".runway")],H=document.documentElement.scrollHeight-innerHeight;
      const a=r.length?r[0].getBoundingClientRect().bottom+scrollY:0, b=r.length>1?r[r.length-1].getBoundingClientRect().top+scrollY-innerHeight:H;
      return [Math.max(0,Math.round(a-innerHeight*.15)),Math.max(0,Math.min(H,Math.round(b)))]})()`);
    let best = null, y = 0;
    for (const f of [0, 0.3, 0.55, 0.8]) {
      const target = Math.round(a + Math.max(0, b - a) * f);
      while (y < target) { y = Math.min(target, y + 350); await ev(`scrollTo(0,${y});dispatchEvent(new Event("scroll"));0`); await sleep(40); }
      await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 640 + (f * 40), y: 400 }, sessionId).catch(() => {});
      await sleep(900);
      const img = await grab();
      if (!best || img.length > best.length) best = img;
    }
    writeFileSync(join(OUT, p.id + ".jpg"), best);
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
