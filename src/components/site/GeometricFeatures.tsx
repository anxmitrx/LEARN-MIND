import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Hexagon, Layers, Zap, Code2, Target, Globe } from "lucide-react";

const features = [
  {
    title: "Real-world Simulations",
    description: "Experience actual startup problems and build solutions that matter, no theoretical fluff.",
    icon: <Globe className="h-6 w-6 text-indigo-400" />,
    gradient: "from-indigo-500/20 to-blue-500/20",
    border: "group-hover:border-indigo-400/50",
  },
  {
    title: "Live Tech Sprints",
    description: "Code alongside industry experts during rapid 48-hour development sprints.",
    icon: <Zap className="h-6 w-6 text-fuchsia-400" />,
    gradient: "from-fuchsia-500/20 to-purple-500/20",
    border: "group-hover:border-fuchsia-400/50",
  },
  {
    title: "1:1 Mentorship",
    description: "Get personalized feedback from top engineers at MNCs and IIM alumni.",
    icon: <Target className="h-6 w-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-400/50",
  },
];

// 3D Tilt Card Component
function TiltCard({ feature }: { feature: typeof features[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse position to rotation (-15deg to 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize mouse position between -0.5 and 0.5
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative h-full w-full rounded-3xl bg-slate-900/50 p-8 backdrop-blur-md border border-slate-700 transition-colors duration-300 ${feature.border}`}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl`} style={{ transform: "translateZ(-50px)" }} />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 shadow-xl">
          {feature.icon}
        </div>
        <h3 className="mb-3 font-display text-xl font-bold text-white tracking-wide">
          {feature.title}
        </h3>
        <p className="text-slate-400 leading-relaxed font-medium">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export function GeometricFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden bg-slate-950 py-32 sm:py-40"
    >
      {/* Dotted geometric background */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      {/* Mouse Tracking Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(99,102,241,0.15), transparent 40%)`
          ),
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center">
        {/* Floating Circle */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 90, 180, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 top-20 h-64 w-64 rounded-full border border-indigo-500/20 bg-indigo-500/5 blur-xl"
        />
        {/* Floating Hexagon */}
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
            rotate: [0, -120, -240, -360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -right-10 bottom-20 text-fuchsia-500/10 blur-[2px]"
        >
          <Hexagon className="h-96 w-96" strokeWidth={1} />
        </motion.div>
        {/* Floating Triangle */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-10 -translate-x-1/2 text-emerald-500/10 blur-[2px]"
        >
          <svg viewBox="0 0 100 100" className="h-72 w-72 fill-current">
            <polygon points="50,15 100,100 0,100" />
          </svg>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 mb-6"
          >
            <Layers className="h-4 w-4" />
            Designed for Impact
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Not just another <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">theory course</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-400 font-medium"
          >
            We've engineered an immersive learning environment that forces you to think, build, and ship like a senior engineer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 perspective-[2000px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            >
              <TiltCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
