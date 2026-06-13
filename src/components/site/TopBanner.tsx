import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function TopBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="my-16 px-4"
    >
      <Link
        to="/class-12-consult"
        className="group mx-auto flex w-[92%] max-w-4xl items-center justify-center gap-3 py-4 px-6 sm:px-8 bg-white rounded-full border border-slate-200 shadow-sm text-center flex-wrap transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
      >
        <span className="flex items-center justify-center gap-3 text-indigo-950 font-semibold md:text-lg leading-tight">
          <span>
            🎓 CLASS 12 STUDENTS: Confused about college? Book a 1-on-1 Roadmap Consultation at our lowest price ever.
          </span>
          <span className="text-indigo-600 font-bold inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
