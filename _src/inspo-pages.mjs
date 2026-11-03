// inspo-pages.mjs: סקשן אתרי ההשראה (ליאב, 2.11.2026). אתרים שלמים של אחרים, לא מהלכים שלנו,
// ולכן הם לא נכנסים ל-entries של הקטלוג: בלי שער, בלי ייצוא, בלי ספירה במאגר, ובלי golden.json.
// מועמד מחכה במסך האישור של הסקשן (inspo-review.html), לפי תחומים. inspo.html מציג רק מה שאושר ב-baseline.
// הצילומים עצמם לא בריפו הזה: עותקים דחוסים בריפו נפרד (ליאב, 3.11.2026: "באוויר, בנפרד"), וכתובותיהם נבנות ב-JS.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const FIELDS = ["אירועים ובידור", "ביטוח ופיננסים", "שירותים מקצועיים", "נדל\"ן ובנייה", "מסחר וחנויות", "מזון ומסעדות", "בריאות ויופי", "תיירות ופנאי", "טכנולוגיה ו-SaaS", "עיצוב וסטודיו", "חינוך ותרבות", "תעשייה ו-B2B", "בעלי מקצוע ובית", "רכב", "ילדים ומשפחה", "עמותות וקהילה"];
// סדר התצוגה לפי תמהיל הלקוחות בפועל (3.11.2026, מהפרויקטים והלידים ב-CRM); עיצוב וסטודיו בסוף, כי הוא מקור לרעיונות ולא התחום של הלקוח
const FIELD_ORDER = ["שירותים מקצועיים", "ביטוח ופיננסים", "בעלי מקצוע ובית", "נדל\"ן ובנייה", "תעשייה ו-B2B", "בריאות ויופי", "ילדים ומשפחה", "מסחר וחנויות", "מזון ומסעדות", "תיירות ופנאי", "רכב", "חינוך ותרבות", "טכנולוגיה ו-SaaS", "עמותות וקהילה", "אירועים ובידור", "עיצוב וסטודיו"];
const SHOTS_BASE = "https://liavwebdesign-spec.github.io/motion-vault-shots/";
export const MOODS = { quiet: "שקט", wow: "חוויתי" };
// סגנון העיצוב של האתר (ליאב, 2.11.2026: "בכל סגנונות העיצוב"). תג אחד לכל אתר, לפי מה שהכי מגדיר אותו.
export const STYLES = { minimal: "מינימליסטי", editorial: "מגזיני", bold: "טיפוגרפיה ענקית", brutalist: "ברוטליסטי", retro: "רטרו", playful: "שובב וצבעוני", illustrated: "מאויר", immersive: "תלת-ממד וחוויה", luxury: "יוקרתי", organic: "טבעי וחם", product: "מוצר נקי", dark: "כהה וטכנולוגי", photo: "צילום גדול" };
// רמת הגימור, אותן ארבע רמות של מסך האפיון וטבלת המחירים ב-CRM: לפי מה שאנחנו יכולים לספק ברמה הזו, לא לפי איך האתר נבנה.
// תלת מימד בזמן אמת נכנס ל"שומט לסתות" רק במובן של רצף תמונות מרונדר שמתנגן עם הגלילה, וזה מה שמוכרים ברמה הזו.
export const LEVELS = { classic: "קלאסי", high: "גימור גבוה", premium: "פרמיום", jaw: "שומט לסתות" };
export const STRENGTHS = { type: "טיפוגרפיה", illustration: "איור", photo: "צילום", color: "צבע", motion: "תנועה", layout: "פריסה", character: "אופי", simple: "פשטות", conversion: "המרה", mobile: "טלפון", rtl: "עברית ומימין לשמאל" };

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const domain = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const fmt = (d) => d.split("-").reverse().join(".");
const LABEL = "אתר של גורם אחר. השראה בלבד, לא עבודה שלנו.";

