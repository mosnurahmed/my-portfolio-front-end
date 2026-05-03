"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { profile } from "@/lib/data";

const KEYWORDS = [
  { label: "Mid-level Engineer", color: "#22d3ee" },
  { label: "React Native Pro", color: "#8b5cf6" },
  { label: "MERN Stack", color: "#84cc16" },
  { label: "Mobile-first", color: "#ec4899" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "Next.js", color: "#ffffff" },
  { label: "Production Shipper", color: "#f59e0b" },
  { label: "System Designer", color: "#a78bfa" },
];

const RINGS = [
  { radius: 150, count: 4, duration: 32, reverse: false, offset: 0 },
  { radius: 210, count: 4, duration: 48, reverse: true, offset: 45 },
];

function getRingItems() {
  const out: { ring: number; items: typeof KEYWORDS }[] = [];
  let i = 0;
  for (let r = 0; r < RINGS.length; r++) {
    const items = KEYWORDS.slice(i, i + RINGS[r].count);
    out.push({ ring: r, items });
    i += RINGS[r].count;
  }
  return out;
}

export function AvatarOrbit() {
  const [imgSrc, setImgSrc] = useState(profile.avatar);
  const [active, setActive] = useState<string | null>(null);
  const groups = getRingItems();

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  const rX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rY = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[520px] aspect-square mx-auto [perspective:1200px]"
    >
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="absolute h-[360px] w-[360px] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute h-[260px] w-[260px] rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      {RINGS.map((r, idx) => (
        <div
          key={`ring-${idx}`}
          className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/[0.07]"
          style={{
            width: r.radius * 2,
            height: r.radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <motion.div
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        className="absolute inset-0 grid place-items-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20"
        >
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-violet-500/40 via-cyan-400/30 to-pink-500/40 blur-2xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #22d3ee, #8b5cf6, #ec4899, #22d3ee)",
              filter: "blur(3px)",
              opacity: 0.7,
            }}
          />
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60 rounded-full p-[3px] bg-gradient-to-tr from-violet-400 via-cyan-300 to-pink-400">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-bg-card">
              <img
                src={imgSrc}
                alt={profile.name}
                onError={() => setImgSrc("/profile.svg")}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-bg/85 backdrop-blur px-3.5 py-1.5 text-[11px] tracking-[0.18em] uppercase text-white/85"
          >
            {active ?? profile.title}
          </motion.div>
        </motion.div>
      </motion.div>

      {groups.map(({ ring, items }) => {
        const r = RINGS[ring];
        return (
          <motion.div
            key={`r-${ring}`}
            className="absolute left-1/2 top-1/2 z-10"
            style={{ width: 0, height: 0 }}
            animate={{ rotate: r.reverse ? -360 : 360 }}
            transition={{ duration: r.duration, repeat: Infinity, ease: "linear" }}
          >
            {items.map((kw, i) => {
              const angle =
                (i / r.count) * Math.PI * 2 + (r.offset * Math.PI) / 180;
              const ax = Math.cos(angle) * r.radius;
              const ay = Math.sin(angle) * r.radius;
              const isActive = active === kw.label;
              return (
                <motion.button
                  key={kw.label}
                  type="button"
                  onMouseEnter={() => setActive(kw.label)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(kw.label)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: ax, top: ay }}
                  animate={{ rotate: r.reverse ? 360 : -360 }}
                  transition={{
                    duration: r.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div
                    className="relative whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] backdrop-blur transition-all"
                    style={{
                      borderColor: isActive
                        ? `${kw.color}66`
                        : "rgba(255,255,255,0.10)",
                      background: isActive
                        ? `${kw.color}1a`
                        : "rgba(255,255,255,0.03)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.78)",
                      boxShadow: isActive
                        ? `0 0 18px ${kw.color}55`
                        : "none",
                    }}
                  >
                    <span
                      className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ background: kw.color }}
                    />
                    {kw.label}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}
