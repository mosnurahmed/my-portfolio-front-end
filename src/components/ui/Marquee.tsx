"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
};

export function Marquee({ children, speed = 28, reverse = false, className }: Props) {
  return (
    <div className={cn("relative overflow-hidden marquee-mask", className)}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex gap-10 shrink-0">{children}</div>
        <div className="flex gap-10 shrink-0" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