const CSS = `
.iw{max-width:1120px;margin-inline:auto;padding:clamp(24px,4vw,56px) var(--gutter)}
.iw h1{font-size:clamp(28px,4vw,44px);line-height:1.15;margin:0 0 8px;font-weight:700}
.iw-lead{color:var(--muted);margin:0 0 24px;max-width:70ch}
.iw-label{display:inline-block;font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;background:color-mix(in srgb,var(--accent) 10%,#fff);color:var(--ink);margin:0 0 16px}
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
.iw-filters{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px}
.iw-filters select{flex:1 1 150px;max-width:100%;min-width:0;font:inherit;font-size:15px;min-height:44px;padding:0 14px;border-radius:999px;border:1px solid var(--line);background:#fff}
.iw-result{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;min-height:44px;margin:0 0 12px;color:var(--muted);font-size:15px}
.iw-clear{font:inherit;font-size:15px;font-weight:600;color:var(--accent);background:none;border:0;min-height:44px;padding:0 4px;cursor:pointer}
.iw-near{font-size:14px;font-weight:600;color:var(--accent)}
.iw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:16px}
.iw-card{display:flex;flex-direction:column;gap:10px;padding:20px;border-radius:12px;background:#fff;box-shadow:0 1px 8px rgb(0 0 0 / .07)}
.iw-card[hidden]{display:none}
.iw-card h2{font-size:20px;margin:0}
.iw-card h2 a{color:inherit;text-decoration:none}
.iw-card p{margin:0;line-height:1.5}
.iw-card .iw-out{margin-top:auto;font-weight:600;color:var(--accent);text-decoration:none;min-height:32px;display:inline-flex;align-items:center}
.iw-empty{padding:40px 0;color:var(--muted)}
.iw-stage{position:relative;display:block;margin:-20px -20px 4px;padding-bottom:12px}
.iw-stage img{display:block;background:#ececf4}
.iw-stage .iw-d{width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;border-radius:12px 12px 0 0}
.iw-stage .iw-m{position:absolute;left:14px;bottom:0;width:20%;height:auto;aspect-ratio:9/19;object-fit:cover;object-position:top;border-radius:8px;box-shadow:0 0 0 3px #fff,0 6px 18px rgb(0 0 0 / .25)}
@media (max-width:767px){.iw-shots{grid-template-columns:1fr}}
`;

