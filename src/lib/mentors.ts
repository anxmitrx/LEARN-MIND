export type Mentor = {
  name: string;
  title: string;
  qualifications: string;
  bio: string;
  topics: string[];
  initials: string;
  hue: number;
};

export const mentors: Mentor[] = [
  {
    name: "Tanmoy Sain",
    title: "Lead Industry Mentor",
    qualifications: "Industry Expert",
    bio: "With years of experience steering high-stakes industry projects, Tanmoy specializes in demystifying the corporate labyrinth for fresh graduates. He transforms anxious students into strategic thinkers, focusing on career pathing and long-term professional growth.",
    topics: ["Career Pathing", "Strategic Growth", "Industry Readiness"],
    initials: "TS",
    hue: 45,
  },
  {
    name: "Sayantan Kundu",
    title: "Senior Strategy Mentor",
    qualifications: "Strategy Leader",
    bio: "A master of operational excellence and team dynamics, Sayantan bridges the gap between textbook theory and real-world leadership. His mentorship focuses on building resilience, emotional intelligence, and the operational skills required to thrive from day one.",
    topics: ["Operations", "Leadership", "Corporate Culture"],
    initials: "SK",
    hue: 55,
  },
];
