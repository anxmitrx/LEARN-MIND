import fs from "fs";
import path from "path";

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith(".tsx")) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const files = walkSync("src");

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // Pattern 1: Empty span used for background highlight
  const highlightRegex1 = /<span className="bg-gradient-to-r from-indigo-500\/20 to-purple-500\/20[^"]*"><\/span>/g;
  if (content.match(highlightRegex1)) {
    content = content.replace(highlightRegex1, "");
    changed = true;
  }

  // Pattern 2: Span wrapping text with the highlight
  const highlightRegex2 = /bg-gradient-to-r from-indigo-500\/20 to-purple-500\/20 px-[0-9] rounded-[a-z]+/g;
  if (content.match(highlightRegex2)) {
    content = content.replace(highlightRegex2, "text-indigo-600");
    changed = true;
  }
  
  // Pattern 3: box-decoration-slice highlight
  const highlightRegex3 = /bg-gradient-to-r from-indigo-500\/20 to-purple-500\/20 box-decoration-slice px-[0-9] rounded-[a-z]+/g;
  if (content.match(highlightRegex3)) {
      content = content.replace(highlightRegex3, "text-indigo-600");
      changed = true;
  }

  // Special case for Hero.tsx which uses absolute positioning for the highlight
  if (file.endsWith("Hero.tsx")) {
    const heroRegex = /<span className="absolute inset-0 bg-gradient-to-r from-indigo-500\/20 to-purple-500\/20 blur-sm rounded-lg -z-10"><\/span>/g;
    if (content.match(heroRegex)) {
      content = content.replace(heroRegex, "");
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
