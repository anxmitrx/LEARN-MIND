import fs from 'fs';

// Helper to generate multiple branches for a single college to reach 50 easily
const generateBranches = (collegeName, branches, baseCutoff, step, avgPackageBase, type, location) => {
  return branches.map((branch, i) => {
    // calculate a roughly increasing cutoff and decreasing package
    const cutoff = baseCutoff + (i * step);
    const avgPackage = Math.max(5, avgPackageBase - (i * 0.5)).toFixed(1) + " LPA";
    return { name: `${collegeName} (${branch})`, cutoff, avgPackage, type, location };
  });
};

const jeeBranches = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Chemical", "Metallurgy", "Production"];
const neetBranches = ["MBBS", "BDS", "BAMS", "BHMS"];
const cuetCourses = ["B.Com Hons", "B.A. Economics", "B.Sc Physics", "B.Sc Maths", "B.A. English", "B.A. Pol Science"];
const bitsatBranches = ["CSE", "ECE", "EEE", "ENI", "Mechanical", "Chemical", "Civil", "M.Sc Bio", "M.Sc Chem", "M.Sc Math", "M.Sc Physics"];
const wbjeeBranches = ["CSE", "IT", "ECE", "EE", "Mechanical", "Civil", "Chemical"];

let jeeMainColleges = [
  ...generateBranches("NIT Trichy", jeeBranches, 1500, 2000, 20, "Tier 1", "Tamil Nadu"),
  ...generateBranches("NIT Surathkal", jeeBranches, 2500, 2200, 18, "Tier 1", "Karnataka"),
  ...generateBranches("NIT Warangal", jeeBranches, 3000, 2500, 17, "Tier 1", "Telangana"),
  ...generateBranches("IIIT Hyderabad", ["CSE", "ECE"], 800, 1500, 30, "Tier 1", "Telangana"),
  ...generateBranches("DTU", jeeBranches, 4000, 3000, 16, "Tier 1", "Delhi"),
  ...generateBranches("NSUT", ["CSE", "IT", "ECE", "Mechanical"], 4500, 3500, 15, "Tier 1", "Delhi"),
  ...generateBranches("NIT Rourkela", jeeBranches, 5000, 3000, 14, "Tier 1", "Odisha"),
  ...generateBranches("NIT Calicut", jeeBranches, 6000, 3500, 13, "Tier 1", "Kerala"),
];

let neetColleges = [
  ...generateBranches("AIIMS New Delhi", neetBranches, 50, 2000, 15, "Tier 1", "Delhi"),
  ...generateBranches("JIPMER Puducherry", neetBranches, 250, 2500, 14, "Tier 1", "Puducherry"),
  ...generateBranches("CMC Vellore", neetBranches, 100, 3000, 12, "Tier 1", "Tamil Nadu"),
  ...generateBranches("MAMC New Delhi", ["MBBS", "BDS"], 90, 5000, 12, "Tier 1", "Delhi"),
  ...generateBranches("KGMU Lucknow", neetBranches, 1000, 4000, 10, "Tier 1", "UP"),
  ...generateBranches("AFMC Pune", ["MBBS"], 1500, 0, 12, "Tier 1", "Maharashtra"),
  ...generateBranches("Grant Medical College", neetBranches, 1800, 4500, 9, "Tier 2", "Maharashtra"),
  ...generateBranches("Seth GS Medical College", ["MBBS", "BDS"], 800, 5000, 10, "Tier 1", "Maharashtra"),
  ...generateBranches("BJ Medical College", neetBranches, 700, 4000, 9, "Tier 1", "Gujarat"),
  ...generateBranches("Madras Medical College", neetBranches, 1200, 5000, 9, "Tier 1", "Tamil Nadu"),
  ...generateBranches("Osmania Medical College", ["MBBS", "BDS"], 2500, 6000, 8, "Tier 1", "Telangana"),
  ...generateBranches("AIIMS Jodhpur", ["MBBS"], 500, 0, 12, "Tier 1", "Rajasthan"),
  ...generateBranches("AIIMS Bhubaneswar", ["MBBS"], 600, 0, 12, "Tier 1", "Odisha"),
  ...generateBranches("AIIMS Bhopal", ["MBBS"], 650, 0, 12, "Tier 1", "MP"),
  ...generateBranches("AIIMS Rishikesh", ["MBBS"], 800, 0, 12, "Tier 1", "Uttarakhand"),
  ...generateBranches("SMS Medical College", neetBranches, 1800, 6000, 9, "Tier 1", "Rajasthan"),
];

