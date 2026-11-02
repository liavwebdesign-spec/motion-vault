// inspo-pages.mjs: סקשן אתרי ההשראה (ליאב, 2.11.2026). אתרים שלמים של אחרים, לא מהלכים שלנו,
// ולכן הם לא נכנסים ל-entries של הקטלוג: בלי שער, בלי ייצוא, בלי ספירה במאגר, ובלי golden.json.
// מועמד עובר דרך מסך הסקירה הרגיל (עמוד לכל אתר ב-inspo/<id>.html). inspo.html מציג רק מה שאושר ב-baseline.
// הצילומים פנימיים: הריפו ציבורי, ולכן בעמוד הציבורי יש קישור בלבד, ובשרת המקומי רואים גם את הצילומים.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

export const FIELDS = ["אירועים ובידור", "ביטוח ופיננסים", "שירותים מקצועיים", "נדל\"ן ובנייה", "מסחר וחנויות", "מזון ומסעדות", "בריאות ויופי", "תיירות ופנאי", "טכנולוגיה ו-SaaS", "עיצוב וסטודיו", "חינוך ותרבות", "תעשייה ו-B2B"];
export const MOODS = { quiet: "שקט", wow: "חוויתי" };
// סגנון העיצוב של האתר (ליאב, 2.11.2026: "בכל סגנונות העיצוב"). תג אחד לכל אתר, לפי מה שהכי מגדיר אותו.
export const STYLES = { minimal: "מינימליסטי", editorial: "מגזיני", bold: "טיפוגרפיה ענקית", brutalist: "ברוטליסטי", retro: "רטרו", playful: "שובב וצבעוני", illustrated: "מאויר", immersive: "תלת-ממד וחוויה", luxury: "יוקרתי", organic: "טבעי וחם", product: "מוצר נקי", dark: "כהה וטכנולוגי", photo: "צילום גדול" };
export const STRENGTHS = { type: "טיפוגרפיה", illustration: "איור", photo: "צילום", color: "צבע", motion: "תנועה", layout: "פריסה", character: "אופי", simple: "פשטות", conversion: "המרה", mobile: "טלפון", rtl: "עברית ומימין לשמאל" };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const domain = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const fmt = (d) => d.split("-").reverse().join(".");
const whyLine = (s) => s.whyBy === "liav" ? esc(s.why) : `${esc(s.why)} <span class="iw-prop">(הצעה לניסוח)</span>`;
const LABEL = "אתר של גורם אחר. השראה בלבד, לא עבודה שלנו.";

const CSS = `
.iw{max-width:1120px;margin-inline:auto;padding:clamp(24px,4vw,56px) var(--gutter)}
.iw h1{font-size:clamp(28px,4vw,44px);line-height:1.15;margin:0 0 8px;font-weight:700}
.iw-lead{color:var(--muted);margin:0 0 24px;max-width:70ch}
.iw-label{display:inline-block;font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;background:color-mix(in srgb,var(--accent) 10%,#fff);color:var(--ink);margin:0 0 16px}
.iw-prop{font-size:13px;font-weight:600;color:var(--muted);white-space:nowrap}
.iw-go{display:inline-flex;align-items:center;min-height:44px;padding:0 22px;border-radius:999px;background:var(--accent);color:var(--accent-ink);font-weight:600;text-decoration:none}
.iw-dl{display:grid;gap:16px;margin:24px 0;max-width:75ch}
.iw-dl dt{font-size:14px;color:var(--muted);margin:0 0 2px}
.iw-dl dd{margin:0;font-size:17px;line-height:1.5}
.iw-chips{display:flex;flex-wrap:wrap;gap:6px}
.iw-shots{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,1fr);gap:16px;margin:24px 0;align-items:start}
.iw-shots figure{margin:0}
.iw-shots img{display:block;width:100%;height:auto;border-radius:8px;box-shadow:0 2px 14px rgb(0 0 0 / .12)}
.iw-shots figcaption{font-size:14px;color:var(--muted);margin-top:8px}
.iw-note{color:var(--muted);font-size:15px;margin:24px 0}
.iw-filters{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 24px}
.iw-filters select{font:inherit;font-size:15px;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid var(--line);background:#fff}
.iw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:16px}
.iw-card{display:flex;flex-direction:column;gap:10px;padding:20px;border-radius:12px;background:#fff;box-shadow:0 1px 8px rgb(0 0 0 / .07)}
.iw-card h2{font-size:20px;margin:0}
.iw-card h2 a{color:inherit;text-decoration:none}
.iw-card p{margin:0;line-height:1.5}
.iw-card .iw-out{margin-top:auto;font-weight:600;color:var(--accent);text-decoration:none;min-height:32px;display:inline-flex;align-items:center}
.iw-empty{padding:40px 0;color:var(--muted)}
@media (max-width:767px){.iw-shots{grid-template-columns:1fr}}
`;

