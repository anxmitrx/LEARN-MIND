import {
  Compass, Target, Network, Users, Scale, HandCoins, MessageSquare, FileText,
  Mic, Building2, ArrowUpRight, Heart, Clock,
  Cog, Wrench, Cpu, ShieldAlert, Atom, BarChart3,
  LineChart, Gauge, Package, Recycle, Users2, Wallet, Store,
  RefreshCw, GitBranch, GraduationCap,
} from "lucide-react";

type Topic = { title: string; icon: React.ComponentType<{ className?: string }> };
type Group = {
  id: string;
  title: string;
  blurb: string;
  accent: "indigo" | "amber" | "emerald" | "navy" | "rose" | "teal";
  topics: Topic[];
};

const groups: Group[] = [
  {
    id: "personal-pro",
    title: "Develop Personally & Professionally",
    blurb: "The career compass your college never gave you.",
    accent: "indigo",
    topics: [
      { title: "Career Pathing", icon: Compass },
      { title: "Goal Setting", icon: Target },
      { title: "Network Building — LinkedIn Step-by-Step", icon: Network },
      { title: "Creating Team Member Connections", icon: Users },
      { title: "Work–Life Balance", icon: Scale },
      { title: "Negotiating Salaries & Offers", icon: HandCoins },
      { title: "Interview Preparation", icon: MessageSquare },
      { title: "Resume Prep & LinkedIn Optimization", icon: FileText },
    ],
  },
  {
    id: "soft-skills",
    title: "Soft Skills & Workplace Competencies",
    blurb: "How professionals actually behave at work.",
    accent: "amber",
    topics: [
      { title: "Effective Communication", icon: Mic },
      { title: "Navigating Corporate Culture", icon: Building2 },
      { title: "Managing Up", icon: ArrowUpRight },
      { title: "Emotional Intelligence (EQ)", icon: Heart },
      { title: "Time Management & Productivity", icon: Clock },
    ],
  },
  {
    id: "engineering",
    title: "Engineering-Specific Topics",
    blurb: "From SDLC to AI tools — bridge classroom to industry.",
    accent: "teal",
    topics: [
      { title: "Project Management & Lifecycle (SDLC)", icon: Cog },
      { title: "Technical Problem Solving", icon: Wrench },
      { title: "IT Trends & Tools — Excel, Salesforce, AI, PPT", icon: Cpu },
      { title: "Ethical Dilemmas in Engineering", icon: ShieldAlert },
      { title: "Emerging Technologies", icon: Atom },
      { title: "Data Science", icon: BarChart3 },
    ],
  },
  {
    id: "management",
    title: "Management-Specific Topics",
    blurb: "Frameworks made real with industry case studies.",
    accent: "navy",
    topics: [
      { title: "Data-Driven Decision Making", icon: LineChart },
      { title: "Operational Excellence", icon: Gauge },
      { title: "Product Management & Innovation", icon: Package },
      { title: "Product Life Cycle", icon: Recycle },
      { title: "Organizational Behaviour", icon: Users2 },
      { title: "Financial Management", icon: Wallet },
      { title: "Sales & Distribution — Retail / B2B / B2C", icon: Store },
    ],
  },
  {
    id: "practical",
    title: "Practical Situations & Guidance",
    blurb: "The unspoken transitions every fresher faces.",
    accent: "rose",
    topics: [
      { title: "Handling Failure & Mistakes", icon: RefreshCw },
      { title: "Work–Life Integration", icon: GitBranch },
      { title: "Transition from Student to Employee", icon: GraduationCap },
    ],
  },
];

const accentMap: Record<Group["accent"], { chip: string; ring: string; icon: string }> = {
  indigo:  { chip: "bg-primary/10 text-primary",          ring: "ring-primary/20",   icon: "bg-primary/10 text-primary" },
  amber:   { chip: "bg-amber/15 text-amber-foreground",   ring: "ring-amber/30",     icon: "bg-amber/20 text-amber-foreground" },
  emerald: { chip: "bg-emerald/15 text-emerald",          ring: "ring-emerald/30",   icon: "bg-emerald/15 text-emerald" },
  navy:    { chip: "bg-navy/10 text-navy",                ring: "ring-navy/20",      icon: "bg-navy/10 text-navy" },
  rose:    { chip: "bg-destructive/10 text-destructive",  ring: "ring-destructive/20", icon: "bg-destructive/10 text-destructive" },
  teal:    { chip: "bg-emerald/10 text-emerald",          ring: "ring-emerald/20",   icon: "bg-emerald/10 text-emerald" },
};

export function MentoringTopics() {
  return (
    <section id="mentoring" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Mentoring Topics
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Everything you need to walk in <span className="text-gradient">ready.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Structured tracks taught by working professionals — covering the personal, professional,
            technical, and human sides of your first career chapter.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {groups.map((g, gi) => {
            const a = accentMap[g.accent];
            return (
              <div key={g.id} className="grid gap-8 lg:grid-cols-[18rem_1fr]">
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${a.chip}`}>
                    Track {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.blurb}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {g.topics.map((t) => (
                    <div
                      key={t.title}
                      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card ring-1 ring-transparent transition-all hover:-translate-y-1 hover:${a.ring} hover:shadow-elegant`}
                    >
                      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${a.icon}`}>
                        <t.icon className="h-5 w-5" />
                      </div>
                      <div className="font-semibold leading-snug text-card-foreground">{t.title}</div>
                      <div className="mt-3 text-xs font-medium text-muted-foreground">
                        Live workshop · 1:1 mentor follow-up
                      </div>
                      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
