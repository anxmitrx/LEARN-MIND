import fs from "fs";

const years = ["2026", "2025", "2024", "2023", "2022", "2021"];

const engineeringColleges = [
  { name: "IIT Bombay (CSE)", exam: "JEE Advanced", baseRank: 60 },
  { name: "IIT Delhi (CSE)", exam: "JEE Advanced", baseRank: 100 },
  { name: "IIT Madras (CSE)", exam: "JEE Advanced", baseRank: 160 },
  { name: "IIT Kanpur (CSE)", exam: "JEE Advanced", baseRank: 230 },
  { name: "IIT Kharagpur (CSE)", exam: "JEE Advanced", baseRank: 280 },
  { name: "IIT Roorkee (CSE)", exam: "JEE Advanced", baseRank: 400 },
  { name: "IIT Guwahati (CSE)", exam: "JEE Advanced", baseRank: 590 },
  { name: "IIT Hyderabad (CSE)", exam: "JEE Advanced", baseRank: 600 },
  { name: "IIT BHU (CSE)", exam: "JEE Advanced", baseRank: 850 },
  { name: "IIT Indore (CSE)", exam: "JEE Advanced", baseRank: 1200 },
  { name: "IIT Ropar (CSE)", exam: "JEE Advanced", baseRank: 1800 },
  { name: "IIT Mandi (CSE)", exam: "JEE Advanced", baseRank: 2800 },
  { name: "IIT Gandhinagar (CSE)", exam: "JEE Advanced", baseRank: 1400 },
  { name: "IIT Jodhpur (CSE)", exam: "JEE Advanced", baseRank: 2600 },
  { name: "IIT Patna (CSE)", exam: "JEE Advanced", baseRank: 2700 },
  { name: "IIT Bhubaneswar (CSE)", exam: "JEE Advanced", baseRank: 2300 },
  { name: "NIT Trichy (CSE)", exam: "JEE Main", baseRank: 1100 },
  { name: "NIT Surathkal (CSE)", exam: "JEE Main", baseRank: 1600 },
  { name: "NIT Warangal (CSE)", exam: "JEE Main", baseRank: 2000 },
  { name: "MNNIT Allahabad (CSE)", exam: "JEE Main", baseRank: 3200 },
  { name: "NIT Rourkela (CSE)", exam: "JEE Main", baseRank: 3300 },
  { name: "NIT Calicut (CSE)", exam: "JEE Main", baseRank: 4000 },
  { name: "MNIT Jaipur (CSE)", exam: "JEE Main", baseRank: 4500 },
  { name: "VNIT Nagpur (CSE)", exam: "JEE Main", baseRank: 5200 },
  { name: "NIT Kurukshetra (CSE)", exam: "JEE Main", baseRank: 6000 },
  { name: "NIT Durgapur (CSE)", exam: "JEE Main", baseRank: 7500 },
  { name: "NIT Silchar (CSE)", exam: "JEE Main", baseRank: 10000 },
  { name: "IIIT Hyderabad (CSE)", exam: "JEE Main", baseRank: 800 },
  { name: "IIIT Allahabad (IT)", exam: "JEE Main", baseRank: 4500 },
  { name: "IIIT Bangalore (CSE)", exam: "JEE Main", baseRank: 6000 },
  { name: "IIIT Delhi (CSE)", exam: "JAC Delhi", baseRank: 7000 },
  { name: "IIIT Gwalior (CSE)", exam: "JEE Main", baseRank: 6500 },
  { name: "DTU (CSE)", exam: "JAC Delhi", baseRank: 4800 },
  { name: "NSUT (CSE)", exam: "JAC Delhi", baseRank: 5500 },
  { name: "IGDTUW (CSE)", exam: "JAC Delhi", baseRank: 12000 },
  { name: "Jadavpur University (CSE)", exam: "WBJEE", baseRank: 100 },
  { name: "BITS Pilani (CSE)", exam: "BITSAT", baseRank: 330, isScore: true },
  { name: "BITS Goa (CSE)", exam: "BITSAT", baseRank: 295, isScore: true },
  { name: "BITS Hyderabad (CSE)", exam: "BITSAT", baseRank: 285, isScore: true },
  { name: "VIT Vellore (CSE)", exam: "VITEEE", baseRank: 4000 },
  { name: "Manipal Institute (CSE)", exam: "MET", baseRank: 1500 },
  { name: "SRM KTR (CSE)", exam: "SRMJEEE", baseRank: 2500 },
  { name: "Thapar Institute (CSE)", exam: "JEE Main", baseRank: 15000 },
  { name: "LNMIIT Jaipur (CSE)", exam: "JEE Main", baseRank: 22000 },
  { name: "RVCE Bangalore (CSE)", exam: "COMEDK", baseRank: 300 },
  { name: "BMSCE Bangalore (CSE)", exam: "COMEDK", baseRank: 800 },
  { name: "MSRIT Bangalore (CSE)", exam: "COMEDK", baseRank: 1200 },
  { name: "PES University (CSE)", exam: "PESSAT", baseRank: 1000 },
  { name: "DAIICT Gandhinagar (ICT)", exam: "GUJCET/JEE", baseRank: 10000 },
  { name: "COEP Pune (CSE)", exam: "MHT CET", baseRank: 200 },
  { name: "Jadavpur University (IT)", exam: "WBJEE", baseRank: 150 },
  { name: "Jadavpur University (ECE)", exam: "WBJEE", baseRank: 250 },
  { name: "Jadavpur University (EE)", exam: "WBJEE", baseRank: 400 },
  { name: "Jadavpur University (Mechanical)", exam: "WBJEE", baseRank: 600 },
  { name: "Jadavpur University (Civil)", exam: "WBJEE", baseRank: 800 },
  { name: "Calcutta University (CSE)", exam: "WBJEE", baseRank: 600 },
  { name: "Calcutta University (IT)", exam: "WBJEE", baseRank: 800 },
  { name: "Calcutta University (ECE)", exam: "WBJEE", baseRank: 1000 },
  { name: "IEM Kolkata (CSE)", exam: "WBJEE", baseRank: 1500 },
  { name: "IEM Kolkata (IT)", exam: "WBJEE", baseRank: 2200 },
  { name: "IEM Kolkata (ECE)", exam: "WBJEE", baseRank: 2800 },
  { name: "Heritage Institute (CSE)", exam: "WBJEE", baseRank: 2500 },
  { name: "Heritage Institute (IT)", exam: "WBJEE", baseRank: 3500 },
  { name: "Techno Main Salt Lake (CSE)", exam: "WBJEE", baseRank: 4000 },
  { name: "Kalyani Govt Engg College (CSE)", exam: "WBJEE", baseRank: 1200 },
  { name: "Kalyani Govt Engg College (ECE)", exam: "WBJEE", baseRank: 1800 },
  { name: "Jalpaiguri Govt Engg College (CSE)", exam: "WBJEE", baseRank: 2000 },
  { name: "Haldia Institute of Tech (CSE)", exam: "WBJEE", baseRank: 5000 },
  { name: "AOT Hooghly (CSE)", exam: "WBJEE", baseRank: 6000 },
  { name: "Netaji Subhash Engg College (CSE)", exam: "WBJEE", baseRank: 7000 },
  { name: "BP Poddar Institute (CSE)", exam: "WBJEE", baseRank: 8000 },
  { name: "RCC Institute (CSE)", exam: "WBJEE", baseRank: 9000 },
  { name: "Meghnad Saha Institute (CSE)", exam: "WBJEE", baseRank: 10000 },
  { name: "Asansol Engg College (CSE)", exam: "WBJEE", baseRank: 12000 },
  { name: "Narula Institute (CSE)", exam: "WBJEE", baseRank: 15000 },
  { name: "JIS College of Engg (CSE)", exam: "WBJEE", baseRank: 18000 },
];

