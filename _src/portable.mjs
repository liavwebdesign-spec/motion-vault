// ייצוא נייד: הופך כניסת קטלוג לקוד שאפשר להדביק בפרויקט אחר ולראות עובד.
// הבעיה שזה פותר: הדמו במאגר נשען על משתני עיצוב גלובליים, על מחלקות עזר,
// על dir="rtl" ועל registerPlugin שכולם חיים ב-vault.css ובתבנית העמוד ולא בכניסה עצמה.
// בהעתקה ידנית כל אלה נשארים מאחור, והרכיב מגיע ליעד שבור.

// הערכים האמיתיים מ-:root של vault.css. הם נכנסים כ**ברירת מחדל** בתוך var(),
// ולכן פרויקט שמגדיר --line משלו יורש אותו, ופרויקט שלא, עדיין נראה נכון.
export const TOKENS = {
  "--gutter": "clamp(24px, 5vw, 96px)",
  "--fs-h1":  "clamp(26px, 1.6vw + 0.5rem, 40px)",
  "--fs-h2":  "clamp(28px, 1.9vw + 0.5rem, 52px)",
  "--fs-demo":"clamp(36px, 3vw + 0.5rem, 76px)",
  "--fs-body":"clamp(17px, 0.6vw + 0.7rem, 22px)",
  "--sec":    "clamp(120px, 12vw, 260px)",
  "--gap":    "clamp(16px, 1.6vw, 36px)",
  "--ink":    "#16182b",
  "--muted":  "#6a6d85",
  "--bg":     "#f7f7fa",
  "--line":   "#e4e4ee",
  "--accent": "#4a3aff",
  "--card":   "#fff",
  "--r":      "14px",
};

// מחלקות העזר של המאגר, בדיוק כפי שהן ב-vault.css. נפלטות רק אם הרכיב באמת משתמש בהן.
const HELPERS = {
  stage:  ".stage{padding:var(--sec) var(--gutter);position:relative}\n.stage.tight{padding-block:clamp(48px,5vw,90px)}\n.stage.full{padding-inline:0}",
  ph:     ".ph{display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;border-radius:var(--r)}",
  "ph-a": ".ph-a{background:linear-gradient(160deg,#3b5bdb,#748ffc)}",
  "ph-b": ".ph-b{background:linear-gradient(160deg,#5f3dc4,#9775fa)}",
  "ph-c": ".ph-c{background:linear-gradient(160deg,#0b7285,#3bc9db)}",
  "ph-d": ".ph-d{background:linear-gradient(160deg,#2b8a3e,#69db7c)}",
  "ph-e": ".ph-e{background:linear-gradient(160deg,#e8590c,#ffa94d)}",
  "ph-f": ".ph-f{background:linear-gradient(160deg,#c92a2a,#ff8787)}",
  gcard:  ".gcard{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:clamp(18px,1.8vw,32px)}",
  gbtn:   ".gbtn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding-inline:28px;border-radius:999px;background:var(--accent);color:#fff;font-weight:500;font-size:16px;border:0;cursor:pointer;font-family:inherit}",
  center: ".center{text-align:center}",
  // כניסות ה-React משתמשות בכפתור הקישור של המאגר. בלי הכלל הזה הוא מגיע ליעד בלי שום עיצוב.
  vback:  ".vback{font-size:14px;font-weight:500;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:7px 16px;background:#fff;text-decoration:none;transition:color .18s,border-color .18s}\n.vback:hover{color:var(--accent);border-color:var(--accent)}",
};

// מוסיף ברירת מחדל לכל var() של טוקן גלובלי. משתנים מקומיים של הרכיב לא נוגעים בהם,
// כי הם מוגדרים ממילא ב-CSS שלו. var() שכבר יש לו fallback נשאר כמו שהוא.
export function withFallbacks(css) {
  return css.replace(/var\(\s*(--[a-z0-9-]+)\s*([,)])/gi, (m, name, tail) => {
    if (tail === ",") return m;                 // כבר יש ברירת מחדל
    const v = TOKENS[name];
    return v ? `var(${name}, ${v})` : m;
  });
}

function usedHelpers(html) {
  const out = [];
  const classes = [...html.matchAll(/class="([^"]*)"/g)].flatMap(m => m[1].split(/\s+/));
  const set = new Set(classes);
  for (const k of Object.keys(HELPERS)) if (set.has(k)) out.push(HELPERS[k]);
  return out;
}

