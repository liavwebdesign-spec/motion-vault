// library.html: the library view of the vault (23.9.2026, Liav chose direction A).
// Why: 306 items in one flat grid, no previews, 14 mixed categories and three filter layers taking 174px sticky.
// Now: a sidebar grouped by what you are building (page parts / motion / doctrine), preview images from
// _src/tools/thumbs.mjs, one line per card, a slim search, status filter and the same report Liav sends me.
// The MV ids and every page URL stay exactly as they were: nothing in the skill links to this file.

const ZONES = [
  { key: "parts", label: "חלקי עמוד", cats: ["header", "hero", "comp", "footer"] },
  { key: "motion", label: "תנועה", cats: ["gsap", "behavior", "css", "lm"] },
  { key: "doctrine", label: "תורה", cats: ["style", "arch", "rhythm", "misc", "anti"] },
];
const CAT_LABEL = { misc: "מסגרות" };

export function libraryPage({ entries, CATS, FIT, FIT_LABELS, USES, USES_LABELS, ELEMS, ELEMS_LABELS, BV }) {
  const count = c => entries.filter(e => e.cat === c).length;
  const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const zoneOf = c => (ZONES.find(z => z.cats.includes(c)) || {}).key || "doctrine";
  const oneLine = d => { const s = String(d || "").split(/(?<=[.!?])\s/)[0]; return s.length > 120 ? s.slice(0, 117) + "..." : s; };
  const cards = entries.map(e => {
    const txt = ["MV:" + e.id, e.id, e.name, e.desc, e.tech, ...(USES[e.id] || []).map(u => USES_LABELS[u]), ...(ELEMS[e.id] || []).map(u => ELEMS_LABELS[u]), ...(FIT[e.id] || []).map(u => FIT_LABELS[u])].join(" ");
    return `<a class="lc" href="${e.cat}/${e.id}.html" data-id="${e.id}" data-cat="${e.cat}" data-zone="${zoneOf(e.cat)}" data-fit="${(FIT[e.id] || []).join(" ")}" data-txt="${esc(txt.toLowerCase())}">
  <span class="lc-img"><img src="assets/thumbs/${e.id}.jpg" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('none');this.remove()"><span class="lc-ph">MV:${e.id}</span></span>
  <span class="lc-meta"><code>MV:${e.id}</code><i class="lc-st" data-st></i></span>
  <b class="lc-name">${esc(e.name)}</b>
  <span class="lc-desc">${esc(oneLine(e.desc))}</span>
</a>`;
  }).join("\n");
  const nav = ZONES.map(z => `<div class="lz"><p class="lz-h">${z.label} <span>${z.cats.reduce((a, c) => a + count(c), 0)}</span></p>
${z.cats.map(c => `<button class="lnav" data-cat="${c}" type="button">${CAT_LABEL[c] || CATS[c]}<span>${count(c)}</span></button>`).join("")}</div>`).join("\n");
  const LIST = JSON.stringify(entries.map(e => ({ id: e.id, name: e.name, cat: e.cat })));
  const fits = Object.entries(FIT_LABELS).map(([k, v]) => `<button class="lchip" data-fit="${k}" type="button">${v}</button>`).join("");

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Design DNA · הספרייה</title>
<link rel="stylesheet" href="assets/vault.css">
<style>
:root{--side:272px;--e:cubic-bezier(.2,.6,.2,1)}
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
.lchip{min-height:32px;padding:0 12px;border-radius:999px;border:0;background:color-mix(in srgb,var(--ink) 5%,transparent);font:inherit;font-size:13px;color:var(--ink);cursor:pointer;transition:background .15s var(--e),color .15s var(--e)}
.lchip.on{background:var(--ink);color:var(--bg)}
.lchip b{font-weight:600;margin-inline-start:4px;opacity:.7}
.lfoot{margin-top:auto;display:grid;gap:8px}
.lfoot a,.lfoot button{display:flex;align-items:center;justify-content:center;min-height:40px;border-radius:10px;border:0;font:inherit;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
.lfoot .rev{background:var(--accent);color:var(--accent-ink)}
.lfoot .rep{background:color-mix(in srgb,var(--ink) 6%,transparent);color:var(--ink)}
.lfoot .old{background:none;color:var(--muted);font-weight:500;min-height:32px}
/* main */
.lmain{min-width:0;padding:0 32px 96px}
.lbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:16px;min-height:64px;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px)}
.lbar h1{margin:0;font-size:22px}
.lbar .n{font-size:14px;color:var(--muted)}
.lbar .lmenu{display:none}
.lgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px}
.lc{display:flex;flex-direction:column;gap:8px;text-decoration:none;color:var(--ink);border-radius:14px}
/* the card sets display:flex, which beats the UA [hidden] rule: filtering changed the count but not the grid */
.lc[hidden],.lempty[hidden]{display:none}
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
.lc:focus-visible{outline:2px solid var(--accent);outline-offset:4px}
@media (hover:hover) and (pointer:fine){.lc:hover .lc-img img{transform:scale(1.03)}.lc:hover .lc-name{color:var(--accent)}}
.lempty{padding:96px 0;text-align:center;color:var(--muted)}
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
  .lgrid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
  .lc-desc{display:none}
}
@media (prefers-reduced-motion:reduce){.lib *{transition-duration:.01ms!important}}
</style>
</head>
<body>
<div class="lib">
  <aside class="lside" aria-label="ניווט בספרייה">
    <div class="lbrand"><b>Design DNA</b><span>הספרייה · ${entries.length} פריטים</span></div>
    <label class="lsearch"><span class="sr-only">חיפוש</span><input type="search" placeholder="חיפוש, או MV:id" data-q><kbd>/</kbd></label>
    <button class="lall on" type="button" data-cat="all">הכל<span>${entries.length}</span></button>
    ${nav}
    <div class="lgroup"><p>סטטוס</p><div class="lchips" data-status>
      <button class="lchip on" data-s="all" type="button">הכל</button><button class="lchip" data-s="pending" type="button">ממתינים<b data-n="pending"></b></button><button class="lchip" data-s="no" type="button">לא מאושרים<b data-n="no"></b></button><button class="lchip" data-s="ok" type="button">מאושרים<b data-n="ok"></b></button>
    </div></div>
    <div class="lgroup"><p>מתאים ל</p><div class="lchips" data-fits>${fits}</div></div>
    <div class="lfoot"><a class="rev" href="review.html">סבב סקירה</a><button class="rep" type="button" data-report>העתק דוח לקלוד</button><a class="old" href="index.html">לתצוגה הישנה</a></div>
  </aside>
  <div class="lscrim" data-scrim></div>
  <main class="lmain">
    <div class="lbar"><h1 data-title>הכל</h1><span class="n" data-count></span><button class="lmenu" type="button" data-menu aria-expanded="false">סינון</button></div>
    <div class="lgrid" data-grid>