const REVIEW_CSS = `
:root{--yes:#0a7d4f;--yes-bg:#e8f6ee;--no:#b02525;--no-bg:#faecec;--chip:#ececf4}
.ir{max-width:1360px;margin-inline:auto;padding:clamp(24px,4vw,48px) var(--gutter) 0}
.ir h1{font-size:clamp(28px,4vw,44px);line-height:1.15;margin:20px 0 8px;font-weight:700}
.ir-label{display:inline-block;font-size:14px;font-weight:600;padding:6px 14px;border-radius:999px;background:color-mix(in srgb,var(--accent) 10%,#fff);margin:0 0 12px}
.ir-lead{color:var(--muted);margin:0 0 12px;max-width:72ch}
.ir-where{font-size:14.5px;color:var(--muted);margin:0 0 20px;max-width:72ch}
.ir button,.ir select{font:inherit;color:inherit}
.ir button{cursor:pointer}
.ir-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.ir-row+.ir-row{margin-top:10px}
.ir-fields{position:sticky;top:0;z-index:5;background:var(--bg);padding:10px 0;border-bottom:1px solid var(--line)}
.ir-fields::-webkit-scrollbar,.ir-styles::-webkit-scrollbar{display:none}
.ir-bar{padding:12px 0;margin-bottom:12px}
.ir-chip{flex:none;min-height:38px;border:0;background:var(--chip);border-radius:999px;padding:6px 14px;font-size:14.5px;font-weight:500;white-space:nowrap}
.ir-chip b{display:inline-block;font-weight:400;color:var(--muted);margin-inline-start:4px}
.ir-chip[aria-pressed="true"]{background:var(--ink);color:#fff}
.ir-chip[aria-pressed="true"] b{color:inherit;opacity:.7}
.ir-bar select{min-height:38px;border:0;background:var(--chip);border-radius:999px;padding:6px 14px;font-size:14.5px;max-width:100%}
.ir-report{margin-inline-start:auto}
.ir-sec{margin-top:12px}
.ir-h{font-size:clamp(23px,2.6vw,29px);line-height:1.2;font-weight:700;margin:0 0 14px;display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}
.ir-h span{font-size:14.5px;font-weight:500;color:var(--muted)}
.ir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,400px),1fr));gap:20px;padding-bottom:48px}
.ir-card{background:var(--card);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 2px rgb(0 0 0 / .06);transition:opacity .2s}
.ir-card.is-no{opacity:.45}
.ir-card.is-ok{box-shadow:0 0 0 2px var(--yes)}
.ir-stage{position:relative;display:block;width:100%;border:0;padding:0 0 14px;background:none;text-align:inherit}
.ir-stage .ir-d{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;background:var(--chip)}
.ir-stage .ir-m{position:absolute;left:14px;bottom:0;width:21%;height:auto;aspect-ratio:9/19;object-fit:cover;object-position:top;border-radius:9px;background:var(--chip);box-shadow:0 0 0 3px var(--card),0 6px 18px rgb(0 0 0 / .28)}
.ir-body{padding:12px 18px 16px;display:flex;flex-direction:column;gap:8px;flex:1}
.ir-card h3{font-size:20px;font-weight:700;margin:0;line-height:1.25;padding-left:24%}
.ir-tags{display:flex;flex-wrap:wrap;gap:6px;padding-left:24%;min-height:26px}
.ir-txt{margin:0;font-size:15px;line-height:1.55}
.ir-txt span{display:block;font-size:13px;color:var(--muted);font-weight:500}
.ir-foot{display:flex;gap:8px;align-items:center;margin-top:auto;padding-top:10px}
.ir-link{color:var(--accent);font-size:14.5px;font-weight:500;text-decoration:none;padding:8px 2px;margin-inline-end:auto}
.ir-link:hover{text-decoration:underline}
.ir-vote{min-width:64px;min-height:42px;border-radius:10px;border:1px solid var(--line);background:none;font-weight:700;font-size:15px}
.ir-vote[data-v="ok"][aria-pressed="true"]{background:var(--yes-bg);color:var(--yes);border-color:var(--yes)}
.ir-vote[data-v="no"][aria-pressed="true"]{background:var(--no-bg);color:var(--no);border-color:var(--no)}
.ir-empty{color:var(--muted);padding:48px 0;text-align:center}
.ir-report-text{flex:1 0 100%;width:100%;min-height:180px;margin-top:8px;padding:12px;border:1px solid var(--line);border-radius:10px;font:inherit;font-size:14px;background:none;color:inherit}
.ir-dlg{border:0;padding:0;margin:0;width:100vw;max-width:100vw;height:100dvh;max-height:100dvh;background:var(--bg);color:var(--ink)}
.ir-dlg::backdrop{background:rgb(10 10 12 / .62)}
.ir-dh{display:flex;align-items:center;gap:8px;padding:10px 20px;border-bottom:1px solid var(--line);height:64px}
.ir-dh h3{margin:0;font-size:18px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-inline-end:auto}
.ir-sq{width:42px;height:42px;flex:none;border:1px solid var(--line);background:none;border-radius:10px;font-size:18px;line-height:1}
.ir-views{height:calc(100dvh - 64px);display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:20px;padding:0 20px;overflow-y:auto;align-items:start}
.ir-views img{display:block;width:100%;height:auto;background:var(--chip)}
.ir-vd{max-width:900px;justify-self:center;width:100%;padding:20px 0}
.ir-vm{padding:20px 0}
.ir-vm img{border-radius:12px}
.ir-sw{display:none}
.ir-sw .ir-chip{min-height:36px}
@media (max-width:760px){
  .ir-styles,.ir-fields{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-inline:calc(var(--gutter) * -1);padding-inline:var(--gutter)}
  .ir-report{margin-inline-start:0}
  .ir-dh{padding:10px 12px;flex-wrap:wrap;height:auto}
  .ir-dh h3{width:100%}
  .ir-views{display:block;height:calc(100dvh - 112px);padding:0 12px}
  .ir-sw{display:flex;gap:6px;margin-inline-end:auto}
  .ir-views[data-v="m"] .ir-vd,.ir-views[data-v="d"] .ir-vm{display:none}
  .ir-vm{max-width:340px;margin:0 auto}
}
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
    <div><dt>למה שווה להסתכל עליו</dt><dd>${esc(s.why)}</dd></div>
    <div><dt>תחום, גימור וסגנון</dt><dd class="iw-chips"><span class="vchip">${esc(s.field)}</span>${s.level ? `<span class="vchip">${LEVELS[s.level]}</span>` : ""}${s.style ? `<span class="vchip">${STYLES[s.style]}</span>` : ""}<span class="vchip">${MOODS[s.mood]}</span>${s.strengths.map(k => `<span class="vchip">${STRENGTHS[k]}</span>`).join("")}</dd></div>
  </dl>
  <div data-shots data-id="${s.id}" data-date="${date || ""}"></div>
</main>
<script>
(function(){
  // האישור נעשה במסך האישור. בעמוד עצמו אין פאנל בדיקה, כי מציגים אותו ללקוחות.
  var box=document.querySelector("[data-shots]"),d=box.dataset.date,id=box.dataset.id,base="${SHOTS_BASE}";
  if(d){
    var when=d.split("-").reverse().join(".");
    box.innerHTML='<div class="iw-shots"><figure><img alt="האתר בדסקטופ" src="'+base+id+'-df.jpg"><figcaption>דסקטופ, צולם ב-'+when+'</figcaption></figure><figure><img alt="האתר בטלפון" src="'+base+id+'-mf.jpg"><figcaption>טלפון, צולם ב-'+when+'</figcaption></figure></div>';
  }
})();
</script>
</body>
</html>`;
}