const medicalColleges = [
  { name: "AIIMS New Delhi", exam: "NEET", baseRank: 50 },
  { name: "JIPMER Puducherry", exam: "NEET", baseRank: 250 },
  { name: "CMC Vellore", exam: "NEET", baseRank: 100 },
  { name: "MAMC New Delhi", exam: "NEET", baseRank: 90 },
  { name: "VMMC & Safdarjung Delhi", exam: "NEET", baseRank: 140 },
  { name: "UCMs Delhi", exam: "NEET", baseRank: 200 },
  { name: "LHMC Delhi", exam: "NEET", baseRank: 300 },
  { name: "KGMU Lucknow", exam: "NEET", baseRank: 1000 },
  { name: "AFMC Pune", exam: "NEET", baseRank: 1500 },
  { name: "Grant Medical College Mumbai", exam: "NEET", baseRank: 1800 },
  { name: "Seth GS Medical College Mumbai", exam: "NEET", baseRank: 800 },
  { name: "BJ Medical College Ahmedabad", exam: "NEET", baseRank: 700 },
  { name: "Madras Medical College", exam: "NEET", baseRank: 1200 },
  { name: "Stanley Medical College", exam: "NEET", baseRank: 3000 },
  { name: "Osmania Medical College", exam: "NEET", baseRank: 2500 },
  { name: "Gandhi Medical College Hyderabad", exam: "NEET", baseRank: 2200 },
  { name: "IMS BHU Varanasi", exam: "NEET", baseRank: 800 },
  { name: "AMU Aligarh", exam: "NEET", baseRank: 3500 },
  { name: "AIIMS Jodhpur", exam: "NEET", baseRank: 500 },
  { name: "AIIMS Bhubaneswar", exam: "NEET", baseRank: 600 },
  { name: "AIIMS Bhopal", exam: "NEET", baseRank: 650 },
  { name: "AIIMS Rishikesh", exam: "NEET", baseRank: 800 },
  { name: "AIIMS Raipur", exam: "NEET", baseRank: 1200 },
  { name: "AIIMS Patna", exam: "NEET", baseRank: 1500 },
  { name: "SMS Medical College Jaipur", exam: "NEET", baseRank: 1800 },
  { name: "PMCH Patna", exam: "NEET", baseRank: 4000 },
  { name: "SCB Medical College Cuttack", exam: "NEET", baseRank: 4500 },
  { name: "KMC Manipal", exam: "NEET", baseRank: 12000 },
  { name: "KMC Mangalore", exam: "NEET", baseRank: 15000 },
  { name: "St. John's Bangalore", exam: "NEET", baseRank: 10000 },
  { name: "Christian Medical College Ludhiana", exam: "NEET", baseRank: 18000 },
  { name: "MS Ramaiah Medical College", exam: "NEET", baseRank: 25000 },
  { name: "Kempegowda Institute (KIMS)", exam: "NEET", baseRank: 30000 },
  { name: "BJMC Pune", exam: "NEET", baseRank: 2000 },
  { name: "LTMMC Mumbai", exam: "NEET", baseRank: 2200 },
  { name: "TNMC Mumbai", exam: "NEET", baseRank: 2500 },
  { name: "GMC Chandigarh", exam: "NEET", baseRank: 400 },
  { name: "Pt. BD Sharma PGIMS Rohtak", exam: "NEET", baseRank: 3000 },
  { name: "GMC Amritsar", exam: "NEET", baseRank: 6000 },
  { name: "GMC Patiala", exam: "NEET", baseRank: 5500 },
  { name: "IGMC Shimla", exam: "NEET", baseRank: 4000 },
  { name: "RNT Medical College Udaipur", exam: "NEET", baseRank: 4500 },
  { name: "SPMC Bikaner", exam: "NEET", baseRank: 5000 },
  { name: "SNMC Jodhpur", exam: "NEET", baseRank: 5200 },
  { name: "GMC Nagpur", exam: "NEET", baseRank: 4800 },
  { name: "GMC Aurangabad", exam: "NEET", baseRank: 5500 },
  { name: "MMC Muzaffarnagar", exam: "NEET", baseRank: 12000 },
  { name: "GSVM Kanpur", exam: "NEET", baseRank: 3800 },
  { name: "MLN Allahabad", exam: "NEET", baseRank: 4200 },
  { name: "LLRM Meerut", exam: "NEET", baseRank: 4600 },
];