const head = (title, FONT, up) => `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
${FONT}
<link rel="stylesheet" href="${up}assets/vault.css">
<style>${CSS}</style>
</head>`;

export function inspoSitePage(s, { FONT }) {
  const date = s.shots[s.shots.length - 1];
  return `${head(`${esc(s.name)} · אתרי השראה`, FONT, "../")}
<body>
<main class="iw">
  <a class="vback" href="../inspo.html">כל אתרי ההשראה</a>
  <h1 style="margin-top:20px">${esc(s.name)}</h1>
  <p class="iw-label">${LABEL}</p>
  <p><a class="iw-go" href="${esc(s.url)}" target="_blank" rel="noopener">פתח את ${esc(domain(s.url))} ↗</a></p>
  <dl class="iw-dl">
    <div><dt>למה מאסט</dt><dd>${whyLine(s)}</dd></div>
    <div><dt>בטלפון</dt><dd>${esc(s.phone)}</dd></div>
    <div><dt>תחום ואווירה</dt><dd class="iw-chips"><span class="vchip">${esc(s.field)}</span><span class="vchip">${MOODS[s.mood]}</span>${s.style ? `<span class="vchip">${STYLES[s.style]}</span>` : ""}${s.strengths.map(k => `<span class="vchip">${STRENGTHS[k]}</span>`).join("")}</dd></div>
  </dl>
  <div data-shots data-id="${s.id}" data-date="${date || ""}"></div>
</main>
<script>
(function(){
  // האישור נעשה בכפתורים של מסך הסקירה. בעמוד עצמו אין פאנל בדיקה, כי מציגים אותו ללקוחות.
  if(/qa=0/.test(location.search))document.querySelector(".vback").hidden=true;
  var box=document.querySelector("[data-shots]"),d=box.dataset.date,id=box.dataset.id;
  var local=/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)||location.protocol==="file:";
  if(local&&d){
    var when=d.split("-").reverse().join(".");
    box.innerHTML='<div class="iw-shots"><figure><img loading="lazy" alt="האתר בדסקטופ" src="../assets/inspo-internal/'+id+'-'+d+'-d-full.jpg"><figcaption>דסקטופ, צולם ב-'+when+'</figcaption></figure><figure><img loading="lazy" alt="האתר בטלפון" src="../assets/inspo-internal/'+id+'-'+d+'-m-full.jpg"><figcaption>טלפון, צולם ב-'+when+'</figcaption></figure></div>';
  }else if(d){
    box.innerHTML='<p class="iw-note">צולם ב-'+d.split("-").reverse().join(".")+'. הצילומים נשמרים פנימית, והאתר עצמו בקישור למעלה.</p>';
  }
})();
</script>
</body>
</html>`;
}

