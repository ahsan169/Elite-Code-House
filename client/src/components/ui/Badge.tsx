"use client";

import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "glass";
  color?: "cyan" | "lime" | "yellow" | "pink" | "purple";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", color = "cyan", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium";

    const colorMap = {
      cyan: "bg-accent-cyan/20 text-accent-cyan",
      lime: "bg-accent-lime/20 text-accent-lime",
      yellow: "bg-accent-yellow/20 text-accent-yellow",
      pink: "bg-accent-pink/20 text-accent-pink",
      purple: "bg-accent-purple/20 text-accent-purple"
    };

    const variants = {
      default: colorMap[color],
      accent: colorMap[color],
      outline: "border border-white/20 text-white",
      glass: "glass-pill text-white"
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
