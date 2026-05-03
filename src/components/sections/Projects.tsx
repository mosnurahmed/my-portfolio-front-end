"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { projects, type Project, type ProjectLink } from "@/lib/data";
import { MOCKUPS } from "@/components/ui/ProjectMockups";
import {
  ArrowUpRight,
  Download,
  Github,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";

function LinkPill({ link }: { link: ProjectLink }) {
  const Icon =
    link.type === "play"
      ? PlayCircle
      : link.type === "apk"
      ? Download
      : link.type === "github"
      ? Github
      : ArrowUpRight;
  const isExternal = link.href.startsWith("http");
  const isApk = link.type === "apk";
  return (
    <a
      href={link.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={isApk || undefined}
      className="group/pill inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/90 hover:bg-white/[0.14] hover:border-white/30 transition"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon className="h-2.5 w-2.5" />
      {link.label}
    </a>
  );
}

type LeafPos = {
  cx: number;
  cy: number;
  side: "left" | "right";
  branchEndX: number;
  branchEndY: number;
};

const LEAF_POSITIONS: LeafPos[] = [
  { cx: 20, cy: 22, side: "left",  branchEndX: 50, branchEndY: 30 },
  { cx: 80, cy: 26, side: "right", branchEndX: 50, branchEndY: 34 },
  { cx: 18, cy: 52, side: "left",  branchEndX: 50, branchEndY: 54 },
  { cx: 82, cy: 56, side: "right", branchEndX: 50, branchEndY: 60 },
  { cx: 22, cy: 82, side: "left",  branchEndX: 50, branchEndY: 82 },
  { cx: 78, cy: 86, side: "right", branchEndX: 50, branchEndY: 88 },
];

const LEAF_COLORS = [
  "#ec4899",
  "#22d3ee",
  "#a78bfa",
  "#84cc16",
  "#f59e0b",
  "#22c55e",
];

function BranchPath({
  d,
  progress,
  index,
  total,
}: {
  d: string;
  progress: ReturnType<typeof useSpring>;
  index: number;
  total: number;
}) {
  const slice = 0.4 / total;
  const start = 0.4 + index * slice;
  const end = start + slice * 1.8;
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, end], [0, 0.85]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#branch)"
      strokeWidth="0.9"
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

function Leaf({
  p,
  pos,
  color,
  active,
  onClick,
  progress,
  index,
  total,
}: {
  p: Project;
  pos: LeafPos;
  color: string;
  active: boolean;
  onClick: () => void;
  progress: ReturnType<typeof useSpring>;
  index: number;
  total: number;
}) {
  const slice = 0.45 / total;
  const start = 0.5 + index * slice;
  const end = start + slice * 1.4;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.4, 1]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      style={{
        left: `${pos.cx}%`,
        top: `${pos.cy}%`,
        opacity,
        scale,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      aria-label={p.title}
    >
      <div
        className="absolute -inset-3 rounded-full blur-xl transition-opacity"
        style={{
          background: color,
          opacity: active ? 0.55 : 0.2,
        }}
      />
      <div
        className="relative w-[120px] sm:w-[140px] rounded-xl border bg-bg-card/90 backdrop-blur-md px-2.5 py-2 text-left transition-all"
        style={{
          borderColor: active
            ? `${color}aa`
            : "rgba(255,255,255,0.10)",
          boxShadow: active
            ? `0 0 24px ${color}66, 0 1px 0 rgba(255,255,255,0.04) inset`
            : `0 4px 18px -8px ${color}55`,
        }}
      >
        {p.featured && (
          <div
            className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full"
            style={{ background: color, boxShadow: `0 0 12px ${color}aa` }}
          >
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-mono font-bold"
            style={{
              background: `${color}22`,
              color,
              border: `1px solid ${color}55`,
            }}
          >
            {p.title.charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold truncate leading-tight">
              {p.title}
            </div>
            <div className="text-[9px] text-white/45 truncate">{p.year}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectDetailCard({
  p,
  color,
  onClose,
}: {
  p: Project;
  color: string;
  onClose: () => void;
}) {
  const Mockup = MOCKUPS[p.title];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid sm:grid-cols-5 gap-4 md:gap-5 rounded-3xl border bg-bg-card/85 backdrop-blur-xl p-4 md:p-5 shadow-2xl"
      style={{
        borderColor: `${color}55`,
        boxShadow: `0 24px 80px -30px ${color}55`,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.1] transition z-10"
        aria-label="Close"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div
        className={`relative sm:col-span-2 h-44 sm:h-auto rounded-2xl overflow-hidden bg-gradient-to-br ${p.accent}`}
      >
        <div className="absolute inset-0 grid-bg opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_60%)]" />
        {Mockup && (
          <div className="absolute inset-0">
            <Mockup />
          </div>
        )}
      </div>

      <div className="sm:col-span-3 min-w-0 pr-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="chip !text-[10px]">{p.year}</span>
          {p.featured && (
            <span
              className="chip !text-[10px] !text-white"
              style={{
                background: `${color}1a`,
                borderColor: `${color}66`,
              }}
            >
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-2xl md:text-3xl font-semibold tracking-tight">
          {p.title}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-white/55">{p.tagline}</p>
        <p className="mt-3 text-[13px] md:text-sm text-white/75 leading-relaxed">
          {p.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
        {p.links && p.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.links.map((l) => (
              <LinkPill key={l.label} link={l} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: treeRef,
    offset: ["start 90%", "start 20%"],
  });
  const treeProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });
  const trunkLen = useTransform(treeProgress, [0, 0.6], [0, 1]);
  const branchOpacity = useTransform(treeProgress, [0.4, 0.8], [0, 0.85]);

  return (
    <Section
      id="projects"
      eyebrow="Selected projects"
      title={
        <>
          The <span className="text-gradient-anim">tree of work</span>.
        </>
      }
      description="Every leaf is a project I shipped — click any leaf to see the details."
    >
      <div
        ref={treeRef}
        className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/[0.06] bg-bg-card/30 backdrop-blur-sm"
        style={{ aspectRatio: "16 / 9" }}
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trunk" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
            <linearGradient id="branch" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M 50 100 Q 48 80 50 60 Q 52 40 50 18"
            fill="none"
            stroke="url(#trunk)"
            strokeWidth="1.6"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ pathLength: trunkLen }}
          />

          {LEAF_POSITIONS.map((pos, i) => {
            const c1x = (pos.branchEndX + pos.cx) / 2;
            const c1y = pos.branchEndY - 4;
            return (
              <BranchPath
                key={`branch-${i}`}
                d={`M ${pos.branchEndX} ${pos.branchEndY} Q ${c1x} ${c1y} ${pos.cx} ${pos.cy}`}
                progress={treeProgress}
                index={i}
                total={LEAF_POSITIONS.length}
              />
            );
          })}

          {[15, 28, 42, 58, 72, 84].map((y, i) => (
            <motion.circle
              key={`bud-${i}`}
              cx={50 + (i % 2 === 0 ? -1 : 1)}
              cy={y}
              r="0.6"
              fill="#bef264"
              style={{ opacity: branchOpacity }}
            />
          ))}
        </svg>

        {LEAF_POSITIONS.map((pos, i) => {
          const project = projects[i];
          if (!project) return null;
          return (
            <Leaf
              key={project.title}
              p={project}
              pos={pos}
              color={LEAF_COLORS[i]}
              active={active === i}
              onClick={() => setActive(active === i ? null : i)}
              progress={treeProgress}
              index={i}
              total={LEAF_POSITIONS.length}
            />
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/45"
        >
          🌱 rooted in 2023 — still growing
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {active !== null && projects[active] && (
          <motion.div
            key={projects[active].title}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-5xl mx-auto">
              <ProjectDetailCard
                p={projects[active]}
                color={LEAF_COLORS[active]}
                onClose={() => setActive(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {active === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-center text-[11px] text-white/40"
        >
          ↑ click any leaf to see the project in detail
        </motion.div>
      )}
    </Section>
  );
}
