import { motion } from "framer-motion";
import { ClipboardList, Video, Dumbbell, Rocket } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Pick a Track", text: "Choose from 5 mentoring tracks built for engineering & management students." },
  { icon: Video, title: "Learn Live", text: "Join weekend live workshops with mentors from MNCs, IIMs, and IITs." },
  { icon: Dumbbell, title: "Practice Real", text: "Run business simulations, mock interviews, and case studies — not theory." },
  { icon: Rocket, title: "Walk In Ready", text: "Show up to your first job already thinking like a 2-year professional." },
];

const techCompanies = [
  { name: "TCS", url: "https://www.tcs.com", logo: "/assets/tcs.svg" },
  { name: "Infosys", url: "https://www.infosys.com", logo: "/assets/infosys.svg" },
  { name: "Zoho", url: "https://www.zoho.com", logo: "/assets/zoho.svg" },
  { name: "Razorpay", url: "https://razorpay.com", logo: "/assets/razorpay.svg" },
  { name: "Zerodha", url: "https://zerodha.com", logo: "/assets/zerodha.svg" },
  { name: "Flipkart", url: "https://www.flipkart.com", logo: "/assets/flipkart.svg" }
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-background pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="eyebrow text-ink">How it works · 04 Steps</span>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-wide text-ink sm:text-6xl">
            Four steps from <br /> classroom to <span className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-2 rounded-lg">career.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bento-card relative bg-white/30 backdrop-blur-xl border border-indigo-400/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-3xl p-5 md:p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/40 hover:shadow-[0_15px_40px_-5px_rgba(31,38,135,0.15)] hover:border-indigo-400/70 will-change-transform"
            >
              <div className="font-display text-6xl font-bold text-ink/10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 inline-grid h-12 w-12 place-items-center bg-indigo-100 text-indigo-700 rounded-full border border-indigo-200/50 shadow-sm">
                <s.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 font-semibold">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Tech Marquee */}
        <div className="mt-16 border-t border-white/20 pt-12">
          <div className="text-center mb-6">
            <span className="eyebrow text-indigo-600/70">Top tech hiring partners</span>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">Get prepared for premium teams</h3>
          </div>
          
          <div className="relative w-full overflow-hidden marquee-pause">
            {/* Left and Right Gradient Fades */}
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            
            <div className="flex w-max animate-marquee-reverse gap-8 py-4">
              {[...techCompanies, ...techCompanies, ...techCompanies].map((company, index) => (
                <a
                  key={`${company.name}-${index}`}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:shadow-md hover:border-indigo-400/50 transition-all duration-300 px-6 py-3 rounded-2xl bg-white/20 border border-white/30 shadow-sm backdrop-blur-sm cursor-pointer"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="h-8 w-auto max-w-[120px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