const pharmaColleges = [
  { name: "Jamia Hamdard Delhi", exam: "NEET/CUET", baseRank: 99, isPercentile: true },
  { name: "Panjab University", exam: "PUCET", baseRank: 98, isPercentile: true },
  { name: "NIPER Mohali", exam: "NIPER JEE", baseRank: 50 },
  { name: "NIPER Hyderabad", exam: "NIPER JEE", baseRank: 150 },
  { name: "NIPER Ahmedabad", exam: "NIPER JEE", baseRank: 200 },
  { name: "ICT Mumbai", exam: "MHT CET", baseRank: 99.5, isPercentile: true },
  { name: "BITS Pilani", exam: "BITSAT", baseRank: 220, isScore: true },
  { name: "BITS Goa", exam: "BITSAT", baseRank: 190, isScore: true },
  { name: "BITS Hyderabad", exam: "BITSAT", baseRank: 180, isScore: true },
  { name: "JSS College of Pharmacy Ooty", exam: "JSS", baseRank: 500 },
  { name: "JSS College of Pharmacy Mysore", exam: "JSS", baseRank: 600 },
  { name: "Manipal College of Pharmaceutical", exam: "MET", baseRank: 1200 },
  { name: "DIPSAR Delhi", exam: "CUET", baseRank: 97, isPercentile: true },
  { name: "DPSRU Delhi", exam: "CUET", baseRank: 96, isPercentile: true },
  { name: "Amrita School of Pharmacy", exam: "AEEE", baseRank: 2000 },
  { name: "SRM College of Pharmacy", exam: "SRMJEEE", baseRank: 3000 },
  { name: "Annamalai University", exam: "State Level", baseRank: 90, isPercentile: true },
  { name: "NMIMS Mumbai", exam: "NPAT", baseRank: 92, isPercentile: true },
  { name: "Bombay College of Pharmacy", exam: "MHT CET", baseRank: 95, isPercentile: true },
  { name: "LM College of Pharmacy", exam: "GUJCET", baseRank: 94, isPercentile: true },
  { name: "Poona College of Pharmacy", exam: "MHT CET", baseRank: 93, isPercentile: true },
  { name: "PSG College of Pharmacy", exam: "TNPharm", baseRank: 96, isPercentile: true },
  { name: "KLE College of Pharmacy Hubli", exam: "State Level", baseRank: 1500 },
  { name: "KLE College of Pharmacy Belagavi", exam: "State Level", baseRank: 1800 },
  { name: "Nirma University", exam: "GUJCET", baseRank: 92, isPercentile: true },
  { name: "LPU Jalandhar", exam: "LPUNEST", baseRank: 85, isPercentile: true },
  { name: "Chandigarh University", exam: "CUCET", baseRank: 85, isPercentile: true },
  { name: "Chitkara University", exam: "State Level", baseRank: 80, isPercentile: true },
  { name: "UPES Dehradun", exam: "UPESPAT", baseRank: 75, isPercentile: true },
  { name: "NIPER Guwahati", exam: "NIPER JEE", baseRank: 300 },
  { name: "NIPER Hajipur", exam: "NIPER JEE", baseRank: 400 },
  { name: "NIPER Kolkata", exam: "NIPER JEE", baseRank: 350 },
  { name: "NIPER Raebareli", exam: "NIPER JEE", baseRank: 450 },
  { name: "DIT University", exam: "State Level", baseRank: 70, isPercentile: true },
  { name: "MSU Baroda", exam: "GUJCET", baseRank: 91, isPercentile: true },
  { name: "Madras Medical College (Pharma)", exam: "TNPharm", baseRank: 98, isPercentile: true },
  { name: "Goa College of Pharmacy", exam: "GCET", baseRank: 88, isPercentile: true },
  { name: "Delhi University (Pharma)", exam: "CUET", baseRank: 95, isPercentile: true },
  { name: "Banaras Hindu University (Pharma)", exam: "CUET", baseRank: 94, isPercentile: true },
  { name: "Aligarh Muslim University", exam: "AMU Test", baseRank: 200 },
  { name: "Banasthali Vidyapith", exam: "Aptitude", baseRank: 80, isPercentile: true },
  { name: "NIMS University", exam: "State Level", baseRank: 65, isPercentile: true },
  { name: "Galgotias University", exam: "State Level", baseRank: 60, isPercentile: true },
  { name: "Amity University Noida", exam: "Amity JEE", baseRank: 85, isPercentile: true },
  { name: "Sharda University", exam: "SUAT", baseRank: 70, isPercentile: true },
  { name: "KIIT Bhubaneswar", exam: "KIITEE", baseRank: 3500 },
  { name: "SOA University", exam: "SAAT", baseRank: 4000 },
  { name: "Raja Muthiah Medical (Pharma)", exam: "State Level", baseRank: 88, isPercentile: true },
  { name: "Sri Ramachandra Institute", exam: "All India", baseRank: 2500 },
  { name: "SVKM's Dr. Bhanuben Nanavati", exam: "MHT CET", baseRank: 90, isPercentile: true },
];

