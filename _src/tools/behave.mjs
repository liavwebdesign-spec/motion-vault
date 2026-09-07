#!/usr/bin/env node
// behave.mjs: מבחן התנהגות לכל מהלך במאגר. עונה על השאלה שה-QA הסטטי לא יודע לענות:
// "האם משהו בכלל זז?", "האם משהו ברח מהמסך?", "האם יש שגיאת JS?"
//
// למה: דוח האישורים של 3.9 דחה 50 מהלכים, ורובם נפלו על חמש טעויות חוזרות שכולן
// היו נתפסות כאן לפני שליאב ראה אותן: טווין שמסתכם באפס (g12, lm1), מחלקת מצב שכבר
// במארקאפ ולכן אין טרנזישן (lm5), טריגרים על אלמנט מפונן שלא נורים (g20), Flip שמרוקן
// מכל (g23, b34), וסיבוב-נגד סטטי (g57).
//
// איך: לכל עמוד בנוי נוצר עותק זמני (ספריות מ-_src/tools/vendor, לא מה-CDN) עם סקריפט
// בדיקה לפני </body>. Chrome headless טוען אותו (file://, אין צורך בשרת) פעמיים: 1280x900
// ו-390x844. הסקריפט מצלם לכל אלמנט (לפי זהות, כולל display:none ופסאודו-אלמנטים)
// transform/translate/opacity/clip/mask/filter/צבע/stroke/מיקום במסמך, ואז מפעיל את
// כל מה שמשתמש אמיתי עושה, בצעדים, עם צילום אחרי כל צעד:
//   הובר (מחלקת .__hov במקום :hover + אירועי pointer/mouse על עד 40 אלמנטים) -> יציאה
//   מהובר, גרירה (pointerdown/move/up על cursor:grab), גלגלת וגלילת תיבות פנימיות ->
//   לחיצה על הפקד הראשון שאינו פעיל (או על cursor:pointer) -> "הנעה": ScrollTriggers
//   ל-start ול-end, טיימליין גלובלי +3s, גלילה לתחתית, IntersectionObserver "הכל נכנס",
//   .reveal -> .is-in -> המתנה של 1300ms וירטואליות לשרשראות setTimeout -> ביטול אנימציות.
// תנועה = אלמנט שמצבו השתנה בין שני צילומים עוקבים כלשהם (הובר שנכנס ויוצא נספר).
// התוצאה נכתבת ל-DOM ונקראת דרך --dump-dom. אפס תלויות npm.
//
// תיקוני רתמה שבלעדיהם המבחן משקר (נמדדו בסנטינל, 7.9.2026):
//   1. תחת --virtual-time-budget כרום מקדם טיימרים אבל כמעט לא מצייר פריימים, ולכן rAF
//      ממומש בעותק הבדיקה על setTimeout (RAF_SHIM בראש ה-<head>, לפני GSAP).
//   2. טרנזישן על תכונת main-thread (grid-template-rows) לא מתקדם בלי פריימים, ושינוי משך
//      לא נוגע בטרנזישן רץ; רק transition:none מבטל אותו וחושף את מצב היעד. לכן כל צילום
//      נעשה עם transition:none זמני. אנימציות keyframes מקבלות duration:0 רק בצילום האחרון.
//   3. IntersectionObserver לא יורה בלי פריימים: ה-shim מחזיק את כל ה-observe ומשחרר
//      אותם ב"הנעה" (או אחרי 2500ms), כך שהצילום הראשון הוא לפני החשיפה והאחרון אחריה.
//   4. document.startViewTransition לא מגיע להזדמנות רינדור: ה-shim מריץ את הקולבק מיד.
//   5. :hover אי אפשר לכפות מ-JS: בעותק הבדיקה כל :hover בסגנונות הדף הופך ל-.__hov.
// כיול: 38 מהלכים מייצגים (כולל 27 שנפלו בגרסה הראשונה) עוברים עם הנעה, וב---no-drive
// זזים רק מהלכים שמונפשים מעצמם בטעינה (פרילודרים, דופק, באנר עוגיות שנכנס אחרי השהיה).
//
// שימוש:  node _src/tools/behave.mjs            (הכל: gsap, behavior, css, lm, misc)
//         node _src/tools/behave.mjs g12 lm5    (מזהים נבחרים)
//         node _src/tools/behave.mjs --json     (פלט מכונה, כולל movedEls וטלמטריה)
//         node _src/tools/behave.mjs --no-drive (בקרת שלילה: כלום לא אמור לזוז)
// כשל = שגיאת JS, כלום לא זז במהלך עם JS/ספרייה, דמו CSS בלי שום transition/animation,
// גלישה אופקית ב-1280 או ב-390, או אלמנט fixed מחוץ למסך. פריסה סטטית בלי מילת תנועה
// ב-CSS (b10) מסומנת static ולא נכשלת.
// יציאה: 0 כשהכל עבר, 2 כשיש כשלים, 1 כשלא נמצא Chrome.
// מה המבחן לא רואה: איכות התנועה (מהירות, עקומה, טעם). על זה רק ליאב שופט.

