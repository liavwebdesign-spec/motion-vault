// The vault home page (index.html). Built 23.9.2026 as library.html after Liav chose direction A, approved the same day.
// Why: 306 items in one flat grid, no previews, 14 mixed categories and three filter layers taking 174px sticky.
// Now: a sidebar grouped by what you are building (page parts / motion / doctrine), preview images from
// _src/tools/thumbs.mjs, one line per card, a slim search, status filter and the same report Liav sends me.
// The MV ids and every page URL stay exactly as they were: nothing in the skill links to this file.
// 30.9.2026, direction "לפי מה בונים" (Liav chose it over hover previews): the sidebar opens with "אני בונה", site type,
// section and a quiet-site switch from _src/place.mjs, every chip shows how many items it would leave, cards carry their
// sections, and a project tray collects items across pages and copies one list for a proposal or an agent brief.
// The old two-value "מתאים ל" filter (FIT) is gone from here; classic.html still has it.

const ZONES = [
  { key: "parts", label: "חלקי עמוד", cats: ["header", "hero", "comp", "footer", "conv"] },
  { key: "motion", label: "תנועה", cats: ["gsap", "behavior", "css", "lm"] },
  { key: "doctrine", label: "תורה", cats: ["style", "arch", "rhythm", "misc", "anti"] },
];
const CAT_LABEL = { misc: "מסגרות" };
// The font pairing showcase embeds licensed fonts, so it never ships with the public vault. A logon task on Liav's PC
// ("Liav Font Pairs Server", design-dna/tools/font-pairs/serve.mjs) serves it on loopback; elsewhere the link just fails.
const FONT_PAIRS = "http://127.0.0.1:4455/";
const LIVE = "https://liavwebdesign-spec.github.io/motion-vault";

