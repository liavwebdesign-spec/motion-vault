// Conversion states (23.9.2026). The vault had heroes, headers and footers, and nothing for the moments that decide
// whether a visit becomes a lead: the phone thumb that needs a button, the minute after "send", the broken link, the
// server that does not answer. Liav's bar for this family: "a very high finish, quality micro-interactions, far from the
// banal, and practical for the visitor above all". So each entry answers three questions before it was built: what the
// banal version is, what the visitor actually gains here, and which small motion carries state (not decoration).
// b03 (smart floating CTA) and b32 (floating labels) already exist; nothing here repeats them.

const E = "cubic-bezier(.2,.6,.2,1)";
const IO = "cubic-bezier(.76,0,.24,1)";
const HOURS = `{"0":[9,18],"1":[9,18],"2":[9,18],"3":[9,18],"4":[9,18],"5":[9,13],"6":null}`;

const I = {
  wa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-1 .8c-.9-.4-1.8-1.3-2.2-2.2l.8-1-1-2z"/></svg>`,
  tel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>`,
  arrow: `<svg class="ic-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.01"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9a14 14 0 0 1 18 0M6 12.5a9 9 0 0 1 12 0M9 16a4.5 4.5 0 0 1 6 0M12 19.5v.01"/></svg>`,
};

// ---- shared atoms: buttons, reveal, the demo switch, focus ----
const ATOMS_CSS = `
.cx *{box-sizing:border-box}
.cx{--cx-err:color-mix(in srgb,#d23b22 72%,var(--ink));font-size:16px;line-height:1.6;color:var(--ink)}
.cx :where(a){color:inherit}
.cx :where(h2,h3){text-wrap:balance}
.cx :where(p,small,li){text-wrap:pretty}
.cx :focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}
.cx-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px;border:0;border-radius:14px;
  background:var(--accent);color:var(--accent-ink);font:inherit;font-size:16px;font-weight:600;text-decoration:none;cursor:pointer;white-space:nowrap;
  transition:transform .18s ${E},background .2s ${E},box-shadow .2s ${E}}
.cx-btn svg{width:20px;height:20px;flex:none}
.cx-btn:active{transform:scale(.97)}
.cx-btn.is-ghost{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 22%,transparent)}
@media (hover:hover) and (pointer:fine){.cx-btn:hover{transform:translateY(-1px)}.cx-btn.is-ghost:hover{box-shadow:inset 0 0 0 1.5px var(--ink)}
  .cx a:hover .ic-arr,.cx-btn:hover .ic-arr{transform:translateX(-4px)}}
.ic-arr{transition:transform .2s ${E}}
[dir="ltr"] .ic-arr{rotate:180deg}
.cx-rv{opacity:0;transform:translateY(16px);transition:opacity .5s ${E},transform .5s ${E};transition-delay:calc(var(--i,0) * 80ms)}
.is-in .cx-rv{opacity:1;transform:none}
.cx-t{unicode-bidi:isolate;font-variant-numeric:tabular-nums}
/* the demo switch: lets the reviewer see every state. Not part of the component you copy. */
.cx-demo{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 24px;padding:6px;border-radius:14px;background:color-mix(in srgb,var(--ink) 5%,transparent);font-size:13px;width:max-content;max-width:100%}
.cx-demo > span{padding:0 10px;font-weight:600;color:var(--muted)}
.cx-demo button{min-height:36px;padding:0 14px;border:0;border-radius:10px;background:none;font:inherit;font-weight:600;color:var(--ink);cursor:pointer;transition:background .18s ${E},color .18s ${E}}
.cx-demo button[aria-pressed="true"]{background:var(--card);box-shadow:0 1px 3px color-mix(in srgb,var(--ink) 14%,transparent)}
.cx-demo input{min-height:36px;padding:0 12px;border:0;border-radius:10px;background:var(--card);font:inherit;font-size:14px;color:var(--ink);width:220px}
@media (prefers-reduced-motion:reduce){.cx *,.cx *::before,.cx *::after{transition-duration:.01ms!important;transition-delay:0s!important;animation-duration:.01ms!important;animation-iteration-count:1!important}.cx-rv{opacity:1;transform:none}}`;

// ---- a page frame for the full-page states (thank-you, 404, forms) ----
const FRAME_CSS = `
.cxw{margin-inline:var(--gutter);border-radius:var(--r);background:var(--bg);box-shadow:0 0 0 1px var(--line);overflow:hidden;isolation:isolate}
.cxw-in{max-width:640px;margin-inline:auto;padding:72px 24px 88px}
@media (max-width:700px){.cxw-in{padding:48px 20px 64px}}`;

// ---- the phone stage for the mobile bars: a page that scrolls, and a bar that sits over it like position:fixed ----
const PHONE_CSS = `
.cxs{display:grid;place-items:center;padding:24px var(--gutter) 56px}
.cx-phone{position:relative;width:min(390px,100%);height:min(78vh,760px);border-radius:40px;overflow:hidden;background:var(--bg);isolation:isolate;
  box-shadow:0 0 0 10px var(--ink),0 32px 64px color-mix(in srgb,var(--ink) 24%,transparent);container-type:inline-size}
.cx-scr{height:100%;overflow:auto;overscroll-behavior:contain;scrollbar-width:none}
.cx-scr::-webkit-scrollbar{display:none}
/* the bar's room is made inside the footer, never as padding under it: padding on body shows as a band of the page
   colour below a dark footer (Profix, 23.9.2026) */
.cx-page{padding-bottom:0}
.cx-hero{min-height:78cqh;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;padding:88px 24px 40px;
  background:linear-gradient(170deg,color-mix(in srgb,var(--accent) 30%,var(--ink)),var(--ink) 70%);color:var(--bg)}
.cx-hero small{font-size:13px;font-weight:600;opacity:.8}
.cx-hero h3{margin:0;font-size:32px;line-height:1.08;font-weight:700}
.cx-hero p{margin:0;font-size:16px;line-height:1.5;opacity:.82}
.cx-hero .cx-btn{align-self:flex-start;margin-top:8px}
.cx-sec{padding:56px 24px}
.cx-sec:nth-of-type(even){background:var(--card)}
.cx-sec small{font-size:13px;font-weight:600;color:var(--muted)}
.cx-sec h4{margin:8px 0 12px;font-size:24px;line-height:1.15}
.cx-sec p{margin:0;font-size:16px;line-height:1.6;color:var(--muted)}
.cx-blk{margin-top:24px;aspect-ratio:4/3;border-radius:20px;background:color-mix(in srgb,var(--ink) 7%,var(--bg))}
.cx-end{padding:56px 24px 40px;background:var(--ink);color:var(--bg)}
.cx-end h4{margin:0 0 8px;font-size:26px;line-height:1.15}
.cx-end p{margin:0 0 24px;opacity:.75}
.cx-end input{display:block;width:100%;min-height:52px;margin-bottom:12px;padding:0 16px;border:0;border-radius:12px;background:color-mix(in srgb,var(--bg) 10%,transparent);
  color:var(--bg);font:inherit;box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--bg) 18%,transparent);transition:box-shadow .18s ${E}}
.cx-end input::placeholder{color:color-mix(in srgb,var(--bg) 55%,transparent)}
.cx-end input:focus{outline:0;box-shadow:inset 0 0 0 2px var(--accent)}
.cx-end .cx-btn{width:100%}
.cx-foot{padding:24px 24px calc(24px + 72px);font-size:13px;color:var(--muted)}

/* ---- the bar itself ---- */
.mbar{position:fixed;inset-inline:0;bottom:0;z-index:40;display:flex;align-items:center;gap:8px;padding:10px 12px max(10px,env(safe-area-inset-bottom));
  background:color-mix(in srgb,var(--card) 92%,transparent);-webkit-backdrop-filter:blur(16px) saturate(1.4);backdrop-filter:blur(16px) saturate(1.4);
  box-shadow:0 -16px 40px color-mix(in srgb,var(--ink) 12%,transparent);
  transform:translateY(calc(100% + 16px));transition:transform .32s ${IO}}
.mbar.is-on{transform:none;transition-timing-function:${E}}
/* mobile only on a real site; inside the vault's phone it shows at any window width */
@media (min-width:768px){.mbar{display:none}}
.cx-phone .mbar{display:flex;position:absolute}
.mb-go{flex:1;min-width:0}
.mb-ic{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:14px;color:var(--ink);background:color-mix(in srgb,var(--ink) 6%,transparent);transition:transform .18s ${E},background .2s ${E}}
.mb-ic svg{width:22px;height:22px}
.mb-ic:active{transform:scale(.94)}`;

// ---- shared scripts ----
const MBAR_JS = `
// the bar's whole job is timing: it appears once the hero's own button has left the screen, steps aside when the final
// contact section is on screen (two identical buttons compete), and hides while a field has focus (the keyboard is up)
function mbar(bar,opt){
  opt=opt||{};
  var ph=bar.closest("[data-phone]"), sc=ph?ph.querySelector("[data-scroller]"):window, root=ph||document;
  var origin=root.querySelector("[data-cta-origin]"), end=root.querySelector("[data-cta-end]"), typing=false, raf=0;
  function box(){return sc===window?{top:0,bottom:innerHeight}:sc.getBoundingClientRect();}
  function upd(){
    raf=0;
    var b=box(), vh=b.bottom-b.top, o=origin&&origin.getBoundingClientRect(), e=end&&end.getBoundingClientRect();
    var past=!o||o.bottom<b.top+8, atEnd=!!e&&e.top<b.bottom-vh*.3, on=past&&!atEnd&&!typing;
    if(on!==bar.classList.contains("is-on")){
      bar.classList.toggle("is-on",on);
      // off screen it must also leave the tab order, or a keyboard user tabs into an invisible button
      if(on)bar.removeAttribute("inert");else bar.setAttribute("inert","");
      if(opt.change)opt.change(on);
    }
    if(opt.tick)opt.tick(b);
  }
  function req(){if(!raf)raf=requestAnimationFrame(upd);}
  sc.addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
  root.addEventListener("focusin",function(ev){if(ev.target.matches("input,textarea,select")){typing=true;upd();}});
  root.addEventListener("focusout",function(ev){if(ev.target.matches("input,textarea,select")){typing=false;setTimeout(upd,160);}});
  bar.setAttribute("inert","");upd();setTimeout(upd,300);
  return upd;
}`;

const HOURS_JS = `
var DAYS=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"], DSHORT=["א׳","ב׳","ג׳","ד׳","ה׳","ו׳","ש׳"];
var MONTHS=["בינואר","בפברואר","במרץ","באפריל","במאי","ביוני","ביולי","באוגוסט","בספטמבר","באוקטובר","בנובמבר","בדצמבר"];
function hoursOf(el){try{return JSON.parse(el.getAttribute("data-hours"));}catch(e){return {"0":[9,18],"1":[9,18],"2":[9,18],"3":[9,18],"4":[9,18],"5":[9,13],"6":null};}}
function hm(m){var h=Math.floor(m/60),mm=m%60;return h+":"+(mm<10?"0":"")+mm;}
function minsOf(d){return d.getHours()*60+d.getMinutes();}
function dayWord(from,to){var a=new Date(from),b=new Date(to);a.setHours(0,0,0,0);b.setHours(0,0,0,0);var n=Math.round((b-a)/864e5);return n===0?"היום":n===1?"מחר":"ביום "+DAYS[b.getDay()];}
// open now until X, or closed and when it opens next
function openState(H,now){
  var t=H[now.getDay()],m=minsOf(now);
  if(t&&m>=t[0]*60&&m<t[1]*60)return {open:true,until:t[1]*60};
  for(var i=0;i<8;i++){var d=new Date(now);d.setDate(now.getDate()+i);var s=H[d.getDay()];if(!s||(i===0&&m>=s[0]*60))continue;d.setHours(0,s[0]*60,0,0);return {open:false,next:d};}
  return {open:false,next:null};
}
// the reply promise: the minutes of the promise are counted only inside business hours, then rounded up to a quarter hour
function replyBy(H,now,sla){
  var left=sla,t=new Date(now);t.setSeconds(0,0);
  for(var g=0;g<14;g++){
    var s=H[t.getDay()],m=minsOf(t);
    if(s&&m<s[1]*60){var start=Math.max(m,s[0]*60),room=s[1]*60-start;
      if(left<=room){t.setHours(0,Math.ceil((start+left)/15)*15,0,0);return t;}
      left-=room;}
    t.setDate(t.getDate()+1);t.setHours(0,0,0,0);
  }
  return t;
}`;

