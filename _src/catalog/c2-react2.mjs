// React wave 2: r12-r27 (MagicUI + ReactBits, דמו מוטמע מהדוקס)
const frame = (url, install, deps) => ({
  css:`.rload{display:flex;gap:10px;flex-wrap:wrap;align-items:center;padding-inline:var(--gutter);margin-bottom:16px}
.rframe{display:none;border-block:1px solid var(--line);background:#0e0f1a}
.rframe.on{display:block}
.rframe iframe{width:100%;height:min(82vh,780px);border:0;display:block}
.rinstall{padding-inline:var(--gutter)}
.rinstall code{font-size:12.5px;background:#ececf4;border:1px solid var(--line);border-radius:8px;padding:8px 14px;direction:ltr;display:inline-block;max-width:100%;overflow-x:auto;white-space:nowrap}
.rdeps{font-size:13px;color:var(--muted);padding:8px var(--gutter) 0}`,
  html:`<div class="rinstall"><code>${install}</code></div>
<div class="rdeps">תלויות npm: <b>${deps}</b></div>
<div class="rload">
  <button class="gbtn rbtn">טען דמו חי כאן</button>
  <a class="vback" href="${url}" target="_blank" rel="noopener">פתח באתר המקור ↗</a>
</div>
<div class="rframe"></div>`,
  js:`const btn=document.querySelector(".rbtn"),wrap=document.querySelector(".rframe");
btn.addEventListener("click",()=>{
  if(wrap.classList.contains("on")){wrap.classList.remove("on");wrap.innerHTML="";btn.textContent="טען דמו חי כאן";return;}
  wrap.innerHTML='<iframe loading="lazy" src="${url}"></iframe>';
  wrap.classList.add("on");btn.textContent="סגור דמו";
});`,
  runway:false
});
const R = (id,name,desc,when,tech,url,install,deps,note) => ({
  id, cat:"react", name, desc, when, tech, status:"ממתין", note,
  ...frame(url,install,deps)
});
const MG = s => 'npx shadcn@latest add "https://magicui.design/r/' + s + '.json"';

