"use client";

import React from "react";
import profile from "../data/profile";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import InteractiveCodeEditor from "./InteractiveCodeEditor";
import RewireInteractive from "./RewireInteractive";

const Projects = () => {
  const { projects = [] } = profile;

  return (
    <section
      data-scroll-section
      className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 overflow-x-clip"
      id="projects"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-16 text-center">
          Featured Projects
        </h2>

        <div className="space-y-28">
          {projects.map((p) => {
            // --- SPECIAL LAYOUT FOR ONLEVEL PROJECT ---
            if (p.slug === "onlevel") {
              return (
                <div key={p.name} className="w-full relative">
                  {/* Centered text block to introduce the demo */}
                  <div className="max-w-2xl w-full mx-auto text-center mb-12 px-2">
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                      {p.date}
                    </p>

                    {/* Title + Arrow aligned and centered */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
                      <h3 className="text-4xl md:text-5xl font-semibold leading-none">
                        {p.name}
                      </h3>
                      <Link
                        href={`/projects/${p.slug}`}
                        aria-label={`Open details for ${p.name}`}
                        className="group inline-flex p-2 md:p-3 rounded-full bg-white text-black shadow-lg ring-1 ring-black/10 hover:ring-black/20 transition"
                      >
                        <FiArrowUpRight className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>

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
                  <div className="w-full overflow-x-auto">
                    <InteractiveCodeEditor />
                  </div>
                </div>
              );
            }

            // --- SPECIAL LAYOUT FOR REWIRE PROJECT ---
            if (p.slug === "rewire") {
              return (
                <div key={p.name} className="w-full relative">
                  <div className="max-w-2xl w-full mx-auto text-center mb-12 px-2">
                    <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                      {p.date}
                    </p>

                    {/* Title + Arrow aligned and centered */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
                      <h3 className="text-4xl md:text-5xl font-semibold leading-none">
                        {p.name}
                      </h3>
                      <Link
                        href={`/projects/${p.slug}`}
                        aria-label={`Open details for ${p.name}`}
                        className="group inline-flex p-2 md:p-3 rounded-full bg-white text-black shadow-lg ring-1 ring-black/10 hover:ring-black/20 transition"
                      >
                        <FiArrowUpRight className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>

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
                  <div className="w-full overflow-x-auto overflow-y-hidden">
                    <RewireInteractive />
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Projects);
