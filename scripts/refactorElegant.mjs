import fs from "fs";

const filePath = "src/routes/class-12-consult.tsx";
let content = fs.readFileSync(filePath, "utf-8");

// Global Background & Text
content = content.replace(
  /min-h-screen bg-\[#0B0F19\] text-slate-300 relative overflow-hidden/g,
  "min-h-screen bg-[#FAFAFA] text-slate-800 dot-bg relative overflow-hidden",
);

// Gradients for Hero
content = content.replace(
  /from-\[#0B0F19\] via-\[#0B0F19\]\/80/g,
  "from-[#FAFAFA] via-[#FAFAFA]/70",
);
content = content.replace(
  /sm:from-\[#0B0F19\]\/95 sm:via-\[#0B0F19\]\/80/g,
  "sm:from-[#FAFAFA]/95 sm:via-[#FAFAFA]/70",
);

// Typography
content = content.replace(/text-white sm:text-6xl/g, "text-slate-900 sm:text-6xl");
content = content.replace(/text-slate-200/g, "text-slate-800");
content = content.replace(/text-slate-300/g, "text-slate-700");
content = content.replace(/text-slate-400/g, "text-slate-500");

// Fix specific text-white elements that were headings
content = content.replace(/text-white tracking-wide/g, "text-slate-900 tracking-wide");
content = content.replace(/text-white uppercase/g, "text-slate-900 uppercase");
content = content.replace(/text-white mb-4/g, "text-slate-900 mb-4");
content = content.replace(/text-white mb-2/g, "text-slate-900 mb-2");

content = content.replace(/text-indigo-400/g, "text-indigo-600");
content = content.replace(/text-indigo-300/g, "text-indigo-700");

// Glassmorphism panels
content = content.replace(/bg-white\/5 /g, "bg-white/70 "); // Using space to not match /50
content = content.replace(/bg-white\/5\"/g, 'bg-white/70"');
content = content.replace(/bg-\[#151B2B\]/g, "bg-white/40");
content = content.replace(/bg-white\/10/g, "bg-white/90");

// Except for the CTA button
content = content.replace(/bg-white text-indigo-900 px-8/g, "bg-white text-indigo-600 px-8");

// Borders
content = content.replace(/border-white\/10/g, "border-slate-200/60");

// Shadows
content = content.replace(
  /shadow-\[0_8px_32px_0_rgba\(0,0,0,0\.5\)\]/g,
  "shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]",
);
content = content.replace(/shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\]/g, "shadow-sm");
content = content.replace(/shadow-\[0_20px_40px_rgba\(79,70,229,0\.15\)\]/g, "shadow-xl");
content = content.replace(
  /shadow-\[0_0_20px_rgba\(79,70,229,0\.3\)\]/g,
  "shadow-lg shadow-indigo-500/30",
);
content = content.replace(
  /shadow-\[0_0_30px_rgba\(79,70,229,0\.5\)\]/g,
  "shadow-xl shadow-indigo-500/40",
);
content = content.replace(
  /shadow-\[0_20px_50px_rgba\(79,70,229,0\.3\)\]/g,
  "shadow-xl shadow-indigo-500/20",
);
content = content.replace(
  /shadow-\[0_20px_60px_rgba\(79,70,229,0\.4\)\]/g,
  "shadow-2xl shadow-indigo-500/30",
);
content = content.replace(/shadow-\[0_0_20px_rgba\(255,255,255,0\.3\)\]/g, "shadow-lg");
content = content.replace(/shadow-\[0_0_30px_rgba\(255,255,255,0\.5\)\]/g, "shadow-xl");

// Predictor result cards internal tags
content = content.replace(/bg-indigo-500\/10/g, "bg-indigo-50/50");
content = content.replace(/bg-orange-500\/10/g, "bg-orange-50/50");
content = content.replace(/bg-blue-500\/10/g, "bg-blue-50/50");
content = content.replace(/bg-emerald-500\/10/g, "bg-emerald-50/50");
content = content.replace(/bg-indigo-500\/20/g, "bg-indigo-100");

content = content.replace(/border-indigo-500\/20/g, "border-indigo-100/50");
content = content.replace(/border-orange-500\/20/g, "border-orange-100/50");
content = content.replace(/border-blue-500\/20/g, "border-blue-100/50");
content = content.replace(/border-emerald-500\/20/g, "border-emerald-100/50");

fs.writeFileSync(filePath, content);
console.log("Successfully upgraded to Elegant Light Theme");