const architectureColleges = [
  { name: "SPA Delhi", exam: "JEE Main P2", baseRank: 150 },
  { name: "SPA Bhopal", exam: "JEE Main P2", baseRank: 250 },
  { name: "SPA Vijayawada", exam: "JEE Main P2", baseRank: 300 },
  { name: "CEPT University Ahmedabad", exam: "NATA", baseRank: 155, isScore: true },
  { name: "IIT Roorkee", exam: "AAT", baseRank: 50 },
  { name: "IIT Kharagpur", exam: "AAT", baseRank: 80 },
  { name: "NIT Trichy", exam: "JEE Main P2", baseRank: 500 },
  { name: "NIT Calicut", exam: "JEE Main P2", baseRank: 800 },
  { name: "NIT Rourkela", exam: "JEE Main P2", baseRank: 1000 },
  { name: "VNIT Nagpur", exam: "JEE Main P2", baseRank: 1200 },
  { name: "MNIT Jaipur", exam: "JEE Main P2", baseRank: 1500 },
  { name: "MANIT Bhopal", exam: "JEE Main P2", baseRank: 1800 },
  { name: "NIT Hamirpur", exam: "JEE Main P2", baseRank: 2000 },
  { name: "NIT Raipur", exam: "JEE Main P2", baseRank: 2200 },
  { name: "NIT Patna", exam: "JEE Main P2", baseRank: 2500 },
  { name: "Jamia Millia Islamia", exam: "JEE Main P2", baseRank: 800 },
  { name: "Sir JJ College of Architecture", exam: "NATA/MAH", baseRank: 145, isScore: true },
  { name: "Chandigarh College of Architecture", exam: "JEE Main P2", baseRank: 600 },
  { name: "BMS College of Architecture", exam: "NATA/COMEDK", baseRank: 135, isScore: true },
  { name: "RV College of Architecture", exam: "NATA/COMEDK", baseRank: 140, isScore: true },
  { name: "MS Ramaiah Institute of Tech", exam: "NATA", baseRank: 130, isScore: true },
  { name: "Jadavpur University", exam: "WBJEE", baseRank: 50 },
  { name: "BIT Mesra", exam: "JEE Main P2", baseRank: 3000 },
  { name: "SMVDU Katra", exam: "JEE Main P2", baseRank: 4000 },
  { name: "IGDTUW Delhi", exam: "JEE Main P2", baseRank: 2800 },
  { name: "College of Engineering Trivandrum", exam: "KEAM", baseRank: 100 },
  { name: "TKM College of Engineering", exam: "KEAM", baseRank: 200 },
  { name: "Anna University (SAP)", exam: "TNEA", baseRank: 50 },
  { name: "Thiagarajar College of Engg", exam: "TNEA", baseRank: 150 },
  { name: "MEASI Academy of Architecture", exam: "NATA", baseRank: 125, isScore: true },
  { name: "Rizvi College of Architecture", exam: "NATA", baseRank: 120, isScore: true },
  { name: "Kamla Raheja Vidyanidhi (KRVIA)", exam: "NATA", baseRank: 130, isScore: true },
  { name: "LS Raheja School of Architecture", exam: "NATA", baseRank: 125, isScore: true },
  { name: "Rachana Sansad", exam: "NATA", baseRank: 135, isScore: true },
  { name: "Sushant School of Art & Arch", exam: "NATA", baseRank: 110, isScore: true },
  { name: "Vastu Kala Academy", exam: "NATA", baseRank: 105, isScore: true },
  { name: "USAP, GGSIPU Delhi", exam: "NATA", baseRank: 115, isScore: true },
  { name: "Deenbandhu Chhotu Ram", exam: "JEE Main P2", baseRank: 5000 },
  { name: "Chitkara School of Planning", exam: "NATA", baseRank: 100, isScore: true },
  { name: "LPU School of Architecture", exam: "NATA", baseRank: 95, isScore: true },
  { name: "Amity School of Architecture", exam: "NATA", baseRank: 90, isScore: true },
  { name: "Manipal School of Architecture", exam: "NATA", baseRank: 115, isScore: true },
  { name: "Nitte Institute of Arch", exam: "NATA", baseRank: 110, isScore: true },
  { name: "Wadiyar Centre for Arch", exam: "NATA", baseRank: 120, isScore: true },
  { name: "SIT Tumkur", exam: "NATA", baseRank: 105, isScore: true },
  { name: "JBR Architecture College", exam: "NATA", baseRank: 95, isScore: true },
  { name: "Vaishnavi School of Arch", exam: "NATA", baseRank: 90, isScore: true },
  { name: "Aurora's Design Institute", exam: "NATA", baseRank: 85, isScore: true },
  { name: "CSI Institute of Technology", exam: "NATA", baseRank: 80, isScore: true },
  { name: "McGan's Ooty School", exam: "NATA", baseRank: 100, isScore: true },
];