${cards}
    </div>
    <p class="lempty" data-empty hidden>אין פריטים בסינון הזה.</p>
  </main>
</div>
<script src="assets/baseline.js?v=${BV}"></script>
<script src="assets/status.js"></script>
<script>
(function(){
  var LIST=${LIST};
  var $=function(s){return document.querySelector(s)}, $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var cards=$$(".lc"), lib=$(".lib"), q=$("[data-q]"), title=$("[data-title]"), cnt=$("[data-count]"), empty=$("[data-empty]");
  var st={cat:"all",s:"all",fit:null,q:""};
  var LABEL={all:"הכל"}; $$(".lnav").forEach(function(b){LABEL[b.dataset.cat]=b.firstChild.textContent.trim();});
  // status dots and counts come from the same approval layer as the old index and the review round
  function paintStatus(){var n={ok:0,no:0,pending:0};cards.forEach(function(c){var s=window.MV?MV.state(c.dataset.id):"pending";c.dataset.s=s;c.querySelector("[data-st]").dataset.st=s;n[s]++;});
    $$("[data-n]").forEach(function(b){b.textContent=n[b.dataset.n];});}
  function apply(){
    var shown=0, ql=st.q.trim().toLowerCase();
    cards.forEach(function(c){
      var ok=(st.cat==="all"||c.dataset.cat===st.cat)&&(st.s==="all"||c.dataset.s===st.s)&&(!st.fit||(" "+c.dataset.fit+" ").indexOf(" "+st.fit+" ")>-1)&&(!ql||c.dataset.txt.indexOf(ql.replace(/^mv:/,""))>-1||c.dataset.txt.indexOf(ql)>-1);
      c.hidden=!ok; if(ok)shown++;
    });
    title.textContent=LABEL[st.cat]||"הכל"; cnt.textContent=shown+" פריטים"; empty.hidden=shown>0;
    $$(".lnav,.lall").forEach(function(b){b.classList.toggle("on",b.dataset.cat===st.cat);});
    $$("[data-status] .lchip").forEach(function(b){b.classList.toggle("on",b.dataset.s===st.s);});
    $$("[data-fits] .lchip").forEach(function(b){b.classList.toggle("on",b.dataset.fit===st.fit);});
    var h=[];if(st.cat!=="all")h.push("c="+st.cat);if(st.s!=="all")h.push("s="+st.s);if(st.fit)h.push("f="+st.fit);if(st.q)h.push("q="+encodeURIComponent(st.q));
    history.replaceState(null,"",h.length?"#"+h.join("&"):location.pathname);
  }
  // state lives in the hash, so a link to "all pending headers" is shareable and survives a refresh
  function fromHash(){st={cat:"all",s:"all",fit:null,q:""};
    (location.hash.slice(1)||"").split("&").forEach(function(p){var kv=p.split("=");if(kv[0]==="c")st.cat=kv[1];if(kv[0]==="s")st.s=kv[1];if(kv[0]==="f")st.fit=kv[1];if(kv[0]==="q")st.q=decodeURIComponent(kv[1]||"");});
    q.value=st.q;}
  fromHash();
  // a pasted link with a new hash on an open tab does not reload the page
  addEventListener("hashchange",function(){fromHash();apply();});
  function close(){lib.classList.remove("open");$("[data-menu]").setAttribute("aria-expanded","false");}
  $$(".lnav,.lall").forEach(function(b){b.addEventListener("click",function(){st.cat=b.dataset.cat;apply();close();scrollTo(0,0);});});
  $$("[data-status] .lchip").forEach(function(b){b.addEventListener("click",function(){st.s=b.dataset.s;apply();});});
  $$("[data-fits] .lchip").forEach(function(b){b.addEventListener("click",function(){st.fit=st.fit===b.dataset.fit?null:b.dataset.fit;apply();});});
  q.addEventListener("input",function(){st.q=q.value;apply();});
  addEventListener("keydown",function(e){if(e.key==="/"&&document.activeElement!==q){e.preventDefault();q.focus();}if(e.key==="Escape")close();});
  $("[data-menu]").addEventListener("click",function(){var o=!lib.classList.contains("open");lib.classList.toggle("open",o);this.setAttribute("aria-expanded",String(o));});
  $("[data-scrim]").addEventListener("click",close);
  $("[data-report]").addEventListener("click",function(){var b=this;navigator.clipboard.writeText(MV.report(LIST)).then(function(){var t=b.textContent;b.textContent="הועתק ✓";setTimeout(function(){b.textContent=t;},1600);});});
  paintStatus(); apply();
})();
</script>
</body>
</html>`;
}