const IN_JS = `
function inView(el,f){
  function chk(){var r=el.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0){off();f();}}
  function off(){removeEventListener("scroll",chk);removeEventListener("resize",chk);}
  addEventListener("scroll",chk,{passive:true});addEventListener("resize",chk);requestAnimationFrame(chk);setTimeout(chk,300);
}`;

// the conversion event fires once per session: a refresh, or the back button from the next page, is not a second lead
const LEAD_JS = `
function fireLead(){
  try{if(sessionStorage.getItem("lead-fired"))return;sessionStorage.setItem("lead-fired","1");}catch(e){}
  (window.dataLayer=window.dataLayer||[]).push({event:"generate_lead"});
  if(typeof window.fbq==="function")window.fbq("track","Lead");
}`;

const LEV_JS = `
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++)d[i]=[i];for(j=0;j<=n;j++)d[0][j]=j;
  for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d;}`;

// a short page for the phone. sec() takes an optional data-cta for cv2.
const sec = (small, title, text, cta) => `<section class="cx-sec"${cta ? ` data-cta="${cta}"` : ""}><small>${small}</small><h4>${title}</h4><p>${text}</p><div class="cx-blk"></div></section>`;
const phonePage = (id, heroCta, sections) => `<div class="cx-scr" data-scroller tabindex="0" aria-label="דמו: עמוד בטלפון, גוללים בתוכו">
<div class="cx-page">
  <header class="cx-hero"${heroCta ? ` data-cta="${heroCta}"` : ""}><small>סטודיו לעיצוב פנים</small><h3>בית שמרגיש נכון בשמונה בבוקר</h3><p>גוללים למטה: הפס מופיע ברגע שהכפתור של ההירו יוצא מהמסך.</p><a class="cx-btn" href="#${id}-end" data-cta-origin>לתיאום שיחה</a></header>
  ${sections}
  <section class="cx-end" id="${id}-end" data-cta-end><h4>נתחיל בשיחה קצרה</h4><p>כאן הפס יורד: הכפתור של הסקשן לא צריך מתחרה.</p>
    <input type="text" placeholder="שם" aria-label="שם" autocomplete="name"><input type="tel" placeholder="טלפון" aria-label="טלפון" dir="ltr" autocomplete="tel"><button class="cx-btn" type="button">שליחה</button></section>
  <p class="cx-foot">הפוטר של האתר</p>
</div></div>`;

