"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import profile from "../data/profile";

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const Halo = ({ color = "#60a5fa" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Outer soft glow */}
      <div
        className="rounded-full"
        style={{
          width: "86%",
          height: "86%",
          boxShadow: `0 0 80px 20px ${color}22, inset 0 0 60px ${color}12`,
          border: `1px solid ${color}22`,
          borderRadius: "9999px",
          filter: "blur(0.2px)",
        }}
      />
      {/* Concentric ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "62%",
          height: "62%",
          border: `1px dashed ${color}55`,
          boxShadow: `0 0 40px ${color}22`,
        }}
      />
    </div>
  );
};

const OrbitalAchievements = ({
  items = [],
  onSelect,
  onActiveChange,
  onCenterClick,
  open = false,
}) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [active, setActive] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const center = { x: size.w / 2, y: size.h / 2 };
  const radius = Math.max(110, Math.min(size.w, size.h) * 0.42);

  const positions = useMemo(() => {
    const count = Math.max(items.length, 1);
    const base = -90;
    return new Array(count).fill(0).map((_, i) => {
      const angle = base + (360 / count) * i;
      return { angle, ...polarToCartesian(center.x, center.y, radius, angle) };
    });
  }, [items.length, center.x, center.y, radius]);

  useEffect(() => {
    controls.start(
      { rotate: 360 },
      { duration: 60, ease: "linear", repeat: Infinity }
    );
  }, [controls]);

  // Notify parent when active changes
  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  const palette = [
    "#60a5fa",
    "#34d399",
    "#f59e0b",
    "#a78bfa",
    "#f472b6",
    "#38bdf8",
  ]; // soft
  const color = palette[active % palette.length];

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-black/0 via-black/40 to-black/60">
      <Halo color={color} />

      {/* Rotating group with dissolve/zoom when open */}
      <motion.div
        className="absolute inset-0"
        animate={
          open
            ? { scale: 1.3, opacity: 0, filter: "blur(6px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ pointerEvents: open ? "none" : "auto" }}
      >
        <motion.div
          ref={containerRef}
          className="absolute inset-0"
          animate={controls}
          style={{ transformOrigin: "50% 50%" }}
        >
          {positions.map((p, i) => {
            const c = palette[i % palette.length];
            return (
              <motion.button
                key={i}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setActive(i);
                  onSelect?.(i);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
                style={{ left: p.x, top: p.y }}
                initial={{ scale: 0.9, opacity: 0.85 }}
                whileHover={{ scale: 1.12, opacity: 1 }}
                whileTap={{ scale: 1.05 }}
              >
                <div
                  className="px-3 py-1.5 rounded-full backdrop-blur-sm border text-sm"
                  style={{
                    borderColor: `${c}55`,
                    background: `linear-gradient(180deg, ${c}22 0%, ${c}11 100%)`,
                    color: c,
                    boxShadow: `0 0 20px ${c}33, inset 0 0 10px ${c}22`,
                  }}
                >
                  <span className="opacity-90 pr-1.5">★</span>
                  <span className="opacity-90">{items[i]?.year || i + 1}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Center content clickable (wrapper doesn't intercept pointers) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => onCenterClick?.(active)}
          className="relative text-center px-6 py-4 rounded-xl bg-transparent hover:bg-white/2 transition pointer-events-auto"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-sm md:text-base font-normal leading-snug"
            style={{ color }}
          >
            {items[active]?.title || "Achievements"}
          </motion.div>
          <motion.p
            key={`${active}-desc`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-1.5 text-neutral-300 max-w-sm mx-auto text-[12px] font-medium"
          >
            {items[active]?.subtitle}
          </motion.p>
          <motion.div
            layoutId="underline"
            className="mx-auto mt-2.5 h-px w-32"
            style={{
              background: `linear-gradient(90deg, ${color} 0%, ${color}99 60%, transparent 100%)`,
              filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 16px ${color})`,
            }}
          />
        </button>
      </div>
    </div>
  );
};

const CertsMarquee = ({ items = [], speed = 40 }) => {
  const list = [...items, ...items]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      {/* edge fade mask */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      />
      <motion.div
        className="flex gap-4 py-4"
        animate={{ x: [0, -1000] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {list.map((c, i) => (
          <div
            key={i}
            className="px-4 py-2 rounded-full border backdrop-blur-sm text-sm shrink-0"
            style={{
              borderColor: "#ffffff1a",
              color: "#e5e7eb",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
            }}
          >
            🎖️ {c}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Achievements = () => {
  const { achievements = [], certifications = [] } = profile;
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  if (!achievements.length && !certifications.length) return null;

  return (
    <section className="w-full mx-auto py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Awards & Highlights
          </h2>
        </div>

        {/* Orbital achievements */}
        {achievements.length ? (
          <div className="mb-10 relative flex justify-center">
            <div className="relative w-[min(96vw,72rem,calc(100svh-60px))] aspect-square">
              <OrbitalAchievements
                items={achievements}
                open={open}
                onSelect={(i) => {
                  setSelected(i);
                  setOpen(true);
                }}
                onActiveChange={setActiveIndex}
                onCenterClick={(i) => {
                  setSelected(i);
                  setOpen(true);
                }}
              />
            </div>

            {/* Details overlay */}
            <AnimatePresence>
              {open && selected !== null && achievements[selected] && (
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                >
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  {/* Decorative glows */}
                  <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-pink-500/20 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />

                  {/* Card */}
                  <motion.div
                    className="relative z-10 max-w-xl w-[90%] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-6 shadow-2xl"
                    initial={{ scale: 0.9, y: 12, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          {achievements[selected]?.year ? (
                            <span className="text-xs px-2 py-1 rounded-full border border-white/15 text-white/80">
                              {achievements[selected].year}
                            </span>
                          ) : null}
                          {achievements[selected]?.tags?.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <h3 className="mt-1.5 text-lg md:text-xl font-semibold">
                          {achievements[selected].title}
                        </h3>
                        {achievements[selected]?.subtitle ? (
                          <p className="text-white/70 text-sm mt-1">
                            {achievements[selected].subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {achievements[selected]?.image ? (
                      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                        <Image
                          src={achievements[selected].image}
                          alt={achievements[selected].title}
                          width={800}
                          height={320}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ) : null}

                    {achievements[selected]?.description ? (
                      <p className="mt-3 text-white/80 text-[13px] md:text-sm leading-relaxed">
                        {achievements[selected].description}
                      </p>
                    ) : null}

                    {achievements[selected]?.highlights?.length ? (
                      <ul className="mt-3 grid gap-2">
                        {achievements[selected].highlights
                          .slice(0, 4)
                          .map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[13px] md:text-sm text-white/80"
                            >
                              <span className="text-green-400">▹</span>
                              <span>{h}</span>
                            </li>
                          ))}
                      </ul>
                    ) : null}

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <button
                        onClick={() => setOpen(false)}
                        className="px-3 py-1.5 rounded-md border border-white/15 text-white/80 hover:text-white hover:border-white/30"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : null}

        {/* Certifications marquee */}
        {certifications.length ? (
          <div className="mt-6">
            <h3 className="text-sm uppercase tracking-widest text-white/60 mb-3">
              Certifications
            </h3>
            <CertsMarquee items={certifications} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Achievements;
