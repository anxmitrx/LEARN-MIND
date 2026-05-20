export type Mentor = {
  name: string;
  title: string;
  qualifications: string;
  topics: string[];
  initials: string;
  hue: number;
};

export const mentors: Mentor[] = [
  { name: "Aarav Mehta", title: "Sr. PM at Atlassian", qualifications: "MBA, IIM Bangalore", topics: ["Product", "Managing Up"], initials: "AM", hue: 45 },
  { name: "Priya Iyer", title: "Engineering Lead at Razorpay", qualifications: "B.Tech, IIT Madras", topics: ["SDLC", "AI Tools"], initials: "PI", hue: 55 },
  { name: "Rohit Khanna", title: "Data Science Manager at Swiggy", qualifications: "MS, BITS Pilani", topics: ["Data Science", "Decisions"], initials: "RK", hue: 60 },
  { name: "Ananya Reddy", title: "HRBP at Infosys", qualifications: "MBA, XLRI Jamshedpur", topics: ["Negotiation", "Interviews"], initials: "AR", hue: 38 },
  { name: "Vikram Singh", title: "Founder, EdTech Startup", qualifications: "B.Tech + MBA, IIT/IIM", topics: ["Career Pathing", "Network"], initials: "VS", hue: 50 },
  { name: "Sneha Kapoor", title: "Brand Manager at HUL", qualifications: "MBA, FMS Delhi", topics: ["Marketing", "Sales"], initials: "SK", hue: 42 },
  { name: "Karthik Rao", title: "CFO, Series B Startup", qualifications: "CA + MBA, IIM Ahmedabad", topics: ["Finance", "Operations"], initials: "KR", hue: 58 },
  { name: "Meera Joshi", title: "Sr. Designer at Atlassian", qualifications: "M.Des, NID Ahmedabad", topics: ["Communication", "EQ"], initials: "MJ", hue: 48 },
];
