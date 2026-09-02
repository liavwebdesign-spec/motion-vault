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
  Flip: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
  ScrambleTextPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js",
  MotionPathPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js",
  ScrollToPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollToPlugin.min.js",
  CustomEase: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js",
  CustomWiggle: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomWiggle.min.js",
  Observer: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js",
  MorphSVGPlugin: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js",
  Matter: "https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js",
  Lenis: "https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js",
};
// ספריות שאינן פלאגינים של GSAP: נטענות אבל לא נרשמות ב-registerPlugin
const NON_GSAP = new Set(["Matter", "Lenis"]);

// שימושים אפשריים: הסינון השני של האינדקס. כל מהלך יכול להשתייך לכמה.
const USES_LABELS = {
  text: "טקסט וכותרות", media: "תמונות וגלריות", cards: "כרטיסים",
  process: "תהליך ושלבים", hero: "הירו ופתיחה", hover: "hover ומיקרו",
  feedback: "טעינה ופידבק", ambient: "רקע ואווירה", numbers: "מספרים ונתונים",
  nav: "ניווט ומבנה",
};
const USES = {
  g01: ["process", "media"], g02: ["media", "hero"], g03: ["hero", "media"],
  g04: ["text"], g05: ["media", "process"], g06: ["media"], g07: ["hover", "media", "hero"],
  g08: ["hover", "ambient"], g09: ["hover"], g10: ["hover", "hero"], g11: ["media", "hover"],
  g12: ["ambient", "hero"], g13: ["cards"], g14: ["numbers"], g15: ["hero", "feedback"],
  g15b: ["hero", "feedback"], g16: ["text", "hover"], g17: ["cards", "hero"],
  g18: ["hero", "media"], g19: ["numbers", "ambient"], g20: ["process"], g22: ["process", "numbers"],
  r01: ["text", "ambient"], r02: ["ambient", "media"], r03: ["cards", "hover"],
  r04: ["media", "hero"], r05: ["media", "cards"], r06: ["media", "cards", "hover"],
  r07: ["media", "hero"], r08: ["ambient", "media"], r09: ["cards", "process"],
  r10: ["media"], r11: ["media", "cards"],
  b01: ["ambient", "nav"], b02: ["numbers"], b02b: ["media", "hover"], b03: ["nav"],
  b04: ["cards", "nav"], b05: ["nav", "feedback"], b06: ["numbers", "hero"],
  b07: ["cards"], b08: ["cards"], b09: ["text", "hero"], b10: ["nav", "ambient"],
  b11: ["feedback", "ambient"], b12: ["media", "hero"], b13: ["ambient"],
  b14: ["ambient"], b15: ["feedback"], b16: ["feedback"],
  css01: ["cards", "hover"], css02: ["nav", "hover", "text"], css03: ["hover"],
  css04: ["text"], css05: ["media", "text"], css06: ["nav"], css07: ["feedback"],
  css08: ["text", "hero"], css09: ["feedback"], css10: ["cards", "hover"],
  css11: ["text", "hero"], css12: ["cards", "ambient"],
  lm1: ["ambient", "hero"], lm3: ["cards", "process"], lm4: ["cards", "process"],
  lm5: ["hero"], lm6: ["nav"], lm7: ["hover"], lm8: ["ambient"], lm9: ["cards", "hover"],
  fluid: ["hero", "nav"],
  g23: ["cards", "media", "hover"], g24: ["text", "hero"], g25: ["process", "ambient"],
  g26: ["process", "ambient"], g27: ["hover", "feedback"], g28: ["nav"],
  g29: ["hover", "feedback"], g30: ["process", "hero"],
  css13: ["text", "hero"], css14: ["media", "hover"], css15: ["cards", "hover"],
  css16: ["media", "hover"], css17: ["nav", "feedback"], css18: ["cards", "text"],
  css19: ["ambient", "text"], css20: ["hover", "feedback"], css21: ["feedback", "hover"],
  css22: ["ambient", "hero"],
  r12: ["process", "ambient"], r13: ["cards", "ambient"], r14: ["numbers"],
  r15: ["text"], r16: ["text", "hero"], r17: ["media", "cards"],
  r18: ["ambient", "hero"], r19: ["ambient", "hero"], r20: ["ambient"],
  r21: ["nav", "hover"], r22: ["feedback", "cards"], r23: ["hero", "media"],
  r24: ["text", "hero"], r25: ["text"], r26: ["ambient", "hero"], r27: ["hover"],
  g31: ["hero", "media"], g32: ["text", "hero"], g33: ["cards", "hero"], g34: ["cards", "ambient"],
  g35: ["text", "hero"], g36: ["ambient", "nav"], g37: ["media", "hero", "ambient"], g38: ["nav", "ambient"],
  b17: ["nav", "numbers"], b18: ["nav"],
  g39: ["text", "ambient"], b19: ["media", "cards", "hover"], b20: ["numbers", "feedback"],
  css23: ["media", "cards", "nav"],
  g40: ["process", "cards", "nav"], g41: ["ambient", "hero"], css24: ["text"],
  g42: ["text", "hero"], b21: ["hover", "ambient"], b22: ["media", "hero"],
  g43: ["media", "hover", "cards"], b23: ["nav"], b24: ["hover", "feedback"], b25: ["ambient", "hero"],
  g44: ["ambient", "process"], b26: ["text", "hero", "feedback"], b27: ["media", "nav", "cards"],
  g45: ["process", "numbers", "media"], b28: ["ambient", "hero"], b29: ["ambient", "nav"],
  b30: ["nav", "text"], b31: ["cards", "media", "nav"], b32: ["feedback", "text"], b33: ["media", "cards"],
};