import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const JSON_OUT = args.includes("--json");
const NO_DRIVE = args.includes("--no-drive");   // בקרת שלילה: בלי להניע כלום, moved אמור להיות קרוב לאפס
const wanted = new Set(args.filter(a => !a.startsWith("--")));

const CHROME = [process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
].filter(Boolean).find(p => existsSync(p));
if (!CHROME) { console.error("behave: Chrome לא נמצא. הגדר CHROME_PATH."); process.exit(1); }

// טוענים את הקטלוג כדי לדעת לכל מהלך אם הוא אמור לזוז בכלל
const entries = [];
for (const f of readdirSync(join(ROOT, "_src", "catalog")).sort()) {
  if (!f.endsWith(".mjs")) continue;
  const mod = await import(pathToFileURL(join(ROOT, "_src", "catalog", f)).href);
  entries.push(...mod.default);
}
// עמודי דוקטרינה ועורות לא נבדקים על תנועה: אין להם התנהגות להוכיח
const MOTION_CATS = new Set(["gsap", "behavior", "css", "lm", "misc"]);

// הסקריפט שרץ בתוך הדף. כותב JSON ל-#behave-result.
const PROBE = String.raw`
<script>
(function(){
  var errs=[]; window.__scriptFails=0;
  window.addEventListener("error",function(e){ if(e.target&&e.target.tagName==="SCRIPT"){window.__scriptFails++;errs.push("script failed: "+(e.target.src||"").split("/").pop());} else errs.push(String(e.message||e.type)); },true);
  window.addEventListener("unhandledrejection",function(e){errs.push("rejection:"+String(e.reason&&e.reason.message||e.reason))});
  var demo=document.querySelector(".stage")||document.body;
  var CHROME=".vtop,.vintro,.mvcode,.demo-note,.mvpanel,#se-bar,.runway";
  var tele={hovered:0,hovClass:0,dragged:0,wheeled:0,scrolledBoxes:0};
  function isChrome(el){ return el===window.__sentinel||el.closest(CHROME)||el.tagName==="SCRIPT"||el.tagName==="STYLE"; }
  function idOf(el){ return el.tagName.toLowerCase()+(el.id?"#"+el.id:"")+(el.className&&typeof el.className==="string"?"."+el.className.replace(/\b__hov\b/,"").trim().split(/\s+/).filter(Boolean).slice(0,2).join("."):""); }
  function hasDur(s){ return /[1-9]/.test(s||""); }
  // פסאודו-אלמנטים: קו תחתון שנמתח, הבזק על כפתור, דופק. getComputedStyle של האלמנט לא רואה אותם.
  function pseudo(el,which){ var p=getComputedStyle(el,which); if(p.content==="none"||p.content==="normal")return ""; return p.transform+"|"+p.opacity+"|"+p.width+"|"+p.height+"|"+p.backgroundSize+"|"+p.backgroundPosition+"|"+p.clipPath+"|"+p.left+"|"+p.top; }
  function pseudoMotion(el,which){ var p=getComputedStyle(el,which); return p.content!=="none"&&p.content!=="normal"&&(hasDur(p.transitionDuration)||p.animationName!=="none"); }
  // צילום מצב: מפה אלמנט -> ערוצים. לפי זהות ולא לפי אינדקס, כדי שאלמנט שנולד או נחשף (לייטבוקס,
  // באנר) לא יזיז את כל ההשוואה. כולל display:none, כי חשיפה היא תנועה לגיטימית.
  function snap(){
    var out=new Map(); document.querySelectorAll("body *").forEach(function(el){
      if(isChrome(el))return;
      var cs=getComputedStyle(el); var none=cs.display==="none";
      var r=none?{left:0,top:0,width:0,height:0}:el.getBoundingClientRect();
      // כל ערוץ שתנועה יכולה לעבור בו: טרנספורם, שקיפות, חיתוך, מסכה, פילטר, ציור SVG, צבעים, מיקום רקע, פסאודו
      // translate/rotate/scale הן תכונות נפרדות מ-transform (lm1 כותב el.style.translate)
      out.set(el,{id:idOf(el),d:cs.display,vis:!none&&!!(r.width||r.height),
        t:cs.transform+"|"+cs.translate+"|"+cs.rotate+"|"+cs.scale,o:cs.opacity,
        x:Math.round(r.left+scrollX),y:Math.round(r.top+scrollY),w:Math.round(r.width),h:Math.round(r.height),
        tr:hasDur(cs.transitionDuration)||cs.animationName!=="none"||pseudoMotion(el,"::before")||pseudoMotion(el,"::after"),
        cp:cs.clipPath,f:cs.filter,
        mk:(cs.maskImage||cs.webkitMaskImage||"")+"|"+(cs.maskPosition||cs.webkitMaskPosition||"")+"|"+(cs.maskSize||cs.webkitMaskSize||""),
        sd:cs.strokeDashoffset+"|"+cs.strokeDasharray, c:cs.color+"|"+cs.backgroundColor+"|"+cs.borderTopColor,
        bp:cs.backgroundPosition+"|"+cs.backgroundSize, v:cs.visibility, pb:pseudo(el,"::before"), pa:pseudo(el,"::after"),
        fx:cs.position==="fixed"||cs.position==="sticky"});
    }); return out;
  }
  var CH=["t","o","cp","f","mk","sd","c","bp","v","pb","pa"];
  function diff(a,b,acc,skipGeom){
    b.forEach(function(rb,el){ var ra=a.get(el); var ch=[];
      if(!ra){ if(rb.vis)ch.push("new"); }
      else {
        if(ra.d!==rb.d)ch.push("display");
        else if(rb.d!=="none"){
          ch=CH.filter(function(k){return ra[k]!==rb[k]});
          // אלמנטים fixed/sticky זזים עם הגלילה בהגדרה, ולכן המיקום שלהם לא נספר, רק המראה
          if(!skipGeom&&!ra.fx&&(Math.abs(ra.x-rb.x)>2||Math.abs(ra.y-rb.y)>2||Math.abs(ra.w-rb.w)>2||Math.abs(ra.h-rb.h)>2))ch.push("pos");
          if(skipGeom)ch=ch.filter(function(k){return k!=="pb"&&k!=="pa"});   // גם פסאודו כולל מידות, שהפונט משנה
        }
      }
      if(ch.length){ var s=acc.get(el)||{id:rb.id,ch:{}}; ch.forEach(function(k){s.ch[k]=1}); acc.set(el,s); }
    });
  }
  function overflow(){
    var d=document.documentElement; var sw=d.scrollWidth, iw=innerWidth; var leaks=0;
    document.querySelectorAll("body *").forEach(function(el){
      if(el===window.__sentinel)return;                       // הסנטינל שלנו יושב ב-left:-50px בכוונה
      var cs=getComputedStyle(el); if(cs.position!=="fixed")return;
      // אלמנט קבוע שקוף או בלי pointer-events (עוקב סמן, שובל תמונות) אינו דליפה: אף אחד לא רואה ולא נתקע בו
      if(parseFloat(cs.opacity)===0||cs.visibility==="hidden"||cs.pointerEvents==="none")return;
      var r=el.getBoundingClientRect(); if(r.width&&(r.right>iw+1||r.left<-1))leaks++;
    });
    return {docWider:sw>iw+1, fixedLeaks:leaks};
  }
  function visible(el){ if(isChrome(el))return false; var cs=getComputedStyle(el); if(cs.display==="none"||cs.visibility==="hidden")return false; var r=el.getBoundingClientRect(); return !!(r.width&&r.height); }
  function center(el){ var r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }
  function fire(el,type,init,Ctor){ try{ el.dispatchEvent(new (Ctor||MouseEvent)(type,init)); }catch(e){} }
  function pointerInit(c,extra){ var o={bubbles:true,cancelable:true,composed:true,clientX:c.x,clientY:c.y,screenX:c.x,screenY:c.y,pointerId:1,pointerType:"mouse",isPrimary:true,view:window}; for(var k in extra)o[k]=extra[k]; return o; }
  var hoverEls=[];
  // הובר: (1) כללי :hover בעותק הבדיקה שוכתבו ל-.__hov (בצד Node), ולכל כלל מוסיפים את המחלקה
  // לאלמנט הראשון שהבסיס שלו תופס; (2) אירועי pointer/mouse על עד 40 אלמנטים בדמו ועל המסמך.
  function hoverIn(){
    var sels=[]; function walk(rules){ for(var i=0;i<rules.length;i++){ var r=rules[i]; if(r.selectorText&&r.selectorText.indexOf(".__hov")>=0)sels.push(r.selectorText); if(r.cssRules)walk(r.cssRules); } }
    for(var i=0;i<document.styleSheets.length;i++){ try{ walk(document.styleSheets[i].cssRules); }catch(e){} }
    sels.forEach(function(sel){ sel.split(",").forEach(function(part){ var base=part.split(".__hov")[0].trim(); if(!base)return;
      var el=null; try{ el=demo.querySelector(base)||document.querySelector(base); }catch(e){} if(el&&!isChrome(el)){ el.classList.add("__hov"); tele.hovClass++; } }); });
    hoverEls=[].slice.call(demo.querySelectorAll("*")).filter(visible).slice(0,40);
    hoverEls.forEach(function(el){ var c=center(el); c.x+=8; c.y+=6;
      fire(el,"pointerover",pointerInit(c),PointerEvent); fire(el,"mouseover",pointerInit(c));
      fire(el,"pointerenter",pointerInit(c,{bubbles:false}),PointerEvent); fire(el,"mouseenter",pointerInit(c,{bubbles:false}));
      fire(el,"pointermove",pointerInit(c),PointerEvent); fire(el,"mousemove",pointerInit(c));
      c.x+=24; c.y+=10; fire(el,"pointermove",pointerInit(c),PointerEvent); fire(el,"mousemove",pointerInit(c)); });
    tele.hovered=hoverEls.length;
    var dc=center(demo); fire(document,"pointermove",pointerInit(dc),PointerEvent); fire(document,"mousemove",pointerInit(dc));
  }
  function hoverOut(){
    hoverEls.forEach(function(el){ var c=center(el); c.x-=40;
      fire(el,"pointerout",pointerInit(c),PointerEvent); fire(el,"mouseout",pointerInit(c));
      fire(el,"pointerleave",pointerInit(c,{bubbles:false}),PointerEvent); fire(el,"mouseleave",pointerInit(c,{bubbles:false})); });
  }
  // גרירה: אלמנטים עם cursor:grab/move או מחלקה drag. pointerdown על האלמנט, move על המסמך, up.
  function dragProbe(){
    var cands=[].slice.call(demo.querySelectorAll("*")).filter(function(el){ if(!visible(el))return false; var cur=getComputedStyle(el).cursor; return /grab|move|ew-resize|ns-resize/.test(cur)||/\bdrag/.test(String(el.className)); }).slice(0,3);
    cands.forEach(function(el){ var c=center(el);
      fire(el,"pointerdown",pointerInit(c,{button:0,buttons:1}),PointerEvent); fire(el,"mousedown",pointerInit(c,{button:0,buttons:1}));
      for(var k=1;k<=4;k++){ var p={x:c.x-30*k,y:c.y+6*k}; fire(el,"pointermove",pointerInit(p,{buttons:1}),PointerEvent); fire(el,"mousemove",pointerInit(p,{buttons:1})); }
      var e={x:c.x-120,y:c.y+24}; fire(el,"pointerup",pointerInit(e,{button:0,buttons:0}),PointerEvent); fire(el,"mouseup",pointerInit(e,{button:0,buttons:0}));
      tele.dragged++; });
  }
  // גלגלת וקופסאות גלילה פנימיות (הדר שמתחבא, גלריה אנכית): גלגלת על מרכז הדמו, וכל תיבה גלילה לתחתית.
  function wheelAndScroll(){
    var dc=center(demo); var target=document.elementFromPoint(Math.max(1,Math.min(innerWidth-2,dc.x)),Math.max(1,Math.min(innerHeight-2,dc.y)))||demo;
    for(var k=0;k<3;k++){ fire(target,"wheel",{bubbles:true,cancelable:true,deltaY:120,deltaMode:0,clientX:dc.x,clientY:dc.y},WheelEvent); tele.wheeled++; }
    document.querySelectorAll("body *").forEach(function(el){ if(isChrome(el))return; var cs=getComputedStyle(el);
      if(/(auto|scroll)/.test(cs.overflowY)&&el.scrollHeight>el.clientHeight+4){ el.scrollTop=el.scrollHeight; el.dispatchEvent(new Event("scroll")); tele.scrolledBoxes++; }
      // ב-RTL הטווח של scrollLeft שלילי; ערך חיובי נחתך לאפס ולא זז כלום
      else if(/(auto|scroll)/.test(cs.overflowX)&&el.scrollWidth>el.clientWidth+4){ el.scrollLeft=(cs.direction==="rtl"?-1:1)*el.scrollWidth; el.dispatchEvent(new Event("scroll")); tele.scrolledBoxes++; } });
  }
  function drive(){
    try{
      if(window.ScrollTrigger){ ScrollTrigger.refresh(); var ts=ScrollTrigger.getAll();
        ts.forEach(function(t){ try{ t.scroll(t.start); }catch(e){} }); ScrollTrigger.update();
        ts.forEach(function(t){ try{ t.scroll(t.end); }catch(e){} }); ScrollTrigger.update();
        ts.forEach(function(t){ try{ if(t.animation) t.animation.progress(1); }catch(e){} });
      }
      if(window.gsap){ gsap.globalTimeline.time(gsap.globalTimeline.time()+3); }
      window.scrollTo(0,Math.max(0,document.documentElement.scrollHeight-innerHeight));
      window.dispatchEvent(new Event("scroll"));
      // IntersectionObserver: ה-shim החזיק את כל ה-observe בהמתנה, וכאן "הכל נכנס למסך" בבת אחת.
      // ככה הצילום הראשון הוא לפני החשיפה והאחרון אחריה, כמו גלילה אמיתית.
      if(window.__ioFlush)window.__ioFlush();
      // reveals של המאגר עצמו: מסמנים ידנית כמו שהמאגר עושה ב-?qa
      document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("is-in")});
    }catch(e){ errs.push("drive:"+e.message); }
  }
  function clickOnce(){
    // מהלכים מונעי-אינטראקציה (Flip בלחיצה, טאבים, אקורדיון) לא זזים בגלילה. לחיצה אחת על
    // הפקד הראשון בדמו מספיקה כדי להוכיח שיש התנהגות. לא מזיקה לדמו גלילה.
    // סליידרים (לפני/אחרי, מחשבון): הזזה לקצה + אירוע input, זו האינטראקציה שלהם
    document.querySelectorAll("input[type=range]").forEach(function(r){ try{ r.value=r.max||100; r.dispatchEvent(new Event("input",{bubbles:true})); r.dispatchEvent(new Event("change",{bubbles:true})); }catch(e){} });
    // סליידרי גרירה (לפני/אחרי) נשלטים גם במקלדת: פוקוס + חיצים. זה מה שמניע אותם בלי pointer אמיתי.
    document.querySelectorAll("[role=slider], .ba-handle, .ba2-handle, [aria-valuenow]").forEach(function(h){
      try{ h.focus(); for(var k=0;k<6;k++){ h.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowLeft",bubbles:true})); } }catch(e){}
    });
    var usable=function(el){ return visible(el)&&!el.disabled&&!el.hasAttribute("hidden"); };
    var cands=[].slice.call(demo.querySelectorAll("button:not(.mvid):not(.cp), [role=button], a.gbtn, nav a, .tg a, .fbtn, input[type=checkbox], input[type=radio], [tabindex='0'], summary, label")).filter(usable);
    // בלי פקד סטנדרטי: כל אלמנט עם cursor:pointer הוא פקד בפועל (פריט Flip, כרטיס מתהפך)
    if(!cands.length) cands=[].slice.call(demo.querySelectorAll("*")).filter(function(el){ return usable(el)&&getComputedStyle(el).cursor==="pointer"; });
    if(!cands.length)return false;
    // הפקד הראשון הוא לרוב זה שכבר פעיל (טאב נבחר, עמודה פתוחה), ולחיצה עליו לא משנה כלום.
    // בוחרים את הראשון שאינו פעיל, ואם כולם פעילים את השני.
    var isActive=function(el){ return /\b(on|open|active|sel|is-on|is-open)\b/.test(el.className)||el.getAttribute("aria-selected")==="true"||el.getAttribute("aria-pressed")==="true"||el.getAttribute("aria-expanded")==="true"; };
    var el=cands.find(function(c){return !isActive(c)})||cands[1]||cands[0];
    try{ var c=center(el); fire(el,"pointerdown",pointerInit(c,{button:0,buttons:1}),PointerEvent); fire(el,"mousedown",pointerInit(c,{button:0,buttons:1})); fire(el,"pointerup",pointerInit(c),PointerEvent); fire(el,"mouseup",pointerInit(c)); el.focus(); el.click(); }catch(e){}
    window.__clickedEl=el.tagName.toLowerCase()+(el.className?"."+String(el.className).split(" ")[0]:"")+(el.textContent?" “"+el.textContent.trim().slice(0,16)+"”":"");
    return true;
  }
  // סנטינל: כמה פריימים עוברים בין הצילומים, והאם טרנזישן קומפוזיטור (opacity) מתקדם. טלמטריה בלבד.
  window.__raf=0; (function tick(){ window.__raf++; requestAnimationFrame(tick); })();
  var dummy=document.createElement("i"); dummy.style.cssText="position:fixed;left:-50px;top:0;width:10px;height:10px;opacity:1;transition:opacity 300ms linear";
  document.body.appendChild(dummy); getComputedStyle(dummy).opacity; dummy.style.opacity="0"; window.__sentinel=dummy;
  // מרוץ: ממשיכים אחרי n פריימים או אחרי טיימאוט (זמן וירטואלי), מה שקודם. בלי rAF shim הרתמה נותנת
  // 2 עד 5 פריימים לכל הריצה, והטיימאוט מבטיח שהתוצאה תמיד נכתבת לפני שכרום זורק את הדף.
  function afterFramesOrMs(n,ms,cb){ var done=false,k=0; function go(){ if(done)return; done=true; cb(); }
    (function step(){ if(done)return; if(++k>=n)return go(); requestAnimationFrame(step); })(); setTimeout(go,ms); }
  // רצף צעדים: פונקציה = מריצים, מספר = ממתינים כך וכך פריימים, {ms:n} = ממתינים n מילישניות (וירטואליות, חינם)
  function run(list){ var i=0; (function next(){ if(i>=list.length)return; var f=list[i++]; if(typeof f==="number")afterFramesOrMs(f,f*60,next); else if(f&&f.ms)setTimeout(next,f.ms); else { try{f()}catch(e){errs.push("probe:"+e.message)} next(); } })(); }
  // ממתינים לפונטים לפני הצילום הראשון: החלפת פונט מזיזה כל טקסט בכמה פיקסלים ונספרת כ"תנועה"
  var ready=(document.fonts&&document.fonts.ready)||Promise.resolve();
  ready.then(function(){ setTimeout(begin,120); });
  var snaps=[], changes=new Map(), st0=0, clicked=false, sentinelAtEnd=null, first=null, declared=false, skipGeomNext=false;
  // האם מישהו בדף מצהיר על תנועה (transition/animation, כולל פסאודו)? נבדק לפני כל צילום, כי הצילום עצמו מכבה טרנזישנים.
  function scanDeclared(){ if(declared)return; document.querySelectorAll("body *").forEach(function(el){ if(declared||isChrome(el))return; var cs=getComputedStyle(el); if(hasDur(cs.transitionDuration)||cs.animationName!=="none"||pseudoMotion(el,"::before")||pseudoMotion(el,"::after"))declared=true; }); }
  // צילום עם טרנזישנים מבוטלים: transition:none (ולא duration:0) בכוונה. שינוי משך לא נוגע בטרנזישן שכבר
  // רץ, ואילו הסרת transition-property מבטלת אותו לפי המפרט והערך המחושב קופץ ליעד. טרנזישן על תכונת
  // main-thread (grid-template-rows של האקורדיון) לא מתקדם כלל בלי פריימים אמיתיים, ורק הביטול חושף את
  // מצב היעד. אחרי הצילום מסירים את הסגנון, כך שהצעד הבא (יציאה מהובר, לחיצה) שוב עובר טרנזישן רגיל.
  // רק טרנזישנים מבוטלים בכל צילום. אנימציות keyframes לא: הן מתחילות בפריים הראשון ומקבלות
  // duration:0 (= מצב הסיום) רק בצעד האחרון, כך שההפרש התחלה/סוף שלהן נספר.
  var noTrans=document.createElement("style"); noTrans.textContent="*,*::before,*::after{transition:none!important}";
  var noAnim=document.createElement("style"); noAnim.textContent="*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important}";
  function mark(){ scanDeclared(); document.head.appendChild(noTrans); void document.body.offsetHeight; var s=snap(); noTrans.remove(); void document.body.offsetHeight; if(snaps.length)diff(snaps[snaps.length-1],s,changes,skipGeomNext); skipGeomNext=false; snaps.push(s); }
  // צילום אפס, סינכרוני, לפני שכל rAF או setTimeout של הדמו רץ: כניסות הירו (lm5) מוסיפות מחלקת מצב
  // כמה עשרות מילישניות אחרי הטעינה, הרבה לפני שהפונטים מוכנים, ובלי הצילום הזה הן נראות "כבר גמורות".
  // ההשוואה ממנו לצילום שאחרי הפונטים מדלגת על גאומטריה, כי החלפת הפונט מזיזה טקסט.
  mark(); skipGeomNext=true;
  function begin(){
    mark(); first=snaps[1]; st0=window.ScrollTrigger?ScrollTrigger.getAll().length:0;
    var noDrive=/[?&]nodrive=1/.test(location.search);   // nodrive=1 = בקרת שלילה לכיול המדד
    // תנועה = מצב שהשתנה באיזשהו שלב, לא רק בין ההתחלה לסוף: הובר שנכנס ויוצא חוזר למקום,
    // ולכן מצלמים אחרי כל שלב ומאחדים את ההבדלים. בסוף ממתינים 1300ms וירטואליות, כדי
    // ששרשראות setTimeout (פרילודרים, דלתות) יספיקו לרוץ.
    var steps=noDrive?[{ms:1300},mark]:[
      hoverIn, 3, mark,
      hoverOut, dragProbe, wheelAndScroll, 2, mark,
      function(){ clicked=clickOnce(); }, 2, mark,
      drive, {ms:1300}, mark,
      function(){ window.dispatchEvent(new Event("scroll")); sentinelAtEnd=getComputedStyle(dummy).opacity; document.head.appendChild(noAnim); void document.body.offsetHeight; }, 2, mark
    ];
    steps.push(finish); run(steps);
  }
  function finish(){
    var elements=0; first.forEach(function(r){ if(r.vis)elements++; }); var anyTransition=declared;
    var moved=0, movedEls=[]; changes.forEach(function(s){ moved++; if(movedEls.length<8)movedEls.push(s.id+":"+Object.keys(s.ch).join("+")); });
    // טלמטריה: כשעמוד מדווח אפס, צריך לדעת באיזה שלב הוא נתקע (סקריפט לא נטען? CSS לא הוחל? זמן?)
    var probeCss=getComputedStyle(document.body).fontFamily;
    var res={elements:elements,moved:moved,movedEls:movedEls,anyTransition:anyTransition,scrollTriggers:st0,clicked:clicked,errors:errs,overflow:overflow(),vw:innerWidth,vh:innerHeight,
      gsap:typeof window.gsap!=="undefined",st:typeof window.ScrollTrigger!=="undefined",ready:document.readyState,
      scriptsFailed:window.__scriptFails||0,cssApplied:/Ploni|Heebo/i.test(probeCss),t:Math.round(performance.now()),clickedEl:window.__clickedEl||null,
      rafFrames:window.__raf,sentinelOpacity:sentinelAtEnd,probes:tele,snapshots:snaps.length};
    var s=document.createElement("script"); s.type="application/json"; s.id="behave-result"; s.textContent=JSON.stringify(res); document.body.appendChild(s);
  }
})();
</script>`;

