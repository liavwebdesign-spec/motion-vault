/* Motion Vault: שכבת האישורים.
   localStorage = השכבה החיה (מיידית, בלי commit).
   assets/baseline.js = הסטטוס המסונכרן שנשמר בריפו אחרי כל דוח שליאב שולח.
   מי שחדש יותר (timestamp) מנצח, כך שתיקון מצידי מאפס סימון ישן. */
(function () {
  var KEY = "mv-status";
  var MV = {};
  MV.baseline = window.MV_BASELINE || {};

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }

  MV.get = function (id) {
    var l = load()[id], b = MV.baseline[id];
    if (l && b) return (l.t || 0) >= (b.t || 0) ? l : b;
    return l || b || null;
  };
  MV.state = function (id) { var r = MV.get(id); return r && r.s ? r.s : "pending"; };
  MV.note = function (id) { var r = MV.get(id); return (r && r.note) || ""; };
  MV.set = function (id, s, note) {
    var d = load();
    if (s === null) { d[id] = { s: null, note: "", t: Date.now() }; }
    else { d[id] = { s: s, note: note || "", t: Date.now() }; }
    save(d);
  };
  MV.label = function (s) { return s === "ok" ? "מאושר" : s === "no" ? "לא מאושר" : "ממתין"; };

  /* ===== ווידג'ט עמוד דמו ===== */
  MV.panel = function (el) {
    var id = el.dataset.mvpanel;
    var chip = document.querySelector("[data-mvchip]");
    function render() {
      var s = MV.state(id), note = MV.note(id);
      el.innerHTML =
        '<div class="mvp-row">' +
          '<span class="mvp-q">עובד כמצופה?</span>' +
          '<button class="stbtn ok' + (s === "ok" ? " on" : "") + '" data-s="ok">מאשר ✓</button>' +
          '<button class="stbtn no' + (s === "no" ? " on" : "") + '" data-s="no">לא מאושר ✕</button>' +
          '<span class="mvp-hint">לחיצה נוספת על הכפתור הפעיל מחזירה לממתין</span>' +
        '</div>' +
        (s === "no"
          ? '<div class="mvp-note"><label>מה לא עובד? (אשלח לך את זה בדוח)</label>' +
            '<textarea class="mvp-ta" rows="3" placeholder="לדוגמה: הכרטיסים קופצים בכניסה, הטקסט נחתך במובייל...">' +
            note.replace(/</g, "&lt;") + '</textarea><span class="mvp-saved"></span></div>'
          : "");
      if (chip) { chip.textContent = MV.label(s); chip.className = "chip st-" + s; }
      el.querySelectorAll(".stbtn").forEach(function (b) {
        b.addEventListener("click", function () {
          var want = b.dataset.s;
          MV.set(id, MV.state(id) === want ? null : want, MV.note(id));
          render();
        });
      });
      var ta = el.querySelector(".mvp-ta");
      if (ta) {
        var t, saved = el.querySelector(".mvp-saved");
        ta.addEventListener("input", function () {
          clearTimeout(t);
          t = setTimeout(function () {
            MV.set(id, "no", ta.value);
            saved.textContent = "נשמר ✓";
            setTimeout(function () { saved.textContent = ""; }, 1400);
          }, 400);
        });
      }
    }
    render();
  };

  /* ===== דוח לאינדקס ===== */
  MV.report = function (list) {
    var base = "https://liavwebdesign-spec.github.io/motion-vault/";
    var ok = [], no = [], pending = [];
    list.forEach(function (it) {
      var s = MV.state(it.id);
      if (s === "ok") ok.push(it);
      else if (s === "no") no.push(it);
      else pending.push(it);
    });
    var out = "דוח Motion Vault · " + new Date().toLocaleDateString("he-IL") + "\n";
    out += "סטטוס: " + ok.length + " מאושרים, " + no.length + " לא מאושרים, " + pending.length + " ממתינים\n";
    if (no.length) {
      out += "\nלא מאושרים (לתיקון):\n";
      no.forEach(function (it, i) {
        out += (i + 1) + ". MV:" + it.id + " · " + it.name + "\n";
        out += "   הבעיה: " + (MV.note(it.id) || "(לא נכתבה סיבה)") + "\n";
        out += "   " + base + it.cat + "/" + it.id + ".html\n";
      });
    }
    if (ok.length) out += "\nמאושרים: " + ok.map(function (i) { return "MV:" + i.id; }).join(", ") + "\n";
    if (pending.length) out += "\nטרם נבדקו: " + pending.map(function (i) { return "MV:" + i.id; }).join(", ") + "\n";
    return out;
  };

  window.MV = MV;
})();
