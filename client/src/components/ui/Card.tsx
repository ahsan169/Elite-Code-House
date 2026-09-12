"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "dark" | "bordered";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", hover = false, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl transition-all duration-300";

    const variants = {
      default: "bg-white shadow-lg",
      glass: "glass",
      dark: "bg-dark-200 text-white",
      bordered: "border border-white/10 bg-dark-200"
    };

    const hoverStyles = hover ? "hover:scale-[1.02] hover:shadow-xl cursor-pointer" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