// תחת --virtual-time-budget כרום מקדם טיימרים אבל כמעט לא מצייר פריימים (הסנטינל מדד 2 עד 5 rAF
// לכל הריצה). כל מה שרץ ב-requestAnimationFrame (טיקר של GSAP, Lenis, לולאת lerp של lm1) קופא, וכל כשל
// "לא זז" הוא של הרתמה ולא של המהלך. לכן בעותק הבדיקה rAF ממומש על setTimeout(16ms) שכן מתקדם בזמן וירטואלי.
// חייב לרוץ לפני כל סקריפט אחר, כי GSAP שומר הפניה ל-requestAnimationFrame בזמן הטעינה.
// באותו shim גם: IntersectionObserver שמדווח "נראה" מיד (בלי פריימים הוא לא יורה לעולם, וכל
// reveal מבוסס IO נראה מת), ו-startViewTransition שמריץ את הקולבק מיד (בלי פריימים הוא
// לעולם לא מגיע להזדמנות רינדור, ומעבר View Transitions נראה כאילו לא קרה כלום).
const RAF_SHIM = `<script>(function(){var q=setTimeout,c=clearTimeout;window.requestAnimationFrame=function(cb){return q(function(){cb(performance.now())},16)};window.cancelAnimationFrame=function(id){c(id)};window.__rafShim=true;
var pend=[],flushed=false;function fireIO(s,el){if(s.els.indexOf(el)<0)return;var r=el.getBoundingClientRect();s.cb([{target:el,isIntersecting:true,intersectionRatio:1,boundingClientRect:r,intersectionRect:r,rootBounds:null,time:performance.now()}],s)}
function IO(cb){this.cb=cb;this.els=[];this.root=null;this.rootMargin="0px";this.thresholds=[0]}
IO.prototype.observe=function(el){var s=this;if(s.els.indexOf(el)<0)s.els.push(el);if(flushed)q(function(){fireIO(s,el)},0);else pend.push([s,el])};
IO.prototype.unobserve=function(el){var i=this.els.indexOf(el);if(i>=0)this.els.splice(i,1)};IO.prototype.disconnect=function(){this.els=[]};IO.prototype.takeRecords=function(){return[]};window.IntersectionObserver=IO;
window.__ioFlush=function(){flushed=true;var p=pend;pend=[];p.forEach(function(x){fireIO(x[0],x[1])})};q(window.__ioFlush,2500);
document.startViewTransition=function(cb){var p=Promise.resolve().then(function(){return typeof cb==="function"?cb():undefined});return{updateCallbackDone:p,ready:p,finished:p,skipTransition:function(){}}};
})();</script>`;

