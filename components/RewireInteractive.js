"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Gauge,
  Sliders,
  Zap,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Simple utility to clamp a number
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Compute predicted properties from control params (toy model with some noise)
function inferOutputs(params) {
  const { temp, cool, speed, alloy } = params;
  // Normalize inputs
  const t = (clamp(temp, 550, 720) - 550) / (720 - 550);
  const c = (clamp(cool, 1, 15) - 1) / (15 - 1);
  const s = (clamp(speed, 1, 12) - 1) / (12 - 1);
  const a = (clamp(alloy, 0.5, 2.5) - 0.5) / (2.5 - 0.5);

  // Heuristics (not real metallurgy—just to visualize)
  // UTS tends to increase with balanced cooling and proper alloying, drops at extremes of speed/temp
  let uts =
    180 +
    220 *
      (0.6 * (1 - Math.abs(t - 0.5) * 1.2) +
        0.3 * (1 - Math.abs(c - 0.6)) +
        0.3 * a -
        0.2 * s);
  // Elongation decreases with higher speed/cooling, increases with slightly lower temp
  let elong = 8 + 14 * (0.6 * (1 - c) + 0.3 * (1 - s) + 0.2 * (1 - t));
  // Conductivity roughly anti-correlated with alloy content and speed, benefits from moderate cooling
  let cond =
    35 + 25 * (0.5 * (1 - a) + 0.3 * (1 - s) + 0.2 * (1 - Math.abs(c - 0.5)));

  // Add tiny noise for liveliness
  const n = () => (Math.random() - 0.5) * 2;
  uts = clamp(uts + n(), 120, 420);
  elong = clamp(elong + n() * 0.4, 2, 28);
  cond = clamp(cond + n() * 0.6, 15, 65);

  return {
    uts: Number(uts.toFixed(1)),
    elong: Number(elong.toFixed(2)),
    cond: Number(cond.toFixed(2)),
  };
}

