"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  HeartPulse,
  ListChecks,
  ScrollText,
  Wallet,
} from "lucide-react";

function PhoneFrame({
  children,
  tint = "from-violet-500/20 to-cyan-500/20",
}: {
  children: React.ReactNode;
  tint?: string;
}) {
  return (
    <div className="relative mx-auto h-full max-h-[300px] aspect-[9/19]">
      <div
        className={`absolute -inset-3 rounded-[44px] bg-gradient-to-br ${tint} blur-2xl`}
      />
      <div className="relative h-full rounded-[34px] border border-white/15 bg-bg-card shadow-2xl p-1.5">
        <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-[#0b0d18]">
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-3 w-14 rounded-full bg-black/80 z-10" />
          {children}
        </div>
      </div>
    </div>
  );
}

function AbstractScreen({
  icon: Icon,
  color,
  label,
}: {
  icon: typeof Wallet;
  color: string;
  label: string;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center pt-5">
      <div className="absolute inset-x-3 top-7 space-y-2">
        {[60, 90, 75].map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="h-2 rounded-full bg-white/10"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 16 }}
        className="relative mt-12"
      >
        <div
          className="absolute -inset-4 rounded-full blur-2xl"
          style={{ background: color, opacity: 0.45 }}
        />
        <div
          className="relative grid h-16 w-16 place-items-center rounded-2xl border bg-bg-card/85 backdrop-blur"
          style={{ borderColor: `${color}66` }}
        >
          <Icon style={{ color }} className="h-7 w-7" />
        </div>
      </motion.div>

      <div className="absolute inset-x-3 bottom-4 space-y-1.5">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="h-7 origin-left rounded-lg border border-white/10 bg-white/[0.04]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-[9px] uppercase tracking-[0.2em] text-white/35"
        >
          {label}
        </motion.div>
      </div>
    </div>
  );
}

export function HalkhataMockup() {
  return (
    <PhoneFrame tint="from-pink-500/30 to-violet-500/30">
      <AbstractScreen icon={Wallet} color="#ec4899" label="ledger" />
    </PhoneFrame>
  );
}

export function SignatureCareMockup() {
  return (
    <PhoneFrame tint="from-emerald-400/30 to-cyan-500/30">
      <AbstractScreen icon={HeartPulse} color="#22d3ee" label="health" />
    </PhoneFrame>
  );
}

export function LifeTrackMockup() {
  return (
    <PhoneFrame tint="from-violet-500/30 to-cyan-400/30">
      <AbstractScreen icon={ListChecks} color="#a78bfa" label="track" />
    </PhoneFrame>
  );
}

export function PothikMockup() {
  return (
    <div className="relative h-full grid place-items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[260px] rounded-2xl border border-white/10 bg-bg-card/80 backdrop-blur-md p-4 font-mono text-[11px] leading-relaxed text-white/65"
      >
        <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/10">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[10px] text-white/35">pothik.tsx</span>
        </div>
        <div className="text-white/35">// MDPI · 2023</div>
        <div>
          <span className="text-pink-400">const</span>{" "}
          <span className="text-cyan-300">tour</span>{" "}
          <span className="text-white/40">=</span>{" "}
          <span className="text-violet-300">optimize</span>(
        </div>
        <div className="ml-3">
          <span className="text-amber-300">seats</span>: 0.92,
        </div>
        <div className="ml-3">
          <span className="text-amber-300">guides</span>:{" "}
          <span className="text-emerald-300">true</span>
        </div>
        <div>);</div>
        <div className="mt-2 text-emerald-400">→ published ✓</div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-44 w-44 rounded-full bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 blur-3xl" />
      </div>
    </div>
  );
}

export function QmmMockup() {
  return (
    <div className="relative h-full grid place-items-center p-4">
      <div className="relative">
        {[0, 1, 2, 3].map((k) => (
          <motion.div
            key={k}
            animate={{ rotate: k % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 28 + k * 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10"
            style={{ width: 200 - k * 36, height: 200 - k * 36 }}
          />
        ))}
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-amber-400/30 to-pink-500/30 backdrop-blur">
          <Award className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-36 w-36 rounded-full bg-gradient-to-br from-amber-400/20 to-pink-500/20 blur-3xl" />
      </div>
    </div>
  );
}

export function EdusoftMockup() {
  return (
    <div className="relative h-full grid place-items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[220px] rounded-2xl border border-white/10 bg-bg-card/85 backdrop-blur p-3"
      >
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <ScrollText className="h-3 w-3 text-violet-300" />
            <span className="text-[9.5px] uppercase tracking-wider text-white/55">
              Report
            </span>
          </div>
          <BarChart3 className="h-3 w-3 text-white/40" />
        </div>

        <div className="space-y-1.5 mb-3">
          {[80, 55, 70].map((w, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="origin-left h-1.5 rounded-full bg-gradient-to-r from-violet-500/60 to-pink-500/40"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        <div className="flex items-end gap-1 h-12">
          {[0.4, 0.55, 0.7, 0.5, 0.8, 0.65, 0.9, 0.75].map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: h }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-violet-500 to-pink-400"
              style={{ height: "100%" }}
            />
          ))}
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-44 w-44 rounded-full bg-gradient-to-br from-violet-500/20 to-pink-500/20 blur-3xl" />
      </div>
    </div>
  );
}

export const MOCKUPS: Record<string, () => ReactElement> = {
  Amarhaalkhata: HalkhataMockup,
  SignatureCare: SignatureCareMockup,
  "LifeTrack Pro": LifeTrackMockup,
  Pothik: PothikMockup,
  "QMM Soft Mobile": QmmMockup,
  "Edusoft Reporting Suite": EdusoftMockup,
};
