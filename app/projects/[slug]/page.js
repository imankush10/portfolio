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

  // Derived
  const metrics = project.metrics || [];
  const roles = project.roles || [];
  const hasLive = !!(project.links && project.links.live);
  const hasRepo = !!(project.links && project.links.repo);

  return (
    <div data-scroll-section className="bg-black text-white">
      {/* Glass hero */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/70 to-black" />
        <div className="relative z-10 w-full px-4 md:px-8 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white/80">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/#projects" className="hover:text-white/80">
                Projects
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">{project.name}</span>
            </div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-400 mb-3">
              {project.date}
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold mb-3">
              {project.name}
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl">
              {project.tagline}
            </p>
            {/* Metrics row */}
            {metrics.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur text-sm"
                  >
                    <span className="text-white/80 mr-2">{m.label}:</span>
                    <span className="font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Interactive demo full width */}
          {(project.slug === "onlevel" || project.slug === "rewire") && (
            <div className="lg:col-span-12">
              <div className="p-2 rounded-2xl bg-white/5 border border-white/10">
                <ClientOnly>
                  {project.slug === "onlevel" ? (
                    <InteractiveCodeEditor />
                  ) : (
                    <RewireInteractive />
                  )}
                </ClientOnly>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Problem / Solution */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.problem && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-2xl font-semibold mb-3">Problem</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-2xl font-semibold mb-3">Solution</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
              <ul className="space-y-3 text-gray-300 leading-relaxed list-disc pl-5">
                {project.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Gallery removed as requested */}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* CTA */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Explore</h3>
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
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black bg-white py-3 px-5 rounded-md font-semibold text-base group"
                    >
                      Visit Live
                      <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                    </a>
                  )}

                  {hasRepo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-black bg-white py-3 px-5 rounded-md font-semibold text-base group"
                    >
                      View Repo
                      <FiArrowUpRight className="transition-transform group-hover:rotate-45" />
                    </a>
                  )}
                </div>
                {project.slug === "rewire" && (
                  <p className="text-sm text-red-400">
                    Private deployment at NALCO, no public live version. GitHub
                    repo reflects hackathon-only code and excludes the
                    classified ML models. We also productionized and integrated
                    the system seamlessly with NALCO’s infrastructure.
                  </p>
                )}
              </div>
            </div>

            {/* Roles */}
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
          </aside>
        </div>
      </section>

      {/* Back */}
      <div className="text-center py-12">
        <Link href="/#projects" className="text-white/80 hover:text-white">
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
