import { createFileRoute, Link } from '@tanstack/react-router'
import { Navbar } from "@/components/site/Navbar";
import { CtaFooter } from "@/components/site/CtaFooter";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

const contentData: Record<string, { title: string; image: string; text: string[]; subtitle: string }> = {
  "business-simulations": {
    title: "Business Simulations",
    subtitle: "Experience the Corporate World Before You Enter It",
    image: "/assets/images/business_simulations.png",
    text: [
      "The corporate world waits for no one. At Learn & Shine, our business simulations are designed to throw you into the deep end of the pool, where you learn by doing.",
      "We simulate high-stakes environments—like a D2C product launch, crisis management, debugging a sprint, or a sudden pivot in strategy. You will be managing a P&L and making decisions that impact your simulated company's bottom line.",
      "These aren't just games; they are industry-specific real-life case studies. By the time you clock in for your first real job, you'll already have the muscle memory to navigate complex corporate challenges with confidence."
    ]
  },
  "live-amas": {
    title: "Live AMAs",
    subtitle: "Direct Access to Top Executives and Founders",
    image: "/assets/images/live_amas.png",
    text: [
      "Learning from textbooks is essential, but learning from those who have built the things you use every day is unparalleled.",
      "Our Live Ask-Me-Anything sessions feature some of the most prominent founders, operators, and thought leaders in the industry. These sessions are raw, unscripted, and entirely driven by your questions.",
      "Whether you want to know about their biggest failures, their daily routines, or how they secured their first funding, this is your chance to get direct, unfiltered answers from the best in the business."
    ]
  },
  "inner-engineering": {
    title: "Inner Engineering",
    subtitle: "Building the Mental Foundation for Success",
    image: "/assets/images/inner_engineering.png",
    text: [
      "Success without stability is a recipe for burnout. Our Inner Engineering programs, inspired by Sadhguru's wisdom, provide the foundational mental and spiritual tools to keep you grounded.",
      "Through a series of routines and practices, we help you develop the resilience needed to weather the storms of your early career. It's about finding that steady center amidst the chaos of deadlines, expectations, and ambitions.",
      "When you master your inner state, the external challenges become stepping stones rather than obstacles. Join us to build a mind that is as sharp as your technical skills."
    ]
  },
  "internships-and-visits": {
    title: "Internships & Visits",
    subtitle: "Stepping into the Real World of Work",
    image: "/assets/images/internships_visits.png",
    text: [
      "There's an undeniable energy in a real workplace that cannot be captured in a classroom. We arrange curated visits to top-tier companies, manufacturing plants, and fast-growing startups.",
      "But we don't stop at visits. We actively help students secure internship placements that align with their career goals. These internships are carefully vetted to ensure you get hands-on experience, not just busywork.",
      "Step out of the academic bubble and into the real world. Build your network, gain practical skills, and see firsthand what it takes to succeed in today's competitive landscape."
    ]
  },
  "live-mentorship": {
    title: "1:1 Live Mentorship",
    subtitle: "Tailored Guidance from Industry Experts",
    image: "/assets/images/live_mentorship.png",
    text: [
      "Navigating the early stages of your career can be overwhelming. Standardized courses provide the basics, but they can't answer the specific, nuanced questions unique to your journey.",
      "That is where our 1:1 Live Mentorship comes in. You get direct access to professionals who have already walked the path you are on. In these private sessions, you can tear down your roadblocks, practice for high-stakes interviews, or simply map out your next career move.",
      "It is not just advice; it is a strategic partnership designed to accelerate your growth and give you the competitive edge you need."
    ]
  },
  "resume-reviews": {
    title: "Resume & Portfolio Reviews",
    subtitle: "Make Your First Impression Unforgettable",
    image: "/assets/images/resume_reviews.png",
    text: [
      "Your resume is often the only thing standing between you and an interview. Yet, most candidates submit documents that blend into a sea of generic templates.",
      "Through our Resume & Portfolio Reviews, you get your profile torn down and rebuilt by the exact people who screen candidates for a living. They know what stands out, what gets ignored, and how to frame your experience effectively.",
      "Learn the art of positioning yourself. Transform your portfolio from a simple list of projects into a compelling narrative that proves you are the right person for the job."
    ]
  },
  "slack-access": {
    title: "24/7 Slack Access",
    subtitle: "A Community That Never Sleeps",
    image: "/assets/images/slack_access.png",
    text: [
      "Learning doesn't happen on a strict schedule. Sometimes the hardest roadblocks hit at 2 AM, long after the workshops have ended.",
      "With our 24/7 Slack Access, you are plugged into a vibrant community of peers, alumni, and industry experts. Whenever you hit a wall, you can drop a message and get actionable advice rapidly.",
      "Beyond troubleshooting, it is a place to share wins, discover new opportunities, and build a network that will support you long after your initial training is complete."
    ]
  },
  "direct-referrals": {
    title: "Direct Referrals",
    subtitle: "Unlock the Hidden Job Market",
    image: "/assets/images/direct_referrals.png",
    text: [
      "The best jobs aren't always posted on public boards. They are filled through the 'hidden job market'—networks, recommendations, and direct referrals.",
      "We reward hard work. For our top performers, we provide direct, fast-tracked referrals to exclusive open roles at the prestigious companies where our mentors lead teams.",
      "Bypass the cold application pile. A strong referral from a trusted insider significantly increases your chances of landing an interview and securing the role you want."
    ]
  }
};

function BlogPost() {
  const { slug } = Route.useParams()
  const data = contentData[slug];

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">The article you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <CtaFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link to="/" hash="beyond" className="inline-flex items-center gap-2 text-indigo-600 font-medium mb-6 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Programs
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-6 tracking-tight">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-16 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/60 bg-white">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-auto aspect-video object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Article Body */}
            <article className="prose prose-lg md:prose-xl prose-indigo prose-slate mx-auto text-slate-700 leading-relaxed">
              {data.text.map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* CTA in Article */}
            <div className="mt-20 p-8 sm:p-12 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center">
              <h3 className="text-2xl font-display font-bold text-indigo-950 mb-4">Ready to step beyond the classroom?</h3>
              <p className="text-indigo-800/80 mb-8 max-w-xl mx-auto">
                Join our upcoming batch and get exclusive access to our {data.title.toLowerCase()} and much more.
              </p>
              <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaFooter />
    </main>
  )
}
