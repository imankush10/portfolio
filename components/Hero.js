"use client";

import React from "react";
import { MapPin, Gift, Code, Calendar } from "lucide-react";
import profile from "../data/profile";
import { useLenis } from "./LenisProvider";

const Hero = () => {
  const {
    name,
    location,
    age,
    title,
    experience,
    summary,
    skills = [],
    services = [],
    contact = {},
  } = profile;
  const lenis = useLenis();
  const handleContactClick = () => {
    if (lenis) {
      lenis.scrollTo("#contact", {
        offset: -100,
        duration: 1.5,
      });
    }
  };

  const handleProjectsClick = () => {
    if (lenis) {
      lenis.scrollTo("#projects", {
        offset: -100,
        duration: 1.5,
      });
    }
  };

  return (
    <section
      data-scroll-section
      className="bg-black text-white font-sans w-full px-4 py-20 md:py-32"
    >
      {/* tighter portfolio width */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center gap-4">
            <h1 className="font-normal text-4xl lg:text-6xl">
              Hi, I&apos;m
              <span className="block text-red-500 font-normal mt-1">
                {name}
              </span>
            </h1>
          </div>

          <ul className="space-y-3 text-gray-400 text-lg">
            {location ? (
              <li className="flex items-center gap-3">
                <MapPin className="text-red-500" size={20} />
                <span className="font-medium text-base text-neutral-400">
                  Based in {location}
                </span>
              </li>
            ) : null}
            {age ? (
              <li className="flex items-center gap-3">
                <Gift className="text-red-500" size={20} />
                <span className="font-medium text-base text-neutral-400">
                  {age} Years Old
                </span>
              </li>
            ) : null}
            {title ? (
              <li className="flex items-center gap-3">
                <Code className="text-red-500" size={20} />
                <span className="font-medium text-base text-neutral-400">
                  {title}
                </span>
              </li>
            ) : null}
            {experience ? (
              <li className="flex items-center gap-3">
                <Calendar className="text-red-500" size={20} />
                <span className="font-medium text-base text-neutral-400">
                  {experience}+ Years of work Experience
                </span>
              </li>
            ) : null}
          </ul>

          <p className="text-neutral-200 leading-relaxed max-w-sm text-lg">
            {summary}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleContactClick}
              className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer"
            >
              Get in Touch
            </button>
            <button
              onClick={handleProjectsClick}
              className="border border-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              View Projects
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:mt-6 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-medium mb-3 text-gray-200">
              Key Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-neutral-500/17 text-neutral-200 hover:bg-neutral-500/25 transition-colors select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-gray-200 mb-5">
              Services
            </h2>
            <ul className="space-y-3 text-neutral-200">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <span className="text-red-500 font-bold">→</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
