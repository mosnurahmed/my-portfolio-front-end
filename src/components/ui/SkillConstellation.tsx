"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFlutter,
  SiFigma,
  SiGit,
  SiGithub,
  SiFramer,
  SiThreedotjs,
  SiFirebase,
  SiVercel,
  SiPostman,
  SiJsonwebtokens,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { IconType } from "react-icons";

type Node = {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  category: "frontend" | "mobile" | "backend" | "cloud" | "tools";
  level: number;
  x: number;
  y: number;
  size?: "lg" | "md" | "sm";
};

const NODES: Node[] = [
  { id: "rn",     name: "React Native",   icon: TbBrandReactNative, color: "#22d3ee", category: "mobile",   level: 95, x: 50, y: 30, size: "lg" },
  { id: "react",  name: "React",          icon: SiReact,            color: "#22d3ee", category: "frontend", level: 95, x: 22, y: 22, size: "lg" },
  { id: "next",   name: "Next.js",        icon: SiNextdotjs,        color: "#ffffff", category: "frontend", level: 88, x: 12, y: 50 },
  { id: "ts",     name: "TypeScript",     icon: SiTypescript,       color: "#3b82f6", category: "frontend", level: 92, x: 32, y: 50, size: "lg" },
  { id: "js",     name: "JavaScript",     icon: SiJavascript,       color: "#facc15", category: "frontend", level: 95, x: 5,  y: 30 },
  { id: "redux",  name: "Redux Toolkit",  icon: SiRedux,            color: "#a78bfa", category: "frontend", level: 88, x: 22, y: 72 },
  { id: "tw",     name: "Tailwind",       icon: SiTailwindcss,      color: "#22d3ee", category: "frontend", level: 92, x: 5,  y: 70 },
  { id: "fm",     name: "Framer Motion",  icon: SiFramer,           color: "#ec4899", category: "frontend", level: 82, x: 14, y: 86 },
  { id: "three",  name: "Three.js",       icon: SiThreedotjs,       color: "#ffffff", category: "frontend", level: 70, x: 32, y: 88 },

  { id: "expo",   name: "Expo",           icon: TbBrandReactNative, color: "#0ea5e9", category: "mobile",   level: 88, x: 70, y: 18 },
  { id: "flutter",name: "Flutter",        icon: SiFlutter,          color: "#22d3ee", category: "mobile",   level: 40, x: 60, y: 8 },

  { id: "node",   name: "Node.js",        icon: SiNodedotjs,        color: "#84cc16", category: "backend",  level: 88, x: 78, y: 38, size: "lg" },
  { id: "exp",    name: "Express",        icon: SiExpress,          color: "#ffffff", category: "backend",  level: 88, x: 90, y: 28 },
  { id: "mongo",  name: "MongoDB",        icon: SiMongodb,          color: "#22c55e", category: "backend",  level: 85, x: 92, y: 55, size: "lg" },
  { id: "jwt",    name: "JWT",            icon: SiJsonwebtokens,    color: "#ec4899", category: "backend",  level: 86, x: 78, y: 60 },

  { id: "fire",   name: "Firebase",       icon: SiFirebase,         color: "#f59e0b", category: "cloud",    level: 80, x: 70, y: 78 },
  { id: "vercel", name: "Vercel",         icon: SiVercel,           color: "#ffffff", category: "cloud",    level: 84, x: 88, y: 80 },

  { id: "git",    name: "Git",            icon: SiGit,              color: "#f97316", category: "tools",    level: 92, x: 50, y: 90 },
  { id: "gh",     name: "GitHub",         icon: SiGithub,           color: "#ffffff", category: "tools",    level: 92, x: 60, y: 95 },
  { id: "figma",  name: "Figma",          icon: SiFigma,            color: "#ec4899", category: "tools",    level: 30, x: 40, y: 95 },
  { id: "post",   name: "Postman",        icon: SiPostman,          color: "#f97316", category: "tools",    level: 88, x: 50, y: 60 },
];

const EDGES: [string, string][] = [
  ["react", "ts"], ["react", "next"], ["react", "rn"], ["react", "tw"], ["react", "redux"], ["react", "fm"], ["react", "three"],
  ["next", "ts"], ["next", "vercel"], ["next", "tw"],
  ["rn", "ts"], ["rn", "redux"], ["rn", "expo"], ["rn", "fire"],
  ["ts", "js"], ["redux", "rn"],
  ["node", "exp"], ["node", "mongo"], ["node", "ts"], ["node", "js"],
  ["exp", "mongo"], ["exp", "jwt"], ["exp", "post"],
  ["mongo", "fire"],
  ["fire", "vercel"], ["vercel", "next"],
  ["git", "gh"], ["git", "post"], ["figma", "fm"],
  ["jwt", "rn"], ["post", "node"],
];

const CATEGORIES = [
  { id: "frontend", label: "Frontend",  color: "#22d3ee" },
  { id: "mobile",   label: "Mobile",    color: "#8b5cf6" },
  { id: "backend",  label: "Backend",   color: "#84cc16" },
  { id: "cloud",    label: "Cloud",     color: "#f59e0b" },
  { id: "tools",    label: "Tools",     color: "#ec4899" },
] as const;

