export type CollegeData = {
  id: string;
  name: string;
  location: string;
  closingRank: number;
  branch?: string;
  type: string;
};

export type ExamData = {
  examId: string;
  examName: string;
  maxRank: number;
  colleges: CollegeData[];
};

export const MOCK_EXAM_DATA: ExamData[] = [
  {
    examId: "jee_main",
    examName: "JEE Main",
    maxRank: 1500000,
    colleges: [
      { id: "nit_trichy", name: "NIT Trichy", location: "Tamil Nadu", closingRank: 5000, branch: "Computer Science", type: "NIT" },
      { id: "nit_surathkal", name: "NIT Surathkal", location: "Karnataka", closingRank: 6500, branch: "Computer Science", type: "NIT" },
      { id: "nit_warangal", name: "NIT Warangal", location: "Telangana", closingRank: 7500, branch: "Electronics", type: "NIT" },
      { id: "iiit_hyderabad", name: "IIIT Hyderabad", location: "Telangana", closingRank: 1200, branch: "Computer Science", type: "IIIT" },
      { id: "dtu", name: "Delhi Technological University (DTU)", location: "Delhi", closingRank: 12000, branch: "Computer Science", type: "State" },
      { id: "nsut", name: "NSUT Delhi", location: "Delhi", closingRank: 15000, branch: "IT", type: "State" },
      { id: "nit_calicut", name: "NIT Calicut", location: "Kerala", closingRank: 20000, branch: "Mechanical", type: "NIT" },
      { id: "nit_rourkela", name: "NIT Rourkela", location: "Odisha", closingRank: 25000, branch: "Electrical", type: "NIT" },
      { id: "pec_chandigarh", name: "PEC Chandigarh", location: "Chandigarh", closingRank: 35000, branch: "Civil", type: "State" },
      { id: "thapar", name: "Thapar Institute", location: "Punjab", closingRank: 50000, branch: "Computer Science", type: "Private" },
      { id: "jaypee", name: "Jaypee Institute (JIIT)", location: "Noida", closingRank: 70000, branch: "IT", type: "Private" },
      { id: "lnmiit", name: "LNMIIT Jaipur", location: "Rajasthan", closingRank: 40000, branch: "CSE", type: "Private" },
    ],
  },
  {
    examId: "jee_adv",
    examName: "JEE Advanced",
    maxRank: 250000,
    colleges: [
      { id: "iit_bombay", name: "IIT Bombay", location: "Maharashtra", closingRank: 60, branch: "Computer Science", type: "IIT" },
      { id: "iit_delhi", name: "IIT Delhi", location: "Delhi", closingRank: 110, branch: "Computer Science", type: "IIT" },
      { id: "iit_madras", name: "IIT Madras", location: "Tamil Nadu", closingRank: 160, branch: "Computer Science", type: "IIT" },
      { id: "iit_kanpur", name: "IIT Kanpur", location: "Uttar Pradesh", closingRank: 230, branch: "Computer Science", type: "IIT" },
      { id: "iit_kharagpur", name: "IIT Kharagpur", location: "West Bengal", closingRank: 280, branch: "Computer Science", type: "IIT" },
      { id: "iit_roorkee", name: "IIT Roorkee", location: "Uttarakhand", closingRank: 400, branch: "Computer Science", type: "IIT" },
      { id: "iit_guwahati", name: "IIT Guwahati", location: "Assam", closingRank: 600, branch: "Computer Science", type: "IIT" },
      { id: "iit_hyderabad", name: "IIT Hyderabad", location: "Telangana", closingRank: 650, branch: "Computer Science", type: "IIT" },
      { id: "iit_varanasi", name: "IIT BHU Varanasi", location: "Uttar Pradesh", closingRank: 1000, branch: "Computer Science", type: "IIT" },
      { id: "iit_indore", name: "IIT Indore", location: "Madhya Pradesh", closingRank: 1200, branch: "Computer Science", type: "IIT" },
      { id: "iit_ropar", name: "IIT Ropar", location: "Punjab", closingRank: 2500, branch: "Electrical", type: "IIT" },
      { id: "iit_mandi", name: "IIT Mandi", location: "Himachal Pradesh", closingRank: 3500, branch: "Electrical", type: "IIT" },
      { id: "iit_patna", name: "IIT Patna", location: "Bihar", closingRank: 4500, branch: "Mechanical", type: "IIT" },
      { id: "iit_dhanbad", name: "IIT ISM Dhanbad", location: "Jharkhand", closingRank: 5500, branch: "Mining", type: "IIT" },
      { id: "iit_bhubaneswar", name: "IIT Bhubaneswar", location: "Odisha", closingRank: 7000, branch: "Civil", type: "IIT" },
      { id: "iit_jodhpur", name: "IIT Jodhpur", location: "Rajasthan", closingRank: 9000, branch: "Civil", type: "IIT" },
      { id: "iit_tirupati", name: "IIT Tirupati", location: "Andhra Pradesh", closingRank: 12000, branch: "Chemical", type: "IIT" },
      { id: "iit_palakkad", name: "IIT Palakkad", location: "Kerala", closingRank: 15000, branch: "Physics", type: "IIT" },
      { id: "iit_dharwad", name: "IIT Dharwad", location: "Karnataka", closingRank: 18000, branch: "Engineering Physics", type: "IIT" },
    ],
  },
  {
    examId: "neet",
    examName: "NEET UG",
    maxRank: 2500000,
    colleges: [
      { id: "aiims_delhi", name: "AIIMS New Delhi", location: "Delhi", closingRank: 50, branch: "MBBS", type: "AIIMS" },
      { id: "cmc_vellore", name: "CMC Vellore", location: "Tamil Nadu", closingRank: 150, branch: "MBBS", type: "Private" },
      { id: "jipmer", name: "JIPMER Puducherry", location: "Puducherry", closingRank: 250, branch: "MBBS", type: "Govt" },
      { id: "afmc", name: "AFMC Pune", location: "Maharashtra", closingRank: 1500, branch: "MBBS", type: "Govt" },
      { id: "mamc", name: "MAMC Delhi", location: "Delhi", closingRank: 2000, branch: "MBBS", type: "Govt" },
      { id: "kgmu", name: "KGMU Lucknow", location: "Uttar Pradesh", closingRank: 4000, branch: "MBBS", type: "Govt" },
      { id: "aiims_bhubaneswar", name: "AIIMS Bhubaneswar", location: "Odisha", closingRank: 5000, branch: "MBBS", type: "AIIMS" },
      { id: "aiims_bhopal", name: "AIIMS Bhopal", location: "Madhya Pradesh", closingRank: 6000, branch: "MBBS", type: "AIIMS" },
      { id: "aiims_jodhpur", name: "AIIMS Jodhpur", location: "Rajasthan", closingRank: 7500, branch: "MBBS", type: "AIIMS" },
      { id: "gmc_mumbai", name: "Grant Medical College", location: "Maharashtra", closingRank: 10000, branch: "MBBS", type: "Govt" },
      { id: "bjmc", name: "B.J. Medical College", location: "Gujarat", closingRank: 15000, branch: "MBBS", type: "Govt" },
      { id: "gmc_chandigarh", name: "GMCH Chandigarh", location: "Chandigarh", closingRank: 20000, branch: "MBBS", type: "Govt" },
      { id: "kasturba", name: "Kasturba Medical College", location: "Manipal", closingRank: 45000, branch: "MBBS", type: "Private" },
      { id: "ms_ramaiah", name: "M.S. Ramaiah Medical College", location: "Karnataka", closingRank: 60000, branch: "MBBS", type: "Private" },
      { id: "dy_patil", name: "Dr. D.Y. Patil Medical College", location: "Maharashtra", closingRank: 120000, branch: "MBBS", type: "Private" },
    ],
  },
  {
    examId: "bitsat",
    examName: "BITSAT",
    maxRank: 300000, // BITSAT uses score, but we will mock it as rank for simplicity in UI, or we can use "score" semantics. Actually, rank predictor usually works with rank. We'll stick to rank semantics but display it generally as rank. BITSAT doesn't technically issue public ranks in the same way, but it works for mock data. Wait, let's use CUET instead, it's more standard.
    colleges: [
      { id: "bits_pilani_cs", name: "BITS Pilani (Pilani Campus)", location: "Rajasthan", closingRank: 2000, branch: "Computer Science", type: "Private" },
      { id: "bits_goa_cs", name: "BITS Pilani (Goa Campus)", location: "Goa", closingRank: 4000, branch: "Computer Science", type: "Private" },
      { id: "bits_hyd_cs", name: "BITS Pilani (Hyderabad Campus)", location: "Telangana", closingRank: 6000, branch: "Computer Science", type: "Private" },
      { id: "bits_pilani_ece", name: "BITS Pilani (Pilani Campus)", location: "Rajasthan", closingRank: 8000, branch: "ECE", type: "Private" },
      { id: "bits_goa_ece", name: "BITS Pilani (Goa Campus)", location: "Goa", closingRank: 12000, branch: "ECE", type: "Private" },
      { id: "bits_hyd_ece", name: "BITS Pilani (Hyderabad Campus)", location: "Telangana", closingRank: 16000, branch: "ECE", type: "Private" },
      { id: "bits_pilani_mech", name: "BITS Pilani (Pilani Campus)", location: "Rajasthan", closingRank: 25000, branch: "Mechanical", type: "Private" },
      { id: "bits_goa_mech", name: "BITS Pilani (Goa Campus)", location: "Goa", closingRank: 35000, branch: "Mechanical", type: "Private" },
      { id: "bits_hyd_mech", name: "BITS Pilani (Hyderabad Campus)", location: "Telangana", closingRank: 45000, branch: "Mechanical", type: "Private" },
    ],
  },
  {
    examId: "cuet",
    examName: "CUET (UG)",
    maxRank: 1500000,
    colleges: [
      { id: "srcc", name: "SRCC, Delhi University", location: "Delhi", closingRank: 500, branch: "B.Com (Hons)", type: "Central" },
      { id: "hindu", name: "Hindu College", location: "Delhi", closingRank: 1000, branch: "B.A. (Hons) Economics", type: "Central" },
      { id: "stephens", name: "St. Stephen's College", location: "Delhi", closingRank: 1500, branch: "B.Sc (Hons) Physics", type: "Central" },
      { id: "lsr", name: "Lady Shri Ram College", location: "Delhi", closingRank: 2000, branch: "B.A. (Hons) Psychology", type: "Central" },
      { id: "miranda", name: "Miranda House", location: "Delhi", closingRank: 3500, branch: "B.A. (Hons) English", type: "Central" },
      { id: "hansraj", name: "Hansraj College", location: "Delhi", closingRank: 5000, branch: "B.Sc (Hons) Computer Science", type: "Central" },
      { id: "bhu", name: "Banaras Hindu University (BHU)", location: "Uttar Pradesh", closingRank: 8000, branch: "B.A. (Hons)", type: "Central" },
      { id: "jnu", name: "Jawaharlal Nehru University (JNU)", location: "Delhi", closingRank: 10000, branch: "B.A. (Hons) Foreign Languages", type: "Central" },
      { id: "amu", name: "Aligarh Muslim University (AMU)", location: "Uttar Pradesh", closingRank: 15000, branch: "B.Sc (Hons)", type: "Central" },
      { id: "jmi", name: "Jamia Millia Islamia", location: "Delhi", closingRank: 20000, branch: "B.A. (Hons) Mass Media", type: "Central" },
      { id: "uohyd", name: "University of Hyderabad", location: "Telangana", closingRank: 25000, branch: "Integrated M.Sc", type: "Central" },
    ]
  }
];
