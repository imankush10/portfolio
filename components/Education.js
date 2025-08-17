"use client";
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profile from "../data/profile"; // Make sure this path is correct


function extractYears(period = "") {
  const years = (period.match(/\b(19|20)\d{2}\b/g) || []).map(Number);
  return years;
}


function durationLabel(period = "") {
  const y = extractYears(period);
  if (y.length >= 2) {
    const years = Math.max(1, y[1] - y[0] || 1);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
  return "";
}


const COLORS = [
  { base: "#60a5fa" }, // blue-400
  { base: "#34d399" }, // emerald-400
  { base: "#f59e0b" }, // amber-500
  { base: "#a78bfa" }, // violet-400
  { base: "#f472b6" }, // pink-400
  { base: "#38bdf8" }, // sky-400
];


const EducationItem = ({ e, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const years = extractYears(e.period);
  const year = years || "";
  const dur = durationLabel(e.period);
  const isLeft = idx % 2 === 0;
  const palette = COLORS[idx % COLORS.length];


  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 50%", "center 50%"],
  });


  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const nodeScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);


  // Card component with hover animations and new data structure
  const Card = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-black/40 border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] w-full max-w-md mb-8 md:mb-0"
    >
      <div className="flex items-baseline gap-4 mb-4">
        <div
          className="text-5xl md:text-6xl font-light tracking-tight"
          style={{ color: palette.base }}
        >
          {year || e.period}
        </div>
        {dur ? (
          <span className="text-sm font-medium text-white/60">{dur}</span>
        ) : null}
      </div>


      {/* Program title and animated underline */}
      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
        {e.program}
      </h3>
      <motion.div
        className="h-px bg-red-500 mb-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
        style={{ transformOrigin: "left" }}
      />
      
      {/* School and Description */}
      <p className="text-white/80 mb-1 font-semibold">{e.school}</p>
      <p className="text-white/60 mb-5 text-sm">{e.description}</p>
      
      {/* Highlights */}
      <ul className="space-y-2.5 mb-6">
        {e.highlights?.map((h, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-red-400/80 text-xs mt-[4px]">{"->"}</span>
            <span className="text-white/80">{h}</span>
          </li>
        ))}
      </ul>


      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {e.tags?.map((t, i) => (
          <span
            key={i}
            className="px-3 py-1.5 rounded-xl bg-neutral-300/10 text-white/80 border border-white/10 text-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );


  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-12 items-start"
    >
      <div className={isLeft ? "md:flex md:justify-end" : ""}>
        {isLeft && Card}
      </div>
      <div className={!isLeft ? "md:flex md:justify-start" : ""}>
        {!isLeft && Card}
      </div>
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="rounded-full"
          style={{
            width: 8, height: 8, backgroundColor: palette.base,
            opacity: glowOpacity, scale: nodeScale,
            boxShadow: `0 0 18px ${palette.base}, 0 0 36px ${palette.base}`,
          }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-px"
          style={{
            width: "1.5rem",
            backgroundImage: isLeft
              ? `linear-gradient(to left, ${palette.base} 0% ,transparent 100%)`
              : `linear-gradient(to right, ${palette.base} 0% ,transparent 100%)`,
            opacity: glowOpacity, filter: `drop-shadow(0 0 10px ${palette.base})`,
            left: isLeft ? "auto" : "6px", right: isLeft ? "6px" : "auto",
          }}
        />
      </div>
    </div>
  );
};


const Education = () => {
  const { education = [] } = profile;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 45%", "end 50%"],
  });
  if (!education.length) return null;


  return (
    <section className="relative w-full max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-10">Education</h2>


      <div ref={ref} className="space-y-4 md:space-y-0 relative">
        <div className="hidden md:block pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/15 via-white/8 to-transparent" />
        <motion.div
          className="hidden md:block pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-px bg-red-500"
          style={{
            height: "100%", transformOrigin: "top", scaleY: scrollYProgress,
            filter: "drop-shadow(0 0 10px rgb(239 68 68 / 0.8))",
            backgroundImage: `linear-gradient(to bottom, rgba(239,68,68,1) 75%, black 100%)`,
          }}
        />
        {education.map((e, idx) => (
          <EducationItem key={idx} e={e} idx={idx} />
        ))}
      </div>
    </section>
  );
};


export default Education;
