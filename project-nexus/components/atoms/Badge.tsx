import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "blue" | "green" | "gray";
}

export const Badge = ({ className, variant = "blue", children, ...props }: BadgeProps) => {
  const variants = {
    blue: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
    green: "bg-green-100 text-green-700",
    gray: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};