// load all catalog modules
const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import("./catalog/" + f);
  entries.push(...mod.default);
}
const missing = entries.filter(e => !USES[e.id]).map(e => e.id);
if (missing.length) throw new Error("entries missing USES tags: " + missing.join(", "));

const FONT = `<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;400;500;700;800&display=swap" rel="stylesheet">`;

function page(e) {
  const libs = (e.libs || []).map(l => `<script src="${CDN[l]}"></script>`).join("\n");
  const register = (e.libs || []).filter(l => l !== "gsap" && !NON_GSAP.has(l)).join(", ");
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
  ${(USES[e.id] || []).map(u => `<span class="chip use">${USES_LABELS[u]}</span>`).join("")}
  <span class="chip st-pending" data-mvchip>ממתין</span>
  <button class="mvid" data-mvid="MV:${e.id}"><code>MV:${e.id}</code> העתק מזהה</button>
</div></div>
<div class="vintro">
  <p>${e.desc}</p>
  <p class="when"><b>מתי משתמשים:</b> ${e.when}</p>
  <div class="mvpanel" data-mvpanel="${e.id}"></div>
  <p class="inherit-note">הדמו כאן עיצובי-ניטרלי בכוונה. כשהמהלך נכנס לפרויקט, מיובאת רק ההתנהגות: הצבעים, הרדיוסים, הפונטים והצללים יורשים את העיצוב של אותו פרויקט.</p>
</div>
${runway}
${e.html}
${runwayEnd}
${e.note ? `<div class="demo-note">${e.note}</div>` : ""}
${libs}
<script src="../assets/baseline.js"></script>
<script src="../assets/status.js"></script>
<script>
if(window.MV)MV.panel(document.querySelector("[data-mvpanel]"));
document.querySelector(".mvid").addEventListener("click",function(){
  navigator.clipboard.writeText(this.dataset.mvid+" · ${e.name}").then(()=>{
    this.classList.add("copied");const c=this.querySelector("code").textContent;
    this.innerHTML="<code>"+c+"</code> הועתק ✓";
    setTimeout(()=>{this.classList.remove("copied");this.innerHTML="<code>"+c+"</code> העתק מזהה";},1800);
  });
});
${register ? `gsap.registerPlugin(${register});` : ""}
${e.js || ""}
</script>
</body>
</html>`;
}

function indexPage() {
  const cards = entries.map(e => `<a class="vcard" data-id="${e.id}" data-cat="${e.cat}" data-uses="${(USES[e.id] || []).join(" ")}" data-txt="${("MV:" + e.id + " " + e.name + " " + e.desc + " " + e.tech + " " + (USES[e.id] || []).map(u => USES_LABELS[u]).join(" ")).replace(/"/g, "")}" href="${e.cat}/${e.id}.html">
  <div class="row"><span class="vid">MV:${e.id}</span><span class="chip cat-${e.cat}">${CATS[e.cat]}</span><span class="chip stchip st-pending">ממתין</span></div>
  <h3>${e.name}</h3><p>${e.desc}</p>
  <div class="row"><span class="chip">${e.tech}</span>${(USES[e.id] || []).map(u => `<span class="chip use">${USES_LABELS[u]}</span>`).join("")}</div>
