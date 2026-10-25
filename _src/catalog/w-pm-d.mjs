// מפות, רשתות ודיאגרמות מ-prompt-motion.com (21.10.2026, ליאב: "אני רוצה את כל המהלכים שהיו שם לא רק שלושה").
// האתר הוא גלריה של סרטוני תנועה. כאן הדפוסים של רשתות, קווי חיבור ומפות שחוזרים בכמה סרטונים, ושמתורגמים
// לסקשן באתר עסקי. הכול נבנה מאפס מהצפייה: בלי הקוד, הפרומפטים, הסרטונים או הטקסטים של המקור.
// כל הגיאומטריה (צמתים על טבעות, נקודות הגלובוס, מסגרת הדיאגרמה) מחושבת כאן פעם אחת וכתובה למארקאפ,
// כך שבלי GSAP ובהפחתת תנועה רואים את הרשת המוגמרת.

// ---- עזרים לחישוב המארקאפ (רצים בזמן הבנייה, לא באתר) ----
const f1 = n => Math.round(n * 10) / 10;

// g171: הרשת עם המרכז והשותפים
const HB_INIT = ["דכ", "מל", "רא", "יש", "נב", "עג", "אה", "תס", "שפ", "גו", "חר", "בז", "לק", "ור", "כנ", "אמ"];
const HB_AMT = { 0: 240, 2: 120, 3: 360, 5: 180, 6: 90, 7: 420, 8: 150, 9: 300, 10: 210, 11: 120, 13: 480, 14: 270, 15: 330 };
const HB_KEEP = new Set([3, 8, 13, 15]);
const hbNodes = [];
for (let i = 0; i < 6; i++) { const a = (-90 + i * 60 + 14) * Math.PI / 180; hbNodes.push({ x: f1(Math.cos(a) * 128), y: f1(Math.sin(a) * 128), r: 25 }); }
// הטבעת החיצונית יושבת בין הצמתים הפנימיים, כך שאף חוט לא עובר דרך עיגול אחר
for (const a0 of [-55, -37, 5, 23, 65, 83, 125, 143, 205, 245]) { const a = a0 * Math.PI / 180; hbNodes.push({ x: f1(Math.cos(a) * 234), y: f1(Math.sin(a) * 234), r: 22 }); }
const hbSum = Object.values(HB_AMT).reduce((s, v) => s + v, 0);
const hbFinal = 33680 + hbSum;
const hbFmt = v => "₪" + v.toLocaleString("en-US");
const hbSpokes = hbNodes.map(n => `<line class="hb-spoke" x1="0" y1="0" x2="${n.x}" y2="${n.y}"/>`).join("\n      ");
const hbNodeSvg = hbNodes.map((n, i) => `<g transform="translate(${n.x} ${n.y})"><g class="hb-n${i % 3 === 1 ? " is-tint" : ""}"><circle r="${n.r}"/><text y="${n.r > 23 ? 6 : 5.5}">${HB_INIT[i]}</text></g></g>`).join("\n      ");
const hbChipSvg = hbNodes.map((n, i) => HB_AMT[i] ? `<g transform="translate(${n.x} ${f1(n.y - n.r - 22)})"><g class="hb-chip${HB_KEEP.has(i) ? " is-keep" : ""}" data-amt="${HB_AMT[i]}" data-x="${n.x}" data-y="${n.y}"><rect x="-39" y="-15" width="78" height="30" rx="15"/><text y="5.5">+₪${HB_AMT[i]}</text></g></g>` : "").filter(Boolean).join("\n      ");

// g172: גלובוס נקודות. מצולעי היבשות גסים בכוונה, והם משמשים גם לבנייה (מארקאפ ללא JS) וגם לדף עצמו.
const GL_POLYS = [
  // צפון אמריקה
  [[-168,66],[-162,70],[-141,70],[-125,70],[-110,73],[-95,72],[-82,70],[-80,63],[-94,60],[-93,53],[-82,52],[-79,57],[-77,62],[-70,60],[-62,57],[-56,52],[-60,47],[-67,45],[-70,42],[-74,40],[-76,35],[-81,31],[-80,26],[-82,28],[-84,30],[-90,29],[-94,29],[-97,26],[-97,21],[-95,18],[-91,19],[-87,21],[-88,16],[-84,15],[-83,10],[-79,9],[-77,8],[-80,7],[-84,9],[-86,12],[-90,14],[-95,16],[-105,20],[-106,23],[-112,29],[-115,31],[-110,24],[-112,25],[-117,32],[-121,35],[-124,40],[-124,47],[-128,51],[-134,57],[-140,60],[-148,60],[-153,58],[-158,57],[-164,55],[-158,59],[-165,62]],
  // גרינלנד, באפין, ויקטוריה, אלסמיר
  [[-72,78],[-55,82],[-25,83],[-18,76],[-20,70],[-40,65],[-44,60],[-52,64],[-55,70],[-68,76]],
  [[-80,63],[-72,70],[-62,67],[-65,63]], [[-118,70],[-105,73],[-101,69],[-115,68]], [[-90,77],[-70,82],[-62,82],[-80,78]],
  // דרום אמריקה
  [[-77,8],[-72,12],[-62,11],[-52,5],[-50,0],[-44,-2],[-35,-5],[-39,-14],[-41,-22],[-48,-26],[-53,-34],[-58,-38],[-65,-41],[-66,-47],[-69,-52],[-72,-54],[-75,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0],[-78,3]],
  // אירואסיה
  [[-9,37],[-9,43],[-2,43.5],[-1.5,46],[-4,48],[-1,49],[2,51],[5,53],[8,54],[9,57],[10.5,57.5],[11,54],[14,54],[20,54.5],[21,57],[24,57.5],[24,59.5],[30,60],[28,60.5],[22,60.5],[21,63],[25,65.5],[22,66],[17,62],[18,59],[16,56],[13,55.5],[11,59],[6,58],[5,62],[14,67],[20,70],[28,71],[33,69],[41,67],[44,68],[53,68],[60,69],[69,73],[80,73],[88,75],[100,78],[110,77],[113,74],[130,71],[140,72],[150,71],[160,70],[170,70],[180,68],[180,65],[170,62],[163,60],[160,54],[156,51],[156,57],[143,59],[138,54],[141,48],[135,43],[130,42],[129,35],[126,35],[126,38],[125,39.5],[121,40],[122,37],[119,35],[122,31],[120,27],[117,23],[110,21],[108,17],[109,12],[105,9],[103,10],[100,13],[100,7],[103,2],[101,3],[98,8],[98,16],[94,17],[91,22],[87,21],[80,15],[78,8],[76,10],[73,17],[72,21],[68,24],[62,25],[57,26],[56,27],[52,27],[50,30],[48,30],[50,26],[52,24],[56,25],[59,22],[57,19],[52,16],[44,12.5],[43,14],[39,21],[35,28],[34.5,31],[35,33],[36,36],[30,36.5],[27,37],[26,40],[24,40],[23,38],[22,37],[21,38.5],[20,40],[19,42],[14,45],[12,44.5],[13,42],[16,41],[18,40],[16,38],[15.7,40],[12,42],[10,44],[8,44],[4,43.5],[3,42],[0,39],[-1,37],[-5,36]],
  // אפריקה ומדגסקר
  [[-17,21],[-16,28],[-10,30],[-6,36],[3,37],[10,37],[11,33],[20,31],[25,32],[32,31],[34,28],[39,21],[43,12],[51,12],[51,10],[46,3],[41,-3],[40,-11],[40,-16],[35,-24],[32,-29],[28,-33],[20,-35],[18,-32],[15,-26],[12,-17],[13,-10],[9,-1],[9,4],[6,4],[-3,5],[-8,4],[-13,8],[-17,14]],
  [[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],
  // בריטניה, אירלנד, איסלנד, יפן
  [[-5,50],[1,51],[1.5,53],[-2,56],[-2,58],[-5,58.5],[-6,56],[-3,54.5],[-5,52]], [[-10,52],[-6,52],[-6,55],[-8,55],[-10,54]], [[-24,65],[-14,66],[-14,64.5],[-22,63.5]],
  [[130.5,32],[133,33.5],[136,34],[139.5,35],[141,36],[142,39],[141.5,41.5],[140,40],[137,37],[135,35],[131.5,34],[130,33]],
  // אינדונזיה, פיליפינים, גינאה החדשה
  [[95,5],[98,4],[104,-2],[106,-6],[102,-4],[96,0]], [[105,-6],[114,-7],[114,-8.5],[106,-7]], [[109,1],[111,2],[117,7],[119,5],[117,-1],[116,-4],[111,-3],[109,-1]],
  [[131,-1],[141,-2.5],[147,-6],[150,-10],[143,-9],[138,-8],[133,-4]], [[120,18],[122,18],[124,13],[126,7],[122,7],[121,14]],
  // אוסטרליה וניו זילנד
  [[114,-22],[114,-26],[115,-34],[119,-35],[124,-33],[131,-31.5],[135,-35],[138,-35],[140,-38],[146,-39],[150,-37],[153,-31],[153,-25],[146,-19],[142,-11],[141,-17],[136,-12],[131,-12],[127,-14],[122,-18]],
  [[172,-34.5],[178,-37.5],[175,-41.5],[172,-40]], [[172,-41],[174,-41.5],[171,-45],[167,-46],[168,-44]]
];
function glLand(polys, step) {
  const out = [];
  for (let lat = -58; lat <= 82; lat += step) {
    const n = Math.max(1, Math.round(360 * Math.cos(lat * Math.PI / 180) / step));
    for (let k = 0; k < n; k++) {
      const lon = -180 + (k + .5) * 360 / n;
      let hit = false;
      for (const poly of polys) {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const a = poly[i], b = poly[j];
          if ((a[1] > lat) !== (b[1] > lat) && lon < (b[0] - a[0]) * (lat - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
        }
        if (inside) { hit = true; break; }
      }
      if (hit) out.push([lat, lon]);
    }
  }
  return out;
}
function glVec(lat, lon) { const D = Math.PI / 180, c = Math.cos(lat * D); return [c * Math.cos(lon * D), c * Math.sin(lon * D), Math.sin(lat * D)]; }
function glProj(v, lon0, lat0) {
  const D = Math.PI / 180, cl = Math.cos(lon0 * D), sl = Math.sin(lon0 * D), cp = Math.cos(lat0 * D), sp = Math.sin(lat0 * D);
  const x1 = v[0] * cl + v[1] * sl, y1 = -v[0] * sl + v[1] * cl, z1 = v[2];
  return [y1, z1 * cp - x1 * sp, x1 * cp + z1 * sp];
}
function glArc(a, b, n, lift) {
  const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), w = Math.acos(dot), sw = Math.sin(w), out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, ka = Math.sin((1 - t) * w) / sw, kb = Math.sin(t * w) / sw, h = 1 + (lift + .09 * w) * Math.sin(Math.PI * t);
    out.push([(a[0] * ka + b[0] * kb) * h, (a[1] * ka + b[1] * kb) * h, (a[2] * ka + b[2] * kb) * h]);
  }
  return out;
}
const GL_LON0 = 28, GL_LAT0 = 24, GL_STEP = 2.8;
const GL_PINS = [
  { he: "תל אביב", lat: 32.1, lon: 34.8, hub: true },
  { he: "לונדון", lat: 51.5, lon: -0.1, n: 14 }, { he: "דובאי", lat: 25.2, lon: 55.3, n: 9, dn: true }, { he: "ניירובי", lat: -1.3, lon: 36.8, n: 6, dn: true },
  { he: "יוהנסבורג", lat: -26.2, lon: 28, n: 5 }, { he: "ניו יורק", lat: 40.7, lon: -74, n: 17 }, { he: "סאו פאולו", lat: -23.5, lon: -46.6, n: 4 },
  { he: "סינגפור", lat: 1.3, lon: 103.8, n: 7 }, { he: "סידני", lat: -33.9, lon: 151.2, n: 5 }
];
const GL_R = 240, GL_C = 300;
const glLandPts = glLand(GL_POLYS, GL_STEP);
const glFbDots = glLandPts.map(([la, lo]) => { const p = glProj(glVec(la, lo), GL_LON0, GL_LAT0); return p[2] > .04 ? "M" + f1(GL_C + GL_R * p[0]) + " " + f1(GL_C - GL_R * p[1]) + "h0" : ""; }).join("");
const glHubV = glVec(GL_PINS[0].lat, GL_PINS[0].lon);
const glFbArcs = GL_PINS.slice(1).map(pn => {
  const pts = glArc(glHubV, glVec(pn.lat, pn.lon), 28, .04).map(v => glProj(v, GL_LON0, GL_LAT0)).filter(p => p[2] >= 0);
  return pts.length > 2 ? '<path d="M' + pts.map(p => f1(GL_C + GL_R * p[0]) + " " + f1(GL_C - GL_R * p[1])).join("L") + '"/>' : "";
}).join("");
const glFbPins = GL_PINS.map(pn => { const p = glProj(glVec(pn.lat, pn.lon), GL_LON0, GL_LAT0); return p[2] > .04 ? '<circle cx="' + f1(GL_C + GL_R * p[0]) + '" cy="' + f1(GL_C - GL_R * p[1]) + '" r="' + (pn.hub ? 7 : 5) + '"/>' : ""; }).join("");
const glPinHtml = GL_PINS.map((pn, i) => '<span class="gl-pin' + (pn.hub ? " is-hub" : "") + (pn.dn ? " is-dn" : "") + '" data-i="' + i + '"><span class="gl-in">' + (pn.hub ? '<i class="gl-ring"></i>' : "") + '<i class="gl-dot"></i><b class="gl-chip">' + pn.he + (pn.n ? '<em>' + pn.n + '</em>' : "") + '</b></span></span>').join("");

