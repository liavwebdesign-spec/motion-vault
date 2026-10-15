// שפות עיצוב S7-S12. ראה i-style1.mjs לעמוד הייחוס ולהסבר.
import { sk } from "./i-style1.mjs";

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// Miriam Libre הוא פונט התגיות של s07. הוא לא מונוספייס (נמדד 30.9.2026: iiii ברוחב 61px מול MMMM ב-148px), ולכן המספור עובר למונוספייס אמיתי.
const TAG = `"Miriam Libre",monospace`;
const MONO = `ui-monospace,"SFMono-Regular",Consolas,monospace`;

export default [
];
