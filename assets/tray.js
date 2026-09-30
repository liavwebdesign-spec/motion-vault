/* Motion Vault: סל הפרויקט (30.9.2026, כיוון "לפי מה בונים").
   אוספים פריטים לפרויקט מהספרייה או מעמודי הפריטים, ומעתיקים רשימה אחת להצעה או לסוכן.
   נשמר בדפדפן (localStorage), משותף לכל העמודים של המאגר. */
(function () {
  var KEY = "mv-tray", subs = [];
  function load() { try { var a = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} subs.forEach(function (f) { f(a); }); }
  var T = window.MVT = {
    list: load,
    has: function (id) { return load().indexOf(id) > -1; },
    toggle: function (id) { var a = load(), i = a.indexOf(id); if (i > -1) a.splice(i, 1); else a.push(id); save(a); },
    remove: function (id) { save(load().filter(function (x) { return x !== id; })); },
    clear: function () { save([]); },
    on: function (f) { subs.push(f); }
  };
  // a change in another tab (the library open next to an item page) repaints here too
  window.addEventListener("storage", function (e) { if (e.key === KEY) subs.forEach(function (f) { f(load()); }); });

  // item page: one toggle button
  var btns = [].slice.call(document.querySelectorAll("[data-tray]"));
  function paint() {
    var n = load().length;
    btns.forEach(function (b) {
      var on = T.has(b.dataset.tray);
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
      b.textContent = on ? "בסל ✓ (" + n + ")" : "+ לסל הפרויקט";
    });
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { T.toggle(b.dataset.tray); }); });
  T.on(paint); paint();
})();