// Debounce hook
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// Lightweight SVG line chart that autosizes and animates new points
function LiveLineChart({ series, colors, height = 220, className = "" }) {
  const ref = useRef(null);
  const width = 720; // viewBox width; SVG scales responsively
  const padding = { l: 40, r: 16, t: 12, b: 24 };

  // Determine min/max across all series
  const { minY, maxY, maxLen } = useMemo(() => {
    let minY = Infinity,
      maxY = -Infinity,
      maxLen = 0;
    for (const s of series) {
      if (!s?.data?.length) continue;
      maxLen = Math.max(maxLen, s.data.length);
      for (const v of s.data) {
        if (v == null) continue;
        minY = Math.min(minY, v);
        maxY = Math.max(maxY, v);
      }
    }
    if (!isFinite(minY) || !isFinite(maxY)) {
      minY = 0;
      maxY = 1;
    }
    if (minY === maxY) {
      maxY = minY + 1;
    }
    return { minY, maxY, maxLen };
  }, [series]);

  const xScale = (i) => {
    const innerW = width - padding.l - padding.r;
    if (maxLen <= 1) return padding.l;
    return padding.l + (i / (maxLen - 1)) * innerW;
  };
  const yScale = (v) => {
    const innerH = height - padding.t - padding.b;
    const fr = (v - minY) / (maxY - minY);
    return padding.t + (1 - fr) * innerH;
  };

  const gridY = useMemo(() => {
    const lines = 4;
    return Array.from(
      { length: lines + 1 },
      (_, i) => padding.t + (i / lines) * (height - padding.t - padding.b)
    );
  }, [height, padding.t, padding.b]);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full ${className}`}
    >
      {/* Grid */}
      <g>
        {gridY.map((y, i) => (
          <line
            key={i}
            x1={padding.l}
            x2={width - padding.r}
            y1={y}
            y2={y}
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}
      </g>
      {/* Axes labels (min/max) */}
      <text x={8} y={yScale(maxY)} fill="#888" fontSize="10">
        {maxY.toFixed(0)}
      </text>
      <text x={8} y={yScale(minY)} fill="#888" fontSize="10">
        {minY.toFixed(0)}
      </text>

      {/* Series lines */}
      {series.map((s, idx) => {
        const path = s.data
          .map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(v)}`)
          .join(" ");
        return (
          <g key={idx}>
            <path
              d={path}
              fill="none"
              stroke={colors[idx] || "#fff"}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

// Mini chart for a single metric with its own auto-scale and area fill
function MiniMetricChart({
  label,
  unit,
  data = [],
  color = "#ef4444",
  height = 140,
  className = "",
}) {
  const width = 720;
  const padding = { l: 36, r: 12, t: 12, b: 18 };
  const minY = useMemo(() => (data.length ? Math.min(...data) : 0), [data]);
  const maxY = useMemo(() => (data.length ? Math.max(...data) : 1), [data]);
  const norm = maxY === minY ? 1 : maxY - minY;
  const xScale = (i) => {
    const innerW = width - padding.l - padding.r;
    const n = Math.max(1, data.length - 1);
    return padding.l + (i / n) * innerW;
  };
  const yScale = (v) => {
    const innerH = height - padding.t - padding.b;
    const fr = (v - minY) / norm;
    return padding.t + (1 - fr) * innerH;
  };
  const baseline = yScale(minY);
  const pathLine = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScale(v)}`)
    .join(" ");
  const pathArea = `${pathLine} L ${xScale(
    Math.max(0, data.length - 1)
  )} ${baseline} L ${xScale(0)} ${baseline} Z`;
  const lastX = xScale(Math.max(0, data.length - 1));
  const lastY = yScale(data[data.length - 1] ?? minY);
  const gradId = `grad-${label.replace(/\s+/g, "-")}`;

  const gridY = useMemo(() => {
    const lines = 3;
    return Array.from(
      { length: lines + 1 },
      (_, i) => padding.t + (i / lines) * (height - padding.t - padding.b)
    );
  }, [height, padding.t, padding.b]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="90%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        {gridY.map((y, i) => (
          <line
            key={i}
            x1={padding.l}
            x2={width - padding.r}
            y1={y}
            y2={y}
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        ))}
      </g>
      <path d={pathArea} fill={`url(#${gradId})`} />
      <path
        d={pathLine}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g>
        <circle cx={lastX} cy={lastY} r="3.5" fill={color} />
        <circle cx={lastX} cy={lastY} r="9" fill={color} opacity="0.12" />
      </g>
      <text x={8} y={yScale(maxY)} fill="#888" fontSize="10">
        {maxY.toFixed(2)}
      </text>
      <text x={8} y={yScale(minY)} fill="#888" fontSize="10">
        {minY.toFixed(2)}
      </text>
      <text x={padding.l} y={padding.t - 2} fill="#bbb" fontSize="11">
        {label} {unit ? `(${unit})` : ""}
      </text>
    </svg>
  );
}

