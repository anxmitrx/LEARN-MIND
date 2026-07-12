export type Topic = { title: string; icon: string };

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
  oneLinerPromise: string;
  whoItsFor: string[];
  youWillLearn: string[];
  exampleSessions: string[];
  timeCommitment: string;
};

export const tracks: Track[] = [
  {
    slug: "personal-professional",
    number: "01",
    title: "Develop Personally & Professionally",
    short: "Career Compass",
    tagline: "Build a rock-solid foundation and gain career clarity.",
    description:
      "Build a rock-solid foundation. Gain clarity on your goals and build a network that opens doors.",
    topics: [
      { title: "Career Pathing", icon: "Compass" },
      { title: "Goal Setting", icon: "Target" },
      { title: "Network Building — LinkedIn Step-by-Step", icon: "Network" },
      { title: "Creating Team Member Connections", icon: "Users" },
      { title: "Work–Life Balance", icon: "Scale" },
    ],
    outcomes: [
      "A customized 3-year career roadmap detailing milestone metrics",
      "An optimized LinkedIn profile ranking in the top 1% of your peer group",
      "A Personal Relationship Management system tracking 50+ warm industry connections",
    ],
    agenda: [
      {
        time: "00:00",
        title: "Career Diagnostic",
        detail: "Identify your strengths, gaps, and target roles.",
      },
      {
        time: "00:30",
        title: "LinkedIn Live Audit",
        detail: "Rewrite your headline & banner in real-time.",
      },
      {
        time: "01:00",
        title: "Network 100 Worksheet",
        detail: "Build your map of warm + cold connections.",
      },
      {
        time: "01:30",
        title: "Goal-Setting Workshop",
        detail: "Apply OKRs to your personal career roadmap.",
      },
    ],
    radar: [
      { label: "Clarity", value: 90 },
      { label: "Network", value: 85 },
      { label: "Discipline", value: 75 },
      { label: "Visibility", value: 80 },
      { label: "Confidence", value: 88 },
    ],
    oneLinerPromise:
      "Define your career trajectory, polish your LinkedIn presence, and establish a high-leverage professional network.",
    whoItsFor: [
      "Engineering & business candidates looking to define their ideal industry domains.",
      "Undergraduates hoping to build a credible, stand-out personal brand before graduation.",
      "Students wanting to establish actionable goals and maintain daily productivity routines.",
    ],
    youWillLearn: [
      "Career trajectory charting & reverse-engineering premium role profiles",
      "Optimizing your LinkedIn headline, bio, and content creation structure",
      "Networking frameworks for engaging alumni, talent acquisition professionals, and leaders",
      "Translating abstract goals into specific quarterly Objectives and Key Results (OKRs)",
      "Building self-discipline routines to balance academics, work search, and personal health",
    ],
    exampleSessions: [
      "Career Blueprinting: Identifying Strengths and Industry Realities",
      "Headline & Banner Optimization: Crafting Your Digital Pitch",
      "Outreach Engineering: Templates & Etiquette for Professional Networking",
      "Personal OKRs: Building a High-Performance Weekly Routine",
      "Stress Management: Balance Frameworks for Competitive Environments",
    ],
    timeCommitment: "4 hours/week (2h Live Workshop + 2h Application Project)",
  },
  {
    slug: "soft-skills",
    number: "02",
    title: "Soft Skills & Workplace Competencies",
    short: "Workplace OS",
    tagline: "Master the unwritten rules of the workplace.",
    description:
      "Master the unwritten rules of the workplace. Learn to communicate effectively and manage your time like a seasoned pro.",
    topics: [
      { title: "Effective Communication", icon: "Mic" },
      { title: "Navigating Corporate Culture", icon: "Building2" },
      { title: "Managing Up", icon: "ArrowUpRight" },
      { title: "Emotional Intelligence (EQ)", icon: "Heart" },
      { title: "Time Management & Productivity", icon: "Clock" },
    ],
    outcomes: [
      "A curated toolkit of communication templates for project updates, escalations, and status reviews",
      "A time-blocking scheduler layout resulting in a documented productivity boost",
      "A personal communication profile diagnostic highlighting core growth areas",
    ],
    agenda: [
      {
        time: "00:00",
        title: "The Corporate Decoder",
        detail: "Unspoken rules of MNCs, startups, and consulting firms.",
      },
      {
        time: "00:40",
        title: "Communication Drills",
        detail: "Live email + Slack rewrites with a senior PM.",
      },
      { time: "01:20", title: "EQ in Action", detail: "Roleplay tough conversations." },
      {
        time: "02:00",
        title: "Time-Blocking Lab",
        detail: "Build your weekly system on the spot.",
      },
    ],
    radar: [
      { label: "Communication", value: 92 },
      { label: "EQ", value: 85 },
      { label: "Influence", value: 78 },
      { label: "Focus", value: 82 },
      { label: "Resilience", value: 80 },
    ],
    oneLinerPromise:
      "Master corporate communication dynamics, emotional intelligence (EQ), and structured time management.",
    whoItsFor: [
      "Technical students wanting to translate complex engineering logic into clear business updates.",
      "Candidates aiming to navigate corporate structures and peer conflicts constructively.",
      "Students preparing to lead group projects or coordinate multi-disciplinary teams.",
    ],
    youWillLearn: [
      "Writing professional, response-focused emails and project status updates on Slack",
      "Managing Up: Proactively aligning workloads and expectations with your manager",
      "Active listening and handling critical design or performance feedback with maturity",
      "Understanding organizational dynamics, corporate culture differences, and power grids",
      "Structuring focus blocks to isolate deep work and limit daily context-switching",
    ],
    exampleSessions: [
      "Slack & Email Clinic: Live Writing and Tone Modification Exercises",
      "The Art of Managing Up: Setting Boundaries and Demonstrating Accountability",
      "Conflict Resolution Scenarios: Simulating Hard Peer Discussions",
      "Productivity Engineering: Establishing Your Weekly Time-Blocking Blueprint",
      "Deciphering Corporate DNA: Enterprise Workflows vs. Startup Agility",
    ],
    timeCommitment: "4 hours/week (2.5h Live Session + 1.5h Application Work)",
  },
  {
    slug: "engineering",
    number: "03",
    title: "Engineering Specific Topics",
    short: "Build & Ship",
    tagline: "Bridge the gap between passing exams and shipping products.",
    description:
      "Bridge the gap between passing exams and shipping real products. Learn the frameworks modern tech companies actually use.",
    topics: [
      { title: "Project Management & Lifecycle (SDLC)", icon: "Cog" },
      { title: "Technical Problem Solving", icon: "Wrench" },
      { title: "IT Industry Trends — Excel, Salesforce, AI, PPT", icon: "Cpu" },
      { title: "Ethical Dilemmas in Engineering", icon: "ShieldAlert" },
      { title: "Emerging Technologies", icon: "Atom" },
      { title: "Data Science", icon: "BarChart3" },
    ],
    outcomes: [
      "An architectural spec sheet outlining database choices, system models, and design trade-offs",
      "Practical experience running agile sprint structures inside a mock Jira ecosystem",
      "An AI-assisted code portfolio showing test suite additions and optimized refactoring",
    ],
    agenda: [
      {
        time: "00:00",
        title: "SDLC Walkthrough",
        detail: "From discovery → deploy with a real product.",
      },
      {
        time: "00:45",
        title: "Problem-Solving Live",
        detail: "Open-ended debugging with a senior engineer.",
      },
      {
        time: "01:30",
        title: "AI Tooling Stack",
        detail: "Cursor, Copilot, ChatGPT — for real engineering work.",
      },
      { time: "02:15", title: "Ethics Case Study", detail: "When to push back, when to escalate." },
    ],
    radar: [
      { label: "Process", value: 88 },
      { label: "Debugging", value: 82 },
      { label: "AI Fluency", value: 90 },
      { label: "Systems", value: 78 },
      { label: "Ethics", value: 75 },
    ],
    oneLinerPromise:
      "Bridge the gap between academic code and building, deploying, and maintaining enterprise-scale products.",
    whoItsFor: [
      "Computer science and engineering majors seeking industry-standard project experience.",
      "Junior software developers wanting to master full lifecycle architectures.",
      "Tech candidates looking to harness AI tools to accelerate code generation and refactoring safely.",
    ],
    youWillLearn: [
      "The Software Development Life Cycle (SDLC): Sprints, CI/CD pipelines, and Version Control",
      "Structured technical problem-solving and talking through architectural trade-offs",
      "Practical application of modern office suites (Jira, Git, databases, advanced scripting)",
      "Integrating AI assistants (Cursor, Copilot, ChatGPT) safely into local codebases",
      "Core safety, scalability, and ethical responsibilities of modern software engineers",
    ],
    exampleSessions: [
      "Sprint Diagnostics: Simulating an Agile Workspace from Backlog to Demo",
      "Architectural Decisions: Monoliths vs. Microservices and NoSQL vs. SQL",
      "Enterprise Dev Setup: Working with Git, Docker, and Basic Deployments",
      "AI-Driven Development: Optimizing Code with Generative Assistants",
      "Engineering Ethics & Security: Protecting User Privacy and Mitigating Vulnerabilities",
    ],
    timeCommitment: "5 hours/week (3h Live Labs + 2h Independent Projects)",
  },
  {
    slug: "management",
    number: "04",
    title: "Management Specific Topics",
    short: "Frameworks Live",
    tagline: "Move beyond theoretical frameworks to real business decisions.",
    description:
      "Move beyond theoretical frameworks. Apply data-driven decision-making to real business scenarios.",
    topics: [
      { title: "Data-Driven Decision Making", icon: "LineChart" },
      { title: "Operational Excellence", icon: "Gauge" },
      { title: "Product Management & Innovation", icon: "Package" },
      { title: "Product Life Cycle", icon: "Recycle" },
      { title: "Organizational Behaviour", icon: "Users2" },
      { title: "Financial Management", icon: "Wallet" },
      { title: "Sales & Distribution — Retail / B2B / B2C", icon: "Store" },
    ],
    outcomes: [
      "A comprehensive Product Requirements Document (PRD) detailing feature iterations",
      "A customized cohort retention model and unit economics analysis spreadsheet",
      "A structured slideset analyzing the offline and online logistics of a consumer brand",
    ],
    agenda: [
      {
        time: "00:00",
        title: "Live Case Crack",
        detail: "Tear apart a real Indian D2C brand's growth model.",
      },
      {
        time: "00:50",
        title: "Data Decision Lab",
        detail: "Use a real dashboard to make a CXO-level call.",
      },
      {
        time: "01:40",
        title: "Product Roadmap Build",
        detail: "Build a 6-quarter roadmap on the whiteboard.",
      },
      {
        time: "02:30",
        title: "Finance Without Fear",
        detail: "P&L, CAC, LTV — explained by a CFO.",
      },
    ],
    radar: [
      { label: "Strategy", value: 86 },
      { label: "Analytics", value: 88 },
      { label: "Product", value: 82 },
      { label: "Finance", value: 78 },
      { label: "Sales", value: 80 },
    ],
    oneLinerPromise:
      "Acquire data-driven decision capabilities, roadmap structures, and unit economics tools used by product managers.",
    whoItsFor: [
      "Business, management, and MBA candidates seeking structured analytical roles.",
      "Engineering students looking to pivot into Product Management or business strategy.",
      "Aspiring founders who need to master corporate finance and user-growth mechanics.",
    ],
    youWillLearn: [
      "Structuring complex business problems and defining key performance indicators (KPIs)",
      "Product roadmapping, user persona mapping, and detailing MVP spec outlines",
      "Financial analysis basics, understanding P&L sheets, and analyzing unit economics",
      "Operational workflows, distribution logistics, and customer acquisition funnels",
      "Organizational design frameworks to guide teams and run operations smoothly",
    ],
    exampleSessions: [
      "Market Case Challenge: Analyzing D2C Brands and Growth Drivers",
      "Executive Dashboards: Using Data to Make Multi-million Dollar Decisions",
      "PRD Blueprint: Mapping User Journeys and Drafting Feature Scope",
      "Corporate Finance: Cohorts, LTV, CAC, and Operational Runway",
      "Sales Execution: Building Enterprise Sales Pipelines and Customer Journeys",
    ],
    timeCommitment: "5 hours/week (3h Case Sessions + 2h Business Modeling)",
  },
  {
    slug: "practical",
    number: "05",
    title: "Practical Situations & Guidance",
    short: "Real World Lab",
    tagline: "Rehearse for reality and handle professional setbacks.",
    description:
      "Rehearse for reality. From salary negotiations to handling your first professional setback, we'll guide you through it.",
    topics: [
      { title: "Negotiating Salaries & Offers", icon: "HandCoins" },
      { title: "Interview Preparation", icon: "MessageSquare" },
      { title: "Resume & LinkedIn Optimization", icon: "FileText" },
      { title: "Handling Failure & Mistakes", icon: "RefreshCw" },
      { title: "Work–Life Integration", icon: "GitBranch" },
      { title: "Transition from Student to Employee", icon: "GraduationCap" },
      { title: "Business Simulations & Case Studies", icon: "Briefcase" },
      { title: "Industry Leader AMAs", icon: "Sparkles" },
      { title: "Professionalism & Spiritualism", icon: "Heart" },
      { title: "Internship & Industry Visits", icon: "Rocket" },
    ],
    outcomes: [
      "An ATS-compliant, recruiter-vetted professional resume",
      "A personal negotiation playbook featuring script variations for local market ranges",
      "A customized 90-day onboarding blueprint detailing career-launch milestones",
    ],
    agenda: [
      {
        time: "00:00",
        title: "Salary Negotiation Live",
        detail: "Real Indian offer letters, real counter-scripts.",
      },
      {
        time: "00:45",
        title: "Mock Interview Round",
        detail: "HR + behavioural + technical with feedback.",
      },
      {
        time: "01:30",
        title: "Failure Recovery Frames",
        detail: "What to do when you break production day 1.",
      },
      {
        time: "02:15",
        title: "Inner Engineering Intro",
        detail: "Sadhguru-inspired daily routine for clarity.",
      },
    ],
    radar: [
      { label: "Negotiation", value: 90 },
      { label: "Interviews", value: 88 },
      { label: "Resilience", value: 85 },
      { label: "Awareness", value: 80 },
      { label: "Inner Calm", value: 78 },
    ],
    oneLinerPromise:
      "Simulate real-world compensation discussions, ace interviews, and cultivate stability for professional growth.",
    whoItsFor: [
      "Graduating students preparing to enter intense placement and recruiting cycles.",
      "Candidates holding initial offers who want to negotiate better compensation scripts.",
      "Students wanting to build long-term focus, clarity, and stress management.",
    ],
    youWillLearn: [
      "Negotiating compensation packages and evaluating competing job offers",
      "Perfecting behavioral (STAR framework) and technical screening rounds",
      "ATS-optimized resume formats and tailoring profiles to match target descriptions",
      "Cognitive approaches to bounce back from interview rejections or early team mistakes",
      "Transition planning to move smoothly from academic schedules to full-time work",
      "Mindfulness frameworks to handle stress and improve daily focus and stability",
    ],
    exampleSessions: [
      "Offer Optimization: Live Compensation Dialogue Simulations",
      "Interview Prep: Mastering Behavioral Scenarios under Panel pressure",
      "Resume Clinic: Restructuring Bullets for Maximum Impact and Flow",
      "Recovery Tactics: Handling Mistakes and Production Faults Gracefully",
      "The Onboarding Blueprint: Navigating Your First 90 Days with High Authority",
      "Mindfulness for Builders: Stress Management and Focus Techniques",
    ],
    timeCommitment: "6 hours/week (3h Interactive Workshops + 3h Practical Labs)",
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