// ==== BEGIN il ====
// g176: איור הצמח בקואורדינטות viewBox 520x400. כל צורה סגורה נכתבת פעמיים, פעם כשכבת מילוי (opacity)
// ופעם כשכבת קו (dashoffset), כדי שהקו והצבע יונפשו בנפרד בלי לגעת בתכונות שאינן transform או opacity.
const IL_SOIL = "M36 224 H484 V338 Q484 364 458 364 H62 Q36 364 36 338 Z";
const IL_STEM = "M260 224 C258 190 264 150 262 106";
const IL_ROOTS = [
  "M260 224 C258 250 250 270 236 292 C228 304 222 318 216 338",
  "M260 224 C262 252 270 272 286 294 C296 308 300 322 304 340",
  "M258 240 C240 252 212 258 190 276",
  "M264 246 C284 254 312 256 340 270",
  "M258 232 C256 262 258 296 262 336",
  "M236 292 C226 296 214 296 202 304",
  "M286 294 C298 296 312 300 322 310"
];
const IL_LEAVES = [
  "M257 200 C236 202 212 192 196 172 C220 166 246 176 257 200 Z",
  "M259 184 C282 186 306 176 322 156 C298 150 270 160 259 184 Z",
  "M258 160 C240 158 222 148 212 130 C232 126 252 138 258 160 Z",
  "M261 146 C278 146 294 138 302 124 C284 120 267 130 261 146 Z"
];
const IL_PETAL = "M0 -4 C-14 -14 -12 -36 0 -40 C12 -36 14 -14 0 -4 Z";
const IL_CLOUD = "M40 80 C28 80 24 66 34 61 C34 49 48 44 56 50 C60 36 82 32 90 44 C102 38 118 46 116 60 C130 60 134 80 118 80 Z";
const IL_DROP = "M0 -12 C6 -4 10 2 10 7 C10 13 5 17 0 17 C-5 17 -10 13 -10 7 C-10 2 -6 -4 0 -12 Z";
const ilTf = (x, y, r) => "translate(" + x + " " + y + ")" + (r ? " rotate(" + r + ")" : "");
const ilPetals = [0, 1, 2, 3, 4].map(k => ilTf(262, 80, k * 72));
const ilDrops = [[62, 106], [94, 134], [60, 160]].map(([x, y]) => ilTf(x, y));
const ilF = (g, d, tf) => '<path class="il-f" data-g="' + g + '" d="' + d + '"' + (tf ? ' transform="' + tf + '"' : "") + "/>";
const ilS = (g, d, tf) => '<path class="il-s" data-g="' + g + '" pathLength="1" d="' + d + '"' + (tf ? ' transform="' + tf + '"' : "") + "/>";
const ilFills = [
  ilF("soil", IL_SOIL),
  ...IL_LEAVES.map(d => ilF("leaves", d)),
  ...ilPetals.map(t => ilF("petals", IL_PETAL, t)),
  '<circle class="il-f" data-g="core" cx="262" cy="80" r="9"/>',
  ilF("cloud", IL_CLOUD),
  ...ilDrops.map(t => ilF("rain", IL_DROP, t))
].join("\n      ");
const ilLines = [
  ilS("soil", IL_SOIL),
  ...IL_ROOTS.map(d => ilS("roots", d)),
  ilS("stem", IL_STEM),
  ...IL_LEAVES.map(d => ilS("leaves", d)),
  ...ilPetals.map(t => ilS("petals", IL_PETAL, t)),
  '<circle class="il-s" data-g="core" pathLength="1" cx="262" cy="80" r="9"/>',
  ilS("cloud", IL_CLOUD),
  ...ilDrops.map(t => ilS("rain", IL_DROP, t))
].join("\n      ");
const IL_LEADS = ["M332 72 L306 78", "M344 150 L322 146", "M330 298 L304 298"];
const ilLeads = IL_LEADS.map(d => '<path class="il-ld" pathLength="1" d="' + d + '"/>').join("\n      ");
const IL_WORDS = "כשמוסיפים לאתר מאמר חדש כל שבוע, עמודי השירות נשענים על תוכן קיים והפניות מתחילות להגיע אחרי כמה חודשים.".split(" ");
const ilCap = IL_WORDS.map(w => "<span>" + w + "</span>").join(" ");
// ==== END il ====

// ==== BEGIN nl ====
// g177: שדה הצמתים. ארבע קבוצות (מרכז + הילת נקודות), רשת קווים בין המרכזים, חשבון חריג אחד.
// מיקום הנקודות מחושב כאן עם מחולל אקראי עם זרע קבוע, ולכן המארקאפ זהה בכל בנייה.
const nlRng = (a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(20261022);
const NL_HUBS = [
  { x: 150, y: 132, c: "a", k: 13 },
  { x: 404, y: 112, c: "b", k: 11 },
  { x: 168, y: 304, c: "c", k: 10 },
  { x: 414, y: 300, c: "d", k: 12 }
];
const NL_OUT = { x: 292, y: 350 };
const nlHalo = NL_HUBS.map(h => {
  const dots = [];
  for (let i = 0; i < h.k; i++) {
    const ang = i * 2.399963 + nlRng() * .7;
    const rad = 34 + Math.sqrt((i + .5) / h.k) * 62 + nlRng() * 6;
    dots.push({ x: f1(h.x + Math.cos(ang) * rad), y: f1(h.y + Math.sin(ang) * rad), r: f1(2.4 + nlRng() * 2) });
  }
  return dots;
});
const nlLoose = [[36, 40], [88, 214], [250, 58], [292, 150], [330, 230], [520, 190], [506, 56], [60, 372], [120, 430], [470, 436], [520, 392], [300, 268]]
  .map(([x, y]) => ({ x: x + Math.round((nlRng() - .5) * 14), y: y + Math.round((nlRng() - .5) * 14), r: f1(1.8 + nlRng() * 1.4) }));
const NL_LINKS = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3]];
const nlLinks = NL_LINKS.map(([a, b]) => '<line class="nl-lk" pathLength="1" x1="' + NL_HUBS[a].x + '" y1="' + NL_HUBS[a].y + '" x2="' + NL_HUBS[b].x + '" y2="' + NL_HUBS[b].y + '"/>').join("\n      ");
const nlHalos = NL_HUBS.map((h, i) =>
  '<g class="nl-halo" data-hx="' + h.x + '" data-hy="' + h.y + '">' +
  nlHalo[i].map(d => '<line class="nl-sp nl-' + h.c + '" pathLength="1" x1="' + h.x + '" y1="' + h.y + '" x2="' + d.x + '" y2="' + d.y + '"/>').join("") +
  nlHalo[i].map(d => '<circle class="nl-dot nl-' + h.c + '" cx="' + d.x + '" cy="' + d.y + '" r="' + d.r + '"/>').join("") +
  "</g>").join("\n      ");
const nlLooseSvg = nlLoose.map(d => '<circle class="nl-loose" cx="' + d.x + '" cy="' + d.y + '" r="' + d.r + '"/>').join("");
const nlHubSvg = NL_HUBS.map(h => '<g class="nl-hub nl-' + h.c + '" data-cx="' + h.x + '" data-cy="' + h.y + '"><circle class="nl-hh" cx="' + h.x + '" cy="' + h.y + '" r="24"/><circle class="nl-hc" cx="' + h.x + '" cy="' + h.y + '" r="14"/></g>').join("\n      ");
const nlOutLinks = [2, 3].map(i => '<line class="nl-ol" pathLength="1" x1="' + NL_OUT.x + '" y1="' + NL_OUT.y + '" x2="' + NL_HUBS[i].x + '" y2="' + NL_HUBS[i].y + '"/>').join("");
// ==== END nl ====

// ==== BEGIN aw ====
// g178: משפט עם קשתות בין מילים קשורות. המילים והזוגות מוגדרים כאן; מיקום הקשתות נמדד בדפדפן (layout ב-JS).
const AW_WORDS = ["ההצעה", "המעודכנת", "נשלחה", "אתמול,", "והלקוח", "כבר", "קרא", "אותה", "פעמיים"];
const AW_PAIRS = [[0, 1], [0, 2], [2, 3], [4, 6], [5, 6], [6, 7], [6, 8]];
const AW_ACT = [0, 7];
const awWordsHtml = AW_WORDS.map((w, i) => '<span class="aw-w' + (i === AW_ACT[0] ? " is-n" : i === AW_ACT[1] ? " is-p" : "") + '"><b>' + w + '</b><i class="aw-bar"><u></u></i></span>').join("\n      ");
const awSvg = AW_PAIRS.map(([a, b]) => '<path class="aw-t" pathLength="1" data-a="' + a + '" data-b="' + b + '"/>').join("") +
  '<path class="aw-h" pathLength="1" data-a="' + AW_ACT[0] + '" data-b="' + AW_ACT[1] + '"/>' +
  AW_WORDS.map((w, i) => '<circle class="aw-d' + (AW_ACT.includes(i) ? " is-hot" : "") + '" data-i="' + i + '" r="' + (AW_ACT.includes(i) ? 5 : 2.5) + '"/>').join("");
// ==== END aw ====

// ==== BEGIN rd ====
// g179: מכ"ם. צמתים במיקום קוטבי (זווית בכיוון השעון מהחלק העליון, רדיוס ביחס לשדה), נקודות פיזור קבועות.
// הזווית של כל צומת נשמרת ב-data-a; ה-JS מדליק אותו בדיוק ברגע שקצה הקונוס עובר בה.
const RD_NODES = [
  { a: 18, r: .46, n: "אורי", l: "חנות פרחים" },
  { a: 52, r: .8, n: "נועה", l: "קליניקה" },
  { a: 88, r: .4, n: "מאיה", l: "סטודיו" },
  { a: 118, r: .72, n: "דנה", l: "עורכת דין", sel: true },
  { a: 150, r: .42, n: "ניר", l: "מסעדה" },
  { a: 186, r: .8, n: "רונית", l: "גן אירועים" },
  { a: 214, r: .52, n: "יואב", l: "מוסך" },
  { a: 246, r: .76, n: "לילך", l: "מרצה" },
  { a: 276, r: .36, n: "גיא", l: "יועץ מס" },
  { a: 304, r: .68, n: "שירן", l: "מאמנת" },
  { a: 336, r: .84, n: "עומר", l: "מעצב" }
];
const rdPos = (a, r) => [f1(50 + r * 50 * Math.sin(a * Math.PI / 180)), f1(50 - r * 50 * Math.cos(a * Math.PI / 180))];
const rdNodesHtml = RD_NODES.map(d => {
  const [x, y] = rdPos(d.a, d.r);
  return '<li class="rd-n' + (d.sel ? " is-sel" : "") + '" data-a="' + d.a + '" style="--x:' + x + "%;--y:" + y + '%"><i></i><b></b><u></u><em></em><span>' + d.n + "<s>, " + d.l + "</s></span></li>";
}).join("\n      ");
const rdRng = (a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; })(20261023);
const rdScatter = Array.from({ length: 30 }, () => {
  const ang = rdRng() * 6.2832, rad = 30 + Math.sqrt(rdRng()) * 205;
  return '<circle class="rd-s" cx="' + f1(260 + Math.cos(ang) * rad) + '" cy="' + f1(260 + Math.sin(ang) * rad) + '" r="' + f1(1.2 + rdRng() * 1.2) + '"/>';
}).join("");
// ==== END rd ====

