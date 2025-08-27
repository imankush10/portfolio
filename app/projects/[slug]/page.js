import React from "react";
import profile from "../../../data/profile";
import Link from "next/link";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";
import {
  AnimatedHeroContent,
  AnimatedBodyContent,
} from "./AnimatedContent"; // Import the new client components

export async function generateStaticParams() {
  return profile.projects.map((p) => ({
    slug: p.slug,
  }));
}

const ProjectDetailPage = ({ params }) => {
  const project = profile.projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  const metrics = project.metrics || [];
  const roles = project.roles || [];
  const hasLive = !!(project.links && project.links.live);
  const hasRepo = !!(project.links && project.links.repo);

  return (
    <div data-scroll-section className="bg-black text-white">
      {/* Hero Section */}
      <section
        className={`relative flex items-end overflow-hidden ${
          project.imageUrl ? "min-h-[60vh]" : "min-h-[40vh] pt-4"
        } ${
          !project.imageUrl ? "bg-gradient-to-br from-gray-900 to-black" : ""
        }`}
      >
        {project.imageUrl && (
          <>
            <Image
              height={800}
              width={1200}
              src={project.imageUrl}
              alt={project.name}
              className="absolute -top-6 md:-top-full left-0 w-full h-full object-cover" // FIX 1: Adjusted mobile top position
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </>
        )}
        <ClientOnly>
          <AnimatedHeroContent project={project} metrics={metrics} />
        </ClientOnly>
      </section>

      {/* Body Section - this is now separate and AFTER the hero */}
      <section className="px-4 md:px-8 py-10 overflow-x-clip"> {/* FIX 2: Reduced vertical padding */}
        <ClientOnly>
          <AnimatedBodyContent
            project={project}
            roles={roles}
            hasLive={hasLive}
            hasRepo={hasRepo}
          />
        </ClientOnly>
      </section>

      {/* Back to projects link */}
      <div className="text-center py-12">
        <Link
          href="/#projects"
          className="text-white/80 hover:text-white transition-colors"
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
