import fs from 'fs';

const filePath = 'src/routes/class-12-consult.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

// Global Background & Text
content = content.replace(/min-h-screen bg-transparent text-slate-800 dot-bg/g, 'min-h-screen bg-[#0B0F19] text-slate-300 relative overflow-hidden');

// Gradients for Hero
content = content.replace(/from-\[#F8EDEB\] via-\[#F8EDEB\]\/60/g, 'from-[#0B0F19] via-[#0B0F19]/80');
content = content.replace(/sm:from-\[#f8f5ff\]\/95 sm:via-\[#f8f5ff\]\/70/g, 'sm:from-[#0B0F19]/95 sm:via-[#0B0F19]/80');

// Typography
content = content.replace(/text-ink/g, 'text-white');
content = content.replace(/text-slate-800/g, 'text-slate-200');
content = content.replace(/text-slate-700/g, 'text-slate-300');
content = content.replace(/text-slate-600/g, 'text-slate-400');
content = content.replace(/text-slate-500/g, 'text-slate-400');
content = content.replace(/text-indigo-600/g, 'text-indigo-400');
content = content.replace(/text-indigo-700/g, 'text-indigo-300');

// Glassmorphism panels
content = content.replace(/bg-white\/60/g, 'bg-white/5');
content = content.replace(/bg-white\/50/g, 'bg-white/5');
content = content.replace(/bg-white\/40/g, 'bg-white/5');
content = content.replace(/bg-white\/30/g, 'bg-white/5');
content = content.replace(/bg-white\/25/g, 'bg-[#151B2B]');
content = content.replace(/bg-white\/20/g, 'bg-[#151B2B]');
content = content.replace(/bg-white\/80/g, 'bg-white/10');
content = content.replace(/bg-white\/90/g, 'bg-white/10');
content = content.replace(/bg-white/g, 'bg-[#151B2B]'); // Fallback for pure white

// Except for the CTA button which should remain high contrast
content = content.replace(/bg-\[#151B2B\] text-indigo-300 px-8/g, 'bg-white text-indigo-900 px-8');

// Borders
content = content.replace(/border-white\/80/g, 'border-white/10');
content = content.replace(/border-white\/70/g, 'border-white/10');
content = content.replace(/border-white\/60/g, 'border-white/10');
content = content.replace(/border-white\/50/g, 'border-white/10');
content = content.replace(/border-white\/40/g, 'border-white/10');
content = content.replace(/border-white\/20/g, 'border-white/10');

// Shadows
content = content.replace(/shadow-\[0_8px_32px_0_rgba\(31,38,135,0\.07\)\]/g, 'shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]');

// Predictor result cards internal tags
content = content.replace(/bg-indigo-50\/50/g, 'bg-indigo-500/10');
content = content.replace(/bg-orange-50\/50/g, 'bg-orange-500/10');
content = content.replace(/bg-blue-50\/50/g, 'bg-blue-500/10');
content = content.replace(/bg-emerald-50\/50/g, 'bg-emerald-500/10');
content = content.replace(/bg-indigo-50/g, 'bg-indigo-500/10'); // For badges
content = content.replace(/bg-indigo-100/g, 'bg-indigo-500/20');

content = content.replace(/border-indigo-100\/50/g, 'border-indigo-500/20');
content = content.replace(/border-orange-100\/50/g, 'border-orange-500/20');
content = content.replace(/border-blue-100\/50/g, 'border-blue-500/20');
content = content.replace(/border-emerald-100\/50/g, 'border-emerald-500/20');

fs.writeFileSync(filePath, content);
console.log('Successfully upgraded to Premium Dark Theme');