export default [
{
  id:"g171", cat:"gsap", name:"מרכז עם שותפים שמשלמים אליו ומספר שעולה", tech:"GSAP · ScrollTrigger · SVG", status:"מאושר-עין",
  desc:"אריח במרכז, וסביבו על שתי טבעות עיגולים עם ראשי תיבות של שותפים, כל אחד מחובר אליו בקו מנוקד. הרשת נבנית, ואז קופצות שורות \"+₪240\" ליד השותפים בזו אחר זו, נקודה קטנה רצה מהשותף אל האריח, והסכום הגדול מתחת עולה בכל הגעה. רואים שהכסף באמת מגיע ממישהו.",
  when:"תוכנית שותפים, הפניות, אינטגרציות או קהילה: כל מקום שבו יש מרכז אחד וכמה גורמים שמזינים אותו, ואפשר להראות כמה עבר ביניהם. סקשן הוכחה או \"איך זה עובד\" של תוכנית עמלות. פעם אחת בעמוד. מתאים גם לשילוב בעשרה עד עשרים צמתים, לא יותר.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם לוגו במרכז מוקף בעיגולים של אנשים וכלים, עם קווים מנוקדים, סכומים שקופצים וספירה למטה. נבנה מאפס מהצפייה. **המיקום בטריגונומטריה:** הצמתים יושבים על שתי טבעות סביב נקודת האפס (`translate(300 300)` על הקבוצה), והקואורדינטות של כל צומת כתובות במארקאפ, כך שבלי GSAP רואים רשת גמורה עם הסכום הסופי וארבע שורות \"+₪\" פתוחות. כדי להוסיף צומת מוסיפים `g` ו-`line`, ושורה אם רוצים עליו אירוע. **האירועים:** כל שורה נושאת `data-amt` (הסכום) ו-`data-x`/`data-y` (מיקום הצומת). הסקריפט מסדר אותם בסדר קבוע (בלי `Math.random`, כדי שהדמו זהה בכל טעינה), מקפיץ שורה, שולח נקודה מהצומת למרכז ומעלה את הסכום לפי `data-amt`. הסכום ההתחלתי נגזר מהסכום הסופי פחות כל האירועים, ולכן המספר שבמארקאפ הוא תמיד המספר שבו נעצרים. שורות שמסומנות `is-keep` נשארות פתוחות בסוף, והשאר נעלמות. **בטלפון** הרשת בריבוע ברוחב המסך, והטקסט והסכום מעליה. הכתב בתוך הצמתים והשורות מוגדל ל-23 ו-22 יחידות כדי שיישאר קריא ברוחב 390. **משמאל לימין:** הרשת סימטרית, אין מה להפוך. סדר הקריאה של עמודת הטקסט מתהפך מעצמו. **נגישות:** כל הרשת `aria-hidden`, והסכום הסופי בטקסט מוסתר, כך שקורא מסך לא שומע מספרי ביניים. **ביצועים:** נקודה אחת שנעה, כל השאר opacity ו-transform. נגמר בעצמו, בלי לולאה.",
  libs:["gsap","ScrollTrigger"],
  css:`.hb{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,560px);align-items:center;gap:clamp(32px,6vw,96px);max-width:1120px;margin-inline:auto}
.hb-txt{display:grid;gap:16px;max-width:36ch}
.hb-txt h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.hb-lead{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.hb-total{display:grid;gap:4px;margin:12px 0 0}
.hb-total b{font-size:clamp(44px,5.6vw,84px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.hb-total small{font-size:var(--fs-body);color:var(--muted)}
.hb-fig{margin:0}
.hb-svg{display:block;width:100%;height:auto;overflow:visible}
.hb-spoke{stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-dasharray:.1 8;opacity:.55}
.hb-halo{fill:none;stroke:var(--line);stroke-width:2}
.hb-hub rect{fill:var(--accent)}
.hb-hub path{fill:none;stroke:var(--accent-ink);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.hb-n circle{fill:var(--card);stroke:var(--line);stroke-width:2}
.hb-n.is-tint circle{fill:color-mix(in srgb,var(--accent) 14%,var(--card))}
.hb-n text{fill:var(--ink);font-size:17px;font-weight:600;text-anchor:middle;font-family:inherit}
.hb-chip{opacity:0}
.hb-chip.is-keep{opacity:1}
.hb-chip rect{fill:var(--accent)}
.hb-chip text{fill:var(--accent-ink);font-size:17px;font-weight:700;text-anchor:middle;direction:ltr;unicode-bidi:isolate;font-family:inherit}
.hb-dot{fill:var(--accent);opacity:0}
.hb .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.hb{grid-template-columns:minmax(0,1fr)}.hb-txt{max-width:none}.hb-n text{font-size:23px}.hb-chip text{font-size:22px}}`,
  html:`<div class="stage"><div class="hb">
  <div class="hb-txt">
    <h2>כל מי שמפנה אלינו לקוח מקבל עמלה</h2>
    <p class="hb-lead">שותפים בכל הארץ שולחים לנו לקוחות, ובתחילת כל חודש אנחנו משלמים על מה שנסגר.</p>
    <p class="hb-total"><b aria-hidden="true" data-final="${hbFinal}">${hbFmt(hbFinal)}</b><small>שולם לשותפים החודש</small><span class="sr-only">שולמו לשותפים החודש ${hbFmt(hbFinal)}</span></p>
  </div>
  <figure class="hb-fig">
    <svg class="hb-svg" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <g transform="translate(300 300)">
      <circle class="hb-halo" r="72"/>
      ${hbSpokes}
      <circle class="hb-dot" r="5"/>
      <g class="hb-hub"><rect x="-42" y="-42" width="84" height="84" rx="24"/><path d="M-14 8l9-17 9 11 10-14"/></g>
      ${hbNodeSvg}
      ${hbChipSvg}
      </g>
    </svg>
  </figure>
</div></div>`,
  js:`(function(){
  if(typeof gsap==="undefined")return;      // בלי GSAP הרשת מוגמרת והסכום הסופי כבר במארקאפ
  const root=document.querySelector(".hb"),svg=root.querySelector(".hb-svg"),out=root.querySelector(".hb-total b");
  const nodes=[...svg.querySelectorAll(".hb-n")],spokes=[...svg.querySelectorAll(".hb-spoke")],chips=[...svg.querySelectorAll(".hb-chip")];
  const dot=svg.querySelector(".hb-dot"),hub=svg.querySelector(".hb-hub"),halo=svg.querySelector(".hb-halo");
  const fmt=v=>"₪"+Math.round(v).toLocaleString("en-US"),final=parseInt(out.dataset.final,10);
  const sum=chips.reduce((s,c)=>s+(+c.dataset.amt),0),base=final-sum;
  // סדר קבוע (בלי אקראי), והשורות שנשארות פתוחות בסוף אחרונות
  const order=[...chips.filter(c=>!c.classList.contains("is-keep")).sort((a,b)=>(a.dataset.amt*7%13)-(b.dataset.amt*7%13)),...chips.filter(c=>c.classList.contains("is-keep"))];
  // בהפחתת תנועה הפונקציה לא רצה, והרשת נשארת במצבה הסופי
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const o={v:base},draw=()=>{out.textContent=fmt(o.v);};
    draw();gsap.set(chips,{autoAlpha:0});
    const tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top 72%",once:true}});
    tl.from(hub,{scale:.7,autoAlpha:0,transformOrigin:"50% 50%",duration:.5,ease:"power2.out"})
      .from(nodes,{scale:0,autoAlpha:0,transformOrigin:"50% 50%",duration:.4,ease:"power2.out",stagger:.04},.1)
      .from(spokes,{autoAlpha:0,duration:.4,stagger:.04},.2);
    let t=1.1,cum=base;
    order.forEach(c=>{
      const x=+c.dataset.x,y=+c.dataset.y;cum+=+c.dataset.amt;
      tl.fromTo(c,{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.3,ease:"power2.out"},t)
        .fromTo(dot,{x,y,autoAlpha:1},{x:0,y:0,duration:.8,ease:"power1.in"},t+.15)
        .set(dot,{autoAlpha:0},t+.95)
        .fromTo(halo,{scale:1},{scale:1.1,transformOrigin:"50% 50%",duration:.18,yoyo:true,repeat:1,ease:"power1.out"},t+.95)
        .to(o,{v:cum,duration:.45,ease:"power1.out",onUpdate:draw},t+.95);
      if(!c.classList.contains("is-keep"))tl.to(c,{autoAlpha:0,duration:.3},t+1.7);
      t+=.46;
    });
    return()=>{out.textContent=fmt(final);};
  });
})();`
},
{
  id:"g172", cat:"gsap", name:"גלובוס נקודות עם סיכות, קשתות ומונה", tech:"GSAP · Canvas · ScrollTrigger", status:"מאושר-עין",
  desc:"גלובוס עשוי נקודות מסתובב לאט, בתנועה מימין לשמאל. בכניסה לעמוד הוא מסתובב אל מקום המנוחה, וממרכז אחד יוצאות קשתות אל ערים בעולם. כל קשת שמגיעה מקפיצה סיכה עם שם העיר ומספר, והמספר הגדול לידו עולה עם כל הגעה. הסיכות מתחלפות כשהכדור ממשיך להסתובב.",
  when:"סקשן שמראה היקף: מדינות, לקוחות, משלוחים, סניפים או שותפים בעולם. מתאים לעסק שמוכר או שולח מחוץ לישראל, לשירות שעובד מרחוק ולחברה עם כמה נקודות פעילות. עמוד אחד, פעם אחת. אם יש רק שתי ערים או שהיעדים כולם באזור אחד, מפה שטוחה תעבוד טוב יותר.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כדור נקודות מסתובב עם סיכות מוארות, קשתות בין נקודות ומונה גדול לצדו. נבנה מאפס מהצפייה. **הציור:** קנבס אחד. רשת נקודות לפי קו רוחב ואורך, מסוננת במצולעים גסים של היבשות (`GL_POLYS`), והקרנה אורתוגרפית (`glProj`) עם הטיה של 22 מעלות. הקשתות הן מעגל גדול בין שתי נקודות, מורם מעל הכדור לפי הזווית, ומצויר רק במקום שהוא לא מוסתר מאחורי הכדור. **סיכות ותוויות** הן אלמנטים רגילים ב-DOM שממוקמים בכל פריים לפי ההקרנה, כך שהטקסט חד, נבחר ונגיש, והתווית יושבת מעל הסיכה ונעלמת עם הסיכה בקצה הכדור, ולכן אף פעם לא חורגת מהעמוד. **מקום המנוחה:** `GL_LON0` ו-`GL_LAT0`. כל מה שהכדור מציג שם נכתב גם למארקאפ כ-SVG (נקודות וקשתות), כך שבלי JS ובהפחתת תנועה רואים כדור גמור עם המספר הסופי. כשהקנבס מוכן ה-SVG מוסתר. **תנועה:** ציר הזמן מוסיף 110 מעלות לסיבוב ההתחלתי, מצייר קשת אחרי קשת (ההגעה מקפיצה את הסיכה ומעלה את המונה), ואחרי שהוא נגמר הכדור ממשיך להסתובב מעט, ורק כשהוא בתוך החלון (`IntersectionObserver`). הקנבס מותאם ל-DPR ולרוחב המיכל (`ResizeObserver`). **להתאמה לאתר שלכם:** מחליפים את `GL_PINS` (שם, קו רוחב, קו אורך, מספר) ואת המרכז. **משמאל לימין:** הסיבוב הוא של המשטח, ואפשר להפוך אותו בשינוי סימן ההוספה ל-`lon`. **נגישות:** כל הכדור `aria-hidden`, והמספר הסופי בטקסט מוסתר. **ביצועים:** כ-1,300 נקודות, ציור אחד לפריים, ללא עבודה מחוץ לחלון.",
  libs:["gsap","ScrollTrigger"],
  css:`.gl{overflow-x:clip;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,600px);align-items:center;gap:clamp(32px,6vw,96px);max-width:1120px;margin-inline:auto}
.gl-txt{display:grid;gap:16px;max-width:36ch}
.gl-txt h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.gl-lead{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.gl-total{display:grid;gap:4px;margin:12px 0 0}
.gl-total b{font-size:clamp(56px,7vw,104px);font-weight:700;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.gl-total small{font-size:var(--fs-body);color:var(--muted)}
.gl-fig{margin:0;position:relative;aspect-ratio:1;width:100%}
.gl-cv,.gl-fb{position:absolute;inset:0;width:100%;height:100%;display:block}
.gl-fb .d{fill:none;stroke:var(--muted);stroke-width:5;stroke-linecap:round;opacity:.5}
.gl-fb .a{fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round}
.gl-fb .p{fill:var(--accent)}
.gl-fb .s{fill:var(--card);stroke:var(--line);stroke-width:2}
.gl-pin{position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none}
.gl.is-live .gl-pin{visibility:visible}
.gl.is-live .gl-fb{display:none}
.gl-in{position:absolute;left:0;top:0}
.gl-dot{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 24%,transparent)}
.is-hub .gl-dot{left:-7px;top:-7px;width:14px;height:14px}
.gl-ring{position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;border:2px solid var(--accent);opacity:0}
.gl-chip{position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:99px;background:var(--card);border:1px solid var(--line);color:var(--ink);font-size:14px;font-weight:600;line-height:1.3;white-space:nowrap}
.is-hub .gl-chip{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.gl-chip em{font-style:normal;font-size:12px;font-weight:700;padding:0 6px;border-radius:99px;background:var(--accent);color:var(--accent-ink);font-variant-numeric:tabular-nums}
.gl .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@media(max-width:767px){.gl{grid-template-columns:minmax(0,1fr)}.gl-txt{max-width:none}.gl-chip{font-size:13px;padding:4px 8px}}`,
  html:`<div class="stage"><div class="gl">
  <div class="gl-txt">
    <h2>אנחנו שולחים הזמנות לעסקים בכל העולם</h2>
    <p class="gl-lead">מהמחסן שלנו ליד נתב"ג יוצאות הזמנות בכל יום, ובמרבית היעדים הן מגיעות בתוך שישה ימי עבודה.</p>
    <p class="gl-total"><b aria-hidden="true" data-final="38">38</b><small>מדינות שהגיעו אליהן הזמנות השנה</small><span class="sr-only">הזמנות הגיעו השנה ל-38 מדינות</span></p>
  </div>
  <figure class="gl-fig" aria-hidden="true">
    <svg class="gl-fb" viewBox="0 0 600 600" focusable="false"><circle class="s" cx="300" cy="300" r="240"/><path class="d" d="${glFbDots}"/><g class="a">${glFbArcs}</g><g class="p">${glFbPins}</g></svg>
    <canvas class="gl-cv"></canvas>
    ${glPinHtml}
  </figure>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".gl");if(!root)return;
  const LON0=${GL_LON0},LAT0=${GL_LAT0},PINS=${JSON.stringify(GL_PINS.map(({lat,lon,hub})=>[lat,lon,hub?1:0]))};
  ${glLand.toString()}
  ${glVec.toString()}
  ${glProj.toString()}
  ${glArc.toString()}
  const fig=root.querySelector(".gl-fig"),cv=root.querySelector(".gl-cv"),ctx=cv.getContext("2d"),pinEls=[...root.querySelectorAll(".gl-pin")];
  const land=glLand(${JSON.stringify(GL_POLYS)},${GL_STEP}).map(p=>glVec(p[0],p[1]));
  const pv=PINS.map(p=>glVec(p[0],p[1])),arcs=pv.slice(1).map(v=>({pts:glArc(pv[0],v,40,.04),p:1}));
  const num=root.querySelector(".gl-total b"),FINAL=parseInt(num.dataset.final,10);
  const st={lon:LON0},dn=pinEls.map(e=>e.classList.contains("is-dn")?"translate(-50%,12px)":"translate(-50%,calc(-100% - 12px))");
  let W=0,R=0,dpr=1,col={};
  const readColors=()=>{const cs=getComputedStyle(root),g=n=>cs.getPropertyValue(n).trim();col={muted:g("--muted"),line:g("--line"),accent:g("--accent"),card:g("--card")};};
  function render(){
    if(!W)return;
    const c=W/2,lon=st.lon,k0=W/600;
    ctx.clearRect(0,0,cv.width,cv.height);
    ctx.save();ctx.scale(dpr,dpr);
    ctx.beginPath();ctx.arc(c,c,R,0,6.2832);ctx.fillStyle=col.card;ctx.fill();ctx.lineWidth=1.5;ctx.strokeStyle=col.line;ctx.stroke();
    ctx.fillStyle=col.muted;
    for(let i=0;i<land.length;i++){
      const q=glProj(land[i],lon,LAT0);if(q[2]<=0.03)continue;
      ctx.globalAlpha=.2+.5*Math.sqrt(q[2]);
      ctx.beginPath();ctx.arc(c+R*q[0],c-R*q[1],(.75+.6*q[2])*k0*1.8,0,6.2832);ctx.fill();
    }
    ctx.globalAlpha=1;ctx.lineCap="round";ctx.lineJoin="round";
    for(let a=0;a<arcs.length;a++){
      const A=arcs[a];if(A.p<=0)continue;
      const last=A.p*(A.pts.length-1);let open=false,hx=0,hy=0,hv=false;
      ctx.strokeStyle=col.accent;ctx.lineWidth=2.2*k0;ctx.beginPath();
      for(let k=0;k<=Math.ceil(last);k++){
        const kk=Math.min(k,last),i0=Math.floor(kk),f=kk-i0,v0=A.pts[i0],v1=A.pts[Math.min(i0+1,A.pts.length-1)];
        const q=glProj([v0[0]+(v1[0]-v0[0])*f,v0[1]+(v1[1]-v0[1])*f,v0[2]+(v1[2]-v0[2])*f],lon,LAT0);
        const hide=q[2]<0,x=c+R*q[0],y=c-R*q[1];
        if(hide){open=false;hv=false;continue;}
        if(open)ctx.lineTo(x,y);else ctx.moveTo(x,y);
        open=true;hx=x;hy=y;hv=true;
      }
      ctx.stroke();
      if(A.p<1&&hv){ctx.fillStyle=col.accent;ctx.beginPath();ctx.arc(hx,hy,5*k0,0,6.2832);ctx.fill();ctx.fillStyle=col.muted;}
    }
    ctx.restore();
    for(let i=0;i<pinEls.length;i++){
      const q=glProj(pv[i],lon,LAT0),el=pinEls[i],chip=el.querySelector(".gl-chip");
      el.style.transform="translate("+(c+R*q[0]).toFixed(1)+"px,"+(c-R*q[1]).toFixed(1)+"px)";
      el.style.opacity=Math.max(0,Math.min(1,(q[2]-.04)*6)).toFixed(2);
      chip.style.transform=dn[i];chip.style.opacity=Math.max(0,Math.min(1,(.92-Math.abs(q[0]))*8)).toFixed(2);
    }
  }
  function size(){
    const w=fig.clientWidth;if(!w)return;
    W=w;R=w*.4;dpr=Math.min(window.devicePixelRatio||1,2);
    cv.width=Math.round(w*dpr);cv.height=Math.round(w*dpr);readColors();render();
  }
  root.classList.add("is-live");
  new ResizeObserver(size).observe(fig);size();
  if(typeof gsap==="undefined")return;       // בלי GSAP: כדור גמור במקום המנוחה, עם המספר הסופי
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    let drift=false,live=false;
    const o={v:0},ins=pinEls.map(e=>e.querySelector(".gl-in")),ring=root.querySelector(".gl-ring");
    st.lon=LON0-110;arcs.forEach(a=>{a.p=0;});gsap.set(ins,{scale:0,autoAlpha:0});
    const drawNum=()=>{num.textContent=Math.round(o.v);};drawNum();render();
    const tick=(t,dt)=>{if(drift)st.lon+=dt/1000*3.5;render();};
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!live){live=true;gsap.ticker.add(tick);}else if(!e.isIntersecting&&live){live=false;gsap.ticker.remove(tick);}});
    io.observe(fig);
    const tl=gsap.timeline({scrollTrigger:{trigger:fig,start:"top 78%",once:true},onComplete(){drift=true;}});
    tl.to(st,{lon:LON0,duration:3.2,ease:"power3.out"},0)
      .to(ins[0],{scale:1,autoAlpha:1,duration:.5,ease:"power3.out"},.5);
    arcs.forEach((a,i)=>{
      const t0=1+i*.42;
      tl.to(a,{p:1,duration:.95,ease:"power2.inOut"},t0)
        .to(ins[i+1],{scale:1,autoAlpha:1,duration:.5,ease:"power3.out"},t0+.8);
    });
    tl.to(o,{v:FINAL,duration:4,ease:"power1.out",onUpdate:drawNum},1)
      .fromTo(ring,{scale:.5,autoAlpha:.7},{scale:2.2,autoAlpha:0,duration:1.6,ease:"power1.out",repeat:3,repeatDelay:.4},.6);
    return()=>{live=false;gsap.ticker.remove(tick);io.disconnect();st.lon=LON0;arcs.forEach(a=>{a.p=1;});gsap.set(ins,{clearProps:"all"});gsap.set(ring,{clearProps:"all"});num.textContent=FINAL;render();};
  });
})();`
},
{
  id:"g173", cat:"gsap", name:"שלושה כרטיסים מחוברים בקו שנחתך ומתוקן", tech:"GSAP · ScrollTrigger · SVG", status:"מאושר-עין",
  desc:"שלושה חלונות קטנים בשורה, כל אחד מייצג מערכת. בין הראשון לשני עובר קו מקווקו עם סימן X כהה באמצע, ונקודה שרצה אליו נעצרת ונסוגה: המערכות לא מדברות. הסימן מתכווץ, הקו נצבע ונמתח עד הסוף, הנקודה עוברת בו, ובאמצעו מופיע וי. אותו דבר קורה בין השני לשלישי, וסימוני המצב בכרטיסים מתחלפים מ\"ממתין\" לתוצאה.",
  when:"סקשן על אינטגרציות, חיבור בין מערכות או תהליך שמתחיל במקום אחד ונגמר במקום אחר: חנות והנהלת חשבונות, טופס ו-CRM, הזמנה ומחסן. מתאים לשירות שמחבר מערכות ללקוח. שלושה כרטיסים לכל היותר, וכל קו במצב אחד. כשיש יותר מכך עדיף להראות דיאגרמה שלמה.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם כרטיסי חלון מחוברים בקווים שמצטיירים, נקודה רצה על קו מקווקו, וסימן X על קו שבור. נבנה מאפס מהצפייה, והסיפור כאן הפוך מהמקור: הקו מתחיל חתוך ומתוקן, כך שהמצב הסופי חיובי. **הקווים נשארים מחוברים:** כל קו יושב בתא משלו בגריד בין שני הכרטיסים, ולכן הוא תמיד באורך הנכון. הפונקציה `layout` מודדת את רוחב התא, כותבת אותו ל-`viewBox` ומחשבת מחדש את העקומה בין שני נמלי החיבור (גובה קבוע במסגרת הכרטיס, `PORT` ו-`STAG`). היא רצה בטעינה ובכל שינוי גודל (`ResizeObserver`), ולכן אין עיוות של הקו ואין צורך ב-MotionPath. הנקודה נעה לפי `getPointAtLength`. **כיוון:** `layout` קורא את `direction` של העמוד. בעברית הקו מתחיל בכרטיס הימני ונגמר בשמאלי. באתר משמאל לימין הוא מתהפך לבד, ואין מה לשנות. **בטלפון** הכרטיסים נערמים, קצת מוסטים לצדדים, והקו יורד ביניהם אנכית (אותו `layout`). **המצב הסופי** כתוב במארקאפ: הקווים צבועים עד הסוף עם עקומת גיבוי בתא בגודל קבוע, הוי נראה, והסימונים כבר מציגים את התוצאה. בהפחתת תנועה או בלי GSAP זה מה שרואים (ללא JS העקומה נמתחת לפי רוחב התא ולכן מעט פחות מדויקת). **אין אדום בטוקנים**, ולכן הקו החתוך מסומן בעיגול כהה עם X בצבע הרקע, ולא באדום. **נגישות:** הקווים והסימנים `aria-hidden`, והטקסט בכרטיסים הוא טקסט רגיל במצבו הסופי. **ביצועים:** נקודה אחת לכל קו, כל השאר opacity ו-transform.",
  libs:["gsap","ScrollTrigger"],
  css:`.cn{display:grid;gap:56px;max-width:1120px;margin-inline:auto}
.cn-head{display:grid;gap:16px;max-width:44ch}
.cn-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.cn-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.cn-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(56px,.4fr) minmax(0,1fr) minmax(56px,.4fr) minmax(0,1fr);align-items:start}
.cn-card{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow:hidden;min-height:136px}
.cn-card.is-low{margin-top:56px}
.cn-bar{height:40px;display:flex;align-items:center;gap:6px;padding:0 14px;border-bottom:1px solid var(--line)}
.cn-bar i{width:8px;height:8px;border-radius:50%;background:var(--line)}
.cn-bar span{margin-inline-start:8px;font-size:13px;font-weight:600;color:var(--muted)}
.cn-body{display:grid;gap:6px;padding:16px;justify-items:start}
.cn-body b{font-size:18px;font-weight:600;line-height:1.3}
.cn-body p{margin:0;font-size:15px;line-height:1.5;color:var(--muted)}
.cn-st{display:inline-block;margin-top:8px;padding:4px 12px;border-radius:99px;font-size:13px;font-weight:600;background:var(--accent);color:var(--accent-ink)}
.cn-st.is-wait{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
.cn-link{position:relative;align-self:stretch}
.cn-link svg{position:absolute;left:0;top:0;width:100%;height:80px;overflow:visible}
.cn-base{fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 6;stroke-linecap:round}
.cn-flow{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}
.cn-port{fill:var(--card);stroke:var(--accent);stroke-width:2}
.cn-dot{position:absolute;left:-6px;top:-6px;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px color-mix(in srgb,var(--accent) 22%,transparent);opacity:0;pointer-events:none}
.cn-mk{position:absolute;left:50%;top:48px;width:0;height:0}
.cn-mk i{position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center}
.cn-link .cn-mk svg{position:static;width:14px;height:14px;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.cn-bad i{background:var(--ink);opacity:0}
.cn-link .cn-bad svg{stroke:var(--bg)}
.cn-ok i{background:var(--accent)}
.cn-link .cn-ok svg{stroke:var(--accent-ink)}
@media(max-width:767px){
.cn{gap:40px}
.cn-row{grid-template-columns:minmax(0,1fr)}
.cn-card{width:82%;min-height:0}
.cn-card.is-low{margin-top:0;justify-self:end}
.cn-row>.cn-card:nth-of-type(1),.cn-row>.cn-card:nth-of-type(3){justify-self:start}
.cn-link{height:72px;align-self:auto}
.cn-link svg{height:72px}
}`,
  html:`<div class="stage"><div class="cn">
  <div class="cn-head">
    <h2>המערכות שלכם מדברות זו עם זו</h2>
    <p>אנחנו מחברים את החנות להנהלת החשבונות ולמחסן, כדי שהזמנה תעבור ביניהן בלי שמישהו יעתיק אותה ביד.</p>
  </div>
  <div class="cn-row">
    <article class="cn-card"><div class="cn-bar"><i></i><i></i><i></i><span>החנות</span></div><div class="cn-body"><b>הזמנה חדשה מרונית כהן</b><p>שלושה פריטים, סך הכול 480 ש"ח</p><span class="cn-st">נשלחה</span></div></article>
    <div class="cn-link" aria-hidden="true"><svg viewBox="0 0 100 80" preserveAspectRatio="none" focusable="false"><path class="cn-base" d="M100 20C50 20 50 76 0 76"/><path class="cn-flow" pathLength="1" d="M100 20C50 20 50 76 0 76"/><circle class="cn-port" cx="100" cy="20" r="5"/><circle class="cn-port" cx="0" cy="76" r="5"/></svg><span class="cn-dot"></span><span class="cn-mk cn-bad"><i><svg viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8"/></svg></i></span><span class="cn-mk cn-ok"><i><svg viewBox="0 0 14 14"><path d="M2.5 7.5l3 3 6-7"/></svg></i></span></div>
    <article class="cn-card is-low"><div class="cn-bar"><i></i><i></i><i></i><span>הנהלת חשבונות</span></div><div class="cn-body"><b>חשבונית מס</b><p>נוצרת לבד מכל הזמנה ונשלחת ללקוחה</p><span class="cn-st">הופקה</span></div></article>
    <div class="cn-link" aria-hidden="true"><svg viewBox="0 0 100 80" preserveAspectRatio="none" focusable="false"><path class="cn-base" d="M100 76C50 76 50 20 0 20"/><path class="cn-flow" pathLength="1" d="M100 76C50 76 50 20 0 20"/><circle class="cn-port" cx="100" cy="76" r="5"/><circle class="cn-port" cx="0" cy="20" r="5"/></svg><span class="cn-dot"></span></div>
    <article class="cn-card"><div class="cn-bar"><i></i><i></i><i></i><span>המחסן</span></div><div class="cn-body"><b>רשימת איסוף</b><p>מגיעה למחסן יחד עם ההזמנה</p><span class="cn-st">מוכנה לאיסוף</span></div></article>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".cn");if(!root)return;
  const links=[...root.querySelectorAll(".cn-link")],mq=matchMedia("(max-width:767px)");
  const PORT=20,STAG=56,H=80,VH=72;               // גובה נמל החיבור בכותרת הכרטיס, ההסטה של הכרטיס האמצעי
  const curve=(x1,y1,x2,y2,v)=>v
    ?"M"+x1+" "+y1+"C"+x1+" "+(y1+(y2-y1)*.55)+" "+x2+" "+(y1+(y2-y1)*.45)+" "+x2+" "+y2
    :"M"+x1+" "+y1+"C"+(x1+(x2-x1)/2)+" "+y1+" "+(x1+(x2-x1)/2)+" "+y2+" "+x2+" "+y2;
  // מחשב את הקווים מחדש לפי הרוחב האמיתי של התא, בכל טעינה ובכל שינוי גודל
  function layout(){
    const rtl=getComputedStyle(root).direction==="rtl",v=mq.matches;
    links.forEach((L,i)=>{
      const w=L.clientWidth,svg=L.querySelector("svg"),h=v?VH:H;if(!w)return;
      svg.setAttribute("viewBox","0 0 "+w+" "+h);svg.removeAttribute("preserveAspectRatio");
      let xa,ya,xb,yb;
      if(v){xa=((i%2===0)===rtl?.59:.41)*w;xb=w-xa;ya=0;yb=h;}
      else{xa=rtl?w:0;xb=rtl?0:w;ya=i%2===0?PORT:PORT+STAG;yb=i%2===0?PORT+STAG:PORT;}
      const d=curve(xa,ya,xb,yb,v);
      L.querySelectorAll(".cn-base,.cn-flow").forEach(p=>p.setAttribute("d",d));
      const ports=L.querySelectorAll(".cn-port");
      ports[0].setAttribute("cx",xa);ports[0].setAttribute("cy",ya);ports[1].setAttribute("cx",xb);ports[1].setAttribute("cy",yb);
      const f=L.querySelector(".cn-flow"),m=f.getPointAtLength(f.getTotalLength()/2);
      L.querySelectorAll(".cn-mk").forEach(k=>{k.style.left=m.x+"px";k.style.top=m.y+"px";});
    });
  }
  layout();new ResizeObserver(layout).observe(root);mq.addEventListener("change",layout);
  if(typeof gsap==="undefined")return;       // בלי GSAP: הקווים מחוברים והסימונים מציגים את התוצאה
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const q=s=>[...root.querySelectorAll(s)],cards=q(".cn-card"),st=q(".cn-st"),finals=st.map(e=>e.textContent);
    const [l1,l2]=links,f1=l1.querySelector(".cn-flow"),f2=l2.querySelector(".cn-flow"),b1=l1.querySelector(".cn-base"),b2=l2.querySelector(".cn-base");
    const d1=l1.querySelector(".cn-dot"),d2=l2.querySelector(".cn-dot"),bad=l1.querySelector(".cn-bad i"),ok=l1.querySelector(".cn-ok i");
    const p1=[...l1.querySelectorAll(".cn-port")],p2=[...l2.querySelectorAll(".cn-port")];
    const at=(path,dot,t)=>{const pt=path.getPointAtLength(t*path.getTotalLength());dot.style.transform="translate("+pt.x+"px,"+pt.y+"px)";};
    const t={p:0};
    const setSt=i=>{st[i].textContent=finals[i];st[i].classList.remove("is-wait");};
    [1,2].forEach(i=>{st[i].textContent="ממתין";st[i].classList.add("is-wait");});
    gsap.set(cards,{autoAlpha:0,y:16});
    gsap.set([f1,f2],{strokeDashoffset:1});
    gsap.set([b1,b2,...p1,...p2],{autoAlpha:0});
    gsap.set(bad,{scale:0,autoAlpha:1});gsap.set(ok,{scale:0});
    const tl=gsap.timeline({scrollTrigger:{trigger:root.querySelector(".cn-row"),start:"top 78%",once:true}});
    tl.to(cards,{autoAlpha:1,y:0,duration:.55,stagger:.2,ease:"power2.out"})
      .to([b1,...p1],{autoAlpha:1,duration:.4},"-=.3")
      .set(d1,{autoAlpha:1}).set(t,{p:0})
      .to(t,{p:.47,duration:.9,ease:"power1.in",onUpdate:()=>at(f1,d1,t.p)})
      .to(bad,{scale:1,duration:.4,ease:"power3.out"},"-=.12")
      .to(t,{p:.36,duration:.3,ease:"power2.out",onUpdate:()=>at(f1,d1,t.p)},"<")
      .to(d1,{autoAlpha:0,duration:.25},">-.05")
      .to(bad,{scale:0,rotate:90,duration:.35,ease:"power2.in"},"+=.6")
      .set(d1,{autoAlpha:1}).set(t,{p:0})
      .to(f1,{strokeDashoffset:0,duration:1.1,ease:"power1.inOut"})
      .to(t,{p:1,duration:1.1,ease:"power1.inOut",onUpdate:()=>at(f1,d1,t.p)},"<")
      .to(d1,{autoAlpha:0,duration:.2})
      .to(ok,{scale:1,duration:.45,ease:"power3.out"},"<")
      .call(()=>setSt(1))
      .fromTo(st[1],{scale:.8},{scale:1,duration:.4,ease:"power3.out"},"<")
      .to([b2,...p2],{autoAlpha:1,duration:.3},"+=.2")
      .set(d2,{autoAlpha:1}).set(t,{p:0})
      .to(f2,{strokeDashoffset:0,duration:1,ease:"power1.inOut"})
      .to(t,{p:1,duration:1,ease:"power1.inOut",onUpdate:()=>at(f2,d2,t.p)},"<")
      .to(d2,{autoAlpha:0,duration:.2})
      .call(()=>setSt(2))
      .fromTo(st[2],{scale:.8},{scale:1,duration:.4,ease:"power3.out"},"<");
    return()=>{
      gsap.set([...cards,f1,f2,b1,b2,...p1,...p2,bad,ok,d1,d2,...st],{clearProps:"all"});
      st.forEach((e,i)=>{e.textContent=finals[i];e.classList.remove("is-wait");});
      layout();
    };
  });
})();`
},
{
  id:"g174", cat:"gsap", name:"פנייה שעוברת מאדם לאדם כשהזמן נגמר", tech:"GSAP · ScrollTrigger · SVG", status:"מאושר-עין",
  desc:"שלושה אנשים בשורה, ומעל כל אחד קשת מקווקוות אל הבא אחריו. עיגול קטן עם מעטפה, הפנייה, נוחת אצל הראשון, ופס הזמן שלו מתרוקן. כשהוא נגמר נכתב \"לא ענתה\", והעיגול דוהר על הקשת אל השני ומשאיר אחריו קו צבוע. אצל השלישי הפס עוצר באמצע, המעטפה הופכת לוי, וכתוב שענתה תוך שלוש דקות.",
  when:"סקשן שמראה שירות, תור או אחריות: מוקד פניות, רופא תורן, צוות מכירות, אישור בשרשרת, או כל מקום שבו דבר עובר מיד ליד לפי זמן. מתאים כשההבטחה היא שמישהו תמיד יענה. שלושה אנשים ושתי העברות לכל היותר. כשאין מגבלת זמן אמיתית עדיף להראות תהליך רגיל בשלבים.",
  note:"**שחזור.** השראה: סרטון ב-prompt-motion.com (21.10.2026) שבו אסימון בעלות עובר בין צמתים על נתיב מקווקו בזמן שפס הספירה לאחור של הצומת הראשון מתרוקן. נבנה מאפס מהצפייה. **הקשתות נמדדות:** הפונקציה `layout` מודדת את העיגולים של האנשים (`getBoundingClientRect` יחסית לשורה), כותבת `viewBox` שווה לגודל השורה ומחשבת עקומה ריבועית בין נקודות העיגון. בכל שינוי גודל היא רצה שוב (`ResizeObserver`), ולכן הקשת והעיגול נשארים מחוברים. בדסקטופ העיגון הוא אמצע הקצה העליון והקשת מתעגלת מעל. בטלפון האנשים נערמים ביניהם והקשת יוצאת מהצד, בצד שבו הקריאה נגמרת (`rtl` נקרא מהעמוד). **העיגול** נע לפי `getPointAtLength` על קו אחד, ויושב בסוף על הנקודה האחרונה, כך שהוא מחובר גם אחרי הכול. **פסי הזמן** הם `scaleX` מצד ימין (בהתאמה לכיוון הקריאה). באתר משמאל לימין הכלל `[dir=ltr]` מהפך את נקודת המוצא. **המצב הסופי** כתוב במארקאפ: שתי העברות צבועות, הפסים הראשונים ריקים, האחרון באמצע, מחלקות `is-miss` ו-`is-ans` על האנשים והעיגול על הוי. מי שאין לו GSAP או מבקש הפחתת תנועה רואה את זה. **נגישות:** הקשתות והעיגול `aria-hidden`, והמצב של כל אדם כתוב כטקסט רגיל. **ביצועים:** עיגול אחד שנע, כל השאר opacity ו-transform.",
  libs:["gsap","ScrollTrigger"],
  css:`.ho{display:grid;gap:56px;max-width:1120px;margin-inline:auto}
.ho-head{display:grid;gap:16px;max-width:44ch}
.ho-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.ho-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ho-flow{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;padding-top:72px}
.ho-svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.ho-base{fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 6;stroke-linecap:round;marker-end:url(#ho-ah)}
.ho-ah{fill:none;stroke:var(--muted);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.ho-trail{fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}
.ho-n{display:grid;justify-items:center;gap:6px;text-align:center}
.ho-av{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:var(--card);box-shadow:inset 0 0 0 2px var(--line);font-size:22px;font-weight:700;color:var(--ink)}
.ho-n.is-on .ho-av,.ho-n.is-ans .ho-av{box-shadow:inset 0 0 0 3px var(--accent)}
.ho-n b{margin-top:10px;font-size:18px;font-weight:600;line-height:1.3}
.ho-n p{margin:0;font-size:15px;color:var(--muted);line-height:1.4}
.ho-bar{width:min(100%,148px);height:6px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:10px}
.ho-fill{display:block;height:100%;border-radius:99px;background:var(--accent);transform-origin:100% 50%}
[dir="ltr"] .ho-fill{transform-origin:0 50%}
.ho-n .ho-s{min-height:24px;font-size:14px;font-weight:600;color:var(--ink)}
.ho-n.is-miss .ho-av,.ho-n.is-miss b{opacity:.6}
.ho-n.is-miss .ho-s{color:var(--muted)}
.ho-tk{position:absolute;left:0;top:0;width:34px;height:34px;pointer-events:none;visibility:hidden}
.ho.is-live .ho-tk{visibility:visible}
.ho-tk i{position:absolute;left:0;top:0;width:34px;height:34px;border-radius:50%;background:var(--accent);display:grid;place-items:center}
.ho-tk svg{grid-area:1/1;width:18px;height:18px;fill:none;stroke:var(--accent-ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ho-tk .m{opacity:0}
@media(max-width:767px){
.ho{gap:40px}
.ho-flow{grid-template-columns:minmax(0,1fr);gap:56px;padding-top:0}
}`,
  html:`<div class="stage"><div class="ho">
  <div class="ho-head">
    <h2>כל פנייה עוברת אל מי שזמין לענות</h2>
    <p>אם אף אחד לא עונה תוך חמש דקות, הפנייה עוברת אל הבא בתור, עד שמישהו מטפל בה.</p>
  </div>
  <div class="ho-flow">
    <svg class="ho-svg" aria-hidden="true" focusable="false"><defs><marker id="ho-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ho-ah" d="M1.5 1.5L8.5 5L1.5 8.5"/></marker></defs><path class="ho-base"/><path class="ho-trail" pathLength="1"/><path class="ho-base"/><path class="ho-trail" pathLength="1"/></svg>
    <div class="ho-n is-miss"><span class="ho-av" aria-hidden="true">דנ</span><b>דנה</b><p>מזכירות</p><span class="ho-bar" aria-hidden="true"><span class="ho-fill" style="transform:scaleX(0)"></span></span><span class="ho-s" data-w="הפנייה אצלה" data-f="לא ענתה">לא ענתה</span></div>
    <div class="ho-n is-miss"><span class="ho-av" aria-hidden="true">אר</span><b>אורי</b><p>מנהל תיאום</p><span class="ho-bar" aria-hidden="true"><span class="ho-fill" style="transform:scaleX(0)"></span></span><span class="ho-s" data-w="הפנייה אצלו" data-f="לא ענה">לא ענה</span></div>
    <div class="ho-n is-ans"><span class="ho-av" aria-hidden="true">מי</span><b>מיכל</b><p>בעלת העסק</p><span class="ho-bar" aria-hidden="true"><span class="ho-fill" style="transform:scaleX(.4)"></span></span><span class="ho-s" data-w="הפנייה אצלה" data-f="ענתה תוך שלוש דקות">ענתה תוך שלוש דקות</span></div>
    <span class="ho-tk" aria-hidden="true"><i><svg class="m" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M4 8l8 5.5L20 8"/></svg><svg class="k" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></i></span>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".ho");if(!root)return;
  const flow=root.querySelector(".ho-flow"),svg=root.querySelector(".ho-svg"),mq=matchMedia("(max-width:767px)");
  const nodes=[...root.querySelectorAll(".ho-n")],avs=nodes.map(n=>n.querySelector(".ho-av"));
  const bases=[...svg.querySelectorAll(".ho-base")],trails=[...svg.querySelectorAll(".ho-trail")],tk=root.querySelector(".ho-tk");
  let A=[];                                          // נקודות העיגון של האנשים, יחסית לשורה
  // מודד את העיגולים ומחשב את הקשתות מחדש, בטעינה ובכל שינוי גודל
  function layout(){
    const cr=flow.getBoundingClientRect(),v=mq.matches,rtl=getComputedStyle(root).direction==="rtl",s=rtl?-1:1;
    if(!cr.width)return;
    svg.setAttribute("viewBox","0 0 "+cr.width+" "+cr.height);
    A=avs.map(a=>{const r=a.getBoundingClientRect();return v?{x:(rtl?r.left-8:r.right+8)-cr.left,y:r.top+r.height/2-cr.top}:{x:r.left+r.width/2-cr.left,y:r.top-8-cr.top};});
    for(let i=0;i<2;i++){
      const a=A[i],b=A[i+1],d=v
        ?"M"+a.x+" "+a.y+"Q"+(a.x+s*120)+" "+(a.y+b.y)/2+" "+b.x+" "+b.y
        :"M"+a.x+" "+a.y+"Q"+(a.x+b.x)/2+" "+(Math.min(a.y,b.y)-100)+" "+b.x+" "+b.y;
      bases[i].setAttribute("d",d);trails[i].setAttribute("d",d);
    }
    root.classList.add("is-live");if(!tk._busy)place(A[2]);
  }
  function place(p){tk.style.transform="translate("+(p.x-17)+"px,"+(p.y-17)+"px)";}
  layout();new ResizeObserver(layout).observe(flow);mq.addEventListener("change",layout);
  if(typeof gsap==="undefined")return;       // בלי GSAP: שתי ההעברות צבועות והעיגול על הוי אצל השלישית
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const fills=nodes.map(n=>n.querySelector(".ho-fill")),st=nodes.map(n=>n.querySelector(".ho-s")),mail=tk.querySelector(".m"),ok=tk.querySelector(".k");
    const finalScale=[0,0,.4],tkI=tk.querySelector("i"),t={p:0,i:0};
    const setS=(i,txt,cls)=>{nodes[i].classList.remove("is-on","is-miss","is-ans");if(cls)nodes[i].classList.add(cls);st[i].textContent=txt;};
    nodes.forEach((n,i)=>{n.classList.remove("is-miss","is-ans");st[i].textContent="";});
    gsap.set(fills,{scaleX:1});gsap.set(trails,{strokeDashoffset:1});gsap.set(bases,{autoAlpha:0});
    gsap.set(mail,{opacity:1});gsap.set(ok,{opacity:0});gsap.set(nodes,{autoAlpha:0,y:16});gsap.set(tkI,{scale:0});
    tk._busy=true;place(A[0]);
    const move=(i,dur)=>{ // מעביר את העיגול על הקשת שבין אדם i לבא אחריו
      const f=trails[i],L=()=>f.getTotalLength();
      return gsap.timeline()
        .set(t,{p:0})
        .to(f,{strokeDashoffset:0,duration:dur,ease:"power1.inOut"})
        .to(t,{p:1,duration:dur,ease:"power1.inOut",onUpdate:()=>{const q=f.getPointAtLength(t.p*L());place(q);}},"<");
    };
    const tl=gsap.timeline({scrollTrigger:{trigger:flow,start:"top 78%",once:true},onComplete(){tk._busy=false;}});
    tl.to(nodes,{autoAlpha:1,y:0,duration:.55,stagger:.18,ease:"power2.out"})
      .to(bases,{autoAlpha:1,duration:.5,stagger:.15},"-=.3")
      .to(tkI,{scale:1,duration:.5,ease:"power3.out"},"+=.1")
      .call(()=>setS(0,st[0].dataset.w,"is-on"))
      .to(fills[0],{scaleX:0,duration:1.9,ease:"none"},"+=.1")
      .call(()=>setS(0,st[0].dataset.f,"is-miss"))
      .add(move(0,1))
      .call(()=>setS(1,st[1].dataset.w,"is-on"))
      .to(fills[1],{scaleX:0,duration:1.5,ease:"none"})
      .call(()=>setS(1,st[1].dataset.f,"is-miss"))
      .add(move(1,1))
      .call(()=>setS(2,st[2].dataset.w,"is-on"))
      .to(fills[2],{scaleX:finalScale[2],duration:.9,ease:"power1.out"})
      .call(()=>setS(2,st[2].dataset.f,"is-ans"))
      .to(mail,{opacity:0,duration:.25},"<")
      .to(ok,{opacity:1,duration:.25},"<")
      .fromTo(tkI,{scale:1},{scale:1.25,duration:.25,yoyo:true,repeat:1,ease:"power2.out"},"<");
    return()=>{
      tk._busy=false;
      gsap.set([...fills,...trails,...bases,...nodes,mail,ok,tkI],{clearProps:"all"});
      fills.forEach((f,i)=>{f.style.transform="scaleX("+finalScale[i]+")";});
      [["is-miss"],["is-miss"],["is-ans"]].forEach((c,i)=>setS(i,st[i].dataset.f,c[0]));
      layout();
    };
  });
})();`
},
{
  id:"g175", cat:"gsap", name:"דיאגרמת מערכת שנבנית על רשת", tech:"GSAP · ScrollTrigger · SVG", status:"מאושר-עין",
  desc:"על רקע רשת שרטוט נבנית דיאגרמה של עץ: קופסה אחת מימין, ממנה יוצאים קווים בזוויות ישרות אל שלוש קופסאות, ומכל אחת קו ישר אל כלי בקצה. הקווים מצטיירים בזה אחר זה, הקופסאות נפתחות כשהקו מגיע אליהן, ואחרי שהכול נבנה נקודות מאירות ממשיכות לרוץ לאורך המסלולים, מהשורש עד העלים.",
  when:"סקשן שמסביר איך השירות מחובר מבפנים: אתר שמזין יומן ותשלום, מוצר שמתחבר לכמה מערכות, תהליך עבודה שמתפצל לשלושה ענפים. מתאים לעסק שמוכר חיבור בין מערכות, ולמי שרוצה להראות סדר ולא רק לספר עליו. שורש אחד, שלושה ענפים ושלושה עלים. יותר מזה הופך לתרשים שאי אפשר לקרוא.",
  note:"**שחזור.** השראה: כמה סרטונים ב-prompt-motion.com (21.10.2026) שבהם דיאגרמת מערכת על רקע רשת שרטוט נבנית בעצמה: קופסאות נפתחות, קווים מצטיירים בזוויות ישרות, ונקודות רצות על הקשרים. נבנה מאפס מהצפייה. **הקווים לא נמדדים:** הקופסאות הן שורות קבועות בגריד, והקווים הם עמודות בגודל קבוע בפיקסלים בין העמודות, ולכן הם תמיד צמודים לקופסאות בכל רוחב. הפינות המעוגלות וצמתי הפיצול (`.ar-sd`) מצוירים בקואורדינטות פיקסל אחת מול אחת (גובה שורה 88, רוחב עמודה 72), בלי הקטנה אוטומטית של ה-SVG. **שתי תצורות:** בדסקטופ השורש בצד ימין והעלים בשמאל. בטלפון (`.ar-sm`) השורש למעלה, ציר אנכי בצד, וכל ענף הוא שורה של קופסה וכלי. שני סטי ה-SVG כתובים במארקאפ, ו-CSS מסתיר אחד מהם. ה-JS בונה ציר זמן רק על הסט הגלוי (`gsap.matchMedia` עם שני תנאים). **הנקודות** נעות לפי `getPointAtLength`. אחרי שהבנייה נגמרת הן רצות בלולאה, ונעצרות כשהדיאגרמה מחוץ לחלון. **כיוון:** המסלולים מתחילים מימין לשמאל, כדי להתאים לעברית. באתר משמאל לימין מהפכים את כל ה-SVG בקבצים (`transform:scaleX(-1)`) ואת סדר העמודות. **המצב הסופי** במארקאפ: כל הקווים מצוירים והקופסאות פתוחות. בלי GSAP או בהפחתת תנועה זה מה שרואים (בלי הנקודות). **נגישות:** הקווים `aria-hidden` והתוכן קופסאות עם טקסט רגיל. **ביצועים:** רק opacity, transform ו-stroke-dashoffset.",
  libs:["gsap","ScrollTrigger"],
  css:`.ar{display:grid;gap:56px;max-width:1120px;margin-inline:auto}
.ar-head{display:grid;gap:16px;max-width:44ch}
.ar-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.ar-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.ar-grid{padding:40px;border-radius:24px;border:1px solid var(--line);background-color:var(--card);background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:32px 32px;background-position:center}
.ar-tree{display:grid;grid-template-columns:minmax(0,1.1fr) 72px minmax(0,1fr) 48px minmax(0,1fr);grid-template-rows:repeat(3,88px)}
.ar-b{align-self:center;height:72px;box-sizing:border-box;padding:0 16px;display:grid;align-content:center;gap:4px;border-radius:14px;background:var(--card);border:1px solid var(--line);}
.ar-b b{font-size:16px;font-weight:600;line-height:1.3}
.ar-b span{font-size:13px;line-height:1.3;color:var(--muted)}
.ar-root{grid-column:1;grid-row:1/4;background:var(--accent);border-color:var(--accent)}
.ar-root b,.ar-root span{color:var(--accent-ink)}
.ar-sd{grid-column:2;grid-row:1/4;width:72px;height:264px;overflow:visible}
.ar-sm{display:none}
.ar-l{width:48px;height:88px;overflow:visible}
.ar-p{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:0}
.ar-a{fill:none;stroke:var(--muted);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ar-dot{fill:var(--accent);opacity:0}
.ar-m1{grid-column:3;grid-row:1}.ar-m2{grid-column:3;grid-row:2}.ar-m3{grid-column:3;grid-row:3}
.ar-l1{grid-column:4;grid-row:1}.ar-l2{grid-column:4;grid-row:2}.ar-l3{grid-column:4;grid-row:3}
.ar-f1{grid-column:5;grid-row:1}.ar-f2{grid-column:5;grid-row:2}.ar-f3{grid-column:5;grid-row:3}
.ar-m1,.ar-m2,.ar-m3,.ar-f1,.ar-f2,.ar-f3{align-self:center}
.ar-l1,.ar-l2,.ar-l3{align-self:center}
@media(max-width:767px){
.ar{gap:40px}
.ar-grid{padding:16px}
.ar-tree{grid-template-columns:16px minmax(0,1fr) 48px minmax(0,1fr);grid-template-rows:auto repeat(3,88px)}
.ar-root{grid-column:1/5;grid-row:1;justify-self:start;align-self:auto;width:min(100%,208px)}
.ar-sd{display:none}
.ar-sm{display:block;grid-column:1;grid-row:2/5;width:16px;height:264px;overflow:visible}
.ar-m1{grid-column:2;grid-row:2}.ar-m2{grid-column:2;grid-row:3}.ar-m3{grid-column:2;grid-row:4}
.ar-l1{grid-column:3;grid-row:2}.ar-l2{grid-column:3;grid-row:3}.ar-l3{grid-column:3;grid-row:4}
.ar-f1{grid-column:4;grid-row:2}.ar-f2{grid-column:4;grid-row:3}.ar-f3{grid-column:4;grid-row:4}
.ar-b{padding:0 10px}
.ar-b b{font-size:15px}
.ar-b span{font-size:12px}
}`,
  html:`<div class="stage"><div class="ar">
  <div class="ar-head">
    <h2>איך האתר של הקליניקה עובד מאחורי הקלעים</h2>
    <p>כל פעולה של מטופל באתר מגיעה למקום הנכון: ליומן של הרופא, לתיק המטופל ולהנהלת החשבונות.</p>
  </div>
  <div class="ar-grid"><div class="ar-tree">
    <div class="ar-b ar-root"><b>האתר של הקליניקה</b><span>הכניסה של המטופלים</span></div>
    <svg class="ar-sd" viewBox="0 0 72 264" aria-hidden="true" focusable="false"><path class="ar-p" pathLength="1" d="M72 132H48Q36 132 36 120V56Q36 44 24 44H0"/><path class="ar-p" pathLength="1" d="M72 132H0"/><path class="ar-p" pathLength="1" d="M72 132H48Q36 132 36 144V208Q36 220 24 220H0"/><circle class="ar-dot" r="4.5" cx="72" cy="132"/><circle class="ar-dot" r="4.5" cx="72" cy="132"/><circle class="ar-dot" r="4.5" cx="72" cy="132"/></svg>
    <svg class="ar-sm" viewBox="0 0 16 264" aria-hidden="true" focusable="false"><path class="ar-p" pathLength="1" d="M8 0V32Q8 44 0 44"/><path class="ar-p" pathLength="1" d="M8 0V120Q8 132 0 132"/><path class="ar-p" pathLength="1" d="M8 0V208Q8 220 0 220"/><circle class="ar-dot" r="4.5" cx="8" cy="0"/><circle class="ar-dot" r="4.5" cx="8" cy="0"/><circle class="ar-dot" r="4.5" cx="8" cy="0"/></svg>
    <div class="ar-b ar-m1"><b>קביעת תור</b><span>מטופל בוחר מועד</span></div>
    <svg class="ar-l ar-l1" viewBox="0 0 48 88" aria-hidden="true" focusable="false"><path class="ar-p" pathLength="1" d="M48 44H2"/><path class="ar-a" d="M9 38L3 44L9 50"/><circle class="ar-dot" r="4.5" cx="48" cy="44"/></svg>
    <div class="ar-b ar-f1"><b>יומן הרופא</b><span>התור נרשם</span></div>
    <div class="ar-b ar-m2"><b>שאלון מקדים</b><span>נשלח במייל</span></div>
    <svg class="ar-l ar-l2" viewBox="0 0 48 88" aria-hidden="true" focusable="false"><path class="ar-p" pathLength="1" d="M48 44H2"/><path class="ar-a" d="M9 38L3 44L9 50"/><circle class="ar-dot" r="4.5" cx="48" cy="44"/></svg>
    <div class="ar-b ar-f2"><b>תיק המטופל</b><span>השאלון נשמר</span></div>
    <div class="ar-b ar-m3"><b>תשלום מראש</b><span>בכרטיס אשראי</span></div>
    <svg class="ar-l ar-l3" viewBox="0 0 48 88" aria-hidden="true" focusable="false"><path class="ar-p" pathLength="1" d="M48 44H2"/><path class="ar-a" d="M9 38L3 44L9 50"/><circle class="ar-dot" r="4.5" cx="48" cy="44"/></svg>
    <div class="ar-b ar-f3"><b>הנהלת חשבונות</b><span>קבלה נשלחת</span></div>
  </div></div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".ar");if(!root)return;
  if(typeof gsap==="undefined")return;       // בלי GSAP: הדיאגרמה גמורה, בלי הנקודות
  gsap.registerPlugin(ScrollTrigger);
  const tree=root.querySelector(".ar-tree"),mm=gsap.matchMedia(),q=(s,r=root)=>[...r.querySelectorAll(s)];
  // בונה את ציר הזמן על סט הקווים הגלוי: mob = תצורת הטלפון
  const build=mob=>{
    const spine=root.querySelector(mob?".ar-sm":".ar-sd"),sp=q(".ar-p",spine),sd=q(".ar-dot",spine);
    const rb=root.querySelector(".ar-root"),mids=q(".ar-m1,.ar-m2,.ar-m3"),leaves=q(".ar-f1,.ar-f2,.ar-f3"),links=q(".ar-l");
    const lp=links.map(l=>l.querySelector(".ar-p")),la=links.map(l=>l.querySelector(".ar-a")),ld=links.map(l=>l.querySelector(".ar-dot"));
    const all=[...sp,...lp];
    gsap.set(all,{strokeDashoffset:1});gsap.set([rb,...mids,...leaves],{autoAlpha:0,y:12});gsap.set(la,{autoAlpha:0});
    const mover=(path,dot)=>{const o={p:0},L=path.getTotalLength();return gsap.timeline()
      .set(dot,{autoAlpha:1}).fromTo(o,{p:0},{p:1,duration:path===lp[0]||lp.includes(path)?.7:1.1,ease:"none",onUpdate:()=>{const pt=path.getPointAtLength(o.p*L);dot.setAttribute("cx",pt.x);dot.setAttribute("cy",pt.y);}}).set(dot,{autoAlpha:0});};
    const flow=gsap.timeline({paused:true,repeat:-1,repeatDelay:1});
    sp.forEach((p,i)=>flow.add(mover(p,sd[i]),i*.45).add(mover(lp[i],ld[i]),i*.45+1.1));
    let built=false,st=null;
    const tl=gsap.timeline({scrollTrigger:{trigger:tree,start:"top 78%",once:true},onComplete(){built=true;st=ScrollTrigger.create({trigger:tree,start:"top bottom",end:"bottom top",onToggle:s=>s.isActive?flow.play():flow.pause()});flow.play();}});
    tl.to(rb,{autoAlpha:1,y:0,duration:.5,ease:"power2.out"});
    sp.forEach((p,i)=>{
      const t0=.5+i*.35;
      tl.to(p,{strokeDashoffset:0,duration:.8,ease:"power1.inOut"},t0)
        .to(mids[i],{autoAlpha:1,y:0,duration:.4,ease:"power2.out"},t0+.7)
        .to(lp[i],{strokeDashoffset:0,duration:.5,ease:"power1.inOut"},t0+1)
        .to(la[i],{autoAlpha:1,duration:.2},t0+1.4)
        .to(leaves[i],{autoAlpha:1,y:0,duration:.4,ease:"power2.out"},t0+1.4);
    });
    return()=>{flow.kill();if(st)st.kill();gsap.set([...all,rb,...mids,...leaves,...la,...sd,...ld],{clearProps:"all"});};
  };
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)",()=>build(false));
  mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)",()=>build(true));
})();`
},
{
  id:"g176", cat:"gsap", name:"איור שמצטייר, נצבע ומקבל הערות", tech:"GSAP · ScrollTrigger scrub · SVG", status:"מאושר-עין",
  desc:"איור קווי של צמח עם שורשים באדמה, ענן וטיפות מצטייר קו אחרי קו כמו ביד, כשהגלילה מזיזה אותו. כשהקווים נגמרים הצבע נכנס לעלים, לעלי הכותרת ולאדמה, ואז צצות ארבע הערות קצרות ליד החלקים, וכל מילה בשורת הכיתוב למטה נדלקת בתורה עד שהמשפט מלא.",
  when:"סקשן הסבר שמלמד רעיון אחד דרך תמונה: איך תוכן מצטבר לפניות, איך לקוח קטן הופך לקבוע, איך תהליך מתחיל בבסיס ונגמר בתוצאה. מתאים כשיש משפט אחד שאפשר להמחיש בציור פשוט, וארבע הערות לכל היותר. איור שצריך שמונה הערות כבר מתאים יותר לדיאגרמה.",
  note:"**שחזור.** השראה: כמה סרטוני explainer ב-prompt-motion.com (21.10.2026) שבהם איור קווי של צמח, שורשים וטיפות מצטייר פס אחרי פס, נצבע, ואחריו מופיעות הערות כתובות ליד חלקיו ושורת כיתוב שמילותיה נדלקות. נבנה מאפס מהצפייה. **מבנה:** ה-SVG נבנה בזמן הבנייה מרשימות נתיבים (בראש הקובץ, `il*`). כל צורה סגורה נכתבת פעמיים: נתיב מילוי (`.il-f`, מונפש ב-opacity) ונתיב קו (`.il-s`, `pathLength=1` ו-`stroke-dashoffset`), כך שהצבע והקו נפרדים בלי להניע תכונות שאינן opacity. **אחד ScrollTrigger עם scrub** על שורש הסקשן (`start:top 75%`, `end:bottom 45%`), וציר זמן אחד: אדמה, שורשים, גזע, עלים, פרח, ענן וטיפות, ואז מילויים, קווי הנחיה, הערות, ובמקביל המילים נדלקות באופן אחיד לאורך כל הציור. **ההערות** הן `ul` של HTML ממוקם באחוזים מעל ה-SVG (`--x`,`--y` לפי ה-viewBox), בקו תחתון גלי כתחושת כתב יד, ולכן נשארות בקריאות ובתוכן הנגיש. אפשר להחליף את האיור בכל SVG אחר: כל קבוצה מקבלת `data-g`, וה-JS מסדר אותן לפי שם הקבוצה. **המצב הסופי** במארקאפ: איור צבוע, ארבע הערות והמשפט מלא. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כיוון:** האיור עצמו אינו מתהפך. ב-LTR מחליפים את `grid-template-areas` כך שהטקסט משמאל, ובטקסטי ההערות את הכיוון. **ביצועים:** opacity, transform ו-stroke-dashoffset בלבד, וה-ScrollTrigger נהרג בניקוי. **נגישות:** ה-SVG `aria-hidden`, ההערות והכיתוב טקסט רגיל.",
  libs:["gsap","ScrollTrigger"],
  css:`.il{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);grid-template-areas:"head fig" "cap fig";gap:32px 72px;max-width:1120px;margin-inline:auto}
.il-head{grid-area:head;align-self:end}
.il-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.il-cap{grid-area:cap;align-self:start;margin:0;max-width:30ch;font-size:clamp(20px,2vw,28px);font-weight:600;line-height:1.45}
.il-fig{grid-area:fig;margin:0;position:relative}
.il-svg{display:block;width:100%;height:auto;overflow:visible}
.il-f{stroke:none}
.il-f[data-g="soil"]{fill:color-mix(in srgb,var(--muted) 16%,var(--card))}
.il-f[data-g="leaves"]{fill:color-mix(in srgb,var(--accent) 34%,var(--card))}
.il-f[data-g="petals"]{fill:var(--accent)}
.il-f[data-g="core"]{fill:var(--ink)}
.il-f[data-g="cloud"]{fill:color-mix(in srgb,var(--muted) 14%,var(--card))}
.il-f[data-g="rain"]{fill:color-mix(in srgb,var(--accent) 24%,var(--card))}
.il-s{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:0}
.il-ld{fill:none;stroke:var(--muted);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}
.il-labs{list-style:none;margin:0;padding:0}
.il-labs li{position:absolute;left:var(--x);top:var(--y);transform:translateY(-50%)}
.il-labs span{display:block;font-size:clamp(14px,1.3vw,18px);font-weight:600;line-height:1.3;white-space:nowrap;transform:rotate(-3deg);text-decoration:underline wavy var(--accent);text-decoration-thickness:1.5px;text-underline-offset:4px}
@media(max-width:767px){
.il{grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "fig" "cap";gap:24px}
.il-cap{max-width:none}
.il-labs span{font-size:13px}
}`,
  html:`<div class="stage"><div class="il">
  <div class="il-head"><h2>איך אתר של עסק קטן צומח עם הזמן</h2></div>
  <figure class="il-fig">
    <svg class="il-svg" viewBox="0 0 520 400" aria-hidden="true" focusable="false">
      <g>
      ${ilFills}
      </g>
      <g>
      ${ilLines}
      </g>
      <g>
      ${ilLeads}
      </g>
    </svg>
    <ul class="il-labs">
      <li style="--x:65%;--y:17.5%"><span>פניות חדשות</span></li>
      <li style="--x:67.3%;--y:37.5%"><span>עמודי שירות</span></li>
      <li style="--x:64.6%;--y:74%"><span>תוכן קיים</span></li>
      <li style="--x:4.6%;--y:49%"><span>מאמר שבועי</span></li>
    </ul>
  </figure>
  <p class="il-cap">${ilCap}</p>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".il");if(!root)return;
  if(typeof gsap==="undefined")return;       // בלי GSAP: האיור צבוע, ההערות והמשפט מלאים
  gsap.registerPlugin(ScrollTrigger);
  const q=s=>[...root.querySelectorAll(s)],mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const g=n=>q('.il-s[data-g="'+n+'"]'),f=n=>q('.il-f[data-g="'+n+'"]');
    const lines=q(".il-s"),fills=q(".il-f"),leads=q(".il-ld"),labs=q(".il-labs span"),words=q(".il-cap span");
    gsap.set([...lines,...leads],{strokeDashoffset:1});
    gsap.set(fills,{autoAlpha:0});
    gsap.set(words,{opacity:.22});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root,start:"top 75%",end:"bottom 45%",scrub:.6}});
    const draw=(els,at,each,gap)=>els.forEach((el,i)=>tl.to(el,{strokeDashoffset:0,duration:each},at+i*gap));
    const fade=(els,at,each,gap)=>els.forEach((el,i)=>tl.to(el,{autoAlpha:1,duration:each},at+i*gap));
    draw(g("soil"),0,1.2,0);
    draw(g("roots"),1,.9,.25);
    draw(g("stem"),3,1,0);
    draw(g("leaves"),3.8,.6,.25);
    draw([...g("petals"),...g("core")],5,.5,.15);
    draw(g("cloud"),5.6,.8,0);
    draw(g("rain"),6.2,.5,.2);
    fade(f("soil"),6.6,.8,0);
    fade(f("leaves"),6.9,.6,.2);
    fade(f("petals"),7.4,.5,.1);
    fade(f("core"),7.9,.4,0);
    fade(f("cloud"),7.8,.6,0);
    fade(f("rain"),7.9,.5,.15);
    draw(leads,8,.3,.4);
    labs.forEach((el,i)=>tl.fromTo(el,{autoAlpha:0,scale:.8,rotation:-9},{autoAlpha:1,scale:1,rotation:-3,duration:.4,ease:"power3.out"},8.3+i*.4));
    tl.to(words,{opacity:1,duration:.4,stagger:{each:9.4/(words.length-1)}},1);
    return()=>{if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();gsap.set([...lines,...leads,...fills,...labs,...words],{clearProps:"all"});};
  });
})();`
},
{
  id:"g177", cat:"gsap", name:"שדה צמתים עם חריג מסומן", tech:"GSAP · ScrollTrigger · SVG", status:"ממתין",
  desc:"על לוח כהה ארבעה מרכזים בצבעים שונים, וסביב כל אחד הילה של נקודות. קווים דקים נמתחים בין המרכזים ובין כל מרכז לנקודות שלו, הנקודות צצות אחת אחת, וההילות מתחילות להסתובב לאט. אחרי שהרשת נבנתה צומח חשבון בודד בצד, מחובר בקו חיוור, עם טבעת שפועמת ותווית שמסמנת אותו כחריג.",
  when:"סקשן על קהילה, רשת הפניות, שותפים או נתונים שמראים קבוצות ומי שיוצא מהן: זיהוי חשבון חשוד, לקוח שמביא יותר מכולם, קבוצה שלא מתחברת לשאר. מתאים כשיש ארבע קבוצות לכל היותר ופריט אחד שצריך לסמן. אם צריך להציג עשרות קבוצות, רשת כזו הופכת לצבע בלי משמעות.",
  note:"**שחזור.** השראה: כמה סרטוני דאטה ב-prompt-motion.com (21.10.2026) שבהם שדה של נקודות על רקע כהה, עם מרכזים צבעוניים שסביבם הילת נקודות, קווי חיבור דקים, וצומת אחד מוקף בטבעת ומסומן כחשוד. נבנה מאפס מהצפייה. **הנקודות** נוצרות בזמן הבנייה במחולל אקראי עם זרע קבוע (בראש הקובץ, `nl*`), כך שהמארקאפ זהה בכל פעם. כל מרכז הוא `g.nl-hub`, וההילה שלו `g.nl-halo` עם קווי הדק שמגיעים למרכז. **סיבוב ההילות** הוא `rotation` עם `svgOrigin` במרכז, ולכן הקווים נשארים צמודים למרכז ואף קו אינו נמדד מחדש. המרכזים והקווים ביניהם קבועים. **ScrollTrigger אחד** על הלוח: `onEnter` מפעיל את ציר הבנייה (פעם אחת), ו-`onToggle` מפעיל ועוצר את הסיבוב לפי מה שרואים. **החריג**: קו חיוור לשני מרכזים, נקודה בהירה, טבעת סטטית וטבעת שנייה שפועמת בלולאה (רק בזמן שהלוח בחלון), ותווית ממוקמת באחוזים. **צבעים**: ארבע קבוצות מהטוקנים (`--accent`, `--bg`, `--muted` ותערובת של שניהם) על `--ink`. אם הלוח צריך להיות בהיר, מחליפים את `--ink` ו-`--bg` ביניהם. **המצב הסופי** במארקאפ: הרשת גמורה, החריג מסומן וההילות עומדות. בלי GSAP או בהפחתת תנועה זה מה שרואים. **כיוון:** הלוח סימטרי ואינו תלוי בכיוון, ובעמודה הצדדית בלבד מחליפים צד. **ביצועים:** transform, opacity ו-stroke-dashoffset, וניקוי מלא ב-`matchMedia`. **נגישות:** ה-SVG `aria-hidden`, מקרא הקבוצות והתווית של החריג הם טקסט רגיל.",
  libs:["gsap","ScrollTrigger"],
  css:`.nl{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:72px;align-items:center;max-width:1120px;margin-inline:auto}
.nl-copy{display:grid;gap:16px}
.nl-copy h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.nl-copy p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6;max-width:40ch}
.nl-panel{position:relative;padding:24px;border-radius:24px;background:var(--ink);color:var(--bg)}
.nl-fig{position:relative;margin:0}
.nl-svg{display:block;width:100%;height:auto;overflow:visible}
.nl-a{--c:var(--accent)}
.nl-b{--c:var(--bg)}
.nl-c{--c:var(--muted)}
.nl-d{--c:color-mix(in srgb,var(--accent) 45%,var(--bg))}
.nl-lk{stroke:var(--bg);stroke-opacity:.38;stroke-width:1.5;stroke-dasharray:1;stroke-dashoffset:0}
.nl-sp{stroke:var(--c);stroke-opacity:.3;stroke-width:1;stroke-dasharray:1;stroke-dashoffset:0}
.nl-dot{fill:var(--c);fill-opacity:.9}
.nl-loose{fill:var(--bg);fill-opacity:.3}
.nl-hh{fill:none;stroke:var(--c);stroke-opacity:.4;stroke-width:1.5}
.nl-hc{fill:var(--c)}
.nl-ol{stroke:var(--bg);stroke-opacity:.5;stroke-width:1.5;stroke-dasharray:1;stroke-dashoffset:0}
.nl-oc{fill:var(--bg)}
.nl-ring{fill:none;stroke:var(--accent);stroke-width:2.5}
.nl-pulse{fill:none;stroke:var(--accent);stroke-width:2;opacity:0}
.nl-flagpos{position:absolute;left:52.1%;top:82.5%;transform:translateX(-50%)}
.nl-flag{display:grid;gap:4px;padding:8px 14px;border-radius:12px;background:var(--accent);color:var(--accent-ink);text-align:center;white-space:nowrap}
.nl-flag b{font-size:14px;font-weight:700;line-height:1.2}
.nl-flag span{font-size:12px;line-height:1.2}
.nl-key{display:flex;flex-wrap:wrap;gap:12px 20px;list-style:none;margin:20px 0 0;padding:0;font-size:13px;color:var(--bg)}
.nl-key li{display:flex;align-items:center}
.nl-key li::before{content:"";width:10px;height:10px;border-radius:50%;background:var(--c);margin-inline-end:8px}
@media(max-width:767px){
.nl{grid-template-columns:minmax(0,1fr);gap:32px}
.nl-panel{padding:16px}
.nl-flag{padding:6px 12px}
.nl-flag b{font-size:12px}
.nl-flag span{font-size:11px}
.nl-key{gap:8px 16px;font-size:12px}
}`,
  html:`<div class="stage"><div class="nl">
  <div class="nl-copy">
    <h2>המערכת מסמנת חשבון שמביא הפניות בצורה חריגה</h2>
    <p>לקוחות מארבע קבוצות מביאים חברים בקצב רגיל. חשבון אחד קפץ ל-38 הפניות בלילה אחד, והוא ממתין עכשיו לבדיקה.</p>
  </div>
  <div class="nl-panel">
    <figure class="nl-fig">
      <svg class="nl-svg" viewBox="0 0 560 480" aria-hidden="true" focusable="false">
        <g>
      ${nlLinks}
        </g>
        <g>
      ${nlHalos}
        </g>
        <g>${nlLooseSvg}</g>
        <g>${nlOutLinks}</g>
        <g>
      ${nlHubSvg}
        </g>
        <g class="nl-out" data-cx="${NL_OUT.x}" data-cy="${NL_OUT.y}">
          <circle class="nl-pulse" cx="${NL_OUT.x}" cy="${NL_OUT.y}" r="14"/>
          <circle class="nl-ring" cx="${NL_OUT.x}" cy="${NL_OUT.y}" r="14"/>
          <circle class="nl-oc" cx="${NL_OUT.x}" cy="${NL_OUT.y}" r="6"/>
        </g>
      </svg>
      <div class="nl-flagpos"><div class="nl-flag"><b>חשבון חריג</b><span>38 הפניות בלילה אחד</span></div></div>
    </figure>
    <ul class="nl-key">
      <li class="nl-a">מפה לאוזן</li>
      <li class="nl-b">מהאתר</li>
      <li class="nl-c">שותפים</li>
      <li class="nl-d">אירועים</li>
    </ul>
  </div>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".nl");if(!root)return;
  if(typeof gsap==="undefined")return;       // בלי GSAP: הרשת גמורה, החריג מסומן וההילות עומדות
  gsap.registerPlugin(ScrollTrigger);
  const q=s=>[...root.querySelectorAll(s)],mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const hubs=q(".nl-hub"),links=q(".nl-lk"),halos=q(".nl-halo"),spokes=q(".nl-sp"),dots=q(".nl-dot"),loose=q(".nl-loose"),ol=q(".nl-ol"),
          out=root.querySelector(".nl-oc"),ring=root.querySelector(".nl-ring"),pulse=root.querySelector(".nl-pulse"),flag=root.querySelector(".nl-flag");
    const at=(el)=>(el.dataset.cx||el.getAttribute("cx"))+" "+(el.dataset.cy||el.getAttribute("cy"));
    const outO=root.querySelector(".nl-out").dataset.cx+" "+root.querySelector(".nl-out").dataset.cy;
    gsap.set(hubs,{scale:0,svgOrigin:(i,el)=>at(el)});
    gsap.set(dots,{scale:0,svgOrigin:(i,el)=>at(el)});
    gsap.set(out,{scale:0,svgOrigin:outO});
    gsap.set([...links,...spokes,...ol],{strokeDashoffset:1});
    gsap.set(loose,{opacity:0});
    gsap.set(ring,{opacity:0});
    gsap.set(flag,{autoAlpha:0,y:8});
    const ringPulse=gsap.fromTo(pulse,{scale:1,opacity:.9,svgOrigin:outO},{scale:2.6,opacity:0,duration:1.6,ease:"power1.out",repeat:-1,paused:true});
    const drift=halos.map((h,i)=>gsap.to(h,{rotation:i%2?360:-360,svgOrigin:h.dataset.hx+" "+h.dataset.hy,duration:90+i*14,ease:"none",repeat:-1,paused:true}));
    const tl=gsap.timeline({paused:true});
    tl.to(hubs,{scale:1,duration:.5,ease:"power3.out",stagger:.12},0)
      .to(links,{strokeDashoffset:0,duration:.8,ease:"power1.inOut",stagger:.12},.4)
      .to(spokes,{strokeDashoffset:0,duration:.6,ease:"power1.out",stagger:{each:.02,from:"random"}},.9)
      .to(dots,{scale:1,duration:.4,ease:"power3.out",stagger:{each:.02,from:"random"}},1)
      .to(loose,{opacity:1,duration:.6,stagger:.04},1.6)
      .to(ol,{strokeDashoffset:0,duration:.6,ease:"power1.inOut",stagger:.15},2.4)
      .to(out,{scale:1,duration:.4,ease:"power3.out"},2.9)
      .to(ring,{opacity:1,duration:.3},3)
      .to(flag,{autoAlpha:1,y:0,duration:.4,ease:"power2.out"},3.1)
      .add(()=>ringPulse.play(),3.1);
    const st=ScrollTrigger.create({trigger:root.querySelector(".nl-panel"),start:"top 75%",end:"bottom top",
      onEnter:()=>tl.play(),
      onToggle:s=>{drift.forEach(t=>s.isActive?t.play():t.pause());if(tl.progress()===1)s.isActive?ringPulse.play():ringPulse.pause();}});
    return()=>{st.kill();tl.kill();ringPulse.kill();drift.forEach(t=>t.kill());
      gsap.set([...hubs,...dots,...halos,out,ring,pulse,flag,...links,...spokes,...ol,...loose],{clearProps:"all"});};
  });
})();`
},
{
  id:"g178", cat:"gsap", name:"קשתות שמחברות מילים קשורות במשפט", tech:"GSAP · ScrollTrigger scrub · SVG", status:"ממתין",
  desc:"משפט אחד מוצג בכותרת גדולה, ומתחת לכל מילה פס קצר. תוך כדי גלילה קשתות דקות ואפורות נמתחות מעל המשפט בין זוגות מילים קשורות, ואז קשת אחת עבה וצבעונית נמתחת מהמילה אותה אל ההצעה שהיא מתייחסת אליה, והפס מתחת להצעה מתארך וצובע. בטלפון המשפט נערם אנכית והקשתות עוברות לפס צד.",
  when:"סקשן הסבר ליכולת שקוראת טקסט: תשובות אוטומטיות, סיכום שיחות, סינון פניות, תרגום, תיוג. מתאים כשיש משפט אמיתי אחד מתוך הלקוחות של העסק, בין שמונה לעשר מילים, ואפשר להראות באמצעותו מה המערכת הבינה. לא מתאים לפסקאות ארוכות.",
  note:"**שחזור.** השראה: כמה סרטוני הסבר ב-prompt-motion.com (21.10.2026) שבהם משפט בכתב כבד עם פס קטן מתחת לכל מילה, קשתות דקות מעליו בין מילים קשורות, וקשת אחת שהופכת עבה וצבעונית כדי לחבר כינוי לשם העצם שלו. נבנה מאפס מהצפייה. **המדידה:** `layout()` מודד את מרכז כל מילה (`getBoundingClientRect` יחסית לקופסה), קובע `viewBox` לגודל הקופסה בפיקסלים, וכותב את `d` של כל קשת ומיקום כל נקודת עוגן. הוא רץ לפני בדיקת ה-GSAP, ולכן בלי GSAP הקשתות והפסים מוצגים, וגם אחרי שינוי גודל, טעינת פונט ושינוי מצב (`ResizeObserver` ו-`document.fonts.ready`). **שני מצבים:** בדסקטופ השורה אחת, והקשתות מעל המילים עם גובה לפי המרחק (עד 80). בטלפון (`max-width:767px`) המילים בעמודה, בפס צד מימין לכל מילה נקודת עוגן, והקשתות מתנפחות הצידה. כל הקשת מצוירת בפיקסלים ולא מתכווצת. **הגלילה:** ScrollTrigger אחד עם scrub על הקופסה, וציר זמן של 10 יחידות: המילים נדלקות, הקשתות הדקות נמתחות (dashoffset), הקשת העבה נמתחת, ואז הפס של שם העצם מתארך והפס של הכינוי מתארך חלקית (scaleX ו-opacity של שכבת צבע). **לשינוי:** מחליפים את `AW_WORDS` ואת `AW_PAIRS`/`AW_ACT` (אינדקסים של מילים) בראש הקובץ, ובמארקאפ של הקשתות `data-a` ו-`data-b`. **המצב הסופי** מוצג: כל הקשתות, הקשת העבה והפסים. **כיוון:** המילה הראשונה בצד ימין. לאתר LTR הקשתות בדסקטופ עובדות כמות שהן, כי המדידה לפי מיקום בפועל. בטלפון ה-`padding-inline-start` מתהפך לבד, ובתוך `layout()` מחליפים את `w-40` ב-`40` ואת `A.x+hh*2` ב-`A.x-hh*2`, כדי שפס הצד יעבור לשמאל. **נגישות:** ה-SVG `aria-hidden`, והמשפט טקסט רגיל. **ביצועים:** dashoffset, opacity ו-transform בלבד, וניקוי מלא.",
  libs:["gsap","ScrollTrigger"],
  css:`.aw{display:grid;gap:56px;max-width:1120px;margin-inline:auto}
.aw-head{display:grid;gap:16px;max-width:48ch}
.aw-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.aw-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6}
.aw-box{position:relative;padding-top:96px}
.aw-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.aw-t{fill:none;stroke:var(--muted);stroke-opacity:.55;stroke-width:1.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}
.aw-h{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}
.aw-d{fill:var(--muted);fill-opacity:.7}
.aw-d.is-hot{fill:var(--accent);fill-opacity:1}
.aw-sent{position:relative;margin:0;display:flex;flex-wrap:nowrap;gap:12px;font-size:clamp(20px,calc((min(100vw,1168px) - 48px)/28),44px);font-weight:800;line-height:1.15;letter-spacing:-.02em}
.aw-w{position:relative;display:block;padding-bottom:16px;white-space:nowrap}
.aw-w b{font-weight:inherit}
.aw-bar{position:absolute;inset-inline:0;bottom:0;height:4px;border-radius:2px;background:color-mix(in srgb,var(--muted) 45%,transparent);transform:scaleX(.22);transform-origin:right}
.aw-bar u{position:absolute;inset:0;border-radius:inherit;background:var(--accent);opacity:0}
.aw-w.is-n .aw-bar{transform:none}
.aw-w.is-p .aw-bar{transform:scaleX(.6)}
.aw-w.is-n .aw-bar u,.aw-w.is-p .aw-bar u{opacity:1}
@media(max-width:767px){
.aw{gap:40px}
.aw-box{padding-top:0;padding-inline-start:48px}
.aw-sent{flex-direction:column;align-items:flex-start;gap:12px;font-size:24px}
}`,
  html:`<div class="stage"><div class="aw">
  <div class="aw-head">
    <h2>המערכת מבינה למה מתייחסת כל מילה</h2>
    <p>בהודעה של לקוח, המילה אותה מחזירה אל ההצעה. כך התשובה האוטומטית עונה על ההצעה הנכונה ולא על משהו אחר.</p>
  </div>
  <div class="aw-box">
    <svg class="aw-svg" aria-hidden="true" focusable="false">${awSvg}</svg>
    <p class="aw-sent">
      ${awWordsHtml}
    </p>
  </div>
</div></div>`,
  js:`(function(){
  const box=document.querySelector(".aw-box");if(!box)return;
  const svg=box.querySelector(".aw-svg"),words=[...box.querySelectorAll(".aw-w")],
        arcs=[...svg.querySelectorAll(".aw-t,.aw-h")],dots=[...svg.querySelectorAll(".aw-d")],
        mq=matchMedia("(max-width:767px)");
  const num=v=>Math.round(v*10)/10;
  // מודד את מרכז כל מילה וכותב את הקשתות. רץ גם בלי GSAP, ובכל שינוי גודל
  function layout(){
    const cb=box.getBoundingClientRect(),w=cb.width,h=cb.height,mob=mq.matches;
    svg.setAttribute("viewBox","0 0 "+num(w)+" "+num(h));
    const P=words.map(el=>{const r=el.querySelector("b").getBoundingClientRect();
      return mob?{x:w-40,y:r.top-cb.top+r.height/2}:{x:r.left-cb.left+r.width/2,y:r.top-cb.top-8};});
    dots.forEach(d=>{const p=P[+d.dataset.i];d.setAttribute("cx",num(p.x));d.setAttribute("cy",num(p.y));});
    arcs.forEach(a=>{const A=P[+a.dataset.a],B=P[+a.dataset.b];
      if(mob){const hh=Math.min(32,8+Math.abs(A.y-B.y)*.12);a.setAttribute("d","M"+num(A.x)+" "+num(A.y)+" Q"+num(A.x+hh*2)+" "+num((A.y+B.y)/2)+" "+num(B.x)+" "+num(B.y));}
      else{const hh=Math.min(80,18+Math.abs(A.x-B.x)*.28);a.setAttribute("d","M"+num(A.x)+" "+num(A.y)+" Q"+num((A.x+B.x)/2)+" "+num(A.y-hh*2)+" "+num(B.x)+" "+num(B.y));}});
  }
  layout();
  if(window.ResizeObserver)new ResizeObserver(layout).observe(box);else addEventListener("resize",layout);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
  if(typeof gsap==="undefined")return;       // בלי GSAP: הקשתות והפסים מוצגים כבר במצב הסופי
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const wd=words.map(w=>w.querySelector("b")),bars=words.map(w=>w.querySelector(".aw-bar")),
          thin=arcs.filter(a=>a.classList.contains("aw-t")),hot=svg.querySelector(".aw-h"),
          soft=dots.filter(d=>!d.classList.contains("is-hot")),hotDots=dots.filter(d=>d.classList.contains("is-hot")),
          noun=box.querySelector(".is-n .aw-bar"),pron=box.querySelector(".is-p .aw-bar"),fills=[noun,pron].map(b=>b.querySelector("u"));
    gsap.set(wd,{opacity:.3});
    gsap.set([...thin,hot],{strokeDashoffset:1});
    gsap.set(dots,{opacity:0});
    gsap.set(bars,{scaleX:.22});
    gsap.set(fills,{opacity:0});
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:box,start:"top 75%",end:"bottom 35%",scrub:.6,invalidateOnRefresh:true}});
    tl.to(wd,{opacity:1,duration:.6,stagger:.15},0)
      .to(thin,{strokeDashoffset:0,duration:.6,stagger:.3},1.5)
      .to(soft,{opacity:1,duration:.3,stagger:.25},1.5)
      .to(hot,{strokeDashoffset:0,duration:2},4.5)
      .to(hotDots,{opacity:1,duration:.3,stagger:1.7},4.5)
      .to(noun,{scaleX:1,duration:2},6.5)
      .to(pron,{scaleX:.6,duration:1.5},6.5)
      .to(fills,{opacity:1,duration:1.5},6.5)
      .to({},{duration:1.5},8.5);
    return()=>{if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();gsap.set([...wd,...thin,hot,...dots,...bars,...fills],{clearProps:"all"});};
  });
})();`
},
{
  id:"g179", cat:"gsap", name:"מכ\"ם שמגלה צמתים ומסמן אחד", tech:"GSAP · ScrollTrigger · SVG + conic-gradient", status:"מאושר-עין",
  desc:"נקודה אחת במרכז נפתחת לארבע טבעות, ומסביב מתפזרות נקודות קטנות. אחר כך קונוס שקוף מסתובב סביב המרכז כמו מחוג מכ\"ם, וכל אדם שהוא עובר עליו נדלק, מקבל גל קטן ותווית עם שם ותחום. בסוף נבחר אחד מהם, הנקודה שלו מוקפת בטבעת, והוא עף החוצה וגדל לכרטיס עם הסיבה שנבחר.",
  when:"סקשן על גילוי, סריקה או ניטור: לידים שמחכים לשיחה, פניות שדורשות מענה, לקוחות בסיכון, מקורות חדשים לקידום. מתאים כשיש בין שמונה לשתים עשרה תוויות אמיתיות ותוצאה אחת ברורה שצריך להציג כיעד. סריקה בלי תוצאה נבחרת מרגישה כמו קישוט.",
  note:"**שחזור.** השראה: כמה סרטוני גילוי ב-prompt-motion.com (21.10.2026) שבהם נקודה נפתחת לטבעות מרוכזות עם נקודות מפוזרות, קונוס שקוף מסתובב כמו מכ\"ם, כל צומת שהוא עובר נדלק ומציג תווית, ובסוף אחד מהם גדל לכרטיס. נבנה מאפס מהצפייה. **הקונוס** הוא `div` עגול עם `conic-gradient` (זנב שקוף שמסתיים בקו קצה עבה) ו-`rotation` ב-GSAP, מ-0 עד 360 בקצב קבוע. **ההדלקה לפי זווית:** לכל צומת `data-a` (בדרגות, בכיוון השעון מהחלק העליון), והשעה שבה הוא נדלק מחושבת מראש מהזווית, כך שהצומת נדלק בדיוק כשקצה הקונוס עובר בו ובלי `onUpdate`. ההדלקה היא שלוש שכבות: נקודה אפורה, נקודה בצבע המבטא שצצה מעליה (`b`), וטבעת גל שמתרחבת פעם אחת (`u`). **הכרטיס** עף מהצומת אל מקומו הקבוע (`x`,`y` נמדדים בזמן ההפעלה ולכן נכונים בכל רוחב) ומתנפח מ-12% ל-100%. **ScrollTrigger אחד**, פעם אחת (`once`). **המצב הסופי** במארקאפ: כל הצמתים דולקים עם תוויות, הצומת הנבחר מוקף בטבעת, והכרטיס במקומו. הקונוס מוסתר במצב הסופי. **מובייל:** התוויות מתקצרות לשם פרטי בלבד (`s` מוסתר), והכרטיס יורד מתחת למכ\"ם. **כיוון:** המכ\"ם עצמו אינו תלוי בכיוון (הקונוס מסתובב עם כיוון השעון), ובעמודה הצדדית בלבד מחליפים צד ב-`grid-template-areas`. **נגישות:** השכבות הגרפיות `aria-hidden`, הצמתים והתוויות רשימה רגילה והכרטיס טקסט. **ביצועים:** transform ו-opacity, ללא קנבס.",
  libs:["gsap","ScrollTrigger"],
  css:`.rd{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);grid-template-areas:"head field" "card field";gap:32px 72px;align-items:center;max-width:1120px;margin-inline:auto}
.rd-head{grid-area:head;display:grid;gap:16px;align-self:end}
.rd-head h2{margin:0;font-size:clamp(30px,3.4vw,52px);font-weight:700;line-height:1.1;letter-spacing:-.01em;text-wrap:balance}
.rd-head p{margin:0;color:var(--muted);font-size:var(--fs-body);line-height:1.6;max-width:44ch}
.rd-field{grid-area:field;position:relative;width:100%;max-width:520px;aspect-ratio:1;justify-self:center;border-radius:50%;border:1px solid var(--line);background:color-mix(in srgb,var(--accent) 5%,var(--card))}
.rd-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.rd-ring{fill:none;stroke:var(--muted);stroke-opacity:.35;stroke-width:1}
.rd-cross{stroke:var(--muted);stroke-opacity:.18;stroke-width:1}
.rd-s{fill:var(--muted);fill-opacity:.5}
.rd-core{fill:var(--accent)}
.rd-sweep{position:absolute;inset:0;border-radius:50%;opacity:0;background:conic-gradient(from 0deg at 50% 50%,transparent 0deg 270deg,color-mix(in srgb,var(--accent) 34%,transparent) 360deg)}
.rd-sweep::after{content:"";position:absolute;left:50%;top:0;width:2px;height:50%;background:var(--accent);translate:-50% 0}
.rd-nodes{list-style:none;margin:0;padding:0;position:absolute;inset:0}
.rd-n{position:absolute;left:var(--x);top:var(--y);width:0;height:0}
.rd-n i,.rd-n b,.rd-n u{position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;translate:-50% -50%}
.rd-n i{background:var(--muted);opacity:.7}
.rd-n b{background:var(--accent)}
.rd-n u{border:2px solid var(--accent);opacity:0}
.rd-n em{display:none;position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;border:2px solid var(--accent);translate:-50% -50%}
.rd-n.is-sel em{display:block}
.rd-n span{position:absolute;left:0;top:12px;translate:-50% 0;white-space:nowrap;font-size:12px;font-weight:600;line-height:1.3}
.rd-n s{text-decoration:none;font-weight:400;color:var(--muted)}
.rd-card{grid-area:card;align-self:start;display:grid;gap:12px;padding:20px;border-radius:20px;background:var(--card);border:1px solid var(--line);max-width:380px;box-shadow:0 12px 32px color-mix(in srgb,var(--ink) 10%,transparent)}
.rd-who{display:flex;align-items:center;gap:12px}
.rd-av{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:15px}
.rd-who b{display:block;font-size:17px;font-weight:700;line-height:1.3}
.rd-who span{display:block;font-size:14px;color:var(--muted);line-height:1.3}
.rd-card p{margin:0;font-size:15px;line-height:1.55}
.rd-card em{justify-self:start;font-style:normal;font-size:13px;font-weight:600;padding:6px 12px;border-radius:999px;background:color-mix(in srgb,var(--accent) 14%,var(--card))}
@media(max-width:767px){
.rd{grid-template-columns:minmax(0,1fr);grid-template-areas:"head" "field" "card";gap:32px}
.rd-n span{font-size:11px}
.rd-n s{display:none}
.rd-card{max-width:none}
}`,
  html:`<div class="stage"><div class="rd">
  <div class="rd-head">
    <h2>המערכת סורקת ומוצאת מי מחכה לשיחה</h2>
    <p>כל נקודה היא אדם שביקר באתר או כתב הודעה בשבוע האחרון. הסריקה מסמנת מי מהם מתאים לשיחה, ומציגה את המתאים ביותר בכרטיס אחד.</p>
  </div>
  <div class="rd-field">
    <svg class="rd-svg" viewBox="0 0 520 520" aria-hidden="true" focusable="false">
      <circle class="rd-ring" cx="260" cy="260" r="60"/>
      <circle class="rd-ring" cx="260" cy="260" r="120"/>
      <circle class="rd-ring" cx="260" cy="260" r="180"/>
      <circle class="rd-ring" cx="260" cy="260" r="240"/>
      <line class="rd-cross" x1="20" y1="260" x2="500" y2="260"/>
      <line class="rd-cross" x1="260" y1="20" x2="260" y2="500"/>
      ${rdScatter}
      <circle class="rd-core" cx="260" cy="260" r="6"/>
    </svg>
    <div class="rd-sweep" aria-hidden="true"></div>
    <ul class="rd-nodes">
      ${rdNodesHtml}
    </ul>
  </div>
  <article class="rd-card">
    <div class="rd-who"><div class="rd-av" aria-hidden="true">דכ</div><div><b>דנה כהן</b><span>עורכת דין</span></div></div>
    <p>ביקרה בדף המחירים פעמיים בשעה האחרונה ופתחה את המייל האחרון.</p>
    <em>כדאי להתקשר היום</em>
  </article>
</div></div>`,
  js:`(function(){
  const root=document.querySelector(".rd");if(!root)return;
  if(typeof gsap==="undefined")return;       // בלי GSAP: כל הצמתים דולקים והכרטיס במקומו
  gsap.registerPlugin(ScrollTrigger);
  const q=s=>[...root.querySelectorAll(s)];
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)",()=>{
    const rings=q(".rd-ring"),scat=q(".rd-s"),core=q(".rd-core"),nodes=q(".rd-n"),sweep=root.querySelector(".rd-sweep"),
          card=root.querySelector(".rd-card"),sel=root.querySelector(".rd-n.is-sel"),pick=sel.querySelector("em"),
          dots=q(".rd-n i"),lit=q(".rd-n b"),waves=q(".rd-n u"),tags=q(".rd-n span");
    const O="260 260",DUR=4,T0=1.4;
    gsap.set([...rings,...core],{scale:0,svgOrigin:O});
    gsap.set(scat,{opacity:0});
    gsap.set(dots,{scale:0});
    gsap.set(lit,{opacity:0});
    gsap.set(tags,{autoAlpha:0,y:4});
    gsap.set(pick,{opacity:0,scale:.6});
    gsap.set(card,{autoAlpha:0});
    let tl=null;
    const run=()=>{
      // המיקום של הצומת והכרטיס נמדד כאן, כדי שיהיה נכון בכל רוחב
      const nb=sel.querySelector("i").getBoundingClientRect(),cb=card.getBoundingClientRect();
      gsap.set(card,{x:nb.left+nb.width/2-(cb.left+cb.width/2),y:nb.top+nb.height/2-(cb.top+cb.height/2),scale:.12,autoAlpha:0});
      tl=gsap.timeline();
      tl.to(core,{scale:1,duration:.4,ease:"power3.out"},0)
        .to(rings,{scale:1,duration:.8,ease:"power3.out",stagger:.15},.2)
        .to(scat,{opacity:1,duration:.5,stagger:{each:.02,from:"random"}},.6)
        .to(dots,{scale:1,duration:.35,ease:"power3.out",stagger:{each:.05,from:"random"}},1)
        .to(sweep,{autoAlpha:1,duration:.3},T0-.2)
        .fromTo(sweep,{rotation:0},{rotation:360,duration:DUR,ease:"none"},T0)
        .to(sweep,{autoAlpha:0,duration:.5},T0+DUR);
      nodes.forEach((n,i)=>{
        const T=T0+(+n.dataset.a)/360*DUR;
        tl.fromTo(lit[i],{opacity:0,scale:.4},{opacity:1,scale:1,duration:.35,ease:"power3.out"},T)
          .fromTo(waves[i],{opacity:.6,scale:1},{opacity:0,scale:3.4,duration:.8,ease:"power2.out"},T)
          .to(tags[i],{autoAlpha:1,y:0,duration:.35,ease:"power2.out"},T+.05);
      });
      const P=T0+DUR+.2;
      tl.to(pick,{opacity:1,scale:1,duration:.4,ease:"power3.out"},P)
        .to(card,{x:0,y:0,scale:1,autoAlpha:1,duration:.9,ease:"power3.out"},P+.3);
    };
    const st=ScrollTrigger.create({trigger:root.querySelector(".rd-field"),start:"top 75%",once:true,onEnter:run});
    return()=>{st.kill();if(tl)tl.kill();gsap.set([...rings,...core,...scat,...dots,...lit,...waves,...tags,pick,card,sweep],{clearProps:"all"});};
  });
})();`
}
];