const generateData = () => {
  const finalData = [];

  years.forEach((year, yIdx) => {
    // Modify ranks slightly based on the year (e.g. earlier years might have slightly lower or higher cutoffs)
    const factor = 1 + yIdx * 0.05; // ranks increase/change slightly back in time

    const yearData = { year, colleges: [] };

    // Engineering
    engineeringColleges.forEach((c) => {
      let rankStr = "";
      if (c.isScore) {
        const score = Math.floor(c.baseRank / factor);
        rankStr = `${score} Score`;
      } else if (c.isPercentile) {
        const perc = Math.min(99.9, c.baseRank + yIdx * 0.1).toFixed(1);
        rankStr = `${perc} %ile`;
      } else {
        const rank = Math.floor(c.baseRank * factor);
        rankStr = rank.toLocaleString();
      }
      yearData.colleges.push({ field: "Engineering", exam: c.exam, name: c.name, rank: rankStr });
    });

    // Medical
    medicalColleges.forEach((c) => {
      let rankStr = "";
      if (c.isScore) {
        const score = Math.floor(c.baseRank / factor);
        rankStr = `${score} Score`;
      } else if (c.isPercentile) {
        const perc = Math.min(99.9, c.baseRank + yIdx * 0.1).toFixed(1);
        rankStr = `${perc} %ile`;
      } else {
        const rank = Math.floor(c.baseRank * factor);
        rankStr = rank.toLocaleString();
      }
      yearData.colleges.push({ field: "Medical", exam: c.exam, name: c.name, rank: rankStr });
    });

    // Pharma
    pharmaColleges.forEach((c) => {
      let rankStr = "";
      if (c.isScore) {
        const score = Math.floor(c.baseRank / factor);
        rankStr = `${score} Score`;
      } else if (c.isPercentile) {
        const perc = Math.min(99.9, c.baseRank - yIdx * 0.2).toFixed(1);
        rankStr = `${perc} %ile`;
      } else {
        const rank = Math.floor(c.baseRank * factor);
        rankStr = rank.toLocaleString();
      }
      yearData.colleges.push({ field: "Pharma", exam: c.exam, name: c.name, rank: rankStr });
    });

    // Architecture
    architectureColleges.forEach((c) => {
      let rankStr = "";
      if (c.isScore) {
        const score = Math.floor(c.baseRank / factor);
        rankStr = `${score} Score`;
      } else if (c.isPercentile) {
        const perc = Math.min(99.9, c.baseRank + yIdx * 0.1).toFixed(1);
        rankStr = `${perc} %ile`;
      } else {
        const rank = Math.floor(c.baseRank * factor);
        rankStr = rank.toLocaleString();
      }
      yearData.colleges.push({ field: "Architecture", exam: c.exam, name: c.name, rank: rankStr });
    });

    finalData.push(yearData);
  });

  const fileContent = `export const historicalData = ${JSON.stringify(finalData, null, 2)};\n`;
  fs.writeFileSync("./src/data/historicalCollegeData.ts", fileContent);
  console.log("Created src/data/historicalCollegeData.ts");
};

// ensure dir
if (!fs.existsSync("./src/data")) {
  fs.mkdirSync("./src/data", { recursive: true });
}

generateData();