// מחזיר את שלושת הבלוקים להדבקה, כל אחד עומד בפני עצמו.
// נכסי הדמו יושבים בתוך המאגר. נתיב יחסי כמו ../assets/media/x שובר כל הדבקה בפרויקט אחר,
// ולכן הוא מוחלף בכתובת מלאה לקובץ החי. בפרויקט אמיתי מחליפים אותה במדיה של הלקוח.
const MEDIA_BASE = "https://liavwebdesign-spec.github.io/motion-vault/assets/";
const absolutize = t => t.replace(/(?:\.\.\/)+assets\//g, MEDIA_BASE);

export function portable(e, CDN, NON_GSAP) {
  const helpers = usedHelpers(e.html || "");
  const libs = e.libs || [];
  const plugins = libs.filter(l => l !== "gsap" && !NON_GSAP.has(l));

  const cssParts = [];
  if (helpers.length) cssParts.push("/* מחלקות עזר של המאגר שהרכיב הזה משתמש בהן */\n" + helpers.join("\n"));
  cssParts.push("/* " + e.id.toUpperCase() + " · " + e.name + " */\n" + (e.css || "").trim());
  const css = absolutize(withFallbacks(cssParts.join("\n\n")));

  const scripts = libs.map(l => `<script src="${CDN[l]}"></script>`);
  const jsParts = [];
  if (plugins.length) jsParts.push(`gsap.registerPlugin(${plugins.join(", ")});`);
  jsParts.push((e.js || "").trim());
  const js = jsParts.filter(Boolean).join("\n\n");

  const needsRtl = /inset-inline|padding-inline|margin-inline|border-inline|direction\s*:/.test(
    [e.css || "", e.js || ""].join("\n"));

  return { css, html: absolutize((e.html || "").trim()), js: absolutize(js),
           scripts, libs, plugins, needsRtl, helpers: helpers.length > 0 };
}

// קובץ יחיד שאפשר לפתוח בדפדפן ולראות שהוא עובד. זאת ההוכחה שאין תלות נסתרת.
export function standalone(e, CDN, NON_GSAP) {
  const p = portable(e, CDN, NON_GSAP);
  const tokens = Object.entries(TOKENS).map(([k, v]) => `  ${k}: ${v};`).join("\n");

  // מהלך מונע-גלילה צריך תוכן מעליו ומתחתיו. בעמוד ריק הטריגר מתחיל במיקום גלילה
  // שלילי שאי אפשר להגיע אליו, והרכיב נטען כשהאנימציה כבר באמצע. בפרויקט אמיתי
  // יש סקשנים מסביב, וכאן זה מדומה במסלול גלילה שמסומן בבירור כפיגום של הדמו.
  const runway = e.runway === false ? "" : true;
  const runwayCss = runway ? `
/* ===== פיגום של הדמו בלבד. מחקו את .mv-runway ואת שני ה-div כשמעתיקים. ===== */
.mv-runway{height:70vh;display:grid;place-items:center;color:#b9bcd0;font-size:14px}` : "";
  const runwayTop = runway ? `<div class="mv-runway">גלול למטה, הרכיב מתחיל כאן ↓</div>` : "";
  const runwayEnd = runway ? `<div class="mv-runway">סוף הרכיב. נסה גם לגלול חזרה למעלה ↑</div>` : "";
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${e.id.toUpperCase()} · ${e.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap" rel="stylesheet">
<style>
/* ===== טוקנים. בפרויקט אמיתי מוחקים את הבלוק הזה והרכיב יורש את הטוקנים שלכם. ===== */
:root{
${tokens}
}
*{box-sizing:border-box}
body{margin:0;font-family:"Heebo",system-ui,sans-serif;font-size:var(--fs-body);line-height:1.35;color:var(--ink);background:var(--bg)}
img{max-width:100%}
${runwayCss}

/* ===== הרכיב ===== */
${p.css}
</style>
</head>
<body>
${runwayTop}
${p.html}
${runwayEnd}
${p.scripts.join("\n")}
${p.js ? `<script>\n${p.js}\n</script>` : ""}
</body>
</html>`;
}
