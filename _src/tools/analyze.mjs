import {readdirSync} from "fs";
import {join} from "path";
import {pathToFileURL} from "url";
const entries=[];
for(const f of readdirSync(join(process.cwd(),"_src","catalog")).sort()){
  if(!f.endsWith(".mjs"))continue;
  const m=await import(pathToFileURL(join(process.cwd(),"_src","catalog",f)).href);
  entries.push(...m.default);
}
const tok={},cls={},libs={};
let noStage=0, usesPh=0, usesRtlLogical=0;
for(const e of entries){
  const all=[e.css||"",e.html||"",e.js||""].join("\n");
  for(const m of all.matchAll(/var\(\s*(--[a-z0-9-]+)/g)) tok[m[1]]=(tok[m[1]]||0)+1;
  for(const c of ["stage","ph","gbtn","center","gcard","runway"])
    if(new RegExp('class="[^"]*\b'+c+'\b').test(e.html||"")) cls[c]=(cls[c]||0)+1;
  for(const l of e.libs||[]) libs[l]=(libs[l]||0)+1;
  if(!/class="[^"]*\bstage\b/.test(e.html||"")) noStage++;
  if(/\bph-[a-f]\b/.test(e.html||"")) usesPh++;
  if(/inset-inline|padding-inline|margin-inline|border-inline/.test(all)) usesRtlLogical++;
}
console.log("סה\"כ ערכים:",entries.length);
console.log("\n== משתני עיצוב שהרכיבים צורכים מבחוץ ==");
Object.entries(tok).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(4),k));
console.log("\n== מחלקות עזר של המאגר שמופיעות ב-HTML ==");
Object.entries(cls).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(4),"."+k));
console.log("\n== ספריות ==");
Object.entries(libs).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(4),k));
console.log("\nבלי עטיפת stage:",noStage,"| משתמשים בפלייסהולדר ph:",usesPh,"| תלויי כיוון לוגי:",usesRtlLogical);