let cuetColleges = [
  ...generateBranches("SRCC", ["B.Com Hons", "B.A. Economics"], 99.8, -0.3, 12, "Tier 1", "Delhi"),
  ...generateBranches("Hindu College", cuetCourses, 99.5, -0.5, 10, "Tier 1", "Delhi"),
  ...generateBranches("St. Stephen's College", cuetCourses, 99.2, -0.6, 11, "Tier 1", "Delhi"),
  ...generateBranches("LSR College", cuetCourses, 98.5, -0.7, 9, "Tier 1", "Delhi"),
  ...generateBranches("Hansraj College", cuetCourses, 98.0, -0.8, 8, "Tier 1", "Delhi"),
  ...generateBranches("Kirori Mal College", cuetCourses, 97.5, -0.9, 7.5, "Tier 1", "Delhi"),
  ...generateBranches("Ramjas College", cuetCourses, 97.0, -1.0, 7, "Tier 1", "Delhi"),
  ...generateBranches("Sri Venkateswara College", cuetCourses, 96.5, -1.1, 7, "Tier 1", "Delhi"),
  ...generateBranches("Gargi College", cuetCourses, 95.0, -1.2, 6, "Tier 2", "Delhi"),
];

let bitsatColleges = [
  ...generateBranches("BITS Pilani", bitsatBranches, 330, -15, 22, "Tier 1", "Rajasthan"),
  ...generateBranches("BITS Goa", bitsatBranches, 290, -12, 18, "Tier 1", "Goa"),
  ...generateBranches("BITS Hyderabad", bitsatBranches, 280, -10, 16, "Tier 1", "Telangana"),
  ...generateBranches("BITS RMIT/Iowa (2+2)", ["CSE", "ECE", "Mechanical"], 200, -15, 12, "Tier 2", "International"),
];

let wbjeeColleges = [
  ...generateBranches("Jadavpur University", wbjeeBranches, 100, 150, 20, "Tier 1", "West Bengal"),
  ...generateBranches("Calcutta University", wbjeeBranches, 600, 400, 12, "Tier 1", "West Bengal"),
  ...generateBranches("IEM Kolkata", wbjeeBranches, 1500, 800, 8, "Tier 2", "West Bengal"),
  ...generateBranches("Heritage Institute", wbjeeBranches, 2500, 1000, 7, "Tier 2", "West Bengal"),
  ...generateBranches("Techno Main Salt Lake", wbjeeBranches, 4000, 1200, 6, "Tier 2", "West Bengal"),
  ...generateBranches("Kalyani Govt Engg College", wbjeeBranches, 1200, 600, 8, "Tier 2", "West Bengal"),
  ...generateBranches("Jalpaiguri Govt Engg College", wbjeeBranches, 2000, 800, 7, "Tier 2", "West Bengal"),
  ...generateBranches("Haldia Institute of Tech", wbjeeBranches, 5000, 1500, 5.5, "Tier 3", "West Bengal"),
  ...generateBranches("AOT Hooghly", wbjeeBranches, 6000, 1600, 5, "Tier 3", "West Bengal"),
];

const mockCollegeData = {
  "JEE Main": jeeMainColleges,
  "NEET": neetColleges,
  "CUET": cuetColleges,
  "BITSAT": bitsatColleges,
  "WBJEE": wbjeeColleges,
};

const fileContent = `export const mockCollegeData = ${JSON.stringify(mockCollegeData, null, 2)};\n`;
fs.writeFileSync('./src/data/mockCollegeData.ts', fileContent);
console.log("Created src/data/mockCollegeData.ts with lots of rows.");
