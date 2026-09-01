// React components R1-R11 (מקור: references/react/components.md)
// קומפוננטות React לא רצות ב-HTML סטטי; הדמו החי מוטמע מהדוקס הרשמי.
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
  id, cat:"react", name, desc, when, tech, status:"מאושר", note,
  ...frame(url,install,deps)
});

export default [
R("r01","ScrollVelocity: טקסט מגיב-מהירות",
  "שורות טקסט זורמות אופקית ומגיבות למהירות הגלילה. גלילה מהירה מאיצה והופכת כיוון. שתי שורות בכיוונים מנוגדים = החתימה.",
  "פס אווירה טיפוגרפי באתר חוויה.","MagicUI · motion",
  "https://magicui.design/docs/components/scroll-based-velocity",
  'npx shadcn@latest add "https://magicui.design/r/scroll-based-velocity.json"',"motion",
  "התאמות: RTL הופכים direction; מוסיפים עצירת reduced-motion מלאה (המקור מכבה רק את הבוסט)."),
R("r02","Marquee: מרקי CSS טהור",
  "מרקי אינסופי לכל תוכן: אופקי, אנכי, הפוך, עצירה בהובר. אפס תלויות.",
  "ברירת המחדל למרקי ב-React. הקל ביותר.","MagicUI · CSS",
  "https://magicui.design/docs/components/marquee",
  'npx shadcn@latest add "https://magicui.design/r/marquee.json"',"אין (CSS בלבד)",
  "התאמות חובה: ב-RTL מעבירים reverse (ה-keyframe פיזי); מוסיפים motion-reduce ו-aria-hidden לעותקים."),
R("r03","BentoGrid: בנטו עם כוריאוגרפיית hover",
  "גריד בנטו שכל כרטיס בו מגיב להובר בשלוש שכבות: טקסט עולה, אייקון מתכווץ, CTA נחשף.",
  "פיצ'רים עם היררכיה. חוק התאים הריקים שלנו חל.","MagicUI · CSS",
  "https://magicui.design/docs/components/bento-grid",
  'npx shadcn@latest add "https://magicui.design/r/bento-grid.json"',"radix-icons + shadcn button",
  "RTL כמעט מובנה במקור; מוסיפים רק rtl:origin-right."),
R("r04","ScrollExpand: מדיה שמתרחבת בגלילה",
  "מסגרת מדיה מעוגלת שגדלה ל-full-bleed תוך גלילה, הכותרת נחשפת בסוף.",
  "רגע שיא מדיה. reduced-motion מובנה, RTL בטוח. הנקי בסט.","ReactBits · vanilla",
  "https://reactbits.dev/animations/scroll-expand",
  "npx shadcn@latest add @react-bits/ScrollExpand-TS-TW","אין"),
R("r05","DepthCarousel: קרוסלת עומק תלת-ממד",
  "כרטיסים נסוגים לעומק על מסילה תלת-ממדית עם גרירה, מקלדת ואוטו-פליי.",
  "תיק עבודות או מוצרים עם נוכחות קולנועית.","ReactBits · GSAP",
  "https://reactbits.dev/components/depth-carousel",
  "npx shadcn@latest add @react-bits/DepthCarousel-TS-TW","gsap",
  "התאמות RTL חובה: חיצי מקלדת, סימן גרירה, tiltDirection."),
R("r06","AccordionGallery: פאנלים מתרחבים",
  "פאנלים שמתרחבים בהובר או קליק עם פרלקס פנימי בתמונות.",
  "3-5 קטגוריות עם תמונות חזקות. במובייל orientation אנכי.","ReactBits · GSAP",
  "https://reactbits.dev/components/accordion-gallery",
  "npx shadcn@latest add @react-bits/AccordionGallery-TS-TW","gsap"),
R("r07","MorphSlider: סליידר WebGL נמס",
  "מעברי תמונות בשיידר: melt, ripple, shear, swirl, עם אברציה כרומטית.",
  "רגע הוואו של אתר פרימיום. WebGL אחד לעמוד, פעם אחת.","ReactBits · OGL+GSAP",
  "https://reactbits.dev/components/morph-slider",
  "npx shadcn@latest add @react-bits/MorphSlider-TS-TW","ogl + gsap",
  "ה-reduced-motion הטוב בסט (uniform בשיידר). RTL: חיצים וגרירה."),
R("r08","DriftWall: קיר אריחים נסחף",
  "קיר אינסופי של אריחים בפרספקטיבה שנסחפים אנכית, הובר מרים אריח.",
  "רקע אווירה חי לתיק עבודות או לוגואים. הבטוח בסט.","ReactBits · vanilla",
  "https://reactbits.dev/components/drift-wall",
  "npx shadcn@latest add @react-bits/DriftWall-TS-TW","אין"),
R("r09","ScrollStack: ערימת כרטיסים דביקה",
  "כרטיסים נערמים בגלילה עם עומק: scale ו-blur לפי שכבה.",
  "למה דווקא אנחנו, שלבים. הגרסה הריאקטית של הערימה הדביקה.","ReactBits · Lenis",
  "https://reactbits.dev/components/scroll-stack",
  "npx shadcn@latest add @react-bits/ScrollStack-TS-TW","lenis",
  "אין reduced-motion במקור: מוסיפים גייט. לא מכפילים Lenis גלובלי."),
R("r10","CircularGallery: גלריה מסלולית WebGL",
  "תמונות במסלול מעוקם, גלילה וגרירה אינסופית.",
  "גלריה חווייתית, רגע חתימה. הכי תובענית בסט.","ReactBits · OGL",
  "https://reactbits.dev/components/circular-gallery",
  "npx shadcn@latest add @react-bits/CircularGallery-TS-TW","ogl",
  "תיקוני חובה: wheel מקומי (חוטפת גלילת עמוד!), reduced-motion, RTL, פונט עברי לקנבס."),
R("r11","Masonry: גריד נושם",
  "גריד masonry עם כניסה מונפשת מכיוון נבחר, reflow חי והובר scale+blur.",
  "גלריות ובלוגים עם גבהים שונים.","ReactBits · GSAP",
  "https://reactbits.dev/components/masonry",
  "npx shadcn@latest add @react-bits/Masonry-TS-TW","gsap",
  "ב-RTL הופכים את אריזת העמודות (המקור LTR קשיח); מוסיפים reduced-motion."),
];