export function libraryPage({ entries, CATS, USES, USES_LABELS, ELEMS, ELEMS_LABELS, BV, PLACE, SITES, SECS }) {
  const count = c => entries.filter(e => e.cat === c).length;
  const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const zoneOf = c => (ZONES.find(z => z.cats.includes(c)) || {}).key || "doctrine";
  const oneLine = d => { const s = String(d || "").split(/(?<=[.!?])\s/)[0]; return s.length > 120 ? s.slice(0, 117) + "..." : s; };
  const cards = entries.map(e => {
    const p = PLACE[e.id] || {};
    const secs = p.secs || [], sites = p.sites || [];
    const txt = ["MV:" + e.id, e.id, e.name, e.desc, e.tech, p.not, ...secs.map(s => SECS[s]), ...sites.map(s => SITES[s]),
      ...(USES[e.id] || []).map(u => USES_LABELS[u]), ...(ELEMS[e.id] || []).map(u => ELEMS_LABELS[u])].join(" ");
    return `<div class="lcw" data-id="${e.id}" data-cat="${e.cat}" data-zone="${zoneOf(e.cat)}" data-sites="${sites.join(" ")}" data-secs="${secs.join(" ")}" data-tone="${p.tone || ""}" data-txt="${esc(txt.toLowerCase())}">
<a class="lc" href="${e.cat}/${e.id}.html">
  <span class="lc-img"><img src="assets/thumbs/${e.id}.jpg" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('none');this.remove()"><span class="lc-ph">MV:${e.id}</span></span>
  <span class="lc-meta"><code>MV:${e.id}</code><i class="lc-st" data-st></i></span>
  <b class="lc-name">${esc(e.name)}</b>
  <span class="lc-desc">${esc(oneLine(e.desc))}</span>
  ${secs.length ? `<span class="lc-place">${secs.slice(0, 3).map(s => SECS[s]).join(" · ")}${p.tone === "x" ? " · חוויתי" : ""}</span>` : ""}
</a>
<button class="lc-add" type="button" data-add="${e.id}" aria-pressed="false" aria-label="הוסף את MV:${e.id} לסל הפרויקט">+</button>
</div>`;
  }).join("\n");
  const nav = ZONES.map(z => `<div class="lz"><p class="lz-h">${z.label} <span>${z.cats.reduce((a, c) => a + count(c), 0)}</span></p>
${z.cats.map(c => `<button class="lnav" data-cat="${c}" type="button">${CAT_LABEL[c] || CATS[c]}<span>${count(c)}</span></button>`).join("")}</div>`).join("\n");
  const LIST = JSON.stringify(entries.map(e => ({ id: e.id, name: e.name, cat: e.cat })));
  const chips = (obj, key) => Object.entries(obj).map(([k, v]) => `<button class="lchip" data-${key}="${k}" type="button" aria-pressed="false">${v}<b data-c></b></button>`).join("");

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Design DNA · הספרייה</title>
<link rel="stylesheet" href="assets/vault.css">
<style>
:root{--side:288px;--e:cubic-bezier(.2,.6,.2,1)}
body{background:var(--bg)}
.lib{display:grid;grid-template-columns:var(--side) 1fr;min-height:100vh}
/* sidebar: the start side (right in RTL), sticky, scrolls on its own */
.lside{position:sticky;top:0;height:100vh;overflow:auto;display:flex;flex-direction:column;gap:24px;padding:24px 20px;background:var(--card);box-shadow:1px 0 0 var(--line)}
.lbrand b{display:block;font-size:20px;font-weight:700}
.lbrand span{font-size:13px;color:var(--muted)}
.lsearch{position:relative}
.lsearch input{width:100%;min-height:44px;padding:0 14px;border-radius:12px;border:1.5px solid var(--line);background:var(--bg);font:inherit;font-size:15px;color:var(--ink)}
.lsearch input:focus-visible{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
.lsearch kbd{position:absolute;inset-inline-end:10px;top:50%;margin-top:-11px;font:inherit;font-size:12px;color:var(--muted);padding:2px 6px;border-radius:6px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line)}
.lall,.lnav{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:36px;padding:0 12px;border:0;border-radius:10px;background:none;font:inherit;font-size:15px;color:var(--ink);cursor:pointer;text-align:start;transition:background .15s var(--e),color .15s var(--e)}
.lnav span,.lall span{font-size:13px;color:var(--muted)}
.lall.on,.lnav.on{background:color-mix(in srgb,var(--accent) 10%,transparent);color:var(--accent);font-weight:600}
.lall.on span,.lnav.on span{color:var(--accent)}
@media (hover:hover) and (pointer:fine){.lall:hover,.lnav:hover{background:color-mix(in srgb,var(--ink) 5%,transparent)}}
.lz{display:grid;gap:2px}
.lz-h{display:flex;justify-content:space-between;margin:0 0 4px;padding:0 12px;font-size:12px;font-weight:600;color:var(--muted);letter-spacing:0}
.lgroup{display:grid;gap:8px}
.lgroup>p{margin:0;padding:0 12px;font-size:12px;font-weight:600;color:var(--muted)}
.lchips{display:flex;flex-wrap:wrap;gap:6px;padding:0 8px}
.lchip{display:inline-flex;align-items:center;gap:4px;min-height:32px;padding:0 12px;border-radius:999px;border:0;background:color-mix(in srgb,var(--ink) 5%,transparent);font:inherit;font-size:13px;color:var(--ink);cursor:pointer;transition:background .15s var(--e),color .15s var(--e),opacity .15s var(--e)}
.lchip.on{background:var(--ink);color:var(--bg)}
.lchip b{font-weight:600;opacity:.6;font-size:12px}
.lchip.zero:not(.on){opacity:.4}
/* "אני בונה": the first question in the sidebar, set apart as one block */
.lbuild{gap:12px;padding:16px 8px 16px;border-radius:14px;background:color-mix(in srgb,var(--accent) 5%,var(--card))}
.lbuild>p{font-size:14px;color:var(--ink)}
.lbuild .lsub{margin:0;padding:0 12px;font-size:12px;font-weight:600;color:var(--muted)}
.lquiet{display:flex;align-items:center;gap:10px;min-height:36px;padding:0 12px;font-size:14px;cursor:pointer}
.lquiet input{width:18px;height:18px;margin:0;accent-color:var(--accent)}
.lreset{justify-self:start;margin:0 12px;padding:0;border:0;background:none;font:inherit;font-size:13px;color:var(--accent);cursor:pointer;min-height:32px}
.lreset[hidden]{display:none}
.lfoot{margin-top:auto;display:grid;gap:8px}
.lfoot a,.lfoot button{display:flex;align-items:center;justify-content:center;min-height:40px;border-radius:10px;border:0;font:inherit;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
.lfoot .rev{background:var(--accent);color:var(--accent-ink)}
.lfoot .rep{background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink)}
.lfoot .fonts{gap:8px;background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink)}
.lfoot .fonts small{font-size:12px;font-weight:500;color:var(--muted)}
.lfoot .old{background:none;color:var(--muted);font-weight:500;min-height:32px}
/* main */
.lmain{min-width:0;padding:0 32px 96px}
.lbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:16px;min-height:64px;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px)}
.lbar h1{margin:0;font-size:22px}
.lbar .n{font-size:14px;color:var(--muted)}
.lbar .lmenu{display:none}
.lgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px}
.lcw{position:relative;min-width:0}
/* the wrapper sets no display, the UA [hidden] rule wins; kept explicit because the old card lost this fight */
.lcw[hidden],.lempty[hidden]{display:none}
.lc{display:flex;flex-direction:column;gap:8px;text-decoration:none;color:var(--ink);border-radius:14px}
.lc-img{position:relative;aspect-ratio:16/10;border-radius:14px;overflow:hidden;background:color-mix(in srgb,var(--ink) 6%,var(--bg));box-shadow:0 0 0 1px color-mix(in srgb,var(--ink) 6%,transparent)}
.lc-img img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .5s var(--e)}
.lc-ph{position:absolute;inset:0;display:grid;place-items:center;font-size:14px;font-weight:600;color:var(--muted)}
.lc-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 2px}
.lc-meta code{font-size:12px;font-weight:600;color:var(--accent)}
.lc-st{width:8px;height:8px;border-radius:50%;background:var(--line)}
.lc-st[data-st="ok"]{background:#1f9d55}
.lc-st[data-st="no"]{background:#d64545}
.lc-st[data-st="pending"]{background:#e0a100}
.lc-name{font-size:16px;line-height:1.35;padding:0 2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.lc-desc{font-size:13px;line-height:1.5;color:var(--muted);padding:0 2px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.lc-place{font-size:12px;line-height:1.5;color:var(--ink);opacity:.72;padding:0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lc:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
/* tray button: on the thumbnail's end corner, a sibling of the link (a button inside a link is invalid) */
.lc-add{position:absolute;top:10px;inset-inline-end:10px;z-index:2;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;border:0;background:color-mix(in srgb,var(--card) 92%,transparent);box-shadow:0 1px 2px rgba(16,18,43,.12),0 0 0 1px color-mix(in srgb,var(--ink) 8%,transparent);font:inherit;font-size:20px;line-height:1;color:var(--ink);cursor:pointer;opacity:0;transition:opacity .15s var(--e),background .15s var(--e),color .15s var(--e)}
.lc-add[aria-pressed="true"]{opacity:1;background:var(--accent);color:var(--accent-ink);font-size:16px}
.lcw:hover .lc-add,.lc-add:focus-visible,.lcw:focus-within .lc-add{opacity:1}
.lc-add:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (hover:none){.lc-add{opacity:1}}
@media (hover:hover) and (pointer:fine){.lc:hover .lc-img img{transform:scale(1.03)}.lc:hover .lc-name{color:var(--accent)}}
.lempty{padding:96px 0;text-align:center;color:var(--muted)}
/* project tray: sticky at the bottom of the grid column while it holds anything */
.ltray{position:sticky;bottom:16px;z-index:6;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:32px;padding:12px 16px;border-radius:16px;background:var(--ink);color:var(--bg);box-shadow:0 12px 32px rgba(16,18,43,.22)}
.ltray[hidden]{display:none}
.ltray b{font-size:15px}
.ltray-ids{display:flex;flex-wrap:wrap;gap:6px;flex:1;min-width:0}
.ltray-ids button{display:inline-flex;align-items:center;gap:6px;min-height:32px;padding:0 10px;border-radius:999px;border:0;background:color-mix(in srgb,var(--bg) 14%,transparent);color:var(--bg);font:inherit;font-size:13px;cursor:pointer}
.ltray-ids button span{opacity:.7}
.ltray .tcopy,.ltray .tclear{min-height:40px;padding:0 16px;border-radius:10px;border:0;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
.ltray .tcopy{background:var(--bg);color:var(--ink)}
.ltray .tclear{background:none;color:var(--bg);opacity:.8}
.lscrim{display:none}
/* mobile: the sidebar becomes a drawer */
@media (max-width:900px){
  .lib{grid-template-columns:1fr}
  .lside{position:fixed;inset-block:0;inset-inline-start:0;z-index:30;width:min(86vw,320px);height:100%;transform:translateX(100%);transition:transform .4s cubic-bezier(.76,0,.24,1),visibility 0s linear .4s;visibility:hidden}
  [dir="ltr"] .lside{transform:translateX(-100%)}
  .lib.open .lside{transform:none;visibility:visible;transition-delay:0s}
  .lscrim{display:block;position:fixed;inset:0;z-index:29;background:color-mix(in srgb,var(--ink) 40%,transparent);opacity:0;pointer-events:none;transition:opacity .3s var(--e)}
  .lib.open .lscrim{opacity:1;pointer-events:auto}
  .lmain{padding:0 16px 64px}
  .lbar .lmenu{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:10px;border:0;background:var(--ink);color:var(--bg);font:inherit;font-size:14px;font-weight:600;cursor:pointer;margin-inline-start:auto}
  .lbar .lmenu b{font-weight:600;opacity:.7}
  .lgrid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
  .lc-desc{display:none}
  .lc-add{top:6px;inset-inline-end:6px;width:32px;height:32px}
  .ltray{bottom:12px;padding:10px 12px}
  .ltray-ids{display:none}
}
@media (prefers-reduced-motion:reduce){.lib *{transition-duration:.01ms!important}}
</style>
</head>
<body>
<div class="lib">
  <aside class="lside" aria-label="ניווט בספרייה">
    <div class="lbrand"><b>Design DNA</b><span>הספרייה · ${entries.length} פריטים</span></div>
    <label class="lsearch"><span class="sr-only">חיפוש</span><input type="search" placeholder="חיפוש, או MV:id" data-q><kbd>/</kbd></label>
    <div class="lgroup lbuild" role="group" aria-label="אני בונה">
      <p>אני בונה</p>
      <div class="lchips" data-sites>${chips(SITES, "site")}</div>
      <p class="lsub">סקשן</p>
      <div class="lchips" data-secs>${chips(SECS, "sec")}</div>
      <label class="lquiet"><input type="checkbox" data-quiet> רק מה שמתאים לאתר שקט</label>
      <button class="lreset" type="button" data-reset hidden>נקה את הבחירה</button>
    </div>
    <button class="lall on" type="button" data-cat="all">הכל<span>${entries.length}</span></button>
    ${nav}
    <div class="lgroup"><p>סטטוס</p><div class="lchips" data-status>
      <button class="lchip on" data-s="all" type="button">הכל</button><button class="lchip" data-s="pending" type="button">ממתינים<b data-n="pending"></b></button><button class="lchip" data-s="no" type="button">לא מאושרים<b data-n="no"></b></button><button class="lchip" data-s="ok" type="button">מאושרים<b data-n="ok"></b></button>
    </div></div>
    <div class="lfoot"><a class="rev" href="review.html">סבב סקירה</a><button class="rep" type="button" data-report>העתק דוח לקלוד</button><a class="fonts" href="${FONT_PAIRS}" target="_blank" rel="noopener" title="נפתח רק מהמחשב של ליאב: הפונטים ברישיון ולא עולים לרשת">צימודי פונטים ↗<small>מקומי</small></a><a class="old" href="classic.html">לתצוגה הישנה</a></div>
  </aside>
  <div class="lscrim" data-scrim></div>
  <main class="lmain">
    <div class="lbar"><h1 data-title>הכל</h1><span class="n" data-count></span><button class="lmenu" type="button" data-menu aria-expanded="false">סינון<b data-active></b></button></div>
    <div class="lgrid" data-grid>
${cards}
    </div>
    <p class="lempty" data-empty hidden>אין פריטים בסינון הזה.</p>
    <div class="ltray" data-traybar hidden aria-live="polite"><b data-tn></b><div class="ltray-ids" data-tids></div><button class="tcopy" type="button" data-tcopy>העתק רשימה</button><button class="tclear" type="button" data-tclear>נקה</button></div>
  </main>
</div>
<script src="assets/baseline.js?v=${BV}"></script>
<script src="assets/status.js"></script>
<script src="assets/tray.js"></script>
<script>
(function(){
  var LIST=${LIST}, LIVE=${JSON.stringify(LIVE)};
  var BY={}; LIST.forEach(function(e){BY[e.id]=e;});
  var $=function(s){return document.querySelector(s)}, $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var cards=$$(".lcw"), lib=$(".lib"), q=$("[data-q]"), title=$("[data-title]"), cnt=$("[data-count]"), empty=$("[data-empty]"), quiet=$("[data-quiet]");
  var st;
  var LABEL={all:"הכל"}; $$(".lnav").forEach(function(b){LABEL[b.dataset.cat]=b.firstChild.textContent.trim();});
  // status dots and counts come from the same approval layer as the old index and the review round
  function paintStatus(){var n={ok:0,no:0,pending:0};cards.forEach(function(c){var s=window.MV?MV.state(c.dataset.id):"pending";c.dataset.s=s;c.querySelector("[data-st]").dataset.st=s;n[s]++;});
    $$("[data-n]").forEach(function(b){b.textContent=n[b.dataset.n];});}
  function has(list,v){return (" "+list+" ").indexOf(" "+v+" ")>-1;}
  function match(c,s){var ql=s.q.trim().toLowerCase();
    return (s.cat==="all"||c.dataset.cat===s.cat)&&(s.s==="all"||c.dataset.s===s.s)
      &&(!s.site||has(c.dataset.sites,s.site))&&(!s.sec||has(c.dataset.secs,s.sec))&&(!s.quiet||c.dataset.tone==="q")
      &&(!ql||c.dataset.txt.indexOf(ql.replace(/^mv:/,""))>-1||c.dataset.txt.indexOf(ql)>-1);}
  // every chip says how many items it would leave with the rest of the filters as they are
  function counts(){
    function paint(sel,key){$$(sel).forEach(function(b){var t={};for(var k in st)t[k]=st[k];t[key]=b.dataset[key];
      var n=cards.filter(function(c){return match(c,t);}).length;b.querySelector("[data-c]").textContent=n;b.classList.toggle("zero",!n);});}
    paint("[data-sites] .lchip","site"); paint("[data-secs] .lchip","sec");
  }
  function apply(){
    var shown=0;
    cards.forEach(function(c){var ok=match(c,st);c.hidden=!ok;if(ok)shown++;});
    title.textContent=LABEL[st.cat]||"הכל"; cnt.textContent=shown+" פריטים"; empty.hidden=shown>0;
    $$(".lnav,.lall").forEach(function(b){b.classList.toggle("on",b.dataset.cat===st.cat);});
    $$("[data-status] .lchip").forEach(function(b){b.classList.toggle("on",b.dataset.s===st.s);});
    $$("[data-sites] .lchip").forEach(function(b){var on=b.dataset.site===st.site;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on));});
    $$("[data-secs] .lchip").forEach(function(b){var on=b.dataset.sec===st.sec;b.classList.toggle("on",on);b.setAttribute("aria-pressed",String(on));});
    quiet.checked=st.quiet;
    var nb=(st.site?1:0)+(st.sec?1:0)+(st.quiet?1:0);
    $("[data-reset]").hidden=!nb; $("[data-active]").textContent=nb?" · "+nb:"";
    counts();
    var h=[];if(st.cat!=="all")h.push("c="+st.cat);if(st.s!=="all")h.push("s="+st.s);if(st.site)h.push("site="+st.site);if(st.sec)h.push("sec="+st.sec);if(st.quiet)h.push("quiet=1");if(st.q)h.push("q="+encodeURIComponent(st.q));
    history.replaceState(null,"",h.length?"#"+h.join("&"):location.pathname);
  }
  // state lives in the hash, so a link to "all hero items for a quiet landing page" is shareable and survives a refresh
  function fromHash(){st={cat:"all",s:"all",site:null,sec:null,quiet:false,q:""};
    (location.hash.slice(1)||"").split("&").forEach(function(p){var kv=p.split("=");var v=decodeURIComponent(kv[1]||"");
      if(kv[0]==="c")st.cat=v;if(kv[0]==="s")st.s=v;if(kv[0]==="site")st.site=v;if(kv[0]==="sec")st.sec=v;if(kv[0]==="quiet")st.quiet=v==="1";if(kv[0]==="q")st.q=v;});
    q.value=st.q;}
  fromHash();
  // a pasted link with a new hash on an open tab does not reload the page
  addEventListener("hashchange",function(){fromHash();apply();});
  function close(){lib.classList.remove("open");$("[data-menu]").setAttribute("aria-expanded","false");}
  $$(".lnav,.lall").forEach(function(b){b.addEventListener("click",function(){st.cat=b.dataset.cat;apply();close();scrollTo(0,0);});});
  $$("[data-status] .lchip").forEach(function(b){b.addEventListener("click",function(){st.s=b.dataset.s;apply();});});
  $$("[data-sites] .lchip").forEach(function(b){b.addEventListener("click",function(){st.site=st.site===b.dataset.site?null:b.dataset.site;apply();});});
  $$("[data-secs] .lchip").forEach(function(b){b.addEventListener("click",function(){st.sec=st.sec===b.dataset.sec?null:b.dataset.sec;apply();});});
  quiet.addEventListener("change",function(){st.quiet=quiet.checked;apply();});
  $("[data-reset]").addEventListener("click",function(){st.site=null;st.sec=null;st.quiet=false;apply();});
  q.addEventListener("input",function(){st.q=q.value;apply();});
  addEventListener("keydown",function(e){if(e.key==="/"&&document.activeElement!==q){e.preventDefault();q.focus();}if(e.key==="Escape")close();});
  $("[data-menu]").addEventListener("click",function(){var o=!lib.classList.contains("open");lib.classList.toggle("open",o);this.setAttribute("aria-expanded",String(o));});
  $("[data-scrim]").addEventListener("click",close);
  function flash(b,txt){var t=b.textContent;b.textContent=txt;setTimeout(function(){b.textContent=t;},1600);}
  $("[data-report]").addEventListener("click",function(){var b=this;navigator.clipboard.writeText(MV.report(LIST)).then(function(){flash(b,"הועתק ✓");});});
  // project tray
  var bar=$("[data-traybar]"), tids=$("[data-tids]");
  function paintTray(){
    var ids=MVT.list().filter(function(id){return BY[id];});
    bar.hidden=!ids.length; $("[data-tn]").textContent=ids.length+" בסל";
    tids.innerHTML=ids.map(function(id){return '<button type="button" data-rm="'+id+'" aria-label="הסר את MV:'+id+' מהסל">MV:'+id+'<span aria-hidden="true">✕</span></button>';}).join("");
    $$(".lc-add").forEach(function(b){var on=ids.indexOf(b.dataset.add)>-1;b.setAttribute("aria-pressed",String(on));b.textContent=on?"✓":"+";});
  }
  $$(".lc-add").forEach(function(b){b.addEventListener("click",function(){MVT.toggle(b.dataset.add);});});
  tids.addEventListener("click",function(e){var b=e.target.closest("[data-rm]");if(b)MVT.remove(b.dataset.rm);});
  $("[data-tclear]").addEventListener("click",function(){MVT.clear();});
  // one line per item: id, name and the demo link, ready for a proposal or an agent brief
  $("[data-tcopy]").addEventListener("click",function(){var b=this;
    var txt=MVT.list().filter(function(id){return BY[id];}).map(function(id){var e=BY[id];return "MV:"+id+" · "+e.name+" · "+LIVE+"/"+e.cat+"/"+id+".html";}).join("\\n");
    navigator.clipboard.writeText(txt).then(function(){flash(b,"הועתק ✓");});});
  MVT.on(paintTray);
  paintStatus(); apply(); paintTray();
})();
</script>
</body>
</html>`;
}
