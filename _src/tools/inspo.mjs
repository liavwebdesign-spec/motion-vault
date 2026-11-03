#!/usr/bin/env node
// inspo.mjs: אתרי ההשראה של המאגר (ליאב, 2.11.2026: "סקשן וסריקה שבועית").
//
// הכלל שהכלי שומר: אתר שליאב לא אישר לא נשלף ולא מוצג. מקור האמת לאישור הוא assets/baseline.js, כמו בכל המאגר.
// הצילומים המלאים נשמרים ב-assets/inspo-internal/ שלא נכנס לגיט של המאגר. עותקים דחוסים עולים לריפו נפרד,
// motion-vault-shots (ליאב, 3.11.2026: "באוויר, בנפרד"), ומחיקה שלו מורידה את כולם בבת אחת.
//
// שימוש:
//   node _src/tools/inspo.mjs check <url> --id w03     בדיקה שהאתר חי ועובד בטלפון + צילומים מתוארכים
//   node _src/tools/inspo.mjs pick --field <תחום> --mood quiet|wow [--strength <s>] [--n 5]   רק מאושרים
//   node _src/tools/inspo.mjs status                   כמה ממתינים, ואילו כתובות כבר נבחנו
//   node _src/tools/inspo.mjs add <file.json> [--batch] מוסיף מועמד אחרי בדיקת שדות וכפילות (ממתין לליאב). --batch רק כשליאב ביקש אצווה גדולה; הסריקה השבועית נשארת עם תקרה של 5
//   node _src/tools/inspo.mjs sync '<json>'            {"w01":{"s":"ok","note":"","t":123}} לתוך baseline.js, רק מזהי אתרים
//   node _src/tools/inspo.mjs shots [--push]           עותקים דחוסים לריפו התמונות (רק מה שחדש), ועם --push גם דוחף
// יציאה: 0 תקין, 1 שגיאת שימוש, 2 כשהבדיקה נכשלה (האתר לא חי, או גולש הצידה בטלפון). אפס תלויות npm.

import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { FIELDS, MOODS, STRENGTHS, STYLES } from "../inspo-pages.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DATA = join(ROOT, "_src", "inspo", "sites.json");
const PASSED = join(ROOT, "_src", "inspo", "passed.txt"); // אתרים שהסריקה פסלה בעצמה: "<דומיין> <סיבה>" בכל שורה, כדי לא לבדוק שוב
const BASE = join(ROOT, "assets", "baseline.js");
const SHOTS = join(ROOT, "assets", "inspo-internal");
const LOOK = join(ROOT, "_src", "tools", "out", "inspo");
const SHOTS_REPO = join(ROOT, "..", "motion-vault-shots");
// [המקור, הסיומת בריפו, רוחב, איכות]: הכרטיס טוען את שתי הקטנות, ורק לחיצה על כרטיס טוענת את העמוד המלא
const SHOT_SIZES = [["d", "d", 800, 62], ["m", "m", 200, 60], ["d-full", "df", 1100, 55], ["m-full", "mf", 390, 55]];

