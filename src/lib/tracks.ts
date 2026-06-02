import {
  Compass, Target, Network, Users, Scale, HandCoins, MessageSquare, FileText,
  Mic, Building2, ArrowUpRight, Heart, Clock,
  Cog, Wrench, Cpu, ShieldAlert, Atom, BarChart3,
  LineChart, Gauge, Package, Recycle, Users2, Wallet, Store,
  RefreshCw, GitBranch, GraduationCap, Briefcase, Sparkles, Rocket,
} from "lucide-react";

export type Topic = { title: string; icon: React.ComponentType<{ className?: string }> };

export type Track = {
  slug: string;
  number: string;
  title: string;
  short: string;
  tagline: string;
  description: string;
  topics: Topic[];
  outcomes: string[];
  agenda: { time: string; title: string; detail: string }[];
  radar: { label: string; value: number }[];
};

export const tracks: Track[] = [
  {
    slug: "personal-professional",
    number: "01",
    title: "Develop Personally & Professionally",
    short: "Career Compass",
    tagline: "The career compass your college never gave you.",
    description:
      "Build the foundation of a career — clarity on where you're going, a network that opens doors, and the personal operating system to get there.",
    topics: [
      { title: "Career Pathing", icon: Compass },
      { title: "Goal Setting", icon: Target },
      { title: "Network Building — LinkedIn Step-by-Step", icon: Network },
      { title: "Creating Team Member Connections", icon: Users },
      { title: "Work–Life Balance", icon: Scale },
    ],
    outcomes: [
      "Map a 3-year career trajectory with concrete milestones",
      "Build a LinkedIn profile that recruiters actually open",
      "Set quarterly goals with measurable outcomes",
      "Form authentic professional connections — not just contacts",
    ],
    agenda: [
      { time: "00:00", title: "Career Diagnostic", detail: "Identify your strengths, gaps, and target roles." },
      { time: "00:30", title: "LinkedIn Live Audit", detail: "Rewrite your headline & banner in real-time." },
      { time: "01:00", title: "Network 100 Worksheet", detail: "Build your map of warm + cold connections." },
      { time: "01:30", title: "Goal-Setting Workshop", detail: "Apply OKRs to your personal career roadmap." },
    ],
    radar: [
      { label: "Clarity", value: 90 },
      { label: "Network", value: 85 },
      { label: "Discipline", value: 75 },
      { label: "Visibility", value: 80 },
      { label: "Confidence", value: 88 },
    ],
  },
  {
    slug: "soft-skills",
    number: "02",
    title: "Soft Skills & Workplace Competencies",
    short: "Workplace OS",
    tagline: "How professionals actually behave at work.",
    description:
      "Most freshers fail not on the work — but on the workplace. Learn to read rooms, manage managers, and own your time like a senior.",
    topics: [
      { title: "Effective Communication", icon: Mic },
      { title: "Navigating Corporate Culture", icon: Building2 },
      { title: "Managing Up", icon: ArrowUpRight },
      { title: "Emotional Intelligence (EQ)", icon: Heart },
      { title: "Time Management & Productivity", icon: Clock },
    ],
    outcomes: [
      "Write emails and Slack messages that get instant replies",
      "Read team dynamics and avoid political landmines",
      "Manage your manager — set expectations and deliver",
      "Run your week with a productivity system that actually sticks",
    ],
    agenda: [
      { time: "00:00", title: "The Corporate Decoder", detail: "Unspoken rules of MNCs, startups, and consulting firms." },
      { time: "00:40", title: "Communication Drills", detail: "Live email + Slack rewrites with a senior PM." },
      { time: "01:20", title: "EQ in Action", detail: "Roleplay tough conversations." },
      { time: "02:00", title: "Time-Blocking Lab", detail: "Build your weekly system on the spot." },
    ],
    radar: [
      { label: "Communication", value: 92 },
      { label: "EQ", value: 85 },
      { label: "Influence", value: 78 },
      { label: "Focus", value: 82 },
      { label: "Resilience", value: 80 },
    ],
  },
  {
    slug: "engineering",
    number: "03",
    title: "Engineering Specific Topics",
    short: "Build & Ship",
    tagline: "From SDLC to AI — bridge the classroom-to-industry gap.",
    description:
      "Engineering school teaches you to pass. Industry needs you to ship. This track is the missing semester on how real software gets built.",
    topics: [
      { title: "Project Management & Lifecycle (SDLC)", icon: Cog },
      { title: "Technical Problem Solving", icon: Wrench },
      { title: "IT Industry Trends — Excel, Salesforce, AI, PPT", icon: Cpu },
      { title: "Ethical Dilemmas in Engineering", icon: ShieldAlert },
      { title: "Emerging Technologies", icon: Atom },
      { title: "Data Science", icon: BarChart3 },
    ],
    outcomes: [
      "Speak fluently about Agile, sprints, and the SDLC in interviews",
      "Use AI tools to multiply your output as a junior engineer",
      "Reason through technical tradeoffs out loud — not just on paper",
      "Spot ethical red flags before they become career risks",
    ],
    agenda: [
      { time: "00:00", title: "SDLC Walkthrough", detail: "From discovery → deploy with a real product." },
      { time: "00:45", title: "Problem-Solving Live", detail: "Open-ended debugging with a senior engineer." },
      { time: "01:30", title: "AI Tooling Stack", detail: "Cursor, Copilot, ChatGPT — for real engineering work." },
      { time: "02:15", title: "Ethics Case Study", detail: "When to push back, when to escalate." },
    ],
    radar: [
      { label: "Process", value: 88 },
      { label: "Debugging", value: 82 },
      { label: "AI Fluency", value: 90 },
      { label: "Systems", value: 78 },
      { label: "Ethics", value: 75 },
    ],
  },
  {
    slug: "management",
    number: "04",
    title: "Management Specific Topics",
    short: "Frameworks Live",
    tagline: "Frameworks made real with industry case studies.",
    description:
      "Stop memorising frameworks for exams. Apply them to live business problems and learn how managers actually decide.",
    topics: [
      { title: "Data-Driven Decision Making", icon: LineChart },
      { title: "Operational Excellence", icon: Gauge },
      { title: "Product Management & Innovation", icon: Package },
      { title: "Product Life Cycle", icon: Recycle },
      { title: "Organizational Behaviour", icon: Users2 },
      { title: "Financial Management", icon: Wallet },
      { title: "Sales & Distribution — Retail / B2B / B2C", icon: Store },
    ],
    outcomes: [
      "Defend a business decision with data — not just intuition",
      "Walk through a real product roadmap from launch to sunset",
      "Read a P&L and a unit economics sheet without freezing",
      "Pitch a sales motion for B2B and B2C contexts",
    ],
    agenda: [
      { time: "00:00", title: "Live Case Crack", detail: "Tear apart a real Indian D2C brand's growth model." },
      { time: "00:50", title: "Data Decision Lab", detail: "Use a real dashboard to make a CXO-level call." },
      { time: "01:40", title: "Product Roadmap Build", detail: "Build a 6-quarter roadmap on the whiteboard." },
      { time: "02:30", title: "Finance Without Fear", detail: "P&L, CAC, LTV — explained by a CFO." },
    ],
    radar: [
      { label: "Strategy", value: 86 },
      { label: "Analytics", value: 88 },
      { label: "Product", value: 82 },
      { label: "Finance", value: 78 },
      { label: "Sales", value: 80 },
    ],
  },
  {
    slug: "practical",
    number: "05",
    title: "Practical Situations & Guidance",
    short: "Real World Lab",
    tagline: "The unspoken transitions every fresher faces.",
    description:
      "Salary negotiation, interview nerves, your first failed project, your first PIP scare — we rehearse the moments your friends won't talk about.",
    topics: [
      { title: "Negotiating Salaries & Offers", icon: HandCoins },
      { title: "Interview Preparation", icon: MessageSquare },
      { title: "Resume & LinkedIn Optimization", icon: FileText },
      { title: "Handling Failure & Mistakes", icon: RefreshCw },
      { title: "Work–Life Integration", icon: GitBranch },
      { title: "Transition from Student to Employee", icon: GraduationCap },
      { title: "Business Simulations & Case Studies", icon: Briefcase },
      { title: "Industry Leader AMAs", icon: Sparkles },
      { title: "Professionalism & Spiritualism", icon: Heart },
      { title: "Internship & Industry Visits", icon: Rocket },
    ],
    outcomes: [
      "Negotiate ₹1–4 LPA more on your first offer — with scripts",
      "Walk into HR + technical rounds with rehearsed answers",
      "Recover gracefully from your first big mistake at work",
      "Build inner stability with Inner Engineering principles",
    ],
    agenda: [
      { time: "00:00", title: "Salary Negotiation Live", detail: "Real Indian offer letters, real counter-scripts." },
      { time: "00:45", title: "Mock Interview Round", detail: "HR + behavioural + technical with feedback." },
      { time: "01:30", title: "Failure Recovery Frames", detail: "What to do when you break production day 1." },
      { time: "02:15", title: "Inner Engineering Intro", detail: "Sadhguru-inspired daily routine for clarity." },
    ],
    radar: [
      { label: "Negotiation", value: 90 },
      { label: "Interviews", value: 88 },
      { label: "Resilience", value: 85 },
      { label: "Awareness", value: 80 },
      { label: "Inner Calm", value: 78 },
    ],
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
