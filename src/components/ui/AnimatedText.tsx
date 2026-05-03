"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  show: (s: number) => ({
    transition: { staggerChildren: s },
  }),
};

const child: Variants = {
  hidden: { y: "120%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AnimatedText({ text, className, delay = 0, stagger = 0.04 }: Props) {
  return (
    <motion.span
      className={cn("inline-block overflow-hidden align-baseline", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