export default [
{
  id:"cv1", cat:"conv", name:"פס פעולה בטלפון עם בורר ערוצים ושעות חיות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"פס תחתון לטלפון: כפתור ראשי אחד, ולידו \"דברו איתנו\" שפותח שלושה ערוצים (וואטסאפ, שיחה, מייל) עם זמן התגובה של כל אחד, ושורה חיה שאומרת אם העסק פתוח עכשיו ומתי ייפתח.",
  when:"עסק שהלידים שלו מגיעים מהטלפון ובכמה ערוצים: שירות מקצועי, קליניקה, קבלן, סטודיו. בנחיתה עם פעולה אחת בלבד עדיף cv2 או b03.",
  libs:[],
  css:`${ATOMS_CSS}${PHONE_CSS}
.cv1-bar .mb-go{min-width:0}
.mb-talk{position:relative;display:inline-flex;align-items:center;gap:8px;min-height:52px;padding:0 16px;border:0;border-radius:14px;background:color-mix(in srgb,var(--ink) 6%,transparent);
  color:var(--ink);font:inherit;font-size:15px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .2s ${E},transform .18s ${E}}
.mb-talk:active{transform:scale(.96)}
.sheet-open .mb-talk{background:var(--ink);color:var(--bg)}
.mb-dot{width:8px;height:8px;border-radius:50%;background:var(--muted);flex:none}
.is-open-now .mb-dot{background:#2f9e5b;box-shadow:0 0 0 3px color-mix(in srgb,#2f9e5b 22%,transparent)}
/* the sheet grows out of the button that opened it */
.mb-sheet{position:absolute;bottom:calc(100% + 10px);inset-inline-end:12px;width:min(300px,calc(100cqw - 24px));padding:8px;border-radius:20px;background:var(--card);
  box-shadow:0 24px 56px color-mix(in srgb,var(--ink) 22%,transparent),0 0 0 1px color-mix(in srgb,var(--ink) 6%,transparent);
  transform-origin:bottom left;opacity:0;transform:translateY(8px) scale(.96);visibility:hidden;
  transition:opacity .18s ${E},transform .24s ${E},visibility 0s linear .24s}
[dir="ltr"] .mb-sheet{transform-origin:bottom right}
.sheet-open .mb-sheet{opacity:1;transform:none;visibility:visible;transition-delay:0s}
.mb-status{display:flex;align-items:center;gap:10px;margin:0;padding:10px 12px 12px;font-size:13px;font-weight:600;color:var(--muted)}
.mb-sheet ul{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.mb-sheet li{opacity:0;transform:translateY(6px);transition:opacity .2s ${E},transform .24s ${E}}
.sheet-open .mb-sheet li{opacity:1;transform:none;transition-delay:calc(60ms + var(--i) * 60ms)}
.mb-sheet a{display:flex;align-items:center;gap:14px;min-height:56px;padding:8px 12px;border-radius:14px;text-decoration:none;transition:background .18s ${E}}
.mb-sheet a:active{background:color-mix(in srgb,var(--ink) 6%,transparent)}
@media (hover:hover) and (pointer:fine){.mb-sheet a:hover{background:color-mix(in srgb,var(--ink) 5%,transparent)}}
.mb-sheet a > svg{width:22px;height:22px;flex:none;color:var(--accent)}
.mb-sheet b{display:block;font-size:15px;line-height:1.3}
.mb-sheet small{display:block;font-size:13px;line-height:1.4;color:var(--muted)}`,
  html:`<div class="cx cxs" id="cv1"><div class="cx-phone" data-phone>
${phonePage("cv1", "", sec("שירותים", "תכנון מלא, מהקיר ועד הידית", "שלב אחד, איש קשר אחד, ולוח זמנים שמחזיק.") + sec("עבודות", "דירה ברמת גן, 4 חדרים", "מטבח פתוח, אחסון שלא רואים, ואור שנכנס עד הסלון.") + sec("תהליך", "שלושה מפגשים עד תוכנית", "סיור, קונספט, תוכנית עבודה. בלי הפתעות בדרך."))}
  <div class="mbar cv1-bar" data-mbar data-hours='${HOURS}' role="region" aria-label="יצירת קשר מהירה">
    <a class="cx-btn mb-go" href="#cv1-end">השאירו פרטים</a>
    <button class="mb-talk" type="button" aria-expanded="false" aria-controls="cv1-sheet"><i class="mb-dot" aria-hidden="true"></i>דברו איתנו</button>
    <div class="mb-sheet" id="cv1-sheet">
      <p class="mb-status"><i class="mb-dot" aria-hidden="true"></i><span data-live>פתוח עכשיו</span></p>
      <ul>
        <li style="--i:0"><a data-wa href="https://wa.me/972500000000">${I.wa}<span><b>וואטסאפ</b><small>בדרך כלל עונים תוך שעה</small></span></a></li>
        <li style="--i:1"><a href="tel:+972500000000">${I.tel}<span><b>שיחה</b><small dir="ltr">050-000-0000</small></span></a></li>
        <li style="--i:2"><a href="mailto:hello@example.co.il">${I.mail}<span><b>מייל</b><small>תשובה עד סוף יום העבודה</small></span></a></li>
      </ul>
    </div>
  </div>
</div></div>`,
  js:`${MBAR_JS}${HOURS_JS}
(function(){
  var bar=document.querySelector("#cv1 [data-mbar]"),btn=bar.querySelector(".mb-talk"),sheet=bar.querySelector(".mb-sheet"),H=hoursOf(bar);
  function paint(){
    var now=new Date(),s=openState(H,now),t;
    if(s.open)t="פתוח עכשיו · עד "+hm(s.until);
    else if(s.next)t="סגור עכשיו · נפתח "+dayWord(now,s.next)+" ב-"+hm(minsOf(s.next));
    else t="סגור עכשיו";
    bar.querySelector("[data-live]").textContent=t;bar.classList.toggle("is-open-now",s.open);
  }
  paint();setInterval(paint,60000);
  // focus moves into the sheet only when it was opened from the keyboard (click detail 0); a tap leaves no ring behind
  function open(o,kbd){
    bar.classList.toggle("sheet-open",o);btn.setAttribute("aria-expanded",String(o));
    if(o&&kbd)setTimeout(function(){var a=sheet.querySelector("a");if(a)a.focus({preventScroll:true});},80);
  }
  btn.addEventListener("click",function(e){open(!bar.classList.contains("sheet-open"),e.detail===0);});
  document.addEventListener("pointerdown",function(e){if(bar.classList.contains("sheet-open")&&!bar.contains(e.target))open(false);});
  bar.addEventListener("keydown",function(e){if(e.key==="Escape"&&bar.classList.contains("sheet-open")){open(false);btn.focus();}});
  sheet.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){open(false);});});
  // WhatsApp opens with the page the visitor came from, so the first message is not a bare "hi"
  var page=document.title.split("|")[0].trim();
  sheet.querySelector("[data-wa]").href="https://wa.me/972500000000?text="+encodeURIComponent("היי, הגעתי מהאתר ("+page+") ואשמח לשמוע פרטים");
  mbar(bar,{change:function(on){if(!on)open(false);}});
})();`,
  note:"הגרסה הבנאלית היא פס עם שלושה כפתורים צמודים (התקשר, וואטסאפ, השאר פרטים) שמופיע מהשנייה הראשונה ומכסה את הטופס בתחתית. כאן יש כפתור ראשי אחד, והערוצים מחכים מאחורי \"דברו איתנו\" עם מה שהגולש באמת שואל: כמה מהר עונים, והאם פתוח עכשיו (נקודה ירוקה, או \"נפתח מחר ב-9:00\"). הפס מופיע רק אחרי שהכפתור של ההירו יצא מהמסך, יורד כשסקשן הטופס על המסך, ויורד כשיש פוקוס בשדה כי המקלדת פתוחה. כשהוא מוסתר הוא inert, כדי שמקלדת לא תיכנס לכפתור שאי אפשר לראות. הוואטסאפ נפתח עם שם העמוד. באתר: position:fixed, safe-area לאייפון, ו-padding-bottom לגוף העמוד בגובה הפס. שעות הפעילות ב-data-hours.",
},
{
  id:"cv2", cat:"conv", name:"פס פעולה שמשנה את הפעולה לפי המקטע", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הכפתור בפס התחתון אומר מה הגולש רוצה במקום שבו הוא נמצא: בשירותים \"לבחירת שירות\", בעבודות \"לפרויקט כזה אצלכם\", במחירים \"לבדיקת מחיר מדויק\". המילים מתחלפות בתנועה קצרה, ומעליהן שם המקטע.",
  when:"דף נחיתה ארוך או וואן-פייג'ר עם מקטעים שונים באופיים (שירותים, עבודות, מחירים, שאלות). באתר שבו כל העמוד מוביל לאותה פעולה, cv1 או b03 מספיקים.",
  libs:[],
  css:`${ATOMS_CSS}${PHONE_CSS}
.cv2-bar .mb-go{justify-content:space-between;padding:0 20px;overflow:hidden}
.mb-txt{display:grid;text-align:start;line-height:1.2;transition:transform .2s ${E},opacity .2s ${E}}
.mb-txt small{font-size:12px;font-weight:600;opacity:.72}
.mb-txt span{font-size:16px}
.cv2-bar.is-swapping .mb-txt{transform:translateY(-40%);opacity:0;transition-duration:.14s}
.cv2-bar.is-entering .mb-txt{transform:translateY(40%);opacity:0;transition:none}
/* the first time it arrives the arrow points once, then never again */
.cv2-bar.nudge .ic-arr{animation:cv2-nudge .8s ${E} .3s 1}
@keyframes cv2-nudge{0%,100%{transform:none}40%{transform:translateX(-6px)}}`,
  html:`<div class="cx cxs" id="cv2"><div class="cx-phone" data-phone>
${phonePage("cv2", "לתיאום שיחה|#cv2-end|פתיחה", sec("שירותים", "תכנון מלא, מהקיר ועד הידית", "שלב אחד, איש קשר אחד, ולוח זמנים שמחזיק.", "לבחירת שירות|#cv2-end|שירותים") + sec("עבודות", "דירה ברמת גן, 4 חדרים", "מטבח פתוח, אחסון שלא רואים, ואור שנכנס עד הסלון.", "לפרויקט כזה אצלכם|#cv2-end|עבודות") + sec("מחירים", "שלוש חבילות, מחיר סגור מראש", "לא לפי שעה. אם משהו משתנה, מדברים לפני.", "לבדיקת מחיר מדויק|#cv2-end|מחירים"))}
  <div class="mbar cv2-bar" data-mbar role="region" aria-label="הצעד הבא">
    <a class="cx-btn mb-go" href="#cv2-end"><span class="mb-txt"><small data-where>שירותים</small><span data-lab>לבחירת שירות</span></span>${I.arrow}</a>
    <a class="mb-ic" href="tel:+972500000000" aria-label="חיוג: 050-000-0000">${I.tel}</a>
  </div>
</div></div>`,
  js:`${MBAR_JS}
(function(){
  var root=document.getElementById("cv2"),bar=root.querySelector("[data-mbar]"),go=bar.querySelector(".mb-go"),lab=bar.querySelector("[data-lab]"),where=bar.querySelector("[data-where]");
  var secs=[].slice.call(root.querySelectorAll("[data-cta]")),cur=null,first=true,t=0;
  function swap(s){
    var p=s.getAttribute("data-cta").split("|");cur=s;go.setAttribute("href",p[1]||"#");
    if(lab.textContent===p[0])return;
    clearTimeout(t);bar.classList.add("is-swapping");
    t=setTimeout(function(){
      lab.textContent=p[0];where.textContent=p[2]||"";
      bar.classList.remove("is-swapping");bar.classList.add("is-entering");void bar.offsetWidth;bar.classList.remove("is-entering");
    },140);
  }
  mbar(bar,{
    // the section under the upper half of the screen is the one being read
    tick:function(b){var line=b.top+(b.bottom-b.top)*.45,pick=null;secs.forEach(function(s){var r=s.getBoundingClientRect();if(r.top<=line&&r.bottom>line)pick=s;});if(pick&&pick!==cur)swap(pick);},
    change:function(on){if(on&&first){first=false;bar.classList.add("nudge");setTimeout(function(){bar.classList.remove("nudge");},1200);}}
  });
})();`,
  note:"הגרסה הבנאלית: אותו \"צור קשר\" בפס מההתחלה עד הסוף. כאן הכפתור ממשיך את המשפט שהגולש קורא, ולכן נלחץ יותר: מי שנמצא בתמחור רוצה מחיר, לא \"צור קשר\". כל מקטע מחזיק data-cta עם שלושה חלקים: \"תווית|קישור|שם המקטע\". המקטע שנבחר הוא זה שנמצא מתחת ל-45% מגובה המסך. ההחלפה היא שתי תנועות קצרות: המילים הישנות עולות ונעלמות ב-140ms, החדשות עולות מלמטה, ושם המקטע מתחלף איתן. הכפתור ברוחב קבוע ולכן לא קופץ. החץ מצביע פעם אחת בכניסה הראשונה, ולא יותר. אין aria-live על התווית במכוון: הקראה בכל גלילה מעייפת, והשם הנגיש של הקישור מתעדכן ממילא. אותם כללי תזמון כמו cv1: אחרי כפתור ההירו, לא ליד הטופס, ולא כשהמקלדת פתוחה.",
},
{
  id:"cv3", cat:"conv", name:"עמוד תודה עם ציר \"מה קורה עכשיו\"", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"סימן וי שמצטייר, תודה עם השם של מי שהשאיר את הפרטים, וציר של שלושה צעדים: קיבלנו (עם השעה), שיחה קצרה (ומאיזה מספר נתקשר), והצעה מסודרת. בסוף שני קישורים לקריאה בינתיים.",
  when:"כל טופס ליד באתר תדמית או שירות. זו ברירת המחדל לעמוד תודה. כשיש שעות פעילות ברורות, cv4 נותן הבטחה מדויקת יותר; כשנקבעה פגישה, cv5.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.ty-check{width:56px;height:56px;margin-bottom:24px;fill:none;stroke:var(--accent);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.ty-check circle{stroke-dasharray:164;stroke-dashoffset:164;transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .7s ${E}}
.ty-check path{stroke-dasharray:36;stroke-dashoffset:36;transition:stroke-dashoffset .35s ${E} .5s}
.is-in .ty-check circle,.is-in .ty-check path{stroke-dashoffset:0}
.ty-h{margin:0 0 12px;font-size:clamp(30px,4vw,44px);line-height:1.1;font-weight:700}
.ty-lead{margin:0 0 32px;color:var(--muted);font-size:17px}
.ty-steps{position:relative;list-style:none;margin:0 0 48px;padding:0;display:grid;gap:28px}
/* the track is the information here (how far along), not a divider */
.ty-steps::before,.ty-steps::after{content:"";position:absolute;inset-inline-start:11px;top:12px;bottom:12px;width:2px;border-radius:2px;background:color-mix(in srgb,var(--ink) 10%,transparent)}
.ty-steps::after{bottom:auto;height:var(--fill,0px);background:var(--accent);transform:scaleY(0);transform-origin:top;transition:transform .6s ${E} .9s}
.is-in .ty-steps::after{transform:scaleY(1)}
.ty-steps li{position:relative;display:grid;grid-template-columns:24px 1fr;gap:16px;align-items:start}
.ty-steps li > i{position:relative;z-index:1;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--bg);box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--ink) 18%,transparent)}
.ty-steps li.is-done > i{background:var(--accent);box-shadow:none;color:var(--accent-ink)}
.ty-steps li.is-done > i svg{width:14px;height:14px}
.ty-steps li.is-now > i{box-shadow:inset 0 0 0 2px var(--accent)}
.ty-steps li.is-now > i::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}
/* two soft rings, then still: it says "this is where you are", it does not nag */
.is-in .ty-steps li.is-now > i::before{content:"";position:absolute;inset:-2px;border-radius:50%;box-shadow:0 0 0 2px var(--accent);animation:ty-ring 1.4s ${E} 1.3s 2 both}
@keyframes ty-ring{from{transform:scale(1);opacity:.6}to{transform:scale(1.9);opacity:0}}
.ty-steps b{display:block;font-size:17px;line-height:1.3}
.ty-steps small{display:block;margin-top:4px;font-size:15px;line-height:1.5;color:var(--muted)}
.ty-steps li:not(.is-done):not(.is-now) b{color:var(--muted)}
.ty-more > small{display:block;margin-bottom:12px;font-size:13px;font-weight:600;color:var(--muted)}
.ty-more div{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ty-more a{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:64px;padding:16px 20px;border-radius:16px;background:var(--card);text-decoration:none;font-weight:600;
  transition:transform .2s ${E},box-shadow .2s ${E}}
.ty-more a svg{width:20px;height:20px}
@media (hover:hover) and (pointer:fine){.ty-more a:hover{transform:translateY(-2px);box-shadow:0 12px 28px color-mix(in srgb,var(--ink) 10%,transparent)}}
@media (max-width:560px){.ty-more div{grid-template-columns:1fr}}`,
  html:`<div class="cx cxw"><div class="cxw-in" id="cv3" data-thanks data-demo-name="דנה">
  <svg class="ty-check" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26"/><path d="M18 29l7 7 14-15"/></svg>
  <h2 class="ty-h cx-rv">תודה<span data-name-wrap>, <span data-name></span></span>. הפרטים אצלנו.</h2>
  <p class="ty-lead cx-rv" style="--i:1">ככה זה ממשיך מכאן, כדי שלא תצטרכו לנחש:</p>
  <ol class="ty-steps cx-rv" style="--i:2">
    <li class="is-done"><i>${I.check}</i><div><b>קיבלנו את הפנייה</b><small>היום, <span class="cx-t" data-now>14:32</span></small></div></li>
    <li class="is-now"><i></i><div><b>שיחה קצרה איתך</b><small>בדרך כלל תוך שעתיים, בשעות הפעילות. נתקשר מ-<span class="cx-t" dir="ltr">050-000-0000</span>, כדאי לשמור אותו.</small></div></li>
    <li><i></i><div><b>הצעה מסודרת במייל</b><small>אחרי השיחה, בתוך יום עבודה</small></div></li>
  </ol>
  <div class="ty-more cx-rv" style="--i:3"><small>בינתיים, אם בא לכם</small><div><a href="#cv3">איך אנחנו עובדים ${I.arrow}</a><a href="#cv3">פרויקטים אחרונים ${I.arrow}</a></div></div>
</div></div>`,
  js:`${IN_JS}${LEAD_JS}
(function(){
  var root=document.getElementById("cv3"),q=new URLSearchParams(location.search),n="";
  // the name: from ?name= (the form redirects with it) or from what the form stored; on a real site no demo fallback
  try{n=q.get("name")||sessionStorage.getItem("lead-name")||"";}catch(e){}
  n=(n||root.getAttribute("data-demo-name")||"").trim().split(" ")[0];
  if(n)root.querySelector("[data-name]").textContent=n;else root.querySelector("[data-name-wrap]").remove();
  var d=new Date();root.querySelector("[data-now]").textContent=d.getHours()+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();
  // the progress track fills from the first marker to the current one
  var ol=root.querySelector(".ty-steps"),now=ol.querySelector(".is-now > i"),first=ol.querySelector("li > i");
  function fill(){ol.style.setProperty("--fill",(now.getBoundingClientRect().top-first.getBoundingClientRect().top)+"px");}
  fill();addEventListener("resize",fill);
  inView(root,function(){root.classList.add("is-in");fireLead();});
})();`,
  note:"הגרסה הבנאלית: \"תודה! נחזור אליך בהקדם\" על מסך ריק. הרגע שאחרי השליחה הוא הרגע שבו הגולש הכי קשוב, והעמוד עונה על שלוש השאלות שיש לו: שזה עבר (וי שמצטייר, והשעה המדויקת), מה קורה עכשיו (הצעד הנוכחי מסומן בשתי טבעות רכות ואז נעצר), ומאיזה מספר יתקשרו, כי שיחה ממספר לא מוכר היא הסיבה הנפוצה לליד שלא עונה. הציר מתמלא עד הצעד הנוכחי. השם מגיע מ-?name= או מ-sessionStorage שהטופס שמר, רק השם הפרטי. אירוע ההמרה (dataLayer generate_lead ו-fbq Lead) נורה פעם אחת בסשן, ולכן רענון או חזרה אחורה לא סופרים ליד כפול. באתר: noindex לעמוד הזה, והטופס מפנה אליו רק אחרי תשובה מוצלחת מהשרת.",
},
{
  id:"cv4", cat:"conv", name:"עמוד תודה עם זמן חזרה אמיתי", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"במקום \"נחזור בהקדם\", העמוד מחשב מתי באמת: \"נחזור אליך היום עד 16:30\", \"מחר עד 11:00\", או \"ביום ראשון עד 11:00\", לפי שעות הפעילות וזמן התגובה של העסק. רצועת שבוע מראה את היום, וסמן זז ממנו אל יום החזרה.",
  when:"עסק עם שעות פעילות קבועות ולידים שמגיעים גם בערב ובסופ\"ש: שירות מקצועי, מרפאה, משרד. זו ההבטחה שמורידה את הלחץ להתקשר לעוד שלושה ספקים באותו ערב.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.t4-ok{display:inline-flex;align-items:center;gap:8px;margin:0 0 16px;font-size:15px;font-weight:600;color:var(--accent)}
.t4-ok svg{width:20px;height:20px}
.t4-h{margin:0 0 12px;font-size:clamp(30px,4.2vw,48px);line-height:1.08;font-weight:700}
.t4-h b{display:inline-block;color:var(--accent);transition:opacity .2s ${E},transform .2s ${E}}
.t4-h b.is-out{opacity:0;transform:translateY(-8px)}
.t4-why{margin:0 0 32px;color:var(--muted)}
.t4-week{position:relative;display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin:0 0 40px;padding-top:32px}
.t4-d{display:grid;justify-items:center;gap:2px;padding:10px 0;border-radius:12px;background:var(--card);transition:background .3s ${E},color .3s ${E}}
.t4-d small{font-size:12px;font-weight:600;color:var(--muted)}
.t4-d b{font-size:17px;font-variant-numeric:tabular-nums}
.t4-d.is-closed{background:transparent;color:color-mix(in srgb,var(--ink) 35%,transparent)}
.t4-d.is-today small{color:var(--ink)}
.t4-d.is-reply{background:var(--accent);color:var(--accent-ink)}
.t4-d.is-reply small{color:inherit;opacity:.8}
/* the pin travels from today to the reply day: the distance is the promise */
.t4-pin{position:absolute;top:0;inset-inline-start:0;width:calc((100% - 36px) / 7);display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--accent);
  transform:translateX(var(--x,0px));transition:transform .7s ${IO}}
.t4-pin::after{content:"";width:6px;height:6px;margin-top:4px;border-radius:50%;background:var(--accent)}
.t4-act{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.t4-act small{color:var(--muted);font-size:14px}`,
  html:`<div class="cx cxw"><div class="cxw-in" id="cv4" data-thanks data-hours='${HOURS}' data-sla="120">
  <div class="cx-demo" role="group" aria-label="הדמיה: מתי נשלח הטופס"><span>נשלח ב:</span><button type="button" data-at="now" aria-pressed="true">עכשיו</button><button type="button" data-at="4,17,30" aria-pressed="false">חמישי 17:30</button><button type="button" data-at="5,14,0" aria-pressed="false">שישי 14:00</button><button type="button" data-at="6,21,0" aria-pressed="false">מוצאי שבת</button></div>
  <p class="t4-ok cx-rv">${I.check}הפנייה התקבלה</p>
  <h2 class="t4-h cx-rv" style="--i:1">נחזור אליך <b data-when>היום עד 16:30</b></h2>
  <p class="t4-why cx-rv" style="--i:2">לפי שעות הפעילות: ראשון עד חמישי <span class="cx-t">9:00</span> עד <span class="cx-t">18:00</span>, שישי עד <span class="cx-t">13:00</span>. תוך שעתיים עבודה, לא יותר.</p>
  <div class="t4-week cx-rv" style="--i:3" data-week aria-hidden="true"><span class="t4-pin">נחזור</span></div>
  <div class="t4-act cx-rv" style="--i:4"><a class="cx-btn is-ghost" data-wa href="https://wa.me/972500000000">${I.wa}צריכים מהר יותר? וואטסאפ</a><small>בשעות הפעילות עונים שם תוך דקות</small></div>
</div></div>`,
  js:`${IN_JS}${LEAD_JS}${HOURS_JS}
(function(){
  var root=document.getElementById("cv4"),H=hoursOf(root),sla=+root.getAttribute("data-sla")||120,week=root.querySelector("[data-week]"),pin=week.querySelector(".t4-pin"),when=root.querySelector("[data-when]"),at=null;
  function render(now,animate){
    var r=replyBy(H,now,sla),txt=dayWord(now,r)+" עד "+hm(minsOf(r));
    if(animate&&when.textContent!==txt){when.classList.add("is-out");setTimeout(function(){when.textContent=txt;when.classList.remove("is-out");},200);}else when.textContent=txt;
    week.querySelectorAll(".t4-d").forEach(function(e){e.remove();});
    var chips=[],base=new Date(now);base.setHours(0,0,0,0);
    for(var i=0;i<7;i++){var d=new Date(base);d.setDate(base.getDate()+i);var c=document.createElement("span");c.className="t4-d";
      c.innerHTML="<small></small><b></b>";c.firstChild.textContent=i===0?"היום":DSHORT[d.getDay()];c.lastChild.textContent=d.getDate();
      if(!H[d.getDay()])c.classList.add("is-closed");if(i===0)c.classList.add("is-today");week.appendChild(c);chips.push(c);}
    var ri=Math.round((new Date(r).setHours(0,0,0,0)-base)/864e5);
    // the pin starts on today and walks to the reply day, so the wait is something you see, not a sentence you parse
    pin.style.transition="none";pin.style.setProperty("--x","0px");void pin.offsetWidth;pin.style.transition="";
    setTimeout(function(){
      var c=chips[Math.min(ri,6)],wr=week.getBoundingClientRect(),cr=c.getBoundingClientRect(),rtl=getComputedStyle(week).direction==="rtl";
      pin.style.setProperty("--x",(rtl?cr.right-wr.right:cr.left-wr.left)+"px");c.classList.add("is-reply");
    },animate?250:700);
  }
  root.querySelectorAll("[data-at]").forEach(function(b){b.addEventListener("click",function(){
    root.querySelectorAll("[data-at]").forEach(function(x){x.setAttribute("aria-pressed",String(x===b));});
    var v=b.getAttribute("data-at");
    if(v==="now")at=null;else{var p=v.split(","),d=new Date();d.setDate(d.getDate()+((+p[0]-d.getDay()+7)%7));d.setHours(+p[1],+p[2],0,0);at=d;}
    render(at||new Date(),true);
  });});
  render(new Date(),false);
  inView(root,function(){root.classList.add("is-in");fireLead();});
})();`,
  note:"הגרסה הבנאלית מבטיחה \"בהקדם\", ומי ששולח ביום חמישי בערב מבין שמישהו יחזור אליו אולי ביום ראשון. אז הוא ממשיך לחפש ספקים באותו ערב. כאן ההבטחה מחושבת: זמן התגובה (data-sla, בדקות) נספר רק בתוך שעות הפעילות (data-hours), ומתעגל כלפי מעלה לרבע שעה. כך, שעתיים מחמישי ב-17:30 הן \"ביום ראשון עד 10:30\". רצועת השבוע מראה ימים סגורים בדהייה, והסמן יוצא מהיום והולך אל יום החזרה בתנועה אחת. כפתור ההדמיה בראש העמוד לא שייך לעמוד האמיתי: הוא מאפשר לראות את החישוב בשעות שונות. ההמרה נורית פעם אחת בסשן, כמו ב-cv3.",
},
{
  id:"cv5", cat:"conv", name:"עמוד תודה עם הכנה לשיחה ותזכורת ביומן", tech:"CSS · JS · ICS", status:"ממתין", runway:false,
  desc:"כשהטופס קבע פגישה: כרטיס עם היום והשעה, הוספה ליומן בלחיצה (גוגל, או קובץ לאאוטלוק ולאייפון עם תזכורת רבע שעה לפני), ושלושה דברים להכין לשיחה, עם סימון שנשמר ומונה.",
  when:"כל טופס שקובע שיחה או פגישה: שיחת היכרות, אבחון, ייעוץ ראשוני, תיאום ביקור. לפגישה שלא תואמה עדיין, cv3 או cv4.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.t5-h{margin:0 0 24px;font-size:clamp(30px,4vw,44px);line-height:1.1;font-weight:700}
.t5-card{display:grid;grid-template-columns:auto 1fr;gap:6px 20px;align-items:center;margin:0 0 16px;padding:24px;border-radius:20px;background:var(--ink);color:var(--bg)}
.t5-date{grid-row:span 2;display:grid;place-items:center;width:72px;height:72px;border-radius:16px;background:color-mix(in srgb,var(--bg) 10%,transparent);line-height:1}
.t5-date small{font-size:12px;font-weight:600;opacity:.7}
.t5-date b{font-size:30px;font-variant-numeric:tabular-nums}
.t5-when{display:grid;gap:2px;margin:0;font-size:19px;font-weight:700;line-height:1.3}
.t5-when span + span{font-size:17px;font-weight:600;opacity:.85}
.t5-how{margin:0;font-size:15px;opacity:.72}
.t5-cal{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 48px}
.t5-cal .cx-btn{flex:1 1 200px;min-height:48px;font-size:15px}
.t5-cal .is-ghost svg{color:var(--accent)}
.t5-prep h3{margin:0 0 4px;font-size:20px}
.t5-prep > p{margin:0 0 16px;color:var(--muted);font-size:15px}
.t5-prep > p b{display:inline-block;color:var(--ink);font-variant-numeric:tabular-nums;transition:transform .25s ${E}}
.t5-prep > p b.bump{transform:scale(1.25)}
.t5-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.t5-list label{display:grid;grid-template-columns:28px 1fr;gap:14px;align-items:start;padding:14px 16px;border-radius:14px;background:var(--card);cursor:pointer;transition:background .2s ${E}}
.t5-list input{position:absolute;opacity:0;width:1px;height:1px}
.t5-box{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--ink) 22%,transparent);transition:background .2s ${E},box-shadow .2s ${E}}
.t5-box svg{width:18px;height:18px;color:var(--accent-ink);stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .3s ${E}}
.t5-list input:checked + .t5-box{background:var(--accent);box-shadow:none}
.t5-list input:checked + .t5-box svg{stroke-dashoffset:0}
.t5-list input:focus-visible + .t5-box{outline:2px solid var(--accent);outline-offset:3px}
.t5-list b{display:block;font-size:16px;line-height:1.4;transition:color .2s ${E}}
.t5-list small{display:block;font-size:14px;color:var(--muted)}
.t5-list input:checked ~ span b{color:var(--muted)}
.t5-ready{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ${E}}
.t5-ready > p{overflow:hidden;min-height:0;margin:0;font-weight:600;color:var(--accent)}
.t5-ready.is-on{grid-template-rows:1fr}
.t5-ready.is-on > p{padding-top:16px}`,
  html:`<div class="cx cxw"><div class="cxw-in" id="cv5" data-thanks data-hours='${HOURS}'>
  <h2 class="t5-h cx-rv">השיחה נקבעה. נתראה שם.</h2>
  <div class="t5-card cx-rv" style="--i:1"><div class="t5-date"><small data-mon>ספט׳</small><b data-day>29</b></div><p class="t5-when"><span data-date>יום שני, 29 בספטמבר</span><span class="cx-t" data-time>10:00 עד 10:20</span></p><p class="t5-how">שיחת וידאו. הקישור יגיע במייל ובוואטסאפ.</p></div>
  <div class="t5-cal cx-rv" style="--i:2"><a class="cx-btn" data-gcal href="#" target="_blank" rel="noopener">${I.cal}הוספה ליומן גוגל</a><button class="cx-btn is-ghost" type="button" data-ics>${I.cal}אאוטלוק ואייפון</button></div>
  <div class="t5-prep cx-rv" style="--i:3">
    <h3>שלושה דברים שיקצרו את השיחה</h3>
    <p>הכנתם <b data-done>0</b> מתוך 3</p>
    <ul class="t5-list">
      <li><label><input type="checkbox" data-k="plan"><span class="t5-box">${I.check}</span><span><b>תוכנית או צילום של הדירה</b><small>גם צילום מהטלפון של תוכנית ישנה מספיק</small></span></label></li>
      <li><label><input type="checkbox" data-k="refs"><span class="t5-box">${I.check}</span><span><b>שלוש תמונות שאהבתם</b><small>מפינטרסט, מאינסטגרם, מכל מקום</small></span></label></li>
      <li><label><input type="checkbox" data-k="budget"><span class="t5-box">${I.check}</span><span><b>טווח תקציב בערך</b><small>לא צריך מדויק, רק כדי שנדבר על מה שאפשרי</small></span></label></li>
    </ul>
    <div class="t5-ready" aria-live="polite"><p data-ready>הכל מוכן. נתראה ביום שני ב-10:00.</p></div>
  </div>
