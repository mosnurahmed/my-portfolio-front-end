"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const opts: IntersectionObserverInit = { rootMargin: "-40% 0px -55% 0px" };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(`#${e.target.id}`);
      });
    }, opts);
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border transition-all",
              scrolled
                ? "border-white/10 bg-bg/70 backdrop-blur-xl px-4 py-2.5 shadow-card"
                : "border-transparent px-2 py-2"
            )}
          >
            <a
              href="#home"
              className="flex items-center gap-2 pl-2 group"
              aria-label="Home"
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-bg font-display font-bold">
                M
                <span className="absolute -inset-px rounded-lg ring-1 ring-white/30 group-hover:ring-white/50 transition" />
              </span>
              <span className="hidden sm:block font-display font-medium tracking-tight">
                {profile.name}
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1 text-sm">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-3 py-1.5 rounded-full transition-colors",
                    active === l.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {active === l.href && (
                    <motion.span
                      layoutId="navpill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex btn-primary !py-2 !px-4 !text-xs"
              >
                Let's talk
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mt-24 mx-5 rounded-2xl border border-white/10 bg-bg-card/90 p-3"
            >
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base text-white/80 hover:bg-white/[0.05] hover:text-white"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
