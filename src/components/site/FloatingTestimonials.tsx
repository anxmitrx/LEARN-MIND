import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The business simulation module completely changed how I look at product launches. It's intense but incredibly rewarding.",
    author: "Riya S.",
    role: "Engineering Student",
  },
  {
    quote: "1:1 mentoring with an IIM alum gave me the exact roadmap I needed to pivot into product management.",
    author: "Aditya M.",
    role: "Management Trainee",
  },
  {
    quote: "You don't just learn theory here; you build and ship. The 48-hour sprints forced me out of my comfort zone.",
    author: "Sneha P.",
    role: "Computer Science Major",
  },
  {
    quote: "The Inner Engineering sessions brought a surprising amount of clarity to my chaotic final semester.",
    author: "Vikram K.",
    role: "Final Year Student",
  },
  {
    quote: "I landed my dream internship purely because of the industry visits and connections I made here.",
    author: "Ananya D.",
    role: "Marketing Analytics",
  },
];

export function FloatingTestimonials() {
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
      {/* Geometric Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] h-[800px] w-[800px] rounded-full border border-indigo-500/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[30%] -left-[10%] h-[600px] w-[600px] rounded-full border border-fuchsia-500/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent opacity-50 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="eyebrow text-fuchsia-400">Student Success</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Don't just take our word for it.
          </h2>
          <p className="mt-4 text-slate-400 font-medium">
            Drag to explore stories from our recent graduates.
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
          className="flex gap-6 pb-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, rotate: -1 }}
              className="min-w-[320px] max-w-[320px] sm:min-w-[400px] sm:max-w-[400px] shrink-0 rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-20 w-20 text-indigo-300" />
              </div>
              
              <Quote className="h-8 w-8 text-fuchsia-400 mb-6" />
              
              <p className="text-lg font-medium leading-relaxed text-slate-200 mb-8 relative z-10">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white tracking-wide">{t.author}</div>
                  <div className="text-sm text-indigo-300 font-medium">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
