"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import InteractiveCodeEditor from "@/components/InteractiveCodeEditor";
import RewireInteractive from "@/components/RewireInteractive";

// Animation variants for Framer Motion
const sectionFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonHoverTap = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

// Component for the animated content WITHIN the hero
export function AnimatedHeroContent({ project, metrics }) {
  return (
    <div className="relative z-10 w-full px-4 md:px-8 pb-10">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemFadeIn}>
          <div className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/#projects"
              className="hover:text-white/80 transition-colors"
            >
              Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/90 font-medium">{project.name}</span>
          </div>
        </motion.div>
        <motion.p
          variants={itemFadeIn}
          className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-gray-300 mb-3"
        >
          {project.date}
        </motion.p>
        <motion.h1
          variants={itemFadeIn}
          className="text-5xl md:text-7xl font-semibold mb-3"
        >
          {project.name}
        </motion.h1>
        <motion.p
          variants={itemFadeIn}
          className="text-lg md:text-2xl text-gray-300 max-w-3xl"
        >
          {project.tagline}
        </motion.p>
        {metrics.length > 0 && (
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            variants={containerStagger}
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={itemFadeIn}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur text-sm"
              >
                <span className="text-white/80 mr-2">{m.label}:</span>
                <span className="font-semibold">{m.value}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Component for the animated content in the page body
export function AnimatedBodyContent({
  project,
  roles,
  hasLive,
  hasRepo,
}) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
      {(project.slug === "onlevel" || project.slug === "rewire") && (
        <motion.div
          className="lg:col-span-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
            {project.slug === "onlevel" ? (
              <InteractiveCodeEditor />
            ) : (
              <RewireInteractive />
            )}
          </div>
        </motion.div>
      )}
      <div className="lg:col-span-8 space-y-12">
        {(project.problem || project.solution) && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {project.problem && (
              <motion.div
                variants={itemFadeIn}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-3">Problem</h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.problem}
                </p>
              </motion.div>
            )}
            {project.solution && (
              <motion.div
                variants={itemFadeIn}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-3">Solution</h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
        <motion.div
          variants={sectionFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
          <ul className="space-y-3 text-gray-300 leading-relaxed list-disc pl-5">
            {project.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.aside
        className="lg:col-span-4 space-y-8"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-sm bg-transparent border border-white/10 text-gray-200 py-1.5 px-3 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-3">
              {hasLive && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-black bg-white py-3 px-5 rounded-md font-semibold text-base group"
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Visit Live
                  <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                </motion.a>
              )}
              {hasRepo && (
                <motion.a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 py-3 px-5 rounded-md font-semibold text-base group transition-colors"
                  variants={buttonHoverTap}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Repo
                  <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                </motion.a>
              )}
            </div>
            {project.slug === "rewire" && (
              <p className="text-sm text-red-400">
                Private deployment at NALCO, no public live version. GitHub
                repo reflects hackathon-only code and excludes the classified
                ML models. We also productionized and integrated the system
                seamlessly with NALCO’s infrastructure.
              </p>
            )}
          </div>
        </div>
        {roles.length > 0 && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-3">Roles</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              {roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.aside>
    </div>
  );
}
