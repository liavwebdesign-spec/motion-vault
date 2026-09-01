// Motion Vault builder: generates one page per animation + a filterable index.
// Run: node _src/build.mjs   (from the project root)
import { writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATS = { gsap: "GSAP", react: "React", behavior: "התנהגויות", css: "CSS טהור", lm: "חתימה (LM)", misc: "מסגרת" };
const CDN = {
  gsap: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  ScrollTrigger: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
  SplitText: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js",
  Draggable: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js",
  InertiaPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js",
  DrawSVGPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js",
};

// load all catalog modules
const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import("./catalog/" + f);
  entries.push(...mod.default);
}

const FONT = `<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;400;500;700;800&display=swap" rel="stylesheet">`;

function page(e) {
  const libs = (e.libs || []).map(l => `<script src="${CDN[l]}"></script>`).join("\n");
  const register = (e.libs || []).filter(l => l !== "gsap").join(", ");
  const runway = e.runway === false ? "" : `<div class="runway">גלול למטה, הדמו מגיע ↓</div>`;
  const runwayEnd = e.runway === false ? "" : `<div class="runway">עוד מסלול גלילה. נסה גם חזרה למעלה ↑</div>`;
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${e.id.toUpperCase()} · ${e.name} | Motion Vault</title>
${FONT}
<link rel="stylesheet" href="../assets/vault.css">
<style>
${e.css || ""}
</style>
</head>
<body>
<div class="vtop"><div class="vtop-in">
  <a class="vback" href="../index.html">→ לכל המאגר</a>
  <h1><span class="vid">${e.id.toUpperCase()}</span> · ${e.name}</h1>
  <span class="chip cat-${e.cat}">${CATS[e.cat]}</span>
  <span class="chip">${e.tech}</span>
  <span class="chip ${e.status === "מאושר" ? "st-approved" : "st-pending"}">${e.status === "מאושר" ? "מאושר-עין" : "ממתין לאישור"}</span>
</div></div>
<div class="vintro">
  <p>${e.desc}</p>
  <p class="when"><b>מתי משתמשים:</b> ${e.when}</p>
</div>
${runway}
${e.html}
${runwayEnd}
${e.note ? `<div class="demo-note">${e.note}</div>` : ""}
${libs}
<script>
${register ? `gsap.registerPlugin(${register});` : ""}
${e.js || ""}
</script>
</body>
</html>`;
}

function indexPage() {
  const cards = entries.map(e => `<a class="vcard" data-cat="${e.cat}" data-txt="${(e.id + " " + e.name + " " + e.desc + " " + e.tech).replace(/"/g, "")}" href="${e.cat}/${e.id}.html">
  <div class="row"><span class="vid">${e.id.toUpperCase()}</span><span class="chip cat-${e.cat}">${CATS[e.cat]}</span><span class="chip ${e.status === "מאושר" ? "st-approved" : "st-pending"}">${e.status === "מאושר" ? "מאושר" : "ממתין"}</span></div>
  <h3>${e.name}</h3><p>${e.desc}</p><div class="row"><span class="chip">${e.tech}</span></div>
</a>`).join("\n");
  const counts = Object.fromEntries(Object.keys(CATS).map(c => [c, entries.filter(e => e.cat === c).length]));
  const fbtns = Object.entries(CATS).map(([k, v]) => `<button class="fbtn" data-f="${k}">${v} · ${counts[k]}</button>`).join("");
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Motion Vault | מאגר האנימציות של ליאב</title>
${FONT}
<link rel="stylesheet" href="assets/vault.css">
</head>
<body>
<div class="vhead">
  <h2>Motion Vault</h2>
  <p>מאגר האנימציות החי: ${entries.length} דמואים בכל הטכנולוגיות. כל כרטיס נפתח לעמוד מבודד עם הדמו רץ בלייב. סנן, חפש, פתח, גלול.</p>
</div>
<div class="vfilters">
  <button class="fbtn on" data-f="all">הכל · ${entries.length}</button>
  ${fbtns}
  <input class="fsearch" type="search" placeholder="חיפוש חופשי...">
  <span class="fcount"></span>
</div>
<div class="vgrid">
${cards}
</div>
<script>
const cards=[...document.querySelectorAll('.vcard')],btns=[...document.querySelectorAll('.fbtn')],
search=document.querySelector('.fsearch'),count=document.querySelector('.fcount');
let cat='all';
function apply(){
  const q=search.value.trim().toLowerCase();let n=0;
  cards.forEach(c=>{
    const ok=(cat==='all'||c.dataset.cat===cat)&&(!q||c.dataset.txt.toLowerCase().includes(q));
    c.hidden=!ok; if(ok)n++;
  });
  count.textContent=n+' מוצגים';
}
btns.forEach(b=>b.addEventListener('click',()=>{btns.forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.f;apply();}));
search.addEventListener('input',apply);apply();
</script>
</body>
</html>`;
}

// write everything
for (const cat of Object.keys(CATS)) mkdirSync(join(ROOT, cat), { recursive: true });
let n = 0;
for (const e of entries) { writeFileSync(join(ROOT, e.cat, e.id + ".html"), page(e)); n++; }
writeFileSync(join(ROOT, "index.html"), indexPage());
writeFileSync(join(ROOT, "robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(join(ROOT, ".nojekyll"), "");
console.log(`built ${n} pages + index (${entries.length} entries)`);