export function inspoIndexPage(approved, { FONT }) {
  const opts = (vals) => vals.map(([v, t]) => `<option value="${esc(v)}" data-t="${esc(t)}">${esc(t)}</option>`).join("");
  const usedFields = FIELD_ORDER.filter(f => approved.some(s => s.field === f)).map(f => [f, f]);
  const usedStrengths = [...new Set(approved.flatMap(s => s.strengths))].map(k => [k, STRENGTHS[k]]);
  const usedStyles = Object.entries(STYLES).filter(([k]) => approved.some(s => s.style === k));
  const cards = approved.map(s => `<article class="iw-card" data-field="${esc(s.field)}" data-level="${s.level || ""}" data-mood="${s.mood}" data-style="${s.style || ""}" data-str="${s.strengths.join(" ")}">
    <a class="iw-stage" href="inspo/${s.id}.html" aria-label="${esc(s.name)}" data-stage="${s.id}"></a>
    <h2><a href="inspo/${s.id}.html">${esc(s.name)}</a></h2>
    <div class="iw-chips"><span class="vchip">${esc(s.field)}</span>${s.level ? `<span class="vchip">${LEVELS[s.level]}</span>` : ""}${s.style ? `<span class="vchip">${STYLES[s.style]}</span>` : ""}</div>
    <p class="iw-near" data-near hidden></p>
    <p>${esc(s.why)}</p>
    <a class="iw-out" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(domain(s.url))} ↗</a>
  </article>`).join("\n");
  // העמוד הזה נפתח מול לקוח בשיתוף מסך: בלי קישורים למאגר ולמסך האישור, ובלי ניסוחים פנימיים
  return `${head("אתרי השראה", FONT, "")}
<body>
<main class="iw">
  <h1>אתרי השראה</h1>
  <p class="iw-label">אתרים של גורמים אחרים. השראה בלבד, לא עבודות שלנו.</p>
  <p class="iw-lead">אתרים שלמים שנבחרו ביד, כדי למצוא יחד כיוון לאתר שלכם. בוחרים תחום, רמת גימור וסגנון, ופותחים את מה שמדבר אליכם.</p>
  ${approved.length ? `<div class="iw-filters">
    <select data-f="field" aria-label="תחום"><option value="" data-t="כל התחומים">כל התחומים</option>${opts(usedFields)}</select>
    <select data-f="level" aria-label="רמת גימור"><option value="" data-t="כל רמות הגימור">כל רמות הגימור</option>${opts(Object.entries(LEVELS))}</select>
    <select data-f="style" aria-label="סגנון"><option value="" data-t="כל הסגנונות">כל הסגנונות</option>${opts(usedStyles)}</select>
    <select data-f="mood" aria-label="אווירה"><option value="" data-t="כל האווירות">כל האווירות</option>${opts(Object.entries(MOODS))}</select>
    <select data-f="str" aria-label="מה חזק בו"><option value="" data-t="מה חזק בו">מה חזק בו</option>${opts(usedStrengths)}</select>
  </div>
  <div class="iw-result"><span data-count aria-live="polite"></span><button class="iw-clear" type="button" data-clear hidden>נקה סינון</button></div>
  <div class="iw-grid">${cards}</div>` : `<p class="iw-empty">עדיין אין כאן אתרים.</p>`}
</main>
<script>
(function(){
  document.querySelectorAll("[data-stage]").forEach(function(a){
    var b="${SHOTS_BASE}"+a.dataset.stage;
    a.innerHTML='<img class="iw-d" loading="lazy" decoding="async" alt="" width="800" height="500" src="'+b+'-d.jpg"><img class="iw-m" loading="lazy" decoding="async" alt="" width="200" height="433" src="'+b+'-m.jpg">';
  });
  var sels=[].slice.call(document.querySelectorAll("[data-f]")),cards=[].slice.call(document.querySelectorAll(".iw-card")),count=document.querySelector("[data-count]"),clear=document.querySelector("[data-clear]");
  if(!sels.length)return;
  // משקל כל קריטריון כשאין התאמה מלאה: קודם התחום, אחריו הגימור, אחריו הסגנון
  var WEIGHT={field:16,level:8,style:4,mood:2,str:1},NAMES={field:"תחום",level:"גימור",style:"סגנון",mood:"אווירה",str:"מה שחזק בו"},NEAR=6,LV=${JSON.stringify(Object.keys(LEVELS))};
  function has(c,k,val){return k==="str"?c.dataset.str.split(" ").indexOf(val)>=0:c.dataset[k]===val;}
  function run(){
    var v={};sels.forEach(function(s){v[s.dataset.f]=s.value;});
    var on=sels.map(function(s){return s.dataset.f;}).filter(function(k){return v[k];}),n=0;
    cards.forEach(function(c){
      var ok=on.every(function(k){return has(c,k,v[k]);});
      c.hidden=!ok;c.style.order="";c.querySelector("[data-near]").hidden=true;
      if(ok)n++;
    });
    // מספר ליד כל אפשרות: כמה אתרים יישארו אם בוחרים בה, בלי לשנות את שאר הסינון
    sels.forEach(function(s){
      var k=s.dataset.f;
      [].forEach.call(s.options,function(o){
        if(!o.value)return;
        var m=cards.filter(function(c){return has(c,k,o.value)&&on.every(function(j){return j===k||has(c,j,v[j]);});}).length;
        o.textContent=o.dataset.t+" ("+m+")";
      });
    });
    clear.hidden=!on.length;
    if(n||!on.length){count.textContent=n===1?"אתר אחד":n+" אתרים";}
    else{
      // אין התאמה מלאה: במקום מסך ריק מציגים את הקרובים, ואומרים במה כל אחד מהם תואם
      var near=cards.map(function(c,i){
        var hit=on.filter(function(k){return has(c,k,v[k]);}),w=hit.reduce(function(a,k){return a+WEIGHT[k];},0),t=hit.map(function(k){return NAMES[k];});
        // רמת גימור סמוכה עדיין קרובה: מי שביקש קלאסי יכול להסתכל על גימור גבוה
        if(v.level&&!has(c,"level",v.level)&&Math.abs(LV.indexOf(c.dataset.level)-LV.indexOf(v.level))===1){w+=WEIGHT.level/2;t.push("גימור סמוך");}
        return {c:c,i:i,t:t,w:w};
      }).filter(function(x){return x.w>0;}).sort(function(a,b){return b.w-a.w||a.i-b.i;}).slice(0,NEAR);
      count.textContent=near.length?"אין אתר שעונה על כל הסינון הזה. אלה הכי קרובים:":"אין אתר שעונה על הסינון הזה.";
      near.forEach(function(x,i){
        var el=x.c.querySelector("[data-near]");
        el.textContent="תואם ב: "+x.t.join(", ");el.hidden=false;
        x.c.hidden=false;x.c.style.order=i;
      });
    }
    // הסינון נשמר בכתובת: חזרה מעמוד של אתר מחזירה אליו, ואפשר לפתוח את העמוד מסונן מראש
    var q=new URLSearchParams();on.forEach(function(k){q.set(k,v[k]);});
    history.replaceState(null,"",location.pathname+(on.length?"?"+q:""));
  }
  var start=new URLSearchParams(location.search);
  sels.forEach(function(s){
    var val=start.get(s.dataset.f);
    if(val&&[].some.call(s.options,function(o){return o.value===val;}))s.value=val;
    s.addEventListener("change",run);
  });
  clear.addEventListener("click",function(){sels.forEach(function(s){s.value="";});run();sels[0].focus();});
  run();
})();
</script>
</body>
</html>`;
}

