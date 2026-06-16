import { motion } from "framer-motion";
import { MessageCircle, FileText, Briefcase, Video } from "lucide-react";

const mentorBenefits = [
  {
    icon: Video,
    title: "1:1 Live Mentorship",
    text: "Book private sessions to discuss your personal roadblocks, mock interviews, or get career roadmaps.",
    colSpan: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FileText,
    title: "Resume & Portfolio Reviews",
    text: "Get your resume torn down and rebuilt by people who actually screen them for a living.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: MessageCircle,
    title: "24/7 Slack Access",
    text: "Stuck on a project? Drop a message in our exclusive Slack community and get answers from experts.",
    colSpan: "md:col-span-1 md:row-span-1",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-600",
    bg: "bg-fuchsia-50",
  },
  {
    icon: Briefcase,
    title: "Direct Referrals",
    text: "Top performers get direct referrals to open roles at the mentors' respective companies.",
    colSpan: "md:col-span-2 md:row-span-1",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export function MentorBenefitsBento() {
  return (
    <section className="relative bg-slate-50 py-20 overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-6 max-w-5xl mx-auto">
          {mentorBenefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                className={`group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${item.colSpan}`}
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.bg} border border-white flex items-center justify-center shadow-sm mb-4 sm:mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
