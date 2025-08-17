import React from "react";
import profile from "../../../data/profile"; // Adjust path if needed
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import ClientOnly from "@/components/ClientOnly";
import InteractiveCodeEditor from "@/components/InteractiveCodeEditor";
import RewireInteractive from "@/components/RewireInteractive";

// This function tells Next.js which pages to pre-render at build time.
export async function generateStaticParams() {
  return profile.projects.map((p) => ({
    slug: p.slug,
  }));
}

const ProjectDetailPage = ({ params }) => {
  // Find the project data that matches the slug from the URL
  const project = profile.projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    // Remember to wrap your page content in a layout that has the locomotive scroll setup
    <div data-scroll-section>
      {/* Project Hero */}
      <section className="h-[70vh] bg-gray-800 relative flex items-end p-8 md:p-12">
        {/* You would have a background image/video here */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 text-white">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            {project.date}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold">{project.name}</h1>
          <p className="mt-4 text-xl max-w-2xl text-gray-300">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-black text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main call to action */}
          <a
            href={project.links.live || project.links.repo || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black bg-white py-4 px-8 rounded-md font-semibold text-lg group mb-16"
          >
            Visit Live Site
            <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
          </a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column for Highlights */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Key Highlights</h2>
              <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>

              {/* Interactive demo area */}
              <div className="mt-10">
                <ClientOnly>
                  {project.slug === "onlevel" ? (
                    <InteractiveCodeEditor />
                  ) : project.slug === "rewire" ? (
                    <RewireInteractive />
                  ) : null}
                </ClientOnly>
              </div>
            </div>

            {/* Right Column for Tech Stack */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-base bg-gray-800 border border-gray-700 text-gray-300 py-2 px-4 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to all projects link */}
      <div className="text-center py-16 bg-black">
        <Link
          href="/#projects"
          className="text-white hover:text-red-500 transition-colors"
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