</div></div>`,
  js:`${IN_JS}${LEAD_JS}${HOURS_JS}
(function(){
  var root=document.getElementById("cv5"),H=hoursOf(root),q=new URLSearchParams(location.search),start=q.get("slot")?new Date(q.get("slot")):null,MIN=20,KEY="cv5-prep";
  // no ?slot= in the demo: the next working day at 10:00
  if(!start||isNaN(start)){start=new Date();for(var i=1;i<8;i++){var d=new Date();d.setDate(d.getDate()+i);if(H[d.getDay()]){start=d;break;}}start.setHours(10,0,0,0);}
  var end=new Date(start.getTime()+MIN*60000),tm=hm(minsOf(start)),SHORTMON=["ינו׳","פבר׳","מרץ","אפר׳","מאי","יוני","יולי","אוג׳","ספט׳","אוק׳","נוב׳","דצמ׳"];
  root.querySelector("[data-mon]").textContent=SHORTMON[start.getMonth()];root.querySelector("[data-day]").textContent=start.getDate();
  root.querySelector("[data-date]").textContent="יום "+DAYS[start.getDay()]+", "+start.getDate()+" "+MONTHS[start.getMonth()];
  root.querySelector("[data-time]").textContent=tm+" עד "+hm(minsOf(end));
  root.querySelector("[data-ready]").textContent="הכל מוכן. נתראה "+dayWord(new Date(),start)+" ב-"+tm+".";
  function p2(n){return (n<10?"0":"")+n;}
  function stamp(d){return d.getFullYear()+p2(d.getMonth()+1)+p2(d.getDate())+"T"+p2(d.getHours())+p2(d.getMinutes())+"00";}
  var title="שיחת היכרות עם הסטודיו",det="הקישור לשיחה יגיע במייל. להכין: תוכנית, שלוש תמונות, טווח תקציב.";
  root.querySelector("[data-gcal]").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(title)+"&dates="+stamp(start)+"/"+stamp(end)+"&ctz=Asia/Jerusalem&details="+encodeURIComponent(det);
  // one file that Outlook, Apple Calendar and Android all open, with a reminder 15 minutes before
  root.querySelector("[data-ics]").addEventListener("click",function(){
    var NL=String.fromCharCode(13,10),now=new Date();
    var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//site//conv//HE","BEGIN:VEVENT","UID:"+now.getTime()+"@site","DTSTAMP:"+stamp(now),
      "DTSTART;TZID=Asia/Jerusalem:"+stamp(start),"DTEND;TZID=Asia/Jerusalem:"+stamp(end),"SUMMARY:"+title,"DESCRIPTION:"+det,
      "BEGIN:VALARM","TRIGGER:-PT15M","ACTION:DISPLAY","DESCRIPTION:"+title,"END:VALARM","END:VEVENT","END:VCALENDAR"].join(NL);
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));a.download="meeting.ics";document.body.appendChild(a);a.click();
    setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);
  });
  // the checklist remembers itself: they come back to this tab the evening before
  var saved={};try{saved=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){}
  var boxes=[].slice.call(root.querySelectorAll("[data-k]")),done=root.querySelector("[data-done]"),ready=root.querySelector(".t5-ready");
  function count(bump){var n=boxes.filter(function(b){return b.checked;}).length;
    if(bump&&done.textContent!==String(n)){done.classList.remove("bump");void done.offsetWidth;done.classList.add("bump");setTimeout(function(){done.classList.remove("bump");},250);}
    done.textContent=n;ready.classList.toggle("is-on",n===boxes.length);}
  boxes.forEach(function(b){b.checked=!!saved[b.getAttribute("data-k")];b.addEventListener("change",function(){saved[b.getAttribute("data-k")]=b.checked;try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(e){}count(true);});});
  count(false);
  inView(root,function(){root.classList.add("is-in");fireLead();});
})();`,
  note:"הגרסה הבנאלית: \"הפגישה נקבעה, תודה\". הבעיה עם פגישה שנקבעה היא לא ההמרה אלא ההגעה: אנשים שוכחים, ומגיעים לשיחה בלי מה שצריך, ואז היא ארוכה פי שניים. כאן ההוספה ליומן היא לחיצה אחת: לגוגל דרך קישור, ולאאוטלוק ולאייפון דרך קובץ ICS שנבנה בדפדפן, עם אזור הזמן של ישראל ותזכורת רבע שעה לפני. רשימת ההכנה נשמרת (localStorage), כי חוזרים ללשונית הזו בערב שלפני. בכל סימון המונה קופץ ו-V מצטייר, וכשכל השלושה מסומנים נפתחת שורה \"הכל מוכן\" (aria-live). השעה מגיעה מ-?slot= שהטופס שולח, ובדמו זה יום העבודה הבא ב-10:00. ההמרה נורית פעם אחת בסשן.",
},
{
  id:"cv6", cat:"conv", name:"404 שמנחש לאן רצית להגיע", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"העמוד קורא את הכתובת השבורה ומשווה אותה לעמודי האתר: \"התכוונת לעיצוב מטבחים?\", עם האותיות שתוקנו מסומנות. מתחת חיפוש שמסנן את עמודי האתר תוך כדי הקלדה, עם ניווט במקלדת.",
  when:"כל אתר עם יותר מעשרה עמודים, ובמיוחד אחרי מעבר מאתר ישן (וורדפרס, וויקס) כשכתובות ישנות עדיין מסתובבות בגוגל ובוואטסאפ.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.nf-code{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 16px;font-size:14px;font-weight:600;color:var(--muted)}
.nf-code code{padding:4px 10px;border-radius:8px;background:var(--card);font-size:14px;color:var(--ink);text-decoration:line-through;text-decoration-color:color-mix(in srgb,var(--cx-err) 60%,transparent)}
.nf-h{margin:0 0 24px;font-size:clamp(28px,3.8vw,40px);line-height:1.12;font-weight:700}
.nf-guess{display:grid;grid-template-columns:1fr auto;gap:4px 16px;align-items:center;margin:0 0 40px;padding:20px 24px;border-radius:20px;background:var(--ink);color:var(--bg);text-decoration:none;
  transition:transform .2s ${E},box-shadow .2s ${E}}
.nf-guess[hidden]{display:none}
.nf-guess small{font-size:13px;font-weight:600;opacity:.7}
.nf-guess b{grid-column:1;font-size:22px;line-height:1.2}
.nf-guess code{grid-column:1;font-size:14px;opacity:.75;text-align:start}
.nf-guess code mark{background:color-mix(in srgb,var(--accent) 55%,transparent);color:inherit;border-radius:3px;padding:0 1px}
.nf-guess svg{grid-row:1 / span 3;grid-column:2;width:24px;height:24px}
@media (hover:hover) and (pointer:fine){.nf-guess:hover{transform:translateY(-2px);box-shadow:0 16px 36px color-mix(in srgb,var(--ink) 22%,transparent)}}
.nf-s{position:relative;display:block;margin:0 0 8px}
.nf-s > span{display:block;margin-bottom:8px;font-size:14px;font-weight:600}
.nf-s svg{position:absolute;inset-inline-start:16px;bottom:16px;width:20px;height:20px;color:var(--muted);pointer-events:none}
.nf-s input{width:100%;min-height:52px;padding:0 16px;padding-inline-start:48px;border:0;border-radius:14px;background:var(--card);font:inherit;color:var(--ink);
  box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 12%,transparent);transition:box-shadow .18s ${E}}
.nf-s input:focus{outline:0;box-shadow:inset 0 0 0 2px var(--accent)}
.nf-list{list-style:none;margin:0 0 32px;padding:0;display:grid;gap:2px}
.nf-list a{display:flex;align-items:baseline;justify-content:space-between;gap:16px;min-height:48px;padding:12px 16px;border-radius:12px;text-decoration:none;transition:background .15s ${E}}
.nf-list a:focus-visible,.nf-list a:hover{background:var(--card);outline:0}
.nf-list a span{font-weight:600}
.nf-list a small{font-size:13px;color:var(--muted);unicode-bidi:isolate}
.nf-list mark{background:color-mix(in srgb,var(--accent) 18%,transparent);color:inherit;border-radius:3px}
.nf-empty{margin:0 0 32px;padding:16px;border-radius:12px;background:var(--card);color:var(--muted)}
.nf-empty[hidden]{display:none}
.nf-out{display:flex;flex-wrap:wrap;gap:12px}`,
  html:`<div class="cx cxw"><div class="cxw-in" id="cv6" data-404 data-demo>
  <label class="cx-demo"><span>הדמיה, כתובת שבורה:</span><input type="text" dir="ltr" value="/servises/kichen" data-path aria-label="כתובת לבדיקה"></label>
  <p class="nf-code cx-rv"><span>שגיאה 404</span><code dir="ltr" data-shown>/servises/kichen</code></p>
  <h2 class="nf-h cx-rv" style="--i:1" data-h>הכתובת הזו לא קיימת, אבל נראה שחיפשת משהו קרוב</h2>
  <a class="nf-guess cx-rv" style="--i:2" data-guess href="#cv6"><small>אולי חיפשת</small><b data-gt>עיצוב מטבחים</b><code dir="ltr" data-gu>/services/kitchen</code>${I.arrow}</a>
  <label class="nf-s cx-rv" style="--i:3"><span>או חפשו בעמודי האתר</span>${I.search}<input type="search" placeholder="מטבח, מחירים, צור קשר..." data-q aria-controls="cv6-list" autocomplete="off"></label>
  <ul class="nf-list cx-rv" style="--i:3" id="cv6-list" data-list></ul>
  <p class="nf-empty" data-empty hidden>אין עמוד כזה. כתבו לנו מה חיפשתם ונכוון אתכם.</p>
  <div class="nf-out cx-rv" style="--i:4"><a class="cx-btn is-ghost" href="/">לעמוד הבית</a><a class="cx-btn is-ghost" href="https://wa.me/972500000000">${I.wa}לשאול אותנו</a></div>
</div></div>`,
  js:`${IN_JS}${LEV_JS}
(function(){
  var root=document.getElementById("cv6");
  // the site map this page knows. On a real site it is generated from the routes at build time.
  var PAGES=[
    {t:"עיצוב מטבחים",u:"/services/kitchen",k:"מטבח מטבחים kitchen"},
    {t:"עיצוב סלון",u:"/services/living-room",k:"סלון living"},
    {t:"שיפוץ דירה מלא",u:"/services/renovation",k:"שיפוץ renovation דירה"},
    {t:"פרויקטים",u:"/projects",k:"עבודות תיק פורטפוליו projects"},
    {t:"מחירים",u:"/pricing",k:"מחיר עלות כמה pricing"},
    {t:"שאלות נפוצות",u:"/faq",k:"שאלות faq"},
    {t:"אודות הסטודיו",u:"/about",k:"אודות about מי"},
    {t:"צור קשר",u:"/contact",k:"קשר טלפון contact וואטסאפ"}];
  var path=root.querySelector("[data-path]"),shown=root.querySelector("[data-shown]"),guess=root.querySelector("[data-guess]"),h=root.querySelector("[data-h]");
  var q=root.querySelector("[data-q]"),list=root.querySelector("[data-list]"),empty=root.querySelector("[data-empty]");
  function clean(p){p=(p||"/").toLowerCase().split("?")[0].split("#")[0];return p.length>1&&p.charAt(p.length-1)==="/"?p.slice(0,-1):p;}
  // the corrected address, with the characters that were fixed marked (a backtrace over the edit matrix)
  function marked(from,to){
    var d=lev(from,to),i=from.length,j=to.length,out=[];
    while(j>0){
      if(i>0&&from[i-1]===to[j-1]&&d[i][j]===d[i-1][j-1]){out.unshift([to[j-1],0]);i--;j--;}
      else if(i>0&&d[i][j]===d[i-1][j-1]+1){out.unshift([to[j-1],1]);i--;j--;}
      else if(d[i][j]===d[i][j-1]+1){out.unshift([to[j-1],1]);j--;}
      else i--;
    }
    return out;
  }
  function run(){
    var p=clean(root.hasAttribute("data-demo")?path.value:location.pathname),best=null,score=1;
    shown.textContent=p;
    PAGES.forEach(function(g){
      var a=lev(p,g.u),full=a[p.length][g.u.length]/Math.max(p.length,g.u.length);
      var ls=p.split("/").pop(),lg=g.u.split("/").pop(),b=lev(ls,lg),last=b[ls.length][lg.length]/Math.max(ls.length,lg.length,1);
      var s=Math.min(full,last+.08);if(s<score){score=s;best=g;}
    });
    if(best&&score<=.45){
      guess.hidden=false;guess.href=best.u;guess.querySelector("[data-gt]").textContent=best.t;
      var gu=guess.querySelector("[data-gu]");gu.textContent="";
      marked(p,best.u).forEach(function(c){var n=c[1]?document.createElement("mark"):document.createTextNode(c[0]);if(c[1])n.textContent=c[0];gu.appendChild(n);});
      h.textContent="הכתובת הזו לא קיימת, אבל נראה שחיפשת משהו קרוב";
    }else{guess.hidden=true;h.textContent="הכתובת הזו לא קיימת. בואו נמצא את מה שחיפשתם";}
  }
  // results are built with text nodes only: the query is user input and never becomes HTML
  function filter(){
    var v=q.value.trim().toLowerCase(),n=0;list.textContent="";
    PAGES.forEach(function(g){
      var hay=(g.t+" "+g.k).toLowerCase();if(v&&hay.indexOf(v)<0)return;if(!v&&n>=5)return;n++;
      var li=document.createElement("li"),a=document.createElement("a"),s=document.createElement("span"),sm=document.createElement("small"),at=g.t.toLowerCase().indexOf(v);
      a.href=g.u;sm.textContent=g.u;sm.dir="ltr";
      if(v&&at>-1){s.appendChild(document.createTextNode(g.t.slice(0,at)));var m=document.createElement("mark");m.textContent=g.t.slice(at,at+v.length);s.appendChild(m);s.appendChild(document.createTextNode(g.t.slice(at+v.length)));}
      else s.textContent=g.t;
      a.appendChild(s);a.appendChild(sm);li.appendChild(a);list.appendChild(li);
    });
    empty.hidden=n>0;
  }
  // arrow keys walk from the field through the results and back, Enter follows the link
  q.addEventListener("keydown",function(e){if(e.key==="ArrowDown"){var a=list.querySelector("a");if(a){e.preventDefault();a.focus();}}});
  list.addEventListener("keydown",function(e){
    var all=[].slice.call(list.querySelectorAll("a")),i=all.indexOf(document.activeElement);
    if(e.key==="ArrowDown"&&i<all.length-1){e.preventDefault();all[i+1].focus();}
    else if(e.key==="ArrowUp"){e.preventDefault();(i>0?all[i-1]:q).focus();}
    else if(e.key==="Escape"){q.focus();}
  });
  q.addEventListener("input",filter);path.addEventListener("input",run);
  run();filter();
  inView(root,function(){root.classList.add("is-in");});
})();`,
  note:"הגרסה הבנאלית: \"404, העמוד לא נמצא\" עם ציור של אסטרונאוט וכפתור לדף הבית. רוב הכתובות השבורות הן שגיאת הקלדה או כתובת מהאתר הקודם, והעמוד יודע את זה. הוא משווה את הכתובת לכל עמודי האתר (מרחק עריכה על הכתובת המלאה ועל המקטע האחרון), ואם יש קרוב מספיק מציע אותו כקישור גדול. האותיות שתוקנו מסומנות, והגולש רואה מיד למה זה אותו עמוד. החיפוש מסנן תוך כדי הקלדה ומסמן את מה שהתאים. חץ למטה נכנס לתוצאות, חץ למעלה חוזר לשדה, ו-Escape חוזר. התוצאות נבנות בצמתי טקסט בלבד, כי השאילתה היא קלט משתמש. באתר: רשימת העמודים נוצרת מהנתיבים בבנייה, השרת מחזיר סטטוס 404 אמיתי (לא 200), וכתובות ישנות שידועות מראש מקבלות הפניית 301 ולא מגיעות לכאן בכלל. שדה ההדמיה לא שייך לעמוד.",
},
{
  id:"cv7", cat:"conv", name:"404 עם שביל חזרה ודיווח על הקישור", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הכתובת השבורה מתפרקת לשביל: כל חלק שקיים באתר הוא קישור, החלק השבור נמחק בקו שמצטייר ולידו ההצעה הנכונה. מתחת ארבעת העמודים המבוקשים, וכפתור שמדווח לבעל האתר על הקישור השבור ומאיפה הגיעו אליו.",
  when:"אתר עם היררכיה (שירותים ותתי-שירותים, קטגוריות ומוצרים), שבו מי שנפל באמצע עדיין רוצה את הקטגוריה. הדיווח שימושי במיוחד בחודשים שאחרי העלאת אתר חדש.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.t7-h{margin:0 0 8px;font-size:clamp(28px,3.8vw,40px);line-height:1.12;font-weight:700}
.t7-sub{margin:0 0 24px;color:var(--muted)}
.t7-trail{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 48px;padding:0;list-style:none}
.t7-trail li{display:flex;align-items:center;gap:6px}
.t7-trail li + li::before{content:"‹";color:var(--muted);font-size:18px}
[dir="ltr"] .t7-trail li + li::before{content:"›"}
.t7-c{position:relative;display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border-radius:999px;background:var(--card);font-size:15px;font-weight:600;text-decoration:none;
  transition:background .18s ${E},color .18s ${E}}
a.t7-c{box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 10%,transparent)}
@media (hover:hover) and (pointer:fine){a.t7-c:hover{background:var(--ink);color:var(--bg)}}
.t7-bad{color:var(--cx-err);background:color-mix(in srgb,var(--cx-err) 8%,transparent);unicode-bidi:isolate}
/* the strike is drawn in the reading direction of the address (left to right), after the trail has settled */
.t7-bad::after{content:"";position:absolute;left:12px;right:12px;top:50%;height:2px;border-radius:2px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .45s ${E} .5s}
.is-in .t7-bad::after{transform:scaleX(1)}
.t7-fix::before{content:"←";margin-inline-end:6px;opacity:.8}
[dir="ltr"] .t7-fix::before{content:"→"}
.t7-fix{background:var(--accent);color:var(--accent-ink);opacity:0;transform:translateX(8px);transition:opacity .3s ${E} .95s,transform .3s ${E} .95s,background .18s ${E}}
.is-in .t7-fix{opacity:1;transform:none}
.t7-skip{color:var(--muted);background:transparent;box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 10%,transparent);unicode-bidi:isolate}
.t7-top h3{margin:0 0 16px;font-size:15px;font-weight:600;color:var(--muted)}
.t7-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:0 0 40px}
.t7-grid a{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;padding:12px 12px 16px;border-radius:18px;background:var(--card);text-decoration:none;transition:transform .2s ${E},box-shadow .2s ${E}}
.t7-grid i{display:block;min-width:0;aspect-ratio:2/1;border-radius:12px;background:color-mix(in srgb,var(--accent) calc(var(--k) * 8%),var(--bg));transition:transform .4s ${E}}
.t7-grid b{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 4px;font-size:16px}
.t7-grid b svg{width:18px;height:18px}
@media (hover:hover) and (pointer:fine){.t7-grid a:hover{transform:translateY(-2px);box-shadow:0 14px 32px color-mix(in srgb,var(--ink) 10%,transparent)}}
.t7-rep{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;padding:20px;border-radius:18px;background:color-mix(in srgb,var(--ink) 4%,transparent)}
.t7-rep p{flex:1 1 240px;margin:0;font-size:15px;color:var(--muted)}
.t7-rep .cx-btn{min-height:48px;font-size:15px;overflow:hidden}
.t7-rep .cx-btn span{display:inline-flex;align-items:center;gap:8px;transition:transform .25s ${E},opacity .25s ${E}}
.t7-rep .cx-btn span + span{position:absolute;inset:0;justify-content:center;opacity:0;transform:translateY(100%)}
.t7-rep .cx-btn span svg{width:18px;height:18px}
.t7-rep .is-sent span:first-child{opacity:0;transform:translateY(-100%)}
.t7-rep .is-sent span + span{opacity:1;transform:none}
.t7-rep .is-sent{background:var(--ink);color:var(--bg);pointer-events:none}`,
  html:`<div class="cx cxw"><div class="cxw-in" id="cv7" data-404 data-demo-path="/services/kitchen-desing/2024" data-report-url="">
  <h2 class="t7-h cx-rv">העמוד הזה עבר, או שמעולם לא היה</h2>
  <p class="t7-sub cx-rv" style="--i:1">חלק מהדרך כן קיים. אפשר לחזור לנקודה האחרונה שעובדת:</p>
  <ol class="t7-trail cx-rv" style="--i:2" data-trail aria-label="הכתובת שביקשתם, חלק אחרי חלק"></ol>
  <div class="t7-top cx-rv" style="--i:3"><h3>מה שרוב האנשים מחפשים כאן</h3><div class="t7-grid">
    <a href="/services/kitchen"><i style="--k:4"></i><b>עיצוב מטבחים ${I.arrow}</b></a>
    <a href="/projects"><i style="--k:2"></i><b>פרויקטים ${I.arrow}</b></a>
    <a href="/pricing"><i style="--k:3"></i><b>מחירים ${I.arrow}</b></a>
    <a href="/contact"><i style="--k:1"></i><b>צור קשר ${I.arrow}</b></a>
  </div></div>
  <div class="t7-rep cx-rv" style="--i:4"><p>הגעתם לכאן מקישור באתר או בהודעה? לחיצה אחת ונדע לתקן אותו.</p>
    <button class="cx-btn is-ghost" type="button" data-report><span>${I.alert}לדווח על הקישור</span><span aria-hidden="true">${I.check}תודה, נתקן</span></button>
    <span class="sr-only" aria-live="polite" data-said></span></div>
  <p class="cx-rv" style="--i:5;margin:32px 0 0"><a class="cx-btn" href="/">לעמוד הבית ${I.arrow}</a></p>