// מהלכים שאין להם תנועה להוכיח בכוונה, עם הסיבה. מסומנים static ולא נכשלים.
const WAIVERS = {
  fluid: "עמוד הדגמה של מסגרת נוזלית: הדמו הוא הפריסה עצמה, ה-JS רק מציג HUD של רוחב",
};

function runOne(e, width, height) {
  const page = join(ROOT, e.cat, e.id + ".html");
  if (!existsSync(page)) return { id: e.id, skipped: "no page" };
  // ספריות מ-vendor מקומי ולא מה-CDN: הבדיקה חייבת להיות דטרמיניסטית ולא תלויה ברשת.
  // האתר המפורסם ממשיך לטעון מה-CDN; ההחלפה נעשית רק בעותק הזמני של הבדיקה.
  const VENDOR = join(ROOT, "_src", "tools", "vendor");
  const html = readFileSync(page, "utf8")
    .replace(/<script src="https?:\/\/[^"]+\/([A-Za-z0-9_.-]+\.min\.js)"><\/script>/g, (m, f) =>
      existsSync(join(VENDOR, f)) ? `<script src="${pathToFileURL(join(VENDOR, f)).href}"></script>` : m)
    .replace(/<script src="https?:\/\/[^"]*lenis[^"]*"><\/script>/gi, m => {
      const f = readdirSync(VENDOR).find(n => /lenis/i.test(n)); return f ? `<script src="${pathToFileURL(join(VENDOR, f)).href}"></script>` : m; })
    .replace(/<head>/i, "<head>" + RAF_SHIM)
    // :hover אי אפשר לכפות מ-JS. בעותק הבדיקה כל :hover בסגנונות הדף הופך למחלקה .__hov שהבדיקה
    // מוסיפה לאלמנט התואם. לא נוגעים ב-(hover:hover) של media queries.
    .replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (m, attrs, css) => `<style${attrs}>${css.replace(/:hover(?!\s*\))/g, ".__hov")}</style>`)
    .replace(/<\/body>/i, PROBE + "\n</body>");
  const tmp = join(ROOT, e.cat, e.id + ".behave.tmp.html");
  writeFileSync(tmp, html, "utf8");
  try {
    const out = execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
      "--run-all-compositor-stages-before-draw", `--window-size=${width},${height}`,
      // --screenshot לצד --dump-dom מכריח את הקומפוזיטור לייצר פריימים; בלעדיו rAF וטרנזישנים לא מתקדמים לפני ה-dump
      "--virtual-time-budget=6000", `--screenshot=${join(ROOT, e.cat, e.id + ".behave.frame.png")}`, "--dump-dom", pathToFileURL(tmp).href + (NO_DRIVE ? "?nodrive=1" : "?qa=0"),
    ], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, timeout: 60000, stdio: ["ignore", "pipe", "ignore"] });
    const m = /<script type="application\/json" id="behave-result">([\s\S]*?)<\/script>/.exec(out);
    if (!m) return { id: e.id, error: "probe did not report (page hung or scripts blocked)" };
    return { id: e.id, ...JSON.parse(m[1]) };
  } catch (err) {
    return { id: e.id, error: "chrome: " + String(err.message).slice(0, 120) };
  } finally { try { unlinkSync(tmp); } catch {} try { unlinkSync(join(ROOT, e.cat, e.id + ".behave.frame.png")); } catch {} }
}

