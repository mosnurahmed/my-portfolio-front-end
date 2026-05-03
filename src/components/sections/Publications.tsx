"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { education, organizations, publications, reference } from "@/lib/data";
import { BookOpen, ExternalLink, GraduationCap, Users } from "lucide-react";

export function Publications() {
  return (
    <Section
      id="more"
      eyebrow="Publications & Education"
      title={
        <>
          Research, learning & <span className="text-gradient-anim">community</span>.
        </>
      }
    >
      <div className="grid lg:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card p-5 md:p-6 lg:col-span-2"
        >
          <div className="flex items-center gap-2 chip mb-4">
            <BookOpen className="h-3 w-3" /> Publication
          </div>
          {publications.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <div className="mt-1 text-sm text-white/55">{p.venue}</div>
              <div className="mt-2 text-sm text-white/65 italic">{p.authors}</div>
              <p className="mt-4 text-sm text-white/75 leading-relaxed">{p.summary}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85 hover:bg-white/[0.08] hover:text-white transition"
                >
                  Read on MDPI
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-5 md:p-6"
        >
          <div className="flex items-center gap-2 chip mb-4">
            <GraduationCap className="h-3 w-3" /> Education
          </div>
          {education.map((e) => (
            <div key={e.school}>
              <h3 className="font-medium">{e.school}</h3>
              <div className="text-sm text-white/55">{e.degree}</div>
              <div className="mt-1 text-xs text-white/45">{e.period}</div>
              <p className="mt-3 text-sm text-white/70">{e.detail}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="card p-5 md:p-6"
        >
          <div className="flex items-center gap-2 chip mb-4">
            <Users className="h-3 w-3" /> Organizations
          </div>
          <ul className="space-y-3">
            {organizations.map((o) => (
              <li key={o.name}>
                <div className="text-sm font-medium">{o.name}</div>
                <div className="text-xs text-white/55">
                  {o.role} · {o.period}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-5 md:p-6 lg:col-span-2"
        >
          <div className="chip mb-4">Reference</div>
          <h3 className="font-medium">{reference.name}</h3>
          <div className="text-sm text-white/55">{reference.role}</div>
          <a
            href={`mailto:${reference.email}`}
            className="mt-3 inline-block text-sm text-white/80 hover:text-white"
          >
            {reference.email}
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