</div></div>`,
  js:`${IN_JS}${LEV_JS}
(function(){
  var root=document.getElementById("cv7");
  // the routes that exist, by path, with their Hebrew name
  var MAP={"services":"שירותים","services/kitchen-design":"עיצוב מטבחים","services/living-room":"עיצוב סלון","services/renovation":"שיפוץ מלא","projects":"פרויקטים","pricing":"מחירים","contact":"צור קשר"};
  var raw=root.getAttribute("data-demo-path")||location.pathname,segs=raw.split("/").filter(Boolean),trail=root.querySelector("[data-trail]"),acc="",broken=false;
  function chip(tag,cls,text,href){var li=document.createElement("li"),c=document.createElement(tag);c.className="t7-c "+cls;c.textContent=text;if(href)c.href=href;if(cls!=="")c.dir=cls.indexOf("t7-bad")>-1||cls.indexOf("t7-skip")>-1?"ltr":"";li.appendChild(c);trail.appendChild(li);return c;}
  chip("a","","בית","/");
  segs.forEach(function(s){
    var next=(acc?acc+"/":"")+s.toLowerCase();
    if(broken){chip("span","t7-skip",s);return;}
    if(MAP[next]){chip("a","",MAP[next],"/"+next);acc=next;return;}
    broken=true;var bad=chip("span","t7-bad",s);bad.setAttribute("aria-label","לא קיים: "+s);
    // the nearest sibling under the last part that worked
    var best=null,bs=1;Object.keys(MAP).forEach(function(k){if(k.indexOf(acc?acc+"/":"")!==0||k.split("/").length!==next.split("/").length)return;
      var t=k.split("/").pop(),d=lev(s.toLowerCase(),t),r=d[s.length][t.length]/Math.max(s.length,t.length);if(r<bs){bs=r;best=k;}});
    // the suggestion sits in the same step as the broken part, not after a separator: it replaces it, it does not continue the path
    if(best&&bs<=.4){var f=document.createElement("a");f.className="t7-c t7-fix";f.href="/"+best;f.textContent=MAP[best];bad.parentNode.appendChild(f);}
  });
  // the report: path and where the visitor came from. sendBeacon survives the visitor leaving the page right after.
  var btn=root.querySelector("[data-report]"),said=root.querySelector("[data-said]"),url=root.getAttribute("data-report-url");
  btn.addEventListener("click",function(){
    var body=JSON.stringify({path:raw,from:document.referrer||"direct",at:new Date().toISOString()});
    if(url&&navigator.sendBeacon)navigator.sendBeacon(url,body);
    btn.classList.add("is-sent");btn.setAttribute("aria-disabled","true");said.textContent="הדיווח נשלח. תודה, נתקן.";
  });
  inView(root,function(){root.classList.add("is-in");});
})();`,
  note:"הגרסה הבנאלית שולחת את כולם לדף הבית, ומי שחיפש מטבחים מתחיל מאפס. כאן הכתובת מתפרקת לחלקים. כל חלק שקיים באתר הוא קישור בשמו העברי, ולכן \"שירותים\" עדיין לחיץ. החלק השבור נמחק בקו שמצטייר בכיוון הקריאה של הכתובת, ולידו מופיעה ההצעה (האח הקרוב ביותר תחת החלק האחרון שעבד). חלקים שאחרי השבר נשארים דהויים, כי לא נבדקו. דיווח על הקישור שולח את הכתובת ואת העמוד שממנו הגיעו, דרך navigator.sendBeacon שעובר גם אם הגולש עוזב מיד. זה המידע שבעל אתר צריך בחודש שאחרי העלאת אתר חדש. הכפתור מתחלף ל\"תודה, נתקן\" בתנועה אנכית, ו-aria-live מקריא את זה. באתר: data-report-url לנקודת קצה (Edge Function, Make, או טופס), וסטטוס 404 אמיתי מהשרת.",
},
{
  id:"cv8", cat:"conv", name:"שליחה שלא מאבדת אף ליד", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"כשהשליחה נכשלת, הפרטים נשארים (גם אחרי רענון), העמוד מנסה שוב לבד עם ספירה לאחור בטבעת, ומציע לשלוח את אותם פרטים בוואטסאפ בלחיצה. בלי חיבור לאינטרנט הטופס מחכה, ונשלח לבד כשהחיבור חוזר.",
  when:"כל טופס ליד, ובמיוחד בקמפיינים ממומנים: ליד שנכשל בשליחה הוא כסף ששולם ונעלם, ואיש לא יודע. מתאים ביחד עם b32 (התוויות והאימות) או cv9.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.f8-h{margin:0 0 8px;font-size:clamp(26px,3.4vw,36px);line-height:1.15;font-weight:700}
.f8-sub{margin:0 0 28px;color:var(--muted)}
.f8 form{display:grid;gap:16px}
.f8 label{display:grid;gap:8px;font-size:14px;font-weight:600}
.f8 input,.f8 textarea{width:100%;min-height:52px;padding:14px 16px;border:0;border-radius:14px;background:var(--card);font:inherit;font-weight:400;color:var(--ink);resize:vertical;
  box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 12%,transparent);transition:box-shadow .18s ${E}}
.f8 textarea{min-height:96px}
.f8 input:focus,.f8 textarea:focus{outline:0;box-shadow:inset 0 0 0 2px var(--accent)}
.f8-btn{justify-self:start;min-width:180px;overflow:hidden}
.f8-btn [data-lab]{display:inline-block}
.f8-btn [data-lab].in{animation:f8-lab .22s ${E}}
@keyframes f8-lab{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.f8-spin{display:none;width:18px;height:18px;border-radius:50%;box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--accent-ink) 30%,transparent);border-top:2px solid var(--accent-ink);animation:f8-spin .8s linear infinite}
@keyframes f8-spin{to{transform:rotate(360deg)}}
[data-state="sending"] .f8-spin{display:block}
[data-state="sending"] .f8-btn{cursor:progress}
.f8-ok{display:none;width:20px;height:20px}
.f8-ok path{stroke-dasharray:24;stroke-dashoffset:24;animation:f8-draw .35s ${E} .05s forwards}
@keyframes f8-draw{to{stroke-dashoffset:0}}
[data-state="sent"] .f8-ok{display:block}
[data-state="sent"] .f8-btn{background:var(--ink);color:var(--bg);pointer-events:none}
/* the panel opens by its row track, so nothing below it jumps */
.f8-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ${E}}
.f8-panel.is-open{grid-template-rows:1fr}
.f8-panel > div{overflow:hidden;min-height:0}
.f8-box{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin-top:8px;padding:18px 20px;border-radius:16px;background:color-mix(in srgb,var(--cx-err) 7%,var(--bg))}
[data-kind="offline"] .f8-box{background:color-mix(in srgb,var(--ink) 6%,var(--bg))}
[data-kind="ok"] .f8-box{background:color-mix(in srgb,var(--accent) 9%,var(--bg))}
.f8-ic{grid-row:span 2;width:24px;height:24px;color:var(--cx-err)}
[data-kind="offline"] .f8-ic{color:var(--muted)}
[data-kind="ok"] .f8-ic{color:var(--accent)}
.f8-ic svg{display:block;width:24px;height:24px}
.f8-ic > span{display:none}
[data-kind="error"] .f8-ic .i-err,[data-kind="offline"] .f8-ic .i-off,[data-kind="ok"] .f8-ic .i-ok{display:block}
.f8-box b{font-size:16px;line-height:1.4}
.f8-box p{margin:0;display:flex;align-items:center;gap:10px;font-size:15px;color:var(--muted)}
.f8-ring{width:20px;height:20px;flex:none;transform:rotate(-90deg)}
.f8-ring circle{fill:none;stroke:var(--cx-err);stroke-width:2.5;stroke-dasharray:50.3;stroke-dashoffset:0}
.f8-ring.run circle{animation:f8-count var(--t,5s) linear forwards}
@keyframes f8-count{to{stroke-dashoffset:50.3}}
[data-kind="offline"] .f8-ring,[data-kind="ok"] .f8-ring,.is-final .f8-ring{display:none}
.f8-acts{grid-column:2;display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.f8-acts .cx-btn{min-height:44px;padding:0 16px;font-size:14px}
[data-kind="ok"] .f8-acts{display:none}
/* waiting for the network is not an action the visitor can take: the button says so and steps back */
[data-state="offline"] .f8-btn{background:color-mix(in srgb,var(--ink) 8%,var(--bg));color:var(--ink);cursor:default}
/* offline: a slow breathing dot says "waiting", not "broken" */
.f8-wait{display:none;width:8px;height:8px;border-radius:50%;background:var(--muted);animation:f8-breathe 1.6s ${E} infinite}
[data-kind="offline"] .f8-wait{display:block}
@keyframes f8-breathe{50%{opacity:.25}}`,
  html:`<div class="cx cxw"><div class="cxw-in f8" id="cv8" data-state="idle" data-keep>
  <div class="cx-demo" role="group" aria-label="הדמיה: מה השרת עושה"><span>השרת:</span><button type="button" data-mode="ok" aria-pressed="false">עונה</button><button type="button" data-mode="fail" aria-pressed="true">נופל</button><button type="button" data-mode="offline" aria-pressed="false">אין חיבור</button></div>
  <h2 class="f8-h">בואו נדבר על הפרויקט</h2>
  <p class="f8-sub">שלושה פרטים, ונחזור אליכם עוד היום.</p>
  <form novalidate>
    <label>שם<input name="name" autocomplete="name" required value="דנה לוי"></label>
    <label>טלפון<input name="phone" type="tel" dir="ltr" autocomplete="tel" required value="050-123-4567"></label>
    <label>במה נוכל לעזור?<textarea name="msg" rows="3">מטבח חדש לדירה ברמת גן</textarea></label>
    <button class="cx-btn f8-btn" type="submit"><i class="f8-spin" aria-hidden="true"></i><svg class="f8-ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><span data-lab>שליחה</span></button>
    <div class="f8-panel" data-panel data-kind="error" aria-live="polite"><div><div class="f8-box">
      <span class="f8-ic"><span class="i-err">${I.alert}</span><span class="i-off">${I.wifi}</span><span class="i-ok">${I.check}</span></span>
      <b data-msg></b>
      <p><svg class="f8-ring" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg><i class="f8-wait" aria-hidden="true"></i><span data-sub></span></p>
      <div class="f8-acts"><a class="cx-btn is-ghost" data-wa href="https://wa.me/972500000000" target="_blank" rel="noopener">${I.wa}לשלוח בוואטסאפ</a></div>
    </div></div></div>
  </form>
</div></div>`,
  js:`
(function(){
  var root=document.getElementById("cv8"),form=root.querySelector("form"),btn=form.querySelector(".f8-btn"),lab=btn.querySelector("[data-lab]"),panel=root.querySelector("[data-panel]");
  var msg=panel.querySelector("[data-msg]"),sub=panel.querySelector("[data-sub]"),ring=panel.querySelector(".f8-ring"),wa=panel.querySelector("[data-wa]");
  var KEY="cv8-draft",mode="fail",tries=0,timer=0,busy=false,waiting=false,NL=String.fromCharCode(10);
  // demo only: how the server behaves. On a real site send() is your fetch, and there is no switch.
  root.querySelectorAll("[data-mode]").forEach(function(b){b.addEventListener("click",function(){
    mode=b.getAttribute("data-mode");root.querySelectorAll("[data-mode]").forEach(function(x){x.setAttribute("aria-pressed",String(x===b));});
    if(root.getAttribute("data-state")==="sent"){state("idle");setLab("שליחה");panel.classList.remove("is-open");}
    if(mode!=="offline"&&waiting)dispatchEvent(new Event("online"));
  });});
  function online(){return mode==="offline"?false:navigator.onLine;}
  function send(o){return new Promise(function(res,rej){setTimeout(function(){if(mode==="ok")res();else rej(new Error("500"));},1100);});}
  // the draft: every keystroke is kept, so a failure, a refresh or a dead battery do not cost the lead
  var fields=[].slice.call(form.elements).filter(function(f){return f.name;});
  try{var d=JSON.parse(localStorage.getItem(KEY)||"{}");fields.forEach(function(f){if(d[f.name])f.value=d[f.name];});}catch(e){}
  var st=0;form.addEventListener("input",function(){clearTimeout(st);st=setTimeout(function(){var o={};fields.forEach(function(f){o[f.name]=f.value;});try{localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}},300);});
  function data(){var o={};fields.forEach(function(f){o[f.name]=f.value.trim();});return o;}
  function state(s){root.setAttribute("data-state",s);}
  function setLab(t){lab.classList.remove("in");void lab.offsetWidth;lab.textContent=t;lab.classList.add("in");}
  function show(kind,m,s){panel.setAttribute("data-kind",kind);msg.textContent=m;sub.textContent=s||"";panel.classList.add("is-open");}
  function countdown(sec){
    clearInterval(timer);var left=sec;ring.style.setProperty("--t",sec+"s");ring.classList.remove("run");void ring.getBoundingClientRect();ring.classList.add("run");
    sub.textContent="ננסה שוב לבד בעוד "+left+" שניות";
    timer=setInterval(function(){left--;if(left<=0){clearInterval(timer);submit();}else sub.textContent="ננסה שוב לבד בעוד "+left+" שניות";},1000);
  }
  function submit(){
    if(busy)return;
    var o=data();if(!o.name||!o.phone){form.querySelector(o.name?"[name=phone]":"[name=name]").focus();return;}
    busy=true;clearInterval(timer);btn.style.minWidth=btn.offsetWidth+"px";
    // WhatsApp carries the same details, so the fallback costs the visitor one tap and no retyping
    wa.href="https://wa.me/972500000000?text="+encodeURIComponent("היי, ניסיתי לשלוח פנייה באתר ולא עבר."+NL+"שם: "+o.name+NL+"טלפון: "+o.phone+(o.msg?NL+o.msg:""));
    if(!online()){busy=false;waiting=true;state("offline");setLab("ממתין לחיבור");show("offline","אין חיבור לאינטרנט. הפרטים שמורים.","הטופס יישלח לבד ברגע שהחיבור יחזור.");return;}
    state("sending");setLab("שולח");panel.classList.remove("is-open");btn.setAttribute("aria-busy","true");
    send(o).then(function(){
      busy=false;tries=0;btn.removeAttribute("aria-busy");state("sent");setLab("נשלח");try{localStorage.removeItem(KEY);}catch(e){}
      show("ok","קיבלנו. נחזור אליכם עוד היום.","");
    },function(){
      busy=false;tries++;btn.removeAttribute("aria-busy");state("error");setLab("לשלוח עכשיו");
      if(tries<3){panel.classList.remove("is-final");show("error","לא הצלחנו לשלוח. הפרטים שמורים אצלכם.","");countdown(tries===1?5:10);}
      else{panel.classList.add("is-final");show("error","השרת לא עונה כרגע. הפרטים שמורים.","הכי מהיר עכשיו: וואטסאפ, או טלפון 050-000-0000.");}
    });
  }
  form.addEventListener("submit",function(e){e.preventDefault();tries=0;submit();});
  addEventListener("online",function(){if(waiting&&online()){waiting=false;submit();}});
})();`,
  note:"הגרסה הבנאלית: הודעה אדומה \"שגיאה, נסה שוב מאוחר יותר\", ומי שכתב פסקה שלמה מוותר. כאן שום נפילה לא עולה ליד. (1) כל הקלדה נשמרת כטיוטה (localStorage), ולכן גם רענון או סוללה שנגמרה לא מוחקים. הטיוטה נמחקת רק אחרי הצלחה, ושדות רגישים לא נשמרים בה. (2) אחרי כישלון יש ניסיון חוזר אוטומטי: אחרי 5 שניות, אחר כך אחרי 10, עם טבעת שמתרוקנת וספירה במילים, והכפתור הראשי עצמו הופך ל\"לשלוח עכשיו\" (לא כפתור שני שעושה אותו דבר). (3) בכל שלב, \"לשלוח בוואטסאפ\" פותח הודעה עם אותם פרטים, כך שהגיבוי עולה לגולש לחיצה אחת. (4) בלי חיבור הטופס לא נכשל, הוא מחכה: נקודה נושמת, ושליחה עצמית באירוע online. הכפתור שומר על הרוחב שלו בכל המצבים ולא מאפשר שליחה כפולה. aria-busy בזמן השליחה, ו-aria-live על הפאנל. מתג ההדמיה לא שייך לטופס: באתר send() הוא ה-fetch שלכם.",
},
{
  id:"cv9", cat:"conv", name:"טופס שמתקן בעדינות", tech:"CSS · JS", status:"ממתין", runway:false,
  desc:"הטופס לא צועק תוך כדי הקלדה: הוא בודק כשיוצאים מהשדה, ואחרי טעות אחת בודק תוך כדי ומוריד את השגיאה ברגע שהיא מתוקנת. טלפון מתסדר לבד לפורמט, מייל עם טעות בדומיין מקבל \"התכוונת ל-gmail.com?\", והשגיאות אומרות בדיוק מה חסר (\"חסרה ספרה אחת\").",
  when:"כל טופס עם טלפון ומייל, ובמיוחד בטלפון, שם טעויות הקלדה הן הכלל. בטופס של שני שדות זה עדיין שווה: הנרמול של הטלפון לבדו חוסך ליד שחוזר עם מספר שגוי.",
  libs:[],
  css:`${ATOMS_CSS}${FRAME_CSS}
.g9-h{margin:0 0 8px;font-size:clamp(26px,3.4vw,36px);line-height:1.15;font-weight:700}
.g9-sub{margin:0 0 28px;color:var(--muted)}
.g9 form{display:grid;gap:20px}
.g9-sum{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s ${E}}
.g9-sum.is-open{grid-template-rows:1fr}
.g9-sum > div{overflow:hidden;min-height:0}
.g9-sum-in{margin-bottom:4px;padding:16px 20px;border-radius:16px;background:color-mix(in srgb,var(--cx-err) 7%,var(--bg))}
.g9-sum:focus{outline:0}
/* the ring is drawn inside the box: an outline would be clipped by the row track that opens it */
.g9-sum:focus-visible .g9-sum-in{box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cx-err) 45%,transparent)}
.g9-sum b{display:block;margin-bottom:6px;color:var(--cx-err)}
.g9-sum ul{margin:0;padding-inline-start:20px}
.g9-sum a{font-size:15px;text-underline-offset:3px}
.g9-f label{display:block;margin-bottom:8px;font-size:14px;font-weight:600}
.g9-in{position:relative}
.g9-f input{width:100%;min-height:52px;padding:0 16px;padding-inline-end:48px;border:0;border-radius:14px;background:var(--card);font:inherit;color:var(--ink);
  box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--ink) 12%,transparent);transition:box-shadow .18s ${E}}
.g9-f input:focus{outline:0;box-shadow:inset 0 0 0 2px var(--accent)}
/* an LTR field (phone, mail) starts on the left, where the tick sits in an RTL page: move the room to its start */
.g9-f input[dir="ltr"]{padding-inline:48px 16px}
.g9-f.is-bad input{box-shadow:inset 0 0 0 2px color-mix(in srgb,var(--cx-err) 70%,transparent)}
.g9-f.is-bad input:focus{box-shadow:inset 0 0 0 2px var(--cx-err)}
/* a quiet tick at the end of a field that became right: the reward comes early, the error comes late */
.g9-tick{position:absolute;inset-inline-end:14px;top:50%;width:20px;height:20px;margin-top:-10px;color:var(--accent);opacity:0;transform:scale(.6);transition:opacity .2s ${E},transform .25s ${E}}
.g9-tick path{stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .3s ${E} .05s}
.g9-f.is-ok .g9-tick{opacity:1;transform:none}
.g9-f.is-ok .g9-tick path{stroke-dashoffset:0}
.g9-err,.g9-sug{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s ${E}}
.g9-err > p,.g9-sug > div{overflow:hidden;min-height:0;margin:0}
.g9-f.is-bad .g9-err,.g9-sug.is-open{grid-template-rows:1fr}
.g9-err p{display:flex;gap:8px;align-items:flex-start;padding-top:8px;font-size:14px;line-height:1.45;color:var(--cx-err)}
.g9-err svg{width:18px;height:18px;flex:none;margin-top:1px}
.g9-sug button{display:inline-flex;align-items:center;gap:6px;min-height:40px;margin-top:8px;padding:0 14px;border:0;border-radius:999px;background:color-mix(in srgb,var(--accent) 10%,transparent);
  font:inherit;font-size:14px;color:var(--ink);cursor:pointer;transition:background .18s ${E}}
.g9-sug button b{direction:ltr;unicode-bidi:isolate;color:var(--accent)}
@media (hover:hover) and (pointer:fine){.g9-sug button:hover{background:color-mix(in srgb,var(--accent) 18%,transparent)}}
.g9 .cx-btn{justify-self:start}
.g9-done{display:none;padding:20px;border-radius:16px;background:color-mix(in srgb,var(--accent) 9%,var(--bg));font-weight:600}
.g9.is-sent form{display:none}
.g9.is-sent .g9-done{display:block;animation:g9-in .4s ${E}}
@keyframes g9-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`,
  html:`<div class="cx cxw"><div class="cxw-in g9" id="cv9" data-validate>
  <h2 class="g9-h">נשמח לשמוע מכם</h2>
  <p class="g9-sub">בדמו יש כבר שתי טעויות אמיתיות. לחצו \"שליחה\", או צאו מהשדות.</p>
  <form novalidate>
    <div class="g9-sum" data-summary tabindex="-1" role="alert"><div><div class="g9-sum-in"><b data-count></b><ul></ul></div></div></div>
    <div class="g9-f"><label for="cv9-name">שם</label><div class="g9-in"><input id="cv9-name" data-v="name" autocomplete="name" value="דנה לוי" aria-describedby="cv9-name-e">${`<svg class="g9-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`}</div><div class="g9-err"><p id="cv9-name-e">${I.alert}<span></span></p></div></div>
    <div class="g9-f"><label for="cv9-phone">טלפון נייד</label><div class="g9-in"><input id="cv9-phone" data-v="phone" type="tel" inputmode="tel" dir="ltr" autocomplete="tel" value="050 123 456" aria-describedby="cv9-phone-e"><svg class="g9-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><div class="g9-err"><p id="cv9-phone-e">${I.alert}<span></span></p></div></div>
    <div class="g9-f"><label for="cv9-mail">אימייל</label><div class="g9-in"><input id="cv9-mail" data-v="email" type="email" inputmode="email" dir="ltr" autocomplete="email" value="dana.levi@gmial.com" aria-describedby="cv9-mail-e"><svg class="g9-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><div class="g9-err"><p id="cv9-mail-e">${I.alert}<span></span></p></div>
      <div class="g9-sug" data-suggest><div><button type="button">התכוונת ל-<b data-fixed></b>?</button></div></div></div>
    <button class="cx-btn" type="submit">שליחה ${I.arrow}</button>
  </form>
  <p class="g9-done" aria-live="polite">נשלח. נחזור אליכם עוד היום.</p>
</div></div>`,
  js:`${LEV_JS}
(function(){
  var root=document.getElementById("cv9"),form=root.querySelector("form"),sum=root.querySelector("[data-summary]"),sug=root.querySelector("[data-suggest]"),touched={};
  var DOMAINS=["gmail.com","walla.co.il","walla.com","hotmail.com","outlook.com","yahoo.com","icloud.com","012.net.il","bezeqint.net","netvision.net.il"];
  function digits(v){return v.replace(/[^0-9]/g,"");}
  function normPhone(v){var d=digits(v);if(d.indexOf("972")===0)d="0"+d.slice(3);return d;}
  // mobile (05x) and VoIP (07x) are ten digits; landlines (02, 03, 04, 08, 09) are nine. A nine-digit 05 is a mobile missing a digit, not a landline.
  function fmtPhone(d){if(/^0[57][0-9]{8}$/.test(d))return d.slice(0,3)+"-"+d.slice(3,6)+"-"+d.slice(6);if(/^0[2-489][0-9]{7}$/.test(d))return d.slice(0,2)+"-"+d.slice(2,5)+"-"+d.slice(5);return null;}
  // the messages say what is missing, in numbers when there is a number to say
  var RULES={
    name:function(v){v=v.trim();if(!v)return "איך לפנות אליכם? חסר שם";if(v.length<2)return "שם של אות אחת? כתבו לפחות שתיים";return "";},
    phone:function(v){var d=normPhone(v),miss;if(!d)return "חסר מספר טלפון";
      if(/^0[57]/.test(d)){if(d.length<10){miss=10-d.length;return (miss===1?"חסרה ספרה אחת":"חסרות "+miss+" ספרות")+": מספר נייד הוא 10 ספרות";}
        if(d.length>10)return (d.length-10===1?"יש ספרה אחת מיותרת":"יש "+(d.length-10)+" ספרות מיותרות")+": מספר נייד הוא 10 ספרות";}
      return fmtPhone(d)?"":"המספר לא נראה כמו טלפון ישראלי";},
    email:function(v){v=v.trim();if(!v)return "חסרה כתובת מייל";if(v.indexOf("@")<0)return "בכתובת חסר @";if(!/^[^@ ]+@[^@ ]+[.][^@ ]{2,}$/.test(v))return "הכתובת לא שלמה, למשל name@gmail.com";return "";}
  };
  var inputs=[].slice.call(form.querySelectorAll("[data-v]"));
  function check(inp,show){
    var k=inp.getAttribute("data-v"),f=inp.closest(".g9-f"),m=RULES[k](inp.value);
    if(show||touched[k]){f.classList.toggle("is-bad",!!m);f.classList.toggle("is-ok",!m&&inp.value.trim()!=="");inp.setAttribute("aria-invalid",m?"true":"false");if(m)f.querySelector(".g9-err span").textContent=m;}
    return m;
  }
  function suggest(inp){
    var v=inp.value.trim(),at=v.lastIndexOf("@");if(at<1){sug.classList.remove("is-open");return;}
    var dom=v.slice(at+1).toLowerCase(),best=null,bd=9;if(DOMAINS.indexOf(dom)>-1){sug.classList.remove("is-open");return;}
    DOMAINS.forEach(function(d){var x=lev(dom,d)[dom.length][d.length];if(x<bd){bd=x;best=d;}});
    // a likely typo is not "correct": the tick waits until the suggestion is taken or the address is retyped
    if(best&&bd<=2){var fixed=v.slice(0,at+1)+best;sug.querySelector("[data-fixed]").textContent=fixed;sug.fixed=fixed;sug.classList.add("is-open");inp.closest(".g9-f").classList.remove("is-ok");}else sug.classList.remove("is-open");
  }
  sug.querySelector("button").addEventListener("click",function(){var inp=form.querySelector("[data-v=email]");inp.value=sug.fixed;sug.classList.remove("is-open");check(inp,true);inp.focus();});
  inputs.forEach(function(inp){
    var k=inp.getAttribute("data-v");
    // on leaving the field: tidy the phone into its format, then judge. An empty untouched field is left alone.
    inp.addEventListener("blur",function(){
      if(inp.value.trim()===""&&!touched[k])return;
      if(k==="phone"){var f=fmtPhone(normPhone(inp.value));if(f)inp.value=f;}
      touched[k]=true;check(inp,true);if(k==="email")suggest(inp);
    });
    // after the first mistake it re-checks while typing, so the error leaves the moment it is fixed and never arrives mid-word
    inp.addEventListener("input",function(){if(touched[k])check(inp,true);if(k==="email")sug.classList.remove("is-open");});
  });
  // the summary is live: a line leaves as its field is fixed, and the box closes when nothing is left
  function summary(focus){
    var bad=inputs.filter(function(inp){return RULES[inp.getAttribute("data-v")](inp.value);}),ul=sum.querySelector("ul");ul.textContent="";
    bad.forEach(function(inp){var li=document.createElement("li"),a=document.createElement("a");a.href="#"+inp.id;
      a.textContent=inp.closest(".g9-f").querySelector("label").textContent+": "+RULES[inp.getAttribute("data-v")](inp.value);
      a.addEventListener("click",function(ev){ev.preventDefault();inp.focus();});li.appendChild(a);ul.appendChild(li);});
    sum.querySelector("[data-count]").textContent=bad.length===1?"שדה אחד צריך תיקון":bad.length+" שדות צריכים תיקון";
    sum.classList.toggle("is-open",bad.length>0);
    if(focus&&bad.length){sum.focus({preventScroll:true});sum.scrollIntoView({block:"nearest",behavior:"smooth"});}
    return bad.length;
  }
  form.addEventListener("input",function(){if(sum.classList.contains("is-open"))summary(false);});
  form.addEventListener("focusout",function(){setTimeout(function(){if(sum.classList.contains("is-open"))summary(false);},0);});
  form.addEventListener("submit",function(e){
    e.preventDefault();
    inputs.forEach(function(inp){var k=inp.getAttribute("data-v");touched[k]=true;if(k==="phone"){var f=fmtPhone(normPhone(inp.value));if(f)inp.value=f;}check(inp,true);});
    suggest(form.querySelector("[data-v=email]"));
    if(summary(true))return;
    root.classList.add("is-sent");
  });
})();`,
  note:"הגרסה הבנאלית אחת משתיים: טופס שצובע כל שדה באדום מהאות הראשונה, או טופס ששותק עד השליחה ואז אומר \"שדה לא תקין\" בלי לומר למה. הכלל כאן הוא לתגמל מוקדם ולהעניש מאוחר. השגיאה מגיעה רק כשיוצאים מהשדה. מרגע שהייתה טעות, השדה נבדק תוך כדי הקלדה, והשגיאה יורדת ברגע שהתיקון נגמר, ו-V קטן מצטייר בסוף השדה. ההודעות מדויקות: \"חסרה ספרה אחת\", \"חסרות שתי ספרות\", \"בכתובת חסר @\". הטלפון מתנרמל ביציאה מהשדה, כולל ‎+972 ורווחים, לפורמט 050-123-4567. מייל עם דומיין קרוב לדומיין מוכר (gmial, walla.co.i) מקבל הצעה בלחיצה. בשליחה עם שגיאות נפתח סיכום בראש הטופס, הפוקוס עובר אליו, ומכל שורה בו יש קישור לשדה. aria-invalid ו-aria-describedby על כל שדה. נבנה כדי לעבוד לצד cv8, שמטפל במה שקורה אחרי שהטופס תקין.",
},
];
