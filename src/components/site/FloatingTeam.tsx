import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";

const team = [
  {
    name: "Dr. Alok Sharma",
    role: "Founder & CEO",
    bio: "Ex-Director at Microsoft with 15+ years of scaling tech teams. Passionate about reforming Indian technical education.",
    image: "/assets/WhatsApp Image 2026-06-03 at 7.45.22 PM.jpeg",
  },
  {
    name: "Priya Desai",
    role: "Head of Mentorship",
    bio: "Former HR Lead at Amazon. She ensures every mentor on our platform meets the highest industry standards.",
    image: "/assets/WhatsApp Image 2026-06-03 at 7.48.00 PM.jpeg",
  },
  {
    name: "Rahul Verma",
    role: "VP of Curriculum",
    bio: "IIM Ahmedabad alum. Architect behind the simulation-driven learning methodology used in our workshops.",
    image: "/assets/WhatsApp Image 2026-06-03 at 7.45.22 PM.jpeg",
  },
  {
    name: "Anita Singh",
    role: "Director of Partnerships",
    bio: "Connects Learn & Shine with top-tier MNCs and startups to secure exclusive internship and placement opportunities.",
    image: "/assets/WhatsApp Image 2026-06-03 at 7.48.00 PM.jpeg",
  },
];

export function FloatingTeam() {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Massive Glowing Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full border border-indigo-500/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent opacity-60 blur-[100px]"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full border border-fuchsia-500/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-600/20 via-transparent to-transparent opacity-60 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="eyebrow text-fuchsia-400">Our Leadership</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Built by industry veterans.
          </h2>
          <p className="mt-4 text-slate-400 font-medium max-w-2xl mx-auto">
            Drag to meet the people dedicated to transforming your career trajectory.
          </p>
        </motion.div>
      </div>

      {/* Draggable Carousel */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ right: 0, left: -carouselWidth }}
          whileTap={{ cursor: "grabbing" }}
          style={{ x }}
          className="flex gap-6 sm:gap-8 pb-12"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="min-w-[280px] max-w-[280px] sm:min-w-[340px] sm:max-w-[340px] shrink-0 rounded-3xl bg-white/5 p-6 sm:p-8 backdrop-blur-2xl border border-white/10 shadow-2xl relative group overflow-hidden"
            >
              <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                />
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-1">{member.name}</h3>
              <p className="text-fuchsia-400 font-bold text-sm mb-4">{member.role}</p>
              <p className="text-slate-300 font-medium text-sm leading-relaxed mb-6">
                {member.bio}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
