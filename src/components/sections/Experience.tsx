"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/lib/data";
import { Briefcase, MapPin, Sparkles } from "lucide-react";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.5,
  });
  const lineHeight = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="work"
      eyebrow="Experience"
      title={
        <>
          A track record of <span className="text-gradient-anim">shipping</span>.
        </>
      }
      description="From legacy modernization to greenfield mobile apps — here's where I've made impact."
    >
      <div ref={ref} className="relative">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] md:-translate-x-px"
          aria-hidden
        />
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-px md:-translate-x-px"
        >
          <div className="h-full w-full bg-gradient-to-b from-violet-400 via-cyan-300 to-pink-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
        </motion.div>

        <motion.div
          aria-hidden
          style={{ top: lineHeight }}
          className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-cyan-300 animate-ping opacity-75" />
            <span className="relative block h-3 w-3 rounded-full bg-cyan-300 ring-2 ring-cyan-200/50" />
          </div>
        </motion.div>

        <ol className="space-y-10 md:space-y-16">
          {experiences.map((e, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={e.company + e.role} className="relative">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="absolute left-4 md:left-1/2 top-2 md:top-6 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-bg-card ring-4 ring-bg z-10"
                >
                  {i === 0 ? (
                    <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 text-white/80" />
                  )}
                </motion.span>

                <div
                  className={`md:grid md:grid-cols-2 md:gap-10 ${
                    isLeft ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className={`pl-12 md:pl-0 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10"}`}
                  >
                    <div className={`chip ${isLeft ? "md:ml-auto" : ""}`}>
                      {e.period}
                    </div>
                    <h3 className="mt-3 text-xl md:text-2xl font-display font-semibold tracking-tight">
                      {e.role}
                    </h3>
                    <div className="mt-1 text-sm text-white/55">
                      {e.company}
                      {e.location && (
                        <>
                          <span className="mx-2 text-white/25">·</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {e.location}
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`mt-4 md:mt-0 pl-12 md:pl-0 ${
                      isLeft ? "md:pl-10" : "md:pr-10"
                    }`}
                  >
                    <div className="card p-5 md:p-6 hover:border-white/15 hover:bg-white/[0.04] transition">
                      <p className="text-sm text-white/65 leading-relaxed">
                        {e.description}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-white/75">
                        {e.achievements.map((a, k) => (
                          <motion.li
                            key={a}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.4, delay: 0.05 * k }}
                            className="flex gap-2.5"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                            <span>{a}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {e.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