export function SkillConstellation() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const neighbors = useMemo(() => {
    if (!active) return new Set<string>();
    const set = new Set<string>();
    EDGES.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active]);

  const isVisible = (n: Node) => !filter || n.category === filter;
  const isDimmed = (n: Node) => {
    if (!isVisible(n)) return true;
    if (active && n.id !== active && !neighbors.has(n.id)) return true;
    return false;
  };

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-2 mb-4 justify-center">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition ${
            !filter
              ? "border-white/25 bg-white/[0.08] text-white"
              : "border-white/10 bg-white/[0.02] text-white/55 hover:bg-white/[0.05]"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(filter === c.id ? null : c.id)}
            className="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition"
            style={{
              borderColor:
                filter === c.id ? `${c.color}66` : "rgba(255,255,255,0.1)",
              background:
                filter === c.id ? `${c.color}1a` : "rgba(255,255,255,0.02)",
              color: filter === c.id ? "#fff" : "rgba(255,255,255,0.55)",
            }}
          >
            <span
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{ background: c.color }}
            />
            {c.label}
          </button>
        ))}
      </div>

      <div className="relative aspect-[16/7] w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/[0.06] bg-bg-card/40 backdrop-blur-sm">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="edge" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="edge-hot" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const na = NODES.find((n) => n.id === a)!;
            const nb = NODES.find((n) => n.id === b)!;
            const hot = active && (a === active || b === active);
            const dim =
              (filter && (na.category !== filter || nb.category !== filter)) ||
              (active && !hot);
            return (
              <motion.line
                key={`e-${i}`}
                x1={`${na.x}%`}
                y1={`${na.y}%`}
                x2={`${nb.x}%`}
                y2={`${nb.y}%`}
                stroke={hot ? "url(#edge-hot)" : "url(#edge)"}
                strokeWidth={hot ? 1.4 : 0.8}
                strokeDasharray={hot ? "0" : "3 4"}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: dim ? 0.08 : 0.4 }}
                viewport={{ once: true }}
                animate={{ opacity: dim ? 0.06 : hot ? 0.9 : 0.32 }}
                transition={{ duration: 1.4, delay: i * 0.02 }}
              />
            );
          })}
        </svg>

        {NODES.map((n, i) => {
          const dim = isDimmed(n);
          const isActive = active === n.id;
          const isNeighbor = neighbors.has(n.id);
          const sizeClass =
            n.size === "lg"
              ? "h-12 w-12 sm:h-14 sm:w-14"
              : n.size === "sm"
              ? "h-8 w-8 sm:h-9 sm:w-9"
              : "h-10 w-10 sm:h-11 sm:w-11";
          const iconSize =
            n.size === "lg" ? 22 : n.size === "sm" ? 14 : 18;
          const Icon = n.icon;

          return (
            <motion.button
              key={n.id}
              type="button"
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : n.id)}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: 0.05 + i * 0.025,
              }}
              animate={{
                opacity: dim ? 0.18 : 1,
                scale: isActive ? 1.18 : isNeighbor ? 1.06 : 1,
              }}
              whileHover={{ scale: 1.18 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${sizeClass} group`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-label={n.name}
            >
              <span
                className="absolute inset-0 rounded-2xl blur-md transition-opacity"
                style={{
                  background: n.color,
                  opacity: isActive ? 0.55 : isNeighbor ? 0.25 : 0,
                }}
              />
              <span
                className="relative grid h-full w-full place-items-center rounded-2xl border bg-bg-card/85 backdrop-blur transition-all"
                style={{
                  borderColor: isActive
                    ? `${n.color}aa`
                    : isNeighbor
                    ? `${n.color}55`
                    : "rgba(255,255,255,0.08)",
                  boxShadow: isActive
                    ? `0 0 24px ${n.color}66, inset 0 0 18px ${n.color}22`
                    : "none",
                }}
              >
                <Icon style={{ color: n.color, fontSize: iconSize }} />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-bg/95 px-2 py-0.5 text-[10px] text-white/85 opacity-0 group-hover:opacity-100 transition">
                {n.name}
              </span>
            </motion.button>
          );
        })}

        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-sm rounded-2xl border border-white/10 bg-bg/90 backdrop-blur-xl p-4 sm:p-5 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                  style={{
                    borderColor: `${activeNode.color}66`,
                    background: `${activeNode.color}1a`,
                  }}
                >
                  <activeNode.icon
                    style={{ color: activeNode.color, fontSize: 20 }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold tracking-tight">
                      {activeNode.name}
                    </h4>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
                      style={{
                        background: `${activeNode.color}1a`,
                        color: activeNode.color,
                      }}
                    >
                      {activeNode.category}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-white/60">
                    <span>Proficiency</span>
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${activeNode.level}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${activeNode.color}, ${activeNode.color}99)`,
                        }}
                      />
                    </div>
                    <span className="text-white/85 tabular-nums">
                      {activeNode.level}%
                    </span>
                  </div>
                  <div className="mt-3 text-[11px] text-white/55">
                    Connected to{" "}
                    <span className="text-white/80">{neighbors.size}</span>{" "}
                    technologies
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 text-center text-[11px] text-white/40">
        Hover or click any node to see its connections and proficiency
      </div>
    </div>
  );
}
