"use client";

import React from "react";
import profile from "../data/profile";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import InteractiveCodeEditor from "./InteractiveCodeEditor";
import RewireInteractive from "./RewireInteractive";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Projects = () => {
  const { projects = [] } = profile;

  return (
    <section data-scroll-section className="w-full mx-auto py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Featured Projects
        </h2>

        <div className="space-y-28">
          {projects.map((p, index) => {
            // --- SPECIAL LAYOUT FOR ONLEVEL PROJECT ---
            if (p.slug === "onlevel") {
              return (
                <div key={p.name} className="w-full">
                  {/* Centered text block to introduce the demo */}
                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                      {p.date}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-semibold mb-4">
                      {p.name}
                    </h3>
                    <p className="text-gray-300 mb-6">{p.tagline}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {p.tech?.map((t) => (
                        <span
                          key={t}
                          className="text-sm bg-transparent border border-gray-600 text-gray-300 py-1.5 px-4 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Render the interactive component */}
                  <InteractiveCodeEditor />
                  <div className="mt-8 text-center">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-2 text-black bg-white py-3 px-6 rounded-md font-semibold text-base group"
                    >
                      View details
                      <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                    </Link>
                  </div>
                </div>
              );
            }

            // --- SPECIAL LAYOUT FOR REWIRE PROJECT ---
            if (p.slug === "rewire") {
              return (
                <div key={p.name} className="w-full">
                  <div className="max-w-2xl mx-auto text-center mb-12">
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                      {p.date}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-semibold mb-4">
                      {p.name}
                    </h3>
                    <p className="text-gray-300 mb-6">{p.tagline}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {p.tech?.map((t) => (
                        <span
                          key={t}
                          className="text-sm bg-transparent border border-gray-600 text-gray-300 py-1.5 px-4 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Render the interactive component */}
                  <RewireInteractive />
                  <div className="mt-8 text-center">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-2 text-black bg-white py-3 px-6 rounded-md font-semibold text-base group"
                    >
                      View details
                      <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