// מסך האישור של הסקשן: כל האתרים לפי תחום, עם הצילומים וכפתורי כן ולא. כל סבב חדש של אתרים נכנס לכאן.
export function inspoReviewPage(all, { FONT, BV, client }) {
  const data = JSON.stringify({
    sites: all.map(({ id, name, url, field, mood, style, level, rtl, why, phone }) => ({ id, name, url, field, mood, style, level, rtl, why, phone })),
    styles: STYLES, moods: MOODS, levels: LEVELS, order: FIELD_ORDER, shots: SHOTS_BASE,
  }).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>אישור אתרי השראה · Motion Vault</title>
${FONT}
<link rel="stylesheet" href="assets/vault.css">
<style>${REVIEW_CSS}</style>
</head>
<body>
<main class="ir">
  <a class="vback" href="index.html">לכל המאגר</a>
  <a class="vback" href="inspo.html">מה שכבר אושר</a>
  <h1>אישור אתרי השראה</h1>
  <p class="ir-label">אתרים של גורמים אחרים. השראה בלבד, לא עבודות שלנו.</p>
  <p class="ir-lead">לחיצה על תחום מציגה רק אותו, והסגנון מצמצם בתוכו. לחיצה על תמונה פותחת את כל העמוד. באתרים עם גלילה מיוחדת התמונה הארוכה היא רצף פריימים מהמסע, ואת החוויה מקבלים בקישור לאתר עצמו. מה שתסמן "כן" ייכנס לסקשן אתרי ההשראה. "למה" הוא הצעה, לא קביעה. מה לוקחים מכל אתר מחליטים בכל פרויקט לגופו.</p>
  <p class="ir-where">הסימונים נשמרים בדפדפן של המכשיר הזה. סימנת בטלפון או במחשב אחר? "העתק דוח" ושליחה לקלוד מעבירים אותם למאגר.</p>
  <div class="ir-row ir-fields" id="fields" role="group" aria-label="סינון לפי תחום"></div>
  <div class="ir-bar" id="bar">
    <div class="ir-row ir-styles" id="styles" role="group" aria-label="סינון לפי סגנון"></div>
    <div class="ir-row">
      <div class="ir-row" id="status" role="group" aria-label="סינון לפי החלטה"></div>
      <select id="mood" aria-label="אווירה"><option value="">כל האווירות</option><option value="quiet">שקט</option><option value="wow">חוויתי</option></select>
      <button class="ir-chip" id="rtl" aria-pressed="false">רק עברית וערבית</button>
      <button class="ir-chip ir-report" id="report">העתק דוח</button>
    </div>
  </div>
  <div id="grid"></div>
  <dialog class="ir-dlg" id="dlg" aria-labelledby="dName">
    <div class="ir-dh">
      <h3 id="dName"></h3>
      <div class="ir-sw" role="group" aria-label="תצוגה">
        <button class="ir-chip" data-show="d" aria-pressed="true">דסקטופ</button>
        <button class="ir-chip" data-show="m" aria-pressed="false">טלפון</button>
      </div>
      <a class="ir-link" id="dLink" target="_blank" rel="noopener noreferrer" style="margin:0">לאתר</a>
      <button class="ir-vote" data-v="ok" id="dOk" aria-pressed="false">כן</button>
      <button class="ir-vote" data-v="no" id="dNo" aria-pressed="false">לא</button>
      <button class="ir-sq" id="dPrev" aria-label="האתר הקודם">→</button>
      <button class="ir-sq" id="dNext" aria-label="האתר הבא">←</button>
      <button class="ir-sq" id="dClose" aria-label="סגירה">✕</button>
    </div>
    <div class="ir-views" id="views" data-v="d">
      <div class="ir-vd"><img id="dDesk" alt=""></div>
      <div class="ir-vm"><img id="dMob" alt=""></div>
    </div>
  </dialog>
</main>
<script src="assets/baseline.js?v=${BV}"></script>
<script src="assets/status.js"></script>
<script>window.INSPO=${data};</script>
<script>
${client}
</script>
</body>
</html>`;
}

// כותב את העמודים. מה שנכנס ל-inspo.html נקבע רק לפי baseline, בזמן הבנייה.
export function writeInspo({ ROOT, FONT, ASSETV, BV }) {
  const all = JSON.parse(readFileSync(join(ROOT, "_src", "inspo", "sites.json"), "utf8"));
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(join(ROOT, "assets", "baseline.js"), "utf8"), ctx);
  const base = ctx.window.MV_BASELINE || {};
  mkdirSync(join(ROOT, "inspo"), { recursive: true });
  for (const s of all) writeFileSync(join(ROOT, "inspo", `${s.id}.html`), ASSETV(inspoSitePage(s, { FONT })));
  const rank = (s) => FIELD_ORDER.indexOf(s.field);
  writeFileSync(join(ROOT, "inspo.html"), ASSETV(inspoIndexPage(all.filter(s => base[s.id]?.s === "ok").sort((a, b) => rank(a) - rank(b)), { FONT })));
  const client = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "inspo-review.js"), "utf8");
  writeFileSync(join(ROOT, "inspo-review.html"), ASSETV(inspoReviewPage(all, { FONT, BV, client })));
}