</a>`).join("\n");
  const REPORT_LIST = JSON.stringify(entries.map(e => ({ id: e.id, name: e.name, cat: e.cat })));
  const counts = Object.fromEntries(Object.keys(CATS).map(c => [c, entries.filter(e => e.cat === c).length]));
  const fbtns = Object.entries(CATS).map(([k, v]) => `<button class="fbtn" data-f="${k}">${v} · ${counts[k]}</button>`).join("");
  const ucounts = Object.fromEntries(Object.keys(USES_LABELS).map(u => [u, entries.filter(e => (USES[e.id] || []).includes(u)).length]));
  const ubtns = Object.entries(USES_LABELS).map(([k, v]) => `<button class="ubtn" data-u="${k}">${v} · ${ucounts[k]}</button>`).join("");
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
  <input class="fsearch" type="search" placeholder="חיפוש חופשי או MV:id...">
  <span class="fcount"></span>
</div>
<div class="vfilters2">
  <span style="font-size:13px;color:var(--muted);align-self:center;font-weight:600">לפי שימוש:</span>
  ${ubtns}
  <span class="sep"></span>
  <span style="font-size:13px;color:var(--muted);align-self:center;font-weight:600">לפי סטטוס:</span>
  <button class="sbtn" data-s="ok">מאושרים</button>
  <button class="sbtn" data-s="no">לא מאושרים</button>
  <button class="sbtn" data-s="pending">ממתינים</button>
  <button class="report-btn">📋 העתק דוח לקלוד</button>
</div>
<div class="vgrid">
${cards}
</div>
<script src="assets/baseline.js"></script>
<script src="assets/status.js"></script>
<script>
const LIST=${REPORT_LIST};
const cards=[...document.querySelectorAll('.vcard')],btns=[...document.querySelectorAll('.fbtn')],
ubtns=[...document.querySelectorAll('.ubtn')],sbtns=[...document.querySelectorAll('.sbtn')],
search=document.querySelector('.fsearch'),count=document.querySelector('.fcount');
let cat='all',use=null,stf=null;
function paintStatus(){
  cards.forEach(c=>{
    const s=MV.state(c.dataset.id),chip=c.querySelector('.stchip');
    chip.textContent=MV.label(s);chip.className='chip stchip st-'+s;
    c.dataset.status=s;
  });
}
function apply(){
  const q=search.value.trim().toLowerCase();let n=0;
  cards.forEach(c=>{
    const ok=(cat==='all'||c.dataset.cat===cat)
      &&(!use||c.dataset.uses.split(' ').includes(use))
      &&(!stf||c.dataset.status===stf)
      &&(!q||c.dataset.txt.toLowerCase().includes(q));
    c.hidden=!ok; if(ok)n++;
  });
  count.textContent=n+' מוצגים';
}
btns.forEach(b=>b.addEventListener('click',()=>{btns.forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.f;apply();}));
ubtns.forEach(b=>b.addEventListener('click',()=>{
  if(b.classList.contains('on')){b.classList.remove('on');use=null;}
  else{ubtns.forEach(x=>x.classList.remove('on'));b.classList.add('on');use=b.dataset.u;}
  apply();
}));
sbtns.forEach(b=>b.addEventListener('click',()=>{
  if(b.classList.contains('on')){b.classList.remove('on');stf=null;}
  else{sbtns.forEach(x=>x.classList.remove('on'));b.classList.add('on');stf=b.dataset.s;}
  apply();
}));
document.querySelector('.report-btn').addEventListener('click',function(){
  navigator.clipboard.writeText(MV.report(LIST)).then(()=>{
    this.classList.add('copied');this.textContent='הדוח הועתק ✓ הדבק לקלוד';
    setTimeout(()=>{this.classList.remove('copied');this.textContent='📋 העתק דוח לקלוד';},2200);
  });
});
search.addEventListener('input',apply);
paintStatus();apply();
addEventListener('pageshow',()=>{paintStatus();apply();});
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
