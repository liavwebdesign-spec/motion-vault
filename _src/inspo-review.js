// inspo-review.js: הקוד של מסך אישור אתרי ההשראה (ליאב, 3.11.2026: "ישירות למאגר ושם אוכל לעבור ולאשר").
// נכנס כמו שהוא לתוך inspo-review.html בזמן הבנייה. הסימונים עוברים דרך שכבת האישורים של המאגר (MV), כמו בכל מהלך,
// ולכן הם נשמרים בדפדפן של המכשיר ומגיעים ל-baseline ב-sync. הכתובות של התמונות נבנות כאן ולא ב-HTML של העמוד.
(function () {
  const { sites: SITES, styles: STYLES, moods: MOOD, order: ORDER, shots: SHOTS } = window.INSPO;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const shot = (id, kind) => `${SHOTS}${id}-${kind}.jpg`;
  const order = [...ORDER, ...[...new Set(SITES.map(s => s.field))].filter(f => !ORDER.includes(f))].filter(f => SITES.some(s => s.field === f));
  const STATUS = [["pending", "ממתינים"], ["ok", "כן"], ["no", "לא"], ["all", "הכל"]];
  // ברירת המחדל היא מה שעוד לא הוחלט: ככה סבב חדש של אתרים פשוט מחכה כאן בפתיחה הבאה
  const state = { status: "pending", style: "", field: "", mood: "", rtl: false, cur: null, list: [] };

  const match = (s, skip) => (skip === "style" || !state.style || s.style === state.style)
    && (skip === "field" || !state.field || s.field === state.field)
    && (!state.mood || s.mood === state.mood) && (!state.rtl || s.rtl)
    && (skip === "status" || state.status === "all" || MV.state(s.id) === state.status);
  const visible = () => order.flatMap(f => SITES.filter(s => s.field === f && match(s)));

  function drawChips(el, attr, cur, allLabel, pool, keys, label) {
    const counts = {};
    pool.forEach(s => counts[s[attr]] = (counts[s[attr]] || 0) + 1);
    const x = el.scrollLeft;
    el.innerHTML = `<button class="ir-chip" data-${attr}="" aria-pressed="${!cur}">${allLabel}<b>${pool.length}</b></button>` +
      keys.filter(k => counts[k] || cur === k).map(k => `<button class="ir-chip" data-${attr}="${esc(k)}" aria-pressed="${cur === k}">${esc(label(k))}<b>${counts[k] || 0}</b></button>`).join("");
    el.scrollLeft = x;
  }
  function drawFilters() {
    drawChips($("fields"), "field", state.field, "כל התחומים", SITES.filter(s => match(s, "field")), order, k => k);
    drawChips($("styles"), "style", state.style, "כל הסגנונות", SITES.filter(s => match(s, "style")), Object.keys(STYLES), k => STYLES[k]);
    const pool = SITES.filter(s => match(s, "status"));
    $("status").innerHTML = STATUS.map(([k, t]) => `<button class="ir-chip" data-status="${k}" aria-pressed="${state.status === k}">${t}<b>${k === "all" ? pool.length : pool.filter(s => MV.state(s.id) === k).length}</b></button>`).join("");
  }

  function cardHtml(s) {
    const d = MV.state(s.id);
    return `<article class="ir-card is-${d}" data-id="${s.id}">
      <button class="ir-stage" data-full="${s.id}" aria-label="כל העמוד של ${esc(s.name)}">
        <img class="ir-d" src="${shot(s.id, "d")}" alt="" loading="lazy" decoding="async" width="800" height="500">
        <img class="ir-m" src="${shot(s.id, "m")}" alt="" loading="lazy" decoding="async" width="200" height="433">
      </button>
      <div class="ir-body">
        <h3>${esc(s.name)}</h3>
        <div class="ir-tags"><span class="vchip">${esc(STYLES[s.style] || "")}</span><span class="vchip">${MOOD[s.mood]}</span>${s.rtl ? `<span class="vchip">עברית/ערבית</span>` : ""}</div>
        <p class="ir-txt"><span>למה</span>${esc(s.why)}</p>
        <p class="ir-txt"><span>בטלפון</span>${esc(s.phone)}</p>
        <div class="ir-foot">
          <a class="ir-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">לאתר עצמו</a>
          <button class="ir-vote" data-v="ok" aria-pressed="${d === "ok"}">כן</button>
          <button class="ir-vote" data-v="no" aria-pressed="${d === "no"}">לא</button>
        </div>
      </div>
    </article>`;
  }
  function secLabel(list) {
    const ok = list.filter(s => MV.state(s.id) === "ok").length;
    return (list.length === 1 ? "אתר אחד" : `${list.length} אתרים`) + (ok ? ` · ${ok} כן` : "");
  }
  function render() {
    drawFilters();
    // הרשימה נקבעת כאן ולא בכל סימון: אתר שסימנת נשאר במקום עד שמחליפים סינון, כדי שלחיצה לא תזיז את העמוד ואפשר יהיה לתקן
    const list = state.list = visible();
    $("grid").innerHTML = list.length ? order.filter(f => list.some(s => s.field === f)).map(f => {
      const part = list.filter(s => s.field === f);
      return `<section class="ir-sec" data-sec="${esc(f)}"><h2 class="ir-h">${esc(f)}<span>${secLabel(part)}</span></h2><div class="ir-grid">${part.map(cardHtml).join("")}</div></section>`;
    }).join("") : `<p class="ir-empty">${state.status === "pending" ? "אין כאן אתרים שמחכים לך." : "אין אתרים שמתאימים לסינון הזה."}</p>`;
  }
  function syncCard(id) {
    const c = document.querySelector(`.ir-card[data-id="${id}"]`), d = MV.state(id);
    if (c) {
      c.className = `ir-card is-${d}`;
      c.querySelectorAll(".ir-vote").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === d)));
      const sec = c.closest(".ir-sec");
      sec.querySelector(".ir-h span").textContent = secLabel(state.list.filter(s => s.field === sec.dataset.sec));
    }
    drawFilters();
    if (state.cur === id) syncDlg();
  }
  function vote(id, v) {
    MV.set(id, MV.state(id) === v ? null : v, MV.note(id));
    syncCard(id);
  }

  function openFull(id) {
    state.cur = id;
    syncDlg();
    if (!$("dlg").open) $("dlg").showModal();
  }
  function syncDlg() {
    const s = SITES.find(x => x.id === state.cur);
    if (!s) return;
    $("dName").textContent = s.name;
    $("dLink").href = s.url;
    const want = shot(s.id, "df");
    if ($("dDesk").getAttribute("src") !== want) {
      $("dDesk").src = want; $("dMob").src = shot(s.id, "mf");
      $("dDesk").alt = `כל העמוד של ${s.name} בדסקטופ`; $("dMob").alt = `כל העמוד של ${s.name} בטלפון`;
      $("views").scrollTop = 0;
    }
    const d = MV.state(s.id);
    $("dOk").setAttribute("aria-pressed", String(d === "ok"));
    $("dNo").setAttribute("aria-pressed", String(d === "no"));
  }
  function step(by) {
    const i = state.list.findIndex(s => s.id === state.cur);
    const n = state.list[i + by];
    if (n) openFull(n.id);
  }

  document.addEventListener("click", (e) => {
    const fc = e.target.closest("[data-field]");
    if (fc) {
      state.field = fc.dataset.field; render();
      $("fields").querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true });
      const top = $("bar").offsetTop - $("fields").offsetHeight;
      if (window.scrollY > top) window.scrollTo(0, top);
      return;
    }
    const st = e.target.closest("[data-style]");
    if (st) { state.style = st.dataset.style; render(); $("styles").querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true }); return; }
    const su = e.target.closest("[data-status]");
    if (su) { state.status = su.dataset.status; render(); $("status").querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true }); return; }
    const full = e.target.closest("[data-full]");
    if (full) { openFull(full.dataset.full); return; }
    const v = e.target.closest(".ir-vote");
    if (v) { const c = v.closest(".ir-card"); vote(c ? c.dataset.id : state.cur, v.dataset.v); return; }
    const sh = e.target.closest("[data-show]");
    if (sh) { $("views").dataset.v = sh.dataset.show; document.querySelectorAll("[data-show]").forEach(b => b.setAttribute("aria-pressed", String(b === sh))); }
  });
  $("mood").onchange = (e) => { state.mood = e.target.value; render(); };
  $("rtl").onclick = (e) => { state.rtl = !state.rtl; e.currentTarget.setAttribute("aria-pressed", String(state.rtl)); render(); };
  $("report").onclick = (e) => {
    const b = e.currentTarget, list = SITES.map(s => ({ id: s.id, name: s.name, cat: "inspo" })), text = MV.report(list);
    const done = (msg) => { b.textContent = msg; setTimeout(() => b.textContent = "העתק דוח", 2500); };
    // הדוח הוא הדרך היחידה להעביר סימונים ממכשיר אחר, אז כשהדפדפן חוסם העתקה הטקסט נפתח כאן וניתן לסימון ידני
    const manual = () => {
      const box = $("reportText") || b.parentNode.insertBefore(Object.assign(document.createElement("textarea"), { id: "reportText", className: "ir-report-text", readOnly: true, ariaLabel: "הדוח להעתקה" }), b.nextSibling);
      box.value = text; box.focus(); box.select();
      done(document.execCommand("copy") ? "הועתק ✓" : "סמן והעתק ידנית");
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => done("הועתק ✓"), manual); else manual();
  };
  $("dClose").onclick = () => $("dlg").close();
  $("dPrev").onclick = () => step(-1);
  $("dNext").onclick = () => step(1);
  $("dlg").addEventListener("close", () => { state.cur = null; });
  $("dlg").addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); step(1); } if (e.key === "ArrowRight") { e.preventDefault(); step(-1); } });

  render();
})();