export default [
R("r12","AnimatedBeam: קרן מחברת",
  "קרן אור מונפשת שזורמת בין שני אלמנטים ומציירת חיבור חי ביניהם.",
  "דיאגרמות אינטגרציה, איך-זה-עובד, חיבורי מערכות.","MagicUI · motion",
  "https://magicui.design/docs/components/animated-beam",MG("animated-beam"),"motion"),
R("r13","BorderBeam: קרן על מסגרת",
  "נקודת אור שמקיפה את גבול הכרטיס בלולאה.",
  "כרטיס מודגש אחד: ההצעה המרכזית, פיצ'ר AI.","MagicUI · CSS",
  "https://magicui.design/docs/components/border-beam",MG("border-beam"),"motion"),
R("r14","NumberTicker: מספר מתגלגל",
  "מספר שמתגלגל לערכו בכניסה למסך, עם האטה טבעית.",
  "סקשני נתונים והישגים. הגרסה הריאקטית של ה-count-up.","MagicUI · motion",
  "https://magicui.design/docs/components/number-ticker",MG("number-ticker"),"motion"),
R("r15","TextReveal: טקסט נצבע בגלילה",
  "פסקה שמילותיה מתבהרות בזו אחר זו בקצב הגלילה, בתוך סקשן דביק.",
  "הצהרת מותג ארוכה, סקשן חזון.","MagicUI · motion",
  "https://magicui.design/docs/components/text-reveal",MG("text-reveal"),"motion"),
R("r16","TypingAnimation: הקלדה חיה",
  "טקסט שנכתב תו-תו עם סמן, כולל מחיקה והחלפה בין משפטים.",
  "הירו של מוצרי טק. עובד גם בעברית (מימוש JS, לא CSS steps).","MagicUI · motion",
  "https://magicui.design/docs/components/typing-animation",MG("typing-animation"),"motion"),
R("r17","BlurFade: כניסת טשטוש",
  "אלמנטים נכנסים מטושטשים ומתחדדים, עם סטאגר עדין ברשימות.",
  "גלריות וגרידים באתרי פרימיום. תחליף reveal יוקרתי.","MagicUI · motion",
  "https://magicui.design/docs/components/blur-fade",MG("blur-fade"),"motion"),
R("r18","OrbitingCircles: לוויינים במסלול",
  "אייקונים שמקיפים אלמנט מרכזי במסלולים שונים.",
  "הצגת אקוסיסטם: אינטגרציות סביב מוצר, כישורים סביב לוגו.","MagicUI · CSS",
  "https://magicui.design/docs/components/orbiting-circles",MG("orbiting-circles"),"אין (CSS)"),
R("r19","Ripple: אדוות רקע",
  "עיגולים מתפשטים לאט מהמרכז. רקע חי ושקט לאזור הירו.",
  "מאחורי לוגו או CTA מרכזי. עדין מספיק לעסקים רציניים.","MagicUI · CSS",
  "https://magicui.design/docs/components/ripple",MG("ripple"),"אין (CSS)"),
R("r20","Meteors: מטאורים חולפים",
  "פסי אור אלכסוניים שחוצים את הרקע כמו מטר מטאורים.",
  "רקעים כהים באתרי טק ו-AI. אווירה, לא תוכן.","MagicUI · CSS",
  "https://magicui.design/docs/components/meteors",MG("meteors"),"אין (CSS)"),
R("r21","Dock: מגירת אייקונים כמו macOS",
  "שורת אייקונים שמתנפחים בהתקרבות הסמן, בדיוק כמו הדוק של מק.",
  "ניווט צף באתרי פורטפוליו ומוצר. דסקטופ בלבד.","MagicUI · motion",
  "https://magicui.design/docs/components/dock",MG("dock"),"motion"),
R("r22","AnimatedList: רשימה חיה",
  "פריטים שנכנסים לרשימה בזה אחר זה, דוחפים את הקודמים למטה.",
  "פיד התראות, הדגמת מערכת חיה, לוג פעילות.","MagicUI · motion",
  "https://magicui.design/docs/components/animated-list",MG("animated-list"),"motion"),
R("r23","HeroVideoDialog: וידאו שנפתח מהירו",
  "תמונת פתיחה עם כפתור נגן שמתרחבת למודאל וידאו במעבר חלק.",
  "הירו עם סרטון תדמית. הדרך הנכונה לשים וידאו בלי להכביד.","MagicUI · motion",
  "https://magicui.design/docs/components/hero-video-dialog",MG("hero-video-dialog"),"motion"),
R("r24","SplitText: כניסת אותיות",
  "טקסט שנבנה אות-אות או מילה-מילה עם קפיצה קפיצית.",
  "כותרות הירו. בעברית: מצב מילים בלבד (אותיות שוברות קישוריות).","ReactBits · GSAP",
  "https://reactbits.dev/text-animations/split-text",
  "npx shadcn@latest add @react-bits/SplitText-TS-TW","gsap"),
R("r25","BlurText: מילים מהערפל",
  "מילים שנכנסות מטושטשות בזו אחר זו ומתחדדות למקומן.",
  "כותרות וציטוטים באתרי פרימיום.","ReactBits · motion",
  "https://reactbits.dev/text-animations/blur-text",
  "npx shadcn@latest add @react-bits/BlurText-TS-TW","motion"),
R("r26","Aurora: זוהר צפוני",
  "רקע גלי צבע רכים שנעים כמו זוהר צפוני. WebGL.",
  "רקע הירו באתרי טק כהים. חוק ה-WebGL: אחד לעמוד.","ReactBits · OGL",
  "https://reactbits.dev/backgrounds/aurora",
  "npx shadcn@latest add @react-bits/Aurora-TS-TW","ogl"),
R("r27","Magnet: משיכה מגנטית",
  "האלמנט נמשך בעדינות לעבר הסמן כשהוא מתקרב, וחוזר כשעוזבים.",
  "כפתורי CTA ואייקונים באתרי וואו. דסקטופ בלבד.","ReactBits · vanilla",
  "https://reactbits.dev/animations/magnet",
  "npx shadcn@latest add @react-bits/Magnet-TS-TW","אין"),
];
