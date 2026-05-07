"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  download?: boolean | string;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  download,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const rotateX = useTransform(sy, [-30, 30], [8, -8]);
  const rotateY = useTransform(sx, [-30, 30], [-8, 8]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass = variant === "primary" ? "btn-primary" : "btn-ghost";

  const inner = (
    <motion.span
      style={{ x: sx, y: sy, rotateX, rotateY }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download as any}
        target={target}
        rel={rel}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(baseClass, "will-change-transform", className)}
        style={{ perspective: 600 }}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(baseClass, "will-change-transform", className)}
      style={{ perspective: 600 }}
    >
      {inner}
    </button>
  );
}
