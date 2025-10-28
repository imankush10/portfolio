"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import profile from "../data/profile";

const ItemCard = ({
  href,
  onClick,
  title,
  subtitle,
  icon: Icon,
  highlight,
}) => (
  <motion.a
    href={href}
    onClick={onClick}
    target={
      href?.startsWith("http") || href?.endsWith(".pdf") ? "_blank" : undefined
    }
    rel={
      href?.startsWith("http") || href?.endsWith(".pdf")
        ? "noreferrer noopener"
        : undefined
    }
    className="group relative w-full rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl p-5 md:p-6 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
    />
    <div className="flex items-start gap-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/90">
        <Icon
          size={20}
          className="group-hover:text-red-400 transition-colors"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-medium text-white truncate">
            {title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-white/40 group-hover:text-red-400 transition-colors shrink-0"
          />
        </div>
        {subtitle ? (
          <p className="text-xs md:text-sm text-white/60 mt-1 truncate">
            {subtitle}
          </p>
        ) : null}
        {highlight ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
              {highlight}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  </motion.a>
);

const Contact = () => {
  const { contact = {}, socials = {} } = profile;
  const email = contact.email || socials.email;
  const github = contact.githubUrl || socials.github;
  const linkedin = contact.linkedinUrl || socials.linkedin;
  const resume = contact.resumeUrl || "/finalres.pdf";
  const leetcode = "https://leetcode.com/u/zputnik/";

  const items = [
    {
      key: "github",
      title: "GitHub",
      subtitle: github?.replace(/^https?:\/\//, ""),
      href: github,
      icon: Github,
      highlight: "Open Source",
    },
    {
      key: "leetcode",
      title: "LeetCode",
      subtitle: "leetcode.com/u/zputnik",
      href: leetcode,
      icon: Code2,
      highlight: "DSA",
    },
    {
      key: "linkedin",
      title: "LinkedIn",
      subtitle: linkedin?.replace(/^https?:\/\//, ""),
      href: linkedin,
      icon: Linkedin,
      highlight: "Network",
    },
    {
      key: "resume",
      title: "Resume",
      subtitle: "View PDF",
      href: "https://drive.google.com/file/d/1o_ffemkjXNqFWbyuKqa3IBVxChy-G2QI/view?usp=sharing",
      icon: FileText,
      highlight: "Latest",
    },
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <section className="w-full mx-auto py-16 md:py-20 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
        </div>

        <div className="relative">
          {/* subtle glows */}
          <div className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 max-w-5xl mx-auto justify-items-stretch">
            {items.map(({ key, ...itemProps }) => (
              <ItemCard key={key} {...itemProps} />
            ))}
          </div>

          {/* footer note */}
          <div className="mt-8 text-center text-white/60 text-sm">
            Prefer email?{" "}
            <a
              className="text-red-400 hover:underline"
              href={email ? `mailto:${email}` : undefined}
            >
              {email || "—"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
