#!/usr/bin/env node
// gate.mjs: השער לפני שמהלך מגיע לליאב. רץ בסדר קבוע ועוצר בכשל הראשון:
//   1. build            (כל העמודים והייצוא)
//   2. qa               (דוקטרינה סטטית: easing, טוקנים, צבעים, transition על layout)
//   3. behave <ids>     (משהו זז? משהו ברח? שגיאת JS?)
//   4. skins  <ids>     (ניגודיות בארבעה עורות)
//   5. shots  <ids>     (שלושה מצבי גלילה בדסקטופ ובמובייל, ושגיאות קונסולה)
// ובסוף מדפיס את נתיב גיליון הצילומים. **לא מראים לליאב מהלך שהגיליון שלו לא נצפה.**
//
// שימוש:  node _src/tools/gate.mjs g129 g130        (מזהים שהשתנו)
//         node _src/tools/gate.mjs --all             (רגרסיה מלאה, כ-35 דקות)
//         node _src/tools/gate.mjs g129 --hover      (מועבר ל-shots)
// יציאה: קוד היציאה של השלב שנכשל.

import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const T = join(dirname(fileURLToPath(import.meta.url)));
const ROOT = join(T, "..", "..");
const args = process.argv.slice(2);
const ids = args.filter(a => !a.startsWith("--"));
const all = args.includes("--all");
if (!ids.length && !all) { console.error("gate: תן מזהים או --all"); process.exit(1); }

const step = (name, file, extra = [], allowCodes = [0]) => {
  console.log(`\n=== ${name} ===`);
  const r = spawnSync(process.execPath, [join(T, file), ...extra], { cwd: ROOT, stdio: "inherit", env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
  if (!allowCodes.includes(r.status)) { console.error(`\ngate: נעצר ב-${name} (קוד ${r.status})`); process.exit(r.status || 1); }
};

step("build", join("..", "build.mjs"));
step("qa", join("..", "qa.mjs"), [ROOT]);
const sel = all ? [] : ids;
step("behave", "behave.mjs", sel);
step("skins", "skins.mjs", [...sel, "--no-shots"]);
step("shots", "shots.mjs", [...(all ? ["--all"] : ids), ...(args.includes("--hover") ? ["--hover"] : [])]);
console.log("\ngate: עבר. עכשיו מסתכלים על הגיליון לפני שמראים לליאב.");
