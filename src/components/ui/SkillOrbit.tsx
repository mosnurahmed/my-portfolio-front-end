"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { Code2 } from "lucide-react";

const RINGS = [
  { radius: 92, count: 6, duration: 28, reverse: false, size: 40, fontSize: 13 },
  { radius: 158, count: 8, duration: 44, reverse: true, size: 44, fontSize: 14 },
  { radius: 230, count: 8, duration: 60, reverse: false, size: 46, fontSize: 14 },
];

function pickSkills() {
  const total = RINGS.reduce((s, r) => s + r.count, 0);
  const list = skills.slice(0, total);
  const out: typeof skills[] = [];
  let i = 0;
  for (const r of RINGS) {
    out.push(list.slice(i, i + r.count));
    i += r.count;
  }
  return out;
}

export function SkillOrbit() {
  const ringSkills = pickSkills();

  return (
    <div className="relative mx-auto w-full max-w-[640px] aspect-square my-4">
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="absolute h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {RINGS.map((r, idx) => (
        <div
          key={idx}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.06]"
          style={{
            width: r.radius * 2,
            height: r.radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-violet-500/40 via-cyan-400/30 to-pink-500/40 blur-xl" />
          <div className="relative grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full border border-white/15 bg-bg-card/90 backdrop-blur-xl shadow-glow">
            <Code2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white/50">
              My Stack
            </div>
          </div>
        </motion.div>
      </div>

      {RINGS.map((ring, ringIdx) => (
        <motion.div
          key={`r-${ringIdx}`}
          className="absolute left-1/2 top-1/2"
          style={{ width: 0, height: 0 }}
          animate={{ rotate: ring.reverse ? -360 : 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        >
          {ringSkills[ringIdx].map((s, i) => {
            const angle = (i / ring.count) * Math.PI * 2;
            const x = Math.cos(angle) * ring.radius;
            const y = Math.sin(angle) * ring.radius;
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                className="absolute"
                style={{
                  left: x,
                  top: y,
                  width: ring.size,
                  height: ring.size,
                  marginLeft: -ring.size / 2,
                  marginTop: -ring.size / 2,
                }}
                animate={{ rotate: ring.reverse ? 360 : -360 }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{ scale: 1.25 }}
              >
                <div className="group relative h-full w-full">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] opacity-0 group-hover:opacity-100 transition" />
                  <div className="relative h-full w-full grid place-items-center rounded-xl border border-white/10 bg-bg-card/70 backdrop-blur shadow-card group-hover:border-white/30 transition">
                    <Icon
                      style={{ color: s.color, fontSize: ring.fontSize + 4 }}
                      className="drop-shadow"
                    />
                  </div>
                  <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-bg/90 backdrop-blur px-2 py-0.5 text-[10px] text-white/85 opacity-0 group-hover:opacity-100 transition">
                    {s.name}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}