export function inspoIndexPage(approved, { FONT }) {
  const opts = (vals) => vals.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join("");
  const usedFields = [...new Set(approved.map(s => s.field))].map(f => [f, f]);
  const usedStrengths = [...new Set(approved.flatMap(s => s.strengths))].map(k => [k, STRENGTHS[k]]);
  const usedStyles = Object.entries(STYLES).filter(([k]) => approved.some(s => s.style === k));
  const cards = approved.map(s => `<article class="iw-card" data-field="${esc(s.field)}" data-mood="${s.mood}" data-style="${s.style || ""}" data-str="${s.strengths.join(" ")}">
    <h2><a href="inspo/${s.id}.html">${esc(s.name)}</a></h2>
    <div class="iw-chips"><span class="vchip">${esc(s.field)}</span><span class="vchip">${MOODS[s.mood]}</span>${s.style ? `<span class="vchip">${STYLES[s.style]}</span>` : ""}</div>
    <p>${whyLine(s)}</p>
    <a class="iw-out" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(domain(s.url))} ↗</a>
  </article>`).join("\n");
  return `${head("אתרי השראה · Motion Vault", FONT, "")}
<body>
<main class="iw">
  <a class="vback" href="index.html">לכל המאגר</a>
  <h1 style="margin-top:20px">אתרי השראה</h1>
  <p class="iw-label">אתרים של גורמים אחרים. השראה בלבד, לא עבודות שלנו.</p>
  <p class="iw-lead">אתרים שלמים שנבחרו ביד, כדי לקחת מהם כיוון. מה לוקחים מכל אתר מחליטים בכל פרויקט לגופו, בלי להעתיק קוד, טקסטים ותמונות.</p>
  ${approved.length ? `<div class="iw-filters">
    <select data-f="field" aria-label="תחום"><option value="">כל התחומים</option>${opts(usedFields)}</select>
    <select data-f="style" aria-label="סגנון"><option value="">כל הסגנונות</option>${opts(usedStyles)}</select>
    <select data-f="mood" aria-label="אווירה"><option value="">כל האווירות</option>${opts(Object.entries(MOODS))}</select>
    <select data-f="str" aria-label="מה חזק בו"><option value="">מה חזק בו</option>${opts(usedStrengths)}</select>
  </div>
  <div class="iw-grid">${cards}</div>
  <p class="iw-empty" data-none hidden>אין אתר שעונה על הסינון הזה.</p>` : `<p class="iw-empty">עדיין אין אתר מאושר. מועמדים מחכים לליאב במסך הסקירה.</p>`}
</main>
<script>
(function(){
  var sels=[].slice.call(document.querySelectorAll("[data-f]")),cards=[].slice.call(document.querySelectorAll(".iw-card")),none=document.querySelector("[data-none]");
  function run(){
    var v={};sels.forEach(function(s){v[s.dataset.f]=s.value;});var n=0;
    cards.forEach(function(c){var ok=(!v.field||c.dataset.field===v.field)&&(!v.style||c.dataset.style===v.style)&&(!v.mood||c.dataset.mood===v.mood)&&(!v.str||c.dataset.str.split(" ").indexOf(v.str)>=0);c.hidden=!ok;if(ok)n++;});
    if(none)none.hidden=n>0;
  }
  sels.forEach(function(s){s.addEventListener("change",run);});
})();
</script>
</body>
</html>`;
}

// כותב את העמודים, ומחזיר את הרשימה למסך הסקירה. מה שנכנס ל-inspo.html נקבע רק לפי baseline, בזמן הבנייה.
export function writeInspo({ ROOT, FONT, ASSETV }) {
  const all = JSON.parse(readFileSync(join(ROOT, "_src", "inspo", "sites.json"), "utf8"));
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(join(ROOT, "assets", "baseline.js"), "utf8"), ctx);
  const base = ctx.window.MV_BASELINE || {};
  mkdirSync(join(ROOT, "inspo"), { recursive: true });
  for (const s of all) writeFileSync(join(ROOT, "inspo", `${s.id}.html`), ASSETV(inspoSitePage(s, { FONT })));
  writeFileSync(join(ROOT, "inspo.html"), ASSETV(inspoIndexPage(all.filter(s => base[s.id]?.s === "ok"), { FONT })));
  return all.map(s => ({ id: s.id, name: s.name, cat: "inspo", desc: s.why, when: "" }));
}
