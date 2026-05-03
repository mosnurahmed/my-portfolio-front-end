"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { profile } from "@/lib/data";
import { Code2, Layers, Smartphone, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Engineering rigor",
    desc: "Type-safe, tested, maintainable. Architecture decisions you can defend.",
  },
  {
    icon: Layers,
    title: "Systems thinking",
    desc: "I design products end-to-end — from API contracts to pixel-perfect UIs.",
  },
  {
    icon: Smartphone,
    title: "Mobile-native",
    desc: "Years of React Native + Flutter shipping real apps with offline-first sync.",
  },
  {
    icon: Sparkles,
    title: "Design taste",
    desc: "I obsess over micro-interactions, motion and the feel of an interface.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Mid-level engineer crafting{" "}
          <span className="text-gradient-anim">products that ship</span>.
        </>
      }
      description={profile.bio}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
        {profile.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="card p-5 md:p-6"
          >
            <div className="font-display text-3xl md:text-4xl text-gradient-anim font-semibold">
              {h.value}
            </div>
            <div className="mt-1 text-xs md:text-sm text-white/55">{h.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card p-5 md:p-6 flex gap-4 hover:border-white/15 hover:bg-white/[0.04] transition"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <h3 className="font-medium text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
