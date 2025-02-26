import * as React from "react";
import { cfx } from "classifyx";

// Define variants, colors, and sizes for the RoundedBadge
type RoundedBadgeVariants = "solid" | "outline" | "ghost";
type RoundedBadgeColors =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
type RoundedBadgeSizes = "sm" | "md" | "lg";

interface RoundedBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: RoundedBadgeVariants;
  color?: RoundedBadgeColors;
  size?: RoundedBadgeSizes;
  rounded?: boolean;
}

// Define color classes explicitly to avoid Tailwind issues
const colorClasses: Record<
  RoundedBadgeColors,
  { bg: string; text: string; border: string }
> = {
  primary: { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" },
  secondary: {
    bg: "bg-gray-500",
    text: "text-white",
    border: "border-gray-500",
  },
  success: {
    bg: "bg-green-500",
    text: "text-white",
    border: "border-green-500",
  },
  warning: {
    bg: "bg-yellow-500",
    text: "text-black",
    border: "border-yellow-500",
  },
  error: { bg: "bg-red-500", text: "text-white", border: "border-red-500" },
};

// Variant classes using predefined colorClasses
const variantClasses = {
  solid: (color: RoundedBadgeColors) =>
    `${colorClasses[color].bg} ${colorClasses[color].text}`,
  outline: (color: RoundedBadgeColors) =>
    `border ${colorClasses[color].border} ${colorClasses[color].text}`,
  ghost: (color: RoundedBadgeColors) =>
    `bg-opacity-10 ${colorClasses[color].bg} ${colorClasses[color].text}`,
};

// RoundedBadge component
const RoundedBadge = React.forwardRef<HTMLSpanElement, RoundedBadgeProps>(
  (
    {
      variant = "solid",
      color = "primary",
      size = "md",
      rounded = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cfx(
          "inline-flex items-center font-medium",
          rounded ? "rounded-full" : "rounded-md",
          size === "sm" && "px-2 py-0.5 text-xs",
          size === "md" && "px-2.5 py-1 text-sm",
          size === "lg" && "px-3 py-1.5 text-base",
          variantClasses[variant](color), // Apply correct variant styles
          className, // Allow additional styles
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

RoundedBadge.displayName = "RoundedBadge";

export { RoundedBadge };
