"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltCard({ children, className, intensity = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const rX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const gX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const gY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative card group [perspective:1000px] will-change-transform",
        className
      )}
    >
      <motion.div
        aria-hidden
        style={{
          background: useTransform(
            [gX, gY],
            ([gx, gy]) =>
              `radial-gradient(420px circle at ${gx} ${gy}, rgba(139,92,246,0.18), transparent 60%)`
          ),
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div style={{ transform: "translateZ(40px)" }} className="relative">
        {children}
      </div>
    </motion.div>
  );
}
