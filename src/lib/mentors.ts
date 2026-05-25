export type Mentor = {
  name: string;
  title: string;
  qualifications: string;
  topics: string[];
  initials: string;
  hue: number;
};

export const mentors: Mentor[] = [
  {
    name: "Tanmoy Sain",
    title: "Lead Industry Mentor",
    qualifications: "Industry Expert",
    topics: ["Career Pathing", "Strategy"],
    initials: "TS",
    hue: 45,
  },
  {
    name: "Sayantan Kundu",
    title: "Senior Strategy Mentor",
    qualifications: "Strategy Leader",
    topics: ["Operations", "Leadership"],
    initials: "SK",
    hue: 55,
  },
];
