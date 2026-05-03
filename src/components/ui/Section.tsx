"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string | ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "left",
}: Props) {
  return (
    <section
      id={id}
      className={cn("relative py-8 md:py-12 px-5 md:px-10 max-w-7xl mx-auto", className)}
    >
      {(eyebrow || title || description) && (
        <div
          className={cn(
            "mb-6 md:mb-8 max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="chip mb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              {eyebrow}
            </motion.div>
          )}
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="section-title"
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-4 text-base md:text-lg text-white/60 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
