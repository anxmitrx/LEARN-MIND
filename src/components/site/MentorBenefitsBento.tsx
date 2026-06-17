import { motion } from "framer-motion";
import { MessageCircle, FileText, Briefcase, Video, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const mentorBenefits = [
  {
    icon: Video,
    title: "1:1 Live Mentorship",
    text: "Book dedicated, private sessions tailored entirely to your goals. Whether you need to overcome specific personal roadblocks, conduct high-stakes mock interviews, or craft a personalized, step-by-step career roadmap, our experts are here to guide you.",
    colSpan: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-500/10 via-indigo-500/10 to-transparent",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
    image: "/assets/images/live_mentorship.png",
    slug: "live-mentorship"
  },
  {
    icon: FileText,
    title: "Resume & Portfolio Reviews",
    text: "Get your resume and portfolio meticulously analyzed, torn down, and rebuilt. Learn exactly what stands out from the perspective of hiring managers who screen thousands of profiles for a living.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-emerald-500/10 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
    image: "/assets/images/resume_reviews.png",
    slug: "resume-reviews"
  },
  {
    icon: MessageCircle,
    title: "24/7 Slack Access",
    text: "Never get stuck alone. Gain priority access to our exclusive, round-the-clock Slack community. Drop a message anytime you face a roadblock, and receive rapid, actionable answers directly from industry experts and peers.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-fuchsia-500/10 via-pink-500/10 to-transparent",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
    image: "/assets/images/slack_access.png",
    slug: "slack-access"
  },
  {
    icon: Briefcase,
    title: "Direct Referrals",
    text: "Unlock the hidden job market. Our most dedicated top performers receive direct, fast-tracked referrals to exclusive open roles at the prestigious companies where our mentors lead their teams.",
    colSpan: "md:col-span-2 md:row-span-1",
    gradient: "from-amber-500/10 via-orange-500/10 to-transparent",
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
    image: "/assets/images/direct_referrals.png",
    slug: "direct-referrals"
  },
];

export function MentorBenefitsBento() {
  return (
    <section className="relative bg-slate-50 py-24 sm:py-32 overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05] pointer-events-none" />
      
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 mb-6"
          >
            <Sparkles className="h-4 w-4" />
            The Mentorship Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            An ecosystem built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">accelerate you.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto"
          >
            We don't just give you advice; we provide the tools, the network, and the direct access you need to break into the industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(220px,auto)] gap-6 lg:gap-8 max-w-6xl mx-auto">
          {mentorBenefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                className={`group relative overflow-hidden bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 rounded-[2rem] p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${item.colSpan}`}
              >
                <Link to="/blog/$slug" params={{ slug: item.slug }} className="absolute inset-0 z-30" aria-label={`Read more about ${item.title}`} />
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="relative z-10 w-full flex flex-col h-full pointer-events-none">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} border border-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-500 z-20`}>
                      <Icon className={`w-7 h-7 ${item.iconColor}`} />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 z-20">
                      <ArrowUpRight className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>

                  {item.image && (
                    <div className="relative flex-grow min-h-[160px] w-full mb-6 rounded-2xl overflow-hidden -mt-16 group-hover:scale-[1.02] transition-transform duration-500">
                      {/* Gradient overlay to ensure text/icons contrast */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent z-10" />
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                  )}
                  
                  <div className={item.image ? "mt-0" : "mt-auto"}>
                    <h3 className="text-2xl font-bold text-slate-900 font-display mb-4 group-hover:text-indigo-900 transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-600 font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