const args = process.argv.slice(2);
const cmd = args[0];
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const today = () => new Date().toLocaleDateString("sv-SE");
const sites = () => JSON.parse(readFileSync(DATA, "utf8"));
function baseline() {
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(BASE, "utf8"), ctx);
  return ctx.window.MV_BASELINE || {};
}
const stateOf = (b, id) => (b[id] && b[id].s) || "pending";
const norm = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/[/#?].*$/, "").toLowerCase();

if (cmd === "pick") pick();
else if (cmd === "status") status();
else if (cmd === "add") add();
else if (cmd === "sync") sync();
else if (cmd === "check") await check();
else if (cmd === "shots") await shots();
else { console.error("שימוש: check | pick | status | add | sync | shots"); process.exit(1); }

function pick() {
  const b = baseline(), n = Number(flag("--n") || 5), field = flag("--field"), mood = flag("--mood"), strength = flag("--strength");
  const ok = sites().filter(s => stateOf(b, s.id) === "ok" && (!strength || s.strengths.includes(strength)));
  // קודם אותו תחום ואותה אווירה, ואז אותו תחום, ואז אותה אווירה. אתר שלא עונה על אף אחד לא נשלף.
  const rank = s => (field && s.field === field ? 2 : 0) + (mood && s.mood === mood ? 1 : 0);
  const out = ok.map(s => ({ s, r: rank(s) })).filter(x => x.r > 0 || (!field && !mood)).sort((x, y) => y.r - x.r).slice(0, n).map(x => x.s);
  if (!out.length) console.log("אין עדיין אתר מאושר שמתאים. ממשיכים בלי השראה מהרשימה, ולא משתמשים במועמד שלא אושר.");
  out.forEach(s => console.log(`MV:${s.id} ${s.name} · ${s.url}\n  תחום: ${s.field} · ${MOODS[s.mood]} · חזק ב: ${s.strengths.map(k => STRENGTHS[k]).join(", ")}\n  למה: ${s.why}\n  מה לוקחים מחליטים בפרויקט. בלי להעתיק קוד, טקסטים ותמונות.`));
}

function status() {
  const b = baseline(), all = sites();
  const by = s => all.filter(x => stateOf(b, x.id) === s);
  console.log(`מאושרים ${by("ok").length} · ממתינים ${by("pending").length} · לא אושרו ${by("no").length}`);
  by("pending").forEach(s => console.log(`ממתין: ${s.id} ${s.url}`));
  // אתר שליאב דחה לא מוצע שוב: הרשימה כוללת גם אותו
  const passed = existsSync(PASSED) ? readFileSync(PASSED, "utf8").split("\n").map(l => l.split(" ")[0]).filter(Boolean) : [];
  console.log("כבר נבחנו: " + [...all.map(s => norm(s.url)), ...passed].join(" "));
  console.log("המזהה הפנוי הבא: w" + String(Math.max(0, ...all.map(s => Number(s.id.slice(1)))) + 1).padStart(2, "0"));
}

function add() {
  const c = JSON.parse(readFileSync(args[1], "utf8")), all = sites(), bad = [];
  if (!/^https:\/\//.test(c.url || "")) bad.push("url חייב להתחיל ב-https");
  const passed = existsSync(PASSED) ? readFileSync(PASSED, "utf8").split("\n").map(l => l.split(" ")[0]) : [];
  if (all.some(s => norm(s.url) === norm(c.url || "")) || passed.includes(norm(c.url || ""))) bad.push("האתר כבר נבחן: " + c.url);
  if (!FIELDS.includes(c.field)) bad.push("תחום לא מהרשימה: " + FIELDS.join(", "));
  if (!MOODS[c.mood]) bad.push("אווירה: quiet או wow");
  if (!STYLES[c.style]) bad.push("סגנון: " + Object.keys(STYLES).join(", "));
  if (!c.strengths?.length || c.strengths.some(k => !STRENGTHS[k])) bad.push("חזק ב: " + Object.keys(STRENGTHS).join(", "));
  for (const k of ["name", "why", "phone"]) if (!c[k]) bad.push("חסר " + k);
  const id = /^w\d{2,}$/.test(c.id || "") && !all.some(s => s.id === c.id) ? c.id : null;
  if (!id) bad.push("id חסר או תפוס. המזהה מגיע מ-status, ואותו מזהה משמש ל-check.");
  // מועמד בלי צילומים מהיום לא עבר בדיקה
  if (!c.shots?.length || !existsSync(join(SHOTS, `${c.id}-${c.shots[c.shots.length - 1]}-m-full.jpg`))) bad.push("חסרים צילומים: קודם check, ואז shots עם התאריך");
  const b = baseline();
  if (!args.includes("--batch") && all.filter(s => stateOf(b, s.id) === "pending").length >= 5) bad.push("כבר 5 מועמדים ממתינים לליאב. לא מערימים עוד.");
  if (bad.length) { console.error(bad.join("\n")); process.exit(2); }
  all.push({ id, name: c.name, url: c.url, field: c.field, mood: c.mood, style: c.style, strengths: c.strengths, rtl: !!c.rtl, why: c.why, whyBy: "proposal", phone: c.phone, shots: c.shots, added: today(), source: c.source || "הסריקה השבועית" });
  writeFileSync(DATA, JSON.stringify(all, null, 2) + "\n");
  console.log("נוסף " + id + ", ממתין לליאב במסך הסקירה.");
}

function sync() {
  const incoming = JSON.parse(args[1]), ids = new Set(sites().map(s => s.id));
  let src = readFileSync(BASE, "utf8"), n = 0;
  for (const [id, r] of Object.entries(incoming)) {
    if (!ids.has(id)) continue;
    const line = `  "${id}": { s: ${r.s ? JSON.stringify(r.s) : "null"}, note: ${JSON.stringify(r.note || "")}, t: ${Number(r.t) || Date.now()} },`;
    const re = new RegExp(`^\\s*"${id}": \\{.*$`, "m");
    src = re.test(src) ? src.replace(re, line) : src.replace(/\n\};?\s*$/, `\n${line}\n};\n`);
    n++;
  }
  writeFileSync(BASE, src);
  baseline(); // קורס כאן אם הקובץ נשבר, לפני שמישהו דוחף אותו
  console.log("סונכרנו " + n + " אתרים");
}

async function shots() {
  if (!existsSync(join(SHOTS_REPO, ".git"))) { console.error("חסר הריפו המקומי של התמונות: " + SHOTS_REPO); process.exit(1); }
  const jobs = [], missing = [];
  for (const s of sites()) {
    const date = s.shots[s.shots.length - 1];
    for (const [from, to, width, quality] of SHOT_SIZES) {
      const src = join(SHOTS, `${s.id}-${date}-${from}.jpg`), out = join(SHOTS_REPO, `${s.id}-${to}.jpg`);
      if (!existsSync(src)) { missing.push(src); continue; }
      if (!existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs) jobs.push({ src, out, width, quality });
    }
  }
  if (missing.length) { console.error("חסרים צילומים:\n" + missing.join("\n")); process.exit(2); }
  const failed = [];
  const worker = async () => {
    for (let j; (j = jobs.shift());) {
      await new Promise(done => spawn("magick", [j.src, "-strip", "-resize", `${j.width}x`, "-sampling-factor", "4:2:0", "-interlace", "JPEG", "-quality", String(j.quality), j.out], { stdio: "ignore" })
        .on("error", () => { failed.push(j.src); done(); })
        .on("exit", code => { if (code) failed.push(j.src); done(); }));
    }
  };
  const total = jobs.length;
  await Promise.all(Array.from({ length: 6 }, worker));
  if (failed.length) { console.error("נכשלו:\n" + failed.join("\n")); process.exit(2); }
  console.log(`נוצרו ${total} תמונות`);
  if (!args.includes("--push")) return;
  const git = (...a) => execFileSync("git", a, { cwd: SHOTS_REPO, encoding: "utf8" });
  git("add", "-A");
  if (!git("status", "--porcelain").trim()) { console.log("אין מה לדחוף"); return; }
  git("commit", "-m", `צילומי אתרי השראה: ${today()}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`);
  git("push", "origin", "main");
  console.log("נדחף");
}

async function check() {
  const url = args[1], id = flag("--id");
  if (!/^https?:\/\//.test(url || "") || !id) { console.error("שימוש: check <url> --id w03"); process.exit(1); }
  const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find(p => p && existsSync(p));
  if (!CHROME) { console.error("לא נמצא Chrome"); process.exit(1); }
  const date = today(), port = 9400 + Math.floor(Math.random() * 400), profile = join(tmpdir(), "mv-inspo-" + process.pid);
  mkdirSync(SHOTS, { recursive: true }); mkdirSync(join(LOOK, id), { recursive: true });
  // פרופיל ריק וזמני: בלי חשבונות, ובלי ללחוץ על באנרים של עוגיות
  const proc = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
  const report = { id, url, date, views: {} };
  try {
    let target;
    for (let i = 0; i < 60 && !target; i++) {
      await new Promise(r => setTimeout(r, 250));
      try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page"); } catch {}
    }
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r, x) => { ws.onopen = r; ws.onerror = x; });
    let seq = 0; const waiting = new Map(), events = [];
    ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) { waiting.get(d.id)?.(d.result || {}); waiting.delete(d.id); } else events.forEach(f => f(d)); };
    const send = (method, params = {}) => new Promise(r => { const i = ++seq; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const ev = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
    const shot = async (file, clip) => {
      const r = await send("Page.captureScreenshot", { format: "jpeg", quality: 74, captureBeyondViewport: !!clip, ...(clip ? { clip } : {}) });
      if (r.data) writeFileSync(file, Buffer.from(r.data, "base64"));
    };
    await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable"); await send("Log.enable");

    for (const [key, w, h, mobile] of [["d", 1440, 900, false], ["m", 390, 844, true]]) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
      await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
      await send("Network.setUserAgentOverride", { userAgent: mobile ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36" });
      let status = 0, finalUrl = url, errors = 0, loaded = false;
      const on = (d) => {
        if (d.method === "Network.responseReceived" && d.params.type === "Document" && !status) { status = d.params.response.status; finalUrl = d.params.response.url; }
        if (d.method === "Page.loadEventFired") loaded = true;
        if (d.method === "Runtime.exceptionThrown") errors++;
      };
      events.push(on);
      const t0 = Date.now();
      await send("Page.navigate", { url });
      for (let i = 0; i < 100 && !loaded; i++) await sleep(250);
      const loadMs = Date.now() - t0;
      await sleep(6000); // אנימציית פתיחה: מצלמים אחרי שהיא נגמרה (FlowFest באמצעה ב-3 שניות)
      await shot(join(SHOTS, `${id}-${date}-${key}.jpg`));
      // גוללים בצעדים כדי שתמונות עצלות ואנימציות כניסה יתעוררו לפני הצילום המלא
      const height = await ev("document.documentElement.scrollHeight");
      const steps = Math.min(40, Math.ceil(height / (h * .8)));
      for (let i = 1; i <= steps; i++) {
        await ev(`window.scrollTo(0, ${Math.round(i * h * .8)})`);
        await sleep(350);
        if ([.25, .5, .75].some(p => i === Math.max(1, Math.round(steps * p)))) await shot(join(LOOK, id, `${key}-${i}.jpg`));
      }
      await ev("window.scrollTo(0, 0)"); await sleep(600);
      const m = await ev(`({inner:innerWidth,scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,dir:(document.documentElement.dir||getComputedStyle(document.body).direction),lang:document.documentElement.lang,title:document.title,
        small:[...document.querySelectorAll("p,li,a,button,span")].filter(e=>e.offsetParent&&e.textContent.trim()&&!e.children.length&&parseFloat(getComputedStyle(e).fontSize)<12).length,
        tiny:[...document.querySelectorAll("a,button")].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<24||r.width<24)}).length})`);
      await shot(join(SHOTS, `${id}-${date}-${key}-full.jpg`), { x: 0, y: 0, width: w, height: Math.min(m?.height || h, 14000), scale: 1 });
      events.splice(events.indexOf(on), 1);
      report.views[key] = { status, finalUrl, loadMs, errors, ...m, overflow: m ? m.scroll > m.inner + 2 : null };
    }
    ws.close();
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 500));
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
  }
  const live = report.views.d?.status === 200 && report.views.m?.status === 200;
  report.pass = live && report.views.m?.overflow === false;
  report.look = join(LOOK, id);
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.pass ? 0 : 2);
}
