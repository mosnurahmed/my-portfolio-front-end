"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  Download,
  Mail,
  MapPin,
  PlayCircle,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AvatarOrbit } from "@/components/ui/AvatarOrbit";

const HEADING_LINES = [
  ["I", "build", "digital"],
  ["products", "people", "love."],
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl animate-blob" />
      <div className="absolute top-20 -right-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-3xl animate-blob" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10 pt-28 pb-16 grid md:grid-cols-12 gap-8 md:gap-6 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip mb-6"
          >
            <Sparkles className="h-3 w-3 text-accent-cyan" />
            Open to mid-level mobile / full-stack roles
          </motion.div>

          <h1 className="font-display text-[44px] sm:text-[64px] md:text-[84px] leading-[0.95] tracking-tight font-semibold">
            {HEADING_LINES.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-hidden pb-1">
                {line.map((word, wordIdx) => {
                  const globalIdx = lineIdx * 10 + wordIdx;
                  const isAccent = lineIdx === 1;
                  return (
                    <motion.span
                      key={`${lineIdx}-${wordIdx}`}
                      initial={{ y: "120%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + globalIdx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                        transition: { duration: 0.25 },
                      }}
                      className={`inline-block mr-[0.25em] cursor-default ${
                        isAccent ? "text-gradient-anim" : ""
                      }`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 max-w-xl text-base md:text-lg text-white/65 leading-relaxed"
          >
            Hi, I'm <span className="text-white font-medium">{profile.name}</span> — a
            mid-level software engineer based in Dhaka. I design system architecture and
            execute end-to-end across <span className="text-white/85">React Native</span>,{" "}
            <span className="text-white/85">React</span>,{" "}
            <span className="text-white/85">Next.js</span>,{" "}
            <span className="text-white/85">Flutter</span> and the MERN stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact">
              <Mail className="h-4 w-4" />
              Hire me
            </MagneticButton>
            <MagneticButton href={profile.resumeUrl} variant="ghost">
              <Download className="h-4 w-4" />
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.amrhalkhata"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/85 hover:bg-white/[0.06] hover:text-white transition"
            >
              <PlayCircle className="h-4 w-4 text-emerald-400" />
              Amarhaalkhata
              <span className="text-white/40">on Play Store</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rn_ercare24_app"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/85 hover:bg-white/[0.06] hover:text-white transition"
            >
              <PlayCircle className="h-4 w-4 text-cyan-300" />
              SignatureCare
              <span className="text-white/40">on Play Store</span>
            </a>
            <a
              href="/app-release.apk"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/85 hover:bg-white/[0.06] hover:text-white transition"
            >
              <Smartphone className="h-4 w-4 text-violet-300" />
              LifeTrack Pro
              <span className="text-white/40">download APK</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to work
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors"
            >
              {profile.email}
            </a>
          </motion.div>
        </div>

        <div className="md:col-span-5 relative flex items-center justify-center min-h-[480px] md:min-h-[600px]">
          <AvatarOrbit />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
      >
        Scroll <ArrowDownRight className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