const targets = entries.filter(e => MOTION_CATS.has(e.cat) && (!wanted.size || wanted.has(e.id)));
const results = [];
for (const e of targets) {
  const d = runOne(e, 1280, 900);
  const m = runOne(e, 390, 844);
  let expectMotion = !!(e.js && e.js.trim()) || (e.libs && e.libs.length);
  const waived = WAIVERS[e.id];
  if (waived) expectMotion = false;
  // דמו בלי JS: התנועה יושבת ב-CSS על :hover, פסאודו-אלמנטים או @keyframes, ו-getComputedStyle של האלמנט
  // לא רואה פסאודו. לכן בודקים את מקור ה-CSS של הכניסה, לא את ה-DOM.
  const cssHasMotion = /(^|[;{\s])(transition|animation)\s*:|@keyframes|animation-timeline|scroll-timeline|view-timeline/.test(e.css || "");
  // כניסה בלי JS, בלי ספריות ובלי מילת תנועה ב-CSS היא פריסה/עיטור סטטי בהגדרה (b10 קווי שיער).
  // אין לה מה להוכיח, ולכן היא מסומנת static ולא נכשלת.
  const staticByDesign = (!expectMotion && !cssHasMotion) || !!waived;
  // תנועה שקיימת רק במובייל (קרוסלת peek שבדסקטופ היא גריד) היא עדיין תנועה: סופרים משתי הרזולוציות
  const moved = Math.max(d.moved || 0, m.moved || 0);
  const fails = [];
  if (d.error) fails.push(d.error);
  if (d.errors && d.errors.length) fails.push("JS errors: " + d.errors.slice(0, 2).join(" | "));
  if (!d.error && expectMotion && moved === 0) fails.push("nothing moved between progress 0 and 1 (" + d.elements + " elements, " + d.scrollTriggers + " triggers)");
  if (!d.error && !expectMotion && moved === 0 && !d.anyTransition && !staticByDesign) fails.push("static demo with no transition/animation at all");
  if (d.overflow && d.overflow.docWider) fails.push("horizontal overflow at 1280");
  if (m.overflow && m.overflow.docWider) fails.push("horizontal overflow at 390");
  if ((d.overflow && d.overflow.fixedLeaks) || (m.overflow && m.overflow.fixedLeaks)) fails.push("fixed element outside viewport");
  results.push({ id: e.id, cat: e.cat, moved: d.moved, movedMobile: m.moved, elements: d.elements, triggers: d.scrollTriggers, movedEls: d.movedEls, fails,
    static: staticByDesign, waived: waived || null,
    tele: { gsap: d.gsap, st: d.st, ready: d.ready, cssApplied: d.cssApplied, scriptsFailed: d.scriptsFailed, clicked: d.clicked, clickedEl: d.clickedEl, rafFrames: d.rafFrames, sentinel: d.sentinelOpacity, probes: d.probes, snapshots: d.snapshots, t: d.t, errors: d.errors } });
  if (!JSON_OUT) process.stdout.write((fails.length ? "FAIL " : "ok   ") + e.id.padEnd(6) + (fails.length ? "  " + fails.join("; ") : staticByDesign ? "  static" + (waived ? " (waived)" : "") : `  moved ${d.moved}/${d.elements}`) + "\n");
}
const failed = results.filter(r => r.fails.length);
if (JSON_OUT) console.log(JSON.stringify({ checked: results.length, failed: failed.length, results }, null, 1));
else console.log(`\nbehave: ${results.length} נבדקו, ${failed.length} נכשלו`);
process.exit(failed.length ? 2 : 0);