export default function RewireInteractive() {
  const [params, setParams] = useState({
    temp: 640,
    cool: 5,
    speed: 4,
    alloy: 1.0,
  });
  const [history, setHistory] = useState(() => ({
    uts: [250],
    elong: [14],
    cond: [50],
  }));

  // Debounced params to avoid spamming updates while sliding
  const debouncedParams = useDebouncedValue(params, 350);

  // Keep previous debounced params to compute delta magnitude
  const prevParamsRef = useRef(debouncedParams);

  const latest = useMemo(
    () => ({
      uts: history.uts[history.uts.length - 1] ?? 0,
      elong: history.elong[history.elong.length - 1] ?? 0,
      cond: history.cond[history.cond.length - 1] ?? 0,
    }),
    [history]
  );

  const handle = (k) => (e) =>
    setParams((p) => ({ ...p, [k]: Number(e.target.value) }));

  // On debounced change, snap directly to the new target (no animation)
  useEffect(() => {
    const prev = prevParamsRef.current;

    // Compute normalized delta magnitude to adjust drama
    const dt = Math.abs(debouncedParams.temp - prev.temp) / (720 - 550);
    const dc = Math.abs(debouncedParams.cool - prev.cool) / (15 - 1);
    const ds = Math.abs(debouncedParams.speed - prev.speed) / (12 - 1);
    const da = Math.abs(debouncedParams.alloy - prev.alloy) / (2.5 - 0.5);
    const deltaMag = Math.min(1, dt + dc + ds + da);

    const base = inferOutputs(debouncedParams);

    // Slightly adjust for some variability but snap in one step
    const sign = Math.random() < 0.5 ? -1 : 1;
    const amplify = 1 + deltaMag * 0.4;
    const target = {
      uts: clamp(base.uts * amplify + sign * deltaMag * 20, 120, 420),
      elong: clamp(
        base.elong * (1 + deltaMag * 0.2) + (Math.random() - 0.5) * deltaMag,
        2,
        28
      ),
      cond: clamp(
        base.cond * (1 + deltaMag * 0.2) + (Math.random() - 0.5) * deltaMag * 2,
        15,
        65
      ),
    };

    setHistory((h) => ({
      uts: [...h.uts, Number(target.uts.toFixed(1))].slice(-60),
      elong: [...h.elong, Number(target.elong.toFixed(2))].slice(-60),
      cond: [...h.cond, Number(target.cond.toFixed(2))].slice(-60),
    }));

    prevParamsRef.current = debouncedParams;
  }, [debouncedParams]);

  return (
    <motion.div
      className="relative max-w-6xl mx-auto bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4 bg-black/20">
        <div className="flex items-center gap-3 text-white/90">
          <Zap className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-medium">
            Rewire • Real-time Prediction Lab
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/60">
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12">
        {/* Controls */}
        <div className="col-span-12 md:col-span-3 border-r border-white/10 bg-gray-900/40 p-5">
          <div className="flex items-center gap-2 mb-3 text-white/80">
            <Sliders className="w-4 h-4" />
            <span className="text-sm font-semibold">Control Parameters</span>
          </div>
          <div className="space-y-5 text-sm text-white/80">
            <div>
              <div className="flex justify-between mb-1">
                <span>Temperature</span>
                <span>{params.temp}°C</span>
              </div>
              <input
                type="range"
                min="550"
                max="720"
                step="1"
                value={params.temp}
                onChange={handle("temp")}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Cooling Rate</span>
                <span>{params.cool} °C/s</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={params.cool}
                onChange={handle("cool")}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Extrusion Speed</span>
                <span>{params.speed} mm/s</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={params.speed}
                onChange={handle("speed")}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Alloy Ratio (Si)</span>
                <span>{params.alloy}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={params.alloy}
                onChange={handle("alloy")}
                className="w-full"
              />
            </div>
            <div className="text-xs text-white/50 pt-1">
              Adjust parameters to see live predictions.
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="col-span-12 md:col-span-6 p-5 bg-gradient-to-br from-gray-950/40 to-gray-900/40">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Live Metrics</span>
          </div>
          <div className="space-y-4">
            <MiniMetricChart
              label="UTS"
              unit="MPa"
              data={history.uts}
              color="#ef4444"
            />
            <MiniMetricChart
              label="Elongation"
              unit="%"
              data={history.elong}
              color="#22c55e"
            />
            <MiniMetricChart
              label="Conductivity"
              unit="MS/m"
              data={history.cond}
              color="#60a5fa"
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="col-span-12 md:col-span-3 border-l border-white/10 bg-black/30 p-5">
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-center justify-between text-white/70 text-sm">
                <span className="font-medium">UTS</span>
                <Gauge className="w-4 h-4" />
              </div>
              <div className="text-2xl font-semibold text-white mt-1">
                {latest.uts} <span className="text-sm text-white/60">MPa</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center justify-between text-white/70 text-sm">
                <span className="font-medium">Conductivity</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-2xl font-semibold text-white mt-1">
                {latest.cond}{" "}
                <span className="text-sm text-white/60">MS/m</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center justify-between text-white/70 text-sm">
                <span className="font-medium">Elongation</span>
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-2xl font-semibold text-white mt-1">
                {latest.elong} <span className="text-sm text-white/60">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
