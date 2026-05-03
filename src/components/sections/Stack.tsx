"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { stackGroups } from "@/lib/data";
import { TiltCard } from "@/components/ui/TiltCard";
import { SkillConstellation } from "@/components/ui/SkillConstellation";

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech stack"
      title={
        <>
          A connected <span className="text-gradient-anim">knowledge graph</span>.
        </>
      }
      description="Hover any node to light up its connections — the technologies I reach for daily, mapped by how they actually work together in production."
    >
      <div className="mb-8">
        <SkillConstellation />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stackGroups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <TiltCard className="p-5 md:p-6 h-full">
              <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                {g.title}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[12px] text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
