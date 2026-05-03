"use client";

import { profile } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 font-display font-bold text-bg text-sm">
              M
            </span>
            <span className="font-display font-medium tracking-tight">
              {profile.name}
            </span>
          </div>
          <p className="mt-2 text-xs text-white/45">
            © {new Date().getFullYear()} {profile.name}. Crafted with Next.js,
            Tailwind, Three.js & Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
